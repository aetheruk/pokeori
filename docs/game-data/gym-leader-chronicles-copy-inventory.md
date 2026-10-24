# Kanto Gym Leader Chronicles: Current Copy Inventory

> Working reference for the planned Chronicle rewrite. Copy is transcribed from the current authored data and ordered by Kanto badge progression. Source identifiers are retained so revised lines can be mapped back to the game.

## Shared interaction copy

- Memory marker title pattern: `{Leader}'s Badge Memory`.
- Memory marker description pattern: `The {Badge} has opened a memory from {Leader}'s past.`
- Scene action button: `Enter the Scene`.
- Scene enter-modal button: `Continue` on each intermediate panel; `Continue the Memory` on the final panel.
- Scene exit modal: none is authored on Chronicle scene tasks.
- Battle win and loss lines below are the exact resolved dialogue shown by the battle system for each authored Chronicle battle. Trainer battles use their story or trainer-class dialogue; wild battles show no trainer result line.
- Chronicle expeditions have no separately authored enter/exit modal copy. Their entry button is listed with each Chronicle below.

## Contents
- [Brock: The Empty Chair](#brock-the-empty-chair)
- [Misty: Out of Step](#misty-out-of-step)
- [Lt. Surge: After the Thunder](#lt-surge-after-the-thunder)
- [Erika: The Unspoken Bloom](#erika-the-unspoken-bloom)
- [Koga: The Unwritten Path](#koga-the-unwritten-path)
- [Sabrina: The Quiet Room](#sabrina-the-quiet-room)
- [Blaine: The Last Question](#blaine-the-last-question)
- [Giovanni: Dinner at Eight](#giovanni-dinner-at-eight)

## Brock: The Absent Father

- Badge: Boulder Badge
- Chronicle player title: Pewter's Eldest Son
- Memory marker ID: `boulder-badge-memory-revealed`
- Memory marker title: Brock's Badge Memory
- Memory marker description: The Boulder Badge has opened a memory from Brock's past.
- Expedition ID: `brock-boulder-badge-chronicle`
- Expedition title: Brock: The Absent Father
- Expedition description: Step into the memory held by the Boulder Badge and witness the choices that shaped Brock.
- Expedition button: Enter the Memory

### Ordered story and activity copy

#### 1. Scene: Space at the Table

- Activity ID: `chronicle-v2-brock-the-cold-plate`
- Phase: Backstory
- Description: Brock begins another morning making up for his Father's shortcomings.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Before sunrise, the Harrison kitchen was already full of energy but a ”<br>
     Button: Continue
  2. **Forrest:** “Dad missed dinner and breakfast. Is he really working the quarry, or is that just what we are telling the little ones?”<br>
     Button: Continue
  3. **Brock:** “He left enough Gym work for three people. That part I can answer before school.”<br>
     Button: Continue
  4. **Forrest:** “That is not what I asked. You never answer what I ask.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 2. Scene: The Morning List

- Activity ID: `chronicle-v2-brock-a-house-in-motion`
- Phase: Backstory
- Description: The household runs because Brock has memorised every need and told nobody what it costs.
- Scene action button: Enter the Scene
- Enter modal:

  1. **The Twins:** “We cannot find the blue bag. We found two green bags and a Geodude, and he says neither one belongs to him.”<br>
     Button: Continue
  2. **Brock:** “Forrest, check under the bench. Twins, sit down and eat. I have medicine, lunches, the stove, and the Gym keys.”<br>
     Button: Continue
  3. **Forrest:** “That is four jobs after you gave me one. Give me another.”<br>
     Button: Continue
  4. **Brock:** “You have school.”<br>
     Button: Continue
  5. **Forrest:** “So do you, technically.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 3. Game: Share the Morning

- Activity ID: `chronicle-v2-brock-share-the-morning`
- Phase: Backstory
- Description: Put the Harrison household morning in a safe order without pretending Brock can do every job alone.
- Activity labels:
  - Wake Forrest
  - Check the medicine
  - Heat breakfast
  - Serve breakfast
  - Feed Geodude
  - Check the school bags
  - Pack the lunches
  - Send everyone to school
- Chronicle-specific enter/exit modal copy: none authored; the shared game screen supplies its controls.

#### 4. Scene: No Return Date

- Activity ID: `chronicle-v2-brock-the-sugar-bowl`
- Phase: Backstory
- Description: Forrest finds the note Brock has hidden beneath the sugar bowl.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “When the last kid finally went out the door, Brock lifted the sugar bowl. Flint's note was folded into quarters underneath it, soft at the creases from being read too many times.”<br>
     Button: Continue
  2. **Forrest:** “I came back for the blue bag. Is that from Dad?”<br>
     Button: Continue
  3. **Brock:** “It says he needs time. It does not say where he went or when he is coming back.”<br>
     Button: Continue
  4. **Forrest:** “Then why did you tell everyone Thursday?”<br>
     Button: Continue
  5. **Brock:** “Because Thursday was close enough for them to sleep. I thought I would have a better answer by then.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 5. Scene: The Other Empty Room

- Activity ID: `chronicle-v2-brock-onix-does-not-eat`
- Phase: Backstory
- Description: At Pewter Gym, Onix waits beside Flint's vacant chair and refuses food.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “The Gym smelled of cold dust. A crack ran from the upper viewing rail down to the battle floor. Onix had pushed his food dish next to Flint's chair and left it there.”<br>
     Button: Continue
  2. **Forrest:** “He knows. You can tell people whatever you like, but Onix knows Dad left.”<br>
     Button: Continue
  3. **Brock:** “Then help me move the dish. The League inspector gets here at ten.”<br>
     Button: Continue
  4. **Forrest:** “What happens when she asks who the Leader is?”<br>
     Button: Continue
  5. **Brock:** “I stand in the ring and make sure she does not have to ask twice.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 6. Scene: A Provisional Answer

- Activity ID: `chronicle-v2-brock-mara-at-the-door`
- Phase: Development
- Description: Mara finds a capable young trainer inside an unsafe Gym.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Mara:** “I came to inspect a licensed Gym. I found a minor holding its keys, a damaged west wall, and no responsible adult on the premises.”<br>
     Button: Continue
  2. **Brock:** “You found the person doing the work. I can show you the team, the challenge rules, and every repair still outstanding.”<br>
     Button: Continue
  3. **Mara:** “You might be doing the work, Brock, but you are still a kid. And enthusiasm does not hold up a cracked wall.”<br>
     Button: Continue
  4. **Brock:** “Then give me the provisional assessment. If I fail it, close the Gym. If I pass, judge the building after I fix it.”<br>
     Button: Continue
  5. **Mara:** “Thirty days. A safe floor, a real household plan, and a battle assessment. I will not bend one of those just because I admire the others.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 7. Scene: A Different Future

- Activity ID: `chronicle-v2-brock-the-letter-in-the-ledger`
- Phase: Development
- Description: Brock's breeding-course offer sits unread beside the Gym accounts.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “The League annex kept copies of every application. Mara handed Brock a letter he had sent months earlier: admission to a Pokemon breeding programme in Celadon, starting in six weeks.”<br>
     Button: Continue
  2. **Mara:** “You applied before your father left. Do you still want this?”<br>
     Button: Continue
  3. **Brock:** “It does not matter what I want. I have to make breakfast every morning, and I cannot take care of five kids from Celadon.”<br>
     Button: Continue
  4. **Mara:** “That is what you have to do. I asked what you want.”<br>
     Button: Continue
  5. **Brock:** “Right now, what I want is to keep this family fed and under a roof.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 8. Scene: The Promised Challenger

- Activity ID: `chronicle-v2-brock-taro-kept-his-ticket`
- Phase: Development
- Description: Taro arrives with a challenge booking Flint accepted before leaving.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Taro:** “My ticket says today. Mum paid for the train twice because Mr Flint cancelled the first time.”<br>
     Button: Continue
  2. **Brock:** “The floor is marked safe inside the white line. We can battle there.”<br>
     Button: Continue
  3. **Mara:** “No. The inspection is not finished.”<br>
     Button: Continue
  4. **Taro:** “I do not need a Badge if the Gym is closed. I just need somebody to stop acting like my challenge never mattered.”<br>
     Button: Continue
  5. **Brock:** “It mattered. I will take responsibility for saying yes.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 9. Scene: Inside the White Line

- Activity ID: `chronicle-v2-brock-before-the-first-command`
- Phase: Development
- Description: Brock enters the ring knowing that winning is not the only thing being judged.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Forrest:** “The high crack moved when Onix came through the door.”<br>
     Button: Continue
  2. **Brock:** “Keep everyone behind the rail. If I call stop, you clear the room before you ask why.”<br>
     Button: Continue
  3. **Mara:** “A Leader may end a challenge for safety. That is not surrender.”<br>
     Button: Continue
  4. **Brock:** “Understood. Taro, we battle to two conscious Pokemon. No attacks toward the west wall.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 10. Battle: Taro's Challenge

- Activity ID: `chronicle-v2-brock-first-challenger`
- Phase: Development
- Description: Keep a first official challenge safe on a floor neither trainer can take for granted.
- Win text: Player wins: “Aw, I nearly had you! I’m going to train until my team can keep up all the way to the next town.”
- Loss text: Player loses: “That was close, but I got you this time! I’m going to train even harder before our rematch.”

#### 11. Scene: The Wall Answers

- Activity ID: `chronicle-v2-brock-stone-dust`
- Phase: Development
- Description: The battle ends with Onix holding up the building instead of celebrating the result.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Taro's last command hit the floor. The west brace split with a sound too small for the weight above it. Onix crossed the ring before Brock spoke and pressed his body under the falling beam.”<br>
     Button: Continue
  2. **Brock:** “Battle over. Forrest, clear the rail. Taro, take Geodude and do not run under the beam.”<br>
     Button: Continue
  3. **Mara:** “Everyone outside. This Gym is closed as of now.”<br>
     Button: Continue
  4. **Brock:** “Onix is still inside.”<br>
     Button: Continue
  5. **Mara:** “Then we get him out together. You are not becoming the second person trapped in there.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 12. Scene: A Door With No Badge

- Activity ID: `chronicle-v2-brock-the-closure-notice`
- Phase: Conflict
- Description: The closure notice makes Brock's private crisis public.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “By evening, an ochre League notice covered the Gym schedule. Parents crossed the road to read it. Brock scrubbed stone dust off Onix while every whisper outside came through the broken wall.”<br>
     Button: Continue
  2. **Forrest:** “The twins heard someone say Dad ran away because the Gym was failing.”<br>
     Button: Continue
  3. **Brock:** “I will talk to them after I get Onix settled.”<br>
     Button: Continue
  4. **Forrest:** “You said that about the note. You said it about school. You keep putting us after the next emergency.”<br>
     Button: Continue
  5. **Brock:** “I know. I am trying to get ahead of it.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 13. Scene: The Letter Opens

- Activity ID: `chronicle-v2-brock-forrest-finds-the-course`
- Phase: Conflict
- Description: Forrest discovers what Brock has silently decided to surrender.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Forrest:** “This says they chose you. It says you could study breeding with people who know more than a kitchen full of injured Geodude.”<br>
     Button: Continue
  2. **Brock:** “Put it back.”<br>
     Button: Continue
  3. **Forrest:** “Did you tell them no?”<br>
     Button: Continue
  4. **Brock:** “I did not answer.”<br>
     Button: Continue
  5. **Forrest:** “If you ignore the letter, they give the spot to someone else. You are just letting it slip away.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 14. Scene: The Key in Flint's Hand

- Activity ID: `chronicle-v2-brock-flint-returns`
- Phase: Conflict
- Description: Flint returns expecting absence to be repaired by his presence.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Flint came back after dark, quarry dust on his coat and the old Gym key in his palm. The youngest kids reached him first. Brock stayed by the stove.”<br>
     Button: Continue
  2. **Flint:** “I heard about the wall. I should have been here. I can take the Gym back tomorrow and square things with the inspector.”<br>
     Button: Continue
  3. **Brock:** “You cannot just square things. You cannot walk back in and take over like nothing happened the second things get tough.”<br>
     Button: Continue
  4. **Flint:** “I failed on the circuit. I could not come home and watch all of you see that.”<br>
     Button: Continue
  5. **Forrest:** “So you made Brock do all of it instead.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 15. Scene: What Flint Left

- Activity ID: `chronicle-v2-brock-not-an-apology-yet`
- Phase: Conflict
- Description: Brock refuses the easy restoration Flint offers.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Flint:** “I am sorry. Give me the keys and I will put this right.”<br>
     Button: Continue
  2. **Brock:** “You are sorry now because the wall came down. Where was that when you walked out and left that note?”<br>
     Button: Continue
  3. **Flint:** “What do you want me to do?”<br>
     Button: Continue
  4. **Brock:** “Tonight? Do the dishes. Tomorrow, tell every kid where you went. Then show up the day after that. The keys stay with Mara until the assessment.”<br>
     Button: Continue
  5. **Forrest:** “And Brock answers Celadon before anything else gets to decide for him.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 16. Scene: Stone Is Not Free

- Activity ID: `chronicle-v2-brock-the-quarry-price`
- Phase: Conflict
- Description: The quarry foreman will donate stone only if the family can safely move it.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “The quarry had the right stone and no spare cart. Brock was counting how many pieces he could carry alone when Flint quietly put his shoulder under the first block.”<br>
     Button: Continue
  2. **Flint:** “You do not have to trust me with the Gym. Trust me with one end of this.”<br>
     Button: Continue
  3. **Brock:** “Forrest marks the route. The twins stay outside the cutting line. Nobody improvises around a suspended stone.”<br>
     Button: Continue
  4. **Forrest:** “That almost sounded like a plan for more than one person.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 17. Game: Bring Home the Stone

- Activity ID: `chronicle-v2-brock-bring-home-the-stone`
- Phase: Conflict
- Description: Guide replacement stone through the quarry without cracking it against the old barriers.
- Chronicle-specific enter/exit modal copy: none authored; the shared game screen supplies its controls.

#### 18. Scene: The Work Is Named

- Activity ID: `chronicle-v2-brock-repair-lines`
- Phase: Conflict
- Description: The family repairs the Gym by making every responsibility visible.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Brock:** “Flint takes the upper brace with the foreman. Forrest checks the floor marks. I clear the fractured stone with Geodude.”<br>
     Button: Continue
  2. **Forrest:** “And after this, breakfast rotates. I wrote it down before you could argue.”<br>
     Button: Continue
  3. **Flint:** “Put me on every early shift.”<br>
     Button: Continue
  4. **Brock:** “No. Put yourself on the shifts you can actually keep. We have had enough promises made at full volume.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 19. Game: Repair the Gym Wall

- Activity ID: `chronicle-v2-brock-repair-the-gym-wall`
- Phase: Conflict
- Description: Clear the crumbling stone and rebuild the wall before the next League inspection.
- Chronicle-specific enter/exit modal copy: none authored; the shared game screen supplies its controls.

#### 20. Scene: A Scar in the Stone

- Activity ID: `chronicle-v2-brock-the-repaired-line`
- Phase: Conflict
- Description: The wall is safe, but Brock chooses not to hide where it failed.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “New stone crossed the old fracture in a pale diagonal. Brock refused the plaster that would have hidden it. Onix ate beside the repaired wall, watching Flint from across the room.”<br>
     Button: Continue
  2. **Mara:** “The load test passes. That scar will draw questions.”<br>
     Button: Continue
  3. **Brock:** “Good. A challenger should know this building can fail and still be made safe.”<br>
     Button: Continue
  4. **Mara:** “Your household plan?”<br>
     Button: Continue
  5. **Forrest:** “Signed by everyone. Including the part where Brock is not allowed to volunteer for an empty space.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 21. Scene: The Life Beyond Pewter

- Activity ID: `chronicle-v2-brock-under-the-quarry-sky`
- Phase: Contemplation
- Description: Brock admits that staying and wanting to leave can both be true at once.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Brock:** “When I read the course letter, I can see the nursery rooms. I can almost smell the clean bandages. Then I picture this kitchen without me, and the whole thing feels selfish.”<br>
     Button: Continue
  2. **Forrest:** “You taught us how to do every job around here. We would manage. You do not have to carry us forever.”<br>
     Button: Continue
  3. **Brock:** “You should not have to become me because I leave.”<br>
     Button: Continue
  4. **Forrest:** “Then do not leave like Dad did. Tell us where. Tell us when. Come back when you said you would.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 22. Scene: A Father Without the Chair

- Activity ID: `chronicle-v2-brock-flint-at-the-table`
- Phase: Contemplation
- Description: Flint accepts that helping does not restore his authority.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Flint:** “Mara says the League might license you. I thought I would feel replaced.”<br>
     Button: Continue
  2. **Brock:** “Are you asking me to make you feel better about it?”<br>
     Button: Continue
  3. **Flint:** “No. I am trying to notice when I do that. I can fix the roof and take the little ones to school. I do not need the chair back to do that.”<br>
     Button: Continue
  4. **Brock:** “Then show up for the early shifts you said you would.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 23. Scene: Not No

- Activity ID: `chronicle-v2-brock-the-deferral-call`
- Phase: Contemplation
- Description: Brock asks the breeding programme for time instead of surrendering his place.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Brock made the call from Mara's office because the kitchen was too loud and the Gym too quiet. He expected the programme director to say no.”<br>
     Button: Continue
  2. **Brock:** “I am not declining. I am asking to defer one term while I set up a safe Gym rota and train a deputy.”<br>
     Button: Continue
  3. **Mara:** “Say the next part.”<br>
     Button: Continue
  4. **Brock:** “I still want the place.”<br>
     Button: Continue
  5. **Narration:** “The answer was not guaranteed, but it was an answer Brock had chosen before circumstances chose it for him.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 24. Scene: The Assessment Begins

- Activity ID: `chronicle-v2-brock-mara-returns`
- Phase: Resolution
- Description: Mara inspects not only Brock's team but the structure around him.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Mara:** “The wall is safe. The household plan has names beside every duty. Flint is present as a guardian, not as acting Leader. Now I need to see what kind of challenge you plan to run.”<br>
     Button: Continue
  2. **Brock:** “One that tests patience before force. One where stopping for safety counts as good judgment.”<br>
     Button: Continue
  3. **Forrest:** “And one with a closing time. That clause is mine.”<br>
     Button: Continue
  4. **Mara:** “Then show me. Three Pokemon, League rules, no special allowances for a moving personal story.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 25. Scene: What the Gym Teaches

- Activity ID: `chronicle-v2-brock-before-mara`
- Phase: Resolution
- Description: Brock enters his assessment with a team that reflects the work behind it.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Brock:** “Geodude, you lead. Rhyhorn follows if she presses the centre. Onix holds until we understand her rhythm.”<br>
     Button: Continue
  2. **Flint:** “That is not how I would order them.”<br>
     Button: Continue
  3. **Brock:** “I know.”<br>
     Button: Continue
  4. **Mara:** “Examiner ready. Candidate, begin when your whole team is prepared.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 26. Battle: Mara's League Examination

- Activity ID: `chronicle-v2-brock-league-examiner`
- Phase: Resolution
- Description: Demonstrate a Pewter challenge built around patience, safety and shared responsibility.
- Win text: Player wins: “You kept your team composed under pressure. That is the kind of trainer Pewter needs.”
- Loss text: Player loses: “A convincing result. I hope you remember to care for your Pokémon as carefully as you command them.”

#### 27. Scene: Leader of Pewter Gym

- Activity ID: `chronicle-v2-brock-the-provisional-key`
- Phase: Resolution
- Description: Mara grants Brock the key without pretending it solves his family.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Mara:** “Brock Harrison, the League grants you a provisional Gym licence. It will be reviewed when your deferred course begins.”<br>
     Button: Continue
  2. **Brock:** “So the licence allows a deputy?”<br>
     Button: Continue
  3. **Mara:** “It requires one. Nobody should have to run a Gym completely on their own.”<br>
     Button: Continue
  4. **Forrest:** “I volunteer for deputy training, not deputy parenting.”<br>
     Button: Continue
  5. **Flint:** “And I volunteer to earn the jobs I used to assume were mine.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 28. Scene: A Different Welcome

- Activity ID: `chronicle-v2-brock-the-first-new-challenge`
- Phase: Resolution
- Description: Taro returns to complete the challenge that exposed the Gym's weakness.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Taro:** “The scar is still there.”<br>
     Button: Continue
  2. **Brock:** “It is part of the Gym now. So are the stop signal, the clear line, and the person responsible for each rail.”<br>
     Button: Continue
  3. **Taro:** “Do I get my battle this time?”<br>
     Button: Continue
  4. **Brock:** “You get a safe one. If you find another weak spot, tell me before the wall does.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 29. Scene: The Work That Remains

- Activity ID: `chronicle-v2-brock-two-books-open`
- Phase: Reflection
- Description: Brock's two futures occupy the same desk.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Months later, the breeder programme approved Brock's deferral. His manual lay open beside the Gym ledger, both marked in the same careful hand. The repaired wall had weathered to almost the same colour as the old stone.”<br>
     Button: Continue
  2. **Forrest:** “Breakfast rota says you are off tomorrow.”<br>
     Button: Continue
  3. **Brock:** “I have reading.”<br>
     Button: Continue
  4. **Forrest:** “Reading is not a household emergency. You are still off.”<br>
     Button: Continue
  5. **Brock:** “All right. But wake me if the roof moves.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 30. Scene: No Place Empty

- Activity ID: `chronicle-v2-brock-the-chair-is-just-a-chair`
- Phase: Reflection
- Description: Flint's old chair stays at the table, but nobody keeps it empty anymore.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Flint's old chair stayed at the table, but nobody kept it empty anymore. Some mornings Flint sat there. Some mornings a twin piled schoolbooks on it. Once, Onix put his head through the window and took the whole loaf.”<br>
     Button: Continue
  2. **Flint:** “You know, I used to think that chair meant I was in charge.”<br>
     Button: Continue
  3. **Brock:** “It means you are closest to the stove. Turn the eggs before they burn.”<br>
     Button: Continue
  4. **Forrest:** “And that is how Brock became Leader: by finally delegating breakfast.”<br>
     Button: Continue
  5. **Brock:** “That is not going in the League record.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

### Source files

- Story: [brock.ts](../../src/data/gym-leader-chronicles/stories/brock.ts)
- Expedition: [gym-leader-chronicles.ts](../../src/data/expeditions/entries/gym-leader-chronicles.ts)
- Battles: [gym-leader-chronicles.ts](../../src/data/battles/entries/gym-leader-chronicles.ts)


## Misty: Out of Step

- Badge: Cascade Badge
- Chronicle player title: Cerulean's Youngest Sister
- Memory marker ID: `cascade-badge-memory-revealed`
- Memory marker title: Misty's Badge Memory
- Memory marker description: The Cascade Badge has opened a memory from Misty's past.
- Expedition ID: `misty-cascade-badge-chronicle`
- Expedition title: Misty: Out of Step
- Expedition description: Step into the memory held by the Cascade Badge and witness the choices that shaped Misty.
- Expedition button: Enter the Memory

### Ordered story and activity copy

#### 1. Scene: Out of Step

- Activity ID: `chronicle-v2-misty-the-count-of-four`
- Phase: Backstory
- Description: Misty hears a battle rhythm inside the sisters' opening number.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Cerulean Gym used to be a theatre, before any of the sisters were born. Their parents kept the old rising platforms and built a pool around them, so every family decision since has had to be both practical and dramatic.”<br>
     Button: Continue
  2. **Daisy:** “On four, Starmie breaks the surface. On five, you turn toward the balcony. Please do not challenge anyone in the balcony.”<br>
     Button: Continue
  3. **Misty:** “If Starmie waits until four, Violet's Seel blocks its best line. It should move on two.”<br>
     Button: Continue
  4. **Violet:** “The best line to what? There is no opponent. There is a chandelier.”<br>
     Button: Continue
  5. **Lily:** “And Mother was very clear about not battling the chandelier again.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 2. Scene: The Youngest Sister

- Activity ID: `chronicle-v2-misty-centre-water`
- Phase: Backstory
- Description: Daisy offers Misty the visible role the family understands.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Daisy:** “You have the strongest entrance. Take centre water at Saturday's preview and the sponsors will finally stop asking whether you are old enough to be in the show.”<br>
     Button: Continue
  2. **Misty:** “I am old enough to enter the League's Gym trial. The form is in my locker.”<br>
     Button: Continue
  3. **Lily:** “A Leader trial? Here? We have never run a battle programme.”<br>
     Button: Continue
  4. **Misty:** “That is why I submitted one.”<br>
     Button: Continue
  5. **Daisy:** “Without telling us. Naturally.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 3. Game: Stay With the Routine

- Activity ID: `chronicle-v2-misty-finale-rehearsal`
- Phase: Backstory
- Description: Keep Misty in step with her sisters' water-show choreography without turning every cue into a battle command.
- Chronicle-specific enter/exit modal copy: none authored; the shared game screen supplies its controls.

#### 4. Scene: Two Kinds of Applause

- Activity ID: `chronicle-v2-misty-after-the-music`
- Phase: Backstory
- Description: A strong rehearsal only sharpens the disagreement over what Cerulean Gym should be.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “The final chord faded into the water. The empty seats made no sound, but Daisy smiled as if she could already hear Saturday's applause.”<br>
     Button: Continue
  2. **Daisy:** “That was beautiful. When you stop fighting the music, you understand it better than any of us.”<br>
     Button: Continue
  3. **Misty:** “I was not fighting it. I was choosing when Starmie should commit and when it should wait. That is battling, Daisy.”<br>
     Button: Continue
  4. **Daisy:** “You can call it battling all you want. That does not turn our home into a proving ground.”<br>
     Button: Continue
  5. **Misty:** “It is my home too. I should get to prove something in it.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 5. Scene: Applicant: Misty Waterflower

- Activity ID: `chronicle-v2-misty-the-hidden-form`
- Phase: Backstory
- Description: The League application reveals how long Misty has prepared in private.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Violet:** “Six months of tide charts, challenger rules, and a budget for lifeguards. You did all this after rehearsal?”<br>
     Button: Continue
  2. **Misty:** “Usually after you went to bed. Daisy says plans sound less reckless in the morning, so I kept waiting for a good morning.”<br>
     Button: Continue
  3. **Daisy:** “The trial is today at the Cape. Saturday's sponsor preview is also today, because the League moved your appointment after you filed.”<br>
     Button: Continue
  4. **Misty:** “Then come to the trial. The preview can start without one person.”<br>
     Button: Continue
  5. **Daisy:** “The preview was built around you. You made both choices by yourself and left the collision for the rest of us.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 6. Scene: The Sound Beneath the Doors

- Activity ID: `chronicle-v2-misty-a-cry-from-the-canal`
- Phase: Development
- Description: Horsea's distress call interrupts an argument nobody has resolved.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “A thin cry came through the open service doors, almost lost under the filtration fans. Misty stopped mid-sentence. Starmie turned toward the canal at the same moment.”<br>
     Button: Continue
  2. **Misty:** “That is a Horsea. It called twice, and something bigger answered from the Cape.”<br>
     Button: Continue
  3. **Lily:** “I just heard the fan belt.”<br>
     Button: Continue
  4. **Misty:** “No. The second note dropped when the water carried it around the sea wall.”<br>
     Button: Continue
  5. **Daisy:** “The League steward will leave if we are late.”<br>
     Button: Continue
  6. **Misty:** “Then we had better find out what is waiting on the route.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 7. Game: Follow Horsea's Call

- Activity ID: `chronicle-v2-misty-listen-across-the-water`
- Phase: Development
- Description: Pick Horsea out from the wild Pokemon calls echoing around Cerulean Cape.
- Chronicle-specific enter/exit modal copy: none authored; the shared game screen supplies its controls.

#### 8. Scene: A Warning, Not a Challenge

- Activity ID: `chronicle-v2-misty-the-cape-message`
- Phase: Development
- Description: Misty recognises that Gyarados is keeping boats away from an injured Horsea.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “At the Cape, a red Gyarados circled the narrow cove. Every time a boat came close, it struck the water in front of the bow and drove it back. Horsea's cry came from behind the rocks.”<br>
     Button: Continue
  2. **Violet:** “It is attacking the harbour route. The rangers will drive it off if we report this.”<br>
     Button: Continue
  3. **Misty:** “Look where it strikes. Always ahead of the boats, never through them. It is warning us away.”<br>
     Button: Continue
  4. **Daisy:** “From what?”<br>
     Button: Continue
  5. **Misty:** “The cove is too shallow for it. Something in there matters enough that it is willing to beach itself.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 9. Scene: A Route Through the Cove

- Activity ID: `chronicle-v2-misty-chart-the-water`
- Phase: Development
- Description: The sisters combine theatre rigging and Misty's tide knowledge to reach Horsea.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Lily:** “Our floating light frames can cross that gap. They are rated for three performers and one unnecessarily large costume.”<br>
     Button: Continue
  2. **Daisy:** “They are not rescue rafts.”<br>
     Button: Continue
  3. **Misty:** “No, but the joints flex with the current. If Violet anchors here and Lily feeds the line, I can get in without crossing Gyarados's circle.”<br>
     Button: Continue
  4. **Violet:** “You know, we do occasionally have useful ideas before you have already jumped in the water.”<br>
     Button: Continue
  5. **Misty:** “I am standing on land and listening. Mark the historic occasion.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 10. Game: Chart the Cove

- Activity ID: `chronicle-v2-misty-chart-the-cove`
- Phase: Development
- Description: Reassemble the sisters’ chart of the currents between Cerulean Gym and the Cape.
- Chronicle-specific enter/exit modal copy: none authored; the shared game screen supplies its controls.

#### 11. Scene: Horsea's Broken Fin

- Activity ID: `chronicle-v2-misty-behind-the-rocks`
- Phase: Development
- Description: Misty reaches the cause of the commotion and sees the cost of rushing it.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Horsea lay in a pocket of calm water, fishing line wrapped around its fin. Gyarados lowered its head between Misty and the rocks and waited to see what she would do.”<br>
     Button: Continue
  2. **Misty:** “I am going to cut the line. Starmie stays behind me. Nobody pulls until Horsea stops twisting.”<br>
     Button: Continue
  3. **Daisy:** “You are giving orders as if Gyarados agreed to them.”<br>
     Button: Continue
  4. **Misty:** “It has been asking people to slow down all morning. I can do the same for it.”<br>
     Button: Continue
  5. **Lily:** “For the record, you are much less scary when you ask.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 12. Scene: Too Many Good Intentions

- Activity ID: `chronicle-v2-misty-the-ranger-boat`
- Phase: Conflict
- Description: A rescue crew's arrival turns the cove into the confrontation Gyarados feared.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “The harbour ranger had not heard Misty's plan. Its motor came into the cove at full speed, scattering the light frames and driving Gyarados against the outer rocks.”<br>
     Button: Continue
  2. **Daisy:** “Misty, get back on the platform!”<br>
     Button: Continue
  3. **Misty:** “If I retreat now, Gyarados has to choose between us and Horsea. Starmie, make a clear lane toward open water!”<br>
     Button: Continue
  4. **Violet:** “The ranger is getting a net ready.”<br>
     Button: Continue
  5. **Misty:** “Then we stop the net before we stop Gyarados.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 13. Battle: Gyarados at the Cove

- Activity ID: `chronicle-v2-misty-service-gyarados`
- Phase: Conflict
- Description: Create room to rescue Horsea without mistaking Gyarados’s warning for cruelty.
- Win text: No trainer result line is shown for this wild battle.
- Loss text: No trainer result line is shown for this wild battle.

#### 14. Scene: When the Water Settles

- Activity ID: `chronicle-v2-misty-the-horsea-rescue`
- Phase: Conflict
- Description: The battle creates enough space to free Horsea, but costs Misty her appointment.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Starmie's final screen turned the ranger's net aside. Gyarados wore itself out against the current, then let Misty close enough to cut Horsea free. By the time both Pokemon reached open water, the League steward's launch was pulling away from the pier.”<br>
     Button: Continue
  2. **Misty:** “Wait! I was the trial applicant!”<br>
     Button: Continue
  3. **League Steward:** “Your appointment ended forty minutes ago. We cannot assess a candidate who does not attend.”<br>
     Button: Continue
  4. **Daisy:** “She was handling an emergency the harbour team misunderstood.”<br>
     Button: Continue
  5. **League Steward:** “Then file an incident report. It will not restore today's panel.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 15. Scene: The Empty Centre

- Activity ID: `chronicle-v2-misty-the-preview-curtain`
- Phase: Conflict
- Description: Back at the Gym, the sponsor preview fails without the role Daisy built around Misty.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Lily:** “We moved Violet into centre water, but Seel kept looking for her old mark. The western fountain started a bar early and soaked the front row.”<br>
     Button: Continue
  2. **Violet:** “One sponsor called it experimental. He was the nice one.”<br>
     Button: Continue
  3. **Daisy:** “The preview did not fail because Misty rescued a Pokemon. It failed because we built a production with no understudy.”<br>
     Button: Continue
  4. **Misty:** “You mean because I left.”<br>
     Button: Continue
  5. **Daisy:** “I mean because all four of us keep pretending our plans are family decisions after making them alone.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 16. Scene: Not the Spare Sister

- Activity ID: `chronicle-v2-misty-the-sisters-score`
- Phase: Conflict
- Description: Old assumptions finally become explicit.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Misty:** “You put me centre stage when you need an entrance. The moment I want something you did not choose, I am the youngest sister who should wait.”<br>
     Button: Continue
  2. **Daisy:** “I became the responsible one because nobody else volunteered. Sponsors talk to me, the League talks to me, and all three of you get to call that controlling.”<br>
     Button: Continue
  3. **Violet:** “We call it controlling because you answer before asking whether we have an answer.”<br>
     Button: Continue
  4. **Lily:** “Misty does the same thing, only wetter.”<br>
     Button: Continue
  5. **Misty:** “Fine. I should have told you about the trial. That does not make the battle programme a childish phase.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 17. Scene: One Trial Remains

- Activity ID: `chronicle-v2-misty-the-stewards-condition`
- Phase: Conflict
- Description: The League offers a rescheduled trial only if Cerulean Gym agrees what is being assessed.
- Scene action button: Enter the Scene
- Enter modal:

  1. **League Steward:** “The incident report supports your judgment at the Cape. It also describes a Gym with no declared operator and four different versions of what it is for.”<br>
     Button: Continue
  2. **Daisy:** “Cerulean is a water performance venue managed by the Waterflower family.”<br>
     Button: Continue
  3. **Misty:** “And I am proposing a licensed challenge programme inside it.”<br>
     Button: Continue
  4. **League Steward:** “Then the family has to nominate an acting Leader. The assessment will be a formal match against that nominee.”<br>
     Button: Continue
  5. **Violet:** “Which means Daisy has to decide whether she is defending the old Gym or testing the new one.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 18. Scene: No Audience

- Activity ID: `chronicle-v2-misty-pool-after-closing`
- Phase: Contemplation
- Description: Misty and Daisy speak honestly when there is nobody left to impress.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “After closing, Daisy sat at the edge of the pool with her stage shoes beside her. Misty joined her without an argument ready. For a while, neither sister said anything.”<br>
     Button: Continue
  2. **Daisy:** “When our parents handed the tour to us, everyone looked at me. I said yes before I knew what I was agreeing to. Then I kept saying yes until it sounded like authority.”<br>
     Button: Continue
  3. **Misty:** “When I battle, nobody treats me like stage decoration. The scoreboard does not care about smiling for sponsors. It just shows if you were good enough.”<br>
     Button: Continue
  4. **Daisy:** “You saved that Horsea, but you also missed your trial and ruined our preview. I am not saying you were wrong. I am saying it still cost something.”<br>
     Button: Continue
  5. **Misty:** “I know. I just do not regret the rescue enough to pretend I would choose differently.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 19. Scene: What Would Your Gym Teach?

- Activity ID: `chronicle-v2-misty-daisys-question`
- Phase: Contemplation
- Description: Daisy asks Misty to define more than what she is resisting.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Daisy:** “Suppose you win. What does a challenger learn here, besides how hard my little sister is to push around?”<br>
     Button: Continue
  2. **Misty:** “They learn to read the water instead of fighting it. If you rush, the currents push you out of position. You have to adapt.”<br>
     Button: Continue
  3. **Daisy:** “That sounds suspiciously like choreography.”<br>
     Button: Continue
  4. **Misty:** “It is what I learned from choreography after I stopped resenting it.”<br>
     Button: Continue
  5. **Daisy:** “Then maybe you were not out of step with us after all. You just wanted a different stage.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 20. Scene: A Gym With Two Doors

- Activity ID: `chronicle-v2-misty-the-four-column-plan`
- Phase: Contemplation
- Description: The sisters design separate programmes that share staff, water and responsibility.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Violet:** “Morning rehearsals, afternoon challenges, and no rearranging platforms without putting it on the board.”<br>
     Button: Continue
  2. **Lily:** “The show gets an understudy. The battle programme gets a lifeguard who is not also battling.”<br>
     Button: Continue
  3. **Daisy:** “Sponsor money keeps the pool running. Challenge fees keep the teams running. Neither budget quietly rescues the other.”<br>
     Button: Continue
  4. **Misty:** “And any sister can call a safety stop without losing her place in the argument.”<br>
     Button: Continue
  5. **Narration:** “The plan was less elegant than Daisy's schedules and less direct than Misty's way. That is how they knew it belonged to all four of them.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 21. Scene: Daisy's Side of the Pool

- Activity ID: `chronicle-v2-misty-trial-day`
- Phase: Resolution
- Description: Daisy accepts the role of opponent without turning the match into a family verdict.
- Scene action button: Enter the Scene
- Enter modal:

  1. **League Steward:** “This trial decides whether Misty can run a League challenge. It does not decide which sister values Cerulean Gym more.”<br>
     Button: Continue
  2. **Daisy:** “Good. I would hate to settle that with a Seaking.”<br>
     Button: Continue
  3. **Misty:** “You chose Seaking? You always say it splashes the lighting rig.”<br>
     Button: Continue
  4. **Daisy:** “There is no lighting rig today. You are not the only sister who can adapt.”<br>
     Button: Continue
  5. **League Steward:** “Candidates ready. Begin when the water is still.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 22. Battle: Daisy's League Trial

- Activity ID: `chronicle-v2-misty-daisys-challenge`
- Phase: Resolution
- Description: Meet Daisy’s adaptable water team in the formal trial for Cerulean leadership.
- Win text: Player wins: “You adapted beautifully. A good Gym Leader has to read the whole match, not just the next wave.”
- Loss text: Player loses: “A well-earned win. Misty will want to hear how you handled yourself in the water.”

#### 23. Scene: Leader of Cerulean Gym

- Activity ID: `chronicle-v2-misty-the-cascade-licence`
- Phase: Resolution
- Description: Misty earns the role while Daisy retains a future that is not framed as defeat.
- Scene action button: Enter the Scene
- Enter modal:

  1. **League Steward:** “Misty Waterflower, the League recognises your command, your safety judgment, and your adaptive strategy. Cerulean Gym may open its challenge programme under your direction.”<br>
     Button: Continue
  2. **Misty:** “And the performance licence?”<br>
     Button: Continue
  3. **League Steward:** “Unchanged. We are licensing a Leader, not annexing a theatre.”<br>
     Button: Continue
  4. **Daisy:** “So you get the afternoon keys. I get mornings, sponsor dinners, and the right to complain when Onix chips the tiles.”<br>
     Button: Continue
  5. **Misty:** “Only if I get to complain when your fountains flood my referee marks.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 24. Scene: The First New Programme

- Activity ID: `chronicle-v2-misty-opening-challenge`
- Phase: Resolution
- Description: The first challenger discovers that Cerulean's performance history remains part of its battle identity.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “The first official challenge began under the old stage lights. Platforms rose in an unfamiliar order, and the currents forced both trainers to rethink their opening plans.”<br>
     Button: Continue
  2. **Violet:** “Misty asked for three platform changes. Daisy designed seven.”<br>
     Button: Continue
  3. **Lily:** “Daisy says subtlety is what happens between two dramatic ideas.”<br>
     Button: Continue
  4. **Misty:** “Challenger, watch the reflections. The pool shows you what is moving before the surface does.”<br>
     Button: Continue
  5. **Daisy:** “And on four, try not to battle the chandelier.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 25. Scene: Two Honest Posters

- Activity ID: `chronicle-v2-misty-two-posters`
- Phase: Reflection
- Description: Two posters go up outside the Gym, one for the evening show and one for the challenge programme.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Two posters went up outside the Gym. One promised the Waterflower Sisters' evening show. The other announced Cerulean Gym Challenges under Leader Misty. Neither poster called the other a special attraction.”<br>
     Button: Continue
  2. **Misty:** “Your portrait is bigger.”<br>
     Button: Continue
  3. **Daisy:** “There are three of us on that poster.”<br>
     Button: Continue
  4. **Misty:** “My Starmie is bigger than my face. I approve.”<br>
     Button: Continue
  5. **Violet:** “Amazing. We found the exact distribution of attention that keeps this family peaceful.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 26. Scene: On Four

- Activity ID: `chronicle-v2-misty-the-next-count`
- Phase: Reflection
- Description: Misty returns to rehearsal by choice, carrying a different understanding of the count.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Daisy:** “You are early. Your challenge block does not start until noon.”<br>
     Button: Continue
  2. **Misty:** “I know. I want to fix the turn before Saturday. Starmie commits too soon and leaves Lily without enough water for the finish.”<br>
     Button: Continue
  3. **Lily:** “Did our Gym Leader just choose the good of the ensemble?”<br>
     Button: Continue
  4. **Misty:** “Do not make me regret it. From the top. On four, we move together.”<br>
     Button: Continue
  5. **Narration:** “The music started. Misty heard the opening a battle would offer, let it pass, and stayed with her sisters for the next count.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

### Source files

- Story: [misty.ts](../../src/data/gym-leader-chronicles/stories/misty.ts)
- Expedition: [gym-leader-chronicles.ts](../../src/data/expeditions/entries/gym-leader-chronicles.ts)
- Battles: [gym-leader-chronicles.ts](../../src/data/battles/entries/gym-leader-chronicles.ts)


## Lt. Surge: After the Thunder

- Badge: Thunder Badge
- Chronicle player title: Vermilion Veteran
- Memory marker ID: `thunder-badge-memory-revealed`
- Memory marker title: Lt. Surge's Badge Memory
- Memory marker description: The Thunder Badge has opened a memory from Lt. Surge's past.
- Expedition ID: `surge-thunder-badge-chronicle`
- Expedition title: Lt. Surge: After the Thunder
- Expedition description: Step into the memory held by the Thunder Badge and witness the choices that shaped Lt. Surge.
- Expedition button: Enter the Memory

### Ordered story and activity copy

#### 1. Scene: The Last Transport

- Activity ID: `chronicle-v2-surge-storm-transport`
- Phase: Backstory
- Description: Lightning knocks out every instrument on the transport, and Surge has to keep the medical deck powered.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Years before Vermilion knew him as a Gym Leader, Surge worked aboard a storm transport that carried field medics and wounded Pokemon. Lightning turned the sea white. Then every instrument on the bridge failed at once.”<br>
     Button: Continue
  2. **Mako:** “Main power is gone. I am trying to isolate the backup cells, but they are flooding faster than I can keep up.”<br>
     Button: Continue
  3. **Lt. Surge:** “Then stop trying to save the whole board. Give me one live route to the medical deck and kill everything else.”<br>
     Button: Continue
  4. **Mako:** “That means we lose navigation.”<br>
     Button: Continue
  5. **Lt. Surge:** “For ninety seconds. The people below do not have ninety seconds to spare.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 2. Scene: Commands in the Dark

- Activity ID: `chronicle-v2-surge-voices-below-deck`
- Phase: Backstory
- Description: Surge's authority keeps the transport moving but leaves no room for fear.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Smoke filled the corridor and everyone talked at once. Surge learned to sort the voices by urgency: an engineer quoting voltage, a medic asking for light, and a wounded soldier just asking if anyone could hear him.”<br>
     Button: Continue
  2. **Nurse Hana:** “The incubator battery is failing. I need steady current, and I need it now.”<br>
     Button: Continue
  3. **Lt. Surge:** “You will have it. Mako, east conduit. Everyone else, hold where you are and count off.”<br>
     Button: Continue
  4. **Mako:** “The east conduit is arcing.”<br>
     Button: Continue
  5. **Lt. Surge:** “Then we move between the arcs. Go.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 3. Scene: A Route Kept Alive

- Activity ID: `chronicle-v2-surge-the-cost-of-ninety-seconds`
- Phase: Backstory
- Description: The transport makes port, but the burns Mako carries show what those commands cost.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “The medical deck kept its power. Navigation came back one hundred and twelve seconds later. Two crewmen were burned crossing the conduit, including Mako, who followed the order before he could question it.”<br>
     Button: Continue
  2. **Mako:** “We made port. That is what the report will say.”<br>
     Button: Continue
  3. **Lt. Surge:** “That is what matters.”<br>
     Button: Continue
  4. **Mako:** “We made port, sure. But two of us ended up in the burn ward to do it.”<br>
     Button: Continue
  5. **Narration:** “Surge received a commendation. He kept it in a drawer, and kept giving orders in exactly the same voice.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 4. Scene: A Civilian Posting

- Activity ID: `chronicle-v2-surge-vermillion-contract`
- Phase: Backstory
- Description: Vermilion hires the decorated veteran to modernise its unreliable grid.
- Scene action button: Enter the Scene
- Enter modal:

  1. **League Steward:** “The harbour needs someone who understands electricity. The League also needs someone to reopen Vermilion Gym after the last Leader retired.”<br>
     Button: Continue
  2. **Lt. Surge:** “You want a soldier running a gym.”<br>
     Button: Continue
  3. **League Steward:** “I want someone who can control power. Whether you can handle civilians is part of the test.”<br>
     Button: Continue
  4. **Mako:** “I have taken the harbour maintenance contract. If you take the gym, we work together again.”<br>
     Button: Continue
  5. **Lt. Surge:** “This time nobody has to cross a burning deck.”<br>
     Button: Continue
  6. **Mako:** “That almost sounds like hope. I will take it.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 5. Scene: Two Uses for One Building

- Activity ID: `chronicle-v2-surge-gym-and-shelter`
- Phase: Development
- Description: Surge turns the old Gym into both a challenge hall and a storm shelter.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “The old Gym had thick walls, its own generator, and enough open floor for cots. Surge drew a battle circuit on one side and marked emergency lanes on the other.”<br>
     Button: Continue
  2. **Lt. Surge:** “Clear weather, trainers learn to handle Electric types. When a storm warning goes out, we fold the barriers back and this floor becomes a shelter.”<br>
     Button: Continue
  3. **Nurse Hana:** “People will come in with babies, medication, frightened Pokemon, and no interest in military lines.”<br>
     Button: Continue
  4. **Lt. Surge:** “Lines keep the exits clear.”<br>
     Button: Continue
  5. **Mako:** “Panicking people ignore lines on a floor, Surge. They need to know where they are going.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 6. Scene: The Drill as Written

- Activity ID: `chronicle-v2-surge-makos-drill`
- Phase: Development
- Description: Mako tests whether Surge's plan survives disagreement.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Mako:** “Scenario. East door is jammed, generator at sixty percent, thirty civilians in the yellow lane.”<br>
     Button: Continue
  2. **Lt. Surge:** “Move them west. Voltorb holds the auxiliary relay while Raichu gets the door back.”<br>
     Button: Continue
  3. **Mako:** “The west lane has the medical station.”<br>
     Button: Continue
  4. **Lt. Surge:** “Then medical moves.”<br>
     Button: Continue
  5. **Mako:** “You answered before you checked whether it can move.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 7. Battle: Mako's Emergency Drill

- Activity ID: `chronicle-v2-surge-makos-drill`
- Phase: Development
- Description: Run the shelter drill against an engineer who will exploit every rigid assumption.
- Win text: Player wins: “You changed course when the drill demanded it. That flexibility can keep a whole team safe.”
- Loss text: Player loses: “Good work. Remember, the safest plan is the one you are willing to revise when conditions change.”

#### 8. Scene: A Victory Nobody Trusts

- Activity ID: `chronicle-v2-surge-after-the-drill`
- Phase: Development
- Description: Surge wins the exercise and discovers that nobody followed its intended lesson.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Lt. Surge:** “Relay held. Door restored. Scenario complete.”<br>
     Button: Continue
  2. **Nurse Hana:** “My station lost power for four minutes. In a real evacuation, that is not a footnote.”<br>
     Button: Continue
  3. **Mako:** “Your crew did it perfectly because they know your voice. The volunteers froze because they do not.”<br>
     Button: Continue
  4. **Lt. Surge:** “Then they need more drills.”<br>
     Button: Continue
  5. **Mako:** “Or you need a plan that works for people who are allowed to hesitate.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 9. Scene: Weather From the East

- Activity ID: `chronicle-v2-surge-warning-siren`
- Phase: Development
- Description: A real storm arrives before the disputed shelter plan is revised.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “The siren went off that same afternoon. A storm crossed the harbour faster than anyone predicted, shoving cranes into their locks and sending market stalls skidding down the street.”<br>
     Button: Continue
  2. **Lt. Surge:** “Open the shelter. Mako, generator. Hana, medical against the north wall.”<br>
     Button: Continue
  3. **Mako:** “The east substation is already reporting unstable frequency.”<br>
     Button: Continue
  4. **Lt. Surge:** “It can wait until everyone is inside.”<br>
     Button: Continue
  5. **Mako:** “If it drops, the whole east side goes dark on us.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 10. Game: Restore the East Grid

- Activity ID: `chronicle-v2-surge-restore-the-east-grid`
- Phase: Development
- Description: Reconnect the storm-damaged grid and bring the eastern shelter lights back online.
- Chronicle-specific enter/exit modal copy: none authored; the shared game screen supplies its controls.

#### 11. Scene: After the Thunder

- Activity ID: `chronicle-v2-surge-blackout`
- Phase: Conflict
- Description: The repaired circuit fails elsewhere and Vermilion goes dark.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “The east grid came back for eleven minutes. Then a transformer blew past the repaired section. The darkness rolled block by block toward the harbour, with alarms and Pokemon cries following it.”<br>
     Button: Continue
  2. **Lt. Surge:** “Shelter team, blackout protocol. Yellow lane to the west wall. Nobody stops in the entrance.”<br>
     Button: Continue
  3. **Niko:** “My Pikachu ran toward the substation! It hates thunder, and it thinks the wires are calling it!”<br>
     Button: Continue
  4. **Lt. Surge:** “You stay here. I will send someone.”<br>
     Button: Continue
  5. **Niko:** “Who? Everyone you send already has a job.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 12. Game: Voices in the Dark

- Activity ID: `chronicle-v2-surge-voices-in-the-dark`
- Phase: Conflict
- Description: Identify the Pokémon calling from different rooms while the Gym shelters Vermilion.
- Chronicle-specific enter/exit modal copy: none authored; the shared game screen supplies its controls.

#### 13. Scene: Not This Time

- Activity ID: `chronicle-v2-surge-mako-refuses-an-order`
- Phase: Conflict
- Description: Mako refuses to repeat the transport's most dangerous lesson.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Lt. Surge:** “Mako, cross the maintenance trench and isolate the live bank. Raichu and I will cover you.”<br>
     Button: Continue
  2. **Mako:** “No.”<br>
     Button: Continue
  3. **Lt. Surge:** “That bank can catch fire.”<br>
     Button: Continue
  4. **Mako:** “Then ask me what I can see before you order it. The trench is flooded. Raichu's cover would turn it into the conduit all over again.”<br>
     Button: Continue
  5. **Lt. Surge:** “On the transport, hesitation cost lives.”<br>
     Button: Continue
  6. **Mako:** “And following orders cost burns. Both of those things are true.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 14. Scene: What Do You Need?

- Activity ID: `chronicle-v2-surge-ask-the-room`
- Phase: Conflict
- Description: Surge stops giving orders and asks the room what it actually needs.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Lt. Surge:** “All right. Mako, what route is safe?”<br>
     Button: Continue
  2. **Mako:** “The service bridge, if somebody grounds the western fence first.”<br>
     Button: Continue
  3. **Nurse Hana:** “I can move medical south now that the first families are settled. That frees two insulated mats.”<br>
     Button: Continue
  4. **Niko:** “Pikachu knows the drain ledge. I can show you on the harbour map, I will not even leave.”<br>
     Button: Continue
  5. **Lt. Surge:** “Good. Nobody moves until they understand why, and the person next to them agrees.”<br>
     Button: Continue
  6. **Narration:** “The room got louder. For the first time, Surge did not mistake that for losing control.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 15. Game: Cross the Substation

- Activity ID: `chronicle-v2-surge-cross-the-substation`
- Phase: Conflict
- Description: Clear only the necessary debris and reach the emergency exit without catching stranded Pokémon in a discharge.
- Chronicle-specific enter/exit modal copy: none authored; the shared game screen supplies its controls.

#### 16. Scene: The Living Fault

- Activity ID: `chronicle-v2-surge-magneton-at-the-bank`
- Phase: Conflict
- Description: The source of the surges is a terrified Magneton trapped between fields.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “At the substation, Magneton hung between two damaged coils, pulled east, then west. Every time it tried to escape, another pulse went through the city.”<br>
     Button: Continue
  2. **Mako:** “If we cut both banks at once, it drops into the flooded trench.”<br>
     Button: Continue
  3. **Lt. Surge:** “Then we do not cut both. Raichu takes the first discharge. I draw Magneton toward the service bridge.”<br>
     Button: Continue
  4. **Mako:** “You are not sending Raichu into that field without checking with it.”<br>
     Button: Continue
  5. **Lt. Surge:** “Raichu, look at me. Do you want the line?”<br>
     Button: Continue
  6. **Narration:** “Raichu planted its feet. Surge waited for the spark before he moved.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 17. Battle: Magneton Between Fields

- Activity ID: `chronicle-v2-surge-substation-magneton`
- Phase: Conflict
- Description: Stabilise the frightened Magneton without driving it into the flooded bank.
- Win text: No trainer result line is shown for this wild battle.
- Loss text: No trainer result line is shown for this wild battle.

#### 18. Scene: A City Exhales

- Activity ID: `chronicle-v2-surge-lights-return`
- Phase: Conflict
- Description: The harbour lights come back one row at a time, and Surge admits how close he came to sending Mako across the trench.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “The harbour lamps came back one row at a time. People cheered inside the Gym. Surge could not join them yet. Every light reminded him of an instrument blinking back on board the transport.”<br>
     Button: Continue
  2. **Mako:** “Magneton is stable. The flooded bank stayed isolated. Nobody crossed the trench.”<br>
     Button: Continue
  3. **Lt. Surge:** “I nearly sent you across it.”<br>
     Button: Continue
  4. **Mako:** “You did send me. I said no, and you listened before it came to that.”<br>
     Button: Continue
  5. **Lt. Surge:** “Not much of an improvement.”<br>
     Button: Continue
  6. **Mako:** “Nobody got burned today. That is something.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 19. Scene: The Sentence in the Report

- Activity ID: `chronicle-v2-surge-the-commendation`
- Phase: Contemplation
- Description: Surge finally reads the transport report beyond its successful outcome.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Surge brought his old commendation to the empty shelter and unfolded the incident report he had kept behind it. The first page praised the medical route. The second page named every injury.”<br>
     Button: Continue
  2. **Lt. Surge:** “I remembered the power staying on. I did not let myself remember you dropping that wrench because your hand was burned.”<br>
     Button: Continue
  3. **Mako:** “I remembered both. That is why I came to Vermilion. I thought maybe we could build what we needed back then.”<br>
     Button: Continue
  4. **Lt. Surge:** “A better generator?”<br>
     Button: Continue
  5. **Mako:** “Something where saying no was part of how we worked.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 20. Scene: Why Is the Gym a Shelter?

- Activity ID: `chronicle-v2-surge-nikos-question`
- Phase: Contemplation
- Description: A child asks for an explanation no regulation required.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Niko:** “If this is a Pokemon Gym, why are there cots behind the battle wall?”<br>
     Button: Continue
  2. **Lt. Surge:** “Because when a hurricane hits, people need a roof, not a battle arena.”<br>
     Button: Continue
  3. **Niko:** “Then why make challengers practise switches and warning calls?”<br>
     Button: Continue
  4. **Lt. Surge:** “Because out in a real storm, quick reflexes and clear calls keep you alive.”<br>
     Button: Continue
  5. **Niko:** “That sounds like something you would put on a sign.”<br>
     Button: Continue
  6. **Lt. Surge:** “You may have a future in regulations, kid.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 21. Scene: Permission to Hesitate

- Activity ID: `chronicle-v2-surge-civilian-protocol`
- Phase: Contemplation
- Description: The revised plan replaces silent obedience with confirmation.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Nurse Hana:** “Every order now names the reason for it. Every dangerous job requires the person doing it to confirm the route.”<br>
     Button: Continue
  2. **Mako:** “And anyone can call hold. No rank required, no prepared speech required.”<br>
     Button: Continue
  3. **Lt. Surge:** “The commander still decides when time runs out.”<br>
     Button: Continue
  4. **Nurse Hana:** “Yes. Listening is not giving up responsibility.”<br>
     Button: Continue
  5. **Lt. Surge:** “Good. I have never been any good at giving that up.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 22. Scene: Controlled Power

- Activity ID: `chronicle-v2-surge-league-assessment`
- Phase: Resolution
- Description: The League tests the Gym Surge rebuilt from the blackout.
- Scene action button: Enter the Scene
- Enter modal:

  1. **League Steward:** “Your assessment covers battle command and a simulated shelter fault. I am told your staff are allowed to contradict you.”<br>
     Button: Continue
  2. **Lt. Surge:** “They are required to when the situation calls for it.”<br>
     Button: Continue
  3. **Mako:** “For the record, we were doing that before it was required.”<br>
     Button: Continue
  4. **League Steward:** “Then the candidate may have learned something.”<br>
     Button: Continue
  5. **Lt. Surge:** “Do not write that down until after the battle.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 23. Battle: Vermilion League Assessment

- Activity ID: `chronicle-v2-surge-league-assessment`
- Phase: Resolution
- Description: Prove that controlled power includes listening when the plan must change.
- Win text: Player wins: “The assessment is complete. You have shown the care and judgement this role requires.”
- Loss text: Player loses: “A worthy result. The League needs trainers who know when to adapt as much as when to attack.”

#### 24. Scene: Leader of Vermilion Gym

- Activity ID: `chronicle-v2-surge-thunder-licence`
- Phase: Resolution
- Description: Surge receives a licence conditioned on the shelter remaining part of the Gym.
- Scene action button: Enter the Scene
- Enter modal:

  1. **League Steward:** “The League recognises Vermilion Gym under Leader Surge. The shelter and the civilian review board stay part of the licence.”<br>
     Button: Continue
  2. **Lt. Surge:** “They were never bargaining pieces.”<br>
     Button: Continue
  3. **Mako:** “He means yes.”<br>
     Button: Continue
  4. **League Steward:** “I am learning the dialect.”<br>
     Button: Continue
  5. **Nurse Hana:** “Then your first official duty is helping put thirty cots back in storage without shouting at the volunteers.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 25. Scene: A Battle With a Stop Word

- Activity ID: `chronicle-v2-surge-first-challenger`
- Phase: Resolution
- Description: Vermilion's first challenger is taught how to interrupt the Leader.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Lt. Surge:** “Before we start, either of us can call hold. Say the word back so I know you heard it.”<br>
     Button: Continue
  2. **Niko:** “Hold.”<br>
     Button: Continue
  3. **Lt. Surge:** “Louder.”<br>
     Button: Continue
  4. **Niko:** “Hold!”<br>
     Button: Continue
  5. **Mako:** “There. You have learned the first technique Surge never mastered in the service.”<br>
     Button: Continue
  6. **Lt. Surge:** “The second is surviving his commentary.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 26. Scene: A Different Voice

- Activity ID: `chronicle-v2-surge-when-thunder-returns`
- Phase: Reflection
- Description: A summer storm rolls in during a full Gym challenge, and the shelter opens before the siren.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “The next summer, thunder rolled over Vermilion in the middle of a full Gym challenge. Surge stopped the match before the siren and opened the shelter partitions.”<br>
     Button: Continue
  2. **Lt. Surge:** “Mako, what do you see on the east bank?”<br>
     Button: Continue
  3. **Mako:** “Stable for now. I would isolate it before the first people arrive.”<br>
     Button: Continue
  4. **Lt. Surge:** “Agreed. Hana, what does medical need?”<br>
     Button: Continue
  5. **Narration:** “His voice still carried across the room. The difference was that it made room for answers.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 27. Scene: Lights Along the Harbour

- Activity ID: `chronicle-v2-surge-after-the-thunder`
- Phase: Reflection
- Description: Surge watches the harbour lights hold and lets the revised plan be the one that worked.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Mako:** “People still tell the transport story. In their version, you held the whole ship together with Raichu and one sentence.”<br>
     Button: Continue
  2. **Lt. Surge:** “That is a nice story. It leaves out every part that went wrong.”<br>
     Button: Continue
  3. **Mako:** “That sounds like something for the sign outside.”<br>
     Button: Continue
  4. **Lt. Surge:** “Niko already claimed the signage job.”<br>
     Button: Continue
  5. **Narration:** “Below them, the harbour lights held steady. Surge watched each circuit stay lit, not because nobody questioned the plan, but because enough people had learned how.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

### Source files

- Story: [surge.ts](../../src/data/gym-leader-chronicles/stories/surge.ts)
- Expedition: [gym-leader-chronicles.ts](../../src/data/expeditions/entries/gym-leader-chronicles.ts)
- Battles: [gym-leader-chronicles.ts](../../src/data/battles/entries/gym-leader-chronicles.ts)


## Erika: The Unspoken Bloom

- Badge: Rainbow Badge
- Chronicle player title: Celadon's Dutiful Daughter
- Memory marker ID: `rainbow-badge-memory-revealed`
- Memory marker title: Erika's Badge Memory
- Memory marker description: The Rainbow Badge has opened a memory from Erika's past.
- Expedition ID: `erika-rainbow-badge-chronicle`
- Expedition title: Erika: The Unspoken Bloom
- Expedition description: Step into the memory held by the Rainbow Badge and witness the choices that shaped Erika.
- Expedition button: Enter the Memory

### Ordered story and activity copy

#### 1. Scene: A Proper Future

- Activity ID: `chronicle-v2-erika-the-calling-card`
- Phase: Backstory
- Description: Erika's family prepares to present her as Celadon's ideal young patron.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “By sixteen, Erika could enter any drawing room in Celadon and know which flower had been chosen to flatter its owner. Her mother considered this an education; Erika experienced it as a language in which every sentence had already been written.”<br>
     Button: Continue
  2. **Erika's Mother:** “The exhibition committee will announce your patronage after the opening arrangement. Stand beside the Bellossom screen and say how honoured you are.”<br>
     Button: Continue
  3. **Erika:** “Am I honoured?”<br>
     Button: Continue
  4. **Erika's Mother:** “You will be when you understand what the appointment protects. Our family makes space for beautiful things.”<br>
     Button: Continue
  5. **Erika:** “And if I do not want to stand there?”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 2. Scene: The Greenhouse Before Guests

- Activity ID: `chronicle-v2-erika-sumis-bench`
- Phase: Backstory
- Description: Erika finds freedom in Sumi's working greenhouse, where plants are allowed to be useful.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Sumi:** “This batch is not elegant. Gloom's pollen makes the opening sharp, but it settles into something warmer after ten minutes.”<br>
     Button: Continue
  2. **Erika:** “It is sharp at first, but it warms up after a few minutes. I like that it takes time.”<br>
     Button: Continue
  3. **Sumi:** “Your mother will ask for roses.”<br>
     Button: Continue
  4. **Erika:** “My mother only likes roses that behave. Show me the measurements again.”<br>
     Button: Continue
  5. **Narration:** “At Sumi's bench, Erika's careful hands were not decorative. They weighed, crushed, filtered and recorded.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 3. Game: Prepare Sumi's Fragrance

- Activity ID: `chronicle-v2-erika-prepare-sumis-fragrance`
- Phase: Backstory
- Description: Follow the safe dependencies in the fragrance method Sumi and Erika developed together.
- Activity labels:
  - Inspect the petals
  - Rinse the petals
  - Sterilise the vial
  - Bruise the petals
  - Measure the carrier oil
  - Steep the petals
  - Filter the extract
  - Label Sumi's formula
- Chronicle-specific enter/exit modal copy: none authored; the shared game screen supplies its controls.

#### 4. Scene: Sumi's Formula

- Activity ID: `chronicle-v2-erika-a-name-on-the-label`
- Phase: Backstory
- Description: Erika insists that the work carry its creator's name.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Sumi:** “The exhibition label should say House Tamamushi. It will be accepted more easily.”<br>
     Button: Continue
  2. **Erika:** “It should say Sumi Arai. You made the first extract and corrected my steeping time.”<br>
     Button: Continue
  3. **Sumi:** “I am employed by your family. Acceptance is part of how I remain employed.”<br>
     Button: Continue
  4. **Erika:** “Then I will explain it to Mother.”<br>
     Button: Continue
  5. **Sumi:** “You say that as if explanations are the difficulty.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 5. Scene: How to Be Gracious

- Activity ID: `chronicle-v2-erika-the-rehearsed-answer`
- Phase: Backstory
- Description: Erika's mother teaches her to turn disagreement into polished silence.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Erika's Mother:** “When Celia remarks on the scent, thank her. When the steward asks who developed it, say our greenhouse. Never burden a public occasion with workshop detail.”<br>
     Button: Continue
  2. **Erika:** “Sumi is not workshop detail.”<br>
     Button: Continue
  3. **Erika's Mother:** “Of course not. She is valued staff. Valued staff do not need society guests examining their private history.”<br>
     Button: Continue
  4. **Erika:** “You make concealment sound like kindness.”<br>
     Button: Continue
  5. **Erika's Mother:** “Making a public fuss about it will only embarrass her and make a spectacle of yourself.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 6. Scene: The Rival Arrangement

- Activity ID: `chronicle-v2-erika-celias-arrival`
- Phase: Development
- Description: Celia arrives expecting a social contest and recognises Erika's real interest.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Celia:** “Your mother told mine we are to represent two traditions in friendly contrast. That means she expects me to lose beautifully.”<br>
     Button: Continue
  2. **Erika:** “Mine expects me to win without appearing to compete.”<br>
     Button: Continue
  3. **Celia:** “How exhausting for both of us. Is that the fragrance? It is far too interesting to have come from the committee.”<br>
     Button: Continue
  4. **Erika:** “Sumi developed it. I helped refine the last notes.”<br>
     Button: Continue
  5. **Celia:** “Then put that on the programme before someone wealthier discovers she invented it.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 7. Game: Identify the Notes

- Activity ID: `chronicle-v2-erika-identify-the-notes`
- Phase: Development
- Description: Identify each botanical fragrance before Erika and Sumi choose the exhibition blend.
- Chronicle-specific enter/exit modal copy: none authored; the shared game screen supplies its controls.

#### 8. Scene: A Small Correction

- Activity ID: `chronicle-v2-erika-the-programme-proof`
- Phase: Development
- Description: Erika changes the programme and believes the written name will be enough.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Erika crossed out House Tamamushi in the printer's proof and wrote Sumi Arai beneath the fragrance title. The correction looked small enough to survive unnoticed.”<br>
     Button: Continue
  2. **Exhibition Steward:** “Your mother approved the first wording.”<br>
     Button: Continue
  3. **Erika:** “The first wording was inaccurate.”<br>
     Button: Continue
  4. **Exhibition Steward:** “Accuracy is rarely the only consideration at an exhibition.”<br>
     Button: Continue
  5. **Erika:** “That does not make it accurate.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 9. Scene: A Public Garden

- Activity ID: `chronicle-v2-erika-the-gym-proposal`
- Phase: Development
- Description: The League invites Erika's family to sponsor a Gym and assumes she will lead it.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Exhibition Steward:** “Celadon needs a licensed Gym. Your family owns the garden site and funds the horticultural society. The committee believes Erika would be an elegant candidate.”<br>
     Button: Continue
  2. **Erika's Mother:** “She would be delighted.”<br>
     Button: Continue
  3. **Erika:** “You have not asked whether I want to be a Gym Leader.”<br>
     Button: Continue
  4. **Erika's Mother:** “You train every morning and lecture guests about plant care. That could turn an odd habit into real standing.”<br>
     Button: Continue
  5. **Sumi:** “It might also give her authority over what the garden teaches.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 10. Scene: An Acceptable Spectacle

- Activity ID: `chronicle-v2-erika-celias-challenge`
- Phase: Development
- Description: Celia proposes a battle that can prove Erika's skill in terms the committee understands.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Celia:** “The committee thinks you are a flower arrangement with a family name. Battle me during the exhibition.”<br>
     Button: Continue
  2. **Erika:** “Public combat beside rare orchids sounds like a poor horticultural decision.”<br>
     Button: Continue
  3. **Celia:** “Then design it carefully. Show them the patience, conditions and restraint Grass Pokemon require.”<br>
     Button: Continue
  4. **Erika's Mother:** “A friendly demonstration would be charming. Celia's loss would reassure the League without looking ambitious.”<br>
     Button: Continue
  5. **Celia:** “There it is. Your mother has managed to insult us both while approving.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 11. Scene: House Tamamushi No. 4

- Activity ID: `chronicle-v2-erika-the-stolen-credit`
- Phase: Conflict
- Description: Erika discovers her correction has been removed and Sumi's work absorbed into the family name.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “On opening morning, crystal bottles lined the central table. Their labels read House Tamamushi No. 4. Sumi's name appeared nowhere in the hall.”<br>
     Button: Continue
  2. **Erika:** “I corrected the programme.”<br>
     Button: Continue
  3. **Erika's Mother:** “And I corrected an impulsive breach of discretion. Guests are buying the family edition. Sumi will receive a private bonus.”<br>
     Button: Continue
  4. **Sumi:** “Lady Tamamushi has been generous.”<br>
     Button: Continue
  5. **Erika:** “That is not what we agreed.”<br>
     Button: Continue
  6. **Erika's Mother:** “Do not force an employee to contradict me in public.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 12. Scene: The Question Asked Aloud

- Activity ID: `chronicle-v2-erika-celia-speaks`
- Phase: Conflict
- Description: Celia publicly credits Sumi, forcing Erika toward the statement she has rehearsed avoiding.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Celia:** “This is Sumi Arai's fragrance, is it not? Erika described her method to me yesterday.”<br>
     Button: Continue
  2. **Exhibition Steward:** “The programme attributes the edition to House Tamamushi.”<br>
     Button: Continue
  3. **Celia:** “A house did not bruise petals, correct the carrier oil or discover the settling note.”<br>
     Button: Continue
  4. **Erika's Mother:** “Celia, friendly rivalry need not become vulgar.”<br>
     Button: Continue
  5. **Celia:** “Erika can settle it. Tell them whose work is in the bottle.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 13. Scene: A Graceful Answer

- Activity ID: `chronicle-v2-erika-the-silence`
- Phase: Conflict
- Description: Erika sees the cost of speaking and chooses a polished answer that protects the occasion.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Erika looked first at Sumi, then at her mother. Sumi's hands were folded so tightly that one thumb had gone white. Behind them, buyers waited with pens above order cards.”<br>
     Button: Continue
  2. **Erika's Mother:** “Erika?”<br>
     Button: Continue
  3. **Erika:** “Our greenhouse is fortunate to contain many talented hands. Today's edition reflects a shared tradition.”<br>
     Button: Continue
  4. **Celia:** “That is not an answer.”<br>
     Button: Continue
  5. **Erika:** “It is the answer this room will accept.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 14. Battle: Celia's Exhibition Challenge

- Activity ID: `chronicle-v2-erika-exhibition-rival`
- Phase: Conflict
- Description: Answer Celia’s public challenge with the patient strategy the committee has underestimated.
- Win text: Player wins: “You proved patience can be every bit as persuasive as spectacle. I’ll make sure the committee hears about this.”
- Loss text: Player loses: “A graceful victory. The exhibition needs trainers who can make a battle feel like a conversation.”

#### 15. Scene: Beautiful Restraint

- Activity ID: `chronicle-v2-erika-the-applause`
- Phase: Conflict
- Description: Erika wins the battle and is praised for the same silence that diminishes Sumi.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Erika's Tangela waited through Celia's opening pressure, changed the field with powder and closed the match without touching the display beds. The applause arrived warm and immediate.”<br>
     Button: Continue
  2. **Exhibition Steward:** “Extraordinary restraint. The League could ask for no finer temperament in Celadon's Leader.”<br>
     Button: Continue
  3. **Celia:** “They watched you say exactly what you meant with your Pokemon. Then they applauded you for saying nothing with your own voice.”<br>
     Button: Continue
  4. **Erika:** “You think I do not know that?”<br>
     Button: Continue
  5. **Celia:** “I think you know exactly what you are doing, and I think that is the problem.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 16. Scene: What the Family Protects

- Activity ID: `chronicle-v2-erika-the-warehouse-threat`
- Phase: Conflict
- Description: Erika learns why Sumi asked her not to speak.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Sumi:** “My brother's dye workshop rents this building from your uncle. Your mother reminded me the lease is reviewed next month.”<br>
     Button: Continue
  2. **Erika:** “She threatened your family because I changed a label.”<br>
     Button: Continue
  3. **Sumi:** “She described the network of obligations that keeps us all comfortable. No threat needed to be stated.”<br>
     Button: Continue
  4. **Erika:** “I can refuse the Gym appointment.”<br>
     Button: Continue
  5. **Sumi:** “And then someone equally well connected accepts it. Please do not turn my name into the reason you surrender every place you might one day change.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 17. Scene: The Price of the Garden

- Activity ID: `chronicle-v2-erika-mothers-terms`
- Phase: Conflict
- Description: The Gym land is offered on terms that make Erika's status both leverage and restraint.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Erika's Mother:** “The family will donate the garden if you accept the appointment. Sumi keeps her position. The workshop lease remains favourable.”<br>
     Button: Continue
  2. **Erika:** “And the fragrance?”<br>
     Button: Continue
  3. **Erika's Mother:** “House Tamamushi owns work commissioned in its greenhouse.”<br>
     Button: Continue
  4. **Erika:** “You are making a Gym out of the same arrangement.”<br>
     Button: Continue
  5. **Erika's Mother:** “I am giving you influence. Refusing it to preserve your innocence would help nobody beneath you.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 18. Scene: What Silence Preserves

- Activity ID: `chronicle-v2-erika-among-closed-flowers`
- Phase: Contemplation
- Description: Erika weighs which cost she can live with.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “At dusk, the greenhouse flowers closed without an audience. Erika stood in the dark for a while and did not reach a good answer.”<br>
     Button: Continue
  2. **Erika:** “If I speak, Sumi pays first. If I do not, Mother learns the threat works.”<br>
     Button: Continue
  3. **Sumi:** “Then either choice is going to cost someone. You just get to pick who.”<br>
     Button: Continue
  4. **Erika:** “Celia would speak.”<br>
     Button: Continue
  5. **Sumi:** “Celia can afford to cause a scene. Her family does not rent from yours.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 19. Scene: No Easy Acquittal

- Activity ID: `chronicle-v2-erika-celias-farewell`
- Phase: Contemplation
- Description: Celia refuses to condemn Erika, but also refuses to call her helpless.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Celia:** “I was unfair to ask for heroism while Sumi stood in the blast line.”<br>
     Button: Continue
  2. **Erika:** “You were right that I hid inside a graceful answer.”<br>
     Button: Continue
  3. **Celia:** “Both can be true. I do not need you to be wicked to be disappointed in you.”<br>
     Button: Continue
  4. **Erika:** “Will you testify for my League appointment?”<br>
     Button: Continue
  5. **Celia:** “Yes. You are the best trainer for it. I will also tell them exactly what happened here.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 20. Scene: A Name Beneath the Drawer

- Activity ID: `chronicle-v2-erika-the-private-label`
- Phase: Contemplation
- Description: Erika records the truth where it cannot yet alter the public story.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Erika wrote Sumi Arai, Formula Four in the greenhouse ledger and sealed a copy of the method beneath the specimen drawer. It was not justice. Its smallness made her ashamed, which was why she refused to call it enough.”<br>
     Button: Continue
  2. **Sumi:** “One day the label may be safe to show.”<br>
     Button: Continue
  3. **Erika:** “If that day ever comes.”<br>
     Button: Continue
  4. **Sumi:** “Then keep the promise where you must look at it while you work.”<br>
     Button: Continue
  5. **Erika:** “I can do that. I wish I had done more.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 21. Scene: A Candidate With Conditions

- Activity ID: `chronicle-v2-erika-the-league-table`
- Phase: Resolution
- Description: Erika accepts the assessment without pretending the opportunity was freely chosen.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Exhibition Steward:** “Your battle demonstration was exceptional. Your family's garden meets every requirement. Do you accept nomination as Celadon Gym Leader?”<br>
     Button: Continue
  2. **Erika:** “I accept, with employment contracts for greenhouse staff independent of my family's household and published attribution for future Gym research.”<br>
     Button: Continue
  3. **Erika's Mother:** “Those details can be discussed privately.”<br>
     Button: Continue
  4. **Erika:** “Then my acceptance can also be discussed privately.”<br>
     Button: Continue
  5. **Exhibition Steward:** “The League will put the conditions in writing.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 22. Battle: The Rainbow Assessment

- Activity ID: `chronicle-v2-erika-league-steward`
- Phase: Resolution
- Description: Earn authority over the garden without pretending the opportunity came without conditions.
- Win text: Player wins: “The assessment is complete. You have shown the care and judgement this role requires.”
- Loss text: Player loses: “A worthy result. The League needs trainers who know when to adapt as much as when to attack.”

#### 23. Scene: Leader of Celadon Gym

- Activity ID: `chronicle-v2-erika-the-rainbow-key`
- Phase: Resolution
- Description: Erika gains authority through the status that constrained her.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Exhibition Steward:** “The Rainbow licence is granted. Your methods showed patience without passivity and control without needless force.”<br>
     Button: Continue
  2. **Erika:** “Those distinctions are easier in battle.”<br>
     Button: Continue
  3. **Erika's Mother:** “You represented the family beautifully.”<br>
     Button: Continue
  4. **Erika:** “I represented the Gym. That is who I am now.”<br>
     Button: Continue
  5. **Narration:** “Her mother smiled for the photographers. Erika smiled too. Neither expression resolved the sentence between them.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 24. Scene: What Changes on Paper

- Activity ID: `chronicle-v2-erika-sumis-contract`
- Phase: Resolution
- Description: The new contract protects Sumi's future work but cannot repair the exhibition.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Sumi:** “The League contract names me chief horticultural technician. My formulas remain mine unless I assign them.”<br>
     Button: Continue
  2. **Erika:** “Formula Four is excluded. Mother would not yield it.”<br>
     Button: Continue
  3. **Sumi:** “I know.”<br>
     Button: Continue
  4. **Erika:** “I need you to know I did not decide that was acceptable.”<br>
     Button: Continue
  5. **Sumi:** “Then stop dwelling on the one we lost and build the next one properly.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 25. Scene: The Unspoken Bloom

- Activity ID: `chronicle-v2-erika-the-hidden-bottle`
- Phase: Reflection
- Description: Erika keeps the original formula as a private reminder of what her composure cost.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Years later, a plain bottle remained in the locked specimen drawer. Its paper label had yellowed around Sumi's name. Erika never displayed it at the Gym and never allowed House Tamamushi No. 4 to be used there.”<br>
     Button: Continue
  2. **Celia:** “You could tell the story now. Your position is secure.”<br>
     Button: Continue
  3. **Erika:** “Sumi's brother still leases the warehouse. My position is secure because the same web remains.”<br>
     Button: Continue
  4. **Celia:** “So you will wait again.”<br>
     Button: Continue
  5. **Erika:** “Yes. I am not asking you to find that admirable.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 26. Scene: A Garden That Remembers

- Activity ID: `chronicle-v2-erika-after-closing`
- Phase: Reflection
- Description: The memory ends without granting Erika the courage she did not choose.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “After closing, Erika checked each bench and wrote every assistant's name beside the work completed that day. The practice became ordinary enough that nobody called it reform.”<br>
     Button: Continue
  2. **Sumi:** “The night-blooming cereus may open tomorrow.”<br>
     Button: Continue
  3. **Erika:** “Will anyone be here to see it?”<br>
     Button: Continue
  4. **Sumi:** “It will open whether we are here or not.”<br>
     Button: Continue
  5. **Narration:** “Erika turned off the public lights but left one lamp above the specimen drawer. She had become a Leader. She had not become free.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

### Source files

- Story: [erika.ts](../../src/data/gym-leader-chronicles/stories/erika.ts)
- Expedition: [gym-leader-chronicles.ts](../../src/data/expeditions/entries/gym-leader-chronicles.ts)
- Battles: [gym-leader-chronicles.ts](../../src/data/battles/entries/gym-leader-chronicles.ts)


## Koga: The Unwritten Path

- Badge: Soul Badge
- Chronicle player title: Fuchsia Gym Leader
- Memory marker ID: `soul-badge-memory-revealed`
- Memory marker title: Koga's Badge Memory
- Memory marker description: The Soul Badge has opened a memory from Koga's past.
- Expedition ID: `koga-soul-badge-chronicle`
- Expedition title: Koga: The Unwritten Path
- Expedition description: Step into the memory held by the Soul Badge and witness the choices that shaped Koga.
- Expedition button: Enter the Memory

### Ordered story and activity copy

#### 1. Scene: The Inherited Course

- Activity ID: `chronicle-v2-koga-the-copied-step`
- Phase: Backstory
- Description: Ren corrects Koga's technique while Janine asks why one step in the route works the way it does.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Every flagstone in the Fuchsia courtyard carried a lesson older than its students. Koga could cross them blindfolded because Master Ren had corrected the same seven steps until they felt like instinct.”<br>
     Button: Continue
  2. **Master Ren:** “We do not change the course during exercise. If you want to argue a step, you do it here, with me, before we start.”<br>
     Button: Continue
  3. **Koga:** “First shadow, low wall, false opening, retreat. Again.”<br>
     Button: Continue
  4. **Janine:** “Why is the third opening false?”<br>
     Button: Continue
  5. **Koga:** “Because the course says it is.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 2. Game: Read the Shadow Marks

- Activity ID: `chronicle-v2-koga-read-the-shadow-marks`
- Phase: Backstory
- Description: Identify the Pokemon in Ren's training exercises, the ones Koga can name without thinking.
- Chronicle-specific enter/exit modal copy: none authored; the shared game screen supplies its controls.

#### 3. Scene: A Question in Chalk

- Activity ID: `chronicle-v2-koga-janines-mark`
- Phase: Backstory
- Description: Janine draws an alternative route on the flagstones. Koga wipes it off.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Janine:** “If the wind comes from the west, the powder crosses the retreat line. This stone is safer.”<br>
     Button: Continue
  2. **Koga:** “During the exercise, you follow the set route.”<br>
     Button: Continue
  3. **Janine:** “Even when the set route is wrong?”<br>
     Button: Continue
  4. **Master Ren:** “Especially then. The test needs consistent conditions or it means nothing.”<br>
     Button: Continue
  5. **Narration:** “Koga wiped away Janine's chalk mark. Its outline stayed in the stone dust.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 4. Scene: A Name Already Written

- Activity ID: `chronicle-v2-koga-the-succession-scroll`
- Phase: Backstory
- Description: Ren shows Koga a succession document that was prepared without consulting Janine.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Master Ren:** “The League will license Fuchsia Gym soon. Your name keeps the method intact.”<br>
     Button: Continue
  2. **Koga:** “Janine has the sharper field sense.”<br>
     Button: Continue
  3. **Master Ren:** “She would want to change too much. A Leader has to keep things stable.”<br>
     Button: Continue
  4. **Koga:** “And if a stable answer is wrong?”<br>
     Button: Continue
  5. **Master Ren:** “Then the student failed to carry it out correctly.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 5. Scene: The Empty Cabinet

- Activity ID: `chronicle-v2-koga-missing-case`
- Phase: Development
- Description: A case of restricted antidote precursors disappears from the apothecary.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “The missing case held no dramatic poison, only concentrated antidote precursors that were dangerous in the wrong proportions. The inventory seal had been cut and replaced with a copy good enough to fool a hurried glance.”<br>
     Button: Continue
  2. **Master Ren:** “Follow the marked route. I don't want anyone going off on their own.”<br>
     Button: Continue
  3. **Janine:** “The footprints start after the lock was opened. Someone laid a trail for us.”<br>
     Button: Continue
  4. **Koga:** “We follow it until we know why it was laid.”<br>
     Button: Continue
  5. **Janine:** “Good. At least you are not trusting it yet.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 6. Scene: The Trail Designed to Be Seen

- Activity ID: `chronicle-v2-koga-rooftop-signs`
- Phase: Development
- Description: Koga and Janine work out that the rooftop signs were placed there to be followed.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Koga:** “Broken tile, purple thread, heel mark. Too regular.”<br>
     Button: Continue
  2. **Janine:** “And all on the bright side of the roof. A real escape uses the shaded gutter.”<br>
     Button: Continue
  3. **Koga:** “Ren's course uses the marked bridge.”<br>
     Button: Continue
  4. **Janine:** “The marked bridge is where the footprints go.”<br>
     Button: Continue
  5. **Koga:** “Then we cross far enough to see who is waiting, not far enough to walk into them.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 7. Game: Cross the Unmarked Roofs

- Activity ID: `chronicle-v2-koga-cross-the-unmarked-roofs`
- Phase: Development
- Description: Trace Janine's route from memory. She never wrote it down.
- Chronicle-specific enter/exit modal copy: none authored; the shared game screen supplies its controls.

#### 8. Scene: The Perfect Decoy

- Activity ID: `chronicle-v2-koga-jiro-in-the-bell-tower`
- Phase: Development
- Description: Jiro is waiting at the bell tower with an empty case and a confession that does not hold up.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Jiro:** “You caught me. I wanted to sell the formula. The case is there.”<br>
     Button: Continue
  2. **Janine:** “It is clean inside. You carried this after someone took the bottles out.”<br>
     Button: Continue
  3. **Koga:** “Your confession does not name a buyer, a route, or a price.”<br>
     Button: Continue
  4. **Jiro:** “I am confessing. Is that not what you came for?”<br>
     Button: Continue
  5. **Koga:** “No. A confession needs to say something true.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 9. Battle: The Perfect Decoy

- Activity ID: `chronicle-v2-koga-decoy-thief`
- Phase: Development
- Description: Test Jiro’s rehearsed confession instead of accepting the convenient ending.
- Win text: Player wins: “A defeat, then. I’ll review every turn and identify precisely where the experiment went wrong.”
- Loss text: Player loses: “An excellent result. My decisions were consistent, efficient, and difficult to counter.”

#### 10. Scene: A Debt Forgiven

- Activity ID: `chronicle-v2-koga-the-paid-decoy`
- Phase: Development
- Description: Jiro admits that Master Ren arranged the whole theft to test Koga's loyalty.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Jiro:** “Master Ren cleared my family's medicine debt. I carried the empty case and waited where his route ends.”<br>
     Button: Continue
  2. **Janine:** “The real bottles never left the estate.”<br>
     Button: Continue
  3. **Koga:** “This was a succession examination.”<br>
     Button: Continue
  4. **Jiro:** “He said a worthy heir would follow the method, catch me, and stop asking questions.”<br>
     Button: Continue
  5. **Janine:** “So the part where you kept asking is the only part he did not want.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 11. Scene: The Planted Mistake

- Activity ID: `chronicle-v2-koga-rens-explanation`
- Phase: Conflict
- Description: Ren tells Koga the fake theft is a tradition and that Koga was supposed to return the case quietly.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Master Ren:** “Every heir faces a false theft. The decoy tests precision. The hidden case tests discretion. You were meant to return it quietly.”<br>
     Button: Continue
  2. **Koga:** “You made a desperate man confess to a crime he did not commit.”<br>
     Button: Continue
  3. **Master Ren:** “I cleared his debt. He agreed.”<br>
     Button: Continue
  4. **Janine:** “You took advantage of a sick family, Ren. That is not an agreement.”<br>
     Button: Continue
  5. **Master Ren:** “I did not ask for a lecture from a student.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 12. Scene: The Wrong Mixture

- Activity ID: `chronicle-v2-koga-the-sealed-bottles`
- Phase: Conflict
- Description: One of the hidden bottles has cracked and the contents are mixing.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Behind the false wall, one bottle had cracked against its brace. Two clear precursors ran together across the tray, releasing a sweet vapour that numbed Koga's tongue.”<br>
     Button: Continue
  2. **Koga:** “Masks on. Do not use the standard neutraliser until we identify both components.”<br>
     Button: Continue
  3. **Master Ren:** “The labels are coded. I know the sequence.”<br>
     Button: Continue
  4. **Janine:** “The lower label is gone. Your sequence is missing a step.”<br>
     Button: Continue
  5. **Koga:** “Tell me the components from the top. I will work backwards from the reaction.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 13. Game: Separate the Toxins

- Activity ID: `chronicle-v2-koga-separate-the-toxins`
- Phase: Conflict
- Description: Identify the stolen toxin samples before the trail goes cold.
- Chronicle-specific enter/exit modal copy: none authored; the shared game screen supplies its controls.

#### 14. Scene: The Course Fails

- Activity ID: `chronicle-v2-koga-courtyard-exposure`
- Phase: Conflict
- Description: Vapour from the cracked bottle reaches the western retreat line that Janine flagged as unsafe.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “The ventilation shutters carried the vapour into the courtyard. It settled along the western retreat line. Students on the old course moved straight toward it.”<br>
     Button: Continue
  2. **Janine:** “Use my route! Low wall, then the shaded gutter!”<br>
     Button: Continue
  3. **Master Ren:** “Hold the line. Do not break formation.”<br>
     Button: Continue
  4. **Koga:** “Students, follow Janine. Her route is clear.”<br>
     Button: Continue
  5. **Master Ren:** “Countermand me now and your succession is over.”<br>
     Button: Continue
  6. **Koga:** “Then it ends with everyone breathing.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 15. Battle: The Toxin Evacuation

- Activity ID: `chronicle-v2-koga-tunnel-culprit`
- Phase: Conflict
- Description: Clear the exposed courtyard by trusting Janine’s unmarked route.
- Win text: Player wins: “Good. You trusted the route and got everyone through it. That is what a real field leader does.”
- Loss text: Player loses: “You kept your footing through every feint. I could learn a thing or two from that.”

#### 16. Scene: The Price of Being Right

- Activity ID: `chronicle-v2-koga-after-the-evacuation`
- Phase: Conflict
- Description: Janine's route kept everyone safe. Koga tells her he should have listened sooner.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Koga:** “Your route held. I should have listened when you explained it, not just let you mark the stone and wiped it off.”<br>
     Button: Continue
  2. **Janine:** “Testing something is not the same as trusting the person who said it.”<br>
     Button: Continue
  3. **Koga:** “No. It is not.”<br>
     Button: Continue
  4. **Master Ren:** “Don't apologise to a student because the wind happened to favour her.”<br>
     Button: Continue
  5. **Koga:** “The wind was coming from the west. She knew that two weeks ago.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 17. Scene: The Blank Scroll

- Activity ID: `chronicle-v2-koga-ren-closes-the-school`
- Phase: Conflict
- Description: Ren revokes Koga's succession and says the school has no future without his name behind it.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Master Ren:** “Without our family method, the League will reject this Gym. I am withdrawing the property, the curriculum, and the name.”<br>
     Button: Continue
  2. **Koga:** “The League doesn't care about the family name. They care about the safety record.”<br>
     Button: Continue
  3. **Master Ren:** “And what will you teach instead?”<br>
     Button: Continue
  4. **Janine:** “How to check conditions before committing to a route.”<br>
     Button: Continue
  5. **Narration:** “Ren tore Koga's name from the succession scroll and set it back on the table.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 18. Scene: Where the Map Ends

- Activity ID: `chronicle-v2-koga-unwritten-route`
- Phase: Contemplation
- Description: Koga and Janine build a lesson that changes based on conditions rather than a fixed route.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Koga:** “I erased your chalk because I did not want to explain to Ren why I let a student change the route.”<br>
     Button: Continue
  2. **Janine:** “If the conditions change and you freeze up waiting for the fixed answer, the students are stuck.”<br>
     Button: Continue
  3. **Koga:** “You will help design the League course.”<br>
     Button: Continue
  4. **Janine:** “Put me on review, not design. If I help build it I will not spot what is wrong with it.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 19. Scene: A Witness With a Choice

- Activity ID: `chronicle-v2-koga-jiros-statement`
- Phase: Contemplation
- Description: Koga asks Jiro to give an account to the League and tells him he does not have to make it sound better than it was.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Koga:** “The League needs to hear what happened. You do not have to say anything more than that.”<br>
     Button: Continue
  2. **Jiro:** “Why trust a confession from someone who lied?”<br>
     Button: Continue
  3. **Koga:** “Because understanding why you lied helps us show what Ren did.”<br>
     Button: Continue
  4. **Jiro:** “Write that I did it because my family owed him. Don't put anything in there about courage.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 20. Scene: The Method and the Man

- Activity ID: `chronicle-v2-koga-koga-before-ren`
- Phase: Contemplation
- Description: Koga tells Ren what he is keeping from his training and what he is not.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Koga:** “The method is good. I am keeping it.”<br>
     Button: Continue
  2. **Master Ren:** “The League will not recognise a school without my endorsement.”<br>
     Button: Continue
  3. **Koga:** “I spoke to them last week. They have questions about the succession test and Jiro's family.”<br>
     Button: Continue
  4. **Master Ren:** “Then we have nothing more to discuss.”<br>
     Button: Continue
  5. **Koga:** “No. We never really did.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 21. Scene: The Unwritten Path

- Activity ID: `chronicle-v2-koga-succession-match`
- Phase: Resolution
- Description: Ren changes his opening formation and the League watches as Koga has to abandon his prepared sequence.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Ren changed his opening formation for the first time Koga could remember. The familiar counters became traps. Janine stood outside the ring and offered no rescue.”<br>
     Button: Continue
  2. **Janine:** “Stop standing there. Decide.”<br>
     Button: Continue
  3. **Koga:** “I was hoping for something more specific.”<br>
     Button: Continue
  4. **Janine:** “The wind is west. That is all you get.”<br>
     Button: Continue
  5. **Master Ren:** “Candidate, begin.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 22. Battle: Ren's Succession Match

- Activity ID: `chronicle-v2-koga-ren-succession`
- Phase: Resolution
- Description: Face the inherited method after its author changes every expected opening.
- Win text: Player wins: “You respected the old forms without letting them dictate your next move. That is a worthy successor.”
- Loss text: Player loses: “You read the tradition and then made it your own. Master Koga would approve.”

#### 23. Scene: Leader of Fuchsia Gym

- Activity ID: `chronicle-v2-koga-soul-licence`
- Phase: Resolution
- Description: Koga wins and earns the Gym licence without inheriting Ren's ownership of it.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Master Ren:** “You used a retreat I never taught you.”<br>
     Button: Continue
  2. **Koga:** “Janine marked it weeks ago.”<br>
     Button: Continue
  3. **Janine:** “Took him a while.”<br>
     Button: Continue
  4. **Narration:** “The League licence named Koga as Leader and required an independent safety board. Ren signed as witness, not master.”<br>
     Button: Continue
  5. **Koga:** “The first course starts tomorrow. Every route gets reviewed against the actual conditions before anyone calls it correct.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 24. Scene: A Course With Erasers

- Activity ID: `chronicle-v2-koga-janines-first-class`
- Phase: Resolution
- Description: Janine teaches the opening lesson and leaves the last section of the route unmarked.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Janine:** “Your task is to cross the courtyard. Halfway through, I will change one condition.”<br>
     Button: Continue
  2. **Student:** “Which condition?”<br>
     Button: Continue
  3. **Narration:** “The students stared at the blank final section. Koga set pieces of chalk beside the starting line.”<br>
     Button: Continue
  4. **Koga:** “You may mark a route. You may erase it. You may ask why the person before you chose differently.”<br>
     Button: Continue
  5. **Janine:** “Check the conditions before you commit to a route. That is all.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 25. Scene: What Is Preserved

- Activity ID: `chronicle-v2-koga-rens-last-lesson`
- Phase: Reflection
- Description: Ren visits the school a year later and asks whether the new approach made the students stronger.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Master Ren:** “The school is noisier now.”<br>
     Button: Continue
  2. **Koga:** “Yes. They ask a lot of questions.”<br>
     Button: Continue
  3. **Master Ren:** “And has it made them stronger?”<br>
     Button: Continue
  4. **Koga:** “They argue more. But when they commit to a route they can explain why.”<br>
     Button: Continue
  5. **Master Ren:** “That sounds like what I used to say.”<br>
     Button: Continue
  6. **Koga:** “Probably. Ask me in ten years.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 26. Scene: The Daughter's Method

- Activity ID: `chronicle-v2-koga-chalk-in-the-rain`
- Phase: Reflection
- Description: Janine draws a new route in the courtyard and asks Koga to find the flaw.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Rain washed Janine's latest route off the courtyard. The next morning she drew another, shifted two stones, and asked Koga to find the flaw.”<br>
     Button: Continue
  2. **Koga:** “The eastern landing is exposed.”<br>
     Button: Continue
  3. **Janine:** “Only if the wind changes.”<br>
     Button: Continue
  4. **Koga:** “It always does.”<br>
     Button: Continue
  5. **Narration:** “Koga wrote it in the training log. Janine updated it again two days later without mentioning it until he asked.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

### Source files

- Story: [koga.ts](../../src/data/gym-leader-chronicles/stories/koga.ts)
- Expedition: [gym-leader-chronicles.ts](../../src/data/expeditions/entries/gym-leader-chronicles.ts)
- Battles: [gym-leader-chronicles.ts](../../src/data/battles/entries/gym-leader-chronicles.ts)


## Sabrina: The Quiet Room

- Badge: Marsh Badge
- Chronicle player title: The Girl Who Heard Everything
- Memory marker ID: `marsh-badge-memory-revealed`
- Memory marker title: Sabrina's Badge Memory
- Memory marker description: The Marsh Badge has opened a memory from Sabrina's past.
- Expedition ID: `sabrina-marsh-badge-chronicle`
- Expedition title: Sabrina: The Quiet Room
- Expedition description: Step into the memory held by the Marsh Badge and witness the choices that shaped Sabrina.
- Expedition button: Enter the Memory

### Ordered story and activity copy

#### 1. Scene: Before the Sound

- Activity ID: `chronicle-v2-sabrina-the-spoon-before-it-falls`
- Phase: Backstory
- Description: Sabrina's parents discover she can hear what they are thinking before they speak.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “The first spoon bent before it hit the floor. Sabrina had heard her mother think careful, heard her father think not again, and moved before either of them spoke.”<br>
     Button: Continue
  2. **Younger Sabrina:** “You are still thinking about the glass.”<br>
     Button: Continue
  3. **Mother:** “We are not angry.”<br>
     Button: Continue
  4. **Younger Sabrina:** “Dad is worried it will break. You are worried that I know.”<br>
     Button: Continue
  5. **Father:** “You should rest.”<br>
     Button: Continue
  6. **Narration:** “After that, rest was what they suggested whenever they did not know what else to say.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 2. Scene: A Room Made Empty

- Activity ID: `chronicle-v2-sabrina-the-quiet-room`
- Phase: Backstory
- Description: Her parents clear a room of anything that responds to her power and tell her it is somewhere safe.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “They emptied a room of mirrors, clocks, and metal toys. Thick curtains muffled the neighbours' thoughts. Sabrina could breathe there, but she could not mistake breathing for living.”<br>
     Button: Continue
  2. **Mother:** “Tell us when it gets to be too much and we will close the door.”<br>
     Button: Continue
  3. **Younger Sabrina:** “Closing the door doesn't help. I can still hear you.”<br>
     Button: Continue
  4. **Father:** “We are trying to make somewhere safe.”<br>
     Button: Continue
  5. **Younger Sabrina:** “Safe for who?”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 3. Game: Hold the Focus Pattern

- Activity ID: `chronicle-v2-sabrina-hold-the-focus-pattern`
- Phase: Backstory
- Description: Reassemble the psychic route that guides Porygon toward the first Silph receiver.
- Chronicle-specific enter/exit modal copy: none authored; the shared game screen supplies its controls.

#### 4. Scene: The Researcher Who Asks

- Activity ID: `chronicle-v2-sabrina-orlas-visit`
- Phase: Backstory
- Description: Dr Orla is the first adult to ask permission before running any test.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Dr Orla:** “I study psychic perception. I have three exercises, and you can refuse any or all of them.”<br>
     Button: Continue
  2. **Younger Sabrina:** “If I say no, will you think I wasted your trip?”<br>
     Button: Continue
  3. **Dr Orla:** “Probably. You are allowed to disappoint me.”<br>
     Button: Continue
  4. **Younger Sabrina:** “Nobody says that.”<br>
     Button: Continue
  5. **Dr Orla:** “Then that is a problem with adults.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 5. Scene: A Useful Gift

- Activity ID: `chronicle-v2-sabrina-the-silph-offer`
- Phase: Backstory
- Description: Silph offers Sabrina access to equipment that could help her control what she hears.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Director Venn:** “Our teleport division can teach you to narrow the signal. In return, your perception can catch instabilities our instruments miss.”<br>
     Button: Continue
  2. **Father:** “Would the work be safe?”<br>
     Button: Continue
  3. **Director Venn:** “Safer than an untrained child moving furniture in her sleep.”<br>
     Button: Continue
  4. **Younger Sabrina:** “You thought that before he said it.”<br>
     Button: Continue
  5. **Father:** “I want you to have help.”<br>
     Button: Continue
  6. **Dr Orla:** “That is different from access. If you want her involved, her right to stop needs to be in the contract.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 6. Scene: Learning to Choose One Voice

- Activity ID: `chronicle-v2-sabrina-signals-and-shapes`
- Phase: Development
- Description: Sabrina practises narrowing her focus during lab sessions while Director Venn watches the clock.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Dr Orla:** “Do not try to force everything quiet. Just focus on one shape and let the background fade.”<br>
     Button: Continue
  2. **Sabrina:** “Director Venn is counting how long I take.”<br>
     Button: Continue
  3. **Dr Orla:** “He can count. You set the pace.”<br>
     Button: Continue
  4. **Director Venn:** “The company does have a schedule.”<br>
     Button: Continue
  5. **Sabrina:** “I heard that.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 7. Game: Find the True Shape

- Activity ID: `chronicle-v2-sabrina-find-the-true-shape`
- Phase: Development
- Description: Separate Porygon’s real signal from the Pokémon shapes caught in the psychic feedback.
- Chronicle-specific enter/exit modal copy: none authored; the shared game screen supplies its controls.

#### 8. Scene: The First Split Signal

- Activity ID: `chronicle-v2-sabrina-porygon-between-terminals`
- Phase: Development
- Description: Sabrina detects a Porygon that has not finished arriving at either terminal.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “The receiver showed a successful transfer. Sabrina heard the same thought coming from both terminals: a simple request to finish becoming somewhere.”<br>
     Button: Continue
  2. **Sabrina:** “Porygon is still in the signal.”<br>
     Button: Continue
  3. **Director Venn:** “Both terminals report empty.”<br>
     Button: Continue
  4. **Dr Orla:** “The instruments only see what they're calibrated for. Sabrina, where does it feel strongest?”<br>
     Button: Continue
  5. **Sabrina:** “It's not an echo. It's the same. It hasn't finished going anywhere.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 9. Game: Enter the Quiet Room

- Activity ID: `chronicle-v2-sabrina-enter-the-quiet-room`
- Phase: Development
- Description: Avoid the memory rifts and reach the gold doorway in the back wall—the exit Sabrina mapped before anyone gave her a proper room to work in.
- Chronicle-specific enter/exit modal copy: none authored; the shared game screen supplies its controls.

#### 10. Scene: A Door Held Open

- Activity ID: `chronicle-v2-sabrina-the-extraction-plan`
- Phase: Development
- Description: Sabrina proposes entering the signal herself and names who is allowed to end the test.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Sabrina:** “I can hold one destination steady if someone closes the other at the exact moment Porygon chooses.”<br>
     Button: Continue
  2. **Director Venn:** “Excellent. Begin.”<br>
     Button: Continue
  3. **Dr Orla:** “Wait. She needs to name the stop condition first, and who can call it.”<br>
     Button: Continue
  4. **Sabrina:** “If I stop talking, disconnect both receivers. Do not wait for Venn.”<br>
     Button: Continue
  5. **Dr Orla:** “I'll do it.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 11. Battle: Porygon Between Signals

- Activity ID: `chronicle-v2-sabrina-unstable-porygon`
- Phase: Development
- Description: Hold one destination stable long enough for Porygon to choose where to emerge.
- Win text: No trainer result line is shown for this wild battle.
- Loss text: No trainer result line is shown for this wild battle.

#### 12. Scene: A Result Silph Can Sell

- Activity ID: `chronicle-v2-sabrina-the-successful-demonstration`
- Phase: Conflict
- Description: Porygon is recovered. Before Sabrina has recovered, Venn is already describing it to the executives.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Porygon came out intact and exhausted. Before Sabrina had recovered, Venn invited executives into the lab and described a proprietary psychic stabilisation method.”<br>
     Button: Continue
  2. **Director Venn:** “With Sabrina on the receiver team, failed transfers become recoverable.”<br>
     Button: Continue
  3. **Sabrina:** “I am not on any team.”<br>
     Button: Continue
  4. **Director Venn:** “Naturally, the wording can be adjusted.”<br>
     Button: Continue
  5. **Dr Orla:** “The wording is the agreement.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 13. Scene: No Refusal on the Schedule

- Activity ID: `chronicle-v2-sabrina-the-locked-session`
- Phase: Conflict
- Description: Venn schedules another live test and uses Sabrina's parents' fear to secure it.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Mother:** “Director Venn says withdrawing now could make your powers uncontrolled again.”<br>
     Button: Continue
  2. **Sabrina:** “That letter is designed to worry you.”<br>
     Button: Continue
  3. **Father:** “We remember what happened before the quiet room.”<br>
     Button: Continue
  4. **Sabrina:** “So do I. I also remember none of you asked what the room cost me.”<br>
     Button: Continue
  5. **Mother:** “We were afraid.”<br>
     Button: Continue
  6. **Sabrina:** “You were scared, so you did whatever the man with the lab coat said.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 14. Scene: The Researcher Outside the Door

- Activity ID: `chronicle-v2-sabrina-orla-removed`
- Phase: Conflict
- Description: Venn removes Orla from the next session because she is the one who can stop it.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Director Venn:** “Dr Orla's consent protocol is incompatible with emergency commercial testing.”<br>
     Button: Continue
  2. **Dr Orla:** “Consent that disappears in an emergency is theatre.”<br>
     Button: Continue
  3. **Sabrina:** “I will not go in without her.”<br>
     Button: Continue
  4. **Director Venn:** “Your parents authorised the continuation.”<br>
     Button: Continue
  5. **Sabrina:** “My parents can consent to medical decisions. They cannot hand you my focus as a company asset.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 15. Scene: The Room Breaks Open

- Activity ID: `chronicle-v2-sabrina-every-thought-at-once`
- Phase: Conflict
- Description: The lab activates before Sabrina gives permission and every thought in the room arrives at once.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “The receivers activated before Sabrina gave permission. Every thought in the lab arrived at once: Venn's fear of losing the contract, her father's shame, her mother's desperate wish for an ordinary daughter, Orla's plan to cut the power.”<br>
     Button: Continue
  2. **Sabrina:** “Everyone stop-”<br>
     Button: Continue
  3. **Father:** “Sabrina, we are here.”<br>
     Button: Continue
  4. **Sabrina:** “I know. That's the problem.”<br>
     Button: Continue
  5. **Narration:** “Glass rose from the consoles and hung in the air. Porygon cried from the inactive terminal.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 16. Scene: Ask Before Touching

- Activity ID: `chronicle-v2-sabrina-the-stop-word`
- Phase: Conflict
- Description: Koichi reaches Sabrina by waiting for her answer before he does anything.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Koichi:** “Sabrina, I can break the receiver housing. Do you want me to?”<br>
     Button: Continue
  2. **Director Venn:** “Do it now!”<br>
     Button: Continue
  3. **Koichi:** “I wasn't asking you.”<br>
     Button: Continue
  4. **Sabrina:** “Wait. Porygon is using the field. On my count, hit the left housing only.”<br>
     Button: Continue
  5. **Koichi:** “Got it.”<br>
     Button: Continue
  6. **Narration:** “Waiting gave Sabrina one quiet thought to hold onto.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 17. Scene: A Contract Refused

- Activity ID: `chronicle-v2-sabrina-silph-door-closes`
- Phase: Conflict
- Description: Sabrina ends the research relationship and tells her father he can come if he stops deciding for her.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Director Venn:** “Without Silph equipment, episodes like this will come back.”<br>
     Button: Continue
  2. **Sabrina:** “This episode happened because you switched it on.”<br>
     Button: Continue
  3. **Father:** “We are leaving.”<br>
     Button: Continue
  4. **Sabrina:** “Don't say 'we.' You can come if you want, but I'm making my own decisions from here.”<br>
     Button: Continue
  5. **Dr Orla:** “I have copied the consent records. Silph will answer for the breach.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 18. Scene: What Fear Did

- Activity ID: `chronicle-v2-sabrina-family-in-the-dojo`
- Phase: Contemplation
- Description: Sabrina's parents try to explain what they were afraid of and what they did about it.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Mother:** “I kept wishing you were easier. Not because anything was wrong with you, I just did not know what to do.”<br>
     Button: Continue
  2. **Father:** “Every expert who sounded certain became someone I wanted to obey.”<br>
     Button: Continue
  3. **Sabrina:** “Even when the expert wanted access to me.”<br>
     Button: Continue
  4. **Father:** “Yes. I am sorry.”<br>
     Button: Continue
  5. **Sabrina:** “I know you mean it. It doesn't make it faster.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 19. Scene: Rules for a Focus Battle

- Activity ID: `chronicle-v2-sabrina-koichis-offer`
- Phase: Contemplation
- Description: Koichi offers to train with Sabrina and gives her control over every condition.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Koichi:** “The Fighting Dojo cannot quiet other minds. We can give you one opponent who says what he is going to do before he does it.”<br>
     Button: Continue
  2. **Sabrina:** “You announce your attacks?”<br>
     Button: Continue
  3. **Koichi:** “Until you ask me not to. You control the distance, the length, and the stop word.”<br>
     Button: Continue
  4. **Sabrina:** “And if I hear you worrying that I am dangerous?”<br>
     Button: Continue
  5. **Koichi:** “Then that is my problem to deal with, not yours.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 20. Battle: Koichi's Focus Test

- Activity ID: `chronicle-v2-sabrina-koichis-focus-test`
- Phase: Contemplation
- Description: Battle under consent-led rules where pausing is a technique, not a failure.
- Win text: Player wins: “You knew when to press and when to pause. Focus is not force; you understood the lesson.”
- Loss text: Player loses: “A thoughtful battle. You fought with discipline and gave your Pokémon room to respond.”

#### 21. Scene: A Mind Still Crowded

- Activity ID: `chronicle-v2-sabrina-not-cured`
- Phase: Contemplation
- Description: The training helps Sabrina hold focus longer but does not stop her hearing the crowd.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Koichi:** “You held focus longer today.”<br>
     Button: Continue
  2. **Sabrina:** “I also heard every spectator wondering if I would lose control.”<br>
     Button: Continue
  3. **Koichi:** “You don't have to feel fine about it yet.”<br>
     Button: Continue
  4. **Sabrina:** “People want to hear it's fixed.”<br>
     Button: Continue
  5. **Dr Orla:** “So we build something that works over time, not something with a tidy finish.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 22. Scene: The Quiet Room Rewritten

- Activity ID: `chronicle-v2-sabrina-saffron-proposal`
- Phase: Resolution
- Description: Sabrina proposes running a Gym where consent rules are built into the structure, not left to individuals.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Dr Orla:** “The League needs a Psychic Gym, and Silph's conduct has made independent oversight urgent.”<br>
     Button: Continue
  2. **Sabrina:** “They will call appointing me rehabilitation.”<br>
     Button: Continue
  3. **Koichi:** “Then write it so anyone can see what it actually is.”<br>
     Button: Continue
  4. **Sabrina:** “No unsolicited readings. Every exercise has a stop word. Challengers can refuse to explain themselves.”<br>
     Button: Continue
  5. **Dr Orla:** “And the Leader?”<br>
     Button: Continue
  6. **Sabrina:** “The Leader follows the same rules.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 23. Scene: A Candidate Who Hears the Panel

- Activity ID: `chronicle-v2-sabrina-league-hearing`
- Phase: Resolution
- Description: The League assesses Sabrina knowing she can hear what they are not saying.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Sabrina:** “One of you thinks I am too unstable. One thinks appointing me will repair Silph's reputation. Neither of those things stops you from speaking honestly.”<br>
     Button: Continue
  2. **Dr Orla:** “Sabrina, consent applies to the panel too.”<br>
     Button: Continue
  3. **Sabrina:** “You're right. I shouldn't have said it. That's exactly why the rules need to exist, so it doesn't come down to whether I'm having a good day.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 24. Scene: Leader of Saffron Gym

- Activity ID: `chronicle-v2-sabrina-the-marsh-licence`
- Phase: Resolution
- Description: Sabrina receives the licence and adds a clause that she herself can be corrected.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “The licence required independent review, documented consent, and a permanent right for challengers to end psychic exercises. Sabrina added a fourth clause in her own hand: the Leader may be corrected.”<br>
     Button: Continue
  2. **Mother:** “Are you happy?”<br>
     Button: Continue
  3. **Sabrina:** “I'm tired. And relieved. The anger is still there but it's quieter.”<br>
     Button: Continue
  4. **Father:** “Can we visit tomorrow?”<br>
     Button: Continue
  5. **Sabrina:** “Ask me tomorrow.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 25. Scene: The Door Stays Open

- Activity ID: `chronicle-v2-sabrina-first-session`
- Phase: Resolution
- Description: Sabrina opens her first session by asking the challenger whether they consent to her reading their moves.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Sabrina:** “I can sense the shape of your next move. Do you consent to that being part of the battle?”<br>
     Button: Continue
  2. **Koichi:** “The challenger may say no.”<br>
     Button: Continue
  3. **Sabrina:** “Koichi, they know. Give them time.”<br>
     Button: Continue
  4. **Narration:** “The challenger considered the open door, then set a limit. Sabrina repeated it back before the first command.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 26. Scene: The Rules Remain After the People

- Activity ID: `chronicle-v2-sabrina-orlas-charter`
- Phase: Reflection
- Description: Orla tells Sabrina the consent charter has been adopted by Silph.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Dr Orla:** “Silph adopted the charter after the inquiry. Venn calls it administratively burdensome.”<br>
     Button: Continue
  2. **Sabrina:** “Then it is probably doing work.”<br>
     Button: Continue
  3. **Dr Orla:** “Your name is not on it, as you asked.”<br>
     Button: Continue
  4. **Sabrina:** “Good. The policy should protect people whether they know who I am or not.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 27. Scene: Not Empty

- Activity ID: `chronicle-v2-sabrina-a-quieter-room`
- Phase: Reflection
- Description: Sabrina uses the quiet room she chose to put in the Gym, and Koichi asks if she wants company.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Saffron Gym kept one room without clocks or mirrors. Its door had no lock. Sabrina entered when the city got too loud and left when she chose.”<br>
     Button: Continue
  2. **Koichi:** “Do you want company?”<br>
     Button: Continue
  3. **Sabrina:** “Sit outside. Ten minutes. Don't try to think quietly, it won't work and it'll distract me.”<br>
     Button: Continue
  4. **Koichi:** “I would not know how.”<br>
     Button: Continue
  5. **Narration:** “The room was never empty. It was quiet enough for Sabrina to decide which voice to answer.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

### Source files

- Story: [sabrina.ts](../../src/data/gym-leader-chronicles/stories/sabrina.ts)
- Expedition: [gym-leader-chronicles.ts](../../src/data/expeditions/entries/gym-leader-chronicles.ts)
- Battles: [gym-leader-chronicles.ts](../../src/data/battles/entries/gym-leader-chronicles.ts)


## Blaine: The Last Question

- Badge: Volcano Badge
- Chronicle player title: Cinnabar Researcher
- Memory marker ID: `volcano-badge-memory-revealed`
- Memory marker title: Blaine's Badge Memory
- Memory marker description: The Volcano Badge has opened a memory from Blaine's past.
- Expedition ID: `blaine-volcano-badge-chronicle`
- Expedition title: Blaine: The Last Question
- Expedition description: Step into the memory held by the Volcano Badge and witness the choices that shaped Blaine.
- Expedition button: Enter the Memory

### Ordered story and activity copy

#### 1. Scene: What Is the Heat For?

- Activity ID: `chronicle-v2-blaine-the-first-question`
- Phase: Backstory
- Description: Blaine, Fuji and Nami build Cinnabar's first recovery chamber and agree on when the heat stops.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Cinnabar's first recovery chamber was built for Fire Pokémon pulled half-frozen from winter seas. Blaine designed the heater, Nami designed the evacuation path, and Fuji asked the question they wrote above the door.”<br>
     Button: Continue
  2. **Dr Fuji:** “What is the heat for?”<br>
     Button: Continue
  3. **Blaine:** “Restoring circulation without burning already-injured tissue.”<br>
     Button: Continue
  4. **Nami:** “And when that purpose is met?”<br>
     Button: Continue
  5. **Blaine:** “We shut it down.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 2. Scene: Three Sets of Numbers

- Activity ID: `chronicle-v2-blaine-baseline-morning`
- Phase: Backstory
- Description: A routine morning disagreement about chamber temperature, and how the team resolves it.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Nami:** “Ponyta's pulse says the chamber can go two degrees higher. The wall sensor says one.”<br>
     Button: Continue
  2. **Blaine:** “Then one.”<br>
     Button: Continue
  3. **Dr Fuji:** “Your model predicts two.”<br>
     Button: Continue
  4. **Blaine:** “My model does not have a pulse.”<br>
     Button: Continue
  5. **Nami:** “I am writing that down.”<br>
     Button: Continue
  6. **Narration:** “Their protocols were slow, redundant, and hard to sell to investors. They worked.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 3. Game: Compare the Baselines

- Activity ID: `chronicle-v2-blaine-compare-the-baselines`
- Phase: Backstory
- Description: Check the recovery baselines before Blaine and Fuji approve the first trial.
- Chronicle-specific enter/exit modal copy: none authored; the shared game screen supplies its controls.

#### 4. Scene: A Larger Question

- Activity ID: `chronicle-v2-blaine-the-funded-wing`
- Phase: Backstory
- Description: The League offers funding for a Gym attached to the institute.
- Scene action button: Enter the Scene
- Enter modal:

  1. **League Examiner:** “Cinnabar needs a League facility. A Fire Gym attached to a recovery institute would justify the grant.”<br>
     Button: Continue
  2. **Blaine:** “Battles are not clinical trials.”<br>
     Button: Continue
  3. **League Examiner:** “No, but a Leader who teaches control could make this island a centre for safe Fire training.”<br>
     Button: Continue
  4. **Nami:** “The funding buys the second evacuation stair.”<br>
     Button: Continue
  5. **Dr Fuji:** “It comes with expectations. We should be clear about which ones we won't meet before we sign anything.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 5. Scene: One Degree Over

- Activity ID: `chronicle-v2-blaine-one-more-degree`
- Phase: Backstory
- Description: Blaine runs the chamber above protocol and notes the improved response without noting the deviation.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Blaine:** “Growlithe's recovery plateaued. I held one degree above protocol for forty seconds and the response improved.”<br>
     Button: Continue
  2. **Nami:** “Did you record the overrun?”<br>
     Button: Continue
  3. **Blaine:** “I recorded the response.”<br>
     Button: Continue
  4. **Dr Fuji:** “Those are not the same record.”<br>
     Button: Continue
  5. **Blaine:** “The result was better. That is worth noting.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 6. Scene: Twelve Percent

- Activity ID: `chronicle-v2-blaine-orins-demonstration`
- Phase: Development
- Description: A young researcher named Orin demonstrates an automatic regulator and challenges the lab's safety margins.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Orin:** “Your containment loses twelve percent efficiency because every technician can shut it down.”<br>
     Button: Continue
  2. **Nami:** “That is not a loss. That is twelve percent spent on surviving a technician's mistake.”<br>
     Button: Continue
  3. **Blaine:** “All right. Show me.”<br>
     Button: Continue
  4. **Dr Fuji:** “After he shows all of us the failure state.”<br>
     Button: Continue
  5. **Orin:** “You people ask the least exciting questions first.”<br>
     Button: Continue
  6. **Nami:** “That is why we are still around for the exciting ones.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 7. Battle: Orin's Regulator Test

- Activity ID: `chronicle-v2-blaine-orins-demonstration`
- Phase: Development
- Description: Pressure-test the automatic regulator before the rare response makes caution inconvenient.
- Win text: Player wins: “You stopped the drill when the system needed it. Good judgement is the most important safeguard.”
- Loss text: Player loses: “You kept control without forcing the outcome. That is exactly what this test was meant to show.”

#### 8. Scene: A Result Worth Repeating

- Activity ID: `chronicle-v2-blaine-the-anomaly`
- Phase: Development
- Description: During Orin's test, a Magmar produces a rare thermal response that could transform recovery times.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “During Orin's demonstration, Magmar's body temperature synchronised with the chamber instead of fighting it. The effect could cut difficult recoveries from hours to minutes.”<br>
     Button: Continue
  2. **Blaine:** “Run it again at the same baseline.”<br>
     Button: Continue
  3. **Nami:** “Tomorrow. Magmar has completed its safe exposure.”<br>
     Button: Continue
  4. **Orin:** “The response might be gone after rest.”<br>
     Button: Continue
  5. **Dr Fuji:** “Then we log that it stopped. We are not keeping an injured Pokémon in a hot chamber just because we are curious.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 9. Scene: A Switch Without a Label

- Activity ID: `chronicle-v2-blaine-the-hidden-override`
- Phase: Development
- Description: Blaine installs a manual extension to the chamber regulator without getting it reviewed.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Blaine:** “The regulator shuts down before a clinician can tell stress from breakthrough. I added a sixty-second override.”<br>
     Button: Continue
  2. **Nami:** “Who authorised it?”<br>
     Button: Continue
  3. **Blaine:** “I am the lead researcher.”<br>
     Button: Continue
  4. **Nami:** “That tells me who installed it. I asked who reviewed it.”<br>
     Button: Continue
  5. **Blaine:** “You are reviewing it now.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 10. Scene: The Protocol Divides

- Activity ID: `chronicle-v2-blaine-fuji-withdraws`
- Phase: Development
- Description: Fuji refuses to put his name on the public demonstration while the override is installed.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Dr Fuji:** “Remove the override or declare it as an experimental deviation. I will not put my name on a protocol with a hidden exit.”<br>
     Button: Continue
  2. **Blaine:** “The League visit is in two days. If we cancel, the recovery wing loses its funding.”<br>
     Button: Continue
  3. **Dr Fuji:** “The funding deadline is not a patient. It won't die if we push the date.”<br>
     Button: Continue
  4. **Nami:** “Delay the demonstration, Blaine.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 11. Scene: One More Trial

- Activity ID: `chronicle-v2-blaine-demonstration-day`
- Phase: Conflict
- Description: The League observers arrive. Fuji's station is empty. Nami makes Blaine repeat the shutdown order before they start.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Fuji's station stayed empty. Nami checked both exits and made Blaine repeat the shutdown order before the League observers came in.”<br>
     Button: Continue
  2. **Nami:** “At the first unstable split, I call stop. Not pause. Not evaluate. Stop.”<br>
     Button: Continue
  3. **Blaine:** “Agreed.”<br>
     Button: Continue
  4. **Orin:** “Magmar is calm. Baseline is clean.”<br>
     Button: Continue
  5. **League Examiner:** “Proceed when ready.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 12. Scene: The Answer Blaine Wants

- Activity ID: `chronicle-v2-blaine-the-rising-line`
- Phase: Conflict
- Description: The rare response returns and goes past its safe pattern. Nami calls stop.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Orin:** “Synchronisation at eighty percent. Higher than last time.”<br>
     Button: Continue
  2. **Nami:** “Wall temperature is diverging. Stop.”<br>
     Button: Continue
  3. **Blaine:** “Magmar's pulse is stable. Give it ten seconds.”<br>
     Button: Continue
  4. **Nami:** “That was not our agreement.”<br>
     Button: Continue
  5. **Blaine:** “Ten seconds could tell us whether the response corrects itself.”<br>
     Button: Continue
  6. **Narration:** “Blaine's hand covered the override before he consciously decided to use it.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 13. Game: Emergency Shutdown

- Activity ID: `chronicle-v2-blaine-emergency-shutdown`
- Phase: Conflict
- Description: Carry out the laboratory shutdown without venting heat into an occupied corridor.
- Activity labels:
  - Sound the alarm
  - Clear the corridor
  - Cut the fuel feed
  - Seal the fire door
  - Vent the chamber
  - Cool containment
  - Check every Pokémon
  - Record the final readings
- Chronicle-specific enter/exit modal copy: none authored; the shared game screen supplies its controls.

#### 14. Scene: Nami's Last Question

- Activity ID: `chronicle-v2-blaine-the-failed-door`
- Phase: Conflict
- Description: The chamber ruptures and a warped fire door traps Nami in the corridor while the others get Magmar out.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “The chamber seal ruptured. Heat rolled into the corridor and bowed the new fire door against its frame. Nami stayed at the manual wheel while the others moved Magmar through the second exit.”<br>
     Button: Continue
  2. **Nami:** “What is the heat for, Blaine?”<br>
     Button: Continue
  3. **Blaine:** “Nami, leave the wheel.”<br>
     Button: Continue
  4. **Nami:** “Answer the question.”<br>
     Button: Continue
  5. **Blaine:** “Nothing now. It is for nothing. Shut it all down.”<br>
     Button: Continue
  6. **Narration:** “The corridor cleared. Nami did not. The alarm kept running until someone found the switch.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 15. Game: Evacuate the Laboratory

- Activity ID: `chronicle-v2-blaine-evacuate-the-lab`
- Phase: Conflict
- Description: Follow the floor plan from memory and get everyone out before the smoke fills the corridor.
- Chronicle-specific enter/exit modal copy: none authored; the shared game screen supplies its controls.

#### 16. Scene: Every Missing Line

- Activity ID: `chronicle-v2-blaine-the-inquiry`
- Phase: Conflict
- Description: The inquiry lists every decision Blaine left out of the official record.
- Scene action button: Enter the Scene
- Enter modal:

  1. **League Examiner:** “The override was not in the submitted protocol. Dr Fuji's objection was not there either. Nami's stop order was not logged until after the rupture.”<br>
     Button: Continue
  2. **Blaine:** “I made those omissions.”<br>
     Button: Continue
  3. **Orin:** “I knew about the switch. I should share the blame.”<br>
     Button: Continue
  4. **Blaine:** “You did not override her stop.”<br>
     Button: Continue
  5. **League Examiner:** “That is not how responsibility works. We will examine every choice, not just yours.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 17. Scene: The Patient Left Behind

- Activity ID: `chronicle-v2-blaine-magmar-escapes`
- Phase: Conflict
- Description: The injured Magmar runs into the damaged wing during the evacuation.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Magmar survived, burned along one arm. During transfer, an alarm sent it through the damaged seal and into the smoke-filled east wing.”<br>
     Button: Continue
  2. **Orin:** “Containment team is preparing sleep rounds.”<br>
     Button: Continue
  3. **Blaine:** “No projectiles in the smoke. It will strike toward the sound.”<br>
     Button: Continue
  4. **League Examiner:** “You are suspended from the site.”<br>
     Button: Continue
  5. **Blaine:** “Then Orin gives the commands. I can tell him what Magmar learned to fear.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 18. Battle: The Escaped Magmar

- Activity ID: `chronicle-v2-blaine-escaped-magmar`
- Phase: Conflict
- Description: Guide the panicked Magmar from the smoke without repeating the experiment’s coercion.
- Win text: No trainer result line is shown for this wild battle.
- Loss text: No trainer result line is shown for this wild battle.

#### 19. Scene: Cinnabar Without the Institute

- Activity ID: `chronicle-v2-blaine-lab-closed`
- Phase: Conflict
- Description: The recovery programme closes. Fuji tells Blaine he can redesign the chamber but not as a way around the inquiry.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Dr Fuji:** “The patients are being transferred. Staff are paid through the quarter.”<br>
     Button: Continue
  2. **Blaine:** “I can redesign the chamber.”<br>
     Button: Continue
  3. **Dr Fuji:** “You can. Just not as a way to skip mourning or the inquiry.”<br>
     Button: Continue
  4. **Blaine:** “If I had listened, Nami would be here to redesign it with me.”<br>
     Button: Continue
  5. **Dr Fuji:** “Yes.”<br>
     Button: Continue
  6. **Narration:** “Fuji did not soften it. Blaine was grateful, and hated him for it.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 20. Scene: The Abandoned Quiz Room

- Activity ID: `chronicle-v2-blaine-years-of-questions`
- Phase: Contemplation
- Description: Blaine fills the empty Gym wing with questions he should have asked before the demonstration.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “The proposed Gym wing gathered dust. Blaine came back alone to write questions on its walls: Who can stop this? Who benefits if it continues? What evidence would make us abandon the result?”<br>
     Button: Continue
  2. **Orin:** “You have written the same question twelve ways.”<br>
     Button: Continue
  3. **Blaine:** “I am trying to find one I actually believe.”<br>
     Button: Continue
  4. **Orin:** “There's a letter from the League. Another application.”<br>
     Button: Continue
  5. **Blaine:** “Tell them it's too soon.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 21. Scene: Repair Is Not Erasure

- Activity ID: `chronicle-v2-blaine-fujis-condition`
- Phase: Contemplation
- Description: Fuji agrees to advise on the new institute only if the failure stays visible in the record.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Dr Fuji:** “Do not name the room after Nami. Putting her name on a plaque does not make the building safer.”<br>
     Button: Continue
  2. **Blaine:** “Then what do we preserve?”<br>
     Button: Continue
  3. **Dr Fuji:** “Her authority. Any trainer, technician, or Pokémon handler can end a trial. No override.”<br>
     Button: Continue
  4. **Blaine:** “And the warped door?”<br>
     Button: Continue
  5. **Dr Fuji:** “Leave it behind glass. Not as punishment. As evidence.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 22. Scene: The Patient Returns

- Activity ID: `chronicle-v2-blaine-magmars-choice`
- Phase: Contemplation
- Description: Magmar comes back to the rebuilt chamber but stops at the threshold.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Magmar came back to the rebuilt chamber but stopped at the threshold. Blaine sat outside with the controls powered down.”<br>
     Button: Continue
  2. **Orin:** “We could run the assessment with Rapidash.”<br>
     Button: Continue
  3. **Blaine:** “We don't use Magmar to get a passing grade. If it won't go in, that's our answer.”<br>
     Button: Continue
  4. **Narration:** “After an hour, Magmar put one foot across the line, then left. Blaine recorded both movements.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 23. Scene: The Last Question

- Activity ID: `chronicle-v2-blaine-conditional-assessment`
- Phase: Resolution
- Description: The League assesses a Gym designed to stop itself. Blaine names who can end the challenge before it starts.
- Scene action button: Enter the Scene
- Enter modal:

  1. **League Examiner:** “Your suspension is over. That does not entitle you to a licence.”<br>
     Button: Continue
  2. **Blaine:** “I understand.”<br>
     Button: Continue
  3. **League Examiner:** “During this assessment, Orin may halt the match. Fuji may halt the chamber. Your Pokémon may refuse an exercise.”<br>
     Button: Continue
  4. **Blaine:** “And I may halt it before any of them has to.”<br>
     Button: Continue
  5. **Dr Fuji:** “That is the answer we are testing.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 24. Battle: The Cinnabar Assessment

- Activity ID: `chronicle-v2-blaine-league-assessment`
- Phase: Resolution
- Description: Demonstrate a Fire Gym whose strongest system is its ability to stop.
- Win text: Player wins: “The assessment is complete. You have shown the care and judgement this role requires.”
- Loss text: Player loses: “A worthy result. The League needs trainers who know when to adapt as much as when to attack.”

#### 25. Scene: Leader of Cinnabar Gym

- Activity ID: `chronicle-v2-blaine-volcano-licence`
- Phase: Resolution
- Description: Blaine receives his licence with the inquiry permanently attached to the public record.
- Scene action button: Enter the Scene
- Enter modal:

  1. **League Examiner:** “Cinnabar Gym is licensed for one year under independent safety review. The inquiry stays attached to the public record.”<br>
     Button: Continue
  2. **Blaine:** “Good.”<br>
     Button: Continue
  3. **Orin:** “You could sound a little happier.”<br>
     Button: Continue
  4. **Blaine:** “I am. But we got lucky with the results more than once. The system wasn't safe.”<br>
     Button: Continue
  5. **Dr Fuji:** “That's almost what Nami used to say. We'll see tomorrow.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 26. Scene: Questions Before Fire

- Activity ID: `chronicle-v2-blaine-first-quiz`
- Phase: Resolution
- Description: The Gym's first challenge starts with a question that has no single right answer.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Blaine:** “First question: if your Pokémon can take more heat, should it?”<br>
     Button: Continue
  2. **Orin:** “There is no single right answer.”<br>
     Button: Continue
  3. **Blaine:** “Exactly. If the quiz only rewards the confident answer, we're teaching the wrong thing.”<br>
     Button: Continue
  4. **Narration:** “Behind the glass, the warped fire door stayed visibly jammed. Nobody called it inspiring.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 27. Scene: Nami's Place

- Activity ID: `chronicle-v2-blaine-the-empty-station`
- Phase: Reflection
- Description: Staff are avoiding the empty monitoring station. Blaine asks whether it should be moved.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Orin:** “We could move the monitoring desk. Staff avoid the empty station.”<br>
     Button: Continue
  2. **Blaine:** “Ask them. Don't leave it there on my account.”<br>
     Button: Continue
  3. **Dr Fuji:** “Nami would have complained that the station blocks the second exit.”<br>
     Button: Continue
  4. **Blaine:** “She did complain. I have the note.”<br>
     Button: Continue
  5. **Narration:** “They moved the desk. The absence stayed, without becoming an altar.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 28. Scene: The Work After Knowing

- Activity ID: `chronicle-v2-blaine-when-the-answer-is-stop`
- Phase: Reflection
- Description: The rare thermal response returns during a routine recovery. Blaine stops the chamber.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Months later, Magmar's rare response returned during an ordinary recovery. The curve climbed cleanly toward the discovery Blaine had once wanted more than caution.”<br>
     Button: Continue
  2. **Orin:** “Wall temperature diverging.”<br>
     Button: Continue
  3. **Blaine:** “Stop the chamber.”<br>
     Button: Continue
  4. **Orin:** “Magmar's pulse is stable.”<br>
     Button: Continue
  5. **Blaine:** “I heard you. Stop the chamber.”<br>
     Button: Continue
  6. **Narration:** “The line dropped off the monitor. Blaine logged the response, both what happened and when it stopped.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

### Source files

- Story: [blaine.ts](../../src/data/gym-leader-chronicles/stories/blaine.ts)
- Expedition: [gym-leader-chronicles.ts](../../src/data/expeditions/entries/gym-leader-chronicles.ts)
- Battles: [gym-leader-chronicles.ts](../../src/data/battles/entries/gym-leader-chronicles.ts)


## Giovanni: Dinner at Eight

- Badge: Earth Badge
- Chronicle player title: Rocket Boss
- Memory marker ID: `earth-badge-memory-revealed`
- Memory marker title: Giovanni's Badge Memory
- Memory marker description: The Earth Badge has opened a memory from Giovanni's past.
- Expedition ID: `giovanni-earth-badge-chronicle`
- Expedition title: Giovanni: Dinner at Eight
- Expedition description: Step into the memory held by the Earth Badge and witness the choices that shaped Giovanni.
- Expedition button: Enter the Memory

### Ordered story and activity copy

#### 1. Scene: The City as a Balance Sheet

- Activity ID: `chronicle-v2-giovanni-breakfast-ledger`
- Phase: Backstory
- Description: Giovanni tracks the western road closure while Silver reminds him about an evening he promised.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Viridian's western road had been closed for three winters. Merchants paid twice for eastern transport, the League called repairs uneconomical, and Giovanni kept every rejected petition in a leather folder beside the breakfast table.”<br>
     Button: Continue
  2. **Silver:** “My tournament starts at six. You said front row, then dinner at eight.”<br>
     Button: Continue
  3. **Giovanni:** “I remember.”<br>
     Button: Continue
  4. **Silver:** “You also have the freight meeting. Meetings usually win.”<br>
     Button: Continue
  5. **Giovanni:** “Not tonight.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 2. Scene: A Road Nobody Wants

- Activity ID: `chronicle-v2-giovanni-the-western-contract`
- Phase: Backstory
- Description: Giovanni negotiates the terms for reopening the western road, including a condition that favours Viridian residents.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Hadrian:** “The League will lease the road but cannot fund the reconstruction. Whoever repairs it gets the freight rights for ten years.”<br>
     Button: Continue
  2. **Giovanni:** “Seven years, and Viridian residents ride free.”<br>
     Button: Continue
  3. **Hadrian:** “You are negotiating against your own advantage?”<br>
     Button: Continue
  4. **Giovanni:** “If the city resents the toll, we will spend half our budget guarding the trucks. Keeping them happy early saves money later.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 3. Game: Read the Parcel Map

- Activity ID: `chronicle-v2-giovanni-read-the-parcel-map`
- Phase: Backstory
- Description: Reassemble the permit map Giovanni intends to turn into control of Viridian’s western road.
- Chronicle-specific enter/exit modal copy: none authored; the shared game screen supplies its controls.

#### 4. Scene: The Seat Reserved

- Activity ID: `chronicle-v2-giovanni-silver-practises`
- Phase: Backstory
- Description: Silver trains while Giovanni handles calls from the edge of the room.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Silver:** “Persian keeps watching the telephone instead of me.”<br>
     Button: Continue
  2. **Giovanni:** “Persian is better at that than I am.”<br>
     Button: Continue
  3. **Silver:** “So do I.”<br>
     Button: Continue
  4. **Giovanni:** “Show me the opening again. This time do not chase when Sneasel sidesteps.”<br>
     Button: Continue
  5. **Silver:** “Will you say that from the front row?”<br>
     Button: Continue
  6. **Giovanni:** “From the front row.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 5. Scene: The Other Organisation

- Activity ID: `chronicle-v2-giovanni-ariana-at-the-door`
- Phase: Backstory
- Description: Ariana explains how the private network behind Giovanni fits with the road project.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Ariana:** “Cato's crews control the quarry approach. The League thinks they are independent raiders.”<br>
     Button: Continue
  2. **Giovanni:** “They are independent enough to be a problem and dependent enough to take instructions.”<br>
     Button: Continue
  3. **Ariana:** “If the road opens publicly, our freight network gets a legitimate spine.”<br>
     Button: Continue
  4. **Giovanni:** “Good. Both point the same direction for once.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 6. Scene: Stone on the Western Road

- Activity ID: `chronicle-v2-giovanni-the-blocked-pass`
- Phase: Development
- Description: Giovanni puts Rhyhorn on the western road where cameras can see it while the real work happens out of frame.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “The landslide had left boulders above a narrow shelf. Giovanni put Rhyhorn where every camera could see it and smaller crews where no reporter could record which depots they served.”<br>
     Button: Continue
  2. **Hadrian:** “Your plan restores passage in six weeks.”<br>
     Button: Continue
  3. **Giovanni:** “Four, if the League stops sending observers who mistake clipboards for labour.”<br>
     Button: Continue
  4. **Ariana:** “Cato's people are waiting beyond the ridge.”<br>
     Button: Continue
  5. **Giovanni:** “They wait until the convoy has moved.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 7. Game: Clear the Western Road

- Activity ID: `chronicle-v2-giovanni-clear-the-western-road`
- Phase: Development
- Description: Move the fallen stone and reopen Viridian's western supply route.
- Chronicle-specific enter/exit modal copy: none authored; the shared game screen supplies its controls.

#### 8. Scene: A Public Success

- Activity ID: `chronicle-v2-giovanni-first-convoy`
- Phase: Development
- Description: The western road reopens two days ahead of the eastern route and the city council wants Giovanni to take the vacant Gym site.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “The first relief convoy reached Viridian two days ahead of the eastern route. Shops reopened. Families lined the road and cheered the man who had turned delay into movement.”<br>
     Button: Continue
  2. **Hadrian:** “The city council wants you to take the vacant Gym site.”<br>
     Button: Continue
  3. **Giovanni:** “A Gym was not part of the road contract.”<br>
     Button: Continue
  4. **Hadrian:** “Viridian sees you as the only person who finishes what institutions start.”<br>
     Button: Continue
  5. **Ariana:** “And a licensed arena gives private traffic a respectable reason to enter the city.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 9. Scene: The Toll Beyond the Cameras

- Activity ID: `chronicle-v2-giovanni-cato-collects`
- Phase: Development
- Description: Cato demands payment that Giovanni never agreed to.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Cato:** “My crews cleared the pass. Now your new merchants use our approaches without paying.”<br>
     Button: Continue
  2. **Giovanni:** “They pay the published toll.”<br>
     Button: Continue
  3. **Cato:** “The published toll belongs to the League.”<br>
     Button: Continue
  4. **Giovanni:** “Your compensation bought obedience, not ownership.”<br>
     Button: Continue
  5. **Cato:** “Then maybe the second convoy meets a less obedient road.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 10. Battle: Cato's Western Toll

- Activity ID: `chronicle-v2-giovanni-relief-raiders`
- Phase: Development
- Description: Protect the first relief convoy from the private force that expected to own the road.
- Win text: Player wins: “That was a bad roll for me. Still, every loss teaches you when to change your bet.”
- Loss text: Player loses: “What a finish! Call it a lucky streak if you like; my team did the hard work.”

#### 11. Scene: The Raider Defeated

- Activity ID: `chronicle-v2-giovanni-a-cleaner-story`
- Phase: Development
- Description: Giovanni turns the confrontation with Cato into a public demonstration of civic leadership.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Hadrian:** “You protected the convoy yourself. The council's Gym vote is now unanimous.”<br>
     Button: Continue
  2. **Giovanni:** “Cato underestimated the city's resolve.”<br>
     Button: Continue
  3. **Ariana:** “Cato underestimated your willingness to erase an asset once it embarrassed you.”<br>
     Button: Continue
  4. **Giovanni:** “Do you object?”<br>
     Button: Continue
  5. **Ariana:** “The press release is good.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 12. Scene: Two Appointments

- Activity ID: `chronicle-v2-giovanni-gym-assessment-date`
- Phase: Conflict
- Description: The final Gym assessment is scheduled on the same evening as Silver's tournament.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Hadrian:** “The League panel can attend Thursday at seven. Miss it and the appointment moves to next quarter.”<br>
     Button: Continue
  2. **Giovanni:** “Thursday is unavailable.”<br>
     Button: Continue
  3. **Ariana:** “The southern depot meeting is Thursday.”<br>
     Button: Continue
  4. **Giovanni:** “So is Silver's tournament.”<br>
     Button: Continue
  5. **Hadrian:** “Then decide which appointment can exist without you.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 13. Scene: Dinner at Eight

- Activity ID: `chronicle-v2-giovanni-silver-hears-half`
- Phase: Conflict
- Description: Giovanni repeats the promise to Silver without mentioning how many other things are scheduled for the same night.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Silver:** “Mrs Vale says your black suit is laid out. That is the League-meeting suit.”<br>
     Button: Continue
  2. **Giovanni:** “The assessment ends before your final.”<br>
     Button: Continue
  3. **Silver:** “If I reach the final.”<br>
     Button: Continue
  4. **Giovanni:** “You will.”<br>
     Button: Continue
  5. **Silver:** “You said that before my last match too.”<br>
     Button: Continue
  6. **Giovanni:** “Front row. Dinner at eight. I gave you my word.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 14. Scene: Viridian's Candidate

- Activity ID: `chronicle-v2-giovanni-the-assessment`
- Phase: Conflict
- Description: Hadrian tests Giovanni's understanding of what a Gym Leader owes challengers.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Hadrian:** “A Leader serves challengers whether their arrival is profitable, convenient, or politically useful.”<br>
     Button: Continue
  2. **Giovanni:** “Reliable systems make money. Unreliable ones cost twice what you save.”<br>
     Button: Continue
  3. **Hadrian:** “That answer is about incentives. I asked about duty.”<br>
     Button: Continue
  4. **Giovanni:** “Good intentions do not keep roads open or feed cities. Solid logistics do.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 15. Battle: Hadrian's League Assessment

- Activity ID: `chronicle-v2-giovanni-league-assessment`
- Phase: Conflict
- Description: Prove that the system built around Viridian Gym can withstand an opponent you do not control.
- Win text: Player wins: “You challenged the system without losing sight of the people inside it. That is the standard Viridian should meet.”
- Loss text: Player loses: “A clear, disciplined victory. You have shown that strength and restraint can stand together.”

#### 16. Scene: The Meeting That Cannot Wait

- Activity ID: `chronicle-v2-giovanni-six-ten`
- Phase: Conflict
- Description: Ariana brings the depot crisis to Giovanni as he is about to leave for Silver's tournament.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Ariana:** “The southern depot owners moved their vote to seven. Petrel can take shared control if you send him.”<br>
     Button: Continue
  2. **Giovanni:** “Then tell him not to.”<br>
     Button: Continue
  3. **Ariana:** “He does not scare them enough.”<br>
     Button: Continue
  4. **Giovanni:** “The tournament hall is fifteen minutes away. The meeting needs ten.”<br>
     Button: Continue
  5. **Ariana:** “They won't hold.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 17. Scene: Seven O'Clock

- Activity ID: `chronicle-v2-giovanni-the-ten-minute-choice`
- Phase: Conflict
- Description: Giovanni stays for the depot meeting. The tournament final starts without him.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “The depot owners arrived with three lawyers and a contract twice as long as promised. Giovanni's driver kept the engine running below.”<br>
     Button: Continue
  2. **Giovanni:** “Strike the shared-access clause and we are done here.”<br>
     Button: Continue
  3. **Ariana:** “They will walk.”<br>
     Button: Continue
  4. **Giovanni:** “Then they walk away from the only western road.”<br>
     Button: Continue
  5. **Narration:** “At the tournament hall, the first-round bell became the semifinal bell.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 18. Scene: The Promise Becomes Past Tense

- Activity ID: `chronicle-v2-giovanni-front-row-empty`
- Phase: Conflict
- Description: Giovanni arrives home after Silver's final has already ended.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “The dining clock read ten twenty-three. A runner-up trophy stood beside Giovanni's untouched place. Silver's dinner had been covered and carried away.”<br>
     Button: Continue
  2. **Mrs Vale:** “He asked me not to wake him when you got back.”<br>
     Button: Continue
  3. **Giovanni:** “Did he see the car arrive?”<br>
     Button: Continue
  4. **Mrs Vale:** “He stopped looking after the final.”<br>
     Button: Continue
  5. **Giovanni:** “Order the winner's trophy. Better workmanship. His name engraved.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 19. Scene: A Replacement for Presence

- Activity ID: `chronicle-v2-giovanni-that-is-not-mine`
- Phase: Conflict
- Description: Silver refuses the trophy Giovanni ordered.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Silver:** “That trophy is not mine.”<br>
     Button: Continue
  2. **Giovanni:** “It is better than the one they gave you.”<br>
     Button: Continue
  3. **Silver:** “I did not win it, and you did not see why.”<br>
     Button: Continue
  4. **Giovanni:** “There will be another tournament.”<br>
     Button: Continue
  5. **Silver:** “Will you be there?”<br>
     Button: Continue
  6. **Giovanni:** “I will clear the date.”<br>
     Button: Continue
  7. **Silver:** “You cleared Thursday too.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 20. Scene: One Missed Evening

- Activity ID: `chronicle-v2-giovanni-the-ledger-entry`
- Phase: Contemplation
- Description: The western road earns its first full quarter and Giovanni has nothing to put against the moment Silver stopped waiting.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “The western road earned its first full quarter of revenue. The southern depots signed. Viridian Gym opened on schedule. Giovanni's ledger had no column for the moment Silver stopped looking at the door.”<br>
     Button: Continue
  2. **Ariana:** “You got everything you wanted.”<br>
     Button: Continue
  3. **Giovanni:** “The boy disagrees.”<br>
     Button: Continue
  4. **Ariana:** “He's twelve.”<br>
     Button: Continue
  5. **Giovanni:** “No. He just knows when his father breaks a promise.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 21. Scene: What a Gym Magnifies

- Activity ID: `chronicle-v2-giovanni-hadrians-warning`
- Phase: Contemplation
- Description: Hadrian tells Giovanni that licensing the Gym is not unqualified praise.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Hadrian:** “You will be an effective Leader. That is not unqualified praise.”<br>
     Button: Continue
  2. **Giovanni:** “You licensed the Gym.”<br>
     Button: Continue
  3. **Hadrian:** “Because Viridian needs the institution you built. It will magnify whatever you practise inside it: discipline, patience, or the belief that results excuse methods.”<br>
     Button: Continue
  4. **Giovanni:** “You think one missed tournament reveals my method?”<br>
     Button: Continue
  5. **Hadrian:** “I think your first instinct was to buy him off with an expensive trophy.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 22. Scene: An Apology Without Entry

- Activity ID: `chronicle-v2-giovanni-outside-silvers-door`
- Phase: Contemplation
- Description: Giovanni apologises through Silver's closed door.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Giovanni:** “I chose the meeting. I knew I might miss the final, and I told myself I could control the delay. I was wrong.”<br>
     Button: Continue
  2. **Silver:** “Are you sorry, or do you want me to open the door?”<br>
     Button: Continue
  3. **Giovanni:** “Both.”<br>
     Button: Continue
  4. **Silver:** “I don't want to talk about it tonight.”<br>
     Button: Continue
  5. **Narration:** “Giovanni stood outside longer than necessary, as if patience could become presence retroactively.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 23. Scene: Leader of Viridian Gym

- Activity ID: `chronicle-v2-giovanni-opening-day`
- Phase: Resolution
- Description: Viridian Gym opens. Silver does not attend.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “Viridian Gym opened beneath banners celebrating the western road. Merchants, League officials, and families filled the hall. Silver did not attend.”<br>
     Button: Continue
  2. **Hadrian:** “Do you accept the duties of Leader?”<br>
     Button: Continue
  3. **Giovanni:** “I accept responsibility for every result produced under this roof.”<br>
     Button: Continue
  4. **Hadrian:** “And every method?”<br>
     Button: Continue
  5. **Giovanni:** “Those most of all.”<br>
     Button: Continue
  6. **Narration:** “The answer was excellent. Giovanni knew how little an excellent answer guarantees.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 24. Scene: The Earth Badge Standard

- Activity ID: `chronicle-v2-giovanni-first-challenger`
- Phase: Resolution
- Description: Giovanni designs the Gym's challenge around position and pressure rather than brute force.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Giovanni:** “Ground is position, not just weight. You win by knowing which way out is still open after the obvious one closes.”<br>
     Button: Continue
  2. **Ariana:** “A civic lesson?”<br>
     Button: Continue
  3. **Giovanni:** “A practical one.”<br>
     Button: Continue
  4. **Hadrian:** “Those are not mutually exclusive.”<br>
     Button: Continue
  5. **Narration:** “The challenger entered a Gym as controlled as the road, each obstacle teaching dependence on the next.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 25. Scene: Eight O'Clock Again

- Activity ID: `chronicle-v2-giovanni-dinner-reset`
- Phase: Resolution
- Description: Giovanni has left instructions with the housekeeper to hold calls. Silver realises he spoke to Hadrian.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Mrs Vale:** “No calls at the table. I have your written instruction.”<br>
     Button: Continue
  2. **Giovanni:** “And if the Gym burns?”<br>
     Button: Continue
  3. **Silver:** “Then somebody on the rota handles it.”<br>
     Button: Continue
  4. **Giovanni:** “You talked to Hadrian.”<br>
     Button: Continue
  5. **Silver:** “He came to my tournament.”<br>
     Button: Continue
  6. **Narration:** “Dinner began at eight. Silver discussed strategy, not forgiveness. Giovanni listened without correcting the distinction.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 26. Scene: A Seat Occupied

- Activity ID: `chronicle-v2-giovanni-the-second-final`
- Phase: Reflection
- Description: Giovanni sits through Silver's next tournament without taking any calls, and stays after Silver loses.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Narration:** “At the next tournament, Giovanni arrived before the doors opened. He disliked the narrow seats, the crowd, and every minute in which no decision required him.”<br>
     Button: Continue
  2. **Ariana:** “The southern depots are asking for you.”<br>
     Button: Continue
  3. **Giovanni:** “They can ask Petrel.”<br>
     Button: Continue
  4. **Ariana:** “He will concede shared access.”<br>
     Button: Continue
  5. **Giovanni:** “Then we will take it back later.”<br>
     Button: Continue
  6. **Narration:** “Silver lost in the semifinal. Giovanni stayed through the presentation.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

#### 27. Scene: Success and Failure

- Activity ID: `chronicle-v2-giovanni-dinner-at-eight`
- Phase: Reflection
- Description: Silver notices Giovanni stayed even after the loss.
- Scene action button: Enter the Scene
- Enter modal:

  1. **Silver:** “You stayed even after I lost.”<br>
     Button: Continue
  2. **Giovanni:** “The promise was attendance, not victory.”<br>
     Button: Continue
  3. **Silver:** “You sound proud of getting that sentence right.”<br>
     Button: Continue
  4. **Giovanni:** “I told you I would be there, Silver. That is all there is to it.”<br>
     Button: Continue
  5. **Narration:** “At eight, they ate together. The runner-up trophy from the first tournament stayed on Silver's shelf. The replacement stayed boxed in Giovanni's office: a perfect object for an evening that had never happened.”<br>
     Button: Continue the Memory

- Exit modal: none authored.

### Source files

- Story: [giovanni.ts](../../src/data/gym-leader-chronicles/stories/giovanni.ts)
- Expedition: [gym-leader-chronicles.ts](../../src/data/expeditions/entries/gym-leader-chronicles.ts)
- Battles: [gym-leader-chronicles.ts](../../src/data/battles/entries/gym-leader-chronicles.ts)

## Notes for the rewrite

- This inventory includes Chronicle-authored titles, descriptions, dialogue, scene buttons, game card labels, and resolved battle result lines found in the current data.
- Reusable text supplied by shared game UI is identified where the Chronicle has no custom line.
- Battle teams, move names, asset paths, and balance settings are omitted because they are not player-facing narrative copy.
