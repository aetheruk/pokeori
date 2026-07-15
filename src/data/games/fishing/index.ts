export * from './types'

import type { FishingGameConfig } from './types'

// Import fishing game entries
import { palletTownFishing } from './entries/pallet-town'
import { viridianCityFishing } from './entries/viridian-city'
import { viridianForestFishing } from './entries/viridian-forest'
import { pewterCityFishing } from './entries/pewter-city'
import { mtMoonFishing } from './entries/mt-moon'
import { ceruleanCityFishing } from './entries/cerulean-city'
import { ceruleanCaveFishing } from './entries/cerulean-cave'
import { vermilionCityFishing } from './entries/vermilion-city'
import { ssAnneFishing } from './entries/ss-anne'
import { diglettsCaveFishing } from './entries/digletts-cave'
import { route10Fishing } from './entries/route-10'
import { kantoUndergroundFishing } from './entries/kanto-underground'
import { undergroundTccgFishing } from './entries/underground-tccg'
import { rockTunnelFishing } from './entries/rock-tunnel'
import { lavenderTownFishing } from './entries/lavender-town'
import { celadonCityFishing } from './entries/celadon-city'
import { celadonGameCornerFishing } from './entries/celadon-game-corner'
import { pokemonTowerFishing } from './entries/pokemon-tower'
import { saffronCityFishing } from './entries/saffron-city'
import { silphCoFishing } from './entries/silph-co'
import { cyclingRoadFishing } from './entries/cycling-road'
import { fuchsiaCityFishing } from './entries/fuchsia-city'
import { safariZoneFishing } from './entries/safari-zone'
import { powerPlantFishing } from './entries/power-plant'
import { seafoamIslandsFishing } from './entries/seafoam-islands'
import { cinnabarIslandFishing } from './entries/cinnabar-island'
import { pokemonMansionFishing } from './entries/pokemon-mansion'
import { victoryRoadFishing } from './entries/victory-road'
import { indigoPlateauFishing } from './entries/indigo-plateau'

export const fishingGames: FishingGameConfig[] = [
  ...palletTownFishing,
  ...viridianCityFishing,
  ...viridianForestFishing,
  ...pewterCityFishing,
  ...mtMoonFishing,
  ...ceruleanCityFishing,
  ...ceruleanCaveFishing,
  ...vermilionCityFishing,
  ...ssAnneFishing,
  ...diglettsCaveFishing,
  ...route10Fishing,
  ...kantoUndergroundFishing,
  ...undergroundTccgFishing,
  ...rockTunnelFishing,
  ...lavenderTownFishing,
  ...celadonCityFishing,
  ...celadonGameCornerFishing,
  ...pokemonTowerFishing,
  ...saffronCityFishing,
  ...silphCoFishing,
  ...cyclingRoadFishing,
  ...fuchsiaCityFishing,
  ...safariZoneFishing,
  ...powerPlantFishing,
  ...seafoamIslandsFishing,
  ...cinnabarIslandFishing,
  ...pokemonMansionFishing,
  ...victoryRoadFishing,
  ...indigoPlateauFishing,
]
