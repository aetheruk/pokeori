import { DiglettTunnelTapGameConfig } from '../types'

const diglettsCaveUnlockRequirement = {
  type: 'task_completed' as const,
  targetId: 'vermilion-rumours',
}

export const diglettsCaveDiglettTunnelTapEntries: DiglettTunnelTapGameConfig[] = [
  {
    id: 'digletts-cave-mallet-tap',
    name: 'Whack-a-Diglett',
    description: 'I have no reason to do this, but I just cant help myself.',
    category: 'Kanto',
    subCategory: 'Digletts Cave',
    icon: { type: 'item', id: 'rubber-mallet' },
    background: '/backgrounds/cave.avif',
    requirements: [
      diglettsCaveUnlockRequirement,
      {
        type: 'item_owned',
        targetId: 'rubber-mallet',
      },
    ],
    rewards: [],
    skillXp: { skill: 'researching', level: 5 },
    settings: {
      gridSize: { cols: 4, rows: 4 },
      targetScore: 14,
      timeLimit: 35,
      spawnIntervalMs: 720,
      visibleMs: 950,
      diglettScore: 1,
      dugtrioPenalty: 2,
      hazardPokemonId: '95',
      maxLives: 3,
      winRate: 1,
      themeColour: '#a16207',
      background: '/backgrounds/cave.avif',
    },
  },
]
