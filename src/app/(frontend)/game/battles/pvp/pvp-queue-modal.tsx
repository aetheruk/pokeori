'use client'

import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { checkPvpStatus, joinRankedQueue, leaveRankedQueue } from './actions'

interface PvpQueueModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  configId: string
  userId: string
  actions?: { join: typeof joinRankedQueue; leave: typeof leaveRankedQueue; check: typeof checkPvpStatus }
}

const queueActions = { join: joinRankedQueue, leave: leaveRankedQueue, check: checkPvpStatus }

export function PvpQueueModal({
  open,
  onOpenChange,
  configId,
  userId,
  actions = queueActions,
}: PvpQueueModalProps) {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'queueing' | 'matched'>('idle')
  const [elapsed, setElapsed] = useState(0)

  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)
  const [cancelling, setCancelling] = useState(false)
  const joinRequest = useRef<Promise<unknown> | null>(null)
  const cancelled = useRef(false)

  useEffect(() => {
    if (!open) return
    let disposed = false
    let timer: ReturnType<typeof setTimeout> | undefined
    cancelled.current = false
    setError(null)
    setStatus('queueing')
    setElapsed(0)
    const matched = () => {
      if (disposed || cancelled.current) return
      setStatus('matched')
      router.push('/game/battles/encounter')
    }
    const poll = async () => {
      if (disposed || cancelled.current) return
      try {
        const result = await actions.check(userId)
        if (disposed || cancelled.current) return
        if (result.status === 'matched') { matched(); return }
        setError(null)
      } catch {
        if (!disposed) setError('Connection interrupted. Checking again shortly…')
      }
      if (!disposed && !cancelled.current) timer = setTimeout(poll, 3000)
    }
    const join = async () => {
      try {
        const result = await actions.join(configId, userId)
        if (disposed || cancelled.current) return
        if (!result.success) {
          setStatus('idle')
          setError('Unable to join the queue. Please retry.')
          return
        }
        if (result.status === 'matched') matched()
        else timer = setTimeout(poll, 2000)
      } catch {
        if (!disposed && !cancelled.current) {
          setStatus('idle')
          setError('Unable to confirm your queue entry. Retry or cancel to check it.')
        }
      }
    }
    joinRequest.current = join()
    return () => { disposed = true; clearTimeout(timer) }
  }, [open, attempt, configId, userId, router, actions])

  useEffect(() => {
    if (!open || status !== 'queueing') return
    const timer = setInterval(() => setElapsed((value) => value + 1), 1000)
    return () => clearInterval(timer)
  }, [open, status])

  const closeQueue = async () => {
    if (cancelling) return
    cancelled.current = true
    setCancelling(true)
    try {
      // A pending join must finish before cancellation, or it could rejoin after leaving.
      await joinRequest.current
      await actions.leave(configId, userId)
      setStatus('idle')
      onOpenChange(false)
    } catch {
      setError('Cancellation could not be confirmed. Please retry Cancel.')
    } finally {
      setCancelling(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        // Cannot close if matched?
        if (!val && status === 'matched') return
        if (!val) {
          void closeQueue()
          return
        }
        onOpenChange(val)
      }}
    >
      <DialogContent className="game-paper-background border-game-border bg-game-surface text-game-ink sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Ranked Queue</DialogTitle>
          <DialogDescription>
            Looking for a worthy opponent...
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          {error && <p role="alert" className="text-sm text-game-danger">{error}</p>}
          {status === 'idle' && <Button onClick={() => setAttempt((value) => value + 1)}>Retry queue</Button>}
          {status === 'queueing' && (
            <>
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-game-ochre/15" />
                <Loader2 className="relative z-10 h-12 w-12 animate-spin text-game-ochre" />
              </div>
              <div className="font-mono text-2xl font-bold">
                {Math.floor(elapsed / 60)}:
                {(elapsed % 60).toString().padStart(2, '0')}
              </div>
              <Button
                disabled={cancelling}
                type="button"
                variant="ghost"
                className="text-game-muted hover:text-game-clay-strong"
                onClick={closeQueue}
              >
                {cancelling ? 'Cancelling…' : 'Cancel'}
              </Button>
            </>
          )}

          {status === 'idle' && <Button variant="outline" disabled={cancelling} onClick={() => void closeQueue()}>Cancel</Button>}

          {status === 'matched' && (
            <>
              <div className="font-display text-xl font-bold text-game-moss-strong">
                MATCH FOUND!
              </div>
              <div className="text-sm text-game-muted">
                Entering Battle arena...
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
