import type { CoinPusherGameConfig } from '../types'

export const testCoinPusherEntries: CoinPusherGameConfig[] = [{
  id: 'coin-pusher-test',
  gameType: 'coin-pusher',
  name: 'Coin Pusher Test',
  description: 'Drop Fun Tokens and push coins and prizes over the edge.',
  category: 'Kanto',
  subCategory: 'Test',
  icon: { type: 'item', id: 'fun-token' },
  background: '/backgrounds/celadon-game-corner-arcade.avif',
  requirements: [],
  rewards: [],
  isEligibleForReplay: true,
  settings: {
    cost: { currencyType: 'fun-tokens', amount: 1 },
    payout: { currencyType: 'fun-tokens', amount: 1 },
    bubbleChance: 1 / 12,
    maxBubbles: 3,
    prizePool: [{
      id: 'broken-ball',
      weight: 1,
      icon: { type: 'item', id: 'broken-ball-t1' },
      rewards: [{ type: 'item', targetId: 'broken-ball-t1', quantity: 1, dropChance: 100 }],
    }],
  },
}]
