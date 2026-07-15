import { VoyageConfig } from './types'
import { palletTownVoyages } from './entries/pallet-town'
import { viridianCityVoyages } from './entries/viridian-city'
import { mtMoonVoyages } from './entries/mt-moon'

export * from './types'

export const voyages: VoyageConfig[] = [
  ...palletTownVoyages,
  ...viridianCityVoyages,
  ...mtMoonVoyages,
]

export function getVoyage(id: string): VoyageConfig | undefined {
  return voyages.find((v) => v.id === id)
}
