import { describe, expect, test } from 'bun:test'
import { artisanRecipes } from '@/data/artisan'
import { allGames } from '@/data/games'
import { items } from '@/data/items'
import { tasks } from '@/data/tasks'
import { tcgRarityPokedollarValues } from '@/data/tcg-rarity'
import { getTcgCardById } from '@/utilities/tcg/tcg'
import { validateTcgBattleDeck } from '@/utilities/tcg/tcg-battle'
import {
  resolveCraftRewards,
  shouldConsumeCraftCosts,
} from '@/utilities/artisan/rewards'

describe('TCG Basic Training content', () => {
  test('authors the underground task progression and visible set gates', () => {
    const basicTraining = tasks.find(
      (task) => task.id === 'underground-tcg-basic-training',
    )
    const redistribution = tasks.find(
      (task) => task.id === 'underground-tcg-card-redistribution',
    )
    const ownSet = tasks.find(
      (task) => task.id === 'underground-tcg-my-very-own-set',
    )
    const base4Complete = tasks.find(
      (task) => task.id === 'underground-tcg-base4-complete',
    )

    expect(basicTraining?.enterModal).toHaveLength(4)
    expect(
      basicTraining?.enterModal?.[0]?.buttons.some(
        (button) => button.type === 'success',
      ),
    ).toBe(false)
    expect(basicTraining?.description).toBe(
      'This is all quite strange… Nobody seems to be acknowledging the pit. Is that fine?',
    )
    expect(basicTraining?.completeButtonText).toBe('Begin Training')
    expect(
      basicTraining?.enterModal?.[0]?.buttons.map((button) => button.text),
    ).toEqual(['Gather Crystals', 'Dig Even Deeper', 'Profit?'])
    expect(
      basicTraining?.enterModal?.[1]?.buttons.map((button) => button.text),
    ).toEqual(['We make them ofcourse!', 'The Pit'])
    expect(basicTraining?.exitModal?.message).toContain(
      'Gather Crystals Spread the word of the TCG',
    )
    expect(redistribution?.name).toBe('Feeding the Pit')
    expect(redistribution?.completeButtonText).toBe('Throw Crystals')
    expect(redistribution?.criteria).toContainEqual({
      type: 'currency_owned',
      targetId: 'crystals',
      count: 500,
      consume: true,
    })
    expect(redistribution?.rewards).toContainEqual({
      type: 'item',
      targetId: 'card-crystalizer',
      quantity: 1,
      dropChance: 100,
    })
    expect(ownSet?.criteria).toEqual([
      {
        type: 'card_collected_set',
        targetId: 'base1',
        count: 102,
        unique: true,
      },
      {
        type: 'card_collected_set',
        targetId: 'base2',
        count: 64,
        unique: true,
      },
    ])
    expect(base4Complete?.criteria).toEqual([
      {
        type: 'card_collected_set',
        targetId: 'base4',
        count: 130,
        unique: true,
      },
    ])
  })

  test('authors the inspection, battle, and art tutorial games with one-time gates', async () => {
    const inspection = allGames.find(
      (game) => game.id === 'underground-tcg-card-memory-game',
    )
    const fire = allGames.find(
      (game) => game.id === 'underground-tcg-battle-fire',
    )
    const water = allGames.find(
      (game) => game.id === 'underground-tcg-battle-water',
    )
    const grass = allGames.find(
      (game) => game.id === 'underground-tcg-battle-grass',
    )
    const artAcademy = allGames.find(
      (game) => game.id === 'underground-tcg-art-academy',
    )

    expect(inspection?.settings.studySeconds).toBe(30)
    expect(inspection?.settings.lives).toBe(2)
    expect(inspection?.name).toBe('TCG Quiz')
    expect(inspection?.description).toBe(
      'I need to Research the cards correctly to pass my basic training.',
    )
    expect(inspection?.settings.requiredAnswers).toBe(3)
    expect(inspection?.requirements).toContainEqual({
      type: 'game_result',
      targetId: 'underground-tcg-card-memory-game',
      battleStatus: 'win',
      count: 3,
      inverse: true,
    })
    expect(inspection?.rewards).toContainEqual({
      type: 'item',
      targetId: 'pack-base1',
      quantity: 1,
      dropChance: 100,
    })
    expect(fire?.settings.opponentDeckCardIds).toHaveLength(15)
    expect(new Set(fire?.settings.opponentDeckCardIds).size).toBe(15)
    expect(
      (fire!.settings as { opponentEnergyType?: string }).opponentEnergyType,
    ).toBe('Fire')
    expect(
      (water!.settings as { opponentEnergyType?: string }).opponentEnergyType,
    ).toBe('Water')
    expect(
      (grass!.settings as { opponentEnergyType?: string }).opponentEnergyType,
    ).toBe('Grass')
    expect(fire?.icon).toEqual({ type: 'pokemon', id: '6' })
    expect(water?.icon).toEqual({ type: 'pokemon', id: '9' })
    expect(grass?.icon).toEqual({ type: 'pokemon', id: '3' })
    expect(fire?.rewards).toContainEqual({
      type: 'currency',
      targetId: 'pokedollars',
      quantity: 1000,
    })
    expect(artAcademy?.criteria).toContainEqual({
      type: 'item_owned',
      targetId: 'dried-yellow',
      count: 5,
      consume: true,
    })

    const deckLesson = tasks.find(
      (task) => task.id === 'pewter-school-tcg-deck-setup',
    )
    const energyLesson = tasks.find(
      (task) => task.id === 'pewter-school-tcg-energy',
    )
    expect(deckLesson?.description).toBe(
      'Learn how to build, price, and arrange a Pokemon card deck.',
    )
    expect(deckLesson?.exitModal?.message).toContain('Auto Fill')
    expect(deckLesson?.exitModal?.message).toContain('CardDex')
    expect(deckLesson?.exitModal?.message).toContain('Base Rules')
    expect(deckLesson?.exitModal?.message).toContain('30, 55, and 85')
    expect(energyLesson?.exitModal?.message).toContain(
      'Stage 1 cards arrive on turn 3',
    )
    expect(energyLesson?.exitModal?.message).toContain(
      'any amount from turn 10',
    )

    for (const game of [fire, water, grass]) {
      const cardIds = game?.settings.opponentDeckCardIds || []
      for (const cardId of game?.settings.opponentDeckCardIds || []) {
        expect(getTcgCardById(cardId), `${game?.id}:${cardId}`).not.toBeNull()
      }
      const validation = await validateTcgBattleDeck(
        cardIds,
        Object.fromEntries(cardIds.map((cardId) => [cardId, 1])),
        'baby',
      )
      expect(validation.valid, `${game?.id} should be a valid Baby deck`).toBe(
        true,
      )
      expect(validation.totalCost, `${game?.id} deck cost`).toBeLessThanOrEqual(
        30,
      )
    }
  })

  test('uses the modest duplicate redistribution payout table', () => {
    expect(tcgRarityPokedollarValues.Common).toBe(5)
    expect(tcgRarityPokedollarValues.Uncommon).toBe(10)
    expect(tcgRarityPokedollarValues.Rare).toBe(20)
    expect(tcgRarityPokedollarValues['Rare Holo']).toBe(35)
    expect(tcgRarityPokedollarValues['Hyper Rare']).toBe(150)
    expect(tcgRarityPokedollarValues).not.toHaveProperty('Crystals')
    expect(items.find((item) => item.id === 'card-crystalizer')?.name).toBe(
      'Card Redistribution Box',
    )
  })

  test('authors TCG Artisan recipes with exact quality outputs', () => {
    const foil = artisanRecipes.find(
      (recipe) => recipe.id === 'craft-tcg-foil-pack',
    )
    const base4 = artisanRecipes.find(
      (recipe) => recipe.id === 'craft-tcg-base4-pack',
    )

    expect(items.find((item) => item.id === 'empty-foil-pack')).toBeDefined()
    expect(foil).toMatchObject({
      category: 'tcg',
      craftType: 'scatter',
      outputQuantity: { min: 0, max: 5 },
      qualityOutputQuantity: { good: 3, perfect: 5 },
    })
    expect(base4).toMatchObject({
      category: 'tcg',
      craftType: 'balance',
      outputQuantity: { min: 0, max: 2 },
      qualityOutputQuantity: { good: 1, perfect: 2 },
      materialFailQualities: ['bad'],
    })
    expect(shouldConsumeCraftCosts(base4!, 'bad')).toBe(true)
    expect(resolveCraftRewards(base4!, 'bad')).toEqual([])
    expect(resolveCraftRewards(base4!, 'good')[0]).toMatchObject({
      targetId: 'pack-base4',
      quantity: 1,
    })
    expect(resolveCraftRewards(base4!, 'perfect')[0]).toMatchObject({
      targetId: 'pack-base4',
      quantity: 2,
    })

    expect(shouldConsumeCraftCosts(foil!, 'bad')).toBe(false)
  })
})
