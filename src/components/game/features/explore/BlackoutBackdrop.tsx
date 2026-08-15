'use client'

import Image from 'next/image'

/**
 * Backdrop for the Saffron blackout Explore list: the twisted-dimension
 * artwork anchors the top and bottom edges with fade masks over a deep void
 * sky, leaving the centre open for content and the floating Unown.
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
            'linear-gradient(to bottom, #0a1218 0%, #111e26 42%, #192a33 68%, #22343d 100%)',
        }}
      />

      {/* Slow-breathing warm glow at the horizon for depth */}
      <div
        className="pokeori-blackout-warmth pokeori-blackout-warmth-bottom absolute inset-x-0 bottom-0 h-[55%]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgb(215 132 103 / 0.5) 0%, rgb(181 138 67 / 0.16) 45%, transparent 75%)',
        }}
      />
      <div
        className="pokeori-blackout-warmth pokeori-blackout-warmth-top absolute inset-x-0 top-0 h-[32%]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgb(215 132 103 / 0.32) 0%, rgb(181 138 67 / 0.1) 48%, transparent 75%)',
        }}
      />

      {/* Twisted dimension mirrored overhead */}
      <div className="pokeori-blackout-breathe pokeori-blackout-breathe-alt absolute inset-x-0 top-0 h-[42%]">
        <Image
          src="/backgrounds/twisted-dimension.avif"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover object-top opacity-12"
          style={{
            transform: 'rotate(180deg)',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, rgb(0 0 0 / 1) 38%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, rgb(0 0 0 / 1) 38%)',
          }}
        />
      </div>

      {/* Twisted dimension along the bottom edge */}
      <div className="pokeori-blackout-breathe absolute inset-x-0 bottom-0 h-[46%]">
        <Image
          src="/backgrounds/twisted-dimension.avif"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover object-bottom opacity-12"
          style={{
            maskImage:
              'linear-gradient(to top, rgb(0 0 0 / 1) 26%, transparent 96%)',
            WebkitMaskImage:
              'linear-gradient(to top, rgb(0 0 0 / 1) 26%, transparent 96%)',
          }}
        />
      </div>

      {/* Deep grounding shadow at the bottom edge */}
      <div
        className="absolute inset-x-0 bottom-0 h-24"
        style={{
          background:
            'linear-gradient(to top, rgb(8 14 19 / 0.9), transparent)',
        }}
      />
    </div>
  )
}
