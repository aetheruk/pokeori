import type { TcgCardAttack } from '@/data/tcg/types'
import type { TcgBattleAttackEffect } from './tcg-battle'

export function inferPerfectOrderTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'send flowers') {
    // A Basic Energy search and attachment to a Grass Pokémon becomes shared Energy.
    return { ...zero(), energyGain: [{ target: 'self', amount: 1, requiresOwnBench: true }] }
  }
  if (name === 'solar coiling') {
    // Supporter cards are not represented; preserve printed base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'hide') {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
    }
  }
  if (name === 'blow through') {
    // Stadium cards are not represented, so its conditional bonus cannot apply.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'find a friend') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, destination: 'hand' }],
    }
  }
  if (name === 'nasty plot') {
    // The modeled deck contains Pokémon only, so a general card search maps to Pokémon.
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 2, destination: 'hand' }],
    }
  }
  if (name === 'hydro turn') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 30,
        source: { kind: 'energyOfType', side: 'own', type: 'Water' },
      },
      choiceRequirement: 'ownBench',
      special: [{ kind: 'switch', target: 'self' }],
    }
  }
  if (name === 'powerful steam') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 90, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energyOfType', side: 'own', type: 'Water' },
    }
  }
  if (name === 'incessant onslaught') {
    // Prize cards are absent, so its damage is zero in this format.
    return { damage: { kind: 'fixed', amount: 0 } }
  }
  if (name === 'tail generator') {
    // Basic Energy recovered from discard becomes shared Energy.
    return {
      ...zero(),
      energyGain: [{
        target: 'self',
        amountPerUnit: 1,
        source: { kind: 'energy', side: 'opponent' },
      }],
    }
  }
  if (name === 'follow me') {
    return { ...zero(), choiceRequirement: 'opponentBench', special: [{ kind: 'switch', target: 'opponent' }] }
  }
  if (name === 'shooting moons') {
    // The player's hand contains only Pokémon, so there is no Energy card to discard.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'double eater') {
    // The Pokémon-only hand contains no Energy cards to discard.
    return { damage: { kind: 'fixed', amount: 0 } }
  }
  if (name === 'psychic') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 30,
        source: { kind: 'energyOnTarget' },
      },
    }
  }
  if (name === 'sweet scent') {
    return {
      ...zero(),
      choiceRequirement: 'ownPokemon',
      healing: [{ target: 'selectedOwnPokemon', amount: 30 }],
    }
  }
  if (name === 'double draw') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 2 }] }
  }
  if (name === 'vengeful kick') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 60,
        source: { kind: 'injuredPokemon', side: 'own', zone: 'bench' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'nullifying zero') {
    return {
      ...zero(),
      benchDamage: [{
        amount: 0,
        amountPerHead: 150,
        side: 'opponent',
        zone: 'play',
        perTargetCoinFlip: true,
        ignoreWeaknessResistanceOnBench: true,
      }],
    }
  }
  if (name === 'haunt') {
    return { ...zero(), counterDamage: [{ amount: 30, target: 'target' }] }
  }
  if (name === 'rising blade') {
    return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 80 } }
  }
  if (name === 'sonic ripper') {
    return {
      damage: { kind: 'fixed', amount: 220 },
      energyDiscard: [{ target: 'self', amount: 'all' }],
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'retaliatory incisors') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 40,
        source: { kind: 'damageCountersOnNamedPokemon', side: 'own', zone: 'bench', names: ['Rattata'] },
      },
    }
  }
  if (name === 'gormandizer') {
    return {
      ...zero(),
      flipUntilTails: true,
      energyGain: [{ target: 'self', amountPerHead: 1 }],
    }
  }
  if (name === 'chirp') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 2, includeResistanceTypes: ['Fighting'], destination: 'hand' }],
    }
  }
  if (name === 'hand trim') {
    return {
      ...zero(),
      special: [{ kind: 'discardRandomHandCard', target: 'opponent', untilHandSize: 5 }],
    }
  }

  return null
}
