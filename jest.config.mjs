/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: [
    "json",
    "text",
    "lcov",
    "clover"
  ],
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/index.js"
  ],
  coverageThreshold: {
    global: {
      branch: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    }
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  maxWorkers: "50%",
  testEnvironment: "node",
  watchPathIgnorePatterns: ["node_modules"],
  testPathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: ["node_modules"]
}
