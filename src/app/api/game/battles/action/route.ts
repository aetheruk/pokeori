import { z } from 'zod'
import {
  getBattleState,
  submitTurn,
  surrenderBattle,
  swapPokemon,
  useBattleItem,
  useCircadian,
  useDynamax,
  useMegaEvolution,
  useMove,
  useShout,
  useTeraOrb,
  useVictoryPower,
  useWeatherPower,
  useZMove,
} from '@/app/(frontend)/game/battles/actions'
import {
  createRequestId,
  errorResponse,
  jsonResponse,
} from '@/utilities/api-response'
import { validateBody } from '@/utilities/validators'

export const dynamic = 'force-dynamic'

const clientActionId = z.string().regex(/^[a-zA-Z0-9:_-]{1,120}$/)
const identifier = z.string().min(1).max(120)
const battleStance = z.enum(['power', 'speed', 'tech'])
const baseAction = z.object({ clientActionId })

const BattleActionSchema = z.discriminatedUnion('kind', [
  baseAction.extend({
    kind: z.literal('stance'),
    stance: battleStance,
    attackType: identifier,
  }),
  baseAction.extend({
    kind: z.literal('move'),
    moveId: identifier,
    selectedType: identifier.optional(),
  }),
  baseAction.extend({
    kind: z.literal('item'),
    itemId: identifier,
    pokemonIndex: z.number().int().min(0).max(5).optional(),
  }),
  baseAction.extend({
    kind: z.literal('swap'),
    pokemonIndex: z.number().int().min(0).max(5),
  }),
  baseAction.extend({ kind: z.literal('tera') }),
  baseAction.extend({ kind: z.literal('mega'), formId: identifier }),
  baseAction.extend({ kind: z.literal('z-move') }),
  baseAction.extend({
    kind: z.literal('dynamax'),
    formId: identifier.optional(),
  }),
  baseAction.extend({ kind: z.literal('victory'), itemId: identifier }),
  baseAction.extend({
    kind: z.literal('weather'),
    battleId: identifier,
    weather: identifier,
  }),
  baseAction.extend({ kind: z.literal('shout'), stance: battleStance }),
  baseAction.extend({ kind: z.literal('circadian'), battleId: identifier }),
  baseAction.extend({
    kind: z.literal('dimensional-shift'),
    shiftType: z.enum(['time', 'space', 'chaos']),
  }),
  baseAction.extend({ kind: z.literal('surrender') }),
])

function isTrustedBattleActionRequest(request: Request): boolean {
  if (request.headers.get('x-pokeori-battle-action') !== '1') return false

  const origin = request.headers.get('origin')
  if (!origin) return true

  const forwardedHost = request.headers.get('x-forwarded-host')
  const requestHost = forwardedHost || request.headers.get('host')
  if (!requestHost) return false

  try {
    return new URL(origin).host === requestHost
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  const requestId = createRequestId()
  if (!isTrustedBattleActionRequest(request)) {
    return errorResponse('Invalid battle action origin', 403, requestId)
  }

  let action: z.infer<typeof BattleActionSchema>
  try {
    action = await validateBody(request, BattleActionSchema)
  } catch {
    return errorResponse('Invalid battle action', 400, requestId)
  }

  try {
    let result
    switch (action.kind) {
      case 'stance':
        result = await submitTurn(
          action.stance,
          action.attackType,
          action.clientActionId,
        )
        break
      case 'move':
        result = await useMove(
          action.moveId,
          action.selectedType,
          action.clientActionId,
        )
        break
      case 'item':
        result = await useBattleItem(
          action.itemId,
          action.clientActionId,
          action.pokemonIndex,
        )
        break
      case 'swap':
        result = await swapPokemon(action.pokemonIndex, action.clientActionId)
        break
      case 'tera':
        result = await useTeraOrb(action.clientActionId)
        break
      case 'mega':
        result = await useMegaEvolution(action.formId, action.clientActionId)
        break
      case 'z-move':
        result = await useZMove(action.clientActionId)
        break
      case 'dynamax':
        result = await useDynamax(action.formId, action.clientActionId)
        break
      case 'victory':
        result = await useVictoryPower(action.itemId, action.clientActionId)
        break
      case 'weather':
        result = await useWeatherPower(
          action.battleId,
          action.weather,
          action.clientActionId,
        )
        break
      case 'shout':
        result = await useShout(action.stance, action.clientActionId)
        break
      case 'circadian':
        result = await useCircadian(action.battleId, action.clientActionId)
        break
      case 'dimensional-shift':
        result = await submitTurn(
          'tech',
          `power:dimensional-shift:${action.shiftType}`,
          action.clientActionId,
        )
        break
      case 'surrender': {
        const surrenderResult = await surrenderBattle()
        result = surrenderResult.success
          ? {
              ...surrenderResult,
              state: await getBattleState(),
            }
          : surrenderResult
        break
      }
    }

    return jsonResponse(
      result,
      {
        headers: {
          'cache-control': 'no-store, max-age=0, must-revalidate',
        },
      },
      requestId,
    )
  } catch (error) {
    console.error(`[${requestId}] Battle action failed:`, error)
    return errorResponse('Battle action failed', 500, requestId)
  }
}
