import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { User } from '@/payload-types'
import { getActiveBattleState } from '../helpers/state-management'
import { startBattleFromConfig } from './start-battle'
import {
  buildVsSeekerBattleConfig,
  formatVsSeekerCooldown,
  getVsSeekerCooldownRemaining,
  hasVsSeeker,
} from '@/utilities/vs-seeker'
import { getUserInventoryMap, getUserPokedexMap, getUserProfileStats } from '@/utilities/user-state'

export async function startVsSeekerBattle(
  user: User,
): Promise<{ success: boolean; error?: string; redirect?: string }> {
  const activeBattle = await getActiveBattleState(user)
  if (activeBattle?.status === 'ongoing') {
    return {
      success: false,
      error: 'Finish your current battle before using the VS Seeker.',
    }
  }

  const payload = await getPayload({ config: configPromise })
  const freshUser = (await payload.findByID({
    collection: 'users',
    id: user.id,
  })) as User

  const stats = getUserProfileStats(freshUser)
  const [inventory, pokedex] = await Promise.all([
    getUserInventoryMap(payload as any, freshUser.id),
    getUserPokedexMap(payload as any, freshUser.id),
  ])
  if (!hasVsSeeker(inventory)) {
    return {
      success: false,
      error: 'You need the VS Seeker before you can find trainer rematches.',
    }
  }

  const vsSeekerStats = stats.vsSeeker || {}
  const cooldownRemaining = getVsSeekerCooldownRemaining(
    vsSeekerStats.lastUsedAt,
  )

  if (cooldownRemaining > 0) {
    return {
      success: false,
      error: `The VS Seeker is recharging. Try again in ${formatVsSeekerCooldown(cooldownRemaining)}.`,
    }
  }

  const battleConfig = buildVsSeekerBattleConfig({
    pokedex,
    inventory,
    now: new Date(),
  })

  if (!battleConfig) {
    return {
      success: false,
      error:
        'You need at least 3 seen Pokemon in your Pokedex before the VS Seeker can find a trainer.',
    }
  }

  const battleResult = await startBattleFromConfig(freshUser, battleConfig, {
    dynamic: true,
  })

  if (!battleResult.success) {
    return {
      success: false,
      error: battleResult.error || 'Failed to start VS Seeker battle.',
    }
  }

  await payload.update({
    collection: 'users',
    id: freshUser.id,
    data: {
      stats: {
        ...stats,
        vsSeeker: {
          ...vsSeekerStats,
          lastUsedAt: new Date().toISOString(),
        },
      },
    },
  })

  return { success: true, redirect: '/game/battles/encounter' }
}
