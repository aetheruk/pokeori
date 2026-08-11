import type { ArtAcademyGameConfig } from '../types'

export const gymLeaderChronicleArtAcademyEntries: ArtAcademyGameConfig[] = [
  {
    id: 'chronicle-erika-draw-the-programme-bloom',
    name: 'Draw the Programme Bloom',
    description: 'Design a programme illustration that presents Gloom as itself, not as an apology.',
    category: 'Secret',
    subCategory: 'Erika Chronicle',
    icon: { type: 'pokemon', id: '44' },
    background: '/backgrounds/chronicle-erika-flower-exhibition.avif',
    requirements: [{ type: 'task_completed', targetId: 'rainbow-badge-memory-revealed' }],
    criteria: [],
    rewards: [],
    isEligibleForReplay: true,
    settings: {
      formId: '44',
      timeLimit: 150,
      successThreshold: 30,
      paletteSize: 8,
    },
  },
]
