# Scripts Guide

Data fetch and generation scripts for Pokeori.

## Data Scripts
| Script | Command | Description |
|--------|---------|-------------|
| Generate Game Data | `bun run generate:game-data` | Unified pipeline for Pokemon, bundled sprites, item sprites, evolutions, TCG, booster packs, mega stones, entry scaffolds, and validation |
| Fetch Pokemon | `bun run fetch:pokemon` | Fetch Pokemon data from PokeAPI |
| Generate Pokemon | `bun run generate:pokemon` | Generate TypeScript modules from fetched data |
| Fetch TCG | `bun run fetch:tcg` | Fetch TCG card data from Pokemon TCG API |
| Generate TCG | `bun run generate:tcg` | Generate TCG data modules |
| Sync TCG Sprites | `bun run sync:tcg-sprites` | Cache TCG set artwork and generate set-specific booster pack and binder item sprites |
| Generate Quizzes | `bun run generate:quizzes` | Generate quiz questions from Pokemon data |
| Generate Evolutions | `bun run generate:evolutions` | Generate split evolution chain modules |
| Generate Mega Stones | `bun run generate:mega-stones` | Generate mega-stone items from `MEGA_EVOLUTIONS` |
| Generate Data Entries | `bun run generate:data` | Generate game data entries |
| Sync Pokemon Sprites | `bun run sync:pokemon-sprites` | Bundle app-known Pokemon sprites from PokeAPI sprites, optimize HOME sprites, and regenerate the missing-sprites report |
| Sync Item Sprites | `bun run sync:item-sprites` | Regenerate the local item sprite manifest and missing-sprites report without copying sprite assets |
| Clone Sprites | `bun run clone:sprites` | Prepare the sparse PokeAPI sprite repository cache without copying assets |
| Typecheck | `bun run typecheck` | Run TypeScript validation without emitting files |
| Validate Data | `bun run validate:data` | Validate generated game schemas, references, requirements, and source hygiene |

## Script Details

### `fetch-pokemon-data.mjs`
Fetches all Pokemon from PokeAPI (Gen 1-9) and saves to `source_data/pokemon/`.

### `generate-pokemon-modules.mjs`
Converts raw JSON data into TypeScript modules in `src/data/pokemon/`. The
script also refreshes `MEGA_EVOLUTIONS` from source forms whose identifiers
contain a Mega suffix, including `-mega`, `-mega-x`, `-mega-y`, and `-mega-z`.
The unified pipeline follows this with mega-stone generation so new mega forms
do not leave blank `megaStoneId` values in `src/data/powers.ts`.

### `generate-game-data.mjs`
Runs the full game-data pipeline in dependency order:

1. Fetch Pokemon source data.
2. Fetch TCG source data.
3. Sync bundled TCG set sprites and generated TCG pack/binder item sprites.
4. Generate Pokemon modules.
5. Sync bundled Pokemon sprites.
6. Generate split evolution modules and the compatibility wrapper.
7. Generate TCG modules and booster-pack items.
8. Generate mega-stone items from `MEGA_EVOLUTIONS`.
9. Sync bundled item sprites.
10. Generate blank region entry scaffolds.
11. Run `bun run validate:data`.

Useful local flags:

- `--skip-fetch`: use existing `source_data/` files instead of network fetches.
- `--skip-tcg-sprites`: avoid refreshing bundled TCG set artwork and generated TCG pack/binder item sprites.
- `--skip-sprites`: avoid refreshing the bundled Pokemon sprite manifest/assets.
- `--skip-item-sprites`: avoid refreshing the bundled item sprite manifest/assets.
- `--skip-entry-scaffold`: avoid creating new blank region files.
- `--skip-validate`: skip the final validation step.

### `sync-pokemon-sprites.mjs`
Sparse-clones https://github.com/PokeAPI/sprites into ignored `source_data/pokeapi-sprites`
with the Pokemon and item sprite source folders needed by the game, copies
app-known Pokemon form sprites into `public/sprites/pokemon/`, regenerates
`src/data/pokemon-sprite-manifest.json`, and writes
`docs/game-data/missing-pokemon-sprites.md`. Production Pokemon sprite helpers use
the generated local manifest and fall back to Unown (`201`) when a source sprite is
missing. All bundled Pokemon sprites are emitted as AVIF during sync. HOME normal
and shiny sprites are resized to transparent 200x200 files; Gen V battle sprites
and optional female variants keep their source dimensions.
Existing generated files are reused when they are newer than their source asset.
Use `--skip-fetch` to resync from an existing local sprite repo cache, or `--clean`
to delete and rebuild `public/sprites/pokemon/` before syncing.

### `sync-item-sprites.mjs`
Scans the manually maintained `public/sprites/items/` folder, regenerates
`src/data/item-sprite-manifest.json`, and writes
`docs/game-data/missing-item-sprites.md`. It does not copy or discover item sprite
assets from fallback folders or PokeAPI source folders. Runtime item UI uses the
generated local manifest only; missing authored sprites fall through to the
standard item placeholder instead of fetching remote item art. Evolution items are
expected under `public/sprites/items/evolution/`, generated mega stones under
`public/sprites/items/mega/`, TMs under `public/sprites/items/tm/`, and gems under
`public/sprites/items/materials/`; the missing-sprites report includes the
expected path for custom art that still needs to be added.

### `sync-tcg-set-sprites.mjs`
Fetches TCG set logo and symbol artwork from the URLs in
`source_data/tcg/sets/en.json`, caches the source PNGs under
`source_data/tcg/set-artwork/`, and composes generated booster pack and binder
item sprites under `public/sprites/items/tcg/`. Set logos and symbols are kept as
source-cache inputs for item sprite composition but are not bundled as public
runtime assets. The base item sprites live in `source_data/tcg/sprite-bases/`. Use `--skip-fetch` to
compose from the local source-art cache without network access, or `--force` to
refetch/rewrite outputs.

### `fetch-tcg-data.mjs`
Fetches TCG sets and cards from Pokemon TCG API, saves to `source_data/tcg/`.

## Adding New Data
1. Run `bun run generate:game-data`.
2. For offline/local regeneration, run `bun run generate:game-data -- --skip-fetch`.
3. Confirm `bun run validate:data` passes if validation was skipped.
4. Restart dev server to load new data
