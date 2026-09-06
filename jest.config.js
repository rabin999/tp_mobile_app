module.exports = {
  preset: '@react-native/jest-preset',
  forceExit: true,
  testTimeout: 20000,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/svgMock.tsx',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-svg|react-native-safe-area-context|@react-native-community/datetimepicker)/)',
  ],
};
