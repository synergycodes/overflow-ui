# CSS Layers

Proposed by: **Jan Librowski**

Date: **07.01.2025**

## Context

Passing CSS classes to React components is a common approach to overriding styles. However it doesn't allow for a clear and simple control over specificity of the class declarations. On top of that the specificity may be indeterministic as it depends on the order of the class declarations in the .css files created by a bundler. Adding or changing imports in files has already affected the specificity of component classes leading to broken UI styling.

## Decision

To fix broken specificity and allow for simple customization of WB UI components library we've decided to implement CSS Layers in our codebase. Thanks to their declarative nature and explicitness the specificity issues shouldn't appear or require hacks artificially changing selectors specificity or using `!important` directive.

_WB CSS layers setup_ (lowest to highest priority):

- `reset` - the most basic layer containing global styles
- `ui` - a layer used by internal WB components, containing 2 sub-layers:
  - `base` - for creating base components meant to be used as building blocks of proper implementations (i.e. `<BaseButton />`)
  - `component` - for component implementations (i.e. `<IconButton />`)
- styles not using any layer, i.e. WB customizations for clients

## Consequences

- **Maintainability**: Specificity of internal CSS modules is explicit and is not affected by changes in imports.
- **Customizability**: Styles with no layer specified (i.e. WB customizations) will by default override internal styles.

## Status

Accepted
