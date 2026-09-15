import type { BattlePokemon, BattleStance, BattleState } from './types'
import { getDoublesPokemon, type DoublesSide, type DoublesSlot } from './doubles-state'

function ability(mon: BattlePokemon|undefined): string|undefined {
  return mon?.currentHp && !mon.battleAbilityState?.suppressed && typeof mon.ability==='string' ? mon.ability : undefined
}

export function getDoublesDamageMultiplier(state:BattleState,attackerSide:DoublesSide,attackerSlot:DoublesSlot,targetSide:DoublesSide,targetSlot:DoublesSlot,stance:BattleStance,attackType:string):number {
  const attacker=getDoublesPokemon(state,attackerSide,attackerSlot)
  const target=getDoublesPokemon(state,targetSide,targetSlot)
  const partner=getDoublesPokemon(state,attackerSide,attackerSlot===0?1:0)
  const targetPartner=getDoublesPokemon(state,targetSide,targetSlot===0?1:0)
  if (!attacker||!target) return 1
  if (attackerSide===targetSide && ability(target)==='telepathy') return 0
  let multiplier=1
  if (attackerSide!==targetSide && ability(targetPartner)==='friend_guard') multiplier*=0.75
  if (attackerSide!==targetSide && ability(partner)==='power_spot') multiplier*=1.3
  if (attackerSide!==targetSide && ability(partner)==='battery' && stance==='tech') multiplier*=1.3
  if (attackerSide!==targetSide && ability(partner)==='steely_spirit' && attackType==='steel') multiplier*=1.5
  if (stance==='tech' && ['plus','minus'].includes(ability(attacker)??'') && ['plus','minus'].includes(ability(partner)??'')) multiplier*=1.5
  return multiplier
}

export function getDoublesAccuracyMultiplier(state:BattleState,side:DoublesSide,slot:DoublesSlot):number {
  return ability(getDoublesPokemon(state,side,slot===0?1:0))==='victory_star'?1.1:1
}

export function getDoublesPartnerPriorityBlock(state:BattleState,side:DoublesSide,slot:DoublesSlot):string|undefined {
  const partner=getDoublesPokemon(state,side,slot===0?1:0)
  const id=ability(partner)
  return ['armor_tail','queenly_majesty','dazzling'].includes(id??'')?`${partner?.name}'s ${id?.replaceAll('_',' ')} protected its ally!`:undefined
}

export function processDoublesPartnerProtection(state:BattleState,side:DoublesSide,slot:DoublesSlot,previousStatus:BattlePokemon['status'],previousStages:BattlePokemon['statStages']):string[] {
  const mon=getDoublesPokemon(state,side,slot),partner=getDoublesPokemon(state,side,slot===0?1:0)
  if(!mon||!partner) return []
  const id=ability(partner),messages:string[]=[]
  if(mon.status?.id!==previousStatus?.id && ((id==='sweet_veil'&&mon.status?.id==='sleep')||(id==='flower_veil'&&mon.types.some(type=>type.toLowerCase()==='grass')))) {
    mon.status=previousStatus
    messages.push(`${partner.name}'s ${id?.replaceAll('_',' ')} protected ${mon.name} from status!`)
  }
  if(id==='flower_veil'&&mon.types.some(type=>type.toLowerCase()==='grass')&&previousStages&&mon.statStages) {
    let protectedDrop=false
    for(const stat of Object.keys(previousStages) as (keyof NonNullable<BattlePokemon['statStages']>)[]) if(mon.statStages[stat]<previousStages[stat]) {mon.statStages[stat]=previousStages[stat];protectedDrop=true}
    if(protectedDrop) messages.push(`${partner.name}'s Flower Veil protected ${mon.name}'s stats!`)
  }
  return messages
}

