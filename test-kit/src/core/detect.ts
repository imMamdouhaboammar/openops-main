import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

interface StackDetection {
  framework?: string;
  testRunner?: string;
  language: string;
  packageManager: string;
  hasTypeScript: boolean;
  hasReact: boolean;
  hasVue: boolean;
  hasSvelte: boolean;
  hasNextjs: boolean;
}

export async function detectStack(projectDir: string): Promise<StackDetection> {
  const packageJsonPath = join(projectDir, 'package.json');

  if (!existsSync(packageJsonPath)) {
    throw new Error('package.json not found in project directory');
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  const deps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  const detection: StackDetection = {
    language: 'JavaScript',
    packageManager: packageJson.packageManager || 'npm',
    hasTypeScript: !!deps.typescript,
    hasReact: !!deps.react,
    hasVue: !!deps.vue,
    hasSvelte: !!deps.svelte,
    hasNextjs: !!deps.next,
  };

  // Detect framework
  if (detection.hasNextjs) {
    detection.framework = 'Next.js';
    detection.language = 'TypeScript';
  } else if (detection.hasReact) {
    detection.framework = 'React';
  } else if (detection.hasVue) {
    detection.framework = 'Vue';
  } else if (detection.hasSvelte) {
    detection.framework = 'Svelte';
  }

  // Detect test runner
  if (deps.vitest) {
    detection.testRunner = 'Vitest';
  } else if (deps.jest) {
    detection.testRunner = 'Jest';
  } else if (deps.mocha) {
    detection.testRunner = 'Mocha';
  } else if (deps.playwright) {
    detection.testRunner = 'Playwright';
  } else if (deps.cypress) {
    detection.testRunner = 'Cypress';
  }

  if (detection.hasTypeScript) {
    detection.language = 'TypeScript';
  }

  return detection;
}
