import type { KantoGymChronicleStory } from '../types'
import { battle, character, game, narration, scene, speech, trainer } from '../helpers'

const theatre = '/backgrounds/chronicle-misty-water-theater.avif'
const cape = '/backgrounds/chronicle-misty-cerulean-cape.avif'

const misty = character('Misty', trainer('gym-kanto-misty'))
const daisy = character('Daisy', trainer('chronicle-daisy'))
const violet = character('Violet', trainer('chronicle-violet'))
const lily = character('Lily', trainer('chronicle-lily'))
const steward = character('League Steward', trainer('chronicle-steward'))

export const mistyChronicleStory: KantoGymChronicleStory = {
  sequence: [
    scene('backstory', 'the-count-of-four', 'Out of Step', 'Misty hears a battle rhythm inside the sisters’ opening number.', theatre, [
      narration('Cerulean Gym had been a theatre before any of the sisters were born. Their parents kept the old rising platforms and built a pool around them, so every family decision thereafter had to be both practical and dramatic.'),
      speech(daisy, 'On four, Starmie breaks the surface. On five, you turn toward the balcony. Please do not challenge anyone in the balcony.'),
      speech(misty, 'If Starmie waits until four, Violet’s Seel blocks its cleanest line. It should move on two.'),
      speech(violet, 'The cleanest line to what? There is no opponent. There is a chandelier.'),
      speech(lily, 'And Mother was very clear about not battling the chandelier again.'),
    ]),
    scene('backstory', 'centre-water', 'The Youngest Sister', 'Daisy offers Misty the visible role the family understands.', theatre, [
      speech(daisy, 'You have the strongest entrance. Take centre water at Saturday’s preview and the sponsors will finally stop asking whether you are old enough to be in the show.'),
      speech(misty, 'I am old enough to enter the League’s Gym trial. The form is in my locker.'),
      speech(lily, 'A Leader trial? Here? Our Gym has never submitted a battle programme.'),
      speech(misty, 'That is why I submitted one.'),
      speech(daisy, 'Without telling us. Naturally.'),
    ]),
    game('backstory', 'finale-rehearsal'),
    scene('backstory', 'after-the-music', 'Two Kinds of Applause', 'A strong rehearsal only sharpens the disagreement over what Cerulean Gym should be.', theatre, [
      narration('The final chord faded beneath the water. The empty seats made no sound, but Daisy smiled as though she could already hear Saturday’s applause.'),
      speech(daisy, 'That was beautiful. When you stop trying to beat the music, you understand it better than any of us.'),
      speech(misty, 'I was not trying to beat it. I was choosing when Starmie should commit and when it should wait. That is battling, Daisy.'),
      speech(daisy, 'It can be battling to you without turning our home into a proving ground.'),
      speech(misty, 'It is my home too. I should be allowed to prove something in it.'),
    ]),
    scene('backstory', 'the-hidden-form', 'Applicant: Misty Waterflower', 'The League application reveals how long Misty has prepared in private.', theatre, [
      speech(violet, 'Six months of tide charts, challenger rules, and a budget for lifeguards. You did all this after rehearsals?'),
      speech(misty, 'Usually after you went to bed. Daisy says plans sound less reckless in the morning, so I kept waiting for the right morning.'),
      speech(daisy, 'The trial is today at the Cape. Saturday’s sponsor preview is also today, because the League moved your appointment after you filed.'),
      speech(misty, 'Then come to the trial. The preview can start without one person.'),
      speech(daisy, 'The preview was built around you. You made both choices alone and left the collision for us.'),
    ]),

    scene('development', 'a-cry-from-the-canal', 'The Sound Beneath the Doors', 'Horsea’s distress call interrupts an argument nobody has resolved.', theatre, [
      narration('A thin cry travelled through the open service doors, almost lost beneath the filtration fans. Misty stopped mid-sentence. Starmie turned toward the canal at exactly the same moment.'),
      speech(misty, 'That is a Horsea. It called twice, then something larger answered from the Cape.'),
      speech(lily, 'I heard the fan belt.'),
      speech(misty, 'No. The second note dropped when the water carried it around the sea wall.'),
      speech(daisy, 'The League steward will leave if we are late.'),
      speech(misty, 'Then we had better learn what is waiting on the route.'),
    ]),
    game('development', 'listen-across-the-water'),
    scene('development', 'the-cape-message', 'A Warning, Not a Challenge', 'Misty recognises that Gyarados is keeping boats away from an injured Horsea.', cape, [
      narration('At the Cape, a red Gyarados circled the narrow cove. Each time a boat approached, it struck the water in front of the bow and forced it back. Horsea’s cry came from behind the rocks.'),
      speech(violet, 'It is attacking the harbour route. The rangers will drive it out if we report this.'),
      speech(misty, 'Look where it strikes. Always ahead of the boats, never through them. It is warning us away.'),
      speech(daisy, 'From what?'),
      speech(misty, 'The cove is too shallow for it. Something inside matters enough that it is willing to beach itself.'),
    ]),
    scene('development', 'chart-the-water', 'A Route Through the Cove', 'The sisters combine theatre rigging and Misty’s tide knowledge to reach Horsea.', cape, [
      speech(lily, 'Our floating light frames can cross that gap. They are rated for three performers and one unnecessarily large costume.'),
      speech(daisy, 'They are not rescue rafts.'),
      speech(misty, 'No, but the joints flex with the current. If Violet anchors here and Lily feeds the line, I can approach without crossing Gyarados’s circle.'),
      speech(violet, 'You know, we do occasionally have useful ideas before you have already jumped into the water.'),
      speech(misty, 'I am standing on land and listening. Please note the historic occasion.'),
    ]),
    game('development', 'chart-the-cove'),
    scene('development', 'behind-the-rocks', 'Horsea’s Broken Fin', 'Misty reaches the cause of the commotion and sees the cost of rushing it.', cape, [
      narration('Horsea lay in a pocket of calm water with fishing line bound around its fin. Gyarados lowered its head between Misty and the rocks, waiting for her next movement.'),
      speech(misty, 'I am going to cut the line. Starmie stays behind me. Nobody pulls until Horsea stops twisting.'),
      speech(daisy, 'You are giving instructions as if Gyarados agreed to them.'),
      speech(misty, 'It has been asking people to slow down all morning. I can return the courtesy.'),
      speech(lily, 'For the record, you are much less frightening when you ask.'),
    ]),

    scene('conflict', 'the-ranger-boat', 'Too Many Good Intentions', 'A rescue crew’s arrival turns the cove into the confrontation Gyarados feared.', cape, [
      narration('The harbour ranger had not heard Misty’s plan. Its motor entered the cove at full speed, scattering the light frames and driving Gyarados against the outer rocks.'),
      speech(daisy, 'Misty, get back on the platform.'),
      speech(misty, 'If I retreat now, Gyarados has to choose between us and Horsea. Starmie, make a clear lane toward open water.'),
      speech(violet, 'The ranger is preparing a net.'),
      speech(misty, 'Then we stop the net before we stop Gyarados.'),
    ]),
    battle('conflict', 'service-gyarados'),
    scene('conflict', 'the-horsea-rescue', 'When the Water Settles', 'The battle creates enough space to free Horsea, but costs Misty her appointment.', cape, [
      narration('Starmie’s final screen turned the ranger’s net aside. Gyarados exhausted itself against the current, then allowed Misty close enough to cut Horsea free. By the time both Pokémon reached open water, the League steward’s launch was leaving the pier.'),
      speech(misty, 'Wait! I was the trial applicant.'),
      speech(steward, 'Your appointment ended forty minutes ago. The League cannot assess a candidate who does not attend.'),
      speech(daisy, 'She was handling an emergency the harbour team misunderstood.'),
      speech(steward, 'Then submit an incident report. It does not restore today’s panel.'),
    ]),
    scene('conflict', 'the-preview-curtain', 'The Empty Centre', 'Back at the Gym, the sponsor preview fails without the role Daisy built around Misty.', theatre, [
      speech(lily, 'We moved Violet into centre water, but Seel kept looking for her old mark. The western fountain started a bar early and soaked the front row.'),
      speech(violet, 'One sponsor called it experimental. That was the kind one.'),
      speech(daisy, 'The preview did not fail because Misty rescued a Pokémon. It failed because we built a production with no understudy.'),
      speech(misty, 'You mean because I left.'),
      speech(daisy, 'I mean because all four of us have been pretending our plans are family decisions after making them alone.'),
    ]),
    scene('conflict', 'the-sisters-score', 'Not the Spare Sister', 'Old assumptions finally become explicit.', theatre, [
      speech(misty, 'You call me centre stage when you need an entrance. The moment I want something you did not choose, I become the youngest sister who should wait.'),
      speech(daisy, 'I became the responsible one because nobody else volunteered. Sponsors speak to me, the League speaks to me, and all three of you get to call that control.'),
      speech(violet, 'We call it control because you answer before asking whether we have an answer.'),
      speech(lily, 'Misty does the same thing, only wetter.'),
      speech(misty, 'Fine. I should have told you about the trial. That does not make the battle programme a childish phase.'),
    ]),
    scene('conflict', 'the-stewards-condition', 'One Trial Remains', 'The League offers a rescheduled trial only if Cerulean Gym agrees what is being assessed.', theatre, [
      speech(steward, 'The incident report supports your judgment at the Cape. It also describes a Gym with no declared operator and four competing versions of its purpose.'),
      speech(daisy, 'Cerulean is a water performance venue managed by the Waterflower family.'),
      speech(misty, 'And I propose a licensed challenge programme within it.'),
      speech(steward, 'Then the family must nominate an acting Leader. The assessment will be a formal match against that nominee.'),
      speech(violet, 'Which means Daisy has to decide whether she is defending the old Gym or testing the new one.'),
    ]),

    scene('contemplation', 'pool-after-closing', 'No Audience', 'Misty and Daisy speak honestly when there is nobody left to impress.', theatre, [
      narration('After closing, Daisy sat at the edge of the pool with her stage shoes beside her. Misty joined her without a prepared argument. For several minutes, neither sister filled the silence.'),
      speech(daisy, 'When our parents left the tour to us, everybody looked at me. I said yes before I knew what they were asking. Then I kept saying yes until it sounded like authority.'),
      speech(misty, 'When I battle, nobody can decide I am decorative. The result is not polite. It tells me what worked.'),
      speech(daisy, 'Results can lie too. You won space for Horsea today, but you also missed the trial and our preview. One good choice can still hurt people.'),
      speech(misty, 'I know. I just do not regret the rescue enough to pretend I would choose differently.'),
    ]),
    scene('contemplation', 'daisys-question', 'What Would Your Gym Teach?', 'Daisy asks Misty to define more than what she is resisting.', theatre, [
      speech(daisy, 'Suppose you win. What does a challenger learn here besides the fact that my little sister is very difficult to push around?'),
      speech(misty, 'They learn to read movement before attacking. Water shows you every careless decision. A good trainer changes with it instead of blaming the current.'),
      speech(daisy, 'That sounds suspiciously like choreography.'),
      speech(misty, 'It sounds like what I learned from choreography after I stopped resenting it.'),
      speech(daisy, 'Then perhaps you were not out of step. Perhaps you were counting toward a different ending.'),
    ]),
    scene('contemplation', 'the-four-column-plan', 'A Gym With Two Doors', 'The sisters design separate programmes that share staff, water and responsibility.', theatre, [
      speech(violet, 'Morning rehearsals, afternoon challenges, and no rearranging platforms without putting it on the board.'),
      speech(lily, 'The show gets an understudy. The battle programme gets a lifeguard who is not also battling.'),
      speech(daisy, 'Sponsor money maintains the pool. Challenge fees maintain the teams. Neither budget quietly rescues the other.'),
      speech(misty, 'And any sister can call a safety stop without losing her place in the argument.'),
      narration('The plan was less elegant than Daisy’s schedules and less direct than Misty’s. That was how they knew it belonged to all four of them.'),
    ]),

    scene('resolution', 'trial-day', 'Daisy’s Side of the Pool', 'Daisy accepts the role of opponent without turning the match into a family verdict.', theatre, [
      speech(steward, 'This trial determines whether Misty can direct a League challenge. It does not determine which sister values Cerulean Gym more.'),
      speech(daisy, 'Good. I would hate to settle that with a Seaking.'),
      speech(misty, 'You chose Seaking? You always say it splashes the lighting rig.'),
      speech(daisy, 'Today there is no lighting rig. You are not the only sister capable of adapting.'),
      speech(steward, 'Candidates ready. Begin when the water is still.'),
    ]),
    battle('resolution', 'daisys-challenge'),
    scene('resolution', 'the-cascade-licence', 'Leader of Cerulean Gym', 'Misty earns the role while Daisy retains a future that is not framed as defeat.', theatre, [
      speech(steward, 'Misty Waterflower, the League recognises your command, safety judgment and adaptive strategy. Cerulean Gym may open its challenge programme under your direction.'),
      speech(misty, 'And the performance licence?'),
      speech(steward, 'Unchanged. The League is licensing a Leader, not annexing a theatre.'),
      speech(daisy, 'Then you get the afternoon keys. I get mornings, sponsor dinners, and the right to complain when Onix chips the tiles.'),
      speech(misty, 'Only if I get the right to complain when your fountains flood my referee marks.'),
    ]),
    scene('resolution', 'opening-challenge', 'The First New Programme', 'The first challenger discovers that Cerulean’s performance history remains part of its battle identity.', theatre, [
      narration('The first official challenge began under the old stage lights. Platforms rose in an unfamiliar sequence, revealing currents that forced both trainers to reconsider their opening plans.'),
      speech(violet, 'Misty asked for three platform changes. Daisy designed seven.'),
      speech(lily, 'Daisy says subtlety is what happens between two dramatic ideas.'),
      speech(misty, 'Challenger, watch the reflections. The pool tells you what is moving before the surface does.'),
      speech(daisy, 'And on four, try not to battle the chandelier.'),
    ]),

    scene('reflection', 'two-posters', 'Two Honest Posters', 'Cerulean stops asking one image to explain everything it is.', theatre, [
      narration('Two posters appeared outside the Gym. One promised the Waterflower Sisters’ evening show. The other announced Cerulean Gym Challenges under Leader Misty. Neither poster called the other a special attraction.'),
      speech(misty, 'Your portrait is larger.'),
      speech(daisy, 'There are three of us on that poster.'),
      speech(misty, 'My Starmie is larger than my face. I approve.'),
      speech(violet, 'Astonishing. We found the exact distribution of attention that keeps this family peaceful.'),
    ]),
    scene('reflection', 'the-next-count', 'On Four', 'Misty returns to rehearsal by choice, carrying a different understanding of the count.', theatre, [
      speech(daisy, 'You are early. Your challenge block does not start until noon.'),
      speech(misty, 'I know. I want to fix the turn before Saturday. Starmie commits too soon and leaves Lily without enough water for the finish.'),
      speech(lily, 'Did our Gym Leader just choose the good of the ensemble?'),
      speech(misty, 'Do not make me regret it. From the top. On four, we move together.'),
      narration('The music began. Misty heard the opening a battle would offer, let it pass, and stayed with her sisters for the next count.'),
    ]),
  ],
}
