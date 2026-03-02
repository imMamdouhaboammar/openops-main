---
description: "Architecture & Coding Rules - OpenOps Agents Fleet Marketplace"
date: 2026-01-12
version: 1.0.0
type: "Coding Standards"
applies_to: "All development on OpenOps Agents Fleet Marketplace"
tech_stack: "Vite + React 19 + TypeScript (strict) + Zustand"
---

# 🏗️ Architecture & Coding Rules
## OpenOps Agents Fleet Marketplace - Development Standards

**Last Updated**: 2026-01-12  
**Version**: 1.0.0  
**Audience**: All developers  
**Enforcement**: Pre-commit hooks + Code review

---

## 📋 Quick Reference

| Rule | Category | Priority | Consequence |
|------|----------|----------|------------|
| Anti-regression checks | Quality | 🔴 Critical | Blocks PR |
| Single responsibility | Architecture | 🔴 Critical | Blocks PR |
| Flat project structure | Structure | 🔴 Critical | Blocks PR |
| Relative imports only | Imports | 🟡 High | Code review fail |
| Feature directory isolation | Modular | 🟡 High | Code review fail |
| Best practices research | Process | 🟡 High | Code review fail |
| Clean code | Quality | 🟡 High | Code review fail |
| Well-commented code | Documentation | 🟠 Medium | Code review suggestion |

---

## 1. ANTI-REGRESSION RULES

### Definition
Anti-regression = Prevent old bugs from reappearing + prevent new features breaking existing ones.

### 1.1 Test Every Fix
**Rule**: Every bug fix MUST include a test that would have caught the bug.

```typescript
// ❌ BAD: Fix without test (regression will happen)
// Bug: Cart total was calculating wrong for discounts
// Fix: Changed discount calculation logic
const calculateTotal = (items, discount) => {
  return items.reduce((sum, item) => sum + item.price, 0) - discount;
};

// ✅ GOOD: Fix + test (prevents regression)
export function calculateTotal(items: CartItem[], discount: number): number {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  return Math.max(0, subtotal - discount); // Prevent negative totals
}

// Test file: __tests__/calculateTotal.test.ts
describe('calculateTotal', () => {
  it('should apply discount correctly', () => {
    const items = [{ price: 100 }, { price: 50 }];
    expect(calculateTotal(items, 20)).toBe(130); // 100 + 50 - 20
  });

  it('should prevent negative totals', () => {
    const items = [{ price: 100 }];
    expect(calculateTotal(items, 150)).toBe(0); // Not -50
  });
});
```

### 1.2 Add Regression Test to Git Hooks
**Rule**: `npm run test` must pass before commit.

```bash
# .husky/pre-commit
#!/bin/sh
npm run test -- --changed  # Only test changed files
npm run lint
npm run type-check
```

### 1.3 Document Why (Not Just What)
**Rule**: Every fix must explain the root cause in commit message.

```
✅ GOOD commit:
[cart] Fix discount calculation losing precision
- Root cause: JavaScript floating-point arithmetic (100.1 + 50.2 ≠ 150.3)
- Solution: Use cents (10010 + 5020 = 15030), divide by 100 at display
- Test: New test_calculateTotal.ts covers edge cases
- Regression: Prevents #123 from happening again

❌ BAD commit:
[cart] Fix bug
```

### 1.4 Prevent Common Regression Patterns
**Rule**: Never allow these patterns in code:

```typescript
// ❌ REGRESSION: Mutating state directly
const updateCart = (items, newItem) => {
  items.push(newItem); // Mutation! React won't detect change
  return items;
};

// ✅ CORRECT: Return new array
const updateCart = (items: CartItem[], newItem: CartItem): CartItem[] => {
  return [...items, newItem];
};

// ❌ REGRESSION: Async without error handling
useEffect(() => {
  fetch('/api/cart').then(r => r.json()).then(setCart);
  // What if fetch fails? Silent failure = regression
}, []);

// ✅ CORRECT: Error handling + cleanup
useEffect(() => {
  let mounted = true;
  
  (async () => {
    try {
      const res = await fetch('/api/cart');
      if (!mounted) return;
      const data = await res.json();
      setCart(data);
    } catch (err) {
      if (mounted) setError(err);
    }
  })();

  return () => { mounted = false; }; // Cleanup
}, []);

// ❌ REGRESSION: Race conditions
let searchResults = [];
const search = (query) => {
  fetch(`/api/search?q=${query}`)
    .then(r => r.json())
    .then(data => setResults(data)); // What if user searched again?
};

// ✅ CORRECT: Cancel previous request
const search = (query) => {
  const controller = new AbortController();
  fetch(`/api/search?q=${query}`, { signal: controller.signal })
    .then(r => r.json())
    .then(data => setResults(data));
  
  return () => controller.abort(); // Cancel if new search
};
```

