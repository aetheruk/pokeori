# Tasks System

Daily, special, and Pokemon Research tasks.

## Locations
- Route: `/game/explore` (including the Dailies category)
- Components: `src/components/game/tasks/`
- Data: `src/data/tasks/`
- Utilities: `src/utilities/tasks/`

Fuchsia's `Build in bulk` task appears alongside the Billiam storage side task after the Crudely Drawn Flyer. It consumes 20 each of XS Candy, XS Candy EX, S Candy, and S Candy EX, then unlocks all ten Candy Bag Artisan recipes.

## Task Types

- **Daily Tasks**: Reset on the UTC calendar day after `tutorial-16`. Six generated challenges are selected from player-accessible catches, battles, Mini Games, Field Research, fishing, Artisan work, shops, voyages, TCG, and renewable resource deliveries.
- **Special Tasks**: One-time, multi-step tasks
- **Research Tasks**: Pokemon-specific research

## Generated Daily Challenges

- The generator evaluates authored unlocks, encounter-level gates, shop stock, TCG duplicate state, and eligible reward sources before offering an objective. Secret, random, test, gambling, and unavailable sources are excluded.
- Challenges prefer distinct activity families and avoid the prior UTC day's family/target where alternatives exist. Test/debug, secret, and random-event sources are excluded. Each daily stores a source hint shown in its Explore detail drawer.
- Five generated challenges award 5 Professor Scrip each. Exactly one is marked as the Daily Bonus and awards 25 Professor Scrip, for a 50-scrip daily cap. Rewards are the same every UTC day, including Sunday.
- `daily_activity` is the shared progress criterion for successful catches, battle wins, Mini Game wins, Field Research completions, fishing catches, crafts, purchases, voyages, and TCG actions. Mini Games use `game_win`; Field Research uses `field_research_win`.
- Resource deliveries consume 1–3 base type gems or tier-one Pokemon materials, or 2–4 berries. Gem and berry deliveries require a reachable guaranteed reward source; Pokemon materials are sourced from the guaranteed tier-one material awarded by compatible catches.

## Requirements
Tasks use requirement system in `src/utilities/requirements/`:
- Catch X Pokemon of type Y
- Win X battles
- Explore X locations
- Collect X items
- Group alternative conditions with `any_of` when a gate should pass if at least one nested
  requirement is still true, such as keeping catch-up content visible until every authored goal
  in a combined set is complete.

Explore modals render requirement copy through `src/components/game/shared/criteria-mapping.tsx`.
The display text is context-aware: catch-location results are shown as catches, wild battle
results as defeated Pokemon, trainer battles as defeated trainers, and content prerequisites use
the referenced task, battle, location, research, or expedition icon where one exists.
Requirement cards show progress and completion in a fixed right-side status area: multi-count
requirements use a filling circular counter, while completed requirements use a teal check mark.

## Rewards

- Successful task completions use the shared ordered result flow. For chat tasks, the authored exit scene is shown first and the reward summary follows; a failed server completion does not show the success scene.
- Gems
- Pokedollars
- Items
- Skill XP
