import { expect, test } from 'bun:test'
import {
  getExpeditionActivityStepStatus,
  getExpeditionTaskStepStatus,
} from '@/utilities/expeditions/step-status'
import { isExpeditionActivity, isExpeditionTaskId } from '@/utilities/expeditions/activity-catalog'

test('expedition task status distinguishes current, stale, and unrelated tasks', () => {
  const steps: any[] = [
    { type: 'activity', activityType: 'task', activityId: 'first' },
    { type: 'activity', activityType: 'task', activityId: 'second' },
  ]

  expect(getExpeditionTaskStepStatus(steps, 0, 'first')).toBe('current')
  expect(getExpeditionTaskStepStatus(steps, 0, 'second')).toBe('stale')
  expect(getExpeditionTaskStepStatus(steps, 0, 'other')).toBe('not-in-expedition')
  expect(
    getExpeditionActivityStepStatus(steps, 1, 'task', 'second'),
  ).toBe('current')
  expect(isExpeditionTaskId('safari-research-29-common')).toBe(true)
  expect(isExpeditionTaskId('fuchsia-gym-koga-rewards')).toBe(true)
  expect(isExpeditionTaskId('safari-north-strength-cache')).toBe(true)
  expect(isExpeditionActivity('game', 'fuchsia-gym-invisible-maze-one')).toBe(true)
  expect(isExpeditionActivity('battle', 'safari-central-rocket-poacher')).toBe(true)
  expect(isExpeditionActivity('location', 'safari-central-catch')).toBe(true)
  expect(isExpeditionTaskId('koga-daily-antidote-practice')).toBe(false)
})

test('expedition task claims require the current run step and reject direct calls', () => {
  const result = Bun.spawnSync({
    cmd: ['bun', 'tests/fixtures/expedition-task-replay-security.ts'],
    cwd: process.cwd(),
    stdout: 'pipe',
    stderr: 'pipe',
  })
  expect(new TextDecoder().decode(result.stderr)).toBe('')
  expect(result.exitCode).toBe(0)
})
