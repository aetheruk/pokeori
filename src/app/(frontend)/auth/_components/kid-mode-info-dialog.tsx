'use client'

import { CircleHelp } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const kidModeFeatures = [
  'Picture-based questions when catching Pokemon.',
  'Field Research always asks “Who appeared the most?” with tappable Pokemon tiles.',
  'Your Pokemon receive 20% more HP and battle stats in PvE battles.',
  'Rivals, player-versus-player battles, social Trainer pages, Mystery Gift, and High Scores are unavailable.',
]

export function KidModeInfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Learn about Kid Mode"
          className="game-focus-ring flex size-10 shrink-0 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised text-game-moss-strong transition-colors hover:border-game-moss/50 hover:bg-game-moss/10"
        >
          <CircleHelp className="size-5" aria-hidden="true" />
        </button>
      </DialogTrigger>
      <DialogContent className="border-game-border bg-game-surface text-game-ink">
        <DialogHeader>
          <p className="game-field-label">Play options</p>
          <DialogTitle>About Kid Mode</DialogTitle>
          <DialogDescription>
            Kid Mode simplifies research and keeps play focused on solo
            exploration.
          </DialogDescription>
        </DialogHeader>

        <ul className="space-y-2 text-sm leading-relaxed text-game-ink">
          {kidModeFeatures.map((feature) => (
            <li
              key={feature}
              className="rounded-lg border border-game-border bg-game-surface-raised p-3"
            >
              {feature}
            </li>
          ))}
        </ul>

        <p className="text-sm leading-relaxed text-game-muted">
          Choose this when creating the trainer record. After signup, only an
          administrator can change the setting.
        </p>
      </DialogContent>
    </Dialog>
  )
}
