import baseEslintConfig from '../../eslint.config.mjs';
import pluginReact from 'eslint-plugin-react';
import pluginHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';

/** @type {import('eslint').Linter.RulesRecord} */
const rules = {
  'react/display-name': 'off',
  'react/prop-types': 'off',
  'react/function-component-definition': [
    'error',
    {
      namedComponents: 'function-declaration',
    },
  ],
};

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  baseEslintConfig,
  {
    ...pluginReact.configs.flat.recommended,
    ...pluginReact.configs.flat['jsx-runtime'],
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    name: 'Overflow UI / UI',
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': pluginHooks,
    },
    rules: {
      ...pluginHooks.configs.recommended.rules,
      ...rules,
    },
  },
]);
