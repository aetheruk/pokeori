import 'server-only'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { User } from '@/payload-types'
import type { BattlePokemon, BattleState } from '@/utilities/battle/types'
import type { DoublesAction, DoublesSide, DoublesSpecialAction } from '@/utilities/battle/doubles'
import { parseBattlePowerCommand, validateCommonPowerRequirements } from '@/utilities/battle/action-validation'
import { getSkillLevel, getItemSkillLockReason } from '@/utilities/skills/unlocks'
import { getUserInventoryMap, setUserInventoryMap } from '@/utilities/user-state'
import { items } from '@/data/items'
import { applyBattleItemEffect } from '@/utilities/battle/item-effects'
import { getBattleItemUseLimit } from '@/utilities/battle/item-use-limits'
import { activateMegaEvolution } from '../powers/mega'
import { activateTera } from '../powers/tera'
import { activateDynamax } from '../powers/dynamax'
import { activateZMove } from '../powers/z-move'
import { processBattleAbilityTeraActivation } from '@/utilities/battle/abilities'
import { applyBattleFormChange } from '@/utilities/battle/stats-calc'
import { canGigantamax, getGigantamaxForm } from '@/data/powers'
import { getSharedBattleUserIds } from '../pvp/state-utils'

type PowerAction = Extract<DoublesAction,{kind:'power'}>
type ItemAction = Extract<DoublesAction,{kind:'item'}>

export function applyDoublesPowerAction(state: BattleState, side: DoublesSide, actor: BattlePokemon, action: PowerAction): string {
  const userId = side === 'player' ? getSharedBattleUserIds(state).p1Id : getSharedBattleUserIds(state).p2Id
  const powers = state.isPvp && userId ? state.pvpPowers?.[userId] : state.powers
  if (!powers) throw new Error('Power state is unavailable.')
  if (action.powerId === 'tera') {
    if (powers.teraUsesRemaining <= 0 || !activateTera(actor,state.turn)) throw new Error('Terastallization is unavailable.')
    powers.teraUsesRemaining -= 1
    const ability = processBattleAbilityTeraActivation({state,pokemon:actor})
    applyBattleFormChange(actor,ability.formId)
    return `${actor.name} terastallized!${ability.messages.length ? ` ${ability.messages.join(' ')}` : ''}`
  }
  if (action.powerId === 'mega') {
    if (!action.formId || powers.megaUsesRemaining <= 0 || !activateMegaEvolution(actor,action.formId)) throw new Error('Mega Evolution is unavailable.')
    powers.megaUsesRemaining -= 1
    powers.megaEvolved = true
    powers.megaFormId = action.formId
    return `${actor.name} Mega Evolved!`
  }
  if (action.powerId === 'dynamax') {
    if (!powers.dynamaxAvailable || powers.dynamaxUsesRemaining <= 0) throw new Error('Dynamax is unavailable.')
    const form = action.formId ?? (canGigantamax(actor.formId) ? getGigantamaxForm(actor.formId) : undefined)
    if (!activateDynamax(actor,form)) throw new Error('Dynamax is unavailable.')
    powers.dynamaxUsesRemaining -= 1
    powers.dynamaxActive = true
    powers.dynamaxTurnsRemaining = actor.dynamaxTurnsRemaining ?? 0
    return `${actor.name} Dynamaxed!`
  }
  if (powers.zMoveUsesRemaining <= 0 || !activateZMove(actor)) throw new Error('Z-Move is unavailable.')
  powers.zMoveUsesRemaining -= 1
  powers.zMoveUsed = powers.zMoveUsesRemaining <= 0
  return `${actor.name} prepared a Z-Move!`
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
    const error = state.powers && actor ? validateCommonPowerRequirements({command,inventory,pokemon:actor,powers:state.powers,trainerLevel:getSkillLevel(user.skills,'battling')}) : 'Power state is unavailable.'
    if (error) return {error,callback:()=>'',commit:async()=>{}}
  }
  const callback: DoublesSpecialAction = ({state:next,side,slot,actor,action}) => {
    if (action.kind==='power') return applyDoublesPowerAction(next,side,actor,action)
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
