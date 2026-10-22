import type { RockPushGameConfig } from '../types'

const route1Battle = {
  type: 'battle' as const,
  targetId: 'route-1-battle',
  victory: 'clear' as const,
}

export const testbasicEntries: RockPushGameConfig[] = [
  {
    id: 'grid-adventure-test',
    name: 'Grid Adventure Test',
    description: 'Choose from five Route 1 wild Pokémon across three connected scenes. Win any three battles to clear the grid. You have three lives.',
    category: 'Kanto',
    subCategory: 'Test',
    icon: { type: 'local', id: '/sprites/tall_grass-v2.avif' },
    background: '/backgrounds/grassy-route.avif',
    requirements: [],
    rewards: [],
    settings: {
      variant: 'rock-push',
      tilePaletteId: 'grass',
      timeLimit: 1800,
      grid_size: 9,
      lives: 3,
      winCondition: { type: 'activity-successes', count: 3 },
      playerStart: { x: 1, y: 1 },
      startScreen: 'entry',
      screens: [
        {
          id: 'entry',
          objects: [
            { id: 'entry-rattata', objectId: 'route-1-rattata-trigger', x: 2, y: 1, interaction: route1Battle },
            { id: 'entry-pidgey', objectId: 'route-1-pidgey-trigger', x: 4, y: 1, interaction: route1Battle },
          ],
          teleporters: [{
            id: 'entry-to-meadow', x: 7, y: 1,
            target: { screen: 'meadow', x: 1, y: 1 },
            oneWay: true,
          }],
        },
        {
          id: 'meadow',
          objects: [
            { id: 'meadow-pidgey', objectId: 'route-1-pidgey-trigger', x: 2, y: 1, interaction: route1Battle },
            { id: 'meadow-rattata', objectId: 'route-1-rattata-trigger', x: 4, y: 1, interaction: route1Battle },
          ],
          teleporters: [
            { id: 'meadow-to-entry', x: 1, y: 1, target: { screen: 'entry', x: 7, y: 1 } },
            { id: 'meadow-to-woodland', x: 7, y: 1, target: { screen: 'woodland', x: 1, y: 1 }, oneWay: true },
          ],
        },
        {
          id: 'woodland',
          objects: [
            { id: 'woodland-pidgey', objectId: 'route-1-pidgey-trigger', x: 4, y: 4, interaction: route1Battle },
          ],
          teleporters: [{
            id: 'woodland-to-meadow', x: 1, y: 1,
            target: { screen: 'meadow', x: 7, y: 1 },
          }],
        },
      ],
    },
  },
]
