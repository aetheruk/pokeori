import { describe, expect, test } from 'bun:test'
import { items } from '@/data/items'
import {
  BOOK_OF_CHANNELING_ITEM_ID,
  DEV_CHANNELING_MEMENTO_ITEM_ID,
  doesSpiritChannelingEnergyMatch,
  getSpiritChannelingActivityId,
  getSpiritChannelingConfigForMemento,
  getSpiritChannelingEnergyClue,
  getSpiritChannelingOffering,
  SPIRIT_CHANNELING_CONFIGS,
  SPIRIT_CHANNELING_INCENSE_ITEMS,
  SPIRIT_CHANNELING_OFFERING_ITEMS,
} from '@/data/spirit-channeling'
import { FUJI_GLASSES_ITEM_ID } from '@/data/items/special-item-ids'

describe('spirit channeling data', () => {
  test('starter dev memento config is authored as a one-time channeling', () => {
    const config = getSpiritChannelingConfigForMemento(
      DEV_CHANNELING_MEMENTO_ITEM_ID,
    )

    expect(config).toMatchObject({
      id: 'dev-channeling-memento',
      mementoItemId: DEV_CHANNELING_MEMENTO_ITEM_ID,
      correctIncenseItemId: 'incense-dev',
      requiredEnergy: { water: 3 },
      channelerMinLevel: 10,
    })
    expect(config && getSpiritChannelingActivityId(config)).toBe(
      `spirit-channeling:${DEV_CHANNELING_MEMENTO_ITEM_ID}`,
    )
    expect(config?.rewards).toContainEqual(
      expect.objectContaining({
        type: 'pokemon',
        targetId: 92,
      }),
    )
  })

  test("Fuji's Glasses unlock the Pokemon Tower Chronicle marker", () => {
    const config = getSpiritChannelingConfigForMemento(FUJI_GLASSES_ITEM_ID)

    expect(config).toMatchObject({
      id: 'fuji-glasses-memory',
      mementoItemId: FUJI_GLASSES_ITEM_ID,
      correctIncenseItemId: 'incense-memory',
      requiredEnergy: { ground: 5 },
      channelerMinLevel: 5,
    })
    expect(config?.rewards).toContainEqual(
      expect.objectContaining({
        type: 'task_complete',
        targetId: 'fuji-glasses-memory-revealed',
      }),
    )
  })

  test('channeling references real item definitions', () => {
    const itemIds = new Set(items.map((item) => item.id))

    expect(itemIds.has(BOOK_OF_CHANNELING_ITEM_ID)).toBe(true)
    for (const incense of SPIRIT_CHANNELING_INCENSE_ITEMS) {
      expect(itemIds.has(incense.id)).toBe(true)
    }

    for (const config of SPIRIT_CHANNELING_CONFIGS) {
      expect(itemIds.has(config.mementoItemId)).toBe(true)
      expect(itemIds.has(config.correctIncenseItemId)).toBe(true)
      for (const reward of config.rewards) {
        if (reward.type === 'item')
          expect(itemIds.has(String(reward.targetId))).toBe(true)
      }
    }
  })

  test('offering pool uses T1 materials and base gems only', () => {
    expect(getSpiritChannelingOffering('spirit-wisp-t1')).toMatchObject({
      type: 'ghost',
      energy: 1,
      kind: 'material',
    })
    expect(getSpiritChannelingOffering('ghost-gem')).toMatchObject({
      type: 'ghost',
      energy: 3,
      kind: 'gem',
    })
    expect(getSpiritChannelingOffering('spirit-wisp-t2')).toBeUndefined()
    expect(getSpiritChannelingOffering('shining-ghost-gem')).toBeUndefined()
    expect(SPIRIT_CHANNELING_OFFERING_ITEMS).toHaveLength(36)
  })

  test('energy matching requires exact configured elemental energy', () => {
    expect(doesSpiritChannelingEnergyMatch({ ghost: 3 }, { ghost: 3 })).toBe(
      true,
    )
    expect(getSpiritChannelingEnergyClue({ ghost: 3 }, { water: 3 })).toBe(
      'The spirits are not interested in Water offerings.',
    )
    expect(getSpiritChannelingEnergyClue({ ghost: 3 }, { ghost: 2 })).toBe(
      'The spirits require more Ghost offerings.',
    )
    expect(getSpiritChannelingEnergyClue({ ghost: 3 }, { ghost: 4 })).toBe(
      'The spirits are overwhelmed by Ghost offerings.',
    )
  })
})
