import { redirect } from 'next/navigation'
import type { ComponentType } from 'react'
import { getBattleBetsState } from '@/app/(frontend)/game/games/battle-bets-actions'
import { ArtAcademyGame } from '@/app/(frontend)/game/research/encounter/art-academy'
import { BattleBetsGame } from '@/app/(frontend)/game/research/encounter/battle-bets'
import { BrickBreakerGame } from '@/app/(frontend)/game/research/encounter/brick-breaker'
import { CryRecognitionGame } from '@/app/(frontend)/game/research/encounter/cry-recognition'
import { DiglettTunnelTapGame } from '@/app/(frontend)/game/research/encounter/diglett-tunnel-tap'
import { FishingGame } from '@/app/(frontend)/game/research/encounter/fishing'
import { FlapGame } from '@/app/(frontend)/game/research/encounter/flap'
import { MagnemiteCircuitGame } from '@/app/(frontend)/game/research/encounter/magnemite-circuit'
import { Match3Game } from '@/app/(frontend)/game/research/encounter/match3'
import { MiningGame } from '@/app/(frontend)/game/research/encounter/mining'
import { PachinkoGame } from '@/app/(frontend)/game/research/encounter/pachinko'
import { PokemonSnapGame } from '@/app/(frontend)/game/research/encounter/pokemon-snap'
import { PrizeWheelGame } from '@/app/(frontend)/game/research/encounter/prize-wheel'
import { ProcedureOrderGame } from '@/app/(frontend)/game/research/encounter/procedure-order'
import { QuickIdentifyGame } from '@/app/(frontend)/game/research/encounter/quick-identify'
import { ResearchCompareGame } from '@/app/(frontend)/game/research/encounter/research-compare'
import { RhythmGame } from '@/app/(frontend)/game/research/encounter/rhythm'
import { GridPuzzleGame } from '@/app/(frontend)/game/research/encounter/grid-puzzle'
import { RunGame } from '@/app/(frontend)/game/research/encounter/run'
import { SurfGame } from '@/app/(frontend)/game/research/encounter/surf'
import { SlidingPuzzleGame } from '@/app/(frontend)/game/research/encounter/sliding-puzzle'
import { SlotGame } from '@/app/(frontend)/game/research/encounter/slots'
import { SnakeGame } from '@/app/(frontend)/game/research/encounter/snake'
import { SpellingGame } from '@/app/(frontend)/game/research/encounter/spelling'
import { TcgBattleGame } from '@/app/(frontend)/game/research/encounter/tcg-battle'
import { TcgInspectionGame } from '@/app/(frontend)/game/research/encounter/tcg-inspection'
import { UfoCatcherGame } from '@/app/(frontend)/game/research/encounter/ufo-catcher'
import { WhosThatPokemonGame } from '@/app/(frontend)/game/research/encounter/whos-that-pokemon'
import { GameRouteDataBoundary } from '@/components/game/shared/GameRouteDataBoundary'
import type { GameItem, GameType } from '@/data/games'
import { getGameRouteData } from '@/utilities/game-route-data'
import { getGameActivityRoute } from '@/utilities/games/activity-domain'
import { type GameState, getGameState } from '../actions'

export const dynamic = 'force-dynamic'

type GameStateWithEncounter = GameState & {
  timeLeft: number
  encounter: GameItem & { isEligibleForReplay: boolean }
}

type GameProps = {
  encounter: GameItem
  initialState?: GameStateWithEncounter
  state?: GameStateWithEncounter
}

const GAME_COMPONENTS: Partial<Record<GameType, ComponentType<GameProps>>> = {
  silhouette: WhosThatPokemonGame as unknown as ComponentType<GameProps>,
  identify: QuickIdentifyGame as unknown as ComponentType<GameProps>,
  snap: PokemonSnapGame as unknown as ComponentType<GameProps>,
  cry: CryRecognitionGame as unknown as ComponentType<GameProps>,
  compare: ResearchCompareGame as unknown as ComponentType<GameProps>,
  'grid-puzzle': GridPuzzleGame as unknown as ComponentType<GameProps>,
  run: RunGame as unknown as ComponentType<GameProps>,
  flap: FlapGame as unknown as ComponentType<GameProps>,
  surf: SurfGame as unknown as ComponentType<GameProps>,
  slots: SlotGame as unknown as ComponentType<GameProps>,
  pachinko: PachinkoGame as unknown as ComponentType<GameProps>,
  'ufo-catcher': UfoCatcherGame as unknown as ComponentType<GameProps>,
  'prize-wheel': PrizeWheelGame as unknown as ComponentType<GameProps>,
  fishing: FishingGame as unknown as ComponentType<GameProps>,
  match3: Match3Game as unknown as ComponentType<GameProps>,
  spelling: SpellingGame as unknown as ComponentType<GameProps>,
  'sliding-puzzle': SlidingPuzzleGame as unknown as ComponentType<GameProps>,
  rhythm: RhythmGame as unknown as ComponentType<GameProps>,
  mining: MiningGame as unknown as ComponentType<GameProps>,
  'tcg-inspection': TcgInspectionGame as unknown as ComponentType<GameProps>,
  'tcg-battle': TcgBattleGame as unknown as ComponentType<GameProps>,
  'diglett-tunnel-tap':
    DiglettTunnelTapGame as unknown as ComponentType<GameProps>,
  'magnemite-circuit':
    MagnemiteCircuitGame as unknown as ComponentType<GameProps>,
  'art-academy': ArtAcademyGame as unknown as ComponentType<GameProps>,
  'procedure-order': ProcedureOrderGame as unknown as ComponentType<GameProps>,
  'battle-bets': BattleBetsGame as unknown as ComponentType<GameProps>,
  'brick-breaker': BrickBreakerGame as unknown as ComponentType<GameProps>,
  snake: SnakeGame as unknown as ComponentType<GameProps>,
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
        <BattleBetsGame encounter={encounter} initialState={battleBetsState} />
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

  const GameComponent = GAME_COMPONENTS[encounter.gameType]
  if (!GameComponent) redirect('/game/explore')

  return (
    <GameRouteDataBoundary
      scope="inventory"
      initialGameData={initialGameData}
      allowDuringTakeover
    >
      <GameComponent
        encounter={encounter}
        initialState={gameState}
        state={gameState}
      />
    </GameRouteDataBoundary>
  )
}
