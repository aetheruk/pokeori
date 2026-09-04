import { items } from '@/data/items'
import type { PokemonTypeName } from '@/data/items/types'
import type {
  BuffConfig,
  MoveBattleCondition,
  MoveConditionalDamageModifier,
  MoveConfig,
  MoveDamageRule,
  MoveForcedType,
  MoveSecondaryStatusConfig,
  MoveSecondaryStatusCure,
  MoveStatStageEffect,
  MoveTypeChangeEffect,
  StatusEffectId,
} from '@/data/moves/types'
import { BASE_BATTLE_POWER } from '@/utilities/battle/constants'

export interface MoveInfoTag {
  label: string
  value: string
}

export type MovePresentationSource = 'tm' | 'hm' | 'sketch' | 'level' | 'other'

export interface MovePresentationContext {
  /** The type after battle-only rules such as weather, plates, or Terastallization. */
  resolvedType?: PokemonTypeName
  /** An already resolved combat value. The caller owns the label because battle modes differ. */
  offensiveValue?: { label: string; value: string | number }
  effectiveness?:
    | 'immune'
    | 'not-very-effective'
    | 'effective'
    | 'super-effective'
  availability?: { available: boolean; reason?: string }
  source?: { kind: MovePresentationSource; label?: string }
}

export type MovePresentationDetailKind =
  | 'effect'
  | 'condition'
  | 'timing'
  | 'risk'
  | 'rule'
  | 'reward'

export type MovePresentationRecipient =
  | 'user'
  | 'foe'
  | 'party'
  | 'side'
  | 'field'
  | 'both'

export interface MovePresentationDetail {
  id: string
  kind: MovePresentationDetailKind
  label: string
  value: string
  recipient?: MovePresentationRecipient
  chance?: number
}

export interface MovePresentationMetric {
  label: string
  value: string
  helpText?: string
}

export interface MovePresentation {
  identity: {
    id: string
    name: string
    type: MoveForcedType
    authoredType: MoveForcedType
    stance: MoveConfig['stance']
    target: MoveConfig['target']
    source?: MovePresentationContext['source']
  }
  essentials: {
    power: MovePresentationMetric
    accuracy: MovePresentationMetric
    target: MovePresentationMetric
    offensiveValue?: MovePresentationMetric
  }
  summary: string
  effects: MovePresentationDetail[]
  conditions: MovePresentationDetail[]
  timing: MovePresentationDetail[]
  risks: MovePresentationDetail[]
  rules: MovePresentationDetail[]
  battle?: {
    resolvedType?: PokemonTypeName
    effectiveness?: NonNullable<MovePresentationContext['effectiveness']>
    availability?: NonNullable<MovePresentationContext['availability']>
  }
}

const STAT_LABELS: Record<BuffConfig['stat'], string> = {
  attack: 'Attack',
  defense: 'Defense',
  specialAttack: 'Special Attack',
  specialDefense: 'Special Defense',
  speed: 'Speed',
  crit: 'critical-hit rate',
  accuracy: 'accuracy',
  evasion: 'evasion',
}

