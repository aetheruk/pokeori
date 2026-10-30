import { testCoinPusherEntries } from './entries/test'
import { celadonCoinPusherEntries } from './entries/celadon-game-corner'

export * from './types'
export const coinPusherGames = [...testCoinPusherEntries, ...celadonCoinPusherEntries]
