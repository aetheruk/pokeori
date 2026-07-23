# AGENTS.md

Guidance for AI agents working in this repository.

## Project Shape

This is a Bun + Next.js App Router + Payload CMS game app.

Important paths:

- `src/app/(frontend)/game`: player-facing game UI and server actions.
- `src/app/(frontend)/game/battles`: battle UI, PVE/PVP actions, powers, and battle helpers.
- `src/app/(frontend)/game/research/encounter`: client mini-game implementations.
- `src/app/(frontend)/game/research/games`: server actions for mini-games with custom session logic.
- `src/data`: authored static game data for tasks, locations, battles, shops, voyages, games, Pokemon, items, moves, and rewards.
- `src/utilities`: shared mechanics, requirements, battle engine, rewards, Redis helpers, and validation.
- `docs/current-game-state.md`: current progression map and runtime notes.
- `docs/game-data/battle-mechanics-inventory.md`: current abilities, moves, TMs, HMs, and battle powers inventory.
- `tests`: Bun tests for data integrity, game mechanics, validation, and server helpers.

## Working Rules

- Prefer existing patterns over new architecture. This repo has many data-driven systems; check the relevant `src/data/**` and existing feature implementation before adding new behavior.
- Use `rg` for search and `rg --files` for file discovery.
- Use `apply_patch` for manual edits.
- Do not revert unrelated user changes. The worktree may already contain edits.
- Keep generated data and large source-data churn out of unrelated fixes.
- For UI fixes, check both the client component and the server action/session state that backs it.

## Common Commands

```bash
bun run typecheck
bun run lint
bun test
bun run validate:data
bun run dev
```

Use targeted tests when possible, then run `typecheck` and `lint` for cross-file TypeScript/UI changes.

## Release Versioning

- Every production update must increment the semantic version in `package.json` before its PR is opened or deployed. Use a patch increment unless the change warrants a minor or major release.
- Treat the package version as the client release identifier. Do not ship a change without changing it, including hotfixes and content-only releases.
- Confirm the PWA update check can read the deployed version from `/api/app-version`; an open client must reload when it detects a newer version.

## Runtime State Patterns

- Research encounters use Redis state under `research:${user.id}` from `src/app/(frontend)/game/research/actions.ts`.
- Some mini-games have extra Redis session keys. Fishing uses `fishing:${user.id}` and location-style catch encounters use `encounter:${user.id}`.
- Battle state is stored separately and rendered through a visual-state queue in `src/utilities/battle/engine/useBattleManager.ts`.
- Server actions often use rate limits, idempotency keys, and action locks from `src/utilities/game-integrity.ts`. Preserve those patterns when adding or changing actions.

## Fragile Systems

- Battle UI animations depend on diffing old and new battle state in `src/utilities/battle/engine/event-generator.ts`. Avoid applying final active indices too early; faint and switch animations need the outgoing Pokemon to remain rendered until the animation completes.
- Match 3 normal mode is score-completion based. Client completion lives in `src/app/(frontend)/game/research/encounter/match3.tsx`; server verification in `completeResearchEncounter` treats `gameType === 'match3'` with `settings.winScore` as score based.
- Fishing has both client timers and server session state. If a timer expires or the player presses Try Again, stale `fishing:${user.id}` state must be cleared or the next cast will be blocked as active.
- Endless mini-games pass final scores for milestone/high-score handling. Score validation lives in `src/utilities/research/endless-milestones.ts`.
- Requirements and criteria have different meanings. Check `src/utilities/requirements/index.ts` and tests before changing unlock logic.

## Data Authoring Notes

- Static entries usually live in per-area files under `src/data/<system>/entries`.
- Imported but empty future Kanto area files are normal.
- `requirements` control visibility/unlock. `criteria` control entry/completion/cost.
- `hide` and `overrides` are used to replace older Explore entries.
- After adding data, run `bun run validate:data`.

## Documentation Expectations

- Always update `docs/current-game-state.md` whenever content progress is made. This includes new or changed tasks, locations, battles, rewards, unlocks, gates, route handoffs, hidden blockers, authored progression, and any meaningful change to what a player can do next.
- Always update `docs/game-data/battle-mechanics-inventory.md` when changing Pokemon abilities, ability patches, battle moves, TMs, HMs, battle powers, power key items, Tera/Z/Mega/Dynamax data, or their authored unlock/reward locations.
- When changing progression, unlock rules, authored content, or important runtime behavior, update `docs/current-game-state.md` for implemented progression and known gates.
- Update feature docs under `docs/features/` when behavior changes at the system level.
- Update testing docs if new validation coverage or commands are added.
