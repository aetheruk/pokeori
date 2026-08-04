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
        '“What on earth are you doing with that mallet?” the passerby demands. Then he spots the Promo binder under your arm and immediately relaxes. “Oh! You’re the new recruit. You should have said.” Before you can explain that you said nothing of the sort, he beckons you deeper into the cave.',
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
    completeButtonText: 'Follow the Stranger',
    chat: true,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'digletts-cave-what-are-you-doing',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Gideon',
        message:
          '“Gideon, Field Recruitment,” the stranger says, walking quickly enough to make introductions feel compulsory. “You found a Promo binder, brought a ceremonial mallet, and arrived through a cave. Excellent initiative.”',
        background: '/backgrounds/digletts-cave.avif',
        icon: {
          type: 'trainer',
          id: 'tcg-maniac-m',
        },
        buttons: [
          {
            text: 'I am not a recruit',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'Gideon',
        message:
          'Gideon glances at the binder. “That is exactly what recruits say before Orientation. Afterwards they mostly say ‘Why is there a pit?’ We cover it in the welcome talk.”',
        background: '/backgrounds/digletts-cave.avif',
        icon: {
          type: 'trainer',
          id: 'tcg-maniac-m',
        },
        buttons: [
          {
            text: 'What pit?',
            type: 'navigate',
            id: 3,
          },
        ],
      },
      {
        id: 3,
        title: 'Gideon',
        message:
          '“Welcome-talk material,” he says firmly. “Please do not skip ahead.” He turns down a narrow natural tunnel with the confidence of someone following a corridor only he can see.',
        background: '/backgrounds/digletts-cave.avif',
        icon: {
          type: 'trainer',
          id: 'tcg-maniac-m',
        },
        buttons: [
          {
            text: 'Follow Gideon',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/digletts-cave.avif',
      title: "Apparently, I'm a Recruit",
      icon: {
        type: 'trainer',
        id: 'tcg-maniac-m',
      },
      message:
        'Gideon stops at an entirely ordinary cave wall and checks both directions. There is nobody nearby, largely because he has led you into a dead end.',
      closeButtonText: 'Inspect the Wall',
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
    enterModal: [
      {
        id: 1,
        title: 'The Secret Knock',
        message:
          'Gideon holds out his hand. “The mallet, please. Security insists on a secret knock. We did try a password, but somebody printed it on a card.”',
        background: '/backgrounds/digletts-cave.avif',
        icon: {
          type: 'trainer',
          id: 'tcg-maniac-m',
        },
        buttons: [
          {
            text: 'Hand Over the Mallet',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'The Secret Knock',
        message:
          'He taps out a rhythm with three verses, an unnecessary bridge, and what may be a drum solo. The wall remains completely ordinary for one long, uncomfortable moment.',
        background: '/backgrounds/digletts-cave.avif',
        icon: {
          type: 'item',
          id: 'rubber-mallet',
        },
        buttons: [
          {
            text: 'Wait',
            type: 'navigate',
            id: 3,
          },
        ],
      },
      {
        id: 3,
        title: 'Mina',
        message:
          'A section of rock swings inward. A woman peers through, spots your binder, and beams. “Gideon! You found our recruit. I was beginning to think we had invented one by mistake.”',
        background: '/backgrounds/digletts-cave.avif',
        icon: {
          type: 'trainer',
          id: 'tcg-maniac-f',
        },
        buttons: [
          {
            text: 'This is a mistake',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/digletts-cave.avif',
      title: 'The Secret Knock',
      icon: {
        type: 'trainer',
        id: 'tcg-maniac-f',
      },
      message:
        '“Mistakes still need Orientation,” Mina says, waving you through. Gideon returns the mallet and follows. The passage seals behind you without leaving so much as a crack. UNDERGROUND is now accessible from the region map.',
      closeButtonText: 'Enter the Passage',
    },
  },
]
