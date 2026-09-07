type Recovery = { id: number; message: string; retry: () => void }
type RecoveryCallbacks = {
  onFailure?: () => void
  onRetry?: () => void
}
let nextId = 0
let routeGeneration = 0
let failures: Recovery[] = []
const listeners = new Set<() => void>()
const notify = () => listeners.forEach((listener) => listener())

export const subscribeToGameRecovery = (listener: () => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
export const getGameRecovery = () => failures[0] ?? null
export const getServerGameRecovery = () => null

export function clearGameRecovery() {
  routeGeneration += 1
  failures = []
  notify()
}

/** Keep the caller's score/result state intact while the player retries transport
 * failures. Completion retries use the server's per-session result receipt. */
export async function recoverGameAction<T>(
  action: () => Promise<T>,
  message: string,
  getError?: (result: T) => string | undefined,
  callbacks?: RecoveryCallbacks,
): Promise<T> {
  const generation = routeGeneration
  while (true) {
    let failure = message
    try {
      const result = await action()
      if (generation !== routeGeneration) return new Promise<T>(() => {})
      const error = getError?.(result)
      if (!error) return result
      failure = error
    } catch {
      // The server may already have committed the action. Never reset the run.
    }
    if (generation !== routeGeneration) return new Promise<T>(() => {})
    callbacks?.onFailure?.()
    await new Promise<void>((resolve) => {
      const id = ++nextId
      failures = [
        ...failures,
        {
          id,
          message: failure,
          retry: () => {
            failures = failures.filter((entry) => entry.id !== id)
            notify()
            callbacks?.onRetry?.()
            resolve()
          },
        },
      ]
      notify()
    })
  }
}
