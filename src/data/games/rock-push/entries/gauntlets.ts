import type { RockPushGameConfig, RockPushScreenConfig } from '../types'
import { pokemonTowerGauntletBattles } from '@/data/battles/entries/pokemon-tower'
import type { GridObjectPlacement, GridTilePaletteId } from '@/data/games/grid-tiles'

const GAUNTLET_GRID_SIZE = 7
const GAUNTLET_CENTER = Math.floor(GAUNTLET_GRID_SIZE / 2)
const GAUNTLET_ENTRY_Y = GAUNTLET_GRID_SIZE - 2

const bugGauntletBattleIds = [
  'bug-gauntlet-barry',
  'bug-gauntlet-billy',
  'bug-gauntlet-berry',
  'bug-gauntlet-benny',
]

const birdGauntletTrainerIds = [
  'route-14-gauntlet-carter',
  'route-14-gauntlet-mitch',
  'route-14-gauntlet-marlon',
  'route-14-gauntlet-beck',
  'route-14-gauntlet-benny',
]

const rareMaterialRollRequirement = [{ type: 'roll' as const, count: 200_000 }]
const commonFinalBattleRollRequirement = [{
  type: 'roll' as const,
  count: 200_000,
  inverse: true,
}]
const daytimeRequirement = [{
  type: 'time_range' as const,
  timeRange: { start: '06:00', end: '17:59' },
}]
const nighttimeRequirement = [{
  type: 'time_range' as const,
  timeRange: { start: '18:00', end: '05:59' },
}]
const towerGengarRollThreshold = 150_000
const towerGengarRollRequirement = [{
  type: 'roll' as const,
  count: towerGengarRollThreshold,
}]
const towerStandardRollRequirement = [{
  type: 'roll' as const,
  count: towerGengarRollThreshold,
  inverse: true,
}]

function createGauntletBattlePlacement(
  id: string,
  targetId: string,
  objectId: string,
  x: number,
  y: number,
  requirements?: GridObjectPlacement['requirements'],
  overworldSpriteId?: string,
  randomGroup?: GridObjectPlacement['randomGroup'],
): GridObjectPlacement {
  return {
    id,
    objectId,
    x,
    y,
    ...(requirements ? { requirements } : {}),
    ...(overworldSpriteId ? { overworldSpriteId } : {}),
    ...(randomGroup ? { randomGroup } : {}),
    removeOnSuccess: true,
    interaction: { type: 'battle', targetId, victory: 'clear' },
  }
}

function createGauntletScreens(options: {
  firstScreenId: string
  materialItemId: string
  finalObjects: GridObjectPlacement[]
  getFloorObjects: (floorNumber: number) => GridObjectPlacement[]
  tilePaletteId?: GridTilePaletteId
}): RockPushScreenConfig[] {
  return Array.from({ length: 5 }, (_, index) => {
    const floorNumber = index + 1
    const screenId = floorNumber === 1
      ? options.firstScreenId
      : `${options.firstScreenId}-${floorNumber}`
    return {
      id: screenId,
      ...(options.tilePaletteId ? { tilePaletteId: options.tilePaletteId } : {}),
      grid_size: GAUNTLET_GRID_SIZE,
      objects: floorNumber === 5
        ? options.finalObjects
        : options.getFloorObjects(floorNumber),
      ...(floorNumber < 5
        ? {
            teleporters: [{
              id: `${screenId}-upstairs`,
              x: GAUNTLET_CENTER,
              y: 0,
              target: {
                screen: floorNumber === 1
                  ? `${options.firstScreenId}-2`
                  : `${options.firstScreenId}-${floorNumber + 1}`,
                x: GAUNTLET_CENTER,
                y: GAUNTLET_ENTRY_Y,
              },
              oneWay: true,
            }],
          }
        : {}),
      ...(floorNumber > 1 && floorNumber < 5
        ? {
            prizes: [{
              id: `${screenId}-center-material`,
              x: GAUNTLET_CENTER,
              y: GAUNTLET_CENTER,
              itemId: options.materialItemId,
              quantity: 1,
              requirements: rareMaterialRollRequirement,
            }],
          }
        : {}),
    }
  })
}

function createFixedTrainerFloor(
  battleId: string,
  objectId: 'bug-catcher-trainer' | 'bird-keeper-trainer',
  floorNumber: number,
) {
  return [createGauntletBattlePlacement(
    `trainer-floor-${floorNumber}`,
    battleId,
    objectId,
    GAUNTLET_CENTER,
    1,
  )]
}

