import { describe, expect, test } from 'bun:test'
import { items } from '@/data/items'
import { getAllMoves } from '@/data/moves'
import {
  getAssignedMoveOptions,
  getAvailableMoveOptions,
  getBattleMoveOptions,
  normalizeAssignedMoveIds,
  validateAssignedMoveIds,
} from '@/utilities/pokemon/pokemon-moves'
import type { BattlePokemon } from '@/utilities/battle/types'

function makeBattlePokemon(overrides: Partial<BattlePokemon> = {}): BattlePokemon {
  return {
    id: 'pokemon-1',
    user: 'user-1',
    originalTrainer: 'user-1',
    speciesId: 4,
    formId: '4',
    level: 30,
    name: 'Charmander',
    types: ['Fire'],
    stats: {
      hp: 100,
      attack: 60,
      defense: 60,
      specialAttack: 60,
      specialDefense: 60,
      speed: 60,
    },
    currentHp: 100,
    maxHp: 100,
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  }
}

describe('pokemon move assignment helpers', () => {
  test('normalizes Payload move rows and removes duplicates', () => {
    expect(
      normalizeAssignedMoveIds([
        { moveId: 'headbutt' },
        { moveId: 'headbutt' },
        { moveId: 'secret-power' },
        { moveId: null },
      ]),
    ).toEqual(['headbutt', 'secret-power'])
  })

  test('validates two eligible assigned moves from owned TMs', () => {
    const result = validateAssignedMoveIds({
      moveIds: ['headbutt', 'sing'],
      pokemonTypes: ['normal'],
      pokemonFormId: '39',
      pokemonLevel: 26,
      inventory: {
        'tm-headbutt': 1,
        'tm-sing': 1,
      },
    })

    expect(result.success).toBe(true)
  })

  test('rejects Trainer-cap over-assignment and missing TMs', () => {
    expect(
      validateAssignedMoveIds({
        moveIds: ['headbutt', 'hidden-power', 'mega-punch'],
        pokemonTypes: ['normal'],
        pokemonFormId: '16',
        pokemonLevel: 20,
        inventory: {
          'tm-headbutt': 1,
          'tm-hidden-power': 1,
          'tm-mega-punch': 1,
        },
        maxAssignedMoves: 2,
      }).success,
    ).toBe(false)

    expect(
      validateAssignedMoveIds({
        moveIds: ['dig'],
        pokemonTypes: ['ground'],
        pokemonFormId: '50',
        pokemonLevel: 22,
        inventory: {
          'tm-headbutt': 1,
        },
      }).success,
    ).toBe(false)

    expect(
      validateAssignedMoveIds({
        moveIds: ['dig'],
        pokemonTypes: ['ground'],
        pokemonFormId: '50',
        pokemonLevel: 22,
        inventory: {
          'tm-dig': 1,
        },
      }).success,
    ).toBe(true)
  })

  test('battle move options are limited to assigned moves', () => {
    const allAvailable = getAvailableMoveOptions({
      pokemonTypes: ['normal'],
      pokemonFormId: '39',
      pokemonLevel: 26,
      inventory: {
        'tm-headbutt': 1,
        'tm-sing': 1,
      },
    })
    const assigned = getAssignedMoveOptions({
      assignedMoves: [{ moveId: 'sing' }, { moveId: 'headbutt' }],
      pokemonTypes: ['normal'],
      pokemonFormId: '39',
      pokemonLevel: 26,
      inventory: {
        'tm-headbutt': 1,
        'tm-sing': 1,
      },
    })
    const cappedAssigned = getAssignedMoveOptions({
      assignedMoves: [{ moveId: 'sing' }, { moveId: 'headbutt' }],
      pokemonTypes: ['normal'],
      pokemonFormId: '39',
      pokemonLevel: 26,
      inventory: {
        'tm-headbutt': 1,
        'tm-sing': 1,
      },
      maxAssignedMoves: 1,
    })

    expect(allAvailable.map((move) => move.id)).toContain('headbutt')
    expect(assigned.map((move) => move.id)).toEqual(['sing', 'headbutt'])
    expect(cappedAssigned.map((move) => move.id)).toEqual(['sing'])
  })

  test('battle move options fill unusable assigned slots from owned TMs at capped level', () => {
    const charmander = makeBattlePokemon({
      assignedMoves: [{ moveId: 'mega-punch' }],
    })
    const opponent = makeBattlePokemon({
      id: 'opponent',
      speciesId: 1,
      formId: '1',
      name: 'Bulbasaur',
      types: ['Grass'],
    })

    const moves = getBattleMoveOptions({
      assignedMoves: charmander.assignedMoves,
      pokemonTypes: charmander.types,
      pokemonFormId: charmander.formId,
      pokemonLevel: charmander.level,
      inventory: {
        'tm-mega-punch': 1,
        'tm-ember': 1,
      },
      maxAssignedMoves: 1,
      pokemon: charmander,
      opponents: [opponent],
      profile: 'trainer',
    })

    expect(moves.map((move) => move.id)).toEqual(['ember'])
  })

  test('Farfetch’d can use Leek Spin from its TM at level 10', () => {
    const available = getAvailableMoveOptions({
      pokemonTypes: ['normal', 'flying'],
      pokemonFormId: '83',
      pokemonLevel: 10,
      inventory: {
        'tm-leek-spin': 1,
      },
    })
    const unavailable = getAvailableMoveOptions({
      pokemonTypes: ['normal', 'flying'],
      pokemonFormId: '83',
      pokemonLevel: 1,
      inventory: {},
    })

    const leekSpin = available.find((move) => move.id === 'leek-spin')
    expect(leekSpin).toMatchObject({
      name: 'Leek Spin',
      forcedType: 'normal',
      accuracy: 100,
      damage: 0,
    })
    expect(unavailable.map((move) => move.id)).not.toContain('leek-spin')
  })

  test('Aerial Ace is restricted to its authored form IDs', () => {
    const flyingAvailable = getAvailableMoveOptions({
      pokemonTypes: ['normal', 'flying'],
      pokemonFormId: '18',
      pokemonLevel: 22,
      inventory: {
        'tm-aerial-ace': 1,
      },
    })
    const normalAvailable = getAvailableMoveOptions({
      pokemonTypes: ['normal'],
      pokemonFormId: '19',
      pokemonLevel: 22,
      inventory: {
        'tm-aerial-ace': 1,
      },
    })
    const missingTm = getAvailableMoveOptions({
      pokemonTypes: ['normal', 'flying'],
      pokemonFormId: '18',
      pokemonLevel: 22,
      inventory: {},
    })

    expect(flyingAvailable.map((move) => move.id)).toContain('aerial-ace')
    expect(normalAvailable.map((move) => move.id)).not.toContain('aerial-ace')
    expect(missingTm.map((move) => move.id)).not.toContain('aerial-ace')
  })

  test('Rock Slide is available from TM ownership for specific forms', () => {
    const rhydonAvailable = getAvailableMoveOptions({
      pokemonTypes: ['rock', 'ground'],
      pokemonFormId: '112',
      pokemonLevel: 28,
      inventory: {
        'tm-rock-slide': 1,
      },
    })
    const normalAvailable = getAvailableMoveOptions({
      pokemonTypes: ['normal'],
      pokemonFormId: '19',
      pokemonLevel: 20,
      inventory: {
        'tm-rock-slide': 1,
      },
    })
    const missingTm = getAvailableMoveOptions({
      pokemonTypes: ['rock', 'ground'],
      pokemonFormId: '112',
      pokemonLevel: 22,
      inventory: {},
    })

    expect(rhydonAvailable.map((move) => move.id)).toContain('rock-slide')
    expect(normalAvailable.map((move) => move.id)).not.toContain(
      'rock-slide',
    )
    expect(missingTm.map((move) => move.id)).not.toContain('rock-slide')
  })

  test('Rock Shield is restricted to its authored form IDs', () => {
    const geodudeAvailable = getAvailableMoveOptions({
      pokemonTypes: ['rock', 'ground'],
      pokemonFormId: '74',
      pokemonLevel: 20,
      inventory: {
        'tm-rock-shield': 1,
      },
    })
    const rattataAvailable = getAvailableMoveOptions({
      pokemonTypes: ['normal'],
      pokemonFormId: '19',
      pokemonLevel: 20,
      inventory: {
        'tm-rock-shield': 1,
      },
    })

    expect(geodudeAvailable.map((move) => move.id)).toContain(
      'rock-shield',
    )
    expect(rattataAvailable.map((move) => move.id)).not.toContain(
      'rock-shield',
    )
  })

  test('Wave Breaker is restricted to Onix', () => {
    const onixAvailable = getAvailableMoveOptions({
      pokemonTypes: ['rock', 'ground'],
      pokemonFormId: '95',
      pokemonLevel: 25,
      inventory: {
        'tm-wave-breaker': 1,
      },
    })
    const rattataAvailable = getAvailableMoveOptions({
      pokemonTypes: ['normal'],
      pokemonFormId: '19',
      pokemonLevel: 20,
      inventory: {
        'tm-wave-breaker': 1,
      },
    })

    expect(onixAvailable.map((move) => move.id)).toContain('wave-breaker')
    expect(rattataAvailable.map((move) => move.id)).not.toContain(
      'wave-breaker',
    )
  })

  test('Harden is restricted to Caterpie line forms', () => {
    const metapodAvailable = getAvailableMoveOptions({
      pokemonTypes: ['bug'],
      pokemonFormId: '11',
      pokemonLevel: 20,
      inventory: {
        'tm-harden': 1,
      },
    })
    const kakunaAvailable = getAvailableMoveOptions({
      pokemonTypes: ['bug'],
      pokemonFormId: '14',
      pokemonLevel: 20,
      inventory: {
        'tm-harden': 1,
      },
    })
    const rattataAvailable = getAvailableMoveOptions({
      pokemonTypes: ['normal'],
      pokemonFormId: '19',
      pokemonLevel: 20,
      inventory: {
        'tm-harden': 1,
      },
    })

    expect(metapodAvailable.map((move) => move.id)).toContain('harden')
    expect(kakunaAvailable.map((move) => move.id)).toContain('harden')
    expect(rattataAvailable.map((move) => move.id)).not.toContain('harden')
  })

  test('Bubble Guard is restricted to its authored form IDs', () => {
    const squirtleAvailable = getAvailableMoveOptions({
      pokemonTypes: ['water'],
      pokemonFormId: '7',
      pokemonLevel: 35,
      inventory: {
        'tm-bubble-guard': 1,
      },
    })
    const horseaAvailable = getAvailableMoveOptions({
      pokemonTypes: ['water'],
      pokemonFormId: '116',
      pokemonLevel: 35,
      inventory: {
        'tm-bubble-guard': 1,
      },
    })
    const rattataAvailable = getAvailableMoveOptions({
      pokemonTypes: ['normal'],
      pokemonFormId: '19',
      pokemonLevel: 5,
      inventory: {
        'tm-bubble-guard': 1,
      },
    })

    expect(squirtleAvailable.map((move) => move.id)).toContain(
      'bubble-guard',
    )
    expect(horseaAvailable.map((move) => move.id)).toContain(
      'bubble-guard',
    )
    expect(rattataAvailable.map((move) => move.id)).not.toContain(
      'bubble-guard',
    )
  })

  test('Water moves include newly authored form IDs', () => {
    const waterGunShellder = getAvailableMoveOptions({
      pokemonTypes: ['water'],
      pokemonFormId: '90',
      pokemonLevel: 20,
      inventory: {
        'tm-water-gun': 1,
      },
    })
    const waterGunHorsea = getAvailableMoveOptions({
      pokemonTypes: ['water'],
      pokemonFormId: '116',
      pokemonLevel: 20,
      inventory: {
        'tm-water-gun': 1,
      },
    })
    const bubbleHorsea = getAvailableMoveOptions({
      pokemonTypes: ['water'],
      pokemonFormId: '116',
      pokemonLevel: 20,
      inventory: {
        'tm-bubble': 1,
      },
    })
    const aquaBlitzKrabby = getAvailableMoveOptions({
      pokemonTypes: ['water'],
      pokemonFormId: '98',
      pokemonLevel: 20,
      inventory: {
        'tm-whirlpool': 1,
      },
    })
    const aquaBlitzTentacool = getAvailableMoveOptions({
      pokemonTypes: ['water'],
      pokemonFormId: '72',
      pokemonLevel: 20,
      inventory: {
        'tm-whirlpool': 1,
      },
    })
    const aquaBlitzSeel = getAvailableMoveOptions({
      pokemonTypes: ['water'],
      pokemonFormId: '86',
      pokemonLevel: 20,
      inventory: {
        'tm-whirlpool': 1,
      },
    })
    const randomUnavailable = getAvailableMoveOptions({
      pokemonTypes: ['normal'],
      pokemonFormId: '19',
      pokemonLevel: 20,
      inventory: {
        'tm-whirlpool': 1,
      },
    })

    expect(waterGunShellder.map((move) => move.id)).toContain('water-gun')
    expect(waterGunHorsea.map((move) => move.id)).toContain('water-gun')
    expect(bubbleHorsea.map((move) => move.id)).toContain('bubble')
    expect(aquaBlitzKrabby.map((move) => move.id)).toContain('whirlpool')
    expect(aquaBlitzTentacool.map((move) => move.id)).toContain(
      'whirlpool',
    )
    expect(aquaBlitzSeel.map((move) => move.id)).toContain('whirlpool')
    expect(randomUnavailable.map((move) => move.id)).not.toContain('whirlpool')
  })

  test('Fire moves include newly authored form IDs', () => {
    const vulpixAvailable = getAvailableMoveOptions({
      pokemonTypes: ['fire'],
      pokemonFormId: '37',
      pokemonLevel: 20,
      inventory: {
        'tm-ember': 1,
      },
    })
    const flareonAvailable = getAvailableMoveOptions({
      pokemonTypes: ['fire'],
      pokemonFormId: '136',
      pokemonLevel: 20,
      inventory: {
        'tm-ember': 1,
      },
    })
    const growlitheAvailable = getAvailableMoveOptions({
      pokemonTypes: ['fire'],
      pokemonFormId: '58',
      pokemonLevel: 20,
      inventory: {
        'tm-flame-charge': 1,
      },
    })
    const ponytaAvailable = getAvailableMoveOptions({
      pokemonTypes: ['fire'],
      pokemonFormId: '77',
      pokemonLevel: 20,
      inventory: {
        'tm-fire-spin': 1,
      },
    })
    const vaporeonAvailable = getAvailableMoveOptions({
      pokemonTypes: ['water'],
      pokemonFormId: '134',
      pokemonLevel: 20,
      inventory: {
        'tm-water-gun': 1,
      },
    })
    const vaporeonPressurePumpAvailable = getAvailableMoveOptions({
      pokemonTypes: ['water'],
      pokemonFormId: '134',
      pokemonLevel: 20,
      inventory: {
        'tm-bubble': 1,
      },
    })
    const vaporeonAquaBlitzAvailable = getAvailableMoveOptions({
      pokemonTypes: ['water'],
      pokemonFormId: '134',
      pokemonLevel: 20,
      inventory: {
        'tm-whirlpool': 1,
      },
    })

    expect(vulpixAvailable.map((move) => move.id)).toContain('ember')
    expect(flareonAvailable.map((move) => move.id)).toContain('ember')
    expect(growlitheAvailable.map((move) => move.id)).toContain(
      'flame-charge',
    )
    expect(ponytaAvailable.map((move) => move.id)).toContain('fire-spin')
    expect(vaporeonAvailable.map((move) => move.id)).toContain('water-gun')
    expect(vaporeonPressurePumpAvailable.map((move) => move.id)).toContain(
      'bubble',
    )
    expect(vaporeonAquaBlitzAvailable.map((move) => move.id)).toContain(
      'whirlpool',
    )
  })

  test('Grass moves include newly authored form IDs', () => {
    const tangelaAvailable = getAvailableMoveOptions({
      pokemonTypes: ['grass'],
      pokemonFormId: '114',
      pokemonLevel: 20,
      inventory: {
        'tm-vine-whip': 1,
      },
    })
    const bellsproutAvailable = getAvailableMoveOptions({
      pokemonTypes: ['grass', 'poison'],
      pokemonFormId: '69',
      pokemonLevel: 20,
      inventory: {
        'tm-vine-whip': 1,
      },
    })
    const oddishAvailable = getAvailableMoveOptions({
      pokemonTypes: ['grass', 'poison'],
      pokemonFormId: '43',
      pokemonLevel: 20,
      inventory: {
        'tm-leafage': 1,
      },
    })
    const gloomAvailable = getAvailableMoveOptions({
      pokemonTypes: ['grass', 'poison'],
      pokemonFormId: '44',
      pokemonLevel: 20,
      inventory: {
        'tm-leafage': 1,
      },
    })
    const exeggcuteAvailable = getAvailableMoveOptions({
      pokemonTypes: ['grass', 'psychic'],
      pokemonFormId: '102',
      pokemonLevel: 20,
      inventory: {
        'tm-absorb': 1,
      },
    })

    expect(tangelaAvailable.map((move) => move.id)).toContain('vine-whip')
    expect(bellsproutAvailable.map((move) => move.id)).toContain(
      'vine-whip',
    )
    expect(oddishAvailable.map((move) => move.id)).toContain('leafage')
    expect(gloomAvailable.map((move) => move.id)).toContain('leafage')
    expect(exeggcuteAvailable.map((move) => move.id)).toContain('absorb')
  })

  test('Poison Sting is restricted to its authored form IDs', () => {
    const ekansAvailable = getAvailableMoveOptions({
      pokemonTypes: ['poison'],
      pokemonFormId: '23',
      pokemonLevel: 20,
      inventory: {
        'tm-poison-sting': 1,
      },
    })
    const weedleAvailable = getAvailableMoveOptions({
      pokemonTypes: ['bug', 'poison'],
      pokemonFormId: '13',
      pokemonLevel: 20,
      inventory: {
        'tm-poison-sting': 1,
      },
    })
    const rattataAvailable = getAvailableMoveOptions({
      pokemonTypes: ['normal'],
      pokemonFormId: '19',
      pokemonLevel: 20,
      inventory: {
        'tm-poison-sting': 1,
      },
    })

    expect(ekansAvailable.map((move) => move.id)).toContain(
      'poison-sting',
    )
    expect(weedleAvailable.map((move) => move.id)).toContain(
      'poison-sting',
    )
    expect(rattataAvailable.map((move) => move.id)).not.toContain(
      'poison-sting',
    )
  })

  test('Mega Punch is restricted to its authored form IDs', () => {
    const blastoiseAvailable = getAvailableMoveOptions({
      pokemonTypes: ['water'],
      pokemonFormId: '9',
      pokemonLevel: 36,
      inventory: {
        'tm-mega-punch': 1,
      },
    })
    const electabuzzAvailable = getAvailableMoveOptions({
      pokemonTypes: ['electric'],
      pokemonFormId: '125',
      pokemonLevel: 36,
      inventory: {
        'tm-mega-punch': 1,
      },
    })
    const rattataAvailable = getAvailableMoveOptions({
      pokemonTypes: ['normal'],
      pokemonFormId: '19',
      pokemonLevel: 20,
      inventory: {
        'tm-mega-punch': 1,
      },
    })

    expect(blastoiseAvailable.map((move) => move.id)).toContain(
      'mega-punch',
    )
    expect(electabuzzAvailable.map((move) => move.id)).toContain(
      'mega-punch',
    )
    expect(rattataAvailable.map((move) => move.id)).not.toContain(
      'mega-punch',
    )
  })

  test('Dig is restricted to its authored form IDs', () => {
    const diglettAvailable = getAvailableMoveOptions({
      pokemonTypes: ['ground'],
      pokemonFormId: '50',
      pokemonLevel: 22,
      inventory: {
        'tm-dig': 1,
      },
    })
    const onixAvailable = getAvailableMoveOptions({
      pokemonTypes: ['rock', 'ground'],
      pokemonFormId: '95',
      pokemonLevel: 22,
      inventory: {
        'tm-dig': 1,
      },
    })
    const mewtwoAvailable = getAvailableMoveOptions({
      pokemonTypes: ['psychic'],
      pokemonFormId: '150',
      pokemonLevel: 20,
      inventory: {
        'tm-dig': 1,
      },
    })

    expect(diglettAvailable.map((move) => move.id)).toContain('dig')
    expect(onixAvailable.map((move) => move.id)).toContain('dig')
    expect(mewtwoAvailable.map((move) => move.id)).not.toContain('dig')
  })

  test('Cut is restricted to its authored form IDs', () => {
    const charizardAvailable = getAvailableMoveOptions({
      pokemonTypes: ['fire', 'flying'],
      pokemonFormId: '6',
      pokemonLevel: 36,
      inventory: {
        'tm-cut': 1,
      },
    })
    const farfetchdAvailable = getAvailableMoveOptions({
      pokemonTypes: ['normal', 'flying'],
      pokemonFormId: '83',
      pokemonLevel: 20,
      inventory: {
        'tm-cut': 1,
      },
    })
    const mewtwoAvailable = getAvailableMoveOptions({
      pokemonTypes: ['psychic'],
      pokemonFormId: '150',
      pokemonLevel: 20,
      inventory: {
        'tm-cut': 1,
      },
    })

    expect(charizardAvailable.map((move) => move.id)).toContain('cut')
    expect(farfetchdAvailable.map((move) => move.id)).toContain('cut')
    expect(mewtwoAvailable.map((move) => move.id)).not.toContain('cut')
  })

  test('Flash is restricted to its authored form IDs', () => {
    const pikachuAvailable = getAvailableMoveOptions({
      pokemonTypes: ['electric'],
      pokemonFormId: '25',
      pokemonLevel: 20,
      inventory: {
        'tm-flash': 1,
      },
    })
    const starmieAvailable = getAvailableMoveOptions({
      pokemonTypes: ['water', 'psychic'],
      pokemonFormId: '121',
      pokemonLevel: 20,
      inventory: {
        'tm-flash': 1,
      },
    })
    const rattataAvailable = getAvailableMoveOptions({
      pokemonTypes: ['normal'],
      pokemonFormId: '19',
      pokemonLevel: 20,
      inventory: {
        'tm-flash': 1,
      },
    })

    expect(pikachuAvailable.map((move) => move.id)).toContain('flash')
    expect(starmieAvailable.map((move) => move.id)).toContain('flash')
    expect(rattataAvailable.map((move) => move.id)).not.toContain('flash')
  })

  test('Fly Surf and Strength are restricted to their authored form IDs', () => {
    const charizardAvailable = getAvailableMoveOptions({
      pokemonTypes: ['fire', 'flying'],
      pokemonFormId: '6',
      pokemonLevel: 36,
      inventory: {
        'tm-fly': 1,
      },
    })
    const blastoiseAvailable = getAvailableMoveOptions({
      pokemonTypes: ['water'],
      pokemonFormId: '9',
      pokemonLevel: 40,
      inventory: {
        'tm-surf': 1,
        'tm-strength': 1,
      },
    })
    const gyaradosAvailable = getAvailableMoveOptions({
      pokemonTypes: ['water', 'flying'],
      pokemonFormId: '130',
      pokemonLevel: 40,
      inventory: {
        'tm-surf': 1,
      },
    })
    const unownAvailable = getAvailableMoveOptions({
      pokemonTypes: ['psychic'],
      pokemonFormId: '201',
      pokemonLevel: 40,
      inventory: {
        'tm-fly': 1,
        'tm-surf': 1,
        'tm-strength': 1,
      },
    })

    expect(charizardAvailable.map((move) => move.id)).toContain('fly')
    expect(blastoiseAvailable.map((move) => move.id)).toContain('surf')
    expect(blastoiseAvailable.map((move) => move.id)).toContain('strength')
    expect(gyaradosAvailable.map((move) => move.id)).toContain('surf')
    expect(unownAvailable.map((move) => move.id)).not.toContain('fly')
    expect(unownAvailable.map((move) => move.id)).not.toContain('surf')
    expect(unownAvailable.map((move) => move.id)).not.toContain(
      'strength',
    )
  })

  test('authored TM and HM move configs omit Pokemon type eligibility', () => {
    const tmMoveIds = new Set(
      items.flatMap((item) =>
        item.moveId && (item.category === 'tm' || item.id.startsWith('tm-'))
          ? [item.moveId]
          : [],
      ),
    )
    const tmMoves = getAllMoves().filter((move) => tmMoveIds.has(move.id))

    expect(tmMoves.length).toBeGreaterThan(0)
    for (const move of tmMoves) {
      expect('type' in move).toBe(false)
    }
  })
})
