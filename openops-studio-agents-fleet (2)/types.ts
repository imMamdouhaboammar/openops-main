
// tag: don't regression this feature

export enum AgentCategory {
  STRATEGIC = 'Strategic',
  ENGINEERING = 'Engineering',
  CREATIVE = 'Creative',
  REGIONAL = 'Regional (MENA)',
  OPERATIONS = 'Operations',
  BUNDLE = 'Fleet Bundle' // New Category
}

export enum LicenseTier {
  PERSONAL = 'Personal',
  TEAM = 'Team',
  ENTERPRISE = 'Enterprise',
  COMMERCIAL = 'Commercial'
}

export interface VendorProfile {
  id: string;
  name: string;
  verified: boolean;
  rating: number;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
}

export interface AgentFile {
  name: string;
  type: 'json' | 'md' | 'yml' | 'txt' | 'pseudo';
  description: string;
}

export interface AgentProduct {
  id: string;
  canonicalAgentId?: string; // Canonical ID for normalizing variants/bundles
  name: string;
  role: string;
  category: AgentCategory;
  price: number;
  description: string;
  features: string[];
  compatiblePlatforms: ('Gemini' | 'ChatGPT' | 'Claude')[];
  filesIncluded: AgentFile[];
  
  // Stats & Ranking
  popularity: number; // 1-100
  downloads: number;
  rating: number; // 1-5
  ratingCount: number;
  isNew?: boolean;
  isTrending?: boolean;

  // Metadata
  vendor: VendorProfile;
  licenseTier: LicenseTier;
  imageUrl?: string; // For search previews
  
  // Bundle Logic
  isBundle?: boolean;
  containedAgentIds?: string[]; // IDs of agents inside this bundle
}

export interface CartItem extends AgentProduct {
  quantity: number;
}

export interface SearchFilters {
  category: string[];
  platforms: string[];
  licenseTiers: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number | null;
}

export interface SearchResult extends AgentProduct {
  // Inherits all product props for the smart search display
}

// --- New Collection Type ---
export interface Collection {
  id: string;
  title: string;
  description: string;
  icon: any; // React component type
  gradient: string;
  filterIds: string[]; // Agent IDs in this collection
}

// --- Account Center Types ---

export interface AuditLogEntry {
  id: string;
  action: string;
  actor: string;
  ip: string;
  timestamp: string;
  status: 'Success' | 'Failed' | 'Warning';
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Void';
  items: number;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Member' | 'Viewer';
  status: 'Active' | 'Invited';
  lastActive: string;
}

export interface Organization {
  id: string;
  name: string;
  domain: string;
  plan: 'Starter' | 'Growth' | 'Enterprise';
}

// --- Auth Types ---

export type UserRole = 'Buyer' | 'Vendor' | 'Admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  isVerifiedOperator: boolean;
  operatorLevel: number;
  organization?: Organization;
  accountMaturityScore: number; // 0-100
  riskScore: number; // 0-100 (Lower is better)
  twoFactorEnabled: boolean;
  joinedAt: string;
}

// --- Blog / Intelligence Types (Enhanced) ---
export type BlogCategory = 'Blueprint' | 'Case Study' | 'Intel' | 'Operations' | 'Architecture' | 'Regional (MENA)';

export interface BlogBlock {
  type: 'text' | 'code' | 'quote' | 'image' | 'header' | 'subheader' | 'list' | 'callout' | 'divider';
  content: string | string[]; // Array for lists
  language?: string; // For code blocks
  caption?: string; // For images
  variant?: 'info' | 'warning' | 'tip'; // For callouts
}

export interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  category: BlogCategory;
  author: {
    name: string;
    role: string;
    verified: boolean;
    avatarUrl?: string; 
  };
  date: string;
  readTime: string;
  content: BlogBlock[];
  tags: string[];
  relatedProductIds?: string[];
  
  // Engagement
  likes?: number;
  views?: string;
}