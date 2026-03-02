
import { AgentProduct, SearchFilters } from '../types';
import { agents } from '../data';

// Simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  search: async (query: string) => {
    await delay(300); // Debounce simulation
    if (!query) return [];
    
    const lowerQuery = query.toLowerCase();
    // Return full AgentProduct objects for rich display in search
    return agents.filter(agent => 
      agent.name.toLowerCase().includes(lowerQuery) ||
      agent.role.toLowerCase().includes(lowerQuery) ||
      agent.description.toLowerCase().includes(lowerQuery)
    ).slice(0, 5); // Limit to 5 results for dropdown
  },

  getFilteredAgents: async (filters: SearchFilters, sort: string) => {
    await delay(500); // Simulate processing time
    
    let results = agents.filter(agent => {
      // Category Filter
      if (filters.category.length > 0 && !filters.category.includes(agent.category)) {
        return false;
      }
      
      // Platform Filter
      if (filters.platforms.length > 0) {
        const hasPlatform = filters.platforms.some(p => agent.compatiblePlatforms.includes(p as any));
        if (!hasPlatform) return false;
      }

      // License Tier Filter
      if (filters.licenseTiers && filters.licenseTiers.length > 0 && !filters.licenseTiers.includes(agent.licenseTier)) {
        return false;
      }

      // Price Filter
      if (agent.price < filters.minPrice || agent.price > filters.maxPrice) {
        return false;
      }

      // Rating Filter
      if (filters.minRating && agent.rating < filters.minRating) {
        return false;
      }

      return true;
    });

    // Sorting Logic
    if (sort === 'price_asc') {
      results.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
      results.sort((a, b) => b.price - a.price);
    } else if (sort === 'popular') {
      results.sort((a, b) => b.popularity - a.popularity);
    } else if (sort === 'newest') {
      results.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return results;
  }
};
