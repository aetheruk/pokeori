import { Task } from '../../types'

const diglettsCaveUnlockRequirement = {
  type: 'task_completed' as const,
  targetId: 'vermilion-rumours',
}

export const diglettsCaveTasks: Task[] = [
  {
    id: 'digletts-cave-rubber-mallet',
    name: 'No Way!!!',
    description: "I can't believe my luck!",
    category: 'Kanto',
    subCategory: 'Digletts Cave',
    icon: {
      type: 'item',
      id: 'rubber-mallet',
    },
    background: '/backgrounds/cave.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Inspect Mallet',
    requirements: [
      diglettsCaveUnlockRequirement,
      {
        type: 'item_owned',
        targetId: 'rubber-mallet',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/cave.avif',
      title: 'No Way!!!',
      icon: {
        type: 'item',
        id: 'rubber-mallet',
      },
      message:
        "I can't believe someone casually left a giant rubber mallet in this cave. How fortuitous!",
      closeButtonText: 'Fortuitous!',
    },
  },
  {
    id: 'digletts-cave-what-are-you-doing',
    name: 'What on Earth Are You Doing?',
    description:
      'A passer-by has stopped to watch the mallet swinging and would like an explanation.',
    category: 'Kanto',
    subCategory: 'Digletts Cave',
    icon: {
      type: 'trainer',
      id: 'tcg-maniac-m',
    },
    background: '/backgrounds/digletts-cave.avif',
    repeatable: false,
    secret: true,
    completionTrigger: 'auto',
    requirements: [
      diglettsCaveUnlockRequirement,
      {
        type: 'item_owned',
        targetId: 'binder-basep',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/digletts-cave.avif',
      title: 'Passerby',
      icon: {
        type: 'trainer',
        id: 'tcg-maniac-m',
      },
      message:
        'Erm... what on earth are you doing?, Oh! Sorry I didnt see the binder. You must be the new recruit. Come on. I’ll show you the way.”',
      closeButtonText: 'Follow Him',
    },
  },
  {
    id: 'digletts-cave-new-recruit',
    name: 'The Stranger',
    description: 'A stranger has mistaken me for somebody else. He seems very sure about it.',
    category: 'Kanto',
    subCategory: 'Digletts Cave',
    icon: {
      type: 'trainer',
      id: 'tcg-maniac-m',
    },
    background: '/backgrounds/digletts-cave.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Follow the Maniac',
    chat: true,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'digletts-cave-what-are-you-doing',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/digletts-cave.avif',
      title: "Apparently, I'm a Recruit",
      icon: {
        type: 'trainer',
        id: 'tcg-maniac-m',
      },
      message:
        'The stranger leads you away through a narrow natural tunnel, and stops at an entirely ordinary cave wall.',
      closeButtonText: 'Erm...',
    },
  },
  {
    id: 'digletts-cave-secret-knock',
    name: 'The Secret Knock',
    description: 'The ordinary cave wall apparently has a very particular opinion about rhythm.',
    category: 'Kanto',
    subCategory: 'Digletts Cave',
    icon: {
      type: 'item',
      id: 'rubber-mallet',
    },
    background: '/backgrounds/digletts-cave.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Wait by the wall',
    chat: true,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'digletts-cave-new-recruit',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/digletts-cave.avif',
      title: 'The Secret Knock',
      icon: {
        type: 'trainer',
        id: 'tcg-maniac-f',
      },
      message:
        'The Maniac taps an absurdly complicated rhythm against the rock with your mallet. A section of wall swings open and a woman peers through. She spots your empty Promo binder and smiles. “The new recruit! Right on time.” The stranger gestures for you to follow, and she waves you inside. UNDERGROUND Is now accessible from the region map.',
      closeButtonText: 'Enter the Passage',
    },
  },
]
