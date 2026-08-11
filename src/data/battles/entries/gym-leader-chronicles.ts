import { KANTO_GYM_CHRONICLES, type KantoGymChronicleKey } from '@/data/gym-leader-chronicles'
import type { TrainerClassId } from '@/data/trainers'
import type { BattleConfig, BattleEnemy } from '../../types'

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
}

const battleDefinitions: Record<KantoGymChronicleKey, ChronicleBattleDefinition[]> = {
  brock: [
    { id: 'first-challenger', name: "Taro's Challenge", description: 'Welcome the first challenger willing to step inside the neglected Pewter Gym.', trainerClassId: 'youngster', trainerName: 'Taro', icon: { type: 'trainer', id: 'youngster' }, background: '/backgrounds/chronicle-brock-neglected-gym.avif', enemyTeam: [{ speciesId: 56, formId: '56', level: 13 }, { speciesId: 74, formId: '74', level: 14 }] },
    { id: 'league-examiner', name: 'The League Examination', description: 'Show Examiner Mara how the neglected Pewter Gym can become a place worth trusting.', trainerClassId: 'expert-f', trainerName: 'Mara', icon: { type: 'trainer', id: 'expert-f' }, background: '/backgrounds/chronicle-brock-neglected-gym.avif', enemyTeam: [{ speciesId: 111, formId: '111', level: 14 }, { speciesId: 37, formId: '37', level: 13 }] },
  ],
  misty: [
    { id: 'service-gyarados', name: 'The Churning Channel', description: 'Calm the frightened Gyarados blocking the flooded service channel before the Horsea reach the grate.', icon: { type: 'pokemon', id: '130' }, background: '/backgrounds/chronicle-misty-pump-room.avif', wild: true, enemyTeam: [{ speciesId: 130, formId: '130', level: 22 }] },
    { id: 'daisys-challenge', name: "Daisy's Challenge", description: 'Complete the formal battle test that will decide who leads Cerulean Gym\'s battle programme.', trainerClassId: 'swimmer-f', trainerName: 'Daisy', icon: { type: 'trainer', id: 'swimmer-f' }, background: '/backgrounds/chronicle-misty-water-theater.avif', enemyTeam: [{ speciesId: 118, formId: '118', level: 19 }, { speciesId: 86, formId: '86', level: 21 }] },
  ],
  surge: [
    { id: 'makos-drill', name: "Mako's Drill", description: 'Run the emergency drill exactly as written, then listen when Mako challenges the plan.', trainerClassId: 'engineer', trainerName: 'Mako', icon: { type: 'trainer', id: 'engineer' }, background: '/backgrounds/chronicle-surge-gym-shelter.avif', enemyTeam: [{ speciesId: 81, formId: '81', level: 25 }, { speciesId: 100, formId: '100', level: 26 }] },
    { id: 'substation-magneton', name: 'The Substation Magneton', description: 'Stabilise the frightened Magneton before its surges tear through the emergency grid.', icon: { type: 'pokemon', id: '82' }, background: '/backgrounds/chronicle-surge-blackout-streets.avif', wild: true, maxPokemon: 3, enemyTeam: [{ speciesId: 82, formId: '82', level: 30, aiMoves: ['thunder-shock', 'thunder-wave', 'swift'] }] },
  ],
  erika: [
    { id: 'exhibition-rival', name: 'A Graceful Answer', description: 'Face Celia in the exhibition battle arranged to turn a public slight into an acceptable spectacle.', trainerClassId: 'beauty', trainerName: 'Celia', icon: { type: 'trainer', id: 'beauty' }, background: '/backgrounds/chronicle-erika-flower-exhibition.avif', maxPokemon: 3, enemyTeam: [{ speciesId: 70, formId: '70', level: 27 }, { speciesId: 46, formId: '46', level: 28 }, { speciesId: 35, formId: '35', level: 29 }] },
  ],
  koga: [
    { id: 'janines-spar', name: "Janine's Method", description: 'Test Janine after she refuses to copy a technique she does not understand.', trainerClassId: 'school-kid-f', trainerName: 'Janine', icon: { type: 'trainer', id: 'school-kid-f' }, background: '/backgrounds/chronicle-koga-training-courtyard.avif', maxPokemon: 3, enemyTeam: [{ speciesId: 48, formId: '48', level: 31 }, { speciesId: 109, formId: '109', level: 32 }] },
    { id: 'decoy-thief', name: 'The Perfect Decoy', description: 'Catch the thief whose trail was designed to be found.', trainerClassId: 'super-nerd', trainerName: 'Jiro', icon: { type: 'trainer', id: 'super-nerd' }, background: '/backgrounds/chronicle-koga-fuchsia-rooftops.avif', maxPokemon: 3, enemyTeam: [{ speciesId: 88, formId: '88', level: 33 }, { speciesId: 42, formId: '42', level: 34 }] },
    { id: 'tunnel-culprit', name: 'Below the Rooftops', description: 'Trust Janine to close the escape route and recover the stolen toxin case.', trainerClassId: 'pokemaniac', trainerName: 'Raku', icon: { type: 'trainer', id: 'pokemaniac' }, background: '/backgrounds/chronicle-koga-apothecary.avif', maxPokemon: 3, enemyTeam: [{ speciesId: 24, formId: '24', level: 35 }, { speciesId: 110, formId: '110', level: 35 }] },
  ],
  sabrina: [
    { id: 'unstable-porygon', name: 'Porygon Between Signals', description: 'Reach Porygon while the Silph receivers pull it toward two destinations.', icon: { type: 'pokemon', id: '137' }, background: '/backgrounds/chronicle-sabrina-teleport-lab.avif', wild: true, enemyTeam: [{ speciesId: 137, formId: '137', level: 37, aiMoves: ['psybeam', 'recover', 'swift'] }] },
    { id: 'koichis-focus-test', name: "Koichi's Focus Test", description: 'Take the consent-led focus battle Koichi offers under rules Sabrina controls.', trainerClassId: 'black-belt', trainerName: 'Koichi', icon: { type: 'trainer', id: 'black-belt' }, background: '/backgrounds/gym-fighting.avif', enemyTeam: [{ speciesId: 106, formId: '106', level: 36 }, { speciesId: 107, formId: '107', level: 36 }] },
  ],
  blaine: [
    { id: 'safety-demonstration', name: 'The Safety Demonstration', description: 'Prove the new containment system can shut itself down under pressure.', trainerClassId: 'researcher', trainerName: 'Orin', icon: { type: 'trainer', id: 'researcher' }, background: '/backgrounds/chronicle-blaine-cinnabar-lab.avif', enemyTeam: [{ speciesId: 82, formId: '82', level: 40 }, { speciesId: 101, formId: '101', level: 41 }] },
    { id: 'escaped-magmar', name: 'The Escaped Magmar', description: 'Guide the panicked Magmar away from the smoke-filled containment wing.', icon: { type: 'pokemon', id: '126' }, background: '/backgrounds/chronicle-blaine-cinnabar-lab.avif', wild: true, enemyTeam: [{ speciesId: 126, formId: '126', level: 43, aiMoves: ['ember', 'smokescreen', 'fire-spin'] }] },
  ],
  giovanni: [
    { id: 'relief-raiders', name: 'Raiders on the Western Road', description: 'Protect one of the first contracted convoys using the reopened road.', trainerClassId: 'gamer', trainerName: 'Cato', icon: { type: 'trainer', id: 'gamer' }, background: '/backgrounds/gym-ground.avif', enemyTeam: [{ speciesId: 20, formId: '20', level: 42 }, { speciesId: 24, formId: '24', level: 43 }] },
    { id: 'league-assessment', name: 'The League Assessment', description: 'Complete the battle assessment required to reopen Viridian Gym.', trainerClassId: 'expert-m', trainerName: 'Hadrian', icon: { type: 'trainer', id: 'expert-m' }, background: '/backgrounds/gym-ground.avif', enemyTeam: [{ speciesId: 67, formId: '67', level: 44 }, { speciesId: 57, formId: '57', level: 45 }, { speciesId: 112, formId: '112', level: 46 }] },
  ],
}

export const gymLeaderChronicleBattles: BattleConfig[] = KANTO_GYM_CHRONICLES.flatMap(
  (chronicle) =>
    battleDefinitions[chronicle.key].map((battle) => ({
      id: `chronicle-${chronicle.key}-${battle.id}`,
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
      maxPokemon:
        battle.maxPokemon ?? Math.min(4, Math.max(1, battle.enemyTeam.length)),
      levelCap: Math.max(
        ...battle.enemyTeam.map((enemy) =>
          typeof enemy.level === 'number' ? enemy.level + 4 : enemy.level.max + 4,
        ),
      ),
      isWildBattle: battle.wild,
      disableRewards: true,
      disableLossPayout: true,
      enemyAttackTelegraphChance: 2,
    })),
)
