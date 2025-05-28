import { defineConfig, globalIgnores } from 'eslint/config';
import uiEslintConfig from '../ui/eslint.config.mjs';

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  uiEslintConfig,
  globalIgnores(['build', '.docusaurus']),
  { ignores: ['docs/code-examples'] },
]);
