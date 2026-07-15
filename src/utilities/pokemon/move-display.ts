import { items } from '@/data/items'
import type { MoveConfig, MoveForcedType } from '@/data/moves/types'
import { BASE_BATTLE_POWER } from '@/utilities/battle/constants'

export interface MoveInfoTag {
  label: string
  value: string
}

export function getMoveTmItem(moveId: string) {
  return items.find((item) => item.moveId === moveId)
}

export function getMoveDisplayType(move: Pick<MoveConfig, 'forcedType'>): MoveForcedType {
  return move.forcedType || 'normal'
}

export function getMoveTypeSpriteItemId(move: Pick<MoveConfig, 'forcedType'>): string {
  const type = getMoveDisplayType(move)
  return type === 'random' ? 'tm-normal' : `tm-${type}`
}

export function getMoveLevel(move: Pick<MoveConfig, 'level'>): number {
  return move.level || 1
}

function formatPercent(value: number): string {
  return `${Math.round(value)}%`
}

function normalizeBuffChance(chance?: number): number {
  if (chance === undefined) return 100
  return Math.max(0, Math.min(100, chance))
}

function formatBuffTarget(target: 'self' | 'enemy' | undefined): string {
  return target === 'self' ? 'Self' : 'Target'
}

function formatBuffChange(stat: string, stages: number): string {
  const sign = stages >= 0 ? '+' : ''
  return `${stat} ${sign}${stages}`
}

function formatDamage(move: MoveConfig): string {
  if (move.healFull) return 'Full Heal'
  if (move.heal) return '50% Heal'
  if (move.damage <= 0) return 'No Damage'

  if (move.damageRange) {
    const minDamage = Math.min(move.damageRange.min, move.damageRange.max)
    const maxDamage = Math.max(move.damageRange.min, move.damageRange.max)
    return `${minDamage}x-${maxDamage}x (${Math.round(BASE_BATTLE_POWER * minDamage)}-${Math.round(BASE_BATTLE_POWER * maxDamage)} BP)`
  }

  const damageValues = [
    move.damage,
    ...Object.values(move.damageByDefenderType || {}),
  ]
  if (move.weatherDamageMultiplier) {
    damageValues.push(
      ...damageValues.map((damage) => damage * move.weatherDamageMultiplier!.multiplier),
    )
  }
  const minDamage = Math.min(...damageValues)
  const maxDamage = Math.max(...damageValues)
  const multiplier =
    minDamage === maxDamage
      ? `${move.damage}x`
      : `${minDamage}x-${maxDamage}x`
  const basePower =
    minDamage === maxDamage
      ? `${Math.round(BASE_BATTLE_POWER * move.damage)} BP`
      : `${Math.round(BASE_BATTLE_POWER * minDamage)}-${Math.round(BASE_BATTLE_POWER * maxDamage)} BP`

  return `${multiplier} (${basePower})`
}

function formatStatus(status: NonNullable<MoveConfig['status']>): string {
  const target = formatBuffTarget(status.target ?? 'enemy')
  return `${target} ${status.id.replace(/-/g, ' ')} ${formatPercent(
    normalizeBuffChance(status.chance ?? 100),
  )}`
}

