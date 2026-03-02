import { analyzeCodebase } from './analyzers/codeStructureAnalyzer';
import { generateScenarios } from './generators/scenarioPlanner';
import { composeUserJourneys } from './generators/userJourneyComposer';
import { renderScenarioTree } from './visualizers/scenarioTreeRenderer';
import { renderCoverageMap } from './visualizers/coverageMapRenderer';

/**
 * AI Scenario Designer - Main Orchestrator
 * The "brain" that plans comprehensive testing strategies
 */
export async function runScenarioDesigner(enableAI = false): Promise<void> {
  console.log('\n🧠 [Test-Kit AI] Initializing Scenario Designer...\n');

  try {
    // Phase 1: Analyze codebase
    console.log('📊 Phase 1: Codebase Analysis');
    const codebaseMap = await analyzeCodebase();
    console.log(`   ✓ Analyzed ${codebaseMap.totalFiles} files`);
    console.log(`   ✓ Detected frameworks: ${codebaseMap.frameworks.join(', ') || 'None'}\n`);

    // Phase 2: Generate scenarios
    console.log('🎯 Phase 2: Scenario Generation');
    const scenarios = await generateScenarios(codebaseMap, enableAI);
    console.log(`   ✓ Generated ${scenarios.length} test scenarios\n`);

    // Phase 3: Compose user journeys
    console.log('📖 Phase 3: User Journey Composition');
    const journeyFiles = await composeUserJourneys(scenarios);
    console.log(`   ✓ Created ${journeyFiles.length} journey files\n`);

    // Phase 4: Visualize scenarios
    console.log('🎨 Phase 4: Scenario Visualization');
    await renderScenarioTree(scenarios);
    console.log('   ✓ Rendered scenario tree diagram');

    await renderCoverageMap(scenarios);
    console.log('   ✓ Rendered coverage heatmap\n');

    console.log('✅ Scenario Designer completed successfully!');
    console.log('\n📋 Next Steps:');
    console.log('   1. Review scenarios: .test-kit/scenarios/ai-scenarios.json');
    console.log('   2. Check journey files: .test-kit/scenarios/journeys/');
    console.log('   3. View scenario map: .test-kit/reports/scenario-map.md');
    console.log('   4. Open heatmap: .test-kit/reports/coverage-heatmap.html\n');
  } catch (error) {
    console.error('❌ Scenario Designer failed:', error);
    process.exit(1);
  }
}
