module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
    extends: [
      'prettier',
      'plugin:@typescript-eslint/recommended',
    ],
    root: true,
    env: {
      node: true,
      jest: true,
    },
    ignorePatterns: ['.eslintrc.js', 'dist/'],
    rules: {
      'prettier/prettier': [
              'error',
              {
                  "endOfLine": "auto"
              },
          ],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/await-thenable': "error",
      '@typescript-eslint/no-misused-promises': "error"
    },
  }
  