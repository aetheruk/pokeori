import { redirect } from 'next/navigation'
import { GameShell } from '@/components/game/game-shell'
import {
  getGameRequestContext,
  getSaffronTakeoverForUser,
} from '@/utilities/game-request-context'

export default async function GameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Seed the shell takeover state from the server so a player who reopens the
  // app mid-blackout lands directly on the dark Unown Explore page instead of
  // flashing the light Trainer page before the client sync.
  let initialTakeover = false
  try {
    const { payload, user } = await getGameRequestContext()
    if (user) {
      initialTakeover = await getSaffronTakeoverForUser(payload, user)
    }
  } catch {
    // Fall back to client-side derivation if the server query fails.
  }

  return <GameShell user={null} initialTakeover={initialTakeover}>{children}</GameShell>
}
