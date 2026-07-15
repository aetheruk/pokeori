import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { BattlePokemon, BattleState } from '@/utilities/battle/types'
import type { BattleSide } from '@/utilities/battle/item-use-limits'

function getPersistentPokemonId(pokemon: BattlePokemon | undefined): string | null {
  if (!pokemon?.id || pokemon.id.startsWith('enemy-')) return null
  if (pokemon.id.startsWith('chronicle:')) return null
  if (!pokemon.user || pokemon.user === 'enemy') return null
  return pokemon.id
}

export function recordPokemonKO(
  state: BattleState,
  faintedSide: BattleSide,
): void {
  if (state.chronicle) return

  const damage = state.moveHistory?.damage
  if (!damage) return

  const faintedIndex =
    faintedSide === 'player' ? state.activePlayerIndex : state.activeEnemyIndex
  const faintedTeam =
    faintedSide === 'player' ? state.playerTeam : state.enemyTeam
  const faintedPokemon = faintedTeam[faintedIndex]
  const damageEntry =
    (faintedPokemon?.id
      ? damage.lastTakenByPokemon?.[faintedPokemon.id]
      : undefined) ?? damage.lastTakenBySide?.[faintedSide]

  if (!damageEntry || damageEntry.targetSide !== faintedSide) return

  const sourceSide = damageEntry.sourceSide
  const sourceTeam = sourceSide === 'player' ? state.playerTeam : state.enemyTeam
  const sourcePokemon = sourceTeam.find(
    (pokemon) => pokemon.id === damageEntry.sourcePokemonId,
  )
  const pokemonId = getPersistentPokemonId(sourcePokemon)
  if (!pokemonId) return

  state.pokemonBattleKOs ??= {}
  state.pokemonBattleKOs[pokemonId] =
    (state.pokemonBattleKOs[pokemonId] ?? 0) + 1
}

export async function persistPokemonBattleKOs(
  state: BattleState,
): Promise<void> {
  if (state.chronicle || state.pokemonBattleKOsPersisted) return

  const entries = Object.entries(state.pokemonBattleKOs ?? {}).filter(
    ([, count]) => count > 0,
  )
  if (entries.length === 0) return

  const payload = await getPayload({ config: configPromise })
  await Promise.all(
    entries.map(async ([pokemonId, count]) => {
      const pokemon = await payload.findByID({
        collection: 'pokemon',
        id: pokemonId,
        depth: 0,
      })
      const currentKOs =
        typeof pokemon.battleKOs === 'number' ? pokemon.battleKOs : 0

      await payload.update({
        collection: 'pokemon',
        id: pokemonId,
        data: {
          battleKOs: currentKOs + count,
        },
        depth: 0,
      })
    }),
  )

  state.pokemonBattleKOs = undefined
  state.pokemonBattleKOsPersisted = true
}