### 1.5 Keep Tests Green
**Rule**: If a test breaks, fix it immediately (same day).

```bash
# Check test status
npm run test

# If failing:
# 1. Understand why it failed
# 2. Fix the code (or update test if spec changed)
# 3. Re-run to confirm green
# 4. Commit the fix
```

---

## 2. MODULAR ARCHITECTURE RULES

### 2.1 Feature-First Directory Structure (Flat, No src/)

**Rule**: Every feature gets its own directory at root level.

```
project-root/
├── cart/                        ← Feature directory
│   ├── hooks/
│   │   └── useCart.ts
│   ├── components/
│   │   ├── CartPage.tsx
│   │   └── CartItem.tsx
│   ├── store/
│   │   └── cartStore.ts
│   ├── services/
│   │   └── CartService.ts
│   ├── types/
│   │   └── cart.types.ts
│   ├── __tests__/
│   │   ├── CartService.test.ts
│   │   └── useCart.test.ts
│   └── index.ts              ← Barrel export
│
├── checkout/                   ← Feature directory
│   ├── components/
│   │   ├── CheckoutFlow.tsx
│   │   ├── PaymentStep.tsx
│   │   └── ConfirmStep.tsx
│   ├── services/
│   │   └── CheckoutService.ts
│   ├── types/
│   │   └── checkout.types.ts
│   ├── __tests__/
│   └── index.ts
│
├── shared/                     ← Shared across features
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   └── ErrorBoundary.tsx
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   └── useFetch.ts
│   ├── utils/
│   │   ├── formatCurrency.ts
│   │   └── validation.ts
│   ├── types/
│   │   └── common.types.ts
│   └── index.ts
│
├── styles/                     ← Global styles
│   ├── globals.css
│   └── theme.ts
│
├── App.tsx
├── main.tsx
├── vite.config.ts
├── tsconfig.json
├── package.json
└── index.html
```

### 2.2 No Cross-Feature Imports
**Rule**: Features should NOT import from other features directly.

```typescript
// ❌ BAD: Cross-feature import
// In checkout/components/CheckoutFlow.tsx
import { useCart } from '../../cart/hooks/useCart'; // ← WRONG

// ✅ GOOD: Use EventBus for cross-feature communication
// In checkout/components/CheckoutFlow.tsx
import { eventBus } from '../../shared/eventBus';

const handleCheckout = async (orderId) => {
  // Emit event instead of calling other feature
  eventBus.emit({
    type: 'CHECKOUT_COMPLETED',
    payload: { orderId },
  });
};

// In cart/store/cartStore.ts (subscribed to event)
eventBus.subscribe('CHECKOUT_COMPLETED', (event) => {
  // Clear cart after checkout
  clearCart();
});
```

### 2.3 Feature Must Have index.ts (Barrel Export)

**Rule**: Every feature exports its public API via `index.ts`.

```typescript
// ✅ cart/index.ts
export { useCart } from './hooks/useCart';
export { CartPage } from './components/CartPage';
export type { CartItem, CartState } from './types/cart.types';

// Usage in other modules:
import { useCart, CartPage } from '../../cart';

// ❌ BAD: Direct imports from internal files
import { useCart } from '../../cart/hooks/useCart';
import { CartPage } from '../../cart/components/CartPage';
```

### 2.4 Feature Isolation Rules

**Rule**: Each feature is self-contained and replaceable.

```
Feature = API + Logic + UI

If you delete a feature, the app should still build
(other features just won't use it).
```

