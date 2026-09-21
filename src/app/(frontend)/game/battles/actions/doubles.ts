import 'server-only'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { revalidatePath } from 'next/cache'
import { randomUUID } from 'node:crypto'
import { redis } from '@/utilities/redis'
import type { BattlePresentationEvent, BattleState } from '@/utilities/battle/types'
import { getDoublesPokemon, getDoublesSlots, processDoublesEntry, resolveDoublesTurn, validateDoublesActions, type DoublesAction } from '@/utilities/battle/doubles'
import { getActiveBattleState, BATTLE_TTL, PVP_BATTLE_PREFIX, getBattleConfigForState } from '../helpers/state-management'
import { getUser } from '../helpers/user'
import { runBattleActionWithGuard } from '../helpers/action-guard'
import { queuePvpMoveAndResolveTurn } from '../pvp/turn-sync'
import { handleWin } from '../helpers/win-handler'
import { handleBattleLoss } from '../helpers/loss-handler'
import { persistConsumedHeldItems } from '../helpers/held-items'
import { prepareDoublesSpecials } from './doubles-special'
import { getSharedBattleUserIds, toPerspectivePvpState } from '../pvp/state-utils'
import { chooseEnemyBattleAction } from '@/utilities/battle/enemy-ai'
import { recordPokemonKOForPokemon } from '../helpers/pokemon-ko-credit'
import { applyTrainerBattleItemById } from '@/utilities/battle/trainer-items'
import { isDoublesCommanderInactive } from '@/utilities/battle/doubles-abilities'
import { decrementFaintedPokemonFriendship } from '@/utilities/battle/friendship'
import {
  settleDoublesSketchAttempts,
  type DoublesSketchAttempt,
} from '../helpers/doubles-sketch'

function chooseEnemyActions(state: BattleState): DoublesAction[] {
  const actions: DoublesAction[] = []
  const savedPlayer=state.activePlayerIndex,savedEnemy=state.activeEnemyIndex
  for (const slot of [0, 1] as const) {
    const mon = getDoublesPokemon(state, 'enemy', slot)
    if (!mon || mon.currentHp <= 0 || isDoublesCommanderInactive(mon)) continue
    const partnerSlot=slot===0?1:0
    const partner=getDoublesPokemon(state,'enemy',partnerSlot)
    if(state.turn%2===1 && mon.aiMoves?.includes('helping-hand') && (mon.moveUsesRemaining??0)>0 && partner?.currentHp && !isDoublesCommanderInactive(partner)) {
      actions.push({slot,kind:'move',moveId:'helping-hand',target:{side:'ally',slot:partnerSlot}})
      continue
    }
    let best:ReturnType<typeof chooseEnemyBattleAction>|undefined
    let targetSlot:0|1=0
    for(const candidateSlot of [0,1] as const) {
      const player=getDoublesPokemon(state,'player',candidateSlot)
      if(!player?.currentHp||isDoublesCommanderInactive(player)) continue
      state.activeEnemyIndex=getDoublesSlots(state,'enemy')[slot]??0
      state.activePlayerIndex=getDoublesSlots(state,'player')[candidateSlot]??0
      const choice=chooseEnemyBattleAction({state,enemyMon:mon,playerMon:player,canUseItems:!actions.some(action=>action.kind==='item'),canSwitch:false,consumeMoveUse:false})
      if(!best||choice.score>best.score) {best=choice;targetSlot=candidateSlot}
    }
    if(best?.kind==='item') actions.push({slot,kind:'item',itemId:best.itemId})
    else if(best?.kind==='move' && (mon.moveUsesRemaining??0)>0) {
      const move=best.move.move
      actions.push({slot,kind:'move',moveId:move.id,target:move.doublesTarget==='ally'?{side:'ally',slot:slot===0?1:0}:move.doublesTarget==='self'||move.target==='self'||['both-opponents','both-allies','all-active'].includes(move.doublesTarget??'')?undefined:{side:'opponent',slot:targetSlot}})
    } else if(best) actions.push({slot,kind:'basic',stance:best.kind==='stance'?best.stance:mon.observedPreferredStance??'tech',attackType:mon.types[0]??'normal',target:{side:'opponent',slot:targetSlot}})
  }
  state.activePlayerIndex=savedPlayer
  state.activeEnemyIndex=savedEnemy
  return actions
}

