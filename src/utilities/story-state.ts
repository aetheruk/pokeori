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
export const SAFFRON_ESCAPE_COMPLETE_TASK_ID = 'celadon-timeline-divergence'
export const STRUGGLE_TASK_ID = 'struggle'
export const A_GOLDEN_GLOW_TASK_ID = 'golden-glow'

export interface StoryState {
  saffronTakeover: boolean
}

interface StoryTaskRow {
  taskId: string
}

export function isSaffronTakeoverActive(
  completedTasks: StoryTaskRow[],
): boolean {
  const completed = new Set((completedTasks || []).map((row) => row.taskId))
  const ambushDone = completed.has(SAFFRON_GYM_AMBUSH_TASK_ID)
  const escapeDone =
    completed.has(SAFFRON_ESCAPE_COMPLETE_TASK_ID) ||
    completed.has('saffron-escape-complete')
  return ambushDone && !escapeDone
}

export function deriveStoryStateFromTasks(
  taskRows: StoryTaskRow[],
): StoryState {
  return {
    saffronTakeover: isSaffronTakeoverActive(taskRows),
  }
}
