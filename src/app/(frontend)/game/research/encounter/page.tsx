import { redirect } from 'next/navigation'
import { WhosThatPokemonGame } from './whos-that-pokemon'
import { QuickIdentifyGame } from './quick-identify'
import { PokemonSnapGame } from './pokemon-snap'
import { CryRecognitionGame } from './cry-recognition'
import {
  getResearchState,
  completeResearchEncounter,
  type ResearchState,
} from '../actions'
import { ResearchCompareGame } from './research-compare'
import { RockPushGame } from './rock-push'
import { RunGame } from './run'
import { FlapGame } from './flap'
import { SlotGame } from './slots'
import { PachinkoGame } from './pachinko'
import { PrizeWheelGame } from './prize-wheel'
import { FishingGame } from './fishing'
import { Match3Game } from './match3'
import { SpellingGame } from './spelling'
import { SlidingPuzzleGame } from './sliding-puzzle'
import { RhythmGame } from './rhythm'
import { MiningGame } from './mining'
import { TcgInspectionGame } from './tcg-inspection'
import { TcgBattleGame } from './tcg-battle'
import { FieldObservationGame } from './field-observation'
import { VoltorbGridGame } from './voltorb-grid'
import { DiglettTunnelTapGame } from './diglett-tunnel-tap'
import { MagnemiteCircuitGame } from './magnemite-circuit'
import { RockTunnelEchoMapGame } from './rock-tunnel-echo-map'
import { ArtAcademyGame } from './art-academy'
import type { ResearchConfig } from '@/data/games'

export const dynamic = 'force-dynamic'

// The encounter type returned by getResearchState() includes isEligibleForReplay
type EncounterWithMeta = ResearchConfig & { isEligibleForReplay: boolean }

// The state type returned by getResearchState()
type ResearchStateWithEncounter = ResearchState & {
  timeLeft: number
  encounter: EncounterWithMeta
}

// Base props that all game components accept - uses ResearchConfig for encounter
interface BaseGameComponentProps {
  encounter: ResearchConfig
  initialState?: ResearchStateWithEncounter
  state?: ResearchStateWithEncounter
}

// Use a more flexible type for GAME_MAP since components have slightly different prop requirements
// Using unknown as intermediate cast to handle different component prop types
const GAME_MAP: Record<string, React.FC<BaseGameComponentProps>> = {
  silhouette:
    WhosThatPokemonGame as unknown as React.FC<BaseGameComponentProps>,
  identify: QuickIdentifyGame as unknown as React.FC<BaseGameComponentProps>,
  snap: PokemonSnapGame as unknown as React.FC<BaseGameComponentProps>,
  cry: CryRecognitionGame as unknown as React.FC<BaseGameComponentProps>,
  compare: ResearchCompareGame as unknown as React.FC<BaseGameComponentProps>,
  'rock-push': RockPushGame as unknown as React.FC<BaseGameComponentProps>,
  run: RunGame as unknown as React.FC<BaseGameComponentProps>,
  flap: FlapGame as unknown as React.FC<BaseGameComponentProps>,
  slots: SlotGame as unknown as React.FC<BaseGameComponentProps>,
  pachinko: PachinkoGame as unknown as React.FC<BaseGameComponentProps>,
  'prize-wheel': PrizeWheelGame as unknown as React.FC<BaseGameComponentProps>,
  fishing: FishingGame as unknown as React.FC<BaseGameComponentProps>,
  match3: Match3Game as unknown as React.FC<BaseGameComponentProps>,
  spelling: SpellingGame as unknown as React.FC<BaseGameComponentProps>,
  'sliding-puzzle':
    SlidingPuzzleGame as unknown as React.FC<BaseGameComponentProps>,
  rhythm: RhythmGame as unknown as React.FC<BaseGameComponentProps>,
  mining: MiningGame as unknown as React.FC<BaseGameComponentProps>,
  'tcg-inspection':
    TcgInspectionGame as unknown as React.FC<BaseGameComponentProps>,
  'tcg-battle': TcgBattleGame as unknown as React.FC<BaseGameComponentProps>,
  'field-observation':
    FieldObservationGame as unknown as React.FC<BaseGameComponentProps>,
  'voltorb-grid':
    VoltorbGridGame as unknown as React.FC<BaseGameComponentProps>,
  'diglett-tunnel-tap':
    DiglettTunnelTapGame as unknown as React.FC<BaseGameComponentProps>,
  'magnemite-circuit':
    MagnemiteCircuitGame as unknown as React.FC<BaseGameComponentProps>,
  'rock-tunnel-echo-map':
    RockTunnelEchoMapGame as unknown as React.FC<BaseGameComponentProps>,
  'art-academy': ArtAcademyGame as unknown as React.FC<BaseGameComponentProps>,
}

export default async function ResearchEncounterPage() {
  const state = await getResearchState()
  if (!state) {
    // No active research encounter or not logged in - redirect back to explore
    redirect('/game/explore')
  }

  const encounter = state.encounter as EncounterWithMeta
  const GameComponent = GAME_MAP[encounter.gameType]

  if (!GameComponent) {
    redirect('/game/explore')
  }

  return (
    <GameComponent encounter={encounter} initialState={state} state={state} />
  )
}
