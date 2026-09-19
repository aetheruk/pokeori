'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { Loader2, Swords } from 'lucide-react'
import { STANCE_ICON_CONFIG } from '@/components/game/shared/stance-icon'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import { getStatStageMultiplier } from '@/utilities/battle/battle-logic'
import type { BattleStance } from '@/utilities/battle/types'
import { BattleActionTrigger } from './battle-action-trigger'

export interface StanceSelectorProps {
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

type StanceSelectorDrawerProps = StanceSelectorProps & {
  triggerIcon?: ReactNode
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
    actionLabel: string
    statLabel: string
    beats: string
    value: number
    icon: typeof STANCE_ICON_CONFIG.power.Icon
  }> = [
    {
      stance: 'speed',
      label: 'Speed',
      actionLabel: 'Quick strike',
      statLabel: 'Speed',
      beats: 'Power',
      value: speedVal,
      icon: STANCE_ICON_CONFIG.speed.Icon,
    },
    {
      stance: 'power',
      label: 'Power',
      actionLabel: 'Heavy hit',
      statLabel: 'Attack',
      beats: 'Tech',
      value: powerVal,
      icon: STANCE_ICON_CONFIG.power.Icon,
    },
    {
      stance: 'tech',
      label: 'Tech',
      actionLabel: 'Special move',
      statLabel: 'Sp. Atk',
      beats: 'Speed',
      value: techVal,
      icon: STANCE_ICON_CONFIG.tech.Icon,
    },
  ]

  return (
    <div className="game-battle-command-deck mx-auto w-full max-w-2xl">
      <div className="game-battle-command-header" aria-hidden="true">
        <span className="game-battle-command-title">Attack</span>
        <span className="game-battle-command-line" />
        <span className="game-battle-command-count">3 styles</span>
      </div>
      <div className="game-battle-command-grid">
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
              data-feedback={isFeedback || undefined}
              className={cn(
                'game-battle-stance relative block h-auto min-w-0 border px-2.5 pt-2.5 pb-0 text-left sm:px-3 sm:pt-3',
                (isPending || isFeedback) &&
                  !isStanceDisabled &&
                  'disabled:opacity-100',
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
              <span className="game-battle-stance-topline flex items-start justify-between gap-1">
                <span className="game-battle-stance-name flex min-w-0 flex-col items-start">
                  <span className="text-[10px] font-black uppercase tracking-[0.16em] opacity-75">
                    {card.actionLabel}
                  </span>
                  <span className="text-base font-black leading-tight sm:text-lg">
                    {card.label}
                  </span>
                </span>
                <span
                  key={isFeedback ? feedback.sequence : 'idle'}
                  aria-hidden
                  className="game-battle-stance-icon relative inline-flex size-8 shrink-0 items-center justify-center sm:size-9"
                  data-feedback={isFeedback || undefined}
                >
                  <Icon className="relative z-10 size-7 sm:size-8 [&_*]:stroke-[1.8]" />
                </span>
              </span>
              <span className="game-battle-stance-stat mt-2 mb-3 flex items-end gap-2">
                <span
                  className={cn(
                    'block font-mono leading-none font-black tracking-tight sm:text-4xl',
                    card.value >= 1000 ? 'text-2xl' : 'text-3xl',
                  )}
                >
                  {isZReady ? 'Z' : card.value.toLocaleString()}
                </span>
                <span className="mb-0.5 block text-[10px] font-bold uppercase tracking-[0.12em] opacity-75">
                  {isZReady ? 'Z-Move ready' : card.statLabel}
                </span>
              </span>
              <span className="game-battle-stance-hint flex min-h-8 items-center justify-between gap-1 border-t py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] leading-tight">
                {isStanceDisabled ? (
                  'Disabled'
                ) : isPending ? (
                  <>
                    <Loader2
                      aria-hidden
                      className="size-3 animate-spin motion-reduce:animate-none"
                    />
                    <span role="status">Attacking…</span>
                  </>
                ) : (
                  <>
                    <span className="opacity-75">Beats</span>
                    <strong className="font-black">{card.beats}</strong>
                  </>
                )}
              </span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export function StanceSelectorDrawer({
  triggerIcon,
  ...props
}: StanceSelectorDrawerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <BattleActionTrigger
          icon={triggerIcon ?? <Swords className="size-5" aria-hidden />}
          label="Stance"
          count="3"
          data-action="stance"
          aria-label="Open stance choices"
          disabled={props.disabled}
        />
      </DrawerTrigger>
      <DrawerContent className="game-paper-modal game-paper-background max-h-[82dvh] border-game-border bg-game-surface-raised">
        <DrawerHeader className="pb-2">
          <DrawerTitle>Stance</DrawerTitle>
        </DrawerHeader>
        <div className="overflow-y-auto px-4 pb-6">
          <StanceSelector
            {...props}
            onSelect={(stance) => {
              setOpen(false)
              props.onSelect(stance)
            }}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
