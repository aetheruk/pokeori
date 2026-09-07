'use client'

import { useEffect, useSyncExternalStore } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { clearGameRecovery, getGameRecovery, getServerGameRecovery, subscribeToGameRecovery } from '@/utilities/games/action-recovery'

export function GameActionRecovery() {
  const pathname = usePathname()
  useEffect(() => () => clearGameRecovery(), [pathname])
  const failure = useSyncExternalStore(subscribeToGameRecovery, getGameRecovery, getServerGameRecovery)
  return (
    <Dialog open={!!failure}>
      <DialogContent showCloseButton={false} onEscapeKeyDown={(event) => event.preventDefault()} onPointerDownOutside={(event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Game connection interrupted</DialogTitle>
          <DialogDescription role="alert">{failure?.message}</DialogDescription>
        </DialogHeader>
        <Button onClick={() => failure?.retry()}>Retry</Button>
        <Button variant="outline" asChild><a href="/game/explore" onClick={clearGameRecovery}>Return to Explore</a></Button>
        <p className="text-sm text-game-muted">Keep this page open to retry without losing the result shown in this run.</p>
      </DialogContent>
    </Dialog>
  )
}
