
// tag: don't regression this feature
// Security Architect: Core Logic for API Key Management

export interface ApiKeyDefinition {
  id: string;
  name: string;
  prefix: string; // e.g. "ag_live"
  preview: string; // e.g. "...a9b2"
  scopes: string[];
  createdAt: string;
  lastUsed?: string;
  status: 'active' | 'revoked';
}

export interface GeneratedKeyResult {
  keyDefinition: ApiKeyDefinition;
  secretKey: string; // The raw key, shown ONLY once
}

/**
 * Generates a cryptographically secure API key.
 * Format: ag_live_[32_bytes_of_hex_entropy]
 */
export const generateSecureApiKey = async (name: string, scopes: string[]): Promise<GeneratedKeyResult> => {
  // 1. Generate Entropy
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  const entropy = Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
  
  const prefix = 'ag_live';
  const secretKey = `${prefix}_${entropy}`;
  
  // 2. Create the public definition (simulating DB record)
  const keyDefinition: ApiKeyDefinition = {
    id: `key_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    name,
    prefix,
    preview: secretKey.slice(-4),
    scopes,
    createdAt: new Date().toLocaleDateString(),
    status: 'active'
  };

  // Note: In a real backend, we would hash 'secretKey' using SHA-256 or Argon2 
  // and store ONLY the hash in the database.
  // const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(secretKey));

  return { keyDefinition, secretKey };
};
