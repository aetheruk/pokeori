import type { TaskCondition } from '@/data/tasks/types'
import type { WeatherSlotMap } from '@/data/weather'

export interface RegionData {
  category: string
  image: string
  description?: string
  music?: string
  region?: string
  order?: number
  alwaysAvailable?: boolean
  unlockRequirements?: TaskCondition[]
  completeRequirements?: TaskCondition[]
  weatherSlots?: WeatherSlotMap
}

// prettier-ignore
export const subCategories: Record<string, RegionData> = {
  Test: {
    category: 'Test',
    region: 'Kanto',
    order: 1,
    alwaysAvailable: true,
    image: '/backgrounds/cave.avif',
    description: 'Debug-only test encounters for development.',
    music: '/music/minigame.mp3',
  },
  'Pallet Town': {
    category: 'Pallet Town',
    region: 'Kanto',
    order: 10,
    alwaysAvailable: true,
    image: '/backgrounds/town.avif',
    description: 'A famous Pokemon professor lives here in this quiet seaside town.',
    music: '/music/pallet.mp3',
    weatherSlots: {
      1: 'rain',
      2: 'rain',
      3: 'rain',
      5: 'fog'
    },
    completeRequirements: [{ type: 'task_completed', targetId: 'explore-1' }],
  },
  'Viridian City': {
    category: 'Viridian City',
    region: 'Kanto',
    order: 20,
    image: '/backgrounds/virdian.avif',
    description: 'A small city on the edge of the Pokemon League.',
    music: '/music/viridian_city.mp3',
    weatherSlots: {
      1: 'rain',
      2: 'rain',
      3: 'rain',
      5: 'fog'
    },
    unlockRequirements: [{ type: 'task_completed', targetId: 'explore-1' }],
    completeRequirements: [{ type: 'item_owned', targetId: 'badge-kanto-earth', count: 1 }],
  },
  'Viridian Forest': {
    category: 'Viridian Forest',
    region: 'Kanto',
    order: 30,
    image: '/backgrounds/forest.avif',
    description: 'A dense forest filled with bug aficionados.',
    music: '/music/viridian_forest.mp3',
    weatherSlots: {
      1: 'rain',
      2: 'rain',
      3: 'rain',
      5: 'fog'
    },
    unlockRequirements: [{ type: 'battle_result', targetId: 'battle-grumpy-man', battleStatus: 'win', count: 1 }],
    completeRequirements: [
      { type: 'task_completed', targetId: 'viridian-exit' },
    ],
  },
  'Pewter City': {
    category: 'Pewter City',
    region: 'Kanto',
    order: 40,
    image: '/backgrounds/pewter.avif',
    description: "Brock's Gym and the Pokemon Science Museum, can be found here.",
    music: '/music/pewter.mp3',
    unlockRequirements: [{ type: 'task_completed', targetId: 'viridian-exit' }],
    completeRequirements: [{ type: 'item_owned', targetId: 'badge-kanto-boulder', count: 1 }],
        weatherSlots: {
      1: 'rain',
      2: 'rain',
      3: 'rain',
      4: 'sandstorm',
      5: 'sandstorm'
    },
  },
  'Pewter School': {
    category: 'Pewter School',
    region: 'Kanto',
    order: 45,
    image: '/backgrounds/pewter-school.avif',
    description: 'A dedicated school where trainers learn battle systems and core mechanics.',
    music: '/music/pewter.mp3',
    unlockRequirements: [{ type: 'task_completed', targetId: 'pewter-school-intro' }],
  },
  'Mt. Moon': {
    category: 'Mt. Moon',
    region: 'Kanto',
    order: 50,
    image: '/backgrounds/mt-moon.avif',
    description: 'Pokemon from another world are said to dance under the moonlight here.',
    music: '/music/moon.mp3',
    weatherSlots: {
      6: 'fog',
    },
    unlockRequirements: [{ type: 'battle_result', targetId: 'route-3-trainer-8', battleStatus: 'win', count: 1 }],
    completeRequirements: [{ type: 'task_completed', targetId: 'mt-moon-exit' }],
  },
  'Cerulean City': {
    category: 'Cerulean City',
    region: 'Kanto',
    order: 60,
    image: '/backgrounds/cerulean.avif',
    description: 'A seaside city with a cool mist hanging in the air.',
    music: '/music/cerulean.mp3',
    weatherSlots: {
      1: 'rain',
      2: 'rain',
      3: 'rain',
      5: 'fog'
    },
    unlockRequirements: [{ type: 'task_completed', targetId: 'mt-moon-exit' }],
    completeRequirements: [{ type: 'task_completed', targetId: 'reaching-rock-tunnel' }],
  },
  'Vermilion City': {
    category: 'Vermilion City',
    region: 'Kanto',
    order: 70,
    image: '/backgrounds/vermillion.avif',
    description: 'a small coastal city with a large development underway.',
    music: '/music/viridian_city.mp3',
    weatherSlots: {
      1: 'rain',
      2: 'rain',
      3: 'rain',
      5: 'fog',
      6: 'fog',
      7: 'fog',
    },
    unlockRequirements: [{ type: 'task_completed', targetId: 'underground-path-route-5' }],
    completeRequirements: [{ type: 'item_owned', targetId: 'badge-kanto-thunder', count: 1 }],
  },
  'Rock Tunnel': {
    category: 'Rock Tunnel',
    region: 'Kanto',
    order: 90,
    image: '/backgrounds/cave.avif',
    description: 'A long tunnel said to be carved out by Onix.',
    music: '/music/moon.mp3',
    weatherSlots: {
      7: 'fog',
      19: 'sandstorm',
    },
    unlockRequirements: [{ type: 'task_completed', targetId: 'reaching-rock-tunnel' }],
    completeRequirements: [{ type: 'task_completed', targetId: 'rock-tunnel-exit' }],
  },
  'Lavender Town': {
    category: 'Lavender Town',
    region: 'Kanto',
    order: 100,
    image: '/backgrounds/lavender.avif',
    description: 'A town in the shadow of the Pokemon Tower.',
    music: '/music/pallet.mp3',
    unlockRequirements: [{ type: 'task_completed', targetId: 'rock-tunnel-exit' }],
        weatherSlots: {
      1: 'rain',
      2: 'rain',
      3: 'rain',
      5: 'fog'
    },
  },
  'Pokemon Tower': {
    category: 'Pokemon Tower',
    region: 'Kanto',
    order: 110,
    image: '/backgrounds/pkmn-tower.avif',
    description: 'Souls of Pokemon are laid to rest here.',
    music: '/music/moon.mp3',
        unlockRequirements: [{ type: 'task_completed', targetId: 'lavender-missing-mountain' }],
  },
  'Celadon City': {
    category: 'Celadon City',
    region: 'Kanto',
    order: 120,
    image: '/backgrounds/celadon.avif',
    description: 'A sprawling city with a huge department store.',
    music: '/music/viridian_city.mp3',
    unlockRequirements: [
      { type: 'task_completed', targetId: 'underground-path-route-8' },
    ],
    weatherSlots: {
      1: 'rain',
      2: 'rain',
      3: 'rain',
      5: 'fog',
    },
  },
  'Celadon Game Corner': {
    category: 'Celadon Game Corner',
    region: 'Kanto',
    order: 130,
    image: '/backgrounds/game-corner.avif',
    description: 'A haven of games for those wanting to lose their money.',
    music: '/music/minigame.mp3',
  },
  'Saffron City': {
    category: 'Saffron City',
    region: 'Kanto',
    order: 140,
    image: '/backgrounds/saffron.avif',
    description: 'A city on the east coast, featuring the Pokemon League.',
    music: '/music/viridian_city.mp3',
        weatherSlots: {
      1: 'rain',
      2: 'rain',
      3: 'rain',
      5: 'fog'
    },
  },
  'Silph Co': {
    category: 'Silph Co',
    region: 'Kanto',
    order: 150,
    image: '/backgrounds/silph.avif',
    description: 'The office buildings of the powerful Silph Co.',
    music: '/music/gym.mp3',
  },
  'Cycling Road': {
    category: 'Cycling Road',
    region: 'Kanto',
    order: 160,
    image: '/backgrounds/cycling-road.avif',
    description: 'The perfect place for trainers to practice their cycling skills.',
    music: '/music/viridian_city.mp3',
        weatherSlots: {
      1: 'rain',
      3: 'rain',
      5: 'fog',
    },
  },
  'Fuchsia City': {
    category: 'Fuchsia City',
    region: 'Kanto',
    order: 170,
    image: '/backgrounds/fuchsia.avif',
    description: 'A city on the south coast, featuring the sprawling Safari Zone',
    music: '/music/viridian_city.mp3',
            weatherSlots: {
      1: 'rain',
      2: 'rain',
      3: 'rain',
      5: 'fog'
    },
  },
  'Safari Zone': {
    category: 'Safari Zone',
    region: 'Kanto',
    order: 180,
    image: '/backgrounds/safari.avif',
    description: 'A huge nature reserve packed with Rare Pokemon.',
    music: '/music/viridian_forest.mp3',
            weatherSlots: {
      1: 'rain',
      2: 'rain',
      3: 'rain',
      5: 'fog'
    },
  },
  'Power Plant': {
    category: 'Power Plant',
    region: 'Kanto',
    order: 95,
    image: '/backgrounds/power-plant.avif',
    description: "Kanto's main power plant supplying energy to the whole region.",
    music: '/music/gym.mp3',
  },
  'Cinnabar Island': {
    category: 'Cinnabar Island',
    region: 'Kanto',
    order: 200,
    image: '/backgrounds/cinnabar.avif',
    description: 'A volcanic island town, with an advanced Pokemon Lab ',
    music: '/music/pewter.mp3',
            weatherSlots: {
      1: 'rain',
      2: 'rain',
      3: 'rain',
      5: 'fog'
    },
  },
  'Pokemon Mansion': {
    category: 'Pokemon Mansion',
    region: 'Kanto',
    order: 210,
    image: '/backgrounds/mansion.avif',
    description: 'An abandoned mansion with a sad history.',
    music: '/music/moon.mp3',
  },
  'Seafoam Islands': {
    category: 'Seafoam Islands',
    region: 'Kanto',
    order: 171,
    image: '/backgrounds/seafoam.avif',
    description: 'A group of islands said to be the home of a legendary Pokemon.',
    music: '/music/moon.mp3',
  },
  'Victory Road': {
    category: 'Victory Road',
    region: 'Kanto',
    order: 240,
    image: '/backgrounds/victory-road.avif',
    description: 'A huge cave system and the final challenge before the Pokemon League.',
    music: '/music/moon.mp3',
  },
  'Indigo Plateau': {
    category: 'Indigo Plateau',
    region: 'Kanto',
    order: 250,
    image: '/backgrounds/indigo-plateau.avif',
    description: 'The home of the Pokemon League.',
    music: '/music/gym.mp3',
  },
  'Cerulean Cave': {
    category: 'Cerulean Cave',
    region: 'Kanto',
    order: 61,
    image: '/backgrounds/cerulean-cave.avif',
    description: 'A secret cave that only the most powerful of trainers may enter.',
    music: '/music/moon.mp3',
  },
  'Digletts Cave': {
    category: 'Digletts Cave',
    region: 'Kanto',
    order: 71,
    image: '/backgrounds/digletts-cave.avif',
    description: 'A small cave with rumours it connects to a secret underground area.',
    music: '/music/moon.mp3',
    unlockRequirements: [{ type: 'task_completed', targetId: 'vermilion-rumours' }],
  },
}
