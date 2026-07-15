import { describe, expect, test } from 'bun:test'
import { formatPokemonFaintedMessage } from '@/utilities/battle/messages'

describe('battle faint messages', () => {
  test('trainer-owned Pokemon faint with the owner name', () => {
    expect(formatPokemonFaintedMessage('Brock', 'Onix')).toBe(
      "Brock's Onix fainted!",
    )
  })

  test('wild Pokemon faint without the generic Wild Pokemon owner label', () => {
    expect(
      formatPokemonFaintedMessage('Wild Pokemon', 'Pidgey', {
        isWildBattle: true,
      }),
    ).toBe('Pidgey fainted!')
  })
})
