import type { RockPushGameConfig } from '../types'
import { pokemonTowerGauntletBattles } from '@/data/battles/entries/pokemon-tower'
import type { GridObjectPlacement } from '@/data/games/grid-tiles/types'

const bugGauntletBattleIds = [
  'bug-gauntlet-barry',
  'bug-gauntlet-billy',
  'bug-gauntlet-berry',
  'bug-gauntlet-benny',
  'bug-gauntlet-champion',
]

const birdGauntletBattleIds = [
  'route-14-gauntlet-carter',
  'route-14-gauntlet-mitch',
  'route-14-gauntlet-marlon',
  'route-14-gauntlet-beck',
  'route-14-gauntlet-benny',
  'route-14-gauntlet-donald',
]

const rareMaterialRollRequirement = [{ type: 'roll' as const, count: 200_000 }]
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

function createTrainerPlacements(
  battleIds: string[],
  positions: Array<{ x: number; y: number }>,
  objectId: 'bug-catcher-trainer' | 'bird-keeper-trainer',
) {
  return battleIds.map((targetId, index) => ({
    id: `trainer-${index + 1}`,
    objectId,
    ...positions[index],
    removeOnSuccess: true,
    interaction: {
      type: 'battle' as const,
      targetId,
      victory: 'clear' as const,
    },
  }))
}

function createTowerTrainerPlacements(floorNumber: number): GridObjectPlacement[] {
  const isTopFloor = floorNumber === 5
  const trainerPosition = { x: 4, y: isTopFloor ? 4 : 1 }
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
      x: 4,
      y: 4,
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
              x: 4,
              y: 0,
              target: {
                screen: `tower-${floorNumber + 1}`,
                x: 4,
                y: 7,
              },
              oneWay: true,
            }],
          }
        : {}),
      ...(floorNumber > 1 && floorNumber < 5
        ? {
            prizes: [{
              id: `tower-${floorNumber}-ectoplasm`,
              x: 4,
              y: 4,
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
      { type: 'item', targetId: 'chitin-fragment-t1', quantity: 5, dropChance: 100 },
      { type: 'item', targetId: 'rare-candy-xs', quantity: 1, dropChance: 100 },
      { type: 'currency', targetId: 'pokedollars', quantity: 200, dropChance: 100 },
    ],
    isEligibleForReplay: true,
    settings: {
      variant: 'rock-push',
      tilePaletteId: 'grass',
      timeLimit: 1800,
      grid_size: 9,
      lives: 1,
      winCondition: { type: 'activity-successes', count: bugGauntletBattleIds.length },
      playerStart: { x: 4, y: 7 },
      startScreen: 'forest',
      screens: [{
        id: 'forest',
        prizes: [
          { id: 'forest-chitin-1', x: 3, y: 2, itemId: 'chitin-fragment-t1', quantity: 1, requirements: rareMaterialRollRequirement },
          { id: 'forest-chitin-2', x: 5, y: 4, itemId: 'chitin-fragment-t1', quantity: 1, requirements: rareMaterialRollRequirement },
          { id: 'forest-chitin-3', x: 3, y: 6, itemId: 'chitin-fragment-t1', quantity: 1, requirements: rareMaterialRollRequirement },
        ],
        objects: createTrainerPlacements(
          bugGauntletBattleIds,
          [
            { x: 2, y: 2 },
            { x: 6, y: 2 },
            { x: 1, y: 4 },
            { x: 4, y: 4 },
            { x: 7, y: 5 },
          ],
          'bug-catcher-trainer',
        ),
      }],
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
      { type: 'item', targetId: 'wing-feather-t1', quantity: 3, dropChance: 100 },
      { type: 'item', targetId: 'rare-candy-m', quantity: 1, dropChance: 100 },
    ],
    isEligibleForReplay: true,
    settings: {
      variant: 'rock-push',
      tilePaletteId: 'grass',
      timeLimit: 1800,
      grid_size: 9,
      lives: 1,
      winCondition: { type: 'activity-successes', count: birdGauntletBattleIds.length },
      playerStart: { x: 4, y: 7 },
      startScreen: 'route-14',
      screens: [{
        id: 'route-14',
        prizes: [
          { id: 'route-14-feather-1', x: 4, y: 2, itemId: 'wing-feather-t1', quantity: 1, requirements: rareMaterialRollRequirement },
          { id: 'route-14-feather-2', x: 4, y: 4, itemId: 'wing-feather-t1', quantity: 1, requirements: rareMaterialRollRequirement },
          { id: 'route-14-feather-3', x: 4, y: 6, itemId: 'wing-feather-t1', quantity: 1, requirements: rareMaterialRollRequirement },
        ],
        objects: createTrainerPlacements(
          birdGauntletBattleIds,
          [
            { x: 2, y: 2 },
            { x: 6, y: 2 },
            { x: 2, y: 4 },
            { x: 6, y: 4 },
            { x: 2, y: 6 },
            { x: 6, y: 6 },
          ],
          'bird-keeper-trainer',
        ),
      }],
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
      grid_size: 9,
      lives: 1,
      winCondition: { type: 'activity-successes', count: 5 },
      playerStart: { x: 4, y: 7 },
      startScreen: 'tower-1',
      screens: createTowerFloors(),
    },
  },
]
