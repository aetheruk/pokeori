import type { RockPushGameConfig } from '../types'

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

export const gauntletGridAdventureEntries: RockPushGameConfig[] = [
  {
    id: 'buggy-gauntlet-grid-adventure',
    name: 'The Buggy Gauntlet',
    description:
      'Challenge the five Buggy Gauntlet trainers in any order. You have one life; defeat every trainer to clear the forest.',
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
    description:
      'Challenge the six Bird Keeper trainers in any order. You have one life; defeat every trainer to clear Route 14.',
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
]
