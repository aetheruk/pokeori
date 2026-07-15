import { BattleConfig } from '../types'
import { palletTownBattles } from './entries/pallet-town'
import { viridianCityBattles } from './entries/viridian-city'
import { viridianForestBattles } from './entries/viridian-forest'
import { pewterCityBattles } from './entries/pewter-city'
import { mtMoonBattles } from './entries/mt-moon'
import { ceruleanCityBattles } from './entries/cerulean-city'
import { vermilionCityBattles } from './entries/vermilion-city'
import { ssAnneBattles } from './entries/ss-anne'
import { diglettsCaveBattles } from './entries/digletts-cave'
import { route10Battles } from './entries/route-10'
import { kantoUndergroundBattles } from './entries/kanto-underground'
import { undergroundTccgBattles } from './entries/underground-tccg'
import { rockTunnelBattles } from './entries/rock-tunnel'

import { lavenderTownBattles } from './entries/lavender-town'
import { celadonCityBattles } from './entries/celadon-city'
import { celadonGameCornerBattles } from './entries/celadon-game-corner'
import { pokemonTowerBattles } from './entries/pokemon-tower'
import { saffronCityBattles } from './entries/saffron-city'
import { silphCoBattles } from './entries/silph-co'
import { cyclingRoadBattles } from './entries/cycling-road'
import { fuchsiaCityBattles } from './entries/fuchsia-city'
import { safariZoneBattles } from './entries/safari-zone'
import { powerPlantBattles } from './entries/power-plant'
import { seafoamIslandsBattles } from './entries/seafoam-islands'
import { cinnabarIslandBattles } from './entries/cinnabar-island'
import { pokemonMansionBattles } from './entries/pokemon-mansion'
import { victoryRoadBattles } from './entries/victory-road'
import { indigoPlateauBattles } from './entries/indigo-plateau'
import { ceruleanCaveBattles } from './entries/cerulean-cave'
import { pvpBattles } from './entries/pvp'
import { secretBattles } from './entries/secret'
import { specialEventBattles } from './entries/special-events'

export * from '../types'

export const battles: BattleConfig[] = [
  ...palletTownBattles,
  ...viridianCityBattles,
  ...viridianForestBattles,
  ...pewterCityBattles,
  ...mtMoonBattles,
  ...ceruleanCityBattles,
  ...vermilionCityBattles,
  ...ssAnneBattles,
  ...diglettsCaveBattles,
  ...route10Battles,
  ...kantoUndergroundBattles,
  ...undergroundTccgBattles,
  ...rockTunnelBattles,

  ...lavenderTownBattles,
  ...celadonCityBattles,
  ...celadonGameCornerBattles,
  ...pokemonTowerBattles,
  ...saffronCityBattles,
  ...silphCoBattles,
  ...cyclingRoadBattles,
  ...fuchsiaCityBattles,
  ...safariZoneBattles,
  ...powerPlantBattles,
  ...seafoamIslandsBattles,
  ...cinnabarIslandBattles,
  ...pokemonMansionBattles,
  ...victoryRoadBattles,
  ...indigoPlateauBattles,
  ...ceruleanCaveBattles,
  ...pvpBattles,
  ...secretBattles,
  ...specialEventBattles,
]
