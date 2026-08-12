import type { RhythmConfig } from '../types'

export const gymLeaderChronicleRhythmEntries: RhythmConfig[] = [
  {
    id: 'chronicle-v2-misty-finale-rehearsal',
    name: 'Stay With the Routine',
    description: "Keep Misty in step with her sisters' water-show choreography without turning every cue into a battle command.",
    category: 'Secret',
    subCategory: 'Misty Chronicle',
    icon: { type: 'pokemon', id: '121' },
    background: '/backgrounds/chronicle-misty-water-theater.avif',
    requirements: [{ type: 'task_completed', targetId: 'cascade-badge-memory-revealed' }],
    criteria: [],
    rewards: [],
    settings: {
      icons: [
        { type: 'pokemon', id: '116', label: 'Horsea' },
        { type: 'pokemon', id: '121', label: 'Starmie' },
        { type: 'pokemon', id: '54', label: 'Psyduck' },
      ],
      speed: 285,
      spawnRate: { min: 0.8, max: 1.15 },
      timeLimit: 36,
      winScore: 520,
      winRate: 1,
    },
  },
]
