import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'h-11 w-full min-w-0 rounded-lg border border-game-border bg-game-surface px-3 py-2 text-base text-game-ink outline-none transition-colors placeholder:text-game-muted selection:bg-game-clay selection:text-game-surface-raised file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'hover:border-game-border-strong focus-visible:border-game-moss focus-visible:ring-2 focus-visible:ring-game-moss/20',
        'aria-invalid:border-red-500 aria-invalid:ring-red-500/20',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
