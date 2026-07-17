'use client'

import { CircleHelp, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { PremiumHeader } from '@/components/game/shared/PremiumHeader'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { SectionDivider } from '@/components/ui/section-divider'
import { useUser } from '@/context/UserContext'
import { usePokedex } from '@/hooks/usePokedex'
import { cn } from '@/lib/utils'
import {
  type AbilityDexEntry,
  type AbilityDexLearner,
  ALL_ABILITY_DEX_ENTRIES,
  getAbilityDexPartnerEffectLines,
  getAbilityLearnersForAbility,
} from '@/utilities/pokemon/abilitydex'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'

type PokedexProgressByForm = Record<
  string,
  {
    seen?: boolean | null
    caught?: boolean | null
  }
>

const UNIVERSAL_ABILITY_REPRESENTATIVE: AbilityDexLearner = {
  speciesId: 132,
  form: {
    id: '132',
    name: 'Ditto',
  },
}

export default function AbilityDexPage() {
  const { gameData } = useUser()
  const { entriesByForm } = usePokedex()
  const [selectedAbility, setSelectedAbility] = useState<{
    entry: AbilityDexEntry
    isKnown: boolean
  } | null>(null)

  const registeredAbilityIds = useMemo(
    () =>
      new Set(
        (gameData?.abilityDex || [])
          .filter((entry) => entry.registered)
          .map((entry) => entry.abilityId),
      ),
    [gameData?.abilityDex],
  )

  const knownAbilityCount = registeredAbilityIds.size

  return (
    <div className="game-paper-first game-paper-texture flex h-full flex-col overflow-hidden bg-game-canvas text-game-ink">
      <PremiumHeader
        title="AbilityDex"
        subtitle={`${knownAbilityCount} / ${ALL_ABILITY_DEX_ENTRIES.length}`}
      />

      <div className="flex-1 min-h-0 overflow-y-auto px-4 pt-4 md:px-6">
        <div className="grid grid-cols-2 gap-2 pb-8 2xl:grid-cols-3">
          {ALL_ABILITY_DEX_ENTRIES.map((entry) => {
            const isKnown = registeredAbilityIds.has(entry.abilityId)
            return (
              <AbilityDexListItem
                key={entry.abilityId}
                entry={entry}
                isKnown={isKnown}
                entriesByForm={entriesByForm}
                onSelect={() => setSelectedAbility({ entry, isKnown })}
              />
            )
          })}
        </div>
      </div>

      <Dialog
        open={selectedAbility !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedAbility(null)
        }}
      >
        <DialogContent className="max-h-[88dvh] overflow-hidden border-game-border bg-game-surface p-0 text-game-ink sm:max-w-xl">
          <DialogHeader className="border-b border-game-border px-5 pb-4 pt-5">
            <DialogTitle className="font-display text-game-ink">
              {selectedAbility
                ? selectedAbility.isKnown
                  ? selectedAbility.entry.ability.name
                  : 'Ability Not Registered'
                : 'Ability Details'}
            </DialogTitle>
            <DialogDescription>
              {selectedAbility?.isKnown
                ? 'Known ability details and compatible Pokemon forms.'
                : 'Catch, receive, or purchase a Pokemon with this ability to register it.'}
            </DialogDescription>
          </DialogHeader>

          {selectedAbility?.isKnown && (
            <div className="space-y-6 overflow-y-auto px-5 py-4 custom-scrollbar">
              <AbilityDexSummary entry={selectedAbility.entry} />
              <AbilityDexLearnerList
                ability={selectedAbility.entry.ability}
                entriesByForm={entriesByForm}
              />
            </div>
          )}

          {selectedAbility && !selectedAbility.isKnown && (
            <div className="space-y-4 overflow-y-auto px-5 py-4 custom-scrollbar">
              <div className="game-panel p-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-game-border bg-game-surface-raised">
                    <CircleHelp className="h-7 w-7 text-game-muted" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg font-bold text-game-ink">
                      Unknown Ability
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-game-muted">
                      This ability has not been seen on one of your Pokemon yet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function AbilityDexListItem({
  entry,
  isKnown,
  entriesByForm,
  onSelect,
}: {
  entry: AbilityDexEntry
  isKnown: boolean
  entriesByForm: PokedexProgressByForm
  onSelect: () => void
}) {
  const representative = getAbilityDexRepresentativeLearner(
    entry,
    entriesByForm,
    isKnown,
  )

  return (
    <button
      type="button"
      aria-label={
        isKnown ? `View ${entry.ability.name}` : 'Unknown ability'
      }
      onClick={onSelect}
      className={cn(
        'group relative flex min-h-16 w-full items-center gap-3 overflow-hidden rounded-lg border px-3 py-2.5 text-left transition-colors sm:px-4',
        isKnown
          ? 'border-game-border bg-game-surface hover:border-game-ochre/45 hover:bg-game-surface-raised'
          : 'border-game-border bg-game-surface/60 hover:border-game-moss/30 hover:bg-game-surface',
      )}
      title={isKnown ? entry.ability.name : 'Unknown Ability'}
    >
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised">
        {representative ? (
          <Image
            src={getPokemonImageUrl(representative.form.id, 'sprite')}
            alt={representative.form.name}
            fill
            sizes="44px"
            className="object-contain p-1"
            style={{
              filter: isKnown ? undefined : 'grayscale(1) opacity(0.65)',
            }}
          />
        ) : (
          <CircleHelp className="h-6 w-6 text-game-muted" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        {isKnown ? (
          <h3 className="truncate text-sm font-bold text-game-ink sm:text-base">
            {entry.ability.name}
          </h3>
        ) : (
          <h3 className="text-sm font-bold text-game-muted sm:text-base">
            ???
          </h3>
        )}
        <p className="mt-1 truncate text-xs font-bold text-game-muted">
          {isKnown ? 'Registered' : 'Unknown'}
        </p>
      </div>
    </button>
  )
}

function getAbilityDexRepresentativeLearner(
  entry: AbilityDexEntry,
  entriesByForm: PokedexProgressByForm,
  isKnown: boolean,
): AbilityDexLearner | null {
  const { learners, allPokemon } = getAbilityLearnersForAbility(entry.ability)
  if (allPokemon) return UNIVERSAL_ABILITY_REPRESENTATIVE
  if (learners.length === 0) return null
  if (isKnown) return learners[0]

  return (
    learners.find((learner) => {
      const progress = entriesByForm[learner.form.id]
      return !!(progress?.seen || progress?.caught)
    }) ?? null
  )
}

function AbilityDexSummary({ entry }: { entry: AbilityDexEntry }) {
  const ability = entry.ability
  const partnerEffects = getAbilityDexPartnerEffectLines(ability)

  return (
    <div className="space-y-4">
      <SectionDivider>Ability data</SectionDivider>
      <div className="game-panel p-4">
        <div className="flex items-start gap-4">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised">
            <Sparkles className="h-7 w-7 text-game-ochre" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-xl font-semibold text-game-ink">
              {ability.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-game-muted">
              {ability.description}
            </p>
          </div>
        </div>
      </div>

      {partnerEffects.length > 0 && (
        <>
          <SectionDivider>Partner effect</SectionDivider>
          <div className="rounded-lg border border-game-moss/25 bg-game-moss/10 p-4">
            <ul className="space-y-2">
              {partnerEffects.map((effect) => (
                <li
                  key={effect.id}
                  className="text-sm leading-relaxed text-game-moss-strong"
                >
                  {effect.text}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

function AbilityDexLearnerList({
  ability,
  entriesByForm,
}: {
  ability: AbilityDexEntry['ability']
  entriesByForm: PokedexProgressByForm
}) {
  const { learners, allPokemon } = useMemo(
    () => getAbilityLearnersForAbility(ability),
    [ability],
  )

  return (
    <div className="space-y-4">
      <SectionDivider>Supported forms</SectionDivider>
      <div className="game-panel p-3">
        {allPokemon ? (
          <p className="text-sm text-game-ink">
            Any Pokemon can hold this ability.
          </p>
        ) : (
          <div className="max-h-[min(22rem,45dvh)] overflow-y-auto pr-1 custom-scrollbar">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(4.5rem,4.5rem))] justify-start gap-2">
              {learners.map((learner) => (
                <AbilityDexLearnerTile
                  key={`${learner.speciesId}-${learner.form.id}`}
                  learner={learner}
                  progress={entriesByForm[learner.form.id]}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function AbilityDexLearnerTile({
  learner,
  progress,
}: {
  learner: AbilityDexLearner
  progress?: {
    seen?: boolean | null
    caught?: boolean | null
  }
}) {
  const hasSeen = !!(progress?.seen || progress?.caught)
  const hasCaught = !!progress?.caught

  return (
    <div
      className={cn(
        'relative h-[4.5rem] w-[4.5rem] overflow-hidden rounded-lg border bg-game-surface-raised p-1.5',
        hasCaught
          ? 'border-game-moss/40'
          : hasSeen
            ? 'border-game-border-strong'
            : 'border-game-border',
      )}
      title={hasSeen ? learner.form.name : 'Unknown Pokemon'}
    >
      {hasSeen ? (
        <Image
          src={getPokemonImageUrl(learner.form.id, 'sprite')}
          alt={learner.form.name}
          fill
          sizes="80px"
          className="object-contain p-1"
          style={{
            filter: hasCaught ? undefined : 'grayscale(1) opacity(0.75)',
          }}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-game-muted">
              <span className="text-2xl font-bold text-game-muted">?</span>
        </div>
      )}

      <div className="absolute inset-x-1 bottom-1 rounded bg-game-surface/90 px-1 py-0.5 text-center font-mono text-[10px] font-bold leading-none text-game-muted">
        #{learner.speciesId}
      </div>
    </div>
  )
}
