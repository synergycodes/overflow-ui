# Bundle composition — `@synergycodes/overflow-ui`

Stan: build z dnia **2026-05-05**, branch `main`, commit `de0297a23796647ca529550d43a08d8309c0a0a7`.

Aktualny dist:
- `dist/overflow-ui.js` — **628.27 KB** raw / **165.94 KB** gzip
- `dist/index.css` — 81.90 KB raw / 10.60 KB gzip
- `dist/tokens.css` — 19.93 KB (osobny plik, nie wchodzi do JS bundle, importowany przez konsumenta)

External w Vite: tylko `react`, `react-dom`, `react/jsx-runtime`. Wszystko inne jest **bundlowane**.

Build z `rollup-plugin-visualizer` (`dist/bundle-stats.html` i `dist/bundle-stats.json`) — surowy raport rollupowy zawiera 595 modułów z niezerowym rozmiarem; sumarycznie 1027.36 KB pre-minify rendered / 339.35 KB visualizer-gzip. Realny gzipped bundle (165.94 KB) jest 0.49x sumy z visualizera, bo terser scala identyfikatory i gzip korzysta ze wspólnego słownika. Dlatego w sekcjach poniżej podaję **proporcje** z visualizera oraz **ekstrapolowane realne KB gzip** (× 0.49) w komentarzach.

---

## Breakdown po pakiecie (rendered + visualizer-gzip)

| Package | Raw KB | Gzip KB (vis) | % gzip | Modules |
|---|---|---|---|---|
| `@base-ui/react` | 402.97 | 125.38 | 36.9% | 139 |
| `@mantine/core` | 136.81 | 52.08 | 15.3% | 158 |
| `@mantine/dates` | 74.59 | 25.08 | 7.4% | 56 |
| `@floating-ui/react` (direct, 0.26) | 61.96 | 15.69 | 4.6% | 2 |
| `@floating-ui/core` (1.6.9 + 1.7.5) | 52.13 | 12.10 | 3.6% | 2 |
| `local:ui-src` (nasz kod) | 49.37 | 23.83 | 7.0% | 109 |
| `@floating-ui/dom` (1.6.13 + 1.7.6) | 49.18 | 12.91 | 3.8% | 2 |
| `@base-ui/utils` | 44.98 | 17.42 | 5.1% | 33 |
| `tabbable` | 25.06 | 7.76 | 2.3% | 1 |
| `@phosphor-icons/react` | 20.19 | 7.11 | 2.1% | 16 |
| `@floating-ui/utils` (0.2.9 + 0.2.11) | 17.87 | 5.45 | 1.6% | 4 |
| `@floating-ui/react-dom` (2.1.2 + 2.1.8) | 17.37 | 4.92 | 1.4% | 2 |
| `react-remove-scroll` | 13.82 | 4.38 | 1.3% | 7 |
| `use-sync-external-store` | 13.68 | 4.68 | 1.4% | 14 |
| `dayjs` | 13.17 | 6.13 | 1.8% | 12 |
| `@mantine/hooks` | 10.70 | 4.85 | 1.4% | 17 |
| `react-textarea-autosize` | 6.75 | 2.15 | 0.6% | 1 |
| `react-remove-scroll-bar` | 4.35 | 1.68 | 0.5% | 3 |
| `use-callback-ref` | 3.28 | 1.51 | 0.4% | 3 |
| `use-sidecar` | 2.83 | 0.94 | 0.3% | 2 |
| `react-style-singleton` | 2.27 | 1.02 | 0.3% | 3 |
| `tslib` | 2.14 | 0.98 | 0.3% | 1 |
| `@babel/runtime` | 0.51 | 0.37 | 0.1% | 2 |
| `clsx` | 0.35 | 0.22 | 0.1% | 1 |
| pozostałe maleństwa (use-composed-ref, use-latest, get-nonce, use-isomorphic-layout-effect, helpers) | < 1.0 | < 0.7 | < 0.2% | 4 |

### Komentarze do wybranych grup

