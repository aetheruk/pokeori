import { describe, expect, test } from 'bun:test'
import { calculateDamage } from '@/utilities/battle/battle-logic'
import type { BattlePokemon, BattleState } from '@/utilities/battle/types'
import {
  getWeatherAccuracy,
  processEndTurnWeatherDamage,
} from '@/utilities/battle/weather-effects'
import { processEndTurnWeatherDamageForState } from '@/utilities/battle/turn-logic'
import { processBattleAbilityWeatherSet } from '@/utilities/battle/abilities'

function makePokemon(overrides: Partial<BattlePokemon> = {}): BattlePokemon {
  return {
    id: 'pokemon-1',
    user: 'user-1',
    originalTrainer: 'user-1',
    speciesId: 1,
    formId: '1',
    level: 50,
    name: 'Testmon',
    types: ['Normal'],
    stats: {
      hp: 160,
      attack: 100,
      defense: 100,
      specialAttack: 100,
      specialDefense: 100,
      speed: 100,
    },
    currentHp: 160,
    maxHp: 160,
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  }
}

function makeState(player: BattlePokemon, enemy: BattlePokemon): BattleState {
  return {
    playerTeam: [player],
    enemyTeam: [enemy],
    activePlayerIndex: 0,
    activeEnemyIndex: 0,
    turn: 1,
    history: [],
    status: 'ongoing',
    battleId: 'battle',
    playerName: 'Player',
    enemyName: 'Enemy',
    itemsUsedThisBattle: [],
  }
}

function withFixedRandom<T>(value: number, fn: () => T): T {
  const originalRandom = Math.random
  Math.random = () => value
  try {
    return fn()
  } finally {
    Math.random = originalRandom
  }
}

