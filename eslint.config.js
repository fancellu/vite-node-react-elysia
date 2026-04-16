import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'frontend/dist', 'node_modules'] },
  // 1. Base JS & TS Configs for all files
  js.configs.recommended,
  ...tseslint.configs.recommended,
  
  // 2. Frontend Config (React + Browser)
  {
    files: ['frontend/src/**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },

  // 3. Backend Config (Node)
  {
    files: ['backend/src/**/*.ts', 'vite.config.ts'],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.node,
    },
  }
)
