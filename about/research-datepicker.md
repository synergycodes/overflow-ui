# DatePicker rebuild — opcje

Research opcji wyrzucenia Mantine z `@synergycodes/overflow-ui`. DatePicker jest jedynym konsumentem `@mantine/core` + `@mantine/dates` w całym monorepo.

## Aktualny stan

### Bundle hit Mantine — pomiar realny

Zmierzone przez fizyczny rebuild paczki `@synergycodes/overflow-ui` w dwóch wariantach (z Mantine vs. ze stub-em DatePicker bez importów Mantine), na tym samym Vite/rollup:

| wariant | `dist/overflow-ui.js` raw | gzip | `dist/index.css` raw | gzip |
| --- | ---: | ---: | ---: | ---: |
| z Mantine (current) | 628.27 kB | **165.94 kB** | 81.90 kB | 10.60 kB |
| stub bez Mantine    | 410.04 kB | **112.83 kB** | 78.74 kB | 10.16 kB |
| **delta**           | **218.23 kB** | **53.11 kB** | **3.16 kB** | **0.44 kB** |

**Realny koszt Mantine w obecnym bundlu: ~218 KB raw / ~53 KB gzip JS + ~0.4 KB gzip CSS.** Liczby z bundlephobii (`@mantine/core` ~143 KB gzip, `@mantine/dates` ~13 KB gzip) były górnym ograniczeniem; rollup tree-shake-uje sporo, ale i tak Mantine to zdecydowanie największy pojedynczy ciężar w bibliotece.

### Public API używane gdzie

Konsumenty `<DatePicker>` w monorepo:

- `packages/ui/src/components/date-picker/date-picker.tsx` — implementacja.
- `packages/ui/preview-page/preview-page.tsx` — sekcja `DatePickerSection`, 3 instancje:
  - `<DatePicker placeholder="dd/mm/yyyy" defaultValue={today} />`
  - `<DatePicker type="range" defaultValue={[today, +7d]} />`
  - `<DatePicker error placeholder="With error" />`
- `packages/website/docs/code-examples/date-picker.example.tsx` — żywy demo: `<DatePicker type="range" defaultValue={[today, inThreeDays]} />`.
- `packages/website/docs/authored/ui/date-picker/date-picker-docs.tsx` — page wrapper.

### Realnie używane propy (cały monorepo)

Faktycznie wykorzystywane propsy z public API:

- `placeholder` (string)
- `defaultValue` (Date oraz `[Date, Date]` w wariancie range)
- `type` (tylko `'range'` używane jawnie)
- `error` (boolean)

**NIE są używane nigdzie w projekcie:**

- `value` (controlled) — komponent ma kod do tego, demo tylko z `defaultValue`.
- `valueFormat` — używana jest tylko domyślna `'DD/MM/YYYY'`.
- `inputSize` — komponent przyjmuje, ale konsumenci nie ustawiają.
- `type='multiple'` — kod wspiera, ale nikt w monorepo z tego nie korzysta.
- Cały rest spread z `DatePickerInputProps<DatePickerType>` (Mantine props).

### Public API kontrakt

Z dokumentacji TSDoc i implementacji `date-picker.tsx`:

- `valueFormat?: string` (default `'DD/MM/YYYY'`).
- `placeholder?: string` (default `'dd/mm/yyyy'`).
- `type?: 'default' | 'range' | 'multiple'` (default `'default'`).
- `value?: Date | [Date, Date] | Date[]` — przyjmuje też string przez `normalizeDateValue`.
- `defaultValue?: Date | [Date, Date] | Date[]`.
- `error?: boolean`.
- `inputSize?: 'small' | 'medium' | 'large'` (default `'medium'`).
- `...rest` — wszystko z Mantine `DatePickerInputProps<DatePickerType>` (np. `disabled`, `readOnly`, `onChange`, `minDate`, `maxDate`, `onClick`, `aria-*`, `data-*`, `clearable`, `firstDayOfWeek`, etc.).

