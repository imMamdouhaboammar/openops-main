import { detectStack } from './detect';
import { scaffold } from './scaffold';
import { generateTests } from './generate';
import { auditTests } from './audit';
import { healTests } from './heal';

interface LoopOptions {
  iterations?: number;
}

interface LoopResult {
  iterationsCompleted: number;
  testCount: number;
  coverageImprovement: number;
}

export async function runLoop(projectDir: string, options: LoopOptions = {}): Promise<LoopResult> {
  const iterations = options.iterations || 1;
  let testCount = 0;
  let coverageStart = 0;

  for (let i = 0; i < iterations; i++) {
    // Step 1: Detect
    await detectStack(projectDir);

    // Step 2: Scaffold
    const scaffoldResult = await scaffold(projectDir);
    testCount += scaffoldResult.created.length;

    // Step 3: Generate
    const generateResult = await generateTests(projectDir);
    testCount += generateResult.files.length;

    // Step 4: Audit
    const auditResult = await auditTests(projectDir);
    if (i === 0) {
      coverageStart = auditResult.coverage.overall;
    }

    // Step 5: Heal (if needed)
    await healTests(projectDir);
  }

  const auditFinal = await auditTests(projectDir);
  const coverageImprovement = auditFinal.coverage.overall - coverageStart;

  return {
    iterationsCompleted: iterations,
    testCount,
    coverageImprovement: Math.max(0, coverageImprovement),
  };
}
