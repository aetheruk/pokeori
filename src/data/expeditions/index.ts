import type { ExpeditionConfig } from './types'
import { palletTownExpeditions } from './entries/pallet-town'
import { mtMoonExpeditions } from './entries/mt-moon'
import { viridianForestExpeditions } from './entries/viridian-forest'
import { vermilionCityExpeditions } from './entries/vermilion-city'
import { ssAnneExpeditions } from './entries/ss-anne'
import { route9Expeditions } from './entries/route-9'
import { pokemonTowerExpeditions } from './entries/pokemon-tower'

export * from './types'

export const expeditions: ExpeditionConfig[] = [
  ...palletTownExpeditions,
  ...mtMoonExpeditions,
  ...viridianForestExpeditions,
  ...vermilionCityExpeditions,
  ...ssAnneExpeditions,
  ...route9Expeditions,
  ...pokemonTowerExpeditions,
]

export function getExpedition(id: string): ExpeditionConfig | undefined {
  return expeditions.find((expedition) => expedition.id === id)
}
