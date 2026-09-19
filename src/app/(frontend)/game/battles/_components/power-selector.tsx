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
import { Fragment, useEffect, useState, type ElementType } from 'react'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { ItemSprite } from '@/components/ui/item-sprite'
import { SectionDivider } from '@/components/ui/section-divider'
import { getMove } from '@/data/moves'
import { MoveFieldNote } from '@/components/game/moves'
import { getStanceWinCharges, POWER_STANCE_WIN_COST } from '@/utilities/battle/power-charges'
import { cn } from '@/lib/utils'
import { getPokemonMoveUsesRemaining } from '@/utilities/battle/move-uses'
import { getBattleMoveTriggerItemId } from '@/utilities/battle/move-presentation'
import {
  POKEMON_POWER_OPTIONS,
  type PokemonPowerId,
} from '@/utilities/pokemon/pokemon-powers'

import { useBattleContext } from './battle-context'
import { BattleActionTrigger } from './battle-action-trigger'
import {
  BattleMovesContent,
  getBattleMovePresentation,
  MoveInfoDialog,
} from './battle-moves-content'

export function PowerSelector({
  mode = 'all',
  embedded = false,
  onActionComplete,
}: {
  mode?: 'all' | 'moves' | 'powers'
  embedded?: boolean
  onActionComplete?: () => void
}) {
  const Shell: ElementType = embedded ? Fragment : Drawer
  const Content: ElementType = embedded ? 'div' : DrawerContent
  const {
    battleState,
    activePlayerMon,
    selectedType,
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
  const [moveInfoId, setMoveInfoId] = useState<string | null>(null)

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
      onActionComplete?.()
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
      onActionComplete?.()
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
      onActionComplete?.()
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
      onActionComplete?.()
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
      onActionComplete?.()
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
      onActionComplete?.()
    } finally {
      setUsing(null)
    }
  }

  const handleUseWeather = async () => {
    if (using) return
    setUsing('weather')
    try {
      await onUseWeather()
      setPowerOpen(false)
      onActionComplete?.()
    } finally {
      setUsing(null)
    }
  }

  const handleUseShout = async () => {
    if (using) return
    setUsing('shout')
    try {
      await onUseShout()
      setPowerOpen(false)
      onActionComplete?.()
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
      onActionComplete?.()
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
      onActionComplete?.()
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
    getStanceWinCharges(powersState) >= POWER_STANCE_WIN_COST &&
    !teraUsed &&
    !isAnyPowerActive
  const canUseMega =
    powersState && powersState.megaUsesRemaining > 0 && getStanceWinCharges(powersState) >= POWER_STANCE_WIN_COST && !isAnyPowerActive
  const canUseZMove =
    powersState && powersState.zMoveUsesRemaining > 0 && getStanceWinCharges(powersState) >= POWER_STANCE_WIN_COST && !isAnyPowerActive
  const canUseDynamax =
    powersState && getStanceWinCharges(powersState) >= POWER_STANCE_WIN_COST &&
    powersState.dynamaxUsesRemaining > 0 &&
    !powersState.dynamaxActive &&
    !isAnyPowerActive

  const canUseVictory =
    powersState && powersState.victoryUsesRemaining > 0 && getStanceWinCharges(powersState) >= POWER_STANCE_WIN_COST && !isAnyPowerActive
  const canUseWeather =
    powersState && powersState.weatherUsesRemaining > 0 && getStanceWinCharges(powersState) >= POWER_STANCE_WIN_COST && !isAnyPowerActive
  const canUseShout =
    powersState &&
    powersState.shoutUsesRemaining > 0 &&
    getStanceWinCharges(powersState) >= POWER_STANCE_WIN_COST &&
    !isAnyPowerActive &&
    !activePlayerMon.shoutBoost
  const canUseCircadian =
    powersState && powersState.circadianUsesRemaining > 0 && getStanceWinCharges(powersState) >= POWER_STANCE_WIN_COST && !isAnyPowerActive

  // Check move limits
  const movesUsesRemaining = getPokemonMoveUsesRemaining(
    activePlayerMon,
    powersState?.moveUsesRemaining,
  )
  const maxMovesPerBattle =
    battleState.config?.movesPerBattle ?? movesUsesRemaining
  const moveTriggerItemId = getBattleMoveTriggerItemId(activePlayerMon.types)
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
    if (selectedPower === 'dimensional-shift') return getStanceWinCharges(powersState)
    return 0
  })()
  const powerUsesChip =
    selectedPower === 'dimensional-shift'
      ? `${Math.min(3, powerUsesRemaining)}/3`
      : String(Math.max(0, powerUsesRemaining))
  const renderMovesContent = () => (
    <BattleMovesContent
      moves={availableMoves
        .map((move) => getMove(move.id))
        .filter((move): move is NonNullable<typeof move> => !!move)}
      pokemon={activePlayerMon}
      state={battleState}
      selectedType={selectedType}
      usesRemaining={movesUsesRemaining}
      triggerItemId={moveTriggerItemId}
      using={using}
      onUseMove={(moveId) => void handleUseMove(moveId)}
      onDetails={setMoveInfoId}
      embedded={embedded}
    />
  )

  return (
    <>
      {mode !== 'powers' && (
        <Shell {...(!embedded ? { open: moveOpen, onOpenChange: setMoveOpen } : {})}>
          {!embedded && <DrawerTrigger asChild>
            <BattleActionTrigger
              itemId={moveTriggerItemId}
              label="Moves"
              count={`${Math.max(0, movesUsesRemaining)}/${maxMovesPerBattle}`}
              data-action="moves"
              aria-label={`Moves, ${Math.max(0, movesUsesRemaining)} of ${maxMovesPerBattle} uses remaining`}
              data-empty={!hasAnyMoves || undefined}
              disabled={disabled}
            />
          </DrawerTrigger>}
          <Content
            id={moveDrawerContentId}
            className={embedded ? 'min-h-0' : 'game-paper-modal game-paper-background max-h-[70dvh] border-game-border bg-game-surface-raised'}
          >
            {embedded && moveInfoId ? (
              <div className="mx-auto max-w-2xl pb-4">
                <Button type="button" variant="ghost" className="mb-3" onClick={() => setMoveInfoId(null)}>← Back to moves</Button>
                {(() => {
                  const moveOption = availableMoves.find((candidate) => candidate.id === moveInfoId)
                  const move = moveOption ? getMove(moveOption.id) : undefined
                  return move ? <MoveFieldNote presentation={getBattleMovePresentation(move, activePlayerMon, battleState, selectedType)} /> : null
                })()}
              </div>
            ) : renderMovesContent()}
          </Content>
        </Shell>
      )}

      {!embedded && <MoveInfoDialog
        presentation={
          moveInfoId
            ? (() => {
                const moveOption = availableMoves.find(
                  (candidate) => candidate.id === moveInfoId,
                )
                const move = moveOption ? getMove(moveOption.id) : undefined
                return move
                  ? getBattleMovePresentation(
                      move,
                      activePlayerMon,
                      battleState,
                      selectedType,
                    )
                  : null
              })()
            : null
        }
        onOpenChange={(open) => {
          if (!open) {
            setMoveInfoId(null)
          }
        }}
      />}

      {mode !== 'moves' && (
        <Shell {...(!embedded ? { open: powerOpen, onOpenChange: setPowerOpen } : {})}>
          {!embedded && <DrawerTrigger asChild>
            <BattleActionTrigger
              itemId={powerTriggerItemId}
              label="Powers"
              count={hasAnyPowers ? powerUsesChip : '—'}
              data-action="powers"
              aria-label={`Powers, ${powerUsesChip} uses remaining`}
              data-empty={(!hasAnyPowers && !isBattlePanelLoading) || undefined}
              disabled={disabled}
            />
          </DrawerTrigger>}
          <Content
            id={powerDrawerContentId}
            className={embedded ? 'min-h-0' : 'game-paper-modal game-paper-background max-h-[80dvh] border-game-border bg-game-surface-raised'}
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
                <div className={embedded ? 'space-y-6' : 'overflow-y-auto max-h-[calc(80dvh-150px)] space-y-6'}>
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
                        <div
                          className="rounded-md border border-dashed border-game-border bg-game-canvas/45 px-3 py-4 text-center text-sm text-game-muted"
                          role="status"
                          aria-live="polite"
                        >
                          {powersState?.teraUsesRemaining === 0
                            ? 'No Terastallization uses remaining'
                            : isAnyPowerActive
                              ? disabledReason ||
                                'Cannot use Tera while another power is active'
                              : 'This Pokemon has already used Terastallization'}
                        </div>
                      ) : !powersData.teraType ? (
                        <div
                          className="rounded-md border border-dashed border-game-border bg-game-canvas/45 px-3 py-4 text-center text-sm text-game-muted"
                          role="status"
                          aria-live="polite"
                        >
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
                          <span className="text-xs text-game-clay-strong">
                            Active
                          </span>
                        </div>
                      )}
                      {powersState?.megaEvolved ? (
                        <div
                          className="rounded-md border border-dashed border-game-border bg-game-canvas/45 px-3 py-4 text-center text-sm text-game-muted"
                          role="status"
                          aria-live="polite"
                        >
                          Mega Evolution active
                        </div>
                      ) : powersState?.megaUsesRemaining === 0 ? (
                        <div
                          className="rounded-md border border-dashed border-game-border bg-game-canvas/45 px-3 py-4 text-center text-sm text-game-muted"
                          role="status"
                          aria-live="polite"
                        >
                          No Mega Evolution uses remaining
                        </div>
                      ) : isAnyPowerActive ? (
                        <div
                          className="rounded-md border border-dashed border-game-border bg-game-canvas/45 px-3 py-4 text-center text-sm text-game-muted"
                          role="status"
                          aria-live="polite"
                        >
                          {disabledReason ||
                            'Cannot Evolve while another power is active'}
                        </div>
                      ) : !canUseMega ? (
                        <p className="py-2 text-sm text-game-muted">Win {POWER_STANCE_WIN_COST - getStanceWinCharges(powersState)} more stance matchups.</p>
                      ) : powersData.megaStones.length === 0 ? (
                        <div
                          className="rounded-md border border-dashed border-game-border bg-game-canvas/45 px-3 py-4 text-center text-sm text-game-muted"
                          role="status"
                          aria-live="polite"
                        >
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
                        <div
                          className="rounded-md border border-dashed border-game-border bg-game-canvas/45 px-3 py-4 text-center text-sm text-game-muted"
                          role="status"
                          aria-live="polite"
                        >
                          No Z-Move uses remaining
                        </div>
                      ) : isAnyPowerActive ? (
                        <div className="text-sm text-game-muted py-2">
                          {disabledReason ||
                            'Cannot use Z-Move while another power is active'}
                        </div>
                      ) : !canUseZMove ? (
                        <p className="py-2 text-sm text-game-muted">Win {POWER_STANCE_WIN_COST - getStanceWinCharges(powersState)} more stance matchups.</p>
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
                            Next successful stance · base 250
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
                      ) : getStanceWinCharges(powersState) < POWER_STANCE_WIN_COST ? (
                        <div className="flex items-center gap-2 text-sm text-game-muted py-2">
                          <Lock className="w-4 h-4" />
                          Win {POWER_STANCE_WIN_COST - getStanceWinCharges(powersState)} more stance matchups
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

                  {/* Weather Power */}
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
                          Weather Power
                        </span>
                      </SectionDivider>
                      {!canUseWeather ? (
                        <div className="text-sm text-game-muted py-2">
                          {powersState?.weatherUsesRemaining === 0
                            ? 'No Weather Power uses remaining'
                            : 'Cannot use Weather Power now'}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {battleState.weather?.label && (
                            <div className="text-xs text-game-muted">
                              Current weather: {battleState.weather.label}
                            </div>
                          )}
                          <Button
                            variant="outline"
                            className="h-auto w-full rounded-xl border-game-border bg-game-surface-raised px-3 py-3 text-left shadow-sm transition-colors hover:border-game-moss/60 hover:bg-game-moss/10"
                            disabled={using !== null}
                            onClick={handleUseWeather}
                          >
                            <span className="flex items-center gap-3">
                              <ItemSprite
                                itemId="weather-orb"
                                alt="Weather Power"
                                width={32}
                                height={32}
                                className="h-8 w-8"
                              />
                              <span className="flex flex-col items-start gap-1">
                                <span className="text-sm font-medium text-game-ink">
                                  Use weather technique
                                </span>
                                <span className="text-xs text-game-muted">
                                  Performs an effect based on the current
                                  weather
                                </span>
                              </span>
                            </span>
                          </Button>
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
                      {activePlayerMon.shoutBoost ? (
                        <div className="flex items-center justify-between gap-3 rounded-xl border border-game-ochre/40 bg-game-ochre/10 px-3 py-3 text-sm text-game-ochre-strong">
                          <div className="flex items-center gap-2">
                            <Megaphone className="h-4 w-4 shrink-0" />
                            <span>Battle Shout is active</span>
                          </div>
                          <span className="font-mono text-xs">
                            {activePlayerMon.shoutBoost.turnsRemaining} turns
                          </span>
                        </div>
                      ) : !canUseShout ? (
                        <div className="text-sm text-game-muted py-2">
                          {powersState?.shoutUsesRemaining === 0
                            ? 'No shouts remaining'
                            : 'Cannot shout now'}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            className="h-auto w-full rounded-xl border border-game-border bg-game-surface-raised px-3 py-3 text-left shadow-sm transition-colors hover:border-game-moss/60 hover:bg-game-moss/10"
                            disabled={using !== null}
                            onClick={handleUseShout}
                          >
                            <span className="flex items-center gap-3">
                              <Megaphone className="h-6 w-6 shrink-0 text-game-ochre" />
                              <span className="flex flex-col items-start gap-1">
                                <span className="text-sm font-medium text-game-ink">
                                  Raise all core stats
                                </span>
                                <span className="text-xs text-game-muted">
                                  +1 Attack, Defense, Special Attack, Special
                                  Defense, and Speed for 3 turns
                                </span>
                              </span>
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
                                getStanceWinCharges(powersState) < POWER_STANCE_WIN_COST
                              }
                              onClick={() => handleUseDimensionalShift('time')}
                            >
                              <Clock className="w-6 h-6 text-fuchsia-400 mb-1" />
                              <span className="text-xs font-medium text-fuchsia-100">
                                Rewind
                              </span>
                              <span className="text-[10px] text-game-muted">
                                3 wins
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
                                getStanceWinCharges(powersState) < POWER_STANCE_WIN_COST
                              }
                              onClick={() => handleUseDimensionalShift('space')}
                            >
                              <Maximize2 className="w-6 h-6 text-game-clay-strong mb-1" />
                              <span className="text-xs font-medium text-game-ink">
                                Lock
                              </span>
                              <span className="text-[10px] text-game-muted">
                                3 wins
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
                                getStanceWinCharges(powersState) < POWER_STANCE_WIN_COST
                              }
                              onClick={() => handleUseDimensionalShift('chaos')}
                            >
                              <Atom className="w-6 h-6 text-game-muted mb-1" />
                              <span className="text-xs font-medium text-game-ink">
                                Oblivion
                              </span>
                              <span className="text-[10px] text-game-muted">
                                3 wins
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
          </Content>
        </Shell>
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
