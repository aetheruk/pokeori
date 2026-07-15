'use client'

import { Heart } from 'lucide-react'
import { lazy, Suspense, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

const CardDrawReveal = lazy(() =>
  import('@/components/tcg/CardDrawReveal').then((module) => ({
    default: module.CardDrawReveal,
  })),
)

import { ResearchLevelUpModal } from '@/app/(frontend)/game/pokedex/_components/ResearchLevelUpModal'
import { LevelUpModal } from '@/components/game/level-up-modal'
import { GameResult } from '@/components/game/ResearchResult'
import { TaskExitDialog } from '@/components/game/task-exit-dialog'
import type { TaskExitModal, TaskIcon } from '@/data/tasks'
import type { CompleteTaskResult } from '@/utilities/tasks/actions'

// We can define a generic result interface that covers tasks, battles, etc.
// But mostly they will differ slightly.
// For now, let's accept a shape that matches CompleteTaskResult mostly, or extend it.
export interface GenericResult {
  success: boolean
  message?: string
  expeditionProgress?: {
    expeditionId: string
    expeditionName: string
    isChronicle?: boolean
    currentStep: number
    totalSteps: number
    losses: number
    maxLosses: number
    livesLeft: number
    canFail?: boolean
    status: 'active' | 'ready_to_claim' | 'failed'
    progressed: boolean
  }
  summary?: GenericResult['rewards']
  rewards?: {
    xp: Record<string, number>
    items: any[]
    pokemon: any[]
    currency: any[]
    cards: any[]
    levelUp?: any
    tasksCompleted?: any[]
    taskExitModals?: TaskExitModal[]
    banners?: any[]
    icons?: any[]
    titles?: any[]
    upgrades?: any[]
    researchBreakthroughs?: {
      formId: string
      pokemonName: string
      newLevel: number
      skillXpGranted: number
    }[]
  }
  exitModal?: TaskExitModal
}

interface RewardResultOverlayProps {
  result: GenericResult | null
  onClose: () => void
  icon?: TaskIcon // Or similar icon type
  iconAlt?: string // label for the icon
  title?: string
  message?: string | React.ReactNode
  /** Optional container to portal into. Useful if inside a Drawer/Dialog that traps focus. */
  container?: HTMLElement | null
  /** Optional secondary action button */
  secondaryAction?: React.ReactNode
}

export function getRewardResultExitModalQueue(
  result: GenericResult | null,
): TaskExitModal[] {
  if (!result) return []

  const rewardSummary = result.rewards || result.summary
  return [
    ...(result.exitModal ? [result.exitModal] : []),
    ...(rewardSummary?.taskExitModals || []),
  ]
}

export function shouldShowRewardResultSecondaryAction(
  result: GenericResult | null,
): boolean {
  return getRewardResultExitModalQueue(result).length === 0
}

export function RewardResultOverlay({
  result,
  onClose,
  icon,
  iconAlt,
  title,
  message,
  container,
  secondaryAction,
}: RewardResultOverlayProps) {
  // State for sequential flow
  const [currentStep, setCurrentStep] = useState<
    | 'idle'
    | 'level-up'
    | 'cards'
    | 'research-breakthrough'
    | 'summary'
    | 'exit-modal'
  >('idle')

  const [levelUpData, setLevelUpData] = useState<any | null>(null)
  const [rewardCards, setRewardCards] = useState<any[]>([])
  const [researchBreakthroughs, setResearchBreakthroughs] = useState<any[]>([])
  const [currentBreakthrough, setCurrentBreakthrough] = useState<any | null>(
    null,
  )
  const [exitModalData, setExitModalData] = useState<TaskExitModal | null>(null)
  const [exitModalQueue, setExitModalQueue] = useState<TaskExitModal[]>([])

  // Initialize the flow when a new result comes in
  useEffect(() => {
    if (!result) {
      setCurrentStep('idle')
      setExitModalData(null)
      setExitModalQueue([])
      return
    }

    const rewardSummary = result.rewards || result.summary

    // Prepare data
    if (rewardSummary?.levelUp) {
      setLevelUpData(rewardSummary.levelUp)
    }

    if (rewardSummary?.cards && rewardSummary.cards.length > 0) {
      const validCards = rewardSummary.cards.filter((c: any) => !c.discarded)
      const cards = validCards.map((c: any) => ({
        id: c.id,
        name: c.name,
        images: c.images,
        rarity: c.rarity || 'Common',
        supertype: 'Pokémon',
        subtypes: [],
        nationalPokedexNumbers: [],
        isNew: c.isNew,
      }))
      setRewardCards(cards)
    } else {
      setRewardCards([])
    }

    if (
      rewardSummary?.researchBreakthroughs &&
      rewardSummary.researchBreakthroughs.length > 0
    ) {
      setResearchBreakthroughs(rewardSummary.researchBreakthroughs)
    } else {
      setResearchBreakthroughs([])
    }

    const exitModals = getRewardResultExitModalQueue(result)
    setExitModalData(exitModals[0] || null)
    setExitModalQueue(exitModals.slice(1))

    // Determine initial step
    const validCards =
      rewardSummary?.cards?.filter((c: any) => !c.discarded) || []

    if (rewardSummary?.levelUp) {
      setCurrentStep('level-up')
    } else if (validCards.length > 0) {
      setCurrentStep('cards')
    } else if (
      rewardSummary?.researchBreakthroughs &&
      rewardSummary.researchBreakthroughs.length > 0
    ) {
      setCurrentBreakthrough(rewardSummary.researchBreakthroughs[0])
      setResearchBreakthroughs(rewardSummary.researchBreakthroughs.slice(1))
      setCurrentStep('research-breakthrough')
    } else {
      // Default to summary for any other valid result
      setCurrentStep('summary')
    }
  }, [result])

  // --- Step Handlers ---

  const handleLevelUpClose = () => {
    // Level Up -> Cards (if any) -> Summary
    if (rewardCards.length > 0) {
      setCurrentStep('cards')
    } else {
      setCurrentStep('summary')
    }
  }

  const handleCardRevealComplete = () => {
    // Cards -> Research Breakthrough (if any) -> Summary
    if (researchBreakthroughs.length > 0 || currentBreakthrough) {
      if (!currentBreakthrough && researchBreakthroughs.length > 0) {
        setCurrentBreakthrough(researchBreakthroughs[0])
        setResearchBreakthroughs(researchBreakthroughs.slice(1))
      }
      setCurrentStep('research-breakthrough')
    } else {
      setCurrentStep('summary')
    }
  }

  const handleResearchBreakthroughClose = () => {
    if (researchBreakthroughs.length > 0) {
      setCurrentBreakthrough(researchBreakthroughs[0])
      setResearchBreakthroughs(researchBreakthroughs.slice(1))
    } else {
      setCurrentBreakthrough(null)
      setCurrentStep('summary')
    }
  }

  const handleSummaryReturn = () => {
    // Summary -> Exit Modal (if any) -> Close
    if (exitModalData) {
      setCurrentStep('exit-modal')
    } else {
      handleFinalClose()
    }
  }

  const handleExitModalClose = (open: boolean) => {
    if (!open) {
      if (exitModalQueue.length > 0) {
        const [nextModal, ...remainingModals] = exitModalQueue
        setExitModalData(nextModal)
        setExitModalQueue(remainingModals)
        return
      }
      handleFinalClose()
    }
  }

  const handleFinalClose = () => {
    setCurrentStep('idle')
    setExitModalData(null)
    setExitModalQueue([])
    onClose()
  }

  if (!result) return null
  if (typeof document === 'undefined') return null

  const rewardSummary = result.rewards || result.summary
  const showSecondaryAction = shouldShowRewardResultSecondaryAction(result)
  const expeditionProgress =
    result.expeditionProgress || (rewardSummary as any)?.expeditionProgress
  const expeditionLabel = expeditionProgress?.isChronicle
    ? 'Chronicle'
    : 'Expedition'
  const expeditionStepLabel = expeditionProgress?.isChronicle
    ? 'Chronicle step'
    : 'Expedition step'

  const expeditionUpdateContent = expeditionProgress ? (
    <div className="rounded-lg border border-game-moss/30 bg-game-moss/8 p-3 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-game-moss-strong">
        {expeditionProgress.expeditionName || expeditionLabel}
      </p>
      {expeditionProgress.progressed ? (
        expeditionProgress.status === 'ready_to_claim' ? (
          <p className="mt-1 text-sm text-game-ink">
            You completed the {expeditionLabel.toLowerCase()}. Your rewards are
            ready to claim.
          </p>
        ) : (
          <p className="mt-1 text-sm text-game-ink">Progress recorded.</p>
        )
      ) : expeditionProgress.status === 'failed' ? (
        <p className="mt-1 text-sm text-game-danger">
          The {expeditionLabel.toLowerCase()} ended here.
        </p>
      ) : expeditionProgress.canFail === false ? (
        <p className="mt-1 text-sm text-game-ink">
          Try the {expeditionStepLabel.toLowerCase()} again to continue.
        </p>
      ) : (
        <>
          <p className="mt-1 text-sm text-game-ink">One life was lost.</p>
          <p className="mt-1 inline-flex w-full items-center justify-center gap-1.5 text-sm text-game-ink">
            <Heart className="h-4 w-4 text-game-clay" />
            Lives left: {expeditionProgress.livesLeft}/
            {expeditionProgress.maxLosses}.
          </p>
        </>
      )}
    </div>
  ) : undefined

  return (
    <>
      {/* 3. The Full Screen Overlay for Summary & Cards */}
      {/* We keep this mounted if we are in cards or summary step to maintain background/context if needed, 
          but technically they are sequential scenes. 
          For smooth transition, we can stick to one Dialog for the "Overlay" parts. 
      */}

      <Dialog
        open={currentStep === 'summary' || currentStep === 'cards'}
        onOpenChange={(open) => {
          if (!open) handleFinalClose()
        }}
      >
        <DialogContent
          showCloseButton={false}
          onInteractOutside={(e) => e.preventDefault()}
          className="max-w-none h-[100dvh] w-screen gap-0 border-0 bg-game-surface p-0 focus:outline-none"
        >
          <DialogTitle className="sr-only">Reward Result</DialogTitle>
          <div className="flex-1 w-full h-full flex flex-col overflow-hidden relative">
            {currentStep === 'cards' && (
              <div className="absolute inset-0 z-[60] bg-game-night-surface">
                <Suspense
                  fallback={
                    <div
                      className="p-8 text-center text-game-cream"
                      role="status"
                      aria-live="polite"
                    >
                      Preparing cards…
                    </div>
                  }
                >
                  <CardDrawReveal
                    cards={rewardCards}
                    onComplete={handleCardRevealComplete}
                    className="absolute inset-0 z-[60]"
                  />
                </Suspense>
              </div>
            )}

            {currentStep === 'summary' && (
              <GameResult
                embedded
                success={result.success}
                title={title || (result.success ? 'COMPLETED!' : 'FAILED')}
                message={
                  message ||
                  result.message ||
                  (result.success
                    ? 'Action completed successfully.'
                    : 'Action failed.')
                }
                rewardSummary={rewardSummary as any}
                icon={icon}
                iconAlt={iconAlt || 'Icon'}
                sectionTitle="Result"
                titleColor={
                  result.success ? 'text-game-moss-strong' : 'text-game-danger'
                }
                additionalContent={expeditionUpdateContent}
                returnText="Continue"
                onReturn={handleSummaryReturn}
                secondaryAction={
                  showSecondaryAction ? secondaryAction : undefined
                }
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* 1. Level Up Modal (Self-managed Portal) */}
      {currentStep === 'level-up' && levelUpData && (
        <LevelUpModal
          open={true}
          onOpenChange={(open) => {
            if (!open) handleLevelUpClose()
          }}
          newLevel={levelUpData.newLevel}
          skillId={levelUpData.skillId || 'general'}
          onClose={handleLevelUpClose}
        />
      )}

      {/* 2. Task Exit Dialog (Self-managed Portal) */}
      <TaskExitDialog
        data={exitModalData}
        open={currentStep === 'exit-modal'}
        onOpenChange={handleExitModalClose}
      />

      {/* 4. Research Breakthrough Modal (Self-managed Portal) */}
      {currentStep === 'research-breakthrough' && currentBreakthrough && (
        <ResearchLevelUpModal
          open={true}
          onOpenChange={(open) => {
            if (!open) handleResearchBreakthroughClose()
          }}
          formId={currentBreakthrough.formId}
          pokemonName={currentBreakthrough.pokemonName}
          newLevel={currentBreakthrough.newLevel}
          skillXpGranted={currentBreakthrough.skillXpGranted}
          onClose={handleResearchBreakthroughClose}
        />
      )}
    </>
  )
}
