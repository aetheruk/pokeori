import { describe, expect, test } from 'bun:test'
import { items } from '@/data/items'
import {
  getPokemonItemEffectLabel,
  getPokemonItemUnavailableReason,
  isPokemonTargetedInventoryItem,
} from '@/utilities/pokemon/item-usability'

function item(itemId: string) {
  const found = items.find((entry) => entry.id === itemId)
  if (!found) throw new Error(`Missing item ${itemId}`)
  return found
}

describe('Pokemon item usability', () => {
  test('only Pokemon-targeted inventory items are shown in the Pokemon item picker', () => {
    expect(isPokemonTargetedInventoryItem(item('poke-ball'))).toBe(false)
    expect(isPokemonTargetedInventoryItem(item('battle-potion'))).toBe(false)
    expect(isPokemonTargetedInventoryItem(item('rare-candy-m'))).toBe(true)
    expect(isPokemonTargetedInventoryItem(item('hp-up'))).toBe(true)
    expect(isPokemonTargetedInventoryItem(item('vital-spirit-ability-patch'))).toBe(true)
    expect(isPokemonTargetedInventoryItem(item('research-kit'))).toBe(true)
    expect(isPokemonTargetedInventoryItem(item('tera-shard-fire'))).toBe(true)
    expect(isPokemonTargetedInventoryItem(item('rusty-sword'))).toBe(true)
    expect(isPokemonTargetedInventoryItem(item('rusty-shield'))).toBe(true)
    expect(isPokemonTargetedInventoryItem(item('griseous-orb'))).toBe(true)
    expect(isPokemonTargetedInventoryItem(item('adamant-orb'))).toBe(true)
    expect(isPokemonTargetedInventoryItem(item('lustrous-orb'))).toBe(true)
    expect(
      isPokemonTargetedInventoryItem(item('rotom-washing-machine-manual')),
    ).toBe(true)
    expect(isPokemonTargetedInventoryItem(item('meteorite'))).toBe(true)
    expect(isPokemonTargetedInventoryItem(item('dna-splicers'))).toBe(true)
    expect(isPokemonTargetedInventoryItem(item('n-solarizer'))).toBe(true)
    expect(isPokemonTargetedInventoryItem(item('n-lunarizer'))).toBe(true)
    expect(isPokemonTargetedInventoryItem(item('reins-of-unity'))).toBe(true)
  })

  test('hides level-gated candies that cannot affect the selected Pokemon', () => {
    expect(
      getPokemonItemUnavailableReason(item('rare-candy-m'), { level: 10 }),
    ).toBe('This candy can only be used from level 20.')
    expect(
      getPokemonItemUnavailableReason(item('rare-candy-m'), { level: 30 }),
    ).toBe('This candy can only be used up to level 29.')
    expect(
      getPokemonItemUnavailableReason(item('rare-candy-m'), { level: 20 }),
    ).toBeNull()
  })

  test('hides stat items, ability patches, and research kits when they cannot apply', () => {
    expect(
      getPokemonItemUnavailableReason(item('hp-up'), {
        level: 20,
        evs: { hp: 255 },
      }),
    ).toBe('hp is already maxed out.')
    expect(
      getPokemonItemUnavailableReason(item('vital-spirit-ability-patch'), {
        speciesId: 4,
        formId: '4',
        level: 20,
      }),
    ).toBe('This item cannot be used on this Pokemon.')
    expect(
      getPokemonItemUnavailableReason(
        item('research-kit'),
        { speciesId: 25, formId: '25', level: 20 },
        { researching: { level: 34 } },
      ),
    ).toBe('Researcher Level 35 required to use Research Kit')
  })

  test('blocks ability patches from overwriting locked abilities', () => {
    expect(
      getPokemonItemUnavailableReason(item('overgrow-ability-patch'), {
        speciesId: 92,
        formId: '92',
        level: 20,
        ability: 'levitate',
      }),
    ).toBe('Levitate cannot be overwritten.')
  })

  test('Pokemon item picker uses concise effect labels instead of item descriptions', () => {
    expect(getPokemonItemEffectLabel(item('rare-candy-m'))).toBe('Level +1')
    expect(getPokemonItemEffectLabel(item('protein'))).toBe('Attack EV + 10')
    expect(getPokemonItemEffectLabel(item('swift-feather'))).toBe(
      'Speed EV + 1',
    )
    expect(getPokemonItemEffectLabel(item('pretty-feather'))).toBe(
      'Friendship + 1',
    )
    expect(getPokemonItemEffectLabel(item('adamant-mint'))).toBe(
      'Adamant Nature',
    )
    expect(getPokemonItemEffectLabel(item('bottle-cap'))).toBe(
      'Choose IV to 31',
    )
    expect(getPokemonItemEffectLabel(item('gold-bottle-cap'))).toBe(
      'All IVs to 31',
    )
    expect(getPokemonItemEffectLabel(item('vital-spirit-ability-patch'))).toBe(
      'New Ability',
    )
    expect(getPokemonItemEffectLabel(item('research-kit'))).toBe(
      'Research XP + 5',
    )
    expect(getPokemonItemEffectLabel(item('tera-shard-fire'))).toBe(
      'Fire Tera Type',
    )
    expect(getPokemonItemEffectLabel(item('rusty-sword'))).toBe('Change Form')
    expect(getPokemonItemEffectLabel(item('griseous-orb'))).toBe('Change Form')
    expect(getPokemonItemEffectLabel(item('rotom-fan-manual'))).toBe(
      'Change Form',
    )
    expect(getPokemonItemEffectLabel(item('meteorite'))).toBe('Change Forme')
    expect(getPokemonItemEffectLabel(item('dna-splicers'))).toBe('Fuse/Unfuse')
  })

  test('hides Tera Shards when the Pokemon already has that Tera type', () => {
    expect(
      getPokemonItemUnavailableReason(item('tera-shard-fire'), {
        teraType: 'fire',
      }),
    ).toBe('This Pokemon already has fire Tera type.')
  })

  test('Rusty Sword and Rusty Shield only apply to their matching legendary forms', () => {
    expect(
      getPokemonItemUnavailableReason(item('rusty-sword'), {
        speciesId: 888,
        formId: '888',
      }),
    ).toBeNull()
    expect(
      getPokemonItemUnavailableReason(item('rusty-sword'), {
        speciesId: 888,
        formId: '10188',
      }),
    ).toBeNull()
    expect(
      getPokemonItemUnavailableReason(item('rusty-shield'), {
        speciesId: 889,
        formId: '889',
      }),
    ).toBeNull()
    expect(
      getPokemonItemUnavailableReason(item('rusty-shield'), {
        speciesId: 889,
        formId: '10189',
      }),
    ).toBeNull()
    expect(
      getPokemonItemUnavailableReason(item('rusty-sword'), {
        speciesId: 889,
        formId: '889',
      }),
    ).toBe('This item cannot be used on this Pokemon.')
    expect(
      getPokemonItemUnavailableReason(item('rusty-shield'), {
        speciesId: 888,
        formId: '888',
      }),
    ).toBe('This item cannot be used on this Pokemon.')
  })

  test('legendary orbs only apply to their matching origin formes', () => {
    expect(
      getPokemonItemUnavailableReason(item('griseous-orb'), {
        speciesId: 487,
        formId: '487',
      }),
    ).toBeNull()
    expect(
      getPokemonItemUnavailableReason(item('griseous-orb'), {
        speciesId: 487,
        formId: '10007',
      }),
    ).toBeNull()
    expect(
      getPokemonItemUnavailableReason(item('adamant-orb'), {
        speciesId: 483,
        formId: '483',
      }),
    ).toBeNull()
    expect(
      getPokemonItemUnavailableReason(item('adamant-orb'), {
        speciesId: 483,
        formId: '10245',
      }),
    ).toBeNull()
    expect(
      getPokemonItemUnavailableReason(item('lustrous-orb'), {
        speciesId: 484,
        formId: '484',
      }),
    ).toBeNull()
    expect(
      getPokemonItemUnavailableReason(item('lustrous-orb'), {
        speciesId: 484,
        formId: '10246',
      }),
    ).toBeNull()
    expect(
      getPokemonItemUnavailableReason(item('griseous-orb'), {
        speciesId: 483,
        formId: '483',
      }),
    ).toBe('This item cannot be used on this Pokemon.')
    expect(
      getPokemonItemUnavailableReason(item('adamant-orb'), {
        speciesId: 484,
        formId: '484',
      }),
    ).toBe('This item cannot be used on this Pokemon.')
    expect(
      getPokemonItemUnavailableReason(item('lustrous-orb'), {
        speciesId: 487,
        formId: '487',
      }),
    ).toBe('This item cannot be used on this Pokemon.')
  })

  test('Rotom manuals switch between appliance forms', () => {
    expect(
      getPokemonItemUnavailableReason(item('rotom-washing-machine-manual'), {
        speciesId: 479,
        formId: '479',
      }),
    ).toBeNull()
    expect(
      getPokemonItemUnavailableReason(item('rotom-washing-machine-manual'), {
        speciesId: 479,
        formId: '10008',
      }),
    ).toBeNull()
    expect(
      getPokemonItemUnavailableReason(item('rotom-washing-machine-manual'), {
        speciesId: 479,
        formId: '10009',
      }),
    ).toBe('This item cannot be used on this Pokemon.')
    expect(
      getPokemonItemUnavailableReason(item('rotom-fan-manual'), {
        speciesId: 479,
        formId: '10009',
      }),
    ).toBeNull()
    expect(
      getPokemonItemUnavailableReason(item('rotom-light-bulb-manual'), {
        speciesId: 479,
        formId: '10012',
      }),
    ).toBeNull()
    expect(
      getPokemonItemUnavailableReason(item('rotom-fan-manual'), {
        speciesId: 25,
        formId: '25',
      }),
    ).toBe('This item cannot be used on this Pokemon.')
  })

  test('Meteorite cycles between Deoxys formes', () => {
    expect(
      getPokemonItemUnavailableReason(item('meteorite'), {
        speciesId: 386,
        formId: '386',
      }),
    ).toBeNull()
    expect(
      getPokemonItemUnavailableReason(item('meteorite'), {
        speciesId: 386,
        formId: '10001',
      }),
    ).toBeNull()
    expect(
      getPokemonItemUnavailableReason(item('meteorite'), {
        speciesId: 386,
        formId: '10002',
      }),
    ).toBeNull()
    expect(
      getPokemonItemUnavailableReason(item('meteorite'), {
        speciesId: 386,
        formId: '10003',
      }),
    ).toBeNull()
    expect(
      getPokemonItemUnavailableReason(item('meteorite'), {
        speciesId: 25,
        formId: '25',
      }),
    ).toBe('This item cannot be used on this Pokemon.')
  })

  test('fusion items apply to base Pokemon and their own stored fused forms', () => {
    expect(
      getPokemonItemUnavailableReason(item('dna-splicers'), {
        speciesId: 646,
        formId: '646',
      }),
    ).toBeNull()
    expect(
      getPokemonItemUnavailableReason(item('dna-splicers'), {
        speciesId: 646,
        formId: '10022',
        fusionItemId: 'dna-splicers',
        fusionBaseFormId: '646',
        fusedWithPokemonId: 'zekrom-1',
      }),
    ).toBeNull()
    expect(
      getPokemonItemUnavailableReason(item('dna-splicers'), {
        speciesId: 646,
        formId: '10022',
      }),
    ).toBe('This item cannot be used on this Pokemon.')
    expect(
      getPokemonItemUnavailableReason(item('n-solarizer'), {
        speciesId: 800,
        formId: '800',
      }),
    ).toBeNull()
    expect(
      getPokemonItemUnavailableReason(item('n-lunarizer'), {
        speciesId: 800,
        formId: '10155',
        fusionItemId: 'n-solarizer',
        fusionBaseFormId: '800',
        fusedWithPokemonId: 'solgaleo-1',
      }),
    ).toBe('This item cannot be used on this Pokemon.')
    expect(
      getPokemonItemUnavailableReason(item('reins-of-unity'), {
        speciesId: 898,
        formId: '10194',
        fusionItemId: 'reins-of-unity',
        fusionBaseFormId: '898',
        fusedWithPokemonId: 'spectrier-1',
      }),
    ).toBeNull()
  })
})
