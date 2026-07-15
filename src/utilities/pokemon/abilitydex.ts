import {
  ABILITIES,
  resolveAbilityForms,
  type AbilityConfig,
  type AbilityEffect,
  type AbilityEffectCondition,
} from '@/data/abilities'
import type { LocationReward } from '@/data/types'
import pokemonData from '@/data/pokemon-data'
import { USER_STATE_COLLECTIONS } from '@/utilities/user-state'

export type AbilityDexEntry = {
  ability: AbilityConfig
  abilityId: string
  formIds: string[]
}

export type AbilityDexLearner = {
  speciesId: number
  form: {
    id: string
    name: string
  }
}

export type AbilityDexPartnerEffectLine = {
  id: string
  text: string
}

type PayloadLike = {
  find: (args: any) => Promise<{ docs?: any[] }>
  create: (args: any) => Promise<any>
}

export const ALL_ABILITY_DEX_ENTRIES: AbilityDexEntry[] = Object.values(ABILITIES)
  .map((ability) => ({
    ability,
    abilityId: ability.id,
    formIds: resolveAbilityForms(ability),
  }))
  .sort((a, b) => {
    const typeDiff = a.ability.type.localeCompare(b.ability.type)
    if (typeDiff !== 0) return typeDiff
    return a.ability.name.localeCompare(b.ability.name)
  })

