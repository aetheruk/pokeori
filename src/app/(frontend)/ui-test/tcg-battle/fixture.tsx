'use client'

import { useMemo } from 'react'
import { SWRConfig } from 'swr'
import { TcgBattleGame, type TcgBattlePreviewActions } from '@/app/(frontend)/game/research/encounter/tcg-battle'
import { AudioProvider } from '@/context/AudioContext'
import { UserProvider } from '@/context/UserContext'
import { testTcgBattleGames } from '@/data/games/tcg-battle/entries/test'
import {
  applyTcgBattleEvolution,
  type TcgBattleCardState,
  type TcgBattleState,
} from '@/utilities/tcg/tcg-battle'

const encounter = testTcgBattleGames[0]

function card(id: string, name: string, type: string, extra: Partial<TcgBattleCardState> = {}): TcgBattleCardState {
  return {
    id, name, instanceId: id, image: `https://images.pokemontcg.io/${id.replace('-', '/')}.png`,
    hp: 60, currentHp: 60, cost: 2, convertedRetreatCost: 1, types: [type],
    subtypes: ['Basic'], weaknesses: [], resistances: [],
    attacks: [{ name: 'Quick Attack', damage: '20', convertedEnergyCost: 1, cost: ['Colorless'], text: '' }],
    ...extra,
  }
}

function openingState(pvp: boolean): TcgBattleState {
  const magnemite = card('base1-53', 'Magnemite', 'Lightning', {
    attacks: [
      { name: 'Thunder Wave', damage: '10', convertedEnergyCost: 1, cost: ['Lightning'], text: '' },
      { name: 'Selfdestruct', damage: '40', convertedEnergyCost: 4, cost: ['Lightning', 'Lightning', 'Colorless', 'Colorless'], text: '' },
    ],
  })
  const magneton = card('base1-9', 'Magneton', 'Lightning', { subtypes: ['Stage 1'], evolvesFrom: 'Magnemite' })
  const draw = { ...magneton, instanceId: 'magneton-draw' }
  const rhyhorn = card('base2-61', 'Rhyhorn', 'Fighting')
  const pikachu = card('base1-58', 'Pikachu', 'Lightning')
  const golbat = card('base3-34', 'Golbat', 'Grass', { subtypes: ['Stage 1'], evolvesFrom: 'Zubat' })
  const darkCrobat = card('neo4-2', 'Dark Crobat', 'Grass', {
    subtypes: ['Stage 2'],
    evolvesFrom: 'Golbat',
    abilities: [{
      name: 'Preview damage', type: 'Pokémon Power',
      text: "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may put 2 damage counters on 1 of your opponent's Pokémon.",
    }],
  })
  const slowpoke = card('base3-55', 'Slowpoke', 'Psychic')
  const slowbro = card('base3-43', 'Slowbro', 'Psychic', {
    subtypes: ['Stage 1'], evolvesFrom: 'Slowpoke',
    abilities: [{
      name: 'Preview draw', type: 'Ability',
      text: 'When you play this Pokémon from your hand to evolve 1 of your Pokémon, you may draw 1 card.',
    }],
  })
  const meowth = card('base2-56', 'Meowth', 'Colorless', { currentHp: 10 })
  const oddish = card('base2-58', 'Oddish', 'Grass')
  const psyduck = card('base3-53', 'Psyduck', 'Water')
  const deck = [rhyhorn, pikachu, slowpoke, slowbro, oddish, psyduck, golbat, magneton]
  return {
    userId: 'tcg-preview', encounterId: encounter.id, format: 'standard', phase: 'battle',
    battleMode: pvp ? 'pvp' : 'pve', turnNumber: 6, revision: 1, activeSide: pvp ? 'opponent' : 'player',
    player: {
      front: [magnemite, slowpoke], back: [golbat], discard: [], deck,
      hand: [magneton, draw, rhyhorn, pikachu, darkCrobat, slowbro],
      energy: 4, knockoutCount: 1, turnDraw: { instanceId: draw.instanceId, turnNumber: 6 },
    },
    opponent: {
      front: [meowth, oddish, psyduck], back: [], deck: pvp ? [] : deck,
      hand: [], discard: [], energy: 5, knockoutCount: 2,
      ...(pvp ? { deckCount: 8 } : {}),
    },
    consecutivePasses: 0,
    startedAt: Date.now(),
    updatedAt: Date.now(),
    lastDamageEvent: { id: 'old-hit', sourceId: magnemite.instanceId, targetId: meowth.instanceId, targetSide: 'opponent', damage: 10 },
    log: [],
  }
}

