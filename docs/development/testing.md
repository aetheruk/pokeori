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
- Navigation feedback holds a cold route response and checks keyboard activation, stable link geometry, and responsive navigation at 390px/1280px with reduced motion (`e2e/navigation-feedback.pw.ts`). The optional standalone interaction check expects automatic shell prefetching; development tests cannot verify production prefetch timing.
- User-field create/update and account-unlock permissions, including forged admin input.
- Game sync authenticates once, keeps ownership tied to the authenticated user, and returns private timing metadata.
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
- Continuous Snake mechanics (`bun test tests/snake-game.test.ts`): responsive
  coordinates, bounded turning, segment spacing, collisions, swept pickups,
  pointer arrival/release, and screen-relative Arrow/WASD steering with
  diagonals, opposing keys, and mixed aliases.

## Running Tests
```bash
bun test              # Run all tests
bun run validate:data # Run Bun-backed schema, reference, and hygiene checks
bun run typecheck     # Run TypeScript without emitting files
bun run lint          # Run Biome lint checks
bun run test:int      # Integration tests
bun run test:e2e      # E2E tests
bun run test:security:integration # Real isolated API/transaction security tests
```

## Release validation
Before merging a release PR, run lint, typecheck, data validation, and the full
Bun test suite. Coolify builds the Dockerfile and deploys automatically from
`main`; the image build skips typechecking, so pre-merge validation is required.
Verify the deployed `/api/health`, `/api/app-version`, and an already-open PWA
using the [deployment guide](/docs/development/deployment.md).

## Isolated browser and security integration

Start disposable services with `docker compose -p pokeori-audit-test -f compose.test.yml up -d --wait`.
Initialize Mongo once with `docker compose -p pokeori-audit-test -f compose.test.yml exec -T mongo mongosh --quiet --eval 'rs.initiate({_id:"audit-rs",members:[{_id:0,host:"localhost:27017"}]})'`.
Run `bunx playwright install chromium`, `bun run test:security:integration`, and
`bun run test:e2e`. Stop these services with the same Compose command plus `down`.
Both runners replace database credentials with loopback-only test settings.
The security runner owns Redis database 15 on port 6399 and resets that database
before each run. It starts/stops its own Next server on 3110 and prints the log path.
Playwright owns port 3101 and uses an explicitly enabled development-only UI fixture.
Do not point either runner at production or reuse its test secrets.

Security integration covers 133 assertions across actual REST, GraphQL and raw
Server Actions, collection ownership/admin boundaries, invitation reuse and
transaction rollback, bilateral friendship concurrency, authoritative arcade
checkpoints, compressed receipt replay, capture/item crash recovery, and atomic
two-player PVP settlement. Browser tests cover
recovery, keyboard/mobile access, CSP, PVP errors, artwork selection and PWA update
races. These complement unit tests; fixtures do not prove all authenticated game
flows. The Validate workflow runs these in a separate integration job. Protected
main requires both `Typecheck, lint, tests and security` and `Browser and security
integration`, with the branch up to date. These requirements were verified through
the GitHub API on 7 September 2026; the release PR must include the workflow.

The isolated Linux production browser smoke is separately opt-in and checks
authenticated Explore, Pokemon, Inventory, Run and Payload admin with the default
enforced CSP. See [its setup and evidence](../audit/production-browser-verification.md).
It does not replace populated-account gameplay or production rollout checks.

Set `POKEORI_PROFILE_GAME_SYNC=1` when running the security integration to add a
temporary 1,000-Pokemon fixture, record scoped HTTP timing/bytes and Mongo explain
statistics, and compare every Explore read-model row with Payload's normal DTO.
The fixture and query helper reject production database settings.
