import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, test } from 'bun:test'

describe('TCG battle completion navigation', () => {
  test('invalidates cached Explore route data after a successful claim', () => {
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
    const completionSuccess = source.indexOf(
      'if (completion.success)',
      claimStart,
    )
    const invalidate = source.indexOf(
      "revalidatePath('/game/explore')",
      completionSuccess,
    )

    expect(claimStart).toBeGreaterThan(-1)
    expect(completionSuccess).toBeGreaterThan(claimStart)
    expect(invalidate).toBeGreaterThan(completionSuccess)
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
    const refresh = source.indexOf('await refreshUser(false)', handlerStart)
    const navigate = source.indexOf("router.push('/game/explore')", handlerStart)

    expect(handlerStart).toBeGreaterThan(-1)
    expect(refresh).toBeGreaterThan(handlerStart)
    expect(navigate).toBeGreaterThan(refresh)
  })

  test('claims the finished result automatically after the winner animation', () => {
    const source = readFileSync(
      join(
        process.cwd(),
        'src/app/(frontend)/game/research/encounter/tcg-battle.tsx',
      ),
      'utf8',
    )
    const controlsStart = source.indexOf('function BattleCommandControls(')
    const finishedBranch = source.indexOf(
      "if (state.phase === 'finished')",
      controlsStart,
    )
    const autoClaimTimer = source.indexOf(
      'const timer = window.setTimeout',
      controlsStart,
    )
    const claimCall = source.indexOf('claimHandlerRef.current()', controlsStart)

    expect(controlsStart).toBeGreaterThan(-1)
    expect(finishedBranch).toBeGreaterThan(controlsStart)
    expect(autoClaimTimer).toBeGreaterThan(controlsStart)
    expect(claimCall).toBeGreaterThan(autoClaimTimer)
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
      "if (!result || state?.phase !== 'finished') return null",
      resultOverlayStart,
    )

    expect(resultOverlayStart).toBeGreaterThan(-1)
    expect(finishedGuard).toBeGreaterThan(resultOverlayStart)
  })

  test('allows failed automatic claims to retry but stops after success', () => {
    const source = readFileSync(
      join(
        process.cwd(),
        'src/app/(frontend)/game/research/encounter/tcg-battle.tsx',
      ),
      'utf8',
    )
    const controlsStart = source.indexOf('function BattleCommandControls(')
    const resultShownGuard = source.indexOf(
      'if (resultShown) {',
      controlsStart,
    )
    const autoClaimTimer = source.indexOf(
      'const timer = window.setTimeout',
      controlsStart,
    )
    const autoClaimMark = source.indexOf(
      'autoClaimedResultRef.current = resultKey',
      controlsStart,
    )

    expect(resultShownGuard).toBeGreaterThan(controlsStart)
    expect(autoClaimTimer).toBeGreaterThan(resultShownGuard)
    expect(autoClaimMark).toBeGreaterThan(resultShownGuard)
    expect(autoClaimMark).toBeLessThan(autoClaimTimer)
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
    const activeEncounter = source.indexOf(
      'const encounter = await getActiveTcgBattleEncounter(user.id)',
      claimStart,
    )

    expect(statusLoad).toBeGreaterThan(claimStart)
    expect(pvpLock).toBeGreaterThan(statusLoad)
    expect(activeEncounter).toBeGreaterThan(pvpLock)
  })
})
