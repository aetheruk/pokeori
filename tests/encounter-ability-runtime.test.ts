import { describe, expect, test } from 'bun:test'
import { ABILITIES } from '@/data/abilities'
import { items } from '@/data/items'
import {
  applyFieldObservationPoolWeightModifiers,
  getFieldObservationCollectibleModifiers,
  getFieldObservationGlobalEventMultipliers,
  getFieldObservationSpawnModifiers,
  getCaptureAbilityRewards,
} from '@/utilities/pokemon/encounter-ability-runtime'
import { buildFieldObservationCollectibleDrops } from '@/utilities/research/field-observation-drops'
import type { FieldObservationSettings } from '@/data/games/field-observation'

describe('encounter ability runtime', () => {
  test('canonical ability registry does not expose old custom encounter abilities', () => {
    expect(ABILITIES.blind).toBeUndefined()
    expect(ABILITIES.chain_reaction).toBeUndefined()
    expect(ABILITIES.charge).toBeUndefined()
    expect(ABILITIES.wild_transform).toBeUndefined()
  })

  test('secondary capture and field effects do not remove canonical battle effects', () => {
    expect(ABILITIES.static.effects?.some((effect) => effect.type.startsWith('battle-'))).toBe(true)
    expect(ABILITIES.static.effects?.some((effect) => effect.type.startsWith('answer-'))).toBe(false)
    expect(ABILITIES.swarm.effects).toContainEqual({
      type: 'battle-damage-multiplier',
      target: 'attacker',
      attackTypes: ['bug'],
      multiplier: 1.5,
      hpAtOrBelowPercent: 33,
    })
    expect(ABILITIES.swarm.effects?.some((effect) => effect.type === 'catch-rate-multiplier')).toBe(true)
    expect(
      ABILITIES.compound_eyes.effects?.some(
        (effect) => effect.type === 'battle-move-accuracy-multiplier',
      ),
    ).toBe(true)
    expect(
      ABILITIES.compound_eyes.effects?.some(
        (effect) => effect.type === 'field-observation-spawn-modifier',
      ),
    ).toBe(true)
  })

  test('field observation pool weighting only boosts matching target types', () => {
    const settings: FieldObservationSettings = {
      pokemonPool: [
        { speciesId: 10, formId: '10', weight: 10 },
        { speciesId: 16, formId: '16', weight: 10 },
      ],
      levelRange: { min: 2, max: 4 },
      timeLimit: 30,
      answerTimeLimit: 10,
    }

    const modified = applyFieldObservationPoolWeightModifiers(settings, {
      ability: ABILITIES.swarm,
      gameType: 'field-observation',
    })

    expect(modified.pokemonPool.find((entry) => entry.speciesId === 10)?.weight).toBeGreaterThan(10)
    expect(modified.pokemonPool.find((entry) => entry.speciesId === 16)?.weight).toBe(10)
  })

  test('survey-aware field observation modifiers stay capped', () => {
    expect(
      getFieldObservationSpawnModifiers({
        ability: ABILITIES.swarm,
        gameType: 'field-observation',
        surveyFocus: ['standard'],
      }).spawnCountMultiplier,
    ).toBe(1)
    expect(
      getFieldObservationSpawnModifiers({
        ability: ABILITIES.swarm,
        gameType: 'field-observation',
        surveyFocus: ['swarm-survey'],
      }).spawnCountMultiplier,
    ).toBe(1.08)
    expect(
      getFieldObservationGlobalEventMultipliers({
        ability: ABILITIES.super_luck,
        gameType: 'field-observation',
      }),
    ).toEqual({ pokemonEventMultiplier: 1.05, itemEventMultiplier: 1.1 })
  })

  test('capture rewards are success-only for gatherer abilities', () => {
    const originalRandom = Math.random
    Math.random = () => 0
    try {
      const state = {
        userId: 'user',
        locationId: 'route-1',
        pokemonId: 16,
        formId: '16',
        isShiny: false,
        gender: 'male',
        startTime: Date.now(),
        expiry: Date.now() + 10000,
        baseCatchRate: 100,
        currentCatchRate: 100,
        questionsAnswered: [],
        itemsUsed: [],
        totalCorrectAnswers: 1,
        consecutiveCorrectAnswers: 1,
        fleeRate: 0,
        catchRateModifier: 0,
        captureAttempts: 1,
        secondChanceUsed: false,
        secondChanceModifier: 0,
        encounterPool: [],
        abilityEscapeAttempted: false,
      } as any

      expect(
        getCaptureAbilityRewards({
          state,
          ability: ABILITIES.pickup,
          level: 5,
          targetTypes: ['normal'],
          researchingLevel: 1,
          caught: false,
        }).rewards,
      ).toEqual([])
      expect(
        getCaptureAbilityRewards({
          state,
          ability: ABILITIES.pickup,
          level: 5,
          targetTypes: ['normal'],
          researchingLevel: 1,
          caught: true,
        }).rewards.length,
      ).toBe(1)
    } finally {
      Math.random = originalRandom
    }
  })

  test('collectible modifiers can boost quantity and duration', () => {
    const modifiers = getFieldObservationCollectibleModifiers({
      ability: ABILITIES.harvest,
      gameType: 'field-observation',
      surveyFocus: ['berry-survey'],
    })
    const drops = buildFieldObservationCollectibleDrops({
      rewardSubjects: [],
      spawns: [],
      researchingLevel: 1,
      surveyFocus: 'berry-survey',
      observationDurationMs: 10000,
      globalItemEvents: [{ id: 'test-berry', itemId: 'oran-berry', dropChance: 100, quantity: 1 }],
      collectibleModifiers: modifiers,
      random: () => 0,
    })

    const berryDrop = drops.find((drop) => drop.itemId === 'oran-berry')
    expect(berryDrop?.durationMs).toBe(1785)
    expect(berryDrop?.reward).toMatchObject({ targetId: 'oran-berry', quantity: 2 })
  })

  test('authored secondary effects stay within first-pass balance caps', () => {
    const itemIds = new Set(items.map((item) => item.id))
    const bannedEffectTypes = new Set([
      'encounter-replacement',
      'level-delta',
      'shiny-chance-multiplier',
      'extra-shiny-roll',
      'answer-fail-encounter',
    ])

    for (const ability of Object.values(ABILITIES)) {
      for (const effect of ability.effects || []) {
        expect(bannedEffectTypes.has(effect.type)).toBe(false)
        if (effect.type === 'catch-rate-multiplier') {
          expect(effect.multiplier).toBeLessThanOrEqual(1.08)
        }
        if (effect.type === 'field-observation-pool-weight-multiplier') {
          expect(effect.multiplier).toBeLessThanOrEqual(1.2)
        }
        if (effect.type === 'field-observation-spawn-modifier') {
          expect(effect.spawnCountMultiplier || 1).toBeLessThanOrEqual(1.1)
          expect(effect.shinyChanceMultiplier || 1).toBeLessThanOrEqual(1)
          expect(effect.eventChanceMultiplier || 1).toBeLessThanOrEqual(1.1)
        }
        if (effect.type === 'field-observation-global-event-odds-multiplier') {
          expect(effect.pokemonEventMultiplier || 1).toBeLessThanOrEqual(1.05)
          expect(effect.itemEventMultiplier || 1).toBeLessThanOrEqual(1.1)
        }
        if (effect.type === 'field-observation-research-xp-multiplier') {
          expect(effect.multiplier).toBeLessThanOrEqual(1.05)
        }
        if (effect.type === 'field-observation-reward-protection') {
          expect(effect.chance).toBeLessThanOrEqual(15)
        }
        if (effect.type === 'capture-random-item') {
          expect(effect.chance).toBeLessThanOrEqual(10)
          for (const itemId of effect.itemIds) expect(itemIds.has(itemId)).toBe(true)
        }
        if (effect.type === 'field-observation-extra-collectible') {
          expect(effect.condition?.chance || 100).toBeLessThanOrEqual(8)
          expect(effect.reward.type).toBe('item')
          expect(itemIds.has(String(effect.reward.targetId))).toBe(true)
        }
      }
    }
  })
})
