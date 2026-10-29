'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  type DragEndEvent,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Heart, Plus, Swords, Trash2 } from 'lucide-react'
import { PokemonRaritySprite } from '@/components/game/shared/PokemonRaritySprite'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import type { Pokemon } from '@/payload-types'
import { getOwnedPokemonGender } from '@/utilities/pokemon/gender'
import { MAX_BATTLE_TEAM_SIZE } from '@/utilities/pokemon/battle-team'

type RosterTarget = 'battle-team' | 'companion'
type Placement = { pokemonId: string; position: number }

interface PokemonBattleTeamManagerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  battleTeam: Pokemon[]
  companion: Pokemon | null
  busy: boolean
  onChooseFromBox: (target: RosterTarget) => void
  onRemove: (pokemon: Pokemon) => void
  onReorder: (placements: Placement[]) => void
}

function PokemonFace({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border border-game-card-border bg-game-surface-raised p-2">
      <PokemonRaritySprite
        formId={pokemon.formId}
        view="home"
        rarity={pokemon.rarity}
        shiny={pokemon.shiny}
        isShadow={pokemon.isShadow}
        isRadiant={pokemon.isRadiant}
        female={getOwnedPokemonGender(pokemon) === 'female'}
        alt={pokemon.name || 'Pokémon'}
        className="size-full"
        normalizeVisibleBounds
      />
    </div>
  )
}

function SortableTeamSlot({
  pokemon,
  index,
  selected,
  disabled,
  onSelect,
}: {
  pokemon: Pokemon
  index: number
  selected: boolean
  disabled: boolean
  onSelect: () => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: pokemon.id, disabled })

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn('min-w-0', isDragging && 'z-10 opacity-50')}
      {...attributes}
      {...listeners}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={cn(
          'game-focus-ring block w-full rounded-xl p-1 text-left transition-colors',
          selected ? 'bg-game-moss/10 ring-2 ring-game-moss' : 'hover:bg-game-moss/5',
        )}
      >
        <PokemonFace pokemon={pokemon} />
        <span className="mt-1 block truncate px-1 text-center text-xs font-semibold text-game-ink">
          {index + 1}. {pokemon.name || 'Pokémon'}
        </span>
        <span className="block text-center font-mono text-[10px] text-game-muted">
          Lv. {pokemon.level}
        </span>
      </button>
    </li>
  )
}

