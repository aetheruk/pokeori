# Schema-Based Game Mode Generation

Pokeori game modes are generated as static TypeScript entries under
`src/data/games/<game-type>/entries`. Each entry is loaded through
`src/data/games/index.ts`, receives a `gameType`, and becomes available to
Explore when its lock conditions pass.

## Canonical Entry Shape

Every generated game entry must include:

- `id`: stable unique identifier used for sessions, stats, rewards, and locks.
- `gameType`: one of the supported game types exported by `src/data/games`.
- `name`, `description`, `category`, `subCategory`, `icon`: Explore display data.
- `requirements`: conditions that unlock or expose the game.
- `criteria`: optional entry requirements, completion gates, or consumable costs.
- `rewards`: rewards granted on success unless the game handles dynamic rewards.
- `settings`: game-specific schema for pools, timers, scoring, physics, cost, or UI.

Optional routing and visibility fields:

- `hide`: hide this entry after the referenced task is complete.
- `overrides`: replace another unlocked entry with this one.
- `daily`: treat as daily content.
- `isRandomEvent`: show through the random event slot instead of the normal grid.
- `background`, `music`: presentation assets.

Random events use `roll` requirements against a 1-1,000,000 `lastRoll`.
Author odds with a helper such as `oneIn(100)` instead of raw thresholds where
possible, so the intended rarity remains readable.

The runtime schema lives in `src/data/games/schemas.ts`; tests import `allGames`
and validate every generated entry.

## Requirements vs Criteria

`requirements` answer: "Can the player see or start this content?"

Common uses:

- Require tutorial or story task completion.
- Require a badge, item, skill level, research level, Pokédex progress, or prior win.
- Gate by time/date or daily completion status.
- Keep content locked until prerequisite systems are introduced.

`criteria` answer: "What must be true to enter, complete, or pay for this content?"

Common uses:

- Require an item or currency for entry.
- Require selected Pokemon matching species, type, level, team, or companion checks.
- Mark items or Pokemon with `consume: true` when entry/completion spends them.
- Track objective progress for tasks and generated daily challenges.

For locking and unlocking:

- Explore filters out entries with unmet `requirements`.
- Active voyages and expeditions remain visible while running, even if a roll or
  requirement changes.
- Secret tasks stay hidden until completed.
- `daily_not_completed` unlocks repeatable daily content only when it has not
  been completed today.
- `hide` removes old content after the referenced task is completed.
- `overrides` lets a newly unlocked entry replace an older one.

## Game-Type Settings

Knowledge games (`silhouette`, `identify`, `snap`, `cry`, `compare`, `spelling`)
usually define `pokemonPool`, `optionsPool`, `timeLimit`, `winRate`, `death`, and
`lose_points`. `compare` also defines `maxPokemonShown` and stat operators.

Timing/endless games (`run`, `flap`, `rhythm`, `mining`, `match3`) define speed,
spawn rates, score targets, timers, and optional endless milestones.
Milestone scores must be stable integers. Runtime completion grants only
unclaimed achieved milestones, and claim/completion anti-cheat ceilings are
calculated server-side from the active session duration.

Physics/puzzle games (`rock-push`, `sliding-puzzle`, `pachinko`) define board,
grid, seed, shuffle, bucket, or physics settings. Sliding puzzles may use the
default Pokemon-plus-background image or a custom `settings.image` asset for
the preview and tiles. Pachinko boards must define bounded pegs and unique
bounded buckets; optional bouncer pegs, bucket labels, bucket colors, and
obstacles are supported.

Cost/reward games (`slots`, `prize-wheel`, `pachinko`, `fishing`) must define
costs and dynamic reward pools in `settings` when rewards are decided per spin,
drop, hook, or bucket.

## Generation Rules

Future generators should:

- Create one file per region/sub-region in the matching `entries` directory.
- Use stable kebab-case file names and stable entry IDs.
- Emit `requirements: []`, `criteria: []`, and `rewards: []` explicitly.
- Prefer small game-specific settings and shared defaults over copied constants.
- Run `bun test tests/game-schema.test.ts` after generation.
- Run `bun run validate:data` before committing generated content so schemas,
  references, requirement semantics, and research integrity helpers stay aligned.
- Never generate production secrets, user state, or Payload documents.

## Example

```ts
export const palletTownFishing: FishingGameConfig[] = [
  {
    id: 'pallet-town-seafront',
    gameType: 'fishing',
    name: 'Pallet Town Seafront',
    description: 'A quiet fishing spot along the southern coast.',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    icon: { type: 'item', id: 'old-rod' },
    requirements: [{ type: 'task_completed', targetId: 'tutorial-6' }],
    criteria: [{ type: 'item_owned', targetId: 'old-rod' }],
    rewards: [],
    settings: {
      rods: {
        old: {
          encounters: { entries: [] },
        },
      },
    },
  },
]
```

Fishing server actions use a global 80% Pokemon / 20% item split for every rod.
Generic item drops are configured in `src/data/games/fishing/item-pools.ts`.
Only add `items.entries` to a fishing rod when that location needs a quest or
location-specific item override.
