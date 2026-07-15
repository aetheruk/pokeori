'use client'

import { ChevronDown, Loader2, Trophy } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ItemSprite } from '@/components/ui/item-sprite'
import { SectionDivider } from '@/components/ui/section-divider'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import { getCurrency } from '@/data/currencies'
import {
  PrizeWheelGameConfig,
  PrizeWheelSlot,
} from '@/data/games/prize-wheel/types'
import { useGameMusic } from '@/hooks/useGameMusic'
import { cn } from '@/lib/utils'
import { completeResearchEncounter, startResearchEncounter } from '../actions'
import { claimPrizeWheelReward, initiatePrizeWheelSpin } from '../games/wheel'

interface PrizeWheelGameProps {
  encounter: PrizeWheelGameConfig
  initialState?: any
}

function PrizesModal({ encounter }: { encounter: PrizeWheelGameConfig }) {
  const slots = encounter.settings.slots || []

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="min-h-11 border-game-border bg-game-surface-raised text-game-ink hover:border-game-ochre hover:text-game-ochre"
        >
          <Trophy className="w-4 h-4 mr-2 text-game-ochre" />
          Prizes
        </Button>
      </DialogTrigger>
      <DialogContent className="game-paper-texture w-[95%] max-w-md rounded-xl border-game-border bg-game-surface p-6 text-game-ink">
        <DialogHeader>
          <DialogTitle className="sr-only">Prizes and Odds</DialogTitle>
          <SectionDivider>Prizes & Odds</SectionDivider>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {slots.map((slot, i) => {
            const percent = slot.percentage.toFixed(1)
            // 1 in X chance
            const oneInX = Math.round(100 / slot.percentage)

            return (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-game-border bg-game-surface-raised p-3"
              >
                {/* Icon */}
                <div className="flex gap-2 items-center">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded bg-game-canvas p-1"
                    style={{ borderBottom: `2px solid ${slot.color}` }}
                  >
                    <TaskIconDisplay
                      icon={
                        typeof slot.icon === 'string'
                          ? { type: 'item', id: slot.icon }
                          : slot.icon || { type: 'lucide', id: 'star' }
                      }
                      className="w-full h-full"
                    />
                  </div>
                </div>

                {/* Reward & Odds */}
                <div className="text-right">
                  <div className="text-sm font-bold text-game-ochre">
                    {slot.label}
                  </div>
                  <div className="font-mono text-xs text-game-muted">
                    {percent}% (1 in {oneInX})
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function PrizeWheelGame({
  encounter,
  initialState,
}: PrizeWheelGameProps) {
  useGameMusic(encounter)
  const { playSfx } = useAudio()
  const router = useRouter()
  const { user, refreshUser } = useUser()
  const [isSpinning, setIsSpinning] = useState(false)
  const [spinResult, setSpinResult] = useState<{
    targetIndex: number
    spinDuration: number
  } | null>(null)
  const [canClaim, setCanClaim] = useState(false)
  const [result, setResult] = useState<any>(null)

  // Wheel state
  const wheelRef = useRef<HTMLDivElement>(null)
  const currentRotation = useRef(0)
  const handleClaimRef = useRef<() => void>(() => {})

  const slots = encounter.settings.slots || []
  const sliceSize = 360 / slots.length

  // Cost info
  const cost = encounter.settings.cost
  const costCurrency = cost ? getCurrency(cost.currencyType) : undefined
  const userBalance = user?.currency?.[cost?.currencyType || 'pokedollars'] || 0
  const canAfford = !cost || userBalance >= cost.amount

  const handleSpin = async () => {
    if (isSpinning || !canAfford) return

    setIsSpinning(true)

    // Server Init
    const res = await initiatePrizeWheelSpin()
    if (!res.success) {
      toast.error(res.error || 'Failed to start spin')
      setIsSpinning(false)
      return
    }

    setSpinResult({
      targetIndex: res.targetIndex || 0,
      spinDuration: res.spinDuration || 4,
    })
    refreshUser(true) // Update balance without refreshing away from the active wheel.
  }

  // Animation Effect
  useEffect(() => {
    if (isSpinning && spinResult && wheelRef.current) {
      const { targetIndex, spinDuration } = spinResult

      // Calculate target rotation
      // Align target slice to TOP (0deg).
      // Slices are laid out clockwise starting from 0?
      // If slice 0 is 0-X deg, center is X/2.
      // To bring it to top, we rotate negative.

      // Let's assume standard layout:
      // Index 0 starts at 0deg (12 o'clock) if we CSS correct.
      // Actually standard CSS rotation starts at 12 o'clock, 0deg? No usually 3 o'clock (90deg)
      // Let's assume we construct wheel such that 0deg is top.

      const sliceCenter = targetIndex * sliceSize + sliceSize / 2
      // We want this sliceCenter to end up at 0 (Top).
      // So final rotation = (Multiple spins * 360) - sliceCenter
      // Add randomness? No server decides index.

      const extraSpins = 5 // Minimum full rotations
      const targetRotation = 360 * extraSpins + (360 - sliceCenter)

      // Add current base rotation to avoid snapping back
      // Actually we are setting 'transform', so we usually just add to 0.
      // But if we want multiple spins, we should keep track?
      // Simplest is just set transition time and final rotation.

      // Randomize landing within slice slightly to look natural?
      // Server gives exact index. We can wobble within +/- 40% of slice width.
      const wobble = (Math.random() - 0.5) * (sliceSize * 0.8)

      const finalRotation = currentRotation.current + targetRotation + wobble

      // Apply styles
      wheelRef.current.style.transition = `transform ${spinDuration}s cubic-bezier(0.2, 0, 0.2, 1)`
      wheelRef.current.style.transform = `rotate(${finalRotation}deg)`

      currentRotation.current = finalRotation

      // Wait for spin to end, then auto-claim after 1 second
      setTimeout(() => {
        // Auto-claim after 1 second delay
        setTimeout(() => {
          setCanClaim(true)
          setIsSpinning(false)
          handleClaimRef.current()
        }, 1000)
      }, spinDuration * 1000)
    }
  }, [isSpinning, spinResult, sliceSize])

  const [isClaiming, setIsClaiming] = useState(false)

  const handleClaim = async (autoClaim = false) => {
    if ((!canClaim && !autoClaim) || isClaiming) return

    setIsClaiming(true)
    const claimRes = await claimPrizeWheelReward(encounter.id)

    if (claimRes.success) {
      // Check if there are any rewards to determine win/loss
      const hasRewards =
        claimRes.summary &&
        ((claimRes.summary.items && claimRes.summary.items.length > 0) ||
          (claimRes.summary.currency && claimRes.summary.currency.length > 0) ||
          (claimRes.summary.pokemon && claimRes.summary.pokemon.length > 0) ||
          (claimRes.summary.cards && claimRes.summary.cards.length > 0))

      if (hasRewards) {
        playSfx('good')
      } else {
        playSfx('bad')
      }

      const completeResult = await completeResearchEncounter(
        encounter.id,
        hasRewards,
      )
      const summaryWithProgress = {
        ...claimRes.summary,
        expeditionProgress:
          completeResult.expeditionProgress ||
          (completeResult.summary as any)?.expeditionProgress,
      }

      setResult({
        success: hasRewards,
        rewards: summaryWithProgress,
        message: hasRewards ? 'Congratulations!' : 'Better Luck Next Time',
        title: hasRewards ? 'WINNER' : 'LOSER',
      })
      refreshUser(true)
      setIsClaiming(false)
    } else {
      console.error('Failed to claim prize:', claimRes.error)
      setIsClaiming(false)
    }
  }

  // Keep ref updated for useEffect access
  useEffect(() => {
    handleClaimRef.current = () => handleClaim(true)
  })

  const handleExit = async () => {
    router.push('/game/explore')
  }

  return (
    <div className="relative min-h-dvh flex flex-col font-sans overflow-hidden game-night bg-game-night-canvas select-none touch-none">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {encounter.settings.background ? (
          <Image
            src={encounter.settings.background}
            alt="Background"
            fill
            className="object-cover opacity-50"
            priority
          />
        ) : (
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-950 via-zinc-950 to-black" />
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 pb-32">
        {/* Pointer */}
        <div className="absolute top-[18%] z-30 pointer-events-none drop-shadow-xl translate-y-2">
          <ChevronDown
            className="w-16 h-16 filter drop-shadow-lg"
            style={{
              color: encounter.settings.themeColour || '#14b8a6',
              fill: encounter.settings.themeColour || '#14b8a6',
            }}
          />
        </div>

        {/* Wheel Container */}
        <div
          className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full shadow-2xl border-[8px] overflow-hidden"
          style={{
            borderColor: encounter.settings.themeColour || '#27272a',
            backgroundColor: encounter.settings.themeColour
              ? `color-mix(in srgb, ${encounter.settings.themeColour} 60%, black)`
              : '#18181b',
          }}
        >
          <div
            ref={wheelRef}
            className="w-full h-full relative rounded-full overflow-hidden"
            style={{
              transformOrigin: '50% 50%',
              background: `conic-gradient(from 0deg, ${slots.map((s, i) => `${s.color} ${i * (100 / slots.length)}% ${(i + 1) * (100 / slots.length)}%`).join(', ')})`,
            }}
          >
            {slots.map((slot, i) => {
              const angle = i * sliceSize + sliceSize / 2
              // Correction: CSS 0deg is Right, Conic 0deg is Top. Offset by -90deg.
              const renderAngle = angle - 90

              return (
                <div
                  key={slot.id}
                  className="absolute left-1/2 top-1/2 flex flex-col items-center justify-center font-bold text-[#f7ecd6]"
                  style={{
                    width: '60px',
                    height: '60px',
                    marginLeft: '-30px',
                    marginTop: '-30px',
                    transform: `rotate(${renderAngle}deg) translate(clamp(100px, 35%, 140px)) rotate(${-renderAngle}deg)`,
                  }}
                >
                  <div className="relative mb-1 h-12 w-12 drop-shadow-md">
                    <TaskIconDisplay
                      icon={
                        (typeof slot.icon === 'string'
                          ? { type: 'item', id: slot.icon }
                          : slot.icon) || { type: 'lucide', id: 'star' }
                      }
                      className="w-full h-full"
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Center Hub */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 shadow-xl flex items-center justify-center z-20"
            style={{
              backgroundColor: encounter.settings.themeColour
                ? `color-mix(in srgb, ${encounter.settings.themeColour} 60%, black)`
                : '#18181b',
              borderColor: encounter.settings.themeColour
                ? `color-mix(in srgb, ${encounter.settings.themeColour} 40%, black)`
                : '#3f3f46',
            }}
          >
            <div
              className="w-10 h-10 rounded-full animate-pulse border"
              style={{
                backgroundColor: encounter.settings.themeColour
                  ? `color-mix(in srgb, ${encounter.settings.themeColour} 80%, black)`
                  : '#27272a',
                borderColor: encounter.settings.themeColour
                  ? `color-mix(in srgb, ${encounter.settings.themeColour} 50%, black)`
                  : '#52525b',
              }}
            />
          </div>
        </div>
      </div>

      {/* Controls Section (Fixed Bottom) */}
      <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-4 px-4 z-50 pb-safe">
        {/* Prizes Modal */}
        <PrizesModal encounter={encounter} />

        {cost && costCurrency && !canClaim ? (
          <div className="flex items-center gap-2 rounded-full border border-game-border bg-game-surface-raised px-4 py-2 text-sm font-semibold text-game-ink shadow-sm">
            <ItemSprite
              itemId={costCurrency.iconId}
              alt={costCurrency.name}
              className="h-5 w-5"
            />
            <span>
              {cost.amount} {costCurrency.name}
            </span>
            <span
              className={cn(
                'text-game-muted',
                !canAfford && 'text-game-clay-strong',
              )}
            >
              {userBalance} held
            </span>
          </div>
        ) : null}

        {canClaim ? (
          <Button
            type="button"
            size="lg"
            onClick={() => handleClaim()}
            disabled={isClaiming}
            aria-busy={isClaiming}
            className={cn(
              'h-12 w-full max-w-md text-base !text-game-cream',
              isClaiming && 'opacity-80 cursor-wait',
            )}
            style={{
              background: encounter.settings.themeColour
                ? `linear-gradient(to right, ${encounter.settings.themeColour}, color-mix(in srgb, ${encounter.settings.themeColour} 80%, black))`
                : 'linear-gradient(to right, #14b8a6, #0d9488)',
              borderBottomColor: encounter.settings.themeColour
                ? `color-mix(in srgb, ${encounter.settings.themeColour} 40%, black)`
                : '#115e59',
            }}
          >
            {isClaiming ? (
              <Loader2 className="h-6 w-6 animate-spin text-game-cream" />
            ) : (
              'CLAIM PRIZE'
            )}
          </Button>
        ) : (
          <Button
            type="button"
            size="lg"
            disabled={isSpinning || !canAfford}
            onClick={handleSpin}
            aria-busy={isSpinning}
            className={cn('h-12 w-full max-w-md text-base !text-game-cream')}
            style={{
              background: encounter.settings.themeColour
                ? `linear-gradient(to right, ${encounter.settings.themeColour}, color-mix(in srgb, ${encounter.settings.themeColour} 80%, black))`
                : 'linear-gradient(to right, #14b8a6, #0d9488)',
              borderBottomColor: encounter.settings.themeColour
                ? `color-mix(in srgb, ${encounter.settings.themeColour} 40%, black)`
                : '#115e59',
            }}
          >
            {isSpinning ? <Loader2 className="w-8 h-8 animate-spin" /> : 'SPIN'}
          </Button>
        )}
      </div>

      {/* Result Overlay */}
      {result && (
        <RewardResultOverlay
          result={result}
          onClose={handleExit}
          title={result.title}
          message={result.message}
          icon={encounter.icon}
          iconAlt={encounter.name}
          secondaryAction={
            initialState?.encounter?.isEligibleForReplay ||
            encounter?.isEligibleForReplay ? (
              <Button
                size="lg"
                onClick={async () => {
                  try {
                    const res = await startResearchEncounter(
                      (initialState?.encounter || encounter).id,
                      true,
                    )
                    if (res?.success) {
                      window.location.reload()
                    } else {
                      window.location.href = '/game/explore'
                    }
                  } catch (e) {
                    window.location.href = '/game/explore'
                  }
                }}
                className="w-full"
              >
                Play Again
              </Button>
            ) : undefined
          }
        />
      )}
    </div>
  )
}
