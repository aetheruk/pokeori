import { describe, expect, test } from 'bun:test'
import { regionCategories } from '@/data/region-map'
import { subCategories } from '@/data/sub-region-map'
import { tasks } from '@/data/tasks'
import { battles } from '@/data/battles'
import { expeditions } from '@/data/expeditions'
import { buildNameForms } from '@/components/game/features/explore/BlackoutUnowns'
import {
  A_GOLDEN_GLOW_TASK_ID,
  isSaffronTakeoverActive,
  SAFFRON_ESCAPE_COMPLETE_TASK_ID,
  SAFFRON_GYM_AMBUSH_TASK_ID,
  STRUGGLE_TASK_ID,
} from '@/utilities/story-state'

describe('Saffron takeover story state', () => {
  test('is inactive before the gym ambush is completed', () => {
    expect(isSaffronTakeoverActive([])).toBe(false)
  })

  test('becomes active after the ambush until the escape completes', () => {
    expect(isSaffronTakeoverActive([{ taskId: SAFFRON_GYM_AMBUSH_TASK_ID }])).toBe(
      true,
    )
  })

  test('is inactive again once the escape completion marker exists', () => {
    expect(
      isSaffronTakeoverActive([
        { taskId: SAFFRON_GYM_AMBUSH_TASK_ID },
        { taskId: SAFFRON_ESCAPE_COMPLETE_TASK_ID },
      ]),
    ).toBe(false)
  })
})

describe('Saffron knockout task data', () => {
  test('the gym ambush task is authored as a one-time Saffron cinematic', () => {
    const task = tasks.find((entry) => entry.id === SAFFRON_GYM_AMBUSH_TASK_ID)
    expect(task).toBeDefined()
    expect(task?.repeatable).toBe(false)
    expect(task?.secret).toBe(false)
    expect(task?.category).toBe('Kanto')
    expect(task?.subCategory).toBe('Saffron City')
    expect(task?.enterModal).toHaveLength(1)
    expect(task?.enterModal?.[0]?.message).toContain('Choo will be right behind me')
    expect(task?.exitModal?.message).toContain('Hello is anyo')
  })
})

describe('Saffron blackout region', () => {
  test('the ??? region is always available with saffron artwork', () => {
    expect(subCategories['???']).toBeDefined()
    expect(subCategories['???']?.region).toBe('???')
    expect(subCategories['???']?.alwaysAvailable).toBe(true)
    expect(subCategories['???']?.image).toBe('/backgrounds/saffron.avif')
    expect(regionCategories['???']?.image).toBe('/backgrounds/saffron.avif')
  })
})

describe('blackout Unown name spelling', () => {
  test('spells the trainer name and ends with a question-mark Unown', () => {
    expect(buildNameForms('Ash')).toEqual([
      '201-a',
      '201-s',
      '201-h',
      '201-question',
    ])
  })

  test('strips non-letters and caps long names', () => {
    const forms = buildNameForms('Pika-2 !! Fan')
    expect(forms).toEqual([
      '201-p',
      '201-i',
      '201-k',
      '201-a',
      '201-f',
      '201-a',
      '201-n',
      '201-question',
    ])
    const long = buildNameForms('A'.repeat(30))
    expect(long.length).toBe(13)
  })

  test('falls back to just a question-mark Unown for an empty name', () => {
    expect(buildNameForms('')).toEqual(['201-question'])
    expect(buildNameForms(undefined)).toEqual(['201-question'])
  })
})

describe('blackout golden glow tasks', () => {
  test('struggle is a hidden one-time task gated on the ambush', () => {
    const task = tasks.find((entry) => entry.id === STRUGGLE_TASK_ID)
    expect(task).toBeDefined()
    expect(task?.secret).toBe(true)
    expect(task?.repeatable).toBe(false)
    expect(task?.requirements).toContainEqual(
      expect.objectContaining({
        type: 'task_completed',
        targetId: SAFFRON_GYM_AMBUSH_TASK_ID,
      }),
    )
  })

  test('golden glow is a one-time task unlocked by struggle with authored cosmos dialogue', () => {
    const task = tasks.find((entry) => entry.id === A_GOLDEN_GLOW_TASK_ID)
    expect(task).toBeDefined()
    expect(task?.secret).toBe(false)
    expect(task?.repeatable).toBe(false)
    expect(task?.background).toBe('/backgrounds/cosmos-gold.avif')
    expect(task?.requirements).toContainEqual(
      expect.objectContaining({
        type: 'task_completed',
        targetId: STRUGGLE_TASK_ID,
      }),
    )
    expect(task?.requirements).toContainEqual(
      expect.objectContaining({
        type: 'task_completed',
        targetId: SAFFRON_GYM_AMBUSH_TASK_ID,
      }),
    )
    expect(task?.enterModal).toHaveLength(6)
    expect(task?.enterModal?.[0]?.message).toBe(
      'Well now, Quite the spirit in you {Trainer}',
    )
    expect(task?.enterModal?.[5]?.buttons?.[0]?.text).toBe('No')
    expect(task?.exitModal?.message).toBe(
      'Impressive I felt that. Please allow me to show you.',
    )
  })
})

