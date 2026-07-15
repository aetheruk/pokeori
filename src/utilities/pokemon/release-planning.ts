import type { Pokemon } from '@/payload-types'
import type { Reward } from '@/utilities/rewards/reward-logic'
import { calculateReleaseRewards } from '@/utilities/rewards/candy-logic'
import {
  buildReleaseBrokenBallReward,
  buildReleaseMaterialRewards,
} from '@/utilities/artisan/material-drops'
import { getPokemonForm, getPokemonSpecies } from '@/utilities/pokemon/pokedex'
import { getPokemonResearchLevel } from '@/utilities/research/research-levels'

type ReleasePokemon = Pick<
  Pokemon,
  | 'locked'
  | 'onBattleTeam'
  | 'partner'
  | 'isCompanion'
  | 'level'
  | 'speciesId'
  | 'formId'
  | 'heldItemId'
  | 'fusionItemId'
  | 'fusedWithPokemonId'
  | 'fusedIntoPokemonId'
>

export function getPokemonReleaseBlockMessage(
  pokemon: Pick<
    ReleasePokemon,
    | 'locked'
    | 'onBattleTeam'
    | 'partner'
    | 'isCompanion'
    | 'fusedWithPokemonId'
    | 'fusedIntoPokemonId'
  >,
): string | null {
  if (pokemon.locked) return 'Cannot release a locked Pokemon!'
  if (pokemon.onBattleTeam)
    return 'Cannot release a Pokemon in your battle team!'
  if (pokemon.partner || pokemon.isCompanion)
    return 'Cannot release a Partner Pokemon!'
  if (pokemon.fusedWithPokemonId || pokemon.fusedIntoPokemonId) {
    return 'Separate fused Pokemon before releasing them.'
  }
  return null
}

export function buildPokemonReleaseRewards({
  pokemon,
  pokedex,
  researchingLevel,
}: {
  pokemon: ReleasePokemon
  pokedex: Record<string, any>
  researchingLevel: number
}): Reward[] {
  const pokemonLevel = pokemon.level || 1
  const formData =
    getPokemonForm(pokemon.formId) || getPokemonSpecies(pokemon.speciesId)
  const researchLevel = getPokemonResearchLevel(
    pokedex,
    pokemon.speciesId,
    pokemon.formId,
  )
  const rewards: Reward[] = []

  if (pokemon.heldItemId) {
    rewards.push({
      type: 'item',
      targetId: pokemon.heldItemId,
      quantity: 1,
      dropChance: 100,
    })
  }

  const { itemId } = calculateReleaseRewards(pokemonLevel)
  rewards.push({
    type: 'item',
    targetId: itemId,
    quantity: 1,
    dropChance: 80,
  })

  rewards.push(buildReleaseBrokenBallReward({ level: pokemonLevel }))

  if (researchLevel >= 2) {
    rewards.push(
      ...buildReleaseMaterialRewards({
        speciesId: pokemon.speciesId,
        formId: pokemon.formId,
        level: pokemonLevel,
        types: formData?.types || [],
        researchingLevel,
      }),
    )
  }

  return rewards
}
