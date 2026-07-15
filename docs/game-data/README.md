# Game Data Reference

Documentation for all game data structures in Pokeori.

## Data Modules
All game data is stored as TypeScript modules in `src/data/`.

- [Pokemon Data](/docs/game-data/pokemon-data.md) - Species, stats, types
- [Moves Data](/docs/game-data/moves-data.md) - Move effects, type chart
- [Items Data](/docs/game-data/items-data.md) - Items, berries, balls
- [Locations Data](/docs/game-data/locations-data.md) - Regions, routes, towns
- [Battle Mechanics Inventory](/docs/game-data/battle-mechanics-inventory.md) - Abilities, battle moves, TMs, field TMs, and powers with unlock status
- [Schema-Based Game Mode Generation](/docs/game-data/game-mode-generation.md) - Mini-game schemas, generation rules, and lock criteria
- [Evolutions](/docs/game-data/evolutions.md) - Evolution chains and methods

## Data Flow
1. Raw data fetched from APIs (PokeAPI, Pokemon TCG API)
2. Scripts generate TypeScript modules in `src/data/`
3. Modules imported directly into components/utilities

## Adding New Data
1. Update fetch script (e.g., `scripts/fetch-pokemon-data.mjs`)
2. Run fetch + generate scripts
3. New data available immediately on server restart
