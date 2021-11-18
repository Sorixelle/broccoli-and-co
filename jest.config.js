/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testEnvironment: "jsdom",

  clearMocks: true,
  rootDir: "src/test/",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
};
