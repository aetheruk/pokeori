'use client'

import { Check, Copy, Loader2, Swords, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
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
  cancelTcgPvpMatchmaking,
  createTcgPvpLobby,
  getTcgPvpMatchmakingStatus,
  joinTcgPvpLobby,
  joinTcgPvpQuickMatch,
} from './tcg-battle'

type TcgPvpModalMode = 'menu' | 'host' | 'join' | 'queue'

interface TcgPvpModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  encounterId: string
}

export function TcgPvpModal({
  open,
  onOpenChange,
  encounterId,
}: TcgPvpModalProps) {
  const router = useRouter()
  const [mode, setMode] = useState<TcgPvpModalMode>('menu')
  const [loading, setLoading] = useState(false)
  const [lobbyCode, setLobbyCode] = useState('')
  const [joinCode, setJoinCode] = useState('')
  const [copied, setCopied] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const navigatingRef = useRef(false)

  const enterBattle = useCallback(() => {
    if (navigatingRef.current) return
    navigatingRef.current = true
    toast.success('Opponent found. Preparing the table…')
    router.push('/game/games/tcg-battle')
  }, [router])

  useEffect(() => {
    if (!open || (mode !== 'host' && mode !== 'queue')) return
    let cancelled = false
    const poll = async () => {
      const result = await getTcgPvpMatchmakingStatus(encounterId)
      if (cancelled || !result.success) return
      if (
        result.status === 'matched' ||
        result.status === 'battle' ||
        result.status === 'finished'
      ) {
        enterBattle()
      }
    }
    const interval = window.setInterval(() => void poll(), 1500)
    void poll()
    return () => {
      cancelled = true
      window.clearInterval(interval)
    }
  }, [encounterId, enterBattle, mode, open])

  useEffect(() => {
    if (!open || mode !== 'queue') return
    const timer = window.setInterval(
      () => setElapsed((value) => value + 1),
      1000,
    )
    return () => window.clearInterval(timer)
  }, [mode, open])

  useEffect(() => {
    if (open) return
    setMode('menu')
    setLoading(false)
    setLobbyCode('')
    setJoinCode('')
    setElapsed(0)
    navigatingRef.current = false
  }, [open])

  const closeMatchmaking = async () => {
    if (!navigatingRef.current) {
      await cancelTcgPvpMatchmaking(encounterId)
    }
    onOpenChange(false)
  }

  const createLobby = async () => {
    setLoading(true)
    const result = await createTcgPvpLobby(encounterId)
    setLoading(false)
    if (!result.success) {
      toast.error(result.error)
      return
    }
    if (result.matchId) {
      enterBattle()
      return
    }
    if (result.code) {
      setLobbyCode(result.code)
      setMode('host')
    }
  }

  const joinLobby = async () => {
    if (!/^\d{6}$/.test(joinCode)) {
      toast.error('Enter a six-digit lobby code.')
      return
    }
    setLoading(true)
    const result = await joinTcgPvpLobby(encounterId, joinCode)
    setLoading(false)
    if (!result.success) {
      toast.error(result.error)
      return
    }
    enterBattle()
  }

  const joinQueue = async () => {
    setLoading(true)
    const result = await joinTcgPvpQuickMatch(encounterId)
    setLoading(false)
    if (!result.success) {
      toast.error(result.error)
      return
    }
    if (result.status === 'matched') {
      enterBattle()
      return
    }
    setElapsed(0)
    setMode('queue')
  }

  const copyCode = async () => {
    if (!lobbyCode) return
    await navigator.clipboard.writeText(lobbyCode)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          void closeMatchmaking()
          return
        }
        onOpenChange(true)
      }}
    >
      <DialogContent className="game-paper-background border-game-border bg-game-surface text-game-ink sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            Underground TCG PVP
          </DialogTitle>
          <DialogDescription>
            Base cards · Champions deck · no entry stake
          </DialogDescription>
        </DialogHeader>

        {mode === 'menu' && (
          <div className="grid gap-3 py-3 sm:grid-cols-2">
            <Button
              type="button"
              className="game-focus-ring h-20 justify-start rounded-lg bg-game-clay px-4 text-left text-game-cream hover:bg-game-clay/90 sm:col-span-2"
              disabled={loading}
              onClick={() => void joinQueue()}
            >
              {loading ? <Loader2 className="animate-spin" /> : <Swords />}
              <span>
                <span className="block font-semibold">Quick Match</span>
                <span className="block text-xs font-normal opacity-85">
                  Find another eligible collector
                </span>
              </span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="game-focus-ring h-20 justify-start rounded-lg border-game-moss/45 bg-game-moss/10 px-4 text-left text-game-ink hover:bg-game-moss/15"
              disabled={loading}
              onClick={() => void createLobby()}
            >
              <Users />
              <span>
                <span className="block font-semibold">Create lobby</span>
                <span className="block text-xs font-normal text-game-muted">
                  Share a private code
                </span>
              </span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="game-focus-ring h-20 justify-start rounded-lg border-game-border bg-game-surface-raised px-4 text-left text-game-ink hover:border-game-clay/45 hover:bg-game-clay/10"
              disabled={loading}
              onClick={() => setMode('join')}
            >
              <Users />
              <span>
                <span className="block font-semibold">Join lobby</span>
                <span className="block text-xs font-normal text-game-muted">
                  Enter a friend’s code
                </span>
              </span>
            </Button>
          </div>
        )}

        {mode === 'host' && (
          <div className="space-y-5 py-5 text-center">
            <p className="text-sm text-game-muted">
              Share this code. Your deck remains private while you wait.
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono text-4xl font-bold tracking-[0.16em] text-game-clay-strong">
                {lobbyCode}
              </span>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                aria-label="Copy lobby code"
                onClick={() => void copyCode()}
              >
                {copied ? <Check className="text-game-moss" /> : <Copy />}
              </Button>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-game-muted">
              <Loader2 className="h-4 w-4 animate-spin" />
              Waiting for another collector…
            </div>
            <Button
              type="button"
              variant="ghost"
              onClick={() => void closeMatchmaking()}
            >
              Cancel lobby
            </Button>
          </div>
        )}

        {mode === 'join' && (
          <div className="space-y-4 py-3">
            <div className="space-y-2">
              <Label htmlFor="tcg-pvp-code">Lobby code</Label>
              <Input
                id="tcg-pvp-code"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="000000"
                value={joinCode}
                className="h-12 border-game-border bg-game-surface-raised text-center font-mono text-xl tracking-[0.2em]"
                onChange={(event) =>
                  setJoinCode(event.target.value.replace(/\D/g, '').slice(0, 6))
                }
              />
            </div>
            <Button
              type="button"
              className="game-accent-button h-11 w-full bg-game-clay hover:bg-game-clay/90"
              disabled={loading || joinCode.length !== 6}
              onClick={() => void joinLobby()}
            >
              {loading && <Loader2 className="animate-spin" />}
              Join battle
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

        {mode === 'queue' && (
          <div className="space-y-4 py-7 text-center">
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-game-ochre" />
            <div>
              <p className="font-display text-xl font-semibold">
                Finding a collector
              </p>
              <p className="mt-1 font-mono text-lg text-game-muted">
                {Math.floor(elapsed / 60)}:
                {String(elapsed % 60).padStart(2, '0')}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              onClick={() => void closeMatchmaking()}
            >
              Leave queue
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
