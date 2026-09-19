'use client'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { PokemonRaritySprite } from '@/components/game/shared/PokemonRaritySprite'
import { Button } from '@/components/ui/button'
import { getBattleItemUseLimit } from '@/utilities/battle/item-use-limits'
import { getPokemonMoveUsesRemaining } from '@/utilities/battle/move-uses'
import { getBattleMoveTriggerItemId } from '@/utilities/battle/move-presentation'
import { getStanceWinCharges, POWER_STANCE_WIN_COST } from '@/utilities/battle/power-charges'
import { StanceSelector } from './stance-selector'
import { BattleActionTrigger } from './battle-action-trigger'
import { BattleControlRegion, type BattlePanel } from './battle-control-region'
import {
  needsPlayerLeadSelection,
  needsPlayerMoveSwitch,
  needsPlayerReplacement,
} from '@/utilities/battle/switching'
import { useBattleContext } from './battle-context'
import { ItemSelector } from './item-selector'
import { PowerSelector } from './power-selector'
import { TeamSwapper } from './team-swapper'
import { DoubleActionMenu } from './double-action-menu'

export function BattleActionMenu() {
  const { battleState: formatState } = useBattleContext()
  if (formatState.format === 'double') return <DoubleActionMenu />
  return <SingleBattleActionMenu />
}

function SingleBattleActionMenu() {
  const {
    battleState,
    activePlayerMon,
    activeEnemyMon,
    selectedType,
    setSelectedType,
    isAnimating,
    isWaitingForServer,
    pendingBattleAction,
    availableMoves,
    handleStanceSelect,
    handleUseMove,
    handleSurrender,
  } = useBattleContext()
  const [panel, setPanel] = useState<BattlePanel>(null)
  const [fleeing, setFleeing] = useState(false)
  useEffect(() => setPanel(null), [battleState.turn, battleState.activePlayerIndex])

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

  const commandUses = panel === 'moves'
    ? `${getPokemonMoveUsesRemaining(activePlayerMon, battleState.powers?.moveUsesRemaining)} left`
    : panel === 'items'
      ? `${Math.max(0, getBattleItemUseLimit(battleState, 'player') - (battleState.itemsUsedThisBattle?.length ?? 0))} left`
      : panel === 'powers'
        ? `${getStanceWinCharges(battleState.powers)}/${POWER_STANCE_WIN_COST} wins`
        : undefined
  const forceSwitch = requiresLeadSelection || requiresReplacement || requiresMoveSwitch
  const currentPanel = forceSwitch ? 'switch' : panel

  return (
    <BattleControlRegion
      state={battleState}
      panel={currentPanel}
      onBack={() => setPanel(null)}
      canGoBack={!forceSwitch}
      uses={commandUses}
      stanceType={activePlayerMon.teraTypeOverride ?? selectedType ?? activePlayerMon.types[0]}
      primaryType={activePlayerMon.types[0]}
      commands={activeMoveLock ? (
        <Button type="button" size="lg" className="h-14 w-full text-base font-semibold" disabled={isDisabled} onClick={() => handleUseMove(activeMoveLock.moveId)}>{lockedMoveLabel}</Button>
      ) : (
        <div className="game-battle-action-strip w-full">
          <BattleActionTrigger
            icon={<PokemonRaritySprite formId={activePlayerMon.formId} view="front" rarity={activePlayerMon.rarity} shiny={activePlayerMon.shiny} isShadow={activePlayerMon.isShadow} isRadiant={activePlayerMon.isRadiant} female={activePlayerMon.gender === 'female'} alt="" sizes="32px" className="h-8 w-8 object-contain" />}
            label="Stance" data-action="stance" disabled={isDisabled || !selectedType} onClick={() => setPanel('stance')}
          />
          <BattleActionTrigger itemId={getBattleMoveTriggerItemId(activePlayerMon.types)} label="Moves" data-action="moves" disabled={isDisabled} onClick={() => setPanel('moves')} />
          <BattleActionTrigger itemId="battle-potion" label="Items" data-action="items" disabled={isDisabled || !!battleState.isPvp} onClick={() => setPanel('items')} />
          <BattleActionTrigger itemId="tera-orb" label="Powers" data-action="powers" disabled={isDisabled} onClick={() => setPanel('powers')} />
          <BattleActionTrigger itemId="poke-ball" label="Switch" data-action="switch" disabled={isDisabled} onClick={() => setPanel('switch')} />
          <BattleActionTrigger itemId="escape-rope" label="Flee" data-action="flee" disabled={isDisabled} onClick={() => setPanel('flee')} />
        </div>
      )}
    >
      {isWaitingForServer && pendingBattleAction?.kind !== 'stance' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-game-surface/80 backdrop-blur-[1px]">
          <div className="flex flex-col items-center gap-2 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-game-moss motion-reduce:animate-none" />
            <div className="rounded-full border border-game-moss/30 bg-game-surface-raised px-3 py-1 text-xs font-semibold text-game-moss-strong">
              {pendingBattleAction?.label || 'Resolving action'}
            </div>
          </div>
        </div>
      )}

      {forceSwitch ? (
        <div className="flex w-full flex-col items-stretch gap-3">
          <div className="w-full rounded-lg border border-game-ochre/40 bg-game-ochre/10 px-4 py-3 text-center text-sm font-semibold text-game-ink">
            {requiresLeadSelection
              ? `A wild ${activeEnemyMon.battleAbilityState?.illusionMask?.name || activeEnemyMon.name} appeared. Choose your Pokemon.`
              : requiresMoveSwitch
                ? 'Choose a Pokemon to switch in'
                : 'Choose your next Pokemon'}
          </div>
          <TeamSwapper embedded forced leadSelection={requiresLeadSelection} />
        </div>
      ) : panel === 'stance' ? (
            <StanceSelector
              onSelect={handleStanceSelect}
              stats={activePlayerMon.stats}
              statStages={activePlayerMon.statStages}
              zMoveReady={!!activePlayerMon.zMoveReady}
              isDynamaxed={!!activePlayerMon.isDynamaxed}
              disabledStance={activeDisabledStance?.stance}
              pendingStance={pendingBattleAction?.stance}
              types={activePlayerMon.types}
              selectedType={selectedType}
              onTypeSelect={setSelectedType}
              typeOverride={activePlayerMon.teraTypeOverride}
              disabled={isDisabled || !selectedType}
            />
      ) : panel === 'moves' ? (
        <PowerSelector mode="moves" embedded onActionComplete={() => setPanel(null)} />
      ) : panel === 'items' ? (
        <ItemSelector embedded onActionComplete={() => setPanel(null)} />
      ) : panel === 'powers' ? (
        <PowerSelector mode="powers" embedded onActionComplete={() => setPanel(null)} />
      ) : panel === 'switch' ? (
        <TeamSwapper embedded onActionComplete={() => setPanel(null)} />
      ) : panel === 'flee' ? (
        <div className="flex w-full max-w-sm flex-col items-center gap-4 text-center">
          <p className="text-sm text-game-muted">Leave this battle? This counts as a loss.</p>
          <Button type="button" className="game-accent-button w-full bg-game-clay" disabled={fleeing || isDisabled} onClick={async () => { setFleeing(true); try { await handleSurrender() } finally { setFleeing(false) } }}>Confirm flee</Button>
        </div>
      ) : null}
    </BattleControlRegion>
  )
}
