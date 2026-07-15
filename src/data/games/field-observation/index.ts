export * from './types'
import { FieldObservationConfig } from './types'
import { withDefaultFieldObservationRewards } from './rewards'

import { palletTownFieldObservationEntries } from './entries/pallet-town'
import { viridianCityFieldObservationEntries } from './entries/viridian-city'
import { viridianForestFieldObservationEntries } from './entries/viridian-forest'
import { pewterCityFieldObservationEntries } from './entries/pewter-city'
import { mtMoonFieldObservationEntries } from './entries/mt-moon'
import { ceruleanCityFieldObservationEntries } from './entries/cerulean-city'
import { vermilionCityFieldObservationEntries } from './entries/vermilion-city'
import { diglettsCaveFieldObservationEntries } from './entries/digletts-cave'
import { route10FieldObservationEntries } from './entries/route-10'
import { rockTunnelFieldObservationEntries } from './entries/rock-tunnel'
import { lavenderTownFieldObservationEntries } from './entries/lavender-town'
import { celadonCityFieldObservationEntries } from './entries/celadon-city'

export const fieldObservationGames: FieldObservationConfig[] = [
  ...palletTownFieldObservationEntries,
  ...viridianCityFieldObservationEntries,
  ...viridianForestFieldObservationEntries,
  ...pewterCityFieldObservationEntries,
  ...mtMoonFieldObservationEntries,
  ...ceruleanCityFieldObservationEntries,
  ...vermilionCityFieldObservationEntries,
  ...diglettsCaveFieldObservationEntries,
  ...route10FieldObservationEntries,
  ...rockTunnelFieldObservationEntries,
  ...lavenderTownFieldObservationEntries,
  ...celadonCityFieldObservationEntries,
].map(withDefaultFieldObservationRewards)
