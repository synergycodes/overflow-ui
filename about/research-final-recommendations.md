# Final recommendations — synthesis researchu

Synteza 4 niezależnych research-ów (`bundle-analysis`, `datepicker`, `externalization`, `codesplitting`) plus porównanie z initial recommendations w `research-current-recommendations.md`.

Stan wyjściowy (commit `de0297a`): `dist/overflow-ui.js` = 628.27 KB raw / **165.94 KB gzip**.

## TL;DR

Kolejność wyboru, posortowana **po zysku per dzień effortu**:

| # | Akcja | Saving (gzip) | Effort | Impact |
|---|---|---|---|---|
| 1 | **Multi-entry / subpath exports** | -50 do -70 KB **u konsumenta** (typowy use 5 komp); biblioteka bez zmian | 2-3 dni | Highest — to korzyść którą widzą realni użytkownicy paczki |
| 2 | **Tooltip → `@base-ui/react/tooltip`** | -8 do -15 KB w bibliotece | 1 dzień | Drop direct `@floating-ui/react` + `tabbable`, redukcja Floating UI duplikacji |
| 3 | **DatePicker rebuild → `react-day-picker`** | -5 do -20 KB w bibliotece | 2-4 dni | Drop `@mantine/*` + `dayjs`. Mniej spektakularne niż liczyłem (53 KB Mantine cost — 35 KB nowy date-fns + RDP = ~20 KB netto) |
| 4 | **Animacje Modal/Menu/Select** | 0 KB | 1 dzień | UX polish — naprawić to co straciliśmy w migracji |
| 5 | **Major v2.0.0: externalize peer deps** | -120 do -140 KB w bibliotece (do ~28 KB gzip) | 1 dzień + release | Major bump, konsumenci muszą doinstalować 2-3 paczki |

**Sumarycznie A+B+C (bez majora):** biblioteka spada do ~120-130 KB gzip + konsumenci typowi widzą 40-60 KB gzip dzięki code-splitowi. To jest sensowny target.

**Sumarycznie z major v2.0.0:** biblioteka 28 KB gzip, konsumenci doinstalowują peer deps.

## Kluczowe ustalenia z researchu

### 1. Floating UI ma TRZY niezależne kopie w bundle (~50 KB gzip realnych = 30%)

Z `research-bundle-analysis.md`:
- `@floating-ui/react@0.26.28` — **direct**, nasz Tooltip + Mantine też (te same wersje)
- `@floating-ui/react-dom@2.1.8` + `core@1.7.5` + `dom@1.7.6` — **transitive** przez `@base-ui/react`
- **Wendowana** `floating-ui-react/` w `@base-ui/react/esm/floating-ui-react/` (32 plików, 47 KB pre-min gzip!)

Łącznie cały Floating UI ekosystem to ~50 KB realnych gzip. Tooltip migration na `@base-ui/react/tooltip` eliminuje pierwszą kopię (drop `@floating-ui/react@0.26` + `tabbable@6.2`). Mantine wciąż ciągnie własną kopię — pełna eliminacja dopiero po DatePicker rebuild.

### 2. Mantine = 53 KB gzip realnych (zmierzone)

Z `research-datepicker.md` — fizyczny rebuild w dwóch wariantach:
- Z Mantine: 165.94 KB gzip
- Stub bez Mantine: 112.83 KB gzip
- **Delta: -53.11 KB gzip**

`react-day-picker` v9 + `date-fns` + `@date-fns/tz` ≈ 35-50 KB gzip. Net saving: **5-20 KB gzip**, nie 80 KB jak liczyłem w initial recommendations.

Konsumenci używają tylko 4 propów (`placeholder`, `defaultValue`, `type='range'`, `error`). `value` controlled, `valueFormat`, `inputSize`, `type='multiple'` — nikt nie używa.

### 3. Tree-shake słabo działa w monolitycznym single-entry

Z `research-codesplitting.md` — eksperyment z minimal consumer:
- `import { Button }` only → **105 KB gzip** (cały bundle praktycznie)
- 5 komponentów → 106 KB gzip
- Wszystko → 112 KB gzip
- Różnica między 1 a wszystkim: **7 KB gzip**

Powód: cała biblioteka to **jeden monolityczny ESM plik**. Rollup tree-shake'uje per-moduł (per-plik), nie per-export wewnątrz pliku. Komponenty splecione przez wspólne helpery (Base UI floating, Mantine theme) zostają.

CSS jest 100% nie-tree-shake'owalne — single 80 KB / 10 KB gzip plik dla wszystkich.

**Multi-entry rozwiązuje to:** każdy komponent w osobnym chunku, Vite ekstraktuje shared chunks. Konsument używający 5 komp dostaje ~40-60 KB gzip JS + ~3-5 KB gzip CSS zamiast 105/10.

### 4. `@base-ui/react` to 125 KB gzip "honest cost"

