import { randomUUID } from 'node:crypto'
import { getDoublesPokemon, getDoublesSlots, getDoublesTeam, type DoublesAction, type DoublesSide, type DoublesSlot, type DoublesTarget } from './doubles-state'
export { getDoublesPokemon, getDoublesSlots, getDoublesTeam } from './doubles-state'
export type { DoublesAction, DoublesSide, DoublesSlot, DoublesTarget } from './doubles-state'
import { getMove, resolveMoveDamageMultiplier } from '@/data/moves'
import type { MoveConfig } from '@/data/moves/types'
import type { BattlePokemon, BattlePresentationEvent, BattleStance, BattleState } from './types'
import { calculateDamage } from './damage-calc'
import { resolveStance } from './turn-resolution'
import { getEffectiveBattleSpeed } from './stats-calc'
import { applyStatus, applyMoveAbsorbHealing, applyMoveSelfDamage } from './status-effects-logic'
import { applyBattleAbilityDamageModifiers, applyBattleAbilityOpposingMoveUseDepletion } from './abilities'
import { applyMoveRuntimeEffects, doesBattleMoveHit, getEffectiveMoveAccuracy } from './move-effects'
import { applyHeldItemIfTriggered } from './held-items'
import { restoreConsumedBerryByAbility } from './held-items'
import { processEndTurnStatusDamage, processEndTurnWeatherDamageForState } from './turn-logic'
import { processSecondaryStatusesForTurnEnd } from './secondary-statuses'
import { clearPokemonSecondaryStatuses, clearSourceLinkedTrapSecondaryStatuses, processSecondaryStatusesForSwitch } from './secondary-statuses'
import { processDelayedMoveDamage } from './move-effects'
import { processTerrainTurnEffects } from './terrain-effects'
import { tickDisabledStance } from './stance-disable'
import { processBattleAbilityTurnEndEffects, processBattleAbilitySuppressionForState, processBattleAbilityWeatherSet, processBattleAbilityTerrainSet } from './abilities'
import { processBattleAbilitySwitchOut } from './switching'
import { processBattleRarityTurnEnd } from './rarity-effects'
import { markPlayerPokemonInvolved } from './participants'
import { resetBattleTypeChange } from './tera'
import { clearZMoveCharge } from './z-move'
import { DYNAMAX_UNLOCK_TURNS } from '@/data/powers'
import { advanceTeraDuration, advanceBattleTypeChangeDuration } from './tera'
import { clearDynamaxState } from './dynamax'
import { preparePvpCombatAction, resolvePvpCombat, resolvePvpMoveAttackType, type PvpQueuedMoveForPowerUse } from './engine/pvp-turn'
import { getDoublesAccuracyMultiplier, getDoublesDamageMultiplier, getDoublesPartnerPriorityBlock, isDoublesCommanderInactive, processDoublesPartnerEntry, processDoublesPartnerItemTransfer, processDoublesPartnerProtection, processDoublesPartnerTurnEnd, releaseDoublesCommander } from './doubles-abilities'
import { SKETCH_MOVE_ID } from '@/utilities/pokemon/sketch'

export type DoublesSpecialAction = (params: { state: BattleState; side: DoublesSide; slot: DoublesSlot; actor: BattlePokemon; action: Extract<DoublesAction, {kind:'item'|'power'}> }) => string

export type DoublesMoveResolution = {
  state: BattleState
  side: DoublesSide
  slot: DoublesSlot
  actor: BattlePokemon
  action: Extract<DoublesAction, { kind: 'move' }>
  move: MoveConfig
  opponent?: BattlePokemon
  succeeded: boolean
}

export type DoublesMoveResolved = (
  resolution: DoublesMoveResolution,
) => void

function otherSide(side: DoublesSide): DoublesSide { return side === 'player' ? 'enemy' : 'player' }
function absoluteTarget(side: DoublesSide, target: DoublesTarget): DoublesSide {
  return target.side === 'ally' ? side : otherSide(side)
}

export function processDoublesEntry(state:BattleState,side:DoublesSide,slot:DoublesSlot,random:()=>number=Math.random):string[] {
  const mon=getDoublesPokemon(state,side,slot)
  const index=getDoublesSlots(state,side)[slot]
  if(!mon||index===null) return []
  const savedPlayer=state.activePlayerIndex,savedEnemy=state.activeEnemyIndex
  const opposing=getDoublesSlots(state,otherSide(side))[slot]??getDoublesSlots(state,otherSide(side))[0]??0
  if(side==='player') {state.activePlayerIndex=index;state.activeEnemyIndex=opposing}
  else {state.activeEnemyIndex=index;state.activePlayerIndex=opposing}
  try {
    mon.activeTurnStarted=state.turn
    if(side==='player') markPlayerPokemonInvolved(state,index)
    return [
      ...processSecondaryStatusesForSwitch(state,side,random),
      ...processBattleAbilitySuppressionForState(state),
      ...processBattleAbilityWeatherSet({state,pokemon:mon,ownerName:side==='player'?state.playerName:state.enemyName}),
      ...processBattleAbilityTerrainSet({state,pokemon:mon,ownerName:side==='player'?state.playerName:state.enemyName}),
      ...processDoublesPartnerEntry(state,side,slot),
    ]
  } finally {state.activePlayerIndex=savedPlayer;state.activeEnemyIndex=savedEnemy}
}

