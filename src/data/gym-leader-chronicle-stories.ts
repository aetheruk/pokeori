import type { ExpeditionActivityType } from '@/data/expeditions/types'
import type { KantoGymChronicleKey } from '@/data/gym-leader-chronicles'
import type { TaskIcon } from '@/data/tasks/types'

export interface ChronicleDialogueLine {
  speaker: string
  message: string
  icon?: TaskIcon
  background?: string
}

export interface ChronicleNarrativeScene {
  id: string
  title: string
  description: string
  background: string
  dialogue: ChronicleDialogueLine[]
}

export interface ChronicleActivityRef {
  type: Extract<ExpeditionActivityType, 'task' | 'battle' | 'game'>
  id: string
}

export interface KantoGymChronicleStory {
  scenes: ChronicleNarrativeScene[]
  path: ChronicleActivityRef[]
}

const trainer = (id: string): TaskIcon => ({ type: 'trainer', id })
const local = (id: string): TaskIcon => ({ type: 'local', id })
const task = (id: string): ChronicleActivityRef => ({ type: 'task', id })
const battle = (id: string): ChronicleActivityRef => ({ type: 'battle', id })
const game = (id: string): ChronicleActivityRef => ({ type: 'game', id })

const brockHome = '/backgrounds/chronicle-brock-family-kitchen.avif'
const brockGym = '/backgrounds/chronicle-brock-neglected-gym.avif'
const mistyTheater = '/backgrounds/chronicle-misty-water-theater.avif'
const mistyCape = '/backgrounds/chronicle-misty-cerulean-cape.avif'
const surgeStreets = '/backgrounds/chronicle-surge-blackout-streets.avif'
const surgeShelter = '/backgrounds/chronicle-surge-gym-shelter.avif'
const surgeTransport = '/backgrounds/chronicle-surge-storm-transport.avif'
const erikaExhibition = '/backgrounds/chronicle-erika-flower-exhibition.avif'
const erikaGreenhouse = '/backgrounds/chronicle-erika-greenhouse.avif'
const kogaCourtyard = '/backgrounds/chronicle-koga-training-courtyard.avif'
const kogaRooftops = '/backgrounds/chronicle-koga-fuchsia-rooftops.avif'
const kogaApothecary = '/backgrounds/chronicle-koga-apothecary.avif'
const sabrinaRoom = '/backgrounds/chronicle-sabrina-childhood-room.avif'
const sabrinaMind = '/backgrounds/chronicle-sabrina-quiet-mindscape.avif'
const sabrinaDojo = '/backgrounds/gym-fighting.avif'
const blaineLab = '/backgrounds/chronicle-blaine-cinnabar-lab.avif'
const blaineQuiz = '/backgrounds/chronicle-blaine-abandoned-quiz-room.avif'
const giovanniOffice = '/backgrounds/chronicle-giovanni-viridian-office.avif'
const giovanniHome = '/backgrounds/chronicle-giovanni-family-dining-room.avif'

export const KANTO_GYM_CHRONICLE_STORIES: Record<
  KantoGymChronicleKey,
  KantoGymChronicleStory
