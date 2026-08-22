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
  scene('backstory','the-copied-step','The Inherited Course','Ren corrects Koga\'s technique while Janine asks why one step in the route works the way it does.',court,[
    narration('Every flagstone in the Fuchsia courtyard carried a lesson older than its students. Koga could cross them blindfolded because Master Ren had corrected the same seven steps until they felt like instinct.'),
    speech(ren,'We do not change the course during exercise. If you want to argue a step, you do it here, with me, before we start.'),
    speech(koga,'First shadow, low wall, false opening, retreat. Again.'),
    speech(janine,'Why is the third opening false?'),
    speech(koga,'Because the course says it is.'),
  ]),
  game('backstory','read-the-shadow-marks'),
  scene('backstory','janines-mark','A Question in Chalk','Janine draws an alternative route on the flagstones. Koga wipes it off.',court,[
    speech(janine,'If the wind comes from the west, the powder crosses the retreat line. This stone is safer.'),
    speech(koga,'During the exercise, you follow the set route.'),
    speech(janine,'Even when the set route is wrong?'),
    speech(ren,'Especially then. The test needs consistent conditions or it means nothing.'),
    narration('Koga wiped away Janine\'s chalk mark. Its outline stayed in the stone dust.'),
  ]),
  scene('backstory','the-succession-scroll','A Name Already Written','Ren shows Koga a succession document that was prepared without consulting Janine.',shop,[
    speech(ren,'The League will license Fuchsia Gym soon. Your name keeps the method intact.'),
    speech(koga,'Janine has the sharper field sense.'),
    speech(ren,'She would want to change too much. A Leader has to keep things stable.'),
    speech(koga,'And if a stable answer is wrong?'),
    speech(ren,'Then the student failed to carry it out correctly.'),
  ]),

  scene('development','missing-case','The Empty Cabinet','A case of restricted antidote precursors disappears from the apothecary.',shop,[
    narration('The missing case held no dramatic poison, only concentrated antidote precursors that were dangerous in the wrong proportions. The inventory seal had been cut and replaced with a copy good enough to fool a hurried glance.'),
    speech(ren,'Follow the marked route. I don\'t want anyone going off on their own.'),
    speech(janine,'The footprints start after the lock was opened. Someone laid a trail for us.'),
    speech(koga,'We follow it until we know why it was laid.'),
    speech(janine,'Good. At least you are not trusting it yet.'),
  ]),
  scene('development','rooftop-signs','The Trail Designed to Be Seen','Koga and Janine work out that the rooftop signs were placed there to be followed.',roofs,[
    speech(koga,'Broken tile, purple thread, heel mark. Too regular.'),
    speech(janine,'And all on the bright side of the roof. A real escape uses the shaded gutter.'),
    speech(koga,'Ren\'s course uses the marked bridge.'),
    speech(janine,'The marked bridge is where the footprints go.'),
    speech(koga,'Then we cross far enough to see who is waiting, not far enough to walk into them.'),
  ]),
  game('development','cross-the-unmarked-roofs'),
  scene('development','jiro-in-the-bell-tower','The Perfect Decoy','Jiro is waiting at the bell tower with an empty case and a confession that does not hold up.',roofs,[
    speech(jiro,'You caught me. I wanted to sell the formula. The case is there.'),
    speech(janine,'It is clean inside. You carried this after someone took the bottles out.'),
    speech(koga,'Your confession does not name a buyer, a route, or a price.'),
    speech(jiro,'I am confessing. Is that not what you came for?'),
    speech(koga,'No. A confession needs to say something true.'),
  ]),
  battle('development','decoy-thief'),
  scene('development','the-paid-decoy','A Debt Forgiven','Jiro admits that Master Ren arranged the whole theft to test Koga\'s loyalty.',shop,[
    speech(jiro,'Master Ren cleared my family\'s medicine debt. I carried the empty case and waited where his route ends.'),
    speech(janine,'The real bottles never left the estate.'),
    speech(koga,'This was a succession examination.'),
    speech(jiro,'He said a worthy heir would follow the method, catch me, and stop asking questions.'),
    speech(janine,'So the part where you kept asking is the only part he did not want.'),
  ]),

  scene('conflict','rens-explanation','The Planted Mistake','Ren tells Koga the fake theft is a tradition and that Koga was supposed to return the case quietly.',court,[
    speech(ren,'Every heir faces a false theft. The decoy tests precision. The hidden case tests discretion. You were meant to return it quietly.'),
    speech(koga,'You made a desperate man confess to a crime he did not commit.'),
    speech(ren,'I cleared his debt. He agreed.'),
    speech(janine,'You took advantage of a sick family, Ren. That is not an agreement.'),
    speech(ren,'I did not ask for a lecture from a student.'),
  ]),
  scene('conflict','the-sealed-bottles','The Wrong Mixture','One of the hidden bottles has cracked and the contents are mixing.',shop,[
    narration('Behind the false wall, one bottle had cracked against its brace. Two clear precursors ran together across the tray, releasing a sweet vapour that numbed Koga\'s tongue.'),
    speech(koga,'Masks on. Do not use the standard neutraliser until we identify both components.'),
    speech(ren,'The labels are coded. I know the sequence.'),
    speech(janine,'The lower label is gone. Your sequence is missing a step.'),
    speech(koga,'Tell me the components from the top. I will work backwards from the reaction.'),
  ]),
  game('conflict','separate-the-toxins'),
  scene('conflict','courtyard-exposure','The Course Fails','Vapour from the cracked bottle reaches the western retreat line that Janine flagged as unsafe.',court,[
    narration('The ventilation shutters carried the vapour into the courtyard. It settled along the western retreat line. Students on the old course moved straight toward it.'),
    speech(janine,'Use my route! Low wall, then the shaded gutter!'),
    speech(ren,'Hold the line. Do not break formation.'),
    speech(koga,'Students, follow Janine. Her route is clear.'),
    speech(ren,'Countermand me now and your succession is over.'),
    speech(koga,'Then it ends with everyone breathing.'),
  ]),
  battle('conflict','tunnel-culprit'),
  scene('conflict','after-the-evacuation','The Price of Being Right','Janine\'s route kept everyone safe. Koga tells her he should have listened sooner.',court,[
    speech(koga,'Your route held. I should have listened when you explained it, not just let you mark the stone and wiped it off.'),
    speech(janine,'Testing something is not the same as trusting the person who said it.'),
    speech(koga,'No. It is not.'),
    speech(ren,'Don\'t apologise to a student because the wind happened to favour her.'),
    speech(koga,'The wind was coming from the west. She knew that two weeks ago.'),
  ]),
  scene('conflict','ren-closes-the-school','The Blank Scroll','Ren revokes Koga\'s succession and says the school has no future without his name behind it.',shop,[
    speech(ren,'Without our family method, the League will reject this Gym. I am withdrawing the property, the curriculum, and the name.'),
    speech(koga,'The League doesn\'t care about the family name. They care about the safety record.'),
    speech(ren,'And what will you teach instead?'),
    speech(janine,'How to check conditions before committing to a route.'),
    narration('Ren tore Koga\'s name from the succession scroll and set it back on the table.'),
  ]),

  scene('contemplation','unwritten-route','Where the Map Ends','Koga and Janine build a lesson that changes based on conditions rather than a fixed route.',roofs,[
    speech(koga,'I erased your chalk because I did not want to explain to Ren why I let a student change the route.'),
    speech(janine,'If the conditions change and you freeze up waiting for the fixed answer, the students are stuck.'),
    speech(koga,'You will help design the League course.'),
    speech(janine,'Put me on review, not design. If I help build it I will not spot what is wrong with it.'),
  ]),
  scene('contemplation','jiros-statement','A Witness With a Choice','Koga asks Jiro to give an account to the League and tells him he does not have to make it sound better than it was.',shop,[
    speech(koga,'The League needs to hear what happened. You do not have to say anything more than that.'),
    speech(jiro,'Why trust a confession from someone who lied?'),
    speech(koga,'Because understanding why you lied helps us show what Ren did.'),
    speech(jiro,'Write that I did it because my family owed him. Don\'t put anything in there about courage.'),
  ]),
  scene('contemplation','koga-before-ren','The Method and the Man','Koga tells Ren what he is keeping from his training and what he is not.',court,[
    speech(koga,'The method is good. I am keeping it.'),
    speech(ren,'The League will not recognise a school without my endorsement.'),
    speech(koga,'I spoke to them last week. They have questions about the succession test and Jiro\'s family.'),
    speech(ren,'Then we have nothing more to discuss.'),
    speech(koga,'No. We never really did.'),
  ]),

  scene('resolution','succession-match','The Unwritten Path','Ren changes his opening formation and the League watches as Koga has to abandon his prepared sequence.',court,[
    narration('Ren changed his opening formation for the first time Koga could remember. The familiar counters became traps. Janine stood outside the ring and offered no rescue.'),
    speech(janine,'Stop standing there. Decide.'),
    speech(koga,'I was hoping for something more specific.'),
    speech(janine,'The wind is west. That is all you get.'),
    speech(ren,'Candidate, begin.'),
  ]),
  battle('resolution','ren-succession'),
  scene('resolution','soul-licence','Leader of Fuchsia Gym','Koga wins and earns the Gym licence without inheriting Ren\'s ownership of it.',court,[
    speech(ren,'You used a retreat I never taught you.'),
    speech(koga,'Janine marked it weeks ago.'),
    speech(janine,'Took him a while.'),
    narration('The League licence named Koga as Leader and required an independent safety board. Ren signed as witness, not master.'),
    speech(koga,'The first course starts tomorrow. Every route gets reviewed against the actual conditions before anyone calls it correct.'),
  ]),
  scene('resolution','janines-first-class','A Course With Erasers','Janine teaches the opening lesson and leaves the last section of the route unmarked.',court,[
    speech(janine,'Your task is to cross the courtyard. Halfway through, I will change one condition.'),
    speech(student,'Which condition?'),
    narration('The students stared at the blank final section. Koga set pieces of chalk beside the starting line.'),
    speech(koga,'You may mark a route. You may erase it. You may ask why the person before you chose differently.'),
    speech(janine,'Check the conditions before you commit to a route. That is all.'),
  ]),

  scene('reflection','rens-last-lesson','What Is Preserved','Ren visits the school a year later and asks whether the new approach made the students stronger.',shop,[
    speech(ren,'The school is noisier now.'),
    speech(koga,'Yes. They ask a lot of questions.'),
    speech(ren,'And has it made them stronger?'),
    speech(koga,'They argue more. But when they commit to a route they can explain why.'),
    speech(ren,'That sounds like what I used to say.'),
    speech(koga,'Probably. Ask me in ten years.'),
  ]),
  scene('reflection','chalk-in-the-rain','The Daughter\'s Method','Janine draws a new route in the courtyard and asks Koga to find the flaw.',court,[
    narration('Rain washed Janine\'s latest route off the courtyard. The next morning she drew another, shifted two stones, and asked Koga to find the flaw.'),
    speech(koga,'The eastern landing is exposed.'),
    speech(janine,'Only if the wind changes.'),
    speech(koga,'It always does.'),
    narration('Koga wrote it in the training log. Janine updated it again two days later without mentioning it until he asked.'),
  ]),
] }
