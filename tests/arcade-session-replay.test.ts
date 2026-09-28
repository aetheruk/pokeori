import { describe, expect, test } from 'bun:test'

describe('arcade session replay', () => {
  test('refreshes the activity in-app instead of reloading the browser', async () => {
    const source = await Bun.file(
      new URL('../src/hooks/use-arcade-session.ts', import.meta.url),
    ).text()
    const replayHandler =
      source.match(/const replay = async \(\) => \{([\s\S]*?)\n {2}\}/)?.[1] ?? ''

    expect(replayHandler).toContain('router.refresh()')
    expect(replayHandler).not.toContain('window.location.reload()')
  })
})
