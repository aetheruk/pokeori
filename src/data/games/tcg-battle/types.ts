import type { BaseGameConfig } from '../shared'
import type { TcgBattleDeckFormat, TcgBattleEnergyType } from '@/utilities/tcg/tcg-battle'

export interface TcgBattleGameSettings {
  deckFormat: TcgBattleDeckFormat
  requiredSeries: string
  opponentDeckCardIds: string[]
  opponentEnergyType?: TcgBattleEnergyType
  themeColour?: string
}

export interface TcgBattleGameConfig extends BaseGameConfig {
  gameType: 'tcg-battle'
  settings: TcgBattleGameSettings
}
