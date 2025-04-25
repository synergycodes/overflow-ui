# How to add a Component

1. Run `pnpm website doc-add`.
2. Enter the `file-base-name` of the component.
3. Update the props in `packages/website/docs/components/file-base-name`.

---

# How to check Docusaurus

Run `pnpm run doc` or `pnpm website dev`.

---

# How to update comments in Docusaurus

1. Add comments in JSDoc format to the component located in `packages/ui/src/components`.
2. Run `pnpm -F website prepare`.

# The component doesn't render properly in the preview

## Problems with JSX render

### Did you import any custom libraries?
If yes, you need to make sure that they are available for the Docusaurus processor `packages/website/src/theme/ReactLiveScope/index.tsx`. You can add a lib there to make it work.

### Did you use `export` more than once?
Use `export` only **once** in the example snippet. The Docusaurus playground doesn’t support multiple exports. We use `export` keyword to suppress lint error about unused components and to mark the end of the imports list, which is also not supported by Docusaurus and would cause an error if passed further.

This issue occurs in `packages/website/src/components/component-utils/code-playground/code-playground.tsx`.

## Problem with styles

### Did you updated styles in `packages/ui`?

1. Run `pnpm ui dev` (refreshes build styles)
2. Run `pnpm website clear` (removes cached styles in documentation)
3. Run `pnpm website dev` (renders documentation with updated style)

### Did you import any custom libraries?

1. Go to `packages/website/plugins/shadow-dom-css/postcss.ts`
2. Find `ShadowDomCSS({ filesToExtractPatterns: ['axiom/packages/ui'] }),`
3. You can add that new library pattern in `filesToExtractPatterns`.

But be aware that Axiom might need to expose those styles as part of its own build, rather than requiring the end user to add an additional path (installing additional package next to axiom).

### Are the styles still broken?

#### How to check if Shadow DOM styles are the problem?

1. Go to `packages/website/src/components/component-utils/shadow-dom-wrapper/shadow-dom-wrapper.tsx`
2. Add `return children` above `return (<div ref={hostRef}>`

Now all examples will be rendered without Shadow DOM. If the styles are still broken, it means they’re missing somewhere. If some classes start working as intended, it means the Shadow DOM styles were removing too much.

#### How to find the patter of missing styles in postcss?

1. Go to `packages/website/plugins/shadow-dom-css/postcss.ts`
2. Add `console.log(inputFile)`
3. Run `pnpm website clear` (removes cached styles in documentation)
4. Run `pnpm website dev` (renders documentation with updated style)

You will see all processed paths, you need to pick one missing and add it to `filesToExtractPatterns` at the bottom.