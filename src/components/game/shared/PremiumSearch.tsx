'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Search, X } from 'lucide-react'

interface PremiumSearchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void
  showClear?: boolean
}

export function PremiumSearch({
  className,
  onClear,
  showClear,
  ...props
}: PremiumSearchProps) {
  return (
    <div className="group relative w-full">
      <div className="absolute left-3.5 top-1/2 z-10 flex -translate-y-1/2 items-center">
        <Search className="h-4 w-4 text-game-muted transition-colors group-focus-within:text-game-moss-strong" />
      </div>

      <Input className={cn('h-11 w-full pr-11 pl-10', className)} {...props} />

      {/* Clear Button */}
      {showClear && (
        <button
          type="button"
          onClick={onClear}
          className="game-focus-ring absolute right-1 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-md text-game-muted transition-colors hover:bg-game-moss/10 hover:text-game-ink"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
