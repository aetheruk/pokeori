import { Task } from '../../types'

export const fuchsiaCityTasks: Task[] = [
  {
    id: 'route-13-manic-ditto-mew',
    name: 'Turn Into Mew',
    description:
      "The journal claims Ditto can become anything. With a Ditto by my side, there's only one way to test that theory.",
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: {
      type: 'pokemon',
      id: '132',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Read the Journal',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'on-to-fuchsia-city',
      },
      {
        type: 'item_owned',
        targetId: 'manics-journal-pg-132',
      },
      {
        type: 'companion',
        count: 1,
        companionCheck: {
          speciesId: 132,
          formId: '132',
        },
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon_research_xp',
        targetId: '151',
        quantity: 1,
      },
    ],
    enterModal: [
      {
        id: 1,
        background: '/backgrounds/grassy-route.avif',
        title: 'Turn Into Mew',
        icon: {
          type: 'pokemon',
          id: '132',
        },
        message:
          'Okay. The journal says Mew can become anything and Ditto can become anything. Simple maths: Ditto equals Mew. Worth a shot.',
        buttons: [
          {
            text: 'Try It',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        background: '/backgrounds/grassy-route.avif',
        title: 'Turn Into Mew',
        icon: {
          type: 'pokemon',
          id: '132',
        },
        message:
          'Okay Ditto! TURN INTO MEW! ... See? It is doing it! ... It is not doing it. It is just squishing. It squished, looked at me, and squished again. That is not Mew, that is a very confused blob.',
        buttons: [
          {
            text: 'Maybe more encouragement?',
            type: 'navigate',
            id: 3,
          },
        ],
      },
      {
        id: 3,
        background: '/backgrounds/grassy-route.avif',
        title: 'Turn Into Mew',
        icon: {
          type: 'pokemon',
          id: '132',
        },
        message:
          'SQUISH. SQUISH. Ooh! It blinked! Did it understand something? Maybe. Probably not. I am going to try again tomorrow.',
        buttons: [
          {
            text: 'Give Up For Now',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Turn Into Mew',
      icon: {
        type: 'pokemon',
        id: '132',
      },
      message:
        "The Ditto squishes around, looks between me and the journal, and very clearly has no idea what a Mew is. I scribble 'PARTIAL SUCCESS' in the margins. Research continues.",
      closeButtonText: 'Put the Journal Away',
    },
  },
]
