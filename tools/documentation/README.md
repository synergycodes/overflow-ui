# How to add a Component

1. Run `pnpm doc-add`.
2. Enter the `fileBaseName` of the component.
3. Update the props in `packages/website/docs/components`.

---

# How to check Docusaurus

Run `pnpm run doc` or `pnpm -F website dev`.

---

# How to update comments in Docusaurus

1. Add comments in JSDoc format to the component located in `packages/ui/src/components`.
2. Run `pnpm -F website prepare`.