export function getAbilityTypeLabel(type: string) {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

function formatIdLabel(id: string): string {
  return id
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function formatSignedPercentFromMultiplier(multiplier: number): string {
  const delta = Math.round((multiplier - 1) * 100)
  if (delta === 0) return 'no change to'
  return `${delta > 0 ? '+' : ''}${delta}%`
}

function formatReward(reward: LocationReward): string {
  const quantity =
    typeof reward.quantity === 'number' && reward.quantity > 1 ? `${reward.quantity} ` : ''
  const target = reward.targetId ? formatIdLabel(String(reward.targetId)) : formatIdLabel(reward.type)
  return `${quantity}${target}`
}

function formatCondition(condition: AbilityEffectCondition | undefined): string {
  if (!condition) return ''
  const parts: string[] = []

  if (condition.caught) parts.push('on successful catches')
  if (condition.type?.length) {
    parts.push(`for ${condition.type.map(formatIdLabel).join('/')} Pokemon`)
  }
  if (condition.weather?.length) {
    parts.push(`during ${condition.weather.map(formatIdLabel).join('/')}`)
  }
  if (condition.surveyFocus?.length) {
    parts.push(`during ${condition.surveyFocus.map(formatIdLabel).join('/')} surveys`)
  }
  if (condition.timeOfDay) parts.push(`at ${condition.timeOfDay}`)
  if (typeof condition.chance === 'number') parts.push(`${condition.chance}% chance`)

  return parts.length ? ` (${parts.join(', ')})` : ''
}

function formatSeconds(seconds: number): string {
  return `${seconds > 0 ? '+' : ''}${seconds}s`
}

function getEffectCondition(effect: AbilityEffect): AbilityEffectCondition | undefined {
  return 'condition' in effect ? effect.condition : undefined
}

function formatPartnerEffect(effect: AbilityEffect): string | null {
  const condition = formatCondition(getEffectCondition(effect))

  switch (effect.type) {
    case 'catch-rate-multiplier':
      return `Capture: ${formatSignedPercentFromMultiplier(effect.multiplier)} catch rate${condition}.`
    case 'timer-delta':
      return `Capture: ${formatSeconds(effect.seconds)} answer timer${condition}.`
    case 'active-escape':
      return `Capture: ${effect.chance}% chance to escape safely${condition}.`
    case 'answer-convert-wrong-to-correct':
      return `Capture: ${effect.chance}% chance to save a wrong answer${condition}.`
    case 'answer-rate-delta':
      if (typeof effect.amount === 'number') {
        return `Capture: ${effect.amount > 0 ? '+' : ''}${effect.amount} answer-rate adjustment${condition}.`
      }
      if (typeof effect.changeAmountMultiplier === 'number') {
        return `Capture: ${formatSignedPercentFromMultiplier(effect.changeAmountMultiplier)} answer-rate changes${condition}.`
      }
      return `Capture: adjusts answer rate${condition}.`
    case 'answer-timer-delta':
      return `Capture: ${effect.milliseconds > 0 ? '+' : ''}${effect.milliseconds / 1000}s answer timer${condition}.`
    case 'answer-reset-correct-streak':
      return `Capture: resets the current correct-answer streak${condition}.`
    case 'answer-skip-default':
      return `Capture: skips the default answer effect${condition}.`
    case 'quiz-decoration':
      return `Capture: ${formatIdLabel(effect.mode)} quiz assist${condition}.`
    case 'capture-rewards':
      return `Capture: grants ${effect.rewards.map(formatReward).join(', ')}${condition}.`
    case 'capture-material-reward':
      return `Capture: ${effect.dropChance ?? 100}% chance for ${effect.quantity} ${formatIdLabel(effect.materialType)}${condition}.`
    case 'capture-currency-by-level':
      return `Capture: grants ${formatIdLabel(effect.currencyId)} based on Pokemon level${condition}.`
    case 'capture-candy-by-level':
      return `Capture: ${effect.dropChance ?? 100}% chance for species candy based on Pokemon level${condition}.`
    case 'capture-source-form-item':
      return `Capture: ${effect.chance}% chance for a form item${condition}.`
    case 'capture-random-item':
      return `Capture: ${effect.chance}% chance for ${effect.itemIds.map(formatIdLabel).join(', ')}${condition}.`
    case 'capture-research-xp':
      return `Capture: +${effect.amount} Pokemon Research XP${condition}.`
    case 'field-observation-duration-delta': {
      const parts = [
        effect.observationSeconds ? `${formatSeconds(effect.observationSeconds)} observation time` : '',
        effect.answerSeconds ? `${formatSeconds(effect.answerSeconds)} answer time` : '',
      ].filter(Boolean)
      return parts.length ? `Field Observation: ${parts.join(', ')}${condition}.` : null
    }
    case 'field-observation-pool-weight-multiplier':
      return `Field Observation: ${formatSignedPercentFromMultiplier(effect.multiplier)} matching spawn weight${condition}.`
    case 'field-observation-spawn-modifier': {
      const parts = [
        effect.spawnCountMultiplier
          ? `${formatSignedPercentFromMultiplier(effect.spawnCountMultiplier)} appeared Pokemon`
          : '',
        effect.hiddenChanceMultiplier
          ? `${formatSignedPercentFromMultiplier(effect.hiddenChanceMultiplier)} hidden Pokemon odds`
          : '',
        effect.eventChanceMultiplier
          ? `${formatSignedPercentFromMultiplier(effect.eventChanceMultiplier)} event odds`
          : '',
      ].filter(Boolean)
      return parts.length ? `Field Observation: ${parts.join(', ')}${condition}.` : null
    }
    case 'field-observation-global-event-odds-multiplier': {
      const parts = [
        effect.pokemonEventMultiplier
          ? `${formatSignedPercentFromMultiplier(effect.pokemonEventMultiplier)} Pokemon event odds`
          : '',
        effect.itemEventMultiplier
          ? `${formatSignedPercentFromMultiplier(effect.itemEventMultiplier)} item event odds`
          : '',
      ].filter(Boolean)
      return parts.length ? `Field Observation: ${parts.join(', ')}${condition}.` : null
    }
    case 'field-observation-collectible-modifier': {
      const parts = [
        effect.dropChanceMultiplier
          ? `${formatSignedPercentFromMultiplier(effect.dropChanceMultiplier)} collectible drop odds`
          : '',
        effect.quantityBonus ? `+${effect.quantityBonus} collectible quantity` : '',
        effect.durationMultiplier
          ? `${formatSignedPercentFromMultiplier(effect.durationMultiplier)} collectible duration`
          : '',
      ].filter(Boolean)
      return parts.length ? `Field Observation: ${parts.join(', ')}${condition}.` : null
    }
    case 'field-observation-extra-collectible':
      return `Field Observation: can add ${formatReward(effect.reward)}${condition}.`
    case 'field-observation-reward-protection':
      return `Field Observation: ${effect.chance}% chance to protect a gathered reward${condition}.`
    case 'field-observation-research-xp-multiplier':
      return `Field Observation: ${formatSignedPercentFromMultiplier(effect.multiplier)} research XP${condition}.`
    default:
      return null
  }
}

export function getAbilityDexPartnerEffectLines(
  ability: AbilityConfig,
): AbilityDexPartnerEffectLine[] {
  return (ability.effects || [])
    .map((effect, index) => {
      const text = formatPartnerEffect(effect)
      return text ? { id: `${effect.type}-${index}`, text } : null
    })
    .filter((line): line is AbilityDexPartnerEffectLine => line !== null)
}

export function getAbilityLearnersForAbility(ability: AbilityConfig): {
  learners: AbilityDexLearner[]
  allPokemon: boolean
} {
  const formIds = resolveAbilityForms(ability)
  if (formIds.length === 0) return { learners: [], allPokemon: true }

  const allowedForms = new Set(formIds)
  const learners: AbilityDexLearner[] = []

  for (const species of pokemonData) {
    for (const form of species.forms) {
      if (!allowedForms.has(String(form.id))) continue

      learners.push({
        speciesId: species.id,
        form: {
          id: String(form.id),
          name: form.name,
        },
      })
    }
  }

  return {
    learners: learners.sort((a, b) => {
      if (a.speciesId !== b.speciesId) return a.speciesId - b.speciesId
      return Number(a.form.id) - Number(b.form.id)
    }),
    allPokemon: false,
  }
}

export async function registerAbilityDexEntry(
  payload: PayloadLike,
  userId: string,
  abilityId: string | null | undefined,
  source = 'pokemon',
): Promise<{ registered: boolean; isNew: boolean }> {
  if (!abilityId || !ABILITIES[abilityId]) return { registered: false, isNew: false }

  const existing = await payload.find({
    collection: USER_STATE_COLLECTIONS.abilityDex,
    where: {
      and: [{ user: { equals: userId } }, { abilityId: { equals: abilityId } }],
    },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  if (existing.docs?.[0]) return { registered: true, isNew: false }

  await payload.create({
    collection: USER_STATE_COLLECTIONS.abilityDex,
    data: {
      user: userId,
      abilityId,
      registered: true,
      source,
      firstRegisteredAt: new Date().toISOString(),
    },
    overrideAccess: true,
  })

  return { registered: true, isNew: true }
}
