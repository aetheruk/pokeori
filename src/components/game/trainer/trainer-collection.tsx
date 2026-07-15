'use client'

import {
  ArrowRight,
  CircleDot,
  Gamepad2,
  Layers,
  Map as MapIcon,
  Sparkles,
  Swords,
  Trophy,
} from 'lucide-react'
import Link from 'next/link'
import { type ComponentType, useMemo } from 'react'
import { ItemSprite } from '@/components/ui/item-sprite'
import { SectionDivider } from '@/components/ui/section-divider'
import { useUser } from '@/context/UserContext'
import { battles } from '@/data/battles'
import { allGames } from '@/data/games'
import { locations } from '@/data/locations'
import pokemonData from '@/data/pokemon-data'
import { usePokedex } from '@/hooks/usePokedex'
import { useTCG } from '@/hooks/useTCG'
import { cn } from '@/lib/utils'
import { ALL_ABILITY_DEX_ENTRIES } from '@/utilities/pokemon/abilitydex'
import { ALL_MOVE_DEX_ENTRIES } from '@/utilities/pokemon/movedex'
import { getAllTcgSets } from '@/utilities/tcg/tcg'

const tcgSets = getAllTcgSets()
const totalPokemon = pokemonData.length
const totalPokedexForms = pokemonData.reduce(
  (total, pokemon) =>
    total + pokemon.forms.filter((form) => form.form !== 'base').length,
  0,
)
const totalTcgCards = tcgSets.reduce(
  (total, set) => total + set.cards.length,
  0,
)
const totalMoveDexEntries = ALL_MOVE_DEX_ENTRIES.length
const totalAbilityDexEntries = ALL_ABILITY_DEX_ENTRIES.length

type PlayStat = {
  wins?: number
  losses?: number
}

type PlayStatsMap = Record<string, PlayStat | number | undefined>

const battleNames = new Map(battles.map((battle) => [battle.id, battle.name]))
const locationNames = new Map(
  locations.map((location) => [location.id, location.name]),
)
const researchNames = new Map(allGames.map((game) => [game.id, game.name]))

