export type { DiglettTunnelTapGameConfig, DiglettTunnelTapSettings } from './types'

import { DiglettTunnelTapGameConfig } from './types'
import { diglettsCaveDiglettTunnelTapEntries } from './entries/digletts-cave'

export const diglettTunnelTapGames: DiglettTunnelTapGameConfig[] = [
  ...diglettsCaveDiglettTunnelTapEntries,
]
