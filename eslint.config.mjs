import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginNode from 'eslint-plugin-n';
import tsEslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export const rules = {
  'no-restricted-syntax': [
    'error',
    {
      selector: '[object.name=/\\w*(s|S)tyles/][computed=false]',
      message:
        "Use bracket notation (styles['property']) instead of dot notation (styles.property) for accessing style properties.",
    },
  ],
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_',
    },
  ],
  'node/prefer-node-protocol': 'error',
};

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  tsEslint.configs.recommended,
  globalIgnores(['**/node_modules', '**/.git', '**/dist']),
  {
    name: 'Overflow UI / Root',
    files: ['**/*'],
    languageOptions: {
      globals: globals.browser,
    },
    rules,
    plugins: {
      node: pluginNode,
    },
  },
]);