- **`@base-ui/react` 125 KB gzip — największy konsument, ale spodziewany.** Zawiera ~140 modułów. Z tego 47 KB gzip to wewnętrznie wendowana kopia floating-ui-react (32 moduły z `@base-ui/react/esm/floating-ui-react/`), reszta to faktyczne komponenty. Sub-breakdown:
  - `floating-ui-react` (vendored) — 171.80 KB raw / 46.73 KB gzip / 32 plików
  - `select` — 56.52 / 16.74 KB / 13 plików
  - `menu` — 47.86 / 15.20 KB / 14 plików
  - `internals` — 45.29 / 17.29 KB / 32 plików
  - `utils` — 41.75 / 14.54 KB / 23 plików
  - `dialog` — 18.47 / 7.27 KB / 12 plików
  - `switch` — 8.16 / 2.91 KB / 5 plików
  - `merge-props` — 7.07 / 2.13 KB / 1 plik
  - `field` — 4.38 / 1.50 KB / 2 pliki  (śmieć — wpadło z `input`, nie jest używane bezpośrednio)
  - reszta (`context-menu`, `csp-provider`, `toolbar`, `menubar`, `input`) — łącznie < 2 KB; tree-shaking działa, nieużywane rzeczy nie wpadły.
- **Mantine ekosystem (`@mantine/core` + `@mantine/dates` + `@mantine/hooks` + `dayjs` + `react-remove-scroll`*) razem ~96 KB visualizer-gzip ≈ ~47 KB realnych gzip.** Cały ten "ogon" jest ciągnięty przez **jeden komponent**: `src/components/date-picker/date-picker.tsx`, który renderuje `<MantineProvider><DatePickerInput ... /></MantineProvider>`. To gigantyczne marnotrawstwo.
- **`@floating-ui/react@0.26` direct + `tabbable`** — ciągnięte tylko przez nasz tooltip (`src/components/tooltip/use-tooltip.tsx`). 16 KB + 8 KB visualizer-gzip + ich own core/dom = ~30 KB visualizer-gzip ≈ ~15 KB realnych gzip.
- **`@phosphor-icons/react` 7 KB gzip** — używamy 7 ikon (`CaretDown`, `CaretUp`, `Check`, `ExclamationMark`, `Info`, `Minus`, `X`); 16 modułów × ~0.5 KB każdy. Tree-shaking działa, ale przy chęci można wyciąć kompletnie i wrzucić ikony jako lokalne SVG.
- **`use-sync-external-store` 4.68 KB gzip** — polyfill React 17/18; React 19 ma to w core. Użytkownicy z React 19 płacą za nic. To problem `@base-ui/react`, nie nas.
- **Local `ui-src` 49 KB raw / 24 KB gzip (109 plików)** — z czego CSS modules: 56 plików × 12 KB raw / 7 KB gzip; JS: 53 pliki × 38 KB raw / 17 KB gzip.

\* `react-remove-scroll` jest peerem `@mantine/core`.

---

## Floating UI duplication — **VERDICT: TAK, masakryczna.**

W bundle są **DWIE niezależne kopie całego stosu Floating UI** (poza `react`/`react-dom`):

| Pakiet | Wersja | Rendered | Gzip | Importer |
|---|---|---|---|---|
| `@floating-ui/utils` | 0.2.9  | 8.96 KB | 2.71 KB | `@floating-ui/react@0.26` (nasz direct + Mantine też używa tej samej) |
| `@floating-ui/utils` | 0.2.11 | 8.91 KB | 2.74 KB | `@base-ui/react@1.4.1` |
| `@floating-ui/core`  | 1.6.9  | 28.69 KB | 6.69 KB | `@floating-ui/dom@1.6.13` |
| `@floating-ui/core`  | 1.7.5  | 23.44 KB | 5.41 KB | `@floating-ui/dom@1.7.6` |
| `@floating-ui/dom`   | 1.6.13 | 24.37 KB | 6.32 KB | `@floating-ui/react-dom@2.1.2` |
| `@floating-ui/dom`   | 1.7.6  | 24.81 KB | 6.59 KB | `@floating-ui/react-dom@2.1.8` |
| `@floating-ui/react-dom` | 2.1.2 | 9.10 KB | 2.57 KB | `@floating-ui/react@0.26` |
| `@floating-ui/react-dom` | 2.1.8 | 8.27 KB | 2.35 KB | `@base-ui/react@1.4.1` |

**Łącznie zduplikowane rzeczy: ~83 KB raw / ~22 KB visualizer-gzip ≈ ~11 KB realnych gzip.**

