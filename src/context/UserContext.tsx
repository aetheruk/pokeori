'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import type { User } from '@/payload-types'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { useInventoryStore } from '@/app/(frontend)/store/inventory-store'

import type { RequirementData } from '@/utilities/requirements'
import { useGameDataScope } from '@/hooks/use-game-data-scope'
import type { GameDataScope } from '@/utilities/game-data-scopes'

interface UserContextType {
  user: User | null
  gameData: RequirementData | null
  setUser: (user: User) => void
  refreshUser: (skipRouterRefresh?: boolean) => void
  updateUserContext: (partialUser: Partial<User>) => void
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Unauthorized')
    }
    throw new Error('Failed to fetch')
  }
  return res.json()
}

export function UserProvider({
  children,
  initialUser,
  initialGameData,
  scopeOverride,
}: {
  children: React.ReactNode
  initialUser?: User | null
  initialGameData?: RequirementData | null
  scopeOverride?: GameDataScope
}) {
  const router = useRouter()
  const routeScope = useGameDataScope()
  const scope = scopeOverride || routeScope
  const setInventory = useInventoryStore((state) => state.setInventory)
  const syncUrl = `/api/game/sync?scope=${scope}`

  // Use SWR for data fetching with automatic revalidation
  const { data, error, isLoading, mutate } = useSWR<RequirementData>(
    syncUrl,
    fetcher,
    {
      refreshInterval: 5 * 60 * 1000, // Revalidate every 5 minutes
      dedupingInterval: 5 * 1000,
      revalidateOnFocus: true,
      revalidateIfStale: true,
      fallbackData: initialGameData || (initialUser
        ? ({
            user: initialUser,
            pokemon: [],
            tasks: [],
            locations: [],
            expeditions: [],
            allTcg: {},
            taskSummary: { completed: 0, total: 0, byType: {} },
            requirements: { skills: {}, currencies: {}, pokedex: {} },
          } as unknown as RequirementData)
        : undefined),
      revalidateOnMount: initialGameData ? false : undefined,
    },
  )

  const user = useMemo(() => {
    if (!data?.user) return null
    return data.user
  }, [data?.user])

  const gameData = useMemo(() => {
    if (!data) return null
    return {
      ...data,
      user: user || data.user,
    }
  }, [data, user])

  // Sync inventory when user data changes
  useEffect(() => {
    if (!data) return

    if (Array.isArray(data.inventory)) {
      setInventory(
        Object.fromEntries(data.inventory.map((item) => [item.itemId, item.quantity])),
      )
      return
    }

  }, [data, setInventory])

  // Handle auth errors
  useEffect(() => {
    if (error) {
      setInventory({})
      router.push('/auth')
    }
  }, [error, router, setInventory])

  const setUser = useCallback(
    (newUser: User) => {
      mutate((prev) => (prev ? { ...prev, user: newUser } : undefined), false)
    },
    [mutate],
  )

  const updateUserContext = useCallback(
    (partialUser: Partial<User>) => {
      mutate((prev) => {
        if (!prev?.user) return prev
        return { ...prev, user: { ...prev.user, ...partialUser } }
      }, false)
    },
    [mutate],
  )

  const refreshUser = useCallback(
    (skipRouterRefresh = true) => {
      void mutate()
      if (skipRouterRefresh === false) {
        router.refresh()
      }
    },
    [mutate, router],
  )

  const value = useMemo(
    () => ({
      user,
      gameData,
      setUser,
      refreshUser,
      updateUserContext,
      isLoading,
    }),
    [user, gameData, setUser, refreshUser, updateUserContext, isLoading],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
