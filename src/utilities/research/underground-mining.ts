import type {
  UndergroundMiningLootItem,
  UndergroundMiningSettings,
  UndergroundMiningTool,
} from '@/data/games/underground-mining/types'
import type { LocationReward } from '@/data/types'
import type { TaskCondition } from '@/data/tasks/types'

export type UndergroundMiningStatus = 'playing' | 'cleared' | 'collapsed'

export interface UndergroundMiningCell {
  x: number
  y: number
  layersRemaining: number
  bedrock: boolean
  /** Only populated after the corresponding part of a treasure is exposed. */
  visibleItemId?: string
  /** Crop of one full-sized treasure, disclosed only for an exposed cell. */
  treasureFragment?: {
    treasureId: number
    itemId: string
    offsetX: number
    offsetY: number
    width: number
    height: number
  }
}

export interface UndergroundMiningFoundItem {
  id: number
  itemId: string
  quantity: number
  x: number
  y: number
  width: number
  height: number
}

export interface UndergroundMiningPublicRound {
  kind: 'underground-mining'
  revision: number
  gridSize: UndergroundMiningSettings['gridSize']
  cells: UndergroundMiningCell[]
  treasureCount: number
  foundItems: UndergroundMiningFoundItem[]
  wallStress: number
  wallStressLimit: number
  status: UndergroundMiningStatus
  lastStrike?: { x: number; y: number; tool: UndergroundMiningTool }
}

export interface UndergroundMiningVisibleTreasure {
  id: number
  itemId: string
  x: number
  y: number
  width: number
  height: number
  found: boolean
  exposedCells: Array<{ x: number; y: number }>
}

/** Builds one drawable object from the disclosed pieces, without private layout data. */
export function getUndergroundMiningVisibleTreasures(
  round: UndergroundMiningPublicRound,
): UndergroundMiningVisibleTreasure[] {
  const visible = new Map<number, UndergroundMiningVisibleTreasure>()
  for (const cell of round.cells) {
    const fragment = cell.treasureFragment
    if (!fragment) continue
    let item = visible.get(fragment.treasureId)
    if (!item) {
      item = {
        id: fragment.treasureId,
        itemId: fragment.itemId,
        x: cell.x - fragment.offsetX,
        y: cell.y - fragment.offsetY,
        width: fragment.width,
        height: fragment.height,
        found: false,
        exposedCells: [],
      }
      visible.set(item.id, item)
    }
    item.exposedCells.push({ x: fragment.offsetX, y: fragment.offsetY })
  }
  for (const found of round.foundItems) {
    const item = visible.get(found.id)
    if (item) item.found = true
    else visible.set(found.id, { ...found, found: true, exposedCells: [] })
  }
  return [...visible.values()]
}

interface UndergroundMiningTreasure {
  id: number
  itemId: string
  quantity: number
  x: number
  y: number
  width: number
  height: number
  found: boolean
}

interface HiddenCell {
  x: number
  y: number
  layersRemaining: number
  bedrock: boolean
}

export interface UndergroundMiningPrivateRound {
  kind: 'underground-mining-private'
  revision: number
  seed: number
  cells: HiddenCell[]
  treasures: UndergroundMiningTreasure[]
  wallStress: number
  status: UndergroundMiningStatus
}

export type UndergroundMiningStrikeResult =
  | {
      success: true
      publicRound: UndergroundMiningPublicRound
      privateRound: UndergroundMiningPrivateRound
    }
  | { success: false; error: string }

function random(state: { seed: number }) {
  state.seed = (Math.imul(state.seed, 1664525) + 1013904223) >>> 0
  return state.seed / 4294967296
}

function randomInteger(state: { seed: number }, min: number, max: number) {
  return min + Math.floor(random(state) * (max - min + 1))
}

function chooseLoot(
  settings: UndergroundMiningSettings,
  state: { seed: number },
) {
  const totalWeight = settings.lootPool.reduce(
    (total, entry) => total + entry.weight,
    0,
  )
  let roll = random(state) * totalWeight
  for (const entry of settings.lootPool) {
    roll -= entry.weight
    if (roll < 0) return entry
  }
  return settings.lootPool.at(-1)!
}