**Krytyczna obserwacja:** `...rest` dziedziczy ogromne API Mantine. Konsumenci *mogliby* używać dowolnego propa z `DatePickerInputProps`, ale grep pokazuje, że nikt tego nie robi. Mimo to `@synergycodes/overflow-ui` to publiczna paczka npm — zewnętrzni konsumenci poza tym repo mogą używać `disabled`/`onChange`/`minDate` etc. **Każdy rebuild powinien dostarczyć przynajmniej minimalne `value`/`onChange`/`disabled`/`readOnly`/`minDate`/`maxDate`, bo to standard każdego DatePickera.**

### Aktualna struktura DOM po renderze

`DatePickerInput` od Mantine renderuje:

1. Trigger: `<button>` z formatowaną datą (lub placeholder), klikalny.
2. Popover (portal) z calendar UI: header (prev/next/level), tabela z dniami; też view miesięcy/lat (przez kliknięcie levelu).

Custom CSS w `data-picker-mantine.css` celuje selektorami w klasy Mantine (`.mantine-Popover-dropdown`, `.mantine-DatePickerInput-calendarHeader`, `td button[data-selected='true']` itd.), parametryzowane custom property `--ax-public-date-picker-*`. **Po wyrzuceniu Mantine ten cały CSS plik trzeba przepisać pod nową strukturę DOM** — to nieuniknione.

### Pliki do zmiany

- `packages/ui/src/components/date-picker/date-picker.tsx`
- `packages/ui/src/components/date-picker/types.ts` (importuje `DatePickerInputProps` z Mantine)
- `packages/ui/src/components/date-picker/data-picker-mantine.css` → przepisać pod nowy komponent
- `packages/ui/package.json` — usunąć `@mantine/core`, `@mantine/dates`
- `packages/ui/tests/visual/__snapshots__/preview.spec.ts/date-picker.png` — zregenerować visual snapshot

---

## Opcje rebuild-u

### 1. `react-day-picker` v9 (REKOMENDACJA)

- **npm version:** `9.14.0` (engines: `node>=18`).
- **Bundle (gzip), realny pomiar z tarballa:**
  - Core sam (`DayPicker.js` + `helpers/` + `classes/` + `utils/` + components, BEZ locale, BEZ kalendarzy alternatywnych jalali/hijri/buddhist/ethiopic/hebrew): **~30 KB gzip, 160 KB raw**.
  - bundlephobia raportuje ~30 KB gzip dla samego `react-day-picker` (dependency rozłożone), 67 KB gzip + 7.5 KB dla single import — niedoszacowane.
- **Peer/runtime deps:** `react>=16.8`. Direct deps:
  - `date-fns@^4.1.0` — RDP używa ~30 funkcji z date-fns (addDays, format, startOfMonth, isAfter etc.). **Treeshakeable** (każda funkcja w osobnym pliku). Realny hit: **~12-18 KB gzip** dla używanych funkcji + format helpers (oszacowanie z tarballa date-fns 4.1.0).
  - `@date-fns/tz@^1.4.1` — TZDate. **~5 KB gzip** (tarball 17 KB raw).
  - `date-fns-jalali@4.1.0-0` — kalendarz perski. **NIEUŻYWANY** w `mode='single'/'range'/'multiple'`. Powinien być tree-shakeable, ale RDP exportuje `* from "./classes/index.js"` itd., trzeba zweryfikować w realnym buildzie.
  - `@tabby_ai/hijri-converter@1.0.5` — kalendarz hidżri. Dostarczany przez subpath `react-day-picker/hijri`, **NIE jest importowany z głównego entry** — bezpieczne.
- **Łączny realny bundle hit (oszacowanie konserwatywne):** **35-50 KB gzip**, vs. obecnych 53 KB gzip Mantine. Czyli oszczędność **~5-20 KB gzip**.
- **Mode mapping:** czysty 1:1.
  - `type='default'` → `mode='single'`
  - `type='range'`   → `mode='range'`
  - `type='multiple'`→ `mode='multiple'`
