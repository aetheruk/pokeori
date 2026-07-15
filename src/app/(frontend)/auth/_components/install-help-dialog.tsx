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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const iosSteps = [
  'Open Pokeori in Safari.',
  'Tap the Share button in the browser toolbar.',
  'Choose “Add to Home Screen”.',
  'Tap Add to finish.',
]

const androidSteps = [
  'Open Pokeori in Chrome.',
  'Open the three-dot menu.',
  'Choose “Install app” or “Add to Home screen”.',
  'Confirm the installation.',
]

function InstallSteps({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-4 space-y-3">
      {steps.map((step, index) => (
        <li key={step} className="flex items-start gap-3 text-sm text-game-muted">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-game-moss/40 bg-game-moss/10 text-xs font-semibold text-game-moss-strong">
            {index + 1}
          </span>
          <span className="pt-0.5">{step}</span>
        </li>
      ))}
    </ol>
  )
}

export function InstallHelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="How to install Pokeori"
          title="Install Pokeori"
          className="game-focus-ring flex size-10 items-center justify-center rounded-lg border border-game-border bg-game-surface/90 text-game-ink shadow-lg shadow-black/20 backdrop-blur-md transition-colors hover:border-game-moss/60 hover:bg-game-surface-raised hover:text-game-moss-strong focus-visible:outline-none"
        >
          <CircleHelp className="size-5" aria-hidden="true" />
        </button>
      </DialogTrigger>
      <DialogContent className="border-game-border bg-game-surface text-game-ink">
        <DialogHeader>
          <DialogTitle>Install Pokeori</DialogTitle>
          <DialogDescription>
            Add Pokeori to your home screen for a quick, full-screen way to continue your adventure.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="ios" className="mt-1">
          <TabsList className="grid w-full grid-cols-2 bg-game-surface-raised">
            <TabsTrigger value="ios">iPhone &amp; iPad</TabsTrigger>
            <TabsTrigger value="android">Android</TabsTrigger>
          </TabsList>
          <TabsContent value="ios" className="rounded-lg border border-game-border bg-game-surface-raised p-4">
            <p className="text-sm font-medium text-game-ink">Install from Safari</p>
            <InstallSteps steps={iosSteps} />
          </TabsContent>
          <TabsContent
            value="android"
            className="rounded-lg border border-game-border bg-game-surface-raised p-4"
          >
            <p className="text-sm font-medium text-game-ink">Install from Chrome</p>
            <InstallSteps steps={androidSteps} />
          </TabsContent>
        </Tabs>

        <p className="text-xs leading-relaxed text-game-muted">
          Browser wording can vary slightly by device. If you do not see an install option, open the
          browser menu and look for Add to Home Screen.
        </p>
      </DialogContent>
    </Dialog>
  )
}
