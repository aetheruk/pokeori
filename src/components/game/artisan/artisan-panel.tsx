'use client'

import {
  Gauge,
  Hammer,
  Info,
  Loader2,
  Lock,
  MousePointer2,
  RotateCw,
  Sparkles,
  Target,
  Timer,
  X,
} from 'lucide-react'
import {
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { toast } from 'sonner'
import type { RewardItem } from '@/components/game/reward-carousel'
import { mapCriteriaToDisplayItem } from '@/components/game/shared/criteria-mapping'
import { GameInfoModal } from '@/components/game/shared/GameInfoModal'
import { PremiumHeader } from '@/components/game/shared/PremiumHeader'
import { PremiumSelect } from '@/components/game/shared/PremiumSelect'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import {
  type DisplayableReward,
  mapRewardToDisplayItem,
} from '@/components/game/shared/reward-mapping'
import { SecondaryControlBar } from '@/components/game/shared/SecondaryControlBar'
import { AppButton, Button } from '@/components/ui/app-button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { ItemSprite } from '@/components/ui/item-sprite'
import { SectionDivider } from '@/components/ui/section-divider'
import { useUser } from '@/context/UserContext'
import {
  type ArtisanRecipe,
  type ArtisanRecipeCategory,
  artisanRecipes,
} from '@/data/artisan'
import { items } from '@/data/items'
import { calculateContentSkillXp, resolveSkillXpConfig } from '@/data/skills/xp'
import { cn } from '@/lib/utils'
import {
  beginArtisanCraft,
  completeArtisanCraft,
} from '@/utilities/artisan/actions'
import {
  getArtisanBalancePosition,
  getArtisanHoldBarWindow,
  getCraftBarPosition,
} from '@/utilities/artisan/craft-quality'
import {
  getArtisanCraftRequiredLevel,
  getPrimaryOutputRewardIndex,
  scaleArtisanCosts,
} from '@/utilities/artisan/rewards'
import type { ArtisanCraftSession } from '@/utilities/artisan/types'
import {
  checkRequirement,
  getRequirementProgress,
} from '@/utilities/requirements'
import { getSkillLevel } from '@/utilities/skills/unlocks'

const categoryLabels: Record<ArtisanRecipeCategory | 'all', string> = {
  all: 'All',
  materials: 'Materials',
  balls: 'Balls',
  lures: 'Lures',
  held: 'Held',
  items: 'Items',
  quests: 'Special',
}

type RecipeVariantGroup = {
  type: 'lureGroup' | 'heldGroup'
  id: string
  name: string
  description: string
  category: ArtisanRecipeCategory
  categoryLabel: string
  artisanLevel: number
  recipes: ArtisanRecipe[]
}

type RecipeIndexEntry =
  | { type: 'recipe'; recipe: ArtisanRecipe }
  | RecipeVariantGroup

function getItemName(itemId: string) {
  return items.find((item) => item.id === itemId)?.name || itemId
}

function getCurrencyName(currencyId: string) {
  if (currencyId === 'crystals') return 'Crystals'
  if (currencyId === 'pokedollars') return 'Pokédollars'
  return currencyId
}

function getCostOwned(
  cost: ArtisanRecipe['costs'][number],
  inventory: Record<string, number>,
  currency: Record<string, number>,
) {
  return cost.type === 'currency'
    ? currency[cost.id] || 0
    : inventory[cost.id] || 0
}

function getOutputItemId(recipe: ArtisanRecipe) {
  const reward = recipe.rewards.find((entry) => entry.type === 'item')
  return (
    recipe.iconItemId ||
    reward?.targetId?.toString() ||
    recipe.costs[0]?.id ||
    'poke-ball'
  )
}

function getRecipeRewardItems(recipe: ArtisanRecipe): RewardItem[] {
  const primaryOutputRewardIndex = getPrimaryOutputRewardIndex(recipe)
  return recipe.rewards
    .map((reward, index) =>
      mapRewardToDisplayItem({
        ...reward,
        quantity:
          index === primaryOutputRewardIndex
            ? { min: recipe.outputQuantity.min, max: recipe.outputQuantity.max }
            : reward.quantity,
      } as DisplayableReward),
    )
    .filter((reward): reward is RewardItem => reward !== null)
}

function getSkillXpReward(recipe: ArtisanRecipe): RewardItem | null {
  const xpConfig = resolveSkillXpConfig(
    'artisan',
    recipe.artisanLevel,
    recipe.skillXp,
  )
  return mapRewardToDisplayItem({
    type: 'xp',
    skill: xpConfig.skill,
    quantity: calculateContentSkillXp(xpConfig.skill, xpConfig.level),
    dropChance: 100,
  })
}

function formatOutputRange(recipe: ArtisanRecipe) {
  if (getPrimaryOutputRewardIndex(recipe) === null) return 'Rewards'
  return recipe.outputQuantity.min === recipe.outputQuantity.max
    ? `x${recipe.outputQuantity.min}`
    : `x${recipe.outputQuantity.min}-${recipe.outputQuantity.max}`
}

function hasPrimaryOutput(recipe: ArtisanRecipe) {
  return getPrimaryOutputRewardIndex(recipe) !== null
}

function getCraftTypeLabel(recipe: ArtisanRecipe) {
  if (recipe.craftType === 'crush') return 'Crush'
  if (recipe.craftType === 'balance') return 'Balance'
  if (recipe.craftType === 'mix') return 'Mix'
  if (recipe.craftType === 'scatter') return 'Scatter'
  return 'Precise'
}

function getLureGroupName(level: number) {
  if (level >= 70) return 'Master Lures'
  if (level >= 40) return 'Advanced Lures'
  return 'Base Lures'
}

function getLureGroupDescription(level: number) {
  if (level >= 70) return 'Choose a Master type lure variant to craft.'
  if (level >= 40) return 'Choose an Advanced type lure variant to craft.'
  return 'Choose a base type lure variant to craft.'
}

function createLureGroups(recipes: ArtisanRecipe[]): RecipeVariantGroup[] {
  const grouped = new Map<number, ArtisanRecipe[]>()

  for (const recipe of recipes) {
    if (recipe.category !== 'lures') continue
    const current = grouped.get(recipe.artisanLevel) || []
    current.push(recipe)
    grouped.set(recipe.artisanLevel, current)
  }

  return [...grouped.entries()]
    .sort(([a], [b]) => a - b)
    .map(([artisanLevel, groupRecipes]) => ({
      type: 'lureGroup' as const,
      id: `lure-group-${artisanLevel}`,
      name: getLureGroupName(artisanLevel),
      description: getLureGroupDescription(artisanLevel),
      category: 'lures',
      categoryLabel: 'Lures',
      artisanLevel,
      recipes: groupRecipes.sort(
        (a, b) => a.name.localeCompare(b.name) || a.id.localeCompare(b.id),
      ),
    }))
}

function createHeldTypeBoostGroup(
  recipes: ArtisanRecipe[],
): RecipeVariantGroup | null {
  const heldRecipes = recipes
    .filter((recipe) => recipe.category === 'held')
    .sort(
      (a, b) =>
        a.artisanLevel - b.artisanLevel ||
        a.name.localeCompare(b.name) ||
        a.id.localeCompare(b.id),
    )

  if (heldRecipes.length === 0) return null

  return {
    type: 'heldGroup',
    id: 'held-type-boost-group',
    name: 'Held Type Boost',
    description: 'Choose a type boost held item variant to craft.',
    category: 'held',
    categoryLabel: 'Held',
    artisanLevel: heldRecipes[0].artisanLevel,
    recipes: heldRecipes,
  }
}

function getCraftQualityGuide(recipe: ArtisanRecipe) {
  if (recipe.craftType === 'precise') return '2 hits Good · 3 hits Perfect'
  if (recipe.craftType === 'balance') return '2 green Good · 3 green Perfect'

  if (recipe.minimumQuality === 'perfect') {
    const costsOnBad = recipe.materialFailQualities
      ? recipe.materialFailQualities.includes('bad')
      : recipe.materialFail === true
    const costsOnGood = recipe.materialFailQualities
      ? recipe.materialFailQualities.includes('good')
      : recipe.materialFail === true
    const badLabel = costsOnBad ? 'Bad fails + costs' : 'Bad fails'
    return `${badLabel} · Good fails${costsOnGood ? ' + costs' : ''} · Perfect x${recipe.outputQuantity.max}`
  }

  const badLabel = recipe.fail
    ? recipe.materialFail
      ? 'Bad fails + costs'
      : 'Bad fails'
    : hasPrimaryOutput(recipe)
      ? `Bad x${recipe.outputQuantity.min}`
      : 'Bad'

  if (!hasPrimaryOutput(recipe)) return `${badLabel} · Good · Perfect`

  const goodQuantity = Math.max(
    recipe.outputQuantity.min,
    Math.round((recipe.outputQuantity.min + recipe.outputQuantity.max) / 2),
  )
  return `${badLabel} · Good x${goodQuantity} · Perfect x${recipe.outputQuantity.max}`
}

function CraftDialogShell({
  recipe,
  title,
  subtitle,
  status,
  onClose,
  completing,
  children,
}: {
  recipe: ArtisanRecipe
  title: string
  subtitle: string
  status: string
  onClose: () => void
  completing: boolean
  children: ReactNode
}) {
  return (
    <div className="game-paper-texture relative overflow-hidden rounded-xl border border-game-border bg-game-surface text-game-ink shadow-sm">
      <button
        type="button"
        onClick={onClose}
        className="game-focus-ring absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised text-game-muted transition-colors hover:border-game-clay/45 hover:text-game-ink sm:right-4 sm:top-4"
        disabled={completing}
        aria-label="Close craft check"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="relative p-5 sm:p-6">
        <div className="mb-5 flex items-center gap-3 pr-10 sm:gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-game-moss/40 bg-game-moss/10 sm:h-20 sm:w-20">
            <RecipeOutputIcon
              recipe={recipe}
              className="h-12 w-12 object-contain sm:h-14 sm:w-14"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-game-ochre">
              {title}
            </div>
            <h2 className="truncate font-display text-xl font-bold tracking-tight text-game-ink sm:text-2xl">
              {recipe.name}
            </h2>
            <p className="mt-1 text-xs font-bold text-game-muted">{subtitle}</p>
          </div>
        </div>

        <div className="mb-4 rounded-lg border border-game-border bg-game-surface-raised px-4 py-3">
          <div className="flex items-center justify-between gap-3 text-[10px] font-black uppercase tracking-widest">
            <span className="text-game-muted">Craft Check</span>
            <span className="text-game-ochre">{status}</span>
          </div>
          <p className="mt-1 truncate text-[10px] font-bold uppercase tracking-widest text-game-muted">
            {getCraftQualityGuide(recipe)}
          </p>
        </div>

        {children}
      </div>
    </div>
  )
}

function QualityBadge({ label }: { label: string }) {
  return (
    <span
      className={cn(
        'rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-widest',
        label === 'Perfect'
          ? 'border-game-moss/40 bg-game-moss/10 text-game-moss-strong'
          : label === 'Good'
            ? 'border-game-ochre/40 bg-game-ochre/10 text-game-ochre-strong'
            : 'border-game-border bg-game-canvas text-game-muted',
      )}
    >
      {label}
    </span>
  )
}

function getRecipeState(
  recipe: ArtisanRecipe,
  artisanLevel: number,
  inventory: Record<string, number>,
  currency: Record<string, number>,
  gameData: any,
  craftMultiplier = 1,
) {
  const requiredArtisanLevel = getArtisanCraftRequiredLevel(
    recipe,
    craftMultiplier,
  )
  const levelLocked = artisanLevel < requiredArtisanLevel
  const requirementsHidden =
    !!recipe.requirements?.length &&
    (!gameData ||
      recipe.requirements.some(
        (requirement) => !checkRequirement(gameData, requirement),
      ))
  const criteriaLocked =
    !!recipe.criteria?.length &&
    (!gameData ||
      recipe.criteria.some(
        (criterion) => !checkRequirement(gameData, criterion),
      ))
  const costs = scaleArtisanCosts(recipe.costs, craftMultiplier)
  const missingCosts = costs.filter(
    (cost) => getCostOwned(cost, inventory, currency) < cost.amount,
  )
  const locked = levelLocked || criteriaLocked
  const canCraft = !locked && missingCosts.length === 0
  const lockReason = levelLocked
    ? `Artisan Level ${requiredArtisanLevel} required`
    : criteriaLocked
      ? 'Craft criteria not met'
      : missingCosts.length > 0
        ? 'Missing materials'
        : 'Ready'

  return {
    levelLocked,
    requirementsHidden,
    criteriaLocked,
    missingCosts,
    locked,
    canCraft,
    lockReason,
  }
}

function RecipeOutputIcon({
  recipe,
  className,
}: {
  recipe: ArtisanRecipe
  className?: string
}) {
  const itemId = getOutputItemId(recipe)
  return (
    <ItemSprite
      itemId={itemId}
      alt={getItemName(itemId)}
      width={48}
      height={48}
      className={className}
    />
  )
}

function RecipeCostChip({
  cost,
  owned,
}: {
  cost: ArtisanRecipe['costs'][number]
  owned: number
}) {
  const hasEnough = owned >= cost.amount
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-widest',
        hasEnough
          ? 'border-game-border bg-game-surface-raised text-game-muted'
          : 'border-game-danger/30 bg-game-danger/10 text-game-danger',
      )}
    >
      {cost.type === 'currency' ? (
        <Sparkles className="h-4 w-4 text-game-ochre" />
      ) : (
        <ItemSprite
          itemId={cost.id}
          alt={getItemName(cost.id)}
          width={20}
          height={20}
          className="h-5 w-5 object-contain"
        />
      )}
      <span className={hasEnough ? 'text-game-ink' : 'text-game-danger'}>
        {owned}
      </span>
      <span className="text-game-muted">/</span>
      <span>{cost.amount}</span>
    </div>
  )
}

