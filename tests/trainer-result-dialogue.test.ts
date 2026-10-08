import { describe, expect, test } from 'bun:test'

import { battles } from '@/data/battles'
import { getTrainerBattleResultDialogue } from '@/data/battles/trainer-result-dialogue'

describe('trainer battle result dialogue', () => {
  test('Gym Trainer Luis has trainer-win dialogue when the player loses', () => {
    const battle = battles.find(({ id }) => id === 'cerulean-gym-swimmer')
    const dialogue = getTrainerBattleResultDialogue(battle)

    expect(dialogue.loseMessage).toContain('win for my team')
  })

  test('Ray Choo has authored win and loss messages with his name substituted', () => {
    const battle = battles.find(({ id }) => id === 'det-ray-choo-skill-test')
    const dialogue = getTrainerBattleResultDialogue(battle)

    expect(dialogue.loseMessage).toBe(
      'Hmm, I’m not sure you’re ready for this Ray Choo.',
    )
    expect(dialogue.winMessage).toBe(
      'Magnificent Work Ray Choo! I see a bit of my younger self in you.',
    )
  })
})