function createRandomBirdTrainerFloor(floorNumber: number) {
  return birdGauntletTrainerIds.map((battleId) =>
    createGauntletBattlePlacement(
      `bird-trainer-floor-${floorNumber}-${battleId}`,
      battleId,
      'bird-keeper-trainer',
      GAUNTLET_CENTER,
      1,
      undefined,
      undefined,
      {
        id: `bird-gauntlet-trainer-floor-${floorNumber}`,
        selectCount: 1,
        uniquePoolId: 'bird-gauntlet-trainer-pool',
      },
    ),
  )
}

function createTowerTrainerPlacements(floorNumber: number): GridObjectPlacement[] {
  const isTopFloor = floorNumber === 5
  const trainerPosition = {
    x: GAUNTLET_CENTER,
    y: isTopFloor ? GAUNTLET_CENTER : 1,
  }
  const createTrainerPool = (
    variant: 'standard' | 'gengar',
  ): GridObjectPlacement[] =>
    pokemonTowerGauntletBattles.map((battle) => ({
      id: `${variant}-floor-${floorNumber}-${battle.id}`,
      objectId: 'channeler-trainer',
      ...trainerPosition,
      removeOnSuccess: true,
      requirements:
        variant === 'standard'
          ? towerStandardRollRequirement
          : towerGengarRollRequirement,
      randomGroup: {
        id: `tower-channeler-${variant}-floor-${floorNumber}`,
        selectCount: 1,
        uniquePoolId: `tower-channeler-${variant}-pool`,
      },
      interaction: {
        type: 'battle' as const,
        targetId: battle.id,
        victory: 'clear' as const,
      },
    }))

  const trainers = [
    ...createTrainerPool('standard'),
    ...(!isTopFloor ? createTrainerPool('gengar') : []),
  ]
  if (!isTopFloor) return trainers

  return [
    ...trainers,
    {
      id: 'rare-gengar-catch',
      objectId: 'gengar-encounter-trigger',
      x: GAUNTLET_CENTER,
      y: GAUNTLET_CENTER,
      removeOnSuccess: true,
      requirements: towerGengarRollRequirement,
      interaction: {
        type: 'encounter',
        targetId: 'pokemon-tower-ghost-trial-gengar',
        victory: 'clear',
      },
    },
  ]
}

function createTowerFloors() {
  return Array.from({ length: 5 }, (_, index) => {
    const floorNumber = index + 1
    return {
      id: `tower-${floorNumber}`,
      objects: createTowerTrainerPlacements(floorNumber),
      ...(floorNumber < 5
        ? {
            teleporters: [{
              id: `tower-${floorNumber}-upstairs`,
              x: GAUNTLET_CENTER,
              y: 0,
              target: {
                screen: `tower-${floorNumber + 1}`,
                x: GAUNTLET_CENTER,
                y: GAUNTLET_ENTRY_Y,
              },
              oneWay: true,
            }],
          }
        : {}),
      ...(floorNumber > 1 && floorNumber < 5
        ? {
            prizes: [{
              id: `tower-${floorNumber}-ectoplasm`,
              x: GAUNTLET_CENTER,
              y: GAUNTLET_CENTER,
              itemId: 'spirit-wisp-t1',
              quantity: 1,
            }],
          }
        : {}),
    }
  })
}

