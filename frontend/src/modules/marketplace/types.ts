export type AgentCategory =
  | "Paid Media"
  | "Creative"
  | "Growth"
  | "Social"
  | "Search"
  | "Proposal"
  | "Saudi Market"
  | "PR"
  | "Account Management"
  | "Analytics";

export interface MarketplaceAgent {
  id: string;
  order: string;
  name: string;
  category: AgentCategory;
  description: string;
  priceEgp: number;
  freeLabel: string;
  bestFor: string;
  promise: string;
  deliverables: string[];
  inputs: string[];
  workflow: string[];
  installCommand: string;
}
