'use client'

import {
  AlertCircle,
  BarChart,
  Check,
  CheckCircle,
  CircleDot,
  DoorOpen,
  Heart,
  HelpCircle,
  Loader2,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  Timer,
  Trophy,
  Users,
} from 'lucide-react'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { mapCriteriaToDisplayItem } from '@/components/game/shared/criteria-mapping'
import type { TaskProgressData } from '@/components/game/shared/GameInfoModal'
import { PokemonSelectionList } from '@/components/game/shared/PokemonSelectionList'
import { mapRewardToDisplayItem } from '@/components/game/shared/reward-mapping'
import { Button } from '@/components/ui/button'
import { ItemSprite } from '@/components/ui/item-sprite'
import { SectionDivider } from '@/components/ui/section-divider'
import type {
  FishingGameConfig,
  FishingItemEntry,
} from '@/data/games/fishing/types'
import { items } from '@/data/items'
import { calculateContentSkillXp, resolveSkillXpConfig } from '@/data/skills/xp'
import { cn } from '@/lib/utils'
import { TYPE_MATERIAL_CONFIG } from '@/utilities/artisan/material-drops'
import {
  getPokemonForm,
  getPokemonImageUrl,
  getPokemonSpecies,
} from '@/utilities/pokemon/pokedex'
import {
  checkRequirement,
  getRequirementProgress,
  type RequirementData,
} from '@/utilities/requirements'
import { canUseItemWithSkillRequirements } from '@/utilities/skills/unlocks'
import {
  getTaskProgress,
  isPokemonEligible,
} from '@/utilities/tasks/task-logic'
import {
  getExpeditionDisplayName,
  getTypeIcon,
  isChronicleExploreItem,
} from './utils'

// Types for props
interface ModalHelperProps {
  item: any
  userData: RequirementData
}

const rodLabels: Record<string, string> = {
  old: 'Old Rod',
  good: 'Good Rod',
  super: 'Super Rod',
}

function formatPercent(value: number) {
  return Number.isInteger(value) ? `${value}%` : `${Number(value.toFixed(2))}%`
}

function prizeRewardKey(reward: any) {
  return JSON.stringify({
    type: reward.type,
    targetId: reward.targetId,
    currencyType: reward.currencyType,
    quantity: reward.quantity,
    label: reward.label,
  })
}

const repelOptions = [
  { id: 'repel', label: 'Repel', detail: 'Chance Max Level Pokemon Appear' },
  {
    id: 'super-repel',
    label: 'Super Repel',
    detail: 'Max Level Pokemon Appear',
  },
  {
    id: 'max-repel',
    label: 'Max Repel',
    detail: 'Better Chance for Rare Pokemon',
  },
]

const pokemonMaterialFamilies = Array.from(
  new Set(Object.values(TYPE_MATERIAL_CONFIG).map((config) => config.family)),
)

const specialPokemonMaterialIds = new Set(
  Object.values(TYPE_MATERIAL_CONFIG).flatMap((config) =>
    Object.values(config.specialFormMaterials).map(
      (material) => material.materialId,
    ),
  ),
)

interface EncounterPreview {
  key: string
  formId: string
  requirements: any[]
  isLocked: boolean
  isSecret: boolean
  isCaught?: boolean
  isSeen?: boolean
}

function getEncounterFormId(encounter: {
  formId?: string
  speciesId?: number | string
}) {
  return encounter.formId || encounter.speciesId?.toString()
}

function isEncounterRequirementLocked(
  requirements: any[] | undefined,
  userData: RequirementData,
  category?: string,
  subCategory?: string,
) {
  return (
    !!requirements?.length &&
    !requirements.every((requirement) =>
      checkRequirement(userData, requirement, { category, subCategory }),
    )
  )
}

function hasSecretEncounterRequirement(encounter: {
  secret?: boolean
  requirements?: any[]
}) {
  return (
    !!encounter.secret ||
    !!encounter.requirements?.some((requirement) => requirement.secret)
  )
}

function formatLevelLabel(level: unknown): string | null {
  if (typeof level === 'number') return `LVL ${level}`
  if (
    level &&
    typeof level === 'object' &&
    'min' in level &&
    'max' in level &&
    typeof level.min === 'number' &&
    typeof level.max === 'number'
  ) {
    return level.min === level.max
      ? `LVL ${level.min}`
      : `LVL ${level.min}-${level.max}`
  }

  return null
}

function formatSeconds(value: unknown): string | null {
  if (typeof value === 'number') return `${value}s`
  if (
    value &&
    typeof value === 'object' &&
    'min' in value &&
    'max' in value &&
    typeof value.min === 'number' &&
    typeof value.max === 'number'
  ) {
    return value.min === value.max
      ? `${value.min}s`
      : `${value.min}-${value.max}s`
  }

  return null
}

function pokemonRewardSprite(
  formId: string | number | null | undefined,
  alt: string,
) {
  if (!formId) return null

  return (
    <div className="relative w-10 h-10">
      <Image
        src={getPokemonImageUrl(String(formId), 'sprite')}
        alt={alt}
        fill
        className="object-contain pixelated"
      />
    </div>
  )
}

function getAuthoredFishingItemRewards(rodConfig: any): FishingItemEntry[] {
  return rodConfig.items?.entries || []
}

function getSortedEndlessMilestones(settings: any) {
  const milestones = settings?.endless?.enabled
    ? settings.endless.milestones || []
    : []
  return [...milestones].sort(
    (a: any, b: any) => (a.score || 0) - (b.score || 0),
  )
}

function getSortedEndlessRepeatingRewards(settings: any) {
  const repeatingRewards = settings?.endless?.enabled
    ? settings.endless.repeatingRewards || []
    : []
  return [...repeatingRewards].sort(
    (a: any, b: any) => (a.everyScore || 0) - (b.everyScore || 0),
  )
}

function formatMilestoneRange(milestones: any[], repeatingRewards: any[] = []) {
  const scores = [
    ...milestones.map((milestone) => milestone.score),
    ...repeatingRewards.map((reward) => reward.everyScore),
  ]
    .filter(
      (score): score is number =>
        typeof score === 'number' && Number.isFinite(score),
    )
    .sort((a, b) => a - b)

  if (scores.length === 0) return null

  const firstScore = scores[0]
  const lastScore = scores[scores.length - 1]
  return firstScore === lastScore
    ? `${firstScore} pts`
    : `${firstScore}-${lastScore} pts`
}

function formatPointMilestoneSubLabel(score: unknown, subLabel?: string) {
  if (typeof score !== 'number' || !Number.isFinite(score)) {
    return subLabel
  }

  const milestoneLabel = `Score ${score}+ pts`
  return subLabel ? `${milestoneLabel} | ${subLabel}` : milestoneLabel
}

