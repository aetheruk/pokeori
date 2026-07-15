'use client'

import {
  AlertCircle,
  Check,
  CheckCircle,
  Footprints,
  Heart,
  Loader2,
  Shield,
  Sword,
  Timer,
  Users,
  Zap,
} from 'lucide-react'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import {
  getFormattedProperties,
  getFormattedRewards,
} from '@/components/game/features/explore/ExploreModalHelpers'
import { GameInfoModal } from '@/components/game/shared/GameInfoModal'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { Button } from '@/components/ui/button'
import { SectionDivider } from '@/components/ui/section-divider'
import { VoyageConfig } from '@/data/voyages/types'
import { useCountdown } from '@/hooks/useCountdown'
import { cn } from '@/lib/utils'
import type { Pokemon } from '@/payload-types'
import { getOwnedPokemonGender } from '@/utilities/pokemon/gender'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import { completeVoyage, startVoyage } from '@/utilities/voyages/actions'

interface VoyageSelectionModalProps {
  voyage: VoyageConfig | null
  activeVoyageData?: {
    voyageId: string
    endTime: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
  userPokemon: Pokemon[]
  onSuccess: (result?: any) => void
}

export function VoyageSelectionModal({
  voyage,
  activeVoyageData,
  open,
  onOpenChange,
  userPokemon,
  onSuccess,
}: VoyageSelectionModalProps) {
  const [selectedPokemonIds, setSelectedPokemonIds] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { formatted: timeLeft, isFinished } = useCountdown(
    activeVoyageData?.endTime || null,
  )

  // Filter eligible pokemon based on INDIVIDUAL criteria
  const eligiblePokemon = useMemo(() => {
    if (!voyage || activeVoyageData) return []
    return userPokemon.filter((p) => {
      if (p.locked) return false
      const criteria = voyage.pokemonCriteria
      if (!criteria) return true
      if (
        criteria.allowedSpeciesIds &&
        !criteria.allowedSpeciesIds.includes(p.speciesId)
      )
        return false
      if (criteria.minLevel && (p.level || 1) < criteria.minLevel) return false
      return true
    })
  }, [userPokemon, voyage, activeVoyageData])

  // Calculate current stats of selected team
  const teamStats = useMemo(() => {
    const selected = eligiblePokemon.filter((p) =>
      selectedPokemonIds.includes(p.id),
    )
    const sums: any = {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
      level: 0,
    }

    selected.forEach((p) => {
      const s = (p.stats || {}) as any
      sums.hp += s.hp || 0
      sums.attack += s.attack || 0
      sums.defense += s.defense || 0
      sums.specialAttack += s.specialAttack || 0
      sums.specialDefense += s.specialDefense || 0
      sums.speed += s.speed || 0
      sums.level += p.level || 0
    })

    return sums
  }, [eligiblePokemon, selectedPokemonIds])

  // Check if team requirements are met
  const requirementsMet = useMemo(() => {
    if (!voyage?.teamRequirements) return true
    return voyage.teamRequirements.every((req) => {
      const val = teamStats[req.stat] || 0
      if (req.comparison === 'lte') return val <= req.value
      return val >= req.value
    })
  }, [voyage, teamStats])

  const handleToggle = (id: string) => {
    setSelectedPokemonIds((prev) => {
      if (prev.includes(id)) return prev.filter((pid) => pid !== id)
      if (voyage && prev.length >= voyage.maxPokemon) return prev
      return [...prev, id]
    })
  }

  const handleAction = async () => {
    if (!voyage) return
    setIsSubmitting(true)

    try {
      if (activeVoyageData) {
        if (!isFinished) return
        const result = await completeVoyage(voyage.id)
        if (result.success) {
          toast.success('Voyage Completed!')
          onSuccess(result)
          onOpenChange(false)
        } else {
          toast.error(result.message || 'Failed to complete voyage')
        }
      } else {
        const result = await startVoyage(voyage.id, selectedPokemonIds)
        if (result.success) {
          toast.success('Voyage started!')
          onSuccess()
          onOpenChange(false)
        } else {
          toast.error(result.message || 'Failed to start voyage')
        }
      }
    } catch (e) {
      toast.error('An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!voyage) return null

  const getStatIcon = (stat: string) => {
    switch (stat) {
      case 'hp':
        return <Heart className="w-4 h-4" />
      case 'attack':
        return <Sword className="w-4 h-4" />
      case 'defense':
        return <Shield className="w-4 h-4" />
      case 'speed':
        return <Footprints className="w-4 h-4" />
      default:
        return <Zap className="w-4 h-4" />
    }
  }

  // Wrap voyage in mock item for helpers
  const mockItem = {
    id: voyage.id,
    type: 'voyage',
    originalData: voyage,
  }

  return (
    <GameInfoModal
      open={open}
      onOpenChange={onOpenChange}
      title={voyage.name}
      category={voyage.subCategory || 'VOYAGE'}
      description={voyage.description}
      icon={<TaskIconDisplay icon={voyage.icon} className="w-10 h-10" />}
      background={voyage.background}
      properties={getFormattedProperties(mockItem)}
      rewards={getFormattedRewards(mockItem, { user: {} } as any, [])}
      actionButton={
        <Button
          onClick={handleAction}
          disabled={
            (!activeVoyageData &&
              (!requirementsMet ||
                selectedPokemonIds.length < (voyage.minPokemon || 1) ||
                isSubmitting)) ||
            (!!activeVoyageData && !isFinished)
          }
          className={cn(
            'h-12 w-full border border-game-clay bg-game-clay text-sm font-black uppercase tracking-widest text-game-cream hover:bg-game-clay/90',
            activeVoyageData &&
              isFinished &&
              'border-game-moss bg-game-moss text-game-cream hover:bg-game-moss-strong',
          )}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : activeVoyageData && isFinished ? (
            <CheckCircle className="w-4 h-4 mr-2" />
          ) : activeVoyageData ? (
            <Timer className="w-4 h-4 mr-2" />
          ) : (
            <CheckCircle className="w-4 h-4 mr-2" />
          )}
          {isSubmitting
            ? activeVoyageData
              ? 'Completing...'
              : 'Starting...'
            : activeVoyageData
              ? isFinished
                ? 'Check Results'
                : timeLeft
              : 'Start Voyage'}
        </Button>
      }
    >
      <div className="space-y-8">
        {activeVoyageData ? (
          <div className="flex flex-col items-center justify-center py-10 gap-6 animate-in fade-in zoom-in duration-500">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-game-moss/10 transition-opacity duration-1000" />
              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised">
                {isFinished ? (
                  <CheckCircle className="h-12 w-12 text-game-moss" />
                ) : (
                  <Timer className="h-12 w-12 animate-spin text-game-ochre" />
                )}
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-game-muted">
                {isFinished ? 'VOYAGE COMPLETE' : 'TIME REMAINING'}
              </span>
              <div className="font-mono text-5xl font-black tracking-tighter text-game-ink">
                {isFinished ? 'READY' : timeLeft}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Team Requirements */}
            <div className="space-y-4">
              <SectionDivider>TEAM REQUIREMENTS</SectionDivider>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {voyage.teamRequirements?.map((req, i) => {
                  const current = teamStats[req.stat]
                  const met =
                    req.comparison === 'lte'
                      ? current <= req.value
                      : current >= req.value
                  return (
                    <div
                      key={i}
                      className={cn(
                        'flex items-center gap-4 rounded-lg border p-4 transition-colors',
                        met
                          ? 'border-game-moss/30 bg-game-moss/5'
                          : 'border-game-border bg-game-surface',
                      )}
                    >
                      <div
                        className={cn(
                          'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors',
                          met
                            ? 'border-game-moss/40 bg-game-moss/10 text-game-moss-strong'
                            : 'border-game-border bg-game-surface-raised text-game-muted',
                        )}
                      >
                        {getStatIcon(req.stat)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-game-muted">
                            {req.stat}
                          </span>
                          {met ? (
                            <CheckCircle className="h-3 w-3 text-game-moss" />
                          ) : (
                            <div className="h-1.5 w-1.5 rounded-full bg-game-border-strong" />
                          )}
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span
                            className={cn(
                              'text-lg font-mono font-black',
                              met ? 'text-game-ink' : 'text-game-muted',
                            )}
                          >
                            {current}
                          </span>
                          <span className="text-[10px] font-bold text-game-muted">
                            / {req.comparison === 'lte' ? '≤' : '≥'} {req.value}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div
                  className={cn(
                    'flex items-center gap-4 rounded-lg border p-4 transition-colors',
                    selectedPokemonIds.length >= (voyage.minPokemon || 1) &&
                      selectedPokemonIds.length <= voyage.maxPokemon
                      ? 'border-game-moss/30 bg-game-moss/5'
                      : 'border-game-border bg-game-surface',
                  )}
                >
                  <div
                    className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors',
                      selectedPokemonIds.length >= (voyage.minPokemon || 1) &&
                        selectedPokemonIds.length <= voyage.maxPokemon
                        ? 'border-game-moss/40 bg-game-moss/10 text-game-moss-strong'
                        : 'border-game-border bg-game-surface-raised text-game-muted',
                    )}
                  >
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-game-muted">
                        TEAM SIZE
                      </span>
                      {selectedPokemonIds.length >= (voyage.minPokemon || 1) &&
                      selectedPokemonIds.length <= voyage.maxPokemon ? (
                        <CheckCircle className="h-3 w-3 text-game-moss" />
                      ) : (
                        <div className="h-1.5 w-1.5 rounded-full bg-game-border-strong" />
                      )}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span
                        className={cn(
                          'text-lg font-mono font-black',
                          selectedPokemonIds.length >=
                            (voyage.minPokemon || 1) &&
                            selectedPokemonIds.length <= voyage.maxPokemon
                            ? 'text-game-ink'
                            : 'text-game-muted',
                        )}
                      >
                        {selectedPokemonIds.length}
                      </span>
                      <span className="text-[10px] font-bold text-game-muted">
                        / {voyage.minPokemon || 1}-{voyage.maxPokemon}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Selection */}
            <div className="space-y-4">
              <SectionDivider>ASSEMBLE TEAM</SectionDivider>
              <div className="flex items-start gap-3 rounded-lg border border-game-clay/35 bg-game-clay/10 p-4">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-game-clay-strong" />
                <p className="text-[11px] font-medium leading-relaxed text-game-clay-strong">
                  Caution: Pokemon sent on this voyage are permanently consumed
                  upon completion. Ensure you want to part with them.
                </p>
              </div>

              {eligiblePokemon.length === 0 ? (
                <div className="rounded-lg border border-dashed border-game-border bg-game-surface px-6 py-12 text-center">
                  <span className="font-medium italic text-game-muted">
                    No eligible Pokemon in your collection.
                  </span>
                </div>
              ) : (
                <div className="flex gap-4 overflow-x-auto pb-4 pt-2 custom-scrollbar px-1 min-h-[140px]">
                  {eligiblePokemon.map((p) => {
                    const isSelected = selectedPokemonIds.includes(p.id)
                    const imageUrl = getPokemonImageUrl(
                      p.formId,
                      'sprite',
                      !!p.shiny,
                      getOwnedPokemonGender(p),
                    )

                    return (
                      <button
                        type="button"
                        key={p.id}
                        aria-pressed={isSelected}
                        aria-label={`${isSelected ? 'Remove' : 'Select'} ${p.name || 'Pokémon'}, level ${p.level}`}
                        className={cn(
                          'game-focus-ring group relative flex h-32 w-28 flex-shrink-0 cursor-pointer flex-col items-center justify-center gap-1 overflow-hidden rounded-lg border transition-colors',
                          isSelected
                            ? 'border-game-moss bg-game-moss'
                            : 'border-game-border bg-game-surface hover:border-game-moss/40',
                        )}
                        onClick={() => handleToggle(p.id)}
                      >
                        <div className="relative w-16 h-16 flex items-center justify-center z-10">
                          <Image
                            src={imageUrl}
                            alt={p.name || ''}
                            width={64}
                            height={64}
                            className={cn(
                              'object-contain pixelated transition-opacity',
                              isSelected
                                ? 'opacity-100'
                                : 'opacity-70 group-hover:opacity-100',
                            )}
                          />
                        </div>
                        <div
                          className={cn(
                            'w-full px-2 text-[10px] font-black uppercase text-center truncate relative z-10',
                            isSelected
                              ? 'text-game-cream'
                              : 'text-game-muted',
                          )}
                        >
                          {p.name}
                        </div>
                        <div
                          className={cn(
                            'text-[10px] font-mono font-bold relative z-10',
                            isSelected
                              ? 'text-game-cream'
                              : 'text-game-muted',
                          )}
                        >
                          LVL {p.level}
                        </div>

                        {isSelected && (
                          <div className="absolute right-2 top-2 rounded-full border border-game-surface bg-game-moss p-0.5">
                            <Check className="h-2 w-2 text-game-cream" />
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </GameInfoModal>
  )
}
