import { describe, expect, test } from 'bun:test'
import {
  formatDevCommandOutput,
  getGameDataGenerationCommand,
  getGameDataValidationCommand,
} from '@/utilities/dev/game-data-tools'

describe('dev game data tools', () => {
  test('builds validation command', () => {
    expect(getGameDataValidationCommand()).toEqual(['run', 'validate:data'])
  })

  test('builds generation commands for normal, local, and dry-run modes', () => {
    expect(getGameDataGenerationCommand()).toEqual(['run', 'generate:game-data'])
    expect(getGameDataGenerationCommand({ skipFetch: true })).toEqual([
      'run',
      'generate:game-data',
      '--',
      '--skip-fetch',
    ])
    expect(getGameDataGenerationCommand({ skipFetch: true, dryRun: true })).toEqual([
      'run',
      'generate:game-data',
      '--',
      '--skip-fetch',
      '--dry-run',
    ])
  })

  test('formats bounded command output', () => {
    const output = formatDevCommandOutput('ok', 'warn')
    expect(output).toBe('ok\nwarn')
    expect(formatDevCommandOutput('x'.repeat(13_000)).length).toBe(12_000)
  })
})
