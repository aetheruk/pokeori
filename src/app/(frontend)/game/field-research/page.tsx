import { redirect } from 'next/navigation'
import { FieldObservationGame } from '@/app/(frontend)/game/research/encounter/field-observation'
import { getFieldResearchState, type FieldResearchState } from './actions'
import type { GameItem } from '@/data/games'

export const dynamic = 'force-dynamic'

type FieldResearchStateWithEncounter = FieldResearchState & {
  timeLeft: number
  encounter: GameItem & { isEligibleForReplay: boolean }
}

export default async function FieldResearchPage() {
  const state = await getFieldResearchState()
  if (state?.encounter.gameType !== 'field-observation') {
    redirect('/game/explore')
  }

  return (
    <FieldObservationGame
      encounter={state.encounter}
      initialState={state as FieldResearchStateWithEncounter}
    />
  )
}