Plus `tabbable@6.2.0` (8 KB visualizer-gzip) — używane WYŁĄCZNIE przez `@floating-ui/react@0.26`. `@base-ui/react` ma własne 6.63 KB raw `tabbable.js` zwendowane wewnętrznie.

Plus, krytycznie: **`@base-ui/react` ma swoją wewnętrzną kopię `floating-ui-react`** (vendored fork, nie peer dep), która waży 171.80 KB raw / 46.73 KB visualizer-gzip. Czyli efektywnie mamy **trzy** implementacje warstw floating-ui w jednym bundle (kopia 0.26.x dla naszego tooltipu, kopia 1.7.x ciągnięta jako transitive @base-ui przez @base-ui/utils, oraz wendowana kopia w @base-ui/react). Łącznie **floating-ui ekosystem to 384 KB raw / 103 KB visualizer-gzip ≈ ~50 KB realnych gzip — ~30% bundle'a.**

`@babel/runtime` jest w bundle ale tylko 0.37 KB gzip — **brak wycieku helpera babelowego**, OK.

---

## React deduplication

W bundle nie ma React-a. `react`, `react-dom`, `react/jsx-runtime` są w `external`, package.json deklaruje peer. ✅

---

## Tree-shaking `@base-ui/react`

`@base-ui/react@1.4.1` ma `sideEffects: false`. Wszystkie 50 top-level komponentów ma osobne subpath exports.

**Importujemy tylko 5 subpathów**: `dialog`, `input`, `menu`, `select`, `switch`.

Tree-shaking **działa**: w bundle nie ma `accordion`, `alert-dialog`, `autocomplete`, `avatar`, `button`, `checkbox`, `checkbox-group`, `collapsible`, `combobox`, `direction-provider`, `drawer`, `fieldset`, `form`, `meter`, `navigation-menu`, `number-field`, `otp-field`, `popover`, `preview-card`, `progress`, `radio`, `radio-group`, `scroll-area`, `separator`, `slider`, `tabs`, `toast`, `toggle`, `toggle-group`, `tooltip`, `unstable-use-media-query`, `use-render`. Jedyne uboczne: `field` 1.5 KB gzip, `context-menu`/`csp-provider`/`toolbar`/`menubar`/`input` ~1 KB łącznie — to side-effects barrelu, nie problem.

`@base-ui/react` **nie jest źródłem marnotrawstwa**. Nasze 125 KB gzip to faktyczny koszt tych 5 komponentów + ich wspólnego core (vendored floating-ui-react + utils + internals).

---

## CSS

`dist/index.css` 76.9 KB raw / 10.60 KB gzip:

- 42 użyć `@layer`
- 1169 użyć tokenów `--ax-*`, 588 unikalnych
- 447 hash-suffix CSS-modules selektorów
- 48 bloków `:root{...}` o łącznej długości 27 KB raw — to *inline'owane defaulty zmiennych z modułów* (`variables.css` per komponent) i resety, nie tokens.css (ten jest osobny w `dist/tokens.css` 20 KB).
- Brak Mantine CSS w bundle CSS (Mantine używa CSS variables wstrzykiwanych przez `MantineProvider` w runtime, nie statycznych klas)
- Brak `url(...)`, brak `@font-face`, brak inline'owanych dataURLi
- 1 keyframes

CSS jest **kompaktowy i nie wymaga interwencji**. 7-10 KB gzip per użytkownik to OK dla designsystemu z 20 komponentami.

---

## Top 15 największych pojedynczych modułów (visualizer-gzip)

