import { Heart, MapIcon } from 'lucide-react'
import nextDynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { GameResult } from '@/components/game/ResearchResult'
import { markExpeditionReturn } from '@/components/game/features/explore/expedition-return'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { TaskExitDialog } from '@/components/game/task-exit-dialog'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { SectionDivider } from '@/components/ui/section-divider'
import type { TaskExitModal } from '@/data/tasks'
import type { TcgCard } from '@/data/tcg/types'
import type { RewardSummary } from '@/utilities/rewards/reward-logic'
import { startEncounter } from '../actions'

const LevelUpModal = nextDynamic(
  () =>
    import('@/components/game/level-up-modal').then((mod) => mod.LevelUpModal),
  {
    loading: () => (
      <div className="game-paper-background fixed inset-0 z-50 flex items-center justify-center bg-game-canvas">
        <LoadingSpinner size="lg" />
      </div>
    ),
    ssr: false,
  },
)

const CardDrawReveal = nextDynamic(
  () =>
    import('@/components/tcg/CardDrawReveal').then((mod) => mod.CardDrawReveal),
  {
    loading: () => (
      <div className="game-paper-background fixed inset-0 z-50 flex items-center justify-center bg-game-canvas">
        <LoadingSpinner size="lg" />
      </div>
    ),
    ssr: false,
  },
)

import { ResearchLevelUpModal } from '@/app/(frontend)/game/pokedex/_components/ResearchLevelUpModal'

interface EncounterResultsProps {
  captureResult: {
    success: boolean
    caught: boolean
    pokemonName?: string
    rewards?: RewardSummary
    messages?: string[]
    failMessage?: string
    formId?: string
    pokemonId?: number
    expeditionProgress?: {
      expeditionId: string
      expeditionName: string
      currentStep: number
      totalSteps: number
      losses: number
      maxLosses: number
      livesLeft: number
      canFail?: boolean
      status: 'active' | 'ready_to_claim' | 'failed'
      progressed: boolean
    }
  } | null
  encounter: any
  locationName: string
  refreshUser: () => void
  taskExitModalData?: TaskExitModal | null
  showTaskExitModal: boolean
  setShowTaskExitModal: (show: boolean) => void
  setTaskExitModalData: (data: TaskExitModal | null) => void
  showLevelUpModal: boolean
  setShowLevelUpModal: (show: boolean) => void
  currentResearchBreakthrough: any | null
  setCurrentResearchBreakthrough: (data: any | null) => void
  researchBreakthroughsToReveal: any[]
  setResearchBreakthroughsToReveal: (data: any[]) => void
  showCardReveal: boolean
  setShowCardReveal: (show: boolean) => void
  cardsToReveal: TcgCard[]
  setCardsToReveal: (cards: TcgCard[]) => void
  setPhase: (phase: 'quiz' | 'capture' | 'result') => void
  returnPath?: string | null
}

