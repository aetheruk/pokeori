import React from 'react'
import { PokemonDisplay } from './pokemon-display'

interface PokemonSpriteDisplayProps {
  activePlayerMon: any
  activeEnemyMon: any
  playerAttacking: boolean
  playerHit: boolean
  playerFainting: boolean
  playerSwitchingOut: boolean
  playerSwitchingIn: boolean
  playerHasTeraEffect: boolean
  playerHasZPowerEffect: boolean
  playerTeraType?: string
  playerDamageSplat: number | null
  playerStatusDamageSplat: number | null
  playerImpactType: string | null
  hidePlayer?: boolean

  enemyAttacking: boolean
  enemyHit: boolean
  enemyFainting: boolean
  enemySwitchingOut: boolean
  enemySwitchingIn: boolean
  enemyHasTeraEffect: boolean
  enemyHasZPowerEffect: boolean
  enemyTeraType?: string
  enemyDamageSplat: number | null
  enemyStatusDamageSplat: number | null
  enemyImpactType: string | null
}

export function PokemonSpriteDisplay({
  activePlayerMon,
  activeEnemyMon,
  playerAttacking,
  playerHit,
  playerFainting,
  playerSwitchingOut,
  playerSwitchingIn,
  playerHasTeraEffect,
  playerHasZPowerEffect,
  playerTeraType,
  playerDamageSplat,
  playerStatusDamageSplat,
  playerImpactType,
  hidePlayer = false,
  enemyAttacking,
  enemyHit,
  enemyFainting,
  enemySwitchingOut,
  enemySwitchingIn,
  enemyHasTeraEffect,
  enemyHasZPowerEffect,
  enemyTeraType,
  enemyDamageSplat,
  enemyStatusDamageSplat,
  enemyImpactType,
}: PokemonSpriteDisplayProps) {
  return (
    <div className="flex w-full max-w-4xl justify-between items-end px-6 sm:px-8 h-full pb-24 sm:pb-28 z-10">
      {/* Player Side */}
      <div className="relative flex flex-col items-center gap-2 origin-bottom-left translate-y-2 sm:translate-y-0">
        {!hidePlayer && (
          <>
            <div className="absolute bottom-4 z-0 h-6 w-28 rounded-[50%] border border-white/5 bg-black/30 blur-[2px] shadow-[0_0_10px_rgba(0,0,0,0.35)]" />
            <PokemonDisplay
              formId={activePlayerMon.battleAbilityState?.illusionMask?.formId || activePlayerMon.formId}
              isPlayer
              isAttacking={playerAttacking}
              isHit={playerHit}
              isFainting={playerFainting}
              isSwitchingOut={playerSwitchingOut}
              isSwitchingIn={playerSwitchingIn}
              backSprite
              isDynamaxed={activePlayerMon.isDynamaxed}
              hasTeraEffect={playerHasTeraEffect}
              hasZPowerEffect={playerHasZPowerEffect}
              teraType={playerTeraType}
              status={activePlayerMon.status}
              isShadow={activePlayerMon.isShadow}
              isRadiant={activePlayerMon.isRadiant}
              shiny={!!activePlayerMon.shiny}
              rarity={activePlayerMon.rarity}
              gender={activePlayerMon.gender}
              damageSplat={playerDamageSplat}
              statusDamageSplat={playerStatusDamageSplat}
              attackEffectType={playerImpactType}
              className="h-32 w-32"
            />
          </>
        )}
      </div>

      {/* Enemy Side */}
      <div className="relative flex flex-col items-center gap-2 origin-bottom-right -translate-y-8 sm:-translate-y-10 z-0">
        <div className="absolute bottom-7 z-0 h-6 w-28 rounded-[50%] border border-white/5 bg-black/30 blur-[2px] shadow-[0_0_10px_rgba(0,0,0,0.35)]" />
        <PokemonDisplay
          formId={activeEnemyMon.battleAbilityState?.illusionMask?.formId || activeEnemyMon.formId}
          isPlayer={false}
          isAttacking={enemyAttacking}
          isHit={enemyHit}
          isFainting={enemyFainting}
          isSwitchingOut={enemySwitchingOut}
          isSwitchingIn={enemySwitchingIn}
          usePixelSprite
          isDynamaxed={activeEnemyMon.isDynamaxed}
          hasTeraEffect={enemyHasTeraEffect}
          hasZPowerEffect={enemyHasZPowerEffect}
          teraType={enemyTeraType}
          status={activeEnemyMon.status}
          isShadow={activeEnemyMon.isShadow}
          isRadiant={activeEnemyMon.isRadiant}
          shiny={!!activeEnemyMon.shiny}
          rarity={activeEnemyMon.rarity}
          gender={activeEnemyMon.gender}
          damageSplat={enemyDamageSplat}
          statusDamageSplat={enemyStatusDamageSplat}
          attackEffectType={enemyImpactType}
          className="h-32 w-32"
        />
      </div>
    </div>
  )
}
