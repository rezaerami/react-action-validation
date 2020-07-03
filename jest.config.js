module.exports = {
  haste: {
    hasteImplModulePath: null,
  },
  cacheDirectory: '.jest-cache',
  coverageDirectory: '.jest-coverage',
  moduleFileExtensions: ['js'],
  collectCoverageFrom: [
    './src/**/*.js',
  ],
  rootDir: process.cwd(),
  roots: ['<rootDir>'],
  transform: { '.js$': ['babel-jest', { rootMode: 'upward' }] },
  coverageReporters: ['json', 'lcov', 'clover', 'html', 'text'],
  coverageThreshold: {
    global: {
      branches: 35,
      functions: 35,
      lines: 35,
      statements: 35,
    },
  },
};
