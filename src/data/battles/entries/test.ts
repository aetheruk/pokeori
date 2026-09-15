import type { BattleConfig } from '../../types'

const neutralIVs = {hp:15,attack:15,defense:15,specialAttack:15,specialDefense:15,speed:15}
const neutralEVs = {hp:0,attack:0,defense:0,specialAttack:0,specialDefense:0,speed:0}

export const testBattles: BattleConfig[] = [{
  id: 'kanto-test-double-battle',
  name: 'Double Battle Trial',
  description: 'A repeatable field exercise against Plusle and Minun. Bring at least two Pokemon.',
  category: 'Kanto', subCategory: 'Test',
  icon: {type:'trainer',id:'youngster'},
  background: '/backgrounds/friend-stadium.avif',
  requirements: [], rewards: [], maxPokemon: 4, levelCap: 30,
  enemyAttackTelegraphChance: 2, format: 'double',
  enemyTeam: [
    {speciesId:311,formId:'311',name:'Plusle',level:20,ivs:neutralIVs,evs:neutralEVs,aiMoves:['helping-hand']},
    {speciesId:312,formId:'312',name:'Minun',level:20,ivs:neutralIVs,evs:neutralEVs},
    {speciesId:25,formId:'25',name:'Pikachu',level:20,ivs:neutralIVs,evs:neutralEVs,aiMoves:['discharge']},
    {speciesId:133,formId:'133',name:'Eevee',level:20,ivs:neutralIVs,evs:neutralEVs},
  ],
}]
