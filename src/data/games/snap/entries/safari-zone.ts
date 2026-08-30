import { SnapConfig } from '../types'
import { safariZoneMiniGameAreas } from '../../safari-zone-mini-game-areas'

const safariExpeditionSnapEntries: SnapConfig[] =
  safariZoneMiniGameAreas.map(({ id, name, icon, pokemonPool }) => ({
    id: `safari-${id}-expedition-snap`,
    name: `Safari ${name} Snap Survey`,
    description: `Photograph a Pokemon living in Safari ${name} for the expedition record.`,
    category: 'Secret',
    subCategory: 'Safari Zone',
    icon: { type: 'pokemon', id: icon },
    background: '/backgrounds/safari-reserve.avif',
    expeditionOnly: true,
    requirements: [
      { type: 'item_owned', targetId: 'safari-catching-permit' },
    ],
    rewards: [
      {
        type: 'xp',
        skill: 'researching',
        quantity: 50,
        dropChance: 100,
      },
      {
        type: 'currency',
        targetId: 'safari-notes',
        quantity: 1,
        dropChance: 100,
      },
    ],
    settings: {
      pokemonPool: [...pokemonPool],
      timeLimit: 30,
      winRate: 1,
      successThreshold: 700,
    },
  }))

export const safariZonesnapEntries: SnapConfig[] = [
  ...safariExpeditionSnapEntries,
  {
    id: 'safari-chansey-search-snap',
    name: 'Find the Gentle Chansey',
    description:
      'The Institute has marked a quiet stretch of reeds where a particular Chansey was last seen. Keep the camera ready.',
    category: 'Kanto',
    subCategory: 'Safari Zone',
    icon: { type: 'pokemon', id: '113' },
    background: '/backgrounds/safari-reserve.avif',
    requirements: [
      { type: 'task_completed', targetId: 'fuchsia-research-institute-chansey-request' },
      {
        type: 'game_result',
        targetId: 'safari-chansey-search-snap',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
    ],
    rewards: [
      {
        type: 'task_complete',
        targetId: 'safari-chansey-search-complete',
        quantity: 1,
        dropChance: 100,
      },
    ],
    skillXp: { skill: 'researching', level: 32 },
    settings: {
      target: 113,
      targetMissMessage: 'Chansey slips back into the reeds before the shutter catches it.',
      timeLimit: 60,
      winRate: 1,
      successThreshold: 5000,
    },
  },
]
