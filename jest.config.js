const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverageFrom: [
    "./src/**/*.{ts,tsx,js,jsx}",
    "!**/node_modules/**",
    "!**/build/**",
  ],
  coverageProvider: "v8",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>"
  }),
  preset: 'ts-jest',
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*.spec.ts"
  ],
  testPathIgnorePatterns: [
    "node_modules",
    "build",
    "dist",
  ],
  verbose: true,
  setupFilesAfterEnv: ["./jest.setup.ts"]
};
