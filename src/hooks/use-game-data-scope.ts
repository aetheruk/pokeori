'use client'

import { usePathname } from 'next/navigation'
import {
  getGameDataScope,
  type GameDataScope,
} from '@/utilities/game-data-scopes'

export function useGameDataScope(): GameDataScope {
  return getGameDataScope(usePathname())
}