function formatRepeatingRewardSubLabel(everyScore: unknown, subLabel?: string) {
  if (typeof everyScore !== 'number' || !Number.isFinite(everyScore)) {
    return subLabel
  }

  const milestoneLabel = `Every ${everyScore} pts`
  return subLabel ? `${milestoneLabel} | ${subLabel}` : milestoneLabel
}

function formatEndlessRepeatingRewardSubLabel(entry: any, subLabel?: string) {
  if (entry?.random) return undefined
  return formatRepeatingRewardSubLabel(entry?.everyScore, subLabel)
}

function getRewardTargetId(reward: any): string {
  const targetId = reward?.targetId ?? reward?.itemId
  return targetId === undefined || targetId === null ? '' : String(targetId)
}

function getRewardSkillId(reward: any): string {
  const skillId = reward?.skill ?? reward?.targetId
  return skillId === undefined || skillId === null ? '' : String(skillId)
}

function getRewardItem(reward: any) {
  const targetId = getRewardTargetId(reward)
  if (!targetId) return undefined
  return items.find((item) => item.id === targetId)
}

function isPokemonMaterialReward(reward: any): boolean {
  const targetId = getRewardTargetId(reward)
  if (!targetId) return false
  if (specialPokemonMaterialIds.has(targetId)) return true

  return pokemonMaterialFamilies.some((family) =>
    new RegExp(`^${family}-t[1-3]$`).test(targetId),
  )
}

function isBrokenBallReward(reward: any): boolean {
  return /^broken-ball(?:-t[1-3])?$/.test(getRewardTargetId(reward))
}

function isGemReward(reward: any): boolean {
  return getRewardTargetId(reward).endsWith('-gem')
}

function isCandyReward(reward: any): boolean {
  return getRewardItem(reward)?.category === 'candy'
}

function isBerryReward(reward: any): boolean {
  return getRewardItem(reward)?.category === 'berry'
}

function shouldHideExploreRewardPreview(selectedItem: any, reward: any) {
  const isFieldObservation =
    selectedItem.type === 'research' &&
    selectedItem.originalData.gameType === 'field-observation'

  if (reward?.type === 'xp') {
    const skillId = getRewardSkillId(reward)
    if (selectedItem.type === 'location' && skillId === 'catching') return true
    if (selectedItem.type === 'battle' && skillId === 'battling') return true
    if (isFieldObservation && skillId === 'researching') return true
  }

  if (
    reward?.type === 'pokemon_research_xp' &&
    (selectedItem.type === 'battle' || isFieldObservation)
  ) {
    return true
  }

  if (reward?.type !== 'item') return false

  if (selectedItem.type === 'location') {
    return isPokemonMaterialReward(reward)
  }

  if (selectedItem.type === 'battle') {
    return (
      isGemReward(reward) || isCandyReward(reward) || isBrokenBallReward(reward)
    )
  }

  if (isFieldObservation) {
    return (
      isPokemonMaterialReward(reward) ||
      isBerryReward(reward) ||
      isBrokenBallReward(reward)
    )
  }

  return false
}

function getGeneratedSkillXpRewardPreview(selectedItem: any) {
  const skillXp = selectedItem.originalData.skillXp
  if (!skillXp || selectedItem.originalData.gameType === 'field-observation')
    return null

  const xpConfig = resolveSkillXpConfig(
    'researching',
    skillXp.level || 1,
    skillXp,
  )
  return mapRewardToDisplayItem({
    type: 'xp',
    skill: xpConfig.skill,
    quantity: calculateContentSkillXp(xpConfig.skill, xpConfig.level),
    dropChance: 100,
  })
}

export function getFormattedProperties(selectedItem: any) {
  if (!selectedItem) return undefined
  const props = []
  if (selectedItem.type === 'location') {
    const loc = selectedItem.originalData
    if (loc.timer) {
      props.push({
        icon: <Timer className="w-4 h-4" />,
        label: 'Time Limit',
        value: `${loc.timer}s`,
      })
    }
    if (loc.shinyChanceModifier) {
      props.push({
        icon: <Sparkles className="w-4 h-4" />,
        label: 'Shiny Chance',
        value: `${loc.shinyChanceModifier}x`,
      })
    }
    if (loc.levelRange) {
      props.push({
        icon: <BarChart className="w-4 h-4" />,
        label: 'Levels',
        value: `${loc.levelRange.min}-${loc.levelRange.max}`,
      })
    }
  } else if (
    selectedItem.type === 'battle' ||
    selectedItem.type === 'vs-seeker'
  ) {
    const bat = selectedItem.originalData
    if (bat.settings?.timeLimit) {
      props.push({
        icon: <Timer className="w-4 h-4" />,
        label: 'Time Limit',
        value: `${bat.settings.timeLimit}s`,
      })
    }
    if (bat.maxPokemon) {
      props.push({
        icon: <Users className="w-4 h-4" />,
        label: 'Max Pokemon',
        value: bat.maxPokemon,
      })
    }
    if (bat.levelCap) {
      props.push({
        icon: <BarChart className="w-4 h-4" />,
        label: 'Level Cap',
        value: bat.levelCap,
      })
    }
  } else if (selectedItem.type === 'research') {
    const res = selectedItem.originalData
    const milestones = getSortedEndlessMilestones(res.settings)
    const repeatingRewards = getSortedEndlessRepeatingRewards(res.settings)
    const milestoneRange = formatMilestoneRange(
      milestones,
      repeatingRewards.filter((reward: any) => !reward.random),
    )

    const timeLimit = formatSeconds(res.settings?.timeLimit)
    if (timeLimit) {
      props.push({
        icon: <Timer className="w-4 h-4" />,
        label: 'Time Limit',
        value: timeLimit,
      })
    }
    const answerTimeLimit = formatSeconds(res.settings?.answerTimeLimit)
    if (answerTimeLimit) {
      props.push({
        icon: <Timer className="w-4 h-4" />,
        label: 'Answer Time',
        value: answerTimeLimit,
      })
    }
    if (milestoneRange) {
      props.push({
        icon: <Trophy className="w-4 h-4" />,
        label: 'Score Rewards',
        value: milestoneRange,
        title: 'Rewards unlock at score milestones',
      })
    }
  } else if (selectedItem.type === 'voyage') {
    const voy = selectedItem.originalData
    if (voy.maxPokemon) {
      props.push({
        icon: <Users className="w-4 h-4" />,
        label: 'Max Pokemon',
        value: voy.maxPokemon,
      })
    }
    if (voy.durationMinutes) {
      props.push({
        icon: <Timer className="w-4 h-4" />,
        label: 'Duration',
        value: `${voy.durationMinutes}m`,
      })
    }
  } else if (selectedItem.type === 'expedition') {
    const expedition = selectedItem.originalData
    const activeRun =
      selectedItem.activeExpeditionRun || (selectedItem as any).activeExpedition
    const maxLives = expedition?.maxLosses ?? 0
    const mapItemName = expedition?.mapItemId
      ? items.find((item) => item.id === expedition.mapItemId)?.name ||
        expedition.mapItemId
      : undefined

    if (expedition?.mapItemId) {
      props.push({
        icon: (
          <ItemSprite
            itemId={expedition.mapItemId}
            alt="Map"
            width={16}
            height={16}
          />
        ),
        label: 'Map Item',
        value: mapItemName,
      })
    }

    if (expedition?.maxLosses !== undefined) {
      props.push({
        icon: <Heart className="w-4 h-4" />,
        label: 'Max Lives',
        value: maxLives,
      })
    }

    if (activeRun) {
      const activeMaxLives = activeRun.maxLosses || maxLives
      const livesLeft = Math.max(0, activeMaxLives - (activeRun.losses || 0))

      props.push({
        icon: <BarChart className="w-4 h-4" />,
        label: 'Progress',
        value: `${Math.min((activeRun.currentStepIndex || 0) + 1, activeRun.totalSteps || 1)}/${activeRun.totalSteps || 1}`,
      })
      props.push({
        icon: <Heart className="w-4 h-4" />,
        label: 'Lives',
        value: `${livesLeft}/${activeMaxLives}`,
      })
    }
  }
  return props.length > 0 ? props : undefined
}

