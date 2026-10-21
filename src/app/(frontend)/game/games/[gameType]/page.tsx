import { redirect } from 'next/navigation'
import { GameClient } from './game-client'
import { getBattleBetsState } from '@/app/(frontend)/game/games/battle-bets-actions'
import { GameRouteDataBoundary } from '@/components/game/shared/GameRouteDataBoundary'
import type { GameItem } from '@/data/games'
import { getGameRouteData } from '@/utilities/game-route-data'
import { getGameActivityRoute } from '@/utilities/games/activity-domain'
import { hasRockPushMinigameTarget } from '@/utilities/research/rock-push-verification'
import { type GameState, getGameState } from '../actions'
import { getGridMinigameState } from '../grid-minigame-actions'

export const dynamic = 'force-dynamic'

type GameStateWithEncounter = GameState & {
  timeLeft: number
  encounter: GameItem & { isEligibleForReplay: boolean }
}

export default async function GamePage({
  params,
  searchParams,
}: {
  params: Promise<{ gameType: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { gameType } = await params
  const query = await searchParams
  if (query.gridMinigame === '1') {
    const [state, parentState, initialGameData] = await Promise.all([
      getGridMinigameState(),
      getGameState(),
      getGameRouteData('inventory'),
    ])
    if (!initialGameData) redirect('/auth')
    if (!state || !parentState || !state.encounter) redirect('/game/explore')
    const parentEncounter = parentState.encounter
    if (
      parentEncounter.gameType !== 'grid-puzzle' ||
      parentEncounter.settings.variant !== 'rock-push' ||
      !hasRockPushMinigameTarget(
        parentEncounter.settings as any,
        state.encounter.id,
      )
    ) {
      redirect('/game/explore')
    }
    if (gameType !== 'underground-mining') {
      redirect('/game/games/underground-mining?gridMinigame=1')
    }
    const returnTo = `/game/games/grid-puzzle?gridReturn=1&gameId=${encodeURIComponent(parentEncounter.id)}`
    return (
      <GameRouteDataBoundary
        scope="inventory"
        initialGameData={initialGameData}
        allowDuringTakeover
      >
        <GameClient
          encounter={state.encounter}
          initialState={state}
          state={state}
          returnTo={returnTo}
        />
      </GameRouteDataBoundary>
    )
  }
  if (gameType === 'battle-bets') {
    const [initialGameData, battleBetsState] = await Promise.all([
      getGameRouteData('inventory'),
      getBattleBetsState(),
    ])
    if (!initialGameData) redirect('/auth')
    const encounter = (await import('@/data/games')).allGames.find(
      (entry) => entry.gameType === 'battle-bets',
    )
    if (!encounter || !battleBetsState) redirect('/game/explore')
    return (
      <GameRouteDataBoundary
        scope="inventory"
        initialGameData={initialGameData}
        allowDuringTakeover
      >
        <GameClient encounter={encounter} initialState={battleBetsState} />
      </GameRouteDataBoundary>
    )
  }

  const [state, initialGameData] = await Promise.all([
    getGameState(),
    getGameRouteData('inventory'),
  ])
  if (!initialGameData) redirect('/auth')
  if (!state) redirect('/game/explore')
  const gameState = state as GameStateWithEncounter
  const encounter = gameState.encounter as GameStateWithEncounter['encounter']
  const canonicalRoute = getGameActivityRoute(encounter.gameType)
  if (gameType !== encounter.gameType) redirect(canonicalRoute)


  return (
    <GameRouteDataBoundary
      scope="inventory"
      initialGameData={initialGameData}
      allowDuringTakeover
    >
      <GameClient
        key={`${encounter.id}:${gameState.startTime}`}
        encounter={encounter}
        initialState={gameState}
        state={gameState}
      />
    </GameRouteDataBoundary>
  )
}