/** Eligibility is resolved from server-owned player data before rolling a wall. */
export function getEligibleUndergroundMiningSettings(
  settings: UndergroundMiningSettings,
  checkRequirement: (requirement: TaskCondition) => boolean,
): UndergroundMiningSettings {
  const eligible = (entry: UndergroundMiningLootItem) =>
    (entry.requirements || []).every(checkRequirement)
  return {
    ...settings,
    lootPool: settings.lootPool.filter(eligible),
    bonusLoot: settings.bonusLoot?.filter(eligible),
  }
}

function canPlaceTreasure(
  cells: HiddenCell[],
  treasures: UndergroundMiningTreasure[],
  entry: UndergroundMiningLootItem,
  x: number,
  y: number,
  gridSize: UndergroundMiningSettings['gridSize'],
) {
  if (
    x + entry.size.width > gridSize.cols ||
    y + entry.size.height > gridSize.rows
  ) {
    return false
  }

  for (let offsetY = 0; offsetY < entry.size.height; offsetY++) {
    for (let offsetX = 0; offsetX < entry.size.width; offsetX++) {
      const cellX = x + offsetX
      const cellY = y + offsetY
      const cell = cells[cellY * gridSize.cols + cellX]
      if (cell.bedrock) return false
      if (
        treasures.some(
          (treasure) =>
            cellX >= treasure.x &&
            cellX < treasure.x + treasure.width &&
            cellY >= treasure.y &&
            cellY < treasure.y + treasure.height,
        )
      ) {
        return false
      }
    }
  }
  return true
}

export function createUndergroundMiningRound(
  settings: UndergroundMiningSettings,
  seed: number,
): {
  publicRound: UndergroundMiningPublicRound
  privateRound: UndergroundMiningPrivateRound
} {
  if (settings.lootPool.length === 0) throw new Error('No eligible mining loot')
  const rng = { seed: seed >>> 0 }
  const cells: HiddenCell[] = Array.from(
    { length: settings.gridSize.cols * settings.gridSize.rows },
    (_, index) => ({
      x: index % settings.gridSize.cols,
      y: Math.floor(index / settings.gridSize.cols),
      layersRemaining: randomInteger(rng, 3, 6),
      bedrock: false,
    }),
  )

  const treasureCount = randomInteger(
    rng,
    settings.treasureCount.min,
    settings.treasureCount.max,
  )
  const selectedLoot: Array<{
    id: number
    entry: UndergroundMiningLootItem
    quantity: number
  }> = Array.from({ length: treasureCount }, (_, id) => ({
    id,
    entry: chooseLoot(settings, rng),
    quantity: 1,
  }))
  for (const entry of settings.bonusLoot || []) {
    if (random(rng) * 100 < entry.dropChance)
      selectedLoot.push({ id: selectedLoot.length, entry, quantity: 1 })
  }
  for (const treasure of selectedLoot) {
    const quantity = treasure.entry.quantity ?? 1
    treasure.quantity =
      typeof quantity === 'number'
        ? quantity
        : randomInteger(rng, quantity.min, quantity.max)
  }
  let treasures: UndergroundMiningTreasure[] | undefined
  for (
    let placementAttempt = 0;
    placementAttempt < 24 && !treasures;
    placementAttempt++
  ) {
    const orderedLoot = selectedLoot
      .map((treasure) => ({ ...treasure, tieBreak: random(rng) }))
      .sort((a, b) => {
        const areaDifference =
          b.entry.size.width * b.entry.size.height -
          a.entry.size.width * a.entry.size.height
        return areaDifference || a.tieBreak - b.tieBreak
      })
    const attempt: UndergroundMiningTreasure[] = []

    for (const { id, entry, quantity } of orderedLoot) {
      const candidates: Array<{ x: number; y: number }> = []
      for (let y = 0; y + entry.size.height <= settings.gridSize.rows; y++) {
        for (let x = 0; x + entry.size.width <= settings.gridSize.cols; x++) {
          candidates.push({ x, y })
        }
      }
      for (let index = candidates.length - 1; index > 0; index--) {
        const swapIndex = Math.floor(random(rng) * (index + 1))
        ;[candidates[index], candidates[swapIndex]] = [
          candidates[swapIndex],
          candidates[index],
        ]
      }
      const placement = candidates.find(({ x, y }) =>
        canPlaceTreasure(cells, attempt, entry, x, y, settings.gridSize),
      )
      if (!placement) break
      attempt.push({
        id,
        itemId: entry.itemId,
        quantity,
        x: placement.x,
        y: placement.y,
        width: entry.size.width,
        height: entry.size.height,
        found: false,
      })
    }
    if (attempt.length === selectedLoot.length) treasures = attempt
  }
  if (!treasures) throw new Error('Mining configuration cannot fit its loot')

  for (const cell of cells) {
    const containsTreasure = treasures.some(
      (treasure) =>
        cell.x >= treasure.x &&
        cell.x < treasure.x + treasure.width &&
        cell.y >= treasure.y &&
        cell.y < treasure.y + treasure.height,
    )
    if (!containsTreasure) {
      cell.bedrock = random(rng) * 100 < settings.bedrockChance
    }
  }

  const privateRound: UndergroundMiningPrivateRound = {
    kind: 'underground-mining-private',
    revision: 0,
    seed: rng.seed,
    cells,
    treasures,
    wallStress: 0,
    status: 'playing',
  }

  return {
    publicRound: getUndergroundMiningPublicRound(settings, privateRound),
    privateRound,
  }
}

