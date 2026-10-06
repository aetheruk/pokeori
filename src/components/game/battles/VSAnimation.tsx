'use client'

import React, { useEffect, useState } from 'react'
import { TrainerCard } from './TrainerCard'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import { cn } from '@/lib/utils'

interface VSAnimationProps {
  background?: string
  appearance?: 'default' | 'paper'
  player: {
    name: string
    icon?: string
    banner?: string
    title?: string
  }
  enemy: {
    name: string
    icon?: string
    banner?: string
    title?: string
  }
  onComplete: () => void
}

export function VSAnimation({
  background,
  appearance = 'default',
  player,
  enemy,
  onComplete,
}: VSAnimationProps) {
  const [showVS, setShowVS] = useState(false)

  useEffect(() => {
    // Sequence:
    // 0s: Cards appear (slide down/up)
    // 0.5s: VS appears
    // 2.5s: Start exit
    // 3.0s: onComplete

    const vsTimer = setTimeout(() => setShowVS(true), 400)
    const exitTimer = setTimeout(() => {
      onComplete()
    }, 3000)

    return () => {
      clearTimeout(vsTimer)
      clearTimeout(exitTimer)
    }
  }, [onComplete])

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={cn(
          'absolute inset-0 z-50 flex flex-col items-center justify-center gap-8 overflow-hidden p-6 pointer-events-auto',
          appearance === 'paper' ? 'bg-game-canvas' : 'bg-game-night-canvas',
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${background || '/backgrounds/battle.avif'})`,
          }}
          aria-hidden="true"
          data-testid="vs-animation-backdrop"
        />
        <div
          className={cn(
            'pointer-events-none absolute inset-0',
            appearance === 'paper'
              ? 'bg-game-canvas/70'
              : 'bg-game-night-canvas/70',
          )}
          aria-hidden="true"
        />
        {/* Player Card (Slide Down) */}
        <motion.div
          initial={{ y: '-100vh' }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className={cn(
            'relative z-10 w-full max-w-3xl shrink-0 overflow-hidden rounded-xl border shadow-lg',
            appearance === 'paper'
              ? 'border-game-border bg-game-surface-raised'
              : 'rounded-3xl border-4 border-game-night-border shadow-2xl',
          )}
        >
          <div
            className={
              appearance === 'paper'
                ? 'bg-game-surface-raised'
                : 'bg-game-night-surface'
            }
          >
            <TrainerCard
              name={player.name}
              icon={player.icon}
              banner={player.banner}
              title={player.title}
              appearance={appearance}
              className="w-full rounded-none border-none"
            />
            {/* Gradient for VS Text Contrast */}
            {appearance === 'default' && (
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/50 to-transparent" />
            )}
          </div>
        </motion.div>

        {/* VS Text (Center) */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
          <AnimatePresence>
            {showVS && (
              <motion.div
                initial={{ scale: 5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', duration: 0.5, bounce: 0.5 }}
                className="relative"
              >
                <span
                  className={cn(
                    'font-black italic text-9xl tracking-tighter',
                    appearance === 'paper' ? 'text-game-ink' : 'text-white',
                  )}
                  style={{
                    textShadow:
                      appearance === 'paper'
                        ? '0 2px 10px rgba(255,248,232,0.8), 0 1px 2px rgba(41,53,50,0.2)'
                        : '0 0 20px rgba(255,255,255,0.8), 4px 4px 0px #000',
                  }}
                >
                  VS
                </span>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '120%' }}
                  className="absolute top-1/2 left-1/2 -z-10 h-2 -translate-x-1/2 -translate-y-1/2 -skew-x-12 bg-game-ochre"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enemy Card (Slide Up) */}
        <motion.div
          initial={{ y: '100vh' }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className={cn(
            'relative z-10 w-full max-w-3xl shrink-0 overflow-hidden rounded-xl border shadow-lg',
            appearance === 'paper'
              ? 'border-game-border bg-game-surface-raised'
              : 'rounded-3xl border-4 border-game-night-border shadow-2xl',
          )}
        >
          <div
            className={
              appearance === 'paper'
                ? 'bg-game-surface-raised'
                : 'bg-game-night-surface'
            }
          >
            <TrainerCard
              name={enemy.name}
              icon={enemy.icon}
              banner={enemy.banner}
              title={enemy.title}
              appearance={appearance}
              className="w-full rounded-none border-none"
            />
            {/* Gradient for VS Text Contrast */}
            {appearance === 'default' && (
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black via-black/50 to-transparent" />
            )}
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  )
}
