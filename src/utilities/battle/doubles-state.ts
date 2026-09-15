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
export type DoublesDraft = Partial<Record<DoublesSlot, DoublesAction>> & {
  selectionOrder?: DoublesSlot[]
}

export function getDoublesSlots(state:BattleState,side:DoublesSide):[number|null,number|null] {
  const slots=side==='player'?state.activePlayerSlots:state.activeEnemySlots
  return slots??(side==='player'?[state.activePlayerIndex,state.playerTeam.length>1?1:null]:[state.activeEnemyIndex,state.enemyTeam.length>1?1:null])
}
export function getDoublesTeam(state:BattleState,side:DoublesSide) {return side==='player'?state.playerTeam:state.enemyTeam}
export function getDoublesPokemon(state:BattleState,side:DoublesSide,slot:DoublesSlot):BattlePokemon|undefined {
  const index=getDoublesSlots(state,side)[slot]
  return index===null?undefined:getDoublesTeam(state,side)[index]
}

export function getDefaultDoublesTarget(state: BattleState): DoublesTarget {
  const first = getDoublesPokemon(state, 'enemy', 0)
  const second = getDoublesPokemon(state, 'enemy', 1)
  return {
    side: 'opponent',
    slot: first?.currentHp && !first.battleAbilityState?.commanderLinkedTo
      ? 0
      : second?.currentHp && !second.battleAbilityState?.commanderLinkedTo
        ? 1
        : 0,
  }
}

export function getEligibleDoublesActorSlots(state: BattleState): DoublesSlot[] {
  return ([0, 1] as const).filter((slot) => {
    const mon = getDoublesPokemon(state, 'player', slot)
    return !!mon?.currentHp && !mon.battleAbilityState?.commanderLinkedTo
  })
}

export function stageDoublesAction(
  state: BattleState,
  draft: DoublesDraft,
  action: DoublesAction,
): { draft: DoublesDraft; nextSlot?: DoublesSlot; actions?: DoublesAction[] } | undefined {
  const active = getEligibleDoublesActorSlots(state)
  if (!active.includes(action.slot)) return undefined
  const selectionOrder = draft.selectionOrder?.includes(action.slot)
    ? draft.selectionOrder
    : [...(draft.selectionOrder ?? []), action.slot]
  const nextDraft = {
    ...draft,
    [action.slot]: action,
    selectionOrder,
  }
  const nextSlot = active.find((slot) => !nextDraft[slot])
  return {
    draft: nextDraft,
    nextSlot,
    actions:
      nextSlot === undefined
        ? selectionOrder.map((slot) => nextDraft[slot]!)
        : undefined,
  }
}