export function getMoveInfoTags(move: MoveConfig): MoveInfoTag[] {
  const tags: MoveInfoTag[] = [
    { label: 'Level', value: String(getMoveLevel(move)) },
    { label: 'Stance', value: move.stance === 'random' ? 'Random' : move.stance },
    { label: 'Type', value: getMoveDisplayType(move) },
    { label: 'Accuracy', value: formatPercent(move.accuracy) },
    { label: 'Damage', value: formatDamage(move) },
  ]

  if (move.critChance) {
    tags.push({ label: 'Crit', value: formatPercent(move.critChance) })
  }

  if (move.absorb) {
    tags.push({ label: 'Absorb', value: `${formatPercent(move.absorb)} of damage dealt` })
  }

  if (move.status) {
    tags.push({ label: 'Status', value: formatStatus(move.status) })
  }

  if (move.repeatDamage) {
    tags.push({
      label: 'Repeat Damage',
      value: `+${formatPercent(move.repeatDamage.perUsePercent)} per use${
        move.repeatDamage.maxUses ? `, max ${move.repeatDamage.maxUses}` : ''
      }`,
    })
  }

  if (move.continuousEnd?.status) {
    tags.push({
      label: 'End Status',
      value: formatStatus(move.continuousEnd.status),
    })
  }

  for (const status of move.additionalStatuses || []) {
    tags.push({
      label: status.target === 'self' ? 'Self Status' : 'Target Status',
      value: `${status.id.replace(/-/g, ' ')} ${formatPercent(status.chance ?? 100)}`,
    })
  }

  if (move.randomStatuses?.options?.length) {
    const grouped = move.randomStatuses.options.reduce(
      (acc, option) => {
        const key = option.id
        acc[key] = acc[key] ?? 0
        acc[key] += option.chance ?? 1
        return acc
      },
      {} as Record<string, number>,
    )

    const summary = Object.entries(grouped)
      .map(([status, chance]) => `${status.replace(/-/g, ' ')} (${chance})`)
      .join(', ')
    const chance = formatPercent(move.randomStatuses.chance)
    const hasRandomTarget = move.randomStatuses.options.some(
      (status) => status.target === 'random',
    )
    const hasSelfTarget = move.randomStatuses.options.some(
      (status) => status.target === 'self',
    )
    const target = hasRandomTarget ? 'self or opponent' : hasSelfTarget ? 'self' : 'opponent'

    tags.push({
      label: 'Random Status',
      value: `${chance} — ${summary}; target: ${target}`,
    })
  }

  if (move.secondaryStatuses?.length) {
    tags.push({
      label: 'Secondary',
      value: `${move.secondaryStatuses.length} effect${move.secondaryStatuses.length === 1 ? '' : 's'}`,
    })
  }

  for (const buff of move.buffs || []) {
    const chance = normalizeBuffChance(buff.chance)
    const target = formatBuffTarget(buff.target ?? 'self')
    const amount = formatBuffChange(buff.stat, buff.stages)
    tags.push({
      label: 'Buff',
      value: `${target} ${amount} (${chance}%)`,
    })
  }

  for (const debuff of move.debuffs || []) {
    const chance = normalizeBuffChance(debuff.chance)
    const target = formatBuffTarget(debuff.target ?? 'enemy')
    const amount = formatBuffChange(debuff.stat, debuff.stages)
    tags.push({
      label: 'Debuff',
      value: `${target} ${amount} (${chance}%)`,
    })
  }

  if (move.disableStance) {
    tags.push({
      label: 'Disable',
      value: `${move.disableStance.stance} ${move.disableStance.turns}t`,
    })
  }

  if (move.heldItemEffect) {
    const heldItemEffectLabels = {
      bestow: 'Gives user item to target',
      'remove-target': 'Removes target item',
      'steal-target': 'Steals target item',
      swap: 'Swaps held items',
      recycle: 'Restores consumed item',
      'consume-self': 'Consumes user held item',
      'consume-berries': 'Consumes held berries',
    } as const
    tags.push({
      label: 'Held Item',
      value: heldItemEffectLabels[move.heldItemEffect.type],
    })
  }

  const interruptEnemyMoveChance =
    typeof move.interruptEnemyMove === 'boolean'
      ? (move.interruptEnemyMove ? 100 : 0)
      : move.interruptEnemyMove || 0

  if (interruptEnemyMoveChance > 0) {
    tags.push({
      label: 'Timing',
      value: `Interrupts enemy moves (${interruptEnemyMoveChance}%)`,
    })
  }

  if (move.ignoreTypeEffectiveness) {
    tags.push({ label: 'Rules', value: 'Bypasses typing' })
  }

  return tags
}
