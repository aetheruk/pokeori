import { expect, test } from 'bun:test'
import type { UndergroundMiningSettings } from '@/data/games/underground-mining/types'
import { testUndergroundMiningEntries } from '@/data/games/underground-mining/entries/test'
import { validateGameItem } from '@/data/games/schemas'
import {
  applyUndergroundMiningStrike,
  createUndergroundMiningRound,
  getUndergroundMiningPublicRound,
  getUndergroundMiningVisibleTreasures,
  getUndergroundMiningRewards,
} from '@/utilities/research/underground-mining'

const settings: UndergroundMiningSettings = {
  gridSize: { cols: 8, rows: 6 },
  treasureCount: { min: 1, max: 1 },
  lootPool: [{ itemId: 'fire-gem', weight: 1, size: { width: 2, height: 2 } }],
  wallStressLimit: 24,
  toolStress: { pickaxe: 1, hammer: 2 },
  bedrockChance: 0,
}

test('the schema accepts boolean complete policies and rejects non-booleans', () => {
  const encounter = {
    ...testUndergroundMiningEntries[0],
    gameType: 'underground-mining',
  }
  for (const complete of [true, false, undefined]) {
    expect(
      validateGameItem({
        ...encounter,
        settings: { ...encounter.settings, complete },
      }).success,
    ).toBe(true)
  }
  expect(
    validateGameItem({
      ...encounter,
      settings: { ...encounter.settings, complete: 'false' },
    }).success,
  ).toBe(false)
  expect(encounter.settings.complete).toBe(false)
  expect(encounter.settings.lootPool).toHaveLength(18)
  expect(
    encounter.settings.lootPool.every(
      (entry) =>
        entry.weight === 1 && entry.size.width === 2 && entry.size.height === 2,
    ),
  ).toBe(true)
})

test('buried treasure does not disclose sprite crop or placement metadata', () => {
  const { publicRound } = createUndergroundMiningRound(settings, 123)
  expect(publicRound.foundItems).toEqual([])
  expect(
    publicRound.cells.every(
      (cell) => !cell.visibleItemId && !cell.treasureFragment,
    ),
  ).toBe(true)
})

test('exposed cells are matching crops of one 2 by 2 gem', () => {
  const { privateRound } = createUndergroundMiningRound(settings, 123)
  const treasure = privateRound.treasures[0]
  const exposedIndex =
    (treasure.y + 1) * settings.gridSize.cols + treasure.x + 1
  privateRound.cells[exposedIndex].layersRemaining = 0
  const round = getUndergroundMiningPublicRound(settings, privateRound)
  expect(round.cells[exposedIndex].treasureFragment).toEqual({
    treasureId: treasure.id,
    itemId: 'fire-gem',
    offsetX: 1,
    offsetY: 1,
    width: 2,
    height: 2,
  })
  expect(round.cells.filter((cell) => cell.treasureFragment)).toHaveLength(1)
  expect(
    round.cells[treasure.y * settings.gridSize.cols + treasure.x]
      .treasureFragment,
  ).toBeUndefined()

  for (let y = 0; y < 2; y++)
    for (let x = 0; x < 2; x++) {
      privateRound.cells[
        (treasure.y + y) * settings.gridSize.cols + treasure.x + x
      ].layersRemaining = 0
    }
  const fragments = getUndergroundMiningPublicRound(
    settings,
    privateRound,
  ).cells.filter((cell) => cell.treasureFragment)
  expect(fragments).toHaveLength(4)
  const visible = getUndergroundMiningVisibleTreasures(
    getUndergroundMiningPublicRound(settings, privateRound),
  )
  expect(visible).toHaveLength(1)
  expect(visible[0].exposedCells).toHaveLength(4)
  expect(visible[0]).toMatchObject({
    itemId: 'fire-gem',
    width: 2,
    height: 2,
    x: treasure.x,
    y: treasure.y,
  })
  for (const cell of fragments) {
    expect(cell.x - cell.treasureFragment!.offsetX).toBe(treasure.x)
    expect(cell.y - cell.treasureFragment!.offsetY).toBe(treasure.y)
    expect(cell.treasureFragment!.treasureId).toBe(treasure.id)
  }
})

