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
import { useBattleManager } from '@/utilities/battle/engine/useBattleManager'
import type { BattleInventoryItem, BattlePokemon, BattleState } from '@/utilities/battle/types'
import type {
  DoublesAction,
  DoublesTarget,
} from '@/utilities/battle/doubles-state'
import { getDefaultDoublesTarget, stageDoublesAction } from '@/utilities/battle/doubles-state'

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
initialState.playerTeam[0].currentHp = 54

const fixtureItems: BattleInventoryItem[] = [
  { itemId: 'battle-potion', name: 'Potion', quantity: 3, battleEffect: { type: 'heal', healAmount: 20 } },
  { itemId: 'revive', name: 'Revive', quantity: 1, battleEffect: { type: 'revive', reviveHpPercent: 50 } },
]

export function DoubleBattleUiFixture() {
  const manager = useBattleManager(initialState)
  const [selectedDoublesSlot, setSelectedDoublesSlot] = useState<0 | 1>(0)
  const [doublesDraft, setDoublesDraft] = useState<
    Partial<Record<0 | 1, DoublesAction>>
  >({})
  const [selectedDoublesTarget, setSelectedDoublesTarget] =
    useState<DoublesTarget>(() => getDefaultDoublesTarget(initialState))
  const [submittedActions, setSubmittedActions] = useState<DoublesAction[]>([])
  const submitFixtureTurn = (actions: DoublesAction[]) => {
    setSubmittedActions(actions)
    const next: BattleState = {
      ...initialState,
      turn: 2,
      enemyTeam: initialState.enemyTeam.map((mon, index) => ({
        ...mon,
        currentHp: index === 0 ? 37 : index === 1 ? 41 : mon.currentHp,
      })),
      history: [{
        turn: 2,
        playerStance: 'power',
        enemyStance: 'tech',
        result: 'win',
        damageDealt: 36,
        damageTaken: 0,
        message: 'Smeargle attacked Minun. Skeledirge attacked Plusle.',
      }, ...initialState.history],
      presentation: {
        sequenceId: 'fixture-double-turn-2',
        turn: 2,
        events: [
          { type: 'attack', actorSide: 'player', targetSide: 'enemy', actorIndex: 0, targetIndex: 1, damage: 16, hpAfter: 41, attackType: 'normal', message: 'Smeargle attacked Minun.' },
          { type: 'attack', actorSide: 'player', targetSide: 'enemy', actorIndex: 1, targetIndex: 0, damage: 20, hpAfter: 37, attackType: 'fire', message: 'Skeledirge attacked Plusle.' },
        ],
      },
    }
    manager.pushTurnResult({ success: true, state: next })
  }
  const chooseAction = (action: DoublesAction) => {
    const staged = stageDoublesAction(manager.battleState, doublesDraft, action)
    if (!staged) return
    setDoublesDraft(staged.draft)
    if (staged.nextSlot !== undefined) {
      setSelectedDoublesSlot(staged.nextSlot)
      setSelectedDoublesTarget(getDefaultDoublesTarget(initialState))
    } else if (staged.actions) {
      submitFixtureTurn(staged.actions)
    }
  }
  const context = {
    battleState: manager.battleState,
    activePlayerMon: manager.battleState.playerTeam[0],
    activeEnemyMon: manager.battleState.enemyTeam[0],
    selectedType: 'normal',
    setSelectedType: () => {},
    selectedDoublesSlot,
    setSelectedDoublesSlot,
    doublesDraft,
    setDoublesDraft,
    battleInventoryItems: fixtureItems,
    selectedDoublesTarget,
    setSelectedDoublesTarget,
    handleDoublesChooseAction: chooseAction,
    isAnimating: manager.isProcessing,
    isWaitingForServer: false,
    isWaitingForOpponent: manager.isWaitingForOpponent,
    pendingBattleAction: null,
    handleDoublesSubmit: submitFixtureTurn,
    handleDoublesReplace: () => {},
    handleSurrender: () => {},
  } as unknown as BattleContextType

  return (
    <BattleProvider value={context}>
      <div className="game-night h-dvh bg-game-night-canvas text-game-night-ink">
        <div className="game-desktop-activity-stage game-activity-chrome relative flex h-full flex-col overflow-hidden xl:my-4 xl:h-[calc(100%-2rem)] xl:grid xl:grid-cols-[minmax(0,1fr)_19rem] xl:grid-rows-[minmax(26rem,1fr)_auto]">
          <BattleScene
            battleState={manager.battleState}
            anim={manager.anim}
            selectedDoublesSlot={selectedDoublesSlot}
            selectedDoublesTarget={selectedDoublesTarget}
            onChooseDoublesTarget={setSelectedDoublesTarget}
            disableDoublesTargetSelection={manager.isProcessing}
          />
          <div className="xl:col-start-1 xl:row-start-2">
            <BattleActionMenu />
          </div>
          <div
            data-testid="battle-log-panel"
            className="game-paper-first relative min-h-0 flex-[24] border-t border-game-border bg-game-surface-raised xl:col-start-2 xl:row-start-1 xl:row-span-2 xl:border-l xl:border-t-0"
          >
            <div className="h-full overflow-hidden">
              <BattleLog logs={manager.battleState.history} />
            </div>
            <div className="absolute bottom-4 right-4 z-30">
              <BattleSurrenderButton />
            </div>
          </div>
        </div>
        <output data-testid="submitted-doubles-actions" className="sr-only">{JSON.stringify(submittedActions)}</output>
        <output data-testid="staged-doubles-actions" className="sr-only">{JSON.stringify(doublesDraft)}</output>
        <output data-testid="doubles-animation-processing" className="sr-only">{String(manager.isProcessing)}</output>
      </div>
    </BattleProvider>
  )
}
