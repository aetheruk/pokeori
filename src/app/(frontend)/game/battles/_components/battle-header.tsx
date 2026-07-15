import React from 'react'
import { MdCatchingPokemon } from 'react-icons/md'
import { needsPlayerLeadSelection } from '@/utilities/battle/switching'
import { HealthDisplay } from './health-display'

interface BattleHeaderProps {
  battleState: any
  activePlayerMon: any
  activeEnemyMon: any
  isWaitingForOpponent: boolean
}

function TeamBallGrid({
  team,
  bottomUp = false,
}: {
  team: any[]
  bottomUp?: boolean
}) {
  const displayedTeam = team.slice(0, 6)
  const slots = Array.from<any | null>({ length: 6 }).fill(null)

  displayedTeam.forEach((pokemon, index) => {
    const row = Math.floor(index / 2)
    const column = index % 2
    const visualRow = bottomUp ? 2 - row : row
    slots[visualRow * 2 + column] = pokemon
  })

  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-x-1.5 gap-y-1.5">
      {slots.map((p: any | null, i: number) =>
        p ? (
          <MdCatchingPokemon
            key={i}
            className={`h-5 w-5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] ${
              p.currentHp > 0
                ? p.currentHp < p.maxHp
                  ? 'text-game-night-muted'
                  : 'text-game-night-ink'
                : 'text-game-danger'
            }`}
          />
        ) : (
          <span key={i} className="h-5 w-5" aria-hidden />
        ),
      )}
    </div>
  )
}

export function BattleHeader({
  battleState,
  activePlayerMon,
  activeEnemyMon,
  isWaitingForOpponent,
}: BattleHeaderProps) {
  const choosingLead = needsPlayerLeadSelection(battleState)

  return (
    <>
      {/* Waiting Overlay */}
      {isWaitingForOpponent && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-game-night-surface/72 text-game-night-ink backdrop-blur-sm animate-in fade-in transition-all">
          <div className="animate-spin text-game-ochre mb-4">
            <MdCatchingPokemon className="w-10 h-10" />
          </div>
          <div className="text-xl font-bold tracking-wider">
            Waiting for opponent…
          </div>
          <div className="mt-2 text-sm text-game-night-muted">Thinking…</div>
        </div>
      )}

      {/* Safe area spacer for notched phones */}
      <div className="absolute top-0 left-0 right-0 h-[env(safe-area-inset-top)] bg-game-night-canvas" />

      {/* Background Image */}
      {battleState.background && (
        <div
          className="absolute inset-0 z-0 opacity-50"
          style={{
            backgroundImage: `url(${battleState.background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}

      {/* Enemy HUD */}
      <div className="pointer-events-none absolute inset-x-4 top-[max(1rem,calc(env(safe-area-inset-top)+0.5rem))] z-20 flex items-start justify-between gap-4">
        <TeamBallGrid team={battleState.enemyTeam} />
        <div className="w-[min(72vw,20rem)]">
          <HealthDisplay
            currentHp={activeEnemyMon.currentHp}
            maxHp={activeEnemyMon.maxHp}
            name={
              activeEnemyMon.battleAbilityState?.illusionMask?.name ||
              activeEnemyMon.name
            }
            level={activeEnemyMon.level}
            align="right"
            status={activeEnemyMon.status}
            preferredStance={activeEnemyMon.observedPreferredStance}
          />
        </div>
      </div>

      {/* Player HUD */}
      {!choosingLead && (
        <div className="pointer-events-none absolute inset-x-4 bottom-4 z-20 flex items-end justify-between gap-4">
          <div className="w-[min(72vw,20rem)]">
            <HealthDisplay
              currentHp={activePlayerMon.currentHp}
              maxHp={activePlayerMon.maxHp}
              name={
                activePlayerMon.battleAbilityState?.illusionMask?.name ||
                activePlayerMon.name
              }
              level={activePlayerMon.level}
              isPlayer
              align="left"
              status={activePlayerMon.status}
            />
          </div>
          <TeamBallGrid team={battleState.playerTeam} bottomUp />
        </div>
      )}
    </>
  )
}
