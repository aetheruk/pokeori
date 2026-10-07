import type { BattleConfig } from '../types'

type DialoguePair = { win: string[]; loss: string[] }

const CLASS_DIALOGUE: Record<string, DialoguePair> = {
  'bug-catcher': {
    win: [
      'Aw, you beat us! I’ll take my team back into the grass and keep practising. There are still so many bugs I haven’t met yet.',
      'That was a proper battle! My Pokémon gave it everything. I’ll be ready for the next trainer who comes along.',
      'I thought my little battlers had one more trick in them. Never mind, we’ll learn from this and try again.',
    ],
    loss: [
      'That was a good match, but my little battlers held their ground. I’ll tell everyone on the route how hard you made us work.',
      'My Pokémon kept their nerve when it counted. You’ll have to bring an even trickier plan next time!',
      'We held on for the win! Keep practising out there, and we’ll see if you can turn the tables next time.',
    ],
  },
  youngster: {
    win: [
      'Aw, I nearly had you! I’m going to train until my team can keep up all the way to the next town.',
      'No way! I thought I had this one. I’ll be back with a much stronger team, just you wait.',
      'Okay, that was a great battle. I’m still going to tell everyone I almost won, though.',
    ],
    loss: [
      'Yes! My Pokémon came through! Maybe next time you’ll make me sweat a little more.',
      'That was close, but I got you this time! I’m going to train even harder before our rematch.',
      'I won! I can’t wait to tell my friends about that battle. You gave me a real challenge!',
    ],
  },
  lass: {
    win: [
      'Well played. I was hoping for a little more sparkle from my team today. We’ll be ready for the next challenge.',
      'You caught us off guard! I’ll give my Pokémon a rest and come back with a better plan.',
      'That was a lovely battle, even if the result wasn’t what I wanted. We’ll practise and try again.',
    ],
    loss: [
      'What a lovely battle! My Pokémon held their own, and I’m so proud of them.',
      'You nearly had us, but my team found its rhythm in time. Let’s battle again sometime.',
      'A beautiful match, and a win for my team! I hope you’ll come back for a rematch.',
    ],
  },
  camper: {
    win: [
      'Looks like today’s trail belongs to you. I’ll take my team to a quiet spot and work on our next move.',
      'You had the better plan this time. There’s plenty of trail left for us to practise on.',
      'That was a tough match! We’ll catch our breath, learn from it, and be ready for the next hike.',
    ],
    loss: [
      'That was a great match, but my team held the trail today. We’ll be ready if you want another go.',
      'Good effort, but I know these trails better than you know my tactics. Let’s see how you do next time.',
      'My team had a brilliant time out there, and we came away with the win. Time for a rest stop and a snack!',
    ],
  },
  picnicker: {
    win: [
      'Oh dear, I thought we had this picnic in the bag! We’ll regroup, share the last of the sandwiches, and practise.',
      'You’ve won this round. I suppose my Pokémon and I should take a little break and rethink our strategy.',
      'What a surprise! I’ll cheer my team up with a treat and get them ready for next time.',
    ],
    loss: [
      'What a refreshing battle! My Pokémon earned an extra treat for pulling through.',
      'You put up quite a fight, but this picnic belongs to my team today. Come by again sometime!',
      'That was such fun! A good battle makes even the walk home feel shorter, especially after a win.',
    ],
  },
  picknicker: {
    win: [
      'Oh dear, I thought we had this picnic in the bag! We’ll regroup, share the last of the sandwiches, and practise.',
      'You’ve won this round. I suppose my Pokémon and I should take a little break and rethink our strategy.',
    ],
    loss: [
      'What a refreshing battle! My Pokémon earned an extra treat for pulling through.',
      'That was such fun! A good battle makes even the walk home feel shorter, especially after a win.',
    ],
  },
  hiker: {
    win: [
      'A steep climb and a steep lesson. I’ll take the long way round with my team and put in some more training.',
      'You stood your ground better than I did. We’ll rest here a moment, then get back to the trail.',
      'That was a solid battle. My Pokémon and I will keep climbing until we’re ready for you next time.',
    ],
    loss: [
      'Good footing and good tactics from my team. The path is ours today, trainer.',
      'That was a proper mountain battle! We gave it everything, and it paid off.',
      'You’ve got a steady hand in a fight, but my team knows this mountain. Come back after more training.',
    ],
  },
  'rocket-grunt': {
    win: [
      'Tch. You’ve made a nuisance of yourself. The boss won’t be pleased, but this operation is bigger than one setback.',
      'Enjoy the victory while it lasts, kid. Team Rocket always has another way in.',
      'You think this changes anything? We got what we came for. Move along before you make things worse for yourself.',
    ],
    loss: [
      'That’s more like it. Stay out of Team Rocket’s way next time, or you’ll regret it.',
      'You’re no match for Team Rocket. Now keep moving before I change my mind about letting you go.',
      'The boss said not to waste time, and this is over. You haven’t seen the last of us.',
    ],
  },
  fisherman: {
    win: [
      'Well, that was the one that got away. I’ll cast again after my Pokémon have had a rest.',
      'You reeled us in that time. My team and I will be back on the water before long.',
      'A strong current can turn a fight in a blink. I’ll remember that next time I cast a challenge.',
    ],
    loss: [
      'Now that was a battle worth getting up early for! My Pokémon reeled in the win.',
      'You fought hard, but my team landed the catch today. I’ll tell the other anglers about it.',
      'My Pokémon and I enjoyed every turn, especially the last one. That’s a fine win!',
    ],
  },
  'bird-keeper': {
    win: [
      'Up we go again! I’ll train my flock until they can meet your team on equal wings.',
      'Your timing was sharper than ours today. We’ll take to the skies and practise those turns.',
      'That was a hard landing, but my Pokémon are all right. We’ll fly again soon.',
    ],
    loss: [
      'My flock took the lead and held it. You gave us a worthy chase, though!',
      'The wind was with my team today. I’ll remember this flight next time we take off.',
      'My flock held pace and took the win. Safe travels, trainer!',
    ],
  },
  pokemaniac: {
    win: [
      'Fascinating! Your Pokémon’s timing changed the whole battle. I need to write this down before I forget.',
      'What an incredible match. I may have lost, but I’ve got pages of notes to take home.',
      'I was so busy admiring your team that I missed my opening. A valuable lesson for next time!',
    ],
    loss: [
      'Remarkable! My observations paid off, and my team secured the win. A fascinating result indeed.',
      'That was a rare treat. My Pokémon and I will be talking about this match for weeks.',
      'A decisive result for my team, and a fascinating one. I hope you don’t mind if I make a few notes.',
    ],
  },
  'super-nerd': {
    win: [
      'Interesting. My calculations did not account for that turn. I’ll revise the model before our next match.',
      'Your strategy exposed a flaw in mine. That is inconvenient, but undeniably useful data.',
      'A defeat, then. I’ll review every turn and identify precisely where the experiment went wrong.',
    ],
    loss: [
      'An excellent result. My decisions were consistent, efficient, and difficult to counter.',
      'The data supports the obvious conclusion: my team was better prepared. A useful confirmation.',
      'A compelling battle. I may have to update my theory of what makes a good trainer, but the result stands.',
    ],
  },
  gamer: {
    win: [
      'No way, I was one turn from the jackpot! I’m stepping away from the table and training before I try again.',
      'That was a bad roll for me. Still, every loss teaches you when to change your bet.',
      'You win this round. I’ll study the odds, tune up my team, and come back for a rematch.',
    ],
    loss: [
      'Jackpot! That battle had everything. My team had the winning hand all along.',
      'A clean win! Sometimes the best bet is trusting your Pokémon.',
      'What a finish! Call it a lucky streak if you like; my team did the hard work.',
    ],
  },
  biker: {
    win: [
      'Gah, that was a rough ride. We’ll tune up the team and hit the road again.',
      'You knocked us off our line, trainer. I’ll be back after a few more laps with my Pokémon.',
      'Fine, you’ve got the road this time. My team and I aren’t done riding yet.',
    ],
    loss: [
      'Now that’s how you take a corner! My team left yours in the dust.',
      'A clean finish. My Pokémon loved a good race, especially one we won.',
      'The road ahead is ours today. Ride safe, and give your team a breather.',
    ],
  },
  sailor: {
    win: [
      'You weathered that better than I did. We’ll steady ourselves and sail again.',
      'A rough sea and a rough result. My Pokémon and I will be ready for the next crossing.',
      'You’ve taken this round. I’ll keep my crew practising before the next port.',
    ],
    loss: [
      'Steady as she goes! My team held its course and brought us safely to a win.',
      'That was a fine voyage of a match. My crew earned safe passage today, trainer.',
      'A strong finish! My Pokémon and I will remember this victory when we’re back at sea.',
    ],
  },
  swimmer: {
    win: [
      'You caught me between strokes! I’ll work on my timing before I swim this stretch again.',
      'I’m out of breath, not out of practice. My Pokémon and I will be back in the water soon.',
      'A strong current pulled that match your way. I’ll train and try again after a swim.',
    ],
    loss: [
      'That was a splash of a battle! My Pokémon kept a cool head in the water and brought us the win.',
      'A strong finish and a win for my team! We’ll do another lap before we call it a day.',
      'What a finish! I’ll remember this win next time we meet by the shore.',
    ],
  },
  beauty: {
    win: [
      'A lovely battle, even if my team’s performance wasn’t quite what I planned. We’ll make a graceful return.',
      'You caught us at just the wrong moment. I’ll help my Pokémon polish their timing before our next match.',
      'You’ve won today. My Pokémon are still wonderful, and we’ll come back stronger.',
    ],
    loss: [
      'What a beautiful performance from my team! We kept our poise right to the end.',
      'My Pokémon and I will remember that elegant victory fondly.',
      'An elegant victory for us. I’ll give my team a little praise before we practise again.',
    ],
  },
  gentleman: {
    win: [
      'Well! That was rather less dignified than I had hoped. I shall have to reconsider my team’s training.',
      'I concede the match. Do not expect me to make a habit of it.',
      'A most irritatingly well-fought battle. You have my respect, though I reserve the right to grumble.',
    ],
    loss: [
      'An admirable effort, but I must ask you to try again another day. My team has won this bout.',
      'A spirited challenge, but my team and I were prepared. Do try not to let the result go to your head.',
      'Well played, though the victory is mine. One must acknowledge a sound contest.',
    ],
  },
  channeler: {
    win: [
      'The spirits grow quiet, and so must I. Your team has made its point; I shall meditate on what I overlooked.',
      'A clear result. Even in defeat, I can feel the lesson this battle has left behind.',
      'You have broken my focus without breaking my composure. I will return to my prayers and prepare again.',
    ],
    loss: [
      'Your Pokémon carry a calm and steady spirit, but my team’s resolve carried the day.',
      'The tower has witnessed many battles, and today my team emerged victorious.',
      'A peaceful heart can still be a powerful one. My Pokémon have shown me that today.',
    ],
  },
  'pokefan-m': {
    win: [
      'That was a wonderful match! I still think my Pokémon are the cutest, but I’ll help them practise for next time.',
      'A close one! My team deserves an extra treat for taking on such a strong trainer.',
      'You’ve won, but I’m already planning what my Pokémon and I will try next.',
    ],
    loss: [
      'Amazing! My Pokémon and I make a terrific team. I’ll tell the Fan Club all about our win.',
      'What a match! My Pokémon had the best time showing you what they can do.',
      'A lovely victory for my team. You clearly adore your Pokémon as much as I adore mine.',
    ],
  },
  'pokefan-f': {
    win: [
      'We’ll have to work on our teamwork, won’t we? Still, my Pokémon were so brave out there.',
      'You caught us by surprise. I’ll give my team a cuddle and think over our next strategy.',
      'A close match! We’ll come back stronger, and just as adorable.',
    ],
    loss: [
      'That was lovely! My Pokémon are wonderful, and it’s clear they trust me completely.',
      'My Pokémon and I enjoyed that so much. You must tell me how you trained your team after a rematch.',
      'A beautiful win for us. I’ll still be cheering for you and your Pokémon on the rest of your journey.',
    ],
  },
  'poke-kid': {
    win: [
      'Aww, I lost! I’m going to train really hard and show you what my Pokémon can do next time.',
      'That was so cool! I’ll practise with my Pokémon every day until we’re ready for a rematch.',
      'You’re strong! I’m not giving up, though. My Pokémon and I are going to get even better!',
    ],
    loss: [
      'Wow! My Pokémon are amazing! We won! I’m going to train even harder before we battle again.',
      'That was the best battle ever! Can we do it again after you practise a little more?',
      'I won! My Pokémon had so much fun. I can’t wait to tell everyone about our battle.',
    ],
  },
  twins: {
    win: [
      'Aw, we nearly had you! We’ll practise together and make our next double act even better.',
      'You beat our rhythm that time. We’ll find a new one before we challenge you again!',
      'That was fun! We’re going to work out where we went wrong on the walk home.',
    ],
    loss: [
      'That was great! We learned something, and our Pokémon had a wonderful time winning together.',
      'We won fair and square. We’ll tell everyone about our teamwork!',
      'What a match! We’ll practise our teamwork and see if you can beat us next time.',
    ],
  },
  'old-couple': {
    win: [
      'Well, dear, I think we’ve been beaten. At least our Pokémon had a lovely outing.',
      'A fine match, young trainer. We’ll have to practise before our next stroll.',
    ],
    loss: [
      'Well done, dear. We’ve still got a little spark left in these old trainers!',
      'That was a lovely battle. We may be slower these days, but we can still win a good match.',
    ],
  },
  engineer: {
    win: [
      'System failure on my side. I’ll inspect our setup, make a few adjustments, and run the test again.',
      'Your timing shorted out my plan. I’ll get my Pokémon back to the workshop and recalibrate.',
      'That result wasn’t in the design. I’ll find the fault and bring a better team next time.',
    ],
    loss: [
      'Test complete: my team performed brilliantly. I’ll record the successful setup at the workshop.',
      'A clean result. My Pokémon adapted faster than anything you had on the board.',
      'Impressive work from my team. I’m taking your battle plan back to the workshop for study before our rematch.',
    ],
  },
  'expert-f': {
    win: [
      'A sharp battle, and a useful reminder that experience alone does not decide a match. I’ll train with renewed purpose.',
      'You found the opening I missed. My Pokémon and I will be better prepared next time.',
      'I accept the result. There is always more to learn, and today you were the teacher.',
    ],
    loss: [
      'A worthy challenge, but my experience carried the day. Keep sharpening your instincts and come back stronger.',
      'A thoughtful battle. My Pokémon responded well to every instruction.',
      'Well fought. I hope you learn from this match and carry that resolve into the challenges ahead.',
    ],
  },
  detective: {
    win: [
      'Well, the evidence is clear: I misread your strategy. I’ll reopen the case and examine my own team.',
      'You had the better alibi for every turn. Case closed for today, trainer.',
    ],
    loss: [
      'A decisive result for my team. I’ll have to revise my theory about your strategy.',
      'Case closed in my favour. I’ll be keeping an eye on your progress, trainer.',
    ],
  },
  rival: {
    win: [
      'You got me this time. I’m going to think through every turn on the way to our next stop, so don’t expect an easy rematch.',
      'I can’t believe you pulled ahead. Fine, you’ve earned the bragging rights until we meet again.',
      'That was closer than I expected. I’ll train harder, and next time I’m setting the pace.',
    ],
    loss: [
      'Still a step ahead! Keep training, because I want a real challenge the next time we meet.',
      'I knew I had the edge. Don’t fall behind now; the road to the League is long.',
      'That settles this round. I’ll see you at the next town, and I won’t be taking it easy.',
    ],
  },
  tamer: {
    win: [
      'My Pokémon and I need more time working together. We’ll return when our teamwork is stronger.',
      'You handled your team beautifully. I’ll take mine back to the training grounds.',
      'That was a tough lesson in trust. We’ll keep at it until we move as one.',
    ],
    loss: [
      'That was teamwork at its best. My Pokémon trust me, and it showed in every turn.',
      'A fine match! My team and I enjoyed testing our bond, and it carried us through.',
      'We earned that win together. Keep looking after your Pokémon, trainer, and we’ll meet again.',
    ],
  },
  juggler: {
    win: [
      'Whoops, I dropped the rhythm! I’ll practise my timing before bringing the whole act back on stage.',
      'You saw through my routine. I’ll need a new trick for the next performance.',
      'That was quite a tumble. My Pokémon and I will rehearse and try again.',
    ],
    loss: [
      'And that’s the show! My team kept the audience on its toes right to the end.',
      'What a performance! I couldn’t have choreographed a better finish myself.',
      'We took the spotlight, trainer. My Pokémon and I loved every minute of it.',
    ],
  },
  'chronicle-mara': {
    win: ['You kept your team composed under pressure. That is the kind of trainer Pewter needs.'],
    loss: ['A convincing result. I hope you remember to care for your Pokémon as carefully as you command them.'],
  },
  'chronicle-daisy': {
    win: ['You adapted beautifully. A good Gym Leader has to read the whole match, not just the next wave.'],
    loss: ['A well-earned win. Misty will want to hear how you handled yourself in the water.'],
  },
  'chronicle-mako': {
    win: ['You changed course when the drill demanded it. That flexibility can keep a whole team safe.'],
    loss: ['Good work. Remember, the safest plan is the one you are willing to revise when conditions change.'],
  },
  'chronicle-celia': {
    win: ['You proved patience can be every bit as persuasive as spectacle. I’ll make sure the committee hears about this.'],
    loss: ['A graceful victory. The exhibition needs trainers who can make a battle feel like a conversation.'],
  },
  'chronicle-janine': {
    win: ['Good. You trusted the route and got everyone through it. That is what a real field leader does.'],
    loss: ['You kept your footing through every feint. I could learn a thing or two from that.'],
  },
  'chronicle-ren': {
    win: ['You respected the old forms without letting them dictate your next move. That is a worthy successor.'],
    loss: ['You read the tradition and then made it your own. Master Koga would approve.'],
  },
  'chronicle-koichi': {
    win: ['You knew when to press and when to pause. Focus is not force; you understood the lesson.'],
    loss: ['A thoughtful battle. You fought with discipline and gave your Pokémon room to respond.'],
  },
  'chronicle-orin': {
    win: ['You stopped the drill when the system needed it. Good judgement is the most important safeguard.'],
    loss: ['You kept control without forcing the outcome. That is exactly what this test was meant to show.'],
  },
  'chronicle-hadrian': {
    win: ['You challenged the system without losing sight of the people inside it. That is the standard Viridian should meet.'],
    loss: ['A clear, disciplined victory. You have shown that strength and restraint can stand together.'],
  },
  'chronicle-steward': {
    win: ['The assessment is complete. You have shown the care and judgement this role requires.'],
    loss: ['A worthy result. The League needs trainers who know when to adapt as much as when to attack.'],
  },
  'gym-kanto-erika': {
    win: ['Your team moved with patience and purpose. Celadon’s garden has much to teach, but today you taught me something too.'],
    loss: ['A graceful victory. Please remember that every Pokémon, even one caught in a difficult battle, deserves gentle care.'],
  },
  'gym-kanto-brock': {
    win: ['You’ve earned the Boulder Badge. Remember: a strong foundation comes from trusting the Pokémon beside you.'],
    loss: ['You showed real grit. Train with patience, and the Boulder Badge will be within reach.'],
  },
  'gym-kanto-misty': {
    win: ['You kept your balance through every wave. The Cascade Badge is yours—let that confidence carry you forward.'],
    loss: ['You nearly swept us away! Keep practising, and come back ready to make another splash.'],
  },
  'gym-kanto-ltsurge': {
    win: ['You’ve earned the Thunder Badge! Keep that sharp timing, and you’ll never be caught flat-footed.'],
    loss: ['Not bad, kid, but you need to move faster when the pressure hits. Come back when your team is charged up.'],
  },
  'gym-kanto-koga': {
    win: ['You saw through every feint. A true ninja knows that observation is stronger than any disguise.'],
    loss: ['An elegant victory, trainer. You moved with the discipline I hoped to see.'],
  },
  'gym-kanto-sabrina': {
    win: ['You saw the shape of the battle before it unfolded. The Marsh Badge is yours; trust that clarity on the road ahead.'],
    loss: ['Your resolve is strong, but your thoughts wandered. Focus, and we shall meet again.'],
  },
  'gym-kanto-blaine': {
    win: ['A blazing performance! You’ve earned the Volcano Badge—and proved you can keep your head when the heat rises.'],
    loss: ['You have potential, but you let the pressure get to you. Return when your team is ready to face the heat.'],
  },
  'gym-kanto-giovanni': {
    win: ['You have defeated me, trainer. Take the Earth Badge and remember: power without purpose is only a burden.'],
    loss: ['You are not ready to face the strength of Viridian Gym. Return when your Pokémon can stand their ground.'],
  },
  'gym-leader': {
    win: ['You’ve earned this Badge. Take pride in the battle, and keep growing alongside your Pokémon.'],
    loss: ['You fought bravely. Train with your Pokémon, learn from this match, and return when you are ready.'],
  },
  default: {
    win: [
      'You’ve won this match. My Pokémon and I will learn from it and be ready when we meet again.',
      'That was a fine battle. I’ll take my team home, give them a rest, and start planning our next challenge.',
      'I concede. Your team earned this one, trainer. Safe travels on the road ahead.',
    ],
    loss: [
      'You earned that victory. My Pokémon and I are glad we got to test ourselves against your team.',
      'A well-fought match. Keep looking after your Pokémon, and I’m sure your journey will take you far.',
      'That was a strong performance. I hope we cross paths again when both our teams have grown.',
    ],
  },
}

