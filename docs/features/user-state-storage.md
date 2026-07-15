# User State Storage

Player-owned game state is split out of the `users` document into normalized Payload collections. The read layer keeps existing `RequirementData` shapes so task, shop, battle, research, and Explore requirement checks can continue to consume arrays such as `inventory`, `pokedex`, `completedTasks`, `tcg`, and activity result arrays.

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

`/api/game/sync` uses `DEFAULT_SYNC_KEYS`, which excludes full Pokemon collection hydration. Explore still requests the scoped slim Pokemon payload because Explore requirement and selection UI need those fields. Client code should read normalized data from `gameData` rather than expecting `user.inventory`, `user.pokedex`, `user.completedTasks`, `user.tcg`, or result maps under `user.stats`.

## Write Path

Runtime writes use targeted helpers in `src/utilities/user-state.ts`, including map setters for inventory, Pokedex, task progress, TCG cards, shop purchases, and `incrementUserActivityResult` for battle, location, research, and expedition outcomes. The old `users` after-change mirroring hook and legacy JSON migration helpers have been removed; old ledger columns are dropped from `users`.

## Rollout Notes

New gameplay code should read through `getGameUserData` or `src/utilities/user-state.ts` rather than directly inspecting `users` for owned ledgers. New write paths must use targeted helper/repository writes to the split collections. Small profile fields such as skills, currency, active daily tasks, active voyages, battle power usage, `vsSeeker`, and `totalEvolutions` still live on `users`.
