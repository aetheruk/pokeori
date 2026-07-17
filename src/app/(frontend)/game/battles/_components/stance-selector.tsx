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
    iconTone: string
    valueTone: string
    hoverTone: string
  }> = [
    {
      stance: 'speed',
      label: 'SPEED',
      value: speedVal,
      icon: STANCE_ICON_CONFIG.speed.Icon,
      iconTone: 'text-game-stance-blue',
      valueTone: 'text-game-stance-blue-strong',
      hoverTone:
        'hover:border-game-stance-blue/70 hover:bg-game-stance-blue/10',
    },
    {
      stance: 'power',
      label: 'POWER',
      value: powerVal,
      icon: STANCE_ICON_CONFIG.power.Icon,
      iconTone: 'text-game-clay',
      valueTone: 'text-game-clay-strong',
      hoverTone: 'hover:border-game-clay/60 hover:bg-game-clay/8',
    },
    {
      stance: 'tech',
      label: 'TECH',
      value: techVal,
      icon: STANCE_ICON_CONFIG.tech.Icon,
      iconTone: 'text-game-moss',
      valueTone: 'text-game-moss-strong',
      hoverTone: 'hover:border-game-moss/60 hover:bg-game-moss/8',
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
              'group relative h-20 overflow-hidden rounded-lg border border-game-border bg-game-surface-raised px-2.5 py-2.5 transition-colors',
              card.hoverTone,
              isStanceDisabled &&
                'border-game-border bg-game-canvas opacity-45',
              isPending &&
                'border-game-moss bg-game-moss/10 ring-1 ring-game-moss/35',
              isZReady &&
                'border-game-ochre/70 bg-game-ochre/10 ring-2 ring-game-ochre/70 ring-offset-2 ring-offset-game-surface',
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
                'pointer-events-none absolute left-1/2 top-1/2 size-[72%] max-h-[72%] max-w-[72%] -translate-x-1/2 -translate-y-1/2 opacity-20 [&_*]:stroke-[1.35]',
                isZReady ? 'text-game-ochre' : card.iconTone,
              )}
            />

            <div className="relative z-10 h-full w-full">
              <div className="absolute right-0 top-0 flex items-center gap-1">
                {isPending && (
                  <Loader2 className="h-4 w-4 animate-spin text-game-moss-strong" />
                )}
                {isZReady && (
                  <span className="rounded border border-game-ochre/50 bg-game-ochre/10 px-1.5 py-0.5 text-[10px] font-black leading-none text-game-ochre">
                    Z
                  </span>
                )}
              </div>

              <div
                className={cn(
                  'absolute bottom-0 right-0 whitespace-nowrap text-right text-3xl font-black leading-none sm:text-4xl',
                  isZReady
                    ? 'text-game-ochre'
                    : isStanceDisabled
                      ? 'text-game-muted'
                      : card.valueTone,
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
