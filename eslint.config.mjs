import globals from "globals";
import pluginJs from "@eslint/js";
import tsEslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";

/** @type {import('eslint').Linter.RulesRecord} */
const rules = {
  "import/no-unresolved": ["off"],
};

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{ts}"] },
  { languageOptions: { globals: globals.browser } },
  { ignores: ["**/node_modules/", ".git/", "**/dist/"] },
  pluginJs.configs.recommended,
  importPlugin.flatConfigs.recommended,
  eslintConfigPrettier,
  ...tsEslint.configs.recommended,
  rules,
];
