import { VoyageConfig } from './types'
import { palletTownVoyages } from './entries/pallet-town'
import { viridianCityVoyages } from './entries/viridian-city'
import { mtMoonVoyages } from './entries/mt-moon'
import { fuchsiaCityVoyages } from './entries/fuchsia-city'

export * from './types'

export const voyages: VoyageConfig[] = [
  ...palletTownVoyages,
  ...viridianCityVoyages,
  ...mtMoonVoyages,
  ...fuchsiaCityVoyages,
]

export function getVoyage(id: string): VoyageConfig | undefined {
  return voyages.find((v) => v.id === id)
}
