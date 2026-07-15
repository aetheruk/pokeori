import { describe, expect, test } from 'bun:test'
import pokemonData from '@/data/pokemon-data'
import { EVOLUTIONS } from '@/data/evolutions'
import { items } from '@/data/items'
import { battles } from '@/data/battles'
import { getMove } from '@/data/moves'
import { getHeldItemDefinition } from '@/utilities/pokemon/held-items'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'
import { canEnemyPokemonUseAiMove } from '@/utilities/battle/enemy-ai'
import { evolutionItems } from '@/data/items/entries/evolution'
import { megaStones } from '@/data/items/entries/mega-stones'
import { abilityPatchItems } from '@/data/items/entries/ability-patches'
import { binderItems } from '@/data/items/entries/binders'
import { boosterPackItems } from '@/data/items/entries/booster-packs'
import { MEGA_EVOLUTIONS } from '@/data/powers'
import { tcgSets } from '@/data/tcg'
import { tcgSetSummaries } from '@/data/tcg/summaries'
import {
  ABILITIES,
  ABILITY_FORM_MAP,
  ABILITY_TYPE_MAP,
  ABILITY_GLOBAL_MAP,
  POKEMON_TYPES,
  isNaturalFormAbilityForForm,
  resolveAbilityForms,
  resolveEvolvedAbility,
} from '@/data/abilities'
import { canApplyEncounterAbilityOverride } from '@/utilities/pokemon/encounter-abilities'
import { getAbilityDexPartnerEffectLines } from '@/utilities/pokemon/abilitydex'

const itemIds = new Set(items.map((item) => item.id))
const speciesIds = new Set(pokemonData.map((species) => species.id))
const formIds = new Set(
  pokemonData.flatMap((species) => species.forms.map((form) => form.id)),
)
const kantoBaseFormIds = pokemonData
  .filter((species) => species.id <= 151)
  .flatMap((species) => {
    const baseForm = species.forms.find((form) => form.form === 'base')
    return baseForm ? [baseForm.id] : []
  })