export function getFormattedStats(
  selectedItem: any,
  userData: RequirementData,
) {
  if (!selectedItem) return undefined
  const stats = []

  if (selectedItem.type === 'battle') {
    const battleRes = (userData as any).battleResults?.find(
      (r: any) => r.battleId === selectedItem.id,
    )
    if (battleRes) {
      stats.push({
        label: 'Wins',
        value: battleRes.wins || 0,
        icon: <ThumbsUp />,
      })
      stats.push({
        label: 'Losses',
        value: battleRes.losses || 0,
        icon: <ThumbsDown />,
      })
    }
  } else if (selectedItem.type === 'research') {
    const researchRes = (userData as any).researchEncounterResults?.find(
      (r: any) => r.encounterId === selectedItem.id,
    )
    if (researchRes) {
      stats.push({
        label: 'Success',
        value: researchRes.wins || 0,
        icon: <ThumbsUp />,
      })
      stats.push({
        label: 'Fail',
        value: researchRes.losses || 0,
        icon: <ThumbsDown />,
      })
      if (researchRes.highScore) {
        stats.push({
          label: 'High Score',
          value: researchRes.highScore,
          icon: <Trophy />,
        })
      }
    }
  } else if (selectedItem.type === 'location') {
    const locRes = (userData as any).locationEncounterResults?.find(
      (r: any) => r.locationId === selectedItem.id,
    )
    if (locRes) {
      stats.push({
        label: 'Caught',
        value: locRes.wins || 0,
        icon: <CircleDot />,
      })
      stats.push({
        label: 'Ran Away',
        value: locRes.losses || 0,
        icon: <DoorOpen />,
      })
    }
  } else if (selectedItem.type === 'expedition') {
    const expeditionRes = (userData as any).expeditionResults?.find(
      (r: any) => r.expeditionId === selectedItem.id,
    )
    if (expeditionRes) {
      stats.push({
        label: 'Success',
        value: expeditionRes.wins || 0,
        icon: <ThumbsUp />,
      })
      stats.push({
        label: 'Fail',
        value: expeditionRes.losses || 0,
        icon: <ThumbsDown />,
      })
    }
  }
  return stats.length > 0 ? stats : undefined
}

