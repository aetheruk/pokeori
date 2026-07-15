import { ShopConfig } from './types'
import { palletTownShops } from './entries/pallet-town'
import { viridianCityShops } from './entries/viridian-city'

import { viridianForestShops } from './entries/viridian-forest'
import { pewterCityShops } from './entries/pewter-city'
import { mtMoonShops } from './entries/mt-moon'
import { ceruleanCityShops } from './entries/cerulean-city'
import { vermilionCityShops } from './entries/vermilion-city'
import { ssAnneShops } from './entries/ss-anne'
import { diglettsCaveShops } from './entries/digletts-cave'
import { kantoUndergroundShops } from './entries/kanto-underground'
import { undergroundTccgShops } from './entries/underground-tccg'
import { rockTunnelShops } from './entries/rock-tunnel'
import { lavenderTownShops } from './entries/lavender-town'
import { celadonCityShops } from './entries/celadon-city'
import { celadonGameCornerShops } from './entries/celadon-game-corner'
import { pokemonTowerShops } from './entries/pokemon-tower'
import { saffronCityShops } from './entries/saffron-city'
import { silphCoShops } from './entries/silph-co'
import { cyclingRoadShops } from './entries/cycling-road'
import { fuchsiaCityShops } from './entries/fuchsia-city'
import { safariZoneShops } from './entries/safari-zone'
import { powerPlantShops } from './entries/power-plant'
import { seafoamIslandsShops } from './entries/seafoam-islands'
import { cinnabarIslandShops } from './entries/cinnabar-island'
import { pokemonMansionShops } from './entries/pokemon-mansion'
import { victoryRoadShops } from './entries/victory-road'
import { indigoPlateauShops } from './entries/indigo-plateau'
import { ceruleanCaveShops } from './entries/cerulean-cave'

export * from './types'

export const shops: ShopConfig[] = [
  ...palletTownShops,
  ...viridianCityShops,
  ...viridianForestShops,
  ...pewterCityShops,
  ...mtMoonShops,
  ...ceruleanCityShops,
  ...vermilionCityShops,
  ...ssAnneShops,
  ...diglettsCaveShops,
  ...kantoUndergroundShops,
  ...undergroundTccgShops,
  ...rockTunnelShops,
  ...lavenderTownShops,
  ...celadonCityShops,
  ...celadonGameCornerShops,
  ...pokemonTowerShops,
  ...saffronCityShops,
  ...silphCoShops,
  ...cyclingRoadShops,
  ...fuchsiaCityShops,
  ...safariZoneShops,
  ...powerPlantShops,
  ...seafoamIslandsShops,
  ...cinnabarIslandShops,
  ...pokemonMansionShops,
  ...victoryRoadShops,
  ...indigoPlateauShops,
  ...ceruleanCaveShops,
]
