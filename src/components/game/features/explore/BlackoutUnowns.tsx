'use client'

import type { CSSProperties } from 'react'
import Image from 'next/image'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'

interface UnownFloatSpec {
  formId: string
  left: string
  top: string
  size: number
  driftDuration: number
  fadeDuration: number
  delay: number
  peakOpacity: number
}

const FLOAT_SPECS: UnownFloatSpec[] = [
  { formId: '201-exclamation', left: '6%', top: '12%', size: 44, driftDuration: 18, fadeDuration: 8, delay: 0, peakOpacity: 0.55 },
  { formId: '201', left: '18%', top: '70%', size: 56, driftDuration: 21, fadeDuration: 10, delay: 3, peakOpacity: 0.5 },
  { formId: '201-m', left: '30%', top: '20%', size: 40, driftDuration: 16, fadeDuration: 7, delay: 6, peakOpacity: 0.6 },
  { formId: '201-question', left: '44%', top: '82%', size: 52, driftDuration: 23, fadeDuration: 11, delay: 1, peakOpacity: 0.5 },
  { formId: '201-v', left: '58%', top: '14%', size: 46, driftDuration: 17, fadeDuration: 9, delay: 8, peakOpacity: 0.55 },
  { formId: '201-z', left: '72%', top: '64%', size: 60, driftDuration: 20, fadeDuration: 8, delay: 4, peakOpacity: 0.45 },
  { formId: '201-h', left: '85%', top: '26%', size: 42, driftDuration: 15, fadeDuration: 7, delay: 10, peakOpacity: 0.6 },
  { formId: '201-s', left: '12%', top: '42%', size: 48, driftDuration: 19, fadeDuration: 10, delay: 2, peakOpacity: 0.5 },
  { formId: '201-f', left: '66%', top: '40%', size: 38, driftDuration: 14, fadeDuration: 6, delay: 12, peakOpacity: 0.6 },
  { formId: '201-w', left: '38%', top: '55%', size: 44, driftDuration: 22, fadeDuration: 9, delay: 5, peakOpacity: 0.5 },
  { formId: '201-g', left: '90%', top: '78%', size: 40, driftDuration: 17, fadeDuration: 8, delay: 7, peakOpacity: 0.45 },
  { formId: '201-u', left: '50%', top: '32%', size: 36, driftDuration: 16, fadeDuration: 7, delay: 9, peakOpacity: 0.55 },
  { formId: '201-k', left: '24%', top: '88%', size: 42, driftDuration: 20, fadeDuration: 10, delay: 11, peakOpacity: 0.5 },
  { formId: '201-y', left: '80%', top: '8%', size: 46, driftDuration: 18, fadeDuration: 9, delay: 13, peakOpacity: 0.5 },
]

/**
 * Decorative Unown layer for the Saffron blackout Explore list. Sprites drift
 * and fade in and out behind the content; the layer never intercepts input and
 * fully respects prefers-reduced-motion.
 */
export function BlackoutUnowns() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden"
    >
      {FLOAT_SPECS.map((spec) => (
        <div
          key={spec.formId}
          className="pokeori-unown-float absolute"
          style={{
            left: spec.left,
            top: spec.top,
            '--unown-drift': `${spec.driftDuration}s`,
            '--unown-fade': `${spec.fadeDuration}s`,
            '--unown-delay': `-${spec.delay}s`,
            '--unown-peak': spec.peakOpacity,
          } as CSSProperties}
        >
          <Image
            src={getPokemonImageUrl(spec.formId, 'home')}
            alt=""
            width={spec.size}
            height={spec.size}
            loading="lazy"
            className="h-auto w-auto"
          />
        </div>
      ))}
    </div>
  )
}
