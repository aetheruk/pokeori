import { describe, expect, test } from 'bun:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { battles } from '@/data/battles'
import { getMove } from '@/data/moves'
import { resolveDoublesTurn, validateDoublesActions, type DoublesAction } from '@/utilities/battle/doubles'
import { getDoublesDamageMultiplier, isDoublesCommanderInactive, processDoublesPartnerEntry, processDoublesPartnerProtection } from '@/utilities/battle/doubles-abilities'
import { toPerspectivePvpState } from '@/app/(frontend)/game/battles/pvp/state-utils'
import { resolvePvpTurn } from '@/app/(frontend)/game/battles/pvp/resolution'
import { DoubleBattleScene } from '@/app/(frontend)/game/battles/_components/double-battle-scene'
import { INITIAL_ANIMATION_STATE } from '@/utilities/battle/engine/types'
import { generateBattleEvents } from '@/utilities/battle/engine/event-generator'
import { getDefaultDoublesTarget, stageDoublesAction } from '@/utilities/battle/doubles-state'
import { canEnemyPokemonUseAiMove } from '@/utilities/battle/enemy-ai'
import type { BattlePokemon, BattlePresentationEvent, BattleState } from '@/utilities/battle/types'
import { settleDoublesSketchAttempts } from '@/app/(frontend)/game/battles/helpers/doubles-sketch'

function mon(id:string,side:'player'|'enemy',overrides:Partial<BattlePokemon>={}):BattlePokemon {
  return {id,user:side,originalTrainer:side,speciesId:1,formId:'1',level:50,name:id,types:['normal'],stats:{hp:999,attack:60,defense:60,specialAttack:60,specialDefense:60,speed:60},currentHp:999,maxHp:999,moveUsesRemaining:3,battleMoveIds:[],updatedAt:'2026-01-01T00:00:00.000Z',createdAt:'2026-01-01T00:00:00.000Z',...overrides}
}
function state(pvp=false):BattleState {
  return {format:'double',playerTeam:[mon('P0','player'),mon('P1','player'),mon('P2','player')],enemyTeam:[mon('E0','enemy'),mon('E1','enemy'),mon('E2','enemy')],activePlayerIndex:0,activeEnemyIndex:0,activePlayerSlots:[0,1],activeEnemySlots:[0,1],turn:1,history:[],status:'ongoing',battleId:'test',pvpBattleId:pvp?'pvp-test':undefined,playerName:'Player',enemyName:'Enemy',itemsUsedThisBattle:[],isPvp:pvp}
}
const hit=(slot:0|1,target:0|1):DoublesAction=>({slot,kind:'basic',stance:'power',attackType:'normal',target:{side:'opponent',slot:target}})
const enemy=[hit(0,0),hit(1,1)]

