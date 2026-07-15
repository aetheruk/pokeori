import type { Item, PokemonTypeName } from '../types'

const TYPE_HELD_ITEM_FAMILIES: Array<{
  type: PokemonTypeName
  normalId: string
  normalName: string
  lowId: string
  lowName: string
}> = [
  { type: 'normal', normalId: 'silk-scarf', normalName: 'Silk Scarf', lowId: 'cotton-scarf', lowName: 'Cotton Scarf' },
  { type: 'fire', normalId: 'charcoal', normalName: 'Charcoal', lowId: 'dusty-charcoal', lowName: 'Dusty Charcoal' },
  { type: 'water', normalId: 'mystic-water', normalName: 'Mystic Water', lowId: 'magic-water', lowName: 'Magic Water' },
  { type: 'electric', normalId: 'magnet', normalName: 'Magnet', lowId: 'weak-magnet', lowName: 'Weak Magnet' },
  { type: 'grass', normalId: 'miracle-seed', normalName: 'Miracle Seed', lowId: 'regular-seed', lowName: 'Regular Seed' },
  { type: 'ice', normalId: 'never-melt-ice', normalName: 'Never-Melt Ice', lowId: 'often-melt-ice', lowName: 'Often-Melt Ice' },
  { type: 'fighting', normalId: 'black-belt', normalName: 'Black Belt', lowId: 'brown-belt', lowName: 'Brown Belt' },
  { type: 'poison', normalId: 'poison-barb', normalName: 'Poison Barb', lowId: 'poison-tip', lowName: 'Poison Tip' },
  { type: 'ground', normalId: 'soft-sand', normalName: 'Soft Sand', lowId: 'coarse-sand', lowName: 'Coarse Sand' },
  { type: 'flying', normalId: 'sharp-beak', normalName: 'Sharp Beak', lowId: 'dull-beak', lowName: 'Dull Beak' },
  { type: 'psychic', normalId: 'twisted-spoon', normalName: 'Twisted Spoon', lowId: 'straight-spoon', lowName: 'Straight Spoon' },
  { type: 'bug', normalId: 'silver-powder', normalName: 'Silver Powder', lowId: 'aluminium-powder', lowName: 'Aluminium Powder' },
  { type: 'rock', normalId: 'hard-stone', normalName: 'Hard Stone', lowId: 'brittle-hard-stone', lowName: 'Brittle Hard Stone' },
  { type: 'ghost', normalId: 'spell-tag', normalName: 'Spell Tag', lowId: 'faux-spell-tag', lowName: 'Faux Spell Tag' },
  { type: 'dragon', normalId: 'dragon-fang', normalName: 'Dragon Fang', lowId: 'chipped-dragon-fang', lowName: 'Chipped Dragon Fang' },
  { type: 'dark', normalId: 'black-glasses', normalName: 'Black Glasses', lowId: 'chipped-glasses', lowName: 'Chipped Glasses' },
  { type: 'steel', normalId: 'metal-polish', normalName: 'Metal Polish', lowId: 'rusty-coat', lowName: 'Rusty Coat' },
  { type: 'fairy', normalId: 'fairy-feather', normalName: 'Fairy Feather', lowId: 'fairy-down', lowName: 'Fairy Down' },
]

const typeLabel = (type: PokemonTypeName) =>
  type.charAt(0).toUpperCase() + type.slice(1)

const PLATE_SPRITE_IDS: Record<PokemonTypeName, string> = {
  normal: 'plates/normal-plate',
  fire: 'plates/flame-plate',
  water: 'plates/splash-plate',
  electric: 'plates/zap-plate',
  grass: 'plates/meadow-plate',
  ice: 'plates/icicle-plate',
  fighting: 'plates/fist-plate',
  poison: 'plates/toxic-plate',
  ground: 'plates/earth-plate',
  flying: 'plates/sky-plate',
  psychic: 'plates/mind-plate',
  bug: 'plates/insect-plate',
  rock: 'plates/stone-plate',
  ghost: 'plates/spooky-plate',
  dragon: 'plates/draco-plate',
  dark: 'plates/dread-plate',
  steel: 'plates/iron-plate',
  fairy: 'plates/pixie-plate',
}

