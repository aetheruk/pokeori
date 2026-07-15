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
          size="lg"
          variant="outline"
          className="w-full border border-game-border bg-game-surface-raised text-game-ink transition-colors hover:border-game-moss/50 hover:bg-game-moss/10"
        >
          {data.closeButtonText || 'Close'}
        </Button>
      }
    />
  )
}