export function processDoublesPartnerEntry(state:BattleState,side:DoublesSide,slot:DoublesSlot):string[] {
  const mon=getDoublesPokemon(state,side,slot), partner=getDoublesPokemon(state,side,slot===0?1:0)
  if (!mon||!partner||partner.currentHp<=0) return []
  const messages:string[]=[]
  if (ability(mon)==='hospitality' && partner.currentHp<partner.maxHp) {
    const before=partner.currentHp
    partner.currentHp=Math.min(partner.maxHp,partner.currentHp+Math.max(1,Math.floor(partner.maxHp/4)))
    messages.push(`${mon.name}'s Hospitality restored ${partner.currentHp-before} HP to ${partner.name}.`)
  }
  if (ability(mon)==='costar' && partner.statStages) {
    mon.statStages={...partner.statStages}
    messages.push(`${mon.name}'s Costar copied ${partner.name}'s stat changes.`)
  }
  const commander=ability(mon)==='commander'&&partner.speciesId===977?mon:ability(partner)==='commander'&&mon.speciesId===977?partner:undefined
  const dondozo=commander===mon?partner:commander===partner?mon:undefined
  if(commander&&dondozo&&!commander.battleAbilityState?.commanderLinkedTo) {
    commander.battleAbilityState??={}
    commander.battleAbilityState.commanderLinkedTo=dondozo.id
    dondozo.statStages??={attack:0,defense:0,specialAttack:0,specialDefense:0,speed:0,crit:0,accuracy:0,evasion:0}
    for(const stat of ['attack','defense','specialAttack','specialDefense','speed'] as const) dondozo.statStages[stat]=Math.min(6,dondozo.statStages[stat]+2)
    messages.push(`${commander.name}'s Commander strengthened ${dondozo.name} and joined it.`)
  }
  return messages
}

export function isDoublesCommanderInactive(mon:BattlePokemon|undefined):boolean {return !!mon?.battleAbilityState?.commanderLinkedTo}

export function releaseDoublesCommander(state:BattleState):void {
  for(const side of ['player','enemy'] as const) for(const slot of [0,1] as const) {
    const mon=getDoublesPokemon(state,side,slot)
    const linked=mon?.battleAbilityState?.commanderLinkedTo
    const partner=getDoublesPokemon(state,side,slot===0?1:0)
    if(linked && (!partner?.currentHp || partner.id!==linked)) mon!.battleAbilityState!.commanderLinkedTo=undefined
  }
}

export function processDoublesPartnerItemTransfer(state:BattleState,side:DoublesSide,slot:DoublesSlot):string|undefined {
  const mon=getDoublesPokemon(state,side,slot), partner=getDoublesPokemon(state,side,slot===0?1:0)
  if (!mon||!partner||ability(partner)!=='symbiosis'||!partner.heldItemId||mon.heldItemId) return undefined
  mon.heldItemId=partner.heldItemId
  partner.heldItemId=undefined
  return `${partner.name}'s Symbiosis passed its held item to ${mon.name}.`
}

export function processDoublesPartnerTurnEnd(state:BattleState,random:()=>number):string[] {
  const messages:string[]=[]
  for(const side of ['player','enemy'] as const) for(const slot of [0,1] as const) {
    const mon=getDoublesPokemon(state,side,slot),partner=getDoublesPokemon(state,side,slot===0?1:0)
    if(!mon||!partner||mon.currentHp<=0) continue
    if(ability(mon)==='healer'&&partner.currentHp>0&&partner.status&&random()<0.3) {const cured=partner.status.id;partner.status=undefined;messages.push(`${mon.name}'s Healer cured ${partner.name}'s ${cured}!`)}
    if(['receiver','power_of_alchemy'].includes(ability(mon)??'')&&partner.currentHp<=0&&typeof partner.ability==='string'&&mon.ability!==partner.ability) {
      mon.battleAbilityState??={}
      mon.battleAbilityState.originalAbility??=typeof mon.ability==='string'?mon.ability:undefined
      mon.ability=partner.ability
      messages.push(`${mon.name} inherited ${partner.name}'s ability!`)
    }
    const transfer=processDoublesPartnerItemTransfer(state,side,slot)
    if(transfer) messages.push(transfer)
  }
  return messages
}
