import type { KantoGymChronicleStory } from '../types'
import { battle, character, game, narration, scene, speech, trainer } from '../helpers'

const office = '/backgrounds/chronicle-giovanni-viridian-office.avif'
const home = '/backgrounds/chronicle-giovanni-family-dining-room.avif'
const road = '/backgrounds/gym-ground.avif'
const giovanni = character('Giovanni', trainer('gym-kanto-giovanni'))
const silver = character('Silver', trainer('chronicle-silver'))
const ariana = character('Ariana', trainer('ariana'))
const cato = character('Cato', trainer('gamer'))
const hadrian = character('Hadrian', trainer('chronicle-hadrian'))
const housekeeper = character('Mrs Vale', trainer('maid'))

export const giovanniChronicleStory: KantoGymChronicleStory = { sequence: [
  scene('backstory','breakfast-ledger','The City as a Balance Sheet','Giovanni sees Viridian’s closed roads as both civic failure and opportunity.',home,[
    narration('Viridian’s western road had been closed for three winters. Merchants paid twice for eastern transport, the League called repairs uneconomical, and Giovanni kept every rejected petition in a leather folder beside the breakfast table.'),
    speech(silver,'My tournament starts at six. You said front row, then dinner at eight.'), speech(giovanni,'I remember promises I make.'),
    speech(silver,'You remember meetings too. Meetings usually win.'), speech(giovanni,'Not tonight.'),
  ]),
  scene('backstory','the-western-contract','A Road Nobody Wants','Giovanni offers to reopen the route where public institutions have failed.',office,[
    speech(hadrian,'The League will lease the road but cannot fund reconstruction. Whoever repairs it receives freight rights for ten years.'),
    speech(giovanni,'Seven years, and Viridian residents travel free.'), speech(hadrian,'You negotiate against your own advantage?'),
    speech(giovanni,'A road resented by the city is expensive to guard. I prefer gratitude when it can be acquired cheaply.'),
  ]),
  game('backstory','read-the-parcel-map'),
  scene('backstory','silver-practises','The Seat Reserved','Silver trains while Giovanni handles calls from the edge of the room.',home,[
    speech(silver,'Persian is watching the telephone instead of me.'), speech(giovanni,'Persian watches what may interrupt us.'),
    speech(silver,'So do I.'), speech(giovanni,'Show me the opening again. This time do not chase after Sneasel forces the sidestep.'),
    speech(silver,'Will you say that from the front row?'), speech(giovanni,'From the front row.'),
  ]),
  scene('backstory','ariana-at-the-door','The Other Organisation','Ariana reveals the private network behind Giovanni’s public efficiency.',office,[
    speech(ariana,'Cato’s crews control the quarry approach. The League believes they are independent raiders.'),
    speech(giovanni,'They are independent enough to become a problem and dependent enough to receive instruction.'),
    speech(ariana,'If the road is cleared publicly, our freight network gains a legitimate spine.'),
    speech(giovanni,'Then legitimacy and leverage happen to want the same thing. Those are useful days.'),
  ]),

  scene('development','the-blocked-pass','Stone on the Western Road','Giovanni leads the repair with visible competence and hidden ownership.',road,[
    narration('The landslide had left boulders above a narrow shelf. Giovanni placed Rhyhorn where every photograph could see it and smaller crews where no reporter could record which depots they served.'),
    speech(hadrian,'Your plan restores passage in six weeks.'), speech(giovanni,'Four, if the League stops sending observers who mistake clipboards for labour.'),
    speech(ariana,'Cato’s people are waiting beyond the ridge.'), speech(giovanni,'They will wait until the public convoy creates the story we need.'),
  ]),
  game('development','clear-the-western-road'),
  scene('development','first-convoy','A Public Success','The reopened road makes Giovanni indispensable to Viridian.',road,[
    narration('The first relief convoy reached Viridian two days ahead of the eastern route. Shops reopened. Families lined the road and cheered the man who had turned delay into movement.'),
    speech(hadrian,'The city council wants you to accept the vacant Gym site.'), speech(giovanni,'A Gym was not part of the road contract.'),
    speech(hadrian,'Viridian sees you as the only person who finishes what institutions begin.'),
    speech(ariana,'A licensed arena also gives private traffic a respectable reason to enter the city.'),
  ]),
  scene('development','cato-collects','The Toll Beyond the Cameras','Cato demands the reward he believes the arrangement promised.',road,[
    speech(cato,'My crews left the pass clear. Now your new merchants are using our approaches without paying.'),
    speech(giovanni,'They pay the published toll.'), speech(cato,'The published toll belongs to the League.'),
    speech(giovanni,'Your compensation purchased obedience, not ownership.'), speech(cato,'Then perhaps the second convoy meets a less obedient road.'),
  ]),
  battle('development','relief-raiders'),
  scene('development','a-cleaner-story','The Raider Defeated','Giovanni converts a dispute he helped create into proof of civic leadership.',office,[
    speech(hadrian,'You protected the convoy personally. The council’s Gym vote is now unanimous.'),
    speech(giovanni,'Cato underestimated the city’s resolve.'), speech(ariana,'Cato underestimated your willingness to erase an asset once it embarrassed you.'),
    speech(giovanni,'Do you object?'), speech(ariana,'I am admiring the press release.'),
  ]),

  scene('conflict','gym-assessment-date','Two Appointments','The final Gym assessment is scheduled on the evening Giovanni promised Silver.',office,[
    speech(hadrian,'The League panel can attend Thursday at seven. Miss it and appointment moves to the next quarter.'),
    speech(giovanni,'Thursday is unavailable.'), speech(ariana,'The southern depot meeting is Thursday.'),
    speech(giovanni,'So is Silver’s tournament.'), speech(hadrian,'Then decide which appointment can exist without you.'),
  ]),
  scene('conflict','silver-hears-half','Dinner at Eight','Giovanni repeats the promise while concealing how many claims compete with it.',home,[
    speech(silver,'Mrs Vale says your black suit is laid out. That is the suit for League meetings.'), speech(giovanni,'The assessment ends before your final.'),
    speech(silver,'If I reach the final.'), speech(giovanni,'You will.'), speech(silver,'That is not confidence. That is you arranging the future so you do not have to answer the condition.'),
    speech(giovanni,'Front row. Dinner at eight. I gave you my word.'),
  ]),
  scene('conflict','the-assessment','Viridian’s Candidate','Hadrian tests the polished institution Giovanni built.',office,[
    speech(hadrian,'A Leader serves challengers whether their arrival is profitable, convenient or politically useful.'),
    speech(giovanni,'Reliable institutions are profitable because unreliability is expensive.'), speech(hadrian,'That answer concerns incentives. I asked about duty.'),
    speech(giovanni,'Duty without a system is a promise made by someone expecting others to absorb the cost.'),
  ]),
  battle('conflict','league-assessment'),
  scene('conflict','six-ten','The Meeting That Cannot Wait','Ariana brings the private crisis Giovanni cannot delegate.',office,[
    speech(ariana,'The southern depot owners moved their vote to seven. Petrel will accept shared control if you send him.'),
    speech(giovanni,'Then instruct him not to.'), speech(ariana,'He does not frighten them enough.'),
    speech(giovanni,'The tournament hall is fifteen minutes away. This meeting requires ten.'),
    speech(ariana,'Contracts are famously respectful of fathers with dinner plans.'),
  ]),
  scene('conflict','the-ten-minute-choice','Seven O’Clock','Giovanni chooses leverage and calls the delay trivial.',office,[
    narration('The depot owners arrived with three lawyers and a contract twice as long as promised. Giovanni’s driver kept the engine running below.'),
    speech(giovanni,'Strike the shared-access clause and we are finished.'), speech(ariana,'They will walk.'),
    speech(giovanni,'Then they walk away from the only western road.'), narration('At the tournament hall, the first-round bell became the semifinal bell.'),
  ]),
  scene('conflict','front-row-empty','The Promise Becomes Past Tense','Giovanni arrives after Silver’s final has ended.',home,[
    narration('The dining clock read ten twenty-three. A runner-up trophy stood beside Giovanni’s untouched place. Silver’s dinner had been covered and carried away.'),
    speech(housekeeper,'He asked me not to wake him when you returned.'), speech(giovanni,'Did he see the car arrive?'),
    speech(housekeeper,'He stopped looking after the final.'), speech(giovanni,'Order the winner’s trophy. Better workmanship. His name engraved.'),
  ]),
  scene('conflict','that-is-not-mine','A Replacement for Presence','Silver refuses the expensive object Giovanni offers instead of an apology.',home,[
    speech(silver,'That trophy is not mine.'), speech(giovanni,'It is better than the one they awarded.'),
    speech(silver,'I did not win it, and you did not see why.'), speech(giovanni,'There will be another tournament.'),
    speech(silver,'Will you be there?'), speech(giovanni,'I will clear the date.'), speech(silver,'You cleared Thursday too.'),
  ]),

  scene('contemplation','the-ledger-entry','One Missed Evening','Giovanni tries to quantify a failure that resists accounting.',office,[
    narration('The western road earned its first full quarter of revenue. The southern depots signed. Viridian Gym opened on schedule. Giovanni’s ledger contained no column for the moment Silver stopped looking at the door.'),
    speech(ariana,'You obtained every objective.'), speech(giovanni,'The boy disagrees.'),
    speech(ariana,'Children are poor auditors.'), speech(giovanni,'No. They notice costs adults have agreed not to price.'),
  ]),
  scene('contemplation','hadrians-warning','What a Gym Magnifies','Hadrian recognises the flaw the League licence cannot correct.',office,[
    speech(hadrian,'You will make an effective Leader. That is not unqualified praise.'), speech(giovanni,'You licensed the Gym.'),
    speech(hadrian,'Because Viridian needs the institution you built. It will magnify whatever you practise inside it: discipline, patience, or the belief that results acquit methods.'),
    speech(giovanni,'You think one missed tournament reveals my method?'), speech(hadrian,'I think your first instinct was to purchase a better ending.'),
  ]),
  scene('contemplation','outside-silvers-door','An Apology Without Entry','Giovanni attempts honesty but still expects language to secure access.',home,[
    speech(giovanni,'I chose the meeting. I knew I might miss the final and told myself I could control the delay. I was wrong.'),
    speech(silver,'Are you saying this because you are sorry or because you want me to open the door?'),
    speech(giovanni,'Both.'), speech(silver,'Then come back when the first answer can survive without the second.'),
    narration('Giovanni stood outside longer than necessary, as if patience could become presence retroactively.'),
  ]),

  scene('resolution','opening-day','Leader of Viridian Gym','Giovanni accepts public responsibility while his private failure remains unresolved.',office,[
    narration('Viridian Gym opened beneath banners celebrating the western road. Merchants, League officials and families filled the hall. Silver did not attend.'),
    speech(hadrian,'Do you accept the duties of Leader?'), speech(giovanni,'I accept responsibility for every result produced under this roof.'),
    speech(hadrian,'And every method?'), speech(giovanni,'Those most of all.'), narration('The answer was excellent. Giovanni knew how little an excellent answer guaranteed.'),
  ]),
  scene('resolution','first-challenger','The Earth Badge Standard','Giovanni designs a challenge around systems that do not yield to force alone.',office,[
    speech(giovanni,'Ground is not merely weight. It is position, pressure and knowing which route remains when the obvious one closes.'),
    speech(ariana,'A civic lesson?'), speech(giovanni,'A practical one.'), speech(hadrian,'Those are not mutually exclusive.'),
    narration('The challenger entered a Gym as controlled as the road, each obstacle teaching dependence on the next.'),
  ]),
  scene('resolution','dinner-reset','Eight O’Clock Again','Giovanni protects a second dinner but cannot make it equivalent to the first.',home,[
    speech(housekeeper,'No calls at the table. I have your written instruction.'), speech(giovanni,'And if the Gym burns?'),
    speech(silver,'Then somebody whose name is on the rota handles it.'), speech(giovanni,'You spoke to Hadrian.'),
    speech(silver,'He came to my tournament.'), narration('Dinner began at eight. Silver discussed strategy, not forgiveness. Giovanni listened without correcting the distinction.'),
  ]),

  scene('reflection','the-second-final','A Seat Occupied','Giovanni attends the next tournament and discovers presence cannot be delegated or optimised.',home,[
    narration('At the next tournament, Giovanni arrived before the doors opened. He disliked the narrow seats, the uncontrolled crowd and every minute in which no decision required him.'),
    speech(ariana,'The southern depots are asking for you.'), speech(giovanni,'They can ask Petrel.'),
    speech(ariana,'He will concede shared access.'), speech(giovanni,'Then we will recover it later.'), narration('Silver lost in the semifinal. Giovanni remained through the presentation.'),
  ]),
  scene('reflection','dinner-at-eight','Success and Failure','The memory ends without pretending one corrected evening repairs the first.',home,[
    speech(silver,'You stayed even after I lost.'), speech(giovanni,'The promise was attendance, not victory.'),
    speech(silver,'You sound proud of understanding the sentence.'), speech(giovanni,'I am learning not to improve simple words until they mean what suits me.'),
    narration('At eight, they ate together. The runner-up trophy from the first tournament remained on Silver’s shelf. The replacement stayed boxed in Giovanni’s office, a perfect object for an evening that had never happened.'),
  ]),
] }
