'use client'

import confetti from 'canvas-confetti'
import { FlaskConical, Star } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'
import { StickyFooter } from '@/components/game/shared/StickyFooter'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { SectionDivider } from '@/components/ui/section-divider'
import { getSkill } from '@/data/skills'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import { RESEARCH_LEVEL_REWARDS } from '@/utilities/research/research-levels'

interface ResearchLevelUpModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  formId: string
  pokemonName: string
  newLevel: number
  skillXpGranted: number
  onClose: () => void
}

export function ResearchLevelUpModal({
  open,
  onOpenChange,
  formId,
  pokemonName,
  newLevel,
  skillXpGranted,
  onClose,
}: ResearchLevelUpModalProps) {
  useEffect(() => {
    if (open) {
      // Trigger confetti
      const duration = 3000
      const end = Date.now() + duration

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#2dd4bf', '#14b8a6', '#0d9488'], // Teal colors for research
        })
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#2dd4bf', '#14b8a6', '#0d9488'],
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }
      frame()
    }
  }, [open])

  const rewardDescription =
    RESEARCH_LEVEL_REWARDS[newLevel] || 'Enhanced research data unlocked!'
  const skill = getSkill('researching')
  const skillName = skill?.name || 'Researcher'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-none w-screen h-[100dvh] flex flex-col gap-0 overflow-hidden border-0 bg-game-canvas p-0 text-game-ink focus:outline-none z-[200]"
      >
        <DialogTitle className="sr-only">
          {pokemonName} Research Level Up
        </DialogTitle>
        <div className="flex-1 w-full flex flex-col items-center justify-center p-6 overflow-y-auto relative z-10">
          <div className="flex w-full max-w-md flex-col items-center space-y-7">
            {/* Header section */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-game-moss-strong">
                <span className="text-sm font-semibold text-game-moss-strong">
                  Research Breakthrough
                </span>
              </div>
              <h2 className="font-display text-2xl font-semibold text-game-ink">
                {pokemonName} Lvl {newLevel}!
              </h2>
            </div>

            {/* Pokemon Sprite section */}
            <div className="relative mx-auto flex h-40 w-40 shrink-0 items-center justify-center">
              <div className="relative z-10 flex h-36 w-36 items-center justify-center overflow-hidden rounded-lg border border-game-moss/45 bg-game-surface-raised">
                <Image
                  src={getPokemonImageUrl(formId, 'sprite')}
                  alt={pokemonName}
                  width={160}
                  height={160}
                  className="h-32 w-32 object-contain pixelated"
                />
              </div>
            </div>

            {/* Rewards section */}
            <div className="w-full space-y-6">
              <SectionDivider className="text-xl">
                Reward Unlocked
              </SectionDivider>

              <div className="rounded-lg border border-game-border bg-game-surface-raised p-5 text-center">
                <p className="text-lg font-semibold leading-snug text-game-ochre">
                  {rewardDescription}
                </p>
              </div>

              {skillXpGranted > 0 && (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-game-muted">
                    <span>{skillName}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-2xl font-bold text-game-moss-strong">
                    <span>+{skillXpGranted} XP</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <StickyFooter className="relative z-20">
          <Button
            size="sm"
            className="w-full"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
          >
            Continue
          </Button>
        </StickyFooter>
      </DialogContent>
    </Dialog>
  )
}
