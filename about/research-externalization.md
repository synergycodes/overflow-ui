# Externalization strategy — `@synergycodes/overflow-ui`

> Research: czy i jak warto przenieść dependencies z `dependencies` do `peerDependencies`,
> żeby zmniejszyć rozmiar bundla `dist/overflow-ui.js`.
> Data: 2026-05-05. Źródło danych rozmiarów: lokalny build (`dist/bundle-stats.json`).

---

## TL;DR

- **Realny rozmiar bundla po minify+gzip: 165.94 KB.** (628.27 KB raw)
- Dominują **`@base-ui/react` + `@base-ui/utils` + powiązane `@floating-ui/*` + `tabbable`** —
  ~73 % gzipowanego bundla. To one są realnym celem dla externalizacji.
- **Mantine już jest dead code w bundlu JS** — `DatePicker` to obecnie stub (`<button>`),
  z `@mantine/core`/`@mantine/dates` nie idzie żaden import po stronie TS. Externalizacja
  Mantine = **0 KB oszczędności w JS**, ale i tak warto wyrzucić z `dependencies`,
  bo niepotrzebnie zaśmieca `node_modules` konsumenta (~kilkanaście MB on disk).
- Realistyczne scenariusze:
  - **A (low-risk, phosphor):** ~4–5 KB gzip oszczędności. Mało, ale tanio.
  - **B (phosphor + base-ui + floating-ui):** **~120 KB gzip oszczędności** (bundle spada do ~45 KB).
    Wymaga od konsumenta zainstalowania 2 paczek. Major bump.
  - **C (full):** ~123 KB gzip — niewiele więcej niż B, bo `clsx` i `react-textarea-autosize`
    są małe i często uniqe-do-tej-libki.
- **Konwencja React UI libs:** wewnętrzne primitives (Radix, HeadlessUI) bundlują wszystko poza
  React. Higher-level libs (MUI, Mantine, Chakra) wymagają tylko styling engine jako peer
  (emotion/Mantine hooks). `@synergycodes/overflow-ui` jest higher-level (komponenty końcowe),
  więc **trzymanie wewnętrznych libów jako `dependencies` jest defensible** — ALE
  `@base-ui/react` to nie wewnętrzny detal, to API surface (subpath imports).

**Rekomendacja:** Scenariusz **B** dla biblioteki, plus cleanup `@mantine/*` z `dependencies`
przy okazji DatePicker rebuild. Patrz sekcja "Rekomendacja" na końcu.

---

## Aktualny stan

### Vite config

```ts
external: ['react', 'react-dom', 'react/jsx-runtime']
```

Tylko React jest external. Reszta jest inline-bundlowana.

### Bundle final (z `pnpm --filter @synergycodes/overflow-ui build`)

| Plik | rozmiar raw | gzip |
| --- | --- | --- |
| `dist/overflow-ui.js` | 628.27 KB | **165.94 KB** |
| `dist/index.css` | 81.90 KB | 10.60 KB |

### Per-package breakdown (z `dist/bundle-stats.json`, pre-minify gzip)

Skrypt agreguje per top-level package z `node_modules/.pnpm`. Estymata final gzip
to udział w pre-minify gzip (237.95 KB), pomnożony przez końcowy (165.94 KB), czyli
ratio 0.697.

| Package                       | rendered KB | pre-min gzip KB | est. final gzip KB | files |
| --- | ---: | ---: | ---: | ---: |
| `@base-ui/react`              | 403.0 | 125.4 | **87.4** | 139 |
| `_app_` (kod źródłowy `src/`) | 49.2  | 24.1  | 16.8 | 124 |
| `@base-ui/utils`              | 45.0  | 17.4  | 12.2 | 33 |
| `@floating-ui/react`          | 62.0  | 15.7  | 10.9 | 2 |
| `@floating-ui/dom`            | 48.6  | 12.7  | 8.9 | 2 |
| `@floating-ui/core`           | 42.2  | 10.2  | 7.1 | 2 |
| `tabbable`                    | 25.1  | 7.8   | 5.4 | 1 |
| `@phosphor-icons/react`       | 20.2  | 7.1   | **4.96** | 16 |
| `@floating-ui/utils`          | 17.9  | 5.4   | 3.8 | 4 |
| `@floating-ui/react-dom`      | 16.6  | 4.7   | 3.3 | 2 |
| `use-sync-external-store`     | 13.4  | 4.2   | 2.96 | 6 |
| `react-textarea-autosize`     | 6.7   | 2.1   | 1.5 | 1 |
| `use-composed-ref`            | 0.6   | 0.3   | 0.2 | 1 |
| `@babel/runtime`              | 0.5   | 0.4   | 0.26 | 2 |
| `clsx`                        | 0.4   | 0.2   | **0.16** | 1 |
| `use-latest`, `use-iso...`    | 0.1   | 0.1   | 0.1 | 2 |
| **TOTAL**                     | **752** | **237.9** | **~166** | — |

