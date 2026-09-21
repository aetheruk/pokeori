'use server'

import type { BattleState, BattleStance } from '@/utilities/battle/types'
import type { DoublesAction } from '@/utilities/battle/doubles'

// Module Imports
import { startBattle as startPveBattle } from './pve/start-battle'
import { startVsSeekerBattle as startVsSeekerPveBattle } from './pve/vs-seeker'
import { submitPveTurn } from './pve/submit-turn'
import { submitPvpTurn } from './pvp/submit-turn'
import { useBattleItem as useItem } from './actions/item-usage'
import { swapPokemon as swap } from './actions/pokemon-swap'
import { getBattleInventory as getInventory } from './actions/inventory'
import { getUser as fetchUser } from './helpers/user'
import { getActiveBattleState as fetchState } from './helpers/state-management'

// Additional Actions from Refactor
import { getBattlePowers as fetchPowers } from './powers/powers-data'
import {
  surrenderBattle as surrender,
  clearBattleState as clearState,
} from './actions/surrender'
import {
  useBasicAttack as executeBasicAttack,
  useMove as executeMove,
} from './actions/use-move'
import { getAvailableMoves as fetchMoves } from './actions/moves'
import { useVictoryPower as useVictory } from './powers/victory'
import { useWeatherPower as useWeather } from './powers/weather'
import { useShout as useShoutPower } from './powers/shouts'
import { useCircadian as useCircadianPower } from './powers/circadian'
import {
  needsPlayerLeadSelection,
  needsPlayerReplacement,
} from '@/utilities/battle/switching'
import { createBattleTurnTimer } from './helpers/timing'
import { runBattleActionWithGuard } from './helpers/action-guard'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { redis } from '@/utilities/redis'
import { getUserInventoryMap } from '@/utilities/user-state'
import { getSkillLevel } from '@/utilities/skills/unlocks'
import { validateCommonPowerRequirements } from '@/utilities/battle/action-validation'
import { activateZMoveCharge } from '@/utilities/battle/z-move'
import { spendPowerCharge } from '@/utilities/battle/power-charges'
import { BATTLE_TTL, PVP_BATTLE_PREFIX, PVP_TURN_PREFIX } from './helpers/state-management'
import { ensurePvpPowerStates, getSharedBattleUserIds, toPerspectivePvpState } from './pvp/state-utils'
import { getDoublesPokemon } from '@/utilities/battle/doubles-state'
import {
  submitDoublesActions as submitDoublesActionsImpl,
  replaceDoublesPokemon as replaceDoublesPokemonImpl,
} from './actions/doubles'

// --- Main Actions ---

export async function submitDoublesActions(
  actions: DoublesAction[],
  clientActionId?: string,
) {
  return submitDoublesActionsImpl(actions, clientActionId)
}

export async function replaceDoublesPokemon(
  slot: 0 | 1,
  pokemonIndex: number,
  clientActionId?: string,
) {
  return replaceDoublesPokemonImpl(slot, pokemonIndex, clientActionId)
}

export async function getUser() {
  return fetchUser()
}

export async function clearBattleState() {
  return clearState()
}

export async function startBattle(
  battleId: string,
  consumedPokemonIds?: string[],
): Promise<{ success: boolean; error?: string; state?: BattleState }> {
  return startPveBattle(battleId, consumedPokemonIds)
}

export async function startVsSeekerBattle(
  requestedLevel?: number,
  requestedDifficulty?: number,
): Promise<{
  success: boolean
  error?: string
  redirect?: string
}> {
  const user = await fetchUser()
  if (!user) return { success: false, error: 'Not authenticated' }
  return startVsSeekerPveBattle(user, requestedLevel, requestedDifficulty)
}

