'use client'

import {
  Atom,
  Clock,
  Flag,
  Loader2,
  Lock,
  Maximize2,
  Megaphone,
  Sparkles,
  Zap,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { StanceIcon } from '@/components/game/shared/stance-icon'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { ItemSprite } from '@/components/ui/item-sprite'
import { SectionDivider } from '@/components/ui/section-divider'
import { DYNAMAX_UNLOCK_TURNS } from '@/data/powers'
import { cn } from '@/lib/utils'
import { getPokemonMoveUsesRemaining } from '@/utilities/battle/move-uses'
import type { BattleStance } from '@/utilities/battle/types'
import {
  POKEMON_POWER_OPTIONS,
  type PokemonPowerId,
} from '@/utilities/pokemon/pokemon-powers'

import { useBattleContext } from './battle-context'

export function PowerSelector() {
  const {
    battleState,
    activePlayerMon,
    isAnimating,
    isWaitingForServer,
    isBattlePanelLoading,
    battlePowersData,
    availableMoves,
    playerHasTeraEffect,
    handleUseTera: onUseTera,
    handleUseMega: onUseMega,
    handleUseZMove: onUseZMove,
    handleUseDynamax: onUseDynamax,
    handleUseMove: onUseMove,
    handleUseVictory: onUseVictory,
    handleUseWeather: onUseWeather,
    handleUseShout: onUseShout,
    handleUseCircadian: onUseCircadian,
    handleUseDimensionalShift: onUseDimensionalShift,
  } = useBattleContext()
  const moveDrawerContentId = `battle-move-drawer-${battleState.battleId}`
  const powerDrawerContentId = `battle-power-drawer-${battleState.battleId}`

  const disabled =
    isAnimating || isWaitingForServer || battleState.status !== 'ongoing'
  const powersState = battleState.powers
  const zMoveReady = !!activePlayerMon.zMoveReady
  const teraTypeOverride = activePlayerMon.teraTypeOverride
  const teraUsed = !!activePlayerMon.teraUsed
  const [moveOpen, setMoveOpen] = useState(false)
  const [powerOpen, setPowerOpen] = useState(false)
  const powersData = battlePowersData
  const [using, setUsing] = useState<string | null>(null)

  // Check if any powers are available
  const hasAnyMoves = availableMoves.length > 0
  const hasAnyPowers =
    powersData &&
    (powersData.hasTera ||
      powersData.hasMega ||
      powersData.hasZRing ||
      powersData.hasDynamax ||
      powersData.hasShouts ||
      powersData.hasVictory ||
      powersData.hasWeather ||
      powersData.hasCircadian ||
      powersData.dimensionalShift?.time ||
      powersData.dimensionalShift?.space ||
      powersData.dimensionalShift?.chaos)

  const handleUseTera = async () => {
    if (using) return
    setUsing('tera-orb')
    try {
      await onUseTera()
      setPowerOpen(false)
    } finally {
      setUsing(null)
    }
  }

  const handleUseMega = async (megaStoneId: string) => {
    if (using) return
    setUsing(megaStoneId)
    try {
      await onUseMega(megaStoneId)
      setPowerOpen(false)
    } finally {
      setUsing(null)
    }
  }

  const handleUseZMove = async () => {
    if (using) return
    setUsing('z-move')
    try {
      await onUseZMove()
      setPowerOpen(false)
    } finally {
      setUsing(null)
    }
  }

  const handleUseDynamax = async () => {
    if (using) return
    setUsing('dynamax')
    try {
      await onUseDynamax()
      setPowerOpen(false)
    } finally {
      setUsing(null)
    }
  }

  const handleUseMove = async (moveId: string) => {
    if (using || !onUseMove) return
    setUsing(moveId)
    try {
      await onUseMove(moveId)
      setMoveOpen(false)
    } finally {
      setUsing(null)
    }
  }

  const handleUseVictory = async (itemId: string) => {
    if (using) return
    setUsing(itemId)
    try {
      await onUseVictory(itemId)
      setPowerOpen(false)
    } finally {
      setUsing(null)
    }
  }

  const handleUseWeather = async (weather: string) => {
    if (using) return
    setUsing(`weather-${weather}`)
    try {
      await onUseWeather(weather)
      setPowerOpen(false)
    } finally {
      setUsing(null)
    }
  }

  const handleUseShout = async (stance: BattleStance) => {
    if (using) return
    setUsing(`shout-${stance}`)
    try {
      await onUseShout(stance)
      setPowerOpen(false)
    } finally {
      setUsing(null)
    }
  }

  const handleUseCircadian = async () => {
    if (using) return
    setUsing('circadian')
    try {
      await onUseCircadian()
      setPowerOpen(false)
    } finally {
      setUsing(null)
    }
  }

  const handleUseDimensionalShift = async (
    type: 'time' | 'space' | 'chaos',
  ) => {
    if (using) return
    setUsing(`shift-${type}`)
    try {
      await onUseDimensionalShift(type)
      setPowerOpen(false)
    } finally {
      setUsing(null)
    }
  }

  // Check if any power is currently active (prevents combining powers)
  const isAnyPowerActive =
    (powersState?.megaEvolved ?? false) ||
    (powersState?.dynamaxActive ?? false) ||
    zMoveReady ||
    teraTypeOverride !== undefined

  const activePowerLockReason = powersState?.megaEvolved
    ? 'Mega Evolution is already active'
    : powersState?.dynamaxActive
      ? `Dynamax is active for ${powersState.dynamaxTurnsRemaining} turn${
          powersState.dynamaxTurnsRemaining === 1 ? '' : 's'
        }`
      : zMoveReady
        ? 'Z-Move is primed for your next attack'
        : teraTypeOverride
          ? `Tera ${teraTypeOverride} is active for ${
              activePlayerMon.teraTurnsRemaining ?? 0
            } turn${activePlayerMon.teraTurnsRemaining === 1 ? '' : 's'}`
          : null

  const disabledReason = isWaitingForServer
    ? battleState.isPvp
      ? 'Waiting for opponent action'
      : 'Resolving battle action'
    : activePowerLockReason

  const canUseTera =
    powersState &&
    powersState.teraUsesRemaining > 0 &&
    !teraUsed &&
    !isAnyPowerActive
  const canUseMega =
    powersState && powersState.megaUsesRemaining > 0 && !isAnyPowerActive
  const canUseZMove =
    powersState && powersState.zMoveUsesRemaining > 0 && !isAnyPowerActive
  const canUseDynamax =
    powersState?.dynamaxAvailable &&
    powersState.dynamaxUsesRemaining > 0 &&
    !powersState.dynamaxActive &&
    !isAnyPowerActive

  const canUseVictory =
    powersState && powersState.victoryUsesRemaining > 0 && !isAnyPowerActive
  const canUseWeather =
    powersState && powersState.weatherUsesRemaining > 0 && !isAnyPowerActive
  const canUseShout =
    powersState && powersState.shoutUsesRemaining > 0 && !isAnyPowerActive
  const canUseCircadian =
    powersState && powersState.circadianUsesRemaining > 0 && !isAnyPowerActive

  // Check move limits
  const movesUsesRemaining = getPokemonMoveUsesRemaining(
    activePlayerMon,
    powersState?.moveUsesRemaining,
  )
  const maxMovesPerBattle =
    battleState.config?.movesPerBattle ?? movesUsesRemaining
  const canUseMove = movesUsesRemaining > 0
  const primaryType = activePlayerMon.types?.[0]?.toLowerCase() || 'normal'
  const moveTriggerItemId = `tm-${primaryType}`
  const selectedPower = powersData?.selectedPokemonPower as
    | PokemonPowerId
    | null
    | undefined
  const powerTriggerItemId = selectedPower
    ? POKEMON_POWER_OPTIONS[selectedPower]?.itemId
    : 'tera-orb'

  const powerUsesRemaining = (() => {
    if (!powersState || !selectedPower) return 0
    if (selectedPower === 'tera')
      return teraUsed ? 0 : powersState.teraUsesRemaining
    if (selectedPower === 'mega') return powersState.megaUsesRemaining
    if (selectedPower === 'z-move') return powersState.zMoveUsesRemaining
    if (selectedPower === 'dynamax') return powersState.dynamaxUsesRemaining
    if (selectedPower === 'victory') return powersState.victoryUsesRemaining
    if (selectedPower === 'weather') return powersState.weatherUsesRemaining
    if (selectedPower === 'shout') return powersState.shoutUsesRemaining
    if (selectedPower === 'circadian') return powersState.circadianUsesRemaining
    if (selectedPower === 'dimensional-shift') {
      const charges = powersState.dimensionalShift?.charges
      return Math.max(
        charges?.wins ?? 0,
        charges?.losses ?? 0,
        charges?.draws ?? 0,
      )
    }
    return 0
  })()
  const powerUsesChip =
    selectedPower === 'dimensional-shift'
      ? `${Math.min(3, powerUsesRemaining)}/3`
      : String(Math.max(0, powerUsesRemaining))
  const shouldShowPowerTrigger =
    isBattlePanelLoading || !!hasAnyPowers || !!powersData?.selectedPokemonPower

  const renderMovesContent = () => (
    <div className="px-4 pt-4 pb-6 max-w-md mx-auto">
      <div className="overflow-y-auto max-h-[calc(70dvh-120px)] space-y-6">
        <div className="space-y-3">
          <SectionDivider>
            <span className="flex items-center gap-2 text-game-moss">
              <ItemSprite
                itemId={moveTriggerItemId}
                alt="Moves"
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
              />
              Special Moves ({movesUsesRemaining})
            </span>
          </SectionDivider>
          {!canUseMove ? (
            <div className="rounded-md border border-dashed border-game-border bg-game-canvas/45 px-3 py-4 text-center text-sm text-game-muted" role="status" aria-live="polite">
              No move uses remaining this battle
            </div>
          ) : (
            <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-none">
              {availableMoves.map((move) => {
                const moveType =
                  (move.forcedType && move.forcedType !== 'random'
                    ? move.forcedType.toLowerCase()
                    : undefined) || 'normal'
                const tmSpriteId = `tm-${moveType}`

                return (
                  <Button
                    key={move.id}
                    variant="outline"
                    className="h-auto min-w-[112px] flex-shrink-0 rounded-xl border border-game-border bg-game-surface-raised py-2 px-3 shadow-sm transition-colors hover:border-game-moss/60 hover:bg-game-moss/10"
                    disabled={using !== null}
                    onClick={() => handleUseMove(move.id)}
                  >
                    <ItemSprite
                      itemId={tmSpriteId}
                      alt="TM"
                      width={40}
                      height={40}
                      className="w-10 h-10"
                    />
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-1.5">
                        {move.stance === 'power' && (
                          <StanceIcon
                            stance="power"
                            className="w-3 h-3 text-game-clay-strong"
                          />
                        )}
                        {move.stance === 'speed' && (
                          <StanceIcon
                            stance="speed"
                            className="w-3 h-3 text-game-stance-blue-strong"
                          />
                        )}
                        {move.stance === 'tech' && (
                          <StanceIcon
                            stance="tech"
                            className="w-3 h-3 text-game-moss-strong"
                          />
                        )}
                        {move.stance === 'random' && (
                          <StanceIcon
                            stance="random"
                            className="w-3 h-3 text-game-ochre"
                          />
                        )}
                        <span className="font-medium text-xs whitespace-nowrap">
                          {move.name}
                        </span>
                      </div>
                    </div>
                  </Button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {hasAnyMoves && (
        <Drawer open={moveOpen} onOpenChange={setMoveOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              disabled={disabled || !canUseMove}
              className={cn(
                'flex-1 h-12 gap-2 rounded-xl border border-game-border bg-game-surface-raised text-game-ink shadow-sm transition-colors',
                'hover:border-game-moss/60 hover:bg-game-surface-raised hover:text-game-ink',
                !canUseMove && 'opacity-50',
              )}
            >
              <ItemSprite
                itemId={moveTriggerItemId}
                alt="Moves"
                width={22}
                height={22}
                className="h-5 w-5 object-contain"
              />
              <span className="rounded-full border border-game-border bg-game-canvas/60 px-1.5 py-0.5 text-[10px] font-black text-game-ink">
                {Math.max(0, movesUsesRemaining)}/{maxMovesPerBattle}
              </span>
            </Button>
          </DrawerTrigger>
          <DrawerContent
            id={moveDrawerContentId}
            className="game-paper-modal game-paper-texture max-h-[70dvh] border-game-border bg-game-surface-raised"
          >
            {renderMovesContent()}
          </DrawerContent>
        </Drawer>
      )}

      {shouldShowPowerTrigger && (
        <Drawer open={powerOpen} onOpenChange={setPowerOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              disabled={disabled || (!hasAnyPowers && !isBattlePanelLoading)}
              className={cn(
                'flex-1 h-12 gap-2 rounded-xl border border-game-border bg-game-surface-raised text-game-ink shadow-sm transition-colors',
                'hover:border-game-moss/60 hover:bg-game-surface-raised hover:text-game-ink',
              )}
            >
              <ItemSprite
                itemId={powerTriggerItemId}
                alt="Powers"
                width={22}
                height={22}
                className="h-5 w-5 object-contain"
              />
              <span className="rounded-full border border-game-border bg-game-canvas/60 px-1.5 py-0.5 text-[10px] font-black text-game-ink">
                {powerUsesChip}
              </span>
            </Button>
          </DrawerTrigger>
          <DrawerContent
            id={powerDrawerContentId}
            className="game-paper-modal game-paper-texture max-h-[80dvh] border-game-border bg-game-surface-raised"
          >
            <div className="px-4 pt-4 pb-6 max-w-md mx-auto">
              {isBattlePanelLoading && !powersData ? (
                <div className="flex items-center justify-center h-40">
                  <Loader2 className="w-8 h-8 animate-spin text-game-muted" />
                </div>
              ) : !hasAnyPowers ? (
                <div className="flex flex-col items-center justify-center h-40 text-game-muted">
                  <Zap className="w-12 h-12 mb-2 opacity-50" />
                  <p>
                    {powersData?.selectedPokemonPower
                      ? 'Selected Pokemon Power unavailable'
                      : 'No Pokemon Power selected'}
                  </p>
                  <p className="text-sm">
                    {powersData?.selectedPokemonPower
                      ? 'Check the required key item or compatible item.'
                      : 'Assign one from the Pokemon menu.'}
                  </p>
                </div>
              ) : (
                <div className="overflow-y-auto max-h-[calc(80dvh-150px)] space-y-6">
                  {/* Terastallization */}
                  {powersData?.hasTera && (
                    <div className="space-y-3">
                      <SectionDivider>
                        <span className="flex items-center gap-2 text-game-moss-strong">
                          <Sparkles className="w-4 h-4" />
                          Terastallization
                        </span>
                      </SectionDivider>
                      {!canUseTera ? (
                        <div className="rounded-md border border-dashed border-game-border bg-game-canvas/45 px-3 py-4 text-center text-sm text-game-muted" role="status" aria-live="polite">
                          {powersState?.teraUsesRemaining === 0
                            ? 'No Terastallization uses remaining'
                            : isAnyPowerActive
                              ? disabledReason ||
                                'Cannot use Tera while another power is active'
                              : 'This Pokemon has already used Terastallization'}
                        </div>
                      ) : !powersData.teraType ? (
                        <div className="rounded-md border border-dashed border-game-border bg-game-canvas/45 px-3 py-4 text-center text-sm text-game-muted" role="status" aria-live="polite">
                          No Tera type set
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          className="h-auto w-full py-3 px-4 flex items-center justify-center gap-3 border-game-border hover:border-game-moss/60 hover:bg-game-moss/10"
                          disabled={using !== null}
                          onClick={handleUseTera}
                        >
                          <ItemSprite
                            itemId="tera-orb"
                            alt="Tera Orb"
                            width={36}
                            height={36}
                            className="w-9 h-9"
                          />
                          <span className="text-sm font-semibold capitalize">
                            Terastallize into {powersData.teraType}
                          </span>
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Mega Evolution */}
                  {powersData?.hasMega && (
                    <div className="space-y-3">
                      <SectionDivider>
                        <span className="flex items-center gap-2 text-game-clay-strong">
                          <Atom className="w-4 h-4" />
                          Evolution Powers
                        </span>
                      </SectionDivider>
                      {powersState?.megaEvolved && (
                        <div className="flex justify-center">
                          <span className="text-xs text-game-clay-strong">Active</span>
                        </div>
                      )}
                      {powersState?.megaEvolved ? (
                        <div className="rounded-md border border-dashed border-game-border bg-game-canvas/45 px-3 py-4 text-center text-sm text-game-muted" role="status" aria-live="polite">
                          Mega Evolution active
                        </div>
                      ) : powersState?.megaUsesRemaining === 0 ? (
                        <div className="rounded-md border border-dashed border-game-border bg-game-canvas/45 px-3 py-4 text-center text-sm text-game-muted" role="status" aria-live="polite">
                          No Mega Evolution uses remaining
                        </div>
                      ) : isAnyPowerActive ? (
                        <div className="rounded-md border border-dashed border-game-border bg-game-canvas/45 px-3 py-4 text-center text-sm text-game-muted" role="status" aria-live="polite">
                          {disabledReason ||
                            'Cannot Evolve while another power is active'}
                        </div>
                      ) : powersData.megaStones.length === 0 ? (
                        <div className="rounded-md border border-dashed border-game-border bg-game-canvas/45 px-3 py-4 text-center text-sm text-game-muted" role="status" aria-live="polite">
                          No compatible Evolution items for this Pokémon
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          {powersData.megaStones.map((stone) => (
                            <Button
                              key={stone.itemId}
                              variant="outline"
                              className="h-auto py-3 px-4 flex items-center gap-3 border-game-border hover:border-game-moss/60 hover:bg-game-moss/10"
                              disabled={using !== null}
                              onClick={() => handleUseMega(stone.megaFormId)}
                            >
                              <ItemSprite
                                itemId={stone.itemId}
                                alt={stone.name}
                                width={32}
                                height={32}
                                className="w-8 h-8"
                              />
                              <div className="flex flex-col items-start">
                                <span className="text-sm">{stone.name}</span>
                                <span className="text-[10px] text-game-muted">
                                  → {stone.megaFormName}
                                </span>
                              </div>
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Z-Moves */}
                  {powersData?.hasZRing && (
                    <div className="space-y-3">
                      <SectionDivider>
                        <span className="flex items-center gap-2 text-game-ochre">
                          <Zap className="w-4 h-4" />
                          Z-Moves
                        </span>
                      </SectionDivider>
                      {powersState?.zMoveUsesRemaining !== undefined && (
                        <div className="flex justify-center">
                          <span className="text-xs text-game-muted">
                            {powersState.zMoveUsesRemaining} use
                            {powersState.zMoveUsesRemaining === 1 ? '' : 's'}{' '}
                            left
                          </span>
                        </div>
                      )}
                      {powersState?.zMoveUsesRemaining === 0 ? (
                        <div className="rounded-md border border-dashed border-game-border bg-game-canvas/45 px-3 py-4 text-center text-sm text-game-muted" role="status" aria-live="polite">
                          No Z-Move uses remaining
                        </div>
                      ) : isAnyPowerActive ? (
                        <div className="text-sm text-game-muted py-2">
                          {disabledReason ||
                            'Cannot use Z-Move while another power is active'}
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          className="h-auto w-full rounded-xl border border-game-border bg-game-surface-raised py-3 px-4 flex items-center justify-center gap-3 shadow-sm transition-colors hover:border-game-moss/60 hover:bg-game-moss/10"
                          disabled={using !== null}
                          onClick={handleUseZMove}
                        >
                          <ItemSprite
                            itemId="z-ring"
                            alt="Z-Ring"
                            width={36}
                            height={36}
                            className="w-9 h-9"
                          />
                          <span className="text-sm font-semibold">
                            Prepare Z-Move
                          </span>
                          <span className="text-xs text-game-muted">
                            5x next stance
                          </span>
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Dynamax */}
                  {powersData?.hasDynamax && (
                    <div className="space-y-3">
                      <SectionDivider>
                        <span className="flex items-center gap-2 text-game-danger">
                          <Maximize2 className="w-4 h-4" />
                          {powersData.canGigantamax ? 'Gigantamax' : 'Dynamax'}
                        </span>
                      </SectionDivider>
                      {powersState?.dynamaxActive && (
                        <div className="flex justify-center">
                          <span className="text-xs text-game-danger">
                            Active ({powersState.dynamaxTurnsRemaining} turns)
                          </span>
                        </div>
                      )}
                      {powersState?.dynamaxActive ? (
                        <div className="text-sm text-game-muted py-2">
                          Already Dynamaxed
                        </div>
                      ) : powersState?.dynamaxUsesRemaining === 0 ? (
                        <div className="text-sm text-game-muted py-2">
                          No Dynamax uses remaining
                        </div>
                      ) : isAnyPowerActive ? (
                        <div className="text-sm text-game-muted py-2">
                          {disabledReason ||
                            'Cannot Dynamax while another power is active'}
                        </div>
                      ) : !powersState?.dynamaxAvailable ? (
                        <div className="flex items-center gap-2 text-sm text-game-muted py-2">
                          <Lock className="w-4 h-4" />
                          Win{' '}
                          {DYNAMAX_UNLOCK_TURNS -
                            (powersState?.turnsPlayedThisBattle || 0)}{' '}
                          more stance matchups to unlock
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          className="w-full h-auto py-4 flex items-center justify-center gap-3 border-game-border hover:border-game-moss/60 hover:bg-game-moss/10"
                          disabled={using !== null}
                          onClick={handleUseDynamax}
                        >
                          <Maximize2 className="w-6 h-6" />
                          <div className="flex flex-col items-start">
                            <span className="text-sm font-medium">
                              {powersData.canGigantamax
                                ? 'Gigantamax!'
                                : 'Dynamax!'}
                            </span>
                            <span className="text-[10px] text-game-muted">
                              {powersData.canGigantamax
                                ? 'Transform for 3 turns'
                                : '+20% stats for 3 turns'}
                            </span>
                          </div>
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Victory Powers */}
                  {powersData?.hasVictory && (
                    <div className="space-y-3">
                      <SectionDivider>
                        <span className="flex items-center gap-2 text-game-ochre">
                          <Flag className="w-4 h-4" />
                          Victory Power
                        </span>
                      </SectionDivider>
                      {!canUseVictory ? (
                        <div className="text-sm text-game-muted py-2">
                          {powersState?.victoryUsesRemaining === 0
                            ? 'No uses remaining'
                            : 'Cannot use Victory Power now'}
                        </div>
                      ) : powersData.victoryPowers.length === 0 ? (
                        <div className="text-sm text-game-muted py-2">
                          No valid Victory Powers available
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          {powersData.victoryPowers.map((vp) => (
                            <Button
                              key={vp.itemId}
                              variant="outline"
                              className="h-auto py-3 px-4 flex items-center gap-3 border-game-border hover:border-game-moss/60 hover:bg-game-moss/10"
                              disabled={using !== null}
                              onClick={() => handleUseVictory(vp.itemId)}
                            >
                              <ItemSprite
                                itemId={vp.itemId}
                                alt={vp.name}
                                width={32}
                                height={32}
                                className="w-8 h-8"
                              />
                              <div className="flex flex-col items-start">
                                <span className="text-sm text-game-ochre capitalize">
                                  V-{vp.type}
                                </span>
                              </div>
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Weather Control */}
                  {powersData?.hasWeather && (
                    <div className="space-y-3">
                      <SectionDivider>
                        <span className="flex items-center gap-2 text-game-ochre">
                          <ItemSprite
                            itemId="weather-orb"
                            alt="Weather"
                            width={18}
                            height={18}
                            className="h-4 w-4 object-contain"
                          />
                          Weather Control
                        </span>
                      </SectionDivider>
                      {!canUseWeather ? (
                        <div className="text-sm text-game-muted py-2">
                          {powersState?.weatherUsesRemaining === 0
                            ? 'No Weather Control uses remaining'
                            : 'Cannot use Weather Control now'}
                        </div>
                      ) : powersData.weatherPowers.length === 0 ? (
                        <div className="text-sm text-game-muted py-2">
                          No Weather Cores available
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {battleState.weather?.label && (
                            <div className="text-xs text-game-muted">
                              Current weather: {battleState.weather.label}
                            </div>
                          )}
                          <div className="grid grid-cols-2 gap-2">
                            {powersData.weatherPowers.map((weatherPower) => (
                              <Button
                                key={weatherPower.itemId}
                                variant="outline"
                                className="h-auto py-3 px-4 flex items-center gap-3 border-game-border hover:border-game-moss/60 hover:bg-game-moss/10"
                                disabled={using !== null}
                                onClick={() =>
                                  handleUseWeather(weatherPower.weather)
                                }
                              >
                                <ItemSprite
                                  itemId={weatherPower.itemId}
                                  alt={weatherPower.label}
                                  width={32}
                                  height={32}
                                  className="w-8 h-8"
                                />
                                <div className="flex flex-col items-start">
                                  <span className="text-sm text-game-ink">
                                    {weatherPower.label}
                                  </span>
                                  <span className="text-[10px] text-game-muted">
                                    Battle weather
                                  </span>
                                </div>
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Shout Powers */}
                  {powersData?.hasShouts && (
                    <div className="space-y-3">
                      <SectionDivider>
                        <span className="flex items-center gap-2 text-game-ochre">
                          <Megaphone className="w-4 h-4" />
                          Battle Shouts
                        </span>
                      </SectionDivider>
                      {!canUseShout ? (
                        <div className="text-sm text-game-muted py-2">
                          {powersState?.shoutUsesRemaining === 0
                            ? 'No shouts remaining'
                            : 'Cannot shout now'}
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 gap-2">
                          <Button
                            variant="outline"
                            className="h-auto rounded-xl border border-game-border bg-game-surface-raised py-3 px-2 flex flex-col items-center gap-1 shadow-sm transition-colors hover:border-game-moss/60 hover:bg-game-moss/10"
                            disabled={using !== null}
                            onClick={() => handleUseShout('power')}
                          >
                            <StanceIcon
                              stance="power"
                              className="w-6 h-6 text-game-clay-strong mb-1"
                            />
                            <span className="text-xs font-medium text-game-clay-strong">
                              Power Shout
                            </span>
                          </Button>
                          <Button
                            variant="outline"
                            className="h-auto rounded-xl border border-game-border bg-game-surface-raised py-3 px-2 flex flex-col items-center gap-1 shadow-sm transition-colors hover:border-game-moss/60 hover:bg-game-moss/10"
                            disabled={using !== null}
                            onClick={() => handleUseShout('speed')}
                          >
                            <StanceIcon
                              stance="speed"
                              className="w-6 h-6 text-game-stance-blue-strong mb-1"
                            />
                            <span className="text-xs font-medium text-game-stance-blue-strong">
                              Speed Shout
                            </span>
                          </Button>
                          <Button
                            variant="outline"
                            className="h-auto rounded-xl border border-game-border bg-game-surface-raised py-3 px-2 flex flex-col items-center gap-1 shadow-sm transition-colors hover:border-game-moss/60 hover:bg-game-moss/10"
                            disabled={using !== null}
                            onClick={() => handleUseShout('tech')}
                          >
                            <StanceIcon
                              stance="tech"
                              className="w-6 h-6 text-game-moss-strong mb-1"
                            />
                            <span className="text-xs font-medium text-game-moss-strong">
                              Tech Shout
                            </span>
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Circadian Power */}
                  {powersData?.hasCircadian && (
                    <div className="space-y-3">
                      <SectionDivider>
                        <span className="flex items-center gap-2 text-game-moss-strong">
                          <Clock className="w-4 h-4" />
                          Circadian Power
                        </span>
                      </SectionDivider>
                      {!canUseCircadian ? (
                        <div className="text-sm text-game-muted py-2">
                          {powersState?.circadianUsesRemaining === 0
                            ? 'No uses remaining'
                            : 'Cannot use Circadian Power now'}
                        </div>
                      ) : (powersState?.turnsPlayedThisBattle ?? 0) < 3 ? (
                        <div className="flex items-center gap-2 text-sm text-game-muted py-2">
                          <Lock className="w-4 h-4" />
                          Charge for{' '}
                          {3 - (powersState?.turnsPlayedThisBattle ?? 0)} more
                          turns
                        </div>
                      ) : (
                        <CircadianButton
                          onClick={handleUseCircadian}
                          disabled={using !== null}
                        />
                      )}
                    </div>
                  )}

                  {/* Dimensional Shift */}
                  {(powersData?.dimensionalShift?.time ||
                    powersData?.dimensionalShift?.space ||
                    powersData?.dimensionalShift?.chaos) && (
                    <div className="space-y-3">
                      <SectionDivider>
                        <span className="flex items-center gap-2 text-fuchsia-400">
                          <Clock className="w-4 h-4" />
                          Dimensional Shift
                        </span>
                      </SectionDivider>

                      {isAnyPowerActive ? (
                        <div className="text-sm text-game-muted py-2">
                          {disabledReason ||
                            'Cannot use Dimensional Shift while another power is active'}
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 gap-2">
                          {/* Time */}
                          {powersData.dimensionalShift.time && (
                            <Button
                              variant="outline"
                              className="h-auto py-3 px-2 flex flex-col items-center gap-1 border-game-border hover:border-game-moss/60 hover:bg-game-moss/10"
                              disabled={
                                using !== null ||
                                (powersState?.dimensionalShift?.charges
                                  .losses || 0) < 3
                              }
                              onClick={() => handleUseDimensionalShift('time')}
                            >
                              <Clock className="w-6 h-6 text-fuchsia-400 mb-1" />
                              <span className="text-xs font-medium text-fuchsia-100">
                                Rewind
                              </span>
                              <span className="text-[10px] text-game-muted">
                                {powersState?.dimensionalShift?.charges
                                  .losses || 0}
                                /3 Losses
                              </span>
                            </Button>
                          )}

                          {/* Space */}
                          {powersData.dimensionalShift.space && (
                            <Button
                              variant="outline"
                              className="h-auto py-3 px-2 flex flex-col items-center gap-1 border-game-border hover:border-game-moss/60 hover:bg-game-moss/10"
                              disabled={
                                using !== null ||
                                (powersState?.dimensionalShift?.charges.wins ||
                                  0) < 3
                              }
                              onClick={() => handleUseDimensionalShift('space')}
                            >
                              <Maximize2 className="w-6 h-6 text-game-clay-strong mb-1" />
                              <span className="text-xs font-medium text-game-ink">
                                Lock
                              </span>
                              <span className="text-[10px] text-game-muted">
                                {powersState?.dimensionalShift?.charges.wins ||
                                  0}
                                /3 Wins
                              </span>
                            </Button>
                          )}

                          {/* Chaos */}
                          {powersData.dimensionalShift.chaos && (
                            <Button
                              variant="outline"
                              className="h-auto py-3 px-2 flex flex-col items-center gap-1 border-game-border hover:border-game-moss/60 hover:bg-game-moss/10"
                              disabled={
                                using !== null ||
                                (powersState?.dimensionalShift?.charges.draws ||
                                  0) < 3
                              }
                              onClick={() => handleUseDimensionalShift('chaos')}
                            >
                              <Atom className="w-6 h-6 text-game-muted mb-1" />
                              <span className="text-xs font-medium text-game-ink">
                                Oblivion
                              </span>
                              <span className="text-[10px] text-game-muted">
                                {powersState?.dimensionalShift?.charges.draws ||
                                  0}
                                /3 Draws
                              </span>
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  )
}

function CircadianButton({
  onClick,
  disabled,
}: {
  onClick: () => void
  disabled: boolean
}) {
  const [label, setLabel] = useState('Circadian Power')
  const [desc, setDesc] = useState('')
  const [icon, setIcon] = useState(
    <Clock className="w-6 h-6 text-game-moss-strong" />,
  )

  useEffect(() => {
    const now = new Date()
    const hour = now.getHours()
    let phase = 'night'
    if (hour >= 6 && hour < 12) phase = 'dawn'
    else if (hour >= 12 && hour < 18) phase = 'day'
    else if (hour >= 18 && hour < 24) phase = 'dusk'

    if (phase === 'dawn') {
      setLabel("Dawn's Blessing")
      setDesc("Power Stance | 1.5x Dmg | Self 'Veil'")
      setIcon(<Sparkles className="w-6 h-6 text-game-ochre" />)
    } else if (phase === 'day') {
      setLabel('Blinding Sun')
      setDesc("Tech Stance | 1.5x Dmg | Enemy 'Burn'")
      setIcon(<Zap className="w-6 h-6 text-game-ochre" />)
    } else if (phase === 'dusk') {
      setLabel('Dusk Shadow')
      setDesc("Speed Stance | 1.5x Dmg | Enemy 'Poison'")
      setIcon(<Atom className="w-6 h-6 text-game-clay-strong" />)
    } else {
      setLabel('Moonlight Healing')
      setDesc("Heals 50% | Self 'Regen'")
      setIcon(<Sparkles className="w-6 h-6 text-game-moss-strong" />)
    }
  }, [])

  return (
    <Button
      variant="outline"
      className="w-full h-auto py-4 flex items-center justify-center gap-3 border-game-border hover:border-game-moss/60 hover:bg-game-moss/10"
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
      <div className="flex flex-col items-start">
        <span className="text-sm font-medium text-game-ink">{label}</span>
        <span className="text-[10px] text-game-muted">{desc}</span>
      </div>
    </Button>
  )
}
