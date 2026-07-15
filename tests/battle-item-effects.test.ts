import { describe, expect, test } from 'bun:test'
import { items } from '@/data/items'
import { calculateDamage } from '@/utilities/battle/damage-calc'
import { applyStatus } from '@/utilities/battle/status-effects-logic'
import {
  applyHeldAttackBreak,
  applyHeldItemChargeOnHit,
  applyHeldItemIfTriggered,
  restoreConsumedBerryByAbility,
} from '@/utilities/battle/held-items'
import { applyBattleItemEffect } from '@/utilities/battle/item-effects'
import { getBattleAbilityStatMultiplier } from '@/utilities/battle/abilities'
import { makeBattlePokemon } from './helpers/battle-fixtures'
import { applyHeldItemStatModifiers } from '@/utilities/pokemon/held-items'
import {
  collectHeldItemBattleWinEffects,
  resolveConsumedHeldItemPersistence,
} from '@/app/(frontend)/game/battles/helpers/held-items'

describe('battle item effects', () => {
  test('does not apply or consume no-effect healing at full HP', () => {
    const pokemon = makeBattlePokemon({ currentHp: 120, maxHp: 120 })

    const result = applyBattleItemEffect({
      pokemon,
      battleEffect: { type: 'heal', healAmount: 20 },
    })

    expect(result.applied).toBe(false)
    expect(result.message).toBe('Bulbasaur is already at full HP.')
    expect(pokemon.currentHp).toBe(120)
  })

  test('applies healing when HP is missing', () => {
    const pokemon = makeBattlePokemon({ currentHp: 80, maxHp: 120 })

    const result = applyBattleItemEffect({
      pokemon,
      battleEffect: { type: 'heal', healAmount: 20 },
    })

    expect(result.applied).toBe(true)
    expect(result.message).toBe('Bulbasaur was healed for 20 HP!')
    expect(pokemon.currentHp).toBe(100)
  })

  test('does not apply status cure when the status is absent', () => {
    const pokemon = makeBattlePokemon()

    const result = applyBattleItemEffect({
      pokemon,
      battleEffect: { type: 'heal', clearStatus: 'burn' },
    })

    expect(result.applied).toBe(false)
    expect(result.message).toBe('Bulbasaur is already healthy!')
  })

  test('clears matching status from multi-status cure lists', () => {
    const pokemon = makeBattlePokemon({
      status: { id: 'bad-poison', counter: 2 },
    })

    const result = applyBattleItemEffect({
      pokemon,
      battleEffect: { type: 'heal', clearStatus: ['poison', 'bad-poison'] },
    })

    expect(result.applied).toBe(true)
    expect(result.message).toBe('Bulbasaur was cured of bad-poison!')
    expect(pokemon.status).toBeUndefined()
  })

  test('does not clear unmatched status from multi-status cure lists', () => {
    const pokemon = makeBattlePokemon({ status: { id: 'burn', counter: 1 } })

    const result = applyBattleItemEffect({
      pokemon,
      battleEffect: { type: 'heal', clearStatus: ['freeze', 'frostbite'] },
    })

    expect(result.applied).toBe(false)
    expect(result.message).toBe("It won't have any effect.")
    expect(pokemon.status?.id).toBe('burn')
  })

  test('using an otherwise no-effect item still cancels vanish with a useful message', () => {
    const pokemon = makeBattlePokemon({
      currentHp: 120,
      maxHp: 120,
      status: { id: 'vanished', counter: 1 },
    })

    const result = applyBattleItemEffect({
      pokemon,
      battleEffect: { type: 'heal', healAmount: 20 },
    })

    expect(result.applied).toBe(true)
    expect(result.message).toBe('Bulbasaur returned to the battle!')
    expect(pokemon.status).toBeUndefined()
    expect(pokemon.currentHp).toBe(120)
  })

  test('reports capped stat boosts without mutating stages', () => {
    const pokemon = makeBattlePokemon({
      statStages: {
        attack: 6,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0,
        crit: 0,
        accuracy: 0,
        evasion: 0,
      },
    })

    const result = applyBattleItemEffect({
      pokemon,
      battleEffect: { type: 'buff', buffStat: 'attack', buffStages: 1 },
    })

    expect(result.applied).toBe(false)
    expect(result.message).toBe("Bulbasaur's Attack won't go any higher.")
    expect(pokemon.statStages?.attack).toBe(6)
  })

  test('all battle item status cures are executable by the effect resolver', () => {
    const statusCureItems = items.filter(
      (item) => item.battleEffect?.clearStatus,
    )

    expect(statusCureItems.length).toBeGreaterThan(0)
    for (const item of statusCureItems) {
      const clearStatus = item.battleEffect?.clearStatus
      const statusId = Array.isArray(clearStatus)
        ? clearStatus[0]
        : clearStatus === 'all'
          ? 'burn'
          : clearStatus
      const pokemon = makeBattlePokemon({
        status: { id: statusId || 'burn', counter: 1 },
      })

      const result = applyBattleItemEffect({
        pokemon,
        battleEffect: item.battleEffect!,
      })

      expect(result.applied, item.id).toBe(true)
      expect(pokemon.status, item.id).toBeUndefined()
    }
  })

  test('held HP berry triggers at threshold, heals, and is consumed', () => {
    const pokemon = makeBattlePokemon({
      currentHp: 30,
      maxHp: 120,
      heldItem: { id: 'oran-berry', name: 'Oran Berry' },
    })

    const result = applyHeldItemIfTriggered(pokemon, 'hp')

    expect(result.applied).toBe(true)
    expect(result.message).toContain('Bulbasaur used its Oran Berry!')
    expect(pokemon.currentHp).toBe(40)
    expect(pokemon.heldItem).toBeUndefined()
    expect(pokemon.consumedHeldItems).toEqual([
      { itemId: 'oran-berry', name: 'Oran Berry' },
    ])
  })

  test('Ripen doubles automatic held berry healing', () => {
    const pokemon = makeBattlePokemon({
      currentHp: 30,
      maxHp: 120,
      ability: 'ripen',
      heldItem: { id: 'oran-berry', name: 'Oran Berry' },
    })

    const result = applyHeldItemIfTriggered(pokemon, 'hp')

    expect(result.applied).toBe(true)
    expect(result.message).toContain('Bulbasaur used its Oran Berry!')
    expect(result.message).toContain('Bulbasaur was healed for 20 HP!')
    expect(pokemon.currentHp).toBe(50)
    expect(pokemon.heldItem).toBeUndefined()
  })

  test('Cheek Pouch heals after automatic held berry consumption', () => {
    const pokemon = makeBattlePokemon({
      currentHp: 30,
      maxHp: 120,
      ability: 'cheek_pouch',
      heldItem: { id: 'sitrus-berry', name: 'Sitrus Berry' },
    })

    const result = applyHeldItemIfTriggered(pokemon, 'hp')

    expect(result.applied).toBe(true)
    expect(result.message).toContain('Bulbasaur used its Sitrus Berry!')
    expect(result.message).toContain("Bulbasaur's Cheek Pouch restored 39 HP!")
    expect(pokemon.currentHp).toBe(99)
    expect(pokemon.heldItem).toBeUndefined()
  })

  test('Gluttony raises automatic HP berry trigger threshold', () => {
    const normal = makeBattlePokemon({
      currentHp: 45,
      maxHp: 120,
      heldItem: { id: 'oran-berry', name: 'Oran Berry' },
    })
    const gluttony = makeBattlePokemon({
      currentHp: 45,
      maxHp: 120,
      ability: 'gluttony',
      heldItem: { id: 'oran-berry', name: 'Oran Berry' },
    })

    expect(applyHeldItemIfTriggered(normal, 'hp')).toEqual({
      applied: false,
      message: '',
    })
    const result = applyHeldItemIfTriggered(gluttony, 'hp')

    expect(result.applied).toBe(true)
    expect(result.message).toContain('Bulbasaur used its Oran Berry!')
    expect(gluttony.currentHp).toBe(55)
    expect(gluttony.heldItem).toBeUndefined()
  })

  test('Harvest can restore a consumed held berry at end turn', () => {
    const pokemon = makeBattlePokemon({
      ability: 'harvest',
      consumedHeldItems: [{ itemId: 'oran-berry', name: 'Oran Berry' }],
    })

    const failedRoll = restoreConsumedBerryByAbility(pokemon, 'clear', () => 0.5)
    expect(failedRoll.applied).toBe(false)
    expect(pokemon.heldItem).toBeUndefined()
    expect(pokemon.consumedHeldItems).toEqual([
      { itemId: 'oran-berry', name: 'Oran Berry' },
    ])

    const restored = restoreConsumedBerryByAbility(pokemon, 'clear', () => 0.49)
    expect(restored.applied).toBe(true)
    expect(restored.message).toContain("Bulbasaur's ability restored its Oran Berry!")
    expect(pokemon.heldItem).toEqual({ id: 'oran-berry', name: 'Oran Berry' })
    expect(pokemon.heldItemId).toBe('oran-berry')
    expect(pokemon.consumedHeldItems).toEqual([])
  })

  test('Harvest always restores a consumed held berry in harsh sunlight', () => {
    const pokemon = makeBattlePokemon({
      ability: 'harvest',
      consumedHeldItems: [{ itemId: 'sitrus-berry', name: 'Sitrus Berry' }],
    })

    const restored = restoreConsumedBerryByAbility(
      pokemon,
      'harsh-sunlight',
      () => 0.99,
    )

    expect(restored.applied).toBe(true)
    expect(pokemon.heldItem).toEqual({ id: 'sitrus-berry', name: 'Sitrus Berry' })
    expect(pokemon.consumedHeldItems).toEqual([])
  })

  test('Unburden doubles Speed only after the holder loses its item', () => {
    const itemless = makeBattlePokemon({
      ability: 'unburden',
    })
    expect(
      getBattleAbilityStatMultiplier({
        pokemon: itemless,
        stat: 'speed',
      }),
    ).toBe(1)

    const pokemon = makeBattlePokemon({
      currentHp: 30,
      maxHp: 120,
      ability: 'unburden',
      heldItem: { id: 'oran-berry', name: 'Oran Berry' },
    })
    expect(
      getBattleAbilityStatMultiplier({
        pokemon,
        stat: 'speed',
      }),
    ).toBe(1)

    const result = applyHeldItemIfTriggered(pokemon, 'hp')

    expect(result.applied).toBe(true)
    expect(pokemon.battleAbilityState?.heldItemLost).toBe(true)
    expect(
      getBattleAbilityStatMultiplier({
        pokemon,
        stat: 'speed',
      }),
    ).toBe(2)
  })

  test('battle-only held items can trigger without becoming persistent consumption', () => {
    const pokemon = makeBattlePokemon({
      currentHp: 30,
      maxHp: 120,
      heldItem: { id: 'oran-berry', name: 'Oran Berry' },
      heldItemBattleOnly: true,
    })

    const result = applyHeldItemIfTriggered(pokemon, 'hp')

    expect(result.applied).toBe(true)
    expect(pokemon.currentHp).toBe(40)
    expect(pokemon.heldItem).toBeUndefined()
    expect(pokemon.heldItemBattleOnly).toBeUndefined()
    expect(pokemon.consumedHeldItems).toEqual([
      { itemId: 'oran-berry', name: 'Oran Berry', persistent: false },
    ])
  })

  test('inferior elemental stones charge only on matching attack hits', () => {
    const pokemon = makeBattlePokemon({
      heldItem: { id: 'inferior-fire-stone', name: 'Inferior Fire Stone' },
      itemCharge: 10,
    })

    const wrongType = applyHeldItemChargeOnHit({
      pokemon,
      attackType: 'water',
      damage: 25,
    })
    expect(wrongType.applied).toBe(false)
    expect(pokemon.itemCharge).toBe(10)

    const blockedHit = applyHeldItemChargeOnHit({
      pokemon,
      attackType: 'fire',
      damage: 0,
    })
    expect(blockedHit.applied).toBe(false)
    expect(pokemon.itemCharge).toBe(10)

    const matchingHit = applyHeldItemChargeOnHit({
      pokemon,
      attackType: 'fire',
      damage: 25,
    })
    expect(matchingHit.applied).toBe(true)
    expect(matchingHit.message).toContain('charged to 15%')
    expect(pokemon.itemCharge).toBe(15)
  })

  test('inferior elemental stones queue rewards and clear held item at full charge', () => {
    const state: any = { heldItemChargeRewards: [] }
    const pokemon = makeBattlePokemon({
      id: 'pokemon-1',
      user: 'player-1',
      heldItem: { id: 'inferior-fire-stone', name: 'Inferior Fire Stone' },
      itemCharge: 95,
    })

    const result = applyHeldItemChargeOnHit({
      state,
      pokemon,
      attackType: 'fire',
      damage: 25,
    })

    expect(result.applied).toBe(true)
    expect(result.message).toContain('Fire Stone')
    expect(pokemon.itemCharge).toBe(0)
    expect(pokemon.heldItem).toBeUndefined()
    expect(pokemon.heldItemId).toBeNull()
    expect(pokemon.consumedHeldItems).toEqual([
      {
        itemId: 'inferior-fire-stone',
        name: 'Inferior Fire Stone',
        forceClear: true,
        persistent: undefined,
      },
    ])
    expect(state.heldItemChargeRewards).toEqual([
      {
        ownerId: 'player-1',
        pokemonId: 'pokemon-1',
        itemId: 'fire-stone',
        quantity: 1,
      },
    ])
  })

  test('inferior time stones charge only during their active day or night window', () => {
    const lightStone = makeBattlePokemon({
      heldItem: { id: 'inferior-light-stone', name: 'Inferior Light Stone' },
      itemCharge: 20,
    })
    const darkStone = makeBattlePokemon({
      heldItem: { id: 'inferior-dark-stone', name: 'Inferior Dark Stone' },
      itemCharge: 20,
    })

    const inactiveLight = applyHeldItemChargeOnHit({
      pokemon: lightStone,
      attackType: 'water',
      damage: 25,
      now: new Date('2026-06-29T23:00:00'),
    })
    expect(inactiveLight.applied).toBe(false)
    expect(lightStone.itemCharge).toBe(20)

    const activeLight = applyHeldItemChargeOnHit({
      pokemon: lightStone,
      attackType: 'water',
      damage: 25,
      now: new Date('2026-06-29T12:00:00'),
    })
    expect(activeLight.applied).toBe(true)
    expect(lightStone.itemCharge).toBe(22)

    const activeDark = applyHeldItemChargeOnHit({
      pokemon: darkStone,
      attackType: 'fire',
      damage: 25,
      now: new Date('2026-06-29T23:00:00'),
    })
    expect(activeDark.applied).toBe(true)
    expect(darkStone.itemCharge).toBe(22)
  })

  test('inferior time stones choose dawn and dusk rewards during transition hours', () => {
    const dawnState: any = { heldItemChargeRewards: [] }
    const duskState: any = { heldItemChargeRewards: [] }
    const dayState: any = { heldItemChargeRewards: [] }
    const nightState: any = { heldItemChargeRewards: [] }

    applyHeldItemChargeOnHit({
      state: dawnState,
      pokemon: makeBattlePokemon({
        id: 'light-dawn',
        user: 'player-1',
        heldItem: { id: 'inferior-light-stone', name: 'Inferior Light Stone' },
        itemCharge: 98,
      }),
      damage: 25,
      now: new Date('2026-06-29T06:30:00'),
    })
    applyHeldItemChargeOnHit({
      state: dayState,
      pokemon: makeBattlePokemon({
        id: 'light-day',
        user: 'player-1',
        heldItem: { id: 'inferior-light-stone', name: 'Inferior Light Stone' },
        itemCharge: 98,
      }),
      damage: 25,
      now: new Date('2026-06-29T12:00:00'),
    })
    applyHeldItemChargeOnHit({
      state: duskState,
      pokemon: makeBattlePokemon({
        id: 'dark-dusk',
        user: 'player-1',
        heldItem: { id: 'inferior-dark-stone', name: 'Inferior Dark Stone' },
        itemCharge: 98,
      }),
      damage: 25,
      now: new Date('2026-06-29T18:30:00'),
    })
    applyHeldItemChargeOnHit({
      state: nightState,
      pokemon: makeBattlePokemon({
        id: 'dark-night',
        user: 'player-1',
        heldItem: { id: 'inferior-dark-stone', name: 'Inferior Dark Stone' },
        itemCharge: 98,
      }),
      damage: 25,
      now: new Date('2026-06-29T23:00:00'),
    })

    expect(dawnState.heldItemChargeRewards[0].itemId).toBe('dawn-stone')
    expect(dayState.heldItemChargeRewards[0].itemId).toBe('sun-stone')
    expect(duskState.heldItemChargeRewards[0].itemId).toBe('dusk-stone')
    expect(nightState.heldItemChargeRewards[0].itemId).toBe('moon-stone')
  })

  test('held status berry cures matching status immediately after application', () => {
    const pokemon = makeBattlePokemon({
      heldItem: { id: 'cheri-berry', name: 'Cheri Berry' },
    })

    const result = applyStatus(pokemon, 'paralysis')

    expect(result.applied).toBe(true)
    expect(result.message).toContain('Bulbasaur used its Cheri Berry!')
    expect(pokemon.status).toBeUndefined()
    expect(pokemon.heldItem).toBeUndefined()
    expect(pokemon.consumedHeldItems).toEqual([
      { itemId: 'cheri-berry', name: 'Cheri Berry' },
    ])
  })

  test('status application messages include the status name as text', () => {
    const pokemon = makeBattlePokemon()

    const result = applyStatus(pokemon, 'paralysis')

    expect(result.applied).toBe(true)
    expect(result.message).toContain('Bulbasaur was inflicted with Paralysis!')
    expect(result.message).toContain('[icon:status:paralysis]')
  })

  test('forced status application replaces an existing main status', () => {
    const pokemon = makeBattlePokemon({
      status: { id: 'burn', counter: 1 },
    })

    const blocked = applyStatus(pokemon, 'sleep')
    expect(blocked.applied).toBe(false)
    expect(pokemon.status?.id).toBe('burn')

    const forced = applyStatus(pokemon, 'sleep', undefined, { force: true })
    expect(forced.applied).toBe(true)
    expect(pokemon.status?.id).toBe('sleep')
  })

  test('type held item tiers boost matching attack damage and break by tier', () => {
    const originalRandom = Math.random
    Math.random = () => 0.99
    try {
      const defender = makeBattlePokemon({ id: 'defender', types: ['Water'] })
      const baseline = calculateDamage(
        makeBattlePokemon({ types: ['Electric'] }),
        defender,
        'power',
        1,
        'electric',
      )
      const boosted = calculateDamage(
        makeBattlePokemon({
          types: ['Electric'],
          heldItem: { id: 'weak-magnet', name: 'Weak Magnet' },
        }),
        defender,
        'power',
        1,
        'electric',
      )

      expect(boosted.damage).toBeGreaterThan(baseline.damage)

      const nonMatchingAttack = calculateDamage(
        makeBattlePokemon({
          types: ['Electric'],
          heldItem: { id: 'weak-magnet', name: 'Weak Magnet' },
        }),
        defender,
        'power',
        1,
        'normal',
      )
      const nonMatchingBaseline = calculateDamage(
        makeBattlePokemon({ types: ['Electric'] }),
        defender,
        'power',
        1,
        'normal',
      )

      expect(nonMatchingAttack.damage).toBe(nonMatchingBaseline.damage)

      const normalBoosted = calculateDamage(
        makeBattlePokemon({
          types: ['Electric'],
          heldItem: { id: 'magnet', name: 'Magnet' },
        }),
        defender,
        'power',
        1,
        'electric',
      )
      const unstableBoosted = calculateDamage(
        makeBattlePokemon({
          types: ['Electric'],
          heldItem: { id: 'unstable-magnet', name: 'Unstable Magnet' },
        }),
        defender,
        'power',
        1,
        'electric',
      )

      expect(normalBoosted.damage).toBe(boosted.damage)
      expect(unstableBoosted.damage).toBeGreaterThan(normalBoosted.damage)
    } finally {
      Math.random = originalRandom
    }

    const pokemon = makeBattlePokemon({
      heldItem: { id: 'weak-magnet', name: 'Weak Magnet' },
    })
    const result = applyHeldAttackBreak(pokemon, 'electric', () => 0.01)

    expect(result.applied).toBe(true)
    expect(result.message).toContain('Weak Magnet broke')
    expect(pokemon.heldItem).toBeUndefined()
    expect(pokemon.consumedHeldItems).toEqual([
      { itemId: 'weak-magnet', name: 'Weak Magnet' },
    ])

    const normalTier = makeBattlePokemon({
      heldItem: { id: 'magnet', name: 'Magnet' },
    })
    const normalBreak = applyHeldAttackBreak(normalTier, 'electric', () => 0)
    expect(normalBreak.applied).toBe(false)
    expect(normalTier.heldItem).toEqual({ id: 'magnet', name: 'Magnet' })

    const nonMatchingBreak = applyHeldAttackBreak(
      makeBattlePokemon({
        heldItem: { id: 'weak-magnet', name: 'Weak Magnet' },
      }),
      'normal',
      () => 0,
    )
    expect(nonMatchingBreak.applied).toBe(false)

    const highTier = makeBattlePokemon({
      heldItem: { id: 'unstable-magnet', name: 'Unstable Magnet' },
    })
    const highBreak = applyHeldAttackBreak(highTier, 'electric', () => 0.14)
    expect(highBreak.applied).toBe(true)
    expect(highBreak.message).toContain('Unstable Magnet broke')
    expect(highTier.heldItem).toBeUndefined()
  })

  test('training bands lower their matching battle stat by 15%', () => {
    const stats = {
      hp: 120,
      attack: 80,
      defense: 70,
      specialAttack: 80,
      specialDefense: 70,
      speed: 60,
    }

    expect(applyHeldItemStatModifiers(stats, 'speed-band')).toEqual({
      ...stats,
      speed: 51,
    })
    expect(applyHeldItemStatModifiers(stats, 'health-band')).toEqual({
      ...stats,
      hp: 102,
    })
  })

  test('training bands grant one matching EV on battle wins and roll consumption', () => {
    const pokemon = makeBattlePokemon({
      heldItem: { id: 'speed-band', name: 'Speed Band' },
      evs: { speed: 254 },
    })

    const effects = collectHeldItemBattleWinEffects([pokemon], () => 0.01)

    expect(effects).toEqual([
      {
        pokemonId: 'pokemon-1',
        itemId: 'speed-band',
        itemName: 'Speed Band',
        stat: 'speed',
        amount: 1,
        consumed: true,
      },
    ])
    expect(pokemon.heldItem).toBeUndefined()
    expect(pokemon.consumedHeldItems).toEqual([
      { itemId: 'speed-band', name: 'Speed Band' },
    ])
  })

  test('training bands stay held when the battle win consumption roll fails', () => {
    const pokemon = makeBattlePokemon({
      heldItem: { id: 'defense-band', name: 'Defense Band' },
      evs: { defense: 12 },
    })

    const effects = collectHeldItemBattleWinEffects([pokemon], () => 0.5)

    expect(effects).toEqual([
      {
        pokemonId: 'pokemon-1',
        itemId: 'defense-band',
        itemName: 'Defense Band',
        stat: 'defense',
        amount: 1,
        consumed: false,
      },
    ])
    expect(pokemon.heldItem).toEqual({ id: 'defense-band', name: 'Defense Band' })
    expect(pokemon.consumedHeldItems).toBeUndefined()
  })

  test('training bands do not award EVs past the 255 stat cap', () => {
    const pokemon = makeBattlePokemon({
      heldItem: { id: 'attack-band', name: 'Attack Band' },
      evs: { attack: 255 },
    })

    const effects = collectHeldItemBattleWinEffects([pokemon], () => 0)

    expect(effects).toEqual([])
    expect(pokemon.heldItem).toEqual({ id: 'attack-band', name: 'Attack Band' })
    expect(pokemon.consumedHeldItems).toBeUndefined()
  })

  test('consumed held items auto re-equip from spare inventory after battle', () => {
    const result = resolveConsumedHeldItemPersistence(
      [
        {
          pokemonId: 'pokemon-1',
          ownerId: 'player-1',
          itemId: 'oran-berry',
        },
      ],
      {
        'player-1': { 'oran-berry': 2, 'cheri-berry': 1 },
      },
    )

    expect(result.heldItemIdsByPokemon).toEqual({
      'pokemon-1': 'oran-berry',
    })
    expect(result.inventoriesByOwner['player-1']).toEqual({
      'oran-berry': 1,
      'cheri-berry': 1,
    })
  })

  test('consumed held items clear when no spare inventory remains', () => {
    const result = resolveConsumedHeldItemPersistence(
      [
        {
          pokemonId: 'pokemon-1',
          ownerId: 'player-1',
          itemId: 'oran-berry',
        },
      ],
      {
        'player-1': { 'cheri-berry': 1 },
      },
    )

    expect(result.heldItemIdsByPokemon).toEqual({
      'pokemon-1': null,
    })
    expect(result.inventoriesByOwner['player-1']).toEqual({
      'cheri-berry': 1,
    })
  })

  test('force-cleared charged held items do not re-equip from spare inventory', () => {
    const result = resolveConsumedHeldItemPersistence(
      [
        {
          pokemonId: 'pokemon-1',
          ownerId: 'player-1',
          itemId: 'inferior-fire-stone',
          forceClear: true,
        },
      ],
      {
        'player-1': { 'inferior-fire-stone': 2 },
      },
    )

    expect(result.heldItemIdsByPokemon).toEqual({
      'pokemon-1': null,
    })
    expect(result.inventoriesByOwner['player-1']).toEqual({
      'inferior-fire-stone': 2,
    })
  })

  test('battle-only consumed held items do not persist after battle', () => {
    const result = resolveConsumedHeldItemPersistence(
      [
        {
          pokemonId: 'pokemon-1',
          ownerId: 'player-1',
          itemId: 'oran-berry',
        },
        {
          pokemonId: 'pokemon-2',
          ownerId: 'player-1',
          itemId: 'sitrus-berry',
          persistent: false,
        },
      ],
      {
        'player-1': { 'oran-berry': 2, 'sitrus-berry': 2 },
      },
    )

    expect(result.heldItemIdsByPokemon).toEqual({
      'pokemon-1': 'oran-berry',
    })
    expect(result.inventoriesByOwner['player-1']).toEqual({
      'oran-berry': 1,
      'sitrus-berry': 2,
    })
  })
})
