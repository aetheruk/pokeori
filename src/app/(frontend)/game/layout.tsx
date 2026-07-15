import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { GameShell } from '@/components/game/game-shell'

export default function GameLayout({ children }: { children: React.ReactNode }) {
  // Static layout - auth handled client-side in UserContext
  return <GameShell user={null}>{children}</GameShell>
}
