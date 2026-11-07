import type { TcgCardAttack } from '@/data/tcg/types'
import type { TcgBattleAttackEffect } from './tcg-battle'

export function inferPitchBlackTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'lively cutter') {
    return { damage: { kind: 'healedThisTurnBonus', baseDamage, bonusDamage: 200 } }
  }
  if (name === 'furtive drop') {
    return { ...zero(), counterDamage: [{ amount: 10, target: 'target' }] }
  }
  if (name === 'controlled burn') {
    const amount = Number(attack.text.match(/discard the top (\d+) cards?/i)?.[1] || '1')
    return { ...zero(), special: [{ kind: 'millCards', target: 'opponent', amount }] }
  }
  if (name === 'hydro jet') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 30,
        source: { kind: 'energyOfType', side: 'own', type: 'Water' },
      },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'knuckle justice') {
    // Prize-card counts are not tracked; retain its printed base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'collect') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 1 }] }
  }
  if (name === 'quick dive') {
    return { damage: { kind: 'fixed', amount: 50 }, targetScope: 'any', ignoreWeaknessResistanceOnBench: true }
  }
  if (name === 'thunderous fist') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 60,
        source: { kind: 'energyOfType', side: 'own', type: 'Lightning' },
      },
    }
  }
  if (name === 'all-you-can-yeet') {
    return {
      ...zero(),
      choiceRequirement: 'discardHandCards',
      special: [{ kind: 'discardSelectedHandPokemon' }],
    }
  }
  if (name === 'all out') {
    return { damage: { kind: 'emptyHandBonus', baseDamage, bonusDamage: 160 } }
  }
  if (name === 'spreading light') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 3, includeNames: ['Lampent'], destination: 'bench' }],
    }
  }
  if (name === 'phantom maze') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 50,
        source: { kind: 'retreatCost', target: 'target' },
      },
    }
  }
  if (name === 'vengeful anchor') {
    // Ability counts in the discard pile are not available; retain base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'shadowy knot') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 30,
        source: { kind: 'retreatCost', target: 'target' },
      },
    }
  }
  if (name === 'call for family') {
    const maxCount = Number(attack.text.match(/up to (\d+) basic pokemon/i)?.[1] || '1')
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount, basicOnly: true, destination: 'bench' }],
    }
  }
  if (name === 'battle claw') {
    return { damage: { kind: 'evolvedTargetBonus', baseDamage, bonusDamage: 30 } }
  }
  if (name === 'dusk raid') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 110,
        source: { kind: 'injuredPokemon', side: 'own', zone: 'bench' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'abyss eye') {
    return { ...zero(), special: [{ kind: 'knockOutTarget', requiresAnyTargetStatus: true }] }
  }
  if (name === 'bone sniper') {
    // Special Energy cards are absent, so there are no legal targets for this attack.
    return { damage: { kind: 'fixed', amount: 0 }, targetScope: 'any' }
  }
  if (name === 'procurement') {
    // Item cards are not part of the Pokémon-only deck.
    return { damage: { kind: 'fixed', amount: 0 } }
  }
  if (name === 'wheely draw') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 6, shuffleHandIntoDeck: true }] }
  }
  if (name === 'shadowy whip') {
    // Shadowy Darkness Energy is not represented; retain base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'whirling envy') {
    return { damage: { kind: 'damageCounterThresholdBonus', baseDamage, bonusDamage: 90, minimumCounters: 2 } }
  }
  if (name === 'steel cutter') {
    // The player's Pokémon-only hand cannot contain Basic Metal Energy cards.
    return { damage: { kind: 'fixed', amount: 0 } }
  }
  if (name === 'mirror attack') {
    return { damage: { kind: 'targetTypeBonus', baseDamage, bonusDamage: 30, targetType: 'Metal' } }
  }
  if (name === 'maximum drilling') {
    const minimumEnergy = (attack.convertedEnergyCost || 0) + 2
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 130,
        source: { kind: 'energy', side: 'own' },
        minimumUnits: minimumEnergy,
      },
    }
  }
  if (name === 'feather rondo') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'bench', side: 'both' },
      },
    }
  }
  if (name === 'challenging delivery') {
    return {
      ...zero(),
      coinFlipCount: 2,
      choiceRequirement: 'deckPokemon',
      special: [{
        kind: 'searchDeckPokemon',
        maxCount: 1,
        destination: 'bench',
        condition: { result: 'heads', minimum: 2, exactly: 2 },
      }],
    }
  }
  if (name === 'fruity aroma') {
    // The engine does not offer selection from a fixed top-deck reveal.
    return null
  }
  if (name === 'bug out') {
    // Bottom-deck reveal/discard order is not tracked.
    return null
  }
  if (name === 'trick portal') {
    // Fixed top-deck reveal and placement order are not tracked.
    return null
  }

  return null
}
