
import { AgentProduct, AgentCategory, CartItem } from '../../types';
import { FleetAnalysis, FleetIssue, CheckoutIntelligence } from './types';
import { getEffectiveFleet } from './utils';

export const analyzeFleet = (rawAgents: AgentProduct[]): FleetAnalysis => {
  if (rawAgents.length === 0) {
    return {
      score: 0,
      issues: [],
      platformCompatibility: { common: [], fragmented: false },
      stackCoverage: { strategic: false, execution: false, operations: false }
    };
  }

  // FIX: Use Effective Fleet (expanded bundles) for analysis
  const agents = getEffectiveFleet(rawAgents);

  const issues: FleetIssue[] = [];
  let score = 100;

  // 1. Analyze Categories (The Operational Stack)
  const hasStrategic = agents.some(a => a.category === AgentCategory.STRATEGIC);
  const hasEngineering = agents.some(a => a.category === AgentCategory.ENGINEERING);
  const hasCreative = agents.some(a => a.category === AgentCategory.CREATIVE);
  const hasOps = agents.some(a => a.category === AgentCategory.OPERATIONS);
  const hasRegional = agents.some(a => a.category === AgentCategory.REGIONAL);

  const hasExecution = hasEngineering || hasCreative || hasRegional;

  // Rule: Missing Orchestration
  if (hasExecution && !hasStrategic) {
    score -= 20;
    issues.push({
      type: 'warning',
      title: 'Missing Orchestration Layer',
      message: 'You have execution agents but no Strategic agent (CEO/Manager) to orchestrate tasks. Consider adding a "CEO Advisor".'
    });
  }

  // Rule: Missing Compliance/Ops
  if (hasExecution && !hasOps) {
    score -= 10;
    issues.push({
      type: 'info',
      title: 'Unmonitored Output',
      message: 'Your fleet lacks an Operations/Compliance layer. Code or content may be generated without QA checks.'
    });
  }

  // 2. Analyze Redundancy
  const roles = agents.map(a => a.role);
  const uniqueRoles = new Set(roles);
  if (roles.length !== uniqueRoles.size) {
    score -= 15;
    issues.push({
      type: 'warning',
      title: 'Functional Redundancy',
      message: 'Detected multiple agents with overlapping roles. Ensure you need distinct specialized agents for the same function.'
    });
  }

  // 3. Platform Compatibility
  // Find intersection of all platforms
  const allPlatforms = agents.map(a => a.compatiblePlatforms);
  const commonPlatforms = allPlatforms.reduce((acc, curr) => 
    acc.filter(p => curr.includes(p as any)), 
    allPlatforms[0] as string[] || []
  );

  const isFragmented = commonPlatforms.length === 0;

  if (isFragmented && agents.length > 1) {
    score -= 30;
    issues.push({
      type: 'error',
      title: 'Platform Fragmentation',
      message: 'Your agents exist on disconnected islands. No single platform (Gemini/ChatGPT/Claude) supports your entire fleet.'
    });
  } else if (commonPlatforms.length === 1 && agents.length > 1) {
    issues.push({
      type: 'info',
      title: 'Platform Lock-in',
      message: `Your fleet can only collaborate fully on ${commonPlatforms[0]}. Ensure your team has access.`
    });
  }

  // 4. Success State
  if (score > 85 && agents.length > 1) {
    issues.push({
      type: 'success',
      title: 'Coherent Fleet Architecture',
      message: 'Your selection covers strategy, execution, and valid platform compatibility.'
    });
  }

  return {
    score: Math.max(0, score),
    issues,
    platformCompatibility: {
      common: commonPlatforms,
      fragmented: isFragmented
    },
    stackCoverage: {
      strategic: hasStrategic,
      execution: hasExecution,
      operations: hasOps
    }
  };
};

export const generateCheckoutIntelligence = (items: CartItem[]): CheckoutIntelligence => {
  // Use Effective Fleet to calculate intelligence based on actual capabilities, not just boxes.
  const effectiveItems = getEffectiveFleet(items);

  const capabilities = new Set<string>();
  const risks = new Set<string>();
  const strategy = new Set<string>();

  const hasStrategic = effectiveItems.some(i => i.category === AgentCategory.STRATEGIC);
  const hasEngineering = effectiveItems.some(i => i.category === AgentCategory.ENGINEERING);
  const hasCreative = effectiveItems.some(i => i.category === AgentCategory.CREATIVE);
  const hasOps = effectiveItems.some(i => i.category === AgentCategory.OPERATIONS);
  const hasRegional = effectiveItems.some(i => i.category === AgentCategory.REGIONAL);
  const hasBundle = items.some(i => i.category === AgentCategory.BUNDLE); // Check raw items for "Bundle" status

  // 1. Operational Capabilities Acquired
  if (hasEngineering) capabilities.add("Automated Code Review & Generation");
  if (hasCreative) capabilities.add("High-Volume Content Scaling");
  if (hasRegional) capabilities.add("Native MENA Market Localization");
  if (hasOps) capabilities.add("24/7 Compliance Monitoring");
  if (hasStrategic) capabilities.add("Autonomous Project Orchestration");
  if (hasBundle) capabilities.add("Pre-Integrated Agent Ecosystem");
  
  if (capabilities.size === 0) capabilities.add("Single-Task Automation");

  // 2. Risks Reduced
  if (hasOps && hasEngineering) risks.add("Deployment Downtime");
  if (hasStrategic) risks.add("Scope Creep & Misalignment");
  if (hasCreative && hasRegional) risks.add("Cultural Tone Deafness");
  if (hasOps) risks.add("Regulatory/Data Compliance Risks");
  
  const uniquePlatforms = new Set(effectiveItems.flatMap(i => i.compatiblePlatforms));
  if (uniquePlatforms.size > 1) risks.add("Model Vendor Lock-in");

  if (risks.size === 0) risks.add("Manual Human Error");

  // 3. Strategic Gains / Decisions Enabled
  if (hasStrategic) strategy.add("Decentralized Decision Making");
  if (hasEngineering && hasCreative) strategy.add("Full Product Lifecycle Speed");
  if (effectiveItems.length >= 3) strategy.add(`Force Multiplier (x${effectiveItems.length} Agents)`);
  else strategy.add("Task-Specific Efficiency");

  return {
    capabilities: Array.from(capabilities).slice(0, 3),
    risksReduced: Array.from(risks).slice(0, 3),
    strategicGains: Array.from(strategy).slice(0, 3)
  };
};
