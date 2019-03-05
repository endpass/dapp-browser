const path = require('path');
const ENV = require('./env/test');

module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpe?g|ttf|woff2?)$':
      'jest-transform-stub',
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(vue-timers|@endpass/class))'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['<rootDir>/(tests/unit/**/*.spec.js|**/__tests__/*.js)'],
  globals: {
    ENV,
  },
};
