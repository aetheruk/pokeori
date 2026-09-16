import {
  expeditions,
  legacySafariZoneExpeditions,
} from '@/data/expeditions'
import type {
  ExpeditionActivityType,
  ExpeditionPathNode,
} from '@/data/expeditions'

const expeditionActivityIds: Record<ExpeditionActivityType, Set<string>> = {
  battle: new Set(),
  location: new Set(),
  game: new Set(),
  'field-research': new Set(),
  task: new Set(),
}

function addActivity(
  activityType: ExpeditionActivityType,
  activityId: string | undefined,
): void {
  if (activityId) expeditionActivityIds[activityType].add(activityId)
}

function collectActivities(
  nodes: ExpeditionPathNode[],
  taskPools: Record<string, { id: string }[]> | undefined,
): void {
  for (const node of nodes) {
    if (node.type === 'activity') {
      if (node.activityType && node.activityId) {
        addActivity(node.activityType, node.activityId)
      }
      if (node.activityType === 'task' && node.taskPool) {
        for (const task of taskPools?.[node.taskPool] || []) {
          addActivity('task', task.id)
        }
      }
      continue
    }

    if (node.type === 'branch') {
      for (const branch of node.branches) {
        collectActivities(branch.nodes, taskPools)
      }
      continue
    }

    for (const result of node.results) {
      collectActivities(result.nodes || [], taskPools)
    }
  }
}

for (const expedition of [...expeditions, ...legacySafariZoneExpeditions]) {
  for (const [activityType, activityIds] of Object.entries(
    expedition.activityPool,
  ) as [ExpeditionActivityType, string[]][]) {
    for (const activityId of activityIds || []) {
      addActivity(activityType, activityId)
    }
  }

  for (const taskPool of Object.values(expedition.taskPools || {})) {
    for (const task of taskPool) addActivity('task', task.id)
  }

  collectActivities(expedition.path, expedition.taskPools)
}

export function isExpeditionActivity(
  activityType: ExpeditionActivityType,
  activityId: string,
): boolean {
  return expeditionActivityIds[activityType].has(activityId)
}

export function isExpeditionTaskId(taskId: string): boolean {
  return isExpeditionActivity('task', taskId)
}