describe('blackout void chronicles and time divergence', () => {
  test('both blackout chronicles are authored and Ray Choo chronicle is gated behind the Rocket chronicle', () => {
    const rocketExp = expeditions.find(
      (entry) => entry.id === 'chronicle-rocket-assassination',
    )
    const chooExp = expeditions.find(
      (entry) => entry.id === 'chronicle-ray-choo-pursuit',
    )

    expect(rocketExp).toBeDefined()
    expect(rocketExp?.requirements).toContainEqual(
      expect.objectContaining({
        type: 'task_completed',
        targetId: 'golden-glow',
      }),
    )

    expect(chooExp).toBeDefined()
    expect(chooExp?.requirements).toContainEqual(
      expect.objectContaining({
        type: 'task_completed',
        targetId: 'golden-glow',
      }),
    )
    expect(chooExp?.requirements).toContainEqual(
      expect.objectContaining({
        type: 'expedition_result',
        targetId: 'chronicle-rocket-assassination',
        expeditionStatus: 'completed',
      }),
    )
  })

  test('entity reflections and celebi warp tasks lead into the celadon timeline divergence', () => {
    const reflections = tasks.find((entry) => entry.id === 'entity-reflections')
    const celebiWarp = tasks.find((entry) => entry.id === 'entity-celebi-warp')
    const divergence = tasks.find(
      (entry) => entry.id === 'celadon-timeline-divergence',
    )

    expect(reflections).toBeDefined()
    expect(reflections?.requirements).toContainEqual(
      expect.objectContaining({
        type: 'expedition_result',
        targetId: 'chronicle-rocket-assassination',
      }),
    )
    expect(reflections?.requirements).toContainEqual(
      expect.objectContaining({
        type: 'expedition_result',
        targetId: 'chronicle-ray-choo-pursuit',
      }),
    )

    expect(celebiWarp).toBeDefined()
    expect(celebiWarp?.requirements).toContainEqual(
      expect.objectContaining({
        type: 'task_completed',
        targetId: 'entity-reflections',
      }),
    )

    expect(divergence).toBeDefined()
    expect(divergence?.requirements).toContainEqual(
      expect.objectContaining({
        type: 'task_completed',
        targetId: 'entity-celebi-warp',
      }),
    )
  })

  test('celadon poison dead drop unlocks after the timeline divergence and awards the sealed toxin', () => {
    const deadDrop = tasks.find(
      (entry) => entry.id === 'celadon-poison-dead-drop',
    )
    expect(deadDrop).toBeDefined()
    expect(deadDrop?.requirements).toContainEqual(
      expect.objectContaining({
        type: 'task_completed',
        targetId: 'celadon-timeline-divergence',
      }),
    )
    expect(deadDrop?.rewards).toContainEqual(
      expect.objectContaining({
        type: 'item',
        targetId: 'rocket-poison-vial',
      }),
    )
  })

  test('pokemon tower ascent sequence unlocks after timeline divergence and awards the Azure Flute', () => {
    const towerReturn = tasks.find(
      (entry) => entry.id === 'pokemon-tower-return-with-choo',
    )
    const towerClearing = tasks.find(
      (entry) => entry.id === 'pokemon-tower-clearing-the-floors',
    )
    const calmingKita = tasks.find(
      (entry) => entry.id === 'pokemon-tower-calming-kita',
    )
    const kitaBoss = battles.find(
      (entry) => entry.id === 'pokemon-tower-kita-boss',
    )
    const towerSummit = tasks.find(
      (entry) => entry.id === 'pokemon-tower-summit-azure-flute',
    )

    expect(towerReturn).toBeDefined()
    expect(towerReturn?.requirements).toContainEqual(
      expect.objectContaining({
        type: 'task_completed',
        targetId: 'celadon-timeline-divergence',
      }),
    )

    expect(towerClearing).toBeDefined()
    expect(towerClearing?.requirements).toContainEqual(
      expect.objectContaining({
        type: 'task_completed',
        targetId: 'pokemon-tower-return-with-choo',
      }),
    )
    expect(towerClearing?.requirements).toContainEqual(
      expect.objectContaining({
        type: 'battle_result',
        targetId: 'pokemon-tower-shadow-surge-3',
        battleStatus: 'win',
      }),
    )

    expect(calmingKita).toBeDefined()
    expect(calmingKita?.requirements).toContainEqual(
      expect.objectContaining({
        type: 'task_completed',
        targetId: 'pokemon-tower-clearing-the-floors',
      }),
    )

    expect(kitaBoss).toBeDefined()
    expect(kitaBoss?.maxPokemon).toBe(2)
    expect(kitaBoss?.levelCap).toBe(40)
    expect(kitaBoss?.enemyTeam).toEqual([
      expect.objectContaining({
        speciesId: 105,
        formId: '10115',
        level: 40,
      }),
    ])

    expect(towerSummit).toBeDefined()
    expect(towerSummit?.requirements).toContainEqual(
      expect.objectContaining({
        type: 'battle_result',
        targetId: 'pokemon-tower-kita-boss',
        battleStatus: 'win',
      }),
    )
    expect(towerSummit?.rewards).toContainEqual(
      expect.objectContaining({
        type: 'item',
        targetId: 'azure-flute',
      }),
    )
  })

  test('pokemon tower dungeon features FireRed trainers, catches, field observation and research XP tasks', () => {
    // Check research XP tasks
    const gastlyStudy = tasks.find(
      (entry) => entry.id === 'pokemon-tower-gastly-spiritual-study',
    )
    const haunterStudy = tasks.find(
      (entry) => entry.id === 'pokemon-tower-haunter-shadow-study',
    )
    const cuboneStudy = tasks.find(
      (entry) => entry.id === 'pokemon-tower-cubone-memorial-study',
    )
    const marowakStudy = tasks.find(
      (entry) => entry.id === 'pokemon-tower-purification-circle-study',
    )

    expect(gastlyStudy).toBeDefined()
    expect(gastlyStudy?.rewards).toContainEqual(
      expect.objectContaining({
        type: 'pokemon_research_xp',
        targetId: '92',
      }),
    )

    expect(haunterStudy).toBeDefined()
    expect(haunterStudy?.rewards).toContainEqual(
      expect.objectContaining({
        type: 'pokemon_research_xp',
        targetId: '93',
      }),
    )

    expect(cuboneStudy).toBeDefined()
    expect(cuboneStudy?.rewards).toContainEqual(
      expect.objectContaining({
        type: 'pokemon_research_xp',
        targetId: '104',
      }),
    )

    expect(marowakStudy).toBeDefined()
    expect(marowakStudy?.rewards).toContainEqual(
      expect.objectContaining({
        type: 'pokemon_research_xp',
        targetId: '105',
      }),
    )
  })

  test('post-divergence repeatable guidance tasks are authored for Saffron avoidance and Celadon cycling road caution', () => {
    const saffronAvoidance = tasks.find(
      (entry) => entry.id === 'saffron-avoidance-reflection',
    )
    const route16Snorlax = tasks.find(
      (entry) => entry.id === 'route-16-sleeping-snorlax',
    )
    const celadonCaution = tasks.find(
      (entry) => entry.id === 'celadon-cycling-road-caution',
    )

    expect(saffronAvoidance).toBeDefined()
    expect(saffronAvoidance?.repeatable).toBe(true)
    expect(saffronAvoidance?.subCategory).toBe('Saffron City')
    expect(saffronAvoidance?.requirements).toContainEqual(
      expect.objectContaining({
        type: 'task_completed',
        targetId: 'celadon-timeline-divergence',
      }),
    )

    expect(route16Snorlax).toBeDefined()
    expect(route16Snorlax?.subCategory).toBe('Celadon City')
    expect(route16Snorlax?.criteria).toContainEqual(
      expect.objectContaining({
        type: 'item_owned',
        targetId: 'azure-flute',
      }),
    )

    expect(celadonCaution).toBeDefined()
    expect(celadonCaution?.repeatable).toBe(true)
    expect(celadonCaution?.subCategory).toBe('Celadon City')
    expect(celadonCaution?.requirements).toContainEqual(
      expect.objectContaining({
        type: 'battle_result',
        targetId: 'route-16-furious-snorlax',
        battleStatus: 'win',
      }),
    )
  })
})
