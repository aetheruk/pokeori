import type { TcgCardAttack, TcgCardDetail } from '@/data/tcg/types'
import { getTcgCardDetailById } from '@/data/tcg/details'

export type TcgBattleDeckFormat = 'baby' | 'champions' | 'masters'
export type TcgBattleSide = 'player' | 'opponent'
export type TcgBattlePhase = 'arranging' | 'battle' | 'promotion' | 'finished'
export type TcgBattleMode = 'pve' | 'pvp'
export type TcgBattleEnergyType =
  | 'Grass'
  | 'Fire'
  | 'Water'
  | 'Lightning'
  | 'Psychic'
  | 'Fighting'
  | 'Darkness'
  | 'Metal'
  | 'Fairy'
  | 'Dragon'
  | 'Colorless'

export type TcgBattleCoinCondition =
  | 'heads'
  | 'tails'
  | { result: 'heads' | 'tails'; minimum: number; exactly?: number }
export type TcgBattleCoinResult = 'heads' | 'tails'
export type TcgBattleStatusCondition = 'asleep' | 'poisoned' | 'burned' | 'paralyzed' | 'confused'

export type TcgBattleCountSource =
  | { kind: 'bench'; side: 'own' | 'opponent' | 'both' }
  | { kind: 'pokemonInPlay'; side: 'own' | 'opponent' | 'both'; excludeAttacker?: boolean }
  | { kind: 'injuredPokemon'; side: 'own' | 'opponent' | 'both'; zone: 'bench' | 'play' }
  | { kind: 'damageCounters'; target: 'attacker' | 'target' }
  | { kind: 'damageCountersOnSide'; side: 'own' | 'opponent' | 'both'; zone: 'front' | 'bench' | 'play' }
  | { kind: 'damageCountersOnNamedPokemon'; side: 'own' | 'opponent' | 'both'; zone: 'bench' | 'play'; names: string[] }
  | { kind: 'damageCountersOnNamedPokemonContains'; side: 'own' | 'opponent' | 'both'; zone: 'play'; nameContains: string }
  | { kind: 'energyOnTarget' }
  | { kind: 'retreatCost'; target: 'attacker' | 'target' }
  | { kind: 'pokemonInDiscard'; side: 'own' | 'opponent'; max?: number; includeSubtypes?: string[]; all?: boolean }
  | { kind: 'pokemonWithAttackInDiscard'; side: 'own' | 'opponent'; attackName: string }
  | { kind: 'namedPokemonInDiscard'; side: 'own' | 'opponent'; names: string[]; max?: number }
  | { kind: 'deltaPokemonInPlay'; side: 'own' | 'opponent' | 'both' }
  | { kind: 'pokemonExInPlay'; side: 'own' | 'opponent' }
  | { kind: 'pokemonEvolvedInPlay'; side: 'own' | 'opponent' | 'both' }
  | { kind: 'pokemonEvolvedFromInPlay'; side: 'own' | 'opponent' | 'both'; evolvesFrom: string }
  | { kind: 'pokemonEvolvedOnBench'; side: 'own' | 'opponent' | 'both' }
  | { kind: 'pokemonOfTypesInPlay'; side: 'own' | 'opponent' | 'both'; types: string[]; zone?: 'bench' | 'play' }
  | { kind: 'distinctTypesInPlay'; side: 'own' | 'opponent' | 'both'; zone: 'bench' | 'play' }
  | { kind: 'retreatCostOnNamedPokemon'; side: 'own' | 'opponent' | 'both'; zone: 'bench' | 'play'; names: string[] }
  | { kind: 'pokemonWithAttack'; side: 'own' | 'opponent' | 'both'; attackName: string; zone: 'bench' | 'play' }
  | { kind: 'distinctTypesOfNamedPokemon'; side: 'own' | 'opponent' | 'both'; zone: 'bench' | 'play'; nameContains: string }
  | { kind: 'distinctTypesOfPokemonWithSubtypesInPlay'; side: 'own' | 'opponent' | 'both'; subtypes: string[]; zone: 'bench' | 'play' }
  | { kind: 'handSize'; side: 'own' | 'opponent'; max?: number }
  | { kind: 'chosenHandCards' }
  | { kind: 'unusedEnergy' }
  | { kind: 'chosenEnergy' }
  | { kind: 'energy'; side: 'own' | 'opponent' | 'both'; max?: number }
  | { kind: 'energyOfType'; side: 'own' | 'opponent'; type: TcgBattleEnergyType }
  | {
      kind: 'namedPokemon'
      side: 'own' | 'opponent' | 'both'
      zone: 'bench' | 'play'
      names: string[]
    }
  | {
      kind: 'namedPokemonContains'
      side: 'own' | 'opponent' | 'both'
      zone: 'bench' | 'play'
      values: string[]
      excludeAttacker?: boolean
    }
  | { kind: 'pokemonWithSubtypesInPlay'; side: 'own' | 'opponent' | 'both'; subtypes: string[]; zone: 'bench' | 'play' }

export type TcgBattleDamageRule =
  | { kind: 'fixed'; amount: number }
  | { kind: 'zeroOnTails'; amount: number }
  | { kind: 'zeroIfAnyTails'; amount: number; coinFlipCount: number }
  | { kind: 'coinCount'; amountPerHeads: number; coinFlipCount: number; exactHeads?: number }
  | { kind: 'conditionalBonus'; baseDamage: number; bonusDamage: number; condition: TcgBattleCoinCondition }
  | { kind: 'optionalCoinDamage'; baseDamage: number; successDamage: number; failureDamage: number; condition: TcgBattleCoinCondition }
  | { kind: 'headsBonus'; baseDamage: number; bonusDamage: number }
  | { kind: 'headsBonusEach'; baseDamage: number; bonusDamage: number; coinFlipCount: number }
  | { kind: 'headsMultiplier'; damagePerHeads: number; coinFlipCount: number }
  | { kind: 'tailsBonus'; baseDamage: number; bonusDamage: number }
  | { kind: 'tailsMultiplier'; damagePerTails: number }
  | { kind: 'count'; baseDamage: number; perUnitDamage: number; source: TcgBattleCountSource; maxUnits?: number; optional?: boolean }
  | { kind: 'gatedCount'; baseDamage: number; perUnitDamage: number; source: TcgBattleCountSource; gateSource: TcgBattleCountSource; minimumGateUnits: number }
  | { kind: 'subtractCount'; baseDamage: number; perUnitDamage: number; source: TcgBattleCountSource }
  | { kind: 'remainingHpHalf' }
  | { kind: 'remainingHpHalfRoundedDown' }
  | { kind: 'targetToRemainingHp'; remainingHp: number; condition?: TcgBattleCoinCondition }
  | { kind: 'conditionalCount'; baseDamage: number; perUnitDamage: number; source: TcgBattleCountSource; condition?: TcgBattleCoinCondition; minUnits?: number; maxUnits?: number; failureDamage?: number }
  | { kind: 'comparativeCount'; baseDamage: number; perUnitDamage: number; addSource: TcgBattleCountSource; subtractSource: TcgBattleCountSource }
  | { kind: 'positiveComparativeCount'; baseDamage: number; perUnitDamage: number; addSource: TcgBattleCountSource; subtractSource: TcgBattleCountSource }
  | { kind: 'weightedCount'; baseDamage: number; sources: { source: TcgBattleCountSource; perUnitDamage: number; maxUnits?: number }[] }
  | { kind: 'countComparisonBonus'; baseDamage: number; bonusDamage: number; addSource: TcgBattleCountSource; subtractSource: TcgBattleCountSource }
  | { kind: 'evolvedTargetBonus'; baseDamage: number; bonusDamage: number }
  | { kind: 'targetSubtypeBonus'; baseDamage: number; bonusDamage: number; subtype: string }
  | { kind: 'pokemonExOrGxTargetBonus'; baseDamage: number; bonusDamage: number }
  | { kind: 'targetTypeBonus'; baseDamage: number; bonusDamage: number; targetType: string }
  | { kind: 'evolvedFromBonus'; baseDamage: number; bonusDamage: number; evolvesFrom: string }
  | { kind: 'retreatCostZeroBonus'; baseDamage: number; bonusDamage: number }
  | { kind: 'knockOutLowestRemainingHp' }
  | { kind: 'knockOutAtDamageCounters'; minimumCounters: number }
  | { kind: 'handSizeComparisonBonus'; baseDamage: number; bonusDamage: number; comparison: 'equal' | 'more' }
  | { kind: 'emptyHandBonus'; baseDamage: number; bonusDamage: number }
  | { kind: 'namedPokemonSetBonus'; baseDamage: number; bonusDamage: number; side: 'own' | 'opponent'; names: string[] }
  | { kind: 'namedPokemonBenchBonus'; baseDamage: number; bonusDamage: number; injuredBonusDamage: number; nameContains: string }
  | { kind: 'stage2TargetBonus'; baseDamage: number; bonusDamage: number }
  | { kind: 'deltaSpeciesTargetBonus'; baseDamage: number; bonusDamage: number }
  | { kind: 'namedTargetBonus'; baseDamage: number; bonusDamage: number; names: string[] }
  | { kind: 'resistanceTypeBonus'; baseDamage: number; bonusDamage: number; resistanceType: string }
  | { kind: 'targetResistanceBonus'; baseDamage: number; bonusDamage: number }
  | { kind: 'darknessOrNameTargetBonus'; baseDamage: number; bonusDamage: number; nameContains: string }
  | { kind: 'knockOutOnCoinCondition'; condition: TcgBattleCoinCondition }
  | { kind: 'pokemonExTargetBonus'; baseDamage: number; bonusDamage: number }
  | { kind: 'damagedTargetBonus'; baseDamage: number; bonusDamage: number }
  | { kind: 'remainingHpComparisonBonus'; baseDamage: number; bonusDamage: number }
  | { kind: 'attackerRemainingHpLessBonus'; baseDamage: number; bonusDamage: number }
  | { kind: 'selectedEnergyTypeMatchBonus'; baseDamage: number; bonusDamage: number }
  | { kind: 'attackerHpExactBonus'; baseDamage: number; bonusDamage: number; remainingHp: number }
  | { kind: 'attackerFullHpBonus'; baseDamage: number; bonusDamage: number }
  | { kind: 'targetSubtypeKnockOut'; subtype: string }
  | { kind: 'optionalChoiceBonus'; baseDamage: number; bonusDamage: number }
  | { kind: 'healthyTarget'; healthyDamage: number; damagedDamage: number }
  | { kind: 'headsTable'; damages: number[]; coinFlipCount: number }
  | { kind: 'headsBonusEachIfEnergyAvailable'; baseDamage: number; bonusDamage: number; coinFlipCount: number }
  | { kind: 'lastHitBonus'; baseDamage: number; bonusDamage: number }
  | { kind: 'lastTurnKnockoutBonus'; baseDamage: number; bonusDamage: number }
  | { kind: 'statusBonus'; baseDamage: number; bonusDamage: number; statuses: TcgBattleStatusCondition[]; statusTarget?: 'attacker' | 'target' }
  | { kind: 'statusCountBonus'; baseDamage: number; bonusDamagePerStatus: number; statuses: TcgBattleStatusCondition[]; statusTarget?: 'attacker' | 'target' }
  | { kind: 'damageCounterThresholdBonus'; baseDamage: number; bonusDamage: number; minimumCounters: number }
  | { kind: 'healedThisTurnBonus'; baseDamage: number; bonusDamage: number }
  | { kind: 'countThresholdBonus'; baseDamage: number; bonusDamage: number; source: TcgBattleCountSource; minimumUnits: number }
  | { kind: 'energyComparisonBonus'; baseDamage: number; bonusDamage: number }
  | { kind: 'energyEqualityBonus'; baseDamage: number; bonusDamage: number }
  | { kind: 'knockOutIf'; status: 'asleep'; attackedWith: string }
  | { kind: 'lastIncomingDamage' }

export type TcgBattleSelfDamageRule =
  | { kind: 'fixed'; amount: number; condition?: TcgBattleCoinCondition }
  | { kind: 'optionalChoice'; amount: number }
  | { kind: 'damageCounters'; perCounterDamage: number; condition?: TcgBattleCoinCondition }
  | { kind: 'count'; perUnitDamage: number; source: TcgBattleCountSource; condition?: TcgBattleCoinCondition }
  | { kind: 'perHead'; amount: number }
  | { kind: 'perTail'; amount: number }

export type TcgBattleEnergyDiscardRule = {
  target: 'self' | 'opponent'
  amount: number | 'all' | 'heads' | 'choice' | 'opponentPokemon'
  condition?: TcgBattleCoinCondition
  optional?: boolean
  requiresEnergyType?: TcgBattleEnergyType
  targetSubtype?: 'ex' | 'stage2'
  targetEvolved?: boolean
}

export type TcgBattleEnergyDiscardResolution = {
  target: 'self' | 'opponent'
  amount: number
  requestedAmount: number | 'all' | 'heads' | 'choice' | 'opponentPokemon'
}

export type TcgBattleStatusRule = {
  target: 'self' | 'opponent'
  statuses: TcgBattleStatusCondition[]
  condition?: TcgBattleCoinCondition
  targetSubtype?: 'ex' | 'stage2'
  requiresNamedPokemon?: { side: 'own' | 'opponent'; names: string[] }
  requiresPokemonType?: { side: 'own' | 'opponent'; type: string }
  requiresOptionalChoice?: boolean
  requiresTargetStatusAbsent?: TcgBattleStatusCondition
  requiresEnergy?: { side: 'own' | 'opponent'; minimum: number; maximum?: number }
  requiresAttackerStatus?: TcgBattleStatusCondition
  requiresTargetSubtype?: string
  requiresAttackerDamaged?: boolean
  requiresAttackerAtFullHp?: boolean
  requiresHandSizeComparison?: 'equal'
  useChosenStatus?: boolean
  useChosenStatusPair?: boolean
}

export type TcgBattleProtectionRule = {
  target: 'self' | 'opponent'
  kind: 'preventAll' | 'preventAllEffects' | 'reduce' | 'preventAtMost' | 'preventAtLeast' | 'halve' | 'coinPreventDamage'
  amount?: number
  attackerOnly?: boolean
  condition?: TcgBattleCoinCondition
  preventOn?: TcgBattleCoinResult
  reflectDamage?: number
  persistent?: boolean
}

export type TcgBattleBenchDamageRule = {
  amount: number
  amountPerHead?: number
  amountPerUnit?: number
  source?: TcgBattleCountSource
  side: 'own' | 'opponent' | 'both'
  zone?: 'bench' | 'front' | 'play'
  ignoreWeaknessResistance?: boolean
  applyWeaknessResistanceOnBench?: boolean
  ignoreWeaknessResistanceOnBench?: boolean
  perTargetCoinFlip?: boolean
  requiresEnergy?: { side: 'own' | 'opponent'; minimum: number }
  maxTargets?: number
  maxTargetsFrom?: TcgBattleCountSource
  condition?: TcgBattleCoinCondition
  excludeTarget?: boolean
  selectedEnergyType?: boolean
  typeFilter?: { include?: string[]; exclude?: string[] }
  subtypeFilter?: { include?: string[]; exclude?: string[] }
}

export type TcgBattleCounterDamageRule =
  | { amount: number; target: 'self' | 'opponent' | 'target'; deltaTargetBonus?: number }
  | { amountPerCounter: number; target: 'distributed' }
  | {
      amount: number
      side: 'own' | 'opponent' | 'both'
      maxTargets?: number
      condition?: TcgBattleCoinCondition
      requiresEnergy?: { side: 'own' | 'opponent'; minimum: number }
      zone?: 'bench' | 'front' | 'play'
      onlyDamaged?: boolean
      excludeAttacker?: boolean
      excludeTarget?: boolean
      typeFilter?: { include?: string[]; exclude?: string[] }
      perTargetCoinFlip?: boolean
    }
  | { amountPerTargetRetreatCost: number; side: 'own' | 'opponent' | 'both'; zone?: 'bench' | 'front' | 'play'; condition?: TcgBattleCoinCondition }
  | {
      amount: number
      side: 'own' | 'opponent' | 'both'
      names: string[]
      zone: 'bench' | 'play'
      condition?: TcgBattleCoinCondition
    }
  | { amountPerHead: number; side: 'own' | 'opponent' | 'both'; zone?: 'bench' | 'play'; condition?: TcgBattleCoinCondition; excludeAttacker?: boolean; excludeTarget?: boolean }
  | { amountPerUnit: number; source: TcgBattleCountSource; target: 'self' | 'opponent' | 'target'; condition?: TcgBattleCoinCondition; maxUnits?: number; requiresTargetStatus?: TcgBattleStatusCondition }
  | { target: 'opponent'; amountToLeaveHp: number }
  | { target: 'self'; amountToLeaveHp: number }
  | { target: 'opponent'; amountToLeaveHpOfAttacker: true }

export type TcgBattleHealingRule =
  | { amount: number | 'all'; target: 'self' | 'opponent'; condition?: TcgBattleCoinCondition; amountPerHead?: number; amountPerUnit?: number; source?: TcgBattleCountSource; requiresOwnBench?: boolean; requiresTargetStatus?: TcgBattleStatusCondition }
  | { target: 'selectedOwnBench'; amount: number | 'all'; amountPerUnit?: number; source?: TcgBattleCountSource; condition?: TcgBattleCoinCondition; sameTypeAsAttacker?: boolean; requiresTargetStatus?: TcgBattleStatusCondition }
  | { target: 'selectedOwnPokemon'; amount: number | 'all'; condition?: TcgBattleCoinCondition; requiresTargetStatus?: TcgBattleStatusCondition }
  | { amount: number | 'all'; side: 'own' | 'opponent' | 'both'; maxTargets?: number; condition?: TcgBattleCoinCondition; zone?: 'bench' | 'front' | 'play'; amountPerHead?: number; sameTypeAsAttacker?: boolean; excludeAttacker?: boolean; nameContains?: string; requiresTargetStatus?: TcgBattleStatusCondition }
  | { target: 'self' | 'opponent'; amountFrom: 'damageDealt' | 'counterDamageDealt' | 'halfDamageDealtRoundedUp'; condition?: TcgBattleCoinCondition; requiresTargetStatus?: TcgBattleStatusCondition }

export type TcgBattleEnergyGainRule = {
  target: 'self' | 'opponent'
  amount?: number
  amountPerHead?: number
  amountPerUnit?: number
  maxAmount?: number
  source?: TcgBattleCountSource
  condition?: TcgBattleCoinCondition
  requiresSourceSurvival?: boolean
}

export type TcgBattleAttackChoice =
  | { kind: 'copiedAttack'; attackIndex: number; followUp?: TcgBattleAttackChoice }
  | { kind: 'damageCounterTransfer'; sourceCardId?: string }
  | { kind: 'discardHandCards'; cardIds: string[] }
  | { kind: 'discardPokemonToHand'; cardId?: string; cardIds?: string[] }
  | { kind: 'ownPokemon'; cardId: string }
  | { kind: 'counterDistribution'; assignments: Array<{ cardId: string; counters: number }> }
  | { kind: 'disabledAttack'; attackIndex: number }
  | { kind: 'benchSwitch'; cardId: string }
  | { kind: 'skipBenchSwitch' }
  | { kind: 'deckPokemon'; cardIds: string[] }
  | { kind: 'optionalBonus'; enabled: boolean }
  | { kind: 'statusCondition'; status: TcgBattleStatusCondition }
  | { kind: 'statusPair'; first: 'burned' | 'poisoned'; second: 'asleep' | 'confused' }
  | { kind: 'discardPokemon'; side: TcgBattleSide; cardId: string }
  | { kind: 'energyAmount'; amount: number }
  | { kind: 'typeChange'; type: TcgBattleEnergyType }
  | {
      kind: 'textureMagic'
      resistanceType?: TcgBattleEnergyType
      weaknessType?: TcgBattleEnergyType
    }

export type TcgBattleChoiceRequirement =
  | 'copyAttack'
  | 'damageCounterTransfer'
  | 'discardHandCards'
  | 'discardPokemonToHand'
  | 'ownPokemon'
  | 'counterDistribution'
  | 'disableAttack'
  | 'discardPokemon'
  | 'deckPokemon'
  | 'optionalBonus'
  | 'opponentBench'
  | 'ownBench'
  | 'optionalOpponentBench'
  | 'optionalOwnBench'
  | 'statusCondition'
  | 'statusPair'
  | 'energyAmount'
  | 'typeChange'
  | 'textureMagic'

export type TcgBattleSpecialRule =
  | { kind: 'searchDeckPokemon'; maxCount: number; maxCountFrom?: TcgBattleCountSource; basicOnly?: boolean; includeBasic?: boolean; includeNames?: string[]; includeNameContains?: string[]; includeTypes?: string[]; includeSubtypes?: string[]; includeResistanceTypes?: string[]; destination?: 'bench' | 'hand'; random?: boolean; condition?: TcgBattleCoinCondition; treatAsBasic?: boolean; damageCountersOnSearch?: number; oneOfEachName?: boolean }
  | { kind: 'revealTopDeckPokemon'; amount: number; includeSubtypes: string[] }
  | { kind: 'drawCards'; target: 'self' | 'opponent'; amount?: number; amountPerHead?: number; amountPerUnit?: number; untilHandSize?: number; source?: TcgBattleCountSource; shuffleHandIntoDeck?: boolean; condition?: TcgBattleCoinCondition; requiresDiscardChoice?: boolean }
  | { kind: 'shuffleRandomHandCardIntoDeck'; target: 'self' | 'opponent'; amountPerHead?: number; condition?: TcgBattleCoinCondition; revealSelected?: boolean }
  | { kind: 'discardRandomHandCard'; target: 'self' | 'opponent'; amountPerHead?: number; amountPerTail?: number; untilHandSize?: number; condition?: TcgBattleCoinCondition }
  | { kind: 'discardSelectedHandPokemon' }
  | { kind: 'recoverRandomPokemonFromDiscardToHand'; amountPerHead: number }
  | { kind: 'recoverPokemonFromDiscardToHand'; includeSubtypes?: string[]; includeNames?: string[]; includeTypes?: string[]; maxCount?: number; upTo?: boolean; condition?: TcgBattleCoinCondition }
  | { kind: 'returnOwnBenchToHand' }
  | { kind: 'returnOwnPokemonToDeck' }
  | { kind: 'returnTargetToHand'; condition?: TcgBattleCoinCondition }
  | { kind: 'knockOutTarget'; requiresAnyTargetStatus?: boolean }
  | { kind: 'transferDamageCounters'; maxCounters: number; sourceZone?: 'bench' | 'play' }
  | { kind: 'transferDamageCountersFromOwnSide'; maxCountersPerPokemon: number }
  | { kind: 'shuffleTargetIntoDeck'; requiresOpponentBench?: boolean; targetZone?: 'front' | 'bench' }
  | { kind: 'shuffleDiscardPokemonIntoDeck'; maxCount: number }
  | { kind: 'revealHand'; target: 'self' | 'opponent' }
  | { kind: 'millCards'; target: 'self' | 'opponent'; amount: number; amountPerHead?: number; amountPerOwnEnergy?: number; amountPerUnit?: number; source?: TcgBattleCountSource; condition?: TcgBattleCoinCondition }
  | {
      kind: 'switch'
      target: 'self' | 'opponent'
      optional?: boolean
      condition?: TcgBattleCoinCondition
      ifTargetSurvives?: boolean
      ifCounterDamage?: boolean
      beforeDamage?: boolean
      poisonAfterSwitch?: boolean
    }
  | { kind: 'disableAttack'; condition?: TcgBattleCoinCondition; targetBasicOnly?: boolean }
  | { kind: 'buffAttack'; attackName?: string; attackNames?: string[]; target?: 'self' | 'opponent' | 'switchedOwn'; baseDamage?: number; damageBonus?: number; damageMultiplier?: number; selfDamageMultiplier?: number; condition?: TcgBattleCoinCondition }
  | { kind: 'buffDefendingPokemon'; damageBonus: number }
  | { kind: 'blockTargeting'; condition?: TcgBattleCoinCondition; targetMaxHpAtMost?: number }
  | { kind: 'cannotAttack'; target?: 'self' | 'opponent'; condition?: TcgBattleCoinCondition }
  | { kind: 'disableSelfAttack'; attackName: string; condition?: TcgBattleCoinCondition }
  | { kind: 'preventRetreat'; target?: 'self' | 'opponent'; condition?: TcgBattleCoinCondition; untilSourceLeaves?: boolean; untilTargetLeaves?: boolean; sourceLeavesClears?: boolean }
  | { kind: 'preventSwitch'; condition?: TcgBattleCoinCondition; sourceLeavesClears?: boolean }
  | { kind: 'clearStatus'; target: 'self' | 'opponent'; statuses: TcgBattleStatusCondition[] }
  | { kind: 'clearStatusOnSide'; side: 'own' | 'opponent'; statuses: TcgBattleStatusCondition[] }
  | { kind: 'preventStatus'; target: 'self' | 'opponent'; statuses: TcgBattleStatusCondition[]; whileActive?: boolean }
  | { kind: 'setStatus'; target: 'self' | 'opponent'; statuses: TcgBattleStatusCondition[] }
  | { kind: 'endure'; condition?: TcgBattleCoinCondition }
  | { kind: 'attackFailsOnTails'; condition?: TcgBattleCoinCondition }
  | { kind: 'grow'; maxHp: number; attackName: string; baseDamage: number; condition?: TcgBattleCoinCondition }
  | { kind: 'swapDamageCounters'; condition?: TcgBattleCoinCondition }
  | { kind: 'transferAllDamageCounters' }
  | { kind: 'reviveDiscardPokemon'; side?: 'self' | 'opponent' }
  | { kind: 'changeWeakness'; condition?: TcgBattleCoinCondition }
  | { kind: 'changeResistance'; condition?: TcgBattleCoinCondition }
  | { kind: 'changeType'; condition?: TcgBattleCoinCondition }
  | { kind: 'textureMagic' }
  | { kind: 'destinyBond' }
  | { kind: 'discardEnergyOnKnockout' }
  | { kind: 'mirrorLastDamage' }
  | { kind: 'reflectDamage'; damageMultiplier?: number; reflectFixedDamage?: number; preventIncomingOnHeads?: boolean; coinGate?: TcgBattleCoinCondition }
  | { kind: 'placeMarker'; marker: 'lightningRod' | 'shockWave' }
  | { kind: 'markerDamage'; marker: 'lightningRod' | 'shockWave'; amount: number }
  | { kind: 'copyAttack'; coinGate?: TcgBattleCoinCondition; preserveExtraCosts: boolean }

export type TcgBattleStatusResolution = {
  target: 'self' | 'opponent'
  statuses: TcgBattleStatusCondition[]
}

export type TcgBattleIncomingAttackModifier =
  | { kind: 'preventAll'; remainingOpponentTurns: number }
  | { kind: 'preventAllEffects'; remainingOpponentTurns: number }
  | { kind: 'reduce'; amount: number; remainingOpponentTurns: number; attackerId?: string }
  | { kind: 'preventAtMost'; amount: number; remainingOpponentTurns: number }
  | { kind: 'preventAtLeast'; amount: number; remainingOpponentTurns: number }
  | { kind: 'halve'; remainingOpponentTurns: number }
  | { kind: 'coinPreventDamage'; preventOn: TcgBattleCoinResult; remainingOpponentTurns: number; persistent?: boolean; reflectDamage?: number }

export interface TcgBattleTemporaryEffects {
  disabledAttack?: { attackIndex: number; remainingTurns: number }
  cannotAttack?: { remainingTurns: number }
  cannotRetreat?: { remainingTurns: number; sourceId?: string; untilSourceLeaves?: boolean; untilTargetLeaves?: boolean }
  cannotSwitch?: { remainingTurns: number; sourceId?: string; untilSourceLeaves?: boolean }
  endure?: { remainingTurns: number }
  preventStatusConditions?: { statuses: TcgBattleStatusCondition[]; remainingTurns: number; whileActive?: boolean }
  attackFailsOnTails?: true
  cannotTarget?: { targetId: string; remainingTurns: number }
  nextAttackBuff?: { attackName: string; attackNames?: string[]; baseDamage?: number; damageBonus?: number; damageMultiplier?: number; selfDamageMultiplier?: number; remainingTurns: number }
  attackBaseDamageOverrides?: { attackName: string; baseDamage: number }[]
  originalMaxHp?: number
  healedTurnNumber?: number
  healedBySide?: TcgBattleSide
  weaknessType?: TcgBattleEnergyType
  resistanceType?: TcgBattleEnergyType
  battleType?: TcgBattleEnergyType
  destinyBond?: { remainingTurns: number }
  reflectDamage?: { remainingTurns: number; damageMultiplier?: number; reflectFixedDamage?: number; preventIncomingOnHeads?: boolean; coinGate?: TcgBattleCoinCondition }
  weaknessValue?: string | null
  discardEnergyOnKnockout?: { remainingTurns: number }
  lastIncomingAttackDamage?: number
  lastNightEyesAttackBySide?: Partial<Record<TcgBattleSide, number>>
  lastAttackHitBySide?: Partial<Record<TcgBattleSide, number>>
  attackDamageTakenBuff?: { sourceSide: TcgBattleSide; damageBonus: number; remainingTurns: number }
}

export interface TcgBattleAttackEffect {
  damage: TcgBattleDamageRule
  coinFlipCount?: number
  coinFlipSource?: TcgBattleCountSource
  flipUntilTails?: boolean
  selfDamage?: TcgBattleSelfDamageRule[]
  selfKnockOut?: boolean
  energyDiscard?: TcgBattleEnergyDiscardRule[]
  requiresEnergyDiscardToMatchHeads?: boolean
  status?: TcgBattleStatusRule[]
  benchDamage?: TcgBattleBenchDamageRule[]
  counterDamage?: TcgBattleCounterDamageRule[]
  healing?: TcgBattleHealingRule[]
  energyGain?: TcgBattleEnergyGainRule[]
  protection?: TcgBattleProtectionRule[]
  targetScope?: 'front' | 'bench' | 'any' | 'all'
  targetMustBeDamaged?: boolean
  targetMustBeUndamaged?: boolean
  targetMustBeLowestRemainingHp?: boolean
  targetMustHaveSubtype?: string
  targetMustNotHaveSubtype?: string
  attackerMustBeDamaged?: boolean
  targetMustHaveDeltaMark?: boolean
  minimumExtraEnergyDiscard?: number
  ignoreWeaknessResistance?: boolean
  ignoreWeakness?: boolean
  ignoreResistance?: boolean
  ignoreTargetDamageModifiers?: boolean
  choiceRequirement?: TcgBattleChoiceRequirement
  choiceEnergyMax?: number
  choiceEnergyType?: TcgBattleEnergyType
  choiceCounterCount?: number
  choiceCounterCountFrom?: TcgBattleCountSource
  choiceHandCardCount?: number
  allowWhileAsleep?: boolean
  ignoreWeaknessResistanceOnBench?: boolean
  special?: TcgBattleSpecialRule[]
}

function shouldIgnoreTcgWeaknessAndResistance(text: string): boolean {
  return (
    /(?:this attack(?:'s)? damage|this damage) (?:isn't|is not) affected by weakness(?:,| or| and) resistance\b/.test(text) ||
    /(?:don't|do not) apply weakness and resistance for (?:this attack|this damage)\b/.test(text)
  )
}

export type TcgBattleAttack = TcgCardAttack & {
  battleEffect?: TcgBattleAttackEffect
}

export const TCG_BATTLE_FORMATS: Record<
  TcgBattleDeckFormat,
  { label: string; deckCostLimit: number; startingEnergy: number; energyCap: number; chargeGain: number }
> = {
  baby: { label: 'Baby', deckCostLimit: 30, startingEnergy: 5, energyCap: 12, chargeGain: 2 },
  champions: { label: 'Champions', deckCostLimit: 55, startingEnergy: 5, energyCap: 16, chargeGain: 2 },
  masters: { label: 'Masters', deckCostLimit: 85, startingEnergy: 6, energyCap: 22, chargeGain: 2 },
}

export interface TcgBattleCardSummary {
  id: string
  name: string
  hp: number
  types: string[]
  subtypes: string[]
  evolvesFrom?: string | null
  evolvesTo?: string[]
  image: string
  cost: number
  convertedRetreatCost: number
  attacks: TcgBattleAttack[]
  weaknesses: { type: string; value: string }[]
  resistances: { type: string; value: string }[]
}

export interface TcgBattleCardState extends TcgBattleCardSummary {
  instanceId: string
  currentHp: number
  statusConditions?: TcgBattleStatusCondition[]
  incomingAttackModifier?: TcgBattleIncomingAttackModifier
  temporaryEffects?: TcgBattleTemporaryEffects
  markers?: Array<'lightningRod' | 'shockWave'>
}

export interface TcgBattleSideState {
  deck: TcgBattleCardSummary[]
  hand: TcgBattleCardState[]
  front: TcgBattleCardState[]
  back: TcgBattleCardState[]
  discard: TcgBattleCardState[]
  energy: number
  selectedEnergy?: TcgBattleEnergyType
}

export interface TcgBattleTrainerCard {
  name: string
  icon?: string
  banner?: string
  title?: string
}

export type TcgBattleEffectEvent =
  | { id: string; kind: 'switch'; side: TcgBattleSide; sourceId: string; targetId: string }
  | { id: string; kind: 'control'; sourceId: string; targetId: string; label: string }
  | { id: string; kind: 'type'; sourceId: string; targetId: string; label: string }
  | { id: string; kind: 'marker'; sourceId: string; targetId: string; label: string }
  | { id: string; kind: 'copy'; sourceId: string; targetId: string; label: string }
  | { id: string; kind: 'energy'; side: TcgBattleSide; sourceId: string; amount: number }

export type TcgBattleLastAction = {
  id: string
  side: TcgBattleSide
  kind:
    | 'arrange'
    | 'attack'
    | 'retreat'
    | 'charge'
    | 'promote'
    | 'surrender'
    | 'timeout'
  attackerId?: string
  attackIndex?: number
  targetId?: string
  frontId?: string
  backId?: string
  cardId?: string
}

export interface TcgBattleState {
  userId: string
  encounterId: string
  battleMode?: TcgBattleMode
  matchId?: string
  format: TcgBattleDeckFormat
  phase: TcgBattlePhase
  turnNumber: number
  activeSide: TcgBattleSide
  player: TcgBattleSideState
  opponent: TcgBattleSideState
  pendingPromotion?: TcgBattleSide
  consecutivePasses: number
  lastOpponentAttackKnockout?: Partial<Record<TcgBattleSide, { turnNumber: number; knockedOut: boolean }>>
  winner?: TcgBattleSide | 'tie'
  lastDamageEvent?: {
    id: string
    sourceId: string
    targetId: string
    targetSide: TcgBattleSide
    damage: number
    reason?: 'attack' | 'self' | 'confusion' | 'status'
  }
  lastDamageEvents?: {
    id: string
    sourceId: string
    targetId: string
    targetSide: TcgBattleSide
    damage: number
    reason?: 'attack' | 'self' | 'confusion' | 'status'
  }[]
  lastCoinFlipEvent?: {
    id: string
    sourceId: string
    side: TcgBattleSide
    results: TcgBattleCoinResult[]
    heads: number
    tails: number
  }
  lastCoinFlipEvents?: {
    id: string
    sourceId: string
    side: TcgBattleSide
    results: TcgBattleCoinResult[]
    heads: number
    tails: number
  }[]
  lastStatusEvent?: {
    id: string
    sourceId: string
    targetId: string
    targetSide: TcgBattleSide
    statuses: TcgBattleStatusCondition[]
  }
  lastStatusEvents?: {
    id: string
    sourceId: string
    targetId: string
    targetSide: TcgBattleSide
    statuses: TcgBattleStatusCondition[]
  }[]
  lastEffectEvents?: TcgBattleEffectEvent[]
  log: string[]
  playerTrainer?: TcgBattleTrainerCard
  enemyTrainer?: TcgBattleTrainerCard
  ready?: Record<TcgBattleSide, boolean>
  revision?: number
  lastAction?: TcgBattleLastAction
  deadlineAt?: number
  pendingPromotions?: TcgBattleSide[]
  resumeSideAfterPromotion?: TcgBattleSide
  outcomeReason?: 'knockout' | 'stall' | 'surrender' | 'timeout'
  noContest?: boolean
  startedAt: number
  updatedAt: number
}

export interface TcgPvpSharedBattleState extends TcgBattleState {
  battleMode: 'pvp'
  matchId: string
  participantIds: Record<TcgBattleSide, string>
  ready: Record<TcgBattleSide, boolean>
  revision: number
  deadlineAt: number
  statsFinalized?: boolean
  acknowledgedBy?: string[]
}

export function flipTcgBattleSide(side: TcgBattleSide): TcgBattleSide {
  return side === 'player' ? 'opponent' : 'player'
}

function cloneTcgBattlePerspectiveSide(
  side: TcgBattleSideState,
): TcgBattleSideState {
  return {
    ...side,
    deck: [...side.deck],
    hand: [...side.hand],
    front: [...side.front],
    back: [...side.back],
    discard: [...side.discard],
  }
}

function flipTcgBattleEffectEvent(
  event: TcgBattleEffectEvent,
): TcgBattleEffectEvent {
  if ('side' in event) {
    return { ...event, side: flipTcgBattleSide(event.side) }
  }
  return { ...event }
}

export function toTcgPvpPerspectiveState(
  shared: TcgPvpSharedBattleState,
  viewerUserId: string,
): TcgBattleState | null {
  const isCanonicalPlayer = shared.participantIds.player === viewerUserId
  const isCanonicalOpponent = shared.participantIds.opponent === viewerUserId
  if (!isCanonicalPlayer && !isCanonicalOpponent) return null

  const shouldFlip = isCanonicalOpponent
  const ownSide = cloneTcgBattlePerspectiveSide(
    shouldFlip ? shared.opponent : shared.player,
  )
  const opposingSide = cloneTcgBattlePerspectiveSide(
    shouldFlip ? shared.player : shared.opponent,
  )

  // The opponent's unused deck, private arrangement, and selected Energy remain
  // server-only until the relevant public battle state makes them visible.
  opposingSide.deck = []
  opposingSide.hand = []
  if (shared.phase === 'arranging') {
    opposingSide.front = []
    opposingSide.back = []
  }
  if (shared.turnNumber < 15) opposingSide.selectedEnergy = undefined

  const flipSide = (side: TcgBattleSide) =>
    shouldFlip ? flipTcgBattleSide(side) : side
  const { participantIds: _participantIds, ...publicState } = shared
  const lastOpponentAttackKnockout = shouldFlip
    ? {
        player: shared.lastOpponentAttackKnockout?.opponent,
        opponent: shared.lastOpponentAttackKnockout?.player,
      }
    : shared.lastOpponentAttackKnockout

  return {
    ...publicState,
    userId: viewerUserId,
    player: ownSide,
    opponent: opposingSide,
    activeSide: flipSide(shared.activeSide),
    pendingPromotion: shared.pendingPromotion
      ? flipSide(shared.pendingPromotion)
      : undefined,
    pendingPromotions: shared.pendingPromotions?.map(flipSide),
    resumeSideAfterPromotion: shared.resumeSideAfterPromotion
      ? flipSide(shared.resumeSideAfterPromotion)
      : undefined,
    lastOpponentAttackKnockout,
    winner:
      shared.winner === 'tie' || !shared.winner
        ? shared.winner
        : flipSide(shared.winner),
    ready: {
      player: shouldFlip ? shared.ready.opponent : shared.ready.player,
      opponent: shouldFlip ? shared.ready.player : shared.ready.opponent,
    },
    playerTrainer: shouldFlip ? shared.enemyTrainer : shared.playerTrainer,
    enemyTrainer: shouldFlip ? shared.playerTrainer : shared.enemyTrainer,
    lastAction: shared.lastAction
      ? { ...shared.lastAction, side: flipSide(shared.lastAction.side) }
      : undefined,
    lastDamageEvent: shared.lastDamageEvent
      ? {
          ...shared.lastDamageEvent,
          targetSide: flipSide(shared.lastDamageEvent.targetSide),
        }
      : undefined,
    lastDamageEvents: shared.lastDamageEvents?.map((event) => ({
      ...event,
      targetSide: flipSide(event.targetSide),
    })),
    lastCoinFlipEvent: shared.lastCoinFlipEvent
      ? {
          ...shared.lastCoinFlipEvent,
          side: flipSide(shared.lastCoinFlipEvent.side),
        }
      : undefined,
    lastCoinFlipEvents: shared.lastCoinFlipEvents?.map((event) => ({
      ...event,
      side: flipSide(event.side),
    })),
    lastStatusEvent: shared.lastStatusEvent
      ? {
          ...shared.lastStatusEvent,
          targetSide: flipSide(shared.lastStatusEvent.targetSide),
        }
      : undefined,
    lastStatusEvents: shared.lastStatusEvents?.map((event) => ({
      ...event,
      targetSide: flipSide(event.targetSide),
    })),
    lastEffectEvents: shared.lastEffectEvents?.map((event) =>
      shouldFlip ? flipTcgBattleEffectEvent(event) : { ...event },
    ),
  }
}

const TCG_BATTLE_ENERGY_TYPES: readonly TcgBattleEnergyType[] = [
  'Grass',
  'Fire',
  'Water',
  'Lightning',
  'Psychic',
  'Fighting',
  'Darkness',
  'Metal',
  'Fairy',
  'Dragon',
  'Colorless',
]

export function normalizeTcgBattleEnergyType(value: unknown): TcgBattleEnergyType | null {
  if (typeof value !== 'string') return null
  return TCG_BATTLE_ENERGY_TYPES.includes(value as TcgBattleEnergyType)
    ? (value as TcgBattleEnergyType)
    : null
}

function getTcgBattleGlobalEnergyReductions(state: TcgBattleState): Partial<Record<TcgBattleEnergyType, number>> {
  if (state.turnNumber < 15) return {}
  const reductions: Partial<Record<TcgBattleEnergyType, number>> = {}
  for (const energyType of [state.player.selectedEnergy, state.opponent.selectedEnergy]) {
    if (!energyType) continue
    reductions[energyType] = (reductions[energyType] || 0) + 1
  }
  return reductions
}

export function getEffectiveTcgBattleAttackCost(state: TcgBattleState, attack: TcgBattleAttack): number {
  const costs = attack.cost || []
  if (costs.length === 0) return attack.convertedEnergyCost ?? 0

  const reductions = getTcgBattleGlobalEnergyReductions(state)
  if (Object.keys(reductions).length === 0) return costs.length

  let reduced = 0
  const used = {} as Partial<Record<TcgBattleEnergyType, number>>
  for (const costType of costs) {
    const normalizedType = normalizeTcgBattleEnergyType(costType)
    if (!normalizedType) continue
    const available = reductions[normalizedType] || 0
    const alreadyUsed = used[normalizedType] || 0
    if (available > alreadyUsed) {
      used[normalizedType] = alreadyUsed + 1
      reduced += 1
    }
  }

  return Math.max(0, costs.length - reduced)
}

export interface TcgBattleDeckValidation {
  valid: boolean
  errors: string[]
  cards: TcgBattleCardSummary[]
  totalCost: number
}

export function normalizeTcgDeckFormat(value: unknown): TcgBattleDeckFormat | null {
  return value === 'baby' || value === 'champions' || value === 'masters' ? value : null
}

export async function buildTcgBattleCardSummary(cardId: string): Promise<TcgBattleCardSummary | null> {
  const card = await getTcgCardDetailById(cardId)
  if (!card || !isTcgBattleCardLegal(card)) return null
  const setId = card.id.slice(0, card.id.lastIndexOf('-'))
  const attacks = getSupportedTcgBattleAttacks(card.attacks || [], setId)

  return {
    id: card.id,
    name: card.name,
    hp: Number.parseInt(card.hp || '0', 10),
    types: card.types || [],
    subtypes: card.subtypes || [],
    evolvesFrom: card.evolvesFrom,
    evolvesTo: card.evolvesTo || [],
    image: card.images.large || card.images.small,
    cost: calculateTcgBattleCardCost(card),
    convertedRetreatCost: card.convertedRetreatCost ?? 1,
    attacks,
    weaknesses: card.weaknesses || [],
    resistances: card.resistances || [],
  }
}

export function isTcgBattleCardLegal(card: TcgCardDetail): boolean {
  const hp = Number.parseInt(card.hp || '0', 10)
  const setId = card.id.slice(0, card.id.lastIndexOf('-'))
  const supportedAttacks = getSupportedTcgBattleAttacks(card.attacks || [], setId)
  return (
    card.supertype === 'Pokémon' &&
    Number.isFinite(hp) &&
    hp > 0 &&
    (card.types?.length || 0) > 0 &&
    supportedAttacks.length > 0 &&
    Boolean(card.images?.small || card.images?.large)
  )
}

export function calculateTcgBattleCardCost(
  card: Pick<TcgCardDetail, 'name' | 'subtypes' | 'evolvesTo'>,
): number {
  const subtypes = (card.subtypes || []).map((subtype) => subtype.toUpperCase())
  const name = card.name.toUpperCase()
  const special15 = ['VMAX', 'VSTAR', 'MEGA', 'TAG TEAM', 'LEGEND', 'V-UNION', 'ETERNAMAX']
  if (special15.some((marker) => subtypes.includes(marker) || name.includes(marker))) return 15

  const special10 = ['EX', 'GX', 'V', 'RADIANT']
  if (special10.some((marker) => subtypes.includes(marker) || name.includes(` ${marker}`))) return 10

  if (subtypes.includes('STAGE 2')) return 5
  if (subtypes.includes('STAGE 1')) return 3
  if (subtypes.includes('BASIC')) return (card.evolvesTo?.length || 0) > 0 ? 1 : 5
  return 5
}

export async function validateTcgBattleDeck(
  cardIds: string[],
  collection: Record<string, number>,
  format: TcgBattleDeckFormat,
): Promise<TcgBattleDeckValidation> {
  const errors: string[] = []
  const uniqueIds = Array.from(new Set(cardIds.filter(Boolean)))
  if (uniqueIds.length !== 15 || cardIds.length !== 15) {
    errors.push('Deck must contain exactly 15 unique cards.')
  }

  const cards: TcgBattleCardSummary[] = []
  for (const cardId of uniqueIds) {
    if ((collection[cardId] || 0) <= 0) {
      errors.push(`${cardId} is not in your collection.`)
      continue
    }
    const card = await buildTcgBattleCardSummary(cardId)
    if (!card) {
      errors.push(`${cardId} is not a legal battle card.`)
      continue
    }
    cards.push(card)
  }

  const totalCost = cards.reduce((sum, card) => sum + card.cost, 0)
  const limit = TCG_BATTLE_FORMATS[format].deckCostLimit
  if (totalCost > limit) {
    errors.push(`Deck cost ${totalCost} exceeds the ${limit} ${TCG_BATTLE_FORMATS[format].label} limit.`)
  }

  return { valid: errors.length === 0, errors, cards, totalCost }
}

export async function autoBuildTcgBattleDeck(
  collection: Record<string, number>,
  format: TcgBattleDeckFormat,
): Promise<TcgBattleDeckValidation> {
  const candidates: TcgBattleCardSummary[] = []
  for (const [cardId, qty] of Object.entries(collection)) {
    if (qty <= 0) continue
    const summary = await buildTcgBattleCardSummary(cardId)
    if (summary) candidates.push(summary)
  }

  const limit = TCG_BATTLE_FORMATS[format].deckCostLimit
  const candidatesByCost = new Map<number, TcgBattleCardSummary[]>()
  for (const card of candidates) {
    const cardsAtCost = candidatesByCost.get(card.cost) || []
    cardsAtCost.push(card)
    candidatesByCost.set(card.cost, cardsAtCost)
  }

  // Only the best fifteen cards at each cost can contribute to a fifteen-card
  // deck. Keeping that bounded pool makes the format-aware selection cheap
  // even when a trainer owns the full catalog.
  const candidatePool = Array.from(candidatesByCost.values()).flatMap((cards) =>
    [...cards]
      .sort((a, b) => getCardBattleScore(b) - getCardBattleScore(a))
      .slice(0, 15),
  )
  type DeckState = { score: number; cards: TcgBattleCardSummary[] }
  const states: Array<Array<DeckState | undefined>> = Array.from(
    { length: 16 },
    () => Array.from({ length: limit + 1 }),
  )
  states[0][0] = { score: 0, cards: [] }

  for (const card of candidatePool) {
    for (let count = 14; count >= 0; count -= 1) {
      for (let currentCost = 0; currentCost + card.cost <= limit; currentCost += 1) {
        const state = states[count][currentCost]
        if (!state) continue
        const nextCost = currentCost + card.cost
        const nextScore = state.score + getCardBattleScore(card)
        const existing = states[count + 1][nextCost]
        if (!existing || nextScore > existing.score) {
          states[count + 1][nextCost] = {
            score: nextScore,
            cards: [...state.cards, card],
          }
        }
      }
    }
  }

  let selected: TcgBattleCardSummary[] = []
  let totalCost = 0
  let bestScore = -Infinity
  for (let cost = 0; cost <= limit; cost += 1) {
    const state = states[15][cost]
    if (!state) continue
    if (state.score > bestScore || (state.score === bestScore && cost > totalCost)) {
      selected = state.cards
      totalCost = cost
      bestScore = state.score
    }
  }

  const errors = selected.length === 15 ? [] : ['Not enough legal owned cards to build this format.']
  return { valid: errors.length === 0, errors, cards: selected, totalCost }
}

export function createTcgBattleCardState(card: TcgBattleCardSummary, index: number): TcgBattleCardState {
  return {
    ...card,
    instanceId: `${card.id}:${index}:${Math.random().toString(36).slice(2, 8)}`,
    currentHp: card.hp,
  }
}

export function drawTcgBattleCards(cards: TcgBattleCardSummary[], count: number): TcgBattleCardState[] {
  const pool = [...cards]
  const drawn: TcgBattleCardState[] = []
  while (pool.length > 0 && drawn.length < count) {
    const index = Math.floor(Math.random() * pool.length)
    const [card] = pool.splice(index, 1)
    drawn.push(createTcgBattleCardState(card, drawn.length))
  }
  return drawn
}

export function arrangeOpponentTcgBattleCards(cards: TcgBattleCardState[]) {
  const sorted = [...cards].sort((a, b) => getCardBattleScore(b) - getCardBattleScore(a))
  return { front: sorted.slice(0, 3), back: sorted.slice(3, 6) }
}

export function getAllowedTcgBattleAttackCost(turnNumber: number): number {
  if (turnNumber >= 10) return Number.POSITIVE_INFINITY
  if (turnNumber >= 7) return 4
  if (turnNumber >= 5) return 3
  if (turnNumber >= 3) return 2
  return 1
}

export function getTcgBattleCardUnlockTurn(cardCost: number): number {
  if (cardCost >= 15) return 10
  if (cardCost >= 10) return 7
  return 1
}

export function isTcgBattleCardUnlocked(cardCost: number, turnNumber: number): boolean {
  return turnNumber >= getTcgBattleCardUnlockTurn(cardCost)
}

export function getTcgBattleCardUnlockTurnForCard(card: Pick<TcgBattleCardSummary, 'cost' | 'subtypes'>): number {
  const subtypeSet = new Set((card.subtypes || []).map((entry) => entry.toUpperCase()))
  const stageTurn = subtypeSet.has('STAGE 2') ? 5 : subtypeSet.has('STAGE 1') ? 3 : 1
  return Math.max(stageTurn, getTcgBattleCardUnlockTurn(card.cost))
}

export function isTcgBattleSummaryUnlocked(card: Pick<TcgBattleCardSummary, 'cost' | 'subtypes'>, turnNumber: number) {
  return turnNumber >= getTcgBattleCardUnlockTurnForCard(card)
}

export function getNextTcgBattleTurnNumber(
  turnNumber: number,
  currentSide: TcgBattleSide,
  nextSide: TcgBattleSide,
): number {
  return currentSide === 'opponent' && nextSide === 'player' ? turnNumber + 1 : turnNumber
}

export function hasTcgBattleReachedFinalAttackAllowance(turnNumber: number): boolean {
  return getAllowedTcgBattleAttackCost(turnNumber) === Number.POSITIVE_INFINITY
}

export function parseTcgAttackDamage(damage: string): number {
  const normalized = damage.trim()
  return /^\d+$/.test(normalized) ? Number.parseInt(normalized, 10) : 0
}

function normalizeTcgBattleCardName(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '')
}

export function isCleanTcgAttackDamage(damage: string): boolean {
  return /^\d+$/.test(damage.trim())
}

export function getCleanDamageTcgAttacks(attacks: TcgCardAttack[], setId?: string): TcgBattleAttack[] {
  return getSupportedTcgBattleAttacks(attacks, setId)
}

export function getSupportedTcgBattleAttacks(attacks: TcgCardAttack[], setId?: string): TcgBattleAttack[] {
  return attacks.flatMap((attack): TcgBattleAttack[] => {
    const battleEffect = inferTcgBattleAttackEffect(attack, setId)
    return battleEffect ? [{ ...attack, battleEffect }] : []
  })
}

export function inferTcgBattleAttackEffect(attack: TcgCardAttack, setId?: string): TcgBattleAttackEffect | null {
  const text = normalizeTcgAttackText(attack.text || '')
  const ignoreWeaknessResistance = shouldIgnoreTcgWeaknessAndResistance(text)
  const normalizedDamage = normalizeTcgDamageText(attack.damage || '')
  const exactDamage = parseTcgAttackDamage(normalizedDamage)
  const baseDamage = parseTcgAttackBaseDamage(normalizedDamage)
  const applyAttackTextModifiers = (effect: TcgBattleAttackEffect): TcgBattleAttackEffect => {
    const optionalSwitch = text.includes('may switch')
      ? effect.special?.map((rule) => rule.kind === 'switch' ? { ...rule, optional: true } : rule)
      : effect.special
    const modifiedEffect = optionalSwitch ? { ...effect, special: optionalSwitch } : effect
    return ignoreWeaknessResistance
      ? { ...modifiedEffect, ignoreWeaknessResistance: true }
      : modifiedEffect
  }
  if (setId === 'ex7' && attack.name.toLowerCase() === 'hard bone') return null
  const exEffect = inferExTcgBattleAttackEffect(attack, text, baseDamage, setId)
  if (exEffect) {
    return applyAttackTextModifiers(exEffect)
  }
  if (setId === 'dp1') {
    const dp1Effect = inferDp1TcgBattleAttackEffect(attack, text, baseDamage)
    if (dp1Effect) return applyAttackTextModifiers(dp1Effect)
  }
  if (setId === 'dp2') {
    const dp2Effect = inferDp2TcgBattleAttackEffect(attack, text, baseDamage)
    if (dp2Effect) return applyAttackTextModifiers(dp2Effect)
  }
  if (setId === 'dp3') {
    const dp3Effect = inferDp3TcgBattleAttackEffect(attack, text, baseDamage)
    if (dp3Effect) return applyAttackTextModifiers(dp3Effect)
  }
  if (setId === 'dp4') {
    const dp4Effect = inferDp4TcgBattleAttackEffect(attack, text, baseDamage)
    if (dp4Effect) return applyAttackTextModifiers(dp4Effect)
  }
  if (setId === 'dp5') {
    const dp5Effect = inferDp5TcgBattleAttackEffect(attack, text, baseDamage)
    if (dp5Effect) return applyAttackTextModifiers(dp5Effect)
  }
  if (setId === 'dp6') {
    const dp6Effect = inferDp6TcgBattleAttackEffect(attack, text, baseDamage)
    if (dp6Effect) return applyAttackTextModifiers(dp6Effect)
  }
  if (setId === 'dp7') {
    const dp7Effect = inferDp7TcgBattleAttackEffect(attack, text, baseDamage)
    if (dp7Effect) return applyAttackTextModifiers(dp7Effect)
  }
  if (setId === 'pl2') {
    const risingRivalsEffect = inferRisingRivalsTcgBattleAttackEffect(attack, text, baseDamage)
    if (risingRivalsEffect) return applyAttackTextModifiers(risingRivalsEffect)
  }
  if (setId === 'pl3') {
    const supremeVictorsEffect = inferSupremeVictorsTcgBattleAttackEffect(attack, text, baseDamage)
    if (supremeVictorsEffect) return applyAttackTextModifiers(supremeVictorsEffect)
  }
  if (setId === 'pl4') {
    const arceusEffect = inferArceusTcgBattleAttackEffect(attack, text, baseDamage)
    if (arceusEffect) return applyAttackTextModifiers(arceusEffect)
  }
  if (setId === 'hgss1') {
    const heartGoldSoulSilverEffect = inferHeartGoldSoulSilverTcgBattleAttackEffect(attack, text, baseDamage)
    if (heartGoldSoulSilverEffect) return applyAttackTextModifiers(heartGoldSoulSilverEffect)
  }
  if (setId === 'hgss2') {
    const unleashedEffect = inferUnleashedTcgBattleAttackEffect(attack, text, baseDamage)
    if (unleashedEffect) return applyAttackTextModifiers(unleashedEffect)
  }
  if (setId === 'hgss3') {
    const undauntedEffect = inferUndauntedTcgBattleAttackEffect(attack, text, baseDamage)
    if (undauntedEffect) return applyAttackTextModifiers(undauntedEffect)
  }
  if (setId === 'hgss4') {
    const triumphantEffect = inferTriumphantTcgBattleAttackEffect(attack, text, baseDamage)
    if (triumphantEffect) return applyAttackTextModifiers(triumphantEffect)
  }
  if (setId === 'col1') {
    const callOfLegendsEffect = inferCallOfLegendsTcgBattleAttackEffect(attack, text, baseDamage)
    if (callOfLegendsEffect) return applyAttackTextModifiers(callOfLegendsEffect)
  }
  if (setId === 'bw1') {
    const blackWhiteEffect = inferBlackWhiteTcgBattleAttackEffect(attack, baseDamage)
    if (blackWhiteEffect) return applyAttackTextModifiers(blackWhiteEffect)
  }
  if (setId === 'bw2') {
    const emergingPowersEffect = inferEmergingPowersTcgBattleAttackEffect(attack, baseDamage)
    if (emergingPowersEffect) return applyAttackTextModifiers(emergingPowersEffect)
  }
  if (setId === 'bw3') {
    const nobleVictoriesEffect = inferNobleVictoriesTcgBattleAttackEffect(attack, baseDamage)
    if (nobleVictoriesEffect) return applyAttackTextModifiers(nobleVictoriesEffect)
  }
  if (setId === 'bw4') {
    const nextDestiniesEffect = inferNextDestiniesTcgBattleAttackEffect(attack, baseDamage)
    if (nextDestiniesEffect) return applyAttackTextModifiers(nextDestiniesEffect)
  }
  if (setId === 'bw5') {
    const darkExplorersEffect = inferDarkExplorersTcgBattleAttackEffect(attack, baseDamage)
    if (darkExplorersEffect) return applyAttackTextModifiers(darkExplorersEffect)
  }
  if (setId === 'bw6') {
    const dragonsExaltedEffect = inferDragonsExaltedTcgBattleAttackEffect(attack, baseDamage)
    if (dragonsExaltedEffect) return applyAttackTextModifiers(dragonsExaltedEffect)
  }
  if (setId === 'bw7') {
    const boundariesCrossedEffect = inferBoundariesCrossedTcgBattleAttackEffect(attack, baseDamage)
    if (boundariesCrossedEffect) return applyAttackTextModifiers(boundariesCrossedEffect)
  }
  if (setId === 'bw8') {
    const plasmaStormEffect = inferPlasmaStormTcgBattleAttackEffect(attack, baseDamage)
    if (plasmaStormEffect) return applyAttackTextModifiers(plasmaStormEffect)
  }
  if (setId === 'bw9') {
    const plasmaFreezeEffect = inferPlasmaFreezeTcgBattleAttackEffect(attack, baseDamage)
    if (plasmaFreezeEffect) return applyAttackTextModifiers(plasmaFreezeEffect)
  }
  if (setId === 'bw10') {
    const plasmaBlastEffect = inferPlasmaBlastTcgBattleAttackEffect(attack, baseDamage)
    if (plasmaBlastEffect) return applyAttackTextModifiers(plasmaBlastEffect)
  }
  if (setId === 'bw11') {
    const legendaryTreasuresEffect = inferLegendaryTreasuresTcgBattleAttackEffect(attack, baseDamage)
    if (legendaryTreasuresEffect) return applyAttackTextModifiers(legendaryTreasuresEffect)
  }
  if (setId === 'xy1') {
    const xyBaseEffect = inferXyBaseTcgBattleAttackEffect(attack, baseDamage)
    if (xyBaseEffect) return applyAttackTextModifiers(xyBaseEffect)
  }
  if (setId === 'xy2') {
    const xyFlashfireEffect = inferXyFlashfireTcgBattleAttackEffect(attack, baseDamage)
    if (xyFlashfireEffect) return applyAttackTextModifiers(xyFlashfireEffect)
  }
  if (setId === 'xy3') {
    const xyFuriousFistsEffect = inferXyFuriousFistsTcgBattleAttackEffect(attack, baseDamage)
    if (xyFuriousFistsEffect) return applyAttackTextModifiers(xyFuriousFistsEffect)
  }
  if (setId === 'xy4') {
    const xyPhantomForcesEffect = inferXyPhantomForcesTcgBattleAttackEffect(attack, text, baseDamage)
    if (xyPhantomForcesEffect) return applyAttackTextModifiers(xyPhantomForcesEffect)
  }
  if (setId === 'xy5') {
    const xyPrimalClashEffect = inferXyPrimalClashTcgBattleAttackEffect(attack, baseDamage)
    if (xyPrimalClashEffect) return applyAttackTextModifiers(xyPrimalClashEffect)
  }
  if (setId === 'xy6') {
    const xyRoaringSkiesEffect = inferXyRoaringSkiesTcgBattleAttackEffect(attack, baseDamage)
    if (xyRoaringSkiesEffect) return applyAttackTextModifiers(xyRoaringSkiesEffect)
  }
  if (setId === 'xy7') {
    const xyAncientOriginsEffect = inferXyAncientOriginsTcgBattleAttackEffect(attack, baseDamage)
    if (xyAncientOriginsEffect) return applyAttackTextModifiers(xyAncientOriginsEffect)
  }
  if (setId === 'xy8') {
    const xyBreakthroughEffect = inferXyBreakthroughTcgBattleAttackEffect(attack, baseDamage)
    if (xyBreakthroughEffect) return applyAttackTextModifiers(xyBreakthroughEffect)
  }
  if (setId === 'xy9') {
    const xyBreakpointEffect = inferXyBreakpointTcgBattleAttackEffect(attack, baseDamage)
    if (xyBreakpointEffect) return applyAttackTextModifiers(xyBreakpointEffect)
  }
  if (setId === 'xy10') {
    const xyFatesCollideEffect = inferXyFatesCollideTcgBattleAttackEffect(attack, baseDamage)
    if (xyFatesCollideEffect) return applyAttackTextModifiers(xyFatesCollideEffect)
  }
  if (setId === 'xy11') {
    const xySteamSiegeEffect = inferXySteamSiegeTcgBattleAttackEffect(attack, baseDamage)
    if (xySteamSiegeEffect) return applyAttackTextModifiers(xySteamSiegeEffect)
  }
  if (setId === 'xy12') {
    const xyEvolutionsEffect = inferXyEvolutionsTcgBattleAttackEffect(attack, baseDamage)
    if (xyEvolutionsEffect) return applyAttackTextModifiers(xyEvolutionsEffect)
  }
  if (setId === 'sm1') {
    const sunMoonEffect = inferSunMoonBaseTcgBattleAttackEffect(attack, baseDamage)
    if (sunMoonEffect) return applyAttackTextModifiers(sunMoonEffect)
  }
  if (setId === 'sm2') {
    const guardiansRisingEffect = inferSunMoonGuardiansRisingTcgBattleAttackEffect(attack, baseDamage)
    if (guardiansRisingEffect) return applyAttackTextModifiers(guardiansRisingEffect)
  }
  if (setId === 'sm3') {
    const burningShadowsEffect = inferSunMoonBurningShadowsTcgBattleAttackEffect(attack, baseDamage)
    if (burningShadowsEffect) return applyAttackTextModifiers(burningShadowsEffect)
  }
  if (setId === 'sm35') {
    const shiningLegendsEffect = inferSunMoonShiningLegendsTcgBattleAttackEffect(attack, baseDamage)
    if (shiningLegendsEffect) return applyAttackTextModifiers(shiningLegendsEffect)
  }
  if (setId === 'sm4') {
    const crimsonInvasionEffect = inferSunMoonCrimsonInvasionTcgBattleAttackEffect(attack, baseDamage)
    if (crimsonInvasionEffect) return applyAttackTextModifiers(crimsonInvasionEffect)
  }
  if (setId === 'pl1') {
    const platinumEffect = inferPlatinumTcgBattleAttackEffect(attack, text, baseDamage)
    if (platinumEffect) return applyAttackTextModifiers(platinumEffect)
  }
  const ecardEffect = inferECardTcgBattleAttackEffect(attack, text, baseDamage, setId)
  if (ecardEffect) {
    return applyAttackTextModifiers(ecardEffect)
  }
  const neoEffect = inferNeoTcgBattleAttackEffect(attack, text, normalizedDamage, baseDamage, setId)
  if (neoEffect) {
    return applyAttackTextModifiers(neoEffect)
  }
  const classicEffect = inferClassicTcgBattleAttackEffect(attack, text, normalizedDamage, baseDamage, setId)
  if (classicEffect) {
    return applyAttackTextModifiers(classicEffect)
  }
  const selfDamage = inferTcgBattleSelfDamage(text)
  const energyDiscard = inferTcgBattleEnergyDiscard(text)
  const status = inferTcgBattleStatus(text)
  const benchDamage = inferTcgBattleBenchDamage(text)
  const counterDamage = inferTcgBattleCounterDamage(text)
  const healing = inferTcgBattleHealing(text)
  const protection = inferTcgBattleProtection(text)
  const selfKnockOut = /\b(?:knock out this pokemon|this pokemon is knocked out)\b/.test(text)
  const selfEffects = selfDamage.length > 0 ? selfDamage : undefined
  const energyDiscardEffects = energyDiscard.length > 0 ? energyDiscard : undefined
  const statusEffects = status.length > 0 ? status : undefined
  const benchDamageEffects = benchDamage.length > 0 ? benchDamage : undefined
  const counterDamageEffects = counterDamage.length > 0 ? counterDamage : undefined
  const healingEffects = healing.length > 0 ? healing : undefined
  const protectionEffects = protection.length > 0 ? protection : undefined
  const conditionalEffectCoinFlip =
    hasConditionalSelfDamage(selfDamage) ||
    hasConditionalEnergyDiscard(energyDiscard) ||
    hasConditionalStatus(status) ||
    hasConditionalProtection(protection) ||
    benchDamage.some((rule) => Boolean(rule.condition)) ||
    counterDamage.some((rule) => 'condition' in rule && Boolean(rule.condition)) ||
    healing.some((rule) => 'condition' in rule && Boolean(rule.condition))
      ? Math.max(
          parseTcgAttackCoinFlipCount(text) || 1,
          getTcgBattleConditionFlipCount([
            ...selfDamage,
            ...energyDiscard,
            ...status,
            ...benchDamage,
            ...counterDamage,
            ...healing,
            ...protection,
          ]),
        )
      : undefined

  if (isCleanTcgAttackDamage(normalizedDamage)) {
    const tailsZero = /flip a coin\. if tails, this attack does nothing\b/.test(text)
    const anyTailsZero = text.match(
      /flip (\d+) coins\. if (?:1 or both of them are tails|any (?:of them )?are tails|either of them is tails), this attack does nothing\b/,
    )
    const coinFlipCount = tailsZero ? 1 : conditionalEffectCoinFlip
    return applyAttackTextModifiers({
      damage: anyTailsZero
        ? {
            kind: 'zeroIfAnyTails',
            amount: exactDamage,
            coinFlipCount: Number.parseInt(anyTailsZero[1], 10),
          }
        : tailsZero
          ? { kind: 'zeroOnTails', amount: exactDamage }
          : { kind: 'fixed', amount: exactDamage },
      coinFlipCount: anyTailsZero ? Number.parseInt(anyTailsZero[1], 10) : coinFlipCount,
      selfDamage: selfEffects,
      selfKnockOut,
      energyDiscard: energyDiscardEffects,
      status: statusEffects,
      benchDamage: benchDamageEffects,
      counterDamage: counterDamageEffects,
      healing: healingEffects,
      protection: protectionEffects,
      ignoreWeaknessResistance,
    })
  }

  const variableDamage = inferVariableTcgBattleDamage(text, normalizedDamage, baseDamage)
  if (!variableDamage) {
    const hasStandaloneUtilityEffect =
      Boolean(statusEffects) ||
      Boolean(benchDamageEffects) ||
      Boolean(counterDamageEffects) ||
      Boolean(healingEffects) ||
      Boolean(protectionEffects) ||
      hasNonSelfTcgBattleEnergyDiscard(energyDiscard)

    if (!hasStandaloneUtilityEffect) {
      return null
    }
    return applyAttackTextModifiers({
      damage: { kind: 'fixed', amount: 0 },
      coinFlipCount: conditionalEffectCoinFlip,
      selfDamage: selfEffects,
      selfKnockOut,
      energyDiscard: energyDiscardEffects,
      status: statusEffects,
      benchDamage: benchDamageEffects,
      counterDamage: counterDamageEffects,
      healing: healingEffects,
      protection: protectionEffects,
      ignoreWeaknessResistance,
    })
  }

  return applyAttackTextModifiers({
    ...variableDamage,
    coinFlipCount: variableDamage.coinFlipCount || conditionalEffectCoinFlip,
    selfDamage: selfEffects,
    selfKnockOut,
    energyDiscard: energyDiscardEffects,
    status: statusEffects,
    benchDamage: benchDamageEffects,
    counterDamage: counterDamageEffects,
    healing: healingEffects,
    protection: protectionEffects,
    ignoreWeaknessResistance,
  })
}

function inferExTcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
  setId?: string,
): TcgBattleAttackEffect | null {
  if (setId === 'ex2') return inferEx2TcgBattleAttackEffect(attack, text, baseDamage)
  if (setId === 'ex3') return inferEx3TcgBattleAttackEffect(attack, baseDamage)
  if (setId === 'ex4') return inferEx4TcgBattleAttackEffect(attack, baseDamage)
  if (setId === 'ex5') return inferEx5TcgBattleAttackEffect(attack, baseDamage)
  if (setId === 'ex6') return inferEx6TcgBattleAttackEffect(attack, baseDamage)
  if (setId === 'ex7') return inferEx7TcgBattleAttackEffect(attack, baseDamage)
  if (setId === 'ex8') return inferEx8TcgBattleAttackEffect(attack, text, baseDamage)
  if (setId === 'ex9') return inferEx9TcgBattleAttackEffect(attack, text, baseDamage)
  if (setId === 'ex10') return inferEx10TcgBattleAttackEffect(attack, text, baseDamage)
  if (setId === 'ex11') return inferEx11TcgBattleAttackEffect(attack, text, baseDamage)
  if (setId === 'ex12') return inferEx12TcgBattleAttackEffect(attack, text, baseDamage)
  if (setId === 'ex13') return inferEx13TcgBattleAttackEffect(attack, text, baseDamage)
  if (setId === 'ex14') return inferEx14TcgBattleAttackEffect(attack, text, baseDamage)
  if (setId === 'ex15') return inferEx15TcgBattleAttackEffect(attack, text, baseDamage)
  if (setId === 'ex16') return inferEx16TcgBattleAttackEffect(attack, text, baseDamage)
  if (setId !== 'ex1') return null

  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'retaliate') {
    return {
      damage: {
        kind: 'conditionalCount',
        baseDamage: 0,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
        condition: 'heads',
      },
      coinFlipCount: 1,
    }
  }
  if (name === 'max energy source') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } },
    }
  }
  if (name === 'energy burst') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'both' } },
    }
  }
  if (name === 'super slap push') {
    return {
      damage: { kind: 'fixed', amount: 20 },
      benchDamage: [{ amount: 20, side: 'opponent', zone: 'front', excludeTarget: true }],
    }
  }
  if (name === 'mega throw') {
    return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 40 } }
  }
  if (name === 'battle blast') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } },
    }
  }
  if (name === 'rend') {
    return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 20 } }
  }
  if (name === 'water arrow') {
    return {
      damage: { kind: 'fixed', amount: 20 },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'dark slash') {
    return {
      damage: {
        kind: 'conditionalCount',
        baseDamage,
        perUnitDamage: 30,
        source: { kind: 'chosenEnergy' },
        maxUnits: 1,
      },
      energyDiscard: [{ target: 'self', amount: 'choice' }],
      choiceRequirement: 'energyAmount',
      choiceEnergyMax: 1,
    }
  }
  if (name === 'charge' || name === 'plus energy') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'slap down') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 10, coinFlipCount: 2 },
      coinFlipCount: 2,
    }
  }
  if (name === 'life drain') {
    return {
      damage: { kind: 'targetToRemainingHp', remainingHp: 10, condition: 'heads' },
      coinFlipCount: 1,
      ignoreWeaknessResistance: true,
      ignoreTargetDamageModifiers: true,
    }
  }
  if (name === 'one-two strike') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 2 },
      coinFlipCount: 2,
    }
  }
  if (name === 'continuous headbutt') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: baseDamage, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'ambush') {
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: 30 },
      coinFlipCount: 1,
    }
  }
  if (name === 'slack off') {
    return {
      ...zero(),
      healing: [{ target: 'self', amount: 'all' }],
      special: [{ kind: 'cannotAttack', target: 'self' }],
    }
  }
  if (name === 'rest') {
    return {
      ...zero(),
      healing: [{ target: 'self', amount: 40 }],
      status: [{ target: 'self', statuses: ['asleep'] }],
      special: [{
        kind: 'clearStatus',
        target: 'self',
        statuses: ['poisoned', 'burned', 'paralyzed', 'confused'],
      }],
    }
  }
  if (name === 'teary eyes') {
    return { ...zero(), protection: [{ target: 'self', kind: 'reduce', amount: 10 }] }
  }
  if (name === 'fling') {
    return {
      ...zero(),
      choiceRequirement: 'optionalOpponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }
  if (name === 'healing egg') {
    return {
      ...zero(),
      healing: [{ amount: 20, side: 'own', zone: 'play', excludeAttacker: true }],
    }
  }
  if (name === 'quick attack') {
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: 20 },
      coinFlipCount: 1,
    }
  }
  if (name === 'steady punch') {
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: 10 },
      coinFlipCount: 1,
    }
  }
  if (name === 'beat up') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: baseDamage, coinFlipCount: 0 },
      coinFlipSource: { kind: 'pokemonInPlay', side: 'own' },
    }
  }

  return null
}

function inferEx2TcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const frontWideDamage = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    benchDamage: [{ amount, side: 'opponent', zone: 'front', excludeTarget: true }],
  })
  const anyTargetDamage = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
  })

  if (name === 'feint attack') {
    return {
      damage: { kind: 'fixed', amount: 40 },
      targetScope: 'any',
      ignoreWeaknessResistance: true,
      ignoreTargetDamageModifiers: true,
    }
  }
  if (name === 'judgement') {
    return {
      damage: { kind: 'knockOutOnCoinCondition', condition: { result: 'heads', minimum: 2 } },
      coinFlipCount: 2,
      ignoreWeaknessResistance: true,
      ignoreTargetDamageModifiers: true,
    }
  }
  if (name === 'random curse') {
    return {
      ...zero(),
      counterDamage: [{ amount: 50, target: 'opponent' }],
    }
  }
  if (name === 'light touch throw') {
    return {
      damage: { kind: 'subtractCount', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'opponent' } },
    }
  }
  if (name === 'target slash') {
    return { damage: { kind: 'namedTargetBonus', baseDamage, bonusDamage: 30, names: ['Seviper'] } }
  }
  if (name === 'super slash') {
    return { damage: { kind: 'evolvedTargetBonus', baseDamage, bonusDamage: 30 } }
  }
  if (name === 'energy crush') {
    return {
      damage: { kind: 'count', baseDamage: baseDamage + 20, perUnitDamage: 10, source: { kind: 'energy', side: 'opponent' } },
    }
  }
  if (name === 'special blow') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 40, source: { kind: 'energy', side: 'opponent' }, maxUnits: 1 },
    }
  }
  if (name === 'sand swirl') {
    return {
      ...frontWideDamage(20),
      special: [{ kind: 'preventRetreat' }],
    }
  }
  if (name === 'spinning tail') {
    return {
      damage: { kind: 'fixed', amount: 20 },
      benchDamage: [{ amount: 20, side: 'opponent', zone: 'play', excludeTarget: true }],
    }
  }
  if (name === 'drizzle' || name === 'gather energy' || name === 'growth spurt') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'max bubbles') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
    }
  }
  if (name === 'fury swipes') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 3 },
      coinFlipCount: 3,
    }
  }
  if (name === 'ultra energy source' || name === 'psystorm') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'both' } },
    }
  }
  if (name === 'thunder spear') return anyTargetDamage(40)
  if (name === 'double wing attack') return frontWideDamage(20)
  if (name === 'rend') {
    const bonusDamage = /does 30 damage plus 30 more damage/.test(text) ? 30 : 20
    return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage } }
  }
  if (name === 'pester') {
    return {
      damage: { kind: 'statusBonus', baseDamage, bonusDamage: 20, statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'] },
    }
  }
  if (name === 'iron defense' || name === 'super speed') {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
    }
  }
  if (name === 'steady punch' || name === 'quick attack' || name === 'steel headbutt') {
    const bonusDamage = name === 'steel headbutt' ? 20 : name === 'quick attack' ? 10 : 10
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage }, coinFlipCount: 1 }
  }
  if (name === 'focus energy') {
    return { ...zero(), special: [{ kind: 'buffAttack', target: 'self', attackName: 'Slash', baseDamage: 90 }] }
  }
  if (name === 'strike and run') {
    return {
      ...zero(),
      choiceRequirement: 'optionalOwnBench',
      special: [{ kind: 'switch', target: 'self' }],
    }
  }
  if (name === 'team assembly') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{
        kind: 'searchDeckPokemon',
        maxCount: 3,
        includeBasic: true,
        includeNames: ['Omanyte', 'Kabuto'],
        treatAsBasic: true,
      }],
    }
  }
  if (name === 'influence') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{
        kind: 'searchDeckPokemon',
        maxCount: 2,
        includeNames: ['Omanyte', 'Kabuto', 'Aerodactyl', 'Lileep', 'Anorith'],
        treatAsBasic: true,
      }],
    }
  }
  if (name === 'psychic boom') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'opponent' } } }
  }
  if (name === 'energy catch') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'psyimpact') {
    return {
      ...zero(),
      counterDamage: [{ amount: 10, side: 'opponent', zone: 'play' }],
    }
  }
  if (name === 'hydrocutter') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 40, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own', max: 3 },
    }
  }
  if (name === 'super deep dive') {
    return {
      ...zero(),
      choiceRequirement: 'optionalOwnBench',
      healing: [{ target: 'self', amount: 30, requiresOwnBench: true }],
      special: [{ kind: 'switch', target: 'self' }],
    }
  }
  if (name === 'dwindling wave') {
    return {
      damage: { kind: 'subtractCount', baseDamage, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'attacker' } },
    }
  }
  if (name === 'feedback') {
    return null
  }

  return null
}

function inferEx3TcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTargetDamage = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
  })
  const frontWideDamage = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    benchDamage: [{ amount, side: 'opponent', zone: 'front', excludeTarget: true }],
  })

  if (name === 'energy shower' || name === 'speed growth' || name === 'energy recall' || name === 'power generation') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  }
  if (name === 'rainbow burn') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own', max: 3 } },
    }
  }
  if (name === 'rock vengeance') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCountersOnSide', side: 'own', zone: 'front' },
      },
    }
  }
  if (name === 'psychic boom') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'opponent' } },
    }
  }
  if (name === 'cheer on') {
    return {
      ...zero(),
      healing: [{ amount: 10, side: 'own', zone: 'play' }],
    }
  }
  if (name === 'special circuit') return anyTargetDamage(20)
  if (name === 'extra circuit') {
    return {
      damage: { kind: 'pokemonExTargetBonus', baseDamage: 20, bonusDamage: 20 },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'damage curse') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 10,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
      },
      ignoreWeaknessResistance: true,
      ignoreTargetDamageModifiers: true,
    }
  }
  if (name === 'rend') {
    return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 30 } }
  }
  if (name === 'breaking impact') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'retreatCost', target: 'target' } },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'magnetic force') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } },
    }
  }
  if (name === 'dragon flame') {
    return {
      damage: {
        kind: 'conditionalCount',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'chosenEnergy' },
        maxUnits: 1,
      },
      energyDiscard: [{ target: 'self', amount: 'choice' }],
      choiceRequirement: 'energyAmount',
      choiceEnergyMax: 1,
    }
  }
  if (name === 'power count') {
    return { damage: { kind: 'energyComparisonBonus', baseDamage, bonusDamage: 30 } }
  }
  if (name === 'dragon spark') {
    return {
      ...zero(),
      coinFlipCount: 1,
      benchDamage: [{ amount: 20, side: 'opponent', zone: 'play', condition: 'heads' }],
    }
  }
  if (name === 'quick attack') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 20 }, coinFlipCount: 1 }
  }
  if (name === 'dragon dew') {
    return { ...zero(), healing: [{ target: 'self', amount: 20 }] }
  }
  if (name === 'double metal ball') {
    return {
      ...zero(),
      counterDamage: [{ amount: 20, side: 'opponent', zone: 'front' }],
    }
  }
  if (name === 'grind') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } },
    }
  }
  if (name === 'big explosion') {
    return {
      damage: { kind: 'fixed', amount: 80 },
      benchDamage: [{ amount: 80, side: 'both', zone: 'front', excludeTarget: true }],
    }
  }
  if (name === 'fury cutter') {
    return {
      damage: { kind: 'headsTable', damages: [10, 20, 30, 40, 70], coinFlipCount: 4 },
      coinFlipCount: 4,
    }
  }
  if (name === 'retaliate') {
    return {
      damage: {
        kind: 'conditionalCount',
        baseDamage: 0,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
        condition: 'heads',
      },
      coinFlipCount: 1,
    }
  }
  if (name === 'feint attack') {
    return {
      damage: { kind: 'fixed', amount: 20 },
      targetScope: 'any',
      ignoreWeaknessResistance: true,
      ignoreTargetDamageModifiers: true,
    }
  }
  if (name === 'triple smash') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 3 },
      coinFlipCount: 3,
    }
  }
  if (name === 'water arrow') return anyTargetDamage(30)
  if (name === 'night attack') {
    return { ...zero(), targetScope: 'any', counterDamage: [{ amount: 10, target: 'opponent' }] }
  }
  if (name === 'quick dive') {
    return {
      damage: { kind: 'conditionalBonus', baseDamage: 0, bonusDamage: 50, condition: 'heads' },
      coinFlipCount: 1,
      targetScope: 'any',
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'pebble throw') {
    return { damage: { kind: 'fixed', amount: 10 }, targetScope: 'bench', ignoreWeaknessResistance: true }
  }
  if (name === 'steady punch') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 10 }, coinFlipCount: 1 }
  }
  if (name === 'roar' || name === 'whirlwind') {
    return {
      ...zero(),
      choiceRequirement: 'optionalOpponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }
  if (name === 'random spark') return anyTargetDamage(10)
  if (name === 'firebreathing' || name === 'rock smash') {
    const bonusDamage = name === 'rock smash' ? 20 : baseDamage
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage }, coinFlipCount: 1 }
  }
  if (name === 'spiral growth') {
    return {
      ...zero(),
      flipUntilTails: true,
      energyGain: [{ target: 'self', amountPerHead: 1 }],
    }
  }
  if (name === 'call for family') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 3, includeNames: ['Magikarp'] }],
    }
  }
  if (name === 'call for friends') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 3, basicOnly: true, includeTypes: ['Grass'] }],
    }
  }
  if (name === 'lava flow') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'chosenEnergy' } },
      energyDiscard: [{ target: 'self', amount: 'choice' }],
      choiceRequirement: 'energyAmount',
    }
  }
  if (name === 'slimy water') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'retreatCost', target: 'target' } },
    }
  }
  if (name === 'dragon burst') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 40, source: { kind: 'chosenEnergy' } },
      energyDiscard: [{ target: 'self', amount: 'choice' }],
      choiceRequirement: 'energyAmount',
    }
  }

  return null
}

function inferEx4TcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTargetDamage = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
  })

  if (name === 'aqua smash') {
    return {
      damage: {
        kind: 'statusBonus',
        baseDamage,
        bonusDamage: 20,
        statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'],
      },
    }
  }
  if (name === 'power blow') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } },
    }
  }
  if (name === 'hydro reverse' || name === 'reverse stream' || name === 'land stream') {
    const bonusPerEnergy = name === 'land stream' ? 20 : 10
    return {
      damage: {
        kind: 'conditionalCount',
        baseDamage: 50,
        perUnitDamage: bonusPerEnergy,
        source: { kind: 'chosenEnergy' },
        minUnits: 1,
      },
      energyDiscard: [{ target: 'self', amount: 'choice' }],
      choiceRequirement: 'energyAmount',
    }
  }
  if (name === 'crush') {
    return {
      damage: { kind: 'coinCount', amountPerHeads: 30, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
    }
  }
  if (name === 'dark hand' || name === 'magma spurt' || name === 'aqua call' || name === 'collect') return null
  if (name === 'linear attack') return anyTargetDamage(20)
  if (name === 'pulverize') {
    return {
      damage: { kind: 'damageCounterThresholdBonus', baseDamage, bonusDamage: 20, minimumCounters: 2 },
    }
  }
  if (name === 'roasting heat') {
    return { damage: { kind: 'statusBonus', baseDamage, bonusDamage: 20, statuses: ['burned'] } }
  }
  if (name === 'kerzap') {
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: 40 },
      coinFlipCount: 1,
      energyDiscard: [{ target: 'self', amount: 'all', condition: 'heads' }],
    }
  }
  if (name === 'poison reaction') {
    return { damage: { kind: 'statusBonus', baseDamage, bonusDamage: 20, statuses: ['poisoned'] } }
  }
  if (name === 'double claw') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 2 },
      coinFlipCount: 2,
    }
  }
  if (name === 'super hypnoblast') {
    return { damage: { kind: 'statusBonus', baseDamage, bonusDamage: 20, statuses: ['asleep'] } }
  }
  if (name === 'call for family') {
    const isAqua = attack.text?.toLowerCase().includes('team aqua') || false
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{
        kind: 'searchDeckPokemon',
        maxCount: 1,
        basicOnly: true,
        includeTypes: [isAqua ? 'Grass' : 'Colorless'],
        includeNameContains: [isAqua ? 'Team Aqua' : 'Team Magma'],
      }],
    }
  }
  if (name === 'bite off') {
    return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 40 } }
  }
  if (name === 'second strike') {
    return {
      damage: { kind: 'damageCounterThresholdBonus', baseDamage, bonusDamage: 20, minimumCounters: 2 },
    }
  }
  if (name === 'team play') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 10,
        source: { kind: 'namedPokemonContains', side: 'own', zone: 'play', values: ['Team Magma'] },
      },
    }
  }
  if (name === 'random spark') return anyTargetDamage(10)
  if (name === 'pain amplifier') {
    return {
      ...zero(),
      counterDamage: [{ amount: 10, side: 'opponent', zone: 'play', onlyDamaged: true }],
    }
  }
  if (name === 'clay curse') {
    return {
      ...zero(),
      targetScope: 'any',
      counterDamage: [{ amount: 20, target: 'opponent' }],
    }
  }
  if (name === 'damage burn') {
    return {
      damage: { kind: 'damageCounterThresholdBonus', baseDamage, bonusDamage: 20, minimumCounters: 1 },
    }
  }
  if (name === 'double damage') {
    return {
      damage: { kind: 'fixed', amount: 10 },
      benchDamage: [{ amount: 10, side: 'opponent', zone: 'front', excludeTarget: true }],
    }
  }
  if (name === 'growth' || name === 'self charge') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'rest') {
    return {
      ...zero(),
      healing: [{ target: 'self', amount: 30 }],
      special: [
        { kind: 'clearStatus', target: 'self', statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'] },
        { kind: 'setStatus', target: 'self', statuses: ['asleep'] },
      ],
    }
  }
  if (name === 'agility') {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
    }
  }
  if (name === 'tail strike') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 10 }, coinFlipCount: 1 }
  }
  if (name === 'roar' || name === 'darkness call') {
    return {
      ...zero(),
      choiceRequirement: 'optionalOpponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }
  if (name === 'night attack') {
    return { ...zero(), targetScope: 'any', counterDamage: [{ amount: 10, target: 'opponent' }] }
  }
  if (name === 'green heal') {
    return { ...zero(), healing: [{ amount: 40, side: 'own', zone: 'play' }] }
  }
  if (name === 'energy flip') {
    return {
      damage: { kind: 'fixed', amount: 10 },
      targetScope: 'bench',
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'crushing wave') {
    return {
      damage: { kind: 'fixed', amount: 40 },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
      coinFlipCount: 1,
      energyDiscard: [{ target: 'opponent', amount: 1, condition: 'heads' }],
    }
  }
  if (name === 'quick attack') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 10 }, coinFlipCount: 1 }
  }
  if (name === 'feint attack') {
    return {
      damage: { kind: 'fixed', amount: 30 },
      targetScope: 'any',
      ignoreWeaknessResistance: true,
      ignoreTargetDamageModifiers: true,
    }
  }

  return null
}

function inferEx5TcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTargetDamage = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
  })

  if (name === 'shadow steal' || name === 'dark hand' || name === 'chakra points' || name === 'supernatural power') return null
  if (name === 'darkness chant') {
    return {
      ...zero(),
      counterDamage: [{
        amountPerUnit: 10,
        source: { kind: 'pokemonInDiscard', side: 'own', max: 6 },
        target: 'opponent',
      }],
    }
  }
  if (name === 'muddy eye') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'both' } },
    }
  }
  if (name === 'dark provide' || name === 'metal load' || name === 'growth spurt' || name === 'growth') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'mass destruction') {
    return {
      damage: { kind: 'targetToRemainingHp', remainingHp: 0 },
      selfKnockOut: true,
      ignoreWeaknessResistance: true,
      ignoreTargetDamageModifiers: true,
    }
  }
  if (name === 'breaking sound') {
    return {
      damage: { kind: 'fixed', amount: 10 },
      benchDamage: [{ amount: 10, side: 'opponent', zone: 'play', excludeTarget: true }],
    }
  }
  if (name === 'bass control') return anyTargetDamage(30)
  if (name === 'extra draw') {
    return {
      ...zero(),
      energyGain: [{
        target: 'self',
        amountPerUnit: 1,
        maxAmount: 2,
        source: { kind: 'pokemonExInPlay', side: 'opponent' },
      }],
    }
  }
  if (name === 'make a wish' || name === 'ascension') return null
  if (name === 'cross chop') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 30 }, coinFlipCount: 1 }
  }
  if (name === 'chime' || name === 'scattered shower' || name === 'sunshine' || name === 'forecast' || name === 'coral glow' || name === 'set song' || name === 'loving draw' || name === 'surprise') return null
  if (name === 'psychic boom') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'opponent' } },
    }
  }
  if (name === 'mystic water') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'both' } },
    }
  }
  if (name === 'dark splash') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'pokemonOfTypesInPlay', side: 'both', types: ['Darkness'] },
      },
    }
  }
  if (name === 'quick attack' || name === 'steady punch') {
    const bonusDamage = name === 'quick attack' ? 20 : 10
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage }, coinFlipCount: 1 }
  }
  if (name === 'white snow') return null
  if (name === 'extra ball') {
    return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 20 } }
  }
  if (name === 'retaliate') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'attacker' } },
    }
  }
  if (name === 'sweet temptation') {
    return {
      damage: { kind: 'fixed', amount: 10 },
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent', beforeDamage: true }],
    }
  }
  if (name === 'power heal') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'attacker' } },
      healing: [{ target: 'self', amount: 10 }],
    }
  }
  if (name === 'upper hand') {
    return { ...zero(), choiceRequirement: 'disableAttack', special: [{ kind: 'disableAttack' }] }
  }
  if (name === 'feint attack') {
    return {
      damage: { kind: 'fixed', amount: 40 },
      targetScope: 'any',
      ignoreWeaknessResistance: true,
      ignoreTargetDamageModifiers: true,
    }
  }
  if (name === 'hyper tail') return null
  if (name === 'super icy wind') {
    return {
      damage: { kind: 'fixed', amount: 10 },
      benchDamage: [{ amount: 10, side: 'opponent', zone: 'play', excludeTarget: true, ignoreWeaknessResistance: true }],
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'water arrow') return anyTargetDamage(20)
  if (name === 'random spark') return anyTargetDamage(10)
  if (name === 'rainbow star') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'opponent' } },
    }
  }
  if (name === 'swallow up') {
    return { damage: { kind: 'remainingHpComparisonBonus', baseDamage, bonusDamage: 30 } }
  }
  if (name === 'call for family') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, basicOnly: true }],
    }
  }
  if (name === 'calm mind') return { ...zero(), healing: [{ target: 'self', amount: 20 }] }
  if (name === 'plus energy') {
    return {
      ...zero(),
      coinFlipCount: 1,
      energyGain: [{ target: 'self', amount: 1, condition: 'heads' }],
    }
  }
  if (name === 'trip over') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 10 }, coinFlipCount: 1 }
  }
  if (name === 'splash about') {
    return { damage: { kind: 'energyComparisonBonus', baseDamage, bonusDamage: 10 } }
  }
  if (name === 'crushing mantle' || name === 'super tidal wave') {
    return name === 'super tidal wave'
      ? { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
      : {
          damage: {
            kind: 'conditionalCount',
            baseDamage,
            perUnitDamage: 10,
            source: { kind: 'chosenEnergy' },
            minUnits: 1,
          },
          energyDiscard: [{ target: 'self', amount: 'choice' }],
          choiceRequirement: 'energyAmount',
        }
  }
  if (name === 'extra comet punch') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      special: [{ kind: 'buffAttack', target: 'self', attackName: 'Extra Comet Punch', baseDamage: 50, damageBonus: 50 }],
    }
  }
  if (name === 'tonnage') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 20 },
      selfDamage: [{ kind: 'optionalChoice', amount: 30 }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'quick tail smash') {
    return {
      damage: { kind: 'optionalCoinDamage', baseDamage, successDamage: 80, failureDamage: 0, condition: 'heads' },
      coinFlipCount: 1,
      choiceRequirement: 'optionalBonus',
    }
  }

  return null
}

function inferEx6TcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTargetDamage = (amount: number, ignoreOtherEffects = false): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
    ignoreTargetDamageModifiers: ignoreOtherEffects,
  })

  if (name === 'link needle') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 30,
        source: {
          kind: 'namedPokemonContains',
          side: 'own',
          zone: 'play',
          values: ['Beedrill'],
          excludeAttacker: true,
        },
      },
    }
  }
  if (name === 'one-two punch') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 20 }, coinFlipCount: 1 }
  }
  if (name === 'linear attack') {
    const amount = baseDamage || (/30 damage to that pokemon/i.test(attack.text || '') ? 30 : 20)
    return anyTargetDamage(amount)
  }
  if (name === 'vengeance') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'pokemonInDiscard', side: 'own', max: 6 },
      },
    }
  }
  if (name === 'bound crush') {
    return {
      ...anyTargetDamage(60),
      special: [{ kind: 'disableSelfAttack', attackName: 'Bound Crush' }],
    }
  }
  if (name === 'power lariat') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'pokemonEvolvedInPlay', side: 'own' },
      },
    }
  }
  if (name === 'clutch' || name === 'corner' || name === 'acid') {
    return { damage: { kind: 'fixed', amount: baseDamage }, special: [{ kind: 'preventRetreat' }] }
  }
  if (name === 'mega throw') {
    return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 30 } }
  }
  if (name === 'toss and turn') {
    return {
      damage: {
        kind: 'statusBonus',
        baseDamage,
        bonusDamage: 30,
        statuses: ['asleep'],
        statusTarget: 'attacker',
      },
      allowWhileAsleep: true,
    }
  }
  if (name === 'egg surprise') {
    return {
      damage: { kind: 'conditionalBonus', baseDamage: 0, bonusDamage: 50, condition: 'heads' },
      coinFlipCount: 1,
      healing: [{ target: 'self', amount: 50, condition: 'tails' }],
    }
  }
  if (name === 'cross-cut') return { damage: { kind: 'evolvedTargetBonus', baseDamage, bonusDamage: 20 } }
  if (name === 'salt water' || name === 'energy powder') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  }
  if (name === 'speed shot') return anyTargetDamage(40, true)
  if (name === 'fury cutter') {
    return {
      damage: { kind: 'headsTable', damages: [10, 20, 30, 50], coinFlipCount: 3 },
      coinFlipCount: 3,
    }
  }
  if (name === 'damage burn') {
    return { damage: { kind: 'damageCounterThresholdBonus', baseDamage, bonusDamage: 20, minimumCounters: 1 } }
  }
  if (name === 'ambush') return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 10 }, coinFlipCount: 1 }
  if (name === 'tongue whip') return anyTargetDamage(20)
  if (name === 'rend') return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 30 } }
  if (name === 'tunneling') {
    return {
      damage: { kind: 'fixed', amount: 10 },
      targetScope: 'bench',
      ignoreWeaknessResistanceOnBench: true,
      special: [{ kind: 'disableSelfAttack', attackName: 'Tunneling' }],
    }
  }
  if (name === 'quick attack') return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 40 }, coinFlipCount: 1 }
  if (name === 'gouge') return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 10 }, coinFlipCount: 1 }
  if (name === 'stomp') return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 10 }, coinFlipCount: 1 }
  if (name === 'gesture') {
    return {
      ...zero(),
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent', beforeDamage: true }],
    }
  }
  if (name === 'run around') {
    return {
      ...zero(),
      choiceRequirement: 'ownBench',
      special: [{ kind: 'switch', target: 'self' }],
    }
  }
  if (name === 'random peck') {
    return { damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 10, coinFlipCount: 2 }, coinFlipCount: 2 }
  }
  if (name === 'quick blow') return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 20 }, coinFlipCount: 1 }
  if (name === 'nap') return { ...zero(), healing: [{ target: 'self', amount: 20 }] }
  if (name === 'call for family') {
    const isNidoranSearch = attack.text?.toLowerCase().includes('nidoran') || false
    const isGrassSearch = attack.text?.toLowerCase().includes('grass basic') || false
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{
        kind: 'searchDeckPokemon',
        maxCount: isNidoranSearch ? 1 : 2,
        basicOnly: true,
        ...(isNidoranSearch ? { includeNameContains: ['Nidoran'] } : {}),
        ...(isGrassSearch ? { includeTypes: ['Grass'] } : {}),
      }],
    }
  }
  if (name === 'minimize') {
    return { ...zero(), protection: [{ target: 'self', kind: 'reduce', amount: 20 }] }
  }
  if (name === 'crush and burn') {
    return {
      damage: {
        kind: 'conditionalCount',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'chosenEnergy' },
      },
      energyDiscard: [{ target: 'self', amount: 'choice' }],
      choiceRequirement: 'energyAmount',
    }
  }
  if (name === 'electron crush') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'chosenEnergy' },
        maxUnits: 1,
      },
      energyDiscard: [{ target: 'self', amount: 'choice' }],
      choiceRequirement: 'energyAmount',
      choiceEnergyMax: 1,
    }
  }

  return null
}

function inferEx7TcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const text = (attack.text || '').toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTargetDamage = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
  })
  const flatBenchSweep = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    benchDamage: [{ amount, side: 'opponent', zone: 'bench', ignoreWeaknessResistance: true }],
  })

  if (name === 'water punch') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
    }
  }
  if (name === 'dark drain') {
    return {
      damage: { kind: 'fixed', amount: 10 },
      benchDamage: [{ amount: 10, side: 'opponent', zone: 'bench', ignoreWeaknessResistance: true }],
      healing: [{ target: 'self', amount: 0, amountPerUnit: 10, source: { kind: 'pokemonInPlay', side: 'opponent' } }],
    }
  }
  if (name === 'skill dive') return anyTargetDamage(30)
  if (name === 'dark fire') {
    return {
      damage: {
        kind: 'conditionalCount',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'chosenEnergy' },
        maxUnits: 1,
      },
      energyDiscard: [{ target: 'self', amount: 'choice' }],
      choiceRequirement: 'energyAmount',
      choiceEnergyMax: 1,
    }
  }
  if (name === 'energy crush') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'opponent' } },
    }
  }
  if (name === 'tonnage') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 40 },
      selfDamage: [{ kind: 'optionalChoice', amount: 30 }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'double wing attack') return { damage: { kind: 'fixed', amount: 30 } }
  if (name === 'slimy water') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'retreatCost', target: 'target' } },
    }
  }
  if (name === 'grind') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } },
    }
  }
  if (name === 'spinning tail') return flatBenchSweep(20)
  if (name === 'bite off') return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 50 } }
  if (name === 'second strike') {
    return { damage: { kind: 'damageCounterThresholdBonus', baseDamage, bonusDamage: 20, minimumCounters: 2 } }
  }
  if (name === 'hyper pump') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'unusedEnergy' },
        maxUnits: 3,
      },
    }
  }
  if (name === 'swallow up') return { damage: { kind: 'remainingHpComparisonBonus', baseDamage, bonusDamage: 30 } }
  if (name === 'breaking impact') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'retreatCost', target: 'target' } },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'double tackle') return { damage: { kind: 'fixed', amount: 20 } }
  if (name === 'night ambush') {
    return {
      ...anyTargetDamage(30),
      special: [{ kind: 'disableSelfAttack', attackName: 'Night Ambush' }],
    }
  }
  if (name === 'fire payback') {
    return {
      damage: {
        kind: 'countComparisonBonus',
        baseDamage,
        bonusDamage: 20,
        addSource: { kind: 'bench', side: 'opponent' },
        subtractSource: { kind: 'bench', side: 'own' },
      },
    }
  }
  if (name === 'energy press') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } },
    }
  }
  if (name === 'linear attack') {
    const amount = baseDamage || Number.parseInt(text.match(/does (\d+) damage to that pokemon/)?.[1] || '0', 10)
    return anyTargetDamage(amount)
  }
  if (name === 'explosive evolution') {
    return {
      damage: { kind: 'conditionalBonus', baseDamage: 0, bonusDamage: 10, condition: 'heads' },
      coinFlipCount: 1,
      benchDamage: [{ amount: 10, side: 'opponent', zone: 'bench', condition: 'heads', ignoreWeaknessResistance: true }],
    }
  }
  if (name === 'tail strike' || name === 'firebreathing' || name === 'quick attack' || name === 'rising lunge' || name === 'ambush') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 10 }, coinFlipCount: 1 }
  }
  if (name === 'taunt') {
    return {
      ...zero(),
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }
  if (name === 'miracle powder') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      coinFlipCount: 1,
      choiceRequirement: 'statusCondition',
      status: [{ target: 'opponent', statuses: [], condition: 'heads', useChosenStatus: true }],
    }
  }
  if (name === 'call for family') {
    const grassOnly = text.includes('grass basic')
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, basicOnly: true, ...(grassOnly ? { includeTypes: ['Grass'] } : {}) }],
    }
  }
  if (name === 'call for friends') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 2, basicOnly: true }],
    }
  }
  if (name === 'minor errand-running') {
    return { ...zero(), energyGain: [{ target: 'self', amount: text.includes('up to 2 basic energy') ? 2 : 1 }] }
  }
  if (name === 'energy draw') {
    return { ...zero(), coinFlipCount: 1, energyGain: [{ target: 'self', amount: 1, condition: 'heads' }] }
  }
  if (name === 'rest') {
    return {
      ...zero(),
      healing: [{ target: 'self', amount: 'all' }],
      special: [
        { kind: 'clearStatus', target: 'self', statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'] },
        { kind: 'setStatus', target: 'self', statuses: ['asleep'] },
      ],
    }
  }
  if (name === 'souvenir') {
    return {
      damage: { kind: 'headsTable', damages: [0, 40, 0, 100], coinFlipCount: 3 },
      coinFlipCount: 3,
      healing: [
        { target: 'opponent', amount: 10, condition: { result: 'heads', minimum: 2, exactly: 2 } },
        { target: 'opponent', amount: 'all', condition: { result: 'tails', minimum: 3 } },
      ],
    }
  }
  if (name === 'dark seed') {
    return { ...zero(), special: [{ kind: 'preventRetreat' }] }
  }
  if (name === 'darkness charge') {
    return { damage: { kind: 'fixed', amount: baseDamage }, selfDamage: [{ kind: 'fixed', amount: 20 }] }
  }
  if (name === 'spread poison') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      status: [{ target: 'opponent', statuses: ['poisoned'] }],
      benchDamage: [{ amount: 20, side: 'opponent', zone: 'bench', maxTargets: 1, ignoreWeaknessResistance: true }],
    }
  }
  if (name === 'dark ring') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'pokemonOfTypesInPlay', side: 'own', types: ['Darkness'] },
      },
    }
  }
  if (name === 'hyper splash') return { damage: { kind: 'stage2TargetBonus', baseDamage, bonusDamage: 40 } }
  if (name === 'water plant') return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }

  return null
}

function inferEx8TcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const textBonus = Number.parseInt(text.match(/plus (\d+) more damage/)?.[1] || '0', 10)
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTargetDamage = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
  })
  const sweep = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    ignoreWeaknessResistanceOnBench: true,
    benchDamage: [{ amount, side: 'opponent', zone: 'bench', ignoreWeaknessResistance: true }],
  })

  if (name === 'double wing attack') return sweep(20)
  if (name === 'split bomb' || name === 'triple breach') {
    const amount = name === 'split bomb' ? 30 : 10
    const extraTargets = name === 'split bomb' ? 1 : 2
    return {
      damage: { kind: 'fixed', amount },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
      benchDamage: [{
        amount,
        side: 'opponent',
        zone: 'bench',
        maxTargets: extraTargets,
        excludeTarget: true,
        ignoreWeaknessResistance: true,
      }],
    }
  }
  if (name === 'cross-cut') return { damage: { kind: 'evolvedTargetBonus', baseDamage, bonusDamage: 20 } }
  if (name === 'dragon spark' || name === 'spinning horn') return sweep(10)
  if (name === 'full retaliation') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 20,
        source: { kind: 'damageCountersOnNamedPokemon', side: 'own', zone: 'play', names: ['Magikarp'] },
      },
    }
  }
  if (name === 'pulverize') return { damage: { kind: 'damageCounterThresholdBonus', baseDamage, bonusDamage: 50, minimumCounters: 2 } }
  if (name === 'circular steps') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 10,
        source: { kind: 'pokemonInPlay', side: 'both', excludeAttacker: true },
      },
    }
  }
  if (name === 'energy crush') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'opponent' } } }
  }
  if (name === 'back burner') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  }
  if (name === 'hustle punch') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      special: [{ kind: 'buffAttack', target: 'self', attackName: 'Hustle Punch', baseDamage: 50 }],
    }
  }
  if (name === 'water punch') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
    }
  }
  if (name === 'tumbling attack' || name === 'quick blow' || name === 'rock smash') {
    const bonusDamage = name === 'tumbling attack' || name === 'quick blow' ? 20 : 10
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage }, coinFlipCount: 1 }
  }
  if (name === 'rend') return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 20 } }
  if (name === 'heavy metal') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
    }
  }
  if (name === 'miracle blow' || name === 'miracle essence') {
    return {
      ...zero(),
      coinFlipCount: 1,
      choiceRequirement: 'statusCondition',
      status: [{ target: 'opponent', statuses: [], condition: 'heads', useChosenStatus: true }],
    }
  }
  if (name === 'stomp' || name === 'quick attack' || name === 'trip over' || name === 'aqua wave' || name === 'rising lunge' || name === 'ambush') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: textBonus }, coinFlipCount: 1 }
  }
  if (name === 'raging tremble') {
    const source: TcgBattleCountSource = { kind: 'damageCounters', target: 'attacker' }
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source },
      coinFlipCount: 1,
      benchDamage: [{
        amount: 0,
        amountPerUnit: 10,
        source,
        side: 'opponent',
        zone: 'bench',
        condition: 'heads',
        ignoreWeaknessResistance: true,
      }],
    }
  }
  if (name === 'dwindling wave') {
    return {
      damage: {
        kind: 'subtractCount',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
      },
    }
  }
  if (name === 'extra ball') return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 30 } }
  if (name === 'target beam') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'namedPokemon', side: 'own', zone: 'play', names: ['Solrock'] },
      },
    }
  }
  if (name === 'magnetic tackle') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'energy', side: 'own' },
        optional: true,
      },
      selfDamage: [{ kind: 'optionalChoice', amount: 10 }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'psychic boom') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'opponent' } } }
  }
  if (name === 'one-two strike') return { damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 2 }, coinFlipCount: 2 }
  if (name === 'call for family') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 2, basicOnly: true }],
    }
  }
  if (name === 'thunder spear') return anyTargetDamage(20)
  if (name === 'reflected beam') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 10,
        source: { kind: 'namedPokemon', side: 'own', zone: 'play', names: ['Lunatone'] },
      },
      targetScope: 'bench',
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'energy flip') {
    return { damage: { kind: 'fixed', amount: 10 }, targetScope: 'bench', ignoreWeaknessResistance: true }
  }
  if (name === 'mid-air crush') {
    return {
      ...anyTargetDamage(20),
      coinFlipCount: 1,
      energyDiscard: [{ target: 'opponent', amount: 1, condition: 'heads' }],
    }
  }
  if (name === 'liability') {
    return {
      damage: { kind: 'targetToRemainingHp', remainingHp: 10 },
      selfDamage: [{ kind: 'fixed', amount: 70 }],
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'leap out') {
    return {
      ...zero(),
      choiceRequirement: 'ownBench',
      special: [{ kind: 'switch', target: 'self' }],
    }
  }
  if (name === 'pester') {
    return {
      damage: {
        kind: 'statusBonus',
        baseDamage,
        bonusDamage: 40,
        statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'],
      },
    }
  }
  if (name === 'energy burst') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'both' } } }
  }
  if (name === 'psyburst') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'energy', side: 'opponent' },
        optional: true,
      },
      energyDiscard: [{ target: 'self', amount: 2, optional: true }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'spiral blast') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'flame jet') {
    return { ...anyTargetDamage(40), ignoreWeaknessResistance: true }
  }
  if (name === 'shooting star') {
    return {
      damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 100 },
      energyDiscard: [{ target: 'self', amount: 'all', targetSubtype: 'ex' }],
    }
  }
  if (name === 'shining star') {
    return {
      damage: { kind: 'stage2TargetBonus', baseDamage, bonusDamage: 100 },
      energyDiscard: [{ target: 'self', amount: 'all', targetSubtype: 'stage2' }],
    }
  }
  if (name === 'spiral rush') {
    return { damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 0 }, flipUntilTails: true }
  }
  if (name === 'holy star') {
    return {
      damage: { kind: 'pokemonExTargetBonus', baseDamage: 0, bonusDamage: 100 },
      energyDiscard: [{ target: 'self', amount: 'all' }],
      benchDamage: [{
        amount: 100,
        side: 'opponent',
        zone: 'bench',
        ignoreWeaknessResistance: true,
        subtypeFilter: { include: ['ex'] },
      }],
    }
  }
  if (name === 'thunderous blow') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
  }

  return null
}

function inferEx9TcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const textBonus = Number.parseInt(text.match(/plus (\d+) more damage/)?.[1] || '0', 10)
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTargetDamage = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
  })
  const boardSweep = text.match(/does (\d+) damage to each of your opponent's pokemon/)
  if (boardSweep && ['spinning tail', 'hailstone', 'wide laser'].includes(name)) {
    const amount = Number.parseInt(boardSweep[1], 10)
    return {
      damage: { kind: 'fixed', amount },
      ignoreWeaknessResistanceOnBench: true,
      benchDamage: [{ amount, side: 'opponent', zone: 'bench', ignoreWeaknessResistance: true }],
    }
  }

  if (name === 'damage burn' || name === 'spike rend') {
    return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 20 } }
  }
  if (name === 'mega throw') return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 40 } }
  if (name === 'dragon dance') {
    return { ...zero(), special: [{ kind: 'buffAttack', target: 'self', attackName: '*', damageBonus: 30 }] }
  }
  if (name === 'super slash' || name === 'cross-cut') {
    return { damage: { kind: 'evolvedTargetBonus', baseDamage, bonusDamage: 20 } }
  }
  if (name === 'scary face') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [
        { kind: 'cannotAttack', target: 'opponent', condition: 'heads' },
        { kind: 'preventRetreat', condition: 'heads' },
      ],
    }
  }
  if (name === 'bite off') return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 30 } }
  if (name === 'extra claws') return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 20 } }
  if (name === 'power blow') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'extra flame') return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 30 } }
  if (['quick attack', 'rock smash', 'sharp claws', 'cross chop', 'tail strike', 'knock away', 'firebreathing'].includes(name)) {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: textBonus }, coinFlipCount: 1 }
  }
  if (name === 'snap tail') return anyTargetDamage(10)
  if (name === 'skill dive') return anyTargetDamage(40)
  if (name === 'water arrow') return anyTargetDamage(10)
  if (name === 'call for friend') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, basicOnly: true }],
    }
  }
  if (name === 'pure power') {
    return {
      ...zero(),
      targetScope: 'any',
      counterDamage: [{ amount: 30, target: 'opponent' }],
    }
  }
  if (name === 'sky kick') {
    return {
      damage: { kind: 'resistanceTypeBonus', baseDamage, bonusDamage: 40, resistanceType: 'Fighting' },
    }
  }
  if (name === 'power short') return anyTargetDamage(30)
  if (name === 'mend') {
    return {
      ...zero(),
      energyGain: [{ target: 'self', amount: 1 }],
      healing: [{ target: 'self', amount: 10 }],
    }
  }
  if (name === 'metal crush') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        maxUnits: 1,
        source: { kind: 'namedPokemon', side: 'own', zone: 'play', names: ['Registeel ex'] },
      },
    }
  }
  if (name === 'eruption') return { damage: { kind: 'fixed', amount: baseDamage } }

  return null
}

function inferEx10TcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const textBonus = Number.parseInt(
    text.match(/plus (\d+) more damage/)?.[1] || '0',
    10,
  )
  const zero = (): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount: 0 },
  })
  const allStatuses: TcgBattleStatusCondition[] = [
    'asleep',
    'poisoned',
    'burned',
    'paralyzed',
    'confused',
  ]
  const anyTargetDamage = (
    amount: number,
    ignoreWeaknessResistance = false,
  ): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
    ...(ignoreWeaknessResistance ? { ignoreWeaknessResistance: true } : {}),
  })
  const boardSweep = (
    amount: number,
    condition?: TcgBattleCoinCondition,
  ): TcgBattleAttackEffect => ({
    damage: condition
      ? {
          kind: 'conditionalBonus',
          baseDamage: 0,
          bonusDamage: amount,
          condition,
        }
      : { kind: 'fixed', amount },
    coinFlipCount: condition ? 1 : undefined,
    ignoreWeaknessResistanceOnBench: true,
    benchDamage: [
      {
        amount,
        side: 'opponent',
        zone: 'bench',
        condition,
        ignoreWeaknessResistance: true,
      },
    ],
  })

  if (name === 'hidden power') {
    if (text.includes('put 2 damage counters on 1 of your opponent')) {
      return {
        ...zero(),
        targetScope: 'any',
        coinFlipCount: 1,
        counterDamage: [
          { amount: 20, target: 'opponent', condition: 'heads' },
          { amount: 20, target: 'self', condition: 'tails' },
        ],
      }
    }
    if (
      text.includes(
        'count the number of your pokemon that have any damage counters',
      )
    ) {
      return {
        ...zero(),
        counterDamage: [
          {
            amountPerUnit: 10,
            source: { kind: 'injuredPokemon', side: 'own', zone: 'play' },
            target: 'opponent',
          },
        ],
      }
    }
    if (
      text.includes(
        'switch all damage counters on unown with those on the defending pokemon',
      )
    ) {
      return {
        ...zero(),
        coinFlipCount: 1,
        special: [{ kind: 'swapDamageCounters', condition: 'heads' }],
      }
    }
    if (text.includes('remove 5 damage counters from unown')) {
      return { ...zero(), healing: [{ target: 'self', amount: 50 }] }
    }
    if (
      text.includes(
        "put 1 damage counter on each of your opponent's pokemon that already has damage counters",
      )
    ) {
      return {
        ...zero(),
        counterDamage: [
          { amount: 10, side: 'opponent', zone: 'play', onlyDamaged: true },
        ],
      }
    }
    if (
      text.includes(
        'put damage counters on the defending pokemon until it is 10 hp away',
      )
    ) {
      return {
        damage: {
          kind: 'targetToRemainingHp',
          remainingHp: 10,
          condition: 'heads',
        },
        coinFlipCount: 1,
        ignoreWeaknessResistance: true,
      }
    }
    if (
      text.includes('choose 1 of your opponent') &&
      text.includes('does 20 damage to that pokemon')
    ) {
      return anyTargetDamage(20, true)
    }
    if (
      text.includes(
        'each basic pokemon and each evolution card in your discard pile',
      )
    ) {
      return {
        damage: {
          kind: 'count',
          baseDamage,
          perUnitDamage: 10,
          maxUnits: 6,
          source: { kind: 'pokemonInDiscard', side: 'own', max: 6 },
        },
      }
    }
    if (text.includes('flip a coin until you get tails')) {
      return {
        damage: {
          kind: 'headsMultiplier',
          damagePerHeads: 20,
          coinFlipCount: 0,
        },
        flipUntilTails: true,
      }
    }
    return null
  }

  const allPokemonSweep = text.match(
    /does (\d+) damage to each defending pokemon/,
  )
  if (name === 'double tack' && allPokemonSweep) {
    const amount = Number.parseInt(allPokemonSweep[1], 10)
    return {
      damage: { kind: 'fixed', amount },
      ignoreWeaknessResistanceOnBench: true,
      benchDamage: [
        {
          amount,
          side: 'opponent',
          zone: 'bench',
          ignoreWeaknessResistance: true,
        },
      ],
    }
  }
  const opponentBoardSweep = text.match(
    /does (\d+) damage to each of your opponent's pokemon/,
  )
  if (
    opponentBoardSweep &&
    ['spinning tail', 'hailstone', 'wide laser'].includes(name)
  ) {
    return boardSweep(
      Number.parseInt(opponentBoardSweep[1], 10),
      name === 'spinning tail' && text.includes('if heads')
        ? 'heads'
        : undefined,
    )
  }
  if (name === 'reactive poison') {
    return {
      damage: {
        kind: 'statusCountBonus',
        baseDamage,
        bonusDamagePerStatus: 30,
        statuses: allStatuses,
      },
    }
  }
  if (name === 'green bloom' || name === 'full bloom') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 50,
        minimumUnits: 3,
        source: {
          kind: 'namedPokemon',
          side: 'own',
          zone: 'play',
          names: ['Bellossom'],
        },
      },
    }
  }
  if (name === 'tonnage' || name === 'bouncy move') {
    const bonusDamage = name === 'tonnage' ? 30 : 50
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage },
      selfDamage: [{ kind: 'optionalChoice', amount: bonusDamage }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'standing by') {
    return {
      ...zero(),
      energyDiscard: [{ target: 'self', amount: 1 }],
      special: [
        {
          kind: 'buffAttack',
          target: 'self',
          attackName: 'Pulse Blast',
          baseDamage: 120,
        },
      ],
    }
  }
  if (name === 'beatdown') {
    return {
      damage: {
        kind: 'darknessOrNameTargetBonus',
        baseDamage,
        bonusDamage: 30,
        nameContains: 'dark',
      },
    }
  }
  if (name === 'hyper splash')
    return {
      damage: { kind: 'stage2TargetBonus', baseDamage, bonusDamage: 30 },
    }
  if (
    name === 'scramble trip' ||
    name === 'aftermath' ||
    name === 'psyloop' ||
    name === 'multi burn' ||
    name === 'multi pulse' ||
    name === 'multi bubble'
  ) {
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'green blast') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'energy', side: 'own' },
      },
    }
  }
  if (name === 'rock smash')
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: 20 },
      coinFlipCount: 1,
    }
  if (name === 'hyper healing') {
    return {
      ...zero(),
      healing: [{ amount: 10, side: 'own', zone: 'front' }],
      special: [
        { kind: 'clearStatusOnSide', side: 'own', statuses: allStatuses },
      ],
    }
  }
  if (name === 'upward kick') {
    return {
      damage: {
        kind: 'damageCounterThresholdBonus',
        baseDamage,
        bonusDamage: 30,
        minimumCounters: 2,
      },
    }
  }
  if (name === 'sacred fire') {
    return {
      damage: {
        kind: 'conditionalBonus',
        baseDamage: 0,
        bonusDamage: 60,
        condition: 'heads',
      },
      targetScope: 'any',
      coinFlipCount: 1,
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'pure power') {
    return {
      ...zero(),
      targetScope: 'any',
      counterDamage: [{ amount: 40, target: 'opponent' }],
    }
  }
  if (name === 'aeroblast') {
    return {
      damage: {
        kind: 'headsBonusEach',
        baseDamage,
        bonusDamage: 20,
        coinFlipCount: 2,
      },
      coinFlipCount: 2,
    }
  }
  if (name === 'blown kiss') {
    return {
      ...zero(),
      targetScope: 'any',
      counterDamage: [{ amount: 10, target: 'opponent' }],
    }
  }
  if (name === 'desperate punch') {
    return {
      damage: {
        kind: 'comparativeCount',
        baseDamage: 0,
        perUnitDamage: 10,
        addSource: { kind: 'pokemonInPlay', side: 'opponent' },
        subtractSource: { kind: 'pokemonInPlay', side: 'own' },
      },
    }
  }
  if (name === 'snap tail') return anyTargetDamage(baseDamage || 10)
  if (name === 'extra comet punch') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      special: [
        {
          kind: 'buffAttack',
          target: 'self',
          attackName: 'Extra Comet Punch',
          baseDamage: 30,
          damageBonus: 30,
        },
      ],
    }
  }
  if (name === 'copy') {
    return {
      ...zero(),
      choiceRequirement: 'copyAttack',
      special: [{ kind: 'copyAttack', preserveExtraCosts: false }],
    }
  }
  if (name === 'double attack') {
    return {
      damage: { kind: 'fixed', amount: 10 },
      targetScope: 'bench',
      ignoreWeaknessResistance: true,
      benchDamage: [
        {
          amount: 10,
          side: 'opponent',
          zone: 'bench',
          maxTargets: 1,
          excludeTarget: true,
          ignoreWeaknessResistance: true,
        },
      ],
    }
  }
  if (name === 'extra flame')
    return {
      damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 30 },
    }
  if (name === 'healing milk') {
    return {
      ...zero(),
      coinFlipCount: 2,
      healing: [
        {
          amount: 0,
          amountPerHead: 20,
          side: 'own',
          zone: 'play',
          maxTargets: 1,
        },
      ],
    }
  }
  if (name === 'twin play') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [
        {
          kind: 'searchDeckPokemon',
          maxCount: 2,
          includeNames: ['Scyther', 'Scyther ex'],
        },
      ],
    }
  }
  if (name === 'grand loop') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      choiceRequirement: 'optionalOwnBench',
      special: [{ kind: 'switch', target: 'self' }],
    }
  }
  if (name === 'call for family' || name === 'call for friend') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, basicOnly: true }],
    }
  }
  if (name === 'retaliate') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
      },
    }
  }
  if (name === 'trip over')
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: textBonus },
      coinFlipCount: 1,
    }
  if (name === 'minor errand-running') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'teary eyes') {
    return {
      ...zero(),
      protection: [{ target: 'self', kind: 'reduce', amount: 20 }],
    }
  }
  if (name === 'splatter')
    return { ...anyTargetDamage(10, true), ignoreWeaknessResistance: true }
  if (name === 'sore spot') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'target' },
      },
    }
  }
  if (name === 'upward lick') {
    return {
      damage: { kind: 'stage2TargetBonus', baseDamage: 30, bonusDamage: 20 },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'cross-cut')
    return {
      damage: { kind: 'evolvedTargetBonus', baseDamage, bonusDamage: 30 },
    }
  if (name === 'spiral leaf') {
    return {
      ...zero(),
      coinFlipCount: 1,
      counterDamage: [
        {
          amountPerHead: 10,
          side: 'opponent',
          zone: 'play',
          condition: 'heads',
        },
      ],
      healing: [
        {
          amount: 0,
          amountPerHead: 10,
          side: 'own',
          zone: 'play',
          condition: 'tails',
        },
      ],
    }
  }
  if (name === 'rainbow burn')
    return { damage: { kind: 'fixed', amount: baseDamage } }

  return null
}


function inferEx11TcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTargetDamage = (amount: number, ignoreTargetDamageModifiers = false): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
    ...(ignoreTargetDamageModifiers ? { ignoreTargetDamageModifiers: true } : {}),
  })
  const textBonus = Number.parseInt(text.match(/plus (\d+) more damage/)?.[1] || '0', 10)

  if (name === 'super slash') return { damage: { kind: 'evolvedTargetBonus', baseDamage, bonusDamage: textBonus } }
  if (name === 'target attack') {
    return {
      damage: { kind: 'damagedTargetBonus', baseDamage: 40, bonusDamage: 20 },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'psychic rage') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'attacker' } },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'black magic') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'bench', side: 'opponent' } } }
  }
  if (name === 'energy bone') {
    return {
      ...zero(),
      benchDamage: [{
        amount: 20,
        side: 'opponent',
        zone: 'play',
        maxTargetsFrom: { kind: 'energy', side: 'own' },
      }],
    }
  }
  if (name === 'crush and burn') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'chosenEnergy' } },
      energyDiscard: [{ target: 'self', amount: 'choice' }],
      choiceRequirement: 'energyAmount',
    }
  }
  if (name === 'energy burst') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'both' } } }
  }
  if (name === 'power blow') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'delta crush') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 20 },
      energyDiscard: [{ target: 'self', amount: 1, optional: true }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'feint attack') return anyTargetDamage(baseDamage || 30, true)
  if (name === 'extra ball') return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 20 } }
  if (name === 'gang up') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 10,
        source: { kind: 'pokemonOfTypesInPlay', side: 'own', types: ['Darkness', 'Metal'] },
      },
    }
  }
  if (name === 'holon splash') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'rend') return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 20 } }
  if (name === 'holon search' || name === 'pickup power') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'steep dive') {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
      special: [{ kind: 'buffAttack', target: 'self', attackName: 'Glide', baseDamage: 100, condition: 'tails' }],
    }
  }
  if (name === 'mist attack') {
    return {
      damage: { kind: 'fixed', amount: 10 },
      benchDamage: [{ amount: 10, side: 'opponent', zone: 'bench', ignoreWeaknessResistance: true }],
    }
  }
  if (name === 'copy') {
    return { ...zero(), choiceRequirement: 'copyAttack', special: [{ kind: 'copyAttack', preserveExtraCosts: true }] }
  }
  if (name === 'slam') {
    return { damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 2 }, coinFlipCount: 2 }
  }
  if (name === 'sonic signal') {
    return {
      damage: { kind: 'fixed', amount: 10 },
      targetScope: 'any',
      benchDamage: [{ amount: 10, side: 'opponent', zone: 'play', maxTargets: 1, excludeTarget: true }],
    }
  }
  if (name === 'call for family') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, basicOnly: true }],
    }
  }
  if (name === 'calm mind') return { ...zero(), healing: [{ target: 'self', amount: 30 }] }
  if (name === 'psychic boom') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'opponent' } } }
  }
  if (name === 'disable') {
    return { ...zero(), choiceRequirement: 'disableAttack', special: [{ kind: 'disableAttack' }] }
  }
  if (name === 'roar') {
    return {
      ...zero(),
      choiceRequirement: 'optionalOpponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }
  if (['sharp claws', 'stomp', 'rising lunge', 'ambush', 'quick blow', 'jump on'].includes(name)) {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: textBonus }, coinFlipCount: 1 }
  }
  if (['snap tail', 'skill dive', 'linear attack'].includes(name)) {
    const amount = Number.parseInt(text.match(/does (\d+) damage to that pokemon/)?.[1] || String(baseDamage), 10)
    return anyTargetDamage(amount)
  }
  if (name === 'second bite') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'target' } } }
  }

  return null
}

function inferEx12TcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const textBonus = Number.parseInt(text.match(/plus (\d+) more damage/)?.[1] || '0', 10)
  const anyTargetDamage = (amount: number, ignoreTargetDamageModifiers = false): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
    ...(ignoreTargetDamageModifiers ? { ignoreTargetDamageModifiers: true } : {}),
  })

  if (name === 'power blow') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'heavy blow') {
    return { damage: { kind: 'subtractCount', baseDamage, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'attacker' } } }
  }
  if (name === 'bound crush') {
    return {
      ...anyTargetDamage(baseDamage || 60),
      special: [{ kind: 'disableSelfAttack', attackName: 'Bound Crush' }],
    }
  }
  if (name === 'linear attack' || name === 'tongue whip' || name === 'random spark' || name === 'water arrow') {
    const amount = Number.parseInt(text.match(/does (\d+) damage to that pokemon/)?.[1] || String(baseDamage), 10)
    return anyTargetDamage(amount)
  }
  if (name === 'cursed reaction') {
    return { ...zero(), targetScope: 'any', counterDamage: [{ amount: 20, target: 'opponent' }] }
  }
  if (name === 'mend') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }], healing: [{ target: 'self', amount: 20 }] }
  }
  if (name === 'enraged linear attack') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'attacker' } },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'extra claws' || name === 'bite off') {
    return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 30 } }
  }
  if (name === 'swift blow') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'cross-cut') return { damage: { kind: 'evolvedTargetBonus', baseDamage, bonusDamage: 30 } }
  if (name === 'sharp leaf' || name === 'tumbling attack' || name === 'quick attack' || name === 'firebreathing' || name === 'rising lunge' || name === 'jump on') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: textBonus }, coinFlipCount: 1 }
  }
  if (name === 'rely on friends') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'pokemonEvolvedOnBench', side: 'own' },
      },
    }
  }
  if (name === 'feint attack') return anyTargetDamage(baseDamage || 20, true)
  if (name === 'multiple force') {
    return {
      damage: {
        kind: 'gatedCount',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'namedPokemonContains', side: 'both', zone: 'play', values: ['Magnemite', 'Magneton'] },
        gateSource: { kind: 'energy', side: 'own' },
        minimumGateUnits: 1,
      },
    }
  }
  if (name === 'bi-blast') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 20,
        source: { kind: 'energy', side: 'own' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'call for family') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, includeNames: ['Lunatone'] }],
    }
  }
  if (name === 'grind') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'influence') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{
        kind: 'searchDeckPokemon',
        maxCount: 2,
        includeNames: ['Omanyte', 'Kabuto', 'Aerodactyl', 'Lileep', 'Anorith'],
        treatAsBasic: true,
      }],
    }
  }
  if (name === 'quick blow') return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: textBonus }, coinFlipCount: 1 }
  if (name === 'rest') {
    return {
      ...zero(),
      healing: [{ target: 'self', amount: 50 }],
      status: [{ target: 'self', statuses: ['asleep'] }],
      special: [{ kind: 'clearStatus', target: 'self', statuses: ['poisoned', 'burned', 'paralyzed', 'confused'] }],
    }
  }
  if (name === 'split kick' || name === 'double tackle') {
    const amount = Number.parseInt(text.match(/does (\d+) damage to each defending pokemon/)?.[1] || '20', 10)
    return {
      damage: { kind: 'fixed', amount },
      benchDamage: [{ amount, side: 'opponent', zone: 'front', excludeTarget: true }],
    }
  }
  if (name === 'self charge' || name === 'drawup power' || name === 'important errands') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'iron defense') {
    return { ...zero(), coinFlipCount: 1, protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }] }
  }
  if (name === 'continuous tumble' || name === 'iron tail') {
    return { damage: { kind: 'headsMultiplier', damagePerHeads: name === 'iron tail' ? 20 : 10, coinFlipCount: 0 }, flipUntilTails: true }
  }
  if (name === 'pebble throw') {
    return { damage: { kind: 'fixed', amount: 10 }, targetScope: 'bench', ignoreWeaknessResistance: true }
  }
  if (name === 'string pull') {
    return {
      ...zero(),
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }
  if (name === 'reactive blast') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 30, source: { kind: 'chosenEnergy' } },
      energyDiscard: [{ target: 'self', amount: 'choice' }],
      choiceRequirement: 'energyAmount',
    }
  }
  if (name === 'power move') {
    return {
      ...zero(),
      energyGain: [{ target: 'self', amount: 1 }],
      choiceRequirement: 'optionalOwnBench',
      special: [{ kind: 'switch', target: 'self' }],
    }
  }
  if (name === 'final laser') {
    return { ...zero(), targetScope: 'any', counterDamage: [{ amount: 30, target: 'opponent' }] }
  }

  return null
}

function inferEx13TcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const textBonus = Number.parseInt(text.match(/plus (\d+) more damage/)?.[1] || '0', 10)
  const anyTargetDamage = (amount: number, ignoreTargetDamageModifiers = false): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
    ...(ignoreTargetDamageModifiers ? { ignoreTargetDamageModifiers: true } : {}),
  })

  if (name === 'thunderous blow') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'extra flame') {
    return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: textBonus } }
  }
  if (name === 'vengeful spikes') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        maxUnits: 6,
        source: {
          kind: 'namedPokemonInDiscard',
          side: 'own',
          names: ['Omanyte', 'Omastar', 'Kabuto', 'Kabutops', 'Kabutops ex'],
        },
      },
    }
  }
  if (name === 'zzzap') {
    return {
      ...zero(),
      benchDamage: [{ amount: 20, side: 'both', zone: 'play', ignoreWeaknessResistance: true }],
    }
  }
  if (name === 'delta search') return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  if (name === 'poltergeist' || name === 'mind play') {
    // Battle decks contain Pokémon only, so the Trainer-in-hand condition is always false.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'aqua wave' || name === 'knock away' || name === 'quick blow' || name === 'quick attack' || name === 'rising lunge' || name === 'steel headbutt') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: textBonus }, coinFlipCount: 1 }
  }
  if (name === 'feint attack') {
    return {
      ...anyTargetDamage(baseDamage || 10, true),
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'psychic erase' || name === 'disable') {
    return { ...zero(), choiceRequirement: 'disableAttack', special: [{ kind: 'disableAttack' }] }
  }
  if (name === 'outrage') {
    return {
      damage: {
        kind: 'conditionalCount',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
        condition: 'heads',
        failureDamage: 0,
      },
      coinFlipCount: 1,
    }
  }
  if (name === 'grind') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'fury cutter') {
    return { damage: { kind: 'headsTable', damages: [10, 20, 30, 50], coinFlipCount: 3 }, coinFlipCount: 3 }
  }
  if (name === 'wide laser') {
    return { ...zero(), benchDamage: [{ amount: 10, side: 'opponent', zone: 'play' }] }
  }
  if (name === 'delta circle') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'deltaPokemonInPlay', side: 'own' },
      },
    }
  }
  if (name === 'split bomb') {
    return {
      ...anyTargetDamage(30),
      benchDamage: [{ amount: 30, side: 'opponent', zone: 'play', maxTargets: 1, excludeTarget: true }],
    }
  }
  if (name === 'iron head') {
    return { damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 0 }, flipUntilTails: true }
  }
  if (name === 'sweet scent') {
    return {
      ...zero(),
      choiceRequirement: 'ownBench',
      healing: [{ target: 'selectedOwnBench', amount: 20 }],
    }
  }
  if (name === 'wreck') {
    // Stadium cards are not part of this battle format; use the printed base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'swift turn') {
    return { damage: { kind: 'resistanceTypeBonus', baseDamage, bonusDamage: textBonus, resistanceType: 'Fighting' } }
  }
  if (name === 'call for friends') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 2, basicOnly: true }],
    }
  }
  if (name === 'retaliate') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'attacker' } } }
  }
  if (name === 'pebble throw') {
    return { damage: { kind: 'fixed', amount: 20 }, targetScope: 'bench', ignoreWeaknessResistance: true }
  }
  if (name === 'water arrow') return anyTargetDamage(20)
  if (name === 'paste') return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  if (name === 'power blow') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'hyper claws') {
    return { damage: { kind: 'stage2TargetBonus', baseDamage, bonusDamage: textBonus } }
  }
  if (name === 'psychic star') {
    return {
      damage: { kind: 'evolvedTargetBonus', baseDamage, bonusDamage: textBonus },
      energyDiscard: [{ target: 'self', amount: 'all', targetEvolved: true }],
    }
  }
  if (name === 'spring back') return { damage: { kind: 'fixed', amount: baseDamage } }
  if (name === 'super psywave') {
    return {
      ...zero(),
      targetScope: 'any',
      counterDamage: [{ amountPerUnit: 10, source: { kind: 'energy', side: 'opponent' }, target: 'opponent' }],
    }
  }

  return null
}

function inferEx14TcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const textBonus = Number.parseInt(text.match(/plus (\d+) more damage/)?.[1] || '0', 10)
  const anyTargetDamage = (amount: number, ignoreTargetDamageModifiers = false): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
    ...(ignoreTargetDamageModifiers ? { ignoreTargetDamageModifiers: true } : {}),
  })

  if (name === 'enraged linear attack') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'attacker' } },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'linear attack' || name === 'bass control') {
    const amount = Number.parseInt(text.match(/does (\d+) damage to that pokemon/)?.[1] || String(baseDamage), 10)
    return anyTargetDamage(amount)
  }
  if (name === 'even game') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{
        kind: 'searchDeckPokemon',
        maxCount: 6,
        maxCountFrom: { kind: 'pokemonInPlay', side: 'opponent' },
        basicOnly: true,
      }],
    }
  }
  if (name === 'bite off') return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: textBonus } }
  if (name === 'pick and choose') {
    return {
      ...zero(),
      choiceRequirement: 'statusPair',
      status: [{
        target: 'opponent',
        statuses: ['burned', 'poisoned', 'asleep', 'confused'],
        useChosenStatusPair: true,
      }],
    }
  }
  if (name === 'reactive poison') {
    return {
      damage: {
        kind: 'statusCountBonus',
        baseDamage,
        bonusDamagePerStatus: textBonus,
        statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'],
      },
    }
  }
  if (name === 'call for family') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: attack.name.toLowerCase() === 'call for family' && text.includes('up to 2') ? 2 : 1, basicOnly: true }],
    }
  }
  if (name === 'pester') {
    return {
      damage: {
        kind: 'statusBonus',
        baseDamage,
        bonusDamage: textBonus,
        statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'],
      },
    }
  }
  if (name === 'triple needle') {
    return {
      ...anyTargetDamage(10),
      benchDamage: [{ amount: 10, side: 'opponent', zone: 'play', maxTargets: 2, excludeTarget: true }],
    }
  }
  if (name === 'focus energy') {
    return {
      ...zero(),
      special: [{ kind: 'buffAttack', target: 'self', attackName: 'High Jump Kick', baseDamage: 70 }],
    }
  }
  if (name === 'circular steps') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 10,
        source: { kind: 'pokemonInPlay', side: 'both', excludeAttacker: true },
      },
    }
  }
  if (name === 'prop-up pinchers' || name === 'hyper tail') {
    // Pokémon Tool cards and Poké-Powers/Poké-Bodies are not represented in these decks.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'green blast') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'firebreathing' || name === 'sharp leaf' || name === 'rising lunge' || name === 'quick blow' || name === 'vital pinchers') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: textBonus }, coinFlipCount: 1 }
  }
  if (name === 'detect') {
    return { ...zero(), coinFlipCount: 1, protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }] }
  }
  if (name === 'stretch vine') {
    const amount = Number.parseInt(text.match(/does (\d+) damage to that pokemon/)?.[1] || String(baseDamage), 10)
    return { damage: { kind: 'fixed', amount }, targetScope: 'bench', ignoreWeaknessResistance: true }
  }
  if (name === 'roar') {
    return {
      ...zero(),
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }
  if (name === 'self charge' || name === 'growth') return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  if (name === 'feint attack') return { ...anyTargetDamage(baseDamage || 20, true), ignoreWeaknessResistance: true }
  if (name === 'tail whip') {
    return {
      ...zero(),
      choiceRequirement: 'disableAttack',
      coinFlipCount: 1,
      special: [{ kind: 'disableAttack', condition: 'heads' }],
    }
  }
  if (name === 'retaliate') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'attacker' } } }
  }
  if (name === 'pure power') {
    return { ...zero(), targetScope: 'any', counterDamage: [{ amount: 20, target: 'opponent' }] }
  }
  if (name === 'nap') return { ...zero(), healing: [{ target: 'self', amount: 20 }] }
  if (name === 'psywave') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'opponent' } } }
  }
  if (name === 'split bomb') {
    return {
      ...anyTargetDamage(30),
      benchDamage: [{ amount: 30, side: 'opponent', zone: 'play', maxTargets: 1, excludeTarget: true }],
    }
  }
  if (name === 'hydro shot') {
    return {
      ...anyTargetDamage(70),
      energyDiscard: [{ target: 'self', amount: 2 }],
    }
  }
  if (name === 'power revenge') return { damage: { kind: 'fixed', amount: baseDamage } }
  if (name === 'target attack') {
    return {
      ...anyTargetDamage(30),
      damage: { kind: 'damagedTargetBonus', baseDamage: 30, bonusDamage: 20 },
    }
  }
  if (name === 'leaf shade') {
    return {
      ...zero(),
      targetScope: 'any',
      counterDamage: [{ amountPerUnit: 10, source: { kind: 'energy', side: 'own' }, target: 'opponent' }],
    }
  }

  return null
}

function inferEx15TcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const textBonus = Number.parseInt(text.match(/plus (\d+) more damage/)?.[1] || '0', 10)
  const anyTargetDamage = (amount: number, ignoreTargetDamageModifiers = false): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
    ...(ignoreTargetDamageModifiers ? { ignoreTargetDamageModifiers: true } : {}),
  })

  if (name === 'delta circle') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'deltaPokemonInPlay', side: 'own' },
      },
    }
  }
  if (name === 'extra claws') return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: textBonus } }
  if (name === 'linear attack') return anyTargetDamage(30)
  if (name === 'vengeance') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        maxUnits: 6,
        source: { kind: 'pokemonInDiscard', side: 'own', max: 6 },
      },
    }
  }
  if (name === 'delta copy') {
    return {
      ...zero(),
      targetScope: 'any',
      targetMustHaveDeltaMark: true,
      choiceRequirement: 'copyAttack',
      special: [{ kind: 'copyAttack', preserveExtraCosts: true }],
    }
  }
  if (name === 'strangle') {
    return { damage: { kind: 'deltaSpeciesTargetBonus', baseDamage, bonusDamage: textBonus } }
  }
  if (name === 'grind') {
    const timesEnergy = attack.damage?.includes('×') || /damage times the amount of energy/.test(text)
    return {
      damage: {
        kind: 'count',
        baseDamage: timesEnergy ? 0 : baseDamage,
        perUnitDamage: 10,
        source: { kind: 'energy', side: 'own' },
      },
    }
  }
  if (name === 'surge') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: textBonus,
        source: { kind: 'energy', side: 'own' },
        minimumUnits: 2,
      },
    }
  }
  if (name === 'pump out') return { damage: { kind: 'fixed', amount: baseDamage } }
  if (name === 'tail sting') {
    return {
      damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: textBonus },
      status: [{ target: 'opponent', statuses: ['poisoned'], targetSubtype: 'ex' }],
    }
  }
  if (name === 'delta mind') {
    return {
      ...zero(),
      targetScope: 'any',
      counterDamage: [{ amount: 10, target: 'opponent', deltaTargetBonus: 20 }],
    }
  }
  if (name === 'quick blow' || name === 'quick attack') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: textBonus }, coinFlipCount: 1 }
  }
  if (name === 'scary face') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [
        { kind: 'cannotAttack', target: 'opponent', condition: 'heads' },
        { kind: 'preventRetreat', condition: 'heads' },
      ],
    }
  }
  if (name === 'extra ball') {
    return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: textBonus } }
  }
  if (name === 'flickering tail') {
    return {
      damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: textBonus },
      status: [{ target: 'opponent', statuses: ['asleep'], targetSubtype: 'ex' }],
    }
  }
  if (name === 'charm') {
    return { ...zero(), protection: [{ target: 'self', kind: 'reduce', amount: 20, attackerOnly: true }] }
  }
  if (name === 'thunder spear') return anyTargetDamage(10)
  if (name === 'tail whip') {
    return {
      ...zero(),
      choiceRequirement: 'disableAttack',
      coinFlipCount: 1,
      special: [{ kind: 'disableAttack', condition: 'heads' }],
    }
  }
  if (name === 'psychic boom') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'opponent' } } }
  }
  if (name === 'calm mind') return { ...zero(), healing: [{ target: 'self', amount: 20 }] }
  if (name === 'splash about') return { damage: { kind: 'energyComparisonBonus', baseDamage, bonusDamage: textBonus } }
  if (name === 'quick bind') {
    return {
      ...anyTargetDamage(baseDamage || 10, true),
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'special circuit') return anyTargetDamage(30)
  if (name === 'electromark') {
    return { ...zero(), targetScope: 'any', special: [{ kind: 'placeMarker', marker: 'shockWave' }] }
  }
  if (name === 'hyper claws') {
    return { damage: { kind: 'stage2TargetBonus', baseDamage, bonusDamage: textBonus } }
  }
  if (name === 'shock-wave') {
    return {
      damage: { kind: 'targetToRemainingHp', remainingHp: 0 },
      targetScope: 'any',
      ignoreWeaknessResistance: true,
      ignoreTargetDamageModifiers: true,
      special: [{ kind: 'markerDamage', marker: 'shockWave', amount: 0 }],
    }
  }
  if (name === 'mimicry') {
    return {
      ...zero(),
      targetScope: 'any',
      choiceRequirement: 'copyAttack',
      special: [{ kind: 'copyAttack', preserveExtraCosts: true }],
    }
  }
  if (name === 'rainbow wave') {
    return {
      ...zero(),
      benchDamage: [{ amount: 20, side: 'opponent', zone: 'play', selectedEnergyType: true }],
    }
  }

  return null
}

function inferEx16TcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const textBonus = Number.parseInt(text.match(/plus (\d+) more damage/)?.[1] || '0', 10)

  if (name === 'rock blast') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'chosenEnergy' } },
      energyDiscard: [{ target: 'self', amount: 'choice' }],
      choiceRequirement: 'energyAmount',
      choiceEnergyMax: 5,
      targetScope: 'any',
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'grudge') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'pokemonInDiscard', side: 'own', max: 6 },
      },
    }
  }
  if (name === 'max energy source' || name === 'magnetic force') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'energy burst') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'both' } } }
  }
  if (name === 'cross chop') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: textBonus }, coinFlipCount: 1 }
  }
  if (name === 'call for family') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: text.includes('up to 2 basic pokemon') ? 2 : 1, basicOnly: true }],
    }
  }
  if (name === 'dark burst' || name === 'wreck') {
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'quick attack' || name === 'sharp claws' || name === 'stomp' || name === 'steady punch' || name === 'ambush' || name === 'positive ion') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: textBonus }, coinFlipCount: 1 }
  }
  if (name === 'feint attack') {
    return {
      damage: { kind: 'fixed', amount: baseDamage || Number.parseInt(text.match(/does (\d+) damage/)?.[1] || '0', 10) },
      targetScope: 'any',
      ignoreWeaknessResistance: true,
      ignoreTargetDamageModifiers: true,
    }
  }
  if (name === 'fury cutter') {
    return {
      damage: { kind: 'headsTable', damages: [baseDamage, baseDamage + 10, baseDamage + 30, baseDamage + 50], coinFlipCount: 3 },
      coinFlipCount: 3,
    }
  }
  if (name === 'scary face') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [
        { kind: 'cannotAttack', target: 'opponent', condition: 'heads' },
        { kind: 'preventRetreat', condition: 'heads' },
      ],
    }
  }
  if (name === 'extra comet punch') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      special: [{ kind: 'buffAttack', target: 'self', attackName: 'Extra Comet Punch', baseDamage, damageBonus: textBonus }],
    }
  }
  if (name === 'dig deep' || name === 'charge') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'retaliate') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
      },
    }
  }
  if (name === 'influence') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 2, includeNames: ['Omanyte', 'Kabuto', 'Aerodactyl', 'Lileep', 'Anorith'], treatAsBasic: true }],
    }
  }
  if (name === 'nap') return { ...zero(), healing: [{ target: 'self', amount: 20 }] }
  if (name === 'double spin') {
    return { damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 2 }, coinFlipCount: 2 }
  }
  if (name === 'tail whip') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [{ kind: 'cannotAttack', target: 'opponent', condition: 'heads' }],
    }
  }
  if (name === 'pebble throw') {
    return {
      damage: { kind: 'fixed', amount: baseDamage || Number.parseInt(text.match(/does (\d+) damage/)?.[1] || '0', 10) },
      targetScope: 'bench',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'psychic boom') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'opponent' } } }
  }
  if (name === 'skill hack') {
    return {
      ...zero(),
      choiceRequirement: 'copyAttack',
      special: [{ kind: 'copyAttack', preserveExtraCosts: true }],
    }
  }

  return null
}

function inferDp1TcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const textBonus = Number.parseInt(text.match(/plus (\d+) more damage/)?.[1] || '0', 10)
  const anyTargetDamage = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
  })

  if (name === 'ice blade') return anyTargetDamage(40)
  if (name === 'meteor punch') {
    return { damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 0 }, flipUntilTails: true }
  }
  if (name === 'metal blast') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'call for family') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, basicOnly: true }],
    }
  }
  if (name === 'avenge') {
    return {
      ...zero(),
      counterDamage: [{
        amountPerUnit: 10,
        source: { kind: 'injuredPokemon', side: 'own', zone: 'play' },
        target: 'opponent',
      }],
    }
  }
  if (name === 'psywave') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'energy', side: 'opponent' } } }
  }
  if (name === 'spirit dance') {
    return { damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: textBonus, coinFlipCount: 2 }, coinFlipCount: 2 }
  }
  if (name === 'frustration') {
    return {
      ...anyTargetDamage(30),
      targetMustBeUndamaged: true,
    }
  }
  if (name === 'rest') {
    return {
      ...zero(),
      healing: [{ target: 'self', amount: 40 }],
      special: [
        { kind: 'clearStatus', target: 'self', statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'] },
        { kind: 'setStatus', target: 'self', statuses: ['asleep'] },
      ],
    }
  }
  if (name === 'stomp' || name === 'horn slash' || name === 'fasten claws' || name === 'water splash' || name === 'quick attack' || name === 'needling sting') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: textBonus }, coinFlipCount: 1 }
  }
  if (name === 'life drain') {
    return {
      damage: { kind: 'targetToRemainingHp', remainingHp: 10, condition: 'heads' },
      coinFlipCount: 1,
      ignoreWeaknessResistance: true,
      ignoreTargetDamageModifiers: true,
    }
  }
  if (name === 'shadow dance') {
    return {
      ...zero(),
      targetScope: 'any',
      counterDamage: [{ amount: 40, target: 'opponent' }],
      choiceRequirement: 'optionalOwnBench',
      special: [{ kind: 'switch', target: 'self', optional: true }],
    }
  }
  if (name === 'healing wish') {
    return {
      ...zero(),
      flipUntilTails: true,
      healing: [{ target: 'self', amount: 0, amountPerHead: 10 }],
    }
  }
  if (name === 'revenge') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: textBonus,
        source: { kind: 'pokemonInDiscard', side: 'own' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'force palm') {
    return {
      ...zero(),
      targetScope: 'any',
      counterDamage: [{
        amountPerUnit: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
        target: 'opponent',
      }],
    }
  }
  if (name === 'extrasensory') {
    return { damage: { kind: 'handSizeComparisonBonus', baseDamage, bonusDamage: textBonus, comparison: 'equal' } }
  }
  if (name === 'minor errand-running' || name === 'outlet' || name === 'synthesis') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'block') return { ...zero(), special: [{ kind: 'preventRetreat' }] }
  if (name === 'ease up') {
    return { damage: { kind: 'evolvedFromBonus', baseDamage, bonusDamage: textBonus, evolvesFrom: 'Munchlax' } }
  }
  if (name === 'leaf honey') {
    return {
      ...zero(),
      energyDiscard: [{ target: 'self', amount: 1 }],
      minimumExtraEnergyDiscard: 1,
      choiceRequirement: 'ownBench',
      healing: [{ target: 'selectedOwnBench', amount: 'all', sameTypeAsAttacker: true }],
    }
  }
  if (name === 'attack order') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 10,
        source: { kind: 'pokemonOfTypesInPlay', side: 'both', types: ['Grass'] },
      },
    }
  }
  if (name === 'dark pulse') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'countercharge') {
    return {
      ...zero(),
      coinFlipCount: 1,
      counterDamage: [{
        amountPerUnit: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
        target: 'opponent',
        condition: 'heads',
      }],
      healing: [{ target: 'self', amount: 'all', condition: 'heads' }],
    }
  }
  if (name === 'charm') {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'reduce', amount: 20, attackerOnly: true, condition: 'heads' }],
    }
  }
  if (name === 'magical leaf') {
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: textBonus },
      coinFlipCount: 1,
      healing: [{ target: 'self', amount: 30, condition: 'heads' }],
    }
  }
  if (name === 'roam') {
    return {
      ...zero(),
      coinFlipCount: 1,
      counterDamage: [
        { amount: 20, side: 'opponent', zone: 'play', condition: 'heads' },
        { amount: 20, side: 'own', zone: 'play', maxTargets: 1, condition: 'tails' },
      ],
    }
  }
  if (name === 'aqua shower') {
    return {
      damage: { kind: 'fixed', amount: 10 },
      benchDamage: [{ amount: 10, side: 'opponent', zone: 'bench', ignoreWeaknessResistance: true }],
    }
  }
  if (name === 'brine') {
    return { damage: { kind: 'fixed', amount: 40 }, targetScope: 'any', targetMustBeDamaged: true, ignoreWeaknessResistanceOnBench: true }
  }
  if (name === 'storm up') return { damage: { kind: 'fixed', amount: baseDamage } }
  if (name === 'fake tears') {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'reduce', amount: 30, attackerOnly: true, condition: 'heads' }],
    }
  }
  if (name === 'splash about') {
    return { damage: { kind: 'energyComparisonBonus', baseDamage, bonusDamage: textBonus } }
  }
  if (name === 'moon impact') {
    return { damage: { kind: 'evolvedFromBonus', baseDamage, bonusDamage: textBonus, evolvesFrom: 'Cleffa' } }
  }
  if (name === 'disable') {
    return {
      ...zero(),
      coinFlipCount: 1,
      choiceRequirement: 'disableAttack',
      special: [{ kind: 'disableAttack', condition: 'heads' }],
    }
  }
  if (name === 'thunderpunch') {
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: textBonus },
      coinFlipCount: 1,
      selfDamage: [{ kind: 'fixed', amount: 10, condition: 'tails' }],
    }
  }
  if (name === 'pain payback') {
    return {
      ...zero(),
      targetScope: 'any',
      attackerMustBeDamaged: true,
      counterDamage: [{ amount: 10, target: 'opponent' }],
      healing: [{ target: 'self', amount: 10 }],
    }
  }
  if (name === 'resonance') {
    return { damage: { kind: 'statusBonus', baseDamage, bonusDamage: textBonus, statuses: ['confused'] } }
  }
  if (name === 'rollout') {
    return { damage: { kind: 'evolvedFromBonus', baseDamage, bonusDamage: textBonus, evolvesFrom: 'Azurill' } }
  }
  if (name === 'detect') {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
    }
  }
  if (name === 'tunneling') {
    return {
      ...zero(),
      benchDamage: [{ amount: 10, side: 'opponent', zone: 'bench', maxTargets: 2, ignoreWeaknessResistance: true }],
      special: [{ kind: 'disableSelfAttack', attackName: 'Tunneling' }],
    }
  }
  if (name === 'bide') {
    return { ...zero(), coinFlipCount: 1, special: [{ kind: 'endure', condition: 'heads' }] }
  }
  if (name === 'feint attack') {
    return {
      damage: { kind: 'fixed', amount: 20 },
      targetScope: 'any',
      ignoreWeaknessResistance: true,
      ignoreTargetDamageModifiers: true,
    }
  }
  if (name === 'hydro impact') {
    return {
      ...anyTargetDamage(80),
      special: [{ kind: 'disableSelfAttack', attackName: 'Hydro Impact' }],
    }
  }

  return null
}

function inferDp2TcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTargetDamage = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
  })

  if (name === 'heap up' || name === 'payback' || name === 'ground burn') {
    // Discard, deck, and Prize cards are not modeled by the battle format.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'hard metal') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 40 },
      selfDamage: [{ kind: 'optionalChoice', amount: 40 }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'happy chance') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } },
      energyGain: [{ target: 'self', amount: 1 }],
    }
  }
  if (name === 'sprouting') return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  if (name === 'energy cyclone') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'chosenEnergy' } },
      energyDiscard: [{ target: 'self', amount: 'choice' }],
      choiceRequirement: 'energyAmount',
    }
  }
  if (name === 'reverse stream') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'fire counterattack') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 30,
        source: { kind: 'pokemonOfTypesInPlay', side: 'opponent', types: ['Fire'] },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'electromagnetic induction' || name === 'nutritional support') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  }
  if (name === 'explosive thunder') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 30, source: { kind: 'energy', side: 'own' } },
      energyDiscard: [{ target: 'self', amount: 'all' }],
    }
  }
  if (name === 'mind off') {
    return {
      damage: {
        kind: 'namedPokemonSetBonus',
        baseDamage,
        bonusDamage: 20,
        side: 'own',
        names: ['Mesprit', 'Azelf'],
      },
      status: [{
        target: 'opponent',
        statuses: ['asleep'],
        requiresNamedPokemon: { side: 'own', names: ['Mesprit', 'Azelf'] },
      }],
    }
  }
  if (name === 'strike and fade') return anyTargetDamage(50)
  if (name === 'string bomb') {
    return {
      damage: { kind: 'coinCount', amountPerHeads: 30, coinFlipCount: 0 },
      coinFlipCount: 0,
      coinFlipSource: { kind: 'energy', side: 'both' },
    }
  }
  if (name === 'concerto') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'namedPokemonContains', side: 'own', zone: 'play', values: ['Kricketot', 'Kricketune'] },
      },
    }
  }
  if (name === 'lightning twister') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'trick play') {
    // The hidden guess is represented by a coin flip: heads hits the foe, tails hurts Mr. Mime.
    return {
      damage: { kind: 'conditionalBonus', baseDamage: 0, bonusDamage: 50, condition: 'heads' },
      coinFlipCount: 1,
      selfDamage: [{ kind: 'fixed', amount: 20, condition: 'tails' }],
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'hidden power') {
    if (text.includes('if heads, this attack does 30 damage. if tails, this attack does 30 damage to 1 of your pokemon')) {
      return {
        damage: { kind: 'conditionalBonus', baseDamage: 0, bonusDamage: 30, condition: 'heads' },
        coinFlipCount: 1,
        counterDamage: [{ amount: 30, side: 'own', zone: 'play', maxTargets: 1, condition: 'tails' }],
        ignoreWeaknessResistance: true,
      }
    }
    // The other Hidden Power variants alter coin flips, attached Energy, or hands.
    return null
  }
  if (name === 'defensive claw') {
    return {
      damage: {
        kind: 'namedPokemonBenchBonus',
        baseDamage,
        bonusDamage: 20,
        injuredBonusDamage: 40,
        nameContains: 'Teddiursa',
      },
      healing: [{ amount: 'all', side: 'own', zone: 'bench', maxTargets: 1, nameContains: 'Teddiursa' }],
    }
  }
  if (name === 'fury') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'damageCounters', target: 'attacker' } } }
  }
  if (name === 'triple pick') {
    return {
      ...zero(),
      benchDamage: [{
        amount: 30,
        side: 'opponent',
        zone: 'play',
        maxTargets: 3,
        subtypeFilter: { include: ['Stage 1', 'Stage 2'] },
      }],
    }
  }
  if (name === 'gather up') return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  if (name === 'marvelous shine') {
    return {
      ...zero(),
      coinFlipCount: 1,
      targetScope: 'any',
      counterDamage: [
        { amount: 40, target: 'opponent', condition: 'heads' },
        { amount: 40, side: 'own', zone: 'play', maxTargets: 1, condition: 'tails' },
      ],
    }
  }
  if (name === 'rock cannon') {
    return { damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 0 }, flipUntilTails: true }
  }
  if (name === 'lively') return { ...zero(), healing: [{ target: 'self', amount: 20 }] }
  if (name === 'mend') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }], healing: [{ target: 'self', amount: 20 }] }
  }
  if (name === 'centrifugal force') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'retreatCost', target: 'target' } } }
  }
  if (name === 'swirling ripple') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 30,
        source: { kind: 'pokemonOfTypesInPlay', side: 'opponent', types: ['Water'] },
        minimumUnits: 1,
      },
      status: [{ target: 'opponent', statuses: ['confused'], requiresPokemonType: { side: 'opponent', type: 'Water' } }],
    }
  }
  if (name === 'aqua liner' || name === 'ice rider') return anyTargetDamage(name === 'aqua liner' ? 40 : 30)
  if (name === 'pressurized gas') {
    return { ...zero(), benchDamage: [{ amount: 10, side: 'opponent', zone: 'play' }] }
  }
  if (name === 'spike armor') return { ...zero(), special: [{ kind: 'reflectDamage', reflectFixedDamage: 40 }] }
  if (name === 'shield attack') return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 20 }, coinFlipCount: 1 }
  if (name === 'bonus leaf') {
    return {
      ...zero(),
      healing: [{ amount: 30, side: 'own', zone: 'bench', sameTypeAsAttacker: true }],
    }
  }
  if (name === 'throw off') return anyTargetDamage(20)
  if (name === 'mud spit') {
    return { ...zero(), coinFlipCount: 1, benchDamage: [{ amount: 10, side: 'opponent', zone: 'play', condition: 'heads' }] }
  }
  if (name === 'quick attack' || name === 'jump on' || name === 'bikabika') {
    const bonusDamage = name === 'quick attack' ? 30 : name === 'jump on' ? 10 : 10
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage }, coinFlipCount: 1 }
  }
  if (name === 'mountain bite') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 10 },
      choiceRequirement: 'optionalBonus',
      status: [{ target: 'self', statuses: ['asleep'], requiresOptionalChoice: true }],
    }
  }
  if (name === 'direct-hit bomb') {
    return {
      damage: { kind: 'coinCount', amountPerHeads: 10, coinFlipCount: 0 },
      coinFlipCount: 0,
      coinFlipSource: { kind: 'energy', side: 'own' },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'elegant swim') {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
    }
  }
  if (name === 'stone throw') {
    return {
      ...zero(),
      benchDamage: [{ amount: 10, side: 'opponent', zone: 'bench', maxTargets: 2, ignoreWeaknessResistance: true }],
    }
  }
  if (name === 'call for family') {
    if (attack.text.includes('Nidoran')) {
      return {
        ...zero(),
        choiceRequirement: 'deckPokemon',
        special: [{ kind: 'searchDeckPokemon', maxCount: 1, includeNames: ['Nidoran ♀', 'Nidoran ♂'], treatAsBasic: true }],
      }
    }
    return { ...zero(), choiceRequirement: 'deckPokemon', special: [{ kind: 'searchDeckPokemon', maxCount: 1, basicOnly: true }] }
  }
  if (name === 'swarm') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, includeNames: ['Murkrow'], treatAsBasic: true }],
    }
  }
  if (name === 'sharpshooting') return anyTargetDamage(10)
  if (name === 'sand attack') return { ...zero(), special: [{ kind: 'attackFailsOnTails' }] }
  if (name === 'willpower') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [{ kind: 'buffAttack', attackName: 'Rollout', baseDamage: 40, condition: 'heads' }],
    }
  }
  if (name === 'impound') return { damage: { kind: 'fixed', amount: baseDamage }, special: [{ kind: 'preventRetreat' }] }
  if (name === 'rest') {
    return {
      ...zero(),
      healing: [{ target: 'self', amount: 20 }],
      special: [
        { kind: 'clearStatus', target: 'self', statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'] },
        { kind: 'setStatus', target: 'self', statuses: ['asleep'] },
      ],
    }
  }
  if (name === 'shining fang') return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 10 } }
  if (name === 'flame bluster') {
    return {
      ...anyTargetDamage(100),
      energyDiscard: [{ target: 'self', amount: 2 }],
      minimumExtraEnergyDiscard: 2,
      special: [{ kind: 'disableSelfAttack', attackName: 'Flame Bluster' }],
    }
  }

  // Deck, hand, Supporter, and evolution search effects cannot be represented by the battle format.
  return null
}

function inferDp3TcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTargetDamage = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
  })

  if (name === 'sand sonic' || name === 'psychic cut' || name === 'thunder climb' || name === 'nature power') {
    // Hand attachment, Prize cards, deck cards, and Stadiums are not represented.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'sonic blade') {
    return {
      ...zero(),
      counterDamage: [{ target: 'opponent', amountToLeaveHp: 50 }],
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent', ifTargetSurvives: true, ifCounterDamage: true }],
    }
  }
  if (name === 'dwindling wave') {
    return {
      damage: {
        kind: 'subtractCount',
        baseDamage: 80,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
      },
    }
  }
  if (name === 'raging flood') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
      },
      healing: [{ target: 'self', amount: 20 }],
    }
  }
  if (name === 'rainbow wing') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'cottonweed punch') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 2 },
      coinFlipCount: 2,
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'spiteful pain') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 40,
        source: { kind: 'namedPokemonInDiscard', side: 'own', names: ['Banette'] },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'pit trap') {
    return {
      damage: { kind: 'conditionalBonus', baseDamage, bonusDamage: 50, condition: 'tails' },
      coinFlipCount: 1,
    }
  }
  if (name === 'discharge') {
    return {
      damage: { kind: 'coinCount', amountPerHeads: 50, coinFlipCount: 0 },
      coinFlipCount: 0,
      coinFlipSource: { kind: 'energy', side: 'own' },
      energyDiscard: [{ target: 'self', amount: 'all' }],
    }
  }
  if (name === 'ion blast') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 60 },
      selfDamage: [{ kind: 'optionalChoice', amount: 100 }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'break beam') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 20 },
      choiceRequirement: 'optionalBonus',
      status: [{ target: 'self', statuses: ['confused'], requiresOptionalChoice: true }],
    }
  }
  if (name === 'double throw') {
    return {
      ...zero(),
      benchDamage: [{ amount: 30, side: 'opponent', zone: 'play', maxTargets: 2 }],
    }
  }
  if (name === 'lovely kiss') {
    return {
      ...zero(),
      counterDamage: [{ amountPerUnit: 10, source: { kind: 'damageCounters', target: 'attacker' }, target: 'opponent', maxUnits: 2 }],
      healing: [{ target: 'self', amountFrom: 'counterDamageDealt' }],
    }
  }
  if (name === 'flame blast') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'push over') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'silver wind') return { ...zero(), special: [{ kind: 'buffDefendingPokemon', damageBonus: 40 }] }
  if (name === 'raging scales') {
    return { damage: { kind: 'damageCounterThresholdBonus', baseDamage, bonusDamage: 40, minimumCounters: 1 } }
  }
  if (name === 'magical leaf') {
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: 30 },
      coinFlipCount: 1,
      healing: [{ target: 'self', amount: 30, condition: 'heads' }],
    }
  }
  if (name === 'pride attack') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 30, coinFlipCount: 0 },
      coinFlipSource: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Nidoqueen'] },
    }
  }
  if (name === 'strike wound') {
    return {
      damage: { kind: 'damageCounterThresholdBonus', baseDamage, bonusDamage: 20, minimumCounters: 2 },
      ignoreWeaknessResistance: true,
      ignoreTargetDamageModifiers: true,
    }
  }
  if (name === 'shadow charge') return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  if (name === 'energy singe') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'opponent' } },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'homing uppercut') {
    return { damage: { kind: 'retreatCostZeroBonus', baseDamage, bonusDamage: 60 } }
  }
  if (name === 'flare tail') {
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: 20 },
      coinFlipCount: 1,
      energyDiscard: [{ target: 'self', amount: 1, condition: 'heads' }],
    }
  }
  if (name === 'spine missile') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 4 },
      coinFlipCount: 4,
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'bash in' || name === 'shadow sneak') {
    // Tool and Prize-card checks are unavailable, so retain printed base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'psykiss') {
    return {
      ...zero(),
      coinFlipCount: 1,
      targetScope: 'any',
      energyDiscard: [{ target: 'opponent', amount: 1, condition: 'heads' }],
    }
  }
  if (name === 'healing milk') {
    return {
      ...zero(),
      coinFlipCount: 2,
      healing: [{ side: 'own', zone: 'play', maxTargets: 1, amount: 0, amountPerHead: 30 }],
    }
  }
  if (name === 'continuous tumble') {
    return { damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 0 }, flipUntilTails: true }
  }
  if (name === 'quick attack' || name === 'gnaw off' || name === 'stomp') {
    const bonusDamage = name === 'quick attack'
      ? 30
      : name === 'gnaw off' ? 60 : 30
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage }, coinFlipCount: 1 }
  }
  if (name === 'sneaky attack') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 20,
        source: { kind: 'energy', side: 'own' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'focus energy') {
    return { ...zero(), special: [{ kind: 'buffAttack', attackName: 'Protect Charge', baseDamage: 80 }] }
  }
  if (name === 'trace') {
    return {
      ...zero(),
      coinFlipCount: 1,
      targetScope: 'bench',
      choiceRequirement: 'copyAttack',
      special: [{ kind: 'copyAttack', coinGate: 'heads', preserveExtraCosts: true }],
    }
  }
  if (name === 'hidden power' && text.includes('from each unown you have in play')) {
    return {
      ...zero(),
      targetScope: 'front',
      counterDamage: [{
        amountPerUnit: 10,
        source: { kind: 'damageCountersOnNamedPokemonContains', side: 'own', zone: 'play', nameContains: 'Unown' },
        target: 'opponent',
      }],
      healing: [{ amount: 'all', side: 'own', zone: 'play', nameContains: 'Unown' }],
    }
  }
  if (name === 'hidden power') return null
  if (name === 'sand wind') {
    return { ...zero(), benchDamage: [{ amount: 10, side: 'opponent', zone: 'play' }] }
  }
  if (name === 'plant cloak tackle' || name === 'sandy cloak tackle' || name === 'trash cloak tackle') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 10,
        source: { kind: 'energy', side: 'own' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'rally') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 3, basicOnly: true }],
    }
  }
  if (name === 'gunky') return { ...zero(), special: [{ kind: 'attackFailsOnTails' }] }
  if (name === 'roar' || name === 'inviting trap') {
    return {
      ...zero(),
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }
  if (name === 'water sport') {
    return { damage: { kind: 'energyComparisonBonus', baseDamage, bonusDamage: 20 } }
  }
  if (name === 'feint attack') {
    const amount = Number.parseInt(text.match(/does (\d+) damage to that pokemon/)?.[1] || String(baseDamage), 10)
    return {
      damage: { kind: 'fixed', amount },
      targetScope: 'any',
      ignoreWeaknessResistance: true,
      ignoreTargetDamageModifiers: true,
    }
  }
  if (name === 'poison skin') {
    return {
      ...zero(),
      coinFlipCount: 2,
      status: [{ target: 'opponent', statuses: ['poisoned'], condition: { result: 'heads', minimum: 1 } }],
    }
  }
  if (name === 'tail whip') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [{ kind: 'cannotAttack', target: 'opponent', condition: 'heads' }],
    }
  }
  if (name === 'shell rest') return { ...zero(), healing: [{ target: 'self', amount: 20 }] }
  if (name === 'shell hunting') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 2, includeNameContains: ['Shellos'], treatAsBasic: true }],
    }
  }
  if (name === 'gossip') {
    return { ...zero(), targetScope: 'any', counterDamage: [{ amount: 10, target: 'opponent' }] }
  }
  if (name === 'aqua tail') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 10, coinFlipCount: 0 },
      coinFlipCount: 0,
      coinFlipSource: { kind: 'energy', side: 'own' },
    }
  }
  if (name === 'sun soak') {
    return {
      ...zero(),
      coinFlipCount: 1,
      healing: [{ target: 'self', amount: 'all', condition: 'heads' }],
    }
  }
  if (name === 'splatter') {
    return {
      damage: { kind: 'fixed', amount: 10 },
      targetScope: 'any',
      ignoreWeaknessResistance: true,
      ignoreTargetDamageModifiers: true,
    }
  }
  if (name === 'bring down') {
    return {
      damage: { kind: 'knockOutLowestRemainingHp' },
      targetScope: 'all',
      targetMustBeLowestRemainingHp: true,
      ignoreWeaknessResistance: true,
      ignoreTargetDamageModifiers: true,
    }
  }
  // Draw, hand/discard recovery, Trainer search, deck manipulation, and unavailable card types remain filtered.
  return null
}

function inferDp4TcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTargetDamage = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
  })
  const searchBasicPokemon = (maxCount: number): TcgBattleAttackEffect => ({
    ...zero(),
    choiceRequirement: 'deckPokemon',
    special: [{ kind: 'searchDeckPokemon', maxCount, basicOnly: true }],
  })
  const switchDefendingPokemon = (): TcgBattleAttackEffect => ({
    ...zero(),
    choiceRequirement: 'opponentBench',
    special: [{ kind: 'switch', target: 'opponent' }],
  })

  if (name === 'flame kick') {
    return {
      ...anyTargetDamage(80),
      energyDiscard: [{ target: 'self', amount: 2 }],
      minimumExtraEnergyDiscard: 2,
    }
  }
  if (name === 'sleep hole') {
    return {
      damage: { kind: 'statusBonus', baseDamage, bonusDamage: 40, statuses: ['asleep'] },
      status: [{
        target: 'opponent',
        statuses: ['asleep'],
        requiresTargetStatusAbsent: 'asleep',
      }],
    }
  }
  if (name === 'call for family') return searchBasicPokemon(text.includes('up to 3 basic pokemon') ? 3 : 1)
  if (name === 'smash short') {
    // Pokémon Tool checks and discards are unavailable; use the printed base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'leaf blade' || name === 'palm strike' || name === 'stomp') {
    const bonusDamage = name === 'palm strike' ? 40 : 20
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage }, coinFlipCount: 1 }
  }
  if (name === 'power whip') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'air scroll') {
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: 30 },
      coinFlipCount: 1,
      healing: [{ target: 'self', amount: 30, condition: 'tails' }],
    }
  }
  if (name === 'band attack') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 30,
        source: { kind: 'namedPokemon', side: 'own', zone: 'play', names: ['Beedrill'] },
      },
    }
  }
  if (name === 'black fire') {
    // Shared Energy cannot distinguish Fire from Darkness; model the optional +30 branch.
    return {
      damage: {
        kind: 'conditionalCount',
        baseDamage,
        perUnitDamage: 30,
        source: { kind: 'chosenEnergy' },
        maxUnits: 1,
      },
      energyDiscard: [{ target: 'self', amount: 'choice' }],
      choiceRequirement: 'energyAmount',
      choiceEnergyMax: 1,
    }
  }
  if (name === 'dream catcher') {
    return {
      ...zero(),
      counterDamage: [{
        amountPerUnit: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
        target: 'opponent',
        requiresTargetStatus: 'asleep',
      }],
      healing: [{ target: 'self', amountFrom: 'counterDamageDealt' }],
    }
  }
  if (name === 'ballon attack' || name === 'balloon attack') {
    return { damage: { kind: 'evolvedFromBonus', baseDamage, bonusDamage: 20, evolvesFrom: 'Igglybuff' } }
  }
  if (name === 'deadly poison') {
    return {
      damage: { kind: 'statusBonus', baseDamage, bonusDamage: 40, statuses: ['poisoned'] },
      status: [{ target: 'opponent', statuses: ['poisoned'], requiresTargetStatusAbsent: 'poisoned' }],
    }
  }
  if (name === 'needle arm') {
    return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 20 } }
  }
  if (name === 'sweet temptation') {
    return {
      damage: { kind: 'fixed', amount: 10 },
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent', beforeDamage: true }],
    }
  }
  if (name === 'psychic snap') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 20,
        source: { kind: 'energy', side: 'own' },
        minimumUnits: 1,
      },
      status: [{ target: 'opponent', statuses: ['confused'], requiresEnergy: { side: 'own', minimum: 1 } }],
    }
  }
  if (name === 'scary face') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [
        { kind: 'cannotAttack', target: 'opponent', condition: 'heads' },
        { kind: 'preventRetreat', condition: 'heads' },
      ],
    }
  }
  if (name === 'threaten and drop') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 20,
        source: { kind: 'energy', side: 'own' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'bass control') return anyTargetDamage(20)
  if (name === 'muddy bomb') {
    return {
      damage: { kind: 'fixed', amount: 30 },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
      benchDamage: [{
        amount: 10,
        side: 'opponent',
        zone: 'play',
        excludeTarget: true,
      }],
    }
  }
  if (name === 'guzzle') {
    // Basic Water Energy attachment is represented by shared Energy gain and its 20-HP healing.
    return {
      ...zero(),
      energyGain: [{ target: 'self', amount: 2 }],
      healing: [{ target: 'self', amount: 40 }],
    }
  }
  if (name === 'jet return') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 30, source: { kind: 'energy', side: 'own' } },
      energyDiscard: [{ target: 'self', amount: 'all' }],
    }
  }
  if (name === 'cutting claw') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 50,
        source: { kind: 'namedPokemon', side: 'opponent', zone: 'play', names: ['Seviper'] },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'sand attack') return { ...zero(), special: [{ kind: 'attackFailsOnTails' }] }
  if (name === 'shed skin') return { ...zero(), healing: [{ target: 'self', amount: 20 }] }
  if (name === 'captivate' || name === 'roar' || name === 'vine invite') return switchDefendingPokemon()
  if (name === 'stiffen') {
    return { ...zero(), protection: [{ target: 'self', kind: 'reduce', amount: 30 }] }
  }
  if (name === 'synchro dance') {
    return { damage: { kind: 'energyEqualityBonus', baseDamage, bonusDamage: 20 } }
  }
  if (name === 'endeavor') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 2 },
      coinFlipCount: 2,
    }
  }
  if (name === 'rest') {
    return {
      ...zero(),
      healing: [{ target: 'self', amount: 30 }],
      special: [
        { kind: 'clearStatus', target: 'self', statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'] },
        { kind: 'setStatus', target: 'self', statuses: ['asleep'] },
      ],
    }
  }
  if (name === 'super speed') {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
    }
  }
  if (name === 'grass knot') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'retreatCost', target: 'target' },
      },
    }
  }
  if (name === 'uproar') {
    return {
      ...zero(),
      coinFlipCount: 1,
      benchDamage: [{
        amount: 10,
        side: 'opponent',
        zone: 'play',
        condition: 'heads',
      }],
    }
  }

  // Deck/hand searches, draw, deck manipulation, Tools, Special Energy types, and Prize cards remain filtered.
  return null
}

function inferDp5TcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTargetDamage = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
  })
  const searchBasicPokemon = (maxCount: number, includeNames?: string[]): TcgBattleAttackEffect => ({
    ...zero(),
    choiceRequirement: 'deckPokemon',
    special: [{ kind: 'searchDeckPokemon', maxCount, basicOnly: true, ...(includeNames ? { includeNames } : {}) }],
  })

  if (name === 'diamond blast') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 20 }, coinFlipCount: 1 }
  }
  if (name === 'zone shift') {
    return {
      ...zero(),
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }
  if (name === 'dual trans') {
    // Energy recovered from the discard is represented by the shared Energy pool.
    return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  }
  if (name === 'pain amplifier') {
    return {
      ...zero(),
      counterDamage: [{ amount: 10, side: 'opponent', zone: 'play', onlyDamaged: true }],
    }
  }
  if (name === 'dual splash') {
    // The engine resolves extra targets randomly when the attack calls for two independent choices.
    return {
      ...zero(),
      benchDamage: [{ amount: 30, side: 'opponent', zone: 'play', maxTargets: 2 }],
    }
  }
  if (name === 'sand impact') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 0 },
      coinFlipCount: 0,
      coinFlipSource: { kind: 'energy', side: 'own' },
    }
  }
  if (name === 'mega bravo') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 40, source: { kind: 'energy', side: 'own' } },
      energyDiscard: [{ target: 'self', amount: 'all' }],
    }
  }
  if (name === 'leaf blade') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 20 }, coinFlipCount: 1 }
  }
  if (name === 'charm') {
    return {
      ...zero(),
      protection: [{ target: 'self', kind: 'reduce', amount: 20, attackerOnly: true }],
    }
  }
  if (name === 'call for family') {
    return text.includes('as many eevee as you like')
      ? searchBasicPokemon(5, ['Eevee'])
      : searchBasicPokemon(1)
  }
  if (name.includes('boost') && text.includes('minun')) {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 20,
        source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Minun'] },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'special blow') {
    // Special Energy attachments are not distinguished from shared Energy; retain printed base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'x-scissor') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 40 }, coinFlipCount: 1 }
  }
  if (name === 'hang high') return anyTargetDamage(40)
  if (name === 'volt crush') {
    return {
      damage: {
        kind: 'conditionalCount',
        baseDamage,
        perUnitDamage: 30,
        source: { kind: 'unusedEnergy' },
        condition: 'heads',
        maxUnits: 1,
        failureDamage: baseDamage,
      },
      coinFlipCount: 1,
      energyDiscard: [{ target: 'self', amount: 1, condition: 'heads' }],
    }
  }
  if (name === 'mid-air strike') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 30 }, coinFlipCount: 1 }
  }
  if (name === 'get help') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 30,
        source: { kind: 'distinctTypesOfNamedPokemon', side: 'own', zone: 'bench', nameContains: 'Wormadam' },
      },
    }
  }
  if (name === 'ice blade') return anyTargetDamage(30)
  if (name === 'fury cutter') {
    return {
      damage: { kind: 'headsTable', damages: [baseDamage, baseDamage + 10, baseDamage + 20, baseDamage + 40], coinFlipCount: 3 },
      coinFlipCount: 3,
    }
  }
  if (name === 'quick attack' || name === 'grainy sand' || name === 'water splash') {
    const bonusDamage = Number.parseInt(text.match(/plus (\d+) more damage/)?.[1] || '0', 10)
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage }, coinFlipCount: 1 }
  }
  if (name === 'iron defense') {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
    }
  }
  if (name === 'trans tail') {
    // Recovering a typed Energy card to hand adds one shared Energy for this battle.
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'uproar') {
    return {
      ...zero(),
      coinFlipCount: 1,
      benchDamage: [{ amount: 10, side: 'opponent', zone: 'play', condition: 'heads' }],
    }
  }
  if (name === 'honey scent') {
    return { ...zero(), healing: [{ amount: 20, side: 'own', zone: 'play', maxTargets: 1 }] }
  }
  if (name === 'sand attack') return { ...zero(), special: [{ kind: 'attackFailsOnTails' }] }
  if (name === 'random spark') return anyTargetDamage(10)
  if (name === 'splatter') {
    return { damage: { kind: 'fixed', amount: 10 }, targetScope: 'any' }
  }
  if (name === 'verdant dance') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'restore') {
    // The simplified engine can revive a Basic Pokémon; Garchomp LV.X's broader revival uses that subset.
    return {
      ...zero(),
      choiceRequirement: 'discardPokemon',
      special: [{ kind: 'reviveDiscardPokemon', side: 'self' }],
      energyGain: [{ target: 'self', amount: 3 }],
    }
  }
  if (name === 'lap up' || name === 'collect' || name === 'time shift') {
    // Drawing cards has no battle effect after the team is arranged.
    return null
  }
  return null
}

function inferDp6TcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTargetDamage = (amount: number, ignoresAllTargetEffects = false): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistance: ignoresAllTargetEffects,
    ignoreTargetDamageModifiers: ignoresAllTargetEffects,
    ignoreWeaknessResistanceOnBench: true,
  })
  const searchBasicPokemon = (maxCount: number, includeTypes?: string[]): TcgBattleAttackEffect => ({
    ...zero(),
    choiceRequirement: 'deckPokemon',
    special: [{ kind: 'searchDeckPokemon', maxCount, basicOnly: true, ...(includeTypes ? { includeTypes } : {}) }],
  })

  if (name === 'energy crush') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'opponent' } },
    }
  }
  if (name === 'draco meteor') {
    return {
      ...zero(),
      coinFlipSource: { kind: 'pokemonInPlay', side: 'opponent' },
      benchDamage: [{ amount: 50, side: 'opponent', zone: 'play', perTargetCoinFlip: true }],
    }
  }
  if (name === 'shadow force') {
    return {
      damage: { kind: 'fixed', amount: 20 },
      targetScope: 'bench',
      ignoreWeaknessResistance: true,
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
    }
  }
  if (name === 'brutal edge') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'target' } },
    }
  }
  if (name === 'burning poison') {
    return {
      ...zero(),
      choiceRequirement: 'statusCondition',
      status: [{ target: 'opponent', statuses: ['burned', 'poisoned'], useChosenStatus: true }],
    }
  }
  if (name === 'pester') {
    return { damage: { kind: 'statusBonus', baseDamage, bonusDamage: 40, statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'] } }
  }
  if (name === 'magma storm') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'chosenEnergy' } },
      energyDiscard: [{ target: 'self', amount: 'choice' }],
      choiceRequirement: 'energyAmount',
    }
  }
  if (name === 'psychic') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'opponent' } } }
  }
  if (name === 'frog hop') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 40 }, coinFlipCount: 1 }
  }
  if (name === 'transfer pain') {
    return {
      ...zero(),
      counterDamage: [{ amountPerUnit: 10, source: { kind: 'damageCounters', target: 'attacker' }, target: 'opponent', maxUnits: 1 }],
      healing: [{ target: 'self', amountFrom: 'counterDamageDealt' }],
    }
  }
  if (name === 'pursue and turn') {
    // The conditional +20 is supported; its conditional switch rider is not represented.
    return { damage: { kind: 'damageCounterThresholdBonus', baseDamage, bonusDamage: 20, minimumCounters: 2 } }
  }
  if (name === 'speed shot') return anyTargetDamage(30, true)
  if (name === 'drought' || name === 'drizzle') {
    // Typed Basic Energy attachment is represented as a shared Energy gain.
    return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  }
  if (name === 'cross-cut') {
    return { damage: { kind: 'evolvedTargetBonus', baseDamage, bonusDamage: 30 } }
  }
  if (name === 'extrasensory') {
    return { damage: { kind: 'handSizeComparisonBonus', baseDamage, bonusDamage: 50, comparison: 'equal' } }
  }
  if (name === 'stone edge' || name === 'x-scissor' || name === 'rising lunge' || name === 'sharp tail' || name === 'jump on' || name === 'ambush' || name === 'fasten claws') {
    const bonusDamage = Number.parseInt(text.match(/plus (\d+) more damage/)?.[1] || '0', 10)
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage }, coinFlipCount: 1 }
  }
  if (name === 'hidden power' && text.includes('does 10 damage plus 10 more damage')) {
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: 10 },
      coinFlipCount: 1,
      ignoreWeaknessResistance: true,
      selfDamage: [{ kind: 'fixed', amount: 10, condition: 'tails' }],
    }
  }
  if (name === 'heavy metal') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
    }
  }
  if (name === 'weather ball') {
    // Stadium cards are not tracked, so retain the printed base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'hail') {
    return { ...zero(), benchDamage: [{ amount: 10, side: 'opponent', zone: 'play' }] }
  }
  if (name === 'super eggsplosion') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 50, coinFlipCount: 0 },
      coinFlipSource: { kind: 'chosenEnergy' },
      energyDiscard: [{ target: 'self', amount: 'choice' }],
      choiceRequirement: 'energyAmount',
    }
  }
  if (name === 'grind') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'energy split') {
    // Attached Energy is not tracked per Pokémon; the shared pool is used as an eligibility proxy.
    return {
      ...zero(),
      benchDamage: [{ amount: 30, side: 'opponent', zone: 'play', requiresEnergy: { side: 'opponent', minimum: 1 } }],
    }
  }
  if (name === 'aqua bolt') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'focus blast') return anyTargetDamage(30)
  if (name === 'spike lariat') {
    return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 20 } }
  }
  if (name === 'bone rush') {
    return { damage: { kind: 'headsMultiplier', damagePerHeads: 50, coinFlipCount: 0 }, flipUntilTails: true }
  }
  if (name === 'bullet punch') {
    return { damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 2 }, coinFlipCount: 2 }
  }
  if (name === 'harass') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'pokemonInPlay', side: 'own' } } }
  }
  if (name === 'feint attack') return anyTargetDamage(30, true)
  if (name === 'charge dash') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 30 },
      choiceRequirement: 'optionalBonus',
      selfDamage: [{ kind: 'optionalChoice', amount: 30 }],
    }
  }
  if (name === 'aqua pump') {
    // Water Energy discarded from hand is approximated by spending shared Energy.
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'chosenEnergy' }, maxUnits: 2 },
      energyDiscard: [{ target: 'self', amount: 'choice' }],
      choiceRequirement: 'energyAmount',
      choiceEnergyMax: 2,
    }
  }
  if (name === 'core flash') return anyTargetDamage(50)
  if (name === 'herd charge') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 0 },
      coinFlipSource: { kind: 'namedPokemon', side: 'own', zone: 'play', names: ['Tauros'] },
    }
  }
  if (name === 'thrash') {
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: 20 },
      coinFlipCount: 1,
      selfDamage: [{ kind: 'fixed', amount: 10, condition: 'tails' }],
    }
  }
  if (name === 'rest' && text.includes('4 damage counters')) {
    return {
      ...zero(),
      healing: [{ target: 'self', amount: 40 }],
      special: [
        { kind: 'clearStatus', target: 'self', statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'] },
        { kind: 'setStatus', target: 'self', statuses: ['asleep'] },
      ],
    }
  }
  if (name === 'aqua spark') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 10,
        source: { kind: 'energy', side: 'own' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'call for family') return searchBasicPokemon(2, ['Grass', 'Psychic'])
  if (name === 'frustration') {
    return { ...anyTargetDamage(30), targetMustBeUndamaged: true }
  }
  if (name === 'space out') {
    return {
      ...zero(),
      healing: [{ target: 'self', amount: 20 }],
      special: [{ kind: 'setStatus', target: 'self', statuses: ['asleep'] }],
    }
  }
  if (name === 'roar' && text.includes('switches the defending pokemon')) {
    return {
      ...zero(),
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }
  if (name === 'big bite' || name === 'corner') {
    return { ...zero(), special: [{ kind: 'preventRetreat' }] }
  }
  if (name === 'smokescreen') {
    return { ...zero(), special: [{ kind: 'attackFailsOnTails' }] }
  }
  if (name === 'prop-up pinchers') {
    // The Technical Machine condition cannot be checked; retain its printed base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'eruption') {
    // Energy cards among the discarded deck cards cannot be inspected; retain base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'payback') {
    // Prize-card counts are not tracked; retain base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'nose poke') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 20,
        source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Probopass'] },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'focus energy') {
    return {
      ...zero(),
      special: [{ kind: 'buffAttack', attackName: 'Peck', baseDamage: 30 }],
    }
  }
  if (name === 'crystal barrier') {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
    }
  }
  if (name === 'gut blow') {
    return { damage: { kind: 'evolvedTargetBonus', baseDamage, bonusDamage: 20 } }
  }
  if (name === 'healing look') {
    return { ...zero(), healing: [{ amount: 30, side: 'own', zone: 'bench' }] }
  }
  if (name === 'vine bind') {
    // Poké-Powers are not represented in this battle mode.
    return zero()
  }
  if (name === 'collect' && text.includes('draw 3 cards')) return null
  if (name === 'aqua stream') return null
  if (name === 'doomsday' || name === 'doom desire') return null

  const headsBonus = text.match(/flip a coin\. if heads, this attack does \d+ damage plus (\d+) more damage/)
  if (headsBonus && baseDamage > 0) {
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: Number.parseInt(headsBonus[1], 10) },
      coinFlipCount: 1,
    }
  }
  if (name === 'jump on' || name === 'ambush') return null

  // Remaining attacks need per-card attached Energy, deck/hand/discard/Prize interactions,
  // card return, delayed effects, or Trainer cards that this simplified battle does not model.
  return null
}

function inferDp7TcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTargetDamage = (amount: number, ignoreWeaknessResistance = false): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistance,
    ignoreWeaknessResistanceOnBench: true,
  })
  const searchBasicPokemon = (maxCount: number): TcgBattleAttackEffect => ({
    ...zero(),
    choiceRequirement: 'deckPokemon',
    special: [{ kind: 'searchDeckPokemon', maxCount, basicOnly: true }],
  })

  if (name === 'damage even') {
    return {
      ...zero(),
      targetScope: 'any',
      counterDamage: [{
        amountPerUnit: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
        target: 'opponent',
      }],
    }
  }
  if (name === 'quick swim') return anyTargetDamage(20, true)
  if (name === 'speed shot') {
    return {
      ...anyTargetDamage(30, true),
      ignoreTargetDamageModifiers: true,
    }
  }
  if (name === 'crash chant') return null
  if (name === 'giga power') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 40 },
      choiceRequirement: 'optionalBonus',
      selfDamage: [{ kind: 'optionalChoice', amount: 40 }],
    }
  }
  if (name === 'strange spin') {
    return {
      damage: { kind: 'handSizeComparisonBonus', baseDamage, bonusDamage: 40, comparison: 'equal' },
      status: [{
        target: 'opponent',
        statuses: ['confused'],
        requiresHandSizeComparison: 'equal',
      }],
    }
  }
  if (name === 'heavy potential') {
    return {
      ...zero(),
      counterDamage: [{ amountPerTargetRetreatCost: 10, side: 'opponent', zone: 'play' }],
    }
  }
  if (name === 'lifting') {
    // The Basic Pokémon search is represented; attached Energy cannot be assigned per card.
    return searchBasicPokemon(2)
  }
  if (name === 'darkness mist') {
    return { damage: { kind: 'damageCounterThresholdBonus', baseDamage, bonusDamage: 20, minimumCounters: 2 } }
  }
  if (name === 'tail revenge') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 30,
        source: { kind: 'namedPokemonInDiscard', side: 'own', names: ['Magikarp'] },
      },
    }
  }
  if (name === 'ramming strike') return null
  if (name === 'parade') {
    return {
      damage: {
        kind: 'weightedCount',
        baseDamage,
        sources: [
          { source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Swinub'] }, perUnitDamage: 10 },
          { source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Piloswine'] }, perUnitDamage: 20 },
          { source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Mamoswine'] }, perUnitDamage: 40 },
        ],
      },
    }
  }
  if (name === 'bowed whip') {
    return {
      ...anyTargetDamage(30),
      coinFlipCount: 1,
      energyDiscard: [{ target: 'opponent', amount: 1, condition: 'heads' }],
    }
  }
  if (name === 'deep poison') {
    return { damage: { kind: 'statusBonus', baseDamage, bonusDamage: 30, statuses: ['poisoned'] } }
  }
  if (name === 'pound down') {
    // Pokémon Powers are not modeled in this battle format, so the bonus is always active.
    return { damage: { kind: 'fixed', amount: baseDamage + 30 } }
  }
  if (name === 'outbreak power') {
    return {
      ...zero(),
      benchDamage: [{
        amount: 20,
        side: 'opponent',
        zone: 'play',
        maxTargetsFrom: { kind: 'energy', side: 'own' },
      }],
    }
  }
  if (name === 'iron tail') {
    return { damage: { kind: 'headsMultiplier', damagePerHeads: 100, coinFlipCount: 0 }, flipUntilTails: true }
  }
  if (name === 'grind') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'spinning tail') {
    return { ...zero(), benchDamage: [{ amount: 30, side: 'opponent', zone: 'play' }] }
  }
  if (name === 'ambush' || name === 'steady punch' || name === 'rock smash' || name === 'stomp' || name === 'quick attack' || name === 'mouth pump') {
    const bonusDamage = Number.parseInt(text.match(/plus (\d+) more damage/)?.[1] || '0', 10)
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage }, coinFlipCount: 1 }
  }
  if (name === 'trick room') {
    // Stadium checks are unavailable; retain printed base damage and omit its conditional healing.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'electro diffusion') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } },
      coinFlipCount: 1,
      energyDiscard: [{ target: 'self', amount: 'all', condition: 'tails' }],
    }
  }
  if (name === 'fury cutter') {
    return {
      damage: { kind: 'headsTable', damages: [baseDamage, baseDamage + 10, baseDamage + 20, baseDamage + 40], coinFlipCount: 3 },
      coinFlipCount: 3,
    }
  }
  if (name === 'magnetic release') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'opponent' } } }
  }
  if (name === 'energy milk') {
    return {
      ...zero(),
      flipUntilTails: true,
      healing: [{ amount: 0, amountPerHead: 20, side: 'own', zone: 'play', maxTargets: 1 }],
    }
  }
  if (name === 'electric circuit') {
    // Recovering up to four typed Energy cards is approximated by shared Energy gain.
    return { ...zero(), energyGain: [{ target: 'self', amount: 4 }] }
  }
  if (name === 'rouse') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'attacker' } },
      healing: [{ target: 'self', amount: 40 }],
    }
  }
  if (name === 'mach blade') {
    return {
      damage: { kind: 'zeroOnTails', amount: 50 },
      coinFlipCount: 1,
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'scary face') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [
        { kind: 'cannotAttack', target: 'opponent', condition: 'heads' },
        { kind: 'preventRetreat', condition: 'heads' },
      ],
    }
  }
  if (name === 'self-abandonment') {
    return {
      damage: { kind: 'zeroOnTails', amount: 30 },
      coinFlipCount: 1,
      selfDamage: [{ kind: 'fixed', amount: 10, condition: 'tails' }],
    }
  }
  if (name === 'gyro swap') {
    return {
      ...zero(),
      counterDamage: [{
        amountPerUnit: 10,
        source: { kind: 'retreatCost', target: 'attacker' },
        target: 'opponent',
      }],
    }
  }
  if (name === 'nap') return { ...zero(), healing: [{ target: 'self', amount: 20 }] }
  if (name === 'alert') {
    return {
      ...zero(),
      choiceRequirement: 'optionalOwnBench',
      special: [{ kind: 'switch', target: 'self', optional: true }],
    }
  }
  if (name === 'linear attack') return anyTargetDamage(10)
  if (name === 'aqua liner') {
    return { damage: { kind: 'fixed', amount: 10 }, targetScope: 'bench', ignoreWeaknessResistance: true }
  }
  if (name === 'hide') {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
    }
  }
  if (name === 'magnetic bomb') {
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: 10 },
      coinFlipCount: 1,
      selfDamage: [{ kind: 'fixed', amount: 10, condition: 'tails' }],
    }
  }
  if (name === 'random spark') return anyTargetDamage(20)
  if (name === 'nightmare feast') {
    return {
      damage: { kind: 'statusBonus', baseDamage: 0, bonusDamage: 50, statuses: ['asleep'] },
      healing: [{ target: 'self', amount: 50, requiresTargetStatus: 'asleep' }],
    }
  }
  if (name === 'sand attack') return { ...zero(), special: [{ kind: 'attackFailsOnTails' }] }
  if (name === 'ingrain') {
    return {
      ...zero(),
      coinFlipCount: 1,
      energyGain: [{ target: 'self', amount: 1, condition: 'heads' }],
      protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
    }
  }
  if (name === 'screech') return { ...zero(), special: [{ kind: 'buffDefendingPokemon', damageBonus: 20 }] }
  if (name === 'outlet') {
    // Searching a Lightning Energy card into hand is represented as a shared Energy gain.
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'fastball') {
    return {
      damage: { kind: 'zeroOnTails', amount: 20 },
      coinFlipCount: 1,
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }

  // Card draw, card return, Trainer/Tool checks, deck/hand searches, and optional counter placement remain filtered.
  return null
}

function inferSupremeVictorsTcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTargetDamage = (amount: number, ignoreTypeModifiers = false): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistance: ignoreTypeModifiers,
    ignoreWeaknessResistanceOnBench: true,
  })

  if (name === 'feint attack') return { ...anyTargetDamage(baseDamage, true), ignoreTargetDamageModifiers: true }
  if (name === 'vapor kick') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 30,
        source: { kind: 'pokemonOfTypesInPlay', side: 'opponent', types: ['Water'] },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'shadow ball') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      targetScope: 'bench',
    }
  }
  if (name === 'speed impact') {
    // Energy attached to the Defending Pokémon is approximated by the opponent's shared Energy pool.
    return { damage: { kind: 'subtractCount', baseDamage, perUnitDamage: 20, source: { kind: 'energy', side: 'opponent' } } }
  }
  if (name === 'fire arrow') return anyTargetDamage(baseDamage)
  if (name === 'trash burst') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'chosenEnergy' }, maxUnits: 5 },
      choiceRequirement: 'energyAmount',
      choiceEnergyMax: 5,
      energyDiscard: [{ target: 'self', amount: 'choice' }],
    }
  }
  if (name === 'rainbow lariat') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 20,
        source: { kind: 'distinctTypesOfPokemonWithSubtypesInPlay', side: 'own', subtypes: ['SP'], zone: 'play' },
      },
    }
  }
  if (name === 'raging drill') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
      },
    }
  }
  if (name === 'quick attack' || name === 'sharp beak' || name === 'mid-air strike' || name === 'biting fang' || name === 'jet screw' || name === 'pachi' || name === 'stomp' || name === 'jump on' || name === 'sharp pincers') {
    const bonusDamage = Number.parseInt(text.match(/plus (\d+) more damage/)?.[1] || '0', 10)
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage }, coinFlipCount: 1 }
  }
  if (name === 'push over') {
    // Energy attached to Swampert is approximated by the player's shared Energy pool.
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'special reaction') {
    return {
      damage: {
        kind: 'statusCountBonus',
        baseDamage,
        bonusDamagePerStatus: 40,
        statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'],
      },
    }
  }
  if (name === 'wind return') {
    // Returning Grass Energy to hand is represented by spending chosen shared Energy.
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'chosenEnergy' } },
      choiceRequirement: 'energyAmount',
      energyDiscard: [{ target: 'self', amount: 'choice' }],
    }
  }
  if (name === 'flame jet') {
    return {
      damage: { kind: 'conditionalBonus', baseDamage: 0, bonusDamage: 40, condition: 'heads' },
      coinFlipCount: 1,
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'heal bell') {
    return { ...zero(), healing: [{ amount: 30, side: 'own', zone: 'play' }] }
  }
  if (name === 'super psywave') {
    return {
      ...zero(),
      targetScope: 'any',
      counterDamage: [{ amountPerUnit: 10, source: { kind: 'energyOnTarget' }, target: 'target' }],
    }
  }
  if (name === 'antique magic') {
    return { ...zero(), targetScope: 'all', counterDamage: [{ amount: 30, target: 'target' }] }
  }
  if (name === 'cursed wrath') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 10,
        source: { kind: 'pokemonInDiscard', side: 'own', includeSubtypes: ['SP'] },
      },
    }
  }
  if (name === 'riot') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'pokemonWithSubtypesInPlay', side: 'both', subtypes: ['Basic'], zone: 'play' },
      },
    }
  }
  if (name === 'chakra points') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'handSize', side: 'opponent' },
      },
    }
  }
  if (name === 'aqua tail') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
    }
  }
  if (name === 'desperate slap') {
    return { damage: { kind: 'damageCounterThresholdBonus', baseDamage, bonusDamage: 40, minimumCounters: 5 } }
  }
  if (name === 'nutritional support') return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  if (name === 'magical leaf') {
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: 20 },
      coinFlipCount: 1,
      healing: [{ target: 'self', amount: 20, condition: 'heads' }],
    }
  }
  if (name === 'spike wound') {
    return { ...anyTargetDamage(baseDamage, true), targetMustBeDamaged: true }
  }
  if (name === 'luna turn') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 30,
        source: { kind: 'namedPokemonInDiscard', side: 'own', names: ['Lunatone'] },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'rest') {
    return {
      ...zero(),
      allowWhileAsleep: true,
      healing: [{ target: 'self', amount: 40 }],
      special: [
        { kind: 'clearStatus', target: 'self', statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'] },
        { kind: 'setStatus', target: 'self', statuses: ['asleep'] },
      ],
    }
  }
  if (name === 'lightning wing') {
    const bonusDamage = Number.parseInt(text.match(/plus (\d+) more damage/)?.[1] || '0', 10)
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage }, coinFlipCount: 1 }
  }
  if (name === 'healing scale') return { ...zero(), healing: [{ amount: 10, side: 'own', zone: 'play' }] }
  if (name === 'smokescreen' || name === 'sand attack') {
    return { ...zero(), special: [{ kind: 'attackFailsOnTails' }] }
  }
  if (name === 'psychic') {
    // Energy attached to the Defending Pokémon is approximated by the opponent's shared Energy pool.
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'opponent' } } }
  }
  if (name === 'scale blow') {
    return { damage: { kind: 'subtractCount', baseDamage, perUnitDamage: 10, source: { kind: 'handSize', side: 'own' } } }
  }
  if (name === 'call for family') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: text.includes('up to 2') ? 2 : 1, basicOnly: true, includeTypes: text.includes('lightning basic') ? ['Lightning'] : undefined }],
    }
  }
  if (name === 'circling dive') {
    return {
      ...zero(),
      choiceRequirement: 'optionalOwnBench',
      benchDamage: [{ amount: 10, side: 'opponent', zone: 'play', ignoreWeaknessResistance: true }],
      special: [{ kind: 'switch', target: 'self' }],
    }
  }
  if (name === 'draw in') return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  if (name === 'gripthrow') {
    return {
      ...zero(),
      coinFlipCount: 1,
      choiceRequirement: 'optionalOpponentBench',
      special: [{ kind: 'switch', target: 'opponent', condition: 'heads' }],
    }
  }
  if (name === 'sever') return { damage: { kind: 'stage2TargetBonus', baseDamage, bonusDamage: 30 } }
  if (name === 'discharge') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 40, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
      energyDiscard: [{ target: 'self', amount: 'all' }],
    }
  }
  if (name === 'uproar') {
    return { ...zero(), benchDamage: [{ amount: 10, side: 'opponent', zone: 'play', ignoreWeaknessResistance: true }] }
  }
  if (name === 'metal max') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 40, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
      energyDiscard: [{ target: 'self', amount: 'all' }],
    }
  }
  if (name === 'sharpshooting') return anyTargetDamage(baseDamage, true)
  if (name === 'bounce') return { ...zero(), choiceRequirement: 'ownBench', special: [{ kind: 'switch', target: 'self' }] }
  if (name === 'growth') return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  if (name === 'nap') return { ...zero(), healing: [{ target: 'self', amount: 20 }] }
  if (name === 'extra punch') {
    return {
      damage: { kind: 'targetSubtypeBonus', baseDamage, bonusDamage: 50, subtype: 'Level-Up' },
    }
  }
  if (name === 'encore') return { ...zero(), choiceRequirement: 'disableAttack', special: [{ kind: 'disableAttack' }] }
  if (name === 'mud sport') return { damage: { kind: 'energyComparisonBonus', baseDamage, bonusDamage: 10 } }
  if (name === 'dash attack') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      targetScope: 'bench',
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'dragon rush') {
    return {
      ...anyTargetDamage(80, true),
      energyDiscard: [{ target: 'self', amount: 2 }],
      minimumExtraEnergyDiscard: 2,
      special: [{ kind: 'disableSelfAttack', attackName: 'Dragon Rush' }],
    }
  }
  if (name === 'powerful spark') {
    // Energy attached across the team is represented by the player's shared Energy pool.
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'dwindling wave') {
    return { damage: { kind: 'subtractCount', baseDamage, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'attacker' } } }
  }
  if (name === 'aqua wave') {
    return { damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 10, coinFlipCount: 2 }, coinFlipCount: 2 }
  }
  if (name === 'turnaround standby') {
    return { ...zero(), special: [{ kind: 'buffAttack', attackNames: ['Swallow', 'Bite'], damageBonus: 40 }] }
  }
  // Prize, Supporter/Trainer, hand/deck/discard-card, card-return, and delayed knockout effects remain filtered.
  return null
}

function inferArceusTcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTargetDamage = (
    damage: TcgBattleDamageRule,
    ignoreWeaknessResistanceOnBench = true,
  ): TcgBattleAttackEffect => ({
    damage,
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench,
  })

  if (name === 'tumbling attack' || name === 'ambush' || name === 'rising lunge' || name === 'quick attack' || name === 'knock away' || name === 'tail crush') {
    const bonusDamage = Number.parseInt(text.match(/plus (\d+) more damage/)?.[1] || '0', 10)
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage }, coinFlipCount: 1 }
  }
  if (name === 'damage roller') {
    return { ...zero(), counterDamage: [{ target: 'opponent', amountToLeaveHpOfAttacker: true }] }
  }
  if (name === 'entangle tackle') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 30 },
      // The single-active battle board applies this recoil to Swalot rather than choosing another friendly Pokémon.
      selfDamage: [{ kind: 'optionalChoice', amount: 30 }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'oracle arrow') {
    return {
      ...anyTargetDamage({ kind: 'fixed', amount: 40 }),
      targetMustBeDamaged: true,
    }
  }
  if (name === 'sharpshooting' || name === 'tongue spring') {
    return anyTargetDamage({ kind: 'fixed', amount: name === 'sharpshooting' ? 40 : 20 })
  }
  if (name === 'wreck' || name === 'extend fang') {
    // Stadium and Pokémon Tool checks are not represented in this battle mode, so use printed base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'tumble down') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 30, source: { kind: 'chosenEnergy' } },
      choiceRequirement: 'energyAmount',
      energyDiscard: [{ target: 'self', amount: 'choice' }],
    }
  }
  if (name === 'second bite') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'target' },
      },
    }
  }
  if (name === 'leaf blast') {
    // Attached Grass Energy is approximated with the shared Energy pool.
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'wide laser') {
    return {
      ...zero(),
      benchDamage: [
        { amount: 10, side: 'opponent', zone: 'front' },
        { amount: 10, side: 'opponent', zone: 'bench', ignoreWeaknessResistance: true },
      ],
    }
  }
  if (name === 'extrasensory') {
    return { damage: { kind: 'handSizeComparisonBonus', baseDamage, bonusDamage: 30, comparison: 'equal' } }
  }
  if (name === 'detect') {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
    }
  }
  if (name === 'endure') {
    return { ...zero(), coinFlipCount: 1, special: [{ kind: 'endure', condition: 'heads' }] }
  }
  if (name === 'discharge') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 40, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
      energyDiscard: [{ target: 'self', amount: 'all' }],
    }
  }
  if (name === 'water ball') {
    // Attached Water Energy is approximated with the shared Energy pool.
    return { damage: { kind: 'count', baseDamage: 20, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'dragon bump') {
    // The separate Fire and Water attachment requirement is approximated by two shared Energy.
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 20,
        source: { kind: 'energy', side: 'own' },
        minimumUnits: 2,
      },
    }
  }
  if (name === 'cloak headbutt') {
    return {
      damage: { kind: 'namedPokemonSetBonus', baseDamage, bonusDamage: 30, side: 'own', names: ['Wormadam Trash Cloak'] },
    }
  }
  if (name === 'cloak shard') {
    return anyTargetDamage({
      kind: 'namedPokemonSetBonus',
      baseDamage: 10,
      bonusDamage: 30,
      side: 'own',
      names: ['Wormadam Plant Cloak'],
    })
  }
  if (name === 'bunny hop') {
    return { ...anyTargetDamage({ kind: 'fixed', amount: 20 }), targetMustBeUndamaged: true }
  }
  if (name === 'compound pain') {
    return {
      ...zero(),
      counterDamage: [{ amount: 30, side: 'opponent', zone: 'play', onlyDamaged: true }],
    }
  }
  if (name === 'sky spear') {
    return {
      ...anyTargetDamage({ kind: 'fixed', amount: 80 }),
      energyDiscard: [{ target: 'self', amount: 'all' }],
    }
  }
  if (name === 'leaf refresh') {
    return { ...zero(), healing: [{ amount: 30, side: 'own', zone: 'bench' }] }
  }
  if (name === 'break ground') {
    return { ...zero(), benchDamage: [{ amount: 10, side: 'own', zone: 'bench', ignoreWeaknessResistance: true }] }
  }
  if (name === 'lightning turn') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      choiceRequirement: 'ownBench',
      special: [{ kind: 'switch', target: 'self' }],
    }
  }
  if (name === 'bright flame') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      coinFlipCount: 1,
      energyDiscard: [{ target: 'self', amount: 2, condition: 'tails' }],
    }
  }
  if (name === 'harden') {
    return { ...zero(), protection: [{ target: 'self', kind: 'preventAtMost', amount: 30 }] }
  }
  if (name === 'scrunch') {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAll', condition: 'heads' }],
    }
  }
  if (name === 'sand attack') {
    return { ...zero(), special: [{ kind: 'attackFailsOnTails' }] }
  }
  if (name === 'swallow up') {
    return { damage: { kind: 'remainingHpComparisonBonus', baseDamage, bonusDamage: 70 } }
  }

  // Effects that depend on card identity in hand/deck/discard, typed attached Energy,
  // Stadium/Tool presence, Prize cards, or evolution cards stay filtered.
  return null
}

function inferHeartGoldSoulSilverTcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTargetDamage = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
  })
  const boardDamage = (amount: number): TcgBattleBenchDamageRule[] => [
    { amount, side: 'opponent', zone: 'front' },
    { amount, side: 'opponent', zone: 'bench', ignoreWeaknessResistance: true },
  ]

  if (name === 'mass attack') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 10,
        source: { kind: 'pokemonInPlay', side: 'both' },
      },
    }
  }
  if (name === 'extrasensory') {
    return { damage: { kind: 'handSizeComparisonBonus', baseDamage, bonusDamage: 40, comparison: 'equal' } }
  }
  if (name === 'iron tail' || name === 'continuous eggsplosion') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: name === 'iron tail' ? 30 : 10, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'double return') {
    return {
      damage: {
        kind: 'conditionalCount',
        baseDamage: 0,
        perUnitDamage: 20,
        source: { kind: 'damageCounters', target: 'attacker' },
        condition: 'heads',
      },
      coinFlipCount: 1,
    }
  }
  if (name === 'cure powder') {
    return { ...zero(), healing: [{ amount: 30, side: 'own', zone: 'play' }] }
  }
  if (name === 'spinning tail') {
    return { ...zero(), benchDamage: boardDamage(20) }
  }
  if (name === 'quick blow' || name === 'knock away' || name === 'water splash' || name === 'quick attack') {
    const bonusDamage = Number.parseInt(text.match(/plus (\d+) more damage/)?.[1] || '0', 10)
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage }, coinFlipCount: 1 }
  }
  if (name === 'chomp') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
      },
    }
  }
  if (name === 'ice blade' || name === 'thunder spear') {
    return anyTargetDamage(name === 'ice blade' ? 30 : 20)
  }
  if (name === 'sneaky attack') {
    // Darkness Energy attached to Persian is approximated by any shared Energy on the side.
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 30,
        source: { kind: 'energy', side: 'own' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'hyper cannon') {
    return {
      damage: {
        kind: 'conditionalBonus',
        baseDamage,
        bonusDamage: 50,
        condition: { result: 'heads', minimum: 2, exactly: 2 },
      },
      coinFlipCount: 2,
    }
  }
  if (name === 'hail') {
    return { ...zero(), benchDamage: boardDamage(10) }
  }
  if (name === 'double headbutt') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 2 },
      coinFlipCount: 2,
    }
  }
  if (name === 'madkinesis') {
    // Psychic Energy attached to Slowbro is approximated by the shared Energy pool.
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'cosmic cyclone') {
    // Returned Water Energy is represented by spending the chosen amount of shared Energy.
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'chosenEnergy' } },
      choiceRequirement: 'energyAmount',
      energyDiscard: [{ target: 'self', amount: 'choice' }],
    }
  }
  if (name === 'minimize') {
    return { ...zero(), protection: [{ target: 'self', kind: 'reduce', amount: 20 }] }
  }
  if (name === 'static electricity') {
    // Deck Energy attachment is approximated by shared Energy gain, one per Mareep in play.
    return {
      ...zero(),
      energyGain: [{
        target: 'self',
        amountPerUnit: 1,
        source: { kind: 'namedPokemon', side: 'both', zone: 'play', names: ['Mareep'] },
      }],
    }
  }
  if (name === 'cure kernels') {
    // The engine randomly chooses one injured friendly Pokemon because the healing UI cannot select any own target.
    return { ...zero(), healing: [{ amount: 20, side: 'own', zone: 'play', maxTargets: 1 }] }
  }
  if (name === 'roar') {
    return {
      ...zero(),
      choiceRequirement: 'optionalOpponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }
  if (name === 'spider web') {
    return { damage: { kind: 'fixed', amount: baseDamage }, special: [{ kind: 'preventRetreat', target: 'opponent' }] }
  }
  if (name === 'tail whip') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [{ kind: 'cannotAttack', target: 'opponent', condition: 'heads' }],
    }
  }
  if (name === 'hydro crunch') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'target' },
      },
    }
  }
  if (name === 'thrash') {
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: 20 },
      coinFlipCount: 1,
      selfDamage: [{ kind: 'fixed', amount: 20, condition: 'tails' }],
    }
  }

  // Deck/hand actions, card return, and Energy movement between opposing Pokemon remain filtered.
  return null
}

function inferUnleashedTcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTargetDamage = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
  })

  if (name === 'double leg hammer') {
    return {
      ...zero(),
      benchDamage: [{ amount: 40, side: 'opponent', zone: 'bench', maxTargets: 2, ignoreWeaknessResistance: true }],
    }
  }
  if (name === 'switch cannon') {
    return {
      ...anyTargetDamage(30),
      choiceRequirement: 'optionalOwnBench',
      special: [{ kind: 'switch', target: 'self' }],
    }
  }
  if (name === 'big chorus') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 0 },
      coinFlipSource: { kind: 'pokemonOfTypesInPlay', side: 'own', types: ['Water'] },
    }
  }
  if (name === 'push over' || name === 'power blow') {
    // Energy attached to the named attacker is approximated by the side's shared Energy pool.
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 20,
        source: { kind: 'energy', side: 'own' },
      },
    }
  }
  if (name === 'psywave') {
    // Energy attached to the Defending Pokémon is approximated by the opponent's shared Energy pool.
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 20,
        source: { kind: 'energy', side: 'opponent' },
      },
    }
  }
  if (name === 'hydro launcher') {
    return {
      ...anyTargetDamage(100),
      energyDiscard: [{ target: 'self', amount: 2 }],
      minimumExtraEnergyDiscard: 2,
    }
  }
  if (name === 'water arrow') {
    const amount = Number.parseInt(text.match(/this attack does (\d+) damage to that pokemon/)?.[1] || '0', 10)
    return amount > 0 ? anyTargetDamage(amount) : null
  }
  if (name === 'stream pump') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 30, source: { kind: 'chosenEnergy' }, maxUnits: 1 },
      choiceRequirement: 'energyAmount',
      choiceEnergyMax: 1,
      energyDiscard: [{ target: 'self', amount: 'choice' }],
    }
  }
  if (name === 'heat acceleration' || name === 'energy crane') {
    // Energy recovered from the discard pile is approximated as a shared-Energy gain.
    return { ...zero(), energyGain: [{ target: 'self', amount: name === 'heat acceleration' ? 3 : 2 }] }
  }
  if (name === 'bebop punch') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 50, coinFlipCount: 0 },
      flipUntilTails: true,
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'tail crush' || name === 'cross chop') {
    const bonusDamage = Number.parseInt(text.match(/plus (\d+) more damage/)?.[1] || '0', 10)
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage }, coinFlipCount: 1 }
  }
  if (name === 'call for family') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: text.includes('up to 2') ? 2 : 1, basicOnly: true }],
    }
  }
  if (name === 'tag team boost') {
    return {
      damage: { kind: 'namedPokemonSetBonus', baseDamage, bonusDamage: 20, side: 'own', names: ['Plusle'] },
    }
  }
  if (name === 'mountain eater') {
    // The opponent deck discard is outside this mode; retain Larvitar's printed self-healing.
    return { ...zero(), healing: [{ target: 'self', amount: 20 }] }
  }
  if (name === 'roost') {
    return {
      ...zero(),
      healing: [{ target: 'self', amount: 40 }],
      special: [{ kind: 'preventRetreat', target: 'self' }],
    }
  }
  if (name === 'sharpshooting' || name === 'skill dive') {
    return anyTargetDamage(name === 'sharpshooting' ? 10 : 30)
  }
  if (name === 'swing around') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 2 },
      coinFlipCount: 2,
    }
  }
  if (name === 'double attack') {
    return {
      ...zero(),
      benchDamage: [{ amount: 10, side: 'opponent', zone: 'bench', maxTargets: 2, ignoreWeaknessResistance: true }],
    }
  }
  if (name === 'powerful spark') {
    // Energy attached to all friendly Pokémon is approximated by the side's shared Energy pool.
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'darkness howl') {
    return {
      ...zero(),
      ignoreWeaknessResistanceOnBench: true,
      benchDamage: [
        { amount: 20, side: 'both', zone: 'front', typeFilter: { exclude: ['Darkness'] } },
        { amount: 20, side: 'both', zone: 'bench', ignoreWeaknessResistance: true, typeFilter: { exclude: ['Darkness'] } },
      ],
    }
  }
  if (name === 'torrent blade') {
    return {
      damage: { kind: 'fixed', amount: 100 },
      targetScope: 'bench',
      ignoreWeaknessResistance: true,
      energyDiscard: [{ target: 'self', amount: 2 }],
      minimumExtraEnergyDiscard: 2,
    }
  }

  // Card-zone evolution, deck composition, hand/draw, Poké-Power, and opposing Energy movement remain filtered.
  return null
}

function inferUndauntedTcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTargetDamage = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
  })

  if (name === 'solar suggestion') return null
  if (name === 'everyone explode now') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 30,
        source: { kind: 'namedPokemon', side: 'own', zone: 'play', names: ['Pineco', 'Forretress'] },
      },
      counterDamage: [{ amount: 30, side: 'own', zone: 'play', names: ['Pineco', 'Forretress'] }],
    }
  }
  if (name === 'fire counterattack') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 60,
        source: { kind: 'pokemonOfTypesInPlay', side: 'opponent', types: ['Fighting'] },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'lava flow') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'chosenEnergy' } },
      choiceRequirement: 'energyAmount',
      energyDiscard: [{ target: 'self', amount: 'choice' }],
    }
  }
  if (name === 'blessed wings') {
    // Healing is retained; returning Togekiss and its attachments to the deck is not represented.
    return { ...zero(), healing: [{ amount: 'all', side: 'own', zone: 'play' }] }
  }
  if (name === 'quick blow' || name === 'charging horn' || name === 'jump on') {
    const bonusDamage = Number.parseInt(text.match(/plus (\d+) (?:more )?damage/)?.[1] || '0', 10)
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage }, coinFlipCount: 1 }
  }
  if (name === 'incessant peck') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'spike spread') {
    return {
      ...zero(),
      benchDamage: [
        { amount: 10, side: 'opponent', zone: 'front' },
        { amount: 10, side: 'opponent', zone: 'bench', ignoreWeaknessResistance: true },
      ],
    }
  }
  if (name === 'backward belt throw') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 20 },
      selfDamage: [{ kind: 'optionalChoice', amount: 20 }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'blindside') {
    return { ...anyTargetDamage(50), targetMustBeDamaged: true }
  }
  if (name === 'miasma wind') {
    return {
      damage: {
        kind: 'statusCountBonus',
        baseDamage: 0,
        bonusDamagePerStatus: 50,
        statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'],
      },
    }
  }
  if (name === 'plasma arrow') {
    return {
      ...anyTargetDamage(0),
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'energyOnTarget' } },
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'steel coat') {
    // Searching the deck for a Metal Energy is approximated by one shared-Energy gain.
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'feint attack') {
    return {
      ...anyTargetDamage(30),
      ignoreWeaknessResistance: true,
      ignoreTargetDamageModifiers: true,
    }
  }
  if (name === 'pester') {
    return {
      damage: {
        kind: 'statusBonus',
        baseDamage,
        bonusDamage: 30,
        statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'],
      },
    }
  }
  if (name === 'razor-sharp incisors') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'target' } },
    }
  }
  if (name === 'dark hand') {
    return { damage: { kind: 'handSizeComparisonBonus', baseDamage, bonusDamage: 30, comparison: 'more' } }
  }
  if (name === 'full-belly refresh') {
    return {
      ...zero(),
      healing: [{ target: 'self', amount: 30 }],
      special: [{ kind: 'clearStatus', target: 'self', statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'] }],
    }
  }
  if (name === 'dual splash') {
    return {
      ...zero(),
      benchDamage: [{ amount: 30, side: 'opponent', zone: 'play', maxTargets: 2 }],
    }
  }
  if (name === 'enraged assault') {
    // The damage rider checks an injured Vespiquen; its conditional Poison rider is omitted.
    return {
      damage: {
        kind: 'namedPokemonBenchBonus',
        baseDamage,
        bonusDamage: 0,
        injuredBonusDamage: 60,
        nameContains: 'Vespiquen',
      },
    }
  }
  if (name === 'minimize') {
    return { ...zero(), protection: [{ target: 'self', kind: 'reduce', amount: 20 }] }
  }
  if (name === 'pull') {
    return {
      ...zero(),
      coinFlipCount: 1,
      choiceRequirement: 'optionalOpponentBench',
      special: [{ kind: 'switch', target: 'opponent', condition: 'heads' }],
    }
  }
  if (name === 'call for family') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, basicOnly: true }],
    }
  }
  if (name === 'detect') {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
    }
  }
  if (name === 'slap down') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 10, coinFlipCount: 2 },
      coinFlipCount: 2,
    }
  }
  if (name === 'focus energy') {
    return { ...zero(), special: [{ kind: 'buffAttack', target: 'self', attackName: 'Surprise Attack', baseDamage: 80 }] }
  }
  if (name === 'beat up') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 0 },
      coinFlipSource: { kind: 'pokemonInPlay', side: 'own' },
    }
  }
  if (name === 'metal scissors') {
    // Metal Energy attached to Scizor is approximated by the shared Energy pool.
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'evoblast') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'pokemonEvolvedFromInPlay', side: 'own', evolvesFrom: 'Eevee' },
      },
    }
  }

  // Discard-pile, hand/deck, card-return, and counter-movement effects remain filtered.
  return null
}

function inferTriumphantTcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTargetDamage = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
  })

  if (name === 'stadium power' || name === 'bone impact') {
    // Stadium presence is not represented, so retain the printed base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'breakdown') {
    return {
      ...zero(),
      counterDamage: [{
        amountPerUnit: 10,
        source: { kind: 'handSize', side: 'opponent' },
        target: 'target',
      }],
    }
  }
  if (name === 'saliva lure' || name === 'inviting scent') {
    return {
      ...zero(),
      choiceRequirement: 'optionalOpponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }
  if (name === 'sand impact') {
    // Fighting Energy attached to Dugtrio is approximated by the shared Energy pool.
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
    }
  }
  if (name === 'sparking ball') {
    return {
      ...anyTargetDamage(20),
      ignoreWeaknessResistance: true,
      status: [{ target: 'self', statuses: ['asleep'] }],
    }
  }
  if (name === 'powerful splash' || name === 'hundred furious punches') {
    // Typed Energy attached to the attacker is approximated by the shared Energy pool.
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'fury cutter') {
    return { damage: { kind: 'headsTable', damages: [20, 40, 60, 120], coinFlipCount: 3 }, coinFlipCount: 3 }
  }
  if (name === 'vital throw') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 20 },
      selfDamage: [{ kind: 'optionalChoice', amount: 20 }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'underwater dive') {
    return { ...zero(), coinFlipCount: 2, healing: [{ target: 'self', amount: 0, amountPerHead: 30 }] }
  }
  if (name === 'swallow up') {
    return { damage: { kind: 'remainingHpComparisonBonus', baseDamage, bonusDamage: 50 } }
  }
  if (name === 'focus energy') {
    return { ...zero(), special: [{ kind: 'buffAttack', target: 'self', attackName: 'Bite', baseDamage: 40 }] }
  }
  if (name === 'lightning strike') {
    // The optional Lightning Energy discard is not linked to a shared-Energy choice, so use base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'sneaky placement') {
    const counters = Number.parseInt(text.match(/put (\d+) damage counters? on 1 of your opponent's pokemon/)?.[1] || '0', 10)
    return counters > 0
      ? { ...zero(), targetScope: 'any', counterDamage: [{ amount: counters * 10, target: 'target' }] }
      : null
  }
  if (name === 'licking shot') {
    // Energy attached to Lickilicky is approximated by the shared Energy pool.
    return {
      ...anyTargetDamage(0),
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } },
    }
  }
  if (name === 'double attack') {
    return { ...zero(), benchDamage: [{ amount: 20, side: 'opponent', zone: 'play', maxTargets: 2 }] }
  }
  if (name === 'mountain eater') {
    // Discarding the top card of the deck is omitted; retain Aron or Marowak's healing.
    return { ...zero(), healing: [{ target: 'self', amount: 20 }] }
  }
  if (name === 'iron defense' || name === 'sand veil') {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
    }
  }
  if (name === 'sweet scent') {
    // The engine randomly chooses one injured friendly Pokemon because the healing UI cannot select any own target.
    return { ...zero(), healing: [{ amount: 30, side: 'own', zone: 'play', maxTargets: 1 }] }
  }
  if (name === 'vulcan beat') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 0 },
      coinFlipSource: { kind: 'namedPokemon', side: 'own', zone: 'play', names: ['Volbeat'] },
    }
  }
  if (name === 'tongue whip') {
    return { ...anyTargetDamage(30), targetScope: 'bench' }
  }
  if (name === 'bone rush') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'quick attack' || name === 'quick blow' || name === 'steady punch') {
    const bonusDamage = Number.parseInt(text.match(/plus (\d+) more damage/)?.[1] || '0', 10)
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage }, coinFlipCount: 1 }
  }
  if (name === 'magnetic switch') {
    return {
      ...zero(),
      choiceRequirement: 'optionalOwnBench',
      special: [{ kind: 'switch', target: 'self' }],
    }
  }
  if (name === 'tripping headbutt') {
    return {
      ...zero(),
      coinFlipCount: 1,
      targetScope: 'any',
      damage: { kind: 'conditionalBonus', baseDamage: 0, bonusDamage: 30, condition: 'heads' },
      ignoreWeaknessResistanceOnBench: true,
      benchDamage: [{ amount: 30, side: 'own', zone: 'play', maxTargets: 1, condition: 'tails' }],
    }
  }
  if (name === 'illumisile') {
    return {
      damage: {
        kind: 'gatedCount',
        baseDamage: 30,
        perUnitDamage: 0,
        source: { kind: 'namedPokemon', side: 'own', zone: 'play', names: ['Illumise'] },
        gateSource: { kind: 'namedPokemon', side: 'own', zone: 'play', names: ['Illumise'] },
        minimumGateUnits: 1,
      },
      targetScope: 'bench',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'champ buster') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'injuredPokemon', side: 'own', zone: 'bench' },
      },
    }
  }
  if (name === 'lost burn') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 50, source: { kind: 'chosenEnergy' } },
      choiceRequirement: 'energyAmount',
      energyDiscard: [{ target: 'self', amount: 'choice' }],
    }
  }
  if (name === 'linear attack') {
    return anyTargetDamage(40)
  }
  if (name === 'magnetic bomb') {
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: 10 },
      coinFlipCount: 1,
      selfDamage: [{ kind: 'fixed', amount: 10, condition: 'tails' }],
    }
  }

  // Stadium/hand/deck/Prize/Lost Zone and damage-counter movement effects without a faithful target choice remain filtered.
  return null
}

function inferCallOfLegendsTcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTargetDamage = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
  })

  // Several Call of Legends cards reprint attacks already mapped in the HGSS sets.
  if (
    name === 'cross chop' ||
    name === 'detect' ||
    name === 'dual splash' ||
    name === 'everyone explode now' ||
    name === 'fire counterattack' ||
    name === 'focus energy' ||
    name === 'jump on' ||
    name === 'miasma wind' ||
    name === 'minimize' ||
    name === 'quick attack' ||
    name === 'quick blow' ||
    name === 'roar' ||
    name === 'steel coat'
  ) {
    const reprintedEffect =
      inferUndauntedTcgBattleAttackEffect(attack, text, baseDamage) ??
      inferUnleashedTcgBattleAttackEffect(attack, text, baseDamage) ??
      inferTriumphantTcgBattleAttackEffect(attack, text, baseDamage) ??
      inferHeartGoldSoulSilverTcgBattleAttackEffect(attack, text, baseDamage)
    if (reprintedEffect) return reprintedEffect
  }

  if (name === 'cell storm') {
    // The two Psychic Energy discard and self-healing use the shared Energy/HP pools.
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      energyDiscard: [{ target: 'self', amount: 2 }],
      minimumExtraEnergyDiscard: 2,
      healing: [{ target: 'self', amount: 60 }],
    }
  }
  if (name === 'mirror shot') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      special: [{ kind: 'attackFailsOnTails' }],
    }
  }
  if (name === 'close combat') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      special: [{ kind: 'buffDefendingPokemon', damageBonus: 20 }],
    }
  }
  if (name === 'destructive tsunami') {
    return {
      ...zero(),
      coinFlipCount: 1,
      benchDamage: [
        { amount: 40, side: 'opponent', zone: 'play', condition: 'heads' },
        { amount: 40, side: 'own', zone: 'play', condition: 'tails' },
      ],
    }
  }
  if (name === 'linear attack') {
    const amount = Number.parseInt(text.match(/does (\d+) damage to that pokemon/)?.[1] || '0', 10)
    return amount > 0 ? anyTargetDamage(amount) : null
  }
  if (name === 'spinning tail' || name === 'tsunami') {
    return { ...zero(), benchDamage: [{ amount: 20, side: 'opponent', zone: 'play' }] }
  }
  if (name === 'chomp') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
      },
    }
  }
  if (name === 'acceleration bolt') {
    // Searching for two Basic Energy cards is represented as two shared-Energy gains.
    return { damage: { kind: 'fixed', amount: baseDamage }, energyGain: [{ target: 'self', amount: 2 }] }
  }
  if (name === 'eeeeeeek') {
    // Hand shuffle/draw is unavailable; retain Cleffa's printed self-Asleep effect.
    return { ...zero(), special: [{ kind: 'setStatus', target: 'self', statuses: ['asleep'] }] }
  }
  if (name === 'layabout') {
    return {
      ...zero(),
      healing: [{ target: 'self', amount: 'all' }],
      special: [{ kind: 'disableSelfAttack', attackName: 'Layabout' }],
    }
  }
  if (name === 'grind') {
    // Energy attached to Tangrowth is approximated by the shared Energy pool.
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'thunder spear') return anyTargetDamage(20)
  if (name === 'sleepy lost') {
    // The Lost Zone action is unavailable; retain Mime Jr.'s printed self-Asleep effect.
    return { ...zero(), special: [{ kind: 'setStatus', target: 'self', statuses: ['asleep'] }] }
  }
  if (name === 'poison buildup') {
    return { ...zero(), special: [{ kind: 'setStatus', target: 'self', statuses: ['poisoned'] }] }
  }
  if (name === 'poison effect') {
    return {
      damage: { kind: 'statusBonus', baseDamage, bonusDamage: 60, statuses: ['poisoned'], statusTarget: 'attacker' },
      special: [{ kind: 'clearStatus', target: 'self', statuses: ['poisoned'] }],
    }
  }
  if (name === 'nap') return { ...zero(), healing: [{ target: 'self', amount: 10 }] }
  if (name === 'rock smash') {
    const bonusDamage = Number.parseInt(text.match(/plus (\d+) more damage/)?.[1] || '0', 10)
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage }, coinFlipCount: 1 }
  }
  if (name === 'nutritional support') {
    // A Basic Grass Energy attachment to any friendly Pokémon is represented by shared Energy.
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'fake tears') {
    // The Trainer lock is unavailable; keep the coin-gated 30 damage reduction.
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'reduce', amount: 30, condition: 'heads' }],
    }
  }
  if (name === 'aqua tail') {
    // Water Energy attached to Totodile is approximated by its side's shared Energy pool.
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
    }
  }
  if (name === 'timid tackle') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      selfDamage: [{ kind: 'fixed', amount: 20 }],
      choiceRequirement: 'optionalOwnBench',
      special: [{ kind: 'switch', target: 'self' }],
    }
  }
  if (name === 'wormhole') {
    // The player's mandatory switch is supported; this choice model cannot also select the opponent's switch.
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      choiceRequirement: 'optionalOwnBench',
      special: [{ kind: 'switch', target: 'self' }],
    }
  }
  if (name === 'big bite') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      special: [{ kind: 'preventRetreat', target: 'opponent' }],
    }
  }
  if (name === 'agility') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
    }
  }
  if (name === 'play with fire') {
    return {
      ...zero(),
      status: [{ target: 'opponent', statuses: ['burned'] }],
      special: [{ kind: 'setStatus', target: 'self', statuses: ['asleep'] }],
    }
  }
  if (name === 'mischievous punch') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      ignoreWeaknessResistance: true,
      special: [{ kind: 'setStatus', target: 'self', statuses: ['asleep'] }],
    }
  }
  if (name === 'granite head') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      protection: [{ target: 'self', kind: 'reduce', amount: 30 }],
    }
  }
  if (name === 'tumble over') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      special: [{ kind: 'cannotAttack', target: 'self' }],
    }
  }
  if (name === 'shocking bolt') {
    // The Lost Zone is unavailable; all Energy attached to Pachirisu is approximated by shared Energy.
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      energyDiscard: [{ target: 'self', amount: 'all' }],
    }
  }
  if (name === 'inferno spear') {
    // Fire and Lightning attachment types are not tracked separately from shared Energy.
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      energyDiscard: [{ target: 'self', amount: 2 }],
      minimumExtraEnergyDiscard: 2,
    }
  }
  if (name === 'swords dance') {
    return {
      ...zero(),
      special: [{ kind: 'buffAttack', target: 'self', attackName: 'Lost Claw', baseDamage: 80 }],
    }
  }
  if (name === 'twister') {
    return {
      damage: { kind: 'conditionalBonus', baseDamage: 0, bonusDamage: baseDamage, condition: { result: 'heads', minimum: 1 } },
      coinFlipCount: 2,
      energyDiscard: [{ target: 'opponent', amount: 'heads' }],
    }
  }
  if (name === 'plow over') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      coinFlipCount: 1,
      status: [{ target: 'opponent', statuses: ['paralyzed'], condition: 'heads' }],
      energyDiscard: [{ target: 'opponent', amount: 1, condition: 'tails' }],
    }
  }
  if (name === 'raging thunder') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      counterDamage: [{ amount: 20, side: 'own', zone: 'play', maxTargets: 1 }],
    }
  }
  if (name === 'clomp clomp clobber') {
    // Lost Zone movement is approximated by spending one shared Energy.
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      energyDiscard: [{ target: 'self', amount: 1 }],
      minimumExtraEnergyDiscard: 1,
    }
  }
  if (name === 'mantle bazooka') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      energyDiscard: [{ target: 'self', amount: 2 }],
      minimumExtraEnergyDiscard: 2,
    }
  }

  return null
}

function inferBlackWhiteTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'constant rattle') {
    return {
      damage: { kind: 'headsTable', damages: [0, 10, 30, 60], coinFlipCount: 3 },
      coinFlipCount: 3,
    }
  }
  if (name === 'nature power') {
    // The format shares Energy across each side and does not track attached types.
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'both' } },
    }
  }
  if (name === 'flame charge') {
    // Searching the deck for a typed Energy is represented by one shared-Energy gain.
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'outrage') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
      },
    }
  }
  if (name === 'aqua tail') {
    // Attached Water Energy is approximated with the side's shared Energy pool.
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 10, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
    }
  }
  if (name === 'hydro pump') {
    // Attached Water Energy is approximated with the side's shared Energy pool.
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } },
    }
  }
  if (name === 'feather dance') {
    return {
      ...zero(),
      special: [{ kind: 'buffAttack', target: 'self', attackName: '*', damageBonus: 40 }],
    }
  }
  if (name === 'attract') {
    return { ...zero(), special: [{ kind: 'attackFailsOnTails' }] }
  }
  if (name === 'cell culture') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, basicOnly: true, includeNames: ['Solosis'] }],
    }
  }
  if (name === 'psywave') {
    // Attached Energy on the target is approximated with the opponent's shared Energy pool.
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'opponent' } },
    }
  }
  if (name === 'krookoroll') {
    return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 40 } }
  }
  if (name === 'taunt') {
    return {
      ...zero(),
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }
  if (name === 'sucker punch') {
    // Darkness attachment is not tracked separately from shared Energy.
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 30,
        source: { kind: 'energy', side: 'own' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'foul play') {
    return {
      ...zero(),
      choiceRequirement: 'copyAttack',
      special: [{ kind: 'copyAttack', preserveExtraCosts: false }],
    }
  }
  if (name === 'blindside') {
    return {
      damage: { kind: 'fixed', amount: 50 },
      targetScope: 'any',
      targetMustBeDamaged: true,
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'punishment') {
    return { damage: { kind: 'stage2TargetBonus', baseDamage, bonusDamage: 60 } }
  }
  if (name === 'revenge') {
    return { damage: { kind: 'lastTurnKnockoutBonus', baseDamage, bonusDamage: 70 } }
  }
  if (name === 'energize') {
    // Recovering typed Energy from a discard pile becomes one shared-Energy gain.
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }

  // Draw/card-to-hand effects do not fit the current battle flow.
  return null
}

function inferEmergingPowersTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTargetDamage = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
  })

  if (name === 'helping hand' || name === 'charge' || name === 'tailwind') {
    // Typed Energy searched, recovered, or attached to a specific Pokémon becomes shared Energy.
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'splatter') return anyTargetDamage(30)
  if (name === 'superpower') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 20 },
      selfDamage: [{ kind: 'optionalChoice', amount: 20 }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'phat sound') {
    return {
      ...zero(),
      coinFlipCount: 3,
      benchDamage: [{ amount: 0, amountPerHead: 10, side: 'opponent', zone: 'play' }],
    }
  }
  if (name === 'venoshock') {
    return { damage: { kind: 'statusBonus', baseDamage, bonusDamage: 60, statuses: ['poisoned'] } }
  }
  if (name === 'reflect') {
    return { ...zero(), protection: [{ target: 'self', kind: 'reduce', amount: 40 }] }
  }
  if (name === 'psychic assault') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'target' },
      },
    }
  }
  if (name === 'madkinesis') {
    // Attached Psychic Energy is approximated by the player's shared Energy pool.
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'smack down') {
    return { damage: { kind: 'resistanceTypeBonus', baseDamage, bonusDamage: 60, resistanceType: 'Fighting' } }
  }
  if (name === 'rock bullet') {
    // Attached Fighting Energy is approximated by the player's shared Energy pool.
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'hone claws') {
    return { ...zero(), special: [{ kind: 'buffAttack', target: 'self', attackName: '*', damageBonus: 30 }] }
  }
  if (name === 'feint attack') {
    return {
      ...anyTargetDamage(30),
      ignoreWeaknessResistance: true,
      ignoreTargetDamageModifiers: true,
    }
  }
  if (name === 'claw rend') {
    return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 30 } }
  }
  if (name === 'rear guard') {
    return { ...zero(), protection: [{ target: 'self', kind: 'reduce', amount: 30 }] }
  }
  if (name === 'bone rush') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'dark pulse') {
    // Darkness Energy across the team is approximated by the player's shared Energy pool.
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'iron defense') {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
    }
  }
  if (name === 'power whip') {
    // Attached Energy on Ferrothorn is approximated by the player's shared Energy pool.
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'powerful slap') {
    // Per-Pokémon Energy is approximated by the player's shared Energy pool.
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 40, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
    }
  }
  if (name === 'heal pulse') {
    // The engine cannot select any friendly target, so it heals one injured teammate at random.
    return { ...zero(), healing: [{ amount: 50, side: 'own', zone: 'play', maxTargets: 1 }] }
  }
  if (name === 'captivate') {
    return {
      ...zero(),
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }

  // Drawing/searching into hand, evolving during battle, deck-order control, and moving
  // Energy between individual Pokémon have no matching state transition in this format.
  return null
}

function inferNobleVictoriesTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'aromax') {
    return {
      ...zero(),
      choiceRequirement: 'ownBench',
      healing: [{ target: 'selectedOwnBench', amount: 'all' }],
    }
  }
  if (name === 'round') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: baseDamage,
        source: { kind: 'pokemonWithAttack', side: 'own', attackName: 'Round', zone: 'play' },
      },
    }
  }
  if (name === 'hydro pump') {
    // Energy attached to this Pokémon is approximated by the side's shared Energy pool.
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'energy', side: 'own' } },
    }
  }
  if (name === 'ice shard') {
    return { damage: { kind: 'targetTypeBonus', baseDamage, bonusDamage: 40, targetType: 'Fighting' } }
  }
  if (name === 'ice chain' || name === 'luring light') {
    return {
      ...zero(),
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }
  if (name === 'outrage') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
      },
    }
  }
  if (name === 'glaciate') {
    return { ...zero(), benchDamage: [{ amount: 30, side: 'opponent', zone: 'play' }] }
  }
  if (name === 'electrichain') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 20,
        source: { kind: 'pokemonOfTypesInPlay', side: 'own', types: ['Lightning'], zone: 'bench' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'net force') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 40,
        source: { kind: 'namedPokemon', side: 'own', zone: 'play', names: ['Reuniclus'] },
      },
    }
  }
  if (name === 'first contact') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 2, basicOnly: true }],
    }
  }
  if (name === 'core cannon') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 20,
        source: { kind: 'energy', side: 'own' },
      },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'retaliate') {
    return { damage: { kind: 'lastTurnKnockoutBonus', baseDamage, bonusDamage: 60 } }
  }
  if (name === 'abundant harvest') {
    // Recovering Basic Energy becomes one shared Energy gain.
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'iron head') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 10, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'finishing blow') {
    return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 50 } }
  }
  if (name === 'metal scissors') {
    // Metal Energy attached to this Pokémon is approximated by shared Energy.
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'energy press') {
    // Energy attached to the Defending Pokémon is approximated by its side's shared pool.
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'energyOnTarget' } } }
  }

  // In-battle evolution, card draw/deck order, discard recovery, deck discard, and
  // transferring counters from a selected Bench card are outside the battle model.
  return null
}

function inferNextDestiniesTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTarget = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
  })

  if (name === 'synthesis') {
    // A Grass Energy search becomes a single shared-Energy gain.
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'stoke') {
    return {
      ...zero(),
      coinFlipCount: 1,
      energyGain: [{ target: 'self', amount: 1, condition: 'heads' }],
    }
  }
  if (name === 'stadium burn' || name === 'stadium wave') {
    // Stadiums are not part of this battle mode, so retain the printed base damage only.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'outrage' || name === 'raging hammer') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
      },
    }
  }
  if (name === 'call for family') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: attack.text?.toLowerCase().includes('up to 2') ? 2 : 1, basicOnly: true }],
    }
  }
  if (name === 'water arrow') return anyTarget(20)
  if (name === 'random spark') return anyTarget(50)
  if (name === 'crushing ice') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'retreatCost', target: 'target' },
      },
    }
  }
  if (name === 'vengeful wish') {
    return { damage: { kind: 'lastIncomingDamage' }, ignoreWeaknessResistance: true }
  }
  if (name === 'sniffle') {
    return {
      ...zero(),
      special: [{ kind: 'buffAttack', target: 'self', attackName: 'Belt', baseDamage: 40 }],
    }
  }
  if (name === 'lightning crash') {
    return {
      ...anyTarget(80),
      energyDiscard: [{ target: 'self', amount: 'all' }],
    }
  }
  if (name === 'x ball') {
    return {
      damage: {
        kind: 'weightedCount',
        baseDamage: 0,
        sources: [
          { source: { kind: 'energy', side: 'own' }, perUnitDamage: 20 },
          { source: { kind: 'energyOnTarget' }, perUnitDamage: 20 },
        ],
      },
    }
  }
  if (name === 'psychic') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'energyOnTarget' },
      },
    }
  }
  if (name === 'darmaxitan') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 50, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
    }
  }
  if (name === 'triple smash') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 10, coinFlipCount: 3 },
      coinFlipCount: 3,
    }
  }
  if (name === 'hammer kick') {
    return { damage: { kind: 'attackerRemainingHpLessBonus', baseDamage, bonusDamage: 30 } }
  }
  if (name === 'oracle inflict') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'handSize', side: 'opponent' },
      },
    }
  }
  if (name === 'round') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: baseDamage,
        source: { kind: 'pokemonWithAttack', side: 'own', attackName: 'Round', zone: 'play' },
      },
    }
  }
  if (name === 'giga power') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 20 },
      selfDamage: [{ kind: 'optionalChoice', amount: 20 }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'foul play') {
    return {
      ...zero(),
      choiceRequirement: 'copyAttack',
      special: [{ kind: 'copyAttack', preserveExtraCosts: false }],
    }
  }

  // Prize-card counts, draw/search into hand, opponent hand inspection, and
  // Stadium state are not represented in this battle mode.
  return null
}

function inferDarkExplorersTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const optionalEnergyBonus = (bonusDamage: number): TcgBattleAttackEffect => ({
    damage: {
      kind: 'countThresholdBonus',
      baseDamage,
      bonusDamage,
      source: { kind: 'chosenEnergy' },
      minimumUnits: 1,
    },
    choiceRequirement: 'energyAmount',
    choiceEnergyMax: 1,
    energyDiscard: [{ target: 'self', amount: 'choice' }],
  })
  const anyTargetDamage = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
  })

  if (name === 'fire slash') return optionalEnergyBonus(30)
  if (name === 'dual splash') {
    return {
      ...zero(),
      benchDamage: [{ amount: 50, side: 'opponent', zone: 'play', maxTargets: 2 }],
    }
  }
  if (name === 'attack command') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 10,
        source: { kind: 'pokemonInPlay', side: 'both' },
      },
    }
  }
  if (name === 'healing dance') {
    return { ...zero(), healing: [{ amount: 30, side: 'own', zone: 'play' }] }
  }
  if (name === 'incessant peck') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'electrigun') return optionalEnergyBonus(40)
  if (name === 'volt bolt') {
    return {
      ...anyTargetDamage(100),
      energyDiscard: [{ target: 'self', amount: 'all' }],
    }
  }
  if (name === 'negative ion') {
    return {
      ...zero(),
      special: [{ kind: 'buffAttack', target: 'opponent', attackName: '*', damageBonus: -30 }],
    }
  }
  if (name === 'electrishower') {
    return { ...zero(), benchDamage: [{ amount: 10, side: 'opponent', zone: 'play' }] }
  }
  if (name === 'quick turn') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 2 },
      coinFlipCount: 2,
    }
  }
  if (name === 'electrisilk') {
    return { damage: { kind: 'retreatCostZeroBonus', baseDamage, bonusDamage: 40 } }
  }
  if (name === 'slurp shakedown') {
    return {
      damage: { kind: 'fixed', amount: 60 },
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent', beforeDamage: true }],
    }
  }
  if (name === 'hand press') {
    return { damage: { kind: 'handSizeComparisonBonus', baseDamage, bonusDamage: 30, comparison: 'more' } }
  }
  if (name === 'giant claw') {
    return { damage: { kind: 'damageCounterThresholdBonus', baseDamage, bonusDamage: 40, minimumCounters: 2 } }
  }
  if (name === 'reinforced drill' || name === 'special fang' || name === 'blow through') {
    // Tool, Special Energy, and Stadium attachments are not represented in this battle mode.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'brutal bash') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 20,
        source: { kind: 'pokemonOfTypesInPlay', side: 'own', types: ['Darkness'] },
      },
    }
  }
  if (name === 'fury cutter') {
    return {
      damage: { kind: 'headsTable', damages: [30, 40, 60, 90], coinFlipCount: 3 },
      coinFlipCount: 3,
    }
  }
  if (name === 'metal blast') {
    // Metal Energy attached to this Pokémon is approximated by shared Energy.
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'continuous tumble') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'roar') {
    return {
      ...zero(),
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }

  // Returning active cards, draw/search to hand, Tool recovery, Prize counts,
  // and in-battle evolution are not represented in this battle mode.
  return null
}

function inferDragonsExaltedTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const searchBasicPokemon = (maxCount: number): TcgBattleAttackEffect => ({
    ...zero(),
    choiceRequirement: 'deckPokemon',
    special: [{ kind: 'searchDeckPokemon', maxCount, basicOnly: true }],
  })
  const placeCounters = (amount: number): TcgBattleAttackEffect => ({
    ...zero(),
    targetScope: 'any',
    counterDamage: [{ amount, target: 'target' }],
  })

  if (name === 'triple energy') {
    // The battle uses a shared, single-type Energy pool rather than attached Energy cards.
    return { ...zero(), energyGain: [{ target: 'self', amount: 3 }] }
  }
  if (name === 'tangle drag') {
    return {
      ...zero(),
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent', beforeDamage: true }],
    }
  }
  if (name === 'relaxing fragrance') {
    return {
      ...zero(),
      healing: [{ target: 'self', amount: 30 }],
      special: [{ kind: 'clearStatus', target: 'self', statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'] }],
    }
  }
  if (name === 'reinforced needle') {
    // Pokémon Tools are not part of this battle mode, so keep its printed base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'hexed flame') {
    return {
      damage: {
        kind: 'statusCountBonus',
        baseDamage,
        bonusDamagePerStatus: 50,
        statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'],
      },
    }
  }
  if (name === 'rainbow burn') {
    // Only one Energy type exists per side in this format; at most one distinct type can be counted.
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 20,
        source: { kind: 'energy', side: 'own' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'soggy rush' || name === 'rock cannon' || name === 'iron head') {
    const damagePerHead = Number.parseInt(attack.damage, 10) || baseDamage
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: damagePerHead, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'water cannon') {
    return {
      damage: {
        kind: 'conditionalCount',
        baseDamage: 0,
        perUnitDamage: 30,
        source: { kind: 'energy', side: 'own' },
        condition: 'heads',
      },
      coinFlipCount: 1,
    }
  }
  if (name === 'add-a-dash') {
    return {
      ...zero(),
      coinFlipCount: 2,
      special: [{ kind: 'drawCards', target: 'self', amountPerHead: 1 }],
    }
  }
  if (name === 'clear search') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 3, destination: 'hand' }],
    }
  }
  if (name === 'unstoppable roll') {
    return {
      damage: {
        kind: 'conditionalBonus',
        baseDamage,
        bonusDamage: 30,
        condition: { result: 'heads', minimum: 2, exactly: 2 },
      },
      coinFlipCount: 2,
    }
  }
  if (name === 'cotton guard') {
    return { ...zero(), protection: [{ target: 'self', kind: 'reduce', amount: 20 }] }
  }
  if (name === 'energy crush') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 20,
        source: { kind: 'energy', side: 'opponent' },
      },
    }
  }
  if (name === 'energy assist') return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  if (name === 'call for family') return searchBasicPokemon(2)
  if (name === 'cursed drop') return placeCounters(30)
  if (name === 'sneaky placement') return placeCounters(10)
  if (name === 'plentiful placement') return placeCounters(40)
  if (name === 'psychic' || name === 'psywave') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'energyOnTarget' },
      },
    }
  }
  if (name === 'doom decree') {
    return {
      ...zero(),
      coinFlipCount: 2,
      damage: {
        kind: 'knockOutOnCoinCondition',
        condition: { result: 'heads', minimum: 2, exactly: 2 },
      },
    }
  }
  if (name === 'black magic') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'bench', side: 'opponent' },
      },
    }
  }
  if (name === 'vortex chop') {
    return { damage: { kind: 'targetResistanceBonus', baseDamage, bonusDamage: 30 } }
  }
  if (name === 'reverse spin') {
    return {
      ...zero(),
      special: [{ kind: 'drawCards', target: 'opponent', amount: 4, shuffleHandIntoDeck: true }],
    }
  }
  if (name === 'revenge cannon') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCountersOnSide', side: 'own', zone: 'bench' },
      },
    }
  }
  if (name === 'superpower') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 20 },
      selfDamage: [{ kind: 'optionalChoice', amount: 20 }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'triple laser') {
    return {
      damage: { kind: 'fixed', amount: 30 },
      targetScope: 'any',
      benchDamage: [{ amount: 30, side: 'opponent', zone: 'play', maxTargets: 2, excludeTarget: true }],
    }
  }
  if (name === 'heavy nose') {
    return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 30 } }
  }
  if (name === 'chirp') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 2, includeResistanceTypes: ['Fighting'], destination: 'hand' }],
    }
  }
  if (name === 'sand-attack') {
    return { ...zero(), special: [{ kind: 'attackFailsOnTails' }] }
  }
  if (name === 'draw in') return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  if (name === 'hand fling') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 10,
        source: { kind: 'handSize', side: 'own' },
      },
    }
  }
  if (name === 'gold breaker') {
    return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 60 } }
  }

  // Individual Energy attachments/types, Tools, deck ordering, Prize cards,
  // and effects that move cards between deck/discard without a top-deck model remain filtered.
  return null
}

function inferBoundariesCrossedTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const searchBasicPokemon = (maxCount: number): TcgBattleAttackEffect => ({
    ...zero(),
    choiceRequirement: 'deckPokemon',
    special: [{ kind: 'searchDeckPokemon', maxCount, basicOnly: true }],
  })

  if (name === 'grass knot') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'retreatCost', target: 'target' },
      },
    }
  }
  if (name === 'hundred furious lashes') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 30,
        source: { kind: 'energy', side: 'own' },
      },
      special: [{ kind: 'disableSelfAttack', attackName: 'Hundred Furious Lashes' }],
    }
  }
  if (name === 'call for family') return searchBasicPokemon(2)
  if (name === 'fluffy tag') {
    return {
      ...zero(),
      choiceRequirement: 'ownBench',
      special: [
        { kind: 'switch', target: 'self' },
        { kind: 'buffAttack', target: 'switchedOwn', attackName: '*', damageBonus: 40 },
      ],
    }
  }
  if (name === 'draw in') return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  if (name === 'raging claws') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
      },
    }
  }
  if (name === 'split bomb') {
    return {
      damage: { kind: 'fixed', amount: 40 },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
      benchDamage: [{ amount: 40, side: 'opponent', zone: 'play', maxTargets: 1, excludeTarget: true }],
    }
  }
  if (name === 'collect') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 1 }] }
  }
  if (name === 'relentless flames' || name === 'continuous tumble' || name === 'damage rush') {
    const damagePerHead = Number.parseInt(attack.damage, 10) || baseDamage
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: damagePerHead, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'damage counterpunch') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 60,
        source: { kind: 'damageCounters', target: 'attacker' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'hydro pump') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'energy', side: 'own' },
      },
    }
  }
  if (name === 'present') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, destination: 'hand', random: true, condition: 'heads' }],
    }
  }
  if (name === 'defog') {
    // Stadium cards are not present in this battle mode.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'secret sword') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'energy', side: 'own' },
      },
    }
  }
  if (name === 'electripult') {
    return {
      damage: { kind: 'fixed', amount: 20 },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'flame charge') return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  if (name === 'extrasensory') {
    return { damage: { kind: 'handSizeComparisonBonus', baseDamage, bonusDamage: 60, comparison: 'equal' } }
  }
  if (name === 'astonish') {
    return { ...zero(), special: [{ kind: 'shuffleRandomHandCardIntoDeck', target: 'opponent' }] }
  }
  if (name === 'revenge') {
    return { damage: { kind: 'lastTurnKnockoutBonus', baseDamage, bonusDamage: 70 } }
  }
  if (name === 'dream waltz') {
    return {
      damage: { kind: 'statusBonus', baseDamage, bonusDamage: 30, statuses: ['asleep'], statusTarget: 'attacker' },
      allowWhileAsleep: true,
    }
  }
  if (name === 'scout') return { ...zero(), special: [{ kind: 'revealHand', target: 'opponent' }] }
  if (name === 'jet woofer') {
    return { ...zero(), special: [{ kind: 'millCards', target: 'opponent', amount: 0, amountPerOwnEnergy: 1 }] }
  }
  if (name === 'venoshock') {
    return { damage: { kind: 'statusBonus', baseDamage, bonusDamage: 40, statuses: ['poisoned'] } }
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
  if (name === "land's judgment") {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 70 },
      choiceRequirement: 'optionalBonus',
      minimumExtraEnergyDiscard: 1,
      energyDiscard: [{ target: 'self', amount: 'all', optional: true }],
    }
  }
  if (name === 'captivate') {
    return {
      ...zero(),
      coinFlipCount: 1,
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent', condition: 'heads' }],
    }
  }
  if (name === 'double draw') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 2 }] }
  }
  if (name === 'healing melody') {
    return {
      ...zero(),
      coinFlipCount: 1,
      healing: [{ amount: 60, side: 'own', zone: 'play', condition: 'heads' }],
    }
  }
  if (name === 'roar') {
    return {
      ...zero(),
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }
  if (name === 'retaliate') {
    return { damage: { kind: 'lastTurnKnockoutBonus', baseDamage, bonusDamage: 60 } }
  }
  // In-battle copying from your own Bench, Tool/Trainer interactions, and deck ordering remain filtered.
  return null
}

function inferPlasmaStormTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'rumble stomp' || name === 'incessant peck') {
    return {
      damage: {
        kind: 'headsBonusEach',
        baseDamage,
        bonusDamage: 20,
        coinFlipCount: 0,
      },
      flipUntilTails: true,
    }
  }
  if (name === 'gather order') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 3, includeNames: ['Combee'] }],
    }
  }
  if (name === 'damage beat') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 20,
        source: { kind: 'damageCounters', target: 'target' },
      },
    }
  }
  if (name === 'swaddle guard') {
    return { ...zero(), protection: [{ target: 'self', kind: 'reduce', amount: 40 }] }
  }
  if (name === 'astonish') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [{ kind: 'shuffleRandomHandCardIntoDeck', target: 'opponent', condition: 'heads' }],
    }
  }
  if (name === 'loud howl') {
    return {
      ...zero(),
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }
  if (name === 'turbo energize') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  }
  if (name === 'intensifying burn') {
    return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 50 } }
  }
  if (name === 'flame blast') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'energy', side: 'own' },
      },
    }
  }
  if (name === 'continuous headbutt') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: baseDamage, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'seafaring') {
    return {
      ...zero(),
      coinFlipCount: 3,
      energyGain: [{ target: 'self', amountPerHead: 1, maxAmount: 3 }],
    }
  }
  if (name === 'hail') {
    return {
      ...zero(),
      coinFlipCount: 1,
      benchDamage: [{ amount: 10, side: 'opponent', zone: 'play', condition: 'heads' }],
    }
  }
  if (name === 'discharge') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 30,
        source: { kind: 'energy', side: 'own' },
      },
      energyDiscard: [{ target: 'self', amount: 'all' }],
    }
  }
  if (name === 'smogbank') {
    return { ...zero(), benchDamage: [{ amount: 20, side: 'opponent', zone: 'play' }] }
  }
  if (name === 'powerful storm') {
    // Individually attached Energy is represented by the shared side pool.
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 20,
        source: { kind: 'energy', side: 'own' },
      },
    }
  }
  if (name === 'hex') {
    return {
      damage: {
        kind: 'statusBonus',
        baseDamage,
        bonusDamage: 50,
        statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'],
      },
    }
  }
  if (name === 'facade') {
    return {
      damage: {
        kind: 'statusBonus',
        baseDamage,
        bonusDamage: 60,
        statuses: ['burned', 'poisoned'],
        statusTarget: 'attacker',
      },
    }
  }
  if (name === 'ensnarl') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 20,
        source: { kind: 'retreatCost', target: 'target' },
      },
    }
  }
  if (name === 'wreck') {
    // Stadium cards are absent, so Wreck keeps its printed base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'reflect' || name === 'rigidify') {
    return { ...zero(), protection: [{ target: 'self', kind: 'reduce', amount: 20 }] }
  }
  if (name === 'hard crunch') {
    return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 30 } }
  }
  if (name === 'call for backup') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, destination: 'hand' }],
    }
  }
  if (name === 'white inferno') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
      },
    }
  }
  if (name === 'teampact') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 30,
        source: {
          kind: 'pokemonWithSubtypesInPlay',
          side: 'own',
          subtypes: ['Team Plasma'],
          zone: 'play',
        },
      },
    }
  }
  if (name === 'shout') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [{ kind: 'discardRandomHandCard', target: 'opponent', condition: 'heads' }],
    }
  }
  if (name === 'destructive sound') {
    // Item cards are not distinguished in the Pokémon-only hand.
    return null
  }
  if (name === 'round') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 50,
        source: { kind: 'pokemonWithAttack', side: 'own', attackName: 'Round', zone: 'play' },
      },
    }
  }
  if (name === 'collect') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 1 }] }
  }
  if (name === 'fast swipe') {
    return { ...zero(), special: [{ kind: 'discardRandomHandCard', target: 'opponent' }] }
  }
  if (name === 'scout') {
    return { ...zero(), special: [{ kind: 'revealHand', target: 'opponent' }] }
  }
  if (name === 'second bite') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'target' },
      },
    }
  }
  if (name === 'wild edge') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 20 },
      choiceRequirement: 'optionalBonus',
      selfDamage: [{ kind: 'optionalChoice', amount: 20 }],
    }
  }
  if (name === 'split bomb') {
    return {
      damage: { kind: 'fixed', amount: 40 },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
      benchDamage: [{ amount: 40, side: 'opponent', zone: 'play', maxTargets: 1, excludeTarget: true }],
    }
  }
  if (name === 'hydro pump') {
    // Water Energy attached to the attacker is approximated by shared Energy.
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'energy', side: 'own' },
      },
    }
  }
  if (name === 'damakinesis') {
    return {
      ...zero(),
      choiceRequirement: 'damageCounterTransfer',
      special: [{ kind: 'transferDamageCounters', maxCounters: 6 }],
    }
  }

  // Plasma/Special Energy, Pokémon Tools, Trainer cards, Prize cards, and deck
  // ordering are not modeled in this battle format.
  return null
}

function inferPlasmaFreezeTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'hide') {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAll', condition: 'heads' }],
    }
  }
  if (name === 'swift sting') {
    return {
      damage: { kind: 'attackerFullHpBonus', baseDamage, bonusDamage: 40 },
      status: [{ target: 'opponent', statuses: ['confused', 'poisoned'], requiresAttackerAtFullHp: true }],
    }
  }
  if (name === 'energy crush') {
    // Energy attached to the opposing team is approximated by its shared pool.
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 20,
        source: { kind: 'energy', side: 'opponent' },
      },
    }
  }
  if (name === 'vengeance') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'pokemonInDiscard', side: 'own' },
      },
    }
  }
  if (name === 'heat boiler') {
    return {
      damage: {
        kind: 'statusBonus',
        baseDamage,
        bonusDamage: 60,
        statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'],
        statusTarget: 'attacker',
      },
    }
  }
  if (name === 'fusion flare' || name === 'fusion bolt') {
    const requiredName = name === 'fusion flare' ? 'Zekrom' : 'Reshiram'
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 40,
        maxUnits: 1,
        source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: [requiredName] },
      },
    }
  }
  if (name === 'refreshing rain') {
    return { ...zero(), healing: [{ amount: 30, side: 'own', zone: 'play' }] }
  }
  if (name === 'gold breaker') {
    return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 50 } }
  }
  if (name === 'mud gun') {
    // The attached Fighting Energy check is approximated with shared Energy.
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 30,
        source: { kind: 'energy', side: 'own' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'surefire spin') {
    return {
      damage: {
        kind: 'conditionalBonus',
        baseDamage,
        bonusDamage: 40,
        condition: { result: 'heads', minimum: 2, exactly: 2 },
      },
      coinFlipCount: 2,
    }
  }
  if (name === 'chillmax') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: baseDamage, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
    }
  }
  if (name === 'call sign') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, includeTypes: ['Water'], destination: 'hand' }],
    }
  }
  if (name === 'shadow ball') {
    return { damage: { kind: 'fixed', amount: 40 }, targetScope: 'any' }
  }
  if (name === 'transfer pain' || name === 'damakinesis') {
    return {
      ...zero(),
      targetScope: name === 'transfer pain' ? 'any' : undefined,
      choiceRequirement: 'damageCounterTransfer',
      special: [{ kind: 'transferDamageCounters', maxCounters: name === 'transfer pain' ? 1 : 6 }],
    }
  }
  if (name === 'elongating arms') {
    return {
      damage: { kind: 'fixed', amount: 30 },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'lovestrike') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 40,
        source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Nidoqueen'] },
      },
    }
  }
  if (name === 'continuous slap') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: baseDamage, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'hail') {
    return { ...zero(), benchDamage: [{ amount: 10, side: 'opponent', zone: 'play' }] }
  }
  if (name === 'mind jack') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'bench', side: 'opponent' },
      },
    }
  }
  if (name === 'vilify') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 30,
        source: { kind: 'chosenHandCards' },
      },
      choiceRequirement: 'discardHandCards',
      special: [{ kind: 'discardSelectedHandPokemon' }],
    }
  }
  if (name === 'dragon slayer') {
    return { damage: { kind: 'targetTypeBonus', baseDamage, bonusDamage: 40, targetType: 'Dragon' } }
  }
  if (name === 'tractorbeam') {
    return {
      damage: { kind: 'fixed', amount: 40 },
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent', beforeDamage: true }],
    }
  }
  if (name === 'astonish') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [{ kind: 'shuffleRandomHandCardIntoDeck', target: 'opponent', condition: 'heads' }],
    }
  }
  if (name === 'dragon vortex') {
    // Energy cards and Energy recovery from the discard are not represented.
    return null
  }
  if (name === 'tri bullet') {
    return {
      ...zero(),
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
      benchDamage: [{ amount: 30, side: 'opponent', zone: 'play', maxTargets: 2, excludeTarget: true }],
    }
  }
  if (name === 'signs of evolution') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{
        kind: 'searchDeckPokemon',
        maxCount: 3,
        includeNames: ['Vaporeon', 'Jolteon', 'Flareon', 'Espeon', 'Umbreon', 'Leafeon', 'Glaceon'],
        destination: 'hand',
      }],
    }
  }
  if (name === 'dual draw') {
    return {
      ...zero(),
      special: [
        { kind: 'drawCards', target: 'self', amount: 2 },
        { kind: 'drawCards', target: 'opponent', amount: 2 },
      ],
    }
  }
  if (name === 'powerful vision') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 10,
        source: { kind: 'handSize', side: 'opponent' },
      },
    }
  }
  if (name === 'strong breeze') {
    return { ...zero(), special: [{ kind: 'shuffleTargetIntoDeck' }] }
  }
  if (name === 'max milk') {
    return {
      ...zero(),
      choiceRequirement: 'ownPokemon',
      healing: [{ target: 'selectedOwnPokemon', amount: 'all' }],
      energyDiscard: [{ target: 'self', amount: 'all' }],
    }
  }
  if (name === 'transfer junk') {
    return {
      ...zero(),
      choiceRequirement: 'discardPokemonToHand',
      special: [{ kind: 'recoverPokemonFromDiscardToHand', includeSubtypes: ['Team Plasma'] }],
    }
  }
  if (name === 'windfall') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 6, shuffleHandIntoDeck: true }] }
  }
  if (name === 'attack command') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 10,
        source: { kind: 'pokemonInPlay', side: 'both' },
      },
    }
  }
  if (name === 'psychic') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'energyOnTarget' },
      },
    }
  }
  if (name === 'imitttack' || name === 'imittack') {
    return {
      ...zero(),
      choiceRequirement: 'copyAttack',
      special: [{ kind: 'copyAttack', preserveExtraCosts: false }],
    }
  }

  // Plasma Energy, Special Energy, Trainer/Tool cards, Prize counts, and
  // deck ordering are unavailable; those attack-specific riders remain filtered.
  return null
}

function inferPlasmaBlastTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'sweet scent') {
    return {
      ...zero(),
      choiceRequirement: 'ownPokemon',
      healing: [{ target: 'selectedOwnPokemon', amount: 20 }],
    }
  }
  if (name === 'lifesplosion') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{
        kind: 'searchDeckPokemon',
        maxCount: 3,
        maxCountFrom: { kind: 'energy', side: 'own' },
        includeSubtypes: ['Stage 2'],
        destination: 'bench',
      }],
    }
  }
  if (name === 'energy press') {
    // Energy attached to the Defending Pokémon uses the opponent's shared pool.
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'energyOnTarget' },
      },
    }
  }
  if (name === 'call for family') {
    const grassOnly = /\bgrass basic\b/i.test(attack.text)
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{
        kind: 'searchDeckPokemon',
        maxCount: 2,
        basicOnly: true,
        ...(grassOnly ? { includeTypes: ['Grass'] } : {}),
      }],
    }
  }
  if (name === 'solar transporter') {
    return {
      ...zero(),
      special: [{ kind: 'revealTopDeckPokemon', amount: 5, includeSubtypes: ['Team Plasma'] }],
    }
  }
  if (name === 'hydro pump') {
    // Water Energy attached to this Pokémon is approximated by shared Energy.
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'energy', side: 'own' },
      },
    }
  }
  if (name === 'sharpshooting') {
    return {
      damage: { kind: 'fixed', amount: 30 },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'splatter') {
    return {
      damage: { kind: 'fixed', amount: 20 },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'outrage') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
      },
    }
  }
  if (name === 'crush and burn') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 30, source: { kind: 'chosenEnergy' } },
      choiceRequirement: 'energyAmount',
      energyDiscard: [{ target: 'self', amount: 'choice' }],
    }
  }
  if (name === 'psypower') {
    return {
      ...zero(),
      choiceRequirement: 'counterDistribution',
      choiceCounterCount: 3,
      counterDamage: [{ target: 'distributed', amountPerCounter: 10 }],
    }
  }
  if (name === 'trading places') {
    return {
      ...zero(),
      choiceRequirement: 'ownBench',
      special: [{ kind: 'switch', target: 'self' }],
    }
  }
  if (name === 'hide') {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAll', condition: 'heads' }],
    }
  }
  if (name === 'last-chance chop') {
    return {
      damage: { kind: 'attackerHpExactBonus', baseDamage, bonusDamage: 70, remainingHp: 10 },
    }
  }
  if (name === 'shoulder throw') {
    return {
      damage: {
        kind: 'subtractCount',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'retreatCost', target: 'target' },
      },
    }
  }
  if (name === 'kick of righteousness') {
    return {
      damage: { kind: 'targetSubtypeBonus', baseDamage, bonusDamage: 40, subtype: 'Team Plasma' },
    }
  }
  if (name === 'roar') {
    return {
      ...zero(),
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }
  if (name === 'blazing claws') {
    return {
      damage: { kind: 'targetSubtypeBonus', baseDamage, bonusDamage: 60, subtype: 'Team Plasma' },
      status: [{ target: 'opponent', statuses: ['burned'], requiresTargetSubtype: 'Team Plasma' }],
    }
  }
  if (name === 'iron head') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: baseDamage, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'dragonaxe') {
    // Metal Energy attached to this Pokémon uses the side's shared Energy pool.
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 40, source: { kind: 'energy', side: 'own' } },
    }
  }
  if (name === 'strike of the champion') {
    return {
      damage: { kind: 'targetSubtypeKnockOut', subtype: 'Team Plasma' },
      ignoreWeaknessResistance: true,
      ignoreTargetDamageModifiers: true,
    }
  }
  if (name === 'double draw') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 2 }] }
  }

  // Fossil and Supporter cards, Special Energy, and Pokémon Tools are absent
  // from this Pokémon-only battle format, so attacks that need them stay filtered.
  return null
}

function inferLegendaryTreasuresTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const text = normalizeTcgAttackText(attack.text || '')
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'share') {
    return {
      ...zero(),
      choiceRequirement: 'ownBench',
      healing: [{ target: 'selectedOwnBench', amount: 40 }],
    }
  }
  if (name === 'double draw') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 2 }] }
  }
  if (name === 'gaia blaster' || name === 'hydro pump' || name === 'madkinesis') {
    const perEnergy = name === 'madkinesis' ? 20 : name === 'gaia blaster' ? 20 : 10
    // Card-specific attached Energy is approximated by the shared Energy pool.
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: perEnergy,
        source: { kind: 'energy', side: 'own' },
      },
    }
  }
  if (name === 'draw in' || name === 'abundant harvest') {
    // Fire/Basic Energy from discard is approximated as shared Energy gain.
    return { ...zero(), energyGain: [{ target: 'self', amount: name === 'draw in' ? 2 : 1 }] }
  }
  if (name === 'raging claws' || name === 'outrage') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
      },
    }
  }
  if (name === 'split bomb') {
    return {
      damage: { kind: 'fixed', amount: 40 },
      targetScope: 'any',
      benchDamage: [{ amount: 40, side: 'opponent', zone: 'play', maxTargets: 1, excludeTarget: true, ignoreWeaknessResistance: true }],
    }
  }
  if (name === 'color coordination') {
    return { damage: { kind: 'selectedEnergyTypeMatchBonus', baseDamage, bonusDamage: 40 } }
  }
  if (name === 'turbo energize') {
    // Basic Energy searched from the deck and attached to the Bench is represented
    // by the shared Energy pool because individual attachments are not modeled.
    return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  }
  if (name === 'intensifying burn') {
    return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 50 } }
  }
  if (name === 'howling rampage' || name === 'revenge blast') return null
  if (name === "emperor's strike") {
    return { damage: { kind: 'attackerRemainingHpLessBonus', baseDamage, bonusDamage: 60 } }
  }
  if (name === 'pull out' || name === 'future sight') return null
  if (name === 'aqua tail') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 10, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
    }
  }
  if (name === 'energy gift') {
    // Psychic Energy searching and placement are approximated by shared Energy.
    return {
      ...zero(),
      coinFlipCount: 1,
      energyGain: [{ target: 'self', amount: 2, condition: 'heads' }],
    }
  }
  if (name === 'round') {
    const perPokemon = baseDamage || (text.includes('30 damage times') ? 30 : 20)
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: perPokemon,
        source: { kind: 'pokemonWithAttack', side: 'own', attackName: 'Round', zone: 'play' },
      },
    }
  }
  if (name === 'glaciate' || name === 'electrishower') {
    const amount = name === 'glaciate' ? 30 : 10
    return {
      ...zero(),
      benchDamage: [{ amount, side: 'opponent', zone: 'play', ignoreWeaknessResistance: true }],
    }
  }
  if (name === 'secret sword') {
    // Water Energy attached to this Pokémon is approximated by shared Energy.
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'energy', side: 'own' } },
    }
  }
  if (name === 'random spark') {
    return {
      damage: { kind: 'fixed', amount: 50 },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'tag draw') {
    return {
      ...zero(),
      special: [{
        kind: 'drawCards',
        target: 'self',
        amount: 4,
        amountPerUnit: 4,
        source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Minun'] },
        shuffleHandIntoDeck: true,
      }],
    }
  }
  if (name === 'negative ion' || name === 'charm') {
    const amount = name === 'negative ion' ? -30 : -20
    return { ...zero(), special: [{ kind: 'buffAttack', target: 'opponent', damageBonus: amount }] }
  }
  if (name === 'call for family') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: /2 basic pokemon/.test(text) ? 2 : 1, basicOnly: true }],
    }
  }
  if (name === 'charge' || name === 'growth' || name === 'synthesis') {
    // Named Energy from the deck or hand is approximated by shared Energy gain.
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'x ball') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'energy', side: 'both' } } }
  }
  if (name === 'fortunate draw') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [
        { kind: 'drawCards', target: 'self', amount: 3, condition: 'heads' },
        { kind: 'drawCards', target: 'opponent', amount: 3, condition: 'tails' },
        { kind: 'millCards', target: 'opponent', amount: 3, condition: 'heads' },
        { kind: 'millCards', target: 'self', amount: 3, condition: 'tails' },
      ],
    }
  }
  if (name === 'revenge') {
    return { damage: { kind: 'lastTurnKnockoutBonus', baseDamage, bonusDamage: 70 } }
  }
  if (name === 'retaliate') {
    return { damage: { kind: 'lastTurnKnockoutBonus', baseDamage, bonusDamage: 60 } }
  }
  if (name === 'psychic' || name === 'energy press') {
    const perEnergy = name === 'energy press' || text.includes('20 more damage') ? 20 : 10
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: perEnergy, source: { kind: 'energyOnTarget' } },
    }
  }
  if (name === 'net force') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: baseDamage || 40,
        source: { kind: 'namedPokemonContains', side: 'own', zone: 'play', values: ['Reuniclus'] },
      },
    }
  }
  if (name === 'cursed drop') {
    return {
      ...zero(),
      choiceRequirement: 'counterDistribution',
      choiceCounterCount: 4,
      counterDamage: [{ target: 'distributed', amountPerCounter: 10 }],
    }
  }
  if (name === 'pandemonium blade') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'injuredPokemon', side: 'own', zone: 'bench' },
      },
    }
  }
  if (name === 'brutal bash') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: baseDamage || 20,
        source: { kind: 'pokemonOfTypesInPlay', side: 'own', types: ['Darkness'], zone: 'play' },
      },
    }
  }
  if (name === 'hexed mirror') {
    return {
      ...zero(),
      special: [{ kind: 'drawCards', target: 'self', amount: 0, amountPerUnit: 1, source: { kind: 'handSize', side: 'opponent' }, shuffleHandIntoDeck: true }],
    }
  }
  if (name === 'captivate') {
    return {
      ...zero(),
      coinFlipCount: 1,
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent', condition: 'heads' }],
    }
  }
  if (name === 'relaxed roll') {
    return { damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 0 }, flipUntilTails: true }
  }
  if (name === 'shooting star pirouette') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 30, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'tiptoe step') {
    return {
      ...zero(),
      special: [{ kind: 'drawCards', target: 'self', amount: 0, amountPerUnit: 1, source: { kind: 'energy', side: 'own' } }],
    }
  }
  if (name === 'attract') {
    return { ...zero(), special: [{ kind: 'attackFailsOnTails' }] }
  }
  if (name === 'eternal radiance') {
    return {
      ...zero(),
      special: [
        { kind: 'transferAllDamageCounters' },
        { kind: 'disableSelfAttack', attackName: 'Eternal Radiance' },
      ],
    }
  }
  if (name === 'energy wheel' || name === 'replace') {
    // Redistribution has no observable effect in the side-wide shared Energy model.
    return zero()
  }
  if (name === 'picnic weather' || name === 'ascension') return null

  // Prize cards, deck ordering, evolving during battle, Energy cards/zones, and
  // named card recovery are unavailable or only approximated by the battle model.
  return null
}

function inferXyBaseTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const text = normalizeTcgAttackText(attack.text || '')
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'leaf munch') {
    return { damage: { kind: 'targetTypeBonus', baseDamage, bonusDamage: 20, targetType: 'Grass' } }
  }
  if (name === 'luring glow') {
    return { ...zero(), choiceRequirement: 'opponentBench', special: [{ kind: 'switch', target: 'opponent' }] }
  }
  if (name === 'pheromotion') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, includeTypes: ['Grass'], destination: 'hand' }],
    }
  }
  if (name === 'conversion powder') {
    return {
      ...zero(),
      choiceRequirement: 'statusCondition',
      status: [{ target: 'opponent', statuses: ['asleep', 'poisoned'], useChosenStatus: true }],
    }
  }
  if (name === 'colorful wind') {
    // Distinct attached Energy types are approximated by the shared Energy count.
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 30, source: { kind: 'energy', side: 'own' } },
    }
  }
  if (name === 'charge dash') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 20 },
      selfDamage: [{ kind: 'optionalChoice', amount: 20 }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'blaze ball' || name === 'hydro pump') {
    // Fire/Water Energy attached to this Pokémon is approximated by shared Energy.
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'flame charge' || name === 'gather energy') {
    // Energy searched from the deck is represented by shared Energy gain.
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'geomancy') {
    // Fairy Energy attachment to two chosen Benched Pokémon is represented as
    // a two-point shared Energy gain because attachments are not tracked.
    return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  }
  if (name === 'devastating wind') {
    return {
      ...zero(),
      special: [{ kind: 'drawCards', target: 'opponent', amount: 4, shuffleHandIntoDeck: true }],
    }
  }
  if (name === 'core splash') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 30,
        source: { kind: 'energy', side: 'own' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'seafaring') {
    return {
      ...zero(),
      coinFlipCount: 3,
      energyGain: [{ target: 'self', amountPerHead: 1, maxAmount: 3 }],
    }
  }
  if (name === 'refresh') {
    return {
      ...zero(),
      healing: [{ target: 'self', amount: 30 }],
      special: [{ kind: 'clearStatus', target: 'self', statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'] }],
    }
  }
  if (name === 'spiny rush') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'energy glide') {
    // The Lightning Energy attachment is represented by shared Energy; switching
    // remains a player choice when a friendly Bench is available.
    return {
      ...zero(),
      energyGain: [{ target: 'self', amount: 1 }],
      choiceRequirement: 'ownBench',
      special: [{ kind: 'switch', target: 'self' }],
    }
  }
  if (name === 'electron crush') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 30,
        source: { kind: 'unusedEnergy' },
        maxUnits: 1,
        optional: true,
      },
      energyDiscard: [{ target: 'self', amount: 1, optional: true }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'continuous tumble') {
    return { damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 0 }, flipUntilTails: true }
  }
  if (name === 'astonish') {
    return { ...zero(), special: [{ kind: 'shuffleRandomHandCardIntoDeck', target: 'opponent' }] }
  }
  if (name === 'eerie voice') {
    return { ...zero(), counterDamage: [{ amount: 20, side: 'opponent', zone: 'play' }] }
  }
  if (name === 'spirit scream') {
    return {
      ...zero(),
      counterDamage: [
        { target: 'self', amountToLeaveHp: 10 },
        { target: 'opponent', amountToLeaveHp: 10 },
      ],
    }
  }
  if (name === 'mad mountain') {
    return {
      ...zero(),
      coinFlipCount: 2,
      special: [{
        kind: 'millCards',
        target: 'opponent',
        amount: 0,
        amountPerUnit: 1,
        source: { kind: 'damageCounters', target: 'attacker' },
        condition: { result: 'heads', minimum: 2, exactly: 2 },
      }],
    }
  }
  if (name === 'rock black') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 50, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
    }
  }
  if (name === 'double draw' || name === 'filch' || name === 'me first') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: name === 'double draw' ? 2 : 1 }] }
  }
  if (name === 'cosmic spin') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 30,
        source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Lunatone'] },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'wake-up slap') {
    return {
      damage: {
        kind: 'statusBonus',
        baseDamage,
        bonusDamage: 60,
        statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'],
      },
      special: [{ kind: 'clearStatus', target: 'opponent', statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'] }],
    }
  }
  if (name === 'nasty plot') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, destination: 'hand' }],
    }
  }
  if (name === 'confusion wave') {
    return {
      ...zero(),
      status: [
        { target: 'self', statuses: ['confused'] },
        { target: 'opponent', statuses: ['confused'] },
      ],
    }
  }
  if (name === 'mental trash') {
    return {
      ...zero(),
      coinFlipCount: 4,
      special: [{ kind: 'discardRandomHandCard', target: 'opponent', amountPerTail: 1 }],
    }
  }
  if (name === 'evil ball') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'energy', side: 'both' } } }
  }
  if (name === 'tailspin piledriver') {
    return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 40 } }
  }
  if (name === 'balloon barrage') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'massage') {
    return {
      ...zero(),
      choiceRequirement: 'ownBench',
      healing: [{ target: 'selectedOwnBench', amount: 60 }],
    }
  }
  if (name === 'sweet scent') {
    return {
      ...zero(),
      choiceRequirement: 'ownPokemon',
      healing: [{ target: 'selectedOwnPokemon', amount: 20 }],
    }
  }
  if (name === 'second bite') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'target' } },
    }
  }
  if (name === 'heal bell') {
    return { ...zero(), healing: [{ amount: 10, side: 'own', zone: 'play' }] }
  }
  if (name === 'hypno headbutt') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 30 },
      choiceRequirement: 'optionalBonus',
      status: [{ target: 'self', statuses: ['asleep'], requiresOptionalChoice: true }],
    }
  }
  if (name === 'bite off') {
    return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 60 } }
  }
  // Supporter and Item cards, deck-top/type checks, Energy cards in the hand or
  // discard, and Prize-card counts are outside the Pokémon-only battle model.
  return null
}

function inferXyFlashfireTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const text = normalizeTcgAttackText(attack.text || '')
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'call for family') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{
        kind: 'searchDeckPokemon',
        maxCount: /2 basic pokemon/.test(text) ? 2 : 1,
        basicOnly: true,
      }],
    }
  }
  if (name === 'deranged dance') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 20,
        source: { kind: 'bench', side: 'both' },
      },
    }
  }
  if (name === 'stoke') {
    // Fire Energy searches and attachments are represented by the shared Energy pool.
    return {
      ...zero(),
      coinFlipCount: 1,
      energyGain: [{ target: 'self', amount: 3, condition: 'heads' }],
    }
  }
  if (name === 'scorching fang') {
    // The optional Fire Energy discard and bonus use the shared Energy pool.
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 30,
        source: { kind: 'unusedEnergy' },
        maxUnits: 1,
        optional: true,
      },
      energyDiscard: [{ target: 'self', amount: 1, optional: true }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'big tusk') {
    return {
      damage: {
        kind: 'subtractCount',
        baseDamage: 120,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
      },
    }
  }
  if (name === 'stomp off') {
    return { ...zero(), special: [{ kind: 'millCards', target: 'opponent', amount: 1 }] }
  }
  if (name === 'dual bullet') {
    return {
      damage: { kind: 'fixed', amount: 50 },
      targetScope: 'any',
      benchDamage: [{ amount: 50, side: 'opponent', zone: 'play', maxTargets: 1, excludeTarget: true }],
    }
  }
  if (name === 'parabolic charge') {
    // Energy cards searched into hand are approximated as shared Energy gain.
    return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  }
  if (name === 'revival') {
    return {
      ...zero(),
      choiceRequirement: 'discardPokemon',
      special: [{ kind: 'reviveDiscardPokemon', side: 'opponent' }],
    }
  }
  if (name === 'cursed drop') {
    return {
      ...zero(),
      choiceRequirement: 'counterDistribution',
      choiceCounterCount: 4,
      counterDamage: [{ target: 'distributed', amountPerCounter: 10 }],
    }
  }
  if (name === 'pain pellets') {
    return {
      ...zero(),
      targetScope: 'any',
      counterDamage: [{
        target: 'opponent',
        amountPerUnit: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
      }],
    }
  }
  if (name === 'psychic') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energyOnTarget' } },
    }
  }
  if (name === 'flash claw') {
    return { ...zero(), special: [{ kind: 'discardRandomHandCard', target: 'opponent' }] }
  }
  if (name === 'claw rend') {
    return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 30 } }
  }
  if (name === 'smokescreen' || name === 'sand-attack') {
    return { ...zero(), special: [{ kind: 'attackFailsOnTails' }] }
  }
  if (name === 'collect') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 1 }] }
  }
  if (name === 'iron crash') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'retreatCost', target: 'target' },
      },
    }
  }
  if (name === 'chip off') {
    return {
      ...zero(),
      special: [{ kind: 'discardRandomHandCard', target: 'opponent', untilHandSize: 4 }],
    }
  }
  if (name === 'aromatherapy') {
    return { ...zero(), healing: [{ amount: 10, side: 'own', zone: 'play' }] }
  }
  if (name === 'petal blizzard') {
    const amount =
      Number.parseInt(
        text.match(/does (\d+) damage to each of your opponents pokemon/)?.[1] || '',
        10,
      ) || baseDamage || 10
    return {
      ...zero(),
      benchDamage: [{ amount, side: 'opponent', zone: 'play' }],
    }
  }
  if (name === 'brilliant search') {
    // The card text can find any cards; only Pokémon are represented in this battle deck.
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 3, destination: 'hand' }],
    }
  }
  if (name === 'crystal barrier') {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
    }
  }
  if (name === 'wonder blast') {
    // Fairy Energy attachments are approximated by the shared Energy pool.
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'energy', side: 'own' } },
    }
  }
  if (name === 'revenge') {
    return { damage: { kind: 'lastTurnKnockoutBonus', baseDamage, bonusDamage: 70 } }
  }
  if (name === 'powerful friends') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 70,
        source: { kind: 'pokemonWithSubtypesInPlay', side: 'own', subtypes: ['Stage 2'], zone: 'bench' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'triple draw') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 3 }] }
  }
  if (name === 'wham bam punch') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage: 100, bonusDamage: 30, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  // Cross-turn coin changes, draw prevention, Prize counts, multi-Pokémon
  // counter redistribution, Energy in hand, and deck ordering are not modeled.
  return null
}

function inferXyFuriousFistsTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'knock off') {
    return { ...zero(), special: [{ kind: 'discardRandomHandCard', target: 'opponent' }] }
  }
  if (name === 'giga power') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 40 },
      selfDamage: [{ kind: 'optionalChoice', amount: 20 }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'big bang horn') {
    return {
      damage: {
        kind: 'subtractCount',
        baseDamage: 180,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
      },
    }
  }
  if (name === 'twin bursts') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 80,
        source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Electivire'] },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'burning shot') {
    return {
      damage: { kind: 'fixed', amount: 150 },
      targetScope: 'any',
      energyDiscard: [{ target: 'self', amount: 2 }],
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'finishing blow') {
    return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 50 } }
  }
  if (name === 'igloo hold') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'retreatCost', target: 'target' },
      },
    }
  }
  if (name === 'splash cannon') {
    // Water Energy attached to Clawitzer is approximated with shared Energy.
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'energy', side: 'own' } },
    }
  }
  if (name === 'tag team spark') {
    // Magmortar's individual Energy is not tracked; shared Energy is used when it is Benched.
    return {
      damage: {
        kind: 'gatedCount',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'energy', side: 'own' },
        gateSource: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Magmortar'] },
        minimumGateUnits: 1,
      },
    }
  }
  if (name === 'entrainment') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 2, basicOnly: true }],
    }
  }
  if (name === 'energy short') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'energyOnTarget' } },
    }
  }
  if (name === 'quick draw') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 1 }] }
  }
  if (name === 'mountain munch') {
    return { ...zero(), special: [{ kind: 'millCards', target: 'opponent', amount: 1 }] }
  }
  if (name === 'venoshock') {
    return {
      damage: {
        kind: 'statusBonus',
        baseDamage,
        bonusDamage: 40,
        statuses: ['poisoned'],
      },
    }
  }
  if (name === 'follow me') {
    return {
      ...zero(),
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }
  if (name === 'jet sonic') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 40,
        source: { kind: 'unusedEnergy' },
        maxUnits: 1,
        optional: true,
      },
      energyDiscard: [{ target: 'self', amount: 1, optional: true }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'charge energy') {
    // Basic Energy cards searched into hand are approximated as shared Energy.
    return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  }
  if (name === 'boomburst') {
    return {
      ...zero(),
      benchDamage: [{ amount: 30, side: 'opponent', zone: 'play' }],
    }
  }
  if (name === 'lickichop') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 30, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'big yawn') {
    return {
      ...zero(),
      status: [
        { target: 'self', statuses: ['asleep'] },
        { target: 'opponent', statuses: ['asleep'] },
      ],
    }
  }
  if (name === 'twister throw') {
    return { damage: { kind: 'handSizeComparisonBonus', baseDamage, bonusDamage: 60, comparison: 'equal' } }
  }

  // Stadium/Tool/Item cards, Prize cards, cross-turn coin changes, in-battle
  // evolution, hand Energy, and deck order are not represented by this mode.
  return null
}

function inferXyPhantomForcesTcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'windfall') {
    return {
      ...zero(),
      special: [{ kind: 'drawCards', target: 'self', amount: 6, shuffleHandIntoDeck: true }],
    }
  }
  if (name === 'protect') {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
    }
  }
  if (name === 'roar' || name === 'follow me') {
    return {
      ...zero(),
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }
  if (name === 'second strike') {
    return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 80 } }
  }
  if (name === 'neon sign') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 2, destination: 'hand' }],
    }
  }
  if (name === 'meddling') {
    // Energy cards revived from the opponent's discard are represented by shared Energy.
    return { ...zero(), energyGain: [{ target: 'opponent', amount: 3 }] }
  }
  if (name === 'ensnaring spray' || name === 'energy press') {
    const perEnergy = name === 'ensnaring spray' ? 10 : 30
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: perEnergy,
        source: { kind: 'energyOnTarget' },
      },
    }
  }
  if (name === 'night march') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 20,
        source: { kind: 'pokemonWithAttackInDiscard', side: 'own', attackName: 'Night March' },
      },
    }
  }
  if (name === 'parabolic spark') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 30,
        source: { kind: 'chosenEnergy' },
      },
      energyDiscard: [{ target: 'self', amount: 'choice' }],
      choiceRequirement: 'energyAmount',
    }
  }
  if (name === 'skill dive') {
    const amount = text.includes('does 30 damage') ? 30 : 10
    return {
      damage: { kind: 'fixed', amount },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'swoop across') {
    return { ...zero(), benchDamage: [{ amount: 10, side: 'opponent', zone: 'play' }] }
  }
  if (name === 'night attack') {
    return {
      ...zero(),
      targetScope: 'any',
      counterDamage: [{ target: 'opponent', amount: 30 }],
    }
  }
  if (name === 'phantom gate') {
    return {
      ...zero(),
      choiceRequirement: 'copyAttack',
      special: [{ kind: 'copyAttack', preserveExtraCosts: false }],
    }
  }
  if (name === 'swallow up') {
    return { damage: { kind: 'remainingHpComparisonBonus', baseDamage, bonusDamage: 50 } }
  }
  if (name === 'see through') {
    return { ...zero(), special: [{ kind: 'revealHand', target: 'opponent' }] }
  }
  if (name === 'cursed drop') {
    const counters = Number.parseInt(text.match(/put (\d+) damage counters/)?.[1] || '', 10)
    if (!Number.isFinite(counters) || counters <= 0) return null
    return {
      ...zero(),
      choiceRequirement: 'counterDistribution',
      choiceCounterCount: counters,
      counterDamage: [{ target: 'distributed', amountPerCounter: 10 }],
    }
  }
  if (name === 'horror note') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 10,
        source: { kind: 'handSize', side: 'own' },
      },
    }
  }
  if (name === 'rock cannon') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'core heal') {
    return {
      ...zero(),
      energyDiscard: [{ target: 'self', amount: 1 }],
      healing: [{ target: 'self', amount: 50 }],
    }
  }
  if (name === 'overdrive smash') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      special: [{ kind: 'buffAttack', target: 'self', attackName: 'Overdrive Smash', damageBonus: 40 }],
    }
  }
  if (name === 'nightmare mambo') {
    return {
      damage: { kind: 'statusBonus', baseDamage, bonusDamage: 60, statuses: ['asleep'] },
    }
  }
  if (name === 'maxamar') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 60, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
    }
  }
  if (name === 'spiral rush') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 30, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'slash blast') {
    // Metal Energy attached to Aegislash is approximated with shared Energy.
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'energy', side: 'own' } },
    }
  }
  if (name === 'call for family') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 2, basicOnly: true }],
    }
  }
  if (name === 'bright garden') {
    return {
      damage: {
        kind: 'weightedCount',
        baseDamage: 0,
        sources: [
          { source: { kind: 'pokemonOfTypesInPlay', side: 'own', types: ['Grass'], zone: 'play' }, perUnitDamage: 20 },
          { source: { kind: 'pokemonOfTypesInPlay', side: 'own', types: ['Fairy'], zone: 'play' }, perUnitDamage: 20 },
        ],
      },
    }
  }
  if (name === 'lick away') {
    return {
      ...zero(),
      special: [{ kind: 'clearStatus', target: 'self', statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'] }],
    }
  }
  if (name === 'sparkle') {
    return { ...zero(), special: [{ kind: 'attackFailsOnTails' }] }
  }
  if (name === 'tender vengeance') {
    return {
      ...zero(),
      coinFlipCount: 1,
      damage: {
        kind: 'conditionalCount',
        baseDamage: 0,
        perUnitDamage: 10,
        source: { kind: 'damageCountersOnSide', side: 'own', zone: 'bench' },
        condition: 'heads',
      },
    }
  }
  if (name === 'charge dash') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 20 },
      selfDamage: [{ kind: 'optionalChoice', amount: 20 }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'psybite') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 30,
        source: { kind: 'energy', side: 'own' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'screaming fit') {
    return {
      ...zero(),
      status: [
        { target: 'self', statuses: ['confused'] },
        { target: 'opponent', statuses: ['confused'] },
      ],
    }
  }
  if (name === 'boomburst') {
    return { ...zero(), benchDamage: [{ amount: 20, side: 'opponent', zone: 'play' }] }
  }

  // Tool/Item/Stadium cards, Prize effects, future-turn coin rules, evolution,
  // hand Energy, and discard-to-deck movement are not represented in this mode.
  return null
}

function inferXyPrimalClashTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const text = normalizeTcgAttackText(attack.text || '')
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'multiply') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, includeNames: ['Weedle'] }],
    }
  }
  if (name === 'grass knot') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'retreatCost', target: 'target' },
      },
    }
  }
  if (name === 'pester') {
    return {
      damage: {
        kind: 'statusBonus',
        baseDamage,
        bonusDamage: 30,
        statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'],
      },
    }
  }
  if (name === 'helping hand') {
    // Basic Energy attachment to a Benched Pokémon is approximated as shared Energy gain.
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'wood blast') {
    // Grass Energy attached to Trevenant is approximated with shared Energy.
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'roar' || name === 'captivate') {
    return {
      ...zero(),
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }
  if (name === 'indomitable blaze') {
    return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 60 } }
  }
  if (name === 'spreading flames') {
    // Energy recovered from the discard is represented in the shared pool.
    return { ...zero(), energyGain: [{ target: 'self', amount: 3 }] }
  }
  if (name === 'explosive jet') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 50, source: { kind: 'chosenEnergy' } },
      energyDiscard: [{ target: 'self', amount: 'choice' }],
      choiceRequirement: 'energyAmount',
    }
  }
  if (name === 'knockout needle') {
    return {
      damage: {
        kind: 'conditionalBonus',
        baseDamage,
        bonusDamage: 40,
        condition: { result: 'heads', minimum: 2, exactly: 2 },
      },
      coinFlipCount: 2,
    }
  }
  if (name === 'water arrow') {
    return {
      damage: { kind: 'fixed', amount: 60 },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'hydro pump') {
    // Water Energy attached to Swampert is approximated with shared Energy.
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 30, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'knock off') {
    return { ...zero(), special: [{ kind: 'discardRandomHandCard', target: 'opponent' }] }
  }
  if (name === 'ball roll' || name === 'spring tides') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'frozen splash') {
    return { damage: { kind: 'targetTypeBonus', baseDamage, bonusDamage: 70, targetType: 'Fighting' } }
  }
  if (name === 'shell protection') {
    return { ...zero(), protection: [{ target: 'self', kind: 'preventAtMost', amount: 50 }] }
  }
  if (name === 'powerful storm') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'psychic') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energyOnTarget' } } }
  }
  if (name === 'deep sea swirl') {
    return {
      ...zero(),
      special: [{ kind: 'drawCards', target: 'self', amount: 6, shuffleHandIntoDeck: true }],
    }
  }
  if (name === 'charge') {
    // Lightning Energy attachment is represented in the shared Energy pool.
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'electricannon') {
    // Lightning Energy and its discard are approximated with the shared Energy pool.
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 50,
        source: { kind: 'unusedEnergy' },
        maxUnits: 1,
        optional: true,
      },
      energyDiscard: [{ target: 'self', amount: 'all', optional: true }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'synchro star') {
    return { damage: { kind: 'energyEqualityBonus', baseDamage, bonusDamage: 60 } }
  }
  if (name === 'rock shower') {
    return {
      ...zero(),
      coinFlipCount: 3,
      benchDamage: [{ amount: 0, amountPerHead: 20, side: 'opponent', zone: 'play' }],
    }
  }
  if (name === 'stiffen') {
    return { ...zero(), protection: [{ target: 'self', kind: 'reduce', amount: 40 }] }
  }
  if (name === 'pure power') {
    const counters = Number.parseInt(text.match(/put (\d+) damage counters/)?.[1] || '', 10)
    if (!Number.isFinite(counters) || counters <= 0) return null
    return {
      ...zero(),
      choiceRequirement: 'counterDistribution',
      choiceCounterCount: counters,
      counterDamage: [{ target: 'distributed', amountPerCounter: 10 }],
    }
  }
  if (name === 'ear dig') {
    return {
      ...zero(),
      flipUntilTails: true,
      special: [{ kind: 'millCards', target: 'opponent', amount: 0, amountPerHead: 1 }],
    }
  }
  if (name === 'hunt') {
    return {
      damage: { kind: 'fixed', amount: 30 },
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent', beforeDamage: true }],
    }
  }
  if (name === 'straight claw') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 30,
        source: { kind: 'unusedEnergy' },
        maxUnits: 1,
        optional: true,
      },
      energyDiscard: [{ target: 'self', amount: 1, optional: true }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'dredge') {
    // Energy searched and attached from the deck is represented by shared Energy gain.
    return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  }
  if (name === 'false swipe') {
    return {
      damage: { kind: 'targetToRemainingHp', remainingHp: 10, condition: 'heads' },
      coinFlipCount: 1,
    }
  }
  if (name === 'superpower') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 30 },
      selfDamage: [{ kind: 'optionalChoice', amount: 30 }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'dwindling wave') {
    return {
      damage: {
        kind: 'subtractCount',
        baseDamage: 100,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
      },
    }
  }
  if (name === 'brilliant arrow') {
    // Fairy Energy attached across the team is approximated with shared Energy.
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 30, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'gather strength') {
    // Basic Energy cards searched into hand are approximated as shared Energy.
    return { ...zero(), energyGain: [{ target: 'self', amount: 4 }] }
  }
  if (name === 'sand attack') {
    return { ...zero(), special: [{ kind: 'attackFailsOnTails' }] }
  }
  if (name === 'charm') {
    return { ...zero(), special: [{ kind: 'buffAttack', target: 'opponent', damageBonus: -20 }] }
  }
  if (name === 'replace') {
    // Energy movement has no observable effect with the shared Energy pool.
    return zero()
  }
  if (name === 'drench') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 20,
        source: { kind: 'energy', side: 'own' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'continuous headbutt') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 80, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'burrow') {
    return { ...zero(), special: [{ kind: 'millCards', target: 'opponent', amount: 1 }] }
  }
  if (name === 'uproar') {
    return { ...zero(), benchDamage: [{ amount: 10, side: 'opponent', zone: 'play' }] }
  }

  // Stadium/Tool/Item cards, Prize effects, evolution, Energy in hand, and
  // unsupported discard-pile-to-hand/deck operations remain filtered.
  return null
}

function inferXyRoaringSkiesTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'loathe') {
    return {
      ...zero(),
      coinFlipCount: 1,
      choiceRequirement: 'ownBench',
      special: [{ kind: 'switch', target: 'self', condition: 'heads' }],
    }
  }
  if (name === 'shake it off') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 20,
        source: { kind: 'pokemonOfTypesInPlay', side: 'opponent', types: ['Colorless'], zone: 'play' },
      },
    }
  }
  if (name === 'flock') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, includeNames: ['Wurmple'] }],
    }
  }
  if (name === 'cursed rain') {
    return {
      ...zero(),
      choiceRequirement: 'ownBench',
      counterDamage: [{ amount: 10, side: 'opponent', zone: 'play' }],
      special: [{ kind: 'switch', target: 'self' }],
    }
  }
  if (name === 'me first' || name === "feelin' fine") {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 1 }] }
  }
  if (name === 'grand loop') {
    return {
      ...zero(),
      choiceRequirement: 'optionalOwnBench',
      special: [
        { kind: 'drawCards', target: 'self', amount: 3 },
        { kind: 'switch', target: 'self', optional: true },
      ],
    }
  }
  if (name === 'find ice') {
    // Water Energy cards searched into hand are approximated as shared Energy.
    return { ...zero(), energyGain: [{ target: 'self', amount: 3 }] }
  }
  if (name === 'tail whip') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [{ kind: 'cannotAttack', target: 'opponent', condition: 'heads' }],
    }
  }
  if (name === 'continuous tumble') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'random spark') {
    return {
      damage: { kind: 'fixed', amount: 30 },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'psywave') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energyOnTarget' } } }
  }
  if (name === 'close encounter') {
    // The opening-turn permission is not tracked; its two-card draw is modeled.
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 2 }] }
  }
  if (name === 'rip off') {
    return { ...zero(), special: [{ kind: 'shuffleRandomHandCardIntoDeck', target: 'opponent' }] }
  }
  if (name === 'powerful slap') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 50, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
    }
  }
  if (name === 'song of echoes') {
    return {
      ...zero(),
      special: [{
        kind: 'drawCards',
        target: 'self',
        amount: 0,
        amountPerUnit: 1,
        source: { kind: 'bench', side: 'both' },
        shuffleHandIntoDeck: true,
      }],
    }
  }
  if (name === 'continuous headbutt') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'power howl') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'handSize', side: 'opponent' } },
    }
  }
  if (name === 'sonic ace') {
    return {
      damage: { kind: 'fixed', amount: 120 },
      targetScope: 'any',
      energyDiscard: [{ target: 'self', amount: 2 }],
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'burrow') {
    return { ...zero(), special: [{ kind: 'millCards', target: 'opponent', amount: 1 }] }
  }
  if (name === 'call for family') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 2, basicOnly: true }],
    }
  }
  if (name === 'bind wound') {
    return {
      ...zero(),
      choiceRequirement: 'ownPokemon',
      healing: [{ target: 'selectedOwnPokemon', amount: 20 }],
    }
  }
  if (name === 'intensifying burn') {
    return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 50 } }
  }
  if (name === 'feather dance') {
    return {
      ...zero(),
      special: [{ kind: 'buffAttack', target: 'self', damageBonus: 80 }],
    }
  }
  if (name === 'sand attack') {
    return { ...zero(), special: [{ kind: 'attackFailsOnTails' }] }
  }

  // Prize, deck-top, Trainer, delayed-knockout, and attached-card effects are
  // filtered where their state is not represented by this battle mode.
  return null
}

function inferXyAncientOriginsTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'unseen claw') {
    return {
      damage: {
        kind: 'statusBonus',
        baseDamage,
        bonusDamage: 70,
        statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'],
      },
    }
  }
  if (name === 'windmill') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      choiceRequirement: 'ownBench',
      special: [{ kind: 'switch', target: 'self' }],
    }
  }
  if (name === 'intelligence gathering') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      special: [{ kind: 'drawCards', target: 'self', untilHandSize: 6 }],
    }
  }
  if (name === 'bee revenge') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'pokemonInDiscard', side: 'own', all: true },
      },
    }
  }
  if (name === 'aqua tail') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 30, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energyOfType', side: 'own', type: 'Water' },
    }
  }
  if (name === 'bee drain') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      healing: [{ target: 'self', amountFrom: 'damageDealt' }],
    }
  }
  if (name === 'impound') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      special: [{ kind: 'preventRetreat', target: 'opponent' }],
    }
  }
  if (name === 'heat tackle') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      coinFlipCount: 1,
      selfDamage: [{ kind: 'fixed', amount: 30, condition: 'tails' }],
    }
  }
  if (name === 'wind wheel') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      choiceRequirement: 'optionalOpponentBench',
      special: [{ kind: 'switch', target: 'opponent', optional: true }],
    }
  }
  if (name === 'full retaliation') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 30,
        source: { kind: 'damageCountersOnNamedPokemon', side: 'own', zone: 'bench', names: ['Magikarp'] },
      },
    }
  }
  if (name === 'glaciate') {
    return {
      ...zero(),
      benchDamage: [{ amount: 30, side: 'opponent', zone: 'play' }],
    }
  }
  if (name === 'icecalibur') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      energyDiscard: [{ target: 'self', amount: 1 }],
      special: [{ kind: 'cannotAttack', target: 'opponent' }],
    }
  }
  if (name === 'sparkling tail') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      ignoreWeaknessResistance: true,
      ignoreTargetDamageModifiers: true,
    }
  }
  if (name === 'exavolt') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 50 },
      selfDamage: [{ kind: 'optionalChoice', amount: 30 }],
      status: [{ target: 'opponent', statuses: ['paralyzed'], requiresOptionalChoice: true }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'hyper beam') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      coinFlipCount: 1,
      energyDiscard: [{ target: 'opponent', amount: 1, condition: 'heads' }],
    }
  }
  if (name === 'electric mischief') {
    return {
      ...zero(),
      coinFlipCount: 3,
      special: [{ kind: 'shuffleRandomHandCardIntoDeck', target: 'opponent', amountPerHead: 1 }],
    }
  }
  if (name === 'superpower') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 40 },
      selfDamage: [{ kind: 'optionalChoice', amount: 20 }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'trash tentacle') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      choiceRequirement: 'discardPokemonToHand',
      special: [{ kind: 'recoverPokemonFromDiscardToHand' }],
    }
  }
  if (name === 'hyperspace fury') {
    return {
      damage: { kind: 'fixed', amount: 100 },
      targetScope: 'any',
      energyDiscard: [{ target: 'self', amount: 2 }],
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'crazy hammer') {
    return {
      damage: {
        kind: 'statusBonus',
        baseDamage,
        bonusDamage: 80,
        statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'],
        statusTarget: 'attacker',
      },
      special: [{ kind: 'clearStatus', target: 'self', statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'] }],
    }
  }
  if (name === 'unyielding rock') {
    return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 60 } }
  }
  if (name === 'iron cannon') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 80,
        source: { kind: 'energyOfType', side: 'own', type: 'Metal' },
        maxUnits: 1,
        optional: true,
      },
      energyDiscard: [{ target: 'self', amount: 'all', optional: true, requiresEnergyType: 'Metal' }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'machine gun stomp') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'handSize', side: 'own' } },
    }
  }
  if (name === 'iron head') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'forbidden iron hammer') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      energyDiscard: [{ target: 'opponent', amount: 1, targetSubtype: 'ex' }],
    }
  }
  if (name === 'windy mischief') {
    return {
      ...zero(),
      choiceRequirement: 'damageCounterTransfer',
      special: [{ kind: 'transferDamageCounters', maxCounters: 99, sourceZone: 'bench' }],
    }
  }
  if (name === 'liquid blow') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 20,
        source: { kind: 'retreatCost', target: 'target' },
      },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'act tough') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 20,
        source: { kind: 'energyOfType', side: 'own', type: 'Darkness' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'shining breath') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      special: [{
        kind: 'preventStatus',
        target: 'self',
        statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'],
      }],
    }
  }
  if (name === 'flame screen') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      protection: [{ target: 'self', kind: 'reduce', amount: 30 }],
    }
  }
  if (name === 'telekinesis') {
    return {
      damage: { kind: 'fixed', amount: 50 },
      targetScope: 'any',
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'destroyer king') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 60,
        source: { kind: 'damageCounters', target: 'target' },
      },
    }
  }
  if (name === 'tidal storm') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      benchDamage: [{ amount: 30, side: 'opponent', zone: 'bench', subtypeFilter: { include: ['EX'] } }],
    }
  }
  if (name === 'data check') return zero()
  if (name === 'aero ball') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'energy', side: 'both' } },
    }
  }

  // Prize, deck-top/devolution, attached-card and delayed-knockout effects, as
  // well as Trainer or Stadium cards, are not represented in this battle mode.
  return null
}

function inferXyBreakthroughTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'heavy suplex') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'retreatCost', target: 'target' },
      },
    }
  }
  if (name === 'hand fling') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'handSize', side: 'own' } },
    }
  }
  if (name === 'spike lariat') {
    return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 60 } }
  }
  if (name === 'protect') {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
    }
  }
  if (name === 'melting horn') {
    return { ...zero(), special: [{ kind: 'millCards', target: 'opponent', amount: 2 }] }
  }
  if (name === 'inferno fang') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 80,
        source: { kind: 'energyOfType', side: 'own', type: 'Fire' },
        maxUnits: 1,
        optional: true,
      },
      energyDiscard: [{ target: 'self', amount: 'all', optional: true, requiresEnergyType: 'Fire' }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'continuous spin') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 10, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'deep sea swirl') {
    return {
      ...zero(),
      special: [{ kind: 'drawCards', target: 'self', amount: 7, shuffleHandIntoDeck: true }],
    }
  }
  if (name === 'wild river') {
    return {
      ...zero(),
      choiceRequirement: 'ownBench',
      special: [{ kind: 'switch', target: 'self' }],
    }
  }
  if (name === 'instant freeze') {
    return { damage: { kind: 'handSizeComparisonBonus', baseDamage, bonusDamage: 100, comparison: 'equal' } }
  }
  if (name === 'soaking horn') {
    return { damage: { kind: 'healedThisTurnBonus', baseDamage, bonusDamage: 80 } }
  }
  if (name === 'cryo mouth') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 150,
        source: { kind: 'damageCounters', target: 'attacker' },
        minimumUnits: 10,
      },
    }
  }
  if (name === 'thunderclap shot') {
    return {
      ...zero(),
      benchDamage: [{ amount: 50, side: 'opponent', zone: 'play', subtypeFilter: { include: ['EX'] } }],
    }
  }
  if (name === 'thunder lance') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'energyOfType', side: 'own', type: 'Lightning' },
      },
    }
  }
  if (name === 'revenge') {
    return { damage: { kind: 'lastTurnKnockoutBonus', baseDamage, bonusDamage: 80 } }
  }
  if (name === 'creep show') {
    return {
      damage: { kind: 'knockOutAtDamageCounters', minimumCounters: 3 },
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'shatter shot') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 30,
        source: { kind: 'energyOfType', side: 'own', type: 'Psychic' },
      },
    }
  }
  if (name === 'damage change') {
    return { ...zero(), special: [{ kind: 'swapDamageCounters' }] }
  }
  if (name === 'vanishing strike') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      ignoreResistance: true,
      ignoreTargetDamageModifiers: true,
    }
  }
  if (name === 'psychic infinity') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 30,
        source: { kind: 'energy', side: 'both' },
      },
      ignoreWeakness: true,
    }
  }
  if (name === 'wave amplification') {
    return {
      ...zero(),
      special: [{ kind: 'buffAttack', target: 'self', attackName: 'Returning Echo', damageBonus: 60 }],
    }
  }
  if (name === 'stiffen') {
    return { ...zero(), protection: [{ target: 'self', kind: 'reduce', amount: 20 }] }
  }
  if (name === 'odor sleuth') {
    return {
      ...zero(),
      coinFlipCount: 1,
      choiceRequirement: 'discardPokemonToHand',
      special: [{ kind: 'recoverPokemonFromDiscardToHand', condition: 'heads' }],
    }
  }
  if (name === 'mind bullet') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 20,
        source: { kind: 'energyOnTarget' },
      },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'sharpshooting') {
    return {
      damage: { kind: 'fixed', amount: 30 },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'gathering footsteps') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: {
          kind: 'retreatCostOnNamedPokemon',
          side: 'own',
          zone: 'play',
          names: ['Swinub', 'Piloswine', 'Mamoswine'],
        },
      },
    }
  }
  if (name === 'prima rondo') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 50,
        source: { kind: 'energyOfType', side: 'own', type: 'Psychic' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'whiny voice') {
    return {
      ...zero(),
      special: [{ kind: 'shuffleRandomHandCardIntoDeck', target: 'opponent' }],
    }
  }
  if (name === 'foul play') {
    return {
      ...zero(),
      choiceRequirement: 'copyAttack',
      special: [{ kind: 'copyAttack', preserveExtraCosts: false }],
    }
  }
  if (name === 'pain amplifier') {
    return {
      ...zero(),
      counterDamage: [{ amount: 30, side: 'opponent', zone: 'play', onlyDamaged: true }],
    }
  }
  if (name === 'roar') {
    return {
      ...zero(),
      choiceRequirement: 'optionalOpponentBench',
      special: [{ kind: 'switch', target: 'opponent', optional: true }],
    }
  }
  if (name === 'startling bark') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [{ kind: 'shuffleRandomHandCardIntoDeck', target: 'opponent', amountPerHead: 3 }],
    }
  }
  if (name === 'aromatherapy') {
    return { ...zero(), healing: [{ amount: 30, side: 'own', zone: 'play' }] }
  }
  if (name === 'rainbow force') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 30,
        source: { kind: 'distinctTypesInPlay', side: 'own', zone: 'bench' },
      },
    }
  }
  if (name === 'power creation') {
    return { damage: { kind: 'healedThisTurnBonus', baseDamage, bonusDamage: 80 } }
  }
  if (name === 'dragon slayer') {
    return { damage: { kind: 'targetTypeBonus', baseDamage, bonusDamage: 40, targetType: 'Dragon' } }
  }
  if (name === 'tuning') {
    return {
      ...zero(),
      special: [{
        kind: 'drawCards',
        target: 'self',
        amountPerUnit: 1,
        source: { kind: 'handSize', side: 'opponent' },
        shuffleHandIntoDeck: true,
      }],
    }
  }
  if (name === 'synchro woofer') {
    return { damage: { kind: 'handSizeComparisonBonus', baseDamage, bonusDamage: 80, comparison: 'equal' } }
  }
  if (name === 'exhausted tackle') {
    return {
      damage: { kind: 'conditionalBonus', baseDamage: 0, bonusDamage: 30, condition: 'heads' },
      coinFlipCount: 1,
      selfDamage: [{ kind: 'fixed', amount: 30, condition: 'tails' }],
    }
  }
  if (name === 'doduo delivery') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 2 }] }
  }
  if (name === 'drag off') {
    return {
      damage: { kind: 'fixed', amount: 50 },
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent', beforeDamage: true }],
    }
  }
  if (name === 'bind wound') {
    return {
      ...zero(),
      choiceRequirement: 'ownPokemon',
      healing: [{ target: 'selectedOwnPokemon', amount: 20 }],
    }
  }
  if (name === 'call for pals') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 3, includeNames: ['Starly'] }],
    }
  }
  if (name === 'wish') {
    return {
      ...zero(),
      coinFlipCount: 1,
      choiceRequirement: 'deckPokemon',
      special: [{
        kind: 'searchDeckPokemon',
        maxCount: 1,
        destination: 'hand',
        condition: 'heads',
      }],
    }
  }

  // Prize, Stadium, Trainer/Item, top-deck Energy, and per-Pokémon Energy
  // effects are filtered when the modeled board cannot represent their state.
  return null
}

function inferXyBreakpointTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'bug hunch') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 3, includeTypes: ['Grass'], destination: 'hand' }],
    }
  }
  if (name === 'screech') {
    return { ...zero(), special: [{ kind: 'buffDefendingPokemon', damageBonus: 60 }] }
  }
  if (name === 'aromatherapy') {
    return { ...zero(), healing: [{ amount: 10, side: 'own', zone: 'play' }] }
  }
  if (name === 'spiral punch' || name === 'wild fury') {
    return {
      damage: {
        kind: 'headsMultiplier',
        damagePerHeads: name === 'spiral punch' ? 20 : 40,
        coinFlipCount: 0,
      },
      flipUntilTails: true,
    }
  }
  if (name === 'tail lure') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, destination: 'hand' }],
    }
  }
  if (name === 'round') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 10,
        source: { kind: 'pokemonWithAttack', side: 'own', attackName: 'Round', zone: 'play' },
      },
    }
  }
  if (name === 'water duplicates') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 3, includeNames: ['Frogadier'] }],
    }
  }
  if (name === 'roar') {
    return {
      ...zero(),
      choiceRequirement: 'optionalOpponentBench',
      special: [{ kind: 'switch', target: 'opponent', optional: true }],
    }
  }
  if (name === 'crashing bolt') {
    return { damage: { kind: 'resistanceTypeBonus', baseDamage, bonusDamage: 60, resistanceType: 'Fighting' } }
  }
  if (name === 'reflective shield') {
    return { ...zero(), special: [{ kind: 'reflectDamage', reflectFixedDamage: 50 }] }
  }
  if (name === 'energy present') {
    // Attached Energy is represented by the side-wide shared Energy pool.
    return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  }
  if (name === 'stormy seas') {
    // Water Energy attached to this Pokémon is approximated by shared Energy.
    return { ...zero(), flipUntilTails: true, energyGain: [{ target: 'self', amountPerHead: 1 }] }
  }
  if (name === 'siphon off') {
    // Energy attached from the discard pile is approximated by shared Energy.
    return { ...zero(), energyGain: [{ target: 'self', amount: 3 }] }
  }
  if (name === 'hide') {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
    }
  }
  if (name === 'energy press') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'energyOnTarget' },
      },
    }
  }
  if (name === 'silent fear') {
    return { ...zero(), counterDamage: [{ amount: 30, side: 'opponent', zone: 'play' }] }
  }
  if (name === 'never enough') {
    return {
      ...zero(),
      choiceRequirement: 'discardHandCards',
      choiceHandCardCount: 1,
      special: [
        { kind: 'discardSelectedHandPokemon' },
        { kind: 'drawCards', target: 'self', amount: 2, requiresDiscardChoice: true },
      ],
    }
  }
  if (name === 'bite off') {
    return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 80 } }
  }
  if (name === 'roll up') {
    return {
      ...zero(),
      coinFlipCount: 3,
      special: [{ kind: 'discardRandomHandCard', target: 'opponent', amountPerHead: 1 }],
    }
  }
  if (name === 'dark pulse') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'energyOfType', side: 'own', type: 'Darkness' },
      },
    }
  }
  if (name === 'dark head') {
    return {
      damage: {
        kind: 'statusBonus',
        baseDamage,
        bonusDamage: 80,
        statuses: ['asleep'],
      },
    }
  }
  if (name === 'spike lash') {
    return {
      ...zero(),
      counterDamage: [{ amountPerTargetRetreatCost: 10, side: 'opponent', zone: 'play' }],
    }
  }
  if (name === 'dizzying cologne') {
    return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 40 } }
  }
  if (name === 'dangerous suspicion') {
    return {
      ...zero(),
      choiceRequirement: 'ownBench',
      special: [
        { kind: 'drawCards', target: 'self', amount: 1 },
        { kind: 'switch', target: 'self' },
      ],
    }
  }
  if (name === 'call for family') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, basicOnly: true }],
    }
  }
  if (name === 'big charge') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 50,
        source: { kind: 'pokemonWithSubtypesInPlay', side: 'own', subtypes: ['MEGA'], zone: 'bench' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'act cute') {
    return { ...zero(), special: [{ kind: 'shuffleRandomHandCardIntoDeck', target: 'opponent' }] }
  }
  if (name === 'collect') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 1 }] }
  }
  if (name === 'tuning') {
    return {
      ...zero(),
      special: [{
        kind: 'drawCards',
        target: 'self',
        amountPerUnit: 1,
        source: { kind: 'handSize', side: 'opponent' },
        shuffleHandIntoDeck: true,
      }],
    }
  }

  // Prize, Trainer/Tool/Stadium, top-deck and attached-card effects remain
  // filtered when their card zones or individual-Pokemon Energy are unmodeled.
  return null
}

function inferXyFatesCollideTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'hide a berry') {
    return {
      ...zero(),
      special: [
        { kind: 'drawCards', target: 'self', amount: 2 },
        { kind: 'shuffleRandomHandCardIntoDeck', target: 'self' },
      ],
    }
  }
  if (name === 'find a friend' || name === 'encounter') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, destination: 'hand' }],
    }
  }
  if (name === 'flying flare') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 40 },
      selfDamage: [{ kind: 'optionalChoice', amount: 20 }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'tail whip') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [{ kind: 'cannotAttack', target: 'opponent', condition: 'heads' }],
    }
  }
  if (name === 'invite out') {
    return {
      ...zero(),
      coinFlipCount: 1,
      choiceRequirement: 'optionalOpponentBench',
      special: [{ kind: 'switch', target: 'opponent', condition: 'heads' }],
    }
  }
  if (name === 'psystorm') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 20,
        source: { kind: 'energy', side: 'both' },
      },
    }
  }
  if (name === 'energy extract') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'plasmagic') {
    return { ...zero(), special: [{ kind: 'transferDamageCountersFromOwnSide', maxCountersPerPokemon: 2 }] }
  }
  if (name === 'suppression') {
    return {
      ...zero(),
      counterDamage: [{ amount: 30, side: 'opponent', zone: 'play', requiresEnergy: { side: 'opponent', minimum: 1 } }],
    }
  }
  if (name === 'division') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 2, includeNames: ['Koffing'] }],
    }
  }
  if (name === 'balloon bomb') {
    return {
      ...zero(),
      coinFlipCount: 2,
      special: [{ kind: 'millCards', target: 'opponent', amount: 0, amountPerHead: 2 }],
    }
  }
  if (name === 'mini link') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 30,
        source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Solosis'] },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'double link') {
    return {
      damage: {
        kind: 'weightedCount',
        baseDamage,
        sources: [
          { source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Solosis'] }, perUnitDamage: 30, maxUnits: 1 },
          { source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Duosion'] }, perUnitDamage: 60, maxUnits: 1 },
        ],
      },
    }
  }
  if (name === 'link fusion') {
    return {
      damage: {
        kind: 'weightedCount',
        baseDamage,
        sources: [
          { source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Solosis'] }, perUnitDamage: 30, maxUnits: 1 },
          { source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Duosion'] }, perUnitDamage: 60, maxUnits: 1 },
          { source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Reuniclus'] }, perUnitDamage: 90, maxUnits: 1 },
        ],
      },
    }
  }
  if (name === 'mountain munch') {
    return { ...zero(), special: [{ kind: 'millCards', target: 'opponent', amount: 1 }] }
  }
  if (name === 'twin bursts') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 60,
        source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Mothim'] },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'backflip') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 1 }] }
  }
  if (name === 'lookout') {
    return {
      ...zero(),
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }
  if (name === "land's pulse" || name === 'wonder stage' || name === 'mist purge' || name === 'dark mountain') {
    // Stadium, Special Energy, or deck-card riders are omitted; retain base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'iron head') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'iron defense') {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
    }
  }
  if (name === 'fight alone') {
    return {
      damage: {
        kind: 'positiveComparativeCount',
        baseDamage,
        perUnitDamage: 60,
        addSource: { kind: 'pokemonInPlay', side: 'opponent' },
        subtractSource: { kind: 'pokemonInPlay', side: 'own' },
      },
    }
  }
  if (name === 'rapid blaster') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'chosenEnergy' },
      },
      choiceRequirement: 'energyAmount',
      choiceEnergyType: 'Metal',
      energyDiscard: [{ target: 'self', amount: 'choice', requiresEnergyType: 'Metal' }],
    }
  }
  if (name === 'mimic') {
    return {
      ...zero(),
      special: [{
        kind: 'drawCards',
        target: 'self',
        amountPerUnit: 1,
        source: { kind: 'handSize', side: 'opponent' },
        shuffleHandIntoDeck: true,
      }],
    }
  }
  if (name === 'dragon trail') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 30,
        source: { kind: 'energyOfType', side: 'own', type: 'Lightning' },
      },
    }
  }
  if (name === 'turmoil strike') {
    return {
      damage: { kind: 'fixed', amount: 50 },
      targetScope: 'any',
      targetMustBeDamaged: true,
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'toss and turn') {
    return {
      damage: {
        kind: 'statusBonus',
        baseDamage,
        bonusDamage: 90,
        statuses: ['asleep'],
        statusTarget: 'attacker',
      },
      allowWhileAsleep: true,
    }
  }
  if (name === 'intensifying burn') {
    return { damage: { kind: 'pokemonExTargetBonus', baseDamage, bonusDamage: 60 } }
  }
  if (name === 'round') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 10,
        source: { kind: 'pokemonWithAttack', side: 'own', attackName: 'Round', zone: 'play' },
      },
    }
  }
  if (name === 'covet') {
    return {
      ...zero(),
      special: [
        { kind: 'revealHand', target: 'opponent' },
        { kind: 'shuffleRandomHandCardIntoDeck', target: 'opponent' },
      ],
    }
  }
  if (name === 'sweeping cure') {
    return {
      ...zero(),
      choiceRequirement: 'ownBench',
      healing: [{ target: 'selectedOwnBench', amount: 90 }],
    }
  }

  // Prize, Trainer/Tool/Stadium, ability, delayed knockout, and multi-target
  // Energy-discard effects stay filtered where the battle state cannot model them.
  return null
}

function inferXySteamSiegeTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'fluffy transport' || name === 'roar') {
    return {
      ...zero(),
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }
  if (name === 'scout') {
    return { ...zero(), special: [{ kind: 'revealHand', target: 'opponent' }] }
  }
  if (name === 'assault boom' || name === 'past friends') {
    // Tool and Supporter-discard riders are not represented; keep base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'bide') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [{ kind: 'endure', condition: 'heads' }],
    }
  }
  if (name === 'extrasensory') {
    return { damage: { kind: 'handSizeComparisonBonus', baseDamage, bonusDamage: 60, comparison: 'equal' } }
  }
  if (name === 'returning flames') {
    // Fire Energy recovered to hand is approximated with shared Energy gain.
    return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  }
  if (name === 'dwindling wave') {
    return {
      damage: {
        kind: 'subtractCount',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
      },
    }
  }
  if (name === 'lock-on') {
    return {
      ...zero(),
      special: [
        { kind: 'preventRetreat', target: 'opponent' },
        { kind: 'buffDefendingPokemon', damageBonus: 120 },
      ],
    }
  }
  if (name === 'double thread') {
    return {
      ...zero(),
      benchDamage: [{ amount: 30, side: 'opponent', zone: 'play', maxTargets: 2, applyWeaknessResistanceOnBench: true }],
    }
  }
  if (name === 'come along') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, includeNames: ['Nidoran ♀'] }],
    }
  }
  if (name === 'nido press') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 40,
        source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Nidorina'] },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'power lariat') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 30,
        source: { kind: 'pokemonEvolvedOnBench', side: 'own' },
      },
    }
  }
  if (name === 'transfer pain') {
    return {
      ...zero(),
      targetScope: 'any',
      choiceRequirement: 'damageCounterTransfer',
      special: [{ kind: 'transferDamageCounters', maxCounters: 1, sourceZone: 'play' }],
    }
  }
  if (name === 'burst curse') {
    return {
      ...zero(),
      minimumExtraEnergyDiscard: 2,
      choiceRequirement: 'counterDistribution',
      choiceCounterCount: 8,
      energyDiscard: [{ target: 'self', amount: 2 }],
      counterDamage: [{ amountPerCounter: 10, target: 'distributed' }],
    }
  }
  if (name === 'hyperspace punch') {
    return {
      ...zero(),
      benchDamage: [{ amount: 20, side: 'opponent', zone: 'play', maxTargets: 2, ignoreWeaknessResistanceOnBench: true }],
    }
  }
  if (name === 'focus energy') {
    return { ...zero(), special: [{ kind: 'buffAttack', target: 'self', attackName: 'Flop', baseDamage: 50 }] }
  }
  if (name === 'spirited throw') {
    return { damage: { kind: 'attackerRemainingHpLessBonus', baseDamage, bonusDamage: 60 } }
  }
  if (name === 'charge order') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 10,
        source: { kind: 'namedPokemon', side: 'own', zone: 'play', names: ['Pawniard'] },
      },
    }
  }
  if (name === 'retaliate') {
    return { damage: { kind: 'lastTurnKnockoutBonus', baseDamage, bonusDamage: 60 } }
  }
  if (name === 'wild edge') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 50 },
      selfDamage: [{ kind: 'optionalChoice', amount: 20 }],
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'iron tail') {
    return { damage: { kind: 'headsMultiplier', damagePerHeads: 100, coinFlipCount: 0 }, flipUntilTails: true }
  }
  if (name === 'counter head') {
    return { ...zero(), special: [{ kind: 'reflectDamage', damageMultiplier: 1 }] }
  }
  if (name === 'link blast') {
    return { damage: { kind: 'energyEqualityBonus', baseDamage, bonusDamage: 70 } }
  }
  if (name === 'geomancy') {
    // Two Fairy Energy attachments are approximated as shared Energy gain.
    return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  }
  if (name === 'life stream') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 20,
        source: { kind: 'energy', side: 'own' },
      },
    }
  }
  if (name === 'proud fang') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 60,
        source: { kind: 'pokemonWithSubtypesInPlay', side: 'opponent', subtypes: ['BREAK'], zone: 'play' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'revenge blast' || name === 'despair ray' || name === 'raid') {
    // Prize, Bench-discard, and evolution-history bonuses are unavailable;
    // retain the printed base damage where the attack has one.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'dark burn') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 50, source: { kind: 'chosenEnergy' } },
      choiceRequirement: 'energyAmount',
      choiceEnergyType: 'Darkness',
      energyDiscard: [{ target: 'self', amount: 'choice', requiresEnergyType: 'Darkness' }],
    }
  }
  if (name === 'furry chance') {
    return {
      damage: { kind: 'fixed', amount: baseDamage },
      special: [{ kind: 'millCards', target: 'opponent', amount: 1 }],
    }
  }
  if (name === 'sky drop') {
    return {
      damage: {
        kind: 'subtractCount',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'retreatCost', target: 'target' },
      },
    }
  }

  // Effects requiring Prize, Ability, Trainer/Tool, deck-order, delayed, or
  // in-battle evolution state remain filtered when they have no safe fallback.
  return null
}

function inferXyEvolutionsTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'stiffen') {
    return { ...zero(), protection: [{ target: 'self', kind: 'reduce', amount: 40 }] }
  }
  if (name === 'swarming sting') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 40,
        source: { kind: 'namedPokemon', side: 'own', zone: 'play', names: ['Beedrill'] },
      },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'explosive fireball') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 60,
        source: { kind: 'energyOfType', side: 'own', type: 'Fire' },
      },
      energyDiscard: [{ target: 'self', amount: 'all', requiresEnergyType: 'Fire' }],
    }
  }
  if (name === 'dashing punch') {
    // Switching history is not tracked, so keep its printed base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'break star') {
    return {
      ...zero(),
      benchDamage: [{
        amount: 100,
        side: 'opponent',
        zone: 'play',
        subtypeFilter: { include: ['BREAK'] },
        ignoreWeaknessResistanceOnBench: true,
      }],
    }
  }
  if (name === 'energize') {
    // Attaching a named Energy card is approximated with shared Energy gain.
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'spark bolt') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 70 },
      energyDiscard: [{ target: 'self', amount: 'all', optional: true }],
      minimumExtraEnergyDiscard: 1,
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'continuous tumble') {
    return { damage: { kind: 'headsMultiplier', damagePerHeads: 10, coinFlipCount: 0 }, flipUntilTails: true }
  }
  if (name === 'little grudge') {
    return { ...zero(), special: [{ kind: 'discardEnergyOnKnockout' }] }
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
  if (name === 'conversion 3') {
    return { ...zero(), choiceRequirement: 'typeChange', special: [{ kind: 'changeWeakness' }] }
  }

  // Special Energy discard-pile checks remain filtered because that card zone
  // is not represented by the Pokémon-only battle deck and discard.
  return null
}

function inferSunMoonBaseTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'fury cutter') {
    return {
      damage: { kind: 'headsTable', damages: [baseDamage, 30, 70, 120], coinFlipCount: 3 },
      coinFlipCount: 3,
    }
  }
  if (name === 'roof fling') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [{ kind: 'returnTargetToHand', condition: 'heads' }],
    }
  }
  if (name === 'sharp blade quill') {
    return {
      damage: { kind: 'fixed', amount: 20 },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'hollow hunt-gx') {
    return {
      ...zero(),
      choiceRequirement: 'discardPokemonToHand',
      special: [{ kind: 'recoverPokemonFromDiscardToHand', maxCount: 3, upTo: true }],
    }
  }
  if (name === 'grand echo-gx') {
    return { ...zero(), healing: [{ amount: 'all', side: 'own', zone: 'play' }] }
  }
  if (name === 'synthesis' || name === 'shore up') {
    // Energy recovered from the discard is represented by the shared pool.
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'chloroscythe-gx') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 50,
        source: { kind: 'energyOfType', side: 'own', type: 'Grass' },
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
  if (name === 'hustling strike') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'pokemonOfTypesInPlay', side: 'own', types: ['Fire'], zone: 'bench' },
      },
    }
  }
  if (name === 'confusion wave') {
    return {
      ...zero(),
      status: [
        { target: 'self', statuses: ['confused'] },
        { target: 'opponent', statuses: ['confused'] },
      ],
    }
  }
  if (name === 'hydro pump') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'energyOfType', side: 'own', type: 'Water' },
      },
    }
  }
  if (name === 'wake-up slap') {
    return {
      damage: {
        kind: 'statusBonus',
        baseDamage,
        bonusDamage: 80,
        statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'],
      },
      special: [{
        kind: 'clearStatus',
        target: 'opponent',
        statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'],
      }],
    }
  }
  if (name === 'collect') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 3 }] }
  }
  if (name === 'call for family') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 2, basicOnly: true, destination: 'bench' }],
    }
  }
  if (name === 'courier') {
    return {
      ...zero(),
      choiceRequirement: 'ownBench',
      special: [{ kind: 'returnOwnBenchToHand' }],
    }
  }
  if (name === 'bubble beat') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'energyOfType', side: 'own', type: 'Water' },
      },
    }
  }
  if (name === 'continuous tumble') {
    return { damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 0 }, flipUntilTails: true }
  }
  if (name === 'aqua spark') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 60,
        source: { kind: 'energyOfType', side: 'own', type: 'Water' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'discharge') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 30,
        source: { kind: 'energyOfType', side: 'own', type: 'Lightning' },
      },
      energyDiscard: [{ target: 'self', amount: 'all', requiresEnergyType: 'Lightning' }],
    }
  }
  if (name === 'astonish') {
    return { ...zero(), special: [{ kind: 'shuffleRandomHandCardIntoDeck', target: 'opponent' }] }
  }
  if (name === 'surprise strike') {
    // The active-switch history for this turn is not retained; keep base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'psychic boom') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energyOnTarget' } },
    }
  }
  if (name === 'psychic') {
    const bonus = attack.text.match(/does (\d+) more damage times (?:the amount of|the number of) energy attached to your opponent's active pok(?:e|é)mon/i)
    if (!bonus) return null
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: Number.parseInt(bonus[1], 10),
        source: { kind: 'energyOnTarget' },
      },
    }
  }
  if (name === 'divide-gx') {
    return {
      ...zero(),
      choiceRequirement: 'counterDistribution',
      choiceCounterCount: 10,
      counterDamage: [{ amountPerCounter: 10, target: 'distributed' }],
    }
  }
  if (name === 'venoshock') {
    return {
      damage: { kind: 'statusBonus', baseDamage, bonusDamage: 50, statuses: ['poisoned'] },
    }
  }
  if (name === 'dust gathering') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 1 }] }
  }
  if (name === 'lunar fall-gx') {
    return {
      ...zero(),
      targetScope: 'any',
      targetMustHaveSubtype: 'Basic',
      targetMustNotHaveSubtype: 'GX',
      special: [{ kind: 'knockOutTarget' }],
    }
  }
  if (name === 'smack down') {
    return {
      damage: { kind: 'resistanceTypeBonus', baseDamage, bonusDamage: 50, resistanceType: 'Fighting' },
    }
  }
  if (name === 'rock artillery') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 50, source: { kind: 'chosenEnergy' } },
      choiceRequirement: 'energyAmount',
      choiceEnergyType: 'Fighting',
      energyDiscard: [{ target: 'self', amount: 'choice', requiresEnergyType: 'Fighting' }],
    }
  }
  if (name === 'team play') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 30,
        source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Passimian'] },
      },
    }
  }
  if (name === 'evil orders') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{
        kind: 'searchDeckPokemon',
        maxCount: 3,
        maxCountFrom: { kind: 'bench', side: 'own' },
        destination: 'hand',
      }],
    }
  }
  if (name === 'sol burst-gx') {
    // Energy cards are not modeled in deck zones, so grant their shared Energy equivalent.
    return { ...zero(), energyGain: [{ target: 'self', amount: 5 }] }
  }
  if (name === 'taunt') {
    return {
      ...zero(),
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }
  if (name === 'claw rend') {
    return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 30 } }
  }
  if (name === 'aqua impact') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'retreatCost', target: 'target' },
      },
    }
  }
  if (name === 'false accusation') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'handSize', side: 'opponent' },
      },
    }
  }
  if (name === 'fight back') {
    return {
      damage: { kind: 'damageCounterThresholdBonus', baseDamage, bonusDamage: 80, minimumCounters: 1 },
    }
  }
  if (name === 'signs of evolution') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{
        kind: 'searchDeckPokemon',
        maxCount: 3,
        includeNames: ['Dratini', 'Dragonair', 'Dragonite'],
        oneOfEachName: true,
        destination: 'hand',
      }],
    }
  }
  if (name === 'peck bugs') {
    return { damage: { kind: 'targetTypeBonus', baseDamage, bonusDamage: 30, targetType: 'Grass' } }
  }
  if (name === 'devastating wind') {
    return {
      ...zero(),
      special: [{ kind: 'drawCards', target: 'opponent', amount: 3, shuffleHandIntoDeck: true }],
    }
  }
  if (name === 'cross-cut') {
    return { damage: { kind: 'evolvedTargetBonus', baseDamage, bonusDamage: 30 } }
  }
  if (name === 'quick draw') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [{ kind: 'drawCards', target: 'self', amount: 1, condition: 'heads' }],
    }
  }
  if (name === 'work up') {
    return { ...zero(), special: [{ kind: 'buffAttack', target: 'self', attackName: '*', damageBonus: 20 }] }
  }
  if (name === 'gumshoe chance-gx') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 50, source: { kind: 'energyOnTarget' } },
    }
  }
  if (name === 'superpower') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 40 },
      selfDamage: [{ kind: 'optionalChoice', amount: 20 }],
      choiceRequirement: 'optionalBonus',
    }
  }

  // Energy cards in hand/deck, Prize cards, Trainer/Tool cards, and deck order
  // are not modeled. These attacks remain filtered until their card zones exist.
  return null
}

function inferSunMoonGuardiansRisingTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTarget = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
  })

  if (name === 'hollow hunt-gx') {
    return {
      ...zero(),
      choiceRequirement: 'discardPokemonToHand',
      special: [{ kind: 'recoverPokemonFromDiscardToHand', maxCount: 3, upTo: true }],
    }
  }
  if (name === 'hustling strike') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'pokemonOfTypesInPlay', side: 'own', types: ['Fire'], zone: 'bench' },
      },
    }
  }
  if (name === 'bubble beat') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'energyOfType', side: 'own', type: 'Water' },
      },
    }
  }
  if (name === 'grand echo-gx') {
    return { ...zero(), healing: [{ amount: 'all', side: 'own', zone: 'play' }] }
  }
  if (name === 'supernatural dance') {
    return {
      ...zero(),
      choiceRequirement: 'counterDistribution',
      choiceCounterCountFrom: { kind: 'pokemonInDiscard', side: 'opponent', all: true },
      counterDamage: [{ amountPerCounter: 10, target: 'distributed' }],
    }
  }
  if (name === 'petal blizzard' || name === 'hail') {
    return {
      ...zero(),
      benchDamage: [{ amount: name === 'petal blizzard' ? 10 : 20, side: 'opponent', zone: 'play', ignoreWeaknessResistance: true }],
    }
  }
  if (name === 'poltergeist' || name === 'trashalanche') {
    // Trainer and Item cards are absent from the Pokémon-only battle hand/discard.
    return { damage: { kind: 'fixed', amount: 0 } }
  }
  if (name === 'scamper away') {
    return { ...zero(), special: [{ kind: 'returnOwnPokemonToDeck' }] }
  }
  if (name === 'resolute claws') {
    return { damage: { kind: 'pokemonExOrGxTargetBonus', baseDamage, bonusDamage: 70 } }
  }
  if (name === 'passionate dance') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 3, basicOnly: true, includeTypes: ['Fire'] }],
    }
  }
  if (name === 'venoshock') {
    return { damage: { kind: 'statusBonus', baseDamage, bonusDamage: 40, statuses: ['poisoned'] } }
  }
  if (name === 'nitro tank-gx') {
    // Energy cards in the discard are represented by the shared Energy pool.
    return { ...zero(), energyGain: [{ target: 'self', amount: 5 }] }
  }
  if (name === 'beacon' || name === 'algorithm-gx' || name === 'magical ribbon') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: name === 'beacon' ? 2 : 5, destination: 'hand' }],
    }
  }
  if (name === 'ice blade') return anyTarget(50)
  if (name === 'ice path-gx') {
    return { ...zero(), special: [{ kind: 'transferAllDamageCounters' }] }
  }
  if (name === 'roll call') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{
        kind: 'searchDeckPokemon',
        maxCount: 3,
        includeNames: ['Poliwag', 'Poliwhirl', 'Poliwrath'],
        oneOfEachName: true,
      }],
    }
  }
  if (name === 'all the presents') {
    return {
      ...zero(),
      flipUntilTails: true,
      special: [{ kind: 'drawCards', target: 'self', amountPerHead: 1 }],
    }
  }
  if (name === 'raging floe') {
    return { damage: { kind: 'damageCounterThresholdBonus', baseDamage, bonusDamage: 80, minimumCounters: 1 } }
  }
  if (name === 'ice shard') {
    return { damage: { kind: 'targetTypeBonus', baseDamage, bonusDamage: 30, targetType: 'Fighting' } }
  }
  if (name === 'borne ashore') {
    return { ...zero(), choiceRequirement: 'discardPokemon', special: [{ kind: 'reviveDiscardPokemon' }] }
  }
  if (name === 'sharpshooting') return anyTarget(10)
  if (name === 'bail out') {
    return {
      ...zero(),
      choiceRequirement: 'discardPokemonToHand',
      special: [{ kind: 'recoverPokemonFromDiscardToHand' }],
    }
  }
  if (name === 'electromagnetic rock wrecker') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 80, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energyOfType', side: 'own', type: 'Lightning' },
    }
  }
  if (name === 'heavy slam') {
    return { damage: { kind: 'subtractCount', baseDamage, perUnitDamage: 30, source: { kind: 'retreatCost', target: 'target' } } }
  }
  if (name === 'feather dance') {
    return { ...zero(), special: [{ kind: 'buffAttack', target: 'self', attackName: 'Pom-Pom Punch', baseDamage: 100 }] }
  }
  if (name === 'tapu thunder-gx') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 50, source: { kind: 'energy', side: 'opponent' } } }
  }
  if (name === 'facade') {
    return { damage: { kind: 'statusBonus', baseDamage, bonusDamage: 80, statuses: ['burned', 'poisoned'], statusTarget: 'attacker' } }
  }
  if (name === 'stomp off') {
    return { ...zero(), special: [{ kind: 'millCards', target: 'opponent', amount: 1 }] }
  }
  if (name === 'blown kiss') {
    return { ...zero(), targetScope: 'any', counterDamage: [{ amount: 10, target: 'opponent' }] }
  }
  if (name === 'tractorbeam') {
    return {
      damage: { kind: 'fixed', amount: 30 },
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent', beforeDamage: true }],
    }
  }
  if (name === 'link blast') {
    return { damage: { kind: 'energyEqualityBonus', baseDamage, bonusDamage: 80 } }
  }
  if (name === 'filch') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 2 }] }
  }
  if (name === 'energy drive') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'energy', side: 'both' } },
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'tapu cure-gx') {
    // Resolve the two damaged Bench Pokémon automatically; individual Energy/Tool attachments are not stored.
    return { ...zero(), healing: [{ amount: 'all', side: 'own', zone: 'bench', maxTargets: 2 }] }
  }
  if (name === 'shatter shot') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 40, source: { kind: 'energyOfType', side: 'own', type: 'Psychic' } },
    }
  }
  if (name === 'corner') {
    return { ...zero(), special: [{ kind: 'preventRetreat' }] }
  }
  if (name === 'enhanced stomp') {
    // Pokémon Tools aren't present in battle, so use the printed base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'raven\'s claw') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCountersOnSide', side: 'opponent', zone: 'play' },
      },
    }
  }
  if (name === 'limitation') return zero()
  if (name === 'big wheel-gx') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 10, shuffleHandIntoDeck: true }] }
  }
  if (name === 'shining arrow') return anyTarget(50)
  if (name === 'follow me') {
    return { ...zero(), choiceRequirement: 'opponentBench', special: [{ kind: 'switch', target: 'opponent' }] }
  }
  if (name === 'continuous tumble') {
    return { damage: { kind: 'headsMultiplier', damagePerHeads: 10, coinFlipCount: 0 }, flipUntilTails: true }
  }
  if (name === 'bubble') {
    return {
      ...zero(),
      coinFlipCount: 1,
      status: [{ target: 'opponent', statuses: ['paralyzed'], condition: 'heads' }],
    }
  }
  if (name === 'division') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 2, includeNames: ['Sliggoo'] }],
    }
  }
  if (name === 'power whip') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'energy', side: 'own' } },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'amass') {
    // Basic Energy attachment is represented by shared Energy gain.
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'bind wound') {
    return {
      ...zero(),
      coinFlipCount: 1,
      choiceRequirement: 'ownPokemon',
      healing: [{ target: 'selectedOwnPokemon', amount: 30, condition: 'heads' }],
    }
  }
  if (name === 'swallow dive') {
    // The previous-turn Agility history is not tracked; retain base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'dangerous blow') {
    return { damage: { kind: 'targetSubtypeBonus', baseDamage, bonusDamage: 60, subtype: 'Basic' } }
  }
  if (name === 'berserk') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 70,
        source: { kind: 'injuredPokemon', side: 'own', zone: 'bench' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'weather teller') return zero()

  // Prize, Tool, delayed-KO, deck-order and multi-target choice effects remain filtered.
  return null
}

function inferSunMoonBurningShadowsTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTarget = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
  })

  if (name === 'bye-bye heal') {
    return {
      ...zero(),
      healing: [{ amount: 'all', side: 'own', zone: 'play' }],
      special: [{ kind: 'returnOwnPokemonToDeck' }],
    }
  }
  if (name === 'first impression' || name === 'solar heat' || name === 'enhanced fang') {
    // Ignore switch-history and unmodeled Tool/Stadium bonuses; keep printed base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'raging out-gx') {
    return { ...zero(), special: [{ kind: 'millCards', target: 'opponent', amount: 10 }] }
  }
  if (name === 'odor sleuth') {
    return {
      ...zero(),
      coinFlipCount: 2,
      special: [{ kind: 'recoverRandomPokemonFromDiscardToHand', amountPerHead: 1 }],
    }
  }
  if (name === 'sacred fire') return anyTarget(50)
  if (name === 'water arrow') return anyTarget(baseDamage)
  if (name === 'brine') {
    return {
      ...anyTarget(90),
      targetMustBeDamaged: true,
    }
  }
  if (name === 'venting anger') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 50,
        source: { kind: 'namedPokemonInDiscard', side: 'own', names: ['Magikarp'] },
      },
    }
  }
  if (name === 'hydro shot') {
    return {
      ...anyTarget(120),
      minimumExtraEnergyDiscard: 2,
      energyDiscard: [{ target: 'self', amount: 2, requiresEnergyType: 'Water' }],
    }
  }
  if (name === 'tapu storm-gx') {
    return { ...zero(), special: [{ kind: 'shuffleTargetIntoDeck', requiresOpponentBench: true }] }
  }
  if (name === 'aqua shock') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 30,
        source: { kind: 'energyOfType', side: 'opponent', type: 'Water' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'vacuum bolt') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 80 },
      choiceRequirement: 'optionalBonus',
      selfDamage: [{ kind: 'optionalChoice', amount: 80 }],
    }
  }
  if (name === 'drift ashore') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, destination: 'hand' }],
    }
  }
  if (name === 'shadowy knot') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 50, source: { kind: 'retreatCost', target: 'target' } } }
  }
  if (name === 'dark guidance') {
    return { ...zero(), choiceRequirement: 'discardPokemon', special: [{ kind: 'reviveDiscardPokemon', side: 'self' }] }
  }
  if (name === 'night roam') {
    return { ...zero(), counterDamage: [{ amount: 10, side: 'both', zone: 'play' }] }
  }
  if (name === 'poison boost') {
    return {
      damage: { kind: 'statusBonus', baseDamage, bonusDamage: 80, statuses: ['poisoned'], statusTarget: 'attacker' },
      special: [{ kind: 'clearStatus', target: 'self', statuses: ['poisoned'] }],
    }
  }
  if (name === 'venoshock') {
    return { damage: { kind: 'statusBonus', baseDamage, bonusDamage: 40, statuses: ['poisoned'] } }
  }
  if (name === 'perplexing eyes') {
    return { ...zero(), choiceRequirement: 'typeChange', special: [{ kind: 'changeWeakness' }] }
  }
  if (name === 'allure') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 3 }] }
  }
  if (name === 'hand kinesis') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'handSize', side: 'own' } } }
  }
  if (name === 'prismatic burst') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 60, source: { kind: 'energyOfType', side: 'own', type: 'Psychic' } },
      energyDiscard: [{ target: 'self', amount: 'all', requiresEnergyType: 'Psychic' }],
    }
  }
  if (name === 'black ray-gx') {
    return {
      ...zero(),
      benchDamage: [{
        amount: 100,
        side: 'opponent',
        zone: 'play',
        ignoreWeaknessResistance: true,
        subtypeFilter: { include: ['GX', 'EX'] },
      }],
    }
  }
  if (name === 'cross-cut') {
    return { damage: { kind: 'evolvedTargetBonus', baseDamage, bonusDamage: 60 } }
  }
  if (name === 'double draw') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 2 }] }
  }
  if (name === 'dangerous claws') {
    return { damage: { kind: 'targetSubtypeBonus', baseDamage, bonusDamage: 30, subtype: 'Basic' } }
  }
  if (name === 'peerless hundred blows-gx') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 50, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'focus energy') {
    return { ...zero(), special: [{ kind: 'buffAttack', target: 'self', attackName: 'Bite', baseDamage: 60 }] }
  }
  if (name === 'division') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, includeNames: ['Alolan Grimer'] }],
    }
  }
  if (name === 'chemical breath') {
    return {
      damage: {
        kind: 'statusCountBonus',
        baseDamage,
        bonusDamagePerStatus: 70,
        statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'],
      },
    }
  }
  if (name === 'hone claws') {
    return { ...zero(), special: [{ kind: 'buffAttack', target: 'self', attackName: 'Slash', baseDamage: 80 }] }
  }
  if (name === 'dark raid') {
    // Whether the opponent has used a GX attack is not tracked; preserve base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'dead end-gx') {
    return { ...zero(), special: [{ kind: 'knockOutTarget', requiresAnyTargetStatus: true }] }
  }
  if (name === 'infinite force') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 30, source: { kind: 'energy', side: 'both' } } }
  }
  if (name === 'twilight-gx') {
    return { ...zero(), special: [{ kind: 'shuffleDiscardPokemonIntoDeck', maxCount: 10 }] }
  }
  if (name === 'boomburst-gx') {
    return {
      ...zero(),
      benchDamage: [{ amount: 50, side: 'opponent', zone: 'play', ignoreWeaknessResistanceOnBench: true }],
    }
  }
  if (name === 'screech') {
    return { ...zero(), special: [{ kind: 'buffDefendingPokemon', damageBonus: 60 }] }
  }
  if (name === 'see through') {
    return { ...zero(), special: [{ kind: 'revealHand', target: 'opponent' }] }
  }
  if (name === 'baby-doll eyes') {
    return { ...zero(), special: [{ kind: 'preventRetreat' }] }
  }
  if (name === 'mix-up') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [{ kind: 'millCards', target: 'opponent', amount: 3, condition: 'heads' }],
    }
  }
  if (name === 'nature\'s judgment') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 60 },
      choiceRequirement: 'optionalBonus',
      energyDiscard: [{ target: 'self', amount: 'all', optional: true }],
    }
  }

  // Prior-turn history, Prize cards, deck ordering, multi-target picks and delayed knockouts remain filtered.
  return null
}

function inferSunMoonShiningLegendsTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'flippity flap') {
    return {
      ...zero(),
      special: [{ kind: 'drawCards', target: 'self', amount: 6, shuffleHandIntoDeck: true }],
    }
  }
  if (name === 'rally back') {
    return { damage: { kind: 'lastTurnKnockoutBonus', baseDamage, bonusDamage: 90 } }
  }
  if (name === 'gaia blaster') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'energyOfType', side: 'own', type: 'Grass' },
      },
    }
  }
  if (name === 'profane punch') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 80,
        source: { kind: 'injuredPokemon', side: 'own', zone: 'bench' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'shocking sting') {
    return {
      damage: {
        kind: 'statusBonus',
        baseDamage,
        bonusDamage: 50,
        statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'],
      },
    }
  }
  if (name === 'bail out') {
    return {
      ...zero(),
      choiceRequirement: 'discardPokemonToHand',
      special: [{ kind: 'recoverPokemonFromDiscardToHand', includeTypes: ['Water'] }],
    }
  }
  if (name === 'iron tail') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'powerful spark') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'energyOfType', side: 'own', type: 'Lightning' },
      },
    }
  }
  if (name === 'tag team boost') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 50,
        source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Minun'] },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'collect') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 1 }] }
  }
  if (name === 'whiny voice') {
    return {
      ...zero(),
      special: [{ kind: 'shuffleRandomHandCardIntoDeck', target: 'opponent', revealSelected: true }],
    }
  }
  if (name === 'full burst') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 30,
        source: { kind: 'energy', side: 'own' },
      },
    }
  }
  if (name === 'cursed drop') {
    return {
      ...zero(),
      choiceRequirement: 'counterDistribution',
      choiceCounterCount: 3,
      counterDamage: [{ target: 'distributed', amountPerCounter: 10 }],
    }
  }
  if (name === 'call for family') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, basicOnly: true }],
    }
  }
  if (name === 'dangerous head') {
    return { damage: { kind: 'targetSubtypeBonus', baseDamage, bonusDamage: 50, subtype: 'Basic' } }
  }
  if (name === 'trickster-gx') {
    return {
      ...zero(),
      choiceRequirement: 'copyAttack',
      special: [{ kind: 'copyAttack', preserveExtraCosts: false }],
    }
  }
  if (name === 'ultimate arrow') {
    return {
      ...zero(),
      benchDamage: [{
        amount: 30,
        side: 'opponent',
        zone: 'play',
        ignoreWeaknessResistanceOnBench: true,
      }],
    }
  }

  // Dual Pump needs two independently chosen defending targets. Legendary Guidance
  // searches for Energy cards, which are not represented in the Pokémon-only deck.
  return null
}

function inferSunMoonCrimsonInvasionTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'multiply') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 3, includeNames: ['Kakuna'] }],
    }
  }
  if (name === 'sucker punch') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 30,
        source: { kind: 'energyOfType', side: 'own', type: 'Darkness' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'spike rend') {
    return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 60 } }
  }
  if (name === 'hunt') {
    return {
      ...zero(),
      damage: { kind: 'fixed', amount: 40 },
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent', beforeDamage: true }],
    }
  }
  if (name === 'continuous headbutt') {
    const damagePerHeads = attack.name.toLowerCase() === 'continuous headbutt'
      ? Number.parseInt(attack.damage, 10) || (baseDamage === 30 ? 30 : 80)
      : 0
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'draconic disaster') {
    // Stadium cards are not in the battle deck; preserve printed base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'forceful tackle') {
    // The optional self-placed counters are not represented as an attack choice.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'ink spit') {
    return { ...zero(), special: [{ kind: 'attackFailsOnTails' }] }
  }
  if (name === 'special artillery') {
    // Special Energy is not tracked; preserve the printed base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'tlc') {
    return {
      ...zero(),
      targetScope: 'bench',
      targetMustBeDamaged: true,
      special: [{ kind: 'shuffleTargetIntoDeck', targetZone: 'bench' }],
    }
  }
  if (name === 'pika draw') {
    return { ...zero(), special: [{ kind: 'drawCards', target: 'self', amount: 1 }] }
  }
  if (name === 'psychic') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 20,
        source: { kind: 'energy', side: 'opponent' },
      },
    }
  }
  if (name === 'ominous eyes') {
    return {
      ...zero(),
      targetScope: 'any',
      counterDamage: [{ amount: 10, target: 'target' }],
    }
  }
  if (name === 'pain amplifier') {
    return {
      ...zero(),
      counterDamage: [{ amount: 20, side: 'opponent', zone: 'play', onlyDamaged: true }],
    }
  }
  if (name === 'dark arts') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 20,
        source: { kind: 'handSize', side: 'opponent' },
      },
    }
  }
  if (name === 'astonish') {
    return {
      ...zero(),
      special: [{ kind: 'shuffleRandomHandCardIntoDeck', target: 'opponent', revealSelected: true }],
    }
  }
  if (name === 'pumpkin bomb') {
    // Pokémon Tools are not modeled; preserve printed base damage.
    return { damage: { kind: 'fixed', amount: baseDamage } }
  }
  if (name === 'nasty plot') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 2, destination: 'hand' }],
    }
  }
  if (name === 'cross-cut') {
    return { damage: { kind: 'evolvedTargetBonus', baseDamage, bonusDamage: 60 } }
  }
  if (name === 'eat sloppily') {
    // The top five Pokémon are milled; Energy cards and attachment are unmodeled.
    return { ...zero(), special: [{ kind: 'millCards', target: 'self', amount: 5 }] }
  }
  if (name === 'call for family') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 2, basicOnly: true }],
    }
  }
  if (name === 'revenge cannon') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCountersOnSide', side: 'own', zone: 'bench' },
      },
    }
  }
  if (name === 'punishing slap') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 60,
        source: { kind: 'energyOfType', side: 'opponent', type: 'Darkness' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'tropical head') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 20,
        source: { kind: 'energy', side: 'own' },
      },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'noble roar') {
    return {
      ...zero(),
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }
  if (name === 'war cry') {
    return {
      damage: {
        kind: 'countComparisonBonus',
        baseDamage,
        bonusDamage: 90,
        addSource: { kind: 'pokemonInPlay', side: 'opponent' },
        subtractSource: { kind: 'pokemonInPlay', side: 'own' },
      },
    }
  }
  if (name === 'draco melody') {
    return {
      ...zero(),
      coinFlipCount: 1,
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, includeTypes: ['Dragon'], condition: 'heads' }],
    }
  }
  if (name === 'bug search') {
    return { ...zero(), special: [{ kind: 'revealHand', target: 'opponent' }] }
  }

  // Energy-card actions, Evolution, Prize cards, unmodeled Trainer/Tool/Stadium
  // effects, and Amazing Plea's opponent-controlled choice remain filtered.
  return null
}

function inferRisingRivalsTcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTarget = (amount: number): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistanceOnBench: true,
  })

  if (name === 'burn out') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 30 },
      choiceRequirement: 'optionalBonus',
      status: [{ target: 'self', statuses: ['burned'], requiresOptionalChoice: true }],
    }
  }
  if (name === 'power swing') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'pokemonEvolvedOnBench', side: 'own' },
      },
    }
  }
  if (name === 'wake-up slap') {
    return {
      damage: {
        kind: 'statusBonus',
        baseDamage,
        bonusDamage: 20,
        statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'],
      },
      special: [{ kind: 'clearStatus', target: 'opponent', statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'] }],
    }
  }
  if (name === 'combo throw' || name === 'psywave') {
    // Per-Pokemon attached Energy is approximated by the opponent's shared Energy pool.
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'energy', side: 'opponent' },
      },
    }
  }
  if (name === 'trample') {
    return {
      ...zero(),
      coinFlipSource: { kind: 'bench', side: 'both' },
      benchDamage: [{ amount: 30, side: 'both', zone: 'bench', perTargetCoinFlip: true, ignoreWeaknessResistance: true }],
    }
  }
  if (name === 'rend') return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 20 } }
  if (name === 'return blow') return { damage: { kind: 'lastIncomingDamage' }, ignoreWeaknessResistance: true }
  if (name === 'evolving flare') return { damage: { kind: 'fixed', amount: baseDamage } }
  if (name === 'calling wave') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 2, includeNameContains: ['Gastrodon'], treatAsBasic: true, damageCountersOnSearch: 2 }],
    }
  }
  if (name === 'muddy bomb') {
    return {
      ...anyTarget(30),
      benchDamage: [{ amount: 10, side: 'opponent', zone: 'play', excludeTarget: true }],
    }
  }
  if (name === 'raging sea') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'injuredPokemon', side: 'own', zone: 'bench' },
      },
    }
  }
  if (name === 'focus energy' && text.includes("megahorn attack's base damage is 100")) {
    return { ...zero(), special: [{ kind: 'buffAttack', attackName: 'Megahorn', baseDamage: 100 }] }
  }
  if (name === 'save sand') {
    // Energy attached to Hippowdon is represented by its side's shared Energy pool.
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'quick attack' || name === 'needling sting') {
    const bonusDamage = Number.parseInt(text.match(/plus (\d+) more damage/)?.[1] || '0', 10)
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage }, coinFlipCount: 1 }
  }
  if (name === 'magic heal') {
    return {
      ...zero(),
      coinFlipCount: 3,
      healing: [{ side: 'own', zone: 'play', maxTargets: 1, amount: 0, amountPerHead: 10 }],
    }
  }
  if (name === 'ruthless tail') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'bench', side: 'opponent' },
      },
    }
  }
  if (name === 'thunder throw') {
    return {
      ...zero(),
      benchDamage: [{ amount: 10, side: 'opponent', zone: 'bench', maxTargets: 2, ignoreWeaknessResistance: true }],
    }
  }
  if (name === 'repeat lightning') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'injuredPokemon', side: 'opponent', zone: 'bench' },
      },
    }
  }
  if (name === 'evolving aqua') {
    return { ...anyTarget(baseDamage), targetMustBeDamaged: true }
  }
  if (name === 'leaf needle') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
    }
  }
  if (name === 'skill dive') return anyTarget(baseDamage)
  if (name === 'reckless bomb') {
    return {
      ...zero(),
      benchDamage: [{ amount: 20, side: 'opponent', zone: 'play' }],
      selfDamage: [{ kind: 'fixed', amount: 100 }],
    }
  }
  if (name === 'attack and hide') {
    return { ...zero(), targetScope: 'any', counterDamage: [{ amount: 30, target: 'opponent' }] }
  }
  if (name === 'split bomb') {
    return {
      ...zero(),
      benchDamage: [{ amount: 20, side: 'opponent', zone: 'play', maxTargets: 2, ignoreWeaknessResistance: true }],
    }
  }
  if (name === 'ice blade') return anyTarget(baseDamage)
  if (name === 'bite and crush') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 10 }, coinFlipCount: 2 }
  }
  if (name === 'heavy metal') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
    }
  }
  if (name === 'cross-cut') return { damage: { kind: 'evolvedTargetBonus', baseDamage, bonusDamage: 20 } }
  if (name === 'pickup power') {
    // Discard-pile Energy recovery is represented as shared Energy gained per heads.
    return { ...zero(), coinFlipCount: 3, energyGain: [{ target: 'self', amountPerHead: 1 }] }
  }
  if (name === 'mend') {
    // Searching for a Metal Energy is not modeled, so its attachment/healing pair uses shared Energy.
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }], healing: [{ target: 'self', amount: 10 }] }
  }
  if (name === 'blessed fruit') {
    return {
      ...zero(),
      choiceRequirement: 'ownBench',
      healing: [{ target: 'selectedOwnBench', amount: 'all', sameTypeAsAttacker: true }],
    }
  }
  if (name === 'iron head') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 10, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'scary face') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [
        { kind: 'cannotAttack', target: 'opponent', condition: 'heads' },
        { kind: 'preventRetreat', target: 'opponent', condition: 'heads' },
      ],
    }
  }
  if (name === 'shell scatter') {
    return {
      ...zero(),
      benchDamage: [{ amount: 10, side: 'opponent', zone: 'play' }],
      special: [{ kind: 'disableSelfAttack', attackName: 'Shell Scatter' }],
    }
  }
  if (name === 'stoke') return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  if (name === 'endeavor') {
    return { damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 2 }, coinFlipCount: 2 }
  }
  if (name === 'triple smash') {
    return { damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 3 }, coinFlipCount: 3 }
  }
  if (name === 'rest') {
    return {
      ...zero(),
      allowWhileAsleep: true,
      healing: [{ target: 'self', amount: 60 }],
      special: [
        { kind: 'clearStatus', target: 'self', statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'] },
        { kind: 'setStatus', target: 'self', statuses: ['asleep'] },
      ],
    }
  }
  if (name === 'stress poison') {
    return {
      damage: { kind: 'damageCounterThresholdBonus', baseDamage, bonusDamage: 20, minimumCounters: 1 },
      status: [{ target: 'opponent', statuses: ['poisoned'], requiresAttackerDamaged: true }],
    }
  }
  if (name === 'frustration') return { ...anyTarget(baseDamage), targetMustBeUndamaged: true }
  if (name === 'feint attack') {
    return {
      ...anyTarget(baseDamage),
      ignoreWeaknessResistance: true,
      ignoreTargetDamageModifiers: true,
    }
  }
  if (name === 'find ice') return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  if (name === 'ripple') {
    return {
      ...zero(),
      coinFlipCount: 1,
      counterDamage: [{ amount: 10, side: 'opponent', zone: 'play', condition: 'heads' }],
    }
  }
  if (name === 'brine') return { ...anyTarget(baseDamage), targetMustBeDamaged: true }
  if (name === 'toss and turn') {
    return {
      damage: { kind: 'statusBonus', baseDamage, bonusDamage: 30, statuses: ['asleep'], statusTarget: 'attacker' },
      allowWhileAsleep: true,
    }
  }
  if (name === 'heavy press') {
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: 40 },
      coinFlipCount: 1,
      status: [{ target: 'self', statuses: ['asleep'], condition: 'tails' }],
    }
  }
  if (name === 'grind') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'energy cyclone') {
    // Chosen shared Energy stands in for Energy cards selected from the hand and returned to the deck.
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'chosenEnergy' } },
      choiceRequirement: 'energyAmount',
      energyDiscard: [{ target: 'self', amount: 'choice' }],
    }
  }
  if (name === 'extreme attack') {
    return { ...anyTarget(150), targetMustHaveSubtype: 'Level-Up' }
  }
  if (name === 'aimed cut') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'target' },
      },
    }
  }
  if (name === 'darkness magic') {
    return {
      ...zero(),
      counterDamage: [{ amountPerUnit: 10, source: { kind: 'handSize', side: 'own', max: 8 }, target: 'opponent' }],
    }
  }
  if (name === 'grudge') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'pokemonInDiscard', side: 'own' },
      },
    }
  }
  if (name === 'spin storm') {
    return {
      ...zero(),
      coinFlipCount: 1,
      choiceRequirement: 'optionalOpponentBench',
      special: [{ kind: 'switch', target: 'opponent', condition: 'heads', optional: true }],
    }
  }
  if (name === 'hail') {
    return { ...zero(), benchDamage: [{ amount: 10, side: 'opponent', zone: 'play' }] }
  }
  if (name === 'crushing ice') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'retreatCost', target: 'target' },
      },
    }
  }
  if (name === 'warm up') return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  if (name === 'cleanse away') {
    return { ...zero(), healing: [{ amount: 30, side: 'own', zone: 'bench' }] }
  }

  // Prize, hand/deck, discard-pile card movement, and in-turn evolution checks remain filtered.
  return null
}

function inferPlatinumTcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  baseDamage: number,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })
  const anyTargetDamage = (amount: number, ignoreWeaknessResistance = false): TcgBattleAttackEffect => ({
    damage: { kind: 'fixed', amount },
    targetScope: 'any',
    ignoreWeaknessResistance,
    ignoreWeaknessResistanceOnBench: true,
  })
  const searchBasicPokemon = (maxCount: number, filter?: { includeNames?: string[]; includeSubtypes?: string[] }): TcgBattleAttackEffect => ({
    ...zero(),
    choiceRequirement: 'deckPokemon',
    special: [{ kind: 'searchDeckPokemon', maxCount, basicOnly: true, ...filter }],
  })

  if (name === 'aqua press') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'both' } } }
  }
  if (name === 'double launcher') {
    return {
      ...zero(),
      targetScope: 'bench',
      energyDiscard: [{ target: 'self', amount: 2 }],
      minimumExtraEnergyDiscard: 2,
      benchDamage: [{ amount: 60, side: 'opponent', zone: 'bench', maxTargets: 2 }],
      special: [{ kind: 'disableSelfAttack', attackName: 'Double Launcher' }],
    }
  }
  if (name === 'power heal') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'attacker' } },
      healing: [{ target: 'self', amount: 20 }],
    }
  }
  if (name === 'second strike') {
    return { damage: { kind: 'damageCounterThresholdBonus', baseDamage, bonusDamage: 20, minimumCounters: 2 } }
  }
  if (name === 'energy burst') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'both' } } }
  }
  if (name === 'over slash') {
    return { ...zero(), benchDamage: [{ amount: 10, side: 'opponent', zone: 'play' }] }
  }
  if (name === 'power wave') {
    // Pokémon Powers are not represented in the custom battle roster, so no targets qualify.
    return zero()
  }
  if (name === 'damage aid') {
    return {
      damage: {
        kind: 'statusBonus',
        baseDamage,
        bonusDamage: 50,
        statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'],
      },
      special: [{ kind: 'clearStatus', target: 'opponent', statuses: ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused'] }],
    }
  }
  if (name === 'growth' || name === 'minor errand-running') {
    // A basic Energy card from the hand/deck is represented as one shared Energy.
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'call for family' && text.includes('pokemon sp')) {
    return searchBasicPokemon(2, { includeSubtypes: ['SP'] })
  }
  if (name === 'team attack') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'pokemonWithSubtypesInPlay', side: 'own', subtypes: ['SP'], zone: 'play' },
      },
    }
  }
  if (name === 'perish song') {
    return {
      damage: { kind: 'knockOutIf', status: 'asleep', attackedWith: 'damage or Midnight Eyes' },
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'loneliness') {
    return { damage: { kind: 'emptyHandBonus', baseDamage, bonusDamage: 30 } }
  }
  if (name === 'colorful powder') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 40,
        source: { kind: 'energy', side: 'own' },
        minimumUnits: 4,
      },
      status: [
        { target: 'opponent', statuses: ['poisoned'], requiresEnergy: { side: 'own', minimum: 0, maximum: 2 } },
        { target: 'opponent', statuses: ['burned', 'poisoned'], requiresEnergy: { side: 'own', minimum: 3, maximum: 3 } },
        { target: 'opponent', statuses: ['asleep', 'burned', 'poisoned'], requiresEnergy: { side: 'own', minimum: 4 } },
      ],
    }
  }
  if (name === 'jet smash') {
    return {
      ...anyTargetDamage(70),
      special: [{ kind: 'disableSelfAttack', attackName: 'Jet Smash' }],
    }
  }
  if (name === 'water slide') {
    // Energy remains in the shared pool, so moving it between Pokémon has no separate state change.
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 20 },
      choiceRequirement: 'optionalBonus',
    }
  }
  if (name === 'wriggle') {
    return {
      ...zero(),
      coinFlipSource: { kind: 'pokemonInPlay', side: 'opponent' },
      benchDamage: [{ amount: 30, side: 'opponent', zone: 'play', perTargetCoinFlip: true }],
    }
  }
  if (name === 'dwindling wave') {
    return { damage: { kind: 'subtractCount', baseDamage, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'attacker' } } }
  }
  if (name === 'rushing flames') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 80, coinFlipCount: 0 },
      coinFlipSource: { kind: 'chosenEnergy' },
      energyDiscard: [{ target: 'self', amount: 'choice' }],
      choiceRequirement: 'energyAmount',
    }
  }
  if (name === 'revenge melody') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 20,
        source: { kind: 'namedPokemonInDiscard', side: 'own', names: ['Kricketot', 'Kricketune'] },
      },
    }
  }
  if (name === 'bug buzz') {
    return {
      damage: { kind: 'statusBonus', baseDamage, bonusDamage: 30, statuses: ['asleep'] },
      special: [{ kind: 'clearStatus', target: 'opponent', statuses: ['asleep'] }],
    }
  }
  if (name === 'harrumph') return anyTargetDamage(40)
  if (name === 'flame bash') {
    return { ...zero(), flipUntilTails: true, energyGain: [{ target: 'self', amountPerHead: 1 }] }
  }
  if (name === 'energy blow' || name === 'green blast') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'deep poison') {
    return { damage: { kind: 'statusBonus', baseDamage, bonusDamage: 40, statuses: ['poisoned'] } }
  }
  if (name === 'spike wound') {
    return { ...anyTargetDamage(50), targetMustBeDamaged: true }
  }
  if (name === 'stretch vine') {
    return { ...zero(), benchDamage: [{ amount: 10, side: 'opponent', zone: 'bench', maxTargets: 2 }] }
  }
  if (name === 'firebreathing' || name === 'rock smash' || name === 'trip over' || name === 'steady punch' || name === 'jump on') {
    const bonusDamage = Number.parseInt(text.match(/plus (\d+) more damage/)?.[1] || '0', 10)
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage }, coinFlipCount: 1 }
  }
  if (name === 'dark slash') {
    return {
      damage: { kind: 'optionalChoiceBonus', baseDamage, bonusDamage: 20 },
      choiceRequirement: 'optionalBonus',
      energyDiscard: [{ target: 'self', amount: 1, optional: true }],
    }
  }
  if (name === 'collude') return null
  if (name === 'desperate attack') {
    return { damage: { kind: 'energyComparisonBonus', baseDamage, bonusDamage: 30 } }
  }
  if (name === 'strange sludge') {
    return {
      damage: { kind: 'statusBonus', baseDamage, bonusDamage: 20, statuses: ['poisoned'], statusTarget: 'attacker' },
      status: [{ target: 'opponent', statuses: ['confused'], requiresAttackerStatus: 'poisoned' }],
    }
  }
  if (name === 'stealth rock') return anyTargetDamage(30)
  if (name === 'shed skin') return { ...zero(), healing: [{ target: 'self', amount: 40 }] }
  if (name === 'endure') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [{ kind: 'endure', condition: 'heads' }],
    }
  }
  if (name === 'fight back') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 20,
        source: { kind: 'damageCounters', target: 'attacker' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'invite and strike') {
    return {
      damage: { kind: 'fixed', amount: 20 },
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent', beforeDamage: true }],
    }
  }
  if (name === 'sneaky attack') {
    return {
      damage: {
        kind: 'countThresholdBonus',
        baseDamage,
        bonusDamage: 10,
        source: { kind: 'energy', side: 'own' },
        minimumUnits: 1,
      },
    }
  }
  if (name === 'shoot needle') {
    return {
      ...zero(),
      coinFlipCount: 2,
      benchDamage: [{ amount: 10, side: 'opponent', zone: 'play', maxTargets: 2, perTargetCoinFlip: true }],
    }
  }
  if (name === 'call for family') return searchBasicPokemon(1)
  if (name === 'spring out') {
    return { damage: { kind: 'fixed', amount: 10 }, targetScope: 'bench', ignoreWeaknessResistance: true }
  }
  if (name === 'roar' || name === 'pull') {
    return {
      ...zero(),
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent' }],
    }
  }
  if (name === 'division') {
    return {
      ...zero(),
      choiceRequirement: 'deckPokemon',
      special: [{ kind: 'searchDeckPokemon', maxCount: 1, includeNames: ['Grimer'], basicOnly: true }],
    }
  }
  if (name === 'hospitality') {
    return {
      ...zero(),
      choiceRequirement: 'opponentBench',
      healing: [{ target: 'opponent', amount: 20 }],
      special: [{ kind: 'switch', target: 'opponent', beforeDamage: true }],
    }
  }
  if (name === 'target attack') {
    return {
      damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 20 },
      targetScope: 'any',
      ignoreWeaknessResistanceOnBench: true,
    }
  }
  if (name === 'grind') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } } }
  }
  if (name === 'stretch tongue') return anyTargetDamage(10, true)
  if (name === 'synthesis') {
    return { ...zero(), coinFlipCount: 1, energyGain: [{ target: 'self', amount: 1, condition: 'heads' }] }
  }
  if (name === 'poor sleep') {
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: 30 },
      coinFlipCount: 1,
      status: [{ target: 'self', statuses: ['asleep'], condition: 'heads' }],
    }
  }
  if (name === 'heal bell') return { ...zero(), healing: [{ amount: 10, side: 'own', zone: 'play' }] }
  if (name === 'slack off') {
    return {
      ...zero(),
      healing: [{ target: 'self', amount: 'all' }],
      special: [{ kind: 'cannotAttack', target: 'self' }],
    }
  }
  if (name === 'show off' || name === 'find wildfire') {
    // Basic Energy card search is represented as a shared Energy gain.
    return { ...zero(), energyGain: [{ target: 'self', amount: name === 'find wildfire' ? 2 : 1 }] }
  }
  if (name === 'focus energy') {
    return { ...zero(), special: [{ kind: 'buffAttack', attackName: 'Fire Shard', baseDamage: 80 }] }
  }
  if (name === 'darkness lost') {
    return { ...zero(), benchDamage: [{ amount: 30, side: 'opponent', zone: 'play' }] }
  }
  if (name === 'hydro shot') {
    return {
      ...anyTargetDamage(80),
      energyDiscard: [{ target: 'self', amount: 2 }],
      minimumExtraEnergyDiscard: 2,
    }
  }
  if (name === 'thunderpunch') {
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: 10 },
      coinFlipCount: 1,
      selfDamage: [{ kind: 'fixed', amount: 10, condition: 'tails' }],
    }
  }
  if (name === 'roost') {
    return {
      ...zero(),
      healing: [{ target: 'self', amount: 40 }],
      special: [{ kind: 'preventRetreat', target: 'self' }],
    }
  }
  if (name === 'howl') return searchBasicPokemon(1, { includeNames: ['Poochyena'] })
  if (name === 'seed flare') {
    // Energy stays in the shared pool; chosen shared Energy represents Grass Energy attached this way.
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'chosenEnergy' } },
      choiceRequirement: 'energyAmount',
    }
  }

  // Deck/hand manipulation, card returns, evolution, attached-Energy movement,
  // Trainer/Tool checks, and delayed knockout effects remain outside this format.
  return null
}

function inferECardTcgBattleAttackEffect(
  attack: TcgCardAttack,
  _text: string,
  baseDamage: number,
  setId?: string,
): TcgBattleAttackEffect | null {
  if (!['ecard1', 'ecard2', 'ecard3'].includes(setId || '')) return null

  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (setId === 'ecard1') {
  if (name === 'poison reaction') {
    return { damage: { kind: 'statusBonus', baseDamage, bonusDamage: 20, statuses: ['poisoned'] } }
  }
  if (name === 'energy catch') {
    return { ...zero(), coinFlipCount: 1, energyGain: [{ target: 'self', amount: 1, condition: 'heads' }] }
  }
  if (name === 'super psywave') {
    return {
      ...zero(),
      targetScope: 'any',
      counterDamage: [{ amountPerUnit: 10, source: { kind: 'energy', side: 'opponent' }, target: 'opponent' }],
    }
  }
  if (name === 'doubleslap') {
    return { damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 2 }, coinFlipCount: 2 }
  }
  if (name === 'iron fist') {
    return {
      damage: {
        kind: 'conditionalCount',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'injuredPokemon', side: 'own', zone: 'play' },
        condition: 'heads',
        failureDamage: baseDamage,
      },
      coinFlipCount: 1,
    }
  }
  if (name === 'mislead') {
    return {
      ...zero(),
      coinFlipCount: 2,
      status: [{ target: 'opponent', statuses: ['confused'], condition: { result: 'heads', minimum: 1 } }],
    }
  }
  if (name === 'ethereal flame') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'unusedEnergy' } },
      energyDiscard: [{ target: 'self', amount: 'all' }],
    }
  }
  if (name === 'sharp beak') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 30 }, coinFlipCount: 1 }
  }
  if (name === 'water punch') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 10, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
    }
  }
  if (name === 'steel beak') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 10 }, coinFlipCount: 1 }
  }
  if (name === 'double claw') {
    return { damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 2 }, coinFlipCount: 2 }
  }
  if (name === 'quick attack') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 20 }, coinFlipCount: 1 }
  }
  if (name === 'dogpile') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'bench', side: 'own' } },
      selfDamage: [{ kind: 'count', perUnitDamage: 10, source: { kind: 'bench', side: 'own' } }],
    }
  }
  if (name === 'spiral wave') {
    return { damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 0 }, flipUntilTails: true }
  }
  if (name === 'energy draw') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'energy recall') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  }
  if (name === 'thrash') {
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: 10 },
      coinFlipCount: 1,
      selfDamage: [{ kind: 'fixed', amount: 10, condition: 'tails' }],
    }
  }
  }

  if (setId === 'ecard2') {
    if (name === 'fire blow') {
      return {
        damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 30, coinFlipCount: 0 },
        coinFlipSource: { kind: 'chosenEnergy' },
        energyDiscard: [{ target: 'self', amount: 'choice' }],
        choiceRequirement: 'energyAmount',
      }
    }
    if (name === 'damage blast') {
      return {
        damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 10, coinFlipCount: 0 },
        coinFlipSource: { kind: 'damageCounters', target: 'target' },
      }
    }
    if (name === 'super eggsplosion') {
      return {
        damage: { kind: 'headsMultiplier', damagePerHeads: 40, coinFlipCount: 0 },
        coinFlipSource: { kind: 'chosenEnergy' },
        energyDiscard: [{ target: 'self', amount: 'choice' }],
        choiceRequirement: 'energyAmount',
      }
    }
    if (name === 'called shot') {
      return {
        damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } },
        targetScope: 'bench',
        ignoreWeaknessResistance: true,
      }
    }
    if (name === 'lateral eggsplosion') {
      return {
        damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 10, coinFlipCount: 0 },
        coinFlipSource: { kind: 'energy', side: 'own' },
      }
    }
    if (name === 'cotton punch') {
      return { damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 2 }, coinFlipCount: 2 }
    }
    if (name === 'conduction') {
      return {
        damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 40, coinFlipCount: 0 },
        coinFlipSource: { kind: 'unusedEnergy' },
        energyDiscard: [{ target: 'self', amount: 'all' }],
      }
    }
    if (name === 'electric tackle') {
      return {
        damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'own' } },
        coinFlipCount: 1,
        selfDamage: [{ kind: 'count', perUnitDamage: 10, source: { kind: 'energy', side: 'own' }, condition: 'tails' }],
      }
    }
    if (name === 'giant horn') {
      return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 30 }, coinFlipCount: 1 }
    }
    if (name === 'roasting heat') {
      return { damage: { kind: 'statusBonus', baseDamage, bonusDamage: 20, statuses: ['burned'] } }
    }
    if (name === 'gallop') {
      return {
        damage: { kind: 'headsBonus', baseDamage, bonusDamage: 20 },
        coinFlipCount: 1,
        energyDiscard: [{ target: 'self', amount: 1, condition: 'heads' }],
      }
    }
    if (name === 'heavy metal') {
      return {
        damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 0 },
        coinFlipSource: { kind: 'energy', side: 'own' },
      }
    }
    if (name === 'iron smash') {
      return {
        damage: { kind: 'headsTable', damages: [0, baseDamage, baseDamage + 20], coinFlipCount: 2 },
        coinFlipCount: 2,
      }
    }
    if (name === 'copy') {
      return { ...zero(), choiceRequirement: 'copyAttack', special: [{ kind: 'copyAttack', preserveExtraCosts: true }] }
    }
    if (name === 'energy draw' || name === 'charge') {
      return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
    }
    if (name === 'growth') {
      return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
    }
    if (name === 'attract' || name === 'roar') {
      return {
        ...zero(),
        choiceRequirement: 'optionalOpponentBench',
        special: [{ kind: 'switch', target: 'opponent' }],
      }
    }
    if (name === 'triple bone') {
      return {
        damage: { kind: 'headsMultiplier', damagePerHeads: 10, coinFlipCount: 3 },
        coinFlipCount: 3,
        targetScope: 'bench',
        ignoreWeaknessResistance: true,
      }
    }
    if (name === 'bone rush') {
      return { damage: { kind: 'headsMultiplier', damagePerHeads: 50, coinFlipCount: 0 }, flipUntilTails: true }
    }
    if (name === 'cross-cut') {
      return { damage: { kind: 'evolvedTargetBonus', baseDamage, bonusDamage: 20 } }
    }
    if (name === 'water bullet') {
      return {
        damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 10, coinFlipCount: 0 },
        coinFlipSource: { kind: 'energy', side: 'own' },
      }
    }
    if (name === 'energy kiss') {
      return {
        damage: { kind: 'headsMultiplier', damagePerHeads: 10, coinFlipCount: 0 },
        coinFlipSource: { kind: 'energy', side: 'opponent' },
      }
    }
    if (name === 'deep dive') {
      return { ...zero(), coinFlipCount: 3, healing: [{ target: 'self', amount: 0, amountPerHead: 10 }] }
    }
    if (name === 'energy support') {
      return {
        ...zero(),
        coinFlipCount: 1,
        energyGain: [{ target: 'self', amount: 1, condition: 'heads' }],
      }
    }
    if (name === 'firebreathing' || name === 'knock away' || name === 'rising lunge') {
      return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 10 }, coinFlipCount: 1 }
    }
    if (name === 'thrash') {
      return {
        damage: { kind: 'headsBonus', baseDamage, bonusDamage: 10 },
        coinFlipCount: 1,
        selfDamage: [{ kind: 'fixed', amount: 10, condition: 'tails' }],
      }
    }
    if (name === 'stretch tail') {
      return {
        damage: { kind: 'zeroOnTails', amount: 10 },
        coinFlipCount: 1,
        targetScope: 'bench',
        ignoreWeaknessResistance: true,
      }
    }
    if (name === 'sharp leaf') {
      return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 10 }, coinFlipCount: 1 }
    }
    if (name === 'charge up') {
      return { ...zero(), coinFlipCount: 1, energyGain: [{ target: 'self', amount: 1, condition: 'heads' }] }
    }
    if (name === 'growth spurt') {
      return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
    }
    if (name === 'continuous eggsplosion') {
      return { damage: { kind: 'headsMultiplier', damagePerHeads: 10, coinFlipCount: 0 }, flipUntilTails: true }
    }
    if (name === 'long tongue') {
      return { damage: { kind: 'fixed', amount: 10 }, targetScope: 'any', ignoreWeaknessResistance: true }
    }
    if (name === 'magnetic bomb') {
      return {
        damage: { kind: 'headsBonus', baseDamage, bonusDamage: 10 },
        coinFlipCount: 1,
        selfDamage: [{ kind: 'fixed', amount: 10, condition: 'tails' }],
      }
    }
    if (name === 'continuous tumble') {
      return { damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 0 }, flipUntilTails: true }
    }
    if (name === 'onix crush' || name === 'crush') {
      return {
        damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 0 },
        coinFlipSource: { kind: 'energy', side: 'own' },
      }
    }
    if (name === 'feint attack') {
      return {
        damage: { kind: 'fixed', amount: 20 },
        targetScope: 'any',
        ignoreWeaknessResistance: true,
        ignoreTargetDamageModifiers: true,
      }
    }
    if (name === 'splatter') {
      return { damage: { kind: 'fixed', amount: 10 }, targetScope: 'any', ignoreWeaknessResistance: true }
    }
    if (name === 'mountain eater') {
      return { ...zero(), healing: [{ target: 'self', amount: 10 }] }
    }
    if (name === 'super speed' || name === 'float') {
      return { ...zero(), coinFlipCount: 1, protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }] }
    }
    if (name === 'teary eyes') {
      return { ...zero(), protection: [{ target: 'self', kind: 'reduce', amount: 20 }] }
    }
  }

  if (setId === 'ecard3') {
    if (name === 'rising lunge') {
      return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 20 }, coinFlipCount: 1 }
    }
    if (name === 'continuous tumble') {
      return { damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 0 }, flipUntilTails: true }
    }
    if (name === 'haunt') {
      return { ...zero(), counterDamage: [{ amount: 10, target: 'opponent' }] }
    }
    if (name === 'needle rush') {
      return { damage: { kind: 'headsTable', damages: [baseDamage, baseDamage + 10, baseDamage + 20, baseDamage + 50, baseDamage + 90], coinFlipCount: 4 }, coinFlipCount: 4 }
    }
    if (name === 'ambush' || name === 'frog hop' || name === 'stomp' || name === 'trip over' || name === 'sharp claws') {
      const bonusDamage = name === 'trip over' ? 30 : name === 'sharp claws' ? 30 : name === 'ambush' ? 20 : name === 'stomp' ? 20 : 20
      return { damage: { kind: 'headsBonus', baseDamage, bonusDamage }, coinFlipCount: 1 }
    }
    if (name === 'lonely fang' || name === 'magnetic wave') {
      return {
        damage: {
          kind: 'comparativeCount',
          baseDamage,
          perUnitDamage: name === 'lonely fang' ? 20 : 10,
          addSource: { kind: 'bench', side: name === 'lonely fang' ? 'opponent' : 'own' },
          subtractSource: { kind: 'bench', side: name === 'lonely fang' ? 'own' : 'opponent' },
        },
      }
    }
    if (name === 'double claw') {
      return { damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 2 }, coinFlipCount: 2 }
    }
    if (name === 'spiral punch') {
      return { damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 0 }, flipUntilTails: true }
    }
    if (name === 'lightning sphere') {
      return {
        damage: { kind: 'conditionalCount', baseDamage, perUnitDamage: 20, source: { kind: 'unusedEnergy' }, condition: 'heads', failureDamage: baseDamage },
        coinFlipCount: 1,
        energyDiscard: [{ target: 'self', amount: 'all', condition: 'heads' }],
      }
    }
    if (name === 'energy burst') {
      return {
        damage: { kind: 'conditionalCount', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'both' }, condition: 'heads' },
        coinFlipCount: 1,
      }
    }
    if (name === 'focus energy') {
      return { ...zero(), special: [{ kind: 'buffAttack', target: 'self', attackName: 'Mega Punch', baseDamage: 80 }] }
    }
    if (name === 'gift of spite') {
      return {
        ...zero(),
        counterDamage: [{ amountPerUnit: 10, source: { kind: 'injuredPokemon', side: 'own', zone: 'play' }, target: 'opponent' }],
      }
    }
    if (name === 'triple smash') {
      return { damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 10, coinFlipCount: 3 }, coinFlipCount: 3 }
    }
    if (name === 'continuous charge') {
      return {
        damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 4 },
        coinFlipCount: 4,
        selfDamage: [{ kind: 'perHead', amount: 10 }],
      }
    }
    if (name === 'return attack') {
      return {
        damage: {
          kind: 'conditionalCount',
          baseDamage: 0,
          perUnitDamage: 10,
          source: { kind: 'damageCounters', target: 'attacker' },
          condition: { result: 'heads', minimum: 1 },
        },
        coinFlipCount: 2,
      }
    }
    if (name === 'copy') {
      return { ...zero(), choiceRequirement: 'copyAttack', special: [{ kind: 'copyAttack', preserveExtraCosts: true }] }
    }
    if (name === 'whirlwind' || name === 'magnetic pull') {
      return {
        ...zero(),
        choiceRequirement: 'optionalOpponentBench',
        special: [{ kind: 'switch', target: 'opponent' }],
      }
    }
    if (name === 'leek rush' || name === 'continuous bite') {
      return name === 'leek rush'
        ? { damage: { kind: 'headsMultiplier', damagePerHeads: 10, coinFlipCount: 0 }, flipUntilTails: true }
        : { damage: { kind: 'headsTable', damages: [baseDamage, baseDamage + 10, baseDamage + 30, baseDamage + 60], coinFlipCount: 3 }, coinFlipCount: 3 }
    }
    if (name === 'strength in numbers') {
      return {
        damage: {
          kind: 'count',
          baseDamage,
          perUnitDamage: 10,
          source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Zubat', 'Golbat', 'Crobat'] },
        },
      }
    }
    if (name === 'retaliate') {
      return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'attacker' } } }
    }
    if (name === 'nap') {
      return { ...zero(), healing: [{ target: 'self', amount: 10 }] }
    }
    if (name === 'evil eye') {
      return { ...zero(), targetScope: 'any', counterDamage: [{ amount: 10, target: 'opponent' }] }
    }
    if (name === 'blindside') {
      return { damage: { kind: 'fixed', amount: 20 }, targetScope: 'any', targetMustBeDamaged: true, ignoreWeaknessResistance: true }
    }
    if (name === 'max voltage') {
      return {
        damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'unusedEnergy' } },
        energyDiscard: [{ target: 'self', amount: 'all' }],
      }
    }
    if (name === 'scary face') {
      return {
        ...zero(),
        coinFlipCount: 1,
        special: [
          { kind: 'cannotAttack', target: 'opponent', condition: 'heads' },
          { kind: 'preventRetreat', condition: 'heads' },
        ],
      }
    }
    if (name === 'energy healing') {
      return {
        ...zero(),
        healing: [{ target: 'self', amount: 0, amountPerUnit: 20, source: { kind: 'energy', side: 'own' } }],
      }
    }
    if (name === 'energy plant') {
      return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
    }
    if (name === 'rend') {
      return { damage: { kind: 'damagedTargetBonus', baseDamage, bonusDamage: 20 } }
    }
    if (name === 'healing dust') {
      return {
        ...zero(),
        coinFlipCount: 2,
        healing: [{ amount: 0, amountPerHead: 10, side: 'own', zone: 'play' }],
      }
    }
    if (name === 'empathic healing') {
      return {
        ...zero(),
        healing: [{ amount: 20, side: 'both', zone: 'play', sameTypeAsAttacker: true }],
      }
    }
    if (name === 'teary eyes') {
      return { ...zero(), protection: [{ target: 'self', kind: 'reduce', amount: 20 }] }
    }
    if (name === 'quick attack') {
      return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 20 }, coinFlipCount: 1 }
    }
  }

  return null
}

function inferNeoTcgBattleAttackEffect(
  attack: TcgCardAttack,
  _text: string,
  _damage: string,
  baseDamage: number,
  setId?: string,
): TcgBattleAttackEffect | null {
  if (!['neo1', 'neo2', 'neo3', 'neo4'].includes(setId || '')) return null

  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'flower dance' && setId === 'neo1') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 30,
        source: { kind: 'namedPokemon', side: 'own', zone: 'play', names: ['Bellossom'] },
      },
    }
  }
  if (name === 'sweet nectar' && setId === 'neo1') {
    return {
      ...zero(),
      coinFlipCount: 1,
      healing: [{ amount: 'all', side: 'own', zone: 'play', maxTargets: 1, condition: 'heads' }],
    }
  }
  if (name === 'chomp' && setId === 'neo1') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 10, coinFlipCount: 0 },
      coinFlipSource: { kind: 'damageCounters', target: 'attacker' },
    }
  }
  if (name === 'super metronome' && setId === 'neo1') {
    return {
      ...zero(),
      coinFlipCount: 1,
      choiceRequirement: 'copyAttack',
      special: [{ kind: 'copyAttack', coinGate: 'heads', preserveExtraCosts: false }],
    }
  }
  if (name === 'flame burst' && setId === 'neo1') {
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: 20 },
      coinFlipCount: 1,
      selfDamage: [{ kind: 'fixed', amount: 20, condition: 'heads' }],
    }
  }
  if (name === 'mean look' && setId === 'neo1') {
    return { ...zero(), special: [{ kind: 'preventRetreat', untilSourceLeaves: true }] }
  }
  if (name === 'feint attack' && setId === 'neo1') {
    return {
      damage: { kind: 'fixed', amount: 20 },
      targetScope: 'any',
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'feint attack' && setId === 'neo2') {
    // The source's attack text is missing from the local card data. Neo's
    // Umbreon card uses the same 20-damage, any-target effect as the Neo card.
    return {
      damage: { kind: 'fixed', amount: 20 },
      targetScope: 'any',
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'beat up' && setId === 'neo1') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 0 },
      coinFlipSource: { kind: 'pokemonInPlay', side: 'own' },
    }
  }
  if (name === 'spider web' && setId === 'neo1') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [{ kind: 'preventRetreat', condition: 'heads', untilTargetLeaves: true }],
    }
  }
  if (name === 'sweet scent' && setId === 'neo1') {
    return {
      ...zero(),
      coinFlipCount: 1,
      healing: [
        { amount: 20, side: 'own', zone: 'play', maxTargets: 1, condition: 'heads' },
        { amount: 20, side: 'opponent', zone: 'play', maxTargets: 1, condition: 'tails' },
      ],
    }
  }
  if (name === 'discharge' && setId === 'neo1') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
      energyDiscard: [{ target: 'self', amount: 'all' }],
    }
  }
  if (name === 'screech' && setId === 'neo1') {
    return { ...zero(), special: [{ kind: 'buffDefendingPokemon', damageBonus: 20 }] }
  }
  if (name === 'sticky nectar' && setId === 'neo1') {
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: 10 },
      coinFlipCount: 1,
      special: [
        { kind: 'preventRetreat', condition: 'heads', sourceLeavesClears: true },
        { kind: 'preventSwitch', condition: 'heads', sourceLeavesClears: true },
      ],
    }
  }
  if (name === 'raging charge' && setId === 'neo1') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
      },
      selfDamage: [{ kind: 'fixed', amount: 20 }],
    }
  }
  if (name === 'milk drink' && setId === 'neo1') {
    return {
      ...zero(),
      coinFlipCount: 2,
      healing: [
        { target: 'self', amount: 20, condition: { result: 'heads', minimum: 1 } },
        { target: 'self', amount: 20, condition: { result: 'heads', minimum: 2 } },
      ],
    }
  }
  if (name === 'endure' && setId === 'neo1') {
    return { ...zero(), coinFlipCount: 1, special: [{ kind: 'endure', condition: 'heads' }] }
  }
  if (name === 'fin slap' && setId === 'neo1') {
    return { damage: { kind: 'lastHitBonus', baseDamage, bonusDamage: 10 } }
  }
  if (name === 'comet punch' && setId === 'neo1') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 10, coinFlipCount: 4 },
      coinFlipCount: 4,
    }
  }
  if ((name === 'hide' && setId === 'neo1') || (name === 'detect' && setId === 'neo2')) {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
    }
  }
  if (name === 'roar' && setId === 'neo1') {
    return {
      ...zero(),
      coinFlipCount: 1,
      choiceRequirement: 'optionalOpponentBench',
      special: [{ kind: 'switch', target: 'opponent', condition: 'heads' }],
    }
  }
  if (name === 'scary face' && setId === 'neo1') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [
        { kind: 'cannotAttack', target: 'opponent', condition: 'heads' },
        { kind: 'preventRetreat', condition: 'heads' },
      ],
    }
  }
  if (name === 'growth' && setId === 'neo1') {
    return { ...zero(), coinFlipCount: 1, energyGain: [{ target: 'self', amount: 2, condition: 'heads' }] }
  }
  if (name === 'static electricity' && setId === 'neo1') {
    return {
      ...zero(),
      energyGain: [{
        target: 'self',
        amountPerUnit: 1,
        source: { kind: 'namedPokemon', side: 'own', zone: 'play', names: ['Mareep'] },
      }],
    }
  }
  if (name === 'hydrocutter' && setId === 'neo2') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 40, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own', max: 3 },
    }
  }
  if (name === 'false swipe' && setId === 'neo2') {
    return { damage: { kind: 'remainingHpHalfRoundedDown' } }
  }
  if (name === 'double claw' && setId === 'neo2') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 2 },
      coinFlipCount: 2,
    }
  }
  if (name === 'counter' && setId === 'neo2') {
    return {
      ...zero(),
      special: [{ kind: 'reflectDamage', coinGate: 'heads' }],
    }
  }
  if (name === 'shockwave' && setId === 'neo2') {
    return {
      ...zero(),
      coinFlipCount: 1,
      choiceRequirement: 'optionalOpponentBench',
      counterDamage: [{ amount: 10, side: 'opponent', zone: 'play', condition: 'heads' }],
      special: [{ kind: 'switch', target: 'opponent', condition: 'heads' }],
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'hyper reverse' && setId === 'neo2') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'opponent' } },
      healing: [{ target: 'self', amountFrom: 'damageDealt' }],
    }
  }
  if (name === 'hatch' && setId === 'neo2') {
    return {
      ...zero(),
      coinFlipCount: 1,
      healing: [{ target: 'self', amount: 'all', condition: 'heads' }],
    }
  }
  if (name === 'spike barrage' && setId === 'neo2') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
    }
  }
  if (name === 'belly drum' && setId === 'neo2') {
    return {
      ...zero(),
      selfDamage: [{ kind: 'fixed', amount: 30 }],
      energyGain: [{ target: 'self', amount: 2, requiresSourceSurvival: true }],
    }
  }
  if (name === 'dust devil' && setId === 'neo2') {
    return {
      ...zero(),
      counterDamage: [{ amount: 10, side: 'both', zone: 'play', typeFilter: { exclude: ['Fighting'] } }],
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'fury cutter' && setId === 'neo2') {
    return {
      damage: { kind: 'headsTable', damages: [10, 20, 30, 50, 90], coinFlipCount: 4 },
      coinFlipCount: 4,
    }
  }
  if (name === 'work together' && setId === 'neo2') {
    return {
      damage: {
        kind: 'conditionalCount',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Omanyte', 'Omastar', 'Kabuto', 'Kabutops'] },
        condition: 'heads',
        failureDamage: baseDamage,
      },
      coinFlipCount: 1,
    }
  }
  if (name === 'nap time' && setId === 'neo2') {
    return {
      ...zero(),
      healing: [{ target: 'self', amount: 'all' }],
      status: [{ target: 'self', statuses: ['asleep'] }],
    }
  }
  if (name === 'slime' && setId === 'neo2') {
    return {
      ...zero(),
      protection: [{ target: 'self', kind: 'coinPreventDamage', preventOn: 'tails' }],
    }
  }

  if (name === 'stoke' && setId === 'neo3') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'sacred fire' && setId === 'neo3') {
    return {
      ...zero(),
      coinFlipCount: 1,
      damage: { kind: 'conditionalBonus', baseDamage: 0, bonusDamage: 40, condition: 'heads' },
      targetScope: 'any',
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'black fang' && setId === 'neo3') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 10, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
    }
  }
  if (name === 'perish song' && setId === 'neo3') {
    return { damage: { kind: 'knockOutIf', status: 'asleep', attackedWith: 'Night Eyes' }, ignoreWeaknessResistance: true }
  }
  if (name === 'quick attack' && setId === 'neo3') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 20 }, coinFlipCount: 1 }
  }
  if (name === 'crystal wave' && setId === 'neo3') {
    return {
      damage: { kind: 'conditionalBonus', baseDamage, bonusDamage: 10, condition: 'heads' },
      coinFlipCount: 1,
      choiceRequirement: 'optionalOpponentBench',
      special: [{ kind: 'switch', target: 'opponent', condition: 'tails' }],
    }
  }
  if (name === 'screech' && setId === 'neo3') {
    return { ...zero(), special: [{ kind: 'buffDefendingPokemon', damageBonus: 20 }] }
  }
  if (name === 'lava flow' && setId === 'neo3') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'chosenEnergy' } },
      energyDiscard: [{ target: 'self', amount: 'choice' }],
      choiceRequirement: 'energyAmount',
    }
  }
  if (name === 'nap' && setId === 'neo3') {
    return { ...zero(), healing: [{ target: 'self', amount: 30 }] }
  }
  if (name === 'rising lunge' && setId === 'neo3' || name === 'positive ion' && setId === 'neo3') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 10 }, coinFlipCount: 1 }
  }
  if (name === 'horn swipe' && setId === 'neo3') {
    return {
      damage: { kind: 'conditionalBonus', baseDamage, bonusDamage: 40, condition: { result: 'heads', minimum: 2 } },
      coinFlipCount: 2,
    }
  }
  if (name === 'terrorize' && setId === 'neo3') {
    return { ...zero(), choiceRequirement: 'disableAttack', special: [{ kind: 'disableAttack', targetBasicOnly: true }] }
  }
  if (name === 'flock attack' && setId === 'neo3') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 10, coinFlipCount: 0 },
      coinFlipSource: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Murkrow'] },
    }
  }
  if (name === 'needle storm' && setId === 'neo3') {
    return { damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 0 }, flipUntilTails: true }
  }
  if (name === 'sharpshooting' && setId === 'neo3') {
    return {
      damage: { kind: 'zeroOnTails', amount: 20 },
      coinFlipCount: 1,
      targetScope: 'any',
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'raging headbutt' && setId === 'neo3') {
    return {
      damage: {
        kind: 'conditionalCount',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
        condition: 'heads',
        failureDamage: baseDamage,
      },
      coinFlipCount: 1,
    }
  }
  if (name === 'outrage' && setId === 'neo3') {
    return {
      damage: {
        kind: 'conditionalCount',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
        condition: 'heads',
      },
      coinFlipCount: 1,
    }
  }
  if (name === 'dark drain' && setId === 'neo4') {
    return {
      ...zero(),
      coinFlipSource: { kind: 'pokemonInPlay', side: 'opponent' },
      counterDamage: [{ amount: 10, side: 'opponent', zone: 'play', perTargetCoinFlip: true }],
      healing: [{ target: 'self', amountFrom: 'counterDamageDealt' }],
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'tusk toss' && setId === 'neo4') {
    return {
      ...zero(),
      coinFlipCount: 1,
      choiceRequirement: 'optionalOpponentBench',
      special: [{ kind: 'switch', target: 'opponent', condition: 'tails' }],
    }
  }
  if (name === 'dark fire' && setId === 'neo4') {
    return {
      damage: {
        kind: 'conditionalCount',
        baseDamage,
        perUnitDamage: 30,
        source: { kind: 'unusedEnergy' },
        minUnits: 1,
        maxUnits: 1,
        failureDamage: baseDamage,
      },
      energyDiscard: [{ target: 'self', amount: 1 }],
    }
  }
  if (name === 'rushing flames' && setId === 'neo4') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 40, coinFlipCount: 0 },
      coinFlipSource: { kind: 'chosenEnergy' },
      energyDiscard: [{ target: 'self', amount: 'choice' }],
      choiceRequirement: 'energyAmount',
    }
  }
  if (name === 'mountain smasher' && setId === 'neo4') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
    }
  }
  if (name === 'battle frenzy' && setId === 'neo4') {
    return {
      ...zero(),
      coinFlipSource: { kind: 'pokemonInPlay', side: 'both' },
      counterDamage: [{ amount: 20, side: 'both', zone: 'play', perTargetCoinFlip: true }],
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'healing light' && setId === 'neo4') {
    return { ...zero(), healing: [{ amount: 10, side: 'own', zone: 'play' }] }
  }
  if (name === 'flash touch' && setId === 'neo4') {
    return {
      ...zero(),
      choiceRequirement: 'ownBench',
      special: [
        { kind: 'switch', target: 'self' },
        { kind: 'preventStatus', target: 'self', statuses: ['asleep', 'confused', 'paralyzed', 'poisoned'], whileActive: true },
      ],
    }
  }
  if (name === 'max burst' && setId === 'neo4') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'opponent' },
    }
  }
  if (name === 'armor up' && setId === 'neo4') {
    return { ...zero(), coinFlipCount: 1, special: [{ kind: 'endure', condition: 'heads' }] }
  }
  if (name === 'water cannon' && setId === 'neo4') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'own', max: 3 } },
      targetScope: 'any',
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'explosive evolution' && setId === 'neo4') {
    return {
      ...zero(),
      coinFlipCount: 1,
      counterDamage: [{ amount: 10, side: 'opponent', zone: 'play', condition: 'heads' }],
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'slap awake' && setId === 'neo4') {
    return {
      damage: { kind: 'statusBonus', baseDamage, bonusDamage: 20, statuses: ['asleep', 'confused'] },
      special: [{ kind: 'clearStatus', target: 'opponent', statuses: ['asleep', 'confused'] }],
    }
  }
  if (name === 'charging horn' && setId === 'neo4') {
    return { damage: { kind: 'headsBonus', baseDamage, bonusDamage: 30 }, coinFlipCount: 1 }
  }
  if (name === 'burning flame' && setId === 'neo4') {
    return {
      damage: { kind: 'headsBonusEachIfEnergyAvailable', baseDamage, bonusDamage: 20, coinFlipCount: 2 },
      coinFlipCount: 2,
      energyDiscard: [{ target: 'self', amount: 'heads' }],
      requiresEnergyDiscardToMatchHeads: true,
    }
  }
  if (name === 'dodge' && setId === 'neo4') {
    return { ...zero(), protection: [{ target: 'self', kind: 'coinPreventDamage', preventOn: 'heads' }] }
  }
  if (name === 'corner' && setId === 'neo4') {
    return { ...zero(), special: [{ kind: 'preventRetreat' }] }
  }
  if (name === 'warm up' && setId === 'neo4') {
    return {
      ...zero(),
      choiceRequirement: 'ownBench',
      energyGain: [{ target: 'self', amountPerUnit: 1, maxAmount: 1, source: { kind: 'bench', side: 'own' } }],
    }
  }
  if (name === 'pulse guard' && setId === 'neo4') {
    return { ...zero(), protection: [{ target: 'self', kind: 'preventAtLeast', amount: 30 }] }
  }
  if (name === 'guiding flame' && setId === 'neo4') {
    return {
      ...zero(),
      choiceRequirement: 'discardPokemon',
      special: [{ kind: 'reviveDiscardPokemon', side: 'self' }],
    }
  }
  if (name === 'splash about' && setId === 'neo4') {
    return { damage: { kind: 'energyComparisonBonus', baseDamage, bonusDamage: 20 } }
  }
  if (name === 'charm' && setId === 'neo4') {
    return { ...zero(), special: [{ kind: 'buffAttack', target: 'opponent', attackName: '*', damageBonus: -10 }] }
  }
  if (name === 'shed' && setId === 'neo4') {
    return { ...zero(), healing: [{ target: 'self', amount: 10 }] }
  }
  if (name === 'wash away' && setId === 'neo4') {
    return {
      ...zero(),
      coinFlipCount: 1,
      choiceRequirement: 'optionalOwnBench',
      healing: [{ target: 'selectedOwnBench', amount: 'all', condition: 'heads' }],
    }
  }
  if (name === 'reflected sunlight' && setId === 'neo4') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  }
  if (name === 'sunbathe' && setId === 'neo4') {
    return {
      ...zero(),
      coinFlipCount: 1,
      healing: [{ target: 'self', amount: 'all', condition: 'heads' }],
    }
  }
  if (name === 'reflect shield' && setId === 'neo4') {
    return {
      ...zero(),
      protection: [{ target: 'self', kind: 'coinPreventDamage', preventOn: 'heads', reflectDamage: 20 }],
    }
  }
  if (name === 'psyburst' && setId === 'neo4') {
    return {
      damage: { kind: 'gatedCount', baseDamage, perUnitDamage: 10, source: { kind: 'energy', side: 'opponent' }, gateSource: { kind: 'unusedEnergy' }, minimumGateUnits: 1 },
      energyDiscard: [{ target: 'self', amount: 1 }],
    }
  }
  if (name === 'healing water' && setId === 'neo4') {
    return {
      ...zero(),
      choiceRequirement: 'ownBench',
      healing: [{
        target: 'selectedOwnBench',
        amount: 0,
        amountPerUnit: 10,
        source: { kind: 'energy', side: 'own' },
      }],
    }
  }

  return null
}

export interface TcgBattleAttackResolution {
  targetDamage: number
  targetDamageBeforeModifiers: number
  incomingReflectedDamage?: number
  selfDamage: number
  selfKnockOut: boolean
  benchDamage?: {
    targetSide: TcgBattleSide
    targetId: string
    damage: number
  }[]
  counterDamage?: {
    targetSide: TcgBattleSide
    targetId: string
    damage: number
  }[]
  healing?: {
    targetSide: TcgBattleSide
    targetId: string
    amount: number
  }[]
  protection?: {
    targetSide: TcgBattleSide
    targetId: string
    modifier: TcgBattleIncomingAttackModifier
  }[]
  energyDiscards?: TcgBattleEnergyDiscardResolution[]
  energyGains?: { target: 'self' | 'opponent'; amount: number; requiresSourceSurvival?: boolean }[]
  statusConditions?: TcgBattleStatusResolution[]
  specialEffects?: TcgBattleSpecialRule[]
  copiedAttackName?: string
  coinFlips?: {
    results: TcgBattleCoinResult[]
    heads: number
    tails: number
  }
}

export interface TcgBattleStatusAttackCheck {
  canAttack: boolean
  blockedStatus?: Extract<TcgBattleStatusCondition, 'asleep' | 'paralyzed' | 'confused'>
  clearedStatus?: Extract<TcgBattleStatusCondition, 'asleep' | 'paralyzed' | 'confused'>
  selfDamage: number
  coinFlips?: {
    results: TcgBattleCoinResult[]
    heads: number
    tails: number
  }
}

export function resolveTcgBattleAttack(params: {
  state: TcgBattleState
  sideKey: TcgBattleSide
  attacker: TcgBattleCardState
  attack: TcgBattleAttack
  target: TcgBattleCardState
  paidAttackCost?: number
  choice?: TcgBattleAttackChoice
  random?: () => number
}): TcgBattleAttackResolution {
  const { state, sideKey, attacker, attack, target, paidAttackCost, choice, random = Math.random } = params
  const effect = getTcgBattleAttackEffect(attack)
  if (!effect) {
    return {
      targetDamage: 0,
      targetDamageBeforeModifiers: 0,
      selfDamage: 0,
      selfKnockOut: false,
    }
  }

  const optionalCoinDisabled = effect.damage.kind === 'optionalCoinDamage' &&
    choice?.kind === 'optionalBonus' && !choice.enabled
  const dynamicCoinCount = effect.coinFlipSource
    ? getTcgBattleCount(effect.coinFlipSource, {
        state,
        sideKey,
        attacker,
        target,
        paidAttackCost,
        coinMode: 'actual',
      })
    : optionalCoinDisabled
      ? 0
      : effect.coinFlipCount || 0
  const coinFlips = effect.flipUntilTails
    ? rollTcgBattleCoinsUntilTails(random)
    : dynamicCoinCount > 0
      ? rollTcgBattleCoins(dynamicCoinCount, random)
      : undefined

  const copyRule = effect.special?.find((rule) => rule.kind === 'copyAttack')
  if (
    copyRule &&
    doesTcgBattleConditionPass(copyRule.coinGate, coinFlips) &&
    choice?.kind === 'copiedAttack'
  ) {
    const copiedAttack = target.attacks[choice.attackIndex]
    const copiedEffect = copiedAttack && getTcgBattleAttackEffect(copiedAttack)
    if (copiedAttack && copiedEffect && !copiedEffect.special?.some((rule) => rule.kind === 'copyAttack')) {
      const copiedResolution = resolveTcgBattleAttack({
        state,
        sideKey,
        attacker,
        attack: copiedAttack,
        target,
        paidAttackCost: 0,
        choice: choice.followUp,
        random,
      })
      return {
        ...copiedResolution,
        coinFlips: coinFlips || copiedResolution.coinFlips,
        energyDiscards: copyRule.preserveExtraCosts
          ? copiedResolution.energyDiscards
          : copiedResolution.energyDiscards?.filter((discard) => discard.target !== 'self'),
        copiedAttackName: copiedAttack.name,
      }
    }
  }
  let targetDamageBeforeModifiers = calculateTcgBattleRawDamage(effect.damage, {
    state,
    sideKey,
    attacker,
    target,
    paidAttackCost,
    coinFlips,
    choice,
    coinMode: 'actual',
  })
  targetDamageBeforeModifiers = applyTcgBattleTemporaryAttackBoost(attacker, attack, targetDamageBeforeModifiers)
  const targetDamageAfterType = applyTcgWeaknessAndResistance(attacker, target, targetDamageBeforeModifiers, {
    ignoreWeakness: effect.ignoreWeakness,
    ignoreResistance: effect.ignoreResistance,
  })
  const opponentKey = sideKey === 'player' ? 'opponent' : 'player'
  const targetIsBenched = state[opponentKey].back.some((card) => card.instanceId === target.instanceId)
  const ignoresTargetTypeModifiers = effect.ignoreWeaknessResistance ||
    (effect.ignoreWeaknessResistanceOnBench && targetIsBenched)
  const typedDamageBase = ignoresTargetTypeModifiers ? targetDamageBeforeModifiers : targetDamageAfterType
  const damageTakenBuff = effect.ignoreTargetDamageModifiers
    ? undefined
    : target.temporaryEffects?.attackDamageTakenBuff
  const typedDamage = typedDamageBase > 0 && damageTakenBuff?.sourceSide === sideKey
    ? typedDamageBase + damageTakenBuff.damageBonus
    : typedDamageBase
  const incomingCoinFlips = !effect.ignoreTargetDamageModifiers &&
    target.incomingAttackModifier?.kind === 'coinPreventDamage' && typedDamage > 0
    ? rollTcgBattleCoins(1, random)
    : undefined
  let targetDamage = effect.ignoreTargetDamageModifiers
    ? Math.max(0, typedDamage)
    : incomingCoinFlips && target.incomingAttackModifier?.kind === 'coinPreventDamage'
    ? incomingCoinFlips.results[0] === target.incomingAttackModifier.preventOn
      ? 0
      : applyTcgBattleIncomingAttackModifier(target, typedDamage, attacker.instanceId)
    : applyTcgBattleIncomingAttackModifier(target, typedDamage, attacker.instanceId)
  const incomingReflectedDamage = !effect.ignoreTargetDamageModifiers &&
    target.incomingAttackModifier?.kind === 'coinPreventDamage' &&
    incomingCoinFlips?.results[0] === target.incomingAttackModifier.preventOn
    ? target.incomingAttackModifier.reflectDamage || 0
    : 0
  const selfDamage = (effect.selfDamage || []).reduce(
    (sum, rule) =>
      doesTcgBattleConditionPass('condition' in rule ? rule.condition : undefined, coinFlips)
        ? sum + calculateTcgBattleSelfDamage(rule, {
            state,
            sideKey,
            attacker,
            target,
            paidAttackCost,
            coinFlips,
            choice,
          })
        : sum,
    0,
  )
  const attackBuff = attacker.temporaryEffects?.nextAttackBuff
  const attackBuffMatches = attackBuff && (
    attackBuff.attackName === '*' ||
    attackBuff.attackName.toLowerCase() === attack.name.toLowerCase() ||
    attackBuff.attackNames?.some((name) => name.toLowerCase() === attack.name.toLowerCase())
  )
  const boostedSelfDamage = attackBuffMatches
    ? Math.round(selfDamage * (attackBuff.selfDamageMultiplier || 1))
    : selfDamage
  let energyDiscards = calculateTcgBattleEnergyDiscards(effect.energyDiscard || [], {
    state,
    sideKey,
    attack,
    target,
    paidAttackCost,
    coinFlips,
    choice,
  })
  if (
    effect.requiresEnergyDiscardToMatchHeads &&
    (energyDiscards.find((discard) => discard.target === 'self')?.amount || 0) < (coinFlips?.heads || 0)
  ) {
    targetDamage = 0
    energyDiscards = []
  }
  const statusConditions = calculateTcgBattleStatusConditions(effect.status || [], coinFlips, choice, attacker, target, state, sideKey)
  const benchDamage = calculateTcgBattleBenchDamage(effect.benchDamage || [], state, sideKey, attacker, target, random, coinFlips)
  const counterDamage = calculateTcgBattleCounterDamage(
    effect.counterDamage || [],
    state,
    sideKey,
    attacker,
    target,
    random,
    coinFlips,
    paidAttackCost,
    choice,
  )
  const healing = calculateTcgBattleHealing(
    effect.healing || [],
    state,
    sideKey,
    attacker,
    target,
    random,
    targetDamage,
    counterDamage.reduce((sum, hit) => sum + hit.damage, 0),
    coinFlips,
    paidAttackCost,
    choice,
  )
  const protection = calculateTcgBattleProtection(effect.protection || [], sideKey, attacker, target, coinFlips)

  return {
    targetDamage,
    targetDamageBeforeModifiers,
    incomingReflectedDamage: incomingReflectedDamage || undefined,
    selfDamage: boostedSelfDamage,
    selfKnockOut: Boolean(effect.selfKnockOut),
    benchDamage: benchDamage.length > 0 ? benchDamage : undefined,
    counterDamage: counterDamage.length > 0 ? counterDamage : undefined,
    healing: healing.length > 0 ? healing : undefined,
    energyGains: effect.energyGain
      ?.filter((gain) => doesTcgBattleConditionPass(gain.condition, coinFlips))
      .map((gain) => ({
        target: gain.target,
        amount: Math.min(
          gain.maxAmount ?? Number.POSITIVE_INFINITY,
          (gain.amount || 0) +
            (gain.amountPerHead || 0) * (coinFlips?.heads || 0) +
            (gain.amountPerUnit || 0) * (gain.source
              ? getTcgBattleCount(gain.source, { state, sideKey, attacker, target, paidAttackCost, coinMode: 'actual', choice })
              : 0),
        ),
        requiresSourceSurvival: gain.requiresSourceSurvival,
      })),
    protection: protection.length > 0 ? protection : undefined,
    energyDiscards: energyDiscards.length > 0 ? energyDiscards : undefined,
    statusConditions: statusConditions.length > 0 ? statusConditions : undefined,
    specialEffects: (effect.special || []).filter((rule) => {
      if (rule.kind === 'copyAttack') return false
      return doesTcgBattleConditionPass('condition' in rule ? rule.condition : undefined, coinFlips)
    }),
    coinFlips: combineTcgBattleCoinFlips(coinFlips, incomingCoinFlips),
  }
}

function combineTcgBattleCoinFlips(
  first?: TcgBattleAttackResolution['coinFlips'],
  second?: TcgBattleAttackResolution['coinFlips'],
): TcgBattleAttackResolution['coinFlips'] {
  if (!first) return second
  if (!second) return first
  const results = [...first.results, ...second.results]
  return { results, heads: first.heads + second.heads, tails: first.tails + second.tails }
}

function applyTcgBattleTemporaryAttackBoost(
  attacker: TcgBattleCardState,
  attack: TcgBattleAttack,
  damage: number,
): number {
  let boostedDamage = damage
  const name = attack.name.toLowerCase()
  const override = attacker.temporaryEffects?.attackBaseDamageOverrides?.find(
    (entry) => entry.attackName.toLowerCase() === name,
  )
  if (override) boostedDamage = Math.max(boostedDamage, override.baseDamage)

  const buff = attacker.temporaryEffects?.nextAttackBuff
  if (
    buff && (
      buff.attackName === '*' ||
      buff.attackName.toLowerCase() === name ||
      buff.attackNames?.some((attackName) => attackName.toLowerCase() === name)
    )
  ) {
    if (typeof buff.baseDamage === 'number') boostedDamage = Math.max(boostedDamage, buff.baseDamage)
    if (typeof buff.damageBonus === 'number') boostedDamage += buff.damageBonus
    if (buff.damageMultiplier && buff.damageMultiplier > 1) {
      boostedDamage = Math.round((boostedDamage * buff.damageMultiplier) / 10) * 10
    }
  }
  return Math.max(0, boostedDamage)
}

export function applyTcgBattleEnergyDiscards(
  state: TcgBattleState,
  sideKey: TcgBattleSide,
  energyDiscards: TcgBattleEnergyDiscardResolution[] | undefined,
) {
  if (!energyDiscards || energyDiscards.length === 0) return

  for (const discard of energyDiscards) {
    const targetSideKey = discard.target === 'self' ? sideKey : sideKey === 'player' ? 'opponent' : 'player'
    state[targetSideKey].energy = Math.max(0, state[targetSideKey].energy - discard.amount)
  }
}

export function applyTcgBattleStatusConditions(
  state: TcgBattleState,
  sideKey: TcgBattleSide,
  sourceId: string,
  attackTargetId: string,
  statusConditions: TcgBattleStatusResolution[] | undefined,
) {
  if (!statusConditions || statusConditions.length === 0) return []

  const applied: NonNullable<TcgBattleState['lastStatusEvents']> = []
  for (const statusCondition of statusConditions) {
    const targetSideKey = statusCondition.target === 'self' ? sideKey : sideKey === 'player' ? 'opponent' : 'player'
    const targetId = statusCondition.target === 'self' ? sourceId : attackTargetId
    const target = state[targetSideKey].front.find((card) => card.instanceId === targetId && card.currentHp > 0)
    if (!target) continue

    const statuses = applyTcgBattleCardStatuses(target, statusCondition.statuses)
    if (statuses.length === 0) continue

    applied.push({
      id: '',
      sourceId,
      targetId: target.instanceId,
      targetSide: targetSideKey,
      statuses,
    })
  }

  return applied
}

export function clearTcgBattleControlStatus(
  card: TcgBattleCardState,
  status: Extract<TcgBattleStatusCondition, 'asleep' | 'paralyzed' | 'confused'>,
) {
  card.statusConditions = (card.statusConditions || []).filter((condition) => condition !== status)
  if (card.statusConditions.length === 0) card.statusConditions = undefined
}

export function clearTcgBattleStatuses(card: TcgBattleCardState) {
  card.statusConditions = undefined
}

export function applyTcgBattleIncomingAttackModifier(
  card: TcgBattleCardState,
  damage: number,
  attackerId?: string,
): number {
  const modifier = card.incomingAttackModifier
  if (!modifier || damage <= 0) return Math.max(0, damage)
  if (modifier.kind === 'preventAll') return 0
  if (modifier.kind === 'preventAllEffects') return 0
  if (modifier.kind === 'preventAtMost') return damage <= modifier.amount ? 0 : damage
  if (modifier.kind === 'preventAtLeast') return damage >= modifier.amount ? 0 : damage
  if (modifier.kind === 'halve') return Math.floor(damage / 20) * 10
  if (modifier.kind === 'coinPreventDamage') return Math.max(0, damage)
  if (modifier.kind === 'reduce') {
    if (modifier.attackerId && modifier.attackerId !== attackerId) return Math.max(0, damage)
    return Math.max(0, damage - Math.max(0, modifier.amount))
  }
  return Math.max(0, damage)
}

export function tickTcgBattleIncomingAttackModifiers(state: TcgBattleState, sideKey: TcgBattleSide) {
  for (const card of [...state[sideKey].front, ...state[sideKey].back]) {
    const modifier = card.incomingAttackModifier
    if (modifier) {
      if (!('persistent' in modifier && modifier.persistent)) {
        modifier.remainingOpponentTurns -= 1
        if (modifier.remainingOpponentTurns <= 0) {
          card.incomingAttackModifier = undefined
        }
      }
    }

    const effects = card.temporaryEffects
    if (!effects) continue
    for (const key of ['disabledAttack', 'cannotAttack', 'cannotRetreat', 'cannotSwitch', 'endure', 'preventStatusConditions', 'cannotTarget', 'nextAttackBuff', 'destinyBond', 'discardEnergyOnKnockout', 'reflectDamage'] as const) {
      const effect = effects[key]
      if (!effect) continue
      if (key === 'cannotRetreat' && (effects.cannotRetreat?.untilSourceLeaves || effects.cannotRetreat?.untilTargetLeaves)) continue
      if (key === 'preventStatusConditions' && effects.preventStatusConditions?.whileActive) continue
      effect.remainingTurns -= 1
      if (effect.remainingTurns <= 0) delete effects[key]
    }
  }
}

export function resolveTcgBattleStatusAttackCheck(
  attacker: TcgBattleCardState,
  random: () => number = Math.random,
  allowWhileAsleep = false,
): TcgBattleStatusAttackCheck {
  const status = getBlockingTcgBattleStatus(attacker, allowWhileAsleep)
  if (!status) return { canAttack: true, selfDamage: 0 }

  const coinFlips = rollTcgBattleCoins(1, random)
  if (coinFlips.heads > 0) {
    return {
      canAttack: true,
      clearedStatus: status,
      selfDamage: 0,
      coinFlips,
    }
  }

  return {
    canAttack: false,
    blockedStatus: status,
    selfDamage: status === 'confused' ? 10 : 0,
    coinFlips,
  }
}

export function calculateTcgBattleDamage(
  attacker: TcgBattleCardState,
  attack: TcgBattleAttack,
  target: TcgBattleCardState,
  state?: TcgBattleState,
  sideKey?: TcgBattleSide,
): number {
  const effect = getTcgBattleAttackEffect(attack)
  if (!effect) return 0
  const projectedChoice = effect.choiceRequirement === 'optionalBonus' && state && sideKey
    ? chooseTcgBattleAttackChoice({
        state,
        sideKey,
        attacker,
        attack,
        target,
        paidAttackCost: getEffectiveTcgBattleAttackCost(state, attack),
      })
    : undefined

  const dynamicCount = effect.coinFlipSource
    ? getTcgBattleCount(effect.coinFlipSource, {
        state,
        sideKey,
        attacker,
        target,
        paidAttackCost: attack.convertedEnergyCost ?? attack.cost?.length ?? 0,
        choice: projectedChoice,
        coinMode: 'max',
      })
    : 0
  const projectedCoinCount = effect.flipUntilTails
    ? 1
    : Math.max(0, effect.coinFlipSource ? dynamicCount : effect.coinFlipCount || 0)
  const useTails = effect.damage.kind === 'tailsMultiplier' || effect.damage.kind === 'tailsBonus'
  const projectedCoins = projectedCoinCount > 0
    ? {
        results: Array.from({ length: projectedCoinCount }, () => (useTails ? 'tails' : 'heads') as TcgBattleCoinResult),
        heads: useTails ? 0 : projectedCoinCount,
        tails: useTails ? projectedCoinCount : 0,
      }
    : undefined

  let damage = calculateTcgBattleRawDamage(effect.damage, {
    state,
    sideKey,
    attacker,
    target,
    paidAttackCost: attack.convertedEnergyCost ?? attack.cost?.length ?? 0,
    choice: projectedChoice,
    coinFlips: projectedCoins,
    coinMode: 'max',
  })
  damage = applyTcgBattleTemporaryAttackBoost(attacker, attack, damage)
  const targetIsBenched = state && sideKey
    ? state[sideKey === 'player' ? 'opponent' : 'player'].back.some((card) => card.instanceId === target.instanceId)
    : false
  return effect.ignoreWeaknessResistance || (effect.ignoreWeaknessResistanceOnBench && targetIsBenched)
    ? damage
    : applyTcgWeaknessAndResistance(attacker, target, damage, {
        ignoreWeakness: effect.ignoreWeakness,
        ignoreResistance: effect.ignoreResistance,
      })
}

export function getTcgBattleWinner(state: TcgBattleState): TcgBattleSide | 'tie' | null {
  const playerLiving = getLivingTcgBattleCards(state.player).length
  const opponentLiving = getLivingTcgBattleCards(state.opponent).length
  if (playerLiving === 0 && opponentLiving === 0) return 'tie'
  if (playerLiving === 0) return 'opponent'
  if (opponentLiving === 0) return 'player'
  return null
}

export function getTcgBattleTiebreakWinner(state: TcgBattleState): TcgBattleSide | 'tie' {
  const playerHp = getLivingTcgBattleCards(state.player).reduce((sum, card) => sum + card.currentHp, 0)
  const opponentHp = getLivingTcgBattleCards(state.opponent).reduce((sum, card) => sum + card.currentHp, 0)
  if (playerHp > opponentHp) return 'player'
  if (opponentHp > playerHp) return 'opponent'

  const playerLiving = getLivingTcgBattleCards(state.player).length
  const opponentLiving = getLivingTcgBattleCards(state.opponent).length
  if (playerLiving > opponentLiving) return 'player'
  if (opponentLiving > playerLiving) return 'opponent'
  return 'tie'
}

export function getLivingTcgBattleCards(side: TcgBattleSideState): TcgBattleCardState[] {
  return [...side.front, ...side.back].filter((card) => card.currentHp > 0)
}

export function getOpenTcgBattleBenchSlots(side: TcgBattleSideState): number {
  const livingBench = side.back.filter((card) => card.currentHp > 0).length
  const livingPokemon = getLivingTcgBattleCards(side).length
  return Math.max(0, Math.min(3 - livingBench, 6 - livingPokemon))
}

export function getTcgBattleDeckSearchMaxCount(params: {
  state: TcgBattleState
  sideKey: TcgBattleSide
  attacker: TcgBattleCardState
  target: TcgBattleCardState
  rule: Extract<TcgBattleSpecialRule, { kind: 'searchDeckPokemon' }>
}): number {
  const { state, sideKey, attacker, target, rule } = params
  if (!rule.maxCountFrom) return rule.maxCount
  const count = getTcgBattleCount(rule.maxCountFrom, {
    state,
    sideKey,
    attacker,
    target,
    coinMode: 'actual',
  })
  return Math.max(0, Math.min(rule.maxCount, Math.floor(count)))
}

export function getAvailableTcgBattleDeckPokemon(
  side: TcgBattleSideState,
  rule: Extract<TcgBattleSpecialRule, { kind: 'searchDeckPokemon' }>,
): TcgBattleCardSummary[] {
  const cardsInBattle = [
    ...side.hand,
    ...side.front,
    ...side.back,
    ...side.discard,
  ]
  const unavailableIds = new Set(cardsInBattle.map((card) => card.id))
  const normalizeName = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '')
  const eligibleNames = rule.includeNames?.map(normalizeName)
  const eligibleNameParts = rule.includeNameContains?.map(normalizeName)
  const eligibleTypes = rule.includeTypes?.map((type) => type.toLowerCase())
  const eligibleSubtypes = rule.includeSubtypes?.map((subtype) => subtype.toLowerCase())
  const eligibleResistanceTypes = rule.includeResistanceTypes?.map((type) => type.toLowerCase())

  return side.deck.filter((card) => {
    if (unavailableIds.has(card.id)) return false
    const isBasic = card.subtypes.includes('Basic')
    const normalizedName = normalizeName(card.name)
    const isNamed = Boolean(eligibleNames?.includes(normalizedName))
    const nameContains = Boolean(eligibleNameParts?.some((value) => normalizedName.includes(value)))
    const typeMatches = Boolean(card.types.some((type) => eligibleTypes?.includes(type.toLowerCase())))
    const subtypeMatches = Boolean(card.subtypes.some((subtype) => eligibleSubtypes?.includes(subtype.toLowerCase())))
    const resistanceMatches = Boolean(card.resistances.some((resistance) => eligibleResistanceTypes?.includes(resistance.type.toLowerCase())))
    if (rule.basicOnly && !isBasic) return false
    if (
      (eligibleNames?.length || eligibleNameParts?.length || eligibleTypes?.length || eligibleSubtypes?.length || eligibleResistanceTypes?.length || rule.includeBasic) &&
      !(isNamed || nameContains || typeMatches || subtypeMatches || resistanceMatches || (rule.includeBasic && isBasic))
    ) return false
    return true
  })
}

export function compactTcgBattleBoard(side: TcgBattleSideState): void {
  const faintedFront = side.front.filter((card) => card.currentHp <= 0)
  const faintedBack = side.back.filter((card) => card.currentHp <= 0)
  side.discard.push(...faintedFront, ...faintedBack)
  side.front = side.front.filter((card) => card.currentHp > 0)
  side.back = side.back.filter((card) => card.currentHp > 0)
}

export function chooseOpponentTcgBattleAttack(state: TcgBattleState) {
  const maxCost = getAllowedTcgBattleAttackCost(state.turnNumber)
  let best:
    | {
        attacker: TcgBattleCardState
        target: TcgBattleCardState
        attackIndex: number
        damage: number
        choice?: TcgBattleAttackChoice
      }
    | null = null

  for (const attacker of state.opponent.front.filter((card) => card.currentHp > 0)) {
    if (!isTcgBattleSummaryUnlocked(attacker, state.turnNumber)) continue
    for (const [attackIndex, attack] of attacker.attacks.entries()) {
      if (isTcgBattleAttackDisabled(attacker, attackIndex)) continue
      const cost = getEffectiveTcgBattleAttackCost(state, attack)
      if (cost > maxCost || cost > state.opponent.energy) continue
      for (const target of getValidTcgBattleTargets(state, 'opponent', attacker, attack)) {
        const choice = chooseTcgBattleAttackChoice({
          state,
          sideKey: 'opponent',
          attacker,
          attack,
          target,
          paidAttackCost: cost,
        })
        const requirement = getTcgBattleAttackEffect(attack)?.choiceRequirement
        if (requirement && !choice && !isOptionalBenchChoiceSatisfied(requirement, state, 'opponent')) continue
        const damage = calculateTcgBattleDamage(attacker, attack, target, state, 'opponent')
        if (!best || damage > best.damage || target.currentHp < best.target.currentHp) {
          best = { attacker, target, attackIndex, damage, choice }
        }
      }
    }
  }

  return best
}

export function canSideTakeTcgBattleAction(state: TcgBattleState, sideKey: TcgBattleSide): boolean {
  const side = state[sideKey]
  const opponent = state[sideKey === 'player' ? 'opponent' : 'player']
  if (side.energy <= 0 || opponent.front.every((card) => card.currentHp <= 0)) return false
  const maxCost = getAllowedTcgBattleAttackCost(state.turnNumber)
  return side.front.some((card) =>
    card.currentHp > 0 &&
    isTcgBattleSummaryUnlocked(card, state.turnNumber) &&
    card.attacks.some((attack) => {
      const attackIndex = card.attacks.indexOf(attack)
      if (isTcgBattleAttackDisabled(card, attackIndex)) return false
      const cost = getEffectiveTcgBattleAttackCost(state, attack)
      if (cost > maxCost || cost > side.energy) return false
      return getValidTcgBattleTargets(state, sideKey, card, attack).some((target) => {
        const required = getTcgBattleAttackEffect(attack)?.choiceRequirement
        const choice = required ? chooseTcgBattleAttackChoice({
          state,
          sideKey,
          attacker: card,
          attack,
          target,
          paidAttackCost: cost,
        }) : undefined
        return !required || Boolean(choice) || isOptionalBenchChoiceSatisfied(required, state, sideKey)
      })
    }),
  )
}

function isOptionalBenchChoiceSatisfied(
  requirement: TcgBattleChoiceRequirement,
  state: TcgBattleState,
  sideKey: TcgBattleSide,
): boolean {
  if (requirement === 'optionalOwnBench') {
    return state[sideKey].back.every((card) => card.currentHp <= 0)
  }
  if (requirement === 'optionalOpponentBench') {
    const opponentKey = sideKey === 'player' ? 'opponent' : 'player'
    return state[opponentKey].back.every((card) => card.currentHp <= 0)
  }
  return false
}

export function canSideChargeEnergy(state: TcgBattleState, sideKey: TcgBattleSide): boolean {
  return state[sideKey].energy < TCG_BATTLE_FORMATS[state.format].energyCap
}

export function canTcgBattleEndByPassStall(state: TcgBattleState): boolean {
  return (
    state.consecutivePasses >= 2 &&
    hasTcgBattleReachedFinalAttackAllowance(state.turnNumber) &&
    !canSideTakeTcgBattleAction(state, 'player') &&
    !canSideTakeTcgBattleAction(state, 'opponent') &&
    !canSideChargeEnergy(state, 'player') &&
    !canSideChargeEnergy(state, 'opponent')
  )
}

function normalizeTcgAttackText(text: string): string {
  return text
    .replace(/Pokémon/g, 'Pokemon')
    .replace(/pokémon/g, 'pokemon')
    .replace(/×/g, 'x')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeTcgDamageText(damage: string): string {
  return damage.replace(/×/g, 'x').trim()
}

function parseTcgAttackCoinFlipCount(text: string): number | undefined {
  const multiple = text.match(/\bflip (\d+) coins?\b/)
  if (multiple) return Number.parseInt(multiple[1], 10)
  return /\bflip a coin\b/.test(text) ? 1 : undefined
}

function getTcgBattleConditionFlipCount(rules: unknown[]): number {
  return rules.reduce<number>((maximum, rule) => {
    if (typeof rule !== 'object' || rule === null || !('condition' in rule)) return maximum
    const condition = (rule as { condition?: TcgBattleCoinCondition }).condition
    if (!condition) return maximum
    const count = typeof condition === 'object' ? condition.minimum : 1
    return Math.max(maximum, count)
  }, 0)
}

function inferTcgBattleCoinCondition(text: string): TcgBattleCoinCondition | undefined {
  const both = text.match(/\bif both(?: of them)? are (heads|tails)\b/)
  if (both) return { result: both[1] as TcgBattleCoinResult, minimum: 2 }
  const multiple = text.match(/\bif (?:1|one) or both(?: of them)? are (heads|tails)\b/)
  if (multiple) return { result: multiple[1] as TcgBattleCoinResult, minimum: 1 }
  const any = text.match(/\bif (?:any(?: of them)?|either(?: of them)?) are (heads|tails)\b/)
  if (any) return { result: any[1] as TcgBattleCoinResult, minimum: 1 }
  const simple = text.match(/\bif (heads|tails)\b/)
  return simple?.[1] as TcgBattleCoinCondition | undefined
}

function inferClassicTcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  damage: string,
  baseDamage: number,
  setId?: string,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  // Gym attack names are mapped only when their source set is known.
  if (setId === 'gym1' || setId === 'gym2') {
    if (name === 'discharge') {
      return {
        damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 0 },
        coinFlipSource: { kind: 'energy', side: 'own' },
        energyDiscard: [{ target: 'self', amount: 'all' }],
      }
    }
    if (name === 'knockout needle') {
      return {
        damage: {
          kind: 'conditionalBonus',
          baseDamage,
          bonusDamage: 60,
          condition: { result: 'heads', minimum: 2 },
        },
        coinFlipCount: 2,
      }
    }
    if (name === 'crosscounter') {
      return {
        ...zero(),
        special: [{ kind: 'reflectDamage', damageMultiplier: 2, coinGate: 'heads' }],
      }
    }
    if (name === 'shadow images') {
      return {
        ...zero(),
        protection: [{ target: 'self', kind: 'coinPreventDamage', preventOn: 'tails' }],
      }
    }
    if (name === 'pain amplifier') {
      return {
        ...zero(),
        counterDamage: [{ amount: 10, side: 'opponent', zone: 'play', onlyDamaged: true }],
      }
    }
    if (name === 'tunneling') {
      return {
        ...zero(),
        benchDamage: [{ amount: 20, side: 'opponent', maxTargets: 2 }],
        special: [{ kind: 'cannotAttack', target: 'self' }],
        ignoreWeaknessResistance: true,
      }
    }
    if (name === 'alert') {
      return {
        ...zero(),
        choiceRequirement: 'ownBench',
        special: [{ kind: 'switch', target: 'self' }],
      }
    }
    if (name === 'healing pollen') {
      if (/flip 3 coins/.test(text)) {
        return {
          ...zero(),
          coinFlipCount: 3,
          healing: [{ amount: 0, amountPerHead: 10, side: 'own', zone: 'play' }],
        }
      }
      return {
        ...zero(),
        coinFlipCount: 1,
        healing: [{ target: 'self', amount: 40, condition: 'heads' }],
      }
    }
    if (name === 'lucky shot') {
      return {
        damage: { kind: 'zeroOnTails', amount: 30 },
        coinFlipCount: 1,
        targetScope: 'bench',
        ignoreWeaknessResistance: true,
      }
    }
    if (name === 'spiral dive') {
      return {
        ...zero(),
        counterDamage: [{ amount: 10, side: 'opponent', zone: 'play' }],
        ignoreWeaknessResistance: true,
      }
    }
    if (name === 'deflector') {
      return { ...zero(), protection: [{ target: 'self', kind: 'halve' }] }
    }
    if (name === 'water punch') {
      return {
        damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 10, coinFlipCount: 0 },
        coinFlipSource: { kind: 'energy', side: 'own' },
      }
    }
    if (name === 'night spirits') {
      return {
        damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 0 },
        coinFlipSource: {
          kind: 'namedPokemon',
          side: 'own',
          zone: 'play',
          names: ["Sabrina's Gastly", "Sabrina's Haunter", "Sabrina's Gengar"],
        },
      }
    }
    if (name === 'naptime') {
      return {
        ...zero(),
        coinFlipCount: 1,
        healing: [{ target: 'self', amount: 30, condition: 'heads' }],
        status: [{ target: 'self', statuses: ['asleep'], condition: 'heads' }],
      }
    }
    if (name === 'taunt') {
      return {
        ...zero(),
        choiceRequirement: 'opponentBench',
        special: [{ kind: 'switch', target: 'opponent' }],
      }
    }
    if (name === 'eggsplosion') {
      return {
        damage: { kind: 'headsMultiplier', damagePerHeads: 10, coinFlipCount: 0 },
        coinFlipSource: { kind: 'energy', side: 'own' },
      }
    }
    if (name === 'stretch vine') {
      const amount = Number.parseInt(text.match(/this attack does (\d+) damage to (?:it|that pokemon)/)?.[1] || '0', 10)
      return {
        damage: { kind: 'fixed', amount },
        targetScope: 'bench',
        ignoreWeaknessResistance: true,
      }
    }
    if (name === 'focus energy') {
      const attackName = text.match(/'s ([a-z][a-z -]*) attack's/)?.[1]
      if (attackName) {
        const damagesSelf = /damage to itself(?:\)| is doubled)/.test(text)
        return {
          ...zero(),
          special: [{ kind: 'buffAttack', attackName, damageMultiplier: 2, selfDamageMultiplier: damagesSelf ? 2 : undefined }],
        }
      }
    }
    if (name === 'spin ball') {
      return { damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 1 }, coinFlipCount: 1 }
    }
    if (name === 'suggestion') {
      return { ...zero(), coinFlipCount: 1, special: [{ kind: 'cannotAttack', target: 'opponent', condition: 'heads' }] }
    }
    if (name === 'roaring flames') {
      return {
        damage: {
          kind: 'count',
          baseDamage,
          perUnitDamage: 20,
          source: { kind: 'unusedEnergy' },
        },
        energyDiscard: [{ target: 'self', amount: 'all' }],
      }
    }
    if (name === 'flame jet') {
      return {
        damage: { kind: 'zeroOnTails', amount: 40 },
        coinFlipCount: 1,
        targetScope: 'any',
        ignoreWeaknessResistance: true,
      }
    }
    if (name === 'growth') {
      return { ...zero(), coinFlipCount: 1, energyGain: [{ target: 'self', amount: 2, condition: 'heads' }] }
    }
    if (name === 'super removal') {
      return {
        ...zero(),
        coinFlipCount: 1,
        energyDiscard: [{ target: 'opponent', amount: 'opponentPokemon', condition: 'heads' }],
      }
    }
    if (name === 'summon storm') {
      return {
        ...zero(),
        coinFlipCount: 2,
        counterDamage: [{ amount: 20, side: 'both', zone: 'play', excludeAttacker: true, condition: { result: 'heads', minimum: 2 } }],
        ignoreWeaknessResistance: true,
      }
    }
    if (name === 'intimidate') {
      return { ...zero(), special: [{ kind: 'blockTargeting', targetMaxHpAtMost: 50 }] }
    }
    if (name === 'giant growth') {
      return {
        ...zero(),
        coinFlipCount: 1,
        special: [{ kind: 'grow', maxHp: 80, attackName: 'Pound', baseDamage: 30, condition: 'heads' }],
      }
    }
    if (name === 'kerzap') {
      return {
        damage: { kind: 'headsBonus', baseDamage, bonusDamage: 30 },
        coinFlipCount: 1,
        energyDiscard: [{ target: 'self', amount: 'all', condition: 'heads' }],
      }
    }
    if (name === 'juxtapose') {
      return { ...zero(), coinFlipCount: 1, special: [{ kind: 'swapDamageCounters', condition: 'heads' }] }
    }
    if (name === 'lie low') {
      return { ...zero(), protection: [{ target: 'self', kind: 'reduce', amount: 20 }] }
    }
    if (name === 'love lariat') {
      return {
        damage: {
          kind: 'conditionalCount',
          baseDamage,
          perUnitDamage: 50,
          source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ["Giovanni's Nidoking"] },
          minUnits: 0,
          maxUnits: 1,
          condition: 'heads',
        },
        coinFlipCount: 1,
      }
    }
    if (name === 'poison buildup') {
      return { ...zero(), status: [{ target: 'self', statuses: ['poisoned'] }] }
    }
    if (name === 'aerial maneuvers') {
      return {
        damage: { kind: 'headsBonus', baseDamage, bonusDamage: 30 },
        coinFlipCount: 1,
        protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
      }
    }
    if (name === 'thunder flare') {
      return {
        damage: {
          kind: 'count',
          baseDamage,
          perUnitDamage: 10,
          source: { kind: 'damageCounters', target: 'attacker' },
        },
        coinFlipCount: 1,
        selfDamage: [{ kind: 'fixed', amount: 30, condition: 'tails' }],
      }
    }
    if (name === 'damage shift') {
      return {
        ...zero(),
        healing: [{ amount: 10, side: 'own', zone: 'play' }],
        counterDamage: [{ amountPerUnit: 10, source: { kind: 'injuredPokemon', side: 'own', zone: 'play' }, target: 'opponent' }],
        ignoreWeaknessResistance: true,
      }
    }
    if (name === 'invigorate') {
      return {
        ...zero(),
        choiceRequirement: 'discardPokemon',
        special: [{ kind: 'reviveDiscardPokemon' }],
      }
    }
    if (name === 'bonfire') {
      return {
        ...zero(),
        coinFlipCount: 3,
        counterDamage: [{ amountPerHead: 10, side: 'opponent', zone: 'play' }],
        energyDiscard: [{ target: 'self', amount: 'heads' }],
        ignoreWeaknessResistance: true,
      }
    }
    if (name === 'rend') {
      return {
        damage: {
          kind: 'count',
          baseDamage,
          perUnitDamage: 20,
          source: { kind: 'damageCounters', target: 'target' },
          maxUnits: 1,
        },
      }
    }
    if (name === 'spontaneous explosion') {
      return {
        damage: { kind: 'headsBonus', baseDamage, bonusDamage: 30 },
        coinFlipCount: 1,
        selfDamage: [{ kind: 'fixed', amount: 30, condition: 'heads' }],
      }
    }
    if (name === 'power ball') {
      return {
        damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 10, coinFlipCount: 3 },
        coinFlipCount: 3,
      }
    }
    if (name === 'shadow attack') {
      return {
        damage: { kind: 'zeroOnTails', amount: 30 },
        coinFlipCount: 1,
        targetScope: 'bench',
        ignoreWeaknessResistance: true,
      }
    }
    if (name === 'pendulum curse') {
      return {
        damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 0 },
        coinFlipSource: { kind: 'damageCounters', target: 'target' },
      }
    }
    if (name === 'life drain') {
      return {
        damage: { kind: 'targetToRemainingHp', remainingHp: 10, condition: 'heads' },
        coinFlipCount: 1,
        ignoreWeaknessResistance: true,
      }
    }
    if (name === 'magic darts') {
      return {
        damage: { kind: 'headsMultiplier', damagePerHeads: 10, coinFlipCount: 3 },
        coinFlipCount: 3,
        targetScope: 'any',
        ignoreWeaknessResistance: true,
      }
    }
    if (name === 'retaliate') {
      return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'attacker' } } }
    }
    if (name === 'stoke') {
      return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
    }
    if (name === 'group therapy') {
      return { ...zero(), healing: [{ amount: 10, side: 'both', zone: 'play' }] }
    }
    if (name === 'pulled punch') {
      return { damage: { kind: 'healthyTarget', healthyDamage: 40, damagedDamage: 10 } }
    }
    if (name === 'fury punch') {
      return {
        damage: {
          kind: 'conditionalCount',
          baseDamage: 0,
          perUnitDamage: 20,
          source: { kind: 'damageCounters', target: 'attacker' },
          condition: 'heads',
        },
        coinFlipCount: 1,
      }
    }
    if (name === 'group attack') {
      return {
        damage: {
          kind: 'count',
          baseDamage: 0,
          perUnitDamage: 10,
          source: { kind: 'namedPokemon', side: 'own', zone: 'play', names: ["Koga's Zubat"] },
        },
      }
    }
    if (name === 'play dead') {
      return {
        ...zero(),
        coinFlipCount: 1,
        protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
      }
    }
    if (name === 'esp') {
      return {
        damage: { kind: 'coinCount', amountPerHeads: 20, coinFlipCount: 3, exactHeads: 2 },
        coinFlipCount: 3,
        choiceRequirement: 'copyAttack',
        special: [{ kind: 'copyAttack', coinGate: { result: 'heads', minimum: 3 }, preserveExtraCosts: false }],
      }
    }
    if (name === 'blizzard') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 1,
        benchDamage: [
          { amount: 10, side: 'opponent', condition: 'heads' },
          { amount: 10, side: 'own', condition: 'tails' },
        ],
      }
    }
    if (name === 'mega drain') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        healing: [{ target: 'self', amountFrom: 'halfDamageDealtRoundedUp' }],
      }
    }
    if (name === 'water ring') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        benchDamage: [{ amount: 10, side: 'both', typeFilter: { exclude: ['Water'] } }],
      }
    }
    if (name === 'sonic distortion') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 2,
        status: [{ target: 'opponent', statuses: ['confused'], condition: { result: 'heads', minimum: 1 } }],
      }
    }
    if (['horn toss', 'shake', 'whirlwind'].includes(name)) {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        choiceRequirement: 'optionalOpponentBench',
        special: [{ kind: 'switch', target: 'opponent' }],
      }
    }
    if (name === 'removal pulse' || name === 'rapids') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 1,
        energyDiscard: [{ target: 'opponent', amount: 1, condition: 'heads' }],
      }
    }
    if (name === 'mud splash') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 1,
        benchDamage: [{ amount: 10, side: 'opponent', maxTargets: 1, condition: 'heads' }],
      }
    }
    if (name === 'stamp') {
      return {
        damage: { kind: 'headsBonus', baseDamage, bonusDamage: 10 },
        coinFlipCount: 1,
        benchDamage: [{ amount: 10, side: 'opponent', condition: 'heads' }],
      }
    }
    if (name === 'detonate') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        selfDamage: [{ kind: 'fixed', amount: 50 }],
        benchDamage: [{ amount: 10, side: 'both' }],
      }
    }
    if (name === 'overhead toss') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 1,
        benchDamage: [{ amount: 20, side: 'own', maxTargets: 1, condition: 'tails' }],
      }
    }
    if (name === 'sporadic sponging') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 1,
        healing: [{ target: 'self', amount: 10, condition: 'heads' }],
      }
    }
    if (name === 'fast-acting poison') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 2,
        status: [{ target: 'opponent', statuses: ['confused', 'poisoned'], condition: { result: 'heads', minimum: 2 } }],
      }
    }
    if (name === 'smelly gas') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 1,
        benchDamage: [{ amount: 10, side: 'both', condition: 'heads' }],
      }
    }
    if (name === 'hug') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 1,
        special: [{ kind: 'preventRetreat', condition: 'heads' }],
      }
    }
    if (name === 'fire tail slap') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 1,
        energyDiscard: [{ target: 'self', amount: 1, condition: 'tails' }],
      }
    }
    if (name === 'hind kick') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 1,
        choiceRequirement: 'optionalOwnBench',
        special: [{ kind: 'switch', target: 'self', condition: 'heads' }],
      }
    }
    if (name === 'overrun') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 1,
        benchDamage: [{ amount: 20, side: 'opponent', maxTargets: 1, condition: 'heads' }],
      }
    }
    if (name === 'ink spurt') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 1,
        special: [{ kind: 'attackFailsOnTails', condition: 'heads' }],
      }
    }
    if (name === 'bubbles') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 1,
        special: [{ kind: 'disableSelfAttack', attackName: 'Bubbles', condition: 'tails' }],
      }
    }
    if (name === 'dragon tornado') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        choiceRequirement: 'optionalOpponentBench',
        special: [{ kind: 'switch', target: 'opponent', ifTargetSurvives: true }],
      }
    }
    if (name === 'flytrap') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        choiceRequirement: 'opponentBench',
        special: [{ kind: 'switch', target: 'opponent', beforeDamage: true }],
      }
    }
    if (name === 'sludge grip') {
      return {
        ...zero(),
        coinFlipCount: 1,
        choiceRequirement: 'optionalOpponentBench',
        special: [{ kind: 'switch', target: 'opponent', condition: 'heads', poisonAfterSwitch: true }],
      }
    }
    if (name === 'agility' && /prevent all effects of attacks, including damage/.test(text)) {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 1,
        protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
      }
    }
  }

  if (/damage (?:plus|times).*energy card(?:s)? attached to the defending pokemon/.test(text)) {
    const perUnit = Number.parseInt(text.match(/(?:plus|does) (\d+) more damage for each energy|does (\d+) damage times/)?.slice(1).find(Boolean) || '10', 10)
    return {
      damage: {
        kind: 'count',
        baseDamage: damage.endsWith('+') ? baseDamage : 0,
        perUnitDamage: perUnit,
        source: { kind: 'energy', side: 'opponent' },
      },
    }
  }

  if (/energy attached to .* but not used to pay for this attack/.test(text) && damage.endsWith('+')) {
    const perUnit = Number.parseInt(text.match(/plus (\d+) more damage for each/)?.[1] || '10', 10)
    const maxBonus = Number.parseInt(text.match(/can't add more than (\d+) damage/)?.[1] || '0', 10)
    const maxUnitsFromOrdinal = Number.parseInt(text.match(/after the (\d+)(?:st|nd|rd|th)/)?.[1] || '0', 10)
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: perUnit,
        source: { kind: 'unusedEnergy' },
        maxUnits: maxBonus > 0 ? Math.floor(maxBonus / perUnit) : maxUnitsFromOrdinal || undefined,
      },
    }
  }

  if (name === 'do the wave') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'bench', side: 'own' } } }
  }
  if (name === 'meditate') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'target' } } }
  }
  if (name === 'rage') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'attacker' } } }
  }
  if (name === 'flail') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'attacker' } } }
  }
  if (name === 'karate chop') {
    return { damage: { kind: 'subtractCount', baseDamage, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'attacker' } } }
  }
  if (name === 'super fang') return { damage: { kind: 'remainingHpHalf' } }
  if (name === 'boyfriends') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'namedPokemon', side: 'own', zone: 'play', names: ['Nidoking'] } } }
  }
  if (name === 'magnetism') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Magnemite', 'Magneton', 'Dark Magneton'] } } }
  }
  if (name === 'mass explosion') {
    const names = ['Koffing', 'Weezing', 'Dark Weezing']
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'namedPokemon', side: 'both', zone: 'play', names } },
      counterDamage: [{ amount: 20, side: 'both', zone: 'play', names }],
    }
  }
  if (name === 'big eggsplosion') {
    return { damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 0 }, coinFlipSource: { kind: 'energy', side: 'own' } }
  }
  if (name === 'bench manipulation') {
    return {
      damage: { kind: 'tailsMultiplier', damagePerTails: 20 },
      coinFlipSource: { kind: 'bench', side: 'opponent' },
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'continuous fireball') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 50, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
      energyDiscard: [{ target: 'self', amount: 'heads' }],
    }
  }
  if (name === 'burning fire') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'chosenEnergy' } },
      energyDiscard: [{ target: 'self', amount: 'choice' }],
      choiceRequirement: 'energyAmount',
    }
  }
  if (name === 'playing with fire') {
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: 20 },
      coinFlipCount: 1,
      energyDiscard: [{ target: 'self', amount: 1, condition: 'heads' }],
    }
  }
  if (name === 'flames of rage') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'attacker' } },
      energyDiscard: [{ target: 'self', amount: 2 }],
    }
  }
  if (name === 'knock down') {
    return { damage: { kind: 'tailsBonus', baseDamage, bonusDamage: 20 }, coinFlipCount: 1 }
  }
  if (name === 'rampage') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'attacker' } },
      coinFlipCount: 1,
      status: [{ target: 'self', statuses: ['confused'], condition: 'tails' }],
    }
  }
  if (name === 'miraculous comeback') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 10, coinFlipCount: 0 },
      coinFlipSource: { kind: 'pokemonInPlay', side: 'both' },
      selfDamage: [{ kind: 'perTail', amount: 10 }],
    }
  }
  if (name === 'seething anger') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 10, coinFlipCount: 0 },
      coinFlipSource: { kind: 'damageCounters', target: 'attacker' },
    }
  }
  if (['stone barrage', 'repeating kick'].includes(name)) {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: name === 'repeating kick' ? 20 : 10, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'metal pincer') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 10, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'petal whirlwind') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 3 },
      coinFlipCount: 3,
      status: [{ target: 'self', statuses: ['confused'], condition: { result: 'heads', minimum: 2 } }],
    }
  }

  if (name === 'cat punch') {
    return {
      damage: { kind: 'zeroOnTails', amount: 20 },
      coinFlipCount: 1,
      benchDamage: [{ amount: 20, side: 'opponent', maxTargets: 1, condition: 'tails' }],
      ignoreWeaknessResistance: true,
    }
  }
  if (['coin hurl', 'jump over'].includes(name)) {
    return {
      damage: { kind: 'zeroOnTails', amount: 20 },
      coinFlipCount: 1,
      targetScope: name === 'jump over' ? 'bench' : 'any',
      ignoreWeaknessResistance: true,
    }
  }
  const directDamage: Record<string, { amount: number; scope: 'bench' | 'any' }> = {
    'dig under': { amount: 10, scope: 'any' },
    flitter: { amount: 20, scope: 'any' },
    stare: { amount: 10, scope: 'any' },
    'stretch kick': { amount: 20, scope: 'bench' },
    telekinesis: { amount: 30, scope: 'any' },
  }
  if (directDamage[name]) {
    return {
      damage: { kind: 'fixed', amount: directDamage[name].amount },
      targetScope: directDamage[name].scope,
      ignoreWeaknessResistance: true,
    }
  }
  if (['lure', 'fascinate', 'tempt'].includes(name)) {
    const conditional = name === 'lure' ? undefined : 'heads'
    return {
      ...zero(),
      coinFlipCount: conditional ? 1 : undefined,
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent', condition: conditional }],
    }
  }
  if (name === 'teleport') {
    return { ...zero(), choiceRequirement: 'ownBench', special: [{ kind: 'switch', target: 'self' }] }
  }

  if (name === 'first aid') return { ...zero(), healing: [{ target: 'self', amount: 10 }] }
  if (name === 'spacing out') {
    return { ...zero(), coinFlipCount: 1, healing: [{ target: 'self', amount: 10, condition: 'heads' }] }
  }
  if (name === 'recover') {
    return {
      ...zero(),
      healing: [{ target: 'self', amount: 'all' }],
      energyDiscard: [{ target: 'self', amount: 1 }],
    }
  }
  if (name === 'afternoon nap' || name === 'recharge') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'energy absorption') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  }

  if (name === 'amnesia') {
    return { ...zero(), choiceRequirement: 'disableAttack', special: [{ kind: 'disableAttack' }] }
  }
  if (name === 'swords dance') {
    return { ...zero(), special: [{ kind: 'buffAttack', attackName: 'Slash', baseDamage: 60 }] }
  }
  if (name === 'barrier') {
    return {
      ...zero(),
      energyDiscard: [{ target: 'self', amount: 1 }],
      protection: [{ target: 'self', kind: 'preventAllEffects' }],
    }
  }
  if (name === 'harden') {
    return { ...zero(), protection: [{ target: 'self', kind: 'preventAtMost', amount: 30 }] }
  }
  if (name === 'light screen') {
    return { ...zero(), protection: [{ target: 'self', kind: 'halve' }] }
  }
  if (name === 'growl' || name === 'snivel') {
    return {
      ...zero(),
      protection: [{ target: 'self', kind: 'reduce', amount: name === 'growl' ? 10 : 20, attackerOnly: true }],
    }
  }
  if (name === 'tail wag' || name === 'leer') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [{ kind: 'blockTargeting', condition: 'heads' }],
    }
  }
  if (name === 'destiny bond') {
    return {
      ...zero(),
      energyDiscard: [{ target: 'self', amount: 1 }],
      special: [{ kind: 'destinyBond' }],
    }
  }
  if (name === 'mirror move') return { damage: { kind: 'lastIncomingDamage' }, ignoreWeaknessResistance: true, special: [{ kind: 'mirrorLastDamage' }] }
  if (name === 'mirror shell') return { ...zero(), special: [{ kind: 'reflectDamage' }] }
  if (name === 'conversion 1') {
    return { ...zero(), choiceRequirement: 'typeChange', special: [{ kind: 'changeWeakness' }] }
  }
  if (name === 'conversion 2') {
    return { ...zero(), choiceRequirement: 'typeChange', special: [{ kind: 'changeResistance' }] }
  }
  if (name === 'paint') {
    return {
      ...zero(),
      coinFlipCount: 1,
      choiceRequirement: 'typeChange',
      special: [{ kind: 'changeType', condition: 'heads' }],
    }
  }
  if (name === 'texture magic') {
    return { ...zero(), choiceRequirement: 'textureMagic', special: [{ kind: 'textureMagic' }] }
  }
  if (name === 'lightning rod') {
    return { ...zero(), targetScope: 'any', special: [{ kind: 'placeMarker', marker: 'lightningRod' }] }
  }
  if (name === 'lightning bolt' && /lightning rod marker/.test(text)) {
    return {
      damage: { kind: 'fixed', amount: 20 },
      targetScope: 'any',
      special: [{ kind: 'markerDamage', marker: 'lightningRod', amount: 20 }],
    }
  }
  if (name === 'metronome' || name === 'mini-metronome') {
    const mini = name === 'mini-metronome'
    return {
      ...zero(),
      coinFlipCount: mini ? 1 : undefined,
      choiceRequirement: 'copyAttack',
      special: [{ kind: 'copyAttack', coinGate: mini ? 'heads' : undefined, preserveExtraCosts: mini }],
    }
  }

  return null
}

function parseTcgAttackBaseDamage(damage: string): number {
  const match = damage.match(/^(\d+)/)
  return match ? Number.parseInt(match[1], 10) : 0
}

function inferVariableTcgBattleDamage(
  text: string,
  damage: string,
  baseDamage: number,
): Pick<TcgBattleAttackEffect, 'damage' | 'coinFlipCount'> | null {
  const headsBonus = text.match(/flip a coin\. if heads, this attack does (\d+) more damage\b/)
  if (headsBonus && damage.endsWith('+')) {
    return {
      damage: {
        kind: 'headsBonus',
        baseDamage,
        bonusDamage: Number.parseInt(headsBonus[1], 10),
      },
      coinFlipCount: 1,
    }
  }

  const oldHeadsBonus = text.match(
    /flip a coin\. if heads, this attack does \d+ damage plus (\d+) more damage; if tails, this attack does \d+ damage/,
  )
  if (oldHeadsBonus && damage.endsWith('+')) {
    return {
      damage: {
        kind: 'headsBonus',
        baseDamage,
        bonusDamage: Number.parseInt(oldHeadsBonus[1], 10),
      },
      coinFlipCount: 1,
    }
  }

  const headsBonusEach = text.match(/flip (\d+) coins\. this attack does (\d+) more damage for each heads\b/)
  if (headsBonusEach && damage.endsWith('+')) {
    return {
      damage: {
        kind: 'headsBonusEach',
        baseDamage,
        bonusDamage: Number.parseInt(headsBonusEach[2], 10),
        coinFlipCount: Number.parseInt(headsBonusEach[1], 10),
      },
      coinFlipCount: Number.parseInt(headsBonusEach[1], 10),
    }
  }

  const headsMultiplier = text.match(
    /flip (\d+) coins\. this attack does (\d+) damage (?:for each heads|times the number of heads)\b/,
  )
  if (headsMultiplier && damage.endsWith('x')) {
    return {
      damage: {
        kind: 'headsMultiplier',
        damagePerHeads: Number.parseInt(headsMultiplier[2], 10),
        coinFlipCount: Number.parseInt(headsMultiplier[1], 10),
      },
      coinFlipCount: Number.parseInt(headsMultiplier[1], 10),
    }
  }

  const countDamage = inferCountedTcgBattleDamage(text, damage, baseDamage)
  return countDamage ? { damage: countDamage } : null
}

function inferTcgBattleBenchDamage(text: string): TcgBattleBenchDamageRule[] {
  const rules: TcgBattleBenchDamageRule[] = []
  const addRule = (amount: number, side: TcgBattleBenchDamageRule['side'], maxTargets?: number) => {
    if (!Number.isFinite(amount) || amount <= 0) return
    rules.push({ amount, side, maxTargets })
  }

  const eachBoth = text.match(/(?:and )?(\d+) damage to each benched pokemon \(both yours and your opponent's\)/)
  if (eachBoth) addRule(Number.parseInt(eachBoth[1], 10), 'both')

  const eachOpponent = text.match(/(?:and )?(\d+) damage to each of your opponent's benched pokemon/)
  if (eachOpponent) addRule(Number.parseInt(eachOpponent[1], 10), 'opponent')

  const eachOwn = text.match(/(?:and )?(\d+) damage to each of your benched pokemon/)
  if (eachOwn) addRule(Number.parseInt(eachOwn[1], 10), 'own')

  const oneOpponent = text.match(/(?:and )?(\d+) damage to (?:1|one) of your opponent's benched pokemon/)
  if (oneOpponent) addRule(Number.parseInt(oneOpponent[1], 10), 'opponent', 1)

  const oneOwn = text.match(/(?:and )?(\d+) damage to (?:1|one) of your benched pokemon/)
  if (oneOwn) addRule(Number.parseInt(oneOwn[1], 10), 'own', 1)

  return rules
}

function inferTcgBattleCounterDamage(text: string): TcgBattleCounterDamageRule[] {
  const rules: TcgBattleCounterDamageRule[] = []
  const addRule = (amount: number, rule: Omit<TcgBattleCounterDamageRule, 'amount'>) => {
    if (!Number.isFinite(amount) || amount <= 0) return
    rules.push({ amount, ...rule } as TcgBattleCounterDamageRule)
  }

  const activeOpponent = text.match(/put (\d+) damage counter(?:s)? on (?:your opponent's active pokemon|the defending pokemon|that pokemon)\b/)
  if (activeOpponent) addRule(Number.parseInt(activeOpponent[1], 10) * 10, { target: 'opponent' })

  const activeSelf = text.match(/put (\d+) damage counter(?:s)? on (?:this pokemon|itself|this card)\b/)
  if (activeSelf) addRule(Number.parseInt(activeSelf[1], 10) * 10, { target: 'self' })

  const eachBothBench = text.match(/put (\d+) damage counter(?:s)? on each benched pokemon \(both yours and your opponent's\)\b/)
  if (eachBothBench) addRule(Number.parseInt(eachBothBench[1], 10) * 10, { side: 'both' })

  const eachOppBench = text.match(/put (\d+) damage counter(?:s)? on each of your opponent's benched pokemon\b/)
  if (eachOppBench) addRule(Number.parseInt(eachOppBench[1], 10) * 10, { side: 'opponent' })

  const eachOwnBench = text.match(/put (\d+) damage counter(?:s)? on each of your benched pokemon\b/)
  if (eachOwnBench) addRule(Number.parseInt(eachOwnBench[1], 10) * 10, { side: 'own' })

  const oneOppBench = text.match(/put (\d+) damage counter(?:s)? on (?:1|one) of your opponent's benched pokemon\b/)
  if (oneOppBench) addRule(Number.parseInt(oneOppBench[1], 10) * 10, { side: 'opponent', maxTargets: 1 })

  const oneOwnBench = text.match(/put (\d+) damage counter(?:s)? on (?:1|one) of your benched pokemon\b/)
  if (oneOwnBench) addRule(Number.parseInt(oneOwnBench[1], 10) * 10, { side: 'own', maxTargets: 1 })

  return rules
}

function inferTcgBattleHealing(text: string): TcgBattleHealingRule[] {
  const rules: TcgBattleHealingRule[] = []
  const addRule = (
    amount: number,
    rule:
      | { target: 'self' | 'opponent'; condition?: TcgBattleCoinCondition }
      | { side: 'own' | 'opponent' | 'both'; maxTargets?: number; condition?: TcgBattleCoinCondition },
  ) => {
    if (!Number.isFinite(amount) || amount <= 0) return
    rules.push({ amount, ...rule } as TcgBattleHealingRule)
  }

  const damageDoneSelf =
    text.match(
      /remove a number of damage counters from (?:this pokemon|[a-z0-9' .&-]+) equal to the damage done to (?:the defending pokemon|your opponent's active pokemon|that pokemon)\b/,
    ) ||
    text.match(
      /heal (?:this pokemon|[a-z0-9' .&-]+) equal to the damage done to (?:the defending pokemon|your opponent's active pokemon|that pokemon)\b/,
    )
  if (damageDoneSelf) rules.push({ target: 'self', amountFrom: 'damageDealt' })

  const healSelf = text.match(/heal (\d+) damage from (?:this pokemon|itself|this card)\b/)
  if (healSelf) addRule(Number.parseInt(healSelf[1], 10), { target: 'self' })

  const healOpp = text.match(/heal (\d+) damage from (?:your opponent's active pokemon|the defending pokemon|that pokemon)\b/)
  if (healOpp) addRule(Number.parseInt(healOpp[1], 10), { target: 'opponent' })

  const removeSelf = text.match(/remove (\d+) damage counter(?:s)? from (?:this pokemon|itself|this card)\b/)
  if (removeSelf) addRule(Number.parseInt(removeSelf[1], 10) * 10, { target: 'self' })

  const removeOpp = text.match(/remove (\d+) damage counter(?:s)? from (?:your opponent's active pokemon|the defending pokemon|that pokemon)\b/)
  if (removeOpp) addRule(Number.parseInt(removeOpp[1], 10) * 10, { target: 'opponent' })

  const healEachOwnBench = text.match(/heal (\d+) damage from each of your benched pokemon\b/)
  if (healEachOwnBench) addRule(Number.parseInt(healEachOwnBench[1], 10), { side: 'own' })

  const healEachOppBench = text.match(/heal (\d+) damage from each of your opponent's benched pokemon\b/)
  if (healEachOppBench) addRule(Number.parseInt(healEachOppBench[1], 10), { side: 'opponent' })

  const removeOneOwnBench = text.match(/remove (\d+) damage counter(?:s)? from (?:1|one) of your benched pokemon\b/)
  if (removeOneOwnBench) addRule(Number.parseInt(removeOneOwnBench[1], 10) * 10, { side: 'own', maxTargets: 1 })

  const removeOneOppBench = text.match(/remove (\d+) damage counter(?:s)? from (?:1|one) of your opponent's benched pokemon\b/)
  if (removeOneOppBench) addRule(Number.parseInt(removeOneOppBench[1], 10) * 10, { side: 'opponent', maxTargets: 1 })

  return rules
}

function calculateTcgBattleBenchDamage(
  rules: TcgBattleBenchDamageRule[],
  state: TcgBattleState,
  sideKey: TcgBattleSide,
  attacker: TcgBattleCardState,
  target: TcgBattleCardState,
  random: () => number,
  coinFlips?: TcgBattleAttackResolution['coinFlips'],
): { targetSide: TcgBattleSide; targetId: string; damage: number }[] {
  const results: { targetSide: TcgBattleSide; targetId: string; damage: number }[] = []
  let perTargetCoinIndex = 0

  const addFromSide = (targetSide: TcgBattleSide, rule: TcgBattleBenchDamageRule) => {
    const targetCards = rule.zone === 'front'
      ? state[targetSide].front
      : rule.zone === 'play'
        ? [...state[targetSide].front, ...state[targetSide].back]
        : state[targetSide].back
    const candidates = targetCards.filter((card) => {
      if (card.currentHp <= 0) return false
      if (rule.excludeTarget && targetSide !== sideKey && card.instanceId === target.instanceId) return false
      const cardTypes = card.types.map((type) => type.toLowerCase())
      if (
        rule.selectedEnergyType &&
        (!state[sideKey].selectedEnergy || !cardTypes.includes(state[sideKey].selectedEnergy.toLowerCase()))
      ) return false
      if (rule.typeFilter?.include?.length && !rule.typeFilter.include.some((type) => cardTypes.includes(type.toLowerCase()))) return false
      if (rule.typeFilter?.exclude?.some((type) => cardTypes.includes(type.toLowerCase()))) return false
      const cardSubtypes = card.subtypes.map((subtype) => subtype.toLowerCase())
      if (rule.subtypeFilter?.include?.length && !rule.subtypeFilter.include.some((subtype) => cardSubtypes.includes(subtype.toLowerCase()))) return false
      if (rule.subtypeFilter?.exclude?.some((subtype) => cardSubtypes.includes(subtype.toLowerCase()))) return false
      return true
    })
    const maxTargets = rule.maxTargetsFrom
      ? getTcgBattleCount(rule.maxTargetsFrom, { state, sideKey, attacker, target, coinMode: 'actual' })
      : rule.maxTargets
    const selected = typeof maxTargets === 'number'
      ? pickRandomTcgBattleCards(candidates, maxTargets, random)
      : candidates
    for (const card of selected) {
      const isFront = state[targetSide].front.some((frontCard) => frontCard.instanceId === card.instanceId)
      const amount =
        rule.amount +
        (rule.amountPerHead || 0) * (coinFlips?.heads || 0) +
        (rule.source && typeof rule.amountPerUnit === 'number'
          ? rule.amountPerUnit * getTcgBattleCount(rule.source, {
              state,
              sideKey,
              attacker,
              target,
              coinMode: 'actual',
            })
          : 0)
      const appliesWeaknessResistance = isFront
        ? !rule.ignoreWeaknessResistance
        : Boolean(rule.applyWeaknessResistanceOnBench) && !rule.ignoreWeaknessResistanceOnBench
      const damage = targetSide !== sideKey && appliesWeaknessResistance
        ? applyTcgWeaknessAndResistance(attacker, card, amount)
        : amount
      if (rule.perTargetCoinFlip) {
        const result = coinFlips?.results[perTargetCoinIndex]
        perTargetCoinIndex += 1
        if (result !== 'heads') continue
      }
      results.push({ targetSide, targetId: card.instanceId, damage })
    }
  }

  for (const rule of rules) {
    if (!doesTcgBattleConditionPass(rule.condition, coinFlips)) continue
    if (rule.requiresEnergy) {
      const energySide = rule.requiresEnergy.side === 'own'
        ? sideKey
        : sideKey === 'player' ? 'opponent' : 'player'
      if (state[energySide].energy < rule.requiresEnergy.minimum) continue
    }
    if (rule.side === 'own' || rule.side === 'both') addFromSide(sideKey, rule)
    if (rule.side === 'opponent' || rule.side === 'both') {
      addFromSide(sideKey === 'player' ? 'opponent' : 'player', rule)
    }
  }

  return results
}

function calculateTcgBattleCounterDamage(
  rules: TcgBattleCounterDamageRule[],
  state: TcgBattleState,
  sideKey: TcgBattleSide,
  attacker: TcgBattleCardState,
  target: TcgBattleCardState,
  random: () => number,
  coinFlips?: TcgBattleAttackResolution['coinFlips'],
  paidAttackCost?: number,
  choice?: TcgBattleAttackChoice,
): { targetSide: TcgBattleSide; targetId: string; damage: number }[] {
  const results: { targetSide: TcgBattleSide; targetId: string; damage: number }[] = []
  let perTargetCoinIndex = 0
  for (const rule of rules) {
    if ('condition' in rule && !doesTcgBattleConditionPass(rule.condition, coinFlips)) continue
    if ('requiresTargetStatus' in rule && rule.requiresTargetStatus && !target.statusConditions?.includes(rule.requiresTargetStatus)) continue
    if ('requiresEnergy' in rule && rule.requiresEnergy) {
      const energySideKey = rule.requiresEnergy.side === 'own'
        ? sideKey
        : sideKey === 'player' ? 'opponent' : 'player'
      if (state[energySideKey].energy < rule.requiresEnergy.minimum) continue
    }
    if ('target' in rule) {
      if (rule.target === 'distributed') {
        if (choice?.kind !== 'counterDistribution') continue
        const distributedSideKey = sideKey === 'player' ? 'opponent' : 'player'
        for (const assignment of choice.assignments) {
          const card = [...state[distributedSideKey].front, ...state[distributedSideKey].back]
            .find((candidate) => candidate.instanceId === assignment.cardId && candidate.currentHp > 0)
          if (!card || assignment.counters <= 0) continue
          results.push({
            targetSide: distributedSideKey,
            targetId: card.instanceId,
            damage: rule.amountPerCounter * assignment.counters,
          })
        }
        continue
      }
      const targetSide = rule.target === 'self'
        ? sideKey
        : rule.target === 'target'
          ? [...state.player.front, ...state.player.back].some((card) => card.instanceId === target.instanceId)
            ? 'player'
            : 'opponent'
          : sideKey === 'player' ? 'opponent' : 'player'
      const targetId = rule.target === 'self' ? attacker.instanceId : target.instanceId
      const targetCard = rule.target === 'self' ? attacker : target
      const amount = ('amountToLeaveHp' in rule
        ? Math.max(0, targetCard.currentHp - rule.amountToLeaveHp)
        : 'amountToLeaveHpOfAttacker' in rule
          ? Math.max(0, targetCard.currentHp - attacker.currentHp)
        : 'amountPerUnit' in rule
          ? rule.amountPerUnit * Math.min(rule.maxUnits ?? Number.POSITIVE_INFINITY, getTcgBattleCount(rule.source, {
            state,
            sideKey,
            attacker,
            target,
            paidAttackCost,
            coinMode: 'actual',
            choice,
          }))
          : rule.amount) + ('deltaTargetBonus' in rule && targetCard.name.includes('δ') ? rule.deltaTargetBonus || 0 : 0)
      if (amount > 0) results.push({ targetSide, targetId, damage: amount })
      continue
    }

    const addFromSide = (targetSide: TcgBattleSide) => {
      const targetCards = 'zone' in rule && rule.zone === 'play'
        ? [...state[targetSide].front, ...state[targetSide].back]
        : 'zone' in rule && rule.zone === 'front'
          ? state[targetSide].front
          : state[targetSide].back
      let candidates = targetCards.filter((card) => card.currentHp > 0)
      if ('typeFilter' in rule && rule.typeFilter) {
        const normalizeType = (value: string) => value.toLowerCase()
        if (rule.typeFilter.include?.length) {
          const included = new Set(rule.typeFilter.include.map(normalizeType))
          candidates = candidates.filter((card) => card.types.some((type) => included.has(normalizeType(type))))
        }
        if (rule.typeFilter.exclude?.length) {
          const excluded = new Set(rule.typeFilter.exclude.map(normalizeType))
          candidates = candidates.filter((card) => !card.types.some((type) => excluded.has(normalizeType(type))))
        }
      }
      if ('names' in rule) {
        const normalizeName = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '')
        const names = new Set(rule.names.map(normalizeName))
        candidates = candidates.filter((card) => names.has(normalizeName(card.name)))
      }
      if ('onlyDamaged' in rule && rule.onlyDamaged) {
        candidates = candidates.filter((card) => card.currentHp < card.hp)
      }
      if ('excludeAttacker' in rule && rule.excludeAttacker && targetSide === sideKey) {
        candidates = candidates.filter((card) => card.instanceId !== attacker.instanceId)
      }
      if ('excludeTarget' in rule && rule.excludeTarget && targetSide !== sideKey) {
        candidates = candidates.filter((card) => card.instanceId !== target.instanceId)
      }
      const selected = 'maxTargets' in rule && rule.maxTargets
        ? pickRandomTcgBattleCards(candidates, rule.maxTargets, random)
        : candidates
      if ('amountPerTargetRetreatCost' in rule) {
        for (const card of selected) {
          const amount = rule.amountPerTargetRetreatCost * Math.max(0, card.convertedRetreatCost || 0)
          if (amount > 0) results.push({ targetSide, targetId: card.instanceId, damage: amount })
        }
        return
      }
      const amount = 'amountPerHead' in rule
        ? rule.amountPerHead * (coinFlips?.heads || 0)
        : rule.amount
      if (amount <= 0) return
      for (const card of selected) {
        if ('perTargetCoinFlip' in rule && rule.perTargetCoinFlip) {
          const result = coinFlips?.results[perTargetCoinIndex]
          perTargetCoinIndex += 1
          if (result === 'heads') results.push({ targetSide, targetId: card.instanceId, damage: rule.amount })
          continue
        }
        if (amount > 0) results.push({ targetSide, targetId: card.instanceId, damage: amount })
      }
    }
    if (rule.side === 'own' || rule.side === 'both') addFromSide(sideKey)
    if (rule.side === 'opponent' || rule.side === 'both') addFromSide(sideKey === 'player' ? 'opponent' : 'player')
  }
  return results
}

function calculateTcgBattleHealing(
  rules: TcgBattleHealingRule[],
  state: TcgBattleState,
  sideKey: TcgBattleSide,
  attacker: TcgBattleCardState,
  target: TcgBattleCardState,
  random: () => number,
  damageDealt: number,
  counterDamageDealt: number,
  coinFlips?: TcgBattleAttackResolution['coinFlips'],
  paidAttackCost?: number,
  choice?: TcgBattleAttackChoice,
): { targetSide: TcgBattleSide; targetId: string; amount: number }[] {
  const results: { targetSide: TcgBattleSide; targetId: string; amount: number }[] = []
  for (const rule of rules) {
    if (!doesTcgBattleConditionPass(rule.condition, coinFlips)) continue
    if (rule.requiresTargetStatus && !target.statusConditions?.includes(rule.requiresTargetStatus)) continue
    if ('amountFrom' in rule) {
      const amount = Math.max(
        0,
        rule.amountFrom === 'halfDamageDealtRoundedUp'
          ? Math.ceil(damageDealt / 20) * 10
          : rule.amountFrom === 'counterDamageDealt'
            ? counterDamageDealt
            : damageDealt,
      )
      if (amount <= 0) continue
      const targetSide = rule.target === 'self' ? sideKey : sideKey === 'player' ? 'opponent' : 'player'
      const targetId = rule.target === 'self' ? attacker.instanceId : target.instanceId
      results.push({ targetSide, targetId, amount })
      continue
    }

    if ('target' in rule && rule.target === 'selectedOwnBench') {
      if (choice?.kind !== 'benchSwitch') continue
      const selected = state[sideKey].back.find((card) => card.instanceId === choice.cardId && card.currentHp > 0)
      if (!selected || selected.currentHp >= selected.hp) continue
      if (rule.sameTypeAsAttacker && !selected.types.some((type) => attacker.types.includes(type))) continue
      const amount = rule.amount === 'all'
        ? selected.hp - selected.currentHp
        : rule.amount + (rule.amountPerUnit || 0) * (rule.source
          ? getTcgBattleCount(rule.source, { state, sideKey, attacker, target, paidAttackCost, coinMode: 'actual', choice })
          : 0)
      if (amount > 0) results.push({ targetSide: sideKey, targetId: selected.instanceId, amount })
      continue
    }

    if ('target' in rule && rule.target === 'selectedOwnPokemon') {
      if (choice?.kind !== 'ownPokemon') continue
      const selected = [...state[sideKey].front, ...state[sideKey].back]
        .find((card) => card.instanceId === choice.cardId && card.currentHp > 0)
      if (!selected || selected.currentHp >= selected.hp) continue
      const amount = rule.amount === 'all' ? selected.hp - selected.currentHp : rule.amount
      if (amount > 0) results.push({ targetSide: sideKey, targetId: selected.instanceId, amount })
      continue
    }

    if ('target' in rule && 'amount' in rule) {
      if (rule.requiresOwnBench && state[sideKey].back.every((card) => card.currentHp <= 0)) continue
      const targetSide = rule.target === 'self' ? sideKey : sideKey === 'player' ? 'opponent' : 'player'
      const targetId = rule.target === 'self' ? attacker.instanceId : target.instanceId
      const targetCard = rule.target === 'self' ? attacker : target
      const perUnitAmount = rule.amountPerUnit && rule.source
        ? rule.amountPerUnit * getTcgBattleCount(rule.source, {
            state,
            sideKey,
            attacker,
            target,
            paidAttackCost,
            coinMode: 'actual',
            choice,
          })
        : 0
      const amount = rule.amount === 'all'
        ? Math.max(0, targetCard.hp - targetCard.currentHp)
        : rule.amount + (rule.amountPerHead || 0) * (coinFlips?.heads || 0) + perUnitAmount
      if (amount > 0) results.push({ targetSide, targetId, amount })
      continue
    }

    if (!('side' in rule) || !('amount' in rule)) continue

    const addFromSide = (targetSide: TcgBattleSide) => {
      let cards = rule.zone === 'front'
        ? state[targetSide].front
        : rule.zone === 'play'
          ? [...state[targetSide].front, ...state[targetSide].back]
          : state[targetSide].back
      const candidates = cards.filter((card) =>
        card.currentHp > 0 &&
        card.currentHp < card.hp &&
        (!rule.nameContains || normalizeTcgBattleCardName(card.name).includes(normalizeTcgBattleCardName(rule.nameContains))) &&
        (!rule.excludeAttacker || card.instanceId !== attacker.instanceId),
      )
      cards = rule.sameTypeAsAttacker
        ? candidates.filter((card) => card.types.some((type) => attacker.types.includes(type)))
        : candidates
      const selected = rule.maxTargets ? pickRandomTcgBattleCards(cards, rule.maxTargets, random) : cards
      const amount = typeof rule.amount === 'number'
        ? rule.amount + (rule.amountPerHead || 0) * (coinFlips?.heads || 0)
        : 0
      for (const card of selected) {
        const healing = rule.amount === 'all' ? card.hp - card.currentHp : amount
        if (healing > 0) results.push({ targetSide, targetId: card.instanceId, amount: healing })
      }
    }
    if (rule.side === 'own' || rule.side === 'both') addFromSide(sideKey)
    if (rule.side === 'opponent' || rule.side === 'both') addFromSide(sideKey === 'player' ? 'opponent' : 'player')
  }
  return results
}

function pickRandomTcgBattleCards<T>(cards: T[], count: number, random: () => number): T[] {
  if (count <= 0 || cards.length === 0) return []
  if (count >= cards.length) return [...cards]

  const pool = [...cards]
  const picks: T[] = []
  while (picks.length < count && pool.length > 0) {
    const index = Math.floor(random() * pool.length)
    const [picked] = pool.splice(index, 1)
    picks.push(picked)
  }
  return picks
}

function inferCountedTcgBattleDamage(
  text: string,
  damage: string,
  baseDamage: number,
): TcgBattleDamageRule | null {
  const suffix = damage.slice(String(baseDamage || '').length)
  const isBonus = suffix === '+'
  const isMultiplier = suffix === 'x' || damage === '?' || damage === ''
  const countMatch = matchTcgBattleCountSource(text)
  if (!countMatch) return null

  if (isBonus && countMatch.mode === 'more') {
    return {
      kind: 'count',
      baseDamage,
      perUnitDamage: countMatch.damage,
      source: countMatch.source,
      maxUnits: countMatch.maxUnits,
    }
  }

  if (isMultiplier && countMatch.mode === 'damage') {
    return {
      kind: 'count',
      baseDamage: 0,
      perUnitDamage: countMatch.damage,
      source: countMatch.source,
      maxUnits: countMatch.maxUnits,
    }
  }

  return null
}

function matchTcgBattleCountSource(text: string):
  | {
      mode: 'damage' | 'more'
      damage: number
      source: TcgBattleCountSource
      maxUnits?: number
    }
  | null {
  const unusedEnergyMore = text.match(
    /(?:this attack )?does \d+ damage plus (\d+) more damage for each [a-z]+ energy attached to [a-z0-9' .&-]+ but not used to pay for this attack's energy cost\. extra [a-z]+ energy after the (\d+)(?:st|nd|rd|th) (?:doesn't|don't) count\b/,
  )
  if (unusedEnergyMore) {
    return {
      mode: 'more',
      damage: Number.parseInt(unusedEnergyMore[1], 10),
      source: { kind: 'unusedEnergy' },
      maxUnits: Number.parseInt(unusedEnergyMore[2], 10),
    }
  }

  const ownBenchMore = text.match(/this attack does (\d+) more damage for each of your benched pokemon\b/)
  if (ownBenchMore) {
    return {
      mode: 'more',
      damage: Number.parseInt(ownBenchMore[1], 10),
      source: { kind: 'bench', side: 'own' },
    }
  }

  const opponentBenchMore = text.match(
    /this attack does (\d+) more damage for each of your opponent's benched pokemon\b/,
  )
  if (opponentBenchMore) {
    return {
      mode: 'more',
      damage: Number.parseInt(opponentBenchMore[1], 10),
      source: { kind: 'bench', side: 'opponent' },
    }
  }

  const bothBenchMore = text.match(
    /this attack does (\d+) more damage for each benched pokemon \(both yours and your opponent's\)\b/,
  )
  if (bothBenchMore) {
    return {
      mode: 'more',
      damage: Number.parseInt(bothBenchMore[1], 10),
      source: { kind: 'bench', side: 'both' },
    }
  }

  const selfCounterMore = text.match(/this attack does (\d+) more damage for each damage counter on this pokemon\b/)
  if (selfCounterMore) {
    return {
      mode: 'more',
      damage: Number.parseInt(selfCounterMore[1], 10),
      source: { kind: 'damageCounters', target: 'attacker' },
    }
  }

  const targetCounterMore = text.match(
    /this attack does (\d+) more damage for each damage counter on your opponent's active pokemon\b/,
  )
  if (targetCounterMore) {
    return {
      mode: 'more',
      damage: Number.parseInt(targetCounterMore[1], 10),
      source: { kind: 'damageCounters', target: 'target' },
    }
  }

  const ownBenchDamage =
    text.match(/this attack does (\d+) damage for each of your benched pokemon\b/) ||
    text.match(/does (\d+) damage times the number of your benched pokemon\b/)
  if (ownBenchDamage) {
    return {
      mode: 'damage',
      damage: Number.parseInt(ownBenchDamage[1], 10),
      source: { kind: 'bench', side: 'own' },
    }
  }

  const opponentBenchDamage =
    text.match(/this attack does (\d+) damage for each of your opponent's benched pokemon\b/) ||
    text.match(/does (\d+) damage times the number of your opponent's benched pokemon\b/)
  if (opponentBenchDamage) {
    return {
      mode: 'damage',
      damage: Number.parseInt(opponentBenchDamage[1], 10),
      source: { kind: 'bench', side: 'opponent' },
    }
  }

  const selfCounterDamage =
    text.match(/this attack does (\d+) damage for each damage counter on this pokemon\b/) ||
    text.match(/does (\d+) damage times the number of damage counters on this pokemon\b/)
  if (selfCounterDamage) {
    return {
      mode: 'damage',
      damage: Number.parseInt(selfCounterDamage[1], 10),
      source: { kind: 'damageCounters', target: 'attacker' },
    }
  }

  const targetCounterDamage = text.match(
    /this attack does (\d+) damage for each damage counter on your opponent's active pokemon\b/,
  )
  if (targetCounterDamage) {
    return {
      mode: 'damage',
      damage: Number.parseInt(targetCounterDamage[1], 10),
      source: { kind: 'damageCounters', target: 'target' },
    }
  }

  const ownPokemonInPlay = text.match(/this attack does (\d+) damage for each of your pokemon in play\b/)
  if (ownPokemonInPlay) {
    return {
      mode: 'damage',
      damage: Number.parseInt(ownPokemonInPlay[1], 10),
      source: { kind: 'pokemonInPlay', side: 'own' },
    }
  }

  const opponentPokemonInPlay = text.match(
    /this attack does (\d+) damage for each of your opponent's pokemon in play\b/,
  )
  if (opponentPokemonInPlay) {
    return {
      mode: 'damage',
      damage: Number.parseInt(opponentPokemonInPlay[1], 10),
      source: { kind: 'pokemonInPlay', side: 'opponent' },
    }
  }

  return null
}

function inferTcgBattleSelfDamage(text: string): TcgBattleSelfDamageRule[] {
  const perCounter = text.match(
    /(?:this pokemon|[a-z0-9' .&♀♂-]+)(?: also)? does (\d+) damage to itself for each damage counter on it\b/,
  )
  if (perCounter) {
    return [{ kind: 'damageCounters', perCounterDamage: Number.parseInt(perCounter[1], 10) }]
  }

  const tailsDamage = text.match(
    /flip a coin\. if tails, (?:this pokemon|[a-z0-9' .&♀♂-]+)(?: also)? does (\d+) damage to itself\b/,
  )
  if (tailsDamage) {
    return [{ kind: 'fixed', amount: Number.parseInt(tailsDamage[1], 10), condition: 'tails' }]
  }

  const oldTailsDamage = text.match(
    /if tails, this attack does \d+ damage(?: plus)?(?: and| plus) (?:this pokemon|[a-z0-9' .&♀♂-]+) does (\d+) damage to itself\b/,
  )
  if (oldTailsDamage) {
    return [{ kind: 'fixed', amount: Number.parseInt(oldTailsDamage[1], 10), condition: 'tails' }]
  }

  const headsDamage = text.match(
    /flip a coin\. if heads, (?:this pokemon|[a-z0-9' .&♀♂-]+)(?: also)? does (\d+) damage to itself\b/,
  )
  if (headsDamage) {
    return [{ kind: 'fixed', amount: Number.parseInt(headsDamage[1], 10), condition: 'heads' }]
  }

  const fixedDamage = text.match(/(?:this pokemon|[a-z0-9' .&♀♂-]+)(?: also)? does (\d+) damage to itself\b/)
  if (fixedDamage) {
    return [{ kind: 'fixed', amount: Number.parseInt(fixedDamage[1], 10) }]
  }

  return []
}

function hasConditionalSelfDamage(rules: TcgBattleSelfDamageRule[]): boolean {
  return rules.some((rule) => Boolean('condition' in rule && rule.condition))
}

function inferTcgBattleEnergyDiscard(text: string): TcgBattleEnergyDiscardRule[] {
  const rules: TcgBattleEnergyDiscardRule[] = []
  const sentences = text.split(/\.\s*/)

  for (const sentence of sentences) {
    if (!sentence || /\byou may discard\b/.test(sentence)) continue
    const condition = inferTcgBattleCoinCondition(sentence)
    const discardMatch = sentence.match(
      /\bdiscard (?:(all|an?|one|\d+) )?(?:[a-z]+ )?energy(?: cards?)?(?: attached to| from) ([^.]+)/,
    )
    if (!discardMatch) continue

    const target = getTcgBattleEnergyDiscardTarget(discardMatch[2])
    if (!target) continue

    rules.push({
      target,
      amount: parseTcgBattleEnergyDiscardAmount(discardMatch[1]),
      condition,
    })
  }

  return rules
}

function parseTcgBattleEnergyDiscardAmount(value: string | undefined): number | 'all' {
  if (!value || value === 'a' || value === 'an' || value === 'one') return 1
  if (value === 'all') return 'all'
  return Math.max(1, Number.parseInt(value, 10) || 1)
}

function getTcgBattleEnergyDiscardTarget(text: string): TcgBattleEnergyDiscardRule['target'] | null {
  if (/\b(?:opponent|defending pokemon)\b/.test(text)) return 'opponent'
  if (/\b(?:this pokemon|itself|it|this card)\b/.test(text)) return 'self'
  return 'self'
}

function hasConditionalEnergyDiscard(rules: TcgBattleEnergyDiscardRule[]): boolean {
  return rules.some((rule) => Boolean(rule.condition))
}

function hasNonSelfTcgBattleEnergyDiscard(rules: TcgBattleEnergyDiscardRule[]): boolean {
  return rules.some((rule) => rule.target !== 'self')
}

function inferTcgBattleStatus(text: string): TcgBattleStatusRule[] {
  const rules: TcgBattleStatusRule[] = []
  const sentences = text.split(/\.\s*/)

  for (const sentence of sentences) {
    if (!sentence || /\bcan't be (?:asleep|poisoned|burned|paralyzed|confused)\b/.test(sentence)) continue
    const condition = inferTcgBattleCoinCondition(sentence)
    if (sentence.startsWith('if ') && !condition) continue

    const statuses = getTcgBattleStatusesFromText(sentence)
    if (statuses.length === 0) continue

    const target = getTcgBattleStatusTarget(sentence)
    if (!target) continue

    rules.push({ target, statuses, condition })
  }

  return rules
}

function inferTcgBattleProtection(text: string): TcgBattleProtectionRule[] {
  const rules: TcgBattleProtectionRule[] = []
  const sentences = text.split(/\.\s*/)

  for (const sentence of sentences) {
    if (!sentence) continue
    const condition = inferTcgBattleCoinCondition(sentence)
    if (sentence.startsWith('if ') && !condition) continue

    const preventAllSelf = /prevent all damage done to (?:this pokemon|[a-z0-9' .&-]+) during your opponent's next turn\b/.test(
      sentence,
    )
    if (preventAllSelf) {
      rules.push({ target: 'self', kind: 'preventAll', condition })
      continue
    }

    const reduceSelf = sentence.match(
      /all damage done by attacks to (?:this pokemon|[a-z0-9' .&-]+) during your opponent's next turn is reduced by (\d+)\b/,
    )
    if (reduceSelf) {
      rules.push({
        target: 'self',
        kind: 'reduce',
        amount: Number.parseInt(reduceSelf[1], 10),
        condition,
      })
      continue
    }

    if (/whenever (?:this pokemon|[a-z0-9' .&-]+) takes damage, divide that damage in half\b/.test(sentence)) {
      rules.push({ target: 'self', kind: 'halve' })
    }
  }

  return rules
}

function getTcgBattleStatusesFromText(text: string): TcgBattleStatusCondition[] {
  if (
    !(
      /\b(?:is|are|become|becomes) now (?:asleep|poisoned|burned|paralyzed|confused)\b/.test(text) ||
      /\b(?:leave|make) .*\b(?:asleep|poisoned|burned|paralyzed|confused)\b/.test(text)
    )
  ) {
    return []
  }

  const statuses: TcgBattleStatusCondition[] = []
  if (/\basleep\b/.test(text)) statuses.push('asleep')
  if (/\bpoisoned\b/.test(text)) statuses.push('poisoned')
  if (/\bburned\b/.test(text)) statuses.push('burned')
  if (/\bparalyzed\b/.test(text)) statuses.push('paralyzed')
  if (/\bconfused\b/.test(text)) statuses.push('confused')
  return statuses
}

function getTcgBattleStatusTarget(text: string): TcgBattleStatusRule['target'] | null {
  if (/\b(?:your opponent's active pokemon|defending pokemon|new active pokemon|that pokemon)\b/.test(text)) {
    return 'opponent'
  }
  if (/\b(?:this pokemon|itself|this card)\b/.test(text)) return 'self'
  return null
}

function hasConditionalStatus(rules: TcgBattleStatusRule[]): boolean {
  return rules.some((rule) => Boolean(rule.condition))
}

function hasConditionalProtection(rules: TcgBattleProtectionRule[]): boolean {
  return rules.some((rule) => Boolean(rule.condition))
}

function calculateTcgBattleProtection(
  rules: TcgBattleProtectionRule[],
  sideKey: TcgBattleSide,
  attacker: TcgBattleCardState,
  target: TcgBattleCardState,
  coinFlips?: TcgBattleAttackResolution['coinFlips'],
) {
  const applied: {
    targetSide: TcgBattleSide
    targetId: string
    modifier: TcgBattleIncomingAttackModifier
  }[] = []

  for (const rule of rules) {
    if (!doesTcgBattleConditionPass(rule.condition, coinFlips)) continue
    const targetSide = rule.target === 'self' ? sideKey : sideKey === 'player' ? 'opponent' : 'player'
    const targetId = rule.target === 'self' ? attacker.instanceId : target.instanceId
    if (rule.kind === 'preventAll' || rule.kind === 'preventAllEffects') {
      applied.push({
        targetSide,
        targetId,
        modifier: { kind: rule.kind, remainingOpponentTurns: 1 },
      })
    } else if (rule.kind === 'coinPreventDamage') {
      applied.push({
        targetSide,
        targetId,
        modifier: {
          kind: 'coinPreventDamage',
          preventOn: rule.preventOn || 'tails',
          remainingOpponentTurns: rule.persistent ? 99 : 1,
          persistent: rule.persistent,
          reflectDamage: rule.reflectDamage,
        },
      })
    } else if (rule.kind === 'reduce') {
      applied.push({
        targetSide,
        targetId,
        modifier: {
          kind: 'reduce',
          amount: Math.max(0, rule.amount || 0),
          remainingOpponentTurns: 1,
          attackerId: rule.attackerOnly ? target.instanceId : undefined,
        },
      })
    } else if (rule.kind === 'preventAtMost') {
      applied.push({
        targetSide,
        targetId,
        modifier: {
          kind: 'preventAtMost',
          amount: Math.max(0, rule.amount || 0),
          remainingOpponentTurns: 1,
        },
      })
    } else if (rule.kind === 'preventAtLeast') {
      applied.push({
        targetSide,
        targetId,
        modifier: {
          kind: 'preventAtLeast',
          amount: Math.max(0, rule.amount || 0),
          remainingOpponentTurns: 1,
        },
      })
    } else {
      applied.push({ targetSide, targetId, modifier: { kind: 'halve', remainingOpponentTurns: 1 } })
    }
  }

  return applied
}

export function getTcgBattleAttackEffect(attack: TcgBattleAttack): TcgBattleAttackEffect | null {
  if (!attack.battleEffect) return inferTcgBattleAttackEffect(attack)

  // Battles already in progress can carry an effect inferred before the text
  // bypass rule was added. Refresh this one flag without rebuilding the rest
  // of the persisted attack effect.
  return shouldIgnoreTcgWeaknessAndResistance(
    normalizeTcgAttackText(attack.text || ''),
  ) && !attack.battleEffect.ignoreWeaknessResistance
    ? { ...attack.battleEffect, ignoreWeaknessResistance: true }
    : attack.battleEffect
}

export function getValidTcgBattleTargets(
  state: TcgBattleState,
  sideKey: TcgBattleSide,
  attacker: TcgBattleCardState,
  attack: TcgBattleAttack,
): TcgBattleCardState[] {
  const effect = getTcgBattleAttackEffect(attack)
  if (!effect) return []
  if (effect.attackerMustBeDamaged && attacker.currentHp >= attacker.hp) return []
  const opponentKey = sideKey === 'player' ? 'opponent' : 'player'
  const scope = effect.targetScope || 'front'
  const candidates = scope === 'front'
    ? state[opponentKey].front
    : scope === 'bench'
      ? state[opponentKey].back
      : scope === 'all'
        ? [...state.player.front, ...state.player.back, ...state.opponent.front, ...state.opponent.back]
        : [...state[opponentKey].front, ...state[opponentKey].back]
  const lowestRemainingHp = effect.targetMustBeLowestRemainingHp
    ? Math.min(
        ...[...state.player.front, ...state.player.back, ...state.opponent.front, ...state.opponent.back]
          .filter((card) => card.currentHp > 0 && card.instanceId !== attacker.instanceId)
          .map((card) => card.currentHp),
      )
    : undefined
  return candidates.filter((card) => {
    if (card.currentHp <= 0) return false
    if (scope === 'all' && card.instanceId === attacker.instanceId) return false
    if (effect.targetMustBeDamaged && card.currentHp >= card.hp) return false
    if (effect.targetMustBeUndamaged && card.currentHp < card.hp) return false
    if (effect.targetMustHaveSubtype && !card.subtypes.some((subtype) => subtype.toLowerCase() === effect.targetMustHaveSubtype?.toLowerCase())) return false
    if (effect.targetMustNotHaveSubtype && card.subtypes.some((subtype) => subtype.toLowerCase() === effect.targetMustNotHaveSubtype?.toLowerCase())) return false
    if (lowestRemainingHp !== undefined && card.currentHp !== lowestRemainingHp) return false
    if (effect.targetMustHaveDeltaMark && !card.name.includes('δ')) return false
    if (attacker.temporaryEffects?.cannotTarget?.targetId === card.instanceId) return false
    const markerRule = effect.special?.find((rule) => rule.kind === 'markerDamage')
    if (markerRule?.kind === 'markerDamage' && !card.markers?.includes(markerRule.marker)) return false
    if (effect.special?.some((rule) => rule.kind === 'changeWeakness') && card.weaknesses.length === 0) return false
    return true
  })
}

export function isTcgBattleAttackDisabled(card: TcgBattleCardState, attackIndex: number): boolean {
  return Boolean(card.temporaryEffects?.cannotAttack) || card.temporaryEffects?.disabledAttack?.attackIndex === attackIndex
}

export function validateTcgBattleAttackChoice(params: {
  state: TcgBattleState
  sideKey: TcgBattleSide
  attacker: TcgBattleCardState
  attack: TcgBattleAttack
  target: TcgBattleCardState
  choice?: TcgBattleAttackChoice
  paidAttackCost: number
}): string | null {
  const { state, sideKey, attacker, attack, target, choice, paidAttackCost } = params
  const effect = getTcgBattleAttackEffect(attack)
  if (!effect) return 'That attack is not supported.'
  const validTargets = getValidTcgBattleTargets(state, sideKey, attacker, attack)
  if (!validTargets.some((card) => card.instanceId === target.instanceId)) return 'Invalid target for that attack.'

  const required = effect.choiceRequirement
  if (!required) return choice ? 'That attack does not accept an extra choice.' : null
  const own = state[sideKey]
  const opponent = state[sideKey === 'player' ? 'opponent' : 'player']
  if (own.energy - paidAttackCost < (effect.minimumExtraEnergyDiscard || 0)) {
    return 'That attack needs more Energy available to pay its extra discard cost.'
  }
  if (!choice) {
    if (required === 'optionalOpponentBench' && opponent.back.every((card) => card.currentHp <= 0)) return null
    if (required === 'optionalOwnBench' && own.back.every((card) => card.currentHp <= 0)) return null
    if (required === 'ownBench' && own.back.every((card) => card.currentHp <= 0)) return null
    if (required === 'damageCounterTransfer') {
      const transferRule = effect.special?.find((entry) => entry.kind === 'transferDamageCounters')
      const sourceCards = transferRule?.kind === 'transferDamageCounters' && transferRule.sourceZone === 'bench'
        ? own.back
        : [...own.front, ...own.back]
      if (sourceCards.every((card) => card.currentHp <= 0 || card.currentHp >= card.hp)) return null
    }
    if (required === 'discardHandCards' && own.hand.length === 0) return null
    if (required === 'discardPokemonToHand') {
      const rule = effect.special?.find((entry) => entry.kind === 'recoverPokemonFromDiscardToHand')
      if (rule?.kind === 'recoverPokemonFromDiscardToHand' && rule.upTo) return null
      if (rule?.kind === 'recoverPokemonFromDiscardToHand' &&
        !own.discard.some((card) =>
          (!rule.includeSubtypes?.length || rule.includeSubtypes.some((subtype) => card.subtypes.includes(subtype))) &&
          (!rule.includeNames?.length || rule.includeNames.includes(card.name)) &&
          (!rule.includeTypes?.length || rule.includeTypes.some((type) => card.types.includes(type))),
        )) return null
    }
    if (required === 'discardPokemon') {
      const rule = effect.special?.find((entry) => entry.kind === 'reviveDiscardPokemon')
      const candidateSides: TcgBattleSide[] = rule?.kind === 'reviveDiscardPokemon' && rule.side
        ? [rule.side === 'self' ? sideKey : sideKey === 'player' ? 'opponent' : 'player']
        : [sideKey, sideKey === 'player' ? 'opponent' : 'player']
      const canRevive = candidateSides.some((candidateSide) => {
        const owner = state[candidateSide]
        return owner.back.length < 3 && getLivingTcgBattleCards(owner).length < 6 &&
          owner.discard.some((card) => card.subtypes.includes('Basic'))
      })
      if (!canRevive) return null
    }
    return 'Choose how that attack should resolve.'
  }
  const validType = (type: TcgBattleEnergyType | undefined) => Boolean(type && type !== 'Colorless')

  if (required === 'counterDistribution') {
    if (choice.kind !== 'counterDistribution') return 'Assign all damage counters to opposing Pokémon.'
    const expectedCounters = effect.choiceCounterCountFrom
      ? getTcgBattleCount(effect.choiceCounterCountFrom, { state, sideKey, attacker, target, coinMode: 'actual' })
      : effect.choiceCounterCount || 0
    const livingOpponentIds = new Set(
      [...opponent.front, ...opponent.back]
        .filter((card) => card.currentHp > 0)
        .map((card) => card.instanceId),
    )
    const totalCounters = choice.assignments.reduce((sum, assignment) => sum + assignment.counters, 0)
    return (expectedCounters === 0
      ? choice.assignments.length === 0
      : choice.assignments.length > 0 &&
        totalCounters === expectedCounters &&
        new Set(choice.assignments.map((assignment) => assignment.cardId)).size === choice.assignments.length &&
        choice.assignments.every((assignment) =>
          livingOpponentIds.has(assignment.cardId) && Number.isInteger(assignment.counters) && assignment.counters > 0,
        ))
      ? null
      : `Assign exactly ${expectedCounters} damage counters among living opposing Pokémon.`
  }

  if (required === 'damageCounterTransfer') {
    if (choice.kind !== 'damageCounterTransfer') return 'Choose a damaged Pokémon to move counters from.'
    const transferRule = effect.special?.find((entry) => entry.kind === 'transferDamageCounters')
    const sourceCards = transferRule?.kind === 'transferDamageCounters' && transferRule.sourceZone === 'bench'
      ? own.back
      : [...own.front, ...own.back]
    if (!choice.sourceCardId) {
      return sourceCards.some((card) => card.currentHp > 0 && card.currentHp < card.hp)
        ? 'Choose a damaged Pokémon to move counters from.'
        : null
    }
    return sourceCards.some((card) =>
      card.instanceId === choice.sourceCardId && card.currentHp > 0 && card.currentHp < card.hp,
    ) ? null : 'Choose a damaged Pokémon to move counters from.'
  }

  if (required === 'discardHandCards') {
    if (choice.kind !== 'discardHandCards') return 'Choose which Pokémon to discard from your hand.'
    if (
      typeof effect.choiceHandCardCount === 'number' &&
      choice.cardIds.length !== Math.min(effect.choiceHandCardCount, own.hand.length)
    ) {
      return `Choose ${effect.choiceHandCardCount} Pokémon to discard.`
    }
    const handIds = new Set(own.hand.map((card) => card.instanceId))
    return new Set(choice.cardIds).size === choice.cardIds.length &&
      choice.cardIds.every((cardId) => handIds.has(cardId))
      ? null
      : 'Choose Pokémon currently in your hand.'
  }

  if (required === 'ownPokemon') {
    if (choice.kind !== 'ownPokemon') return 'Choose one of your Pokémon to heal.'
    return [...own.front, ...own.back].some((card) =>
      card.instanceId === choice.cardId && card.currentHp > 0,
    ) ? null : 'Choose one of your living Pokémon.'
  }
  if (required === 'discardPokemonToHand') {
    if (choice.kind !== 'discardPokemonToHand') return 'Choose a Pokémon from your discard pile.'
    const rule = effect.special?.find((entry) => entry.kind === 'recoverPokemonFromDiscardToHand')
    if (rule?.kind !== 'recoverPokemonFromDiscardToHand') return 'That attack cannot recover a Pokémon.'
    const selectedIds = choice.cardIds || (choice.cardId ? [choice.cardId] : [])
    const eligible = own.discard.filter((card) =>
      (!rule.includeSubtypes?.length || rule.includeSubtypes.some((subtype) => card.subtypes.includes(subtype))) &&
      (!rule.includeNames?.length || rule.includeNames.includes(card.name)) &&
      (!rule.includeTypes?.length || rule.includeTypes.some((type) => card.types.includes(type))),
    )
    const eligibleIds = new Set(eligible.map((card) => card.instanceId))
    const maxCount = Math.min(rule.maxCount ?? 1, eligible.length)
    return (rule.upTo ? selectedIds.length <= maxCount : selectedIds.length === maxCount) &&
      new Set(selectedIds).size === selectedIds.length &&
      selectedIds.every((cardId) => eligibleIds.has(cardId))
      ? null
      : 'Choose the required number of eligible Pokémon from your discard pile.'
  }

  if (required === 'deckPokemon') {
    if (choice.kind !== 'deckPokemon') return 'Choose Pokémon from your deck.'
    const rule = effect.special?.find((entry) => entry.kind === 'searchDeckPokemon')
    if (rule?.kind !== 'searchDeckPokemon') return 'That attack cannot search the deck.'
    const available = getAvailableTcgBattleDeckPokemon(own, rule)
    const eligibleIds = new Set(available.map((card) => card.id))
    const maxCount = Math.min(
      getTcgBattleDeckSearchMaxCount({ state, sideKey, attacker, target, rule }),
      rule.destination === 'hand' ? Number.POSITIVE_INFINITY : getOpenTcgBattleBenchSlots(own),
    )
    if (
      choice.cardIds.length > maxCount ||
      new Set(choice.cardIds).size !== choice.cardIds.length ||
      choice.cardIds.some((cardId) => !eligibleIds.has(cardId)) ||
      (rule.oneOfEachName && new Set(
        choice.cardIds.map((cardId) => normalizeTcgBattleCardName(available.find((card) => card.id === cardId)?.name || '')),
      ).size !== choice.cardIds.length)
    ) {
      return 'Choose eligible Pokémon that fit on your Bench.'
    }
    return null
  }
  if (required === 'optionalBonus') {
    return choice.kind === 'optionalBonus' && typeof choice.enabled === 'boolean'
      ? null
      : 'Choose whether to take the optional bonus.'
  }
  if (required === 'statusCondition') {
    const constrainedStatuses = effect.status
      ?.filter((rule) => rule.useChosenStatus)
      .flatMap((rule) => rule.statuses)
    const allowedStatuses = constrainedStatuses?.length
      ? [...new Set(constrainedStatuses)]
      : ['asleep', 'poisoned', 'burned', 'paralyzed', 'confused']
    return choice.kind === 'statusCondition' &&
      allowedStatuses.includes(choice.status)
      ? null
      : 'Choose a Special Condition.'
  }
  if (required === 'statusPair') {
    return choice.kind === 'statusPair' &&
      ['burned', 'poisoned'].includes(choice.first) &&
      ['asleep', 'confused'].includes(choice.second)
      ? null
      : 'Choose one Special Condition from each group.'
  }

  if (required === 'copyAttack') {
    if (choice.kind !== 'copiedAttack') return 'Choose an attack to copy.'
    const copied = target.attacks[choice.attackIndex]
    const copiedEffect = copied && getTcgBattleAttackEffect(copied)
    if (!copied || !copiedEffect || copiedEffect.special?.some((rule) => rule.kind === 'copyAttack')) {
      return 'That attack cannot be copied.'
    }
    if (copiedEffect.choiceRequirement) {
      const nestedError = validateTcgBattleAttackChoice({
        state,
        sideKey,
        attacker,
        attack: copied,
        target,
        choice: choice.followUp,
        paidAttackCost: 0,
      })
      if (nestedError) return nestedError
    }
    return null
  }
  if (required === 'disableAttack') {
    return choice.kind === 'disabledAttack' && target.attacks[choice.attackIndex]
      ? null
      : 'Choose a valid opposing attack.'
  }
  if (required === 'discardPokemon') {
    if (choice.kind !== 'discardPokemon') return 'Choose a Basic Pokémon from a discard pile.'
    if (choice.side !== 'player' && choice.side !== 'opponent') return 'Choose a valid discard pile.'
    const rule = effect.special?.find((entry) => entry.kind === 'reviveDiscardPokemon')
    const expectedSide = rule?.kind === 'reviveDiscardPokemon' && rule.side
      ? rule.side === 'self' ? sideKey : sideKey === 'player' ? 'opponent' : 'player'
      : undefined
    if (expectedSide && choice.side !== expectedSide) return 'Choose a Basic Pokémon from the correct discard pile.'
    const owner = state[choice.side]
    const card = owner.discard.find((entry) => entry.instanceId === choice.cardId)
    if (!card?.subtypes.includes('Basic')) return 'Choose a Basic Pokémon from a discard pile.'
    if (owner.back.length >= 3 || getLivingTcgBattleCards(owner).length >= 6) {
      return 'That side has no room on its Bench.'
    }
    return null
  }
  if (required === 'opponentBench' || required === 'ownBench' || required === 'optionalOpponentBench' || required === 'optionalOwnBench') {
    const switchOnlyAfterCounterDamage = required === 'opponentBench' &&
      effect.special?.some((rule) => rule.kind === 'switch' && rule.target === 'opponent' && rule.ifCounterDamage)
    const willApplyCounterDamage = effect.counterDamage?.some((rule) =>
      'amountToLeaveHp' in rule && target.currentHp > rule.amountToLeaveHp,
    )
    if (
      switchOnlyAfterCounterDamage &&
      (!willApplyCounterDamage || opponent.back.every((card) => card.currentHp <= 0))
    ) return null
    if (choice.kind === 'skipBenchSwitch') {
      const switchTarget = required === 'optionalOwnBench' ? 'self' : 'opponent'
      return (required === 'optionalOwnBench' || required === 'optionalOpponentBench') &&
        effect.special?.some((rule) => rule.kind === 'switch' && rule.target === switchTarget && rule.optional)
        ? null
        : 'Choose a living benched card.'
    }
    if (choice.kind !== 'benchSwitch') return 'Choose a benched card.'
    const bench = required === 'ownBench' || required === 'optionalOwnBench' ? own.back : opponent.back
    const selected = bench.find((card) => card.instanceId === choice.cardId && card.currentHp > 0)
    if (!selected) return 'Choose a living benched card.'
    const sameTypeHealing = effect.healing?.some((rule) =>
      'target' in rule && rule.target === 'selectedOwnBench' && rule.sameTypeAsAttacker,
    )
    if (required === 'ownBench' && sameTypeHealing && !selected.types.some((type) => attacker.types.includes(type))) {
      return 'Choose a benched Pokémon that shares a type with the attacker.'
    }
    return null
  }
  if (required === 'energyAmount') {
    const available = Math.min(
      Math.max(0, own.energy - paidAttackCost),
      effect.choiceEnergyMax ?? Number.POSITIVE_INFINITY,
    )
    return choice.kind === 'energyAmount' &&
      Number.isInteger(choice.amount) &&
      choice.amount >= 0 &&
      choice.amount <= available &&
      (!effect.choiceEnergyType || choice.amount === 0 || own.selectedEnergy === effect.choiceEnergyType)
      ? null
      : 'Choose an available Energy amount.'
  }
  if (required === 'typeChange') {
    return choice.kind === 'typeChange' && validType(choice.type) ? null : 'Choose a non-Colorless type.'
  }
  if (required === 'textureMagic') {
    if (choice.kind !== 'textureMagic') return 'Choose Texture Magic types.'
    if (!choice.resistanceType && !choice.weaknessType) return 'Choose at least one type.'
    if ((choice.resistanceType && !validType(choice.resistanceType)) || (choice.weaknessType && !validType(choice.weaknessType))) {
      return 'Texture Magic cannot choose Colorless.'
    }
    return null
  }
  return null
}

export function chooseTcgBattleAttackChoice(params: {
  state: TcgBattleState
  sideKey: TcgBattleSide
  attacker: TcgBattleCardState
  attack: TcgBattleAttack
  target: TcgBattleCardState
  paidAttackCost: number
}): TcgBattleAttackChoice | undefined {
  const { state, sideKey, attacker, attack, target, paidAttackCost } = params
  const effect = getTcgBattleAttackEffect(attack)
  const required = effect?.choiceRequirement
  if (!required) return undefined
  if (required === 'damageCounterTransfer') {
    const transferRule = effect?.special?.find((rule) => rule.kind === 'transferDamageCounters')
    const sourceCards = transferRule?.kind === 'transferDamageCounters' && transferRule.sourceZone === 'bench'
      ? state[sideKey].back
      : [...state[sideKey].front, ...state[sideKey].back]
    const source = sourceCards
      .filter((card) => card.currentHp > 0 && card.currentHp < card.hp)
      .sort((a, b) => (b.hp - b.currentHp) - (a.hp - a.currentHp))[0]
    return { kind: 'damageCounterTransfer', sourceCardId: source?.instanceId }
  }
  if (required === 'discardHandCards') {
    const handIds = state[sideKey].hand.map((card) => card.instanceId)
    const count = effect?.choiceHandCardCount
    return { kind: 'discardHandCards', cardIds: count === undefined ? handIds : handIds.slice(0, count) }
  }
  if (required === 'ownPokemon') {
    const picked = [...state[sideKey].front, ...state[sideKey].back]
      .filter((card) => card.currentHp > 0)
      .sort((a, b) => (b.hp - b.currentHp) - (a.hp - a.currentHp))[0] || attacker
    return { kind: 'ownPokemon', cardId: picked.instanceId }
  }
  if (required === 'counterDistribution') {
    const counters = effect?.choiceCounterCountFrom
      ? getTcgBattleCount(effect.choiceCounterCountFrom, { state, sideKey, attacker, target, coinMode: 'actual' })
      : effect?.choiceCounterCount || 0
    return {
      kind: 'counterDistribution',
      assignments: counters > 0 ? [{ cardId: target.instanceId, counters }] : [],
    }
  }
  if (required === 'discardPokemonToHand') {
    const rule = effect?.special?.find((entry) => entry.kind === 'recoverPokemonFromDiscardToHand')
    if (rule?.kind !== 'recoverPokemonFromDiscardToHand') return undefined
    const eligible = state[sideKey].discard
      .filter((card) =>
        (!rule.includeSubtypes?.length || rule.includeSubtypes.some((subtype) => card.subtypes.includes(subtype))) &&
        (!rule.includeNames?.length || rule.includeNames.includes(card.name)) &&
        (!rule.includeTypes?.length || rule.includeTypes.some((type) => card.types.includes(type))),
      )
      .sort((a, b) => b.hp - a.hp)
      .slice(0, rule.maxCount ?? 1)
    return eligible.length > 0
      ? { kind: 'discardPokemonToHand', cardIds: eligible.map((card) => card.instanceId) }
      : undefined
  }
  if (required === 'deckPokemon') {
    const rule = effect?.special?.find((entry) => entry.kind === 'searchDeckPokemon')
    if (rule?.kind !== 'searchDeckPokemon') return undefined
    const side = state[sideKey]
    const maxCount = Math.min(
      getTcgBattleDeckSearchMaxCount({ state, sideKey, attacker, target, rule }),
      rule.destination === 'hand' ? Number.POSITIVE_INFINITY : getOpenTcgBattleBenchSlots(side),
    )
    const available = getAvailableTcgBattleDeckPokemon(side, rule)
      .sort((a, b) => getCardBattleScore(b) - getCardBattleScore(a) || a.name.localeCompare(b.name))
    const selected: typeof available = []
    const selectedNames = new Set<string>()
    for (const card of available) {
      const normalizedName = normalizeTcgBattleCardName(card.name)
      if (rule.oneOfEachName && selectedNames.has(normalizedName)) continue
      selected.push(card)
      selectedNames.add(normalizedName)
      if (selected.length >= maxCount) break
    }
    const cardIds = selected.map((card) => card.id)
    return { kind: 'deckPokemon', cardIds }
  }
  if (required === 'optionalBonus') {
    const damageRule = effect?.damage
    const recoil = effect?.selfDamage?.find((rule) => rule.kind === 'optionalChoice')
    const enabled = damageRule?.kind === 'optionalCoinDamage'
      ? target.currentHp > damageRule.baseDamage
      : damageRule?.kind === 'optionalChoiceBonus' &&
        attacker.currentHp > (recoil?.kind === 'optionalChoice' ? recoil.amount : 0) &&
        target.currentHp > damageRule.baseDamage &&
        target.currentHp <= damageRule.baseDamage + damageRule.bonusDamage
    return { kind: 'optionalBonus', enabled }
  }
  if (required === 'statusCondition') return { kind: 'statusCondition', status: 'paralyzed' }
  if (required === 'statusPair') return { kind: 'statusPair', first: 'poisoned', second: 'confused' }
  if (required === 'copyAttack') {
    const candidates = target.attacks
      .map((candidate, attackIndex) => {
        const candidateEffect = getTcgBattleAttackEffect(candidate)
        const followUp = candidateEffect
          ? chooseTcgBattleAttackChoice({
              state,
              sideKey,
              attacker,
              attack: candidate,
              target,
              paidAttackCost: 0,
            })
          : undefined
        const validTarget = getValidTcgBattleTargets(
          state,
          sideKey,
          attacker,
          candidate,
        ).some((card) => card.instanceId === target.instanceId)
        return {
          attackIndex,
          attack: candidate,
          candidateEffect,
          followUp,
          validTarget,
          damage: calculateTcgBattleDamage(
            attacker,
            candidate,
            target,
            state,
            sideKey,
          ),
        }
      })
      .filter(
        ({ candidateEffect, followUp, validTarget }) =>
          candidateEffect &&
          validTarget &&
          !candidateEffect.special?.some((rule) => rule.kind === 'copyAttack') &&
          (!candidateEffect.choiceRequirement || followUp),
      )
      .sort((a, b) => b.damage - a.damage)
    const picked = candidates[0]
    if (!picked) return undefined
    return {
      kind: 'copiedAttack',
      attackIndex: picked.attackIndex,
      followUp: picked.followUp,
    }
  }
  if (required === 'disableAttack') {
    let bestIndex = 0
    let bestDamage = -1
    target.attacks.forEach((candidate, index) => {
      const damage = calculateTcgBattleDamage(target, candidate, attacker, state, sideKey === 'player' ? 'opponent' : 'player')
      if (damage > bestDamage) {
        bestDamage = damage
        bestIndex = index
      }
    })
    return { kind: 'disabledAttack', attackIndex: bestIndex }
  }
  if (required === 'discardPokemon') {
    const opponentKey = sideKey === 'player' ? 'opponent' : 'player'
    const reviveRule = effect?.special?.find((rule) => rule.kind === 'reviveDiscardPokemon')
    const candidateSides: TcgBattleSide[] = reviveRule?.kind === 'reviveDiscardPokemon' && reviveRule.side
      ? [reviveRule.side === 'self' ? sideKey : opponentKey]
      : [sideKey, opponentKey]
    const candidatesFor = (candidateSide: TcgBattleSide) =>
      state[candidateSide].back.length < 3 && getLivingTcgBattleCards(state[candidateSide]).length < 6
        ? state[candidateSide].discard
            .filter((card) => card.subtypes.includes('Basic'))
            .map((card) => ({ side: candidateSide, card }))
            .sort((a, b) => b.card.hp - a.card.hp)
        : []
    const picked = candidateSides.flatMap(candidatesFor)[0]
    return picked
      ? { kind: 'discardPokemon', side: picked.side, cardId: picked.card.instanceId }
      : undefined
  }
  if (required === 'opponentBench' || required === 'ownBench' || required === 'optionalOpponentBench' || required === 'optionalOwnBench') {
    const bench = required === 'ownBench' || required === 'optionalOwnBench'
      ? state[sideKey].back
      : state[sideKey === 'player' ? 'opponent' : 'player'].back
    const selectedOwnBenchHealing = required === 'ownBench' && effect?.healing?.some((rule) =>
      'target' in rule && rule.target === 'selectedOwnBench',
    )
    const sameTypeHealing = required === 'ownBench' && effect?.healing?.some((rule) =>
      'target' in rule && rule.target === 'selectedOwnBench' && rule.sameTypeAsAttacker,
    )
    const picked = [...bench]
      .filter((card) => card.currentHp > 0 && (!sameTypeHealing || card.types.some((type) => attacker.types.includes(type))))
      .sort((a, b) => selectedOwnBenchHealing
        ? (b.hp - b.currentHp) - (a.hp - a.currentHp)
        : b.currentHp - a.currentHp)[0]
    return picked ? { kind: 'benchSwitch', cardId: picked.instanceId } : undefined
  }
  if (required === 'energyAmount') {
    const selectedEnergyMatches = !effect?.choiceEnergyType || state[sideKey].selectedEnergy === effect.choiceEnergyType
    return {
      kind: 'energyAmount',
      amount: selectedEnergyMatches ? Math.min(
        Math.max(0, state[sideKey].energy - paidAttackCost),
        effect?.choiceEnergyMax ?? Number.POSITIVE_INFINITY,
      ) : 0,
    }
  }
  const attackType = normalizeTcgBattleEnergyType(attacker.types[0]) || 'Grass'
  const targetType = normalizeTcgBattleEnergyType(target.types[0]) || 'Grass'
  if (required === 'typeChange') return { kind: 'typeChange', type: attackType === 'Colorless' ? 'Grass' : attackType }
  if (required === 'textureMagic') {
    return {
      kind: 'textureMagic',
      resistanceType: targetType === 'Colorless' ? 'Grass' : targetType,
      weaknessType: attackType === 'Colorless' ? 'Grass' : attackType,
    }
  }
  return undefined
}

export function clearTcgBattleTemporaryEffects(card: TcgBattleCardState) {
  const originalMaxHp = card.temporaryEffects?.originalMaxHp
  if (typeof originalMaxHp === 'number') {
    const damage = Math.max(0, card.hp - card.currentHp)
    card.hp = originalMaxHp
    card.currentHp = Math.max(0, originalMaxHp - damage)
  }
  card.temporaryEffects = undefined
  card.incomingAttackModifier = undefined
}

function rollTcgBattleCoins(
  count: number,
  random: () => number,
): NonNullable<TcgBattleAttackResolution['coinFlips']> {
  const results = Array.from({ length: count }, () => (random() >= 0.5 ? 'heads' : 'tails') as TcgBattleCoinResult)
  const heads = results.filter((result) => result === 'heads').length
  return {
    results,
    heads,
    tails: count - heads,
  }
}

function rollTcgBattleCoinsUntilTails(
  random: () => number,
): NonNullable<TcgBattleAttackResolution['coinFlips']> {
  const results: Array<'heads' | 'tails'> = []
  while (results.length < 20) {
    const result = random() >= 0.5 ? 'heads' : 'tails'
    results.push(result)
    if (result === 'tails') break
  }
  const heads = results.filter((result) => result === 'heads').length
  return { results, heads, tails: results.length - heads }
}

function calculateTcgBattleRawDamage(
  rule: TcgBattleDamageRule,
  context: {
    state?: TcgBattleState
    sideKey?: TcgBattleSide
    attacker: TcgBattleCardState
    target: TcgBattleCardState
    paidAttackCost?: number
    coinFlips?: TcgBattleAttackResolution['coinFlips']
    choice?: TcgBattleAttackChoice
    coinMode: 'actual' | 'max'
  },
): number {
  switch (rule.kind) {
    case 'fixed':
      return rule.amount
    case 'coinCount': {
      const heads = context.coinMode === 'actual'
        ? (context.coinFlips?.heads ?? 0)
        : rule.coinFlipCount
      return rule.exactHeads === undefined || heads === rule.exactHeads
        ? rule.amountPerHeads * heads
        : 0
    }
    case 'conditionalBonus':
      return rule.baseDamage + (doesTcgBattleConditionPass(rule.condition, context.coinFlips) ? rule.bonusDamage : 0)
    case 'optionalCoinDamage':
      if (context.choice?.kind !== 'optionalBonus' || !context.choice.enabled) return rule.baseDamage
      return doesTcgBattleConditionPass(rule.condition, context.coinFlips)
        ? rule.successDamage
        : rule.failureDamage
    case 'zeroOnTails': {
      const tails = context.coinMode === 'actual' ? (context.coinFlips?.tails ?? 0) : 0
      return tails > 0 ? 0 : rule.amount
    }
    case 'zeroIfAnyTails': {
      const tails = context.coinMode === 'actual' ? (context.coinFlips?.tails ?? 0) : 0
      return tails > 0 ? 0 : rule.amount
    }
    case 'headsBonus': {
      const heads = getEstimatedTcgBattleHeads(1, context)
      return rule.baseDamage + (heads > 0 ? rule.bonusDamage : 0)
    }
    case 'headsBonusEach': {
      const heads = getEstimatedTcgBattleHeads(rule.coinFlipCount, context)
      return rule.baseDamage + rule.bonusDamage * heads
    }
    case 'headsMultiplier': {
      const heads = getEstimatedTcgBattleHeads(rule.coinFlipCount, context)
      return rule.damagePerHeads * heads
    }
    case 'tailsBonus': {
      const tails = context.coinMode === 'actual' ? (context.coinFlips?.tails ?? 0) : 1
      return rule.baseDamage + (tails > 0 ? rule.bonusDamage : 0)
    }
    case 'tailsMultiplier': {
      const tails = context.coinMode === 'actual' ? (context.coinFlips?.tails ?? 0) : 1
      return rule.damagePerTails * tails
    }
    case 'count':
      if (rule.optional && !(context.choice?.kind === 'optionalBonus' && context.choice.enabled)) {
        return rule.baseDamage
      }
      return (
        rule.baseDamage +
        rule.perUnitDamage *
          Math.min(
            getTcgBattleCount(rule.source, context),
            typeof rule.maxUnits === 'number' ? rule.maxUnits : Number.POSITIVE_INFINITY,
          )
      )
    case 'gatedCount':
      return getTcgBattleCount(rule.gateSource, context) < rule.minimumGateUnits
        ? 0
        : rule.baseDamage + rule.perUnitDamage * getTcgBattleCount(rule.source, context)
    case 'subtractCount':
      return Math.max(0, rule.baseDamage - rule.perUnitDamage * getTcgBattleCount(rule.source, context))
    case 'remainingHpHalf':
      return Math.ceil(context.target.currentHp / 20) * 10
    case 'remainingHpHalfRoundedDown':
      return Math.floor(context.target.currentHp / 20) * 10
    case 'targetToRemainingHp':
      return doesTcgBattleConditionPass(rule.condition, context.coinFlips)
        ? Math.max(0, context.target.currentHp - rule.remainingHp)
        : 0
    case 'conditionalCount': {
      if (!doesTcgBattleConditionPass(rule.condition, context.coinFlips)) return rule.failureDamage || 0
      const count = getTcgBattleCount(rule.source, context)
      if (count < (rule.minUnits ?? 0)) return 0
      return rule.baseDamage + rule.perUnitDamage * Math.min(count, rule.maxUnits ?? Number.POSITIVE_INFINITY)
    }
    case 'comparativeCount':
      return Math.max(
        0,
        rule.baseDamage + rule.perUnitDamage * (
          getTcgBattleCount(rule.addSource, context) - getTcgBattleCount(rule.subtractSource, context)
        ),
      )
    case 'positiveComparativeCount':
      return rule.baseDamage + rule.perUnitDamage * Math.max(
        0,
        getTcgBattleCount(rule.addSource, context) - getTcgBattleCount(rule.subtractSource, context),
      )
    case 'weightedCount':
      return rule.baseDamage + rule.sources.reduce(
        (damage, entry) => damage + entry.perUnitDamage * Math.min(
          getTcgBattleCount(entry.source, context),
          entry.maxUnits ?? Number.POSITIVE_INFINITY,
        ),
        0,
      )
    case 'countComparisonBonus':
      return rule.baseDamage + (
        getTcgBattleCount(rule.addSource, context) > getTcgBattleCount(rule.subtractSource, context)
          ? rule.bonusDamage
          : 0
      )
    case 'evolvedTargetBonus':
      return rule.baseDamage + (context.target.subtypes.some((subtype) => /^stage [12]$/i.test(subtype)) ? rule.bonusDamage : 0)
    case 'targetSubtypeBonus':
      return rule.baseDamage + (context.target.subtypes.some((subtype) => subtype.toLowerCase() === rule.subtype.toLowerCase()) ? rule.bonusDamage : 0)
    case 'pokemonExOrGxTargetBonus':
      return rule.baseDamage + (context.target.subtypes.some((subtype) => ['ex', 'gx'].includes(subtype.toLowerCase())) ? rule.bonusDamage : 0)
    case 'targetTypeBonus':
      return rule.baseDamage + (context.target.types.some((type) => type.toLowerCase() === rule.targetType.toLowerCase()) ? rule.bonusDamage : 0)
    case 'selectedEnergyTypeMatchBonus': {
      const selectedEnergy = context.state && context.sideKey
        ? context.state[context.sideKey].selectedEnergy
        : undefined
      return rule.baseDamage + (
        selectedEnergy && context.target.types.some((type) => type.toLowerCase() === selectedEnergy.toLowerCase())
          ? rule.bonusDamage
          : 0
      )
    }
    case 'evolvedFromBonus': {
      const normalizeName = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '')
      return rule.baseDamage + (
        context.attacker.evolvesFrom && normalizeName(context.attacker.evolvesFrom) === normalizeName(rule.evolvesFrom)
          ? rule.bonusDamage
          : 0
      )
    }
    case 'retreatCostZeroBonus':
      return rule.baseDamage + ((context.target.convertedRetreatCost || 0) === 0 ? rule.bonusDamage : 0)
    case 'knockOutLowestRemainingHp': {
      if (!context.state || !context.sideKey) return 0
      const cards = [...context.state.player.front, ...context.state.player.back, ...context.state.opponent.front, ...context.state.opponent.back]
        .filter((card) => card.currentHp > 0 && card.instanceId !== context.attacker.instanceId)
      const lowestHp = Math.min(...cards.map((card) => card.currentHp))
      return context.target.currentHp === lowestHp ? context.target.currentHp : 0
    }
    case 'knockOutAtDamageCounters':
      return Math.floor((context.target.hp - context.target.currentHp) / 10) >= rule.minimumCounters
        ? context.target.currentHp
        : 0
    case 'handSizeComparisonBonus': {
      if (!context.state || !context.sideKey) return rule.baseDamage
      const opponentSideKey = context.sideKey === 'player' ? 'opponent' : 'player'
      const ownHandSize = context.state[context.sideKey].hand.length
      const opponentHandSize = context.state[opponentSideKey].hand.length
      return rule.baseDamage + (
        (rule.comparison === 'equal' ? ownHandSize === opponentHandSize : ownHandSize > opponentHandSize)
          ? rule.bonusDamage
          : 0
      )
    }
    case 'emptyHandBonus':
      return rule.baseDamage + (
        context.state && context.sideKey && context.state[context.sideKey].hand.length === 0
          ? rule.bonusDamage
          : 0
      )
    case 'namedPokemonSetBonus': {
      if (!context.state || !context.sideKey) return rule.baseDamage
      const sideKey = rule.side === 'own' ? context.sideKey : context.sideKey === 'player' ? 'opponent' : 'player'
      const names = getLivingTcgBattleCards(context.state[sideKey]).map((card) => normalizeTcgBattleCardName(card.name))
      return rule.baseDamage + (
        rule.names.every((name) => names.includes(normalizeTcgBattleCardName(name))) ? rule.bonusDamage : 0
      )
    }
    case 'namedPokemonBenchBonus': {
      if (!context.state || !context.sideKey) return rule.baseDamage
      const name = normalizeTcgBattleCardName(rule.nameContains)
      const matches = context.state[context.sideKey].back.filter((card) =>
        card.currentHp > 0 && normalizeTcgBattleCardName(card.name).includes(name),
      )
      if (matches.length === 0) return rule.baseDamage
      return rule.baseDamage + (matches.some((card) => card.currentHp < card.hp) ? rule.injuredBonusDamage : rule.bonusDamage)
    }
    case 'deltaSpeciesTargetBonus':
      return rule.baseDamage + (context.target.name.includes('δ') ? rule.bonusDamage : 0)
    case 'stage2TargetBonus':
      return rule.baseDamage + (context.target.subtypes.some((subtype) => subtype.toLowerCase() === 'stage 2') ? rule.bonusDamage : 0)
    case 'namedTargetBonus': {
      const normalizeName = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '')
      const targetName = normalizeName(context.target.name)
      return rule.baseDamage + (rule.names.some((name) => normalizeName(name) === targetName) ? rule.bonusDamage : 0)
    }
    case 'resistanceTypeBonus':
      return rule.baseDamage + (
        context.target.resistances.some((resistance) =>
          resistance.type.toLowerCase() === rule.resistanceType.toLowerCase(),
        )
          ? rule.bonusDamage
          : 0
      )
    case 'targetResistanceBonus':
      return rule.baseDamage + (context.target.resistances.length > 0 ? rule.bonusDamage : 0)
    case 'darknessOrNameTargetBonus':
      return rule.baseDamage + (
        context.target.types.some((type) => type.toLowerCase() === 'darkness') ||
          context.target.name.toLowerCase().includes(rule.nameContains)
          ? rule.bonusDamage
          : 0
      )
    case 'knockOutOnCoinCondition':
      return doesTcgBattleConditionPass(rule.condition, context.coinFlips) ? context.target.currentHp : 0
    case 'pokemonExTargetBonus':
      return rule.baseDamage + (context.target.subtypes.some((subtype) => subtype.toLowerCase() === 'ex') ? rule.bonusDamage : 0)
    case 'damagedTargetBonus':
      return rule.baseDamage + (context.target.currentHp < context.target.hp ? rule.bonusDamage : 0)
    case 'healthyTarget':
      return context.target.currentHp === context.target.hp ? rule.healthyDamage : rule.damagedDamage
    case 'headsTable': {
      const heads = context.coinMode === 'actual'
        ? context.coinFlips?.heads ?? 0
        : rule.coinFlipCount
      return rule.damages[Math.min(heads, rule.damages.length - 1)] ?? 0
    }
    case 'headsBonusEachIfEnergyAvailable': {
      const heads = getEstimatedTcgBattleHeads(rule.coinFlipCount, context)
      const unusedEnergy = getTcgBattleCount({ kind: 'unusedEnergy' }, context)
      return heads > unusedEnergy ? 0 : rule.baseDamage + rule.bonusDamage * heads
    }
    case 'lastHitBonus':
      return rule.baseDamage + (context.attacker.temporaryEffects?.lastIncomingAttackDamage ? rule.bonusDamage : 0)
    case 'lastTurnKnockoutBonus': {
      const knockout = context.sideKey
        ? context.state?.lastOpponentAttackKnockout?.[context.sideKey]
        : undefined
      return rule.baseDamage + (
        knockout?.knockedOut && knockout.turnNumber === context.state?.turnNumber
          ? rule.bonusDamage
          : 0
      )
    }
    case 'statusBonus':
      return rule.baseDamage + (
        (rule.statusTarget === 'attacker' ? context.attacker : context.target)
          .statusConditions?.some((status) => rule.statuses.includes(status))
          ? rule.bonusDamage
          : 0
      )
    case 'statusCountBonus': {
      const statuses = (rule.statusTarget === 'attacker' ? context.attacker : context.target).statusConditions || []
      const count = statuses.filter((status) => rule.statuses.includes(status)).length
      return rule.baseDamage + rule.bonusDamagePerStatus * count
    }
    case 'damageCounterThresholdBonus':
      return rule.baseDamage + (
        Math.floor((context.target.hp - context.target.currentHp) / 10) >= rule.minimumCounters
          ? rule.bonusDamage
          : 0
      )
    case 'healedThisTurnBonus':
      return rule.baseDamage + (
        context.state && context.sideKey &&
        context.attacker.temporaryEffects?.healedTurnNumber === context.state.turnNumber &&
        context.attacker.temporaryEffects?.healedBySide === context.sideKey
          ? rule.bonusDamage
          : 0
      )
    case 'countThresholdBonus':
      return rule.baseDamage + (
        getTcgBattleCount(rule.source, context) >= rule.minimumUnits ? rule.bonusDamage : 0
      )
    case 'remainingHpComparisonBonus':
      return rule.baseDamage + (context.target.currentHp < context.attacker.currentHp ? rule.bonusDamage : 0)
    case 'attackerRemainingHpLessBonus':
      return rule.baseDamage + (context.attacker.currentHp < context.target.currentHp ? rule.bonusDamage : 0)
    case 'attackerHpExactBonus':
      return rule.baseDamage + (context.attacker.currentHp === rule.remainingHp ? rule.bonusDamage : 0)
    case 'attackerFullHpBonus':
      return rule.baseDamage + (context.attacker.currentHp === context.attacker.hp ? rule.bonusDamage : 0)
    case 'targetSubtypeKnockOut':
      return context.target.subtypes.some((subtype) => subtype.toLowerCase() === rule.subtype.toLowerCase())
        ? context.target.currentHp
        : 0
    case 'optionalChoiceBonus':
      return rule.baseDamage + (context.choice?.kind === 'optionalBonus' && context.choice.enabled ? rule.bonusDamage : 0)
    case 'energyComparisonBonus': {
      if (!context.state || !context.sideKey) return rule.baseDamage
      const opponentSideKey = context.sideKey === 'player' ? 'opponent' : 'player'
      return rule.baseDamage + (context.state[opponentSideKey].energy > context.state[context.sideKey].energy ? rule.bonusDamage : 0)
    }
    case 'energyEqualityBonus': {
      if (!context.state || !context.sideKey) return rule.baseDamage
      const opponentSideKey = context.sideKey === 'player' ? 'opponent' : 'player'
      return rule.baseDamage + (context.state[opponentSideKey].energy === context.state[context.sideKey].energy ? rule.bonusDamage : 0)
    }
    case 'knockOutIf': {
      if (rule.attackedWith.toLowerCase() === 'damage or midnight eyes') {
        const hitTurn = context.sideKey
          ? context.target.temporaryEffects?.lastAttackHitBySide?.[context.sideKey]
          : undefined
        return context.target.statusConditions?.includes(rule.status) && typeof hitTurn === 'number' && hitTurn > 0
          ? context.target.currentHp
          : 0
      }
      const nightEyesTurn = context.sideKey
        ? context.target.temporaryEffects?.lastNightEyesAttackBySide?.[context.sideKey]
        : undefined
      return context.target.statusConditions?.includes(rule.status) &&
        rule.attackedWith.toLowerCase() === 'night eyes' &&
        typeof nightEyesTurn === 'number' &&
        nightEyesTurn > 0
        ? context.target.currentHp
        : 0
    }
    case 'lastIncomingDamage':
      return Math.max(0, context.attacker.temporaryEffects?.lastIncomingAttackDamage || 0)
  }
}

function getEstimatedTcgBattleHeads(
  fallbackCount: number,
  context: {
    coinFlips?: TcgBattleAttackResolution['coinFlips']
    coinMode: 'actual' | 'max'
  },
): number {
  if (context.coinMode === 'actual') return context.coinFlips?.heads ?? 0
  return fallbackCount || context.coinFlips?.results.length || 1
}

export function getTcgBattleCount(
  source: TcgBattleCountSource,
  context: {
    state?: TcgBattleState
    sideKey?: TcgBattleSide
    attacker: TcgBattleCardState
    target: TcgBattleCardState
    paidAttackCost?: number
    coinMode: 'actual' | 'max'
    choice?: TcgBattleAttackChoice
  },
): number {
  if (source.kind === 'damageCounters') {
    const card = source.target === 'attacker' ? context.attacker : context.target
    return Math.max(0, Math.floor((card.hp - card.currentHp) / 10))
  }

  if (source.kind === 'chosenHandCards') {
    return context.choice?.kind === 'discardHandCards' ? context.choice.cardIds.length : 0
  }

  if (source.kind === 'retreatCost') {
    const card = source.target === 'attacker' ? context.attacker : context.target
    return Math.max(0, card.convertedRetreatCost || 0)
  }

  if (source.kind === 'unusedEnergy') {
    if (!context.state || !context.sideKey) {
      return context.coinMode === 'max' ? Number.POSITIVE_INFINITY : 0
    }
    return Math.max(
      0,
      context.state[context.sideKey].energy - (context.paidAttackCost || 0),
    )
  }

  if (source.kind === 'chosenEnergy') {
    if (context.choice?.kind === 'energyAmount') return Math.max(0, context.choice.amount)
    return context.coinMode === 'max' && context.state && context.sideKey
      ? Math.max(0, context.state[context.sideKey].energy - (context.paidAttackCost || 0))
      : 0
  }

  if (source.kind === 'energyOnTarget') {
    if (!context.state) return 0
    const targetSide = [...context.state.player.front, ...context.state.player.back]
      .some((card) => card.instanceId === context.target.instanceId)
      ? context.state.player
      : context.state.opponent
    return targetSide.energy
  }

  if (!context.state || !context.sideKey) return 0
  const own = context.state[context.sideKey]
  const opponent = context.state[context.sideKey === 'player' ? 'opponent' : 'player']

  if (source.kind === 'energy') {
    const amount = source.side === 'own'
      ? own.energy
      : source.side === 'opponent'
        ? opponent.energy
        : own.energy + opponent.energy
    return Math.min(amount, source.max ?? Number.POSITIVE_INFINITY)
  }

  if (source.kind === 'energyOfType') {
    const side = source.side === 'own' ? own : opponent
    return side.selectedEnergy === source.type ? side.energy : 0
  }

  if (source.kind === 'pokemonInDiscard') {
    const side = source.side === 'own' ? own : opponent
    const includedSubtypes = source.includeSubtypes?.map((subtype) => subtype.toLowerCase())
    if (source.all) return Math.min(side.discard.length, source.max ?? Number.POSITIVE_INFINITY)
    const amount = side.discard.filter((card) =>
      includedSubtypes?.length
        ? card.subtypes.some((subtype) => includedSubtypes.includes(subtype.toLowerCase()))
        : card.subtypes.some((subtype) => subtype === 'Basic' || /^Stage [12]$/i.test(subtype)),
    ).length
    return Math.min(amount, source.max ?? Number.POSITIVE_INFINITY)
  }

  if (source.kind === 'pokemonWithAttackInDiscard') {
    const side = source.side === 'own' ? own : opponent
    const wantedAttackName = normalizeTcgBattleCardName(source.attackName)
    return side.discard.filter((card) =>
      card.attacks.some((attack) => normalizeTcgBattleCardName(attack.name) === wantedAttackName),
    ).length
  }

  if (source.kind === 'namedPokemonInDiscard') {
    const side = source.side === 'own' ? own : opponent
    const normalizeName = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '')
    const wanted = new Set(source.names.map(normalizeName))
    const amount = side.discard.filter((card) =>
      card.subtypes.some((subtype) => subtype === 'Basic' || /^Stage [12]$/i.test(subtype)) &&
      wanted.has(normalizeName(card.name)),
    ).length
    return Math.min(amount, source.max ?? Number.POSITIVE_INFINITY)
  }

  if (source.kind === 'pokemonExInPlay') {
    const side = source.side === 'own' ? own : opponent
    return getLivingTcgBattleCards(side).filter((card) =>
      card.subtypes.some((subtype) => subtype.toLowerCase() === 'ex'),
    ).length
  }

  if (source.kind === 'pokemonEvolvedInPlay') {
    const countFor = (side: TcgBattleSideState) => getLivingTcgBattleCards(side).filter((card) =>
      card.subtypes.some((subtype) => /^stage [12]$/i.test(subtype)),
    ).length
    if (source.side === 'own') return countFor(own)
    if (source.side === 'opponent') return countFor(opponent)
    return countFor(own) + countFor(opponent)
  }

  if (source.kind === 'pokemonEvolvedFromInPlay') {
    const normalizedEvolvesFrom = normalizeTcgBattleCardName(source.evolvesFrom)
    const countFor = (side: TcgBattleSideState) => getLivingTcgBattleCards(side).filter((card) =>
      card.evolvesFrom && normalizeTcgBattleCardName(card.evolvesFrom) === normalizedEvolvesFrom,
    ).length
    if (source.side === 'own') return countFor(own)
    if (source.side === 'opponent') return countFor(opponent)
    return countFor(own) + countFor(opponent)
  }

  if (source.kind === 'pokemonEvolvedOnBench') {
    const countFor = (side: TcgBattleSideState) => side.back.filter((card) =>
      card.currentHp > 0 && card.subtypes.some((subtype) => /^stage [12]$/i.test(subtype)),
    ).length
    if (source.side === 'own') return countFor(own)
    if (source.side === 'opponent') return countFor(opponent)
    return countFor(own) + countFor(opponent)
  }

  if (source.kind === 'pokemonOfTypesInPlay') {
    const types = new Set(source.types.map((type) => type.toLowerCase()))
    const countFor = (side: TcgBattleSideState) => {
      const cards = source.zone === 'bench' ? side.back : [...side.front, ...side.back]
      return cards.filter((card) =>
        card.currentHp > 0 &&
        card.types.some((type) => types.has(type.toLowerCase())),
      ).length
    }
    if (source.side === 'own') return countFor(own)
    if (source.side === 'opponent') return countFor(opponent)
    return countFor(own) + countFor(opponent)
  }

  if (source.kind === 'distinctTypesInPlay') {
    const countFor = (side: TcgBattleSideState) => {
      const cards = source.zone === 'bench' ? side.back : [...side.front, ...side.back]
      return new Set(cards
        .filter((card) => card.currentHp > 0)
        .flatMap((card) => card.types.map((type) => type.toLowerCase()))).size
    }
    if (source.side === 'own') return countFor(own)
    if (source.side === 'opponent') return countFor(opponent)
    return countFor(own) + countFor(opponent)
  }

  if (source.kind === 'retreatCostOnNamedPokemon') {
    const normalizeName = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '')
    const names = new Set(source.names.map(normalizeName))
    const countFor = (side: TcgBattleSideState) => {
      const cards = source.zone === 'bench' ? side.back : [...side.front, ...side.back]
      return cards
        .filter((card) => card.currentHp > 0 && names.has(normalizeName(card.name)))
        .reduce((sum, card) => sum + Math.max(0, card.convertedRetreatCost || 0), 0)
    }
    if (source.side === 'own') return countFor(own)
    if (source.side === 'opponent') return countFor(opponent)
    return countFor(own) + countFor(opponent)
  }

  if (source.kind === 'pokemonWithAttack') {
    const wantedAttackName = normalizeTcgBattleCardName(source.attackName)
    const countFor = (side: TcgBattleSideState) => {
      const cards = source.zone === 'bench' ? side.back : [...side.front, ...side.back]
      return cards.filter((card) =>
        card.currentHp > 0 &&
        card.attacks.some((attack) => normalizeTcgBattleCardName(attack.name) === wantedAttackName),
      ).length
    }
    if (source.side === 'own') return countFor(own)
    if (source.side === 'opponent') return countFor(opponent)
    return countFor(own) + countFor(opponent)
  }

  if (source.kind === 'distinctTypesOfNamedPokemon') {
    const namePart = source.nameContains.toLowerCase().replace(/[^a-z0-9]/g, '')
    const countFor = (side: TcgBattleSideState) => {
      const cards = source.zone === 'bench' ? side.back : [...side.front, ...side.back]
      const matchingTypes = cards
        .filter((card) => card.currentHp > 0 && card.name.toLowerCase().replace(/[^a-z0-9]/g, '').includes(namePart))
        .flatMap((card) => card.types.map((type) => type.toLowerCase()))
      return new Set(matchingTypes).size
    }
    if (source.side === 'own') return countFor(own)
    if (source.side === 'opponent') return countFor(opponent)
    return countFor(own) + countFor(opponent)
  }

  if (source.kind === 'distinctTypesOfPokemonWithSubtypesInPlay') {
    const wanted = new Set(source.subtypes.map((subtype) => subtype.toLowerCase()))
    const countFor = (side: TcgBattleSideState) => {
      const cards = source.zone === 'bench' ? side.back : [...side.front, ...side.back]
      const matchingTypes = cards
        .filter((card) => card.currentHp > 0 && card.subtypes.some((subtype) => wanted.has(subtype.toLowerCase())))
        .flatMap((card) => card.types.map((type) => type.toLowerCase()))
      return new Set(matchingTypes).size
    }
    if (source.side === 'own') return countFor(own)
    if (source.side === 'opponent') return countFor(opponent)
    return countFor(own) + countFor(opponent)
  }

  if (source.kind === 'damageCountersOnSide') {
    const cardsFor = (side: TcgBattleSideState) =>
      source.zone === 'front'
        ? side.front
        : source.zone === 'bench'
          ? side.back
          : [...side.front, ...side.back]
    const countFor = (side: TcgBattleSideState) =>
      cardsFor(side)
        .filter((card) => card.currentHp > 0)
        .reduce((sum, card) => sum + Math.max(0, Math.floor((card.hp - card.currentHp) / 10)), 0)
    if (source.side === 'own') return countFor(own)
    if (source.side === 'opponent') return countFor(opponent)
    return countFor(own) + countFor(opponent)
  }

  if (source.kind === 'namedPokemon') {
    const normalizeName = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '')
    const wanted = new Set(source.names.map(normalizeName))
    const cardsFor = (side: TcgBattleSideState) =>
      source.zone === 'bench' ? side.back : [...side.front, ...side.back]
    const countFor = (side: TcgBattleSideState) =>
      cardsFor(side).filter((card) => card.currentHp > 0 && wanted.has(normalizeName(card.name))).length
    if (source.side === 'own') return countFor(own)
    if (source.side === 'opponent') return countFor(opponent)
    return countFor(own) + countFor(opponent)
  }

  if (source.kind === 'namedPokemonContains') {
    const normalizeName = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '')
    const parts = source.values.map(normalizeName)
    const cardsFor = (side: TcgBattleSideState) =>
      source.zone === 'bench' ? side.back : [...side.front, ...side.back]
    const countFor = (side: TcgBattleSideState) =>
      cardsFor(side).filter((card) => {
        if (card.currentHp <= 0) return false
        if (source.excludeAttacker && card.instanceId === context.attacker.instanceId) return false
        const name = normalizeName(card.name)
        return parts.some((part) => name.includes(part))
      }).length
    if (source.side === 'own') return countFor(own)
    if (source.side === 'opponent') return countFor(opponent)
    return countFor(own) + countFor(opponent)
  }

  if (source.kind === 'injuredPokemon') {
    const cardsFor = (side: TcgBattleSideState) =>
      source.zone === 'bench' ? side.back : [...side.front, ...side.back]
    const countFor = (side: TcgBattleSideState) =>
      cardsFor(side).filter((card) => card.currentHp > 0 && card.currentHp < card.hp).length
    if (source.side === 'own') return countFor(own)
    if (source.side === 'opponent') return countFor(opponent)
    return countFor(own) + countFor(opponent)
  }

  if (source.kind === 'bench') {
    if (source.side === 'own') return own.back.filter((card) => card.currentHp > 0).length
    if (source.side === 'opponent') return opponent.back.filter((card) => card.currentHp > 0).length
    return (
      own.back.filter((card) => card.currentHp > 0).length +
      opponent.back.filter((card) => card.currentHp > 0).length
    )
  }

  if (source.kind === 'pokemonInPlay') {
    const countFor = (side: TcgBattleSideState) =>
      getLivingTcgBattleCards(side).filter((card) =>
        !source.excludeAttacker || card.instanceId !== context.attacker.instanceId,
      ).length
    if (source.side === 'own') return countFor(own)
    if (source.side === 'opponent') return countFor(opponent)
    return countFor(own) + countFor(opponent)
  }

  if (source.kind === 'handSize') {
    const amount = (source.side === 'own' ? own : opponent).hand.length
    return Math.min(amount, source.max ?? Number.POSITIVE_INFINITY)
  }

  if (source.kind === 'pokemonWithSubtypesInPlay') {
    const wanted = new Set(source.subtypes.map((subtype) => subtype.toLowerCase()))
    const cardsFor = (side: TcgBattleSideState) =>
      source.zone === 'bench' ? side.back : [...side.front, ...side.back]
    const countFor = (side: TcgBattleSideState) =>
      cardsFor(side).filter((card) =>
        card.currentHp > 0 && card.subtypes.some((subtype) => wanted.has(subtype.toLowerCase())),
      ).length
    if (source.side === 'own') return countFor(own)
    if (source.side === 'opponent') return countFor(opponent)
    return countFor(own) + countFor(opponent)
  }

  if (source.kind === 'deltaPokemonInPlay') {
    const countFor = (side: TcgBattleSideState) =>
      getLivingTcgBattleCards(side).filter((card) => card.name.includes('δ')).length
    if (source.side === 'own') return countFor(own)
    if (source.side === 'opponent') return countFor(opponent)
    return countFor(own) + countFor(opponent)
  }

  if (source.kind === 'damageCountersOnNamedPokemon') {
    const normalizeName = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '')
    const names = new Set(source.names.map(normalizeName))
    const countFor = (side: TcgBattleSideState) =>
      (source.zone === 'bench' ? side.back : [...side.front, ...side.back])
        .filter((card) => card.currentHp > 0 && names.has(normalizeName(card.name)))
        .reduce((sum, card) => sum + Math.max(0, Math.floor((card.hp - card.currentHp) / 10)), 0)
    if (source.side === 'own') return countFor(own)
    if (source.side === 'opponent') return countFor(opponent)
    return countFor(own) + countFor(opponent)
  }

  if (source.kind === 'damageCountersOnNamedPokemonContains') {
    const name = normalizeTcgBattleCardName(source.nameContains)
    const countFor = (side: TcgBattleSideState) =>
      [...side.front, ...side.back]
        .filter((card) => card.currentHp > 0 && normalizeTcgBattleCardName(card.name).includes(name))
        .reduce((sum, card) => sum + Math.max(0, Math.floor((card.hp - card.currentHp) / 10)), 0)
    if (source.side === 'own') return countFor(own)
    if (source.side === 'opponent') return countFor(opponent)
    return countFor(own) + countFor(opponent)
  }

  return 0
}

function calculateTcgBattleSelfDamage(
  rule: TcgBattleSelfDamageRule,
  context: {
    state: TcgBattleState
    sideKey: TcgBattleSide
    attacker: TcgBattleCardState
    target: TcgBattleCardState
    paidAttackCost?: number
    coinFlips?: TcgBattleAttackResolution['coinFlips']
    choice?: TcgBattleAttackChoice
  },
): number {
  if (rule.kind === 'optionalChoice') {
    return context.choice?.kind === 'optionalBonus' && context.choice.enabled ? rule.amount : 0
  }
  if (rule.kind === 'fixed') return rule.amount
  if (rule.kind === 'perTail') return rule.amount * (context.coinFlips?.tails || 0)
  if (rule.kind === 'perHead') return rule.amount * (context.coinFlips?.heads || 0)
  if (rule.kind === 'damageCounters') {
    return rule.perCounterDamage * Math.max(0, Math.floor((context.attacker.hp - context.attacker.currentHp) / 10))
  }
  return rule.perUnitDamage * getTcgBattleCount(rule.source, {
    state: context.state,
    sideKey: context.sideKey,
    attacker: context.attacker,
    target: context.target,
    paidAttackCost: context.paidAttackCost,
    coinMode: 'actual',
    choice: context.choice,
  })
}

function calculateTcgBattleEnergyDiscards(
  rules: TcgBattleEnergyDiscardRule[],
  context: {
    state: TcgBattleState
    sideKey: TcgBattleSide
    attack: TcgBattleAttack
    target: TcgBattleCardState
    paidAttackCost?: number
    coinFlips?: TcgBattleAttackResolution['coinFlips']
    choice?: TcgBattleAttackChoice
  },
): TcgBattleEnergyDiscardResolution[] {
  if (rules.length === 0) return []

  const attackCost = context.paidAttackCost ?? context.attack.convertedEnergyCost ?? context.attack.cost?.length ?? 0
  const remaining = {
    self: Math.max(0, context.state[context.sideKey].energy - attackCost),
    opponent: Math.max(0, context.state[context.sideKey === 'player' ? 'opponent' : 'player'].energy),
  }
  const discards: TcgBattleEnergyDiscardResolution[] = []

  for (const rule of rules) {
    if (rule.optional && !(context.choice?.kind === 'optionalBonus' && context.choice.enabled)) continue
    if (!doesTcgBattleConditionPass(rule.condition, context.coinFlips)) continue
    if (rule.requiresEnergyType) {
      const energySideKey = rule.target === 'self'
        ? context.sideKey
        : context.sideKey === 'player' ? 'opponent' : 'player'
      if (context.state[energySideKey].selectedEnergy !== rule.requiresEnergyType) continue
    }
    if (rule.targetSubtype === 'ex' && !context.target.subtypes.some((subtype) => subtype.toLowerCase() === 'ex')) continue
    if (rule.targetSubtype === 'stage2' && !context.target.subtypes.some((subtype) => subtype.toLowerCase() === 'stage 2')) continue
    if (rule.targetEvolved && !context.target.subtypes.some((subtype) => /^stage [12]$/i.test(subtype))) continue

    const available = remaining[rule.target]
    const requested =
      rule.amount === 'all'
        ? available
        : rule.amount === 'heads'
          ? context.coinFlips?.heads || 0
          : rule.amount === 'opponentPokemon'
            ? context.state[context.sideKey === 'player' ? 'opponent' : 'player'].front.filter((card) => card.currentHp > 0).length +
              context.state[context.sideKey === 'player' ? 'opponent' : 'player'].back.filter((card) => card.currentHp > 0).length
          : rule.amount === 'choice'
            ? context.choice?.kind === 'energyAmount'
              ? context.choice.amount
              : 0
            : rule.amount
    const amount = Math.min(available, Math.max(0, requested))
    if (amount <= 0) continue

    remaining[rule.target] -= amount
    discards.push({
      target: rule.target,
      amount,
      requestedAmount: rule.amount,
    })
  }

  return discards
}

function calculateTcgBattleStatusConditions(
  rules: TcgBattleStatusRule[],
  coinFlips?: TcgBattleAttackResolution['coinFlips'],
  choice?: TcgBattleAttackChoice,
  attacker?: TcgBattleCardState,
  target?: TcgBattleCardState,
  state?: TcgBattleState,
  sideKey?: TcgBattleSide,
): TcgBattleStatusResolution[] {
  return rules
    .filter((rule) =>
      doesTcgBattleConditionPass(rule.condition, coinFlips) &&
      (!rule.requiresOptionalChoice || (choice?.kind === 'optionalBonus' && choice.enabled)),
    )
    .flatMap((rule) => {
      const affectedCard = rule.target === 'self' ? attacker : target
      if (rule.targetSubtype === 'ex' && !affectedCard?.subtypes.some((subtype) => subtype.toLowerCase() === 'ex')) return []
      if (rule.targetSubtype === 'stage2' && !affectedCard?.subtypes.some((subtype) => subtype.toLowerCase() === 'stage 2')) return []
      if (rule.requiresTargetSubtype && !affectedCard?.subtypes.some(
        (subtype) => subtype.toLowerCase() === rule.requiresTargetSubtype?.toLowerCase(),
      )) return []
      if (rule.requiresTargetStatusAbsent && affectedCard?.statusConditions?.includes(rule.requiresTargetStatusAbsent)) return []
      if (rule.requiresAttackerStatus && !attacker?.statusConditions?.includes(rule.requiresAttackerStatus)) return []
      if (rule.requiresAttackerDamaged && (!attacker || attacker.currentHp >= attacker.hp)) return []
      if (rule.requiresAttackerAtFullHp && (!attacker || attacker.currentHp < attacker.hp)) return []
      if (rule.requiresNamedPokemon) {
        if (!state || !sideKey) return []
        const requiredSide = rule.requiresNamedPokemon.side === 'own'
          ? sideKey
          : sideKey === 'player' ? 'opponent' : 'player'
        const livingNames = getLivingTcgBattleCards(state[requiredSide]).map((card) => normalizeTcgBattleCardName(card.name))
        if (!rule.requiresNamedPokemon.names.every((name) => livingNames.includes(normalizeTcgBattleCardName(name)))) return []
      }
      if (rule.requiresPokemonType) {
        if (!state || !sideKey) return []
        const requiredSide = rule.requiresPokemonType.side === 'own'
          ? sideKey
          : sideKey === 'player' ? 'opponent' : 'player'
        const hasType = getLivingTcgBattleCards(state[requiredSide]).some((card) =>
          card.types.some((type) => type.toLowerCase() === rule.requiresPokemonType?.type.toLowerCase()),
        )
        if (!hasType) return []
      }
      if (rule.requiresEnergy) {
        if (!state || !sideKey) return []
        const requiredSide = rule.requiresEnergy.side === 'own'
          ? sideKey
          : sideKey === 'player' ? 'opponent' : 'player'
        if (
          state[requiredSide].energy < rule.requiresEnergy.minimum ||
          (rule.requiresEnergy.maximum !== undefined && state[requiredSide].energy > rule.requiresEnergy.maximum)
        ) return []
      }
      if (rule.requiresHandSizeComparison === 'equal') {
        if (!state || !sideKey) return []
        const opponentSide = sideKey === 'player' ? 'opponent' : 'player'
        if (state[sideKey].hand.length !== state[opponentSide].hand.length) return []
      }
      if (
        rule.useChosenStatus && choice?.kind === 'statusCondition' && rule.statuses.length > 0 &&
        !rule.statuses.includes(choice.status)
      ) return []
      const statuses = rule.useChosenStatusPair && choice?.kind === 'statusPair'
        ? [choice.first, choice.second]
        : rule.useChosenStatusPair
          ? []
          : rule.useChosenStatus && choice?.kind === 'statusCondition'
            ? [choice.status]
            : rule.useChosenStatus
              ? []
              : rule.statuses
      return statuses.length > 0 ? [{ target: rule.target, statuses }] : []
    })
}

function applyTcgBattleCardStatuses(
  card: TcgBattleCardState,
  statuses: TcgBattleStatusCondition[],
): TcgBattleStatusCondition[] {
  if (statuses.length === 0) return []

  const prevented = new Set(card.temporaryEffects?.preventStatusConditions?.statuses || [])
  statuses = statuses.filter((status) => !prevented.has(status))
  if (statuses.length === 0) return []

  const current = new Set(card.statusConditions || [])
  const controlStatuses = statuses.filter(isTcgBattleControlStatus)
  if (controlStatuses.length > 0) {
    current.delete('asleep')
    current.delete('paralyzed')
    current.delete('confused')
  }

  const applied: TcgBattleStatusCondition[] = []
  for (const status of statuses) {
    if (!current.has(status)) applied.push(status)
    current.add(status)
  }

  card.statusConditions = Array.from(current)
  return applied
}

function getBlockingTcgBattleStatus(
  card: TcgBattleCardState,
  allowWhileAsleep = false,
): Extract<TcgBattleStatusCondition, 'asleep' | 'paralyzed' | 'confused'> | undefined {
  const statuses = card.statusConditions || []
  if (statuses.includes('paralyzed')) return 'paralyzed'
  if (!allowWhileAsleep && statuses.includes('asleep')) return 'asleep'
  if (statuses.includes('confused')) return 'confused'
  return undefined
}

function isTcgBattleControlStatus(
  status: TcgBattleStatusCondition,
): status is Extract<TcgBattleStatusCondition, 'asleep' | 'paralyzed' | 'confused'> {
  return status === 'asleep' || status === 'paralyzed' || status === 'confused'
}

export function doesTcgBattleConditionPass(
  condition: TcgBattleCoinCondition | undefined,
  coinFlips: TcgBattleAttackResolution['coinFlips'],
): boolean {
  if (!condition) return true
  if (!coinFlips) return false
  if (typeof condition === 'object') {
    const count = condition.result === 'heads' ? coinFlips.heads : coinFlips.tails
    return condition.exactly === undefined
      ? count >= condition.minimum
      : count === condition.exactly
  }
  return condition === 'heads' ? coinFlips.heads > 0 : coinFlips.tails > 0
}

function applyTcgWeaknessAndResistance(
  attacker: TcgBattleCardState,
  target: TcgBattleCardState,
  damage: number,
  options: { ignoreWeakness?: boolean; ignoreResistance?: boolean } = {},
): number {
  const attackType = attacker.temporaryEffects?.battleType || attacker.types[0]
  if (!attackType) return damage

  let modifiedDamage = damage
  if (!options.ignoreWeakness) {
    const weaknessType = target.temporaryEffects?.weaknessType
    const weakness = weaknessType
      ? weaknessType === attackType
        ? target.temporaryEffects?.weaknessValue === null
          ? undefined
          : { type: weaknessType, value: target.temporaryEffects?.weaknessValue || '×2' }
        : undefined
      : target.weaknesses.find((entry) => entry.type === attackType)
    if (weakness) {
      if (normalizeTcgDamageText(weakness.value).includes('x2')) modifiedDamage *= 2
      else modifiedDamage += parseSignedModifier(weakness.value)
    }
  }

  if (!options.ignoreResistance) {
    const resistanceType = target.temporaryEffects?.resistanceType
    const resistance = resistanceType
      ? resistanceType === attackType
        ? { type: resistanceType, value: '-30' }
        : undefined
      : target.resistances.find((entry) => entry.type === attackType)
    if (resistance) modifiedDamage = Math.max(0, modifiedDamage + parseSignedModifier(resistance.value))
  }

  return modifiedDamage
}

function parseSignedModifier(value: string): number {
  const match = value.match(/[+-]\d+/)
  return match ? Number.parseInt(match[0], 10) : 0
}

function getCardBattleScore(card: TcgBattleCardSummary): number {
  const cardState = { ...card, currentHp: card.hp, instanceId: card.id }
  const bestAttack = Math.max(
    0,
    ...card.attacks.map((attack) => {
      const effect = getTcgBattleAttackEffect(attack)
      if (!effect) return 0
      return calculateTcgBattleRawDamage(effect.damage, {
        attacker: cardState,
        target: cardState,
        coinMode: 'max',
      })
    }),
  )
  return card.hp + bestAttack * 2 - card.cost
}
