# Grid sprite-set contract

The shared grid renderer uses a 16×16 logical cell. Artwork is stored at native pixel size and scaled only by whole-number multiples. A sprite set owns terrain and floor-layer art. Reusable entities are registered separately, and scene geometry is authored by each game.

## Asset layout

```text
public/games/grid-tiles/<set-id>/
  floor/
    common.png                 # 16x16, opaque
    rare-pebbles.png           # 16x16, optional
    rare-crack.png             # 16x16, optional
    blockers/
      small.png                # 16x16 generic solid blocker
      large.png                # 32x32 generic solid blocker, optional
  walls/
    back.png                  # optional 16x16 repeated far/top wall
    0.png ... 15.png           # 16x16 connected wall variants
    frame.png                  # optional 48x48 3x3 border atlas
    goal.png                   # optional marker in a wall/doorway
    teleporter.png             # optional marker in a wall/entrance
  gameplay/
    boulder.png
    ice.png
    hole.png
```

Reusable objects are not nested under a tile set; register them in `src/data/games/grid-tiles/objects.ts`:

```text
public/games/grid-objects/
  voltorb.png
  pushable-stone.png
  dialogue-sign.png
```

The object library defines each object’s purpose, native footprint, collision behavior, and sprite. This lets the same Voltorb, pushable stone, decoration, or future dialogue object appear in multiple map sets. A 1×1 object uses a 16×16 canvas; a 2×2 object uses 32×32; larger dimensions remain possible for future content.

Wall filenames are four-bit cardinal masks: north `1`, east `2`, south `4`, west `8`. For example, north + east is `3`, east + west is `10`, and all four directions is `15`. Each mask should be deliberately authored with the correct corners and side faces.

## Sprite-set manifest

```ts
const caveSet: GridTilePalette = {
  id: 'johto-dark-cave',
  name: 'Johto Dark Cave',
  logicalTileSize: 16,

  floor: {
    common: { src: '/games/grid-tiles/johto-dark-cave/floor/common.png' },
    rareChance: 0.08,
    rare: [
      { id: 'pebbles', asset: { src: '/games/grid-tiles/johto-dark-cave/floor/rare-pebbles.png' }, weight: 3 },
      { id: 'crack', asset: { src: '/games/grid-tiles/johto-dark-cave/floor/rare-crack.png' }, weight: 1 },
    ],
    blockers: {
      small: { src: '/games/grid-tiles/johto-dark-cave/floor/blockers/small.png' },
      large: { src: '/games/grid-tiles/johto-dark-cave/floor/blockers/large.png' },
    },
    markers: {
      goal: { src: '/games/grid-tiles/johto-dark-cave/floor/goal.png' },
      teleporter: { src: '/games/grid-tiles/johto-dark-cave/floor/teleporter.png' },
    },
  },

  walls: {
    back: { src: '/games/grid-tiles/johto-dark-cave/walls/back.png' },
    variants: createGridWallVariants('/games/grid-tiles/johto-dark-cave/walls'),
    frame: { src: '/games/grid-tiles/johto-dark-cave/walls/frame.png' },
    markers: {
      goal: { src: '/games/grid-tiles/johto-dark-cave/walls/goal.png' },
      teleporter: { src: '/games/grid-tiles/johto-dark-cave/walls/teleporter.png' },
    },
  },

  gameplay: {
    boulder: { src: '/games/grid-tiles/johto-dark-cave/gameplay/boulder.png' },
    ice: { src: '/games/grid-tiles/johto-dark-cave/gameplay/ice.png' },
    hole: { src: '/games/grid-tiles/johto-dark-cave/gameplay/hole.png' },
  },

  credits: [{
    label: 'Johto Dark Cave Tiles',
    creator: 'Artist name',
    href: 'https://example.com/original-pack',
    license: 'Used with permission',
    notice: 'Edited and arranged for Pokeori.',
    external: true,
  }],
}
```

The common floor is required. Rare floor tiles are optional, visual-only, and selected deterministically from the sprite-set id, scene seed, and coordinates. The default chance is 8%; per-scene configuration can override it, including `0` to disable variation. Rare tiles never affect collision.

## Shared object library

```ts
export const gridObjects = {
  voltorb: {
    id: 'voltorb',
    name: 'Voltorb',
    purpose: 'entity',
    size: { cols: 1, rows: 1 },
    asset: { src: '/games/grid-objects/voltorb.png' },
    collision: 'solid',
  },
  pushableStone: {
    id: 'pushable-stone',
    name: 'Pushable Stone',
    purpose: 'pushable',
    size: { cols: 2, rows: 2 },
    asset: { src: '/games/grid-objects/pushable-stone.png' },
    collision: 'pushable',
  },
} satisfies GridObjectLibrary
```

Map config references `objectId`; it does not duplicate sprite paths or sizes:

```ts
const scene: GridSceneConfig = {
  cols: 9,
  rows: 9,
  rendering: {
    spriteSetId: 'johto-dark-cave',
    floor: { seed: 'dark-cave-b1f', rareChance: 0.06 },
  },
  walls: [{ x: 0, y: 0 }, { x: 1, y: 0 }],
  blockers: [{ id: 'loose-rock', x: 3, y: 4, size: 1 }],
  objects: [{ id: 'voltorb-1', objectId: 'voltorb', x: 5, y: 2 }],
}
```

Generic blockers are floor-layer assets and are authored separately from entities. Their map footprint is explicitly `size: 1` or `size: 2`; neighboring blocker cells are not automatically merged. Floor markers provide ordinary goals and teleporters, while wall markers provide doorway, cave-entrance, or wall-mounted goal/teleporter art. A simple set can omit side/bottom walls entirely and provide only `walls.back`, which is repeated across the far/top edge.

Player art is supplied by the game/runtime through the game-specific player sprite setting. It is deliberately not part of a tile set or scene manifest.

## Existing-game adapters

- Rock Push keeps `barriers` as legacy 1×1 floor blockers. New layouts can use explicit `blockers`; boulders remain gameplay entities.
- Rock Tunnel Echo Map keeps its current `walls` field as legacy collision data until maps are manually classified. Architectural boundaries should become scene walls; rocks or rubble should become floor blockers or shared objects as appropriate.
- Voltorb Grid treats debris as gameplay entities and existing blockers as legacy floor blockers. New room boundaries use scene walls.

The current authored games use local themed sets: `basic-cave` for cave-oriented Echo/Voltorb boards and `grass` for outdoor Rock Push tests and the Western Road chronicle. Both sets deliberately contain only a common floor and repeated back wall, plus the generic blockers and gameplay tiles needed by the existing spatial games. There is no legacy `rock-cave` palette; unknown or retired ids resolve to the default palette. A solved Rock Push hole returns to the set's common floor after the drop animation, so sprite sets do not need a filled-hole asset. No external sprite pack is bundled. When an external set is selected, add its credit metadata to the manifest and `ATTRIBUTIONS.md` before assigning it to live content.
