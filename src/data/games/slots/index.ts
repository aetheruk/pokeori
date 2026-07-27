import { celadonGameCornerSlotEntries } from './entries/celadon-game-corner'

export * from './types'
import { SlotGameConfig } from './types'

export const slotGames: SlotGameConfig[] = [...celadonGameCornerSlotEntries]
