'use client'

import { Loader2 } from 'lucide-react'
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
import { checkPvpStatus, joinRankedQueue, leaveRankedQueue } from './actions'

interface PvpQueueModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  configId: string
  userId: string
}

export function PvpQueueModal({
  open,
  onOpenChange,
  configId,
  userId,
}: PvpQueueModalProps) {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'queueing' | 'matched'>('idle')
  const [elapsed, setElapsed] = useState(0)

  // Start Queue on Open
  useEffect(() => {
    if (open && status === 'idle') {
      setStatus('queueing')
      joinRankedQueue(configId, userId).then((res) => {
        if (res.success) {
          if (res.status === 'matched') {
            setStatus('matched')
            toast.success('Match Found!')
            setTimeout(() => router.push('/game/battles/encounter'), 500) // Delay for UX
          }
          // Else, we are in queue.
        } else {
          toast.error('Failed to join queue')
          onOpenChange(false)
        }
      })
    }
  }, [open, status, configId, userId, onOpenChange, router])

  // Timer
  useEffect(() => {
    if (status === 'queueing') {
      const timer = setInterval(() => setElapsed((e) => e + 1), 1000)
      return () => clearInterval(timer)
    } else {
      setElapsed(0)
    }
  }, [status])

  const closeQueue = async () => {
    if (status === 'queueing') {
      await leaveRankedQueue(configId, userId)
      setStatus('idle')
    }
    onOpenChange(false)
  }

  // Polling
  useEffect(() => {
    if (status === 'queueing') {
      const interval = setInterval(async () => {
        const res = await checkPvpStatus(userId)
        if (res.status === 'matched') {
          setStatus('matched')
          toast.success('Match Found!')
          router.push('/game/battles/encounter')
        }
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [status, userId, router])

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
      <DialogContent className="game-paper-texture border-game-border bg-game-surface text-game-ink sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Ranked Queue</DialogTitle>
          <DialogDescription>
            Looking for a worthy opponent...
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-8 space-y-4">
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
                type="button"
                variant="ghost"
                className="text-game-muted hover:text-game-clay-strong"
                onClick={closeQueue}
              >
                Cancel
              </Button>
            </>
          )}

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
