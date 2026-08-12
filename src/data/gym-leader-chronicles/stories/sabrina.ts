import type { KantoGymChronicleStory } from '../types'
import { battle, character, game, narration, scene, speech, trainer } from '../helpers'

const room = '/backgrounds/chronicle-sabrina-childhood-room.avif'
const mind = '/backgrounds/chronicle-sabrina-quiet-mindscape.avif'
const lab = '/backgrounds/chronicle-sabrina-teleport-lab.avif'
const dojo = '/backgrounds/gym-fighting.avif'
const sabrina = character('Sabrina', trainer('gym-kanto-sabrina'))
const young = character('Younger Sabrina', trainer('chronicle-young-sabrina'))
const mother = character('Mother', trainer('chronicle-sabrina-mother'))
const father = character('Father', trainer('chronicle-sabrina-father'))
const orla = character('Dr Orla', trainer('chronicle-orla'))
const venn = character('Director Venn', trainer('chronicle-venn'))
const koichi = character('Koichi', trainer('chronicle-koichi'))

export const sabrinaChronicleStory: KantoGymChronicleStory = { sequence: [
  scene('backstory','the-spoon-before-it-falls','Before the Sound','Sabrina’s parents learn that she hears intentions before words.',room,[
    narration('The first spoon bent before it reached the floor. Sabrina had heard her mother think careful, heard her father think not again, and moved before either adult spoke.'),
    speech(young,'You do not have to whisper. Whispering in your head is louder.'), speech(mother,'We are not angry.'),
    speech(young,'Father is afraid of the glass breaking. You are afraid I know he is afraid.'), speech(father,'You should rest.'),
    narration('Rest became the family word for every room they did not know how to enter with her.'),
  ]),
  scene('backstory','the-quiet-room','A Room Made Empty','Her parents protect Sabrina by removing everything that responds to her power.',mind,[
    narration('They emptied a room of mirrors, clocks and metal toys. Thick curtains softened the neighbours’ thoughts. Sabrina could breathe there, but she could not mistake breathing for living.'),
    speech(mother,'Tell us when it becomes too much and we will close the door.'), speech(young,'Closing the door does not stop you thinking outside it.'),
    speech(father,'We are trying to make somewhere safe.'), speech(young,'Safe for whom?'),
  ]),
  game('backstory','hold-the-focus-pattern'),
  scene('backstory','orlas-visit','The Researcher Who Asks','Orla is the first adult to request permission before testing Sabrina.',room,[
    speech(orla,'I study psychic perception. I have three exercises, and you may refuse any or all of them.'),
    speech(young,'If I say no, will you think I am wasting your journey?'), speech(orla,'Probably. You are allowed to disappoint me.'),
    speech(young,'Nobody says that.'), speech(orla,'Then nobody has made refusal easy enough to be real.'),
  ]),
  scene('backstory','the-silph-offer','A Useful Gift','Silph offers control, legitimacy and an audience that wants results.',lab,[
    speech(venn,'Our teleport division can teach you to narrow the signal. In return, your perception can solve instabilities instruments miss.'),
    speech(father,'Would the work be safe?'), speech(venn,'Safer than an untrained child moving furniture in her sleep.'),
    speech(young,'You thought that before he said it.'), speech(father,'I want you to have help.'),
    speech(orla,'Help is not the same as access. Put her right to stop in the contract.'),
  ]),

  scene('development','signals-and-shapes','Learning to Choose One Voice','Sabrina builds focus by identifying what is present rather than fighting everything else.',lab,[
    speech(orla,'Do not empty your mind. Minds are not rooms with brooms. Choose one shape and let the others remain without answering them.'),
    speech(sabrina,'Director Venn is counting how long I take.'), speech(orla,'He may count. You do not owe his impatience a faster result.'),
    speech(venn,'The company does have a schedule.'), speech(sabrina,'Then schedule the fact that I heard you.'),
  ]),
  game('development','find-the-true-shape'),
  scene('development','porygon-between-terminals','The First Split Signal','Sabrina detects a Porygon caught between two teleport destinations.',lab,[
    narration('The receiver displayed a successful transfer. Sabrina heard a thought repeat from both terminals: a simple request to finish becoming somewhere.'),
    speech(sabrina,'Porygon is still in the signal.'), speech(venn,'Both terminals report empty.'),
    speech(orla,'Instruments measure what they were designed to expect. Sabrina, can you locate the strongest echo?'),
    speech(sabrina,'It is not an echo. It is the same frightened thought arriving twice.'),
  ]),
  game('development','enter-the-quiet-room'),
  scene('development','the-extraction-plan','A Door Held Open','Sabrina proposes entering the signal while Orla protects her right to return.',mind,[
    speech(sabrina,'I can hold one destination stable if somebody closes the other at the exact moment Porygon chooses.'),
    speech(venn,'Excellent. Begin.'), speech(orla,'No. First she names the stop condition and the person authorised to end the test.'),
    speech(sabrina,'If I stop speaking, disconnect both receivers. Do not wait for Venn.'), speech(orla,'I accept responsibility.'),
  ]),
  battle('development','unstable-porygon'),

  scene('conflict','the-successful-demonstration','A Result Silph Can Sell','Porygon is rescued, and Venn immediately repackages Sabrina’s risk as company success.',lab,[
    narration('Porygon emerged intact and exhausted. Before Sabrina had recovered, Venn invited executives into the lab and described a proprietary psychic stabilisation method.'),
    speech(venn,'With Sabrina integrated into the receiver team, failed transfers become recoverable.'),
    speech(sabrina,'I am not integrated into anything.'), speech(venn,'Naturally, the language can be adjusted.'),
    speech(orla,'The language is the agreement.'),
  ]),
  scene('conflict','the-locked-session','No Refusal on the Schedule','Venn schedules another live test and uses Sabrina’s family’s fear to secure it.',room,[
    speech(mother,'Director Venn says withdrawing now could cause your powers to become uncontrolled again.'),
    speech(sabrina,'Director Venn thinks uncertainty sounds scientific if he puts it in a letter.'),
    speech(father,'We remember what happened before the quiet room.'), speech(sabrina,'So do I. I also remember that none of you asked what the room cost me.'),
    speech(mother,'We were afraid.'), speech(sabrina,'You made your fear into my instructions.'),
  ]),
  scene('conflict','orla-removed','The Researcher Outside the Door','Venn excludes Orla from the next session because she can stop it.',lab,[
    speech(venn,'Dr Orla’s consent protocol is incompatible with emergency commercial testing.'), speech(orla,'Consent that disappears during urgency is theatre.'),
    speech(sabrina,'I will not enter without her.'), speech(venn,'Your parents authorised continuation.'),
    speech(sabrina,'They can authorise treatment. They cannot volunteer my mind as equipment.'),
  ]),
  scene('conflict','every-thought-at-once','The Room Breaks Open','Pressure overwhelms Sabrina’s focus and fills the lab with everyone’s hidden intentions.',mind,[
    narration('The receivers activated before Sabrina gave permission. Every thought in the lab arrived at once: Venn’s fear of losing the contract, her father’s shame, her mother’s desperate wish for an ordinary daughter, Orla’s plan to cut power.'),
    speech(sabrina,'Stop thinking at me.'), speech(father,'Sabrina, we are here.'),
    speech(sabrina,'You are always here. That is the problem.'), narration('Glass rose from the consoles and hung in the air. Porygon cried from the inactive terminal.'),
  ]),
  scene('conflict','the-stop-word','Ask Before Touching','Koichi reaches Sabrina by obeying a boundary others treat as delay.',lab,[
    speech(koichi,'Sabrina, I can break the receiver housing. Do you want me to?'), speech(venn,'Do it now!'),
    speech(koichi,'I did not ask you.'), speech(sabrina,'Wait. Porygon is using the field. On my count, strike the left housing only.'),
    speech(koichi,'Understood. I will wait.'), narration('Waiting gave Sabrina one quiet thought to hold.'),
  ]),
  scene('conflict','silph-door-closes','A Contract Refused','Sabrina ends the research relationship and loses the promised path to control.',lab,[
    speech(venn,'Without Silph equipment, episodes like this will recur.'), speech(sabrina,'This episode occurred because you turned it on.'),
    speech(father,'We are leaving.'), speech(sabrina,'Do not say we. I am leaving. You may come if you can do that without deciding for me.'),
    speech(orla,'I have copied the consent records. Silph will answer for the breach.'),
  ]),

  scene('contemplation','family-in-the-dojo','What Fear Did','Sabrina’s parents admit that protection became control.',dojo,[
    speech(mother,'I wished you were ordinary. Not because ordinary was better, but because I understood how to mother it.'),
    speech(father,'Every expert who sounded certain became someone I wanted to obey.'), speech(sabrina,'Even when the expert wanted access to me.'),
    speech(father,'Yes. I am sorry.'), speech(sabrina,'I hear that you mean it. That does not make trust return at the same speed.'),
  ]),
  scene('contemplation','koichis-offer','Rules for a Focus Battle','Koichi offers discipline without promising to cure Sabrina.',dojo,[
    speech(koichi,'The Fighting Dojo cannot quiet other minds. We can give you one opponent who states his intention before acting.'),
    speech(sabrina,'You announce attacks?'), speech(koichi,'Until you ask me not to. You control distance, duration and the stop word.'),
    speech(sabrina,'And if I hear you worry that I am dangerous?'), speech(koichi,'Then you will hear a thought I am responsible for examining, not a verdict you must obey.'),
  ]),
  battle('contemplation','koichis-focus-test'),
  scene('contemplation','not-cured','A Mind Still Crowded','The battle helps without transforming Sabrina into someone untouched by her power.',dojo,[
    speech(koichi,'You held focus longer today.'), speech(sabrina,'I also heard every spectator wonder whether I would lose control.'),
    speech(koichi,'Progress and pain are permitted to occupy the same hour.'), speech(sabrina,'People prefer a cure. It gives a story a clean ending.'),
    speech(orla,'Then we should build something designed for a life, not an ending.'),
  ]),

  scene('resolution','saffron-proposal','The Quiet Room Rewritten','Sabrina proposes a Gym where boundaries are a practised skill.',mind,[
    speech(orla,'The League needs a Psychic Gym and Silph’s conduct has made independent oversight urgent.'), speech(sabrina,'They will call appointing me rehabilitation.'),
    speech(koichi,'Then write the programme so the lie is obvious.'), speech(sabrina,'No unsolicited readings. Every exercise has a stop word. Challengers may refuse explanation.'),
    speech(orla,'And the Leader?'), speech(sabrina,'The Leader follows the same rules.'),
  ]),
  scene('resolution','league-hearing','A Candidate Who Hears the Panel','The League must assess Sabrina while knowing she can hear what its members withhold.',lab,[
    speech(sabrina,'One of you thinks I am too unstable. One thinks appointing me will repair Silph’s reputation. Neither thought disqualifies you from speaking honestly.'),
    speech(orla,'Sabrina, consent applies to the panel too.'), speech(sabrina,'You are right. I should not have named what they did not offer.'),
    speech(sabrina,'I apologise. That mistake is precisely why the Gym needs rules stronger than confidence.'),
  ]),
  scene('resolution','the-marsh-licence','Leader of Saffron Gym','Sabrina earns the licence by demonstrating accountability, not perfect control.',mind,[
    narration('The licence required independent review, documented consent and a permanent right for challengers to end psychic exercises. Sabrina added a fourth clause in her own hand: the Leader may be corrected.'),
    speech(mother,'Are you happy?'), speech(sabrina,'I am relieved, tired and still angry. Happiness is somewhere in the room.'),
    speech(father,'May we visit tomorrow?'), speech(sabrina,'Ask me tomorrow.'),
  ]),
  scene('resolution','first-session','The Door Stays Open','Sabrina begins with a challenger who chooses how much silence is enough.',mind,[
    speech(sabrina,'I can sense the shape of your intended move. Do you consent to that being part of the battle?'),
    speech(koichi,'The challenger may say no.'), speech(sabrina,'Koichi, they know. Give them time.'),
    narration('The challenger considered the open door, then set a limit. Sabrina repeated it back before the first command.'),
  ]),

  scene('reflection','orlas-charter','The Rules Remain After the People','Consent becomes part of Saffron’s institution rather than a favour from kind individuals.',lab,[
    speech(orla,'Silph adopted the charter after the inquiry. Venn calls it administratively burdensome.'), speech(sabrina,'Then it is probably doing work.'),
    speech(orla,'Your name is not on it, as requested.'), speech(sabrina,'Good. A rule should survive without borrowing my injury as decoration.'),
  ]),
  scene('reflection','a-quieter-room','Not Empty','Sabrina’s quiet room becomes a place chosen, not imposed.',mind,[
    narration('Saffron Gym kept one room without clocks or mirrors. Its door had no lock. Sabrina entered when the city became too loud and left when she chose.'),
    speech(koichi,'Do you want company?'), speech(sabrina,'Sit outside for ten minutes. Do not try to make your thoughts quiet.'),
    speech(koichi,'I would not know how.'), narration('The room was never empty. It was quiet enough for Sabrina to decide which voice to answer.'),
  ]),
] }
