import type { Location } from '@/data/types'
import { subCategories } from '@/data/sub-region-map'

const ALPHA_ENCOUNTER_MUSIC = '/music/battle.m4a'

export function resolveEncounterMusic(
  location: Pick<Location, 'music' | 'subCategory'>,
  isAlpha: boolean,
): string {
  if (isAlpha) return ALPHA_ENCOUNTER_MUSIC

  return (
    location.music ||
    subCategories[location.subCategory || '']?.music ||
    ALPHA_ENCOUNTER_MUSIC
  )
}
