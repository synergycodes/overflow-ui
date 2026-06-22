# CSS layers

Overflow UI emits all of its styles into two ordered cascade layers:

```css
@layer ui.base, ui.component;
```

`ui.base` holds resets and primitives; `ui.component` holds component styles.
Declaring the order once, before any rule from either layer, guarantees that
`ui.component` always wins over `ui.base`, and that unlayered consumer styles
win over both.

## Why every emitted stylesheet repeats the order

The build is multi-entry: each component ships its own stylesheet, and there is
also a combined `index.css` and a global `styles.css`. Only the barrel entry
imports `src/styles/layers.css`, so a consumer who loads a single per-component
stylesheet would otherwise have the **first use** of a layer fix the order. If
a component rule (`ui.component`) is seen before any `ui.base` rule, the browser
locks the order as `[ui.component, ui.base]`, inverting the cascade.

To prevent that, the `combine-css-bundle` Vite plugin prepends the layer-order
declaration to every emitted CSS asset. Re-stating an already-declared order is
a no-op, so prepending it everywhere is safe.
