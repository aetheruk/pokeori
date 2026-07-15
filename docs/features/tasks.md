# Tasks System

Daily and special research tasks.

## Locations
- Route: `/game/research/*`
- Components: `src/components/game/tasks/`
- Data: `src/data/tasks/`
- Utilities: `src/utilities/tasks/`

## Task Types
- **Daily Tasks**: Reset every 24 hours
- **Special Tasks**: One-time, multi-step tasks
- **Research Tasks**: Pokemon-specific research

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
- Gems
- Pokedollars
- Items
- Skill XP
