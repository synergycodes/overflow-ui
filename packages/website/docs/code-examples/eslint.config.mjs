import uiConfig from '../../../ui/eslint.config.mjs';
import { defineConfig } from 'eslint/config';

const IMPORT_WARNING = `Don't use imports in example files.
Include what you need in ReactLiveScope and code-examples.d.ts`;

const rules = {
  '@typescript-eslint/no-unused-vars': 'off',
  'no-restricted-syntax': [
    'error',
    {
      selector: 'ImportDeclaration',
      message: IMPORT_WARNING,
    },
    {
      selector: "CallExpression[callee.name='require']",
      message: IMPORT_WARNING,
    },
    {
      selector: 'ImportExpression',
      message: IMPORT_WARNING,
    },
  ],
};

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  uiConfig,
  {
    name: 'Overflow UI / Website / Code Examples',
    files: ['./*.{ts,tsx}'],
    rules,
  },
]);