> = {
  brock: {
    scenes: [
      {
        id: 'breakfast-without-flint',
        title: 'One Place Empty',
        description: 'Brock keeps breakfast moving while nobody mentions the empty chair.',
        background: brockHome,
        dialogue: [
          { speaker: 'Forrest', message: "Dad's plate is getting cold again.", icon: trainer('youngster') },
          { speaker: 'Brock', message: "Then Geodude can have the toast. Shoes on, bags packed. I have the Gym keys today." },
          { speaker: 'Forrest', message: 'You had them yesterday too.', icon: trainer('youngster') },
        ],
      },
      {
        id: 'note-under-the-bowl',
        title: 'No Return Date',
        description: 'A folded note explains why Flint has not come home.',
        background: brockHome,
        dialogue: [
          { speaker: 'Brock', message: "The note was under the sugar bowl, where the little ones would not find it. Flint had gone to search for himself. He had not written when he would be back." },
          { speaker: 'Forrest', message: 'Are you going after him?', icon: trainer('youngster') },
          { speaker: 'Brock', message: 'No. I am making lunch.' },
        ],
      },
      {
        id: 'onix-will-not-eat',
        title: 'The Quietest One',
        description: "Brock notices that Onix has stopped eating whenever the children argue.",
        background: brockGym,
        dialogue: [
          { speaker: 'Brock', message: "Onix refused every mineral block I offered. It only settled when the house went quiet. I knew that look. It was waiting for the next thing to break." },
          { speaker: 'Forrest', message: 'Maybe it is worried about you.', icon: trainer('youngster') },
          { speaker: 'Brock', message: 'It has enough to worry about.' },
        ],
      },
      {
        id: 'inspection-at-noon',
        title: 'Inspection at Noon',
        description: 'The League arrives before Brock can make the neglected Gym presentable.',
        background: brockGym,
        dialogue: [
          { speaker: 'League Examiner Mara', message: 'The licence is in Flint Harrison\'s name. Where is he?', icon: trainer('expert-f') },
          { speaker: 'Brock', message: 'Unavailable. I know the teams, the safety rules, and every crack in this floor.' },
          { speaker: 'Mara', message: 'Knowing where it breaks is not the same as being ready to hold it.', icon: trainer('expert-f') },
        ],
      },
      {
        id: 'letter-in-the-locker',
        title: 'The Other Future',
        description: 'Forrest finds the breeder-course letter Brock has hidden in a locker.',
        background: brockGym,
        dialogue: [
          { speaker: 'Forrest', message: 'You were accepted. You told us they had not written back.', icon: trainer('youngster') },
          { speaker: 'Brock', message: 'The course starts in another region. Somebody has to stay.' },
          { speaker: 'Forrest', message: 'You keep saying somebody when you mean you.', icon: trainer('youngster') },
        ],
      },
      {
        id: 'forrest-draws-a-line',
        title: 'Not Another Parent',
        description: 'Forrest refuses to let Brock turn responsibility into another disappearance.',
        background: brockGym,
        dialogue: [
          { speaker: 'Forrest', message: 'We need a brother. We do not need you pretending to be Dad better than Dad did.', icon: trainer('youngster') },
          { speaker: 'Brock', message: 'I wanted to tell him he was too young to understand. Instead I heard myself asking how he could help.' },
          { speaker: 'Forrest', message: 'Start by giving me a key.', icon: trainer('youngster') },
        ],
      },
      {
        id: 'the-family-meeting',
        title: 'Every Hand Raised',
        description: 'The Harrison children divide the work Brock had claimed as his alone.',
        background: brockHome,
        dialogue: [
          { speaker: 'Brock', message: 'Forrest took the evening feed. The twins claimed sweeping. Even the youngest raised a hand for berry sorting.' },
          { speaker: 'The Twins', message: 'You still cook. Nobody voted on that.', icon: trainer('twins') },
          { speaker: 'Brock', message: 'For the first time since Flint left, the empty chair did not decide where everyone else sat.' },
        ],
      },
      {
        id: 'the-open-manual',
        title: 'A Page Kept Open',
        description: 'Brock accepts the Gym without throwing away the future he wanted.',
        background: brockHome,
        dialogue: [
          { speaker: 'Mara', message: 'The temporary licence is yours, if you still want it.', icon: trainer('expert-f') },
          { speaker: 'Brock', message: 'I did. That night I put the breeder manual beside the Gym ledger instead of back in the locker.' },
          { speaker: 'Brock', message: 'Responsibility could be shared. Maybe a dream could wait without being buried.' },
        ],
      },
    ],
    path: [
      task('breakfast-without-flint'),
      game('keep-morning-moving'),
      task('note-under-the-bowl'),
      task('onix-will-not-eat'),
      task('inspection-at-noon'),
      battle('first-challenger'),
      task('letter-in-the-locker'),
      game('repair-the-gym-wall'),
      task('forrest-draws-a-line'),
      battle('league-examiner'),
      task('the-family-meeting'),
      task('the-open-manual'),
    ],
  },
  misty: {
    scenes: [
      {
        id: 'smallest-name-on-the-poster',
        title: 'Fourth on the Poster',
        description: 'Misty rehearses beneath a poster that makes her look like an afterthought.',
        background: mistyTheater,
        dialogue: [
          { speaker: 'Daisy', message: 'Smile when the spotlight reaches you. Not before.', icon: trainer('swimmer-f') },
          { speaker: 'Misty', message: 'It reaches me for eight seconds.' },
          { speaker: 'Violet', message: 'Then make them a beautiful eight seconds.', icon: trainer('beauty') },
        ],
      },
      {
        id: 'the-shape-in-the-water',
        title: 'A Fin Below the Stage',
        description: 'A rehearsal disturbance brings Misty face to face with an old fear.',
        background: mistyTheater,
        dialogue: [
          { speaker: 'Misty', message: 'The music stopped. Something struck the underside of the stage, and a red fin cut through the bubbles.' },
          { speaker: 'Lily', message: 'Misty, move!', icon: trainer('beauty') },
          { speaker: 'Misty', message: 'I could command any Water Pokémon in that pool. I could not make my legs move for Gyarados.' },
        ],
      },
      {
        id: 'eight-seconds-of-silence',
        title: 'After the Curtain',
        description: 'The sisters save the show, then say exactly the wrong thing backstage.',
        background: mistyTheater,
        dialogue: [
          { speaker: 'Daisy', message: 'Nobody in the audience noticed. We covered it.', icon: trainer('swimmer-f') },
          { speaker: 'Misty', message: 'You always cover me. Then you tell everyone how much work it is.' },
          { speaker: 'Daisy', message: 'Because you keep trying to prove you do not need us.', icon: trainer('swimmer-f') },
        ],
      },
      {
        id: 'the-cape-at-night',
        title: 'No Audience',
        description: 'Misty runs to Cerulean Cape and hears frightened Pokémon below the rocks.',
        background: mistyCape,
        dialogue: [
          { speaker: 'Misty', message: 'At the Cape there were no posters, no spotlights, and nobody to compare me with. Then I heard a Horsea crying from a tide pool.' },
          { speaker: 'Misty', message: 'I told it I was not frightened. It stared at my shaking hands.' },
        ],
      },
      {
        id: 'horseas-trust',
        title: "Horsea's Trust",
        description: 'Helping Horsea makes Misty admit what she could not say at home.',
        background: mistyCape,
        dialogue: [
          { speaker: 'Misty', message: 'The rocks had trapped it, but it still let me lift it into deeper water.' },
          { speaker: 'Misty', message: 'I said the truth out loud because there was nobody there to use it against me. Gyarados terrified me. My sisters did too, sometimes.' },
          { speaker: 'Daisy', message: 'Only sometimes?', icon: trainer('swimmer-f') },
        ],
      },
      {
        id: 'daisy-came-looking',
        title: 'The Sister Who Followed',
        description: 'Daisy finds Misty and refuses to let another argument end in disappearance.',
        background: mistyCape,
        dialogue: [
          { speaker: 'Daisy', message: 'I was angry. I was not finished being your sister.', icon: trainer('swimmer-f') },
          { speaker: 'Misty', message: 'You are very good at being a star. You are awful at saying sorry.' },
          { speaker: 'Daisy', message: 'Battle me. I communicate better with a Goldeen.', icon: trainer('swimmer-f') },
        ],
      },
      {
        id: 'not-the-same-dream',
        title: 'Different Water',
        description: 'The sisters finally admit that they have been competing for different things.',
        background: mistyCape,
        dialogue: [
          { speaker: 'Daisy', message: 'I thought you wanted my place in the show.', icon: trainer('swimmer-f') },
          { speaker: 'Misty', message: 'I wanted you to stop deciding my place before I got there.' },
          { speaker: 'Daisy', message: 'Then go somewhere we cannot decide it for you.', icon: trainer('swimmer-f') },
        ],
      },
      {
        id: 'the-road-out-of-cerulean',
        title: 'Leaving by Choice',
        description: 'Misty leaves Cerulean to become a Water Trainer on her own terms.',
        background: mistyCape,
        dialogue: [
          { speaker: 'Misty', message: 'I packed before sunrise. Daisy left travel money by the door and pretended it had always been there.' },
          { speaker: 'Violet', message: 'Your name will be bigger when you come back.', icon: trainer('beauty') },
          { speaker: 'Misty', message: 'I told her I might make my own poster.' },
        ],
      },
      {
        id: 'the-scratched-earring',
        title: 'One Scratched Earring',
        description: 'Misty keeps an imperfect reminder of the night she stopped measuring herself against her sisters.',
        background: mistyTheater,
        dialogue: [
          { speaker: 'Misty', message: 'Daisy gave me one of the earrings from the cancelled finale. It was scratched where it hit the tiles.' },
          { speaker: 'Misty', message: 'I kept it because it was mine, not because it matched anything.' },
        ],
      },
    ],
    path: [
      task('smallest-name-on-the-poster'),
      game('finale-rehearsal'),
      task('the-shape-in-the-water'),
      task('eight-seconds-of-silence'),
      task('the-cape-at-night'),
      game('listen-across-the-water'),
      task('horseas-trust'),
      battle('cape-gyarados'),
      task('daisy-came-looking'),
      battle('daisys-challenge'),
      task('not-the-same-dream'),
      task('the-road-out-of-cerulean'),
      task('the-scratched-earring'),
    ],
  },
  surge: {
    scenes: [
      {
        id: 'the-drill',
        title: 'Again, Faster',
        description: 'Surge runs a civilian emergency drill as if the Gym were still a military transport.',
        background: surgeShelter,
        dialogue: [
          { speaker: 'Lt. Surge', message: 'Thirty seconds from alarm to shelter. Mako, your team took forty-two.' },
          { speaker: 'Mako', message: 'They are electricians, Surge. They are not your old flight crew.', icon: trainer('engineer') },
          { speaker: 'Lt. Surge', message: 'A live wire does not care what uniform you wear.' },
        ],
      },
      {
        id: 'when-the-city-went-dark',
        title: 'The Real Alarm',
        description: 'A storm cuts Vermilion power and turns the rehearsal into an emergency.',
        background: surgeStreets,
        dialogue: [
          { speaker: 'Mako', message: 'Harbour grid is down. The Center is on batteries and the east substation is flashing.', icon: trainer('engineer') },
          { speaker: 'Lt. Surge', message: 'Then why are you standing here? Move!' },
          { speaker: 'Lt. Surge', message: 'The breaker sparked. For half a second I was back over open water, counting seats that would stay empty.' },
        ],
      },
      {
        id: 'the-empty-seats',
        title: 'Names, Not Numbers',
        description: 'The failed circuit brings back the crew Surge never speaks about.',
        background: surgeTransport,
        dialogue: [
          { speaker: 'Lt. Surge', message: 'Command taught us to count fuel, distance, weight, and acceptable losses.' },
          { speaker: 'Mako', message: 'You still count people that way when you are scared.', icon: trainer('engineer') },
          { speaker: 'Lt. Surge', message: 'I ordered him back to work. He did not salute.' },
        ],
      },
      {
        id: 'the-gym-becomes-a-shelter',
        title: 'Open the Doors',
        description: 'Vermilion residents crowd into the Gym while the storm worsens.',
        background: surgeShelter,
        dialogue: [
          { speaker: 'Lt. Surge', message: 'We cleared the battle floor and ran lanterns along the walls. Every new arrival looked at me for orders.' },
          { speaker: 'Mako', message: 'Try asking what they can do.', icon: trainer('engineer') },
          { speaker: 'Lt. Surge', message: 'I had never trusted a plan built from volunteers.' },
        ],
      },
      {
        id: 'the-child-by-the-door',
        title: 'Too Loud',
        description: 'A child refuses to enter the shelter because Surge sounds like the storm.',
        background: surgeShelter,
        dialogue: [
          { speaker: 'Young Trainer', message: 'I am not going in while he is shouting.', icon: trainer('youngster') },
          { speaker: 'Lt. Surge', message: 'I told him the building was safe. He covered his ears.' },
          { speaker: 'Mako', message: 'Safety is not only whether the roof stays up.', icon: trainer('engineer') },
        ],
      },
      {
        id: 'mako-refuses-an-order',
        title: 'A Better Command',
        description: 'Mako refuses to abandon a damaged substation and explains why.',
        background: surgeStreets,
        dialogue: [
          { speaker: 'Lt. Surge', message: 'I ordered Mako back before the transformer failed.' },
          { speaker: 'Mako', message: 'There are three Magnemite trapped inside. I am staying. You can help or you can keep shouting.', icon: trainer('engineer') },
          { speaker: 'Lt. Surge', message: 'Once, I had turned a transport around because an order was wrong. I had forgotten what that courage looked like from the other side.' },
        ],
      },
      {
        id: 'ask-the-room',
        title: 'Who Knows This Grid?',
        description: 'Surge asks Vermilion for help and discovers expertise he never thought to command.',
        background: surgeShelter,
        dialogue: [
          { speaker: 'Lt. Surge', message: 'I stood in the middle of the Gym and asked who knew the east grid.' },
          { speaker: 'Harbour Mechanic', message: 'I wired half those docks. Give me a torch.', icon: trainer('engineer') },
          { speaker: 'Lt. Surge', message: 'Hands went up all around the room. Not one of them waited for a rank.' },
        ],
      },
      {
        id: 'the-first-roster',
        title: 'After the Thunder',
        description: 'Surge turns the Gym into a permanent community shelter.',
        background: surgeShelter,
        dialogue: [
          { speaker: 'Mako', message: 'You spelled volunteer wrong.', icon: trainer('engineer') },
          { speaker: 'Lt. Surge', message: 'I wrote the first shelter roster by hand. Electricians, sailors, nurses, cooks, and one kid in charge of blankets.' },
          { speaker: 'Lt. Surge', message: 'Nobody saluted. The lights came back anyway.' },
        ],
      },
    ],
    path: [
      task('the-drill'),
      battle('makos-drill'),
      task('when-the-city-went-dark'),
      game('restore-the-east-grid'),
      task('the-empty-seats'),
      task('the-gym-becomes-a-shelter'),
      game('voices-in-the-dark'),
      battle('substation-magneton'),
      task('the-child-by-the-door'),
      task('mako-refuses-an-order'),
      task('ask-the-room'),
      task('the-first-roster'),
    ],
  },
  erika: {
    scenes: [
      {
        id: 'the-invitation',
        title: 'Rules for a Perfect Bloom',
        description: 'Erika receives an exhibition invitation with very particular expectations.',
        background: erikaExhibition,
        dialogue: [
          { speaker: 'Madame Tamaki', message: 'Celadon expects restraint. Pale petals, delicate scent, no surprises.', icon: trainer('socialite') },
          { speaker: 'Erika', message: 'How fortunate. I had prepared several surprises and can now save them for myself.' },
          { speaker: 'Madame Tamaki', message: 'That was not permission to be clever.', icon: trainer('socialite') },
        ],
      },
      {
        id: 'gloom-is-not-invited',
        title: 'The Wrong Flower',
        description: 'The organizers reject the Pokémon Erika wants at the centre of her display.',
        background: erikaGreenhouse,
        dialogue: [
          { speaker: 'Exhibition Steward', message: 'Gloom is botanically fascinating. It is not suitable for a perfumery hall.', icon: trainer('butler') },
          { speaker: 'Erika', message: 'You invited a Grass Trainer and objected when she brought a plant.' },
          { speaker: 'Grooming Maid', message: 'He means the smell, Miss Erika.', icon: trainer('maid') },
        ],
      },
      {
        id: 'the-rehearsal-disaster',
        title: 'Every Window Open',
        description: "Gloom's nerves turn the private rehearsal into Celadon's favourite new story.",
        background: erikaExhibition,
        dialogue: [
          { speaker: 'Erika', message: 'Gloom sneezed. Three guests fled, two fainted, and Madame Tamaki opened a window with her parasol.' },
          { speaker: 'Rival Perfumer Celia', message: 'Do not worry. By tomorrow people may stop discussing it.', icon: trainer('socialite') },
          { speaker: 'Erika', message: 'Celia knew perfectly well that nobody in Celadon had ever stopped discussing anything.' },
        ],
      },
      {
        id: 'the-polite-silence',
        title: 'A Graceful Mistake',
        description: 'Erika lets a cruel joke pass and immediately regrets it.',
        background: erikaExhibition,
        dialogue: [
          { speaker: 'Celia', message: 'Perhaps the gardeners should exhibit outside with the compost.', icon: trainer('socialite') },
          { speaker: 'Erika', message: 'Everyone waited for my answer. I smiled because that was what well-taught girls did when a room became ugly.' },
          { speaker: 'Garden Maid Sumi', message: 'You do not have to fight every battle, Miss Erika.', icon: trainer('maid') },
        ],
      },
      {
        id: 'the-night-bloom',
        title: 'What Gloom Was Waiting For',
        description: 'Erika discovers that Gloom blooms beautifully away from the exhibition lights.',
        background: erikaGreenhouse,
        dialogue: [
          { speaker: 'Erika', message: 'At midnight Gloom opened beneath the glass roof. The scent was still strong, but beneath it was rain, citrus, and warm soil.' },
          { speaker: 'Sumi', message: 'It was never the wrong flower. We kept giving it the wrong room.', icon: trainer('maid') },
          { speaker: 'Erika', message: 'That was useful advice for more than perfume.' },
        ],
      },
      {
        id: 'the-unwelcome-display',
        title: 'No Disguises',
        description: 'Erika presents Gloom exactly as it is and makes the room decide what grace means.',
        background: erikaExhibition,
        dialogue: [
          { speaker: 'Madame Tamaki', message: 'You understand this may cost you the exhibition prize.', icon: trainer('socialite') },
          { speaker: 'Erika', message: 'Then it is fortunate I came with a flower rather than an empty shelf for a trophy.' },
          { speaker: 'Celia', message: 'People are applauding.', icon: trainer('socialite') },
        ],
      },
      {
        id: 'a-garden-with-room',
        title: 'A Place for Difficult Things',
        description: 'Erika carries the exhibition lesson into the community around her.',
        background: erikaGreenhouse,
        dialogue: [
          { speaker: 'Erika', message: 'I did not win first prize. I received six invitations, three complaints, and a queue of gardeners with plants nobody else wanted.' },
          { speaker: 'Sumi', message: 'Which did you keep?', icon: trainer('maid') },
          { speaker: 'Erika', message: 'All of them. Complaints make excellent gossip.' },
        ],
      },
    ],
    path: [
      task('the-invitation'),
      game('identify-the-notes'),
      task('gloom-is-not-invited'),
      game('draw-the-programme-bloom'),
      task('the-rehearsal-disaster'),
      battle('exhibition-rival'),
      task('the-polite-silence'),
      game('blend-the-night-perfume'),
      task('the-night-bloom'),
      task('the-unwelcome-display'),
      task('a-garden-with-room'),
    ],
  },
  koga: {
    scenes: [
      {
        id: 'the-succession-scroll',
        title: 'The Trial as Written',
        description: 'Koga gives Janine the same succession trial his own teacher gave him.',
        background: kogaCourtyard,
        dialogue: [
          { speaker: 'Koga', message: 'Seven marks. Three false trails. One target. Complete the course before moonrise.' },
          { speaker: 'Janine', message: 'May I ask why the third mark faces east?', icon: trainer('school-kid-f') },
          { speaker: 'Koga', message: 'A shinobi who stops to question the trail has already lost it.' },
        ],
      },
      {
        id: 'questions-are-not-disobedience',
        title: 'The Unwritten Rule',
        description: 'Janine challenges the part of the trial Koga never thought to question.',
        background: kogaCourtyard,
        dialogue: [
          { speaker: 'Janine', message: 'You taught me that an obvious answer may be bait. Why am I punished for saying this one is?', icon: trainer('school-kid-f') },
          { speaker: 'Koga', message: 'Because the trial measures execution.' },
          { speaker: 'Janine', message: 'Then it cannot measure judgment.', icon: trainer('school-kid-f') },
        ],
      },
      {
        id: 'the-missing-case',
        title: 'A Theft Inside the Trial',
        description: 'A real antidote case disappears while Koga and Janine are sparring.',
        background: kogaApothecary,
        dialogue: [
          { speaker: 'Apothecary Ren', message: 'The case was here when the bell rang. It contains enough venom to close this district.', icon: trainer('expert-m') },
          { speaker: 'Koga', message: 'A purple thread led from the window toward the old roofs. It was almost insultingly clear.' },
          { speaker: 'Janine', message: 'Exactly.', icon: trainer('school-kid-f') },
        ],
      },
      {
        id: 'the-perfect-decoy',
        title: 'Following the Lesson',
        description: 'Koga follows the textbook trail and catches the thief he was meant to find.',
        background: kogaRooftops,
        dialogue: [
          { speaker: 'Koga', message: 'The footprints, thread, and residue all pointed to one roof. The culprit even carried an empty case.' },
          { speaker: 'Decoy Thief', message: 'You are as predictable as the scroll said.', icon: trainer('super-nerd') },
          { speaker: 'Koga', message: 'The case was a copy. Janine was already gone.' },
        ],
      },
      {
        id: 'janines-evidence',
        title: 'The Trail That Was Missing',
        description: 'Janine explains why the obvious clues could not belong to the real thief.',
        background: kogaRooftops,
        dialogue: [
          { speaker: 'Janine', message: 'The thread was dyed with Pecha, but the missing case held no Pecha compounds. Someone wanted you to smell the answer.', icon: trainer('school-kid-f') },
          { speaker: 'Koga', message: 'Where did they go?' },
          { speaker: 'Janine', message: 'Down. Everyone watching us expected roofs.', icon: trainer('school-kid-f') },
        ],
      },
      {
        id: 'below-the-rooftops',
        title: 'The Unremarkable Door',
        description: 'Koga finds Janine waiting beside a service tunnel beneath the apothecary.',
        background: kogaApothecary,
        dialogue: [
          { speaker: 'Koga', message: 'There were no marks on the service door. No poison. No flourish. I had passed it twice.' },
          { speaker: 'Janine', message: 'A thief who studies your methods will decorate the route you expect.', icon: trainer('school-kid-f') },
          { speaker: 'Koga', message: 'She handed me the first antidote vial and pointed into the dark.' },
        ],
      },
      {
        id: 'the-method-explained',
        title: 'How Janine Won',
        description: 'Janine explains her reasoning after the antidotes are recovered.',
        background: kogaCourtyard,
        dialogue: [
          { speaker: 'Koga', message: 'You abandoned the succession trial.' },
          { speaker: 'Janine', message: 'No. I identified the real target and completed it.', icon: trainer('school-kid-f') },
          { speaker: 'Koga', message: 'I could find no flaw in that answer. It irritated me greatly.' },
        ],
      },
      {
        id: 'the-revised-scroll',
        title: 'One New Line',
        description: 'Koga changes a tradition without announcing that Janine changed him.',
        background: kogaCourtyard,
        dialogue: [
          { speaker: 'Janine', message: 'The trial says explain your conclusion now.', icon: trainer('school-kid-f') },
          { speaker: 'Koga', message: 'A copying error.' },
          { speaker: 'Janine', message: 'Of course, Father.', icon: trainer('school-kid-f') },
        ],
      },
    ],
    path: [
      task('the-succession-scroll'),
      game('read-the-shadow-marks'),
      task('questions-are-not-disobedience'),
      battle('janines-spar'),
      task('the-missing-case'),
      game('separate-the-toxins'),
      task('the-perfect-decoy'),
      battle('decoy-thief'),
      task('janines-evidence'),
      task('below-the-rooftops'),
      battle('tunnel-culprit'),
      task('the-method-explained'),
      task('the-revised-scroll'),
    ],
  },
  sabrina: {
    scenes: [
      {
        id: 'breakfast-with-everyone',
        title: 'Every Thought at Once',
        description: 'Young Sabrina hears what her family means before anyone speaks.',
        background: sabrinaRoom,
        dialogue: [
          { speaker: 'Mother', message: 'Would you like toast?', icon: trainer('pokefan-f') },
          { speaker: 'Sabrina', message: 'She was thinking that I looked tired. Father was thinking she worried too much. The neighbour was thinking about a leaking tap.' },
          { speaker: 'Sabrina', message: 'I asked everyone to stop. Nobody understood that they had not started.' },
        ],
      },
      {
        id: 'the-dojo-offer',
        title: 'A Discipline for Silence',
        description: 'Koichi offers physical focus exercises instead of treating Sabrina as fragile.',
        background: sabrinaDojo,
        dialogue: [
          { speaker: 'Koichi', message: 'I cannot make the city quiet. I can teach you where to put your attention.', icon: trainer('black-belt') },
          { speaker: 'Sabrina', message: 'You think I am dangerous.' },
          { speaker: 'Koichi', message: 'I think you already heard my answer and chose the cruelest version.', icon: trainer('black-belt') },
        ],
      },
      {
        id: 'too-many-judgments',
        title: 'What the Room Thought',
        description: 'The Dojo students overwhelm Sabrina despite saying nothing unkind aloud.',
        background: sabrinaDojo,
        dialogue: [
          { speaker: 'Sabrina', message: 'One student feared me. One pitied me. Three wondered whether I could hear them wondering.' },
          { speaker: 'Koichi', message: 'Look at me, Sabrina.', icon: trainer('black-belt') },
          { speaker: 'Sabrina', message: 'His concern sounded too much like every other voice. I pushed all of them away.' },
        ],
      },
      {
        id: 'building-the-quiet-room',
        title: 'A Door With No Handle',
        description: 'Sabrina creates an inner room strong enough to hold every unwanted feeling.',
        background: sabrinaMind,
        dialogue: [
          { speaker: 'Sabrina', message: 'I imagined four walls, then thicker walls, then a door with no handle on my side.' },
          { speaker: 'Younger Sabrina', message: 'If nobody can enter, how do we leave?', icon: trainer('gym-kanto-sabrina') },
          { speaker: 'Sabrina', message: 'I told the echo that leaving was not the point.' },
        ],
      },
      {
        id: 'haunter-finds-a-window',
        title: 'An Uninvited Face',
        description: 'Haunter discovers that perfect psychic walls still have reflective windows.',
        background: sabrinaMind,
        dialogue: [
          { speaker: 'Sabrina', message: 'Haunter appeared outside the window and copied my expression exactly.' },
          { speaker: 'Younger Sabrina', message: 'You do look like that.', icon: trainer('gym-kanto-sabrina') },
          { speaker: 'Sabrina', message: 'Haunter turned itself upside down. The echo laughed first. Then I did.' },
        ],
      },
      {
        id: 'the-crack-in-the-wall',
        title: 'Quiet Is Not Empty',
        description: 'Laughter creates the first opening in Sabrina’s psychic refuge.',
        background: sabrinaMind,
        dialogue: [
          { speaker: 'Sabrina', message: 'The wall cracked, and the Dojo returned all at once. This time Koichi was speaking aloud.' },
          { speaker: 'Koichi', message: 'You can close a door without locking yourself behind it.', icon: trainer('black-belt') },
          { speaker: 'Sabrina', message: 'I disliked how reasonable that sounded.' },
        ],
      },
      {
        id: 'ask-before-listening',
        title: 'Face to Face',
        description: 'Sabrina tries conversation without reaching for the answer first.',
        background: sabrinaDojo,
        dialogue: [
          { speaker: 'Sabrina', message: 'Were you afraid of me?' },
          { speaker: 'Koichi', message: 'Yes. I was more afraid you would decide that meant I hated you.', icon: trainer('black-belt') },
          { speaker: 'Sabrina', message: 'The answer hurt less when he was allowed to choose the words.' },
        ],
      },
      {
        id: 'one-door-open',
        title: 'One Door Open',
        description: 'Sabrina keeps the Quiet Room but changes what it is for.',
        background: sabrinaRoom,
        dialogue: [
          { speaker: 'Sabrina', message: 'I still use the Quiet Room. Silence is not a weakness, and neither is needing it.' },
          { speaker: 'Sabrina', message: 'I added a handle to both sides of the door. Haunter added a face to it.' },
        ],
      },
    ],
    path: [
      task('breakfast-with-everyone'),
      task('the-dojo-offer'),
      game('hold-the-focus-pattern'),
      task('too-many-judgments'),
      task('building-the-quiet-room'),
      battle('psychic-echo'),
      game('find-the-true-shape'),
      task('haunter-finds-a-window'),
      task('the-crack-in-the-wall'),
      battle('koichis-focus-test'),
      task('ask-before-listening'),
      task('one-door-open'),
    ],
  },
  blaine: {
    scenes: [
      {
        id: 'question-one',
        title: 'Question One',
        description: 'Blaine returns to the abandoned laboratory and begins a quiz for one.',
        background: blaineQuiz,
        dialogue: [
          { speaker: 'Blaine', message: 'Question one. Why did two careful men build something dangerous?' },
          { speaker: 'Blaine', message: 'Answer A: pride. Answer B: impatience. Answer C: because the first result was beautiful.' },
          { speaker: 'Blaine', message: 'I used to insist there could only be one correct answer.' },
        ],
      },
      {
        id: 'before-the-answers',
        title: 'Before We Needed Excuses',
        description: 'Blaine and Fuji begin with an honest hope of helping injured Pokémon recover.',
        background: blaineLab,
        dialogue: [
          { speaker: 'Fuji', message: 'No deadlines. We stop when the Pokémon tells us to stop, and we write down every failure.', icon: local('/sprites/trainers/special/fuji.avif') },
          { speaker: 'Blaine', message: 'Agreed. Especially ours.' },
        ],
      },
      {
        id: 'the-first-success',
        title: 'A Beautiful Result',
        description: 'The recovery field works once, and success changes the questions they ask.',
        background: blaineLab,
        dialogue: [
          { speaker: 'Blaine', message: 'Growlithe stood without pain for the first time in weeks. Fuji laughed. I shouted loudly enough to frighten every researcher upstairs.' },
          { speaker: 'Fuji', message: 'One success proves we may continue carefully.', icon: local('/sprites/trainers/special/fuji.avif') },
        ],
      },
      {
        id: 'question-two',
        title: 'Question Two',
        description: 'The memory asks when caution became an obstacle instead of a method.',
        background: blaineQuiz,
        dialogue: [
          { speaker: 'Blaine', message: 'Question two. When the readings stopped matching, what did the chief researcher do?' },
          { speaker: 'Blaine', message: 'I recalibrated the sensors, excluded one trial, and called the remaining pattern promising.' },
          { speaker: 'Blaine', message: 'No multiple choice was required.' },
        ],
      },
      {
        id: 'the-new-deadline',
        title: 'Promising by Friday',
        description: 'Recognition and funding turn a careful study into a demonstration with a date.',
        background: blaineLab,
        dialogue: [
          { speaker: 'League Patron', message: 'Show stable recovery on Friday and the laboratory is funded for five years.', icon: trainer('gentleman') },
          { speaker: 'Fuji', message: 'Then they can wait until it is stable.', icon: local('/sprites/trainers/special/fuji.avif') },
          { speaker: 'Blaine', message: 'I said Friday was plenty of time. It sounded confident, which is not the same as being true.' },
        ],
      },
      {
        id: 'the-anomaly',
        title: 'The Page That Did Not Fit',
        description: 'Fuji finds the failed trial Blaine removed from the demonstration summary.',
        background: blaineLab,
        dialogue: [
          { speaker: 'Fuji', message: 'You did not correct the result. You hid it.', icon: local('/sprites/trainers/special/fuji.avif') },
          { speaker: 'Blaine', message: 'It was one unstable reading against eleven clean ones.' },
          { speaker: 'Fuji', message: 'Then why were you afraid to show all twelve?', icon: local('/sprites/trainers/special/fuji.avif') },
        ],
      },
      {
        id: 'the-argument',
        title: 'One More Trial',
        description: 'Blaine chooses another test over the friend asking him to stop.',
        background: blaineLab,
        dialogue: [
          { speaker: 'Fuji', message: 'Cancel Friday. We shut the field down tonight.', icon: local('/sprites/trainers/special/fuji.avif') },
          { speaker: 'Blaine', message: 'One controlled trial will tell us whether the anomaly repeats.' },
          { speaker: 'Fuji', message: 'It already told us. You do not like the answer.', icon: local('/sprites/trainers/special/fuji.avif') },
        ],
      },
      {
        id: 'fuji-leaves',
        title: 'The Portrait',
        description: 'Fuji leaves the project, and Blaine cannot turn the moment into a riddle.',
        background: blaineQuiz,
        dialogue: [
          { speaker: 'Fuji', message: 'I will help the Pokémon we already hurt. I will not help you prove this was worth it.', icon: local('/sprites/trainers/special/fuji.avif') },
          { speaker: 'Blaine', message: 'He left his spare lab coat and took every photograph except one.' },
          { speaker: 'Blaine', message: 'I later hung that photograph in my Gym where I would have to see it before every quiz.' },
        ],
      },
      {
        id: 'the-last-question',
        title: 'The Last Question',
        description: 'Blaine asks himself when he truly knew the experiment was unsafe.',
        background: blaineQuiz,
        dialogue: [
          { speaker: 'Blaine', message: 'Final question. When did I know?' },
          { speaker: 'Blaine', message: 'Not when the alarm sounded. Not when Fuji walked away. I knew when I removed the twelfth result.' },
          { speaker: 'Blaine', message: 'That answer took me years because it only needed one sentence.' },
        ],
      },
      {
        id: 'the-first-safety-quiz',
        title: 'Write the Failure Down',
        description: 'Blaine turns his evasive questions into a discipline of naming risk plainly.',
        background: blaineQuiz,
        dialogue: [
          { speaker: 'Blaine', message: 'My first Gym quiz asked what a Trainer should do when a Pokémon shows pain during practice.' },
          { speaker: 'Young Researcher', message: 'Stop immediately. Record what happened. Ask for help.', icon: trainer('researcher-f') },
          { speaker: 'Blaine', message: 'Correct. No trick answer.' },
        ],
      },
    ],
    path: [
      task('question-one'),
      task('before-the-answers'),
      game('compare-the-baselines'),
      task('the-first-success'),
      battle('safety-demonstration'),
      task('question-two'),
      task('the-new-deadline'),
      game('run-the-containment-sequence'),
      task('the-anomaly'),
      task('the-argument'),
      battle('escaped-magmar'),
      task('fuji-leaves'),
      task('the-last-question'),
      task('the-first-safety-quiz'),
    ],
  },
  giovanni: {
    scenes: [
      {
        id: 'breakfast-promise',
        title: 'Eight O’Clock',
        description: 'Giovanni promises to attend his son’s first tournament final.',
        background: giovanniHome,
        dialogue: [
          { speaker: 'His Son', message: 'The final starts at eight. Not around eight.', icon: trainer('school-kid-m') },
          { speaker: 'Giovanni', message: 'I will be in the front row before they call your name.' },
          { speaker: 'His Son', message: 'You said that last time.', icon: trainer('school-kid-m') },
        ],
      },
      {
        id: 'one-short-meeting',
        title: 'Nine in the Morning',
        description: 'A brief transport meeting offers Giovanni control of a struggling supply route.',
        background: giovanniOffice,
        dialogue: [
          { speaker: 'Route Contractor', message: 'Clear the western road and the cities will sign with whoever delivers first.', icon: trainer('gentleman') },
          { speaker: 'Giovanni', message: 'How long?' },
          { speaker: 'Route Contractor', message: 'Two hours, if you handle it personally.', icon: trainer('gentleman') },
        ],
      },
      {
        id: 'the-first-reminder',
        title: 'Half Past One',
        description: 'Giovanni’s son calls while the new contracts are being signed.',
        background: giovanniOffice,
        dialogue: [
          { speaker: 'His Son', message: 'I won the morning round.', icon: trainer('school-kid-m') },
          { speaker: 'Giovanni', message: 'Of course you did. I will see the final.' },
          { speaker: 'His Son', message: 'Front row. Before they call my name.', icon: trainer('school-kid-m') },
        ],
      },
      {
        id: 'the-league-offer',
        title: 'Three O’Clock',
        description: 'The League offers Giovanni the vacant Viridian Gym if he completes an assessment today.',
        background: '/backgrounds/gym-ground.avif',
        dialogue: [
          { speaker: 'League Assessor', message: 'The position gives you legitimacy. The assessment cannot wait until tomorrow.', icon: trainer('expert-m') },
          { speaker: 'Giovanni', message: 'Nothing gives legitimacy. It is taken, then described that way afterward.' },
          { speaker: 'League Assessor', message: 'Shall I prepare the arena?', icon: trainer('expert-m') },
        ],
      },
      {
        id: 'arianas-opportunity',
        title: 'Six Ten',
        description: 'Ariana presents the last opportunity Giovanni would need to decline to keep his promise.',
        background: giovanniOffice,
        dialogue: [
          { speaker: 'Ariana', message: 'Our competitors are meeting at seven. If we miss them, they keep the southern depots.', icon: trainer('ariana') },
          { speaker: 'Giovanni', message: 'Send someone else.' },
          { speaker: 'Ariana', message: 'You do not trust someone else to close it.', icon: trainer('ariana') },
        ],
      },
      {
        id: 'the-choice-that-looked-small',
        title: 'Seven O’Clock',
        description: 'Giovanni chooses one more meeting and calls the delay insignificant.',
        background: giovanniOffice,
        dialogue: [
          { speaker: 'Giovanni', message: 'The tournament hall was fifteen minutes away. The meeting would take ten.' },
          { speaker: 'Ariana', message: 'Your car is waiting.', icon: trainer('ariana') },
          { speaker: 'Giovanni', message: 'I told the driver to wait too.' },
        ],
      },
      {
        id: 'seven-forty-five',
        title: 'Seven Forty-Five',
        description: 'The final begins while Giovanni is still correcting contract language.',
        background: giovanniOffice,
        dialogue: [
          { speaker: 'Ariana', message: 'The depots are ours. You can leave.', icon: trainer('ariana') },
          { speaker: 'Giovanni', message: 'Clause nine allowed an audit. I stayed to remove it.' },
          { speaker: 'Ariana', message: 'That was not why you stayed.', icon: trainer('ariana') },
        ],
      },
      {
        id: 'the-cold-dinner',
        title: 'The Front Row Stayed Empty',
        description: 'Giovanni returns to a cold dinner and the trophy his son did not wait to show him.',
        background: giovanniHome,
        dialogue: [
          { speaker: 'Giovanni', message: 'The clock read ten twenty-three. His dinner was untouched. A small runner-up trophy stood beside my place.' },
          { speaker: 'Housekeeper', message: 'He asked me not to wake him when you returned.', icon: trainer('maid') },
          { speaker: 'Giovanni', message: 'I ordered a better trophy for the next morning.' },
        ],
      },
      {
        id: 'only-one-evening',
        title: 'What It Cost',
        description: 'Giovanni measures the day’s gains precisely and its loss dishonestly.',
        background: giovanniHome,
        dialogue: [
          { speaker: 'Giovanni', message: 'By midnight I controlled the western road, the southern depots, and Viridian Gym.' },
          { speaker: 'Giovanni', message: 'I had missed one evening. That was how I recorded it.' },
          { speaker: 'Giovanni', message: 'My son remembered a promise.' },
        ],
      },
    ],
    path: [
      task('breakfast-promise'),
      task('one-short-meeting'),
      game('clear-the-western-road'),
      battle('relief-raiders'),
      task('the-first-reminder'),
      task('the-league-offer'),
      battle('league-assessment'),
      task('arianas-opportunity'),
      task('the-choice-that-looked-small'),
      task('seven-forty-five'),
      task('the-cold-dinner'),
      task('only-one-evening'),
    ],
  },
}

export function chronicleActivityId(
  key: KantoGymChronicleKey,
  activityId: string,
): string {
  return `chronicle-${key}-${activityId}`
}
