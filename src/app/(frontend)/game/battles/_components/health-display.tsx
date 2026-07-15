import { STANCE_ICON_CONFIG } from '@/components/game/shared/stance-icon'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import type { BattleStance } from '@/utilities/battle/types'

interface HealthDisplayProps {
  currentHp: number
  maxHp: number
  name: string
  level: number
  isPlayer?: boolean
  centered?: boolean
  align?: 'left' | 'right' | 'center'
  status?: { id: string; counter: number }
  preferredStance?: BattleStance
}

export function HealthDisplay({
  currentHp,
  maxHp,
  name,
  level,
  isPlayer,
  centered,
  align,
  status,
  preferredStance,
}: HealthDisplayProps) {
  const hpPercent = (currentHp / maxHp) * 100
  const resolvedAlign = align ?? (isPlayer || centered ? 'center' : 'left')
  const isCentered = resolvedAlign === 'center'
  const isRight = resolvedAlign === 'right'
  const identityChip = (
    <span className="inline-flex min-w-0 items-center gap-1.5 rounded-full border border-game-border bg-game-surface-raised px-2.5 py-1 text-[11px] font-bold text-game-ink shadow-sm">
      <span className="truncate">{name}</span>
      {preferredStance && <StanceBadge stance={preferredStance} />}
      <span className="font-mono text-[10px] text-game-muted">Lv. {level}</span>
    </span>
  )

  return (
    <div
      className={cn(
        'w-full space-y-2',
        isCentered && 'text-center',
        isRight && 'text-right',
        !isCentered && !isRight && 'text-left',
      )}
    >
      <div
        className={cn(
          'flex items-end gap-2',
          isCentered && 'justify-center',
          isRight ? 'justify-end' : 'justify-start',
        )}
      >
        <div
          className={cn(
            'flex min-w-0 flex-1 items-center gap-2',
            isRight && 'justify-end',
          )}
        >
          {isPlayer && identityChip}
          {status && (
            <div
              className={cn(
                'rounded-full border border-game-night-border/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-game-cream shadow-sm',
                status.id === 'burn' && 'bg-game-clay',
                (status.id === 'poison' || status.id === 'bad-poison') &&
                  'bg-game-clay-strong',
                status.id === 'paralysis' && 'bg-game-ochre-strong',
                status.id === 'sleep' && 'bg-game-night-muted',
                status.id === 'frostbite' && 'bg-game-moss-strong',
                status.id === 'veil' && 'bg-game-clay-strong',
                ![
                  'burn',
                  'poison',
                  'bad-poison',
                  'paralysis',
                  'sleep',
                  'frostbite',
                  'veil',
                ].includes(status.id) && 'bg-game-night-muted',
              )}
            >
              {status.id === 'bad-poison' ? 'Toxic' : status.id}
            </div>
          )}
        </div>
        {!isPlayer && identityChip}
      </div>

      <div className="relative">
        <Progress
          value={hpPercent}
          className="h-4 border border-game-night-border bg-game-night-canvas"
          indicatorClassName={cn(
            'transition-all duration-500',
            hpPercent < 20
              ? 'bg-game-danger'
              : hpPercent < 50
                ? 'bg-game-ochre'
                : 'bg-game-moss',
          )}
        />
        {isPlayer && (
          <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center text-[10px] font-mono text-game-cream [text-shadow:0_1px_2px_rgb(16_31_38_/_0.95)]">
            {currentHp} / {maxHp}
          </div>
        )}
      </div>
    </div>
  )
}

function StanceBadge({ stance }: { stance: BattleStance }) {
  const config = {
    power: {
      Icon: STANCE_ICON_CONFIG.power.Icon,
      className: 'text-game-danger',
      label: 'Power',
    },
    speed: {
      Icon: STANCE_ICON_CONFIG.speed.Icon,
      className: 'text-game-moss-strong',
      label: 'Speed',
    },
    tech: {
      Icon: STANCE_ICON_CONFIG.tech.Icon,
      className: 'text-game-ochre',
      label: 'Tech',
    },
  }[stance]
  const Icon = config.Icon

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center',
        config.className,
      )}
      title={`Prefers ${config.label} Attacks`}
      role="img"
      aria-label={`Prefers ${config.label} Attacks`}
    >
      <Icon className="h-3 w-3" />
    </span>
  )
}
