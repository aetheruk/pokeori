import type { EncounterState } from './types'

export function getEncounterItemResultKey({
  userId,
  state,
  itemId,
}: {
  userId: string
  state: Pick<EncounterState, 'locationId' | 'startTime' | 'itemsUsed'>
  itemId: string
}) {
  const useIndex = state.itemsUsed?.length || 0
  return `encounter:item:result:${userId}:${state.locationId}:${state.startTime}:${itemId}:${useIndex}`
}