interface HoldReleaseDialogProps {
  recipe: ArtisanRecipe | null
  session: ArtisanCraftSession | null
  open: boolean
  completing: boolean
  onRelease: (heldDurationMs: number[]) => void
  onClose: () => void
}

function HoldReleaseDialog({
  recipe,
  session,
  open,
  completing,
  onRelease,
  onClose,
}: HoldReleaseDialogProps) {
  const [holding, setHolding] = useState(false)
  const [progress, setProgress] = useState(0)
  const [attempts, setAttempts] = useState<number[]>([])
  const holdStartedAtRef = useRef<number | null>(null)

  const release = useCallback(() => {
    if (!holding || completing) return
    const heldDurationMs = holdStartedAtRef.current
      ? Date.now() - holdStartedAtRef.current
      : 0
    const nextAttempts = [...attempts, heldDurationMs].slice(0, 3)
    setHolding(false)
    setAttempts(nextAttempts)
    holdStartedAtRef.current = null
    setProgress(0)
    if (nextAttempts.length >= 3) {
      onRelease(nextAttempts)
    }
  }, [attempts, completing, holding, onRelease])

  useEffect(() => {
    if (!open || !session) {
      setHolding(false)
      setProgress(0)
      setAttempts((current) => (current.length > 0 ? [] : current))
      holdStartedAtRef.current = null
      return
    }

    if (!holding) {
      setProgress(0)
      return
    }

    let frame = 0
    const tick = () => {
      const duration = session.endAt - session.startAt
      const holdStartedAt = holdStartedAtRef.current || Date.now()
      const current = getCraftBarPosition(
        (Date.now() - holdStartedAt) / duration,
      )
      setProgress(current)
      if (current >= 1) {
        release()
        return
      }
      frame = window.requestAnimationFrame(tick)
    }
    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [holding, open, release, session])

  useEffect(() => {
    if (!holding) return
    window.addEventListener('pointerup', release)
    window.addEventListener('blur', release)
    return () => {
      window.removeEventListener('pointerup', release)
      window.removeEventListener('blur', release)
    }
  }, [holding, release])

  const startHold = useCallback(() => {
    if (holding || completing || attempts.length >= 3) return
    holdStartedAtRef.current = Date.now()
    setProgress(0)
    setHolding(true)
  }, [attempts.length, completing, holding])

  if (!recipe || !session) return null

  const duration = session.endAt - session.startAt
  const fallbackTargetElapsed = session.targetAt - session.startAt
  const holdTargetOffsets =
    session.holdTargetOffsetsMs && session.holdTargetOffsetsMs.length > 0
      ? session.holdTargetOffsetsMs
      : [fallbackTargetElapsed]
  const activeAttemptIndex = Math.min(
    attempts.length,
    holdTargetOffsets.length - 1,
  )
  const targetElapsed =
    holdTargetOffsets[activeAttemptIndex] ?? fallbackTargetElapsed
  const targetWindow = getArtisanHoldBarWindow(
    targetElapsed,
    session.perfectWindowMs,
    duration,
  )
  const progressPercent = progress * 100
  const liveQuality =
    progressPercent >= targetWindow.left &&
    progressPercent <= targetWindow.right
      ? 'Hit'
      : 'Miss'
  const hitCount = attempts.filter((heldDuration, index) => {
    const attemptTarget = holdTargetOffsets[index] ?? fallbackTargetElapsed
    return Math.abs(heldDuration - attemptTarget) <= session.perfectWindowMs
  }).length

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent
        showCloseButton={false}
        onInteractOutside={(event) => event.preventDefault()}
        className="max-w-lg border-0 bg-transparent p-0 text-game-ink shadow-none"
      >
        <DialogTitle className="sr-only">Craft {recipe.name}</DialogTitle>
        <CraftDialogShell
          recipe={recipe}
          title="Precise Craft"
          subtitle="Hit the target three times."
          status={
            holding
              ? `Release · ${liveQuality}`
              : `Attempt ${Math.min(attempts.length + 1, 3)}/3 · ${hitCount} hits`
          }
          onClose={onClose}
          completing={completing}
        >
          <div className="rounded-xl border border-game-border bg-game-surface-raised p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-game-muted">
                <Gauge className="h-4 w-4 text-game-ochre" />
                Pressure
              </div>
              <QualityBadge
                label={
                  holding
                    ? liveQuality
                    : hitCount >= 3
                      ? 'Perfect'
                      : hitCount >= 2
                        ? 'Good'
                        : 'Bad'
                }
              />
            </div>
            <div className="relative h-10 overflow-hidden rounded-full border border-game-border bg-game-canvas shadow-inner">
              <div
                className="absolute top-0 h-full border-x border-game-moss bg-game-moss/25"
                style={{
                  left: `${targetWindow.left}%`,
                  width: `${targetWindow.width}%`,
                }}
              />
              <div
                className="absolute left-0 top-0 h-full bg-game-ochre transition-[width]"
                style={{ width: `${progress * 100}%` }}
              />
              <div
                className="absolute top-1/2 h-12 w-1.5 -translate-y-1/2 rounded-full bg-game-ink"
                style={{ left: `calc(${progress * 100}% - 2px)` }}
              />
            </div>

            <button
              type="button"
              disabled={completing}
              onPointerDown={startHold}
              onPointerCancel={() => {
                holdStartedAtRef.current = null
                setHolding(false)
                setProgress(0)
              }}
              onKeyDown={(event) => {
                if ((event.key === ' ' || event.key === 'Enter') && !holding) {
                  startHold()
                }
              }}
              onKeyUp={(event) => {
                if (event.key === ' ' || event.key === 'Enter') release()
              }}
              className={cn(
                'game-focus-ring mt-5 flex h-28 w-full items-center justify-center rounded-xl border text-sm font-black uppercase tracking-[0.2em] transition-colors disabled:opacity-70',
                holding
                  ? 'border-game-ochre bg-game-ochre/20 text-game-ink shadow-inner'
                  : 'border-game-clay bg-game-clay text-game-cream hover:bg-game-clay/90',
              )}
            >
              {completing ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <span className="flex flex-col items-center gap-2">
                  <MousePointer2 className="h-4 w-4" />
                  <span>{holding ? 'Release Now' : 'Hold Plate'}</span>
                  <span
                    className={cn(
                      'text-[10px] tracking-widest',
                      holding
                        ? 'text-game-ink'
                        : 'text-game-cream',
                    )}
                  >
                    {holding
                      ? 'release anywhere'
                      : `${attempts.length}/3 attempts`}
                  </span>
                </span>
              )}
            </button>
            <div className="mt-4 flex justify-center gap-2">
              {[0, 1, 2].map((index) => {
                const attempt = attempts[index]
                const attemptTarget =
                  holdTargetOffsets[index] ?? fallbackTargetElapsed
                const hit =
                  typeof attempt === 'number' &&
                  Math.abs(attempt - attemptTarget) <= session.perfectWindowMs
                return (
                  <span
                    key={index}
                    className={cn(
                      'h-2.5 w-8 rounded-full border',
                      typeof attempt !== 'number'
                        ? 'border-game-border bg-game-canvas'
                        : hit
                          ? 'border-game-moss bg-game-moss'
                          : 'border-game-clay/50 bg-game-clay/25',
                    )}
                  />
                )
              })}
            </div>
          </div>
        </CraftDialogShell>
      </DialogContent>
    </Dialog>
  )
}

