'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { TaskIcon } from '@/data/types'
import { RewardSummary } from '@/utilities/rewards/reward-logic'

interface ScratchCardModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  background: string
  icon: TaskIcon
  rewards: any[] // Reward[]
  summary?: RewardSummary
  onClose: () => void
}

export function ScratchCardModal(props: ScratchCardModalProps) {
  const { open, onOpenChange, onClose } = props

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) onClose()
        onOpenChange(val)
      }}
    >
      <DialogContent className="game-night !bg-transparent flex w-auto max-w-none flex-col items-center justify-center gap-4 overflow-visible border-none p-0 shadow-none focus:outline-none">
        <DialogTitle className="sr-only">Scratch card reward</DialogTitle>
        {open && <ScratchCardInterface {...props} />}
      </DialogContent>
    </Dialog>
  )
}

function ScratchCardInterface({
  background,
  icon,
  rewards,
  summary,
  onClose,
  onOpenChange,
}: ScratchCardModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [showRewards, setShowRewards] = useState(false)
  const [isScratching, setIsScratching] = useState(false)

  // Initialize canvas only once on mount
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Set canvas size (match CSS size)
      canvas.width = 150
      canvas.height = 150

      // Draw scratch layer
      ctx.fillStyle = '#C0C0C0' // Silver
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add "Scratch Here" text
      ctx.fillStyle = '#A0A0A0'
      ctx.font = 'bold 16px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('?', canvas.width / 2, canvas.height / 2)
    }
  }, []) // Empty dependency array = run once on mount

  const handleScratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (isRevealed) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    // Handle both mouse and touch coordinates
    let clientX, clientY

    if ('touches' in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = (e as React.MouseEvent).clientX
      clientY = (e as React.MouseEvent).clientY
    }

    const x = clientX - rect.left
    const y = clientY - rect.top

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 15, 0, Math.PI * 2)
    ctx.fill()

    setIsScratching(true)

    // Check reveal percentage strictly
    if (Math.random() < 0.2) {
      // Check slightly more often
      checkReveal(canvas)
    }
  }

  const checkReveal = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    let transparent = 0
    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] < 128) transparent++
    }

    const percentage = transparent / (pixels.length / 4)
    if (percentage > 0.8) {
      // 80% threshold
      setIsRevealed(true)
    }
  }

  // Handle rewards display via a nested Dialog or just swapping content?
  // Since we are already inside a Dialog, we can just replace the content.
  // Or better, open a separate rewards dialog?
  // The original implementation opened a nested Dialog? No, it conditionally returned a different Dialog.
  // But Radix Dialogs don't like being nested or swapped easily if controlled from inside.
  // Let's keep using the swapping method but inside this component.

  if (showRewards) {
    return (
      <RewardResultOverlay
        result={{
          success: hasScratchCardRewards(summary),
          rewards: summary,
        }}
        title={hasScratchCardRewards(summary) ? 'WINNER!' : 'BAD LUCK!'}
        message={
          hasScratchCardRewards(summary)
            ? 'You won a prize!'
            : 'Better luck next time.'
        }
        icon={icon}
        onClose={() => {
          onClose() // Close the scratch modal when result is closed
        }}
      />
    )
  }

  return (
    <>
      {/* Card Container */}
      <div
        className="relative aspect-[1/2] animate-in overflow-hidden rounded-xl border border-game-border bg-game-night-canvas shadow-lg zoom-in-95 duration-300"
        style={{
          width:
            'min(300px, calc(100vw - 4rem), calc((100dvh - 8rem) / 2))',
        }}
      >
        {/* Background Image */}
        {background && (
          <Image
            src={background}
            alt="Scratch Card"
            fill
            className="object-cover"
            priority
          />
        )}

        {/* Scratch Area */}
        <div className="absolute left-1/2 top-[50%] z-10 flex h-[150px] w-[150px] -translate-x-1/2 -translate-y-[50%] items-center justify-center overflow-hidden rounded-full bg-game-cream">
          {/* Prize Icon (Revegetaled) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <TaskIconDisplay icon={icon} className="w-20 h-20" />
          </div>

          {/* Scratch Canvas */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full cursor-pointer touch-none transition-opacity duration-1000 z-20 ${isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onMouseDown={handleScratch}
            onMouseMove={(e) => hasButtonPressed(e) && handleScratch(e)}
            onTouchMove={handleScratch}
            onTouchStart={handleScratch}
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Button
          onClick={() => setShowRewards(true)}
          className={`transition-all duration-300 font-bold ${
            isRevealed
              ? 'translate-y-0 bg-game-clay text-game-cream opacity-100 hover:bg-game-clay/90'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          Claim Prize
        </Button>
      </div>
    </>
  )
}

export function hasScratchCardRewards(summary?: RewardSummary) {
  if (!summary) return false
  return (
    summary.items.length > 0 ||
    summary.currency.length > 0 ||
    summary.cards.length > 0 ||
    summary.pokemon.length > 0 ||
    Object.keys(summary.xp).length > 0 ||
    summary.icons.length > 0 ||
    summary.titles.length > 0 ||
    summary.banners.length > 0 ||
    summary.tasksCompleted.length > 0 ||
    (summary.taskExitModals?.length || 0) > 0 ||
    summary.upgrades.length > 0 ||
    (summary.researchXp?.length || 0) > 0 ||
    (summary.researchBreakthroughs?.length || 0) > 0 ||
    Boolean(summary.levelUp)
  )
}

function hasButtonPressed(e: React.MouseEvent) {
  return e.buttons === 1
}
