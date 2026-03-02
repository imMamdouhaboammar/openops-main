
// tag: don't regression this feature
import React, { useState, useEffect } from 'react';
import { AgentProduct } from '../types';
import { Icons } from './Icons';
import { getReviewsForAgent, getSimilarAgents } from '../data';

// Modular components
import { ProductHeader } from './product-details/ProductHeader';
import { ProductSidebar } from './product-details/ProductSidebar';
import { StickyBuyBar } from './product-details/StickyBuyBar';
import { StickyHeader } from './product-details/StickyHeader';
import { ReviewsSection } from './product-details/ReviewsSection';
import { RelatedProducts } from './product-details/RelatedProducts';
import { OverviewTab } from './product-details/tabs/OverviewTab';
import { PreviewTab } from './product-details/tabs/PreviewTab';
import { LogicFlowTab } from './product-details/tabs/LogicFlowTab';
import { SetupGuideTab } from './product-details/tabs/SetupGuideTab';

// Enhanced Components
import { CodeExplorer } from './product-details/x-ray/CodeExplorer';
import { LogicVisualizer } from './product-details/visualizer/LogicVisualizer';
import { VersionHistory } from './product-details/governance/VersionHistory';
import { AgentFAQ } from './product-details/faq/AgentFAQ';

interface ProductPageProps {
  agent: AgentProduct;
  onBack: () => void;
  onAddToCart: (agent: AgentProduct) => void;
  onView?: (agent: AgentProduct) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ agent, onBack, onAddToCart, onView }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'source' | 'logic' | 'setup'>('overview');
  const [isSticky, setIsSticky] = useState(false);

  // Handle scroll for sticky bar
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Reset tab when agent changes
  useEffect(() => {
    setActiveTab('overview');
    window.scrollTo(0, 0);
  }, [agent]);

  const reviews = getReviewsForAgent(agent.id);
  const similarAgents = getSimilarAgents(agent);

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-20 pb-20 transition-colors animate-fade-in">
      
      <StickyHeader 
        agent={agent} 
        isVisible={isSticky} 
        onAddToCart={onAddToCart} 
      />

      <StickyBuyBar 
        agent={agent} 
        isVisible={isSticky} 
        onAddToCart={onAddToCart} 
      />

      <ProductHeader agent={agent} onBack={onBack} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8">
            
            {/* Custom Tabs Navigation */}
            <div className="flex border-b border-gray-100 dark:border-dark-900 mb-10 overflow-x-auto scrollbar-hide gap-8">
              {[
                { id: 'overview', label: 'Overview', icon: null },
                { id: 'source', label: 'Source Code', icon: Icons.Code },
                { id: 'logic', label: 'Architecture', icon: Icons.Workflow },
                { id: 'setup', label: 'Deployment', icon: Icons.Rocket }
              ].map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-2 ${
                      activeTab === tab.id
                      ? 'text-black dark:text-white border-b-2 border-brand-500' 
                      : 'text-gray-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {tab.icon && <tab.icon className="w-4 h-4" />}
                    {tab.label}
                  </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
              {activeTab === 'overview' && (
                <div className="space-y-12">
                  <OverviewTab agent={agent} />
                  {/* Embedded Preview in Overview for impact */}
                  <div>
                    <h3 className="text-lg font-bold text-black dark:text-white mb-6">Live Simulation</h3>
                    <PreviewTab agent={agent} />
                  </div>
                </div>
              )}
              
              {activeTab === 'source' && (
                <div className="space-y-8 animate-fade-in">
                  <div>
                    <h3 className="text-lg font-bold text-black dark:text-white mb-4">Package Inspector</h3>
                    <p className="text-sm text-gray-500 mb-6">Explore the file structure included in your download. Code content is obfuscated in preview mode.</p>
                    <CodeExplorer agent={agent} />
                  </div>
                  <VersionHistory />
                </div>
              )}

              {activeTab === 'logic' && (
                <div className="space-y-8 animate-fade-in">
                  <div>
                    <h3 className="text-lg font-bold text-black dark:text-white mb-4">Reasoning Engine Architecture</h3>
                    <p className="text-sm text-gray-500 mb-6">Visual representation of how {agent.name} processes context and executes tools.</p>
                    <LogicVisualizer />
                  </div>
                  <LogicFlowTab /> {/* Existing component repurposed as detailed text description */}
                </div>
              )}

              {activeTab === 'setup' && <SetupGuideTab agent={agent} />}
            </div>

            <AgentFAQ />
            <ReviewsSection reviews={reviews} />

          </div>

          {/* Sticky Sidebar (Right Column) */}
          <div className="lg:col-span-4">
            <ProductSidebar agent={agent} onAddToCart={onAddToCart} />
          </div>

        </div>

        <RelatedProducts 
          agents={similarAgents} 
          onView={(agent) => { if (onView) onView(agent); }} 
          onAddToCart={onAddToCart} 
        />

      </div>
    </div>
  );
};
