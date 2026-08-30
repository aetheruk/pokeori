import { safariZoneMiniGameAreas } from '../../safari-zone-mini-game-areas'
import type { SilhouetteConfig } from '../types'

export const safariZoneSilhouetteEntries: SilhouetteConfig[] =
  safariZoneMiniGameAreas.map(({ id, name, icon, pokemonPool }) => ({
    id: `safari-${id}-expedition-silhouette`,
    name: `Who's That Pokemon? Safari ${name}`,
    description: `Identify a Pokemon from Safari ${name} by its silhouette for the expedition record.`,
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
      optionsPool: [],
      winRate: 1,
    },
  }))
