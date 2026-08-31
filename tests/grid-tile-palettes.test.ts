import { describe, expect, test } from 'bun:test'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { getPixelGridMetrics } from '@/components/game/shared/pixel-grid-board'
import { allGames } from '@/data/games'
import {
  GRID_LOGICAL_TILE_SIZE,
  GRID_TILE_PALETTE_IDS,
  GRID_WALL_MASKS,
  getGridObstacleParts,
  getGridObstaclePlacements,
  getGridTilePackCredits,
  getGridTilePalette,
  getGridWallMask,
  createGridSceneConfigSchema,
  gridObjectLibrarySchema,
  gridObjectDefinitionSchema,
  gridObjects,
  gridTilePaletteSchema,
  gridSceneConfigSchema,
  gridTilePalettes,
  isGridTilePaletteId,
  resolveGridFloorSourceFromPalette,
  resolveGridGoalSource,
  resolveGridTileSources,
} from '@/data/games/grid-tiles'
import type { GridTileAsset, GridTilePalette } from '@/data/games/grid-tiles'

function expectAssetExists(asset: GridTileAsset) {
  expect(asset.src.startsWith('/')).toBe(true)
  expect(existsSync(path.join(process.cwd(), 'public', asset.src))).toBe(true)
}

describe('shared grid sprite sets', () => {
  test('all manifests keep a 16px logical grid with 64px native art', () => {
    const palettes: GridTilePalette[] = Object.values(gridTilePalettes)
    for (const palette of palettes) {
      expect(palette.logicalTileSize).toBe(GRID_LOGICAL_TILE_SIZE)
      expect(palette.nativeTileSize).toBe(64)
      expect(palette.credits.length).toBeGreaterThan(0)
      expectAssetExists(palette.floor.common)
      palette.floor.rare?.forEach((variant) => expectAssetExists(variant.asset))
      if (palette.floor.blockers?.small)
        expectAssetExists(palette.floor.blockers.small)
      if (palette.floor.blockers?.large)
        expectAssetExists(palette.floor.blockers.large)
      if (palette.floor.markers?.goal)
        expectAssetExists(palette.floor.markers.goal)
      if (palette.floor.markers?.teleporter)
        expectAssetExists(palette.floor.markers.teleporter)
      Object.values(palette.gameplay).forEach(expectAssetExists)
      if (palette.walls?.back) expectAssetExists(palette.walls.back)
      Object.values(palette.walls?.variants || {}).forEach(expectAssetExists)
      if (palette.walls?.frame) expectAssetExists(palette.walls.frame)
      if (palette.walls?.markers?.goal) expectAssetExists(palette.walls.markers.goal)
      if (palette.walls?.markers?.teleporter) expectAssetExists(palette.walls.markers.teleporter)
    }
    expect(getGridTilePalette('basic-cave').walls?.back?.src).toBe(
      '/games/grid-tiles/basic-cave/walls/back.png',
    )
    expect(gridTilePalettes.grass.floor.markers?.goal?.src).not.toBe(
      gridTilePalettes.grass.floor.markers?.teleporter?.src,
    )
    expect(gridTilePalettes.grass.floor.markers?.goal?.src).not.toBe(
      '/games/rockpush/win-tile.avif',
    )
    expect(gridTilePalettes['basic-cave'].floor.markers?.goal?.src).not.toBe(
      gridTilePalettes['basic-cave'].floor.markers?.teleporter?.src,
    )
    expect(gridTilePalettes['basic-cave'].floor.markers?.goal?.src).not.toBe(
      '/games/rockpush/win-tile.avif',
    )
  })

  test('palette-owned raster assets match the native footprint contract', async () => {
    const palettes: GridTilePalette[] = Object.values(gridTilePalettes)
    const checks = palettes.flatMap((palette) => {
      const assets: Array<[GridTileAsset, number]> = [
        [palette.floor.common, palette.nativeTileSize],
        ...(palette.floor.rare || []).map((variant) => [variant.asset, palette.nativeTileSize] as [GridTileAsset, number]),
        ...(palette.floor.blockers?.small ? [[palette.floor.blockers.small, palette.nativeTileSize] as [GridTileAsset, number]] : []),
        ...(palette.floor.blockers?.large ? [[palette.floor.blockers.large, palette.nativeTileSize * 2] as [GridTileAsset, number]] : []),
        ...(palette.floor.markers?.goal ? [[palette.floor.markers.goal, palette.nativeTileSize] as [GridTileAsset, number]] : []),
        ...(palette.floor.markers?.teleporter ? [[palette.floor.markers.teleporter, palette.nativeTileSize] as [GridTileAsset, number]] : []),
        ...(palette.walls?.back ? [[palette.walls.back, palette.nativeTileSize] as [GridTileAsset, number]] : []),
        ...(palette.walls?.markers?.goal ? [[palette.walls.markers.goal, palette.nativeTileSize] as [GridTileAsset, number]] : []),
        ...(palette.walls?.markers?.teleporter ? [[palette.walls.markers.teleporter, palette.nativeTileSize] as [GridTileAsset, number]] : []),
        ...Object.values(palette.gameplay)
          .filter((asset) => asset.src !== '/games/rockpush/boulder.avif')
          .map((asset) => [asset, palette.nativeTileSize] as [GridTileAsset, number]),
      ]
      return assets.map(async ([asset, expectedSize]) => {
        const metadata = await sharp(path.join(process.cwd(), 'public', asset.src)).metadata()
        expect(metadata.width).toBe(expectedSize)
        expect(metadata.height).toBe(expectedSize)
      })
    })
    await Promise.all(checks)
  })

  test('native tile metadata stays compatible with the logical grid', () => {
    expect(gridTilePaletteSchema.safeParse(getGridTilePalette('grass')).success).toBe(true)
    expect(
      gridTilePaletteSchema.safeParse({
        ...getGridTilePalette('grass'),
        nativeTileSize: 48,
      }).success,
    ).toBe(true)
    expect(
      gridTilePaletteSchema.safeParse({
        ...getGridTilePalette('grass'),
        nativeTileSize: 50,
      }).success,
    ).toBe(false)
  })

  test('goal markers preserve the teleporter silhouette for colour-swap pairs', async () => {
    for (const paletteId of [
      'grass',
      'basic-cave',
      'psychic-quiet-room',
      'wooden-interior',
      'industrial-power',
      'laboratory',
    ] as const) {
      const palette = gridTilePalettes[paletteId]
      const teleporter = await sharp(
        path.join(process.cwd(), 'public', palette.floor.markers!.teleporter!.src),
      ).ensureAlpha().raw().toBuffer()
      const goal = await sharp(
        path.join(process.cwd(), 'public', palette.floor.markers!.goal!.src),
      ).ensureAlpha().raw().toBuffer()
      expect(goal.length).toBe(teleporter.length)
      for (let index = 3; index < goal.length; index += 4) {
        expect(goal[index]).toBe(teleporter[index])
      }
    }
  })

  test('floor and wall goals resolve to their own surface markers', () => {
    for (const palette of Object.values(gridTilePalettes) as GridTilePalette[]) {
      const floorGoal = resolveGridGoalSource(palette.id, 'floor')
      const wallGoal = resolveGridGoalSource(palette.id, 'wall')
      expect(floorGoal).toBe(palette.floor.markers?.goal?.src)
      expect(wallGoal).toBe(palette.walls?.markers?.goal?.src)
      expect(wallGoal).toBeDefined()
      expect(wallGoal).not.toBe(floorGoal)
    }
  })

  test('rare floors retain the common tile with a sparse texture overlay', async () => {
    for (const palette of Object.values(gridTilePalettes) as GridTilePalette[]) {
      for (const variant of palette.floor.rare || []) {
        const common = await sharp(
          path.join(process.cwd(), 'public', palette.floor.common.src),
        ).removeAlpha().raw().toBuffer()
        const rare = await sharp(
          path.join(process.cwd(), 'public', variant.asset.src),
        ).removeAlpha().raw().toBuffer()
        expect(rare.length).toBe(common.length)
        let changedPixels = 0
        for (let index = 0; index < common.length; index += 3) {
          if (
            common[index] !== rare[index] ||
            common[index + 1] !== rare[index + 1] ||
            common[index + 2] !== rare[index + 2]
          ) {
            changedPixels += 1
          }
        }
        expect(changedPixels).toBeGreaterThan(0)
        expect(changedPixels / (common.length / 3)).toBeLessThan(0.15)
      }
    }
  })

  test('ice gameplay tiles fill the square and tile at every edge', async () => {
    for (const palette of Object.values(gridTilePalettes) as GridTilePalette[]) {
      const ice = await sharp(
        path.join(process.cwd(), 'public', palette.gameplay.ice.src),
      ).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
      expect(ice.info.width).toBe(palette.nativeTileSize)
      expect(ice.info.height).toBe(palette.nativeTileSize)
      const { data, info } = ice
      for (let coordinate = 0; coordinate < info.height; coordinate += 1) {
        const left = (coordinate * info.width) * 4
        const right = (coordinate * info.width + info.width - 1) * 4
        expect(Array.from(data.slice(left, left + 4))).toEqual(
          Array.from(data.slice(right, right + 4)),
        )
      }
      for (let coordinate = 0; coordinate < info.width; coordinate += 1) {
        const top = coordinate * 4
        const bottom = ((info.height - 1) * info.width + coordinate) * 4
        expect(Array.from(data.slice(top, top + 4))).toEqual(
          Array.from(data.slice(bottom, bottom + 4)),
        )
      }
    }
  })

  test('wall masks encode connected north, east, south, and west terrain', () => {
    const walls = new Set(['1,0', '2,1', '1,2', '0,1'])
    expect(getGridWallMask(1, 1, (x, y) => walls.has(`${x},${y}`))).toBe(15)
    expect(getGridWallMask(0, 0, () => false)).toBe(0)
    expect(GRID_WALL_MASKS).toHaveLength(16)
  })

  test('legacy coordinates stay 1x1 unless large grouping is explicitly requested', () => {
    const square = [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ]
    expect(getGridObstaclePlacements(square)).toEqual(
      square.map((position) => ({ ...position, size: 1 })),
    )
    expect(getGridObstaclePlacements(square, { allowLarge: true })).toEqual([
      { x: 1, y: 1, size: 2 },
    ])
    expect(getGridObstacleParts(square, { allowLarge: true }).size).toBe(4)
  })

  test('object definitions are reusable and scene schema validates explicit blockers', () => {
    const objectLibrary = {
      voltorb: {
        id: 'voltorb',
        name: 'Voltorb',
        purpose: 'entity',
        size: { cols: 1, rows: 1 },
        asset: { src: '/objects/voltorb.png' },
        collision: 'solid' as const,
      },
    }
    expect(
      gridObjectDefinitionSchema.safeParse(objectLibrary.voltorb).success,
    ).toBe(true)
    expect(gridObjectLibrarySchema.safeParse(objectLibrary).success).toBe(true)
    expect(
      gridObjectDefinitionSchema.safeParse({
        id: 'voltorb',
        name: 'Voltorb',
        purpose: 'entity',
        size: { cols: 1, rows: 1 },
        asset: { src: '/objects/voltorb.png' },
        collision: 'solid',
      }).success,
    ).toBe(true)
    expect(
      gridSceneConfigSchema.safeParse({
        cols: 8,
        rows: 8,
        rendering: {
          spriteSetId: 'future-cave',
          floor: { seed: 'route-10', rareChance: 0.08 },
        },
        walls: [{ x: 0, y: 0 }],
        blockers: [{ id: 'rockfall', x: 2, y: 2, size: 2 }],
        objects: [{ id: 'voltorb-1', objectId: 'voltorb', x: 4, y: 4 }],
      }).success,
    ).toBe(true)
    expect(
      gridSceneConfigSchema.safeParse({
        cols: 8,
        rows: 8,
        rendering: { spriteSetId: 'future-cave' },
        blockers: [
          { x: 2, y: 2, size: 2 },
          { x: 3, y: 3, size: 1 },
        ],
      }).success,
    ).toBe(false)
    expect(
      createGridSceneConfigSchema({
        ...objectLibrary,
        'large-stone': {
          id: 'large-stone',
          name: 'Large Stone',
          purpose: 'pushable',
          size: { cols: 2, rows: 2 },
          asset: { src: '/objects/large-stone.png' },
          collision: 'pushable',
        },
      }).safeParse({
        cols: 8,
        rows: 8,
        rendering: { spriteSetId: 'future-cave' },
        blockers: [{ x: 2, y: 2, size: 2 }],
        objects: [{ objectId: 'large-stone', x: 2, y: 2 }],
      }).success,
    ).toBe(false)
  })

  test('rare floor selection is deterministic and leaves common tiles dominant', () => {
    const palette: GridTilePalette = {
      ...getGridTilePalette('basic-cave'),
      id: 'floor-test',
      floor: {
        common: { src: '/common.png' },
        rareChance: 0.08,
        rare: [{ id: 'pebble', asset: { src: '/rare.png' } }],
      },
    }
    const render = () =>
      Array.from({ length: 400 }, (_, index) =>
        resolveGridFloorSourceFromPalette(
          palette,
          index % 20,
          Math.floor(index / 20),
          { seed: 'same' },
        ),
      )
    const first = render()
    expect(render()).toEqual(first)
    expect(first.filter((src) => src === '/common.png').length).toBeGreaterThan(
      340,
    )
    expect(first).toContain('/rare.png')
  })

  test('spatial games use registered palettes by authored theme', () => {
    const spatialGames = allGames.filter(
      (game) => game.gameType === 'grid-puzzle',
    )
    expect(spatialGames.length).toBeGreaterThan(0)
    expect(
      spatialGames.every((game) =>
        ['rock-push', 'voltorb', 'echo-map'].includes(
          (game.settings as { variant?: string }).variant || '',
        ),
      ),
    ).toBe(true)
    for (const game of spatialGames) {
      const settings = game.settings as {
        tilePaletteId?: string
        screens?: Array<{ tilePaletteId?: string }>
      }
      expect(settings.tilePaletteId).toBeDefined()
      expect(isGridTilePaletteId(settings.tilePaletteId || '')).toBe(true)
      settings.screens?.forEach((screen) => {
        if (screen.tilePaletteId) expect(isGridTilePaletteId(screen.tilePaletteId)).toBe(true)
      })
    }
    expect(
      spatialGames
        .filter((game) => (game.settings as { variant?: string }).variant === 'voltorb')
        .every((game) => {
          const settings = game.settings as { tilePaletteId?: string }
          return game.id === 'chronicle-v2-surge-cross-the-substation'
            ? settings.tilePaletteId === 'industrial-power'
            : settings.tilePaletteId === 'basic-cave'
        }),
    ).toBe(true)
    expect(
      spatialGames
        .filter((game) => (game.settings as { variant?: string }).variant === 'voltorb')
        .every((game) => {
          const settings = game.settings as {
            tilePaletteId?: string
            winTileSprite?: string
          }
          const expectedPalette = game.id === 'chronicle-v2-surge-cross-the-substation'
            ? 'industrial-power'
            : 'basic-cave'
          return settings.tilePaletteId === expectedPalette && !settings.winTileSprite
        }),
    ).toBe(true)
    expect(
      spatialGames
        .filter((game) => (game.settings as { variant?: string }).variant === 'echo-map')
        .every((game) => {
          const settings = game.settings as { tilePaletteId?: string }
          if (game.id === 'chronicle-v2-sabrina-enter-the-quiet-room') {
            return settings.tilePaletteId === 'psychic-quiet-room'
          }
          if (game.id === 'chronicle-v2-koga-cross-the-unmarked-roofs') {
            return settings.tilePaletteId === 'grass'
          }
          return game.id === 'chronicle-v2-blaine-evacuate-the-lab'
            ? settings.tilePaletteId === 'laboratory'
            : settings.tilePaletteId === 'basic-cave'
        }),
    ).toBe(true)
    expect(
      spatialGames.some(
        (game) =>
          (game.settings as { variant?: string }).variant === 'rock-push' &&
          (game.settings as { tilePaletteId?: string }).tilePaletteId === 'grass',
      ),
    ).toBe(true)
    expect(
      spatialGames
        .filter((game) => game.id.startsWith('fuchsia-gym-invisible-maze-'))
        .every((game) => (game.settings as { tilePaletteId?: string }).tilePaletteId === 'wooden-interior'),
    ).toBe(true)
    const rendererTest = spatialGames.find(
      (game) => game.id === 'voltorb-grid-renderer-test',
    )
    expect(rendererTest).toBeDefined()
    expect(rendererTest?.subCategory).toBe('Test')
    expect(rendererTest?.requirements).toEqual([])
    if (!rendererTest) throw new Error('Voltorb Grid renderer test entry is missing')
    expect((rendererTest.settings as { tilePaletteId?: string }).tilePaletteId).toBe(
      'basic-cave',
    )
  })

  test('back-wall row is reserved for the wall surface and exit markers', () => {
    const spatialGames = allGames.filter((game) => game.gameType === 'grid-puzzle')
    for (const game of spatialGames) {
      const settings = game.settings as Record<string, any>
      const scenes = [settings, ...(settings.screens || [])]
      for (const scene of scenes) {
        const variant = scene.variant || settings.variant
        const objectCollections = variant === 'echo-map'
          ? [scene.walls, scene.holes]
          : variant === 'voltorb'
            ? [scene.walls, scene.debris, scene.voltorbs, scene.protectedPokemon]
            : [scene.barriers, scene.boulders, scene.holes, scene.ice, scene.prizes]
        for (const collection of objectCollections) {
          for (const position of collection || []) {
            expect(position.y).toBeGreaterThan(0)
          }
        }
      }
    }
  })

  test('shared object definitions cover the spatial gameplay entities', () => {
    expect(Object.keys(gridObjects)).toEqual([
      'voltorb',
      'breakableRock',
      'pushableBoulder',
    ])
    for (const object of Object.values(gridObjects)) {
      expect(object.size).toEqual({ cols: 1, rows: 1 })
      expectAssetExists(object.asset)
      expect(gridObjectDefinitionSchema.safeParse(object).success).toBe(true)
    }
    expect(gridObjects.breakableRock.asset.src).toBe('/games/rockpush/breakable-rock.png')
  })

  test('breakable rock preserves a transparent silhouette', async () => {
    const asset = gridObjects.breakableRock.asset.src
    const metadata = await sharp(path.join(process.cwd(), 'public', asset)).metadata()
    expect(metadata.width).toBe(128)
    expect(metadata.height).toBe(128)
    expect(metadata.hasAlpha).toBe(true)
  })

  test('no external sprite pack is bundled', () => {
    expect(getGridTilePackCredits({ externalOnly: true })).toEqual([])
  })

  test('unknown palette ids use the default palette while role overrides remain isolated', () => {
    const originalFloor = getGridTilePalette('basic-cave').floor.common.src
    const sources = resolveGridTileSources('not-a-registered-palette', {
      floor: '/custom/floor.png',
    })
    expect(sources.floor).toBe('/custom/floor.png')
    expect(sources.barrier).toBe(
      getGridTilePalette('basic-cave').floor.blockers!.small.src,
    )
    expect(getGridTilePalette('basic-cave').floor.common.src).toBe(originalFloor)
    expect(GRID_TILE_PALETTE_IDS).not.toContain('not-a-registered-palette')
  })

  test('responsive board sizing uses whole-number 16px scales', () => {
    expect(getPixelGridMetrics(500, 9, 9)).toEqual({
      scale: 3,
      tileSize: 48,
      width: 432,
      height: 432,
    })
    expect(getPixelGridMetrics(288, 12, 8)).toEqual({
      scale: 1,
      tileSize: 16,
      width: 192,
      height: 128,
    })
  })
})
