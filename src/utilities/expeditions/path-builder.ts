import { battles } from '@/data/battles'
import { locations } from '@/data/locations'
import { allGames } from '@/data/games'
import { tasks } from '@/data/tasks'
import {
  type ExpeditionActivityType,
  type ExpeditionConfig,
  type ExpeditionGeneratedBranchOption,
  type ExpeditionGeneratedResultBranchOption,
  type ExpeditionGeneratedStep,
  type ExpeditionPathNode,
  type ExpeditionResultBranchResult,
} from '@/data/expeditions'
import { checkRequirement, type RequirementData } from '@/utilities/requirements'

interface ActivityCandidate {
  activityType: ExpeditionActivityType
  activityId: string
}

const ALL_EXPEDITION_ACTIVITY_TYPES: ExpeditionActivityType[] = [
  'battle',
  'location',
  'research',
  'task',
]

function getActivityDefinition(
  activityType: ExpeditionActivityType,
  activityId: string,
): any | null {
  if (activityType === 'battle') {
    return battles.find((entry) => entry.id === activityId) || null
  }

  if (activityType === 'location') {
    return locations.find((entry) => entry.id === activityId) || null
  }

  if (activityType === 'research') {
    return allGames.find((entry) => entry.id === activityId) || null
  }

  if (activityType === 'task') {
    return tasks.find((entry) => entry.id === activityId) || null
  }

  return null
}

function weightedPick<T>(entries: T[], getWeight: (entry: T) => number): T {
  const totalWeight = entries.reduce((sum, entry) => sum + Math.max(0, getWeight(entry)), 0)

  if (totalWeight <= 0) {
    return entries[Math.floor(Math.random() * entries.length)]
  }

  let roll = Math.random() * totalWeight
  for (const entry of entries) {
    roll -= Math.max(0, getWeight(entry))
    if (roll <= 0) {
      return entry
    }
  }

  return entries[entries.length - 1]
}

function getNodeCategories(
  expedition: ExpeditionConfig,
  node: Extract<ExpeditionPathNode, { type: 'activity' }>,
): ExpeditionActivityType[] {
  const categories =
    node.categories || node.activityTypes || (node.activityType ? [node.activityType] : undefined)
  if (categories && categories.length > 0) {
    return categories
  }

  return Object.keys(expedition.activityPool || {}) as ExpeditionActivityType[]
}

function formatBranchLabel(branchId: string): string {
  return branchId.replace(/[-_]/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase())
}

function formatResultBranchLabel(result: 'win' | 'loss', label?: string): string {
  if (label) {
    return label
  }

  return result === 'win' ? 'Success' : 'Failure'
}

function getPreviewActivities(steps: ExpeditionGeneratedStep[]): Array<{
  activityType: ExpeditionActivityType
  activityName: string
}> {
  return steps
    .filter(
      (
        step,
      ): step is ExpeditionGeneratedStep & {
        activityType: ExpeditionActivityType
        activityName: string
      } => (step.type || 'activity') === 'activity' && !!step.activityType && !!step.activityName,
    )
    .slice(0, 2)
    .map((step) => ({
      activityType: step.activityType,
      activityName: step.secret ? '???' : step.activityName,
    }))
}

export function renumberSteps(steps: ExpeditionGeneratedStep[]): ExpeditionGeneratedStep[] {
  return steps.map((step, index) => ({
    ...step,
    stepNumber: index + 1,
  }))
}

export function cloneSteps(steps: ExpeditionGeneratedStep[]): ExpeditionGeneratedStep[] {
  return JSON.parse(JSON.stringify(steps)) as ExpeditionGeneratedStep[]
}

export function resolveResultBranchAfterStep(
  steps: ExpeditionGeneratedStep[],
  completedStepIndex: number,
  result: ExpeditionResultBranchResult,
): { steps: ExpeditionGeneratedStep[]; nextStepIndex: number; end?: 'complete' | 'fail' } | null {
  const completedStep = steps[completedStepIndex]
  const resultBranchIndex = completedStepIndex + 1
  const resultBranch = steps[resultBranchIndex]

  if (!completedStep || !resultBranch || resultBranch.type !== 'result_branch') {
    return null
  }

  if (resultBranch.sourceStepId && resultBranch.sourceStepId !== completedStep.stepId) {
    return null
  }

  const selectedOption = (resultBranch.resultOptions || []).find(
    (option) => option.result === result,
  )

  if (!selectedOption) {
    return null
  }

  const branchSteps = renumberSteps(cloneSteps(selectedOption.steps || []))
  const mergedSteps = selectedOption.end
    ? [...steps.slice(0, resultBranchIndex), ...branchSteps]
    : [
        ...steps.slice(0, resultBranchIndex),
        ...branchSteps,
        ...steps.slice(resultBranchIndex + 1),
      ]

  return {
    steps: renumberSteps(mergedSteps),
    nextStepIndex: resultBranchIndex,
    end: selectedOption.end,
  }
}

function meetsActivityRequirements(activity: any, userData: RequirementData): boolean {
  const requirements = activity.requirements || []
  return requirements.every((req: any) =>
    checkRequirement(userData, req, { category: activity.category, subCategory: activity.subCategory }),
  )
}

