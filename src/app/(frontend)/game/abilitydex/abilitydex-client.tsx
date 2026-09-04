'use client'

import { BookOpen, CircleHelp, Search, Sparkles, X } from 'lucide-react'
import Image from 'next/image'
import type { CSSProperties } from 'react'
import { useMemo, useState } from 'react'
import { List, type RowComponentProps, useDynamicRowHeight } from 'react-window'
import {
  DexCountSummary,
  DexEmptyState,
  DexFilterBar,
  DexInspectorSection,
  DexPageShell,
  DexStatusChip,
} from '@/components/game/dex'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResponsivePanel } from '@/components/ui/responsive-panel'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import {
  type AbilityDexView,
  type DisplayAbility,
  getAbilityDexDisplayEntries,
} from '@/utilities/pokemon/abilitydex-view'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'

type PokedexProgressByForm = Record<
  string,
  { seen?: boolean | null; caught?: boolean | null }
>
type AbilityListData = {
  abilities: DisplayAbility[]
  entriesByForm: PokedexProgressByForm
  selectedAbilityId?: string
  onSelect: (ability: DisplayAbility) => void
}

const UNIVERSAL_ABILITY_REPRESENTATIVE: AbilityDexLearner = {
  speciesId: 132,
  form: { id: '132', name: 'Ditto' },
}

export default function AbilityDexPage() {
  const { gameData } = useUser()
  const { entriesByForm } = usePokedex()
  const [selectedView, setSelectedView] = useState<AbilityDexView>('known')
  const [query, setQuery] = useState('')
  const [selectedAbility, setSelectedAbility] = useState<DisplayAbility | null>(
    null,
  )

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
  const displayedAbilities = useMemo(
    () =>
      getAbilityDexDisplayEntries({
        entries: ALL_ABILITY_DEX_ENTRIES,
        registeredAbilityIds,
        view: selectedView,
        query,
      }),
    [query, registeredAbilityIds, selectedView],
  )
  const dynamicRowHeight = useDynamicRowHeight({
    defaultRowHeight: 88,
    key: `${selectedView}:${query}`,
  })

  return (
    <DexPageShell
      title="AbilityDex"
      subtitle={`${knownAbilityCount} of ${ALL_ABILITY_DEX_ENTRIES.length} registered`}
    >
      <Tabs
        value={selectedView}
        onValueChange={(value) => setSelectedView(value as AbilityDexView)}
      >
        <TabsList className="grid h-auto min-h-11 w-full grid-cols-2">
          <TabsTrigger value="known">Known abilities</TabsTrigger>
          <TabsTrigger value="all">All discoveries</TabsTrigger>
        </TabsList>
      </Tabs>

      <DexFilterBar
        label="Ability filters"
        className="mt-3"
        footer={
          <>
            <Search className="size-3.5 text-game-muted" aria-hidden="true" />
            <DexCountSummary
              count={displayedAbilities.length}
              detail={
                selectedView === 'all' && query
                  ? 'unknown records hide their names from search'
                  : undefined
              }
            />
            {query ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setQuery('')}
                className="ml-auto min-h-8 px-2 text-xs"
              >
                <X className="size-3.5" aria-hidden="true" />
                Clear
              </Button>
            ) : null}
          </>
        }
      >
        <label htmlFor="abilitydex-search" className="text-xs text-game-muted">
          Search registered abilities
        </label>
        <div className="relative mt-2">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-game-muted"
            aria-hidden="true"
          />
          <Input
            id="abilitydex-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search ability names"
            className="pl-9"
          />
        </div>
      </DexFilterBar>

      <section className="mt-3 min-h-0 flex-1" aria-label="Ability records">
        {displayedAbilities.length ? (
          <List
            rowComponent={AbilityListRow}
            rowCount={displayedAbilities.length}
            rowHeight={dynamicRowHeight}
            rowProps={{
              abilities: displayedAbilities,
              entriesByForm,
              selectedAbilityId: selectedAbility?.entry.abilityId,
              onSelect: setSelectedAbility,
            }}
            rowKey={(index, data) =>
              data.abilities[index]?.entry.abilityId ?? index
            }
            overscanCount={6}
            defaultHeight={560}
            className="custom-scrollbar"
            style={{ height: '100%', minHeight: 260 }}
          />
        ) : (
          <DexEmptyState
            title={
              selectedView === 'known'
                ? 'No registered abilities match'
                : 'No ability records match'
            }
            description="Clear the search to return to your field notes."
            action={
              query ? (
                <Button variant="outline" onClick={() => setQuery('')}>
                  Clear search
                </Button>
              ) : undefined
            }
          />
        )}
      </section>

      <ResponsivePanel
        open={selectedAbility !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedAbility(null)
        }}
        title={
          selectedAbility?.isKnown
            ? selectedAbility.entry.ability.name
            : 'Unregistered ability'
        }
        description={
          selectedAbility?.isKnown
            ? 'Ability field note and compatible Pokémon forms.'
            : 'Find a Pokémon with this ability to complete the record.'
        }
        desktopBreakpoint="lg"
        desktopWidth="min(42vw, 620px)"
        className="overflow-hidden"
      >
        <div className="game-page-scroll min-h-0 flex-1 space-y-6 px-5 py-4">
          {selectedAbility?.isKnown ? (
            <>
              <AbilityDexSummary entry={selectedAbility.entry} />
              <AbilityDexLearnerList
                ability={selectedAbility.entry.ability}
                entriesByForm={entriesByForm}
              />
            </>
          ) : selectedAbility ? (
            <DexEmptyState
              title="Ability not registered"
              description="Catch, receive, or purchase a Pokémon with this ability to reveal its field note."
              className="mt-2"
            />
          ) : null}
        </div>
      </ResponsivePanel>
    </DexPageShell>
  )
}

