'use client'

import confetti from 'canvas-confetti'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { Sparkles, Trophy, X } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import type { TcgCard } from '@/data/tcg/types'
import { cn } from '@/lib/utils'

interface CardDrawRevealProps {
  cards: TcgCard[]
  onComplete: () => void
  className?: string
  skipReveal?: boolean
}

// ---------------------------------------------------------------------------
// Rarity helpers
// ---------------------------------------------------------------------------

type RarityTier = 'common' | 'uncommon' | 'rare' | 'ultra' | 'secret'

interface RarityTheme {
  tier: RarityTier
  glow: string // tailwind shadow / box-shadow value
  glowColor: string // raw CSS colour for confetti / particles
  border: string // tailwind border colour
  badgeBg: string // badge background classes
  badgeText: string // badge text colour classes
  label: string // display label for badge
  shimmerIntensity: number // 0–1 how strong the holo shimmer is
}

function getRarityTier(rarity: string | null | undefined): RarityTier {
  const r = (rarity ?? '').toLowerCase()
  if (
    r.includes('hyper') ||
    r.includes('rainbow') ||
    r.includes('secret') ||
    r.includes('black white') ||
    r.includes('holo star') ||
    r.includes('mega hyper') ||
    r.includes('special illustration')
  )
    return 'secret'

  if (
    r.includes('ultra') ||
    r.includes('vstar') ||
    r.includes('vmax') ||
    r.includes(' v') ||
    r.includes('gx') ||
    r.includes('ex') ||
    r.includes('radiant') ||
    r.includes('trainer gallery') ||
    r.includes('illustration rare') ||
    r.includes('shiny')
  )
    return 'ultra'

  if (
    r.includes('rare holo') ||
    r.includes('rare prism') ||
    r.includes('rare prime') ||
    r.includes('rare break') ||
    r.includes('double rare') ||
    r.includes('ace spec') ||
    r.includes('amazing') ||
    r.includes('legend') ||
    r.startsWith('rare')
  )
    return 'rare'

  if (r.includes('uncommon')) return 'uncommon'

  return 'common'
}

function getRarityTheme(rarity: string | null | undefined): RarityTheme {
  const tier = getRarityTier(rarity)

  switch (tier) {
    case 'secret':
      return {
        tier,
        glow: '0 0 32px 10px rgba(168,85,247,0.7), 0 0 60px 20px rgba(236,72,153,0.4)',
        glowColor: '#a855f7',
        border: 'border-purple-400',
        badgeBg: 'bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400',
        badgeText: 'text-white',
        label: '✦ Secret Rare',
        shimmerIntensity: 1,
      }
    case 'ultra':
      return {
        tier,
        glow: '0 0 28px 8px rgba(251,191,36,0.6), 0 0 55px 16px rgba(245,158,11,0.3)',
        glowColor: '#f59e0b',
        border: 'border-amber-400',
        badgeBg: 'bg-gradient-to-r from-amber-500 to-yellow-300',
        badgeText: 'text-amber-950',
        label: '★ Ultra Rare',
        shimmerIntensity: 0.85,
      }
    case 'rare':
      return {
        tier,
        glow: '0 0 24px 7px rgba(99,102,241,0.6), 0 0 45px 14px rgba(79,70,229,0.3)',
        glowColor: '#6366f1',
        border: 'border-indigo-400',
        badgeBg: 'bg-gradient-to-r from-indigo-600 to-blue-400',
        badgeText: 'text-white',
        label: '◆ Rare',
        shimmerIntensity: 0.65,
      }
    case 'uncommon':
      return {
        tier,
        glow: 'none',
        glowColor: '#22c55e',
        border: 'border-green-400',
        badgeBg: 'border border-[#71906b] bg-[#e5efe0]',
        badgeText: 'text-[#355332]',
        label: '● Uncommon',
        shimmerIntensity: 0,
      }
    default:
      return {
        tier,
        glow: 'none',
        glowColor: '#9ca3af',
        border: 'border-game-border-strong',
        badgeBg: 'border border-game-border-strong bg-game-surface-raised',
        badgeText: 'text-game-ink',
        label: '○ Common',
        shimmerIntensity: 0,
      }
  }
}

// ---------------------------------------------------------------------------
// Confetti helpers
// ---------------------------------------------------------------------------

