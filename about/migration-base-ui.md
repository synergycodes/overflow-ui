# Migracja `@mui/base` → `@base-ui/react` + slimming dependencies

Plan migracji z `@mui/base@5.0.0-beta.62` na **Base UI** (`@base-ui/react@^1.4`) — następcę MUI Base rozwijanego przez ten sam zespół, ale z nowym API (compound components zamiast slotów, render prop zamiast `prepareForSlot`, brak headless hooks). **Przy okazji odchudzamy bundle** wyrzucając niepotrzebne zależności (`@mui/material`, `@emotion/*`).

## TL;DR

- **8 komponentów** w `packages/ui/src/components` opiera się o `@mui/base` (14 plików, 17 importów).
- **Nie ma testów** w repo (zero `*.spec.*`/`*.test.*`, brak Storybook, brak Playwright/Chromatic).
- Migracja **nie jest mechanicznym renamem** — zmienia się model kompozycji (sloty → compound components), część prop-ów (`onChange` → `onValueChange`/`onCheckedChange`), a `Snackbar` i `TextareaAutosize` znikają.
- **Najważniejsze:** zanim ruszymy migrację, stawiamy **Playwright + visual snapshots** na preview-page jako baseline. Każda PR-ka migracyjna musi przechodzić review screenshotów (`pixelmatch`/`toHaveScreenshot`) i nie może wprowadzić wizualnej regresji > tolerancji.
- **Bundle ma znaczenie**: w `vite.config.mts` external = tylko React. Wszystkie pozostałe deps (MUI, Mantine, emotion, floating-ui, phosphor) są **inline-bundlowane** do `dist/overflow-ui.js`. Każdy wyrzucony pakiet to realnie mniejszy bundle dla konsumenta.
- Szacunkowy effort: **~5-7 dni roboczych** (bez Snackbar) + **2-3 dni** na Snackbar/Toast (osobny epic — zmienia paradygmat z deklaratywnego na imperative manager). Slimming `@mui/material` + emotion wchodzi do migracji Modala (zero dodatkowego czasu). DatePicker (Mantine) — osobny epic, ~3-5 dni.

## Audyt zależności i plan slimmingu

| Dependency | Użycie | Decyzja | Bundle hit (gzip est.) |
|---|---|---|---|
| `@mui/base` | 17 importów, 8 komponentów | **→ `@base-ui/react`** (główny epic) | ~30 KB → ~25 KB |
| `@mui/material` | **1 użycie** (`Fade` w `modal.tsx`) | **WYRZUCIĆ** razem z migracją Modal — Base UI Dialog ma `data-starting-style`/`data-ending-style` do animacji | -50 KB+ (treeshake) |
| `@emotion/styled` (deps) | **0 użyć w `src`** | **WYRZUCIĆ** — peer dep `@mui/material`, znika z nim | -3 KB |
| `@emotion/react` (devDeps) | **0 użyć w `src`** | **WYRZUCIĆ** — verify że to nie jest peer Mantine v7 (Mantine v7 nie wymaga emotion, używa CSS layers) | -8 KB |
| `@mantine/core` | 1 użycie (`MantineProvider` w DatePicker) | **WYRZUCIĆ** razem z `@mantine/dates` w epic DatePicker rebuild | -80 KB |
| `@mantine/dates` | DatePicker | **WYRZUCIĆ** — patrz "Epic: DatePicker rebuild" niżej | -25 KB |
| `@floating-ui/react` | Tooltip (kompletna impl) + typy w Menu (`Placement`, `OffsetOptions`) | **TRZYMAĆ** — fundament Tooltipa, Base UI też używa Floating UI pod spodem | bez zmian |
| `@phosphor-icons/react` | 8 użyć (X, ikony w Modal/Snackbar/buttons) | **TRZYMAĆ**, ale rozważyć **externalizację jako peer dep** (osobna rozmowa designowa — patrz "Optional: peer deps" niżej) | -5 do -50 KB w zależności od decyzji |
| `clsx` | 37 użyć | **TRZYMAĆ** | bez zmian (~0.5 KB) |

