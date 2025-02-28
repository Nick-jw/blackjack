import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintPluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    rules: {
      // 'react/jsx-max-props-per-line': ['error', { maximum: 1 }],
      // 'react/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],
      'prettier/prettier': 'error',
      'no-unused-vars': ['error', { varsIgnorePattern: '^React$' }],
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
];