function processDoublesExit(state:BattleState,side:DoublesSide,mon:BattlePokemon):string[] {
  clearZMoveCharge(mon)
  clearSourceLinkedTrapSecondaryStatuses({state,sourceSide:side,sourcePokemon:mon})
  clearPokemonSecondaryStatuses(mon)
  resetBattleTypeChange(mon)
  return processBattleAbilitySwitchOut(mon)
}

export function validateDoublesActions(state: BattleState, side: DoublesSide, actions: DoublesAction[]): string | undefined {
  if (state.format !== 'double') return 'This is not a double battle.'
  if (actions.length < 1 || actions.length > 2) return 'Choose an action for each active Pokemon.'
  const seen = new Set<number>()
  const switches = new Set<number>()
  for (const action of actions) {
    if (seen.has(action.slot)) return 'Each active Pokemon may act only once.'
    seen.add(action.slot)
    const actor = getDoublesPokemon(state, side, action.slot)
    if (!actor || actor.currentHp <= 0 || isDoublesCommanderInactive(actor)) return 'An inactive or fainted Pokemon cannot act.'
    if (action.kind === 'switch') {
      const slots = getDoublesSlots(state, side)
      const target = getDoublesTeam(state, side)[action.pokemonIndex]
      if (!target || target.currentHp <= 0 || slots.includes(action.pokemonIndex) || switches.has(action.pokemonIndex))
        return 'Choose a healthy reserve Pokemon for each switch.'
      switches.add(action.pokemonIndex)
    } else if (action.kind === 'move') {
      const move = getMove(action.moveId)
      const available = side === 'enemy' && !state.isPvp
        ? [...(actor.aiMoveLoadout ?? []), ...(actor.aiMoves ?? []), ...(actor.battleMoveIds ?? [])]
        : actor.battleMoveIds ?? []
      if (!move || !available.includes(move.id)) return `${actor.name} cannot use that move.`
      if (move.charged || move.recharge || move.continuous) return `${move.name}'s multi-turn lock is not available in double battles yet.`
      if ((actor.moveUsesRemaining ?? 0) <= 0) return `${actor.name} has no move uses remaining.`
      if (move.doublesTarget === 'ally' && (action.target?.side !== 'ally' || action.target.slot === action.slot || !getDoublesPokemon(state, side, action.target.slot)?.currentHp))
        return 'That move needs an active ally.'
      if (move.doublesTarget==='any-single' && (!action.target || (action.target.side==='ally' ? action.target.slot===action.slot || !getDoublesPokemon(state,side,action.target.slot)?.currentHp || isDoublesCommanderInactive(getDoublesPokemon(state,side,action.target.slot)) : !getDoublesPokemon(state,otherSide(side),action.target.slot)?.currentHp || isDoublesCommanderInactive(getDoublesPokemon(state,otherSide(side),action.target.slot))))) return 'Choose an active target.'
      if ((move.doublesTarget === 'opponent' || (!move.doublesTarget && move.target !== 'self')) && (action.target?.side !== 'opponent' || !getDoublesPokemon(state, otherSide(side), action.target.slot)?.currentHp || isDoublesCommanderInactive(getDoublesPokemon(state,otherSide(side),action.target.slot))))
        return 'Choose an active opponent for this move.'
    } else if (action.kind === 'basic') {
      if (!['power','speed','tech'].includes(action.stance)) return 'Invalid stance.'
      if (action.target.side !== 'opponent' || !getDoublesPokemon(state,otherSide(side),action.target.slot)?.currentHp || isDoublesCommanderInactive(getDoublesPokemon(state,otherSide(side),action.target.slot))) return 'Basic attacks must target an active opponent.'
      if (!actor.types.includes(action.attackType)) return 'Choose one of this Pokemon’s attack types.'
    } else if (action.kind === 'item') {
      if (state.isPvp) return 'Trainer items are not available in PvP.'
      if (!action.itemId) return 'Choose a battle item.'
      if(side==='enemy' && !state.trainerItems?.some(entry=>entry.itemId===action.itemId&&(entry.quantity??0)>0)) return 'The trainer does not have that item.'
    } else if (action.kind === 'power') {
      if (side === 'enemy' && !state.isPvp) return 'Trainer powers are not available for wild opponents.'
      if (!['tera','mega','dynamax','z-move'].includes(action.powerId)) return 'Unknown trainer power.'
    }
  }
  for (const slot of [0, 1] as const) {
    const mon = getDoublesPokemon(state, side, slot)
    if (mon && mon.currentHp > 0 && !isDoublesCommanderInactive(mon) && !seen.has(slot)) return `Choose an action for ${mon.name}.`
  }
  if(side==='enemy' && actions.filter(action=>action.kind==='item').length>1) return 'A trainer can use only one item per turn.'
}

type Scheduled = { side: DoublesSide; action: DoublesAction; actorIndex:number; priority: number; speed: number; order: number; phase: number }

function getDoublesActionPriority(state:BattleState,side:DoublesSide,action:DoublesAction,random:()=>number):number {
  if(action.kind==='switch') return 10
  if(action.kind==='item'||action.kind==='power') return 8
  if(action.kind!=='move') return 0
  const move=getMove(action.moveId)
  if(!move) return 0
  let priority=move.doublesPriority??0
  const actor=getDoublesPokemon(state,side,action.slot)
  const ability=actor?.battleAbilityState?.suppressed?undefined:actor?.ability
  if(ability==='prankster'&&move.damage===0) priority+=1
  if(ability==='triage'&&(move.heal||move.healFull)) priority+=3
  if(ability==='gale_wings'&&actor?.currentHp===actor?.maxHp&&move.forcedType==='flying') priority+=1
  if(ability==='quick_draw'&&random()<0.3) priority+=1
  if(ability==='stall'||(ability==='mycelium_might'&&move.damage===0)) priority-=1
  return priority
}

