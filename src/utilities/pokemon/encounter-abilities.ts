import type { Location } from '@/data/types'

export function canApplyEncounterAbilityOverride(
  location: Pick<Location, 'keyEncounter'>,
): boolean {
  return !location.keyEncounter
}
