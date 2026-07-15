'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { RewardSummary } from '@/utilities/rewards/reward-logic'
import { ItemSprite } from '@/components/ui/item-sprite'
import type { CaptureThrowPoint } from '@/utilities/pokemon/catch-balance'

export type CaptureAnimationStatus = 'pending' | 'caught' | 'failed' | 'error'

interface CaptureAnimationProps {
  ballId: string
  status: CaptureAnimationStatus
  throwFrom?: CaptureThrowPoint
  throwTarget?: CaptureThrowPoint
  rewards?: RewardSummary
  onComplete: (rewards?: RewardSummary) => void
  onContact?: () => void
  onResolve?: (status: CaptureAnimationStatus) => void
}

export function CaptureAnimation({
  ballId,
  status,
  throwFrom,
  throwTarget,
  rewards,
  onComplete,
  onContact,
  onResolve,
}: CaptureAnimationProps) {
  const [phase, setPhase] = useState<'throw' | 'rock' | 'success' | 'fail'>('throw')
  const [contacted, setContacted] = useState(false)
  const [canResolve, setCanResolve] = useState(false)

  const start = throwFrom ?? { x: 0, y: 0 }
  const target = throwTarget ?? start

  useEffect(() => {
    const contactTimer = window.setTimeout(() => {
      setContacted(true)
      setPhase('rock')
      onContact?.()
    }, 360)
    const minimumRockTimer = window.setTimeout(() => {
      setCanResolve(true)
    }, 1180)

    return () => {
      window.clearTimeout(contactTimer)
      window.clearTimeout(minimumRockTimer)
    }
  }, [onContact])

  useEffect(() => {
    if (!contacted || !canResolve || status === 'pending') return

    setPhase(status === 'caught' ? 'success' : 'fail')
    onResolve?.(status)

    const completeTimer = window.setTimeout(() => {
      onComplete(rewards)
    }, status === 'caught' ? 820 : 720)

    return () => window.clearTimeout(completeTimer)
  }, [canResolve, contacted, onComplete, onResolve, rewards, status])

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {(phase === 'success' || phase === 'fail') && (
        <div
          className={
            phase === 'success'
              ? 'absolute inset-0 animate-[capture-flash_0.62s_ease-out_1] bg-white'
              : 'absolute inset-0 animate-[capture-fail-flash_0.56s_ease-out_1] bg-red-200'
          }
        />
      )}

      <motion.div
        className="absolute flex h-28 w-28 items-center justify-center"
        initial={{
          x: start.x - 56,
          y: start.y - 56,
          scale: 0.72,
          opacity: 1,
        }}
        animate={{
          x: target.x - 56,
          y: target.y - 56,
          scale: phase === 'throw' ? 1 : phase === 'fail' ? 1.12 : 1,
          opacity: phase === 'fail' ? 0 : 1,
        }}
        transition={{
          x: { duration: 0.36, ease: 'easeOut' },
          y: { duration: 0.36, ease: 'easeOut' },
          scale: { duration: 0.28 },
          opacity: { duration: 0.5 },
        }}
      >
        <div className="absolute h-24 w-24 rounded-full bg-game-ochre/15 blur-2xl" />
        <div
          className={
            phase === 'rock'
              ? 'animate-[capture-rock_0.52s_ease-in-out_infinite] rounded-full'
              : phase === 'success'
                ? 'animate-[capture-success_0.36s_ease-out_1] rounded-full'
                : phase === 'fail'
                  ? 'animate-[capture-break_0.58s_ease-in_1] rounded-full'
                  : 'rounded-full'
          }
        >
          <ItemSprite
            itemId={ballId}
            alt="Pokeball"
            width={112}
            height={112}
            className="h-28 w-28 object-contain pixelated drop-shadow-2xl"
          />
        </div>
      </motion.div>
      <style jsx global>{`
        @keyframes capture-rock {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(-16deg) scale(1.03); }
          75% { transform: rotate(16deg) scale(1.03); }
        }
        @keyframes capture-success {
          0% { transform: scale(1); filter: brightness(1); }
          55% { transform: scale(1.12); filter: brightness(2); }
          100% { transform: scale(1); filter: brightness(1); }
        }
        @keyframes capture-break {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          45% { transform: translateY(-10px) scale(1.08) rotate(-14deg); opacity: 1; }
          100% { transform: translateY(22px) scale(0.76) rotate(18deg); opacity: 0; }
        }
        @keyframes capture-flash {
          0% { opacity: 0; }
          35% { opacity: 0.9; }
          100% { opacity: 0; }
        }
        @keyframes capture-fail-flash {
          0% { opacity: 0; }
          35% { opacity: 0.55; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
