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
    value: number
    icon: typeof STANCE_ICON_CONFIG.power.Icon
    surfaceTone: string
    iconTone: string
    hoverTone: string
  }> = [
    {
      stance: 'speed',
      label: 'SPEED',
      value: speedVal,
      icon: STANCE_ICON_CONFIG.speed.Icon,
      surfaceTone: 'border-game-stance-blue-strong bg-game-stance-blue-strong',
      iconTone: 'text-game-stance-blue',
      hoverTone:
        'hover:border-game-stance-blue hover:bg-game-stance-blue-strong',
    },
    {
      stance: 'power',
      label: 'POWER',
      value: powerVal,
      icon: STANCE_ICON_CONFIG.power.Icon,
      surfaceTone: 'border-game-clay-strong bg-game-clay-strong',
      iconTone: 'text-game-clay',
      hoverTone: 'hover:border-game-clay hover:bg-game-clay-strong',
    },
    {
      stance: 'tech',
      label: 'TECH',
      value: techVal,
      icon: STANCE_ICON_CONFIG.tech.Icon,
      surfaceTone: 'border-game-moss-strong bg-game-moss-strong',
      iconTone: 'text-game-moss',
      hoverTone: 'hover:border-game-moss hover:bg-game-moss-strong',
    },
  ]

  return (
    <div className="grid w-full max-w-2xl grid-cols-3 gap-2 sm:gap-3 mx-auto">
      {stanceCards.map((card) => {
        const Icon = card.icon
        const isZReady = !!zMoveReady
        const isStanceDisabled = disabledStance === card.stance
        const isPending = pendingStance === card.stance

        return (
          <Button
            key={card.stance}
            type="button"
            variant="outline"
            className={cn(
              'group relative h-20 overflow-hidden rounded-lg border px-2.5 py-2.5 text-white transition-colors',
              card.surfaceTone,
              card.hoverTone,
              isStanceDisabled &&
                'border-game-border bg-game-canvas text-game-muted opacity-45',
              isPending &&
                'border-white/70 ring-2 ring-white/45 ring-offset-1 ring-offset-game-surface',
              isZReady &&
                'ring-2 ring-game-ochre/80 ring-offset-2 ring-offset-game-surface',
            )}
            onClick={() => onSelect(card.stance)}
            disabled={disabled || isStanceDisabled}
            aria-label={card.label}
            aria-pressed={isPending}
            aria-busy={isPending}
          >
            <Icon
              aria-hidden
              className={cn(
                'pointer-events-none absolute -left-[14%] top-1/2 size-[76%] max-h-[76%] max-w-[76%] -translate-y-1/2 animate-pulse opacity-60 motion-reduce:animate-none [&_*]:stroke-[1.35]',
                card.iconTone,
              )}
            />

            <div className="relative z-10 h-full w-full">
              <div className="absolute right-0 top-0 flex items-center gap-1">
                {isPending && (
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                )}
                {isZReady && (
                  <span className="rounded border border-game-ochre/50 bg-game-surface-raised/90 px-1.5 py-0.5 text-[10px] font-black leading-none text-game-ochre">
                    Z
                  </span>
                )}
              </div>

              <div
                className={cn(
                  'absolute -bottom-1 right-0 whitespace-nowrap text-right text-[2.75rem] font-black leading-none tracking-tight text-white sm:text-5xl',
                  isStanceDisabled && 'text-game-muted',
                )}
              >
                {isZReady ? 'Z' : card.value.toLocaleString()}
              </div>
            </div>
          </Button>
        )
      })}
    </div>
  )
}
