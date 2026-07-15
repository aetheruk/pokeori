'use client'

import {
  CheckCircle2,
  CircleDot,
  Clock3,
  DoorOpen,
  Flag,
  GitBranch,
  Heart,
  HelpCircle,
  MapIcon,
  Swords,
  ThumbsDown,
  ThumbsUp,
  X,
} from 'lucide-react'
import Image from 'next/image'
import { type ReactNode, useState } from 'react'
import {
  RewardCarousel,
  type RewardItem,
} from '@/components/game/reward-carousel'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { Button } from '@/components/ui/button'
import { ItemSprite } from '@/components/ui/item-sprite'
import { ResponsivePanel } from '@/components/ui/responsive-panel'
import { SectionDivider } from '@/components/ui/section-divider'
import { battles } from '@/data/battles'
import { allGames } from '@/data/games'
import { items } from '@/data/items'
import { locations } from '@/data/locations'
import { type TaskIcon, tasks } from '@/data/tasks'
import { cn } from '@/lib/utils'
import {
  getPokemonForm,
  getPokemonImageUrl,
  getPokemonSpecies,
} from '@/utilities/pokemon/pokedex'
import { getExpeditionDisplayName, isChronicleExploreItem } from './utils'

interface ExpeditionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: any
  activeRun?: any
  expeditionResult?: { wins?: number; losses?: number } | null
  rewards?: RewardItem[]
  criteria?: RewardItem[]
  actionButton?: ReactNode
  loadingId?: string | null
  onChooseBranch?: (
    expeditionId: string,
    branchNodeStepId: string,
    branchId: string,
  ) => void
  onRequestAbandonExpedition?: () => void
}

type ExpeditionActivityDetail = {
  title: string
  entries: Array<{
    name: string
    extra?: string
    formId?: string
  }>
}

function getActivityMeta(
  activityType: string,
  activityId: string,
): { name?: string; description?: string; icon?: TaskIcon } {
  if (activityType === 'battle') {
    const entry = battles.find((battle) => battle.id === activityId)
    return {
      name: entry?.name,
      description: entry?.description,
      icon: entry?.icon,
    }
  }

  if (activityType === 'location') {
    const entry = locations.find((location) => location.id === activityId)
    return {
      name: entry?.name,
      description: entry?.description,
      icon: entry?.icon,
    }
  }

  if (activityType === 'research') {
    const entry = allGames.find((game) => game.id === activityId)
    return {
      name: entry?.name,
      description: entry?.description,
      icon: entry?.icon,
    }
  }

  if (activityType === 'task') {
    const entry = tasks.find((task) => task.id === activityId)
    return {
      name: entry?.name,
      description: entry?.description,
      icon: entry?.icon,
    }
  }

  return {}
}

function getFallbackTypeIcon(activityType?: string) {
  if (activityType === 'battle')
    return <Swords className="w-4 h-4 text-game-clay" />
  if (activityType === 'location')
    return <MapIcon className="w-4 h-4 text-game-moss" />
  if (activityType === 'research')
    return <HelpCircle className="w-4 h-4 text-game-ochre" />
  return <Flag className="w-4 h-4 text-game-ochre" />
}

function formatBranchLabel(branchId?: string): string | null {
  if (!branchId) return null
  return branchId.replace(/[-_]/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase())
}

function formatActivityLabel(activityType?: string): string {
  if (activityType === 'battle') return 'Battle'
  if (activityType === 'location') return 'Encounter'
  if (activityType === 'research') return 'Mini Game'
  if (activityType === 'task') return 'Task'
  return activityType || 'Activity'
}

function getPokemonDisplayName(
  formId?: string | number,
  speciesId?: string | number,
): string {
  if (formId !== undefined && formId !== null) {
    const form = getPokemonForm(formId)
    if (form?.name) return form.name
  }

  if (speciesId !== undefined && speciesId !== null) {
    const species = getPokemonSpecies(speciesId)
    if (species?.name) return species.name
    return `#${speciesId}`
  }

  return 'Unknown Pokemon'
}

