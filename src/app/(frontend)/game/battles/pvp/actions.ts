'use server'

import {
  createFriendlyLobby as logicCreate,
  joinFriendlyLobby as logicJoin,
  getLobbyStatus as logicGetStatus,
  joinRankedQueue as logicQueue,
  leaveRankedQueue as logicLeaveQueue,
  checkPvpStatus as logicCheck,
} from '@/utilities/battle/pvp-logic'
import { getUser } from '../helpers/user'

export async function createFriendlyLobby(configId: string, _userId?: string) {
  const user = await getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  return await logicCreate(configId, user.id)
}

export async function joinFriendlyLobby(code: string, _userId?: string) {
  const user = await getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  return await logicJoin(code, user.id)
}

export async function getLobbyStatus(code: string) {
  const user = await getUser()
  if (!user) return null

  const lobby = await logicGetStatus(code)
  if (!lobby) return null
  if (lobby.hostUserId !== user.id && lobby.guestUserId !== user.id) return null

  return lobby
}

export async function joinRankedQueue(configId: string, _userId?: string) {
  const user = await getUser()
  if (!user) return { success: false, status: 'queued' as const, error: 'Not authenticated' }

  return await logicQueue(configId, user.id)
}

export async function leaveRankedQueue(configId: string, _userId?: string) {
  const user = await getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  return await logicLeaveQueue(configId, user.id)
}

export async function checkPvpStatus(_userId?: string) {
  const user = await getUser()
  if (!user) return { status: 'idle', error: 'Not authenticated' }

  return await logicCheck(user.id)
}
