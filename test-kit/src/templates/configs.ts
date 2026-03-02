export const vitestConfigTemplate = `import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
      ],
    },
  },
});
`;

export const jestConfigTemplate = `module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
  ],
};
`;

export const playwrightConfigTemplate = `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
`;

export const exampleVitestTest = `import { describe, it, expect } from 'vitest';

describe('Example Vitest Suite', () => {
  it('should perform basic math', () => {
    expect(2 + 2).toBe(4);
  });

  it('should handle strings', () => {
    const text = 'Hello, Test-Kit!';
    expect(text).toContain('Test-Kit');
    expect(text.length).toBe(16);
  });

  it('should work with arrays', () => {
    const items = [1, 2, 3, 4, 5];
    expect(items).toHaveLength(5);
    expect(items.filter(x => x > 2)).toEqual([3, 4, 5]);
  });

  it('should handle async operations', async () => {
    const result = await Promise.resolve('async works');
    expect(result).toBe('async works');
  });
});
`;
