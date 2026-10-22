import { redirect } from 'next/navigation'
import { getGridAdventureState } from '@/app/(frontend)/game/games/actions'
import { FieldObservationGame } from '@/app/(frontend)/game/research/encounter/field-observation'
import { GridActivityReturnProvider } from '@/components/game/shared/GridActivityReturnContext'
import { getFieldResearchState, type FieldResearchState } from './actions'
import type { GameItem } from '@/data/games'
import { hasRockPushActivityTarget } from '@/utilities/research/rock-push-verification'

export const dynamic = 'force-dynamic'

type FieldResearchStateWithEncounter = FieldResearchState & {
  timeLeft: number
  encounter: GameItem & { isEligibleForReplay: boolean }
}

export default async function FieldResearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const query = await searchParams
  const isGridActivity = query.gridActivity === '1'
  const [state, parentState] = await Promise.all([
    getFieldResearchState(),
    isGridActivity ? getGridAdventureState() : Promise.resolve(null),
  ])
  if (state?.encounter.gameType !== 'field-observation') {
    redirect('/game/explore')
  }

  if (isGridActivity) {
    const parentEncounter = parentState?.encounter
    if (
      parentEncounter?.gameType !== 'grid-puzzle' ||
      parentEncounter.settings.variant !== 'rock-push' ||
      !hasRockPushActivityTarget(
        parentEncounter.settings as any,
        'field-research',
        state.encounter.id,
      ) ||
      (typeof query.gameId === 'string' && query.gameId !== state.encounter.id)
    ) {
      redirect('/game/explore')
    }
  }

  const returnTo = isGridActivity
    ? `/game/games/grid-puzzle?gridReturn=1&gameId=${encodeURIComponent(parentState!.encounter.id)}`
    : undefined

  const game = (
    <FieldObservationGame
      key={state.startTime}
      encounter={state.encounter}
      initialState={state as FieldResearchStateWithEncounter}
    />
  )

  return returnTo ? (
    <GridActivityReturnProvider returnTo={returnTo}>
      {game}
    </GridActivityReturnProvider>
  ) : (
    game
  )
}
