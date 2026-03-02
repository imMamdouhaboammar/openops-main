import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

interface ScaffoldOptions {
  force?: boolean;
}

interface ScaffoldResult {
  created: string[];
}

export async function scaffold(projectDir: string, options: ScaffoldOptions = {}): Promise<ScaffoldResult> {
  const testKitDir = join(projectDir, '.test-kit');
  const created: string[] = [];

  // Create directories
  const dirs = [
    join(testKitDir, 'meta'),
    join(testKitDir, 'logs'),
    join(testKitDir, 'configs'),
    join(testKitDir, 'templates'),
  ];

  dirs.forEach((dir) => {
    mkdirSync(dir, { recursive: true });
    created.push(dir);
  });

  // Create registry.json
  const registryPath = join(testKitDir, 'registry.json');
  const registry = {
    version: '1.0.0',
    initialized: new Date().toISOString(),
    agents: {
      DetectAgent: { enabled: true, role: 'Stack Detection' },
      TestGenAgent: { enabled: true, role: 'Test Generation' },
      ReviewerAgent: { enabled: true, role: 'Test Review' },
      AuditAgent: { enabled: true, role: 'Coverage Analysis' },
      HealerAgent: { enabled: true, role: 'Self-Healing' },
    },
    config: {
      testFramework: 'vitest',
      language: 'typescript',
      strictMode: true,
    },
  };
  writeFileSync(registryPath, JSON.stringify(registry, null, 2));
  created.push(registryPath);

  // Create task-schema.json
  const schemaPath = join(testKitDir, 'meta', 'task-schema.json');
  const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Test-Kit Task Schema',
    type: 'object',
    properties: {
      id: { type: 'string' },
      type: { enum: ['unit', 'integration', 'e2e', 'ai-eval'] },
      status: { enum: ['pending', 'in-progress', 'completed', 'failed'] },
      description: { type: 'string' },
      createdAt: { type: 'string', format: 'date-time' },
    },
    required: ['id', 'type', 'status'],
  };
  writeFileSync(schemaPath, JSON.stringify(schema, null, 2));
  created.push(schemaPath);

  // Create empty events.json
  const eventsPath = join(testKitDir, 'logs', 'events.json');
  writeFileSync(eventsPath, JSON.stringify([], null, 2));
  created.push(eventsPath);

  return { created };
}