function triggerRarityConfetti(tier: RarityTier) {
  switch (tier) {
    case 'secret': {
      const duration = 5000
      const end = Date.now() + duration
      const colors = [
        '#a855f7',
        '#ec4899',
        '#f59e0b',
        '#22d3ee',
        '#4ade80',
        '#f87171',
      ]
      const loop = setInterval(() => {
        if (Date.now() > end) {
          clearInterval(loop)
          return
        }
        const t = (end - Date.now()) / duration
        confetti({
          particleCount: Math.floor(70 * t),
          spread: 360,
          startVelocity: 50,
          ticks: 100,
          colors,
          origin: { x: Math.random(), y: Math.random() * 0.4 },
          scalar: 1.2,
          gravity: 0.8,
        })
      }, 250)
      return loop
    }
    case 'ultra': {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { x: 0.1, y: 0.7 },
        angle: 60,
        colors: ['#f59e0b', '#fde68a', '#fbbf24', '#d97706'],
        startVelocity: 60,
        gravity: 1.1,
      })
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { x: 0.9, y: 0.7 },
        angle: 120,
        colors: ['#f59e0b', '#fde68a', '#fbbf24', '#d97706'],
        startVelocity: 60,
        gravity: 1.1,
      })
      return null
    }
    case 'rare': {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe'],
        shapes: ['star'],
        scalar: 1.4,
      })
      return null
    }
    case 'uncommon': {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#22c55e', '#86efac', '#4ade80'],
        gravity: 1.2,
      })
      return null
    }
    default:
      return null
  }
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function HolographicShimmer({ intensity }: { intensity: number }) {
  return (
    <motion.div
      className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden"
      style={{ mixBlendMode: 'color-dodge' }}
      animate={{
        backgroundPosition: ['0% 0%', '100% 100%'],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'linear',
      }}
      initial={false}
    >
      {/* Prismatic Foil Background */}
      <div
        className="absolute inset-0 opacity-[0.45]"
        style={{
          background: `linear-gradient(
            115deg,
            rgba(255,0,128,${intensity * 0.5}) 0%,
            rgba(255,255,0,${intensity * 0.4}) 15%,
            rgba(0,255,0,${intensity * 0.5}) 30%,
            rgba(0,255,255,${intensity * 0.4}) 45%,
            rgba(0,0,255,${intensity * 0.5}) 60%,
            rgba(255,0,255,${intensity * 0.4}) 75%,
            rgba(255,0,128,${intensity * 0.5}) 90%
          )`,
          backgroundSize: '300% 300%',
          backgroundPosition: 'inherit',
        }}
      />

      {/* Moving Sparkle Layer */}
      <motion.div
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, white 1%, transparent 2%)`,
          backgroundSize: '40px 40px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '80px 80px'],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
      />

      {/* Glossy Directional Sweep */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            105deg, 
            transparent 35%, 
            rgba(255,255,255,${intensity * 0.6}) 50%, 
            transparent 65%
          )`,
          backgroundSize: '250% 250%',
        }}
        animate={{ backgroundPosition: ['-100% -100%', '200% 200%'] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 1,
        }}
      />
    </motion.div>
  )
}

function RevealFlash({ onDone }: { onDone: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] pointer-events-none bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 0.4, ease: 'circOut' }}
      onAnimationComplete={onDone}
    />
  )
}

function DotProgress({
  total,
  current,
  revealed,
}: {
  total: number
  current: number
  revealed: Set<number>
}) {
  return (
    <div className="flex items-center justify-center gap-2.5 rounded-full border border-game-night-border bg-game-night-surface px-4 py-2">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className={cn(
            'rounded-full transition-all duration-300',
            i === current
              ? 'h-3 w-3 bg-game-ochre'
              : revealed.has(i)
                ? 'h-2 w-2 bg-game-moss'
                : 'h-2 w-2 bg-game-night-border',
          )}
          layoutId={`dot-${i}`}
        />
      ))}
    </div>
  )
}

