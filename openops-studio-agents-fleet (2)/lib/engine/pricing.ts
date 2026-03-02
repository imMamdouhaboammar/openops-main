
import { AgentProduct, AgentCategory, CartItem } from '../../types';
import { MultiplierBreakdown, FleetTier } from './types';
import { getEffectiveFleet } from './utils';

export const calculateFleetMultiplier = (items: CartItem[]) => {
  const breakdown: MultiplierBreakdown[] = [];
  let totalPercentage = 0;

  // Tier Thresholds
  const STARTER_LIMIT = 3;
  const ENTERPRISE_LIMIT = 5;

  const agentCount = items.reduce((acc, i) => acc + i.quantity, 0);
  
  // --- TIER CALCULATION ---
  let tier: FleetTier = 'Starter';
  let tierProgress = 0;
  let nextTier: FleetTier | null = 'Growth';
  let agentsNeeded = 0;
  let perkLabel = 'Unlock 10% Discount';

  if (agentCount < STARTER_LIMIT) {
    // 0, 1, 2 agents. Needs 3 for Growth.
    tier = 'Starter';
    nextTier = 'Growth';
    agentsNeeded = STARTER_LIMIT - agentCount;
    tierProgress = (agentCount / STARTER_LIMIT) * 100;
    perkLabel = 'Unlock Growth Tier (10% OFF)';
  } else if (agentCount < ENTERPRISE_LIMIT) {
    // 3, 4 agents. Needs 5 for Enterprise.
    tier = 'Growth';
    nextTier = 'Enterprise';
    agentsNeeded = ENTERPRISE_LIMIT - agentCount;
    // Map 3->0%, 5->100% relative to this stage
    tierProgress = ((agentCount - STARTER_LIMIT) / (ENTERPRISE_LIMIT - STARTER_LIMIT)) * 100;
    perkLabel = 'Unlock Enterprise Tier (20% OFF + Secrets)';
  } else {
    // 5+ agents
    tier = 'Enterprise';
    nextTier = null;
    agentsNeeded = 0;
    tierProgress = 100;
    perkLabel = 'Enterprise Unlocked';
  }

  if (items.length === 0) return { totalPercentage: 0, breakdown, savings: 0, tierData: { current: 'Starter' as FleetTier, next: 'Growth' as FleetTier, progress: 0, agentsNeeded: 3, perkLabel } };

  // --- MULTIPLIER LOGIC ---
  
  // 1. Tier Base Multiplier (Guarantees the "Game" reward)
  let tierBonus = 0;
  if (tier === 'Growth') tierBonus = 5; // Base 5% for Growth
  if (tier === 'Enterprise') tierBonus = 10; // Base 10% for Enterprise

  if (tierBonus > 0) {
    totalPercentage += tierBonus;
    breakdown.push({
      id: 'tier',
      label: `${tier} Status`,
      count: 1,
      percentage: tierBonus,
      description: `Tier reward level achieved`,
      iconName: 'Award'
    });
  }

  // 2. Agent Scale Multiplier (Volume) - Existing logic
  if (agentCount > 0) {
    // 1% per agent, capped at 8%
    const val = Math.min(agentCount * 1, 8); 
    if (val > 0) {
      totalPercentage += val;
      breakdown.push({
        id: 'scale',
        label: 'Fleet Density',
        count: agentCount,
        percentage: val,
        description: `Multiplier applied for ${agentCount} active units`,
        iconName: 'Users'
      });
    }
  }

  // 3. Domain Coverage Multiplier (Categories)
  const effectiveFleet = getEffectiveFleet(items);
  const uniqueCategories = new Set(effectiveFleet.map(i => i.category));
  if (uniqueCategories.has(AgentCategory.BUNDLE)) uniqueCategories.delete(AgentCategory.BUNDLE);

  if (uniqueCategories.size > 0) {
    const val = uniqueCategories.size * 2; 
    totalPercentage += val;
    breakdown.push({
      id: 'domain',
      label: 'Operational Width',
      count: uniqueCategories.size,
      percentage: val,
      description: `Coverage across ${uniqueCategories.size} distinct domains`,
      iconName: 'Globe'
    });
  }

  // 4. Platform Breadth Multiplier
  const uniquePlatforms = new Set(effectiveFleet.flatMap(i => i.compatiblePlatforms));
  if (uniquePlatforms.size > 0) {
    const val = uniquePlatforms.size * 2;
    totalPercentage += val;
    breakdown.push({
      id: 'platform',
      label: 'Runtime Agility',
      count: uniquePlatforms.size,
      percentage: val,
      description: `Cross-compatible with ${uniquePlatforms.size} platforms`,
      iconName: 'Cpu'
    });
  }

  // Cap total multiplier
  const effectivePercentage = Math.min(totalPercentage, 35);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const savings = (subtotal * effectivePercentage) / 100;

  return { 
    totalPercentage: effectivePercentage, 
    rawPercentage: totalPercentage,
    breakdown, 
    savings,
    isCapped: totalPercentage > 35,
    tierData: {
      current: tier,
      next: nextTier,
      progress: tierProgress,
      agentsNeeded,
      perkLabel
    }
  };
};
