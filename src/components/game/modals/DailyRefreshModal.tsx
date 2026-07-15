'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CalendarDays } from 'lucide-react'

interface DailyRefreshModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLetsGo?: () => void
}

export function DailyRefreshModal({ open, onOpenChange, onLetsGo }: DailyRefreshModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-game-border bg-game-surface text-game-ink sm:max-w-sm">
        <DialogHeader className="flex flex-col items-center justify-center space-y-3 pt-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-game-ochre/35 bg-game-ochre/10">
            <CalendarDays className="h-7 w-7 text-game-ochre" />
          </div>
          <DialogTitle className="text-center font-display text-xl font-black text-game-ink">
            Daily challenges
          </DialogTitle>
          <DialogDescription className="px-4 text-center leading-relaxed text-game-muted">
            Take a look to see what rewards can be won today!
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-center pb-2">
          <Button
            onClick={() => {
              onOpenChange(false)
              onLetsGo?.()
            }}
            className="w-full bg-game-clay font-bold text-game-cream hover:bg-game-clay/90 sm:w-auto"
          >
            View challenges
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
