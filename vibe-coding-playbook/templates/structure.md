# structure.md

**This file documents your project's architecture and folder layout. Copy and customize for your project.**

---

## Project Overview

**Name:** [Your project name]  
**Description:** [1-2 sentence pitch]  
**Repository:** [GitHub URL]  
**Status:** [Development | Beta | Stable]

---

## Tech Stack

### Frontend

```
Framework:        React 19 with TypeScript
Build tool:       Vite v5+
Styling:          Tailwind CSS v4
State management: Zustand
HTTP client:      axios
UI components:    Headless UI / Radix UI
Testing:          Vitest + React Testing Library
Linting:          ESLint + Prettier
```

### Backend

```
Runtime:          Node.js 20+
Framework:        Express.js 4.18+
Language:         TypeScript
Database:         PostgreSQL 15+
ORM/Query:        Prisma or raw SQL
Authentication:   JWT + passport.js
Validation:       Zod or joi
Testing:          Jest
Logging:          Winston or bunyan
```

### Infrastructure

```
Frontend hosting: Vercel
Backend hosting:  Render or Railway
Database:         Neon PostgreSQL (or Supabase)
Cache:            Redis (optional)
CDN:              Cloudflare
Container:        Docker (optional)
```

---

## Folder Structure

### Frontend (`src/`)

```
src/
├── components/                 # React components (reusable)
│   ├── ui/                    # Base UI (Button, Input, Modal, etc)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── layout/                # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   └── features/              # Feature-specific components
│       ├── TaskCard.tsx
│       ├── TaskList.tsx
│       └── TaskForm.tsx
│
├── pages/                      # Page-level components
│   ├── Home.tsx
│   ├── Tasks.tsx
│   ├── Profile.tsx
│   └── NotFound.tsx
│
├── hooks/                      # Custom React hooks
│   ├── useTasks.ts
│   ├── useAuth.ts
│   └── useLocalStorage.ts
│
├── services/                   # API & external service calls
│   ├── api.ts                 # Axios instance + base config
│   ├── taskApi.ts             # Task-related API calls
│   ├── authApi.ts             # Auth-related API calls
│   └── storage.ts             # IndexedDB or localStorage
│
├── store/                      # State management (Zustand)
│   ├── taskStore.ts           # Task store
│   ├── authStore.ts           # Auth store
│   └── uiStore.ts             # UI state (modals, notifications)
│
├── types/                      # TypeScript interfaces & types
│   ├── index.ts               # Re-export all types
│   ├── task.ts                # Task types
│   ├── user.ts                # User types
│   └── api.ts                 # API response types
│
├── utils/                      # Utility functions
│   ├── date.ts                # Date helpers
│   ├── format.ts              # String formatting
│   ├── validation.ts          # Form validation
│   └── common.ts              # Common helpers
│
├── styles/                     # Global styles
│   ├── globals.css
│   ├── variables.css          # CSS variables (colors, spacing)
│   └── keyframes.css          # Animations
│
├── App.tsx                     # Root component
├── main.tsx                    # Vite entry point
├── index.css                   # Global styles
└── vite-env.d.ts             # Vite types

tests/
├── components/                 # Component tests
├── hooks/                      # Hook tests
├── services/                   # Service tests
└── utils/                      # Utility tests
```

### Backend (`backend/`)

```
backend/
├── src/
│   ├── routes/                 # API endpoint definitions
│   │   ├── auth.routes.ts     # Auth endpoints
│   │   ├── tasks.routes.ts    # Task endpoints
│   │   └── users.routes.ts    # User endpoints
│   │
│   ├── controllers/            # Route handlers (business logic)
│   │   ├── authController.ts
│   │   ├── taskController.ts
│   │   └── userController.ts
│   │
│   ├── middleware/             # Express middleware
│   │   ├── auth.ts            # JWT verification
│   │   ├── errorHandler.ts    # Global error handler
│   │   ├── logger.ts          # Request logging
│   │   └── validation.ts      # Request validation
│   │
│   ├── services/              # Business logic / utilities
│   │   ├── authService.ts     # Auth logic
│   │   ├── taskService.ts     # Task logic
│   │   └── emailService.ts    # Email sending
│   │
│   ├── models/                # Database models/schemas
│   │   ├── User.ts
│   │   ├── Task.ts
│   │   └── index.ts
│   │
│   ├── utils/                 # Utility functions
│   │   ├── jwt.ts
│   │   ├── password.ts
│   │   └── logger.ts
│   │
│   ├── types/                 # TypeScript types
│   │   └── index.ts
│   │
│   ├── config/                # Configuration files
│   │   ├── database.ts
│   │   ├── env.ts
│   │   └── constants.ts
│   │
│   ├── migrations/            # Database migrations (Prisma)
│   │   └── (auto-generated)
│   │
│   └── app.ts                 # Express app setup
│   └── server.ts              # Start server
│
├── tests/                      # Test files
│   ├── auth.test.ts
│   ├── tasks.test.ts
│   └── fixtures.ts
│
├── .env.example               # Environment variables template
├── .env                       # (gitignored)
├── prisma/
│   └── schema.prisma          # Database schema
├── package.json
├── tsconfig.json
└── README.md
```

