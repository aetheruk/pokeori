import type { BattlePokemon, BattleStance, StatStages } from './types'
import { getDualTypeEffectiveness } from './type-chart'
import {
  getStatStageMultiplier,
  getCritChance,
  DEFAULT_STAT_STAGES,
} from './stats-calc'
import { getHeldAttackDamageMultiplier } from './held-items'
import type { WeatherType } from '@/data/weather'
import type { TerrainType } from '@/data/terrain'
import { getEffectiveBattleTypes } from './tera'
import {
  getWeatherAttackMultiplier,
  getWeatherDamageBlockMessage,
  getWeatherDefenseMultiplier,
  getWeatherTypeEffectiveness,
} from './weather-effects'
import { getTerrainAttackMultiplier } from './terrain-effects'
import { BASE_BATTLE_POWER } from './constants'
import {
  blocksBattleCriticalHitByAbility,
  getBattleAbilityCritChanceDelta,
  getBattleAbilityCritDamageMultiplier,
  getBattleAbilityDamageMultiplier,
  getBattleAbilityEffectiveOpponentStatStage,
  getBattleAbilityStatMultiplier,
  getBattleAbilityTypeEffectivenessOverride,
  guaranteesBattleCriticalHitByAbility,
} from './abilities'

export function calculateDamage(
  attacker: BattlePokemon,
  defender: BattlePokemon,
  stance: BattleStance,
  multiplier: number,
  attackType?: string,
  movePower?: number, // Optional override for base power
  typeEffectivenessOverride?: number,
  critChanceOverride?: number, // Optional 0-100 percentage. Uses the higher of staged crit and move crit.
  weather?: WeatherType,
  typeImmunityBypassAttackTypes?: string[] | true,
	  options?: {
	    ignoreDefenderStatStages?: boolean
	    damageStatSource?: 'user' | 'target'
	    moveId?: string
	    currentTurn?: number
	    terrain?: TerrainType
	  },
): {
  damage: number
  typeEffectiveness: number
  isSuperEffective: boolean
  isNotVeryEffective: boolean
  isImmune: boolean
  usedType: string
  isCrit: boolean
  isRadiantBoost: boolean
  weatherMultiplier: number
  weatherMessage: string
  terrainMultiplier: number
} {
  const dStats = defender.stats!
  const level = attacker.level
  const attackSource =
    options?.damageStatSource === 'target' ? defender : attacker
  const attackSourceStats = attackSource.stats!
  const attackerStages = attackSource.statStages || DEFAULT_STAT_STAGES
  const defenderStages = options?.ignoreDefenderStatStages
    ? DEFAULT_STAT_STAGES
    : defender.statStages || DEFAULT_STAT_STAGES

  let attackStat = 0
  let defenseStat = 0
  let attackStageKey: keyof StatStages = 'attack'
  let defenseStageKey: keyof StatStages = 'defense'

  // Determine move type - check for tera override first
  // ... (Type determination remains same)
  let usedType = 'normal'
  let typeEffectiveness = 1

  if (attacker.teraTypeOverride) {
    usedType = attacker.teraTypeOverride
    typeEffectiveness = getWeatherTypeEffectiveness(usedType, defender, weather)
  } else if (attackType) {
    usedType = attackType
    typeEffectiveness = getWeatherTypeEffectiveness(
      attackType,
      defender,
      weather,
    )
  } else {
    // AI or fallback
    let bestEffectiveness = -1
    const attackerTypes =
      attacker.types && attacker.types.length > 0 ? attacker.types : ['normal']

    for (const type of attackerTypes) {
      const effectiveness = getWeatherTypeEffectiveness(type, defender, weather)
      if (effectiveness > bestEffectiveness) {
        bestEffectiveness = effectiveness
        usedType = type
      }
    }
    typeEffectiveness = bestEffectiveness
  }

  if (typeof typeEffectivenessOverride === 'number') {
    typeEffectiveness = typeEffectivenessOverride
  } else if (
    typeEffectiveness === 0 &&
    (typeImmunityBypassAttackTypes === true ||
      typeImmunityBypassAttackTypes?.some(
        (type) => type.toLowerCase() === usedType.toLowerCase(),
      ))
  ) {
    typeEffectiveness = 1
  }
  typeEffectiveness = getBattleAbilityTypeEffectivenessOverride({
    attacker,
    defender,
    typeEffectiveness,
  })

  // Check Status Effects on Attacker (Damage Reduction)
  let statusDamageReduction = 1.0
  if (attacker.status) {
    if (attacker.status.id === 'burn' && stance === 'power') {
      statusDamageReduction = 0.5
    } else if (attacker.status.id === 'frostbite' && stance === 'tech') {
      statusDamageReduction = 0.5
    } else if (attacker.status.id === 'paralysis' && stance === 'speed') {
      // "halves speed move damage"
      statusDamageReduction = 0.5
    }
  }

  switch (stance) {
    case 'power':
      attackStat = attackSourceStats.attack!
      defenseStat = dStats.defense!
      attackStageKey = 'attack'
      defenseStageKey = 'defense'
      break
    case 'speed':
      attackStat = attackSourceStats.speed!
      defenseStat = dStats.speed!
      attackStageKey = 'speed'
      defenseStageKey = 'speed'
      break
    case 'tech':
      attackStat = attackSourceStats.specialAttack!
      defenseStat = dStats.specialDefense!
      attackStageKey = 'specialAttack'
      defenseStageKey = 'specialDefense'
      break
  }

  const basePower = movePower || BASE_BATTLE_POWER

  // Apply stat stage multipliers
  const rawAttackStage = attackerStages[attackStageKey] as number
  const rawDefenseStage = defenderStages[defenseStageKey] as number
  const attackStage =
    attackSource === attacker
      ? getBattleAbilityEffectiveOpponentStatStage({
          pokemon: defender,
          opposingPokemon: attacker,
          stage: rawAttackStage,
        })
      : rawAttackStage
  const defenseStage = options?.ignoreDefenderStatStages
    ? rawDefenseStage
    : getBattleAbilityEffectiveOpponentStatStage({
        pokemon: attacker,
        opposingPokemon: defender,
        stage: rawDefenseStage,
      })
  const attackMultiplier = getStatStageMultiplier(
    attackStage,
  )
  const defenseMultiplier = getStatStageMultiplier(
    defenseStage,
  )

  attackStat = Math.floor(attackStat * attackMultiplier)
  defenseStat = Math.floor(defenseStat * defenseMultiplier)
  attackStat = Math.floor(
    attackStat *
      getBattleAbilityStatMultiplier({
        pokemon: attackSource,
        stat:
          attackStageKey === 'attack'
            ? 'attack'
            : attackStageKey === 'speed'
              ? 'speed'
              : 'specialAttack',
        stance,
	        attackType: usedType,
	        weather,
	        currentTurn: options?.currentTurn,
	      }),
  )
  defenseStat = Math.floor(
    defenseStat *
      getBattleAbilityStatMultiplier({
        pokemon: defender,
        stat:
          defenseStageKey === 'defense'
            ? 'defense'
            : defenseStageKey === 'speed'
              ? 'speed'
              : 'specialDefense',
        stance,
	        attackType: usedType,
	        weather,
	        currentTurn: options?.currentTurn,
	      }),
  )
  defenseStat = Math.floor(
    defenseStat * getWeatherDefenseMultiplier(defender, stance, weather),
  )

  // Simplified damage formula
  // Damage = ((((2 * Level / 5 + 2) * AttackStat * Power / DefenseStat) / 50) + 2) * Modifier
  let damage =
    (((2 * level) / 5 + 2) *
      basePower *
      (attackStat / Math.max(1, defenseStat))) /
      50 +
    2

  // Vanished Check - Defender takes 0 damage
  if (defender.status?.id === 'vanished') {
    damage = 0
    return {
      damage: 0,
      typeEffectiveness,
      isSuperEffective: false,
      isNotVeryEffective: false,
      isImmune: false,
      usedType,
      isCrit: false,
      isRadiantBoost: false,
      weatherMultiplier: 1,
      weatherMessage: '',
      terrainMultiplier: 1,
    }
  }

  const weatherMultiplier = getWeatherAttackMultiplier(usedType, weather)
  const weatherMessage = getWeatherDamageBlockMessage(usedType, weather)
  const terrainMultiplier = getTerrainAttackMultiplier({
    attackType: usedType,
    terrain: options?.terrain,
    attacker,
    defender,
  })

  damage *= multiplier
  damage *= typeEffectiveness
  damage *= statusDamageReduction // Apply Status Reduction
  damage *= getHeldAttackDamageMultiplier(attacker, usedType)
  damage *= weatherMultiplier
  damage *= terrainMultiplier
  damage *= getBattleAbilityDamageMultiplier({
    attacker,
    defender,
    target: 'attacker',
    stance,
    attackType: usedType,
    weather,
    typeEffectiveness,
    movePower: basePower,
    moveId: options?.moveId,
  })
  damage *= getBattleAbilityDamageMultiplier({
    attacker,
    defender,
    target: 'defender',
    stance,
    attackType: usedType,
    weather,
    typeEffectiveness,
    movePower: basePower,
    moveId: options?.moveId,
  })

  // Check for critical hit
  const stagedCritChance = getCritChance(attackerStages.crit || 0)
  const moveCritChance =
    typeof critChanceOverride === 'number'
      ? Math.max(0, Math.min(100, critChanceOverride)) / 100
      : 0
  const critChance = Math.max(
    0,
    Math.min(
      1,
      Math.max(stagedCritChance, moveCritChance) +
        getBattleAbilityCritChanceDelta(attacker),
    ),
  )
  let isCrit = Math.random() < critChance

  // Victory Status: Guarantee Crit
  if (attacker.status?.id === 'victory') {
    isCrit = true
  }
  if (guaranteesBattleCriticalHitByAbility({ attacker, defender })) {
    isCrit = true
  }
  if (blocksBattleCriticalHitByAbility(defender, attacker)) {
    isCrit = false
  }

  // Vanished Status: 1.3x Damage
  if (attacker.status?.id === 'vanished') {
    damage *= 1.3
  }

  if (isCrit) {
    damage *= 1.5 * getBattleAbilityCritDamageMultiplier(attacker)
  }

  const isRadiantBoost =
    !!(attacker as any).isRadiant && damage > 0 && Math.random() < 0.1
  if (isRadiantBoost) {
    damage *= 1.1
  }

  const effectiveAttackerTypes = getEffectiveBattleTypes(attacker).map((type) =>
    type.toLowerCase(),
  )
  const isReverseStab = !effectiveAttackerTypes.includes(usedType.toLowerCase())
  if (isReverseStab) {
    damage *= 0.85
  }

  // Random variance 0.85 to 1.0
  damage *= (Math.floor(Math.random() * 16) + 85) / 100

  return {
    damage: Math.floor(damage),
    typeEffectiveness,
    isSuperEffective: typeEffectiveness > 1,
    isNotVeryEffective: typeEffectiveness < 1 && typeEffectiveness > 0,
    isImmune: typeEffectiveness === 0,
    usedType,
    isCrit,
    isRadiantBoost,
    weatherMultiplier,
    weatherMessage,
    terrainMultiplier,
  }
}

export function formatTypeEffectivenessMessage(result: {
  typeEffectiveness?: number
  isSuperEffective: boolean
  isNotVeryEffective: boolean
  isImmune: boolean
}): string {
  if (result.isImmune) return ' (It has no effect...)'
  if (
    typeof result.typeEffectiveness === 'number' &&
    result.typeEffectiveness >= 4
  ) {
    return ' (Extremely Effective!)'
  }
  if (result.isSuperEffective) return ' (Super Effective!)'
  if (result.isNotVeryEffective) return ' (Not Very Effective...)'
  return ''
}
