import {
  Store,
  Compass,
  Camera,
  Volume2,
  HelpCircle,
  Search,
  BarChart,
  CornerRightDown,
  ChevronsRight,
  Plane,
  Coins,
  CircleDot,
  Disc,
  Fish,
  Gem,
  MapIcon,
  BookA,
  Grid3x3,
  Music,
  Pickaxe,
  ClipboardList,
  MessageCircle,
  Repeat,
  Microscope,
  Swords,
  CreditCard,
  Bomb,
  CircuitBoard,
  MousePointerClick,
  Radar,
  Paintbrush,
} from 'lucide-react'
import { MdCatchingPokemon } from 'react-icons/md'
import type { ExploreItem } from './types'

export function isChronicleExploreItem(item: ExploreItem | null | undefined) {
  return (
    item?.type === 'expedition' &&
    Boolean((item.originalData as any)?.chronicle)
  )
}

export function getExpeditionDisplayName(item: ExploreItem | null | undefined) {
  return isChronicleExploreItem(item) ? 'Chronicle' : 'Expedition'
}

export function getExpeditionDisplayNamePlural(
  item: ExploreItem | null | undefined,
) {
  return isChronicleExploreItem(item) ? 'Chronicles' : 'Expeditions'
}

export const getTypeIcon = (item: ExploreItem) => {
  switch (item.type) {
    case 'vs-seeker':
      return <Swords className="w-4 h-4 text-game-moss-strong" />
    case 'battle':
      return <Swords className="w-4 h-4 text-game-moss-strong" />
    case 'location':
      return <MdCatchingPokemon className="w-4 h-4 text-game-moss-strong" />
    case 'shop':
      return <Store className="w-4 h-4 text-game-moss-strong" />
    case 'voyage':
      return <Compass className="w-4 h-4 text-game-moss-strong" />
    case 'expedition':
      return <MapIcon className="w-4 h-4 text-game-moss-strong" />
    case 'research':
      const gameType = (item.originalData as any).gameType
      if (gameType === 'snap')
        return <Camera className="w-4 h-4 text-game-moss-strong" />
      if (gameType === 'cry')
        return <Volume2 className="w-4 h-4 text-game-moss-strong" />
      if (gameType === 'silhouette')
        return <HelpCircle className="w-4 h-4 text-game-moss-strong" />
      if (gameType === 'identify')
        return <Search className="w-4 h-4 text-game-moss-strong" />
      if (gameType === 'compare')
        return <BarChart className="w-4 h-4 text-game-moss-strong" />
      if (gameType === 'rock-push')
        return <CornerRightDown className="w-4 h-4 text-game-moss-strong" />
      if (gameType === 'run')
        return <ChevronsRight className="w-4 h-4 text-game-moss-strong" />
      if (gameType === 'flap')
        return <Plane className="w-4 h-4 text-game-moss-strong" />
      if (gameType === 'slots')
        return <Coins className="w-4 h-4 text-game-moss-strong" />
      if (gameType === 'pachinko')
        return <CircleDot className="w-4 h-4 text-game-moss-strong" />
      if (gameType === 'prize-wheel')
        return <Disc className="w-4 h-4 text-game-moss-strong" />
      if (gameType === 'fishing')
        return <Fish className="w-4 h-4 text-game-moss-strong" />
      if (gameType === 'match3')
        return <Gem className="w-4 h-4 text-game-moss-strong" />
      if (gameType === 'spelling')
        return <BookA className="w-4 h-4 text-game-moss-strong" />
      if (gameType === 'sliding-puzzle')
        return <Grid3x3 className="w-4 h-4 text-game-moss-strong" />
      if (gameType === 'rhythm')
        return <Music className="w-4 h-4 text-game-moss-strong" />
      if (gameType === 'mining')
        return <Pickaxe className="w-4 h-4 text-game-moss-strong" />
      if (gameType === 'tcg-inspection')
        return <CreditCard className="w-4 h-4 text-game-moss-strong" />
      if (gameType === 'field-observation')
        return <Search className="w-4 h-4 text-game-moss-strong" />
      if (gameType === 'voltorb-grid')
        return <Bomb className="w-4 h-4 text-game-moss-strong" />
      if (gameType === 'diglett-tunnel-tap')
        return <MousePointerClick className="w-4 h-4 text-game-moss-strong" />
      if (gameType === 'magnemite-circuit')
        return <CircuitBoard className="w-4 h-4 text-game-moss-strong" />
      if (gameType === 'rock-tunnel-echo-map')
        return <Radar className="w-4 h-4 text-game-moss-strong" />
      if (gameType === 'art-academy')
        return <Paintbrush className="w-4 h-4 text-game-moss-strong" />
      return <Microscope className="w-4 h-4 text-game-moss-strong" />
    case 'task':
      if ((item.originalData as any).chat) {
        return <MessageCircle className="w-4 h-4 text-game-moss-strong" />
      }
      const isRepeatable = (item.originalData as any).repeatable
      return (
        <div className="flex items-center gap-1">
          <ClipboardList className="w-4 h-4 text-game-moss-strong" />
          {isRepeatable && <Repeat className="w-3 h-3 text-game-moss-strong" />}
        </div>
      )
    default:
      return <CircleDot className="w-4 h-4 text-game-moss-strong" />
  }
}

export const getGameTypeLabel = (item: ExploreItem) => {
  if (item.type === 'location') return 'CATCH'
  if (item.type === 'vs-seeker') return 'TRAINER REMATCH'
  if (item.type === 'battle') {
    return (item.originalData as any).isWildBattle
      ? 'WILD BATTLE'
      : 'TRAINER BATTLE'
  }
  if (item.type === 'task') {
    const task = item.originalData as any
    if (task.chat) return 'CHAT'
    if (task.daily) return 'DAILY TASK'
    if (task.repeatable) return 'REPEATABLE TASK'
    return 'TASK'
  }
  if (item.type === 'expedition') {
    return isChronicleExploreItem(item) ? 'CHRONICLE' : 'EXPEDITION'
  }
  if (item.type !== 'research') return item.type.toUpperCase()

  const gameType = (item.originalData as any).gameType
  switch (gameType) {
    case 'silhouette':
      return "WHO'S THAT?"
    case 'identify':
      return 'IDENTIFY'
    case 'snap':
      return 'SNAP'
    case 'cry':
      return 'CRY'
    case 'compare':
      return 'COMPARE'
    case 'rock-push':
      return 'ROCK PUSH'
    case 'run':
      return 'RUN'
    case 'flap':
      return 'FLAP'
    case 'slots':
      return 'SLOTS'
    case 'pachinko':
      return 'PACHINKO'
    case 'prize-wheel':
      return 'WHEEL'
    case 'fishing':
      return 'FISHING'
    case 'match3':
      return 'MATCH-3'
    case 'spelling':
      return 'SPELLING'
    case 'sliding-puzzle':
      return 'PUZZLE'
    case 'rhythm':
      return 'RHYTHM'
    case 'mining':
      return 'MINING'
    case 'tcg-inspection':
      return 'TCG'
    case 'field-observation':
      return 'STUDY'
    default:
      return 'MINI GAME'
  }
}
