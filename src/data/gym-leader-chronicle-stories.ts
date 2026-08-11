import type { ExpeditionActivityType } from '@/data/expeditions/types'
import type { KantoGymChronicleKey } from '@/data/gym-leader-chronicles'
import type { TaskIcon } from '@/data/tasks/types'

export interface ChronicleNarrativePanel {
  kind: 'speech' | 'narration'
  message: string
  speaker?: string
  icon?: TaskIcon
  background?: string
}

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
const speech = (
  speaker: string,
  message: string,
  icon?: TaskIcon,
): ChronicleNarrativePanel => ({ kind: 'speech', speaker, message, icon })
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
const erikaWarehouse = '/backgrounds/chronicle-erika-dye-warehouse.avif'
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
          speech('Forrest', "Dad's breakfast is cold again.", trainer('youngster')),
          speech('Brock', 'He is working away. Eat before the twins find your toast.'),
          speech('Forrest', 'You said he would be back yesterday.', trainer('youngster')),
          speech('Brock', 'Shoes first. Questions after school.'),
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
          speech('Forrest', 'That is his handwriting.', trainer('youngster')),
          speech('Brock', 'He says he needs time away. He does not say how much.'),
          speech('Forrest', 'So he is not working. You lied to us.', trainer('youngster')),
          speech('Brock', 'I needed everyone to get through one normal morning.'),
        ],
      ),
      scene(
        'inspection-at-noon',
        'Inspection at Noon',
        'A League examiner finds an empty feed bin, a damaged wall, and no licensed Leader.',
        brockGym,
        [
          narration('At the Gym, Onix nudged its mineral block away and watched Brock sweep plaster from the battle floor.'),
          speech('Mara', "The licence is in Flint Harrison's name. Where is he?", trainer('expert-f')),
          speech('Brock', 'Gone. I know the safety rules, the teams, and every crack in this building.'),
          speech('Mara', 'The cracks are why I am here. The League can issue a temporary licence after repairs and an assessment.'),
          speech('Brock', 'Then assess me today.'),
        ],
      ),
      scene(
        'taros-first-challenge',
        'The Door Was Open',
        'Taro arrives for the challenge Brock promised before Flint disappeared.',
        brockGym,
        [
          speech('Taro', 'You said the Gym would be open at noon.', trainer('youngster')),
          speech('Mara', 'It is under inspection.', trainer('expert-f')),
          speech('Brock', 'He walked here from the quarry. I am not sending him home without a battle.'),
          speech('Mara', 'One match. If the floor shifts, I stop it.'),
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
          speech('Brock', 'Onix, brace the wall!'),
          speech('Mara', 'Everyone outside. The Gym is closed.', trainer('expert-f')),
          speech('Brock', 'I can have it repaired by morning.'),
          speech('Mara', 'Not alone, and not by morning. Those are the conditions.'),
        ],
      ),
      scene(
        'the-breeder-letter',
        'The Letter in the Locker',
        'Forrest finds the future Brock packed away with Flint’s old things.',
        brockGym,
        [
          speech('Forrest', 'You were accepted onto the breeder course.', trainer('youngster')),
          speech('Brock', 'It starts in another region. That makes it simple.'),
          speech('Forrest', 'Simple for who? You never asked us.'),
          speech('Brock', 'Somebody has to keep the house and the Gym together.'),
          speech('Forrest', 'The others are outside with Geodude and every tool we own. Let us help before you decide what we cannot do.'),
        ],
      ),
      game('repair-the-gym-wall'),
      scene(
        'the-family-meeting',
        'Jobs With Names',
        'The Harrison children divide the work and make Brock tell them the truth.',
        brockHome,
        [
          speech('Forrest', 'I can handle the evening feed and check Onix before bed.', trainer('youngster')),
          speech('The Twins', 'We will sweep the Gym. Brock still cooks.', trainer('twins')),
          speech('Brock', 'That was decided quickly.'),
          speech('Forrest', 'Now tell everyone what Dad wrote.'),
          narration('Brock put Flint’s note in the middle of the table and read every line without improving any of it.'),
          speech('Brock', 'Tomorrow we make a proper rota. Tonight, nobody pretends his chair is occupied.'),
        ],
      ),
      scene(
        'the-league-assessment',
        'Ready to Hold It',
        'Mara returns to a repaired Gym with a family rota hanging beside the safety plan.',
        brockGym,
        [
          speech('Mara', 'The wall is sound. Who checks it after each match?', trainer('expert-f')),
          speech('Brock', 'Forrest checks the markers. I sign the sheet. Either of us can close the floor.'),
          speech('Mara', 'Good. Now show me what happens when the damage comes from an opponent.'),
          speech('Brock', 'Onix, we have one more inspection.'),
        ],
      ),
      battle('league-examiner'),
      scene(
        'the-open-manual',
        'Two Books Open',
        'Brock accepts the Gym without burying the work he wanted for himself.',
        brockHome,
        [
          speech('Mara', 'Temporary licence. Three months, then I inspect the building and the rota again.', trainer('expert-f')),
          speech('Forrest', 'What about the breeder course?', trainer('youngster')),
          speech('Brock', 'They allow a deferred place. I wrote to ask for one.'),
          speech('Forrest', 'You asked for help twice in one day.'),
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
          speech('Daisy', 'Violet, half a step left. Lily, wait for the bubbles. Misty, where is the next cue?', trainer('swimmer-f')),
          speech('Misty', 'In my hand, along with the lighting sheet and the pump checks.'),
          speech('Violet', 'You are better at keeping us organised.', trainer('beauty')),
          speech('Misty', 'My name is still printed smaller than the ticket price.'),
          speech('Daisy', 'Get the finale right and we will discuss the poster after opening night.', trainer('swimmer-f')),
        ],
      ),
      game('finale-rehearsal'),
      scene(
        'the-warning-light',
        'The Light Below the Stage',
        'Misty finds a pump warning that the maintenance report says she can ignore.',
        mistyPumps,
        [
          speech('Misty', 'The lower intake light is blinking again.'),
          speech('Daisy', 'The technician cleared it this morning.', trainer('swimmer-f')),
          speech('Misty', 'He cleared the light. The pump is still making that sound.'),
          speech('Lily', 'We have a full house in twenty minutes.', trainer('beauty')),
          speech('Daisy', 'Mark it for tomorrow. We cannot pull the stage apart now.', trainer('swimmer-f')),
        ],
      ),
      scene(
        'when-the-pumps-failed',
        'The Show Stops',
        'A storm turns Misty’s ignored warning into an emergency below the audience.',
        mistyTheater,
        [
          narration('Thunder struck as the opening fountains rose. The music died, the emergency lamps came on, and water began falling below the lower-tank line.'),
          speech('Violet', 'The Horsea are being pulled toward the service grates!', trainer('beauty')),
          speech('Daisy', 'Lily, clear the stands. Violet, open the transfer tank.', trainer('swimmer-f')),
          speech('Misty', 'The alarms overlap down there. I need to hear which tank they are in.'),
          speech('Daisy', 'Find them. We will keep everyone moving.'),
        ],
      ),
      game('listen-across-the-water'),
      scene(
        'the-shape-in-the-water',
        'Between Them and the Grate',
        'Misty locates the Horsea, but a frightened Gyarados is thrashing across the service channel.',
        mistyPumps,
        [
          speech('Misty', 'Lower channel. I can see the Horsea.'),
          speech('Daisy', 'And Gyarados. The failing pump has it cornered.', trainer('swimmer-f')),
          speech('Misty', 'Starmie can hold the current, but not while Gyarados is striking at everything that moves.'),
          speech('Daisy', 'Then calm it first. We will hold the gate.'),
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
          speech('Misty', 'Lily, send Horsea toward my voice. Slowly.'),
          speech('Lily', 'They are moving. All six of them.', trainer('beauty')),
          speech('Daisy', 'Last one is clear. Shut the intake now!', trainer('swimmer-f')),
          speech('Misty', 'I tried. The control is dead. Psyduck, Disable!'),
        ],
      ),
      scene(
        'after-the-curtain',
        'What Nobody Saw',
        'Relief gives way to the argument Misty and Daisy have postponed for years.',
        mistyTheater,
        [
          speech('Daisy', 'Nobody was hurt. Most of the audience thinks the blackout was part of the finale.', trainer('swimmer-f')),
          speech('Misty', 'Of course they do. You three smiled while I was under the stage.'),
          speech('Daisy', 'We evacuated a full theatre.'),
          speech('Misty', 'I know. I wrote the evacuation plan.'),
          speech('Daisy', 'Then say what you actually want, because I am tired of guessing.'),
          speech('Misty', 'I want to train Pokémon. I want to run battles. I do not want to spend my life making your show look effortless.'),
        ],
      ),
      scene(
        'daisys-challenge',
        'An Empty Pool at Dawn',
        'Daisy offers a formal handover instead of another promise to discuss Misty later.',
        mistyTheater,
        [
          speech('Daisy', 'The League wants one of us named as the Gym’s battle lead.', trainer('swimmer-f')),
          speech('Misty', 'You already decided it would be you.'),
          speech('Daisy', 'Yesterday I had. Today I am offering the proper test.'),
          speech('Misty', 'And if I win?'),
          speech('Daisy', 'You write the battle programme. We stop treating it like the interval between shows.'),
        ],
      ),
      battle('daisys-challenge'),
      scene(
        'different-water',
        'One Gym, Two Stages',
        'The sisters divide the work according to what each of them actually wants.',
        mistyTheater,
        [
          speech('Daisy', 'The morning shows stay. The afternoon floor is yours.', trainer('swimmer-f')),
          speech('Misty', 'I want the main pool twice a week and a proper battle platform.'),
          speech('Violet', 'Can the platform sparkle?', trainer('beauty')),
          speech('Misty', 'If it survives a Starmie, it can sparkle.'),
          speech('Daisy', 'Put your name first on the battle poster. You earned the printing bill.'),
        ],
      ),
      scene(
        'the-scratched-earring',
        'One Scratched Earring',
        'Misty keeps a small piece of the final show that belonged to all four sisters.',
        mistyTheater,
        [
          narration('Daisy found one of Misty’s finale earrings beneath the emergency pump. The glass was scratched, but the clasp still worked.'),
          speech('Daisy', 'You could replace it.', trainer('swimmer-f')),
          speech('Misty', 'No. This one looks like it was actually there.'),
          speech('Daisy', 'Eight seconds in the spotlight and an entire night under the stage.'),
          speech('Misty', 'Next time, put that on the poster.'),
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
          speech('Lt. Surge', 'Alarm to shelter in thirty seconds. Mako, your crew took forty-two.'),
          speech('Mako', 'One of them stopped to carry the practice patient.', trainer('engineer')),
          speech('Lt. Surge', 'Then the other three should have moved faster.'),
          speech('Mako', 'They are electricians and sailors, not your old flight crew.'),
          speech('Lt. Surge', 'Good. They will improvise while I test what happens when the grid fights back.'),
        ],
      ),
      battle('makos-drill'),
      scene(
        'the-real-alarm',
        'When the City Went Dark',
        'Mako’s criticism is interrupted by the emergency Surge thought he was preparing everyone for.',
        surgeShelter,
        [
          speech('Mako', 'You won the drill and lost half the volunteers.', trainer('engineer')),
          speech('Lt. Surge', 'They will come back when they understand the standard.'),
          narration('The lights went out before Mako could answer. A transformer flashed blue beyond the Gym windows.'),
          speech('Mako', 'Harbour grid is down. The Pokémon Center is on batteries.'),
          speech('Lt. Surge', 'This one is real. Open the shelter doors.'),
        ],
      ),
      scene(
        'restore-the-east-grid',
        'A Circuit With People on It',
        'Surge and Mako isolate the damaged line before the backup supply fails.',
        surgeStreets,
        [
          speech('Mako', 'The east line is feeding back into the shelter circuit.', trainer('engineer')),
          speech('Lt. Surge', 'Cut it at the substation.'),
          speech('Mako', 'Do that now and the Center loses its last clean route.'),
          speech('Lt. Surge', 'Then we rebuild the route before we cut anything.'),
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
          speech('Lt. Surge', 'Electric types on the west wall. Everyone else stay clear of the cables.'),
          speech('Nurse', 'Some of those cries are coming from Pokémon separated from their Trainers.', trainer('nurse')),
          speech('Mako', 'If we identify the rooms, volunteers can reunite them.', trainer('engineer')),
          speech('Lt. Surge', 'Do it. I will keep the main floor clear.'),
        ],
      ),
      game('voices-in-the-dark'),
      scene(
        'the-child-by-the-door',
        'Too Loud',
        'A frightened child makes Surge hear what his orders sound like to everyone else.',
        surgeShelter,
        [
          speech('Young Trainer', 'I am not going in while he is shouting.', trainer('youngster')),
          speech('Lt. Surge', 'The roof is reinforced. You are safer inside.'),
          speech('Young Trainer', 'You sound like the thunder.'),
          narration('Surge looked at the packed floor, then crouched so the child did not have to look up at him.'),
          speech('Lt. Surge', 'All right. Walk in with me. No shouting.'),
        ],
      ),
      scene(
        'mako-refuses-an-order',
        'Three Magnemite',
        'Mako refuses to abandon the Pokémon trapped inside the unstable substation.',
        surgeStreets,
        [
          speech('Mako', 'Three Magnemite are pinned behind the east transformer. Their Magneton is overloading the frame.', trainer('engineer')),
          speech('Lt. Surge', 'The building is unstable. Pull back.'),
          speech('Mako', 'If Magneton surges again, it takes the Center line with it.'),
          speech('Lt. Surge', 'That is an order, Mako.'),
          speech('Mako', 'Then it is a bad one. You can help me change it or watch me disobey.'),
          speech('Lt. Surge', 'Show me the safest route in.'),
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
          speech('Lt. Surge', 'Who here knows the old harbour grid?'),
          speech('Harbour Mechanic', 'I wired half the docks. Give me a torch.', trainer('engineer')),
          speech('Nurse', 'I need two people on the Center batteries.', trainer('nurse')),
          speech('Lt. Surge', 'Mako, write it down. This time we use the plan the room gives us.'),
        ],
      ),
      scene(
        'the-first-roster',
        'After the Thunder',
        'The temporary shelter becomes part of Vermilion’s permanent emergency plan.',
        surgeShelter,
        [
          speech('Mako', 'You spelled volunteer wrong.', trainer('engineer')),
          speech('Lt. Surge', 'I was busy giving one child command of the blanket store.'),
          speech('Young Trainer', 'You asked me. That is different.', trainer('youngster')),
          narration('The first shelter roster stayed beside the Gym challenge board. Nobody on it had a rank.'),
        ],
      ),
    ],
  },
  erika: {
    sequence: [
      scene(
        'the-old-glasshouse',
        'Where the Oddish Would Not Grow',
        'Gloom notices the first sign that something beneath the community glasshouse is wrong.',
        erikaGlasshouse,
        [
          narration('The east beds were usually full of Oddish before Erika arrived. That morning, every one of them had crowded against the west door.'),
          speech('Sumi', 'They started moving away from that bed yesterday.', trainer('maid')),
          speech('Erika', 'Gloom will not step near it either. The soil smells metallic.'),
          speech('Sumi', 'As if the new owners next door were not enough.'),
          speech('Erika', 'What new owners?'),
        ],
      ),
      scene(
        'one-months-notice',
        'The Garden Next Door',
        'A development company claims the glasshouse land while Erika investigates the dying roots.',
        erikaGlasshouse,
        [
          speech('Gable', 'The warehouse purchase includes this parcel. You have one month to clear it.', trainer('gentleman')),
          speech('Sumi', 'Families have grown food here for thirty years.', trainer('maid')),
          speech('Gable', 'Then they have had a generous arrangement. The site report says the ground is clean.'),
          speech('Erika', 'Clean ground does not turn white roots yellow overnight.'),
          speech('Gable', 'Send me a sample if you find something. Until then, the notice stands.'),
        ],
      ),
      game('trace-the-contamination'),
      scene(
        'the-sick-drain',
        'Something Below the Floor',
        'The contaminated roots lead Erika and Sumi to a frightened Muk beneath the glasshouse.',
        erikaWarehouse,
        [
          narration('The damaged plants formed a line toward an old drainage hatch. Gloom pulled back as Erika lifted it.'),
          speech('Sumi', 'There is something moving in the runoff.', trainer('maid')),
          speech('Erika', 'Muk. Its skin is burned where the water touches it.'),
          speech('Sumi', 'Is it causing the damage?'),
          speech('Erika', 'No. It is trapped in the same poison as the roots. We need to calm it before we can reach the drain.'),
        ],
      ),
      battle('suffering-muk'),
      scene(
        'the-cracked-tank',
        'The Source Upstairs',
        'Once Muk is safe, Gloom follows the runoff to a hidden tank in the warehouse.',
        erikaWarehouse,
        [
          narration('Muk settled on a dry loading pallet. Tangela followed the pipe through a gap in the warehouse wall.'),
          speech('Sumi', 'That tank is older than the new company.', trainer('maid')),
          speech('Erika', 'And the crack has been patched recently.'),
          speech('Sumi', 'The site report said there were no storage tanks.'),
          speech('Erika', 'Copy the report and fetch the city inspector. Gloom and I will make sure the tank is still here when she arrives.'),
        ],
      ),
      scene(
        'the-pump',
        'Before the Inspector Arrives',
        'Gable returns with a pump and decides that moving the evidence is cheaper than stopping the project.',
        erikaWarehouse,
        [
          speech('Gable', 'The leak predates us. We will remove the tank and pay for fresh soil.', trainer('gentleman')),
          speech('Erika', 'Your pump empties into the glasshouse drain.'),
          speech('Gable', 'For ten minutes. Then the obstruction is gone and the cleanup can begin.'),
          speech('Erika', 'The obstruction is evidence. Muk is evidence. So are the families you are about to poison.'),
          speech('Gable', 'Move your Pokémon, Miss Erika.'),
          speech('Erika', 'No. You may explain the delay to the inspector.'),
        ],
      ),
      battle('developer-enforcer'),
      scene(
        'the-inspection',
        'Samples From Both Sides',
        'The inspector arrives before Gable can move the tank or pump its contents away.',
        erikaWarehouse,
        [
          speech('City Inspector', 'Poké Balls away. Nobody touches the tank.', trainer('expert-f')),
          speech('Gable', 'She attacked my crew and delayed an authorised cleanup.', trainer('gentleman')),
          speech('Erika', 'The pump leads to the glasshouse. Please sample it before anyone disconnects it.'),
          narration('The inspector filled one vial from the tank, one from the pump, and one from the dead east bed.'),
          speech('City Inspector', 'Same residue in all three. The development order is suspended.'),
        ],
      ),
      scene(
        'the-hearing',
        'A Report With All Its Pages',
        'Erika and Sumi show the city how the contamination was hidden.',
        erikaGlasshouse,
        [
          speech('Gable', 'We inherited the tank. The company did not cause the original leak.', trainer('gentleman')),
          speech('Erika', 'You inherited the truth too. You removed it from your report.'),
          speech('City Inspector', 'The application is rejected. The company will fund the cleanup and surrender its claim on the glasshouse parcel.', trainer('expert-f')),
          speech('Sumi', 'Does that mean we can stay?', trainer('maid')),
          speech('City Inspector', 'It means you have a great deal of poisoned soil to replace. After that, yes.'),
        ],
      ),
      scene(
        'the-glasshouse-stays',
        'New Soil',
        'The gardeners rebuild the beds and welcome back the Pokémon that warned them.',
        erikaGlasshouse,
        [
          narration('Months later, clean soil reached the east wall. The Oddish returned before the final barrow was empty.'),
          speech('Sumi', 'Gloom still checks the drain every morning.', trainer('maid')),
          speech('Erika', 'A sensible habit. Official reports are less reliable.'),
          speech('Sumi', 'The Gym committee asked who organised the cleanup teams.'),
          speech('Erika', 'You told them it was the gardeners.'),
        ],
      ),
      scene(
        'the-living-gym',
        'A Gym With Roots',
        'The glasshouse community puts Erika forward to lead Celadon Gym.',
        erikaGlasshouse,
        [
          speech('Sumi', 'I told them the gardeners chose you.', trainer('maid')),
          speech('Erika', 'That sounds dangerously like a committee decision.'),
          speech('Sumi', 'The post comes with a larger greenhouse and city inspectors who answer your letters.'),
          speech('Erika', 'Gloom, what do you think?'),
          narration('Gloom settled in the new east bed, directly above the repaired drain. Erika accepted the interview.'),
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
          speech('Koga', 'Seven marks. Three false trails. One target before moonrise.'),
          speech('Janine', 'Why does the third mark face east?', trainer('school-kid-f')),
          speech('Koga', 'Because that is the course.'),
          speech('Janine', 'You taught me an obvious trail may be bait.'),
          speech('Koga', 'Then prove which shadows belong to the target before you question the scroll.'),
        ],
      ),
      game('read-the-shadow-marks'),
      scene(
        'questions-are-not-disobedience',
        'The Mark That Should Not Be There',
        'Janine completes the exercise by refusing the answer Koga expected.',
        kogaCourtyard,
        [
          speech('Janine', 'The east mark belongs to nobody. It was painted after the dust settled.', trainer('school-kid-f')),
          speech('Koga', 'You were expected to follow it and recover.'),
          speech('Janine', 'Then the trial measures recovery from a mistake you ordered me to make.'),
          speech('Koga', 'It measures execution.'),
          speech('Janine', 'Test my execution in a battle. Do not call obedience judgment.'),
        ],
      ),
      battle('janines-spar'),
      scene(
        'the-missing-case',
        'A Real Trail Interrupts the Lesson',
        'Apothecary Ren reports a stolen case while Koga and Janine are still arguing.',
        kogaApothecary,
        [
          speech('Ren', 'Six sealed toxin samples are missing. The case left through this window.', trainer('expert-m')),
          speech('Koga', 'Purple thread on the latch. Pecha powder on the sill.'),
          speech('Janine', 'Too much of both.', trainer('school-kid-f')),
          speech('Ren', 'The sample labels were torn from my ledger. Can you reconstruct them?'),
          speech('Koga', 'We identify what was taken first. Then we follow the trail.'),
        ],
      ),
      game('separate-the-toxins'),
      scene(
        'the-perfect-decoy',
        'The Trail Everyone Can See',
        'The reconstructed samples make Janine more certain that the rooftop clues are staged.',
        kogaRooftops,
        [
          speech('Janine', 'None of the stolen compounds contain Pecha. The powder is decoration.', trainer('school-kid-f')),
          speech('Koga', 'Or the thief handled antidotes before the robbery.'),
          speech('Janine', 'The footprints begin beneath the window. Nobody landed there.'),
          speech('Koga', 'Stay with Ren. I will test the route.'),
          speech('Janine', 'You mean follow it.'),
        ],
      ),
      scene(
        'the-decoy-waits',
        'Exactly Where Expected',
        'Koga reaches the end of the rooftop trail and finds a thief carrying an empty copy of the case.',
        kogaRooftops,
        [
          narration('Every mark led to the same roof. A man waited beside the chimney with purple thread tied around his sleeve.'),
          speech('Jiro', 'Fuchsia’s great tracker arrives on time.', trainer('super-nerd')),
          speech('Koga', 'Put down the case.'),
          speech('Jiro', 'This one? You should inspect it after you earn it.'),
        ],
      ),
      battle('decoy-thief'),
      scene(
        'janines-evidence',
        'The Trail That Was Missing',
        'The decoy case is empty, and Janine has followed the route with no marks at all.',
        kogaApothecary,
        [
          speech('Koga', 'A perfect copy. No samples.'),
          speech('Ren', 'Janine left through the service passage five minutes ago.', trainer('expert-m')),
          speech('Janine', 'I am below you. The real case went through the drain tunnel.', trainer('school-kid-f')),
          speech('Koga', 'What trail did you follow?'),
          speech('Janine', 'None. A thief who studied you decorated the roof. The unmarked door was the only honest clue.'),
        ],
      ),
      scene(
        'below-the-rooftops',
        'Trust the Unwritten Route',
        'Koga reaches the tunnel and lets Janine close the escape instead of sending her back.',
        kogaApothecary,
        [
          speech('Janine', 'Raku has the case. He will run toward you when I block the lower gate.', trainer('school-kid-f')),
          speech('Koga', 'The lower gate has no light.'),
          speech('Janine', 'Neither does he.'),
          speech('Koga', 'Take Venonat. Signal once the gate is closed.'),
          speech('Janine', 'Is that an order or a plan?'),
          speech('Koga', 'A plan. Improve it if you must.'),
        ],
      ),
      battle('tunnel-culprit'),
      scene(
        'the-revised-scroll',
        'One New Question',
        'Koga changes the succession trial after Janine recovers the real case.',
        kogaCourtyard,
        [
          speech('Koga', 'You abandoned the written trail.'),
          speech('Janine', 'I identified the real target and recovered it.', trainer('school-kid-f')),
          speech('Koga', 'Explain how you knew the obvious route was false.'),
          speech('Janine', 'Is that part of the trial now?'),
          speech('Koga', 'It appears the previous copy omitted a line.'),
          speech('Janine', 'Of course, Father.'),
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
          speech('Mother', 'Would you like toast?', trainer('pokefan-f')),
          speech('Sabrina', 'You think I look tired.'),
          speech('Father', 'Your mother did not say that.', trainer('pokefan-m')),
          speech('Sabrina', 'You think she worries too much. The neighbour is thinking about a leaking tap.'),
          speech('Mother', 'Sabrina, look at me. What do you need?'),
          speech('Sabrina', 'For everyone to stop, even when they are not speaking.'),
        ],
      ),
      scene(
        'the-silph-offer',
        'One Signal at a Time',
        'A Silph researcher offers Sabrina a controlled way to practise selecting one psychic signal.',
        sabrinaLab,
        [
          speech('Researcher Orla', 'The chamber sends Porygon to one of two receivers. Your signal tells it which one.', trainer('researcher-f')),
          speech('Mother', 'Could the filter help her outside the laboratory?', trainer('pokefan-f')),
          speech('Orla', 'Perhaps, but that is not a promise.'),
          speech('Sabrina', 'If I ask to stop, do you stop?'),
          speech('Orla', 'Immediately. You control the test.'),
        ],
      ),
      scene(
        'the-first-calibration',
        'The Quiet Pattern',
        'Sabrina builds a focus pattern around Porygon’s signal while Haunter watches from the ceiling.',
        sabrinaLab,
        [
          speech('Orla', 'Receiver one only. Find Porygon and hold the route.', trainer('researcher-f')),
          speech('Sabrina', 'There are twelve people in the next building.'),
          speech('Orla', 'The Fighting Dojo. Let those thoughts pass and keep the shape you chose.'),
          speech('Sabrina', 'Haunter, stop copying the shape.'),
        ],
      ),
      game('hold-the-focus-pattern'),
      scene(
        'the-second-receiver',
        'A Successful Test Becomes Another Test',
        'The first calibration works, so Silph activates equipment Sabrina was not told would be used.',
        sabrinaLab,
        [
          speech('Orla', 'Clean transfer. Porygon arrived exactly on target.', trainer('researcher-f')),
          speech('Director Venn', 'Bring receiver two online.', trainer('scientist')),
          speech('Sabrina', 'That was not part of the test.'),
          speech('Venn', 'The first result proves you can manage it.'),
          speech('Orla', 'She asked to approve every stage.'),
          speech('Venn', 'We are calibrating a machine, not negotiating with it.'),
        ],
      ),
      scene(
        'two-signals',
        'Porygon Between Rooms',
        'Both receivers seize the same signal and amplify every nearby thought through Sabrina.',
        sabrinaLab,
        [
          narration('Both pads lit at once. Porygon flickered between them while the Dojo’s thoughts crashed through the chamber walls.'),
          speech('Sabrina', 'Shut it down.'),
          speech('Venn', 'The readings are inside tolerance.', trainer('scientist')),
          speech('Orla', 'Porygon is splitting. Sabrina, release the signal.', trainer('researcher-f')),
          speech('Sabrina', 'I cannot find where it ends.'),
          speech('Orla', 'Then we reach it first. Keep looking at Porygon.'),
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
          speech('Younger Sabrina', 'Nothing can reach us here.', trainer('gym-kanto-sabrina')),
          speech('Sabrina', 'Porygon is still in the chamber.'),
          speech('Younger Sabrina', 'So are all the voices.'),
          speech('Sabrina', 'One of them is real. I need to find its shape without opening everything.'),
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
          speech('Younger Sabrina', 'That is cruel.', trainer('gym-kanto-sabrina')),
          speech('Sabrina', 'It is accurate.'),
          narration('Sabrina laughed once. The copied signal broke apart, leaving Porygon’s steady pulse beneath it.'),
          speech('Sabrina', 'Receiver one. Orla, send it to receiver one.'),
        ],
      ),
      scene(
        'ask-before-entering',
        'The Chamber Opens',
        'Porygon returns safely, and Koichi waits for permission before approaching Sabrina.',
        sabrinaLab,
        [
          narration('Receiver one went dark with Porygon safely inside. The chamber door opened, but nobody crossed the threshold.'),
          speech('Koichi', 'The feedback reached the Dojo. May I come in?', trainer('black-belt')),
          speech('Sabrina', 'You were afraid.'),
          speech('Koichi', 'Yes. I can tell you why, or I can leave.'),
          speech('Sabrina', 'Come in. Tell me aloud.'),
        ],
      ),
      scene(
        'koichis-focus-test',
        'Face to Face',
        'Koichi offers training built around asking before increasing the pressure.',
        sabrinaDojo,
        [
          speech('Koichi', 'I cannot make Saffron quiet. I can help you practise choosing where your attention goes.', trainer('black-belt')),
          speech('Sabrina', 'Silph said something similar.'),
          speech('Koichi', 'Silph changed the test after you agreed. I will not.'),
          speech('Sabrina', 'One battle. Stop when I say stop.'),
          speech('Koichi', 'Those are the rules.'),
        ],
      ),
      battle('koichis-focus-test'),
      scene(
        'one-door-open',
        'A Room With Two Handles',
        'Sabrina keeps the quiet she needs and gives her family a way to approach it respectfully.',
        sabrinaRoom,
        [
          speech('Mother', 'We moved the breakfast table away from the street wall.', trainer('pokefan-f')),
          speech('Father', 'And we knock. Even when the door is open.', trainer('pokefan-m')),
          speech('Sabrina', 'The Quiet Room stays.'),
          speech('Mother', 'It is your room.'),
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
          speech('Blaine', 'Question one. Why did two careful men build something dangerous?'),
          speech('Blaine', 'Pride, impatience, or one beautiful result?'),
          narration('He crossed out the answer boxes. The memory began before any of them were needed.'),
        ],
      ),
      scene(
        'before-the-answers',
        'The Stop Rule',
        'Blaine and Fuji begin a recovery study with clear limits and honest intentions.',
        blaineLab,
        [
          speech('Fuji', 'We record every failed recovery, not only the useful ones.', local('/sprites/trainers/special/fuji.avif')),
          speech('Blaine', 'And if a Pokémon’s baseline falls, the test stops.'),
          speech('Fuji', 'No deadline changes that.'),
          speech('Blaine', 'Write it above the door if you think I will forget.'),
          speech('Fuji', 'I am writing it in the protocol, where you have to sign it.'),
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
          speech('Fuji', 'Easy. Let it choose the pace.', local('/sprites/trainers/special/fuji.avif')),
          speech('Blaine', 'It is walking, Fuji.'),
          speech('Fuji', 'I can see that.'),
          narration('They laughed loudly enough to bring every researcher in the corridor to the window.'),
        ],
      ),
      scene(
        'the-new-deadline',
        'Promising by Friday',
        'A patron offers the laboratory security in exchange for a public result on a fixed date.',
        blaineLab,
        [
          speech('League Patron', 'Demonstrate stable recovery on Friday and the laboratory is funded for five years.', trainer('gentleman')),
          speech('Fuji', 'Stable recovery does not happen on a calendar.', local('/sprites/trainers/special/fuji.avif')),
          speech('Blaine', 'We already have eleven clean trials.'),
          speech('Fuji', 'We have eleven subjects, not a stage act.'),
          speech('League Patron', 'Then Friday should be straightforward.'),
          speech('Blaine', 'It will be.'),
        ],
      ),
      scene(
        'the-safety-demonstration',
        'The Procedure Works',
        'Blaine proves that everyone in the laboratory knows the shutdown sequence.',
        blaineLab,
        [
          speech('Orin', 'Simulated field spike in ten seconds.', trainer('researcher')),
          speech('Fuji', 'Medical route clear. All subjects accounted for.', local('/sprites/trainers/special/fuji.avif')),
          speech('Blaine', 'Lockdown team, show our patron how quickly Friday ends if the readings move.'),
          speech('Orin', 'System ready.'),
        ],
      ),
      battle('safety-demonstration'),
      scene(
        'the-anomaly',
        'The Twelfth Result',
        'After the successful drill, a recovery baseline falls and Blaine prepares another rehearsal instead of stopping.',
        blaineLab,
        [
          speech('Orin', 'Subject twelve is below its intake baseline.', trainer('researcher')),
          speech('Blaine', 'Run the sensors again.'),
          speech('Orin', 'I did. Twice.'),
          narration('Blaine moved the twelfth page out of the demonstration summary and placed it beneath the full report.'),
          speech('Blaine', 'We rehearse containment once more. If anything fails, Friday is cancelled.'),
        ],
      ),
      game('run-the-containment-sequence'),
      scene(
        'the-page-that-did-not-fit',
        'What Blaine Removed',
        'Fuji finds the missing result after the laboratory passes every safety check.',
        blaineLab,
        [
          speech('Fuji', 'Why is subject twelve absent from the summary?', local('/sprites/trainers/special/fuji.avif')),
          speech('Blaine', 'One unstable result against eleven clean ones.'),
          speech('Fuji', 'The stop rule does not say eleven to one.'),
          speech('Blaine', 'The sensors may be wrong.'),
          speech('Fuji', 'Then why hide the page before proving that?'),
          speech('Blaine', 'Because they would cancel Friday before we could answer the question.'),
        ],
      ),
      scene(
        'one-more-trial',
        'The Answer Blaine Wanted',
        'Fuji asks Blaine to stop, and Blaine authorises the trial anyway.',
        blaineLab,
        [
          speech('Fuji', 'Cancel the demonstration. Suspend every trial tonight.', local('/sprites/trainers/special/fuji.avif')),
          speech('Blaine', 'One run at the lower setting tells us whether the result repeats.'),
          speech('Fuji', 'It already repeated. You made Orin test it twice.'),
          speech('Blaine', 'If the field is stable, stopping now throws away five years of work.'),
          speech('Fuji', 'No. Continuing throws the risk onto a Pokémon that cannot sign your protocol.'),
          speech('Blaine', 'I am authorising one final run.'),
        ],
      ),
      scene(
        'the-alarm',
        'Not a Rehearsal',
        'The final trial overheats and a panicked Magmar blocks the evacuation corridor.',
        blaineLab,
        [
          narration('The field climbed past the shutdown line before the first reading completed. Smoke rolled through the containment wing.'),
          speech('Orin', 'Automatic locks are not releasing!', trainer('researcher')),
          speech('Fuji', 'I am staying with the subject. Get the technicians out.', local('/sprites/trainers/special/fuji.avif')),
          speech('Blaine', 'Growlithe, take the medical corridor.'),
          speech('Orin', 'Magmar is loose between us and the exit.'),
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
          speech('Fuji', 'The subject died after the field collapsed.', local('/sprites/trainers/special/fuji.avif')),
          speech('Blaine', 'I know.'),
          speech('Fuji', 'You knew enough before it started.'),
          speech('Blaine', 'Where will you go?'),
          speech('Fuji', 'Somewhere the Pokémon come before the work.'),
        ],
      ),
      scene(
        'the-last-question',
        'No Trick Answer',
        'Blaine writes the first safety question for the Gym he later builds.',
        blaineQuiz,
        [
          speech('Blaine', 'Final question. When did I know the trial was unsafe?'),
          narration('He looked at the twelfth result, still creased where he had hidden it.'),
          speech('Blaine', 'Before the alarm. Before Fuji left. I knew when I removed this page.'),
          speech('Young Researcher', 'What should a Trainer do when a Pokémon shows pain during practice?', trainer('researcher-f')),
          speech('Blaine', 'Stop. Record what happened. Ask for help. Put that answer first.'),
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
          speech('His Son', 'The final starts at eight. Not around eight.', trainer('school-kid-m')),
          speech('Giovanni', 'I will be in the front row before they call your name.'),
          speech('His Son', 'You said that last time.'),
          speech('Giovanni', 'Last time there was no final.'),
          speech('His Son', 'There was still a match.'),
        ],
      ),
      scene(
        'one-short-meeting',
        'Nine in the Morning',
        'A blocked supply road offers Giovanni a useful problem he expects to solve quickly.',
        giovanniOffice,
        [
          speech('Route Contractor', 'The western road is blocked. Food and medicine are sitting in three warehouses.', trainer('gentleman')),
          speech('Giovanni', 'How long to clear it?'),
          speech('Route Contractor', 'Two hours if someone coordinates the crews.'),
          speech('Giovanni', 'I will handle the first section personally.'),
          speech('Ariana', 'Your calendar is clear until six.', trainer('ariana')),
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
          speech('Driver', 'Raiders have blocked the route. They know what we are carrying.', trainer('biker')),
          speech('Ariana', 'The local guard can reach them in forty minutes.', trainer('ariana')),
          speech('Giovanni', 'The medicine reaches Viridian in thirty. Send my car.'),
        ],
      ),
      battle('relief-raiders'),
      scene(
        'the-first-reminder',
        'Half Past One',
        'Giovanni’s son calls while the emergency work becomes a permanent business.',
        giovanniOffice,
        [
          speech('His Son', 'I won the morning round.', trainer('school-kid-m')),
          speech('Giovanni', 'Of course you did.'),
          speech('His Son', 'Front row. Before they call my name.'),
          speech('Giovanni', 'I remember.'),
          narration('After the call, Giovanni signed the first exclusive transport agreement for the reopened road.'),
        ],
      ),
      scene(
        'the-league-offer',
        'Three O’Clock',
        'The League offers Giovanni the vacant Viridian Gym if he completes an assessment that day.',
        '/backgrounds/gym-ground.avif',
        [
          speech('Hadrian', 'Viridian needs a Leader with staff, Pokémon, and enough money to reopen the building.', trainer('expert-m')),
          speech('Giovanni', 'The League objected to my influence this morning.'),
          speech('Hadrian', 'This afternoon it needs it contained somewhere visible.'),
          speech('Giovanni', 'And the assessment cannot wait until tomorrow?'),
          speech('Hadrian', 'Not if you want the charter signed today.'),
        ],
      ),
      battle('league-assessment'),
      scene(
        'the-gym-charter',
        'Five Fifteen',
        'Passing the League assessment gives Giovanni another institution to connect to his growing network.',
        '/backgrounds/gym-ground.avif',
        [
          speech('Hadrian', 'The Gym is yours once the repairs pass inspection.', trainer('expert-m')),
          speech('Giovanni', 'My road crews can begin tomorrow.'),
          speech('Hadrian', 'You already employ the crews that supply the city.'),
          speech('Giovanni', 'That is why the work will be completed.'),
        ],
      ),
      scene(
        'arianas-opportunity',
        'Six Ten',
        'Ariana brings the last meeting Giovanni would need to decline to keep his promise.',
        giovanniOffice,
        [
          speech('Ariana', 'Our competitors meet at seven. If we miss them, they keep the southern depots.', trainer('ariana')),
          speech('Giovanni', 'Send Petrel.'),
          speech('Ariana', 'He will accept shared access.'),
          speech('Giovanni', 'Then send him with instructions not to.'),
          speech('Ariana', 'You do not trust him to close it. Neither do I.'),
        ],
      ),
      scene(
        'the-choice-that-looked-small',
        'Seven O’Clock',
        'Giovanni chooses to take the meeting and tells himself the delay is too small to matter.',
        giovanniOffice,
        [
          speech('Giovanni', 'The tournament hall is fifteen minutes away. This meeting takes ten.'),
          speech('Ariana', 'Your car is waiting.', trainer('ariana')),
          narration('The depot owners arrived with a contract twice as long as promised.'),
          speech('Giovanni', 'Tell the driver to keep the engine running.'),
        ],
      ),
      scene(
        'the-cold-dinner',
        'The Front Row Stayed Empty',
        'Giovanni returns after the tournament and finds the trophy his son did not wait to show him.',
        giovanniHome,
        [
          narration('The dining-room clock read ten twenty-three. A small runner-up trophy stood beside Giovanni’s untouched place.'),
          speech('Housekeeper', 'He asked me not to wake him when you returned.', trainer('maid')),
          speech('Giovanni', 'Did he eat?'),
          speech('Housekeeper', 'He waited until the final was over.'),
          speech('Giovanni', 'Order the winner’s trophy. Have it here before breakfast.'),
        ],
      ),
      scene(
        'that-is-not-mine',
        'The Next Morning',
        'Giovanni tries to replace the thing he missed with something more expensive.',
        giovanniHome,
        [
          speech('His Son', 'That is not mine.', trainer('school-kid-m')),
          speech('Giovanni', 'It is better made. The engraver can add your name.'),
          speech('His Son', 'I did not win it.'),
          speech('Giovanni', 'There will be another tournament.'),
          speech('His Son', 'Will you be there?'),
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
