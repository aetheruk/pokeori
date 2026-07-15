export type { DiglettTunnelTapGameConfig, DiglettTunnelTapSettings } from './types'

import { DiglettTunnelTapGameConfig } from './types'
import { diglettsCaveDiglettTunnelTapEntries } from './entries/digletts-cave'
import { testDiglettTunnelTapEntries } from './entries/test'

export const diglettTunnelTapGames: DiglettTunnelTapGameConfig[] = [
  ...testDiglettTunnelTapEntries,
  ...diglettsCaveDiglettTunnelTapEntries,
]