**Example**: If cart feature is deleted, checkout should still build (just won't connect to it).

---

## 3. SINGLE RESPONSIBILITY PRINCIPLE (SRP) RULES

### 3.1 One Job Per File

**Rule**: Each file has ONE reason to change.

```typescript
// ❌ BAD: Multiple responsibilities in one file
// cart/CartService.ts (150 lines)
export class CartService {
  // Responsibility 1: Get items
  async getCartItems() { }

  // Responsibility 2: Update UI
  updateCartUI() { }

  // Responsibility 3: Format display
  formatPrice(price) { }

  // Responsibility 4: Validate input
  validateItem(item) { }

  // Responsibility 5: Log analytics
  logAddToCart(item) { }
}

// ✅ GOOD: Split into focused files
// cart/services/CartService.ts (only fetching logic)
export class CartService {
  async getCartItems(): Promise<CartItem[]> { }
  async addItem(item: CartItem): Promise<void> { }
}

// cart/utils/cartFormatter.ts (only formatting)
export function formatPrice(price: number): string { }
export function formatQuantity(qty: number): string { }

// cart/utils/cartValidator.ts (only validation)
export function validateItem(item: unknown): CartItem { }
export function validateQuantity(qty: unknown): number { }

// shared/services/AnalyticsService.ts (only logging)
export function logAddToCart(item: CartItem): void { }
```

### 3.2 Small Component Files (<300 lines)

**Rule**: React components should be under 300 lines.

```typescript
// ❌ BAD: CheckoutFlow.tsx (600 lines)
function CheckoutFlow() {
  // Step 1 logic (100 lines)
  // Step 2 logic (100 lines)
  // Step 3 logic (100 lines)
  // Form validation (100 lines)
  // Payment processing (100 lines)
  // Error handling (100 lines)
  return <div>{/* 600 lines of JSX */}</div>
}

// ✅ GOOD: Split into focused components
// CheckoutFlow.tsx (150 lines - main container)
function CheckoutFlow() {
  const [step, setStep] = useState(1);
  return (
    <div>
      {step === 1 && <Step1ReviewCart onNext={() => setStep(2)} />}
      {step === 2 && <Step2PaymentInfo onNext={() => setStep(3)} />}
      {step === 3 && <Step3Confirm />}
    </div>
  );
}

// Step1ReviewCart.tsx (120 lines)
function Step1ReviewCart({ onNext }: Props) {
  // Only step 1 logic
  return <div>{/* ... */}</div>;
}

// Step2PaymentInfo.tsx (150 lines)
function Step2PaymentInfo({ onNext }: Props) {
  // Only step 2 logic
  return <div>{/* ... */}</div>;
}

// Step3Confirm.tsx (100 lines)
function Step3Confirm() {
  // Only step 3 logic
  return <div>{/* ... */}</div>;
}
```

### 3.3 One Function, One Purpose

**Rule**: Each function does ONE thing.

```typescript
// ❌ BAD: Multiple purposes
function processCheckout(items, discount, email, cardToken) {
  // Validate items
  const validItems = items.filter(i => i.quantity > 0);
  
  // Calculate total
  const total = validItems.reduce((s, i) => s + i.price, 0) - discount;
  
  // Create Stripe charge
  const charge = await stripe.charges.create({
    amount: total * 100,
    currency: 'usd',
    source: cardToken,
  });
  
  // Send email
  await sendEmail(email, `Order confirmed! Total: $${total}`);
  
  // Create order in database
  const order = await db.order.create({
    items: validItems,
    total,
    email,
  });
  
  return { order, charge };
}

// ✅ GOOD: Each function has one purpose
function validateCheckoutItems(items: CartItem[]): CartItem[] {
  return items.filter(i => i.quantity > 0);
}

function calculateCheckoutTotal(items: CartItem[], discount: number): number {
  return Math.max(0, 
    items.reduce((sum, i) => sum + i.price, 0) - discount
  );
}

async function chargePayment(amount: number, cardToken: string) {
  return stripe.charges.create({
    amount: Math.round(amount * 100),
    currency: 'usd',
    source: cardToken,
  });
}

async function sendConfirmationEmail(email: string, total: number) {
  return sendEmail(email, `Order confirmed! Total: $${total}`);
}

async function createOrder(items: CartItem[], total: number, email: string) {
  return db.order.create({ items, total, email });
}

// Orchestrate together
async function processCheckout(
  items: CartItem[],
  discount: number,
  email: string,
  cardToken: string
) {
  const validItems = validateCheckoutItems(items);
  const total = calculateCheckoutTotal(validItems, discount);
  const charge = await chargePayment(total, cardToken);
  await sendConfirmationEmail(email, total);
  const order = await createOrder(validItems, total, email);
  return { order, charge };
}
```

---

## 4. FEATURE DIRECTORY RULES

### 4.1 Every Feature Has This Structure

**Rule**: Every feature directory must have all these files.

```
feature-name/
├── index.ts              ← REQUIRED: Barrel export
├── types/
│   └── feature.types.ts  ← REQUIRED: TypeScript types
├── services/
│   └── FeatureService.ts ← REQUIRED: Business logic
├── components/           ← REQUIRED: React components (if feature has UI)
│   ├── FeaturePage.tsx
│   └── FeatureCard.tsx
├── hooks/                ← OPTIONAL: React hooks
│   └── useFeature.ts
├── store/                ← OPTIONAL: Zustand store (if needed)
│   └── featureStore.ts
├── __tests__/            ← REQUIRED: Tests
│   ├── FeatureService.test.ts
│   └── useFeature.test.ts
└── README.md             ← REQUIRED: Feature documentation
```

### 4.2 Feature README.md Template

**Rule**: Every feature must document itself.

```markdown
# [Feature Name]

## What is this feature?
Brief description (1-2 sentences).

## Files
- `services/FeatureService.ts`: Business logic
- `components/FeaturePage.tsx`: Main UI
- `hooks/useFeature.ts`: React hook
- `store/featureStore.ts`: State management

## Usage

### As a Component
\`\`\`tsx
import { FeaturePage } from '../../feature-name';

<FeaturePage />
\`\`\`

### As a Hook
\`\`\`tsx
import { useFeature } from '../../feature-name';

const { data, loading } = useFeature();
\`\`\`

### As a Service
\`\`\`tsx
import { FeatureService } from '../../feature-name';

const service = new FeatureService();
await service.doSomething();
\`\`\`

## Tests
Run tests:
\`\`\`bash
npm run test -- feature-name/
\`\`\`

## Architecture
- Service handles logic (fetch, validation, transformation)
- Components handle UI (render, user interaction)
- Hook connects them (subscribe to state, call service)
- Types define contracts (interfaces for data)
```

---

## 5. WELL-COMMENTED CODE RULES

### 5.1 Comments Explain WHY, Not WHAT

**Rule**: Code should be readable. Comments explain reasoning.

```typescript
// ❌ BAD: Comments state the obvious
// Set name to John
name = 'John';

// Add 1 to count
count++;

// Loop through items
for (const item of items) {
  // ...
}

// ✅ GOOD: Comments explain WHY
// User requested 48h to change their email after creation.
// This prevents accidental email changes.
const EMAIL_CHANGE_DELAY_MS = 48 * 60 * 60 * 1000;

// We cache for 12h because:
// 1. Trending updates every 12h
// 2. Cache busts on manual override
// 3. Reduces DB load by 80%
const TRENDING_CACHE_TTL = 12 * 60 * 60 * 1000;

// Stripe charges 2.9% + $0.30. We absorbed this cost
// in the initial funding, so display as-is (no markup).
const STRIPE_FEE_PERCENTAGE = 0.029;
const STRIPE_FEE_FIXED_CENTS = 30;

// Users with fewer than 5 reviews shouldn't be in "Highest Rated"
// sorting because it's not statistically meaningful.
const MIN_REVIEWS_FOR_RATING_SORT = 5;
```

### 5.2 Complex Logic Gets Explanation Block

**Rule**: Before complex code, add a brief explanation block.

```typescript
// ✅ GOOD: Explain complex algorithm
/**
 * Trending score calculation prioritizes recent popularity.
 * 
 * Formula:
 * score = (downloads × 2) + (reviews × 5) + (avgRating × 10) + recencyBoost
 * 
 * recencyBoost:
 * - +20 if published in last 7 days (new agent boost)
 * - +10 if published in last 30 days (recent boost)
 * - 0 otherwise
 * 
 * Result: Trending agents rotate weekly, prevents stagnation.
 */
function calculateTrendingScore(agent: Agent): number {
  const baseScore = (agent.downloads * 2)
    + (agent.reviews.length * 5)
    + (agent.avgRating * 10);

  const daysSincePublish = (Date.now() - agent.publishedAt.getTime()) / (1000 * 60 * 60 * 24);
  
  let recencyBoost = 0;
  if (daysSincePublish < 7) recencyBoost = 20;
  else if (daysSincePublish < 30) recencyBoost = 10;

  return baseScore + recencyBoost;
}
```

### 5.3 JSDoc for Public Functions

**Rule**: All exported functions have JSDoc.

```typescript
/**
 * Calculate total cart value with discount.
 * 
 * @param items - Array of cart items
 * @param discountCode - Optional discount code (e.g., "WELCOME20")
 * @returns Total in cents (never negative)
 * 
 * @example
 * const total = calculateCartTotal(
 *   [{ price: 4900, qty: 1 }], 
 *   'WELCOME20'
 * );
 * // Returns: 3920 (20% discount)
 * 
 * @throws {Error} If discount code is invalid
 */
export function calculateCartTotal(
  items: CartItem[],
  discountCode?: string
): number {
  // ...
}
```

### 5.4 TODO Comments Must Be Tracked

**Rule**: Every TODO must link to an issue.

```typescript
// ✅ GOOD: TODO with issue link
// TODO: Implement email batching when we hit 1000 orders/day
// Issue: https://github.com/OpenOps/agents-fleet/issues/456
// Current: Sending email immediately (good UX, bad scaling)
// Target: Queue emails, send in batches every 5 minutes

// ❌ BAD: TODO with no tracking
// TODO: Fix performance issue
// TODO: Handle error case
```

---

## 6. CLEAN CODE RULES

### 6.1 Variable & Function Names Are Clear

**Rule**: Name must explain purpose in 1-3 words.

```typescript
// ❌ BAD: Unclear names
const x = 10;
const d = new Date();
const calc = (a, b) => a + b;
const proc = () => { };
const tmp = [];

// ✅ GOOD: Clear names
const MAX_CART_ITEMS = 10;
const lastModified = new Date();
const addPrices = (price1: number, price2: number) => price1 + price2;
const processCheckout = () => { };
const pendingOrders = [];

// ✅ GOOD: Descriptive for booleans
const isLoading = false;
const hasError = true;
const shouldShowModal = true;
const canSubmit = false;
```

### 6.2 Functions Are Short (< 20 lines preferred)

**Rule**: If function > 30 lines, split it up.

```typescript
// ❌ BAD: 60-line function (do too much)
function handleCheckout() {
  // Validate items (10 lines)
  // Calculate total (10 lines)
  // Create Stripe charge (10 lines)
  // Send email (10 lines)
  // Create order (10 lines)
  // Update analytics (10 lines)
}

// ✅ GOOD: Each function 5-10 lines
async function handleCheckout() {
  const validItems = validateItems();
  const total = calculateTotal(validItems);
  await processPayment(total);
  await createOrder(validItems, total);
}

async function processPayment(total: number) {
  return stripe.charges.create({ amount: total * 100 });
}

async function createOrder(items: CartItem[], total: number) {
  return db.order.create({ items, total });
}
```

### 6.3 No Magic Numbers

**Rule**: All numbers are constants with meaningful names.

```typescript
// ❌ BAD: Magic numbers
const discount = total * 0.2;  // What's 0.2?
const delay = setTimeout(() => { }, 5000); // Why 5000?
const max = 50; // Max what?

// ✅ GOOD: Named constants
const DISCOUNT_PERCENTAGE = 0.2; // 20% loyalty discount
const PAYMENT_RETRY_DELAY_MS = 5000; // 5 second retry
const MAX_SEARCH_RESULTS = 50;

const discount = total * DISCOUNT_PERCENTAGE;
const delay = setTimeout(() => { }, PAYMENT_RETRY_DELAY_MS);
```

### 6.4 No Deep Nesting

**Rule**: Max 3 levels of nesting. Use guard clauses instead.

```typescript
// ❌ BAD: 4 levels of nesting
function processPayment(user, card, amount) {
  if (user) {
    if (user.verified) {
      if (card.valid) {
        if (amount > 0) {
          // Do payment
        }
      }
    }
  }
}

// ✅ GOOD: Guard clauses (exit early)
function processPayment(user, card, amount) {
  if (!user) throw new Error('No user');
  if (!user.verified) throw new Error('User not verified');
  if (!card.valid) throw new Error('Card invalid');
  if (amount <= 0) throw new Error('Invalid amount');

  // Do payment (only reaches here if all checks pass)
}
```

### 6.5 DRY: Don't Repeat Yourself

**Rule**: If code appears twice, extract to shared function.

```typescript
// ❌ BAD: Repeated code
// In cart/services/CartService.ts
async function getCart() {
  const response = await fetch('/api/cart');
  if (!response.ok) throw new Error('Failed to fetch cart');
  return response.json();
}

// In checkout/services/CheckoutService.ts
async function getCheckoutData() {
  const response = await fetch('/api/checkout');
  if (!response.ok) throw new Error('Failed to fetch checkout');
  return response.json();
}

// ✅ GOOD: Extract to shared utility
// shared/utils/api.ts
export async function fetchJSON(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}`);
  return response.json();
}

