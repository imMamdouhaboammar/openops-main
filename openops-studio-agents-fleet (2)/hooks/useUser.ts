
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, Organization } from '../types';

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (email: string) => Promise<void>;
  signup: (data: Partial<UserProfile>) => Promise<void>;
  logout: () => void;
  verifyOperator: () => void;
  toggle2FA: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

// Mock delay to simulate API
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const useUser = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string) => {
        set({ isLoading: true });
        await delay(1200); // Simulate network

        // Mock Login Logic
        const mockUser: UserProfile = {
          id: 'u_123',
          name: email.split('@')[0],
          email: email,
          roles: ['Buyer'],
          isVerifiedOperator: false,
          operatorLevel: 1,
          accountMaturityScore: 45,
          riskScore: 10,
          twoFactorEnabled: false,
          joinedAt: new Date().toISOString(),
          organization: {
            id: 'org_1',
            name: 'Personal Workspace',
            domain: 'personal',
            plan: 'Starter'
          }
        };

        set({ user: mockUser, isAuthenticated: true, isLoading: false });
      },

      signup: async (data: Partial<UserProfile>) => {
        set({ isLoading: true });
        await delay(1500); // Simulate network

        const newUser: UserProfile = {
          id: `u_${Date.now()}`,
          name: data.name || 'New User',
          email: data.email || 'user@example.com',
          roles: data.roles || ['Buyer'],
          isVerifiedOperator: false,
          operatorLevel: 1,
          accountMaturityScore: 10, // Start low
          riskScore: 0,
          twoFactorEnabled: false,
          joinedAt: new Date().toISOString(),
          organization: {
            id: `org_${Date.now()}`,
            name: `${data.name}'s Org`,
            domain: 'pending',
            plan: 'Starter'
          }
        };

        set({ user: newUser, isAuthenticated: true, isLoading: false });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
        // Clear specific local storage items if needed
        localStorage.removeItem('openops_cart');
      },

      verifyOperator: () => {
        const currentUser = get().user;
        if (!currentUser) return;

        set({
          user: {
            ...currentUser,
            isVerifiedOperator: true,
            operatorLevel: currentUser.operatorLevel + 1,
            accountMaturityScore: Math.min(100, currentUser.accountMaturityScore + 15)
          }
        });
      },

      toggle2FA: () => {
        const currentUser = get().user;
        if (!currentUser) return;

        set({
          user: {
            ...currentUser,
            twoFactorEnabled: !currentUser.twoFactorEnabled,
            riskScore: !currentUser.twoFactorEnabled 
              ? Math.max(0, currentUser.riskScore - 10) 
              : Math.min(100, currentUser.riskScore + 10)
          }
        });
      },

      updateProfile: (data) => {
        const currentUser = get().user;
        if (!currentUser) return;
        set({ user: { ...currentUser, ...data } });
      }
    }),
    {
      name: 'openops_auth_storage', // Unique name
    }
  )
);
