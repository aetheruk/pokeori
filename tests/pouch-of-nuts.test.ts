import { describe, expect, test } from 'bun:test'
import { fieldObservationGlobalItemEvents } from '@/data/games/field-observation/global-events'
import { FIELD_OBSERVATION_NUT_POUCH_UNLOCK_LEVEL } from '@/data/games/field-observation/rewards'
import { items, getItemSpriteUrl } from '@/data/items'
import { authoredSkillGuideUnlocks } from '@/data/skills/guide'
import {
  buildFieldObservationNutPouchRewards,
  getFieldObservationDyeNuts,
} from '@/utilities/research/berry-drops'
import { rollFieldObservationItemDrops } from '@/utilities/research/field-observation-global-events'

const userData = (researchingLevel: number) =>
  ({
    inventory: [],
    pokemon: [],
    tcg: [],
    pokedex: [],
    completedTasks: [],
    battleResults: [],
    locationEncounterResults: [],
    gameResults: [],
    fieldResearchResults: [],
    user: { skills: { researching: { level: researchingLevel } } },
  }) as any

describe('Pouch of Nuts', () => {
  test('unlocks at Researching 31 with a 15% Field Observation chance', () => {
    const event = fieldObservationGlobalItemEvents.find(
      (entry) => entry.id === 'global-field-observation-nut-pouch',
    )
    if (!event) throw new Error('Missing global Pouch of Nuts event')

    expect(FIELD_OBSERVATION_NUT_POUCH_UNLOCK_LEVEL).toBe(31)
    expect(event).toMatchObject({
      itemId: 'pouch-of-nuts',
      dropChance: 15,
      requirements: [
        { type: 'skill_level', targetId: 'researching', count: 31 },
      ],
    })
    expect(
      rollFieldObservationItemDrops(
        [event],
        userData(30),
        'Kanto',
        () => 0,
      ),
    ).toEqual([])
    expect(
      rollFieldObservationItemDrops(
        [event],
        userData(31),
        'Kanto',
        () => 0.149,
      ),
    ).toEqual([event])
    expect(
      rollFieldObservationItemDrops(
        [event],
        userData(31),
        'Kanto',
        () => 0.15,
      ),
    ).toEqual([])
  })

  test('uses the materials pouch sprite and opens for 3–5 dye nuts', () => {
    const pouch = items.find((item) => item.id === 'pouch-of-nuts')

    expect(pouch).toMatchObject({
      name: 'Pouch of Nuts',
      spriteId: 'pouch-of-materials',
      effects: { grantRandomDyeNuts: { min: 3, max: 5 } },
    })
    expect(getItemSpriteUrl('pouch-of-nuts')).toBe(
      '/sprites/items/pouch-of-materials.avif',
    )
    expect(
      authoredSkillGuideUnlocks.find(
        (unlock) => unlock.itemId === 'pouch-of-nuts',
      ),
    ).toMatchObject({
      skillId: 'researching',
      level: 31,
      label: 'Pouch of Nuts',
    })
  })

  test('chooses from unlocked dye colours with replacement', () => {
    expect(getFieldObservationDyeNuts(31)).toEqual([
      'nut-red',
      'nut-purple',
      'nut-green',
      'nut-blue',
      'nut-yellow',
    ])
    expect(getFieldObservationDyeNuts(40)).toEqual([
      'nut-red',
      'nut-purple',
      'nut-green',
      'nut-blue',
      'nut-yellow',
      'nut-white',
      'nut-black',
    ])

    const rewards = buildFieldObservationNutPouchRewards(5, 31, () => 0)
    expect(rewards).toHaveLength(5)
    expect(rewards).toEqual(
      Array.from({ length: 5 }, () => ({
        type: 'item',
        targetId: 'nut-red',
        quantity: 1,
        dropChance: 100,
      })),
    )
    expect(rewards.some((reward) => reward.targetId === 'razz-berry')).toBe(
      false,
    )
  })
})
