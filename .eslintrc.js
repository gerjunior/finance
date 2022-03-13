module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: ['airbnb-base', 'prettier', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],
	plugins: ['@typescript-eslint'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
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
