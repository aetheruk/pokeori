import { Location } from '../types'
import { palletTownLocations } from './entries/pallet-town'
import { viridianCityLocations } from './entries/viridian-city'

import { viridianForestLocations } from './entries/viridian-forest'
import { pewterCityLocations } from './entries/pewter-city'
import { mtMoonLocations } from './entries/mt-moon'
import { ceruleanCityLocations } from './entries/cerulean-city'
import { vermilionCityLocations } from './entries/vermilion-city'
import { ssAnneLocations } from './entries/ss-anne'
import { diglettsCaveLocations } from './entries/digletts-cave'
import { route10Locations } from './entries/route-10'
import { kantoUndergroundLocations } from './entries/kanto-underground'
import { undergroundTccgLocations } from './entries/underground-tccg'
import { rockTunnelLocations } from './entries/rock-tunnel'

import { lavenderTownLocations } from './entries/lavender-town'
import { celadonCityLocations } from './entries/celadon-city'
import { celadonGameCornerLocations } from './entries/celadon-game-corner'
import { pokemonTowerLocations } from './entries/pokemon-tower'
import { saffronCityLocations } from './entries/saffron-city'
import { silphCoLocations } from './entries/silph-co'
import { cyclingRoadLocations } from './entries/cycling-road'
import { fuchsiaCityLocations } from './entries/fuchsia-city'
import { safariZoneLocations } from './entries/safari-zone'
import { powerPlantLocations } from './entries/power-plant'
import { seafoamIslandsLocations } from './entries/seafoam-islands'
import { cinnabarIslandLocations } from './entries/cinnabar-island'
import { pokemonMansionLocations } from './entries/pokemon-mansion'
import { victoryRoadLocations } from './entries/victory-road'
import { indigoPlateauLocations } from './entries/indigo-plateau'
import { ceruleanCaveLocations } from './entries/cerulean-cave'
import { testLocations } from './entries/test'

export * from '../types'

export const locations: Location[] = [
  ...palletTownLocations,
  ...viridianCityLocations,
  ...viridianForestLocations,
  ...pewterCityLocations,
  ...mtMoonLocations,
  ...ceruleanCityLocations,
  ...vermilionCityLocations,
  ...ssAnneLocations,
  ...diglettsCaveLocations,
  ...route10Locations,
  ...kantoUndergroundLocations,
  ...undergroundTccgLocations,
  ...rockTunnelLocations,
  ...lavenderTownLocations,
  ...celadonCityLocations,
  ...celadonGameCornerLocations,
  ...pokemonTowerLocations,
  ...saffronCityLocations,
  ...silphCoLocations,
  ...cyclingRoadLocations,
  ...fuchsiaCityLocations,
  ...safariZoneLocations,
  ...powerPlantLocations,
  ...seafoamIslandsLocations,
  ...cinnabarIslandLocations,
  ...pokemonMansionLocations,
  ...victoryRoadLocations,
  ...indigoPlateauLocations,
  ...ceruleanCaveLocations,
  ...testLocations,
]
