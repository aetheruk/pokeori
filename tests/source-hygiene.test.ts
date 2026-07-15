import { describe, expect, test } from 'bun:test'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry)
    const stats = statSync(path)
    if (stats.isDirectory()) {
      if (path.includes(join('src', 'app', 'api', 'pokemon-sprite'))) return []
      if (path.includes(join('src', 'data', 'tcg'))) return []
      return sourceFiles(path)
    }
    return /\.(ts|tsx)$/.test(entry) ? [path] : []
  })
}

describe('source hygiene', () => {
  test('dev entry actions do not evaluate entry file contents', () => {
    const source = readFileSync(join(process.cwd(), 'src/app/dev/actions.ts'), 'utf-8')

    expect(source).not.toContain('eval(')
    expect(source).not.toContain('new Function')
  })

  test('Payload scripts invoke the CLI binary without recursively calling Bun scripts', () => {
    const packageJson = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8')) as {
      scripts: Record<string, string>
    }
    const scripts = packageJson.scripts

    expect(scripts.payload).toBe('cross-env NODE_OPTIONS=--no-deprecation payload')
    expect(scripts['generate:types']).toBe(
      'cross-env NODE_OPTIONS=--no-deprecation payload generate:types',
    )
    expect(scripts['generate:importmap']).toBe(
      'cross-env NODE_OPTIONS=--no-deprecation payload generate:importmap',
    )
    expect(scripts.payload).not.toContain('bun payload')
    expect(scripts['generate:types']).not.toContain('bun payload')
    expect(scripts['generate:importmap']).not.toContain('bun payload')
  })

  test('Pokemon UI sprites use bundled local assets instead of runtime pokemon proxy URLs', () => {
    const files = sourceFiles(join(process.cwd(), 'src'))
    const offenders = files.filter((file) =>
      readFileSync(file, 'utf-8').includes('/api/pokemon-sprite/pokemon'),
    )

    expect(offenders).toEqual([])
  })

  test('Pokemon type icons use bundled local assets instead of runtime type proxy URLs', () => {
    const files = sourceFiles(join(process.cwd(), 'src'))
    const offenders = files.filter((file) => {
      const source = readFileSync(file, 'utf-8')
      return (
        source.includes('/api/pokemon-sprite/type') ||
        source.includes('getPokemonTypeIconProxyUrl')
      )
    })

    expect(offenders).toEqual([])
  })

  test('Item UI sprites use bundled local assets instead of runtime item proxy URLs', () => {
    const files = sourceFiles(join(process.cwd(), 'src'))
    const offenders = files.filter((file) => {
      const source = readFileSync(file, 'utf-8')
      return (
        source.includes('getItemSpriteProxyUrl') ||
        source.includes('getItemSpriteUrlRemote') ||
        source.includes('resource=item')
      )
    })

    expect(offenders).toEqual([])
  })

  test('enemy attacks do not use free type-based status riders', () => {
    const files = sourceFiles(join(process.cwd(), 'src'))
    const offenders = files.filter((file) => {
      const source = readFileSync(file, 'utf-8')
      return (
        source.includes('attemptTypeBasedStatus') ||
        source.includes('FORM_STATUS_OVERRIDES') ||
        source.includes('form-status-overrides')
      )
    })

    expect(offenders).toEqual([])
  })
})
