module.exports = {
  extends: [
    'airbnb',
    'plugin:react-native/all',
  ],
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  plugins: [
    'import',
    'react',
    'react-native',
    'jsx-a11y',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
};