- **Format daty:** używa native `Date`, format przez `date-fns/format` (token `'dd/MM/yyyy'`). **Mantine format `'DD/MM/YYYY'` (dayjs) ≠ date-fns format `'dd/MM/yyyy'`** — to potencjalny breaking change. Trzeba albo:
  - (a) udokumentować zmianę tokenów (mała szansa że ktoś zewnętrzny ustawia custom `valueFormat`),
  - (b) napisać prosty mapper `dayjs-token → date-fns-token`.
- **Popover/positioning:** RDP to **TYLKO calendar grid** — bez popover, bez triggera. Trzeba opakować w Base UI Popover (mamy `@base-ui/react@1.4.1`) lub `@floating-ui/react` (mamy). Custom button trigger (już mamy w stylach `styles['container']`).
- **CSS:** RDP ma własne `data-*` atrybuty (`data-selected`, `data-disabled`, `data-outside`, `data-today`, `data-range_start` etc.). Custom CSS w `data-picker-mantine.css` celuje już w `[data-selected='true']`/`[data-outside='true']` — selektory mogą przejść 1:1, plus refactor `.mantine-Popover-dropdown` → klasy z naszego module CSS dla Base UI Popover.
- **A11y:** ARIA out of the box (gridcell, grid, role="application" itp.).
- **Effort estimate:** **2-4 dni** (1 dzień: wrapper + Popover composition; 1-2 dni: CSS rewrite pod nową strukturę DOM + nowe selektory; 0.5-1 dzień: visual snapshot + testy + verify edge cases dla range/multiple).
- **Breaking changes:**
  - `valueFormat` token mismatch (dayjs vs date-fns). Niski impact (nikt nie używa custom).
  - `...rest` spread → tracimy całą platformę propsów Mantine (`firstDayOfWeek`, `clearable`, `excludeDate`, etc.). Trzeba ręcznie wystawić to co naprawdę chcemy: `disabled`, `readOnly`, `onChange`, `minDate`, `maxDate`, `id`, `aria-*`. Reszta — odpadnie. **To jest breaking dla zewnętrznych konsumentów** którzy używali np. `clearable` lub `excludeDate`. Można to zminimalizować forwardując RDP propsy przez spread.
- **Pros:**
  - Najszybszy migration path (1:1 mode mapping).
  - Aktywnie rozwijana (v9 z Sept 2024, regularne releases).
  - Stabilna, używana w shadcn/ui (de facto standard wśród headless React date pickers).
  - Mała powierzchnia API.
  - Eliminuje całe `@mantine/core` (Provider, theming, scale system) i `@mantine/dates`.
- **Cons:**
  - Direct dep na `date-fns@4` — duża library, ale tree-shakeable.
  - Ma transitively `date-fns-jalali` jako direct dep (nie peer). W praktyce nieużywane przez nasz mode, ale rollup może to wciągnąć jeśli source ma `import * from`. **Wymaga weryfikacji w realnym buildzie po migracji.**
  - Brak własnego popover/trigger — trzeba kompozować.
  - `valueFormat` format token zmiana.

### 2. `react-aria-components` (Adobe React Aria)

- **npm version:** `1.17.0` (uniwersalny pakiet ze wszystkimi komponentami z aria/stately).
- **Alt:** osobne `@react-aria/datepicker@3.17.0` + `@react-stately/datepicker@3.15.0` + `@internationalized/date@3.12.1` jako headless hooks.
- **Bundle (gzip), z bundlephobii:**
  - `@react-aria/datepicker`: 30 KB gzip (98 KB raw) — pobiera całe `react-aria` (225 KB raw) + react-stately + internationalized/{date, number, string}.
  - `@react-stately/datepicker`: 16 KB gzip (50 KB raw) — w tym 89 KB raw `@internationalized/date`.
  - `@internationalized/date` solo: 11 KB gzip (33 KB raw).
  - **Łącznie hooks-only:** ~40-50 KB gzip (porównywalnie z obecną Mantine).
  - **`react-aria-components` z DatePicker + Calendar:** szacunkowo **60-90 KB gzip** całość (cały framework).