export async function submitDoublesActions(actions: DoublesAction[], clientActionId?: string): Promise<{success:boolean; error?:string; state?:BattleState; waiting?:boolean}> {
  const user = await getUser({fresh:true})
  if (!user) return {success:false, error:'Not authenticated'}
  return runBattleActionWithGuard(user.id, clientActionId, async () => {
    const state = await getActiveBattleState(user)
    if (state?.format !== 'double') return {success:false, error:'No active double battle.'}
    if (state.status !== 'ongoing') return {success:false, error:'Battle has ended.'}
    if (state.pendingPlayerReplacementSlots?.length) return {success:false, error:'Fill the empty battle slots first.', state}
    const error = validateDoublesActions(state,'player', actions)
    if (error) return {success:false,error,state}
    const prepared = await prepareDoublesSpecials(user,state,actions)
    if (prepared.error) return {success:false,error:prepared.error,state}
    if (state.isPvp) {
      const result = await queuePvpMoveAndResolveTurn({viewerId:user.id,battleState:state,move:{stance:'tech',actions}})
      if (result.state.status !== 'ongoing') revalidatePath('/game/battles/encounter')
      return {success:true,state:result.state,waiting:result.waiting}
    }
    const enemyActions = chooseEnemyActions(state)
    const sketchAttempts: DoublesSketchAttempt[] = []
    try { resolveDoublesTurn(state,actions,enemyActions,Math.random,({state:next,side,actor,action,...rest})=>{
      if(side==='enemy'&&action.kind==='item') {
        const saved=next.activeEnemyIndex
        next.activeEnemyIndex=next.enemyTeam.indexOf(actor)
        try {const result=applyTrainerBattleItemById(next,action.itemId);if(!result.used) throw new Error('The trainer item had no effect.');return result.message??`${next.enemyName} used an item.`}
        finally {next.activeEnemyIndex=saved}
      }
      return prepared.callback({state:next,side,actor,action,...rest})
    }, (attempt) => {
      if (attempt.side === 'player') {
        sketchAttempts.push({
          attacker: attempt.actor,
          opponent: attempt.opponent,
          succeeded: attempt.succeeded,
          userId: user.id,
        })
      }
    }) }
    catch (cause) { return {success:false,error:cause instanceof Error ? cause.message : 'Could not resolve turn.',state} }
    if (sketchAttempts.length > 0) {
      const payload = await getPayload({config: configPromise})
      const sketchMessages = await settleDoublesSketchAttempts(
        state,
        sketchAttempts,
        payload,
      )
      if (sketchMessages.length > 0 && state.history[0]) {
        state.history[0].message += `\n${sketchMessages.join('\n')}`
      }
    }
    for(const event of state.presentation?.events??[]) if(event.type==='faint') recordPokemonKOForPokemon(state,event.side,(event.side==='player'?state.playerTeam:state.enemyTeam)[event.pokemonIndex])
    const faintedPlayerEvents=(state.presentation?.events??[]).filter((event):event is Extract<BattlePresentationEvent,{type:'faint'}>=>event.type==='faint'&&event.side==='player')
    if(faintedPlayerEvents.length) {
      const payload=await getPayload({config:configPromise})
      await Promise.all(faintedPlayerEvents.map(event=>decrementFaintedPokemonFriendship({payload,pokemon:state.playerTeam[event.pokemonIndex],userId:user.id,eventId:`${state.economyActionId||state.battleId}:${state.turn-1}:player:${event.pokemonIndex}:doubles-faint`})))
    }
    await prepared.commit()
    const config = getBattleConfigForState(state)
    if ((state.status as string) === 'won' && config) await handleWin(state,user,config)
    if ((state.status as string) === 'lost') await handleBattleLoss(state,user,config)
    if (state.status !== 'ongoing') state.isEligibleForReplay = false
    await persistConsumedHeldItems(state)
    await redis.set(`battle:${user.id}`,state,{ex:BATTLE_TTL})
    if (state.status !== 'ongoing') revalidatePath('/game/battles/encounter')
    return {success:true,state}
  })
}

