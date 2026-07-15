'use client'

import { Check, Circle, Diamond, Square, Triangle, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { cn } from '@/lib/utils'
import type { Pokemon } from '@/payload-types'
import { getOwnedPokemonGender } from '@/utilities/pokemon/gender'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'

interface PokemonSelectionListProps {
  eligiblePokemon: Pokemon[]
  selectedPokemonIds: string[]
  onToggle: (id: string) => void
  totalRequired: number
}

export function PokemonSelectionList({
  eligiblePokemon,
  selectedPokemonIds,
  onToggle,
  totalRequired,
}: PokemonSelectionListProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {eligiblePokemon.map((p) => {
        const isSelected = selectedPokemonIds.includes(p.id)
        const imageUrl = getPokemonImageUrl(
          p.formId,
          'sprite',
          !!p.shiny,
          getOwnedPokemonGender(p),
        )

        return (
          <button
            type="button"
            aria-pressed={isSelected}
            aria-label={`${isSelected ? 'Remove' : 'Select'} ${p.name || 'Pokémon'}, level ${p.level}`}
            key={p.id}
            className={cn(
              'game-focus-ring group relative flex min-w-0 cursor-pointer flex-col items-center rounded-lg border p-3 transition-colors',
              isSelected
                ? 'border-game-moss/55 bg-game-moss/10'
                : 'border-game-border bg-game-surface hover:border-game-moss/35 hover:bg-game-surface-raised',
            )}
            onClick={() => onToggle(p.id)}
          >
            {/* Selection Indicator */}
            <div
              className={cn(
                'absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full border transition-colors',
                isSelected
                  ? 'border-game-moss bg-game-moss'
                  : 'border-game-border bg-game-canvas',
              )}
            >
              {isSelected && (
                <Check className="h-3 w-3 font-black text-game-cream" />
              )}
            </div>

            <div className="relative mb-2 h-16 w-16">
              <Image
                src={imageUrl}
                alt={p.name || 'Pokemon'}
                fill
                className="object-contain pixelated"
              />
            </div>

            <div className="w-full truncate text-center text-[10px] font-black uppercase tracking-tight text-game-ink transition-colors group-hover:text-game-moss-strong">
              {p.name}
            </div>

            <div className="flex gap-1 mt-1 justify-center items-center h-4">
              {p.shiny && (
                <span className="text-game-ochre text-[10px] drop-shadow-[0_0_5px_rgb(181_138_67_/_0.5)]">
                  ★
                </span>
              )}
              {(p as any).markingSquare && (
                <Square className="w-1.5 h-1.5 text-game-moss fill-current opacity-70" />
              )}
              {(p as any).markingCircle && (
                <Circle className="w-1.5 h-1.5 text-game-danger fill-current opacity-70" />
              )}
              {(p as any).markingTriangle && (
                <Triangle className="w-1.5 h-1.5 text-game-moss-strong fill-current opacity-70" />
              )}
              {(p as any).markingDiamond && (
                <Diamond className="w-1.5 h-1.5 text-game-ochre fill-current opacity-70" />
              )}
            </div>
            <div className="mt-1 font-mono text-[10px] font-bold text-game-muted">
              LVL {p.level}
            </div>
          </button>
        )
      })}

      {eligiblePokemon.length === 0 && (
        <div className="col-span-full flex flex-col items-center justify-center py-10 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-game-border bg-game-surface text-game-muted">
            <X className="w-6 h-6" />
          </div>
          <p className="max-w-xs text-xs font-bold uppercase tracking-widest text-game-muted">
            No Eligible Pokemon Found
          </p>
        </div>
      )}
    </div>
  )
}
