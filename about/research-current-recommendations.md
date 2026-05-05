# Rekomendacje (przed researchem agentów)

Snapshot listy pomysłów na dalszy slimming/cleanup wynikający z **aktualnego stanu wiedzy** po skończonej migracji `@mui/base` → `@base-ui/react`. Zapisany przed dostępnymi wynikami research-agents — porównać po ich ukończeniu i sprawdzić co dodano/zmieniono.

Stan wyjściowy: bundle `dist/overflow-ui.js` = 628.27 KB (gzip 165.94 KB) na commit `de0297a`.

## Top 3 rekomendacje (ranked by impact)

### 1. Epic DatePicker (Mantine → react-day-picker) — **HIGH impact**

- **Bundle saving (estymata):** -80 do -90 KB gzip.
- **Effort:** 3-5 dni roboczych.
- **Risk:** medium — public API DatePicker musi zostać zachowane. Range/multiple modes wymagają sprawdzenia czy ktokolwiek ich używa.
- **Co się dzieje:**
  - Wyrzucamy `@mantine/core` + `@mantine/dates` (~105 KB gzip dla jednego komponentu).
  - Stawiamy DatePicker na `react-day-picker` (~25 KB gzip) skomponowanym z Base UI Popover.
  - Pliki do napisania: `date-picker.tsx` (rebuild), nowy CSS module zastępujący `data-picker-mantine.css`.
- **Why first:** największy single-improvement w bundle. Bez tego kroku migracja netto przyniosła wzrost bundle.

### 2. `vite-bundle-visualizer` jako pierwszy krok diagnostyczny — **prep work**

- **Effort:** 30 min.
- **Risk:** zero.
- **Co się dzieje:**
  - Dodać `rollup-plugin-visualizer` jako devDep, podpiąć w `vite.config.mts`, zbudować.
  - Otrzymać treemap pokazujący co realnie zajmuje miejsce w bundle (per-package, per-module).
  - Bez tego dalszy slimming jest spekulacją.
- **Co spodziewam się zobaczyć:**
  - `@mantine/core` + `@mantine/dates` ~80-105 KB gzip
  - `@base-ui/react` ~30-50 KB gzip
  - `@floating-ui/*` (potentially duplikowany direct + transitive przez Base UI) ~10-20 KB gzip
  - `@phosphor-icons/react` ~5-15 KB gzip (zależy od ile ikon używamy)
  - `clsx`, `react-textarea-autosize` poniżej 5 KB gzip każde
- **Działanie zależnie od wyników:** jeśli `@base-ui/react` jest mocno waga (>40 KB gzip) i Floating UI jest duplikowany — pierwszy ruch to pozbycie się duplicate. Może wymagać peer dep strategii dla Floating UI.

### 3. Animacja Fade w Modal (a potem Menu/Select) — **polish, low impact**

- **Bundle saving:** ~0 KB (czysto wizualne).
- **Effort:** 1-2 dni dla wszystkich trzech komponentów + visual snapshots dla animation states.
- **Risk:** low — Base UI ma natywne `data-starting-style` / `data-ending-style` attributes do animation.
- **Co się dzieje:**
  - Dla Modal: dodać CSS transition na `.modal-base` z `[data-starting-style] { opacity: 0 }` + `[data-ending-style] { opacity: 0 }`.
  - Dla Menu/Select: podobnie na popup.
  - Visual regression test obecnie ma `animations: 'disabled'`, więc snapshoty się nie zmienią. Dla porządku warto dodać osobne testy dla `data-starting-style` (snapshot w trakcie animacji = częściowa opacity).
- **Why later:** nie wpływa na rozmiar, jest tylko UX polish utracony przy migracji. Można zostawić na ostatni etap.

## Inne pomysły do rozważenia (lower priority)

### A. Externalize `@phosphor-icons/react` jako peer dependency

- **Bundle saving:** ~5 do 50 KB gzip (zależy od tree-shake — sprawdzić visualizerem).
- **Effort:** 30 min (zmiana `package.json` + dokumentacja).
- **Risk:** medium — konsumenci muszą sami zainstalować, wersja musi się zgadzać.
- **Why:** to standard dla React UI libraries, że ikony są peer (Radix tak robi przez osobne pakiety).
- **Mitigation:** szeroki peer range `^2.0.0`, dokumentacja w README.

### B. Externalize `@base-ui/react` i `@floating-ui/react` jako peer

- **Bundle saving:** może istotne (~30-50 KB gzip), ale wymaga sprawdzenia.
- **Effort:** 1 dzień.
- **Risk:** higher — konsumenci typowo nie używają Base UI bezpośrednio, więc to "extra install" cost.
- **Question:** czy convention React UI libs jest taki, że te headless primitives są peer? Sprawdzić jak Chakra, MUI, Mantine to robią.

### C. Subpath exports / per-component bundles

- **Bundle saving:** dla konsumentów którzy używają tylko podzbioru — ogromny (np. konsument z 5 komponentów dostaje ~50 KB zamiast 600 KB).
- **Bundle saving dla nas (library):** ~0 — tylko optymalizujemy konsumentów.
- **Effort:** 2-3 dni (vite multi-entry + dts handling + exports field).
- **Risk:** medium — zmiana konwencji import `import { Button } from '@synergycodes/overflow-ui/button'` (stara `import { Button } from '@synergycodes/overflow-ui'` powinna pozostać działać).
- **Why important:** dla konsumentów to ogromna oszczędność i powinna być standardowa praktyka. Sprawdzić jak `@base-ui/react` to robi (subpath imports działają bez problemu).

