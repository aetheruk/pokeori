'use client'

import { useLinkStatus } from 'next/link'
import { cn } from '@/lib/utils'

export function NavigationPending() {
  const { pending } = useLinkStatus()

  return (
    <span
      role="status"
      className={cn(
        'pointer-events-none absolute right-1 top-1 h-2 w-2 rounded-full bg-game-moss transition-opacity motion-reduce:transition-none',
        pending ? 'opacity-100 delay-150' : 'opacity-0',
      )}
    >
      <span className="sr-only">{pending ? 'Opening section…' : ''}</span>
    </span>
  )
}
