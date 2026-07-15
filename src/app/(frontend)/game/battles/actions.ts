'use server'

import type { BattleState, BattleStance } from '@/utilities/battle/types'
import type { User } from '@/payload-types'

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
import { handleWin as processWin } from './helpers/win-handler'
import { finalizeTurn as processFinalize } from './helpers/turn-finalization'

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

// --- Main Actions ---

export async function getUser() {
  return fetchUser()
}

export async function getActiveBattleState(user: User) {
  return fetchState(user)
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

export async function startVsSeekerBattle(): Promise<{
  success: boolean
  error?: string
  redirect?: string
}> {
  const user = await fetchUser()
  if (!user) return { success: false, error: 'Not authenticated' }
  return startVsSeekerPveBattle(user)
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
): Promise<{
  success: boolean
  error?: string
  state?: BattleState
  message?: string
}> {
  return useItem(itemId, clientActionId)
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

// Internal helpers potentially used by UI or other actions
export async function handleWin(
  state: BattleState,
  user: User,
  battleConfig: any,
) {
  return processWin(state, user, battleConfig)
}

export async function finalizeTurn(
  state: BattleState,
  userId: string,
  user: User,
) {
  return processFinalize(state, userId, user)
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

export async function useZMove(clientActionId?: string) {
  return submitTurn('power', 'power:z-move', clientActionId)
}

// Additional Exported Actions

export async function getBattlePowers(formId: string) {
  return fetchPowers(formId)
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
    fetchPowers(moveFormId),
    fetchMoves(
      moveTypes,
      moveFormId,
      moveLevel,
      activeMon?.assignedMoves ?? [],
    ),
  ])
  return { powers, moves }
}

export async function useVictoryPower(itemId: string, clientActionId?: string) {
  return useVictory(itemId, clientActionId)
}

export async function useWeatherPower(
  battleId: string,
  weather: string,
  clientActionId?: string,
) {
  return useWeather(battleId, weather, clientActionId)
}

export async function useShout(stance: BattleStance, clientActionId?: string) {
  return useShoutPower(stance, clientActionId)
}

export async function useCircadian(battleId: string, clientActionId?: string) {
  return useCircadianPower(battleId, clientActionId)
}
