# Code-splitting & subpath exports — `@synergycodes/overflow-ui`

Data: 2026-05-05
Wersja library: `1.0.0-beta.26`

## Aktualny stan

- **Single entry**, bundle: `dist/overflow-ui.js` 614 KB raw / 162 KB gzip
- **Single CSS**: `dist/index.css` 80 KB raw / 10 KB gzip
- `package.json.exports`:
  ```json
  ".": { "types": "./dist/index.d.ts", "import": "./dist/overflow-ui.js" },
  "./tokens.css": "./dist/tokens.css"
  ```
- `package.json.sideEffects`: `["**/*.css"]` (poprawne, pozostałe TS/JS files NIE są side-effecty)
- Bundle Vite: `lib.entry: 'src/index.ts'`, jeden ESM chunk, no `preserveModules`
- `vite-plugin-lib-inject-css` injektuje CSS imports — ale w single-entry trafiają one do **jednego głównego pliku** jako `import './index.css'` na samej górze
- `src/index.ts` reeksportuje **30+ komponentów** (`export * from './components/...'`)

## Czy treeshake działa?

### Eksperyment

Test consumer w `/tmp/test-consumer/` z 3 wariantami importów:

| Wariant | Import | Bundle JS | Gzip JS | Bundle CSS | Gzip CSS |
|---|---|---:|---:|---:|---:|
| **Button only** | `import { Button } from '...'` | **385 KB** | **105 KB** | 79 KB | 10 KB |
| **5 komponentów** (Button, Modal, Input, Checkbox, Tooltip) | jw. | **387 KB** | **106 KB** | 79 KB | 10 KB |
| **Wszystko** | `import * as everything from '...'` | **409 KB** | **112 KB** | 79 KB | 10 KB |

Pomiar bez minify (no name-mangling, "real cost"):
- Button only no-minify: **613 KB** JS / 80 KB CSS — czyli identycznie jak całe `overflow-ui.js`

### Verdict: **treeshake działa CZĘŚCIOWO i bardzo nierównomiernie**

Konkrety w bundle `button-only` (powinno być tylko `Button`):

- 30× `Dialog*` (Modal/Base UI) — pełny `DialogRoot`, `DialogPopup`, `DialogClose`, `DialogPortal`, `DialogBackdrop`, `DialogTitle`
- 17× `Menu` (`MenuRoot`, `MenuPositioner`, `MenuTrigger`, `MenuItem`)
- 141× wystąpień `Select` w bundle, w tym `SelectRoot`, `SelectPositioner`, `SelectTrigger`, `SelectPopup`
- 7× `DatePicker` + cały `@mantine/dates` z `HiddenDatesInput`, `wp.displayName = "@mantine/dates/HiddenDatesInput"`
- 72× `@mantine` referencji (cały Mantine theme/context system)
- 13× `Calendar` ikony (Phosphor) używane w DatePicker
- 6× `Drawer`, 5× `Switch`, 2× `InputBase`, 1× `Combobox`

Co JEST tree-shake'owane: `Snackbar`, `Avatar`, `Accordion`, `Tabs`, `Slider`, `Toast`, `Radio` (0 referencji w button bundle).

### Powód częściowego sukcesu

1. **Single ESM bundle**: `overflow-ui.js` to JEDEN plik z 30 named exports. Tree-shaker konsumenta widzi cały graf zależności w jednej "scope". Gdy Modal i Tooltip i Menu dzielą wewnętrzne helpery z `@floating-ui/react`, Rollup nie może bezpiecznie wyciąć Dialog'a, bo nie wie co jest "side-effect free" wewnątrz wspólnego pliku.

2. **`sideEffects: ["**/*.css"]` jest poprawnie skonfigurowane** — Rollup oznacza JS jako side-effect-free. Ale to nie wystarczy gdy cały lib JEST jednym plikiem. Tree-shaker działa **per moduł (plik)**, nie per export wewnątrz pliku.

