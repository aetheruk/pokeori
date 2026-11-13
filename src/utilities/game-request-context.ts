import 'server-only'

import { cache } from 'react'
import { getPayload, type Payload } from 'payload'
import type { User } from '@/payload-types'
import config from '@payload-config'
import { headers } from 'next/headers'
import {
  deriveStoryStateFromTasks,
  SAFFRON_ESCAPE_COMPLETE_TASK_ID,
  SAFFRON_GYM_AMBUSH_TASK_ID,
} from '@/utilities/story-state'
import { USER_STATE_COLLECTIONS } from '@/utilities/user-state'

type StoryTaskRow = { taskId?: unknown }

const getCachedGameRequestContext = cache(async () => {
  const [payload, requestHeaders] = await Promise.all([
    getPayload({ config }),
    headers(),
  ])
  const { user } = await payload.auth({ headers: requestHeaders })

  return { payload, user }
})

export async function getGameRequestContext(requestHeaders?: Headers) {
  if (!requestHeaders) return getCachedGameRequestContext()

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: requestHeaders })

  return { payload, user }
}

const getCachedStoryTaskRows = cache(
  async (payload: Payload, userId: string): Promise<StoryTaskRow[]> => {
    const result = (await payload.find({
      collection: USER_STATE_COLLECTIONS.tasks,
      where: {
        and: [
          { user: { equals: userId } },
          {
            taskId: {
              in: [
                SAFFRON_GYM_AMBUSH_TASK_ID,
                SAFFRON_ESCAPE_COMPLETE_TASK_ID,
              ],
            },
          },
        ],
      },
      pagination: false,
      depth: 0,
      overrideAccess: true,
      select: { taskId: true },
    } as any)) as { docs?: StoryTaskRow[] }

    return result.docs || []
  },
)

export async function getStoryTaskRowsForUser(
  payload: Payload,
  userId: string,
  request?: { req?: unknown },
) {
  if (!request?.req) return getCachedStoryTaskRows(payload, userId)

  const result = (await payload.find({
    collection: USER_STATE_COLLECTIONS.tasks,
    where: {
      and: [
        { user: { equals: userId } },
        {
          taskId: {
            in: [SAFFRON_GYM_AMBUSH_TASK_ID, SAFFRON_ESCAPE_COMPLETE_TASK_ID],
          },
        },
      ],
    },
    pagination: false,
    depth: 0,
    overrideAccess: true,
    select: { taskId: true },
    req: request.req as any,
  } as any)) as { docs?: StoryTaskRow[] }

  return result.docs || []
}

export async function getSaffronTakeoverForUser(
  payload: Payload,
  user: Pick<User, 'id'>,
) {
  const taskRows = await getStoryTaskRowsForUser(payload, user.id)
  return deriveStoryStateFromTasks(
    taskRows.map((row) => ({ taskId: String(row.taskId) })),
  ).saffronTakeover
}
