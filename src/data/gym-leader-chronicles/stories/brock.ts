import type { KantoGymChronicleStory } from '../types'
import { battle, character, game, narration, scene, speech, trainer } from '../helpers'

const home = '/backgrounds/chronicle-brock-family-kitchen.avif'
const gym = '/backgrounds/chronicle-brock-neglected-gym.avif'
const quarry = '/backgrounds/chronicle-brock-quarry.avif'
const annex = '/backgrounds/chronicle-brock-neglected-gym.avif'

const brock = character('Brock', trainer('gym-kanto-brock'))
const forrest = character('Forrest', trainer('chronicle-forrest'))
const flint = character('Flint', trainer('chronicle-flint'))
const mara = character('Mara', trainer('chronicle-mara'))
const taro = character('Taro', trainer('youngster'))
const twins = character('The Twins', trainer('twins'))

export const brockChronicleStory: KantoGymChronicleStory = {
  sequence: [
    scene('backstory', 'the-cold-plate', 'One Place Set', 'Brock begins another morning by making Flint’s absence look temporary.', home, [
      narration('Before sunrise, the Harrison kitchen was already warm. Brock had five lunches open on the table, two pans on the stove, and one untouched plate by the window. The plate was getting harder to explain.'),
      speech(forrest, 'Dad missed dinner and breakfast. Is he really working the quarry, or is that just what we are telling the little ones?'),
      speech(brock, 'He left enough Gym work for three people. That part I can answer before school.'),
      speech(forrest, 'That is not what I asked. You never answer what I ask.'),
    ]),
    scene('backstory', 'a-house-in-motion', 'The Morning List', 'The household runs because Brock has memorised every need and told nobody what it costs.', home, [
      speech(twins, 'We cannot find the blue bag. We found two green bags and a Geodude, and he says neither one belongs to him.'),
      speech(brock, 'Forrest, check under the bench. Twins, sit down and eat. I have medicine, lunches, the stove, and the Gym keys.'),
      speech(forrest, 'That is four jobs after you gave me one. Give me another.'),
      speech(brock, 'You have school.'),
      speech(forrest, 'So do you, technically.'),
    ]),
    game('backstory', 'share-the-morning'),
    scene('backstory', 'the-sugar-bowl', 'No Return Date', 'Forrest finds the note Brock has hidden beneath the sugar bowl.', home, [
      narration('When the last kid finally went out the door, Brock lifted the sugar bowl. Flint’s note was folded into quarters underneath it, soft at the creases from being read too many times.'),
      speech(forrest, 'I came back for the blue bag. Is that from Dad?'),
      speech(brock, 'It says he needs time. It does not say where he went or when he is coming back.'),
      speech(forrest, 'Then why did you tell everyone Thursday?'),
      speech(brock, 'Because Thursday was close enough for them to sleep. I thought I would have a better answer by then.'),
    ]),
    scene('backstory', 'onix-does-not-eat', 'The Other Empty Room', 'At Pewter Gym, Onix waits beside Flint’s vacant chair and refuses food.', gym, [
      narration('The Gym smelled of cold dust. A crack ran from the upper viewing rail down to the battle floor. Onix had pushed his food dish next to Flint’s chair and left it there.'),
      speech(forrest, 'He knows. You can tell people whatever you like, but Onix knows Dad left.'),
      speech(brock, 'Then help me move the dish. The League inspector gets here at ten.'),
      speech(forrest, 'What happens when she asks who the Leader is?'),
      speech(brock, 'I stand in the ring and make sure she does not have to ask twice.'),
    ]),

    scene('development', 'mara-at-the-door', 'A Provisional Answer', 'Mara finds a capable young trainer inside an unsafe Gym.', gym, [
      speech(mara, 'I came to inspect a licensed Gym. I found a minor holding its keys, a damaged west wall, and no responsible adult on the premises.'),
      speech(brock, 'You found the person doing the work. I can show you the team, the challenge rules, and every repair still outstanding.'),
      speech(mara, 'Competence is not adulthood, Brock. It also is not a roof brace.'),
      speech(brock, 'Then give me the provisional assessment. If I fail it, close the Gym. If I pass, judge the building after I fix it.'),
      speech(mara, 'Thirty days. A safe floor, a real household plan, and a battle assessment. I will not bend one of those just because I admire the others.'),
    ]),
    scene('development', 'the-letter-in-the-ledger', 'A Different Future', 'Brock’s breeding-course offer sits unread beside the Gym accounts.', annex, [
      narration('The League annex kept copies of every application. Mara handed Brock a letter he had sent months earlier: admission to a Pokémon breeding programme in Celadon, starting in six weeks.'),
      speech(mara, 'You applied before your father left. Do you still want this?'),
      speech(brock, 'Wanting it does not make breakfast, and Celadon is not close enough to tuck anyone in.'),
      speech(mara, 'That is not what I asked.'),
      speech(brock, 'It is the only answer that feeds everyone right now.'),
    ]),
    scene('development', 'taro-kept-his-ticket', 'The Promised Challenger', 'Taro arrives with a challenge booking Flint accepted before leaving.', gym, [
      speech(taro, 'My ticket says today. Mum paid for the train twice because Mr Flint cancelled the first time.'),
      speech(brock, 'The floor is marked safe inside the white line. We can battle there.'),
      speech(mara, 'No. The inspection is not finished.'),
      speech(taro, 'I do not need a Badge if the Gym is closed. I just need somebody to stop acting like my challenge never mattered.'),
      speech(brock, 'It mattered. I will take responsibility for saying yes.'),
    ]),
    scene('development', 'before-the-first-command', 'Inside the White Line', 'Brock enters the ring knowing that winning is not the only thing being judged.', gym, [
      speech(forrest, 'The high crack moved when Onix came through the door.'),
      speech(brock, 'Keep everyone behind the rail. If I call stop, you clear the room before you ask why.'),
      speech(mara, 'A Leader may end a challenge for safety. That is not surrender.'),
      speech(brock, 'Understood. Taro, we battle to two conscious Pokémon. No attacks toward the west wall.'),
    ]),
    battle('development', 'first-challenger'),
    scene('development', 'stone-dust', 'The Wall Answers', 'The battle ends with Onix holding up the building instead of celebrating the result.', gym, [
      narration('Taro’s last command hit the floor. The west brace split with a sound too small for the weight above it. Onix crossed the ring before Brock spoke and pressed his body under the falling beam.'),
      speech(brock, 'Battle over. Forrest, clear the rail. Taro, take Geodude and do not run under the beam.'),
      speech(mara, 'Everyone outside. This Gym is closed as of now.'),
      speech(brock, 'Onix is still inside.'),
      speech(mara, 'Then we get him out together. You are not becoming the second person trapped in there.'),
    ]),

    scene('conflict', 'the-closure-notice', 'A Door With No Badge', 'The closure notice makes Brock’s private crisis public.', gym, [
      narration('By evening, an ochre League notice covered the Gym schedule. Parents crossed the road to read it. Brock scrubbed stone dust off Onix while every whisper outside came through the broken wall.'),
      speech(forrest, 'The twins heard someone say Dad ran away because the Gym was failing.'),
      speech(brock, 'I will talk to them after I get Onix settled.'),
      speech(forrest, 'You said that about the note. You said it about school. You keep putting us after the next emergency.'),
      speech(brock, 'Emergencies do not wait politely for family meetings.'),
    ]),
    scene('conflict', 'forrest-finds-the-course', 'The Letter Opens', 'Forrest discovers what Brock has silently decided to surrender.', home, [
      speech(forrest, 'This says they chose you. It says you could study breeding with people who know more than a kitchen full of injured Geodude.'),
      speech(brock, 'Put it back.'),
      speech(forrest, 'Did you tell them no?'),
      speech(brock, 'I did not answer.'),
      speech(forrest, 'That is how you say no. You just wait until the choice goes away on its own.'),
    ]),
    scene('conflict', 'flint-returns', 'The Key in Flint’s Hand', 'Flint returns expecting absence to be repaired by his presence.', home, [
      narration('Flint came back after dark, quarry dust on his coat and the old Gym key in his palm. The youngest kids reached him first. Brock stayed by the stove.'),
      speech(flint, 'I heard about the wall. I should have been here. I can take the Gym back tomorrow and square things with the inspector.'),
      speech(brock, 'You cannot square things with her. You cannot walk back into the chair just because the room got hard without you.'),
      speech(flint, 'I failed on the circuit. I could not come home and watch all of you see that.'),
      speech(forrest, 'So you made Brock do all of it instead.'),
    ]),
    scene('conflict', 'not-an-apology-yet', 'What Flint Left', 'Brock refuses the easy restoration Flint offers.', home, [
      speech(flint, 'I am sorry. Give me the keys and I will put this right.'),
      speech(brock, 'You are sorry because you saw the damage. I needed you to be sorry when you wrote that note.'),
      speech(flint, 'What do you want me to do?'),
      speech(brock, 'Tonight? Do the dishes. Tomorrow, tell every kid where you went. Then show up the day after that. The keys stay with Mara until the assessment.'),
      speech(forrest, 'And Brock answers Celadon before anything else gets to decide for him.'),
    ]),
    scene('conflict', 'the-quarry-price', 'Stone Is Not Free', 'The quarry foreman will donate stone only if the family can safely move it.', quarry, [
      narration('The quarry had the right stone and no spare cart. Brock was counting how many pieces he could carry alone when Flint quietly put his shoulder under the first block.'),
      speech(flint, 'You do not have to trust me with the Gym. Trust me with one end of this.'),
      speech(brock, 'Forrest marks the route. The twins stay outside the cutting line. Nobody improvises around a suspended stone.'),
      speech(forrest, 'That almost sounded like a plan for more than one person.'),
    ]),
    game('conflict', 'bring-home-the-stone'),
    scene('conflict', 'repair-lines', 'The Work Is Named', 'The family repairs the Gym by making every responsibility visible.', gym, [
      speech(brock, 'Flint takes the upper brace with the foreman. Forrest checks the floor marks. I clear the fractured stone with Geodude.'),
      speech(forrest, 'And after this, breakfast rotates. I wrote it down before you could argue.'),
      speech(flint, 'Put me on every early shift.'),
      speech(brock, 'No. Put yourself on the shifts you can actually keep. We have had enough promises made at full volume.'),
    ]),
    game('conflict', 'repair-the-gym-wall'),
    scene('conflict', 'the-repaired-line', 'A Scar in the Stone', 'The wall is safe, but Brock chooses not to hide where it failed.', gym, [
      narration('New stone crossed the old fracture in a pale diagonal. Brock refused the plaster that would have hidden it. Onix ate beside the repaired wall, watching Flint from across the room.'),
      speech(mara, 'The load test passes. That scar will draw questions.'),
      speech(brock, 'Good. A challenger should know this building can fail and still be made safe.'),
      speech(mara, 'Your household plan?'),
      speech(forrest, 'Signed by everyone. Including the part where Brock is not allowed to volunteer for an empty space.'),
    ]),

    scene('contemplation', 'under-the-quarry-sky', 'The Life Beyond Pewter', 'Brock admits that staying and wanting to leave can both be true.', quarry, [
      speech(brock, 'When I read the course letter, I can see the nursery rooms. I can almost smell the clean bandages. Then I picture this kitchen without me, and the whole thing feels selfish.'),
      speech(forrest, 'You taught us every job except how to get by without you. We would be fine. That does not mean we need you forever.'),
      speech(brock, 'You should not have to become me because I leave.'),
      speech(forrest, 'Then do not leave like Dad did. Tell us where. Tell us when. Come back when you said you would.'),
    ]),
    scene('contemplation', 'flint-at-the-table', 'A Father Without the Chair', 'Flint accepts that helping does not restore his authority.', home, [
      speech(flint, 'Mara says the League might license you. I thought I would feel replaced.'),
      speech(brock, 'Are you asking me to make you feel better about it?'),
      speech(flint, 'No. I am trying to notice when I do that. I can fix the roof and take the little ones to school. I do not need the chair to be their father.'),
      speech(brock, 'Being their father is the part with the harder attendance.'),
    ]),
    scene('contemplation', 'the-deferral-call', 'Not No', 'Brock asks the breeding programme for time instead of surrendering his place.', annex, [
      narration('Brock made the call from Mara’s office because the kitchen was too loud and the Gym too quiet. He expected the programme director to say no.'),
      speech(brock, 'I am not declining. I am asking to defer one term while I set up a safe Gym rota and train a deputy.'),
      speech(mara, 'Say the next part.'),
      speech(brock, 'I still want the place.'),
      narration('The answer was not guaranteed, but it was an answer Brock had chosen before circumstances chose it for him.'),
    ]),

    scene('resolution', 'mara-returns', 'The Assessment Begins', 'Mara inspects not only Brock’s team but the structure around him.', gym, [
      speech(mara, 'The wall is safe. The household plan has names beside every duty. Flint is present as a guardian, not as acting Leader. Now I need to see what kind of challenge you plan to run.'),
      speech(brock, 'One that tests patience before force. One where stopping for safety counts as good judgment.'),
      speech(forrest, 'And one with a closing time. That clause is mine.'),
      speech(mara, 'Then show me. Three Pokémon, League rules, no special allowances for a moving personal story.'),
    ]),
    scene('resolution', 'before-mara', 'What the Gym Teaches', 'Brock enters his assessment with a team that reflects the work behind it.', gym, [
      speech(brock, 'Geodude, you lead. Rhyhorn follows if she presses the centre. Onix holds until we understand her rhythm.'),
      speech(flint, 'That is not how I would order them.'),
      speech(brock, 'I know.'),
      speech(mara, 'Examiner ready. Candidate, begin when your whole team is prepared.'),
    ]),
    battle('resolution', 'league-examiner'),
    scene('resolution', 'the-provisional-key', 'Leader of Pewter Gym', 'Mara grants Brock the key without pretending it solves his family.', gym, [
      speech(mara, 'Brock Harrison, the League grants you a provisional Gym licence. It will be reviewed when your deferred course begins.'),
      speech(brock, 'So the licence allows a deputy?'),
      speech(mara, 'It requires one. The League is finally learning that indispensable people are usually a sign of a badly designed institution.'),
      speech(forrest, 'I volunteer for deputy training, not deputy parenting.'),
      speech(flint, 'And I volunteer to earn the jobs I used to assume were mine.'),
    ]),
    scene('resolution', 'the-first-new-challenge', 'A Different Welcome', 'Taro returns to complete the challenge that exposed the Gym’s weakness.', gym, [
      speech(taro, 'The scar is still there.'),
      speech(brock, 'It is part of the Gym now. So are the stop signal, the clear line, and the person responsible for each rail.'),
      speech(taro, 'Do I get my battle this time?'),
      speech(brock, 'You get a safe one. If you find another weak spot, tell me before the wall does.'),
    ]),

    scene('reflection', 'two-books-open', 'The Work That Remains', 'Brock’s two futures occupy the same desk.', gym, [
      narration('Months later, the breeder programme approved Brock’s deferral. His manual lay open beside the Gym ledger, both marked in the same careful hand. The repaired wall had weathered to almost the same colour as the old stone.'),
      speech(forrest, 'Breakfast rota says you are off tomorrow.'),
      speech(brock, 'I have reading.'),
      speech(forrest, 'Reading is not a household emergency. You are still off.'),
      speech(brock, 'All right. But wake me if the roof moves.'),
    ]),
    scene('reflection', 'the-chair-is-just-a-chair', 'No Place Empty', 'Brock stops measuring family by who occupies Flint’s old seat.', home, [
      narration('Flint’s old chair stayed at the table, but nobody kept it empty anymore. Some mornings Flint sat there. Some mornings a twin piled schoolbooks on it. Once, Onix put his head through the window and took the whole loaf.'),
      speech(flint, 'You know, I used to think that chair meant I was in charge.'),
      speech(brock, 'It means you are closest to the stove. Turn the eggs before they burn.'),
      speech(forrest, 'And that is how Brock became Leader: by finally delegating breakfast.'),
      speech(brock, 'That is not going in the League record.'),
    ]),
  ],
}
