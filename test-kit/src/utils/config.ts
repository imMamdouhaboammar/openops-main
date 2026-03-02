import { z } from 'zod';

// Configuration schema
const ConfigSchema = z.object({
  testFramework: z.enum(['vitest', 'jest', 'mocha']).default('vitest'),
  language: z.enum(['typescript', 'javascript']).default('typescript'),
  strictMode: z.boolean().default(true),
  aiModel: z.string().default('claude-3'),
  coverageThreshold: z.number().min(0).max(100).default(80),
  outputDir: z.string().default('.test-kit'),
});

export type Config = z.infer<typeof ConfigSchema>;

export const defaultConfig: Config = {
  testFramework: 'vitest',
  language: 'typescript',
  strictMode: true,
  aiModel: 'claude-3',
  coverageThreshold: 80,
  outputDir: '.test-kit',
};

export function validateConfig(config: unknown): Config {
  return ConfigSchema.parse(config);
}
