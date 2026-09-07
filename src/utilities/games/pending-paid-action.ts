'use client'

const pending = new Map<string, string>()

export function hasPendingPaidAction(gameType: string, encounterId: string) {
  const key = `pokeori:paid-start:${gameType}:${encounterId}`
  try { return pending.has(key) || Boolean(sessionStorage.getItem(key)) } catch { return pending.has(key) }
}

/** Keep a paid start's identity through a reload while its reply is unknown. */
export function getPendingPaidAction(gameType: string, encounterId: string) {
  const key = `pokeori:paid-start:${gameType}:${encounterId}`
  let actionId = pending.get(key)
  try { actionId ||= sessionStorage.getItem(key) || undefined } catch { /* Storage may be unavailable. */ }
  actionId ||= crypto.randomUUID()
  pending.set(key, actionId)
  try { sessionStorage.setItem(key, actionId) } catch { /* In-page retry remains available. */ }
  return actionId
}

export function clearPendingPaidAction(gameType: string, encounterId: string) {
  const key = `pokeori:paid-start:${gameType}:${encounterId}`
  pending.delete(key)
  try { sessionStorage.removeItem(key) } catch { /* Storage may be unavailable. */ }
}
