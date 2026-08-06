import { Task } from '../../types'

const undergroundBackground = '/backgrounds/kanto-underground.avif'
const maniacMale = { type: 'trainer' as const, id: 'tcg-maniac-m' }
const maniacFemale = { type: 'trainer' as const, id: 'tcg-maniac-f' }
const unfinishedBattleTraining = {
  type: 'task_completed' as const,
  targetId: 'underground-tcg-battle-wrapup',
  inverse: true,
}

const retryStep = (title: string, message: string) => ({
  id: 99,
  title,
  message,
  background: undergroundBackground,
  icon: maniacFemale,
  buttons: [
    { text: 'Try Again', type: 'navigate' as const, id: 1 },
    { text: 'Leave Training', type: 'fail' as const },
  ],
})

export const undergroundTccgTasks: Task[] = [
  {
    id: 'underground-tcg-basic-training',
    name: 'Basic Training',
    description:
      'This is all quite strange… Nobody seems to be acknowledging the pit. Is that fine?',
    category: 'Underground',
    subCategory: 'Kanto Underground',
    icon: maniacMale,
    background: undergroundBackground,
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Begin Training',
    chat: true,
    requirements: [{ type: 'task_completed', targetId: 'kanto-underground-somehow-deeper' }],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Basic Training',
        message:
          'Mina pins a badge to your shirt before you can object. “Welcome, {Trainer}! You are now part of one of the largest secret organizations beneath Kanto. First question: what is our purpose?”',
        background: undergroundBackground,
        icon: maniacFemale,
        buttons: [
          { text: 'Keep the pit supplied', type: 'navigate', id: 2 },
          { text: 'Dig Even Deeper', type: 'navigate', id: 99 },
          { text: 'Profit?', type: 'navigate', id: 99 },
        ],
      },
      {
        id: 2,
        title: 'Basic Training',
        message:
          '“Correct. Specifically with crystals. We tried compliments once.” Mina turns over the next card on her clipboard. “And where do TCG cards come from?”',
        background: undergroundBackground,
        icon: maniacFemale,
        buttons: [
          { text: 'You make them here', type: 'navigate', id: 3 },
          { text: 'The Pit', type: 'navigate', id: 99 },
          { text: 'Wild booster packs', type: 'navigate', id: 99 },
        ],
      },
      {
        id: 3,
        title: 'Basic Training',
        message:
          'Gideon gestures across the presses and packing tables. “We design them, print them, hide them in packs, and spread them around the world. Final question: why go to all that trouble?”',
        background: undergroundBackground,
        icon: maniacMale,
        buttons: [
          { text: 'To make trainers want them', type: 'navigate', id: 4 },
          { text: 'To improve cave morale', type: 'navigate', id: 99 },
          { text: 'Because the pit likes art', type: 'navigate', id: 99 },
        ],
      },
      {
        id: 4,
        title: 'Basic Training',
        message:
          '“Exactly,” Mina says. “Trainers already gather crystals. We make cards they cannot resist, and they bring the crystals to us. It saves an extraordinary amount of walking.” The pit rumbles approvingly. Or hungrily.',
        background: undergroundBackground,
        icon: maniacFemale,
        buttons: [{ text: 'That is the whole plan?', type: 'success' }],
      },
      retryStep(
        'Basic Training',
        'Mina makes a careful note on your form. “Not quite. Do not worry. The pit cannot see individual quiz results. As far as we know.”',
      ),
    ],
    exitModal: {
      background: undergroundBackground,
      title: 'The First Lesson',
      icon: maniacFemale,
      message:
        '“Make cards. Spread cards. Gather crystals. Feed pit,” Mina recites. “That is the entire operating model.” Gideon hands you a contribution slip. New recruits traditionally begin with 500 crystals. Tradition began several minutes ago.',
      closeButtonText: 'Find 500 Crystals',
    },
  },
  {
    id: 'underground-tcg-card-redistribution',
    name: 'Feeding the Pit',
    description: 'I’ve been promised something amazing if I can gather 500 crystals for the pit.',
    category: 'Underground',
    subCategory: 'Kanto Underground',
    icon: { type: 'item', id: 'card-crystalizer' },
    background: undergroundBackground,
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Throw Crystals',
    chat: true,
    requirements: [{ type: 'task_completed', targetId: 'underground-tcg-basic-training' }],
    criteria: [{ type: 'currency_owned', targetId: 'crystals', count: 500, consume: true }],
    rewards: [{ type: 'item', targetId: 'card-crystalizer', quantity: 1, dropChance: 100 }],
    enterModal: [
      {
        id: 1,
        title: 'Mina',
        message:
          'Mina weighs your crystals, stamps the contribution slip, and hands the full crate back to you. “Everything is in order. Please deliver them directly to the recipient.”',
        background: undergroundBackground,
        icon: maniacFemale,
        buttons: [{ text: 'Approach the Pit', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'The Pit',
        message: 'BRING THEM.',
        background: undergroundBackground,
        buttons: [{ text: 'Throw In the Crystals', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: 'The Pit',
        message:
          'The crystals disappear before they strike anything. A moment later, the darkness gives a deep and distinctly dissatisfied rumble.',
        background: undergroundBackground,
        buttons: [{ text: 'Contribution complete', type: 'success' }],
      },
    ],
    exitModal: {
      background: undergroundBackground,
      title: 'Crystals for the Pit',
      icon: { type: 'item', id: 'card-crystalizer' },
      message:
        '“Excellent work, {Trainer}!” Mina presents a Card Redistribution Box. Put duplicate cards inside and the box returns them to HQ for repacking. Collectors can then trade crystals for those cards all over again, while the box compensates you in Pokédollars. Gideon calls it recycling. The pit calls it insufficient.',
      closeButtonText: 'Take the Box',
    },
  },
  {
    id: 'underground-tcg-card-memory',
    name: 'Know Your Cards',
    description:
      'Apparently to be effective at spreading the word I need knowledge of the cards themselves.',
    category: 'Underground',
    subCategory: 'Kanto Underground',
    icon: { type: 'item', id: 'pack-base1' },
    background: undergroundBackground,
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Submit Inspection Notes',
    chat: true,
    requirements: [{ type: 'task_completed', targetId: 'underground-tcg-card-redistribution' }],
    criteria: [
      {
        type: 'game_result',
        targetId: 'underground-tcg-card-memory-game',
        battleStatus: 'win',
        count: 3,
      },
    ],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Mina',
        message:
          'Mina reviews your inspection notes with grave concentration. “Names, numbers, rarity, type, HP... all correct. You can now recognize the products we expect you to promote.”',
        background: undergroundBackground,
        icon: maniacFemale,
        buttons: [{ text: 'What happens next?', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Gideon',
        message:
          'A burst of cheering erupts from behind a stack of booster crates. Gideon looks toward it. “Some of the production staff invented a game using the cards. It was meant to demonstrate the product.”',
        background: undergroundBackground,
        icon: maniacMale,
        buttons: [{ text: 'Meant to?', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: 'Gideon',
        message:
          '“They discovered demonstrating it to one another was considerably easier than finding new customers.” Another cheer shakes the crates. “They have been refining the demonstration for some time.”',
        background: undergroundBackground,
        icon: maniacMale,
        buttons: [{ text: 'Show me the game', type: 'success' }],
      },
    ],
    exitModal: {
      background: undergroundBackground,
      title: 'A Game of Our Own',
      icon: maniacMale,
      message:
        'The staff version uses fifteen unique Pokemon cards. Trainer cards were included in the first draft, but the rules committee found them complicated and quietly stopped inviting them to meetings. “It is about the Pokemon anyway,” Gideon says, closing the minutes.',
      closeButtonText: 'Show Me the Game',
    },
  },
  {
    id: 'underground-tcg-deck-box',
    name: 'A Game of Our Own',
    description:
      'Mina wants to register a proper deck before sending me to learn the battle rules.',
    category: 'Underground',
    subCategory: 'Kanto Underground',
    icon: { type: 'item', id: 'deck-box' },
    background: undergroundBackground,
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Register a Deck',
    chat: true,
    requirements: [{ type: 'task_completed', targetId: 'underground-tcg-card-memory' }],
    criteria: [],
    rewards: [{ type: 'item', targetId: 'deck-box', quantity: 1, dropChance: 100 }],
    enterModal: [
      {
        id: 1,
        title: 'The Card Tables',
        message:
          'Beyond the crates, collectors crowd around three card tables. Nobody is packing boosters. Nobody is contacting trainers. Everyone appears to be having an excellent time.',
        background: undergroundBackground,
        icon: maniacMale,
        buttons: [{ text: 'Watch the Game', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Mina',
        message:
          '“The battle game was supposed to make the cards more desirable,” Mina says. “It worked beautifully. Some employees became so enthusiastic that they stopped distributing them.”',
        background: undergroundBackground,
        icon: maniacFemale,
        buttons: [{ text: 'Can they teach me?', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: 'Mina',
        message:
          'Mina looks at the occupied tables. “Not while the quarterly outreach backlog is this tall. Fortunately, Pewter School teaches the official rules. First, you will need somewhere to keep a legal deck.”',
        background: undergroundBackground,
        icon: maniacFemale,
        buttons: [{ text: 'Register a Deck', type: 'success' }],
      },
    ],
    exitModal: {
      background: undergroundBackground,
      title: 'Deck Registered',
      icon: { type: 'item', id: 'deck-box' },
      message:
        'Gideon registers the box under your name, card group, and battle format. “The school in Pewter has people who can explain the rest of the rules. We outsourced teaching after the staff tournament reached its ninth consecutive week.”',
      closeButtonText: 'Ask About the School',
    },
  },
  {
    id: 'underground-tcg-funding',
    name: 'Who Pays for All This?',
    description:
      'The card operation is much larger than I expected. Where is the funding coming from?',
    category: 'Underground',
    subCategory: 'Kanto Underground',
    icon: maniacFemale,
    background: undergroundBackground,
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Ask the Question',
    chat: true,
    requirements: [{ type: 'task_completed', targetId: 'underground-tcg-deck-box' }],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'A Well-Connected Operation',
        message:
          'Card presses cover the cavern floor. Finished packs leave in crates faster than you can count them. “Who pays for all this?” you ask. “The machines, the ink, the extremely long lift?”',
        background: undergroundBackground,
        icon: maniacFemale,
        buttons: [{ text: 'Wait for an answer', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'A Well-Connected Operation',
        message:
          'Mina seems surprised by the question. “The collectors do. Crystals come in, cards go out, and a sensible portion funds operations before the rest goes into the pit.” The pit makes a low noise. “A very small portion,” she corrects.',
        background: undergroundBackground,
        icon: maniacFemale,
        buttons: [{ text: 'How did this spread?', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: 'Gideon',
        message:
          '“We are exceptionally well connected,” Gideon says. “Packs reach shops, schools, researchers, Gym Leaders, and even the Pokemon League. Once the right people started handing them out, everybody assumed the TCG had always existed.”',
        background: undergroundBackground,
        icon: maniacMale,
        buttons: [{ text: 'The Gym Leaders agreed?', type: 'navigate', id: 4 }],
      },
      {
        id: 4,
        title: 'Gideon',
        message:
          '“We put them on the cards.” Gideon says this as though it settles every question. “They were delighted. Pewter School joined soon afterwards and now teaches the battle rules for us.”',
        background: undergroundBackground,
        icon: maniacMale,
        buttons: [{ text: 'That explains a lot', type: 'success' }],
      },
    ],
    exitModal: {
      background: undergroundBackground,
      title: 'Pewter Connections',
      icon: maniacMale,
      message:
        'Take your registered Base deck to Pewter School. Complete its four lessons and the Headmaster’s quiz, then return to Mina and Gideon for the practical portion of your training.',
      closeButtonText: 'Visit Pewter School',
    },
  },
  {
    id: 'underground-tcg-practice-briefing',
    name: 'The Practical Portion',
    description:
      'I passed the Pewter School quiz. Mina and Gideon are ready to arrange my first practice match.',
    category: 'Underground',
    subCategory: 'Kanto Underground',
    icon: maniacFemale,
    background: undergroundBackground,
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Report Back to HQ',
    chat: true,
    requirements: [
      { type: 'task_completed', targetId: 'pewter-school-tcg-pop-quiz' },
      unfinishedBattleTraining,
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Gideon',
        message:
          'Gideon examines your signed quiz certificate and holds it up to the light. “Fifteen cards, three in front, three on the bench. Excellent. Pewter has certified that you can read instructions.”',
        background: undergroundBackground,
        icon: maniacMale,
        buttons: [{ text: 'What is the practical?', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Mina',
        message:
          '“One supervised practice match,” Mina says. She looks toward the card tables. The chairs are empty, although several abandoned cups of tea are still warm.',
        background: undergroundBackground,
        icon: maniacFemale,
        buttons: [{ text: 'Where are the instructors?', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: 'Gideon',
        message:
          '“Cal, Marina, and Fern are our field outreach team,” Gideon says. “They may already be spreading the word.” A muffled cheer comes from somewhere behind the booster warehouse.',
        background: undergroundBackground,
        icon: maniacMale,
        buttons: [{ text: 'That sounded nearby', type: 'navigate', id: 4 }],
      },
      {
        id: 4,
        title: 'Mina',
        message:
          'Mina pulls a battered deck box from Lost Property. “We will discuss attendance later. For now, this is the training deck: fifteen inexpensive Basics and no unpleasant surprises beyond the usual ones.”',
        background: undergroundBackground,
        icon: maniacFemale,
        buttons: [{ text: 'Begin the Practice Match', type: 'success' }],
      },
    ],
    exitModal: {
      background: undergroundBackground,
      title: 'Lost-and-Found Practice',
      icon: { type: 'pokemon', id: '19' },
      message:
        'Arrange your Base Baby deck and play one practice match against HQ’s Lost-and-Found deck. It is legal, inexpensive, and only slightly smells of a flooded storage cupboard.',
      closeButtonText: 'Find the Practice Table',
    },
  },
  {
    id: 'underground-tcg-cal-outreach',
    name: 'Live Demonstration',
    description:
      'The practice match is complete, but the missing outreach team appears to be somewhere inside HQ.',
    category: 'Underground',
    subCategory: 'Kanto Underground',
    icon: maniacMale,
    background: undergroundBackground,
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Follow the Cheering',
    chat: true,
    requirements: [
      {
        type: 'game_result',
        targetId: 'underground-tcg-battle-tutorial',
        battleStatus: 'win',
        count: 1,
      },
      unfinishedBattleTraining,
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Mina',
        message:
          '“Practice complete,” Mina says. “Now our field team can show you how battles support outreach.” Another cheer erupts behind a wall of unopened shipping crates.',
        background: undergroundBackground,
        icon: maniacFemale,
        buttons: [{ text: 'Look Behind the Crates', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Cal',
        message:
          'Cal is crouched at a card table with a Fire deck and six spectators, all wearing Underground staff badges. “Perfect timing! You can join the live product demonstration.”',
        background: undergroundBackground,
        icon: maniacMale,
        buttons: [{ text: 'Who is the customer?', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: 'Cal',
        message:
          'Cal looks around the table. “We are testing enthusiasm before exposing the demonstration to the public. Enthusiasm remains extremely high.” The same six employees nod enthusiastically.',
        background: undergroundBackground,
        icon: maniacMale,
        buttons: [{ text: 'Test the Fire Deck', type: 'success' }],
      },
    ],
    exitModal: {
      background: undergroundBackground,
      title: 'Fire Deck Demonstration',
      icon: { type: 'pokemon', id: '6' },
      message:
        'Cal slides his Fire deck into position. Beating his “demonstration” may be the fastest way to discover how long the outreach team has been hiding down here.',
      closeButtonText: 'Challenge Cal',
    },
  },
  {
    id: 'underground-tcg-marina-outreach',
    name: 'Quality Assurance',
    description: 'Cal says Marina approved the team’s highly internal approach to public outreach.',
    category: 'Underground',
    subCategory: 'Kanto Underground',
    icon: maniacFemale,
    background: undergroundBackground,
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Find Marina',
    chat: true,
    requirements: [
      {
        type: 'game_result',
        targetId: 'underground-tcg-battle-fire',
        battleStatus: 'win',
        count: 1,
      },
      unfinishedBattleTraining,
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Cal',
        message:
          'Cal gathers his cards with wounded dignity. “The deck performed exactly as Marina predicted. She is supervising the project from the next table.”',
        background: undergroundBackground,
        icon: maniacMale,
        buttons: [{ text: 'Ask the Supervisor', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Marina',
        message:
          'Marina sits beside a Water deck and a tall stack of evaluation forms. Every visible box is marked EXCELLENT. The comments section says FUN in increasingly elaborate handwriting.',
        background: undergroundBackground,
        icon: maniacFemale,
        buttons: [{ text: 'Is this quality assurance?', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: 'Marina',
        message:
          '“Continuous quality assurance,” Marina says. “If we stop playing, how can we know the cards are still fun?” She places the Water deck on the table before you can answer.',
        background: undergroundBackground,
        icon: maniacFemale,
        buttons: [{ text: 'Audit the Water Deck', type: 'success' }],
      },
    ],
    exitModal: {
      background: undergroundBackground,
      title: 'Water Deck Quality Check',
      icon: { type: 'pokemon', id: '9' },
      message:
        'Marina has recorded nine weeks of excellent internal feedback and zero conversations with outside trainers. Challenge her Water deck and continue the audit.',
      closeButtonText: 'Challenge Marina',
    },
  },
  {
    id: 'underground-tcg-fern-outreach',
    name: 'A Captive Audience',
    description:
      'Marina insists Fern has the outreach schedule. It may currently be serving another purpose.',
    category: 'Underground',
    subCategory: 'Kanto Underground',
    icon: maniacMale,
    background: undergroundBackground,
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Inspect the Schedule',
    chat: true,
    requirements: [
      {
        type: 'game_result',
        targetId: 'underground-tcg-battle-water',
        battleStatus: 'win',
        count: 1,
      },
      unfinishedBattleTraining,
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Marina',
        message:
          'Marina adds your result to the excellent pile. “Fern organizes the actual outreach. He has the contact list, distribution routes, and quarterly schedule.” She points toward an even larger crowd.',
        background: undergroundBackground,
        icon: maniacFemale,
        buttons: [{ text: 'Find Fern', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Fern',
        message:
          'Fern has pinned the outreach schedule to a board. Every shop, Gym, and school has been crossed out and replaced with names from HQ. Lines between them form an immaculate tournament bracket.',
        background: undergroundBackground,
        icon: maniacMale,
        buttons: [{ text: 'These are all employees', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: 'Fern',
        message:
          '“A captive audience,” Fern says proudly. “Attendance is perfect, travel costs are zero, and everybody already understands the product.” He does not appear to hear the problem with that sentence.',
        background: undergroundBackground,
        icon: maniacMale,
        buttons: [{ text: 'Finish the Bracket', type: 'success' }],
      },
    ],
    exitModal: {
      background: undergroundBackground,
      title: 'Grass Deck Final',
      icon: { type: 'pokemon', id: '3' },
      message:
        'Fern has placed you in the final against his Grass deck. Win, and Mina may finally be able to send the outreach team above ground.',
      closeButtonText: 'Challenge Fern',
    },
  },
  {
    id: 'underground-tcg-battle-wrapup',
    name: 'Back to Work',
    description:
      'Cal, Marina, and Fern have completed their extremely internal outreach tournament.',
    category: 'Underground',
    subCategory: 'Kanto Underground',
    icon: maniacMale,
    background: undergroundBackground,
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Design My First Card',
    chat: true,
    requirements: [
      {
        type: 'game_result',
        targetId: 'underground-tcg-battle-fire',
        battleStatus: 'win',
        count: 1,
      },
      {
        type: 'game_result',
        targetId: 'underground-tcg-battle-water',
        battleStatus: 'win',
        count: 1,
      },
      {
        type: 'game_result',
        targetId: 'underground-tcg-battle-grass',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Mina',
        message:
          'Mina assembles Cal, Marina, and Fern beside the pit. “The good news is that {Trainer} now understands the battle game. The less good news is that your entire audience already worked here.”',
        background: undergroundBackground,
        icon: maniacFemale,
        buttons: [{ text: 'Review the results', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Cal',
        message:
          '“Enthusiasm increased,” Cal offers. Marina raises her stack of excellent evaluations. Fern points out that the tournament achieved one hundred percent staff participation.',
        background: undergroundBackground,
        icon: maniacMale,
        buttons: [{ text: 'And how many new collectors?', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: 'Marina',
        message:
          'The three field agents consult one another. “None,” Marina admits. Somewhere behind them, an unattended packing machine runs out of empty wrappers.',
        background: undergroundBackground,
        icon: maniacFemale,
        buttons: [{ text: 'Wait for Mina', type: 'navigate', id: 4 }],
      },
      {
        id: 4,
        title: 'The Pit',
        message: 'LESS PLAYING. MORE CRYSTALS.',
        background: undergroundBackground,
        buttons: [{ text: 'Everyone heard that', type: 'navigate', id: 5 }],
      },
      {
        id: 5,
        title: 'Mina',
        message:
          'The outreach team vanishes toward the lift with crates under both arms. Mina checks three names off her clipboard. “Excellent. That concludes the practical portion.”',
        background: undergroundBackground,
        icon: maniacFemale,
        buttons: [{ text: 'Do battles gather crystals?', type: 'success' }],
      },
    ],
    exitModal: {
      background: undergroundBackground,
      title: 'Keep Your Eye on the Prize',
      icon: maniacMale,
      message:
        '“Battles make the cards exciting,” Gideon explains, “but playing the same colleagues forever produces no crystals. New cards create new demand. New demand brings new collectors.” He hands you an art brief. Bring five portions of dried yellow dye and design your first card.',
      closeButtonText: 'Design My First Card',
    },
  },
  {
    id: 'underground-tcg-wrapup',
    name: 'The Basics Are Yours',
    description: 'Mina and Gideon want to inspect the first card produced during my training.',
    category: 'Underground',
    subCategory: 'Kanto Underground',
    icon: maniacMale,
    background: undergroundBackground,
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Finish Basic Training',
    chat: true,
    requirements: [
      {
        type: 'game_result',
        targetId: 'underground-tcg-art-academy',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Gideon',
        message:
          'Gideon studies your Pikachu card artwork from several angles. “Recognizable subject, strong colour, and exactly enough charm to make somebody open another pack.”',
        background: undergroundBackground,
        icon: maniacMale,
        buttons: [{ text: 'Show Mina', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Mina',
        message:
          'Mina slides Promo No. 1 into your binder. “This is how the cycle grows. A new card creates curiosity. Curiosity creates collectors. Collectors arrive carrying crystals.”',
        background: undergroundBackground,
        icon: maniacFemale,
        buttons: [{ text: 'And then the pit?', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: 'The Pit',
        message: 'MAKE MORE.',
        background: undergroundBackground,
        buttons: [{ text: 'Of course', type: 'navigate', id: 4 }],
      },
      {
        id: 4,
        title: 'Mina',
        message:
          '“That is also the performance review,” Mina says, adding a final stamp to your membership form. Nobody had mentioned there would be a performance review.',
        background: undergroundBackground,
        icon: maniacFemale,
        buttons: [{ text: 'Complete Orientation', type: 'success' }],
      },
    ],
    exitModal: {
      background: undergroundBackground,
      title: 'Basic Training Complete',
      icon: maniacMale,
      message:
        'Basic Training is complete. Build your collection, spread cards beyond HQ, design sets people cannot resist, and keep the crystals moving toward the pit. Gideon assures you that the organization will know how you are doing. He does not explain how.',
      closeButtonText: 'Keep Collecting',
    },
  },
  {
    id: 'underground-tcg-my-very-own-set',
    name: 'My Very Own Set',
    description:
      'The best way to practise designing a set is to copy an existing one and change it slightly.',
    category: 'Underground',
    subCategory: 'Kanto Underground',
    icon: { type: 'item', id: 'binder-base4' },
    background: undergroundBackground,
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Begin Set Design',
    chat: true,
    requirements: [{ type: 'task_completed', targetId: 'underground-tcg-wrapup' }],
    criteria: [],
    rewards: [{ type: 'item', targetId: 'binder-base4', quantity: 1, dropChance: 100 }],
    enterModal: [
      {
        id: 1,
        title: 'Mina',
        message:
          'Mina turns through examples from the Base and Jungle collections while Gideon records the card totals twice. “You have seen what collectors expect, which means you are ready to design a set of your own.”',
        background: undergroundBackground,
        icon: maniacFemale,
        buttons: [{ text: 'Where do I start?', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Gideon',
        message:
          'Gideon wheels out boxes of existing artwork. “Originality is risky during training. Begin with a proven set, reuse the strongest cards, and make one meaningful change.”',
        background: undergroundBackground,
        icon: maniacMale,
        buttons: [{ text: 'What change?', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: 'Mina',
        message:
          'Mina reveals a binder stamped BASE SET 2. “We added a two. It tested exceptionally well.” She waits for this to impress you.',
        background: undergroundBackground,
        icon: maniacFemale,
        buttons: [{ text: 'A stroke of genius', type: 'success' }],
      },
    ],
    exitModal: {
      background: undergroundBackground,
      title: 'A New Set',
      icon: maniacFemale,
      message:
        'The Base Set 2 binder is yours. Fill all 130 sleeves and return it to HQ. The cards may look familiar, but Mina insists the number makes the collecting experience entirely new.',
      closeButtonText: 'Open the New Binder',
    },
  },
  {
    id: 'underground-tcg-base4-complete',
    name: 'A Stroke of Genius',
    description: 'Mina and Gideon want to inspect the complete Base Set 2 collection.',
    category: 'Underground',
    subCategory: 'Kanto Underground',
    icon: { type: 'pokemon', id: '137' },
    background: undergroundBackground,
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Present the Set',
    chat: true,
    requirements: [{ type: 'task_completed', targetId: 'underground-tcg-my-very-own-set' }],
    criteria: [{ type: 'card_collected_set', targetId: 'base4', count: 130, unique: true }],
    rewards: [
      { type: 'currency', targetId: 'pokedollars', quantity: 20000 },
      {
        type: 'card',
        quantity: 1,
        dropChance: 100,
        cardDrawParams: { allowedCardIds: ['basep-15'], guaranteed: true },
      },
    ],
    enterModal: [
      {
        id: 1,
        title: 'Gideon',
        message:
          'Gideon checks all 130 cards against a list, then checks the list against a second, identical list. “Complete. Not one missing card, and several that collectors insist look better the second time.”',
        background: undergroundBackground,
        icon: maniacMale,
        buttons: [{ text: 'How did the set perform?', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Mina',
        message:
          'Mina produces a sales chart that climbs sharply toward the cavern ceiling. “Collectors recognized their favourites, noticed the new number, and immediately decided they needed all of them again.”',
        background: undergroundBackground,
        icon: maniacFemale,
        buttons: [{ text: 'And the crystals?', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: 'The Pit',
        message: 'ACCEPTABLE. MORE.',
        background: undergroundBackground,
        buttons: [{ text: 'High praise', type: 'success' }],
      },
    ],
    exitModal: {
      background: undergroundBackground,
      title: 'A Stroke of Genius',
      icon: { type: 'pokemon', id: '137' },
      message:
        'Reused artwork, one additional number, and an entirely renewed appetite for collecting. Mina awards you 20,000 Pokédollars and Promo Cool Porygon while the next shipment of crystals rolls toward the pit.',
      closeButtonText: 'Accept the Reward',
    },
  },
  {
    id: 'underground-tcg-booster-box-manufacturing',
    name: 'Profit Time!',
    description: 'Now were talking. Minas going to show me how to get in on the action.',
    category: 'Underground',
    subCategory: 'Kanto Underground',
    icon: { type: 'item', id: 'pack-base4' },
    background: undergroundBackground,
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Review Manufacturing',
    chat: true,
    requirements: [{ type: 'task_completed', targetId: 'underground-tcg-my-very-own-set' }],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Mina',
        message: 'I see you eyeing up those crates, you want in on the action do you?',
        background: undergroundBackground,
        icon: maniacFemale,
        buttons: [{ text: 'Kinda...', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Gideon',
        message:
          'Well! Its simple enough, Once you complete a set yourself, we will go ahead and assume you have full knowledge of it and approve you for manufacturing',
        background: undergroundBackground,
        icon: maniacMale,
        buttons: [{ text: 'Go on', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: 'Mina',
        message:
          'To summarise, finish a set, make your own packs, enough for a booster box obviously were not shipping singles then bring them back here and youll be paid for your hard work.',
        background: undergroundBackground,
        icon: maniacFemale,
        buttons: [{ text: 'How much?', type: 'success' }],
      },
    ],
    exitModal: {
      background: undergroundBackground,
      title: 'Booster Box Manufacturing',
      icon: { type: 'item', id: 'pack-base4' },
      message:
        'The production rule is simple: thirty-six matching Booster Packs make one Booster Box. Finish a set binder, fill the order, and send the crate upstairs. HQ will pay 8,000 Pokédollars for each completed shipment.',
      closeButtonText: 'Return to the Presses',
    },
  },
]
