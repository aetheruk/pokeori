'use client'

import {
  BookOpen,
  CircleHelp,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import Image from 'next/image'
import type { CSSProperties } from 'react'
import { useCallback, useMemo, useState, useTransition } from 'react'
import { List, type RowComponentProps, useDynamicRowHeight } from 'react-window'
import { toast } from 'sonner'
import { DexFilterBar, DexPageShell } from '@/components/game/dex'
import { MoveFieldNote } from '@/components/game/moves/move-field-note'
import { MoveLearnerList } from '@/components/game/moves/move-learner-list'
import { PremiumSelect } from '@/components/game/shared/PremiumSelect'
import {
  STANCE_ICON_CONFIG,
  StanceIcon,
} from '@/components/game/shared/stance-icon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ItemSprite } from '@/components/ui/item-sprite'
import { ResponsivePanel } from '@/components/ui/responsive-panel'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useUser } from '@/context/UserContext'
import type { MoveConfig } from '@/data/moves/types'
import { usePokedex } from '@/hooks/usePokedex'
import { cn } from '@/lib/utils'
import { BASE_BATTLE_POWER } from '@/utilities/battle/constants'
import {
  getMovePresentation,
  getMoveTypeSpriteItemId,
} from '@/utilities/pokemon/move-display'
import {
  ALL_MOVE_DEX_ENTRIES,
  getMoveTypeLabel,
  type MoveDexEntry,
} from '@/utilities/pokemon/movedex'
import { getPokemonTypeIconUrl } from '@/utilities/pokemon/sprite-proxy'
import { recoverLostResearchTms } from './actions'

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
}

type MoveDexView = 'known' | 'all' | 'sketchbook'
type EffectRole = 'damage' | 'status' | 'healing' | 'setup' | 'utility'
type SortOrder = 'name' | 'power' | 'accuracy'
type OwnershipFilter = 'all' | 'owned' | 'missing' | 'sketched'
type DisplayMove = {
  entry: MoveDexEntry
  isKnown: boolean
  isOwned: boolean
  isSketched: boolean
  roles: EffectRole[]
}

const viewOptions = [
  { id: 'known', label: 'Known moves' },
  { id: 'all', label: 'All discoveries' },
  { id: 'sketchbook', label: 'Sketchbook' },
]
const stanceOptions = [
  { id: 'all', label: 'All stances' },
  { id: 'power', label: 'Power' },
  { id: 'speed', label: 'Speed' },
  { id: 'tech', label: 'Tech' },
  { id: 'random', label: 'Random' },
]
const roleOptions = [
  { id: 'all', label: 'All effects' },
  { id: 'damage', label: 'Damage' },
  { id: 'status', label: 'Status' },
  { id: 'healing', label: 'Healing' },
  { id: 'setup', label: 'Stat changes' },
  { id: 'utility', label: 'Utility' },
]
const ownershipOptions = [
  { id: 'all', label: 'Any ownership' },
  { id: 'owned', label: 'Owned TMs' },
  { id: 'missing', label: 'Missing TMs' },
  { id: 'sketched', label: 'Sketched' },
]
const sortOptions = [
  { id: 'name', label: 'Name A–Z' },
  { id: 'power', label: 'Base power' },
  { id: 'accuracy', label: 'Accuracy' },
]

function getMoveEffectRoles(move: MoveConfig): EffectRole[] {
  const roles: EffectRole[] = []
  if (
    move.damage > 0 ||
    move.damageRange ||
    move.damageRule ||
    move.delayedDamage
  )
    roles.push('damage')
  if (
    move.heal ||
    move.healFull ||
    move.weatherHeal ||
    move.absorb ||
    move.partyRevive
  )
    roles.push('healing')
  if (
    move.status ||
    move.additionalStatuses?.length ||
    move.randomStatuses?.options.length ||
    move.secondaryStatuses?.length ||
    move.statusTransfer
  )
    roles.push('status')
  if (
    move.buffs?.length ||
    move.debuffs?.length ||
    move.onUserDamagedSameTurn?.length ||
    move.statStageEffect
  )
    roles.push('setup')
  return roles.length ? roles : ['utility']
}
function getRoleLabel(role: EffectRole) {
  return roleOptions.find((option) => option.id === role)?.label ?? role
}
function getBasePower(move: MoveConfig) {
  return move.damage <= 0 ? 0 : Math.round(move.damage * BASE_BATTLE_POWER)
}

