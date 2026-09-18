import type { ComponentProps, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { ItemSprite } from '@/components/ui/item-sprite'
import { cn } from '@/lib/utils'

type BattleActionTriggerProps = Omit<ComponentProps<typeof Button>, 'children'> & {
  itemId: string
  label: string
  count: ReactNode
}

export function BattleActionTrigger({
  itemId,
  label,
  count,
  className,
  ...props
}: BattleActionTriggerProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        'h-11 min-w-0 flex-1 gap-1 rounded-lg border-game-border bg-game-surface-raised px-1.5 text-game-ink shadow-none hover:border-game-charcoal/50 hover:bg-game-surface-raised sm:gap-2 sm:px-3',
        className,
      )}
      {...props}
    >
      <ItemSprite
        itemId={itemId}
        alt=""
        width={22}
        height={22}
        className="size-5 shrink-0 object-contain"
      />
      <span className="flex min-w-0 flex-col items-start gap-0.5 leading-none">
        <span className="text-[11px] font-bold sm:text-xs">{label}</span>
        <span className="font-mono text-[11px] font-medium text-game-muted">{count}</span>
      </span>
    </Button>
  )
}
