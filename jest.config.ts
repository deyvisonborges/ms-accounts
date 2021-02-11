export default {
  clearMocks: true,
  collectCoverage: true,
  // collectCoverageFrom: ["./__tests__/**/*.spec.ts"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: ["text-summary", "lcov"],
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*spec.ts"],
  verbose: true,
};
