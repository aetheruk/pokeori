/**
 * Derived story state for the Saffron City knockout / UI takeover.
 *
 * The takeover is not persisted as a separate flag: it starts when the player
 * completes the Saffron gym ambush task and ends when the player-side escape
 * is completed. The escape completion will be recorded as the
 * `saffron-escape-complete` task by the future escape chronicle flow; until
 * that content is authored the takeover stays active after the ambush, which
 * is the intended behaviour for this stage of the story.
 */

export const SAFFRON_GYM_AMBUSH_TASK_ID = 'saffron-gym-ambush'
export const SAFFRON_ESCAPE_COMPLETE_TASK_ID = 'saffron-escape-complete'

export const SAFFRON_TAKEOVER_CHRONICLES = {
  ariana: 'arianna-saffron-takeover-chronicle',
  choo: 'choo-saffron-investigation-chronicle',
  escape: 'player-saffron-escape-chronicle',
} as const

export interface StoryState {
  saffronTakeover: boolean
}

interface StoryTaskRow {
  taskId: string
}

interface StoryExpeditionRow {
  expeditionId: string
  wins?: number
}

export function isSaffronTakeoverActive(params: {
  completedTasks?: StoryTaskRow[]
  expeditionResults?: StoryExpeditionRow[]
}): boolean {
  const completed = new Set((params.completedTasks || []).map((row) => row.taskId))
  const ambushDone = completed.has(SAFFRON_GYM_AMBUSH_TASK_ID)
  const escapeDone = completed.has(SAFFRON_ESCAPE_COMPLETE_TASK_ID)
  return ambushDone && !escapeDone
}

export function hasCompletedTakeoverChronicle(
  expeditionResults: StoryExpeditionRow[] | undefined,
  expeditionId: string,
): boolean {
  return (expeditionResults || []).some(
    (row) => row.expeditionId === expeditionId && (row.wins || 0) >= 1,
  )
}

export function deriveStoryStateFromTasks(
  taskRows: StoryTaskRow[],
): StoryState {
  return {
    saffronTakeover: isSaffronTakeoverActive({ completedTasks: taskRows }),
  }
}
