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
- Supports max-loss failure and ready-to-claim completion states.
- Grants expedition rewards only when the completed expedition is claimed.
- `canAbandon: false` prevents a run from being abandoned in the UI and server action.
- `canFail: false` keeps failed steps retryable without adding losses or deleting the run.

## Chronicle Expeditions
- Expeditions can set `chronicle` to run story content from a non-player perspective.
- Chronicle battle steps use authored Pokemon, assigned moves, and battle item inventory. Authored Chronicle loadouts ignore the player's TM ownership, Researcher move-slot cap, Pokemon research-level move gate, Trainer battle move/item use limits, item skill requirements, and Trainer IV cap.
- Chronicle catching steps use authored ball inventory and ignore the player's companion Pokemon.
- Chronicle battle/catch completion advances expedition progress without granting player rewards, candies, caught Pokemon, Pokedex progress, daily progress, or normal activity stats.
- Chronicle expeditions appear in Explore under `Chronicles` instead of the normal `Expeditions` header, and player-facing Explore copy labels active/complete/failed Chronicle runs as Chronicles even though they use the expedition runtime internally.
- The eight Kanto Gym Badge Chronicles are fixed, secret, non-branching anthology routes of 11 to 14 beats. Their distinct structures combine dramatized multi-panel narrative tasks with one to three character-specific games and one to three battles, while retaining a leader-specific fixed team and `canFail: false`; normal Chronicle reward suppression keeps the player from retaining activity rewards or caught Pokemon from another person's memory. The authored order is generated from `KANTO_GYM_CHRONICLE_STORIES`, and the narrative contract lives in `docs/game-data/gym-leader-chronicles-story-bible.md`.
- Badge Chronicles become visible independently after their Spirit Channeling marker is awarded, so a later badge memory does not require earlier Chronicles to be completed. They are one-time expeditions and award Explorer XP only when claimed.
