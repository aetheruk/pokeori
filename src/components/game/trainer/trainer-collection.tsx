'use client'

import { useHaptics } from '@haptics/react'
import Link from 'next/link'
import { useMemo } from 'react'
import { PremiumHeader } from '@/components/game/shared/PremiumHeader'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { Button } from '@/components/ui/button'
import { ItemSprite } from '@/components/ui/item-sprite'
import { SectionDivider } from '@/components/ui/section-divider'
import { useUser } from '@/context/UserContext'
import { battles } from '@/data/battles'
import { fieldResearchGames, miniGames } from '@/data/games'
import { locations } from '@/data/locations'
import pokemonData from '@/data/pokemon-data'
import { tcgSetSummaries } from '@/data/tcg/summaries'
import { getIcon } from '@/data/user'
import { usePokedex } from '@/hooks/usePokedex'
import { useTCG } from '@/hooks/useTCG'
import { ALL_ABILITY_DEX_ENTRIES } from '@/utilities/pokemon/abilitydex'
import { ALL_MOVE_DEX_ENTRIES } from '@/utilities/pokemon/movedex'

const tcgSets = tcgSetSummaries
const totalPokemon = pokemonData.length
const totalTcgCards = tcgSets.reduce((total, set) => total + set.total, 0)
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
const gameNames = new Map(miniGames.map((game) => [game.id, game.name]))
const fieldResearchNames = new Map(
  fieldResearchGames.map((study) => [study.id, study.name]),
)