const setIds = new Set(tcgSets.map((set) => set.id))
describe('generated data integrity', () => {
  test('TCG binders and booster packs are generated for every set', () => {
    expect(tcgSets.length).toBeGreaterThan(0)
    expect(tcgSetSummaries.map((set) => set.id)).toEqual(
      tcgSets.map((set) => set.id),
    )

    const binderIds = new Set(binderItems.map((item) => item.id))
    const boosterPackIds = new Set(boosterPackItems.map((item) => item.id))

    for (const set of tcgSetSummaries) {
      expect(binderIds.has(`binder-${set.id}`)).toBe(true)
      expect(boosterPackIds.has(`pack-${set.id}`)).toBe(true)
    }

    for (const pack of boosterPackItems) {
      expect(pack.boosterPack?.setId).toBeDefined()
      expect(setIds.has(pack.boosterPack?.setId || '')).toBe(true)
      expect(pack.boosterPack?.cardsPerPack).toBeGreaterThan(0)
    }
  })

  test('TCG set artwork is not bundled as public runtime assets', () => {
    for (const set of tcgSets) {
      expect(set.images.logo).toBe('')
      expect(set.images.symbol).toBe('')
    }
  })

  test('mega evolutions reference generated forms and item definitions', () => {
    expect(MEGA_EVOLUTIONS.length).toBeGreaterThan(0)

    const megaStoneIds = new Set(megaStones.map((item) => item.id))
    for (const mega of MEGA_EVOLUTIONS) {
      expect(formIds.has(mega.baseFormId)).toBe(true)
      expect(formIds.has(mega.megaFormId)).toBe(true)
      expect(mega.megaStoneId).not.toBe('')
      expect(mega.megaStoneName).not.toBe('')
      expect(megaStoneIds.has(mega.megaStoneId)).toBe(true)
      expect(itemIds.has(mega.megaStoneId)).toBe(true)
    }

    for (const stone of megaStones) {
      expect(stone.category).toBe('battle')
      expect(stone.unique).toBe(true)
      expect(stone.spriteId).not.toBe('')
      expect(itemIds.has(stone.spriteId || stone.id)).toBe(true)
    }
  })

  test('evolution map references existing Pokemon and item definitions', () => {
    for (const [sourceSpeciesId, evolutions] of Object.entries(EVOLUTIONS)) {
      expect(speciesIds.has(Number(sourceSpeciesId))).toBe(true)

      for (const evolution of evolutions) {
        expect(speciesIds.has(evolution.speciesId)).toBe(true)

        if (evolution.conditions.itemId) {
          expect(itemIds.has(evolution.conditions.itemId)).toBe(true)
        }

        if (evolution.conditions.heldItem) {
          expect(itemIds.has(evolution.conditions.heldItem)).toBe(true)
        }

        if (evolution.conditions.requiredSourceForm) {
          const sourceSpecies = pokemonData.find(
            (species) => species.id === Number(sourceSpeciesId),
          )
          expect(
            sourceSpecies?.forms.some(
              (form) => form.form === evolution.conditions.requiredSourceForm,
            ),
          ).toBe(true)
        }

        if (evolution.targetForm) {
          const targetSpecies = pokemonData.find(
            (species) => species.id === evolution.speciesId,
          )
          expect(
            targetSpecies?.forms.some(
              (form) => form.form === evolution.targetForm,
            ),
          ).toBe(true)
        }
      }
    }
  })

  test('evolution item descriptions describe the item rather than target Pokemon', () => {
    const literalEvolutionDescription =
      /\b(evolves?|held by|traded on|holder evolves|party pokemon|party pokémon|evolution item)\b/i
    const literalDescriptions = evolutionItems
      .filter((item) => literalEvolutionDescription.test(item.description))
      .map((item) => `${item.id}: ${item.description}`)

    expect(literalDescriptions).toEqual([])
  })

  test('regional source Pokemon evolutions are form-gated', () => {
    const regionalFormNames = [
      'Alolan Form',
      'Galarian Form',
      'Hisuian Form',
      'Paldean Form',
    ]

    for (const [sourceSpeciesId, evolutions] of Object.entries(EVOLUTIONS)) {
      const sourceSpecies = pokemonData.find(
        (species) => species.id === Number(sourceSpeciesId),
      )
      const hasRegionalForm = sourceSpecies?.forms.some((form) =>
        regionalFormNames.includes(form.form),
      )
      if (!hasRegionalForm) continue

      for (const evolution of evolutions) {
        expect(evolution.conditions.requiredSourceForm).toBeDefined()
      }
    }

    expect(EVOLUTIONS[100]).toContainEqual({
      speciesId: 101,
      name: 'electrode',
      trigger: 'level-up',
      conditions: {
        minLevel: 30,
        requiredSourceForm: 'base',
      },
      targetForm: 'base',
    })
    expect(EVOLUTIONS[100]).toContainEqual({
      speciesId: 101,
      name: 'electrode',
      trigger: 'use-item',
      conditions: {
        itemId: 'leaf-stone',
        requiredSourceForm: 'Hisuian Form',
      },
      targetForm: 'Hisuian Form',
    })
    expect(EVOLUTIONS[79]).toContainEqual({
      speciesId: 80,
      name: 'slowbro',
      trigger: 'use-item',
      conditions: {
        itemId: 'galarica-cuff',
        requiredSourceForm: 'Galarian Form',
      },
      targetForm: 'Galarian Form',
    })
    expect(EVOLUTIONS[263]).toContainEqual({
      speciesId: 264,
      name: 'linoone',
      trigger: 'level-up',
      conditions: {
        minLevel: 20,
        requiredSourceForm: 'Galarian Form',
      },
      targetForm: 'Galarian Form',
    })
    expect(EVOLUTIONS[194]).toContainEqual({
      speciesId: 980,
      name: 'clodsire',
      trigger: 'level-up',
      conditions: {
        minLevel: 20,
        requiredSourceForm: 'Paldean Form',
      },
    })
    expect(EVOLUTIONS[669]).toContainEqual({
      speciesId: 670,
      name: 'floette',
      trigger: 'level-up',
      conditions: {
        minLevel: 19,
        requiredSourceForm: 'Blue Flower',
      },
      targetForm: 'Blue Flower',
    })
    expect(EVOLUTIONS[670]).toContainEqual({
      speciesId: 671,
      name: 'florges',
      trigger: 'use-item',
      conditions: {
        itemId: 'shiny-stone',
        requiredSourceForm: 'White Flower',
      },
      targetForm: 'White Flower',
    })
    expect(
      EVOLUTIONS[670].some(
        (evolution) => !evolution.conditions.requiredSourceForm,
      ),
    ).toBe(false)
    expect(EVOLUTIONS[412]).toContainEqual({
      speciesId: 413,
      name: 'wormadam',
      trigger: 'level-up',
      conditions: {
        minLevel: 20,
        gender: 1,
        requiredSourceForm: 'Sandy Cloak',
      },
      targetForm: 'Sandy Cloak',
    })
    expect(EVOLUTIONS[281]).toContainEqual({
      speciesId: 475,
      name: 'gallade',
      trigger: 'use-item',
      conditions: {
        itemId: 'dawn-stone',
        gender: 2,
      },
    })
    expect(EVOLUTIONS[361]).toContainEqual({
      speciesId: 478,
      name: 'froslass',
      trigger: 'use-item',
      conditions: {
        itemId: 'dawn-stone',
        gender: 1,
      },
    })
    expect(EVOLUTIONS[422]).toContainEqual({
      speciesId: 423,
      name: 'gastrodon',
      trigger: 'level-up',
      conditions: {
        minLevel: 30,
        requiredSourceForm: 'East Sea',
      },
      targetForm: 'East Sea',
    })
    expect(EVOLUTIONS[585]).toContainEqual({
      speciesId: 586,
      name: 'sawsbuck',
      trigger: 'level-up',
      conditions: {
        minLevel: 34,
        requiredSourceForm: 'Winter Form',
      },
      targetForm: 'Winter Form',
    })
  })

  test('held item configs and trainer held items reference executable item definitions', () => {
    const heldItems = items.filter((item) => item.heldConfig)
    expect(heldItems.length).toBeGreaterThan(0)

    const metalCoat = items.find((item) => item.id === 'metal-coat')
    const metalPolish = items.find((item) => item.id === 'metal-polish')
    expect(metalCoat?.category).toBe('evolution')
    expect(metalCoat?.heldConfig).toBeUndefined()
    expect(metalPolish?.category).toBe('battle')
    expect(metalPolish?.heldConfig?.effect).toEqual({
      type: 'type-damage-boost',
      pokemonType: 'steel',
      damageMultiplier: 1.1,
    })
    expect(metalPolish?.heldConfig?.consumeOnUse).toBe(false)

    const memories = items.filter(
      (item) =>
        item.id.endsWith('-memory') &&
        item.category === 'battle' &&
        item.heldConfig?.effect.type === 'type-damage-boost',
    )
    const plates = items.filter((item) => item.id.endsWith('-plate'))
    const drives = [
      'burn-drive',
      'douse-drive',
      'shock-drive',
      'chill-drive',
    ].map((id) => items.find((item) => item.id === id))
    expect(memories).toHaveLength(18)
    expect(plates).toHaveLength(18)
    expect(items.find((item) => item.id === 'fire-memory')).toMatchObject({
      name: 'Fire Memory',
      category: 'battle',
      spriteId: 'tm-fire',
      heldConfig: {
        consumeOnUse: false,
        effect: {
          type: 'type-damage-boost',
          pokemonType: 'fire',
          damageMultiplier: 1,
        },
      },
    })
    expect(items.find((item) => item.id === 'fire-plate')).toMatchObject({
      name: 'Fire Plate',
      category: 'battle',
      spriteId: 'plates/flame-plate',
      heldConfig: {
        consumeOnUse: false,
        effect: {
          type: 'type-damage-boost',
          pokemonType: 'fire',
          damageMultiplier: 1,
        },
      },
    })
    expect(items.find((item) => item.id === 'normal-plate')).toMatchObject({
      name: 'Normal Plate',
      category: 'battle',
      spriteId: 'plates/normal-plate',
    })
    expect(drives).toEqual([
      expect.objectContaining({ id: 'burn-drive', spriteId: 'burn-drive' }),
      expect.objectContaining({ id: 'douse-drive', spriteId: 'douse-drive' }),
      expect.objectContaining({ id: 'shock-drive', spriteId: 'shock-drive' }),
      expect.objectContaining({ id: 'chill-drive', spriteId: 'chill-drive' }),
    ])

    for (const item of heldItems) {
      if (
        item.heldConfig?.effect.type !== 'damage-block' &&
        item.heldConfig?.effect.type !== 'ev-training' &&
        item.heldConfig?.effect.type !== 'type-damage-boost' &&
        item.heldConfig?.effect.type !== 'attack-status-chance' &&
        item.heldConfig?.effect.type !== 'item-charge'
      ) {
        expect(item.battleEffect, item.id).toBeDefined()
      }
      expect(item.skillRequirements?.battling, item.id).toBeUndefined()
      expect(item.heldConfig?.effect, item.id).toBeDefined()
      const heldConfig = item.heldConfig
      expect(heldConfig?.effect, item.id).toBeDefined()
      if (
        heldConfig?.effect.type === 'attack-status-chance' ||
        heldConfig?.effect.type === 'item-charge' ||
        (heldConfig?.effect.type === 'type-damage-boost' &&
          !item.id.startsWith('unstable-') &&
          ![
            'cotton-scarf',
            'dusty-charcoal',
            'magic-water',
            'weak-magnet',
            'regular-seed',
            'often-melt-ice',
            'brown-belt',
            'poison-tip',
            'coarse-sand',
            'dull-beak',
            'straight-spoon',
            'aluminium-powder',
            'brittle-hard-stone',
            'faux-spell-tag',
            'chipped-dragon-fang',
            'chipped-glasses',
            'rusty-coat',
            'fairy-down',
          ].includes(item.id))
      ) {
        expect(heldConfig?.consumeOnUse, item.id).toBe(false)
      } else {
        expect(heldConfig?.consumeOnUse, item.id).toBe(true)
      }
      if (heldConfig?.consumeChance !== undefined) {
        expect(heldConfig.consumeChance, item.id).toBeGreaterThan(0)
        expect(heldConfig.consumeChance, item.id).toBeLessThanOrEqual(100)
      }
      if (heldConfig?.consumeTrigger !== undefined) {
        expect(['activation', 'battle-win', 'attack'], item.id).toContain(
          heldConfig.consumeTrigger,
        )
      }
      if (heldConfig?.effect.type === 'ev-training') {
        expect(heldConfig.effect.trainingStat, item.id).toBeDefined()
        expect(heldConfig.effect.evAmount, item.id).toBeGreaterThan(0)
        expect(heldConfig.effect.statPenaltyPercent, item.id).toBeGreaterThan(0)
        expect(heldConfig.effect.statPenaltyPercent, item.id).toBeLessThan(100)
      }
      if (heldConfig?.effect.type === 'item-charge') {
        expect(heldConfig.consumeOnUse, item.id).toBe(false)
        const chargeOn = heldConfig.effect.chargeOn
        expect(chargeOn, item.id).toBeDefined()
        if (!chargeOn) continue
        expect(['hit-by-type', 'damage-during-time'], item.id).toContain(chargeOn)
        if (chargeOn === 'hit-by-type') {
          expect(heldConfig.effect.attackType, item.id).toBeDefined()
        }
        if (chargeOn === 'damage-during-time') {
          expect(heldConfig.effect.chargeActiveWindow, item.id).toBeDefined()
        }
        expect(heldConfig.effect.chargeAmount, item.id).toBeGreaterThan(0)
        expect(heldConfig.effect.maxCharge, item.id).toBeGreaterThan(0)
        expect(heldConfig.effect.rewardItemId, item.id).toBeDefined()
      }
    }

    for (const battle of battles) {
      for (const enemy of battle.enemyTeam) {
        if (!enemy.heldItemId) continue
        expect(
          getHeldItemDefinition(enemy.heldItemId),
          `${battle.id}:${enemy.heldItemId}`,
        ).toBeTruthy()
      }

      for (const trainerItem of battle.trainerItems ?? []) {
        const item = items.find((entry) => entry.id === trainerItem.itemId)
        expect(item, `${battle.id}:${trainerItem.itemId}`).toBeTruthy()
        expect(
          item?.battleEffect,
          `${battle.id}:${trainerItem.itemId}`,
        ).toBeDefined()
        expect(
          (trainerItem as { trigger?: unknown }).trigger,
          `${battle.id}:${trainerItem.itemId}`,
        ).toBeUndefined()
        if (trainerItem.quantity !== undefined) {
          expect(
            trainerItem.quantity,
            `${battle.id}:${trainerItem.itemId}`,
          ).toBeGreaterThan(0)
        }
      }

      for (const enemy of battle.enemyTeam) {
        for (const moveId of enemy.aiMoves ?? []) {
          const move = getMove(moveId)
          expect(move, `${battle.id}:${enemy.speciesId}:${moveId}`).toBeTruthy()

          const form = getPokemonForm(enemy.formId || String(enemy.speciesId))
          expect(
            form,
            `${battle.id}:${enemy.speciesId}:${enemy.formId || enemy.speciesId}`,
          ).toBeTruthy()
          if (!move || !form) continue

          expect(
            canEnemyPokemonUseAiMove(
              {
                speciesId: enemy.speciesId,
                formId: enemy.formId || String(enemy.speciesId),
                level:
                  typeof enemy.level === 'number'
                    ? enemy.level
                    : enemy.level.min,
                types: form.types,
                currentHp: 100,
                maxHp: 100,
              } as any,
              move,
              {
                manualAssignment: true,
                isWildBattle: battle.isWildBattle,
              },
            ),
            `${battle.id}:${enemy.speciesId}:${moveId}`,
          ).toBe(true)
        }
      }
    }
  })

  test('held item form variants retain their signature dynamic-type moves', () => {
    expect(getMove('judgment')?.formId).toEqual(
      expect.arrayContaining(['493', '493-fire', '493-water', '493-fairy']),
    )
    expect(getMove('multi-attack')?.formId).toEqual(
      expect.arrayContaining(['773', '773-fire', '773-water', '773-fairy']),
    )
    expect(getMove('techno-blast')?.formId).toEqual(
      expect.arrayContaining([
        '649',
        '649-burn',
        '649-douse',
        '649-shock',
        '649-chill',
      ]),
    )
  })

  test('Rotom form manuals are reusable form-change key items', () => {
    const manuals = [
      'rotom-light-bulb-manual',
      'rotom-oven-manual',
      'rotom-washing-machine-manual',
      'rotom-refrigerator-manual',
      'rotom-fan-manual',
      'rotom-lawn-mower-manual',
    ].map((id) => items.find((item) => item.id === id))

    expect(manuals).toHaveLength(6)
    for (const manual of manuals) {
      expect(manual).toMatchObject({
        category: 'key',
        spriteId: 'rotom-catalogue',
        unique: true,
        consume: false,
      })
      expect(manual?.effects?.changeForm?.transitions).toHaveLength(5)
    }
    const washManual = items.find(
      (item) => item.id === 'rotom-washing-machine-manual',
    )
    expect(washManual?.name).toBe('Washing Machine Manual')
    expect(washManual?.effects?.changeForm?.transitions).toContainEqual({
      fromFormId: '479',
      toFormId: '10009',
    })
    expect(washManual?.effects?.changeForm?.transitions).toContainEqual({
      fromFormId: '10008',
      toFormId: '10009',
    })
    expect(washManual?.effects?.changeForm?.transitions).toContainEqual({
      fromFormId: '10011',
      toFormId: '10009',
    })
  })

  test('Ogerpon masks are reusable form-change key items', () => {
    const masks = [
      'teal-mask',
      'wellspring-mask',
      'hearthflame-mask',
      'cornerstone-mask',
    ].map((id) => items.find((item) => item.id === id))

    expect(masks).toHaveLength(4)
    for (const mask of masks) {
      expect(mask).toMatchObject({
        category: 'key',
        spriteId: mask?.id,
        unique: true,
        consume: false,
      })
      expect(mask?.effects?.changeForm?.transitions).toHaveLength(3)
    }

    const hearthflameMask = items.find((item) => item.id === 'hearthflame-mask')
    expect(hearthflameMask?.effects?.changeForm?.transitions).toContainEqual({
      fromFormId: '1017',
      toFormId: '10274',
    })
    expect(hearthflameMask?.effects?.changeForm?.transitions).toContainEqual({
      fromFormId: '10273',
      toFormId: '10274',
    })
    expect(hearthflameMask?.effects?.changeForm?.transitions).toContainEqual({
      fromFormId: '10275',
      toFormId: '10274',
    })
  })

  test('Reveal Glass swaps Forces of Nature formes', () => {
    const revealGlass = items.find((item) => item.id === 'reveal-glass')

    expect(revealGlass).toMatchObject({
      category: 'key',
      spriteId: 'reveal-glass',
      unique: true,
      consume: false,
    })
    expect(revealGlass?.effects?.changeForm?.transitions).toHaveLength(8)
    expect(revealGlass?.effects?.changeForm?.transitions).toContainEqual({
      fromFormId: '641',
      toFormId: '10019',
    })
    expect(revealGlass?.effects?.changeForm?.transitions).toContainEqual({
      fromFormId: '10020',
      toFormId: '642',
    })
    expect(revealGlass?.effects?.changeForm?.transitions).toContainEqual({
      fromFormId: '645',
      toFormId: '10021',
    })
    expect(revealGlass?.effects?.changeForm?.transitions).toContainEqual({
      fromFormId: '10249',
      toFormId: '905',
    })
  })

  test('Gracidea swaps Shaymin formes', () => {
    const gracidea = items.find((item) => item.id === 'gracidea')

    expect(gracidea).toMatchObject({
      category: 'key',
      spriteId: 'gracidea',
      unique: true,
      consume: false,
    })
    expect(gracidea?.effects?.changeForm?.transitions).toEqual([
      { fromFormId: '492', toFormId: '10006' },
      { fromFormId: '10006', toFormId: '492' },
    ])
  })

  test('Prison Bottle swaps Hoopa forms', () => {
    const prisonBottle = items.find((item) => item.id === 'prison-bottle')

    expect(prisonBottle).toMatchObject({
      category: 'key',
      spriteId: 'key/prison-bottle',
      unique: true,
      consume: false,
    })
    expect(prisonBottle?.effects?.changeForm?.transitions).toEqual([
      { fromFormId: '720', toFormId: '10086' },
      { fromFormId: '10086', toFormId: '720' },
    ])
  })

  test('Meteorite cycles Deoxys formes', () => {
    const meteorite = items.find((item) => item.id === 'meteorite')

    expect(meteorite).toMatchObject({
      category: 'key',
      spriteId: 'meteor',
      unique: true,
      consume: false,
    })
    expect(meteorite?.effects?.changeForm?.transitions).toEqual([
      { fromFormId: '386', toFormId: '10001' },
      { fromFormId: '10001', toFormId: '10002' },
      { fromFormId: '10002', toFormId: '10003' },
      { fromFormId: '10003', toFormId: '386' },
    ])
  })

  test('fusion key items define reversible Pokemon fusion pairs', () => {
    const dnaSplicers = items.find((item) => item.id === 'dna-splicers')
    expect(dnaSplicers).toMatchObject({
      category: 'key',
      spriteId: 'dna-splicers',
      unique: true,
      consume: false,
    })
    expect(dnaSplicers?.effects?.fusePokemon).toEqual({
      baseFormId: '646',
      fusions: [
        {
          partnerFormId: '644',
          fusedFormId: '10022',
          label: 'Fuse with Zekrom',
        },
        {
          partnerFormId: '643',
          fusedFormId: '10023',
          label: 'Fuse with Reshiram',
        },
      ],
      label: 'Fuse/Unfuse',
    })

    const nSolarizer = items.find((item) => item.id === 'n-solarizer')
    expect(nSolarizer?.effects?.fusePokemon).toEqual({
      baseFormId: '800',
      fusions: [
        {
          partnerFormId: '791',
          fusedFormId: '10155',
          label: 'Fuse with Solgaleo',
        },
      ],
      label: 'Fuse/Unfuse',
    })

    const nLunarizer = items.find((item) => item.id === 'n-lunarizer')
    expect(nLunarizer?.effects?.fusePokemon).toEqual({
      baseFormId: '800',
      fusions: [
        {
          partnerFormId: '792',
          fusedFormId: '10156',
          label: 'Fuse with Lunala',
        },
      ],
      label: 'Fuse/Unfuse',
    })

    const reinsOfUnity = items.find((item) => item.id === 'reins-of-unity')
    expect(reinsOfUnity?.effects?.fusePokemon).toEqual({
      baseFormId: '898',
      fusions: [
        {
          partnerFormId: '896',
          fusedFormId: '10193',
          label: 'Fuse with Glastrier',
        },
        {
          partnerFormId: '897',
          fusedFormId: '10194',
          label: 'Fuse with Spectrier',
        },
      ],
      label: 'Fuse/Unfuse',
    })
  })

  test('berries are authored only as materials, battle items, or held items', () => {
    const berries = items.filter((item) => item.category === 'berry')
    expect(berries.length).toBeGreaterThan(0)

    for (const berry of berries) {
      expect(berry.effects, berry.id).toBeUndefined()
      expect(berry.effects?.increaseFriendship, berry.id).toBeUndefined()
    }
  })

  test('skill-gated item categories declare their skill requirements', () => {
    const balls = items.filter((item) => item.category === 'ball')
    expect(balls.length).toBeGreaterThan(0)

    for (const ball of balls) {
      expect(ball.skillRequirements?.catching, ball.id).toBeUndefined()
    }

    const battleUseItems = items.filter(
      (item) =>
        item.battleEffect &&
        item.battleEffect.type !== 'tera' &&
        item.battleEffect.type !== 'z-move' &&
        (item.category === 'battle' || item.category === 'potion'),
    )
    expect(battleUseItems.length).toBeGreaterThan(0)

    for (const item of battleUseItems) {
      expect(item.skillRequirements?.battling, item.id).toBeGreaterThanOrEqual(
        1,
      )
    }
  })

  test('battle-effect items declare a concrete battle effect type', () => {
    const battleEffectItems = items.filter(
      (item) =>
        item.battleEffect &&
        item.battleEffect.type !== 'z-move' &&
        (item.category === 'battle' ||
          item.category === 'potion' ||
          item.category === 'berry'),
    )
    expect(battleEffectItems.length).toBeGreaterThan(0)

    const missingBattleEffectTypes = battleEffectItems
      .filter((item) => !item.battleEffect?.type)
      .map((item) => item.id)

    expect(missingBattleEffectTypes).toEqual([])
  })

  test('custom type abilities are not in the canonical ability registry', () => {
    const patchByTeachAbility = new Map(
      abilityPatchItems
        .filter((item) => item.effects?.teachAbility)
        .map((item) => [item.effects!.teachAbility, item]),
    )

    for (const type of POKEMON_TYPES) {
      const slug = type.toLowerCase()
      const charmerAbilityId = `${slug}_charmer`
      const charmerPatchId = `${slug}-charmer-ability-patch`
      const gemFinderAbilityId = `gem_finder_${slug}`
      const gemFinderPatchId = `gem-finder-${slug}-ability-patch`

      expect(ABILITIES[charmerAbilityId]).toBeUndefined()
      expect(ABILITIES[gemFinderAbilityId]).toBeUndefined()
      expect(ABILITY_TYPE_MAP[type]).toEqual([])
      expect(patchByTeachAbility.get(charmerAbilityId)).toBeUndefined()
      expect(patchByTeachAbility.get(gemFinderAbilityId)).toBeUndefined()
      expect(itemIds.has(charmerPatchId)).toBe(false)
      expect(itemIds.has(gemFinderPatchId)).toBe(false)
    }
  })

  test('every authored ability has a matching ability patch item', () => {
    const patchByTeachAbility = new Map(
      abilityPatchItems
        .filter((item) => item.effects?.teachAbility)
        .map((item) => [item.effects!.teachAbility, item]),
    )

    const abilities = Object.entries(ABILITIES).sort(([a], [b]) =>
      a.localeCompare(b),
    )

    for (const [abilityId, ability] of abilities) {
      const patchId = `${abilityId.replace(/_/g, '-')}-ability-patch`
      const patch = patchByTeachAbility.get(abilityId)

      expect(itemIds.has(patchId)).toBe(true)
      expect(patch).toMatchObject({
        id: patchId,
        name: `${ability.name} Ability Patch`,
        description: `Teaches the ${ability.name} ability to a Pokemon.`,
        category: 'ability-patch',
        effects: { teachAbility: abilityId },
      })

      const expectedForms = resolveAbilityForms(ability)
      if (expectedForms.length > 0) {
        expect(patch?.effects?.usableByForms).toEqual(expectedForms)
      } else {
        expect(patch?.effects?.usableByTypes).toBeUndefined()
        expect(patch?.effects?.usableByForms).toBeUndefined()
      }
    }
  })

  test('global ability pool is empty', () => {
    expect(ABILITY_GLOBAL_MAP).toEqual([])
    expect(ABILITIES.ball_boy).toBeUndefined()
    expect(ABILITIES.ball_boy_plus).toBeUndefined()
    expect(ABILITIES.ball_boy_ex).toBeUndefined()
  })

  test('form-specific catching abilities are configured', () => {
    const naturalFormIds = new Set<string>()

    for (const [abilityId, ability] of Object.entries(ABILITIES)) {
      if (!ability.naturalAssignments?.length) continue

      for (const assignment of ability.naturalAssignments) {
        for (const formId of resolveAbilityForms({ forms: assignment.forms })) {
          naturalFormIds.add(formId)
          expect(formIds.has(formId)).toBe(true)
          expect(ABILITY_FORM_MAP[formId]).toContainEqual({
            id: abilityId,
            rate: assignment.chance,
            hidden: assignment.hidden,
            slot: assignment.slot,
          })
        }
      }
    }
    expect(kantoBaseFormIds.some((formId) => naturalFormIds.has(formId))).toBe(
      true,
    )

    expect(ABILITY_FORM_MAP['1']).toContainEqual({
      id: 'chlorophyll',
      rate: 5,
      hidden: true,
      slot: 3,
    })
    expect(ABILITY_FORM_MAP['1']).toContainEqual({
      id: 'overgrow',
      rate: 100,
      hidden: undefined,
      slot: 1,
    })
    expect(ABILITY_FORM_MAP['16']).toContainEqual({
      id: 'keen_eye',
      rate: 50,
      hidden: undefined,
      slot: 1,
    })
    expect(ABILITY_FORM_MAP['16']).toContainEqual({
      id: 'tangled_feet',
      rate: 100,
      hidden: undefined,
      slot: 2,
    })
    expect(ABILITY_FORM_MAP['16']).toContainEqual({
      id: 'big_pecks',
      rate: 5,
      hidden: true,
      slot: 3,
    })
    expect(ABILITIES.kick_sand).toBeUndefined()
    expect(ABILITIES.scavenge).toBeUndefined()
    expect(ABILITIES.secret_admirer).toBeUndefined()
    expect(ABILITIES.unstable).toBeUndefined()
    expect(Object.values(ABILITIES).every((ability) => ability.effects?.length)).toBe(true)
    expect(
      Object.values(ABILITIES).every((ability) =>
        ability.effects?.some((effect) => effect.type.startsWith('battle-')),
      ),
    ).toBe(true)
    expect(speciesIds.has(778)).toBe(true)
    expect(formIds.has('778')).toBe(true)
  })

  test('evolution ability resolution preserves source ability slot', () => {
    expect(isNaturalFormAbilityForForm('16', 'keen_eye')).toBe(true)
    expect(isNaturalFormAbilityForForm('16', 'tangled_feet')).toBe(true)
    expect(isNaturalFormAbilityForForm('16', 'big_pecks')).toBe(true)
    expect(isNaturalFormAbilityForForm('16', 'tiny_roar')).toBe(false)
    expect(isNaturalFormAbilityForForm('17', 'keen_eye')).toBe(true)
    expect(isNaturalFormAbilityForForm('17', 'overgrow')).toBe(false)

    expect(resolveEvolvedAbility('16', 'keen_eye', '17', () => 0)).toBe('keen_eye')
    expect(resolveEvolvedAbility('16', 'tangled_feet', '17', () => 0)).toBe('tangled_feet')
    expect(resolveEvolvedAbility('16', 'big_pecks', '17', () => 0.999999)).toBe('big_pecks')
    expect(resolveEvolvedAbility('133', 'run_away', '134', () => 0.999999)).toBe('water_absorb')
    expect(resolveEvolvedAbility('133', 'adaptability', '134', () => 0.999999)).toBe('water_absorb')
    expect(resolveEvolvedAbility('133', 'anticipation', '134', () => 0.999999)).toBe('hydration')
    expect(resolveEvolvedAbility('16', 'tiny_roar', '17', () => 0)).toBe('big_pecks')
  })

  test('AbilityDex exposes authored partner effect text', () => {
    expect(getAbilityDexPartnerEffectLines(ABILITIES.cute_charm)).toContainEqual({
      id: 'catch-rate-multiplier-1',
      text: 'Capture: +8% catch rate.',
    })
    expect(getAbilityDexPartnerEffectLines(ABILITIES.compound_eyes)).toContainEqual({
      id: 'field-observation-duration-delta-2',
      text: 'Field Observation: +2s observation time, +1s answer time.',
    })
  })

  test('canonical parental bond ability is authored', () => {
    expect(
      Object.keys(ABILITIES).some((id) => id.includes('parental_bond')),
    ).toBe(true)
    expect(ABILITIES.parental_bond).toMatchObject({
      id: 'parental_bond',
      name: 'Parental Bond',
    })
    expect(ABILITIES.special_parental_bond).toBeUndefined()
    expect(
      Object.values(ABILITY_FORM_MAP).some((assignments) =>
        assignments.some((assignment) =>
          assignment.id.includes('parental_bond'),
        ),
      ),
    ).toBe(true)
  })

  test('key encounters block encounter ability replacement', () => {
    expect(canApplyEncounterAbilityOverride({ keyEncounter: true })).toBe(false)
    expect(canApplyEncounterAbilityOverride({ keyEncounter: false })).toBe(true)
    expect(canApplyEncounterAbilityOverride({})).toBe(true)
  })
})
