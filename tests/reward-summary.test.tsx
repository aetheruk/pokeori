import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { RewardSummaryDisplay } from '@/components/game/reward-summary'
import type { RewardSummary } from '@/utilities/rewards/reward-logic'

function summary(overrides: Partial<RewardSummary> = {}): RewardSummary {
  return {
    xp: {},
    items: [],
    pokemon: [],
    currency: [],
    cards: [],
    tasksCompleted: [],
    banners: [],
    icons: [],
    titles: [],
    upgrades: [],
    ...overrides,
  }
}

describe('reward summary sections', () => {
  test('separates skill experience, research unlocks, and ordinary rewards', () => {
    const markup = renderToStaticMarkup(
      <RewardSummaryDisplay
        summary={summary({
          xp: { battling: 25 },
          items: [
            { id: 'tm-ember', name: 'TM: Ember', quantity: 1 },
            { id: 'potion', name: 'Potion', quantity: 2 },
          ],
          currency: [{ type: 'pokedollars', quantity: 100 }],
          researchXp: [
            { formId: '1', formName: 'Bulbasaur', amount: 3 },
          ],
          sketchedMoves: [{ id: 'ember', name: 'Ember' }],
        })}
      />,
    )

    const skillIndex = markup.indexOf('Skill EXP')
    const researchIndex = markup.indexOf('Research')
    const rewardsIndex = markup.indexOf('Rewards')

    expect(skillIndex).toBeGreaterThanOrEqual(0)
    expect(researchIndex).toBeGreaterThan(skillIndex)
    expect(rewardsIndex).toBeGreaterThan(researchIndex)
    expect(markup.indexOf('TM: Ember')).toBeLessThan(rewardsIndex)
    expect(markup.indexOf('Potion')).toBeGreaterThan(rewardsIndex)
    expect(markup).toContain('Bulbasaur Research')
    expect(markup).toContain('Sketched')
  })
})
