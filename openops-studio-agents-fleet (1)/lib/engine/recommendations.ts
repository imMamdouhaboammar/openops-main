
import { AgentProduct, AgentCategory, CartItem } from '../../types';
import { agents as fullCatalog } from '../../data';
import { Recommendation, BonusItem } from './types';
import { getEffectiveFleet, getNormalizedId } from './utils';

export const calculateBonuses = (items: CartItem[]): BonusItem[] => {
  const effectiveItems = getEffectiveFleet(items);
  const bonuses: BonusItem[] = [];
  if (items.length === 0) return bonuses;

  const hasEngineering = effectiveItems.some(i => i.category === AgentCategory.ENGINEERING);
  const hasOps = effectiveItems.some(i => i.category === AgentCategory.OPERATIONS);
  const hasStrategic = effectiveItems.some(i => i.category === AgentCategory.STRATEGIC);
  const uniquePlatforms = new Set(effectiveItems.flatMap(i => i.compatiblePlatforms));

  // Bonus 1: CI/CD Pipeline (Infrastructure)
  if (hasEngineering) {
    bonuses.push({
      id: 'ci-cd',
      name: 'OpenOps CI/CD Pipeline',
      type: 'infrastructure',
      description: 'Automated GitHub Actions workflow for agent testing & deployment.',
      iconName: 'Workflow',
      value: '$49 Value'
    });
  }

  // Bonus 2: Governance Handbook (Governance)
  if (hasStrategic) {
    bonuses.push({
      id: 'gov-handbook',
      name: 'AI Governance Handbook',
      type: 'governance',
      description: 'Standard operating procedures for human-agent collaboration.',
      iconName: 'Scroll',
      value: '$99 Value'
    });
  }

  // Bonus 3: Universal Adapter (Infrastructure)
  if (uniquePlatforms.size > 1) {
    bonuses.push({
      id: 'uni-adapter',
      name: 'Universal Deployment CLI',
      type: 'infrastructure',
      description: 'Unified CLI tool to deploy to Gemini, Claude, and ChatGPT simultaneously.',
      iconName: 'Box',
      value: '$149 Value'
    });
  }
  
  // Bonus 4: Compliance Checker (Testing)
  if (hasOps) {
     bonuses.push({
      id: 'compliance-script',
      name: 'Auto-Compliance Script',
      type: 'testing',
      description: 'Python script to validate agent outputs against safety guidelines.',
      iconName: 'ShieldCheck',
      value: '$79 Value'
    });
  }

  return bonuses;
};

export const getSmartRecommendations = (rawAgents: AgentProduct[]): Recommendation[] => {
  const recommendations: Recommendation[] = [];
  
  // FIX: Use Effective Fleet to determine what user OWNS (inside bundles)
  const effectiveAgents = getEffectiveFleet(rawAgents);
  const effectiveIds = new Set(effectiveAgents.map(a => getNormalizedId(a)));
  
  const hasStrategic = effectiveAgents.some(a => a.category === AgentCategory.STRATEGIC);
  const hasEngineering = effectiveAgents.some(a => a.category === AgentCategory.ENGINEERING);
  const hasCreative = effectiveAgents.some(a => a.category === AgentCategory.CREATIVE);
  const hasOps = effectiveAgents.some(a => a.category === AgentCategory.OPERATIONS);
  
  // --- FLEET COMPLETION ENGINE (Org Chart Logic) ---

  // 1. CEO -> Needs Execution (CTO/Engineers)
  if (hasStrategic && !hasEngineering) {
    const engineer = fullCatalog.find(a => a.id === 'eng-1'); // Architectural Integrity
    if (engineer && !effectiveIds.has(getNormalizedId(engineer))) {
      recommendations.push({
        agent: engineer,
        reason: "Your CEO needs a team",
        impact: `Strategic agents define the 'What', but you lack the 'How'. Add ${engineer.name} to execute the CEO's plans.`,
        type: 'org-chart'
      });
    }
  }

  // 2. Execution -> Needs Strategy (CEO)
  if ((hasEngineering || hasCreative) && !hasStrategic) {
    const ceo = fullCatalog.find(a => a.id === 'strat-1'); // CEO Advisor
    if (ceo && !effectiveIds.has(getNormalizedId(ceo))) {
      recommendations.push({
        agent: ceo,
        reason: "Your Fleet is Headless",
        impact: `You have workers but no leader. Add ${ceo.name} to orchestrate tasks and set direction.`,
        type: 'org-chart'
      });
    }
  }

  // 3. Execution -> Needs Ops (QA/Compliance)
  if (hasEngineering && !hasOps) {
    const ops = fullCatalog.find(a => a.id === 'ops-1'); // Accessibility/Compliance
    if (ops && !effectiveIds.has(getNormalizedId(ops))) {
      recommendations.push({
        agent: ops,
        reason: "Unmonitored Output Risk",
        impact: `Your engineers are shipping code without QA. Add ${ops.name} to catch issues before deployment.`,
        type: 'org-chart'
      });
    }
  }

  // --- GAP FILL LOGIC (Secondary) ---

  // LOGIC 3: The "Unchecked Copy" Scenario (Creative without Compliance)
  if (hasCreative && !hasOps) {
    const legal = fullCatalog.find(a => a.id === 'ops-3'); // Legal/Compliance
    if (legal && !effectiveIds.has(getNormalizedId(legal))) {
      recommendations.push({
        agent: legal,
        reason: "Legal Liability Gap",
        impact: "Scans generated creative content for potential legal or copyright risks.",
        type: 'gap-fill'
      });
    }
  }

  // LOGIC 4: The "Deployment" Scenario (Product but no Docs)
  const hasProductManager = effectiveAgents.some(a => a.id === 'strat-2');
  if (hasProductManager) {
    const docAgent = fullCatalog.find(a => a.id === 'ops-2'); // Doc Custodian
    if (docAgent && !effectiveIds.has(getNormalizedId(docAgent))) {
      recommendations.push({
        agent: docAgent,
        reason: "Documentation Gap",
        impact: "Automatically converts PRDs into maintained documentation.",
        type: 'gap-fill'
      });
    }
  }

  // Prioritize Org Chart recommendations
  return recommendations.sort((a, b) => (a.type === 'org-chart' ? -1 : 1)).slice(0, 1);
};
