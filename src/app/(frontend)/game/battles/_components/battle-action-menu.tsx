'use client'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'
import {
  needsPlayerLeadSelection,
  needsPlayerMoveSwitch,
  needsPlayerReplacement,
} from '@/utilities/battle/switching'
import { getPokemonTypeIconUrl } from '@/utilities/pokemon/sprite-proxy'
import { useBattleContext } from './battle-context'
import { ItemSelector } from './item-selector'
import { PowerSelector } from './power-selector'
import { StanceSelector } from './stance-selector'
import { TeamSwapper } from './team-swapper'

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

export function BattleActionMenu() {
  const {
    battleState,
    activePlayerMon,
    activeEnemyMon,
    selectedType,
    setSelectedType,
    isAnimating,
    isWaitingForServer,
    pendingBattleAction,
    hasPowerKeyItems,
    availableMoves,
    handleStanceSelect,
    handleUseMove,
  } = useBattleContext()

  const isDisabled =
    isAnimating || isWaitingForServer || battleState.status !== 'ongoing'
  const activeDisabledStance =
    activePlayerMon.disabledStance &&
    activePlayerMon.disabledStance.turnsRemaining > 0
      ? activePlayerMon.disabledStance
      : undefined
  const requiresReplacement =
    battleState.pendingPlayerSwitch === true &&
    needsPlayerReplacement(battleState)
  const requiresLeadSelection = needsPlayerLeadSelection(battleState)
  const requiresMoveSwitch = needsPlayerMoveSwitch(battleState)
  const activeMoveLock = battleState.playerMoveLock
  const lockedMove = activeMoveLock
    ? availableMoves.find((move) => move.id === activeMoveLock.moveId)
    : undefined
  const lockedMoveLabel =
    activeMoveLock?.type === 'recharge'
      ? 'Recharge'
      : activeMoveLock?.type === 'charge' && activeMoveLock.remainingTurns > 0
        ? 'Charge'
        : activeMoveLock?.moveName || lockedMove?.name || 'Continue'

  return (
    <div
      className={cn(
        'game-paper-texture relative flex min-h-[13rem] flex-[10] flex-col items-center border-t border-game-border bg-game-surface px-3 py-3 text-game-ink transition-opacity',
        isWaitingForServer && 'opacity-75',
      )}
      aria-busy={isWaitingForServer || isAnimating}
    >
      {isWaitingForServer && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-game-surface/80 backdrop-blur-[1px]">
          <div className="flex flex-col items-center gap-2 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-game-moss" />
            <div className="rounded-full border border-game-moss/30 bg-game-surface-raised px-3 py-1 text-xs font-semibold text-game-moss-strong">
              {pendingBattleAction?.label || 'Resolving action'}
            </div>
          </div>
        </div>
      )}

      {requiresLeadSelection || requiresReplacement || requiresMoveSwitch ? (
        <div className="flex w-full max-w-md flex-col items-center gap-3">
          <div className="w-full rounded-lg border border-game-ochre/40 bg-game-ochre/10 px-4 py-3 text-center text-sm font-semibold text-game-ink">
            {requiresLeadSelection
              ? `A wild ${activeEnemyMon.battleAbilityState?.illusionMask?.name || activeEnemyMon.name} appeared. Choose your Pokemon.`
              : requiresMoveSwitch
                ? 'Choose a Pokemon to switch in'
                : 'Choose your next Pokemon'}
          </div>
          <TeamSwapper forced leadSelection={requiresLeadSelection} />
        </div>
      ) : activeMoveLock ? (
        <div className="flex h-full w-full max-w-md flex-col items-center justify-center gap-3">
          <Button
            type="button"
            size="lg"
            className="h-14 w-full text-base font-semibold"
            disabled={isDisabled}
            aria-busy={isWaitingForServer || isAnimating}
            onClick={() => handleUseMove(activeMoveLock.moveId)}
          >
            {lockedMoveLabel}
          </Button>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-between gap-4">
          {/* Type Selector */}
          <div className="w-full max-w-md flex flex-col gap-2 items-center">
            {activePlayerMon.teraTypeOverride ? (
              <div className="flex items-center gap-2">
                {(() => {
                  const typeId =
                    typeIdMap[activePlayerMon.teraTypeOverride.toLowerCase()]
                  return typeId ? (
                    <Image
                      src={getPokemonTypeIconUrl(typeId, true)}
                      alt={`Tera ${activePlayerMon.teraTypeOverride}`}
                      width={100}
                      height={40}
                      className="h-5 w-auto object-contain"
                      unoptimized
                    />
                  ) : (
                    <span className="font-medium capitalize text-game-moss-strong">
                      Tera {activePlayerMon.teraTypeOverride}
                    </span>
                  )
                })()}
              </div>
            ) : (
              <div className="flex gap-4 items-center">
                <ToggleGroup
                  type="single"
                  value={selectedType || ''}
                  onValueChange={(val: string) =>
                    !isDisabled && val && setSelectedType(val)
                  }
                  className="flex justify-center gap-2"
                  disabled={isDisabled}
                >
                  {activePlayerMon.types.map((type: string) => {
                    const typeId = typeIdMap[type.toLowerCase()]
                    return (
                      <ToggleGroupItem
                        key={type}
                        value={type}
                        className={cn(
                          'group relative flex h-14 w-20 items-center justify-center rounded-full border-0 bg-transparent p-0 transition-colors',
                          'hover:bg-transparent',
                          'data-[state=on]:!bg-transparent data-[state=on]:!text-game-ink',
                          'disabled:cursor-not-allowed disabled:opacity-50',
                        )}
                        aria-label={type}
                      >
                        {typeId ? (
                          <Image
                            src={getPokemonTypeIconUrl(typeId)}
                            alt={type}
                            width={100}
                            height={40}
                            className="h-7 w-auto object-contain opacity-70 grayscale transition-[filter,opacity,transform] duration-200 group-data-[state=on]:scale-[1.04] group-data-[state=on]:opacity-100 group-data-[state=on]:grayscale-0 group-data-[state=on]:drop-shadow-[0_0_2px_rgb(64_93_61_/_0.9)] group-hover:opacity-100 group-hover:grayscale-0"
                            unoptimized
                          />
                        ) : (
                          <span className="text-xs font-semibold capitalize text-game-ink">
                            {type}
                          </span>
                        )}
                      </ToggleGroupItem>
                    )
                  })}
                </ToggleGroup>
              </div>
            )}
          </div>

          {/* Stance Selector */}
          <div className="w-full max-w-2xl min-h-[5.5rem]">
            <StanceSelector
              onSelect={handleStanceSelect}
              stats={activePlayerMon.stats}
              statStages={activePlayerMon.statStages}
              zMoveReady={!!activePlayerMon.zMoveReady}
              disabledStance={activeDisabledStance?.stance}
              pendingStance={pendingBattleAction?.stance}
              disabled={isDisabled || !selectedType}
            />
          </div>

          {/* Battle Actions */}
          <div className="w-full max-w-md flex gap-2">
            <ItemSelector />
            {(hasPowerKeyItems || availableMoves.length > 0) && (
              <PowerSelector />
            )}
            {battleState.playerTeam.length > 1 && <TeamSwapper />}
          </div>
        </div>
      )}
    </div>
  )
}
