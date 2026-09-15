'use client'

import { useEffect, useMemo, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getMove } from '@/data/moves'
import type { BattlePokemon, BattleInventoryItem } from '@/utilities/battle/types'
import { getDoublesPokemon, getDoublesSlots, type DoublesAction, type DoublesTarget } from '@/utilities/battle/doubles-state'
import { getBattleInventory, getBattlePowers } from '../actions'
import type { BattlePowersData } from '../powers/powers-data'
import { isDoublesCommanderInactive } from '@/utilities/battle/doubles-abilities'
import { useBattleContext } from './battle-context'

type Draft = Partial<Record<0|1,DoublesAction>>

function defaultTarget(enemy:BattlePokemon|undefined,other:BattlePokemon|undefined):DoublesTarget {
  return {side:'opponent',slot:enemy?.currentHp&&!isDoublesCommanderInactive(enemy) ? 0 : other?.currentHp&&!isDoublesCommanderInactive(other) ? 1 : 0}
}

function TargetPicker({action,onChange,enemy,ally}:{action:DoublesAction;onChange:(target:DoublesTarget)=>void;enemy:[BattlePokemon|undefined,BattlePokemon|undefined];ally:BattlePokemon|undefined}) {
  if (action.kind!=='basic' && action.kind!=='move') return null
  const move=action.kind==='move'?getMove(action.moveId):undefined
  const pattern=move?.doublesTarget??(move?.target==='self'?'self':'opponent')
  if (['self','both-opponents','both-allies','all-active'].includes(pattern)) return <p className="text-xs text-game-muted">{pattern==='self'?'Targets itself':pattern==='both-opponents'?'Hits both opponents':pattern==='both-allies'?'Affects both allies':'Hits every other active Pokemon'}</p>
  const opponentCandidates=enemy.map((mon,slot)=>mon?.currentHp&&!isDoublesCommanderInactive(mon)?{side:'opponent' as const,slot:slot as 0|1,label:mon.name}:null).filter((value):value is {side:'opponent';slot:0|1;label:string}=>!!value)
  const allyCandidates=ally?.currentHp&&!isDoublesCommanderInactive(ally)?[{side:'ally' as const,slot:(action.slot===0?1:0) as 0|1,label:ally.name}]:[]
  const candidates=pattern==='ally'?allyCandidates:pattern==='any-single'?[...opponentCandidates,...allyCandidates]:opponentCandidates
  return <div className="flex flex-wrap items-center gap-1.5"><span className="mr-1 text-xs text-game-muted">Target</span>{candidates.map(candidate=><Button key={`${candidate.side}:${candidate.slot}`} type="button" size="sm" variant={action.target?.side===candidate.side&&action.target?.slot===candidate.slot?'default':'outline'} className="h-8 rounded-full px-3 text-xs" onClick={()=>onChange({side:candidate.side,slot:candidate.slot})}>{candidate.label}</Button>)}</div>
}

