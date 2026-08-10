import type { RhythmConfig } from '../types'

export const gymLeaderChronicleRhythmEntries: RhythmConfig[] = [
  {
    id: 'chronicle-misty-emergency-pumps',
    name: 'Emergency Valve Sequence',
    description: "Follow Misty's signals to isolate the damaged tank and keep the service gates powered.",
    category: 'Secret', subCategory: 'Misty Chronicle',
    icon: { type: 'pokemon', id: '121' },
    background: '/backgrounds/chronicle-misty-water-theater.avif',
    requirements: [{ type: 'task_completed', targetId: 'cascade-badge-memory-revealed' }],
    criteria: [], rewards: [],
    settings: {
      icons: [
        { type: 'pokemon', id: '116', label: 'Horsea' },
        { type: 'pokemon', id: '121', label: 'Starmie' },
        { type: 'pokemon', id: '54', label: 'Psyduck' },
      ],
      speed: 235, spawnRate: { min: 1.15, max: 1.55 }, timeLimit: 28, winScore: 180, winRate: 1,
    },
  },
  {
    id: 'chronicle-blaine-evacuation-alarms',
    name: 'Containment Drill',
    description: "Learn the laboratory's alarm sequence and open the marked evacuation route.",
    category: 'Secret', subCategory: 'Blaine Chronicle',
    icon: { type: 'pokemon', id: '58' },
    background: '/backgrounds/chronicle-blaine-cinnabar-lab.avif',
    requirements: [{ type: 'task_completed', targetId: 'volcano-badge-memory-revealed' }],
    criteria: [], rewards: [],
    settings: {
      icons: [
        { type: 'pokemon', id: '58', label: 'Growlithe' },
        { type: 'item', id: 'burn-heal', label: 'Medical' },
        { type: 'item', id: 'escape-rope', label: 'Exit' },
      ],
      speed: 285, spawnRate: { min: 0.9, max: 1.25 }, timeLimit: 30, winScore: 220, winRate: 1,
    },
  },
]
