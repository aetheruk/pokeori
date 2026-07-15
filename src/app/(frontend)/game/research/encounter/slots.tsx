'use client'

import {
  Banknote,
  Check,
  Coins,
  DoorOpen,
  Info,
  LogOut,
  Play,
  Sparkles,
  Trophy,
  X,
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { Badge } from '@/components/ui/badge'
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
  SlotGameConfig,
  SlotPayline,
  SlotSymbol,
} from '@/data/games/slots/types'
import { useGameMusic } from '@/hooks/useGameMusic'
import { cn } from '@/lib/utils'
import { completeResearchEncounter, startResearchEncounter } from '../actions'
import { spinSlotMachine } from '../games/slots'

interface SlotGameProps {
  encounter: SlotGameConfig
  initialState?: any
}

// Visual component for a single reel
function Reel({
  symbol,
  spinning,
  symbols,
  stopDelay = 0,
}: {
  symbol: string
  spinning: boolean
  symbols: SlotSymbol[]
  stopDelay?: number
}) {
  const [currentSymbol, setCurrentSymbol] = useState(symbol)
  const [isBlurry, setIsBlurry] = useState(false)
  const animationRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)

  // Find the symbol object
  const symbolData = symbols.find((s) => s.id === currentSymbol) || symbols[0]

  useEffect(() => {
    if (spinning) {
      setIsBlurry(true)
      // Cycle symbols rapidly
      const spin = (time: number) => {
        if (!startTimeRef.current) startTimeRef.current = time
        const elapsed = time - startTimeRef.current

        // Change symbol every 50ms
        if (Math.floor(elapsed / 50) % 2 === 0) {
          const random = symbols[Math.floor(Math.random() * symbols.length)]
          setCurrentSymbol(random.id)
        }

        animationRef.current = requestAnimationFrame(spin)
      }
      animationRef.current = requestAnimationFrame(spin)
    } else {
      // Stop spinning after delay
      setTimeout(() => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current)
        setCurrentSymbol(symbol)
        setIsBlurry(false)
        startTimeRef.current = 0
      }, stopDelay)
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [spinning, symbol, symbols, stopDelay])

  return (
    <div className="relative flex h-32 w-24 items-center justify-center overflow-hidden border-x-2 border-[#22353d] bg-[#0d1820] shadow-inner">
      {/* Symbol Container */}
      <div
        className={cn(
          'transition-all duration-100 flex items-center justify-center',
          isBlurry
            ? 'blur-sm scale-90 opacity-80 translate-y-[-10px]'
            : 'scale-110 drop-shadow-xl',
        )}
      >
        {symbolData && (
          <TaskIconDisplay icon={symbolData.icon} className="w-16 h-16" />
        )}
      </div>

      {/* Scanlines / Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-10 opacity-20"></div>

      {/* Shine */}
    </div>
  )
}