function AbilityListRow({
  index,
  style,
  ariaAttributes,
  abilities,
  entriesByForm,
  selectedAbilityId,
  onSelect,
}: RowComponentProps<AbilityListData>) {
  const ability = abilities[index]
  if (!ability) return null

  return (
    <div style={style as CSSProperties} {...ariaAttributes} className="pb-2">
      <AbilityDexListItem
        entry={ability.entry}
        isKnown={ability.isKnown}
        isSelected={selectedAbilityId === ability.entry.abilityId}
        recordNumber={index + 1}
        entriesByForm={entriesByForm}
        onSelect={() => onSelect(ability)}
      />
    </div>
  )
}

function AbilityDexListItem({
  entry,
  isKnown,
  isSelected,
  recordNumber,
  entriesByForm,
  onSelect,
}: {
  entry: AbilityDexEntry
  isKnown: boolean
  isSelected: boolean
  recordNumber: number
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
        isKnown
          ? `View ${entry.ability.name}`
          : `Unknown ability record ${recordNumber}`
      }
      aria-pressed={isSelected}
      onClick={onSelect}
      className={cn(
        'game-focus-ring group flex h-full min-h-20 w-full items-center gap-3 overflow-hidden rounded-xl border px-3 py-2.5 text-left transition-colors sm:px-4',
        isSelected
          ? 'border-game-moss bg-game-moss/10 ring-1 ring-game-moss/30'
          : isKnown
            ? 'border-game-border bg-game-surface hover:border-game-moss/40 hover:bg-game-surface-raised'
            : 'border-dashed border-game-border-strong bg-game-surface/55 hover:bg-game-surface',
      )}
    >
      <div className="relative flex size-12 shrink-0 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised">
        {representative ? (
          <Image
            src={getPokemonImageUrl(representative.form.id, 'sprite')}
            alt=""
            fill
            sizes="48px"
            className="object-contain p-1"
            style={{
              filter: isKnown ? undefined : 'grayscale(1) opacity(0.65)',
            }}
          />
        ) : isKnown ? (
          <Sparkles className="size-6 text-game-ochre" aria-hidden="true" />
        ) : (
          <CircleHelp className="size-6 text-game-muted" aria-hidden="true" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h2
          className={cn(
            'truncate font-display text-base font-semibold',
            isKnown ? 'text-game-ink' : 'text-game-muted',
          )}
        >
          {isKnown ? entry.ability.name : 'Unknown ability'}
        </h2>
        <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-game-muted sm:text-sm">
          {isKnown
            ? entry.ability.description
            : 'Register this ability to reveal its field note.'}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <DexStatusChip tone={isKnown ? 'registered' : 'unknown'}>
          {isKnown ? 'Registered' : 'Unknown'}
        </DexStatusChip>
        <BookOpen className="size-4 text-game-muted" aria-hidden="true" />
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
    <>
      <article className="game-panel-raised min-w-0 p-4 sm:p-5">
        <header className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-game-ochre/30 bg-game-ochre/10">
            <Sparkles className="size-6 text-game-ochre" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="game-field-label mb-1.5">Ability field note</p>
            <h2 className="font-display text-xl font-semibold text-game-ink">
              {ability.name}
            </h2>
          </div>
        </header>
        <p className="mt-4 border-t border-game-border pt-4 text-sm leading-relaxed text-game-ink">
          {ability.description}
        </p>
      </article>

      {partnerEffects.length ? (
        <DexInspectorSection title="Partner effect">
          <ul className="space-y-2 rounded-lg border border-game-moss/25 bg-game-moss/10 p-4">
            {partnerEffects.map((effect) => (
              <li
                key={effect.id}
                className="text-sm leading-relaxed text-game-moss-strong"
              >
                {effect.text}
              </li>
            ))}
          </ul>
        </DexInspectorSection>
      ) : null}
    </>
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
    <DexInspectorSection title="Supported forms">
      {allPokemon ? (
        <div className="game-panel p-4 text-sm leading-relaxed text-game-ink">
          Any Pokémon can hold this ability.
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {learners.map((learner) => (
            <AbilityDexLearnerRow
              key={`${learner.speciesId}-${learner.form.id}`}
              learner={learner}
              progress={entriesByForm[learner.form.id]}
            />
          ))}
        </ul>
      )}
    </DexInspectorSection>
  )
}

function AbilityDexLearnerRow({
  learner,
  progress,
}: {
  learner: AbilityDexLearner
  progress?: { seen?: boolean | null; caught?: boolean | null }
}) {
  const hasSeen = !!(progress?.seen || progress?.caught)
  const hasCaught = !!progress?.caught

  return (
    <li className="game-panel flex min-h-16 items-center gap-3 p-2.5">
      <div className="relative flex size-11 shrink-0 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised">
        {hasSeen ? (
          <Image
            src={getPokemonImageUrl(learner.form.id, 'sprite')}
            alt=""
            fill
            sizes="44px"
            className="object-contain p-1"
            style={{
              filter: hasCaught ? undefined : 'grayscale(1) opacity(0.75)',
            }}
          />
        ) : (
          <CircleHelp className="size-5 text-game-muted" aria-hidden="true" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-game-ink">
          {hasSeen
            ? learner.form.name
            : `Unknown Pokémon #${learner.speciesId}`}
        </p>
        <p className="mt-0.5 text-xs text-game-muted">
          {hasCaught ? 'Caught' : hasSeen ? 'Observed' : 'Not observed'}
        </p>
      </div>
    </li>
  )
}
