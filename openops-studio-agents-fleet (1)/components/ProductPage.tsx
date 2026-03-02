
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

interface ProductPageProps {
  agent: AgentProduct;
  onBack: () => void;
  onAddToCart: (agent: AgentProduct) => void;
  onView?: (agent: AgentProduct) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ agent, onBack, onAddToCart, onView }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'preview' | 'logic' | 'setup'>('overview');
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
                { id: 'overview', label: 'Overview' },
                { id: 'preview', label: 'Conversation Preview', icon: Icons.MessageSquare },
                { id: 'logic', label: 'Logic Flow', icon: Icons.Cpu },
                { id: 'setup', label: 'Deployment Guide' }
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
              {activeTab === 'overview' && <OverviewTab agent={agent} />}
              {activeTab === 'preview' && <PreviewTab agent={agent} />}
              {activeTab === 'logic' && <LogicFlowTab />}
              {activeTab === 'setup' && <SetupGuideTab agent={agent} />}
            </div>

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
