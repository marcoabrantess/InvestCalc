// jest.config.ts
import { createDefaultPreset } from 'ts-jest';
import type { Config } from 'jest';

const tsJestTransformCfg = createDefaultPreset().transform;

const config: Config = {
    testEnvironment: 'node',
    transform: {
        ...tsJestTransformCfg,
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    testMatch: ['**/tests/**/*.test.ts', '**/tests/**/*.spec.ts'],
    verbose: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
};

export default config;
