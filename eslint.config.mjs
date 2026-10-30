import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist/**', 'gallery-dist/**', 'node_modules/**', 'src/icons/data.ts'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['scripts/**/*.mjs', '*.config.{ts,mjs}'],
    languageOptions: { globals: globals.node }
  },
  {
    files: ['src/**/*.{ts,tsx}', 'gallery/**/*.{ts,tsx}'],
    languageOptions: { globals: globals.browser },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    }
  },
  {
    // The kit runs in any renderer: no node modules, and no app code (i18n stays in the app).
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/**/*.test.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', { patterns: ['node:*', 'fs', 'path', 'electron'] }]
    }
  },
  prettier
)
