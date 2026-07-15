import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'field-sizing-content min-h-24 w-full rounded-lg border border-game-border bg-game-surface px-3 py-2.5 text-base text-game-ink outline-none transition-colors placeholder:text-game-muted hover:border-game-border-strong focus-visible:border-game-moss focus-visible:ring-2 focus-visible:ring-game-moss/20 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-game-danger aria-invalid:ring-2 aria-invalid:ring-game-danger/20 md:text-sm',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
