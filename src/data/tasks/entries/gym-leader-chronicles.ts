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
    { id: 'before-dawn', title: 'The Early Shift', description: 'Brock divides his mornings between the quarry and looking after his family.', message: "I used to start at the quarry before sunrise, then head home to make breakfast. Dad had left, so I figured keeping everything running was my job. I didn't give anyone much chance to tell me otherwise. One morning, a support started groaning, and the roof came down before we could clear the tunnel." },
    { id: 'collapse', title: 'Still Inside', description: 'Brock and Onix stay behind with a frightened Rhyhorn.', message: "Most of the crew made it to the entrance, but a Rhyhorn bolted the wrong way. I stayed behind with Onix to hold up one of the damaged supports. I told the others I was fine. I wasn't." },
    { id: 'shared-weight', title: 'Everyone Out', description: 'Brock finally lets the quarry crew help finish the rescue.', message: "The foreman shouted that he still had a full crew waiting for instructions. So I gave them some. Geodude cleared a path, the workers shored up the roof, and we guided Rhyhorn out without losing anyone. At the reopening, the foreman's son Taro asked me for a battle." },
    { id: 'league-offer', title: 'A Visit from the League', description: 'A League official visits the quarry after the rescue.', message: "A League official happened to be watching my battle with Taro. He started talking about my Onix, but the foreman told him to look at how the whole crew worked together. That was the first time anyone asked if I'd consider running Pewter Gym." },
    { id: 'first-lesson', title: 'The Gym Entrance', description: 'A repaired quarry beam finds a new home at Pewter Gym.', message: "We used one of the damaged beams when we repaired the Gym entrance. It wasn't pretty, but I liked having it there. It reminded me that being responsible doesn't mean doing every job yourself." },
  ],
  misty: [
    { id: 'rehearsal', title: 'The Final Rehearsal', description: 'Misty plans a show that will finally put her beside her sisters on the poster.', message: 'My sisters were naturals on stage. I was the one correcting their dive timing and checking the tanks, then watching the posters go up with my name in the smallest print. I planned a finale nobody could ignore. Halfway through it, the storm hit and every pump light went out.' },
    { id: 'storm', title: 'The Lower Tank', description: 'The emergency controls cannot stop one tank from draining.', message: "The emergency controls kept the other tanks stable, but one of the lower tanks was still draining. A school of Horsea was being pulled toward the service grates. The audience started shouting while my sisters tried to clear the stage." },
    { id: 'command', title: 'Into the Water', description: 'Misty takes charge while Gyarados blocks the rescue.', message: 'I sent Starmie to block the channel and told my sisters to get everyone out of the stands. Gyarados was thrashing so hard nobody could get close, so I got in the water and stayed where it could see me. Once it calmed down, we reached the Horsea. The next morning, Daisy was waiting on the wet stage with her Poké Balls.' },
    { id: 'sisters-test', title: 'After the Battle', description: 'Misty earns the chance to change how Cerulean Gym is run.', message: 'Daisy said one rescue did not make me a Gym Leader. Fair enough. I beat her, and my sisters agreed to let me rebuild the programme around Pokémon battles as well as shows. Battling was always the part I was best at.' },
    { id: 'earrings', title: 'The Scratched Earring', description: 'Misty keeps one small reminder of the last aquatic show.', message: 'I kept the earrings from that show, even though one of them still has a scratch. The first thing I did after taking over was replace those pumps. The second was move battles to the centre of the programme, where they belonged.' },
  ],
  surge: [
    { id: 'briefing', title: 'The Flight Plan', description: 'Surge prepares a civilian transport for a flight through worsening weather.', message: "That green line on the flight plan meant the route was supposed to be clear. I didn't believe it, and neither did Electabuzz. We had medicine, a cabin full of civilians, and orders to cross the storm before it got worse. Halfway over the water, the main panel went dark." },
    { id: 'storm', title: 'Auxiliary Power', description: 'The main circuit fails while the transport is over open water.', message: "Electabuzz kept the auxiliary line alive while I reset breakers, and most of the panel came back. The fuel gauge didn't. Command told us to stay on course." },
    { id: 'turn-back', title: 'The Distress Call', description: 'A broken radio call sends Surge back toward the island.', message: "Then we picked up half a distress call from the island we'd just passed. They needed an evacuation, but nobody could tell me how many people were waiting. I turned the transport around before command finished telling me not to." },
    { id: 'landing', title: 'Back on the Runway', description: 'Surge and Electabuzz bring the overloaded transport home.', message: "We landed on the island's old airstrip, threw out anything we did not need, and packed in as many people as we could. Electabuzz kept one hand on that circuit all the way back. Command grounded me before the engines had cooled. I never flew for them again." },
    { id: 'new-station', title: 'A New Post', description: 'Surge returns to an unreliable power station and an empty Vermilion Gym.', message: 'Vermilion had an empty Gym and an old power station that failed every other week. I knew a little about unreliable wiring by then. I took both jobs, added backup circuits, and made sure the building could double as a shelter.' },
  ],
  erika: [
    { id: 'glasshouse', title: 'The Old Glasshouse', description: 'Erika remembers the community glasshouse she helped tend in Celadon.', message: 'I spent most mornings at an old glasshouse on the edge of Celadon. Families kept small beds there, and I knew nearly everyone by what they grew. A development company bought the empty dye warehouse next door, along with the land under our glasshouse. Our lease gave us one month to leave. That same week, the Oddish stopped going near the east beds.' },
    { id: 'sick-soil', title: 'Sick Soil', description: 'The plants and Pokémon nearest the old warehouse begin to fall ill.', message: 'We checked the east beds first. The roots had turned yellow, and foul water was running through an old drain beneath the floorboards. We also found a Muk down there. It was sick, frightened, and trying to keep everyone away.' },
    { id: 'whispers', title: 'Following the Drain', description: 'Erika traces the contaminated water into the neighbouring warehouse.', message: "Tangela followed the drain to a cracked storage tank beneath the warehouse. The leak was much older than the company's purchase, but the site report filed with its planning application said the ground was clean. We copied the report and sent one of the gardeners to fetch the city inspector. Before she returned, the site manager arrived with a pump. He told his workers to empty the remaining waste into the drain so they could remove the tank before the inspection. That would have sent all of it through the glasshouse. I stood in front of the pump. He reached for his Poké Balls." },
    { id: 'public-bloom', title: 'The Inspection', description: 'The gardeners stop more waste entering the drain until the city inspector arrives.', message: 'We stopped the pump and kept the tank where it was until the city inspector arrived. She took her own samples from the tank and followed the drain back to the damaged beds in the glasshouse. At the planning hearing, we showed her the drain maps, the false site report, and the pump the manager had brought. The city rejected the application and ordered the company to pay for a proper cleanup.' },
    { id: 'living-gym', title: 'The Glasshouse Stays', description: 'The gardeners restore the glasshouse before Erika is asked to lead Celadon Gym.', message: 'The cleanup settlement transferred the glasshouse land to the city, and the gardeners were allowed to stay. It took months to replace the soil and clean the drain, but Muk recovered and returned to the warehouse yard. When Celadon later needed a Gym Leader, the gardeners put my name forward. I still keep a copy of that contract in the potting shed.' },
  ],
  koga: [
    { id: 'lesson', title: "Janine's Training", description: 'Koga puts Janine through another lesson in poisons and antidotes.', message: 'When Janine was young, I taught her to move quietly, mix antidotes, and follow an order the first time. She learned quickly. She also asked questions I did not always have the patience to answer.' },
    { id: 'stolen-venom', title: 'Missing Samples', description: 'Six venom samples disappear from a locked Safari Zone storehouse.', message: "Six sealed venom samples disappeared from a locked storehouse near the Safari Zone. I found the thief's trail and left without telling anyone. Janine noticed and followed me." },
    { id: 'janine-follows', title: 'The Second Thief', description: 'Janine spots the danger that Koga misses.', message: 'There were two thieves, not one. Janine saw the second before I did and took the dart aimed at my back. I gave her the standard antidote, but her hands kept shaking. The thief still had every sample, so I could not identify what was on the dart without recovering the case.' },
    { id: 'antidote', title: 'Mixing the Antidote', description: 'Koga uses the recovered samples to prepare the correct treatment.', message: "The samples showed that the thieves had mixed several venoms. At the apothecary, I identified each ingredient and prepared a new dose while Janine's breathing grew weaker. She woke before sunrise and immediately asked whether I had caught the thieves." },
    { id: 'new-teaching', title: 'One Mark on the Case', description: 'The recovered case leaves Koga with one unanswered question.', message: "We recovered the case. It carried a small black Rhyhorn seal, the only mark that did not belong to the Safari Zone. After that, I stopped treating questions as disobedience. Janine had seen the danger I missed." },
  ],
  sabrina: [
    { id: 'noise', title: 'Too Much Noise', description: 'Sabrina remembers learning how to keep other thoughts at a distance.', message: 'When I was younger, crowded streets were difficult. I heard what people meant before they spoke, and sometimes what they were trying not to say. Keeping everyone out was the only way I knew to get a quiet moment. Silph thought that made me a good choice to test a teleport chamber.' },
    { id: 'silph-invitation', title: 'Routine Calibration', description: 'Silph asks Sabrina to check the signal from a new teleport chamber.', message: 'The chamber used my psychic signal to select one of two receiving pads. Haunter followed me into the lab, although nobody had invited it. The equipment ledger had a small black Rhyhorn seal beside several new parts. The first tests were ordinary. Then both receiving pads lit up at once.' },
    { id: 'ignored-warning', title: 'Two Signals', description: 'The faulty amplifier catches Porygon between two destinations.', message: 'Porygon was receiving commands from both pads. At the same time, the amplifier was throwing every nearby thought back at me, with the Fighting Dojo next door coming through loudest. I told the director to shut everything down. He said the readings were still within tolerance.' },
    { id: 'younger-echo', title: 'Finding Porygon', description: 'Sabrina separates Porygon from the amplified thoughts around it.', message: "When I tried to isolate Porygon, the feedback pulled all the signals together again. Haunter started pulling faces at its reflection in the glass. It was ridiculous, but I laughed and lost my concentration for a moment. That was enough to pick out Porygon's signal and send it to the original receiving pad." },
    { id: 'open-door', title: 'The Dojo Next Door', description: 'Sabrina visits the Fighting Dojo before taking over Saffron Gym.', message: 'Silph closed the project after the investigation, and the League asked me to take over Saffron Gym. Before I opened it, I went next door to speak with Koichi. We still disagreed about almost everything, but it was easier when we spoke face to face.' },
  ],
  blaine: [
    { id: 'honest-question', title: 'The Recovery Study', description: 'Blaine and Fuji begin testing a new way to help injured Pokémon recover.', message: 'Fuji and I started with a simple question: could Pokémon recover more quickly after a serious injury? We studied energy, psychic response, and how the body reacted inside a containment field. The early results were promising enough that we wanted a larger laboratory. We practised the alarm sequence before every test.' },
    { id: 'patron', title: 'New Funding', description: 'Giovanni funds a larger laboratory with Ariana overseeing the agreement.', message: 'Giovanni paid for it. Ariana brought the contracts, the new equipment, and a schedule that got shorter every time she visited. A small black Rhyhorn appeared on all the funding papers.' },
    { id: 'fuji-warning', title: 'One More Trial', description: 'Blaine and Fuji disagree over whether the testing should continue.', message: 'One subject stopped recovering properly between tests. Fuji wanted the project suspended. I wanted one more run at a lower setting because I thought I could prove the process was still safe. We argued, and I authorised it.' },
    { id: 'evacuation', title: 'The Alarm', description: 'The final trial overheats and the laboratory begins to fill with smoke.', message: 'The chamber overheated almost at once. I opened the containment locks and sent Growlithe through the smoke to find the technicians. While we were forcing the last security door open, Ariana took a copy of the research and left.' },
    { id: 'aftermath', title: 'Closing the Lab', description: 'Blaine stays on Cinnabar to answer for the failed project.', message: 'The subject died. Fuji left Cinnabar, and I stayed to close the lab and answer the investigation. Years later, when I started writing Gym quizzes, I put the safety questions first. Trainers complain about them. I do not mind.' },
  ],
  giovanni: [
    { id: 'empty-road', title: 'The Western Road', description: 'Giovanni moves supplies after a flood cuts Viridian off from relief.', message: "A flood took out Viridian's western road. Food and medicine were sitting in warehouses while the city argued over permits, so I hired trucks and a work crew. We moved the supplies as far as the blockage, then started reopening the road. Nobody had given us permission, but nobody tried to stop us." },
    { id: 'terms', title: 'New Contracts', description: 'Emergency deliveries become a permanent regional supply network.', message: 'Those emergency calls kept coming. I secured storage, guards, and supply routes for several cities, but I did not offer them for free. Every agreement gave my organisation exclusive access, and every page carried our black Rhyhorn seal.' },
    { id: 'league-notice', title: 'Viridian Gym', description: 'The League asks Giovanni to reopen the abandoned Gym.', message: "The League objected to how much of the region's transport I controlled. A week later, they asked me to reopen Viridian's abandoned Gym because it needed repairs, staff, and money. I had all three, so I accepted." },
    { id: 'waiting-son', title: 'A Late Dinner', description: 'Giovanni finishes the Gym agreement while his son waits at home.', message: 'My son was waiting for dinner while I finished the Gym agreement. I told him I would only be a few minutes. When I finally left the office, his plate was still on the table and he had gone to bed.' },
    { id: 'two-charters', title: 'Two Signatures', description: 'Giovanni signs the Gym charter and the final transport contracts.', message: 'The Gym charter and the final transport contracts were signed on the same day. To the League, I was responsible for Viridian. To my organisation, Viridian was the centre of a network we now controlled. I saw no conflict between the two.' },
  ],
}

const memoryMarkerTasks: Task[] = KANTO_GYM_CHRONICLES.map((chronicle) => ({
  id: chronicle.markerId,
  name: `${chronicle.leaderName}'s Badge Memory`,
  description: `The ${chronicle.badgeName} has opened a memory from ${chronicle.leaderName}'s past.`,
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
