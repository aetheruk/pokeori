import type { TerrainType } from '@/data/terrain'
import type { MoveConfig } from '@/data/moves'
import type { StatusEffectId } from '@/data/moves/types'
import type { BattlePokemon, BattleState } from './types'
import { getEffectiveBattleTypes } from './tera'

const PRIORITY_MOVE_IDS = new Set([
  'accelerock',
  'aqua-jet',
  'bullet-punch',
  'extreme-speed',
  'fake-out',
  'feint',
  'first-impression',
  'ice-shard',
  'jet-punch',
  'mach-punch',
  'quick-attack',
  'shadow-sneak',
  'sucker-punch',
  'upper-hand',
  'vacuum-wave',
  'water-shuriken',
])

const MISTY_TERRAIN_BLOCKED_STATUSES = new Set<StatusEffectId>([
  'bad-poison',
  'burn',
  'freeze',
  'frostbite',
  'paralysis',
  'poison',
  'sleep',
])

function normalizeType(type: string): string {
  return type.toLowerCase()
}

export function isPokemonGroundedForTerrain(pokemon: BattlePokemon): boolean {
  if (pokemon.currentHp <= 0) return false
  if (
    getEffectiveBattleTypes(pokemon).some(
      (type) => type.toLowerCase() === 'flying',
    )
  ) {
    return false
  }
  return pokemon.ability !== 'levitate'
}

export function getTerrainAttackMultiplier(params: {
  attackType: string
  terrain?: TerrainType
  attacker: BattlePokemon
  defender: BattlePokemon
}): number {
  const normalizedAttackType = normalizeType(params.attackType)
  if (
    params.terrain === 'electric' &&
    normalizedAttackType === 'electric' &&
    isPokemonGroundedForTerrain(params.attacker)
  ) {
    return 1.3
  }
  if (
    params.terrain === 'grassy' &&
    normalizedAttackType === 'grass' &&
    isPokemonGroundedForTerrain(params.attacker)
  ) {
    return 1.3
  }
  if (
    params.terrain === 'psychic' &&
    normalizedAttackType === 'psychic' &&
    isPokemonGroundedForTerrain(params.attacker)
  ) {
    return 1.3
  }
  if (
    params.terrain === 'misty' &&
    normalizedAttackType === 'dragon' &&
    isPokemonGroundedForTerrain(params.defender)
  ) {
    return 0.5
  }
  return 1
}

export function blocksStatusByTerrain(params: {
  pokemon: BattlePokemon
  statusId: StatusEffectId
  terrain?: TerrainType
}): boolean {
  if (!params.terrain || !isPokemonGroundedForTerrain(params.pokemon)) {
    return false
  }
  if (params.terrain === 'electric') return params.statusId === 'sleep'
  if (params.terrain === 'misty') {
    return MISTY_TERRAIN_BLOCKED_STATUSES.has(params.statusId)
  }
  return false
}

export function getTerrainMoveBlockMessage(params: {
  terrain?: TerrainType
  move: Pick<MoveConfig, 'id' | 'name'> | undefined
  defender: BattlePokemon
}): string | undefined {
  if (
    params.terrain !== 'psychic' ||
    !params.move ||
    !PRIORITY_MOVE_IDS.has(params.move.id) ||
    !isPokemonGroundedForTerrain(params.defender)
  ) {
    return undefined
  }
  return getTerrainPriorityBlockMessage(params)
}

export function getTerrainPriorityBlockMessage(params: {
  terrain?: TerrainType
  move: Pick<MoveConfig, 'name'> | undefined
  defender: BattlePokemon
}): string | undefined {
  if (
    params.terrain !== 'psychic' ||
    !params.move ||
    !isPokemonGroundedForTerrain(params.defender)
  ) {
    return undefined
  }
  return `Psychic Terrain blocked ${params.move.name}!`
}

export function processTerrainTurnEffects(state: BattleState): string[] {
  if (state.terrain?.terrain !== 'grassy') return []

  const messages: string[] = []
  const activePokemon = [
    { pokemon: state.playerTeam[state.activePlayerIndex], ownerName: state.playerName },
    { pokemon: state.enemyTeam[state.activeEnemyIndex], ownerName: state.enemyName },
  ]

  for (const { pokemon, ownerName } of activePokemon) {
    if (
      !pokemon ||
      pokemon.currentHp <= 0 ||
      pokemon.currentHp >= pokemon.maxHp ||
      !isPokemonGroundedForTerrain(pokemon)
    ) {
      continue
    }
    const healing = Math.max(1, Math.floor(pokemon.maxHp / 16))
    const beforeHp = pokemon.currentHp
    pokemon.currentHp = Math.min(pokemon.maxHp, pokemon.currentHp + healing)
    const actualHealing = pokemon.currentHp - beforeHp
    if (actualHealing > 0) {
      messages.push(
        `${ownerName}'s ${pokemon.name} restored HP from Grassy Terrain! [icon:heal:${actualHealing}]`,
      )
    }
  }

  return messages
}
