import { getPayload, type Payload } from 'payload'
import configPromise from '@payload-config'
import type { BattlePokemon, BattleState } from '@/utilities/battle/types'
import type { BattleSide } from '@/utilities/battle/item-use-limits'
import { getBattleDamagePokemonKey } from '@/utilities/battle/move-effects'
import {
  getPersistentPokemonId,
  recordPokemonBattleMetric,
} from '@/utilities/battle/pokemon-metrics'

const PERSISTED_POKEMON_METRICS = new Set([
  'superEffectiveHitsLanded',
  'stanceVictories',
  'stanceLosses',
  'battleKOs',
  'timesKOd',
  'movesUsed',
])

export function recordPokemonKO(
  state: BattleState,
  faintedSide: BattleSide,
): void {
  const faintedIndex=faintedSide==='player'?state.activePlayerIndex:state.activeEnemyIndex
  const faintedTeam=faintedSide==='player'?state.playerTeam:state.enemyTeam
  recordPokemonKOForPokemon(state,faintedSide,faintedTeam[faintedIndex])
}

export function recordPokemonKOForPokemon(state:BattleState,faintedSide:BattleSide,faintedPokemon:BattlePokemon|undefined):void {
  if (state.chronicle) return

  const faintedTeam =
    faintedSide === 'player' ? state.playerTeam : state.enemyTeam
  const faintedIndex = faintedPokemon ? faintedTeam.indexOf(faintedPokemon) : -1
  const faintedIdentity = faintedPokemon?.id ?? `index:${faintedIndex}`
  const faintEventKey = `faint:${state.turn}:${faintedSide}:${faintedIdentity}`
  state.pokemonBattleMetricEvents ??= {}
  if (state.pokemonBattleMetricEvents[faintEventKey]) return
  state.pokemonBattleMetricEvents[faintEventKey] = true
  recordPokemonBattleMetric(state, faintedPokemon, 'timesKOd')

  const damage = state.moveHistory?.damage
  if (!damage) return

  const damageEntry =
    (faintedPokemon
      ? damage.lastTakenByPokemon?.[
          getBattleDamagePokemonKey(state, faintedSide, faintedPokemon) ?? ''
        ]
      : undefined) ?? damage.lastTakenBySide?.[faintedSide]

  if (!damageEntry || damageEntry.targetSide !== faintedSide) return

  const sourceSide = damageEntry.sourceSide
  const sourceTeam = sourceSide === 'player' ? state.playerTeam : state.enemyTeam
  const sourcePokemon = sourceTeam.find(
    (pokemon) => pokemon.id === damageEntry.sourcePokemonId,
  )
  const pokemonId = getPersistentPokemonId(sourcePokemon)
  if (!pokemonId) return

  recordPokemonBattleMetric(state, sourcePokemon, 'battleKOs')
  state.pokemonBattleKOs ??= {}
  state.pokemonBattleKOs[pokemonId] =
    (state.pokemonBattleKOs[pokemonId] ?? 0) + 1
}

export async function persistPokemonBattleKOs(
  state: BattleState,
  transactionPayload?: Payload,
): Promise<void> {
  if (
    state.chronicle ||
    state.pokemonBattleMetricsPersisted ||
    state.pokemonBattleKOsPersisted
  )
    return

  const metrics = structuredClone(state.pokemonBattleMetrics ?? {}) as Record<
    string,
    Record<string, number | undefined>
  >
  for (const [pokemonId, count] of Object.entries(state.pokemonBattleKOs ?? {})) {
    metrics[pokemonId] ??= {}
    // New battles mirror the legacy KO map into the metric bucket. Older
    // serialized battles only have the map, so only backfill when absent.
    if (metrics[pokemonId].battleKOs === undefined) {
      metrics[pokemonId].battleKOs = count
    }
  }
  const entries = Object.entries(metrics).filter(([, counters]) =>
    Object.values(counters).some((count) => typeof count === 'number' && count > 0),
  )
  if (entries.length === 0) return

  const payload = transactionPayload || await getPayload({ config: configPromise })
  await Promise.all(
    entries.map(async ([pokemonId, counters]) => {
      const pokemon = await payload.findByID({
        collection: 'pokemon',
        id: pokemonId,
        depth: 0,
      })
      const data: Record<string, number> = {}
      for (const [metric, count] of Object.entries(counters)) {
        if (
          !PERSISTED_POKEMON_METRICS.has(metric) ||
          typeof count !== 'number' ||
          count <= 0
        )
          continue
        const current = (pokemon as unknown as Record<string, unknown>)[metric]
        data[metric] = (typeof current === 'number' ? current : 0) + count
      }
      if (Object.keys(data).length === 0) return

      await payload.update({
        collection: 'pokemon',
        id: pokemonId,
        data,
        depth: 0,
      })
    }),
  )

  state.pokemonBattleMetrics = undefined
  state.pokemonBattleMetricEvents = undefined
  state.pokemonBattleMetricsPersisted = true
  state.pokemonBattleKOs = undefined
  state.pokemonBattleKOsPersisted = true
}
