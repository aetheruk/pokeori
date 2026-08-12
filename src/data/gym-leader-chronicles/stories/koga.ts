import type { KantoGymChronicleStory } from '../types'
import { battle, character, game, narration, scene, speech, trainer } from '../helpers'

const court = '/backgrounds/chronicle-koga-training-courtyard.avif'
const roofs = '/backgrounds/chronicle-koga-fuchsia-rooftops.avif'
const shop = '/backgrounds/chronicle-koga-apothecary.avif'
const koga = character('Koga', trainer('gym-kanto-koga'))
const janine = character('Janine', trainer('chronicle-janine'))
const ren = character('Master Ren', trainer('chronicle-ren'))
const jiro = character('Jiro', trainer('super-nerd'))
const student = character('Student', trainer('ninja-boy'))

export const kogaChronicleStory: KantoGymChronicleStory = { sequence: [
  scene('backstory','the-copied-step','The Inherited Course','Koga teaches the route exactly as Ren taught him.',court,[
    narration('Every flagstone in the Fuchsia courtyard carried a lesson older than its current students. Koga could cross them blindfolded because Master Ren had corrected the same seven steps until correction became instinct.'),
    speech(ren,'A successor preserves the path. Novelty is what undisciplined people call a mistake before it harms them.'),
    speech(koga,'First shadow, low wall, false opening, retreat. Again.'),
    speech(janine,'Why is the third opening false?'), speech(koga,'Because the course says it is.'),
  ]),
  game('backstory','read-the-shadow-marks'),
  scene('backstory','janines-mark','A Question in Chalk','Janine marks a safer route that the lesson forbids.',court,[
    speech(janine,'If the wind comes from the west, the powder crosses the retreat line. This stone is safer.'),
    speech(koga,'During the exercise, you follow the authored route.'),
    speech(janine,'Even when the authored route is wrong?'), speech(ren,'Especially then. First you prove obedience; judgment is granted later.'),
    narration('Koga wiped away Janine’s chalk mark. Its outline remained in the stone dust.'),
  ]),
  scene('backstory','the-succession-scroll','A Name Already Written','Ren shows Koga a succession document prepared without Janine.',shop,[
    speech(ren,'The League will soon license Fuchsia Gym. Your name carries our method without dilution.'),
    speech(koga,'Janine has the sharper field sense.'), speech(ren,'She treats inheritance as a conversation. A Leader cannot reopen every settled question.'),
    speech(koga,'And if a settled answer fails?'), speech(ren,'Then the student failed to execute it.'),
  ]),

  scene('development','missing-case','The Empty Cabinet','A case of restricted toxins disappears from the apothecary.',shop,[
    narration('The missing case contained no dramatic poison, only concentrated antidote precursors dangerous in the wrong proportions. Its inventory seal had been cut and replaced with a copy precise enough to reward hurried eyes.'),
    speech(ren,'Follow the marked route. Whoever stole it expects confusion; discipline denies them that advantage.'),
    speech(janine,'The obvious footprints begin after the lock was opened. Someone planted a trail for us.'),
    speech(koga,'We follow it until we understand why it was planted.'), speech(janine,'That is not the same as trusting it. Good.'),
  ]),
  scene('development','rooftop-signs','The Trail Designed to Be Seen','Koga and Janine read what the thief wants pursuers to notice.',roofs,[
    speech(koga,'Broken tile, purple thread, heel mark. Too regular.'), speech(janine,'And all on the bright side of the roof. A real escape uses the shaded gutter.'),
    speech(koga,'Ren’s course uses the marked bridge.'), speech(janine,'The marked bridge is where the footprints go.'),
    speech(koga,'Then we cross far enough to learn who is waiting, not far enough to become expected.'),
  ]),
  game('development','cross-the-unmarked-roofs'),
  scene('development','jiro-in-the-bell-tower','The Perfect Decoy','Jiro waits with an empty case and a rehearsed confession.',roofs,[
    speech(jiro,'You caught me. I wanted to sell the formula. The case is there.'),
    speech(janine,'It is clean inside. You carried this after someone removed the bottles.'),
    speech(koga,'Your confession names no buyer, route or price.'), speech(jiro,'I am confessing. Is that not what you came for?'),
    speech(koga,'No. We came for the truth. They are often found in different rooms.'),
  ]),
  battle('development','decoy-thief'),
  scene('development','the-paid-decoy','A Debt Forgiven','Jiro admits Ren arranged the theft to test Koga’s loyalty.',shop,[
    speech(jiro,'Master Ren cleared my family’s medicine debt. I carried the empty case and waited where his route ends.'),
    speech(janine,'The real bottles never left the estate.'), speech(koga,'This was a succession examination.'),
    speech(jiro,'He said a worthy heir would follow the method, catch me and stop asking.'),
    speech(janine,'Then the last part is the only part you failed.'),
  ]),

  scene('conflict','rens-explanation','The Planted Mistake','Ren calls deception a necessary tradition.',court,[
    speech(ren,'Every heir faces a false theft. The decoy tests precision; the hidden case tests discretion. You were meant to return it quietly.'),
    speech(koga,'You made a desperate man confess to a crime he did not commit.'), speech(ren,'I removed his debt. He consented.'),
    speech(janine,'Consent purchased with medicine is another kind of trap.'), speech(ren,'This is why children do not inherit institutions.'),
  ]),
  scene('conflict','the-sealed-bottles','The Wrong Mixture','One hidden bottle has genuinely been damaged during Ren’s test.',shop,[
    narration('Behind the false wall, one bottle had cracked against its brace. Two clear precursors ran together across the tray, releasing a sweet vapour that numbed Koga’s tongue.'),
    speech(koga,'Masks on. Do not use the standard neutraliser until we identify both components.'),
    speech(ren,'The labels are coded. I know the sequence.'), speech(janine,'The lower label is dissolved. Your sequence is missing a step now.'),
    speech(koga,'Then inherited memory is no longer enough.'),
  ]),
  game('conflict','separate-the-toxins'),
  scene('conflict','courtyard-exposure','The Course Fails','Vapour reaches the exact retreat line Janine questioned.',court,[
    narration('The ventilation shutters carried the vapour into the courtyard. It settled along the western retreat line. Students following the old course moved directly toward it.'),
    speech(janine,'Use my chalk route! Low wall, then the shaded gutter!'), speech(ren,'Hold formation. An unauthorised path creates panic.'),
    speech(koga,'Students, follow Janine. Her route is clear.'), speech(ren,'If you countermand me now, you end your succession.'),
    speech(koga,'Then it ends with everyone breathing.'),
  ]),
  battle('conflict','tunnel-culprit'),
  scene('conflict','after-the-evacuation','The Price of Being Right','Janine’s route saves the class but does not erase Koga’s earlier dismissal.',court,[
    speech(koga,'Your route held. I should have tested it when you first marked the stone.'),
    speech(janine,'You should have listened when I explained it. Testing me is not the same as believing I can see.'),
    speech(koga,'No. It is not.'), speech(ren,'Do not abase yourself before a student because chance favoured her.'),
    speech(koga,'Chance did not draw the wind. She did.'),
  ]),
  scene('conflict','ren-closes-the-school','The Blank Scroll','Ren revokes Koga’s succession and threatens the school’s future.',shop,[
    speech(ren,'Without our family method, the League will reject this Gym. I withdraw the property, curriculum and name.'),
    speech(koga,'The League invited a public safety programme, not a shrine to your certainty.'),
    speech(ren,'And what will you teach instead? Doubt?'), speech(janine,'Yes. Doubt with good footwork.'),
    narration('Ren tore Koga’s name from the succession scroll. The blank space looked less like exile than an unanswered question.'),
  ]),

  scene('contemplation','unwritten-route','Where the Map Ends','Koga and Janine build a lesson around changing information.',roofs,[
    speech(koga,'My first command erased your chalk because I feared a student changing the course would make me a weak teacher.'),
    speech(janine,'A weak teacher needs the map to stay right. A useful one notices when the roof has changed.'),
    speech(koga,'You will help design the League course.'), speech(janine,'I will challenge it. Designing it together would make me too fond of it.'),
  ]),
  scene('contemplation','jiros-statement','A Witness With a Choice','Koga gives Jiro the option Ren denied him.',shop,[
    speech(koga,'The League needs your account. Refusing will not restore the debt or expose your family.'), speech(jiro,'Why trust a confession after I lied?'),
    speech(koga,'Because I know what shaped the lie. That does not make it truth; it makes it evidence.'),
    speech(jiro,'Then write that I agreed because medicine was withheld. Do not make me brave after the fact.'),
  ]),
  scene('contemplation','koga-before-ren','The Method and the Man','Koga distinguishes what deserves preservation from who claimed ownership.',court,[
    speech(koga,'You taught me patience, observation and restraint. I will keep them.'), speech(ren,'You cannot take pieces of a lineage.'),
    speech(koga,'Every generation already did. They merely called their changes ancient by the time students arrived.'),
    speech(ren,'Then face me without my name and learn what remains.'), speech(koga,'Gladly.'),
  ]),

  scene('resolution','succession-match','The Unwritten Path','The League observes a battle in which Koga must abandon his prepared sequence.',court,[
    narration('Ren changed his opening formation for the first time Koga could remember. The familiar counters became traps. Janine stood outside the ring and offered no rescue.'),
    speech(janine,'You said the new course should teach judgment. Judge.'), speech(koga,'I was hoping for more specific encouragement.'),
    speech(janine,'The wind is west. That is all you get.'), speech(ren,'Candidate, begin.'),
  ]),
  battle('resolution','ren-succession'),
  scene('resolution','soul-licence','Leader of Fuchsia Gym','Koga earns the role without inheriting Ren’s ownership of it.',court,[
    speech(ren,'You used a retreat I never taught you.'), speech(koga,'Janine marked it weeks ago.'),
    speech(janine,'He eventually became teachable.'), narration('The League licence named Koga as Leader and required an independent safety board. Ren signed as witness, not master.'),
    speech(koga,'The first course begins tomorrow. No route will be described as correct without stating the conditions that make it so.'),
  ]),
  scene('resolution','janines-first-class','A Course With Erasers','Janine teaches the opening lesson and leaves the final route unmarked.',court,[
    speech(janine,'Your task is to cross the courtyard. Halfway through, I will change one condition.'), speech(student,'Which condition?'),
    narration('The students stared at the blank final section. Koga set pieces of chalk beside the starting line.'),
    speech(koga,'You may mark a route. You may erase it. You may ask why the person before you chose differently.'),
    speech(janine,'You may not blame the map after ignoring the wind.'),
  ]),

  scene('reflection','rens-last-lesson','What Is Preserved','Koga keeps one of Ren’s lessons by allowing it to change.',shop,[
    speech(ren,'The school is noisier now.'), speech(koga,'Questions make noise.'),
    speech(ren,'And has doubt made them stronger?'), speech(koga,'It has made their confidence more expensive. They must earn it each time.'),
    speech(ren,'That answer sounds almost traditional.'), speech(koga,'Give it fifty years. Someone will pretend it always was.'),
  ]),
  scene('reflection','chalk-in-the-rain','The Daughter’s Method','The memory closes on a route neither father nor daughter owns forever.',court,[
    narration('Rain washed Janine’s latest route from the courtyard. The next morning she drew another, shifted two stones and asked Koga to find the flaw.'),
    speech(koga,'The eastern landing is exposed.'), speech(janine,'Only if the wind changes.'),
    speech(koga,'It always does.'), narration('That became the first principle of Fuchsia Gym, written nowhere permanent and taught every day.'),
  ]),
] }
