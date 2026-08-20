import type { ExpeditionConfig } from './types'
import { palletTownExpeditions } from './entries/pallet-town'
import { mtMoonExpeditions } from './entries/mt-moon'
import { viridianForestExpeditions } from './entries/viridian-forest'
import { vermilionCityExpeditions } from './entries/vermilion-city'
import { ssAnneExpeditions } from './entries/ss-anne'
import { route9Expeditions } from './entries/route-9'
import { pokemonTowerExpeditions } from './entries/pokemon-tower'
import { gymLeaderChronicleExpeditions } from './entries/gym-leader-chronicles'
import { blackoutChronicleExpeditions } from './entries/blackout-chronicles'
import { fuchsiaCityExpeditions } from './entries/fuchsia-city'
import { safariZoneExpeditions } from './entries/safari-zone'
import { legacySafariZoneExpeditions } from './entries/safari-zone-legacy'

export * from './types'

export const expeditions: ExpeditionConfig[] = [
  ...palletTownExpeditions,
  ...mtMoonExpeditions,
  ...viridianForestExpeditions,
  ...vermilionCityExpeditions,
  ...ssAnneExpeditions,
  ...route9Expeditions,
  ...pokemonTowerExpeditions,
  ...gymLeaderChronicleExpeditions,
  ...blackoutChronicleExpeditions,
  ...fuchsiaCityExpeditions,
  ...safariZoneExpeditions,
]

export function getExpedition(id: string): ExpeditionConfig | undefined {
  return (
    expeditions.find((expedition) => expedition.id === id) ||
    legacySafariZoneExpeditions.find((expedition) => expedition.id === id)
  )
}

export { legacySafariZoneExpeditions }
