const dotenv = require('dotenv');
dotenv.config({ path: '.env.test' });

const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('../tsconfig');

const config = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "..",
  testEnvironment: "node",
  testRegex: ".e2e-spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  collectCoverageFrom: ["<rootDir>/src/**/*.(t|j)s"],
  coverageDirectory: "../coverage",
};

module.exports = config;