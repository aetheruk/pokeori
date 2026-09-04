import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'

import {
  MoveCompactRow,
  MoveDecisionCard,
  MoveFieldNote,
} from '@/components/game/moves'
import type { MoveConfig } from '@/data/moves'
import { getAllMoves } from '@/data/moves'
import {
  getMoveInfoTags,
  getMovePresentation,
} from '@/utilities/pokemon/move-display'

function move(overrides: Partial<MoveConfig> = {}): MoveConfig {
  return {
    id: 'field-test',
    name: 'Field Test',
    description: 'A precise test move.',
    stance: 'tech',
    damage: 1.5,
    target: 'enemy',
    accuracy: 90,
    forcedType: 'grass',
    ...overrides,
  }
}

describe('move presentation', () => {
  test('presents every authored move without parsing or throwing', () => {
    const presentations = getAllMoves().map((entry) =>
      getMovePresentation(entry),
    )

    expect(presentations.length).toBeGreaterThan(800)
    expect(presentations.every((entry) => entry.identity.name.length > 0)).toBe(
      true,
    )
    expect(
      presentations.every(
        (entry) =>
          entry.essentials.power.value.length > 0 &&
          entry.essentials.accuracy.value.length > 0 &&
          entry.summary.length > 0,
      ),
    ).toBe(true)
  })

  test('separates effects, conditions, timing, risks, and rules', () => {
    const presentation = getMovePresentation(
      move({
        multiHit: { minHits: 2, maxHits: 5 },
        status: { id: 'poison', chance: 30 },
        buffs: [{ stat: 'speed', stages: 1 }],
        charged: 1,
        recharge: 1,
        selfDamage: { fraction: 4 },
        battleCondition: { type: 'first-active-turn' },
        ignoreTypeEffectiveness: true,
      }),
    )

    expect(presentation.effects.map((effect) => effect.id)).toContain(
      'multi-hit',
    )
    expect(presentation.effects.map((effect) => effect.id)).toContain('status')
    expect(presentation.conditions[0]?.value).toContain('first active turn')
    expect(presentation.timing.map((effect) => effect.id)).toEqual(
      expect.arrayContaining(['charge', 'recharge']),
    )
    expect(presentation.risks[0]?.value).toContain('1/4')
    expect(presentation.rules[0]?.value).toContain('Ignores type effectiveness')
  })

  test('uses explicit battle context without estimating damage', () => {
    const presentation = getMovePresentation(move(), {
      resolvedType: 'fire',
      offensiveValue: { label: 'Current offense', value: 128 },
      effectiveness: 'super-effective',
      availability: { available: false, reason: 'No uses remaining' },
      source: { kind: 'tm', label: 'TM 042' },
    })

    expect(presentation.identity.type).toBe('fire')
    expect(presentation.identity.authoredType).toBe('grass')
    expect(presentation.essentials.offensiveValue).toEqual({
      label: 'Current offense',
      value: '128',
    })
    expect(presentation.battle?.availability?.reason).toBe('No uses remaining')
  })

  test('describes fixed, delayed, dynamic, and target-stat power models truthfully', () => {
    const fixed = getMovePresentation(
      move({ damage: 0, damageRule: { type: 'flat', amount: 40 } }),
    )
    const delayed = getMovePresentation(
      move({ damage: 0, delayedDamage: { damage: 2, turns: 2 } }),
    )
    const dynamic = getMovePresentation(move({ forcedType: 'random' }), {
      resolvedType: 'water',
    })
    const healing = getMovePresentation(
      move({ damage: 0, heal: true, healByTargetStat: 'attack' }),
    )

    expect(fixed.essentials.power.value).toBe('Special')
    expect(fixed.effects[0]?.value).toContain('exactly 40 damage')
    expect(delayed.timing[0]?.value).toContain('after 2 turns')
    expect(dynamic.identity.type).toBe('water')
    expect(healing.effects[0]?.value).toContain("foe's current Attack")
  })

  test('makes effect chance, duration, scope, and self-damage trigger explicit', () => {
    const presentation = getMovePresentation(
      move({
        selfDamage: { fraction: 2, trigger: 'on-miss' },
        secondaryStatuses: [
          {
            id: 'screen',
            name: 'Light Screen',
            target: 'self-side',
            chance: 100,
            turns: 2,
            triggers: ['turn-end'],
            effects: [{ type: 'damage-reduction', percent: 50 }],
          },
        ],
      }),
    )

    expect(
      presentation.effects.find((entry) => entry.id === 'secondary-0')?.value,
    ).toContain('50%')
    expect(
      presentation.timing.find((entry) => entry.id === 'secondary-timing-0')
        ?.value,
    ).toContain('2 turns')
    expect(presentation.risks[0]?.value).toContain('misses')
  })

  test('keeps the legacy tag helper available during migration', () => {
    expect(getMoveInfoTags(move())).toEqual([
      { label: 'Stance', value: 'tech' },
      { label: 'Type', value: 'grass' },
      { label: 'Accuracy', value: '90%' },
      { label: 'Damage', value: '1.5x (75 BP)' },
    ])
  })

  test('renders all three field-journal densities accessibly', () => {
    const presentation = getMovePresentation(move({ alwaysHits: true }), {
      availability: { available: true },
    })
    const compact = renderToStaticMarkup(
      <MoveCompactRow
        presentation={presentation}
        onDetails={() => undefined}
        detailsText="Info"
        density="tight"
        primaryAction={<button type="button">Assign</button>}
      />,
    )
    const decision = renderToStaticMarkup(
      <MoveDecisionCard
        presentation={presentation}
        primaryAction={<button type="button">Choose move</button>}
      />,
    )
    const note = renderToStaticMarkup(
      <MoveFieldNote presentation={presentation}>
        <p>Can be learned by Bulbasaur.</p>
      </MoveFieldNote>,
    )

    expect(compact).toContain('View Field Test details')
    expect(compact).toContain('Info')
    expect(compact).toContain('Assign')
    expect(compact).toContain('Grass type')
    expect(decision).toContain('Choose move')
    expect(note).toContain('Move field note')
    expect(note).toContain('Can be learned by Bulbasaur.')
    expect(note).toContain('Always hits')
  })
})