export function TrainerCollection() {
  const { user, gameData } = useUser()
  const { entriesByForm, isLoading: pokedexLoading } = usePokedex()
  const { entriesByCard, summary: tcgSummary, isLoading: tcgLoading } = useTCG()

  const pokemonProgress = useMemo(() => {
    let seen = 0
    let caught = 0
    let observed = 0
    let observedForms = 0
    let caughtForms = 0

    for (const pokemon of pokemonData) {
      const formEntries = pokemon.forms.map((form) => entriesByForm[form.id])
      if (formEntries.some((entry) => entry?.seen || entry?.caught)) seen += 1
      if (formEntries.some((entry) => entry?.caught)) caught += 1
      if (formEntries.some((entry) => entry?.preferredBattleStance))
        observed += 1

      for (const form of pokemon.forms) {
        if (form.form === 'base') continue
        const entry = entriesByForm[form.id]
        if (entry?.seen || entry?.caught) observedForms += 1
        if (entry?.caught) caughtForms += 1
      }
    }

    return { seen, caught, observed, observedForms, caughtForms }
  }, [entriesByForm])

  const inventory = useMemo(
    () =>
      Object.fromEntries(
        (gameData?.inventory || []).map((item) => [item.itemId, item.quantity]),
      ),
    [gameData?.inventory],
  )
  const ownedMoveDexEntries = useMemo(
    () =>
      ALL_MOVE_DEX_ENTRIES.filter(
        (entry) => (inventory[entry.itemId] || 0) > 0,
      ),
    [inventory],
  )
  const moveDexCompletion = getPercent(
    ownedMoveDexEntries.length,
    Math.max(ALL_MOVE_DEX_ENTRIES.length, 1),
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
  const abilityDexCompletion = getPercent(
    registeredAbilityIds.size,
    Math.max(totalAbilityDexEntries, 1),
  )

  const activeBinders = tcgSets.filter(
    (set) => (inventory[`binder-${set.id}`] || 0) > 0,
  ).length
  const completedTcgSets = tcgSets.filter((set) => {
    if ((inventory[`binder-${set.id}`] || 0) <= 0) return false
    return set.cards.every(
      (card) => (entriesByCard[card.id]?.quantity || 0) > 0,
    )
  }).length
  const missingPokemon = Math.max(totalPokemon - pokemonProgress.caught, 0)
  const missingForms = Math.max(
    totalPokedexForms - pokemonProgress.caughtForms,
    0,
  )
  const missingTcgCards = Math.max(totalTcgCards - tcgSummary.uniqueCards, 0)
  const missingBinders = Math.max(tcgSets.length - activeBinders, 0)
  const completedTaskRuns = getCompletedTaskRuns(gameData?.completedTasks)
  const playerStats = getPlayerStats(gameData)
  const favoriteContent = getFavoriteContent(playerStats)
  const favoriteMode = getFavoriteMode(playerStats)

  const pokemonCompletion = getPercent(pokemonProgress.caught, totalPokemon)
  const seenCompletion = getPercent(pokemonProgress.seen, totalPokemon)
  const observedCompletion = getPercent(pokemonProgress.observed, totalPokemon)
  const formCompletion = getPercent(
    pokemonProgress.caughtForms,
    totalPokedexForms,
  )
  const cardCompletion = getPercent(tcgSummary.uniqueCards, totalTcgCards)
  const overallCompletion = getPercent(
    pokemonProgress.caught +
      tcgSummary.uniqueCards +
      ownedMoveDexEntries.length +
      registeredAbilityIds.size,
    totalPokemon + totalTcgCards + totalMoveDexEntries + totalAbilityDexEntries,
  )

  const loading = pokedexLoading || tcgLoading
  const trainerName = user?.trainerName || 'Trainer'

  return (
    <div
      className="flex h-full flex-col overflow-hidden bg-game-canvas text-game-ink"
      aria-busy={loading}
    >
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 md:px-6 md:py-6">
        <section>
          <div className="game-folio-section relative overflow-hidden p-4 md:p-5">
            <div
              className="absolute inset-y-5 left-0 w-1 bg-game-ochre"
              aria-hidden="true"
            />
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="game-field-label flex items-center gap-2">
                  <Layers className="h-3.5 w-3.5" />
                  {trainerName}'s Collection
                </div>
                <h2 className="mt-2 font-display text-3xl font-semibold text-game-ink md:text-4xl">
                  {loading ? 'Syncing' : `${overallCompletion}%`}
                </h2>
                <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-game-muted">
                  Collection complete
                </div>
              </div>

              <ProgressDial value={overallCompletion} label="All" />
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full border border-game-border bg-game-canvas">
              <div
                className="h-full rounded-full bg-game-moss transition-all"
                style={{ width: `${overallCompletion}%` }}
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-y-4 border-t border-game-border pt-4 sm:grid-cols-4 sm:divide-x sm:divide-game-border">
              <InlineStat
                label="Pokemon"
                value={loading ? '...' : `${pokemonProgress.caught}`}
              />
              <InlineStat
                label="Cards"
                value={loading ? '...' : `${tcgSummary.uniqueCards}`}
              />
              <InlineStat
                label="Moves"
                value={loading ? '...' : `${ownedMoveDexEntries.length}`}
              />
              <InlineStat
                label="Abilities"
                value={loading ? '...' : `${registeredAbilityIds.size}`}
              />
            </div>
          </div>
        </section>

        <SectionDivider className="my-4">Collections</SectionDivider>

        <section className="grid gap-3 xl:grid-cols-2 2xl:grid-cols-4">
          <CollectionPanel
            href="/game/pokedex"
            title="Pokedex"
            subtitle="Pokemon Records"
            iconItemId="poke-ball"
            accent="sky"
            completion={pokemonCompletion}
            stats={[
              {
                label: 'Missing',
                value: loading ? '...' : `${missingPokemon}`,
              },
              {
                label: 'Missing Forms',
                value: loading ? '...' : `${missingForms}`,
              },
            ]}
            railStats={[
              { label: 'Pokemon', value: pokemonCompletion },
              { label: 'Seen', value: seenCompletion },
              { label: 'Observed', value: observedCompletion },
              { label: 'Forms', value: formCompletion },
            ]}
          />

          <CollectionPanel
            href="/game/tcg"
            title="Carddex"
            subtitle="Card Binders"
            iconItemId="pack-base1"
            accent="amber"
            completion={cardCompletion}
            stats={[
              {
                label: 'Missing Cards',
                value: tcgLoading ? '...' : `${missingTcgCards}`,
              },
              {
                label: 'Missing Binders',
                value: user ? `${missingBinders}` : '...',
              },
            ]}
            railStats={[
              { label: 'Cards', value: cardCompletion },
              {
                label: 'Binders',
                value: getPercent(activeBinders, tcgSets.length),
              },
            ]}
          />

          <CollectionPanel
            href="/game/movedex"
            title="MoveDex"
            subtitle="TM / HM Moves"
            iconItemId="tm-normal"
            accent="sky"
            completion={moveDexCompletion}
            stats={[
              {
                label: 'Owned',
                value: loading ? '...' : `${ownedMoveDexEntries.length}`,
              },
              {
                label: 'Missing',
                value: loading
                  ? '...'
                  : `${Math.max(ALL_MOVE_DEX_ENTRIES.length - ownedMoveDexEntries.length, 0)}`,
              },
            ]}
            railStats={[{ label: 'Moves', value: moveDexCompletion }]}
          />

          <CollectionPanel
            href="/game/abilitydex"
            title="AbilityDex"
            subtitle="Pokemon Abilities"
            iconItemId="ability-patch"
            accent="amber"
            completion={abilityDexCompletion}
            stats={[
              {
                label: 'Registered',
                value: loading ? '...' : `${registeredAbilityIds.size}`,
              },
              {
                label: 'Missing',
                value: loading
                  ? '...'
                  : `${Math.max(totalAbilityDexEntries - registeredAbilityIds.size, 0)}`,
              },
            ]}
            railStats={[{ label: 'Abilities', value: abilityDexCompletion }]}
          />
        </section>

        <SectionDivider className="my-4">At a Glance</SectionDivider>

        <section className="game-folio-section min-w-0 overflow-hidden p-4 md:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="game-field-label flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-game-ochre" />
              Trainer Snapshot
            </div>
            <Trophy className="h-4 w-4 text-game-muted" />
          </div>

          <div className="mt-3 grid min-w-0 gap-x-5 md:grid-cols-2 md:divide-x md:divide-game-border">
            <div className="min-w-0 divide-y divide-game-border md:pr-5">
              <StatusRow
                icon={Swords}
                label="Total battles"
                value={user ? `${playerStats.totalBattles}` : '...'}
              />
              <StatusRow
                icon={MapIcon}
                label="Wild encounters"
                value={user ? `${playerStats.totalLocations}` : '...'}
              />
              <StatusRow
                icon={Gamepad2}
                label="Research runs"
                value={user ? `${playerStats.totalResearch}` : '...'}
              />
            </div>

            <div className="min-w-0 divide-y divide-game-border border-t border-game-border md:border-t-0 md:pl-5">
              <StatusRow
                icon={Trophy}
                label="Tasks completed"
                value={user ? `${completedTaskRuns}` : '...'}
              />
              <StatusRow
                icon={Sparkles}
                label="Most played mode"
                value={user ? favoriteMode : '...'}
              />
              <StatusRow
                icon={CircleDot}
                label="Favourite content"
                value={user ? favoriteContent : '...'}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function CollectionPanel({
  href,
  title,
  subtitle,
  iconItemId,
  accent,
  completion,
  stats,
  railStats,
}: {
  href: string
  title: string
  subtitle: string
  iconItemId: string
  accent: 'sky' | 'amber'
  completion: number
  stats: { label: string; value: string }[]
  railStats: { label: string; value: number }[]
}) {
  const isSky = accent === 'sky'

  return (
    <Link
      href={href}
      className="game-focus-ring group relative overflow-hidden rounded-lg border border-game-border bg-game-surface p-4 transition-colors hover:border-game-moss/45 hover:bg-game-surface-raised"
    >
      <div
        className={cn(
          'absolute inset-y-0 left-0 w-1',
          isSky ? 'bg-game-moss' : 'bg-game-ochre',
        )}
      />
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={cn(
              'flex h-11 w-11 shrink-0 items-center justify-center rounded-md border bg-game-surface-raised',
              isSky
                ? 'border-game-moss/30 text-game-moss-strong'
                : 'border-game-ochre/35 text-game-ochre',
            )}
          >
            <ItemSprite
              itemId={iconItemId}
              alt=""
              width={36}
              height={36}
              className="h-8 w-8 object-contain"
            />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-game-muted">
              {subtitle}
            </div>
            <h2 className="mt-0.5 truncate font-display text-2xl font-semibold text-game-ink">
              {title}
            </h2>
          </div>
        </div>
        <ArrowRight className="h-5 w-5 shrink-0 text-game-muted transition-transform group-hover:translate-x-0.5 group-hover:text-game-moss-strong" />
      </div>

      <div className="mt-5 grid grid-cols-[auto_1fr] gap-4">
        <ProgressDial value={completion} label="Done" />
        <div className="min-w-0 space-y-3">
          {railStats.map((stat) => (
            <ProgressRail
              key={stat.label}
              label={stat.label}
              value={stat.value}
              className={isSky ? 'bg-game-moss' : 'bg-game-ochre'}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 divide-x divide-game-border border-t border-game-border pt-4">
        {stats.map((stat) => (
          <InlineStat key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </Link>
  )
}

function ProgressDial({ value, label }: { value: number; label: string }) {
  return (
    <div
      className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-game-border"
      style={{
        background: `conic-gradient(var(--game-moss) ${value * 3.6}deg, var(--game-canvas) 0deg)`,
      }}
    >
      <div className="grid h-12 w-12 place-items-center rounded-full bg-game-surface text-center">
        <div>
          <div className="font-mono text-sm font-bold text-game-ink">
            {value}%
          </div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-game-muted">
            {label}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProgressRail({
  label,
  value,
  className,
}: {
  label: string
  value: number
  className: string
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-game-muted">
        <span>{label}</span>
        <span className="font-mono text-game-ink">{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full border border-game-border bg-game-canvas">
        <div
          className={cn('h-full rounded-full transition-all', className)}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

function InlineStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 px-2 first:pl-0 last:pr-0">
      <div className="truncate text-[11px] font-semibold uppercase tracking-[0.1em] text-game-muted">
        {label}
      </div>
      <div className="mt-1 truncate font-mono text-sm font-bold text-game-ink">
        {value}
      </div>
    </div>
  )
}

function StatusRow({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="grid min-h-11 grid-cols-[minmax(0,1fr)_minmax(0,55%)] items-center gap-3 py-2">
      <div className="flex min-w-0 items-center gap-2">
        <Icon className="h-4 w-4 shrink-0 text-game-moss-strong" />
        <span className="truncate text-sm text-game-muted">{label}</span>
      </div>
      <span className="min-w-0 break-words text-right font-mono text-sm font-bold leading-tight text-game-ink [overflow-wrap:anywhere]">
        {value}
      </span>
    </div>
  )
}

function getPlayerStats(
  gameData:
    | {
        battleResults?: Array<Record<string, any>>
        locationEncounterResults?: Array<Record<string, any>>
        researchEncounterResults?: Array<Record<string, any>>
      }
    | null
    | undefined,
) {
  const battleStats = activityResultsToStatsMap(
    gameData?.battleResults,
    'battleId',
  )
  const locationStats = activityResultsToStatsMap(
    gameData?.locationEncounterResults,
    'locationId',
  )
  const researchStats = activityResultsToStatsMap(
    gameData?.researchEncounterResults,
    'encounterId',
  )

  const totalBattles = getTotalPlays(battleStats)
  const totalLocations = getTotalPlays(locationStats)
  const totalResearch = getTotalPlays(researchStats)

  return {
    battleStats,
    locationStats,
    researchStats,
    totalBattles,
    totalLocations,
    totalResearch,
  }
}

function activityResultsToStatsMap(
  results: Array<Record<string, any>> | undefined,
  idKey: string,
): PlayStatsMap {
  if (!Array.isArray(results)) return {}

  return Object.fromEntries(
    results
      .filter((result) => result[idKey])
      .map((result) => [
        String(result[idKey]),
        {
          wins: typeof result.wins === 'number' ? result.wins : 0,
          losses: typeof result.losses === 'number' ? result.losses : 0,
        },
      ]),
  )
}

function getTotalPlays(stats?: PlayStatsMap) {
  if (!stats) return 0

  const directWins = typeof stats.wins === 'number' ? stats.wins : 0
  const directLosses = typeof stats.losses === 'number' ? stats.losses : 0

  return Object.entries(stats).reduce((total, [id, stat]) => {
    if (id === 'wins' || id === 'losses') return total
    if (!stat || typeof stat !== 'object') return total
    return total + getPlayCount(stat)
  }, directWins + directLosses)
}

function getPlayCount(stat: PlayStat) {
  return (stat.wins || 0) + (stat.losses || 0)
}

function getFavoriteMode(stats: ReturnType<typeof getPlayerStats>) {
  const modes = [
    { label: 'Battles', plays: stats.totalBattles },
    { label: 'Research', plays: stats.totalResearch },
    { label: 'Wild encounters', plays: stats.totalLocations },
  ].sort((a, b) => b.plays - a.plays)

  if (modes[0].plays <= 0) return 'No plays yet'
  return `${modes[0].label} (${modes[0].plays})`
}

function getFavoriteContent(stats: ReturnType<typeof getPlayerStats>) {
  const entries = [
    ...getContentPlayEntries(stats.battleStats, battleNames, 'Battle'),
    ...getContentPlayEntries(stats.locationStats, locationNames, 'Encounter'),
    ...getContentPlayEntries(stats.researchStats, researchNames, 'Research'),
  ].sort((a, b) => b.plays - a.plays)

  if (!entries[0] || entries[0].plays <= 0) return 'No favourite yet'
  return `${entries[0].name} (${entries[0].plays})`
}

function getContentPlayEntries(
  stats: PlayStatsMap,
  names: Map<string, string>,
  fallbackType: string,
) {
  return Object.entries(stats).flatMap(([id, stat]) => {
    if (!stat || typeof stat !== 'object') return []

    const plays = getPlayCount(stat)
    return [
      {
        name: names.get(id) || fallbackType,
        plays,
      },
    ]
  })
}

function getCompletedTaskRuns(completedTasks: unknown) {
  if (!completedTasks) return 0

  if (Array.isArray(completedTasks)) {
    return completedTasks.reduce((total, task) => total + (task?.count || 1), 0)
  }

  if (typeof completedTasks !== 'object') return 0

  return Object.values(
    completedTasks as Record<string, { count?: number }>,
  ).reduce((total, task) => total + (task?.count || 1), 0)
}

function getPercent(value: number, total: number) {
  if (total <= 0) return 0
  return Math.min(Math.round((value / total) * 100), 100)
}
