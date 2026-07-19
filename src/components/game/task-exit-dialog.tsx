'use client'

import { Button } from '@/components/ui/button'
import type { TaskExitModal } from '@/data/tasks'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { parseText } from '@/utilities/text-parsing'
import { useUser } from '@/context/UserContext'
import { GameInfoModal } from '@/components/game/shared/GameInfoModal'
import { getIcon } from '@/data/user/icons'

interface TaskExitDialogProps {
  data: TaskExitModal | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TaskExitDialog({ data, open, onOpenChange }: TaskExitDialogProps) {
  const { user, gameData } = useUser()
  const trainerName = user?.trainerName || 'Trainer'

  if (!data) return null

  const rivalIconId = data.dynamicOpponent === 'rival' ? gameData?.rivalTrainer?.icon : undefined
  const displayIcon = (rivalIconId && getIcon(rivalIconId)?.icon) || data.icon
  const iconElement = displayIcon ? (
    <TaskIconDisplay icon={displayIcon} className="w-8 h-8 text-game-moss-strong" />
  ) : null

  return (
    <GameInfoModal
      open={open}
      onOpenChange={onOpenChange}
      title={parseText(data.title, trainerName)}
      description={parseText(data.message, trainerName)}
      icon={iconElement}
      background={data.background}
      actionButton={
        <Button
          onClick={() => onOpenChange(false)}
          className="min-h-11 w-full border border-game-clay bg-game-clay text-game-cream hover:bg-game-clay/90"
        >
          {data.closeButtonText || 'Close'}
        </Button>
      }
    />
  )
}
