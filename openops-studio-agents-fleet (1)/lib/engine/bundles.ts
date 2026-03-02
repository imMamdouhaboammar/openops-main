
import { AgentProduct, CartItem } from '../../types';
import { agents as fullCatalog } from '../../data';
import { BundleLogicResult } from './types';
import { getNormalizedId } from './utils';

export const analyzeBundleLogic = (cart: CartItem[], newItem: AgentProduct): BundleLogicResult => {
  const newItemNormId = getNormalizedId(newItem);

  // Helper to resolve normalized IDs from a bundle's contained IDs
  const getContainedNormIds = (agent: AgentProduct): string[] => {
    if (!agent.containedAgentIds) return [];
    return agent.containedAgentIds.map(id => {
      const found = fullCatalog.find(a => a.id === id);
      return found ? getNormalizedId(found) : id;
    });
  };
  
  // Case 1: User adds a Bundle. Check if cart contains individual items from this bundle.
  if (newItem.isBundle && newItem.containedAgentIds) {
    const containedNormIds = getContainedNormIds(newItem);

    const overlappingItems = cart.filter(item => 
      containedNormIds.includes(getNormalizedId(item))
    );

    if (overlappingItems.length > 0) {
      return {
        action: 'REPLACE_INDIVIDUALS',
        itemsToRemove: overlappingItems.map(i => i.id),
        replacedNames: overlappingItems.map(i => i.name)
      };
    }
  }

  // Case 2: User adds an Individual Agent. Check if cart contains a Bundle that includes this agent.
  if (!newItem.isBundle) {
    const parentBundle = cart.find(item => {
      if (!item.isBundle) return false;
      const containedNormIds = getContainedNormIds(item);
      return containedNormIds.includes(newItemNormId);
    });

    if (parentBundle) {
      return {
        action: 'ALREADY_OWNED_IN_BUNDLE',
        bundleName: parentBundle.name
      };
    }
  }

  return { action: 'ADD_NORMAL' };
};
