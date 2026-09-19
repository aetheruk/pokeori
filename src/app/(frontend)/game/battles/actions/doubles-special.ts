import 'server-only'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { User } from '@/payload-types'
import type { BattlePokemon, BattlePresentationEvent, BattleState } from '@/utilities/battle/types'
import { getDoublesPokemon, getDoublesSlots, processDoublesEntry, processDoublesExit, type DoublesAction, type DoublesSide, type DoublesSpecialAction } from '@/utilities/battle/doubles'
import { parseBattlePowerCommand, validateCommonPowerRequirements } from '@/utilities/battle/action-validation'
import { getSkillLevel, getItemSkillLockReason } from '@/utilities/skills/unlocks'
import { getUserInventoryMap, setUserInventoryMap } from '@/utilities/user-state'
import { items } from '@/data/items'
import { applyBattleItemEffect } from '@/utilities/battle/item-effects'
import { getBattleItemUseLimit } from '@/utilities/battle/item-use-limits'
import { activateMegaEvolution } from '../powers/mega'
import { activateTera } from '../powers/tera'
import { activateDynamax } from '../powers/dynamax'
import { WEATHER_POWER_EFFECTS } from '../powers/weather'
import { applyShoutStatBoost } from '@/utilities/battle/shout-effects'
import { applyStatus, calculateDamage } from '@/utilities/battle/battle-logic'
import { processBattleAbilityTeraActivation } from '@/utilities/battle/abilities'
import { applyBattleFormChange } from '@/utilities/battle/stats-calc'
import { canGigantamax, getGigantamaxForm } from '@/data/powers'
import { getSharedBattleUserIds } from '../pvp/state-utils'
import { getStanceWinCharges, POWER_STANCE_WIN_COST, spendPowerCharge } from '@/utilities/battle/power-charges'

type PowerAction = Extract<DoublesAction,{kind:'power'}>
type ItemAction = Extract<DoublesAction,{kind:'item'}>

