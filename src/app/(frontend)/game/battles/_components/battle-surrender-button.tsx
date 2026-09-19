'use client'

import { Flag } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { SectionDivider } from '@/components/ui/section-divider'
import { useBattleContext } from './battle-context'
import { BattleActionTrigger } from './battle-action-trigger'

export function BattleSurrenderButton({
  actionTrigger = false,
  compact = false,
}: {
  actionTrigger?: boolean
  compact?: boolean
}) {
  const { battleState, isAnimating, isWaitingForServer, handleSurrender } =
    useBattleContext()
  const [isSurrenderOpen, setIsSurrenderOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const surrenderDialogContentId = `battle-surrender-dialog-${battleState.battleId}`
  const isDisabled =
    isAnimating || isWaitingForServer || battleState.status !== 'ongoing'

  return (
    <Dialog open={isSurrenderOpen} onOpenChange={setIsSurrenderOpen}>
      <DialogTrigger asChild>
        {actionTrigger ? (
          <BattleActionTrigger
            itemId="escape-rope"
            label="Flee"
            compact={compact}
            data-action="flee"
            disabled={isDisabled}
            aria-label="Flee battle"
          />
        ) : (
          <Button
            type="button"
            variant="outline"
            className="game-focus-ring h-12 w-12 rounded-xl border-game-clay/45 bg-game-surface-raised p-0 text-game-clay-strong shadow-sm transition-colors hover:border-game-clay hover:bg-game-clay/10"
            disabled={isDisabled}
            aria-label="Surrender battle"
          >
            <Flag className="h-4 w-4 text-game-clay-strong" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        id={surrenderDialogContentId}
        className="game-paper-background border-game-border bg-game-surface text-game-ink"
      >
        <DialogTitle className="sr-only">Flee Battle</DialogTitle>
        <div className="w-full text-center mt-2">
          <SectionDivider>Flee Battle?</SectionDivider>
        </div>
        <DialogDescription className="text-center text-game-muted">
          Are you sure you want to flee? You will lose this battle.
        </DialogDescription>
        <DialogFooter className="sm:justify-center">
          <Button
            type="button"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            onClick={async () => {
              setIsSubmitting(true)
              try {
                setIsSurrenderOpen(false)
                await handleSurrender()
              } finally {
                setIsSubmitting(false)
              }
            }}
            className="game-accent-button w-full border-0 bg-game-clay hover:bg-game-clay/90"
          >
            Flee
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
