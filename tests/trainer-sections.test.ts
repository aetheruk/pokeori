import { describe, expect, test } from 'bun:test'
import {
  getTrainerSectionHref,
  resolveTrainerSection,
} from '@/components/game/trainer/trainer-sections'

describe('trainer journal sections', () => {
  test('normalizes invalid, inventory-gated, and kid-restricted URLs', () => {
    expect(
      resolveTrainerSection('unknown', { hasDeckBox: true, isKidMode: false }),
    ).toBe('profile')
    expect(
      resolveTrainerSection('decks', { hasDeckBox: false, isKidMode: false }),
    ).toBe('profile')
    expect(
      resolveTrainerSection('friends', { hasDeckBox: true, isKidMode: true }),
    ).toBe('profile')
    expect(
      resolveTrainerSection('rankings', { hasDeckBox: true, isKidMode: false }),
    ).toBe('rankings')
  })

  test('uses a clean profile URL and stable query values for other sections', () => {
    expect(getTrainerSectionHref('profile')).toBe('/game')
    expect(getTrainerSectionHref('gift')).toBe('/game?section=gift')
  })
})
