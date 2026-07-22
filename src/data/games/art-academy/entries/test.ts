import { ArtAcademyGameConfig } from '../types'

export const testArtAcademyEntries: ArtAcademyGameConfig[] = [
  {
    id: 'art-academy-test',
    name: 'Art Academy Test',
    description: 'Copy Pikachu from its HOME study plate before the timer runs out.',
    category: 'Kanto',
    subCategory: 'Test',
    icon: { type: 'pokemon', id: '25' },
    background: '/backgrounds/town.avif',
    requirements: [],
    rewards: [],
    settings: {
      formId: '25',
      timeLimit: 180,
      successThreshold: 50,
      paletteSize: 8,
    },
  },
]
