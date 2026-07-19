'use client'

import {
  ArrowUp,
  CircleDot,
  CircleHelp,
  Eye,
  FlaskConical,
  List,
  Loader2,
  Mars,
  Ruler,
  Venus,
  Weight,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react'
import { useInView } from 'react-intersection-observer'
import { toast } from 'sonner'
import { GameErrorBoundary } from '@/components/game/GameErrorBoundary'
import { PremiumHeader } from '@/components/game/shared/PremiumHeader'
import { PremiumSearch } from '@/components/game/shared/PremiumSearch'
import { PremiumSelect } from '@/components/game/shared/PremiumSelect'
import { SecondaryControlBar } from '@/components/game/shared/SecondaryControlBar'
import { STANCE_ICON_CONFIG } from '@/components/game/shared/stance-icon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ItemSprite } from '@/components/ui/item-sprite'
import { PageHeader } from '@/components/ui/page-header'
import { ResponsivePanel } from '@/components/ui/responsive-panel'
import { SectionDivider } from '@/components/ui/section-divider'
import { StatBar } from '@/components/ui/stat-bar'
import { useUser } from '@/context/UserContext'
import { items } from '@/data/items'
import { getAllMoves } from '@/data/moves'
import type { MoveConfig } from '@/data/moves/types'
import type {
  PokemonData,
  PokemonForm,
  PokemonSpecies,
} from '@/data/pokemon-data'
import pokemonData from '@/data/pokemon-data'
import type { PokedexEntry } from '@/hooks/usePokedex'
import { usePokedex } from '@/hooks/usePokedex'
import { useTCG } from '@/hooks/useTCG'
import { cn } from '@/lib/utils'
import {
  getMostLikelyStanceForPokemonForm,
  POKEDEX_STANCE_REFERENCE_LEVEL,
} from '@/utilities/battle/ai-logic'
import type { BattleStance } from '@/utilities/battle/types'
import {
  getMoveDisplayType,
  getMoveInfoTags,
  getMoveLevel,
  getMoveTmItem,
  getMoveTypeSpriteItemId,
} from '@/utilities/pokemon/move-display'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import { getPokemonTypeIconUrl } from '@/utilities/pokemon/sprite-proxy'
import {
  getMaxResearchLevelForXp,
  getPokemonResearchLevelTmUnlocks,
  MAX_RESEARCH_LEVEL,
  RESEARCH_LEVEL_REWARDS,
  RESEARCH_LEVEL_THRESHOLDS,
} from '@/utilities/research/research-levels'
import { getCardsByPokedexNumber } from '@/utilities/tcg/tcg'
import { ResearchLevelUpModal } from './_components/ResearchLevelUpModal'

const typeIdMap: Record<string, number> = {
  normal: 1,
  fighting: 2,
  flying: 3,
  poison: 4,
  ground: 5,
  rock: 6,
  bug: 7,
  ghost: 8,
  steel: 9,
  fire: 10,
  water: 11,
  grass: 12,
  electric: 13,
  psychic: 14,
  ice: 15,
  dragon: 16,
  dark: 17,
  fairy: 18,
  stellar: 19,
  unknown: 10001,
  shadow: 10002,
}

const POKEDEX_HABITAT_BACKGROUNDS: Record<string, string> = {
  cave: '/backgrounds/cave.avif',
  forest: '/backgrounds/forest.avif',
  grassland: '/backgrounds/grassy-route.avif',
  mountain: '/backgrounds/mountain-sky.avif',
  rare: '/backgrounds/crystal-stadium.avif',
  'rough terrain': '/backgrounds/rocky-path.avif',
  sea: '/backgrounds/epic-ocean.avif',
  urban: '/backgrounds/modern-city.avif',
  "water's edge": '/backgrounds/pond.avif',
}

const ALL_POKEDEX_MOVES_BY_ID = Object.fromEntries(
  getAllMoves().map((move) => [move.id, move]),
)

function getPokedexHabitatBackground(habitat?: string) {
  const key = habitat?.toLowerCase().trim()
  return key
    ? POKEDEX_HABITAT_BACKGROUNDS[key] || '/backgrounds/pokedex.avif'
    : '/backgrounds/pokedex.avif'
}

// Pre-compute all types at module level (static data)
const ALL_POKEMON_TYPES = (() => {
  const types = new Set<string>()
  for (const species of pokemonData as PokemonData) {
    for (const form of species.forms) {
      form.types.forEach((type) => types.add(type))
    }
  }
  return Array.from(types).sort()
})()

// Initial batch size for progressive loading
const INITIAL_BATCH_SIZE = 100
const BATCH_INCREMENT = 100

export default function Pokedex() {
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<number | null>(
    null,
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH_SIZE)
  const {
    entriesByForm,
    isLoading: progressLoading,
    error: progressError,
    summary,
  } = usePokedex()
  const { entriesByCard } = useTCG()
  const { gameData } = useUser()
  const inventoryMap = useMemo(
    () =>
      Object.fromEntries(
        (gameData?.inventory || []).map((item) => [item.itemId, item.quantity]),
      ) as Record<string, number>,
    [gameData?.inventory],
  )

  // Intersection observer for infinite scroll
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: '200px',
  })

  // Load more items when scrolled to bottom
  useEffect(() => {
    if (inView) {
      setVisibleCount((prev) => prev + BATCH_INCREMENT)
    }
  }, [inView])

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(INITIAL_BATCH_SIZE)
  }, [searchQuery, selectedType])

  // Memoized handler for selecting species
  const handleSelectSpecies = useCallback((id: number) => {
    setSelectedSpeciesId(id)
  }, [])

  // Handler for closing drawer
  const handleCloseDrawer = useCallback((open: boolean) => {
    if (!open) setSelectedSpeciesId(null)
  }, [])

  // Filter species based on search and type
  const filteredSpecies = useMemo(() => {
    return (pokemonData as PokemonData).filter((species) => {
      const baseForm = species.forms.find((f) => f.form === 'base')
      if (!baseForm) return false

      // Filter by type
      if (
        selectedType &&
        selectedType !== 'all' &&
        !baseForm.types.includes(selectedType)
      ) {
        return false
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          baseForm.name.toLowerCase().includes(query) ||
          species.id.toString() === query
        )
      }

      return true
    })
  }, [searchQuery, selectedType])

  // Slice to show only visible items (progressive loading)
  const visibleSpecies = useMemo(() => {
    return filteredSpecies.slice(0, visibleCount)
  }, [filteredSpecies, visibleCount])

  const hasMoreToLoad = visibleCount < filteredSpecies.length

  // Get selected species details
  const selectedSpecies = useMemo(() => {
    if (!selectedSpeciesId) return null
    return (pokemonData as PokemonData).find((s) => s.id === selectedSpeciesId)
  }, [selectedSpeciesId])

  const selectedBaseForm = selectedSpecies?.forms.find((f) => f.form === 'base')
  const baseProgress = selectedBaseForm
    ? entriesByForm[selectedBaseForm.id]
    : undefined
  const isBaseSeen = !!(baseProgress?.seen || baseProgress?.caught)

  const relatedTcgCards = useMemo(() => {
    if (!selectedSpecies) {
      return []
    }
    // Only show cards that the user owns
    return getCardsByPokedexNumber(selectedSpecies.id).filter((card) => {
      const entry = entriesByCard[card.id]
      return entry && entry.quantity > 0
    })
  }, [selectedSpecies, entriesByCard])

  // Ensure data exists
  if (!pokemonData || (pokemonData as PokemonData).length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-game-muted">
        Pokemon data not available. Please verify the installation.
      </div>
    )
  }

  return (
    <GameErrorBoundary>
      <div className="game-paper-first game-paper-background flex h-full flex-col overflow-hidden bg-game-canvas text-game-ink">
        <PremiumHeader title="Pokédex" subtitle="Specimen index" />

        <div className="hidden items-center gap-3 border-b border-game-border bg-game-surface/70 px-6 py-3 xl:flex">
          <div className="min-w-0 flex-1">
            <PremiumSearch
              placeholder="Search Pokédex"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              showClear={!!searchQuery}
              onClear={() => setSearchQuery('')}
            />
          </div>
          <div className="w-52 shrink-0">
            <PremiumSelect
              value={selectedType}
              onValueChange={setSelectedType}
              options={[
                { id: 'all', label: 'All Types' },
                ...ALL_POKEMON_TYPES.map((type) => ({
                  id: type,
                  label: type.charAt(0).toUpperCase() + type.slice(1),
                })),
              ]}
            />
          </div>
        </div>

        {/* Main Content - Scrollable with padding */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 md:px-6 pt-4">
          {/* Progress Stats Header */}
          <div className="mb-4">
            <SectionDivider className="mb-0 flex-1">
              <div className="flex items-center gap-6">
                {progressLoading ? (
                  <span className="text-sm text-game-muted">Loading…</span>
                ) : (
                  <>
                    <div className="flex items-center gap-2" title="Seen">
                      <Eye className="h-4 w-4 text-game-moss-strong" />
                      <span className="font-mono text-game-ink">
                        {summary.seen}
                      </span>
                    </div>
                    <div className="flex items-center gap-2" title="Caught">
                      <CircleDot className="h-4 w-4 text-game-ochre" />
                      <span className="font-mono text-game-ink">
                        {summary.caught}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </SectionDivider>
          </div>

          {progressError ? (
            <div className="game-folio-section mx-auto max-w-xl p-6 text-center">
              <p className="font-display text-lg font-semibold text-game-ink">
                The Pokédex records could not be opened
              </p>
              <p className="mt-2 text-sm text-game-muted">
                Check your connection and reopen this page.
              </p>
            </div>
          ) : visibleSpecies.length === 0 ? (
            <div className="game-folio-section mx-auto max-w-xl p-6 text-center">
              <p className="font-display text-lg font-semibold text-game-ink">
                No Pokémon match these notes
              </p>
              <p className="mt-2 text-sm text-game-muted">
                Clear the search or choose another type.
              </p>
              <Button
                className="mt-4"
                variant="outline"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedType('all')
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-2 pb-8 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 2xl:grid-cols-12">
              {visibleSpecies.map((species) => {
                const baseForm = species.forms.find((f) => f.form === 'base')
                if (!baseForm) return null

                const baseProgress = entriesByForm[baseForm.id]

                return (
                  <PokedexGridItem
                    key={species.id}
                    speciesId={species.id}
                    baseForm={baseForm}
                    baseProgress={baseProgress}
                    isSelected={selectedSpeciesId === species.id}
                    onSelect={handleSelectSpecies}
                  />
                )
              })}
            </div>
          )}

          {/* Load more trigger */}
          {hasMoreToLoad && (
            <div ref={loadMoreRef} className="flex justify-center py-4">
              <Loader2 className="h-5 w-5 animate-spin text-game-moss" />
            </div>
          )}
        </div>

        <SecondaryControlBar className="xl:hidden">
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(8rem,0.45fr)] gap-2">
            <PremiumSearch
              placeholder="Search Pokédex"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              showClear={!!searchQuery}
              onClear={() => setSearchQuery('')}
            />
            <PremiumSelect
              value={selectedType}
              onValueChange={setSelectedType}
              options={[
                { id: 'all', label: 'All Types' },
                ...ALL_POKEMON_TYPES.map((type) => ({
                  id: type,
                  label: type.charAt(0).toUpperCase() + type.slice(1),
                })),
              ]}
            />
          </div>
        </SecondaryControlBar>

        {/* Pokemon Details Drawer */}
        <ResponsivePanel
          open={!!selectedSpeciesId}
          onOpenChange={(open) => !open && handleCloseDrawer(false)}
          title={isBaseSeen ? selectedBaseForm?.name : 'Unknown Pokémon'}
          description={
            isBaseSeen
              ? `Details for ${selectedBaseForm?.name}`
              : 'Record details are not yet available.'
          }
          desktopWidth="min(42vw, 620px)"
          mobileHeader={false}
          className="game-paper-first game-paper-background flex flex-col gap-0 overflow-x-hidden bg-game-canvas p-0 text-game-ink"
        >
          {selectedSpecies && selectedBaseForm && (
            <div className="w-full overflow-y-auto flex-1 min-h-0 custom-scrollbar">
              {/* Forms Carousel */}
              <div className="w-full">
                {(() => {
                  const visibleForms = selectedSpecies.forms.filter((form) => {
                    const progress = entriesByForm[form.id]
                    const isSeen = !!(progress?.seen || progress?.caught)
                    return form.form === 'base' || isSeen
                  })

                  if (visibleForms.length === 1) {
                    const form = visibleForms[0]
                    return (
                      <div className="w-full">
                        <PokemonCard
                          pokemon={form}
                          species={selectedSpecies}
                          progress={entriesByForm[form.id]}
                          inventoryMap={inventoryMap}
                        />
                      </div>
                    )
                  }

                  return (
                    <div className="w-full relative">
                      <Carousel
                        className="w-full"
                        opts={{ align: 'start', loop: true }}
                      >
                        <CarouselContent>
                          {visibleForms.map((form) => (
                            <CarouselItem key={form.id} className="basis-full">
                              <PokemonCard
                                pokemon={form}
                                species={selectedSpecies}
                                progress={entriesByForm[form.id]}
                                inventoryMap={inventoryMap}
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <div className="hidden sm:block">
                          <CarouselPrevious className="left-4 border-game-border bg-game-surface/90 text-game-ink backdrop-blur-md hover:bg-game-surface-raised hover:text-game-moss-strong" />
                          <CarouselNext className="right-4 border-game-border bg-game-surface/90 text-game-ink backdrop-blur-md hover:bg-game-surface-raised hover:text-game-moss-strong" />
                        </div>
                      </Carousel>
                    </div>
                  )
                })()}
              </div>
            </div>
          )}
        </ResponsivePanel>
      </div>
    </GameErrorBoundary>
  )
}

function PokemonCard({
  pokemon,
  species,
  progress,
  inventoryMap,
}: {
  pokemon: PokemonForm
  species: PokemonSpecies
  progress?: PokedexEntry
  inventoryMap: Record<string, number>
}) {
  const hasSeen = !!(progress?.seen || progress?.caught)
  const hasCaught = !!progress?.caught
  const hasGenderToggle = hasSeen && species.has_gender_differences
  const habitatBackground = getPokedexHabitatBackground(
    hasSeen ? species.habitat : undefined,
  )
  const [displayGender, setDisplayGender] = useState<'male' | 'female'>('male')

  useEffect(() => {
    setDisplayGender('male')
  }, [pokemon.id])

  return (
    <div className="relative h-full overflow-hidden bg-game-canvas text-game-ink">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-72 bg-cover bg-center opacity-60"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(23,39,51,0.08), rgba(239,228,207,0.5) 56%, var(--game-canvas) 100%), url(${habitatBackground})`,
        }}
      />
      <div className="relative z-10 space-y-6 p-5 md:p-6">
        {/* Image Display */}
        <div className="relative mx-auto -mt-6 mb-2 h-56 w-56 p-4 md:h-64 md:w-64">
          <div className="relative w-full h-full flex items-center justify-center">
            <PokemonImage
              formId={pokemon.id}
              pokemonName={pokemon.name}
              progress={progress}
              gender={hasGenderToggle ? displayGender : undefined}
            />
          </div>
          {hasGenderToggle && (
            <div className="absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 overflow-hidden rounded-full border border-game-border bg-game-surface/90 p-1 shadow-sm backdrop-blur-md">
              <button
                type="button"
                aria-label="Show male form"
                aria-pressed={displayGender === 'male'}
                title="Male"
                onClick={() => setDisplayGender('male')}
                className={cn(
                  'game-focus-ring flex h-10 w-10 items-center justify-center rounded-full text-game-muted transition-colors hover:text-game-moss-strong',
                  displayGender === 'male' &&
                    'bg-game-moss/12 text-game-moss-strong',
                )}
              >
                <Mars className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Show female form"
                aria-pressed={displayGender === 'female'}
                title="Female"
                onClick={() => setDisplayGender('female')}
                className={cn(
                  'game-focus-ring flex h-10 w-10 items-center justify-center rounded-full text-game-muted transition-colors hover:text-game-clay-strong',
                  displayGender === 'female' &&
                    'bg-game-clay/12 text-game-clay-strong',
                )}
              >
                <Venus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <div className="text-center w-full space-y-2">
          <h3 className="font-display text-3xl font-semibold text-game-ink">
            {hasSeen ? pokemon.name : '???'}
          </h3>
          {hasSeen && pokemon.form !== 'base' && (
            <div className="flex items-center justify-center gap-2">
              <span className="h-px w-3 bg-game-ochre/45" />
              <p className="text-xs font-medium text-game-moss-strong">
                {pokemon.form.replace(/-/g, ' ')}
              </p>
              <span className="h-px w-3 bg-game-ochre/45" />
            </div>
          )}
          {hasSeen && progress?.preferredBattleStance && (
            <div className="flex flex-col items-center gap-2">
              <PreferredStanceBadge
                stance={progress.preferredBattleStance}
                pokemon={pokemon}
              />
              <ObservedMoveListButton
                pokemon={pokemon}
                inventoryMap={inventoryMap}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-game-border bg-game-surface p-4">
            <SectionDivider className="mb-2">Seen</SectionDivider>
            <div className="flex items-center justify-center gap-2">
              <Eye className="h-3 w-3 text-game-moss-strong" />
              <span className="font-mono font-bold text-game-ink">
                {progress?.totalSeen || 0}
              </span>
            </div>
          </div>
          <div className="rounded-lg border border-game-border bg-game-surface p-4">
            <SectionDivider className="mb-2">Caught</SectionDivider>
            <div className="flex items-center justify-center gap-2">
              <CircleDot className="h-3 w-3 text-game-ochre" />
              <span className="font-mono font-bold text-game-ink">
                {progress?.totalCaught || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Types & Bio */}
        <div className="space-y-6">
          <div className="flex gap-3 justify-center">
            {hasSeen ? (
              pokemon.types.map((type: string) => {
                const typeId = typeIdMap[type.toLowerCase()]
                return typeId ? (
                  <div key={type}>
                    <Image
                      src={getPokemonTypeIconUrl(typeId)}
                      alt={type}
                      width={64}
                      height={28}
                      className="h-4 w-auto object-contain"
                      unoptimized
                    />
                  </div>
                ) : (
                  <Badge
                    key={type}
                    variant="secondary"
                    className="border-game-border bg-game-surface-raised px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-game-ink"
                  >
                    {type}
                  </Badge>
                )
              })
            ) : (
              <Badge
                variant="secondary"
                className="border-game-border bg-game-surface-raised px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-game-muted"
              >
                ???
              </Badge>
            )}
          </div>

          {hasCaught && (
            <div className="flex items-center justify-center gap-12">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-game-muted">
                  Height
                </span>
                <div className="flex items-center gap-2">
                  <Ruler className="h-3 w-3 text-game-moss-strong" />
                  <span className="font-mono font-bold text-game-ink">
                    {(pokemon.height / 10).toFixed(1)}m
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-game-muted">
                  Weight
                </span>
                <div className="flex items-center gap-2">
                  <Weight className="h-3 w-3 text-game-moss-strong" />
                  <span className="font-mono font-bold text-game-ink">
                    {(pokemon.weight / 10).toFixed(1)}kg
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="space-y-4">
          <SectionDivider>Base stats</SectionDivider>
          <div className="space-y-3 rounded-lg border border-game-border bg-game-surface p-4">
            {[
              { label: 'HP', value: pokemon.stats.hp, color: 'bg-game-danger' },
              {
                label: 'ATK',
                value: pokemon.stats.attack,
                color: 'bg-game-clay',
              },
              {
                label: 'DEF',
                value: pokemon.stats.defense,
                color: 'bg-game-ochre',
              },
              {
                label: 'SPA',
                value: pokemon.stats['special-attack'],
                color: 'bg-game-moss',
              },
              {
                label: 'SPD',
                value: pokemon.stats['special-defense'],
                color: 'bg-game-moss-strong',
              },
              {
                label: 'SPE',
                value: pokemon.stats.speed,
                color: 'bg-game-clay-strong',
              },
            ].map((stat) => (
              <div key={stat.label} className="group flex items-center gap-4">
                <span className="w-8 text-[11px] font-bold uppercase text-game-muted">
                  {stat.label}
                </span>
                <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-game-canvas">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-700 opacity-75',
                      stat.color,
                    )}
                    style={{
                      width: `${Math.min((stat.value / 255) * 100, 100)}%`,
                    }}
                  />
                </div>
                <span className="w-8 text-right font-mono text-xs font-bold text-game-ink">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Research Level */}
        {hasCaught && (
          <ResearchSection
            formId={pokemon.id}
            pokemonName={pokemon.name}
            researchXp={progress?.researchXp || 0}
            researchLevel={progress?.researchLevel || 0}
          />
        )}

        {/* Special Badges */}
        <div className="flex flex-wrap gap-2 pt-4">
          {species.is_legendary && (
            <Badge className="rounded-full border-game-ochre/40 bg-game-ochre/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-game-ochre">
              Legendary
            </Badge>
          )}
          {species.is_mythical && (
            <Badge className="rounded-full border-game-moss-strong/35 bg-game-moss-strong/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-game-moss-strong">
              Mythical
            </Badge>
          )}
          {species.is_baby && (
            <Badge className="rounded-full border-game-clay-strong/35 bg-game-clay-strong/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-game-clay-strong">
              Baby
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}

function getPreferredStanceConfig(stance: BattleStance) {
  return {
    power: {
      Icon: STANCE_ICON_CONFIG.power.Icon,
      label: 'Power',
      className: 'border-game-clay/30 bg-game-clay/10 text-game-clay-strong',
      barClassName: 'bg-game-clay',
    },
    speed: {
      Icon: STANCE_ICON_CONFIG.speed.Icon,
      label: 'Speed',
      className:
        'border-game-stance-blue/35 bg-game-stance-blue/10 text-game-stance-blue-strong',
      barClassName: 'bg-game-stance-blue',
    },
    tech: {
      Icon: STANCE_ICON_CONFIG.tech.Icon,
      label: 'Tech',
      className: 'border-game-moss-strong/30 bg-game-moss-strong/10 text-game-moss-strong',
      barClassName: 'bg-game-moss-strong',
    },
  }[stance]
}

function PreferredStanceBadge({
  stance,
  pokemon,
}: {
  stance: BattleStance
  pokemon: PokemonForm
}) {
  const [level, setLevel] = useState(POKEDEX_STANCE_REFERENCE_LEVEL)
  const config = getPreferredStanceConfig(stance)
  const projected = useMemo(
    () => getMostLikelyStanceForPokemonForm(pokemon, level),
    [pokemon, level],
  )
  const projectedConfig = getPreferredStanceConfig(projected.stance)
  const Icon = config.Icon
  const ProjectedIcon = projectedConfig.Icon

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            'game-focus-ring mx-auto mt-3 inline-flex min-h-10 items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest',
            config.className,
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          Prefers {config.label} Attacks
        </button>
      </DialogTrigger>
      <DialogContent className="border-game-border bg-game-surface text-game-ink sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Battle observation</DialogTitle>
          <DialogDescription>
            Adjust the level to see how this Pokémon&apos;s preferred stance can
            shift.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div
            className={cn(
              'flex items-center justify-between rounded-lg border px-4 py-3',
              projectedConfig.className,
            )}
          >
            <div className="flex items-center gap-2">
              <ProjectedIcon className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-widest">
                {projectedConfig.label}
              </span>
            </div>
            <span className="font-mono text-sm font-bold">
              {projected.percentage}%
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-game-muted">
              <span>Level</span>
              <span className="font-mono text-game-ink">{level}</span>
            </div>
            <input
              type="range"
              min={1}
              max={100}
              value={level}
              onChange={(event) => setLevel(Number(event.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-game-canvas accent-game-moss"
            />
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.08em] text-game-muted">
              <span>1</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-game-canvas">
            <div
              className={cn(
                'h-full rounded-full transition-all',
                projectedConfig.barClassName,
              )}
              style={{ width: `${projected.percentage}%` }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function getCompatibleMovesForForm(formId: string): MoveConfig[] {
  return getAllMoves()
    .filter((move) => move.formId?.includes(formId) ?? false)
    .sort((a, b) => {
      const levelDiff = getMoveLevel(a) - getMoveLevel(b)
      if (levelDiff !== 0) return levelDiff
      return a.name.localeCompare(b.name)
    })
}

function ObservedMoveListButton({
  pokemon,
  inventoryMap,
}: {
  pokemon: PokemonForm
  inventoryMap: Record<string, number>
}) {
  const compatibleMoves = useMemo(
    () => getCompatibleMovesForForm(pokemon.id),
    [pokemon.id],
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="game-focus-ring inline-flex min-h-10 items-center gap-2 rounded-full border border-game-moss/25 bg-game-moss/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-game-moss-strong"
        >
          <List className="h-3.5 w-3.5" />
          Move notes
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[85dvh] overflow-hidden border-game-border bg-game-surface p-0 text-game-ink sm:max-w-md">
        <DialogHeader className="border-b border-game-border px-5 pt-5 pb-4">
          <DialogTitle>{pokemon.name} move notes</DialogTitle>
          <DialogDescription>
            Battle Observer data can identify compatible TMs by level order.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[65dvh] overflow-y-auto p-4 custom-scrollbar">
          {compatibleMoves.length === 0 ? (
            <div
              className="rounded-lg border border-dashed border-game-border bg-game-canvas px-4 py-6 text-center text-sm text-game-muted"
              role="status"
              aria-live="polite"
            >
              No compatible TMs authored.
            </div>
          ) : (
            <div className="space-y-2">
              {compatibleMoves.map((move) => (
                <ObservedMoveRow
                  key={move.id}
                  move={move}
                  inventoryMap={inventoryMap}
                />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ObservedMoveRow({
  move,
  inventoryMap,
}: {
  move: MoveConfig
  inventoryMap: Record<string, number>
}) {
  const tmItem = getMoveTmItem(move.id)
  const isKnown = tmItem ? (inventoryMap[tmItem.id] || 0) > 0 : false
  const tags = getMoveInfoTags(move)
  const type = getMoveDisplayType(move)

  return (
    <div
      className={cn(
        'rounded-lg border p-3 transition-colors',
        isKnown
          ? 'border-game-border bg-game-surface-raised'
          : 'border-game-border bg-game-canvas',
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-game-border bg-game-surface">
          {isKnown ? (
            <ItemSprite
              itemId={getMoveTypeSpriteItemId(move)}
              alt={`${type} TM`}
              width={34}
              height={34}
              className="h-8 w-8 object-contain"
            />
          ) : (
            <CircleHelp className="h-6 w-6 text-game-muted" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded bg-game-moss/10 px-1.5 py-0.5 font-mono text-[10px] font-bold leading-none text-game-moss-strong">
              Lv {getMoveLevel(move)}
            </span>
            <h4 className="truncate text-sm font-semibold text-game-ink">
              {isKnown ? move.name : 'TM Not found'}
            </h4>
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {(isKnown
              ? tags.slice(1, 5)
              : [{ label: 'Type', value: type }]
            ).map((tag) => (
              <span
                key={`${move.id}-${tag.label}-${tag.value}`}
                className="rounded-full border border-game-border bg-game-surface px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-game-muted"
              >
                {tag.value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ResearchSection({
  formId,
  pokemonName,
  researchXp,
  researchLevel,
}: {
  formId: string
  pokemonName: string
  researchXp: number
  researchLevel: number
}) {
  const isMaxLevel = researchLevel >= MAX_RESEARCH_LEVEL

  // XP bar calculations
  const currentThreshold = RESEARCH_LEVEL_THRESHOLDS[researchLevel] || 0
  const nextThreshold = isMaxLevel
    ? RESEARCH_LEVEL_THRESHOLDS[MAX_RESEARCH_LEVEL]
    : RESEARCH_LEVEL_THRESHOLDS[researchLevel + 1]
  const xpInLevel = researchXp - currentThreshold
  const xpNeeded = nextThreshold - currentThreshold
  const xpProgress = isMaxLevel
    ? 100
    : Math.min(100, (xpInLevel / xpNeeded) * 100)
  const tmUnlocks = useMemo(
    () => getPokemonResearchLevelTmUnlocks(formId),
    [formId],
  )

  // Get active rewards up to current level
  const activeRewards = Object.entries(RESEARCH_LEVEL_REWARDS)
    .filter(([levelStr]) => parseInt(levelStr) <= researchLevel)
    .map(([levelStr, reward]) => ({
      level: parseInt(levelStr),
      reward,
    }))

  return (
    <div className="space-y-4 pt-4">
      <SectionDivider>Research progress</SectionDivider>

      <div className="relative overflow-hidden rounded-lg border border-game-border bg-game-surface p-5">
        <div className="absolute right-0 top-0 p-3 opacity-[0.07]">
          <FlaskConical className="h-16 w-16 -rotate-12 text-game-moss" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold uppercase leading-none tracking-widest text-game-muted">
                Current status
              </span>
              <span className="font-display text-2xl font-semibold text-game-ink">
                Level {researchLevel}
              </span>
            </div>
            {isMaxLevel ? (
              <Badge className="border-game-moss/40 bg-game-moss/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-game-moss-strong">
                Complete
              </Badge>
            ) : (
              <div className="text-right">
                <span className="mb-0.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-game-muted">
                  Rank
                </span>
                <span className="font-mono text-xs font-bold text-game-ink">
                  {researchLevel} <span className="text-game-muted">/</span>{' '}
                  {MAX_RESEARCH_LEVEL}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-game-muted">
              <div className="flex items-center gap-1.5">
                <div className="h-1 w-1 rounded-full bg-game-ochre" />
                <span>Experience</span>
              </div>
              <span className="font-mono text-game-ink">
                {isMaxLevel ? 'Complete' : `${researchXp} / ${nextThreshold}`}
              </span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full border border-game-border bg-game-canvas">
              <div
                className="relative h-full overflow-hidden bg-game-moss transition-all duration-700"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>

          {activeRewards.length > 0 && (
            <div className="pt-2">
              <span className="mb-2 block text-center text-[10px] font-bold uppercase tracking-widest text-game-muted">
                Unlocked benefits
              </span>
              <div className="relative">
                <Carousel
                  opts={{
                    align: 'center',
                    loop: true,
                  }}
                  className="w-full max-w-[200px] mx-auto"
                >
                  <CarouselContent>
                    {activeRewards.map(({ level, reward }) => (
                      <CarouselItem key={level}>
                        <div className="flex min-h-[60px] flex-col items-center justify-center rounded-lg border border-game-moss/20 bg-game-moss/10 p-3 text-center">
                          <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.08em] text-game-moss-strong">
                            Level {level}
                          </span>
                          <span className="text-[11px] font-bold leading-tight text-game-ink">
                            {reward}
                          </span>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-[-38px] border-none bg-transparent text-game-muted hover:text-game-moss-strong" />
                  <CarouselNext className="right-[-38px] border-none bg-transparent text-game-muted hover:text-game-moss-strong" />
                </Carousel>
              </div>
            </div>
          )}

          {tmUnlocks.length > 0 && (
            <div className="pt-2">
              <span className="mb-2 block text-center text-[10px] font-bold uppercase tracking-widest text-game-muted">
                TM unlock notes
              </span>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {tmUnlocks.map((unlock) => (
                  <ResearchTmUnlockCard
                    key={`${unlock.level}-${unlock.itemId}`}
                    unlock={unlock}
                    isUnlocked={researchLevel >= unlock.level}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ResearchTmUnlockCard({
  unlock,
  isUnlocked,
}: {
  unlock: ReturnType<typeof getPokemonResearchLevelTmUnlocks>[number]
  isUnlocked: boolean
}) {
  const item = items.find((candidate) => candidate.id === unlock.itemId)
  const move = item?.moveId ? ALL_POKEDEX_MOVES_BY_ID[item.moveId] : undefined
  const moveType = move ? getMoveDisplayType(move) : 'normal'

  return (
    <div
      className={cn(
        'rounded-lg border p-3 transition-colors',
        isUnlocked
          ? 'border-game-moss/25 bg-game-moss/8'
          : 'border-game-border bg-game-canvas',
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised">
          {isUnlocked && move ? (
            <ItemSprite
              itemId={getMoveTypeSpriteItemId(move)}
              alt={`${moveType} TM`}
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
          ) : (
            <CircleHelp className="h-5 w-5 text-game-muted" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded bg-game-moss/10 px-1.5 py-0.5 font-mono text-[10px] font-bold leading-none text-game-moss-strong">
              Rank {unlock.level}
            </span>
            <h4 className="truncate text-sm font-semibold text-game-ink">
              {isUnlocked && move ? move.name : '???'}
            </h4>
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            <span className="rounded-full border border-game-border bg-game-surface px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-game-muted">
              {isUnlocked && move ? `${moveType} TM` : 'Unknown TM'}
            </span>
            {unlock.quantity && unlock.quantity > 1 && (
              <span className="rounded-full border border-game-border bg-game-surface px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-game-muted">
                x{unlock.quantity}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function PokemonImage({
  formId,
  pokemonName,
  progress,
  variant = 'normal',
  gender,
}: {
  formId: string
  pokemonName: string
  progress?: PokedexEntry
  variant?: 'normal' | 'shiny'
  gender?: 'male' | 'female'
}) {
  const isShiny = variant === 'shiny'
  const hasSeen = isShiny
    ? !!(progress?.shinySeen || progress?.shinyCaught)
    : !!(progress?.seen || progress?.caught)
  const hasCaught = isShiny ? !!progress?.shinyCaught : !!progress?.caught
  const spriteId = hasSeen ? formId : '0'

  const spriteSources = useMemo(() => {
    return [
      getPokemonImageUrl(spriteId, 'home', isShiny, gender),
      getPokemonImageUrl(spriteId, 'sprite', isShiny, gender),
    ]
  }, [spriteId, isShiny, gender])

  const [sourceIndex, setSourceIndex] = useState(0)

  useEffect(() => {
    setSourceIndex(0)
  }, [spriteId, isShiny, gender])

  const handleError = () => {
    setSourceIndex((prev) => {
      if (prev >= spriteSources.length - 1) {
        return prev
      }
      return prev + 1
    })
  }

  if (!hasSeen) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center text-game-muted">
        <span className="text-6xl font-bold opacity-20">?</span>
        <p className="mt-2 text-sm font-semibold text-game-muted">
          {isShiny ? 'Shiny Unknown' : 'Unknown'}
        </p>
      </div>
    )
  }

  const imageSrc = spriteSources[sourceIndex] ?? spriteSources[0]

  return (
    <div className="relative w-full h-full">
      <Image
        src={imageSrc}
        alt={pokemonName}
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        className="object-contain drop-shadow-xl"
        onError={handleError}
        loading="lazy"
        style={{ filter: hasCaught ? undefined : 'grayscale(1) opacity(0.5)' }}
      />
    </div>
  )
}

// Memoized grid item to prevent unnecessary re-renders when other items change
const PokedexGridItem = memo(function PokedexGridItem({
  speciesId,
  baseForm,
  baseProgress,
  isSelected,
  onSelect,
}: {
  speciesId: number
  baseForm: PokemonForm
  baseProgress?: {
    seen?: boolean | null
    caught?: boolean | null
    researchXp?: number
    researchLevel?: number
  }
  isSelected: boolean
  onSelect: (id: number) => void
}) {
  const hasSeen = !!(baseProgress?.seen || baseProgress?.caught)
  const spriteId = hasSeen ? baseForm.id : '0'
  const shouldDesaturate = hasSeen && !baseProgress?.caught

  const researchXp = baseProgress?.researchXp || 0
  const researchLevel = baseProgress?.researchLevel || 0
  const isMaxLevel = researchLevel >= MAX_RESEARCH_LEVEL
  const canLevelUp =
    getMaxResearchLevelForXp(researchXp) > researchLevel && !isMaxLevel

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      aria-label={
        hasSeen ? `View ${baseForm.name}` : `Unknown Pokémon #${speciesId}`
      }
      title={hasSeen ? baseForm.name : `Unknown Pokémon #${speciesId}`}
      onClick={() => onSelect(speciesId)}
      className={`game-focus-ring relative flex aspect-square items-center justify-center overflow-hidden rounded-lg border transition-colors ${
        isSelected
          ? 'border-game-moss bg-game-moss/12 ring-1 ring-game-moss/35'
          : canLevelUp
            ? 'border-game-ochre/55 bg-game-ochre/10 hover:border-game-ochre'
            : 'border-game-border bg-game-surface hover:border-game-moss/40 hover:bg-game-surface-raised'
      } ${baseProgress?.caught && !canLevelUp && !isSelected ? 'border-game-moss/25 bg-game-moss/5' : ''}`}
    >
      <div className="relative w-full h-full p-1.5">
        {hasSeen ? (
          <Image
            src={getPokemonImageUrl(spriteId, 'sprite')}
            alt={baseForm.name}
            fill
            sizes="(max-width: 640px) 20vw, 10vw"
            className="object-contain"
            loading="lazy"
            style={{
              filter: shouldDesaturate
                ? 'grayscale(1) opacity(0.7)'
                : undefined,
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-game-muted">
            <span className="text-2xl font-bold text-game-muted">?</span>
          </div>
        )}
      </div>
      {/* ID Overlay */}
      <div className="absolute bottom-1 right-1 rounded bg-game-surface/90 px-1 py-0.5 font-mono text-[10px] font-bold leading-none text-game-muted">
        #{speciesId}
      </div>
    </button>
  )
})