### Root

```
project-root/
├── README.md                  # Main project README
├── package.json               # Root package (monorepo, if needed)
├── pnpm-workspace.yaml        # If using pnpm workspaces
├── docker-compose.yml         # Local dev environment
├── Dockerfile                 # Container configuration
├── .github/
│   └── workflows/
│       ├── test.yml           # Run tests on push
│       └── deploy.yml         # Deploy on main
├── docs/
│   ├── architecture.md        # System design
│   ├── api.md                 # API documentation
│   ├── setup.md               # Local development
│   └── deployment.md          # Production deployment
├── spec-kit/                  # Vibe Coding specs
│   ├── 01-database.md
│   ├── 02-auth.md
│   ├── 03-api-tasks.md
│   └── 04-ui-components.md
├── agent.md                   # AI agent constitution
└── structure.md               # (This file)
```

---

## Key Decisions Explained

### Why Zustand over Redux?

Redux is powerful but complex. Zustand is:
- ✅ 10x less boilerplate
- ✅ TypeScript-friendly
- ✅ Easy to test
- ✅ Scales to 10+ stores without issues

Switch to Redux if you have 20+ global state stores.

### Why Prisma over raw SQL?

Prisma gives:
- ✅ Type-safe queries
- ✅ Migrations (version control for schema)
- ✅ Better errors
- ✅ Auto-generated types

Use raw SQL if you need complex analytics queries.

### Why Vite over Webpack?

Vite:
- ✅ 10x faster dev start
- ✅ Hot module replacement (instant feedback)
- ✅ Smaller bundle
- ✅ Better error messages

Webpack if you need advanced customization (rare).

### Why Express over Next.js?

Express (backend):
- ✅ Simple, minimal
- ✅ Full control
- ✅ Works with any frontend

Next.js (full-stack):
- ✅ All-in-one (useful if small team)
- ✅ Built-in API routes

Choose based on team size: small team → Next.js, separate frontend/backend teams → Express.

---

## Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/taskflow
DATABASE_POOL_SIZE=20

# Auth
JWT_SECRET=your_secret_here_min_32_chars
JWT_EXPIRY=3600

# Google OAuth
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Hosting
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173

# Logging
LOG_LEVEL=info
```

---

## Development Workflow

```bash
# 1. Install dependencies
pnpm install

# 2. Copy environment template
cp .env.example .env

# 3. Start PostgreSQL + Redis (Docker)
docker-compose up -d

# 4. Run database migrations
pnpm run db:migrate

# 5. Start development servers
pnpm run dev

# Frontend: http://localhost:5173
# Backend: http://localhost:3000
```

---

## Build & Deployment

```bash
# Frontend build
pnpm run build

# Output: dist/

# Backend build
pnpm run build

# Output: dist/

# Deploy to production
pnpm run deploy
```

---

## Monorepo Setup (Optional)

If using pnpm workspaces:

```yaml
# pnpm-workspace.yaml
packages:
  - "frontend"
  - "backend"
```

Run scripts from root:

```bash
pnpm -r install
pnpm --filter frontend dev
pnpm --filter backend dev
```

---

## Code Quality

```bash
# Type checking
pnpm run type-check

# Linting
pnpm run lint

# Format code
pnpm run format

# Tests
pnpm run test
pnpm run test:coverage

# Security audit
npm audit
```

---

**Customize this file for your project. Update as architecture evolves.**