export function EncounterResults({
  captureResult,
  encounter,
  locationName,
  refreshUser,
  taskExitModalData,
  showTaskExitModal,
  setShowTaskExitModal,
  setTaskExitModalData,
  showLevelUpModal,
  setShowLevelUpModal,
  currentResearchBreakthrough,
  setCurrentResearchBreakthrough,
  researchBreakthroughsToReveal,
  setResearchBreakthroughsToReveal,
  showCardReveal,
  setShowCardReveal,
  cardsToReveal,
  setCardsToReveal,
  setPhase,
  returnPath,
}: EncounterResultsProps) {
  const router = useRouter()
  const [replayLoading, setReplayLoading] = useState(false)

  if (!captureResult) return null

  const expeditionProgress = captureResult.expeditionProgress
  const capturePokemonFormId =
    captureResult.formId ||
    captureResult.pokemonId?.toString() ||
    encounter.pokemonId.toString()

  const expeditionUpdateContent = expeditionProgress ? (
    <div className="flex items-start gap-3 rounded-lg border border-game-border bg-game-surface p-4 text-left shadow-sm">
      <div className="game-icon-orb game-icon-orb-discovery flex h-12 w-12 shrink-0 items-center justify-center border-game-ochre/45 text-game-ochre">
        <MapIcon className="h-6 w-6" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-game-moss-strong">
          {expeditionProgress.expeditionName || 'Expedition'}
        </p>
        {expeditionProgress.progressed ? (
          expeditionProgress.status === 'ready_to_claim' ? (
            <p className="mt-1 text-sm text-game-ink">
              You completed the expedition. Your rewards are ready to claim.
            </p>
          ) : (
            <p className="mt-1 text-sm text-game-ink">Progress recorded.</p>
          )
        ) : expeditionProgress.status === 'failed' ? (
          <p className="mt-1 text-sm text-game-danger">
            The expedition ended here.
          </p>
        ) : expeditionProgress.canFail === false ? (
          <p className="mt-1 text-sm text-game-ink">
            Try this step again to continue.
          </p>
        ) : (
          <>
            <p className="mt-1 text-sm text-game-ink">One life was lost.</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-game-ink">
              <Heart className="h-4 w-4 text-game-clay" />
              Lives left: {expeditionProgress.livesLeft}/
              {expeditionProgress.maxLosses}.
            </p>
          </>
        )}
      </div>
    </div>
  ) : null

  const messagesContent =
    captureResult.messages && captureResult.messages.length > 0 ? (
      <div>
        <SectionDivider>Capture Notes</SectionDivider>
        <div className="flex items-start gap-3 rounded-lg border border-game-border bg-game-surface-raised p-4 shadow-sm">
          <div className="game-icon-orb game-icon-orb-catch h-12 w-12 shrink-0 border-game-danger/55">
            <TaskIconDisplay
              icon={{ type: 'pokemon', id: capturePokemonFormId }}
              className="h-10 w-10"
            />
          </div>
          <div className="flex min-h-12 flex-col justify-center gap-2">
            {captureResult.messages.map((msg, i) => (
              <p
                key={i}
                className="font-medium leading-relaxed text-game-charcoal-strong"
              >
                {msg}
              </p>
            ))}
          </div>
        </div>
      </div>
    ) : null

  return (
    <>
      {captureResult.rewards?.levelUp && (
        <LevelUpModal
          open={showLevelUpModal}
          onOpenChange={setShowLevelUpModal}
          newLevel={captureResult.rewards.levelUp.newLevel}
          skillId={captureResult.rewards.levelUp.skillId || 'catching'}
          onClose={() => {
            setShowLevelUpModal(false)
          }}
        />
      )}
      {currentResearchBreakthrough && (
        <ResearchLevelUpModal
          open={!!currentResearchBreakthrough}
          onOpenChange={(open) => {
            if (!open) {
              const next = researchBreakthroughsToReveal[0]
              const remaining = researchBreakthroughsToReveal.slice(1)
              setCurrentResearchBreakthrough(next || null)
              setResearchBreakthroughsToReveal(remaining)
              if (!next && captureResult.rewards?.levelUp) {
                setShowLevelUpModal(true)
              }
            }
          }}
          formId={currentResearchBreakthrough.formId}
          pokemonName={currentResearchBreakthrough.pokemonName}
          newLevel={currentResearchBreakthrough.newLevel}
          skillXpGranted={currentResearchBreakthrough.skillXpGranted}
          onClose={() => {
            const next = researchBreakthroughsToReveal[0]
            const remaining = researchBreakthroughsToReveal.slice(1)
            setCurrentResearchBreakthrough(next || null)
            setResearchBreakthroughsToReveal(remaining)
            if (!next && captureResult.rewards?.levelUp) {
              setShowLevelUpModal(true)
            }
          }}
        />
      )}
      {showCardReveal && cardsToReveal.length > 0 && (
        <CardDrawReveal
          cards={cardsToReveal}
          onComplete={() => {
            setShowCardReveal(false)
            setCardsToReveal([])
            if (taskExitModalData) {
              setShowTaskExitModal(true)
              return
            }
            if (
              captureResult.rewards?.researchBreakthroughs &&
              captureResult.rewards.researchBreakthroughs.length > 0
            ) {
              return
            }
            if (captureResult.rewards?.levelUp) {
              setShowLevelUpModal(true)
              return
            }
            setPhase('result')
          }}
        />
      )}
      {taskExitModalData && (
        <TaskExitDialog
          open={showTaskExitModal}
          onOpenChange={(open) => {
            setShowTaskExitModal(open)
            if (!open) {
              setTaskExitModalData(null)
              if (captureResult.rewards?.levelUp) {
                setShowLevelUpModal(true)
              }
            }
          }}
          data={taskExitModalData}
        />
      )}
      <GameResult
        success={captureResult.caught}
        background={encounter?.background}
        title={captureResult.caught ? 'Caught!' : 'Escaped'}
        message={
          captureResult.caught
            ? `You caught ${encounter.isShiny ? 'Shiny ' : ''}${captureResult.pokemonName || encounter.pokemonName}!`
            : captureResult.failMessage ||
              (captureResult as any).message ||
              'The wild Pokemon fled.'
        }
        rewardSummary={captureResult.rewards}
        icon={{ type: 'pokemon', id: capturePokemonFormId }}
        iconAlt={locationName}
        sectionTitle="Encounter Result"
        titleColor={
          captureResult.caught ? 'text-game-moss-strong' : 'text-game-muted'
        }
        returnText="Continue"
        onReturn={() => {
          markExpeditionReturn(expeditionProgress?.expeditionId)
          refreshUser()
          if (returnPath) {
            const separator = returnPath.includes('?') ? '&' : '?'
            router.push(
              `${returnPath}${separator}outcome=${captureResult.caught ? 'won' : 'lost'}`,
            )
          } else {
            router.push('/game/explore')
          }
        }}
        secondaryAction={
          encounter.isEligibleForReplay ? (
            <Button
              size="lg"
              type="button"
              disabled={replayLoading}
              aria-busy={replayLoading}
              onClick={async () => {
                setReplayLoading(true)
                try {
                  const res = await startEncounter(encounter.locationId)
                  if (res?.success) {
                    window.location.reload()
                  } else {
                    router.push('/game/explore')
                  }
                } catch (e) {
                  router.push('/game/explore')
                } finally {
                  setReplayLoading(false)
                }
              }}
              variant="outline"
              className="w-full font-bold"
            >
              Play Again
            </Button>
          ) : undefined
        }
        additionalContent={
          expeditionUpdateContent || messagesContent ? (
            <div className={expeditionUpdateContent ? 'space-y-3' : undefined}>
              {expeditionUpdateContent}
              {messagesContent}
            </div>
          ) : undefined
        }
        additionalContentFrame={false}
      />
    </>
  )
}
