'use client'

import { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react'
import { List, type RowComponentProps } from 'react-window'
import { PremiumSelect } from '@/components/game/shared/PremiumSelect'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ItemSprite } from '@/components/ui/item-sprite'
import { cn } from '@/lib/utils'
import { getMovePresentation, getMoveTypeSpriteItemId } from '@/utilities/pokemon/move-display'
import {
  filterMoveLoadoutEntries,
  type MoveLoadoutEntry,
  type MoveLoadoutFilters,
  type MoveLoadoutRole,
  type MoveLoadoutSort,
} from '@/utilities/pokemon/move-loadout'

const DEFAULT_FILTERS: MoveLoadoutFilters = {
  query: '', type: 'all', stance: 'all', role: 'all', source: 'all', sort: 'assigned',
}

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
  open, onOpenChange, pokemonName, entries, selectedMoveIds, maxMoves,
  hasChanges, isSaving, onToggleMove, onClear, onAutoPick, onSave, onDetails,
}: MoveLoadoutWorkspaceProps) {
  const [filters, setFilters] = useState<MoveLoadoutFilters>(DEFAULT_FILTERS)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const deferredQuery = useDeferredValue(filters.query)

  useEffect(() => {
    setFilters(DEFAULT_FILTERS)
    setFiltersOpen(false)
  }, [pokemonName])

  const entriesById = useMemo(() => new Map(entries.map((entry) => [entry.move.id, entry])), [entries])
  const visibleEntries = useMemo(() => filterMoveLoadoutEntries({
    entries, filters: { ...filters, query: deferredQuery }, selectedMoveIds,
  }), [entries, filters, deferredQuery, selectedMoveIds])
  const typeOptions = useMemo(() => [
    { id: 'all', label: 'All types' },
    ...Array.from(new Set(entries.map((entry) => entry.move.forcedType || 'normal')))
      .sort().map((type) => ({ id: type, label: titleCase(type) })),
  ], [entries])
  const sourceOptions = useMemo(() => [
    { id: 'all', label: 'All sources' },
    ...Array.from(new Map(entries.map((entry) => [entry.source, { id: entry.source, label: entry.sourceLabel }])).values()),
  ], [entries])
  const updateFilter = <Key extends keyof MoveLoadoutFilters>(key: Key, value: MoveLoadoutFilters[Key]) =>
    setFilters((current) => ({ ...current, [key]: value }))
  const rowKey = useCallback((index: number, data: MoveRowData) => data.entries[index]?.move.id ?? index, [])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="game-paper-first !left-0 !top-0 flex h-dvh !max-h-none !w-screen !max-w-none !translate-x-0 !translate-y-0 flex-col gap-0 overflow-hidden rounded-none border-0 bg-game-canvas p-0 text-game-ink sm:p-0">
        <header className="shrink-0 border-b border-game-border bg-game-surface-raised px-4 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))] pr-14 sm:px-6 sm:pr-16">
          <DialogHeader className="gap-0">
            <DialogTitle className="font-display text-lg">{pokemonName}&apos;s moves</DialogTitle>
            <DialogDescription className="sr-only">Choose and save battle moves.</DialogDescription>
          </DialogHeader>
        </header>

        <section className="shrink-0 border-b border-game-border bg-game-surface-raised px-3 py-2 sm:px-5" aria-label="Assigned moves">
          <div className="mx-auto max-w-4xl">
            <div className="mb-1.5 flex items-center gap-2">
              <h2 className="text-xs font-bold text-game-ink">Assigned moves <span className="font-mono font-normal text-game-muted">{selectedMoveIds.length}/{maxMoves}</span></h2>
              <button type="button" onClick={onClear} disabled={!selectedMoveIds.length} className="game-focus-ring ml-auto min-h-9 rounded-md px-2 text-xs text-game-muted disabled:opacity-40">Clear</button>
              <button type="button" onClick={onAutoPick} disabled={!entries.length || maxMoves <= 0 || isSaving} className="game-focus-ring min-h-9 rounded-md border border-game-border px-3 text-xs font-semibold disabled:opacity-40">Auto-pick</button>
            </div>
            <ol className="grid grid-cols-2 gap-1.5">
              {Array.from({ length: maxMoves }, (_, index) => {
                const entry = entriesById.get(selectedMoveIds[index])
                return (
                  <li key={index} className={cn('flex h-10 min-w-0 items-center gap-1.5 rounded-lg border px-2', entry ? 'border-game-moss/50 bg-game-moss/10' : 'border-dashed border-game-border bg-game-canvas/50')}>
                    <span className="shrink-0 font-mono text-[10px] text-game-muted">{index + 1}</span>
                    {entry && <>
                      <ItemSprite itemId={getMoveTypeSpriteItemId(entry.move)} alt="" width={22} height={22} className="size-5 shrink-0 object-contain" />
                      <span className="min-w-0 flex-1 truncate text-xs font-semibold">{entry.move.name}</span>
                      <button type="button" onClick={() => onToggleMove(entry.move.id)} aria-label={`Remove ${entry.move.name}`} className="game-focus-ring flex size-8 shrink-0 items-center justify-center rounded-md text-lg text-game-muted hover:bg-game-charcoal/10">×</button>
                    </>}
                  </li>
                )
              })}
            </ol>
          </div>
        </section>

        <div className="mx-auto flex min-h-0 w-full max-w-4xl flex-1 flex-col px-3 pt-2 sm:px-5">
          <div className="flex shrink-0 gap-2">
            <label className="sr-only" htmlFor="move-loadout-search">Find a move</label>
            <Input id="move-loadout-search" type="search" value={filters.query} onChange={(event) => updateFilter('query', event.target.value)} placeholder="Find a move" className="min-w-0 flex-1 bg-game-surface-raised" />
            <Button type="button" variant="outline" onClick={() => setFiltersOpen((current) => !current)} aria-expanded={filtersOpen} aria-controls="move-loadout-filters" className="min-h-10 shrink-0">Filters</Button>
          </div>
          {filtersOpen && (
            <div id="move-loadout-filters" className="custom-scrollbar mt-2 grid max-h-48 shrink-0 grid-cols-2 gap-2 overflow-y-auto pb-1 sm:grid-cols-3">
              <PremiumSelect label="Type" value={filters.type} onValueChange={(value) => updateFilter('type', value)} options={typeOptions} />
              <PremiumSelect label="Stance" value={filters.stance} onValueChange={(value) => updateFilter('stance', value as MoveLoadoutFilters['stance'])} options={[{ id: 'all', label: 'All stances' }, ...['power', 'speed', 'tech', 'random'].map((id) => ({ id, label: titleCase(id) }))]} />
              <PremiumSelect label="Effect" value={filters.role} onValueChange={(value) => updateFilter('role', value as 'all' | MoveLoadoutRole)} options={[{ id: 'all', label: 'All effects' }, ...['damage', 'status', 'healing', 'setup', 'utility'].map((id) => ({ id, label: id === 'setup' ? 'Stat changes' : titleCase(id) }))]} />
              <PremiumSelect label="Source" value={filters.source} onValueChange={(value) => updateFilter('source', value as MoveLoadoutFilters['source'])} options={sourceOptions} />
              <PremiumSelect label="Sort" value={filters.sort} onValueChange={(value) => updateFilter('sort', value as MoveLoadoutSort)} options={[{ id: 'assigned', label: 'Assigned first' }, { id: 'name', label: 'Name A–Z' }, { id: 'power', label: 'Power high–low' }, { id: 'accuracy', label: 'Accuracy high–low' }]} />
              <button type="button" onClick={() => setFilters(DEFAULT_FILTERS)} className="game-focus-ring self-end rounded-md border border-game-border px-2 py-2.5 text-xs text-game-muted">Clear filters</button>
            </div>
          )}

          <div className="min-h-0 flex-1 py-2">
            {visibleEntries.length ? (
              <List rowComponent={MoveRow} rowCount={visibleEntries.length} rowHeight={62} rowProps={{ entries: visibleEntries, selectedMoveIds, maxMoves, onToggleMove, onDetails }} rowKey={rowKey} overscanCount={6} defaultHeight={480} className="custom-scrollbar touch-pan-y" style={{ height: '100%', minHeight: 0 }} aria-label="Available moves" />
            ) : (
              <p className="py-8 text-center text-sm text-game-muted">No matching moves</p>
            )}
          </div>
        </div>

        <footer className="shrink-0 border-t border-game-border bg-game-surface-raised px-3 pt-2 pb-[max(0.65rem,env(safe-area-inset-bottom))] sm:px-5">
          <div className="mx-auto flex max-w-4xl gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="min-h-11 flex-1">Cancel</Button>
            <Button type="button" onClick={onSave} disabled={!hasChanges || isSaving} className="min-h-11 flex-1 bg-game-charcoal text-game-cream hover:bg-game-charcoal-strong">{isSaving ? 'Saving…' : 'Save moves'}</Button>
          </div>
        </footer>
      </DialogContent>
    </Dialog>
  )
}