**Realistyczny szacunek po slimmingu** (bez DatePicker rebuild): bundle ~150-200 KB → ~70-100 KB gzipped. Po DatePicker rebuild: ~50-70 KB gzipped. Dokładne liczby do zmierzenia przez `pnpm build` przed/po z `vite-bundle-visualizer` lub `rollup-plugin-visualizer`.

### Verify steps przed wyrzuceniem emotion

`@emotion/react` jest w `devDependencies`, ale to nie znaczy że jest do nas — może być peer dep narzucony przez MUI lub Mantine. Sprawdzić:

```bash
pnpm --filter @synergycodes/overflow-ui why @emotion/react
pnpm --filter @synergycodes/overflow-ui why @emotion/styled
```

Jeśli wyłącznie przez `@mui/material` i `@mui/base` — można wyrzucić wraz z nimi. Jeśli przez `@mantine/*` — zostaje do epica DatePicker.

## Zakres migracji

| Plik | Z `@mui/base` | Ryzyko |
|---|---|---|
| `button/base-button/base-button.tsx` | `Button`, `prepareForSlot` | **Low** |
| `switch/switch.tsx` | `Switch`, `SwitchProps` | **Low** |
| `input/input.tsx`, `input/types.ts` | `Input`, `InputProps` | **Low/Med** |
| `text-area/text-area.tsx` | `TextareaAutosize` | **Med** (komponent znika — przejście na `react-textarea-autosize`) |
| `modal/modal.tsx` | `Modal` | **Med/High** (compound + zmiana backdrop API) |
| `menu/menu.tsx`, `menu-item.tsx`, `menu/utils/create-trigger-button.tsx` | `Dropdown`, `MenuButton`, `Menu`, `MenuItem`, `MenuButtonProps`, `MenuProps` | **High** (rebuild) |
| `select/select.tsx` + `select-button`, `select-option`, `select-value` | `Select`, `Option`, `SelectOption`, `SelectRootSlotProps`, `UseSelectParameters` | **High** (rebuild + brak `useSelect`) |
| `snackbar/snackbar.tsx` | `Snackbar` | **High** (komponent NIE istnieje w Base UI — `Toast` to inny model) |

## Faza 0 — Baseline + infrastruktura testowa (DO ZROBIENIA PRZED MIGRACJĄ)

Cel: mieć obiektywny dowód, że "po migracji wygląda 1:1".

### 0.1. Rozbudowa `preview-page` do showcase wszystkich komponentów

`packages/ui/preview-page/preview-page.tsx` to dziś `<Button>Test</Button>`. Trzeba zrobić z niego **strukturyzowaną stronę z każdym wariantem każdego komponentu** podzieloną na sekcje z stabilnymi `data-testid`-ami.

Zakres dla każdego komponentu:
- **Button**: regular variants × sizes × disabled × with tooltip × icon-button × nav-button × label-button (use existing `*.example.tsx` pliki z `packages/website/docs/code-examples/` jako źródło prawdy)
- **Switch**: rozmiary, checked/unchecked, disabled, custom thumb/track, error
- **Input**: rozmiary, z adornments (start/end), disabled, error, with placeholder, z wartością
- **TextArea**: rozmiary, minRows/maxRows, disabled, error, długi tekst (test autosize)
- **Modal**: open w 2 rozmiarach, z/bez ikony, z/bez subtitle, z/bez footer, footer variants
- **Menu**: różne placementy, separator, ikony, sizes, open w trybie controlled
- **Select**: różne items, separator, sizes, error, placeholder, otwarty dropdown
- **Snackbar**: każdy variant × z/bez subtitle × z/bez button × z/bez close

Kluczowe wymagania:
- każda sekcja w stałej kolejności (Visual diff jest pozycyjny)
- floating elementy (Modal, Menu, Select dropdown, Snackbar) renderowane **otwarte** w wariantach showcase, żeby Playwright je złapał
- używamy istniejących `code-examples/*.example.tsx` z website jako referencji (już są napisane jak żywe demo)
- deterministyczny rendering: `prefers-reduced-motion: reduce`, fixed viewport (np. 1440×900), system fonts disabled (load Google fonts z bundla)

### 0.2. Setup Playwright + visual regression

Nowy `packages/ui/tests/visual/` z konfiguracją Playwright:

```
packages/ui/
  tests/
    visual/
      preview.spec.ts        # snapshot każdej sekcji preview-page
      interactions.spec.ts   # otwarcie menu/select/modal + snapshot stanu otwartego
      __snapshots__/         # baseline PNG (commitowane do repo)
  playwright.config.ts
```

W `package.json` dodać:
```json
"test:visual": "playwright test",
"test:visual:update": "playwright test --update-snapshots"
```

Konfiguracja:
- jeden browser (Chromium) — wystarczy, nie jest to test cross-browser
- `expect.toHaveScreenshot({ maxDiffPixelRatio: 0.001, threshold: 0.05 })` — lekka tolerancja na anti-aliasing i font hinting
- **CRITICAL:** snapshoty robione w **Dockerze** (lub przez Playwright `--ipc=host` w fixed Linux image), żeby uniknąć dryfów font rendering OS↔CI. Bez tego baseline z lokalnego Linuxa nie zgadza się z GitHub Actions.
- Workflow: `pnpm --filter @synergycodes/overflow-ui test:visual` → uruchamia preview-page przez `vite preview`, Playwright robi screenshoty, porównuje z `__snapshots__/`.

### 0.3. Zatwierdzenie baseline

1. Uruchomić `pnpm test:visual:update` lokalnie (Docker).
2. Zacommitować PNG-i do repo (są małe, < 200 KB każdy zwykle).
3. PR "Setup visual regression baseline" — merge przed jakąkolwiek zmianą `@mui/base`.

**Bez tego kroku reszta planu nie ma sensu** — nie da się udowodnić że "1:1" inaczej niż okiem.

### 0.4. (Opcjonalnie ale silnie zalecane) Component-level screenshot via `@playwright/experimental-ct-react`

Test każdego komponentu w izolacji, bez przechodzenia przez całe preview-page. Daje:
- szybkie iteracje (zmiana w `Button` → tylko `button.spec.tsx` re-runuje)
- lepszą lokalizację regresji (wiadomo który component pękł)
- mniejsze snapshoty (mniej noise od layoutu obok)

Można dorobić w fazie 0.5 lub w trakcie migracji per-komponent.

## Faza 1 — Komponenty low-risk (~1-2 dni)

Każdy komponent w osobnej PR-ce. Sekwencja:

1. **`Button` + `prepareForSlot`** (`base-button.tsx`)
   - Usunąć `prepareForSlot`. W Base UI `<Button render={<MyButton/>}>` zastępuje wzorzec slotu. `BaseButton` przestaje być slot-wrapperem, staje się normalnym komponentem.
   - Sprawdzić wszystkie call siteʼy `BaseButton` w repo (`grep -r BaseButton`) — czy ktoś nie używa go przez `slots={{ root: BaseButton }}` w innym miejscu (warto najpierw zinwentaryzować).
   - Zachować zewnętrzne API `BaseButton` bez zmian (pubic ⇒ żaden konsument nie pęknie).
   - **Test:** `test:visual` zielony, snapshoty Buttona bez różnic.

2. **`Switch`** (`switch.tsx`)
   - `<SwitchBase>` ze slotProps → `<Switch.Root>` + `<Switch.Thumb>` + (track jest implicit w `Root`, nie ma osobnego `Track` w Base UI — sprawdzić wersję 1.4).
   - Wewnętrzna obsługa: `onChange(checked, event)` → `onCheckedChange(checked, event)` mapping (nasz API zostawiamy bez zmian, mapujemy wewnętrznie).
   - `SwitchProps` z `@mui/base` → typ z Base UI lub własny.
   - CSS: classy są te same (CSS modules), ale stany w Base UI to `data-checked`/`data-disabled` zamiast `Mui-checked`. **Trzeba zaktualizować selektory w `switch.module.css`.**
   - **Test:** snapshot diff = 0; sprawdzić ręcznie keyboard nav (Space toggle, Tab focus).