// In cart/services/CartService.ts
async function getCart() {
  return fetchJSON('/api/cart');
}

// In checkout/services/CheckoutService.ts
async function getCheckoutData() {
  return fetchJSON('/api/checkout');
}
```

---

## 7. BEST PRACTICES RESEARCH RULES (CRITICAL)

### 7.1 Before Coding: Research the Standard

**Rule**: Before implementing any feature, research the industry standard first.

```
Process:
1. Google: "[feature] best practices 2026"
2. Check: GitHub trending repos in that category
3. Read: Official documentation (Stripe, React, etc.)
4. Compare: 2-3 approaches
5. Document: Decision in comments/README
6. Code: Based on research, not guesses
```

**Examples**:

```
📚 Checkout Flow:
  → Google: "checkout best practices 2026"
  → Read: Stripe.com/payments/checkout docs
  → GitHub: Search "ecommerce checkout"
  → Decision: 3-step (not 5+) based on Stripe data
  → Document: In CHECKOUT_IMPLEMENTATION_PROMPT.md

📚 Payment Processing:
  → Google: "Stripe payment processing guide"
  → Read: https://docs.stripe.com/payments
  → GitHub: Search "stripe-react-integration"
  → Decision: Use Stripe Elements (not custom form)
  → Document: In checkout/README.md