function getActionStance(action?: DoublesAction): BattleStance | undefined {
  if (!action) return undefined
  if (action.kind === 'basic') return action.stance
  if (action.kind === 'move') {
    const stance = getMove(action.moveId)?.stance
    return stance === 'random' ? 'tech' : stance
  }
}

function targetList(state: BattleState, side: DoublesSide, action: DoublesAction, move?: MoveConfig): {side: DoublesSide; slot: DoublesSlot}[] {
  const pattern = move?.doublesTarget ?? (move?.target === 'self' ? 'self' : 'opponent')
  const opponents = ([0, 1] as const).filter(slot=>!isDoublesCommanderInactive(getDoublesPokemon(state,otherSide(side),slot))).map(slot => ({ side: otherSide(side), slot }))
  const allies = ([0, 1] as const).filter(slot=>!isDoublesCommanderInactive(getDoublesPokemon(state,side,slot))).map(slot => ({ side, slot }))
  if (pattern === 'all-active') return [...allies, ...opponents].filter(t => t.side !== side || t.slot !== action.slot)
  if (pattern === 'both-opponents') return opponents
  if (pattern === 'both-allies') return allies
  if (pattern === 'self') return [{ side, slot: action.slot }]
  if (pattern === 'ally') {
    const desired = action.kind === 'move' && action.target?.side === 'ally'
      ? action.target.slot : action.slot === 0 ? 1 : 0
    return [{ side, slot: desired }]
  }
  if (pattern==='any-single' && action.kind==='move' && action.target?.side==='ally') return [{side,slot:action.target.slot}]
  const selected = action.kind === 'move' || action.kind === 'basic' ? action.target : undefined
  const desired = selected?.side === 'opponent' ? selected.slot : 0
  const slot = getDoublesPokemon(state, otherSide(side), desired)?.currentHp
    ? desired : (desired === 0 ? 1 : 0)
  return [{ side: otherSide(side), slot }]
}

type DoublesMessageCollector = {
  push: (...messages: string[]) => void
}

function applySimpleMoveEffects(state: BattleState, side: DoublesSide, actor: BattlePokemon, target: BattlePokemon, move: MoveConfig, damage: number, random: () => number, messages: DoublesMessageCollector, applyRuntime:boolean) {
  const allyBenefit=move.doublesTarget==='ally'||move.doublesTarget==='both-allies'
  for (const buff of move.buffs ?? []) {
    const mon = allyBenefit ? target : buff.target === 'enemy' ? target : actor
    if (random() * 100 >= (buff.chance ?? 100)) continue
    mon.statStages ??= { attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0, crit: 0, accuracy: 0, evasion: 0 }
    mon.statStages[buff.stat] = Math.max(-6, Math.min(6, mon.statStages[buff.stat] + buff.stages))
    messages.push(`${mon.name}'s ${buff.stat} changed!`)
  }
  for (const debuff of move.debuffs ?? []) {
    const mon = allyBenefit ? target : debuff.target === 'self' ? actor : target
    if (random() * 100 >= (debuff.chance ?? 100)) continue
    mon.statStages ??= { attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0, crit: 0, accuracy: 0, evasion: 0 }
    mon.statStages[debuff.stat] = Math.max(-6, Math.min(6, mon.statStages[debuff.stat] + debuff.stages))
    messages.push(`${mon.name}'s ${debuff.stat} changed!`)
  }
  if (move.status && random() * 100 < (move.status.chance ?? 100)) {
    const mon = allyBenefit ? target : move.status.target === 'self' ? actor : target
    const result = applyStatus(mon, move.status.id, state.weather?.weather, { terrain: state.terrain?.terrain, sourcePokemon: actor, force: move.status.forceStatus })
    if (result.applied) messages.push(result.message)
  }
  if (move.heal && target.currentHp > 0) {
    const fraction=move.id==='life-dew'?0.25:move.id==='heal-pulse'?0.5:0.4
    const amount = move.healFull ? target.maxHp : Math.max(1, Math.floor(target.maxHp * fraction))
    const before = target.currentHp
    target.currentHp = Math.min(target.maxHp, before + amount)
    if (target.currentHp > before) messages.push(`${target.name} recovered ${target.currentHp - before} HP!`)
  }
  if(applyRuntime) {
    const runtime = applyMoveRuntimeEffects({ move, state, side, attacker: actor, defender: target, damageDealt: damage, random })
    messages.push(...runtime.messages)
    if (runtime.failed) messages.push(runtime.failed)
  }
}