3. **`Input`** (`input.tsx`, `types.ts`)
   - `<InputBase slotProps={{root, input}}>` → `<Input>` (Base UI ma single component, bez slotów).
   - `startAdornment`/`endAdornment` — w Base UI nie ma jako prop, trzeba zrobić wrapper `<div>...<Input>...</div>` z naszym CSS. To jest **regresja API** — sprawdzić jak `Input` jest używany przez `clear-button` i czy public API wymaga zmiany. Jeśli tak, Input musi zostać własnym wrapperem renderującym `<Input>` Base UI + adornments.
   - Stany przez `data-filled`/`data-touched` (działają tylko wewnątrz `Field.Root`) — alternatywa: pozostawić nasz custom error styling.
   - **Test:** snapshot diff = 0 dla wszystkich wariantów; sprawdzić `onChange` event signature jeśli zmienione.

## Faza 2 — Komponenty med-risk (~1-2 dni)

4. **`TextArea`** (`text-area.tsx`)
   - `TextareaAutosize` z `@mui/base` ZNIKA. Najprostsza opcja: `pnpm add react-textarea-autosize` (ten sam autor, drop-in replacement, identyczny `minRows`/`maxRows` API).
   - Alternatywa: native CSS `field-sizing: content` (Chromium 123+, Safari TP) — ryzykowne dla starszych przeglądarek, **odradzam**.
   - **Test:** snapshot bazowy + snapshot z długim tekstem (autosize do `maxRows` = 5).

5. **`Modal`** (`modal.tsx`)
   - `<BaseModal slots={{backdrop: Backdrop}}>` → `<Dialog.Root open={open} onOpenChange={onClose}><Dialog.Portal><Dialog.Backdrop/><Dialog.Popup>...</Dialog.Popup></Dialog.Portal></Dialog.Root>`.
   - `<Fade in={open}>` z `@mui/material` zostaje albo zamienić na CSS transition + `data-starting-style`/`data-ending-style` Base UI. **Rekomendacja:** wyrzucić `Fade` z `@mui/material` (i ogólnie cała zależność `@mui/material` może być do wycięcia po migracji — zaoszczędzimy ~50KB).
   - Backdrop nie jest slot-em ale dzieckiem — trzeba przepisać `Backdrop` component na zwykły `<Dialog.Backdrop className={styles.backdrop}/>`.
   - `onClose` → `onOpenChange(open: boolean)` mapping.
   - **Test:** snapshot otwartego modala (z/bez ikony, 2 sizes, footer variants), snapshot przejścia closed→open jest zbędny (Base UI sam zarządza animacją).
   - Ręcznie: ESC zamyka, klik w backdrop zamyka, focus trap, focus restore po zamknięciu.

## Faza 3 — Komponenty high-risk (~2-3 dni)

6. **`Menu`** (`menu.tsx`, `menu-item.tsx`, `create-trigger-button.tsx`)
   - Pełny rebuild: `<Dropdown><MenuButton/><Menu><MenuItem/></Menu></Dropdown>` → `<Menu.Root open onOpenChange><Menu.Trigger render={...}/><Menu.Portal><Menu.Positioner side={...} sideOffset={...}><Menu.Popup><Menu.Item/></Menu.Popup></Menu.Positioner></Menu.Portal></Menu.Root>`.
   - `placement` z `@floating-ui/react` (`'bottom-end'`, etc.) → mapowanie na Base UI `side` + `align` (Base UI ma własny system: `side="bottom"` + `align="end"`).
   - `offset` jako `OffsetOptions` → `sideOffset: number` (uproszczenie — sprawdzić czy aktualnie ktoś używa złożonego `OffsetOptions`).
   - `slotProps.root.placement` etc. — wszystko przepisać na Positioner/Popup props.
   - `createTriggerButton` (utility) — pewnie zostanie, ale `<MenuButton slots={{root}}>` → `<Menu.Trigger render={<TriggerButton/>}/>`.
   - **Test:** snapshot menu zamkniętego (tylko trigger), snapshot otwartego dla każdego placement (`top`, `bottom-start`, `right`...). Plus interaction test: klik trigger → menu open → snapshot.