interface CrushDialogProps {
  recipe: ArtisanRecipe | null
  session: ArtisanCraftSession | null
  open: boolean
  completing: boolean
  onComplete: (tapCount: number) => void
  onClose: () => void
}

function CrushDialog({
  recipe,
  session,
  open,
  completing,
  onComplete,
  onClose,
}: CrushDialogProps) {
  const [tapCount, setTapCount] = useState(0)
  const [now, setNow] = useState(Date.now())
  const completedRef = useRef(false)
  const tapCountRef = useRef(0)

  useEffect(() => {
    if (!open || !session) {
      setTapCount(0)
      tapCountRef.current = 0
      completedRef.current = false
      return
    }

    setNow(Date.now())
    const interval = window.setInterval(() => {
      const nextNow = Date.now()
      setNow(nextNow)
      if (nextNow >= session.endAt && !completedRef.current) {
        completedRef.current = true
        window.clearInterval(interval)
        onComplete(tapCountRef.current)
      }
    }, 50)

    return () => window.clearInterval(interval)
  }, [onComplete, open, session])

  if (!recipe || !session) return null

  const started = now >= session.startAt
  const finished = now >= session.endAt
  const duration = session.endAt - session.startAt
  const remainingMs = Math.max(
    0,
    session.endAt - Math.max(now, session.startAt),
  )
  const progress = started ? 1 - remainingMs / duration : 0
  const goodTapCount = session.goodTapCount || 13
  const perfectTapCount = session.perfectTapCount || 16
  const quality =
    tapCount >= perfectTapCount
      ? 'Perfect'
      : tapCount >= goodTapCount
        ? 'Good'
        : 'Bad'

  const tap = () => {
    if (!started || finished || completing || completedRef.current) return
    setTapCount((current) => {
      const next = current + 1
      tapCountRef.current = next
      return next
    })
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent
        showCloseButton={false}
        onInteractOutside={(event) => event.preventDefault()}
        className="max-w-lg border-0 bg-transparent p-0 text-game-ink shadow-none"
      >
        <DialogTitle className="sr-only">Crush {recipe.name}</DialogTitle>
        <CraftDialogShell
          recipe={recipe}
          title="Berry Crush"
          subtitle="Rapidly tap the press before the timer runs out."
          status={started ? 'Tap fast' : 'Get ready'}
          onClose={onClose}
          completing={completing}
        >
          <div className="rounded-xl border border-game-border bg-game-surface-raised p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-game-muted">
                <Timer className="h-4 w-4 text-game-ochre" />
                Timer
              </div>
              <span
                className={cn(
                  'text-[10px] font-black uppercase tracking-widest',
                  started ? 'text-game-ochre-strong' : 'text-game-muted',
                )}
              >
                {started ? `${(remainingMs / 1000).toFixed(1)}s` : 'Ready'}
              </span>
            </div>

            <div className="relative h-10 overflow-hidden rounded-full border border-game-border bg-game-canvas shadow-inner">
              <div
                className="h-full bg-game-moss transition-[width]"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            <div
              className={cn(
                'mt-4 rounded-2xl border p-4 text-center transition-colors',
                quality === 'Perfect'
                  ? 'border-game-moss/45 bg-game-moss/10'
                  : quality === 'Good'
                    ? 'border-game-ochre/45 bg-game-ochre/10'
                    : 'border-game-border bg-game-canvas',
              )}
            >
              <div
                className={cn(
                  'text-[10px] font-black uppercase tracking-[0.24em]',
                  quality === 'Perfect'
                    ? 'text-game-moss-strong'
                    : quality === 'Good'
                      ? 'text-game-ochre-strong'
                      : 'text-game-muted',
                )}
              >
                {quality}
              </div>
              <div className="mt-1 font-display text-4xl font-bold tracking-tight text-game-ink">
                {tapCount}
              </div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-game-muted">
                Good {goodTapCount} · Perfect {perfectTapCount}
              </div>
            </div>

            <Button
              type="button"
              disabled={!started || finished || completing}
              onPointerDown={tap}
              className={cn(
                'game-focus-ring mt-5 h-24 w-full rounded-xl border text-sm font-black uppercase tracking-[0.2em] transition-colors',
                started
                  ? 'border-game-clay bg-game-clay text-game-cream hover:bg-game-clay/90'
                  : 'border-game-border bg-game-canvas text-game-muted',
              )}
            >
              {completing || completedRef.current ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  <MousePointer2 className="h-4 w-4" />
                  {started ? 'Tap Fast' : 'Get Ready'}
                </span>
              )}
            </Button>
          </div>
        </CraftDialogShell>
      </DialogContent>
    </Dialog>
  )
}

interface ScatterTarget {
  id: string
  itemId: string
  x: number
  y: number
  size: number
}

interface ScatterDialogProps {
  recipe: ArtisanRecipe | null
  session: ArtisanCraftSession | null
  open: boolean
  completing: boolean
  onComplete: (tapCount: number) => void
  onClose: () => void
}

function createScatterTarget(
  recipe: ArtisanRecipe,
  index: number,
): ScatterTarget {
  const cost = recipe.costs[index % Math.max(1, recipe.costs.length)]

  return {
    id: `${Date.now()}-${index}-${Math.random().toString(36).slice(2)}`,
    itemId: cost?.id || getOutputItemId(recipe),
    x: 10 + Math.random() * 70,
    y: 10 + Math.random() * 58,
    size: 48 + Math.floor(Math.random() * 14),
  }
}