const STORY_DIALOGUE: Record<string, DialoguePair> = {
  'battle-grumpy-man': {
    win: ['Hmph. Perhaps you have earned the right to pass. Don’t mistake that for an invitation to make a fuss in the forest.'],
    loss: ['There. That’s what comes of rushing ahead without listening to your elders. Try again when you’ve had a proper think.'],
  },
  'samurai-showdown': {
    win: ['A most honourable match! Your Metapod has endured and grown strong. I shall remember this battle.'],
    loss: ['Your Metapod has the spirit, but not yet the patience. Harden your resolve, young trainer, and we shall meet again.'],
  },
  'squirtle-squad-dock-prank': {
    win: ['Gah, Darn Squirtle always stealing our food!'],
    loss: ['Let that be a lesson to you!'],
  },
  'squirtle-squad-boathouse-scrap': {
    win: ['Char?'],
    loss: ['Char Char!'],
  },
  'squirtle-squad-rescue-battle': {
    win: ['Tatatatta Rattataaaa.'],
    loss: ['Screeeeeee!.'],
  },
  'mt-moon-grunt-1': {
    win: ['You’re making this dig more trouble than it’s worth. The others have already moved the important crates.'],
    loss: ['Should’ve kept walking. My shift’s over, and Rocket already has what it needs from this level.'],
  },
  'mt-moon-grunt-2': {
    win: ['You again? The radio says we’re wrapping up. You’re too late to stop the plan.'],
    loss: ['The boss is waiting. I’m not wasting another minute on you.'],
  },
  'mt-moon-grunt-3': {
    win: ['You’ve made your point. We’ve got what we came for, and I’ve got no reason to stay down here.'],
    loss: ['We got what we needed. You should worry about getting yourself out of this cave.'],
  },
  'mt-moon-grunt-4': {
    win: ['You really made it all the way down here? You’re a thorn, sure, but we got everything we needed. Better safe than sorry!'],
    loss: ['You’re a thorn, but not a particularly painful one. We got everything we needed. Better safe than sorry!'],
  },
  'researcher-miguel': {
    win: ['Thank you! I can get back to documenting the fossils now. The Museum will want to hear how you cleared the site.'],
    loss: ['I’m sorry, I can’t let you pass while the dig is still in danger. Those notes are all the Museum has from this survey.'],
  },
  'exp-mt-moon-clefairy-boss': {
    win: ['You’ve been a persistent nuisance. The crates are already out, and my people are waiting above. I’ll handle you myself.'],
    loss: ['You came all this way just to be in my way? The shipment is secure. Try not to get lost on your way back up.'],
  },
  'exp-mt-moon-clefable-boss': {
    win: ['Still standing? You’re more stubborn than you look. This operation is finished, so let’s finish this too.'],
    loss: ['That’s enough. The operation is over, and I have no time for another interruption.'],
  },
}

