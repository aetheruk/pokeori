export type {
  ProcedureOrderCard,
  ProcedureOrderGameConfig,
  ProcedureOrderSettings,
} from './types'

import { gymLeaderChronicleProcedureOrderEntries } from './entries/gym-leader-chronicles'

export const procedureOrderGames = [
  ...gymLeaderChronicleProcedureOrderEntries,
]
