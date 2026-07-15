import { MiningConfig } from '../types'

export const mtMoonminingEntries: MiningConfig[] = [
  {
    id: 'mt-moon-mining',
    name: 'Mining Mt. Moon',
    description: 'Time to see what Geodude is made of!',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'item',
      id: 'hard-stone',
    },
    background: '/backgrounds/cave.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mt-moon-fossil-hunter',
      },
    ],
    criteria: [
      {
        type: 'pokemon_owned',
        targetId: '74',
        count: 1,
        consume: true,
      },
    ],
    settings: {
      targetSize: { min: 5, max: 9 },
      speed: { min: 0.8, max: 1.2 }, // 0.8-1.2 cycles per second
      itemHp: 100,
      perfectDamage: 25,
      okDamage: 10,
      maxSwings: 10,
      timeLimit: 30,
      winRate: 1, // One-shot game
      buttonIcon: {
        type: 'pokemon',
        id: '74',
      },
      miningTarget: '/games/mining/rock.avif',
    },
    rewards: [
      {
        type: 'item',
        targetId: 'small-stone-t1',
        quantity: { min: 2, max: 6 },
        dropChance: 100,
      },
      {
        type: 'pokemon_research_xp',
        targetId: '74',
        quantity: 5,
        dropChance: 100,
      },
      {
        type: 'item',
        targetId: 'moon-stone',
        quantity: 1,
        dropChance: 2,
      },
      {
        type: 'item',
        targetId: 'dome-fossil',
        quantity: 1,
        dropChance: 1,
      },
      {
        type: 'item',
        targetId: 'helix-fossil',
        quantity: 1,
        dropChance: 1,
      },
    ],
    skillXp: { skill: 'catching', level: 15 },
  },
]