### D. Naprawić sideEffects żeby tree-shake działał lepiej

- Aktualnie `"sideEffects": ["**/*.css"]`.
- Sprawdzić czy konsument importujący jeden komponent (`Button`) faktycznie nie wciąga reszty (Mantine, Base UI Menu/Select etc.).
- Eksperyment: minimal consumer + `import { Button } from '@synergycodes/overflow-ui'` → zmierzyć bundle output.

### E. Bump `react` 18 → 19 w devDeps

- W `packages/ui` jest `react@^18.3.1`, w `packages/website` `react@^19.0.0`.
- Niespójność. peerDependencies pozwalają oba (`^17 || ^18 || ^19`).
- Czy są problemy w testach przy mieszaniu wersji? Sprawdzić.

### F. Snackbar → Toast (Base UI Toast)

- **Long-term refactor.** Base UI ma `Toast.Provider` + `useToastManager().add({...})` — imperative manager.
- Aktualne API `<Snackbar variant title>` jest deklaratywne. Zmiana to **breaking change** dla konsumentów.
- **Effort:** 2-3 dni + stakeholder dialog.
- **Why later:** nie ma silnego powodu teraz; aktualny Snackbar (wrapper na `<div role="status">`) jest legit.

### G. Native CSS `field-sizing: content` dla TextArea

- Chromium 123+, Safari TP. Eliminuje potrzebę `react-textarea-autosize` (~3 KB gzip) gdy support jest dostatecznie szeroki.
- **Effort:** 1 godz.
- **Risk:** zerwany w starszych przeglądarkach — może wymagać feature detection.
- **Why later:** drobny zysk, wymaga audytu browser support u konsumentów.

### H. Dodatkowe komponenty w preview-page (kompletna pokrywa)

- `IconSwitch` nie jest w showcase — chociaż używa Switch wrapper, może mieć regresje w custom track/thumb.
- `Checkbox` indeterminate state — sprawdzić czy custom rendering.
- Floating tooltip + side variants (top/right/left/bottom).
- `Modal` z różnymi sizes/states już są.
- **Effort:** 0.5 dnia.
- **Why:** szersza pokrywa zwiększa pewność, że zmiany w shared CSS (`list-box.module.css`) nie psują nic.

### I. Docker pinning dla visual regression w CI

- Aktualnie Playwright używa **lokalnego Chromium fallback build** (BEWARE: your OS is not officially supported). To znaczy że baseline może differować między dev (Arch Linux) a CI (Ubuntu).
- **Effort:** 2-4 godz (Dockerfile + GitHub Actions).
- **Risk:** wysoki impact na flaky tests jeśli nie pinnujemy.
- **Why important:** bez tego baseline jest reliable tylko lokalnie i CI łatwo różni się o piksele anti-aliasing.

### J. Field.Root integration dla Input i TextArea

- Base UI ma `Field.Root` który wstrzykuje `data-disabled`, `data-invalid`, `data-touched`, `data-dirty` do dzieci.
- Można użyć tego dla idiomatycznego error/disabled handling zamiast `:global(.base--error)`/`:global(.base--disabled)` które są overridowane externally.
- **Effort:** 1 dzień.
- **Risk:** zmiana public API (Input/TextArea muszą być wewnątrz Field).
- **Why later:** purely a11y/idiomatic improvement, nie wymaga pilności.

### K. Audyt CSS layerów

- Aktualnie `@layer ui.component { ... }` w wielu modułach. Plus globalne `layers.css`.
- Sprawdzić czy konsumenci dostają zerową specificity battle z aplikacją hosting'iem (np. Tailwind).
- **Effort:** 0.5-1 dnia.
- **Why:** to ogólna higiena, nie pilna.

## Kolejność wykonania (proponowana)

1. **Najpierw**: bundle visualizer (rekomendacja #2) — to da konkretne dane.
2. **Drugi commit**: DatePicker rebuild (rekomendacja #1) — biggest single saving.
3. **Trzeci commit**: animacje Modal/Menu/Select (rekomendacja #3) — UX polish.
4. **Później**: subpath exports / externalization, w zależności od wyników bundle visualizer.

## Cele liczbowe

Realistyczny **target po wszystkich łatwych zmianach** (bez agresywnej externalizacji):
- Bundle: <300 KB raw, **<80 KB gzip** (z 628 / 166 dziś).
- Główne źródło: Mantine usunięty (-105 KB gzip), DatePicker reborn (~25 KB gzip dorzucone), netto -80 KB gzip.

Z **agresywną externalizacją** (peer @phosphor-icons + @base-ui + @floating-ui):
- Bundle: <40 KB gzip dla samej library + konsument doinstalowuje peer deps.

## TBD przez agentów

Tematy które agenty mają zbadać równolegle:
- **bundle-analysis**: faktyczny breakdown bundle przez visualizer + duplikaty Floating UI + tree-shake friendliness
- **datepicker**: pełny research alternatyw + bundle hit każdej + integracja z Base UI Popover
- **externalization**: trzy scenariusze (minimalny/agresywny/full) z konkretnymi liczbami
- **codesplitting**: czy treeshake działa, jak skonfigurować vite multi-entry, eksperyment z minimalnym consumer

Po ich ukończeniu — synteza w `about/research-final-recommendations.md` i porównanie z tym dokumentem.
