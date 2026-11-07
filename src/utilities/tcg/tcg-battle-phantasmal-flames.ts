import type { TcgCardAttack } from '@/data/tcg/types'
import type { TcgBattleAttackEffect } from './tcg-battle'

export function inferPhantasmalFlamesTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'lively flower') {
    return { damage: { kind: 'healedThisTurnBonus', baseDamage, bonusDamage: 120 } }
  }
  if (name === 'juggernaut horn') {
    return { damage: { kind: 'lastIncomingDamageBonus', baseDamage } }
  }
  if (name === "bug's cannon") {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 20,
        source: { kind: 'energyOfType', side: 'own', type: 'Grass' },
      },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'inferno x') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 90,
        source: { kind: 'chosenEnergy' },
      },
      energyDiscard: [{ target: 'self', amount: 'choice', requiresEnergyType: 'Fire' }],
      choiceRequirement: 'energyAmount',
      choiceEnergyType: 'Fire',
    }
  }
  if (name === 'fighting wings') {
    return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 90 } }
  }
  if (name === 'blaze ball') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: baseDamage === 10 ? 20 : 40,
        source: { kind: 'energyOfType', side: 'own', type: 'Fire' },
      },
    }
  }
  if (name === 'wreck') {
    // Stadium cards are not represented; retain printed base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'crystal fall') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 90,
        source: { kind: 'energyOfType', side: 'own', type: 'Water' },
        minimumUnits: 4,
      },
    }
  }
  if (name === 'finishing blow') {
    return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 90 } }
  }
  if (name === 'swelling light') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 2, requiresEnergyType: 'Psychic' }] }
  }
  if (name === 'soothing melody') {
    return {
      ...zero(),
      choiceRequirement: 'ownBench',
      healing: [{ target: 'selectedOwnBench', amount: 120, sameTypeAsAttacker: true }],
    }
  }
  if (name === 'garland ray') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 120,
        source: { kind: 'chosenEnergy' },
        maxUnits: 2,
      },
      energyDiscard: [{ target: 'self', amount: 'choice' }],
      choiceRequirement: 'energyAmount',
      choiceEnergyMax: 2,
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
  if (name === 'limit break') {
    // Prize-card counts are not represented; retain printed base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'sneaky placement') {
    return {
      ...zero(),
      targetScope: 'any',
      counterDamage: [{ amount: 10, target: 'target' }],
    }
  }
  if (name === 'raging charge') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 40,
        source: { kind: 'injuredPokemonNameContains', side: 'own', nameContains: 'Tauros', zone: 'play' },
      },
    }
  }
  if (name === 'cocky claw') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 70,
        source: {
          kind: 'pokemonOfTypesWithSubtypesInPlay',
          side: 'own',
          types: ['Darkness'],
          subtypes: ['Stage 2'],
          zone: 'bench',
        },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'hungry jaws') {
    return { damage: { kind: 'attackerDamagedBonus', baseDamage, bonusDamage: 150 } }
  }
  if (name === 'allure') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 2 }] }
  }
  if (name === 'vengeful fang') {
    return { damage: { kind: 'lastTurnKnockoutBonus', baseDamage, bonusDamage: 160 } }
  }
  if (name === 'iron defense') {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAll', condition: 'heads' }],
    }
  }
  if (name === 'triple draw') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 3 }] }
  }
  if (name === 'tool drop') {
    // Pokémon Tools are not in the battle deck, so the attack has no base damage.
    return { damage: { kind: 'fixed', amount: 0 } }
  }
  if (name === 'find a friend') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, destination: 'hand' }],
    }
  }
  if (name === 'energizing sketch') {
    // Energy recovered from the discard is represented in the shared pool and
    // only attaches while the player has a Benched Pokémon.
    return {
      ...zero(),
      coinFlipCount: 3,
      energyGain: [{ target: 'self', amountPerHead: 1, requiresOwnBench: true }],
    }
  }
  if (name === 'ball roll') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'run around') {
    return {
      ...zero(),
      choiceRequirement: 'ownBench',
      special: [{ kind: 'switch', target: 'self' }],
    }
  }
  if (name === 'gale thrust') {
    // The engine does not retain same-turn Bench-to-Active movement history.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }

  return null
}
