import { Task } from '../types'
import { palletTownTasks } from './entries/pallet-town'
import { viridianCityTasks } from './entries/viridian-city'

import { viridianForestTasks } from './entries/viridian-forest'
import { pewterCityTasks } from './entries/pewter-city'
import { mtMoonTasks } from './entries/mt-moon'
import { ceruleanCityTasks } from './entries/cerulean-city'
import { vermilionCityTasks } from './entries/vermilion-city'
import { ssAnneTasks } from './entries/ss-anne'
import { diglettsCaveTasks } from './entries/digletts-cave'
import { route10Tasks } from './entries/route-10'
import { kantoUndergroundTasks } from './entries/kanto-underground'
import { undergroundTccgTasks } from './entries/underground-tccg'
import { rockTunnelTasks } from './entries/rock-tunnel'
import { lavenderTownTasks } from './entries/lavender-town'
import { celadonCityTasks } from './entries/celadon-city'
import { celadonGameCornerTasks } from './entries/celadon-game-corner'
import { pokemonTowerTasks } from './entries/pokemon-tower'
import { saffronCityTasks } from './entries/saffron-city'
import { silphCoTasks } from './entries/silph-co'
import { cyclingRoadTasks } from './entries/cycling-road'
import { fuchsiaCityTasks } from './entries/fuchsia-city'
import { safariZoneTasks } from './entries/safari-zone'
import { powerPlantTasks } from './entries/power-plant'
import { seafoamIslandsTasks } from './entries/seafoam-islands'
import { cinnabarIslandTasks } from './entries/cinnabar-island'
import { pokemonMansionTasks } from './entries/pokemon-mansion'
import { victoryRoadTasks } from './entries/victory-road'
import { indigoPlateauTasks } from './entries/indigo-plateau'
import { ceruleanCaveTasks } from './entries/cerulean-cave'
import { specialEventTasks } from './entries/special-events'
import { recipeManualTasks } from './entries/recipe-manuals'
import { testTasks } from './entries/test'

export * from '../types'
export * from '../tasks/types'

export const tasks: Task[] = [
  ...palletTownTasks,
  ...viridianCityTasks,
  ...viridianForestTasks,
  ...pewterCityTasks,
  ...mtMoonTasks,
  ...ceruleanCityTasks,
  ...vermilionCityTasks,
  ...ssAnneTasks,
  ...diglettsCaveTasks,
  ...route10Tasks,
  ...kantoUndergroundTasks,
  ...undergroundTccgTasks,
  ...rockTunnelTasks,
  ...lavenderTownTasks,
  ...celadonCityTasks,
  ...celadonGameCornerTasks,
  ...pokemonTowerTasks,
  ...saffronCityTasks,
  ...silphCoTasks,
  ...cyclingRoadTasks,
  ...fuchsiaCityTasks,
  ...safariZoneTasks,
  ...powerPlantTasks,
  ...seafoamIslandsTasks,
  ...cinnabarIslandTasks,
  ...pokemonMansionTasks,
  ...victoryRoadTasks,
  ...indigoPlateauTasks,
  ...ceruleanCaveTasks,
  ...specialEventTasks,
  ...recipeManualTasks,
  ...testTasks,
]
