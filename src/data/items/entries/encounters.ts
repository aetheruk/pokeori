import { Item } from '../types'

const ENCOUNTER_TYPES = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
] as const

const LURE_TIERS = [
  { prefix: '', label: '', skillLevel: 10 },
  { prefix: 'advanced-', label: 'Advanced ', skillLevel: 40 },
  { prefix: 'master-', label: 'Master ', skillLevel: 70 },
] as const

export const encounterItems: Item[] = []

ENCOUNTER_TYPES.forEach((type) => {
  const typeName = type.charAt(0).toUpperCase() + type.slice(1)

  LURE_TIERS.forEach((tier) => {
    encounterItems.push({
      id: `${tier.prefix}${type}-lure`,
      name: `${tier.label}${typeName} Lure`,
      description: `Catch Rate+ for ${typeName}-type Pokemon.`,
      category: 'misc',
      spriteId: `${type}-gem`,
      unique: false,
      skillRequirements: { researching: tier.skillLevel },
    })
  })
})

encounterItems.push({
  id: 'escape-rope',
  name: 'Escape Rope',
  description: 'Use to immediately escape from a wild encounter.',
  category: 'misc',
  spriteId: 'escape-rope',
  unique: false,
  skillRequirements: { catching: 1 },
})

encounterItems.push({
  id: 'repel',
  name: 'Repel',
  description: 'A spray-type item that keeps weak pokemon away',
  category: 'misc',
  spriteId: 'repel',
  unique: false,
  skillRequirements: { catching: 20 },
})

encounterItems.push({
  id: 'super-repel',
  name: 'Super Repel',
  description: 'A stronger spray-type item that guarantees weak pokemon wont bother you',
  category: 'misc',
  spriteId: 'super-repel',
  unique: false,
  skillRequirements: { catching: 40 },
})

encounterItems.push({
  id: 'max-repel',
  name: 'Max Repel',
  description: 'A powerful spray-type item that keeps common pokemon away.',
  category: 'misc',
  spriteId: 'max-repel',
  unique: false,
  skillRequirements: { catching: 75 },
})

encounterItems.push({
  id: 'chaos-stone',
  name: 'Chaos Stone',
  description: 'Causes a chaotic effect when attempting to catch Pokemon',
  category: 'misc',
  spriteId: 'everstone',
  unique: false,
  skillRequirements: { catching: 40 },
})

encounterItems.push({
  id: 'mt-moon-expedition-map',
  name: 'Mt. Moon Expedition Map',
  description:
    'A hand-drawn map, with some ominous instructions written on it. It looks like it has been written on the back of a reciept...',
  category: 'misc',
  spriteId: 'guide-book',
  hueRotate: 80,
  unique: false,
})

encounterItems.push({
  id: 'day-care-fence-wood',
  name: 'Sturdy Fence',
  description: 'A sturdy fence panel crafted for repairing the Route 5 Day Care yard.',
  category: 'misc',
  spriteId: 'fence',
  unique: false,
})

encounterItems.push({
  id: 'day-care-clay-brick',
  name: 'Kiln-Fired Brick',
  description: 'A dense clay brick fired in the Route 5 Day Care kiln.',
  category: 'misc',
  spriteId: 'brick',
  unique: false,
})

encounterItems.push({
  id: 'hiker-boots',
  name: 'Sturdy Hiking Boots',
  description: 'Tough boots with soles made for loose stones and steep passes.',
  category: 'misc',
  spriteId: 'hiker-boots',
  unique: false,
})

encounterItems.push({
  id: 'hiker-clothes',
  name: 'Trail Clothes',
  description: 'Warm, practical clothes fitted for windy mountain paths.',
  category: 'misc',
  spriteId: 'hiker-clothes',
  unique: false,
})

encounterItems.push({
  id: 'hiker-gloves',
  name: 'Climbing Gloves',
  description: 'Reinforced gloves for gripping cold rock and rough trail ropes.',
  category: 'misc',
  spriteId: 'hiker-gloves',
  unique: false,
})

encounterItems.push({
  id: 'tiny-bug-armour',
  name: 'Tiny Bug Armour',
  description: 'A tiny fitted armour plate made for a member of the swarm.',
  category: 'misc',
  spriteId: 'auspicious-armor',
  hueRotate: 95,
  unique: false,
})

encounterItems.push({
  id: 'sweet-flower',
  name: 'Sweet Flower',
  description: 'A fragrant flower that Grass-type Pokemon seem especially good at finding.',
  category: 'misc',
  spriteId: 'sweet-flower',
  unique: false,
})
