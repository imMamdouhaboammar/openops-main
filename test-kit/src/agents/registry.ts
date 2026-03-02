// Agent registry and interfaces

export interface Agent {
  id: string;
  name: string;
  role: string;
  enabled: boolean;
  capabilities: string[];
}

export const AGENT_REGISTRY: Record<string, Agent> = {
  DetectAgent: {
    id: 'detect-agent',
    name: 'Stack Detector',
    role: 'Analyzes project structure and detects tech stack',
    enabled: true,
    capabilities: ['detect-framework', 'detect-test-runner', 'detect-language'],
  },
  TestGenAgent: {
    id: 'testgen-agent',
    name: 'Test Generator',
    role: 'Generates test files based on project analysis',
    enabled: true,
    capabilities: ['generate-unit-tests', 'generate-integration-tests', 'generate-e2e-tests'],
  },
  ReviewerAgent: {
    id: 'reviewer-agent',
    name: 'Code Reviewer',
    role: 'Reviews generated tests for quality and coverage',
    enabled: true,
    capabilities: ['review-code', 'suggest-improvements', 'validate-syntax'],
  },
  AuditAgent: {
    id: 'audit-agent',
    name: 'Coverage Auditor',
    role: 'Analyzes and reports on test coverage',
    enabled: true,
    capabilities: ['analyze-coverage', 'generate-report', 'suggest-gaps'],
  },
  HealerAgent: {
    id: 'healer-agent',
    name: 'Self-Healing',
    role: 'Automatically fixes failing tests',
    enabled: true,
    capabilities: ['identify-failures', 'suggest-fixes', 'apply-patches'],
  },
};