3. **`vite-plugin-lib-inject-css` z single entry** generuje JEDEN `index.css` 80 KB — wszystkie style komponentów. Konsument zawsze pobiera całość niezależnie ile komponentów importuje.

4. **Co działa**: gdy komponent jest "leafem" w grafie zależności (Snackbar, Avatar) — Rollup widzi że nikt go nie używa i wyrzuca.

5. **Co nie działa**: gdy komponent jest "głęboko spleciony" (Dialog/Menu/Select dzielą Base UI floating helpery, Mantine theme context) — jedna wspólna funkcja wewnątrz monolitycznego pliku trzyma cały graf.

## Subpath exports — wykonalność

### Vite multi-entry config

Dokumentacja Vite (oficjalna) — Library Mode → Multiple Entries:

```ts
// vite.config.mts
export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        button: resolve(__dirname, 'src/components/button/index.ts'),
        modal: resolve(__dirname, 'src/components/modal/index.ts'),
        menu: resolve(__dirname, 'src/components/menu/index.ts'),
        // ... per komponent
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name].[hash].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
  plugins: [libInjectCss(), dts({ entryRoot: 'src' })],
});
```

**Multi-entry zachowanie**:
- Każdy `entry.X` staje się **osobnym chunkiem ESM**, dzielonym kodem trafia do `chunks/`
- Rollup automatycznie ekstraktuje shared code do `chunks/*` (Base UI helpery wspólne dla Menu/Modal/Select trafią tam raz)
- Konsument importujący tylko `'@synergycodes/overflow-ui/button'` ładuje `dist/button.js` + ewentualne shared chunks **tylko jeśli Button ich potrzebuje**

### vite-plugin-dts compatibility

`vite-plugin-dts@4.5` **wspiera multi-entry** out of the box (potwierdzone w README + dokumentacji unplugin-dts):
- `entryRoot: 'src'` zachowuje strukturę katalogów
- Każdy entry dostaje własny `.d.ts` w `dist/`
- Bez specjalnej konfiguracji per entry
- Trzeba mieć `tsconfig.json` z `include` pokrywającym wszystkie entries (już jest)

### Alternatywa: `preserveModules`

Inny model: zamiast multi-entry list, zachowaj 1:1 strukturę katalogów źródła:

```ts
build: {
  lib: { entry: 'src/index.ts', formats: ['es'] },
  rollupOptions: {
    output: {
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: '[name].js',
    },
  },
}
```

Wynik: **każdy plik src** staje się osobnym plikiem `dist`. Bundlery konsumentów mogą drabinkowo tree-shake'ować **per plik**.

**Trade-off `preserveModules` vs multi-entry**:

| Aspekt | multi-entry | preserveModules |
|---|---|---|
| Setup | Lista entries w config | Automat (cała struktura src) |
| Output structure | Płaska, kontrolowana | Lustro src |
| Shared chunks | Auto-ekstrakt | Brak (każdy plik standalone) |
| Bundle size duplication | Niskie (shared chunks) | Możliwe duplikaty jeśli nie ma shared |
| `node_modules/` w dist | Brak | Może wystąpić (regex workaround konieczny) |
| Subpath exports kontrola | Pełna (wybieramy co eksportujemy) | Wszystko jest dostępne (też internals) |
| API stability | Mocna (jasne entries) | Słaba (konsument może importować internals) |

**Rekomendacja: multi-entry > preserveModules** dla naszego case'a — kontrola publicznego API.

### CSS split

`vite-plugin-lib-inject-css` od v2.x **wspiera multi-entry**. Mechanizm:
- Każdy entry chunk dostaje na top `import './button.css'` (per komponent)
- Rollup `assetFileNames: 'assets/[name][extname]'` daje `dist/assets/button.css`, `dist/assets/modal.css`
- Wspólne style (CSS importowane przez kilka komponentów) ekstrahowane do shared CSS chunk
- **Konsument importujący tylko Button dostaje tylko CSS Buttona** — ~3-5 KB zamiast 80 KB

