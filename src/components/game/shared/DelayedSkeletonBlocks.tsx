'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

const SKELETON_REVEAL_DELAY_MS = 180

/** Avoid flashing decorative placeholders during short route transitions. */
export function DelayedSkeletonBlocks({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeout = window.setTimeout(
      () => setIsVisible(true),
      SKELETON_REVEAL_DELAY_MS,
    )

    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <div
      aria-hidden="true"
      className={cn(
        'transition-opacity duration-150 motion-reduce:transition-none',
        isVisible ? 'opacity-100' : 'opacity-0',
        className,
      )}
    >
      {children}
    </div>
  )
}
