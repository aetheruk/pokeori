'use client'

import { Clock, Loader2, UserMinus, UserPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  removeFriend,
  sendFriendRequest,
} from '@/app/(frontend)/game/trainer/friend-actions'
import { TrainerCard } from '@/components/game/battles/TrainerCard'
import { PokemonRaritySprite } from '@/components/game/shared/PokemonRaritySprite'
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
import { ResponsivePanel } from '@/components/ui/responsive-panel'
import { SectionDivider } from '@/components/ui/section-divider'
import { useUser } from '@/context/UserContext'
import { getTotalExpForLevel, skills } from '@/data/skills'
import { cn } from '@/lib/utils'
import type { PublicTrainerSummary } from './types'

interface TrainerModalProps {
  trainer: PublicTrainerSummary | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TrainerModal({
  trainer,
  open,
  onOpenChange,
}: TrainerModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [friendStatus, setFriendStatus] = useState<
    'none' | 'pending' | 'friend'
  >('none')
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false)
  const router = useRouter()
  const { user } = useUser()

  useEffect(() => {
    if (!trainer) return
    setFriendStatus(
      trainer.isFriend
        ? 'friend'
        : trainer.hasPendingRequest
          ? 'pending'
          : 'none',
    )
  }, [trainer])

  if (!trainer) return null
  const isSelf = user?.id === trainer.id

  const handleFriendAction = async () => {
    if (friendStatus === 'friend') {
      setShowRemoveConfirmation(true)
      return
    }
    if (friendStatus !== 'none') return
    setIsLoading(true)
    try {
      const result = await sendFriendRequest(trainer.id)
      if (!result.success) {
        toast.error(result.error || 'Friend request could not be sent')
        return
      }
      setFriendStatus('pending')
      toast.success('Friend request sent')
      router.refresh()
    } catch {
      toast.error(
        'Friend request could not be sent. Check your connection and try again.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveFriend = async () => {
    setIsLoading(true)
    try {
      const result = await removeFriend(trainer.id)
      if (!result.success) {
        toast.error(result.error || 'Friend could not be removed')
        return
      }
      setFriendStatus('none')
      toast.success('Friend removed')
      router.refresh()
      onOpenChange(false)
    } catch {
      toast.error(
        'Friend could not be removed. Check your connection and try again.',
      )
    } finally {
      setIsLoading(false)
      setShowRemoveConfirmation(false)
    }
  }

  return (
    <>
      <ResponsivePanel
        open={open}
        onOpenChange={onOpenChange}
        title={`${trainer.trainerName}'s field note`}
        description="Public trainer profile"
        desktopWidth="min(40vw, 560px)"
        desktopBreakpoint="lg"
        className="overflow-hidden"
      >
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-5 pt-4 sm:px-5">
          <TrainerCard
            name={trainer.trainerName}
            icon={trainer.icon}
            banner={trainer.banner}
            title={trainer.title}
            className="h-44 w-full rounded-lg"
          />

          <SectionDivider className="my-5">Trainer record</SectionDivider>
          <div className="grid grid-cols-3 divide-x divide-game-border rounded-lg border border-game-border bg-game-surface">
            <ProfileMetric label="Cards" value={trainer.stats.uniqueCards} />
            <ProfileMetric label="Seen" value={trainer.stats.pokedexSeen} />
            <ProfileMetric label="Caught" value={trainer.stats.pokedexCaught} />
          </div>

          <SectionDivider className="my-5">Battle team</SectionDivider>
          {trainer.battleTeam.length === 0 ? (
            <p className="rounded-lg border border-dashed border-game-border bg-game-surface px-4 py-6 text-center text-sm text-game-muted">
              No public battle team is currently assigned.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {trainer.battleTeam.slice(0, 6).map((pokemon) => (
                <div
                  key={`${pokemon.position}-${pokemon.formId}`}
                  className="flex min-w-0 items-center gap-2 rounded-lg border border-game-border bg-game-surface p-2"
                >
                  <PokemonRaritySprite
                    formId={pokemon.formId}
                    view="home"
                    rarity={pokemon.rarity}
                    alt={pokemon.name}
                    className="h-11 w-11 shrink-0"
                    sizes="44px"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-game-ink">
                      {pokemon.name}
                    </p>
                    <p className="font-mono text-[11px] text-game-muted">
                      Lv. {pokemon.level}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <SectionDivider className="my-5">Skills</SectionDivider>
          <div className="divide-y divide-game-border overflow-hidden rounded-lg border border-game-border bg-game-surface">
            {skills.map((skill) => {
              const skillData =
                trainer.skills?.[
                  skill.id as keyof NonNullable<PublicTrainerSummary['skills']>
                ]
              const level = skillData?.level || 1
              const exp = skillData?.exp || 0
              const current = getTotalExpForLevel(level)
              const next = getTotalExpForLevel(level + 1)
              const progress =
                next > current
                  ? Math.max(
                      0,
                      Math.min(100, ((exp - current) / (next - current)) * 100),
                    )
                  : 100
              return (
                <div
                  key={skill.id}
                  className="grid min-h-14 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 py-2"
                >
                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="truncate font-semibold text-game-ink">
                        {skill.name}
                      </span>
                      <span className="shrink-0 font-mono text-game-moss-strong">
                        Rank {level}
                      </span>
                    </div>
                    <div
                      className="mt-2 h-1.5 overflow-hidden rounded-full border border-game-border bg-game-canvas"
                      role="progressbar"
                      aria-label={`${skill.name} rank progress`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={Math.round(progress)}
                    >
                      <div
                        className="h-full bg-game-ochre motion-reduce:transition-none"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-game-muted">
                    {exp.toLocaleString()} XP
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {!isSelf && (
          <div className="shrink-0 border-t border-game-border bg-game-surface px-4 py-3 sm:px-5">
            <Button
              type="button"
              onClick={handleFriendAction}
              disabled={isLoading || friendStatus === 'pending'}
              aria-busy={isLoading}
              className={cn(
                'min-h-11 w-full',
                friendStatus === 'friend' &&
                  'border border-game-border bg-game-surface-raised text-game-muted hover:border-game-danger/40 hover:bg-game-danger/10 hover:text-game-danger',
              )}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" />
              ) : friendStatus === 'friend' ? (
                <UserMinus className="h-4 w-4" />
              ) : friendStatus === 'pending' ? (
                <Clock className="h-4 w-4" />
              ) : (
                <UserPlus className="h-4 w-4" />
              )}
              {friendStatus === 'friend'
                ? 'Remove friend'
                : friendStatus === 'pending'
                  ? 'Friend request pending'
                  : 'Add friend'}
            </Button>
          </div>
        )}
      </ResponsivePanel>

      <AlertDialog
        open={showRemoveConfirmation}
        onOpenChange={setShowRemoveConfirmation}
      >
        <AlertDialogContent className="border-game-border bg-game-surface">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-xl text-game-ink">
              Remove friend?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-game-muted">
              Remove {trainer.trainerName} from your friends list?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>
              Keep friend
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault()
                void handleRemoveFriend()
              }}
              disabled={isLoading}
              className="bg-game-clay text-game-cream"
            >
              Remove friend
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

function ProfileMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-0 px-2 py-3 text-center">
      <p className="font-mono text-lg font-bold text-game-ink">
        {value.toLocaleString()}
      </p>
      <p className="truncate text-[11px] font-semibold uppercase tracking-[0.08em] text-game-muted">
        {label}
      </p>
    </div>
  )
}
