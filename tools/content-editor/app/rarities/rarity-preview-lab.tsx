'use client'

import { useState } from 'react'
import {
  PokemonRaritySprite,
  type PokemonRaritySpriteView,
} from '@/components/game/shared/PokemonRaritySprite'
import { POKEMON_RARITY_EFFECTS } from '@/utilities/pokemon/rarity-effects'
import { PokemonSelector } from '../components/selectors/PokemonSelector'
import { FormSelector } from '../components/selectors/FormSelector'

const INITIAL_PREVIEW = {
  speciesId: 6,
  formId: '6',
  speciesName: 'Charizard',
  formName: 'Charizard',
}

const spriteViews: {
  view: PokemonRaritySpriteView
  label: string
  description: string
}[] = [
  { view: 'front', label: 'Pixel front', description: 'Gen V front sprite' },
  { view: 'back', label: 'Pixel back', description: 'Gen V back sprite' },
  { view: 'home', label: 'Home artwork', description: 'Home sprite' },
]

export function RarityPreviewLab() {
  const [preview, setPreview] = useState(INITIAL_PREVIEW)

  const previewName = preview.formName || preview.speciesName

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 pb-8">
      <header className="max-w-3xl space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-game-ochre">
          Visual development lab
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-game-ink sm:text-4xl">
          Pokemon rarity treatments
        </h1>
        <p className="text-sm leading-relaxed text-game-muted sm:text-base">
          CSS-only visual experiments applied to your selected Pokemon form in each available
          presentation. These previews do not alter saved Pokemon, encounter odds, or battles.
        </p>
      </header>

      <section
        aria-labelledby="rarity-lab-heading"
        className="rounded-xl border border-game-border bg-game-paper-background p-3 shadow-[0_12px_28px_rgb(75_62_39_/_0.1)] sm:p-4"
      >
        <div className="mb-4 flex flex-col gap-4 border-b border-game-border px-2 pb-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2
              id="rarity-lab-heading"
              className="font-display text-xl font-semibold text-game-ink"
            >
              {previewName} preview set
            </h2>
            <p className="text-sm text-game-muted">
              Pick a species and form to inspect every rarity across battle and Home sprites.
            </p>
          </div>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-game-muted">
            {POKEMON_RARITY_EFFECTS.length} treatments · form {preview.formId}
          </span>
        </div>

        <div className="mb-5 grid gap-3 rounded-lg border border-game-border bg-game-surface-raised p-3 sm:grid-cols-2 sm:p-4 lg:max-w-3xl">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-game-muted">
              Pokemon
            </p>
            <PokemonSelector
              value={preview.speciesId}
              onSelect={(speciesId, speciesName) =>
                setPreview({
                  speciesId,
                  formId: speciesId.toString(),
                  speciesName,
                  formName: speciesName,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-game-muted">
              Form
            </p>
            <FormSelector
              speciesId={preview.speciesId}
              value={preview.formId}
              onChange={(formId, formName) =>
                setPreview((current) => ({ ...current, formId, formName }))
              }
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {POKEMON_RARITY_EFFECTS.map((effect) => (
            <article
              key={effect.id}
              className="overflow-hidden rounded-xl border border-game-border bg-game-surface-raised text-game-ink shadow-sm"
            >
              <header className="flex items-start justify-between gap-3 border-b border-game-border bg-game-surface px-4 py-3">
                <div>
                  <h3 className="font-display text-lg font-semibold leading-tight">
                    {effect.label}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-game-muted">
                    {effect.description}
                  </p>
                </div>
                <span
                  className={
                    effect.group === 'reference'
                      ? 'rounded-full border border-game-border bg-game-canvas px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-game-muted'
                      : 'rounded-full border border-game-ochre/35 bg-game-ochre/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-game-ochre'
                  }
                >
                  {effect.group}
                </span>
              </header>

              <div className="grid grid-cols-3 divide-x divide-game-border">
                {spriteViews.map((sprite) => (
                  <figure key={sprite.view} className="min-w-0 space-y-2 p-2 text-center sm:p-3">
                    <div className="flex aspect-square items-center justify-center rounded-lg border border-game-night-border bg-game-night-canvas/95 p-2 shadow-inner">
                      <PokemonRaritySprite
                        formId={preview.formId}
                        view={sprite.view}
                        rarity={effect.id}
                        alt={`${effect.label} ${previewName} ${sprite.label}`}
                        className="h-full w-full max-h-28 max-w-28 sm:max-h-32 sm:max-w-32"
                        sizes="(max-width: 640px) 28vw, 128px"
                      />
                    </div>
                    <figcaption>
                      <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-game-ink">
                        {sprite.label}
                      </span>
                      <span className="mt-0.5 block text-[10px] leading-tight text-game-muted">
                        {sprite.description}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