Wymóg: `build.cssCodeSplit: true` (default) musi zostać włączone — przy `false` plugin omija side-effect inject.

Dla `tokens.css`:
- Pozostaje jako oddzielny entry: `"./tokens.css": "./dist/tokens.css"` (już jest)
- Konsument importuje tokens raz globalnie w app entry: `import '@synergycodes/overflow-ui/tokens.css'`
- Tokens NIE są dublowane w per-component CSS

### Przykład @base-ui/react

`@base-ui/react@1.4.1` jest klasycznym wzorcem subpath exports.

`package.json.exports` (skrót — pełny ma 50+ wpisów):
```json
{
  "sideEffects": false,
  "exports": {
    ".": { "import": { "types": "./esm/index.d.ts", "default": "./esm/index.js" } },
    "./accordion": { "import": { "types": "./esm/accordion/index.d.ts", "default": "./esm/accordion/index.js" } },
    "./dialog": { "import": { "types": "./esm/dialog/index.d.ts", "default": "./esm/dialog/index.js" } },
    "./menu": { "import": { "types": "./esm/menu/index.d.ts", "default": "./esm/menu/index.js" } },
    "./tooltip": { "import": { "types": "./esm/tooltip/index.d.ts", "default": "./esm/tooltip/index.js" } },
    "./internals/use-button": { ... },
    "./internals/composite": { ... }
  }
}
```

**Zauważ**:
- `sideEffects: false` (cały lib treeshake-friendly, oni nie mają CSS w paczce)
- Każdy komponent ma własny entry **z osobnym `types`** (per condition: import/require)
- `./internals/*` — pomniejsze utility też ekspozowane jako subpath (świadomie, dla advanced use)
- Każdy entry to katalog `esm/menu/index.js` z własnym chunkiem JS
- Bundle multi-file: `.pnpm/@base-ui+react.../esm/menu/{index.js, index.parts.js, item/MenuItem.js, ...}` — preserveModules-style

### Mantine — przeciwprzykład

`@mantine/core@7.17.2` ma **single-entry** + `sideEffects: ["*.css"]` — taki sam wzorzec jak nasz.
Ich bundle ma 1.5+ MB raw. Tak samo cierpi na transitive bundle bloat. **Brak subpath exports** = znany problem Mantine'a, dyskutowany od 7.x.

## Migration plan jeśli idziemy

### Krok 1: package.json exports field

```jsonc
{
  "name": "@synergycodes/overflow-ui",
  "type": "module",
  "sideEffects": ["**/*.css"],
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./tokens.css": "./dist/tokens.css",
    "./button": {
      "types": "./dist/components/button/regular-button/button.d.ts",
      "import": "./dist/button.js"
    },
    "./nav-button": {
      "types": "./dist/components/button/nav-button/nav-button.d.ts",
      "import": "./dist/nav-button.js"
    },
    "./modal": {
      "types": "./dist/components/modal/modal.d.ts",
      "import": "./dist/modal.js"
    },
    "./menu": {
      "types": "./dist/components/menu/menu.d.ts",
      "import": "./dist/menu.js"
    },
    "./tooltip": {
      "types": "./dist/components/tooltip/tooltip.d.ts",
      "import": "./dist/tooltip.js"
    },
    "./input": { "types": "...", "import": "./dist/input.js" },
    "./checkbox": { "types": "...", "import": "./dist/checkbox.js" },
    "./select": { "types": "...", "import": "./dist/select.js" },
    "./switch": { "types": "...", "import": "./dist/switch.js" },
    "./radio": { "types": "...", "import": "./dist/radio.js" },
    "./date-picker": { "types": "...", "import": "./dist/date-picker.js" },
    "./accordion": { "types": "...", "import": "./dist/accordion.js" },
    "./avatar": { "types": "...", "import": "./dist/avatar.js" },
    "./snackbar": { "types": "...", "import": "./dist/snackbar.js" },
    "./status": { "types": "...", "import": "./dist/status.js" },
    "./separator": { "types": "...", "import": "./dist/separator.js" },
    "./segment-picker": { "types": "...", "import": "./dist/segment-picker.js" },
    "./collapsible": { "types": "...", "import": "./dist/collapsible.js" },
    "./text-area": { "types": "...", "import": "./dist/text-area.js" },
    "./node": { "types": "...", "import": "./dist/node.js" },
    "./edge": { "types": "...", "import": "./dist/edge.js" }
  }
}
```

