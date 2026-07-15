import type { Reward } from '@/utilities/rewards/reward-logic'

export interface MysteryGift {
  code: string
  active: boolean
  rewards: Reward[]
  expirationDate?: string
}

export const mysteryGifts: MysteryGift[] = [
  {
    code: 'WELCOME-TRAINER',
    active: true,
    rewards: [
      {
        type: 'currency',
        targetId: 'pokedollars',
        quantity: 5000,
      },
      {
        type: 'currency',
        targetId: 'crystals',
        quantity: 100,
      },
      {
        type: 'item',
        targetId: 'poke-ball',
        quantity: 10,
      },
    ],
  },
]
