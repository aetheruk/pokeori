import type { TcgCard } from '@/data/tcg/types'
import type { TcgInspectionGameSettings, TcgInspectionQuestionType } from '@/data/games/tcg-inspection/types'

export type InspectionCard = TcgCard & { setId: string; setName: string }
export type InspectionQuestion = { type: TcgInspectionQuestionType; targetIndex: number; prompt: string; options: string[] }
export type InspectionRound = {
  kind: 'tcg-inspection'
  cards: InspectionCard[]
  questions: InspectionQuestion[]
  index: number
  score: number
  lives: number
  revision: number
  studyUntil: number
  deadline: number
  availableAt: number
}

const types: TcgInspectionQuestionType[] = ['name', 'rarity', 'supertype', 'number', 'artist', 'pokemonType', 'hp']
const prompts: Record<TcgInspectionQuestionType, string> = {
  name: 'Which card was shown as card', rarity: 'What rarity was card', supertype: 'What type was card',
  set: 'Which set was card', number: 'What collector number was card', artist: 'Who illustrated card',
  pokemonType: 'What Pokémon type was card', hp: 'How much HP did card',
}
export function getInspectionAnswer(card: InspectionCard, type: TcgInspectionQuestionType): string {
  if (type === 'set') return card.setName
  if (type === 'pokemonType') return card.types?.[0] || ''
  return String(card[type] || '')
}
function shuffle<T>(values: T[], random: () => number): T[] {
  const result = [...values]
  for (let index = result.length - 1; index > 0; index--) {
    const other = Math.floor(random() * (index + 1))
    ;[result[index], result[other]] = [result[other], result[index]]
  }
  return result
}
export function createInspectionRound(settings: TcgInspectionGameSettings, pool: InspectionCard[], now: number, random = Math.random): InspectionRound {
  if (!Number.isSafeInteger(settings.packSize) || settings.packSize < 1 || settings.packSize > 20 ||
      !Number.isSafeInteger(settings.requiredAnswers) || settings.requiredAnswers < 1 || settings.requiredAnswers > 100 ||
      !Number.isSafeInteger(settings.lives || 2) || (settings.lives || 2) < 1 || (settings.lives || 2) > 20) throw new Error('Invalid inspection configuration')
  const eligible = pool.filter((card) => card.images?.small &&
    (!settings.allowedRarities?.length || (card.rarity && settings.allowedRarities.includes(card.rarity))))
  if (eligible.length < settings.packSize) throw new Error('Not enough cards for this inspection')
  const cards = shuffle(eligible, random).slice(0, settings.packSize)
  const questions = Array.from({ length: settings.requiredAnswers + (settings.lives || 2) - 1 }, () => {
    const targetIndex = Math.floor(random() * cards.length)
    const card = cards[targetIndex]
    const candidates = (settings.questionTypes?.length ? settings.questionTypes : types).filter((type) => getInspectionAnswer(card, type))
    const type = candidates[Math.floor(random() * candidates.length)] || 'name'
    const correct = getInspectionAnswer(card, type)
    const wrong = shuffle([...new Set(eligible.map((entry) => getInspectionAnswer(entry, type)))].filter((value) => value && value !== correct), random).slice(0, 3)
    return { type, targetIndex, prompt: `${prompts[type]} ${targetIndex + 1}?`, options: shuffle([correct, ...wrong], random) }
  })
  const studyUntil = now + (settings.studySeconds || 30) * 1000
  return { kind: 'tcg-inspection', cards, questions, index: 0, score: 0, lives: settings.lives || 2, revision: 0,
    studyUntil, deadline: studyUntil + settings.timeLimit * 1000, availableAt: 0 }
}

export function applyInspectionAnswer(settings: TcgInspectionGameSettings, current: InspectionRound, answer: unknown, now: number) {
  if (typeof answer !== 'string' || answer.length > 256) throw new Error('Invalid inspection answer')
  if (now > current.deadline) throw new Error('Time is up')
  if (now < current.availableAt) throw new Error('The previous answer is still resolving')
  if (current.lives <= 0 || current.score >= settings.requiredAnswers) throw new Error('This inspection is complete')
  const question = current.questions[current.index]
  if (!question?.options.includes(answer)) throw new Error('Choose one of the displayed answers')
  const correct = answer === getInspectionAnswer(current.cards[question.targetIndex], question.type)
  const round = structuredClone(current)
  round.score += correct ? 1 : 0
  round.lives -= correct ? 0 : 1
  round.index++
  round.revision++
  round.availableAt = now + 1350
  return { round, correct, gameOver: round.lives <= 0 || round.score >= settings.requiredAnswers }
}
