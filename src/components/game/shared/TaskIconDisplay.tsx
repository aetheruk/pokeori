'use client'

import {
  Banknote,
  ChevronsRight,
  ChevronsUp,
  Coins,
  HelpCircle,
} from 'lucide-react'
import Image from 'next/image'
import { ItemSprite } from '@/components/ui/item-sprite'
import { TaskIcon } from '@/data/tasks/types'
import { getTrainerSpriteUrl } from '@/data/trainers'
import { cn } from '@/lib/utils'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'

const LUCIDE_ICONS: Record<string, any> = {
  ChevronsUp,
  ChevronsRight,
  HelpCircle,
  Coins,
  Banknote,
}

interface TaskIconDisplayProps {
  icon: TaskIcon
  className?: string
  priority?: boolean
}

export function TaskIconDisplay({
  icon,
  className,
  priority = false,
}: TaskIconDisplayProps) {
  if (icon.type === 'item') {
    return (
      <div className={cn('relative flex-shrink-0', className || 'w-12 h-12')}>
        <ItemSprite
          itemId={icon.id}
          alt="Icon"
          width={48}
          height={48}
          priority={priority}
          className="w-full h-full object-contain pixelated"
        />
      </div>
    )
  } else if (icon.type === 'pokemon') {
    return (
      <div className={cn('relative flex-shrink-0', className || 'w-12 h-12')}>
        <Image
          src={getPokemonImageUrl(icon.id, 'sprite')}
          alt="Icon"
          width={48}
          height={48}
          loading={priority ? 'eager' : 'lazy'}
          className="w-full h-full object-contain pixelated"
        />
      </div>
    )
  } else if (icon.type === 'trainer') {
    return (
      <div className={cn('relative flex-shrink-0', className || 'w-12 h-12')}>
        <Image
          src={getTrainerSpriteUrl(icon.id)}
          alt="Icon"
          width={48}
          height={48}
          loading={priority ? 'eager' : 'lazy'}
          className="w-full h-full object-contain pixelated"
        />
      </div>
    )
  } else if (icon.type === 'local') {
    const src = icon.id.startsWith('/') ? icon.id : `/${icon.id}`
    return (
      <div className={cn('relative flex-shrink-0', className || 'w-12 h-12')}>
        <Image
          src={src}
          alt="Icon"
          width={48}
          height={48}
          loading={priority ? 'eager' : 'lazy'}
          className="w-full h-full object-contain pixelated"
        />
      </div>
    )
  } else if (icon.type === 'lucide') {
    const LucideIcon = LUCIDE_ICONS[icon.id] || HelpCircle
    return (
      <div
        className={cn(
          'relative flex-shrink-0 flex items-center justify-center text-game-moss-strong',
          className || 'w-12 h-12',
        )}
      >
        <LucideIcon className="w-[80%] h-[80%]" />
      </div>
    )
  }

  return null
}
