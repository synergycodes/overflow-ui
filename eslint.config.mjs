import globals from 'globals';
import pluginJs from '@eslint/js';
import tsEslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{ts}'] },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  { ignores: ['**/node_modules/', '.git/', '**/dist/'] },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  ...tsEslint.configs.recommended,
];
