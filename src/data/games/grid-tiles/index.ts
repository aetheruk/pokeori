import {
  GRID_LOGICAL_TILE_SIZE,
  type GridFloorRenderConfig,
  type GridGoalSurface,
  type GridObjectDefinition,
  type GridObjectPlacement,
  type GridObstaclePlacement,
  type GridObstaclePart,
  type GridObstaclePosition,
  type GridTileLegacyOverrides,
  type GridTilePackCredit,
  type GridTilePalette,
  type GridTileRole,
  type GridWallMask,
} from './types'
export * from './types'
export * from './schema'
export { gridObjects } from './objects'

export const DEFAULT_GRID_TILE_PALETTE_ID = 'basic-cave'
export const DEFAULT_GRID_PLAYER_SPRITE = '/games/rockpush/trainer.avif'
export const DEFAULT_RARE_FLOOR_CHANCE = 0.08
export const GRID_WALL_MASKS: GridWallMask[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

export function createGridWallVariants(directory: string): Record<GridWallMask, { src: string }> {
  return Object.fromEntries(
    GRID_WALL_MASKS.map((mask) => [mask, { src: `${directory}/${mask}.png` }]),
  ) as Record<GridWallMask, { src: string }>
}

export const gridTilePalettes = {
  grass: {
    id: 'grass',
    name: 'Grass field tile set',
    logicalTileSize: GRID_LOGICAL_TILE_SIZE,
    nativeTileSize: 64,
    floor: {
      common: { src: '/games/grid-tiles/grass/floor/common.png' },
      rare: [{
        id: 'clover',
        asset: { src: '/games/grid-tiles/grass/floor/rare-clover.png' },
        weight: 1,
      }],
      rareChance: 0.08,
      blockers: {
        small: { src: '/games/grid-tiles/grass/floor/blockers/small.png' },
        large: { src: '/games/grid-tiles/grass/floor/blockers/large.png' },
      },
      markers: {
        teleporter: { src: '/games/grid-tiles/grass/floor/markers/teleporter.png' },
        goal: { src: '/games/grid-tiles/grass/floor/markers/goal.png' },
      },
    },
    walls: {
      back: { src: '/games/grid-tiles/grass/walls/back.png' },
      markers: {
        goal: { src: '/games/grid-tiles/grass/walls/markers/goal.png' },
        teleporter: { src: '/games/grid-tiles/grass/walls/markers/teleporter.png' },
      },
    },
    gameplay: {
      boulder: { src: '/games/rockpush/boulder.avif' },
      ice: { src: '/games/grid-tiles/grass/gameplay/ice.png' },
      hole: { src: '/games/grid-tiles/grass/gameplay/hole.png' },
    },
    credits: [{
      label: 'Pokeori Grass Field tile set',
      notice: 'Generated 64×64 native tiles (128×128 for 2×2 blockers) on a 16×16 logical grid for the reusable grass-themed puzzle set.',
      external: false,
    }],
  },
  'psychic-quiet-room': {
    id: 'psychic-quiet-room',
    name: 'Psychic Quiet Room tile set',
    logicalTileSize: GRID_LOGICAL_TILE_SIZE,
    nativeTileSize: 64,
    floor: {
      common: { src: '/games/grid-tiles/psychic-quiet-room/floor/common.png' },
      rare: [
        {
          id: 'constellation',
          asset: { src: '/games/grid-tiles/psychic-quiet-room/floor/rare-constellation.png' },
          weight: 1,
        },
      ],
      rareChance: 0.08,
      blockers: {
        small: { src: '/games/grid-tiles/psychic-quiet-room/floor/blockers/small.png' },
        large: { src: '/games/grid-tiles/psychic-quiet-room/floor/blockers/large.png' },
      },
      markers: {
        goal: { src: '/games/grid-tiles/psychic-quiet-room/floor/markers/goal.png' },
        teleporter: { src: '/games/grid-tiles/psychic-quiet-room/floor/markers/teleporter.png' },
      },
    },
    walls: {
      back: { src: '/games/grid-tiles/psychic-quiet-room/walls/back.png' },
      markers: {
        goal: { src: '/games/grid-tiles/psychic-quiet-room/walls/markers/goal.png' },
        teleporter: { src: '/games/grid-tiles/psychic-quiet-room/walls/markers/teleporter.png' },
      },
    },
    gameplay: {
      boulder: { src: '/games/rockpush/boulder.avif' },
      ice: { src: '/games/grid-tiles/psychic-quiet-room/gameplay/ice.png' },
      hole: { src: '/games/grid-tiles/psychic-quiet-room/gameplay/hole.png' },
    },
    credits: [{
      label: 'Pokeori Psychic Quiet Room tile set',
      notice: 'Generated 64×64 native tiles (128×128 for 2×2 blockers) for the Sabrina Chronicle on the shared 16×16 logical grid.',
      external: false,
    }],
  },
  'wooden-interior': {
    id: 'wooden-interior',
    name: 'Wooden Gym Interior tile set',
    logicalTileSize: GRID_LOGICAL_TILE_SIZE,
    nativeTileSize: 64,
    floor: {
      common: { src: '/games/grid-tiles/wooden-interior/floor/common.png' },
      rare: [{
        id: 'amber-plank',
        asset: { src: '/games/grid-tiles/wooden-interior/floor/rare-amber.png' },
        weight: 1,
      }],
      rareChance: 0.08,
      blockers: {
        small: { src: '/games/grid-tiles/wooden-interior/floor/blockers/small.png' },
        large: { src: '/games/grid-tiles/wooden-interior/floor/blockers/large.png' },
      },
      markers: {
        teleporter: { src: '/games/grid-tiles/wooden-interior/floor/markers/teleporter.png' },
        goal: { src: '/games/grid-tiles/wooden-interior/floor/markers/goal.png' },
      },
    },
    walls: {
      back: { src: '/games/grid-tiles/wooden-interior/walls/back.png' },
      markers: {
        goal: { src: '/games/grid-tiles/wooden-interior/walls/markers/goal.png' },
        teleporter: { src: '/games/grid-tiles/wooden-interior/walls/markers/teleporter.png' },
      },
    },
    gameplay: {
      boulder: { src: '/games/rockpush/boulder.avif' },
      ice: { src: '/games/grid-tiles/wooden-interior/gameplay/ice.png' },
      hole: { src: '/games/grid-tiles/wooden-interior/gameplay/hole.png' },
    },
    credits: [{
      label: 'Pokeori Wooden Gym Interior tile set',
      notice: 'Generated 64×64 native tiles (128×128 for 2×2 blockers) for reusable indoor maze scenes on the shared 16×16 logical grid.',
      external: false,
    }],
  },
  'industrial-power': {
    id: 'industrial-power',
    name: 'Industrial Power Plant tile set',
    logicalTileSize: GRID_LOGICAL_TILE_SIZE,
    nativeTileSize: 64,
    floor: {
      common: { src: '/games/grid-tiles/industrial-power/floor/common.png' },
      rare: [{
        id: 'warning-plate',
        asset: { src: '/games/grid-tiles/industrial-power/floor/rare-warning.png' },
        weight: 1,
      }],
      rareChance: 0.08,
      blockers: {
        small: { src: '/games/grid-tiles/industrial-power/floor/blockers/small.png' },
        large: { src: '/games/grid-tiles/industrial-power/floor/blockers/large.png' },
      },
      markers: {
        teleporter: { src: '/games/grid-tiles/industrial-power/floor/markers/teleporter.png' },
        goal: { src: '/games/grid-tiles/industrial-power/floor/markers/goal.png' },
      },
    },
    walls: {
      back: { src: '/games/grid-tiles/industrial-power/walls/back.png' },
      markers: {
        goal: { src: '/games/grid-tiles/industrial-power/walls/markers/goal.png' },
        teleporter: { src: '/games/grid-tiles/industrial-power/walls/markers/teleporter.png' },
      },
    },
    gameplay: {
      boulder: { src: '/games/rockpush/boulder.avif' },
      ice: { src: '/games/grid-tiles/industrial-power/gameplay/ice.png' },
      hole: { src: '/games/grid-tiles/industrial-power/gameplay/hole.png' },
    },
    credits: [{
      label: 'Pokeori Industrial Power Plant tile set',
      notice: 'Generated 64×64 native tiles (128×128 for 2×2 blockers) for reusable substation and power-plant scenes on the shared 16×16 logical grid.',
      external: false,
    }],
  },
  laboratory: {
    id: 'laboratory',
    name: 'Research Laboratory tile set',
    logicalTileSize: GRID_LOGICAL_TILE_SIZE,
    nativeTileSize: 64,
    floor: {
      common: { src: '/games/grid-tiles/laboratory/floor/common.png' },
      rare: [{
        id: 'starlight-tile',
        asset: { src: '/games/grid-tiles/laboratory/floor/rare-starlight.png' },
        weight: 1,
      }],
      rareChance: 0.08,
      blockers: {
        small: { src: '/games/grid-tiles/laboratory/floor/blockers/small.png' },
        large: { src: '/games/grid-tiles/laboratory/floor/blockers/large.png' },
      },
      markers: {
        teleporter: { src: '/games/grid-tiles/laboratory/floor/markers/teleporter.png' },
        goal: { src: '/games/grid-tiles/laboratory/floor/markers/goal.png' },
      },
    },
    walls: {
      back: { src: '/games/grid-tiles/laboratory/walls/back.png' },
      markers: {
        goal: { src: '/games/grid-tiles/laboratory/walls/markers/goal.png' },
        teleporter: { src: '/games/grid-tiles/laboratory/walls/markers/teleporter.png' },
      },
    },
    gameplay: {
      boulder: { src: '/games/rockpush/boulder.avif' },
      ice: { src: '/games/grid-tiles/laboratory/gameplay/ice.png' },
      hole: { src: '/games/grid-tiles/laboratory/gameplay/hole.png' },
    },
    credits: [{
      label: 'Pokeori Research Laboratory tile set',
      notice: 'Generated 64×64 native tiles (128×128 for 2×2 blockers) for reusable lab and containment scenes on the shared 16×16 logical grid.',
      external: false,
    }],
  },
  'basic-cave': {
    id: 'basic-cave',
    name: 'Basic Cave tile set',
    logicalTileSize: GRID_LOGICAL_TILE_SIZE,
    nativeTileSize: 64,
    floor: {
      common: { src: '/games/grid-tiles/basic-cave/floor/common.png' },
      rare: [{
        id: 'mineral',
        asset: { src: '/games/grid-tiles/basic-cave/floor/rare-mineral.png' },
        weight: 1,
      }],
      rareChance: 0.08,
      blockers: {
        small: { src: '/games/grid-tiles/basic-cave/floor/blockers/small.png' },
        large: { src: '/games/grid-tiles/basic-cave/floor/blockers/large.png' },
      },
      markers: {
        teleporter: { src: '/games/grid-tiles/basic-cave/floor/markers/teleporter.png' },
        goal: { src: '/games/grid-tiles/basic-cave/floor/markers/goal.png' },
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
      label: 'Pokeori Basic Cave tile set',
      notice: 'Generated 64×64 native tiles (128×128 for 2×2 blockers) on a 16×16 logical grid for the reusable default set.',
      external: false,
    }],
  },
} as const satisfies Record<string, GridTilePalette>

export type GridTilePaletteId = keyof typeof gridTilePalettes
export const GRID_TILE_PALETTE_IDS = Object.keys(gridTilePalettes) as GridTilePaletteId[]

export function isGridTilePaletteId(value: string): value is GridTilePaletteId {
  return value in gridTilePalettes
}

export function getGridTilePalette(paletteId: string | undefined): GridTilePalette {
  if (paletteId && isGridTilePaletteId(paletteId)) return gridTilePalettes[paletteId]
  return gridTilePalettes[DEFAULT_GRID_TILE_PALETTE_ID]
}

function floorBlockerSource(palette: GridTilePalette, size: 1 | 2): string {
  const blockers = palette.floor.blockers
  return (size === 2 ? blockers?.large : blockers?.small)?.src || blockers?.small.src || palette.floor.common.src
}

/** Compatibility adapter for existing renderers and bespoke role overrides. */
export function resolveGridTileSources(
  paletteId: string | undefined,
  overrides: GridTileLegacyOverrides = {},
): Record<GridTileRole, string> {
  const palette = getGridTilePalette(paletteId)
  const sources = {
    floor: palette.floor.common.src,
    barrier: floorBlockerSource(palette, 1),
    ...Object.fromEntries(Object.entries(palette.gameplay).map(([role, asset]) => [role, asset.src])),
    goal: palette.floor.markers?.goal?.src || palette.floor.common.src,
    teleporter: palette.floor.markers?.teleporter?.src || palette.floor.common.src,
    player: DEFAULT_GRID_PLAYER_SPRITE,
  } as Record<GridTileRole, string>
  for (const [role, src] of Object.entries(overrides)) {
    if (src) sources[role as GridTileRole] = src
  }
  return sources
}

function hashString(value: string): number {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

/** Stable visual-only floor selection: rerenders never shuffle the scene. */
export function resolveGridFloorSourceFromPalette(
  palette: GridTilePalette,
  x: number,
  y: number,
  config: GridFloorRenderConfig = {},
): string {
  const rare = palette.floor.rare || []
  const chance = Math.min(1, Math.max(0, config.rareChance ?? palette.floor.rareChance ?? DEFAULT_RARE_FLOOR_CHANCE))
  if (rare.length === 0 || chance === 0) return palette.floor.common.src
  const key = `${palette.id}:${config.seed || 'default'}:${x}:${y}`
  if (hashString(`${key}:chance`) / 0x100000000 >= chance) return palette.floor.common.src
  const weights = rare.map((variant) => Math.max(0, variant.weight ?? 1))
  const totalWeight = weights.reduce((total, weight) => total + weight, 0)
  if (totalWeight <= 0) return palette.floor.common.src
  let selection = (hashString(`${key}:variant`) / 0x100000000) * totalWeight
  for (let index = 0; index < rare.length; index += 1) {
    selection -= weights[index]
    if (selection < 0) return rare[index].asset.src
  }
  return rare[rare.length - 1].asset.src
}

export function resolveGridFloorSource(
  paletteId: string | undefined,
  x: number,
  y: number,
  config: GridFloorRenderConfig = {},
): string {
  return resolveGridFloorSourceFromPalette(getGridTilePalette(paletteId), x, y, config)
}

export function getGridWallMask(
  x: number,
  y: number,
  isWall: (x: number, y: number) => boolean,
): GridWallMask {
  let mask = 0
  if (isWall(x, y - 1)) mask |= 1
  if (isWall(x + 1, y)) mask |= 2
  if (isWall(x, y + 1)) mask |= 4
  if (isWall(x - 1, y)) mask |= 8
  return mask as GridWallMask
}

export function resolveGridWallSource(paletteId: string | undefined, mask: GridWallMask): string {
  const palette = getGridTilePalette(paletteId)
  return palette.walls?.variants?.[mask]?.src || palette.walls?.back?.src || floorBlockerSource(palette, 1)
}

export function resolveGridBackWallSource(paletteId: string | undefined): string | undefined {
  return getGridTilePalette(paletteId).walls?.back?.src
}

/** Simple sets intentionally render only a repeated back wall along the top edge. */
export function isGridBackWallOnly(paletteId: string | undefined): boolean {
  const walls = getGridTilePalette(paletteId).walls
  return Boolean(walls?.back && !walls.variants)
}

/**
 * Return whether a cell belongs to the automatically supplied boundary for a
 * palette. Simple back-wall sets reserve only the top row for wall art; the
 * remaining board edges are ordinary floor cells bounded by the grid itself.
 * Connected architectural sets retain the legacy full outer boundary so their
 * authored wall masks continue to render correctly.
 */
export function isGridBoundaryWall(
  paletteId: string | undefined,
  x: number,
  y: number,
  size: number,
): boolean {
  if (isGridBackWallOnly(paletteId)) return y === 0
  return x === 0 || x === size - 1 || y === 0 || y === size - 1
}

export function resolveGridObstacleSources(
  paletteId: string | undefined,
  smallOverride?: string,
): { small: string; large: string } {
  const palette = getGridTilePalette(paletteId)
  const small = smallOverride || floorBlockerSource(palette, 1)
  return { small, large: floorBlockerSource(palette, 2) || small }
}

export function resolveGridFrameSource(paletteId: string | undefined): string | undefined {
  return getGridTilePalette(paletteId).walls?.frame?.src
}

export function resolveGridFrameSlice(paletteId: string | undefined): number {
  return getGridTilePalette(paletteId).nativeTileSize
}

export function resolveGridWallMarkerSource(
  paletteId: string | undefined,
  marker: 'goal' | 'teleporter',
): string | undefined {
  return getGridTilePalette(paletteId).walls?.markers?.[marker]?.src
}

export function resolveGridFloorMarkerSource(
  paletteId: string | undefined,
  marker: 'goal' | 'teleporter',
): string | undefined {
  return getGridTilePalette(paletteId).floor.markers?.[marker]?.src
}

/** Resolve a goal marker by the surface it occupies; floor and wall art never cross-fallback. */
export function resolveGridGoalSource(
  paletteId: string | undefined,
  surface: GridGoalSurface,
  override?: string,
): string | undefined {
  if (override) return override
  return surface === 'wall'
    ? resolveGridWallMarkerSource(paletteId, 'goal')
    : resolveGridFloorMarkerSource(paletteId, 'goal')
}

function obstacleKey(position: GridObstaclePosition): string { return `${position.x},${position.y}` }

/** Legacy adapter. New scenes author blocker size explicitly; implicit grouping is opt-in. */
export function getGridObstaclePlacements(
  positions: GridObstaclePosition[],
  options: { allowLarge?: boolean } = {},
): GridObstaclePlacement[] {
  if (options.allowLarge !== true) return positions.map((position) => ({ ...position, size: 1 }))
  const available = new Set(positions.map(obstacleKey))
  const claimed = new Set<string>()
  const placements: GridObstaclePlacement[] = []
  const sorted = [...positions].sort((a, b) => a.y - b.y || a.x - b.x)
  for (const position of sorted) {
    const key = obstacleKey(position)
    if (claimed.has(key)) continue
    const footprint = [position, { x: position.x + 1, y: position.y }, { x: position.x, y: position.y + 1 }, { x: position.x + 1, y: position.y + 1 }]
    const canUseLarge = footprint.every((cell) => available.has(obstacleKey(cell)) && !claimed.has(obstacleKey(cell)))
    if (canUseLarge) {
      footprint.forEach((cell) => claimed.add(obstacleKey(cell)))
      placements.push({ ...position, size: 2 })
    } else {
      claimed.add(key)
      placements.push({ ...position, size: 1 })
    }
  }
  return placements
}

export function getGridObstacleParts(
  positions: GridObstaclePosition[],
  options: { allowLarge?: boolean } = {},
): Map<string, GridObstaclePart> {
  const parts = new Map<string, GridObstaclePart>()
  for (const placement of getGridObstaclePlacements(positions, options)) {
    for (let offsetY = 0; offsetY < placement.size; offsetY += 1) {
      for (let offsetX = 0; offsetX < placement.size; offsetX += 1) {
        const part = { ...placement, offsetX: offsetX as 0 | 1, offsetY: offsetY as 0 | 1 }
        parts.set(`${placement.x + offsetX},${placement.y + offsetY}`, part)
      }
    }
  }
  return parts
}

export function getGridTilePackCredits(options?: { externalOnly?: boolean }): GridTilePackCredit[] {
  const credits: GridTilePackCredit[] = (Object.values(gridTilePalettes) as GridTilePalette[]).flatMap(
    (palette) => palette.credits,
  )
  const filtered = options?.externalOnly ? credits.filter((credit) => credit.external) : credits
  return Array.from(new Map(filtered.map((credit) => [`${credit.label}:${credit.href || 'local'}`, credit])).values())
}