export const gauntletGridAdventureEntries: RockPushGameConfig[] = [
  {
    id: 'buggy-gauntlet-grid-adventure',
    name: 'The Buggy Gauntlet',
    description: 'Face off against the Buggy 4 again? Well I could use the practise!',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: { type: 'trainer', id: 'bug-catcher' },
    background: '/backgrounds/forest.avif',
    requirements: [{
      type: 'battle_result',
      targetId: 'buggy-champion',
      battleStatus: 'win',
      count: 1,
    }],
    rewards: [
      { type: 'item', targetId: 'rare-candy-xs', quantity: 1, dropChance: 100 },
      { type: 'currency', targetId: 'pokedollars', quantity: 200, dropChance: 100 },
    ],
    isEligibleForReplay: true,
    settings: {
      variant: 'rock-push',
      tilePaletteId: 'forest',
      timeLimit: 1800,
      grid_size: GAUNTLET_GRID_SIZE,
      lives: 1,
      winCondition: { type: 'activity-successes', count: 5 },
      playerStart: { x: GAUNTLET_CENTER, y: GAUNTLET_ENTRY_Y },
      startScreen: 'forest',
      screens: createGauntletScreens({
        firstScreenId: 'forest',
        materialItemId: 'chitin-fragment-t1',
        tilePaletteId: 'forest',
        getFloorObjects: (floorNumber) =>
          createFixedTrainerFloor(
            bugGauntletBattleIds[floorNumber - 1],
            'bug-catcher-trainer',
            floorNumber,
          ),
        finalObjects: [
          createGauntletBattlePlacement(
            'bug-final-paras', 'bug-gauntlet-paras-day', 'pokemon-battle-trigger',
            GAUNTLET_CENTER, GAUNTLET_CENTER, daytimeRequirement, '46',
          ),
          createGauntletBattlePlacement(
            'bug-final-venonat', 'bug-gauntlet-venonat-night', 'pokemon-battle-trigger',
            GAUNTLET_CENTER, GAUNTLET_CENTER, nighttimeRequirement, '48',
          ),
        ],
      }),
    },
  },
  {
    id: 'feathered-gauntlet-grid-adventure',
    name: 'The Feathered Gauntlet',
    description: 'This will be a great training opportunity!',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: { type: 'trainer', id: 'bird-keeper' },
    background: '/backgrounds/grassy-route.avif',
    requirements: [{
      type: 'task_completed',
      targetId: 'route-14-bird-gauntlet-clear',
    }],
    rewards: [
      { type: 'currency', targetId: 'pokedollars', quantity: 1200, dropChance: 100 },
      { type: 'item', targetId: 'rare-candy-m', quantity: 1, dropChance: 100 },
    ],
    isEligibleForReplay: true,
    settings: {
      variant: 'rock-push',
      tilePaletteId: 'grass',
      timeLimit: 1800,
      grid_size: GAUNTLET_GRID_SIZE,
      lives: 1,
      winCondition: { type: 'activity-successes', count: 5 },
      playerStart: { x: GAUNTLET_CENTER, y: GAUNTLET_ENTRY_Y },
      startScreen: 'route-14',
      screens: createGauntletScreens({
        firstScreenId: 'route-14',
        materialItemId: 'wing-feather-t1',
        getFloorObjects: createRandomBirdTrainerFloor,
        finalObjects: [
          createGauntletBattlePlacement(
            'bird-final-donald', 'route-14-gauntlet-donald', 'bird-keeper-trainer',
            GAUNTLET_CENTER, GAUNTLET_CENTER, commonFinalBattleRollRequirement,
          ),
          createGauntletBattlePlacement(
            'bird-final-farfetchd', 'route-14-gauntlet-farfetchd', 'pokemon-battle-trigger',
            GAUNTLET_CENTER, GAUNTLET_CENTER, rareMaterialRollRequirement, '83',
          ),
        ],
      }),
    },
  },
  {
    id: 'pokemon-tower-ghost-trial-grid-adventure',
    name: 'The Ghost Trial Gauntlet',
    description: 'I have a huge hunch I’ll see a few Gastly here…',
    category: 'Kanto',
    subCategory: 'Pokemon Tower',
    icon: { type: 'trainer', id: 'channeler' },
    background: '/backgrounds/pkmn-tower.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pokemon-tower-summit-azure-flute',
      },
      {
        type: 'battle_result',
        targetId: 'pokemon-tower-kita-boss',
        battleStatus: 'win',
        count: 1,
      },
    ],
    rewards: [
      { type: 'currency', targetId: 'pokedollars', quantity: 1200, dropChance: 100 },
      { type: 'item', targetId: 'rare-candy-m', quantity: 1, dropChance: 100 },
    ],
    isEligibleForReplay: true,
    settings: {
      variant: 'rock-push',
      tilePaletteId: 'pokemon-tower',
      timeLimit: 1800,
      grid_size: GAUNTLET_GRID_SIZE,
      lives: 1,
      winCondition: { type: 'activity-successes', count: 5 },
      playerStart: { x: GAUNTLET_CENTER, y: GAUNTLET_ENTRY_Y },
      startScreen: 'tower-1',
      screens: createTowerFloors(),
    },
  },
]
