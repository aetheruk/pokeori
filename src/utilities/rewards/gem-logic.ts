import { BattleConfig, LocationReward } from '@/data/types'

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
  battleConfig: BattleConfig,
  pokemonTypes: string[],
): LocationReward[] {
  // Only for random encounters
  if (!battleConfig.isWildBattle) {
    return []
  }

  const rewards: LocationReward[] = []

  // Randomly select one type from the Pokemon's types
  if (!pokemonTypes || pokemonTypes.length === 0) return []
  const selectedType = pokemonTypes[Math.floor(Math.random() * pokemonTypes.length)].toLowerCase()

  const gems = TypeToGemMap[selectedType]
  if (!gems) return []

  const gemCount = 1

  rewards.push({
    type: 'item',
    targetId: gems.base,
    quantity: { min: gemCount, max: gemCount },
    dropChance: 100,
  })

  return rewards
}
