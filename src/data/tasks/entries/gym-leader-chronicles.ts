import { KANTO_GYM_CHRONICLES, type KantoGymChronicleKey } from '@/data/gym-leader-chronicles'
import type { Task } from '../../types'

interface ChronicleBeat {
  id: string
  title: string
  description: string
  message: string
}

const storyBeats: Record<KantoGymChronicleKey, ChronicleBeat[]> = {
  brock: [
    { id: 'before-dawn', title: 'Before Dawn', description: 'Brock begins another day carrying every Pewter responsibility himself.', message: 'I was at the quarry before sunrise because I thought that was what dependable people did. Flint was gone, the Gym needed opening, and my brothers and sisters needed breakfast. I mistook being needed for having to do everything alone.' },
    { id: 'collapse', title: 'The Collapse', description: 'A tremor traps workers and Pokémon inside a quarry tunnel.', message: 'The first crack sounded like a snapped bone. Dust swallowed the lamps, and a frightened Rhyhorn drove deeper into the tunnel while I held a failing beam with Onix. I kept saying I had it under control until my arms stopped believing me.' },
    { id: 'shared-weight', title: 'Shared Weight', description: 'Brock entrusts the rescue to the people beside him.', message: 'I finally called every worker by name and gave each one a job. Geodude cleared rubble, the crew braced the roof, and I guided Rhyhorn toward our voices. The tunnel held because all of us carried the weight together.' },
    { id: 'league-offer', title: 'An Offer from the League', description: 'Pewter asks Brock to turn his steadiness into public service.', message: 'The League representative praised my strength, but the foreman corrected him. He said my real talent was helping frightened people remember what they could do. When they offered me the Gym, I accepted only after my family promised to tell me when I was taking on too much.' },
    { id: 'first-lesson', title: 'The First Lesson', description: 'The Boulder Badge receives the principle Brock intends it to represent.', message: 'We set the rescued support beam above the Gym entrance. My first challenger expected a lecture about unbreakable stone; I told them stone survives because every layer bears the others. That became the lesson behind the Boulder Badge.' },
  ],
  misty: [
    { id: 'rehearsal', title: 'The Perfect Rehearsal', description: 'Misty fights to be seen beside her celebrated sisters.', message: 'My sisters could fill every seat without raising their voices. I could swim faster and dive deeper, yet the posters still called me the little sister. That night I planned a finale so big nobody could ignore me.' },
    { id: 'storm', title: 'When the Pumps Failed', description: 'A violent storm turns the aquatic show into an emergency.', message: 'Lightning killed the pumps halfway through the performance. The lower tank began draining into a maintenance channel, carrying a school of Horsea toward the grates. Applause became shouting, and the spotlight meant nothing.' },
    { id: 'command', title: 'Clear Water, Clear Orders', description: 'Misty takes command while a panicked Gyarados blocks the rescue.', message: 'I stopped trying to sound like my sisters. I gave short orders, sent Starmie to seal the channel, and stayed beside Gyarados until it could hear me over the alarms. Leadership was not about everyone watching me. It was about making sure I saw everyone else.' },
    { id: 'sisters-test', title: 'The Sisters’ Test', description: 'Misty proves the Gym needs a battler as well as performers.', message: 'At dawn my sisters challenged me on the wet stage. They wanted to know if I had only rescued one show or if I could reshape the Gym itself. I battled without any flourish, and for once the silence afterward belonged to me.' },
    { id: 'earrings', title: 'A Different Spotlight', description: 'Misty chooses what she will carry from the old show.', message: 'I kept one pair of stage earrings and the unpaid pump invoice. One reminds me that a little spectacle can inspire people. The other reminds me what happens when appearances matter more than maintenance. The Cascade Badge would stand for courage and attention in equal measure.' },
  ],
  surge: [
    { id: 'briefing', title: 'The Evacuation Order', description: 'Surge receives orders for one final civilian transport flight.', message: 'The route was marked safe in green ink. That only meant someone far away had decided the danger was acceptable. My transport carried families and medicine, while Electabuzz kept glaring at the noisy engines. We were ordered to fly straight through the storm.' },
    { id: 'storm', title: 'A Dead Circuit', description: 'The aircraft loses its main electrical system over the sea.', message: 'The main circuit burned out above black water. Electabuzz pressed both hands to the auxiliary bus while I worked the breakers, and every light returned except the fuel gauge. Command told us to continue.' },
    { id: 'turn-back', title: 'Turn Back', description: 'Surge chooses people over an order written for a different sky.', message: 'Then the radio caught a broken distress call from the island behind us. I could obey the order, protect the aircraft, and leave a village with no way out. Or I could turn around based on one broken call. I turned around.' },
    { id: 'landing', title: 'The Last Landing', description: 'Surge and Electabuzz bring the overloaded transport home.', message: 'We loaded everyone who could fit and stripped the cabin to make room. Electabuzz kept the controls alive until the runway lights appeared through rain, then collapsed against my seat. That landing ended my career in the air.' },
    { id: 'new-station', title: 'A Station That Stays Lit', description: 'Surge gives Vermilion the resilience he once needed in the sky.', message: 'Vermilion offered me a Gym beside an abandoned power station. I rebuilt both with backup circuits and doors wide enough for emergency cots. The Thunder Badge is not about striking first. It is about being the current people can still rely on.' },
  ],
  erika: [
    { id: 'glasshouse', title: 'The Old Glasshouse', description: 'Erika tends a community greenhouse threatened by redevelopment.', message: 'Before the Gym, there was a glasshouse where anyone in Celadon could grow something. Developers called it an inefficient patch of soil. I answered politely, because people often mistake politeness for surrender.' },
    { id: 'sick-soil', title: 'Sick Soil', description: 'Plants and Pokémon fall ill from something beneath the greenhouse.', message: 'The roots yellowed first, then Oddish began refusing the eastern beds. Beneath the floor we found chemical runoff and a Muk made frantic by pain. The company report insisted the soil was healthy.' },
    { id: 'whispers', title: 'What the Roots Remember', description: 'Erika gathers evidence where officials refuse to look.', message: 'Tangela traced the poisoned water back through the old drainage pipes. Gardeners brought me samples, dates, and accounts they had been afraid to share. A small black Rhyhorn seal marked the redevelopment contract, though nobody would name its owner.' },
    { id: 'public-bloom', title: 'A Public Bloom', description: 'Erika turns a ceremonial exhibition into a public reckoning.', message: 'At the project unveiling, I filled the display fountains with the same contaminated water. Wilting flowers told the truth faster than any speech, and the evidence went to every reporter in the room. We treated Muk instead of blaming it.' },
    { id: 'living-gym', title: 'A Living Gym', description: 'The saved greenhouse becomes the heart of Erika’s leadership.', message: 'The city granted me stewardship of the glasshouse and later asked me to lead its Gym. I sealed a copy of the disputed contract beneath my oldest tree. The Rainbow Badge would honor the patience to wait and the courage to act when the moment came.' },
  ],
  koga: [
    { id: 'lesson', title: 'A Lesson in Silence', description: 'Koga teaches discipline while Janine struggles to earn his trust.', message: 'I taught Janine that a true ninja leaves no trace. She learned every stance and every antidote, yet I still treated concern as weakness and questions as noise. Silence became a wall between us.' },
    { id: 'stolen-venom', title: 'The Stolen Venoms', description: 'Rare Safari venoms disappear from a secured Fuchsia storehouse.', message: 'The lock was untouched, but six sealed venoms were gone. I followed the thief alone because pride told me secrecy was control. Janine followed because experience told her I was wrong.' },
    { id: 'janine-follows', title: 'A Daughter Exposed', description: 'Janine is poisoned while protecting Koga from the thieves.', message: 'She intercepted the dart meant for me. The thieves fled with their case while Janine’s breathing slowed in my arms. No doctrine survives the moment it endangers the person it was meant to prepare.' },
    { id: 'antidote', title: 'The Antidote', description: 'Koga races to identify the toxin and prepare the only treatment.', message: 'Our standard cures failed because the thieves had mixed the samples. I returned to the old apothecary, identified each component by scent, and made the antidote while I counted Janine’s breaths. When her eyes opened, I told her the truth. She had saved us both.' },
    { id: 'new-teaching', title: 'What the Soul Badge Means', description: 'Koga replaces unquestioned obedience with shared judgment.', message: 'We recovered the chemical case, stamped with a small black Rhyhorn seal. I changed every lesson afterward: students would challenge orders that endangered the team. The Soul Badge came to represent discipline guided by conscience.' },
  ],
  sabrina: [
    { id: 'noise', title: 'Every Voice', description: 'Young Sabrina lives with thoughts that never fully go quiet.', message: 'Saffron was never silent to me. Feelings arrived before words, crowded and bright, until I learned to close every door inside myself. People mistook that for composure. It was mostly survival.' },
    { id: 'silph-invitation', title: 'The Calibration', description: 'Silph asks Sabrina to stabilize a new teleport system.', message: 'Silph invited me to calibrate a teleport chamber using psychic resonance. Their equations were elegant, but their schedule was reckless. The entry for the new equipment carried a small black Rhyhorn seal.' },
    { id: 'ignored-warning', title: 'The Warning They Ignored', description: 'The test proceeds after Sabrina senses several minds overlapping.', message: 'I felt a second destination before the machine powered on: frightened Pokémon, a Porygon caught between commands, and a younger echo of my own panic. I ordered a shutdown. The director began the test anyway.' },
    { id: 'younger-echo', title: 'The Child in the Glass', description: 'Sabrina enters the psychic feedback to guide the displaced Pokémon home.', message: 'Haunter made me laugh, and that break in my concentration gave me an opening. I entered the feedback, found each terrified mind, and led them back one by one. The childlike echo was the part of me I had locked away.' },
    { id: 'open-door', title: 'An Open Door', description: 'Sabrina chooses a different relationship with Saffron and its Fighting Dojo.', message: 'Afterward I accepted the Gym and reopened talks with the Fighting Dojo. Strength did not need to be silent to be controlled. The Marsh Badge would ask challengers to hear themselves clearly without shutting everyone else out.' },
  ],
  blaine: [
    { id: 'honest-question', title: 'The Honest Question', description: 'Blaine and Fuji begin a legitimate study of Pokémon recovery.', message: 'Fuji and I wanted to understand how Pokémon energy, psychic resonance, and recovery interacted. The work promised gentler treatment after severe injury. Our first mistake was believing a worthy goal made every method worthy.' },
    { id: 'patron', title: 'The Patron', description: 'Giovanni funds the Cinnabar project through Ariana as liaison.', message: 'Giovanni supplied the laboratory, the containment systems, and the time the university would not give us. Ariana handled the contracts with immaculate efficiency. The funding papers carried a small black Rhyhorn seal, and every deadline seemed to move closer.' },
    { id: 'fuji-warning', title: 'Fuji’s Warning', description: 'Fuji objects when recovery research becomes a pressure test.', message: 'The unnamed subject stopped recovering between trials. Fuji demanded a halt. I asked for one more controlled run because the readings were unprecedented. I asked whether we could stabilize it, not whether we had the right to continue.' },
    { id: 'evacuation', title: 'Containment Failure', description: 'The experiment fails and Blaine leads the laboratory evacuation.', message: 'The chamber alarms rose beyond anything we had modeled. I released the locks, sent Growlithe through the smoke to find every technician, and forced open the security doors until the wing was clear. Ariana copied the data before she left.' },
    { id: 'aftermath', title: 'The Question We Owed', description: 'Blaine chooses teaching and public duty after the disaster.', message: 'The subject did not survive, and no report could make that loss abstract. Fuji left Cinnabar. I stayed to close the laboratory and answer for it. When I later accepted the Gym, every quiz began with the question we should have asked sooner: who bears the cost?' },
  ],
  giovanni: [
    { id: 'empty-road', title: 'The Empty Road', description: 'Giovanni arrives after a crisis leaves Viridian without dependable relief.', message: 'Viridian’s western road washed out, and aid sat in warehouses while committees argued over who was responsible. I moved food, medicine, and workers before anyone granted permission. People remember who arrives while everyone else is still drafting a reply.' },
    { id: 'terms', title: 'Terms of Relief', description: 'Giovanni turns emergency logistics into exclusive contracts.', message: 'Relief requires routes, storage, guards, and certainty. I offered all four in exchange for exclusive contracts, each stamped with a small black Rhyhorn. Celadon, Fuchsia, Saffron, and Cinnabar accepted versions of the same bargain.' },
    { id: 'league-notice', title: 'A League Notice', description: 'The League asks Giovanni to restore order to Viridian Gym.', message: 'The League called my influence troubling, then asked me to restore its abandoned Gym. I understood the contradiction better than they did. Authority belongs to whoever makes disorder expensive and order convenient.' },
    { id: 'waiting-son', title: 'The Boy Who Waited', description: 'Giovanni’s public ascent costs him a private relationship.', message: 'My son waited through another dinner while I finalized the stewardship charter. I told myself he would inherit security instead of uncertainty. By the time I looked up, the plate was cold and the chair was empty.' },
    { id: 'two-charters', title: 'Two Charters', description: 'Giovanni binds public stewardship and private power together.', message: 'Two charters lay on my desk. One named me Viridian’s Gym Leader. The other placed every relief contract under my organization. Beside them sat a dossier of agreements bearing the same black Rhyhorn seal. The Earth Badge became my public promise that order would hold, whatever its price.' },
  ],
}