| # | Rendered | Gzip | Plik |
|---|---|---|---|
| 1 | 58.22 KB | 14.33 KB | `@floating-ui/react@0.26.28/dist/floating-ui.react.mjs` |
| 2 | 25.06 KB | 7.76 KB | `tabbable/dist/index.esm.js` |
| 3 | 28.69 KB | 6.69 KB | `@floating-ui/core@1.6.9/dist/floating-ui.core.mjs` |
| 4 | 24.81 KB | 6.59 KB | `@floating-ui/dom@1.7.6/dist/floating-ui.dom.mjs` |
| 5 | 24.37 KB | 6.32 KB | `@floating-ui/dom@1.6.13/dist/floating-ui.dom.mjs` |
| 6 | 24.12 KB | 5.77 KB | `@base-ui/react/esm/floating-ui-react/components/FloatingFocusManager.js` |
| 7 | 23.44 KB | 5.41 KB | `@floating-ui/core@1.7.5/dist/floating-ui.core.mjs` |
| 8 | 22.21 KB | 5.40 KB | `@base-ui/react/esm/floating-ui-react/hooks/useListNavigation.js` |
| 9 | 19.19 KB | 4.44 KB | `@base-ui/react/esm/floating-ui-react/hooks/useDismiss.js` |
| 10 | 16.27 KB | 4.31 KB | `@base-ui/react/esm/select/popup/SelectPopup.js` |
| 11 | 14.81 KB | 4.19 KB | `@base-ui/react/esm/utils/useAnchorPositioning.js` |
| 12 | 14.22 KB | 3.88 KB | `@base-ui/react/esm/select/root/SelectRoot.js` |
| 13 | 13.85 KB | 3.86 KB | `@base-ui/react/esm/menu/root/MenuRoot.js` |
| 14 | 7.13 KB | 3.00 KB | `dayjs/dayjs.min.js` |
| 15 | 11.87 KB | 2.86 KB | `@base-ui/react/esm/floating-ui-react/hooks/useHoverReferenceInteraction.js` |

Top 9 z 15 to **floating-ui** (w trzech postaciach). Top 14 to dayjs — czysto z DatePickera.

---

## Co konkretnie warto wyciąć — ranking impactu

Liczby gzip są **realne** (estymata × 0.49 z visualizer-gzip).

### 1. **DatePicker / Mantine — wymiana lub porzucenie** ≈ −47 KB realnych gzip (28% bundle'a)

`src/components/date-picker/date-picker.tsx` to jedyne miejsce używające `@mantine/core` + `@mantine/dates`. Wnosi do bundle:

- `@mantine/core` (52 KB vis-gzip, 158 plików)
- `@mantine/dates` (25 KB vis-gzip, 56 plików)
- `@mantine/hooks` (5 KB vis-gzip, 17 plików)
- `dayjs` (6 KB vis-gzip, 12 plików)
- `react-remove-scroll` + `*-bar` + `use-sidecar` + `use-callback-ref` + `react-style-singleton` (~9 KB vis-gzip)

Łącznie: ~96 KB visualizer-gzip × 0.49 = **~47 KB realnych gzip.**

**Effort:** średni. Opcje:
- **Opcja A — najtańsza.** Wyciąć Mantine z DatePickera, zostawić tylko zwykły `<input type="date">` jako stub (jak fragment, który widziałem w wyciętej wersji pliku). Migracja `Date` ↔ `string` na poziomie API. **Koszt: ~kilka godzin, regression visual-snapshot test.**
- **Opcja B — średni effort, lepsze UX.** Zaimplementować lekki DatePicker na bazie `@base-ui/react` + np. natywnego `<input type="date">` z popoverem (np. `@base-ui/react/popover`, jeśli dodamy ten subpath; +3 KB gzip). Daty w JS — natywnie (`Intl.DateTimeFormat`, `Date`); bez dayjs.
- **Opcja C — najwięcej roboty.** `react-day-picker` (≈ 10 KB gzip standalone, bardzo lekka), albo `@radix-ui/react-popover` + custom kalendarz.

**Realistycznie:** Opcja A daje natychmiastowo −47 KB gzip. Opcja B ~−40 KB gzip i lepsza spójność z resztą biblioteki.

### 2. **Tooltip — migracja na `@base-ui/react/tooltip`** ≈ −15 KB realnych gzip (9% bundle'a)

`src/components/tooltip/use-tooltip.tsx` używa `@floating-ui/react@0.26.28` directly. Po migracji tooltipu na `@base-ui/react/tooltip` (lub na primitives `@base-ui/react/popover`):

- całkowicie wyleci `@floating-ui/react@0.26` (16 KB vis-gzip)
- `tabbable@6.2.0` zniknie (8 KB vis-gzip)
- `@floating-ui/core@1.6.9` zniknie (7 KB vis-gzip)
- `@floating-ui/dom@1.6.13` zniknie (6 KB vis-gzip)
- `@floating-ui/react-dom@2.1.2` zniknie (3 KB vis-gzip)
- jedna z dwóch kopii `@floating-ui/utils` (3 KB vis-gzip)