- **Peer/runtime deps:** `react`, `react-dom`. Internal deps: `@swc/helpers`, `react-aria`, `react-stately`, `@internationalized/date`/`number`/`string`. Brak `date-fns` — używają własnej `@internationalized/date` (CalendarDate/ZonedDateTime types).
- **Mode mapping:**
  - Single: `<DatePicker>` (z `react-aria-components`) lub hook `useDatePicker`.
  - Range: `<DateRangePicker>`.
  - Multiple: **NIE wspierany out of the box** — trzeba ręcznie z `useCalendar` + `useDateRangePicker` + custom selection state. Minus.
- **Format daty:** **NIE używa native `Date`**, tylko własne `CalendarDate`/`ZonedDateTime`/`DateValue` z `@internationalized/date`. To **istotny breaking change** dla public API: konsumenci pasują `Date`, my musimy konwertować in/out (`new Date(year, month, day)` ↔ `parseDate('2026-05-05')`). Każdy publiczny prop staje się przezroczystym wrapperem.
- **Popover/positioning:**
  - `react-aria-components` ma własny `<Popover>` i `<Dialog>` — działa out of the box.
  - Hooks-only: `useDatePicker` zwraca `{groupProps, fieldProps, buttonProps, calendarProps, dialogProps, descProps, errorMessageProps}` — full headless, sami montujemy DOM.
- **CSS:** w `react-aria-components` są data-attrs (`[data-selected]`, `[data-focused]`, `[data-hovered]`); CSS rewrite tak czy inaczej.
- **A11y:** najlepsza w klasie (Adobe), keyboard navigation, screen readers, RTL out of the box.
- **Effort estimate:** **5-8 dni**.
  - `react-aria-components`: 4-5 dni (mniej kodu, bo trzymają DOM struc), ale dużo nauki pierwszy raz, integracja `Date` ↔ `CalendarDate`.
  - hooks-only: 7-10 dni (sami budujemy całość DOM).
- **Breaking changes:**
  - `value`/`defaultValue`/`onChange` zaczynają operować na `DateValue` zamiast `Date` — można hidować, ale rośnie powierzchnia konwersji i pole na bug-i.
  - `valueFormat` semantics → `formatOptions` (Intl.DateTimeFormatOptions). **To jest istotny breaking** lub obfuscation.
- **Pros:**
  - Niski hit gzip, szczególnie hooks-only (~40 KB porównywalne z Mantine).
  - Najlepsza accessibility w branży.
  - Adobe-grade quality, długo wspierane.
  - i18n out of the box (calendars, locales).
- **Cons:**
  - **Multiple mode wymaga custom impl.**
  - Format daty radykalnie inny — wymaga warstwy translacji.
  - Largest learning curve — `CalendarDate`/`ZonedDateTime`/`Time` to osobny mental model.
  - Najwyższy effort (5-10 dni).

### 3. Native `<input type="date">`

- **Bundle:** **0 KB**. Zero zależności.
- **Mode mapping:** tylko single. **Range nie istnieje natywnie** (trzeba 2 inputy z constraint), **multiple nie istnieje wcale**.
- **Format daty:** native `Date` przez `valueAsDate` lub string `YYYY-MM-DD` przez `value`. `valueFormat` jest **całkowicie ignorowany** — przeglądarka/system decyduje o lokalnym formacie.
- **Popover:** own browser-controlled, **brak custom stylingu calendar UI** (tylko niektóre selektory `::-webkit-calendar-picker-indicator`).
- **A11y:** native, dobre w nowoczesnych przeglądarkach.
- **Cross-browser:** Safari pre-15 nie wspiera, Firefox ma minimalny styling, każda przeglądarka ma inny popover. Dla projektu z customowym design system **niedopuszczalne**.
- **Effort estimate:** 0.5 dnia.
- **Breaking changes:** masive — `type='range'` i `type='multiple'` znikają.
- **Verdict:** **NIE.** Project to library z customowym design system; natywny date picker łamie design.

### 4. Własna implementacja od zera (Floating UI + custom calendar)

