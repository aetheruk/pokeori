import { Item } from '../types'

export const berryItems: Item[] = [
  // Healing Berries
  {
    id: 'oran-berry',
    name: 'Oran Berry',
    description:
      'A Berry to be consumed by Pokémon. If a Pokémon holds one, it can heal its own HP by 10 points during battle.',
    category: 'berry',
    spriteId: 'berries/oran',
    berryPower: 10,
    battleEffect: {
      type: 'heal',
      healAmount: 10,
    },
    enemyBattleUse: {
      conditions: [{ type: 'hp-at-or-below', target: 'self', thresholdPercent: 50 }],
    },
    heldConfig: {
      trigger: { type: 'hp-at-or-below', thresholdPercent: 25 },
      consumeOnUse: true,
      effect: {
        type: 'heal',
        healAmount: 10,
      },
    },
  },
  {
    id: 'sitrus-berry',
    name: 'Sitrus Berry',
    description:
      'A Berry to be consumed by Pokémon. If a Pokémon holds one, it can heal its own HP by a small amount during battle.',
    category: 'berry',
    spriteId: 'berries/sitrus',
    berryPower: 30,
    battleEffect: {
      type: 'heal',
      healAmount: 30,
    },
    enemyBattleUse: {
      conditions: [{ type: 'hp-at-or-below', target: 'self', thresholdPercent: 50 }],
    },
    heldConfig: {
      trigger: { type: 'hp-at-or-below', thresholdPercent: 25 },
      consumeOnUse: true,
      effect: {
        type: 'heal',
        healAmount: 30,
      },
    },
  },

  // Status Berries
  {
    id: 'cheri-berry',
    name: 'Cheri Berry',
    description:
      'A Berry to be consumed by Pokémon. If a Pokémon holds one, it can recover from paralysis on its own in battle.',
    category: 'berry',
    spriteId: 'berries/cheri',
    berryPower: 10,
    battleEffect: {
      type: 'heal',
      clearStatus: 'paralysis',
    },
    enemyBattleUse: {
      conditions: [{ type: 'status', target: 'self', status: 'paralysis' }],
    },
    heldConfig: {
      trigger: { type: 'status', status: 'paralysis' },
      consumeOnUse: true,
      effect: {
        type: 'heal',
        clearStatus: 'paralysis',
      },
    },
  },
  {
    id: 'chesto-berry',
    name: 'Chesto Berry',
    description:
      'A Berry to be consumed by Pokémon. If a Pokémon holds one, it can recover from sleep on its own in battle.',
    category: 'berry',
    spriteId: 'berries/chesto',
    berryPower: 10,
    battleEffect: {
      type: 'heal',
      clearStatus: 'sleep',
    },
    enemyBattleUse: {
      conditions: [{ type: 'status', target: 'self', status: 'sleep' }],
    },
    heldConfig: {
      trigger: { type: 'status', status: 'sleep' },
      consumeOnUse: true,
      effect: {
        type: 'heal',
        clearStatus: 'sleep',
      },
    },
  },
  {
    id: 'pecha-berry',
    name: 'Pecha Berry',
    description:
      'A Berry to be consumed by Pokémon. If a Pokémon holds one, it can recover from poisoning on its own in battle.',
    category: 'berry',
    spriteId: 'berries/pecha',
    berryPower: 10,
    battleEffect: {
      type: 'heal',
      clearStatus: ['poison', 'bad-poison'],
    },
    enemyBattleUse: {
      conditions: [{ type: 'status', target: 'self', status: ['poison', 'bad-poison'] }],
    },
    heldConfig: {
      trigger: { type: 'status', status: ['poison', 'bad-poison'] },
      consumeOnUse: true,
      effect: {
        type: 'heal',
        clearStatus: ['poison', 'bad-poison'],
      },
    },
  },
  {
    id: 'rawst-berry',
    name: 'Rawst Berry',
    description:
      'A Berry to be consumed by Pokémon. If a Pokémon holds one, it can recover from a burn on its own in battle.',
    category: 'berry',
    spriteId: 'berries/rawst',
    berryPower: 10,
    battleEffect: {
      type: 'heal',
      clearStatus: 'burn',
    },
    enemyBattleUse: {
      conditions: [{ type: 'status', target: 'self', status: 'burn' }],
    },
    heldConfig: {
      trigger: { type: 'status', status: 'burn' },
      consumeOnUse: true,
      effect: {
        type: 'heal',
        clearStatus: 'burn',
      },
    },
  },
  {
    id: 'aspear-berry',
    name: 'Aspear Berry',
    description:
      'A Berry to be consumed by Pokémon. If a Pokémon holds one, it can recover from being frozen on its own in battle.',
    category: 'berry',
    spriteId: 'berries/aspear',
    berryPower: 10,
    battleEffect: {
      type: 'heal',
      clearStatus: ['freeze', 'frostbite'],
    },
    enemyBattleUse: {
      conditions: [{ type: 'status', target: 'self', status: ['freeze', 'frostbite'] }],
    },
    heldConfig: {
      trigger: { type: 'status', status: ['freeze', 'frostbite'] },
      consumeOnUse: true,
      effect: {
        type: 'heal',
        clearStatus: ['freeze', 'frostbite'],
      },
    },
  },
  {
    id: 'leppa-berry',
    name: 'Leppa Berry',
    description: 'A Berry to be consumed by Pokémon. It can restore 10 PP to a depleted move.',
    category: 'berry',
    spriteId: 'berries/leppa',
    berryPower: 10,
  },
  {
    id: 'persim-berry',
    name: 'Persim Berry',
    description:
      'A Berry to be consumed by Pokémon. If a Pokémon holds one, it can recover from confusion on its own in battle.',
    category: 'berry',
    spriteId: 'berries/persim',
    berryPower: 10,
    battleEffect: {
      type: 'heal',
      clearStatus: 'confusion',
    },
    enemyBattleUse: {
      conditions: [{ type: 'status', target: 'self', status: 'confusion' }],
    },
    heldConfig: {
      trigger: { type: 'status', status: 'confusion' },
      consumeOnUse: true,
      effect: {
        type: 'heal',
        clearStatus: 'confusion',
      },
    },
  },
  {
    id: 'lum-berry',
    name: 'Lum Berry',
    description:
      'A Berry to be consumed by Pokémon. If a Pokémon holds one, it can recover from any status condition in battle.',
    category: 'berry',
    spriteId: 'berries/lum',
    berryPower: 30,
    battleEffect: {
      type: 'heal',
      clearStatus: 'all',
    },
    enemyBattleUse: {
      conditions: [{ type: 'status', target: 'self', status: 'all' }],
    },
    heldConfig: {
      trigger: { type: 'status', status: 'all' },
      consumeOnUse: true,
      effect: {
        type: 'heal',
        clearStatus: 'all',
      },
    },
  },

  // EV Reducing Berries
  {
    id: 'pomeg-berry',
    name: 'Pomeg Berry',
    description: 'A Berry used as a crafting material. It has a sour, dry flavor.',
    category: 'berry',
    spriteId: 'berries/pomeg',
    berryPower: 10,
  },
  {
    id: 'kelpsy-berry',
    name: 'Kelpsy Berry',
    description: 'A Berry used as a crafting material. It has a dry, bitter flavor.',
    category: 'berry',
    spriteId: 'berries/kelpsy',
    berryPower: 10,
  },
  {
    id: 'qualot-berry',
    name: 'Qualot Berry',
    description: 'A Berry used as a crafting material. It has a bitter, sour flavor.',
    category: 'berry',
    spriteId: 'berries/qualot',
    berryPower: 10,
  },
  {
    id: 'hondew-berry',
    name: 'Hondew Berry',
    description: 'A Berry used as a crafting material. It has a bitter, dry flavor.',
    category: 'berry',
    spriteId: 'berries/hondew',
    berryPower: 10,
  },
  {
    id: 'grepa-berry',
    name: 'Grepa Berry',
    description: 'A Berry used as a crafting material. It has a sour, sweet flavor.',
    category: 'berry',
    spriteId: 'berries/grepa',
    berryPower: 10,
  },
  {
    id: 'tamato-berry',
    name: 'Tamato Berry',
    description: 'A Berry used as a crafting material. It has a spicy, dry flavor.',
    category: 'berry',
    spriteId: 'berries/tamato',
    berryPower: 10,
  },

  // Other Berries
  {
    id: 'razz-berry',
    name: 'Razz Berry',
    description: 'A Berry used for berry powder.',
    category: 'berry',
    spriteId: 'berries/razz',
    berryPower: 20,
  },
  {
    id: 'bluk-berry',
    name: 'Bluk Berry',
    description: 'A Berry used for berry powder.',
    category: 'berry',
    spriteId: 'berries/bluk',
    berryPower: 20,
  },
  {
    id: 'nanab-berry',
    name: 'Nanab Berry',
    description: 'A Berry used for berry powder.',
    category: 'berry',
    spriteId: 'berries/nanab',
    berryPower: 20,
  },
  {
    id: 'wepear-berry',
    name: 'Wepear Berry',
    description: 'A Berry used for berry powder.',
    category: 'berry',
    spriteId: 'berries/wepear',
    berryPower: 20,
  },
  {
    id: 'pinap-berry',
    name: 'Pinap Berry',
    description: 'A Berry used for berry powder.',
    category: 'berry',
    spriteId: 'berries/pinap',
    berryPower: 20,
  },
  {
    id: 'spelon-berry',
    name: 'Spelon Berry',
    description: 'A Berry used for berry powder.',
    category: 'berry',
    spriteId: 'berries/spelon',
    berryPower: 20,
  },
  {
    id: 'enigma-berry',
    name: 'Enigma Berry',
    description: 'A pale Berry used for berry powder.',
    category: 'berry',
    spriteId: 'berries/enigma',
    berryPower: 20,
  },
  {
    id: 'pamtre-berry',
    name: 'Pamtre Berry',
    description: 'A dark Berry used for berry powder.',
    category: 'berry',
    spriteId: 'berries/pamtre',
    berryPower: 20,
  },
]