export function getFormattedRewards(
  selectedItem: any,
  userData: RequirementData,
  completedTasks: any[],
) {
  if (!selectedItem?.originalData) return undefined

  if (selectedItem.type === 'task') {
    const task = selectedItem.originalData
    const { isCompleted } = getTaskProgress(userData, task)
    const existingCompletion = completedTasks.find(
      (t: any) => t.taskId === task.id,
    )
    const isDone = !!existingCompletion

    // For Daily tasks, isCompleted represents if it's done for the current day.
    // For normal tasks, isDone represents if it's ever been done.
    if (
      (task.daily && isCompleted) ||
      (!task.daily && isDone && !task.repeatable)
    ) {
      return []
    }
  }

  const milestones = getSortedEndlessMilestones(
    (selectedItem.originalData as any).settings,
  )
  const repeatingRewards = getSortedEndlessRepeatingRewards(
    (selectedItem.originalData as any).settings,
  )
  const isEndlessMode = milestones.length > 0 || repeatingRewards.length > 0
  const userInventory = (userData as any).inventory
    ? (userData as any).inventory.reduce(
        (acc: Record<string, number>, item: any) => {
          acc[item.itemId] = item.quantity
          return acc
        },
        {},
      )
    : {}

  const rewardItems =
    selectedItem.originalData.rewards
      ?.filter((r: any) => !shouldHideExploreRewardPreview(selectedItem, r))
      ?.map((r: any) =>
        mapRewardToDisplayItem(r, {
          completedTasks: completedTasks.map((t) => t.taskId),
          checkRequirements: (reqs: any) =>
            !reqs ||
            reqs.length === 0 ||
            reqs.every((req: any) =>
              checkRequirement(userData, req, {
                category: selectedItem.category,
                subCategory: selectedItem.subCategory,
              }),
            ),
          userInventory,
          user: userData.user,
        }),
      )
      .filter((r: any) => r !== null) || []

  if (isEndlessMode && repeatingRewards.length > 0) {
    repeatingRewards.forEach((entry: any) => {
      entry.rewards?.forEach((reward: any) => {
        const mappedReward = mapRewardToDisplayItem(reward, {
          completedTasks: completedTasks.map((t) => t.taskId),
          checkRequirements: (reqs: any) =>
            !reqs ||
            reqs.length === 0 ||
            reqs.every((req: any) =>
              checkRequirement(userData, req, {
                category: selectedItem.category,
                subCategory: selectedItem.subCategory,
              }),
            ),
          userInventory,
          user: userData.user,
        })
        if (mappedReward) {
          rewardItems.push({
            ...mappedReward,
            subLabel: formatEndlessRepeatingRewardSubLabel(
              entry,
              mappedReward.subLabel,
            ),
          })
        }
      })
    })
  }

  if (isEndlessMode && milestones.length > 0) {
    milestones.forEach((milestone: any) => {
      milestone.rewards?.forEach((reward: any) => {
        const mappedReward = mapRewardToDisplayItem(reward, {
          completedTasks: completedTasks.map((t) => t.taskId),
          checkRequirements: (reqs: any) =>
            !reqs ||
            reqs.length === 0 ||
            reqs.every((req: any) =>
              checkRequirement(userData, req, {
                category: selectedItem.category,
                subCategory: selectedItem.subCategory,
              }),
            ),
          userInventory,
          user: userData.user,
        })
        if (mappedReward) {
          rewardItems.push({
            ...mappedReward,
            subLabel: formatPointMilestoneSubLabel(
              milestone.score,
              mappedReward.subLabel,
            ),
          })
        }
      })
    })
  }

  if (selectedItem.type === 'research') {
    const generatedSkillXpReward =
      getGeneratedSkillXpRewardPreview(selectedItem)
    if (generatedSkillXpReward) {
      rewardItems.push({
        ...generatedSkillXpReward,
        subLabel: isEndlessMode
          ? 'Score milestone reached'
          : 'Completion reward',
      })
    }
  }

  if (
    selectedItem.type === 'research' &&
    selectedItem.originalData.gameType === 'field-observation'
  ) {
    const fieldObservationItemDrops =
      selectedItem.originalData.settings?.itemDrops || []
    fieldObservationItemDrops.forEach((drop: any) => {
      const reward = {
        type: 'item',
        targetId: drop.itemId,
        quantity: drop.quantity || 1,
        dropChance: drop.dropChance,
        secret: drop.secret,
        requirements: drop.requirements,
      }

      if (shouldHideExploreRewardPreview(selectedItem, reward)) return

      const mappedReward = mapRewardToDisplayItem(reward, {
        completedTasks: completedTasks.map((t) => t.taskId),
        checkRequirements: (reqs: any) =>
          !reqs ||
          reqs.length === 0 ||
          reqs.every((req: any) =>
            checkRequirement(userData, req, {
              category: selectedItem.category,
              subCategory: selectedItem.subCategory,
            }),
          ),
        userInventory,
        user: userData.user,
      })

      if (mappedReward) {
        rewardItems.push({
          ...mappedReward,
          subLabel: drop.secret ? 'Secret Reward' : `${drop.dropChance}%`,
        })
      }
    })
  }

  if (
    selectedItem.type === 'research' &&
    selectedItem.originalData.gameType === 'prize-wheel'
  ) {
    const prizeChances = new Map<string, { reward: any; percentage: number }>()

    for (const slot of selectedItem.originalData.settings?.slots || []) {
      for (const reward of slot.rewards || []) {
        const key = prizeRewardKey(reward)
        const existing = prizeChances.get(key)
        prizeChances.set(key, {
          reward,
          percentage: (existing?.percentage || 0) + (slot.percentage || 0),
        })
      }
    }

    for (const { reward, percentage } of prizeChances.values()) {
      const mappedReward = mapRewardToDisplayItem(
        {
          ...reward,
          dropChance: undefined,
        },
        {
          completedTasks: completedTasks.map((t) => t.taskId),
          checkRequirements: (reqs: any) =>
            !reqs ||
            reqs.length === 0 ||
            reqs.every((req: any) =>
              checkRequirement(userData, req, {
                category: selectedItem.category,
                subCategory: selectedItem.subCategory,
              }),
            ),
          userInventory,
          user: userData.user,
        },
      )

      if (mappedReward) {
        rewardItems.push({
          ...mappedReward,
          subLabel: `${formatPercent(percentage)} Prize Chance`,
        })
      }
    }
  }

  if (
    selectedItem.type === 'research' &&
    selectedItem.originalData.gameType === 'fishing'
  ) {
    const fishingGame = selectedItem.originalData as FishingGameConfig

    for (const [rodType, rodConfig] of Object.entries(
      fishingGame.settings.rods,
    )) {
      if (!rodConfig) continue

      const itemPool = getAuthoredFishingItemRewards(rodConfig)
      let secretRewardAdded = false

      for (const entry of itemPool) {
        const item = items.find((candidate) => candidate.id === entry.itemId)
        const isUnclaimedUnique =
          !!item?.unique && (userInventory[item.id] || 0) <= 0

        if (entry.secret) {
          if (!isUnclaimedUnique) continue
          if (secretRewardAdded) continue
          secretRewardAdded = true
          rewardItems.push({
            icon: <HelpCircle className="h-8 w-8 text-game-muted" />,
            label: '???',
            subLabel: `${rodLabels[rodType] || rodType} Secret Reward`,
          })
          continue
        }

        if (!isUnclaimedUnique) continue

        rewardItems.push({
          icon: (
            <ItemSprite
              itemId={entry.itemId}
              alt={item?.name || 'Item'}
              width={32}
              height={32}
              className="w-10 h-10 object-contain"
            />
          ),
          label: item?.name || entry.itemId,
          subLabel: `${rodLabels[rodType] || rodType} Item Drop`,
        })
      }
    }
  }

  return rewardItems
}

export function getTaskProgressForModal(
  selectedItem: any,
  userData: RequirementData,
): TaskProgressData | undefined {
  if (selectedItem?.type !== 'task') return undefined

  // Identify generated daily tasks
  const isGeneratedDaily = (userData.user as any).activeDailyTasks?.some(
    (t: any) => t.id === selectedItem.id,
  )

  if (!isGeneratedDaily) return undefined

  const { criteriaProgress } = getTaskProgress(
    userData,
    selectedItem.originalData,
  )

  if (criteriaProgress.length === 0) return undefined

  // Map the first criteria to the progress bar
  const mainCrit = criteriaProgress[0]
  const mapped = mapCriteriaToDisplayItem(mainCrit, {
    category: selectedItem.category,
    subCategory: selectedItem.subCategory,
  })

  return {
    current: mainCrit.current || 0,
    max: mainCrit.count || 1,
    label: (mapped.label as string) || 'Task Progress',
  }
}

