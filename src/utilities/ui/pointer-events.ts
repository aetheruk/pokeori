'use client'

const OPEN_INTERACTION_LAYER_SELECTOR = [
  '[data-slot="dialog-content"][data-state="open"]',
  '[data-slot="select-content"][data-state="open"]',
  '[data-slot="dropdown-menu-content"][data-state="open"]',
  '[role="dialog"][data-state="open"]',
  '[role="alertdialog"][data-state="open"]',
  '[data-vaul-drawer][data-state="open"]',
].join(', ')

export function restoreBodyPointerEventsIfIdle() {
  if (typeof document === 'undefined') return

  const hasOpenLayer = document.querySelector(OPEN_INTERACTION_LAYER_SELECTOR)
  if (!hasOpenLayer && document.body.style.pointerEvents === 'none') {
    document.body.style.pointerEvents = ''
  }
}

export function scheduleBodyPointerEventsRestore() {
  if (typeof window === 'undefined') return () => {}

  const timeouts = [0, 50, 250, 500].map((delay) =>
    window.setTimeout(restoreBodyPointerEventsIfIdle, delay),
  )

  return () => {
    for (const timeout of timeouts) {
      window.clearTimeout(timeout)
    }
  }
}
