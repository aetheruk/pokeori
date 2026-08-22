import {
  KANTO_GYM_CHRONICLES,
  type KantoGymChronicleKey,
} from '@/data/gym-leader-chronicles'
import type { TrainerClassId } from '@/data/trainers'
import type { BattleAiProfileId, BattleConfig, BattleEnemy } from '../../types'

interface ChronicleBattleDefinition {
  id: string
  name: string
  description: string
  trainerClassId?: TrainerClassId
  trainerName?: string
  icon: BattleConfig['icon']
  background: string
  enemyTeam: BattleEnemy[]
  wild?: boolean
  maxPokemon?: number
  aiProfile?: BattleAiProfileId
}

const definitions: Record<KantoGymChronicleKey, ChronicleBattleDefinition[]> = {
  brock: [
    {
      id: 'first-challenger', name: "Taro's Challenge", description: 'Keep a first official challenge safe on a floor neither trainer can take for granted.',
      trainerClassId: 'youngster', trainerName: 'Taro', icon: { type: 'trainer', id: 'youngster' }, background: '/backgrounds/chronicle-brock-neglected-gym.avif',
      enemyTeam: [
        { speciesId: 56, formId: '56', level: 13, aiMoves: ['low-kick', 'karate-chop', 'leer'] },
        { speciesId: 74, formId: '74', level: 14, aiMoves: ['rock-throw', 'defense-curl', 'harden'] },
      ],
    },
    {
      id: 'league-examiner', name: "Mara's League Examination", description: 'Demonstrate a Pewter challenge built around patience, safety and shared responsibility.',
      trainerClassId: 'chronicle-mara', trainerName: 'Mara', icon: { type: 'trainer', id: 'chronicle-mara' }, background: '/backgrounds/chronicle-brock-neglected-gym.avif', aiProfile: 'boss',
      enemyTeam: [
        { speciesId: 111, formId: '111', level: 15, aiMoves: ['horn-attack', 'stomp', 'tail-whip'] },
        { speciesId: 37, formId: '37', level: 15, aiMoves: ['ember', 'quick-attack', 'confuse-ray'] },
        { speciesId: 67, formId: '67', level: 15, aiMoves: ['karate-chop', 'low-kick', 'focus-energy'] },
      ],
    },
  ],
  misty: [
    {
      id: 'service-gyarados', name: 'Gyarados at the Cove', description: 'Create room to rescue Horsea without mistaking Gyarados’s warning for cruelty.',
      icon: { type: 'pokemon', id: '130' }, background: '/backgrounds/chronicle-misty-cerulean-cape.avif', wild: true, maxPokemon: 3, aiProfile: 'advanced',
      enemyTeam: [{ speciesId: 130, formId: '130', level: 20, aiMoves: ['bite', 'dragon-rage', 'leer'] }],
    },
    {
      id: 'daisys-challenge', name: "Daisy's League Trial", description: 'Meet Daisy’s adaptable water team in the formal trial for Cerulean leadership.',
      trainerClassId: 'chronicle-daisy', trainerName: 'Daisy', icon: { type: 'trainer', id: 'chronicle-daisy' }, background: '/backgrounds/chronicle-misty-water-theater.avif', aiProfile: 'boss',
      enemyTeam: [
        { speciesId: 118, formId: '118', level: 21, aiMoves: ['water-gun', 'horn-attack', 'supersonic'] },
        { speciesId: 86, formId: '86', level: 22, aiMoves: ['headbutt', 'aurora-beam', 'growl'] },
        { speciesId: 87, formId: '87', level: 23, aiMoves: ['aurora-beam', 'headbutt', 'rest'] },
      ],
    },
  ],
  surge: [
    {
      id: 'makos-drill', name: "Mako's Emergency Drill", description: 'Run the shelter drill against an engineer who will exploit every rigid assumption.',
      trainerClassId: 'chronicle-mako', trainerName: 'Mako', icon: { type: 'trainer', id: 'chronicle-mako' }, background: '/backgrounds/chronicle-surge-gym-shelter.avif', aiProfile: 'advanced',
      enemyTeam: [
        { speciesId: 81, formId: '81', level: 27, aiMoves: ['thunder-shock', 'thunder-wave', 'sonic-boom'] },
        { speciesId: 100, formId: '100', level: 28, aiMoves: ['spark', 'screech', 'swift'] },
      ],
    },
    {
      id: 'substation-magneton', name: 'Magneton Between Fields', description: 'Stabilise the frightened Magneton without driving it into the flooded bank.',
      icon: { type: 'pokemon', id: '82' }, background: '/backgrounds/chronicle-surge-blackout-streets.avif', wild: true, maxPokemon: 3, aiProfile: 'advanced',
      enemyTeam: [{ speciesId: 82, formId: '82', level: 31, aiMoves: ['spark', 'thunder-wave', 'swift', 'supersonic'] }],
    },
    {
      id: 'league-assessment', name: 'Vermilion League Assessment', description: 'Prove that controlled power includes listening when the plan must change.',
      trainerClassId: 'chronicle-steward', trainerName: 'League Steward', icon: { type: 'trainer', id: 'chronicle-steward' }, background: '/backgrounds/chronicle-surge-gym-shelter.avif', maxPokemon: 4, aiProfile: 'boss',
      enemyTeam: [
        { speciesId: 53, formId: '53', level: 30, aiMoves: ['pay-day', 'bite', 'growl'] },
        { speciesId: 85, formId: '85', level: 31, aiMoves: ['drill-peck', 'fury-attack', 'growl'] },
        { speciesId: 65, formId: '65', level: 32, aiMoves: ['confusion', 'disable', 'reflect'] },
      ],
    },
  ],
  erika: [
    {
      id: 'exhibition-rival', name: "Celia's Exhibition Challenge", description: 'Answer Celia’s public challenge with the patient strategy the committee has underestimated.',
      trainerClassId: 'chronicle-celia', trainerName: 'Celia', icon: { type: 'trainer', id: 'chronicle-celia' }, background: '/backgrounds/chronicle-erika-flower-exhibition.avif', maxPokemon: 3, aiProfile: 'advanced',
      enemyTeam: [
        { speciesId: 70, formId: '70', level: 29, aiMoves: ['acid', 'sleep-powder', 'vine-whip'] },
        { speciesId: 46, formId: '46', level: 29, aiMoves: ['leech-life', 'stun-spore', 'slash'] },
        { speciesId: 35, formId: '35', level: 30, aiMoves: ['sing', 'double-slap', 'metronome'] },
      ],
    },
    {
      id: 'league-steward', name: 'The Rainbow Assessment', description: 'Earn authority over the garden without pretending the opportunity came without conditions.',
      trainerClassId: 'chronicle-steward', trainerName: 'Exhibition Steward', icon: { type: 'trainer', id: 'chronicle-steward' }, background: '/backgrounds/chronicle-erika-greenhouse.avif', maxPokemon: 4, aiProfile: 'boss',
      enemyTeam: [
        { speciesId: 53, formId: '53', level: 29, aiMoves: ['pay-day', 'bite', 'growl'] },
        { speciesId: 76, formId: '76', level: 30, aiMoves: ['rock-throw', 'defense-curl', 'headbutt'] },
        { speciesId: 65, formId: '65', level: 30, aiMoves: ['confusion', 'disable', 'reflect'] },
      ],
    },
  ],
  koga: [
    {
      id: 'decoy-thief', name: 'The Perfect Decoy', description: 'Test Jiro’s rehearsed confession instead of accepting the convenient ending.',
      trainerClassId: 'super-nerd', trainerName: 'Jiro', icon: { type: 'trainer', id: 'super-nerd' }, background: '/backgrounds/chronicle-koga-fuchsia-rooftops.avif', maxPokemon: 3, aiProfile: 'advanced',
      enemyTeam: [{ speciesId: 88, formId: '88', level: 30, aiMoves: ['sludge', 'acid-armor', 'disable'] }, { speciesId: 42, formId: '42', level: 28, aiMoves: ['wing-attack', 'confuse-ray', 'bite'] }],
    },
    {
      id: 'tunnel-culprit', name: 'The Toxin Evacuation', description: 'Clear the exposed courtyard by trusting Janine’s unmarked route.',
      trainerClassId: 'chronicle-janine', trainerName: 'Janine', icon: { type: 'trainer', id: 'chronicle-janine' }, background: '/backgrounds/chronicle-koga-training-courtyard.avif', maxPokemon: 3, aiProfile: 'advanced',
      enemyTeam: [{ speciesId: 24, formId: '24', level: 32, aiMoves: ['glare', 'acid', 'bite'] }, { speciesId: 110, formId: '110', level: 32, aiMoves: ['sludge', 'smokescreen', 'smog'] }],
    },
    {
      id: 'ren-succession', name: "Ren's Succession Match", description: 'Face the inherited method after its author changes every expected opening.',
      trainerClassId: 'chronicle-ren', trainerName: 'Master Ren', icon: { type: 'trainer', id: 'chronicle-ren' }, background: '/backgrounds/chronicle-koga-training-courtyard.avif', maxPokemon: 4, aiProfile: 'boss',
      enemyTeam: [{ speciesId: 49, formId: '49', level: 33, aiMoves: ['psybeam', 'stun-spore', 'supersonic'] }, { speciesId: 89, formId: '89', level: 34, aiMoves: ['sludge', 'acid-armor', 'disable'] }, { speciesId: 110, formId: '110', level: 35, aiMoves: ['sludge', 'smokescreen', 'smog'] }],
    },
  ],
  sabrina: [
    {
      id: 'unstable-porygon', name: 'Porygon Between Signals', description: 'Hold one destination stable long enough for Porygon to choose where to emerge.',
      icon: { type: 'pokemon', id: '137' }, background: '/backgrounds/chronicle-sabrina-teleport-lab.avif', wild: true, maxPokemon: 3, aiProfile: 'advanced',
      enemyTeam: [{ speciesId: 137, formId: '137', level: 38, aiMoves: ['psybeam', 'recover', 'swift', 'agility'] }],
    },
    {
      id: 'koichis-focus-test', name: "Koichi's Focus Test", description: 'Battle under consent-led rules where pausing is a technique, not a failure.',
      trainerClassId: 'chronicle-koichi', trainerName: 'Koichi', icon: { type: 'trainer', id: 'chronicle-koichi' }, background: '/backgrounds/gym-fighting.avif', maxPokemon: 3, aiProfile: 'boss',
      enemyTeam: [{ speciesId: 106, formId: '106', level: 38, aiMoves: ['rolling-kick', 'jump-kick', 'focus-energy'] }, { speciesId: 107, formId: '107', level: 38, aiMoves: ['comet-punch', 'mega-punch', 'agility'] }, { speciesId: 68, formId: '68', level: 39, aiMoves: ['karate-chop', 'submission', 'leer'] }],
    },
  ],
  blaine: [
    {
      id: 'orins-demonstration', name: "Orin's Regulator Test", description: 'Pressure-test the automatic regulator before the rare response makes caution inconvenient.',
      trainerClassId: 'chronicle-orin', trainerName: 'Orin', icon: { type: 'trainer', id: 'chronicle-orin' }, background: '/backgrounds/chronicle-blaine-cinnabar-lab.avif', aiProfile: 'advanced',
      enemyTeam: [{ speciesId: 82, formId: '82', level: 40, aiMoves: ['spark', 'thunder-wave', 'supersonic'] }, { speciesId: 101, formId: '101', level: 41, aiMoves: ['self-destruct', 'swift', 'screech'] }],
    },
    {
      id: 'escaped-magmar', name: 'The Escaped Magmar', description: 'Guide the panicked Magmar from the smoke without repeating the experiment’s coercion.',
      icon: { type: 'pokemon', id: '126' }, background: '/backgrounds/chronicle-blaine-cinnabar-lab.avif', wild: true, maxPokemon: 3, aiProfile: 'boss',
      enemyTeam: [{ speciesId: 126, formId: '126', level: 44, aiMoves: ['fire-punch', 'smokescreen', 'confuse-ray', 'fire-spin'] }],
    },
    {
      id: 'league-assessment', name: 'The Cinnabar Assessment', description: 'Demonstrate a Fire Gym whose strongest system is its ability to stop.',
      trainerClassId: 'chronicle-steward', trainerName: 'League Examiner', icon: { type: 'trainer', id: 'chronicle-steward' }, background: '/backgrounds/chronicle-blaine-abandoned-quiz-room.avif', maxPokemon: 4, aiProfile: 'boss',
      enemyTeam: [{ speciesId: 53, formId: '53', level: 43, aiMoves: ['pay-day', 'bite', 'growl'] }, { speciesId: 71, formId: '71', level: 44, aiMoves: ['acid', 'sleep-powder', 'vine-whip'] }, { speciesId: 65, formId: '65', level: 45, aiMoves: ['confusion', 'disable', 'reflect'] }],
    },
  ],
  giovanni: [
    {
      id: 'relief-raiders', name: "Cato's Western Toll", description: 'Protect the first relief convoy from the private force that expected to own the road.',
      trainerClassId: 'gamer', trainerName: 'Cato', icon: { type: 'trainer', id: 'gamer' }, background: '/backgrounds/gym-ground.avif', maxPokemon: 4, aiProfile: 'boss',
      enemyTeam: [{ speciesId: 20, formId: '20', level: 43, aiMoves: ['hyper-fang', 'quick-attack', 'focus-energy'] }, { speciesId: 24, formId: '24', level: 44, aiMoves: ['glare', 'acid', 'bite'] }, { speciesId: 57, formId: '57', level: 45, aiMoves: ['karate-chop', 'focus-energy', 'fury-swipes'] }],
    },
    {
      id: 'league-assessment', name: "Hadrian's League Assessment", description: 'Prove that the system built around Viridian Gym can withstand an opponent you do not control.',
      trainerClassId: 'chronicle-hadrian', trainerName: 'Hadrian', icon: { type: 'trainer', id: 'chronicle-hadrian' }, background: '/backgrounds/chronicle-giovanni-viridian-office.avif', maxPokemon: 4, aiProfile: 'boss',
      enemyTeam: [{ speciesId: 67, formId: '67', level: 45, aiMoves: ['karate-chop', 'low-kick', 'focus-energy'] }, { speciesId: 57, formId: '57', level: 46, aiMoves: ['karate-chop', 'focus-energy', 'fury-swipes'] }, { speciesId: 112, formId: '112', level: 47, aiMoves: ['horn-drill', 'stomp', 'tail-whip'] }, { speciesId: 65, formId: '65', level: 47, aiMoves: ['psybeam', 'recover', 'reflect'] }],
    },
  ],
}

