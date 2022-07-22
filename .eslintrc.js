module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['warn'],
        '@typescript-eslint/no-unused-vars': ['warn'],
        // '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-extra-boolean-cast': 'off',
        'no-spaced-func': 'off',
        'no-inline-comments': 'off',
        'react-native/no-inline-styles': 'off',
        'react-hooks/exhaustive-deps': 'off',
      },
      globals: {
        __DEV__: true,
      },
    },
  ],
};