📚 State Management:
  → Google: "React state management 2026"
  → Read: https://zustand-demo.pmnd.rs/
  → GitHub: "zustand" repo
  → Decision: Zustand (not Redux)
  → Document: In architecture/state-management.md
```

### 7.2 Document Research Decisions

**Rule**: Every architectural decision must reference research.

```typescript
// ✅ GOOD: Decision documented with source
/**
 * We use Zustand for state (not Redux) because:
 * 
 * Research:
 * - React docs recommend Zustand for simple state
 * - Zustand has 80% smaller bundle than Redux (28KB vs 150KB)
 * - GitHub stars: Zustand 32K, Redux 65K (both proven)
 * 
 * Source: https://react.dev/reference/react/useReducer#alternatives
 */
export const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set(state => ({ items: [...state.items, item] }))
}));
```

### 7.3 Vite-Specific Best Practices

**Rule**: Use Vite conventions (not Create React App patterns).

```typescript
// ✅ GOOD: Vite patterns
import.meta.env.VITE_API_URL  // Environment variables (Vite)
import.meta.hot // HMR (Hot Module Replacement)

// ❌ BAD: CRA patterns
process.env.REACT_APP_API_URL // Doesn't work in Vite
process.env.NODE_ENV // Use import.meta.env.MODE instead

