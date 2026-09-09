# Testing Strategy

- `bun test tests/notifications.test.ts tests/image-cache.test.ts` checks opt-in defaults, outbound endpoint restrictions, private subscription access, owner isolation, successful/partial/expired delivery, retry persistence, voyage timing/deduplication, UTC resets, and service-worker display/click behavior alongside image-cache compatibility. `e2e/notification-settings.pw.ts` checks off states, unsupported-browser instructions, and mobile/desktop bounds without requesting permission on load. Real iOS/APNs delivery still needs the Home Screen checks in [Device notifications](../features/notifications.md).

The combined grid course is covered by `bunx playwright test e2e/grid-adventure.pw.ts`. It walks all three rooms and mocks the encounter/battle boundaries to verify checkpoint restoration, collected items, move-proof continuity and final completion. `tests/rock-push-verification.test.ts` separately replays the authored course with server-verified wins and rejects missing checkpoints or an unfinished final hole.

Grid movement: `bun run test:e2e e2e/trainer-appearance.pw.ts -g 'grid walking'` checks all three grid variants at phone and desktop widths. Browser animations are paused at known times to verify the 360ms movement/cycle duration, half-cell translation, all four 90ms walking frames, the standing frame on arrival, and immediate movement with reduced motion enabled. Rock Push also checks undo, restart, and facing a blocked cell.

Trainer appearance: `bun test tests/trainer-appearance.test.ts` covers gender validation, legacy defaults, sprite-sheet dimensions, and directional frames. `bun run test:e2e e2e/trainer-appearance.pw.ts e2e/trainer-settings.pw.ts` checks phone/desktop editing, cancel/save, keyboard selection, and all three characters across the real grid renderers. `bun run test:security:integration` also verifies authenticated customization persistence, invalid values, owner isolation, and trainer sync against disposable services.

`bun test tests/evolution-moves.test.ts` verifies all authored move-evolution requirements, source-form TM compatibility, saved assignment matching, unknown-move rejection, and preservation of other evolution item conditions.

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
- `tests/image-cache.test.ts` verifies content revisions, legacy sprite migration, cache reuse across releases, changed-image invalidation, and request isolation. `e2e/trainer-settings.pw.ts` covers inline settings below badges, the unframed top-right customization pencil, device audio, image download/revisit/removal, cancellation/resume, mobile and desktop bounds, and real service-worker delivery of original and Next image URLs with the browser offline.
- `e2e/move-workspace.pw.ts` covers Pokémon inspector search, Rollout assignment, close/reopen, Escape, and unsaved evolution gating at mobile and desktop widths.
- Dex layout checks exercise horizontal series/set scrolling and selection with the full binder catalog at 390px/1280px, plus all ten page skeletons without page overflow or animated spinners. Capture checks cover native keyboard activation on the ball, ignored ordinary clicks, and upward drag throws.
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

`e2e/ufo-catcher.pw.ts` exercises the real UFO cabinet at mobile and desktop
widths using a deterministic local transport. It checks cabinet/control bounds,
keyboard focus-loss release, pointer release outside the control, and persistent
miss feedback. Run it with `bun run test:e2e e2e/ufo-catcher.pw.ts`.

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
