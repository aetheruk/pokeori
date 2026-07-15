import { useMemo } from 'react'
import { useUser } from '@/context/UserContext'
import type { RequirementData } from '@/utilities/requirements'
import type { User, Pokemon } from '@/payload-types'

export function useGameUserData(): RequirementData | null {
  const { gameData } = useUser()
  return gameData
}
