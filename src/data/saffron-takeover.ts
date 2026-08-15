import type { TaskIcon } from '@/data/tasks/types'

/**
 * Memory slots shown on the Explore takeover screen while Saffron City is in
 * blackout. Each slot corresponds to a future chronicle expedition; the view
 * renders them as sealed records until those expeditions are authored.
 */
export interface SaffronTakeoverMemory {
  id: string
  speaker: string
  title: string
  description: string
  icon: TaskIcon
  background: string
  /** Expedition IDs that must be completed before this slot is revealed. */
  requiresCompleted?: string[]
}

export const SAFFRON_TAKEOVER_MEMORIES: SaffronTakeoverMemory[] = [
  {
    id: 'arianna-saffron-takeover-chronicle',
    speaker: 'Ariana',
    title: 'Ariana’s Record',
    description:
      'A Team Rocket executive’s account of the night the city went dark.',
    icon: { type: 'trainer', id: 'rocket' },
    background: '/backgrounds/saffron.avif',
  },
  {
    id: 'choo-saffron-investigation-chronicle',
    speaker: 'Detective Ray Choo',
    title: 'Choo’s Case File',
    description:
      'The detective’s notes on everything that happened outside the gym while you were out.',
    icon: { type: 'trainer', id: 'detective' },
    background: '/backgrounds/police-hq.avif',
  },
  {
    id: 'player-saffron-escape-chronicle',
    speaker: 'You',
    title: 'The Escape',
    description:
      'Your own account of the night, recovered once both records are found.',
    icon: { type: 'trainer', id: 'gb-red' },
    background: '/backgrounds/saffron.avif',
    requiresCompleted: [
      'arianna-saffron-takeover-chronicle',
      'choo-saffron-investigation-chronicle',
    ],
  },
]
