import { randomInt, randomUUID } from 'node:crypto'
import { redis } from '@/utilities/redis'

/**
 * PVP Logic
 * Handles Matchmaking, Lobbies, and Queueing via Redis.
 */

// Keys
const LOBBY_PREFIX = 'pvp:lobby:'
const QUEUE_KEY = 'pvp:queue:'
const QUEUE_MEMBER_PREFIX = 'pvp:queue-member:'
const BATTLE_PREFIX = 'pvp:battle:'

// TTLs
const LOBBY_TTL = 3600 // 1 hour
const MATCH_TTL = 3600 // 1 hour
const FRIENDLY_CODE_PATTERN = /^\d{6}$/

export interface PvpLobby {
  code: string
  configId: string
  hostUserId: string
  guestUserId?: string
  status: 'waiting' | 'starting' | 'active'
  battleId?: string // Shared battle ID once started
}

export interface QueueEntry {
  userId: string
  configId: string // We queue per config ID for now
  timestamp: number
}

// --- Friendly Lobby Logic ---

export async function createFriendlyLobby(
  configId: string,
  userId: string,
): Promise<{ success: boolean; code?: string; error?: string }> {
  if (!configId.trim()) return { success: false, error: 'Invalid battle configuration' }

  const code = randomInt(100000, 1000000).toString()

  const lobby: PvpLobby = {
    code,
    configId,
    hostUserId: userId,
    status: 'waiting',
  }

  // Store lobby
  const key = `${LOBBY_PREFIX}${code}`
  // Check collision just in case
  const existing = await redis.get(key)
  if (existing) {
    return createFriendlyLobby(configId, userId) // Retry
  }

  await redis.set(key, lobby, { ex: LOBBY_TTL })

  // Also map user to lobby for easy lookup? Not strictly necessary if we return code.
  return { success: true, code }
}

export async function joinFriendlyLobby(
  code: string,
  userId: string,
): Promise<{ success: boolean; battleId?: string; error?: string }> {
  if (!FRIENDLY_CODE_PATTERN.test(code)) {
    return { success: false, error: 'Invalid lobby code' }
  }

  const key = `${LOBBY_PREFIX}${code}`
  const lobby = await redis.get<PvpLobby>(key)

  if (!lobby) {
    return { success: false, error: 'Lobby not found' }
  }

  // Helper to check if current battle is stale
  const isBattleStale = async (battleId?: string) => {
    if (!battleId) return true
    const state = await redis.get<{ status: string }>(`${BATTLE_PREFIX}${battleId}`)
    return !state || state.status === 'won' || state.status === 'lost'
  }

  if (lobby.hostUserId === userId) {
    // Re-joining own lobby?
    if (lobby.status === 'active' && lobby.battleId) {
      const stale = await isBattleStale(lobby.battleId)
      if (!stale) {
        // Re-set status for host if needed
        await redis.set(
          `pvp:status:${userId}`,
          { status: 'battle', battleId: lobby.battleId },
          { ex: MATCH_TTL },
        )
        return { success: true, battleId: lobby.battleId }
      }
      // If stale, we fall through to create new battle (if guest exists) or wait
    }
    // If we are host and just checking in, and battle is stale, but guest exists:
    if (lobby.guestUserId) {
      // Auto-rematch mechanism?
      // If guest is there, we can start new battle.
      const newBattleId = `pvp_${code}_${randomUUID()}`
      lobby.battleId = newBattleId
      lobby.status = 'active'

      // Save Match Data
      await redis.set(
        `pvp:match:${newBattleId}`,
        { player1: userId, player2: lobby.guestUserId, configId: lobby.configId },
        { ex: MATCH_TTL },
      )
      // Set Status
      await redis.set(
        `pvp:status:${userId}`,
        { status: 'battle', battleId: newBattleId },
        { ex: MATCH_TTL },
      )
      await redis.set(
        `pvp:status:${lobby.guestUserId}`,
        { status: 'battle', battleId: newBattleId },
        { ex: MATCH_TTL },
      )

      await redis.set(key, lobby, { ex: LOBBY_TTL })
      return { success: true, battleId: newBattleId }
    }

    return { success: false, error: 'You are the host, wait for guest.' }
  }

  if (lobby.guestUserId && lobby.guestUserId !== userId) {
    return { success: false, error: 'Lobby is full' }
  }

  // Join logic (Guest)
  lobby.guestUserId = userId

  // Check if existing battle is valid (re-join)
  if (lobby.battleId) {
    const stale = await isBattleStale(lobby.battleId)
    if (!stale && lobby.status === 'active') {
      // Re-set status just in case
      await redis.set(
        `pvp:status:${userId}`,
        { status: 'battle', battleId: lobby.battleId },
        { ex: MATCH_TTL },
      )
      return { success: true, battleId: lobby.battleId }
    }
    // If stale, start new
  }

  lobby.status = 'starting'

  // Create Shared Battle ID
  const battleId = `pvp_${code}_${randomUUID()}`
  lobby.battleId = battleId
  lobby.status = 'active'

  // Save Match Data (Required for actions.ts to init battle)
  await redis.set(
    `pvp:match:${battleId}`,
    { player1: lobby.hostUserId, player2: userId, configId: lobby.configId },
    { ex: MATCH_TTL },
  )

  // Set Status for BOTH players
  await redis.set(
    `pvp:status:${lobby.hostUserId}`,
    { status: 'battle', battleId },
    { ex: MATCH_TTL },
  )
  await redis.set(`pvp:status:${userId}`, { status: 'battle', battleId }, { ex: MATCH_TTL })

  await redis.set(key, lobby, { ex: LOBBY_TTL })

  return { success: true, battleId }
}

