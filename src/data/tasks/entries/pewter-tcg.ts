import { Task, TaskIcon } from '../../types'
import { UNDERGROUND_SOCIETY_GUILD_ID } from '@/data/guilds/underground-society'

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
          '“Choose a card series and build one deck for it. Kanto battles use Base cards, so Underground battles need a Base-series deck.” He underlines Base three times. Apparently this has gone wrong before.',
        button: 'Learn the deck limit',
      },
      {
        title: 'TCG Instructor',
        message:
          '“Every series uses the same limit: fifteen unique Pokémon cards with a total cost of 60 or less.”',
        button: 'Review card costs',
      },
    ],
    message:
      'Card costs reflect what you bring: a Basic that can evolve costs 1, a Stage 1 costs 3, a Stage 2 costs 5, and a Basic that cannot evolve costs 5. EX, GX, V, and Radiant cards cost 10; the largest special cards cost 15. Each battle opens with three cards in hand; if none is Basic, the hand is reshuffled and redrawn until it contains one. Choose 1 to 3 Basic Pokémon for the front row. The board has three front slots and three Bench slots, but you must fill all front slots before playing Pokémon onto the Bench.',
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
          'The instructor places five Energy counters beside the board. “Energy is a shared pool, not cards in your deck, hand, or discard. Every attack has an Energy cost. If you cannot afford an attack, Charge to add two Energy instead of staring at the card until it becomes cheaper.”',
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
        button: 'How does a turn end?',
      },
      {
        title: 'TCG Instructor',
        message:
          '“You automatically draw one card at the start of each turn if your deck has one. Playing a Basic from your hand and evolving from a card in your hand are free actions. Attacking or Charging ends your turn; a specific card effect can also say that it ends your turn.”',
        button: 'Finish the turn',
      },
    ],
    message:
      'Both sides start with 5 Energy; the shared pool holds up to 12. Charge adds 2 Energy and ends your turn; at the cap, it simply ends the turn. Attacking also ends your turn, while playing a Basic, evolving, or retreating does not. You draw one card automatically at the beginning of each turn unless your deck is empty. Attack costs unlock gradually: 1 Energy on turns 1–2, 2 on turns 3–4, 3 on turns 5–6, 4 on turns 7–9, then any cost from turn 10.',
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
          '“Supported attack effects can add coin flips, healing, recoil, protection, status conditions, or damage to the Bench. The damage number is only the beginning of the sentence.”',
        button: 'What if a card is hurt?',
      },
      {
        title: 'TCG Instructor',
        message:
          '“Compare the danger of staying Active with the card’s Retreat Cost. Retreat spends that much from your shared Energy pool, but does not end your turn. A timely retreat preserves a useful Pokémon; a late retreat preserves paperwork.”',
        button: 'Review the lesson',
      },
    ],
    message:
      'Read type icons and supported attack text before committing. Weakness can turn a modest hit into a Knockout, while Resistance, Retreat Cost, status conditions, and other effects decide whether a damaged Pokémon should remain Active.',
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
          'The Headmaster takes over for the final lesson. “When an Active Pokémon is Knocked Out, promote one from your Bench if you have one. While another Pokémon remains in play, a Basic from your hand can fill an open front slot for free.”',
        button: 'What if I have no reserve?',
        icon: headmasterIcon,
      },
      {
        title: 'Headmaster',
        message:
          '“A Pokémon in your hand cannot save an empty field. You lose if you have no living Pokémon in play, or when six of your Pokémon have been Knocked Out. Your opponent loses by the same rules.” She taps the unused cards pointedly.',
        button: 'How does the battle end?',
        icon: headmasterIcon,
      },
      {
        title: 'Headmaster',
        message:
          '“Keep a healthy reserve ready. Your Bench can replace a Knocked Out front-row Pokémon, and a Basic from your hand can fill an open front slot while another Pokémon remains in play. But six Knockouts or no living Pokémon on the field ends the battle.”',
        button: 'Review the lesson',
        icon: headmasterIcon,
      },
    ],
    message:
      'Promote from the Bench when a front Pokémon is Knocked Out if a reserve is available. While another Pokémon remains in play, you may also play a Basic from your hand into an open front slot for free; fill all three front slots before adding Pokémon to the Bench. A side loses when it has no living Pokémon in play or reaches six Knockouts.',
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
      {
        type: 'guild_xp',
        targetId: UNDERGROUND_SOCIETY_GUILD_ID,
        quantity: 100,
        dropChance: 100,
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
        message: '“Good. How many slots are in the front row?”',
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
        message: '“What can make you lose a battle?”',
        background: schoolBackground,
        icon: headmasterIcon,
        buttons: [
          { text: 'No living Pokémon in play or six Knockouts', type: 'navigate', id: 5 },
          { text: 'An empty deck', type: 'navigate', id: 99 },
          { text: 'One Pokémon is Knocked Out', type: 'navigate', id: 99 },
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