Z `research-bundle-analysis.md` — Base UI używa subpath imports (`/menu`, `/select`, `/dialog`, `/input`, `/switch`), tree-shaking działa poprawnie. Z 50+ top-level komponentów Base UI w bundle siedzi tylko to czego używamy. **Nie da się tego łatwo wyciąć bez fork-a Base UI.** Jedyne wyjście to externalize jako peer.

### 5. Externalization scenariusz B = bundle 28 KB gzip

Z `research-externalization.md`:
- **A** (tylko phosphor peer): -5 KB → 161 KB gzip — **nie warto** sam za sobą
- **B** (phosphor + base-ui + floating-ui peer): -138 KB → **~28 KB bundle** — najlepszy tradeoff, **major v2.0.0**
- **C** (B + textarea peer): -140 KB → 26 KB — marginalny gain za dodatkowy friction, **nie warto**

Konsument scenariusza B musi doinstalować `@phosphor-icons/react @base-ui/react @floating-ui/react` — semver peer ranges, README + CHANGELOG.

## Porównanie z initial recommendations

| Initial rec | Status po researchu | Zmiana |
|---|---|---|
| #1 DatePicker rebuild (-80 KB gzip) | -5 do -20 KB gzip realnych | **DOWN** — overestimated. Mantine kosztuje 53 KB ale react-day-picker + date-fns = 35-50 KB |
| #2 Bundle visualizer (prep) | Wykonane (rollup-plugin-visualizer dodany za env flagą) | DONE |
| #3 Animacje Modal/Menu/Select | Bez zmian | NEUTRAL |
| A. Externalize phosphor (peer) | Sam za sobą = 5 KB, nie warto. Tylko jako część scenariusza B | DOWN |
| B. Externalize base-ui + floating-ui (peer) | -120 KB gzip jako część v2.0.0 — **najwyższy zwrot na effort** dla bundle library | **UP** |
| C. Subpath exports / multi-entry | **NUMER 1 dla konsumentów** — 50-70 KB gzip dla typowego użycia | **UP** dramatycznie |
| D. SideEffects fix | Niewystarczające samo z siebie. Wymaga multi-entry | NEUTRAL |
| E. Bump react 18 → 19 w devDeps | Bez wpływu na bundle | LATER |
| F. Snackbar → Toast | Long-term, breaking change | LATER |
| G. Native CSS field-sizing | Drobny zysk (-1.5 KB), browser support audit | LATER |
| H. Dodatkowe komponenty w showcase (IconSwitch) | Nice to have | LATER |
| I. Docker pinning dla CI visual regression | Pilne dla CI stability | NEUTRAL → trzymać na to roadmap |
| J. Field.Root integration | Idiomatic, nie pilne | LATER |
| K. CSS layers audit | Higiena | LATER |

**Nowa rekomendacja która nie była w initial:**

| Nowa rec | Powód |
|---|---|
| **Tooltip → `@base-ui/react/tooltip`** | Eliminuje direct `@floating-ui/react@0.26` + `tabbable`, redukuje Floating UI duplikację. -8 do -15 KB gzip. 1 dzień effort. |

## Re-ranked Top 5 (po researchu)

### 🥇 1. Multi-entry subpath exports — konsumenci -50 do -70 KB gzip

**Co:** zmiana `vite.config.mts` na multi-entry library mode, `package.json.exports` z subpath dla każdego komponentu (`/button`, `/modal`, `/menu`, etc.). Backwards compatible — stary `import { Button } from '@synergycodes/overflow-ui'` nadal działa.

**Kto zyska:** wszyscy konsumenci paczki npm — typowy app używający 5 komponentów spadnie z 105 KB do 40-60 KB gzip JS + z 10 KB do 3-5 KB gzip CSS.

**Effort:** 2-3 dni
- Vite multi-entry config
- `package.json.exports` map
- Sprawdzić `vite-plugin-dts` z multi-entry (potwierdzone że działa)
- `vite-plugin-lib-inject-css` per-entry CSS chunks
- Visual regression bez zmian (testujemy preview, nie konsumenta)
- Dokumentacja: jak wybrać między subpath a barrel import (oba działają)

**Risk:** medium — zmiana konfiguracji buildu, wymaga sprawdzenia że dist/index.d.ts działa dla wszystkich konsumentów.

### 🥈 2. Tooltip → `@base-ui/react/tooltip` — biblioteka -8 do -15 KB gzip

**Co:** rebuild `src/components/tooltip/*.tsx` na `@base-ui/react/tooltip` (`Tooltip.Root`, `Tooltip.Trigger`, `Tooltip.Portal`, `Tooltip.Positioner`, `Tooltip.Popup`). Drop `@floating-ui/react@0.26` z direct deps + `tabbable` — Base UI ma własne wendowane.

