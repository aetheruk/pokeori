'use client'

import { MoveBattleCommand, MoveFieldNote } from '@/components/game/moves'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { ItemSprite } from '@/components/ui/item-sprite'
import { SectionDivider } from '@/components/ui/section-divider'
import type { PokemonTypeName } from '@/data/items/types'
import type { MoveConfig } from '@/data/moves'
import { resolveHiddenPower } from '@/utilities/battle/hidden-power'
import { resolveDynamicMoveType } from '@/utilities/battle/move-effects'
import type { BattlePokemon, BattleState } from '@/utilities/battle/types'
import {
  getMovePresentation,
  type MovePresentation,
} from '@/utilities/pokemon/move-display'

export function getBattleMovePresentation(
  move: MoveConfig,
  pokemon: BattlePokemon,
  state: BattleState,
  selectedType?: string | null,
): MovePresentation {
  // The selected Pokémon type belongs to basic attacks. Authored moves use
  // their own type, or Normal when no authored/dynamic type is configured.
  const fallbackType = 'normal'
  const hiddenPowerType =
    move.id === 'hidden-power'
      ? resolveHiddenPower(pokemon).attackType
      : undefined
  const authoredType =
    move.forcedType === 'random' ? undefined : move.forcedType || fallbackType
  const baseType = hiddenPowerType || authoredType
  const opponent = state.enemyTeam[state.activeEnemyIndex]
  const currentType = move.dynamicType
    ? resolveDynamicMoveType({
        move,
        attacker: pokemon,
        defender: opponent,
        weather: state.weather?.weather,
        fallbackType: baseType || fallbackType,
      })
    : baseType
  return getMovePresentation(move, {
    resolvedType: currentType as PokemonTypeName | undefined,
  })
}

export function BattleMovesContent({
  moves,
  pokemon,
  state,
  selectedType,
  usesRemaining,
  triggerItemId,
  using,
  disabled = false,
  onUseMove,
  onDetails,
  embedded = false,
}: {
  moves: MoveConfig[]
  pokemon: BattlePokemon
  state: BattleState
  selectedType?: string | null
  usesRemaining: number
  triggerItemId: string
  using?: string | null
  disabled?: boolean
  onUseMove: (moveId: string) => void
  onDetails: (moveId: string) => void
  embedded?: boolean
}) {
  return (
    <div className={embedded ? 'mx-auto w-full max-w-2xl pb-4' : 'mx-auto w-full max-w-2xl px-4 pt-4 pb-6'}>
      <div className={embedded ? 'space-y-6' : 'max-h-[calc(70dvh-120px)] space-y-6 overflow-y-auto'}>
        <div className="space-y-3">
          <SectionDivider>
            <span className="flex items-center gap-2 text-game-moss">
              <ItemSprite
                itemId={triggerItemId}
                alt="Moves"
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
              />
              Special Moves ({usesRemaining})
            </span>
          </SectionDivider>
          {moves.length === 0 ? (
            <div
              className="rounded-md border border-dashed border-game-border bg-game-canvas/45 px-3 py-4 text-center text-sm text-game-muted"
              role="status"
              aria-live="polite"
            >
              No special moves available for this Pokemon
            </div>
          ) : usesRemaining <= 0 ? (
            <div
              className="rounded-md border border-dashed border-game-border bg-game-canvas/45 px-3 py-4 text-center text-sm text-game-muted"
              role="status"
              aria-live="polite"
            >
              No move uses remaining this battle
            </div>
          ) : (
            <div className="grid gap-2 pb-1">
              {moves.map((move) => (
                <MoveBattleCommand
                  key={move.id}
                  presentation={getBattleMovePresentation(
                    move,
                    pokemon,
                    state,
                    selectedType,
                  )}
                  onDetails={() => onDetails(move.id)}
                  onSelect={() => onUseMove(move.id)}
                  disabled={disabled || !!using}
                  pending={using === move.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function MoveInfoDialog({
  presentation,
  onOpenChange,
}: {
  presentation: MovePresentation | null
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={presentation !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88dvh] overflow-y-auto border-game-border bg-game-surface text-game-ink sm:max-w-lg">
        <DialogTitle className="sr-only">
          {presentation?.identity.name ?? 'Move details'}
        </DialogTitle>
        {presentation ? <MoveFieldNote presentation={presentation} /> : null}
      </DialogContent>
    </Dialog>
  )
}
