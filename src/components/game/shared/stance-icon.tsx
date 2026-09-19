import type { ComponentType, HTMLAttributes } from 'react'
import type { StaticImageData } from 'next/image'
import { BadgeQuestionMark } from 'lucide-react'
import { cn } from '@/lib/utils'
import powerIcon from '../../../../icons-new/power.png'
import speedIcon from '../../../../icons-new/speed.png'
import techIcon from '../../../../icons-new/tech.png'

export type DisplayStance = 'power' | 'speed' | 'tech' | 'random'

type StanceGlyphProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  /** Kept for compatibility with existing Lucide call sites. */
  strokeWidth?: number
}

type StanceGlyph = ComponentType<StanceGlyphProps>

function StanceAssetIcon({
  asset,
  className,
  style,
  strokeWidth: _strokeWidth,
  ...props
}: StanceGlyphProps & { asset: StaticImageData }) {
  const maskImage = `url("${asset.src}")`

  return (
    <span
      {...props}
      className={cn('inline-block shrink-0 bg-current', className)}
      style={{
        ...style,
        maskImage,
        maskPosition: 'center',
        maskRepeat: 'no-repeat',
        maskSize: 'contain',
        WebkitMaskImage: maskImage,
        WebkitMaskPosition: 'center',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain',
      }}
    />
  )
}

const PowerStanceIcon: StanceGlyph = (props) => (
  <StanceAssetIcon {...props} asset={powerIcon} />
)

const SpeedStanceIcon: StanceGlyph = (props) => (
  <StanceAssetIcon {...props} asset={speedIcon} />
)

const TechStanceIcon: StanceGlyph = (props) => (
  <StanceAssetIcon {...props} asset={techIcon} />
)

const RandomStanceIcon: StanceGlyph = ({
  className,
  strokeWidth,
  ...props
}) => (
  <span {...props} className={cn('inline-block shrink-0', className)}>
    <BadgeQuestionMark
      aria-hidden="true"
      className="size-full"
      strokeWidth={strokeWidth}
    />
  </span>
)

export const STANCE_ICON_CONFIG: Record<
  DisplayStance,
  {
    Icon: StanceGlyph
    label: string
    tone: string
  }
> = {
  power: {
    Icon: PowerStanceIcon,
    label: 'Power',
    tone: 'text-game-clay-strong',
  },
  speed: {
    Icon: SpeedStanceIcon,
    label: 'Speed',
    tone: 'text-game-ochre',
  },
  tech: {
    Icon: TechStanceIcon,
    label: 'Tech',
    tone: 'text-game-stance-blue-strong',
  },
  random: {
    Icon: RandomStanceIcon,
    label: 'Random',
    tone: 'text-game-clay',
  },
}

export function StanceIcon({
  stance,
  className,
  ...props
}: {
  stance: DisplayStance | string
  className?: string
} & Omit<StanceGlyphProps, 'className'>) {
  const config = STANCE_ICON_CONFIG[stance as DisplayStance]
  if (!config) return null

  const Icon = config.Icon
  return (
    <Icon
      {...props}
      className={cn('size-4', config.tone, className)}
    />
  )
}