function CommandLane({slot,actor,state,draft,otherDraft,onChange,items,powerData,disabled}:{slot:0|1;actor:BattlePokemon;state:ReturnType<typeof useBattleContext>['battleState'];draft:DoublesAction|undefined;otherDraft:DoublesAction|undefined;onChange:(action:DoublesAction)=>void;items:BattleInventoryItem[];powerData?:BattlePowersData;disabled:boolean}) {
  const enemies:[BattlePokemon|undefined,BattlePokemon|undefined]=[getDoublesPokemon(state,'enemy',0),getDoublesPokemon(state,'enemy',1)]
  const ally=getDoublesPokemon(state,'player',slot===0?1:0)
  const target=defaultTarget(...enemies)
  const moves=(actor.battleMoveIds??[]).map(id=>getMove(id)).filter((move):move is NonNullable<typeof move>=>!!move&&!move.charged&&!move.recharge&&!move.continuous)
  const usedIndexes=getDoublesSlots(state,'player')
  const reserves=state.playerTeam.map((mon,index)=>({mon,index})).filter(({mon,index})=>mon.currentHp>0&&!usedIndexes.includes(index)&&!(otherDraft?.kind==='switch'&&otherDraft.pokemonIndex===index))
  const availablePowers=state.powers
  return <section className="min-w-0 rounded-2xl border border-game-border bg-game-surface-raised p-3 shadow-sm sm:p-4" aria-label={`Action for ${actor.name}`}>
    <div className="mb-3 flex items-start justify-between gap-2"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-game-moss-strong">Lane {slot+1} · {actor.moveUsesRemaining??0} move uses</p><h3 className="text-base font-bold text-game-ink">{actor.name}</h3></div><span className="rounded-full border border-game-border bg-game-canvas px-2 py-1 text-[10px] font-bold text-game-muted">{draft?draft.kind.toUpperCase():'CHOOSE'}</span></div>
    <div className="flex flex-wrap gap-1.5">
      {(['power','speed','tech'] as const).map(stance=><Button key={stance} type="button" size="sm" variant={draft?.kind==='basic'&&draft.stance===stance?'default':'outline'} className="h-9 rounded-xl text-xs capitalize" disabled={disabled} onClick={()=>onChange({slot,kind:'basic',stance,attackType:actor.types[0]||'normal',target})}>{stance}</Button>)}
      {moves.map(move=><Button key={move.id} type="button" size="sm" variant={draft?.kind==='move'&&draft.moveId===move.id?'default':'outline'} className="h-9 rounded-xl text-xs" disabled={disabled||(actor.moveUsesRemaining??0)<=0} title={move.description} onClick={()=>onChange({slot,kind:'move',moveId:move.id,target:move.doublesTarget==='ally'?{side:'ally',slot:slot===0?1:0}:move.doublesTarget==='self'||move.target==='self'||['both-opponents','both-allies','all-active'].includes(move.doublesTarget??'')?undefined:target})}>{move.name}</Button>)}
    </div>
    {draft?.kind==='basic'&&actor.types.length>1&&<div className="mt-3 flex flex-wrap items-center gap-1.5"><span className="mr-1 text-xs text-game-muted">Type</span>{actor.types.map(type=><Button key={type} type="button" size="sm" variant={draft.attackType===type?'default':'outline'} className="h-8 rounded-full px-3 text-xs capitalize" disabled={disabled} onClick={()=>onChange({...draft,attackType:type})}>{type}</Button>)}</div>}
    {draft&&<div className="mt-3"><TargetPicker action={draft} enemy={enemies} ally={ally} onChange={selected=>{if(draft.kind==='basic'||draft.kind==='move') onChange({...draft,target:selected})}} /></div>}
    {draft?.kind==='item'&&<div className="mt-3 flex flex-wrap items-center gap-1.5"><span className="mr-1 text-xs text-game-muted">Item target</span>{state.playerTeam.map((mon,index)=>({mon,index})).filter(({mon})=>{const item=items.find(candidate=>candidate.itemId===draft.itemId);return item?.battleEffect.type==='revive'?mon.currentHp<=0:mon.currentHp>0}).map(({mon,index})=><Button key={`target:${index}`} type="button" size="sm" variant={(draft.targetPokemonIndex??usedIndexes[slot])===index?'default':'outline'} className="h-8 rounded-full px-3 text-xs" disabled={disabled} onClick={()=>onChange({...draft,targetPokemonIndex:index})}>{mon.name}</Button>)}</div>}
    <div className="mt-3 border-t border-game-border pt-3"><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-game-muted">Other actions</p><div className="flex flex-wrap gap-1.5">
      {reserves.map(({mon,index})=><Button key={`switch:${index}`} type="button" size="sm" variant={draft?.kind==='switch'&&draft.pokemonIndex===index?'default':'outline'} className="h-8 rounded-xl text-xs" disabled={disabled} onClick={()=>onChange({slot,kind:'switch',pokemonIndex:index})}>Switch · {mon.name}</Button>)}
      {!state.isPvp&&items.filter(item=>item.battleEffect.type!=='revive'||state.playerTeam.some(mon=>mon.currentHp<=0)).map(item=><Button key={`item:${item.itemId}`} type="button" size="sm" variant={draft?.kind==='item'&&draft.itemId===item.itemId?'default':'outline'} className="h-8 rounded-xl text-xs" disabled={disabled} onClick={()=>onChange({slot,kind:'item',itemId:item.itemId,targetPokemonIndex:item.battleEffect.type==='revive'?state.playerTeam.findIndex(mon=>mon.currentHp<=0):undefined})}>Item · {item.name}</Button>)}
      {availablePowers&&powerData?.hasTera&&availablePowers.teraUsesRemaining>0&&<Button type="button" size="sm" variant={draft?.kind==='power'&&draft.powerId==='tera'?'default':'outline'} className="h-8 rounded-xl text-xs" disabled={disabled} onClick={()=>onChange({slot,kind:'power',powerId:'tera'})}>Terastallize</Button>}
      {availablePowers&&powerData?.hasDynamax&&availablePowers.dynamaxAvailable&&availablePowers.dynamaxUsesRemaining>0&&<Button type="button" size="sm" variant={draft?.kind==='power'&&draft.powerId==='dynamax'?'default':'outline'} className="h-8 rounded-xl text-xs" disabled={disabled} onClick={()=>onChange({slot,kind:'power',powerId:'dynamax'})}>Dynamax</Button>}
      {availablePowers&&powerData?.hasZRing&&availablePowers.zMoveUsesRemaining>0&&<Button type="button" size="sm" variant={draft?.kind==='power'&&draft.powerId==='z-move'?'default':'outline'} className="h-8 rounded-xl text-xs" disabled={disabled} onClick={()=>onChange({slot,kind:'power',powerId:'z-move'})}>Z-Move</Button>}
      {availablePowers&&powerData?.hasMega&&availablePowers.megaUsesRemaining>0&&powerData.megaStones.map(form=><Button key={form.megaFormId} type="button" size="sm" variant={draft?.kind==='power'&&draft.formId===form.megaFormId?'default':'outline'} className="h-8 rounded-xl text-xs" disabled={disabled} onClick={()=>onChange({slot,kind:'power',powerId:'mega',formId:form.megaFormId})}>Mega · {form.megaFormName}</Button>)}
    </div></div>
  </section>
}

