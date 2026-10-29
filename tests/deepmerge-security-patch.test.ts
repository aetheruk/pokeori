import { describe, expect, test } from 'bun:test'
import deepmerge from 'deepmerge'

describe('deepmerge prototype-poisoning patch', () => {
  test('does not copy a source __proto__ key into a null-prototype target', () => {
    const source = JSON.parse('{"__proto__":{"isAdmin":true}}')
    const result = deepmerge(Object.create(null), source) as Record<string, unknown>

    expect(result.isAdmin).toBeUndefined()
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype)
  })

  test('does not poison nested objects when the target value is null', () => {
    const source = JSON.parse('{"session":{"__proto__":{"isAdmin":true}}}')
    const result = deepmerge({ session: null }, source) as unknown as {
      session: Record<string, unknown>
    }

    expect(result.session.isAdmin).toBeUndefined()
    expect(Object.getPrototypeOf(result.session)).toBe(Object.prototype)
  })

  test('does not copy an own __proto__ key from the target', () => {
    const target = JSON.parse('{"__proto__":{"isAdmin":true}}')
    const result = deepmerge(target, {}) as Record<string, unknown>

    expect(result.isAdmin).toBeUndefined()
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype)
  })
})