export async function submitTurn(
  stance: BattleStance,
  attackType?: string,
  clientActionId?: string,
): Promise<{
  success: boolean
  error?: string
  state?: BattleState
  waiting?: boolean
}> {
  if (!attackType?.startsWith('power:')) {
    return executeBasicAttack(stance, attackType, clientActionId)
  }

  const timer = createBattleTurnTimer('submitTurn', {
    stance,
    hasAttackType: Boolean(attackType),
    isPower: attackType?.startsWith('power:') ?? false,
  })
  let result:
    | {
        success: boolean
        error?: string
        state?: BattleState
        waiting?: boolean
      }
    | undefined

  try {
    const user = await timer.time('fetchUser', fetchUser)
    if (!user) {
      result = { success: false, error: 'Not authenticated' }
      return result
    }

    result = await runBattleActionWithGuard(
      user.id,
      clientActionId,
      async () => {
        const state = await timer.time('fetchState', () => fetchState(user))
        if (!state) {
          return { success: false, error: 'No active battle' }
        }
        if (state.status !== 'ongoing') {
          return { success: false, error: 'Battle has ended' }
        }
        if (needsPlayerLeadSelection(state)) {
          return {
            success: false,
            error: 'Choose which Pokemon to send out first',
            state,
          }
        }
        if (needsPlayerReplacement(state)) {
          return {
            success: false,
            error: 'Choose your next Pokemon before taking another action',
            state,
          }
        }
        if (state.playerMoveLock) {
          return {
            success: false,
            error: 'Finish the current move before choosing another action',
            state,
          }
        }

        if (state.isPvp) {
          return await timer.time('submitPvpTurn', () =>
            submitPvpTurn(user, state, stance, attackType),
          )
        }

        return await timer.time('submitPveTurn', () =>
          submitPveTurn(user, state, stance, attackType),
        )
      },
    )
    return result
  } finally {
    timer.done({
      success: result?.success,
      waiting: result?.waiting,
      hasState: Boolean(result?.state),
      error: result?.error,
    })
  }
}

export async function useBattleItem(
  itemId: string,
  clientActionId?: string,
  targetPokemonIndex?: number,
): Promise<{
  success: boolean
  error?: string
  state?: BattleState
  message?: string
}> {
  return useItem(itemId, clientActionId, targetPokemonIndex)
}

export async function swapPokemon(
  newIndex: number,
  clientActionId?: string,
): Promise<{
  success: boolean
  error?: string
  state?: BattleState
  message?: string
  waiting?: boolean
}> {
  return swap(newIndex, clientActionId)
}

export async function getBattleInventory() {
  return getInventory()
}

export async function getBattleState(): Promise<BattleState | null> {
  const user = await fetchUser()
  if (!user) return null
  return fetchState(user)
}

// Power Actions (Proxies to submitTurn)

export async function useTeraOrb(clientActionId?: string) {
  return submitTurn('power', 'power:tera', clientActionId)
}

export async function useMegaEvolution(
  megaFormId: string,
  clientActionId?: string,
) {
  return submitTurn('power', `power:mega:${megaFormId}`, clientActionId)
}

export async function useDynamax(formId?: string, clientActionId?: string) {
  return submitTurn(
    'power',
    `power:dynamax${formId ? `:${formId}` : ''}`,
    clientActionId,
  )
}

