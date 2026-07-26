import { redirect } from 'next/navigation'
import { getFieldResearchState } from '@/app/(frontend)/game/field-research/actions'
import { getGameState } from '@/app/(frontend)/game/games/actions'
import { getGameActivityRoute } from '@/utilities/games/activity-domain'

export const dynamic = 'force-dynamic'

export default async function LegacyResearchEncounterPage() {
  const gameState = await getGameState()
  if (gameState) {
    redirect(getGameActivityRoute(gameState.encounter.gameType))
  }

  const fieldResearchState = await getFieldResearchState()
  if (fieldResearchState) {
    redirect(getGameActivityRoute(fieldResearchState.encounter.gameType))
  }

  redirect('/game/explore')
}
