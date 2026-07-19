'use client'

import { DoorOpen } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { ItemSprite } from '@/components/ui/item-sprite'
import { SectionDivider } from '@/components/ui/section-divider'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import type {
  FishingGameConfig,
  FishingSceneConfig,
  FishingWaterStyle,
  RodType,
} from '@/data/games/fishing/types'
import { useGameMusic } from '@/hooks/useGameMusic'
import { cn } from '@/lib/utils'
import {
  getPokemonForm,
  getPokemonImageUrl,
  getPokemonSpecies,
} from '@/utilities/pokemon/pokedex'
import {
  getRegionTimeZone,
  getTimeZoneClockTime,
} from '@/utilities/requirements'
import {
  attemptHook,
  castFishingLine,
  claimFishingItem,
  releaseFish,
  startFishingCatch,
} from '../games/fishing'

const DEFAULT_SCENE: FishingSceneConfig = {
  portraitBackground: '/backgrounds/fishing-pond-portrait.avif',
  waterStyle: 'pond',
  waterline: { portrait: 56, landscape: 54 },
}

function getTimeTint(category: string) {
  const { hour } = getTimeZoneClockTime(new Date(), getRegionTimeZone(category))

  if (hour >= 5 && hour < 8) {
    return 'bg-[linear-gradient(to_bottom,rgba(255,180,111,0.22),rgba(255,255,255,0.04)_42%,rgba(42,91,126,0.08))]'
  }
  if (hour >= 8 && hour < 17) {
    return 'bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),rgba(23,162,184,0.04)_54%,rgba(5,76,91,0.08))]'
  }
  if (hour >= 17 && hour < 20) {
    return 'bg-[linear-gradient(to_bottom,rgba(251,146,60,0.2),rgba(88,28,135,0.12)_44%,rgba(8,47,73,0.14))]'
  }
  return 'bg-[linear-gradient(to_bottom,rgba(2,6,23,0.34),rgba(15,23,42,0.2)_44%,rgba(8,47,73,0.22))]'
}

function getWaterTone(style: FishingWaterStyle) {
  switch (style) {
    case 'ocean':
      return {
        caustics: 'from-cyan-200/24 via-sky-300/8 to-transparent',
        shade: 'from-transparent via-cyan-950/8 to-cyan-950/34',
        glint: 'bg-cyan-100/30',
      }
    case 'pool':
      return {
        caustics: 'from-sky-100/28 via-cyan-200/10 to-transparent',
        shade: 'from-transparent via-sky-950/6 to-blue-950/20',
        glint: 'bg-sky-100/40',
      }
    case 'harbor':
      return {
        caustics: 'from-teal-100/18 via-cyan-300/8 to-transparent',
        shade: 'from-transparent via-teal-950/12 to-slate-950/32',
        glint: 'bg-teal-100/28',
      }
    case 'rocky-lake':
      return {
        caustics: 'from-sky-100/18 via-blue-300/8 to-transparent',
        shade: 'from-transparent via-slate-950/12 to-blue-950/30',
        glint: 'bg-sky-100/24',
      }
    default:
      return {
        caustics: 'from-emerald-100/18 via-cyan-200/8 to-transparent',
        shade: 'from-transparent via-teal-950/10 to-emerald-950/28',
        glint: 'bg-emerald-100/26',
      }
  }
}