7. **`Select`** (`select.tsx`, `select-button`, `select-option`, `select-value`)
   - Pełny rebuild: `<SelectBase slots renderValue>` → `<Select.Root value onValueChange><Select.Trigger render={<SelectButton/>}><Select.Value/></Select.Trigger><Select.Portal><Select.Positioner><Select.Popup><Select.Item value label/></Select.Popup></Select.Positioner></Select.Portal></Select.Root>`.
   - `UseSelectParameters<string|number|null>` — typ ZNIKA (brak `useSelect` hook). Trzeba zdefiniować własny typ `SelectBaseProps` na podstawie `Select.Root.Props` Base UI.
   - `renderValue={(option) => <SelectValue/>}` → komponowane przez `<Select.Value>{(value) => ...}</Select.Value>` (render prop child).
   - `slots={{ root: SelectButton }}` → `<Select.Trigger render={<SelectButton/>}/>` (tu `prepareForSlot` z Buttona już nie zadziała — `SelectButton` musi sam forwardować ref i spreadować props).
   - `disablePortal: true` → użyj `<Select.Popup>` bez `<Select.Portal>` (Base UI portal jest opt-in).
   - **Test:** snapshot zamkniętego selecta (z różnymi `selectedOptionLabel`), snapshot otwartego z opcjami, snapshot z separator, snapshot error state.

## Faza 4 — Snackbar → Toast (osobny epic, ~2-3 dni)

8. **`Snackbar`** (`snackbar.tsx`)
   - **DECYZJA DESIGNOWA WYMAGANA:** Base UI `Toast` to imperative manager (`Toast.Provider` + `useToastManager().add({...})`). Nasze obecne API to deklaratywne `<Snackbar open variant title/>`.
   - Dwa warianty:
     - **A) Pełna migracja na Toast** — public API `<Snackbar/>` znika, konsumenci muszą wołać `toast.add({variant, title, ...})`. **Breaking change.**
     - **B) Pozostawić current API i zrezygnować z `@mui/base/Snackbar`** — obecny `<BaseSnackbar open={true} className=...>` to praktycznie wrapper. Można go wyrzucić i zostawić nasz `<div>` z odpowiednim ARIA (`role="status"`/`aria-live="polite"`). To jest **najmniejsza zmiana** i prawdopodobnie najwłaściwsza, bo `@mui/base/Snackbar` w obecnym kodzie nie wnosi dużo wartości.
   - **Rekomendacja: wariant B**. Wyrzucamy `BaseSnackbar`, zostaje `<div role="status" aria-live="polite" className={...}>`. Auto-dismiss timer trzeba dorobić ręcznie (`useEffect` + `setTimeout`) jeśli był używany — sprawdzić.
   - Wariant A jako oddzielna inicjatywa, jeśli pojawi się potrzeba globalnego toast managera.
   - **Test:** snapshot każdego variantu × subtitle × button × close.

## Faza 5 — Cleanup + bundle slimming

- Usunąć z `packages/ui/package.json`:
  - `@mui/base` (zmigrowane)
  - `@mui/material` (po Modal migration, jedyne użycie `Fade` znika)
  - `@emotion/styled` (peer dep MUI, ZERO direct usage)
  - `@emotion/react` (devDep, prawdopodobnie peer MUI — verify przez `pnpm why`)
- `grep -r '@mui/' packages/ui/src` zwraca pustkę — gate.
- Zmierzyć bundle przed/po przez `vite-bundle-visualizer` lub `rollup-plugin-visualizer`. Cel: zredukować `dist/overflow-ui.js` o **co najmniej 30%** względem stanu przed migracją.
- Bump wersji `@synergycodes/overflow-ui` do `1.0.0-beta.27` lub wyżej.
- Update CHANGELOG / about/ jeśli są.
- Final `pnpm test:visual` na branchu — zero diffów względem baseline.

## Epic osobny — DatePicker rebuild (wyrzucenie Mantine)

Mantine to ciężka zależność (`@mantine/core` ~80 KB gzip, `@mantine/dates` ~25 KB) używana **wyłącznie do jednego komponentu DatePicker**. To wynik:wartość najgorszy w całym repo. Plan epic-a (osobny od migracji `@mui/base`):

### Opcje rebuilda

| Opcja | Bundle | Effort | Zalety | Wady |
|---|---|---|---|---|
| **`react-day-picker`** | ~25 KB gzip | ~3 dni | Najlżejszy, design system friendly, dobra a11y, headless-ish | Brak natywnego "input + popover" — trzeba skomponować z Base UI Popover/Dialog |
| **Native `<input type="date">`** | 0 KB | ~1 dzień | Zero KB | Kiepski UX cross-browser, brak custom stylingu, brak range/multiple |
| **Własny od zera (Floating UI)** | ~5-10 KB gzip + date-fns/dayjs | ~5-7 dni | Pełna kontrola | Duży effort, ryzyko błędów a11y |
| **Zostawić Mantine** | ~105 KB gzip | 0 | - | Ciężar, niespójność z resztą stacku |