export function getUndergroundMiningPublicRound(
  settings: UndergroundMiningSettings,
  privateRound: UndergroundMiningPrivateRound,
): UndergroundMiningPublicRound {
  return {
    kind: 'underground-mining',
    revision: privateRound.revision,
    gridSize: settings.gridSize,
    cells: privateRound.cells.map((cell) => {
      const treasure =
        cell.layersRemaining === 0
          ? privateRound.treasures.find(
              (item) =>
                cell.x >= item.x &&
                cell.x < item.x + item.width &&
                cell.y >= item.y &&
                cell.y < item.y + item.height,
            )
          : undefined
      return {
        x: cell.x,
        y: cell.y,
        layersRemaining: cell.layersRemaining,
        bedrock: cell.layersRemaining === 0 && cell.bedrock,
        visibleItemId: treasure?.itemId,
        treasureFragment: treasure
          ? {
              treasureId: treasure.id,
              itemId: treasure.itemId,
              offsetX: cell.x - treasure.x,
              offsetY: cell.y - treasure.y,
              width: treasure.width,
              height: treasure.height,
            }
          : undefined,
      }
    }),
    treasureCount: privateRound.treasures.length,
    foundItems: privateRound.treasures
      .filter((treasure) => treasure.found)
      .map(({ id, itemId, quantity, x, y, width, height }) => ({
        id,
        itemId,
        quantity,
        x,
        y,
        width,
        height,
      })),
    wallStress: privateRound.wallStress,
    wallStressLimit: settings.wallStressLimit,
    status: privateRound.status,
  }
}

export const UNDERGROUND_MINING_TOOL_DAMAGE: Record<
  UndergroundMiningTool,
  Array<{ x: number; y: number; damage: number }>
> = {
  pickaxe: [
    { x: 0, y: 0, damage: 2 },
    { x: 0, y: -1, damage: 1 },
    { x: 1, y: 0, damage: 1 },
    { x: 0, y: 1, damage: 1 },
    { x: -1, y: 0, damage: 1 },
  ],
  hammer: [
    { x: 0, y: 0, damage: 2 },
    { x: 0, y: -1, damage: 2 },
    { x: 1, y: 0, damage: 2 },
    { x: 0, y: 1, damage: 2 },
    { x: -1, y: 0, damage: 2 },
    { x: -1, y: -1, damage: 1 },
    { x: 1, y: -1, damage: 1 },
    { x: 1, y: 1, damage: 1 },
    { x: -1, y: 1, damage: 1 },
  ],
}

