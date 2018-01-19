const PACKAGE = require('../../package.json');

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/index.js',
    '**/src/**/*.js'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/config/',
    '<rootDir>/flow-typed/',
    '<rootDir>/src/utils/testing/Invalid.js'
  ],
  coverageDirectory: '<rootDir>/coverage',
  globals: {
    __ENV_DEV__: false,
    __ENV_PROD__: false,
    __ENV_TEST__: true,
    __PACKAGE__: PACKAGE.name,
    __VERSION__: PACKAGE.version
  },
  rootDir: '../..'
};
