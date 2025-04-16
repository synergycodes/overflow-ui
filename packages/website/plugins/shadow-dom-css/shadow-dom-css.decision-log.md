# Shadow DOM for Docusaurus Component Isolation

### Proposed by: Szymon Tondowski

### Date: 15.04.2025

## Context

Docusaurus has a **major** problem with CSS pollution. We can render our components in the documentation to showcase them, but Docusaurus’s styles for `h1`, `p`, `strong`, and `hr` will affect styling of them.

What’s worse, they also apply rules like `li + li`, which are even harder to deal with. We can’t simply revert these styles using `revert: all`, because if you write a rule like `li + li { revert: all }` in Docusaurus, it will also affect the second `<li>` in your component.

The biggest issue for us is that we've chosen to use CSS Layers in our components. This approach allows consumers of our components to easily override any styles, since styles outside of CSS Layers will always take precedence. While this is a good strategy for the end user, it unfortunately makes it even easier for Docusaurus to break our styles with simple global rules like `h2 { ... }`, etc.

An open topic from 2021 with 30 comments discusses this issue (and it's not the only one):
https://github.com/facebook/docusaurus/issues/6032

## Decision

Since Shadow DOM is a commonly suggested solution for separation, the ShadowDOMWrapper was added.

Complete separation of scopes requires the extraction of our components styles (which come from modules.css and have custom prefixes, e.g., .container becomes .container_df21e).

PostCSS was used to copy those styles when they are transformed

### Implemented solution
`packages/website/plugins/shadow-dom-css/postcss.ts` copies styles from our package to a separate file at `packages/website/static/css/shadow-dom-styles.css` (which is gitignored). These styles are then used as styles in ShadowDomWrapper (`packages/website/src/components/component-utils/shadow-dom-wrapper/shadow-dom-wrapper.tsx`).

### Issues
PostCSS doesn't run every time pnpm dev is called (which is good for performance), and we don't have a reliable trigger for it. Adding a proper console.log reminder to run `pnpm clear` before `pnpm dev` or `pnpm build` (which forces a rerun) is a solution at the moment.

### Status

Accepted