test('fully uncovering the gem recovers one full-size item and awards it once', () => {
  const { privateRound } = createUndergroundMiningRound(settings, 123)
  const treasure = privateRound.treasures[0]
  for (let y = 0; y < 2; y++)
    for (let x = 0; x < 2; x++) {
      privateRound.cells[
        (treasure.y + y) * settings.gridSize.cols + treasure.x + x
      ].layersRemaining = 1
    }
  const result = applyUndergroundMiningStrike(
    settings,
    getUndergroundMiningPublicRound(settings, privateRound),
    privateRound,
    { x: treasure.x, y: treasure.y, tool: 'hammer' },
  )
  expect(result.success).toBe(true)
  if (!result.success) throw new Error(result.error)
  expect(result.publicRound.status).toBe('cleared')
  expect(result.publicRound.foundItems).toHaveLength(1)
  expect(result.publicRound.foundItems[0]).toMatchObject({
    itemId: 'fire-gem',
    width: 2,
    height: 2,
  })
  expect(getUndergroundMiningRewards(result.privateRound, settings)).toEqual([
    { type: 'item', targetId: 'fire-gem', quantity: 1, dropChance: 100 },
  ])
})

test('sprite crops respect custom rectangular treasure sizes', () => {
  const custom = {
    ...settings,
    lootPool: [
      { itemId: 'water-gem', weight: 1, size: { width: 3, height: 1 } },
    ],
  }
  const { privateRound } = createUndergroundMiningRound(custom, 42)
  const treasure = privateRound.treasures[0]
  const index = treasure.y * custom.gridSize.cols + treasure.x + 2
  privateRound.cells[index].layersRemaining = 0
  expect(
    getUndergroundMiningPublicRound(custom, privateRound).cells[index]
      .treasureFragment,
  ).toMatchObject({ offsetX: 2, offsetY: 0, width: 3, height: 1 })
})

test('natural collapse saves only fully uncovered non-gem items and rejects further strikes', () => {
  const custom: UndergroundMiningSettings = {
    ...settings,
    wallStressLimit: 2,
    treasureCount: { min: 2, max: 2 },
    lootPool: [
      {
        itemId: 'helix-fossil',
        weight: 1,
        quantity: 2,
        size: { width: 2, height: 2 },
      },
    ],
  }
  const generated = createUndergroundMiningRound(custom, 42)
  generated.privateRound.treasures[0].found = true
  const result = applyUndergroundMiningStrike(
    custom,
    generated.publicRound,
    generated.privateRound,
    { x: 0, y: 0, tool: 'hammer' },
  )
  expect(result.success).toBe(true)
  if (!result.success) throw new Error(result.error)
  expect(result.publicRound.status).toBe('collapsed')
  expect(getUndergroundMiningRewards(result.privateRound, custom)).toEqual([
    { type: 'item', targetId: 'helix-fossil', quantity: 2, dropChance: 100 },
  ])
  expect(
    applyUndergroundMiningStrike(
      custom,
      result.publicRound,
      result.privateRound,
      { x: 0, y: 0, tool: 'pickaxe' },
    ).success,
  ).toBe(false)
  expect(generated.privateRound.status).toBe('playing')
})

test('complete requires every treasure while false keeps fully recovered items on collapse', () => {
  const custom = { ...settings, treasureCount: { min: 2, max: 2 } }
  const { privateRound } = createUndergroundMiningRound(custom, 42)
  privateRound.treasures[0].found = true
  expect(getUndergroundMiningRewards(privateRound, custom)).toEqual([])
  privateRound.status = 'collapsed'
  expect(
    getUndergroundMiningRewards(privateRound, { ...custom, complete: true }),
  ).toEqual([])
  expect(
    getUndergroundMiningRewards(privateRound, { ...custom, complete: false }),
  ).toHaveLength(1)
  expect(getUndergroundMiningRewards(privateRound, custom)).toHaveLength(1)
  privateRound.status = 'cleared'
  expect(
    getUndergroundMiningRewards(privateRound, { ...custom, complete: true }),
  ).toEqual([])
  privateRound.treasures[1].found = true
  expect(
    getUndergroundMiningRewards(privateRound, { ...custom, complete: true }),
  ).toHaveLength(2)
})