function getPokemonFormId(
  formId?: string | number,
  speciesId?: string | number,
): string | undefined {
  if (formId !== undefined && formId !== null) {
    return formId.toString()
  }

  if (speciesId !== undefined && speciesId !== null) {
    return speciesId.toString()
  }

  return undefined
}

function formatLevelLabel(level: unknown): string | undefined {
  if (typeof level === 'number') {
    return `Lv ${level}`
  }

  if (level && typeof level === 'object') {
    const range = level as { min?: number; max?: number }
    const hasMin = typeof range.min === 'number'
    const hasMax = typeof range.max === 'number'

    if (hasMin && hasMax) {
      return range.min === range.max
        ? `Lv ${range.min}`
        : `Lv ${range.min}-${range.max}`
    }

    if (hasMin) return `Lv ${range.min}`
    if (hasMax) return `Lv ${range.max}`
  }

  return undefined
}

function getStepActivityDetails(
  activityType?: string,
  activityId?: string,
): ExpeditionActivityDetail | null {
  if (!activityType || !activityId) {
    return null
  }

  if (activityType === 'battle') {
    const entry = battles.find((battle) => battle.id === activityId)
    if (!entry?.enemyTeam?.length) {
      return null
    }

    return {
      title: 'Enemy Team',
      entries: entry.enemyTeam.map((member: any) => ({
        name: getPokemonDisplayName(member?.formId, member?.speciesId),
        extra: formatLevelLabel(member?.level),
        formId: getPokemonFormId(member?.formId, member?.speciesId),
      })),
    }
  }

  if (activityType === 'location') {
    const entry = locations.find((location) => location.id === activityId)
    if (!entry?.encounters?.length) {
      return null
    }

    return {
      title: 'Possible Encounters',
      entries: entry.encounters.map((encounter: any) => ({
        name: getPokemonDisplayName(encounter?.formId, encounter?.speciesId),
        extra:
          typeof encounter?.chance === 'number'
            ? `${encounter.chance}%`
            : undefined,
        formId: getPokemonFormId(encounter?.formId, encounter?.speciesId),
      })),
    }
  }

  return null
}

