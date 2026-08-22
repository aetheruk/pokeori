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
  scene('backstory','the-spoon-before-it-falls','Before the Sound','Sabrina\'s parents discover she can hear what they are thinking before they speak.',room,[
    narration('The first spoon bent before it hit the floor. Sabrina had heard her mother think careful, heard her father think not again, and moved before either of them spoke.'),
    speech(young,'You are still thinking about the glass.'),
    speech(mother,'We are not angry.'),
    speech(young,'Dad is worried it will break. You are worried that I know.'),
    speech(father,'You should rest.'),
    narration('After that, rest was what they suggested whenever they did not know what else to say.'),
  ]),
  scene('backstory','the-quiet-room','A Room Made Empty','Her parents clear a room of anything that responds to her power and tell her it is somewhere safe.',mind,[
    narration('They emptied a room of mirrors, clocks, and metal toys. Thick curtains muffled the neighbours\' thoughts. Sabrina could breathe there, but she could not mistake breathing for living.'),
    speech(mother,'Tell us when it gets to be too much and we will close the door.'),
    speech(young,'Closing the door doesn\'t help. I can still hear you.'),
    speech(father,'We are trying to make somewhere safe.'),
    speech(young,'Safe for who?'),
  ]),
  game('backstory','hold-the-focus-pattern'),
  scene('backstory','orlas-visit','The Researcher Who Asks','Dr Orla is the first adult to ask permission before running any test.',room,[
    speech(orla,'I study psychic perception. I have three exercises, and you can refuse any or all of them.'),
    speech(young,'If I say no, will you think I wasted your trip?'),
    speech(orla,'Probably. You are allowed to disappoint me.'),
    speech(young,'Nobody says that.'),
    speech(orla,'Then that is a problem with adults.'),
  ]),
  scene('backstory','the-silph-offer','A Useful Gift','Silph offers Sabrina access to equipment that could help her control what she hears.',lab,[
    speech(venn,'Our teleport division can teach you to narrow the signal. In return, your perception can catch instabilities our instruments miss.'),
    speech(father,'Would the work be safe?'),
    speech(venn,'Safer than an untrained child moving furniture in her sleep.'),
    speech(young,'You thought that before he said it.'),
    speech(father,'I want you to have help.'),
    speech(orla,'That is different from access. If you want her involved, her right to stop needs to be in the contract.'),
  ]),

  scene('development','signals-and-shapes','Learning to Choose One Voice','Sabrina practises narrowing her focus during lab sessions while Director Venn watches the clock.',lab,[
    speech(orla,'Do not try to force everything quiet. Just focus on one shape and let the background fade.'),
    speech(sabrina,'Director Venn is counting how long I take.'),
    speech(orla,'He can count. You set the pace.'),
    speech(venn,'The company does have a schedule.'),
    speech(sabrina,'I heard that.'),
  ]),
  game('development','find-the-true-shape'),
  scene('development','porygon-between-terminals','The First Split Signal','Sabrina detects a Porygon that has not finished arriving at either terminal.',lab,[
    narration('The receiver showed a successful transfer. Sabrina heard the same thought coming from both terminals: a simple request to finish becoming somewhere.'),
    speech(sabrina,'Porygon is still in the signal.'),
    speech(venn,'Both terminals report empty.'),
    speech(orla,'The instruments only see what they\'re calibrated for. Sabrina, where does it feel strongest?'),
    speech(sabrina,'It\'s not an echo. It\'s the same. It hasn\'t finished going anywhere.'),
  ]),
  game('development','enter-the-quiet-room'),
  scene('development','the-extraction-plan','A Door Held Open','Sabrina proposes entering the signal herself and names who is allowed to end the test.',mind,[
    speech(sabrina,'I can hold one destination steady if someone closes the other at the exact moment Porygon chooses.'),
    speech(venn,'Excellent. Begin.'),
    speech(orla,'Wait. She needs to name the stop condition first, and who can call it.'),
    speech(sabrina,'If I stop talking, disconnect both receivers. Do not wait for Venn.'),
    speech(orla,'I\'ll do it.'),
  ]),
  battle('development','unstable-porygon'),

  scene('conflict','the-successful-demonstration','A Result Silph Can Sell','Porygon is recovered. Before Sabrina has recovered, Venn is already describing it to the executives.',lab,[
    narration('Porygon came out intact and exhausted. Before Sabrina had recovered, Venn invited executives into the lab and described a proprietary psychic stabilisation method.'),
    speech(venn,'With Sabrina on the receiver team, failed transfers become recoverable.'),
    speech(sabrina,'I am not on any team.'),
    speech(venn,'Naturally, the wording can be adjusted.'),
    speech(orla,'The wording is the agreement.'),
  ]),
  scene('conflict','the-locked-session','No Refusal on the Schedule','Venn schedules another live test and uses Sabrina\'s parents\' fear to secure it.',room,[
    speech(mother,'Director Venn says withdrawing now could make your powers uncontrolled again.'),
    speech(sabrina,'That letter is designed to worry you.'),
    speech(father,'We remember what happened before the quiet room.'),
    speech(sabrina,'So do I. I also remember none of you asked what the room cost me.'),
    speech(mother,'We were afraid.'),
    speech(sabrina,'You were scared, so you did whatever the man with the lab coat said.'),
  ]),
  scene('conflict','orla-removed','The Researcher Outside the Door','Venn removes Orla from the next session because she is the one who can stop it.',lab,[
    speech(venn,'Dr Orla\'s consent protocol is incompatible with emergency commercial testing.'),
    speech(orla,'Consent that disappears in an emergency is theatre.'),
    speech(sabrina,'I will not go in without her.'),
    speech(venn,'Your parents authorised the continuation.'),
    speech(sabrina,'My parents can consent to medical decisions. They cannot hand you my focus as a company asset.'),
  ]),
  scene('conflict','every-thought-at-once','The Room Breaks Open','The lab activates before Sabrina gives permission and every thought in the room arrives at once.',mind,[
    narration('The receivers activated before Sabrina gave permission. Every thought in the lab arrived at once: Venn\'s fear of losing the contract, her father\'s shame, her mother\'s desperate wish for an ordinary daughter, Orla\'s plan to cut the power.'),
    speech(sabrina,'Everyone stop-'),
    speech(father,'Sabrina, we are here.'),
    speech(sabrina,'I know. That\'s the problem.'),
    narration('Glass rose from the consoles and hung in the air. Porygon cried from the inactive terminal.'),
  ]),
  scene('conflict','the-stop-word','Ask Before Touching','Koichi reaches Sabrina by waiting for her answer before he does anything.',lab,[
    speech(koichi,'Sabrina, I can break the receiver housing. Do you want me to?'),
    speech(venn,'Do it now!'),
    speech(koichi,'I wasn\'t asking you.'),
    speech(sabrina,'Wait. Porygon is using the field. On my count, hit the left housing only.'),
    speech(koichi,'Got it.'),
    narration('Waiting gave Sabrina one quiet thought to hold onto.'),
  ]),
  scene('conflict','silph-door-closes','A Contract Refused','Sabrina ends the research relationship and tells her father he can come if he stops deciding for her.',lab,[
    speech(venn,'Without Silph equipment, episodes like this will come back.'),
    speech(sabrina,'This episode happened because you switched it on.'),
    speech(father,'We are leaving.'),
    speech(sabrina,'Don\'t say \'we.\' You can come if you want, but I\'m making my own decisions from here.'),
    speech(orla,'I have copied the consent records. Silph will answer for the breach.'),
  ]),

  scene('contemplation','family-in-the-dojo','What Fear Did','Sabrina\'s parents try to explain what they were afraid of and what they did about it.',dojo,[
    speech(mother,'I kept wishing you were easier. Not because anything was wrong with you, I just did not know what to do.'),
    speech(father,'Every expert who sounded certain became someone I wanted to obey.'),
    speech(sabrina,'Even when the expert wanted access to me.'),
    speech(father,'Yes. I am sorry.'),
    speech(sabrina,'I know you mean it. It doesn\'t make it faster.'),
  ]),
  scene('contemplation','koichis-offer','Rules for a Focus Battle','Koichi offers to train with Sabrina and gives her control over every condition.',dojo,[
    speech(koichi,'The Fighting Dojo cannot quiet other minds. We can give you one opponent who says what he is going to do before he does it.'),
    speech(sabrina,'You announce your attacks?'),
    speech(koichi,'Until you ask me not to. You control the distance, the length, and the stop word.'),
    speech(sabrina,'And if I hear you worrying that I am dangerous?'),
    speech(koichi,'Then that is my problem to deal with, not yours.'),
  ]),
  battle('contemplation','koichis-focus-test'),
  scene('contemplation','not-cured','A Mind Still Crowded','The training helps Sabrina hold focus longer but does not stop her hearing the crowd.',dojo,[
    speech(koichi,'You held focus longer today.'),
    speech(sabrina,'I also heard every spectator wondering if I would lose control.'),
    speech(koichi,'You don\'t have to feel fine about it yet.'),
    speech(sabrina,'People want to hear it\'s fixed.'),
    speech(orla,'So we build something that works over time, not something with a tidy finish.'),
  ]),

  scene('resolution','saffron-proposal','The Quiet Room Rewritten','Sabrina proposes running a Gym where consent rules are built into the structure, not left to individuals.',mind,[
    speech(orla,'The League needs a Psychic Gym, and Silph\'s conduct has made independent oversight urgent.'),
    speech(sabrina,'They will call appointing me rehabilitation.'),
    speech(koichi,'Then write it so anyone can see what it actually is.'),
    speech(sabrina,'No unsolicited readings. Every exercise has a stop word. Challengers can refuse to explain themselves.'),
    speech(orla,'And the Leader?'),
    speech(sabrina,'The Leader follows the same rules.'),
  ]),
  scene('resolution','league-hearing','A Candidate Who Hears the Panel','The League assesses Sabrina knowing she can hear what they are not saying.',lab,[
    speech(sabrina,'One of you thinks I am too unstable. One thinks appointing me will repair Silph\'s reputation. Neither of those things stops you from speaking honestly.'),
    speech(orla,'Sabrina, consent applies to the panel too.'),
    speech(sabrina,'You\'re right. I shouldn\'t have said it. That\'s exactly why the rules need to exist, so it doesn\'t come down to whether I\'m having a good day.'),
  ]),
  scene('resolution','the-marsh-licence','Leader of Saffron Gym','Sabrina receives the licence and adds a clause that she herself can be corrected.',mind,[
    narration('The licence required independent review, documented consent, and a permanent right for challengers to end psychic exercises. Sabrina added a fourth clause in her own hand: the Leader may be corrected.'),
    speech(mother,'Are you happy?'),
    speech(sabrina,'I\'m tired. And relieved. The anger is still there but it\'s quieter.'),
    speech(father,'Can we visit tomorrow?'),
    speech(sabrina,'Ask me tomorrow.'),
  ]),
  scene('resolution','first-session','The Door Stays Open','Sabrina opens her first session by asking the challenger whether they consent to her reading their moves.',mind,[
    speech(sabrina,'I can sense the shape of your next move. Do you consent to that being part of the battle?'),
    speech(koichi,'The challenger may say no.'),
    speech(sabrina,'Koichi, they know. Give them time.'),
    narration('The challenger considered the open door, then set a limit. Sabrina repeated it back before the first command.'),
  ]),

  scene('reflection','orlas-charter','The Rules Remain After the People','Orla tells Sabrina the consent charter has been adopted by Silph.',lab,[
    speech(orla,'Silph adopted the charter after the inquiry. Venn calls it administratively burdensome.'),
    speech(sabrina,'Then it is probably doing work.'),
    speech(orla,'Your name is not on it, as you asked.'),
    speech(sabrina,'Good. The policy should protect people whether they know who I am or not.'),
  ]),
  scene('reflection','a-quieter-room','Not Empty','Sabrina uses the quiet room she chose to put in the Gym, and Koichi asks if she wants company.',mind,[
    narration('Saffron Gym kept one room without clocks or mirrors. Its door had no lock. Sabrina entered when the city got too loud and left when she chose.'),
    speech(koichi,'Do you want company?'),
    speech(sabrina,'Sit outside. Ten minutes. Don\'t try to think quietly, it won\'t work and it\'ll distract me.'),
    speech(koichi,'I would not know how.'),
    narration('The room was never empty. It was quiet enough for Sabrina to decide which voice to answer.'),
  ]),
] }
