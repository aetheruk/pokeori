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
  onSuccess: () => void
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
        onSuccess()
        // Reset state for next time
        setCurrentStepId(1)
        setPasswordInput('')
        setActivePasswordButton(null)
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
    <TaskIconDisplay icon={currentStep.icon} className="w-8 h-8 text-game-moss-strong" />
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
                  className="min-h-11 w-full border border-game-clay bg-game-clay text-game-cream hover:bg-game-clay/90"
                >
                  {parseText(button.text, trainerName)}
                </Button>
              ))}
            </div>
          )}
        </div>
      }
    />
  )
}