export function ExpeditionModal({
  open,
  onOpenChange,
  item,
  activeRun,
  expeditionResult,
  rewards,
  criteria,
  actionButton,
  loadingId,
  onChooseBranch,
  onRequestAbandonExpedition,
}: ExpeditionModalProps) {
  if (!item) return null

  const [expandedStepId, setExpandedStepId] = useState<string | null>(null)

  const expedition = item.originalData
  const expeditionLabel = getExpeditionDisplayName(item)
  const expeditionLabelLower = expeditionLabel.toLowerCase()
  const pathLabel = isChronicleExploreItem(item) ? 'Chronicle' : 'Route'
  const steps = activeRun?.steps || []
  const progressCurrent = activeRun
    ? Math.min(
        (activeRun?.currentStepIndex || 0) + 1,
        activeRun?.totalSteps || 1,
      )
    : 0
  const progressTotal = activeRun?.totalSteps || 0
  const losses = activeRun?.losses || 0
  const maxLosses = activeRun?.maxLosses ?? expedition?.maxLosses ?? 0
  const livesLeft = Math.max(0, maxLosses - losses)
  const canFail = expedition?.canFail !== false
  const mapItem = items.find((entry) => entry.id === expedition?.mapItemId)
  const hasExpeditionStats = !!expeditionResult
  const canAbandonExpedition =
    !!activeRun &&
    activeRun.status === 'active' &&
    expedition?.canAbandon !== false

  return (
    <ResponsivePanel
      open={open}
      onOpenChange={onOpenChange}
      title={item.name}
      description={item.description}
      showHeader={false}
      showHandle={false}
      showCloseButton={false}
      desktopWidth="min(44vw, 680px)"
      mobileMaxHeight="calc(100dvh - 6rem)"
      className="flex h-[calc(100dvh-6rem)] w-screen max-w-none flex-col gap-0 overflow-hidden rounded-t-[2rem] border-x-0 border-b-0 border-t border-game-border bg-game-surface p-0 text-game-ink md:max-w-none lg:h-dvh lg:rounded-l-xl lg:rounded-t-none lg:border-y-0 lg:border-r-0"
    >
      <div className="shrink-0 p-0">
        <div className="relative h-44 w-full overflow-hidden border-b border-game-border bg-game-night-surface md:h-52">
          <div className="absolute inset-0 z-0">
            <Image
              src={expedition?.background || '/backgrounds/forest.avif'}
              alt={`${expeditionLabel} background`}
              fill
              sizes="100vw"
              className="object-cover opacity-40 brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-game-night-surface/10 via-game-night-surface/58 to-game-surface" />
          </div>

          <div className="absolute left-6 top-6 z-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-game-ochre/45 bg-game-night-surface/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-game-ochre backdrop-blur-md">
              <MapIcon className="w-3.5 h-3.5" />
              {expeditionLabel.toUpperCase()}
            </span>
          </div>

          <div className="absolute left-1/2 top-3 z-20 h-1.5 w-20 -translate-x-1/2 rounded-full bg-game-cream/30" />

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="game-focus-ring absolute right-4 top-4 z-20 rounded-md border border-game-night-border/60 bg-game-night-surface/85 p-2 text-game-cream backdrop-blur-md transition-colors hover:bg-game-night-surface hover:text-game-night-ink"
            aria-label="Close expedition details"
          >
            <X className="w-6 h-6" />
          </button>

          {canAbandonExpedition && onRequestAbandonExpedition && (
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={onRequestAbandonExpedition}
              disabled={loadingId === item.id}
              className="absolute bottom-5 left-6 z-20 h-11 w-11 rounded-full border-game-night-border/60 bg-game-night-surface/72 text-game-cream hover:border-game-clay hover:bg-game-clay"
              aria-label={`Abandon ${expeditionLabel}`}
              title={`Abandon ${expeditionLabel}`}
            >
              <DoorOpen className="w-5 h-5" />
            </Button>
          )}

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6">
            <div className="relative">
              <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg border border-game-night-border/60 bg-game-night-surface/80 backdrop-blur-sm">
                <TaskIconDisplay icon={item.icon} className="w-10 h-10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="custom-scrollbar flex-1 overflow-y-auto bg-game-canvas p-5 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8 pb-8">
          <div className="space-y-4">
            <div>
              <p className="game-field-label">{expeditionLabel}</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-game-ink">
                {item.name}
              </h2>
            </div>
            <SectionDivider>Overview</SectionDivider>
            <div className="game-panel p-4 md:p-5">
              <p className="text-center text-sm font-medium italic leading-relaxed text-game-muted md:text-base">
                {item.description}
              </p>
            </div>
          </div>

          {(activeRun || hasExpeditionStats) && (
            <div className="space-y-4">
              <SectionDivider>Rules &amp; Stats</SectionDivider>
              <div
                className={cn(
                  'grid gap-3',
                  activeRun && hasExpeditionStats
                    ? 'grid-cols-2 md:grid-cols-4'
                    : 'grid-cols-2',
                )}
              >
                {activeRun && (
                  <>
                    <div className="group flex items-center gap-3 rounded-lg border border-game-border bg-game-surface p-3 transition-colors hover:border-game-moss/35">
                      <div className="text-game-moss-strong">
                        <Flag className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-game-muted">
                          Progress
                        </span>
                        <span className="font-mono text-sm font-bold text-game-ink">
                          {progressCurrent}/{progressTotal}
                        </span>
                      </div>
                    </div>

                    {canFail ? (
                      <div className="group flex items-center gap-3 rounded-lg border border-game-border bg-game-surface p-3 transition-colors hover:border-game-clay/35">
                        <div className="text-game-clay">
                          <Heart className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-game-muted">
                            Lives
                          </span>
                          <span className="font-mono text-sm font-bold text-game-ink">
                            {livesLeft}/{maxLosses}
                          </span>
                        </div>
                      </div>
                    ) : null}
                  </>
                )}

                {hasExpeditionStats && (
                  <>
                    <div className="group flex items-center gap-3 rounded-lg border border-game-border bg-game-surface p-3 transition-colors hover:border-game-moss/35">
                      <div className="text-game-moss-strong">
                        <ThumbsUp className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-game-muted">
                          Success
                        </span>
                        <span className="font-mono text-sm font-bold text-game-ink">
                          {expeditionResult?.wins || 0}
                        </span>
                      </div>
                    </div>

                    <div className="group flex items-center gap-3 rounded-lg border border-game-border bg-game-surface p-3 transition-colors hover:border-game-clay/35">
                      <div className="text-game-danger">
                        <ThumbsDown className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-game-muted">
                          Fail
                        </span>
                        <span className="font-mono text-sm font-bold text-game-ink">
                          {expeditionResult?.losses || 0}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {expedition?.mapItemId && (
            <div>
              <SectionDivider>Map Required</SectionDivider>
              <div className="group mt-4 flex items-center gap-3 rounded-lg border border-game-border bg-game-surface p-3 transition-colors hover:border-game-moss/35">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised">
                    <ItemSprite
                      itemId={expedition.mapItemId}
                      alt="Map"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-game-muted">
                      Required Item
                    </div>
                    <div className="truncate font-mono text-sm font-bold text-game-ink">
                      {mapItem?.name || expedition.mapItemId}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeRun && (
            <div>
              <SectionDivider>{pathLabel} Path</SectionDivider>
              {steps.length === 0 ? (
                <div className="mt-4 flex items-center gap-2 rounded-lg border border-game-border bg-game-surface p-4 text-sm text-game-muted">
                  <Clock3 className="h-4 w-4 text-game-moss-strong" />
                  {pathLabel} path will generate when you begin this{' '}
                  {expeditionLabelLower}.
                </div>
              ) : (
                <div className="mt-4 space-y-2">
                  {steps.map((step: any, index: number) => {
                    const stepType = step.type || 'activity'
                    const isDone = step.status === 'completed'
                    const isSecret = !!step.secret
                    const isCurrent =
                      activeRun?.status === 'active' &&
                      index === (activeRun?.currentStepIndex || 0)
                    const shouldHideSecret = isSecret && !isDone && !isCurrent
                    const isLast = index === steps.length - 1
                    const meta =
                      !shouldHideSecret &&
                      stepType === 'activity' &&
                      step.activityType &&
                      step.activityId
                        ? getActivityMeta(step.activityType, step.activityId)
                        : {}
                    const branchLabel =
                      stepType === 'activity'
                        ? formatBranchLabel(step.branchId)
                        : null
                    const stepKey = `${step.stepId}-${index}`
                    const activityDetails =
                      !shouldHideSecret && stepType === 'activity'
                        ? getStepActivityDetails(
                            step.activityType,
                            step.activityId,
                          )
                        : null
                    const canToggleDetails =
                      !!activityDetails && activityDetails.entries.length > 0
                    const isExpanded = expandedStepId === stepKey

                    return (
                      <div key={stepKey} className="relative pl-14">
                        {!isLast && (
                          <div
                            className={cn(
                              'absolute left-[21px] top-10 w-[2px] h-[calc(100%-8px)]',
                              isDone
                                ? 'bg-game-moss/60'
                                : 'bg-game-border-strong',
                            )}
                          />
                        )}

                        <div
                          className={cn(
                            'absolute left-0 top-2 flex h-11 w-11 items-center justify-center rounded-lg border bg-game-surface',
                            isDone
                              ? 'border-game-moss/70 bg-game-moss/10'
                              : isCurrent
                                ? 'border-game-ochre/70 bg-game-ochre/10'
                                : 'border-game-border bg-game-surface-raised',
                          )}
                        >
                          {shouldHideSecret ? (
                            <span className="text-base font-bold leading-none text-game-ink">
                              ?
                            </span>
                          ) : stepType === 'branch_choice' ? (
                            <GitBranch className="h-4 w-4 text-game-moss-strong" />
                          ) : stepType === 'result_branch' ? (
                            <GitBranch className="h-4 w-4 text-game-ochre" />
                          ) : meta.icon ? (
                            <TaskIconDisplay
                              icon={meta.icon}
                              className="w-6 h-6"
                            />
                          ) : (
                            getFallbackTypeIcon(step.activityType)
                          )}
                        </div>

                        <div
                          className={cn(
                            'rounded-lg border px-4 py-3 transition-colors',
                            isDone
                              ? 'border-game-moss/40 bg-game-moss/10'
                              : isCurrent
                                ? 'border-game-ochre/40 bg-game-ochre/10'
                                : 'border-game-border bg-game-surface',
                            canToggleDetails && 'hover:border-game-moss/40',
                          )}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[10px] uppercase tracking-wide text-game-muted">
                                  {stepType === 'branch_choice'
                                    ? 'Branch Choice'
                                    : stepType === 'result_branch'
                                      ? 'Result Branch'
                                      : formatActivityLabel(step.activityType)}
                                </span>
                                {branchLabel && (
                                  <span className="inline-flex items-center gap-1 rounded-full border border-game-moss/30 bg-game-moss/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-game-moss-strong">
                                    <GitBranch className="w-3 h-3" />
                                    {branchLabel}
                                  </span>
                                )}
                              </div>
                              <div className="mt-1 truncate font-bold text-game-ink">
                                {shouldHideSecret
                                  ? '???'
                                  : stepType === 'branch_choice'
                                    ? 'Choose which route to take'
                                    : stepType === 'result_branch'
                                      ? 'Route changes by result'
                                      : meta.name || step.activityName}
                              </div>

                              {!shouldHideSecret &&
                                stepType === 'activity' &&
                                meta.description && (
                                  <p className="mt-1 text-xs leading-snug text-game-muted">
                                    {meta.description}
                                  </p>
                                )}

                              {canToggleDetails && (
                                <button
                                  type="button"
                                  className="mt-1 text-[10px] font-bold uppercase tracking-wide text-game-moss-strong hover:text-game-moss"
                                  onClick={() =>
                                    setExpandedStepId((prev) =>
                                      prev === stepKey ? null : stepKey,
                                    )
                                  }
                                >
                                  {isExpanded
                                    ? 'Tap to hide details'
                                    : 'Tap to view details'}
                                </button>
                              )}

                              {stepType === 'branch_choice' &&
                                isCurrent &&
                                step.branchOptions &&
                                step.branchOptions.length > 0 && (
                                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {step.branchOptions.map((option: any) => (
                                      <Button
                                        key={option.branchId}
                                        onClick={() =>
                                          onChooseBranch?.(
                                            item.id,
                                            step.stepId,
                                            option.branchId,
                                          )
                                        }
                                        disabled={loadingId === item.id}
                                        className="h-auto justify-start border border-game-moss/30 bg-game-surface-raised px-3 py-2 text-game-ink hover:bg-game-moss/10"
                                      >
                                        <div className="text-left min-w-0">
                                          <div className="truncate text-[11px] font-bold uppercase tracking-wide text-game-moss-strong">
                                            {option.label ||
                                              formatBranchLabel(
                                                option.branchId,
                                              )}
                                          </div>
                                          <div className="truncate text-[10px] text-game-muted">
                                            {(option.previewActivities || [])
                                              .length > 0
                                              ? option.previewActivities
                                                  .map(
                                                    (preview: any) =>
                                                      preview.activityName,
                                                  )
                                                  .join(' + ')
                                              : 'Route option'}
                                          </div>
                                        </div>
                                      </Button>
                                    ))}
                                  </div>
                                )}

                              {canToggleDetails &&
                                isExpanded &&
                                activityDetails && (
                                  <div className="mt-3 rounded-lg border border-game-border bg-game-surface-raised p-3">
                                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-game-muted">
                                      {activityDetails.title}
                                    </div>
                                    <div
                                      className="mt-2 flex gap-2 overflow-x-auto pb-1 pt-1 custom-scrollbar [touch-action:pan-x]"
                                      onClick={(event) =>
                                        event.stopPropagation()
                                      }
                                    >
                                      {activityDetails.entries.map(
                                        (entry, detailIndex) => (
                                          <div
                                            key={`${entry.name}-${detailIndex}`}
                                            className="group relative flex min-w-[98px] shrink-0 flex-col items-center rounded-lg border border-game-border bg-game-surface p-2 transition-colors hover:border-game-moss/40"
                                          >
                                            <div className="relative w-14 h-14 flex items-center justify-center mb-1">
                                              {entry.formId ? (
                                                <Image
                                                  src={getPokemonImageUrl(
                                                    entry.formId,
                                                    'sprite',
                                                  )}
                                                  alt={entry.name}
                                                  fill
                                                  sizes="56px"
                                                  className="object-contain pixelated drop-shadow-lg"
                                                />
                                              ) : (
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-game-border bg-game-canvas text-sm font-bold text-game-muted">
                                                  ?
                                                </div>
                                              )}
                                            </div>

                                            <span className="line-clamp-2 min-h-[1.8rem] text-center text-[10px] font-bold uppercase leading-tight tracking-wide text-game-ink">
                                              {entry.name}
                                            </span>

                                            {entry.extra && (
                                              <span className="mt-1 shrink-0 rounded-full border border-game-moss/20 bg-game-moss/10 px-1.5 py-0.5 font-mono text-[10px] text-game-moss-strong">
                                                {entry.extra}
                                              </span>
                                            )}
                                          </div>
                                        ),
                                      )}
                                    </div>
                                  </div>
                                )}
                            </div>

                            <div className="shrink-0">
                              {isDone ? (
                                <CheckCircle2 className="h-5 w-5 text-game-moss-strong" />
                              ) : isCurrent && stepType === 'branch_choice' ? (
                                <GitBranch className="h-5 w-5 text-game-moss-strong" />
                              ) : isCurrent && stepType === 'result_branch' ? (
                                <GitBranch className="h-5 w-5 text-game-ochre" />
                              ) : isCurrent ? (
                                <CircleDot className="h-5 w-5 text-game-ochre" />
                              ) : (
                                <Clock3 className="h-5 w-5 text-game-muted" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {criteria && criteria.length > 0 && (
            <div>
              <SectionDivider>Requirements</SectionDivider>
              <div className="mt-4 rounded-lg border border-game-border bg-game-surface p-2">
                <RewardCarousel rewards={criteria} />
              </div>
            </div>
          )}

          {rewards && rewards.length > 0 && (
            <div>
              <SectionDivider>Potential Rewards</SectionDivider>
              <div className="mt-4 rounded-lg border border-game-border bg-game-surface p-2">
                <RewardCarousel rewards={rewards} />
              </div>
            </div>
          )}
        </div>
      </div>

      {actionButton && (
        <div className="shrink-0 border-t border-game-border bg-game-surface p-5 md:p-6">
          <div className="max-w-3xl mx-auto">
            <div className="max-w-md mx-auto">{actionButton}</div>
          </div>
        </div>
      )}
    </ResponsivePanel>
  )
}