- **Bundle:** ~5-15 KB gzip własnego kodu + parser/formatter daty (~3-5 KB gzip jeśli minimalny custom; ~12-18 KB gzip jeśli date-fns z 5-6 funkcjami: format, parse, addMonths, startOfMonth, isSameDay, isAfter).
- **Łączny realny hit:** **~10-25 KB gzip**. **Najmniejszy bundle hit z opcji.**
- **Stack:**
  - `@floating-ui/react` (mamy) lub Base UI Popover (mamy) dla popover/positioning.
  - Native `Date` API + `Intl.DateTimeFormat` dla formattera (zero deps) lub date-fns dla helper-ów.
  - Custom calendar grid (4 weeks × 7 days = 28-35 cells, ~150-300 LOC).
  - Custom selection state hook dla single/range/multiple.
- **Mode mapping:** dowolny — sami robimy.
- **Format daty:** native `Date`, formatter na `Intl.DateTimeFormat` ('en-GB' = `dd/mm/yyyy`).
- **A11y:** **nie ma free lunch.** Trzeba ręcznie zaimplementować role="grid", aria-selected, keyboard nav (arrow keys, PageUp/Down, Home/End), focus management. Ryzyko regressu jakości a11y vs. Mantine.
- **Effort estimate:** **5-7 dni** (calendar grid + selection logic + popover compose + a11y + testy + visual snapshot).
- **Breaking changes:** zerowe jeśli zachowamy public API. Możemy nawet emulować `valueFormat` przez prosty mapper.
- **Pros:**
  - Najmniejszy bundle hit ze wszystkich opcji.
  - Pełna kontrola DOM struc — CSS bez compromise.
  - Brak zewnętrznych breaking changes w dependencies (date-fns 5 kiedyś wyjdzie, RDP się zmieni, nas to nie obchodzi).
  - Można dopasować do design system 1:1.
- **Cons:**
  - Najwyższy effort z opcji *kontynuowanych* (5-7 dni vs. 2-4 dla RDP).
  - Trzeba samodzielnie dbać o a11y i edge case-y (DST, leap years, miesiąc krzyż przy navigation, range select przy klawiaturze, etc.).
  - Nie ma external maintainera — wszystkie buggi w ogonie ML pisze tym kto napisał.

### 5. Inne biblioteki — szybki triage

- `@uselessdev/datepicker`: last published 2024-07-31, deprecated/abandoned. **Nie.**
- `@radix-ui/react-popover` + custom calendar: nie ma sensu, bo mamy już Base UI Popover (z tej samej szkoły). Calendar i tak musimy napisać sami → tożsame z opcją 4.
- `@nivo/calendar`: to **wizualizacja heatmap** kalendarzowy (jak GitHub contributions), nie picker. Nie pasuje.
- `react-datepicker` (v8+): popularna, ale ma vendoring `date-fns` jako direct dep, ~30 KB gzip, własne API niezgodne z naszym `type` i agresywny CSS namespace `.react-datepicker__*`. Effort migracji porównywalny do RDP, ale gorsze wsparcie modes (range tak, multiple nie out of the box). RDP lepszy.
- `@mui/x-date-pickers`: wymaga Material UI jako peer, wraca z deszczu pod rynnę.
- `nepali-datepicker-reactjs`, `chakra-ui` itp.: niche / niepotrzebne.

**Wniosek: lista realistycznych opcji to RDP (1) i react-aria-components (2). Reszta odpada.**

---

## Rekomendacja: `react-day-picker` (opcja 1)

**Dlaczego RDP, a nie własna implementacja ani react-aria-components:**

