import { redirect } from 'next/navigation'
import { GameClient } from './game-client'
import { getBattleBetsState } from '@/app/(frontend)/game/games/battle-bets-actions'
import { GameRouteDataBoundary } from '@/components/game/shared/GameRouteDataBoundary'
import type { GameItem } from '@/data/games'
import { getGameRouteData } from '@/utilities/game-route-data'
import { getGameActivityRoute } from '@/utilities/games/activity-domain'
import { type GameState, getGameState } from '../actions'

export const dynamic = 'force-dynamic'

type GameStateWithEncounter = GameState & {
  timeLeft: number
  encounter: GameItem & { isEligibleForReplay: boolean }
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ gameType: string }>
}) {
  const { gameType } = await params
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
        encounter={encounter}
        initialState={gameState}
        state={gameState}
      />
    </GameRouteDataBoundary>
  )
}
