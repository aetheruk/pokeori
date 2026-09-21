'use client'

import { Star } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { PokemonRaritySprite } from '@/components/game/shared/PokemonRaritySprite'
import type { PokemonExperienceReward } from '@/utilities/rewards/reward-logic'
import {
  getPokemonExperienceProgress,
  getTotalPokemonExperienceForLevel,
} from '@/utilities/pokemon/experience'
import { cn } from '@/lib/utils'

interface PokemonExperienceRewardListProps {
  entries: PokemonExperienceReward[]
}

function PokemonExperienceRewardRow({
  entry,
}: {
  entry: PokemonExperienceReward
}) {
  const leveledUp = entry.newLevel > entry.oldLevel
  const oldExperience =
    entry.oldExperience ??
    getTotalPokemonExperienceForLevel(entry.growthRate, entry.oldLevel)
  const newExperience = entry.newExperience ?? oldExperience + entry.amount
  const progress = useMemo(
    () =>
      getPokemonExperienceProgress(
        entry.growthRate,
        entry.newLevel,
        newExperience,
        entry.levelCap,
      ),
    [entry.growthRate, entry.levelCap, entry.newLevel, newExperience],
  )
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
        {entry.formId ? (
          <PokemonRaritySprite
            formId={entry.formId}
            view="front"
            rarity={entry.rarity}
            shiny={entry.shiny}
            isShadow={entry.isShadow}
            isRadiant={entry.isRadiant}
            female={entry.female}
            alt={entry.pokemonName}
            className="h-full w-full"
            sizes="48px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-game-ochre">
            <Star className="h-6 w-6" aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="truncate text-sm font-semibold text-game-ink">
            {entry.pokemonName}
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
          aria-label={`${entry.pokemonName} experience progress`}
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
      </div>
    </div>
  )
}

export function PokemonExperienceRewardList({
  entries,
}: PokemonExperienceRewardListProps) {
  if (entries.length === 0) return null

  return (
    <div className="space-y-0">
      {entries.map((entry, index) => (
        <PokemonExperienceRewardRow
          key={`pokemon-experience-${entry.pokemonId}-${index}`}
          entry={entry}
        />
      ))}
    </div>
  )
}