function ScatterDialog({
  recipe,
  session,
  open,
  completing,
  onComplete,
  onClose,
}: ScatterDialogProps) {
  const [tapCount, setTapCount] = useState(0)
  const [targets, setTargets] = useState<ScatterTarget[]>([])
  const [now, setNow] = useState(Date.now())
  const completedRef = useRef(false)
  const tapCountRef = useRef(0)
  const spawnIndexRef = useRef(0)

  useEffect(() => {
    if (!open || !session || !recipe) {
      setTapCount(0)
      setTargets([])
      tapCountRef.current = 0
      spawnIndexRef.current = 0
      completedRef.current = false
      return
    }

    setNow(Date.now())
    setTargets(
      Array.from({ length: 5 }, (_, index) =>
        createScatterTarget(recipe, index),
      ),
    )
    spawnIndexRef.current = 5

    const interval = window.setInterval(() => {
      const nextNow = Date.now()
      setNow(nextNow)

      if (nextNow >= session.endAt && !completedRef.current) {
        completedRef.current = true
        window.clearInterval(interval)
        onComplete(tapCountRef.current)
        return
      }

      if (nextNow < session.startAt) return

      setTargets((current) => {
        if (current.length >= 8) return current
        const nextIndex = spawnIndexRef.current
        spawnIndexRef.current += 1
        return [...current, createScatterTarget(recipe, nextIndex)]
      })
    }, 360)

    return () => window.clearInterval(interval)
  }, [onComplete, open, recipe, session])

  if (!recipe || !session) return null

  const started = now >= session.startAt
  const finished = now >= session.endAt
  const duration = session.endAt - session.startAt
  const remainingMs = Math.max(
    0,
    session.endAt - Math.max(now, session.startAt),
  )
  const progress = started ? 1 - remainingMs / duration : 0
  const goodTapCount = session.goodTapCount || 12
  const perfectTapCount = session.perfectTapCount || 20
  const quality =
    tapCount >= perfectTapCount
      ? 'Perfect'
      : tapCount >= goodTapCount
        ? 'Good'
        : 'Bad'

  const tapTarget = (targetId: string) => {
    if (!started || finished || completing || completedRef.current) return
    setTargets((current) => current.filter((target) => target.id !== targetId))
    setTapCount((current) => {
      const next = current + 1
      tapCountRef.current = next
      return next
    })
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent
        showCloseButton={false}
        onInteractOutside={(event) => event.preventDefault()}
        className="max-w-lg border-0 bg-transparent p-0 text-game-ink shadow-none"
      >
        <DialogTitle className="sr-only">Scatter {recipe.name}</DialogTitle>
        <CraftDialogShell
          recipe={recipe}
          title="Scatter Craft"
          subtitle="Tap the scattered recipe parts before the timer runs out."
          status={started ? 'Clear the parts' : 'Get ready'}
          onClose={onClose}
          completing={completing}
        >
          <div className="rounded-xl border border-game-border bg-game-surface-raised p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-game-muted">
                <Timer className="h-4 w-4 text-game-ochre" />
                Timer
              </div>
              <span
                className={cn(
                  'text-[10px] font-black uppercase tracking-widest',
                  started ? 'text-game-ochre-strong' : 'text-game-muted',
                )}
              >
                {started ? `${(remainingMs / 1000).toFixed(1)}s` : 'Ready'}
              </span>
            </div>

            <div className="relative h-9 overflow-hidden rounded-full border border-game-border bg-game-canvas shadow-inner">
              <div
                className="h-full bg-game-moss transition-[width]"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            <div className="relative mt-5 h-72 overflow-hidden rounded-xl border border-game-border bg-game-canvas">
              {targets.map((target) => (
                <button
                  key={target.id}
                  type="button"
                  disabled={!started || finished || completing}
                  onPointerDown={() => tapTarget(target.id)}
                  className={cn(
                    'game-focus-ring absolute flex touch-none items-center justify-center rounded-full border border-game-ochre/45 bg-game-surface shadow-sm transition-colors active:bg-game-ochre/15 disabled:opacity-50',
                    started && !finished
                      ? 'hover:border-game-clay'
                      : 'grayscale',
                  )}
                  style={{
                    left: `${target.x}%`,
                    top: `${target.y}%`,
                    width: target.size,
                    height: target.size,
                  }}
                  aria-label={`Tap ${getItemName(target.itemId)}`}
                >
                  <ItemSprite
                    itemId={target.itemId}
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  />
                </button>
              ))}
              {!started ? (
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black uppercase tracking-[0.28em] text-game-muted">
                  Ready
                </div>
              ) : null}
            </div>

            <div
              className={cn(
                'mt-4 rounded-2xl border p-4 text-center transition-colors',
                quality === 'Perfect'
                  ? 'border-game-moss/45 bg-game-moss/10'
                  : quality === 'Good'
                    ? 'border-game-ochre/45 bg-game-ochre/10'
                    : 'border-game-border bg-game-canvas',
              )}
            >
              <div
                className={cn(
                  'text-[10px] font-black uppercase tracking-[0.24em]',
                  quality === 'Perfect'
                    ? 'text-game-moss-strong'
                    : quality === 'Good'
                      ? 'text-game-ochre-strong'
                      : 'text-game-muted',
                )}
              >
                {quality}
              </div>
              <div className="mt-1 font-display text-4xl font-bold tracking-tight text-game-ink">
                {tapCount}
              </div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-game-muted">
                Good {goodTapCount} · Perfect {perfectTapCount}
              </div>
            </div>

            {completing || completedRef.current ? (
              <div className="mt-4 flex h-10 items-center justify-center text-game-moss-strong">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            ) : null}
          </div>
        </CraftDialogShell>
      </DialogContent>
    </Dialog>
  )
}

interface BalanceDialogProps {
  recipe: ArtisanRecipe | null
  session: ArtisanCraftSession | null
  open: boolean
  completing: boolean
  onComplete: (lockElapsedMs: number[]) => void
  onClose: () => void
}

const balanceStages = ['Gem', 'Material', 'PokePowder']

function BalanceDialog({
  recipe,
  session,
  open,
  completing,
  onComplete,
  onClose,
}: BalanceDialogProps) {
  const [now, setNow] = useState(Date.now())
  const [locks, setLocks] = useState<number[]>([])
  const completedRef = useRef(false)
  const locksRef = useRef<number[]>([])

  useEffect(() => {
    if (!open || !session) {
      setNow(Date.now())
      setLocks([])
      locksRef.current = []
      completedRef.current = false
      return
    }

    setNow(Date.now())
    const frame = window.setInterval(() => {
      const nextNow = Date.now()
      setNow(nextNow)
      if (nextNow >= session.endAt && !completedRef.current) {
        completedRef.current = true
        window.clearInterval(frame)
        onComplete(locksRef.current)
      }
    }, 33)

    return () => window.clearInterval(frame)
  }, [onComplete, open, session])

  if (!recipe || !session) return null

  const started = now >= session.startAt
  const finished = now >= session.endAt
  const duration = session.endAt - session.startAt
  const elapsedMs = Math.min(duration, Math.max(0, now - session.startAt))
  const remainingMs = Math.max(
    0,
    session.endAt - Math.max(now, session.startAt),
  )
  const activeIndex = Math.min(locks.length, 2)
  const targets = session.balanceTargets || [0.45, 0.55, 0.5]
  const perfectWindow = session.balancePerfectWindow || 0.07
  const position = getArtisanBalancePosition(elapsedMs, session.balancePeriodMs)

  const lockCurrent = () => {
    if (
      !started ||
      finished ||
      completing ||
      completedRef.current ||
      locksRef.current.length >= 3
    )
      return
    const nextLocks = [...locksRef.current, elapsedMs]
    locksRef.current = nextLocks
    setLocks(nextLocks)

    if (nextLocks.length >= 3) {
      completedRef.current = true
      onComplete(nextLocks)
    }
  }

  const getLockQuality = (index: number) => {
    const lockElapsed = locks[index]
    if (typeof lockElapsed !== 'number') return 'Waiting'
    const lockedPosition = getArtisanBalancePosition(
      lockElapsed,
      session.balancePeriodMs,
    )
    const delta = Math.abs(lockedPosition - targets[index])
    if (delta <= perfectWindow) return 'Good'
    return 'Bad'
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent
        showCloseButton={false}
        onInteractOutside={(event) => event.preventDefault()}
        className="max-w-lg border-0 bg-transparent p-0 text-game-ink shadow-none"
      >
        <DialogTitle className="sr-only">Balance {recipe.name}</DialogTitle>
        <CraftDialogShell
          recipe={recipe}
          title="Scent Balance"
          subtitle="Lock each component when its meter enters the target zone."
          status={started ? `Lock ${balanceStages[activeIndex]}` : 'Get ready'}
          onClose={onClose}
          completing={completing}
        >
          <div className="rounded-xl border border-game-border bg-game-surface-raised p-5">
            <div className="mb-4 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-game-muted">
              <span>Balance</span>
              <span
                className={
                  started ? 'text-game-ochre-strong' : 'text-game-muted'
                }
              >
                {started ? `${(remainingMs / 1000).toFixed(1)}s` : 'Ready'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {balanceStages.map((stage, index) => {
                const target = targets[index] || 0.5
                const isActive = started && locks.length === index && !finished
                const lockedElapsed = locks[index]
                const markerPosition =
                  typeof lockedElapsed === 'number'
                    ? getArtisanBalancePosition(
                        lockedElapsed,
                        session.balancePeriodMs,
                      )
                    : isActive
                      ? position
                      : 0

                return (
                  <div
                    key={stage}
                    className={cn(
                      'rounded-lg border bg-game-surface p-3',
                      isActive ? 'border-game-ochre' : 'border-game-border',
                    )}
                  >
                    <div className="mb-2 text-center text-[10px] font-black uppercase tracking-widest text-game-muted">
                      {stage}
                    </div>
                    <div className="relative h-36 overflow-hidden rounded-full border border-game-border bg-game-canvas">
                      <div
                        className="absolute left-0 right-0 border-y border-game-moss bg-game-moss/25"
                        style={{
                          bottom: `${Math.max(0, (target - perfectWindow) * 100)}%`,
                          height: `${Math.min(1, perfectWindow * 2) * 100}%`,
                        }}
                      />
                      {(isActive || typeof lockedElapsed === 'number') && (
                        <div
                          className={cn(
                            'absolute left-1/2 h-3 w-8 -translate-x-1/2 translate-y-1/2 rounded-full',
                            typeof lockedElapsed === 'number'
                              ? 'bg-game-ink'
                              : 'bg-game-ochre',
                          )}
                          style={{ bottom: `${markerPosition * 100}%` }}
                        />
                      )}
                    </div>
                    <div className="mt-2 text-center text-[10px] font-black uppercase tracking-widest text-game-muted">
                      {getLockQuality(index)}
                    </div>
                  </div>
                )
              })}
            </div>

            <Button
              type="button"
              disabled={
                !started || finished || completing || completedRef.current
              }
              onClick={lockCurrent}
              className={cn(
                'game-focus-ring mt-5 h-14 w-full rounded-xl border text-sm font-black uppercase tracking-[0.2em] transition-colors',
                started
                  ? 'border-game-clay bg-game-clay text-game-cream hover:bg-game-clay/90'
                  : 'border-game-border bg-game-canvas text-game-muted',
              )}
            >
              {completing || completedRef.current ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  {started ? `Lock ${balanceStages[activeIndex]}` : 'Get Ready'}
                </span>
              )}
            </Button>
          </div>
        </CraftDialogShell>
      </DialogContent>
    </Dialog>
  )
}

