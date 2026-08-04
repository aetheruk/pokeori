import type { ArtAcademyGameConfig } from '../types'

export const kantoUndergroundArtAcademyEntries: ArtAcademyGameConfig[] = [
  {
    id: 'underground-tcg-art-academy',
    name: 'Design Your First Card',
    description:
      'Use five portions of dried yellow dye to create the Pikachu artwork for a new promotional card.',
    category: 'Underground',
    subCategory: 'Kanto Underground',
    icon: { type: 'pokemon', id: '25' },
    background: '/backgrounds/kanto-underground.avif',
    requirements: [
      { type: 'task_completed', targetId: 'underground-tcg-battle-wrapup' },
      { type: 'game_result', targetId: 'underground-tcg-art-academy', battleStatus: 'win', count: 1, inverse: true },
    ],
    criteria: [{ type: 'item_owned', targetId: 'dried-yellow', count: 5, consume: true }],
    rewards: [
      {
        type: 'card',
        quantity: 1,
        dropChance: 100,
        cardDrawParams: { allowedCardIds: ['basep-1'], guaranteed: true },
      },
    ],
    isEligibleForReplay: false,
    settings: {
      formId: '25',
      timeLimit: 180,
      successThreshold: 30,
      paletteSize: 8,
    },
  },
]
