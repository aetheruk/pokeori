'use client'

import Image from 'next/image'

/**
 * Ethereal golden glow at the centre of the blackout page. It breathes gently
 * and grows with every tap; after enough taps the full screen flashes white
 * (handled by the Explore page) and the glow becomes an egg with an ethereal
 * halo.
 */
export function BlackoutGoldenGlow({
  tapCount,
  revealed,
}: {
  tapCount: number
  revealed: boolean
}) {
  const progress = Math.min(tapCount / 20, 1)
  const scale = 0.55 + progress * 1.9

  if (revealed) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
      >
        <div className="pokeori-egg-float relative">
          <div
            className="pokeori-golden-breathe absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgb(255 214 140 / 0.28) 0%, rgb(181 138 67 / 0.1) 50%, transparent 74%)',
              filter: 'blur(16px)',
            }}
          />
          <div className="relative z-10">
            <Image
              src="/sprites/items/egg.avif"
              alt=""
              width={288}
              height={288}
              unoptimized
              className="h-auto w-auto"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
    >
      <div
        className="pokeori-golden-breathe relative"
        style={{ transform: `scale(${scale})` }}
      >
        {/* Soft wide halo */}
        <div
          className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgb(255 214 140 / 0.32) 0%, rgb(181 138 67 / 0.14) 45%, transparent 70%)',
            filter: 'blur(18px)',
          }}
        />
        {/* Godlike rotating rays */}
        <div
          className="pokeori-golden-rays absolute left-1/2 top-1/2 h-[26rem] w-[26rem] rounded-full"
          style={{
            background:
              'repeating-conic-gradient(from 0deg, transparent 0deg 12deg, rgb(255 214 140 / 0) 12deg, rgb(255 214 140 / 0.15) 13deg 19deg, rgb(255 214 140 / 0) 22deg, transparent 22deg 30deg)',
            filter: 'blur(3px)',
            maskImage:
              'radial-gradient(circle, transparent 18%, black 52%, transparent 74%)',
            WebkitMaskImage:
              'radial-gradient(circle, transparent 18%, black 52%, transparent 74%)',
          }}
        />
        {/* Bright core */}
        <div
          className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgb(255 231 178 / 0.95) 0%, rgb(255 205 120 / 0.5) 38%, transparent 70%)',
            filter: 'blur(5px)',
          }}
        />
      </div>
    </div>
  )
}
