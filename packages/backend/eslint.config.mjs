import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['build/**', 'coverage/**', 'jest.config.js'] },
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
);
