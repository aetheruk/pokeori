'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { Search, Swords, Loader2, UserRound } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GameInfoModal } from '@/components/game/shared/GameInfoModal'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { SectionDivider } from '@/components/ui/section-divider'
import { useUser } from '@/context/UserContext'
import { getIcon, getTitle } from '@/data/user'
import { searchTrainers } from '@/app/(frontend)/game/trainer/actions'
import { selectRivalTrainer } from '@/app/(frontend)/game/rivals/actions'

interface RivalSelectionDialogProps {
  taskId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

type TrainerSearchResult = {
  id: string
  trainerName: string
  icon?: string | null
  banner?: string | null
  title?: string | null
}

export function RivalSelectionDialog({
  taskId,
  open,
  onOpenChange,
  onSuccess,
}: RivalSelectionDialogProps) {
  const { user } = useUser()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<TrainerSearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectingId, setSelectingId] = useState<string | null>(null)

  useEffect(() => {
    if (open) return
    setQuery('')
    setResults([])
    setIsSearching(false)
    setSelectingId(null)
  }, [open])

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault()
    const trimmed = query.trim()
    if (trimmed.length < 3) return

    setIsSearching(true)
    setResults([])
    try {
      const result = await searchTrainers(trimmed)
      if (result.success) {
        setResults((result.data || []) as TrainerSearchResult[])
        if ((result.data || []).length === 0) {
          toast.error('No trainers found.')
        }
      } else {
        toast.error(result.error || 'Trainer search failed.')
      }
    } catch {
      toast.error('Trainer search failed.')
    } finally {
      setIsSearching(false)
    }
  }

  const handleSelect = async (trainerId: string) => {
    setSelectingId(trainerId)
    try {
      const result = await selectRivalTrainer(trainerId, taskId)
      if (result.success) {
        toast.success(`${result.rivalName || 'Rival'} is now your rival.`)
        onSuccess()
        onOpenChange(false)
      } else {
        toast.error(result.error || 'Failed to choose rival.')
      }
    } catch {
      toast.error('Failed to choose rival.')
    } finally {
      setSelectingId(null)
    }
  }

  const selfTrainer = user
    ? {
        id: user.id,
        trainerName: user.trainerName || 'Trainer',
        icon: user.icon,
        banner: user.banner,
        title: user.title,
      }
    : null

  const trainers = [
    ...(selfTrainer ? [selfTrainer] : []),
    ...results.filter((trainer) => trainer.id !== user?.id),
  ]

  return (
    <GameInfoModal
      open={open}
      onOpenChange={onOpenChange}
      title="Choose Your Rival"
      category="Professor Oak"
      description="Choose the trainer whose progress you want to measure yourself against. Rival battles will use their live Battle Team."
      background="/backgrounds/lab.avif"
      icon={<Swords className="w-8 h-8 text-game-moss-strong" />}
      autoScrollRewards={false}
    >
      <div className="space-y-6">
        <form onSubmit={handleSearch} className="space-y-3">
          <SectionDivider>Trainer Search</SectionDivider>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-game-muted" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search trainer name..."
                className="h-11 border-game-border bg-game-surface-raised pl-9 text-game-ink"
              />
            </div>
            <Button
              type="submit"
              disabled={isSearching || query.trim().length < 3}
              className="h-11 bg-game-clay px-4 font-bold text-game-cream hover:bg-game-clay/90"
            >
              {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search'}
            </Button>
          </div>
        </form>

        <div className="space-y-3">
          <SectionDivider>Pick Rival</SectionDivider>
          <div className="grid gap-2">
            {trainers.map((trainer) => {
              const iconData = getIcon(trainer.icon || 'ditto')
              const titleData = getTitle(trainer.title || 'new-beginnings')
              const isSelf = trainer.id === user?.id
              const isSelecting = selectingId === trainer.id

              return (
                <button
                  key={trainer.id}
                  type="button"
                  onClick={() => handleSelect(trainer.id)}
                  disabled={!!selectingId}
                  className="flex w-full items-center gap-3 rounded-lg border border-game-border bg-game-surface-raised p-3 text-left transition-colors hover:border-game-moss/50 hover:bg-game-moss/10 disabled:opacity-60"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-game-border bg-game-surface">
                    {iconData?.icon ? (
                      <TaskIconDisplay icon={iconData.icon} className="h-8 w-8" />
                    ) : (
                      <UserRound className="h-6 w-6 text-game-muted" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-bold text-game-ink">
                      {isSelf ? "I'm My Own Rival" : trainer.trainerName}
                    </div>
                    <div className="truncate text-[11px] font-bold uppercase tracking-wider text-game-moss-strong">
                      {isSelf ? trainer.trainerName : titleData?.name || 'Trainer'}
                    </div>
                  </div>
                  {isSelecting && <Loader2 className="h-4 w-4 animate-spin text-game-moss" />}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </GameInfoModal>
  )
}
