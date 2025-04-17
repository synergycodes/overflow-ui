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