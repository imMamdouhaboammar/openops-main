# Copilot project instructions — "$BrandNameArabic$".com.sa

This repository is a TypeScript + Next.js (App Router) site with next-intl, Tailwind CSS v4, and Vitest. Follow these project-specific conventions to be productive fast.

## Architecture and routing
- App Router lives in `src/app/[locale]/**` with locales `ar` and `en`. Default is `ar` and locale prefix is always on (see `src/i18n/routing.ts`). Add new pages inside `[locale]` to get localized routes automatically.
- Internationalization is configured via `next-intl`. Request-level messages resolve in `src/i18n/request.ts` which loads `messages/{locale}.json`. Prefer next-intl navigation wrappers exported from `src/i18n/routing.ts`: `Link`, `redirect`, `useRouter`, `usePathname`.
- Middleware `src/middleware.ts` applies i18n and adds strict security headers. Matchers handle `/`, `/(ar|en)/**`, and `/api/**`.
- SEO endpoints live in `src/app/robots.ts` and `src/app/sitemap.ts`.

## Data and content model
- Strongly typed content lives in `src/data/**` with shared types in `src/data/types.ts` (e.g., `LocalizedString`, `ServicePageData`, `PortfolioCase`). Keep data co-located with tests (see existing `*.test.ts` next to data files).
- Translatable UI strings are in `/messages/ar.json` and `/messages/en.json`. When adding keys, ensure both locales are updated.
- Public assets are under `public/` (e.g., `/media`, `/fonts`, `/brand`). For remote images, whitelist hosts in `next.config.ts`.

## Styling and UI helpers
- Tailwind v4 is configured (`tailwind.config.ts`, `postcss.config.mjs`). Use `clsx` and `tailwind-merge` to compose class names.
- Shared components live in `src/components/**`; prefer importing with the alias `@/*`.

## Path aliases and imports
- TS path alias `@/* -> ./src/*` is defined in `tsconfig.json` and mirrored in `vitest.config.ts` alias. Import like `import { services } from '@/data/services'`.

## Build, test, and quality workflows
- Scripts (`package.json`):
  - Dev: `npm run dev` (Next dev)
  - Build: `npm run build` / Start: `npm run start`
  - Lint: `npm run lint` (extends Next core-web-vitals; see `eslint.config.mjs`)
  - Typecheck: `npm run typecheck`
  - Tests: `npm run test` (watch), `npm run test:unit` (CI run), `npm run test:coverage`
- Vitest is set up with `jsdom`, Testing Library, and `vitest-axe` in `src/test/setup.ts`. Coverage excludes `**/layout.tsx` and `**/page.tsx`—test behavior via components/utils instead of full pages.

## Performance and security
- `next.config.ts` enables modern image formats, sets cache headers for `/media/**` and `/fonts/**`, disables `X-Powered-By`, and outputs `standalone`.
- Additional security headers are added in `src/middleware.ts` (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).

## Practical examples
- Navigation that respects locale:
  `import { Link } from '@/i18n/routing'; /* <Link href="/services">...</Link> auto-prefixes */`
- Loading localized messages on the server: see `src/i18n/request.ts` and reference keys from `/messages/*.json`.
- Using typed content:
  `import type { ServicePageData } from '@/data/types';`
  `import { services } from '@/data/services';`

## When adding features
- Place new routes under `src/app/[locale]/feature/...` and keep strings in `/messages/*.json`.
- Keep data structures typed in `src/data/types.ts`; avoid `any`.
- For images, prefer local `public/media` assets or whitelist remote hosts in `next.config.ts`.
- Write unit tests next to the code (e.g., `src/data/foo.test.ts` or `src/components/Button.test.tsx`) and rely on Testing Library patterns.

If anything above is unclear or you find a pattern not captured here, leave a note and propose an update to this file.