// ✅ GOOD: Vite code splitting
const Component = lazy(() => import('./Component')); // Vite auto-chunks

// ✅ GOOD: Vite glob imports
const modules = import.meta.glob('./**/*.module.css');
```

### 7.4 React 19 Best Practices

**Rule**: Use latest React 19 patterns (not old patterns).

```typescript
// ✅ GOOD: React 19
import { use } from 'react'; // New in React 19

// ❌ BAD: Old patterns
import { useCallback, useMemo } from 'react'; // Mostly unnecessary now

// ✅ GOOD: React 19 server components ready
export async function ComponentWithData() {
  const data = await fetch('/api/data'); // Direct await
  return <div>{data}</div>;
}

// ✅ GOOD: React 19 actions
export function SearchForm() {
  const handleSearch = async (formData: FormData) => {
    const query = formData.get('q');
    await search(query);
  };
  return <form action={handleSearch}>{/* ... */}</form>;
}
```

### 7.5 TypeScript Strict Mode Best Practices

**Rule**: Keep TypeScript strict. No `any`.

```typescript
// ❌ BAD: Using any (disables type safety)
function processData(data: any) {
  return data.value; // Type error not caught
}

// ✅ GOOD: Proper types
interface Data {
  value: string;
  timestamp: Date;
}

function processData(data: Data): string {
  return data.value; // Type-safe
}

// ❌ BAD: Unknown without checking
function handle(data: unknown) {
  return data.property; // Error: data could be anything
}