export function ActionButton({
  item,
  userData,
  loadingId,
  handleAction,
  handleCompleteVoyage,
  handleClaimExpeditionRewards,
  selectedActiveVoyage,
  isSelectedVoyageFinished,
  selectedActiveExpedition,
  completingTaskId,
}: any) {
  if (!item?.originalData) return null

  if (item.type === 'task') {
    const task = item.originalData
    const { isCompleted, criteriaMet } = getTaskProgress(userData, task)
    const requirementsMet =
      !task.requirements ||
      task.requirements.length === 0 ||
      task.requirements.every((requirement: any) =>
        checkRequirement(userData, requirement, {
          category: task.category,
          subCategory: task.subCategory,
        }),
      )
    const existingCompletion = (userData.completedTasks || []).find(
      (t: any) => t.taskId === task.id,
    )
    const isDone = !!existingCompletion

    let canComplete = false
    if (task.category === 'Daily') {
      canComplete = requirementsMet && criteriaMet && !isCompleted
    } else if (task.repeatable) {
      canComplete = requirementsMet && criteriaMet
    } else {
      canComplete = requirementsMet && criteriaMet && !isDone
    }

    if (task.completionTrigger === 'auto') canComplete = false

    const consumePokemonCriteria = task.criteria?.filter(
      (c: any) => c.type === 'pokemon_owned' && c.consume,
    )
    const needsSelection =
      consumePokemonCriteria && consumePokemonCriteria.length > 0
    const totalRequired = consumePokemonCriteria?.reduce(
      (sum: number, c: any) => sum + (c.count || 1),
      0,
    )

    if (!canComplete) return null

    if (needsSelection) {
      const isSelectionComplete =
        (item.selectedPokemonIds?.length || 0) === totalRequired
      return (
        <Button
          onClick={() =>
            item.handleConfirmTaskWithSelection(task, totalRequired)
          }
          disabled={!isSelectionComplete || completingTaskId === task.id}
          aria-busy={completingTaskId === task.id}
          aria-label={`Confirm selection for ${task.title || task.name || 'task'} (${item.selectedPokemonIds?.length || 0} of ${totalRequired})`}
          className="min-h-11 w-full border border-game-clay bg-game-clay text-game-cream hover:bg-game-clay/90"
        >
          {completingTaskId === task.id ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-game-cream" />
          ) : (
            <Check className="mr-2 h-4 w-4 text-game-cream" />
          )}
          Confirm Selection ({item.selectedPokemonIds?.length || 0} /{' '}
          {totalRequired})
        </Button>
      )
    }

    return (
      <Button
        onClick={() => handleAction(item)}
        disabled={completingTaskId === task.id}
        aria-busy={completingTaskId === task.id}
        aria-label={task.completeButtonText || 'Complete task'}
        className="min-h-11 w-full border border-game-clay bg-game-clay text-game-cream hover:bg-game-clay/90 [&_svg]:!text-game-cream"
      >
        {completingTaskId === task.id ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin text-game-cream" />
        ) : (
          <Check className="mr-2 h-4 w-4 text-game-cream" />
        )}
        {task.completeButtonText || 'Complete Task'}
      </Button>
    )
  }

  const criteriaMet =
    !item.criteria ||
    item.criteria.length === 0 ||
    item.criteria.every((c: any) =>
      checkRequirement(userData, c, {
        category: item.category,
        subCategory: item.subCategory,
      }),
    )

  if (item.type === 'voyage') {
    if (selectedActiveVoyage) {
      if (isSelectedVoyageFinished) {
        return (
          <Button
            onClick={() => handleCompleteVoyage(item.id)}
            disabled={loadingId === item.id}
            aria-busy={loadingId === item.id}
            aria-label={`Check results for ${item.name || 'voyage'}`}
            className="min-h-11 w-full bg-game-clay text-game-cream hover:bg-game-clay/90"
          >
            {loadingId === item.id ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4 mr-2" />
            )}
            Check Results
          </Button>
        )
      }
      return (
        <div className="flex w-full items-center justify-center gap-2 rounded border border-game-moss/35 bg-game-moss/10 p-2 font-mono text-game-moss-strong">
          {/* VoyageCountdown component is not imported here, assumes rendered elsewhere or simple text */}
          <span>Voyage in Progress</span>
        </div>
      )
    }
    return (
      <Button
        onClick={() => handleAction(item)}
        disabled={loadingId === item.id || !criteriaMet}
        aria-busy={loadingId === item.id}
        aria-label={`Begin ${item.name || 'voyage'}`}
        className="min-h-11 w-full border border-game-clay bg-game-clay text-game-cream hover:bg-game-clay/90"
      >
        Begin Voyage
      </Button>
    )
  }

  if (item.type === 'expedition') {
    const activeExpedition =
      selectedActiveExpedition || (userData as any).activeExpedition
    const expeditionLabel = getExpeditionDisplayName(item)
    const hasOtherExpedition =
      activeExpedition &&
      activeExpedition.expeditionId !== item.id &&
      (activeExpedition.status === 'active' ||
        activeExpedition.status === 'ready_to_claim')

    if (activeExpedition && activeExpedition.expeditionId === item.id) {
      if (activeExpedition.status === 'ready_to_claim') {
        return (
          <Button
            onClick={() => handleClaimExpeditionRewards(item.id)}
            disabled={loadingId === item.id}
            aria-busy={loadingId === item.id}
            aria-label={`Claim ${expeditionLabel} rewards`}
            className="min-h-11 w-full bg-game-clay text-game-cream hover:bg-game-clay/90"
          >
            {loadingId === item.id ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4 mr-2" />
            )}
            Claim {expeditionLabel} Rewards
          </Button>
        )
      }

      const currentStep =
        activeExpedition.steps?.[activeExpedition.currentStepIndex]
      const currentStepType = currentStep?.type || 'activity'

      return (
        <Button
          onClick={() => handleAction(item)}
          disabled={
            loadingId === item.id ||
            currentStepType === 'branch_choice' ||
            currentStepType === 'result_branch'
          }
          aria-busy={loadingId === item.id}
          aria-label={`Continue ${expeditionLabel}`}
          className="min-h-11 w-full border border-game-clay bg-game-clay text-game-cream hover:bg-game-clay/90"
        >
          {loadingId === item.id ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-game-cream" />
          ) : (
            <Check className="mr-2 h-4 w-4 text-game-cream" />
          )}
          Continue {expeditionLabel}
        </Button>
      )
    }

    return (
      <Button
        onClick={() => handleAction(item)}
        disabled={loadingId === item.id || !criteriaMet || hasOtherExpedition}
        aria-busy={loadingId === item.id}
        aria-label={
          hasOtherExpedition
            ? `Another ${expeditionLabel} is active`
            : `Begin ${expeditionLabel}`
        }
        className="min-h-11 w-full border border-game-clay bg-game-clay text-game-cream hover:bg-game-clay/90"
      >
        {loadingId === item.id && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin text-game-cream" />
        )}
        {!loadingId && (
          <Check className="mr-2 h-4 w-4 text-game-cream" />
        )}
        {hasOtherExpedition
          ? `Another ${expeditionLabel} Is Active`
          : (item.originalData as any)?.buttonText ||
            `Begin ${expeditionLabel}`}
      </Button>
    )
  }

  const isBoxFull = userData.pokemon.length >= (userData.user.maxPokemon || 50)
  const isEncounterType = item.type === 'location' || item.type === 'research'
  const isDisabled =
    loadingId === item.id || !criteriaMet || (isBoxFull && isEncounterType)

  const consumePokemonCriteria = item.originalData.criteria?.filter(
    (c: any) => c.type === 'pokemon_owned' && c.consume,
  )
  const needsSelection =
    consumePokemonCriteria && consumePokemonCriteria.length > 0
  const totalRequired = consumePokemonCriteria?.reduce(
    (sum: number, c: any) => sum + (c.count || 1),
    0,
  )

  if (needsSelection) {
    const isSelectionComplete =
      (item.selectedPokemonIds?.length || 0) === totalRequired
    return (
      <Button
        onClick={() =>
          item.handleConfirmEncounterWithSelection(
            {
              ...item.originalData,
              selectedRepelItemId: item.selectedRepelItemId,
            },
            totalRequired,
            item.type,
          )
        }
        disabled={!isSelectionComplete || loadingId === item.id}
        className="w-full border border-game-clay bg-game-clay text-game-cream hover:bg-game-clay/90"
      >
        {loadingId === item.id ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin text-game-cream" />
        ) : (
          getTypeIcon(item)
        )}
        Confirm & Start ({item.selectedPokemonIds?.length || 0} /{' '}
        {totalRequired})
      </Button>
    )
  }

  return (
    <Button
      onClick={() => handleAction(item)}
      disabled={isDisabled}
      className="w-full border border-game-clay bg-game-clay text-game-cream hover:bg-game-clay/90 [&_svg]:!text-game-cream"
    >
      {loadingId === item.id && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin text-game-cream" />
      )}
      {!loadingId && getTypeIcon(item)}
      <span className="ml-2">
        {isBoxFull && isEncounterType
          ? 'Box Full'
          : item.type === 'shop'
            ? 'Visit Shop'
            : item.type === 'battle'
              ? 'Start Battle'
              : item.type === 'location'
                ? 'Explore'
                : item.type === 'research'
                  ? item.originalData?.gameType === 'field-observation'
                    ? 'Study'
                    : 'Start Game'
                  : 'Start'}
      </span>
    </Button>
  )
}

