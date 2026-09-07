import { expect, test } from 'bun:test'
import { samplePachinkoPosition } from '@/utilities/research/pachinko-playback'

test('Pachinko playback interpolates server frames and holds the final settled position', () => {
  const path: Array<[number, number]> = [[10, 20], [30, 40], [50, 100]]
  expect(samplePachinkoPosition(path, 5, 10)).toEqual([20, 30])
  expect(samplePachinkoPosition(path, 15, 10)).toEqual([40, 70])
  expect(samplePachinkoPosition(path, 2000, 10)).toEqual([50, 100])
  expect(samplePachinkoPosition(path, -10, 10)).toEqual([10, 20])
  expect(samplePachinkoPosition([], 0, 10)).toBeNull()
})