export default function MoveDexPage() {
  const { gameData, refreshUser } = useUser()
  const { entriesByForm } = usePokedex()
  const [isRecovering, startRecovery] = useTransition()
  const [selectedView, setSelectedView] = useState<MoveDexView>('known')
  const [query, setQuery] = useState('')
  const [selectedMoveType, setSelectedMoveType] = useState('all')
  const [selectedStance, setSelectedStance] = useState('all')
  const [selectedRole, setSelectedRole] = useState('all')
  const [ownership, setOwnership] = useState<OwnershipFilter>('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('name')
  const [filtersExpanded, setFiltersExpanded] = useState(false)
  const [selectedMove, setSelectedMove] = useState<DisplayMove | null>(null)

  const inventory = useMemo(
    () =>
      Object.fromEntries(
        (gameData?.inventory || []).map((item) => [item.itemId, item.quantity]),
      ),
    [gameData?.inventory],
  )
  const sketchedMoveIds = useMemo(
    () => new Set(gameData?.sketchedMoves || []),
    [gameData?.sketchedMoves],
  )
  const allDisplayMoves = useMemo<DisplayMove[]>(
    () =>
      ALL_MOVE_DEX_ENTRIES.map((entry) => {
        const isOwned = (inventory[entry.itemId] || 0) > 0
        const isSketched = sketchedMoveIds.has(entry.move.id)
        return {
          entry,
          isOwned,
          isSketched,
          isKnown: isOwned || isSketched,
          roles: getMoveEffectRoles(entry.move),
        }
      }),
    [inventory, sketchedMoveIds],
  )
  const ownedMoveCount = useMemo(
    () => allDisplayMoves.filter((move) => move.isOwned).length,
    [allDisplayMoves],
  )
  const sketchedMoveCount = useMemo(
    () => allDisplayMoves.filter((move) => move.isSketched).length,
    [allDisplayMoves],
  )
  const smeargleResearchLevel = useMemo(
    () =>
      Math.max(
        0,
        ...(gameData?.pokedex || [])
          .filter((entry) => String(entry.formId) === '235')
          .map((entry) => Number(entry.researchLevel || 0)),
      ),
    [gameData?.pokedex],
  )
  const canViewSketchbook = smeargleResearchLevel >= 1
  const typeOptions = useMemo(
    () => [
      { id: 'all', label: 'All types' },
      ...Array.from(
        new Set(ALL_MOVE_DEX_ENTRIES.map((entry) => entry.moveType)),
      )
        .sort()
        .map((type) => ({ id: type, label: getMoveTypeLabel(type) })),
    ],
    [],
  )

  const filteredMoves = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    return allDisplayMoves
      .filter((displayMove) => {
        if (selectedView === 'known' && !displayMove.isOwned) return false
        if (selectedView === 'sketchbook' && !displayMove.isSketched)
          return false
        if (ownership === 'owned' && !displayMove.isOwned) return false
        if (ownership === 'missing' && displayMove.isOwned) return false
        if (ownership === 'sketched' && !displayMove.isSketched) return false
        // Unknown records can only be searched or filtered by player-visible facts.
        if (!displayMove.isKnown) {
          if (
            selectedMoveType !== 'all' ||
            selectedStance !== 'all' ||
            selectedRole !== 'all'
          )
            return false
          return (
            !normalizedQuery ||
            displayMove.entry.unlockClue
              .toLocaleLowerCase()
              .includes(normalizedQuery)
          )
        }
        if (
          selectedMoveType !== 'all' &&
          displayMove.entry.moveType !== selectedMoveType
        )
          return false
        if (
          selectedStance !== 'all' &&
          displayMove.entry.move.stance !== selectedStance
        )
          return false
        if (
          selectedRole !== 'all' &&
          !displayMove.roles.includes(selectedRole as EffectRole)
        )
          return false
        return (
          !normalizedQuery ||
          displayMove.entry.move.name
            .toLocaleLowerCase()
            .includes(normalizedQuery)
        )
      })
      .sort((a, b) => {
        if (sortOrder !== 'name' && a.isKnown !== b.isKnown)
          return a.isKnown ? -1 : 1
        if (sortOrder === 'power' && a.isKnown && b.isKnown) {
          const difference =
            getBasePower(b.entry.move) - getBasePower(a.entry.move)
          if (difference) return difference
        }
        if (sortOrder === 'accuracy' && a.isKnown && b.isKnown) {
          const difference = b.entry.move.accuracy - a.entry.move.accuracy
          if (difference) return difference
        }
        const aLabel = a.isKnown ? a.entry.move.name : a.entry.unlockClue
        const bLabel = b.isKnown ? b.entry.move.name : b.entry.unlockClue
        return aLabel.localeCompare(bLabel)
      })
  }, [
    allDisplayMoves,
    ownership,
    query,
    selectedMoveType,
    selectedRole,
    selectedStance,
    selectedView,
    sortOrder,
  ])

  const hasActiveFilters =
    query.length > 0 ||
    selectedMoveType !== 'all' ||
    selectedStance !== 'all' ||
    selectedRole !== 'all' ||
    ownership !== 'all' ||
    sortOrder !== 'name'
  const clearFilters = () => {
    setQuery('')
    setSelectedMoveType('all')
    setSelectedStance('all')
    setSelectedRole('all')
    setOwnership('all')
    setSortOrder('name')
  }
  const handleViewChange = (value: string) => {
    if (value !== 'known' && value !== 'all' && value !== 'sketchbook') return
    if (value === 'sketchbook' && !canViewSketchbook) return
    setSelectedView(value)
    clearFilters()
  }
  const handleRecoverLostTms = () =>
    startRecovery(async () => {
      try {
        const result = await recoverLostResearchTms()
        if (!result.success) {
          toast.error(result.message)
          return
        }
        refreshUser(true)
        result.recovered.length
          ? toast.success(result.message)
          : toast.info(result.message)
      } catch {
        toast.error('Could not recover missing research TMs.')
      }
    })
  const rowKey = useCallback(
    (index: number, data: MoveListRowData) =>
      data.moves[index]?.entry.itemId ?? index,
    [],
  )
  const subtitle =
    selectedView === 'sketchbook'
      ? `${sketchedMoveCount} recorded`
      : `${ownedMoveCount} of ${ALL_MOVE_DEX_ENTRIES.length} TMs known`
  const dynamicRowHeight = useDynamicRowHeight({
    defaultRowHeight: 104,
    key: `${selectedView}:${selectedMoveType}:${selectedStance}:${selectedRole}:${ownership}:${sortOrder}:${query}`,
  })

  return (
    <DexPageShell title="MoveDex" subtitle={subtitle}>
      <Tabs value={selectedView} onValueChange={handleViewChange}>
        <TabsList className="grid h-auto min-h-11 w-full grid-cols-3">
          <TabsTrigger value="known">Known moves</TabsTrigger>
          <TabsTrigger value="all">All discoveries</TabsTrigger>
          <TabsTrigger value="sketchbook" disabled={!canViewSketchbook}>
            Sketchbook
            {canViewSketchbook && (
              <Badge className="ml-1 hidden border-game-ochre/30 bg-game-ochre/10 px-1.5 py-0 text-[10px] text-game-ochre-strong sm:inline-flex">
                {sketchedMoveCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {selectedView === 'sketchbook' && (
        <section
          className="mt-3 rounded-xl border border-game-ochre/35 bg-game-ochre/10 px-4 py-3"
          aria-labelledby="sketchbook-note-title"
        >
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-game-ochre/30 bg-game-surface-raised text-game-ochre-strong">
              <BookOpen className="size-5" aria-hidden="true" />
            </div>
            <div>
              <h2
                id="sketchbook-note-title"
                className="font-display text-base font-semibold text-game-ink"
              >
                Smeargle&apos;s field notes
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-game-muted sm:text-sm">
                When the foe has a new eligible move, Smeargle&apos;s Sketch has
                a 25% chance to record it. Win the battle to keep the record;
                Sketched moves can only be assigned to Smeargle.
              </p>
            </div>
          </div>
        </section>
      )}

      <DexFilterBar label="Move filters" className="mt-3">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 md:grid-cols-2 xl:grid-cols-[minmax(14rem,1.5fr)_repeat(5,minmax(8rem,1fr))]">
          <div className="space-y-2">
            <label
              htmlFor="movedex-search"
              className="text-xs font-medium text-game-muted"
            >
              Search
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-game-muted"
                aria-hidden="true"
              />
              <Input
                id="movedex-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={
                  selectedView === 'all'
                    ? 'Search names or visible clues'
                    : 'Search moves'
                }
                className="pl-9"
              />
            </div>
          </div>
          <Button
            type="button"
            variant="secondary"
            aria-expanded={filtersExpanded}
            onClick={() => setFiltersExpanded((current) => !current)}
            className="mt-[1.625rem] min-h-11 px-3 md:hidden"
          >
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            Filters
          </Button>
          <div
            className={cn(
              'col-span-2 grid grid-cols-2 gap-2 md:contents',
              !filtersExpanded && 'hidden md:contents',
            )}
          >
            <PremiumSelect
              label="Type"
              value={selectedMoveType}
              onValueChange={setSelectedMoveType}
              options={typeOptions}
            />
            <PremiumSelect
              label="Stance"
              value={selectedStance}
              onValueChange={setSelectedStance}
              options={stanceOptions}
            />
            <PremiumSelect
              label="Effect"
              value={selectedRole}
              onValueChange={setSelectedRole}
              options={roleOptions}
            />
            <PremiumSelect
              label="Ownership"
              value={ownership}
              onValueChange={(value) => setOwnership(value as OwnershipFilter)}
              options={ownershipOptions}
            />
            <PremiumSelect
              label="Sort"
              value={sortOrder}
              onValueChange={(value) => setSortOrder(value as SortOrder)}
              options={sortOptions}
            />
          </div>
        </div>
        <div className="mt-2 flex min-h-8 flex-wrap items-center gap-2 border-t border-game-border pt-2 text-xs text-game-muted">
          <SlidersHorizontal className="size-3.5" aria-hidden="true" />
          <span aria-live="polite">
            {filteredMoves.length}{' '}
            {filteredMoves.length === 1 ? 'record' : 'records'}
            {selectedView === 'all' &&
              ' — unknown records only use visible clue text'}
          </span>
          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="ml-auto min-h-8 px-2 text-xs"
            >
              <X className="size-3.5" aria-hidden="true" />
              Clear
            </Button>
          )}
          {selectedView !== 'sketchbook' && (
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={handleRecoverLostTms}
              disabled={isRecovering}
              aria-busy={isRecovering}
              className="ml-auto min-h-9"
            >
              <RotateCcw
                className={cn(
                  'size-3.5',
                  isRecovering && 'animate-spin motion-reduce:animate-none',
                )}
                aria-hidden="true"
              />
              {isRecovering ? 'Recovering' : 'Recover lost TMs'}
            </Button>
          )}
        </div>
      </DexFilterBar>

      <section
        className="mt-3 min-h-0 flex-1"
        aria-label={`${viewOptions.find((view) => view.id === selectedView)?.label} list`}
      >
        {filteredMoves.length ? (
          <List
            rowComponent={MoveListRow}
            rowCount={filteredMoves.length}
            rowHeight={dynamicRowHeight}
            rowProps={{
              moves: filteredMoves,
              onSelect: setSelectedMove,
              selectedView,
            }}
            rowKey={rowKey}
            overscanCount={6}
            defaultHeight={560}
            className="custom-scrollbar"
            style={{ height: '100%', minHeight: 260 }}
          />
        ) : (
          <MoveDexEmptyState
            selectedView={selectedView}
            hasActiveFilters={hasActiveFilters}
            onClear={clearFilters}
          />
        )}
      </section>
      <ResponsivePanel
        open={selectedMove !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedMove(null)
        }}
        title={
          selectedMove?.isKnown
            ? selectedMove.entry.move.name
            : 'Undiscovered TM'
        }
        description={
          selectedMove?.isKnown
            ? selectedMove.isSketched && selectedView === 'sketchbook'
              ? 'Sketchbook record · Smeargle only'
              : selectedMove.entry.item.name
            : 'A field clue points towards this move.'
        }
        desktopWidth="min(42vw, 620px)"
        desktopBreakpoint="lg"
        className="overflow-hidden"
      >
        <div className="game-page-scroll min-h-0 flex-1 space-y-6 px-5 py-4">
          {selectedMove?.isKnown ? (
            <>
              <MoveFieldNote
                presentation={getMovePresentation(selectedMove.entry.move, {
                  source: {
                    kind: selectedView === 'sketchbook' ? 'sketch' : 'tm',
                    label:
                      selectedView === 'sketchbook'
                        ? 'Smeargle Sketchbook'
                        : selectedMove.entry.item.name,
                  },
                })}
              >
                {selectedView === 'sketchbook' && (
                  <div className="rounded-lg border border-game-ochre/30 bg-game-ochre/10 p-3">
                    <h3 className="font-display text-sm font-semibold text-game-ink">
                      Using this record
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-game-muted">
                      Assign it from a Smeargle&apos;s move loadout; other
                      Pokémon cannot learn it from this Sketchbook record.
                    </p>
                  </div>
                )}
              </MoveFieldNote>
              {selectedView !== 'sketchbook' && (
                <MoveLearnerList
                  move={selectedMove.entry.move}
                  progressByForm={entriesByForm}
                />
              )}
            </>
          ) : selectedMove ? (
            <UnknownMoveNote clue={selectedMove.entry.unlockClue} />
          ) : null}
        </div>
      </ResponsivePanel>
    </DexPageShell>
  )
}

