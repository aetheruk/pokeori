import { logger } from '@/utilities/logger'

type TimingPhase = {
  name: string
  totalMs: number
  deltaMs: number
}

const isBattleTurnTimingEnabled = () => process.env.BATTLE_TURN_TIMING === '1'

const now = () => {
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    return performance.now()
  }
  return Date.now()
}

const roundMs = (value: number) => Math.round(value * 10) / 10

export function createBattleTurnTimer(
  label: string,
  context: Record<string, unknown> = {},
) {
  const enabled = isBattleTurnTimingEnabled()
  const startedAt = enabled ? now() : 0
  let lastMarkAt = startedAt
  const phases: TimingPhase[] = []

  const mark = (name: string) => {
    if (!enabled) return

    const current = now()
    phases.push({
      name,
      totalMs: roundMs(current - startedAt),
      deltaMs: roundMs(current - lastMarkAt),
    })
    lastMarkAt = current
  }

  return {
    mark,
    async time<T>(name: string, work: () => T | Promise<T>): Promise<Awaited<T>> {
      if (!enabled) return await work()

      const phaseStartedAt = now()
      try {
        return await work()
      } finally {
        const current = now()
        phases.push({
          name,
          totalMs: roundMs(current - startedAt),
          deltaMs: roundMs(current - phaseStartedAt),
        })
        lastMarkAt = current
      }
    },
    done(extra: Record<string, unknown> = {}) {
      if (!enabled) return

      logger.info('[battle-turn-timing]', {
        label,
        ...context,
        ...extra,
        totalMs: roundMs(now() - startedAt),
        phases,
      })
    },
  }
}
