import type { ExpeditionActivityType } from '@/data/expeditions/types'
import type { KantoGymChronicleKey } from '@/data/gym-leader-chronicles'
import type { TaskIcon } from '@/data/tasks/types'

export interface ChronicleCharacter {
  name: string
  icon: TaskIcon
}

export interface ChronicleSpeechPanel {
  kind: 'speech'
  message: string
  speaker: ChronicleCharacter
  background?: string
}

export interface ChronicleNarrationPanel {
  kind: 'narration'
  message: string
  background?: string
}

export type ChronicleNarrativePanel =
  | ChronicleSpeechPanel
  | ChronicleNarrationPanel

export interface ChronicleSceneBeat {
  type: 'scene'
  id: string
  title: string
  description: string
  background: string
  panels: ChronicleNarrativePanel[]
}

export interface ChronicleActivityBeat {
  type: Extract<ExpeditionActivityType, 'battle' | 'game'>
  id: string
}

export type ChronicleStoryBeat = ChronicleSceneBeat | ChronicleActivityBeat

export interface KantoGymChronicleStory {
  sequence: ChronicleStoryBeat[]
}

const trainer = (id: string): TaskIcon => ({ type: 'trainer', id })
const local = (id: string): TaskIcon => ({ type: 'local', id })
const character = (name: string, icon: TaskIcon): ChronicleCharacter => ({
  name,
  icon,
})
const speech = (
  speaker: ChronicleCharacter,
  message: string,
): ChronicleSpeechPanel => ({ kind: 'speech', speaker, message })
const narration = (message: string): ChronicleNarrativePanel => ({
  kind: 'narration',
  message,
})
const scene = (
  id: string,
  title: string,
  description: string,
  background: string,
  panels: ChronicleNarrativePanel[],
): ChronicleSceneBeat => ({
  type: 'scene',
  id,
  title,
  description,
  background,
  panels,
})
const battle = (id: string): ChronicleActivityBeat => ({ type: 'battle', id })
const game = (id: string): ChronicleActivityBeat => ({ type: 'game', id })

const brockHome = '/backgrounds/chronicle-brock-family-kitchen.avif'
const brockGym = '/backgrounds/chronicle-brock-neglected-gym.avif'
const mistyTheater = '/backgrounds/chronicle-misty-water-theater.avif'
const mistyPumps = '/backgrounds/chronicle-misty-pump-room.avif'
const surgeStreets = '/backgrounds/chronicle-surge-blackout-streets.avif'
const surgeShelter = '/backgrounds/chronicle-surge-gym-shelter.avif'
const erikaGlasshouse = '/backgrounds/chronicle-erika-greenhouse.avif'
const erikaExhibition = '/backgrounds/chronicle-erika-flower-exhibition.avif'
const kogaCourtyard = '/backgrounds/chronicle-koga-training-courtyard.avif'
const kogaRooftops = '/backgrounds/chronicle-koga-fuchsia-rooftops.avif'
const kogaApothecary = '/backgrounds/chronicle-koga-apothecary.avif'
const sabrinaRoom = '/backgrounds/chronicle-sabrina-childhood-room.avif'
const sabrinaMind = '/backgrounds/chronicle-sabrina-quiet-mindscape.avif'
const sabrinaLab = '/backgrounds/chronicle-sabrina-teleport-lab.avif'
const sabrinaDojo = '/backgrounds/gym-fighting.avif'
const blaineLab = '/backgrounds/chronicle-blaine-cinnabar-lab.avif'
const blaineQuiz = '/backgrounds/chronicle-blaine-abandoned-quiz-room.avif'
const giovanniOffice = '/backgrounds/chronicle-giovanni-viridian-office.avif'
const giovanniHome = '/backgrounds/chronicle-giovanni-family-dining-room.avif'

const characters = {
  brock: character('Brock', trainer('gym-kanto-brock')),
  forrest: character('Forrest', trainer('youngster')),
  mara: character('Mara', trainer('expert-f')),
  taro: character('Taro', trainer('youngster')),
  twins: character('The Twins', trainer('twins')),
  misty: character('Misty', trainer('gym-kanto-misty')),
  daisy: character('Daisy', trainer('swimmer-f')),
  violet: character('Violet', trainer('beauty')),
  lily: character('Lily', trainer('beauty')),
  surge: character('Lt. Surge', trainer('gym-kanto-ltsurge')),
  mako: character('Mako', trainer('engineer')),
  nurse: character('Nurse', trainer('nurse')),
  youngTrainer: character('Young Trainer', trainer('youngster')),
  harbourMechanic: character('Harbour Mechanic', trainer('engineer')),
  erika: character('Erika', trainer('gym-kanto-erika')),
  erikaMother: character("Erika's Mother", trainer('socialite')),
  sumi: character('Sumi', trainer('maid')),
  exhibitionSteward: character('Exhibition Steward', trainer('butler')),
  celia: character('Celia', trainer('beauty')),
  koga: character('Koga', trainer('gym-kanto-koga')),
  janine: character('Janine', trainer('school-kid-f')),
  ren: character('Ren', trainer('expert-m')),
  jiro: character('Jiro', trainer('super-nerd')),
  sabrina: character('Sabrina', trainer('gym-kanto-sabrina')),
  sabrinaMother: character('Mother', trainer('pokefan-f')),
  sabrinaFather: character('Father', trainer('pokefan-m')),
  orla: character('Orla', trainer('researcher-f')),
  venn: character('Venn', trainer('scientist')),
  youngerSabrina: character(
    'Younger Sabrina',
    trainer('gym-kanto-sabrina'),
  ),
  koichi: character('Koichi', trainer('black-belt')),
  blaine: character('Blaine', trainer('gym-kanto-blaine')),
  fuji: character(
    'Fuji',
    local('/sprites/trainers/special/fuji.avif'),
  ),
  leaguePatron: character('League Patron', trainer('gentleman')),
  orin: character('Orin', trainer('researcher')),
  youngResearcher: character('Young Researcher', trainer('researcher-f')),
  giovanni: character('Giovanni', trainer('gym-kanto-giovanni')),
  giovanniSon: character('His Son', trainer('school-kid-m')),
  routeContractor: character('Route Contractor', trainer('gentleman')),
  ariana: character('Ariana', trainer('ariana')),
  driver: character('Driver', trainer('biker')),
  hadrian: character('Hadrian', trainer('expert-m')),
  housekeeper: character('Housekeeper', trainer('maid')),
} as const

export const KANTO_GYM_CHRONICLE_STORIES: Record<
  KantoGymChronicleKey,
  KantoGymChronicleStory