Łącznie: ~43 KB visualizer-gzip × 0.49 = **~21 KB realnych gzip.** Trochę wyższe oszczędności wynikają z eliminacji całego stosu, nie tylko cząstki.

UWAGA: część tych modułów używa też Mantine'a (`@mantine/core/Tooltip` używa `@floating-ui/react@0.26`), więc jeśli wyrzucamy Mantine'a (krok 1), to direct floating-ui i tabbable znikają **automatycznie**. Wtedy migracja tooltipu daje już tylko ~6 KB vis-gzip ≈ 3 KB gzip oszczędności (sam @floating-ui/react direct).

**W kolejności: najpierw Mantine, potem tooltip.** Po Mantine: −47 KB realne. Migracja tooltipu *po* Mantinie: dodatkowe ~3 KB realne.

**Effort:** mały-średni. `@base-ui/react/tooltip` ma równoważne API (Provider, Root, Trigger, Positioner, Popup, Arrow). Nasz `useTooltip` ma własne defaults dla offset/delay/padding — przenieść jako presety w naszym wrapperze.

### 3. **Phosphor icons — opcjonalnie wymienić na lokalne SVG** ≈ −5 KB realnych gzip

7 ikon × ~0.5 KB każda + `lib/IconBase` + `lib/context` = 7.11 KB visualizer-gzip ≈ **~3.5 KB realnych gzip.**

**Effort:** mały, nudny. Pobrać 7 SVG, owinąć w komponent. Wartość niska — bardziej dla całkowitej eliminacji peer-dep niż dla KB.

### 4. **`use-sync-external-store` shim — można zignorować**

To 4.68 KB visualizer-gzip ≈ 2.3 KB realne. Wnosi go `@base-ui/utils` jako compat. Nie da się wyciąć bez forkowania `@base-ui/utils`.

---

## TL;DR — 3 największe rekomendacje

1. **WYCIĄĆ MANTINE.** `src/components/date-picker/date-picker.tsx` jest jedynym konsumentem `@mantine/*`+`dayjs`+`react-remove-scroll`. To są **~47 KB realnych gzip = 28% bundle'a** za jeden komponent. Najlepiej: stub na natywnym `<input type="date">` (oszczędność cała) lub re-implementacja na `@base-ui/react/popover` + lekki kalendarz. Oczekiwany bundle po: **~118 KB gzip** (−29%).

2. **Zmigrować tooltip na `@base-ui/react/tooltip`.** Po wycięciu Mantine, `@floating-ui/react@0.26` (direct) + `tabbable` zostaną tylko z naszego tooltipu (przedtem Mantine też ich używał, więc byliśmy w sytuacji bez wyjścia). Migracja: **~3 KB realnych gzip** netto po wycięciu Mantine. Dodatkowy efekt: koniec duplikacji floating-ui (jedna wersja zamiast dwóch). Bundle po obu zmianach: **~115 KB gzip** (−31%).

3. **Akceptować pozostałe 115 KB gzip jako "honest cost" `@base-ui/react`.** Z 165 KB → 115 KB to realny target. Aby zejść poniżej 100 KB potrzeba albo (a) zrezygnować z któregoś z `select`/`menu`/`dialog` (każdy to ~10 KB gzip), albo (b) forknąć `@base-ui/react` i wyciąć z niego wendowaną kopię `floating-ui-react` (47 KB visualizer-gzip ≈ 23 KB realne, ale to robota na tygodnie i koszt-utrzymania kosmiczny). Rekomendacja: nie schodzić poniżej 115 KB bez bardzo dobrego powodu.

---

## Artefakty z buildu

- `packages/ui/dist/bundle-stats.html` — interaktywny treemap (otwórz w przeglądarce)
- `packages/ui/dist/bundle-stats.json` — surowe dane (4.3 MB)

W `packages/ui/vite.config.mts` dodano `rollup-plugin-visualizer`. Jeśli powtarzane analizy nie są potrzebne, można plugin usunąć i odinstalować pakiet, żeby przyspieszyć build (~7s w produkcji).
