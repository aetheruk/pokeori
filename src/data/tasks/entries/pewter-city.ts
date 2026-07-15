import { Task } from '../../types'

const headmasterIcon = {
  type: 'trainer',
  id: 'expert-f',
} as const

const popQuizSkillRewards: Task['rewards'] = [
  {
    type: 'xp',
    skill: 'catching',
    quantity: 10,
  },
  {
    type: 'xp',
    skill: 'battling',
    quantity: 10,
  },
  {
    type: 'xp',
    skill: 'researching',
    quantity: 10,
  },
  {
    type: 'xp',
    skill: 'artisan',
    quantity: 10,
  },
]

const createPewterPopQuizTask = ({
  number,
  question,
  answers,
  correctAnswer,
  successMessage,
}: {
  number: number
  question: string
  answers: string[]
  correctAnswer: string
  successMessage: string
}): Task => {
  const taskId = `pewter-school-pop-quiz-${number}`
  const previousTaskId =
    number === 1 ? 'pewter-school-intro' : `pewter-school-pop-quiz-${number - 1}`

  return {
    id: taskId,
    name: `Headmaster's Pop Quiz ${number}`,
    description: 'The Pewter School Headmaster has a quick question about modern training.',
    category: 'Kanto',
    subCategory: 'Pewter School',
    icon: headmasterIcon,
    background: '/backgrounds/town.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Take Pop Quiz',
    requirements: [
      {
        type: 'task_completed',
        targetId: previousTaskId,
      },
    ],
    criteria: [],
    rewards: popQuizSkillRewards,
    enterModal: [
      {
        id: 1,
        icon: headmasterIcon,
        title: `Pop Quiz ${number}`,
        message: question,
        background: '/backgrounds/town.avif',
        buttons: answers.map((answer) => ({
          text: answer,
          type: answer === correctAnswer ? 'success' : 'navigate',
          id: answer === correctAnswer ? undefined : 2,
        })),
      },
      {
        id: 2,
        icon: headmasterIcon,
        title: `Pop Quiz ${number}`,
        message:
          "Not quite. I admire confidence, but confidence without reading the lesson board is how trainers end up challenging Brock with a single Pidgey. Try again.",
        background: '/backgrounds/town.avif',
        buttons: [
          {
            text: 'Try Again',
            type: 'navigate',
            id: 1,
          },
          {
            text: 'Leave Class',
            type: 'fail',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: `Pop Quiz ${number}`,
      icon: headmasterIcon,
      message: successMessage,
      closeButtonText: 'Class Dismissed',
    },
  }
}

const pewterSchoolPopQuizTasks: Task[] = [
  createPewterPopQuizTask({
    number: 1,
    question:
      'First question. Sometimes a job is not visible yet, and sometimes it is visible but still needs something before you can finish it. What should a careful trainer do?',
    answers: [
      'Assume the task is broken',
      'Read the task and check what it asks for',
      'Only train one Pokemon forever',
      'Ignore every locked path',
    ],
    correctAnswer: 'Read the task and check what it asks for',
    successMessage:
      'Exactly. A good trainer reads the situation. If a job appears but will not wrap up yet, it usually wants proof: a win, an item, a Pokemon, or some other clear bit of progress.',
  }),
  createPewterPopQuizTask({
    number: 2,
    question: 'Wild battle rules next. Why do most wild battles only let you bring one Pokemon?',
    answers: [
      'The second Pokemon always runs away',
      'Only Gym Leaders can use teams',
      'They are controlled 1v1 encounters',
      'Wild Pokemon refuse to battle after lunch',
    ],
    correctAnswer: 'They are controlled 1v1 encounters',
    successMessage:
      'Correct. Rangers prefer trainers not turn every patch of grass into a team brawl. One Pokemon, one wild opponent, fewer ecosystem complaints on my desk.',
  }),
  createPewterPopQuizTask({
    number: 3,
    question: 'Battle stances. If your opponent leans into Tech, which stance has the advantage?',
    answers: ['Speed', 'Tech', 'Running away', 'Power'],
    correctAnswer: 'Power',
    successMessage:
      'Good. Power breaks through Tech, Tech handles Speed, and Speed slips around Power. Remembering that triangle is cheaper than buying more Potions.',
  }),
  createPewterPopQuizTask({
    number: 4,
    question: 'Formal battles may set level caps. What happens if a Pokemon is above the cap?',
    answers: [
      'It automatically becomes level 1',
      'It holds back to the level cap',
      'It counts as two Pokemon',
      'It gets bonus XP',
    ],
    correctAnswer: 'It holds back to the level cap',
    successMessage:
      'Right. A level cap is a rule, not a suggestion. Your Pokemon can still join in, but it fights as if it were at the capped level.',
  }),
  createPewterPopQuizTask({
    number: 5,
    question: 'Field Observation is the Study action. What is it mainly testing?',
    answers: [
      'Throwing as many balls as possible',
      'Buying items before a timer ends',
      'Watching Pokemon and answering research questions',
      'Choosing a Gym badge to polish',
    ],
    correctAnswer: 'Watching Pokemon and answering research questions',
    successMessage:
      'Precisely. A good researcher sees what is actually there, not what they hoped was there. That is also sound advice for cafeteria stew.',
  }),
  createPewterPopQuizTask({
    number: 6,
    question: 'Pokemon Research rank 1 for a species unlocks which practical options?',
    answers: [
      'Automatic shiny encounters',
      'Free Master Balls',
      'A second starter Pokemon',
      'Assigned battle moves and held items',
    ],
    correctAnswer: 'Assigned battle moves and held items',
    successMessage:
      'Correct. Rank 1 is where your notes start becoming useful in battle preparation. The shiny paperwork, sadly, takes longer.',
  }),
  createPewterPopQuizTask({
    number: 7,
    question: 'What starts opening up at Pokemon Research rank 3 for a species?',
    answers: [
      'Unlimited battle items',
      'Free escapes and Pokemon Powers',
      'Instant evolutions',
      'Gym badges by mail',
    ],
    correctAnswer: 'Free escapes and Pokemon Powers',
    successMessage:
      'Exactly. Once you understand a Pokemon that well, you start learning how it gets out of trouble and how it can do something spectacular.',
  }),
  createPewterPopQuizTask({
    number: 8,
    question: 'When a task asks for a Pokemon from a specific place, what should you pay attention to?',
    answers: [
      'Only how cute the nickname is',
      'Which box slot it lives in',
      'Where you caught or received it',
      'Whether it knows Tackle',
    ],
    correctAnswer: 'Where you caught or received it',
    successMessage:
      'Good. Origin matters. If someone asks for a Pokemon from a certain route or region, check where that Pokemon came from before you hand it over.',
  }),
  createPewterPopQuizTask({
    number: 9,
    question: 'When crafting materials improve into higher tiers, which skill helps identify better material tiers?',
    answers: ['Trainer', 'Explorer', 'Ranked Battler', 'Researcher'],
    correctAnswer: 'Researcher',
    successMessage:
      'Correct. Anyone can pick up a strange feather. A trained Researcher knows whether it is useful, excellent, or best left in a sealed jar.',
  }),
  createPewterPopQuizTask({
    number: 10,
    question: 'What lets a trainer call on a Pokemon Power in battle?',
    answers: [
      'A full party of six',
      'Deep Pokemon research and the right trainer skill',
      'A Premier Ball',
      'A nickname with punctuation',
    ],
    correctAnswer: 'Deep Pokemon research and the right trainer skill',
    successMessage:
      'Right. Pokemon Powers come from understanding that species deeply, then having enough battle knowledge to use that power at the right moment.',
  }),
  createPewterPopQuizTask({
    number: 11,
    question: 'What does Explorer training improve in the field?',
    answers: [
      'Only TCG deck size',
      'Only shop discounts',
      'Catching tools, encounter options, and field access',
      'Only rival dialogue',
    ],
    correctAnswer: 'Catching tools, encounter options, and field access',
    successMessage:
      'Exactly. Explorer training is about getting out there, finding Pokemon, and being prepared when the grass starts rustling.',
  }),
  createPewterPopQuizTask({
    number: 12,
    question: 'Last one. Why do we keep all these lessons in the school instead of one enormous chalkboard?',
    answers: [
      'Because chalk is banned in Pewter City',
      'Because Brock hid the chalkboard',
      'Because quizzes cannot be chained',
      'Trainers learn better in pieces',
    ],
    correctAnswer: 'Trainers learn better in pieces',
    successMessage:
      'Well said. A journey is easier when the map is folded into sections. Also, the enormous chalkboard budget was denied.',
  }),
]

export const pewterCityTasks: Task[] = [
  {
    name: 'Explore Pewter City',
    description:
      'Phew! Im glad to be out of that forest, now lets take a look round and see what Pewter City has to offer.',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'local',
      id: '/sprites/sign.avif',
    },
    background: '/backgrounds/town.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Enter Pewter',
    chat: true,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'viridian-exit',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Pewter City',
      icon: {
        type: 'local',
        id: '/sprites/sign.avif',
      },
      message: 'Wait is that Brock? Oh he must be the Gym Leader here!',
      closeButtonText: 'Tour Pewter',
    },
    id: 'explore-pewter',
  },
  {
    name: 'The Messy Pokemart',
    description: 'Wow its chaos in the pokemart, its so hard to find anything!',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'trainer',
      id: 'breeder-m',
    },
    background: '/backgrounds/shop.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Search Shelves',
    chat: true,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-pewter',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/shop.avif',
      title: 'Pewter City',
      icon: {
        type: 'trainer',
        id: 'breeder-m',
      },
      message:
        'Hey Trainer, are you free? I need help sorting our inventory. Obviously I can pay for your time!',
      closeButtonText: 'Sort Stock',
    },
    id: 'pewter-messy-mart',
  },
  {
    id: 'pewter-school-intro',
    name: 'Pewter Pokemon School',
    description: 'Hmm a dedicated Pokemon school, maybe I could learn a thing or too',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'trainer',
      id: 'expert-f',
    },
    background: '/backgrounds/town.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Enter School',
    chat: true,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-pewter',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Headmaster',
      icon: {
        type: 'trainer',
        id: 'expert-f',
      },
      message:
        'Welcome! The world can be a confusing place, so you better arm yourself with as much knowledge as possible!',
      closeButtonText: 'Start Learning',
    },
  },
  {
    id: 'pewter-school-battle-system',
    name: 'Lesson: Battle Stances',
    description: 'A Pewter School expert explains how battle stances shape each turn.',
    category: 'Kanto',
    subCategory: 'Pewter School',
    icon: {
      type: 'trainer',
      id: 'expert-m',
    },
    background: '/backgrounds/town.avif',
    repeatable: true,
    chat: true,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Study Stances',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-school-intro',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Battle Stances',
      icon: {
        type: 'trainer',
        id: 'expert-m',
      },
      message:
        'Your Pokemon may have a strength in Tech, Speed or Power, but so will your opponent and they may try to read your moves. Remember Power > Tech > Speed',
      closeButtonText: 'Finish Stances Lesson',
    },
  },
  {
    id: 'pewter-school-reading-opponents',
    name: 'Lesson: Reading Opponents',
    description: 'A Pewter School expert explains how to spot dangerous enemy attacks.',
    category: 'Kanto',
    subCategory: 'Pewter School',
    icon: {
      type: 'trainer',
      id: 'expert-f',
    },
    background: '/backgrounds/town.avif',
    repeatable: true,
    chat: true,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Study Attack Warnings',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-school-intro',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Reading Opponents',
      icon: {
        type: 'trainer',
        id: 'expert-f',
      },
      message:
        "When your Pokemon is looking worn down, keep one eye on the battle text. Some opponents get easier to read when the pressure rises, and you might see them preparing a Power, Speed or Tech attack before it lands. That is your chance to answer with the stance that beats it. A calm trainer wins a lot of battles before the attack even starts.",
      closeButtonText: 'Finish Warning Lesson',
    },
  },
  {
    id: 'pewter-school-battle-observer',
    name: 'Lesson: Battle Observer',
    description: 'A Pewter School expert explains how careful observation improves battles.',
    category: 'Kanto',
    subCategory: 'Pewter School',
    icon: {
      type: 'trainer',
      id: 'expert-m',
    },
    background: '/backgrounds/town.avif',
    repeatable: true,
    chat: true,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Study Observation',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-school-intro',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Battle Observer',
      icon: {
        type: 'trainer',
        id: 'expert-m',
      },
      message:
        "The Battle Observer is not just a fancy lens. Use it on a Pokemon in battle and your Pokedex remembers the kind of attack that Pokemon tends to favor. Once your research on that Pokemon reaches rank 2, those notes can help you spot the same species winding up an attack in future battles. If you see a stance mark beside a Pokemon's name, that means your Pokedex has useful battle notes on it.",
      closeButtonText: 'Finish Observer Lesson',
    },
  },
  ...pewterSchoolPopQuizTasks,
  {
    id: 'pewter-school-headmaster-lamp',
    name: "Headmaster's Final Exam",
    description:
      'The Pewter School Headmaster wants to reward me for surviving every pop quiz.',
    category: 'Kanto',
    subCategory: 'Pewter School',
    icon: headmasterIcon,
    background: '/backgrounds/town.avif',
    repeatable: false,
    secret: false,
    chat: true,
    completionTrigger: 'manual',
    completeButtonText: 'See the Headmaster',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-school-pop-quiz-12',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'item',
        targetId: 'magical-lamp',
        quantity: 1,
        dropChance: 100,
      },
    ],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Headmaster',
      icon: headmasterIcon,
      message:
        "You have done well. In an old academy story, a headmaster once gave a promising student a strange lamp and called it an educational opportunity. I have decided to continue that extremely responsible tradition. Take this Magical Lamp. Do not rub it in class.",
      closeButtonText: 'Take the Lamp',
    },
  },
  {
    id: 'pewter-school-wild-battles',
    name: 'Lesson: Wild Battle Limits',
    description: 'A Pewter School expert explains why wild battles are kept to one Pokemon.',
    category: 'Kanto',
    subCategory: 'Pewter School',
    icon: {
      type: 'trainer',
      id: 'expert-m',
    },
    background: '/backgrounds/town.avif',
    repeatable: true,
    chat: true,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Study Wild Battles',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-school-intro',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Wild Battle Limits',
      icon: {
        type: 'trainer',
        id: 'expert-m',
      },
      message:
        'Wild battles are controlled encounters. 1v1. Pokemon Rangers had to step in to enforce it as trainers were damaging pokemon eco systems',
      closeButtonText: 'Finish Wild Battle Lesson',
    },
  },
  {
    id: 'pewter-school-trainer-rules',
    name: 'Lesson: Trainer Rules',
    description: 'A Pewter School expert explains why trainers can have custom battle rules.',
    category: 'Kanto',
    subCategory: 'Pewter School',
    icon: {
      type: 'trainer',
      id: 'expert-m',
    },
    background: '/backgrounds/town.avif',
    repeatable: true,
    secret: false,
    chat: true,
    completionTrigger: 'manual',
    completeButtonText: 'Study Trainer Rules',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-school-intro',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Trainer Rules',
      icon: {
        type: 'trainer',
        id: 'expert-m',
      },
      message:
        'Every serious trainer sets terms for battle: team size, max level, sometimes even more specific than that! Its good to keep a well rounded team to be ready for anything!',
      closeButtonText: 'Finish Trainer Lesson',
    },
  },
  {
    id: 'pewter-school-battle-items',
    name: 'Lesson: Battle Items',
    description: 'A Pewter School expert explains why battle items are limited.',
    category: 'Kanto',
    subCategory: 'Pewter School',
    icon: {
      type: 'trainer',
      id: 'expert-m',
    },
    background: '/backgrounds/town.avif',
    repeatable: true,
    secret: false,
    chat: true,
    completionTrigger: 'manual',
    completeButtonText: 'Study Battle Items',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-school-intro',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Battle Items',
      icon: {
        type: 'trainer',
        id: 'expert-m',
      },
      message:
        'Trainers set thier own item rules per battle often they will let you use some, however most trainers will never use items',
      closeButtonText: 'Finish Item Lesson',
    },
  },
  {
    id: 'pewter-school-level-caps',
    name: 'Lesson: Level Caps',
    description: 'A Pewter School expert explains why some battles cap Pokemon levels.',
    category: 'Kanto',
    subCategory: 'Pewter School',
    icon: {
      type: 'trainer',
      id: 'expert-m',
    },
    background: '/backgrounds/town.avif',
    repeatable: true,
    secret: false,
    chat: true,
    completionTrigger: 'manual',
    completeButtonText: 'Study Level Caps',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-school-intro',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Level Caps',
      icon: {
        type: 'trainer',
        id: 'expert-m',
      },
      message:
        'Gyms and formal challenges may set level caps. A Pokemon above the cap is not always the best answer; Strategy really pays off!',
      closeButtonText: 'Finish Level Cap Lesson',
    },
  },
  {
    id: 'pewter-school-partner-candy',
    name: 'Lesson: Partner Candy',
    description: 'A Pewter School expert explains partner growth through candy.',
    category: 'Kanto',
    subCategory: 'Pewter School',
    icon: {
      type: 'trainer',
      id: 'expert-m',
    },
    background: '/backgrounds/town.avif',
    repeatable: true,
    secret: false,
    chat: true,
    completionTrigger: 'manual',
    completeButtonText: 'Study Partner Candy',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-school-intro',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Partner Candy',
      icon: {
        type: 'trainer',
        id: 'expert-m',
      },
      message:
        'When battling Wild Pokemon, sometimes their sheer willpower crystalises into a sweet candy, and eating it makes your Pokemon stronger... or something? I actually have no idea where the candy comes from. Some Gym Badges seem to have an effect too. Once a trainer has proven themself, stronger wild Pokemon may occasionally leave behind more powerful candy.',
      closeButtonText: 'Finish Candy Lesson',
    },
  },
  {
    id: 'pewter-school-research-levels',
    name: 'Lesson: Research Levels',
    description: 'A Pewter School expert explains Pokemon Research',
    category: 'Kanto',
    subCategory: 'Pewter School',
    icon: {
      type: 'trainer',
      id: 'expert-m',
    },
    background: '/backgrounds/town.avif',
    repeatable: true,
    secret: false,
    chat: true,
    completionTrigger: 'manual',
    completeButtonText: 'Study Research',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-school-intro',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Research Levels',
      icon: {
        type: 'trainer',
        id: 'expert-m',
      },
      message:
        'Training as a Researcher can open up so many opportunities, some of the best researchers have even made discoveries towards finding mythical pokemon! Specialising in a specific pokemon can also grant tremendous rewards.',
      closeButtonText: 'Finish Research Lesson',
    },
  },
  {
    id: 'pewter-school-catching-abilities',
    name: 'Lesson: Catching Abilities',
    description: 'A Pewter School expert explains Pokemon Abilities',
    category: 'Kanto',
    subCategory: 'Pewter School',
    icon: {
      type: 'trainer',
      id: 'expert-m',
    },
    background: '/backgrounds/town.avif',
    repeatable: true,
    secret: false,
    chat: true,
    completionTrigger: 'manual',
    completeButtonText: 'Study Abilities',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-school-intro',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Catching Abilities',
      icon: {
        type: 'trainer',
        id: 'expert-m',
      },
      message:
        'Some Pokemon have abilities that help outside battle, including effects that can improve catching. A good partner can matter as much as the ball you throw.',
      closeButtonText: 'Finish Ability Lesson',
    },
  },
  {
    id: 'pewter-school-pokemon-research-ranks',
    name: 'Lesson: Pokemon Research Ranks',
    description:
      'A Pewter School expert explains why focusing research on one Pokemon pays off.',
    category: 'Kanto',
    subCategory: 'Pewter School',
    icon: {
      type: 'trainer',
      id: 'expert-m',
    },
    background: '/backgrounds/town.avif',
    repeatable: true,
    secret: false,
    chat: true,
    completionTrigger: 'manual',
    completeButtonText: 'Study Research Ranks',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-school-intro',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Pokemon Research Ranks',
      icon: {
        type: 'trainer',
        id: 'expert-m',
      },
      message:
        'A broad Pokedex is useful, but a deep one is where the fun starts. Once you really study a Pokemon, rank 1 lets that species use assigned battle moves and held items. Rank 2 helps with release materials and sharpens any Battle Observer notes you have on that species. Rank 3 makes catches sparkle with extra crystals and opens easier escapes and Pokemon Powers. Rank 4 means better IV and Ability insight, plus the rare moment where a trusted Pokemon hangs on at 1 HP. Rank 5? That is when your notes start improving shiny luck. Not bad for doing your homework, right?',
      closeButtonText: 'Finish Rank Lesson',
    },
  },
  {
    id: 'pewter-school-research-team-building',
    name: 'Lesson: Researching Teams',
    description:
      'A Pewter School expert explains how research can shape stronger teams.',
    category: 'Kanto',
    subCategory: 'Pewter School',
    icon: {
      type: 'trainer',
      id: 'expert-f',
    },
    background: '/backgrounds/town.avif',
    repeatable: true,
    secret: false,
    chat: true,
    completionTrigger: 'manual',
    completeButtonText: 'Study Team Research',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-school-intro',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Researching Teams',
      icon: {
        type: 'trainer',
        id: 'expert-f',
      },
      message:
        'Good teams are not built by grabbing six Pokemon and hoping the vibes are correct. Research notes can reveal which TMs a species unlocks as you study it, and those moves can turn a familiar partner into the missing piece of a battle plan. If your team needs speed control, coverage, or a safer setup turn, check the Pokedex before you chase another rare catch. Sometimes the answer is the Pokemon you already bothered to learn properly.',
      closeButtonText: 'Finish Team Research Lesson',
    },
  },
  {
    id: 'pewter-school-artisan-crafting',
    name: 'Lesson: Artisan Crafting',
    description: 'A Pewter School expert explains how trainers make useful items.',
    category: 'Kanto',
    subCategory: 'Pewter School',
    icon: {
      type: 'trainer',
      id: 'expert-m',
    },
    background: '/backgrounds/town.avif',
    repeatable: true,
    secret: false,
    chat: true,
    completionTrigger: 'manual',
    completeButtonText: 'Study Crafting',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-school-intro',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Artisan Crafting',
      icon: {
        type: 'trainer',
        id: 'expert-m',
      },
      message:
        'A clever trainer doesnt just buy supplies, sometimes they make them. Artisan work turns berries, casings and pokemon materials into balls, lures and other useful kit. Just dont glue your fingers together, thats not a badge requirement.',
      closeButtonText: 'Finish Crafting Lesson',
    },
  },
  {
    id: 'pewter-school-materials',
    name: 'Lesson: Materials',
    description: 'A Pewter School expert explains where crafting materials come from.',
    category: 'Kanto',
    subCategory: 'Pewter School',
    icon: {
      type: 'trainer',
      id: 'expert-m',
    },
    background: '/backgrounds/town.avif',
    repeatable: true,
    secret: false,
    chat: true,
    completionTrigger: 'manual',
    completeButtonText: 'Study Materials',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-school-intro',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Materials',
      icon: {
        type: 'trainer',
        id: 'expert-m',
      },
      message:
        'Materials are mostly a Researcher problem. Catching and Field Studies can leave behind useful bits based on the pokemon you found. Fire types may leave cinders, Flying types feathers, and so on. The better your Researcher training, the better the materials you can safely identify.',
      closeButtonText: 'Finish Materials Lesson',
    },
  },
  {
    id: 'pewter-school-paints-and-balls',
    name: 'Lesson: Dyes and Balls',
    description: 'A Pewter School expert explains dyes, casings and ball crafting.',
    category: 'Kanto',
    subCategory: 'Pewter School',
    icon: {
      type: 'trainer',
      id: 'expert-m',
    },
    background: '/backgrounds/town.avif',
    repeatable: true,
    secret: false,
    chat: true,
    completionTrigger: 'manual',
    completeButtonText: 'Study Ball Crafting',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-school-intro',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Dyes and Balls',
      icon: {
        type: 'trainer',
        id: 'expert-m',
      },
      message:
        'Berries are not just snacks. The right berries crush down into dyes, and broken ball casings can be rebuilt into proper balls if you have the skill. Honestly its a miracle Pokemarts stay open.',
      closeButtonText: 'Finish Ball Lesson',
    },
  },
  {
    id: 'pewter-school-pokemon-centers',
    name: 'Lesson: Pokemon Centers',
    description: 'A Pewter School expert explains the League prize wheels inside Pokemon Centers.',
    category: 'Kanto',
    subCategory: 'Pewter School',
    icon: {
      type: 'trainer',
      id: 'expert-m',
    },
    background: '/backgrounds/town.avif',
    repeatable: true,
    secret: false,
    chat: true,
    completionTrigger: 'manual',
    completeButtonText: 'Study Pokemon Centers',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-school-intro',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Pokemon Centers',
      icon: {
        type: 'trainer',
        id: 'expert-m',
      },
      message:
        'The League funds Pokemon Centers with sponsored prize wheels. Nurse Joy calls it preventative care: trainers who win supplies need fewer emergency rescues.',
      closeButtonText: 'Finish Center Lesson',
    },
  },
  {
    id: 'pewter-school-tms-field',
    name: 'Lesson: TMs and field TMs',
    description: 'A Pewter School expert explains how technical moves open new options.',
    category: 'Kanto',
    subCategory: 'Pewter School',
    icon: {
      type: 'trainer',
      id: 'expert-m',
    },
    background: '/backgrounds/town.avif',
    repeatable: true,
    secret: false,
    chat: true,
    completionTrigger: 'manual',
    completeButtonText: 'Study TMs and field TMs',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-school-intro',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'TMs and field TMs',
      icon: {
        type: 'trainer',
        id: 'expert-m',
      },
      message:
        'TMs teach battle techniques, while field TMs are trusted field permissions. If a shrub, cave, or road is blocked, the right field TM may matter more than another badge. Best of all, owning one lets you assign its battle move to your Pokemon.',
      closeButtonText: 'Finish TM Lesson',
    },
  },
  {
    id: 'pewter-school-powers',
    name: 'Lesson: Battle Powers',
    description: 'A Pewter School expert explains special battle powers.',
    category: 'Kanto',
    subCategory: 'Pewter School',
    icon: {
      type: 'trainer',
      id: 'expert-m',
    },
    background: '/backgrounds/town.avif',
    repeatable: true,
    secret: false,
    chat: true,
    completionTrigger: 'manual',
    completeButtonText: 'Study Powers',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-school-intro',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Battle Powers',
      icon: {
        type: 'trainer',
        id: 'expert-m',
      },
      message:
        'Pokemon are amazing, and every region in the world specialises in different Poke Powers, for example, Galar has Dynamax, and here in Kanto we use Shouts',
      closeButtonText: 'Finish Power Lesson',
    },
  },
  {
    id: 'pewter-school-shadow-pokemon',
    name: 'Lesson: Shadow Pokemon',
    description: 'A Pewter School expert explains a scary new phenomenon',
    category: 'Kanto',
    subCategory: 'Pewter School',
    icon: {
      type: 'trainer',
      id: 'expert-m',
    },
    background: '/backgrounds/town.avif',
    repeatable: true,
    secret: false,
    chat: true,
    completionTrigger: 'manual',
    completeButtonText: 'Study Shadows',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-school-intro',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Shadow Pokemon',
      icon: {
        type: 'trainer',
        id: 'expert-m',
      },
      message:
        'Recently Shadowy Pokemon have been showing up more and more, its a terrifying experience, theyre so strong, but often paralysed screaming out in pain. I wonder where theyre coming from',
      closeButtonText: 'Finish Shadow Lesson',
    },
  },
  {
    id: 'pewter-school-hidden-discoveries',
    name: 'Lesson: Hidden Discoveries',
    description: 'A Pewter School expert explains the importance of Exploring',
    category: 'Kanto',
    subCategory: 'Pewter School',
    icon: {
      type: 'trainer',
      id: 'expert-m',
    },
    background: '/backgrounds/town.avif',
    repeatable: true,
    secret: false,
    chat: true,
    completionTrigger: 'manual',
    completeButtonText: 'Study Exploring',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-school-intro',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Hidden Discoveries',
      icon: {
        type: 'trainer',
        id: 'expert-m',
      },
      message:
        'This world is full of secrets! Not everything is obvious at first, sometimes a few extra battles, partnering with the right pokemon and many other things may lead you down a path you didnt see at first.',
      closeButtonText: 'Finish Exploring Lesson',
    },
  },
  {
    id: 'pewter-school-cards-binders',
    name: 'Lesson: Cards and Binders',
    description: 'A Pewter School expert explains the Card Club',
    category: 'Kanto',
    subCategory: 'Pewter School',
    icon: {
      type: 'trainer',
      id: 'expert-m',
    },
    background: '/backgrounds/town.avif',
    repeatable: true,
    secret: false,
    chat: true,
    completionTrigger: 'manual',
    completeButtonText: 'Study Cards',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-school-intro',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Cards and Binders',
      icon: {
        type: 'trainer',
        id: 'expert-m',
      },
      message:
        'Ive heard rumours of a secret underground facility of TCG Maniacs, its so well funded that the best collectors are rewarded with powerful TMs and probably even more I dont know about',
      closeButtonText: 'Finish Card Lesson',
    },
  },
  {
    id: 'pewter-school-glitch-teacher',
    name: 'Lesson: CatchiM.S.*.?Oemon',
    description: 'Something Doesnt seem quite right here',
    category: 'Kanto',
    subCategory: 'Pewter School',
    icon: {
      type: 'trainer',
      id: 'expert-m',
    },
    background: '/backgrounds/town.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Listen Closely',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-school-intro',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon_research_xp',
        targetId: '151',
        quantity: 1,
        secret: true,
      },
    ],
    enterModal: [
      {
        id: 1,
        icon: {
          type: 'trainer',
          id: 'expert-m',
        },
        title: 'M.S.*.?O',
        message: 'NaN NaN NaN NaN... NaN... OVERFL0W.',
        background: '/backgrounds/town.avif',
        buttons: [
          {
            text: 'Speak',
            type: 'password',
            id: 2,
            fail: 3,
          },
          {
            text: 'Step Away',
            type: 'fail',
          },
        ],
      },
      {
        id: 2,
        icon: {
          type: 'pokemon',
          id: '151',
        },
        title: 'M.S.*.?O',
        message: 'A strange sensation washes over you.',
        background: '/backgrounds/town.avif',
        buttons: [
          {
            text: 'End Glitch',
            type: 'success',
          },
        ],
      },
      {
        id: 3,
        icon: {
          type: 'trainer',
          id: 'expert-m',
        },
        title: 'M.S.*.?O',
        message: '152???!!!?!?!?! NANANANANANANAN? M.S.*.?O',
        background: '/backgrounds/town.avif',
        buttons: [
          {
            text: 'erm...?',
            type: 'navigate',
            id: 1,
          },
          {
            text: 'Leave',
            type: 'fail',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'M.S.*.?O',
      icon: {
        type: 'pokemon',
        id: '151',
      },
      message:
        'The classroom snaps back into focus. Nobody else seems to remember the teacher, but your notes now contain one strange line about Mew.',
      closeButtonText: 'Close Notes',
    },
  },
  {
    id: 'pewter-school-dailies',
    name: 'Lesson: Daily Help',
    description: 'A Pewter School expert explains recurring jobs around town.',
    category: 'Kanto',
    subCategory: 'Pewter School',
    icon: {
      type: 'trainer',
      id: 'expert-m',
    },
    background: '/backgrounds/town.avif',
    repeatable: true,
    secret: false,
    chat: true,
    completionTrigger: 'manual',
    completeButtonText: 'Study Daily Help',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-school-intro',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Daily Help',
      icon: {
        type: 'trainer',
        id: 'expert-m',
      },
      message:
        'Sometimes its worth checking back on people and places. Quite often you will find people need your help more than once, some might even say Daily.',
      closeButtonText: 'Finish Daily Lesson',
    },
  },
  {
    name: 'Pewter City Gym',
    description: 'Its time for my first real challenge! Time to earn the Boulder Badge!',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'trainer',
      id: 'gym-kanto-brock',
    },
    background: '/backgrounds/gym-rock.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Challenge Brock',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-pewter',
      },
    ],
    criteria: [
      {
        type: 'user_level',
        targetId: 'battling',
        count: 5,
      },
    ],
    rewards: [],
    exitModal: {
      background: '/backgrounds/gym-rock.avif',
      title: 'Gym Leader Brock',
      icon: {
        type: 'trainer',
        id: 'gym-kanto-brock',
      },
      message:
        'Great to see you {Trainer} so you think youre up for the challenge against my Rock Hard pokemon?',
      closeButtonText: 'Challenge Accepted!',
    },
    id: 'pewter-gym',
  },
  {
    name: 'Pewter Science Museum',
    description:
      'Lets take a look around the Pewter Science Museum! Maybe Ill learn something new...',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'item',
      id: 'rare-bone',
    },
    background: '/backgrounds/museum.avif',
    repeatable: true,
    secret: false,
    completionTrigger: 'manual',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-pewter',
      },
    ],
    criteria: [
      {
        type: 'currency_owned',
        targetId: 'pokedollars',
        count: 100,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'xp',
        quantity: 20,
        skill: 'researching',
        dropChance: 100,
      },
      {
        type: 'task_complete',
        targetId: 'pewter-museum-unlock',
        dropChance: 10,
      },
    ],
    completeButtonText: 'Buy Ticket',
    id: 'pewter-museum',
    exitModal: {
      background: '/backgrounds/museum.avif',
      title: 'Pewter Museum',
      icon: {
        type: 'item',
        id: 'rare-bone',
      },
      message: 'Not sure it was worth 100 Pokédollars, but I guess I learned a little bit.',
      closeButtonText: 'Leave Museum',
    },
    hide: 'pewter-museum-unlock',
  },
  {
    name: 'Museum Researcher',
    description: 'A Researcher in the museum has recognised me and asked me to help out!',
    category: 'Kanto',
    background: '/backgrounds/museum.avif',
    subCategory: 'Pewter City',
    icon: {
      type: 'trainer',
      id: 'researcher',
    },
    repeatable: false,
    secret: true,
    completionTrigger: 'manual',
    completeButtonText: 'Help Researcher',
    requirements: [
      {
        type: 'user_level',
        targetId: 'researching',
        count: 7,
      },
    ],
    criteria: [],
    rewards: [],
    id: 'pewter-museum-unlock',
  },
  {
    name: 'Identifying Fossils',
    description: 'The Museum Researcher has asked me to help identify some fossils.',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'trainer',
      id: 'researcher',
    },
    background: '/backgrounds/museum.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-museum-unlock',
      },
    ],
    criteria: [
      {
        type: 'user_level',
        targetId: 'researching',
        count: 7,
      },
    ],
    rewards: [
      {
        type: 'xp',
        quantity: 100,
        skill: 'researching',
        dropChance: 100,
      },
    ],
    completeButtonText: 'Conduct Research',
    id: 'pewter-research-museum',
  },
  {
    name: 'Road Block',
    description: 'The Road to Mt Moon is currently closed due to a landslide.',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'trainer',
      id: 'hiker',
    },
    background: '/backgrounds/town.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Check Road',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-pewter',
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'badge-kanto-boulder',
      },
    ],
    rewards: [],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Hiker',
      icon: {
        type: 'trainer',
        id: 'hiker',
      },
      message:
        'Oh you have the Boulder Badge? That proves you are strong enough, I can help you clear this rubble!',
      closeButtonText: 'Clear Rubble',
    },
    id: 'pewter-roadblock',
  },
  {
    name: "Brock's Request",
    description:
      "Brock's Gym is trashed from all of the battles. He's requested spare stone to help with the repairs.",
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'trainer',
      id: 'gym-kanto-brock',
    },
    background: '/backgrounds/gym-rock.avif',
    repeatable: true,
    daily: true,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Hand Over Stones',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'pewter-gym-brock',
        battleStatus: 'win',
        count: 1,
      },
      {
        type: 'daily_not_completed',
        targetId: 'brock-daily-stones',
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'small-stone-t1',
        count: 10,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'pack-gym1',
        quantity: 1,
        dropChance: 100,
      },
      {
        type: 'currency',
        targetId: 'league-ticket',
        quantity: 1,
        dropChance: 100,
      },
    ],
    id: 'brock-daily-stones',
    exitModal: {
      background: '/backgrounds/gym-rock.avif',
      title: 'Gym Leader Brock',
      icon: {
        type: 'trainer',
        id: 'gym-kanto-brock',
      },
      message:
        'Thanks {Trainer} Take these cards, Im always trashing the place so if you feel like helping tommorow as well...',
      closeButtonText: 'Take Cards',
    },
  },
  {
    name: 'A Small Shrub',
    description:
      'For whatever reason, this incredidibly small shrub looks impossible to get by, maybe if your pokemon knew a move to get through it.',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'local',
      id: '/sprites/cut_tree.avif',
    },
    background: '/backgrounds/pewter.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Use Cut',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-pewter',
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'tm-cut',
      },
      {
        type: 'item_owned',
        targetId: 'badge-kanto-thunder',
      },
    ],
    rewards: [],
    id: 'pewter-shrub',
  },
  {
    name: 'Museum Secret Entrance',
    description:
      'You found a secret entrance to the back of the museum! A Researcher is standing there.',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'trainer',
      id: 'researcher',
    },
    background: '/backgrounds/museum.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Enter Museum',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-shrub',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'item',
        targetId: 'old-amber',
        quantity: 1,
        dropChance: 100,
      },
    ],
    exitModal: {
      background: '/backgrounds/museum.avif',
      title: 'Museum Scientist',
      message:
        'I cant believe they fired me! here take this old amber, its probably worthless anyway',
      closeButtonText: 'Take Amber',
      icon: {
        type: 'trainer',
        id: 'researcher',
      },
    },
    id: 'museum-secret-entrance',
  },
  {
    name: 'A Gift from Brock',
    description: 'Brock told me hes going to teach me a special move I can use in battles!',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'item',
      id: 'tm-wave-breaker',
    },
    background: '/backgrounds/gym-rock.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Learn Technique',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'pewter-gym-brock',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'item',
        targetId: 'tm-wave-breaker',
        quantity: 1,
        dropChance: 100,
      },
      {
        type: 'item',
        targetId: 'sturdy-ability-patch',
        quantity: 1,
        dropChance: 100,
      },
      {
        type: 'title',
        targetId: 'boulder-breaker',
      },
      {
        type: 'icon',
        targetId: 'brock',
      },
    ],
    exitModal: {
      background: '/backgrounds/gym-rock.avif',
      title: 'Gym Leader Brock',
      icon: {
        type: 'trainer',
        id: 'gym-kanto-brock',
      },
      message:
        'Nice work future Champ, here take this TM. It can be assigned as a battle move to supercharge defence!',
      closeButtonText: 'Receive TM',
    },
    id: 'pewter-gym-tm-reward',
  },
  {
    name: "Joey's Obsession",
    description:
      "Joey is absolutely nuts for Rattata. He's told me he'll show me his Rattata's secret ability if I can spare him some pocket money for pokemon food.",
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: '/backgrounds/rocky-path.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'route-3-trainer-3',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [
      {
        type: 'currency_owned',
        targetId: 'pokedollars',
        count: 500,
        consume: true,
      },
    ],
    rewards: [],
    completeButtonText: 'Give 500 Pokedollars',
    exitModal: {
      background: '/backgrounds/rocky-path.avif',
      title: 'Youngster Joey',
      icon: {
        type: 'trainer',
        id: 'youngster',
      },
      message: 'Watch this! I trained my Rattata to fetch Pokeballs left behind by other trainers!',
      closeButtonText: 'Watch Rattata',
    },
    id: 'joeys-obsession',
  },
  {
    id: 'pewter-overstock',
    name: 'Slow Stock',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'trainer',
      id: 'breeder-m',
    },
    background: '/backgrounds/shop.avif',
    repeatable: true,
    completeButtonText: 'Take Slow Stock',
    daily: true,
    description:
      "Hey {Trainer}, thanks for helping out with my store. I've got a box of slow-moving craft stock taking up space: cracked Pokeball parts, spare solvent, and a few colored nuts from an order nobody collected. If you can use them for crafting, take them off my hands.",
    requirements: [
      {
        type: 'research_encounter_result',
        battleStatus: 'win',
        count: 1,
        targetId: 'pewter-item-identify',
      },
      {
        type: 'daily_not_completed',
        targetId: 'pewter-overstock',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'item',
        quantity: 2,
        targetId: 'nut-red',
      },
      {
        type: 'item',
        quantity: 2,
        targetId: 'nut-purple',
      },
      {
        type: 'item',
        quantity: 5,
        targetId: 'aqua-solvent-t1',
      },
      {
        type: 'item',
        quantity: 3,
        targetId: 'broken-ball-t1',
      },
    ],
  },
]