const heldTypeChangeItems: Item[] = [
  ...TYPE_HELD_ITEM_FAMILIES.map((family) => {
    const typeName = typeLabel(family.type)
    return {
      id: `${family.type}-memory`,
      name: `${typeName} Memory`,
      description: `A held memory disc that changes Multi-Attack to ${typeName} type and changes Silvally's form.`,
      category: 'battle' as const,
      spriteId: `tm-${family.type}`,
      heldConfig: {
        trigger: { type: 'permanent' as const },
        consumeOnUse: false,
        effect: {
          type: 'type-damage-boost' as const,
          pokemonType: family.type,
          damageMultiplier: 1,
        },
      },
    }
  }),
  {
    id: 'burn-drive',
    name: 'Burn Drive',
    description: "A held drive that changes Techno Blast to Fire type and changes Genesect's form.",
    category: 'battle' as const,
    spriteId: 'burn-drive',
    heldConfig: {
      trigger: { type: 'permanent' as const },
      consumeOnUse: false,
      effect: {
        type: 'type-damage-boost' as const,
        pokemonType: 'fire' as const,
        damageMultiplier: 1,
      },
    },
  },
  {
    id: 'douse-drive',
    name: 'Douse Drive',
    description: "A held drive that changes Techno Blast to Water type and changes Genesect's form.",
    category: 'battle' as const,
    spriteId: 'douse-drive',
    heldConfig: {
      trigger: { type: 'permanent' as const },
      consumeOnUse: false,
      effect: {
        type: 'type-damage-boost' as const,
        pokemonType: 'water' as const,
        damageMultiplier: 1,
      },
    },
  },
  {
    id: 'shock-drive',
    name: 'Shock Drive',
    description:
      "A held drive that changes Techno Blast to Electric type and changes Genesect's form.",
    category: 'battle' as const,
    spriteId: 'shock-drive',
    heldConfig: {
      trigger: { type: 'permanent' as const },
      consumeOnUse: false,
      effect: {
        type: 'type-damage-boost' as const,
        pokemonType: 'electric' as const,
        damageMultiplier: 1,
      },
    },
  },
  {
    id: 'chill-drive',
    name: 'Chill Drive',
    description: "A held drive that changes Techno Blast to Ice type and changes Genesect's form.",
    category: 'battle' as const,
    spriteId: 'chill-drive',
    heldConfig: {
      trigger: { type: 'permanent' as const },
      consumeOnUse: false,
      effect: {
        type: 'type-damage-boost' as const,
        pokemonType: 'ice' as const,
        damageMultiplier: 1,
      },
    },
  },
]

const heldPlateItems: Item[] = TYPE_HELD_ITEM_FAMILIES.map((family) => {
  const typeName = typeLabel(family.type)
  return {
    id: `${family.type}-plate`,
    name: `${typeName} Plate`,
    description: `A held plate that changes Judgment to ${typeName} type and changes Arceus's form.`,
    category: 'battle' as const,
    spriteId: PLATE_SPRITE_IDS[family.type],
    heldConfig: {
      trigger: { type: 'permanent' as const },
      consumeOnUse: false,
      effect: {
        type: 'type-damage-boost' as const,
        pokemonType: family.type,
        damageMultiplier: 1,
      },
    },
  }
})

const heldTypeBoostItems: Item[] = TYPE_HELD_ITEM_FAMILIES.flatMap((family) => {
  const spriteId = family.normalId
  const typeName = typeLabel(family.type)
  const tierItems: Item[] = [
    {
      id: family.lowId,
      name: family.lowName,
      description: `A diminished held item that increases ${typeName}-type attack damage by 10%. It has a 25% chance to break after an attack.`,
      category: 'battle' as const,
      spriteId,
      heldConfig: {
        trigger: { type: 'permanent' as const },
        consumeOnUse: true,
        consumeChance: 25,
        consumeTrigger: 'attack' as const,
        effect: {
          type: 'type-damage-boost' as const,
          pokemonType: family.type,
          damageMultiplier: 1.1,
        },
      },
    },
    {
      id: family.normalId,
      name: family.normalName,
      description: `A held item that increases ${typeName}-type attack damage by 10%. It does not break.`,
      category: 'battle' as const,
      spriteId,
      heldConfig: {
        trigger: { type: 'permanent' as const },
        consumeOnUse: false,
        effect: {
          type: 'type-damage-boost' as const,
          pokemonType: family.type,
          damageMultiplier: 1.1,
        },
      },
    },
    {
      id: `unstable-${family.normalId}`,
      name: `Unstable ${family.normalName}`,
      description: `An unstable held item that increases ${typeName}-type attack damage by 15%. It has a 15% chance to break after an attack.`,
      category: 'battle' as const,
      spriteId,
      heldConfig: {
        trigger: { type: 'permanent' as const },
        consumeOnUse: true,
        consumeChance: 15,
        consumeTrigger: 'attack' as const,
        effect: {
          type: 'type-damage-boost' as const,
          pokemonType: family.type,
          damageMultiplier: 1.15,
        },
      },
    },
  ]

  return tierItems
})

