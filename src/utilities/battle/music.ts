import type { BattleConfig } from '@/data/types'
import { subCategories } from '@/data/sub-region-map'

export const ROCKET_BATTLE_MUSIC = '/music/rocket-battle.m4a'

type BattleMusicConfig = Pick<BattleConfig, 'music' | 'subCategory'> &
  Partial<
    Pick<BattleConfig, 'trainerClassId' | 'trainerName' | 'name' | 'title' | 'icon'>
  >

function isRocketBattle(config: BattleMusicConfig): boolean {
  const trainerClassId = config.trainerClassId?.toLowerCase() ?? ''
  const labels = [
    config.trainerName,
    config.name,
    config.title,
    config.icon?.type === 'trainer' ? config.icon.id : undefined,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    trainerClassId.includes('rocket') ||
    trainerClassId.includes('giovanni') ||
    /\bteam\s+rocket\b|\brocket\b/i.test(labels)
  )
}

export function resolveBattleMusic(config: BattleMusicConfig): string {
  if (isRocketBattle(config)) return ROCKET_BATTLE_MUSIC

  return (
    config.music ||
    (config.subCategory ? subCategories[config.subCategory]?.music : undefined) ||
    '/music/battle.m4a'
  )
}
