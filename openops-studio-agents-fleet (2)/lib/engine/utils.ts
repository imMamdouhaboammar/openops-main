
import { AgentProduct } from '../../types';
import { agents as fullCatalog } from '../../data';

// --- Normalization Logic ---
export const getNormalizedId = (agent: { id: string; canonicalAgentId?: string }) => 
  agent.canonicalAgentId || agent.id;

// --- Platform Logic ---
export const checkCompatibility = (agent: AgentProduct, targetPlatform: string): boolean => {
  if (targetPlatform === 'All') return true;
  return agent.compatiblePlatforms.includes(targetPlatform as any);
};

// --- CORE LOGIC: Expand Fleet to find hidden gems inside bundles ---
export const getEffectiveFleet = (items: AgentProduct[]): AgentProduct[] => {
  const effectiveFleet: AgentProduct[] = [];
  const seenIds = new Set<string>();

  const addAgent = (agent: AgentProduct) => {
    const normId = getNormalizedId(agent);
    if (!seenIds.has(normId)) {
      effectiveFleet.push(agent);
      seenIds.add(normId);
    }
  };

  items.forEach(item => {
    // 1. Add the item itself (Bundle or Individual)
    addAgent(item);

    // 2. If it is a bundle, look up and add its contents
    if (item.isBundle && item.containedAgentIds) {
      item.containedAgentIds.forEach(subId => {
        const subAgent = fullCatalog.find(a => a.id === subId);
        if (subAgent) {
          addAgent(subAgent);
        }
      });
    }
  });

  return effectiveFleet;
};

// --- Scarcity Engine (Trading Psychology) ---
export const getScarcityData = (agentId: string) => {
  // Deterministic random generator based on Agent ID
  // This ensures the same agent always shows the same "sold" count to a user
  let hash = 0;
  for (let i = 0; i < agentId.length; i++) {
    hash = agentId.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Map hash to a range: 
  // We want most agents to look like they are selling well (65-98 range)
  const total = 100;
  const sold = Math.abs(hash % 34) + 65; 
  const remaining = total - sold;
  const isUrgent = sold >= 90; // Trigger "Red Alert" if > 90 sold

  return {
    batchNumber: 1, // Currently fixed at Batch #1 for MVP
    sold,
    total,
    remaining,
    isUrgent
  };
};
