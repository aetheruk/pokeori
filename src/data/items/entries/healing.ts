import { Item } from '../types'

export const healingItems: Item[] = [
  {
    id: 'battle-potion',
    name: 'Potion',
    description: 'A spray-type medicine for treating wounds. It restores 20 HP to a Pokémon.',
    category: 'potion',
    spriteId: 'potion',
    skillRequirements: { battling: 3 },
    battleEffect: {
      type: 'heal',
      healAmount: 20,
      skipsTurn: true,
    },
    enemyBattleUse: {
      conditions: [{ type: 'hp-at-or-below', target: 'self', thresholdPercent: 30 }],
    },
  },
  {
    id: 'battle-super-potion',
    name: 'Super Potion',
    description: 'A spray-type medicine for treating wounds. It restores 50 HP to a Pokémon.',
    category: 'potion',
    spriteId: 'super-potion',
    skillRequirements: { battling: 27 },
    battleEffect: {
      type: 'heal',
      healAmount: 50,
      skipsTurn: true,
    },
    enemyBattleUse: {
      conditions: [{ type: 'hp-at-or-below', target: 'self', thresholdPercent: 30 }],
    },
  },
  {
    id: 'battle-hyper-potion',
    name: 'Hyper Potion',
    description: 'A spray-type medicine for treating wounds. It restores 200 HP to a Pokémon.',
    category: 'potion',
    spriteId: 'hyper-potion',
    skillRequirements: { battling: 51 },
    battleEffect: {
      type: 'heal',
      healAmount: 200,
      skipsTurn: true,
    },
    enemyBattleUse: {
      conditions: [{ type: 'hp-at-or-below', target: 'self', thresholdPercent: 30 }],
    },
  },
  {
    id: 'battle-max-potion',
    name: 'Max Potion',
    description:
      'A spray-type medicine for treating wounds. It fully restores the HP of a Pokémon.',
    category: 'potion',
    spriteId: 'max-potion',
    skillRequirements: { battling: 60 },
    battleEffect: {
      type: 'heal',
      healFull: true,
      skipsTurn: true,
    },
    enemyBattleUse: {
      conditions: [{ type: 'hp-at-or-below', target: 'self', thresholdPercent: 30 }],
    },
  },
  {
    id: 'battle-full-restore',
    name: 'Full Restore',
    description:
      'A medicine that fully restores the HP of a Pokémon and cures any status condition.',
    category: 'potion',
    spriteId: 'full-restore',
    skillRequirements: { battling: 81 },
    battleEffect: {
      type: 'heal',
      healFull: true,
      clearStatus: 'all',
      skipsTurn: true,
    },
    enemyBattleUse: {
      mode: 'any',
      conditions: [
        { type: 'hp-at-or-below', target: 'self', thresholdPercent: 30 },
        { type: 'status', target: 'self', status: 'all' },
      ],
    },
  },
  {
    id: 'fresh-water',
    name: 'Fresh Water',
    description: 'Water with a high mineral content. It restores 30 HP to a Pokémon.',
    category: 'potion',
    skillRequirements: { battling: 4 },
    battleEffect: {
      type: 'heal',
      healAmount: 30,
      skipsTurn: true,
    },
    enemyBattleUse: {
      conditions: [{ type: 'hp-at-or-below', target: 'self', thresholdPercent: 30 }],
    },
  },
  {
    id: 'soda-pop',
    name: 'Soda Pop',
    description: 'A highly carbonated drink. It restores 60 HP to a Pokémon.',
    category: 'potion',
    skillRequirements: { battling: 29 },
    battleEffect: {
      type: 'heal',
      healAmount: 60,
      skipsTurn: true,
    },
    enemyBattleUse: {
      conditions: [{ type: 'hp-at-or-below', target: 'self', thresholdPercent: 30 }],
    },
  },
  {
    id: 'lemonade',
    name: 'Lemonade',
    description: 'A very sweet and refreshing drink. It restores 70 HP to a Pokémon.',
    category: 'potion',
    skillRequirements: { battling: 34 },
    battleEffect: {
      type: 'heal',
      healAmount: 70,
      skipsTurn: true,
    },
    enemyBattleUse: {
      conditions: [{ type: 'hp-at-or-below', target: 'self', thresholdPercent: 30 }],
    },
  },
  {
    id: 'antidote',
    name: 'Antidote',
    description:
      'A spray-type medicine for treating poisoning. It can be used to lift the effects of being poisoned.',
    category: 'potion',
    spriteId: 'antidote',
    skillRequirements: { battling: 5 },
    battleEffect: {
      type: 'heal',
      clearStatus: 'poison',
      skipsTurn: true,
    },
    enemyBattleUse: {
      conditions: [{ type: 'status', target: 'self', status: 'poison' }],
    },
  },

  {
    id: 'paralyze-heal',
    name: 'Paralyze Heal',
    description: 'A spray-type medicine. It can be used to lift the effects of paralysis.',
    category: 'potion',
    spriteId: 'paralyze-heal',
    skillRequirements: { battling: 6 },
    battleEffect: {
      type: 'heal',
      clearStatus: 'paralysis',
      skipsTurn: true,
    },
    enemyBattleUse: {
      conditions: [{ type: 'status', target: 'self', status: 'paralysis' }],
    },
  },
  {
    id: 'awakening',
    name: 'Awakening',
    description: 'A spray-type medicine. It can be used to wake up a sleeping Pokémon.',
    category: 'potion',
    spriteId: 'awakening',
    skillRequirements: { battling: 7 },
    battleEffect: {
      type: 'heal',
      clearStatus: 'sleep',
      skipsTurn: true,
    },
    enemyBattleUse: {
      conditions: [{ type: 'status', target: 'self', status: 'sleep' }],
    },
  },
  {
    id: 'burn-heal',
    name: 'Burn Heal',
    description: 'A spray-type medicine. It can be used to heal a Pokémon suffering from a burn.',
    category: 'potion',
    spriteId: 'burn-heal',
    skillRequirements: { battling: 8 },
    battleEffect: {
      type: 'heal',
      clearStatus: 'burn',
      skipsTurn: true,
    },
    enemyBattleUse: {
      conditions: [{ type: 'status', target: 'self', status: 'burn' }],
    },
  },
  {
    id: 'ice-heal',
    name: 'Ice Heal',
    description: 'A spray-type medicine. It can be used to defrost a frozen Pokémon.',
    category: 'potion',
    spriteId: 'ice-heal',
    skillRequirements: { battling: 9 },
    battleEffect: {
      type: 'heal',
      clearStatus: ['freeze', 'frostbite'],
      skipsTurn: true,
    },
    enemyBattleUse: {
      conditions: [{ type: 'status', target: 'self', status: ['freeze', 'frostbite'] }],
    },
  },
  {
    id: 'full-heal',
    name: 'Full Heal',
    description: 'A spray-type medicine. It can be used to heal any status condition.',
    category: 'potion',
    spriteId: 'full-heal',
    skillRequirements: { battling: 37 },
    battleEffect: {
      type: 'heal',
      clearStatus: ['paralysis', 'sleep', 'burn', 'freeze', 'frostbite', 'poison', 'bad-poison'],
      skipsTurn: true,
    },
    enemyBattleUse: {
      conditions: [{ type: 'status', target: 'self', status: 'all' }],
    },
  },
]
