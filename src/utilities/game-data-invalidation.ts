import { GAME_DATA_SCOPE_KEYS, type GameDataScope } from './game-data-scopes'
import type { GameDataKeys } from './requirements/analysis'
import type { RequirementData } from './requirements'

export function isAffectedGameScope(key: unknown, invalidates?: GameDataKeys[]) {
  if (typeof key !== 'string' || !key.startsWith('/api/game/sync?')) return false
  if (!invalidates) return true
  const scope = new URLSearchParams(key.split('?')[1]).get('scope') as GameDataScope
  const domains = GAME_DATA_SCOPE_KEYS[scope]
  if (!domains) return false
  return invalidates.some((domain) => domains.includes(domain) ||
    // Every scope derives story chrome even if it does not fetch full tasks.
    domain === 'storyState' || domain === 'completedTasks')
}

/** Propagate common account fields without pretending another scope was fully
 * refreshed. Its snapshotAt and collection domains retain their own freshness. */
export function mergeRefreshedAccount(
  cached: RequirementData | undefined,
  refreshed: RequirementData,
): RequirementData | undefined {
  if (!cached || cached.user.id !== refreshed.user.id) return cached
  const oldTime = Date.parse(cached.user.updatedAt)
  const newTime = Date.parse(refreshed.user.updatedAt)
  if (Number.isFinite(oldTime) && (!Number.isFinite(newTime) || oldTime > newTime)) return cached
  return { ...cached, user: refreshed.user, currency: refreshed.currency }
}
