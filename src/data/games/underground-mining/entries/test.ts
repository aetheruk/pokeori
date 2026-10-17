import type { UndergroundMiningConfig } from '../types'

const standardGemIds = [
  'normal-gem',
  'fire-gem',
  'water-gem',
  'electric-gem',
  'grass-gem',
  'ice-gem',
  'fighting-gem',
  'poison-gem',
  'ground-gem',
  'flying-gem',
  'psychic-gem',
  'bug-gem',
  'rock-gem',
  'ghost-gem',
  'dragon-gem',
  'steel-gem',
  'dark-gem',
  'fairy-gem',
]

export const testUndergroundMiningEntries: UndergroundMiningConfig[] = [
  {
    id: 'underground-mining-test',
    name: 'Underground Mining Test',
    description:
      'Use a pickaxe and hammer to uncover type gems before the wall collapses.',
    category: 'Kanto',
    subCategory: 'Test',
    icon: { type: 'item', id: 'rock-gem' },
    background: '/backgrounds/cave.avif',
    requirements: [],
    rewards: [],
    isEligibleForReplay: true,
    settings: {
      complete: false,
      gridSize: { cols: 13, rows: 10 },
      wallTexture: '/backgrounds/underground-mining-wall.avif',
      wallTexturePortrait: '/games/underground-mining/scene-portrait.avif',
      treasureCount: { min: 1, max: 4 },
      lootPool: standardGemIds.map((itemId) => ({
        itemId,
        weight: 1,
        size: { width: 2, height: 2 },
      })),
      wallStressLimit: 24,
      toolStress: { pickaxe: 1, hammer: 2 },
      bedrockChance: 4,
    },
  },
]