`./node` i `./edge` jako bundle z grupy (NodePanel + NodeIcon + NodeAsPortWrapper + NodeDescription, EdgeLabel + useEdgeStyles).

### Krok 2: vite.config.mts

```ts
const componentEntries = {
  index: resolve(__dirname, 'src/index.ts'),
  button: resolve(__dirname, 'src/components/button/regular-button/button.tsx'),
  'nav-button': resolve(__dirname, 'src/components/button/nav-button/nav-button.tsx'),
  modal: resolve(__dirname, 'src/components/modal/modal.tsx'),
  menu: resolve(__dirname, 'src/components/menu/index.ts'),
  tooltip: resolve(__dirname, 'src/components/tooltip/index.ts'),
  // ...
};

export default defineConfig({
  build: {
    lib: {
      entry: componentEntries,
      formats: ['es'],
    },
    cssCodeSplit: true, // KRYTYCZNE
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: (info) => {
          if (info.name?.endsWith('.css')) return 'assets/[name][extname]';
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  plugins: [
    libInjectCss(),
    dts({ entryRoot: 'src' }),
    viteStaticCopy({ ... }), // tokens.css bez zmian
    visualizer({ ... }),
  ],
});
```

**Niektóre komponenty wymagają stworzenia `index.ts` per komponent** (Menu ma `menu.tsx` + `menu-item.tsx` + `types.ts` — potrzebny `src/components/menu/index.ts` agregujący).

### Krok 3: Konsument migration

**Stary import (działa nadal)**:
```ts
import { Button, Modal } from '@synergycodes/overflow-ui';
```
↑ Konsument dostaje `dist/index.js` które reeksportuje wszystko (i wszystkie shared chunks). Stara ścieżka **bundle bloat zostaje**, ale działa wstecznie.

**Nowy import (preferowany)**:
```ts
import { Button } from '@synergycodes/overflow-ui/button';
import { Modal } from '@synergycodes/overflow-ui/modal';
```
↑ Konsument dostaje tylko `dist/button.js` + `dist/modal.js` + **wspólne shared chunks** (np. Base UI floating helpers raz, jeśli oba ich używają).

**Codemod możliwy**:
- AST-based rename `from '@synergycodes/overflow-ui'` → per-import subpath
- Mapping {Button: 'button', Modal: 'modal', ...} z istniejącego `index.ts`
- jscodeshift / ts-morph trywialny do napisania (każdy named import → osobny statement na subpath)

### TypeScript types — uwaga

- `vite-plugin-dts` wygeneruje `.d.ts` per entry przy entryRoot='src'
- Konsument w `tsconfig.json` z `moduleResolution: "bundler"` lub `"node16"/"nodenext"` automatycznie odczyta `exports.X.types`
- `moduleResolution: "node"` (legacy) **NIE działa** z exports field — konsument w tym trybie musi mieć `paths` mapping
- W praktyce 99% projektów używa `bundler` (Vite/Webpack 5) lub `nodenext` (Node)

### Test plan

1. Dodać `exports` do `package.json` step-by-step (jeden komponent na raz)
2. Stworzyć multi-entry vite config
3. Zbudować lib, sprawdzić `dist/` strukturę
4. Test consumer 4 warianty:
   - Old import path (`'@synergycodes/overflow-ui'`) → bundle ~409 KB (current)
   - Subpath Button → bundle target **<50 KB JS / 5-8 KB CSS**
   - Subpath 5 komponentów → bundle target **<150 KB JS / 20 KB CSS**
   - Subpath all → ~ same as old import (sanity check)
