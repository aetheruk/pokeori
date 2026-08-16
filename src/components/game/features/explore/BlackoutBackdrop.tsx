'use client'

import Image from 'next/image'

/**
 * Backdrop for the Saffron blackout Explore list: the cosmos artwork
 * anchors the scene in a deep celestial void with subtle nebula gradients,
 * slow-breathing warm glows, and starlight, leaving the centre open for
 * content, the floating Unown, and the golden egg awakening.
 */
export function BlackoutBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-20 select-none overflow-hidden"
    >
      {/* Deep void sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, #060b11 0%, #0c1520 42%, #132230 68%, #1a2c3a 100%)',
        }}
      />

      {/* Slow-breathing warm glow at the horizon for depth */}
      <div
        className="pokeori-blackout-warmth pokeori-blackout-warmth-bottom absolute inset-x-0 bottom-0 h-[55%]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgb(215 132 103 / 0.45) 0%, rgb(181 138 67 / 0.15) 45%, transparent 75%)',
        }}
      />
      <div
        className="pokeori-blackout-warmth pokeori-blackout-warmth-top absolute inset-x-0 top-0 h-[32%]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgb(215 132 103 / 0.28) 0%, rgb(181 138 67 / 0.08) 48%, transparent 75%)',
        }}
      />

      {/* Cosmos dimension mirrored overhead */}
      <div className="pokeori-blackout-breathe pokeori-blackout-breathe-alt absolute inset-x-0 top-0 h-[46%]">
        <Image
          src="/backgrounds/cosmos.avif"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover object-top opacity-20"
          style={{
            transform: 'rotate(180deg)',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, rgb(0 0 0 / 1) 40%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, rgb(0 0 0 / 1) 40%)',
          }}
        />
      </div>

      {/* Cosmos dimension along the bottom edge */}
      <div className="pokeori-blackout-breathe absolute inset-x-0 bottom-0 h-[50%]">
        <Image
          src="/backgrounds/cosmos.avif"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover object-bottom opacity-22"
          style={{
            maskImage:
              'linear-gradient(to top, rgb(0 0 0 / 1) 28%, transparent 96%)',
            WebkitMaskImage:
              'linear-gradient(to top, rgb(0 0 0 / 1) 28%, transparent 96%)',
          }}
        />
      </div>

      {/* Deep grounding shadow at the bottom edge */}
      <div
        className="absolute inset-x-0 bottom-0 h-24"
        style={{
          background:
            'linear-gradient(to top, rgb(6 11 16 / 0.92), transparent)',
        }}
      />
    </div>
  )
}
