import { describe, expect, it } from 'bun:test'
import {
  resolveBattleMusic,
  ROCKET_BATTLE_MUSIC,
} from '@/utilities/battle/music'

describe('battle music resolution', () => {
  it('uses the Rocket theme ahead of authored and area music', () => {
    expect(
      resolveBattleMusic({
        trainerClassId: 'rocket-grunt',
        music: '/music/custom-battle.m4a',
        subCategory: 'Mt. Moon',
      }),
    ).toBe(ROCKET_BATTLE_MUSIC)
  })

  it('recognizes Rocket opponents from trainer identity metadata', () => {
    expect(resolveBattleMusic({ trainerName: 'Team Rocket Grunt' })).toBe(
      ROCKET_BATTLE_MUSIC,
    )
    expect(
      resolveBattleMusic({
        icon: { type: 'trainer', id: 'rocket-grunt-m' },
      }),
    ).toBe(ROCKET_BATTLE_MUSIC)
    expect(resolveBattleMusic({ trainerClassId: 'gym-kanto-giovanni' })).toBe(
      ROCKET_BATTLE_MUSIC,
    )
  })

  it('does not treat a non-Rocket trainer with the same name as a Rocket executive as Rocket', () => {
    expect(
      resolveBattleMusic({
        trainerClassId: 'picnicker',
        trainerName: 'Ariana',
        subCategory: 'Rock Tunnel',
      }),
    ).toBe('/music/cave.m4a')
  })

  it('preserves authored music and then falls back to area music for other trainers', () => {
    expect(
      resolveBattleMusic({
        music: '/music/custom-battle.m4a',
        subCategory: 'Mt. Moon',
      }),
    ).toBe('/music/custom-battle.m4a')
    expect(resolveBattleMusic({ subCategory: 'Mt. Moon' })).toBe(
      '/music/mt-moon.m4a',
    )
  })

  it('uses the standard battle fallback when no area or authored track exists', () => {
    expect(resolveBattleMusic({})).toBe('/music/battle.m4a')
  })
})
