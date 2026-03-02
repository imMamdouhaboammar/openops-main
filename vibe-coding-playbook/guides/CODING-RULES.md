# Comprehensive Coding Rules for AI Agents

**This guide extracts OpenOps' battle-tested coding rules and shows you exactly what to feed your AI agents for production-grade output.**

---

## 📋 Table of Contents

1. [Security Rules](#security-rules)
2. [Code Quality Rules](#code-quality-rules)
3. [Architecture Rules](#architecture-rules)
4. [Data Handling Rules](#data-handling-rules)
5. [UI & Design System Rules](#ui--design-system-rules)
6. [Testing Rules](#testing-rules)
7. [Performance Rules](#performance-rules)
8. [Error Handling Rules](#error-handling-rules)
9. [Type Safety Rules](#type-safety-rules)
10. [Documentation Rules](#documentation-rules)
11. [Deployment Rules](#deployment-rules)

---

## Security Rules

### 🔒 Rule S1: Secrets Management

**NEVER, EVER hardcode secrets.**

```typescript
// ❌ WRONG
const API_KEY = "sk-abc123def456";
const DB_PASSWORD = "admin123";
const JWT_SECRET = "mysecretkey";

// ✅ RIGHT
const API_KEY = process.env.OPENAI_API_KEY;
const DB_PASSWORD = process.env.DATABASE_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

// In .env (gitignored)
OPENAI_API_KEY=sk-abc123def456
DATABASE_PASSWORD=admin123
JWT_SECRET=mysecretkey_min_32_chars_required
```

**AI instruction to add to agent.md:**
```markdown
## Secrets Rule
- No hardcoded API keys, passwords, or tokens in code
- All secrets stored in environment variables (.env)
- Default error when secret missing: "Missing required environment variable: {VAR_NAME}"
- CI/CD must inject secrets at runtime, not build time
```

---

### 🔒 Rule S2: Input Validation (Server-Side Always)

**All user input must be validated on the server, ALWAYS.**

```typescript
// ❌ WRONG - Client-side only
function validateEmail(email) {
  return email.includes('@');  // Not enough
}

// ✅ RIGHT - Server-side validation
import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password min 8 chars').regex(/[A-Z]/, 'Must include uppercase'),
});

// In Express endpoint
app.post('/api/login', (req, res) => {
  const validation = LoginSchema.safeParse(req.body);
  
  if (!validation.success) {
    return res.status(422).json({ errors: validation.error });
  }
  
  // Proceed with validated data
});
```

**AI instruction to add:**
```markdown
## Input Validation Rule
- EVERY endpoint validates input server-side using Zod (or joi)
- Client-side validation is UX enhancement, never security
- Return 422 Unprocessable Entity on validation failure
- Never reveal internal validation rules to users (keep errors generic)
- Example: "Invalid data provided" instead of "Email regex failed"
```

---

### 🔒 Rule S3: SQL Injection Prevention

**Use parameterized queries, NEVER string concatenation.**

```typescript
// ❌ WRONG - SQL Injection vulnerability
const query = `SELECT * FROM users WHERE email = '${email}'`;
db.execute(query);

// ✅ RIGHT - Parameterized queries
const query = 'SELECT * FROM users WHERE email = ?';
db.execute(query, [email]);

// With Prisma (recommended)
const user = await prisma.user.findUnique({
  where: { email: email }  // Prisma handles parameterization
});
```

**AI instruction to add:**
```markdown
## SQL Injection Prevention
- Use Prisma ORM (not raw SQL) for all queries
- If raw SQL required, ALWAYS use parameterized queries
- Pattern: db.query('SELECT * FROM users WHERE email = ?', [userEmail])
- Never concatenate user input into SQL strings
- Codacy/ESLint will catch violations—fail the build if found
```

---

### 🔒 Rule S4: Authentication & JWT Tokens

**Implement JWT properly: short-lived tokens + secure storage.**

```typescript
// ✅ RIGHT implementation
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = await db.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  
  const passwordMatch = await bcryptjs.compare(password, user.password_hash);
  if (!passwordMatch) return res.status(401).json({ error: 'Invalid credentials' });
  
  // Create token (1 hour expiry)
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  
  res.json({ token, expires_in: 3600 });
});

// Protected endpoint
app.get('/api/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json(decoded);
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});
```

**AI instruction to add:**
```markdown
## JWT Authentication Rules
- Token expiry: 1 hour (short-lived)
- Refresh token: optional, 7 days if used
- Algorithm: HS256 only
- Secret: minimum 32 characters
- Token stored client-side: httpOnly cookie (preferred) or secure localStorage
- Endpoint unauthenticated: /auth/login, /auth/register only
- All other endpoints: require valid JWT
```

---

### 🔒 Rule S5: CORS Configuration

**Explicit CORS, never wildcard (`*`).**

```typescript
// ❌ WRONG
app.use(cors());  // Allows any origin

// ✅ RIGHT
app.use(cors({
  origin: process.env.FRONTEND_URL,  // e.g., https://app.example.com
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

**AI instruction:**
```markdown
## CORS Rules
- origin: Set to specific frontend URL (from env var)
- credentials: true if using httpOnly cookies
- methods: Explicitly list allowed HTTP methods
- Never use origin: '*'
```

---

### 🔒 Rule S6: Rate Limiting

**Protect endpoints from abuse.**

```typescript
import rateLimit from 'express-rate-limit';

// Strict limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 5,  // 5 requests
  message: 'Too many login attempts, try again later',
  standardHeaders: true,  // Include RateLimit-* headers
  legacyHeaders: false,
});

app.post('/api/auth/login', authLimiter, (req, res) => {
  // Handle login
});

// Standard limit for regular endpoints
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,  // 1 minute
  max: 100,  // 100 requests
});

app.use('/api/', apiLimiter);
```

**AI instruction:**
```markdown
## Rate Limiting Rules
- Auth endpoints (login, register): 5 attempts / 15 minutes per IP
- Public endpoints: 100 requests / minute per IP
- Standard endpoints: 1,000 requests / hour per user
- Return HTTP 429 with Retry-After header
- Include rate limit info in response headers
```

---

## Code Quality Rules

### 📊 Rule Q1: No `console.log()` in Production Code

**Logging should be structured and configurable.**

```typescript
// ❌ WRONG
console.log('User logged in:', user);
console.error('Database error:', error);

// ✅ RIGHT - Structured logging
import logger from './utils/logger';  // Winston, Pino, or similar

logger.info('User login successful', { userId: user.id, email: user.email });
logger.error('Database error', { error: error.message, code: error.code });

// In production, logs go to: file | cloud (Datadog, CloudWatch, etc.)
```

**Logger setup example:**
```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export default logger;
```

**AI instruction:**
```markdown
## Logging Rules
- NO console.log() in any production code
- Use logger.info(), logger.error(), logger.warn()
- Log structure: { timestamp, level, message, context }
- Never log passwords, API keys, or PII
- Log level in prod: 'info'
- Log level in dev: 'debug'
```

---

### 📊 Rule Q2: No `any` Type in TypeScript

**Strict mode: every variable must have a type.**

```typescript
// ❌ WRONG
function processUser(user: any) {
  return user.email;
}

// ✅ RIGHT
interface User {
  id: string;
  email: string;
  name: string;
}

function processUser(user: User): string {
  return user.email;
}
```

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true
  }
}
```

**AI instruction:**
```markdown
## Type Safety Rules
- TypeScript strict mode: ALWAYS
- No any types (ESLint: @typescript-eslint/no-explicit-any: error)
- Export types alongside implementations
- Use interfaces for contracts, types for unions
```

---

### 📊 Rule Q3: Function Size Limit

**Functions must be <50 lines. Components <300 lines.**

```typescript
// ❌ WRONG - 150 lines
function processAndValidateAndSaveUser(userData) {
  // ... 150 lines of mixed logic
}

// ✅ RIGHT - Decomposed
function validateUserData(userData): UserValidation {
  // 20 lines
}

function saveUser(validated: UserValidation): Promise<User> {
  // 15 lines
}

async function processUser(userData) {
  const validated = validateUserData(userData);
  return saveUser(validated);
}
```

**AI instruction:**
```markdown
## Function Size Rules
- Functions: Max 50 lines
- Components: Max 300 lines
- If larger, decompose into smaller functions/components
- Reason: readability, testability, reusability
```

---

### 📊 Rule Q4: Comment Strategy

**Comments explain WHY, not WHAT. Code explains WHAT.**

```typescript
// ❌ WRONG - Obvious comments
const email = user.email;  // Get email from user

// ✅ RIGHT - Context comments
const email = user.email;  // Format: firstname.lastname@company.com (per LDAP sync spec)

// ❌ WRONG - Over-commenting
// Extract year from date
const year = new Date().getFullYear();

// ✅ RIGHT - Comment complex logic only
// We add 1 year buffer for subscription renewal grace period
const expiryDate = addDays(subscriptionStart, 365 + 365);
```

**AI instruction:**
```markdown
## Comment Rules
- Comment WHY decisions (not WHAT code does)
- Keep comments close to code
- Remove commented-out code (version control has history)
- No TODO comments without context (use tickets instead)
- Complex algorithms deserve detailed comments
```

---

## Architecture Rules

### 🏗️ Rule A1: Modular Folder Structure

**Organize by feature, not by type.**

```
❌ WRONG - Organized by type
src/
  ├── components/
  │   ├── UserProfile.tsx
  │   ├── TaskCard.tsx
  │   └── Modal.tsx
  ├── hooks/
  │   ├── useAuth.ts
  │   ├── useTasks.ts
  │   └── useModal.ts
  ├── store/
  │   ├── authStore.ts
  │   ├── taskStore.ts
  │   └── uiStore.ts

✅ RIGHT - Organized by feature
src/
  ├── modules/
  │   ├── auth/
  │   │   ├── components/
  │   │   │   └── Profile.tsx
  │   │   ├── hooks/
  │   │   │   └── useAuth.ts
  │   │   ├── store/
  │   │   │   └── authStore.ts
  │   │   └── index.ts
  │   ├── tasks/
  │   │   ├── components/
  │   │   │   ├── TaskCard.tsx
  │   │   │   └── TaskList.tsx
  │   │   ├── hooks/
  │   │   │   └── useTasks.ts
  │   │   ├── store/
  │   │   │   └── taskStore.ts
  │   │   └── index.ts
  ├── shared/
  │   ├── components/
  │   │   └── Modal.tsx
  │   ├── utils/
  │   └── types/
```

**AI instruction:**
```markdown
## Folder Structure Rules
- Organize by feature (domain), not by type
- No cross-module imports (use events or shared exports)
- Each module has: components, hooks, store, types, index.ts
- Shared code in src/shared/ only
```

---

### 🏗️ Rule A2: Dependency Injection & Event Bus

**Loosely coupled via events, not direct imports.**

```typescript
// ❌ WRONG - Tightly coupled
import { taskStore } from '../tasks/store/taskStore';

function handleTaskComplete(taskId) {
  taskStore.updateTask(taskId, { status: 'done' });  // Direct dependency
}

// ✅ RIGHT - Event bus
import { eventBus } from '@/core/EventBus';

function handleTaskComplete(taskId) {
  eventBus.emit({
    type: 'TASK_COMPLETED',
    payload: { taskId },
    meta: { correlationId: generateId() }
  });
}

// Listener elsewhere
eventBus.on('TASK_COMPLETED', (event) => {
  taskStore.updateTask(event.payload.taskId, { status: 'done' });
});
```

**AI instruction:**
```markdown
## Event Bus Rules
- No direct module-to-module imports
- Communicate via events (defined in core/EventTypes.ts)
- Every event has: type, payload, meta (correlationId)
- Listeners subscribe once at startup (core/initializeCores.ts)
```

---

### 🏗️ Rule A3: API Layer Abstraction

**All API calls go through services, never directly in components.**

```typescript
// ❌ WRONG - Direct API call in component
function TaskList() {
  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);
}

// ✅ RIGHT - Service layer
// services/api.ts
export const taskApi = {
  getTasks: () => fetch('/api/tasks').then(res => res.json()),
  createTask: (data) => fetch('/api/tasks', { method: 'POST', body: JSON.stringify(data) }).then(res => res.json()),
};

// hooks/useTasks.ts
export function useTasks() {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    taskApi.getTasks().then(setTasks);
  }, []);
  
  return tasks;
}

// Component
function TaskList() {
  const tasks = useTasks();
  return <div>{tasks.map(t => <TaskCard key={t.id} task={t} />)}</div>;
}
```

**AI instruction:**
```markdown
## API Layer Rules
- All HTTP calls in services/ folder
- Services export functions (not classes)
- Components use hooks that call services
- Error handling: normalize errors via services
- Caching: handled at service/hook level
```

---

## Data Handling Rules

### 🗃️ Rule D1: Immutable State

**Never mutate state directly.**

```typescript
// ❌ WRONG - Mutation
const tasks = [...getTasks()];
tasks[0].title = 'Updated title';
setTasks(tasks);

// ✅ RIGHT - Immutable
const tasks = getTasks();
const updated = tasks.map(t => 
  t.id === taskId ? { ...t, title: 'Updated title' } : t
);
setTasks(updated);

// With Zustand store
const taskStore = create((set) => ({
  tasks: [],
  updateTask: (taskId, updates) => set((state) => ({
    tasks: state.tasks.map(t => 
      t.id === taskId ? { ...t, ...updates } : t
    )
  }))
}));
```

**AI instruction:**
```markdown
## State Immutability Rules
- Never mutate state directly
- Use: spread operator, map, filter (create new arrays)
- Store: Zustand with immutable patterns
- Why: React dependency tracking, predictability, debugging
```

---

### 🗃️ Rule D2: Private by Default

**Assume data is sensitive; prove otherwise.**

```typescript
// ❌ WRONG - Public by default
interface User {
  id: string;
  email: string;
  password_hash: string;  // Exposed to frontend
  api_keys: string[];     // Exposed to frontend
}

// ✅ RIGHT - Private by default
// Backend returns
interface UserResponse {
  id: string;
  email: string;
  name: string;
  // password_hash, api_keys never sent to frontend
}

// Backend stores sensitive data
interface User {
  id: string;
  email: string;
  password_hash: string;  // Hashed, never serialized
  api_keys: string[];     // Encrypted, never serialized
  settings: { theme: string };
}
```

**AI instruction:**
```markdown
## Data Privacy Rules
- Assume data is PII (personally identifiable)
- Encrypt at rest: passwords, API keys, sensitive fields
- Never send hashed passwords to frontend
- Use database views to expose only necessary fields
- GDPR compliance: users can export/delete data
```

---

## UI & Design System Rules

### 🎨 Rule UI1: Design Tokens Over Hardcoded Values

**All colors, spacing, and typography must come from design tokens, never hardcoded.**

```typescript
// ❌ WRONG - Hardcoded colors
function Button() {
  return <button style={{ backgroundColor: '#0068ff', padding: '16px' }}>Click me</button>;
}

// ✅ RIGHT - Using design tokens from Tailwind
function Button() {
  return <button className="bg-primary-blue px-4 py-4 text-white rounded-lg">Click me</button>;
}

// Tokens file: ui/theme/tokens.ts
export const colors = {
  primary: {
    navy: '#000033',
    blue: '#0068ff',
  },
  accent: {
    purple: '#9347ff',
    gold: '#f1ba39',
    green: '#00c377',
  },
  surface: {
    white: '#ffffff',
    light_blue: '#eef6ff',
    light_purple: '#f5eeff',
    light_yellow: '#fcfaeb',
    light_green: '#e7f7f0',
  },
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
};
```

**Tailwind config integration:**

```typescript
// tailwind.config.ts
import { colors } from './src/ui/theme/tokens';

export default {
  theme: {
    extend: {
      colors: {
        'primary-navy': colors.primary.navy,
        'primary-blue': colors.primary.blue,
        'accent-purple': colors.accent.purple,
        'accent-gold': colors.accent.gold,
        'accent-green': colors.accent.green,
        // ... all tokens mapped
      },
      spacing: {
        xs: colors.spacing.xs,
        sm: colors.spacing.sm,
        // ... all spacing tokens
      },
    },
  },
};
```

**AI instruction to add:**

```markdown
## Design Tokens Rule
- All colors from tokens (never #hex in components)
- All spacing from spacing scale (4px, 8px, 12px, etc.)
- All typography from font families defined in config
- Tailwind utility-first approach
- Token names follow: {category}-{type}-{shade} (e.g., bg-primary-blue)
- Exception: Rarely dynamic values (computed, user-generated) may be inline
```

---

### 🎨 Rule UI2: Icon Usage Standards (react-icons)

**Use react-icons consistently; prefer single library per project.**

```typescript
// ✅ RIGHT - Consistent icon library
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';     // Radix UI icons
import { FaRegStar, FaStar } from 'react-icons/fa';              // Font Awesome (FA)
import { LuCopy } from 'react-icons/lu';                          // Lucide icons
import { SiOpenai, SiGithub } from 'react-icons/si';              // Simple icons (brand)

// ❌ WRONG - Mixing multiple icon libraries without clear pattern
import * as MUI from '@mui/icons-material';
import * as Bootstrap from 'react-bootstrap-icons';
import * as Heroicons from 'react-icons/hi';
// Confusing: which library is the standard?

// ✅ RIGHT - Create icon wrapper for consistency
// ui/components/Icon.tsx
import { IconType } from 'react-icons';

interface IconProps {
  icon: IconType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
};

export function Icon({ icon: Comp, size = 'md', color = 'currentColor', className }: IconProps) {
  return <Comp className={`${sizeMap[size]} ${className}`} color={color} />;
}

// Usage
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

function SearchBar() {
  return (
    <div className="flex items-center gap-2">
      <Icon icon={MagnifyingGlassIcon} size="md" color="text-slate-600" />
      <input type="text" placeholder="Search..." />
    </div>
  );
}
```

**Icon library selection (pick ONE per project):**

```
Option A: @radix-ui/react-icons
├── Best for: Component libraries, UI systems
├── Pro: Simple API, consistent design, accessibility built-in
├── Con: Limited icon set (~280 icons)
├── Package: npm install @radix-ui/react-icons

Option B: react-icons (multiple libraries bundled)
├── Best for: General-purpose apps
├── Pro: Huge icon set (60k+), many libraries (FA, Heroicons, Lucide)
├── Con: Larger bundle if not tree-shaken properly
├── Package: npm install react-icons
├── Usage: import { FaIcon } from 'react-icons/fa'
│        import { HiIcon } from 'react-icons/hi'
│        import { LuIcon } from 'react-icons/lu'

Option C: lucide-react (Lucide icons)
├── Best for: Modern, minimal design systems
├── Pro: Beautiful consistent style, 500+ icons, great API
├── Con: Fewer brand/social icons
├── Package: npm install lucide-react
├── Usage: import { Copy, Download } from 'lucide-react'

Recommendation for OpenOps:
- Radix UI icons: For internal UI system (buttons, navigation, controls)
- Font Awesome: For brand/social icons (OpenAI, GitHub, LinkedIn, X)
- Lucide: Alternative for modern, minimal projects
```

**AI instruction to add:**

```markdown
## Icon Rules
- Use @radix-ui/react-icons for component icons (primary choice)
- Use react-icons/fa for brand icons (OpenAI, GitHub, social)
- Create Icon wrapper component for consistency
- Icon size scale: sm (4x4), md (5x5), lg (6x6), xl (8x8)
- Icon colors via Tailwind classes (text-slate-600, text-accent-blue)
- Wrap icon in <span> if using dynamic color: <span className={color}><Icon /></span>
- Alt text for accessibility: <Icon role="img" aria-label="search" />
```

---

### 🎨 Rule UI3: Component Primitives

**Use shared primitives from ui/components/, never raw HTML buttons/inputs.**

```typescript
// ❌ WRONG - Raw HTML
export function TaskCard() {
  return (
    <div>
      <h2>Task Title</h2>
      <button onClick={handleClick}>Edit</button>
      <input type="text" placeholder="Search..." />
    </div>
  );
}

// ✅ RIGHT - Shared primitives
import { Button, TextField, Card, CardHeader, CardBody } from '@/ui/components';

export function TaskCard() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Task Title</h2>
      </CardHeader>
      <CardBody>
        <TextField placeholder="Search..." />
        <Button variant="primary" onClick={handleClick}>Edit</Button>
      </CardBody>
    </Card>
  );
}

// Primitives file: ui/components/Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  children,
  className,
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-primary-blue text-white hover:bg-primary-blue-dark',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${variants[variant]} ${sizes[size]} rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Spinner size="sm" /> : children}
    </button>
  );
}

// Barrel export: ui/components/index.ts
export { Button } from './Button';
export { TextField } from './TextField';
export { Card, CardHeader, CardBody } from './Card';
export { Spinner } from './Spinner';
```

**AI instruction to add:**

```markdown
## Component Primitives Rule
- NO raw <button>, <input>, <div> in application code
- Import from @/ui/components for all UI elements
- Primitives must include: Button, TextField, Card, Modal, Alert, Toast
- Each primitive: exports props interface, handles accessibility (ARIA)
- Variants: primary, secondary, danger (for actions)
- Sizes: sm, md, lg (must be consistent across all primitives)
- All primitives export from ui/components/index.ts (barrel)
```

---

### 🎨 Rule UI4: Accessibility & Dark Mode

**All components must support RTL, ARIA labels, and dark mode.**

```typescript
// ✅ RIGHT - Accessible component
interface CardProps {
  title: string;
  description: string;
  isLoading?: boolean;
}

export function Card({ title, description, isLoading }: CardProps) {
  return (
    <article
      role="region"
      aria-label={title}
      aria-busy={isLoading}
      className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700"
    >
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
      <p className="mt-2 text-slate-600 dark:text-slate-400">{description}</p>
      
      {isLoading && (
        <Spinner
          aria-label="Loading content"
          className="mt-4"
        />
      )}
    </article>
  );
}

// Dark mode in Tailwind (class strategy)
// tailwind.config.ts
export default {
  darkMode: 'class',  // Controlled via .dark class on root element
  // ...
};

// Theme toggle hook
// ui/hooks/useTheme.ts
export function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check localStorage or system preference
    const stored = localStorage.getItem('theme');
    if (stored) {
      setIsDark(stored === 'dark');
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return { isDark, toggleTheme: () => setIsDark(!isDark) };
}
```

**Accessibility checklist for components:**

```
ARIA Labels
☑️ role="button" for clickable divs
☑️ aria-label for icon buttons
☑️ aria-live="polite" for dynamic content
☑️ aria-busy for loading states
☑️ aria-disabled for disabled state

Focus Management
☑️ Keyboard navigable (Tab key)
☑️ Focus ring visible (focus:ring-2)
☑️ Tab order logical

Color Contrast
☑️ ≥4.5:1 ratio for text
☑️ ≥3:1 ratio for large text
☑️ No color-only information (use text + icon)

Dark Mode
☑️ Text colors: text-slate-900 dark:text-white
☑️ Backgrounds: bg-white dark:bg-slate-900
☑️ Borders: border-slate-200 dark:border-slate-700
☑️ Test both modes (manual or screenshot comparison)

RTL Support
☑️ Use CSS logical properties: start/end (not left/right)
☑️ Example: pl-4 → ps-4 (padding-start)
☑️ Flexbox: flex-row-reverse for RTL
☑️ Icons: Flip horizontally if needed (mirror: true)
```

**AI instruction to add:**

```markdown
## Accessibility & Dark Mode Rules
- Every interactive element: ARIA role, label, or title
- Focus management: Keyboard-navigable, visible focus ring
- Color contrast: 4.5:1 minimum for normal text
- Dark mode: Every color token has dark: variant
- RTL: Use CSS logical properties (start/end, not left/right)
- Test: Lighthouse audit ≥90, axe DevTools for accessibility
```

---

### 🎨 Rule UI5: Tailwind CSS Usage

**Utility-first with consistency; avoid arbitrary values.**

```typescript
// ❌ WRONG - Arbitrary values, magic numbers
function Card() {
  return <div className="p-[17px] w-[486px] bg-[#f1f5f9]">Card</div>;
}

// ✅ RIGHT - Consistent spacing scale
function Card() {
  return <div className="p-4 w-96 bg-slate-100 dark:bg-slate-900">Card</div>;
}

// Spacing scale (always use these)
4px   = 1   (px-1)
8px   = 2   (px-2)
12px  = 3   (px-3)
16px  = 4   (px-4)
20px  = 5   (px-5)
24px  = 6   (px-6)
32px  = 8   (px-8)
40px  = 10  (px-10)
48px  = 12  (px-12)
64px  = 16  (px-16)

// ✅ RIGHT - Responsive design with breakpoints
function Grid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Single column on mobile, 2 on tablet, 3 on desktop */}
    </div>
  );
}

// Responsive breakpoints
sm  = 640px  (tablet)
md  = 768px  (small laptop)
lg  = 1024px (laptop)
xl  = 1280px (large screen)
2xl = 1536px (very large screen)

// ✅ RIGHT - Group utilities for complex states
function Button() {
  return (
    <button className="
      px-4 py-2
      bg-primary-blue text-white
      hover:bg-primary-blue-dark
      focus:ring-2 focus:ring-primary-blue focus:outline-none
      disabled:opacity-50 disabled:cursor-not-allowed
      transition-colors duration-200
      rounded-lg font-medium text-sm
    ">
      Submit
    </button>
  );
}

// ❌ WRONG - Inline styles or CSS modules when Tailwind exists
function Input() {
  return (
    <input style={{ padding: '16px', border: '1px solid #ccc' }} />
  );
}

// ✅ RIGHT - All styling via Tailwind
function Input() {
  return (
    <input className="px-4 py-4 border border-slate-300 dark:border-slate-600 rounded-lg" />
  );
}
```

**AI instruction to add:**

```markdown
## Tailwind CSS Rules
- Utility-first: Use Tailwind classes, never inline styles
- No arbitrary values: Use design tokens from config
- Responsive: Mobile-first (base) → sm → md → lg → xl
- Dark mode: dark: prefix for dark variant
- Hover/Focus: hover: focus: active: states built-in
- Group utilities: For complex components (button, input, card)
- Avoid: CSS modules, emotion, styled-components (use Tailwind)
```

---

## Testing Rules

### ✅ Rule T1: Minimum Coverage

**80% coverage minimum for all code.**

```typescript
// jest.config.js
module.exports = {
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

// Run
npm test -- --coverage
```

**AI instruction:**
```markdown
## Testing Rules
- Coverage target: ≥80%
- Don't test frameworks (React, Express built-ins)
- Test: business logic, utils, services
- Happy path + error cases required
- Use fixtures/factories for test data
```

---

### ✅ Rule T2: Test Organization

**Tests live near code.**

```
✅ RIGHT
src/
  ├── utils/
  │   ├── date.ts
  │   └── date.test.ts
  ├── services/
  │   ├── taskApi.ts
  │   └── taskApi.test.ts
  └── components/
      ├── TaskCard.tsx
      └── TaskCard.test.tsx
```

---

## Performance Rules

### ⚡ Rule P1: Core Web Vitals

**Measure what matters; optimize for user experience.**

```
Lighthouse Target: >90
├── LCP (Largest Contentful Paint): <2.5s
├── FID (First Input Delay): <100ms
├── CLS (Cumulative Layout Shift): <0.1
└── TTFB (Time to First Byte): <0.6s
```

**API Performance:**
```
Response time: <500ms per endpoint
Database query: <100ms
Frontend bundle: <200kb gzipped
```

**AI instruction:**
```markdown
## Performance Rules
- Measure: Lighthouse score, Web Vitals, response times
- Optimize: lazy loading, code splitting, database indexes
- Monitor: real user metrics via analytics
```

---

## Error Handling Rules

### 🚨 Rule E1: No Silent Failures

**Every error must be caught and logged.**

```typescript
// ❌ WRONG - Silent failure
fetch('/api/tasks')
  .then(res => res.json())
  .catch(() => {});  // Error silently ignored

// ✅ RIGHT - Proper error handling
async function getTasks() {
  try {
    const response = await fetch('/api/tasks');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    logger.error('Failed to fetch tasks', { error: error.message });
    throw new AppError('Failed to load tasks. Please try again.', 'TASK_FETCH_ERROR');
  }
}
```

**AI instruction:**
```markdown
## Error Handling Rules
- NEVER silent failures (empty catch blocks)
- Log every error with context
- User-facing errors: plain language
- Internal errors: full stack trace in logs
- Return appropriate HTTP status codes
```

---

### 🚨 Rule E2: Standardized Error Responses

**All errors follow same format.**

```typescript
// Standard error response
interface ErrorResponse {
  error: {
    code: string;        // Machine-readable: INVALID_INPUT
    message: string;     // User-friendly: "Invalid email format"
    details?: object;    // Extra context (optional)
  };
}

// Examples
// 400 Bad Request
{ error: { code: 'INVALID_EMAIL', message: 'Please provide a valid email address' } }

// 401 Unauthorized
{ error: { code: 'AUTH_REQUIRED', message: 'Please log in to continue' } }

// 403 Forbidden
{ error: { code: 'INSUFFICIENT_PERMISSIONS', message: 'You do not have access to this resource' } }

// 500 Server Error
{ error: { code: 'SERVER_ERROR', message: 'Something went wrong. Our team has been notified.' } }
```

**AI instruction:**
```markdown
## Error Response Rules
- Always return JSON: { error: { code, message } }
- Never expose internal details (stack traces, SQL errors)
- Provide error code for frontend error handling
- Message should be actionable
```

---

## Type Safety Rules

### 🔷 Rule TS1: Strict TypeScript Configuration

**tsconfig.json must enforce strictness.**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    
    // Strict mode
    "strict": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "noImplicitReturns": true,
    "noUncheckedIndexedAccess": true,
    
    // Additional safety
    "exactOptionalPropertyTypes": true,
    "noFallthroughCasesInSwitch": true,
    "useUnknownInCatchVariables": true
  }
}
```

**AI instruction:**
```markdown
## TypeScript Config Rules
- Strict mode: ALWAYS
- No implicit any
- No unchecked indexed access
- ESLint + TypeScript: Run both before commit
```

---

## Documentation Rules

### 📖 Rule Doc1: README Per Module

**Every folder with exported code has a README.**

```markdown
# Tasks Module

## Purpose
Manage user tasks: create, read, update, delete, filter.

## Exports
- `useTasks()` — Hook for task list
- `TaskCard` — Component for single task
- `taskApi.getTasks()` — Service call

## Usage
```typescript
import { useTasks, TaskCard } from '@/modules/tasks';

function TaskList() {
  const tasks = useTasks();
  return tasks.map(t => <TaskCard key={t.id} task={t} />);
}
```

## Dependencies
- `@/core/EventBus` — Event communication
- `@/modules/auth` — User authentication

## Tests
Run: `npm test -- tasks.test.ts`
Coverage: 85%
```

---

### 📖 Rule Doc2: Library and SDK Selection

**Selecting the right libraries and SDKs is critical for project success. Follow these guidelines to ensure compatibility, maintainability, and performance.**

#### Best Practices

1. **Compatibility**: Ensure the library or SDK is compatible with your tech stack and project requirements. Verify that it supports the versions of frameworks and tools you are using.
2. **Maintenance**: Prefer libraries with active maintenance and a strong community. Check the frequency of updates and the responsiveness of maintainers to issues.
3. **Performance**: Evaluate the performance impact of the library on your application. Use tools like Lighthouse or WebPageTest to measure performance metrics.
4. **Security**: Check for known vulnerabilities using tools like `npm audit` or `yarn audit`. Ensure the library follows security best practices and has a clear security policy.
5. **Documentation**: Ensure the library has comprehensive and up-to-date documentation. Good documentation is essential for ease of use and troubleshooting.

#### Recommendations

- **Frontend Libraries**:
  - **React**: Use for building user interfaces. Ensure compatibility with the latest React features and hooks.
  - **Tailwind CSS**: Use for styling to ensure consistency and maintainability. Tailwind's utility-first approach simplifies styling and promotes reusability.
  - **Radix UI**: Use for accessible and customizable UI components. Radix UI provides a solid foundation for building accessible and responsive interfaces.

- **Backend Libraries**:
  - **Express.js**: Use for building robust and scalable APIs. Express.js is lightweight and flexible, making it ideal for backend development.
  - **Prisma**: Use for database access and management. Prisma provides a type-safe and intuitive API for database operations.
  - **Zod**: Use for runtime type checking and validation. Zod ensures data integrity and simplifies validation logic.

- **Testing Libraries**:
  - **Vitest**: Use for fast and efficient unit testing. Vitest is optimized for Vite projects and provides a seamless testing experience.
  - **React Testing Library**: Use for testing React components. React Testing Library encourages best practices for testing React applications.
  - **Jest**: Use for comprehensive testing solutions. Jest is versatile and widely used for testing JavaScript applications.

- **Utilities**:
  - **Lodash**: Use for utility functions to simplify complex operations. Lodash provides a wide range of utility functions for common tasks.
  - **Date-fns**: Use for date manipulation and formatting. Date-fns is lightweight and modular, making it ideal for handling dates.

#### Guidelines

1. **Evaluation Process**:
   - **Research**: Gather information about the library, its features, and its community support. Look for reviews, tutorials, and case studies.
   - **Prototype**: Create a small prototype to test the library's functionality and performance. This helps in identifying potential issues early.
   - **Review**: Assess the prototype and gather feedback from the team. Consider factors like ease of use, performance, and integration.
   - **Decision**: Make an informed decision based on the evaluation. Document the rationale for selecting the library.

2. **Integration**:
   - **Installation**: Follow the library's installation instructions and ensure it is properly integrated into your project. Use package managers like npm or yarn for dependency management.
   - **Configuration**: Configure the library according to your project's requirements. Ensure that the configuration is documented and version-controlled.
   - **Testing**: Write tests to ensure the library works as expected in your application. Include unit tests, integration tests, and end-to-end tests as appropriate.

3. **Maintenance**:
   - **Updates**: Regularly update the library to the latest version to benefit from new features and security patches. Use tools like Dependabot to automate dependency updates.
   - **Monitoring**: Monitor the library's performance and usage in your application. Use logging and monitoring tools to track performance metrics and identify issues.
   - **Documentation**: Keep the library's documentation up-to-date and ensure it is accessible to the team. Document any custom configurations or integrations.

#### Example: Selecting a UI Library

```markdown
# UI Library Selection

## Requirements
- Accessible and customizable components
- Active maintenance and community support
- Comprehensive documentation

## Options
1. **Radix UI**: Meets all requirements and integrates well with Tailwind CSS. Provides a solid foundation for building accessible and responsive interfaces.
2. **Material UI**: Popular but may require additional configuration for accessibility. Offers a wide range of pre-built components.
3. **Chakra UI**: Good documentation but may not be as customizable. Provides a modular and flexible approach to UI development.

## Decision
Selected **Radix UI** for its accessibility features and seamless integration with Tailwind CSS. The decision was based on the library's strong community support and comprehensive documentation.
```

#### Additional Resources

- **npm Trends**: Use to compare the popularity and download statistics of libraries. This tool helps in understanding the adoption rate and community trust in the library.
- **GitHub Stars and Issues**: Check the number of stars and open issues to gauge community support and activity. A high number of stars and a low number of open issues indicate a healthy and active project.
- **Stack Overflow and Forums**: Look for discussions and solutions related to the library to understand common issues and their resolutions. Active community discussions are a good indicator of the library's reliability and support.

#### Checklist for Library and SDK Selection

Use this checklist to ensure a thorough evaluation process:

```markdown
- [ ] Compatibility with the current tech stack
- [ ] Active maintenance and community support
- [ ] Performance impact on the application
- [ ] Security vulnerabilities and best practices
- [ ] Comprehensive and up-to-date documentation
- [ ] Prototype created and tested
- [ ] Feedback gathered from the team
- [ ] Integration and configuration documented
- [ ] Tests written and passing
- [ ] Monitoring and logging set up
```

By following these best practices, recommendations, and guidelines, you can ensure that the libraries and SDKs selected for the OpenOps project contribute to a robust, maintainable, and high-performance application. This structured approach minimizes risks and maximizes the benefits of using third-party libraries and SDKs.

---

## Deployment Rules

## Deployment Rules

### 🚀 Rule Dep1: Pre-Deployment Checklist

**Never deploy without verifying:**

```bash
✅ All tests passing
✅ Coverage ≥80%
✅ ESLint: 0 warnings
✅ TypeScript: 0 errors
✅ Lighthouse: >90
✅ Security audit: 0 critical
✅ Environment variables set
✅ Database migrations applied
✅ Monitoring configured
✅ Rollback plan documented
```

**CI/CD Pipeline:**

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run type-check
      - run: npm run lint
      - run: npm test -- --coverage
      - run: npm audit
      
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm run build
      - run: npm run lighthouse
      
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: npm run deploy
```

---

## 🎯 How to Use These Rules in Your Projects

### Step 1: Extract Rules for Your Stack

Create an `agent.md` based on your tech stack:

```markdown
# agent.md

## Tech Stack
- Frontend: React 19, TypeScript strict, Tailwind, Radix UI icons
- Backend: Express.js, PostgreSQL, Prisma
- Testing: Vitest, React Testing Library

## Must-Follow Rules

### Security
- S1: No hardcoded secrets (use env vars)
- S2: Server-side input validation (Zod)
- S3: Parameterized queries only (Prisma)
- S4: JWT tokens with 1-hour expiry
- S5: Explicit CORS configuration
- S6: Rate limiting on auth endpoints

### Code Quality
- Q1: No console.log() in production
- Q2: No 'any' types (ESLint enforces)
- Q3: Functions <50 lines, components <300 lines
- Q4: Comments explain WHY, not WHAT

### Architecture
- A1: Modular folder structure (by feature)
- A2: Event bus for cross-module communication
- A3: All API calls via services/hooks

### UI & Design System
- UI1: Design tokens only (no hardcoded colors)
- UI2: @radix-ui/react-icons for UI icons + react-icons/fa for brands
- UI3: Shared primitives from ui/components/ only
- UI4: Dark mode + RTL + ARIA labels mandatory
- UI5: Tailwind CSS utilities, no inline styles

## Validation
Before every commit:
  npm run type-check
  npm run lint
  npm run test
  npm run build
```

### Step 2: Feed to AI Agent

When requesting code generation:

```
"Generate a product card component following this agent.md:

[Paste full agent.md]

Tech Stack: React 19 + TypeScript + Tailwind + Radix Icons

Must follow:
- Code quality rules (Q1-Q4)
- UI rules (UI1-UI5)
- No hardcoded colors (use design tokens)
- Accessible (ARIA labels, dark mode support)
- Return component + tests (target: 85% coverage)"
```

### Step 3: Validate Generated Code

Before merging, run:

```bash
# Type check
npm run type-check

# Linting
npm run lint

# Tests
npm run test -- --coverage

# Security
npm audit

# Build
npm run build

# Accessibility
npm run lighthouse  # Target: >90
```

---

## 📋 Pre-Generated Code Quality Checklist

Print this and use for every code review:

```
SECURITY
☑️ No hardcoded secrets
☑️ Input validation on all endpoints
☑️ SQL injection prevention (parameterized)
☑️ JWT tokens with expiry
☑️ CORS not using wildcard
☑️ Rate limiting configured

CODE QUALITY
☑️ No console.log() in production
☑️ TypeScript strict mode
☑️ Functions <50 lines
☑️ Comments explain WHY
☑️ No unused imports
☑️ ESLint passes

ARCHITECTURE
☑️ Modular folder structure
☑️ No cross-module imports
☑️ Event bus for communication
☑️ Services abstract API calls
☑️ README in every module

UI & DESIGN SYSTEM
☑️ All colors from design tokens
☑️ Icons from @radix-ui or react-icons/fa
☑️ Components use shared primitives
☑️ Dark mode variants included
☑️ ARIA labels on interactive elements
☑️ No hardcoded colors or spacing

TESTING
☑️ 80%+ coverage
☑️ Happy path + error cases
☑️ Tests near code files
☑️ Fixtures/factories used

PERFORMANCE
☑️ Lighthouse >90
☑️ Response time <500ms
☑️ Bundle size <200kb gzipped

ERROR HANDLING
☑️ No silent failures
☑️ Standardized error responses
☑️ Proper HTTP status codes
```

---

**Feed these rules to your AI agent and watch quality skyrocket.** ✅