describe('double battles',()=>{
  test('authored entry points keep singles unchanged and expose friendly, ranked and Kanto Test doubles',()=>{
    expect(battles.find(b=>b.id==='pvp_friendly_test')?.format).toBeUndefined()
    expect(battles.find(b=>b.id==='pvp_friendly_doubles')?.format).toBe('double')
    expect(battles.find(b=>b.id==='pvp_ranked_doubles')?.pvp_type).toBe('ranked')
    expect(battles.find(b=>b.id==='kanto-test-double-battle')?.enemyTeam.length).toBeGreaterThanOrEqual(4)
  })
  test('requires one action per healthy active Pokemon and rejects duplicate slots',()=>{
    const battle=state()
    expect(validateDoublesActions(battle,'player',[hit(0,0)])).toContain('P1')
    expect(validateDoublesActions(battle,'player',[hit(0,0),hit(0,1)])).toContain('only once')
    expect(validateDoublesActions(battle,'player',[hit(0,0),hit(1,1)])).toBeUndefined()
  })
  test('target selection precedes action and only the final eligible actor submits',()=>{
    const battle=state()
    expect(getDefaultDoublesTarget(battle)).toEqual({side:'opponent',slot:0})
    battle.enemyTeam[0].currentHp=0
    expect(getDefaultDoublesTarget(battle)).toEqual({side:'opponent',slot:1})
    const first=stageDoublesAction(battle,{},hit(0,1))
    expect(first?.nextSlot).toBe(1)
    expect(first?.actions).toBeUndefined()
    const second=stageDoublesAction(battle,first!.draft,hit(1,1))
    expect(second?.nextSlot).toBeUndefined()
    expect(second?.actions).toEqual([hit(0,1),hit(1,1)])
    const reordered=stageDoublesAction(battle,{},hit(1,0))
    const reorderedComplete=stageDoublesAction(battle,reordered!.draft,hit(0,0))
    expect(reorderedComplete?.actions).toEqual([hit(1,0),hit(0,0)])
    battle.playerTeam[1].currentHp=0
    const lone=stageDoublesAction(battle,{},hit(0,1))
    expect(lone?.actions).toEqual([hit(0,1)])
  })
  test('resolves independent actions and records damage against both selected opponents',()=>{
    const battle=state()
    const next=resolveDoublesTurn(battle,[hit(0,0),hit(1,1)],enemy,()=>0.1)
    expect(next.enemyTeam[0].currentHp).toBeLessThan(999)
    expect(next.enemyTeam[1].currentHp).toBeLessThan(999)
    expect(next.turn).toBe(2)
    expect(next.presentation?.events.filter(event=>event.type==='attack'&&event.actorSide==='player')).toHaveLength(2)
  })
  test('resolves ordered lane exchanges and lets a later lane be skipped after a KO',()=>{
    const battle=state()
    battle.enemyTeam[1].currentHp=1
    const next=resolveDoublesTurn(
      battle,
      [hit(0,1),hit(1,0)],
      [hit(0,0),hit(1,1)],
      ()=>0.1,
    )
    const attacks=(next.presentation?.events ?? []).filter(
      (event)=>event.type==='attack',
    )
    expect(attacks.some((event)=>event.actorSide==='player'&&event.actorIndex===0&&event.targetIndex===1)).toBe(true)
    expect(attacks.some((event)=>event.actorSide==='enemy'&&event.actorIndex===0)).toBe(true)
    expect(attacks.some((event)=>event.actorSide==='enemy'&&event.actorIndex===1)).toBe(false)
  })
  test('a fresh doubles presentation queues lane-specific playback before the final state',()=>{
    const before=state()
    const after=resolveDoublesTurn(structuredClone(before),[hit(0,0),hit(1,1)],enemy,()=>0.1)
    const events=generateBattleEvents(before,after)
    expect(events.map(event=>event.type)).toEqual(['PLAY_SEQUENCE','SET_INITIAL_STATE'])
    expect(events[0].payload.type).toBe('PRESENTATION')
    expect(events[0].payload.presentation?.events.some((event: {type:string})=>event.type==='attack')).toBe(true)
  })
  test('splits each doubles turn into A and B log segments with phase-local impacts',()=>{
    const before=state()
    const after=resolveDoublesTurn(before,[hit(0,0),hit(1,1)],enemy,()=>0.1)
    const turnLogs=after.history.filter((entry)=>entry.turn===1)
    expect(turnLogs.map((entry)=>entry.phase)).toEqual(['B','A'])
    expect(turnLogs[1].message).toContain('P0 uses Power Attack on E0')
    expect(turnLogs[0].message).toContain('P1 uses Power Attack on E1')

    const attacks=(after.presentation?.events ?? []).filter(
      (event): event is Extract<BattlePresentationEvent, {type:'attack'}> => event.type==='attack',
    )
    expect(new Set(attacks.map((event)=>event.phase))).toEqual(new Set(['A','B']))
    expect(attacks.every((event)=>event.simultaneousGroup?.includes('doubles-impact:1:'))).toBe(true)
  })
  test('doubles impact animation follows the winning stance for each phase',()=>{
    const stanceHit=(slot:0|1,target:0|1,stance:'power'|'tech'):DoublesAction=>({slot,kind:'basic',stance,attackType:'normal',target:{side:'opponent',slot:target}})
    const after=resolveDoublesTurn(
      state(),
      [stanceHit(0,0,'power'),stanceHit(1,1,'power')],
      [stanceHit(0,0,'tech'),stanceHit(1,1,'tech')],
      ()=>0.1,
    )
    const attacks=(after.presentation?.events ?? []).filter(
      (event): event is Extract<BattlePresentationEvent, {type:'attack'}> => event.type==='attack',
    )
    expect(attacks.filter((event)=>event.phase==='A').map((event)=>[event.actorSide,event.animateActor])).toEqual([
      ['player',true],
      ['enemy',false],
    ])
    expect(attacks.filter((event)=>event.phase==='B').map((event)=>[event.actorSide,event.animateActor])).toEqual([
      ['player',true],
      ['enemy',false],
    ])

    const tie=resolveDoublesTurn(
      state(),
      [hit(0,0),hit(1,1)],
      enemy,
      ()=>0.1,
    )
    const tieAttacks=(tie.presentation?.events ?? []).filter(
      (event): event is Extract<BattlePresentationEvent, {type:'attack'}> => event.type==='attack',
    )
    expect(tieAttacks.every((event)=>event.animateActor === true)).toBe(true)
  })
  test('spread moves deal full damage to each opponent and allies when authored',()=>{
    const spread=state()
    spread.playerTeam[0].battleMoveIds=['surf']
    const beforeAlly=spread.playerTeam[1].currentHp
    const next=resolveDoublesTurn(spread,[{slot:0,kind:'move',moveId:'surf'},hit(1,0)],enemy,()=>0.1)
    expect(getMove('surf')?.doublesTarget).toBe('all-active')
    expect(next.enemyTeam[0].currentHp).toBeLessThan(999)
    expect(next.enemyTeam[1].currentHp).toBeLessThan(999)
    expect(next.playerTeam[1].currentHp).toBeLessThan(beforeAlly)
    expect(next.playerTeam[0].moveUsesRemaining).toBe(2)
  })
  test('authored move types override the acting Pokemon type in doubles',()=>{
    const battle=state()
    battle.playerTeam[0].battleMoveIds=['heat-wave']
    const next=resolveDoublesTurn(
      battle,
      [{slot:0,kind:'move',moveId:'heat-wave',selectedType:'normal'},hit(1,1)],
      enemy,
      ()=>0.1,
    )
    const heatWave=next.presentation?.events.find(
      (event)=>event.type==='attack'&&event.actorSide==='player'&&event.actorIndex===0,
    )
    expect(heatWave?.type).toBe('attack')
    if (heatWave?.type === 'attack') {
      expect(heatWave.attackType).toBe('fire')
      expect(heatWave.message).toContain('[icon:type:fire]')
      expect(heatWave.message).toContain('on E0')
    }
  })
  test('stance matchup applies only to the opposing actor in a spread phase',()=>{
    const stanceHit=(slot:0|1,target:0|1,stance:'power'|'tech'):DoublesAction=>({slot,kind:'basic',stance,attackType:'normal',target:{side:'opponent',slot:target}})
    const resolveSpread=(pairedStance:'power'|'tech')=>{
      const battle=state()
      battle.playerTeam[0].battleMoveIds=['earthquake']
      const next=resolveDoublesTurn(
        battle,
        [{slot:0,kind:'move',moveId:'earthquake'},hit(1,1)],
        [stanceHit(0,0,pairedStance),stanceHit(1,1,'tech')],
        ()=>0.1,
      )
      const spreadEvents=(next.presentation?.events ?? []).filter(
        (event)=>event.type==='attack'&&event.actorSide==='player'&&event.actorIndex===0,
      )
      const damageAgainst=(targetSide:'player'|'enemy',targetIndex:number)=>{
        const event=spreadEvents.find(
          (candidate)=>candidate.type==='attack'&&candidate.targetSide===targetSide&&candidate.targetIndex===targetIndex,
        )
        return event?.type==='attack' ? event.damage : 0
      }
      return {
        pairedOpponent:damageAgainst('enemy',0),
        secondaryOpponent:damageAgainst('enemy',1),
        ally:damageAgainst('player',1),
      }
    }
    const originalRandom = Math.random
    Math.random = () => 0.5
    try {
      const matchupWin=resolveSpread('tech')
      const matchupTie=resolveSpread('power')
      const relativeDifference=(first:number,second:number)=>Math.abs(first-second)/Math.max(first,second,1)
      expect(matchupWin.pairedOpponent).toBeGreaterThan(matchupTie.pairedOpponent)
      expect(relativeDifference(matchupWin.secondaryOpponent,matchupTie.secondaryOpponent)).toBeLessThan(0.2)
      expect(relativeDifference(matchupWin.ally,matchupTie.ally)).toBeLessThan(0.2)
    } finally {
      Math.random = originalRandom
    }
  })
  test('Sketch captures a move from the selected opposing lane',async()=>{
    const battle=state()
    battle.playerTeam[0]=mon('Smeargle','player',{speciesId:235,formId:'235',pokemonResearchLevel:5,battleMoveIds:['sketch']})
    battle.enemyTeam[1].battleMoveIds=['thunderbolt']
    const attempts:Array<{attacker:BattlePokemon;opponent?:BattlePokemon;succeeded:boolean;userId:string}>=[]
    resolveDoublesTurn(
      battle,
      [{slot:0,kind:'move',moveId:'sketch',target:{side:'opponent',slot:1}},hit(1,0)],
      enemy,
      ()=>0.1,
      undefined,
      (attempt)=>{
        if(attempt.side==='player') attempts.push({attacker:attempt.actor,opponent:attempt.opponent,succeeded:attempt.succeeded,userId:'player'})
      },
    )
    expect(attempts).toHaveLength(1)
    expect(attempts[0].opponent?.name).toBe('E1')
    expect(attempts[0].succeeded).toBe(true)
    const messages=await settleDoublesSketchAttempts(battle,attempts,undefined,()=>0.1)
    expect(messages).toContain('Smeargle sketched Thunderbolt!')
    expect(battle.pendingSketchedMoves?.[0]?.id).toBe('thunderbolt')
  })
  test('Follow Me redirects single-target attacks but does not pull spread moves',()=>{
    const battle=state()
    battle.playerTeam[0].battleMoveIds=['follow-me']
    battle.playerTeam[0].stats.speed=20
    const beforeP0=battle.playerTeam[0].currentHp,beforeP1=battle.playerTeam[1].currentHp
    resolveDoublesTurn(battle,[{slot:0,kind:'move',moveId:'follow-me'},hit(1,0)],enemy,()=>0.1)
    expect(battle.playerTeam[0].currentHp).toBeLessThan(beforeP0)
    expect(battle.playerTeam[1].currentHp).toBe(beforeP1)
  })
  test('Helping Hand strengthens only the partner’s next damaging action',()=>{
    const base=state(),assisted=state()
    assisted.playerTeam[0].battleMoveIds=['helping-hand']
    resolveDoublesTurn(base,[hit(0,0),hit(1,1)],enemy,()=>0.1)
    resolveDoublesTurn(assisted,[{slot:0,kind:'move',moveId:'helping-hand',target:{side:'ally',slot:1}},hit(1,1)],enemy,()=>0.1)
    expect(base.enemyTeam[1].currentHp).toBeLessThan(999)
    expect(assisted.enemyTeam[1].currentHp).toBeLessThan(999)
    expect(assisted.history[0].message).toContain('Helping Hand changed damage by 50%')
    expect(assisted.playerTeam[1].nextDamageModifier).toBeUndefined()
  })
  test('Ally Switch keeps each submitted action attached to its original Pokemon',()=>{
    const battle=state()
    battle.playerTeam[0].battleMoveIds=['ally-switch']
    resolveDoublesTurn(battle,[{slot:0,kind:'move',moveId:'ally-switch'},hit(1,1)],enemy,()=>0.1)
    expect(battle.activePlayerSlots).toEqual([1,0])
    expect(battle.history[0].message).toContain('P1 uses Power Attack')
  })
  test('Follow Me remains attached to its Pokemon after the partner uses Ally Switch',()=>{
    const battle=state()
    battle.playerTeam[0].battleMoveIds=['follow-me']
    battle.playerTeam[1].battleMoveIds=['ally-switch']
    resolveDoublesTurn(battle,[{slot:0,kind:'move',moveId:'follow-me'},{slot:1,kind:'move',moveId:'ally-switch'}],enemy,()=>0.1)
    expect(battle.activePlayerSlots).toEqual([1,0])
    expect(battle.playerTeam[0].currentHp).toBeLessThan(999)
    expect(battle.playerTeam[1].currentHp).toBe(999)
  })
  test('Rage Powder does not redirect a Grass-type attacker',()=>{
    const battle=state()
    battle.playerTeam[0].battleMoveIds=['rage-powder']
    battle.enemyTeam[0].types=['grass']
    resolveDoublesTurn(battle,[{slot:0,kind:'move',moveId:'rage-powder'},hit(1,0)],[{slot:0,kind:'basic',stance:'power',attackType:'grass',target:{side:'opponent',slot:1}},hit(1,1)],()=>0.1)
    expect(battle.playerTeam[0].currentHp).toBeLessThan(999)
    expect(battle.playerTeam[1].currentHp).toBeLessThan(999)
  })
  test('forced replacements wait for player choice and perspective flips pending lanes',()=>{
    const battle=state(true)
    battle.playerTeam[0].currentHp=1
    battle.enemyTeam[1].currentHp=1
    resolveDoublesTurn(battle,[hit(0,0),hit(1,1)],enemy,()=>0.1)
    expect(battle.pendingPlayerReplacementSlots).toContain(0)
    expect(battle.pendingEnemyReplacementSlots).toContain(1)
    const p2=toPerspectivePvpState(battle,'enemy','pvp-test')
    expect(p2.pendingPlayerReplacementSlots).toContain(1)
    expect(p2.activePlayerSlots).toEqual(battle.activeEnemySlots)
  })
  test('PvP side-neutral resolution accepts both action bundles and preserves perspective',async()=>{
    const battle=state(true)
    const next=await resolvePvpTurn(battle,{stance:'tech',actions:[{slot:0,kind:'basic',stance:'power',attackType:'normal',target:{side:'opponent',slot:1}},{slot:1,kind:'basic',stance:'speed',attackType:'normal',target:{side:'opponent',slot:0}}]},{stance:'tech',actions:[{slot:0,kind:'basic',stance:'tech',attackType:'normal',target:{side:'opponent',slot:0}},{slot:1,kind:'basic',stance:'power',attackType:'normal',target:{side:'opponent',slot:1}}]},{persist:false,random:()=>0.1})
    expect(next.turn).toBe(2)
    expect(next.presentation?.events.filter(event=>event.type==='attack')).toHaveLength(4)
    const viewer=toPerspectivePvpState(next,'enemy','pvp-test')
    expect(viewer.playerTeam[0].id).toBe('E0')
    expect(viewer.enemyTeam[0].id).toBe('P0')
  })
  test('PvP doubles Sketch uses the selected opposing lane',async()=>{
    const battle=state(true)
    battle.playerTeam[0]=mon('Smeargle','player',{speciesId:235,formId:'235',pokemonResearchLevel:5,battleMoveIds:['sketch']})
    battle.enemyTeam[1].battleMoveIds=['thunderbolt']
    const next=await resolvePvpTurn(
      battle,
      {
        stance:'tech',
        actions:[{slot:0,kind:'move',moveId:'sketch',target:{side:'opponent',slot:1}},hit(1,0)],
      },
      {
        stance:'tech',
        actions:[hit(0,0),hit(1,1)],
      },
      {persist:false,random:()=>0.1},
    )
    expect(next.pendingSketchedMoves?.[0]?.id).toBe('thunderbolt')
    expect(next.history[0]?.message).toContain('Smeargle sketched Thunderbolt!')
  })
  test('item or power commands never silently no-op without a real resolver',()=>{
    const battle=state()
    const commands:DoublesAction[]=[{slot:0,kind:'item',itemId:'battle-potion'},hit(1,1)]
    expect(()=>resolveDoublesTurn(battle,commands,enemy,()=>0.1)).toThrow('resolver is unavailable')
  })
  test('self-targeted moves need no opposing target',()=>{
    const battle=state()
    battle.playerTeam[0].battleMoveIds=['swords-dance']
    expect(validateDoublesActions(battle,'player',[{slot:0,kind:'move',moveId:'swords-dance'},hit(1,0)])).toBeUndefined()
  })
  test('NPC doubles helpers remain excluded from singles, even when manually assigned',()=>{
    const helping=getMove('helping-hand')!
    const npc=mon('Plusle','enemy',{speciesId:311,formId:'311'})
    expect(canEnemyPokemonUseAiMove(npc,helping,{manualAssignment:true,doubleBattle:false})).toBe(false)
    expect(canEnemyPokemonUseAiMove(npc,helping,{manualAssignment:true,doubleBattle:true})).toBe(true)
  })
  test('multi-turn move locks fail closed until a per-Pokemon doubles lock exists',()=>{
    const battle=state()
    battle.playerTeam[0].battleMoveIds=['fly']
    expect(getMove('fly')?.charged).toBeGreaterThan(0)
    expect(validateDoublesActions(battle,'player',[{slot:0,kind:'move',moveId:'fly',target:{side:'opponent',slot:0}},hit(1,1)])).toContain('multi-turn lock')
  })
  test('a living unpaired lane still takes end-turn status damage',()=>{
    const battle=state()
    battle.activeEnemySlots=[0,null]
    battle.enemyTeam[1].currentHp=0
    battle.enemyTeam[2].currentHp=0
    battle.playerTeam[1].status={id:'poison',counter:0}
    const before=battle.playerTeam[1].currentHp
    resolveDoublesTurn(battle,[hit(0,0),hit(1,0)],[hit(0,0)],()=>0.1)
    expect(battle.playerTeam[1].currentHp).toBeLessThan(before)
    expect(battle.history[0].message).toContain("P1 is hurt")
  })
  test('partner damage hooks apply Battery, Friend Guard, and Telepathy to the correct lane',()=>{
    const battle=state()
    battle.playerTeam[1].ability='battery'
    battle.enemyTeam[1].ability='friend_guard'
    expect(getDoublesDamageMultiplier(battle,'player',0,'enemy',0,'tech','normal')).toBeCloseTo(1.3*0.75)
    expect(getDoublesDamageMultiplier(battle,'player',0,'enemy',1,'power','normal')).toBe(1)
    battle.playerTeam[1].ability='telepathy'
    expect(getDoublesDamageMultiplier(battle,'player',0,'player',1,'tech','normal')).toBe(0)
  })
  test('Armor Tail on the partner blocks an authored priority hit',()=>{
    const battle=state()
    battle.playerTeam[0].battleMoveIds=['quick-attack']
    battle.enemyTeam[1].ability='armor_tail'
    resolveDoublesTurn(battle,[{slot:0,kind:'move',moveId:'quick-attack',target:{side:'opponent',slot:0}},hit(1,1)],enemy,()=>0.1)
    expect(getMove('quick-attack')?.doublesPriority).toBe(1)
    expect(battle.enemyTeam[0].currentHp).toBe(999)
    expect(battle.history.some((entry)=>entry.message.includes('protected its ally'))).toBe(true)
  })
  test('four-lane scene labels Commander, retains a fainted HUD, and clears its sprite',()=>{
    const battle=state()
    battle.playerTeam[0].battleAbilityState={commanderLinkedTo:battle.playerTeam[1].id}
    battle.enemyTeam[1].currentHp=0
    const html=renderToStaticMarkup(createElement(DoubleBattleScene,{state:battle,isWaitingForOpponent:false}))
    expect(html.match(/Opponent Pokemon [12] health/g)).toHaveLength(2)
    expect(html.match(/Your Pokemon [12] health/g)).toHaveLength(2)
    expect(html).toContain('Joined ally')
    expect(html).toContain('E1')
    expect(html).not.toContain('Opponent lane 2: E1')
    battle.activeEnemySlots=[0,null]
    const emptyLaneHtml=renderToStaticMarkup(createElement(DoubleBattleScene,{state:battle,isWaitingForOpponent:false}))
    expect(emptyLaneHtml).not.toContain('Empty lane')
  })
  test('four-lane scene applies attack effects only to the acting Pokemon',()=>{
    const html=renderToStaticMarkup(createElement(DoubleBattleScene,{
      state:state(),isWaitingForOpponent:false,selectedSlot:1,
      anim:{...INITIAL_ANIMATION_STATE,doublesPokemon:{'player:1':{attacking:true}}},
    }))
    expect(html.match(/translate-x-12 -translate-y-12/g)).toHaveLength(1)
    expect(html.match(/selected-doubles-arrow/g)).toHaveLength(1)
  })
  test('own active sprites expose actor selection before their action is drafted',()=>{
    const html=renderToStaticMarkup(createElement(DoubleBattleScene,{
      state:state(),isWaitingForOpponent:false,selectablePlayerSlots:[1],onChooseActor:()=>{},
    }))
    expect(html).toContain('doubles-actor-player-1')
    expect(html).toContain('Choose P1 to act next')
  })
  test('single-target commands expose only living eligible sprites with a red target arrow',()=>{
    const battle=state()
    const html=renderToStaticMarkup(createElement(DoubleBattleScene,{
      state:battle,isWaitingForOpponent:false,selectedTarget:{side:'opponent',slot:1},onChooseTarget:()=>{},
    }))
    expect(html).toContain('aria-label="Target E0"')
    expect(html).toContain('aria-label="Target E1"')
    expect(html.match(/selected-doubles-target-arrow/g)).toHaveLength(1)
    battle.enemyTeam[1].currentHp=0
    const faintedHtml=renderToStaticMarkup(createElement(DoubleBattleScene,{
      state:battle,isWaitingForOpponent:false,selectedTarget:{side:'opponent',slot:1},onChooseTarget:()=>{},
    }))
    expect(faintedHtml).not.toContain('aria-label="Target E1"')
    expect(faintedHtml).not.toContain('selected-doubles-target-arrow')
  })
  test('Hospitality heals an active partner on entry; Commander occupies its own lane until Dondozo faints',()=>{
    const battle=state()
    battle.playerTeam[0].ability='hospitality'
    battle.playerTeam[1].currentHp=700
    expect(processDoublesPartnerEntry(battle,'player',0).join(' ')).toContain('Hospitality')
    expect(battle.playerTeam[1].currentHp).toBeGreaterThan(700)
    battle.playerTeam[0].ability='commander'
    battle.playerTeam[1].speciesId=977
    processDoublesPartnerEntry(battle,'player',0)
    expect(isDoublesCommanderInactive(battle.playerTeam[0])).toBe(true)
    expect(battle.playerTeam[1].statStages?.attack).toBe(2)
  })
  test('Flower Veil protects a Grass partner from status and stat drops',()=>{
    const battle=state()
    battle.playerTeam[1].ability='flower_veil'
    battle.playerTeam[0].types=['grass']
    battle.playerTeam[0].status={id:'poison',counter:0}
    battle.playerTeam[0].statStages={attack:-1,defense:0,specialAttack:0,specialDefense:0,speed:0,crit:0,accuracy:0,evasion:0}
    const messages=processDoublesPartnerProtection(battle,'player',0,undefined,{attack:0,defense:0,specialAttack:0,specialDefense:0,speed:0,crit:0,accuracy:0,evasion:0})
    expect(battle.playerTeam[0].status).toBeUndefined()
    expect(battle.playerTeam[0].statStages?.attack).toBe(0)
    expect(messages.join(' ')).toContain('Flower Veil')
  })
})
