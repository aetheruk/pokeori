import { expect, test } from 'bun:test'
import { ceruleanCityrhythmEntries } from '@/data/games/rhythm/entries/cerulean-city'
import { createArcadeRound, stepArcadeSimulation } from '@/utilities/research/arcade-authority'
import { getAchievedUnclaimedMilestones } from '@/utilities/research/endless-milestones'

function play(index: number, quality: (id: number) => 'perfect' | 'great' | 'good' | 'miss', seed = 42) {
  const game = ceruleanCityrhythmEntries[index]
  let simulation = createArcadeRound('rhythm', game.settings, 0, seed).simulation
  while (simulation.status === 'playing') {
    const input = simulation.rhythmIcons.some((icon) => {
      const hit = quality(icon.id)
      if (hit === 'miss') return false
      const window = hit === 'perfect' ? 8 : hit === 'great' ? 23 : 33
      return Math.abs(icon.x + game.settings.speed / 60 + 32 - 255) <= window
    })
    simulation = stepArcadeSimulation('rhythm', game.settings, simulation,
      input ? [{ tick: simulation.tick + 1, kind: 'rhythm', value: 0 }] : [])
  }
  return simulation.score
}

for (const [index, notes, easy, middle, top] of [[0, 16, 120, 320, 460], [1, 49, 360, 980, 1400]]) {
  const game = ceruleanCityrhythmEntries[index]
  test(`${game.id} offers consistent achievable tiers across seeds`, () => {
    expect(game.settings.endless!.milestones.map((milestone) => milestone.score)).toEqual([easy, middle, top])
    // Last-spawn cutoff includes the travel into the Perfect hit window.
    const travelTicks = Math.ceil((255 - 32 - 8) / (game.settings.speed / 60))
    const intervalTicks = game.settings.spawnRate.min * 60
    expect(game.settings.spawnRate.max).toBe(game.settings.spawnRate.min)
    expect(Math.floor((game.settings.timeLimit * 60 - travelTicks) / intervalTicks)).toBe(notes)
    for (const seed of [1, 42, 19375, 0x9e3779b1, 0xffffffff]) {
      expect(play(index, () => 'perfect', seed)).toBe(notes * 30)
    }
    const good = play(index, () => 'good')
    expect(good).toBe(notes * 10)
    expect(getAchievedUnclaimedMilestones(game.settings.endless!.milestones, good, []).map((milestone) => milestone.score)).toEqual([easy])
    const great = play(index, () => 'great')
    expect(great).toBe(notes * 20)
    expect(getAchievedUnclaimedMilestones(game.settings.endless!.milestones, great, []).map((milestone) => milestone.score)).toEqual([easy, middle])
    // Roughly 80% Perfect with the rest Great must still fall below top tier.
    expect(play(index, (id) => id < Math.floor(notes * 0.82) ? 'perfect' : 'great')).toBeLessThan(top)
    const perfectNeeded = index === 0 ? 14 : 42
    expect(play(index, (id) => id < perfectNeeded ? 'perfect' : 'great')).toBe(top)
    expect(top / (notes * 30)).toBeGreaterThanOrEqual(0.95)
  })
}
