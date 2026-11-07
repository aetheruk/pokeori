import type { TcgCardAttack } from '@/data/tcg/types'
import type { TcgBattleAttackEffect } from './tcg-battle'

export function infer30thCelebrationTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
  setId: string,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const text = (attack.text || '').toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (setId === 'me55') {
    if (name === 'luring glow') {
      return { ...zero(), choiceRequirement: 'opponentBench', special: [{ kind: 'switch', target: 'opponent' }] }
    }
    if (name === 'rally back' || name === 'retaliate') {
      const bonusDamage = Number(text.match(/does (\d+) more damage/)?.[1] || '0')
      return { damage: { kind: 'lastTurnKnockoutBonus', baseDamage, bonusDamage } }
    }
    if (name === 'cheerful flame') {
      // Prize cards are not tracked in this battle format, so its per-Prize damage is zero.
      return { damage: { kind: 'fixed', amount: 0 } }
    }
    if (name === 'hide' || name === 'well-hidden') {
      return {
        ...zero(),
        coinFlipCount: 1,
        protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
      }
    }
    if (name === 'sacred breath') {
      return {
        ...zero(),
        choiceRequirement: 'ownBench',
        energyDiscard: [{ target: 'self', amount: 'all' }],
        healing: [{ target: 'selectedOwnBench', amount: 'all' }],
      }
    }
    if (name === 'energy gift') {
      // Basic Energy cards are not in the Pokémon-only deck, so their attachments become shared Energy.
      return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
    }
    if (name === 'call for family' || name === 'pika-pika parade') {
      const maxCount = Number(text.match(/up to (\d+) basic pokemon/)?.[1] || '3')
      return {
        ...zero(),
        choiceRequirement: 'deckPokemon',
        special: [{ kind: 'searchDeckPokemon', maxCount, basicOnly: true, destination: 'bench' }],
      }
    }
    if (name === 'laser flame' || name === 'nitro thunder') {
      const energyType = name === 'laser flame' ? 'Lightning' : 'Fire'
      return {
        damage: {
          kind: 'countThresholdBonus',
          baseDamage,
          bonusDamage: 80,
          source: { kind: 'energyOfType', side: 'own', type: energyType },
          minimumUnits: 1,
        },
      }
    }
    if (name === 'hail' || name === 'kaboom needles') {
      const amount = name === 'hail' ? 30 : 50
      return {
        ...zero(),
        benchDamage: [{ amount, side: 'opponent', zone: 'play', ignoreWeaknessResistance: true }],
        selfDamage: name === 'kaboom needles' ? [{ kind: 'fixed', amount: 130 }] : undefined,
      }
    }
    if (name === 'hydro pump') {
      return {
        damage: {
          kind: 'count',
          baseDamage,
          perUnitDamage: 30,
          source: { kind: 'energyOfType', side: 'own', type: 'Water' },
        },
      }
    }
    if (name === 'stealthy slash') {
      return {
        damage: {
          kind: 'count',
          baseDamage: 0,
          perUnitDamage: 30,
          source: { kind: 'damageCounters', target: 'target' },
        },
        targetScope: 'any',
        ignoreWeaknessResistanceOnBench: true,
      }
    }
    if (name === 'peer at') return { ...zero(), special: [{ kind: 'revealHand', target: 'opponent' }] }
    if (name === 'find a friend') {
      return {
        ...zero(),
        choiceRequirement: 'deckPokemon',
        special: [{ kind: 'searchDeckPokemon', maxCount: 1, destination: 'hand' }],
      }
    }
    if (name === 'scurry about') {
      return { ...zero(), choiceRequirement: 'ownBench', special: [{ kind: 'switch', target: 'self' }] }
    }
    if (name === 'pika chain') {
      return {
        damage: {
          kind: 'count',
          baseDamage: 0,
          perUnitDamage: 40,
          source: { kind: 'namedPokemon', side: 'own', zone: 'play', names: ['Pikachu', 'Pikachu ex'] },
        },
      }
    }
    if (name === 'targeted spark') {
      return { damage: { kind: 'fixed', amount: 20 }, targetScope: 'any', ignoreWeaknessResistanceOnBench: true }
    }
    if (name === 'iron tail') return { damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 0 }, flipUntilTails: true }
    if (name === 'charge-up dash') {
      // Individual attachments are not modeled; heads grant shared Lightning Energy instead.
      return {
        ...zero(),
        flipUntilTails: true,
        energyGain: [{ target: 'self', amountPerHead: 1, requiresEnergyType: 'Lightning' }],
      }
    }
    if (name === 'nightime stroll') return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 1 }] }
    if (name === 'get some air') {
      return {
        ...zero(),
        special: [{ kind: 'clearStatus', target: 'self', statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'] }],
      }
    }
    if (name === 'fighting lightning') {
      return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 80 } }
    }
    if (name === 'empower') return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
    if (name === 'photon bullets') {
      return {
        ...zero(),
        benchDamage: [{ amount: 50, side: 'opponent', zone: 'play', subtypeFilter: { include: ['ex'] }, ignoreWeaknessResistance: true }],
      }
    }
    if (name === 'psychic') {
      return {
        damage: {
          kind: 'count',
          baseDamage,
          perUnitDamage: 40,
          source: { kind: 'energyOnTarget' },
        },
      }
    }
    if (name === 'colorful harmony') {
      const basicEnergyTypes = [
        'Grass', 'Fire', 'Water', 'Lightning', 'Psychic', 'Fighting', 'Darkness', 'Metal', 'Fairy', 'Dragon',
      ] as const
      return {
        damage: {
          kind: 'weightedCount',
          baseDamage: 0,
          sources: basicEnergyTypes.map((type) => ({
            source: { kind: 'energyOfType' as const, side: 'own' as const, type },
            perUnitDamage: 50,
            maxUnits: 1,
          })),
        },
      }
    }
    if (name === 'comforting aroma') {
      return {
        ...zero(),
        choiceRequirement: 'ownBench',
        healing: [{ target: 'selectedOwnBench', amount: 80 }],
      }
    }
    if (name === 'stiffen') return { ...zero(), protection: [{ target: 'self', kind: 'reduce', amount: 60 }] }
    if (name === 'strolls so much') {
      return {
        ...zero(),
        coinFlipCount: 1,
        choiceRequirement: 'deckPokemon',
        special: [{ kind: 'searchDeckPokemon', maxCount: 1, destination: 'hand', condition: 'heads' }],
      }
    }
    if (name === 'counter') return { damage: { kind: 'lastIncomingDamageBonus', baseDamage } }
    if (name === 'chaotic pain') {
      return { ...zero(), targetScope: 'any', counterDamage: [{ amount: 130, target: 'target' }] }
    }
    if (name === 'lunatic claw') return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 140 } }
    if (name === 'nitpick') {
      return { ...zero(), special: [{ kind: 'drawCards', target: 'opponent', amount: 4, shuffleHandIntoDeck: true }] }
    }
    if (name === 'treasure rush') {
      return {
        damage: {
          kind: 'count',
          baseDamage: 0,
          perUnitDamage: 10,
          source: { kind: 'handSize', side: 'own' },
        },
      }
    }
    if (name === 'wish granter') {
      return { ...zero(), special: [{ kind: 'drawCards', target: 'self', untilHandSize: 7 }] }
    }
    if (name === 'reversed clock') {
      // Only Pokémon are represented in the discard pile; Basic Energy cards are absent.
      return { ...zero(), special: [{ kind: 'shuffleDiscardPokemonIntoDeck', maxCount: 3 }] }
    }
    if (name === 'hardened blade') {
      // Pokémon Tools are not part of this battle format, so preserve printed damage.
      return { damage: { kind: 'fixed', amount: baseDamage } }
    }
    if (name === 'screech') return { ...zero(), special: [{ kind: 'buffDefendingPokemon', damageBonus: 30 }] }
    if (name === 'swirling resentment') {
      return { ...zero(), counterDamage: [{ target: 'opponent', amountToLeaveHp: 50 }] }
    }
    if (name === 'gnaw together') {
      return {
        ...zero(),
        coinFlipSource: { kind: 'namedPokemon', side: 'own', zone: 'play', names: ['Maushold'] },
        special: [{ kind: 'millCards', target: 'opponent', amount: 0, amountPerHead: 2 }],
      }
    }
  }

  if (setId === 'me55c') {
    if (name === 'max energy source' || name === 'grind') {
      return {
        damage: {
          kind: 'count',
          baseDamage: name === 'max energy source' ? 0 : baseDamage,
          perUnitDamage: 10,
          source: { kind: 'energy', side: 'own' },
        },
      }
    }
    if (name === 'crush and burn') {
      return {
        damage: {
          kind: 'count',
          baseDamage,
          perUnitDamage: 20,
          source: { kind: 'chosenEnergy' },
        },
        energyDiscard: [{ target: 'self', amount: 'choice' }],
        choiceRequirement: 'energyAmount',
      }
    }
    if (name === 'spinning tail') {
      return {
        ...zero(),
        benchDamage: [{ amount: 20, side: 'opponent', zone: 'play', ignoreWeaknessResistance: true }],
      }
    }
    if (name === 'bite off') {
      return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 50 } }
    }
    if (name === 'beat up') {
      return {
        damage: { kind: 'headsMultiplier', damagePerHeads: baseDamage, coinFlipCount: 0 },
        coinFlipSource: { kind: 'pokemonInPlay', side: 'own' },
      }
    }
    if (name === 'absorption-gx') {
      // The attack scales with Prize cards taken, which are not tracked here.
      return { damage: { kind: 'fixed', amount: 0 } }
    }
    if (name === 'dragon burst') {
      const energyType = text.includes('fire energy') ? 'Fire' : 'Lightning'
      return {
        damage: {
          kind: 'count',
          baseDamage: 0,
          perUnitDamage: 60,
          source: { kind: 'chosenEnergy' },
        },
        energyDiscard: [{ target: 'self', amount: 'choice', requiresEnergyType: energyType }],
        choiceRequirement: 'energyAmount',
        choiceEnergyType: energyType,
      }
    }
    if (name === 'sol burst-gx') return { ...zero(), energyGain: [{ target: 'self', amount: 5 }] }
    if (name === 'cursed drop') {
      return {
        ...zero(),
        choiceRequirement: 'counterDistribution',
        choiceCounterCount: 4,
        counterDamage: [{ amountPerCounter: 10, target: 'distributed' }],
      }
    }
    if (name === 'brilliant arrow') {
      return {
        damage: {
          kind: 'count',
          baseDamage: 0,
          perUnitDamage: 30,
          source: { kind: 'energyOfType', side: 'own', type: 'Fairy' },
        },
      }
    }
    if (name === 'healing water') {
      return {
        ...zero(),
        choiceRequirement: 'ownBench',
        healing: [{
          target: 'selectedOwnBench',
          amount: 0,
          amountPerUnit: 10,
          source: { kind: 'energyOfType', side: 'own', type: 'Water' },
        }],
      }
    }
    if (name === 'cross-cut') return { damage: { kind: 'evolvedTargetBonus', baseDamage, bonusDamage: 30 } }
    if (name === 'expert splasher') {
      return {
        damage: { kind: 'conditionalBonus', baseDamage, bonusDamage: 20, condition: { result: 'heads', minimum: 2, exactly: 2 } },
        coinFlipCount: 2,
      }
    }
  }

  return null
}
