import type { TaskCondition, TaskIcon } from '@/data/tasks/types'
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
  icon?: TaskIcon
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
    music: '/music/minigame.m4a',
  },
  '???': {
    category: '???',
    region: '???',
    order: 0,
    alwaysAvailable: true,
    image: '/backgrounds/saffron.avif',
    description: '???',
    music: '/music/saffron-takeover.m4a',
  },
  'Pallet Town': {
    category: 'Pallet Town',
    region: 'Kanto',
    order: 10,
    alwaysAvailable: true,
    image: '/backgrounds/town.avif',
    icon: { type: 'trainer', id: 'oak' },
    description: 'A famous Pokemon professor lives here in this quiet seaside town.',
    music: '/music/seaside.m4a',
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
    icon: { type: 'trainer', id: 'expert-m' },
    description: 'A small city on the edge of the Pokemon League.',
    music: '/music/viridian.m4a',
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
    icon: { type: 'trainer', id: 'bug-catcher' },
    description: 'A dense forest filled with bug aficionados.',
    music: '/music/viridian-forest.m4a',
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
    icon: { type: 'trainer', id: 'gym-kanto-brock' },
    description: "Brock's Gym and the Pokemon Science Museum, can be found here.",
    music: '/music/pewter.m4a',
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
    icon: { type: 'trainer', id: 'old-couple' },
    description: 'A dedicated school where trainers learn battle systems and core mechanics.',
    music: '/music/pewter-school.m4a',
    unlockRequirements: [{ type: 'task_completed', targetId: 'pewter-school-intro' }],
  },
  'Mt. Moon': {
    category: 'Mt. Moon',
    region: 'Kanto',
    order: 50,
    image: '/backgrounds/mt-moon.avif',
    icon: { type: 'item', id: 'moon-stone' },
    description: 'Pokemon from another world are said to dance under the moonlight here.',
    music: '/music/mt-moon.m4a',
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
    icon: { type: 'trainer', id: 'gym-kanto-misty' },
    description: 'A seaside city with a cool mist hanging in the air.',
    music: '/music/cerulean.m4a',
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
    icon: { type: 'trainer', id: 'gym-kanto-ltsurge' },
    description: 'a small coastal city with a large development underway.',
    music: '/music/vermilion.m4a',
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
    icon: { type: 'pokemon', id: '95' },
    description: 'A long tunnel said to be carved out by Onix.',
    music: '/music/cave.m4a',
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
    icon: { type: 'trainer', id: 'fuji' },
    description: 'A town in the shadow of the Pokemon Tower.',
    music: '/music/lavender.m4a',
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
    icon: { type: 'pokemon', id: '92' },
    description: 'Souls of Pokemon are laid to rest here.',
    music: '/music/pokemon-tower.m4a',
        unlockRequirements: [{ type: 'task_completed', targetId: 'lavender-missing-mountain' }],
  },
  'Celadon City': {
    category: 'Celadon City',
    region: 'Kanto',
    order: 120,
    image: '/backgrounds/celadon.avif',
    icon: { type: 'trainer', id: 'gym-kanto-erika' },
    description: 'A sprawling city with a huge department store.',
    music: '/music/celadon.m4a',
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
    icon: { type: 'item', id: 'fun-token' },
    description: 'A haven of games for those wanting to lose their money.',
    music: '/music/game-corner.m4a',
    unlockRequirements: [
      { type: 'task_completed', targetId: 'when-the-fun-stops' },
    ],
  },
  'Saffron City': {
    category: 'Saffron City',
    region: 'Kanto',
    order: 140,
    image: '/backgrounds/saffron.avif',
    icon: { type: 'trainer', id: 'gym-kanto-sabrina' },
    description: 'A city on the east coast, featuring the Pokemon League.',
    music: '/music/saffron.m4a',
    unlockRequirements: [
      { type: 'task_completed', targetId: 'a-stone-for-a-friend' },
    ],
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
    music: '/music/silph-co.m4a',
  },
  'Cycling Road': {
    category: 'Cycling Road',
    region: 'Kanto',
    order: 160,
    image: '/backgrounds/cycling-road.avif',
    description: 'The perfect place for trainers to practice their cycling skills.',
    music: '/music/cycling-road.m4a',
    weatherSlots: {
      1: 'rain',
      3: 'rain',
      5: 'fog',
    },
  },
  'Rocket Factory': {
    category: 'Rocket Factory',
    region: 'Kanto',
    order: 165,
    image: '/backgrounds/cycling-road.avif',
    icon: { type: 'trainer', id: 'rocket-grunt-m' },
    description: 'A Team Rocket facility built into Cycling Road.',
    music: '/music/rocket-factory.m4a',
    unlockRequirements: [
      { type: 'task_completed', targetId: 'fuchsia-what-now' },
    ],
  },
  'Fuchsia City': {
    category: 'Fuchsia City',
    region: 'Kanto',
    order: 170,
    image: '/backgrounds/fuchsia.avif',
    icon: { type: 'trainer', id: 'gym-kanto-koga' },
    description: 'A city on the south coast, featuring the sprawling Safari Zone',
    music: '/music/fuchsia.m4a',
    unlockRequirements: [{ type: 'task_completed', targetId: 'on-to-fuchsia-city' }],
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
    image: '/backgrounds/safari-reserve.avif',
    icon: { type: 'item', id: 'safari-ball' },
    description: 'A huge nature reserve packed with Rare Pokemon.',
    music: '/music/safari-zone.m4a',
    unlockRequirements: [{ type: 'task_completed', targetId: 'fuchsia-gym-search-for-koga' }],
    weatherSlots: {
      1: 'rain',
      2: 'rain',
      3: 'rain',
      5: 'fog',
    },
  },
  'Power Plant': {
    category: 'Power Plant',
    region: 'Kanto',
    order: 95,
    image: '/backgrounds/power-plant.avif',
    description: "Kanto's main power plant supplying energy to the whole region.",
    music: '/music/power-plant.m4a',
  },
  'Cinnabar Island': {
    category: 'Cinnabar Island',
    region: 'Kanto',
    order: 200,
    image: '/backgrounds/cinnabar.avif',
    icon: { type: 'trainer', id: 'gym-kanto-blaine' },
    description: 'A volcanic island town, with an advanced Pokemon Lab ',
    music: '/music/cinnabar.m4a',
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
    music: '/music/pokemon-mansion.m4a',
  },
  'Seafoam Islands': {
    category: 'Seafoam Islands',
    region: 'Kanto',
    order: 171,
    image: '/backgrounds/seafoam.avif',
    description: 'A group of islands said to be the home of a legendary Pokemon.',
    music: '/music/seafoam.m4a',
  },
  'Victory Road': {
    category: 'Victory Road',
    region: 'Kanto',
    order: 240,
    image: '/backgrounds/victory-road.avif',
    description: 'A huge cave system and the final challenge before the Pokemon League.',
    music: '/music/victory-road.m4a',
  },
  'Indigo Plateau': {
    category: 'Indigo Plateau',
    region: 'Kanto',
    order: 250,
    image: '/backgrounds/indigo-plateau.avif',
    description: 'The home of the Pokemon League.',
    music: '/music/indigo-plateau.m4a',
  },
  'Cerulean Cave': {
    category: 'Cerulean Cave',
    region: 'Kanto',
    order: 61,
    image: '/backgrounds/cerulean-cave.avif',
    description: 'A secret cave that only the most powerful of trainers may enter.',
    music: '/music/cerulean-cave.m4a',
  },
  'Digletts Cave': {
    category: 'Digletts Cave',
    region: 'Kanto',
    order: 71,
    image: '/backgrounds/digletts-cave.avif',
    icon: { type: 'pokemon', id: '50' },
    description: 'A small cave with rumours it connects to a secret underground area.',
    music: '/music/cave.m4a',
    unlockRequirements: [{ type: 'task_completed', targetId: 'vermilion-rumours' }],
  },
  'Kanto Underground': {
    category: 'Kanto Underground',
    region: 'Underground',
    order: 10,
    image: '/backgrounds/kanto-underground.avif',
    icon: { type: 'pokemon', id: '95' },
    description:
      'A hidden community of collectors buried much farther beneath Kanto than seems reasonable.',
    music: '/music/kanto-underground.m4a',
    unlockRequirements: [
      {
        type: 'task_completed',
        targetId: 'digletts-cave-secret-knock',
      },
    ],
    completeRequirements: [
      {
        type: 'task_completed',
        targetId: 'kanto-underground-somehow-deeper',
      },
    ],
  },
}
