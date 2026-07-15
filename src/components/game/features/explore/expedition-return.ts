const EXPEDITION_RETURN_SESSION_KEY = 'explore:returnToExpedition'

export function markExpeditionReturn(expeditionId?: string | null) {
  if (typeof window === 'undefined' || !expeditionId) return
  window.sessionStorage.setItem(EXPEDITION_RETURN_SESSION_KEY, expeditionId)
}

export function getExpeditionReturn(): string | null {
  if (typeof window === 'undefined') return null
  return window.sessionStorage.getItem(EXPEDITION_RETURN_SESSION_KEY)
}

export function clearExpeditionReturn() {
  if (typeof window === 'undefined') return
  window.sessionStorage.removeItem(EXPEDITION_RETURN_SESSION_KEY)
}