// ✅ GOOD: Check unknown before use
function handle(data: unknown): string {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Invalid data');
  }
  
  if (!('property' in data)) {
    throw new Error('Missing property');
  }
  
  return (data as any).property;
}
```

---

## 8. RELATIVE IMPORTS ONLY (NO @)

### 8.1 Project Uses Flat Structure (No src/)

**Rule**: No `@` aliases. Use relative paths for imports.

```typescript
// Project structure (flat, no src/)
project/
├── cart/
│   ├── services/
│   └── index.ts
├── checkout/
│   ├── components/
│   └── index.ts
├── shared/
│   ├── utils/
│   └── index.ts
└── App.tsx

// ✅ GOOD: Relative imports
// In checkout/components/CheckoutFlow.tsx
import { useCart } from '../../cart'; // Relative path
import { Button } from '../../shared/components/Button'; // Relative path
import { formatPrice } from '../../shared/utils/formatPrice'; // Relative path

// ❌ BAD: Using @ alias (not allowed)
import { useCart } from '@/cart'; // NO
import { Button } from '@/shared/components/Button'; // NO
```

### 8.2 Import Order

**Rule**: Group imports in this order:

```typescript
// 1. External packages
import React, { useState } from 'react';
import { z } from 'zod';
import { create } from 'zustand';

// 2. Relative imports from parent directories
import { useEventBus } from '../../shared/hooks/useEventBus';
import { Button } from '../../shared/components/Button';
import { formatPrice } from '../../shared/utils/formatPrice';

// 3. Relative imports from sibling directories
import { CartService } from '../services/CartService';
import { useCart } from '../hooks/useCart';

// 4. Current directory imports
import { CartItem } from './CartItem';
import { cartStore } from '../store/cartStore';
```

### 8.3 File Extensions in Imports

**Rule**: Vite handles extensions automatically. Include .ts/.tsx if needed for clarity.

```typescript
// ✅ GOOD: Let Vite resolve (most common)
import { Button } from '../../shared/components/Button';

// ✅ ALSO GOOD: Explicit extensions (for clarity)
import { Button } from '../../shared/components/Button.tsx';
import { formatPrice } from '../../shared/utils/formatPrice.ts';

// ❌ AVOID: Wrong extensions
import { Button } from '../../shared/components/Button.js'; // Wrong
```

---

## 9. DIRECTORY-LEVEL ORGANIZATION RULES

### 9.1 Each Directory Has Purpose

| Directory | Purpose | What Goes Here |
|-----------|---------|----------------|
| `feature-name/` | Feature code | Components, services, hooks, store |
| `feature-name/types/` | Type definitions | TypeScript interfaces, types |
| `feature-name/services/` | Business logic | API calls, data transformation |
| `feature-name/components/` | UI components | React components only |
| `feature-name/hooks/` | React hooks | Custom hooks (useXxx) |
| `feature-name/store/` | State management | Zustand stores |
| `feature-name/__tests__/` | Tests | Jest/Vitest test files |
| `shared/` | Reusable code | Common components, utils, hooks |
| `shared/components/` | Common UI | Button, Modal, ErrorBoundary, etc. |
| `shared/hooks/` | Common hooks | useDebounce, useFetch, useEventBus |
| `shared/utils/` | Utilities | Formatting, validation, helpers |
| `styles/` | Global styles | CSS, theme, design tokens |

### 9.2 No Random Files at Root

**Rule**: Every .ts/.tsx file must be in a feature or shared directory.

```
✅ GOOD:
project/
├── cart/
│   └── components/CartPage.tsx
├── checkout/
│   └── services/CheckoutService.ts
├── shared/
│   └── components/Button.tsx
└── App.tsx  (only top-level file)

❌ BAD:
project/
├── utils.ts                    (WRONG: should be in shared/utils/)
├── Button.tsx                  (WRONG: should be in shared/components/)
├── api.ts                      (WRONG: should be in shared/services/)
├── Cart/
├── Checkout/
└── App.tsx
```

---

## 10. TESTING RULES

### 10.1 Test Every Service/Hook

**Rule**: All business logic (services, hooks) must have tests.

```
Coverage Target:
- Services: 100% (critical path)
- Hooks: 80%+
- Components: 70%+ (UI changes are OK)
```

### 10.2 Test File Location

**Rule**: Tests live in `__tests__/` directory inside feature.

```
cart/
├── services/
│   └── CartService.ts
├── hooks/
│   └── useCart.ts
└── __tests__/
    ├── CartService.test.ts
    └── useCart.test.ts
