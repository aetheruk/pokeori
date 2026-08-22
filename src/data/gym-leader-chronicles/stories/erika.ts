import type { KantoGymChronicleStory } from '../types'
import { battle, character, game, narration, scene, speech, trainer } from '../helpers'

const greenhouse = '/backgrounds/chronicle-erika-greenhouse.avif'
const exhibition = '/backgrounds/chronicle-erika-flower-exhibition.avif'
const warehouse = '/backgrounds/chronicle-erika-dye-warehouse.avif'

const erika = character('Erika', trainer('gym-kanto-erika'))
const mother = character("Erika's Mother", trainer('chronicle-erika-mother'))
const sumi = character('Sumi', trainer('chronicle-sumi'))
const celia = character('Celia', trainer('chronicle-celia'))
const steward = character('Exhibition Steward', trainer('chronicle-steward'))

export const erikaChronicleStory: KantoGymChronicleStory = {
  sequence: [
    scene('backstory', 'the-calling-card', 'A Proper Future', 'Erika\'s family prepares to present her as Celadon\'s ideal young patron.', exhibition, [
      narration('By sixteen, Erika could enter any drawing room in Celadon and know which flower had been chosen to flatter its owner. Her mother considered this an education; Erika experienced it as a language in which every sentence had already been written.'),
      speech(mother, 'The exhibition committee will announce your patronage after the opening arrangement. Stand beside the Bellossom screen and say how honoured you are.'),
      speech(erika, 'Am I honoured?'),
      speech(mother, 'You will be when you understand what the appointment protects. Our family makes space for beautiful things.'),
      speech(erika, 'And if I do not want to stand there?'),
    ]),
    scene('backstory', 'sumis-bench', 'The Greenhouse Before Guests', 'Erika finds freedom in Sumi\'s working greenhouse, where plants are allowed to be useful.', greenhouse, [
      speech(sumi, 'This batch is not elegant. Gloom\'s pollen makes the opening sharp, but it settles into something warmer after ten minutes.'),
      speech(erika, 'It is sharp at first, but it warms up after a few minutes. I like that it takes time.'),
      speech(sumi, 'Your mother will ask for roses.'),
      speech(erika, 'My mother only likes roses that behave. Show me the measurements again.'),
      narration('At Sumi\'s bench, Erika\'s careful hands were not decorative. They weighed, crushed, filtered and recorded.'),
    ]),
    game('backstory', 'prepare-sumis-fragrance'),
    scene('backstory', 'a-name-on-the-label', 'Sumi\'s Formula', 'Erika insists that the work carry its creator\'s name.', greenhouse, [
      speech(sumi, 'The exhibition label should say House Tamamushi. It will be accepted more easily.'),
      speech(erika, 'It should say Sumi Arai. You made the first extract and corrected my steeping time.'),
      speech(sumi, 'I am employed by your family. Acceptance is part of how I remain employed.'),
      speech(erika, 'Then I will explain it to Mother.'),
      speech(sumi, 'You say that as if explanations are the difficulty.'),
    ]),
    scene('backstory', 'the-rehearsed-answer', 'How to Be Gracious', 'Erika\'s mother teaches her to turn disagreement into polished silence.', exhibition, [
      speech(mother, 'When Celia remarks on the scent, thank her. When the steward asks who developed it, say our greenhouse. Never burden a public occasion with workshop detail.'),
      speech(erika, 'Sumi is not workshop detail.'),
      speech(mother, 'Of course not. She is valued staff. Valued staff do not need society guests examining their private history.'),
      speech(erika, 'You make concealment sound like kindness.'),
      speech(mother, 'Making a public fuss about it will only embarrass her and make a spectacle of yourself.'),
    ]),

    scene('development', 'celias-arrival', 'The Rival Arrangement', 'Celia arrives expecting a social contest and recognises Erika\'s real interest.', exhibition, [
      speech(celia, 'Your mother told mine we are to represent two traditions in friendly contrast. That means she expects me to lose beautifully.'),
      speech(erika, 'Mine expects me to win without appearing to compete.'),
      speech(celia, 'How exhausting for both of us. Is that the fragrance? It is far too interesting to have come from the committee.'),
      speech(erika, 'Sumi developed it. I helped refine the last notes.'),
      speech(celia, 'Then put that on the programme before someone wealthier discovers she invented it.'),
    ]),
    game('development', 'identify-the-notes'),
    scene('development', 'the-programme-proof', 'A Small Correction', 'Erika changes the programme and believes the written name will be enough.', exhibition, [
      narration('Erika crossed out House Tamamushi in the printer\'s proof and wrote Sumi Arai beneath the fragrance title. The correction looked small enough to survive unnoticed.'),
      speech(steward, 'Your mother approved the first wording.'),
      speech(erika, 'The first wording was inaccurate.'),
      speech(steward, 'Accuracy is rarely the only consideration at an exhibition.'),
      speech(erika, 'That does not make it accurate.'),
    ]),
    scene('development', 'the-gym-proposal', 'A Public Garden', 'The League invites Erika\'s family to sponsor a Gym and assumes she will lead it.', greenhouse, [
      speech(steward, 'Celadon needs a licensed Gym. Your family owns the garden site and funds the horticultural society. The committee believes Erika would be an elegant candidate.'),
      speech(mother, 'She would be delighted.'),
      speech(erika, 'You have not asked whether I want to be a Gym Leader.'),
      speech(mother, 'You train every morning and lecture guests about plant care. That could turn an odd habit into real standing.'),
      speech(sumi, 'It might also give her authority over what the garden teaches.'),
    ]),
    scene('development', 'celias-challenge', 'An Acceptable Spectacle', 'Celia proposes a battle that can prove Erika\'s skill in terms the committee understands.', exhibition, [
      speech(celia, 'The committee thinks you are a flower arrangement with a family name. Battle me during the exhibition.'),
      speech(erika, 'Public combat beside rare orchids sounds like a poor horticultural decision.'),
      speech(celia, 'Then design it carefully. Show them the patience, conditions and restraint Grass Pokemon require.'),
      speech(mother, 'A friendly demonstration would be charming. Celia\'s loss would reassure the League without looking ambitious.'),
      speech(celia, 'There it is. Your mother has managed to insult us both while approving.'),
    ]),

    scene('conflict', 'the-stolen-credit', 'House Tamamushi No. 4', 'Erika discovers her correction has been removed and Sumi\'s work absorbed into the family name.', exhibition, [
      narration('On opening morning, crystal bottles lined the central table. Their labels read House Tamamushi No. 4. Sumi\'s name appeared nowhere in the hall.'),
      speech(erika, 'I corrected the programme.'),
      speech(mother, 'And I corrected an impulsive breach of discretion. Guests are buying the family edition. Sumi will receive a private bonus.'),
      speech(sumi, 'Lady Tamamushi has been generous.'),
      speech(erika, 'That is not what we agreed.'),
      speech(mother, 'Do not force an employee to contradict me in public.'),
    ]),
    scene('conflict', 'celia-speaks', 'The Question Asked Aloud', 'Celia publicly credits Sumi, forcing Erika toward the statement she has rehearsed avoiding.', exhibition, [
      speech(celia, 'This is Sumi Arai\'s fragrance, is it not? Erika described her method to me yesterday.'),
      speech(steward, 'The programme attributes the edition to House Tamamushi.'),
      speech(celia, 'A house did not bruise petals, correct the carrier oil or discover the settling note.'),
      speech(mother, 'Celia, friendly rivalry need not become vulgar.'),
      speech(celia, 'Erika can settle it. Tell them whose work is in the bottle.'),
    ]),
    scene('conflict', 'the-silence', 'A Graceful Answer', 'Erika sees the cost of speaking and chooses a polished answer that protects the occasion.', exhibition, [
      narration('Erika looked first at Sumi, then at her mother. Sumi\'s hands were folded so tightly that one thumb had gone white. Behind them, buyers waited with pens above order cards.'),
      speech(mother, 'Erika?'),
      speech(erika, 'Our greenhouse is fortunate to contain many talented hands. Today\'s edition reflects a shared tradition.'),
      speech(celia, 'That is not an answer.'),
      speech(erika, 'It is the answer this room will accept.'),
    ]),
    battle('conflict', 'exhibition-rival'),
    scene('conflict', 'the-applause', 'Beautiful Restraint', 'Erika wins the battle and is praised for the same silence that diminishes Sumi.', exhibition, [
      narration('Erika\'s Tangela waited through Celia\'s opening pressure, changed the field with powder and closed the match without touching the display beds. The applause arrived warm and immediate.'),
      speech(steward, 'Extraordinary restraint. The League could ask for no finer temperament in Celadon\'s Leader.'),
      speech(celia, 'They watched you say exactly what you meant with your Pokemon. Then they applauded you for saying nothing with your own voice.'),
      speech(erika, 'You think I do not know that?'),
      speech(celia, 'I think you know exactly what you are doing, and I think that is the problem.'),
    ]),
    scene('conflict', 'the-warehouse-threat', 'What the Family Protects', 'Erika learns why Sumi asked her not to speak.', warehouse, [
      speech(sumi, 'My brother\'s dye workshop rents this building from your uncle. Your mother reminded me the lease is reviewed next month.'),
      speech(erika, 'She threatened your family because I changed a label.'),
      speech(sumi, 'She described the network of obligations that keeps us all comfortable. No threat needed to be stated.'),
      speech(erika, 'I can refuse the Gym appointment.'),
      speech(sumi, 'And then someone equally well connected accepts it. Please do not turn my name into the reason you surrender every place you might one day change.'),
    ]),
    scene('conflict', 'mothers-terms', 'The Price of the Garden', 'The Gym land is offered on terms that make Erika\'s status both leverage and restraint.', greenhouse, [
      speech(mother, 'The family will donate the garden if you accept the appointment. Sumi keeps her position. The workshop lease remains favourable.'),
      speech(erika, 'And the fragrance?'),
      speech(mother, 'House Tamamushi owns work commissioned in its greenhouse.'),
      speech(erika, 'You are making a Gym out of the same arrangement.'),
      speech(mother, 'I am giving you influence. Refusing it to preserve your innocence would help nobody beneath you.'),
    ]),

    scene('contemplation', 'among-closed-flowers', 'What Silence Preserves', 'Erika weighs which cost she can live with.', greenhouse, [
      narration('At dusk, the greenhouse flowers closed without an audience. Erika stood in the dark for a while and did not reach a good answer.'),
      speech(erika, 'If I speak, Sumi pays first. If I do not, Mother learns the threat works.'),
      speech(sumi, 'Then either choice is going to cost someone. You just get to pick who.'),
      speech(erika, 'Celia would speak.'),
      speech(sumi, 'Celia can afford to cause a scene. Her family does not rent from yours.'),
    ]),
    scene('contemplation', 'celias-farewell', 'No Easy Acquittal', 'Celia refuses to condemn Erika, but also refuses to call her helpless.', exhibition, [
      speech(celia, 'I was unfair to ask for heroism while Sumi stood in the blast line.'),
      speech(erika, 'You were right that I hid inside a graceful answer.'),
      speech(celia, 'Both can be true. I do not need you to be wicked to be disappointed in you.'),
      speech(erika, 'Will you testify for my League appointment?'),
      speech(celia, 'Yes. You are the best trainer for it. I will also tell them exactly what happened here.'),
    ]),
    scene('contemplation', 'the-private-label', 'A Name Beneath the Drawer', 'Erika records the truth where it cannot yet alter the public story.', greenhouse, [
      narration('Erika wrote Sumi Arai, Formula Four in the greenhouse ledger and sealed a copy of the method beneath the specimen drawer. It was not justice. Its smallness made her ashamed, which was why she refused to call it enough.'),
      speech(sumi, 'One day the label may be safe to show.'),
      speech(erika, 'If that day ever comes.'),
      speech(sumi, 'Then keep the promise where you must look at it while you work.'),
      speech(erika, 'I can do that. I wish I had done more.'),
    ]),

    scene('resolution', 'the-league-table', 'A Candidate With Conditions', 'Erika accepts the assessment without pretending the opportunity was freely chosen.', exhibition, [
      speech(steward, 'Your battle demonstration was exceptional. Your family\'s garden meets every requirement. Do you accept nomination as Celadon Gym Leader?'),
      speech(erika, 'I accept, with employment contracts for greenhouse staff independent of my family\'s household and published attribution for future Gym research.'),
      speech(mother, 'Those details can be discussed privately.'),
      speech(erika, 'Then my acceptance can also be discussed privately.'),
      speech(steward, 'The League will put the conditions in writing.'),
    ]),
    battle('resolution', 'league-steward'),
    scene('resolution', 'the-rainbow-key', 'Leader of Celadon Gym', 'Erika gains authority through the status that constrained her.', greenhouse, [
      speech(steward, 'The Rainbow licence is granted. Your methods showed patience without passivity and control without needless force.'),
      speech(erika, 'Those distinctions are easier in battle.'),
      speech(mother, 'You represented the family beautifully.'),
      speech(erika, 'I represented the Gym. That is who I am now.'),
      narration('Her mother smiled for the photographers. Erika smiled too. Neither expression resolved the sentence between them.'),
    ]),
    scene('resolution', 'sumis-contract', 'What Changes on Paper', 'The new contract protects Sumi\'s future work but cannot repair the exhibition.', greenhouse, [
      speech(sumi, 'The League contract names me chief horticultural technician. My formulas remain mine unless I assign them.'),
      speech(erika, 'Formula Four is excluded. Mother would not yield it.'),
      speech(sumi, 'I know.'),
      speech(erika, 'I need you to know I did not decide that was acceptable.'),
      speech(sumi, 'Then stop dwelling on the one we lost and build the next one properly.'),
    ]),

    scene('reflection', 'the-hidden-bottle', 'The Unspoken Bloom', 'Erika keeps the original formula as a private reminder of what her composure cost.', greenhouse, [
      narration('Years later, a plain bottle remained in the locked specimen drawer. Its paper label had yellowed around Sumi\'s name. Erika never displayed it at the Gym and never allowed House Tamamushi No. 4 to be used there.'),
      speech(celia, 'You could tell the story now. Your position is secure.'),
      speech(erika, 'Sumi\'s brother still leases the warehouse. My position is secure because the same web remains.'),
      speech(celia, 'So you will wait again.'),
      speech(erika, 'Yes. I am not asking you to find that admirable.'),
    ]),
    scene('reflection', 'after-closing', 'A Garden That Remembers', 'The memory ends without granting Erika the courage she did not choose.', greenhouse, [
      narration('After closing, Erika checked each bench and wrote every assistant\'s name beside the work completed that day. The practice became ordinary enough that nobody called it reform.'),
      speech(sumi, 'The night-blooming cereus may open tomorrow.'),
      speech(erika, 'Will anyone be here to see it?'),
      speech(sumi, 'It will open whether we are here or not.'),
      narration('Erika turned off the public lights but left one lamp above the specimen drawer. She had become a Leader. She had not become free.'),
    ]),
  ],
}
