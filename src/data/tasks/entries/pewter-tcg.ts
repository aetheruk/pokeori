import { Task, TaskIcon } from '../../types'

const schoolBackground = '/backgrounds/town.avif'
const lessonIcon = { type: 'trainer' as const, id: 'expert-m' }
const headmasterIcon = { type: 'trainer' as const, id: 'expert-f' }
const tcgStoryGate = [
  { type: 'task_completed' as const, targetId: 'underground-tcg-funding' },
  { type: 'task_completed' as const, targetId: 'pewter-school-intro' },
]

const lesson = (input: {
  id: string
  name: string
  description: string
  button: string
  title: string
  message: string
  icon?: TaskIcon
}): Task => ({
  id: input.id,
  name: input.name,
  description: input.description,
  category: 'Kanto',
  subCategory: 'Pewter School',
  icon: input.icon || lessonIcon,
  background: schoolBackground,
  repeatable: true,
  secret: false,
  completionTrigger: 'manual',
  completeButtonText: input.button,
  chat: true,
  requirements: tcgStoryGate,
  criteria: [],
  rewards: [],
  exitModal: {
    background: schoolBackground,
    title: input.title,
    icon: input.icon || lessonIcon,
    message: input.message,
    closeButtonText: 'Finish Lesson',
  },
})

export const pewterTcgTasks: Task[] = [
  lesson({
    id: 'pewter-school-tcg-deck-setup',
    name: 'TCG Lesson: Deck Setup',
    description: 'Learn how to build and arrange a Pokemon card deck.',
    button: 'Study Deck Setup',
    title: 'Deck Setup',
    message: 'A battle deck contains 15 unique Pokemon cards. At the start of a battle, place three Pokemon in front and three on the bench. The front row attacks; the bench waits for its turn.',
  }),
  lesson({
    id: 'pewter-school-tcg-energy',
    name: 'TCG Lesson: Energy and Attacks',
    description: 'Learn how energy charges attacks and how turns flow.',
    button: 'Study Energy',
    title: 'Energy and Attacks',
    message: 'Charge your energy before attacking. Every attack has a cost, and the battle limits how much power can be used in the early turns. When you are finished, end the turn and let the opponent respond.',
  }),
  lesson({
    id: 'pewter-school-tcg-effects',
    name: 'TCG Lesson: Weakness and Effects',
    description: 'Learn how to read weaknesses, retreat costs, and status effects.',
    button: 'Study Battle Effects',
    title: 'Weakness and Effects',
    message: 'Read the type icons before committing to an attack. Weakness can turn a modest hit into a knockout, while retreat costs and effects decide whether a damaged Pokemon should stay active.',
  }),
  lesson({
    id: 'pewter-school-tcg-knockouts',
    name: 'TCG Lesson: Knockouts',
    description: 'Learn what happens when an active Pokemon is knocked out.',
    button: 'Study Knockouts',
    title: 'Knockouts and Promotion',
    message: 'When the active Pokemon is knocked out, promote one from the bench. Keep a healthy reserve ready, because the battle ends when one side can no longer continue.',
    icon: headmasterIcon,
  }),
  {
    id: 'pewter-school-tcg-pop-quiz',
    name: 'TCG Pop Quiz',
    description: 'The headmaster wants to check that I understand the new battle rules.',
    category: 'Kanto',
    subCategory: 'Pewter School',
    icon: headmasterIcon,
    background: schoolBackground,
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Take the TCG Quiz',
    requirements: [
      ...tcgStoryGate,
      { type: 'task_completed', targetId: 'pewter-school-tcg-deck-setup' },
      { type: 'task_completed', targetId: 'pewter-school-tcg-energy' },
      { type: 'task_completed', targetId: 'pewter-school-tcg-effects' },
      { type: 'task_completed', targetId: 'pewter-school-tcg-knockouts' },
    ],
    criteria: [],
    rewards: [
      {
        type: 'card',
        quantity: 1,
        dropChance: 100,
        cardDrawParams: { allowedCardIds: ['basep-10'], guaranteed: true },
      },
    ],
    enterModal: [
      {
        id: 1,
        title: 'TCG Pop Quiz',
        message: 'How many unique Pokemon cards belong in a battle deck?',
        background: schoolBackground,
        icon: headmasterIcon,
        buttons: [
          { text: '10', type: 'navigate', id: 99 },
          { text: '15', type: 'navigate', id: 2 },
          { text: '30', type: 'navigate', id: 99 },
        ],
      },
      {
        id: 2,
        title: 'TCG Pop Quiz',
        message: 'How many Pokemon begin in the front row?',
        background: schoolBackground,
        icon: headmasterIcon,
        buttons: [
          { text: '3', type: 'navigate', id: 3 },
          { text: '6', type: 'navigate', id: 99 },
          { text: '1', type: 'navigate', id: 99 },
        ],
      },
      {
        id: 3,
        title: 'TCG Pop Quiz',
        message: 'What must an attack have before it can be used?',
        background: schoolBackground,
        icon: headmasterIcon,
        buttons: [
          { text: 'A Trainer card', type: 'navigate', id: 99 },
          { text: 'Enough energy', type: 'navigate', id: 4 },
          { text: 'A full bench', type: 'navigate', id: 99 },
        ],
      },
      {
        id: 4,
        title: 'TCG Pop Quiz',
        message: 'What should happen after your active Pokemon is knocked out?',
        background: schoolBackground,
        icon: headmasterIcon,
        buttons: [
          { text: 'Promote a benched Pokemon', type: 'navigate', id: 5 },
          { text: 'Shuffle the whole deck', type: 'navigate', id: 99 },
          { text: 'End the battle immediately', type: 'navigate', id: 99 },
        ],
      },
      {
        id: 5,
        title: 'TCG Pop Quiz',
        message: 'What is the most important thing in the game?',
        background: schoolBackground,
        icon: headmasterIcon,
        buttons: [
          { text: 'Pokemon', type: 'success' },
          { text: 'Trainer cards', type: 'navigate', id: 99 },
          { text: 'The rulebook margins', type: 'navigate', id: 99 },
        ],
      },
      {
        id: 99,
        title: 'TCG Pop Quiz',
        message: 'Not quite. Review the lessons and try the question again.',
        background: schoolBackground,
        icon: headmasterIcon,
        buttons: [
          { text: 'Try Again', type: 'navigate', id: 1 },
          { text: 'Leave Class', type: 'fail' },
        ],
      },
    ],
    exitModal: {
      background: schoolBackground,
      title: 'Quiz Complete',
      icon: headmasterIcon,
      message: 'You have the fundamentals. Take this card I designed now it’s time to prove yourself against some real players. Head back to HQ',
      closeButtonText: 'Take Meowth',
    },
  },
]
