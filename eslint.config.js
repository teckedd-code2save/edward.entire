import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    'dist',
    // Generated shadcn primitives and retired pre-overhaul presentation components.
    // They are kept temporarily for reference but are not imported into the shipped site.
    'src/components/ui/**',
    'src/components/HorizontalSplitText.tsx',
    'src/components/projects/ProjectCard.tsx',
    'src/components/projects/ProjectDetailPanel.tsx',
    'src/components/projects/TerminalCanvas.tsx',
  ]),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
