const nextPlugin = require('@next/eslint-plugin-next');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['node_modules/', '.next/', 'out/'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@next/next': nextPlugin,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      // Suppress warnings for now to focus on functionality
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@next/next/no-img-element': 'off',
    },
  },
];