export function applyDoublesPowerAction(state: BattleState, side: DoublesSide, actor: BattlePokemon, action: PowerAction, context: {slot:0|1;emitEvent:(event:BattlePresentationEvent)=>void;random:()=>number}): string {
  const userId = side === 'player' ? getSharedBattleUserIds(state).p1Id : getSharedBattleUserIds(state).p2Id
  const powers = state.isPvp && userId ? state.pvpPowers?.[userId] : state.powers
  if (!powers) throw new Error('Power state is unavailable.')
  if (getStanceWinCharges(powers) < POWER_STANCE_WIN_COST) throw new Error('Win 3 stance matchups to use a Power.')
  if (action.powerId === 'z-move') throw new Error('Arm a Z-Move before choosing this turn.')
  const {slot,emitEvent,random} = context
  const opposingSide = side === 'player' ? 'enemy' : 'player'
  const requestedSlot = action.target?.side === 'opponent' ? action.target.slot : slot
  const targetSlot = getDoublesPokemon(state,opposingSide,requestedSlot)?.currentHp ? requestedSlot : (requestedSlot === 0 ? 1 : 0)
  const target = getDoublesPokemon(state,opposingSide,targetSlot)
  const actorIndex = getDoublesSlots(state,side)[slot]
  const targetIndex = getDoublesSlots(state,opposingSide)[targetSlot]
  const emitHeal = (mon:BattlePokemon, healSide:DoublesSide, index:number, before:number) => {
    const amount = mon.currentHp - before
    if (amount > 0) emitEvent({type:'hp-change',side:healSide,pokemonIndex:index,kind:'heal',amount,hpAfter:mon.currentHp,message:`${mon.name} recovered ${amount} HP!`})
  }
  const hitTarget = (stance:'power'|'speed'|'tech',attackType:string,multiplier:number,label:string) => {
    if (!target || targetIndex === null || actorIndex === null) return `${actor.name} used ${label}, but there was no target.`
    const damage = calculateDamage(actor,target,stance,multiplier,attackType,undefined,undefined,undefined,state.weather?.weather,undefined,{currentTurn:state.turn}).damage
    target.currentHp = Math.max(0,target.currentHp-damage)
    const message = `${side === 'player' ? state.playerName : state.enemyName}: ${actor.name} uses ${label} on ${target.name}! [icon:stance:${stance}] [icon:type:${attackType}] Dealt ${damage}.`
    emitEvent({type:'attack',actorSide:side,targetSide:opposingSide,actorIndex,targetIndex,damage,hpAfter:target.currentHp,attackType,animateActor:true,message})
    return message
  }
  if (action.powerId === 'victory') {
    const itemId = action.formId
    if (!itemId?.startsWith('victory-') || powers.victoryUsesRemaining <= 0) throw new Error('Victory Power is unavailable.')
    const type = itemId.slice('victory-'.length)
    const team = side === 'player' ? state.playerTeam : state.enemyTeam
    const active = getDoublesSlots(state,side)
    const valid = team.map((mon,index)=>({mon,index})).filter(({mon,index})=>mon.currentHp>0&&!active.includes(index)&&mon.types.some(t=>t.toLowerCase()===type))
    if (!valid.length || actorIndex === null) throw new Error('No eligible reserve Pokémon for Victory Power.')
    const incoming = valid[Math.floor(random()*valid.length)]
    processDoublesExit(state,side,actor)
    const slots = [...active] as [number|null,number|null]
    slots[slot] = incoming.index
    if (side === 'player') state.activePlayerSlots = slots
    else state.activeEnemySlots = slots
    incoming.mon.status = {id:'victory',counter:0}
    incoming.mon.activeTurnStarted = state.turn + 1
    processDoublesEntry(state,side,slot,random)
    spendPowerCharge(powers)
    powers.victoryUsesRemaining -= 1
    const message = `${actor.name} used Victory Power and switched to ${incoming.mon.name}!`
    emitEvent({type:'switch',side,fromIndex:actorIndex,toIndex:incoming.index,hpOnEntry:incoming.mon.currentHp,reason:'voluntary',message})
    return message
  }
  if (action.powerId === 'shout') {
    if (powers.shoutUsesRemaining <= 0) throw new Error('No Battle Shouts remaining.')
    const boost = applyShoutStatBoost(actor,state.turn)
    if (!boost.applied) throw new Error(boost.message)
    spendPowerCharge(powers)
    powers.shoutUsesRemaining -= 1
    if (actorIndex !== null) emitEvent({type:'boost',side,pokemonIndex:actorIndex,kind:'shout',message:boost.message})
    return boost.message
  }
  if (action.powerId === 'weather') {
    if (powers.weatherUsesRemaining <= 0) throw new Error('No Weather Power uses remaining.')
    const effect = WEATHER_POWER_EFFECTS[state.weather?.weather ?? 'clear']
    let message = `${actor.name} used ${effect.name}!`
    if (effect.healPercent) {
      const before = actor.currentHp
      actor.currentHp = Math.min(actor.maxHp,actor.currentHp+Math.floor(actor.maxHp*effect.healPercent/100))
      if (actorIndex !== null) emitHeal(actor,side,actorIndex,before)
    }
    if (effect.status) {
      const statusTarget = effect.statusTarget === 'enemy' ? target : actor
      if (statusTarget) message += ` ${applyStatus(statusTarget,effect.status,state.weather?.weather,{terrain:state.terrain?.terrain}).message}`
    }
    if (effect.attackType) message += ` ${hitTarget(effect.stance,effect.attackType,1.5,effect.name)}`
    spendPowerCharge(powers)
    powers.weatherUsesRemaining -= 1
    return message
  }
  if (action.powerId === 'circadian') {
    if (powers.circadianUsesRemaining <= 0) throw new Error('No Circadian uses remaining.')
    const hour = new Date().getHours()
    const phase = hour >= 6 && hour < 12 ? 'dawn' : hour >= 12 && hour < 18 ? 'day' : hour >= 18 && hour < 24 ? 'dusk' : 'night'
    let message = `${actor.name} used Circadian Power!`
    if (phase === 'night') {
      const before=actor.currentHp
      actor.currentHp=Math.min(actor.maxHp,actor.currentHp+Math.floor(actor.maxHp/2))
      if (actorIndex !== null) emitHeal(actor,side,actorIndex,before)
      message += ` ${applyStatus(actor,'regen',state.weather?.weather,{terrain:state.terrain?.terrain}).message}`
    } else if (phase === 'dawn') {
      message += ` ${applyStatus(actor,'veil',state.weather?.weather,{terrain:state.terrain?.terrain}).message}`
      message += ` ${hitTarget('power',actor.types[0]??'normal',1.5,"Dawn's Blessing")}`
    } else {
      if (target) message += ` ${applyStatus(target,phase==='day'?'burn':'poison',state.weather?.weather,{terrain:state.terrain?.terrain}).message}`
      message += ` ${hitTarget(phase==='day'?'tech':'speed',actor.types[0]??'normal',1.5,phase==='day'?'Blinding Sun':'Dusk Shadow')}`
    }
    spendPowerCharge(powers)
    powers.circadianUsesRemaining -= 1
    return message
  }
  if (action.powerId === 'dimensional-shift') {
    const kind = action.formId
    if (kind !== 'time' && kind !== 'space' && kind !== 'chaos') throw new Error('Choose a Dimensional Shift.')
    if (kind === 'time') {
      for (const effectSide of ['player','enemy'] as const) for (const effectSlot of [0,1] as const) {
        const mon = getDoublesPokemon(state,effectSide,effectSlot)
        const index = getDoublesSlots(state,effectSide)[effectSlot]
        if (!mon || index === null) continue
        const before=mon.currentHp
        mon.currentHp=mon.maxHp
        mon.status=undefined
        emitHeal(mon,effectSide,index,before)
      }
    } else if (kind === 'space') {
      powers.dimensionalShift.activeEffect={type:'space',turnsRemaining:999}
    } else {
      const stats = (['attack','defense','specialAttack','specialDefense','speed'] as const)
      const mons = (['player','enemy'] as const).flatMap(effectSide => ([0,1] as const).map(effectSlot=>getDoublesPokemon(state,effectSide,effectSlot))).filter((mon):mon is BattlePokemon=>!!mon?.currentHp)
      const values = mons.flatMap(mon=>stats.map(stat=>mon.stats[stat]))
      for (let i=values.length-1;i>0;i--) {const j=Math.floor(random()*(i+1));[values[i],values[j]]=[values[j],values[i]]}
      mons.forEach((mon,index)=>stats.forEach((stat,statIndex)=>{mon.stats[stat]=values[index*stats.length+statIndex]}))
      powers.dimensionalShift.activeEffect={type:'chaos',turnsRemaining:999}
    }
    spendPowerCharge(powers)
    return `${actor.name} activated Dimensional Shift: ${kind}!`
  }
  if (action.powerId === 'tera') {
    if (powers.teraUsesRemaining <= 0 || !activateTera(actor,state.turn)) throw new Error('Terastallization is unavailable.')
    powers.teraUsesRemaining -= 1
    spendPowerCharge(powers)
    const ability = processBattleAbilityTeraActivation({state,pokemon:actor})
    applyBattleFormChange(actor,ability.formId)
    return `${actor.name} terastallized!${ability.messages.length ? ` ${ability.messages.join(' ')}` : ''}`
  }
  if (action.powerId === 'mega') {
    if (!action.formId || powers.megaUsesRemaining <= 0 || !activateMegaEvolution(actor,action.formId)) throw new Error('Mega Evolution is unavailable.')
    powers.megaUsesRemaining -= 1
    spendPowerCharge(powers)
    powers.megaEvolved = true
    powers.megaFormId = action.formId
    return `${actor.name} Mega Evolved!`
  }
  if (action.powerId === 'dynamax') {
    if (powers.dynamaxUsesRemaining <= 0) throw new Error('Dynamax is unavailable.')
    const form = action.formId ?? (canGigantamax(actor.formId) ? getGigantamaxForm(actor.formId) : undefined)
    if (!activateDynamax(actor,form)) throw new Error('Dynamax is unavailable.')
    powers.dynamaxUsesRemaining -= 1
    spendPowerCharge(powers)
    powers.dynamaxActive = true
    powers.dynamaxTurnsRemaining = actor.dynamaxTurnsRemaining ?? 0
    return `${actor.name} Dynamaxed!`
  }
  throw new Error('Unknown Trainer Power.')
}

