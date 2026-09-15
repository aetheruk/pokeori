import { describe, expect, test } from 'bun:test'
import { getMove } from '@/data/moves'
import { applyMoveRuntimeEffects } from '@/utilities/battle/move-effects'
import { getPokemonResearchLevelItemRewards } from '@/utilities/research/research-levels'
import { makeBattlePokemon, makePveBattleState } from './helpers/battle-fixtures'

describe('weather moves and research unlocks', () => {
  test('authors all five weather-setting moves with canonical Castform compatibility', () => {
    for (const id of ['sunny-day', 'rain-dance', 'sandstorm', 'hail', 'snowscape']) {
      expect(getMove(id)?.weatherEffect).toBeDefined()
      expect(getMove(id)?.formId?.length).toBeGreaterThan(0)
    }

    expect(getMove('sunny-day')?.formId).toContain('351')
    expect(getMove('rain-dance')?.formId).toContain('351')
    expect(getMove('sandstorm')?.formId).toContain('351')
    expect(getMove('hail')?.formId).toContain('351')
    expect(getMove('snowscape')?.formId).not.toContain('351')
  })

  test('unlocks Castform weather TMs across research levels one through five', () => {
    const rewards = getPokemonResearchLevelItemRewards('351', 0, 5)
    expect(rewards.map((reward) => reward.targetId)).toEqual([
      'tm-sunny-day',
      'tm-rain-dance',
      'tm-weather-ball',
      'tm-sandstorm',
      'tm-hail',
      'tm-snowscape',
    ])
  })

  test('weather-setting moves update battle weather and trigger weather ability changes', () => {
    const state = makePveBattleState({
      weather: {
        slot: 1,
        weather: 'clear',
        label: 'Clear',
        source: 'region',
      },
    })
    const attacker = makeBattlePokemon({ name: 'Castform', formId: '351' })
    const defender = state.enemyTeam[0]

    const result = applyMoveRuntimeEffects({
      move: getMove('rain-dance')!,
      state,
      side: 'player',
      attacker,
      defender,
    })

    expect(result.failed).toBeUndefined()
    expect(state.weather?.weather).toBe('rain')
    expect(state.weather?.source).toBe('move')
    expect(result.messages[0]).toContain('Rain Dance')
  })
})
