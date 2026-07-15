# Architecture Overview

High-level architecture of the Pokeori application.

## Tech Stack
See [Tech Stack](/docs/architecture/tech-stack.md) for full dependency list.

| Layer | Technology |
|-------|-------------|
| Runtime | Bun 1.3.13 |
| Frontend | Next.js 16 (App Router), React 19, TypeScript 5 |
| Backend | Payload CMS 3 (headless CMS) |
| Database | PostgreSQL (via @payloadcms/db-postgres) |
| Cache | Redis (via ioredis) |
| Styling | Tailwind CSS 4, shadcn/ui, Radix UI |
| State | Zustand, React Context |
| Auth | Payload CMS built-in authentication |

## Folder Structure
See [Folder Structure](/docs/architecture/folder-structure.md) for full tree.

```
src/
├── app/              # Next.js App Router (frontend + API routes)
├── collections/      # Payload CMS collections (Users, Pokemon, etc.)
├── components/       # Reusable React components
├── context/          # React Context providers
├── data/             # Game data modules (Pokemon, moves, items)
├── hooks/            # Custom React hooks
├── utilities/        # Helper functions (battle engine, game logic)
├── styles/           # Global CSS
└── types/            # TypeScript type definitions
```

## Key Architectural Decisions
1. **Payload CMS**: Used for both admin panel and backend API
2. **Game Data Modules**: Static data (Pokemon, moves) stored as TypeScript modules
3. **Zustand**: Lightweight state for client-side UI state
4. **Redis**: Caching and real-time features (battle state, rate limiting)
5. **PWA**: Service worker for offline support