export async function prepareDoublesSpecials(user: User, state: BattleState, actions: DoublesAction[]): Promise<{error?:string; callback: DoublesSpecialAction; commit:()=>Promise<void>}> {
  const itemActions = actions.filter((action):action is ItemAction=>action.kind==='item')
  const powerActions = actions.filter((action):action is PowerAction=>action.kind==='power')
  if(powerActions.length>1) return {error:'Choose only one Trainer Power per turn.',callback:()=>'',commit:async()=>{}}
  const payload = itemActions.length || powerActions.length ? await getPayload({config:configPromise}) : null
  const inventory = payload ? await getUserInventoryMap(payload as any,user.id) : {}
  const itemCounts: Record<string,number> = {}
  const itemDefinitions = new Map<string,(typeof items)[number]>()
  if (itemActions.length > 0) {
    if (state.isPvp) return {error:'Trainer items are not available in PvP.',callback:()=>'',commit:async()=>{}}
    if (state.itemsUsedThisBattle.length + itemActions.length > getBattleItemUseLimit(state,'player')) return {error:'Battle item use limit reached.',callback:()=>'',commit:async()=>{}}
    for (const action of itemActions) {
      const item = items.find(candidate=>candidate.id===action.itemId)
      if (!item?.battleEffect || ['tera','z-move'].includes(item.battleEffect.type)) return {error:'Choose a usable battle item.',callback:()=>'',commit:async()=>{}}
      if (state.config?.allowedItems?.length && !state.config.allowedItems.includes(action.itemId)) return {error:'This item is not allowed in this battle.',callback:()=>'',commit:async()=>{}}
      const skillError = state.chronicle ? null : getItemSkillLockReason(item,user.skills)
      if (skillError) return {error:skillError,callback:()=>'',commit:async()=>{}}
      itemCounts[action.itemId]=(itemCounts[action.itemId]??0)+1
      itemDefinitions.set(action.itemId,item)
    }
    const source = state.chronicle ? state.chronicleInventory??{} : inventory
    for (const [id,count] of Object.entries(itemCounts)) if ((source[id]??0)<count) return {error:`You do not have enough ${id}.`,callback:()=>'',commit:async()=>{}}
  }
  for (const action of powerActions) {
    const actor = state.playerTeam[state.activePlayerSlots?.[action.slot] ?? state.activePlayerIndex]
    const command = parseBattlePowerCommand(`power:${action.powerId}${action.formId?`:${action.formId}`:''}`,actor)
    const userPowers = state.isPvp ? state.pvpPowers?.[user.id] ?? state.powers : state.powers
    const error = userPowers && actor ? validateCommonPowerRequirements({command,inventory,pokemon:actor,powers:userPowers,trainerLevel:getSkillLevel(user.skills,'battling')}) : 'Power state is unavailable.'
    if (error) return {error,callback:()=>'',commit:async()=>{}}
  }
  const callback: DoublesSpecialAction = ({state:next,side,slot,actor,action,emitEvent,random}) => {
    if (action.kind==='power') return applyDoublesPowerAction(next,side,actor,action,{slot,emitEvent,random})
    const item = itemDefinitions.get(action.itemId)
    if (!item?.battleEffect) throw new Error('Battle item is unavailable.')
    const target = next.playerTeam[action.targetPokemonIndex ?? next.activePlayerSlots?.[slot] ?? next.activePlayerIndex]
    if (!target) throw new Error('Choose an item target.')
    const effect = applyBattleItemEffect({pokemon:target,battleEffect:item.battleEffect})
    if (!effect.applied) throw new Error(effect.message || 'This item has no effect.')
    next.itemsUsedThisBattle.push({itemId:action.itemId,turn:next.turn})
    return effect.message
  }
  const commit = async () => {
    if (!itemActions.length) return
    const source = state.chronicle ? {...state.chronicleInventory} : {...inventory}
    for (const [id,count] of Object.entries(itemCounts)) {
      const remaining=(source[id]??0)-count
      if (remaining>0) source[id]=remaining
      else delete source[id]
    }
    if (state.chronicle) state.chronicleInventory=source
    else if (payload) await setUserInventoryMap(payload as any,user.id,source)
  }
  return {callback,commit}
}
