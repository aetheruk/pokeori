'use client'

import type { CSSProperties } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
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
  shiny?: boolean
  peek?: boolean
}

const FLOAT_SPECS: UnownFloatSpec[] = [
  { formId: '201-exclamation', left: '6%', top: '12%', size: 44, driftDuration: 18, fadeDuration: 8, delay: 0, peakOpacity: 0.55 },
  { formId: '201', left: '18%', top: '70%', size: 56, driftDuration: 21, fadeDuration: 10, delay: 3, peakOpacity: 0.5, peek: true },
  { formId: '201-m', left: '30%', top: '20%', size: 40, driftDuration: 16, fadeDuration: 7, delay: 6, peakOpacity: 0.6 },
  { formId: '201-question', left: '44%', top: '82%', size: 52, driftDuration: 23, fadeDuration: 11, delay: 1, peakOpacity: 0.5 },
  { formId: '201-v', left: '58%', top: '14%', size: 46, driftDuration: 17, fadeDuration: 9, delay: 8, peakOpacity: 0.55, peek: true },
  { formId: '201-z', left: '72%', top: '64%', size: 60, driftDuration: 20, fadeDuration: 8, delay: 4, peakOpacity: 0.45 },
  { formId: '201-h', left: '85%', top: '26%', size: 42, driftDuration: 15, fadeDuration: 7, delay: 10, peakOpacity: 0.6 },
  { formId: '201-s', left: '8%', top: '30%', size: 48, driftDuration: 19, fadeDuration: 10, delay: 2, peakOpacity: 0.5 },
  { formId: '201-f', left: '70%', top: '28%', size: 38, driftDuration: 14, fadeDuration: 6, delay: 12, peakOpacity: 0.6 },
  { formId: '201-w', left: '38%', top: '55%', size: 44, driftDuration: 22, fadeDuration: 9, delay: 5, peakOpacity: 0.5 },
  { formId: '201-g', left: '90%', top: '78%', size: 40, driftDuration: 17, fadeDuration: 8, delay: 7, peakOpacity: 0.45 },
  { formId: '201-u', left: '50%', top: '32%', size: 36, driftDuration: 16, fadeDuration: 7, delay: 9, peakOpacity: 0.55 },
  { formId: '201-k', left: '24%', top: '88%', size: 42, driftDuration: 20, fadeDuration: 10, delay: 11, peakOpacity: 0.5 },
  { formId: '201-y', left: '80%', top: '8%', size: 46, driftDuration: 18, fadeDuration: 9, delay: 13, peakOpacity: 0.5 },
  { formId: '201-e', left: '10%', top: '64%', size: 44, driftDuration: 19, fadeDuration: 9, delay: 4, peakOpacity: 0.55 },
  { formId: '201-l', left: '68%', top: '82%', size: 48, driftDuration: 21, fadeDuration: 8, delay: 6, peakOpacity: 0.5 },
  { formId: '201-p', left: '34%', top: '8%', size: 40, driftDuration: 16, fadeDuration: 7, delay: 12, peakOpacity: 0.6 },
]

const NAME_LETTER_LIMIT = 12
const NAME_GAP_RATIO = 0.28

/**
 * Maps a trainer name to Unown form ids, ending with a question-mark Unown.
 * Non-letter characters are stripped and long names are capped so the row
 * fits the centre band.
 */
export function buildNameForms(rawName?: string): string[] {
  const cleaned = (rawName || '')
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .slice(0, NAME_LETTER_LIMIT)
  return [...cleaned.split('').map((letter) => `201-${letter}`), '201-question']
}

/**
 * Decorative Unown layer for the Saffron blackout Explore list. Sprites drift
 * and fade in and out behind the content; the layer never intercepts input and
 * fully respects prefers-reduced-motion.
 */
export function BlackoutUnowns({ trainerName }: { trainerName?: string }) {
  const nameForms = buildNameForms(trainerName)
  // Glyph width + gaps, so the whole word fits the viewport: size is capped at
  // 76px and shrinks responsively from 100vw.
  const nameDivisor = nameForms.length
    ? nameForms.length + (nameForms.length - 1) * NAME_GAP_RATIO
    : 1

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden"
    >
      {/* Soft vignette keeps the centre readable and the edges in shadow. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 42%, transparent 0%, transparent 46%, rgb(23 39 51 / 0.55) 100%)',
        }}
      />
      {/* Trainer name spelled by Unown in the centre band. */}
      {nameForms.length > 0 && (
        <div className="absolute inset-x-0 top-[46%] flex -translate-y-1/2 items-center justify-center px-4">
          <div className="flex items-center">
            {nameForms.map((formId, index) => {
              const letterSize = `min(76px, calc((100vw - 2.5rem) / ${nameDivisor}))`
              return (
                <div
                  key={`${formId}-${index}`}
                  className="pokeori-unown-float flex items-center justify-center"
                  style={{
                    fontSize: letterSize,
                    width: '1em',
                    height: '1em',
                    marginLeft: index === 0 ? 0 : '0.28em',
                    '--unown-drift': `${13 + (index % 4) * 2.4}s`,
                    '--unown-fade': `${7.5 + (index % 3) * 0.9}s`,
                    '--unown-delay': `-${(
                      index * 0.24 +
                      ((index * 7) % 5) * 0.12
                    ).toFixed(2)}s`,
                    '--unown-peak': 0.75 + (index % 3) * 0.06,
                  } as CSSProperties}
                >
                  <Image
                    src={getPokemonImageUrl(formId, 'home')}
                    alt=""
                    width={96}
                    height={96}
                    unoptimized
                    className="h-full w-full object-contain"
                  />
                </div>
              )
            })}
          </div>
        </div>
      )}
      {FLOAT_SPECS.map((spec) => (
        <div
          key={spec.formId}
          className={cn(
            'pokeori-unown-float absolute',
            spec.peek && 'pokeori-unown-peek',
          )}
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
            src={getPokemonImageUrl(spec.formId, 'home', spec.shiny)}
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