function stableIndex(id: string, suffix: string, length: number): number {
  let hash = 0
  const value = `${id}:${suffix}`
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0
  }
  return Math.abs(hash) % length
}

function trainerClassKey(battle: BattleConfig): string | undefined {
  if (battle.dynamicOpponent === 'rival') return 'rival'
  if (
    battle.trainerClassId === 'gym-leader' &&
    battle.icon.type === 'trainer' &&
    battle.icon.id.startsWith('gym-')
  ) {
    return battle.icon.id
  }
  if (battle.trainerClassId) return battle.trainerClassId
  return battle.icon.type === 'trainer' ? battle.icon.id : undefined
}

export function getTrainerBattleResultDialogue(
  battle: BattleConfig | undefined,
  enemyName?: string,
): { winMessage?: string; loseMessage?: string } {
  if (!battle || battle.pvp || battle.isWildBattle) return {}

  const trainerKey = trainerClassKey(battle)
  if (!trainerKey) return {}

  const dialogue = STORY_DIALOGUE[battle.id] || CLASS_DIALOGUE[trainerKey] || CLASS_DIALOGUE.default
  const name = battle.trainerName || enemyName || battle.name
  const winMessage = battle.winMessage || dialogue.win[stableIndex(battle.id, 'win', dialogue.win.length)]
  const loseMessage = battle.loseMessage || dialogue.loss[stableIndex(battle.id, 'loss', dialogue.loss.length)]
  return {
    winMessage: winMessage.replaceAll('{trainer}', name),
    loseMessage: loseMessage.replaceAll('{trainer}', name),
  }
}
