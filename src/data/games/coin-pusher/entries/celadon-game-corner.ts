import type { CoinPusherGameConfig, CoinPusherPrize } from '../types'

const baseMaterials = [
  ['soft-fluff-t1', 'Soft Fluff'],
  ['cinder-shard-t1', 'Cinder Shards'],
  ['aqua-solvent-t1', 'Aqua Solvent'],
  ['electric-component-t1', 'Electric Components'],
  ['wood-scraps-t1', 'Wood Scraps'],
  ['frost-crystal-t1', 'Frost Crystals'],
  ['grip-weave-t1', 'Grip Weave'],
  ['toxic-resin-t1', 'Toxic Resin'],
  ['terra-dust-t1', 'Soft Clay'],
  ['wing-feather-t1', 'Wing Feathers'],
  ['mind-thread-t1', 'Rune Stones'],
  ['chitin-fragment-t1', 'Chitin Fragments'],
  ['small-stone-t1', 'Small Stones'],
  ['spirit-wisp-t1', 'Ectoplasm'],
  ['drake-scale-t1', 'Drake Scales'],
  ['shadow-fiber-t1', 'Shadow Cloth'],
  ['metal-scrap-t1', 'Metal Scrap'],
  ['pixie-powder-t1', 'Fairy Charms'],
] as const

function itemPrize(
  id: string,
  label: string,
  quantity: number,
  rarity: CoinPusherPrize['rarity'] = 'common',
  weight = 10,
): CoinPusherPrize {
  return {
    id,
    label,
    rarity,
    weight,
    icon: { type: 'item', id },
    rewards: [{ type: 'item', targetId: id, quantity, dropChance: 100 }],
  }
}

const standardPrizes: CoinPusherPrize[] = [
  ...baseMaterials.map(([id, label]) => itemPrize(id, `3 ${label}`, 3)),
  itemPrize('pack-base5', '2 Team Rocket Booster Packs', 2),
  itemPrize('shiny-konban', 'Koban', 1),
]

const highStakesPrizes: CoinPusherPrize[] = [
  ...baseMaterials.map(([id, label]) => itemPrize(id, `10 ${label}`, 10)),
  itemPrize('pack-base5', '5 Team Rocket Booster Packs', 5),
  ...[
    ['fire-stone', 'Fire Stone'],
    ['water-stone', 'Water Stone'],
    ['thunder-stone', 'Thunder Stone'],
    ['leaf-stone', 'Leaf Stone'],
    ['ice-stone', 'Ice Stone'],
  ].map(([id, label]) => itemPrize(id, label, 1, 'rare', 0.5)),
  itemPrize('up-grade', 'Up-Grade', 1, 'ultra-rare', 0.1),
  itemPrize('dubious-disc', 'Dubious Disc', 1, 'ultra-rare', 0.1),
]

function createCoinPusherEntry({
  id,
  name,
  description,
  sprite,
  highStakes = false,
}: {
  id: string
  name: string
  description: string
  sprite: string
  highStakes?: boolean
}): CoinPusherGameConfig {
  return {
    id,
    gridAdventureOnly: true,
    hide: highStakes ? 'high-roller' : 'when-the-fun-stops',
    gameType: 'coin-pusher',
    name,
    description,
    category: 'Kanto',
    subCategory: 'Celadon Game Corner',
    icon: { type: 'local', id: sprite },
    background: '/backgrounds/celadon-game-corner-arcade.avif',
    requirements: [{ type: 'task_completed', targetId: highStakes ? 'high-roller' : 'when-the-fun-stops' }],
    criteria: [],
    rewards: [],
    settings: {
      cost: { currencyType: 'fun-tokens', amount: highStakes ? 10 : 1 },
      payout: { currencyType: 'fun-tokens', amount: highStakes ? 10 : 1 },
      coinDenominations: {
        bronze: { value: 1, weight: 76 },
        silver: { value: 10, weight: 20 },
        gold: { value: 25, weight: 4 },
      },
      bubbleChance: 1 / 12,
      maxBubbles: 3,
      prizePool: highStakes ? highStakesPrizes : standardPrizes,
    },
  }
}

export const celadonCoinPusherEntries: CoinPusherGameConfig[] = [
  createCoinPusherEntry({
    id: 'celadon-rocket-coin-pusher',
    name: 'Game Plaza Coin Pusher',
    description: 'Drop a token and see what the coin shelf pushes your way.',
    sprite: '/games/grid-objects/game-plaza-coin-pusher.png',
  }),
  createCoinPusherEntry({
    id: 'celadon-high-stakes-coin-pusher',
    name: 'High Stakes Game Plaza Coin Pusher',
    description: 'Play for bigger token payouts and a chance at rare evolution items.',
    sprite: '/games/grid-objects/game-plaza-coin-pusher-high-stakes.png',
    highStakes: true,
  }),
]
