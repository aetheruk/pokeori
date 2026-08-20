# Expeditions System

Expeditions are authored multi-step Explore routes made from tasks, battles, location encounters, research games, and branch choices.

## Locations
- Explore UI: `/game/explore`
- Data: `src/data/expeditions/`
- Runtime actions: `src/utilities/expeditions/`
- Explore components: `src/components/game/features/explore/ExpeditionModal.tsx`

## Features
- Activity nodes can carry user requirements and are omitted when those requirements are not met. Kid Mode uses this to skip Pallet Town Orientation's rival-selection step; active legacy orientation runs are normalized lazily so their current index, step numbers, and total remain valid.
- Generates an expedition path from authored activity nodes and optional branch choices.
- Supports result branches after an activity step. When the next node is a `result_branch`, a win follows the win route and a loss follows the loss route without spending an expedition life. Result branches can also set `end: 'complete'` or `end: 'fail'` to finish the run immediately from a non-final path point.
- Tracks one active expedition run per player through `expedition-runs`.
- Advances when the active battle, location, research, or task step reports a result.
- Task steps replay their enter/exit modal narrative for each expedition attempt. If the underlying task was already globally completed by a previous failed run, the expedition step advances without re-granting task rewards or re-consuming task criteria.
- Battle, catch, and research result overlays include expedition progress before returning to Explore; Snap preserves that progress through both normal completion and server time-up failure paths.
- Every expedition activity type, including inline task and Chronicle dialogue beats, presents its result before returning. Closing the complete result sequence marks its source expedition for restoration; Explore refreshes that run, reopens its panel, and centres the newly current path item (or the final item when rewards are ready).
- Supports max-loss failure and ready-to-claim completion states.
- Grants expedition rewards only when the completed expedition is claimed.
- Expedition entry fees can use consumed currency criteria. The four Safari expeditions charge 500 Pokédollars per new run, combine Field Observation and Safari catch activities, and use five completed runs of the prior area as the next-area gate. North contains the one-time HM Strength find, whose inverse ownership requirements remove both its scene and reward from later clears.
- Internal activities remain resolvable from expedition paths when authored in the `Secret` category, while Explore excludes that category entirely. Koga's Gym Trainer battles, invisible mazes, reward scene, Safari catches, expedition Field Observation copies, and the Strength cache follow this established pattern. When a replayable expedition revisits one-time story content, author a separate `Secret` activity copy as the Buggy Gauntlet, Feathered Gauntlet, and Safari expeditions do; do not rely on the story entry's completion gate to hide expedition content. Locations and games can additionally set `expeditionOnly` as a defensive visibility marker; Safari catches use both protections.
- `canAbandon: false` prevents a run from being abandoned in the UI and server action.
- `canFail: false` keeps failed steps retryable without adding losses or deleting the run.

## Chronicle Expeditions
- Expeditions can set `chronicle` to run story content from a non-player perspective.
- Chronicle battle steps use activity-specific authored Pokemon, assigned moves, and battle item inventory, falling back to the route team only when no per-battle loadout exists. Authored Chronicle loadouts ignore the player's TM ownership, Researcher move-slot cap, Pokemon research-level move gate, Trainer battle move/item use limits, item skill requirements, and Trainer IV cap.
- Chronicle catching steps use authored ball inventory and ignore the player's companion Pokemon.
- Chronicle battle/catch completion advances expedition progress without granting player rewards, candies, caught Pokemon, Pokedex progress, daily progress, or normal activity stats.
- Chronicle expeditions appear in Explore under `Chronicles` instead of the normal `Expeditions` header, and player-facing Explore copy labels active/complete/failed Chronicle runs as Chronicles even though they use the expedition runtime internally.
- The eight Kanto Gym Badge Chronicles are fixed, secret, non-branching anthology routes of 26 to 30 beats. Each is internally authored across Backstory, Development, Conflict, Contemplation, Resolution and Reflection, with at least 20 substantial scenes, 100 narrative panels and four to six character-specific games or battles; these planning phases and duration targets are not shown to players. Every activity has an immediate dramatic setup and consequence while `canFail: false` keeps failures retryable; normal Chronicle reward suppression keeps the player from retaining activity rewards or caught Pokemon from another person's memory. The authored order is generated from `KANTO_GYM_CHRONICLE_STORIES`, and the narrative contract lives in `docs/game-data/gym-leader-chronicles-story-bible.md`.
- `procedure-order` is a server-authoritative Chronicle game. The client may arrange cards by drag/drop or buttons, while the server accepts any ordering that satisfies the authored dependency graph. Its compact playfield keeps the shared circular timer in the standard activity HUD, moves instructions into an accessible help dialog, scrolls only the ordered steps, and keeps the check action fixed within every viewport. Three incorrect checks or the timer ends the attempt.
- The gold-tier rebuild versions all internal activity IDs as `chronicle-v2-*`. Its packaged production reset removes incompatible old runs and old `chronicle-<leader>-*` activity stats, then clears active game/research/battle sessions only for affected users. Narrative phases remain authored and validated internally but are not shown as a player-facing checklist or duration estimate. Every Kanto Gym Leader Chronicle awards 3,000 Explorer XP.
- Badge Chronicles become visible independently after their Spirit Channeling marker is awarded, so a later badge memory does not require earlier Chronicles to be completed. They are one-time expeditions and award Explorer XP only when claimed.
