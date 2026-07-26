import { redirect } from 'next/navigation'
import { UserProvider } from '@/context/UserContext'
import { getGameRouteData } from '@/utilities/game-route-data'
import type { GameDataScope } from '@/utilities/game-data-scopes'
import type { RequirementData } from '@/utilities/requirements'

export async function GameRouteDataBoundary({
  scope,
  children,
  initialGameData: suppliedGameData,
}: {
  scope: GameDataScope
  children: React.ReactNode
  initialGameData?: RequirementData | null
}) {
  const initialGameData = suppliedGameData || await getGameRouteData(scope)
  if (!initialGameData) redirect('/auth')

  return (
    <UserProvider initialGameData={initialGameData} scopeOverride={scope}>
      {children}
    </UserProvider>
  )
}
