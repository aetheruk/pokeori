import { getPayload } from 'payload'
import configPromise from '@payload-config'
import {
  getExpedition,
  type ExpeditionActivityType,
  type ExpeditionChronicleConfig,
  type ExpeditionGeneratedStep,
} from '@/data/expeditions'

interface ExpeditionRunDoc {
  expeditionId: string
  expeditionName: string
  status: 'active' | 'ready_to_claim'
  currentStepIndex: number
  steps: ExpeditionGeneratedStep[]
}

export interface ActiveChronicleContext {
  expeditionId: string
  expeditionName: string
  chronicle: ExpeditionChronicleConfig
}

export function normalizeChronicleConfig(
  chronicle: boolean | ExpeditionChronicleConfig | undefined,
): ExpeditionChronicleConfig | null {
  if (!chronicle) return null
  return chronicle === true ? {} : chronicle
}

export async function getActiveChronicleContext(params: {
  userId: string
  activityType: ExpeditionActivityType
  activityId: string
}): Promise<ActiveChronicleContext | null> {
  const payload = await getPayload({ config: configPromise })
  const res = await (payload as any).find({
    collection: 'expedition-runs',
    where: {
      user: { equals: params.userId },
      status: { equals: 'active' },
    },
    sort: '-createdAt',
    limit: 5,
  })

  const activeRun = ((res.docs || []) as ExpeditionRunDoc[]).find((run) => {
    const step = run.steps?.[run.currentStepIndex]
    return (
      (step?.type || 'activity') === 'activity' &&
      step?.activityType === params.activityType &&
      step?.activityId === params.activityId
    )
  })

  if (!activeRun) return null

  const expedition = getExpedition(activeRun.expeditionId)
  const chronicle = normalizeChronicleConfig(expedition?.chronicle)
  if (!chronicle) return null

  return {
    expeditionId: activeRun.expeditionId,
    expeditionName: activeRun.expeditionName,
    chronicle,
  }
}