interface MixDialogProps {
  recipe: ArtisanRecipe | null
  session: ArtisanCraftSession | null
  open: boolean
  completing: boolean
  onComplete: (rotations: number) => void
  onClose: () => void
}

function getPointerAngle(
  event: PointerEvent | ReactPointerEvent<HTMLElement>,
  element: HTMLElement,
) {
  const rect = element.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  return Math.atan2(event.clientY - centerY, event.clientX - centerX)
}

function MixDialog({
  recipe,
  session,
  open,
  completing,
  onComplete,
  onClose,
}: MixDialogProps) {
  const [now, setNow] = useState(Date.now())
  const [rotations, setRotations] = useState(0)
  const [angle, setAngle] = useState(0)
  const dialRef = useRef<HTMLDivElement | null>(null)
  const completedRef = useRef(false)
  const draggingRef = useRef(false)
  const lastAngleRef = useRef<number | null>(null)
  const rotationRef = useRef(0)

  useEffect(() => {
    if (!open || !session) {
      setNow(Date.now())
      setRotations(0)
      setAngle(0)
      completedRef.current = false
      draggingRef.current = false
      lastAngleRef.current = null
      rotationRef.current = 0
      return
    }

    setNow(Date.now())
    const interval = window.setInterval(() => {
      const nextNow = Date.now()
      setNow(nextNow)
      if (nextNow >= session.endAt && !completedRef.current) {
        completedRef.current = true
        window.clearInterval(interval)
        onComplete(rotationRef.current)
      }
    }, 33)

    return () => window.clearInterval(interval)
  }, [onComplete, open, session])

  useEffect(() => {
    if (!open) return

    const move = (event: PointerEvent) => {
      if (
        !draggingRef.current ||
        !dialRef.current ||
        completedRef.current ||
        completing
      )
        return
      const nextAngle = getPointerAngle(event, dialRef.current)
      const previousAngle = lastAngleRef.current
      lastAngleRef.current = nextAngle
      setAngle(nextAngle)

      if (previousAngle === null) return
      let delta = nextAngle - previousAngle
      if (delta > Math.PI) delta -= Math.PI * 2
      if (delta < -Math.PI) delta += Math.PI * 2
      rotationRef.current += Math.abs(delta) / (Math.PI * 2)
      setRotations(rotationRef.current)
    }

    const stop = () => {
      draggingRef.current = false
      lastAngleRef.current = null
    }

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', stop)
    window.addEventListener('pointercancel', stop)
    window.addEventListener('blur', stop)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', stop)
      window.removeEventListener('pointercancel', stop)
      window.removeEventListener('blur', stop)
    }
  }, [completing, open])

  if (!recipe || !session) return null

  const started = now >= session.startAt
  const finished = now >= session.endAt
  const duration = session.endAt - session.startAt
  const remainingMs = Math.max(
    0,
    session.endAt - Math.max(now, session.startAt),
  )
  const progress = started ? 1 - remainingMs / duration : 0
  const goodRotations = session.mixGoodRotations || 2.25
  const perfectRotations = session.mixPerfectRotations || 3.5
  const quality =
    rotations >= perfectRotations
      ? 'Perfect'
      : rotations >= goodRotations
        ? 'Good'
        : 'Bad'

  const startMix = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      !started ||
      finished ||
      completing ||
      completedRef.current ||
      !dialRef.current
    )
      return
    draggingRef.current = true
    lastAngleRef.current = getPointerAngle(event, dialRef.current)
    setAngle(lastAngleRef.current)
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent
        showCloseButton={false}
        onInteractOutside={(event) => event.preventDefault()}
        className="max-w-lg border-0 bg-transparent p-0 text-game-ink shadow-none"
      >
        <DialogTitle className="sr-only">Mix {recipe.name}</DialogTitle>
        <CraftDialogShell
          recipe={recipe}
          title="Potion Mix"
          subtitle="Spin the dial quickly until the mixture comes together."
          status={started ? 'Spin the dial' : 'Get ready'}
          onClose={onClose}
          completing={completing}
        >
          <div className="rounded-xl border border-game-border bg-game-surface-raised p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-game-muted">
                <Timer className="h-4 w-4 text-game-ochre" />
                Timer
              </div>
              <span
                className={cn(
                  'text-[10px] font-black uppercase tracking-widest',
                  started ? 'text-game-ochre-strong' : 'text-game-muted',
                )}
              >
                {started ? `${(remainingMs / 1000).toFixed(1)}s` : 'Ready'}
              </span>
            </div>

            <div className="relative h-9 overflow-hidden rounded-full border border-game-border bg-game-canvas shadow-inner">
              <div
                className="h-full bg-game-moss transition-[width]"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            <div
              ref={dialRef}
              onPointerDown={startMix}
              className={cn(
                'mx-auto mt-5 flex aspect-square w-full max-w-64 touch-none items-center justify-center rounded-full border bg-game-canvas shadow-inner',
                started && !finished
                  ? 'cursor-grab border-game-ochre active:cursor-grabbing'
                  : 'border-game-border opacity-70',
              )}
            >
              <div
                className="relative flex h-32 w-32 items-center justify-center rounded-full border border-game-border bg-game-surface shadow-sm"
                style={{ transform: `rotate(${angle}rad)` }}
              >
                <div className="absolute left-1/2 top-3 h-10 w-2 -translate-x-1/2 rounded-full bg-game-ochre" />
                <RotateCw className="h-10 w-10 text-game-clay" />
              </div>
            </div>

            <div
              className={cn(
                'mt-4 rounded-2xl border p-4 text-center transition-colors',
                quality === 'Perfect'
                  ? 'border-game-moss/45 bg-game-moss/10'
                  : quality === 'Good'
                    ? 'border-game-ochre/45 bg-game-ochre/10'
                    : 'border-game-border bg-game-canvas',
              )}
            >
              <div
                className={cn(
                  'text-[10px] font-black uppercase tracking-[0.24em]',
                  quality === 'Perfect'
                    ? 'text-game-moss-strong'
                    : quality === 'Good'
                      ? 'text-game-ochre-strong'
                      : 'text-game-muted',
                )}
              >
                {quality}
              </div>
              <div className="mt-1 font-display text-4xl font-bold tracking-tight text-game-ink">
                {rotations.toFixed(1)}
              </div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-game-muted">
                Good {goodRotations} · Perfect {perfectRotations}
              </div>
            </div>

            {completing || completedRef.current ? (
              <div className="mt-4 flex h-10 items-center justify-center text-game-moss-strong">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            ) : null}
          </div>
        </CraftDialogShell>
      </DialogContent>
    </Dialog>
  )
}