export function applyUndergroundMiningStrike(
  settings: UndergroundMiningSettings,
  publicRound: UndergroundMiningPublicRound,
  previousPrivateRound: UndergroundMiningPrivateRound,
  action: { x: number; y: number; tool: UndergroundMiningTool },
): UndergroundMiningStrikeResult {
  if (
    publicRound.kind !== 'underground-mining' ||
    previousPrivateRound.kind !== 'underground-mining-private' ||
    publicRound.revision !== previousPrivateRound.revision
  ) {
    return { success: false, error: 'Mining state is out of date' }
  }
  if (previousPrivateRound.status !== 'playing') {
    return { success: false, error: 'This mining wall has already ended' }
  }
  if (
    !Number.isInteger(action.x) ||
    !Number.isInteger(action.y) ||
    action.x < 0 ||
    action.y < 0 ||
    action.x >= settings.gridSize.cols ||
    action.y >= settings.gridSize.rows ||
    (action.tool !== 'pickaxe' && action.tool !== 'hammer')
  ) {
    return { success: false, error: 'Invalid mining strike' }
  }

  const privateRound = structuredClone(previousPrivateRound)
  const newlyRevealedBedrock: Array<{ x: number; y: number }> = []
  for (const impact of UNDERGROUND_MINING_TOOL_DAMAGE[action.tool]) {
    const x = action.x + impact.x
    const y = action.y + impact.y
    if (
      x < 0 ||
      y < 0 ||
      x >= settings.gridSize.cols ||
      y >= settings.gridSize.rows
    ) {
      continue
    }
    const cell = privateRound.cells[y * settings.gridSize.cols + x]
    const wasExposed = cell.layersRemaining === 0
    if (!wasExposed) {
      cell.layersRemaining = Math.max(0, cell.layersRemaining - impact.damage)
    }
    if (!wasExposed && cell.layersRemaining === 0 && cell.bedrock) {
      newlyRevealedBedrock.push({ x, y })
    }
  }

  if (newlyRevealedBedrock.length > 0) {
    for (const bedrock of newlyRevealedBedrock) {
      for (const cell of privateRound.cells) {
        if (
          Math.abs(cell.x - bedrock.x) <= 1 &&
          Math.abs(cell.y - bedrock.y) <= 1 &&
          !(cell.x === bedrock.x && cell.y === bedrock.y)
        ) {
          const previousCell =
            previousPrivateRound.cells[cell.y * settings.gridSize.cols + cell.x]
          cell.layersRemaining = previousCell.layersRemaining
        }
      }
    }
  }

  for (const treasure of privateRound.treasures) {
    if (treasure.found) continue
    let fullyExposed = true
    for (let y = treasure.y; y < treasure.y + treasure.height; y++) {
      for (let x = treasure.x; x < treasure.x + treasure.width; x++) {
        const cell = privateRound.cells[y * settings.gridSize.cols + x]
        if (cell.layersRemaining > 0 || cell.bedrock) fullyExposed = false
      }
    }
    if (fullyExposed) treasure.found = true
  }

  privateRound.wallStress += settings.toolStress[action.tool]
  privateRound.revision++
  if (privateRound.treasures.every((treasure) => treasure.found)) {
    privateRound.status = 'cleared'
  } else if (privateRound.wallStress >= settings.wallStressLimit) {
    privateRound.status = 'collapsed'
  }

  const nextPublicRound = getUndergroundMiningPublicRound(
    settings,
    privateRound,
  )
  nextPublicRound.lastStrike = action
  return {
    success: true,
    publicRound: nextPublicRound,
    privateRound,
  }
}

export function getUndergroundMiningRewards(
  privateRound: UndergroundMiningPrivateRound | undefined,
  settings: UndergroundMiningSettings,
): LocationReward[] {
  if (
    privateRound?.kind !== 'underground-mining-private' ||
    settings.awardLoot === false ||
    privateRound.status === 'playing' ||
    (settings.complete === true &&
      (privateRound.status !== 'cleared' ||
        !privateRound.treasures.every((treasure) => treasure.found)))
  ) {
    return []
  }
  return privateRound.treasures
    .filter((treasure) => treasure.found)
    .map((treasure) => ({
      type: 'item',
      targetId: treasure.itemId,
      quantity: treasure.quantity,
      dropChance: 100,
    }))
}
