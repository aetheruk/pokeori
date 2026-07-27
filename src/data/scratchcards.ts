import { Reward, TaskIcon } from './types'

export interface ScratchCardConfig {
  id: string
  name: string
  background: string
  rewards: {
    chance: number // percentage 0-100
    reward?: Reward[] // undefined if "nothing"
    icon: TaskIcon
  }[]
}

export const scratchCards: Record<string, ScratchCardConfig> = {
  'rocket-scratch': {
    id: 'rocket-scratch',
    name: 'Rocket Scratch Card',
    background: '/scratchcard/rocket-scratch.avif',
    rewards: [
      {
        chance: 25,
        reward: [
          {
            type: 'item',
            targetId: 'rocket-ball',
            quantity: 3,
            label: '3 Rocket Balls',
          },
        ],
        icon: { type: 'item', id: 'rocket-ball' },
      },
      {
        chance: 60,
        reward: [
          {
            type: 'currency',
            targetId: 'fun-tokens',
            quantity: 50,
            label: '50 Fun Tokens',
          },
        ],
        icon: { type: 'item', id: 'fun-token' },
      },
      {
        chance: 5,
        reward: [
          {
            type: 'currency',
            targetId: 'fun-tokens',
            quantity: 250,
            label: '250 Fun Tokens',
          },
        ],
        icon: { type: 'item', id: 'fun-token' },
      },
      {
        chance: 3,
        reward: [
          {
            type: 'item',
            targetId: 'nugget',
            quantity: 1,
            label: 'Nugget',
          },
        ],
        icon: { type: 'item', id: 'nugget' },
      },
      {
        chance: 3,
        reward: [
          {
            type: 'currency',
            targetId: 'fun-tokens',
            quantity: 500,
            label: '500 Fun Tokens',
          },
        ],
        icon: { type: 'item', id: 'fun-token' },
      },
      {
        chance: 1,
        reward: [
          {
            type: 'currency',
            targetId: 'fun-tokens',
            quantity: 1000,
            label: '1,000 Fun Tokens',
          },
        ],
        icon: { type: 'item', id: 'fun-token' },
      },
      {
        chance: 1,
        reward: [
          {
            type: 'icon',
            targetId: 'gambler',
            label: 'Gambler Icon',
          },
        ],
        icon: { type: 'trainer', id: 'gamer' },
      },
      {
        chance: 1,
        reward: [
          {
            type: 'title',
            targetId: 'gambler',
            label: 'Gambler Title',
          },
        ],
        icon: { type: 'trainer', id: 'gamer' },
      },
      {
        chance: 1,
        reward: [
          {
            type: 'banner',
            targetId: 'celadon-game-corner',
            label: 'Celadon Game Corner Background',
          },
        ],
        icon: { type: 'trainer', id: 'gamer' },
      },
    ],
  },
  'zap-n-scratch': {
    id: 'zap-n-scratch',
    name: 'Zap n Scratch',
    background: '/scratchcard/zapscratch.avif',
    rewards: [
      {
        chance: 1,
        reward: [
          {
            type: 'item',
            targetId: 'thunder-stone',
            quantity: 1,
            label: 'Thunder Stone',
          },
        ],
        icon: { type: 'item', id: 'thunder-stone' },
      },
      {
        chance: 20,
        reward: [
          {
            type: 'item',
            targetId: 'electric-gem',
            quantity: 10,
            label: '10 Electric Gems',
          },
        ],
        icon: { type: 'item', id: 'electric-gem' },
      },
      {
        chance: 4,
        reward: [
          {
            type: 'item',
            targetId: 'shining-electric-gem',
            quantity: 10,
            label: '10 Shining Electric Gems',
          },
        ],
        icon: { type: 'item', id: 'electric-gem' },
      },
      {
        chance: 5,
        reward: [
          {
            type: 'item',
            targetId: 'binder-sv8',
            quantity: 1,
            label: 'Surging Sparks Binder',
          },
          {
            type: 'item',
            targetId: 'pack-sv8',
            quantity: 2,
          },
        ],
        icon: { type: 'item', id: 'binder-sv8' },
      },
      {
        chance: 20,
        reward: [
          {
            type: 'item',
            targetId: 'pack-sv8',
            quantity: 2,
          },
        ],
        icon: { type: 'local', id: '/sprites/card.avif' },
      },
      {
        chance: 50,
        reward: [],
        icon: { type: 'pokemon', id: '101' },
      },
    ],
  },
  'moon-scratch': {
    id: 'moon-scratch',
    name: 'Mt Moon Scratchie',
    background: '/scratchcard/mtmoon.avif',
    rewards: [
      {
        chance: 1,
        reward: [
          {
            type: 'item',
            targetId: 'moon-stone',
            quantity: 1,
            label: 'Moon Stone',
          },
        ],
        icon: { type: 'item', id: 'moon-stone' },
      },
      {
        chance: 1,
        reward: [
          {
            type: 'task_complete',
            targetId: 'moon-ball-manual',
            quantity: 1,
            label: 'Moon Ball Manual',
            requirements: [
              {
                type: 'task_completed',
                targetId: 'moon-ball-manual',
                inverse: true,
              },
            ],
          },
        ],
        icon: { type: 'item', id: 'moon-ball' },
      },
      {
        chance: 11,
        reward: [
          {
            type: 'item',
            targetId: 'mt-moon-expedition-map',
            quantity: 1,
            label: 'Mt. Moon Expedition Map',
          },
        ],
        icon: { type: 'item', id: 'mt-moon-expedition-map' },
      },
      {
        chance: 10,
        reward: [
          {
            type: 'item',
            targetId: 'fairy-gem',
            quantity: { min: 1, max: 3 },
            label: 'Fairy Gems',
          },
        ],
        icon: { type: 'item', id: 'fairy-gem' },
      },
      {
        chance: 10,
        reward: [
          {
            type: 'currency',
            targetId: 'crystals',
            quantity: 100,
            label: 'Crystals',
          },
        ],
        icon: { type: 'item', id: 'revive' },
      },
      {
        chance: 25,
        reward: [
          {
            type: 'currency',
            targetId: 'pokedollars',
            quantity: 80,
            label: 'Pokedollars',
          },
        ],
        icon: { type: 'item', id: 'relic-gold' },
      },
      {
        chance: 0.01,
        reward: [
          {
            type: 'currency',
            targetId: 'crystals',
            quantity: 1000,
            label: 'Crystals',
          },
        ],
        icon: { type: 'item', id: 'max-revive' },
      },
      {
        chance: 41.99,
        reward: [
          {
            type: 'item',
            targetId: 'small-stone-t1',
            quantity: 1,
            label: 'Small Stone',
          },
        ],
        icon: { type: 'item', id: 'hard-stone' },
      },
    ],
  },
}