1. **Najlepszy stosunek effort/efekt.** Odzyskujemy ~5-20 KB gzip vs. Mantine za 2-4 dni roboty. Własna implementacja dałaby więcej (~30-40 KB), ale za 5-7 dni i wieczny maintenance burden.
2. **API mode mapping 1:1.** `type='default'/'range'/'multiple'` ma natywny odpowiednik w `mode='single'/'range'/'multiple'`. Multiple działa od strzału (w react-aria-components nie działa).
3. **Native Date.** Public API może zostać 95%+ takie samo. W react-aria musielibyśmy konwertować przez `CalendarDate` — większa powierzchnia bug-ów.
4. **Standard de facto.** RDP jest używany przez shadcn/ui, ten ekosystem to ten sam target user co `@synergycodes/overflow-ui` (React + design tokens).
5. **CSS kompatybilność.** RDP ma `data-*` atrybuty, obecny CSS już używa tej konwencji (`[data-selected='true']`, `[data-outside='true']`) — duża część selektorów może przejść z minimalnym refactorem.
6. **Bundle hit pewny i ograniczony.** Realny pomiar z tarballa: 30 KB gzip core. Nawet z transitive date-fns kończymy w ~40-50 KB gzip — czyli **w najgorszym razie remis z Mantine, w lepszym +10-20 KB oszczędności**.

**Ryzyka do zwalidowania w realnym buildzie po migracji:**

- Czy rollup tree-shake-uje `date-fns-jalali` (direct dep RDP, w teorii unused). Trzeba zmierzyć po install.
- Czy `Intl.DateTimeFormat`-friendly format `dd/MM/yyyy` (date-fns) faktycznie produkuje to co Mantine `'DD/MM/YYYY'` (dayjs). Drobiazg, ale 30 sek smoke test.
- Visual regression na `tests/visual/__snapshots__/preview.spec.ts/date-picker.png` — snapshot trzeba zregenerować.

**Plan migracji (highlevel):**

1. Install `react-day-picker@9.14.0` jako dep, usuń `@mantine/core` + `@mantine/dates`.
2. Przepisz `date-picker.tsx`:
   - Trigger: `<button>` (zachowane style z `styles['container']` + `inputFontStyles`/`inputSizeStyles`).
   - Popover: Base UI `Popover.Root` + `Popover.Trigger` + `Popover.Portal` + `Popover.Positioner` + `Popover.Popup` (mamy już ekosystem Base UI w projekcie z innych komponentów, np. Modal — sprawdzić wzorce).
   - W środku popup: `<DayPicker mode={modeMap[type]} selected={value ?? defaultValue} onSelect={...} />`.
   - Format wyświetlania w trigger: `format(date, 'dd/MM/yyyy')` z date-fns (lub `Intl.DateTimeFormat('en-GB')` jeśli chcemy uniknąć importu format jeszcze).
3. Przepisz `data-picker-mantine.css` → nowy `date-picker-popover.css`:
   - `.mantine-Popover-dropdown` → klasa z `*.module.css` przyłożona do `Popover.Popup`.
   - `.mantine-DatePickerInput-calendarHeader` → `.rdp-month_caption` (RDP class).
   - `td button[data-selected='true']` → `.rdp-day[data-selected='true']` (RDP używa `data-selected` flag).
   - Cała tabela `.rdp` z `--ax-public-date-picker-*` custom properties zachowane.
4. Update `types.ts`: usuń import `DatePickerInputProps` z Mantine, wystawiaj minimalne API: `value`, `defaultValue`, `onChange`, `disabled`, `readOnly`, `minDate`/`maxDate`, `placeholder`, `valueFormat`, `error`, `inputSize`, `type`, `id`, `aria-*`, `name`.
5. Zregeneruj visual snapshot.
6. Update `packages/website/docs/authored/ui/date-picker/date-picker-docs.tsx` żeby wskazywał na nowy plik CSS (`date-picker-popover.css` zamiast `data-picker-mantine.css`).

**Łączna szacunkowa oszczędność po migracji:** **~10-20 KB gzip JS** (53 KB Mantine → ~35-43 KB RDP+date-fns) + **~0.4 KB gzip CSS** (Mantine baseline znika), plus istotne uproszczenie deps tree (`@mantine/core`, `@mantine/dates`, `clsx` jako tier dep, `react-remove-scroll`, `react-number-format`, `tslib` znikają).

**Łączna szacunkowa oszczędność install size:** Mantine (`@mantine/core` 771 KB raw + `@mantine/dates` 104 KB raw na disk) vs. RDP (~1.3 MB raw). To samo na disk, ale to nie idzie do bundlu konsumenta.
