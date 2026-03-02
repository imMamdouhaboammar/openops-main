import { Scenario } from '../ai';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

/**
 * User Journey Composer - Converts scenarios to user journey documentation
 * Creates BDD-style journey files (Given/When/Then)
 */
export async function composeUserJourneys(scenarios: Scenario[]): Promise<string[]> {
  console.log('✨ Composing user journeys...');

  const journeyFiles: string[] = [];
  const journeyDir = join(process.cwd(), '.test-kit', 'scenarios', 'journeys');
  mkdirSync(journeyDir, { recursive: true });

  for (const scenario of scenarios) {
    const markdown = createJourneyMarkdown(scenario);
    const filePath = join(journeyDir, `${scenario.id}-${scenario.title.replace(/\s+/g, '-').toLowerCase()}.md`);

    writeFileSync(filePath, markdown);
    journeyFiles.push(filePath);
  }

  console.log(`📖 Generated ${journeyFiles.length} journey files`);
  return journeyFiles;
}

function createJourneyMarkdown(scenario: Scenario): string {
  return `# ${scenario.id} - ${scenario.title}

**Type:** ${scenario.testType}  
**Priority:** ${scenario.priority}  
**Confidence:** ${(scenario.confidence * 100).toFixed(0)}%

## Related Files
${scenario.relatedFiles.map((f) => `- \`${f}\``).join('\n')}

## Journey Steps (BDD Format)

### Scenario: ${scenario.title}

\`\`\`gherkin
${scenario.steps.join('\n')}
\`\`\`

## Implementation Notes
- Test Type: ${scenario.testType}
- Should validate all related files above
- Ensure error handling is tested
- Add assertions for state changes

## Status
- [ ] Test implementation started
- [ ] Test implementation complete
- [ ] Review passed
- [ ] Merged to main
`;
}
