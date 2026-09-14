# Pokeori Content Studio

The content editor is a local-only application for authoring the TypeScript and
JSON files under `src/data`. It is intentionally separate from the player-facing
Next app, so the game build does not compile or trace the authoring UI and its
file-writing tools.

## Run it

From the repository root:

```bash
bun run content-editor
```

The editor listens on `http://127.0.0.1:3102`. The game app can run separately
with `bun run dev`; the editor does not start Redis, Payload, MongoDB, or the
game server.

The editor must be started through the provided command. Its server actions
require the `POKEORI_CONTENT_EDITOR=1` opt-in and reject production execution.
They write only to the repository's authored data paths and run generation or
validation with the repository root as their working directory.

## Build checks

```bash
bun run content-editor:typecheck
bun run content-editor:build
```

The editor is not included in the production Docker image or deployment. Data
changes should be reviewed as normal source changes and validated with
`bun run validate:data` before they are committed.

## Move-file compatibility

The Normal TM file contains computed form lists alongside its authored move
entries. The editor evaluates that module when loading Normal moves, including
Sketch, and preserves untouched computed expressions when saving the file.

Task and other content entry files may also export arrays built with local
helpers or spreads. The editor first uses its non-executing literal reader, then
falls back to loading the matching trusted local module in an isolated Bun
process when generated entries need to be displayed.
