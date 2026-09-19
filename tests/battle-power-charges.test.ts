import { describe, expect, test } from 'bun:test'
import { createInitialPowersState } from '@/data/powers'
import { awardStanceWin, getStanceWinCharges, spendPowerCharge } from '@/utilities/battle/power-charges'
import { getStanceAttackName, getStanceBasePower } from '@/utilities/battle/z-move'
import type { BattlePokemon } from '@/utilities/battle/types'

const pokemon = { name: 'Test Pokémon', types: ['grass'], isDynamaxed: false, zMoveReady: false } as BattlePokemon

describe('battle power charges', () => {
  test('charges are team-wide and spent in groups of three', () => {
    const powers = createInitialPowersState()
    expect(spendPowerCharge(powers)).toBe(false)
    for (let index = 0; index < 4; index++) awardStanceWin(powers)
    expect(getStanceWinCharges(powers)).toBe(4)
    expect(spendPowerCharge(powers)).toBe(true)
    expect(getStanceWinCharges(powers)).toBe(1)
    expect(spendPowerCharge(powers)).toBe(false)
  })

  test('older persisted battles start with zero available wins', () => {
    const powers = createInitialPowersState()
    delete powers.stanceWinCharges
    expect(getStanceWinCharges(powers)).toBe(0)
    awardStanceWin(powers)
    expect(getStanceWinCharges(powers)).toBe(1)
  })

  test('Z has precedence over Dynamax for one stance and naming matches power', () => {
    expect(getStanceBasePower(pokemon)).toBe(50)
    expect(getStanceAttackName('grass', 'speed', pokemon)).toBe('Grass Strike')
    const max = { ...pokemon, isDynamaxed: true }
    expect(getStanceBasePower(max)).toBe(100)
    expect(getStanceAttackName('grass', 'power', max)).toBe('MAX Grass Tackle')
    const maxWithZ = { ...max, zMoveReady: true }
    expect(getStanceBasePower(maxWithZ)).toBe(250)
    expect(getStanceAttackName('grass', 'tech', maxWithZ)).toBe('Grass Gambit Z')
  })
})