function FishingScene({
  encounter,
  scene,
  phase,
  selectedRod,
}: {
  encounter: FishingGameConfig
  scene: FishingSceneConfig
  phase: GamePhase
  selectedRod: RodType | null
}) {
  const waterlinePortrait = scene.waterline.portrait
  const waterlineLandscape =
    scene.waterline.landscape ?? scene.waterline.portrait
  const waterTone = getWaterTone(scene.waterStyle)
  const hasActiveBobber =
    !!selectedRod &&
    ['waiting', 'nibble', 'hooked', 'missed', 'early'].includes(phase)
  const isAgitated = phase === 'nibble' || phase === 'hooked'
  const isSplash = phase === 'missed' || phase === 'early'

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-slate-950"
      style={
        {
          '--waterline-portrait': `${waterlinePortrait}%`,
          '--waterline-landscape': `${waterlineLandscape}%`,
          '--scene-bobber-top-portrait': `${waterlinePortrait + 2}%`,
          '--scene-bobber-top-landscape': `${waterlineLandscape + 2}%`,
        } as CSSProperties
      }
    >
      <Image
        src={scene.portraitBackground}
        alt=""
        fill
        priority
        sizes="100vw"
        className={cn(
          'object-cover',
          scene.landscapeBackground && 'landscape:hidden',
        )}
      />
      {scene.landscapeBackground && (
        <Image
          src={scene.landscapeBackground}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hidden object-cover landscape:block"
        />
      )}
      <div
        className={cn(
          'absolute inset-0 mix-blend-multiply pointer-events-none',
          getTimeTint(encounter.category),
        )}
      />
      <div className="absolute inset-x-0 bottom-0 top-[var(--waterline-portrait)] overflow-hidden pointer-events-none landscape:top-[var(--waterline-landscape)]">
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-b mix-blend-screen opacity-70 motion-safe:animate-[fishing_caustics_9s_ease-in-out_infinite]',
            waterTone.caustics,
          )}
        />
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-b opacity-90',
            waterTone.shade,
          )}
        />
        <div className="absolute left-[-20%] top-[8%] h-px w-[55%] bg-white/28 blur-[1px] motion-safe:animate-[fishing_glint_7s_ease-in-out_infinite]" />
        <div className="absolute right-[-10%] top-[28%] h-px w-[36%] bg-white/18 blur-[1px] motion-safe:animate-[fishing_glint_11s_ease-in-out_infinite]" />
      </div>
      <div className="absolute left-1/2 top-[var(--scene-bobber-top-portrait)] -translate-x-1/2 -translate-y-1/2 pointer-events-none landscape:top-[var(--scene-bobber-top-landscape)]">
        <div
          className={cn(
            'h-24 w-24 rounded-full border opacity-0',
            waterTone.glint,
            hasActiveBobber &&
              'opacity-45 motion-safe:animate-[fishing_ripple_2.4s_ease-out_infinite]',
            isAgitated &&
              'opacity-75 motion-safe:animate-[fishing_ripple_0.9s_ease-out_infinite]',
          )}
        />
        {isSplash && (
          <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#f7ecd6]/70 opacity-80 motion-safe:animate-[fishing_splash_0.65s_ease-out_both]" />
        )}
      </div>
    </div>
  )
}

interface FishingGameProps {
  encounter: FishingGameConfig
  initialState?: any
}

type GamePhase =
  | 'select-rod'
  | 'idle'
  | 'casting'
  | 'waiting'
  | 'nibble'
  | 'hooked'
  | 'missed'
  | 'early'

