# OpenOps Agents Fleet Marketplace - Frontend

## Setup

### Prerequisites
- Node.js 20+ LTS
- Vite 5.x
- React 19

### Installation

```bash
cd frontend
npm install
cp .env.example .env
```

### Environment Configuration

Copy `.env.example` to `.env` and fill in your API URL and Stripe key:

```bash
VITE_API_URL="http://localhost:3001/api/v1"
VITE_STRIPE_PUBLIC_KEY="pk_test_..."
```

### Development

```bash
npm run dev              # Start Vite dev server on port 3000
npm run test             # Run all tests
npm run test:ui          # Interactive test UI
npm run lint             # Check code quality
```

### Build & Deploy

```bash
npm run build            # Build for production
npm run preview          # Preview production build
```

## Project Structure

```
frontend/
├── src/
│   ├── modules/         # Feature modules
│   │   ├── marketplace/  # Browse listings
│   │   ├── checkout/     # Purchase flow
│   │   ├── vendor/       # Vendor dashboard
│   │   ├── deployment/   # Deployment guides
│   │   └── auth/         # Authentication
│   ├── ui/
│   │   ├── components/   # Shared UI components
│   │   └── theme/        # Tailwind config, tokens
│   ├── core/             # Infrastructure
│   │   ├── api.ts        # API client (Axios)
│   │   ├── i18n.ts       # i18n setup
│   │   └── EventBus.ts   # Cross-module events
│   ├── locales/          # i18n translations
│   ├── monitoring/       # Performance, error tracking
│   └── App.tsx           # Root component
├── tests/
│   ├── unit/             # Unit tests
│   ├── integration/      # Integration tests
│   └── e2e/              # End-to-end tests (Playwright)
└── package.json
```

## Architecture

### Module Structure
Each feature module follows this structure:
```
modules/feature/
├── hooks/                # React hooks (useFeature, etc.)
├── services/             # API calls, business logic
├── ui/                   # Components
├── store/                # Zustand state management
├── vault/                # Dexie IndexedDB storage
└── index.ts              # Barrel export
```

### State Management
- **UI State**: Zustand v5.0.9 with `devtools` + `subscribeWithSelector`
- **Server State**: React Query for async operations
- **Storage**: Dexie for IndexedDB (large blobs, binary data)

### Styling
- Tailwind CSS v3.4 for utility-first CSS
- RTL support enabled (Arabic localization)
- Responsive design, ≥4.5:1 contrast ratio, ARIA labels

## Testing

```bash
npm run test              # Run tests once
npm run test:watch       # Watch mode
npm run test:ui          # Open Vitest UI
npm run test:coverage    # Coverage report
```

### E2E Testing
```bash
npm run test:e2e         # Run Playwright tests
```

## Code Quality

```bash
npm run lint             # ESLint check
npm run lint:fix         # Auto-fix issues
npm run format           # Prettier format
```

## Localization (EN/AR)

Translations stored in `src/locales/{en,ar}.json`. Use `useTranslation()` hook from `react-i18next`.

RTL layout handled automatically via Tailwind's `dir` utility and browser RTL support.

## Performance Targets

- **p95 UI interaction**: <500ms
- **Download start**: <2s
- **Core Web Vitals**: Pass

Use `npm run test:coverage` to track metrics.
