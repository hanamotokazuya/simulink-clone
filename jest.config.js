const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleNameMapper: {
    "@/src/components/(.*)$": "<rootDir>/src/components/$1",
    "@/src/behavior/(.*)$": "<rootDir>/src/behavior/$1",
    "@/src/block/(.*)$": "<rootDir>/src/block/$1",
    "@/src/context/(.*)$": "<rootDir>/src/context/$1",
    "@/src/diagram/(.*)$": "<rootDir>/src/diagram/$1",
    "@/pages/(.*)$": "<rootDir>/pages/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(customJestConfig);
