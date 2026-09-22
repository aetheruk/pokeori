import { getPayload, type Payload } from 'payload'
import configPromise from '@payload-config'
import type { BattlePokemon, BattleState } from '@/utilities/battle/types'
import { calculateStats } from '@/utilities/pokemon/pokemon-mechanics'
import {
  addPokemonEvs,
  getEmptyPokemonEvs,
  normalizePokemonEvs,
  POKEMON_EV_STATS,
  type PokemonEvBlock,
} from '@/utilities/pokemon/evs'
import { getPokemonForm, getPokemonSpecies } from '@/utilities/pokemon/pokedex'
import {
  getInvolvedPlayerPokemon,
} from '@/utilities/battle/participants'
import { getPersistentPokemonId } from '@/utilities/battle/pokemon-metrics'

function getEnemyEvYield(pokemon: BattlePokemon): PokemonEvBlock {
  const sourceFormId =
    pokemon.originalFormId ||
    pokemon.battleAbilityState?.originalTransform?.formId ||
    pokemon.formId
  const form =
    getPokemonForm(sourceFormId) || getPokemonSpecies(pokemon.speciesId)
  return form?.evYield || getEmptyPokemonEvs()
}

function getBattleEvGains(state: BattleState): Map<string, PokemonEvBlock> {
  const gainsByPokemon = new Map<string, PokemonEvBlock>()
  const totalYield = getEmptyPokemonEvs()

  for (const enemy of state.enemyTeam) {
    const yieldForEnemy = getEnemyEvYield(enemy)
    for (const stat of Object.keys(totalYield) as (keyof PokemonEvBlock)[]) {
      totalYield[stat] += yieldForEnemy[stat]
    }
  }

  if (Object.values(totalYield).every((value) => value <= 0)) {
    return gainsByPokemon
  }

  for (const pokemon of getInvolvedPlayerPokemon(state)) {
    const pokemonId = getPersistentPokemonId(pokemon)
    if (!pokemonId) continue
    gainsByPokemon.set(pokemonId, { ...totalYield })
  }

  return gainsByPokemon
}

/**
 * Persist hidden battle EV gains in the same economy transaction as the
 * battle result. PVP, chronicle, losses, and already-settled battles do not
 * award EVs.
 */
export async function persistPokemonBattleEvs(
  state: BattleState,
  transactionPayload?: Payload,
): Promise<void> {
  if (
    state.chronicle ||
    state.isPvp ||
    state.status !== 'won' ||
    state.pokemonBattleEvsPersisted
  ) {
    return
  }

  const gainsByPokemon = getBattleEvGains(state)
  if (gainsByPokemon.size === 0) {
    state.pokemonBattleEvsPersisted = true
    return
  }

  const payload = transactionPayload || (await getPayload({ config: configPromise }))
  await Promise.all(
    [...gainsByPokemon.entries()].map(async ([pokemonId, gains]) => {
      const pokemon = await payload.findByID({
        collection: 'pokemon',
        id: pokemonId,
        depth: 0,
      })
      const normalizedCurrentEvs = normalizePokemonEvs(pokemon.evs)
      const { evs, awarded } = addPokemonEvs(normalizedCurrentEvs, gains)
      const hadLegacyOverCapEvs = POKEMON_EV_STATS.some(
        (stat) => Number(pokemon.evs?.[stat] ?? 0) !== normalizedCurrentEvs[stat],
      )
      if (
        Object.values(awarded).every((amount) => amount <= 0) &&
        !hadLegacyOverCapEvs
      ) {
        return
      }

      const stats = calculateStats({
        ...pokemon,
        evs,
        stats: undefined,
      })

      await payload.update({
        collection: 'pokemon',
        id: pokemonId,
        data: {
          evs,
          stats: stats.stats,
        },
        depth: 0,
      })
    }),
  )

  state.pokemonBattleEvsPersisted = true
}
