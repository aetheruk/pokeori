import { createInitialPowersState } from '@/data/powers'
import type { BattleState, BattleLogEntry, PowersState } from '@/utilities/battle/types'

type BattleUserRef = string | { id?: string | null } | null | undefined

export function normalizeBattleUserId(userRef: BattleUserRef): string | null {
  if (!userRef) return null
  if (typeof userRef === 'string') return userRef
  if (typeof userRef === 'object' && typeof userRef.id === 'string') return userRef.id
  return null
}

export function isBattleUser(userRef: BattleUserRef, userId: string): boolean {
  return normalizeBattleUserId(userRef) === userId
}

export function getSharedBattleUserIds(state: BattleState): {
  p1Id: string | null
  p2Id: string | null
} {
  const p1Id = normalizeBattleUserId((state.playerTeam[0] as any)?.user)
  const p2Id = normalizeBattleUserId((state.enemyTeam[0] as any)?.user)
  return { p1Id, p2Id }
}

export function clonePowersState(powers: PowersState): PowersState {
  return {
    ...powers,
    dimensionalShift: {
      charges: { ...powers.dimensionalShift.charges },
      activeEffect: powers.dimensionalShift.activeEffect
        ? { ...powers.dimensionalShift.activeEffect }
        : undefined,
    },
  }
}

export function ensurePvpPowerStates(state: BattleState): Record<string, PowersState> {
  const { p1Id, p2Id } = getSharedBattleUserIds(state)
  const fallback = state.powers ? clonePowersState(state.powers) : createInitialPowersState()
  const pvpPowers = state.pvpPowers ? { ...state.pvpPowers } : {}

  if (p1Id && !pvpPowers[p1Id]) pvpPowers[p1Id] = clonePowersState(fallback)
  if (p2Id && !pvpPowers[p2Id]) pvpPowers[p2Id] = clonePowersState(fallback)

  state.pvpPowers = pvpPowers
  if (p1Id) state.powers = pvpPowers[p1Id]

  return pvpPowers
}

export function getPerspectivePowers(state: BattleState, viewerUserId: string): PowersState | undefined {
  if (!state.isPvp && !state.pvpBattleId) return state.powers

  ensurePvpPowerStates(state)
  const powers = state.pvpPowers?.[viewerUserId]
  return powers ? clonePowersState(powers) : state.powers
}

function getPerspectiveConfig(
  state: BattleState,
  viewerUserId: string | null,
): BattleState['config'] {
  if (!viewerUserId) return state.config

  return {
    ...state.config,
    movesPerBattle:
      state.pvpMoveUseLimits?.[viewerUserId] ?? state.config?.movesPerBattle,
    itemsPerBattle:
      state.pvpItemUseLimits?.[viewerUserId] ?? state.config?.itemsPerBattle,
  }
}

export function flipPvpState(state: BattleState, battleId: string): BattleState {
  const p2Id = normalizeBattleUserId((state.enemyTeam[0] as any)?.user)

  return {
    ...state,
    playerTeam: state.enemyTeam,
    enemyTeam: state.playerTeam,
    activePlayerIndex: state.activeEnemyIndex,
    activeEnemyIndex: state.activePlayerIndex,
    playerName: state.enemyName,
    enemyName: state.playerName,
    history: state.history.map((entry: BattleLogEntry) => ({
      ...entry,
      playerStance: entry.enemyStance,
      enemyStance: entry.playerStance,
      damageDealt: entry.damageTaken,
      damageTaken: entry.damageDealt,
      playerAttackType: entry.enemyAttackType,
      enemyAttackType: entry.playerAttackType,
    })),
    itemsUsedThisBattle: [],
    powers: p2Id ? getPerspectivePowers(state, p2Id) : state.powers,
    config: getPerspectiveConfig(state, p2Id),
    isPvp: true,
    pvpBattleId: battleId,
    status:
      state.status === 'won'
        ? 'lost'
        : state.status === 'lost'
          ? 'won'
          : (state.status as 'ongoing' | 'won' | 'lost'),
  }
}

export function toPerspectivePvpState(
  state: BattleState,
  viewerUserId: string,
  battleId: string,
): BattleState {
  const { p1Id, p2Id } = getSharedBattleUserIds(state)

  if (p1Id && viewerUserId === p1Id) {
    return {
      ...state,
      powers: getPerspectivePowers(state, p1Id),
      config: getPerspectiveConfig(state, p1Id),
      isPvp: true,
      pvpBattleId: battleId,
    }
  }

  if (p2Id && viewerUserId === p2Id) {
    return flipPvpState(state, battleId)
  }

  return { ...state, isPvp: true, pvpBattleId: battleId }
}
