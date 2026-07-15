import { getBanner } from '@/data/user/banners'
import { getIcon } from '@/data/user/icons'
import type { TaskIcon } from '@/data/tasks'
import type { RequirementData } from '@/utilities/requirements'
import type { ExploreItem } from './types'

export function isRivalExploreBattle(item: ExploreItem) {
  return item.type === 'battle' && (item.originalData as any).dynamicOpponent === 'rival'
}

const RIVAL_BATTLE_IDS = new Set([
  'rival-pallet-town',
  'rival-route-22',
  'rival-cerulean',
  'rival-ss-anne',
])

export function isRivalOutcomeTask(item: ExploreItem) {
  if (item.type !== 'task') return false

  return (item.requirements || []).some(
    (condition: any) =>
      condition.type === 'battle_result' && RIVAL_BATTLE_IDS.has(condition.targetId),
  )
}

export function getExploreItemIcon(item: ExploreItem, userData: RequirementData): TaskIcon {
  if (!isRivalExploreBattle(item) && !isRivalOutcomeTask(item)) return item.icon

  const rivalIconId = userData.rivalTrainer?.icon
  return (rivalIconId && getIcon(rivalIconId)?.icon) || item.icon
}

export function getExploreItemBackground(item: ExploreItem, userData: RequirementData) {
  if (!isRivalExploreBattle(item)) return item.originalData.background

  const rivalBannerId = userData.rivalTrainer?.banner
  return (rivalBannerId && getBanner(rivalBannerId)?.imagePath) || item.originalData.background
}