export function ArtisanPanel() {
  const { user, gameData, refreshUser } = useUser()
  const [loadingRecipe, setLoadingRecipe] = useState<string | null>(null)
  const [selectedRecipe, setSelectedRecipe] = useState<ArtisanRecipe | null>(
    null,
  )
  const [selectedRecipeGroup, setSelectedRecipeGroup] =
    useState<RecipeVariantGroup | null>(null)
  const [activeCategory, setActiveCategory] = useState<
    ArtisanRecipeCategory | 'all'
  >('all')
  const [qteRecipe, setQteRecipe] = useState<ArtisanRecipe | null>(null)
  const [craftSession, setCraftSession] = useState<ArtisanCraftSession | null>(
    null,
  )
  const [craftDialogOpen, setCraftDialogOpen] = useState(false)
  const [completingCraft, setCompletingCraft] = useState(false)
  const [craftResult, setCraftResult] = useState<{
    success: boolean
    failed?: boolean
    materialsLost?: boolean
    quality?: string
    recipeName?: string
    rewards?: any
    icon?: { type: 'item'; id: string }
  } | null>(null)

  const inventory = useMemo(
    () =>
      Object.fromEntries(
        (gameData?.inventory || []).map((item) => [item.itemId, item.quantity]),
      ),
    [gameData?.inventory],
  )
  const currency = useMemo(
    () => (user?.currency || {}) as Record<string, number>,
    [user?.currency],
  )
  const artisanLevel = getSkillLevel(user?.skills as any, 'artisan')

  const recipeStates = useMemo(
    () =>
      new Map(
        artisanRecipes.map((recipe) => [
          recipe.id,
          getRecipeState(recipe, artisanLevel, inventory, currency, gameData),
        ]),
      ),
    [artisanLevel, currency, gameData, inventory],
  )

  const visibleRecipePool = useMemo(() => {
    return artisanRecipes.filter(
      (recipe) => !recipeStates.get(recipe.id)?.requirementsHidden,
    )
  }, [recipeStates])

  const counts = useMemo(() => {
    const next: Record<ArtisanRecipeCategory | 'all', number> = {
      all: visibleRecipePool.length,
      materials: 0,
      balls: 0,
      lures: 0,
      held: 0,
      items: 0,
      quests: 0,
    }

    for (const recipe of visibleRecipePool) {
      next[recipe.category] += 1
    }
    return next
  }, [visibleRecipePool])

  const categoryOptions = useMemo(() => {
    return (
      ['all', 'materials', 'balls', 'lures', 'held', 'items', 'quests'] as const
    ).filter((category) => category === 'all' || counts[category] > 0)
  }, [counts])

  useEffect(() => {
    if (activeCategory !== 'all' && counts[activeCategory] === 0) {
      setActiveCategory('all')
    }
  }, [activeCategory, counts])

  useEffect(() => {
    if (craftDialogOpen || (!qteRecipe && !craftSession)) return

    const timeout = window.setTimeout(() => {
      setQteRecipe(null)
      setCraftSession(null)
    }, 250)

    return () => window.clearTimeout(timeout)
  }, [craftDialogOpen, craftSession, qteRecipe])

  const visibleRecipes = useMemo(() => {
    return [...visibleRecipePool]
      .filter((recipe: ArtisanRecipe) => {
        if (activeCategory !== 'all' && recipe.category !== activeCategory)
          return false
        return true
      })
      .sort(
        (a: ArtisanRecipe, b: ArtisanRecipe) =>
          a.artisanLevel - b.artisanLevel ||
          a.name.localeCompare(b.name) ||
          a.id.localeCompare(b.id),
      )
  }, [activeCategory, visibleRecipePool])

  const visibleIndexEntries = useMemo<RecipeIndexEntry[]>(() => {
    if (
      activeCategory !== 'all' &&
      activeCategory !== 'lures' &&
      activeCategory !== 'held'
    ) {
      return visibleRecipes.map((recipe) => ({ type: 'recipe', recipe }))
    }

    const lureGroups = createLureGroups(visibleRecipePool)
    const lureGroupEntries = lureGroups.map(
      (group) => group as RecipeIndexEntry,
    )
    const heldGroup = createHeldTypeBoostGroup(visibleRecipePool)
    const heldGroupEntries = heldGroup ? [heldGroup as RecipeIndexEntry] : []

    if (activeCategory === 'lures') return lureGroupEntries
    if (activeCategory === 'held') return heldGroupEntries

    const nonGroupedRecipes = visibleRecipes
      .filter(
        (recipe) => recipe.category !== 'lures' && recipe.category !== 'held',
      )
      .map((recipe) => ({ type: 'recipe' as const, recipe }))

    return [
      ...nonGroupedRecipes,
      ...lureGroupEntries,
      ...heldGroupEntries,
    ].sort((a, b) => {
      const aLevel =
        a.type === 'recipe' ? a.recipe.artisanLevel : a.artisanLevel
      const bLevel =
        b.type === 'recipe' ? b.recipe.artisanLevel : b.artisanLevel
      const aName = a.type === 'recipe' ? a.recipe.name : a.name
      const bName = b.type === 'recipe' ? b.recipe.name : b.name
      return aLevel - bLevel || aName.localeCompare(bName)
    })
  }, [activeCategory, visibleRecipePool, visibleRecipes])

  const startCraft = useCallback(
    async (recipe: ArtisanRecipe, craftMultiplier = 1) => {
      if (loadingRecipe || completingCraft) return
      setLoadingRecipe(recipe.id)
      const response = await beginArtisanCraft(recipe.id, craftMultiplier)
      setLoadingRecipe(null)

      if (!response.success) {
        toast.error(response.error || 'Craft failed')
        return
      }

      setSelectedRecipe(null)
      setSelectedRecipeGroup(null)
      setQteRecipe(recipe)
      setCraftSession(response.session as ArtisanCraftSession)
      setCraftDialogOpen(true)
    },
    [completingCraft, loadingRecipe],
  )

  const closeCraftDialog = useCallback(() => {
    if (completingCraft) return
    setCraftDialogOpen(false)
  }, [completingCraft])

  const finishCraft = useCallback(
    async (craftInput: number | number[]) => {
      if (!craftSession || completingCraft) return
      setCompletingCraft(true)
      const response = await completeArtisanCraft(craftSession.id, craftInput)
      setCompletingCraft(false)
      setCraftDialogOpen(false)

      if (!response.success) {
        toast.error(response.error || 'Craft failed')
        return
      }

      const completedRecipe = artisanRecipes.find(
        (recipe) => recipe.id === response.recipeId,
      )
      const outputItemId = completedRecipe
        ? getOutputItemId(completedRecipe)
        : undefined

      setCraftResult({
        success: !response.failed,
        failed: response.failed,
        materialsLost: response.materialsLost,
        quality: response.quality,
        recipeName: response.recipeName,
        rewards: response.summary,
        icon: outputItemId ? { type: 'item', id: outputItemId } : undefined,
      })
      refreshUser(true)
    },
    [completingCraft, craftSession, refreshUser],
  )

  const selectedState = selectedRecipe
    ? recipeStates.get(selectedRecipe.id)
    : undefined
  const selectedBulkVisible =
    !!selectedRecipe?.bulk &&
    selectedRecipe.bulk > 1 &&
    artisanLevel >=
      getArtisanCraftRequiredLevel(selectedRecipe, selectedRecipe.bulk)
  const selectedBulkState =
    selectedBulkVisible && selectedRecipe?.bulk
      ? getRecipeState(
          selectedRecipe,
          artisanLevel,
          inventory,
          currency,
          gameData,
          selectedRecipe.bulk,
        )
      : undefined
  const selectedRequirements =
    selectedRecipe && gameData
      ? [...(selectedRecipe.criteria || [])].map((condition) => {
          const progress = getRequirementProgress(gameData, condition)

          return {
            ...mapCriteriaToDisplayItem(condition),
            completed: progress.completed,
            progress:
              progress.target > 1
                ? {
                    current: progress.current,
                    max: progress.target,
                  }
                : undefined,
          }
        })
      : []
  const selectedRewards = selectedRecipe
    ? [
        ...getRecipeRewardItems(selectedRecipe),
        ...(getSkillXpReward(selectedRecipe)
          ? [getSkillXpReward(selectedRecipe)!]
          : []),
      ]
    : []

  return (
    <div className="flex h-full flex-col overflow-hidden bg-game-canvas text-game-ink">
      {qteRecipe?.craftType === 'crush' ? (
        <CrushDialog
          recipe={qteRecipe}
          session={craftSession}
          open={craftDialogOpen && !!qteRecipe && !!craftSession}
          completing={completingCraft}
          onComplete={finishCraft}
          onClose={closeCraftDialog}
        />
      ) : qteRecipe?.craftType === 'balance' ? (
        <BalanceDialog
          recipe={qteRecipe}
          session={craftSession}
          open={craftDialogOpen && !!qteRecipe && !!craftSession}
          completing={completingCraft}
          onComplete={finishCraft}
          onClose={closeCraftDialog}
        />
      ) : qteRecipe?.craftType === 'mix' ? (
        <MixDialog
          recipe={qteRecipe}
          session={craftSession}
          open={craftDialogOpen && !!qteRecipe && !!craftSession}
          completing={completingCraft}
          onComplete={finishCraft}
          onClose={closeCraftDialog}
        />
      ) : qteRecipe?.craftType === 'scatter' ? (
        <ScatterDialog
          recipe={qteRecipe}
          session={craftSession}
          open={craftDialogOpen && !!qteRecipe && !!craftSession}
          completing={completingCraft}
          onComplete={finishCraft}
          onClose={closeCraftDialog}
        />
      ) : qteRecipe?.craftType === 'precise' ? (
        <HoldReleaseDialog
          recipe={qteRecipe}
          session={craftSession}
          open={craftDialogOpen && !!qteRecipe && !!craftSession}
          completing={completingCraft}
          onRelease={finishCraft}
          onClose={closeCraftDialog}
        />
      ) : null}

      <PremiumHeader title="Artisan" subtitle="Workshop ledger" showEffects />

      <div className="hidden items-center gap-3 border-b border-game-border bg-game-surface/70 px-6 py-3 xl:flex">
        <div className="w-64 shrink-0">
          <PremiumSelect
            value={activeCategory}
            onValueChange={(value) =>
              setActiveCategory(value as ArtisanRecipeCategory | 'all')
            }
            options={categoryOptions.map((category) => ({
              id: category,
              label: `${categoryLabels[category]} (${counts[category]})`,
            }))}
          />
        </div>
        <p className="text-xs text-game-muted">
          Browse recipes by workshop category.
        </p>
      </div>

      <RewardResultOverlay
        result={craftResult}
        onClose={() => setCraftResult(null)}
        icon={craftResult?.icon}
        title={
          craftResult
            ? craftResult.failed
              ? 'CRAFT FAILED'
              : 'CRAFT COMPLETE'
            : undefined
        }
        message={
          craftResult
            ? craftResult.failed
              ? craftResult.materialsLost
                ? `${craftResult.recipeName || 'Craft'} failed. Materials were consumed.`
                : `${craftResult.recipeName || 'Craft'} failed. Materials were preserved.`
              : `${craftResult.recipeName || 'Craft'} finished with ${craftResult.quality || 'completed'} quality.`
            : undefined
        }
      />

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6 md:px-6">
        <div className="space-y-8">
          <SectionDivider textColor="text-game-moss-strong">
            Recipe index
          </SectionDivider>

          {visibleIndexEntries.length === 0 ? (
            <div
              className="rounded-lg border border-dashed border-game-border bg-game-surface py-16 text-center text-sm font-medium text-game-muted"
              role="status"
              aria-live="polite"
            >
              No recipes in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
              {visibleIndexEntries.map((entry) => {
                if (entry.type !== 'recipe') {
                  const group = entry
                  const readyCount = group.recipes.filter(
                    (recipe) => recipeStates.get(recipe.id)?.canCraft,
                  ).length
                  const lockedCount = group.recipes.filter(
                    (recipe) => recipeStates.get(recipe.id)?.locked,
                  ).length
                  const previewRecipe = group.recipes[0]
                  const levelLabel =
                    group.type === 'heldGroup'
                      ? `Lv ${group.artisanLevel}+`
                      : `Lv ${group.artisanLevel}`

                  return (
                    <div
                      key={group.id}
                      onClick={() => setSelectedRecipeGroup(group)}
                      onKeyDown={(event) => {
                        if (event.target !== event.currentTarget) return
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          setSelectedRecipeGroup(group)
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`View ${group.name} recipe variants`}
                      aria-haspopup="dialog"
                      className="game-focus-ring group relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-lg border border-game-border bg-game-surface p-4 text-left transition-colors hover:border-game-moss/45 hover:bg-game-surface-raised"
                    >
                      <div className="shrink-0">
                        <div className="relative flex h-14 w-14 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised transition-colors group-hover:border-game-moss/35">
                          {previewRecipe ? (
                            <RecipeOutputIcon
                              recipe={previewRecipe}
                              className="h-9 w-9 object-contain"
                            />
                          ) : (
                            <Sparkles className="h-8 w-8 text-game-ochre" />
                          )}
                        </div>
                      </div>

                      <div className="relative min-w-0 flex-1">
                        <span className="mb-1 block truncate text-[11px] font-medium text-game-moss-strong">
                          {group.categoryLabel} · {levelLabel} ·{' '}
                          {group.recipes.length} variants
                        </span>
                        <h3 className="truncate text-sm font-semibold text-game-ink">
                          {group.name}
                        </h3>
                        <div className="mt-1 truncate text-[11px] font-semibold uppercase tracking-[0.1em] text-game-muted">
                          {readyCount > 0
                            ? `${readyCount} ready`
                            : lockedCount === group.recipes.length
                              ? 'Locked'
                              : 'Choose variant'}
                        </div>
                      </div>

                      <div className="relative z-10 flex shrink-0 items-center gap-1">
                        <Button
                          type="button"
                          size="icon-sm"
                          onClick={(event) => {
                            event.stopPropagation()
                            setSelectedRecipeGroup(group)
                          }}
                          className="h-10 w-10 rounded-lg border border-game-border bg-game-surface-raised text-game-moss hover:bg-game-moss/10 hover:text-game-moss-strong"
                          aria-label={`View ${group.name}`}
                          title={`View ${group.name}`}
                        >
                          <Info className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                }

                const recipe = entry.recipe
                const state = recipeStates.get(recipe.id)!
                return (
                  <div
                    key={recipe.id}
                    onClick={() => setSelectedRecipe(recipe)}
                    onKeyDown={(event) => {
                      if (event.target !== event.currentTarget) return
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        setSelectedRecipe(recipe)
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${recipe.name} recipe`}
                    aria-haspopup="dialog"
                    className={cn(
                      'game-focus-ring group relative flex items-center gap-4 overflow-hidden rounded-lg border p-4 text-left transition-colors',
                      state.canCraft
                        ? 'cursor-pointer border-game-moss/35 bg-game-surface hover:border-game-moss/60 hover:bg-game-surface-raised'
                        : state.locked
                          ? 'cursor-pointer border-game-border bg-game-surface opacity-70'
                          : 'cursor-pointer border-game-border bg-game-surface hover:border-game-moss/35',
                    )}
                  >
                    <div className="shrink-0">
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised transition-colors group-hover:border-game-moss/35">
                        {state.locked ? (
                          <Lock className="absolute right-0.5 top-0.5 h-3 w-3 text-game-muted" />
                        ) : null}
                        <RecipeOutputIcon
                          recipe={recipe}
                          className={cn(
                            'h-9 w-9 object-contain',
                            state.locked && 'grayscale',
                          )}
                        />
                      </div>
                    </div>

                    <div className="relative min-w-0 flex-1">
                      <span className="mb-1 block truncate text-[11px] font-medium text-game-moss-strong">
                        {categoryLabels[recipe.category]} · Lv{' '}
                        {recipe.artisanLevel} · {formatOutputRange(recipe)}
                      </span>
                      <h3 className="truncate text-sm font-semibold text-game-ink">
                        {recipe.name}
                      </h3>
                      <div className="mt-1 truncate text-[11px] font-semibold uppercase tracking-[0.1em] text-game-muted">
                        {state.canCraft ? 'Ready' : state.lockReason}
                      </div>
                    </div>

                    <div className="relative z-10 flex shrink-0 items-center gap-1">
                      <Button
                        type="button"
                        size="icon-sm"
                        onClick={(event) => {
                          event.stopPropagation()
                          setSelectedRecipe(recipe)
                        }}
                        className="h-10 w-10 rounded-lg border border-game-border bg-game-surface-raised text-game-moss hover:bg-game-moss/10 hover:text-game-moss-strong"
                        aria-label={`View ${recipe.name}`}
                        title={`View ${recipe.name}`}
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        size="icon-sm"
                        disabled={
                          !state.canCraft ||
                          loadingRecipe === recipe.id ||
                          completingCraft
                        }
                        onClick={(event) => {
                          event.stopPropagation()
                          startCraft(recipe)
                        }}
                        className={cn(
                          'h-10 w-10 rounded-lg',
                          state.canCraft
                            ? 'bg-game-clay text-game-cream hover:bg-game-clay-strong'
                            : 'border border-game-border bg-game-surface-raised text-game-muted',
                        )}
                        aria-label={`Craft ${recipe.name}`}
                        title={`Craft ${recipe.name}`}
                      >
                        {loadingRecipe === recipe.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Hammer className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <SecondaryControlBar className="xl:hidden">
        <PremiumSelect
          value={activeCategory}
          onValueChange={(value) =>
            setActiveCategory(value as ArtisanRecipeCategory | 'all')
          }
          options={categoryOptions.map((category) => ({
            id: category,
            label: `${categoryLabels[category]} (${counts[category]})`,
          }))}
        />
      </SecondaryControlBar>

      <GameInfoModal
        open={!!selectedRecipeGroup}
        onOpenChange={(open) => !open && setSelectedRecipeGroup(null)}
        title={selectedRecipeGroup?.name || ''}
        description={selectedRecipeGroup?.description}
        category={
          selectedRecipeGroup
            ? `Artisan · ${selectedRecipeGroup.categoryLabel}`
            : undefined
        }
        icon={
          selectedRecipeGroup?.recipes[0] ? (
            <RecipeOutputIcon
              recipe={selectedRecipeGroup.recipes[0]}
              className="h-12 w-12 object-contain"
            />
          ) : null
        }
        properties={
          selectedRecipeGroup
            ? [
                {
                  icon: <Hammer className="h-4 w-4" />,
                  label: 'Level',
                  value:
                    selectedRecipeGroup.type === 'heldGroup'
                      ? `${selectedRecipeGroup.artisanLevel}+`
                      : selectedRecipeGroup.artisanLevel,
                },
                {
                  icon: <Sparkles className="h-4 w-4" />,
                  label: 'Craft',
                  value:
                    selectedRecipeGroup.type === 'heldGroup'
                      ? 'Precise'
                      : 'Balance',
                },
                {
                  icon: <Target className="h-4 w-4" />,
                  label: 'Variants',
                  value: selectedRecipeGroup.recipes.length,
                },
              ]
            : undefined
        }
        background="/backgrounds/bike-shop.avif"
        presentation="drawer"
      >
        {selectedRecipeGroup ? (
          <div className="space-y-4">
            <SectionDivider>Variants</SectionDivider>
            <div className="grid grid-cols-1 gap-3">
              {selectedRecipeGroup.recipes.map((recipe) => {
                const state = recipeStates.get(recipe.id)!
                const bulkVisible =
                  !!recipe.bulk &&
                  recipe.bulk > 1 &&
                  artisanLevel >=
                    getArtisanCraftRequiredLevel(recipe, recipe.bulk)
                const bulkState =
                  bulkVisible && recipe.bulk
                    ? getRecipeState(
                        recipe,
                        artisanLevel,
                        inventory,
                        currency,
                        gameData,
                        recipe.bulk,
                      )
                    : undefined

                return (
                  <div
                    key={recipe.id}
                    className={cn(
                      'rounded-lg border bg-game-surface p-3',
                      state.canCraft
                        ? 'border-game-moss/35'
                        : state.locked
                          ? 'border-game-border opacity-75'
                          : 'border-game-border',
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised">
                        <RecipeOutputIcon
                          recipe={recipe}
                          className={cn(
                            'h-9 w-9 object-contain',
                            state.locked && 'grayscale',
                          )}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold text-game-ink">
                          {recipe.name}
                        </div>
                        <div className="mt-1 truncate text-[11px] font-semibold uppercase tracking-[0.1em] text-game-muted">
                          {formatOutputRange(recipe)} ·{' '}
                          {state.canCraft ? 'Ready' : state.lockReason}
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <AppButton
                          disabled={
                            !state.canCraft ||
                            loadingRecipe === recipe.id ||
                            completingCraft
                          }
                          onClick={() => startCraft(recipe)}
                          className="h-10 px-3"
                          size="sm"
                          variant={state.canCraft ? 'default' : 'outline'}
                        >
                          {loadingRecipe === recipe.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : state.canCraft ? (
                            'Craft'
                          ) : (
                            'Locked'
                          )}
                        </AppButton>
                        {bulkVisible && recipe.bulk ? (
                          <AppButton
                            disabled={
                              !bulkState?.canCraft ||
                              loadingRecipe === recipe.id ||
                              completingCraft
                            }
                            onClick={() => startCraft(recipe, recipe.bulk)}
                            className="h-10 px-2.5"
                            size="sm"
                            variant={
                              bulkState?.canCraft ? 'secondary' : 'outline'
                            }
                            title={`Craft x${recipe.bulk}`}
                          >
                            x{recipe.bulk}
                          </AppButton>
                        ) : null}
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {recipe.costs.map((cost) => (
                        <RecipeCostChip
                          key={cost.id}
                          cost={cost}
                          owned={getCostOwned(cost, inventory, currency)}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : null}
      </GameInfoModal>

      <GameInfoModal
        open={!!selectedRecipe}
        onOpenChange={(open) => !open && setSelectedRecipe(null)}
        title={selectedRecipe?.name || ''}
        description={selectedRecipe?.description}
        category={
          selectedRecipe
            ? `Artisan · ${categoryLabels[selectedRecipe.category]}`
            : undefined
        }
        icon={
          selectedRecipe ? (
            <RecipeOutputIcon
              recipe={selectedRecipe}
              className="h-12 w-12 object-contain"
            />
          ) : null
        }
        properties={
          selectedRecipe
            ? [
                {
                  icon: <Hammer className="h-4 w-4" />,
                  label: 'Level',
                  value: selectedRecipe.artisanLevel,
                },
                {
                  icon: <Sparkles className="h-4 w-4" />,
                  label: 'Craft',
                  value: getCraftTypeLabel(selectedRecipe),
                },
                {
                  icon: <Target className="h-4 w-4" />,
                  label: 'Output',
                  value: formatOutputRange(selectedRecipe),
                },
              ]
            : undefined
        }
        criteria={
          selectedRequirements.length > 0 ? selectedRequirements : undefined
        }
        rewards={selectedRewards.length > 0 ? selectedRewards : undefined}
        actionButton={
          selectedRecipe ? (
            <div className="flex w-full items-center gap-2">
              <AppButton
                disabled={
                  !selectedState?.canCraft ||
                  loadingRecipe === selectedRecipe.id ||
                  completingCraft
                }
                aria-busy={
                  loadingRecipe === selectedRecipe.id || completingCraft
                }
                aria-label={
                  loadingRecipe === selectedRecipe.id
                    ? `Starting craft for ${selectedRecipe.name}`
                    : `Start craft for ${selectedRecipe.name}`
                }
                onClick={() => startCraft(selectedRecipe)}
                className="flex-1"
                variant={selectedState?.canCraft ? 'default' : 'outline'}
              >
                {loadingRecipe === selectedRecipe.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : selectedState?.canCraft ? (
                  'Start Craft'
                ) : (
                  selectedState?.lockReason || 'Locked'
                )}
              </AppButton>
              {selectedBulkVisible && selectedRecipe.bulk ? (
                <AppButton
                  disabled={
                    !selectedBulkState?.canCraft ||
                    loadingRecipe === selectedRecipe.id ||
                    completingCraft
                  }
                  onClick={() =>
                    startCraft(selectedRecipe, selectedRecipe.bulk)
                  }
                  className="h-10 min-w-10 shrink-0 px-3"
                  size="sm"
                  variant={
                    selectedBulkState?.canCraft ? 'secondary' : 'outline'
                  }
                  title={`Craft x${selectedRecipe.bulk}`}
                >
                  x{selectedRecipe.bulk}
                </AppButton>
              ) : null}
            </div>
          ) : null
        }
        background="/backgrounds/bike-shop.avif"
        presentation="drawer"
      >
        {selectedRecipe ? (
          <div className="space-y-4">
            <SectionDivider>Ingredients</SectionDivider>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {selectedRecipe.costs.map((cost) => {
                const owned = getCostOwned(cost, inventory, currency)
                const hasEnough = owned >= cost.amount
                return (
                  <div
                    key={cost.id}
                    className={cn(
                      'flex items-center gap-3 rounded-lg border bg-game-surface p-3',
                      hasEnough
                        ? 'border-game-border'
                        : 'border-game-danger/30 bg-game-danger/10',
                    )}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised">
                      {cost.type === 'currency' ? (
                        <Sparkles className="h-7 w-7 text-game-ochre" />
                      ) : (
                        <ItemSprite
                          itemId={cost.id}
                          alt={getItemName(cost.id)}
                          width={40}
                          height={40}
                          className="h-10 w-10 object-contain"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold text-game-ink">
                        {cost.type === 'currency'
                          ? getCurrencyName(cost.id)
                          : getItemName(cost.id)}
                      </div>
                      <div
                        className={cn(
                          'mt-1 text-[10px] font-black uppercase tracking-widest',
                          hasEnough
                            ? 'text-game-moss-strong'
                            : 'text-game-danger',
                        )}
                      >
                        Owned {owned} / Need {cost.amount}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : null}
      </GameInfoModal>
    </div>
  )
}
