import type { BaseGameConfig } from '../shared'
import type { TcgBattleEnergyType } from '@/utilities/tcg/tcg-battle'

interface BaseTcgBattleGameSettings {
  requiredSeries: string
  themeColour?: string
}

export type TcgBattleGameSettings =
  | (BaseTcgBattleGameSettings & {
      battleMode?: 'pve'
      opponentDeckCardIds: string[]
      opponentEnergyType?: TcgBattleEnergyType
      opponentTrainerIcon?: string
      cost?: { amount: number; currencyType: 'crystals' }
    })
  | (BaseTcgBattleGameSettings & {
      battleMode: 'pvp'
      matchmakingModes: Array<'friendly' | 'quick'>
      opponentDeckCardIds?: never
      opponentEnergyType?: never
    })

export interface TcgBattleGameConfig extends BaseGameConfig {
  gameType: 'tcg-battle'
  settings: TcgBattleGameSettings
}