export async function useZMove(clientActionId?: string, slot?: 0 | 1) {
  const user = await fetchUser()
  if (!user) return { success: false, error: 'Not authenticated' }
  return runBattleActionWithGuard(user.id, clientActionId, async () => {
    const perspective = await fetchState(user)
    if (perspective?.status !== 'ongoing') return { success: false, error: 'No active battle' }
    if (needsPlayerLeadSelection(perspective) || needsPlayerReplacement(perspective)) return { success: false, error: 'Choose your Pokémon first' }
    if (perspective.playerMoveLock) return { success: false, error: 'Finish the current move first' }
    if (perspective.format === 'double' && slot === undefined) return { success: false, error: 'Choose a Pokémon lane' }
    if (perspective.format !== 'double' && slot !== undefined) return { success: false, error: 'Invalid Pokémon lane' }
    const battleId = perspective.pvpBattleId
    const key = battleId ? `${PVP_BATTLE_PREFIX}${battleId}` : `battle:${user.id}`
    const state = battleId ? await redis.get<BattleState>(key) : perspective
    if (state?.status !== 'ongoing') return { success: false, error: 'Battle changed; try again' }
    if (battleId && await redis.get(`${PVP_TURN_PREFIX}${battleId}:${state.turn}:${user.id}`)) return { success: false, error: 'Your turn is already queued' }
    const before = structuredClone(state)
    const { p1Id, p2Id } = battleId ? getSharedBattleUserIds(state) : { p1Id: user.id, p2Id: null }
    const side = user.id === p1Id ? 'player' : user.id === p2Id ? 'enemy' : null
    if (!side) return { success: false, error: 'Not in this battle' }
    const powers = battleId ? ensurePvpPowerStates(state)[user.id] : state.powers
    const pokemon = state.format === 'double'
      ? getDoublesPokemon(state, side, slot!)
      : side === 'player' ? state.playerTeam[state.activePlayerIndex] : state.enemyTeam[state.activeEnemyIndex]
    if (!powers || !pokemon || pokemon.currentHp <= 0) return { success: false, error: 'No active Pokémon' }
    const payload = await getPayload({ config: configPromise })
    const inventory = await getUserInventoryMap(payload as any, user.id)
    const error = validateCommonPowerRequirements({ command: { kind: 'z-move' }, inventory, pokemon, powers, trainerLevel: getSkillLevel(user.skills, 'battling') })
    if (error) return { success: false, error }
    if (!activateZMoveCharge(pokemon)) return { success: false, error: 'Z-Move is already prepared' }
    spendPowerCharge(powers)
    powers.zMoveUsesRemaining -= 1
    powers.zMoveUsed = powers.zMoveUsesRemaining <= 0
    if (battleId) {
      const saved = await redis.setManyIfValue(key, before, [{ key, value: state, ttlSeconds: BATTLE_TTL }])
      if (!saved) return { success: false, error: 'Battle changed; try again' }
      return { success: true, state: toPerspectivePvpState(state, user.id, battleId) }
    }
    await redis.set(key, state, { ex: BATTLE_TTL })
    return { success: true, state }
  })
}

// Additional Exported Actions

export async function getBattlePowers(formId: string, slot?:0|1) {
  return fetchPowers(formId,slot===undefined?undefined:{slot})
}

export async function surrenderBattle() {
  return surrender()
}

export async function useMove(
  moveId: string,
  selectedType?: string,
  clientActionId?: string,
) {
  return executeMove(moveId, selectedType, clientActionId)
}

export async function getAvailableMoves(
  types: string[],
  formId: string,
  level: number,
) {
  return fetchMoves(types, formId, level)
}

export async function getBattlePanelData(
  types: string[],
  formId: string,
  level: number,
) {
  const user = await fetchUser()
  const state = user ? await fetchState(user) : null
  const activeMon = state?.playerTeam?.[state.activePlayerIndex]
  const moveTypes = activeMon?.types || types
  const moveFormId = activeMon?.formId || formId
  const moveLevel = activeMon?.level || level

  const [powers, moves] = await Promise.all([
    user && state
      ? fetchPowers(moveFormId, { user, state })
      : fetchPowers(moveFormId),
    fetchMoves(
      moveTypes,
      moveFormId,
      moveLevel,
      activeMon?.assignedMoves ?? [],
      user ? { user, state } : undefined,
    ),
  ])
  return { powers, moves }
}

export async function useVictoryPower(itemId: string, clientActionId?: string) {
  return useVictory(itemId, clientActionId)
}

export async function useWeatherPower(
  battleId: string,
  clientActionId?: string,
) {
  return useWeather(battleId, clientActionId)
}

export async function useShout(clientActionId?: string) {
  return useShoutPower(clientActionId)
}

export async function useCircadian(battleId: string, clientActionId?: string) {
  return useCircadianPower(battleId, clientActionId)
}
