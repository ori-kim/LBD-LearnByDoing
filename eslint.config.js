import { ESLint } from 'eslint';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import noRelativeImportPathsPlugin from 'eslint-plugin-no-relative-import-paths';

/** @type {ESLint.FlatConfig[]} */
const config = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin,
      'no-relative-import-paths': noRelativeImportPathsPlugin,
    },
    rules: {
      'no-relative-import-paths/no-relative-import-paths': [
        'warn',
        { allowSameFolder: true, rootDir: 'src', prefix: '@' },
      ],
      'prefer-destructuring': [
        'warn',
        {
          VariableDeclarator: {
            array: false,
            object: true,
          },
          AssignmentExpression: {
            array: false,
            object: true,
          },
        },
      ],
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },  // 변수명은 camelCase, PascalCase, UPPER_CASE 형식 중 하나여야 함
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'], 
        }, // 함수명은 camelCase, PascalCase 형식 중 하나여야 함
        {
          selector: 'typeLike',
          format: ['PascalCase'], 
        }, // 타입명은 PascalCase 형식이어야 함
        {
          selector: 'interface',
          format: ['PascalCase'], 
          custom: {
            regex: '^I[A-Z]',
            match: false, 
          },
        }, // 인터페이스명은 PascalCase이고 I로 시작하면 안됨
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          custom: {
            regex: '^T[A-Z]',
            match: false,
          },
        }, // 타입 별칭명은 PascalCase이고 T로 시작하면 안됨
        {
          selector: 'typeParameter',
          format: ['PascalCase'],
          custom: {
            regex: '^T[A-Z]',
            match: false,
          },
        }, // 타입 매개변수명은 PascalCase이고 T로 시작하면 안됨
      ],
      'prettier/prettier': 'error', // Prettier 규칙을 ESLint에서 에러로 표시
    },
  },
];

export default config;