export function TrainerCollection() {
  const { user, gameData } = useUser()
  const { entriesByForm, isLoading: pokedexLoading } = usePokedex()
  const { summary: tcgSummary, isLoading: tcgLoading } = useTCG()

  const pokemonProgress = useMemo(() => {
    let caught = 0

    for (const pokemon of pokemonData) {
      const formEntries = pokemon.forms.map((form) => entriesByForm[form.id])
      if (formEntries.some((entry) => entry?.caught)) caught += 1
    }

    return { caught }
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
  const registeredAbilityIds = useMemo(
    () =>
      new Set(
        (gameData?.abilityDex || [])
          .filter((entry) => entry.registered)
          .map((entry) => entry.abilityId),
      ),
    [gameData?.abilityDex],
  )
  const completedTaskRuns = getCompletedTaskRuns(gameData?.completedTasks)
  const playerStats = getPlayerStats(gameData)
  const favoriteContent = getFavoriteContent(playerStats)
  const favoriteMode = getFavoriteMode(playerStats)

  const loading = pokedexLoading || tcgLoading
  const trainerName = user?.trainerName || 'Trainer'

  return (
    <div
      className="flex h-full flex-col overflow-hidden bg-game-canvas text-game-ink"
      aria-busy={loading}
    >
      <PremiumHeader
        title={`${trainerName}'s Stats`}
        subtitle="Collections"
        icon={
          <TaskIconDisplay
            icon={
              getIcon(user?.icon || 'ditto')?.icon || {
                type: 'pokemon',
                id: '132',
              }
            }
            className="h-10 w-10"
          />
        }
      />
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 md:px-6 md:py-6">
        <SectionDivider className="my-4" variant="chip">
          Collections
        </SectionDivider>

        <section className="grid gap-3 xl:grid-cols-2 2xl:grid-cols-4">
          <CollectionPanel
            href="/game/pokedex"
            title="Pokedex"
            iconItemId="poke-ball"
            background="/backgrounds/friend-stadium.avif"
            progress={{
              current: pokemonProgress.caught,
              total: totalPokemon,
            }}
            loading={loading}
          />

          <CollectionPanel
            href="/game/tcg"
            title="Carddex"
            iconItemId="pack-base1"
            background="/backgrounds/inventory.avif"
            progress={{
              current: tcgSummary.uniqueCards,
              total: totalTcgCards,
            }}
            loading={loading}
          />

          <CollectionPanel
            href="/game/movedex"
            title="Movedex"
            iconItemId="tm-normal"
            background="/backgrounds/gym-fighting.avif"
            progress={{
              current: ownedMoveDexEntries.length,
              total: totalMoveDexEntries,
            }}
            loading={loading}
          />

          <CollectionPanel
            href="/game/abilitydex"
            title="Abilitydex"
            iconItemId="ability-patch"
            background="/backgrounds/chansey.avif"
            progress={{
              current: registeredAbilityIds.size,
              total: totalAbilityDexEntries,
            }}
            loading={loading}
          />
        </section>

        <SectionDivider className="my-4" variant="chip">
          More Stats
        </SectionDivider>

        <section className="min-w-0">
          <div className="grid min-w-0 gap-x-5 md:grid-cols-2 md:divide-x md:divide-game-border">
            <div className="min-w-0 divide-y divide-game-border md:pr-5">
              <StatusRow
                iconItemId="vs-seeker"
                label="Total battles"
                value={user ? `${playerStats.totalBattles}` : '...'}
              />
              <StatusRow
                iconItemId="poke-ball"
                label="Wild encounters"
                value={user ? `${playerStats.totalLocations}` : '...'}
              />
              <StatusRow
                iconItemId="rotom-catalogue"
                label="Mini-game runs"
                value={user ? `${playerStats.totalGames}` : '...'}
              />
              <StatusRow
                iconItemId="eject-pack"
                label="Field Research studies"
                value={user ? `${playerStats.totalFieldResearch}` : '...'}
              />
            </div>

            <div className="min-w-0 divide-y divide-game-border border-t border-game-border md:border-t-0 md:pl-5">
              <StatusRow
                iconItemId="guide-book"
                label="Tasks completed"
                value={user ? `${completedTaskRuns}` : '...'}
              />
              <StatusRow
                iconItemId={favoriteMode.iconItemId}
                label="Most played mode"
                value={user ? favoriteMode.label : '...'}
              />
              <StatusRow
                iconItemId="guide-book"
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
  iconItemId,
  background,
  progress,
  loading,
}: {
  href: string
  title: string
  iconItemId: string
  background: string
  progress: { current: number; total: number }
  loading: boolean
}) {
  const { trigger: triggerHaptic } = useHaptics()

  return (
    <article className="relative flex h-full min-h-28 flex-col overflow-hidden rounded-md border border-game-border bg-game-surface p-4 pt-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url(${background})` }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-game-surface-raised/78 via-game-surface/58 to-game-surface/10" />

      <h2 className="absolute right-0 top-0 z-10 line-clamp-2 w-fit max-w-full rounded-md rounded-tl-none rounded-tr-none rounded-br-none bg-game-charcoal px-2 py-1 text-right text-xs font-bold leading-tight tracking-[0.12em] text-white">
        {title}
        <span className="ml-1 whitespace-nowrap text-game-battle-orange">
          {loading ? '…' : progress.current.toLocaleString()}/
          {progress.total.toLocaleString()}
        </span>
      </h2>

      <div className="relative z-10 mt-auto flex items-center gap-3 pt-4">
        <ItemSprite
          itemId={iconItemId}
          alt=""
          width={36}
          height={36}
          className="h-9 w-9 shrink-0 object-contain"
        />
        <Button
          asChild
          variant="outline"
          className="min-w-0 flex-1 border-game-border-strong bg-game-surface-raised/65 px-3 text-left text-game-charcoal-strong hover:border-game-charcoal/45 hover:bg-game-surface-raised/85"
        >
          <Link
            href={href}
            data-haptic-manual="true"
            onClick={() => triggerHaptic('selection')}
          >
            <span>View {title}</span>
          </Link>
        </Button>
      </div>
    </article>
  )
}

function StatusRow({
  iconItemId,
  label,
  value,
}: {
  iconItemId: string
  label: string
  value: string
}) {
  return (
    <div className="grid min-h-11 grid-cols-[minmax(0,1fr)_minmax(0,55%)] items-center gap-3 py-2">
      <div className="flex min-w-0 items-center gap-2">
        <TaskIconDisplay
          icon={{ type: 'item', id: iconItemId }}
          className="h-5 w-5 shrink-0"
        />
        <span className="truncate text-sm text-game-muted">{label}</span>
      </div>
      <span className="min-w-0 break-words text-right text-sm font-bold leading-tight text-game-ink [overflow-wrap:anywhere]">
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
        gameResults?: Array<Record<string, any>>
        fieldResearchResults?: Array<Record<string, any>>
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
  const gameStats = activityResultsToStatsMap(gameData?.gameResults, 'gameId')
  const fieldResearchStats = activityResultsToStatsMap(
    gameData?.fieldResearchResults,
    'fieldResearchId',
  )

  const totalBattles = getTotalPlays(battleStats)
  const totalLocations = getTotalPlays(locationStats)
  const totalGames = getTotalPlays(gameStats)
  const totalFieldResearch = getTotalPlays(fieldResearchStats)

  return {
    battleStats,
    locationStats,
    gameStats,
    fieldResearchStats,
    totalBattles,
    totalLocations,
    totalGames,
    totalFieldResearch,
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
    { label: 'Battles', plays: stats.totalBattles, iconItemId: 'vs-seeker' },
    {
      label: 'Mini Games',
      plays: stats.totalGames,
      iconItemId: 'rotom-catalogue',
    },
    {
      label: 'Field Research',
      plays: stats.totalFieldResearch,
      iconItemId: 'eject-pack',
    },
    {
      label: 'Wild encounters',
      plays: stats.totalLocations,
      iconItemId: 'poke-ball',
    },
  ].sort((a, b) => b.plays - a.plays)

  if (modes[0].plays <= 0) {
    return { label: 'No plays yet', iconItemId: 'rotom-catalogue' }
  }

  return {
    label: `${modes[0].label} (${modes[0].plays})`,
    iconItemId: modes[0].iconItemId,
  }
}

function getFavoriteContent(stats: ReturnType<typeof getPlayerStats>) {
  const entries = [
    ...getContentPlayEntries(stats.battleStats, battleNames, 'Battle'),
    ...getContentPlayEntries(stats.locationStats, locationNames, 'Encounter'),
    ...getContentPlayEntries(stats.gameStats, gameNames, 'Mini Game'),
    ...getContentPlayEntries(
      stats.fieldResearchStats,
      fieldResearchNames,
      'Field Research',
    ),
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
