'use client'

import { AnimatePresence, motion } from 'framer-motion'
import nextDynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import type { AbilityConfig } from '@/data/abilities'
import {
  getPokemonForm,
  getPokemonImageUrl,
  getPokemonSpecies,
} from '@/utilities/pokemon/pokedex'
import {
  attemptAbilityEscape,
  attemptCapture,
  completeEncounterQte,
  getEncounter,
  getQuizQuestion,
  researchEscape,
  runAway,
  submitAnswer,
  useEncounterItem,
} from './actions'

export const dynamic = 'force-dynamic'

import { Backpack, Sparkles } from 'lucide-react'
import { AiOutlineLoading3Quarters as Loader2 } from 'react-icons/ai'
import { FaRunning } from 'react-icons/fa'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ItemSprite } from '@/components/ui/item-sprite'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ResponsivePanel } from '@/components/ui/responsive-panel'
import { SectionDivider } from '@/components/ui/section-divider'
import { items } from '@/data/items'
import {
  getEncounterSecondChanceModifier,
  getTypeLureAnswerEquivalent,
  getTypeLureType,
  isEncounterItemUsableForPokemon,
  isMidEncounterUsableItem,
} from '@/data/items/types'
import { cn } from '@/lib/utils'
import { RewardSummary } from '@/utilities/rewards/reward-logic'

// Dynamic import for CardDrawReveal to reduce initial bundle (framer-motion + canvas-confetti)
const CardDrawReveal = nextDynamic(
  () =>
    import('@/components/tcg/CardDrawReveal').then((mod) => mod.CardDrawReveal),
  {
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950">
        <LoadingSpinner size="lg" />
      </div>
    ),
    ssr: false,
  },
)

import type { CaptureAnimationStatus } from '@/components/CaptureAnimation'
import { CaptureAnimation } from '@/components/CaptureAnimation'
import { MOON_STONE_EVOLVERS, ULTRA_BEASTS } from '@/data/lists/special-pokemon'
import { locations } from '@/data/locations'
import type { TaskExitModal } from '@/data/tasks'
import { tasks } from '@/data/tasks'
import type { TcgCard } from '@/data/tcg/types'
import type { ThrowQuality } from '@/utilities/pokemon/catch-balance'
import {
  applyCatchAbilityModifier,
  applyQuestionBonusToCatchRate,
  getBallQuestionBonus,
  getHardBallCatchRate,
  getThrowQuality,
  getThrowStageBonus,
} from '@/utilities/pokemon/catch-balance'
import type {
  EncounterQteCompletionPayload,
  PublicEncounterQte,
} from '@/utilities/pokemon/encounter-qte'
import type { FlattenedPokemon } from '@/utilities/pokemon/pokedex'
import {
  getPokemonRarityEffect,
  type PokemonRarityId,
} from '@/utilities/pokemon/rarity-effects'
import {
  canUseItemWithSkillRequirements,
  getExplorerEncounterItemLimit,
  getSkillLevel,
} from '@/utilities/skills/unlocks'

// Dynamic import for LevelUpModal to avoid bundling canvas-confetti in initial load
const LevelUpModal = nextDynamic(
  () =>
    import('@/components/game/level-up-modal').then((mod) => mod.LevelUpModal),
  {
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950">
        <LoadingSpinner size="lg" />
      </div>
    ),
    ssr: false,
  },
)

import { GameTimer } from '@/components/game/shared/game-timer'
import { PokemonRaritySprite } from '@/components/game/shared/PokemonRaritySprite'
import { TaskExitDialog } from '@/components/game/task-exit-dialog'
import { CaptureScene } from './_components/capture-scene'
import type { CaptureThrowPayload } from './_components/draggable-pokeball'
import { EncounterQte } from './_components/encounter-qte'
import { EncounterResults } from './_components/encounter-results'
import { QuestionPrompt } from './_components/question-prompt'

interface EncounterData {
  pokemonId: number
  formId: string
  pokemonName: string
  isShiny: boolean
  rarity?: PokemonRarityId
  gender?: 'male' | 'female' | 'genderless'
  startTime: number
  expiry: number
  duration: number
  currentCatchRate: number
  questionsAnsweredCount: number
  shield?: {
    type: 'consecutive' | 'total'
    requiredCorrectAnswers: number
    regenSeconds?: number
    bubbleColor?: string
    active: boolean
    correctAnswers: number
    consecutiveCorrectAnswers: number
    progress: number
    brokenCount: number
    brokenAt?: number
    nextRegenAt?: number
  }
  fleeRate?: number
  inventory: { itemId: string; quantity: number }[]
  locationId: string
  background?: string
  encounterLevel?: number
  kidMode?: boolean
  itemsUsed?: string[]
  hasCaughtEncounterSpecies?: boolean
  activeAbility?: AbilityConfig
  abilityEscapeAttempted?: boolean
  companionFormId?: string
  companionShiny?: boolean
  companionLevel?: number
  formResearchLevel?: number
  isEligibleForReplay?: boolean
  specialEncounter?: {
    type: 'silph-scope-ghost'
    requiredItemId: string
    hasRequiredItem: boolean
    failMessage?: string
  }
  qte?: PublicEncounterQte
}

interface Question {
  id: string
  attemptId?: string
  question: string
  options: Array<
    | string
    | {
        value: string
        label: string
        disabledUntil?: number
        highlighted?: boolean
        highlightedUntil?: number
      }
  >
}

function getBallAdjustedCatchRate(
  ballId: string,
  species: FlattenedPokemon | null,
  pokemonId: number,
  formId: string,
  locationId: string,
  currentCatchRate: number,
  turnCount: number,
  targetLevel: number,
  userActiveLevel: number | undefined,
  hasCaughtEncounterSpecies: boolean,
  isShadow: boolean,
  activeAbility?: AbilityConfig,
  sourceFormId?: string,
  extraQuestionBonus = 0,
): number {
  const hour = new Date().getHours()
  const baseRate = species?.capture_rate || 100
  const isUltraBeast = ULTRA_BEASTS.includes(pokemonId)
  const hardCatchRate = getHardBallCatchRate({ ballId, isUltraBeast, isShadow })
  if (hardCatchRate !== undefined) return hardCatchRate
  if (ballId === 'master-ball') return 255

  const questionBonus = getBallQuestionBonus({
    ballId,
    species,
    turnCount,
    targetLevel,
    userActiveLevel,
    isCaughtBefore: hasCaughtEncounterSpecies,
    isNight: hour >= 18 || hour < 6,
    isUltraBeast,
    isMoonStoneEvolver: MOON_STONE_EVOLVERS.includes(pokemonId),
  })

  const ballAdjustedRate = applyQuestionBonusToCatchRate(
    currentCatchRate,
    baseRate,
    questionBonus + extraQuestionBonus,
  )

  return applyCatchAbilityModifier(ballAdjustedRate, {
    activeAbility,
    formId,
    speciesId: pokemonId,
    sourceFormId,
    locationId,
    types: species?.types,
    isNight: hour >= 18 || hour < 6,
  })
}

function getEncounterItemSummary(item: (typeof items)[number]): string {
  const secondChanceModifier = getEncounterSecondChanceModifier(item)
  if (secondChanceModifier > 0) {
    return `Second Chance +${secondChanceModifier}%`
  }

  if (getTypeLureType(item.id)) {
    return `Catch Chance +${getTypeLureAnswerEquivalent(item.id)}x`
  }

  if (item.id === 'chaos-stone') return 'Random catch effect'
  if (item.id === 'escape-rope') return 'Escape safely'

  return item.description
}

function isExpiredEncounterResponse(result: any) {
  return (
    !!result?.encounterExpired ||
    result?.error === 'Encounter expired or invalid' ||
    result?.message === 'Encounter expired or invalid'
  )
}