### Niespodzianka: gdzie Mantine?

`@mantine/core` i `@mantine/dates` są w `dependencies` ale **w bundlu JS ich nie ma**.
Powód: jedyny komponent który mial Mantine, `DatePicker`, jest obecnie stubem
(`packages/ui/src/components/date-picker/date-picker.tsx` to `<button>` z placeholder
tekstem). `import` Mantine zostały usunięte. Plik `data-picker-mantine.css` zawiera
tylko CSS classnames `.mantine-*`, które są scoped przez CSS Modules i nie wpływają
realnie na nic. Tree-shaking + brak ESM imports = 0 wkładu w bundle.

To znaczy, że dla aktualnego wydania:

- Externalizacja `@mantine/*` da **0 KB oszczędności w JS**.
- Ale i tak `@mantine/core` + `@mantine/dates` siedzą w `node_modules` konsumenta
  (~10+ MB on disk) niepotrzebnie.
- DatePicker rebuild epic to dobry moment żeby wyrzucić `@mantine/*` z `dependencies`
  równolegle z decyzją o nowej implementacji.

---

## Per-dependency analysis

### `@phosphor-icons/react@^2.1.7`

- **Bundle weight (tree-shaken):** ~4.96 KB gzip (8 unikalnych ikon: `Check`, `CaretDown`,
  `CaretUp`, `ExclamationMark`, `Info`, `Minus`, `X` — używane w 8 plikach).
- **Pakiet sam w sobie ogromny:** 6.5 MB raw / 1.2 MB gzip dla **całości** (bundlephobia).
  My wyciągamy 5 KB. Tree-shaking działa dobrze.
- **Adoption:** TAK. Konsumenci `@synergycodes/overflow-ui` (apki react-flow z UI)
  bardzo często mają już własne ikony. `@phosphor-icons/react` ma **1.49 mln pobrań/tydzień**
  (npm registry, tydz. 2026-04-28 / 2026-05-04). Konkurencja: `lucide-react`, `react-icons`,
  `@heroicons/react` — konsumenci mogą mieć dowolny.
- **Version risk:** średni. Major v3 może przenieść/zmienić nazwy ikon. Nasza biblioteka
  używa konkretnych nazw, więc gdy konsument zaktualizuje phosphor do v3 a my nie —
  ikona może zniknąć. Mitigation: `peerDependencies: '^2.0.0 || ^3.0.0'` po sprawdzeniu
  v3 changeloga, lub trzymanie phosphor jako dependency (defensive).
- **Breaking change cost:** średni — `peerDependencies` triggeruje warning install ale nie blokuje;
  konsument **musi sam zainstalować** (`pnpm add @phosphor-icons/react`).
- **Recommendation:** **Externalize.** Ratio "konsument prawdopodobnie ma" jest wysoki,
  a 5 KB to wciąż 3 % całego bundla. Update README z install instructions.

### `@base-ui/react@^1.4.1` (+ `@base-ui/utils@0.2.8`)

- **Bundle weight:** **87.4 KB gzip** (`react`) + **12.2 KB** (`utils`) = **~100 KB gzip**.
  To **60 %** całego bundla. Plus pociąga `@floating-ui/*` jako swoje deps.
- **Co zmienia tree-shaking:** używamy 5 modułów: `select`, `menu`, `switch`, `dialog`, `input`.
  Subpath imports (`@base-ui/react/menu`) działają tu na korzyść tree-shake'u, ale `@base-ui/react`
  ma dużo wewnętrznych helperów (`@base-ui/utils`, focus management, portal logic) które
  trafiają do bundla niezależnie od tego ile primitivów się używa.
