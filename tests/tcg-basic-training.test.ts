import { describe, expect, test } from 'bun:test'
import { artisanRecipes } from '@/data/artisan'
import { allGames } from '@/data/games'
import { items } from '@/data/items'
import { tasks } from '@/data/tasks'
import { tcgRarityPokedollarValues } from '@/data/tcg-rarity'
import { tcgSetSummaries } from '@/data/tcg/summaries'
import {
  TCG_BOOSTER_BOX_PACK_COUNT,
  TCG_BOOSTER_BOX_REWARD,
} from '@/data/tasks/entries/tcg-booster-box-deliveries'
import {
  resolveCraftRewards,
  shouldConsumeCraftCosts,
} from '@/utilities/artisan/rewards'
import { getTcgCardById } from '@/utilities/tcg/tcg'
import { validateTcgBattleDeck } from '@/utilities/tcg/tcg-battle'

function taskDialogue(task: (typeof tasks)[number] | undefined) {
  return [
    ...(task?.enterModal?.map((step) => step.message) || []),
    task?.exitModal?.message || '',
  ].join(' ')
}

describe('TCG Basic Training content', () => {
  test('keeps the complete TCG Underground storyline dialogue free of em dashes', () => {
    const storylinePrefixes = [
      'digletts-cave-',
      'kanto-underground-',
      'underground-tcg-',
      'pewter-school-tcg-',
    ]
    const storylineTasks = tasks.filter((task) =>
      storylinePrefixes.some((prefix) => task.id.startsWith(prefix)),
    )

    expect(storylineTasks.length).toBeGreaterThan(0)
    for (const task of storylineTasks) {
      expect(taskDialogue(task), task.id).not.toContain('—')
    }
  })

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
    const battleWrapup = tasks.find(
      (task) => task.id === 'underground-tcg-battle-wrapup',
    )
    const practiceBriefing = tasks.find(
      (task) => task.id === 'underground-tcg-practice-briefing',
    )
    const calOutreach = tasks.find(
      (task) => task.id === 'underground-tcg-cal-outreach',
    )
    const marinaOutreach = tasks.find(
      (task) => task.id === 'underground-tcg-marina-outreach',
    )
    const fernOutreach = tasks.find(
      (task) => task.id === 'underground-tcg-fern-outreach',
    )
    const base4Complete = tasks.find(
      (task) => task.id === 'underground-tcg-base4-complete',
    )
    const boosterBoxManufacturing = tasks.find(
      (task) => task.id === 'underground-tcg-booster-box-manufacturing',
    )

    expect(basicTraining?.enterModal).toHaveLength(5)
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
    ).toEqual(['Keep the pit supplied', 'Dig Even Deeper', 'Profit?'])
    expect(
      basicTraining?.enterModal?.[1]?.buttons.map((button) => button.text),
    ).toEqual(['You make them here', 'The Pit', 'Wild booster packs'])
    expect(taskDialogue(basicTraining)).toContain('Make cards. Spread cards.')
    expect(taskDialogue(basicTraining)).toContain('Feed pit')
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
    expect(ownSet?.criteria).toEqual([])
    expect(ownSet?.requirements).toEqual([
      { type: 'task_completed', targetId: 'underground-tcg-wrapup' },
    ])
    expect(base4Complete?.criteria).toEqual([
      {
        type: 'card_collected_set',
        targetId: 'base4',
        count: 130,
        unique: true,
      },
    ])
    expect(base4Complete?.rewards).toContainEqual({
      type: 'currency',
      targetId: 'pokedollars',
      quantity: 20000,
    })
    expect(boosterBoxManufacturing).toMatchObject({
      name: 'Profit Time!',
      repeatable: false,
      chat: true,
      requirements: [
        { type: 'task_completed', targetId: 'underground-tcg-my-very-own-set' },
      ],
      criteria: [],
      rewards: [],
    })
    expect(taskDialogue(boosterBoxManufacturing)).toContain(
      'thirty-six matching Booster Packs',
    )
    expect(taskDialogue(boosterBoxManufacturing)).toContain('8,000 Pokédollars')
    expect(taskDialogue(boosterBoxManufacturing)).not.toContain('Artisan')
    expect(taskDialogue(boosterBoxManufacturing)).not.toContain('Explore')
    expect(battleWrapup?.completeButtonText).toBe('Design My First Card')
    expect(battleWrapup?.name).toBe('Back to Work')
    expect(battleWrapup?.requirements).toEqual([
      {
        type: 'game_result',
        targetId: 'underground-tcg-battle-fire',
        battleStatus: 'win',
        count: 1,
      },
      {
        type: 'game_result',
        targetId: 'underground-tcg-battle-water',
        battleStatus: 'win',
        count: 1,
      },
      {
        type: 'game_result',
        targetId: 'underground-tcg-battle-grass',
        battleStatus: 'win',
        count: 1,
      },
    ])
    expect(taskDialogue(battleWrapup)).toContain('LESS PLAYING. MORE CRYSTALS.')
    expect(taskDialogue(battleWrapup)).toContain(
      'playing the same colleagues forever produces no crystals',
    )

    expect(practiceBriefing?.requirements).toEqual([
      { type: 'task_completed', targetId: 'pewter-school-tcg-pop-quiz' },
      {
        type: 'task_completed',
        targetId: 'underground-tcg-battle-wrapup',
        inverse: true,
      },
    ])
    expect(taskDialogue(practiceBriefing)).toContain(
      'Cal, Marina, and Fern are our field outreach team',
    )
    expect(calOutreach?.requirements).toContainEqual({
      type: 'game_result',
      targetId: 'underground-tcg-battle-tutorial',
      battleStatus: 'win',
      count: 1,
    })
    expect(marinaOutreach?.requirements).toContainEqual({
      type: 'game_result',
      targetId: 'underground-tcg-battle-fire',
      battleStatus: 'win',
      count: 1,
    })
    expect(fernOutreach?.requirements).toContainEqual({
      type: 'game_result',
      targetId: 'underground-tcg-battle-water',
      battleStatus: 'win',
      count: 1,
    })
    for (const leadIn of [calOutreach, marinaOutreach, fernOutreach]) {
      expect(leadIn?.requirements).toContainEqual({
        type: 'task_completed',
        targetId: 'underground-tcg-battle-wrapup',
        inverse: true,
      })
    }
  })

  test('generates a gated repeatable booster-box delivery for every TCG set', () => {
    const deliveryTasks = tasks.filter((task) =>
      task.id.startsWith('tcg-booster-box-delivery-'),
    )

    expect(deliveryTasks).toHaveLength(tcgSetSummaries.length)

    for (const set of tcgSetSummaries) {
      const task = deliveryTasks.find(
        (entry) => entry.id === `tcg-booster-box-delivery-${set.id}`,
      )

      expect(task, set.id).toMatchObject({
        name: `${set.name} Booster Box Delivery`,
        repeatable: true,
        completeButtonText: 'Deliver Booster Box',
        rewards: [
          {
            type: 'currency',
            targetId: 'pokedollars',
            quantity: TCG_BOOSTER_BOX_REWARD,
          },
        ],
      })
      expect(task?.requirements).toContainEqual({
        type: 'task_completed',
        targetId: 'underground-tcg-my-very-own-set',
      })
      expect(task?.requirements).toContainEqual({
        type: 'item_owned',
        targetId: `binder-${set.id}`,
      })
      expect(task?.requirements).toContainEqual({
        type: 'card_collected_set',
        targetId: set.id,
        count: set.total,
        unique: true,
      })
      expect(task?.requirements).toContainEqual({
        type: 'item_owned',
        targetId: `pack-${set.id}`,
        count: TCG_BOOSTER_BOX_PACK_COUNT,
      })
      expect(task?.criteria).toEqual([
        {
          type: 'item_owned',
          targetId: `pack-${set.id}`,
          count: TCG_BOOSTER_BOX_PACK_COUNT,
          consume: true,
        },
      ])
    }
  })

  test('authors the inspection, battle, and art tutorial games with one-time gates', async () => {
    const inspection = allGames.find(
      (game) => game.id === 'underground-tcg-card-memory-game',
    )
    const fire = allGames.find(
      (game) => game.id === 'underground-tcg-battle-fire',
    )
    const tutorial = allGames.find(
      (game) => game.id === 'underground-tcg-battle-tutorial',
    )
    const water = allGames.find(
      (game) => game.id === 'underground-tcg-battle-water',
    )
    const grass = allGames.find(
      (game) => game.id === 'underground-tcg-battle-grass',
    )
    const pvp = allGames.find((game) => game.id === 'underground-tcg-pvp')
    const artAcademy = allGames.find(
      (game) => game.id === 'underground-tcg-art-academy',
    )

    expect(inspection?.settings.studySeconds).toBe(30)
    expect(inspection?.settings.lives).toBe(2)
    expect(inspection?.name).toBe('Card Quality Control')
    expect(inspection?.description).toBe(
      'Study each sample pack, then identify its cards so Mina can approve them for distribution.',
    )
    expect(inspection?.settings.requiredAnswers).toBe(3)
    expect(artAcademy?.settings.successThreshold).toBe(30)
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
    expect(tutorial?.name).toBe('Lost-and-Found Practice')
    expect(tutorial?.settings.opponentDeckCardIds).toHaveLength(15)
    expect(new Set(tutorial?.settings.opponentDeckCardIds).size).toBe(15)
    expect(tutorial?.settings.deckFormat).toBe('baby')
    expect(tutorial?.settings.requiredSeries).toBe('Base')
    expect(
      (tutorial!.settings as { opponentEnergyType?: string })
        .opponentEnergyType,
    ).toBe('Colorless')
    expect(tutorial?.icon).toEqual({ type: 'pokemon', id: '19' })
    expect(tutorial?.rewards).toContainEqual({
      type: 'currency',
      targetId: 'pokedollars',
      quantity: 250,
    })
    expect(tutorial?.requirements).toEqual([
      {
        type: 'task_completed',
        targetId: 'underground-tcg-practice-briefing',
      },
      {
        type: 'game_result',
        targetId: 'underground-tcg-battle-tutorial',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
    ])
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
    expect(pvp).toMatchObject({
      gameType: 'tcg-battle',
      name: 'Underground TCG PVP',
      description:
        'Challenge another collector in a fast-paced Base Champions TCG battle.',
      category: 'Underground',
      subCategory: 'Kanto Underground',
      icon: { type: 'trainer', id: 'tcg-maniac-m' },
      rewards: [],
      settings: {
        battleMode: 'pvp',
        deckFormat: 'champions',
        requiredSeries: 'Base',
        matchmakingModes: ['friendly', 'quick'],
      },
    })
    expect(pvp?.requirements).toEqual([
      { type: 'item_owned', targetId: 'deck-box' },
      {
        type: 'task_completed',
        targetId: 'underground-tcg-battle-wrapup',
      },
      { type: 'kid_mode', inverse: true },
    ])
    expect(pvp?.criteria || []).toEqual([])
    expect(fire?.rewards).toContainEqual({
      type: 'currency',
      targetId: 'pokedollars',
      quantity: 1000,
    })
    expect(fire?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'underground-tcg-cal-outreach',
    })
    expect(water?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'underground-tcg-marina-outreach',
    })
    expect(grass?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'underground-tcg-fern-outreach',
    })
    expect(artAcademy?.criteria).toContainEqual({
      type: 'item_owned',
      targetId: 'dried-yellow',
      count: 5,
      consume: true,
    })
    expect(artAcademy?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'underground-tcg-battle-wrapup',
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
    expect(taskDialogue(deckLesson)).toContain('Auto Fill')
    expect(taskDialogue(deckLesson)).toContain('CardDex')
    expect(taskDialogue(deckLesson)).toContain('Base Rules')
    expect(taskDialogue(deckLesson)).toContain('30, 55, and 85')
    expect(taskDialogue(energyLesson)).toContain(
      'Stage 1 cards unlock on turn 3',
    )
    expect(taskDialogue(energyLesson)).toContain(
      'From turn 10, any attack cost is allowed',
    )

    for (const game of [tutorial, fire, water, grass]) {
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
      if (game?.id === 'underground-tcg-battle-tutorial') {
        expect(validation.totalCost).toBe(15)
      }
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
    const packRecipes = [
      { setId: 'base1', dyeId: 'dried-purple' },
      { setId: 'base2', dyeId: 'dried-green' },
      { setId: 'base3', dyeId: 'dried-yellow' },
      { setId: 'base4', dyeId: 'dried-red' },
      { setId: 'base5', dyeId: 'dried-black' },
      { setId: 'gym1', dyeId: 'dried-blue' },
    ].map(({ setId, dyeId }) => ({
      setId,
      dyeId,
      recipe: artisanRecipes.find(
        (entry) => entry.id === `craft-tcg-${setId}-pack`,
      ),
    }))

    expect(items.find((item) => item.id === 'empty-foil-pack')).toMatchObject({
      spriteId: 'tcg/empty-foil-pack',
    })
    expect(foil).toMatchObject({
      category: 'tcg',
      description: 'Add Scrap Metal to the machine to press fresh foil packs.',
      artisanLevel: 15,
      craftType: 'scatter',
      outputQuantity: { min: 0, max: 5 },
      qualityOutputQuantity: { good: 3, perfect: 5 },
    })
    for (const { setId, dyeId, recipe } of packRecipes) {
      expect(recipe).toMatchObject({
        category: 'tcg',
        artisanLevel: 22,
        description:
          'Calibrate the printers to manufacture your own Booster Packs.',
        craftType: 'balance',
        costs: [
          { id: 'empty-foil-pack', amount: 1 },
          { id: dyeId, amount: 1 },
        ],
        rewards: [{ type: 'item', targetId: `pack-${setId}`, quantity: 1 }],
        outputQuantity: { min: 0, max: 2 },
        qualityOutputQuantity: { good: 1, perfect: 2 },
        materialFailQualities: ['bad'],
      })
    }
    const base4 = packRecipes.find(({ setId }) => setId === 'base4')?.recipe
    const base5 = packRecipes.find(({ setId }) => setId === 'base5')?.recipe
    expect(base5?.requirements).toContainEqual({
      type: 'item_owned',
      targetId: 'binder-base5',
    })
    const gym1 = packRecipes.find(({ setId }) => setId === 'gym1')?.recipe
    expect(gym1?.requirements).toContainEqual({
      type: 'card_collected_set',
      targetId: 'gym1',
      count: 132,
      unique: true,
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
