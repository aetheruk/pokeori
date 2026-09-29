'use client'

import { HapticsProvider } from '@haptics/react'
import { useLayoutEffect, useState, type ReactNode } from 'react'

const HAPTIC_CONTROL_SELECTOR = [
  'button',
  'a[href]',
  'summary',
  '[role="button"]',
  '[role="link"]',
  '[role="tab"]',
  '[role="menuitem"]',
  '[role="menuitemcheckbox"]',
  '[role="menuitemradio"]',
  '[role="option"]',
  '[role="radio"]',
  '[role="checkbox"]',
  '[role="switch"]',
  '[role="gridcell"]',
  '[role="treeitem"]',
].join(',')

function markHapticControls(root: HTMLElement) {
  const controls = [
    ...(root.matches(HAPTIC_CONTROL_SELECTOR) ? [root] : []),
    ...root.querySelectorAll<HTMLElement>(HAPTIC_CONTROL_SELECTOR),
  ]
  let markedControl = false

  for (const control of controls) {
    if (control.hasAttribute('data-haptic')) continue

    // A full-size iOS switch overlay on a compound control could cover its
    // nested buttons. Those child controls get their own overlays instead.
    if (control.querySelector(HAPTIC_CONTROL_SELECTOR)) continue

    control.setAttribute('data-haptic', 'selection')
    markedControl = true
  }

  return markedControl
}

/** Adds the shared selection haptic to actionable frontend controls. */
export function FrontendHapticsProvider({ children }: { children: ReactNode }) {
  const [hapticsGeneration, setHapticsGeneration] = useState(0)

  useLayoutEffect(() => {
    const root = document.body
    markHapticControls(root)

    // React portals and later route/dialog content are outside the provider's
    // rendered subtree, so observe the frontend document for newly added UI.
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes') {
          if (
            mutation.target instanceof HTMLElement &&
            markHapticControls(mutation.target)
          ) {
            // The haptics library observes added nodes, not role/href changes.
            // Remount once so a newly interactive existing node is attached.
            setHapticsGeneration((generation) => generation + 1)
          }
          continue
        }

        const host =
          mutation.target instanceof HTMLElement &&
          mutation.target.isConnected &&
          mutation.target.hasAttribute('data-haptic')
            ? mutation.target
            : null
        const removedOverlays: HTMLInputElement[] = []

        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLElement) markHapticControls(node)
        }

        for (const node of mutation.removedNodes) {
          if (
            node instanceof HTMLInputElement &&
            node.hasAttribute('data-haptic-overlay')
          ) {
            removedOverlays.push(node)
          }
        }

        // React can replace a button's text children and remove the library's
        // injected input with them. Keep that same wired input attached; when a
        // whole control unmounts, its overlay is removed with the control.
        if (
          host &&
          (mutation.addedNodes.length > 0 ||
            mutation.removedNodes.length > removedOverlays.length) &&
          !host.querySelector('[data-haptic-overlay]')
        ) {
          for (const overlay of removedOverlays) host.appendChild(overlay)
        }
      }
    })
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['href', 'role'],
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [])

  return (
    <HapticsProvider
      key={hapticsGeneration}
      respectReducedMotion
    >
      {children}
    </HapticsProvider>
  )
}
