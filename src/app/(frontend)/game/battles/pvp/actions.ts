'use server'

import {
  createFriendlyLobby as logicCreate,
  joinFriendlyLobby as logicJoin,
  getLobbyStatus as logicGetStatus,
  closeFriendlyLobby as logicCloseLobby,
  joinRankedQueue as logicQueue,
  leaveRankedQueue as logicLeaveQueue,
  checkPvpStatus as logicCheck,
} from '@/utilities/battle/pvp-logic'
import { getUser } from '../helpers/user'
import { redis } from '@/utilities/redis'
import { KID_MODE_ACCESS_ERROR } from '@/utilities/kid-mode'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

function kidModeBlocked(user: Awaited<ReturnType<typeof getUser>>) {
  return user?.kidMode === true
}

export async function createFriendlyLobby(configId: string, _userId?: string) {
  const user = await getUser({ fresh: true })
  if (!user) return { success: false, error: 'Not authenticated' }
  if (kidModeBlocked(user)) {
    return { success: false, error: KID_MODE_ACCESS_ERROR }
  }

  return await logicCreate(configId, user.id)
}

export async function joinFriendlyLobby(code: string, _userId?: string) {
  const user = await getUser({ fresh: true })
  if (!user) return { success: false, error: 'Not authenticated' }
  if (kidModeBlocked(user)) {
    return { success: false, error: KID_MODE_ACCESS_ERROR }
  }

  const lobby = await logicGetStatus(code)
  if (lobby) {
    const payload = await getPayload({ config: configPromise })
    const host = await payload
      .findByID({
        collection: 'users',
        id: lobby.hostUserId,
        depth: 0,
        select: { kidMode: true },
      })
      .catch(() => null)
    if (host?.kidMode === true) {
      await logicCloseLobby(code)
      return { success: false, error: 'This lobby is no longer available.' }
    }
  }

  return await logicJoin(code, user.id)
}

export async function getLobbyStatus(code: string) {
  const user = await getUser({ fresh: true })
  if (!user) return null
  if (kidModeBlocked(user)) return null

  const lobby = await logicGetStatus(code)
  if (!lobby) return null
  if (lobby.hostUserId !== user.id && lobby.guestUserId !== user.id) return null

  const participantIds = [
    lobby.hostUserId,
    ...(lobby.guestUserId ? [lobby.guestUserId] : []),
  ]
  const payload = await getPayload({ config: configPromise })
  const participants = await Promise.all(
    participantIds.map((id) =>
      payload
        .findByID({
          collection: 'users',
          id,
          depth: 0,
          select: { kidMode: true },
        })
        .catch(() => null),
    ),
  )
  if (
    participants.some(
      (participant) => !participant || participant.kidMode === true,
    )
  ) {
    await logicCloseLobby(code)
    return null
  }

  return lobby
}

export async function joinRankedQueue(configId: string, _userId?: string) {
  const user = await getUser({ fresh: true })
  if (!user) return { success: false, status: 'queued' as const, error: 'Not authenticated' }
  if (kidModeBlocked(user)) {
    return {
      success: false,
      status: 'queued' as const,
      error: KID_MODE_ACCESS_ERROR,
    }
  }

  const payload = await getPayload({ config: configPromise })
  return await logicQueue(configId, user.id, async (candidateId) => {
    const candidate = await payload
      .findByID({
        collection: 'users',
        id: candidateId,
        depth: 0,
        select: { kidMode: true },
      })
      .catch(() => null)
    return Boolean(candidate && candidate.kidMode !== true)
  })
}

export async function leaveRankedQueue(configId: string, _userId?: string) {
  const user = await getUser({ fresh: true })
  if (!user) return { success: false, error: 'Not authenticated' }

  return await logicLeaveQueue(configId, user.id)
}

export async function checkPvpStatus(_userId?: string) {
  const user = await getUser({ fresh: true })
  if (!user) return { status: 'idle', error: 'Not authenticated' }
  if (kidModeBlocked(user)) {
    const status = await logicCheck(user.id)
    if (status.configId) {
      await logicLeaveQueue(status.configId, user.id)
    }
    await redis.del(`pvp:status:${user.id}`)
    return { status: 'idle', error: KID_MODE_ACCESS_ERROR }
  }

  return await logicCheck(user.id)
}