const telegraphChance: Record<KantoGymChronicleKey, number> = {
  brock: 70, misty: 60, surge: 55, erika: 50, koga: 30, sabrina: 35, blaine: 25, giovanni: 20,
}

export const gymLeaderChronicleBattles: BattleConfig[] = KANTO_GYM_CHRONICLES.flatMap(
  (chronicle) => definitions[chronicle.key].map((battle) => ({
    id: `chronicle-v2-${chronicle.key}-${battle.id}`,
    name: battle.name,
    description: battle.description,
    category: 'Secret',
    subCategory: `${chronicle.leaderName} Chronicle`,
    trainerClassId: battle.trainerClassId,
    trainerName: battle.trainerName,
    icon: battle.icon,
    background: battle.background,
    requirements: [{ type: 'task_completed', targetId: chronicle.markerId }],
    enemyTeam: battle.enemyTeam,
    rewards: [],
    maxPokemon: battle.maxPokemon ?? Math.min(4, Math.max(1, battle.enemyTeam.length)),
    levelCap: Math.max(...battle.enemyTeam.map((enemy) => typeof enemy.level === 'number' ? enemy.level + 3 : enemy.level.max + 3)),
    isWildBattle: battle.wild,
    aiProfile: battle.aiProfile ?? 'trainer',
    disableRewards: true,
    disableLossPayout: true,
    enemyAttackTelegraphChance: telegraphChance[chronicle.key],
  })),
)
