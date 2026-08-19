import type { LocationReward } from '@/data/types'

export const FIELD_OBSERVATION_GEM_DROP_CHANCE = 35

// Map Pokemon type to Gem IDs
const TypeToGemMap: Record<string, { base: string; shining: string; pristine: string }> = {
  normal: {
    base: 'normal-gem',
    shining: 'shining-normal-gem',
    pristine: 'pristine-normal-gem',
  },
  fire: {
    base: 'fire-gem',
    shining: 'shining-fire-gem',
    pristine: 'pristine-fire-gem',
  },
  water: {
    base: 'water-gem',
    shining: 'shining-water-gem',
    pristine: 'pristine-water-gem',
  },
  electric: {
    base: 'electric-gem',
    shining: 'shining-electric-gem',
    pristine: 'pristine-electric-gem',
  },
  grass: {
    base: 'grass-gem',
    shining: 'shining-grass-gem',
    pristine: 'pristine-grass-gem',
  },
  ice: {
    base: 'ice-gem',
    shining: 'shining-ice-gem',
    pristine: 'pristine-ice-gem',
  },
  fighting: {
    base: 'fighting-gem',
    shining: 'shining-fighting-gem',
    pristine: 'pristine-fighting-gem',
  },
  poison: {
    base: 'poison-gem',
    shining: 'shining-poison-gem',
    pristine: 'pristine-poison-gem',
  },
  ground: {
    base: 'ground-gem',
    shining: 'shining-ground-gem',
    pristine: 'pristine-ground-gem',
  },
  flying: {
    base: 'flying-gem',
    shining: 'shining-flying-gem',
    pristine: 'pristine-flying-gem',
  },
  psychic: {
    base: 'psychic-gem',
    shining: 'shining-psychic-gem',
    pristine: 'pristine-psychic-gem',
  },
  bug: {
    base: 'bug-gem',
    shining: 'shining-bug-gem',
    pristine: 'pristine-bug-gem',
  },
  rock: {
    base: 'rock-gem',
    shining: 'shining-rock-gem',
    pristine: 'pristine-rock-gem',
  },
  ghost: {
    base: 'ghost-gem',
    shining: 'shining-ghost-gem',
    pristine: 'pristine-ghost-gem',
  },
  dragon: {
    base: 'dragon-gem',
    shining: 'shining-dragon-gem',
    pristine: 'pristine-dragon-gem',
  },
  steel: {
    base: 'steel-gem',
    shining: 'shining-steel-gem',
    pristine: 'pristine-steel-gem',
  },
  dark: {
    base: 'dark-gem',
    shining: 'shining-dark-gem',
    pristine: 'pristine-dark-gem',
  },
  fairy: {
    base: 'fairy-gem',
    shining: 'shining-fairy-gem',
    pristine: 'pristine-fairy-gem',
  },
}

export function calculateGemRewards(
  pokemonTypes: string[],
  random: () => number = Math.random,
): LocationReward[] {
  const availableTypes = Array.from(
    new Set(
      (pokemonTypes || [])
        .map((type) => type.toLowerCase())
        .filter((type) => TypeToGemMap[type]),
    ),
  )
  if (availableTypes.length === 0) return []

  const selectedType =
    availableTypes[
      Math.min(
        Math.floor(random() * availableTypes.length),
        availableTypes.length - 1,
      )
    ]

  const gems = TypeToGemMap[selectedType]
  if (!gems) return []

  return [
    {
      type: 'item',
      targetId: gems.base,
      quantity: { min: 1, max: 1 },
      dropChance: 100,
    },
  ]
}
