module.exports = {
  env: {
    es2021: true,
    node: true,
    commonjs: false,
    jest: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint', 'plugin:import/typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        printWidth: 140,
        singleQuote: true,
        tabWidth: 2,
        useTabs: true,
        semi: true,
        quoteProps: 'consistent',
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'always',
        endOfLine: 'lf',
      },
    ],
  },
};