const memoryMarkerTasks: Task[] = KANTO_GYM_CHRONICLES.map((chronicle) => ({
  id: chronicle.markerId,
  name: `${chronicle.leaderName}'s Badge Memory`,
  description: `A memory inside the ${chronicle.badgeName} has answered the channeling.`,
  category: 'Secret',
  subCategory: `${chronicle.leaderName} Chronicle`,
  icon: { type: 'item', id: chronicle.badgeItemId },
  background: chronicle.background,
  repeatable: false,
  secret: true,
  completionTrigger: 'manual',
  requirements: [],
  criteria: [],
  rewards: [],
}))

const storyTasks: Task[] = KANTO_GYM_CHRONICLES.flatMap((chronicle) =>
  storyBeats[chronicle.key].map((beat) => ({
    id: `chronicle-${chronicle.key}-${beat.id}`,
    name: beat.title,
    description: beat.description,
    category: 'Secret',
    subCategory: `${chronicle.leaderName} Chronicle`,
    icon: { type: 'trainer', id: chronicle.trainerIconId },
    background: chronicle.background,
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Continue the Memory',
    requirements: [{ type: 'task_completed', targetId: chronicle.markerId }],
    criteria: [],
    rewards: [],
    exitModal: {
      icon: { type: 'trainer', id: chronicle.trainerIconId },
      title: beat.title,
      message: beat.message,
      closeButtonText: 'Remember',
      background: chronicle.background,
    },
  })),
)

export const gymLeaderChronicleTasks: Task[] = [...memoryMarkerTasks, ...storyTasks]
