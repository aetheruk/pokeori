'use client'

import React from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'

interface DailyRefreshModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLetsGo?: () => void
}

export function DailyRefreshModal({ open, onOpenChange, onLetsGo }: DailyRefreshModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="daily-challenges-modal border-game-border bg-white text-game-ink sm:max-w-sm">
        <DialogHeader className="flex flex-col items-center justify-center gap-4 space-y-0 pt-3 pr-0 text-center">
          <div className="game-icon-orb size-16 border-game-ochre/35 text-game-ochre" aria-hidden="true">
            <Image
              src={getPokemonImageUrl('122', 'sprite')}
              alt=""
              width={64}
              height={64}
              priority
              className="size-14 object-contain pixelated drop-shadow-sm"
            />
          </div>
          <DialogTitle className="w-full text-center font-display text-xl font-black text-game-ink">
            Daily challenges
          </DialogTitle>
          <DialogDescription className="w-full max-w-xs text-center leading-relaxed text-game-muted">
            Take a look to see what rewards can be won today!
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="w-full items-center justify-center pb-2 sm:justify-center">
          <Button
            onClick={() => {
              onOpenChange(false)
              onLetsGo?.()
            }}
            className="w-full bg-game-charcoal font-bold text-game-cream hover:bg-game-charcoal-strong sm:w-56"
          >
            View challenges
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
