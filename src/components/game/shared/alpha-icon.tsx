import Image from 'next/image'

interface AlphaIconProps {
  size?: number
  className?: string
}

export function AlphaIcon({ size = 20, className }: AlphaIconProps) {
  return (
    <Image
      src="/ui/pokemon/alpha-icon.png"
      width={Math.round(size * 0.95)}
      height={size}
      alt="Alpha"
      title="Alpha Pokémon"
      className={`inline-block h-auto w-auto shrink-0 align-middle ${className || ''}`}
    />
  )
}