const INFERIOR_ELEMENTAL_STONE_CONFIGS: Array<{
  id: string
  name: string
  type: PokemonTypeName
  spriteId: string
  rewardItemId: string
}> = [
  {
    id: 'inferior-fire-stone',
    name: 'Inferior Fire Stone',
    type: 'fire',
    spriteId: 'fire-stone',
    rewardItemId: 'fire-stone',
  },
  {
    id: 'inferior-water-stone',
    name: 'Inferior Water Stone',
    type: 'water',
    spriteId: 'water-stone',
    rewardItemId: 'water-stone',
  },
  {
    id: 'inferior-leaf-stone',
    name: 'Inferior Leaf Stone',
    type: 'grass',
    spriteId: 'leaf-stone',
    rewardItemId: 'leaf-stone',
  },
  {
    id: 'inferior-thunder-stone',
    name: 'Inferior Thunder Stone',
    type: 'electric',
    spriteId: 'thunder-stone',
    rewardItemId: 'thunder-stone',
  },
  {
    id: 'inferior-shiny-stone',
    name: 'Inferior Shiny Stone',
    type: 'fairy',
    spriteId: 'shiny-stone',
    rewardItemId: 'shiny-stone',
  },
  {
    id: 'inferior-ice-stone',
    name: 'Inferior Ice Stone',
    type: 'ice',
    spriteId: 'ice-stone',
    rewardItemId: 'ice-stone',
  },
]

const inferiorElementalStoneItems: Item[] = INFERIOR_ELEMENTAL_STONE_CONFIGS.map((entry) => ({
  id: entry.id,
  name: entry.name,
  description: `A flawed held stone that gains 5% charge when its holder is hit by a ${typeLabel(entry.type)}-type attack. At full charge it becomes a ${entry.name.replace('Inferior ', '')}.`,
  category: 'battle' as const,
  spriteId: entry.spriteId,
  heldConfig: {
    trigger: { type: 'permanent' as const },
    consumeOnUse: false,
    effect: {
      type: 'item-charge' as const,
      chargeOn: 'hit-by-type' as const,
      attackType: entry.type,
      chargeAmount: 5,
      maxCharge: 100,
      rewardItemId: entry.rewardItemId,
      consumeHeldItem: true,
    },
  },
}))

const inferiorTimeStoneItems: Item[] = [
  {
    id: 'inferior-dark-stone',
    name: 'Inferior Dark Stone',
    description:
      'A flawed held stone that gains 2% charge from damage taken at night. At full charge it becomes a Dusk Stone during 6pm-7pm, or a Moon Stone at other night hours.',
    spriteId: 'moon-stone',
    chargeActiveWindow: { startHour: 18, endHour: 6 },
    rewardItemId: 'moon-stone',
    rewardWindows: [{ startHour: 18, endHour: 19, rewardItemId: 'dusk-stone' }],
  },
  {
    id: 'inferior-light-stone',
    name: 'Inferior Light Stone',
    description:
      'A flawed held stone that gains 2% charge from damage taken during the day. At full charge it becomes a Dawn Stone during 6am-7am, or a Sun Stone at other day hours.',
    spriteId: 'sun-stone',
    chargeActiveWindow: { startHour: 6, endHour: 18 },
    rewardItemId: 'sun-stone',
    rewardWindows: [{ startHour: 6, endHour: 7, rewardItemId: 'dawn-stone' }],
  },
].map((entry) => ({
  id: entry.id,
  name: entry.name,
  description: entry.description,
  category: 'battle' as const,
  spriteId: entry.spriteId,
  heldConfig: {
    trigger: { type: 'permanent' as const },
    consumeOnUse: false,
    effect: {
      type: 'item-charge' as const,
      chargeOn: 'damage-during-time' as const,
      chargeAmount: 2,
      maxCharge: 100,
      rewardItemId: entry.rewardItemId,
      rewardWindows: entry.rewardWindows,
      chargeActiveWindow: entry.chargeActiveWindow,
      consumeHeldItem: true,
    },
  },
}))

