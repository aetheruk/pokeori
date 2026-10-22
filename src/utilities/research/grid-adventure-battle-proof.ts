import 'server-only'

import { allGames } from '@/data/games'
import { getGameActivitySessionKey } from '@/utilities/games/activity-domain'
import { redis } from '@/utilities/redis'
import { hasRockPushActivityTarget } from './rock-push-verification'

type GridAdventureProofSession = {
  encounterId: string
  expiry: number
  eventConfigSnapshot?: (typeof allGames)[number]
  roundData?: {
    kind?: string
    chronicleBattleWins?: Record<string, string[]>
    [key: string]: unknown
  }
}

/**
 * Chronicle battle wins intentionally do not update ordinary battle activity
 * stats. Preserve a server-side receipt while a matching Grid Adventure is
 * active so its completion proof can still validate the battle interaction.
 */
export async function recordGridAdventureChronicleBattleWin(
  userId: string,
  battleId: string,
  settlementId: string,
) {
  const sessionKey = getGameActivitySessionKey(userId, 'grid-adventure')

  for (let attempt = 0; attempt < 3; attempt++) {
    const session = await redis.get<GridAdventureProofSession>(sessionKey)
    if (!session || session.expiry <= Date.now()) return

    const encounter = session.eventConfigSnapshot || allGames.find(
      (entry) => entry.id === session.encounterId,
    )
    if (
      encounter?.gameType !== 'grid-puzzle' ||
      encounter.settings.variant !== 'rock-push' ||
      session.roundData?.kind !== 'rock-push' ||
      !hasRockPushActivityTarget(
        encounter.settings as any,
        'battle',
        battleId,
      )
    ) {
      return
    }

    const targetKey = `battle:${battleId}`
    const existingReceipts = session.roundData.chronicleBattleWins?.[targetKey] || []
    if (existingReceipts.includes(settlementId)) return

    const nextSession: GridAdventureProofSession = {
      ...session,
      roundData: {
        ...session.roundData,
        chronicleBattleWins: {
          ...session.roundData.chronicleBattleWins,
          [targetKey]: [...existingReceipts, settlementId],
        },
      },
    }
    const ttlSeconds = Math.max(
      60,
      Math.ceil((session.expiry - Date.now()) / 1000) + 120,
    )
    const saved = await redis.setManyIfValue(sessionKey, session, [
      { key: sessionKey, value: nextSession, ttlSeconds },
    ])
    if (saved) return
  }
}
