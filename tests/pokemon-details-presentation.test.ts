import { describe, expect, test } from 'bun:test'
import {
  capitalizeFirstLetter,
  getNatureStatEffect,
} from '@/utilities/pokemon/display'

describe('Pokemon detail presentation', () => {
  test('capitalizes nature and Pokemon display names', () => {
    expect(capitalizeFirstLetter('brave')).toBe('Brave')
    expect(capitalizeFirstLetter('charizard')).toBe('Charizard')
    expect(capitalizeFirstLetter('')).toBe('')
  })

  test('resolves nature stat direction for the modal arrows', () => {
    expect(getNatureStatEffect('brave', 'attack')).toBe('increased')
    expect(getNatureStatEffect('brave', 'speed')).toBe('decreased')
    expect(getNatureStatEffect('BrAvE', 'defense')).toBeUndefined()
    expect(getNatureStatEffect('hardy', 'attack')).toBeUndefined()
  })
})