type MoveRowData = {
  entries: MoveLoadoutEntry[]
  selectedMoveIds: string[]
  maxMoves: number
  onToggleMove: (moveId: string) => void
  onDetails: (moveId: string) => void
}

function MoveRow({ index, style, ariaAttributes, entries, selectedMoveIds, maxMoves, onToggleMove, onDetails }: RowComponentProps<MoveRowData>) {
  const entry = entries[index]
  if (!entry) return null
  const selected = selectedMoveIds.includes(entry.move.id)
  const disabled = !selected && selectedMoveIds.length >= maxMoves
  const presentation = getMovePresentation(entry.move, { source: { kind: entry.source, label: entry.sourceLabel } })
  return (
    <div style={style} {...ariaAttributes} className="pb-1.5">
      <div className={cn('flex h-full min-w-0 items-center overflow-hidden rounded-lg border bg-game-surface-raised', selected ? 'border-game-moss bg-game-moss/10' : 'border-game-border')}>
        <button type="button" data-haptic-manual="true" onClick={() => onToggleMove(entry.move.id)} disabled={disabled} aria-pressed={selected} aria-label={`${selected ? 'Remove' : 'Assign'} ${entry.move.name}`} className="game-focus-ring flex h-full min-w-0 flex-1 items-center gap-2 px-2 text-left disabled:opacity-50">
          <ItemSprite itemId={getMoveTypeSpriteItemId(entry.move)} alt="" width={30} height={30} className="size-8 shrink-0 object-contain" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold">{entry.move.name}</span>
            <span className="block truncate font-mono text-[10px] text-game-muted">Pwr {presentation.essentials.power.value} · Acc {presentation.essentials.accuracy.value}</span>
          </span>
          {selected && <span aria-hidden="true" className="shrink-0 text-sm font-bold text-game-moss-strong">✓</span>}
        </button>
        <button type="button" data-haptic-manual="true" onClick={() => onDetails(entry.move.id)} aria-label={`View ${entry.move.name} details`} className="game-focus-ring flex h-full w-11 shrink-0 items-center justify-center border-l border-game-border text-sm font-bold text-game-muted hover:bg-game-canvas">i</button>
      </div>
    </div>
  )
}

function titleCase(value: string): string {
  return value.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
}
