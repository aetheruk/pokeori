# Testing Strategy

Pokeori uses Bun's built-in test runner for utility, data-integrity, and
schema validation tests.

## Test Types
### Unit Tests
- Test utility functions (`src/utilities/`)
- Test custom hooks (`src/hooks/`)
- Test game logic (battle engine, reward calculations)
- Test API helper behavior, such as request IDs and error response shape

### Integration Tests
- Test API routes (`src/app/api/`)
- Test Payload CMS collections
- Test data fetching functions
- Test static data references across tasks, rewards, shops, games, and unlocks

### E2E Tests
- Test critical user flows (login, catch Pokemon, battle)
- Use Playwright (already has Playwright config in root)

## Current Coverage
- Game-mode schema validation for every `allGames` entry.
- Static reference checks for `hide`, `overrides`, typed requirements, and item/currency/task rewards.
- Generated source-data checks for TCG binder/booster-pack coverage, mega-stone
  item coverage, Pokemon form references, and evolution item/species references.
- Requirements vs criteria behavior for lock/completion semantics.
- Game data sync scope checks.
- Catalog pagination/version/cache checks and a 32 KiB client sprite-index budget.
- Full compact-sprite parity against the authored manifest.
- Source hygiene check preventing dev entry actions from reintroducing `eval`.
- API response helper checks for request IDs.
- Rate-limit helper checks for forwarded IP parsing.
- Research action input validation for answer payloads, encounter IDs, reset
  flags, final scores, loss counts, and consumed Pokemon selections.
- Endless milestone reward integrity checks for claimed milestone exclusion,
  score normalization, and anti-cheat score ceilings.

## Running Tests
```bash
bun test              # Run all tests
bun run validate:data # Run Bun-backed schema, reference, and hygiene checks
bun run typecheck     # Run TypeScript without emitting files
bun run lint          # Run Biome lint checks
bun run test:int      # Integration tests
bun run test:e2e      # E2E tests
```

## Release validation
`bun run deploy:production` runs lint, typecheck, data validation, and the full
Bun test suite, then enforces the container image budget and smokes the exact
candidate before publishing it.
