
import React, { useState, useEffect } from 'react';
import { AgentProduct, SearchFilters } from '../types';
import { api } from '../lib/api';
import { AgentCard } from './AgentCard';
import { Icons } from './Icons';
import { SmartSearch } from './SmartSearch';
import { FilterSidebar } from './FilterSidebar';

interface StoreProps {
  onViewProduct: (agent: AgentProduct) => void;
  onAddToCart: (agent: AgentProduct) => void;
}

const ITEMS_PER_PAGE = 6;

export const Store: React.FC<StoreProps> = ({ onViewProduct, onAddToCart }) => {
  const [filteredAgents, setFilteredAgents] = useState<AgentProduct[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Mobile drawer state
  const [isLoading, setIsLoading] = useState(true);
  
  // State for Filters & Search
  const [sort, setSort] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    category: [],
    platforms: [],
    licenseTiers: [],
    minPrice: 0,
    maxPrice: 300,
    minRating: null
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data when filters/search/sort change
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API call combining search + filters
      // Note: In real app, search query would be part of filters or separate param
      const results = await api.getFilteredAgents(filters, sort);
      
      // If there is a search query, client-side filter further (since mock API splits them currently)
      // In real backend, one endpoint handles both.
      const finalResults = searchQuery 
        ? results.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase())) 
        : results;

      setFilteredAgents(finalResults);
      setCurrentPage(1); // Reset to first page on filter change
      setIsLoading(false);
    };

    fetchData();
  }, [filters, sort, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAgents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAgents = filteredAgents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: document.getElementById('fleet')?.offsetTop || 0, behavior: 'smooth' });
  };

  return (
    <div id="fleet" className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6 flex gap-4">
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-xl font-bold text-sm text-black dark:text-white"
        >
          <Icons.Menu className="w-4 h-4" /> Filters
        </button>
        <select 
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="flex-1 bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-xl px-4 py-3 text-sm font-bold text-black dark:text-white focus:outline-none"
        >
          <option value="popular">Most Popular</option>
          <option value="newest">Newest Arrivals</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* Sidebar (Desktop) */}
        <div className="hidden lg:block col-span-1">
          <FilterSidebar filters={filters} onChange={setFilters} />
        </div>

        {/* Mobile Filter Drawer */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />
            <div className="relative w-80 max-w-[85vw] bg-white dark:bg-dark-950 h-full p-6 shadow-2xl overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-black dark:text-white">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)} className="text-black dark:text-white"><Icons.X className="w-6 h-6" /></button>
              </div>
              <FilterSidebar filters={filters} onChange={setFilters} />
              <div className="mt-8 pt-4 border-t border-gray-100 dark:border-dark-800">
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full py-3 bg-brand-500 text-white font-bold rounded-lg"
                >
                  Show Results
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="col-span-1 lg:col-span-3">
          
          {/* Top Bar: Search & Sort */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <SmartSearch onSearchSubmit={setSearchQuery} />
            </div>
            <div className="hidden md:block w-48">
              <div className="relative h-full">
                <select 
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full h-full appearance-none bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-xl pl-4 pr-10 text-sm font-bold text-black dark:text-white cursor-pointer hover:border-brand-500 transition-colors focus:outline-none"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
                <Icons.ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 rotate-90 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Results Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-96 rounded-2xl bg-gray-100 dark:bg-dark-900 animate-pulse" />
              ))}
            </div>
          ) : filteredAgents.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {paginatedAgents.map(agent => (
                  <AgentCard 
                    key={agent.id} 
                    agent={agent} 
                    onView={onViewProduct}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-2">
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-200 dark:border-dark-800 text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Icons.ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                          currentPage === page
                            ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                            : 'bg-white dark:bg-dark-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-dark-800 hover:bg-gray-50 dark:hover:bg-dark-800'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-200 dark:border-dark-800 text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Icons.ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-32 bg-gray-50 dark:bg-dark-900 rounded-3xl border border-dashed border-gray-200 dark:border-dark-800 transition-colors">
               <Icons.Search className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-6" />
               <p className="text-gray-500 font-medium text-lg">No agents found matching criteria.</p>
               <button 
                 onClick={() => {
                   setFilters({ category: [], platforms: [], licenseTiers: [], minPrice: 0, maxPrice: 300, minRating: null });
                   setSearchQuery('');
                 }} 
                 className="mt-4 text-brand-500 font-bold hover:underline"
               >
                 Clear Filters
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
