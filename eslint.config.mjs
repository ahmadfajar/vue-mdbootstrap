import prettierConfig from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';
import tsEslint from 'typescript-eslint';

export default defineConfig(
  tsEslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ignores: ['node_modules', 'dist', 'scss', '*.md'],
  },
  // {
  //   files: ['*.js'],
  //   extends: [tsEslint.configs.disableTypeChecked],
  // },
  prettierConfig,
);
