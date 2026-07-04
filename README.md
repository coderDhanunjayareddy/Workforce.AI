# Workforce AI

Workforce AI is an enterprise SaaS prototype for hiring, training, deploying and managing AI Employees across business workflows. The application is built from the documentation in `docs/` and currently includes the foundation, marketing website, authentication flows and the Workforce Dashboard command center.

## Current Scope

- Premium public marketing website
- Complete mock authentication and onboarding flows
- Protected application shell with sidebar, topbar, command palette, notifications and theme support
- Workforce Overview dashboard at `/app` and `/app/workforce`
- Mock service layer for employees, campaigns, contacts, knowledge, conversations, analytics, notifications and organization data
- Reusable UI and shared product components

## Tech Stack

- React 19
- TypeScript
- Vite
- TanStack Router
- TanStack Query
- Tailwind CSS v4
- Recharts
- Lucide React
- Framer Motion
- React Hook Form
- Zod

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview
```

## Main Routes

- `/` - Marketing landing page
- `/features` - Features page
- `/solutions` - Solutions page
- `/pricing` - Pricing page
- `/about` - About page
- `/contact` - Contact page
- `/login` - Login
- `/register` - Registration
- `/forgot-password` - Password recovery
- `/reset-password` - Password reset
- `/verify-email` - Email verification
- `/onboarding` - Organization onboarding
- `/app` - Workforce Overview
- `/app/workforce` - Workforce Overview
- `/app/employees` - AI Workforce foundation route
- `/app/knowledge` - Knowledge Center foundation route
- `/app/contacts` - Contacts foundation route
- `/app/campaigns` - Campaigns foundation route
- `/app/conversations` - Conversations foundation route
- `/app/analytics` - Analytics foundation route
- `/app/organization` - Organization Settings foundation route
- `/app/settings` - Settings foundation route

## Documentation

The product, architecture, design system, mock data and phase specifications live in `docs/`. These markdown files are the source of truth for implementation decisions.

Key documents:

- `docs/01_PROJECT_VISION.md`
- `docs/02_PRODUCT_PHILOSOPHY.md`
- `docs/03_FRONTEND_ARCHITECTURE.md`
- `docs/04_DESIGN_SYSTEM.md`
- `docs/05_MOCK_DATA_SPEC.md`
- `docs/06_IMPLEMENTATION_RULES.md`
- `docs/07_CLAUDE_CODE_EXECUTION_PROMPT.md`

## Architecture

The frontend follows a service-first flow:

```text
UI components
  -> hooks
  -> services
  -> mock API
  -> future backend
```

UI components do not import mock data directly. Server-like data is accessed through TanStack Query hooks and typed service functions so the mock API can later be replaced by production endpoints with minimal UI changes.

## Notes

- `node_modules/`, `dist/`, env files, logs and local agent metadata are intentionally ignored.
- The current backend is mocked in `src/mocks/`.
- The app uses Nova Insurance Pvt. Ltd. as the connected demo organization.
