module.exports = {
  testMatch: ['**/+(*.)+(spec|test).[tj]s?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'babel-jest',
    '^.+\\.(css|scss|sass|less|styl)$': 'jest-transform-stub',
    '^.+\\.html$': 'jest-transform-stub',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  collectCoverage: true,
  coverageReporters: ['html'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  moduleNameMapper: {
    '^lodash-es$': 'lodash', //! Fix ERROR "export { default as add } from './add.js';^^^^^^SyntaxError: Unexpected token export".
    '^sweetalert2$': '<rootDir>/src/test-utils/sweetalert2-mock.js'
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!@angular|rxjs|ngx-spinner|ngx-owl-carousel-o|@fortawesome|@ngrx|ng-circle-progress|ng2-charts|ngx-moment|lodash-es)'
  ],
  preset: 'jest-preset-angular',
  extensionsToTreatAsEsm: ['.ts'],
};