> = {
  brock: {
    sequence: [
      scene(
        'breakfast-without-flint',
        'One Place Empty',
        'Brock keeps the morning moving while Forrest waits for a straight answer about Flint.',
        brockHome,
        [
          narration('Before sunrise, Brock had five lunches open on the table and one untouched plate beside the stove.'),
          speech(characters.forrest, "Dad's breakfast is cold again."),
          speech(characters.brock, 'He is working away. Eat before the twins find your toast.'),
          speech(characters.forrest, 'You said he would be back yesterday.'),
          speech(characters.brock, 'Shoes first. Questions after school.'),
        ],
      ),
      game('keep-morning-moving'),
      scene(
        'note-under-the-bowl',
        'No Return Date',
        'Forrest catches Brock reading the note Flint left behind.',
        brockHome,
        [
          narration('When the kitchen was finally quiet, Brock unfolded the paper hidden beneath the sugar bowl.'),
          speech(characters.forrest, 'That is his handwriting.'),
          speech(characters.brock, 'He says he needs time away. He does not say how much.'),
          speech(characters.forrest, 'So he is not working. You lied to us.'),
          speech(characters.brock, 'I needed everyone to get through one normal morning.'),
        ],
      ),
      scene(
        'inspection-at-noon',
        'Inspection at Noon',
        'A League examiner finds an empty feed bin, a damaged wall, and no licensed Leader.',
        brockGym,
        [
          narration('At the Gym, Onix nudged its mineral block away and watched Brock sweep plaster from the battle floor.'),
          speech(characters.mara, "The licence is in Flint Harrison's name. Where is he?"),
          speech(characters.brock, 'Gone. I know the safety rules, the teams, and every crack in this building.'),
          speech(characters.mara, 'The cracks are why I am here. The League can issue a temporary licence after repairs and an assessment.'),
          speech(characters.brock, 'Then assess me today.'),
        ],
      ),
      scene(
        'taros-first-challenge',
        'The Door Was Open',
        'Taro arrives for the challenge Brock promised before Flint disappeared.',
        brockGym,
        [
          speech(characters.taro, 'You said the Gym would be open at noon.'),
          speech(characters.mara, 'It is under inspection.'),
          speech(characters.brock, 'He walked here from the quarry. I am not sending him home without a battle.'),
          speech(characters.mara, 'One match. If the floor shifts, I stop it.'),
        ],
      ),
      battle('first-challenger'),
      scene(
        'the-wall-gives-way',
        'Closed Until Safe',
        'The battle shakes loose the damage Brock had been pretending he could manage.',
        brockGym,
        [
          narration('Taro recalled his last Pokémon as stone split behind the referee line.'),
          speech(characters.brock, 'Onix, brace the wall!'),
          speech(characters.mara, 'Everyone outside. The Gym is closed.'),
          speech(characters.brock, 'I can have it repaired by morning.'),
          speech(characters.mara, 'Not alone, and not by morning. Those are the conditions.'),
        ],
      ),
      scene(
        'the-breeder-letter',
        'The Letter in the Locker',
        'Forrest finds the future Brock packed away with Flint’s old things.',
        brockGym,
        [
          speech(characters.forrest, 'You were accepted onto the breeder course.'),
          speech(characters.brock, 'It starts in another region. That makes it simple.'),
          speech(characters.forrest, 'Simple for who? You never asked us.'),
          speech(characters.brock, 'Somebody has to keep the house and the Gym together.'),
          speech(characters.forrest, 'The others are outside with Geodude and every tool we own. Let us help before you decide what we cannot do.'),
        ],
      ),
      game('repair-the-gym-wall'),
      scene(
        'the-family-meeting',
        'Jobs With Names',
        'The Harrison children divide the work and make Brock tell them the truth.',
        brockHome,
        [
          speech(characters.forrest, 'I can handle the evening feed and check Onix before bed.'),
          speech(characters.twins, 'We will sweep the Gym. Brock still cooks.'),
          speech(characters.brock, 'That was decided quickly.'),
          speech(characters.forrest, 'Now tell everyone what Dad wrote.'),
          narration('Brock put Flint’s note in the middle of the table and read every line without improving any of it.'),
          speech(characters.brock, 'Tomorrow we make a proper rota. Tonight, nobody pretends his chair is occupied.'),
        ],
      ),
      scene(
        'the-league-assessment',
        'Ready to Hold It',
        'Mara returns to a repaired Gym with a family rota hanging beside the safety plan.',
        brockGym,
        [
          speech(characters.mara, 'The wall is sound. Who checks it after each match?'),
          speech(characters.brock, 'Forrest checks the markers. I sign the sheet. Either of us can close the floor.'),
          speech(characters.mara, 'Good. Now show me what happens when the damage comes from an opponent.'),
          speech(characters.brock, 'Onix, we have one more inspection.'),
        ],
      ),
      battle('league-examiner'),
      scene(
        'the-open-manual',
        'Two Books Open',
        'Brock accepts the Gym without burying the work he wanted for himself.',
        brockHome,
        [
          speech(characters.mara, 'Temporary licence. Three months, then I inspect the building and the rota again.'),
          speech(characters.forrest, 'What about the breeder course?'),
          speech(characters.brock, 'They allow a deferred place. I wrote to ask for one.'),
          speech(characters.forrest, 'You asked for help twice in one day.'),
          narration('That evening, the breeder manual stayed open beside the Gym ledger. Neither book was put back in the locker.'),
        ],
      ),
    ],
  },
  misty: {
    sequence: [
      scene(
        'smallest-name-on-the-poster',
        'Fourth on the Poster',
        'Misty runs the rehearsal while her sisters take the visible parts.',
        mistyTheater,
        [
          speech(characters.daisy, 'Violet, half a step left. Lily, wait for the bubbles. Misty, where is the next cue?'),
          speech(characters.misty, 'In my hand, along with the lighting sheet and the pump checks.'),
          speech(characters.violet, 'You are better at keeping us organised.'),
          speech(characters.misty, 'My name is still printed smaller than the ticket price.'),
          speech(characters.daisy, 'Get the finale right and we will discuss the poster after opening night.'),
        ],
      ),
      game('finale-rehearsal'),
      scene(
        'the-warning-light',
        'The Light Below the Stage',
        'Misty finds a pump warning that the maintenance report says she can ignore.',
        mistyPumps,
        [
          speech(characters.misty, 'The lower intake light is blinking again.'),
          speech(characters.daisy, 'The technician cleared it this morning.'),
          speech(characters.misty, 'He cleared the light. The pump is still making that sound.'),
          speech(characters.lily, 'We have a full house in twenty minutes.'),
          speech(characters.daisy, 'Mark it for tomorrow. We cannot pull the stage apart now.'),
        ],
      ),
      scene(
        'when-the-pumps-failed',
        'The Show Stops',
        'A storm turns Misty’s ignored warning into an emergency below the audience.',
        mistyTheater,
        [
          narration('Thunder struck as the opening fountains rose. The music died, the emergency lamps came on, and water began falling below the lower-tank line.'),
          speech(characters.violet, 'The Horsea are being pulled toward the service grates!'),
          speech(characters.daisy, 'Lily, clear the stands. Violet, open the transfer tank.'),
          speech(characters.misty, 'The alarms overlap down there. I need to hear which tank they are in.'),
          speech(characters.daisy, 'Find them. We will keep everyone moving.'),
        ],
      ),
      game('listen-across-the-water'),
      scene(
        'the-shape-in-the-water',
        'Between Them and the Grate',
        'Misty locates the Horsea, but a frightened Gyarados is thrashing across the service channel.',
        mistyPumps,
        [
          speech(characters.misty, 'Lower channel. I can see the Horsea.'),
          speech(characters.daisy, 'And Gyarados. The failing pump has it cornered.'),
          speech(characters.misty, 'Starmie can hold the current, but not while Gyarados is striking at everything that moves.'),
          speech(characters.daisy, 'Then calm it first. We will hold the gate.'),
        ],
      ),
      battle('service-gyarados'),
      scene(
        'the-horsea-rescue',
        'Everybody in the Water',
        'The sisters finish the rescue together after Misty opens the way.',
        mistyPumps,
        [
          narration('Gyarados backed into the deeper tank. Starmie turned the worst of the current while Daisy and Violet lifted the service grate.'),
          speech(characters.misty, 'Lily, send Horsea toward my voice. Slowly.'),
          speech(characters.lily, 'They are moving. All six of them.'),
          speech(characters.daisy, 'Last one is clear. Shut the intake now!'),
          speech(characters.misty, 'I tried. The control is dead. Psyduck, Disable!'),
        ],
      ),
      scene(
        'after-the-curtain',
        'What Nobody Saw',
        'Relief gives way to the argument Misty and Daisy have postponed for years.',
        mistyTheater,
        [
          speech(characters.daisy, 'Nobody was hurt. Most of the audience thinks the blackout was part of the finale.'),
          speech(characters.misty, 'Of course they do. You three smiled while I was under the stage.'),
          speech(characters.daisy, 'We evacuated a full theatre.'),
          speech(characters.misty, 'I know. I wrote the evacuation plan.'),
          speech(characters.daisy, 'Then say what you actually want, because I am tired of guessing.'),
          speech(characters.misty, 'I want to train Pokémon. I want to run battles. I do not want to spend my life making your show look effortless.'),
        ],
      ),
      scene(
        'daisys-challenge',
        'An Empty Pool at Dawn',
        'Daisy offers a formal handover instead of another promise to discuss Misty later.',
        mistyTheater,
        [
          speech(characters.daisy, 'The League wants one of us named as the Gym’s battle lead.'),
          speech(characters.misty, 'You already decided it would be you.'),
          speech(characters.daisy, 'Yesterday I had. Today I am offering the proper test.'),
          speech(characters.misty, 'And if I win?'),
          speech(characters.daisy, 'You write the battle programme. We stop treating it like the interval between shows.'),
        ],
      ),
      battle('daisys-challenge'),
      scene(
        'different-water',
        'One Gym, Two Stages',
        'The sisters divide the work according to what each of them actually wants.',
        mistyTheater,
        [
          speech(characters.daisy, 'The morning shows stay. The afternoon floor is yours.'),
          speech(characters.misty, 'I want the main pool twice a week and a proper battle platform.'),
          speech(characters.violet, 'Can the platform sparkle?'),
          speech(characters.misty, 'If it survives a Starmie, it can sparkle.'),
          speech(characters.daisy, 'Put your name first on the battle poster. You earned the printing bill.'),
        ],
      ),
      scene(
        'the-scratched-earring',
        'One Scratched Earring',
        'Misty keeps a small piece of the final show that belonged to all four sisters.',
        mistyTheater,
        [
          narration('Daisy found one of Misty’s finale earrings beneath the emergency pump. The glass was scratched, but the clasp still worked.'),
          speech(characters.daisy, 'You could replace it.'),
          speech(characters.misty, 'No. This one looks like it was actually there.'),
          speech(characters.daisy, 'Eight seconds in the spotlight and an entire night under the stage.'),
          speech(characters.misty, 'Next time, put that on the poster.'),
        ],
      ),
    ],
  },
  surge: {
    sequence: [
      scene(
        'the-drill',
        'Again, Faster',
        'Surge tests Vermilion volunteers against a plan written for soldiers.',
        surgeShelter,
        [
          speech(characters.surge, 'Alarm to shelter in thirty seconds. Mako, your crew took forty-two.'),
          speech(characters.mako, 'One of them stopped to carry the practice patient.'),
          speech(characters.surge, 'Then the other three should have moved faster.'),
          speech(characters.mako, 'They are electricians and sailors, not your old flight crew.'),
          speech(characters.surge, 'Good. They will improvise while I test what happens when the grid fights back.'),
        ],
      ),
      battle('makos-drill'),
      scene(
        'the-real-alarm',
        'When the City Went Dark',
        'Mako’s criticism is interrupted by the emergency Surge thought he was preparing everyone for.',
        surgeShelter,
        [
          speech(characters.mako, 'You won the drill and lost half the volunteers.'),
          speech(characters.surge, 'They will come back when they understand the standard.'),
          narration('The lights went out before Mako could answer. A transformer flashed blue beyond the Gym windows.'),
          speech(characters.mako, 'Harbour grid is down. The Pokémon Center is on batteries.'),
          speech(characters.surge, 'This one is real. Open the shelter doors.'),
        ],
      ),
      scene(
        'restore-the-east-grid',
        'A Circuit With People on It',
        'Surge and Mako isolate the damaged line before the backup supply fails.',
        surgeStreets,
        [
          speech(characters.mako, 'The east line is feeding back into the shelter circuit.'),
          speech(characters.surge, 'Cut it at the substation.'),
          speech(characters.mako, 'Do that now and the Center loses its last clean route.'),
          speech(characters.surge, 'Then we rebuild the route before we cut anything.'),
        ],
      ),
      game('restore-the-east-grid'),
      scene(
        'voices-in-the-dark',
        'The Gym Fills Up',
        'Partial power returns, but frightened people and Pokémon keep arriving faster than Surge can place them.',
        surgeShelter,
        [
          narration('Emergency lamps flickered on across the battle floor. Every side room answered with a different cry.'),
          speech(characters.surge, 'Electric types on the west wall. Everyone else stay clear of the cables.'),
          speech(characters.nurse, 'Some of those cries are coming from Pokémon separated from their Trainers.'),
          speech(characters.mako, 'If we identify the rooms, volunteers can reunite them.'),
          speech(characters.surge, 'Do it. I will keep the main floor clear.'),
        ],
      ),
      game('voices-in-the-dark'),
      scene(
        'the-child-by-the-door',
        'Too Loud',
        'A frightened child makes Surge hear what his orders sound like to everyone else.',
        surgeShelter,
        [
          speech(characters.youngTrainer, 'I am not going in while he is shouting.'),
          speech(characters.surge, 'The roof is reinforced. You are safer inside.'),
          speech(characters.youngTrainer, 'You sound like the thunder.'),
          narration('Surge looked at the packed floor, then crouched so the child did not have to look up at him.'),
          speech(characters.surge, 'All right. Walk in with me. No shouting.'),
        ],
      ),
      scene(
        'mako-refuses-an-order',
        'Three Magnemite',
        'Mako refuses to abandon the Pokémon trapped inside the unstable substation.',
        surgeStreets,
        [
          speech(characters.mako, 'Three Magnemite are pinned behind the east transformer. Their Magneton is overloading the frame.'),
          speech(characters.surge, 'The building is unstable. Pull back.'),
          speech(characters.mako, 'If Magneton surges again, it takes the Center line with it.'),
          speech(characters.surge, 'That is an order, Mako.'),
          speech(characters.mako, 'Then it is a bad one. You can help me change it or watch me disobey.'),
          speech(characters.surge, 'Show me the safest route in.'),
        ],
      ),
      battle('substation-magneton'),
      scene(
        'ask-the-room',
        'Who Knows This Grid?',
        'Surge returns with the Magnemite and asks Vermilion for help instead of issuing another complete plan.',
        surgeShelter,
        [
          narration('The Magnemite floated into the Gym behind Mako. Surge stood in the centre of the shelter without a clipboard.'),
          speech(characters.surge, 'Who here knows the old harbour grid?'),
          speech(characters.harbourMechanic, 'I wired half the docks. Give me a torch.'),
          speech(characters.nurse, 'I need two people on the Center batteries.'),
          speech(characters.surge, 'Mako, write it down. This time we use the plan the room gives us.'),
        ],
      ),
      scene(
        'the-first-roster',
        'After the Thunder',
        'The temporary shelter becomes part of Vermilion’s permanent emergency plan.',
        surgeShelter,
        [
          speech(characters.mako, 'You spelled volunteer wrong.'),
          speech(characters.surge, 'I was busy giving one child command of the blanket store.'),
          speech(characters.youngTrainer, 'You asked me. That is different.'),
          narration('The first shelter roster stayed beside the Gym challenge board. Nobody on it had a rank.'),
        ],
      ),
    ],
  },
  erika: {
    sequence: [
      scene(
        'a-proper-future',
        'A Proper Future',
        'Erika learns that her family has already arranged the exhibition and the respectable future expected to follow it.',
        erikaGlasshouse,
        [
          narration('Two invitations lay beside Erika’s pruning knife. Her mother had opened both of them.'),
          speech(characters.erikaMother, 'Your fitting is at eleven. The exhibition committee expects us for lunch.'),
          speech(characters.erika, 'Sumi and I are finishing the night perfume this morning.'),
          speech(characters.erikaMother, 'Sumi can finish it. The League committee will be at lunch, and they are ready to discuss the Gym.'),
          speech(characters.erika, 'I have not applied to lead a Gym.'),
          speech(characters.erikaMother, 'Families like ours are invited, Erika. We do not apply.'),
        ],
      ),
      game('identify-the-notes'),
      scene(
        'entered-under-her-name',
        'The Name on the Programme',
        'The perfume Sumi developed with Erika and Gloom appears in the exhibition programme under Erika’s family name.',
        erikaGlasshouse,
        [
          speech(characters.sumi, 'The bitter note settles after a minute. Gloom was right about the last vial.'),
          speech(characters.erika, 'Write your name on the formula before Mother sees it.'),
          speech(characters.erikaMother, 'Too late. The programme went to print this morning.'),
          speech(characters.erika, 'You called it the Erika House night perfume.'),
          speech(characters.erikaMother, 'It sounds established. Sumi understands why that matters.'),
          narration('Sumi folded the working label until her own handwriting disappeared inside it.'),
        ],
      ),
      scene(
        'the-wrong-flower',
        'The Wrong Flower',
        'The exhibition welcomes Erika’s family name but refuses the Pokémon and gardener behind its featured perfume.',
        erikaExhibition,
        [
          speech(characters.exhibitionSteward, 'The perfume may stay. Gloom cannot be on the public floor.'),
          speech(characters.erika, 'The perfume changes when Gloom blooms. That is the point of the display.'),
          speech(characters.exhibitionSteward, 'The committee approved the scent, not its source.'),
          speech(characters.sumi, 'I can keep Gloom in the service room until judging is over.'),
          speech(characters.exhibitionSteward, 'Then it is settled.'),
          speech(characters.erika, 'The west corridor will be quieter.'),
          narration('Erika looked at the printed programme and told Sumi where the service door was.'),
        ],
      ),
      scene(
        'the-rehearsal',
        'Every Window Open',
        'Gloom’s distress interrupts rehearsal, and Celia gives the room an easy person to blame.',
        erikaExhibition,
        [
          narration('A lighting test flashed through the service curtain. Gloom sneezed, and the first three rows emptied before the scent had settled.'),
          speech(characters.celia, 'Your gardener might have warned us that the famous perfume attacks back.'),
          speech(characters.sumi, 'I did warn the steward about the lights.'),
          speech(characters.erikaMother, 'Pack the formula and wait outside, Sumi. We have enough to repair.'),
          speech(characters.erika, 'Mother...'),
          speech(characters.erikaMother, 'Celia has offered an exhibition battle. Give the room something better to remember.'),
          narration('Sumi waited until Erika looked at her. Erika picked up Gloom’s Poké Ball instead.'),
        ],
      ),
      battle('exhibition-rival'),
      scene(
        'the-applause',
        'What Victory Settled',
        'Erika wins the battle, and the exhibition treats victory as an answer to everything that happened before it.',
        erikaExhibition,
        [
          narration('Gloom won beneath the same lights it had been hidden from. By the final bow, every window was closed again.'),
          speech(characters.celia, 'There. Now they will call the rehearsal charming instead of disastrous.'),
          speech(characters.erikaMother, 'Smile, Erika. The committee is looking this way.'),
          speech(characters.erika, 'Where is Sumi?'),
          speech(characters.erikaMother, 'Gone home, I expect. This is your applause.'),
          narration('The announcer praised Erika’s perfume, Erika’s Gloom, and Erika’s composure. Erika bowed before he could finish.'),
        ],
      ),
      scene(
        'the-dismissal',
        'The Service Corridor',
        'Erika finds Sumi packing and discovers how little a private apology can change.',
        erikaExhibition,
        [
          speech(characters.sumi, 'Your mother says the household no longer needs a perfume assistant.'),
          speech(characters.erika, 'She had no right to decide that here.'),
          speech(characters.sumi, 'Did you tell her?'),
          speech(characters.erika, 'Not yet.'),
          speech(characters.sumi, 'Then she did decide it here.'),
          speech(characters.erika, 'I am sorry.'),
          speech(characters.sumi, 'I know. That has never been the difficult part.'),
        ],
      ),
      scene(
        'the-gym-offer',
        'A Suitable Appointment',
        'Erika’s exhibition victory gives her family the respectable Gym appointment they wanted.',
        erikaExhibition,
        [
          speech(characters.erikaMother, 'The League vote was unanimous. Celadon Gym will be yours by the end of the month.'),
          speech(characters.erika, 'You asked them before the exhibition.'),
          speech(characters.erikaMother, 'I made certain they knew you were available.'),
          speech(characters.erika, 'What if I am not?'),
          speech(characters.erikaMother, 'After today? People would think you frightened of your own success.'),
          narration('Her mother placed the acceptance letter beside the exhibition programme. Both already carried Erika’s name.'),
        ],
      ),
      scene(
        'a-position-in-the-glasshouse',
        'The First Appointment',
        'Erika uses her new authority quietly, offering Sumi work without challenging the family that dismissed her.',
        erikaGlasshouse,
        [
          speech(characters.sumi, 'Head gardener of Celadon Gym. Did your mother approve this?'),
          speech(characters.erika, 'The appointment carries the Gym seal. It does not require hers.'),
          speech(characters.sumi, 'That was not my question.'),
          speech(characters.erika, 'She does not know yet.'),
          speech(characters.sumi, 'And when she does?'),
          speech(characters.erika, 'The seal will still be dry.'),
        ],
      ),
      scene(
        'the-private-ledger',
        'One Honest Label',
        'Erika preserves Sumi’s authorship where nobody outside the greenhouse is likely to see it.',
        erikaGlasshouse,
        [
          narration('The greenhouse ledger listed every cutting, seed, and formula kept by the Gym. The night perfume appeared under Sumi’s name.'),
          speech(characters.sumi, 'Will the exhibition label be changed?'),
          speech(characters.erika, 'No.'),
          speech(characters.sumi, 'Thank you for not making that sound kinder than it is.'),
          speech(characters.erika, 'I thought about it.'),
          narration('Gloom opened beneath the glass roof. The scent reached the locked ledger and nowhere else.'),
        ],
      ),
      scene(
        'the-prepared-speech',
        'The Words Provided',
        'Erika reaches the line in her induction speech where she could name Sumi and lets it pass.',
        erikaExhibition,
        [
          speech(characters.erikaMother, 'Pause after “service.” The photographers need time.'),
          speech(characters.erika, 'I know how to read a speech.'),
          narration('Sumi stood at the back beside Gloom. The programme still called the perfume an Erika House creation.'),
          speech(characters.erika, 'Celadon has trusted my family with many responsibilities. I am honoured to continue that service.'),
          narration('Erika stopped. Sumi met her eyes across the hall. Her mother touched one finger to the next line.'),
          speech(characters.erika, 'I accept the position of Gym Leader.'),
          narration('The applause began before the words Erika had not said could reach anyone else.'),
        ],
      ),
    ],
  },
  koga: {
    sequence: [
      scene(
        'the-succession-scroll',
        'The Trial as Written',
        'Koga gives Janine the same tracking exercise his own teacher gave him.',
        kogaCourtyard,
        [
          speech(characters.koga, 'Seven marks. Three false trails. One target before moonrise.'),
          speech(characters.janine, 'Why does the third mark face east?'),
          speech(characters.koga, 'Because that is the course.'),
          speech(characters.janine, 'You taught me an obvious trail may be bait.'),
          speech(characters.koga, 'Then prove which shadows belong to the target before you question the scroll.'),
        ],
      ),
      game('read-the-shadow-marks'),
      scene(
        'questions-are-not-disobedience',
        'The Mark That Should Not Be There',
        'Janine completes the exercise by refusing the answer Koga expected.',
        kogaCourtyard,
        [
          speech(characters.janine, 'The east mark belongs to nobody. It was painted after the dust settled.'),
          speech(characters.koga, 'You were expected to follow it and recover.'),
          speech(characters.janine, 'Then the trial measures recovery from a mistake you ordered me to make.'),
          speech(characters.koga, 'It measures execution.'),
          speech(characters.janine, 'Test my execution in a battle. Do not call obedience judgment.'),
        ],
      ),
      battle('janines-spar'),
      scene(
        'the-missing-case',
        'A Real Trail Interrupts the Lesson',
        'Apothecary Ren reports a stolen case while Koga and Janine are still arguing.',
        kogaApothecary,
        [
          speech(characters.ren, 'Six sealed toxin samples are missing. The case left through this window.'),
          speech(characters.koga, 'Purple thread on the latch. Pecha powder on the sill.'),
          speech(characters.janine, 'Too much of both.'),
          speech(characters.ren, 'The sample labels were torn from my ledger. Can you reconstruct them?'),
          speech(characters.koga, 'We identify what was taken first. Then we follow the trail.'),
        ],
      ),
      game('separate-the-toxins'),
      scene(
        'the-perfect-decoy',
        'The Trail Everyone Can See',
        'The reconstructed samples make Janine more certain that the rooftop clues are staged.',
        kogaRooftops,
        [
          speech(characters.janine, 'None of the stolen compounds contain Pecha. The powder is decoration.'),
          speech(characters.koga, 'Or the thief handled antidotes before the robbery.'),
          speech(characters.janine, 'The footprints begin beneath the window. Nobody landed there.'),
          speech(characters.koga, 'Stay with Ren. I will test the route.'),
          speech(characters.janine, 'You mean follow it.'),
        ],
      ),
      scene(
        'the-decoy-waits',
        'Exactly Where Expected',
        'Koga reaches the end of the rooftop trail and finds a thief carrying an empty copy of the case.',
        kogaRooftops,
        [
          narration('Every mark led to the same roof. A man waited beside the chimney with purple thread tied around his sleeve.'),
          speech(characters.jiro, 'Fuchsia’s great tracker arrives on time.'),
          speech(characters.koga, 'Put down the case.'),
          speech(characters.jiro, 'This one? You should inspect it after you earn it.'),
        ],
      ),
      battle('decoy-thief'),
      scene(
        'janines-evidence',
        'The Trail That Was Missing',
        'The decoy case is empty, and Janine has followed the route with no marks at all.',
        kogaApothecary,
        [
          speech(characters.koga, 'A perfect copy. No samples.'),
          speech(characters.ren, 'Janine left through the service passage five minutes ago.'),
          speech(characters.janine, 'I am below you. The real case went through the drain tunnel.'),
          speech(characters.koga, 'What trail did you follow?'),
          speech(characters.janine, 'None. A thief who studied you decorated the roof. The unmarked door was the only honest clue.'),
        ],
      ),
      scene(
        'below-the-rooftops',
        'Trust the Unwritten Route',
        'Koga reaches the tunnel and lets Janine close the escape instead of sending her back.',
        kogaApothecary,
        [
          speech(characters.janine, 'Raku has the case. He will run toward you when I block the lower gate.'),
          speech(characters.koga, 'The lower gate has no light.'),
          speech(characters.janine, 'Neither does he.'),
          speech(characters.koga, 'Take Venonat. Signal once the gate is closed.'),
          speech(characters.janine, 'Is that an order or a plan?'),
          speech(characters.koga, 'A plan. Improve it if you must.'),
        ],
      ),
      battle('tunnel-culprit'),
      scene(
        'the-revised-scroll',
        'One New Question',
        'Koga changes the succession trial after Janine recovers the real case.',
        kogaCourtyard,
        [
          speech(characters.koga, 'You abandoned the written trail.'),
          speech(characters.janine, 'I identified the real target and recovered it.'),
          speech(characters.koga, 'Explain how you knew the obvious route was false.'),
          speech(characters.janine, 'Is that part of the trial now?'),
          speech(characters.koga, 'It appears the previous copy omitted a line.'),
          speech(characters.janine, 'Of course, Father.'),
        ],
      ),
    ],
  },
  sabrina: {
    sequence: [
      scene(
        'breakfast-with-everyone',
        'Every Thought at Once',
        'Young Sabrina cannot separate spoken conversation from the thoughts around it.',
        sabrinaRoom,
        [
          speech(characters.sabrinaMother, 'Would you like toast?'),
          speech(characters.sabrina, 'You think I look tired.'),
          speech(characters.sabrinaFather, 'Your mother did not say that.'),
          speech(characters.sabrina, 'You think she worries too much. The neighbour is thinking about a leaking tap.'),
          speech(characters.sabrinaMother, 'Sabrina, look at me. What do you need?'),
          speech(characters.sabrina, 'For everyone to stop, even when they are not speaking.'),
        ],
      ),
      scene(
        'the-silph-offer',
        'One Signal at a Time',
        'A Silph researcher offers Sabrina a controlled way to practise selecting one psychic signal.',
        sabrinaLab,
        [
          speech(characters.orla, 'The chamber sends Porygon to one of two receivers. Your signal tells it which one.'),
          speech(characters.sabrinaMother, 'Could the filter help her outside the laboratory?'),
          speech(characters.orla, 'Perhaps, but that is not a promise.'),
          speech(characters.sabrina, 'If I ask to stop, do you stop?'),
          speech(characters.orla, 'Immediately. You control the test.'),
        ],
      ),
      scene(
        'the-first-calibration',
        'The Quiet Pattern',
        'Sabrina builds a focus pattern around Porygon’s signal while Haunter watches from the ceiling.',
        sabrinaLab,
        [
          speech(characters.orla, 'Receiver one only. Find Porygon and hold the route.'),
          speech(characters.sabrina, 'There are twelve people in the next building.'),
          speech(characters.orla, 'The Fighting Dojo. Let those thoughts pass and keep the shape you chose.'),
          speech(characters.sabrina, 'Haunter, stop copying the shape.'),
        ],
      ),
      game('hold-the-focus-pattern'),
      scene(
        'the-second-receiver',
        'A Successful Test Becomes Another Test',
        'The first calibration works, so Silph activates equipment Sabrina was not told would be used.',
        sabrinaLab,
        [
          speech(characters.orla, 'Clean transfer. Porygon arrived exactly on target.'),
          speech(characters.venn, 'Bring receiver two online.'),
          speech(characters.sabrina, 'That was not part of the test.'),
          speech(characters.venn, 'The first result proves you can manage it.'),
          speech(characters.orla, 'She asked to approve every stage.'),
          speech(characters.venn, 'We are calibrating a machine, not negotiating with it.'),
        ],
      ),
      scene(
        'two-signals',
        'Porygon Between Rooms',
        'Both receivers seize the same signal and amplify every nearby thought through Sabrina.',
        sabrinaLab,
        [
          narration('Both pads lit at once. Porygon flickered between them while the Dojo’s thoughts crashed through the chamber walls.'),
          speech(characters.sabrina, 'Shut it down.'),
          speech(characters.venn, 'The readings are inside tolerance.'),
          speech(characters.orla, 'Porygon is splitting. Sabrina, release the signal.'),
          speech(characters.sabrina, 'I cannot find where it ends.'),
          speech(characters.orla, 'Then we reach it first. Keep looking at Porygon.'),
        ],
      ),
      battle('unstable-porygon'),
      scene(
        'the-quiet-room',
        'A Door With No Handle',
        'The feedback drives Sabrina into the psychic refuge she built to keep every voice out.',
        sabrinaMind,
        [
          narration('The laboratory vanished behind four quiet walls. Sabrina made them thicker until even Porygon became a distant pulse.'),
          speech(characters.youngerSabrina, 'Nothing can reach us here.'),
          speech(characters.sabrina, 'Porygon is still in the chamber.'),
          speech(characters.youngerSabrina, 'So are all the voices.'),
          speech(characters.sabrina, 'One of them is real. I need to find its shape without opening everything.'),
        ],
      ),
      game('find-the-true-shape'),
      scene(
        'haunter-finds-the-signal',
        'The Face in the Glass',
        'Haunter’s reflection gives Sabrina a harmless signal she can separate from the feedback.',
        sabrinaMind,
        [
          narration('Haunter pressed its face against the imagined window and copied Director Venn’s expression.'),
          speech(characters.youngerSabrina, 'That is cruel.'),
          speech(characters.sabrina, 'It is accurate.'),
          narration('Sabrina laughed once. The copied signal broke apart, leaving Porygon’s steady pulse beneath it.'),
          speech(characters.sabrina, 'Receiver one. Orla, send it to receiver one.'),
        ],
      ),
      scene(
        'ask-before-entering',
        'The Chamber Opens',
        'Porygon returns safely, and Koichi waits for permission before approaching Sabrina.',
        sabrinaLab,
        [
          narration('Receiver one went dark with Porygon safely inside. The chamber door opened, but nobody crossed the threshold.'),
          speech(characters.koichi, 'The feedback reached the Dojo. May I come in?'),
          speech(characters.sabrina, 'You were afraid.'),
          speech(characters.koichi, 'Yes. I can tell you why, or I can leave.'),
          speech(characters.sabrina, 'Come in. Tell me aloud.'),
        ],
      ),
      scene(
        'koichis-focus-test',
        'Face to Face',
        'Koichi offers training built around asking before increasing the pressure.',
        sabrinaDojo,
        [
          speech(characters.koichi, 'I cannot make Saffron quiet. I can help you practise choosing where your attention goes.'),
          speech(characters.sabrina, 'Silph said something similar.'),
          speech(characters.koichi, 'Silph changed the test after you agreed. I will not.'),
          speech(characters.sabrina, 'One battle. Stop when I say stop.'),
          speech(characters.koichi, 'Those are the rules.'),
        ],
      ),
      battle('koichis-focus-test'),
      scene(
        'one-door-open',
        'A Room With Two Handles',
        'Sabrina keeps the quiet she needs and gives her family a way to approach it respectfully.',
        sabrinaRoom,
        [
          speech(characters.sabrinaMother, 'We moved the breakfast table away from the street wall.'),
          speech(characters.sabrinaFather, 'And we knock. Even when the door is open.'),
          speech(characters.sabrina, 'The Quiet Room stays.'),
          speech(characters.sabrinaMother, 'It is your room.'),
          narration('Sabrina added a handle to both sides of the imagined door. Haunter added a face to the outside.'),
        ],
      ),
    ],
  },
  blaine: {
    sequence: [
      scene(
        'question-one',
        'Question One',
        'Years later, Blaine returns to the abandoned laboratory with the question he avoided there.',
        blaineQuiz,
        [
          narration('Dust covered the old control desk. Blaine set a blank Gym quiz beside the final incident report.'),
          speech(characters.blaine, 'Question one. Why did two careful men build something dangerous?'),
          speech(characters.blaine, 'Pride, impatience, or one beautiful result?'),
          narration('He crossed out the answer boxes. The memory began before any of them were needed.'),
        ],
      ),
      scene(
        'before-the-answers',
        'The Stop Rule',
        'Blaine and Fuji begin a recovery study with clear limits and honest intentions.',
        blaineLab,
        [
          speech(characters.fuji, 'We record every failed recovery, not only the useful ones.'),
          speech(characters.blaine, 'And if a Pokémon’s baseline falls, the test stops.'),
          speech(characters.fuji, 'No deadline changes that.'),
          speech(characters.blaine, 'Write it above the door if you think I will forget.'),
          speech(characters.fuji, 'I am writing it in the protocol, where you have to sign it.'),
        ],
      ),
      game('compare-the-baselines'),
      scene(
        'the-first-success',
        'A Beautiful Result',
        'The field helps an injured Growlithe stand, and success changes the atmosphere in the laboratory.',
        blaineLab,
        [
          narration('Growlithe put weight on its injured leg, took one careful step, and then another.'),
          speech(characters.fuji, 'Easy. Let it choose the pace.'),
          speech(characters.blaine, 'It is walking, Fuji.'),
          speech(characters.fuji, 'I can see that.'),
          narration('They laughed loudly enough to bring every researcher in the corridor to the window.'),
        ],
      ),
      scene(
        'the-new-deadline',
        'Promising by Friday',
        'A patron offers the laboratory security in exchange for a public result on a fixed date.',
        blaineLab,
        [
          speech(characters.leaguePatron, 'Demonstrate stable recovery on Friday and the laboratory is funded for five years.'),
          speech(characters.fuji, 'Stable recovery does not happen on a calendar.'),
          speech(characters.blaine, 'We already have eleven clean trials.'),
          speech(characters.fuji, 'We have eleven subjects, not a stage act.'),
          speech(characters.leaguePatron, 'Then Friday should be straightforward.'),
          speech(characters.blaine, 'It will be.'),
        ],
      ),
      scene(
        'the-safety-demonstration',
        'The Procedure Works',
        'Blaine proves that everyone in the laboratory knows the shutdown sequence.',
        blaineLab,
        [
          speech(characters.orin, 'Simulated field spike in ten seconds.'),
          speech(characters.fuji, 'Medical route clear. All subjects accounted for.'),
          speech(characters.blaine, 'Lockdown team, show our patron how quickly Friday ends if the readings move.'),
          speech(characters.orin, 'System ready.'),
        ],
      ),
      battle('safety-demonstration'),
      scene(
        'the-anomaly',
        'The Twelfth Result',
        'After the successful drill, a recovery baseline falls and Blaine prepares another rehearsal instead of stopping.',
        blaineLab,
        [
          speech(characters.orin, 'Subject twelve is below its intake baseline.'),
          speech(characters.blaine, 'Run the sensors again.'),
          speech(characters.orin, 'I did. Twice.'),
          narration('Blaine moved the twelfth page out of the demonstration summary and placed it beneath the full report.'),
          speech(characters.blaine, 'We rehearse containment once more. If anything fails, Friday is cancelled.'),
        ],
      ),
      game('run-the-containment-sequence'),
      scene(
        'the-page-that-did-not-fit',
        'What Blaine Removed',
        'Fuji finds the missing result after the laboratory passes every safety check.',
        blaineLab,
        [
          speech(characters.fuji, 'Why is subject twelve absent from the summary?'),
          speech(characters.blaine, 'One unstable result against eleven clean ones.'),
          speech(characters.fuji, 'The stop rule does not say eleven to one.'),
          speech(characters.blaine, 'The sensors may be wrong.'),
          speech(characters.fuji, 'Then why hide the page before proving that?'),
          speech(characters.blaine, 'Because they would cancel Friday before we could answer the question.'),
        ],
      ),
      scene(
        'one-more-trial',
        'The Answer Blaine Wanted',
        'Fuji asks Blaine to stop, and Blaine authorises the trial anyway.',
        blaineLab,
        [
          speech(characters.fuji, 'Cancel the demonstration. Suspend every trial tonight.'),
          speech(characters.blaine, 'One run at the lower setting tells us whether the result repeats.'),
          speech(characters.fuji, 'It already repeated. You made Orin test it twice.'),
          speech(characters.blaine, 'If the field is stable, stopping now throws away five years of work.'),
          speech(characters.fuji, 'No. Continuing throws the risk onto a Pokémon that cannot sign your protocol.'),
          speech(characters.blaine, 'I am authorising one final run.'),
        ],
      ),
      scene(
        'the-alarm',
        'Not a Rehearsal',
        'The final trial overheats and a panicked Magmar blocks the evacuation corridor.',
        blaineLab,
        [
          narration('The field climbed past the shutdown line before the first reading completed. Smoke rolled through the containment wing.'),
          speech(characters.orin, 'Automatic locks are not releasing!'),
          speech(characters.fuji, 'I am staying with the subject. Get the technicians out.'),
          speech(characters.blaine, 'Growlithe, take the medical corridor.'),
          speech(characters.orin, 'Magmar is loose between us and the exit.'),
        ],
      ),
      battle('escaped-magmar'),
      scene(
        'fuji-leaves',
        'After the Alarm',
        'The corridor clears, but the subject does not survive the trial Blaine chose to run.',
        blaineQuiz,
        [
          narration('The technicians escaped. By dawn, the smoke was gone and the final page of the incident report had been signed.'),
          speech(characters.fuji, 'The subject died after the field collapsed.'),
          speech(characters.blaine, 'I know.'),
          speech(characters.fuji, 'You knew enough before it started.'),
          speech(characters.blaine, 'Where will you go?'),
          speech(characters.fuji, 'Somewhere the Pokémon come before the work.'),
        ],
      ),
      scene(
        'the-last-question',
        'No Trick Answer',
        'Blaine writes the first safety question for the Gym he later builds.',
        blaineQuiz,
        [
          speech(characters.blaine, 'Final question. When did I know the trial was unsafe?'),
          narration('He looked at the twelfth result, still creased where he had hidden it.'),
          speech(characters.blaine, 'Before the alarm. Before Fuji left. I knew when I removed this page.'),
          speech(characters.youngResearcher, 'What should a Trainer do when a Pokémon shows pain during practice?'),
          speech(characters.blaine, 'Stop. Record what happened. Ask for help. Put that answer first.'),
        ],
      ),
    ],
  },
  giovanni: {
    sequence: [
      scene(
        'breakfast-promise',
        'Eight O’Clock',
        'Giovanni promises to attend his son’s first tournament final.',
        giovanniHome,
        [
          speech(characters.giovanniSon, 'The final starts at eight. Not around eight.'),
          speech(characters.giovanni, 'I will be in the front row before they call your name.'),
          speech(characters.giovanniSon, 'You said that last time.'),
          speech(characters.giovanni, 'Last time there was no final.'),
          speech(characters.giovanniSon, 'There was still a match.'),
        ],
      ),
      scene(
        'one-short-meeting',
        'Nine in the Morning',
        'A blocked supply road offers Giovanni a useful problem he expects to solve quickly.',
        giovanniOffice,
        [
          speech(characters.routeContractor, 'The western road is blocked. Food and medicine are sitting in three warehouses.'),
          speech(characters.giovanni, 'How long to clear it?'),
          speech(characters.routeContractor, 'Two hours if someone coordinates the crews.'),
          speech(characters.giovanni, 'I will handle the first section personally.'),
          speech(characters.ariana, 'Your calendar is clear until six.'),
        ],
      ),
      game('clear-the-western-road'),
      scene(
        'the-road-reopens',
        'The First Convoy',
        'Clearing the road immediately creates another problem only Giovanni can solve quickly.',
        '/backgrounds/gym-ground.avif',
        [
          narration('The first truck crossed the repaired section before noon. A second convoy radioed from the bend ahead.'),
          speech(characters.driver, 'Raiders have blocked the route. They know what we are carrying.'),
          speech(characters.ariana, 'The local guard can reach them in forty minutes.'),
          speech(characters.giovanni, 'The medicine reaches Viridian in thirty. Send my car.'),
        ],
      ),
      battle('relief-raiders'),
      scene(
        'the-first-reminder',
        'Half Past One',
        'Giovanni’s son calls while the emergency work becomes a permanent business.',
        giovanniOffice,
        [
          speech(characters.giovanniSon, 'I won the morning round.'),
          speech(characters.giovanni, 'Of course you did.'),
          speech(characters.giovanniSon, 'Front row. Before they call my name.'),
          speech(characters.giovanni, 'I remember.'),
          narration('After the call, Giovanni signed the first exclusive transport agreement for the reopened road.'),
        ],
      ),
      scene(
        'the-league-offer',
        'Three O’Clock',
        'The League offers Giovanni the vacant Viridian Gym if he completes an assessment that day.',
        '/backgrounds/gym-ground.avif',
        [
          speech(characters.hadrian, 'Viridian needs a Leader with staff, Pokémon, and enough money to reopen the building.'),
          speech(characters.giovanni, 'The League objected to my influence this morning.'),
          speech(characters.hadrian, 'This afternoon it needs it contained somewhere visible.'),
          speech(characters.giovanni, 'And the assessment cannot wait until tomorrow?'),
          speech(characters.hadrian, 'Not if you want the charter signed today.'),
        ],
      ),
      battle('league-assessment'),
      scene(
        'the-gym-charter',
        'Five Fifteen',
        'Passing the League assessment gives Giovanni another institution to connect to his growing network.',
        '/backgrounds/gym-ground.avif',
        [
          speech(characters.hadrian, 'The Gym is yours once the repairs pass inspection.'),
          speech(characters.giovanni, 'My road crews can begin tomorrow.'),
          speech(characters.hadrian, 'You already employ the crews that supply the city.'),
          speech(characters.giovanni, 'That is why the work will be completed.'),
        ],
      ),
      scene(
        'arianas-opportunity',
        'Six Ten',
        'Ariana brings the last meeting Giovanni would need to decline to keep his promise.',
        giovanniOffice,
        [
          speech(characters.ariana, 'Our competitors meet at seven. If we miss them, they keep the southern depots.'),
          speech(characters.giovanni, 'Send Petrel.'),
          speech(characters.ariana, 'He will accept shared access.'),
          speech(characters.giovanni, 'Then send him with instructions not to.'),
          speech(characters.ariana, 'You do not trust him to close it. Neither do I.'),
        ],
      ),
      scene(
        'the-choice-that-looked-small',
        'Seven O’Clock',
        'Giovanni chooses to take the meeting and tells himself the delay is too small to matter.',
        giovanniOffice,
        [
          speech(characters.giovanni, 'The tournament hall is fifteen minutes away. This meeting takes ten.'),
          speech(characters.ariana, 'Your car is waiting.'),
          narration('The depot owners arrived with a contract twice as long as promised.'),
          speech(characters.giovanni, 'Tell the driver to keep the engine running.'),
        ],
      ),
      scene(
        'the-cold-dinner',
        'The Front Row Stayed Empty',
        'Giovanni returns after the tournament and finds the trophy his son did not wait to show him.',
        giovanniHome,
        [
          narration('The dining-room clock read ten twenty-three. A small runner-up trophy stood beside Giovanni’s untouched place.'),
          speech(characters.housekeeper, 'He asked me not to wake him when you returned.'),
          speech(characters.giovanni, 'Did he eat?'),
          speech(characters.housekeeper, 'He waited until the final was over.'),
          speech(characters.giovanni, 'Order the winner’s trophy. Have it here before breakfast.'),
        ],
      ),
      scene(
        'that-is-not-mine',
        'The Next Morning',
        'Giovanni tries to replace the thing he missed with something more expensive.',
        giovanniHome,
        [
          speech(characters.giovanniSon, 'That is not mine.'),
          speech(characters.giovanni, 'It is better made. The engraver can add your name.'),
          speech(characters.giovanniSon, 'I did not win it.'),
          speech(characters.giovanni, 'There will be another tournament.'),
          speech(characters.giovanniSon, 'Will you be there?'),
          narration('By noon, Giovanni controlled the western road, the southern depots, and Viridian Gym. His ledger recorded one missed evening. The replacement trophy remained in its box.'),
        ],
      ),
    ],
  },
}

export function chronicleActivityId(
  key: KantoGymChronicleKey,
  activityId: string,
): string {
  return `chronicle-${key}-${activityId}`
}
