import type { Evolution } from './evolutions/types'

export const LEVEL_EVOLUTION_CATALYSTS = [
  {
    id: 'evolution-catalyst',
    name: 'Evolution Catalyst',
    description: 'A crafted crystal focus that channels energy for low-level transformations.',
    minEvolutionLevel: 0,
    maxEvolutionLevel: 20,
    artisanLevel: 5,
    crystalCost: 25,
    powderId: 'poke-powder-xs',
    powderCost: 10,
  },
  {
    id: 'evolution-catalyst-plus',
    name: 'Evolution Catalyst+',
    description: 'A stronger crafted focus of crystal energy for a mid-level Pokémon evolution.',
    minEvolutionLevel: 21,
    maxEvolutionLevel: 40,
    artisanLevel: 20,
    crystalCost: 300,
    powderId: 'poke-powder-s',
    powderCost: 25,
  },
  {
    id: 'evolution-catalyst-ex',
    name: 'Evolution Catalyst EX',
    description: 'A dense, powerful evolution focus for a high-level Pokémon evolution.',
    minEvolutionLevel: 41,
    maxEvolutionLevel: Number.POSITIVE_INFINITY,
    artisanLevel: 40,
    crystalCost: 500,
    powderId: 'poke-powder-m',
    powderCost: 50,
  },
] as const

export type LevelEvolutionCatalyst = (typeof LEVEL_EVOLUTION_CATALYSTS)[number]

export function getLevelEvolutionCatalystForEvolution(
  evolution: Evolution,
): LevelEvolutionCatalyst | null {
  if (evolution.trigger !== 'level-up') return null

  const conditionKeys = Object.keys(evolution.conditions)
  const isLevelOnly = conditionKeys.every(
    (key) => key === 'minLevel' || key === 'requiredSourceForm',
  )
  const evolutionLevel = evolution.conditions.minLevel

  if (!isLevelOnly || typeof evolutionLevel !== 'number') return null

  return (
    LEVEL_EVOLUTION_CATALYSTS.find(
      (catalyst) =>
        evolutionLevel >= catalyst.minEvolutionLevel &&
        evolutionLevel <= catalyst.maxEvolutionLevel,
    ) || null
  )
}
