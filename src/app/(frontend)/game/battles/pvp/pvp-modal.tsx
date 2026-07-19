'use client'

import { Check, Copy, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  createFriendlyLobby,
  getLobbyStatus,
  joinFriendlyLobby,
} from './actions'

interface PvpModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  configId: string
  userId: string
}

export function PvpModal({
  open,
  onOpenChange,
  configId,
  userId,
}: PvpModalProps) {
  const router = useRouter()
  const [mode, setMode] = useState<'menu' | 'host' | 'join'>('menu')
  const [loading, setLoading] = useState(false)

  // Host State
  const [lobbyCode, setLobbyCode] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // Join State
  const [joinCode, setJoinCode] = useState('')

  // Polling for Host
  useEffect(() => {
    if (mode === 'host' && lobbyCode) {
      const interval = setInterval(async () => {
        try {
          const status = await getLobbyStatus(lobbyCode)
          if (
            status &&
            (status.status === 'starting' || status.status === 'active')
          ) {
            toast.success('Player joined! Starting...')
            router.push('/game/battles/encounter')
          }
        } catch (e) {}
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [mode, lobbyCode, router])

  const handleCreate = async () => {
    setLoading(true)
    try {
      const result = await createFriendlyLobby(configId, userId)
      if (result.success && result.code) {
        setLobbyCode(result.code)
        setMode('host')
        // Start polling for join?
        // Or simple "Start Battle" button that checks status?
        // Prompt says: "wait for a friend to join."
        // We need to poll.
      } else {
        toast.error(result.error || 'Failed to create lobby')
      }
    } catch (e) {
      toast.error('Error creating lobby')
    } finally {
      setLoading(false)
    }
  }

  const handleJoin = async () => {
    if (joinCode.length !== 6) {
      toast.error('Code must be 6 digits')
      return
    }
    setLoading(true)
    try {
      const result = await joinFriendlyLobby(joinCode, userId)
      if (result.success && result.battleId) {
        toast.success('Joined! Starting battle...')
        router.push('/game/battles/encounter')
      } else {
        toast.error(result.error || 'Failed to join lobby')
      }
    } catch (e) {
      toast.error('Error joining lobby')
    } finally {
      setLoading(false)
    }
  }

  // Poll for host status
  // In a real app we'd use polling interval or websockets.
  // For MVP: Simple "Refetch" or polling hook.
  // We can't import `getLobbyStatus` directly here if it's server-side only?
  // `pvp-logic.ts` imports `redis` which is server-side.
  // So we need a Server Action to poll.
  // `pvp-logic.ts` is in `utilities`. Functions starting with `async` can be actions if 'use server' is at top of file?
  // `pvp-logic.ts` does NOT have 'use server'.
  // We need to assume `pvp-logic` functions are server-side and import them.
  // BUT `pvp-logic.ts` seems designed as utility.
  // We should create a server action file `src/app/(frontend)/game/battles/pvp/actions.ts` exposing these.

  const copyCode = () => {
    if (lobbyCode) {
      navigator.clipboard.writeText(lobbyCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="game-paper-background border-game-border bg-game-surface text-game-ink sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Friendly Battle</DialogTitle>
          <DialogDescription>
            Create a lobby or join a friend's lobby code.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {mode === 'menu' && (
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="game-focus-ring flex h-24 flex-col gap-2 border-game-moss/45 bg-game-moss/10 text-game-ink hover:border-game-moss hover:bg-game-moss/15"
                onClick={handleCreate}
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  'Create Lobby'
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="game-focus-ring flex h-24 flex-col gap-2 border-game-border bg-game-surface-raised text-game-ink hover:border-game-clay/45 hover:bg-game-clay/10"
                onClick={() => setMode('join')}
              >
                Join Lobby
              </Button>
            </div>
          )}

          {mode === 'host' && (
            <div className="space-y-4 text-center">
              <div className="text-sm text-game-muted">
                Share this code with your friend:
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="font-mono text-4xl font-bold tracking-wider text-game-clay-strong">
                  {lobbyCode}
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={copyCode}
                  aria-label="Copy lobby code"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-game-moss" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-game-muted">
                <Loader2 className="w-3 h-3 animate-spin" />
                Waiting for player to join...
              </div>
            </div>
          )}

          {mode === 'join' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Lobby Code</Label>
                <Input
                  placeholder="000000"
                  className="border-game-border bg-game-surface-raised text-center font-mono text-lg tracking-widest text-game-ink uppercase"
                  maxLength={6}
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                />
              </div>
              <Button
                type="button"
                className="game-accent-button w-full bg-game-clay hover:bg-game-clay/90"
                onClick={handleJoin}
                disabled={loading || joinCode.length < 6}
                aria-busy={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin mr-2" />
                ) : (
                  'Join Battle'
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setMode('menu')}
              >
                Back
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
