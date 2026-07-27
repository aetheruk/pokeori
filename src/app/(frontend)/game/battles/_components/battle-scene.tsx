import type { BattleState } from '@/utilities/battle/types'
import type { AnimationState } from '@/utilities/battle/engine/types'
import { BattleHeader } from './battle-header'
import { PokemonSpriteDisplay } from './pokemon-sprite-display'

interface BattleSceneProps {
  battleState: BattleState
  anim: AnimationState
  isWaitingForOpponent?: boolean
  hidePlayer?: boolean
  playerHasTeraEffect?: boolean
  playerHasZPowerEffect?: boolean
  enemyHasTeraEffect?: boolean
  enemyHasZPowerEffect?: boolean
}

export function BattleScene({
  battleState,
  anim,
  isWaitingForOpponent = false,
  hidePlayer = false,
  playerHasTeraEffect,
  playerHasZPowerEffect,
  enemyHasTeraEffect,
  enemyHasZPowerEffect,
}: BattleSceneProps) {
  const activePlayerMon = battleState.playerTeam[battleState.activePlayerIndex]
  const activeEnemyMon = battleState.enemyTeam[battleState.activeEnemyIndex]

  if (!activePlayerMon || !activeEnemyMon) return null

  return (
    <div className="relative flex flex-[36] flex-col items-center justify-center bg-game-night-surface p-4 xl:col-start-1 xl:row-start-1 xl:min-h-0 xl:flex-none">
      <BattleHeader
        battleState={battleState}
        activePlayerMon={activePlayerMon}
        activeEnemyMon={activeEnemyMon}
        isWaitingForOpponent={isWaitingForOpponent}
      />
      <PokemonSpriteDisplay
        activePlayerMon={activePlayerMon}
        activeEnemyMon={activeEnemyMon}
        {...anim}
        playerHasTeraEffect={
          playerHasTeraEffect ?? !!activePlayerMon.teraTypeOverride
        }
        playerHasZPowerEffect={
          playerHasZPowerEffect ?? !!activePlayerMon.zMoveReady
        }
        playerTeraType={activePlayerMon.teraTypeOverride}
        enemyHasTeraEffect={
          enemyHasTeraEffect ?? !!activeEnemyMon.teraTypeOverride
        }
        enemyHasZPowerEffect={
          enemyHasZPowerEffect ?? !!activeEnemyMon.zMoveReady
        }
        enemyTeraType={activeEnemyMon.teraTypeOverride}
        hidePlayer={hidePlayer}
      />
    </div>
  )
}
