# Grid sprite-set contract

The combined `grid-adventure-test` has three connected outdoor scenes and five Route 1 Pokémon sprite battle markers. Any three successful battles clear it; the three lives are an independent optional failure limit, and the course has no move limit or step counter. `grid-adventure-celadon-game-corner-test` uses opaque, edge-to-edge checkerboard floor tiles, a centered doorway built into the top wall, and twelve interactive slot machines arranged in four columns across three rows. Each machine uses the low-stakes 5-token test slot game and receives its own stable 20–55% win rate, weighted toward 35%, when a run starts. The live `Rocket Slots` adventure begins as one low-stakes room; after `high-roller`, that Explore entry is replaced by a two-room adventure with a center back-wall connection, a bottom-center floor mat exit, a matching return mat, and twelve green-sprite high-stakes machines in the second room. Wall-row teleporters render as door markers and remain traversable in both client movement and verified proof replay; themed floor mats serve as floor goals or room teleporters. Machine rates are generated independently for each run and saved with the server-side board state; the active machine's odds appear in its slot odds panel. Room schemas validate object placements with the shared object schema. Grid initialization ignores overlapping starts so an encounter/battle return cannot consume its saved room checkpoint twice. Integrated activities return to the grid without a standalone replay button. Object placements are removed on success by default, while `removeOnSuccess: false` keeps reusable objects such as slot machines on the board.

Player appearance comes from the saved trainer gender in all three grid variants, independently of terrain sets: Lucas for male, Dawn for female, and Ditto for neither or an unset legacy profile. `GridPlayerSprite` renders all three 256×256 sheets as sixteen 64×64 frames, with down, left, right, and up rows and four movement frames per row. Ditto uses the Following Pokémon EX overworld sheet and shares the 360ms walking cycle. Voltorb and protected Kanto Rattata/Ditto use downward-facing overworld frames; full source sheets and extracted idle frames live in `public/games/overworld/`. Credits are recorded in `ATTRIBUTIONS.md` and the in-app Credits & Legal registry. Player appearance does not affect collisions or game rules. Legacy per-game player sprite overrides are no longer used by these renderers; the generic trainer asset remains available for NPC battle markers.

The rare Gengar catch marker on the top floor of the Pokémon Tower Ghost Trial uses the first downward-facing 64×64 frame from the Gengar follower sheet in Generation 9 Pack v3.3.8, replacing the previous battle-front sprite. Its source sheet and pack credits are recorded in `ATTRIBUTIONS.md` and Credits & Legal.

The shared grid renderer uses a 16×16 logical cell. Current production-ready art is authored at 64×64 native pixels per logical cell (and 128×128 for a 2×2 footprint), then scaled responsively by the renderer. This keeps movement, collision, and authored coordinates stable while giving mobile screens enough source detail. The renderer waits until it has measured its container before revealing the board, avoiding a visible scale and position correction on mount. Grid Adventure restores its saved scene before rendering the board after an integrated activity returns. A sprite set owns terrain and floor-layer art. Reusable entities are registered separately, and scene geometry is authored by each game.

The live `Rocket Pachinko` Adventure follows the same one-entry/two-room pattern as Rocket Slots. Both rooms contain twelve reusable interactive cabinets; high-stakes cabinets use the green Pachinko sprite. The server saves each cabinet's stable bucket offsets (at most three board units), width changes (at most two units), and per-slot token payouts (within 8% of standard), then scales its wager and all payouts fivefold in the high-stakes room. Pachinko rounds verify that their exact cabinet placement is still part of the active Adventure before they can settle.

The Celadon `Game Plaza` Adventure uses transparent 64×64 cabinet sprites for
Match 3, Prize Wheel, and UFO Catcher. The standard room has one of each. After
`high-roller`, the same Explore entry shows all three green-and-gold high-stakes
cabinet sprites beside their standard counterparts in the same room, matching
the premium Slots and Pachinko machines. Every cabinet launches its grid-only
activity through its saved object placement; only the High Stakes UFO Catcher's
stake changes to 300 Fun Tokens.

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

Buggy and Feathered Gauntlet trainer markers use the matching FRLG Bug Catcher
and Bird Keeper sprites. The Pokémon Tower Ghost Trial uses a female Psychic
sprite from the same pack for its Channeler markers because the pack does not
include a dedicated Channeler sheet. Their original sheets stay unchanged under
`public/games/trainers/source/`; the sheets contain 32×48 frames. The object
assets use nearest-neighbor 2× scaling of the complete first frame to 64×96;
the grid contains them within the square 64×64 object cell. Source details and
credits are in
`ATTRIBUTIONS.md`.

Interactive object types can opt into `interaction: 'battle'` or
`interaction: 'encounter'` on their shared definition. A map placement then
provides the target id and `victory: 'win' | 'clear'`:

```ts
objects: [{
  id: 'wild-encounter-a',
  objectId: 'encounter-trigger',
  x: 4,
  y: 3,
  interaction: {
    type: 'encounter',
    targetId: 'route-10',
    victory: 'clear',
  },
}]
```

Interactive objects block movement until cleared. Face an adjacent object and
use the A action (or press E) to launch its external activity. A failed result
leaves the player beside the object, where it can be retried. Successful
interactions are included in the server-verified movement proof. `win`
completes the active Grid Puzzle after the external activity succeeds; `clear`
records that placement as a success while allowing the board to continue.
Placements are removed on success by default; set `removeOnSuccess: false` to
keep an activity object visible and available to interact with again. Persistent
objects count only once toward a board's distinct-placement win condition. Rock Push persists its board snapshot while the
battle, encounter, or minigame screen is open and restores it when the result
returns to `/game/games/grid-puzzle`.
Use the `wild-battle-trigger` object for wild battle targets so the board shows
a Poké Ball marker instead of the trainer sprite used by `battle-trigger`.