- **Adoption:** **NIE.** Niska. 3.7 mln pobrań/tydz. brzmi sporo, ale to głównie pull przez
  inne libki tu i Storybook tooling. Apki react-flow nie mają `@base-ui/react` "z natury".
  Konsument musiałby świadomie zainstalować — to nie jest "darmowe" na poziomie ekosystemu.
- **Version risk:** **wysoki**. Major version 1 wyszedł niedawno (1.0 ~2025), major 2 prawdopodobnie
  pojawi się w ciągu roku/dwóch. Jeśli konsument ma 1.x a my 2.x w peer range — crash.
  Subpath imports dodają jeszcze ryzyko: zmiana eksportu z `@base-ui/react/select` na
  `@base-ui/react/Select` (case) = łamie naszą importowaną ścieżkę.
- **Breaking change cost:** **wysoki**. Konsument musi:
  ```bash
  pnpm add @base-ui/react
  ```
  i pamiętać przy aktualizacjach. Brak — `Menu`, `Select`, `Switch`, `Dialog`, `Input` przestają
  działać runtime.
- **Recommendation:** **Externalize w scenariuszu B/C.** Mocne uzasadnienie z bundle (87 KB),
  ale obciążenie dla konsumenta. Alternatywa: zostawić jako dep i pogodzić się z dużym bundlem.
  **Inny argument za externalize:** jeśli konsument sam używa `@base-ui/react`, to bez
  externalizacji w jego app pojawiają się **dwie kopie** library (jego + nasza), co
  potrafi zepsuć kontekst (np. portal layering, focus traps). Externalize załatwia to
  przy okazji.

### `@floating-ui/react@^0.26.28` (+ `@floating-ui/dom`, `core`, `utils`, `react-dom`, `tabbable`)

- **Bundle weight:** ~30 KB gzip (`react`+`dom`+`core`+`utils`+`react-dom`+`tabbable`). Detail
  per moduł w tabeli wyżej.
- **Co używamy:** `useFloating`, `useInteractions`, `useHover`, `useFocus`, `useDismiss`,
  `useRole`, `useMergeRefs`, `OffsetOptions`, `Placement` w `tooltip/` i `menu/`. Tree-shake
  działa, ale bundle library nie jest mały.
- **Adoption:** wysoka (14.9 mln pobrań/tydz). Każdy popularny komponentowy lib
  (`@base-ui/react`, `@radix-ui/*`, `@headlessui/react`, `cmdk`) używa jej. Apki react-flow
  z dowolną UI libką **prawie na pewno** mają ją tranzytywnie.
- **Version risk:** **wysoki**. Pre-1.0 (`0.26.x` → `0.27.x` → docelowo 1.0). Mantine 7
  używa `0.26.28`, najnowsza w npm to `0.27.19`. Konsument który ma 0.27 z innej libki +
  my chcemy 0.26 = peer warning. W praktyce 0.26 i 0.27 są kompatybilne API, więc szeroki
  range `^0.26 || ^0.27` ratuje.
- **Breaking change cost:** średni. Konsument typowy ma już via inne libki, niewielu
  będzie świadomie instalować.
- **Recommendation:** **Externalize.** Wysoka adopcja + spora oszczędność (~30 KB)
  + mała unikatowość użycia. Konsument zwykle ma.

### `@mantine/core@^7.17.2` + `@mantine/dates@^7.17.2`

- **Bundle weight w aktualnym buildzie:** **0 KB.** (już dead code, patrz wyżej).
- **Bundle weight gdyby były używane** (z DatePickera): ~80–110 KB gzip dla `@mantine/dates`
  + cały `@mantine/core` ~50 KB minimum jeśli używamy DateInput, plus `dayjs` ~5 KB.
  Łącznie ~140–160 KB gzip — to byłby ogromny dodatek do bundla.
- **Adoption:** **NIE.** Mantine to konkurencyjna UI libka — apka react-flow albo używa
  Mantine *jako swojej* UI libki (rzadko, bo wybiera nas) albo nie ma jej wcale.
- **Version risk:** wysoki. Mantine 7 → 9 (tak: 9 jest aktualną wersją w npm) wymagało zmian
  CSS, peerDependencies i layoutu. Wersja 7.17.2 którą trzymamy jest 2 majory za current.
