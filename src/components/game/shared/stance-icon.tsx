import { Atom, BadgeQuestionMark, BicepsFlexed, FastForward } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'

export type DisplayStance = 'power' | 'speed' | 'tech' | 'random'

export const STANCE_ICON_CONFIG: Record<
  DisplayStance,
  {
    Icon: ComponentType<SVGProps<SVGSVGElement>>
    label: string
    tone: string
  }
> = {
  power: {
    Icon: BicepsFlexed,
    label: 'Power',
    tone: 'text-game-clay-strong',
  },
  speed: {
    Icon: FastForward,
    label: 'Speed',
    tone: 'text-game-stance-blue-strong',
  },
  tech: {
    Icon: Atom,
    label: 'Tech',
    tone: 'text-game-moss-strong',
  },
  random: {
    Icon: BadgeQuestionMark,
    label: 'Random',
    tone: 'text-game-clay',
  },
}

export function StanceIcon({
  stance,
  className,
}: {
  stance: DisplayStance | string
  className?: string
}) {
  const config = STANCE_ICON_CONFIG[stance as DisplayStance]
  if (!config) return null

  const Icon = config.Icon
  return <Icon className={className ?? config.tone} />
}
