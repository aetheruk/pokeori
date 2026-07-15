import React from 'react'
import { cn } from '@/lib/utils'

interface StickyFooterProps {
  children: React.ReactNode
  className?: string
}

export function StickyFooter({ children, className }: StickyFooterProps) {
  return (
    <div
      className={cn(
        'z-20 mt-auto flex w-full flex-none justify-center border-t border-game-border bg-game-surface/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-xl',
        className,
      )}
    >
      <div className="w-full max-w-sm">{children}</div>
    </div>
  )
}
