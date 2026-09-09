import { describe, expect, test } from 'bun:test'
import { verifyRockPushProof } from '@/utilities/research/rock-push-verification'
import type { RockPushGameConfig } from '@/data/games/rock-push/types'
import { testbasicEntries } from '@/data/games/rock-push/entries/test'

describe('rock-push transcript verification', () => {
  test('combined course is solvable only after both checkpoints and both rock puzzles', () => {
    const course = testbasicEntries[0].settings
    const moves = [
      'down', 'right', 'right', 'right', 'right',
      'down', 'right', 'down', 'down', 'right', 'right', 'right',
      'down', 'right', 'right', 'right', 'down',
    ]
    const wins = { 'frost:wild-checkpoint': 1, 'vault:trainer-checkpoint': 1 }
    const proof = { kind: 'rock-push', moves }
    expect(verifyRockPushProof(course, proof, wins)).toEqual({
      solved: true,
      prizeIds: ['entry:entry-supplies', 'frost:ice-supplies', 'vault:vault-supplies'],
    })
    expect(verifyRockPushProof(course, proof).solved).toBe(false)
    expect(verifyRockPushProof(course, proof, { 'frost:wild-checkpoint': 1 }).solved).toBe(false)
    expect(verifyRockPushProof(course, proof, { 'vault:trainer-checkpoint': 1 }).solved).toBe(false)
    expect(verifyRockPushProof(course, { ...proof, moves: moves.slice(0, -1) }, wins).solved).toBe(false)
    // Return through the paired portal, then revisit the already-solved first room.
    const returnTrip = [...moves.slice(0, 5), 'down', 'up', 'left', 'right', ...moves.slice(5)]
    expect(verifyRockPushProof(course, { ...proof, moves: returnTrip }, wins)).toEqual(verifyRockPushProof(course, proof, wins))
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
