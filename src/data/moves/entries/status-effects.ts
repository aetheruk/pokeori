import { StatusEffectConfig, StatusEffectId } from '../types'

export const STATUS_EFFECTS: Record<string, StatusEffectConfig> = {
  paralysis: {
    id: 'paralysis',
    name: 'Paralysis',
    description:
      'The Pokemon is paralyzed! It may be unable to move and its Speed moves deal half damage.',
    cantMoveChance: 0.25,
    color: 'bg-yellow-400',
    immuneTypes: ['electric'],
    statMultiplier: { stat: 'speed', multiplier: 0.5 },
  },
  sleep: {
    id: 'sleep',
    name: 'Sleep',
    description: 'The Pokemon is fast asleep! It cannot move.',
    cantMoveChance: 1.0,
    color: 'bg-slate-400',
  },
  poison: {
    id: 'poison',
    name: 'Poison',
    description: 'The Pokemon is poisoned! It loses 1/8th of its max HP each turn.',
    damagePerTurn: 1 / 8,
    color: 'bg-purple-500',
    immuneTypes: ['poison', 'steel'],
  },
  'bad-poison': {
    id: 'bad-poison',
    name: 'Bad Poison',
    description:
      'The Pokemon is badly poisoned! It loses 1/16th of its max HP each turn (increasing).',
    damagePerTurn: 1 / 16,
    color: 'bg-purple-700',
    immuneTypes: ['poison', 'steel'],
  },
  burn: {
    id: 'burn',
    name: 'Burn',
    description:
      'The Pokemon is burned! It loses 1/16th of its max HP each turn and its Attack is halved.',
    damagePerTurn: 1 / 16,
    color: 'bg-red-500',
    immuneTypes: ['fire'],
    statMultiplier: { stat: 'attack', multiplier: 0.5 },
  },
  freeze: {
    id: 'freeze',
    name: 'Freeze',
    description: 'The Pokemon is frozen solid! It cannot move.',
    cantMoveChance: 1.0,
    color: 'bg-cyan-400',
    immuneTypes: ['ice'],
  },
  frostbite: {
    id: 'frostbite',
    name: 'Frostbite',
    description:
      'The Pokemon has frostbite! It loses 1/16th of its max HP each turn and its Special Attack is halved.',
    damagePerTurn: 1 / 16,
    color: 'bg-blue-300',
    immuneTypes: ['ice'],
    statMultiplier: { stat: 'specialAttack', multiplier: 0.5 },
  },
  confusion: {
    id: 'confusion',
    name: 'Confusion',
    description: 'The Pokemon is confused! It may hurt itself in its confusion.',
    cantMoveChance: 0.33,
    color: 'bg-pink-400',
  },
  veil: {
    id: 'veil',
    name: 'Veil',
    description:
      'The Pokemon is protected by a mysterious veil. It cannot be affected by status conditions.',
    color: 'bg-pink-300',
  },
  regen: {
    id: 'regen',
    name: 'Regeneration',
    description: 'The Pokemon restores 1/8th of its max HP each turn.',
    healingPerTurn: 1 / 8,
    color: 'bg-green-400',
  },
  'mystic-veil': {
    id: 'mystic-veil',
    name: 'Mystic Veil',
    description:
      'The Pokemon is protected by a mystic power. It heals 1/16th of its max HP each turn and prevents status conditions.',
    healingPerTurn: 1 / 16,
    color: 'bg-indigo-300',
  },
  // --- Shields ---
  shield: {
    id: 'shield',
    name: 'Shield',
    description: 'Protects the Pokemon from damage. Breaks after absorbing an attack.',
    color: 'bg-slate-400',
  },
  'shield-plus': {
    id: 'shield-plus',
    name: 'Shield+',
    description:
      'Protects the Pokemon from damage. Downgrades to Shield after absorbing an attack.',
    color: 'bg-slate-500',
  },
  'shield-ex': {
    id: 'shield-ex',
    name: 'Shield EX',
    description:
      'Protects the Pokemon from damage. Downgrades to Shield+ after absorbing an attack.',
    color: 'bg-slate-600',
  },
  // --- T-Shields ---
  't-shield': {
    id: 't-shield',
    name: 'T-Shield',
    description: 'Protects from damage. Breaks only if hit by a Super Effective attack.',
    color: 'bg-amber-300',
  },
  't-shield-plus': {
    id: 't-shield-plus',
    name: 'T-Shield+',
    description:
      'Protects from damage. Downgrades to T-Shield only if hit by a Super Effective attack.',
    color: 'bg-amber-400',
  },
  't-shield-ex': {
    id: 't-shield-ex',
    name: 'T-Shield EX',
    description:
      'Protects from damage. Downgrades to T-Shield+ only if hit by a Super Effective attack.',
    color: 'bg-amber-500',
  },
  // --- S-Shields ---
  's-shield': {
    id: 's-shield',
    name: 'S-Shield',
    description: 'Protects from damage. Breaks only if the attacker wins the Stance matchup.',
    color: 'bg-sky-400',
  },
  's-shield-plus': {
    id: 's-shield-plus',
    name: 'S-Shield+',
    description:
      'Protects from damage. Downgrades to S-Shield only if the attacker wins the Stance matchup.',
    color: 'bg-sky-500',
  },
  's-shield-ex': {
    id: 's-shield-ex',
    name: 'S-Shield EX',
    description:
      'Protects from damage. Downgrades to S-Shield+ only if the attacker wins the Stance matchup.',
    color: 'bg-sky-600',
  },
  victory: {
    id: 'victory',
    name: 'Victory',
    description: 'Guarantees a critical hit. Removed after attacking.',
    color: 'bg-yellow-500',
  },
  vanished: {
    id: 'vanished',
    name: 'Vanished',
    description:
      'The Pokemon vanished: it cannot be hit, but usage of items or switching will cancel the effect.',
    color: 'slate-500',
  },
}