```

### 10.3 E2E Tests for User Flows

**Rule**: Full checkout flow has E2E tests (Playwright).

```typescript
// e2e/checkout.spec.ts
test('User can add to cart, checkout, and confirm', async ({ page }) => {
  // Browse
  await page.goto('/marketplace');
  
  // Add to cart
  await page.click('[data-testid="add-to-cart"]');
  
  // Proceed to checkout
  await page.click('[data-testid="checkout-button"]');
  
  // Fill payment
  await page.fill('[data-testid="email"]', 'test@example.com');
  
  // Confirm
  await page.click('[data-testid="confirm-payment"]');
  
  // Verify success
  await expect(page).toHaveURL(/\/order\/\d+/);
});
```

---

## 11. CODE REVIEW CHECKLIST

Before submitting PR, verify:

- [ ] No `any` types (TypeScript strict)
- [ ] No `@` aliases (relative imports only)
- [ ] Every feature in its directory
- [ ] index.ts barrel export exists
- [ ] Comments explain WHY, not WHAT
- [ ] Functions < 30 lines (split if needed)
- [ ] Files < 300 lines (split if needed)
- [ ] No magic numbers (use constants)
- [ ] Tests pass (`npm run test`)
- [ ] Lint passes (`npm run lint`)
- [ ] Type check passes (`npm run type-check`)
- [ ] No cross-feature imports (use EventBus)
- [ ] README.md documents feature
- [ ] Commit message explains WHY
- [ ] No regression (test added for bug fix)
- [ ] Best practices researched (if new technique)

---

## 12. GIT WORKFLOW RULES

### 12.1 Commit Message Format

```
[feature-name] Brief description (< 50 chars)

Longer explanation (if needed):
- Why this change?
- What was the problem?
- How does it solve it?

Fixes: #123 (if bug fix)
Closes: #456 (if feature complete)
```

### 12.2 Atomic Commits

**Rule**: One logical change per commit.

```bash
# ✅ GOOD: Separate concerns
git commit -m "[cart] Add useCart hook"
git commit -m "[cart] Add CartService tests"

# ❌ BAD: Multiple unrelated changes
git commit -m "[cart] Fix bug, add tests, and refactor components"
```

---

## 13. ENFORCEMENT

### 13.1 Pre-Commit Hooks

```bash
# .husky/pre-commit
npm run test -- --changed
npm run lint
npm run type-check
```

### 13.2 CI/CD Checks

```yaml
# .github/workflows/ci.yml
- name: Test
  run: npm run test

- name: Lint
  run: npm run lint

- name: Type Check
  run: npm run type-check

- name: Build
  run: npm run build
```

### 13.3 Code Review Requirements

- ✅ All checks pass (CI green)
- ✅ No `any` types
- ✅ Tests added/updated
- ✅ No regression patterns
- ✅ Follows SRP (single responsibility)
- ✅ Comments explain WHY
- ✅ No cross-feature imports

---

## 14. QUICK START FOR NEW DEVELOPERS

### Day 1: Understand Architecture

1. Read this file (ARCHITECTURE_RULES.md)
2. Explore existing feature directories
3. Notice: cart/, checkout/, shared/ pattern
4. Notice: No `src/`, no `@/` aliases

### Day 2: Implement First Feature

1. Create feature directory: `new-feature/`
2. Add structure: `types/`, `services/`, `components/`, `__tests__/`
3. Create `index.ts` barrel export
4. Create `README.md` documenting feature
5. Write services first (business logic)
6. Write components (UI)
7. Write tests (80%+ coverage)

### Day 3+: Follow Rules

- Single responsibility ✅
- Well-commented code ✅
- Clean code ✅
- Anti-regression ✅
- Relative imports ✅

---

## 📚 References

**Clean Code**:
- Robert C. Martin - "Clean Code" book
- https://google.github.io/styleguide/tsguide.html

**Architecture**:
- https://react.dev/reference/rules-of-hooks
- https://patterns.dev/posts/container-presentational-pattern/

**React 19**:
- https://react.dev/blog/2024/12/19/react-19
- https://react.dev/reference

**TypeScript**:
- https://www.typescriptlang.org/docs/handbook/
- https://ts.dev/ (TypeScript for JavaScript developers)

**Vite**:
- https://vitejs.dev/guide/

**Testing**:
- https://vitest.dev/
- https://playwright.dev/

---

**Version**: 1.0.0  
**Last Updated**: 2026-01-12  
**Enforcement**: Pre-commit hooks + Code review  
**Audience**: All developers on OpenOps Agents Fleet Marketplace

