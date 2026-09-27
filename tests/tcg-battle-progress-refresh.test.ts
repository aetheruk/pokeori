import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, test } from 'bun:test'

describe('TCG battle completion navigation', () => {
  test('defers app updates until the TCG result has been acknowledged', () => {
    const source = readFileSync(
      join(
        process.cwd(),
        'src/app/(frontend)/game/research/encounter/tcg-battle.tsx',
      ),
      'utf8',
    )
    const startEvent = source.indexOf(
      'window.dispatchEvent(new Event(ACTIVITY_STARTED_EVENT))',
    )
    const startAction = source.indexOf(
      'startTcgBattle(encounter.id)',
      startEvent,
    )
    const returnHandler = source.indexOf('const returnToExplore = async () =>')
    const settledEvent = source.indexOf(
      'window.dispatchEvent(new Event(ACTIVITY_SETTLED_EVENT))',
      returnHandler,
    )
    const navigate = source.indexOf(
      "router.push('/game/explore')",
      returnHandler,
    )

    expect(startEvent).toBeGreaterThan(-1)
    expect(startAction).toBeGreaterThan(startEvent)
    expect(settledEvent).toBeGreaterThan(returnHandler)
    expect(navigate).toBeGreaterThan(settledEvent)
  })

  test('refreshes game progress before returning to Explore', () => {
    const source = readFileSync(
      join(
        process.cwd(),
        'src/app/(frontend)/game/research/encounter/tcg-battle.tsx',
      ),
      'utf8',
    )
    const handlerStart = source.indexOf('const returnToExplore = async () =>')
    const refresh = source.indexOf(
      'await refreshUser(false, result?.invalidates)',
      handlerStart,
    )
    const navigate = source.indexOf(
      "router.push('/game/explore')",
      handlerStart,
    )

    expect(handlerStart).toBeGreaterThan(-1)
    expect(refresh).toBeGreaterThan(handlerStart)
    expect(navigate).toBeGreaterThan(refresh)
  })

  test('claims terminal results automatically without a winner-card animation', () => {
    const source = readFileSync(
      join(
        process.cwd(),
        'src/app/(frontend)/game/research/encounter/tcg-battle.tsx',
      ),
      'utf8',
    )
    const controlsStart = source.indexOf('function BattleCommandControls(')
    const controlsEnd = source.indexOf(
      'function LabeledCommandButton(',
      controlsStart,
    )
    const controlsSource = source.slice(controlsStart, controlsEnd)

    expect(controlsStart).toBeGreaterThan(-1)
    expect(controlsSource).toContain("state.phase !== 'finished'")
    expect(controlsSource).toContain('hasAutoClaimedResultRef.current = true')
    expect(controlsSource).toContain('onClaim()')
    expect(controlsSource).not.toContain('TrainerCard')
    expect(controlsSource).not.toContain('onAnimationComplete')
  })

  test('removes the finished battle overlay once the shared result is shown', () => {
    const source = readFileSync(
      join(
        process.cwd(),
        'src/app/(frontend)/game/research/encounter/tcg-battle.tsx',
      ),
      'utf8',
    )
    const finishedBranch = source.indexOf("if (state.phase === 'finished')")
    const overlayGuard = source.indexOf(
      "if (state.phase === 'finished' && resultShown) return null",
      source.indexOf('function BattleCommandControls('),
    )

    expect(finishedBranch).toBeGreaterThan(-1)
    expect(overlayGuard).toBeGreaterThan(
      source.indexOf('function BattleCommandControls('),
    )
  })

  test('does not render the result overlay before the finished state is settled', () => {
    const source = readFileSync(
      join(
        process.cwd(),
        'src/app/(frontend)/game/research/encounter/tcg-battle.tsx',
      ),
      'utf8',
    )
    const resultOverlayStart = source.indexOf('const resultOverlay = useMemo')
    const finishedGuard = source.indexOf(
      "if (!result || completionState?.phase !== 'finished') return null",
      resultOverlayStart,
    )

    expect(resultOverlayStart).toBeGreaterThan(-1)
    expect(finishedGuard).toBeGreaterThan(resultOverlayStart)
  })

  test('waits for the battle action to settle before claiming terminal results', () => {
    const source = readFileSync(
      join(
        process.cwd(),
        'src/app/(frontend)/game/research/encounter/tcg-battle.tsx',
      ),
      'utf8',
    )
    const controlsStart = source.indexOf('function BattleCommandControls(')
    const controlsEnd = source.indexOf(
      'function LabeledCommandButton(',
      controlsStart,
    )
    const controlsSource = source.slice(controlsStart, controlsEnd)

    expect(controlsSource).toContain('resultShown ||')
    expect(controlsSource).toContain('isPending ||')
  })

  test('offers a retry if the result claim cannot be completed', () => {
    const source = readFileSync(
      join(
        process.cwd(),
        'src/app/(frontend)/game/research/encounter/tcg-battle.tsx',
      ),
      'utf8',
    )
    const controlsStart = source.indexOf('function BattleCommandControls(')
    const controlsEnd = source.indexOf(
      'function LabeledCommandButton(',
      controlsStart,
    )
    const controlsSource = source.slice(controlsStart, controlsEnd)

    expect(controlsSource).toContain(
      "if (state.phase === 'finished' && !claimError)",
    )
    expect(controlsSource).toContain('onClick={onClaim}')
    expect(controlsSource).toContain('Retry results')
    expect(source).toContain("meta.kind === 'claim' && !response.completion")
  })

  test('keeps the claimed results screen bound to its settled battle state', () => {
    const source = readFileSync(
      join(
        process.cwd(),
        'src/app/(frontend)/game/research/encounter/tcg-battle.tsx',
      ),
      'utf8',
    )
    const resultOverlayStart = source.indexOf('const resultOverlay = useMemo')
    const completionGuard = source.indexOf(
      "if (!result || completionState?.phase !== 'finished') return null",
      resultOverlayStart,
    )
    const memoEnd = source.indexOf(
      '}, [completionState, result])',
      completionGuard,
    )

    expect(completionGuard).toBeGreaterThan(resultOverlayStart)
    expect(memoEnd).toBeGreaterThan(completionGuard)
  })

  test('claims PVP results from durable match status without requiring game session state', () => {
    const source = readFileSync(
      join(
        process.cwd(),
        'src/app/(frontend)/game/research/games/tcg-battle.ts',
      ),
      'utf8',
    )
    const claimStart = source.indexOf(
      'export async function claimTcgBattleResult()',
    )
    const statusLoad = source.indexOf(
      'const status = await loadTcgPvpStatus(user.id)',
      claimStart,
    )
    const pvpLock = source.indexOf(
      'return await withTcgPvpLock(status.matchId',
      statusLoad,
    )
    const pveFallback = source.indexOf(
      'const state = await loadState(user.id)',
      pvpLock,
    )

    expect(statusLoad).toBeGreaterThan(claimStart)
    expect(pvpLock).toBeGreaterThan(statusLoad)
    expect(pveFallback).toBeGreaterThan(pvpLock)
  })
})
