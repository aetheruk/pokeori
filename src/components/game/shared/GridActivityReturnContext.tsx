'use client'

import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { isGridExploreReturnPath } from '@/utilities/games/grid-explore-return'

type GridActivityReturnValue = {
  returnFromActivity: (success: boolean) => void
}

const GridActivityReturnContext =
  createContext<GridActivityReturnValue | null>(null)

export function GridActivityReturnProvider({
  returnTo,
  children,
}: {
  returnTo: string
  children: ReactNode
}) {
  const router = useRouter()
  const safeReturnTo = isGridExploreReturnPath(returnTo) ? returnTo : null
  const value = useMemo<GridActivityReturnValue | null>(
    () =>
      safeReturnTo
        ? {
            returnFromActivity: (success) => {
              const separator = safeReturnTo.includes('?') ? '&' : '?'
              router.replace(
                `${safeReturnTo}${separator}outcome=${success ? 'won' : 'lost'}`,
              )
            },
          }
        : null,
    [router, safeReturnTo],
  )

  if (!value) return children
  return (
    <GridActivityReturnContext.Provider value={value}>
      {children}
    </GridActivityReturnContext.Provider>
  )
}

export function useGridActivityReturn() {
  return useContext(GridActivityReturnContext)
}