export function resolveDoublesTurn(state: BattleState, playerActions: DoublesAction[], enemyActions: DoublesAction[], random: () => number = Math.random, specialAction?: DoublesSpecialAction, moveResolved?: DoublesMoveResolved): BattleState {
  const error = validateDoublesActions(state, 'player', playerActions) || validateDoublesActions(state, 'enemy', enemyActions)
  if (error) throw new Error(error)
  if (!specialAction && [...playerActions,...enemyActions].some(action=>action.kind==='item'||action.kind==='power')) throw new Error('Trainer action resolver is unavailable.')
  const events: BattlePresentationEvent[] = []
  const phaseMessages: Record<'A' | 'B', string[]> = { A: [], B: [] }
  const phaseDamage: Record<'A' | 'B', { damageDealt: number; damageTaken: number }> = {
    A: { damageDealt: 0, damageTaken: 0 },
    B: { damageDealt: 0, damageTaken: 0 },
  }
  const phaseStances: Record<'A' | 'B', { playerStance: BattleStance; enemyStance: BattleStance }> = {
    A: { playerStance: 'tech', enemyStance: 'tech' },
    B: { playerStance: 'tech', enemyStance: 'tech' },
  }
  const phaseResults: Record<'A' | 'B', 'win' | 'loss' | 'tie'> = {
    A: 'tie',
    B: 'tie',
  }
  const redirection:Partial<Record<DoublesSide,{index:number;kind:'follow-me'|'rage-powder'}>>={}
  const guards:Partial<Record<DoublesSide,Set<string>>>={}
  const all: Scheduled[] = [...playerActions.map((action, phase) => ({side:'player' as const, action, phase, order: phase})), ...enemyActions.map((action, phase) => ({side:'enemy' as const, action, phase, order: phase + 2}))].map(entry => ({
    ...entry,
    actorIndex:getDoublesSlots(state,entry.side)[entry.action.slot]!,
    priority: getDoublesActionPriority(state,entry.side,entry.action,random),
    speed: getEffectiveBattleSpeed(getDoublesPokemon(state, entry.side, entry.action.slot)!, state.turn),
  }))
  all.sort((a,b) => a.phase-b.phase || b.priority-a.priority || b.speed-a.speed || a.order-b.order)

  let activePhase = -1
  const phaseKey = (phase: number): 'A' | 'B' | undefined =>
    phase === 0 ? 'A' : phase === 1 ? 'B' : undefined
  const messages: DoublesMessageCollector = {
    push: (...lines) => {
      const currentPhase = phaseKey(activePhase)
      if (currentPhase) phaseMessages[currentPhase].push(...lines)
    },
  }
  const pushEvent = (event: BattlePresentationEvent) => {
    const currentPhase = phaseKey(activePhase)
    if (!currentPhase) {
      events.push(event)
      return
    }

    const phaseEvent = { ...event, phase: currentPhase } as BattlePresentationEvent
    if (phaseEvent.type === 'attack') {
      phaseEvent.simultaneousGroup ??= `doubles-impact:${state.turn}:${currentPhase}`
      phaseEvent.animateActor =
        phaseResults[currentPhase] === 'tie' ||
        (phaseResults[currentPhase] === 'win' && phaseEvent.actorSide === 'player') ||
        (phaseResults[currentPhase] === 'loss' && phaseEvent.actorSide === 'enemy')
    } else if (phaseEvent.type === 'hp-change') {
      phaseEvent.simultaneousGroup ??= `doubles-impact:${state.turn}:${currentPhase}`
    }
    events.push(phaseEvent)
  }
  let phaseActors = new Set<string>()
  let phaseActions: Partial<Record<DoublesSide, DoublesAction>> = {}
  let phaseActorIndices: Partial<Record<DoublesSide, number>> = {}
  for (let actionPosition=0;actionPosition<all.length;actionPosition++) {
    const {side,action,actorIndex,priority,phase}=all[actionPosition]
    if (phase !== activePhase) {
      activePhase = phase
      phaseActions = {}
      phaseActorIndices = {}
      for (const entry of all) {
        if (entry.phase === phase) {
          phaseActions[entry.side] = entry.action
          phaseActorIndices[entry.side] = entry.actorIndex
        }
      }
      const currentPhase = phaseKey(phase)
      if (currentPhase) {
        phaseStances[currentPhase] = {
          playerStance: getActionStance(phaseActions.player) ?? 'tech',
          enemyStance: getActionStance(phaseActions.enemy) ?? 'tech',
        }
        phaseResults[currentPhase] = resolveStance(
          phaseStances[currentPhase].playerStance,
          phaseStances[currentPhase].enemyStance,
        ).result
      }
      phaseActors = new Set(
        all
          .filter((entry) => entry.phase === phase)
          .filter((entry) => {
            const team = getDoublesTeam(state, entry.side)
            return team[entry.actorIndex]?.currentHp > 0
          })
          .map((entry) => `${entry.side}:${entry.actorIndex}`),
      )
    }
    const slots = getDoublesSlots(state, side)
    const currentSlot=slots.indexOf(actorIndex) as DoublesSlot|-1
    const index=actorIndex
    const actor=getDoublesTeam(state,side)[actorIndex]
    const actorWasAliveAtPhaseStart = phaseActors.has(
      `${side}:${actorIndex}`,
    )
    if (
      currentSlot===-1 ||
      !actor ||
      (!actorWasAliveAtPhaseStart && actor.currentHp <= 0)
    ) continue
    if (action.kind === 'switch') {
      const incoming = getDoublesTeam(state, side)[action.pokemonIndex]
      messages.push(...processDoublesExit(state,side,actor))
      slots[currentSlot] = action.pokemonIndex
      if (side === 'player') state.activePlayerSlots = slots
      else state.activeEnemySlots = slots
      incoming.activeTurnStarted = state.turn + 1
      messages.push(...processDoublesEntry(state,side,currentSlot,random))
      pushEvent({type:'switch', side, fromIndex:index, toIndex:action.pokemonIndex, hpOnEntry:incoming.currentHp, reason:'voluntary', message:`${actor.name} switched to ${incoming.name}.`})
      messages.push(`${actor.name} switched to ${incoming.name}.`)
      continue
    }
    if (action.kind === 'item' || action.kind === 'power') {
      if (!specialAction) throw new Error('Trainer action resolver is unavailable.')
      messages.push(specialAction({state,side,slot:currentSlot,actor,action}))
      continue
    }
    const move = action.kind === 'move' ? getMove(action.moveId) : undefined
    if (action.kind === 'move' && (!move || (actor.moveUsesRemaining ?? 0) <= 0)) continue
    if (move) actor.moveUsesRemaining = Math.max(0, (actor.moveUsesRemaining ?? 0) - 1)
    const stance = getActionStance(action) ?? 'tech'
    const queued:PvpQueuedMoveForPowerUse = {stance,attackType:action.kind==='basic'?action.attackType:undefined,specialMoveId:move?.id,powers:actor.zMoveReady?{zMove:true}:undefined}
    const eligibility=preparePvpCombatAction({state,attacker:actor,attackerSide:side,move:queued,currentTurn:state.turn,random})
    if (!eligibility.canMove) {
      messages.push(eligibility.message)
      if (move?.id === SKETCH_MOVE_ID) {
        moveResolved?.({
          state,
          side,
          slot: currentSlot,
          actor,
          action: action as Extract<DoublesAction, { kind: 'move' }>,
          move,
          succeeded: false,
        })
      }
      continue
    }
    if (move?.id==='helping-hand') {
      const partner=getDoublesPokemon(state,side,currentSlot===0?1:0)
      if(partner?.currentHp) {partner.nextDamageModifier={percent:50,remainingUses:1,sourceMoveName:'Helping Hand'};messages.push(`${actor.name} gave ${partner.name} a Helping Hand!`)}
      continue
    }
    if (move?.id==='follow-me'||move?.id==='rage-powder') {redirection[side]={index,kind:move.id};messages.push(`${actor.name} drew attacks toward itself with ${move.name}!`);continue}
    if (move?.id==='ally-switch') {
      const partner=getDoublesPokemon(state,side,currentSlot===0?1:0)
      if(partner?.currentHp) {slots.reverse();if(side==='player')state.activePlayerSlots=slots;else state.activeEnemySlots=slots;messages.push(`${actor.name} switched battle lanes with ${partner.name}!`)}
      continue
    }
    if (move?.id==='after-you') {
      const partnerIndex=getDoublesSlots(state,side)[action.target?.slot??(currentSlot===0?1:0)]
      const nextPosition=all.findIndex((entry,position)=>position>actionPosition&&entry.phase===phase&&entry.side===side&&entry.actorIndex===partnerIndex)
      if(nextPosition>actionPosition) {const [next]=all.splice(nextPosition,1);all.splice(actionPosition+1,0,next);messages.push(`${actor.name} let ${getDoublesTeam(state,side)[partnerIndex!]?.name} act next!`)}
      continue
    }
    if (move && ['wide-guard','quick-guard','mat-block','crafty-shield'].includes(move.id)) {
      guards[side]??=new Set()
      guards[side]!.add(move.id)
      messages.push(`${actor.name} protected its team with ${move.name}!`)
      continue
    }
    if (move?.id==='decorate') {
      const target=getDoublesPokemon(state,side,action.target?.slot??(currentSlot===0?1:0))
      if(target?.currentHp) {
        target.statStages??={attack:0,defense:0,specialAttack:0,specialDefense:0,speed:0,crit:0,accuracy:0,evasion:0}
        target.statStages.attack=Math.min(6,target.statStages.attack+2)
        target.statStages.specialAttack=Math.min(6,target.statStages.specialAttack+2)
        messages.push(`${actor.name} decorated ${target.name}, sharply raising Attack and Sp. Atk!`)
      }
      continue
    }
    const normalizedAction={...action,slot:currentSlot} as DoublesAction
    let targets = targetList(state, side, normalizedAction, move)
    if (targets.length===1 && targets[0].side!==side) {
      const defenderSide=targets[0].side
      const attackType = move
        ? resolvePvpMoveAttackType({
            move: queued,
            attacker: actor,
            weather: state.weather?.weather,
          }) ?? 'normal'
        : queued.attackType
      const abilityRedirect=([0,1] as const).find(slot=>{
        const mon=getDoublesPokemon(state,defenderSide,slot)
        return mon?.currentHp && !mon.battleAbilityState?.suppressed && ((attackType==='electric'&&mon.ability==='lightning_rod')||(attackType==='water'&&mon.ability==='storm_drain'))
      })
      const followed=redirection[defenderSide]
      const powderImmune=followed?.kind==='rage-powder'&&(actor.types.includes('grass')||(actor.ability==='overcoat'&&!actor.battleAbilityState?.suppressed))
      const followedSlot=followed===undefined||powderImmune?-1:getDoublesSlots(state,defenderSide).indexOf(followed.index)
      const redirected=abilityRedirect??(followedSlot>=0?followedSlot as DoublesSlot:undefined)
      if(redirected!==undefined && getDoublesPokemon(state,defenderSide,redirected)?.currentHp) targets=[{side:defenderSide,slot:redirected}]
    }
    let resolvedAny = false
    let sketchOpponent: BattlePokemon | undefined
    let sketchSucceeded = false
    for (let targetPosition=0;targetPosition<targets.length;targetPosition++) {
      const t=targets[targetPosition]
      const targetIndex = getDoublesSlots(state, t.side)[t.slot]
      const target = getDoublesPokemon(state, t.side, t.slot)
      if (targetIndex === null || !target || target.currentHp <= 0 || isDoublesCommanderInactive(target)) continue
      if(t.side!==side && move && priority>0) {
        const blocked=getDoublesPartnerPriorityBlock(state,t.side,t.slot)
        if(blocked) {messages.push(blocked);continue}
      }
      if(t.side!==side && move && ((guards[t.side]?.has('wide-guard')&&targets.length>1)||(guards[t.side]?.has('quick-guard')&&priority>0)||(guards[t.side]?.has('crafty-shield')&&move.damage===0)||(guards[t.side]?.has('mat-block')&&move.damage>0))) {messages.push(`${target.name} was protected by its ally!`);continue}
      if (move && t.side === side) {
        const accuracy = getEffectiveMoveAccuracy({move, state, attacker:actor, defender:target, attackerSide:side, weather:state.weather?.weather})
        if (!doesBattleMoveHit(accuracy, random)) { messages.push(`${actor.name}'s ${move.name} missed ${target.name}!`); continue }
      }
      resolvedAny = true
      const defenseAction = phaseActions[otherSide(side)]
      const defensiveStance = defenseAction && getActionStance(defenseAction)
      // Stance is contested by the two Pokemon acting in this exchange. A
      // spread move can hit additional active Pokemon, but those secondary
      // targets do not have their own stance exchange and therefore take
      // neutral stance damage. This also keeps ally splash damage neutral.
      const isPairedOpponent =
        t.side === otherSide(side) &&
        phaseActorIndices[otherSide(side)] === targetIndex
      const targetDefensiveStance = isPairedOpponent
        ? defensiveStance ?? 'tech'
        : stance
      if (t.side !== side) {
        const savedPlayerIndex=state.activePlayerIndex, savedEnemyIndex=state.activeEnemyIndex
        const previousStatus=target.status?{...target.status}:undefined
        const previousStages=target.statStages?{...target.statStages}:undefined
        if (side==='player') {state.activePlayerIndex=index;state.activeEnemyIndex=targetIndex}
        else {state.activeEnemyIndex=index;state.activePlayerIndex=targetIndex}
        try {
          if(move) messages.push(...applyBattleAbilityOpposingMoveUseDepletion({state,attackerSide:side,attacker:actor,defender:target,move}))
          const combat=resolvePvpCombat({state,attacker:actor,defender:target,move:queued,attackerName:side==='player'?state.playerName:state.enemyName,attackerSide:side,playerMove:side==='player'?queued:{stance:targetDefensiveStance},enemyMove:side==='enemy'?queued:{stance:targetDefensiveStance},currentTurn:state.turn,random,weather:state.weather?.weather,eligibility,doublesAccuracyMultiplier:getDoublesAccuracyMultiplier(state,side,currentSlot),doublesDamageModifier:(damage,type,attackStance)=>damage*getDoublesDamageMultiplier(state,side,currentSlot,t.side,t.slot,attackStance,type)})
          if (move?.id === SKETCH_MOVE_ID && !sketchOpponent) {
            sketchOpponent = target
            sketchSucceeded = combat.didAttack && !!combat.usedType
          }
          messages.push(combat.message)
          messages.push(...processDoublesPartnerProtection(state,t.side,t.slot,previousStatus,previousStages))
          pushEvent({type:'attack',actorSide:side,targetSide:t.side,actorIndex:index,targetIndex,damage:combat.dmg,hpAfter:target.currentHp,attackType:combat.usedType??actor.types[0],message:combat.message})
          if (side==='player') {
            if (phaseKey(activePhase)) phaseDamage[phaseKey(activePhase)!].damageDealt += combat.dmg
          } else {
            if (phaseKey(activePhase)) phaseDamage[phaseKey(activePhase)!].damageTaken += combat.dmg
          }
          if (target.currentHp<=0) pushEvent({type:'faint',side:t.side,pokemonIndex:targetIndex,hpAfter:0,formId:target.formId,message:`${target.name} fainted!`})
          const resultingTargetIndex=t.side==='player'?state.activePlayerIndex:state.activeEnemyIndex
          if(resultingTargetIndex!==targetIndex && getDoublesTeam(state,t.side)[resultingTargetIndex]?.currentHp>0 && !getDoublesSlots(state,t.side).includes(resultingTargetIndex)) {
            getDoublesSlots(state,t.side)[t.slot]=resultingTargetIndex
            pushEvent({type:'switch',side:t.side,fromIndex:targetIndex,toIndex:resultingTargetIndex,hpOnEntry:getDoublesTeam(state,t.side)[resultingTargetIndex].currentHp,reason:'replacement',message:`${getDoublesTeam(state,t.side)[resultingTargetIndex].name} entered the battle.`})
            messages.push(...processDoublesPartnerEntry(state,t.side,t.slot))
          }
          const transfer=processDoublesPartnerItemTransfer(state,side,currentSlot)
          if (transfer) messages.push(transfer)
        } finally {state.activePlayerIndex=savedPlayerIndex;state.activeEnemyIndex=savedEnemyIndex}
        continue
      }
      if (move?.id==='pollen-puff') {
        const before=target.currentHp
        target.currentHp=Math.min(target.maxHp,before+Math.max(1,Math.floor(target.maxHp/2)))
        messages.push(`${actor.name}'s Pollen Puff healed ${target.name} for ${target.currentHp-before} HP!`)
        pushEvent({type:'hp-change',side:t.side,pokemonIndex:targetIndex,amount:target.currentHp-before,hpAfter:target.currentHp,kind:'heal',message:`${target.name} was healed.`})
        continue
      }
      const stanceMultiplier = isPairedOpponent
        ? resolveStance(stance, targetDefensiveStance).damageMultiplier
        : 1
      let damage = 0
      let type = action.kind === 'basic'
        ? action.attackType
        : resolvePvpMoveAttackType({
            move: queued,
            attacker: actor,
            defender: target,
            weather: state.weather?.weather,
          }) ?? 'normal'
      if ((move?.damage ?? 1) > 0) {
        const multiplier = move ? resolveMoveDamageMultiplier(move, target.types, random, state.weather?.weather).damageMultiplier : 1
        const result = calculateDamage(actor, target, stance, stanceMultiplier * multiplier, type, undefined, undefined, move?.critChance, state.weather?.weather, undefined, { terrain: state.terrain?.terrain, moveId: move?.id, currentTurn: state.turn })
        type = result.usedType
        const ability = applyBattleAbilityDamageModifiers({attacker:actor, defender:target, damage:result.damage, attackStance:stance, attackType:type, typeEffectiveness:result.typeEffectiveness})
        damage = Math.min(target.currentHp,Math.floor(ability.damage*getDoublesDamageMultiplier(state,side,currentSlot,t.side,t.slot,stance,type)))
        target.currentHp -= damage
        messages.push(...ability.messages)
        if (side === 'player' && t.side === 'enemy') {
          const currentPhase = phaseKey(activePhase)
          if (currentPhase) phaseDamage[currentPhase].damageDealt += damage
        }
        if (side === 'enemy' && t.side === 'player') {
          const currentPhase = phaseKey(activePhase)
          if (currentPhase) phaseDamage[currentPhase].damageTaken += damage
        }
      }
      const label = move?.name ?? `${stance} attack`
      const line = `${actor.name} used ${label} on ${target.name}!${damage ? ` [icon:damage:${damage}]` : ''}`
      messages.push(line)
      pushEvent({type:'attack', actorSide:side, targetSide:t.side, actorIndex:index, targetIndex, damage, hpAfter:target.currentHp, attackType:type, message:line})
      if (move) applySimpleMoveEffects(state, side, actor, target, move, damage, random, messages,targetPosition===0 || move.doublesTarget!=='both-allies')
      if (move?.absorb && damage > 0) {
        const absorb = applyMoveAbsorbHealing(actor, damage, move.absorb)
        if (absorb.applied) messages.push(absorb.message)
      }
      if (target.currentHp <= 0) pushEvent({type:'faint', side:t.side, pokemonIndex:targetIndex, hpAfter:0, formId:target.formId, message:`${target.name} fainted!`})
    }
    if (move?.id === SKETCH_MOVE_ID) {
      moveResolved?.({
        state,
        side,
        slot: currentSlot,
        actor,
        action: action as Extract<DoublesAction, { kind: 'move' }>,
        move,
        opponent: sketchOpponent,
        succeeded: sketchSucceeded,
      })
    }
    if (!resolvedAny) messages.push(`${actor.name}'s ${move?.name ?? 'attack'} had no target.`)
    if (move?.selfDamage && resolvedAny && targets.every(t=>t.side===side)) {
      const recoil = applyMoveSelfDamage(actor, move.selfDamage, random)
      if (recoil.applied) messages.push(recoil.message)
    }
  }

  const active=(['player','enemy'] as const).flatMap(side=>([0,1] as const).map(slot=>getDoublesPokemon(state,side,slot)).filter((mon):mon is BattlePokemon=>!!mon))
  for (const mon of active) if(mon.currentHp>0) {
    const held=applyHeldItemIfTriggered(mon,'hp')
    if(held.applied) messages.push(held.message)
  }
  const savedPlayerIndex=state.activePlayerIndex,savedEnemyIndex=state.activeEnemyIndex
  const perPair=(phase:'damage'|'weather'|'healing')=>{
    for(const slot of [0,1] as const) {
      const playerIndex=getDoublesSlots(state,'player')[slot]??state.playerTeam.findIndex(mon=>mon.currentHp<=0)
      const enemyIndex=getDoublesSlots(state,'enemy')[slot]??state.enemyTeam.findIndex(mon=>mon.currentHp<=0)
      if(playerIndex<0||enemyIndex<0) continue
      state.activePlayerIndex=playerIndex
      state.activeEnemyIndex=enemyIndex
      if(phase==='damage') messages.push(...processEndTurnStatusDamage(state,'damage'))
      if(phase==='weather') messages.push(...processEndTurnWeatherDamageForState(state))
      if(phase==='healing') messages.push(...processEndTurnStatusDamage(state,'healing'))
    }
    state.activePlayerIndex=savedPlayerIndex
    state.activeEnemyIndex=savedEnemyIndex
  }
  perPair('damage')
  perPair('weather')
  messages.push(...processSecondaryStatusesForTurnEnd(state,random))
  messages.push(...processDelayedMoveDamage(state))
  perPair('healing')
  messages.push(...processTerrainTurnEffects(state))
  messages.push(...processDoublesPartnerTurnEnd(state,random))
  for(const slot of [0,1] as const) {
    const p=getDoublesPokemon(state,'player',slot)??state.playerTeam.find(mon=>mon.currentHp<=0)
    const e=getDoublesPokemon(state,'enemy',slot)??state.enemyTeam.find(mon=>mon.currentHp<=0)
    if(!p||!e) continue
    messages.push(...processBattleAbilityTurnEndEffects({playerMon:p,enemyMon:e,playerName:state.playerName,enemyName:state.enemyName}))
  }
  for(const mon of active) {
    const lock=tickDisabledStance(mon,state.turn)
    if(lock) messages.push(lock)
    const berry=restoreConsumedBerryByAbility(mon,state.weather?.weather)
    if(berry.applied) messages.push(berry.message)
    messages.push(...processBattleRarityTurnEnd(mon))
    advanceTeraDuration(mon,state.turn)
    advanceBattleTypeChangeDuration(mon)
    if(mon.nextDamageModifier?.sourceMoveName==='Helping Hand') mon.nextDamageModifier=undefined
    if(mon.currentHp<=0 && !events.some(event=>event.type==='faint'&&event.side===(state.playerTeam.includes(mon)?'player':'enemy')&&event.pokemonIndex===(state.playerTeam.includes(mon)?state.playerTeam:state.enemyTeam).indexOf(mon))) {
      const side=state.playerTeam.includes(mon)?'player':'enemy',team=side==='player'?state.playerTeam:state.enemyTeam
      pushEvent({type:'faint',side,pokemonIndex:team.indexOf(mon),hpAfter:0,formId:mon.formId,message:`${mon.name} fainted!`})
    }
  }
  const powerStates=state.isPvp?Object.values(state.pvpPowers??{}):state.powers?[state.powers]:[]
  for(const powers of powerStates) {
    powers.turnsPlayedThisBattle=(powers.turnsPlayedThisBattle??0)+1
    if(powers.turnsPlayedThisBattle>=DYNAMAX_UNLOCK_TURNS) powers.dynamaxAvailable=true
  }
  for(const side of ['player','enemy'] as const) for(const slot of [0,1] as const) {
    const mon=getDoublesPokemon(state,side,slot)
    if(!mon?.isDynamaxed||typeof mon.dynamaxTurnsRemaining!=='number') continue
    mon.dynamaxTurnsRemaining-=1
    const powers=state.isPvp?state.pvpPowers?.[typeof mon.user==='string'?mon.user:mon.user?.id??'']:side==='player'?state.powers:undefined
    if(powers) powers.dynamaxTurnsRemaining=Math.max(0,mon.dynamaxTurnsRemaining)
    if(mon.dynamaxTurnsRemaining<=0) {if(powers)powers.dynamaxActive=false;clearDynamaxState(mon)}
  }

  const alive = (side:DoublesSide) => getDoublesTeam(state,side).some(mon => mon.currentHp > 0)
  releaseDoublesCommander(state)
  const playerAlive = alive('player'), enemyAlive = alive('enemy')
  state.status = playerAlive && enemyAlive ? 'ongoing' : playerAlive ? 'won' : enemyAlive ? 'lost' : 'draw'
  if (state.status === 'ongoing') {
    state.pendingPlayerReplacementSlots = ([0,1] as const).filter(slot => {
      const mon = getDoublesPokemon(state,'player',slot)
      return (!mon || mon.currentHp <= 0) && getDoublesTeam(state,'player').some((candidate,index) => candidate.currentHp > 0 && !getDoublesSlots(state,'player').includes(index))
    })
    if (state.isPvp) state.pendingEnemyReplacementSlots = ([0,1] as const).filter(slot => {
      const mon = getDoublesPokemon(state,'enemy',slot)
      return (!mon || mon.currentHp <= 0) && getDoublesTeam(state,'enemy').some((candidate,index) => candidate.currentHp > 0 && !getDoublesSlots(state,'enemy').includes(index))
    })
    else state.pendingEnemyReplacementSlots = []
    if (!state.isPvp) for (const slot of [0,1] as const) {
      const mon = getDoublesPokemon(state,'enemy',slot)
      if (mon && mon.currentHp > 0) continue
      const slots = getDoublesSlots(state,'enemy')
      const reserve = state.enemyTeam.findIndex((candidate,index) => candidate.currentHp > 0 && !slots.includes(index))
      slots[slot] = reserve >= 0 ? reserve : null
      state.activeEnemySlots = slots
      if (reserve >= 0) {
        messages.push(...processDoublesEntry(state,'enemy',slot,random))
        pushEvent({type:'switch', side:'enemy', fromIndex:mon ? state.enemyTeam.indexOf(mon) : 0, toIndex:reserve, hpOnEntry:state.enemyTeam[reserve].currentHp, reason:'replacement', message:`${state.enemyTeam[reserve].name} entered the battle.`})
      }
    }
  }
  state.activePlayerIndex = getDoublesSlots(state,'player')[0] ?? 0
  state.activeEnemyIndex = getDoublesSlots(state,'enemy')[0] ?? 0
  const phasesForTurn = (['A', 'B'] as const).filter((phase) =>
    all.some((entry) => phaseKey(entry.phase) === phase),
  )
  const phaseEntries = phasesForTurn.map((phase) => {
    const phaseAttackEvents = events.filter(
      (event): event is Extract<BattlePresentationEvent, { type: 'attack' }> =>
        event.phase === phase && event.type === 'attack',
    )
    return {
      turn: state.turn,
      phase,
      playerStance: phaseStances[phase].playerStance,
      enemyStance: phaseStances[phase].enemyStance,
      result: phaseResults[phase],
      damageDealt: phaseDamage[phase].damageDealt,
      damageTaken: phaseDamage[phase].damageTaken,
      playerAttackType: phaseAttackEvents.find(
        (event) => event.actorSide === 'player',
      )?.attackType,
      enemyAttackType: phaseAttackEvents.find(
        (event) => event.actorSide === 'enemy',
      )?.attackType,
      message: phaseMessages[phase].join('\n') || 'Turn resolved.',
    }
  })
  state.history.unshift(...phaseEntries.slice().reverse())
  state.presentation = {sequenceId:randomUUID(), turn:state.turn, events}
  state.turn += 1
  return state
}
