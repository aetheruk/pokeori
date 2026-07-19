'use client'

import { Loader2, UserCheck, Users, UserX } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  acceptFriendRequest,
  getFriendsList,
  getPendingRequests,
  rejectFriendRequest,
} from '@/app/(frontend)/game/trainer/friend-actions'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { Button } from '@/components/ui/button'
import { SectionDivider } from '@/components/ui/section-divider'
import { getIcon, getTitle } from '@/data/user'
import { TrainerModal } from './trainer-modal'

export function FriendsList() {
  const [friends, setFriends] = useState<any[]>([])
  const [pendingRequests, setPendingRequests] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [pendingActionId, setPendingActionId] = useState<string | null>(null)
  const [selectedTrainer, setSelectedTrainer] = useState<any | null>(null)
  const router = useRouter()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    setLoadError(null)
    try {
      const [friendsResult, requestsResult] = await Promise.all([
        getFriendsList(),
        getPendingRequests(),
      ])

      if (friendsResult.success) {
        setFriends(friendsResult.data || [])
      } else {
        setLoadError('Friends could not be loaded. Try again shortly.')
      }
      if (requestsResult.success) {
        setPendingRequests(requestsResult.data || [])
      } else {
        setLoadError('Friend requests could not be loaded. Try again shortly.')
      }
    } catch (error) {
      console.error(error)
      setLoadError('Friends could not be loaded. Check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAccept = async (requestId: string) => {
    setPendingActionId(requestId)
    try {
      const result = await acceptFriendRequest(requestId)
      if (result.success) {
        toast.success('Friend request accepted!')
        router.refresh()
        loadData()
      } else {
        toast.error(result.error || 'Failed to accept request')
      }
    } finally {
      setPendingActionId(null)
    }
  }

  const handleReject = async (requestId: string) => {
    setPendingActionId(requestId)
    try {
      const result = await rejectFriendRequest(requestId)
      if (result.success) {
        toast.success('Friend request rejected')
        router.refresh()
        loadData()
      } else {
        toast.error(result.error || 'Failed to reject request')
      }
    } finally {
      setPendingActionId(null)
    }
  }

  return (
    <div className="game-paper-first game-paper-background flex flex-col h-full overflow-hidden bg-game-canvas text-game-ink">
      <div className="relative z-10 mx-auto min-h-0 w-full max-w-3xl flex-1 space-y-6 overflow-y-auto px-4 py-5 md:px-6">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-game-moss/30 bg-game-surface-raised p-3">
            <p className="text-xs font-bold uppercase text-game-moss-strong">
              Friends
            </p>
            <p className="mt-1 text-2xl font-black text-game-ink">
              {friends.length}
            </p>
          </div>
          <div className="rounded-lg border border-game-ochre/30 bg-game-surface-raised p-3">
            <p className="text-xs font-bold uppercase text-game-ochre">
              Requests
            </p>
            <p className="mt-1 text-2xl font-black text-game-ink">
              {pendingRequests.length}
            </p>
          </div>
        </div>
        {isLoading ? (
          <div
            className="flex flex-col items-center justify-center gap-4 py-20"
            role="status"
            aria-live="polite"
          >
            <Loader2 className="h-7 w-7 animate-spin text-game-moss" />
            <p className="text-sm font-medium text-game-muted">
              Loading friends…
            </p>
          </div>
        ) : loadError ? (
          <div
            className="flex flex-col items-center gap-3 rounded-lg border border-game-danger/25 bg-game-danger/5 px-5 py-10 text-center text-sm font-medium text-game-danger"
            role="alert"
            aria-live="assertive"
          >
            <p>{loadError}</p>
            <Button
              type="button"
              variant="outline"
              className="min-h-11 border-game-border bg-game-surface-raised text-game-ink hover:border-game-moss/45 hover:bg-game-surface"
              onClick={loadData}
            >
              Try again
            </Button>
          </div>
        ) : (
          <>
            {/* Pending Requests */}
            {pendingRequests.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-game-moss-strong" />
                  <SectionDivider>Pending Requests</SectionDivider>
                </div>
                <div className="grid gap-3">
                  {pendingRequests.map((request) => {
                    const iconData = getIcon(request.senderIcon || 'ditto')

                    return (
                      <div
                        key={request.id}
                        className="flex items-center gap-3 rounded-lg border border-game-border bg-game-surface p-3 transition-colors hover:bg-game-surface-raised"
                      >
                        <div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised">
                            {iconData?.icon && (
                              <TaskIconDisplay
                                icon={iconData.icon}
                                className="w-9 h-9"
                              />
                            )}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="truncate text-base font-semibold text-game-ink">
                            {request.senderName}
                          </div>
                          <div className="mt-0.5 text-xs text-game-muted">
                            Wants to be your friend
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="icon"
                            onClick={() => handleAccept(request.id)}
                            aria-label={`Accept ${request.senderName}`}
                            disabled={pendingActionId !== null}
                            aria-busy={pendingActionId === request.id}
                          >
                            {pendingActionId === request.id ? (
                              <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                              <UserCheck className="w-5 h-5" />
                            )}
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleReject(request.id)}
                            className="hover:bg-game-danger/10 hover:text-game-danger"
                            aria-label={`Reject ${request.senderName}`}
                            disabled={pendingActionId !== null}
                            aria-busy={pendingActionId === request.id}
                          >
                            {pendingActionId === request.id ? (
                              <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                              <UserX className="w-5 h-5" />
                            )}
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Friends List */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-game-moss-strong" />
                <SectionDivider>All Friends</SectionDivider>
              </div>

              {friends.length === 0 ? (
                <div
                  className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-game-border bg-game-surface px-4 py-14 text-center font-medium text-game-muted"
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised">
                    <Users className="h-8 w-8 text-game-moss-strong" />
                  </div>
                  <p className="max-w-[200px]">
                    No friends yet. Open the Trainers section to search for
                    someone to add.
                  </p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {friends.map((friend) => {
                    const iconData = getIcon(friend.icon || 'ditto')
                    const titleData = getTitle(friend.title || 'new-beginnings')

                    return (
                      <button
                        type="button"
                        key={friend.id}
                        aria-haspopup="dialog"
                        onClick={() =>
                          setSelectedTrainer({
                            ...friend,
                            isFriend: true,
                            hasPendingRequest: false,
                            stats: {
                              uniqueCards: 0,
                              pokedexSeen: 0,
                              pokedexCaught: 0,
                            },
                            battleTeam: [],
                          })
                        }
                        className="game-focus-ring flex w-full cursor-pointer items-center gap-3 rounded-lg border border-game-border bg-game-surface p-3 text-left transition-colors hover:border-game-moss/40 hover:bg-game-surface-raised"
                      >
                        <div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised">
                            {iconData?.icon && (
                              <TaskIconDisplay
                                icon={iconData.icon}
                                className="w-9 h-9"
                              />
                            )}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="truncate text-base font-semibold text-game-ink">
                            {friend.trainerName}
                          </div>
                          <div className="mt-0.5 text-xs font-medium text-game-moss-strong">
                            {titleData?.name || 'Trainer'}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Trainer Modal */}
      <TrainerModal
        trainer={selectedTrainer}
        open={!!selectedTrainer}
        onOpenChange={(open) => !open && setSelectedTrainer(null)}
      />
    </div>
  )
}
