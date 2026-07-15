import { describe, expect, test } from 'bun:test'

import { battles } from '@/data/battles'
import {
  calculateKantoTrainerPayout,
  type KantoTrainerPayoutClass,
} from '@/data/battles/trainer-payouts'
import type { BattleConfig, BattleEnemy } from '@/data/types'

const earlyKantoPayoutSubcategories = new Set([
  'Viridian City',
  'Viridian Forest',
  'Pewter City',
  'Mt. Moon',
  'Cerulean City',
  'Vermilion City',
])

function getEnemyLevel(enemy: BattleEnemy): number | undefined {
  return typeof enemy.level === 'number' ? enemy.level : undefined
}

function getLastPokemonLevel(battle: BattleConfig): number | undefined {
  const lastPokemon = battle.enemyTeam.at(-1)
  return lastPokemon ? getEnemyLevel(lastPokemon) : undefined
}

function inferKantoPayoutClass(battle: BattleConfig): KantoTrainerPayoutClass | undefined {
  const name = battle.name.toLowerCase()

  if (battle.id === 'battle-grumpy-man') return 'gentleman'
  if (battle.id === 'buggy-champion') return 'bug-catcher'
  if (battle.id === 'pewter-gym-jerry') return 'camper'
  if (battle.id === 'cerulean-gym-swimmer') return 'swimmer'
  if (battle.id === 'researcher-miguel') return 'super-nerd'

  if (name.startsWith('beauty ')) return 'beauty'
  if (name.startsWith('bug catcher ')) return 'bug-catcher'
  if (name.startsWith('camper ')) return 'camper'
  if (name.startsWith('engineer ')) return 'engineer'
  if (name.startsWith('fisherman ')) return 'fisherman'
  if (name.startsWith('gamer ')) return 'gamer'
  if (name.startsWith('gentleman ')) return 'gentleman'
  if (name.startsWith('gym leader ')) return 'gym-leader'
  if (name.startsWith('hiker ')) return 'hiker'
  if (name.startsWith('lass ')) return 'lass'
  if (name.startsWith('picnicker ') || name.startsWith('picknicker ')) return 'picnicker'
  if (name.startsWith('pokemaniac ')) return 'pokemaniac'
  if (name.startsWith('rocket ') || name.startsWith('team rocket ')) return 'rocket-grunt'
  if (name.startsWith('sailor ')) return 'sailor'
  if (name.startsWith('super nerd ')) return 'super-nerd'
  if (name.startsWith('swimmer ')) return 'swimmer'
  if (name.startsWith('youngster ')) return 'youngster'

  return undefined
}

describe('trainer payouts', () => {
  test('early Kanto trainer PokeDollar rewards follow the original Kanto payout formula', () => {
    const mismatches: string[] = []

    const earlyTrainerBattles = battles
      .filter((battle) => earlyKantoPayoutSubcategories.has(battle.subCategory ?? ''))
      .filter((battle) => !battle.isWildBattle && !battle.pvp)
      .filter((battle) =>
        battle.rewards.some(
          (reward) => reward.type === 'currency' && reward.targetId === 'pokedollars',
        ),
      )

    for (const battle of earlyTrainerBattles) {
      const reward = battle.rewards.find(
        (entry) => entry.type === 'currency' && entry.targetId === 'pokedollars',
      )
      if (battle.id === 'researcher-miguel') {
        expect(reward?.quantity).toBe(45)
        continue
      }
      const payoutClass = inferKantoPayoutClass(battle)
      const lastPokemonLevel = getLastPokemonLevel(battle)

      if (!reward || typeof reward.quantity !== 'number') {
        mismatches.push(`${battle.id}: missing fixed PokeDollar reward`)
        continue
      }

      if (!payoutClass) {
        mismatches.push(`${battle.id}: missing payout class mapping`)
        continue
      }

      if (!lastPokemonLevel) {
        mismatches.push(`${battle.id}: missing fixed last Pokemon level`)
        continue
      }

      const expected = calculateKantoTrainerPayout(payoutClass, lastPokemonLevel)
      if (reward.quantity !== expected) {
        mismatches.push(`${battle.id}: expected ${expected}, received ${reward.quantity}`)
      }
    }

    expect(mismatches).toEqual([])
  })

  test('Rock Tunnel trainer PokeDollar rewards follow the original Kanto payout formula', () => {
    const mismatches: string[] = []

    const rockTunnelTrainerBattles = battles
      .filter((battle) => battle.subCategory === 'Rock Tunnel')
      .filter((battle) => !battle.isWildBattle && !battle.pvp)
      .filter((battle) =>
        battle.rewards.some(
          (reward) => reward.type === 'currency' && reward.targetId === 'pokedollars',
        ),
      )

    for (const battle of rockTunnelTrainerBattles) {
      const reward = battle.rewards.find(
        (entry) => entry.type === 'currency' && entry.targetId === 'pokedollars',
      )
      const payoutClass = inferKantoPayoutClass(battle)
      const lastPokemonLevel = getLastPokemonLevel(battle)

      if (!reward || typeof reward.quantity !== 'number') {
        mismatches.push(`${battle.id}: missing fixed PokeDollar reward`)
        continue
      }

      if (!payoutClass) {
        mismatches.push(`${battle.id}: missing payout class mapping`)
        continue
      }

      if (!lastPokemonLevel) {
        mismatches.push(`${battle.id}: missing fixed last Pokemon level`)
        continue
      }

      const expected = calculateKantoTrainerPayout(payoutClass, lastPokemonLevel)
      if (reward.quantity !== expected) {
        mismatches.push(`${battle.id}: expected ${expected}, received ${reward.quantity}`)
      }
    }

    expect(mismatches).toEqual([])
  })
})
