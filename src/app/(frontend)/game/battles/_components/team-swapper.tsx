'use client'

import { HeartOff, Loader2, RefreshCcw } from 'lucide-react'
import Image from 'next/image'
import { Fragment, useEffect, useState, type ElementType } from 'react'
import { Button } from '@/components/ui/button'
import { PokemonRaritySprite } from '@/components/game/shared/PokemonRaritySprite'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import type { BattlePokemon } from '@/utilities/battle/types'
import { getPokemonTypeIconUrl } from '@/utilities/pokemon/sprite-proxy'

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

import { useBattleContext } from './battle-context'
import { BattleActionTrigger } from './battle-action-trigger'

type TeamSwapperProps = {
  forced?: boolean
  leadSelection?: boolean
  actionTrigger?: boolean
  compact?: boolean
  doublesReplacementSlots?: number[]
  doublesActiveSlots?: readonly (number | null)[]
  unavailablePokemonIndices?: readonly number[]
  onDoublesReplace?: (slot: 0 | 1, pokemonIndex: number) => void | Promise<void>
  embedded?: boolean
  onActionComplete?: () => void
}

export function TeamSwapper({
  forced = false,
  leadSelection = false,
  actionTrigger = false,
  compact = false,
  doublesReplacementSlots,
  doublesActiveSlots,
  unavailablePokemonIndices,
  onDoublesReplace,
  embedded = false,
  onActionComplete,
}: TeamSwapperProps) {
  const Shell: ElementType = embedded ? Fragment : Drawer
  const Content: ElementType = embedded ? 'div' : DrawerContent
  const {
    battleState,
    activePlayerMon,
    isAnimating,
    isWaitingForServer,
    isWaitingForOpponent,
    pendingBattleAction,
    handleSwapPokemon: onSwap,
  } = useBattleContext()
  const swapDrawerContentId = `battle-swap-drawer-${battleState.battleId}`

  const team = battleState.playerTeam
  const activeIndex = battleState.activePlayerIndex
  const isDoublesReplacement =
    Array.isArray(doublesReplacementSlots) && !!onDoublesReplace
  const replacementSlots = doublesReplacementSlots ?? []
  const replacementSlot = replacementSlots[0]
  const activeSlots = doublesActiveSlots ?? []
  const unavailableIndices = unavailablePokemonIndices ?? []
  const disabled =
    isAnimating ||
    isWaitingForServer ||
    isWaitingForOpponent ||
    battleState.status !== 'ongoing' ||
    (!isDoublesReplacement &&
      !leadSelection &&
      battleState.config?.allowSwapping === false &&
      activePlayerMon.currentHp > 0)
  const allowSwapping = true
  const [open, setOpen] = useState(false)
  const [swapping, setSwapping] = useState<number | null>(null)

  // Count alive Pokemon that aren't active
  const availableSwaps = team.filter(
    (p, i) =>
      (isDoublesReplacement
        ? !activeSlots.includes(i)
        : leadSelection || i !== activeIndex) &&
      !unavailableIndices.includes(i) &&
      p.currentHp > 0,
  ).length

  useEffect(() => {
    if (
      forced &&
      availableSwaps > 0 &&
      (!isDoublesReplacement || replacementSlots.length > 0)
    ) {
      setOpen(true)
    }
  }, [availableSwaps, forced, isDoublesReplacement, replacementSlots.length])

  const handleSwap = async (index: number, doublesSlot?: number) => {
    if (swapping !== null) return
    setSwapping(index)
    try {
      if (doublesSlot !== undefined && onDoublesReplace) {
        await onDoublesReplace(doublesSlot as 0 | 1, index)
      } else {
        await onSwap(index)
      }
      if (!forced && !isDoublesReplacement) {
        setOpen(false)
      }
      onActionComplete?.()
    } finally {
      setSwapping(null)
    }
  }

  if (
    !allowSwapping ||
    (!embedded && !leadSelection && team.length <= 1 && !actionTrigger)
  ) {
    return null
  }

  return (
    <Shell
      {...(!embedded
        ? {
            open,
            onOpenChange: (nextOpen: boolean) => {
              if (forced && !nextOpen) return
              setOpen(nextOpen)
            },
          }
        : {})}
    >
      {!embedded && (
        <DrawerTrigger asChild>
          {actionTrigger ? (
            <BattleActionTrigger
              itemId="poke-ball"
              label="Switch"
              count={availableSwaps > 0 ? `${availableSwaps} ready` : '—'}
              compact={compact}
              data-action="switch"
              data-empty={availableSwaps === 0 || undefined}
              disabled={disabled || availableSwaps === 0}
              aria-label="Switch Pokemon"
            />
          ) : (
            <Button
              variant="outline"
              disabled={disabled || availableSwaps === 0}
              className={cn(
                forced
                  ? 'flex-1 h-12 gap-2 rounded-xl border border-game-border bg-game-surface-raised text-game-ink shadow-sm transition-colors'
                  : 'size-11 rounded-lg border border-game-border bg-game-surface-raised p-0 text-game-ink shadow-none transition-colors',
                'hover:border-game-moss/60 hover:bg-game-surface-raised hover:text-game-ink',
                availableSwaps === 0 && 'opacity-50',
              )}
              aria-label={forced ? 'Choose next Pokemon' : 'Switch Pokemon'}
            >
              <RefreshCcw className="w-4 h-4" />
              {forced && (leadSelection ? 'Choose Lead' : 'Choose Next')}
            </Button>
          )}
        </DrawerTrigger>
      )}
      <Content
        id={swapDrawerContentId}
        className={
          embedded
            ? 'min-h-0'
            : 'game-paper-modal game-paper-background max-h-[60dvh] border-game-border bg-game-surface-raised'
        }
        {...(!embedded ? { showCloseButton: !forced } : {})}
        {...(!embedded
          ? {
              title: leadSelection
                ? 'Choose Your Pokémon'
                : forced
                  ? 'Choose Next Pokémon'
                  : 'Switch Pokémon',
              description: `${availableSwaps} Pokémon ready to choose.`,
              icon: <RefreshCcw className="h-14 w-14" aria-hidden="true" />,
              background: '/backgrounds/battle.avif',
              heroLabel: 'Battle',
            }
          : {})}
      >
        <div
          className={
            embedded
              ? 'min-h-0 w-full pt-3 pb-5'
              : 'mx-auto min-h-0 flex-1 w-full max-w-xl overflow-y-auto px-3 pt-3 pb-5 sm:px-4'
          }
        >
          {isDoublesReplacement && replacementSlot !== undefined && (
            <p className="mb-2 text-xs font-semibold text-game-muted">
              Lane {replacementSlot + 1}
            </p>
          )}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {team.map((pokemon, index) => {
              const isActive = isDoublesReplacement
                ? activeSlots.includes(index)
                : index === activeIndex
              const isFainted = pokemon.currentHp <= 0
              const isUnavailable = unavailableIndices.includes(index)
              const canSwitch = isDoublesReplacement
                ? !isActive && !isFainted && !isUnavailable
                : (leadSelection || !isActive) && !isFainted && !isUnavailable
              const hpPercent = Math.round(
                (pokemon.currentHp / pokemon.maxHp) * 100,
              )

              return (
                <Button
                  key={index}
                  variant="outline"
                  className={cn(
                    'game-focus-ring relative h-auto min-h-[6.5rem] min-w-0 rounded-xl border border-game-border bg-game-canvas/55 px-2 py-2 flex flex-col items-stretch gap-1.5 text-left sm:flex-row sm:items-center sm:gap-3 sm:px-3 sm:py-2.5',
                    'shadow-sm transition-colors',
                    isActive &&
                      !leadSelection &&
                      'border-game-moss/70 bg-game-moss/10',
                    isFainted &&
                      'border-game-danger/70 bg-game-danger/10 grayscale-[0.4]',
                    canSwitch &&
                      'hover:border-game-ochre/50 hover:bg-game-ochre/10',
                    (swapping === index ||
                      pendingBattleAction?.pokemonIndex === index) &&
                      'opacity-50 pointer-events-none',
                  )}
                  onClick={() =>
                    canSwitch && handleSwap(index, replacementSlot)
                  }
                  disabled={!canSwitch || swapping !== null || disabled}
                >
                  {/* Pokemon Sprite */}
                  <div className="relative mx-auto h-12 w-12 flex-shrink-0 sm:mx-0 sm:h-14 sm:w-14">
                    <PokemonRaritySprite
                      formId={pokemon.formId}
                      view="front"
                      rarity={pokemon.rarity}
                      shiny={pokemon.shiny}
                      isShadow={pokemon.isShadow}
                      isRadiant={pokemon.isRadiant}
                      female={pokemon.gender === 'female'}
                      alt={pokemon.name}
                      sizes="56px"
                      className={cn('h-full w-full', isFainted && 'grayscale')}
                    />
                    {isFainted && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <HeartOff className="w-6 h-6 text-game-danger" />
                      </div>
                    )}
                  </div>

                  {/* Pokemon Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-1.5">
                      <span className="min-w-0 truncate text-xs font-semibold sm:flex-1 sm:text-sm">
                        {pokemon.name}
                      </span>
                      <span className="flex flex-wrap items-center gap-1.5">
                        <span className="shrink-0 text-[10px] text-game-muted sm:text-xs">
                          Lv.{pokemon.level}
                        </span>
                        {isActive && !leadSelection && (
                          <span className="shrink-0 text-[10px] font-medium text-game-moss">
                            Active
                          </span>
                        )}
                        {isUnavailable && (
                          <span className="shrink-0 text-[10px] font-medium text-game-muted">
                            Chosen
                          </span>
                        )}
                      </span>
                    </div>

                    {/* HP Bar */}
                    <div className="mt-1.5 space-y-1">
                      <div className="h-1.5 overflow-hidden rounded-full bg-game-canvas">
                        <div
                          className={cn(
                            'h-full transition-all duration-300',
                            hpPercent > 50 && 'bg-game-health',
                            hpPercent <= 50 &&
                              hpPercent > 20 &&
                              'bg-game-ochre',
                            hpPercent <= 20 && 'bg-game-danger',
                          )}
                          style={{ width: `${hpPercent}%` }}
                        />
                      </div>
                      <div className="text-right text-[10px] font-semibold text-game-muted">
                        {pokemon.currentHp} / {pokemon.maxHp}
                      </div>
                    </div>

                    {/* Types */}
                    <div className="mt-1.5 flex min-w-0 flex-wrap gap-1">
                      {pokemon.types.map((type) => {
                        const typeId = typeIdMap[type.toLowerCase()]
                        return typeId ? (
                          <Image
                            key={type}
                            src={getPokemonTypeIconUrl(typeId)}
                            alt={type}
                            width={48}
                            height={20}
                            className="h-2.5 w-auto object-contain sm:h-3"
                            unoptimized
                          />
                        ) : (
                          <span
                            key={type}
                            className="rounded border border-game-border bg-game-canvas px-1.5 py-0.5 text-[10px] capitalize text-game-muted"
                          >
                            {type}
                          </span>
                        )
                      })}
                    </div>
                  </div>

                  {(swapping === index ||
                    pendingBattleAction?.pokemonIndex === index) && (
                    <Loader2 className="w-5 h-5 animate-spin absolute right-3 top-3" />
                  )}
                </Button>
              )
            })}
          </div>
        </div>
      </Content>
    </Shell>
  )
}
