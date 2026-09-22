'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import {
  getMaxResearchLevelForXp,
  getResearchXpForLevel,
  MAX_RESEARCH_LEVEL,
} from '@/utilities/research/research-levels'
import type { RewardSummary } from '@/utilities/rewards/reward-logic'
import { cn } from '@/lib/utils'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'

type PokemonResearchExperienceReward = NonNullable<
  RewardSummary['researchXp']
>[number]

interface PokemonResearchExperienceRewardListProps {
  entries: PokemonResearchExperienceReward[]
}

function clampResearchLevel(level: number) {
  return Math.max(0, Math.min(MAX_RESEARCH_LEVEL, Math.floor(level)))
}

function getResearchProgress(entry: PokemonResearchExperienceReward) {
  const oldExperience = Math.max(
    0,
    entry.oldExperience ??
      Math.max(0, (entry.newExperience ?? entry.amount) - entry.amount),
  )
  const newExperience = Math.max(
    oldExperience,
    entry.newExperience ?? oldExperience + entry.amount,
  )
  const oldLevel = clampResearchLevel(
    entry.oldLevel ?? getMaxResearchLevelForXp(oldExperience),
  )
  const newLevel = clampResearchLevel(
    entry.newLevel ?? getMaxResearchLevelForXp(newExperience),
  )
  const isComplete = newLevel >= MAX_RESEARCH_LEVEL
  const levelStart = getResearchXpForLevel(newLevel)
  const nextThreshold = isComplete
    ? levelStart
    : getResearchXpForLevel(newLevel + 1)
  const required = isComplete ? 0 : Math.max(1, nextThreshold - levelStart)
  const current = isComplete
    ? newExperience
    : Math.max(0, newExperience - levelStart)

  return {
    oldLevel,
    newLevel,
    percent: isComplete
      ? 100
      : Math.min(100, Math.max(0, (current / required) * 100)),
    current,
    required,
  }
}

function PokemonResearchExperienceRewardRow({
  entry,
}: {
  entry: PokemonResearchExperienceReward
}) {
  const progress = useMemo(() => getResearchProgress(entry), [entry])
  const leveledUp = progress.newLevel > progress.oldLevel
  const [animatedPercent, setAnimatedPercent] = useState(0)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setAnimatedPercent(progress.percent)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [progress.percent])

  return (
    <div className="flex items-center gap-3 border-b border-game-border/75 py-3 last:border-b-0">
      <div className="relative h-12 w-12 shrink-0">
        <Image
          src={getPokemonImageUrl(entry.formId, 'sprite')}
          alt={entry.formName}
          width={48}
          height={48}
          className="h-full w-full object-contain pixelated"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="truncate text-sm font-semibold text-game-ink">
            {entry.formName} Research
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

        <div
          className="mt-1.5 h-2 overflow-hidden rounded-full bg-game-border/40"
          role="progressbar"
          aria-label={`${entry.formName} research experience progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress.percent}
        >
          <div
            className="motion-safe:transition-[width] motion-safe:duration-1000 motion-safe:ease-out h-full rounded-full bg-game-moss"
            style={{ width: `${animatedPercent}%` }}
          />
        </div>

        <div className="mt-1 flex items-center justify-between gap-2 text-[11px] text-game-muted">
          <span>Research Lv {progress.newLevel}</span>
          <span>
            {progress.required === 0
              ? 'Complete'
              : `${progress.current.toLocaleString('en-US')} / ${progress.required.toLocaleString('en-US')} XP`}
          </span>
        </div>
      </div>
    </div>
  )
}

export function PokemonResearchExperienceRewardList({
  entries,
}: PokemonResearchExperienceRewardListProps) {
  if (entries.length === 0) return null

  return (
    <div className="space-y-0">
      {entries.map((entry, index) => (
        <PokemonResearchExperienceRewardRow
          key={`pokemon-research-experience-${entry.formId}-${index}`}
          entry={entry}
        />
      ))}
    </div>
  )
}
