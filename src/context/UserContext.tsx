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
import useSWR, { useSWRConfig } from 'swr'
import { useInventoryStore } from '@/app/(frontend)/store/inventory-store'

import type { RequirementData } from '@/utilities/requirements'
import { useGameDataScope } from '@/hooks/use-game-data-scope'
import type { GameDataScope } from '@/utilities/game-data-scopes'
import { selectFreshestGameData } from '@/utilities/game-data-snapshot'
import {
  ApiResponseError,
  isAuthenticationError,
} from '@/utilities/auth/session-policy'

interface UserContextType {
  user: User | null
  gameData: RequirementData | null
  setUser: (user: User) => void
  refreshUser: (
    skipRouterRefresh?: boolean,
  ) => Promise<RequirementData | undefined>
  updateUserContext: (partialUser: Partial<User>) => void
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: 'include',
    cache: 'no-store',
  })

  if (!res.ok) {
    const requestId = res.headers.get('x-request-id') || undefined
    throw new ApiResponseError(
      `Game data refresh failed with status ${res.status}`,
      res.status,
      requestId,
    )
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
      shouldRetryOnError: (refreshError) =>
        !isAuthenticationError(refreshError),
      fallbackData:
        initialGameData ||
        (initialUser
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

  const resolvedData = useMemo(
    () => selectFreshestGameData(data, initialGameData),
    [data, initialGameData],
  )

  const user = useMemo(() => {
    if (!resolvedData?.user) return null
    return resolvedData.user
  }, [resolvedData?.user])

  const gameData = useMemo(() => {
    if (!resolvedData) return null
    return {
      ...resolvedData,
      user: user || resolvedData.user,
    }
  }, [resolvedData, user])

  // Sync inventory when user data changes
  useEffect(() => {
    if (!resolvedData) return

    if (Array.isArray(resolvedData.inventory)) {
      setInventory(
        Object.fromEntries(
          resolvedData.inventory.map((item) => [item.itemId, item.quantity]),
        ),
      )
      return
    }
  }, [resolvedData, setInventory])

  // Confirm apparent auth failures before leaving the current game screen. A
  // transient sync or auth-check failure must not look like a logout.
  useEffect(() => {
    if (!error || !isAuthenticationError(error)) return

    let cancelled = false

    const confirmAuthenticationLoss = async () => {
      try {
        const response = await fetch('/api/auth/check', {
          method: 'POST',
          credentials: 'include',
          cache: 'no-store',
        })

        if (cancelled) return

        if (response.ok) {
          void mutate()
          return
        }

        if (response.status !== 401) {
          console.error(
            `Unable to confirm authentication after game sync returned ${error.status}`,
          )
          return
        }

        setInventory({})
        router.replace('/auth')
      } catch (authCheckError) {
        console.error(
          'Unable to confirm authentication after game sync failed',
          authCheckError,
        )
      }
    }

    void confirmAuthenticationLoss()

    return () => {
      cancelled = true
    }
  }, [error, mutate, router, setInventory])

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

  const { mutate: globalMutate } = useSWRConfig()

  const refreshUser = useCallback(
    async (skipRouterRefresh = true) => {
      const refreshedData = await mutate()
      void globalMutate(
        (key) =>
          typeof key === 'string' &&
          key.startsWith('/api/game/sync') &&
          key !== syncUrl,
      )
      if (skipRouterRefresh === false) {
        router.refresh()
      }
      return refreshedData
    },
    [globalMutate, mutate, router, syncUrl],
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