function SummaryGrid({
  cards,
  onClose,
}: {
  cards: TcgCard[]
  onClose: () => void
}) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  }
  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.6, y: 30, rotateX: 20 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
  }

  const cols = Math.min(cards.length, 3)

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-game-night-canvas text-game-night-ink"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative z-10 flex-shrink-0 px-6 pt-12 pb-4">
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="flex items-center gap-3 text-game-ochre">
            <Trophy className="w-5 h-5" />
            <h2 className="text-sm font-semibold">Collection summary</h2>
            <Trophy className="w-5 h-5" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-game-night-muted">
            You obtained {cards.length} cards
          </p>
        </div>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto px-8 pt-2 pb-8 scrollbar-hide">
        <motion.div
          className="grid gap-6 mx-auto"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            maxWidth: cols === 1 ? 260 : cols === 2 ? 520 : 700,
          }}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {cards.map((card, i) => {
            const theme = getRarityTheme(card.rarity)
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex flex-col items-center gap-4 group"
              >
                <div
                  className="relative w-full overflow-visible"
                  style={{ aspectRatio: '5/7' }}
                >
                  <div
                    style={{
                      boxShadow:
                        theme.tier === 'rare' ||
                        theme.tier === 'ultra' ||
                        theme.tier === 'secret'
                          ? theme.glow
                          : undefined,
                    }}
                    className={cn(
                      'relative w-full h-full rounded-xl overflow-hidden border-2 transition-all duration-500',
                      theme.border,
                    )}
                  >
                    {(card.images.large || card.images.small) && (
                      <Image
                        src={card.images.large || card.images.small || ''}
                        alt={card.name}
                        fill
                        sizes="(max-width: 640px) 33vw, 200px"
                        className="object-cover"
                      />
                    )}
                    {theme.shimmerIntensity > 0.5 && (
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-white/5 opacity-50" />
                    )}
                  </div>

                  {card.isNew && (
                    <div className="absolute -right-1 -top-1 z-20 rounded bg-game-ochre px-1.5 py-0.5 text-[10px] font-semibold text-game-cream">
                      NEW
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className="max-w-full truncate text-center text-xs font-black text-game-night-ink">
                    {card.name}
                  </p>
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide',
                      theme.badgeBg,
                      theme.badgeText,
                    )}
                  >
                    {theme.label.split(' ')[1]}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 flex-shrink-0 border-t border-game-night-border bg-game-night-canvas/95 px-8 pb-12 pt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Button onClick={onClose} className="w-full">
          Add to Collection
        </Button>
      </motion.div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function CardDrawReveal({
  cards,
  onComplete,
  className,
  skipReveal = false,
}: CardDrawRevealProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set())
  const [isFlipping, setIsFlipping] = useState(false)
  const [showFlash, setShowFlash] = useState(false)
  const [showSummary, setShowSummary] = useState(skipReveal)
  const confettiIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  )

  const currentCard = cards[currentIndex]
  const isLastCard = currentIndex === cards.length - 1
  const isCurrentRevealed = revealedIndices.has(currentIndex)

  const currentTheme = getRarityTheme(currentCard?.rarity)

  const clearConfettiInterval = useCallback(() => {
    if (confettiIntervalRef.current) {
      clearInterval(confettiIntervalRef.current)
      confettiIntervalRef.current = null
    }
  }, [])

  const handleReveal = useCallback(() => {
    if (isFlipping) return

    if (isCurrentRevealed) {
      handleNext()
      return
    }

    setIsFlipping(true)
    setRevealedIndices((prev) => new Set(prev).add(currentIndex))
    setShowFlash(true)

    // Haptic feedback for reveal
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(50)
    }

    setTimeout(() => {
      setIsFlipping(false)
      clearConfettiInterval()
      const interval = triggerRarityConfetti(currentTheme.tier)
      if (interval) confettiIntervalRef.current = interval
    }, 400)
  }, [
    isFlipping,
    isCurrentRevealed,
    currentIndex,
    currentTheme.tier,
    clearConfettiInterval,
  ])

  const handleNext = useCallback(() => {
    clearConfettiInterval()
    if (isLastCard) {
      setShowSummary(true)
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
  }, [isLastCard, clearConfettiInterval])

  // Cleanup
  useEffect(() => {
    setIsFlipping(false)
    return () => clearConfettiInterval()
  }, [currentIndex, clearConfettiInterval])

  useEffect(() => {
    return () => clearConfettiInterval()
  }, [clearConfettiInterval])

  // Preload card images
  useEffect(() => {
    cards.forEach((card) => {
      const src = card.images.large || card.images.small
      if (!src) return
      const img = new window.Image()
      img.src = src
    })
  }, [cards])

  if (!currentCard) return null

  if (showSummary) {
    return <SummaryGrid cards={cards} onClose={onComplete} />
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col overflow-hidden bg-game-night-canvas text-game-night-ink',
        className,
      )}
    >
      {/* Flash overlay */}
      <AnimatePresence>
        {showFlash && <RevealFlash onDone={() => setShowFlash(false)} />}
      </AnimatePresence>

      {/* Close button */}
      <div className="absolute top-6 right-6 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={onComplete}
          className="text-game-night-muted hover:bg-game-night-surface hover:text-game-night-ink"
          aria-label="Close card reveal"
        >
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* ── TOP: instructions + progress ── */}
      <div className="relative z-10 flex flex-col items-center gap-6 pt-14 px-6 flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-2"
        >
          <p className="ml-[0.3em] text-[10px] font-black uppercase tracking-[0.3em] text-game-ochre">
            {isCurrentRevealed ? 'Revealed' : 'New Card'}
          </p>
          <div className="h-px w-16 bg-game-ochre/60" />
        </motion.div>
        <DotProgress
          total={cards.length}
          current={currentIndex}
          revealed={revealedIndices}
        />
      </div>

      {/* ── CENTER: card ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-4">
        <div
          className="relative cursor-pointer select-none active:scale-[0.98] transition-transform duration-200"
          style={{ width: 260, height: 364 }}
          onClick={handleReveal}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentIndex}
              initial={{ scale: 0.6, opacity: 0, y: 100, rotateY: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -60, rotateY: -30 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              className="absolute inset-0"
              style={{ perspective: 1500 }}
            >
              {/* Card Glow */}
              <AnimatePresence>
                {isCurrentRevealed &&
                  (currentTheme.tier === 'rare' ||
                    currentTheme.tier === 'ultra' ||
                    currentTheme.tier === 'secret') && (
                    <motion.div
                      className="pointer-events-none absolute -inset-10 blur-xl"
                      style={{
                        background: `radial-gradient(ellipse at center, ${currentTheme.glowColor} 0%, ${currentTheme.glowColor} 42%, transparent 72%)`,
                        opacity: 0.4,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
              </AnimatePresence>

              {/* Card Face */}
              <motion.div
                className="w-full h-full relative will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isCurrentRevealed ? 180 : 0 }}
                transition={{
                  duration: 0.7,
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                }}
              >
                {/* Back Face */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-2xl border border-game-night-border shadow-lg"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {!isCurrentRevealed ? (
                    <div className="relative h-full w-full">
                      <Image
                        src="/images/tcg-back.avif"
                        alt="Card Back"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-[#1c2c51]" />
                  )}
                </div>

                {/* Front Face */}
                <div
                  className={cn(
                    'absolute inset-0 overflow-hidden rounded-2xl border-2 shadow-lg will-change-transform',
                    currentTheme.border,
                  )}
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  {(currentCard.images.large || currentCard.images.small) && (
                    <Image
                      src={
                        currentCard.images.large ||
                        currentCard.images.small ||
                        ''
                      }
                      alt={currentCard.name}
                      fill
                      sizes="300px"
                      className="object-cover"
                      priority
                    />
                  )}
                  {isCurrentRevealed && currentTheme.shimmerIntensity > 0.5 && (
                    <HolographicShimmer
                      intensity={currentTheme.shimmerIntensity}
                    />
                  )}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Details Area */}
        <div className="min-h-[80px] flex items-start justify-center w-full mt-10">
          <AnimatePresence mode="wait">
            {isCurrentRevealed && (
              <motion.div
                key={`details-${currentIndex}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-3"
              >
                <h3 className="text-xl font-black italic tracking-tight text-game-night-ink">
                  {currentCard.name}
                </h3>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-wider',
                      currentTheme.badgeBg,
                      currentTheme.badgeText,
                    )}
                  >
                    <Sparkles className="w-3 h-3" />
                    {currentTheme.label}
                  </span>
                  {currentCard.isNew && (
                    <motion.span
                      initial={{ scale: 0, rotate: -15 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="rounded bg-game-ochre px-2.5 py-1 text-[10px] font-black italic text-game-cream"
                    >
                      NEW
                    </motion.span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── BOTTOM: button ── */}
      <div className="relative z-10 flex-shrink-0 border-t border-game-night-border bg-game-night-canvas/95 pb-safe-bottom">
        <div className="px-8 pb-10 pt-4">
          <Button
            onClick={handleReveal}
            variant={isCurrentRevealed ? 'outline' : 'default'}
            className={cn(
              'h-14 w-full text-xs font-black uppercase tracking-[0.16em] transition-colors',
              isCurrentRevealed
                ? 'border border-game-border bg-game-surface-raised text-game-ink hover:bg-game-surface'
                : 'bg-game-clay text-game-cream hover:bg-game-clay/90',
            )}
          >
            {isCurrentRevealed
              ? isLastCard
                ? 'View Summary'
                : 'Next Card'
              : 'Reveal Card'}
          </Button>
        </div>
      </div>
    </div>
  )
}
