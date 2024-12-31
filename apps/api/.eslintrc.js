/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: ['plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'import/extensions': ['error', 'ignorePackages', { ts: 'always' }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
};
