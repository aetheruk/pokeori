'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { TaskEnterModalStep, TaskEnterModalButton } from '@/data/tasks'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { parseText } from '@/utilities/text-parsing'
import { useUser } from '@/context/UserContext'
import { GameInfoModal } from '@/components/game/shared/GameInfoModal'
import { validateEnterModalPassword } from '@/utilities/tasks/actions'
import { Loader2 } from 'lucide-react'

interface TaskEnterDialogProps {
  taskId: string
  steps: TaskEnterModalStep[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void | Promise<void>
  onFail: () => void
}

export function TaskEnterDialog({
  taskId,
  steps,
  open,
  onOpenChange,
  onSuccess,
  onFail,
}: TaskEnterDialogProps) {
  const { user } = useUser()
  const trainerName = user?.trainerName || 'Trainer'

  const [currentStepId, setCurrentStepId] = useState(1)
  const [passwordInput, setPasswordInput] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activePasswordButton, setActivePasswordButton] = useState<TaskEnterModalButton | null>(
    null,
  )

  const currentStep = steps.find((s) => s.id === currentStepId) || steps.find((s) => s.id === 1)

  if (!currentStep) return null

  const handleButtonClick = async (button: TaskEnterModalButton) => {
    switch (button.type) {
      case 'navigate':
        if (button.id !== undefined) {
          setCurrentStepId(button.id)
          setPasswordInput('')
          setActivePasswordButton(null)
        }
        break

      case 'success':
        setIsSubmitting(true)
        try {
          await onSuccess()
        } finally {
          // Successful actions close and unmount this task's dialog. Keep its
          // final line in place during that handoff instead of flashing back
          // to the opening dialogue.
          setIsSubmitting(false)
        }
        break

      case 'password':
        // Show password input for this button
        setActivePasswordButton(button)
        break

      case 'fail':
        onFail()
        // Reset state for next time
        setCurrentStepId(1)
        setPasswordInput('')
        setActivePasswordButton(null)
        break
    }
  }

  const handlePasswordSubmit = async () => {
    if (!activePasswordButton || !passwordInput.trim()) return

    setIsValidating(true)
    try {
      const result = await validateEnterModalPassword(taskId, passwordInput)

      if (result.success && result.correct) {
        // Correct password - navigate to success step
        if (activePasswordButton.id !== undefined) {
          setCurrentStepId(activePasswordButton.id)
        }
      } else {
        // Incorrect password - navigate to fail step
        if (activePasswordButton.fail !== undefined) {
          setCurrentStepId(activePasswordButton.fail)
        }
      }
      setPasswordInput('')
      setActivePasswordButton(null)
    } finally {
      setIsValidating(false)
    }
  }

  const iconElement = currentStep.icon ? (
    <TaskIconDisplay icon={currentStep.icon} className="h-20 w-20 text-white md:h-24 md:w-24" priority />
  ) : null

  return (
    <GameInfoModal
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          // Reset state when closing
          setCurrentStepId(1)
          setPasswordInput('')
          setActivePasswordButton(null)
        }
        onOpenChange(isOpen)
      }}
      title={parseText(currentStep.title, trainerName)}
      description={parseText(currentStep.message, trainerName)}
      icon={iconElement}
      background={currentStep.background}
      resultLayout
      actionButton={
        <div className="w-full space-y-3">
          {/* Password Input (when active) */}
          {activePasswordButton && (
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 sm:flex">
              <Input
                type="password"
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handlePasswordSubmit()
                  }
                }}
                className="min-w-0 bg-game-surface-raised sm:flex-1"
                disabled={isValidating}
              />
              <Button
                onClick={handlePasswordSubmit}
                disabled={isValidating || !passwordInput.trim()}
                className="min-h-11 border border-game-clay bg-game-clay text-game-cream hover:bg-game-clay/90"
              >
                {isValidating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit'}
              </Button>
              <Button
                onClick={() => {
                  setActivePasswordButton(null)
                  setPasswordInput('')
                }}
                disabled={isValidating}
                className="col-span-2 min-h-11 border border-game-clay bg-game-clay text-game-cream hover:bg-game-clay/90 sm:col-span-1"
              >
                Cancel
              </Button>
            </div>
          )}

          {/* Buttons (hidden when password input is active) */}
          {!activePasswordButton && (
            <div className="flex flex-col gap-2 w-full">
              {currentStep.buttons.slice(0, 4).map((button, idx) => (
                <Button
                  key={idx}
                  onClick={() => handleButtonClick(button)}
                  disabled={isSubmitting}
                  className="min-h-11 w-full border border-game-clay bg-game-clay text-game-cream hover:bg-game-clay/90"
                >
                  {isSubmitting && button.type === 'success' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Completing…
                    </>
                  ) : (
                    parseText(button.text, trainerName)
                  )}
                </Button>
              ))}
            </div>
          )}
        </div>
      }
    />
  )
}
