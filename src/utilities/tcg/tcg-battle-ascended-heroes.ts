import type { TcgCardAttack } from '@/data/tcg/types'
import type { TcgBattleAttackEffect } from './tcg-battle'

export function inferAscendedHeroesTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'flower garden rondo') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 40,
        source: { kind: 'namedPokemonContains', side: 'own', zone: 'play', values: ["Erika's"] },
      },
    }
  }
  if (name === 'giant bouquet') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 50,
        source: { kind: 'energyOfType', side: 'own', type: 'Grass' },
      },
    }
  }
  if (name === 'energy straw') {
    // Energy cards are not in the Pokémon-only deck or hand.
    return { damage: { kind: 'fixed', amount: 0 } }
  }
  if (name === 'trading places') {
    return { ...zero(), choiceRequirement: 'ownBench', special: [{ kind: 'switch', target: 'self' }] }
  }
  if (name === 'rocket rush') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 30,
        source: { kind: 'namedPokemonContains', side: 'own', zone: 'play', values: ["Team Rocket's"] },
      },
    }
  }
  if (name === 'lava burst') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 70, source: { kind: 'chosenEnergy' }, maxUnits: 5 },
      energyDiscard: [{ target: 'self', amount: 'choice', requiresEnergyType: 'Fire' }],
      choiceRequirement: 'energyAmount',
      choiceEnergyMax: 5,
      choiceEnergyType: 'Fire',
    }
  }
  if (name === 'flare fall') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 90,
        source: { kind: 'energyOfType', side: 'own', type: 'Fire' },
        minimumUnits: 4,
      },
    }
  }
  if (name === 'back draft') {
    // The opponent's discard pile only contains Pokémon in this battle mode.
    return { damage: { kind: 'fixed', amount: 0 } }
  }
  if (name === 'garnet volley') {
    return { damage: { kind: 'fixed', amount: 180 }, targetScope: 'any', ignoreWeaknessResistanceOnBench: true }
  }
  if (name === 'hydro pump') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'energyOfType', side: 'own', type: 'Water' },
      },
    }
  }
  if (name === 'mortal crunch') {
    return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 200 } }
  }
  if (name === 'resentful refrain') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 50,
        source: { kind: 'handSize', side: 'opponent' },
      },
    }
  }
  if (name === 'regi charge') {
    // Energy recovered from the discard is represented as shared Energy.
    const type = attack.text.match(/basic (water|fighting|metal) energy/i)?.[1]?.toLowerCase()
    const energyType = type === 'water' ? 'Water' : type === 'fighting' ? 'Fighting' : 'Metal'
    return { ...zero(), energyGain: [{ target: 'self', amount: 2, requiresEnergyType: energyType }] }
  }
  if (name === 'call for family') {
    const maxCount = Number(attack.text.match(/up to (\d+) basic pokemon/i)?.[1] || '1')
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount, basicOnly: true, destination: 'bench' }],
    }
  }
  if (name === 'hundred-hitting ball') {
    return { damage: { kind: 'headsMultiplier', damagePerHeads: 100, coinFlipCount: 0 }, flipUntilTails: true }
  }
  if (name === 'powerful bolt') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 70, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energyOnTarget' },
    }
  }
  if (name === 'split bomb') {
    // The engine chooses up to two valid targets automatically for multi-target damage.
    return {
      ...zero(),
      benchDamage: [{ amount: 60, side: 'opponent', zone: 'play', maxTargets: 2, ignoreWeaknessResistanceOnBench: true }],
    }
  }
  if (name === 'fast flight') {
    return {
      ...zero(),
      special: [
        { kind: 'discardAllHandCards' },
        { kind: 'drawCards', target: 'self', amount: 5 },
      ],
    }
  }
  if (name === 'hadron spark') {
    return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 120 } }
  }
  if (name === 'full moon rondo') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'bench', side: 'both' },
      },
    }
  }
  if (name === 'tri kinesis') {
    return {
      damage: {
        kind: 'knockOutOnCoinCondition',
        condition: { result: 'heads', minimum: 3, exactly: 3 },
      },
      coinFlipCount: 3,
    }
  }
  if (name === 'erasure ball') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 60,
        source: { kind: 'chosenEnergy' },
        maxUnits: 2,
        optional: true,
      },
      energyDiscard: [{ target: 'self', amount: 'choice', optional: true }],
      choiceRequirement: 'energyAmount',
      choiceEnergyMax: 2,
    }
  }
  if (name === 'garland ray') {
    // Discarded Energy from this Pokémon's Bench is represented by the shared Energy pool.
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 120,
        source: { kind: 'chosenEnergy' },
        maxUnits: 2,
      },
      energyDiscard: [{ target: 'self', amount: 'choice', optional: true }],
      choiceRequirement: 'energyAmount',
      choiceEnergyMax: 2,
    }
  }
  if (name === 'hide') {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
    }
  }
  if (name === 'energized balloon') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 40,
        source: { kind: 'energyOfType', side: 'own', type: 'Psychic' },
      },
    }
  }
  if (name === 'collect' || name === 'filch') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: name === 'filch' ? 2 : 1 }] }
  }
  if (name === 'call sign') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 3, destination: 'hand' }],
    }
  }
  if (name === 'overflowing wishes') {
    return {
      ...zero(),
      energyGain: [{
        target: 'self',
        amountPerUnit: 1,
        source: { kind: 'bench', side: 'own' },
        requiresEnergyType: 'Psychic',
      }],
    }
  }
  if (name === 'mega symphonia') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 50,
        source: { kind: 'energyOfType', side: 'own', type: 'Psychic' },
      },
    }
  }
  if (name === 'cursed words') {
    return { ...zero(), special: [{ kind: 'shuffleRandomHandCardIntoDeck', target: 'opponent', amount: 3 }] }
  }
  if (name === 'roto call') {
    return {
      ...zero(),
      special: [{ kind: 'searchDeckPokemon', maxCount: 6, includeNameContains: ['Rotom'], destination: 'bench' }],
    }
  }
  if (name === 'gadget show') {
    // Pokémon Tools are not part of this battle deck.
    return { damage: { kind: 'fixed', amount: 0 } }
  }
  if (name === 'horrifying revenge') {
    return { damage: { kind: 'lastTurnKnockoutBonus', baseDamage, bonusDamage: 100, knockedOutNameContains: "Hop's" } }
  }
  if (name === 'relentless burrowing') {
    return {
      ...zero(),
      flipUntilTails: true,
      special: [{ kind: 'millCards', target: 'opponent', amount: 0, amountPerHead: 1 }],
    }
  }
  if (name === 'spin and draw') {
    return {
      ...zero(),
      special: [{ kind: 'drawCards', target: 'self', amount: 6, shuffleHandIntoDeck: true }],
    }
  }
  if (name === 'giant rock') {
    return { damage: { kind: 'stage2TargetBonus', baseDamage, bonusDamage: 140 } }
  }
  if (name === 'flopping trap') {
    return { damage: { kind: 'attackerDamagedBonus', baseDamage, bonusDamage: 100 } }
  }
  if (name === 'somersault dive') {
    // Stadium cards are not represented, so its conditional bonus cannot apply.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'tar cannon') {
    // Its Fighting Energy discard-pile requirement cannot be met in the model.
    return { damage: { kind: 'fixed', amount: 0 }, targetScope: 'any', ignoreWeaknessResistanceOnBench: true }
  }
  if (name === 'orichalcum fang') {
    return { damage: { kind: 'lastTurnKnockoutBonus', baseDamage, bonusDamage: 120 } }
  }
  if (name === 'rocket feathers') {
    // The Pokémon-only hand contains no Supporter cards to discard.
    return { damage: { kind: 'fixed', amount: 0 } }
  }
  if (name === 'raging curse') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 10,
        source: { kind: 'damageCountersOnNamedPokemonContains', side: 'own', zone: 'bench', nameContains: "Cynthia's" },
      },
    }
  }
  if (name === 'night joker') {
    return { ...zero(), choiceRequirement: 'copyAttack', special: [{ kind: 'copyAttack', preserveExtraCosts: true }] }
  }
  if (name === 'bone shot' || name === 'cruel arrow') {
    const amount = name === 'bone shot' ? 50 : 100
    return { damage: { kind: 'fixed', amount }, targetScope: 'any', ignoreWeaknessResistanceOnBench: true }
  }
  if (name === "master's punch") {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 120,
        source: { kind: 'injuredPokemonNameContains', side: 'own', nameContains: 'Pancham', zone: 'bench' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'enhanced blade') {
    // Pokémon Tools are not part of the battle deck; retain its printed damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'paw-cket pilfer') {
    return { ...zero(), special: [{ kind: 'shuffleRandomHandCardIntoDeck', target: 'opponent', amount: 1, revealSelected: true }] }
  }
  if (name === 'work rush') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 80, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energyOnTarget' },
    }
  }
  if (name === 'energy crush') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 40,
        source: { kind: 'energy', side: 'opponent' },
      },
    }
  }
  if (name === 'facade') {
    return { damage: { kind: 'statusBonus', baseDamage, bonusDamage: 100, statuses: ['burned', 'poisoned'], statusTarget: 'attacker' } }
  }
  if (name === 'kaleidowaltz') {
    return {
      ...zero(),
      coinFlipCount: 3,
      energyGain: [{ target: 'self', amountPerHead: 2, maxAmount: 6 }],
    }
  }
  if (name === 'ear force') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 80,
        source: { kind: 'energyOnTarget' },
      },
    }
  }
  if (name === 'peck the wound') {
    return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 80 } }
  }
  if (name === 'prism charge') {
    // Energy searched from the deck becomes generic shared Energy; Tera targeting and distinct types are not modeled.
    return { ...zero(), energyGain: [{ target: 'self', amount: 3 }] }
  }
  if (name === 'gale thrust') {
    // The engine does not retain same-turn Bench-to-Active movement history.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }

  return null
}
