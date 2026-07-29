'use client'

import { Package } from 'lucide-react'
import Image from 'next/image'
import { ItemSprite } from '@/components/ui/item-sprite'
import { items } from '@/data/items'
import type { LocationReward } from '@/data/types'
import type { EndlessScoreInterval } from '@/data/games/shared'
import { getPokemonForm, getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import {
  getEndlessScoreIntervalMinimum,
  getNextRandomRepeatingRewardScore,
} from '@/utilities/research/endless-milestones'

export interface EndlessCollectibleRewardConfig {
  key: string
  everyScore: EndlessScoreInterval
  rewardOptions: Array<{
    key: string
    reward: LocationReward
  }>
}

export interface EndlessCollectible {
  id: number
  rewardKey: string
  reward: LocationReward
  x: number
  y: number
  size: number
}

export function getEndlessCollectibleRewardConfigs(
  settings: any,
): EndlessCollectibleRewardConfig[] {
  const repeatingRewards = settings?.endless?.repeatingRewards || []

  return repeatingRewards.flatMap((entry: any, entryIndex: number) => {
    if (
      !entry.random ||
      getEndlessScoreIntervalMinimum(entry.everyScore) === null
    ) {
      return []
    }

    const rewardOptions = (entry.rewards || []).map(
      (reward: LocationReward, rewardIndex: number) => ({
        key: `${entryIndex}:${rewardIndex}`,
        reward,
      }),
    )

    return rewardOptions.length > 0
      ? [{ key: `${entryIndex}`, everyScore: entry.everyScore, rewardOptions }]
      : []
  })
}

export const getNextCollectibleScore = getNextRandomRepeatingRewardScore

export function getCollectibleSize(playerWidth: number, playerHeight: number) {
  const playerBaseSize = Math.max(playerWidth, playerHeight)
  return Math.max(24, Math.min(42, Math.round(playerBaseSize * 0.72)))
}

export function EndlessCollectibleSprite({
  reward,
  size,
}: {
  reward: LocationReward
  size: number
}) {
  if (reward.type === 'item' && reward.targetId) {
    const itemId = String(reward.targetId)
    const item = items.find((candidate) => candidate.id === itemId)

    return (
      <ItemSprite
        itemId={itemId}
        alt={item?.name || itemId}
        width={size}
        height={size}
        className="h-full w-full object-contain drop-shadow-[0_0_8px_rgba(181,138,67,0.65)]"
      />
    )
  }

  if (reward.type === 'pokemon_research_xp' && reward.targetId) {
    const formId = String(reward.targetId)
    const form = getPokemonForm(formId)

    return (
      <Image
        src={getPokemonImageUrl(formId, 'sprite')}
        alt={form?.name || 'Pokemon Research XP'}
        fill
        sizes={`${size}px`}
        className="object-contain pixelated drop-shadow-[0_0_8px_rgba(181,138,67,0.65)]"
      />
    )
  }

  return (
    <Package className="h-full w-full text-game-ochre drop-shadow-[0_0_8px_rgba(181,138,67,0.65)]" />
  )
}
