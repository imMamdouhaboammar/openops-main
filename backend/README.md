# OpenOps Agents Fleet Marketplace - Backend

## Setup

### Prerequisites
- Node.js 20+ LTS
- PostgreSQL 16+
- Docker (optional, for PostgreSQL + S3)

### Installation

```bash
cd backend
npm install
cp .env.example .env
```

### Environment Configuration

Copy `.env.example` to `.env` and fill in your credentials:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/marketplace_dev"
STRIPE_API_KEY="sk_test_..."
JWT_SECRET="your-secret-key"
```

### Database Setup

```bash
npm run db:migrate      # Run migrations
npm run db:seed         # Seed test data
```

### Development

```bash
npm run dev             # Start dev server on port 3001
npm run test            # Run all tests
npm run lint            # Check code quality
```

### Build & Deploy

```bash
npm run build           # Compile TypeScript
npm start               # Run production server
```

## Project Structure

```
backend/
├── src/
│   ├── controllers/     # HTTP request handlers
│   ├── services/        # Business logic
│   ├── models/          # Data models (Prisma)
│   ├── middleware/      # Express middleware
│   ├── validators/      # Zod validation schemas
│   ├── routes/          # API routes
│   ├── utils/           # Utilities (JWT, crypto, etc.)
│   └── types/           # TypeScript types
├── tests/
│   ├── unit/            # Unit tests
│   ├── integration/      # Integration tests
│   ├── contract/        # API contract tests
│   └── performance/     # Performance tests
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Database migrations
└── package.json
```

## API Documentation

OpenAPI 3.0 spec available at `../specs/002-agents-fleet-marketplace/contracts/api.openapi.yaml`

### Key Endpoints

- `POST /api/v1/auth/signup` - Create account
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/listings` - Browse listings
- `POST /api/v1/orders` - Create order (checkout)
- `POST /api/v1/orders/{id}/download` - Get download link
- `POST /api/v1/vendors/upload-package` - Upload agent archive

## Testing

```bash
npm run test              # Run tests once
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
```

## Code Quality

```bash
npm run lint             # ESLint check
npm run lint:fix         # Auto-fix issues
npm run format           # Prettier format
```