Rock Push settings may include an optional `lives` count. When configured,
returning from a failed integrated battle, catch, or minigame removes one life;
reaching zero ends the puzzle. Courses without `lives` keep the existing
unlimited integrated-attempt behavior. An optional `winCondition` can finish an
open-choice board after a configured number of distinct external activity
placements succeed, without requiring every placed activity to be completed.
The Kanto test course uses three lives and requires three wins from its five
Route 1 battle markers.

Each placement may also define Explore-style `requirements` and `criteria`.
Requirements from the placement and its linked activity determine visibility
when a Grid Adventure run is created; hidden objects are removed from the saved
board, so they do not block movement or count toward board completion. Criteria
from both sources keep the object visible but disable interaction until met.
The board refreshes criteria for display, then rechecks them on the server when
the player interacts and again when the child activity starts. Consumable item,
currency, and Pokémon criteria use the existing activity consumption rules,
including a Pokémon selection step when required. This applies to battle,
encounter, Mini Game, and Field Research objects.

Floor prize squares may also define `requirements`. The server filters these
before saving the board, so unavailable pickups are not rendered, collected, or
included in completion rewards. A Grid Adventure generates a fresh roll on the
server and saves it in private session state; its object and prize requirements,
plus child activity checks, use that same roll for the whole run. The client
never supplies the roll, and other game systems continue using the player's
global roll. The repeatable Buggy and Feathered Gauntlets each use a 1-in-5 roll
to place three separate one-item material pickups on the floor: Chitin
Fragments in the forest and Wing Feathers on Route 14.

Object placements may share a `randomGroup` with a stable id and `selectCount`.
At run creation, the server uses the pinned roll to deterministically choose
the requested number of group members. Only those placements are saved to the
board and accepted by child-activity authorization. A group can also name a
`uniquePoolId`; groups that share that pool select distinct interaction targets
across their independent selections. This supports one random activity on each
screen while avoiding duplicate targets. The Pokémon Tower Ghost Trial uses
this to place five distinct Secret Channelers, one per floor, from the thirteen
story trainers. Its five floors connect through centered back-wall doorways;
floors two through four each hold an Ectoplasm pickup, and the top-floor trainer
is replaced by a Gengar catch encounter on 15% of runs.

Use the `minigame-trigger` object for any authored Mini Game under
`interaction.type: 'minigame'`; use `field-research-trigger` for an authored
Field Observation under `interaction.type: 'field-research'`. The parent Rock
Push session stays in its own slot while each child uses its normal game or
Field Research runtime. Activities and battles marked `gridAdventureOnly` are
authorized on the server only when the exact object key and target id are
present on the active board. Slot spins and completion recheck that relationship
against the saved child context. Grid-launched Slots return to the saved grid with their
verified result, and the server checks that activity's saved win before
recording the interaction. Completion
acknowledgments are distinct from game wins, so a losing Slots session is not
recorded as a successful object interaction. Grid-launched activities omit
their standalone replay action; reusable placements can still be played again
when authored with `removeOnSuccess: false`.

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

Players render in a persistent board overlay through `GridPlayerToken`, so a
cell move translates the same element rather than mounting it in a new tile.
Normal moves take 360ms and cycle the four facing-row frames at 90ms per frame,
then return to frame zero. Rock Push ice slides take 360ms plus 160ms per extra
cell, capped at 1200ms, with the same 90ms sprite cadence. Voltorb and
Echo Map pace accepted movement inputs to one per 360ms to finish each cell
before turning. Reduced motion disables translation and walking animation;
undo/reset and screen changes snap to their destination. Logical positions,
collision checks, and server move proofs still update in whole cells.

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

The current authored games use local themed sets: `basic-cave` for cave-oriented Echo/Voltorb boards, `grass` for outdoor Rock Push and rooftop boards, `wooden-interior` for Koga's Fuchsia Gym invisible mazes, `industrial-power` for Lt. Surge's substation, `laboratory` for Blaine's lab, `psychic-quiet-room` for Sabrina's Quiet Room Echo Map, and `pokemon-tower` for the post-story Ghost Trial. The Tower palette pairs plum stone floors with a stained-glass shrine wall and a centered violet-arch doorway marker. Each set supplies its own repeated back wall, 1×1/2×2 blockers, gameplay tiles, and floor/wall marker pair; rare floor variants are optional. The Quiet Room adds a calm indigo-violet floor and memory-void holes; the cave and grass sets retain their role-specific ladder/fairy-ring markers. There is no legacy `rock-cave` palette; unknown or retired ids resolve to the default palette. A solved Rock Push hole returns to the set's common floor after the drop animation, so sprite sets do not need a filled-hole asset. No external sprite pack is bundled. When an external set is selected, add its credit metadata to the manifest and `ATTRIBUTIONS.md` before assigning it to live content.

Native field QA renders for the six sets live under `docs/previews/`: grass, basic cave, and psychic quiet-room showcases plus the authored Fuchsia Gym, Surge substation, and Blaine laboratory fields. They are kept at native 64px-per-logical-cell scale so floor seams, marker silhouettes, blocker footprints, and transparent object edges can be inspected directly.
