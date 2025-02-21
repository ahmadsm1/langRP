import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // The path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const config: Config = {
  clearMocks: true,
  // collectCoverage: true,
  // coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  transform: {
    // Use babel-jest to transform JavaScript/TypeScript files, including ESM modules
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
};

// createJestConfig is exported this way to ensure that next/jest can load the async Next.js config
module.exports = async () => ({
  ...(await createJestConfig(config)()),
  transformIgnorePatterns: [
    'node_modules/(?!(lucide-react)/)'
  ]
})