export async function getLobbyStatus(code: string): Promise<PvpLobby | null> {
  if (!FRIENDLY_CODE_PATTERN.test(code)) return null

  return await redis.get<PvpLobby>(`${LOBBY_PREFIX}${code}`)
}

// --- Ranked Queue Logic ---

function getQueueMemberKey(configId: string, userId: string): string {
  return `${QUEUE_MEMBER_PREFIX}${configId}:${userId}`
}

async function popValidQueuedUser(configId: string): Promise<string | null> {
  const queueKey = `${QUEUE_KEY}${configId}`

  while (true) {
    const candidate = (await redis.lpop(queueKey)) as string | null
    if (!candidate) return null

    const memberKey = getQueueMemberKey(configId, candidate)
    const isQueued = await redis.get<string>(memberKey)

    if (!isQueued) {
      // Stale queue entry (timed out or already matched). Skip it.
      continue
    }

    await redis.del(memberKey)
    return candidate
  }
}

export async function joinRankedQueue(
  configId: string,
  userId: string,
): Promise<{ success: boolean; status: 'queued' | 'matched'; battleId?: string; error?: string }> {
  if (!configId.trim()) {
    return { success: false, status: 'queued', error: 'Invalid battle configuration' }
  }

  const queueKey = `${QUEUE_KEY}${configId}`
  const memberKey = getQueueMemberKey(configId, userId)

  const alreadyQueued = await redis.get<string>(memberKey)
  if (alreadyQueued) {
    await redis.set(`pvp:status:${userId}`, { status: 'queued', configId }, { ex: 300 })
    return { success: true, status: 'queued' }
  }

  // Check if anyone is waiting
  const waitingUser = await popValidQueuedUser(configId)

  if (waitingUser && waitingUser !== userId) {
    // MATCH FOUND!
    const battleId = `pvp_ranked_${randomUUID()}`

    // Set match data for both users
    // We need a way for the waiting user to know they matched.
    // We can store a direct key "pvp:status:userId" -> battleId

    // Store match details for initialization
    await redis.set(
      `pvp:match:${battleId}`,
      { player1: waitingUser, player2: userId, configId },
      { ex: MATCH_TTL },
    )

    await redis.set(`pvp:status:${userId}`, { status: 'matched', battleId }, { ex: MATCH_TTL })
    await redis.set(`pvp:status:${waitingUser}`, { status: 'matched', battleId }, { ex: MATCH_TTL })

    // In case this user had an old queued marker from a race, clear it.
    await redis.del(memberKey)

    return { success: true, status: 'matched', battleId }
  } else if (waitingUser === userId) {
    // User was already at head of queue (re-join?), push back
    await redis.rpush(queueKey, userId)
    await redis.set(memberKey, '1', { ex: 300 })
    await redis.set(`pvp:status:${userId}`, { status: 'queued', configId }, { ex: 300 })
    return { success: true, status: 'queued' }
  }

  // No one waiting, add to queue
  await redis.rpush(queueKey, userId)
  await redis.set(memberKey, '1', { ex: 300 })
  // Set status
  await redis.set(`pvp:status:${userId}`, { status: 'queued', configId }, { ex: 300 }) // 5 min timeout

  return { success: true, status: 'queued' }
}

export async function leaveRankedQueue(
  configId: string,
  userId: string,
): Promise<{ success: boolean; error?: string }> {
  if (!configId.trim()) return { success: false, error: 'Invalid battle configuration' }

  await redis.del(getQueueMemberKey(configId, userId))

  const statusKey = `pvp:status:${userId}`
  const status = await redis.get<{ status: string; configId?: string }>(statusKey)
  if (status?.status === 'queued' && status.configId === configId) {
    await redis.del(statusKey)
  }

  return { success: true }
}

export async function checkPvpStatus(
  userId: string,
): Promise<{ status: string; battleId?: string }> {
  const data = await redis.get<{ status: string; battleId?: string }>(`pvp:status:${userId}`)
  if (!data) return { status: 'idle' }
  return data
}
