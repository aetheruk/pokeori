'use client'

import {
  BookOpen,
  Check,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react'
import type { CSSProperties } from 'react'
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { List, type RowComponentProps, useDynamicRowHeight } from 'react-window'
import { PremiumSelect } from '@/components/game/shared/PremiumSelect'
import {
  STANCE_ICON_CONFIG,
  StanceIcon,
} from '@/components/game/shared/stance-icon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ItemSprite } from '@/components/ui/item-sprite'
import { cn } from '@/lib/utils'
import {
  getMovePresentation,
  getMoveTypeSpriteItemId,
} from '@/utilities/pokemon/move-display'
import {
  filterMoveLoadoutEntries,
  getMoveLoadoutRoles,
  type MoveLoadoutEntry,
  type MoveLoadoutFilters,
  type MoveLoadoutRole,
  type MoveLoadoutSort,
} from '@/utilities/pokemon/move-loadout'

const DEFAULT_FILTERS: MoveLoadoutFilters = {
  query: '',
  type: 'all',
  stance: 'all',
  role: 'all',
  source: 'all',
  sort: 'assigned',
}

const STANCE_OPTIONS = [
  { id: 'all', label: 'All stances' },
  { id: 'power', label: 'Power' },
  { id: 'speed', label: 'Speed' },
  { id: 'tech', label: 'Tech' },
  { id: 'random', label: 'Random' },
]

const ROLE_OPTIONS = [
  { id: 'all', label: 'All effects' },
  { id: 'damage', label: 'Damage' },
  { id: 'status', label: 'Status' },
  { id: 'healing', label: 'Healing' },
  { id: 'setup', label: 'Stat changes' },
  { id: 'utility', label: 'Utility' },
]

const SORT_OPTIONS = [
  { id: 'assigned', label: 'Assigned first' },
  { id: 'name', label: 'Name A–Z' },
  { id: 'power', label: 'Power high–low' },
  { id: 'accuracy', label: 'Accuracy high–low' },
]

export interface MoveLoadoutWorkspaceProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pokemonName: string
  entries: MoveLoadoutEntry[]
  selectedMoveIds: string[]
  maxMoves: number
  hasChanges: boolean
  isSaving: boolean
  onToggleMove: (moveId: string) => void
  onClear: () => void
  onAutoPick: () => void
  onSave: () => void
  onDetails: (moveId: string) => void
}

