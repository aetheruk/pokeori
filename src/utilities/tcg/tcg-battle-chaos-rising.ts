import type { TcgCardAttack } from '@/data/tcg/types'
import type { TcgBattleAttackEffect } from './tcg-battle'

export function inferChaosRisingTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'rumbling bees') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 110,
        source: { kind: 'namedPokemon', side: 'own', zone: 'play', names: ['Beedrill', 'Beedrill ex'] },
      },
    }
  }
  if (name === 'chomp whole') {
    return { damage: { kind: 'retreatCostZeroBonus', baseDamage, bonusDamage: 80 } }
  }
  if (name === 'nine-tailed transfer') {
    return {
      ...zero(),
      choiceRequirement: 'damageCounterTransfer',
      special: [{ kind: 'transferDamageCounters', maxCounters: Number.MAX_SAFE_INTEGER, sourceZone: 'bench' }],
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
  if (name === 'energized storm') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 30,
        source: { kind: 'energy', side: 'both' },
      },
    }
  }
  if (name === 'fiery big bang') {
    return {
      damage: {
        kind: 'subtractCount',
        baseDamage: 290,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
      },
    }
  }
  if (name === 'pleasing present') {
    // Neither side's Pokémon-only hand can hold Basic Energy cards.
    return { damage: { kind: 'fixed', amount: 0 } }
  }
  if (name === 'collect') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 1 }] }
  }
  if (name === 'summoning jutsu') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 3, destination: 'hand' }],
    }
  }
  if (name === 'ninja spinner') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 80 },
      choiceRequirement: 'optionalBonus',
      energyDiscard: [{ target: 'self', amount: 1, optional: true, requiresEnergyType: 'Water' }],
    }
  }
  if (name === 'iceberg breaker') {
    return {
      ...zero(),
      special: [{ kind: 'millCards', target: 'self', amount: 6 }],
    }
  }
  if (name === 'minor errand-running') {
    // Basic Energy is not part of the modeled deck or hand.
    return { damage: { kind: 'fixed', amount: 0 } }
  }
  if (name === 'genome charge') {
    // Basic Psychic Energy searched from the deck becomes shared Energy.
    return { ...zero(), energyGain: [{ target: 'self', amount: 2, requiresEnergyType: 'Psychic' }] }
  }
  if (name === 'psychic') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'energyOnTarget' },
      },
    }
  }
  if (name === 'gentle light') {
    return { ...zero(), healing: [{ amount: 30, side: 'both', zone: 'play' }] }
  }
  if (name === 'buddy attack') {
    // The Emma Supporter is not represented; retain printed base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'overwhelming pain') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 10,
        source: { kind: 'damageCountersOnSide', side: 'opponent', zone: 'play' },
      },
    }
  }
  if (name === 'geo storm') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 30,
        source: { kind: 'energyOfType', side: 'own', type: 'Psychic' },
      },
    }
  }
  if (name === 'continuous spin') {
    return { damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 0 }, flipUntilTails: true }
  }
  if (name === 'gale slash') {
    return { damage: { kind: 'attackerFullHpBonus', baseDamage, bonusDamage: 150 } }
  }
  if (name === 'venoshock') {
    return { damage: { kind: 'statusBonus', baseDamage, bonusDamage: 50, statuses: ['poisoned'] } }
  }
  if (name === 'strong bite') {
    // Pokémon Tools are not represented, so retain printed base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'metallic hammer') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 150 },
      choiceRequirement: 'optionalBonus',
      minimumExtraEnergyDiscard: 3,
      energyDiscard: [{ target: 'self', amount: 3, requiresEnergyType: 'Metal', optional: true }],
    }
  }
  if (name === 'special whip') {
    // Special Energy cards are not represented; retain printed base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'corrosive liquid') {
    // Pokémon Tools and Special Energy are not present to discard.
    return { damage: { kind: 'fixed', amount: 0 } }
  }
  if (name === 'target together') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 50, coinFlipCount: 0 },
      coinFlipSource: { kind: 'namedPokemonContains', side: 'own', zone: 'play', values: ['Tauros'] },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'snap inspection') {
    return {
      ...zero(),
      coinFlipCount: 3,
      special: [{
        kind: 'shuffleRandomHandCardIntoDeck',
        target: 'opponent',
        amountPerHead: 1,
        condition: { result: 'heads', minimum: 1 },
        revealSelected: true,
      }],
    }
  }
  if (name === 'energized slap') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 40,
        source: { kind: 'energy', side: 'own' },
      },
    }
  }

  return null
}
