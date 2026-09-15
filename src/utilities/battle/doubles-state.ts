import type { BattlePokemon, BattleStance, BattleState } from './types'

export type DoublesSide = 'player' | 'enemy'
export type DoublesSlot = 0 | 1
export type DoublesTarget = {side:'ally'|'opponent';slot:DoublesSlot}
export type DoublesAction =
  | {slot:DoublesSlot;kind:'basic';stance:BattleStance;attackType:string;target:DoublesTarget}
  | {slot:DoublesSlot;kind:'move';moveId:string;target?:DoublesTarget;selectedType?:string}
  | {slot:DoublesSlot;kind:'switch';pokemonIndex:number}
  | {slot:DoublesSlot;kind:'item';itemId:string;targetPokemonIndex?:number}
  | {slot:DoublesSlot;kind:'power';powerId:'tera'|'mega'|'dynamax'|'z-move';formId?:string}

export function getDoublesSlots(state:BattleState,side:DoublesSide):[number|null,number|null] {
  const slots=side==='player'?state.activePlayerSlots:state.activeEnemySlots
  return slots??(side==='player'?[state.activePlayerIndex,state.playerTeam.length>1?1:null]:[state.activeEnemyIndex,state.enemyTeam.length>1?1:null])
}
export function getDoublesTeam(state:BattleState,side:DoublesSide) {return side==='player'?state.playerTeam:state.enemyTeam}
export function getDoublesPokemon(state:BattleState,side:DoublesSide,slot:DoublesSlot):BattlePokemon|undefined {
  const index=getDoublesSlots(state,side)[slot]
  return index===null?undefined:getDoublesTeam(state,side)[index]
}