5. TypeScript: `tsc --noEmit` w consumer projekcie z `moduleResolution: 'bundler'`

## Rekomendacja

**TAK — idziemy w subpath exports z multi-entry vite config.**

Argumenty:
1. **Tree-shake na obecnym bundle to 95% iluzja**. Eksperyment pokazał, że konsument importujący `Button` dostaje 105 KB gzip JS — czyli ~95% pełnego bundle (162 KB gzip). Nawet dla 5 komponentów strata to <7 KB gzip.
2. **CSS jest 100% nie-tree-shake'owalny w obecnym setupie** — 80 KB / 10 KB gzip zawsze, niezależnie od użycia.
3. **Konsumenci small-app (panel z 5 komponentami)** płacą full price. To dla nich biblioteka jest nieatrakcyjna size-wise.
4. **Pattern jest dobrze sprawdzony** — `@base-ui/react`, `@radix-ui/*`, `@mui/material/{X}` od lat. Nasz Vite + dts toolchain ma full support.
5. **Backwards compat zachowany** — stary `import { Button } from '...'` nadal działa przez `"."` entry.
6. **Migration cost niski** — codemod realne, dokumentacja prosta, testy łatwe.

Argumenty PRZECIW (które rozważyliśmy):
- Większa złożoność buildu — **TAK, ale konfig jednorazowy**, później transparenty
- Więcej `index.ts` per komponent (np. `src/components/menu/index.ts` agregujący eksporty) — **TAK, ale to porządek architektoniczny**
- Konsument musi zmienić importy — **TAK, ale stary import działa** + codemod możliwy
- Możliwy problem z `moduleResolution: 'node'` (stare projekty) — **edge case**, dziś rzadkość

## Estimated bundle saving for typical consumer

Założenia: konsument używa Button, Modal, Input, Tooltip, Checkbox.

Obecne (single entry):
- JS: 105-112 KB gzip (95-100% pełnego bundle)
- CSS: 10 KB gzip (100% pełnego CSS)

Po migracji (subpath exports + cssCodeSplit):
- JS: target **40-60 KB gzip** (Button + Modal + ich shared Base UI floating-ui chunks; bez DatePicker, Mantine, Phosphor unused)
- CSS: target **3-5 KB gzip** (tylko CSS dla Button/Modal/Input/Tooltip/Checkbox)

**Realny przewidywany zysk dla typowego konsumenta**: **~50-70 KB gzip JS + ~5-7 KB gzip CSS = ~55-77 KB gzip total** (z ~115 KB → ~45 KB).

Dla konsumenta używającego **2 komponentów** (np. tylko Button + Tooltip): zysk ~80+ KB gzip — bundle skurczy się o ~70%.

Dla konsumenta używającego **wszystkich** komponentów: zysk ~0 (oczywiste), ale zachowuje optymalne shared chunking.

## Źródła

- [Vite Build — Library Mode](https://vite.dev/guide/build.html#library-mode)
- [vite-plugin-lib-inject-css (multi-entry support)](https://github.com/emosheeep/vite-plugin-lib-inject-css)
- [vite-plugin-dts](https://github.com/qmhc/vite-plugin-dts)
- [How to build tree-shakable library with Vite and Rollup (dev.to)](https://dev.to/morewings/how-to-build-a-tree-shakable-library-with-vite-and-rollup-16cb)
- [Vite/Rollup preserveModules for libraries (Jeremy Richardson)](https://jeremyrichardson.dev/blog/vite-rollup-preservemodules-for-libraries)
- `@base-ui/react@1.4.1/package.json` (50+ subpath exports, sideEffects: false)
- `@mantine/core@7.17.2/package.json` (single entry, kontrast)
