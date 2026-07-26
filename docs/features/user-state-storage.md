# User State Storage

Player-owned game state is split out of the `users` document into normalized Payload collections. The read layer keeps `RequirementData` shapes so task, shop, battle, Mini Game, Field Research, and Explore requirement checks can consume arrays such as `inventory`, `pokedex`, `completedTasks`, `tcg`, and activity result arrays.

## Split Collections

- `user-inventory-items`: one row per owned item and user.
- `user-pokedex-entries`: one row per user, species, and form.
- `user-task-progress`: one row per completed task and user.
- `user-activity-stats`: one row per user activity result, keyed by `activityType` and `activityId`.
- `user-tcg-cards`: one row per owned card and user.
- `user-shop-purchases`: one row per purchased shop item and user.

The `users` collection remains the source for auth, admin flags, trainer profile display, cosmetics, skills, currency, capacities, kid mode, battle power usage, active daily task state, active voyages, voyage stats, rival selection, and `lastRoll`.

## Read Path

`getGameUserData` reads split collections through `src/utilities/user-state.ts`. Runtime reads do not fall back to old `users` JSON ledgers. The returned `user` is slimmed so large ledgers are not sent inside `user`; callers should use the top-level `RequirementData` arrays instead.

`/api/game/sync` accepts a route-derived scope so each game surface only fetches the normalized collections it renders. Unrequested fields are omitted rather than populated with empty placeholders. The client keeps each scope in its own SWR cache, deduplicates foreground requests, and performs a low-frequency background refresh. Explore still requests the scoped slim Pokemon payload because Explore requirement and selection UI need those fields. Client code should read normalized data from `gameData` rather than expecting `user.inventory`, `user.pokedex`, `user.completedTasks`, `user.tcg`, or result maps under `user.stats`.

## Write Path

Runtime writes use targeted helpers in `src/utilities/user-state.ts`, including map setters for inventory, Pokedex, task progress, TCG cards, shop purchases, and `incrementUserActivityResult` for battle, location, Mini Game, Field Research, and expedition outcomes. Mini Games use `gameResults`/`activityType: game`; Field Research uses `fieldResearchResults`/`activityType: field-research`. Bulk writes are split into bounded parallel batches, and activity syncs only query the activity types requested by the active route.

## Rollout Notes

New gameplay code should read through `getGameUserData` or `src/utilities/user-state.ts` rather than directly inspecting `users` for owned ledgers. New write paths must use targeted helper/repository writes to the split collections. Small profile fields such as skills, currency, active daily tasks, active voyages, battle power usage, `vsSeeker`, and `totalEvolutions` still live on `users`.

For the 0.1.0 domain split, run
`bun run migrate:game-activity-domains --dry-run` after taking a MongoDB backup,
then run `bun run migrate:game-activity-domains`. The idempotent migration
classifies known Field Observation IDs as `field-research`, classifies all
other or unknown legacy IDs as `game`, and merges a legacy row into an
existing canonical row without discarding wins, losses, high scores,
timestamps, or metadata. Runtime reads understand legacy `research` rows
during the rollout.

## Performance Index Migration

Release `0.1.1` adds a phased production migration for normalized user-state indexes:

```bash
bun run migrate:performance-indexes --phase=prepare
bun run migrate:performance-indexes --phase=finalize
```

The prepare phase creates non-unique query indexes and reconciles duplicate normalized rows. The finalize phase creates the compound unique indexes used by inventory, Pokedex, ability, task, activity, TCG ownership, and shop-state lookups. Run both phases against a backup and verify the prepare report before finalizing.
