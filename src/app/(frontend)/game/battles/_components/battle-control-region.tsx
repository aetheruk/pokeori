'use client'

import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import type { BattleState } from '@/utilities/battle/types'
import { BattleLog } from './battle-log'
import { BattleTypeAtmosphere } from './battle-type-atmosphere'

export type BattlePanel = 'stance' | 'moves' | 'items' | 'powers' | 'switch' | 'flee' | null

const titles: Record<Exclude<BattlePanel, null>, string> = {
  stance: 'Stance',
  moves: 'Moves',
  items: 'Items',
  powers: 'Powers',
  switch: 'Switch',
  flee: 'Flee',
}

export function BattleControlRegion({
  state,
  panel,
  onBack,
  commands,
  children,
  uses,
  stanceType,
  primaryType,
  canGoBack = true,
}: {
  state: BattleState
  panel: BattlePanel
  onBack: () => void
  commands: ReactNode
  children?: ReactNode
  uses?: string
  stanceType?: string
  primaryType?: string
  canGoBack?: boolean
}) {
  const atmosphereType = panel === 'stance'
    ? stanceType
    : panel === 'moves' || panel === 'powers'
      ? primaryType
      : undefined

  return (
    <div className="game-battle-control-region game-paper-first relative flex min-h-0 flex-[38] flex-col border-t border-game-border bg-game-surface-raised text-game-ink">
      {panel ? (
        <section className="game-battle-section relative flex min-h-0 flex-1 flex-col overflow-hidden" data-panel={panel} data-type={atmosphereType?.toLowerCase()} aria-label={`${titles[panel]} choices`}>
          {atmosphereType && <BattleTypeAtmosphere key={`${panel}-${atmosphereType.toLowerCase()}`} type={atmosphereType} />}
          {panel === 'powers' && <div className="pointer-events-none absolute inset-0 z-[1] bg-game-surface-raised/70" aria-hidden="true" />}
          {panel === 'items' && (
            <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
              <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: "url('/backgrounds/artisan-workshop.avif')" }} />
              <div className="absolute inset-0 bg-game-surface-raised/70" />
            </div>
          )}
          <div className="game-battle-section-header relative z-10 flex h-12 shrink-0 items-center justify-between gap-3 border-b border-game-border/60 bg-game-surface-raised px-3 text-game-ink sm:px-4">
            {canGoBack ? (
              <Button type="button" variant="ghost" className="game-focus-ring h-9 gap-1.5 px-2 text-sm font-semibold" onClick={onBack}>
                <ArrowLeft className="size-4" aria-hidden /> Back
              </Button>
            ) : <span className="text-xs font-medium text-game-muted">Choose a Pokémon</span>}
            <div className="flex items-center gap-2">
              {uses && <span className="rounded-full border border-game-border/70 bg-game-surface/80 px-2.5 py-1 font-mono text-[11px] font-semibold tabular-nums">{uses}</span>}
              <h2 className="font-display text-sm font-bold tracking-wide">{titles[panel]}</h2>
            </div>
          </div>
          <div className={`game-battle-section-body relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 sm:px-4${panel === 'flee' ? ' flex items-center justify-center' : ''}`}>
            {children}
          </div>
        </section>
      ) : (
        <>
          <div className="shrink-0 p-3 sm:p-4">{commands}</div>
          <div className="relative min-h-0 flex-1 overflow-hidden border-t border-game-border/70">
            <BattleLog logs={state.history} />
          </div>
        </>
      )}
    </div>
  )
}
