import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

interface GenerateOptions {
  type?: string;
}

interface GenerateResult {
  files: string[];
}

const exampleUnitTest = `import { describe, it, expect } from 'vitest';

describe('Example Unit Test', () => {
  it('should pass a simple assertion', () => {
    const result = 1 + 1;
    expect(result).toBe(2);
  });

  it('should test string operations', () => {
    const text = 'Hello, Test-Kit!';
    expect(text).toContain('Test-Kit');
  });

  it('should handle arrays', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(arr).toHaveLength(5);
    expect(arr).toContain(3);
  });
});
`;

const exampleIntegrationTest = `import { describe, it, expect, beforeEach } from 'vitest';

describe('Example Integration Test', () => {
  let testState: any;

  beforeEach(() => {
    testState = { initialized: true };
  });

  it('should integrate multiple components', () => {
    expect(testState.initialized).toBe(true);
  });

  it('should handle async operations', async () => {
    const promise = Promise.resolve('async result');
    const result = await promise;
    expect(result).toBe('async result');
  });
});
`;

export async function generateTests(projectDir: string, options: GenerateOptions = {}): Promise<GenerateResult> {
  const testDir = join(projectDir, '__tests__');
  mkdirSync(testDir, { recursive: true });

  const files: string[] = [];
  const type = options.type || 'all';

  if (type === 'unit' || type === 'all') {
    const unitTestPath = join(testDir, 'example.unit.test.ts');
    writeFileSync(unitTestPath, exampleUnitTest);
    files.push(unitTestPath);
  }

  if (type === 'integration' || type === 'all') {
    const integrationTestPath = join(testDir, 'example.integration.test.ts');
    writeFileSync(integrationTestPath, exampleIntegrationTest);
    files.push(integrationTestPath);
  }

  if (type === 'e2e' || type === 'all') {
    const e2eTestPath = join(testDir, 'example.e2e.test.ts');
    const e2eContent = `import { describe, it, expect } from 'vitest';

describe('Example E2E Test', () => {
  it('should perform end-to-end workflow', () => {
    // Placeholder for E2E test
    expect(true).toBe(true);
  });
});
`;
    writeFileSync(e2eTestPath, e2eContent);
    files.push(e2eTestPath);
  }

  return { files };
}