export function PokemonBattleTeamManager({
  open,
  onOpenChange,
  battleTeam,
  companion,
  busy,
  onChooseFromBox,
  onRemove,
  onReorder,
}: PokemonBattleTeamManagerProps) {
  const [selectedPokemonId, setSelectedPokemonId] = useState<string | null>(null)
  const sortedTeam = useMemo(
    () => [...battleTeam].sort((a, b) => (a.battleTeamPosition || 0) - (b.battleTeamPosition || 0)),
    [battleTeam],
  )
  const selectedPokemon =
    sortedTeam.find((pokemon) => pokemon.id === selectedPokemonId) ||
    (companion?.id === selectedPokemonId ? companion : null)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  useEffect(() => {
    if (selectedPokemonId && !selectedPokemon) setSelectedPokemonId(null)
  }, [selectedPokemon, selectedPokemonId])

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id || busy) return
    const from = sortedTeam.findIndex((pokemon) => pokemon.id === active.id)
    const to = sortedTeam.findIndex((pokemon) => pokemon.id === over.id)
    if (from < 0 || to < 0) return
    const reordered = arrayMove(sortedTeam, from, to)
    const occupiedPositions = sortedTeam
      .map((pokemon) => pokemon.battleTeamPosition || 0)
      .sort((a, b) => a - b)
    onReorder(
      reordered.map((pokemon, index) => ({
        pokemonId: pokemon.id,
        position: occupiedPositions[index],
      })),
    )
  }

  const requestBoxSelection = (target: RosterTarget) => {
    onOpenChange(false)
    onChooseFromBox(target)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="game-paper-first !left-0 !top-0 grid h-dvh !max-h-none !w-screen !max-w-none !translate-x-0 !translate-y-0 grid-rows-[auto_minmax(0,1fr)_auto] gap-0 overflow-hidden rounded-none border-0 bg-game-canvas p-0 text-game-ink sm:p-0">
        <header className="border-b border-game-border bg-game-surface-raised px-4 py-4 pr-14 sm:px-6 sm:pr-16">
          <DialogHeader className="gap-0.5">
            <DialogTitle className="font-display text-xl">Battle team</DialogTitle>
            <DialogDescription className="text-sm">
              {sortedTeam.length}/{MAX_BATTLE_TEAM_SIZE} Pokémon · drag to reorder
            </DialogDescription>
          </DialogHeader>
        </header>

        <main className="custom-scrollbar min-h-0 overflow-y-auto overscroll-contain p-3 sm:p-5">
          <div className="mx-auto w-full max-w-3xl">
            <section aria-labelledby="pokemon-team-title">
              <div className="mb-3 flex items-center gap-2">
                <Swords className="size-4 text-game-moss-strong" aria-hidden="true" />
                <h2 id="pokemon-team-title" className="font-display text-base font-bold">Team</h2>
                <span className="ml-auto font-mono text-xs text-game-muted">
                  {sortedTeam.length}/{MAX_BATTLE_TEAM_SIZE}
                </span>
              </div>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={sortedTeam.map((pokemon) => pokemon.id)} strategy={rectSortingStrategy}>
                  <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3" aria-label="Battle team order">
                    {Array.from({ length: MAX_BATTLE_TEAM_SIZE }, (_, index) => {
                      const pokemon = sortedTeam[index]
                      return pokemon ? (
                        <SortableTeamSlot
                          key={pokemon.id}
                          pokemon={pokemon}
                          index={index}
                          selected={pokemon.id === selectedPokemonId}
                          disabled={busy}
                          onSelect={() => setSelectedPokemonId(pokemon.id)}
                        />
                      ) : (
                        <li key={`empty-${index}`}>
                          <button
                            type="button"
                            onClick={() => requestBoxSelection('battle-team')}
                            disabled={busy}
                            aria-label="Choose a Pokémon from the box"
                            className="game-focus-ring flex aspect-square w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-game-border bg-game-surface/50 text-game-muted transition-colors hover:border-game-moss/50 hover:bg-game-moss/5"
                          >
                            <Plus className="size-5" aria-hidden="true" />
                            <span className="mt-1 font-mono text-[10px]">Open slot</span>
                          </button>
                        </li>
                      )
                    })}
                  </ol>
                </SortableContext>
              </DndContext>
            </section>

            <section className="mt-6 border-t border-game-border pt-4" aria-labelledby="pokemon-partner-title">
              <div className="mb-3 flex items-center gap-2">
                <Heart className="size-4 text-game-moss-strong" aria-hidden="true" />
                <h2 id="pokemon-partner-title" className="font-display text-base font-bold">Partner</h2>
              </div>
              {companion ? (
                <button
                  type="button"
                  onClick={() => setSelectedPokemonId(companion.id)}
                  aria-pressed={companion.id === selectedPokemonId}
                  className={cn('game-focus-ring flex w-full max-w-xs items-center gap-3 rounded-xl border p-2 text-left', companion.id === selectedPokemonId ? 'border-game-moss bg-game-moss/10' : 'border-game-border bg-game-surface-raised')}
                >
                  <div className="size-16 shrink-0"><PokemonFace pokemon={companion} /></div>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{companion.name || 'Pokémon'}</span>
                    <span className="font-mono text-xs text-game-muted">Lv. {companion.level}</span>
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => requestBoxSelection('companion')}
                  disabled={busy}
                  className="game-focus-ring flex min-h-20 w-full max-w-xs items-center justify-center gap-2 rounded-xl border-2 border-dashed border-game-border text-sm text-game-muted hover:border-game-moss/50 hover:bg-game-moss/5"
                >
                  <Plus className="size-4" aria-hidden="true" /> Choose a partner
                </button>
              )}
            </section>
          </div>
        </main>

        {selectedPokemon && (
          <footer className="border-t border-game-border bg-game-surface-raised px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div className="mx-auto flex w-full max-w-3xl items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{selectedPokemon.name || 'Pokémon'}</p>
                <p className="text-xs text-game-muted">
                  {selectedPokemon.id === companion?.id ? 'Partner' : 'Battle team'}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                disabled={busy}
                onClick={() => onRemove(selectedPokemon)}
                className="min-h-11 border-game-danger/30 text-game-danger hover:bg-game-danger/10"
              >
                <Trash2 className="mr-2 size-4" aria-hidden="true" /> Remove
              </Button>
            </div>
          </footer>
        )}
      </DialogContent>
    </Dialog>
  )
}
