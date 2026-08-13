import type { KantoGymChronicleStory } from '../types'
import { battle, character, game, narration, scene, speech, trainer, local } from '../helpers'

const lab = '/backgrounds/chronicle-blaine-cinnabar-lab.avif'
const quiz = '/backgrounds/chronicle-blaine-abandoned-quiz-room.avif'
const blaine = character('Blaine', trainer('gym-kanto-blaine'))
const fuji = character('Dr Fuji', local('/sprites/trainers/special/fuji.avif'))
const nami = character('Nami', trainer('chronicle-nami'))
const orin = character('Orin', trainer('chronicle-orin'))
const steward = character('League Examiner', trainer('chronicle-steward'))

export const blaineChronicleStory: KantoGymChronicleStory = { sequence: [
  scene('backstory','the-first-question','What Is the Heat For?','Blaine, Fuji and Nami build a recovery lab around a shared principle.',lab,[
    narration('Cinnabar’s first recovery chamber was built for Fire Pokémon pulled half-frozen from winter seas. Blaine designed the heater, Nami designed the evacuation path, and Fuji asked the question they wrote above the door.'),
    speech(fuji,'What is the heat for?'),
    speech(blaine,'Restoring circulation without burning already-injured tissue.'),
    speech(nami,'And when that purpose is met?'),
    speech(blaine,'We stop. A machine that cannot answer when to stop is just an accident with a timetable.'),
  ]),
  scene('backstory','baseline-morning','Three Sets of Numbers','The team treats disagreement as part of the protocol.',lab,[
    speech(nami,'Ponyta’s pulse says the chamber can go two degrees higher. The wall sensor says one.'),
    speech(blaine,'Then one.'),
    speech(fuji,'Your model predicts two.'),
    speech(blaine,'My model does not have a pulse.'),
    speech(nami,'I am writing that down. He gets sensible when quoted.'),
    narration('Their protocols were slow, redundant, and hard to sell to investors. They worked.'),
  ]),
  game('backstory','compare-the-baselines'),
  scene('backstory','the-funded-wing','A Larger Question','League funding offers Blaine a Gym if the lab can demonstrate public value.',lab,[
    speech(steward,'Cinnabar needs a League facility. A Fire Gym attached to a recovery institute would justify the grant.'),
    speech(blaine,'Battles are not clinical trials.'),
    speech(steward,'No, but a Leader who teaches control could make this island a centre for safe Fire training.'),
    speech(nami,'The funding buys the second evacuation stair.'),
    speech(fuji,'It also buys expectations. Let us name which ones we refuse before we accept.'),
  ]),
  scene('backstory','one-more-degree','The Useful Exception','Blaine begins hiding small deviations that produce better results.',lab,[
    speech(blaine,'Growlithe’s recovery plateaued. I held one degree above protocol for forty seconds and the response improved.'),
    speech(nami,'Did you record the overrun?'),
    speech(blaine,'I recorded the response.'),
    speech(fuji,'Those are not the same record.'),
    speech(blaine,'The protocol exists to serve the patient, not to preserve its own purity.'),
  ]),

  scene('development','orins-demonstration','The Brilliant Young Researcher','Orin challenges the lab’s caution and recognises Blaine’s appetite for discovery.',lab,[
    speech(orin,'Your containment loses twelve percent efficiency because every technician can shut it down.'),
    speech(nami,'That is not a loss. That is twelve percent spent on surviving a technician’s mistake.'),
    speech(blaine,'Show me the automatic regulator.'),
    speech(fuji,'After he shows all of us the failure state.'),
    speech(orin,'You people ask the least exciting questions first.'),
    speech(nami,'That is why we are still around for the exciting ones.'),
  ]),
  battle('development','orins-demonstration'),
  scene('development','the-anomaly','A Result Worth Repeating','A Magmar produces a rare thermal response that could transform treatment.',lab,[
    narration('During Orin’s demonstration, Magmar’s body temperature synchronised with the chamber instead of fighting it. The effect could cut difficult recoveries from hours to minutes.'),
    speech(blaine,'Run it again at the same baseline.'),
    speech(nami,'Tomorrow. Magmar has completed its safe exposure.'),
    speech(orin,'The response might be gone after rest.'),
    speech(fuji,'Then we record that it is gone. Rarity does not create consent.'),
  ]),
  scene('development','the-hidden-override','A Switch Without a Label','Blaine installs a manual extension and tells himself it is only for emergencies.',lab,[
    speech(blaine,'The regulator shuts down before a clinician can tell stress from breakthrough. I added a sixty-second override.'),
    speech(nami,'Who authorised it?'),
    speech(blaine,'I am the lead researcher.'),
    speech(nami,'That answers who could hide it. It does not answer who reviewed it.'),
    speech(blaine,'You are reviewing it now.'),
  ]),
  scene('development','fuji-withdraws','The Protocol Divides','Fuji refuses to sign the public demonstration.',lab,[
    speech(fuji,'Remove the override or list it as an experimental hazard. I will not lend my name to a system whose stop condition changes when the result gets interesting.'),
    speech(blaine,'The League visit is in two days. If we cancel, the recovery wing loses its funding.'),
    speech(fuji,'Funding is not a patient. It does not become an emergency because we want it.'),
    speech(nami,'Delay the demonstration, Blaine.'),
  ]),

  scene('conflict','demonstration-day','One More Trial','Blaine proceeds, convinced preparation can substitute for independent consent.',lab,[
    narration('Fuji’s station stayed empty. Nami checked both exits and made Blaine repeat the shutdown order before the League observers came in.'),
    speech(nami,'At the first unstable split, I call stop. Not pause. Not evaluate. Stop.'),
    speech(blaine,'Agreed.'),
    speech(orin,'Magmar is calm. Baseline is clean.'),
    speech(steward,'Proceed when ready.'),
  ]),
  scene('conflict','the-rising-line','The Answer Blaine Wants','The rare response returns and begins to exceed its safe pattern.',lab,[
    speech(orin,'Synchronisation at eighty percent. Higher than last time.'),
    speech(nami,'Wall temperature is diverging. Stop.'),
    speech(blaine,'Magmar’s pulse is stable. Give it ten seconds.'),
    speech(nami,'That was not our agreement.'),
    speech(blaine,'Ten seconds could tell us whether the response corrects itself.'),
    narration('Blaine’s hand covered the override before he consciously decided to use it.'),
  ]),
  game('conflict','emergency-shutdown'),
  scene('conflict','the-failed-door','Nami’s Last Question','A warped fire door turns an avoidable overrun into a fatal evacuation.',lab,[
    narration('The chamber seal ruptured. Heat rolled into the corridor and bowed the new fire door against its frame. Nami stayed at the manual wheel while the others moved Magmar through the second exit.'),
    speech(nami,'What is the heat for, Blaine?'),
    speech(blaine,'Nami, leave the wheel.'),
    speech(nami,'Answer the question.'),
    speech(blaine,'Nothing now. It is for nothing. Shut it all down.'),
    narration('The corridor cleared. Nami did not. There was no spectacle in the memory, only the alarm continuing after everyone understood it was too late.'),
  ]),
  game('conflict','evacuate-the-lab'),
  scene('conflict','the-inquiry','Every Missing Line','The inquiry reconstructs the decisions Blaine omitted from the record.',quiz,[
    speech(steward,'The override was not in the submitted protocol. Dr Fuji’s objection was not there either. Nami’s stop order was not logged until after the rupture.'),
    speech(blaine,'I made those omissions.'),
    speech(orin,'I knew about the switch. I should share the blame.'),
    speech(blaine,'You did not override her stop.'),
    speech(steward,'That is not how responsibility works. We will examine every choice, not just yours.'),
  ]),
  scene('conflict','magmar-escapes','The Patient Left Behind','The injured Magmar flees into the abandoned wing during the shutdown.',lab,[
    narration('Magmar survived, burned along one arm. During transfer, an alarm sent it through the damaged seal and into the smoke-filled east wing.'),
    speech(orin,'Containment team is preparing sleep rounds.'),
    speech(blaine,'No projectiles in the smoke. It will strike toward the sound.'),
    speech(steward,'You are suspended from the site.'),
    speech(blaine,'Then Orin gives the commands. I can tell him what Magmar learned to fear.'),
  ]),
  battle('conflict','escaped-magmar'),
  scene('conflict','lab-closed','Cinnabar Without the Institute','The recovery programme closes and Blaine cannot argue that good work cancels the harm.',quiz,[
    speech(fuji,'The patients are being transferred. Staff are paid through the quarter.'),
    speech(blaine,'I can redesign the chamber.'),
    speech(fuji,'You can. Just not as a way to skip mourning or the inquiry.'),
    speech(blaine,'If I had listened, Nami would be here to redesign it with me.'),
    speech(fuji,'Yes.'),
    narration('Fuji did not soften it. Blaine was grateful, and hated him for it.'),
  ]),

  scene('contemplation','years-of-questions','The Abandoned Quiz Room','Blaine comes back to the empty Gym wing and writes the questions he should have asked.',quiz,[
    narration('The proposed Gym wing gathered dust. Blaine came back alone to write questions on its walls: Who can stop this? Who benefits if it continues? What evidence would make us abandon the result?'),
    speech(orin,'You have written the same question twelve ways.'),
    speech(blaine,'Then maybe one version reaches me before curiosity does.'),
    speech(orin,'The League is considering a new application.'),
    speech(blaine,'They should not.'),
  ]),
  scene('contemplation','fujis-condition','Repair Is Not Erasure','Fuji agrees to advise only if the new institution keeps the failure visible.',quiz,[
    speech(fuji,'Do not name the room after Nami. Institutions like turning the dead into permission to continue.'),
    speech(blaine,'Then what do we preserve?'),
    speech(fuji,'Her authority. Any trainer, technician, or Pokémon handler can end a trial. No override.'),
    speech(blaine,'And the warped door?'),
    speech(fuji,'Leave it behind glass. Not as punishment. As evidence.'),
  ]),
  scene('contemplation','magmars-choice','The Patient Returns','Magmar’s willingness becomes the test Blaine cannot manipulate.',lab,[
    narration('Magmar came back to the rebuilt chamber but stopped at the threshold. Blaine sat outside with the controls powered down.'),
    speech(orin,'We could run the assessment with Rapidash.'),
    speech(blaine,'Magmar is not an exam component. If it never enters, the system still has to deserve approval.'),
    narration('After an hour, Magmar put one foot across the line, then left. Blaine recorded both movements.'),
  ]),

  scene('resolution','conditional-assessment','The Last Question','The League assesses a Gym designed to stop itself.',quiz,[
    speech(steward,'Your suspension is over. That does not entitle you to a licence.'),
    speech(blaine,'I understand.'),
    speech(steward,'During this assessment, Orin may halt the match. Fuji may halt the chamber. Your Pokémon may refuse an exercise.'),
    speech(blaine,'And I may halt it before any of them has to.'),
    speech(fuji,'That is the answer we are testing.'),
  ]),
  battle('resolution','league-assessment'),
  scene('resolution','volcano-licence','Leader of Cinnabar Gym','Blaine receives a licence that names his failure rather than forgiving it.',quiz,[
    speech(steward,'Cinnabar Gym is licensed for one year under independent safety review. The inquiry stays attached to the public record.'),
    speech(blaine,'Good.'),
    speech(orin,'You could sound a little happier.'),
    speech(blaine,'I am. I have learned not to treat a good result as proof of a sound process.'),
    speech(fuji,'That almost sounds like wisdom. We will test it again tomorrow.'),
  ]),
  scene('resolution','first-quiz','Questions Before Fire','The Gym’s first challenge begins with permission to stop.',quiz,[
    speech(blaine,'First question: if your Pokémon can take more heat, should it?'),
    speech(orin,'There is no single right answer.'),
    speech(blaine,'Exactly. A quiz that only rewards certainty teaches the wrong reflex.'),
    narration('Behind the glass, the warped fire door stayed visibly jammed. Nobody called it inspiring.'),
  ]),

  scene('reflection','the-empty-station','Nami’s Place','Blaine does not fill the absence with a cleaner story.',lab,[
    speech(orin,'We could move the monitoring desk. Staff avoid the empty station.'),
    speech(blaine,'Ask them. Do not keep discomfort around on my behalf.'),
    speech(fuji,'Nami would have complained that the station blocks the second exit.'),
    speech(blaine,'She did complain. I have the note.'),
    narration('They moved the desk. The absence stayed, without becoming an altar.'),
  ]),
  scene('reflection','when-the-answer-is-stop','The Work After Knowing','The rare response returns during an ordinary recovery, and Blaine stops the chamber anyway.',lab,[
    narration('Months later, Magmar’s rare response returned during an ordinary recovery. The curve climbed cleanly toward the discovery Blaine had once wanted more than caution.'),
    speech(orin,'Wall temperature diverging.'),
    speech(blaine,'Stop the chamber.'),
    speech(orin,'Magmar’s pulse is stable.'),
    speech(blaine,'I heard you. Stop the chamber.'),
    narration('The line vanished from the monitor. Blaine felt the unanswered question leave with it, and let it go.'),
  ]),
] }
