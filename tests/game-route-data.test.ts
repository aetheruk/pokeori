import { describe, expect, test } from 'bun:test'
import { GAME_ROUTE_USER_SELECT } from '@/utilities/game-route-data'

describe('game route user projection', () => {
  test('includes guild progression needed by route unlocks and trainer UI', () => {
    expect(GAME_ROUTE_USER_SELECT.guilds).toBe(true)
  })
})
