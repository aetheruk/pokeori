import {
  chronicleActivityId,
  KANTO_GYM_CHRONICLE_STORIES,
} from '@/data/gym-leader-chronicle-stories'
import { KANTO_GYM_CHRONICLES } from '@/data/gym-leader-chronicles'
import type { Task } from '../../types'

const memoryMarkerTasks: Task[] = KANTO_GYM_CHRONICLES.map((chronicle) => ({
  id: chronicle.markerId,
  name: `${chronicle.leaderName}'s Badge Memory`,
  description: `The ${chronicle.badgeName} has opened a memory from ${chronicle.leaderName}'s past.`,
  category: 'Secret',
  subCategory: `${chronicle.leaderName} Chronicle`,
  icon: { type: 'item', id: chronicle.badgeItemId },
  background: chronicle.background,
  repeatable: false,
  secret: true,
  completionTrigger: 'manual',
  requirements: [],
  criteria: [],
  rewards: [],
}))

const storyTasks: Task[] = KANTO_GYM_CHRONICLES.flatMap((chronicle) => {
  const story = KANTO_GYM_CHRONICLE_STORIES[chronicle.key]

  return story.scenes.map((scene) => ({
    id: chronicleActivityId(chronicle.key, scene.id),
    name: scene.title,
    description: scene.description,
    category: 'Secret',
    subCategory: `${chronicle.leaderName} Chronicle`,
    icon: { type: 'trainer', id: chronicle.trainerIconId },
    background: scene.background,
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Enter the Scene',
    requirements: [{ type: 'task_completed', targetId: chronicle.markerId }],
    criteria: [],
    rewards: [],
    enterModal: scene.dialogue.map((line, index) => {
      const isLastLine = index === scene.dialogue.length - 1

      return {
        id: index + 1,
        icon: line.icon ?? { type: 'trainer', id: chronicle.trainerIconId },
        title: line.speaker,
        message: line.message,
        background: line.background ?? scene.background,
        buttons: [
          isLastLine
            ? { text: 'Continue the Memory', type: 'success' as const }
            : { text: 'Continue', type: 'navigate' as const, id: index + 2 },
        ],
      }
    }),
  }))
})

export const gymLeaderChronicleTasks: Task[] = [...memoryMarkerTasks, ...storyTasks]
