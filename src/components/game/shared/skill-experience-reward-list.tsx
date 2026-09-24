'use client'

import { Star } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { getSkill, getTotalExpForLevel } from '@/data/skills'
import type { SkillExperienceReward } from '@/utilities/rewards/reward-logic'
import { cn } from '@/lib/utils'
import { ItemSprite } from '../../ui/item-sprite'

interface SkillExperienceRewardListProps {
  entries: SkillExperienceReward[]
}

function SkillExperienceRewardRow({
  entry,
}: {
  entry: SkillExperienceReward
}) {
  const skill = getSkill(entry.skillId)
  const label = skill?.name || 'Experience'
  const iconId = skill?.iconId
  const hasProgress =
    typeof entry.newLevel === 'number' &&
    typeof entry.newExperience === 'number'
  const leveledUp =
    typeof entry.oldLevel === 'number' &&
    typeof entry.newLevel === 'number' &&
    entry.newLevel > entry.oldLevel
  const progress = useMemo(() => {
    if (!hasProgress) return null

    const level = Math.max(1, Math.min(100, entry.newLevel || 1))
    if (level >= 100) return { percent: 100, current: entry.newExperience || 0, required: 0 }

    const levelStart = getTotalExpForLevel(level)
    const nextLevelStart = getTotalExpForLevel(level + 1)
    const span = Math.max(1, nextLevelStart - levelStart)
    const current = Math.max(0, (entry.newExperience || 0) - levelStart)

    return {
      percent: Math.min(100, Math.max(0, (current / span) * 100)),
      current,
      required: span,
    }
  }, [entry.newExperience, entry.newLevel, hasProgress])
  const previousProgress = useMemo(() => {
    if (!hasProgress) return null

    const level = Math.max(1, Math.min(100, entry.oldLevel || 1))
    if (level >= 100) return { percent: 100 }

    const levelStart = getTotalExpForLevel(level)
    const nextLevelStart = getTotalExpForLevel(level + 1)
    const span = Math.max(1, nextLevelStart - levelStart)
    const previousExperience = Math.max(
      0,
      entry.oldExperience ?? (entry.newExperience || 0) - entry.amount,
    )
    const current = Math.max(0, previousExperience - levelStart)

    return {
      percent: Math.min(100, Math.max(0, (current / span) * 100)),
    }
  }, [entry.oldExperience, entry.oldLevel, hasProgress])
  const [animatedPercent, setAnimatedPercent] = useState(
    previousProgress?.percent ?? 0,
  )

  useEffect(() => {
    if (!progress) return
    const frame = window.requestAnimationFrame(() => {
      setAnimatedPercent(progress.percent)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [progress])

  return (
    <div className="flex items-center gap-3 border-b border-game-border/75 py-3 last:border-b-0">
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
        {iconId ? (
          iconId.match(/\.(?:avif|png|webp|jpe?g)$/) ? (
            <Image
              src={`/fallback/skills/${iconId}`}
              alt={label}
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
          ) : (
            <ItemSprite
              itemId={iconId}
              alt={label}
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
          )
        ) : (
          <Star className="h-6 w-6 text-game-ochre" aria-hidden="true" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="truncate text-sm font-semibold text-game-ink">
            {label}
          </span>
          <span
            className={cn(
              'shrink-0 whitespace-nowrap font-mono text-xs font-bold',
              leveledUp ? 'text-game-moss-strong' : 'text-game-ochre',
            )}
          >
            {leveledUp ? 'Level Up' : `+${entry.amount} XP`}
          </span>
        </div>

        {progress ? (
          <>
            <div
              className="mt-1.5 h-2 overflow-hidden rounded-full bg-game-border/40"
              role="progressbar"
              aria-label={`${label} experience progress`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress.percent}
            >
              <div
                className="motion-safe:transition-[width] motion-safe:duration-1000 motion-safe:ease-out h-full rounded-full bg-game-ochre"
                style={{ width: `${animatedPercent}%` }}
              />
            </div>
            <div className="mt-1 flex items-center justify-between gap-2 text-[11px] text-game-muted">
              <span>Lv {entry.newLevel}</span>
              <span>
                {progress.current.toLocaleString('en-US')} /{' '}
                {progress.required.toLocaleString('en-US')} XP
              </span>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

export function SkillExperienceRewardList({
  entries,
}: SkillExperienceRewardListProps) {
  if (entries.length === 0) return null

  return (
    <div className="space-y-0">
      {entries.map((entry, index) => (
        <SkillExperienceRewardRow
          key={`skill-experience-${entry.skillId}-${index}`}
          entry={entry}
        />
      ))}
    </div>
  )
}
