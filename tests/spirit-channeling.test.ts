import { describe, expect, test } from 'bun:test'
import { items } from '@/data/items'
import { FUJI_GLASSES_ITEM_ID } from '@/data/items/special-item-ids'
import {
  BOOK_OF_CHANNELING_ITEM_ID,
  doesSpiritChannelingEnergyMatch,
  getSpiritChannelingConfigForMemento,
  getSpiritChannelingEnergyClue,
  getSpiritChannelingOfferedEnergy,
  getSpiritChannelingOffering,
  hasDuplicateSpiritChannelingOfferings,
  SPIRIT_CHANNELING_CONFIGS,
  SPIRIT_CHANNELING_INCENSE_ITEMS,
  SPIRIT_CHANNELING_OFFERING_ITEMS,
} from '@/data/spirit-channeling'
import {
  canPokemonSpiritChannel,
  getSpiritChannelerIneligibilityReason,
  getSpiritChannelerRequirementLabel,
} from '@/utilities/spirit-channeling/eligibility'

describe('spirit channeling data', () => {
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

  test('offering energy aggregates material and gem quantities', () => {
    expect(
      getSpiritChannelingOfferedEnergy([
        { itemId: 'small-stone-t1', quantity: 94 },
        { itemId: 'rock-gem', quantity: 1 },
      ]),
    ).toEqual({ rock: 97 })
  })

  test('does not allow one offering item in multiple slots', () => {
    expect(
      hasDuplicateSpiritChannelingOfferings([
        { itemId: 'small-stone-t1', quantity: 1 },
        { itemId: 'small-stone-t1', quantity: 1 },
      ]),
    ).toBe(true)
    expect(
      hasDuplicateSpiritChannelingOfferings([
        { itemId: 'small-stone-t1', quantity: 2 },
        { itemId: 'rock-gem', quantity: 1 },
      ]),
    ).toBe(false)
  })

  test('channelers may be any Pokemon unless a ritual specifies type or form', () => {
    expect(
      canPokemonSpiritChannel(
        { formId: '25', level: 5 },
        { channelerMinLevel: 5 },
      ),
    ).toBe(true)
    expect(
      getSpiritChannelerIneligibilityReason(
        { formId: '25', level: 4 },
        { channelerMinLevel: 5 },
      ),
    ).toBe('This channeling requires a level 5+ Pokemon.')
    expect(
      getSpiritChannelerIneligibilityReason(
        { formId: '25', level: 20 },
        { channelerMinLevel: 5, channelerType: 'water' },
      ),
    ).toBe('This channeling requires a Water-type Pokemon.')
    expect(
      canPokemonSpiritChannel(
        { formId: '25', level: 20 },
        { channelerMinLevel: 5, channelerFormId: '25' },
      ),
    ).toBe(true)
    expect(
      getSpiritChannelerRequirementLabel({
        channelerMinLevel: 10,
        channelerType: 'water',
      }),
    ).toBe('Water-type Pokemon, level 10+')
  })
})
