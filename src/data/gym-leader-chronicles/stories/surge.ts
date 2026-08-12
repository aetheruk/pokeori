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
    scene('backstory', 'storm-transport', 'The Last Transport', 'Surge learns what an electrical system means when lives depend on it.', transport, [
      narration('Years before Vermilion knew him as a Gym Leader, Surge served aboard a storm transport carrying field medics and wounded Pokémon. Lightning made the sea white. Every instrument on the bridge failed at once.'),
      speech(mako, 'Main bus is gone. Auxiliary cells are flooding faster than I can isolate them.'),
      speech(surge, 'Then stop chasing the board. Give me one live route to the medical deck and cut everything else.'),
      speech(mako, 'That means navigation goes dark.'),
      speech(surge, 'For ninety seconds. The people below do not have ninety seconds.'),
    ]),
    scene('backstory', 'voices-below-deck', 'Commands in the Dark', 'Surge’s authority keeps the transport moving but leaves no room for fear.', transport, [
      narration('The corridor filled with smoke and overlapping voices. Surge learned to separate them by urgency: the engineer asking for voltage, the medic asking for light, the frightened asking whether anyone could hear them.'),
      speech(nurse, 'The incubator battery is failing. I need stable current, not a surge.'),
      speech(surge, 'You will have it. Mako, east conduit. Everyone else, stay where you are and follow my count.'),
      speech(mako, 'The east conduit is arcing.'),
      speech(surge, 'Then we cross between arcs. Move.'),
    ]),
    scene('backstory', 'the-cost-of-ninety-seconds', 'A Route Kept Alive', 'The transport survives, and Surge mistakes survival for proof that every command was right.', transport, [
      narration('The medical deck kept power. Navigation returned after one hundred and twelve seconds. Two crew members suffered burns crossing the conduit, including Mako, who had obeyed before he had time to object.'),
      speech(mako, 'We made port. That will be the sentence in the report.'),
      speech(surge, 'It is the sentence that matters.'),
      speech(mako, 'It matters most. That is not the same thing.'),
      narration('Surge received a commendation. He kept it in a drawer and kept giving orders in the same voice.'),
    ]),
    scene('backstory', 'vermillion-contract', 'A Civilian Posting', 'Vermilion hires the decorated veteran to modernise its unreliable grid.', streets, [
      speech(steward, 'The harbour wants your electrical expertise. The League also needs someone to reopen Vermilion Gym after the previous Leader retired.'),
      speech(surge, 'You want a soldier in a civilian arena.'),
      speech(steward, 'I want someone who understands controlled power. Whether you understand civilians is part of the assessment.'),
      speech(mako, 'I have taken the harbour maintenance contract. If you accept, we work together again.'),
      speech(surge, 'This time nobody has to cross a burning deck.'),
      speech(mako, 'That sounds like hope, not a procedure.'),
    ]),

    scene('development', 'gym-and-shelter', 'Two Uses for One Building', 'Surge turns the old Gym into both a challenge hall and a storm shelter.', shelter, [
      narration('The Vermilion Gym had thick walls, an independent generator and enough floor space for cots. Surge drew a battle circuit on one side and emergency lanes on the other.'),
      speech(surge, 'In clear weather, trainers learn to control Electric Pokémon. During a warning, barriers fold back and the floor becomes a shelter.'),
      speech(nurse, 'People will arrive carrying babies, medicine, frightened Pokémon and no interest in military lines.'),
      speech(surge, 'Lines keep exits clear.'),
      speech(mako, 'People keep exits clear when they know why the lines exist.'),
    ]),
    scene('development', 'makos-drill', 'The Drill as Written', 'Mako tests whether Surge’s plan survives disagreement.', shelter, [
      speech(mako, 'Scenario: east door jammed, generator at sixty percent, thirty civilians in the yellow lane.'),
      speech(surge, 'Move them west. Voltorb holds the auxiliary relay while Raichu restores the door.'),
      speech(mako, 'West lane contains the medical station.'),
      speech(surge, 'Then medical moves.'),
      speech(mako, 'You answered before asking whether it can.'),
    ]),
    battle('development', 'makos-drill'),
    scene('development', 'after-the-drill', 'A Victory Nobody Trusts', 'Surge wins the exercise and discovers that nobody followed its intended lesson.', shelter, [
      speech(surge, 'Relay held, door restored, scenario complete.'),
      speech(nurse, 'My station lost access for four minutes. In a real evacuation, that is not an abstract penalty.'),
      speech(mako, 'Your team executed perfectly because they know your voice. The volunteers froze because they did not.'),
      speech(surge, 'Then they need more drills.'),
      speech(mako, 'Or you need a plan that works for people who are allowed to hesitate.'),
    ]),
    scene('development', 'warning-siren', 'Weather From the East', 'A real storm arrives before the disputed shelter plan is revised.', streets, [
      narration('The warning siren sounded that afternoon. A storm front crossed the harbour faster than forecast, rolling cranes into their locks and sending market stalls skidding through the rain.'),
      speech(surge, 'Open the shelter. Mako, generator. Hana, medical station on the north wall.'),
      speech(mako, 'East substation is already reporting unstable frequency.'),
      speech(surge, 'It can wait until the civilians are inside.'),
      speech(mako, 'If it falls, the whole eastern district reaches us in darkness.'),
    ]),
    game('development', 'restore-the-east-grid'),

    scene('conflict', 'blackout', 'After the Thunder', 'The repaired circuit fails elsewhere and Vermilion goes dark.', streets, [
      narration('The eastern grid returned for eleven minutes. Then a transformer blew beyond the repaired section. Darkness travelled block by block toward the harbour, followed by a chorus of alarms and Pokémon cries.'),
      speech(surge, 'Shelter team, execute blackout protocol. Yellow lane to the west wall. No stopping in the entrance.'),
      speech(child, 'My Pikachu ran toward the substation. It hates thunder and it thinks the wires are calling.'),
      speech(surge, 'You stay here. I will send someone.'),
      speech(child, 'Who? Everybody you keep sending already has a job.'),
    ]),
    game('conflict', 'voices-in-the-dark'),
    scene('conflict', 'mako-refuses-an-order', 'Not This Time', 'Mako refuses to repeat the transport’s most dangerous lesson.', shelter, [
      speech(surge, 'Mako, cross the maintenance trench and isolate the live bank. I will cover you with Raichu.'),
      speech(mako, 'No.'),
      speech(surge, 'That bank can ignite.'),
      speech(mako, 'Then ask me what I can see. The trench is flooded. Raichu’s cover would turn it into the conduit all over again.'),
      speech(surge, 'On the transport, hesitation would have killed people.'),
      speech(mako, 'And obedience burned us. Both facts get to remain true.'),
    ]),
    scene('conflict', 'ask-the-room', 'What Do You Need?', 'Surge changes the question and gains a plan he could not command into existence.', shelter, [
      speech(surge, 'All right. Mako, what route is safe?'),
      speech(mako, 'The service bridge, if somebody grounds the western fence first.'),
      speech(nurse, 'I can move medical south now that the first families are settled. That frees two insulated mats.'),
      speech(child, 'Pikachu knows the drain ledge. I can show you on the harbour map without leaving.'),
      speech(surge, 'Good. Nobody moves until they understand the reason and the person beside them confirms it.'),
      narration('The room became louder. For the first time, Surge did not mistake that for loss of control.'),
    ]),
    game('conflict', 'cross-the-substation'),
    scene('conflict', 'magneton-at-the-bank', 'The Living Fault', 'The source of the surges is a terrified Magneton trapped between fields.', streets, [
      narration('At the substation, Magneton hung between two damaged coils, pulled first east and then west. Each attempt to escape sent another pulse through the city.'),
      speech(mako, 'If we cut both banks at once, it drops into the flooded trench.'),
      speech(surge, 'Then we do not cut both. Raichu takes the first discharge. I draw Magneton toward the service bridge.'),
      speech(mako, 'You are not ordering Raichu into that field without checking.'),
      speech(surge, 'Raichu, look at me. Do you want the line?'),
      narration('Raichu planted its feet. Surge waited for the answering spark before he moved.'),
    ]),
    battle('conflict', 'substation-magneton'),
    scene('conflict', 'lights-return', 'A City Exhales', 'Power returns gradually, exposing the difference between rescue and repair.', streets, [
      narration('The harbour lamps returned one row at a time. People cheered inside the Gym. Surge could not join them yet; every light resembled an instrument blinking back on aboard the transport.'),
      speech(mako, 'Magneton is stable. The flooded bank stayed isolated. Nobody crossed the trench.'),
      speech(surge, 'I nearly sent you.'),
      speech(mako, 'You did send me. I said no, and you listened before the situation forced you to.'),
      speech(surge, 'That is a narrow definition of improvement.'),
      speech(mako, 'Most useful improvements are narrow enough to repeat.'),
    ]),

    scene('contemplation', 'the-commendation', 'The Sentence in the Report', 'Surge finally reads the transport report beyond its successful outcome.', shelter, [
      narration('Surge brought his old commendation to the empty shelter and unfolded the incident report kept behind it. The first page praised the medical route. The second named every injury.'),
      speech(surge, 'I remembered the power staying on. I did not let myself remember you dropping the wrench because your hand was burned.'),
      speech(mako, 'I remembered both. That is why I came to Vermilion. I thought we might build the thing we needed back then.'),
      speech(surge, 'A better generator?'),
      speech(mako, 'A room where refusing a route is part of the procedure.'),
    ]),
    scene('contemplation', 'nikos-question', 'Why Is the Gym a Shelter?', 'A child asks for an explanation no regulation required.', shelter, [
      speech(child, 'If this is a Pokémon Gym, why are there cots behind the battle wall?'),
      speech(surge, 'Because storms do not care what a building was scheduled to be.'),
      speech(child, 'Why make challengers practise switches and warning calls?'),
      speech(surge, 'Because power is not impressive when it only works in perfect weather.'),
      speech(child, 'That sounds like something for the sign outside.'),
      speech(surge, 'You may have a future in regulations, kid.'),
    ]),
    scene('contemplation', 'civilian-protocol', 'Permission to Hesitate', 'The revised plan replaces silent obedience with confirmation.', shelter, [
      speech(nurse, 'Every order names the reason. Every hazardous move requires the person receiving it to confirm the route.'),
      speech(mako, 'And anyone can call hold without rank, title or an explanation composed under pressure.'),
      speech(surge, 'The commander still decides when time runs out.'),
      speech(nurse, 'Yes. Listening is not the same as abandoning responsibility.'),
      speech(surge, 'Good. I have no talent for abandoning responsibility.'),
    ]),

    scene('resolution', 'league-assessment', 'Controlled Power', 'The League tests the Gym Surge rebuilt from the blackout.', shelter, [
      speech(steward, 'Your assessment includes battle command and a simulated shelter fault. I am told your staff may contradict you.'),
      speech(surge, 'They are required to when the information demands it.'),
      speech(mako, 'For the record, we were doing that before it was required.'),
      speech(steward, 'Then perhaps the candidate has demonstrated an ability to learn.'),
      speech(surge, 'Do not put that in writing until after the battle.'),
    ]),
    battle('resolution', 'league-assessment'),
    scene('resolution', 'thunder-licence', 'Leader of Vermilion Gym', 'Surge receives a licence conditioned on the shelter remaining part of the Gym.', shelter, [
      speech(steward, 'The League recognises Vermilion Gym under Leader Surge. The shelter function and civilian review board are conditions of the licence.'),
      speech(surge, 'They were never bargaining pieces.'),
      speech(mako, 'He means yes.'),
      speech(steward, 'I have begun to understand the dialect.'),
      speech(nurse, 'Then your first official duty is helping return thirty cots to storage without shouting at the volunteers.'),
    ]),
    scene('resolution', 'first-challenger', 'A Battle With a Stop Word', 'Vermilion’s first challenger is taught how to interrupt the Leader.', shelter, [
      speech(surge, 'Before we begin: either trainer can call hold. You will repeat the word so I know you heard it.'),
      speech(child, 'Hold.'),
      speech(surge, 'Louder.'),
      speech(child, 'Hold!'),
      speech(mako, 'Excellent. You have mastered the first technique Surge never learned in the service.'),
      speech(surge, 'The second technique is surviving his commentary.'),
    ]),

    scene('reflection', 'when-thunder-returns', 'A Different Voice', 'Another storm shows how deeply the lesson has entered the building.', shelter, [
      narration('The next summer, thunder rolled over Vermilion during a full Gym challenge. Surge stopped the match before the warning siren and opened the shelter partitions.'),
      speech(surge, 'Mako, what do you see on the east bank?'),
      speech(mako, 'Stable for now. I recommend we isolate it before the first arrivals.'),
      speech(surge, 'Agreed. Hana, what does medical need?'),
      narration('His voice still carried across the whole room. The difference was that it now made space for answers.'),
    ]),
    scene('reflection', 'after-the-thunder', 'Lights Along the Harbour', 'Surge accepts that courage can include revising the command.', streets, [
      speech(mako, 'You know people still tell the transport story. In their version, you held the entire ship together with a Raichu and one sentence.'),
      speech(surge, 'Stories like one sentence. Real systems need revisions.'),
      speech(mako, 'That sounds like something for the sign outside.'),
      speech(surge, 'Niko already claimed the signage consultancy.'),
      narration('Below them, the harbour lights remained steady. Surge watched each circuit hold, not because nobody questioned the plan, but because enough people had learned how.'),
    ]),
  ],
}
