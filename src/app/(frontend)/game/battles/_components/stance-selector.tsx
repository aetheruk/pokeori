'use client'

import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { STANCE_ICON_CONFIG } from '@/components/game/shared/stance-icon'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getStatStageMultiplier } from '@/utilities/battle/battle-logic'
import type { BattleStance } from '@/utilities/battle/types'

interface StanceSelectorProps {
  onSelect: (stance: BattleStance) => void
  disabled?: boolean
  stats: {
    attack: number
    defense: number
    speed: number
    specialAttack: number
    specialDefense: number
  }
  statStages?: {
    attack: number
    defense: number
    speed: number
    specialAttack: number
    specialDefense: number
  } // Can be partial or full StatStages
  zMoveReady?: boolean
  disabledStance?: BattleStance
  pendingStance?: BattleStance
}

export function StanceSelector({
  onSelect,
  disabled,
  stats,
  statStages,
  zMoveReady,
  disabledStance,
  pendingStance,
}: StanceSelectorProps) {
  const [feedback, setFeedback] = useState<{
    stance: BattleStance
    sequence: number
  } | null>(null)

  useEffect(() => {
    if (!feedback) return
    const timer = window.setTimeout(() => setFeedback(null), 600)
    return () => window.clearTimeout(timer)
  }, [feedback])

  const getMult = (stage?: number) => getStatStageMultiplier(stage || 0)

  // Show only the relevant offensive stat for each stance
  const powerVal = Math.floor(stats.attack * getMult(statStages?.attack))
  const speedVal = Math.floor(stats.speed * getMult(statStages?.speed))
  const techVal = Math.floor(
    stats.specialAttack * getMult(statStages?.specialAttack),
  )

  const stanceCards: Array<{
    stance: BattleStance
    label: string
    statLabel: string
    beats: string
    value: number
    icon: typeof STANCE_ICON_CONFIG.power.Icon
  }> = [
    {
      stance: 'speed',
      label: 'Speed',
      statLabel: 'Speed',
      beats: 'Power',
      value: speedVal,
      icon: STANCE_ICON_CONFIG.speed.Icon,
    },
    {
      stance: 'power',
      label: 'Power',
      statLabel: 'Attack',
      beats: 'Tech',
      value: powerVal,
      icon: STANCE_ICON_CONFIG.power.Icon,
    },
    {
      stance: 'tech',
      label: 'Tech',
      statLabel: 'Sp. Atk',
      beats: 'Speed',
      value: techVal,
      icon: STANCE_ICON_CONFIG.tech.Icon,
    },
  ]

  return (
    <div className="mx-auto grid w-full max-w-2xl grid-cols-3 gap-2 sm:gap-3">
      {stanceCards.map((card) => {
        const Icon = card.icon
        const isZReady = !!zMoveReady
        const isStanceDisabled = disabledStance === card.stance
        const isPending = pendingStance === card.stance
        const isFeedback = feedback?.stance === card.stance

        return (
          <Button
            key={card.stance}
            type="button"
            variant="outline"
            data-stance={card.stance}
            data-pending={isPending || undefined}
            data-z-ready={isZReady || undefined}
            className={cn(
              'game-battle-stance relative block h-auto min-w-0 rounded-[10px] border px-2.5 pt-2.5 pb-0 text-left sm:px-3 sm:pt-3',
              (isPending || isFeedback) && !isStanceDisabled && 'disabled:opacity-100',
            )}
            onClick={() => {
              setFeedback((previous) => ({
                stance: card.stance,
                sequence: (previous?.sequence ?? 0) + 1,
              }))
              onSelect(card.stance)
            }}
            disabled={disabled || isStanceDisabled}
            aria-label={
              isStanceDisabled
                ? `${card.label} stance disabled`
                : `${card.label} ${isZReady ? 'Z-Move' : `attack, ${card.statLabel} ${card.value}`}. Beats ${card.beats}`
            }
            aria-busy={isPending}
          >
            <span className="game-battle-stance-name flex items-center justify-between gap-1 text-sm font-extrabold sm:text-base">
              {card.label}
              <span
                key={isFeedback ? feedback.sequence : 'idle'}
                aria-hidden
                className="game-battle-stance-icon relative inline-flex size-6 shrink-0 items-center justify-center sm:size-7"
                data-feedback={isFeedback || undefined}
              >
                <Icon className="relative z-10 size-6 sm:size-7 [&_*]:stroke-[1.7]" />
              </span>
            </span>
            <span className="mt-2 mb-3 block">
              <span className={cn(
                'block font-mono leading-none font-bold tracking-tight text-game-ink sm:text-3xl',
                card.value >= 1000 ? 'text-2xl' : 'text-[1.75rem]',
              )}>
                {isZReady ? 'Z' : card.value.toLocaleString()}
              </span>
              <span className="mt-1 block text-[11px] leading-tight font-medium text-game-muted">
                {isZReady ? 'Z-Move ready' : card.statLabel}
              </span>
            </span>
            <span className="game-battle-stance-hint flex min-h-8 items-center gap-1 border-t py-1.5 text-[11px] leading-tight font-medium text-game-muted">
              {isStanceDisabled ? (
                'Disabled'
              ) : isPending ? (
                <>
                  <Loader2 aria-hidden className="size-3 animate-spin motion-reduce:animate-none" />
                  <span role="status">Attacking…</span>
                </>
              ) : (
                <>Beats <strong className="font-bold">{card.beats}</strong></>
              )}
            </span>
          </Button>
        )
      })}
    </div>
  )
}
