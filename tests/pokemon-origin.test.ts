import { describe, expect, test } from 'bun:test'
import { tasks } from '@/data/tasks'
import {
  resolveEncounterBackground,
  resolveEncounterOrigin,
  resolveTaskPokemonOrigin,
} from '@/utilities/pokemon/origin'

function getTask(id: string) {
  const task = tasks.find((entry) => entry.id === id)
  if (!task) throw new Error(`Missing task ${id}`)
  return task
}

function getPokemonReward(taskId: string) {
  const task = getTask(taskId)
  const reward = task.rewards.find((entry) => entry.type === 'pokemon')
  if (!reward) throw new Error(`Missing Pokemon reward for ${taskId}`)
  return { task, reward }
}

describe('Pokemon origin metadata', () => {
  test('resolves normal wild catch origins', () => {
    expect(resolveEncounterOrigin('route-6')).toMatchObject({
      obtainedMethod: 'caught',
      obtainedRegion: 'Kanto',
      obtainedLocation: 'Route 6',
      obtainedSourceId: 'route-6',
    })
  })

  test('resolves secret catch regions through sub-region metadata', () => {
    expect(resolveEncounterOrigin('pallet-orientation-route-1')).toMatchObject({
      obtainedMethod: 'caught',
      obtainedRegion: 'Kanto',
      obtainedLocation: 'Route 1 Field Catch',
      obtainedSourceId: 'pallet-orientation-route-1',
    })
  })

  test('resolves fishing catch origins', () => {
    expect(resolveEncounterOrigin('fishing:pallet-town-seafront')).toMatchObject({
      obtainedMethod: 'caught',
      obtainedRegion: 'Kanto',
      obtainedLocation: 'Pallet Town',
      obtainedSourceId: 'pallet-town-seafront',
    })
  })

  test('resolves encounter backgrounds for fishing and wild catches', () => {
    expect(resolveEncounterBackground('route-6')).toBe('/backgrounds/grassy-route.avif')
    expect(resolveEncounterBackground('fishing:pallet-town-seafront')).toBe(
      '/backgrounds/beach.avif',
    )
    expect(
      resolveEncounterBackground(
        'fishing:pallet-town-seafront',
        '/backgrounds/custom-fishing.avif',
      ),
    ).toBe('/backgrounds/custom-fishing.avif')
  })

  test('classifies initial partner Pokemon as starters', () => {
    const { task, reward } = getPokemonReward('starter-bulbasaur')
    expect(resolveTaskPokemonOrigin(task, reward)).toEqual({
      obtainedMethod: 'starter',
      obtainedSourceId: 'starter-bulbasaur',
    })
  })

  test('classifies Pokemon handoff rewards as trades', () => {
    const { task, reward } = getPokemonReward('route-2-mr-mime-trade')
    expect(resolveTaskPokemonOrigin(task, reward)).toEqual({
      obtainedMethod: 'trade',
      obtainedSourceId: 'route-2-mr-mime-trade',
    })
  })

  test('classifies authored gifts and purchases', () => {
    const gift = getPokemonReward('day-care-garden-restored')
    const magbyGift = getPokemonReward('day-care-building-restored')
    const purchase = getPokemonReward('magikarp-secret-deal')
    const purchaseCost = purchase.task.criteria.find(
      (entry) => entry.type === 'currency_owned' && entry.targetId === 'pokedollars',
    )

    expect(resolveTaskPokemonOrigin(gift.task, gift.reward)).toMatchObject({
      obtainedMethod: 'gift',
      obtainedRegion: 'Kanto',
      obtainedLocation: 'Cerulean City',
      obtainedSourceId: 'day-care-garden-restored',
    })
    expect(resolveTaskPokemonOrigin(magbyGift.task, magbyGift.reward)).toMatchObject({
      obtainedMethod: 'gift',
      obtainedRegion: 'Kanto',
      obtainedLocation: 'Cerulean City',
      obtainedSourceId: 'day-care-building-restored',
    })
    expect(resolveTaskPokemonOrigin(purchase.task, purchase.reward)).toMatchObject({
      obtainedMethod: 'purchased',
      obtainedRegion: 'Kanto',
      obtainedLocation: 'Mt. Moon',
      obtainedSourceId: 'magikarp-secret-deal',
    })
    expect(purchaseCost).toMatchObject({
      type: 'currency_owned',
      targetId: 'pokedollars',
      count: 5000,
      consume: true,
    })
  })
})
