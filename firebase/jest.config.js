/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  // Rules tests use the emulator; run serially to share the seeded state cleanly.
  maxWorkers: 1,
  testTimeout: 30000,
};
