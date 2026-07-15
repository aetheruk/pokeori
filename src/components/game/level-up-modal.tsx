'use client'

import { useEffect, useMemo } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Map as MapIcon, Package, Shield, Sparkles, Swords, Target, Trophy, Zap } from 'lucide-react'
import Image from 'next/image'
import confetti from 'canvas-confetti'

import { ItemSprite } from '@/components/ui/item-sprite'
import { getSkill } from '@/data/skills'
import {
  getSkillGuideUnlocks,
  type SkillGuideUnlock,
} from '@/data/skills/guide'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { SectionDivider } from '@/components/ui/section-divider'
import { StickyFooter } from '@/components/game/shared/StickyFooter'
import type { CoreSkillId } from '@/utilities/skills/unlocks'

interface LevelUpModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  newLevel: number
  onClose: () => void
  skillId?: string
}

function isCoreSkillId(skillId: string): skillId is CoreSkillId {
  return (
    skillId === 'battling' ||
    skillId === 'catching' ||
    skillId === 'researching' ||
    skillId === 'artisan'
  )
}

function SkillUnlockCategoryIcon({
  unlock,
}: {
  unlock: SkillGuideUnlock
}) {
  const unlockIcon = unlock.icon || (unlock.itemId ? { type: 'item' as const, id: unlock.itemId } : null)

  if (unlockIcon) {
    return <TaskIconDisplay icon={unlockIcon} className="h-8 w-8" />
  }

  const iconClassName = 'h-5 w-5 text-game-moss-strong'

  switch (unlock.category) {
    case 'battle':
      return <Swords className={iconClassName} />
    case 'encounter':
      return <MapIcon className={iconClassName} />
    case 'items':
      return <Package className={iconClassName} />
    case 'pokemon':
      return <Sparkles className={iconClassName} />
    case 'progression':
      return <Trophy className={iconClassName} />
    case 'powers':
      return <Zap className={iconClassName} />
    case 'titles':
      return <Shield className={iconClassName} />
  }
}

export function LevelUpModal({
  open,
  onOpenChange,
  newLevel,
  onClose,
  skillId = 'battling',
}: LevelUpModalProps) {
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
          colors: ['#2dd4bf', '#14b8a6', '#0d9488'],
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

  const skill = getSkill(skillId)
  const skillName = skill?.name || skillId
  const levelUnlocks = useMemo(() => {
    if (!isCoreSkillId(skillId)) return []
    return getSkillGuideUnlocks(skillId).filter((unlock) => unlock.level === newLevel)
  }, [newLevel, skillId])

  // Use a default icon if skill not found or no iconId
  const DefaultIcon = Target

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-none w-screen h-[100dvh] flex flex-col gap-0 overflow-hidden border-0 bg-game-canvas p-0 text-game-ink focus:outline-none z-[200]"
      >
        <DialogTitle className="sr-only">
          {skillName} Level Up
        </DialogTitle>

        <div className="flex-1 w-full flex flex-col items-center justify-center p-6 overflow-y-auto relative z-10">
          <div className="w-full max-w-md mx-auto relative">
            {/* Main Result Card */}
            <div className="relative flex w-full flex-col items-center overflow-hidden rounded-xl border border-game-border bg-game-surface-raised p-6 text-center md:p-8">

              {/* Icon Container with Orbital Glow */}
              <div className="relative mb-8 mt-4">
                <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-lg border border-game-clay/40 bg-game-clay/10 md:h-28 md:w-28">
                  {skill?.iconId ? (
                    skill.iconId.match(/\.(?:avif|png|webp|jpe?g)$/) ? (
                      <Image
                        src={`/fallback/skills/${skill.iconId}`}
                        alt={skillName}
                        width={80}
                        height={80}
                        className="h-20 w-20 object-contain md:h-24 md:w-24"
                      />
                    ) : (
                      <ItemSprite
                        itemId={skill.iconId}
                        alt={skillName}
                        width={80}
                        height={80}
                        className="h-20 w-20 object-contain pixelated md:h-24 md:w-24"
                      />
                    )
                  ) : (
                    <DefaultIcon className="h-20 w-20 text-game-moss md:h-24 md:w-24" />
                  )}
                </div>

                {/* Level Badge Overlay */}
                <div className="absolute left-1/2 bottom-0 transform translate-y-1/3 -translate-x-1/2 z-20">
                  <div className="flex h-10 min-w-[3rem] items-center justify-center rounded-full border-4 border-game-surface bg-game-clay px-3 text-xl font-black text-game-cream">
                    {newLevel}
                  </div>
                </div>
              </div>

              {/* Title Section */}
              <div className="w-full space-y-4 relative z-10 flex flex-col items-center mt-4 mb-4">
                <span className="mb-1 text-[10px] font-black uppercase tracking-[0.3em] text-game-muted md:text-xs">
                  Level Up
                </span>
                <h1 className="mb-4 font-display text-3xl font-semibold leading-tight text-game-moss-strong md:text-4xl">
                  {skillName} Rank
                </h1>

                <div className="w-full max-w-sm mt-2">
                  <SectionDivider textColor="text-game-moss-strong">New Unlocks</SectionDivider>
                  {levelUnlocks.length > 0 ? (
                    <div className="mt-4 space-y-2 text-left">
                      {levelUnlocks.map((unlock) => (
                        <div
                          key={`${unlock.source}:${unlock.level}:${unlock.label}:${unlock.itemId || ''}`}
                          className="flex min-h-16 items-center gap-3 rounded-lg border border-game-moss/35 bg-game-moss/10 px-3 py-2 text-game-ink"
                        >
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-game-border bg-game-surface">
                            <SkillUnlockCategoryIcon unlock={unlock} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-black uppercase tracking-tight text-game-ink">
                              {unlock.label}
                            </div>
                            <div className="mt-1 line-clamp-2 text-[11px] leading-snug text-game-muted">
                              {unlock.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      className="mt-4 rounded-lg border border-dashed border-game-border bg-game-surface p-4 text-center text-xs font-medium text-game-muted"
                      role="status"
                      aria-live="polite"
                    >
                      No listed unlocks at this level
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <StickyFooter>
          <div className="w-full max-w-xs mx-auto">
            <Button
              size="lg"
              className="w-full"
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
            >
              <span className="uppercase tracking-widest text-sm">Continue</span>
            </Button>
          </div>
        </StickyFooter>
      </DialogContent>
    </Dialog>
  )
}
