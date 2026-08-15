import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { GameShell } from '@/components/game/game-shell'
import {
  deriveStoryStateFromTasks,
  SAFFRON_ESCAPE_COMPLETE_TASK_ID,
  SAFFRON_GYM_AMBUSH_TASK_ID,
} from '@/utilities/story-state'

export default async function GameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Seed the shell takeover state from the server so a player who reopens the
  // app mid-blackout lands directly on the dark Unown Explore page instead of
  // flashing the light Trainer page before the client sync.
  let initialTakeover = false
  try {
    const payload = await getPayload({ config })
    const { user } = await payload.auth({ headers: await headers() })
    if (user) {
      const storyTaskRows = (await payload.find({
        collection: 'user-task-progress',
        where: {
          and: [
            { user: { equals: user.id } },
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
      } as any)) as { docs?: Array<{ taskId?: unknown }> }
      initialTakeover = deriveStoryStateFromTasks(
        (storyTaskRows.docs || []).map((row) => ({
          taskId: String(row.taskId),
        })),
      ).saffronTakeover
    }
  } catch {
    // Fall back to client-side derivation if the server query fails.
  }

  return <GameShell user={null} initialTakeover={initialTakeover}>{children}</GameShell>
}
