import { generateScenariosWithAI, Scenario } from '../ai';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

/**
 * Scenario Planner - Generates comprehensive test scenarios
 * Acts as the "QA Architect" that imagines what to test
 */
export async function generateScenarios(
  codebaseMap: any,
  enableAI = false
): Promise<Scenario[]> {
  console.log('🧠 Scenario Planner: Analyzing codebase...');

  const scenarios = await generateScenariosWithAI(codebaseMap, enableAI);

  // Save scenarios to file
  const scenariosDir = join(process.cwd(), '.test-kit', 'scenarios');
  mkdirSync(scenariosDir, { recursive: true });

  writeFileSync(
    join(scenariosDir, 'ai-scenarios.json'),
    JSON.stringify(scenarios, null, 2)
  );

  console.log(`✅ Generated ${scenarios.length} test scenarios`);
  return scenarios;
}
