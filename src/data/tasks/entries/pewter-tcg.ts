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
  dialogue: Array<{
    title: string
    message: string
    button: string
    icon?: TaskIcon
  }>
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
  enterModal: input.dialogue.map((step, index) => ({
    id: index + 1,
    title: step.title,
    message: step.message,
    background: schoolBackground,
    icon: step.icon || input.icon || lessonIcon,
    buttons: [
      index === input.dialogue.length - 1
        ? { text: step.button, type: 'success' as const }
        : { text: step.button, type: 'navigate' as const, id: index + 2 },
    ],
  })),
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
    description: 'Learn how to build, price, and arrange a Pokemon card deck.',
    button: 'Study Deck Setup',
    title: 'Deck Setup',
    dialogue: [
      {
        title: 'TCG Instructor',
        message:
          'The instructor accepts Gideon’s referral form without reacting to the words SECRET UNDERGROUND HEAD OFFICE. “A battle deck contains exactly fifteen unique Pokemon cards. Not fourteen, not sixteen, and no duplicates.”',
        button: 'How do I build one?',
      },
      {
        title: 'TCG Instructor',
        message:
          '“On the Trainer page, Auto Fill can build a legal deck from cards you own. For more control, open a Pokemon card in the CardDex and add it manually.”',
        button: 'Choose the card group',
      },
      {
        title: 'TCG Instructor',
        message:
          '“Choose the card group first, then save the deck for that group and format. Kanto uses Base Rules, so Underground battles require a Base-group deck.” He underlines Base three times. Apparently this has gone wrong before.',
        button: 'Learn the formats',
      },
      {
        title: 'TCG Instructor',
        message:
          '“Baby, Champions, and Masters allow total deck costs of 30, 55, and 85. Your fifteen cards must remain within the chosen limit.”',
        button: 'Review card costs',
      },
    ],
    message:
      'Card costs reflect what you bring: an evolving Basic costs 1, a Stage 1 costs 3, a Stage 2 costs 5, and a non-evolving Basic costs 5. EX, GX, V, and Radiant cards cost 10; the largest special cards cost 15. At battle start, place three Pokemon in front and three on the bench. The front row attacks while the bench waits to be promoted.',
  }),
  lesson({
    id: 'pewter-school-tcg-energy',
    name: 'TCG Lesson: Energy and Attacks',
    description: 'Learn how energy charges attacks and how turns flow.',
    button: 'Study Energy',
    title: 'Energy and Attacks',
    dialogue: [
      {
        title: 'TCG Instructor',
        message:
          'The instructor places an Energy card beside the board. “Every attack has an energy cost. If you cannot afford an attack, charge energy instead of staring at the card until it becomes cheaper.”',
        button: 'Learn attack pacing',
      },
      {
        title: 'TCG Instructor',
        message:
          '“Attacks can use up to 1 energy on turns 1 and 2, 2 on turns 3 and 4, 3 on turns 5 and 6, and 4 on turns 7 through 9. From turn 10, any attack cost is allowed.”',
        button: 'What about card stages?',
      },
      {
        title: 'TCG Instructor',
        message:
          '“Stage 1 cards unlock on turn 3 and Stage 2 on turn 5. Cards costing 10 unlock on turn 7; cards costing 15 wait until turn 10.” The strongest cards are apparently very committed to dramatic entrances.',
        button: 'Finish the turn',
      },
    ],
    message:
      'Charge when you need more energy. When you are finished acting, end the turn and let the opponent respond. Plan ahead: the cards and attacks available to both sides expand as the turn count rises.',
  }),
  lesson({
    id: 'pewter-school-tcg-effects',
    name: 'TCG Lesson: Weakness and Effects',
    description: 'Learn how to read weaknesses, retreat costs, and status effects.',
    button: 'Study Battle Effects',
    title: 'Weakness and Effects',
    dialogue: [
      {
        title: 'TCG Instructor',
        message:
          '“A large damage number is exciting,” the instructor says, “but type icons are often more important. Check the defending card’s Weakness and Resistance before choosing a target.”',
        button: 'Read the whole card',
      },
      {
        title: 'TCG Instructor',
        message:
          '“Attack text can add coin flips, healing, recoil, protection, status conditions, or damage to the bench. The damage number is only the beginning of the sentence.”',
        button: 'What if a card is hurt?',
      },
      {
        title: 'TCG Instructor',
        message:
          '“Compare the danger of staying active with the card’s retreat cost. A timely retreat preserves a useful Pokemon; a late retreat preserves paperwork.”',
        button: 'Review the lesson',
      },
    ],
    message:
      'Read type icons and attack text before committing. Weakness can turn a modest hit into a knockout, while Resistance, retreat costs, status conditions, and other effects decide whether a damaged Pokemon should remain active.',
  }),
  lesson({
    id: 'pewter-school-tcg-knockouts',
    name: 'TCG Lesson: Knockouts',
    description: 'Learn what happens when an active Pokemon is knocked out.',
    button: 'Study Knockouts',
    title: 'Knockouts and Promotion',
    dialogue: [
      {
        title: 'Headmaster',
        message:
          'The Headmaster takes over for the final lesson. “When an active Pokemon is knocked out, it leaves the front row. The empty position must be filled from your bench.”',
        button: 'Choose a replacement',
        icon: headmasterIcon,
      },
      {
        title: 'Headmaster',
        message:
          '“Promote a healthy card that can act at the current turn. Do not wait until the knockout to remember what is on your bench.” She taps the unused cards pointedly.',
        button: 'How does the battle end?',
        icon: headmasterIcon,
      },
      {
        title: 'Headmaster',
        message:
          '“The battle ends when one side can no longer continue. A strong front row wins turns; a prepared bench wins battles.”',
        button: 'Review the lesson',
        icon: headmasterIcon,
      },
    ],
    message:
      'When an active Pokemon is knocked out, promote one from the bench. Keep a healthy reserve ready, because the battle ends when one side can no longer continue.',
    icon: headmasterIcon,
  }),
  {
    id: 'pewter-school-tcg-pop-quiz',
    name: 'TCG Pop Quiz',
    description:
      'The Headmaster wants to confirm that Underground HQ did not send me all this way for nothing.',
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
        message:
          'The Headmaster straightens Gideon’s referral form. “Let us see whether your mysterious employer sent you here for an education or merely another stamp. How many unique Pokemon cards belong in a battle deck?”',
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
        message: '“Good. Of those fifteen cards, how many Pokemon begin in the front row?”',
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
        message: '“What must an attack have before it can be used?”',
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
        message: '“What should happen after an active Pokemon is knocked out?”',
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
        message:
          'The Headmaster lowers her notes. “One final question. Rules matter, but what is the most important thing in the game?”',
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
        message:
          'The Headmaster marks the answer with a neat red line. “Not quite. Underground referrals are unusual, but they are not exempt from revision. Review the lessons and begin again.”',
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
      message:
        '“You have the fundamentals,” the Headmaster says, signing the certificate. She gives you Promo Meowth, a card she designed herself. “Take that back to your cavernous employer and tell them you are ready for the practical portion.”',
      closeButtonText: 'Take Meowth',
    },
  },
]