function previewActions(pvp: boolean): TcgBattlePreviewActions {
  const state = openingState(pvp)
  const response = () => ({ success: true as const, state: structuredClone(state) })
  const fail = (error: string) => ({ success: false as const, error })

  const nextDraw = () => {
    state.activeSide = 'player'
    state.turnNumber += 1
    const next = state.player.deck.shift()
    if (next) {
      const drawn = { ...next, instanceId: `draw-${state.turnNumber}`, currentHp: next.hp }
      state.player.hand.push(drawn)
      state.player.turnDraw = { instanceId: drawn.instanceId, turnNumber: state.turnNumber }
    }
  }

  return {
    start: async () => response(),
    refresh: async () => {
      if (pvp && state.revision === 1) {
        const attacker = state.opponent.front[0]
        const target = state.player.front[0]
        const bench = state.player.back[0]
        target.currentHp -= 20
        bench.currentHp -= 10
        state.revision = 2
        state.lastAction = { id: 'opponent-attack', kind: 'attack', side: 'opponent', attackerId: attacker.instanceId, targetId: target.instanceId, attackIndex: 0 }
        state.lastDamageEvents = [
          { id: 'remote-hit', sourceId: attacker.instanceId, targetId: target.instanceId, targetSide: 'player', damage: 20, reason: 'attack' },
          { id: 'remote-spread', sourceId: attacker.instanceId, targetId: bench.instanceId, targetSide: 'player', damage: 10, reason: 'attack' },
        ]
        state.lastDamageEvent = state.lastDamageEvents[1]
        nextDraw()
      }
      return response()
    },
    playBasic: async (id) => {
      const index = state.player.hand.findIndex((item) => item.instanceId === id && item.subtypes.includes('Basic'))
      if (index < 0) return fail('Choose a Basic Pokémon.')
      const [played] = state.player.hand.splice(index, 1)
      if (state.player.front.length < 3) state.player.front.push(played)
      else state.player.back.push(played)
      state.lastAction = { id: `play-${id}`, kind: 'bench', side: 'player', frontId: id }
      state.revision = (state.revision || 0) + 1
      return response()
    },
    evolve: async (targetId, evolutionId, _revision, choice) => {
      const evolved = applyTcgBattleEvolution(state.player, targetId, evolutionId, state.turnNumber, 'player', state.opponent)
      if (!evolved) return fail('Choose a legal Evolution.')
      if (choice === 'draw') {
        const drawn = state.player.deck.shift()
        if (drawn) state.player.hand.push({ ...drawn, instanceId: 'ability-draw', currentHp: drawn.hp })
      }
      if (evolved.target.name === 'Dark Crobat' && typeof choice === 'string') {
        const target = state.opponent.front.find((item) => item.instanceId === choice)
        if (target) {
          target.currentHp -= 20
          state.lastDamageEvent = { id: 'evolution-hit', sourceId: targetId, targetId: choice, targetSide: 'opponent', damage: 20, reason: 'ability' }
          state.lastDamageEvents = [state.lastDamageEvent]
        }
      }
      state.revision = (state.revision || 0) + 1
      return response()
    },
    charge: async () => {
      state.player.energy = Math.min(12, state.player.energy + 2)
      nextDraw()
      return response()
    },
    attack: async (attackerId, attackIndex, targetId) => {
      const foe = state.opponent.front.find((item) => item.instanceId === targetId)
      if (!foe) return fail('Choose an opponent.')
      const hit = { id: 'player-hit', sourceId: attackerId, targetId, targetSide: 'opponent' as const, damage: 10, reason: 'attack' as const }
      foe.currentHp = Math.max(0, foe.currentHp - hit.damage)
      if (foe.currentHp === 0) {
        state.opponent.knockoutCount = (state.opponent.knockoutCount || 0) + 1
        state.opponent.front = state.opponent.front.filter((item) => item !== foe)
      }
      state.lastAction = { id: 'local-attack', kind: 'attack', side: 'player', attackerId, targetId, attackIndex }
      state.lastDamageEvent = hit
      state.lastDamageEvents = [hit]
      nextDraw()
      return response()
    },
  }
}

export function TcgBattleFixture({ pvp }: { pvp: boolean }) {
  const actions = useMemo(() => previewActions(pvp), [pvp])
  return (
    <SWRConfig value={{ isPaused: () => true }}>
      <UserProvider>
        <AudioProvider>
          <TcgBattleGame encounter={encounter} actions={actions} />
        </AudioProvider>
      </UserProvider>
    </SWRConfig>
  )
}
