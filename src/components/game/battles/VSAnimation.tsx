'use client'

import React, { useEffect, useState } from 'react'
import { TrainerCard } from './TrainerCard'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface VSAnimationProps {
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

export function VSAnimation({ player, enemy, onComplete }: VSAnimationProps) {
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
    <div className="absolute inset-0 z-50 overflow-hidden bg-black/90 backdrop-blur-md flex flex-col justify-center items-center pointer-events-auto p-6 gap-8">
      {/* Player Card (Slide Down) */}
      <motion.div
        initial={{ y: '-100vh' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="w-full max-w-3xl relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-game-night-border shrink-0"
      >
        <div className="bg-game-night-surface">
          <TrainerCard
            name={player.name}
            icon={player.icon}
            banner={player.banner}
            title={player.title}
            className="w-full rounded-none border-none"
          />
          {/* Gradient for VS Text Contrast */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
      </motion.div>

      {/* VS Text (Center) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
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
                className="font-black italic text-9xl text-white tracking-tighter"
                style={{
                  textShadow: '0 0 20px rgba(255,255,255,0.8), 4px 4px 0px #000',
                }}
              >
                VS
              </span>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '120%' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 bg-game-ochre -skew-x-12 -z-10"
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
        className="w-full max-w-3xl relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-game-night-border shrink-0"
      >
        <div className="bg-game-night-surface">
          <TrainerCard
            name={enemy.name}
            icon={enemy.icon}
            banner={enemy.banner}
            title={enemy.title}
            className="w-full rounded-none border-none"
          />
          {/* Gradient for VS Text Contrast */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black via-black/50 to-transparent" />
        </div>
      </motion.div>
    </div>
  )
}