type MoveListRowData = {
  moves: DisplayMove[]
  onSelect: (move: DisplayMove) => void
  selectedView: MoveDexView
}

function MoveListRow({
  index,
  style,
  ariaAttributes,
  moves,
  onSelect,
  selectedView,
}: RowComponentProps<MoveListRowData>) {
  const displayMove = moves[index]
  if (!displayMove) return null
  return (
    <div style={style as CSSProperties} {...ariaAttributes} className="pb-2">
      <MoveDexListItem
        displayMove={displayMove}
        isSketchbook={selectedView === 'sketchbook'}
        onSelect={() => onSelect(displayMove)}
      />
    </div>
  )
}

function MoveDexListItem({
  displayMove,
  isSketchbook,
  onSelect,
}: {
  displayMove: DisplayMove
  isSketchbook: boolean
  onSelect: () => void
}) {
  const { entry, isKnown, isOwned, isSketched, roles } = displayMove
  const stanceConfig = STANCE_ICON_CONFIG[entry.move.stance]
  const moveTypeId =
    entry.moveType === 'random' ? null : typeIdMap[entry.moveType]
  return (
    <button
      type="button"
      aria-label={
        isKnown
          ? `View ${entry.move.name} details`
          : `View discovery clue: ${entry.unlockClue}`
      }
      onClick={onSelect}
      className={cn(
        'group flex h-full min-h-24 w-full items-center gap-3 overflow-hidden rounded-xl border px-3 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-game-moss/45 sm:px-4',
        isKnown
          ? 'border-game-border bg-game-surface hover:border-game-moss/40 hover:bg-game-surface-raised'
          : 'border-dashed border-game-border-strong bg-game-surface/55 hover:bg-game-surface',
      )}
    >
      <div
        className={cn(
          'flex size-12 shrink-0 items-center justify-center rounded-lg border bg-game-surface-raised',
          isSketchbook
            ? 'border-game-ochre/35 text-game-ochre-strong'
            : 'border-game-border',
        )}
      >
        {isKnown ? (
          isSketchbook ? (
            <BookOpen className="size-6" aria-hidden="true" />
          ) : (
            <ItemSprite
              itemId={getMoveTypeSpriteItemId(entry.move)}
              alt=""
              width={38}
              height={38}
              className="size-9 object-contain"
            />
          )
        ) : (
          <CircleHelp className="size-6 text-game-ochre" aria-hidden="true" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        {isKnown ? (
          <>
            <h3 className="truncate font-display text-base font-semibold text-game-ink">
              {entry.move.name}
            </h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <MoveDexTypeChip type={entry.moveType} typeId={moveTypeId} />
              {stanceConfig && (
                <Badge className="gap-1 border-game-border bg-game-canvas px-2 py-0.5 text-[10px] font-semibold text-game-ink">
                  <StanceIcon
                    stance={entry.move.stance}
                    className={cn('size-3', stanceConfig.tone)}
                  />
                  {stanceConfig.label}
                </Badge>
              )}
              <Badge className="border-game-border bg-game-canvas px-2 py-0.5 text-[10px] font-semibold text-game-muted">
                {getRoleLabel(roles[0] ?? 'utility')}
              </Badge>
              <span className="font-mono text-[11px] font-bold text-game-muted">
                {entry.move.damage > 0
                  ? `${getBasePower(entry.move)} BP`
                  : 'Status'}{' '}
                ·{' '}
                {entry.move.alwaysHits
                  ? 'Always hits'
                  : `${entry.move.accuracy}% ACC`}
              </span>
            </div>
            <p className="mt-1.5 hidden truncate text-xs text-game-muted lg:block">
              {getMovePresentation(entry.move).summary}
            </p>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-sm font-semibold text-game-ink">
                Undiscovered TM
              </h3>
              <Badge className="border-game-ochre/30 bg-game-ochre/10 px-2 py-0.5 text-[10px] font-semibold text-game-ochre-strong">
                Clue
              </Badge>
            </div>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-game-muted sm:text-sm">
              {entry.unlockClue}
            </p>
          </>
        )}
      </div>
      {isKnown && (
        <Badge
          className={cn(
            'hidden shrink-0 border px-2.5 py-1 font-mono text-[10px] font-bold sm:inline-flex',
            isSketchbook
              ? 'border-game-ochre/30 bg-game-ochre/10 text-game-ochre-strong'
              : 'border-game-moss/25 bg-game-moss/10 text-game-moss-strong',
          )}
        >
          {isSketchbook
            ? 'Recorded'
            : isOwned
              ? 'Owned'
              : isSketched
                ? 'Sketched'
                : 'Known'}
        </Badge>
      )}
    </button>
  )
}

function MoveDexTypeChip({
  type,
  typeId,
}: {
  type: string
  typeId: number | null
}) {
  if (!typeId)
    return (
      <Badge className="border-game-border bg-game-canvas px-2 py-0.5 text-[10px] font-semibold text-game-ink">
        {getMoveTypeLabel(type)}
      </Badge>
    )
  return (
    <div className="flex h-6 items-center justify-center rounded-md border border-game-border bg-game-surface-raised px-2">
      <Image
        src={getPokemonTypeIconUrl(typeId)}
        alt={`${getMoveTypeLabel(type)} type`}
        width={64}
        height={28}
        className="h-4 w-auto object-contain"
        unoptimized
      />
    </div>
  )
}

function UnknownMoveNote({ clue }: { clue: string }) {
  return (
    <div className="rounded-xl border border-dashed border-game-ochre/45 bg-game-ochre/10 p-4">
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-game-ochre/30 bg-game-surface-raised">
          <CircleHelp className="size-6 text-game-ochre" aria-hidden="true" />
        </div>
        <div>
          <div className="game-field-label">Discovery clue</div>
          <p className="mt-2 text-sm leading-relaxed text-game-ink">{clue}</p>
          <p className="mt-3 text-xs leading-relaxed text-game-muted">
            Find this TM to reveal its name, type, stance, effects, and
            compatible Pokémon.
          </p>
        </div>
      </div>
    </div>
  )
}

function MoveDexEmptyState({
  selectedView,
  hasActiveFilters,
  onClear,
}: {
  selectedView: MoveDexView
  hasActiveFilters: boolean
  onClear: () => void
}) {
  const isSketchbookEmpty = selectedView === 'sketchbook' && !hasActiveFilters
  const isKnownEmpty = selectedView === 'known' && !hasActiveFilters
  return (
    <div className="game-panel flex min-h-64 items-center justify-center p-6 text-center">
      <div className="max-w-md">
        {isSketchbookEmpty ? (
          <BookOpen
            className="mx-auto size-8 text-game-ochre"
            aria-hidden="true"
          />
        ) : (
          <CircleHelp
            className="mx-auto size-8 text-game-ochre"
            aria-hidden="true"
          />
        )}
        <h2 className="mt-3 font-display text-lg font-semibold text-game-ink">
          {isSketchbookEmpty
            ? 'No moves recorded yet'
            : isKnownEmpty
              ? 'No known TMs yet'
              : 'No records match'}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-game-muted">
          {isSketchbookEmpty
            ? 'Battle with Smeargle and use Sketch. A recorded move is kept when you win.'
            : isKnownEmpty
              ? 'Explore All discoveries for clues that lead to your first TM.'
              : 'Try a different search or clear the active filters.'}
        </p>
        {hasActiveFilters && (
          <Button
            type="button"
            variant="secondary"
            onClick={onClear}
            className="mt-4 min-h-11"
          >
            Clear filters
          </Button>
        )}
      </div>
    </div>
  )
}
