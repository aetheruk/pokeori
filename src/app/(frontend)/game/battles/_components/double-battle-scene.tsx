import { MdCatchingPokemon } from 'react-icons/md'
import type { BattlePokemon, BattleState } from '@/utilities/battle/types'
import { getDoublesPokemon } from '@/utilities/battle/doubles-state'
import { isDoublesCommanderInactive } from '@/utilities/battle/doubles-abilities'
import { PokemonDisplay } from './pokemon-display'

function BattleLane({mon,side,slot,turn}:{mon:BattlePokemon|undefined;side:'player'|'enemy';slot:0|1;turn:number}) {
  const isPlayer=side==='player'
  const hp=mon ? Math.max(0,Math.round(mon.currentHp/Math.max(1,mon.maxHp)*100)) : 0
  return <div className="relative flex min-w-0 flex-col items-center justify-end rounded-2xl border border-game-night-ink/15 bg-game-night-canvas/50 px-2 py-2 sm:px-4">
    <span className="mb-1 self-start text-[10px] font-bold uppercase tracking-[0.18em] text-game-night-muted">{isPlayer?'Your Pokemon':'Opponent'} · {slot+1}</span>
    <div className="flex min-h-20 items-end justify-center sm:min-h-28">
      {mon && <PokemonDisplay key={`${side}:${slot}:${mon.id}:${turn}`} formId={mon.battleAbilityState?.illusionMask?.formId||mon.formId} isPlayer={isPlayer} backSprite={isPlayer} usePixelSprite={!isPlayer} isDynamaxed={mon.isDynamaxed} hasTeraEffect={!!mon.teraTypeOverride} hasZPowerEffect={!!mon.zMoveReady} teraType={mon.teraTypeOverride} status={mon.status} isShadow={mon.isShadow} isRadiant={mon.isRadiant} shiny={!!mon.shiny} rarity={mon.rarity} gender={mon.gender} className={`h-20 w-20 sm:h-28 sm:w-28 ${isDoublesCommanderInactive(mon)?'opacity-40':''}`} />}
      {!mon && <span className="pb-8 text-sm text-game-night-muted">Empty lane</span>}
    </div>
    <div className="mt-2 w-full rounded-xl border border-game-night-ink/15 bg-game-night-surface/85 px-2.5 py-2">
      <div className="flex items-center justify-between gap-2 text-xs font-bold text-game-night-ink"><span className="min-w-0 truncate">{mon?.battleAbilityState?.illusionMask?.name||mon?.name||'—'}</span><span className="shrink-0 text-game-night-muted">{mon?`Lv ${mon.level}`:''}</span></div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-game-night-ink/15"><div className={`h-full rounded-full transition-[width] duration-300 ${hp<25?'bg-game-danger':hp<50?'bg-game-ochre':'bg-game-moss'}`} style={{width:`${hp}%`}} /></div>
      <div className="mt-1 flex justify-between text-[10px] text-game-night-muted"><span>{isDoublesCommanderInactive(mon)?'Joined ally':mon?.status?.id||'Ready'}</span><span>{mon?`${mon.currentHp}/${mon.maxHp} HP`:''}</span></div>
    </div>
  </div>
}

export function DoubleBattleScene({state,isWaitingForOpponent}:{state:BattleState;isWaitingForOpponent:boolean}) {
  const visible=(side:'player'|'enemy',slot:0|1)=>{const mon=getDoublesPokemon(state,side,slot);return mon?.currentHp?mon:undefined}
  return <div className="relative flex min-h-[23rem] flex-[36] flex-col justify-center overflow-hidden bg-game-night-surface p-3 text-game-night-ink sm:p-5 xl:min-h-0 xl:flex-none">
    {state.background && <div className="absolute inset-0 opacity-35" style={{backgroundImage:`url(${state.background})`,backgroundPosition:'center',backgroundSize:'cover'}} aria-hidden />}
    <div className="relative mx-auto flex w-full max-w-3xl flex-col gap-3">
      <div className="flex items-center justify-between gap-2 text-xs font-bold uppercase tracking-[0.16em] text-game-night-muted"><span>{state.enemyName}</span><span>Turn {state.turn}</span></div>
      <div className="grid grid-cols-2 gap-2 sm:gap-4">{([0,1] as const).map(slot=><BattleLane key={`enemy:${slot}`} mon={visible('enemy',slot)} side="enemy" slot={slot} turn={state.turn} />)}</div>
      <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-game-ochre"><span className="h-px flex-1 bg-game-night-ink/20" />Double battle<span className="h-px flex-1 bg-game-night-ink/20" /></div>
      <div className="grid grid-cols-2 gap-2 sm:gap-4">{([0,1] as const).map(slot=><BattleLane key={`player:${slot}`} mon={visible('player',slot)} side="player" slot={slot} turn={state.turn} />)}</div>
      <div className="text-xs font-bold uppercase tracking-[0.16em] text-game-night-muted">{state.playerName}</div>
    </div>
    {isWaitingForOpponent && <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-game-night-surface/80 text-center backdrop-blur-sm"><MdCatchingPokemon className="mb-3 h-9 w-9 animate-spin text-game-ochre"/><p className="font-bold">Waiting for opponent…</p><p className="mt-1 text-xs text-game-night-muted">Your two actions are locked in.</p></div>}
  </div>
}
