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
  test('guild rank ups use the authored guild icon', () => {
    const markup = renderToStaticMarkup(
      <RewardSummaryDisplay
        summary={summary({
          guildRankUps: [
            {
              guildId: 'underground-society',
              guildName: 'Underground Society',
              oldRank: 0,
              newRank: 1,
              rankName: 'New Recruit',
              unlocks: ['Society membership'],
            },
          ],
        })}
      />,
    )

    expect(markup).toContain('Rank 1: New Recruit')
    expect(markup).toContain('tcg-maniac-m.avif')
  })

  test('shows Other and Rewards before the experience sections', () => {
    const markup = renderToStaticMarkup(
      <RewardSummaryDisplay
        summary={summary({
          xp: { battling: 25 },
          items: [
            { id: 'tm-ember', name: 'TM: Ember', quantity: 1 },
            { id: 'potion', name: 'Potion', quantity: 2 },
          ],
          currency: [{ type: 'pokedollars', quantity: 100 }],
          tasksCompleted: [{ id: 'test-task', name: 'Test task' }],
          researchXp: [{ formId: '1', formName: 'Bulbasaur', amount: 3 }],
          pokemonExperience: [
            {
              pokemonId: 'test-pokemon',
              pokemonName: 'Pikachu',
              amount: 12,
              oldLevel: 4,
              newLevel: 5,
              levelCap: 20,
            },
          ],
          guildExperience: [
            {
              guildId: 'test-guild',
              guildName: 'Test Guild',
              amount: 5,
              oldExperience: 0,
              newExperience: 5,
              oldRank: 1,
              newRank: 1,
            },
          ],
          sketchedMoves: [{ id: 'ember', name: 'Ember' }],
        })}
      />,
    )

    const otherIndex = markup.indexOf('Other')
    const rewardsIndex = markup.indexOf('Rewards')
    const pokemonExpIndex = markup.indexOf('EXP</div>')
    const skillIndex = markup.indexOf('Skill EXP')
    const guildIndex = markup.indexOf('Guild progress')
    const researchIndex = markup.indexOf('Research')

    expect(otherIndex).toBeGreaterThanOrEqual(0)
    expect(rewardsIndex).toBeGreaterThan(otherIndex)
    expect(pokemonExpIndex).toBeGreaterThan(rewardsIndex)
    expect(skillIndex).toBeGreaterThan(pokemonExpIndex)
    expect(guildIndex).toBeGreaterThan(skillIndex)
    expect(researchIndex).toBeGreaterThan(guildIndex)
    expect(skillIndex).toBeGreaterThanOrEqual(0)
    expect(markup.indexOf('TM: Ember')).toBeGreaterThan(rewardsIndex)
    expect(markup.indexOf('Potion')).toBeGreaterThan(rewardsIndex)
    expect(markup).toContain('Bulbasaur Research')
    expect(markup).toContain('Sketched')
  })
})
