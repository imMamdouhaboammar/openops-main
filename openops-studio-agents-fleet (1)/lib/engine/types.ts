
import { AgentProduct } from '../../types';

export interface FleetIssue {
  type: 'warning' | 'error' | 'info' | 'success';
  title: string;
  message: string;
}

export interface FleetAnalysis {
  score: number;
  issues: FleetIssue[];
  platformCompatibility: {
    common: string[];
    fragmented: boolean;
  };
  stackCoverage: {
    strategic: boolean;
    execution: boolean;
    operations: boolean;
  };
}

export interface Recommendation {
  agent: AgentProduct;
  reason: string;
  impact: string;
  type: 'org-chart' | 'gap-fill';
}

export interface MultiplierBreakdown {
  id: string;
  label: string;
  count: number;
  percentage: number;
  description: string;
  iconName: 'Users' | 'Globe' | 'Cpu' | 'Award';
}

export interface BonusItem {
  id: string;
  name: string;
  type: 'infrastructure' | 'governance' | 'testing';
  description: string;
  iconName: 'Workflow' | 'ShieldCheck' | 'Box' | 'Scroll' | 'Wrench';
  value: string;
}

export interface CheckoutIntelligence {
  capabilities: string[];
  risksReduced: string[];
  strategicGains: string[];
}

export interface BundleLogicResult {
  action: 'ADD_NORMAL' | 'REPLACE_INDIVIDUALS' | 'ALREADY_OWNED_IN_BUNDLE';
  itemsToRemove?: string[];
  bundleName?: string;
  replacedNames?: string[];
}

export type FleetTier = 'Starter' | 'Growth' | 'Enterprise';

export interface TierData {
  current: FleetTier;
  next: FleetTier | null;
  progress: number; // 0 to 100
  agentsNeeded: number;
  perkLabel: string;
}