export function MoveLoadoutWorkspace({
  open,
  onOpenChange,
  pokemonName,
  entries,
  selectedMoveIds,
  maxMoves,
  hasChanges,
  isSaving,
  onToggleMove,
  onClear,
  onAutoPick,
  onSave,
  onDetails,
}: MoveLoadoutWorkspaceProps) {
  const [filters, setFilters] = useState<MoveLoadoutFilters>(DEFAULT_FILTERS)
  const [filtersExpanded, setFiltersExpanded] = useState(false)
  const [listColumns, setListColumns] = useState(1)
  const deferredQuery = useDeferredValue(filters.query)

  useEffect(() => {
    setFilters(DEFAULT_FILTERS)
    setFiltersExpanded(false)
  }, [pokemonName])

  useEffect(() => {
    const updateColumns = () =>
      setListColumns(window.innerWidth >= 1280 ? 2 : 1)
    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  const entriesById = useMemo(
    () => new Map(entries.map((entry) => [entry.move.id, entry])),
    [entries],
  )
  const selectedEntries = selectedMoveIds.flatMap((moveId) => {
    const entry = entriesById.get(moveId)
    return entry ? [entry] : []
  })
  const typeOptions = useMemo(
    () => [
      { id: 'all', label: 'All types' },
      ...Array.from(
        new Set(entries.map((entry) => entry.move.forcedType || 'normal')),
      )
        .sort()
        .map((type) => ({ id: type, label: titleCase(type) })),
    ],
    [entries],
  )
  const sourceOptions = useMemo(
    () => [
      { id: 'all', label: 'All sources' },
      ...Array.from(
        new Map(
          entries.map((entry) => [
            entry.source,
            { id: entry.source, label: entry.sourceLabel },
          ]),
        ).values(),
      ),
    ],
    [entries],
  )
  const visibleEntries = useMemo(
    () =>
      filterMoveLoadoutEntries({
        entries,
        filters: { ...filters, query: deferredQuery },
        selectedMoveIds,
      }),
    [deferredQuery, entries, filters, selectedMoveIds],
  )
  const hasFilters =
    filters.query.length > 0 ||
    filters.type !== 'all' ||
    filters.stance !== 'all' ||
    filters.role !== 'all' ||
    filters.source !== 'all' ||
    filters.sort !== 'assigned'
  const dynamicRowHeight = useDynamicRowHeight({
    defaultRowHeight: 90,
    key: `${listColumns}:${deferredQuery}:${filters.type}:${filters.stance}:${filters.role}:${filters.source}:${filters.sort}`,
  })
  const rowKey = useCallback(
    (index: number, data: LoadoutListRowData) =>
      data.entries[index * data.columns]?.move.id ?? index,
    [],
  )

  const updateFilter = <Key extends keyof MoveLoadoutFilters>(
    key: Key,
    value: MoveLoadoutFilters[Key],
  ) => setFilters((current) => ({ ...current, [key]: value }))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="game-paper-first !left-0 !top-0 grid h-dvh !max-h-none !w-screen !max-w-none !translate-x-0 !translate-y-0 grid-rows-[auto_minmax(0,1fr)_auto] gap-0 overflow-hidden rounded-none border-0 bg-game-canvas p-0 sm:p-0">
        <header className="border-b border-game-border bg-game-surface-raised px-4 py-3 pr-14 sm:px-6 sm:py-4 sm:pr-16">
          <DialogHeader className="gap-0.5">
            <p className="game-field-label text-game-moss-strong">
              Battle loadout
            </p>
            <DialogTitle className="text-xl sm:text-2xl">
              Choose {pokemonName}&apos;s moves
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Fill up to {maxMoves} slots. Open a field note for full move
              details.
            </DialogDescription>
          </DialogHeader>
        </header>

        <div className="grid min-h-0 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <aside className="border-b border-game-border bg-game-surface px-4 py-3 lg:border-b-0 lg:border-r lg:px-5 lg:py-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-sm font-bold text-game-ink">
                  Field kit
                </h3>
                <p className="font-mono text-[11px] text-game-muted">
                  {selectedMoveIds.length}/{maxMoves} slots filled
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={onAutoPick}
                disabled={entries.length === 0 || maxMoves <= 0}
                className="min-h-10"
              >
                <Sparkles className="size-4" aria-hidden="true" />
                Auto-pick
              </Button>
            </div>

            <ol className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-1">
              {Array.from({ length: maxMoves }, (_, index) => {
                const entry = selectedEntries[index]
                return (
                  <li
                    key={`move-slot-${index + 1}`}
                    className={cn(
                      'flex min-h-12 items-center gap-2 rounded-lg border px-2.5 py-2',
                      entry
                        ? 'border-game-moss/45 bg-game-moss/10'
                        : 'border-dashed border-game-border bg-game-canvas',
                    )}
                  >
                    <span className="font-mono text-[10px] font-bold text-game-muted">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {entry ? (
                      <>
                        <span className="min-w-0 flex-1 truncate text-xs font-bold text-game-ink">
                          {entry.move.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => onToggleMove(entry.move.id)}
                          aria-label={`Remove ${entry.move.name}`}
                          className="flex size-8 shrink-0 items-center justify-center rounded-md text-game-muted hover:bg-game-clay/10 hover:text-game-clay-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-game-moss/50"
                        >
                          <X className="size-3.5" aria-hidden="true" />
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-game-muted">Open slot</span>
                    )}
                  </li>
                )
              })}
            </ol>

            {selectedMoveIds.length > 0 ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="mt-2 min-h-10 w-full text-game-muted"
              >
                <RotateCcw className="size-3.5" aria-hidden="true" />
                Clear selection
              </Button>
            ) : null}
          </aside>

          <main className="flex min-h-0 flex-col">
            <div className="border-b border-game-border bg-game-surface-raised px-4 py-3 sm:px-5">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 xl:grid-cols-[minmax(13rem,1.4fr)_repeat(5,minmax(8rem,1fr))]">
                <div className="space-y-2">
                  <label
                    htmlFor="move-loadout-search"
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
                      id="move-loadout-search"
                      type="search"
                      value={filters.query}
                      onChange={(event) =>
                        updateFilter('query', event.target.value)
                      }
                      placeholder="Search names or effects"
                      className="pl-9"
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  aria-expanded={filtersExpanded}
                  aria-controls="move-loadout-filter-fields"
                  onClick={() => setFiltersExpanded((current) => !current)}
                  className="mt-[1.625rem] min-h-11 px-3 xl:hidden"
                >
                  <SlidersHorizontal className="size-4" aria-hidden="true" />
                  Filters
                </Button>
                <div
                  id="move-loadout-filter-fields"
                  className={cn(
                    'col-span-2 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:contents',
                    !filtersExpanded && 'hidden xl:contents',
                  )}
                >
                  <PremiumSelect
                    label="Type"
                    value={filters.type}
                    onValueChange={(value) => updateFilter('type', value)}
                    options={typeOptions}
                  />
                  <PremiumSelect
                    label="Stance"
                    value={filters.stance}
                    onValueChange={(value) =>
                      updateFilter(
                        'stance',
                        value as MoveLoadoutFilters['stance'],
                      )
                    }
                    options={STANCE_OPTIONS}
                  />
                  <PremiumSelect
                    label="Effect"
                    value={filters.role}
                    onValueChange={(value) =>
                      updateFilter('role', value as 'all' | MoveLoadoutRole)
                    }
                    options={ROLE_OPTIONS}
                  />
                  <PremiumSelect
                    label="Source"
                    value={filters.source}
                    onValueChange={(value) =>
                      updateFilter(
                        'source',
                        value as MoveLoadoutFilters['source'],
                      )
                    }
                    options={sourceOptions}
                  />
                  <PremiumSelect
                    label="Sort"
                    value={filters.sort}
                    onValueChange={(value) =>
                      updateFilter('sort', value as MoveLoadoutSort)
                    }
                    options={SORT_OPTIONS}
                    className="col-span-2 sm:col-span-1"
                  />
                </div>
              </div>
              <div className="mt-2 flex min-h-8 items-center gap-2 border-t border-game-border pt-2 text-xs text-game-muted">
                <span aria-live="polite">
                  {visibleEntries.length}{' '}
                  {visibleEntries.length === 1 ? 'move' : 'moves'}
                </span>
                {hasFilters ? (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => setFilters(DEFAULT_FILTERS)}
                    className="ml-auto min-h-8 px-2 text-xs"
                  >
                    <X className="size-3.5" aria-hidden="true" />
                    Clear filters
                  </Button>
                ) : null}
              </div>
            </div>

            <div className="min-h-0 flex-1 px-4 py-3 sm:px-5 sm:py-4">
              {visibleEntries.length ? (
                <List
                  rowComponent={LoadoutListRow}
                  rowCount={Math.ceil(visibleEntries.length / listColumns)}
                  rowHeight={dynamicRowHeight}
                  rowProps={{
                    columns: listColumns,
                    entries: visibleEntries,
                    maxMoves,
                    onDetails,
                    onToggleMove,
                    selectedMoveIds,
                  }}
                  rowKey={rowKey}
                  overscanCount={6}
                  defaultHeight={560}
                  className="custom-scrollbar"
                  style={{ height: '100%', minHeight: 240 }}
                  aria-label="Eligible battle moves"
                />
              ) : (
                <div className="mx-auto mt-12 max-w-sm rounded-xl border border-dashed border-game-border bg-game-surface-raised p-6 text-center">
                  <Search
                    className="mx-auto size-6 text-game-muted"
                    aria-hidden="true"
                  />
                  <h3 className="mt-3 font-display text-base font-bold text-game-ink">
                    No matching moves
                  </h3>
                  <p className="mt-1 text-sm text-game-muted">
                    Clear a filter or try a broader search.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>

        <footer className="flex items-center gap-3 border-t border-game-border bg-game-surface-raised px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:justify-end sm:px-6">
          <p className="mr-auto hidden text-xs text-game-muted sm:block">
            Auto-pick creates a balanced starting point. You can change every
            slot before saving.
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="min-h-11 flex-1 sm:flex-none"
          >
            Keep editing later
          </Button>
          <Button
            type="button"
            onClick={onSave}
            disabled={!hasChanges || isSaving}
            className="min-h-11 flex-1 bg-game-clay text-game-cream hover:bg-game-clay/90 sm:flex-none"
          >
            {isSaving ? 'Saving…' : 'Save loadout'}
          </Button>
        </footer>
      </DialogContent>
    </Dialog>
  )
}

type LoadoutListRowData = {
  columns: number
  entries: MoveLoadoutEntry[]
  maxMoves: number
  onDetails: (moveId: string) => void
  onToggleMove: (moveId: string) => void
  selectedMoveIds: string[]
}

function LoadoutListRow({
  index,
  style,
  ariaAttributes,
  columns,
  entries,
  maxMoves,
  onDetails,
  onToggleMove,
  selectedMoveIds,
}: RowComponentProps<LoadoutListRowData>) {
  const rowEntries = entries.slice(index * columns, index * columns + columns)

  return (
    <div
      style={
        {
          ...style,
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        } as CSSProperties
      }
      {...ariaAttributes}
      className="grid gap-2 pb-2"
      data-columns={columns}
    >
      {rowEntries.map((entry) => {
        const selected = selectedMoveIds.includes(entry.move.id)
        return (
          <LoadoutMoveRow
            key={entry.move.id}
            entry={entry}
            selected={selected}
            disabled={!selected && selectedMoveIds.length >= maxMoves}
            onToggle={() => onToggleMove(entry.move.id)}
            onDetails={() => onDetails(entry.move.id)}
          />
        )
      })}
    </div>
  )
}

function LoadoutMoveRow({
  entry,
  selected,
  disabled,
  onToggle,
  onDetails,
}: {
  entry: MoveLoadoutEntry
  selected: boolean
  disabled: boolean
  onToggle: () => void
  onDetails: () => void
}) {
  const presentation = getMovePresentation(entry.move, {
    source: { kind: entry.source, label: entry.sourceLabel },
  })
  const stance = STANCE_ICON_CONFIG[presentation.identity.stance]
  const roles = getMoveLoadoutRoles(entry.move)

  return (
    <article
      className={cn(
        'grid min-h-16 grid-cols-[minmax(0,1fr)_auto] overflow-hidden rounded-xl border bg-game-surface-raised',
        selected ? 'border-game-moss bg-game-moss/10' : 'border-game-border',
      )}
    >
      <button
        type="button"
        onClick={onDetails}
        aria-label={`View ${entry.move.name} details`}
        className="group flex min-w-0 items-center gap-3 px-3 py-2 text-left outline-none hover:bg-game-moss/5 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-game-moss/60"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-game-border bg-game-canvas">
          <ItemSprite
            itemId={getMoveTypeSpriteItemId(entry.move)}
            alt=""
            width={32}
            height={32}
            className="size-8 object-contain"
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex min-w-0 items-center gap-2">
            <strong className="truncate font-display text-sm text-game-ink">
              {entry.move.name}
            </strong>
            <BookOpen
              className="size-3.5 shrink-0 text-game-muted group-hover:text-game-moss-strong"
              aria-hidden="true"
            />
          </span>
          <span className="mt-1 flex min-w-0 flex-wrap items-center gap-x-1.5 text-[11px] font-semibold text-game-muted">
            <span>{titleCase(presentation.identity.type)}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <StanceIcon
                stance={presentation.identity.stance}
                className={cn('size-3', stance?.tone)}
                aria-hidden="true"
              />
              {stance?.label ?? titleCase(presentation.identity.stance)}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-game-ink">
              {presentation.essentials.power.value}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">
              {presentation.essentials.accuracy.value}
            </span>
          </span>
          <span className="mt-1 flex min-w-0 items-center gap-1.5">
            <span className="truncate text-[10px] text-game-muted">
              {entry.sourceLabel}
            </span>
            {roles.slice(0, 2).map((role) => (
              <Badge
                key={role}
                variant="outline"
                className="h-4 border-game-border px-1.5 text-[9px] text-game-muted"
              >
                {roleLabel(role)}
              </Badge>
            ))}
          </span>
        </span>
      </button>

      <div className="flex items-center border-l border-game-border px-2">
        <Button
          type="button"
          size="sm"
          variant={selected ? 'secondary' : 'outline'}
          onClick={onToggle}
          disabled={disabled}
          aria-pressed={selected}
          aria-label={
            selected
              ? `Remove ${entry.move.name}`
              : disabled
                ? `No open move slot for ${entry.move.name}`
                : `Assign ${entry.move.name}`
          }
          className="min-h-11 min-w-20"
        >
          {selected ? (
            <>
              <Check className="size-4" aria-hidden="true" />
              Added
            </>
          ) : disabled ? (
            'Full'
          ) : (
            'Add'
          )}
        </Button>
      </div>
    </article>
  )
}

function titleCase(value: string): string {
  return value
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function roleLabel(role: MoveLoadoutRole): string {
  if (role === 'setup') return 'Stats'
  return titleCase(role)
}
