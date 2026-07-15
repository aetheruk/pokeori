import Image from 'next/image'
import { cn } from '@/lib/utils'

interface BrandLockupProps {
  compact?: boolean
  className?: string
}

/** Field-journal lockup; a restrained shadow keeps the transparent artwork legible. */
export function BrandLockup({ compact = false, className }: BrandLockupProps) {
  if (compact) {
    return (
      <div
        className={cn('flex size-10 items-center justify-center', className)}
      >
        <Image
          src="/images/pokeori-mark.png"
          alt="Pokeori"
          width={36}
          height={36}
          className="size-9 object-contain drop-shadow-sm"
        />
      </div>
    )
  }

  return (
    <div className={cn('py-1', className)}>
      <Image
        src="/images/pokeori-wordmark-transparent.png"
        alt="Pokeori"
        width={2167}
        height={725}
        className="h-auto w-full drop-shadow-sm"
        priority
      />
    </div>
  )
}