function words(value: string): string {
  return value
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function formatPercent(value: number): string {
  return `${Math.round(value)}%`
}

function normalizeChance(chance?: number): number {
  return Math.max(0, Math.min(100, chance ?? 100))
}

function turnCount(turns: number): string {
  return `${turns} turn${turns === 1 ? '' : 's'}`
}

function hitCount(min: number, max: number): string {
  return min === max ? `${min} times` : `${min}–${max} times`
}

function targetLabel(target: MoveConfig['target'] | 'ally-party'): string {
  if (target === 'self') return 'User'
  if (target === 'ally-party') return 'Your party'
  return 'Foe'
}

function recipient(
  target: 'self' | 'enemy' | 'ally-party' | undefined,
): MovePresentationRecipient {
  if (target === 'self') return 'user'
  if (target === 'ally-party') return 'party'
  return 'foe'
}

function statusList(statuses: StatusEffectId[] | 'all'): string {
  return statuses === 'all'
    ? 'all main status conditions'
    : statuses.map(words).join(', ')
}

function statChange(effect: BuffConfig): string {
  const direction = effect.stages >= 0 ? 'Raises' : 'Lowers'
  const amount = Math.abs(effect.stages)
  const owner = effect.target === 'enemy' ? "the foe's" : "the user's"
  return `${direction} ${owner} ${STAT_LABELS[effect.stat]} by ${amount} stage${amount === 1 ? '' : 's'}`
}

function formatDamageRule(rule: MoveDamageRule): string {
  switch (rule.type) {
    case 'flat':
      return `Deals exactly ${rule.amount} damage.`
    case 'target-current-hp-percent':
      return `Deals ${formatPercent(rule.percent)} of the foe's current HP.`
    case 'user-level':
      return `Damage is based on the user's level${rule.multiplier && rule.multiplier !== 1 ? ` × ${rule.multiplier}` : ''}.`
    case 'user-current-hp':
      return "Deals damage equal to the user's current HP."
    case 'last-damage-taken':
      return `Returns ${rule.multiplier ?? 1}× the last damage the user took.`
    case 'party-member-count':
      return `Deals ${rule.perMemberDamage} damage per ${rule.includeFainted ? '' : 'conscious '}party member.`
    case 'match-user-hp':
      return "Reduces the foe's HP to match the user's HP."
    case 'average-active-hp':
      return 'Averages the current HP of both active Pokémon.'
    case 'ohko':
      return `Knocks the foe out in one hit${rule.failIfUserLowerLevel ? ' but fails if the user is a lower level' : ''}.`
  }
}

function damageMetric(move: MoveConfig): MovePresentationMetric {
  if (move.healFull)
    return { label: 'Power', value: 'Full heal', helpText: 'Restores all HP.' }
  if (move.heal || move.weatherHeal || move.healByTargetStat) {
    return {
      label: 'Power',
      value: 'Healing',
      helpText: 'Restores HP instead of dealing damage.',
    }
  }
  if (move.damageRule) {
    return {
      label: 'Power',
      value: 'Special',
      helpText: formatDamageRule(move.damageRule),
    }
  }
  if (move.delayedDamage) {
    return {
      label: 'Base power',
      value: String(Math.round(BASE_BATTLE_POWER * move.delayedDamage.damage)),
      helpText: 'Damage lands after a delay.',
    }
  }
  if (move.damage <= 0 && !move.damageRange) {
    return {
      label: 'Power',
      value: 'Status',
      helpText: 'This move does not deal direct damage.',
    }
  }

  const multipliers = move.damageRange
    ? [move.damageRange.min, move.damageRange.max]
    : [move.damage, ...Object.values(move.damageByDefenderType ?? {})]
  if (move.weatherDamageMultiplier) {
    multipliers.push(
      ...multipliers.map(
        (value) => value * move.weatherDamageMultiplier!.multiplier,
      ),
    )
  }
  const min = Math.min(...multipliers)
  const max = Math.max(...multipliers)
  return {
    label: min === max ? 'Base power' : 'Base power range',
    value:
      min === max
        ? String(Math.round(BASE_BATTLE_POWER * min))
        : `${Math.round(BASE_BATTLE_POWER * min)}–${Math.round(BASE_BATTLE_POWER * max)}`,
    helpText:
      min === max
        ? `${min}× the standard battle power.`
        : `${min}×–${max}× the standard battle power.`,
  }
}

function formatCondition(condition: MoveBattleCondition): string {
  switch (condition.type) {
    case 'user-status':
      return `Only works while the user has ${words(condition.statusId)}.`
    case 'target-status':
      return `Only works while the foe has ${words(condition.statusId)}.`
    case 'last-ally-fainted-previous-turn':
      return 'Only works immediately after an ally fainted.'
    case 'user-has-used-other-moves':
      return 'Only works after the user has used its other moves.'
    case 'not-last-used-move':
      return 'Fails if this was the user’s last move.'
    case 'first-active-turn':
      return 'Only works on the user’s first active turn.'
    case 'opposite-gender-target':
      return 'Only works on a foe of the opposite gender.'
    case 'user-has-held-item':
      return 'Only works while the user holds an item.'
    case 'target-has-held-item':
      return 'Only works while the foe holds an item.'
    case 'user-has-consumed-held-item':
      return 'Only works after the user has consumed its held item.'
  }
}

function formatModifier(modifier: MoveConditionalDamageModifier): string {
  const multiplier =
    'multiplier' in modifier ? `${modifier.multiplier}× power` : ''
  switch (modifier.type) {
    case 'user-status':
      return `${multiplier} while the user has ${modifier.statuses === 'all' || !modifier.statuses ? 'a status condition' : statusList(modifier.statuses)}.`
    case 'user-no-held-item':
      return `${multiplier} when the user has no held item.`
    case 'target-pokemon-type':
      return `${multiplier} against ${modifier.pokemonTypes.map(words).join(' or ')}-type foes.`
    case 'target-status':
      return `${multiplier} while the foe has ${modifier.statuses === 'all' || !modifier.statuses ? 'a status condition' : statusList(modifier.statuses)}.`
    case 'remaining-move-uses-at-or-below':
      return `${multiplier} with ${modifier.uses} or fewer uses remaining.`
    case 'target-current-hp-at-or-below-percent':
      return `${multiplier} when the foe has ${formatPercent(modifier.percent)} HP or less.`
    case 'user-current-hp-percent':
      return `Power scales with the user's HP${modifier.invert ? ', becoming stronger as HP falls' : ''}; up to ${modifier.multiplierAtFullHp}×${modifier.minimumMultiplier ? ` and at least ${modifier.minimumMultiplier}×` : ''}.`
    case 'weather':
      return `${multiplier} during ${modifier.weather.map(words).join(' or ')} weather.`
    case 'super-effective':
      return `${multiplier} when the move is super effective.`
    case 'target-positive-stat-stages':
      return `${multiplier} based on the foe's raised stats.`
    case 'user-positive-stat-stages':
      return `${multiplier} based on the user's raised stats.`
    case 'fainted-party-members':
      return `Power increases by ${modifier.perFaintedMultiplier}× per fainted ally${modifier.baseMultiplier ? ` from ${modifier.baseMultiplier}×` : ''}.`
    case 'target-dynamaxed':
      return `${multiplier} against a Dynamaxed foe.`
    case 'user-took-damage':
      return `${multiplier} after the user takes damage.`
    case 'user-stat-lowered-this-turn':
      return `${multiplier} after one of the user's stats is lowered this turn.`
    case 'target-switching-out':
      return `${multiplier} while the foe is switching out.`
    case 'user-previous-move-failed':
      return `${multiplier} after the user's previous move failed.`
    case 'user-previous-successful-move':
      return `${multiplier} after ${modifier.moveIds.map(words).join(' or ')}.`
    case 'chance':
      return `${formatPercent(modifier.chance)} chance to use ${multiplier}.`
  }
}

function formatStatStageEffect(effect: MoveStatStageEffect): string {
  switch (effect.type) {
    case 'copy-target':
      return `Copies ${targetLabel(effect.target ?? 'enemy').toLowerCase()} stat changes.`
    case 'swap-self':
      return `Swaps the user's ${STAT_LABELS[effect.first]} and ${STAT_LABELS[effect.second]} changes.`
    case 'reset':
      return `Resets ${effect.target === 'both' ? 'both Pokémon’s' : `${targetLabel(effect.target ?? 'enemy').toLowerCase()} stat`} changes.`
    case 'swap-target':
      return `Swaps stat changes with ${targetLabel(effect.target ?? 'enemy').toLowerCase()}${effect.stats?.length ? ` for ${effect.stats.map((stat) => STAT_LABELS[stat]).join(', ')}` : ''}.`
    case 'invert-target':
      return `Reverses ${targetLabel(effect.target ?? 'enemy').toLowerCase()} stat changes.`
    case 'boost-pokemon-type':
      return `${words(effect.pokemonType)}-type ${effect.target === 'both' ? 'Pokémon' : targetLabel(effect.target ?? 'self').toLowerCase()} gain${effect.target === 'both' ? '' : 's'} ${effect.stages > 0 ? '+' : ''}${effect.stages} ${effect.stats.map((stat) => STAT_LABELS[stat]).join(', ')}.`
  }
}

function formatTypeChange(effect: MoveTypeChangeEffect): string {
  const owner = targetLabel(effect.target ?? 'self')
  switch (effect.type) {
    case 'random':
      return `${owner} becomes a random type${effect.types?.length ? ` from ${effect.types.map(words).join(', ')}` : ''}.`
    case 'first-known-move':
      return `${owner} becomes the type of its first known move.`
    case 'resist-last-opponent-move':
      return `${owner} changes type to resist the foe's last move.`
    case 'target-primary':
      return `${owner} becomes the foe's primary type.`
    case 'set':
      return `${owner} becomes ${words(effect.pokemonType)} type${effect.turns ? ` for ${turnCount(effect.turns)}` : ''}.`
    case 'add':
      return `${owner} gains ${words(effect.pokemonType)} type${effect.turns ? ` for ${turnCount(effect.turns)}` : ''}.`
    case 'remove':
      return `${owner} loses ${words(effect.pokemonType)} type${effect.turns ? ` for ${turnCount(effect.turns)}` : ''}.`
  }
}

function secondaryTarget(target: MoveSecondaryStatusConfig['target']): {
  label: string
  recipient: MovePresentationRecipient
} {
  switch (target) {
    case 'self-pokemon':
      return { label: 'user', recipient: 'user' }
    case 'enemy-pokemon':
      return { label: 'foe', recipient: 'foe' }
    case 'self-side':
      return { label: "user's side", recipient: 'side' }
    case 'enemy-side':
      return { label: "foe's side", recipient: 'side' }
    case 'both-pokemon':
      return { label: 'both Pokémon', recipient: 'both' }
    case 'both-sides':
      return { label: 'both sides', recipient: 'both' }
    case 'field':
      return { label: 'field', recipient: 'field' }
  }
}

function formatSecondaryEffects(status: MoveSecondaryStatusConfig): string {
  return status.effects
    .map((effect) => {
      switch (effect.type) {
        case 'damage':
          return effect.percentMaxHp
            ? `damages for ${formatPercent(effect.percentMaxHp)} max HP`
            : `deals ${effect.flatDamage ?? 0} damage`
        case 'absorb':
          return `drains ${effect.percentMaxHp ? `${formatPercent(effect.percentMaxHp)} max HP` : `${effect.flatDamage ?? 0} HP`}${effect.healPercent ? ` and heals ${formatPercent(effect.healPercent)} of it` : ''}`
        case 'apply-status':
          return `${normalizeChance(effect.chance)}% chance to apply ${words(effect.statusId)}`
        case 'heal':
          return effect.percentMaxHp
            ? `heals ${formatPercent(effect.percentMaxHp)} max HP`
            : `heals ${effect.flatHealing ?? 0} HP`
        case 'status-immunity':
          return `prevents ${effect.statuses === 'all' || !effect.statuses ? 'all status conditions' : statusList(effect.statuses)}`
        case 'wake-status':
          return `wakes Pokémon affected by ${effect.statuses?.map(words).join(', ') || 'sleep effects'}`
        case 'stat':
          return `${effect.stages > 0 ? 'raises' : 'lowers'} ${STAT_LABELS[effect.stat]} by ${Math.abs(effect.stages)} stage${Math.abs(effect.stages) === 1 ? '' : 's'}`
        case 'damage-reduction':
          return `reduces matching damage by ${formatPercent(effect.percent)}`
        case 'damage-modifier':
          return `changes matching damage by ${effect.percent > 0 ? '+' : ''}${formatPercent(effect.percent)}`
        case 'damage-taken-modifier':
          return `changes matching damage taken by ${effect.percent > 0 ? '+' : ''}${formatPercent(effect.percent)}`
        case 'type-immunity-bypass':
          return `bypasses ${effect.attackTypes?.map(words).join(', ') || 'type'} immunity`
        case 'accuracy-bypass':
          return 'makes attacks bypass accuracy checks'
        case 'infatuation':
          return `${normalizeChance(effect.chance)}% chance to infatuate`
        case 'switch-prevention':
          return 'prevents switching'
        case 'move-block':
          return `blocks ${words(effect.mode)} moves`
        case 'snatch-beneficial-move':
          return 'steals a beneficial move'
        case 'faint-bond':
          return 'causes the attacker to faint if this Pokémon faints'
        case 'faint-move-use-depletion':
          return `removes ${effect.amount} move use${effect.amount === 1 ? '' : 's'} when this Pokémon faints`
      }
    })
    .join('; ')
}

function formatSecondaryCure(cure: MoveSecondaryStatusCure): string {
  const target =
    cure.target === 'both' ? 'both sides' : targetLabel(cure.target)
  const scope = cure.scope ? words(cure.scope).toLowerCase() : 'Pokémon'
  return `Clears ${cure.ids?.length ? cure.ids.map(words).join(', ') : 'secondary effects'} from ${target.toLowerCase()} (${scope}).`
}

function formatHeldItemEffect(
  effect: NonNullable<MoveConfig['heldItemEffect']>,
): string {
  switch (effect.type) {
    case 'bestow':
      return 'Gives the user’s held item to the foe.'
    case 'remove-target':
      return 'Removes the foe’s held item.'
    case 'steal-target':
      return 'Steals the foe’s held item.'
    case 'swap':
      return 'Swaps held items with the foe.'
    case 'recycle':
      return 'Restores the user’s consumed held item.'
    case 'consume-self':
      return 'Consumes the user’s held item.'
    case 'consume-berries':
      return `Consumes held berries from ${effect.target === 'both' ? 'both Pokémon' : targetLabel(effect.target).toLowerCase()}.`
  }
}

function detail(
  id: string,
  kind: MovePresentationDetailKind,
  label: string,
  value: string,
  options: Pick<MovePresentationDetail, 'recipient' | 'chance'> = {},
): MovePresentationDetail {
  return { id, kind, label, value, ...options }
}

/** Creates the complete, UI-ready account of a move without description parsing. */
export function getMovePresentation(
  move: MoveConfig,
  context: MovePresentationContext = {},
): MovePresentation {
  const effects: MovePresentationDetail[] = []
  const conditions: MovePresentationDetail[] = []
  const timing: MovePresentationDetail[] = []
  const risks: MovePresentationDetail[] = []
  const rules: MovePresentationDetail[] = []
  const power = damageMetric(move)

  if (move.damage > 0 || move.damageRange || move.damageRule) {
    effects.push(
      detail('damage', 'effect', 'Damage', power.helpText ?? power.value, {
        recipient: 'foe',
      }),
    )
  }
  if (move.multiHit) {
    effects.push(
      detail(
        'multi-hit',
        'effect',
        'Hits',
        `Hits ${hitCount(move.multiHit.minHits, move.multiHit.maxHits)}.`,
        { recipient: 'foe' },
      ),
    )
  }
  if (move.healFull) {
    effects.push(
      detail(
        'heal-full',
        'effect',
        'Healing',
        'Restores all of the user’s HP.',
        {
          recipient: 'user',
        },
      ),
    )
  } else if (move.healByTargetStat === 'attack') {
    effects.push(
      detail(
        'heal-by-target-stat',
        'effect',
        'Healing',
        "Restores HP equal to the foe's current Attack.",
        { recipient: 'user' },
      ),
    )
  } else if (move.heal) {
    effects.push(
      detail(
        'heal',
        'effect',
        'Healing',
        'Restores 50% of the user’s maximum HP.',
        {
          recipient: 'user',
        },
      ),
    )
  }
  if (move.weatherHeal) {
    effects.push(
      detail(
        'weather-heal',
        'effect',
        'Weather healing',
        `Restores ${formatPercent(move.weatherHeal.defaultPercent)} max HP normally${
          move.weatherHeal.weather
            ? `; ${Object.entries(move.weatherHeal.weather)
                .map(
                  ([weather, percent]) =>
                    `${formatPercent(percent)} in ${words(weather)}`,
                )
                .join(', ')}`
            : ''
        }.`,
        { recipient: 'user' },
      ),
    )
  }
  if (move.absorb) {
    effects.push(
      detail(
        'absorb',
        'effect',
        'Drain',
        `Restores HP equal to ${formatPercent(move.absorb)} of damage dealt.`,
        { recipient: 'user' },
      ),
    )
  }
  if (move.status) {
    effects.push(
      detail(
        'status',
        'effect',
        'Status',
        `${normalizeChance(move.status.chance)}% chance to ${move.status.forceStatus ? 'replace the current status with' : 'apply'} ${words(move.status.id)}.`,
        {
          recipient: recipient(move.status.target ?? move.target),
          chance: normalizeChance(move.status.chance),
        },
      ),
    )
  }
  move.additionalStatuses?.forEach((status, index) => {
    effects.push(
      detail(
        `additional-status-${index}`,
        'effect',
        'Status',
        `${normalizeChance(status.chance)}% chance to apply ${words(status.id)}.`,
        {
          recipient: recipient(status.target),
          chance: normalizeChance(status.chance),
        },
      ),
    )
  })
  if (move.randomStatuses) {
    effects.push(
      detail(
        'random-status',
        'effect',
        'Random status',
        `${formatPercent(move.randomStatuses.chance)} chance to apply one of: ${move.randomStatuses.options.map((option) => words(option.id)).join(', ')}.`,
        {
          recipient: move.randomStatuses.options.some(
            (option) => option.target === 'random',
          )
            ? 'both'
            : recipient(
                move.randomStatuses.options[0]?.target === 'self'
                  ? 'self'
                  : 'enemy',
              ),
          chance: move.randomStatuses.chance,
        },
      ),
    )
  }
  move.buffs?.forEach((buff, index) => {
    effects.push(
      detail(
        `buff-${index}`,
        'effect',
        'Stat change',
        `${statChange(buff)} (${formatPercent(normalizeChance(buff.chance))} chance).`,
        {
          recipient: recipient(buff.target),
          chance: normalizeChance(buff.chance),
        },
      ),
    )
  })
  move.debuffs?.forEach((debuff, index) => {
    effects.push(
      detail(
        `debuff-${index}`,
        'effect',
        'Stat change',
        `${statChange(debuff)} (${formatPercent(normalizeChance(debuff.chance))} chance).`,
        {
          recipient: recipient(debuff.target ?? 'enemy'),
          chance: normalizeChance(debuff.chance),
        },
      ),
    )
  })
  move.onUserDamagedSameTurn?.forEach((buff, index) => {
    effects.push(
      detail(
        `reactive-buff-${index}`,
        'effect',
        'When hit',
        `${statChange(buff)} (${formatPercent(normalizeChance(buff.chance))} chance).`,
        {
          recipient: recipient(buff.target),
          chance: normalizeChance(buff.chance),
        },
      ),
    )
  })
  move.secondaryStatuses?.forEach((status, index) => {
    const target = secondaryTarget(status.target)
    effects.push(
      detail(
        `secondary-${index}`,
        'effect',
        status.name ?? words(status.id),
        `${formatSecondaryEffects(status)} on ${target.label}.`,
        { recipient: target.recipient, chance: status.chance },
      ),
    )
  })
  if (move.statusCure) {
    effects.push(
      detail(
        'status-cure',
        'effect',
        'Cures status',
        `Clears ${statusList(move.statusCure.statuses)} from ${targetLabel(move.statusCure.target).toLowerCase()}${move.statusCure.healUserPercent ? ` and heals the user for ${formatPercent(move.statusCure.healUserPercent)} max HP` : ''}.`,
        { recipient: recipient(move.statusCure.target) },
      ),
    )
  }
  if (move.postDamageStatusCure) {
    effects.push(
      detail(
        'post-status-cure',
        'effect',
        'After damage',
        `Clears ${statusList(move.postDamageStatusCure.statuses)} from ${targetLabel(move.postDamageStatusCure.target).toLowerCase()}.`,
        { recipient: recipient(move.postDamageStatusCure.target) },
      ),
    )
  }
  if (move.statusTransfer) {
    effects.push(
      detail(
        'status-transfer',
        'effect',
        'Transfers status',
        `Moves ${statusList(move.statusTransfer.statuses)} from the user to the foe${move.statusTransfer.clearSourceOnSuccess ? ', clearing the user' : ''}.`,
        { recipient: 'both' },
      ),
    )
  }
  if (move.secondaryStatusCure) {
    effects.push(
      detail(
        'secondary-status-cure',
        'effect',
        'Clears field effects',
        formatSecondaryCure(move.secondaryStatusCure),
        {
          recipient:
            move.secondaryStatusCure.target === 'both'
              ? 'both'
              : recipient(move.secondaryStatusCure.target),
        },
      ),
    )
  }
  if (move.partyRevive) {
    effects.push(
      detail(
        'party-revive',
        'effect',
        'Revives party',
        `Revives fainted allies with ${formatPercent(move.partyRevive.hpPercent)} HP.`,
        { recipient: 'party' },
      ),
    )
  }
  if (move.postDamageStatStage) {
    effects.push(
      detail(
        'post-damage-stat',
        'effect',
        'After a knockout',
        `${statChange({
          stat: move.postDamageStatStage.stat,
          stages: move.postDamageStatStage.stages,
          target: move.postDamageStatStage.target,
          chance: move.postDamageStatStage.chance,
        })} (${formatPercent(normalizeChance(move.postDamageStatStage.chance))} chance).`,
        {
          recipient: recipient(move.postDamageStatStage.target),
          chance: normalizeChance(move.postDamageStatStage.chance),
        },
      ),
    )
  }
  if (move.statStageEffect) {
    effects.push(
      detail(
        'stat-stage',
        'effect',
        'Stat changes',
        formatStatStageEffect(move.statStageEffect),
      ),
    )
  }
  if (move.transformEffect) {
    effects.push(
      detail(
        'transform',
        'effect',
        'Transform',
        'The user transforms into the foe.',
        {
          recipient: 'user',
        },
      ),
    )
  }
  if (move.typeChangeEffect) {
    effects.push(
      detail(
        'type-change',
        'effect',
        'Type change',
        formatTypeChange(move.typeChangeEffect),
        {
          recipient: recipient(move.typeChangeEffect.target),
        },
      ),
    )
  }
  if (move.switchEffect) {
    effects.push(
      detail(
        'switch',
        'effect',
        'Switch',
        move.switchEffect.type === 'force-enemy-random'
          ? 'Forces the foe to switch to a random party member.'
          : `Switches the user out${move.switchEffect.passStatStages ? ' and passes its stat changes' : ''}.`,
        {
          recipient:
            move.switchEffect.type === 'force-enemy-random' ? 'foe' : 'user',
        },
      ),
    )
  }
  if (move.itemUseEffect) {
    effects.push(
      detail(
        'item-use',
        'effect',
        'Move uses',
        `${move.itemUseEffect.type === 'restore-self' ? 'Restores' : move.itemUseEffect.type === 'remove-enemy' ? 'Removes from the foe' : 'Consumes'} ${move.itemUseEffect.amount} move use${move.itemUseEffect.amount === 1 ? '' : 's'}.`,
        {
          recipient:
            move.itemUseEffect.type === 'remove-enemy' ? 'foe' : 'user',
        },
      ),
    )
  }
  if (move.heldItemEffect) {
    effects.push(
      detail(
        'held-item',
        'effect',
        'Held item',
        formatHeldItemEffect(move.heldItemEffect),
        {
          recipient: 'both',
        },
      ),
    )
  }
  if (move.nextDamageModifier) {
    const uses = move.nextDamageModifier.uses ?? 1
    effects.push(
      detail(
        'next-damage',
        'effect',
        'Next attack',
        `${targetLabel(move.nextDamageModifier.target ?? 'self')} deals ${move.nextDamageModifier.percent > 0 ? '+' : ''}${formatPercent(move.nextDamageModifier.percent)} damage for the next ${uses} use${uses === 1 ? '' : 's'}.`,
        { recipient: recipient(move.nextDamageModifier.target) },
      ),
    )
  }
  if (move.nextAccuracyBypass) {
    const uses = move.nextAccuracyBypass.uses ?? 1
    effects.push(
      detail(
        'next-accuracy',
        'effect',
        'Next attack',
        `${targetLabel(move.nextAccuracyBypass.target)} bypasses accuracy checks for ${uses} use${uses === 1 ? '' : 's'}.`,
        { recipient: recipient(move.nextAccuracyBypass.target) },
      ),
    )
  }
  if (move.moveLockEffect) {
    effects.push(
      detail(
        'move-lock',
        'effect',
        'Locks move',
        `The foe can only use its current move for ${turnCount(move.moveLockEffect.turns)}.`,
        { recipient: 'foe' },
      ),
    )
  }
  if (move.moveUseEffect) {
    effects.push(
      detail(
        'move-use-effect',
        'effect',
        'Move uses',
        `${move.moveUseEffect.amount > 0 ? 'Restores' : 'Removes'} ${Math.abs(move.moveUseEffect.amount)} move use${Math.abs(move.moveUseEffect.amount) === 1 ? '' : 's'} for ${targetLabel(move.moveUseEffect.target).toLowerCase()}.`,
        { recipient: recipient(move.moveUseEffect.target) },
      ),
    )
  }
  if (move.terrainEffect) {
    effects.push(
      detail(
        'terrain',
        'effect',
        'Terrain',
        `Creates ${words(move.terrainEffect.terrain)} terrain.`,
        { recipient: 'field' },
      ),
    )
  }
  if (move.curseEffect) {
    effects.push(
      detail(
        'curse',
        'effect',
        'Curse',
        `${words(move.curseEffect.ghostType)} users pay 1/${move.curseEffect.ghostHpFraction} max HP to curse the foe for ${turnCount(move.curseEffect.ghostTurns)}; other users gain stat boosts.`,
        { recipient: 'both' },
      ),
    )
  }
  if (move.battleRewards) {
    effects.push(
      detail(
        'battle-rewards',
        'reward',
        'Battle reward',
        'Can grant additional rewards when the battle ends.',
      ),
    )
  }

  move.conditionalDamageModifiers?.forEach((modifier, index) => {
    conditions.push(
      detail(
        `damage-condition-${index}`,
        'condition',
        'Power condition',
        formatModifier(modifier),
      ),
    )
  })
  if (move.battleCondition) {
    conditions.push(
      detail(
        'battle-condition',
        'condition',
        'Use condition',
        formatCondition(move.battleCondition),
      ),
    )
  }
  if (move.failOnStance) {
    conditions.push(
      detail(
        'stance-fail',
        'condition',
        'Stance result',
        `Fails when the stance contest is a ${move.failOnStance}.`,
      ),
    )
  }
  if (move.statusCure?.failIfNoStatus) {
    conditions.push(
      detail(
        'status-required',
        'condition',
        'Status required',
        'Fails when there is no matching status to cure.',
      ),
    )
  }
  if (move.statusTransfer?.failIfNoStatus) {
    conditions.push(
      detail(
        'transfer-required',
        'condition',
        'Status required',
        'Fails when the user has no matching status to transfer.',
      ),
    )
  }
  if (
    move.itemUseEffect?.type === 'consume-self' &&
    move.itemUseEffect.failIfUnavailable
  ) {
    conditions.push(
      detail(
        'move-use-required',
        'condition',
        'Move uses required',
        'Fails when the user has no move uses to consume.',
      ),
    )
  }
  if (move.charged) {
    timing.push(
      detail(
        'charge',
        'timing',
        'Charge',
        `Charges for ${turnCount(move.charged)} before attacking.`,
      ),
    )
  }
  if (move.recharge) {
    timing.push(
      detail(
        'recharge',
        'timing',
        'Recharge',
        `The user must recharge for ${turnCount(move.recharge)} afterward.`,
      ),
    )
  }
  if (move.continuous) {
    timing.push(
      detail(
        'continuous',
        'timing',
        'Repeat',
        `Continues for ${move.continuous.min === move.continuous.max ? turnCount(move.continuous.min) : `${move.continuous.min}–${move.continuous.max} turns`}.`,
      ),
    )
  }
  if (move.repeatDamage) {
    timing.push(
      detail(
        'repeat-damage',
        'timing',
        'Repeat power',
        `Power rises by ${formatPercent(move.repeatDamage.perUsePercent)} after each successful use${move.repeatDamage.maxUses ? `, up to ${move.repeatDamage.maxUses} uses` : ''}.`,
      ),
    )
  }
  if (move.continuousEnd?.status) {
    timing.push(
      detail(
        'continuous-end',
        'timing',
        'When it ends',
        `${normalizeChance(move.continuousEnd.status.chance)}% chance to apply ${words(move.continuousEnd.status.id)} to ${targetLabel(move.continuousEnd.status.target ?? 'enemy').toLowerCase()}.`,
        {
          recipient: recipient(move.continuousEnd.status.target),
          chance: normalizeChance(move.continuousEnd.status.chance),
        },
      ),
    )
  }
  if (move.delayedDamage) {
    timing.push(
      detail(
        'delayed-damage',
        'timing',
        'Delayed hit',
        `Deals ${Math.round(BASE_BATTLE_POWER * move.delayedDamage.damage)} base power after ${turnCount(move.delayedDamage.turns)}.`,
      ),
    )
  }
  if (move.interruptEnemyMove) {
    timing.push(
      detail(
        'interrupt',
        'timing',
        'Interrupt',
        `${formatPercent(
          typeof move.interruptEnemyMove === 'boolean'
            ? 100
            : move.interruptEnemyMove,
        )} chance to interrupt the foe’s same-turn move.`,
      ),
    )
  }
  move.secondaryStatuses?.forEach((status, index) => {
    timing.push(
      detail(
        `secondary-timing-${index}`,
        'timing',
        status.name ?? words(status.id),
        `${status.delayTurns ? `Starts after ${turnCount(status.delayTurns)}; ` : ''}${status.triggers.map((trigger) => words(trigger).toLowerCase()).join(' and ')}${status.turns ? ` for ${typeof status.turns === 'number' ? turnCount(status.turns) : `${status.turns.min}–${status.turns.max} turns`}` : ''}.`,
      ),
    )
  })

  if (move.selfDamage) {
    const trigger = move.selfDamage.trigger ?? 'on-hit'
    const triggerText =
      trigger === 'on-miss'
        ? 'If this move misses, the user has'
        : trigger === 'on-use'
          ? 'When this move is used, the user has'
          : 'After this move hits, the user has'
    risks.push(
      detail(
        'self-damage',
        'risk',
        'Self damage',
        `${triggerText} a ${formatPercent(normalizeChance(move.selfDamage.chance))} chance to lose ${move.selfDamage.fraction ? `1/${move.selfDamage.fraction} of maximum HP` : 'HP'}.`,
        { recipient: 'user', chance: normalizeChance(move.selfDamage.chance) },
      ),
    )
  }
  if (move.contest?.failure?.failMove) {
    risks.push(
      detail(
        'contest-failure',
        'risk',
        'Contest failure',
        move.contest.failure.message ??
          'The move fails when its stat contest is lost.',
      ),
    )
  }

  if (move.weatherDamageMultiplier) {
    rules.push(
      detail(
        'weather-power',
        'rule',
        'Weather',
        `${move.weatherDamageMultiplier.multiplier}× power${move.weatherDamageMultiplier.weather?.length ? ` during ${move.weatherDamageMultiplier.weather.map(words).join(' or ')}` : ' in matching weather'}.`,
      ),
    )
  }
  if (move.damageByDefenderType) {
    rules.push(
      detail(
        'typed-power',
        'rule',
        'Type-based power',
        Object.entries(move.damageByDefenderType)
          .map(
            ([type, value]) =>
              `${words(type)}: ${Math.round(BASE_BATTLE_POWER * value)} base power`,
          )
          .join('; '),
      ),
    )
  }
  if (move.critChance) {
    rules.push(
      detail(
        'critical-hit',
        'rule',
        'Critical hit',
        `${formatPercent(move.critChance)} critical-hit chance.`,
      ),
    )
  }
  if (move.alwaysHits) {
    rules.push(
      detail(
        'always-hits',
        'rule',
        'Accuracy',
        'Bypasses accuracy and evasion checks.',
      ),
    )
  }
  if (move.ignoreTypeEffectiveness) {
    rules.push(
      detail(
        'ignore-type',
        'rule',
        'Type matchup',
        'Ignores type effectiveness and immunities.',
      ),
    )
  }
  if (move.ignoreDefenderStatStages) {
    rules.push(
      detail(
        'ignore-defense-stages',
        'rule',
        'Defence',
        'Ignores the foe’s defensive stat changes.',
      ),
    )
  }
  if (move.damageStatSource === 'target') {
    rules.push(
      detail(
        'target-stat',
        'rule',
        'Power source',
        'Uses the foe’s offensive stat instead of the user’s.',
      ),
    )
  }
  if (move.disableStance) {
    effects.push(
      detail(
        'disable-stance',
        'effect',
        'Disables stance',
        `Disables the foe’s ${words(move.disableStance.stance)} stance for ${turnCount(move.disableStance.turns)}.`,
        { recipient: 'foe' },
      ),
    )
  }
  if (move.preventCounterOnStanceWin) {
    rules.push(
      detail(
        'prevent-counter',
        'rule',
        'Stance win',
        'A stance win prevents the foe’s same-turn counterattack.',
      ),
    )
  }
  if (move.contest) {
    rules.push(
      detail(
        'contest',
        'rule',
        'Stat contest',
        `Compares ${words(move.contest.attackerMetric)} ${words(move.contest.comparison)} ${typeof move.contest.defenderMetric === 'number' ? move.contest.defenderMetric : words(move.contest.defenderMetric ?? move.contest.attackerMetric)}.`,
      ),
    )
  }
  if (move.calledMove) {
    rules.push(
      detail(
        'called-move',
        'rule',
        'Calls another move',
        `${words(move.calledMove.mode)}${move.calledMove.excludeSelf ? '; excludes this move' : ''}.`,
      ),
    )
  }
  if (move.dynamicType) {
    rules.push(
      detail(
        'dynamic-type',
        'rule',
        'Changing type',
        `${words(move.dynamicType.type)} determines the move’s type${move.dynamicType.fallbackType ? `; defaults to ${words(move.dynamicType.fallbackType)}` : ''}.`,
      ),
    )
  }
  if (move.trainerOnly) {
    rules.push(
      detail(
        'trainer-only',
        'rule',
        'Trainer battles',
        'Enemy AI only uses this move in Trainer battles.',
      ),
    )
  }
  if (move.manualOnly) {
    rules.push(
      detail(
        'manual-only',
        'rule',
        'Authored move',
        'Enemy AI only uses this move when it is specifically assigned.',
      ),
    )
  }
  if (move.aiOnly) {
    rules.push(
      detail(
        'ai-only',
        'rule',
        'Opponent move',
        'This move is not available as a TM or player-assigned move.',
      ),
    )
  }
  if (move.notes?.trim()) {
    rules.push(detail('notes', 'rule', 'Field note', move.notes.trim()))
  }

  const authoredType = getMoveDisplayType(move)
  const type = context.resolvedType ?? authoredType
  const summary =
    move.description.trim() ||
    effects[0]?.value ||
    power.helpText ||
    'No move details are available yet.'
  const offensiveValue = context.offensiveValue
    ? {
        label: context.offensiveValue.label,
        value: String(context.offensiveValue.value),
      }
    : undefined

  return {
    identity: {
      id: move.id,
      name: move.name,
      type,
      authoredType,
      stance: move.stance,
      target: move.target,
      source: context.source,
    },
    essentials: {
      power,
      accuracy: move.alwaysHits
        ? {
            label: 'Accuracy',
            value: 'Always hits',
            helpText: 'Bypasses normal accuracy checks.',
          }
        : { label: 'Accuracy', value: formatPercent(move.accuracy) },
      target: { label: 'Target', value: targetLabel(move.target) },
      offensiveValue,
    },
    summary,
    effects,
    conditions,
    timing,
    risks,
    rules,
    battle:
      context.resolvedType || context.effectiveness || context.availability
        ? {
            resolvedType: context.resolvedType,
            effectiveness: context.effectiveness,
            availability: context.availability,
          }
        : undefined,
  }
}

export function getMoveTmItem(moveId: string) {
  return items.find((item) => item.moveId === moveId)
}

export function getMoveDisplayType(
  move: Pick<MoveConfig, 'forcedType'>,
): MoveForcedType {
  return move.forcedType || 'normal'
}

export function getMoveTypeSpriteItemId(
  move: Pick<MoveConfig, 'forcedType'>,
): string {
  const type = getMoveDisplayType(move)
  return type === 'random' ? 'tm-normal' : `tm-${type}`
}

function formatLegacyDamage(move: MoveConfig): string {
  if (move.healFull) return 'Full Heal'
  if (move.heal) return '50% Heal'
  if (move.damage <= 0) return 'No Damage'
  if (move.damageRange) {
    const min = Math.min(move.damageRange.min, move.damageRange.max)
    const max = Math.max(move.damageRange.min, move.damageRange.max)
    return `${min}x-${max}x (${Math.round(BASE_BATTLE_POWER * min)}-${Math.round(BASE_BATTLE_POWER * max)} BP)`
  }
  const values = [
    move.damage,
    ...Object.values(move.damageByDefenderType || {}),
  ]
  if (move.weatherDamageMultiplier) {
    values.push(
      ...values.map(
        (value) => value * move.weatherDamageMultiplier!.multiplier,
      ),
    )
  }
  const min = Math.min(...values)
  const max = Math.max(...values)
  return min === max
    ? `${move.damage}x (${Math.round(BASE_BATTLE_POWER * move.damage)} BP)`
    : `${min}x-${max}x (${Math.round(BASE_BATTLE_POWER * min)}-${Math.round(BASE_BATTLE_POWER * max)} BP)`
}

function legacyTarget(target: 'self' | 'enemy' | undefined): string {
  return target === 'self' ? 'Self' : 'Target'
}

function legacyStatChange(stat: string, stages: number): string {
  return `${stat} ${stages >= 0 ? '+' : ''}${stages}`
}

function legacyStatus(status: NonNullable<MoveConfig['status']>): string {
  return `${legacyTarget(status.target ?? 'enemy')} ${status.id.replace(/-/g, ' ')} ${formatPercent(normalizeChance(status.chance))}`
}

/** @deprecated Prefer getMovePresentation. Kept byte-for-byte compatible while screens migrate. */
export function getMoveInfoTags(move: MoveConfig): MoveInfoTag[] {
  const tags: MoveInfoTag[] = [
    {
      label: 'Stance',
      value: move.stance === 'random' ? 'Random' : move.stance,
    },
    { label: 'Type', value: getMoveDisplayType(move) },
    { label: 'Accuracy', value: formatPercent(move.accuracy) },
    { label: 'Damage', value: formatLegacyDamage(move) },
  ]
  if (move.critChance)
    tags.push({ label: 'Crit', value: formatPercent(move.critChance) })
  if (move.absorb) {
    tags.push({
      label: 'Absorb',
      value: `${formatPercent(move.absorb)} of damage dealt`,
    })
  }
  if (move.status)
    tags.push({ label: 'Status', value: legacyStatus(move.status) })
  if (move.repeatDamage) {
    tags.push({
      label: 'Repeat Damage',
      value: `+${formatPercent(move.repeatDamage.perUsePercent)} per use${move.repeatDamage.maxUses ? `, max ${move.repeatDamage.maxUses}` : ''}`,
    })
  }
  if (move.continuousEnd?.status) {
    tags.push({
      label: 'End Status',
      value: legacyStatus(move.continuousEnd.status),
    })
  }
  for (const status of move.additionalStatuses || []) {
    tags.push({
      label: status.target === 'self' ? 'Self Status' : 'Target Status',
      value: `${status.id.replace(/-/g, ' ')} ${formatPercent(status.chance ?? 100)}`,
    })
  }
  if (move.randomStatuses?.options?.length) {
    const grouped = move.randomStatuses.options.reduce<Record<string, number>>(
      (result, option) => {
        result[option.id] = (result[option.id] ?? 0) + (option.chance ?? 1)
        return result
      },
      {},
    )
    const summary = Object.entries(grouped)
      .map(([status, chance]) => `${status.replace(/-/g, ' ')} (${chance})`)
      .join(', ')
    const hasRandomTarget = move.randomStatuses.options.some(
      (status) => status.target === 'random',
    )
    const hasSelfTarget = move.randomStatuses.options.some(
      (status) => status.target === 'self',
    )
    tags.push({
      label: 'Random Status',
      value: `${formatPercent(move.randomStatuses.chance)} — ${summary}; target: ${hasRandomTarget ? 'self or opponent' : hasSelfTarget ? 'self' : 'opponent'}`,
    })
  }
  if (move.secondaryStatuses?.length) {
    tags.push({
      label: 'Secondary',
      value: `${move.secondaryStatuses.length} effect${move.secondaryStatuses.length === 1 ? '' : 's'}`,
    })
  }
  for (const buff of move.buffs || []) {
    const chance = normalizeChance(buff.chance)
    tags.push({
      label: 'Buff',
      value: `${legacyTarget(buff.target ?? 'self')} ${legacyStatChange(buff.stat, buff.stages)} (${chance}%)`,
    })
  }
  for (const debuff of move.debuffs || []) {
    const chance = normalizeChance(debuff.chance)
    tags.push({
      label: 'Debuff',
      value: `${legacyTarget(debuff.target ?? 'enemy')} ${legacyStatChange(debuff.stat, debuff.stages)} (${chance}%)`,
    })
  }
  if (move.disableStance) {
    tags.push({
      label: 'Disable',
      value: `${move.disableStance.stance} ${move.disableStance.turns}t`,
    })
  }
  if (move.heldItemEffect) {
    const labels = {
      bestow: 'Gives user item to target',
      'remove-target': 'Removes target item',
      'steal-target': 'Steals target item',
      swap: 'Swaps held items',
      recycle: 'Restores consumed item',
      'consume-self': 'Consumes user held item',
      'consume-berries': 'Consumes held berries',
    } as const
    tags.push({ label: 'Held Item', value: labels[move.heldItemEffect.type] })
  }
  const interruptChance =
    typeof move.interruptEnemyMove === 'boolean'
      ? move.interruptEnemyMove
        ? 100
        : 0
      : move.interruptEnemyMove || 0
  if (interruptChance > 0) {
    tags.push({
      label: 'Timing',
      value: `Interrupts enemy moves (${interruptChance}%)`,
    })
  }
  if (move.ignoreTypeEffectiveness)
    tags.push({ label: 'Rules', value: 'Bypasses typing' })
  return tags
}