export async function replaceDoublesPokemon(slot: 0 | 1, pokemonIndex: number, clientActionId?: string): Promise<{success:boolean;error?:string;state?:BattleState}> {
  const user = await getUser({fresh:true})
  if (!user) return {success:false,error:'Not authenticated'}
  return runBattleActionWithGuard(user.id,clientActionId,async () => {
    const state = await getActiveBattleState(user)
    if (state?.format !== 'double') return {success:false,error:'No active double battle.'}
    if (state.isPvp && state.pvpBattleId) {
      const key=`${PVP_BATTLE_PREFIX}${state.pvpBattleId}`
      for (let attempt=0;attempt<4;attempt++) {
        const shared=await redis.get<BattleState>(key)
        if (shared?.status!=='ongoing' || shared.format!=='double') return {success:false,error:'Double battle is no longer active.'}
        const {p1Id,p2Id}=getSharedBattleUserIds(shared)
        const side=user.id===p1Id?'player':user.id===p2Id?'enemy':null
        if (!side) return {success:false,error:'You are not in this battle.'}
        const pending=side==='player'?shared.pendingPlayerReplacementSlots:shared.pendingEnemyReplacementSlots
        if (!pending?.includes(slot)) return {success:false,error:'That lane does not need a replacement.'}
        const slots=getDoublesSlots(shared,side)
        const team=side==='player'?shared.playerTeam:shared.enemyTeam
        const mon=team[pokemonIndex]
        if (!mon || mon.currentHp<=0 || slots.includes(pokemonIndex)) return {success:false,error:'Choose a healthy reserve Pokemon.'}
        const previous=structuredClone(shared)
        const oldIndex=slots[slot]
        slots[slot]=pokemonIndex
        if (side==='player') {
          shared.activePlayerSlots=slots
          shared.activePlayerIndex=slots[0]??0
          shared.pendingPlayerReplacementSlots=pending.filter(value=>value!==slot)
        } else {
          shared.activeEnemySlots=slots
          shared.activeEnemyIndex=slots[0]??0
          shared.pendingEnemyReplacementSlots=pending.filter(value=>value!==slot)
        }
        mon.activeTurnStarted=shared.turn
        const entryMessages=processDoublesEntry(shared,side,slot)
        shared.presentation={sequenceId:randomUUID(),turn:shared.turn,events:[{type:'switch',side,fromIndex:oldIndex??pokemonIndex,toIndex:pokemonIndex,hpOnEntry:mon.currentHp,reason:'replacement',message:`${mon.name} entered the battle.`}]}
        shared.history.unshift({turn:shared.turn,playerStance:'tech',enemyStance:'tech',result:'tie',damageDealt:0,damageTaken:0,message:[`${mon.name} entered the battle.`,...entryMessages].join('\n')})
        if (await redis.setManyIfValue(key,previous,[{key,value:shared,ttlSeconds:BATTLE_TTL}])) return {success:true,state:toPerspectivePvpState(shared,user.id,state.pvpBattleId)}
      }
      return {success:false,error:'Another replacement was submitted. Try again.'}
    }
    if (!state.pendingPlayerReplacementSlots?.includes(slot)) return {success:false,error:'That slot does not need a replacement.'}
    const slots = getDoublesSlots(state,'player')
    const mon = state.playerTeam[pokemonIndex]
    if (!mon || mon.currentHp <= 0 || slots.includes(pokemonIndex)) return {success:false,error:'Choose a healthy reserve Pokemon.'}
    const oldIndex = slots[slot]
    slots[slot] = pokemonIndex
    state.activePlayerSlots = slots
    state.activePlayerIndex = slots[0] ?? 0
    state.pendingPlayerReplacementSlots = state.pendingPlayerReplacementSlots.filter(value => value !== slot)
    mon.activeTurnStarted = state.turn
    const entryMessages=processDoublesEntry(state,'player',slot)
    state.presentation = {sequenceId:`replacement:${state.turn}:${slot}:${pokemonIndex}`,turn:state.turn,events:[{type:'switch',side:'player',fromIndex:oldIndex ?? pokemonIndex,toIndex:pokemonIndex,hpOnEntry:mon.currentHp,reason:'replacement',message:`${mon.name} entered the battle.`}]}
    state.history.unshift({turn:state.turn,playerStance:'tech',enemyStance:'tech',result:'tie',damageDealt:0,damageTaken:0,message:[`${mon.name} entered the battle.`,...entryMessages].join('\n')})
    await redis.set(`battle:${user.id}`,state,{ex:BATTLE_TTL})
    return {success:true,state}
  })
}
