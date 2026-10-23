import { describe, expect, test } from 'bun:test'
import { verifyRockPushProof } from '@/utilities/research/rock-push-verification'
import type { RockPushGameConfig } from '@/data/games/rock-push/types'
import { testbasicEntries } from '@/data/games/rock-push/entries/test'

describe('rock-push transcript verification', () => {
  test('open-choice course clears after three distinct verified Route 1 battles', () => {
    const course = testbasicEntries[0].settings
    const moves = [
      'interact:right', 'right', 'right', 'interact:right',
      'right', 'right', 'right', 'right', 'interact:right',
    ]
    const wins = {
      'entry:entry-rattata': 3,
      'entry:entry-pidgey': 3,
      'meadow:meadow-pidgey': 3,
      'meadow:meadow-rattata': 3,
      'woodland:woodland-pidgey': 3,
    }
    const proof = { kind: 'rock-push', moves }
    expect(verifyRockPushProof(course, proof, wins)).toEqual({ solved: true, prizeIds: [] })
    expect(verifyRockPushProof(course, proof).solved).toBe(false)
    expect(verifyRockPushProof(course, proof, {
      ...wins,
      'meadow:meadow-pidgey': 0,
      'meadow:meadow-rattata': 0,
      'woodland:woodland-pidgey': 0,
    }).solved).toBe(false)
    expect(verifyRockPushProof(course, { ...proof, moves: moves.slice(0, -1) }, wins).solved).toBe(false)
  })

  const settings: RockPushGameConfig['settings'] = {
    variant: 'rock-push', grid_size: 6, playerStart: { x: 1, y: 2 }, maxMoves: 1,
    boulders: [{ x: 2, y: 2 }], holes: [{ x: 3, y: 2 }],
    prizes: [{ id: 'visited', x: 2, y: 2, itemId: 'potion' }, { id: 'unvisited', x: 4, y: 4, itemId: 'potion' }],
  }
  test('fills holes and derives prizes from the player path', () => {
    expect(verifyRockPushProof(settings, { kind: 'rock-push', moves: ['right'] })).toEqual({ solved: true, prizeIds: ['visited'] })
    expect(verifyRockPushProof(settings, { kind: 'rock-push', moves: [] }).solved).toBe(false)
    expect(verifyRockPushProof(settings, { kind: 'rock-push', moves: ['right', 'right'] }).solved).toBe(false)
    expect(verifyRockPushProof(settings, true).solved).toBe(false)
    expect(verifyRockPushProof({ ...settings, barriers: [{ x: 3, y: 2 }] }, { kind: 'rock-push', moves: ['right'] }).solved).toBe(false)
  })
  test('replays ice sliding and allows authored back-wall doorways', () => {
    const ice = { ...settings, holes: [{ x: 4, y: 2 }], ice: [{ x: 3, y: 2 }] }
    expect(verifyRockPushProof(ice, { kind: 'rock-push', moves: ['right'] }).solved).toBe(true)
    const doorway = { ...settings, boulders: [], holes: [], playerStart: { x: 3, y: 1 }, winTiles: [{ x: 3, y: 0 }] }
    expect(verifyRockPushProof(doorway, { kind: 'rock-push', moves: ['up'] }).solved).toBe(true)
  })
  test('keeps separate screen state and scoped prizes when teleporting', () => {
    const multi: RockPushGameConfig['settings'] = {
      variant: 'rock-push', grid_size: 6, playerStart: { x: 1, y: 1 }, startScreen: 'a',
      screens: [
        { id: 'a', teleporters: [{ id: 'portal', x: 2, y: 1, target: { screen: 'b', x: 1, y: 1 } }] },
        { id: 'b', winTiles: [{ x: 2, y: 1 }], prizes: [{ id: 'arrival', itemId: 'potion', x: 1, y: 1 }] },
      ],
    }
    expect(verifyRockPushProof(multi, { kind: 'rock-push', moves: ['right', 'right'] })).toEqual({ solved: true, prizeIds: ['b:arrival'] })
  })
  test('replays the Rocket Slots center door and bottom-center exit mats', () => {
    const multi: RockPushGameConfig['settings'] = {
      variant: 'rock-push', grid_size: 7, playerStart: { x: 3, y: 5 }, startScreen: 'arcade-floor',
      screens: [
        {
          id: 'arcade-floor',
          teleporters: [{ id: 'high-stakes-room-door', x: 3, y: 0, target: { screen: 'high-stakes-room', x: 3, y: 5 } }],
          winTiles: [{ x: 3, y: 6 }],
        },
        {
          id: 'high-stakes-room',
          teleporters: [{ id: 'arcade-return-mat', x: 3, y: 6, target: { screen: 'arcade-floor', x: 3, y: 5 } }],
        },
      ],
    }
    const enterHighStakes = Array(5).fill('up')
    expect(verifyRockPushProof(multi, { kind: 'rock-push', moves: ['down'] }).solved).toBe(true)
    expect(verifyRockPushProof(multi, { kind: 'rock-push', moves: [...enterHighStakes, 'down'] }).solved).toBe(false)
    const moves = [...enterHighStakes, 'down', 'down']
    expect(verifyRockPushProof(multi, { kind: 'rock-push', moves }).solved).toBe(true)
  })
  test('object victory requires new server-recorded wins, one per interaction', () => {
    const objectBoard: RockPushGameConfig['settings'] = {
      variant: 'rock-push', grid_size: 6, playerStart: { x: 1, y: 1 },
      objects: [
        { id: 'a', objectId: 'battle-trigger', x: 2, y: 1, interaction: { type: 'battle', targetId: 'trainer', victory: 'clear' } },
        { id: 'b', objectId: 'battle-trigger', x: 3, y: 1, interaction: { type: 'battle', targetId: 'trainer', victory: 'win' } },
      ],
    }
    const proof = { kind: 'rock-push', moves: ['right', 'right'] }
    expect(verifyRockPushProof(objectBoard, proof).solved).toBe(false)
    expect(verifyRockPushProof(objectBoard, proof, { 'main:a': 1, 'main:b': 1 }).solved).toBe(false)
    expect(verifyRockPushProof(objectBoard, proof, { 'main:a': 2, 'main:b': 2 }).solved).toBe(true)
  })
})
