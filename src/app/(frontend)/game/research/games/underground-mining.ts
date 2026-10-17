'use server'

import {
  getGameActivityStateForUser,
  getUser,
} from '@/app/(frontend)/game/_shared/activity-actions'
import { allGames } from '@/data/games'
import type {
  UndergroundMiningSettings,
  UndergroundMiningTool,
} from '@/data/games/underground-mining/types'
import {
  applyUndergroundMiningStrike,
  type UndergroundMiningPublicRound,
} from '@/utilities/research/underground-mining'
import {
  acquireActionLock,
  checkActionRateLimit,
  getIdempotentResult,
  releaseActionLock,
} from '@/utilities/game-integrity'
import { validateResearchEncounterId } from '@/utilities/research/input-validation'
import { redis } from '@/utilities/redis'

export type UndergroundMiningStrikeResponse =
  | { success: true; round: UndergroundMiningPublicRound }
  | { success: false; error: string }

interface MiningStrikeInput {
  encounterId: string
  startTime: number
  revision: number
  x: number
  y: number
  tool: UndergroundMiningTool
}

export async function submitUndergroundMiningStrike(
  input: MiningStrikeInput,
): Promise<UndergroundMiningStrikeResponse> {
  const user = await getUser()
  if (!user) return { success: false, error: 'Not authenticated' }
  if (
    !input ||
    !validateResearchEncounterId(input.encounterId).success ||
    !Number.isSafeInteger(input.startTime) ||
    !Number.isSafeInteger(input.revision) ||
    input.revision < 0
  ) {
    return { success: false, error: 'Invalid mining session' }
  }
  if (
    !Number.isSafeInteger(input.x) ||
    !Number.isSafeInteger(input.y) ||
    (input.tool !== 'pickaxe' && input.tool !== 'hammer')
  ) {
    return { success: false, error: 'Invalid mining strike' }
  }

  const receiptKey = `underground-mining:strike:${user.id}:${input.encounterId}:${input.startTime}:${input.revision}`
  const existing =
    await getIdempotentResult<UndergroundMiningStrikeResponse>(receiptKey)
  if (existing) return existing
  if (
    !(await checkActionRateLimit(user.id, 'underground-mining-action', 120, 60))
      .allowed
  ) {
    return { success: false, error: 'Too many mining actions. Please wait.' }
  }
  const lock = await acquireActionLock(`lock:game:settle:${user.id}`, 60)
  if (!lock.acquired)
    return { success: false, error: 'Game action already in progress' }

  try {
    const repeated =
      await getIdempotentResult<UndergroundMiningStrikeResponse>(receiptKey)
    if (repeated) return repeated
    const state = await getGameActivityStateForUser(user.id, 'game')
    if (
      !state ||
      state.encounterId !== input.encounterId ||
      state.startTime !== input.startTime ||
      state.expiry <= Date.now()
    ) {
      return {
        success: false,
        error: 'Mining session expired. Reopen the game.',
      }
    }
    const encounter =
      state.eventConfigSnapshot ||
      allGames.find((game) => game.id === state.encounterId)
    if (
      encounter?.gameType !== 'underground-mining' ||
      state.roundData?.kind !== 'underground-mining' ||
      state.undergroundMiningPrivate?.kind !== 'underground-mining-private'
    ) {
      return { success: false, error: 'Invalid mining session' }
    }
    if (
      input.revision !== state.roundData.revision ||
      input.revision !== state.undergroundMiningPrivate.revision
    ) {
      return {
        success: false,
        error: 'Mining state is out of date. Reopen this wall to resume.',
      }
    }

    const settings = encounter.settings as UndergroundMiningSettings
    const result = applyUndergroundMiningStrike(
      settings,
      state.roundData,
      state.undergroundMiningPrivate,
      { x: input.x, y: input.y, tool: input.tool },
    )
    if (!result.success) return result
    const previous = structuredClone(state)
    state.roundData = result.publicRound
    state.undergroundMiningPrivate = result.privateRound
    const response: UndergroundMiningStrikeResponse = {
      success: true,
      round: result.publicRound,
    }
    const saved = await redis.setManyIfValue(`game:${user.id}`, previous, [
      {
        key: `game:${user.id}`,
        value: state,
        ttlSeconds: Math.max(
          120,
          Math.ceil((state.expiry - Date.now()) / 1000) + 120,
        ),
      },
      { key: receiptKey, value: response, ttlSeconds: 3600 },
    ])
    return saved
      ? response
      : {
          success: false,
          error: 'The mining wall changed while saving. Retry the action.',
        }
  } catch (error) {
    console.error('Error updating underground mining wall:', error)
    return { success: false, error: 'Unable to save this mining action' }
  } finally {
    await releaseActionLock(lock)
  }
}