export const battleItems: Item[] = [
  {
    id: 'health-band',
    name: 'Health Band',
    description: 'A Training Band that restricts their HP in order to grow stronger.',
    category: 'battle',
    spriteId: 'health-band',
    heldConfig: {
      trigger: { type: 'permanent' },
      consumeOnUse: true,
      consumeChance: 2,
      consumeTrigger: 'battle-win',
      effect: {
        type: 'ev-training',
        trainingStat: 'hp',
        statPenaltyPercent: 15,
        evAmount: 1,
      },
    },
  },
  {
    id: 'attack-band',
    name: 'Attack Band',
    description: 'A Training Band that restricts their Attack in order to grow stronger.',
    category: 'battle',
    spriteId: 'attack-band',
    heldConfig: {
      trigger: { type: 'permanent' },
      consumeOnUse: true,
      consumeChance: 2,
      consumeTrigger: 'battle-win',
      effect: {
        type: 'ev-training',
        trainingStat: 'attack',
        statPenaltyPercent: 15,
        evAmount: 1,
      },
    },
  },
  {
    id: 'defense-band',
    name: 'Defense Band',
    description: 'A Training Band that restricts their Defense in order to grow stronger.',
    category: 'battle',
    spriteId: 'defense-band',
    heldConfig: {
      trigger: { type: 'permanent' },
      consumeOnUse: true,
      consumeChance: 2,
      consumeTrigger: 'battle-win',
      effect: {
        type: 'ev-training',
        trainingStat: 'defense',
        statPenaltyPercent: 15,
        evAmount: 1,
      },
    },
  },
  {
    id: 'sp-attack-band',
    name: 'Sp. Attack Band',
    description: 'A Training Band that restricts their Sp. Atk in order to grow stronger.',
    category: 'battle',
    spriteId: 'sp-attack-band',
    heldConfig: {
      trigger: { type: 'permanent' },
      consumeOnUse: true,
      consumeChance: 2,
      consumeTrigger: 'battle-win',
      effect: {
        type: 'ev-training',
        trainingStat: 'specialAttack',
        statPenaltyPercent: 15,
        evAmount: 1,
      },
    },
  },
  {
    id: 'sp-defense-band',
    name: 'Sp. Defense Band',
    description: 'A Training Band that restricts their Sp. Def in order to grow stronger.',
    category: 'battle',
    spriteId: 'sp-defense-band',
    heldConfig: {
      trigger: { type: 'permanent' },
      consumeOnUse: true,
      consumeChance: 2,
      consumeTrigger: 'battle-win',
      effect: {
        type: 'ev-training',
        trainingStat: 'specialDefense',
        statPenaltyPercent: 15,
        evAmount: 1,
      },
    },
  },
  {
    id: 'speed-band',
    name: 'Speed Band',
    description: 'A Training Band that restricts their Speed in order to grow stronger.',
    category: 'battle',
    spriteId: 'speed-band',
    heldConfig: {
      trigger: { type: 'permanent' },
      consumeOnUse: true,
      consumeChance: 2,
      consumeTrigger: 'battle-win',
      effect: {
        type: 'ev-training',
        trainingStat: 'speed',
        statPenaltyPercent: 15,
        evAmount: 1,
      },
    },
  },
  ...heldTypeBoostItems,
  ...inferiorElementalStoneItems,
  ...inferiorTimeStoneItems,
  ...heldPlateItems,
  ...heldTypeChangeItems,
  // X Items (Stat Buffs)
  {
    id: 'x-attack',
    name: 'X Attack',
    description:
      'Raises the Attack stat of a Pokémon in battle. The effect wears off when the battle ends.',
    category: 'battle',
    spriteId: 'x-attack',
    skillRequirements: { battling: 31 },
    battleEffect: {
      type: 'buff',
      buffStat: 'attack',
      buffStages: 1,
      skipsTurn: true,
    },
    enemyBattleUse: {
      conditions: [{ type: 'turn-start', minTurn: 1 }],
    },
  },
  {
    id: 'x-defense',
    name: 'X Defense',
    description:
      'Raises the Defense stat of a Pokémon in battle. The effect wears off when the battle ends.',
    category: 'battle',
    spriteId: 'x-defense',
    skillRequirements: { battling: 32 },
    battleEffect: {
      type: 'buff',
      buffStat: 'defense',
      buffStages: 1,
      skipsTurn: true,
    },
    enemyBattleUse: {
      conditions: [{ type: 'turn-start', minTurn: 1 }],
    },
  },
  {
    id: 'x-sp-atk',
    name: 'X Sp. Atk',
    description:
      'Raises the Sp. Atk stat of a Pokémon in battle. The effect wears off when the battle ends.',
    category: 'battle',
    spriteId: 'x-sp-atk',
    skillRequirements: { battling: 33 },
    battleEffect: {
      type: 'buff',
      buffStat: 'specialAttack',
      buffStages: 1,
      skipsTurn: true,
    },
    enemyBattleUse: {
      conditions: [{ type: 'turn-start', minTurn: 1 }],
    },
  },
  {
    id: 'x-sp-def',
    name: 'X Sp. Def',
    description:
      'Raises the Sp. Def stat of a Pokémon in battle. The effect wears off when the battle ends.',
    category: 'battle',
    spriteId: 'x-sp-def',
    skillRequirements: { battling: 34 },
    battleEffect: {
      type: 'buff',
      buffStat: 'specialDefense',
      buffStages: 1,
      skipsTurn: true,
    },
    enemyBattleUse: {
      conditions: [{ type: 'turn-start', minTurn: 1 }],
    },
  },
  {
    id: 'x-speed',
    name: 'X Speed',
    description:
      'Raises the Speed stat of a Pokémon in battle. The effect wears off when the battle ends.',
    category: 'battle',
    spriteId: 'x-speed',
    skillRequirements: { battling: 35 },
    battleEffect: {
      type: 'buff',
      buffStat: 'speed',
      buffStages: 1,
      skipsTurn: true,
    },
    enemyBattleUse: {
      conditions: [{ type: 'turn-start', minTurn: 1 }],
    },
  },
  {
    id: 'dire-hit',
    name: 'Dire Hit',
    description:
      'Raises the critical-hit ratio of a Pokémon in battle. The effect wears off when the battle ends.',
    category: 'battle',
    spriteId: 'dire-hit',
    skillRequirements: { battling: 36 },
    battleEffect: {
      type: 'buff',
      buffStat: 'crit',
      buffStages: 1,
      skipsTurn: true,
    },
    enemyBattleUse: {
      conditions: [{ type: 'turn-start', minTurn: 1 }],
    },
  },
  // Battle Observer (utility - doesn't skip turn)
  {
    id: 'battle-observer',
    name: 'Battle Observer',
    description:
      "A tactical device that analyzes the opponent's behavior and predicts their next move stance.",
    category: 'battle',
    spriteId: 'scope-lens',
    skillRequirements: { battling: 1 },
    battleEffect: {
      type: 'reveal-stance',
      skipsTurn: true,
    },
    enemyBattleUse: {
      chance: 0,
    },
  },
  // Tera Shards (one for each type)
  {
    id: 'tera-shard-normal',
    name: 'Normal Tera Shard',
    description: "A crystalline shard that changes a Pokemon's Tera type to Normal.",
    category: 'battle',
    spriteId: 'powers/tera-shard-normal',
    effects: { setTeraType: 'normal' },
  },
  {
    id: 'tera-shard-fire',
    name: 'Fire Tera Shard',
    description: "A crystalline shard that changes a Pokemon's Tera type to Fire.",
    category: 'battle',
    spriteId: 'powers/tera-shard-fire',
    effects: { setTeraType: 'fire' },
  },
  {
    id: 'tera-shard-water',
    name: 'Water Tera Shard',
    description: "A crystalline shard that changes a Pokemon's Tera type to Water.",
    category: 'battle',
    spriteId: 'powers/tera-shard-water',
    effects: { setTeraType: 'water' },
  },
  {
    id: 'tera-shard-electric',
    name: 'Electric Tera Shard',
    description: "A crystalline shard that changes a Pokemon's Tera type to Electric.",
    category: 'battle',
    spriteId: 'powers/tera-shard-electric',
    effects: { setTeraType: 'electric' },
  },
  {
    id: 'tera-shard-grass',
    name: 'Grass Tera Shard',
    description: "A crystalline shard that changes a Pokemon's Tera type to Grass.",
    category: 'battle',
    spriteId: 'powers/tera-shard-grass',
    effects: { setTeraType: 'grass' },
  },
  {
    id: 'tera-shard-ice',
    name: 'Ice Tera Shard',
    description: "A crystalline shard that changes a Pokemon's Tera type to Ice.",
    category: 'battle',
    spriteId: 'powers/tera-shard-ice',
    effects: { setTeraType: 'ice' },
  },
  {
    id: 'tera-shard-fighting',
    name: 'Fighting Tera Shard',
    description: "A crystalline shard that changes a Pokemon's Tera type to Fighting.",
    category: 'battle',
    spriteId: 'powers/tera-shard-fighting',
    effects: { setTeraType: 'fighting' },
  },
  {
    id: 'tera-shard-poison',
    name: 'Poison Tera Shard',
    description: "A crystalline shard that changes a Pokemon's Tera type to Poison.",
    category: 'battle',
    spriteId: 'powers/tera-shard-poison',
    effects: { setTeraType: 'poison' },
  },
  {
    id: 'tera-shard-ground',
    name: 'Ground Tera Shard',
    description: "A crystalline shard that changes a Pokemon's Tera type to Ground.",
    category: 'battle',
    spriteId: 'powers/tera-shard-ground',
    effects: { setTeraType: 'ground' },
  },
  {
    id: 'tera-shard-flying',
    name: 'Flying Tera Shard',
    description: "A crystalline shard that changes a Pokemon's Tera type to Flying.",
    category: 'battle',
    spriteId: 'powers/tera-shard-flying',
    effects: { setTeraType: 'flying' },
  },
  {
    id: 'tera-shard-psychic',
    name: 'Psychic Tera Shard',
    description: "A crystalline shard that changes a Pokemon's Tera type to Psychic.",
    category: 'battle',
    spriteId: 'powers/tera-shard-psychic',
    effects: { setTeraType: 'psychic' },
  },
  {
    id: 'tera-shard-bug',
    name: 'Bug Tera Shard',
    description: "A crystalline shard that changes a Pokemon's Tera type to Bug.",
    category: 'battle',
    spriteId: 'powers/tera-shard-bug',
    effects: { setTeraType: 'bug' },
  },
  {
    id: 'tera-shard-rock',
    name: 'Rock Tera Shard',
    description: "A crystalline shard that changes a Pokemon's Tera type to Rock.",
    category: 'battle',
    spriteId: 'powers/tera-shard-rock',
    effects: { setTeraType: 'rock' },
  },
  {
    id: 'tera-shard-ghost',
    name: 'Ghost Tera Shard',
    description: "A crystalline shard that changes a Pokemon's Tera type to Ghost.",
    category: 'battle',
    spriteId: 'powers/tera-shard-ghost',
    effects: { setTeraType: 'ghost' },
  },
  {
    id: 'tera-shard-dragon',
    name: 'Dragon Tera Shard',
    description: "A crystalline shard that changes a Pokemon's Tera type to Dragon.",
    category: 'battle',
    spriteId: 'powers/tera-shard-dragon',
    effects: { setTeraType: 'dragon' },
  },
  {
    id: 'tera-shard-dark',
    name: 'Dark Tera Shard',
    description: "A crystalline shard that changes a Pokemon's Tera type to Dark.",
    category: 'battle',
    spriteId: 'powers/tera-shard-dark',
    effects: { setTeraType: 'dark' },
  },
  {
    id: 'tera-shard-steel',
    name: 'Steel Tera Shard',
    description: "A crystalline shard that changes a Pokemon's Tera type to Steel.",
    category: 'battle',
    spriteId: 'powers/tera-shard-steel',
    effects: { setTeraType: 'steel' },
  },
  {
    id: 'tera-shard-fairy',
    name: 'Fairy Tera Shard',
    description: "A crystalline shard that changes a Pokemon's Tera type to Fairy.",
    category: 'battle',
    spriteId: 'powers/tera-shard-fairy',
    effects: { setTeraType: 'fairy' },
  },
]