function PrizesModal({
  encounter,
  currentWinRate,
}: {
  encounter: SlotGameConfig
  currentWinRate?: number
}) {
  const paytable = encounter.settings.paytable || []
  const symbols = encounter.settings.symbols || []

  // Calculate odds
  // Use session win rate if available (from server roll), otherwise default to config
  let winRateVal = 30
  if (currentWinRate !== undefined) {
    winRateVal = currentWinRate
  } else {
    // Fallback to average of config range
    const rawWinRate = encounter.settings.winRate || 30
    winRateVal =
      typeof rawWinRate === 'number'
        ? rawWinRate
        : (rawWinRate.min + rawWinRate.max) / 2
  }

  const winRate = winRateVal / 100
  const totalWeight = paytable.reduce((sum, line) => sum + line.weight, 0)

  // Helper to get icon for id
  const getIcon = (id: string) => {
    return symbols.find((s) => s.id === id)?.icon
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="min-h-11 border-game-border bg-game-surface-raised text-game-ink hover:border-game-ochre hover:text-game-ochre"
        >
          <Trophy className="mr-2 h-4 w-4 text-game-ochre" />
          Prizes
        </Button>
      </DialogTrigger>
      <DialogContent className="game-paper-texture w-[95%] max-w-md rounded-xl border-game-border bg-game-surface p-6 text-game-ink">
        <DialogHeader>
          <DialogTitle className="sr-only">Prizes and Odds</DialogTitle>
          <SectionDivider>Prizes & Odds</SectionDivider>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {paytable.map((line, i) => {
            // Calculate probability: P(Win) * (LineWeight / TotalWeight)
            const probability = winRate * (line.weight / totalWeight)
            // 1 in X chance
            const oneInX = Math.round(1 / probability)
            const percent = (probability * 100).toFixed(1)

            return (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-game-border bg-game-surface-raised p-3"
              >
                {/* Combination */}
                <div className="flex gap-2">
                  {line.icons.map((iconId, j) => {
                    const icon = getIcon(iconId)
                    return (
                      <div
                        key={j}
                        className="flex h-8 w-8 items-center justify-center rounded bg-game-canvas"
                      >
                        {icon ? (
                          <TaskIconDisplay icon={icon} className="w-6 h-6" />
                        ) : (
                          <span className="text-xs">?</span>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Reward & Odds */}
                <div className="text-right">
                  <div className="text-sm font-bold text-game-ochre">
                    {line.rewards[0]?.label || 'Prize'}
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

export function SlotGame({ encounter, initialState }: SlotGameProps) {
  useGameMusic(encounter)
  const { playSfx } = useAudio()
  const { user, refreshUser } = useUser()
  const router = useRouter()

  const currencyConfig = getCurrency(encounter.settings.cost.currencyType)
  const themeColour = encounter.settings.themeColour || '#14b8a6' // Default to teal

  // Game State
  const [spinning, setSpinning] = useState(false)
  const [reels, setReels] = useState<string[]>(['?', '?', '?'])
  const [result, setResult] = useState<any | null>(null)

  const [timeLeft, setTimeLeft] = useState(encounter.settings.timeLimit || 0)
  const [gameEnded, setGameEnded] = useState(false)

  // Initialize reels with random valid symbols
  useEffect(() => {
    if (encounter.settings.symbols && encounter.settings.symbols.length > 0) {
      setReels([
        encounter.settings.symbols[0].id,
        encounter.settings.symbols[0].id,
        encounter.settings.symbols[0].id,
      ])
    }
  }, [encounter.settings.symbols])

  // Timer
  useEffect(() => {
    if (gameEnded || !encounter.settings.timeLimit || timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft((p) => {
        if (p <= 1) {
          handleLeave()
          return 0
        }
        return p - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [gameEnded, timeLeft, encounter.settings.timeLimit])

  const handleSpin = async () => {
    if (spinning || gameEnded) return

    // Check balance
    const cost = encounter.settings.cost
    const balance = user?.currency?.[cost.currencyType] || 0
    if (balance < cost.amount) {
      // Show error? For now just return
      // Ideally toast or shake animation
      return
    }

    setSpinning(true)

    // Call API
    const res = await spinSlotMachine()

    if (!res.success) {
      console.error(res.error)
      setSpinning(false)
      // Handle error
      return
    }

    // Refresh user to update balance UI
    refreshUser(false)

    // Wait for minimum spin time (e.g. 1.5s)
    setTimeout(() => {
      setReels(res.icons || ['?', '?', '?'])
      setSpinning(false)

      // Handle Win Display
      if (res.rewards) {
        playSfx('good')
        let label = 'WIN!'
        const payline = encounter.settings.paytable?.find(
          (p) =>
            p.icons[0] === res.icons[0] &&
            p.icons[1] === res.icons[1] &&
            p.icons[2] === res.icons[2],
        )
        if (payline?.rewards[0].label) {
          label = payline.rewards[0].label
        }

        toast.success(label, {
          description: 'Added to your session winnings',
        })
      }
    }, 1500)
  }

  const handleLeave = async () => {
    if (spinning) return // Can't leave while spinning
    setGameEnded(true)

    const res = await completeResearchEncounter(encounter.id, true)

    setResult({
      success: true,
      message: 'Session Ended',
      rewards: res.summary,
    })
  }

  return (
    <div className="relative min-h-dvh flex flex-col font-sans overflow-hidden game-night bg-game-night-canvas select-none touch-none">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {encounter.settings.backgroundImage ? (
          <Image
            src={encounter.settings.backgroundImage}
            alt="Background"
            fill
            className="object-cover opacity-50"
            priority
          />
        ) : (
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950 via-zinc-950 to-black" />
        )}
      </div>

      {/* UI Header */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-50">
        {/* Balance - Teal Chip Style */}
        <div className="flex flex-col gap-2 items-center w-full pointer-events-none">
          <div className="flex -translate-y-2 items-center gap-3 rounded-full border border-game-border bg-game-surface-raised px-4 py-1.5 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-game-ink">
              {currencyConfig ? (
                <ItemSprite
                  itemId={currencyConfig.iconId}
                  alt={currencyConfig.name}
                  className="w-5 h-5 object-contain pixelated"
                  width={20}
                  height={20}
                />
              ) : (
                <Coins className="h-3.5 w-3.5 text-game-ochre" />
              )}
              {user?.currency?.[
                encounter.settings.cost.currencyType
              ]?.toLocaleString()}
            </div>
            <div className="h-3 w-px bg-game-border" />
            <div className="text-xs font-bold uppercase tracking-wider text-game-muted">
              BET: {encounter.settings.cost.amount}
            </div>
          </div>
        </div>

        {/* Leave Button - Top Right Icon */}
        <div className="absolute top-4 right-4">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full border border-game-night-border/60 bg-game-night-surface/85 text-game-night-ink shadow-lg transition-colors hover:bg-game-night-surface-raised hover:text-game-night-ink"
            onClick={handleLeave}
            disabled={spinning}
            aria-label="Leave slots"
          >
            <DoorOpen className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 pb-32">
        {/* Reels Viewport */}
        <div
          className="relative flex scale-125 gap-1 overflow-hidden rounded-lg border-4 bg-[#081014] p-2 shadow-xl"
          style={{
            borderColor: `color-mix(in srgb, ${themeColour} 50%, black)`,
          }}
        >
          <Reel
            symbol={reels[0]}
            spinning={spinning}
            symbols={encounter.settings.symbols || []}
            stopDelay={0}
          />
          <div className="z-10 h-32 w-0.5 bg-[#22353d]" />
          <Reel
            symbol={reels[1]}
            spinning={spinning}
            symbols={encounter.settings.symbols || []}
            stopDelay={200}
          />
          <div className="z-10 h-32 w-0.5 bg-[#22353d]" />
          <Reel
            symbol={reels[2]}
            spinning={spinning}
            symbols={encounter.settings.symbols || []}
            stopDelay={400}
          />

          {/* Payline Indicator */}
          <div
            className="absolute top-1/2 left-0 right-0 h-0.5 z-20 pointer-events-none"
            style={{
              backgroundColor: `color-mix(in srgb, ${themeColour} 50%, transparent)`,
            }}
          />
        </div>
      </div>
      {/* Controls Section (Fixed Bottom) */}
      <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-4 px-4 z-50 pb-safe">
        {/* Prizes Button */}
        <PrizesModal
          encounter={encounter}
          currentWinRate={initialState?.slotsSession?.currentWinRate}
        />

        {/* Spin Button - Prominent at Bottom */}
        <Button
          type="button"
          size="lg"
          aria-busy={spinning}
          className={cn('h-12 w-full max-w-md text-base !text-game-cream')}
          style={{
            background: `linear-gradient(to right, ${themeColour}, color-mix(in srgb, ${themeColour} 80%, black))`,
            borderBottomColor: `color-mix(in srgb, ${themeColour} 40%, black)`,
          }}
          onClick={handleSpin}
          disabled={spinning || gameEnded}
        >
          {spinning ? '...' : 'SPIN'}
        </Button>
      </div>

      {/* Exit Overlay */}
      {result && (
        <RewardResultOverlay
          result={result}
          onClose={() => {
            refreshUser()
            router.push('/game/explore')
          }}
          icon={encounter.icon}
          iconAlt={encounter.name}
          title="END"
          message={`Maybe one more go...`}
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