export function ExploreModalContent({ item, userData }: ModalHelperProps) {
  const pokedexByFormId = useMemo(
    () =>
      new Map(
        (userData.pokedex || []).map((entry: any) => [entry.formId, entry]),
      ),
    [userData.pokedex],
  )
  const inventoryByItemId = useMemo(
    () =>
      new Map(
        (
          ((userData as any).inventory || []) as {
            itemId: string
            quantity: number
          }[]
        ).map((entry) => [entry.itemId, entry.quantity]),
      ),
    [userData],
  )
  const [expandedLockedEncounterKey, setExpandedLockedEncounterKey] = useState<
    string | null
  >(null)

  if (!item) return null

  if (item.type === 'expedition') {
    const activeRun =
      item.activeExpeditionRun || (userData as any).activeExpedition
    const steps = activeRun?.steps || []
    const expeditionLabel = getExpeditionDisplayName(item)
    const expeditionLabelLower = expeditionLabel.toLowerCase()

    return (
      <div className="space-y-4 mt-6">
        <SectionDivider>
          {isChronicleExploreItem(item) ? 'Chronicle Path' : 'Expedition Path'}
        </SectionDivider>

        {steps.length === 0 ? (
          <div className="rounded-xl border border-dashed border-game-border bg-game-surface-raised p-4 text-sm text-game-muted">
            Path will be generated when the {expeditionLabelLower} starts.
          </div>
        ) : (
          <div className="space-y-2">
            {steps.map((step: any, index: number) => {
              const isCurrent =
                activeRun?.status === 'active' &&
                index === activeRun.currentStepIndex
              const isDone = step.status === 'completed'

              return (
                <div
                  key={`${step.stepId}-${index}`}
                  className={cn(
                    'rounded-xl border px-3 py-2 flex items-center justify-between',
                    isDone
                      ? 'border-game-moss/40 bg-game-moss/10'
                      : isCurrent
                        ? 'border-game-ochre/40 bg-game-ochre/10'
                        : 'border-game-border bg-game-surface-raised',
                  )}
                >
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider text-game-muted">
                      {step.activityType || 'activity'}
                    </div>
                    <div className="truncate font-semibold text-game-ink">
                      {step.activityName}
                    </div>
                  </div>

                  {isDone ? (
                    <CheckCircle className="h-4 w-4 shrink-0 text-game-moss" />
                  ) : isCurrent ? (
                    <CircleDot className="w-4 h-4 text-game-ochre shrink-0" />
                  ) : (
                    <HelpCircle className="h-4 w-4 shrink-0 text-game-muted" />
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  if (item.type === 'research' && item.originalData.gameType === 'fishing') {
    const fishingGame = item.originalData as FishingGameConfig
    const rodEntries = Object.entries(fishingGame.settings.rods).filter(
      ([, rodConfig]) => Boolean(rodConfig?.encounters?.entries?.length),
    )
    if (rodEntries.length === 0) return null

    return (
      <div className="space-y-6 mt-6">
        {rodEntries.map(([rodType, rodConfig]) => (
          <div key={rodType} className="space-y-4">
            <SectionDivider>{rodLabels[rodType] || rodType}</SectionDivider>
            <div className="flex gap-3 overflow-x-auto pb-6 pt-2 custom-scrollbar px-1">
              {rodConfig!.encounters.entries.map((enc: any, i: number) => {
                const formId = getEncounterFormId(enc)
                if (!formId) return null

                const pokedexEntry = pokedexByFormId.get(formId)
                const isCaught = pokedexEntry?.caught
                const isSeen = pokedexEntry?.seen
                const timeLabel = enc.time ? enc.time.toUpperCase() : null
                const levelLabel = rodConfig!.levelRange
                  ? `LVL ${rodConfig!.levelRange.min}-${rodConfig!.levelRange.max}`
                  : null

                return (
                  <div
                    key={`${rodType}-${formId}-${i}`}
                    className={cn(
                      'group relative flex min-w-[100px] flex-shrink-0 flex-col items-center rounded-lg border p-3 transition-colors',
                      isCaught
                        ? 'border-game-moss/50 bg-game-moss/10'
                        : isSeen
                          ? 'border-game-border bg-game-surface-raised grayscale-[0.35]'
                          : 'border-game-border/70 bg-game-canvas opacity-80',
                    )}
                  >
                    <div
                      className={cn(
                        'absolute -right-1.5 -top-1.5 z-20 flex h-5 w-5 items-center justify-center rounded-full border',
                        isCaught
                          ? 'border-game-moss bg-game-moss text-game-cream'
                          : isSeen
                            ? 'border-game-border bg-game-surface-raised text-game-muted'
                            : 'border-game-border bg-game-canvas text-game-muted',
                      )}
                    >
                      {isCaught ? (
                        <Check className="w-3 h-3 font-black" />
                      ) : (
                        <HelpCircle className="w-3 h-3" />
                      )}
                    </div>

                    <div className="relative mb-1 flex h-16 w-16 items-center justify-center">
                      {isCaught || isSeen ? (
                        <Image
                          src={getPokemonImageUrl(formId, 'sprite')}
                          alt={'Pokemon'}
                          width={64}
                          height={64}
                          className={cn(
                            'w-16 h-16 object-contain pixelated relative z-10',
                            !isCaught && 'opacity-50 grayscale contrast-125',
                          )}
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-game-border bg-game-canvas">
                          <span className="text-xl font-black text-game-muted">
                            ?
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="w-full text-center flex flex-col gap-0.5">
                      <span
                        className={cn(
                          'text-[10px] font-black uppercase tracking-[0.08em] transition-colors',
                          isCaught
                            ? 'text-game-moss-strong'
                            : 'text-game-muted',
                        )}
                      >
                        {isCaught
                          ? 'Captured'
                          : isSeen
                            ? 'Discovered'
                            : 'Unknown'}
                      </span>
                      {(levelLabel || timeLabel) && (
                        <span className="font-mono text-[10px] font-bold text-game-muted">
                          {[levelLabel, timeLabel].filter(Boolean).join(' · ')}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Show potential Pokemon for locations
  if (item.type === 'location' && item.originalData.encounters) {
    const encounters = item.originalData.encounters
    if (!encounters || encounters.length === 0) return null

    const availableRepels = repelOptions
      .map((repel) => {
        const itemDef = items.find((entry) => entry.id === repel.id)
        return {
          ...repel,
          itemDef,
          quantity: inventoryByItemId.get(repel.id) || 0,
        }
      })
      .filter(
        (repel) =>
          repel.quantity > 0 &&
          !!repel.itemDef &&
          canUseItemWithSkillRequirements(
            repel.itemDef,
            (userData.user as any).skills,
          ),
      )
    const encounterPreviews: EncounterPreview[] = encounters
      .map((enc: any, index: number) => {
        const formId = getEncounterFormId(enc)
        if (!formId) return null

        const requirements = enc.requirements || []
        const isLocked = isEncounterRequirementLocked(
          requirements,
          userData,
          item.category,
          item.subCategory,
        )
        const isSecret = isLocked && hasSecretEncounterRequirement(enc)
        const pokedexEntry = pokedexByFormId.get(formId)
        const isCaught = !isLocked && pokedexEntry?.caught
        const isSeen = !isLocked && pokedexEntry?.seen

        return {
          key: `${formId}-${index}`,
          formId,
          requirements,
          isLocked,
          isSecret,
          isCaught,
          isSeen,
        }
      })
      .filter(
        (preview: EncounterPreview | null): preview is EncounterPreview =>
          preview !== null,
      )
    const selectedLockedEncounter = encounterPreviews.find(
      (preview: EncounterPreview) =>
        preview.key === expandedLockedEncounterKey && preview.isLocked,
    )
    const selectedLockedRequirements =
      selectedLockedEncounter && !selectedLockedEncounter.isSecret
        ? selectedLockedEncounter.requirements.map((requirement: any) => {
            const progress = getRequirementProgress(userData, requirement, {
              category: item.category,
              subCategory: item.subCategory,
            })

            return {
              ...mapCriteriaToDisplayItem(requirement, {
                category: item.category,
                subCategory: item.subCategory,
              }),
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

    return (
      <div className="space-y-6 mt-6">
        {availableRepels.length > 0 && (
          <div className="space-y-3">
            <SectionDivider>Encounter Item</SectionDivider>
            <div className="grid grid-cols-1 gap-3">
              {availableRepels.map((repel) => {
                const isSelected = item.selectedRepelItemId === repel.id

                return (
                  <button
                    key={repel.id}
                    type="button"
                    onClick={() =>
                      item.setSelectedRepelItemId(isSelected ? null : repel.id)
                    }
                    aria-pressed={isSelected}
                    className={cn(
                      'h-full min-h-[92px] rounded-lg border bg-game-surface-raised p-3 text-left text-game-ink transition-colors hover:border-game-moss',
                      isSelected
                        ? 'border-game-moss bg-game-moss/10'
                        : 'border-game-border',
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <ItemSprite
                        itemId={repel.id}
                        alt={repel.label}
                        width={36}
                        height={36}
                        className="w-9 h-9 object-contain shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-bold truncate">
                            {repel.label}
                          </span>
                          <span className="font-mono text-xs text-game-muted">
                            x{repel.quantity}
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-game-muted">
                          {repel.detail}
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <SectionDivider>Inhabitants</SectionDivider>
          <div className="flex gap-3 overflow-x-auto pb-6 pt-2 custom-scrollbar px-1">
            {encounterPreviews.map((encounter: EncounterPreview) => {
              const canShowRequirements =
                encounter.isLocked && !encounter.isSecret
              const isExpanded = expandedLockedEncounterKey === encounter.key

              return (
                <button
                  key={encounter.key}
                  type="button"
                  disabled={!encounter.isLocked}
                  aria-label={
                    encounter.isLocked
                      ? `${isExpanded ? 'Hide' : 'Show'} requirements for ${encounter.formId || 'unknown Pokémon'}`
                      : `${encounter.isCaught ? 'Captured' : encounter.isSeen ? 'Discovered' : 'Unknown'} ${encounter.formId || 'Pokémon'}`
                  }
                  aria-expanded={encounter.isLocked ? isExpanded : undefined}
                  onClick={() => {
                    if (!encounter.isLocked) return
                    setExpandedLockedEncounterKey(
                      isExpanded ? null : encounter.key,
                    )
                  }}
                  className={cn(
                    'group relative flex min-w-[100px] flex-shrink-0 flex-col items-center rounded-lg border p-3 text-center transition-colors disabled:cursor-default',
                    encounter.isLocked
                      ? 'border-game-clay/45 bg-game-clay/10 hover:border-game-clay'
                      : encounter.isCaught
                        ? 'border-game-moss/50 bg-game-moss/10'
                        : encounter.isSeen
                          ? 'border-game-border bg-game-surface-raised grayscale-[0.35]'
                          : 'border-game-border/70 bg-game-canvas opacity-80',
                  )}
                >
                  {/* Status Indicator */}
                  <div
                    className={cn(
                      'absolute -right-1.5 -top-1.5 z-20 flex h-5 w-5 items-center justify-center rounded-full border',
                      encounter.isLocked
                        ? 'border-game-danger bg-game-danger text-game-cream'
                        : encounter.isCaught
                          ? 'border-game-moss bg-game-moss text-game-cream'
                          : encounter.isSeen
                            ? 'border-game-border bg-game-surface-raised text-game-muted'
                            : 'border-game-border bg-game-canvas text-game-muted',
                    )}
                  >
                    {encounter.isCaught ? (
                      <Check className="w-3 h-3 font-black" />
                    ) : (
                      <HelpCircle className="w-3 h-3" />
                    )}
                  </div>

                  {/* Pokemon Sprite Container */}
                  <div className="relative mb-1 flex h-16 w-16 items-center justify-center">
                    {encounter.isLocked ? (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-game-clay/50 bg-game-clay/10">
                        <span className="text-xl font-black text-game-clay-strong">
                          ?
                        </span>
                      </div>
                    ) : encounter.isCaught || encounter.isSeen ? (
                      <Image
                        src={getPokemonImageUrl(encounter.formId, 'sprite')}
                        alt={'Pokemon'}
                        width={64}
                        height={64}
                        className={cn(
                          'w-16 h-16 object-contain pixelated relative z-10',
                          !encounter.isCaught &&
                            'opacity-50 grayscale contrast-125',
                        )}
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-game-border bg-game-canvas">
                        <span className="text-xl font-black text-game-muted">
                          ?
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Caught Label Style */}
                  <div className="w-full text-center">
                    <span
                      className={cn(
                        'text-[10px] font-black uppercase tracking-[0.08em] transition-colors',
                        encounter.isLocked
                          ? 'text-game-danger'
                          : encounter.isCaught
                            ? 'text-game-moss-strong'
                            : 'text-game-muted',
                      )}
                    >
                      {encounter.isLocked
                        ? canShowRequirements
                          ? 'Locked'
                          : 'Secret'
                        : encounter.isCaught
                          ? 'Captured'
                          : encounter.isSeen
                            ? 'Discovered'
                            : 'Unknown'}
                    </span>
                    {encounter.isLocked && (
                      <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.08em] text-game-danger">
                        {canShowRequirements
                          ? 'Tap for requirements'
                          : 'Hidden requirements'}
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {selectedLockedEncounter && (
            <div className="rounded-lg border border-game-clay/35 bg-game-clay/10 p-4">
              <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-game-clay-strong">
                <AlertCircle className="w-4 h-4" />
                Locked Encounter
              </div>

              {selectedLockedEncounter.isSecret ? (
                <div className="flex items-center gap-3 rounded-xl border border-game-clay/25 bg-game-surface-raised p-3 text-sm text-game-muted">
                  <HelpCircle className="h-5 w-5 text-game-clay-strong" />
                  Requirements are hidden.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedLockedRequirements.map(
                    (requirement: any, index: number) => (
                      <div
                        key={index}
                        className={cn(
                          'flex items-center gap-3 rounded-xl border bg-game-surface-raised p-3',
                          requirement.completed
                            ? 'border-game-moss/35 text-game-ink'
                            : 'border-game-clay/25 text-game-muted',
                        )}
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-game-border bg-game-canvas">
                          {requirement.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-xs font-bold">
                            {requirement.label}
                          </div>
                          {requirement.subLabel && (
                            <div className="truncate text-[10px] uppercase tracking-wider text-game-muted">
                              {requirement.subLabel}
                            </div>
                          )}
                        </div>
                        {requirement.completed && (
                          <Check className="h-4 w-4 text-game-moss" />
                        )}
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Show enemy team for battles
  if (item.type === 'battle' && item.originalData.enemyTeam) {
    const enemyTeam = item.originalData.enemyTeam
    if (!enemyTeam || enemyTeam.length === 0) return null

    const isWildBattle = item.originalData.isWildBattle
    const battleTitle = isWildBattle ? 'Encounters' : 'Enemy Team'

    return (
      <div className="space-y-4 mt-6">
        <SectionDivider>{battleTitle}</SectionDivider>
        <div className="flex gap-3 overflow-x-auto pb-6 pt-2 custom-scrollbar px-1">
          {enemyTeam.map((member: any, i: number) => {
            const formId = getEncounterFormId(member)
            if (!formId) return null

            const pokedexEntry = pokedexByFormId.get(formId)
            const isSeen = pokedexEntry?.seen
            const levelLabel = formatLevelLabel(member.level)
            const pokemon =
              getPokemonForm(formId) || getPokemonSpecies(member.speciesId)
            const displayName = isSeen
              ? member.name || pokemon?.name || 'Pokemon'
              : '???'

            return (
              <div
                key={i}
                className={cn(
                  'group relative flex min-w-[100px] flex-shrink-0 flex-col items-center rounded-lg border p-3 transition-colors',
                  isSeen
                    ? 'border-game-border bg-game-surface-raised'
                    : 'border-game-border/70 bg-game-canvas opacity-80',
                )}
              >
                {/* Pokemon Sprite Container */}
                <div className="relative mb-1 flex h-16 w-16 items-center justify-center">
                  {isSeen ? (
                    <Image
                      src={getPokemonImageUrl(formId, 'sprite')}
                      alt={'Pokemon'}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-contain pixelated relative z-10"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-game-border bg-game-canvas">
                      <span className="text-xl font-black text-game-muted">
                        ?
                      </span>
                    </div>
                  )}
                </div>

                {/* Details / Level */}
                <div className="w-full text-center flex flex-col gap-0.5">
                  <span
                    className={cn(
                      'text-[10px] font-black uppercase tracking-[0.08em] transition-colors truncate',
                      isSeen ? 'text-game-ink' : 'text-game-muted',
                    )}
                  >
                    {displayName}
                  </span>
                  {levelLabel && (
                    <span className="font-mono text-[10px] font-bold text-game-muted">
                      {levelLabel}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Show pokemon selection for anything that consumes them
  const encounterData = item.originalData
  if (encounterData) {
    const consumePokemonCriteria = encounterData.criteria?.filter(
      (c: any) => c.type === 'pokemon_owned' && c.consume,
    )

    if (consumePokemonCriteria && consumePokemonCriteria.length > 0) {
      const totalRequired = consumePokemonCriteria.reduce(
        (sum: number, c: any) => sum + (c.count || 1),
        0,
      )
      const eligiblePokemon = userData.pokemon.filter((p) => {
        if ((p as any).locked) return false
        return consumePokemonCriteria.some((c: any) => {
          if (c.pokemonCriteria) return isPokemonEligible(p, c.pokemonCriteria)
          if (c.targetId) return p.speciesId === Number(c.targetId)
          return true
        })
      })

      return (
        <div className="space-y-6 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <SectionDivider>Selection Required</SectionDivider>

          <div className="flex items-start gap-3 rounded-lg border border-game-danger/25 bg-game-danger/10 p-4">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-game-danger" />
            <p className="text-xs font-medium leading-relaxed text-game-danger">
              CAUTION: Pokemon handed over for this requirement are permanently
              consumed. Ensure you want to part with them.
            </p>
          </div>

          <PokemonSelectionList
            eligiblePokemon={eligiblePokemon}
            selectedPokemonIds={item.selectedPokemonIds || []}
            onToggle={(id) => item.togglePokemonSelection(id, totalRequired)}
            totalRequired={totalRequired}
          />
        </div>
      )
    }
  }

  return null
}
