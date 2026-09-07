import { expect, test } from 'bun:test'
import { clearPendingPaidAction, getPendingPaidAction, hasPendingPaidAction } from '@/utilities/games/pending-paid-action'

test('a reloaded paid start reuses its saved request identity until acknowledged', () => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'sessionStorage')
  const values = new Map([['pokeori:paid-start:prize-wheel:paid-test', 'saved-before-reload']])
  Object.defineProperty(globalThis, 'sessionStorage', { configurable: true, value: {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    removeItem: (key: string) => values.delete(key),
  } })
  try {
    expect(hasPendingPaidAction('prize-wheel', 'paid-test')).toBe(true)
    expect(getPendingPaidAction('prize-wheel', 'paid-test')).toBe('saved-before-reload')
    expect(getPendingPaidAction('ufo-catcher', 'paid-test')).not.toBe('saved-before-reload')
    clearPendingPaidAction('prize-wheel', 'paid-test')
    expect(hasPendingPaidAction('prize-wheel', 'paid-test')).toBe(false)
    expect(getPendingPaidAction('prize-wheel', 'paid-test')).not.toBe('saved-before-reload')
  } finally {
    clearPendingPaidAction('prize-wheel', 'paid-test')
    clearPendingPaidAction('ufo-catcher', 'paid-test')
    if (descriptor) Object.defineProperty(globalThis, 'sessionStorage', descriptor)
    else Reflect.deleteProperty(globalThis, 'sessionStorage')
  }
})
