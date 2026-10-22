'use server'

import { prepareGridAdventureInteraction as prepareInteraction } from '@/app/(frontend)/game/_shared/activity-actions'

/** Ensure a Grid Adventure parent session is isolated before opening an activity. */
export async function prepareGridAdventureInteraction(encounterId: string) {
  return prepareInteraction(encounterId)
}
