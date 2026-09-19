import type { ComponentProps, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { ItemSprite } from '@/components/ui/item-sprite'
import { cn } from '@/lib/utils'

type BattleActionTriggerProps = Omit<
  ComponentProps<typeof Button>,
  'children'
> & {
  itemId?: string
  icon?: ReactNode
  label: string
  count?: ReactNode
  compact?: boolean
}

export function BattleActionTrigger({
  itemId,
  icon,
  label,
  count,
  compact = false,
  className,
  ...props
}: BattleActionTriggerProps) {
  const actionIcon =
    icon ??
    (itemId ? (
      <ItemSprite
        itemId={itemId}
        alt=""
        width={22}
        height={22}
        className="size-5 shrink-0 object-contain"
      />
    ) : null)

  if (compact) {
    return (
      <Button
        type="button"
        variant="outline"
        className={cn('game-battle-type-action', className)}
        {...props}
      >
        <span className="game-battle-action-icon">{actionIcon}</span>
        <span className="sr-only">{label}</span>
      </Button>
    )
  }

  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        'game-battle-utility-trigger h-12 min-w-0 flex-1 justify-between gap-2 rounded-lg border px-2 text-right shadow-none sm:px-3',
        className,
      )}
      {...props}
    >
      <span className="game-battle-action-icon">{actionIcon}</span>
      <span className="flex min-w-0 flex-col items-end gap-0.5 leading-none text-right">
        <span className="text-[11px] font-black uppercase tracking-[0.08em] sm:text-xs">
          {label}
        </span>
        {count !== undefined && (
          <span className="font-mono text-[11px] font-medium opacity-75">
            {count}
          </span>
        )}
      </span>
    </Button>
  )
}