describe('battle weather effects', () => {
  test('sun and rain modify Fire and Water attack damage', () => {
    const attacker = makePokemon({ types: ['Fire'] })
    const defender = makePokemon()

    withFixedRandom(0.99, () => {
      const clearFire = calculateDamage(attacker, defender, 'tech', 1, 'fire')
      const sunFire = calculateDamage(
        attacker,
        defender,
        'tech',
        1,
        'fire',
        undefined,
        undefined,
        undefined,
        'harsh-sunlight',
      )
      const rainFire = calculateDamage(
        attacker,
        defender,
        'tech',
        1,
        'fire',
        undefined,
        undefined,
        undefined,
        'rain',
      )

      expect(sunFire.weatherMultiplier).toBe(1.5)
      expect(rainFire.weatherMultiplier).toBe(0.5)
      expect(sunFire.damage).toBeGreaterThan(clearFire.damage)
      expect(rainFire.damage).toBeLessThan(clearFire.damage)
    })
  })

  test('primal weather blocks protected attack types', () => {
    const attacker = makePokemon({ types: ['Water'] })
    const defender = makePokemon()

    withFixedRandom(0.99, () => {
      const result = calculateDamage(
        attacker,
        defender,
        'tech',
        1,
        'water',
        undefined,
        undefined,
        undefined,
        'extremely-harsh-sunlight',
      )

      expect(result.damage).toBe(0)
      expect(result.weatherMultiplier).toBe(0)
      expect(result.weatherMessage).toContain('extreme sunlight')
    })
  })

  test('strong winds neutralize Flying weakness from Electric, Ice, and Rock moves', () => {
    const attacker = makePokemon({ types: ['Ice'] })
    const defender = makePokemon({ types: ['Dragon', 'Flying'] })

    const clear = calculateDamage(attacker, defender, 'speed', 1, 'ice')
    const windy = calculateDamage(
      attacker,
      defender,
      'speed',
      1,
      'ice',
      undefined,
      undefined,
      undefined,
      'strong-winds',
    )

    expect(clear.typeEffectiveness).toBe(4)
    expect(windy.typeEffectiveness).toBe(2)
  })

  test('sandstorm and snow boost the matching defensive stats', () => {
    const attacker = makePokemon({
      stats: {
        hp: 160,
        attack: 120,
        defense: 100,
        specialAttack: 120,
        specialDefense: 100,
        speed: 100,
      },
    })

    withFixedRandom(0.99, () => {
      const rockDefender = makePokemon({ types: ['Rock'] })
      const clearTech = calculateDamage(attacker, rockDefender, 'tech', 1, 'water')
      const sandTech = calculateDamage(
        attacker,
        rockDefender,
        'tech',
        1,
        'water',
        undefined,
        undefined,
        undefined,
        'sandstorm',
      )

      const iceDefender = makePokemon({ types: ['Ice'] })
      const clearPower = calculateDamage(attacker, iceDefender, 'power', 1, 'normal')
      const snowPower = calculateDamage(
        attacker,
        iceDefender,
        'power',
        1,
        'normal',
        undefined,
        undefined,
        undefined,
        'snow',
      )

      expect(sandTech.damage).toBeLessThan(clearTech.damage)
      expect(snowPower.damage).toBeLessThan(clearPower.damage)
    })
  })

  test('fog lowers non-perfect move accuracy', () => {
    expect(getWeatherAccuracy(50, 'fog')).toBe(30)
    expect(getWeatherAccuracy(100, 'fog')).toBe(100)
    expect(getWeatherAccuracy(80, 'rain')).toBe(80)
  })

  test('weather-setting abilities update battle weather state', () => {
    const player = makePokemon({ name: 'Politoed', ability: 'drizzle' })
    const enemy = makePokemon({ name: 'Target' })
    const state = makeState(player, enemy)
    state.weather = {
      slot: 1,
      weather: 'clear',
      label: 'Clear',
    }

    const messages = processBattleAbilityWeatherSet({
      state,
      pokemon: player,
      ownerName: 'Player',
    })

    expect(state.weather?.weather).toBe('rain')
    expect(state.weather?.source).toBe('ability')
    expect(state.weather?.originalWeather).toBe('clear')
    expect(messages).toEqual(["Politoed's Drizzle made the weather Rain!"])
  })

  test('ability-set weather participates in damage calculation', () => {
    const attacker = makePokemon({ name: 'Kyogre', ability: 'primordial_sea' })
    const defender = makePokemon()
    const state = makeState(attacker, defender)
    state.weather = {
      slot: 1,
      weather: 'clear',
      label: 'Clear',
    }
    processBattleAbilityWeatherSet({ state, pokemon: attacker })

    withFixedRandom(0.99, () => {
      const result = calculateDamage(
        attacker,
        defender,
        'tech',
        1,
        'fire',
        undefined,
        undefined,
        undefined,
        state.weather?.weather,
      )

      expect(state.weather?.weather).toBe('heavy-rain')
      expect(result.damage).toBe(0)
      expect(result.weatherMessage).toContain('heavy rain')
    })
  })

  test('primal weather blocks regular weather-setting abilities', () => {
    const player = makePokemon({ name: 'Groudon', ability: 'desolate_land' })
    const enemy = makePokemon({ name: 'Politoed', ability: 'drizzle' })
    const state = makeState(player, enemy)
    state.weather = {
      slot: 1,
      weather: 'clear',
      label: 'Clear',
    }

    processBattleAbilityWeatherSet({ state, pokemon: player })
    const messages = processBattleAbilityWeatherSet({ state, pokemon: enemy })

    expect(state.weather?.weather).toBe('extremely-harsh-sunlight')
    expect(messages).toEqual([
      "Politoed's Drizzle could not replace Extreme Sunlight!",
    ])
  })

  test('end-turn weather damages only non-immune active Pokemon', () => {
    const player = makePokemon({ name: 'Grassmon', types: ['Grass'] })
    const enemy = makePokemon({ name: 'Rockmon', types: ['Rock'] })
    const state = makeState(player, enemy)
    state.weather = {
      slot: 1,
      weather: 'sandstorm',
      label: 'Sandstorm',
    }

    const messages = processEndTurnWeatherDamageForState(state)

    expect(player.currentHp).toBe(150)
    expect(enemy.currentHp).toBe(160)
    expect(messages).toHaveLength(1)
    expect(messages[0]).toContain('Sandstorm')
  })

  test('shadowy aura ignores Shadow Pokemon', () => {
    const player = makePokemon({ name: 'Plainmon' })
    const enemy = makePokemon({ name: 'Shadowmon', isShadow: true })

    const messages = processEndTurnWeatherDamage({
      playerMon: player,
      enemyMon: enemy,
      playerName: 'Player',
      enemyName: 'Enemy',
      weather: 'shadowy-aura',
    })

    expect(player.currentHp).toBe(150)
    expect(enemy.currentHp).toBe(160)
    expect(messages).toHaveLength(1)
  })

  test('weather abilities heal or damage active Pokemon at turn end', () => {
    const player = makePokemon({
      name: 'Rainmon',
      ability: 'rain_dish',
      currentHp: 120,
      maxHp: 160,
    })
    const enemy = makePokemon({
      name: 'Drymon',
      ability: 'dry_skin',
      currentHp: 120,
      maxHp: 160,
    })
    const state = makeState(player, enemy)
    state.weather = {
      slot: 1,
      weather: 'rain',
      label: 'Rain',
    }

    const messages = processEndTurnWeatherDamageForState(state)

    expect(player.currentHp).toBe(130)
    expect(enemy.currentHp).toBe(140)
    expect(messages).toEqual([
      "Player's Rainmon's Rain Dish restored 10 HP! [icon:heal:10]",
      "Enemy's Drymon's Dry Skin restored 20 HP! [icon:heal:20]",
    ])
  })

  test('sun weather abilities damage active Pokemon at turn end', () => {
    const player = makePokemon({
      name: 'Charmander',
      ability: 'solar_power',
      currentHp: 160,
      maxHp: 160,
    })
    const enemy = makePokemon({
      name: 'Paras',
      ability: 'dry_skin',
      currentHp: 160,
      maxHp: 160,
    })
    const state = makeState(player, enemy)
    state.weather = {
      slot: 1,
      weather: 'harsh-sunlight',
      label: 'Harsh Sunlight',
    }

    const messages = processEndTurnWeatherDamageForState(state)

    expect(player.currentHp).toBe(140)
    expect(enemy.currentHp).toBe(140)
    expect(messages).toEqual([
      "Player's Charmander's Solar Power hurt it! [icon:damage:20]",
      "Enemy's Paras's Dry Skin hurt it! [icon:damage:20]",
    ])
  })

  test('weather ability healing does not overheal and ice body heals in snow', () => {
    const player = makePokemon({
      name: 'Glaceon',
      ability: 'ice_body',
      types: ['Ice'],
      currentHp: 155,
      maxHp: 160,
    })
    const enemy = makePokemon({
      name: 'Fullmon',
      ability: 'rain_dish',
      currentHp: 160,
      maxHp: 160,
    })
    const state = makeState(player, enemy)
    state.weather = {
      slot: 1,
      weather: 'snowstorm',
      label: 'Snowstorm',
    }

    const messages = processEndTurnWeatherDamageForState(state)

    expect(player.currentHp).toBe(160)
    expect(enemy.currentHp).toBe(150)
    expect(messages).toEqual([
      "Enemy's Fullmon is buffeted by Snowstorm! [icon:damage:10]",
      "Player's Glaceon's Ice Body restored 5 HP! [icon:heal:5]",
    ])
  })
})