**Effort:** 1 dzień
- Tooltip API (`<Tooltip><Tooltip.Trigger>...</Tooltip.Trigger><Tooltip.Content>...</Tooltip.Content></Tooltip>`) zachować
- `useTooltip` hook custom — wyrzucić, użyć Base UI compound
- Public types `TooltipOptions` (placement, open, onOpenChange) — mapować na Base UI

**Risk:** medium — Tooltip jest używany w wielu miejscach (np. `BaseButton` ma `<Tooltip>` wokół). Visual regression złapie regresje.

### 🥉 3. Animacje Modal/Menu/Select polish — UX

**Co:** dodać CSS transitions na `[data-starting-style]` / `[data-ending-style]` w modułach `modal.module.css`, `list-box.module.css`. Visual test ma `animations: 'disabled'` więc snapshoty się nie zmienią.

**Effort:** 1 dzień

**Risk:** low — czysto wizualne.

### 4. DatePicker rebuild → `react-day-picker` + Base UI Popover

**Co:** rebuild DatePicker, drop `@mantine/core` + `@mantine/dates` + transitive `dayjs` + `react-remove-scroll`. Add `react-day-picker@^9` + `date-fns@^4`.

**Saving:** -5 do -20 KB gzip biblioteki. Mniejsze niż liczyłem.

**Effort:** 2-4 dni
- Rebuild calendar w `<Popover>` Base UI
- Mode mapping: `default → single`, `range → range`, `multiple → multiple`
- Format token zmiana: `'DD/MM/YYYY'` (dayjs) → `'dd/MM/yyyy'` (date-fns)
- CSS rewrite — selektory `.mantine-*` → `[data-selected]`/`[data-outside]` (RDP używa data-attrs)
- Visual snapshot date-picker.png trzeba zaktualizować (intentional rebuild)
- Public API trim: `valueFormat`, `inputSize`, `type='multiple'` można usunąć (nikt nie używa)

**Risk:** medium-high — pełny rebuild komponentu. Visual regression wymaga akceptacji że nowy DatePicker wygląda inaczej (akceptowalne).

### 5. Major v2.0.0: Externalization scenariusz B (peer deps)

**Co:** przenieść `@phosphor-icons/react`, `@base-ui/react`, `@floating-ui/react` (jeśli zostanie po Tooltip migration) do `peerDependencies` z szerokimi semver ranges. Major bump.

**Saving:** library bundle 165 → ~28 KB gzip (po wszystkich poprzednich zmianach). 5-6× mniejsza paczka.

**Effort:** 1 dzień + release planning
- vite.config: dodać do `external`
- package.json: `dependencies` → `peerDependencies` + `peerDependenciesMeta`
- README + CHANGELOG: install instructions
- Test linkowania w dummy app (sprawdzić nie ma duplikatów instancji)

**Risk:** higher — major bump, konsumenci muszą doinstalować paczki, version mismatch może powodować runtime issues. Mitigation: szerokie peer ranges, peer optional dla `@types/react`.

## Co konkretnie zrobić następne (decyzja użytkownika)

Trzy realistyczne ścieżki do wyboru:

### Opcja A — Quick wins (2-3 dni, biblioteka 165 → ~145 KB gzip)
1. Tooltip migration (1 dzień)
2. Animacje polish (1 dzień)

Bez DatePicker rebuild, bez subpath exports. Niski effort, mały konkretny zysk.

### Opcja B — User-facing slimming (3-4 dni)
1. **Multi-entry subpath exports** (2-3 dni) — konsumenci 50-70 KB gzip mniej
2. Tooltip migration (1 dzień)

Bez DatePicker rebuild. Najwyższy zwrot dla konsumentów paczki.

### Opcja C — Pełny slimming (5-7 dni, biblioteka 165 → ~120 KB gzip + konsumenci mocno mniej)
1. Multi-entry subpath exports (2-3 dni)
2. Tooltip migration (1 dzień)
3. DatePicker rebuild (2-4 dni)
4. Animacje polish (1 dzień)

### Opcja D — Long-term: pełny slimming + major v2.0.0
Wszystkie z C plus externalization B. Library bundle docelowo ~28 KB gzip.

## Załączniki

- `research-bundle-analysis.md` — pełen breakdown + Floating UI duplication
- `research-datepicker.md` — pełna ocena `react-day-picker` vs alternatywy + realny pomiar Mantine cost
- `research-externalization.md` — scenariusze A/B/C + konwencja React UI libs
- `research-codesplitting.md` — eksperyment minimal consumer + Vite multi-entry config
- `research-current-recommendations.md` — moja initial rekomendacja przed researchem (do porównania)

## Tooling dodany przy okazji researchu

- `rollup-plugin-visualizer` w devDeps
- `pnpm --filter @synergycodes/overflow-ui build:stats` — generuje `dist/bundle-stats.html` (treemap) + `dist/bundle-stats.json`
- Domyślny `pnpm build` nie generuje stats (tylko gdy `BUNDLE_STATS=1`)
