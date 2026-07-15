'use client'

import {
  Clock,
  Loader2,
  Sword,
  Trophy,
  UserMinus,
  UserPlus,
  Zap,
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  removeFriend,
  sendFriendRequest,
} from '@/app/(frontend)/game/trainer/friend-actions'
import { TrainerCard } from '@/components/game/battles/TrainerCard'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { ItemSprite } from '@/components/ui/item-sprite'
import { Progress } from '@/components/ui/progress'
import { SectionDivider } from '@/components/ui/section-divider'
import { useUser } from '@/context/UserContext'
import { getTotalExpForLevel, skills } from '@/data/skills'
import { getIcon, getTitle } from '@/data/user'
import { cn } from '@/lib/utils'

interface TrainerModalProps {
  trainer: any | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TrainerModal({
  trainer,
  open,
  onOpenChange,
}: TrainerModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { user } = useUser()
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api) {
      return
    }

    const intervalId = setInterval(() => {
      api.scrollNext()
    }, 3000)

    return () => clearInterval(intervalId)
  }, [api])

  /* State for optimistic UI updates */
  const [friendStatus, setFriendStatus] = useState<
    'none' | 'pending' | 'friend'
  >('none')

  // Initialize status from props
  useEffect(() => {
    if (trainer) {
      if (trainer.isFriend) setFriendStatus('friend')
      else if (trainer.hasPendingRequest) setFriendStatus('pending')
      else setFriendStatus('none')
    }
  }, [trainer])

  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false)

  const handleFriendAction = async () => {
    if (friendStatus === 'friend') {
      setShowRemoveConfirmation(true)
    } else if (friendStatus === 'none') {
      setIsLoading(true)
      try {
        const result = await sendFriendRequest(trainer.id)
        if (result.success) {
          setFriendStatus('pending')
          toast.success('Friend request sent!')
          router.refresh()
        } else {
          toast.error(result.error || 'Failed to send request')
        }
      } catch (error) {
        toast.error('An error occurred')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleRemoveFriend = async () => {
    setIsLoading(true)
    try {
      const result = await removeFriend(trainer.id)
      if (result.success) {
        setFriendStatus('none')
        toast.success('Friend removed')
        router.refresh()
        onOpenChange(false)
      } else {
        toast.error(result.error || 'Failed to remove friend')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setIsLoading(false)
      setShowRemoveConfirmation(false)
    }
  }

  if (!trainer) return null

  const isSelf = user?.id === trainer.id

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-hidden p-0 sm:max-w-md">
        <DialogTitle className="sr-only">
          {trainer.trainerName
            ? `${trainer.trainerName} Trainer Profile`
            : 'Trainer Profile'}
        </DialogTitle>
        <div className="relative flex h-full flex-col overflow-y-auto bg-game-canvas p-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-game-border md:p-6">
          <div className="space-y-10 relative z-10">
            <div className="relative group">
              <TrainerCard
                name={trainer.trainerName}
                icon={trainer.icon}
                banner={trainer.banner}
                title={trainer.title}
                className="relative z-10 aspect-[8/5] h-auto w-full border border-game-border"
              />
            </div>

            {/* Stats Grid */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-game-ochre" />
                <SectionDivider>Stats</SectionDivider>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    label: 'TCG Cards',
                    value: trainer.stats.uniqueCards,
                    icon: <Zap className="w-3 h-3" />,
                  },
                  {
                    label: 'Seen',
                    value: trainer.stats.pokedexSeen,
                    icon: <Clock className="w-3 h-3" />,
                  },
                  {
                    label: 'Caught',
                    value: trainer.stats.pokedexCaught,
                    icon: <Trophy className="w-3 h-3" />,
                  },
                ].map((stat, i) => (
                  <div key={i} className="relative group/stat">
                    <div className="relative z-10 rounded-xl border border-game-border bg-game-surface-raised p-4 text-center transition-colors group-hover:border-game-moss/45">
                      <div className="text-2xl font-black tracking-tighter text-game-ink">
                        {stat.value}
                      </div>
                      <div className="mt-1 flex items-center justify-center gap-1 text-[10px] font-black uppercase tracking-[0.08em] text-game-muted">
                        {stat.icon}
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Battle Team Slots */}
            {trainer.battleTeam && trainer.battleTeam.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sword className="w-4 h-4 text-game-moss-strong" />
                  <SectionDivider>Battle Formation</SectionDivider>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {trainer.battleTeam
                    .slice(0, 6)
                    .map((pokemonId: string, index: number) => (
                      <div
                        key={index}
                        className="group/slot flex aspect-square cursor-help flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-game-border bg-game-surface transition-colors hover:border-game-moss/35 hover:bg-game-surface-raised"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-game-border bg-game-canvas">
                          <Sword className="h-4 w-4 text-game-muted transition-colors group-hover/slot:text-game-moss" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.08em] text-game-muted">
                          Slot {index + 1}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Skills Carousel */}
            <div className="space-y-4 min-w-0">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-game-ochre" />
                <SectionDivider>Skills</SectionDivider>
              </div>
              <Carousel
                opts={{
                  align: 'start',
                  loop: true,
                }}
                setApi={setApi}
                className="w-full max-w-full"
              >
                <CarouselContent>
                  {skills.map((skill) => {
                    const skillData = trainer.skills?.[skill.id] || {
                      level: 1,
                      exp: 0,
                    }
                    const level = skillData.level || 1
                    const exp = skillData.exp || 0
                    const nextLevelExp = getTotalExpForLevel(level + 1)
                    const currentLevelExp = getTotalExpForLevel(level)
                    const progress =
                      nextLevelExp > currentLevelExp
                        ? ((exp - currentLevelExp) /
                            (nextLevelExp - currentLevelExp)) *
                          100
                        : 100

                    return (
                      <CarouselItem
                        key={skill.id}
                        className="basis-full min-w-0"
                      >
                        <div className="group relative flex items-center gap-5 overflow-hidden rounded-xl border border-game-border bg-game-surface-raised p-5">
                          <div className="relative">
                            <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-game-border bg-game-surface">
                              {skill.iconId ? (
                                skill.iconId.match(
                                  /\.(?:avif|png|webp|jpe?g)$/,
                                ) ? (
                                  <Image
                                    src={`/fallback/skills/${skill.iconId}`}
                                    alt={skill.name}
                                    width={32}
                                    height={32}
                                    className="w-8 h-8 object-contain"
                                  />
                                ) : (
                                  <ItemSprite
                                    itemId={skill.iconId}
                                    alt={skill.name}
                                    width={32}
                                    height={32}
                                    className="w-8 h-8 object-contain"
                                  />
                                )
                              ) : null}
                            </div>
                          </div>

                          <div className="flex flex-col flex-1 min-w-0 gap-3">
                            <div className="flex items-center justify-between px-1">
                              <span className="text-sm font-black uppercase tracking-wider text-game-ink">
                                {skill.name}
                              </span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-[10px] font-black uppercase text-game-muted">
                                  Rank
                                </span>
                                <span className="text-xl font-black tracking-tighter text-game-moss-strong">
                                  {level}
                                </span>
                              </div>
                            </div>
                            <div className="relative">
                              <div className="h-2 overflow-hidden rounded-full border border-game-border bg-game-canvas">
                                <div
                                  className="h-full bg-game-ochre transition-all duration-1000"
                                  style={{
                                    width: `${Math.min(progress, 100)}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    )
                  })}
                </CarouselContent>
              </Carousel>
            </div>

            {/* Confirmation Dialog */}
            <AlertDialog
              open={showRemoveConfirmation}
              onOpenChange={setShowRemoveConfirmation}
            >
              <AlertDialogContent className="border-game-border bg-game-surface p-6">
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-display text-2xl font-black tracking-tighter text-game-ink">
                    Remove friend?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="font-medium text-game-muted">
                    Remove{' '}
                    <span className="font-bold text-game-ink">
                      {trainer.trainerName}
                    </span>{' '}
                    from your friends list?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-3 mt-6">
                  <AlertDialogCancel
                    disabled={isLoading}
                    className="h-11 border-game-border bg-game-surface-raised text-game-ink hover:bg-game-moss/10"
                  >
                    Return
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(e) => {
                      e.preventDefault()
                      handleRemoveFriend()
                    }}
                    disabled={isLoading}
                    aria-busy={isLoading}
                    className="h-11 bg-game-clay text-game-cream hover:bg-game-clay/90"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      'Remove friend'
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Friend Action Button */}
            {!isSelf && (
              <Button
                onClick={handleFriendAction}
                disabled={isLoading || friendStatus === 'pending'}
                aria-busy={isLoading}
                className={cn(
                  'h-11 w-full',
                  friendStatus === 'friend'
                    ? 'border border-game-border bg-game-surface text-game-muted hover:border-game-danger/40 hover:bg-game-danger/10 hover:text-game-danger'
                    : friendStatus === 'pending'
                      ? 'cursor-not-allowed border border-game-border bg-game-surface text-game-muted'
                      : 'bg-game-clay text-game-cream hover:bg-game-clay/90',
                )}
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  {friendStatus === 'friend' ? (
                    <>
                      <UserMinus className="h-5 w-5" />
                      Remove Friend
                    </>
                  ) : friendStatus === 'pending' ? (
                    <>
                      <Clock className="w-5 h-5" />
                      Friend request pending
                    </>
                  ) : (
                    <>
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <UserPlus className="h-5 w-5" />
                      )}
                      Add friend
                    </>
                  )}
                </div>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
