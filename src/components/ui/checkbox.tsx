'use client'

import { CheckIcon } from 'lucide-react'
import { Checkbox as CheckboxPrimitive } from 'radix-ui'
import * as React from 'react'

import { cn } from '@/lib/utils'

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer size-5 shrink-0 rounded-[5px] border border-game-border-strong bg-game-surface-raised text-game-surface-raised outline-none transition-colors hover:border-game-moss data-[state=checked]:border-game-moss data-[state=checked]:bg-game-moss focus-visible:ring-2 focus-visible:ring-game-moss/30 focus-visible:ring-offset-2 focus-visible:ring-offset-game-canvas disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-game-danger aria-invalid:ring-game-danger/20',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
