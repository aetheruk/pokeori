export interface GameDataGenerationOptions {
  skipFetch?: boolean
  dryRun?: boolean
}

export function getGameDataValidationCommand(): string[] {
  return ['run', 'validate:data']
}

export function getGameDataGenerationCommand(options: GameDataGenerationOptions = {}): string[] {
  const args = ['run', 'generate:game-data']
  const scriptArgs: string[] = []

  if (options.skipFetch) scriptArgs.push('--skip-fetch')
  if (options.dryRun) scriptArgs.push('--dry-run')

  if (scriptArgs.length > 0) args.push('--', ...scriptArgs)

  return args
}

export function formatDevCommandOutput(stdout = '', stderr = '') {
  const combined = [stdout.trim(), stderr.trim()].filter(Boolean).join('\n')
  return combined.slice(-12_000)
}
