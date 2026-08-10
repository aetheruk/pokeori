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
  enemyTeam: BattleEnemy[]
  wild?: boolean
  maxPokemon?: number
}

const battleDefinitions: Record<KantoGymChronicleKey, ChronicleBattleDefinition[]> = {
  brock: [
    { id: 'panicked-rhyhorn', name: 'The Frightened Rhyhorn', description: 'Calm the Rhyhorn and guide it back toward the quarry entrance.', icon: { type: 'pokemon', id: '111' }, wild: true, enemyTeam: [{ speciesId: 111, formId: '111', level: 13, aiMoves: ['horn-attack', 'stomp'] }] },
    { id: 'first-challenger', name: "Taro's Challenge", description: 'Battle Taro during the quarry reopening.', trainerClassId: 'youngster', trainerName: 'Taro', icon: { type: 'trainer', id: 'youngster' }, enemyTeam: [{ speciesId: 56, formId: '56', level: 13 }, { speciesId: 74, formId: '74', level: 14 }] },
  ],
  misty: [
    { id: 'panicked-gyarados', name: 'The Churning Pool', description: 'Calm Gyarados before anyone can reach the trapped Horsea.', icon: { type: 'pokemon', id: '130' }, wild: true, enemyTeam: [{ speciesId: 130, formId: '130', level: 22 }] },
    { id: 'sisters-test', name: "Daisy's Challenge", description: 'Battle Daisy for the right to put Pokémon battles at the centre of the Gym.', trainerClassId: 'swimmer-f', trainerName: 'Daisy', icon: { type: 'trainer', id: 'swimmer-f' }, enemyTeam: [{ speciesId: 118, formId: '118', level: 19 }, { speciesId: 86, formId: '86', level: 21 }] },
  ],
  surge: [
    { id: 'runway-drill', name: 'Loose in the Hold', description: "Help Mako calm the Pokémon startled by the transport's power surge.", trainerClassId: 'engineer', trainerName: 'Mako', icon: { type: 'trainer', id: 'engineer' }, enemyTeam: [{ speciesId: 81, formId: '81', level: 25 }, { speciesId: 100, formId: '100', level: 26 }] },
    { id: 'electabuzz-overload', name: 'Hold the Current', description: 'Stay with Electabuzz while it keeps the failing auxiliary circuit alive.', icon: { type: 'pokemon', id: '125' }, wild: true, enemyTeam: [{ speciesId: 125, formId: '125', level: 30, aiMoves: ['thunder-shock', 'thunder-wave', 'quick-attack'] }] },
  ],
  erika: [
    { id: 'suffering-muk', name: 'A Frightened Muk', description: 'Calm the sick Muk without forcing it farther into the contaminated drain.', icon: { type: 'pokemon', id: '89' }, wild: true, maxPokemon: 3, enemyTeam: [{ speciesId: 89, formId: '89', level: 30, aiMoves: ['sludge', 'acid', 'harden'] }] },
    { id: 'developer-enforcer', name: 'The Site Manager', description: 'Stop Gable from emptying the chemical tank into the drain before the city inspector arrives.', trainerClassId: 'gentleman', trainerName: 'Gable', icon: { type: 'trainer', id: 'gentleman' }, maxPokemon: 3, enemyTeam: [{ speciesId: 110, formId: '110', level: 28 }, { speciesId: 53, formId: '53', level: 29 }] },
  ],
  koga: [
    { id: 'venom-poachers', name: 'The Venom Thieves', description: 'Corner the first thief outside the Safari Zone storehouse.', trainerClassId: 'pokemaniac', trainerName: 'Raku', icon: { type: 'trainer', id: 'pokemaniac' }, enemyTeam: [{ speciesId: 20, formId: '20', level: 32 }, { speciesId: 24, formId: '24', level: 34 }] },
    { id: 'chemical-case', name: 'Recover the Case', description: 'Catch the second thief and recover the missing venom samples.', trainerClassId: 'super-nerd', trainerName: 'Jiro', icon: { type: 'trainer', id: 'super-nerd' }, enemyTeam: [{ speciesId: 42, formId: '42', level: 34 }, { speciesId: 110, formId: '110', level: 35 }] },
  ],
  sabrina: [
    { id: 'unstable-porygon', name: 'Porygon in the Signal', description: 'Reach Porygon while the teleport chamber pulls it in two directions.', icon: { type: 'pokemon', id: '137' }, wild: true, enemyTeam: [{ speciesId: 137, formId: '137', level: 37, aiMoves: ['psybeam', 'recover', 'swift'] }] },
    { id: 'dojo-trial', name: 'Noise from the Dojo', description: "Separate the neighbouring Dojo's amplified thoughts from Porygon's signal.", trainerClassId: 'black-belt', trainerName: 'Echo of Koichi', icon: { type: 'trainer', id: 'black-belt' }, enemyTeam: [{ speciesId: 106, formId: '106', level: 36 }, { speciesId: 107, formId: '107', level: 36 }] },
  ],
  blaine: [
    { id: 'lockdown-system', name: 'Security Test', description: "Test the laboratory's automatic lockdown before the next trial.", trainerClassId: 'researcher', trainerName: 'Orin', icon: { type: 'trainer', id: 'researcher' }, enemyTeam: [{ speciesId: 82, formId: '82', level: 40 }, { speciesId: 101, formId: '101', level: 41 }] },
    { id: 'burning-corridor', name: 'The Smoke-Filled Corridor', description: 'Clear the corridor so the technicians can reach the exit.', icon: { type: 'pokemon', id: '126' }, wild: true, enemyTeam: [{ speciesId: 126, formId: '126', level: 43, aiMoves: ['ember', 'smokescreen', 'fire-spin'] }] },
  ],
  giovanni: [
    { id: 'relief-raiders', name: 'Raiders on the Western Road', description: 'Protect one of the first contracted convoys using the reopened road.', trainerClassId: 'gamer', trainerName: 'Cato', icon: { type: 'trainer', id: 'gamer' }, enemyTeam: [{ speciesId: 20, formId: '20', level: 42 }, { speciesId: 24, formId: '24', level: 43 }] },
    { id: 'league-assessment', name: 'The League Assessment', description: 'Complete the battle assessment required to reopen Viridian Gym.', trainerClassId: 'expert-m', trainerName: 'Hadrian', icon: { type: 'trainer', id: 'expert-m' }, enemyTeam: [{ speciesId: 67, formId: '67', level: 44 }, { speciesId: 57, formId: '57', level: 45 }, { speciesId: 112, formId: '112', level: 46 }] },
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
      background: chronicle.background,
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
