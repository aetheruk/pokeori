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
  scene('backstory','breakfast-ledger','The City as a Balance Sheet','Giovanni tracks the western road closure while Silver reminds him about an evening he promised.',home,[
    narration('Viridian\'s western road had been closed for three winters. Merchants paid twice for eastern transport, the League called repairs uneconomical, and Giovanni kept every rejected petition in a leather folder beside the breakfast table.'),
    speech(silver,'My tournament starts at six. You said front row, then dinner at eight.'),
    speech(giovanni,'I remember.'),
    speech(silver,'You also have the freight meeting. Meetings usually win.'),
    speech(giovanni,'Not tonight.'),
  ]),
  scene('backstory','the-western-contract','A Road Nobody Wants','Giovanni negotiates the terms for reopening the western road, including a condition that favours Viridian residents.',office,[
    speech(hadrian,'The League will lease the road but cannot fund the reconstruction. Whoever repairs it gets the freight rights for ten years.'),
    speech(giovanni,'Seven years, and Viridian residents ride free.'),
    speech(hadrian,'You are negotiating against your own advantage?'),
    speech(giovanni,'If the city resents the toll, we will spend half our budget guarding the trucks. Keeping them happy early saves money later.'),
  ]),
  game('backstory','read-the-parcel-map'),
  scene('backstory','silver-practises','The Seat Reserved','Silver trains while Giovanni handles calls from the edge of the room.',home,[
    speech(silver,'Persian keeps watching the telephone instead of me.'),
    speech(giovanni,'Persian is better at that than I am.'),
    speech(silver,'So do I.'),
    speech(giovanni,'Show me the opening again. This time do not chase when Sneasel sidesteps.'),
    speech(silver,'Will you say that from the front row?'),
    speech(giovanni,'From the front row.'),
  ]),
  scene('backstory','ariana-at-the-door','The Other Organisation','Ariana explains how the private network behind Giovanni fits with the road project.',office,[
    speech(ariana,'Cato\'s crews control the quarry approach. The League thinks they are independent raiders.'),
    speech(giovanni,'They are independent enough to be a problem and dependent enough to take instructions.'),
    speech(ariana,'If the road opens publicly, our freight network gets a legitimate spine.'),
    speech(giovanni,'Good. Both point the same direction for once.'),
  ]),

  scene('development','the-blocked-pass','Stone on the Western Road','Giovanni puts Rhyhorn on the western road where cameras can see it while the real work happens out of frame.',road,[
    narration('The landslide had left boulders above a narrow shelf. Giovanni put Rhyhorn where every camera could see it and smaller crews where no reporter could record which depots they served.'),
    speech(hadrian,'Your plan restores passage in six weeks.'),
    speech(giovanni,'Four, if the League stops sending observers who mistake clipboards for labour.'),
    speech(ariana,'Cato\'s people are waiting beyond the ridge.'),
    speech(giovanni,'They wait until the convoy has moved.'),
  ]),
  game('development','clear-the-western-road'),
  scene('development','first-convoy','A Public Success','The western road reopens two days ahead of the eastern route and the city council wants Giovanni to take the vacant Gym site.',road,[
    narration('The first relief convoy reached Viridian two days ahead of the eastern route. Shops reopened. Families lined the road and cheered the man who had turned delay into movement.'),
    speech(hadrian,'The city council wants you to take the vacant Gym site.'),
    speech(giovanni,'A Gym was not part of the road contract.'),
    speech(hadrian,'Viridian sees you as the only person who finishes what institutions start.'),
    speech(ariana,'And a licensed arena gives private traffic a respectable reason to enter the city.'),
  ]),
  scene('development','cato-collects','The Toll Beyond the Cameras','Cato demands payment that Giovanni never agreed to.',road,[
    speech(cato,'My crews cleared the pass. Now your new merchants use our approaches without paying.'),
    speech(giovanni,'They pay the published toll.'),
    speech(cato,'The published toll belongs to the League.'),
    speech(giovanni,'Your compensation bought obedience, not ownership.'),
    speech(cato,'Then maybe the second convoy meets a less obedient road.'),
  ]),
  battle('development','relief-raiders'),
  scene('development','a-cleaner-story','The Raider Defeated','Giovanni turns the confrontation with Cato into a public demonstration of civic leadership.',office,[
    speech(hadrian,'You protected the convoy yourself. The council\'s Gym vote is now unanimous.'),
    speech(giovanni,'Cato underestimated the city\'s resolve.'),
    speech(ariana,'Cato underestimated your willingness to erase an asset once it embarrassed you.'),
    speech(giovanni,'Do you object?'),
    speech(ariana,'The press release is good.'),
  ]),

  scene('conflict','gym-assessment-date','Two Appointments','The final Gym assessment is scheduled on the same evening as Silver\'s tournament.',office,[
    speech(hadrian,'The League panel can attend Thursday at seven. Miss it and the appointment moves to next quarter.'),
    speech(giovanni,'Thursday is unavailable.'),
    speech(ariana,'The southern depot meeting is Thursday.'),
    speech(giovanni,'So is Silver\'s tournament.'),
    speech(hadrian,'Then decide which appointment can exist without you.'),
  ]),
  scene('conflict','silver-hears-half','Dinner at Eight','Giovanni repeats the promise to Silver without mentioning how many other things are scheduled for the same night.',home,[
    speech(silver,'Mrs Vale says your black suit is laid out. That is the League-meeting suit.'),
    speech(giovanni,'The assessment ends before your final.'),
    speech(silver,'If I reach the final.'),
    speech(giovanni,'You will.'),
    speech(silver,'You said that before my last match too.'),
    speech(giovanni,'Front row. Dinner at eight. I gave you my word.'),
  ]),
  scene('conflict','the-assessment','Viridian\'s Candidate','Hadrian tests Giovanni\'s understanding of what a Gym Leader owes challengers.',office,[
    speech(hadrian,'A Leader serves challengers whether their arrival is profitable, convenient, or politically useful.'),
    speech(giovanni,'Reliable systems make money. Unreliable ones cost twice what you save.'),
    speech(hadrian,'That answer is about incentives. I asked about duty.'),
    speech(giovanni,'Good intentions do not keep roads open or feed cities. Solid logistics do.'),
  ]),
  battle('conflict','league-assessment'),
  scene('conflict','six-ten','The Meeting That Cannot Wait','Ariana brings the depot crisis to Giovanni as he is about to leave for Silver\'s tournament.',office,[
    speech(ariana,'The southern depot owners moved their vote to seven. Petrel can take shared control if you send him.'),
    speech(giovanni,'Then tell him not to.'),
    speech(ariana,'He does not scare them enough.'),
    speech(giovanni,'The tournament hall is fifteen minutes away. The meeting needs ten.'),
    speech(ariana,'They won\'t hold.'),
  ]),
  scene('conflict','the-ten-minute-choice','Seven O\'Clock','Giovanni stays for the depot meeting. The tournament final starts without him.',office,[
    narration('The depot owners arrived with three lawyers and a contract twice as long as promised. Giovanni\'s driver kept the engine running below.'),
    speech(giovanni,'Strike the shared-access clause and we are done here.'),
    speech(ariana,'They will walk.'),
    speech(giovanni,'Then they walk away from the only western road.'),
    narration('At the tournament hall, the first-round bell became the semifinal bell.'),
  ]),
  scene('conflict','front-row-empty','The Promise Becomes Past Tense','Giovanni arrives home after Silver\'s final has already ended.',home,[
    narration('The dining clock read ten twenty-three. A runner-up trophy stood beside Giovanni\'s untouched place. Silver\'s dinner had been covered and carried away.'),
    speech(housekeeper,'He asked me not to wake him when you got back.'),
    speech(giovanni,'Did he see the car arrive?'),
    speech(housekeeper,'He stopped looking after the final.'),
    speech(giovanni,'Order the winner\'s trophy. Better workmanship. His name engraved.'),
  ]),
  scene('conflict','that-is-not-mine','A Replacement for Presence','Silver refuses the trophy Giovanni ordered.',home,[
    speech(silver,'That trophy is not mine.'),
    speech(giovanni,'It is better than the one they gave you.'),
    speech(silver,'I did not win it, and you did not see why.'),
    speech(giovanni,'There will be another tournament.'),
    speech(silver,'Will you be there?'),
    speech(giovanni,'I will clear the date.'),
    speech(silver,'You cleared Thursday too.'),
  ]),

  scene('contemplation','the-ledger-entry','One Missed Evening','The western road earns its first full quarter and Giovanni has nothing to put against the moment Silver stopped waiting.',office,[
    narration('The western road earned its first full quarter of revenue. The southern depots signed. Viridian Gym opened on schedule. Giovanni\'s ledger had no column for the moment Silver stopped looking at the door.'),
    speech(ariana,'You got everything you wanted.'),
    speech(giovanni,'The boy disagrees.'),
    speech(ariana,'He\'s twelve.'),
    speech(giovanni,'No. He just knows when his father breaks a promise.'),
  ]),
  scene('contemplation','hadrians-warning','What a Gym Magnifies','Hadrian tells Giovanni that licensing the Gym is not unqualified praise.',office,[
    speech(hadrian,'You will be an effective Leader. That is not unqualified praise.'),
    speech(giovanni,'You licensed the Gym.'),
    speech(hadrian,'Because Viridian needs the institution you built. It will magnify whatever you practise inside it: discipline, patience, or the belief that results excuse methods.'),
    speech(giovanni,'You think one missed tournament reveals my method?'),
    speech(hadrian,'I think your first instinct was to buy him off with an expensive trophy.'),
  ]),
  scene('contemplation','outside-silvers-door','An Apology Without Entry','Giovanni apologises through Silver\'s closed door.',home,[
    speech(giovanni,'I chose the meeting. I knew I might miss the final, and I told myself I could control the delay. I was wrong.'),
    speech(silver,'Are you sorry, or do you want me to open the door?'),
    speech(giovanni,'Both.'),
    speech(silver,'I don\'t want to talk about it tonight.'),
    narration('Giovanni stood outside longer than necessary, as if patience could become presence retroactively.'),
  ]),

  scene('resolution','opening-day','Leader of Viridian Gym','Viridian Gym opens. Silver does not attend.',office,[
    narration('Viridian Gym opened beneath banners celebrating the western road. Merchants, League officials, and families filled the hall. Silver did not attend.'),
    speech(hadrian,'Do you accept the duties of Leader?'),
    speech(giovanni,'I accept responsibility for every result produced under this roof.'),
    speech(hadrian,'And every method?'),
    speech(giovanni,'Those most of all.'),
    narration('The answer was excellent. Giovanni knew how little an excellent answer guarantees.'),
  ]),
  scene('resolution','first-challenger','The Earth Badge Standard','Giovanni designs the Gym\'s challenge around position and pressure rather than brute force.',office,[
    speech(giovanni,'Ground is position, not just weight. You win by knowing which way out is still open after the obvious one closes.'),
    speech(ariana,'A civic lesson?'),
    speech(giovanni,'A practical one.'),
    speech(hadrian,'Those are not mutually exclusive.'),
    narration('The challenger entered a Gym as controlled as the road, each obstacle teaching dependence on the next.'),
  ]),
  scene('resolution','dinner-reset','Eight O\'Clock Again','Giovanni has left instructions with the housekeeper to hold calls. Silver realises he spoke to Hadrian.',home,[
    speech(housekeeper,'No calls at the table. I have your written instruction.'),
    speech(giovanni,'And if the Gym burns?'),
    speech(silver,'Then somebody on the rota handles it.'),
    speech(giovanni,'You talked to Hadrian.'),
    speech(silver,'He came to my tournament.'),
    narration('Dinner began at eight. Silver discussed strategy, not forgiveness. Giovanni listened without correcting the distinction.'),
  ]),

  scene('reflection','the-second-final','A Seat Occupied','Giovanni sits through Silver\'s next tournament without taking any calls, and stays after Silver loses.',home,[
    narration('At the next tournament, Giovanni arrived before the doors opened. He disliked the narrow seats, the crowd, and every minute in which no decision required him.'),
    speech(ariana,'The southern depots are asking for you.'),
    speech(giovanni,'They can ask Petrel.'),
    speech(ariana,'He will concede shared access.'),
    speech(giovanni,'Then we will take it back later.'),
    narration('Silver lost in the semifinal. Giovanni stayed through the presentation.'),
  ]),
  scene('reflection','dinner-at-eight','Success and Failure','Silver notices Giovanni stayed even after the loss.',home,[
    speech(silver,'You stayed even after I lost.'),
    speech(giovanni,'The promise was attendance, not victory.'),
    speech(silver,'You sound proud of getting that sentence right.'),
    speech(giovanni,'I told you I would be there, Silver. That is all there is to it.'),
    narration('At eight, they ate together. The runner-up trophy from the first tournament stayed on Silver\'s shelf. The replacement stayed boxed in Giovanni\'s office: a perfect object for an evening that had never happened.'),
  ]),
] }
