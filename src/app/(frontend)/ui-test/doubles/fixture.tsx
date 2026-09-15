'use client'

import { useState } from 'react'
import { BattleActionMenu } from '@/app/(frontend)/game/battles/_components/battle-action-menu'
import {
  BattleProvider,
  type BattleContextType,
} from '@/app/(frontend)/game/battles/_components/battle-context'
import { BattleLog } from '@/app/(frontend)/game/battles/_components/battle-log'
import { BattleScene } from '@/app/(frontend)/game/battles/_components/battle-scene'
import { BattleSurrenderButton } from '@/app/(frontend)/game/battles/_components/battle-surrender-button'
import { INITIAL_ANIMATION_STATE } from '@/utilities/battle/engine/types'
import type { BattlePokemon, BattleState } from '@/utilities/battle/types'
import type {
  DoublesAction,
  DoublesTarget,
} from '@/utilities/battle/doubles-state'

function pokemon(
  id: string,
  name: string,
  speciesId: number,
  side: 'player' | 'enemy',
  hp: number,
  types: string[],
  moves: string[] = [],
): BattlePokemon {
  return {
    id,
    name,
    speciesId,
    formId: String(speciesId),
    user: side,
    originalTrainer: side,
    level: side === 'player' ? 30 : 20,
    types,
    stats: {
      hp,
      attack: 70,
      defense: 70,
      specialAttack: 70,
      specialDefense: 70,
      speed: 70,
    },
    currentHp: hp,
    maxHp: hp,
    moveUsesRemaining: 4,
    battleMoveIds: moves,
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
  }
}

const initialState: BattleState = {
  format: 'double',
  playerTeam: [
    pokemon(
      'smeargle',
      'Smeargle',
      235,
      'player',
      74,
      ['normal'],
      ['giga-drain', 'sketch', 'heat-wave', 'helping-hand'],
    ),
    pokemon(
      'skeledirge',
      'Skeledirge',
      911,
      'player',
      110,
      ['fire', 'ghost'],
      ['heat-wave', 'flamethrower'],
    ),
    pokemon('gyarados', 'Gyarados', 130, 'player', 105, ['water', 'flying']),
    pokemon('primeape', 'Primeape', 57, 'player', 88, ['fighting']),
  ],
  enemyTeam: [
    pokemon('plusle', 'Plusle', 311, 'enemy', 57, ['electric']),
    pokemon('minun', 'Minun', 312, 'enemy', 57, ['electric']),
    pokemon('pikachu', 'Pikachu', 25, 'enemy', 55, ['electric']),
    pokemon('eevee', 'Eevee', 133, 'enemy', 61, ['normal']),
  ],
  activePlayerIndex: 0,
  activeEnemyIndex: 0,
  activePlayerSlots: [0, 1],
  activeEnemySlots: [0, 1],
  turn: 1,
  history: [
    {
      turn: 1,
      playerStance: 'tech',
      enemyStance: 'tech',
      result: 'tie',
      damageDealt: 0,
      damageTaken: 0,
      message: 'Trainer sent out Smeargle and Skeledirge!',
    },
  ],
  status: 'ongoing',
  battleId: 'kanto-test-double-battle',
  config: { itemsPerBattle: 2, movesPerBattle: 4, allowSwapping: true },
  background: '/backgrounds/friend-stadium.avif',
  playerName: 'Trainer',
  enemyName: 'Trial',
  itemsUsedThisBattle: [],
}

export function DoubleBattleUiFixture() {
  const [selectedDoublesSlot, setSelectedDoublesSlot] = useState<0 | 1>(0)
  const [doublesDraft, setDoublesDraft] = useState<
    Partial<Record<0 | 1, DoublesAction>>
  >({})
  const chooseTarget = (target: DoublesTarget) => {
    setDoublesDraft((current) => {
      const action = current[selectedDoublesSlot]
      if (!action || (action.kind !== 'basic' && action.kind !== 'move'))
        return current
      return { ...current, [selectedDoublesSlot]: { ...action, target } }
    })
  }
  const context = {
    battleState: initialState,
    activePlayerMon: initialState.playerTeam[0],
    activeEnemyMon: initialState.enemyTeam[0],
    selectedType: 'normal',
    setSelectedType: () => {},
    selectedDoublesSlot,
    setSelectedDoublesSlot,
    doublesDraft,
    setDoublesDraft,
    isAnimating: false,
    isWaitingForServer: false,
    pendingBattleAction: null,
    handleDoublesSubmit: () => {},
    handleDoublesReplace: () => {},
    handleSurrender: () => {},
  } as unknown as BattleContextType

  return (
    <BattleProvider value={context}>
      <div className="h-dvh bg-game-canvas text-game-ink">
        <div className="game-desktop-activity-stage game-activity-chrome relative flex h-full flex-col overflow-hidden xl:my-4 xl:h-[calc(100%-2rem)] xl:grid xl:grid-cols-[minmax(0,1fr)_19rem] xl:grid-rows-[minmax(26rem,1fr)_auto]">
          <BattleScene
            battleState={initialState}
            anim={INITIAL_ANIMATION_STATE}
            selectedDoublesSlot={selectedDoublesSlot}
            selectedDoublesAction={doublesDraft[selectedDoublesSlot]}
            onChooseDoublesTarget={chooseTarget}
          />
          <div className="xl:col-start-1 xl:row-start-2">
            <BattleActionMenu />
          </div>
          <div
            data-testid="battle-log-panel"
            className="relative min-h-0 flex-[24] border-t border-game-border bg-game-surface-raised xl:col-start-2 xl:row-start-1 xl:row-span-2 xl:border-l xl:border-t-0"
          >
            <div className="h-full overflow-hidden">
              <BattleLog logs={initialState.history} />
            </div>
            <div className="absolute bottom-4 right-4 z-30">
              <BattleSurrenderButton />
            </div>
          </div>
        </div>
      </div>
    </BattleProvider>
  )
}
