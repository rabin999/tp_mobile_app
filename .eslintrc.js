module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    // Theme tokens are resolved at render time; StyleSheet cannot hold them.
    'react-native/no-inline-styles': 'off',
  },
};