- **Breaking change cost:** brak realnego kosztu — i tak nie używamy.
- **Recommendation:** **Wyrzucić z `dependencies`** przy okazji DatePicker rebuild. Nie ma
  sensu utrzymywać peer-link do paczek które nie są używane. Jeśli rebuild zostawia Mantine
  jako runtime — wtedy peer (`peerDependencies` + `peerDependenciesMeta.optional: true`)
  z explicit instrukcją w README.

### `clsx@^2.0.0`

- **Bundle weight:** ~0.16 KB gzip. **Mniej niż błąd zaokrąglenia.**
- **Adoption:** masowa (91.5 mln pobrań/tydz). Konsumenci w 95 % przypadków mają.
- **Version risk:** zerowy. clsx jest stabilny od lat, API się nie zmienia, wersja 1 i 2
  są wymienne praktycznie zawsze.
- **Breaking change cost:** żaden — nawet jeśli konsument nie ma, npm sam zainstaluje
  z trzeciego poziomu zależności.
- **Recommendation:** **NIE externalize.** 0.16 KB to nie jest oszczędność warta
  jakiegokolwiek dokumentowania/komunikowania. Trzymanie jako dep też kosztuje 0.

### `react-textarea-autosize@^8.5.6`

- **Bundle weight:** 1.5 KB gzip (sam pakiet). Plus mikrodependencje (`use-composed-ref`,
  `use-latest`, `use-isomorphic-layout-effect`, `@babel/runtime` dla helpers) — łącznie
  ~2 KB gzip jeśli policzymy razem.
- **Adoption:** 6.7 mln pobrań/tydz. Sporo, ale to specyficzny use-case (auto-rosnące textarea
  w formach/edytorach). Konsumenci często mają tylko jeśli sami implementują podobne
  pole. Konsumenci react-flow piszący komponenty edge labels / node body z tekstem
  — mają szansę.
- **Version risk:** niski. Pakiet jest stabilny, peerDeps szerokie (`^16.8.0 || ... || ^19.0.0`).
- **Breaking change cost:** średni — konsument nie ma "z automatu", musi sam dodać.
- **Recommendation:** **NIE externalize.** Zysk 1.5 KB nie wart breaking change'u.
  Granica zysk/koszt jest tu poniżej progu.

---

## Scenariusze

### Scenariusz A — minimalna externalizacja (`@phosphor-icons/react`)

**Zmiana:**
- `package.json`: `@phosphor-icons/react` przenosi się z `dependencies` do `peerDependencies`.
  Dodatkowo `peerDependenciesMeta` ustawione na `{"optional": false}` (ale `meta` raczej
  niepotrzebne — biblioteka nie działa bez ikon).
- `vite.config.mts`: `external: ['react', 'react-dom', 'react/jsx-runtime', '@phosphor-icons/react']`.

**Estymata oszczędności:** ~5 KB gzip.
**Bundle library po:** ~161 KB gzip (z 165.94).

**Pros:**
- Najmniejsze ryzyko — pakiet który konsument zwykle już ma.
- Łatwa instrukcja w README: `pnpm add @phosphor-icons/react`.
- Jeśli konsument ma **tę samą** instancję phosphor (np. via deduplication), może się
  zdarzyć drobne lepsze tree-shaking u konsumenta (jego ikony + nasze 8 ikon w jednym chunku).

**Cons:**
- Marginalna oszczędność (3 % bundla).
- I tak musi być nowa major (lub minor z dokumentacją) wersja biblioteki.
- Jeśli konsument **nie ma**, dostaje warning i runtime crash po imporcie naszej libki.

**Werdykt:** Tylko jeśli i tak idzie major bump z innego powodu. Sam za sobą nie warto.

### Scenariusz B — agresywna (`@phosphor-icons/react` + `@base-ui/react` + `@floating-ui/react`)

**Zmiana:**
- `package.json`: 3 pakiety przeniesione do `peerDependencies`.
- `vite.config.mts`:
  ```ts
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    '@phosphor-icons/react',
    /^@base-ui\/react/,        // pattern, bo używamy subpath imports (/menu, /select, ...)
    /^@base-ui\/utils/,
    /^@floating-ui\//,         // wszystkie podpaczki floating-ui w jednym wzorze
    'tabbable',                // pociągnięte przez floating-ui
    'use-sync-external-store', // pociągnięte przez base-ui
  ]
  ```
  Uwaga: subpath imports w base-ui wymagają regex (`/^@base-ui\/react(\/|$)/`).
