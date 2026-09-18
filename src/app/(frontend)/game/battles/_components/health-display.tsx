import { STANCE_ICON_CONFIG } from '@/components/game/shared/stance-icon'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { getBattleStatusChip } from '@/utilities/battle/status-presentation'
import type { BattleStance } from '@/utilities/battle/types'
import { Mars, Venus } from 'lucide-react'

interface HealthDisplayProps {
  currentHp: number
  maxHp: number
  name: string
  level: number
  gender?: string | null
  isPlayer?: boolean
  centered?: boolean
  align?: 'left' | 'right' | 'center'
  status?: { id: string; counter: number }
  preferredStance?: BattleStance
  compact?: boolean
}

export function HealthDisplay({
  currentHp,
  maxHp,
  name,
  level,
  gender,
  isPlayer,
  centered,
  align,
  status,
  preferredStance,
  compact = false,
}: HealthDisplayProps) {
  const hpPercent = (currentHp / maxHp) * 100
  const resolvedAlign = align ?? (isPlayer || centered ? 'center' : 'left')
  const isCentered = resolvedAlign === 'center'
  const isRight = resolvedAlign === 'right'
  const statusChip = status ? getBattleStatusChip(status.id) : null
  const identityChip = (
    <span
      className={cn(
        'game-paper-first inline-flex min-w-0 max-w-full items-center rounded-full border border-game-border bg-game-surface-raised font-bold text-game-ink shadow-sm',
        compact
          ? 'gap-1 px-1.5 py-0.5 text-[10px]'
          : 'gap-1.5 px-2.5 py-1 text-[11px]',
      )}
    >
      <span className="min-w-0 truncate">{name}</span>
      <GenderBadge gender={gender} />
      {preferredStance && <StanceBadge stance={preferredStance} />}
      <span
        className={cn(
          'shrink-0 font-mono text-game-muted',
          compact ? 'text-[9px]' : 'text-[10px]',
        )}
      >
        Lv. {level}
      </span>
    </span>
  )

  return (
    <div
      className={cn(
        compact ? 'w-full space-y-0.5' : 'w-full space-y-2',
        isCentered && 'text-center',
        isRight && 'text-right',
        !isCentered && !isRight && 'text-left',
      )}
    >
      <div
        className={cn(
          compact ? 'flex min-w-0 items-end gap-1' : 'flex items-end gap-2',
          isCentered && 'justify-center',
          isRight ? 'justify-end' : 'justify-start',
        )}
      >
        <div
          className={cn(
            compact
              ? 'flex min-w-0 flex-1 items-center gap-1'
              : 'flex min-w-0 flex-1 items-center gap-2',
            isRight && 'justify-end',
          )}
        >
          {isPlayer && identityChip}
          {statusChip && (
            <div
              className={cn(
                'rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-sm',
                statusChip.className,
              )}
            >
              {statusChip.label}
            </div>
          )}
        </div>
        {!isPlayer && identityChip}
      </div>

      <div className="relative">
        <Progress
          value={hpPercent}
          className={cn(
            'border border-game-night-border bg-game-night-canvas',
            compact ? 'h-3' : 'h-4',
          )}
          indicatorClassName={cn(
            'transition-all duration-500',
            hpPercent < 20
              ? 'bg-game-danger'
              : hpPercent < 50
                ? 'bg-game-ochre'
                : 'bg-game-health',
          )}
        />
        {isPlayer && (
          <div
            className={cn(
              'absolute top-0 left-0 flex h-full w-full items-center justify-center font-mono text-game-cream [text-shadow:0_1px_2px_rgb(16_31_38_/_0.95)]',
              compact ? 'text-[9px]' : 'text-[10px]',
            )}
          >
            {currentHp} / {maxHp}
          </div>
        )}
      </div>
    </div>
  )
}

function GenderBadge({ gender }: { gender?: string | null }) {
  const config =
    gender === 'female'
      ? { label: 'Female', Icon: Venus, className: 'text-pink-600' }
      : gender === 'male'
        ? { label: 'Male', Icon: Mars, className: 'text-blue-600' }
        : null

  if (!config) return null
  const Icon = config.Icon

  return (
    <span
      className={cn(
        'inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center',
        config.className,
      )}
      role="img"
      aria-label={config.label}
      title={config.label}
    >
      <Icon aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} />
    </span>
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
      className: 'text-game-ochre',
      label: 'Speed',
    },
    tech: {
      Icon: STANCE_ICON_CONFIG.tech.Icon,
      className: 'text-game-stance-blue-strong',
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