export function FishingGame({ encounter }: FishingGameProps) {
  useGameMusic(encounter)
  const { playSfx } = useAudio()
  const router = useRouter()
  const { refreshUser, gameData } = useUser()

  const sceneConfig = useMemo<FishingSceneConfig>(
    () =>
      encounter.settings.scene || {
        ...DEFAULT_SCENE,
        portraitBackground:
          encounter.background || DEFAULT_SCENE.portraitBackground,
      },
    [encounter.background, encounter.settings.scene],
  )

  // Rod ownership check
  const inventory = useMemo(
    () =>
      Object.fromEntries(
        (gameData?.inventory || []).map((item) => [item.itemId, item.quantity]),
      ),
    [gameData?.inventory],
  )
  const ownedRods = {
    old: (inventory['old-rod'] || 0) > 0,
    good: (inventory['good-rod'] || 0) > 0,
    super: (inventory['super-rod'] || 0) > 0,
  }
  const availableRods = (['old', 'good', 'super'] as RodType[]).filter(
    (rod) => ownedRods[rod] && encounter.settings.rods[rod],
  )

  // State
  const [selectedRod, setSelectedRod] = useState<RodType | null>(null)
  const [phase, setPhase] = useState<GamePhase>('select-rod')
  const phaseRef = useRef(phase)
  phaseRef.current = phase

  // Casting & Timing
  const [castTime, setCastTime] = useState<number | null>(null)
  const [appearTime, setAppearTime] = useState<number | null>(null)
  const [reactionTime, setReactionTime] = useState<number>(2000)
  const [timeUntilAppear, setTimeUntilAppear] = useState<number | null>(null)
  const [nibbleSymbol, setNibbleSymbol] = useState<string | null>(null)

  // Hooked result
  const [hookedData, setHookedData] = useState<{
    type: 'pokemon' | 'item'
    speciesId?: number
    formId?: string
    isShiny?: boolean
    itemId?: string
    symbol: string
  } | null>(null)

  // Refs
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const appearTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const reactionTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (appearTimeoutRef.current) clearTimeout(appearTimeoutRef.current)
      if (reactionTimeoutRef.current) clearTimeout(reactionTimeoutRef.current)
    }
  }, [])

  const handleSelectRod = useCallback((rod: RodType) => {
    setSelectedRod(rod)
    setPhase('idle')
  }, [])

  const handleCast = useCallback(async () => {
    if (!selectedRod) return
    setPhase('casting')
    setHookedData(null)

    // Simulate cast animation time
    setTimeout(async () => {
      setPhase('waiting')
      const res = await castFishingLine(selectedRod)
      if (!res.success) {
        toast.error(res.error || 'Failed to cast')
        setPhase('idle')
        return
      }

      setCastTime(res.castTime ?? null)
      setAppearTime(res.appearTime ?? null)

      setReactionTime(res.reactionTime ?? 2000)
      setNibbleSymbol(res.symbol || null)

      // Interval only updates the countdown for UI, does NOT control logic
      const updateTimer = () => {
        const now = Date.now()
        const targetAppearTime = res.appearTime ?? now
        const timeLeft = Math.max(0, targetAppearTime - now)
        setTimeUntilAppear(timeLeft)
      }

      timerRef.current = setInterval(updateTimer, 50)

      const targetAppearTime = res.appearTime ?? Date.now()
      const delay = Math.max(0, targetAppearTime - Date.now())

      appearTimeoutRef.current = setTimeout(() => {
        // If we are still waiting (user didn't early hook), transitions to nibble
        setPhase((prev) => {
          if (prev === 'waiting') {
            clearInterval(timerRef.current!)
            if (navigator.vibrate) navigator.vibrate(200) // Haptic feedback on bite
            return 'nibble'
          }
          return prev
        })
      }, delay)
    }, 600) // Cast animation duration
  }, [selectedRod])

  // Phase change side-effects
  useEffect(() => {
    // Logic for NIBBLE phase - start reaction timer
    if (phase === 'nibble') {
      if (reactionTimeoutRef.current) clearTimeout(reactionTimeoutRef.current)

      reactionTimeoutRef.current = setTimeout(() => {
        if (phaseRef.current !== 'nibble') return
        setPhase('missed')
        setHookedData(null)
      }, reactionTime)
    }

    // Cleanup reaction timer when leaving nibble phase (e.g. hooked, early, missed)
    return () => {
      if (reactionTimeoutRef.current) clearTimeout(reactionTimeoutRef.current)
    }
  }, [phase, reactionTime])

  const handleAction = useCallback(async () => {
    if (phase === 'idle') {
      handleCast()
      return
    }

    if (phase === 'waiting') {
      // Early hook!
      if (appearTimeoutRef.current) clearTimeout(appearTimeoutRef.current)
      if (timerRef.current) clearInterval(timerRef.current)
      setPhase('early')
      return
    }

    if (phase === 'nibble') {
      // Correct hook!
      if (reactionTimeoutRef.current) clearTimeout(reactionTimeoutRef.current)

      const res = await attemptHook()
      if (!res.success) {
        toast.error(res.error || 'Failed to hook')
        setPhase('idle')
        return
      }

      if (res.hooked && res.type) {
        playSfx('good')
        setPhase('hooked')
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]) // Double tap success
        setHookedData({
          type: res.type as 'pokemon' | 'item',
          speciesId: res.speciesId,
          formId: res.formId,
          isShiny: res.isShiny,
          itemId: res.itemId,
          symbol: res.symbol || '?',
        })
      } else {
        playSfx('bad')
        setPhase('missed')
      }
    }
  }, [phase, handleCast])

  const handleRelease = useCallback(async () => {
    await releaseFish()
    setPhase('idle')
    setHookedData(null)
    toast.success('Released back into the water.')
  }, [])

  const handleClaimItem = useCallback(async () => {
    const res = await claimFishingItem()
    if (!res.success) {
      toast.error(res.error || 'Failed to claim item')
      return
    }

    refreshUser()
    toast.success('Item added to bag.')
    setPhase('idle')
    setHookedData(null)
    setCastTime(null)
    setAppearTime(null)
    setTimeUntilAppear(null)
    setNibbleSymbol(null)
  }, [refreshUser])

  const handleAttemptCatch = useCallback(async () => {
    const res = await startFishingCatch()
    if (!res.success) {
      toast.error(res.error || 'Failed to start catch')
      return
    }
    router.push('/game/locations/encounter')
  }, [router])

  const handleExit = useCallback(async () => {
    refreshUser()
    router.push('/game/explore')
  }, [refreshUser, router])

  const handleRecast = useCallback(async () => {
    await releaseFish()
    setPhase('idle')
    setHookedData(null)
    setCastTime(null)
    setAppearTime(null)

    setTimeUntilAppear(null)
    setNibbleSymbol(null)
  }, [])

  // --------------------------------------------------------------------------
  // Visual Helpers
  // --------------------------------------------------------------------------

  // Rod item ID mapping
  const rodItemIds: Record<RodType, string> = {
    old: 'old-rod',
    good: 'good-rod',
    super: 'super-rod',
  }

  const rodDisplayNames: Record<RodType, string> = {
    old: 'Old Rod',
    good: 'Good Rod',
    super: 'Super Rod',
  }

  // Bobber colors
  const getBobberColor = (rod: RodType) => {
    switch (rod) {
      case 'old':
        return 'bg-red-600'
      case 'good':
        return 'bg-blue-600'
      case 'super':
        return 'bg-yellow-400'
    }
  }

  // Get Pokemon data for display
  const hookedPokemon =
    hookedData?.type === 'pokemon' && hookedData.speciesId
      ? getPokemonForm(hookedData.formId || '') ||
        getPokemonSpecies(hookedData.speciesId)
      : null

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------

  return (
    <div
      className="relative min-h-dvh flex flex-col font-sans overflow-hidden game-night bg-game-night-canvas select-none touch-none"
      style={
        {
          '--fishing-waterline-portrait': `${sceneConfig.waterline.portrait}%`,
          '--fishing-waterline-landscape': `${sceneConfig.waterline.landscape ?? sceneConfig.waterline.portrait}%`,
          '--fishing-bobber-top-portrait': `${sceneConfig.waterline.portrait + 2}%`,
          '--fishing-bobber-top-landscape': `${(sceneConfig.waterline.landscape ?? sceneConfig.waterline.portrait) + 2}%`,
          '--fishing-hooked-top-portrait': `${sceneConfig.waterline.portrait + 5}%`,
          '--fishing-hooked-top-landscape': `${(sceneConfig.waterline.landscape ?? sceneConfig.waterline.portrait) + 5}%`,
        } as CSSProperties
      }
    >
      <FishingScene
        encounter={encounter}
        scene={sceneConfig}
        phase={phase}
        selectedRod={selectedRod}
      />

      {/* Header UI */}
      <div className="absolute top-0 left-0 right-0 px-4 pt-[max(1rem,env(safe-area-inset-top))] flex justify-between items-start z-50 pointer-events-none">
        {/* Rod chip */}
        <div className="pointer-events-auto">
          {selectedRod && phase !== 'select-rod' && (
            <div className="flex items-center gap-1.5 rounded-full border border-game-night-border/60 bg-game-night-surface/75 px-3 py-1.5 shadow-lg backdrop-blur-md">
              <ItemSprite
                itemId={rodItemIds[selectedRod]}
                alt={rodDisplayNames[selectedRod]}
                width={16}
                height={16}
              />
              <span className="text-xs font-medium text-game-night-ink">
                {rodDisplayNames[selectedRod]}
              </span>
            </div>
          )}
        </div>

        {/* Exit Button */}
        <div className="pointer-events-auto">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full border border-game-night-border/60 bg-game-night-surface/75 text-game-night-ink shadow-lg backdrop-blur-md hover:bg-game-night-surface-raised hover:text-game-night-ink"
            onClick={handleExit}
            aria-label="Leave fishing"
          >
            <DoorOpen className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 
          GAME AREA 
      */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full h-full pointer-events-none">
        {/* ROD SELECTION PHASE */}
        {phase === 'select-rod' && (
          <div className="pointer-events-auto absolute inset-x-3 bottom-3 pb-[env(safe-area-inset-bottom)]">
            <div className="game-paper-background mx-auto max-w-md animate-in rounded-xl border border-game-border bg-game-surface p-5 text-game-ink shadow-xl fade-in slide-in-from-bottom-6 duration-300 lg:max-w-xl">
              <SectionDivider className="mb-5">Select your rod</SectionDivider>

              {availableRods.length > 0 ? (
                <Carousel
                  className="w-full max-w-xs mx-auto px-12"
                  opts={{ align: 'center', loop: true }}
                >
                  <CarouselContent>
                    {availableRods.map((rod) => (
                      <CarouselItem key={rod} className="basis-full">
                        <div className="p-1">
                          <Button
                            variant="ghost"
                            className="group flex h-auto w-full flex-col items-center gap-3 rounded-xl border border-game-border bg-game-surface-raised py-7 text-game-ink transition-colors hover:border-game-moss hover:bg-game-moss/10"
                            onClick={() => handleSelectRod(rod)}
                          >
                            <div className="relative h-16 w-16">
                              <ItemSprite
                                itemId={rodItemIds[rod]}
                                alt={rodDisplayNames[rod]}
                                width={64}
                                height={64}
                              />
                            </div>
                            <div className="space-y-1 text-center">
                              <h3 className="font-display text-xl font-semibold text-game-ink">
                                {rodDisplayNames[rod]}
                              </h3>
                              <p className="text-xs uppercase tracking-widest text-game-muted">
                                Tap to select
                              </p>
                            </div>
                          </Button>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2 border-game-border bg-game-surface-raised text-game-ink hover:text-game-moss" />
                  <CarouselNext className="right-2 border-game-border bg-game-surface-raised text-game-ink hover:text-game-moss" />
                </Carousel>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-game-border bg-game-surface-raised p-8 text-center text-game-muted">
                  <p>You do not have a fishing rod yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* BOBBER ANIMATION */}
        {selectedRod &&
          [
            'casting',
            'waiting',
            'nibble',
            'early',
            'missed',
            'hooked',
          ].includes(phase) && (
            <div
              className={cn(
                'absolute transition-all duration-500 ease-in-out',
                // Vertical position based on phase
                phase === 'casting' ? 'top-[-50px] scale-0' : '',
                phase === 'waiting'
                  ? 'top-[var(--fishing-bobber-top-portrait)] landscape:top-[var(--fishing-bobber-top-landscape)] -translate-y-1/2 animate-[bob_2s_ease-in-out_infinite]'
                  : '',
                phase === 'nibble'
                  ? 'top-[var(--fishing-bobber-top-portrait)] landscape:top-[var(--fishing-bobber-top-landscape)] translate-y-2 animate-[shake_0.1s_linear_infinite]'
                  : '',
                // Hooked: Pull down slightly but keep visible for chat bubble
                phase === 'hooked'
                  ? 'top-[var(--fishing-hooked-top-portrait)] landscape:top-[var(--fishing-hooked-top-landscape)] scale-100'
                  : '',
                // Hide on miss/early - Pull down off screen
                phase === 'early' || phase === 'missed' ? 'top-[150%]' : '',
              )}
            >
              {/* The Bobber */}
              <div className="w-8 h-8 rounded-full border-2 border-zinc-900 shadow-xl flex items-center justify-center relative bg-white overflow-hidden">
                <div
                  className={cn(
                    'w-full h-1/2 absolute top-0 border-b-2 border-zinc-900',
                    getBobberColor(selectedRod),
                  )}
                />
                <div className="w-2 h-2 bg-white/50 rounded-full absolute top-1 right-2 z-10" />
                {/* Center Button */}
                <div className="w-2 h-2 bg-white border-2 border-zinc-900 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 shadow-sm" />
              </div>

              {/* Chat Bubble for Catch Symbol (Nibble or Hooked) */}
              {(phase === 'nibble' || phase === 'hooked') &&
                (nibbleSymbol || hookedData?.symbol) && (
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-2 rounded-xl shadow-lg border-2 border-zinc-200 animate-in zoom-in slide-in-from-bottom-4 duration-300 whitespace-nowrap z-50">
                    <div className="text-sm font-bold animate-bounce">
                      {hookedData?.symbol || nibbleSymbol}
                    </div>
                    {/* Triangle pointer */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-r-2 border-b-2 border-zinc-200" />
                  </div>
                )}
            </div>
          )}

        {/* MESSAGES */}
        {phase === 'early' && (
          <div
            className="absolute top-1/3 animate-bounce"
            role="status"
            aria-live="polite"
          >
            <span className="text-game-danger text-3xl font-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              TOO EARLY!
            </span>
          </div>
        )}
        {phase === 'missed' && (
          <div
            className="absolute top-1/3 animate-bounce"
            role="status"
            aria-live="polite"
          >
            <span className="text-3xl font-black text-game-night-ink drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              GOT AWAY...
            </span>
          </div>
        )}

        {/* CATCH RESULT UI (Appears immediately) */}
        {phase === 'hooked' && hookedData && (
          <div className="pointer-events-auto absolute inset-x-3 bottom-3 pb-[env(safe-area-inset-bottom)]">
            <div className="game-paper-background mx-auto flex max-w-sm animate-in flex-col items-center gap-4 rounded-xl border border-game-border bg-game-surface p-5 text-game-ink shadow-xl fade-in slide-in-from-bottom-6 duration-300 lg:max-w-lg">
              {hookedData.type === 'pokemon' && hookedPokemon && (
                <>
                  <div className="w-full">
                    <SectionDivider>A wild pokemon!</SectionDivider>
                  </div>

                  <div className="relative flex h-[150px] w-[150px] items-center justify-center rounded-xl border border-game-border bg-game-surface-raised">
                    <div className="relative w-3/4 h-3/4">
                      <Image
                        src={getPokemonImageUrl(
                          hookedData.formId ||
                            hookedData.speciesId?.toString() ||
                            '',
                          'home',
                          hookedData.isShiny,
                        )}
                        alt={hookedPokemon.name}
                        fill
                        className="object-contain pixelated drop-shadow-xl"
                      />
                      {hookedData.isShiny && (
                        <span className="absolute top-0 right-0 text-3xl animate-pulse">
                          ✨
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <h3 className="line-clamp-1 font-display text-lg font-semibold tracking-wide text-game-ink">
                      {hookedData.isShiny && 'Shiny '}
                      {hookedPokemon.name}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <Button
                      className="h-11 w-full rounded-xl bg-game-clay text-base font-semibold tracking-wide text-game-cream shadow-sm hover:bg-game-clay/90"
                      onClick={handleAttemptCatch}
                    >
                      CATCH!
                    </Button>
                    <Button
                      variant="outline"
                      className="h-11 w-full rounded-xl border-game-border bg-game-surface-raised text-sm text-game-muted hover:border-game-clay hover:text-game-clay-strong"
                      onClick={handleRelease}
                    >
                      Release
                    </Button>
                  </div>
                </>
              )}

              {hookedData.type === 'item' && hookedData.itemId && (
                <>
                  <div className="w-full">
                    <SectionDivider>Item Found!</SectionDivider>
                  </div>

                  <div className="relative flex h-[150px] w-[150px] items-center justify-center rounded-xl border border-game-border bg-game-surface-raised">
                    <div className="w-3/4 h-3/4 relative">
                      <ItemSprite
                        itemId={hookedData.itemId}
                        alt="Item"
                        className="w-full h-full object-contain drop-shadow-lg"
                        width={96}
                        height={96}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <h3 className="line-clamp-1 font-display text-lg font-semibold capitalize tracking-wide text-game-ink">
                      {hookedData.itemId.replace(/-/g, ' ')}
                    </h3>
                  </div>

                  <div className="w-full">
                    <Button
                      className="h-11 w-full rounded-xl bg-game-clay text-base font-semibold tracking-wide text-game-cream shadow-sm hover:bg-game-clay/90"
                      onClick={handleClaimItem}
                    >
                      Nice!
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 
          ACTION BUTTON (Fixed Bottom)
          Unified button for Cast / Hook / Try Again
      */}
      {selectedRod && phase !== 'select-rod' && phase !== 'hooked' && (
        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-4 px-4 z-50 pb-safe pointer-events-auto">
          <Button
            size="lg"
            className={cn(
              'h-12 w-full max-w-md bg-game-clay text-base !text-game-cream hover:bg-game-clay/90',
              // Dynamic Styling based on Phase
              phase === 'nibble' &&
                'bg-game-ochre hover:bg-game-ochre border-game-ochre animate-pulse',
              (phase === 'missed' || phase === 'early') && 'opacity-90',
            )}
            onClick={
              phase === 'missed' || phase === 'early'
                ? handleRecast
                : handleAction
            }
            onTouchStart={(e) => {
              if (phase === 'casting') return
              e.preventDefault()
              if (phase === 'missed' || phase === 'early') {
                handleRecast()
              } else {
                handleAction()
              }
            }}
            disabled={phase === 'casting'}
          >
            {phase === 'idle' && 'CAST'}
            {phase === 'casting' && '...'}
            {phase === 'waiting' && 'HOOK!'}
            {phase === 'nibble' && 'HOOK!'}
            {(phase === 'missed' || phase === 'early') && 'TRY AGAIN'}
          </Button>
        </div>
      )}

      {/* Tailwind Animations */}
      <style jsx global>{`
        @keyframes fishing_caustics {
          0%,
          100% {
            transform: translate3d(-2%, -1%, 0) scale(1.04);
            opacity: 0.5;
          }
          50% {
            transform: translate3d(2%, 1.5%, 0) scale(1.08);
            opacity: 0.82;
          }
        }
        @keyframes fishing_glint {
          0%,
          100% {
            transform: translateX(-16%) scaleX(0.72);
            opacity: 0.08;
          }
          50% {
            transform: translateX(24%) scaleX(1);
            opacity: 0.52;
          }
        }
        @keyframes fishing_ripple {
          0% {
            transform: scale(0.18);
            opacity: 0.72;
          }
          100% {
            transform: scale(1.85);
            opacity: 0;
          }
        }
        @keyframes fishing_splash {
          0% {
            transform: scale(0.35);
            opacity: 0.9;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
        @keyframes bob {
          0%,
          100% {
            transform: translateY(-50%) translateY(-5px);
          }
          50% {
            transform: translateY(-50%) translateY(5px);
          }
        }
        @keyframes shake {
          0%,
          100% {
            transform: translateY(-50%) rotate(-5deg);
          }
          50% {
            transform: translateY(-50%) rotate(5deg);
          }
        }
        @keyframes wave {
          0% {
            transform: translateX(0) translateZ(0) scaleY(1);
          }
          50% {
            transform: translateX(-25%) translateZ(0) scaleY(0.85);
          }
          100% {
            transform: translateX(-50%) translateZ(0) scaleY(1);
          }
        }
        @keyframes slide {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 1000px 0;
          }
        }
      `}</style>
    </div>
  )
}
