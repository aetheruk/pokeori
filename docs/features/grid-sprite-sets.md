# Grid sprite-set contract

The shared grid renderer uses a 16×16 logical cell. Current production-ready art is authored at 64×64 native pixels per logical cell (and 128×128 for a 2×2 footprint), then scaled responsively by the renderer. This keeps movement, collision, and authored coordinates stable while giving mobile screens enough source detail. A sprite set owns terrain and floor-layer art. Reusable entities are registered separately, and scene geometry is authored by each game.

## Asset layout

```text
public/games/grid-tiles/<set-id>/
  floor/
    common.png                 # 64x64 native art for one 16px logical cell
    rare-pebbles.png           # 64x64 common-base texture overlay, optional
    rare-crack.png             # 64x64 common-base texture overlay, optional
    blockers/
      small.png                # 64x64 generic 1x1 blocker
      large.png                # 128x128 generic 2x2 blocker, optional
  walls/
    back.png                  # optional 64x64 repeated far/top wall
    0.png ... 15.png           # 64x64 connected wall variants
    frame.png                  # optional 192x192 3x3 border atlas
    markers/
      goal.png                 # optional 64x64 marker in a wall/doorway
      teleporter.png            # optional 64x64 marker in a wall/entrance
  gameplay/
    boulder.png
    ice.png                    # 64x64 opaque, edge-to-edge tileable ice
    hole.png
```

Reusable objects are not nested under a tile set; register them in `src/data/games/grid-tiles/objects.ts`:

```text
public/games/grid-objects/
  voltorb.png
  pushable-stone.png
  dialogue-sign.png
```

The object library defines each object’s purpose (for example entity, hazard,
destructible, pushable, decoration, or dialogue), native footprint, collision
behaviour, and sprite. This lets the same Voltorb, breakable rock, pushable
  stone, decoration, or future dialogue object appear in multiple map sets. A
  1×1 object uses a 64×64 native canvas; a 2×2 object uses 128×128; larger
  dimensions remain possible for future content. The logical footprint remains
  one or two 16px cells.

Wall filenames are four-bit cardinal masks: north `1`, east `2`, south `4`, west `8`. For example, north + east is `3`, east + west is `10`, and all four directions is `15`. Each mask should be deliberately authored with the correct corners and side faces.

When a high-resolution `frame.png` atlas is used, the renderer slices it at the
palette's `nativeTileSize` (64px today). The logical frame footprint is still
one 16px cell, so map coordinates and collision do not change.

## Sprite-set manifest

```ts
const caveSet: GridTilePalette = {
  id: 'basic-cave',
  name: 'Basic Cave',
  logicalTileSize: 16,
  nativeTileSize: 64,

  floor: {
    common: { src: '/games/grid-tiles/basic-cave/floor/common.png' },
    rareChance: 0.08,
    rare: [
      { id: 'mineral', asset: { src: '/games/grid-tiles/basic-cave/floor/rare-mineral.png' }, weight: 1 },
    ],
    blockers: {
      small: { src: '/games/grid-tiles/basic-cave/floor/blockers/small.png' },
      large: { src: '/games/grid-tiles/basic-cave/floor/blockers/large.png' },
    },
    markers: {
      goal: { src: '/games/grid-tiles/basic-cave/floor/markers/goal.png' },
      teleporter: { src: '/games/grid-tiles/basic-cave/floor/markers/teleporter.png' },
    },
  },

  walls: {
    back: { src: '/games/grid-tiles/basic-cave/walls/back.png' },
    markers: {
      goal: { src: '/games/grid-tiles/basic-cave/walls/markers/goal.png' },
      teleporter: { src: '/games/grid-tiles/basic-cave/walls/markers/teleporter.png' },
    },
  },

  gameplay: {
    boulder: { src: '/games/rockpush/boulder.avif' },
    ice: { src: '/games/grid-tiles/basic-cave/gameplay/ice.png' },
    hole: { src: '/games/grid-tiles/basic-cave/gameplay/hole.png' },
  },

  credits: [{
    label: 'Pokeori Basic Cave Tiles',
    notice: 'Generated and arranged for Pokeori.',
    external: false,
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
    spriteSetId: 'basic-cave',
    floor: { seed: 'dark-cave-b1f', rareChance: 0.06 },
  },
  walls: [{ x: 0, y: 0 }, { x: 1, y: 0 }],
  blockers: [{ id: 'loose-rock', x: 3, y: 4, size: 1 }],
  objects: [{ id: 'voltorb-1', objectId: 'voltorb', x: 5, y: 2 }],
}
```

Generic blockers are floor-layer assets and are authored separately from entities. Their map footprint is explicitly `size: 1` or `size: 2`; neighboring blocker cells are not automatically merged. Floor markers provide ordinary goals and teleporters, while wall markers provide doorway, cave-entrance, or wall-mounted goal/teleporter art. A goal is resolved by its surface (`floor` or `wall`); wall goals never reuse a floor goal sprite. A simple set can omit side/bottom walls entirely and provide only `walls.back`, which is repeated across the far/top edge. Rare floors retain the common tile as their base and add only a sparse texture/decal, so switching between common and rare cells does not create a seam. Ice gameplay tiles are opaque, edge-to-edge, and authored so their left/right and top/bottom edges meet when repeated.

Player art is supplied by the game/runtime through the game-specific player sprite setting. It is deliberately not part of a tile set or scene manifest.

## Grid Puzzle integration

All three spatial rulesets run under `gameType: 'grid-puzzle'` and select their
behaviour with `settings.variant`: `rock-push`, `voltorb`, or `echo-map`.
Their current authored coordinate fields remain deliberately small and map to
the shared layers: architectural `walls`, floor-layer `blockers`, and reusable
`objects`. Variant-specific state (blast radius, destruction, chain reactions,
or Flash reveal timing) stays in the ruleset rather than in the object library.

Voltorb and breakable rock are registered in `grid-tiles/objects.ts`, so future
scene-authored boards can reference the same entities without duplicating sprite
paths or footprints. The cracked breakable-rock sprite uses the same transparent
silhouette as the pushable boulder, so it does not introduce a square matte when
rendered over any floor. Placement `properties` are available for per-instance
state, while the shared definition remains terrain-independent.

The current authored games use local themed sets: `basic-cave` for cave-oriented Echo/Voltorb boards, `grass` for outdoor Rock Push and rooftop boards, `wooden-interior` for Koga's Fuchsia Gym invisible mazes, `industrial-power` for Lt. Surge's substation, `laboratory` for Blaine's lab, and `psychic-quiet-room` for Sabrina's Quiet Room Echo Map. Each set supplies its own aligned common/rare floor pair, repeated back wall, 1×1/2×2 blockers, gameplay tiles, and floor/wall marker pair. The Quiet Room adds a calm indigo-violet floor and memory-void holes; the cave and grass sets retain their role-specific ladder/fairy-ring markers. There is no legacy `rock-cave` palette; unknown or retired ids resolve to the default palette. A solved Rock Push hole returns to the set's common floor after the drop animation, so sprite sets do not need a filled-hole asset. No external sprite pack is bundled. When an external set is selected, add its credit metadata to the manifest and `ATTRIBUTIONS.md` before assigning it to live content.

Native field QA renders for the six sets live under `docs/previews/`: grass, basic cave, and psychic quiet-room showcases plus the authored Fuchsia Gym, Surge substation, and Blaine laboratory fields. They are kept at native 64px-per-logical-cell scale so floor seams, marker silhouettes, blocker footprints, and transparent object edges can be inspected directly.
