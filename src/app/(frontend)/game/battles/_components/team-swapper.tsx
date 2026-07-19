'use client'

import { Heart, HeartOff, Loader2, RefreshCcw } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { SectionDivider } from '@/components/ui/section-divider'
import { cn } from '@/lib/utils'
import type { BattlePokemon } from '@/utilities/battle/types'
import { getBundledPokemonSpriteUrl } from '@/utilities/pokemon/local-sprites'
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

export function TeamSwapper({
  forced = false,
  leadSelection = false,
}: {
  forced?: boolean
  leadSelection?: boolean
}) {
  const {
    battleState,
    activePlayerMon,
    isAnimating,
    isWaitingForServer,
    pendingBattleAction,
    handleSwapPokemon: onSwap,
  } = useBattleContext()
  const swapDrawerContentId = `battle-swap-drawer-${battleState.battleId}`

  const team = battleState.playerTeam
  const activeIndex = battleState.activePlayerIndex
  const disabled =
    isAnimating ||
    isWaitingForServer ||
    battleState.status !== 'ongoing' ||
    (!leadSelection &&
      battleState.config?.allowSwapping === false &&
      activePlayerMon.currentHp > 0)
  const allowSwapping = true
  const [open, setOpen] = useState(false)
  const [swapping, setSwapping] = useState<number | null>(null)

  // Count alive Pokemon that aren't active
  const availableSwaps = team.filter(
    (p, i) => (leadSelection || i !== activeIndex) && p.currentHp > 0,
  ).length

  useEffect(() => {
    if (forced && availableSwaps > 0) {
      setOpen(true)
    }
  }, [availableSwaps, forced])

  const handleSwap = async (index: number) => {
    if (swapping !== null) return
    setSwapping(index)
    try {
      await onSwap(index)
      if (!forced) {
        setOpen(false)
      }
    } finally {
      setSwapping(null)
    }
  }

  if (!allowSwapping || (!leadSelection && team.length <= 1)) {
    return null
  }

  return (
    <Drawer
      open={open}
      onOpenChange={(nextOpen) => {
        if (forced && !nextOpen) return
        setOpen(nextOpen)
      }}
    >
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled || availableSwaps === 0}
          className={cn(
            forced
              ? 'flex-1 h-12 gap-2 rounded-xl border border-game-border bg-game-surface-raised text-game-ink shadow-sm transition-colors'
              : 'h-12 w-12 rounded-xl border border-game-border bg-game-surface-raised p-0 text-game-ink shadow-sm transition-colors',
            'hover:border-game-moss/60 hover:bg-game-surface-raised hover:text-game-ink',
            availableSwaps === 0 && 'opacity-50',
          )}
          aria-label={forced ? 'Choose next Pokemon' : 'Switch Pokemon'}
        >
          <RefreshCcw className="w-4 h-4" />
          {forced && (leadSelection ? 'Choose Lead' : 'Choose Next')}
        </Button>
      </DrawerTrigger>
      <DrawerContent
        id={swapDrawerContentId}
        className="game-paper-modal game-paper-background max-h-[60dvh] border-game-border bg-game-surface-raised"
      >
        <div className="mx-auto min-h-0 w-full max-w-xl overflow-y-auto px-3 pt-3 pb-5 sm:px-4">
          <SectionDivider className="mb-3">
            {leadSelection
              ? 'Choose Your Pokemon'
              : forced
                ? 'Choose Next Pokemon'
                : 'Switch Pokémon'}
          </SectionDivider>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
            {team.map((pokemon, index) => {
              const isActive = index === activeIndex
              const isFainted = pokemon.currentHp <= 0
              const canSwitch = (leadSelection || !isActive) && !isFainted
              const hpPercent = Math.round(
                (pokemon.currentHp / pokemon.maxHp) * 100,
              )

              return (
                <Button
                  key={index}
                  variant="outline"
                  className={cn(
                    'game-focus-ring relative h-auto min-h-[6.5rem] rounded-xl border border-game-border bg-game-canvas/55 px-2 py-2 flex items-center gap-2 sm:px-3 sm:py-2.5 sm:gap-3',
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
                  onClick={() => canSwitch && handleSwap(index)}
                  disabled={
                    !canSwitch || swapping !== null || isWaitingForServer
                  }
                >
                  {/* Pokemon Sprite */}
                  <div className="relative h-12 w-12 flex-shrink-0 sm:h-14 sm:w-14">
                    <Image
                      key={pokemon.formId}
                      src={getBundledPokemonSpriteUrl({
                        formId: pokemon.formId,
                        family: 'gen-v',
                        female: pokemon.gender === 'female',
                      })}
                      alt={pokemon.name}
                      width={56}
                      height={56}
                      className={cn(
                        'pixelated object-contain',
                        isFainted && 'grayscale',
                      )}
                    />
                    {isFainted && (
                      <div className="absolute inset-0 flex items-center justify-center">
                      <HeartOff className="w-6 h-6 text-game-danger" />
                      </div>
                    )}
                  </div>

                  {/* Pokemon Info */}
                  <div className="min-w-0 flex-1 text-left">
                    <div className="flex min-w-0 items-center gap-1.5">
                      <span className="truncate text-xs font-semibold sm:text-sm">
                        {pokemon.name}
                      </span>
                      <span className="shrink-0 text-[10px] text-game-muted sm:text-xs">
                        Lv.{pokemon.level}
                      </span>
                      {isActive && !leadSelection && (
                        <span className="shrink-0 text-[10px] font-medium text-game-moss">
                          Active
                        </span>
                      )}
                    </div>

                    {/* HP Bar */}
                    <div className="mt-1.5 space-y-1">
                      <div className="h-1.5 overflow-hidden rounded-full bg-game-canvas">
                        <div
                          className={cn(
                            'h-full transition-all duration-300',
                            hpPercent > 50 && 'bg-game-moss',
                            hpPercent <= 50 &&
                              hpPercent > 20 &&
                              'bg-game-ochre',
                            hpPercent <= 20 && 'bg-game-danger',
                          )}
                          style={{ width: `${hpPercent}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between gap-1 text-[10px] text-game-muted">
                        <span className="flex min-w-0 items-center gap-1">
                          <Heart className="h-3 w-3 shrink-0" />
                          {pokemon.currentHp} / {pokemon.maxHp}
                        </span>
                        <span className="shrink-0">{hpPercent}%</span>
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
      </DrawerContent>
    </Drawer>
  )
}