**Rekomendacja: `react-day-picker`** — najlepszy balans. Skomponowany z `<Input>` (już mamy z Base UI po migracji) jako trigger i Base UI `Popover` jako dropdown.

### Integracja z istniejącym API

Public API `DatePicker` to `valueFormat`, `placeholder`, `type` (`'default' | 'range' | 'multiple'`), `value`, `defaultValue`, `error`. Trzeba zachować — to breaking change ekosystemu konsumentów inaczej.

`react-day-picker` ma `mode="single" | "range" | "multiple"` — mapowanie 1:1 z naszym `type`.
Format daty: `react-day-picker` używa Date objects, formatowanie przez `date-fns` (lub `dayjs`). Już mamy `valueFormat: string` (np. `'DD/MM/YYYY'`) — trzeba zachować ten parser.

### Co znika

- `data-picker-mantine.css` (130 linii) — selektory `.mantine-Popover-dropdown`, `.mantine-DatePicker-*`. Zastąpione przez nasze klasy CSS module wokół `react-day-picker` markupu.
- `MantineProvider` wrapper — niepotrzebny.
- Cała ergonomia Mantine — design tokens trzeba przemapować na nasze (już jest częściowo w `data-picker-mantine.css` przez CSS variables `--ax-public-date-picker-*` — pójdą do nowego komponentu).

### Acceptance

- `@mantine/core` i `@mantine/dates` usunięte z `package.json`.
- `pnpm why @mantine` zwraca pustkę.
- `data-picker-mantine.css` usunięty.
- Visual snapshot DatePickera w preview-page pokazuje **funkcjonalnie ekwiwalentny** komponent (ale wizualnie się różni — to OK, bo design system ma pierwszeństwo, a Mantine był stylowany ad-hoc). **Snapshot baseline DatePickera trzeba zaktualizować w tej PR**, nie liczy się jako wizualna regresja.
- Public API `DatePicker` bez breaking change.

## Optional: peer deps dla większego slimmingu

Aktualnie `vite.config.mts` external = `['react', 'react-dom', 'react/jsx-runtime']`. **Wszystko inne wpada w bundle paczki.**

Opcjonalna optymalizacja — przenieść część zależności na **peer dependencies**, żeby konsumenci dostarczali je sami (de-duplikacja w aplikacji konsumenckiej, mniejszy bundle):

| Dep | Plus za peer | Minus za peer |
|---|---|---|
| `@phosphor-icons/react` | ~5-50 KB mniej (zależnie od ile ikon używamy treeshake) — konsumenci często sami używają tego pakietu | Wymaga od konsumenta install + dokumentacji |
| `@base-ui/react` | ~30 KB mniej, konsument może chcieć użyć innych komponentów Base UI bezpośrednio | Wymaga install u konsumenta |
| `@floating-ui/react` | ~10 KB mniej | Niskopoziomowy, konsument raczej nie używa |
| `clsx` | ~0.5 KB — niewart | - |

**Rekomendacja:** rozważyć po migracji, w osobnej dyskusji designowej z zespołem. Decyzja zależy od tego ile chcemy "self-contained library" vs "lean dependency". Standardowo komponentowe library typu Radix UI, Headless UI idą w peer deps. MUI idzie w bundled (samowystarczalność).

## Acceptance criteria

### Migracja `@mui/base` → `@base-ui/react`

- [ ] `@mui/base` usunięty z `package.json`.
- [ ] Wszystkie 17 importów z `@mui/base` zniknęły (`grep -r '@mui/base' packages/ui/src` zwraca pustkę).
- [ ] `pnpm typecheck` przechodzi w `packages/ui` i `packages/website`.
- [ ] `pnpm lint` przechodzi.
- [ ] `pnpm --filter @synergycodes/overflow-ui build` produkuje bundle bez błędów.
- [ ] `pnpm test:visual` zielony — żaden snapshot nie różni się więcej niż `maxDiffPixelRatio: 0.001` od baseline.
- [ ] Manual smoke test na `preview-page`: każdy komponent działa (klawiatura, focus, ARIA).
- [ ] Public API komponentów eksportowanych z `@synergycodes/overflow-ui` jest zachowane (poza ewentualnym Snackbar — udokumentować).

