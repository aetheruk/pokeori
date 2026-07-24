import type { BattleStance, BattleState } from './types'

const BATTLE_ACTION_ENDPOINT = '/api/game/battles/action'

type BattleActionBase = {
  clientActionId: string
}

export type BattleActionRequest =
  | (BattleActionBase & {
      kind: 'stance'
      stance: BattleStance
      attackType: string
    })
  | (BattleActionBase & {
      kind: 'move'
      moveId: string
      selectedType?: string
    })
  | (BattleActionBase & { kind: 'item'; itemId: string })
  | (BattleActionBase & { kind: 'swap'; pokemonIndex: number })
  | (BattleActionBase & { kind: 'tera' })
  | (BattleActionBase & { kind: 'mega'; formId: string })
  | (BattleActionBase & { kind: 'z-move' })
  | (BattleActionBase & { kind: 'dynamax'; formId?: string })
  | (BattleActionBase & { kind: 'victory'; itemId: string })
  | (BattleActionBase & {
      kind: 'weather'
      battleId: string
      weather: string
    })
  | (BattleActionBase & { kind: 'shout'; stance: BattleStance })
  | (BattleActionBase & { kind: 'circadian'; battleId: string })
  | (BattleActionBase & {
      kind: 'dimensional-shift'
      shiftType: 'time' | 'space' | 'chaos'
    })
  | (BattleActionBase & { kind: 'surrender' })

export type BattleActionResponse = {
  success: boolean
  error?: string
  message?: string
  state?: BattleState | null
  waiting?: boolean
}

export async function submitBattleActionRequest(
  action: BattleActionRequest,
): Promise<BattleActionResponse> {
  const response = await fetch(BATTLE_ACTION_ENDPOINT, {
    method: 'POST',
    credentials: 'same-origin',
    cache: 'no-store',
    headers: {
      'content-type': 'application/json',
      'x-pokeori-battle-action': '1',
    },
    body: JSON.stringify(action),
  })

  const result = (await response.json()) as BattleActionResponse
  if (!response.ok) {
    return {
      success: false,
      error: result.error || 'Battle action failed',
    }
  }

  return result
}