function shouldEnterCaptureFromResponse(result: any) {
  return (
    !!result?.enterCapture ||
    result?.error === 'Time is up!' ||
    result?.message === 'Time is up!'
  )
}

// ---------------------------------------------------------------------------
// CatchRateRing — animated SVG arc progress ring
// ---------------------------------------------------------------------------
function CatchRateRing({ percentage }: { percentage: number }) {
  const size = 52
  const stroke = 4
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (percentage / 100) * circ

  const color =
    percentage >= 67
      ? '#22c55e' // green
      : percentage >= 34
        ? '#f59e0b' // amber
        : '#ef4444' // red

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#27272a"
          strokeWidth={stroke}
        />
        {/* Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 0.4s ease, stroke 0.4s ease',
          }}
        />
      </svg>
      {/* Label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-bold leading-none" style={{ color }}>
          {percentage}%
        </span>
      </div>
    </div>
  )
}

const GLITCH_LINES = [
  'Y00U BETTER LEAAAAAVE!',
  'R//U//N//R//U//N',
  'GEEEET OUUUUUUT!',
  'R//U//N//R//U//N',
  'PAAAAAAAAAAAAIN',
]

function SilphScopeGhostSequence({ stage }: { stage: 'glitch' | 'black' }) {
  return (
    <div className="absolute inset-0 z-[80] overflow-hidden bg-zinc-950 text-violet-200 pointer-events-auto">
      {stage === 'glitch' ? (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.24),transparent_62%)]" />
          <div className="absolute inset-0 opacity-35 bg-[linear-gradient(rgba(192,132,252,0.12)_50%,transparent_50%)] bg-[length:100%_6px]" />
          {Array.from({ length: 34 }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute h-px bg-violet-400/45"
              style={{
                top: `${(index * 37) % 100}%`,
                left: `${(index * 19) % 80}%`,
                width: `${18 + (index % 5) * 12}%`,
              }}
              animate={{
                x: [0, index % 2 === 0 ? 28 : -28, 0],
                opacity: [0.15, 0.9, 0.2],
              }}
              transition={{
                duration: 0.35 + (index % 4) * 0.08,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
          <div className="relative z-10 flex h-full flex-col">
            <div className="h-[28%] flex items-center justify-center">
              <motion.div
                className="font-mono text-5xl font-black tracking-[0.35em] text-fuchsia-300/35 blur-[1px]"
                animate={{
                  x: [-12, 10, -5, 14],
                  y: [0, -4, 3, 0],
                  opacity: [0.18, 0.75, 0.28, 0.6],
                }}
                transition={{ duration: 0.18, repeat: Infinity }}
              >
                ?#?%
              </motion.div>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-3 p-4">
              <motion.div
                className="rounded-3xl border border-fuchsia-400/35 bg-black/75 px-4 py-6 text-center shadow-[0_0_44px_rgba(168,85,247,0.32)]"
                animate={{
                  x: [-4, 5, -9, 2],
                  skewX: [-4, 3, -2, 0],
                  filter: ['blur(0px)', 'blur(1px)', 'blur(0px)'],
                }}
                transition={{ duration: 0.16, repeat: Infinity }}
              >
                <span className="font-mono text-xl font-black uppercase tracking-widest text-fuchsia-100">
                  W#@T !5 T_H@T??!
                </span>
              </motion.div>
              {GLITCH_LINES.slice(0, 5).map((line, index) => (
                <motion.div
                  key={line}
                  className="rounded-2xl border border-violet-400/25 bg-zinc-950/90 px-4 py-4 font-mono text-sm font-black uppercase tracking-[0.25em] text-violet-200 shadow-[inset_0_0_22px_rgba(88,28,135,0.45)]"
                  animate={{
                    x: index % 2 === 0 ? [-18, 22, -6] : [16, -20, 7],
                    opacity: [0.45, 1, 0.35],
                    filter: ['blur(0px)', 'blur(2px)', 'blur(0.5px)'],
                  }}
                  transition={{
                    duration: 0.2 + index * 0.03,
                    repeat: Infinity,
                  }}
                >
                  {line}
                </motion.div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
        />
      )}
    </div>
  )
}

export default function EncounterPage() {
  const router = useRouter()
  const { user, refreshUser } = useUser()
  const [encounter, setEncounter] = useState<EncounterData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(0)
  const [phase, setPhase] = useState<'quiz' | 'capture' | 'result'>('quiz')
  const [catchRate, setCatchRate] = useState(0)
  const [currentLocation, setCurrentLocation] = useState<
    (typeof locations)[0] | null
  >(null)

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [questionLoading, setQuestionLoading] = useState(false)
  const [answerStatus, setAnswerStatus] = useState<
    'correct' | 'incorrect' | null
  >(null)
  const [submittingAnswer, setSubmittingAnswer] = useState(false)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null,
  )
  const [hasRevealedName, setHasRevealedName] = useState(false)

  const [captureResult, setCaptureResult] = useState<{
    success: boolean
    caught: boolean
    pokemonName?: string
    rewards?: RewardSummary
    messages?: string[]
    failMessage?: string
    secondChance?: boolean
    throwQuality?: ThrowQuality
    throwStageBonus?: number
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
  } | null>(null)

  const [showLevelUpModal, setShowLevelUpModal] = useState(false)
  const [taskExitModalData, setTaskExitModalData] =
    useState<TaskExitModal | null>(null)
  const [showTaskExitModal, setShowTaskExitModal] = useState(false)
  const [researchBreakthroughsToReveal, setResearchBreakthroughsToReveal] =
    useState<any[]>([])
  const [currentResearchBreakthrough, setCurrentResearchBreakthrough] =
    useState<any | null>(null)

  const [showCaptureAnimation, setShowCaptureAnimation] = useState(false)
  const [captureAnimationData, setCaptureAnimationData] = useState<{
    ballId: string
    status: CaptureAnimationStatus
    caught?: boolean
    pokemonName?: string
    rewards?: RewardSummary
    messages?: string[]
    secondChance?: boolean
    throwQuality?: ThrowQuality
    throwStageBonus?: number
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
    throwFrom?: { x: number; y: number }
    throwTarget?: { x: number; y: number }
  } | null>(null)
  const [hasAttemptedCapture, setHasAttemptedCapture] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)
  const [captureBallContacted, setCaptureBallContacted] = useState(false)
  const [throwFeedback, setThrowFeedback] = useState<{
    id: number
    quality: ThrowQuality
  } | null>(null)

  const [showCardReveal, setShowCardReveal] = useState(false)
  const [cardsToReveal, setCardsToReveal] = useState<TcgCard[]>([])

  const [showItemsModal, setShowItemsModal] = useState(false)
  const [usingItem, setUsingItem] = useState(false)
  const [ghostStage, setGhostStage] = useState<'glitch' | 'black'>('glitch')
  const [activeQte, setActiveQte] = useState<PublicEncounterQte | null>(null)
  const [submittingQte, setSubmittingQte] = useState(false)
  const [captureRingScale, setCaptureRingScale] = useState(1)
  const pokemonTargetRef = useRef<HTMLDivElement | null>(null)
  const ghostSequenceStartedRef = useRef(false)
  const expiredExitStartedRef = useRef(false)
  const answerFeedbackTimeoutRef = useRef<number | null>(null)

  const clearAnswerFeedbackTimer = useCallback(() => {
    if (answerFeedbackTimeoutRef.current !== null) {
      window.clearTimeout(answerFeedbackTimeoutRef.current)
      answerFeedbackTimeoutRef.current = null
    }
  }, [])

  // Ball selection state
  // Filter balls to only show those the user has in inventory
  const balls = encounter
    ? items.filter(
        (i) =>
          i.category === 'ball' &&
          canUseItemWithSkillRequirements(i, user?.skills) &&
          (encounter.inventory.find((inv) => inv.itemId === i.id)?.quantity ||
            0) > 0,
      )
    : []

  const species = encounter
    ? getPokemonForm(encounter.formId) || getPokemonSpecies(encounter.pokemonId)
    : null
  const maxEncounterItems = getExplorerEncounterItemLimit(
    getSkillLevel(user?.skills, 'catching'),
  )
  const encounterItemsUsed = encounter?.itemsUsed?.length || 0
  const encounterItemsRemaining = Math.max(
    0,
    maxEncounterItems - encounterItemsUsed,
  )

  const [selectedBallIndex, setSelectedBallIndex] = useState(0)

  // Audio from context
  const { playSfx, playMusic, stopMusic } = useAudio()

  const exitExpiredEncounter = useCallback(
    (result?: any) => {
      if (expiredExitStartedRef.current) return
      expiredExitStartedRef.current = true
      toast.error(result?.error || result?.message || 'Encounter expired')
      setActiveQte(null)
      setCurrentQuestion(null)
      setSelectedOptionIndex(null)
      setAnswerStatus(null)
      clearAnswerFeedbackTimer()
      setSubmittingAnswer(false)
      setShowItemsModal(false)
      setShowCaptureAnimation(false)
      setCaptureAnimationData(null)
      setCaptureBallContacted(false)
      setThrowFeedback(null)
      setIsCapturing(false)
      setHasAttemptedCapture(false)
      setSubmittingQte(false)
      setUsingItem(false)
      setEncounter(null)
      setLoading(true)
      stopMusic({ fade: true })
      router.replace('/game/explore')
    },
    [clearAnswerFeedbackTimer, router, stopMusic],
  )

  const enterCaptureFromTimeUp = useCallback(() => {
    setActiveQte(null)
    setCurrentQuestion(null)
    setSelectedOptionIndex(null)
    setAnswerStatus(null)
    clearAnswerFeedbackTimer()
    setSubmittingAnswer(false)
    setShowItemsModal(false)
    setSubmittingQte(false)
    setUsingItem(false)
    setTimeLeft(0)
    setPhase('capture')
  }, [clearAnswerFeedbackTimer])

  // Start music on mount
  useEffect(() => {
    if (!currentLocation || phase === 'result') return
    const musicUrl = currentLocation.music || '/music/battle.mp3'
    playMusic(musicUrl, { loop: true, volume: 0.3 })
  }, [currentLocation, playMusic]) // eslint-disable-line react-hooks/exhaustive-deps

  // Stop music when encounter ends
  useEffect(() => {
    if (phase === 'result') {
      stopMusic({ fade: true })
    }
  }, [phase, stopMusic])

  useEffect(() => {
    return () => clearAnswerFeedbackTimer()
  }, [clearAnswerFeedbackTimer])

  // Helper functions using audio context
  const playSelectSfx = () => playSfx('select')
  const playGoodSfx = () => playSfx('good')
  const playBadSfx = () => playSfx('bad')

  useEffect(() => {
    if (
      phase !== 'capture' ||
      showCaptureAnimation ||
      isCapturing ||
      hasAttemptedCapture
    ) {
      setCaptureRingScale(1)
      return
    }

    let frame = 0
    const startedAt = Date.now()
    const tick = () => {
      const elapsed = (Date.now() - startedAt) % 2200
      setCaptureRingScale(1 - elapsed / 2200)
      frame = window.requestAnimationFrame(tick)
    }
    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [hasAttemptedCapture, isCapturing, phase, showCaptureAnimation])

  useEffect(() => {
    const init = async () => {
      const data = await getEncounter()
      if (!data) {
        router.replace('/game/explore')
        return
      }
      setEncounter(data)
      const location = locations.find((loc) => loc.id === data.locationId)
      setCurrentLocation(location || null)
      setCatchRate(data.currentCatchRate)
      setActiveQte(data.qte || null)
      setLoading(false)
      if (
        data.specialEncounter?.type !== 'silph-scope-ghost' ||
        data.specialEncounter.hasRequiredItem
      ) {
        loadNextQuestion(data.pokemonId, data.kidMode, data.formId)
      }
    }
    init()
  }, [router])

  const isSilphScopeGhostLocked =
    encounter?.specialEncounter?.type === 'silph-scope-ghost' &&
    !encounter.specialEncounter.hasRequiredItem

  useEffect(() => {
    if (
      !isSilphScopeGhostLocked ||
      !encounter ||
      ghostSequenceStartedRef.current
    ) {
      return
    }

    ghostSequenceStartedRef.current = true
    const blackTimer = window.setTimeout(() => {
      setGhostStage('black')
      playBadSfx()
    }, 2800)
    const failTimer = window.setTimeout(async () => {
      const result = await runAway()
      setCaptureResult({
        success: true,
        caught: false,
        failMessage:
          encounter.specialEncounter?.failMessage ||
          'The ghostly presence forced you away.',
        pokemonName: 'Ghost',
        expeditionProgress: (result as any).expeditionProgress,
      })
      setPhase('result')
    }, 3700)

    return () => {
      window.clearTimeout(blackTimer)
      window.clearTimeout(failTimer)
    }
  }, [isSilphScopeGhostLocked, encounter])

  useEffect(() => {
    if (!encounter) return

    const interval = setInterval(() => {
      const now = Date.now()
      const remaining = Math.max(0, Math.ceil((encounter.expiry - now) / 1000))
      setTimeLeft(remaining)

      if (remaining <= 0 && phase === 'quiz') {
        setPhase('capture')
      }
    }, 100)

    return () => clearInterval(interval)
  }, [encounter, phase])

  const loadNextQuestion = async (
    pokemonId: number,
    kidMode?: boolean,
    formId?: string,
  ) => {
    setQuestionLoading(true)
    const q = await getQuizQuestion(pokemonId, kidMode, formId)
    if (q) {
      clearAnswerFeedbackTimer()
      setAnswerStatus(null)
      setSelectedOptionIndex(null)
      setCurrentQuestion(q)
    }
    setQuestionLoading(false)
  }

  const showBundledNextQuestion = useCallback(
    (question: Question) => {
      clearAnswerFeedbackTimer()
      answerFeedbackTimeoutRef.current = window.setTimeout(() => {
        setCurrentQuestion(question)
        setQuestionLoading(false)
        setAnswerStatus(null)
        setSelectedOptionIndex(null)
        answerFeedbackTimeoutRef.current = null
      }, 300)
    },
    [clearAnswerFeedbackTimer],
  )

  const applyPromptResult = useCallback(
    (result: any) => {
      if (!encounter) return false

      const hasQtePayload = Object.hasOwn(result, 'qte')
      setEncounter((prev) =>
        prev
          ? {
              ...prev,
              currentCatchRate: result.newCatchRate ?? prev.currentCatchRate,
              questionsAnsweredCount: (prev.questionsAnsweredCount || 0) + 1,
              shield:
                result.shield !== undefined
                  ? result.shield || undefined
                  : prev.shield,
              expiry: result.newExpiry ?? prev.expiry,
              duration: result.newExpiry
                ? Math.floor((result.newExpiry - prev.startTime) / 1000)
                : prev.duration,
              qte: hasQtePayload ? result.qte || undefined : prev.qte,
            }
          : prev,
      )
      if (hasQtePayload) {
        setActiveQte(result.qte || null)
        if (result.qte) {
          setCurrentQuestion(null)
        }
      }

      if (result.encounterFailed) {
        playBadSfx()
        setAnswerStatus('incorrect')
        setCaptureResult({
          success: true,
          caught: false,
          failMessage: result.failMessage || 'The encounter was lost.',
          pokemonName: encounter.pokemonName,
          formId: result.formId,
          pokemonId: result.pokemonId,
          expeditionProgress: result.expeditionProgress,
        })
        if (result.abilityLost) {
          void refreshUser()
        }
        setPhase('result')
        return false
      }

      if (result.correct) {
        playGoodSfx()
        setAnswerStatus('correct')
        setHasRevealedName(true)
        if (result.newCatchRate !== undefined) {
          setCatchRate(result.newCatchRate)
          if (result.newCatchRate >= 255) {
            setPhase('capture')
          }
        }
        if (result.abilityMessage) {
          toast.success(result.abilityMessage)
        }
      } else {
        playBadSfx()
        setAnswerStatus('incorrect')
        if (result.newCatchRate !== undefined) {
          setCatchRate(result.newCatchRate)
        }
      }

      clearAnswerFeedbackTimer()
      answerFeedbackTimeoutRef.current = window.setTimeout(() => {
        setAnswerStatus(null)
        setSelectedOptionIndex(null)
        answerFeedbackTimeoutRef.current = null
      }, 600)

      return !result.qte && (result.newCatchRate ?? 0) < 255
    },
    [clearAnswerFeedbackTimer, encounter, refreshUser],
  )

  const handleAnswer = useCallback(
    async (answer: string, idx: number) => {
      if (!currentQuestion || !encounter || submittingAnswer) return

      setSelectedOptionIndex(idx)
      setSubmittingAnswer(true)
      try {
        const result = await submitAnswer(
          currentQuestion.id,
          answer,
          currentQuestion.attemptId,
          idx,
        )
        if (result.success) {
          const shouldLoadQuestion = applyPromptResult(result)
          if (shouldLoadQuestion) {
            if ((result as any).nextQuestion) {
              showBundledNextQuestion((result as any).nextQuestion)
            } else {
              loadNextQuestion(
                encounter.pokemonId,
                encounter.kidMode,
                encounter.formId,
              )
            }
          }
        } else if (shouldEnterCaptureFromResponse(result)) {
          enterCaptureFromTimeUp()
        } else if (isExpiredEncounterResponse(result)) {
          exitExpiredEncounter(result)
        } else {
          setSelectedOptionIndex(null)
          toast.error((result as any).error || 'Failed to submit answer')
        }
      } finally {
        setSubmittingAnswer(false)
      }
    },
    [
      applyPromptResult,
      currentQuestion,
      encounter,
      enterCaptureFromTimeUp,
      exitExpiredEncounter,
      showBundledNextQuestion,
      submittingAnswer,
    ],
  )

  const handleCapture = useCallback(
    async (throwInput: CaptureThrowPayload) => {
      if (isCapturing) return
      const ball = balls[selectedBallIndex]
      if (!ball) return

      // Play select sound effect
      playSelectSfx()

      setIsCapturing(true)
      setHasAttemptedCapture(true)
      setCaptureBallContacted(false)
      setThrowFeedback({
        id: Date.now(),
        quality: getThrowQuality(throwInput),
      })
      setCaptureAnimationData({
        ballId: ball.id,
        status: 'pending',
        throwQuality: getThrowQuality(throwInput),
        throwFrom: throwInput.visual.from,
        throwTarget: throwInput.visual.target,
      })
      setShowCaptureAnimation(true)

      try {
        const result = await attemptCapture(ball.id, {
          ringScale: throwInput.ringScale,
          aimOffset: throwInput.aimOffset,
        })
        if (result.success && 'caught' in result) {
          const captureData = result as {
            success: boolean
            caught: boolean
            pokemonName?: string
            rewards?: RewardSummary
            messages?: string[]
            secondChance?: boolean
            throwQuality?: ThrowQuality
            throwStageBonus?: number
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
          }
          setCaptureAnimationData((current) => ({
            ballId: current?.ballId || ball.id,
            status: captureData.caught ? 'caught' : 'failed',
            caught: captureData.caught,
            pokemonName: captureData.pokemonName,
            rewards: captureData.rewards,
            messages: captureData.messages,
            secondChance: captureData.secondChance,
            throwQuality: captureData.throwQuality,
            throwStageBonus: captureData.throwStageBonus,
            expeditionProgress: captureData.expeditionProgress,
            throwFrom: current?.throwFrom ?? throwInput.visual.from,
            throwTarget: current?.throwTarget ?? throwInput.visual.target,
          }))
          // refreshUser() - Deferred to result screen exit

          // Check for card rewards
          const rewards = captureData.rewards
          if (rewards && rewards.cards.length > 0) {
            // Map RewardSummary cards to TcgCard format for display
            // We might need to fetch full card data if RewardSummary doesn't have enough
            // But for now let's try to map what we have
            const cards = rewards.cards.map((c) => ({
              id: c.id,
              name: c.name,
              images: c.images || { small: '', large: '' },
              rarity: c.rarity || 'Common',
              // Fill other required TcgCard fields with defaults/placeholders
              number: '',
              artist: null,
              supertype: 'Pokémon',
              subtypes: [],
              nationalPokedexNumbers: [],
              isNew: c.isNew,
            })) as TcgCard[]
            setCardsToReveal(cards)
          }
        } else {
          if (isExpiredEncounterResponse(result)) {
            exitExpiredEncounter(result)
            return
          }
          toast.error(result.message || 'Capture failed')
          setCaptureAnimationData((current) =>
            current
              ? { ...current, status: 'error', caught: false }
              : {
                  ballId: ball.id,
                  status: 'error',
                  caught: false,
                  throwFrom: throwInput.visual.from,
                  throwTarget: throwInput.visual.target,
                },
          )
        }
      } catch (error) {
        // Log errors only in development
        if (process.env.NODE_ENV === 'development') {
          console.error(error)
        }
        toast.error('An error occurred')
        setCaptureAnimationData((current) =>
          current
            ? { ...current, status: 'error', caught: false }
            : {
                ballId: ball.id,
                status: 'error',
                caught: false,
                throwFrom: throwInput.visual.from,
                throwTarget: throwInput.visual.target,
              },
        )
      }
    },
    [isCapturing, balls, selectedBallIndex, exitExpiredEncounter],
  )

  const handleQteComplete = useCallback(
    async (payload: EncounterQteCompletionPayload) => {
      if (!activeQte || submittingQte) return
      setSubmittingQte(true)
      try {
        const response = await completeEncounterQte(activeQte.id, payload)
        if (response.success) {
          setActiveQte(null)
          const shouldLoadQuestion = applyPromptResult(response)
          if (shouldLoadQuestion && encounter) {
            if ((response as any).nextQuestion) {
              showBundledNextQuestion((response as any).nextQuestion)
            } else {
              loadNextQuestion(
                encounter.pokemonId,
                encounter.kidMode,
                encounter.formId,
              )
            }
          }
        } else if (shouldEnterCaptureFromResponse(response)) {
          enterCaptureFromTimeUp()
        } else if (isExpiredEncounterResponse(response)) {
          exitExpiredEncounter(response)
        } else {
          setActiveQte(null)
        }
      } finally {
        setSubmittingQte(false)
      }
    },
    [
      activeQte,
      applyPromptResult,
      encounter,
      enterCaptureFromTimeUp,
      exitExpiredEncounter,
      showBundledNextQuestion,
      submittingQte,
    ],
  )

  const handleCaptureAnimationComplete = useCallback(
    (rewards?: RewardSummary) => {
      setShowCaptureAnimation(false)
      if (captureAnimationData?.status === 'error') {
        setHasAttemptedCapture(false)
        setCaptureAnimationData(null)
        setCaptureBallContacted(false)
        setThrowFeedback(null)
        setIsCapturing(false)
        return
      }

      if (!captureAnimationData?.caught && captureAnimationData?.secondChance) {
        toast.success('The Pokemon stayed nearby. Try again!')
        setHasAttemptedCapture(false)
        setCaptureAnimationData(null)
        setCaptureBallContacted(false)
        setThrowFeedback(null)
        setIsCapturing(false)
        void getEncounter().then((latest) => {
          if (latest) {
            setEncounter(latest)
            setCatchRate(latest.currentCatchRate)
          }
        })
        return
      }

      setCaptureResult({
        success: true,
        caught: captureAnimationData?.caught || false,
        pokemonName: captureAnimationData?.pokemonName,
        rewards,
        messages: captureAnimationData?.messages,
        secondChance: captureAnimationData?.secondChance,
        expeditionProgress: captureAnimationData?.expeditionProgress,
      })

      if (rewards?.levelUp) {
        setShowLevelUpModal(true)
      }

      const rewardTaskExitModal =
        rewards?.taskExitModals && rewards.taskExitModals.length > 0
          ? rewards.taskExitModals[0]
          : null

      if (rewardTaskExitModal) {
        setTaskExitModalData(rewardTaskExitModal)
        if (cardsToReveal.length === 0) {
          setShowTaskExitModal(true)
        }
      } else if (rewards?.tasksCompleted && rewards.tasksCompleted.length > 0) {
        // Find the first task with an exit modal
        for (const completedTask of rewards.tasksCompleted) {
          const task = tasks.find((t) => t.id === completedTask.id)
          if (task?.exitModal) {
            setTaskExitModalData(task.exitModal)
            // Show modal after card reveal completes, or immediately if no cards
            if (cardsToReveal.length === 0) {
              setShowTaskExitModal(true)
            }
            break // Only show one task exit modal
          }
        }
      }

      if (
        rewards?.researchBreakthroughs &&
        rewards.researchBreakthroughs.length > 0
      ) {
        setResearchBreakthroughsToReveal(rewards.researchBreakthroughs.slice(1))
        setCurrentResearchBreakthrough(rewards.researchBreakthroughs[0])
      }

      setIsCapturing(false)

      // Show card reveal if there are cards
      if (cardsToReveal.length > 0) {
        setShowCardReveal(true)
      } else {
        setPhase('result')
      }
    },
    [captureAnimationData, cardsToReveal.length],
  )

  const handleCaptureAnimationContact = useCallback(() => {
    setCaptureBallContacted(true)
  }, [])

  const handleCaptureAnimationResolve = useCallback(
    (status: CaptureAnimationStatus) => {
      playSfx(status === 'caught' ? 'catch' : 'escape')
    },
    [playSfx],
  )

  const nextBall = useCallback(() => {
    playSelectSfx()
    setSelectedBallIndex((prev) => (prev + 1) % balls.length)
  }, [balls.length])

  const prevBall = useCallback(() => {
    playSelectSfx()
    setSelectedBallIndex((prev) => (prev - 1 + balls.length) % balls.length)
  }, [balls.length])

  const handleRunAway = useCallback(async () => {
    // Play flee sound effect
    playSfx('flee')

    try {
      const result = await runAway()
      if (!result.success) {
        if (isExpiredEncounterResponse(result)) {
          exitExpiredEncounter(result)
          return
        }
        toast.error(result.message || 'Failed to run away')
        return
      }

      setCaptureResult({
        success: true,
        caught: false,
        failMessage: result.message || "You didn't attempt a capture.",
        pokemonName: encounter?.pokemonName,
        expeditionProgress: (result as any).expeditionProgress,
      })
      setPhase('result')
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error running away:', error)
      }
      // Even on error, we should probably exit
      router.replace('/game/explore')
    }
  }, [router, encounter, exitExpiredEncounter, playSfx])

  const handleUseItem = useCallback(
    async (itemId: string) => {
      if (usingItem || !encounter) return
      setUsingItem(true)
      try {
        const result = await useEncounterItem(itemId)
        if (result.success) {
          // Update local state
          const updatedEncounter = { ...encounter }

          if (result.newCatchRate !== undefined) {
            updatedEncounter.currentCatchRate = result.newCatchRate
            setCatchRate(result.newCatchRate)
          }
          if ((result as any).shield !== undefined) {
            updatedEncounter.shield = (result as any).shield || undefined
          }

          // Add to itemsUsed
          updatedEncounter.itemsUsed = [
            ...(updatedEncounter.itemsUsed || []),
            itemId,
          ]

          // Update Inventory in local state
          updatedEncounter.inventory = updatedEncounter.inventory
            .map((i) => {
              if (i.itemId === itemId) return { ...i, quantity: i.quantity - 1 }
              return i
            })
            .filter((i) => i.quantity > 0)

          setEncounter(updatedEncounter)

          if (result.fled) {
            setCaptureResult({
              success: true,
              caught: false,
              failMessage: result.message,
              pokemonName: encounter.pokemonName,
              expeditionProgress: (result as any).expeditionProgress,
            })
            setPhase('result')
          } else {
            toast.success(result.message)
          }
          setShowItemsModal(false)
        } else {
          if (shouldEnterCaptureFromResponse(result)) {
            enterCaptureFromTimeUp()
            return
          }
          if (isExpiredEncounterResponse(result)) {
            exitExpiredEncounter(result)
            return
          }
          toast.error((result as any).error || 'Failed to use item')
        }
      } catch (e) {
        toast.error('Failed to use item')
      } finally {
        setUsingItem(false)
      }
    },
    [usingItem, encounter, enterCaptureFromTimeUp, exitExpiredEncounter],
  )

  const handleAbilityEscape = useCallback(async () => {
    if (usingItem || !encounter) return
    setUsingItem(true)
    try {
      const result = await attemptAbilityEscape()
      if (result.success) {
        if (result.escaped) {
          setCaptureResult({
            success: true,
            caught: false,
            failMessage: result.message || 'Escaped using ability!',
            pokemonName: encounter.pokemonName,
            expeditionProgress: (result as any).expeditionProgress,
          })
          setPhase('result')
        } else {
          toast.error(result.message || 'Ability failed to escape')

          // Refresh encounter state to update abilityEscapeAttempted
          const newEncounter = await getEncounter()
          if (newEncounter) setEncounter(newEncounter)
        }
      } else {
        if (shouldEnterCaptureFromResponse(result)) {
          enterCaptureFromTimeUp()
          return
        }
        if (isExpiredEncounterResponse(result)) {
          exitExpiredEncounter(result)
          return
        }
        toast.error(result.message)
      }
    } catch (e) {
      toast.error('Failed to escape')
    } finally {
      // If we didn't divert to handleUseItem (which we tried to handle), ensure we reset.
      // Ideally we shouldn't reset if we are transitioning to handleUseItem which sets it to true?
      // Let's refactor:
      // If we fall through to finally, we reset.
      // If we called handleUseItem, we probably want to let IT handle the state.
      // But we can't easily prevent finally.
      // A simple solution: check if we are still "capturing" or something?
      // Or just delay the fallback call?
      setUsingItem(false)
    }
  }, [
    usingItem,
    encounter,
    handleUseItem,
    enterCaptureFromTimeUp,
    exitExpiredEncounter,
  ])

  if (loading || !encounter) {
    return (
      <div className="flex justify-center items-center h-dvh">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  const encounterRarity =
    encounter.rarity ?? (encounter.isShiny ? 'shiny' : 'normal')
  const encounterRarityLabel = getPokemonRarityEffect(encounterRarity).label
  const selectedBall =
    phase === 'capture' && balls[selectedBallIndex]
      ? balls[selectedBallIndex]
      : null
  const targetLevel =
    currentLocation?.levelRange?.min ?? encounter?.encounterLevel ?? 1
  const levelBallTargetLevel =
    currentLocation?.levelRange?.max ?? encounter?.encounterLevel ?? targetLevel
  const shieldHasRegenerated =
    !!encounter?.shield &&
    !encounter.shield.active &&
    !!encounter.shield.nextRegenAt &&
    Date.now() >= encounter.shield.nextRegenAt
  const shieldActive =
    !!encounter?.shield && (encounter.shield.active || shieldHasRegenerated)
  const shieldBubbleColor = encounter?.shield?.bubbleColor || '#67e8f9'
  const visibleCatchRate = shieldActive ? 0 : catchRate
  const throwDisplayStageBonus =
    phase === 'capture' && throwFeedback
      ? getThrowStageBonus(throwFeedback.quality)
      : 0
  const adjustedCatchRate = shieldActive
    ? 0
    : selectedBall
      ? getBallAdjustedCatchRate(
          selectedBall.id,
          species,
          encounter?.pokemonId || 0,
          encounter?.formId || '',
          encounter?.locationId || '',
          visibleCatchRate,
          encounter?.questionsAnsweredCount || 0,
          selectedBall.id === 'level-ball' ? levelBallTargetLevel : targetLevel,
          encounter?.companionLevel,
          !!encounter?.hasCaughtEncounterSpecies,
          encounter?.rarity === 'shadow',
          encounter?.activeAbility,
          encounter?.companionFormId,
          throwDisplayStageBonus,
        )
      : applyCatchAbilityModifier(visibleCatchRate, {
          activeAbility: encounter?.activeAbility,
          formId: encounter?.formId || '',
          speciesId: encounter?.pokemonId,
          sourceFormId: encounter?.companionFormId,
          locationId: encounter?.locationId || '',
          types: species?.types,
          isNight: new Date().getHours() >= 18 || new Date().getHours() < 6,
        })

  const catchPercentage = Math.min(
    100,
    Math.round((adjustedCatchRate / 255) * 100),
  )
  const currentThrowQuality = getThrowQuality({ ringScale: captureRingScale })
  const movingRingScale = 0.14 + captureRingScale
  const movingRingClass =
    currentThrowQuality === 'excellent'
      ? 'border-teal-100 shadow-[0_0_26px_rgba(153,246,228,0.9)]'
      : currentThrowQuality === 'great'
        ? 'border-teal-200 shadow-[0_0_22px_rgba(94,234,212,0.72)]'
        : currentThrowQuality === 'nice'
          ? 'border-teal-400 shadow-[0_0_18px_rgba(45,212,191,0.55)]'
          : 'border-white/70 shadow-[0_0_14px_rgba(255,255,255,0.24)]'

  // Show full-screen result screen
  if (phase === 'result' && captureResult) {
    const location = locations.find((l) => l.id === encounter.locationId)
    return (
      <EncounterResults
        captureResult={captureResult as any}
        encounter={encounter}
        locationName={location?.name || 'Location'}
        refreshUser={refreshUser}
        taskExitModalData={taskExitModalData}
        showTaskExitModal={showTaskExitModal}
        setShowTaskExitModal={setShowTaskExitModal}
        setTaskExitModalData={setTaskExitModalData}
        showLevelUpModal={showLevelUpModal}
        setShowLevelUpModal={setShowLevelUpModal}
        currentResearchBreakthrough={currentResearchBreakthrough}
        setCurrentResearchBreakthrough={setCurrentResearchBreakthrough}
        researchBreakthroughsToReveal={researchBreakthroughsToReveal}
        setResearchBreakthroughsToReveal={setResearchBreakthroughsToReveal}
        showCardReveal={showCardReveal}
        setShowCardReveal={setShowCardReveal}
        cardsToReveal={cardsToReveal}
        setCardsToReveal={setCardsToReveal}
        setPhase={setPhase as any}
      />
    )
  }

  return (
    <div className="game-desktop-activity-stage game-activity-chrome game-night relative flex h-dvh w-full flex-col overflow-hidden bg-game-night-canvas text-game-night-ink xl:mx-auto xl:my-4 xl:h-[calc(100dvh-2rem)] xl:max-w-[1180px] xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(20rem,24rem)] xl:grid-rows-[minmax(0,1fr)_auto]">
      {captureResult?.rewards?.levelUp && (
        <LevelUpModal
          open={showLevelUpModal}
          onOpenChange={setShowLevelUpModal}
          newLevel={captureResult.rewards.levelUp.newLevel}
          skillId={captureResult.rewards.levelUp.skillId || 'catching'}
          onClose={() => setShowLevelUpModal(false)}
        />
      )}

      {taskExitModalData && (
        <TaskExitDialog
          data={taskExitModalData}
          open={showTaskExitModal}
          onOpenChange={setShowTaskExitModal}
        />
      )}

      {showCardReveal && (
        <CardDrawReveal
          cards={cardsToReveal}
          onComplete={() => {
            setShowCardReveal(false)
            // Show task exit modal if one is queued
            if (taskExitModalData) {
              setShowTaskExitModal(true)
            } else {
              setPhase('result')
            }
          }}
        />
      )}

      {showCaptureAnimation && captureAnimationData && (
        <CaptureAnimation
          ballId={captureAnimationData.ballId}
          status={captureAnimationData.status}
          throwFrom={captureAnimationData.throwFrom}
          throwTarget={captureAnimationData.throwTarget}
          rewards={captureAnimationData.rewards}
          onComplete={handleCaptureAnimationComplete}
          onContact={handleCaptureAnimationContact}
          onResolve={handleCaptureAnimationResolve}
        />
      )}

      {/* Top 28% - Pokemon Display - Reduced height for better visibility */}
      <div className="relative flex h-[28%] shrink-0 items-center justify-center bg-game-night-canvas xl:col-start-1 xl:row-start-1 xl:h-auto xl:min-h-0">
        {/* Location Background */}
        {(encounter?.background || currentLocation?.background) && (
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${encounter?.background || currentLocation?.background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        )}

        {/* Timer - Top Right */}
        {/* Timer - Top Right */}
        {!isSilphScopeGhostLocked && (
          <div className="absolute top-4 right-4 z-10">
            <GameTimer timeLeft={timeLeft} totalTime={encounter.duration} />
          </div>
        )}

        {/* Catch Rate Arc Ring - Top Left */}
        {!isSilphScopeGhostLocked && (
          <div className="absolute top-3 left-3 z-10">
            <CatchRateRing percentage={catchPercentage} />
          </div>
        )}

        {/* Answer feedback flash overlay on sprite area */}
        <AnimatePresence>
          {answerStatus && (
            <motion.div
              key={answerStatus}
              className={cn(
                'absolute inset-0 z-10 pointer-events-none',
                answerStatus === 'correct'
                  ? 'bg-green-500/20'
                  : 'bg-red-500/20',
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            />
          )}
        </AnimatePresence>

        {/* Pokemon Sprite + Name reveal */}
        <div className="flex flex-col items-center gap-1">
          {encounter.companionFormId && !isSilphScopeGhostLocked && (
            <div className="absolute bottom-2 left-2 z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-game-night-border/60 bg-game-night-surface/80 p-1 shadow-lg backdrop-blur-md md:h-16 md:w-16">
              <Image
                src={getPokemonImageUrl(
                  encounter.companionFormId,
                  'sprite',
                  !!encounter.companionShiny,
                )}
                alt="Companion"
                width={48}
                height={48}
                className="w-full h-full object-contain pixelated"
              />
            </div>
          )}
          <div ref={pokemonTargetRef} className="relative w-40 h-40">
            {phase === 'capture' &&
              !showCaptureAnimation &&
              !isCapturing &&
              !hasAttemptedCapture &&
              !isSilphScopeGhostLocked && (
                <>
                  <div className="pointer-events-none absolute -inset-5 z-20 rounded-full border border-teal-500/45 bg-teal-500/5 shadow-[0_0_24px_rgba(20,184,166,0.22)]" />
                  <div
                    className="pointer-events-none absolute -inset-5 z-20 rounded-full border border-teal-300/55 bg-teal-300/5 shadow-[0_0_20px_rgba(45,212,191,0.28)]"
                    style={{ transform: 'scale(0.72)' }}
                  />
                  <div
                    className="pointer-events-none absolute -inset-5 z-20 rounded-full border border-teal-100/70 bg-teal-200/8 shadow-[0_0_18px_rgba(153,246,228,0.36)]"
                    style={{ transform: 'scale(0.44)' }}
                  />
                  <div
                    className="pointer-events-none absolute -inset-5 z-20 rounded-full border border-teal-50/95 bg-teal-100/12 shadow-[0_0_24px_rgba(204,251,241,0.62)]"
                    style={{ transform: 'scale(0.21)' }}
                  />
                  <div
                    className={cn(
                      'pointer-events-none absolute -inset-5 z-30 rounded-full border transition-colors duration-75',
                      movingRingClass,
                    )}
                    style={{
                      transform: `scale(${movingRingScale})`,
                      opacity: currentThrowQuality === 'poor' ? 0.56 : 1,
                    }}
                  />
                </>
              )}
            <AnimatePresence>
              {throwFeedback && phase === 'capture' && (
                <motion.div
                  key={throwFeedback.id}
                  className="pointer-events-none absolute left-1/2 top-2 z-30 -translate-x-1/2 rounded-full border border-teal-300/55 bg-teal-950/90 px-3 py-1 text-xs font-black uppercase tracking-wider text-teal-100 shadow-[0_0_18px_rgba(20,184,166,0.35)]"
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: -10, scale: 1 }}
                  exit={{ opacity: 0, y: -22, scale: 0.94 }}
                  transition={{ duration: 0.22 }}
                >
                  {throwFeedback.quality}
                  {throwDisplayStageBonus !== 0 && (
                    <span className="ml-1 text-teal-300">
                      {throwDisplayStageBonus > 0 ? '+' : ''}
                      {throwDisplayStageBonus}
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            {shieldActive && !isSilphScopeGhostLocked && (
              <motion.div
                className="absolute -inset-2 z-10 rounded-full border-4 pointer-events-none"
                style={{
                  borderColor: `color-mix(in srgb, ${shieldBubbleColor} 78%, white)`,
                  backgroundColor: `color-mix(in srgb, ${shieldBubbleColor} 16%, transparent)`,
                  boxShadow: `0 0 34px color-mix(in srgb, ${shieldBubbleColor} 52%, transparent), inset 0 0 28px color-mix(in srgb, ${shieldBubbleColor} 30%, transparent)`,
                }}
                initial={{ scale: 0.86, opacity: 0 }}
                animate={{
                  scale: [1, 1.035, 1],
                  opacity: 1,
                }}
                transition={{
                  scale: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' },
                  opacity: { duration: 0.2 },
                }}
              >
                <div
                  className="absolute inset-3 rounded-full border"
                  style={{
                    borderColor: `color-mix(in srgb, ${shieldBubbleColor} 34%, white)`,
                  }}
                />
              </motion.div>
            )}
            {isSilphScopeGhostLocked ? null : hasAttemptedCapture &&
              !showCaptureAnimation &&
              captureAnimationData?.caught ? (
              // Show the caught ball only after the capture animation has completed.
              <div className="w-full h-full flex items-center justify-center animate-in zoom-in duration-500">
                <ItemSprite
                  itemId={captureAnimationData.ballId}
                  alt="Pokeball"
                  width={128}
                  height={128}
                  className="w-32 h-32 object-contain pixelated drop-shadow-2xl"
                />
              </div>
            ) : captureBallContacted ? null : (
              // Show Pokemon (normal bouncing state)
              <>
                <PokemonRaritySprite
                  formId={encounter.formId}
                  view="home"
                  rarity={encounter.rarity}
                  shiny={encounter.isShiny}
                  female={encounter.gender === 'female'}
                  alt="Pokemon"
                  className="h-full w-full"
                  imageClassName={cn(
                    'pixelated drop-shadow-2xl',
                    !hasAttemptedCapture && 'animate-bounce-slow',
                  )}
                  sizes="160px"
                />
                {encounter.isShiny && (
                  <div className="absolute top-0 right-0 animate-pulse text-2xl text-game-ochre">
                    ✨
                  </div>
                )}
              </>
            )}
          </div>

          {/* Reveal the Pokemon name for normal encounters, or its rarity for variants. */}
          <AnimatePresence>
            {hasRevealedName && !isSilphScopeGhostLocked && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-1 rounded-full border border-game-night-border/60 bg-game-night-surface/85 px-3 py-0.5 text-xs font-semibold text-game-night-ink backdrop-blur-sm"
              >
                {encounterRarity === 'normal'
                  ? encounter.pokemonName
                  : encounterRarityLabel}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div
        className={cn(
          'game-paper-background relative flex flex-1 flex-col justify-center border-t border-game-border bg-game-canvas p-4 text-game-ink xl:col-start-2 xl:row-start-1 xl:row-span-2 xl:min-h-0 xl:border-l xl:border-t-0 xl:p-5',
          phase === 'capture'
            ? 'overflow-visible z-20 lg:overflow-y-auto'
            : 'overflow-hidden lg:overflow-y-auto',
        )}
      >
        <AnimatePresence mode="wait">
          {phase === 'quiz' &&
            (isSilphScopeGhostLocked ? null : activeQte ? (
              <EncounterQte
                qte={activeQte}
                pokemonName={encounter.pokemonName}
                formId={encounter.formId}
                rarity={encounter.rarity}
                shiny={encounter.isShiny}
                gender={encounter.gender}
                onComplete={handleQteComplete}
              />
            ) : (
              <QuestionPrompt
                currentQuestion={currentQuestion}
                questionLoading={questionLoading}
                answerStatus={answerStatus}
                selectedOptionIndex={selectedOptionIndex}
                submittingAnswer={submittingAnswer}
                kidMode={encounter.kidMode}
                handleAnswer={handleAnswer as any}
              />
            ))}
        </AnimatePresence>

        {phase === 'capture' && (
          <CaptureScene
            balls={balls}
            selectedBallIndex={selectedBallIndex}
            isCapturing={isCapturing}
            showCaptureAnimation={showCaptureAnimation}
            ringScale={captureRingScale}
            targetRef={pokemonTargetRef}
            inventory={
              encounter.inventory as { itemId: string; quantity: number }[]
            }
            handleCapture={handleCapture}
            nextBall={nextBall}
            prevBall={prevBall}
            handleRunAway={handleRunAway}
          />
        )}
      </div>

      {/* Global Encounter Buttons (Footer) */}
      {!isSilphScopeGhostLocked && (
        <div className="relative shrink-0 border-t border-game-border bg-game-surface/96 pb-[env(safe-area-inset-bottom)] text-game-ink backdrop-blur-xl xl:col-start-1 xl:row-start-2 xl:border-t xl:border-r-0">
          <div className="relative z-10 flex items-center justify-between gap-3 px-4 py-3">
            {/* Items Button */}
            <Button
              type="button"
              variant="outline"
              className={cn(
                'h-12 flex-1 gap-2 border-game-border bg-game-surface-raised text-game-ink hover:border-game-moss/35 hover:bg-game-canvas',
                encounterItemsRemaining <= 0 && 'opacity-50',
              )}
              onClick={() => setShowItemsModal(true)}
              disabled={isCapturing || encounterItemsRemaining <= 0}
              aria-busy={isCapturing}
            >
              <Backpack className="h-5 w-5 text-game-moss-strong" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Items
              </span>
              {encounterItemsRemaining > 0 && (
                <span className="ml-1 text-[10px] font-bold text-game-muted">
                  ({encounterItemsRemaining})
                </span>
              )}
            </Button>

            {/* Run Button */}
            {(() => {
              const isCapturePhase = phase === 'capture'

              // Research Level 3+: Guaranteed free escape in any phase
              const hasResearchEscape = (encounter.formResearchLevel || 0) >= 3

              // If in strict capture phase, allow free running
              const canFreeRun = isCapturePhase || hasResearchEscape

              const ropeCount =
                encounter.inventory.find((inv) => inv.itemId === 'escape-rope')
                  ?.quantity || 0
              const hasRope = ropeCount > 0
              const hasEscapeAbility =
                encounter.activeAbility &&
                encounter.activeAbility.type === 'escape' &&
                !encounter.abilityEscapeAttempted

              const canEscape = canFreeRun || hasRope || hasEscapeAbility

              return (
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    'h-12 w-auto gap-2 border-game-border bg-game-surface-raised px-5 text-game-ink hover:border-game-moss/35 hover:bg-game-canvas',
                    !canEscape &&
                      'cursor-not-allowed opacity-50 grayscale hover:border-game-border hover:bg-game-surface-raised hover:text-game-muted',
                  )}
                  onClick={() => {
                    if (hasResearchEscape) {
                      researchEscape().then((result) => {
                        if (result.escaped) {
                          setCaptureResult({
                            success: true,
                            caught: false,
                            failMessage:
                              result.message ||
                              'Escaped using research knowledge!',
                            pokemonName: encounter.pokemonName,
                          })
                          setPhase('result')
                        }
                      })
                    } else if (canFreeRun) {
                      handleRunAway()
                    } else if (hasEscapeAbility) {
                      handleAbilityEscape()
                    } else {
                      handleUseItem('escape-rope')
                    }
                  }}
                  disabled={isCapturing || !canEscape}
                  aria-busy={isCapturing}
                  title={
                    canFreeRun
                      ? 'Run Away'
                      : hasEscapeAbility
                        ? `Use ${encounter.activeAbility?.name}`
                        : hasRope
                          ? 'Use Escape Rope'
                          : 'No Escape Ropes!'
                  }
                >
                  <div className="w-5 h-5 shrink-0 relative flex items-center justify-center">
                    {canFreeRun ? (
                      <FaRunning className="h-full w-full text-game-moss-strong" />
                    ) : hasEscapeAbility ? (
                      <Sparkles className="h-full w-full text-game-ochre" />
                    ) : (
                      <ItemSprite
                        itemId="escape-rope"
                        alt="Escape Rope"
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                  <span
                    className={cn(
                      'hidden sm:inline font-bold uppercase tracking-wider text-xs',
                      !canEscape && 'text-game-muted',
                    )}
                  >
                    {canFreeRun
                      ? 'Run'
                      : hasEscapeAbility
                        ? `Run (${encounter.activeAbility?.name})`
                        : 'Run'}
                  </span>
                  {!canFreeRun && !hasEscapeAbility && hasRope && (
                    <span className="ml-1 text-[10px] font-bold text-game-muted">
                      ({ropeCount})
                    </span>
                  )}
                </Button>
              )
            })()}
          </div>
        </div>
      )}

      {isSilphScopeGhostLocked && (
        <SilphScopeGhostSequence stage={ghostStage} />
      )}

      <ResponsivePanel
        open={showItemsModal}
        onOpenChange={setShowItemsModal}
        title="Use Item"
        description="Choose a field tool for this encounter."
        desktopWidth="min(34vw, 420px)"
        mobileMaxHeight="76dvh"
        className="bg-game-surface text-game-ink"
      >
        <div className="max-h-[calc(76dvh-80px)] overflow-y-auto px-5 py-4 lg:max-h-[calc(100dvh-90px)]">
          <div className="grid grid-cols-1 gap-3">
            {(() => {
              if (!encounter) return null

              // 1. Get all valid encounter items from inventory
              const validItems = items
                .filter(
                  (i) =>
                    isMidEncounterUsableItem(i) &&
                    i.id !== 'escape-rope' &&
                    canUseItemWithSkillRequirements(i, user?.skills),
                )
                .filter(
                  (i) =>
                    (encounter.inventory.find((inv) => inv.itemId === i.id)
                      ?.quantity || 0) > 0,
                )

              // 2. Filter type-specific tools based on the current Pokemon
              const filteredItems = validItems.filter((item) => {
                return isEncounterItemUsableForPokemon(item, species?.types)
              })

              if (filteredItems.length === 0) {
                return (
                  <div
                    className="rounded-lg border border-dashed border-game-border bg-game-canvas py-8 text-center text-game-muted"
                    role="status"
                    aria-live="polite"
                  >
                    No field tools can be used for this Pokémon.
                  </div>
                )
              }

              // 3. Group Items
              const gems = filteredItems.filter((i) => i.id.endsWith('-gem'))
              const others = filteredItems.filter((i) => !i.id.endsWith('-gem'))

              return (
                <div className="space-y-6">
                  {/* Gems Section */}
                  {gems.length > 0 && (
                    <div className="space-y-3">
                      <SectionDivider
                        className="min-h-8 [&>div:first-child]:text-sm [&>div:first-child]:font-bold [&>div:first-child]:tracking-[0.04em]"
                        textColor="text-game-ink"
                      >
                        Type gems
                      </SectionDivider>
                      <div className="grid grid-cols-1 gap-3">
                        {gems.map((item) => (
                          <Button
                            key={item.id}
                            type="button"
                            variant="outline"
                            className="h-auto justify-start gap-3 border-game-border bg-game-surface-raised p-3 text-game-ink hover:border-game-moss/35 hover:bg-game-canvas"
                            onClick={() => handleUseItem(item.id)}
                            disabled={usingItem}
                            aria-busy={usingItem}
                          >
                            <div className="w-10 h-10 shrink-0">
                              <ItemSprite
                                itemId={item.id}
                                alt={item.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="flex-1 text-left">
                              <div className="font-bold flex items-center justify-between">
                                <span>{item.name}</span>
                                <span className="text-sm font-normal text-game-muted">
                                  x
                                  {encounter.inventory.find(
                                    (inv) => inv.itemId === item.id,
                                  )?.quantity || 0}
                                </span>
                              </div>
                              <div className="line-clamp-2 text-xs text-game-muted">
                                {getEncounterItemSummary(item)}
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Others Section */}
                  {others.length > 0 && (
                    <div className="space-y-3">
                      <SectionDivider
                        className="min-h-8 [&>div:first-child]:text-sm [&>div:first-child]:font-bold [&>div:first-child]:tracking-[0.04em]"
                        textColor="text-game-ink"
                      >
                        Other items
                      </SectionDivider>
                      <div className="grid grid-cols-1 gap-3">
                        {others.map((item) => (
                          <Button
                            key={item.id}
                            type="button"
                            variant="outline"
                            className="h-auto justify-start gap-3 border-game-border bg-game-surface-raised p-3 text-game-ink hover:border-game-moss/35 hover:bg-game-canvas"
                            onClick={() => handleUseItem(item.id)}
                            disabled={usingItem}
                            aria-busy={usingItem}
                          >
                            <div className="w-10 h-10 shrink-0">
                              <ItemSprite
                                itemId={item.id}
                                alt={item.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="flex-1 text-left">
                              <div className="font-bold flex items-center justify-between">
                                <span>{item.name}</span>
                                <span className="text-sm font-normal text-game-muted">
                                  x
                                  {encounter.inventory.find(
                                    (inv) => inv.itemId === item.id,
                                  )?.quantity || 0}
                                </span>
                              </div>
                              <div className="line-clamp-2 text-xs text-game-muted">
                                {getEncounterItemSummary(item)}
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })()}
          </div>
        </div>
      </ResponsivePanel>
    </div>
  )
}
