'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import type { ComponentType } from 'react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import type { GameItem, GameType } from '@/data/games'

type GameProps = { encounter: GameItem; initialState?: any; state?: any }

function GameLoading() {
  return <div role="status" className="flex min-h-dvh items-center justify-center gap-3 bg-game-canvas text-game-ink"><LoadingSpinner size="lg" /><span>Preparing game…</span></div>
}

const GAME_COMPONENTS: Partial<Record<GameType, ComponentType<GameProps>>> = {
  silhouette: dynamic(() => import('@/app/(frontend)/game/research/encounter/whos-that-pokemon').then((module) => module.WhosThatPokemonGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  identify: dynamic(() => import('@/app/(frontend)/game/research/encounter/quick-identify').then((module) => module.QuickIdentifyGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  snap: dynamic(() => import('@/app/(frontend)/game/research/encounter/pokemon-snap').then((module) => module.PokemonSnapGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  cry: dynamic(() => import('@/app/(frontend)/game/research/encounter/cry-recognition').then((module) => module.CryRecognitionGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  compare: dynamic(() => import('@/app/(frontend)/game/research/encounter/research-compare').then((module) => module.ResearchCompareGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  'grid-puzzle': dynamic(() => import('@/app/(frontend)/game/research/encounter/grid-puzzle').then((module) => module.GridPuzzleGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  run: dynamic(() => import('@/app/(frontend)/game/research/encounter/run').then((module) => module.RunGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  flap: dynamic(() => import('@/app/(frontend)/game/research/encounter/flap').then((module) => module.FlapGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  surf: dynamic(() => import('@/app/(frontend)/game/research/encounter/surf').then((module) => module.SurfGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  slots: dynamic(() => import('@/app/(frontend)/game/research/encounter/slots').then((module) => module.SlotGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  pachinko: dynamic(() => import('@/app/(frontend)/game/research/encounter/pachinko').then((module) => module.PachinkoGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  'ufo-catcher': dynamic(() => import('@/app/(frontend)/game/research/encounter/ufo-catcher').then((module) => module.UfoCatcherGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  'prize-wheel': dynamic(() => import('@/app/(frontend)/game/research/encounter/prize-wheel').then((module) => module.PrizeWheelGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  fishing: dynamic(() => import('@/app/(frontend)/game/research/encounter/fishing').then((module) => module.FishingGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  match3: dynamic(() => import('@/app/(frontend)/game/research/encounter/match3').then((module) => module.Match3Game), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  spelling: dynamic(() => import('@/app/(frontend)/game/research/encounter/spelling').then((module) => module.SpellingGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  'sliding-puzzle': dynamic(() => import('@/app/(frontend)/game/research/encounter/sliding-puzzle').then((module) => module.SlidingPuzzleGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  rhythm: dynamic(() => import('@/app/(frontend)/game/research/encounter/rhythm').then((module) => module.RhythmGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  mining: dynamic(() => import('@/app/(frontend)/game/research/encounter/mining').then((module) => module.MiningGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  'tcg-inspection': dynamic(() => import('@/app/(frontend)/game/research/encounter/tcg-inspection').then((module) => module.TcgInspectionGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  'tcg-battle': dynamic(() => import('@/app/(frontend)/game/research/encounter/tcg-battle').then((module) => module.TcgBattleGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  'diglett-tunnel-tap':
    dynamic(() => import('@/app/(frontend)/game/research/encounter/diglett-tunnel-tap').then((module) => module.DiglettTunnelTapGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  'magnemite-circuit':
    dynamic(() => import('@/app/(frontend)/game/research/encounter/magnemite-circuit').then((module) => module.MagnemiteCircuitGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  'art-academy': dynamic(() => import('@/app/(frontend)/game/research/encounter/art-academy').then((module) => module.ArtAcademyGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  'procedure-order': dynamic(() => import('@/app/(frontend)/game/research/encounter/procedure-order').then((module) => module.ProcedureOrderGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  'battle-bets': dynamic(() => import('@/app/(frontend)/game/research/encounter/battle-bets').then((module) => module.BattleBetsGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  'brick-breaker': dynamic(() => import('@/app/(frontend)/game/research/encounter/brick-breaker').then((module) => module.BrickBreakerGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
  snake: dynamic(() => import('@/app/(frontend)/game/research/encounter/snake').then((module) => module.SnakeGame), { loading: GameLoading }) as unknown as ComponentType<GameProps>,
}

export function GameClient(props: GameProps) {
  const Component = GAME_COMPONENTS[props.encounter.gameType]
  return Component ? <Component {...props} /> : <Link href="/game/explore">Return to Explore</Link>
}