export function DoubleActionMenu() {
  const {battleState,isAnimating,isWaitingForServer,pendingBattleAction,handleDoublesSubmit,handleDoublesReplace}=useBattleContext()
  const [draft,setDraft]=useState<Draft>({})
  const [items,setItems]=useState<BattleInventoryItem[]>([])
  const [powerData,setPowerData]=useState<Partial<Record<0|1,BattlePowersData>>>({})
  const disabled=isAnimating||isWaitingForServer||battleState.status!=='ongoing'
  const slots=getDoublesSlots(battleState,'player')
  const active=([0,1] as const).filter(slot=>getDoublesPokemon(battleState,'player',slot)?.currentHp&&!isDoublesCommanderInactive(getDoublesPokemon(battleState,'player',slot)))
  const replacementSlots=battleState.pendingPlayerReplacementSlots??[]
  useEffect(()=>{setDraft({})},[battleState.turn,battleState.activePlayerSlots?.[0],battleState.activePlayerSlots?.[1]])
  useEffect(()=>{if (battleState.isPvp) return;let cancelled=false;getBattleInventory().then(result=>{if(!cancelled&&result.success)setItems(result.items)});return()=>{cancelled=true}},[battleState.turn,battleState.isPvp])
  const player0=getDoublesPokemon(battleState,'player',0),player1=getDoublesPokemon(battleState,'player',1)
  useEffect(()=>{let cancelled=false;const entries=([0,1] as const).map(slot=>({slot,mon:slot===0?player0:player1})).filter(({mon})=>mon?.currentHp&&!isDoublesCommanderInactive(mon));void Promise.all(entries.map(async ({slot,mon})=>({slot,result:await getBattlePowers(mon!.formId,slot)}))).then(results=>{if(cancelled)return;const data:Partial<Record<0|1,BattlePowersData>>={};for(const {slot,result} of results)if(result.success)data[slot]=result.data;setPowerData(data)});return()=>{cancelled=true}},[player0?.id,player0?.formId,player1?.id,player1?.formId])
  const complete=useMemo(()=>active.every(slot=>!!draft[slot]),[active,draft])
  const submit=()=>{const actions=active.map(slot=>draft[slot]).filter((action):action is DoublesAction=>!!action);if(actions.length===active.length)void handleDoublesSubmit(actions)}
  return <div className="game-paper-first game-paper-background relative flex min-h-[16rem] flex-[10] flex-col border-t border-game-border bg-game-canvas px-3 py-4 text-game-ink sm:px-5 xl:flex-none" aria-busy={disabled}>
    {isWaitingForServer&&<div className="absolute inset-0 z-30 flex items-center justify-center bg-game-surface/85 backdrop-blur-[1px]"><Loader2 className="mr-2 h-7 w-7 animate-spin text-game-moss"/><span className="text-sm font-bold">{pendingBattleAction?.label||'Resolving actions'}</span></div>}
    <div className="mx-auto w-full max-w-4xl"><div className="mb-3 flex items-center justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-game-moss-strong">Battle commands</p><h2 className="text-lg font-bold">Choose both actions</h2></div><span className="rounded-full border border-game-border bg-game-surface-raised px-3 py-1 text-xs font-bold text-game-muted">{Object.keys(draft).length}/{active.length} ready</span></div>
      {replacementSlots.length>0?<div className="rounded-2xl border border-game-ochre/40 bg-game-ochre/10 p-4"><p className="mb-3 text-sm font-bold">Choose your next Pokemon for each empty lane.</p>{replacementSlots.map(value=>{const slot=value as 0|1;const reserve=battleState.playerTeam.map((mon,index)=>({mon,index})).filter(({mon,index})=>mon.currentHp>0&&!slots.includes(index));return <div key={slot} className="mb-3"><p className="mb-1 text-xs font-bold text-game-muted">Lane {slot+1}</p><div className="flex flex-wrap gap-2">{reserve.map(({mon,index})=><Button key={`${slot}:${index}`} type="button" size="sm" disabled={disabled} onClick={()=>void handleDoublesReplace(slot,index)}>{mon.name}</Button>)}</div></div>})}</div>:
      <><div className="grid gap-3 md:grid-cols-2">{active.map(slot=><CommandLane key={`${battleState.turn}:${slot}`} slot={slot} actor={getDoublesPokemon(battleState,'player',slot)!} state={battleState} draft={draft[slot]} otherDraft={draft[slot===0?1:0]} onChange={action=>setDraft(current=>({...current,[slot]:action}))} items={items} powerData={powerData[slot]} disabled={disabled} />)}</div><div className="mt-4 flex items-center justify-between gap-3"><p className="text-xs text-game-muted">Both commands resolve together by priority and Speed.</p><Button type="button" className="game-accent-button min-w-36" disabled={disabled||!complete||active.length===0} onClick={submit}>Confirm turn</Button></div></>}
    </div>
  </div>
}
