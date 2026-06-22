# Changelog

All notable changes to `@synergycodes/overflow-ui` are documented in this file.

## 2.0.0-beta.0

This release rebuilds the library on [Base UI](https://base-ui.com/) and removes
the previous MUI / Mantine / Emotion / Floating UI stack. It contains breaking
changes; read the sections below before upgrading from `1.x`.

### Breaking changes

#### Dependencies

- Removed `@mui/material`, `@mui/base`, `@mantine/core`, `@mantine/dates`,
  `@emotion/*`, and `@floating-ui/react`.
- `@base-ui/react` (`^1.4.0`) is now a **peer dependency** - consumers must
  install it alongside this package.
- `DatePicker` is rebuilt on `react-day-picker` + `date-fns`; `TextArea` on
  `react-textarea-autosize`. `date-fns`, `react-day-picker`, and `clsx` are
  bundled into the package output.

#### Packaging

- The build moved from a single bundle to a **multi-entry build** with a
  per-component subpath export: `@synergycodes/overflow-ui/<component>` (e.g.
  `@synergycodes/overflow-ui/date-picker`).
- Importing from the package root still injects all required styles. Importing
  per-component entries injects only that component's CSS, so add
  `@synergycodes/overflow-ui/styles.css` once for the global layer order,
  reset, and typography.
- The old `overflow-ui.js` bundle filename is retained as a compatibility shim
  that re-exports the new `index.js` entry, so hard-coded paths keep resolving.

#### Component API

- **DatePicker**: the prop surface no longer forwards the full Mantine prop set.
  It now accepts a curated list: `value`, `defaultValue`, `type`,
  `valueFormat`, `placeholder`, `error`, `size`, `disabled`, `minDate`,
  `maxDate`, `onChange`, `id`, `className`, `aria-label`, `aria-labelledby`.
  - `valueFormat` uses `date-fns` tokens (e.g. `dd/MM/yyyy`). The legacy
    `DD/MM/YYYY` (dayjs) default is accepted and converted for compatibility.
  - In `range` mode, `onChange` fires `null` while a range is mid-selection and
    emits the completed `[from, to]` tuple once both ends are picked.
- **Menu**: `onOpenChange` signature is now `(open: boolean, event?: Event)`.
  The MUI `slotProps` / passthrough surface is no longer available.
- **Select**: `onChange` signature is `(event, value)` - the event is the first
  argument, the selected value the second.
- **Switch**: `onChange` is `(checked: boolean, event: Event)`. The second
  argument is the native DOM event (previously typed as a React
  `ChangeEvent<HTMLInputElement>`, which never matched the value passed at
  runtime).
- Transitions moved to the popup element, where Base UI sets
  `data-starting-style` / `data-ending-style`.

### Added

- `@synergycodes/overflow-ui/styles.css` - standalone global stylesheet (layer
  order, reset, typography) for per-component / subpath consumers.
- `Input` gains a typed `error` prop wired to the error state.
- `Snackbar` exposes proper `role="status"` / `aria-live` semantics.
