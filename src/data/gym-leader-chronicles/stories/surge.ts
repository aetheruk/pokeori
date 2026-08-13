import type { KantoGymChronicleStory } from '../types'
import { battle, character, game, narration, scene, speech, trainer } from '../helpers'

const transport = '/backgrounds/chronicle-surge-storm-transport.avif'
const streets = '/backgrounds/chronicle-surge-blackout-streets.avif'
const shelter = '/backgrounds/chronicle-surge-gym-shelter.avif'

const surge = character('Lt. Surge', trainer('gym-kanto-ltsurge'))
const mako = character('Mako', trainer('chronicle-mako'))
const nurse = character('Nurse Hana', trainer('nurse'))
const steward = character('League Steward', trainer('chronicle-steward'))
const child = character('Niko', trainer('youngster'))

export const surgeChronicleStory: KantoGymChronicleStory = {
  sequence: [
    scene('backstory', 'storm-transport', 'The Last Transport', 'Lightning knocks out every instrument on the transport, and Surge has to keep the medical deck powered.', transport, [
      narration('Years before Vermilion knew him as a Gym Leader, Surge worked aboard a storm transport that carried field medics and wounded Pokémon. Lightning turned the sea white. Then every instrument on the bridge failed at once.'),
      speech(mako, 'Main power is gone. I am trying to isolate the backup cells, but they are flooding faster than I can keep up.'),
      speech(surge, 'Then stop trying to save the whole board. Give me one live route to the medical deck and kill everything else.'),
      speech(mako, 'That means we lose navigation.'),
      speech(surge, 'For ninety seconds. The people below do not have ninety seconds to spare.'),
    ]),
    scene('backstory', 'voices-below-deck', 'Commands in the Dark', 'Surge’s authority keeps the transport moving but leaves no room for fear.', transport, [
      narration('Smoke filled the corridor and everyone talked at once. Surge learned to sort the voices by urgency: an engineer quoting voltage, a medic asking for light, and a wounded soldier just asking if anyone could hear him.'),
      speech(nurse, 'The incubator battery is failing. I need steady current, and I need it now.'),
      speech(surge, 'You will have it. Mako, east conduit. Everyone else, hold where you are and count off.'),
      speech(mako, 'The east conduit is arcing.'),
      speech(surge, 'Then we move between the arcs. Go.'),
    ]),
    scene('backstory', 'the-cost-of-ninety-seconds', 'A Route Kept Alive', 'The transport makes port, but the burns Mako carries show what those commands cost.', transport, [
      narration('The medical deck kept its power. Navigation came back one hundred and twelve seconds later. Two crewmen were burned crossing the conduit, including Mako, who followed the order before he could question it.'),
      speech(mako, 'We made port. That is what the report will say.'),
      speech(surge, 'That is what matters.'),
      speech(mako, 'That is what matters most. Those are not the same thing.'),
      narration('Surge received a commendation. He kept it in a drawer, and kept giving orders in exactly the same voice.'),
    ]),
    scene('backstory', 'vermillion-contract', 'A Civilian Posting', 'Vermilion hires the decorated veteran to modernise its unreliable grid.', streets, [
      speech(steward, 'The harbour needs someone who understands electricity. The League also needs someone to reopen Vermilion Gym after the last Leader retired.'),
      speech(surge, 'You want a soldier running a gym.'),
      speech(steward, 'I want someone who can control power. Whether you can handle civilians is part of the test.'),
      speech(mako, 'I have taken the harbour maintenance contract. If you take the gym, we work together again.'),
      speech(surge, 'This time nobody has to cross a burning deck.'),
      speech(mako, 'That almost sounds like hope. I will take it.'),
    ]),

    scene('development', 'gym-and-shelter', 'Two Uses for One Building', 'Surge turns the old Gym into both a challenge hall and a storm shelter.', shelter, [
      narration('The old Gym had thick walls, its own generator, and enough open floor for cots. Surge drew a battle circuit on one side and marked emergency lanes on the other.'),
      speech(surge, 'Clear weather, trainers learn to handle Electric types. When a storm warning goes out, we fold the barriers back and this floor becomes a shelter.'),
      speech(nurse, 'People will come in with babies, medication, frightened Pokémon, and no interest in military lines.'),
      speech(surge, 'Lines keep the exits clear.'),
      speech(mako, 'People keep exits clear when they understand why the lines are there.'),
    ]),
    scene('development', 'makos-drill', 'The Drill as Written', 'Mako tests whether Surge’s plan survives disagreement.', shelter, [
      speech(mako, 'Scenario. East door is jammed, generator at sixty percent, thirty civilians in the yellow lane.'),
      speech(surge, 'Move them west. Voltorb holds the auxiliary relay while Raichu gets the door back.'),
      speech(mako, 'The west lane has the medical station.'),
      speech(surge, 'Then medical moves.'),
      speech(mako, 'You answered before you checked whether it can move.'),
    ]),
    battle('development', 'makos-drill'),
    scene('development', 'after-the-drill', 'A Victory Nobody Trusts', 'Surge wins the exercise and discovers that nobody followed its intended lesson.', shelter, [
      speech(surge, 'Relay held. Door restored. Scenario complete.'),
      speech(nurse, 'My station lost power for four minutes. In a real evacuation, that is not a footnote.'),
      speech(mako, 'Your crew did it perfectly because they know your voice. The volunteers froze because they do not.'),
      speech(surge, 'Then they need more drills.'),
      speech(mako, 'Or you need a plan that works for people who are allowed to hesitate.'),
    ]),
    scene('development', 'warning-siren', 'Weather From the East', 'A real storm arrives before the disputed shelter plan is revised.', streets, [
      narration('The siren went off that same afternoon. A storm crossed the harbour faster than anyone predicted, shoving cranes into their locks and sending market stalls skidding down the street.'),
      speech(surge, 'Open the shelter. Mako, generator. Hana, medical against the north wall.'),
      speech(mako, 'The east substation is already reporting unstable frequency.'),
      speech(surge, 'It can wait until everyone is inside.'),
      speech(mako, 'If it drops, the whole east side goes dark on us.'),
    ]),
    game('development', 'restore-the-east-grid'),

    scene('conflict', 'blackout', 'After the Thunder', 'The repaired circuit fails elsewhere and Vermilion goes dark.', streets, [
      narration('The east grid came back for eleven minutes. Then a transformer blew past the section we fixed. The darkness rolled block by block toward the harbour, with alarms and Pokémon cries following it.'),
      speech(surge, 'Shelter team, blackout protocol. Yellow lane to the west wall. Nobody stops in the entrance.'),
      speech(child, 'My Pikachu ran toward the substation! It hates thunder, and it thinks the wires are calling it!'),
      speech(surge, 'You stay here. I will send someone.'),
      speech(child, 'Who? Everyone you send already has a job.'),
    ]),
    game('conflict', 'voices-in-the-dark'),
    scene('conflict', 'mako-refuses-an-order', 'Not This Time', 'Mako refuses to repeat the transport’s most dangerous lesson.', shelter, [
      speech(surge, 'Mako, cross the maintenance trench and isolate the live bank. Raichu and I will cover you.'),
      speech(mako, 'No.'),
      speech(surge, 'That bank can catch fire.'),
      speech(mako, 'Then ask me what I can see before you order it. The trench is flooded. Raichu’s cover would turn it into the conduit all over again.'),
      speech(surge, 'On the transport, hesitation cost lives.'),
      speech(mako, 'And following orders cost burns. Both of those things are true.'),
    ]),
    scene('conflict', 'ask-the-room', 'What Do You Need?', 'Surge stops giving orders and asks the room what it actually needs.', shelter, [
      speech(surge, 'All right. Mako, what route is safe?'),
      speech(mako, 'The service bridge, if somebody grounds the western fence first.'),
      speech(nurse, 'I can move medical south now that the first families are settled. That frees two insulated mats.'),
      speech(child, 'Pikachu knows the drain ledge. I can show you on the harbour map, I will not even leave.'),
      speech(surge, 'Good. Nobody moves until they understand why, and the person next to them agrees.'),
      narration('The room got louder. For the first time, Surge did not mistake that for losing control.'),
    ]),
    game('conflict', 'cross-the-substation'),
    scene('conflict', 'magneton-at-the-bank', 'The Living Fault', 'The source of the surges is a terrified Magneton trapped between fields.', streets, [
      narration('At the substation, Magneton hung between two damaged coils, pulled east, then west. Every time it tried to escape, another pulse went through the city.'),
      speech(mako, 'If we cut both banks at once, it drops into the flooded trench.'),
      speech(surge, 'Then we do not cut both. Raichu takes the first discharge. I draw Magneton toward the service bridge.'),
      speech(mako, 'You are not sending Raichu into that field without checking with it.'),
      speech(surge, 'Raichu, look at me. Do you want the line?'),
      narration('Raichu planted its feet. Surge waited for the spark before he moved.'),
    ]),
    battle('conflict', 'substation-magneton'),
    scene('conflict', 'lights-return', 'A City Exhales', 'The harbour lights come back one row at a time, and Surge admits how close he came to sending Mako across the trench.', streets, [
      narration('The harbour lamps came back one row at a time. People cheered inside the Gym. Surge could not join them yet. Every light reminded him of an instrument blinking back on board the transport.'),
      speech(mako, 'Magneton is stable. The flooded bank stayed isolated. Nobody crossed the trench.'),
      speech(surge, 'I nearly sent you across it.'),
      speech(mako, 'You did send me. I said no, and you listened before it came to that.'),
      speech(surge, 'That is a pretty small improvement.'),
      speech(mako, 'Most real improvements are small enough to keep.'),
    ]),

    scene('contemplation', 'the-commendation', 'The Sentence in the Report', 'Surge finally reads the transport report beyond its successful outcome.', shelter, [
      narration('Surge brought his old commendation to the empty shelter and unfolded the incident report he had kept behind it. The first page praised the medical route. The second page named every injury.'),
      speech(surge, 'I remembered the power staying on. I did not let myself remember you dropping that wrench because your hand was burned.'),
      speech(mako, 'I remembered both. That is why I came to Vermilion. I thought maybe we could build what we needed back then.'),
      speech(surge, 'A better generator?'),
      speech(mako, 'A room where saying no is part of the procedure.'),
    ]),
    scene('contemplation', 'nikos-question', 'Why Is the Gym a Shelter?', 'A child asks for an explanation no regulation required.', shelter, [
      speech(child, 'If this is a Pokémon Gym, why are there cots behind the battle wall?'),
      speech(surge, 'Because storms do not care what a building was supposed to be.'),
      speech(child, 'Then why make challengers practise switches and warning calls?'),
      speech(surge, 'Because power that only works in perfect weather is not worth much.'),
      speech(child, 'That sounds like something you would put on a sign.'),
      speech(surge, 'You may have a future in regulations, kid.'),
    ]),
    scene('contemplation', 'civilian-protocol', 'Permission to Hesitate', 'The revised plan replaces silent obedience with confirmation.', shelter, [
      speech(nurse, 'Every order now names the reason for it. Every dangerous job requires the person doing it to confirm the route.'),
      speech(mako, 'And anyone can call hold. No rank required, no prepared speech required.'),
      speech(surge, 'The commander still decides when time runs out.'),
      speech(nurse, 'Yes. Listening is not giving up responsibility.'),
      speech(surge, 'Good. I have never been any good at giving that up.'),
    ]),

    scene('resolution', 'league-assessment', 'Controlled Power', 'The League tests the Gym Surge rebuilt from the blackout.', shelter, [
      speech(steward, 'Your assessment covers battle command and a simulated shelter fault. I am told your staff are allowed to contradict you.'),
      speech(surge, 'They are required to when the situation calls for it.'),
      speech(mako, 'For the record, we were doing that before it was required.'),
      speech(steward, 'Then the candidate may have learned something.'),
      speech(surge, 'Do not write that down until after the battle.'),
    ]),
    battle('resolution', 'league-assessment'),
    scene('resolution', 'thunder-licence', 'Leader of Vermilion Gym', 'Surge receives a licence conditioned on the shelter remaining part of the Gym.', shelter, [
      speech(steward, 'The League recognises Vermilion Gym under Leader Surge. The shelter and the civilian review board stay part of the licence.'),
      speech(surge, 'They were never bargaining pieces.'),
      speech(mako, 'He means yes.'),
      speech(steward, 'I am learning the dialect.'),
      speech(nurse, 'Then your first official duty is helping put thirty cots back in storage without shouting at the volunteers.'),
    ]),
    scene('resolution', 'first-challenger', 'A Battle With a Stop Word', 'Vermilion’s first challenger is taught how to interrupt the Leader.', shelter, [
      speech(surge, 'Before we start, either of us can call hold. Say the word back so I know you heard it.'),
      speech(child, 'Hold.'),
      speech(surge, 'Louder.'),
      speech(child, 'Hold!'),
      speech(mako, 'There. You have learned the first technique Surge never mastered in the service.'),
      speech(surge, 'The second is surviving his commentary.'),
    ]),

    scene('reflection', 'when-thunder-returns', 'A Different Voice', 'A summer storm rolls in during a full Gym challenge, and the shelter opens before the siren.', shelter, [
      narration('The next summer, thunder rolled over Vermilion in the middle of a full Gym challenge. Surge stopped the match before the siren and opened the shelter partitions.'),
      speech(surge, 'Mako, what do you see on the east bank?'),
      speech(mako, 'Stable for now. I would isolate it before the first people arrive.'),
      speech(surge, 'Agreed. Hana, what does medical need?'),
      narration('His voice still carried across the room. The difference was that it made room for answers.'),
    ]),
    scene('reflection', 'after-the-thunder', 'Lights Along the Harbour', 'Surge watches the harbour lights hold and lets the revised plan be the one that worked.', streets, [
      speech(mako, 'People still tell the transport story. In their version, you held the whole ship together with Raichu and one sentence.'),
      speech(surge, 'That is a nice story. It leaves out every part that went wrong.'),
      speech(mako, 'That sounds like something for the sign outside.'),
      speech(surge, 'Niko already claimed the signage job.'),
      narration('Below them, the harbour lights held steady. Surge watched each circuit stay lit, not because nobody questioned the plan, but because enough people had learned how.'),
    ]),
  ],
}