### Slimming (poza-DatePicker)

- [ ] `@mui/material` usunięty z `package.json`.
- [ ] `@emotion/styled` usunięty z `dependencies`.
- [ ] `@emotion/react` usunięty z `devDependencies` (chyba że `pnpm why` pokaże, że Mantine wymaga — wtedy zostaje do epica DatePicker).
- [ ] `grep -r '@mui/' packages/ui/src` i `grep -r '@emotion/' packages/ui/src` zwracają pustkę.
- [ ] Bundle `dist/overflow-ui.js` zmniejszony o **min. 30%** względem stanu sprzed migracji (zmierzone tym samym narzędziem przed/po).

### Slimming (DatePicker, osobny epic)

- [ ] `@mantine/core` i `@mantine/dates` usunięte.
- [ ] `data-picker-mantine.css` usunięty.
- [ ] Bundle `dist/overflow-ui.js` zmniejszony o **dodatkowe ~30-50%** względem stanu po migracji `@mui/base`.

## Pułapki do zapamiętania

- **Custom componenty przekazywane do `render={...}` MUSZĄ forwardować ref i spreadować props** — inaczej focus/keyboard cicho się psuje. Sprawdzać każdy `forwardRef` i `{...props}`.
- **Selektory CSS oparte o klasy `Mui-*` przestaną działać** — Base UI używa `data-*` attributes. Trzeba zrobić sweep przez wszystkie `*.module.css` i zaktualizować (`grep -rn 'Mui-' packages/ui/src`).
- **Floating UI props** — `placement` → `side` + `align`, `offset` → `sideOffset`. Konsumenci publicznego API `Menu` (`placement: Placement`) dostaną breaking change. Zachowaj kompatybilność: zmapuj wewnętrznie z naszego `Placement` (Floating UI typ) na Base UI `side`+`align`.
- **`disablePortal`** — w Base UI nie ma takiego propa. Albo dajesz `<Portal>`, albo nie. Wpływa na z-index i overflow w naszych node panelach.
- **Animacje:** `<Fade>` z `@mui/material` używa `react-transition-group`. Base UI używa CSS-only z `data-starting-style`. To zmiana mental modelu — przygotować CSS keyframes / transitions w `*.module.css`.
- **Visual regression w CI vs lokalnie** — różnice w fontach, sub-pixel rendering. Mocno trzymać się jednego środowiska (Playwright Docker image).

## Kolejność commitów (rekomendowana)

1. `[migration] setup playwright visual regression + preview showcase` (Faza 0)
2. `[migration] base-button: drop prepareForSlot` (Faza 1)
3. `[migration] switch: base-ui Switch.Root` (Faza 1)
4. `[migration] input: base-ui Input` (Faza 1)
5. `[migration] text-area: react-textarea-autosize` (Faza 2)
6. `[migration] modal: base-ui Dialog + drop @mui/material Fade` (Faza 2 — w tym commicie wyrzucamy też `@mui/material` i `@emotion/styled`)
7. `[migration] menu: base-ui Menu compound` (Faza 3)
8. `[migration] select: base-ui Select compound` (Faza 3)
9. `[migration] snackbar: drop @mui/base wrapper` (Faza 4)
10. `[migration] cleanup: drop @mui/base + verify no @emotion left` (Faza 5)
11. `[chore] measure bundle size delta + commit visualizer report` (Faza 5 — opcjonalnie)

Każda PR-ka osobno, każda zielona w `test:visual`. To nie powinno być squashowane w jeden commit — historia per-komponent ułatwia bisect i rollback.

**Osobno (po zakończeniu migracji `@mui/base`):**

12. `[refactor] date-picker: rebuild on react-day-picker, drop mantine` (Epic DatePicker)

Można też zrobić odwrotnie — DatePicker jako pierwszy epic, jeśli zespół chce szybciej zobaczyć efekt slimmingu. Te dwa epiki są niezależne (DatePicker nie używa `@mui/base`).
