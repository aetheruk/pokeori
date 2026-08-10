import type { MiningConfig } from '../types'

export const gymLeaderChronicleMiningEntries: MiningConfig[] = [
  {
    id: 'chronicle-brock-brace-the-tunnel',
    name: 'Brace the Tunnel',
    description: 'Clear fractured stone so the quarry crew can brace the damaged roof.',
    category: 'Secret',
    subCategory: 'Brock Chronicle',
    icon: { type: 'item', id: 'hard-stone' },
    background: '/backgrounds/chronicle-brock-quarry.avif',
    requirements: [{ type: 'task_completed', targetId: 'boulder-badge-memory-revealed' }],
    criteria: [],
    rewards: [],
    settings: {
      targetSize: { min: 8, max: 12 },
      speed: { min: 0.7, max: 1.05 },
      itemHp: 80,
      perfectDamage: 25,
      okDamage: 12,
      maxSwings: 10,
      timeLimit: 45,
      winRate: 1,
      buttonIcon: { type: 'pokemon', id: '74' },
      miningTarget: '/games/mining/rock.avif',
    },
  },
]
