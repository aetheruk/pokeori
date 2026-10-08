import Image from 'next/image'

export function AlphaIcon() {
  return (
    <Image
      src="/ui/pokemon/alpha-icon.png"
      width={19}
      height={20}
      alt="Alpha"
      title="Alpha Pokémon"
      className="inline-block h-5 w-auto shrink-0 align-middle"
    />
  )
}