function resolveForcedActivityForNode(
  node: Extract<ExpeditionPathNode, { type: 'activity' }>,
  userData: RequirementData,
): ActivityCandidate | null {
  if (!node.activityId) {
    return null
  }

  const searchTypes = node.activityType ? [node.activityType] : ALL_EXPEDITION_ACTIVITY_TYPES

  for (const activityType of searchTypes) {
    const activity = getActivityDefinition(activityType, node.activityId)
    if (!activity) {
      continue
    }

    if (!meetsActivityRequirements(activity, userData)) {
      throw new Error(
        `Forced expedition activity is gated for node ${node.id}: ${activityType}:${node.activityId}`,
      )
    }

    return {
      activityType,
      activityId: node.activityId,
    }
  }

  throw new Error(`Forced expedition activity is missing for node ${node.id}: ${node.activityId}`)
}

function pickActivityForNode(
  expedition: ExpeditionConfig,
  node: Extract<ExpeditionPathNode, { type: 'activity' }>,
  userData: RequirementData,
  usedActivityKeys: Set<string>,
): ActivityCandidate {
  const forcedActivity = resolveForcedActivityForNode(node, userData)
  if (forcedActivity) {
    usedActivityKeys.add(`${forcedActivity.activityType}:${forcedActivity.activityId}`)
    return forcedActivity
  }

  const categories = getNodeCategories(expedition, node)

  const candidates: ActivityCandidate[] = []
  const seen = new Set<string>()

  for (const category of categories) {
    const categoryIds = expedition.activityPool?.[category] || []
    for (const activityId of categoryIds) {
      const key = `${category}:${activityId}`
      if (seen.has(key)) continue
      seen.add(key)

      const activity = getActivityDefinition(category, activityId)
      if (!activity) continue

      if (!meetsActivityRequirements(activity, userData)) {
        continue
      }

      candidates.push({
        activityType: category,
        activityId,
      })
    }
  }

  if (candidates.length === 0) {
    throw new Error(`No eligible expedition activities for node ${node.id}`)
  }

  const primaryCandidates = candidates.filter(
    (candidate) => !usedActivityKeys.has(`${candidate.activityType}:${candidate.activityId}`),
  )
  const finalCandidates = primaryCandidates.length > 0 ? primaryCandidates : candidates

  const picked = weightedPick(finalCandidates, () => 1)
  usedActivityKeys.add(`${picked.activityType}:${picked.activityId}`)
  return picked
}

function buildStepsForNodes(
  expedition: ExpeditionConfig,
  nodes: ExpeditionPathNode[],
  userData: RequirementData,
  usedActivityKeys: Set<string>,
  branchId?: string,
): ExpeditionGeneratedStep[] {
  const steps: ExpeditionGeneratedStep[] = []

  for (const node of nodes) {
    if (node.type === 'activity') {
      const selected = pickActivityForNode(expedition, node, userData, usedActivityKeys)
      const activity = getActivityDefinition(selected.activityType, selected.activityId)

      if (!activity) {
        throw new Error(
          `Missing activity definition for ${selected.activityType}:${selected.activityId}`,
        )
      }

      steps.push({
        type: 'activity',
        stepId: node.id,
        stepNumber: 0,
        secret: !!node.secret,
        activityType: selected.activityType,
        activityId: selected.activityId,
        activityName: activity.name,
        branchId,
        attempts: 0,
        status: 'pending',
      })

      continue
    }

    if (node.type === 'branch') {
      if (node.selection === 'random') {
        if (node.branches.length === 0) {
          throw new Error(`Random expedition branch has no options for node ${node.id}`)
        }

        const selectedBranch = weightedPick(node.branches, (branch) => branch.weight ?? 1)
        const branchSteps = buildStepsForNodes(
          expedition,
          selectedBranch.nodes,
          userData,
          usedActivityKeys,
          selectedBranch.id,
        )
        steps.push(...branchSteps)
        continue
      }

      const branchOptions: ExpeditionGeneratedBranchOption[] = node.branches.map((branch) => {
        const branchUsedActivityKeys = new Set(usedActivityKeys)
        const branchSteps = buildStepsForNodes(
          expedition,
          branch.nodes,
          userData,
          branchUsedActivityKeys,
          branch.id,
        )

        return {
          branchId: branch.id,
          label: formatBranchLabel(branch.id),
          steps: renumberSteps(branchSteps),
          previewActivities: getPreviewActivities(branchSteps),
        }
      })

      steps.push({
        type: 'branch_choice',
        stepId: node.id,
        stepNumber: 0,
        attempts: 0,
        status: 'pending',
        branchOptions,
      })

      continue
    }

    if (node.type === 'result_branch') {
      const resultOptions: ExpeditionGeneratedResultBranchOption[] = node.results.map((result) => {
        if (result.end && result.nodes && result.nodes.length > 0) {
          throw new Error(
            `Terminal expedition result branch cannot also define nodes for ${node.id}:${result.result}`,
          )
        }

        const resultUsedActivityKeys = new Set(usedActivityKeys)
        const resultSteps = buildStepsForNodes(
          expedition,
          result.nodes || [],
          userData,
          resultUsedActivityKeys,
          `${node.id}:${result.result}`,
        )

        return {
          result: result.result,
          label: formatResultBranchLabel(result.result, result.label),
          end: result.end,
          steps: renumberSteps(resultSteps),
          previewActivities: getPreviewActivities(resultSteps),
        }
      })

      steps.push({
        type: 'result_branch',
        stepId: node.id,
        stepNumber: 0,
        sourceStepId: node.sourceStepId,
        attempts: 0,
        status: 'pending',
        resultOptions,
      })
    }
  }

  return steps
}

export function buildExpeditionSteps(
  expedition: ExpeditionConfig,
  userData: RequirementData,
): ExpeditionGeneratedStep[] {
  const usedActivityKeys = new Set<string>()
  const steps = buildStepsForNodes(expedition, expedition.path, userData, usedActivityKeys)
  return renumberSteps(steps)
}
