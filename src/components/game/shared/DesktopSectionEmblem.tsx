import Image from 'next/image'
import {
  POKEORI_DESKTOP_ILLUSTRATIONS,
  type PokeoriDesktopIllustration,
} from '@/data/ui/pokeori-illustrations'
import { cn } from '@/lib/utils'

export function DesktopSectionEmblem({
  section,
  className,
}: {
  section: PokeoriDesktopIllustration
  className?: string
}) {
  return (
    <Image
      src={POKEORI_DESKTOP_ILLUSTRATIONS[section]}
      alt=""
      aria-hidden="true"
      width={180}
      height={180}
      className={cn('pointer-events-none hidden object-contain lg:block', className)}
    />
  )
}
