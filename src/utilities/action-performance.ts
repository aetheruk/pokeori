type Outcome = 'success' | 'replay' | 'busy' | 'error' | 'unavailable' | 'acquired' | 'released'

/** Bounded labels only: keys, account IDs, action arguments and responses never enter logs. */
export function startActionPerformance(operation: 'economy' | 'lock-acquire' | 'lock-release') {
  const enabled = process.env.GAME_PERFORMANCE_LOGS === 'true'
  const started = enabled ? performance.now() : 0
  let attempts = 0
  let retries = 0
  let rollbackErrors = 0
  return {
    attempt() { attempts += 1 },
    retry() { retries += 1 },
    rollbackError() { rollbackErrors += 1 },
    finish(outcome: Outcome) {
      if (!enabled) return
      // Logging must never turn a successful payment or lock release into a failure.
      try {
        console.info(JSON.stringify({
          event: 'game-action', operation, outcome,
          durationMs: Math.round((performance.now() - started) * 100) / 100,
          attempts, retries, rollbackErrors,
        }))
      } catch { /* Telemetry is best effort. */ }
    },
  }
}
