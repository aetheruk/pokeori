import { redirect } from 'next/navigation'
import { GameClient } from './game-client'
import { getBattleBetsState } from '@/app/(frontend)/game/games/battle-bets-actions'
import { GameRouteDataBoundary } from '@/components/game/shared/GameRouteDataBoundary'
import { allGames, type GameItem } from '@/data/games'
import { getGameRouteData } from '@/utilities/game-route-data'
import {
  getGameActivityRoute,
  getGameActivityRouteForId,
  getGridActivityRouteForId,
} from '@/utilities/games/activity-domain'
import {
  hasRockPushActivityTarget,
  hasRockPushMinigameTarget,
} from '@/utilities/research/rock-push-verification'
import {
  type GameState,
  getGameState,
  getGridAdventureState,
} from '../actions'
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
  if (
    gameType === 'grid-puzzle' &&
    query.gridAdventure !== '1' &&
    query.gridReturn !== '1' &&
    query.gridMinigame !== '1' &&
    query.gridActivity !== '1'
  ) {
    const gridAdventure = await getGridAdventureState()
    if (gridAdventure?.encounter.gameType === 'grid-puzzle') {
      redirect('/game/games/grid-puzzle?gridAdventure=1')
    }
  }

  if (query.gridMinigame === '1') {
    const [state, parentState, initialGameData] = await Promise.all([
      getGridMinigameState(),
      getGridAdventureState(),
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
          gridMinigame
        />
      </GameRouteDataBoundary>
    )
  }

  if (query.gridAdventure === '1' || query.gridReturn === '1') {
    const [state, initialGameData] = await Promise.all([
      getGridAdventureState(),
      getGameRouteData('inventory'),
    ])
    if (!initialGameData) redirect('/auth')
    if (
      state?.encounter.gameType !== 'grid-puzzle' ||
      state.encounter.settings.variant !== 'rock-push' ||
      (typeof query.gameId === 'string' &&
        query.gameId !== state.encounter.id)
    ) {
      redirect('/game/explore')
    }
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
        />
      </GameRouteDataBoundary>
    )
  }

  if (query.gridActivity === '1') {
    const [parentState, initialGameData, battleBetsState] = await Promise.all([
      getGridAdventureState(),
      getGameRouteData('inventory'),
      gameType === 'battle-bets' ? getBattleBetsState() : Promise.resolve(null),
    ])
    if (!initialGameData) redirect('/auth')
    const parentEncounter = parentState?.encounter
    const requestedTargetId =
      typeof query.gameId === 'string' ? query.gameId : undefined
    const battleBetsTargetId = 'celadon-high-stakes-battle-bets'
    // The child encounter id is resolved from its active session below. Battle Bets
    // has a dedicated session and therefore supplies its stable authored id here.
    const childState =
      gameType === 'battle-bets'
        ? null
        : await getGameState()
    const childId =
      gameType === 'battle-bets'
        ? battleBetsState
          ? battleBetsTargetId
          : undefined
        : childState?.encounter.id
    if (
      parentEncounter?.gameType !== 'grid-puzzle' ||
      parentEncounter.settings.variant !== 'rock-push' ||
      !childId ||
      (requestedTargetId && requestedTargetId !== childId) ||
      !hasRockPushActivityTarget(
        parentEncounter.settings as any,
        'minigame',
        childId,
      )
    ) {
      redirect('/game/explore')
    }
    const returnTo = `/game/games/grid-puzzle?gridReturn=1&gameId=${encodeURIComponent(parentEncounter.id)}`
    if (gameType === 'battle-bets') {
      if (!battleBetsState) redirect('/game/explore')
      const encounter = allGames.find(
        (entry) => entry.id === battleBetsTargetId,
      )
      if (!encounter) redirect('/game/explore')
      return (
        <GameRouteDataBoundary
          scope="inventory"
          initialGameData={initialGameData}
          allowDuringTakeover
        >
          <GameClient
            encounter={encounter}
            initialState={battleBetsState}
            returnTo={returnTo}
          />
        </GameRouteDataBoundary>
      )
    }
    if (!childState) redirect('/game/explore')
    const encounter = childState.encounter as GameStateWithEncounter['encounter']
    if (gameType !== encounter.gameType) {
      redirect(
        getGridActivityRouteForId(encounter.id) ||
          getGameActivityRouteForId(encounter.id) ||
          getGameActivityRoute(encounter.gameType),
      )
    }
    return (
      <GameRouteDataBoundary
        scope="inventory"
        initialGameData={initialGameData}
        allowDuringTakeover
      >
        <GameClient
          key={`${encounter.id}:${childState.startTime}`}
          encounter={encounter}
          initialState={childState}
          state={childState}
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
  const canonicalRoute =
    getGameActivityRouteForId(encounter.id) ||
    getGameActivityRoute(encounter.gameType)
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
