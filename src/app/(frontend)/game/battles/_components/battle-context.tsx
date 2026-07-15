'use client'

import React, { createContext, useContext } from 'react'
import type { BattleState, BattleStance } from '@/utilities/battle/types'
import type { BattlePowersData } from '../powers/powers-data'
import type { MoveContinuousConfig, MoveStance } from '@/data/moves/types'

interface BattleMoveOption {
  id: string
  name: string
  stance: MoveStance
  forcedType?: string
  charged?: number
  recharge?: number
  continuous?: MoveContinuousConfig
}

export interface BattleContextType {
  battleState: BattleState
  activePlayerMon: any
  activeEnemyMon: any
  selectedType: string | null
  setSelectedType: (val: string) => void
  isAnimating: boolean
  isWaitingForServer: boolean
  pendingBattleAction: {
    kind: string
    label: string
    stance?: BattleStance
    itemId?: string
    moveId?: string
    pokemonIndex?: number
  } | null
  isBattlePanelLoading: boolean
  hasPowerKeyItems: boolean
  availableMoves: BattleMoveOption[]
  battlePowersData: BattlePowersData | null
  playerHasTeraEffect: boolean
  handleStanceSelect: (stance: BattleStance) => void | Promise<void>
  handleUseItem: (itemId: string) => void | Promise<void>
  handleUseTera: () => void | Promise<void>
  handleUseMega: (megaStoneId: string) => void | Promise<void>
  handleUseZMove: () => void | Promise<void>
  handleUseDynamax: () => void | Promise<void>
  handleUseMove: (moveId: string) => void | Promise<void>
  handleUseVictory: (itemId: string) => void | Promise<void>
  handleUseWeather: (weather: string) => void | Promise<void>
  handleUseShout: (stance: BattleStance) => void | Promise<void>
  handleUseCircadian: () => void | Promise<void>
  handleUseDimensionalShift: (
    type: 'time' | 'space' | 'chaos',
  ) => void | Promise<void>
  handleSwapPokemon: (index: number) => void | Promise<void>
  handleSurrender: () => void | Promise<void>
}

const BattleContext = createContext<BattleContextType | undefined>(undefined)

export function BattleProvider({
  children,
  value,
}: {
  children: React.ReactNode
  value: BattleContextType
}) {
  return (
    <BattleContext.Provider value={value}>{children}</BattleContext.Provider>
  )
}

export function useBattleContext() {
  const context = useContext(BattleContext)
  if (context === undefined) {
    throw new Error('useBattleContext must be used within a BattleProvider')
  }
  return context
}
