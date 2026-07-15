import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { BattleState } from '@/utilities/battle/types'
import { isBattleUser } from '../pvp/state-utils'
import { getUserInventoryMap } from '@/utilities/user-state'

export async function useDimensionalShift(
  state: BattleState,
  userId: string,
  type: 'time' | 'space' | 'chaos',
): Promise<{ success: boolean; error?: string; state?: BattleState }> {
  // Verify User (PVE or PVP logic: we need to find the user in the team)
  let isPlayer = false
  if (isBattleUser((state.playerTeam[0] as any)?.user, userId)) isPlayer = true
  else if (isBattleUser((state.enemyTeam[0] as any)?.user, userId)) isPlayer = false
  else return { success: false, error: 'User not in battle' }

  // Check Orbs
  const payload = await getPayload({ config: configPromise })
  const inventory = await getUserInventoryMap(payload as any, userId)
  let requiredItem = ''
  let requiredChargeType: 'wins' | 'losses' | 'draws' = 'draws'

  if (type === 'time') {
    requiredItem = 'adamant-orb'
    requiredChargeType = 'losses'
  } else if (type === 'space') {
    requiredItem = 'lustrous-orb'
    requiredChargeType = 'wins'
  } else if (type === 'chaos') {
    requiredItem = 'griseous-orb' // "Chaos"
    requiredChargeType = 'draws'
  }

  if (!inventory[requiredItem]) {
    return { success: false, error: `Missing Key Item: ${requiredItem}` }
  }

  const charges = state.powers?.dimensionalShift.charges || {
    wins: 0,
    losses: 0,
    draws: 0,
  }
  const currentCharge = charges[requiredChargeType]

  if (currentCharge < 3) {
    return {
      success: false,
      error: `Not enough charges! Need 3 ${requiredChargeType}, have ${currentCharge}.`,
    }
  }

  // Deduct Charges
  if (state.powers?.dimensionalShift) {
    state.powers.dimensionalShift.charges[requiredChargeType] = Math.max(0, currentCharge - 3)
  }

  // Apply Effect
  const playerName = isPlayer ? state.playerName : state.enemyName
  let logMessage = `${playerName} activates Dimensional Shift: ${type.toUpperCase()}!`

  if (type === 'time') {
    // Time Rewind: Full HP, No Status
    // Applies to "Both Pokemon"
    const p1Mon = state.playerTeam[state.activePlayerIndex]
    const p2Mon = state.enemyTeam[state.activeEnemyIndex]

    p1Mon.currentHp = p1Mon.maxHp
    p1Mon.status = undefined
    p2Mon.currentHp = p2Mon.maxHp
    p2Mon.status = undefined

    logMessage += `\nTime Rewind! Both Pokemon fully restored to start of battle state!`
  } else if (type === 'space') {
    // Space Lock
    if (state.powers?.dimensionalShift) {
      state.powers.dimensionalShift.activeEffect = {
        type: 'space',
        turnsRemaining: 999, // Permanent
      }
    }
    logMessage += `\nSpace Lock! Moves are constrained!`
  } else if (type === 'chaos') {
    // Chaos Oblivion: Shuffle Stats
    const p1Mon = state.playerTeam[state.activePlayerIndex]
    const p2Mon = state.enemyTeam[state.activeEnemyIndex]

    const allStats = [
      p1Mon.stats.attack,
      p1Mon.stats.defense,
      p1Mon.stats.specialAttack,
      p1Mon.stats.specialDefense,
      p1Mon.stats.speed,
      p2Mon.stats.attack,
      p2Mon.stats.defense,
      p2Mon.stats.specialAttack,
      p2Mon.stats.specialDefense,
      p2Mon.stats.speed,
    ]

    // Fisher-Yates Shuffle
    for (let i = allStats.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[allStats[i], allStats[j]] = [allStats[j], allStats[i]]
    }

    // Assign back
    p1Mon.stats.attack = allStats[0]
    p1Mon.stats.defense = allStats[1]
    p1Mon.stats.specialAttack = allStats[2]
    p1Mon.stats.specialDefense = allStats[3]
    p1Mon.stats.speed = allStats[4]

    p2Mon.stats.attack = allStats[5]
    p2Mon.stats.defense = allStats[6]
    p2Mon.stats.specialAttack = allStats[7]
    p2Mon.stats.specialDefense = allStats[8]
    p2Mon.stats.speed = allStats[9]

    if (state.powers?.dimensionalShift) {
      state.powers.dimensionalShift.activeEffect = {
        type: 'chaos',
        turnsRemaining: 999, // Until switched
      }
    }
    logMessage += `\nChaos Oblivion! Stats have been scattered into the void!`
  }

  // Log
  state.history.unshift({
    turn: state.turn,
    playerStance: 'tech',
    enemyStance: 'tech',
    result: 'tie',
    damageDealt: 0,
    damageTaken: 0,
    message: logMessage,
  })

  // Track Usage
  try {
    const userDoc = await payload.findByID({
      collection: 'users',
      id: userId,
      depth: 0,
    })
    const powerUsage =
      ((userDoc as any).powerUsage as Record<string, number> | undefined) || {}

    await payload.update({
      collection: 'users',
      id: userId,
      data: {
        powerUsage: {
          ...powerUsage,
          dimensionalShiftUses: (powerUsage.dimensionalShiftUses || 0) + 1,
        },
      },
    })
  } catch (e) {
    console.error('Failed to update usage stats', e)
  }

  return { success: true, state }
}