- README: instrukcja install:
  ```bash
  pnpm add @synergycodes/overflow-ui \
    @phosphor-icons/react \
    @base-ui/react \
    @floating-ui/react
  ```

**Estymata oszczędności:**
- `@phosphor-icons/react`: 5 KB
- `@base-ui/react` + `@base-ui/utils`: ~100 KB
- `@floating-ui/react` + `dom` + `core` + `utils` + `react-dom` + `tabbable`: ~30 KB
- `use-sync-external-store`: ~3 KB (depencja base-ui)
- **Razem:** **~138 KB gzip oszczędności.**

**Bundle library po:** **~28 KB gzip** (165.94 - 138). Realnie pewnie 30–40 KB
po accountingu na to że niektóre helpery mogą zostać.

**Pros:**
- Drastyczna redukcja bundla (165 → ~30 KB, **5×** mniej).
- Eliminuje ryzyko podwójnych instancji `@base-ui/react` (rare, ale realne dla apek
  używających też base-ui samodzielnie — np. shadcn-style projekty).
- Single source of truth dla tooltip/menu/select positioning logic.

**Cons:**
- Konsument musi **świadomie zainstalować 3 pakiety**. To jest friction.
- Ryzyko version mismatch — `@base-ui/react` jest w aktywnym rozwoju (1.x → 2.x w przewidywalnej
  przyszłości).
- Subpath imports z `@base-ui/react` wymagają poprawnego skonfigurowania `external`
  w vite (regex), inaczej rollup nie zewnętrzni paczek.
- Major version bump biblioteki (semver: removing dependency to peer = breaking).
- README + CHANGELOG + migration guide są obowiązkowe.

**Werdykt:** **Najbardziej rozsądny tradeoff.** 138 KB to gigantyczna oszczędność, koszt
3 instalacji jest pojedynczą operacją na wiek życia projektu konsumenta, peer ranges
można ustawić szeroko.

### Scenariusz C — pełna externalizacja (wszystko poza `clsx` i `react-textarea-autosize`)

**Zmiana:**
- B + dodatkowo dodać `react-textarea-autosize` na peer.
- `clsx` zostawić jako dep (nie ma sensu dotykać).
- `@mantine/*` wyrzucić z deps zupełnie (dead code).

**Estymata oszczędności:**
- B: 138 KB
- `react-textarea-autosize` + jego mikrodepy: ~2 KB
- **Razem:** ~140 KB gzip oszczędności.

**Bundle library po:** **~26 KB gzip.**

**Pros:**
- Maksymalna oszczędność.
- Bundle jest "thin shell" wokół ekosystemu.

**Cons:**
- Konsument **musi zainstalować 4 pakiety** (3 z B + textarea).
- `react-textarea-autosize` to specyficzny pakiet — konsument bardzo rzadko ma,
  daje minimalny zysk (1.5 KB) za realny friction.
- Stosunek korzyści do dodatkowego friction (B → C) jest **bardzo niski** (~2 KB za
  kolejną instalację).

**Werdykt:** **Nie warto.** B daje 99 % oszczędności C bez ostatniego friction stepa.
Trzymać `react-textarea-autosize` jako dep.

### Porównanie

| Scenariusz | bundle gzip | oszczędność gzip | dodatkowych pakietów do instalacji | major bump? |
| --- | ---: | ---: | ---: | --- |
| Status quo | 165.94 KB | — | 0 | — |
| **A** (phosphor)   | ~161 KB    | ~5 KB | 1 | tak |
| **B** (3 pakiety)  | **~28 KB** | **~138 KB** | 3 | tak |
| C (B + textarea)   | ~26 KB     | ~140 KB | 4 | tak |

---

## Konwencja React UI libraries

### Co jest convention?

Po przeglądzie metadanych npm:

