import { describe, expect, test } from 'bun:test'
import { applyInspectionAnswer, createInspectionRound, getInspectionAnswer, type InspectionCard } from '@/utilities/research/tcg-inspection'

const settings = { packSize: 2, requiredAnswers: 2, lives: 2, studySeconds: 10, timeLimit: 30, questionTypes: ['name' as const] }
const cards: InspectionCard[] = ['Pikachu', 'Eevee', 'Abra', 'Gastly'].map((name, index) => ({
  id: String(index), name, number: String(index), artist: 'Artist', rarity: 'Common', supertype: 'Pokémon',
  subtypes: [], nationalPokedexNumbers: [], images: { small: '/card.png', large: '/card.png' }, setId: 'base', setName: 'Base',
}))

describe('server-authoritative TCG inspection', () => {
  test('only actual card answers award points, while wrong choices consume lives', () => {
    const round = createInspectionRound(settings, cards, 1000, () => 0.25)
    const question = round.questions[0]
    const answer = getInspectionAnswer(round.cards[question.targetIndex], question.type)
    const correct = applyInspectionAnswer(settings, round, answer, 2000)
    expect(correct.round.score).toBe(1)
    expect(correct.round.lives).toBe(2)
    expect(round.score).toBe(0)
    const wrong = applyInspectionAnswer(settings, round, question.options.find((option) => option !== answer), 2000)
    expect(wrong.round.score).toBe(0)
    expect(wrong.round.lives).toBe(1)
    expect(wrong.round.revision).toBe(1)
  })

  test('rejects arbitrary answers, expired questions, answer floods and completed rounds', () => {
    const round = createInspectionRound(settings, cards, 1000, () => 0.25)
    const answer = getInspectionAnswer(round.cards[round.questions[0].targetIndex], round.questions[0].type)
    expect(() => applyInspectionAnswer(settings, round, true, 2000)).toThrow('Invalid inspection answer')
    expect(() => applyInspectionAnswer(settings, round, 'forged', 2000)).toThrow('displayed answers')
    expect(() => applyInspectionAnswer(settings, round, answer, round.deadline + 1)).toThrow('Time is up')
    const next = applyInspectionAnswer(settings, round, answer, 2000).round
    expect(() => applyInspectionAnswer(settings, next, answer, 2001)).toThrow('still resolving')
    expect(() => applyInspectionAnswer(settings, { ...round, score: 2 }, answer, 2000)).toThrow('complete')
    expect(() => applyInspectionAnswer(settings, { ...round, lives: 0 }, answer, 2000)).toThrow('complete')
  })
})
