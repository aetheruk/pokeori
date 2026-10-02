import { describe, expect, test } from 'bun:test'

import { battles } from '@/data/battles'
import { getTrainerBattleResultDialogue } from '@/data/battles/trainer-result-dialogue'

describe('trainer battle result dialogue', () => {
  test('Gym Trainer Luis has trainer-win dialogue when the player loses', () => {
    const battle = battles.find(({ id }) => id === 'cerulean-gym-swimmer')
    const dialogue = getTrainerBattleResultDialogue(battle)

    expect(dialogue.loseMessage).toContain('win for my team')
  })
})