| Library | Co jest peer? | Co jest dep? | Komentarz |
| --- | --- | --- | --- |
| **`@radix-ui/react-dialog`** | `react`, `react-dom`, `@types/react`, `@types/react-dom` | `react-remove-scroll`, `aria-hidden`, wszystkie wewnętrzne `@radix-ui/*` primitives | Każdy primitive jest osobną paczką ALE wewnętrzne deps są inline. Konsument bierze co potrzeba na poziomie Radix-ui (nie deps Radixa). |
| **`@headlessui/react`** | `react`, `react-dom` | `@floating-ui/react`, `@react-aria/focus`, `@react-aria/interactions`, `@tanstack/react-virtual`, `use-sync-external-store` | Floating-ui jest **inline**. Headless UI jest "thin" ale nie externalizuje internals. |
| **`@chakra-ui/react`** | `react`, `react-dom`, **`@emotion/react`** | `@ark-ui/react` (cała paczka — 100+ submodules!), `@emotion/serialize`, `csstype`, etc. | Styling engine (Emotion) na peer, runtime engine (Ark UI) inline. |
| **`@mui/material`** | `react`, `react-dom`, **`@emotion/react`**, **`@emotion/styled`**, `@types/react`, `@mui/material-pigment-css` | (cała MUI logika inline) | Tylko styling engine na peer. Wszystko inne MUI'owe — inline. |
| **`@mantine/core`** | `react`, `react-dom`, **`@mantine/hooks`** | (cały Mantine inline) | Companion lib (hooks) na peer. Reszta inline. |
| **`@base-ui/react`** | `react`, `react-dom`, `@types/react`, `@date-fns/tz`, `date-fns` | `@floating-ui/react-dom`, `@floating-ui/utils`, `use-sync-external-store`, `@base-ui/utils`, `@babel/runtime` | Floating UI dom (sub-set!) inline. Date-fns na peer (kontrowersyjne — date-fns to ogromna lib). |

### Wzorce, które się powtarzają

1. **React + ReactDOM zawsze peer.** To 100 % case'ów. Nie pytamy.
2. **Styling engine** (Emotion, jeśli używany) jest **peer**.
   - MUI, Chakra, częściowo Material UI v5+: `@emotion/react` + `@emotion/styled` peer.
   - **My nie używamy emotion** (CSS Modules), więc to nie nasz case.
3. **Companion lib z tego samego projektu** (Mantine hooks for Mantine core) jest peer.
   - **My nie mamy companion lib.**
4. **Wewnętrzne primitives** (Radix sub-packages, Ark UI dla Chakra) są inline.
   - To dlatego, że konsument bierze "lib jako lib" i nie powinien myśleć o wewnętrznej
     architekturze.
5. **`@floating-ui/*`:** Headless UI — inline. Base UI — częściowo peer (`react-dom` and
   `utils` jako deps, ale `@floating-ui/react` jest implementacja własna w `@base-ui/react`).
6. **`@types/react`** w peer (z `peerDependenciesMeta.optional: true`) jest standardem
   gdy lib używa typów React w API. **My powinniśmy to dodać** niezależnie od scenariusza.

### Jaki to konteks dla nas?

`@synergycodes/overflow-ui` jest **higher-level** library — gotowe komponenty (Modal, Menu,
Select, Tooltip, Snackbar) z opinionated styling. Konwencja dla takich libów (MUI, Chakra,
Mantine) to: **wszystko inline poza React + styling engine**. Nie używamy emotion → nie
mamy peer styling engine → naturalny target to **tylko React** (czyli status quo).

ALE: kluczowa różnica to **rozmiar `@base-ui/react`**. W MUI/Mantine/Chakra wewnętrzne
primitives to ~10 KB submodulów. U nas **`@base-ui/react` to 100 KB gzip = 60 % bundla**.
To inwersja zwykłego stosunku. Standardowa konwencja "wszystko inline" przestaje być
opłacalna.

**Najbliższa analogia:** Headless UI ma `@floating-ui/react` jako dep (inline) ale Headless
sam jest ~30 KB gzip. Gdyby Headless miał 100 KB tylko z floating-ui, sami pewnie by
externalize'owali.

**Konkluzja:** Konwencja "wszystko inline" działa gdy library = stylowanie + thin wrapper.
U nas wrapper nie jest thin (200+ linii kodu w `_app_`) i base-ui to grube serce.
**Externalizacja `@base-ui/react` jest defensible odstępstwem od konwencji**, uzasadnionym
profilem rozmiarowym konkretnie naszej libki.

---

## Mitigation strategies

Niezależnie od scenariusza:

### 1. Peer ranges — szerokie, nie strict

Nie:
```json
"peerDependencies": {
  "@base-ui/react": "1.4.1"
}
```

Tak:
```json
"peerDependencies": {
  "@base-ui/react": "^1.0.0",
  "@phosphor-icons/react": "^2.0.0",
  "@floating-ui/react": "^0.26.0 || ^0.27.0"
}
```

