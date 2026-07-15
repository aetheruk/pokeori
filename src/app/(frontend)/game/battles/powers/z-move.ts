import type { BattlePokemon } from '@/utilities/battle/types'
import { activateZMoveCharge } from '@/utilities/battle/z-move'

export const activateZMove = (mon: BattlePokemon) => activateZMoveCharge(mon)