`^1.0.0` toleruje wszystkie minorów + patch'y (semver), więc nawet gdy konsument ma
`1.5.0` a my dev'imy w `1.4.1`, instalacja idzie bez warninga.

### 2. `peerDependenciesMeta.optional`

Dla `@types/react`:
```json
"peerDependenciesMeta": {
  "@types/react": { "optional": true }
}
```

Konsument w JS (nie TS) nie dostanie warninga.

### 3. Validate w runtime nie warto

Niektóre libki dodają runtime check (np. `if (!React) throw`). Dla peer deps `pnpm`/`npm`
i tak ostrzeże przy install — nie ma sensu duplikować.

### 4. CHANGELOG + migration guide

Dla scenariusza B:

```md
## Breaking changes

`@phosphor-icons/react`, `@base-ui/react`, `@floating-ui/react` zostały
przeniesione do `peerDependencies`. Po aktualizacji do v2.x doinstaluj:

\`\`\`bash
pnpm add @phosphor-icons/react @base-ui/react @floating-ui/react
\`\`\`

Wersje peer:
- `@phosphor-icons/react`: `^2.0.0`
- `@base-ui/react`: `^1.0.0`
- `@floating-ui/react`: `^0.26.0 || ^0.27.0`
```

### 5. Verify w monorepo

Przed publish: zbudować + zalinkować lokalnie do dummy app, upewnić się że nie ma
duplikatu instancji (`pnpm why @base-ui/react` w app = jedna linijka).

---

## Rekomendacja

**Krok 1 (przy okazji DatePicker rebuild — najbliższe wydanie minor):**
- Wyrzucić `@mantine/core` i `@mantine/dates` z `dependencies`. Zerwać dead code.
- Brak breaking change dla konsumenta, bo i tak nie były używane runtime.
- Bonus: README odhaczone od Mantine ekosystemu, mniej confusion.

**Krok 2 (osobny major bump, np. v2.0.0):**
- Scenariusz **B**: externalize `@phosphor-icons/react`, `@base-ui/react`, `@floating-ui/react`.
- Bundle library spada z 166 KB gzip do ~28 KB gzip (5–6× mniejszy).
- README z install instructions i jasnym CHANGELOG.
- Peer ranges szerokie, `@types/react` peer optional.

**Czego NIE robić:**
- Externalizacji `clsx` (0.16 KB zysk, niewspółmierny do friction).
- Externalizacji `react-textarea-autosize` (1.5 KB zysk, konsument rzadko ma).
- Jednoetapowego big-bang (B + Mantine cleanup w jednym wydaniu) — splittnij na 2 release'y
  dla łatwiejszego rollbacku jeśli coś się zepsuje u konsumenta.

**Why not A:** 5 KB to nie jest worth zawracania głowy konsumenta osobnym major bump'em.
A ma sens **tylko jako częsć B** (i wtedy już idziemy w B).

**Why not C:** marginalny zysk nad B (~2 KB) za realny friction (kolejna paczka do instalacji).
Próg "nie warto" zaczyna się przy `react-textarea-autosize`.

---

## Załącznik: surowe dane z bundle-stats.json

Build z 2026-05-05, `pnpm --filter @synergycodes/overflow-ui build`:

- Total renderowany kod (pre-minify): 1027.4 KB
- Total renderowany kod JS (bez CSS w stats): 1014.3 KB
- Total renderowany gzip JS (pre-minify): 330.6 KB
- Final minified bundle: 628.27 KB
- Final minified gzip: **165.94 KB**

Per-package gzip values w sekcji "Per-package breakdown" wyżej; estymaty
final-gzip skalowane przez ratio 165.94 / 237.95 = 0.697.

### Dane registry npm (2026-05-04)

| Package | weekly downloads | latest version | nasz pin |
| --- | ---: | --- | --- |
| `@phosphor-icons/react` | 1.49 M | 2.1.10 | 2.1.7 |
| `@base-ui/react` | 3.70 M | 1.4.1 | 1.4.1 |
| `@floating-ui/react` | 14.92 M | 0.27.19 | 0.26.28 |
| `@mantine/core` | (n/a tu) | 9.1.1 | 7.17.2 (2 majory za) |
| `clsx` | 91.56 M | 2.1.1 | 2.1.1 |
| `react-textarea-autosize` | 6.74 M | 8.5.9 | 8.5.6 |
