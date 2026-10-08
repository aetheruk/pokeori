import type { BattleConfig, BattleEnemy, Location, Reward } from '@/data/types'
import type { Pokemon } from '@/payload-types'
import { getPokemonForm, getPokemonSpecies } from './pokedex'
import {
  generatePokemonStats,
  type GeneratedPokemonStats,
} from './pokemon-mechanics'

export const ALPHA_CHANCE = 1 / 30
export const ALPHA_CAPTURE_CHANCE = 1 / 30
export const ALPHA_CAPTURE_SECONDS = 50
export const ALPHA_RESEARCH_XP = 15
export const ALPHA_CAPTURE_XP_MULTIPLIER = 5

/** The original encounter, before temporary battle forms, stat stages or damage. */
export type AlphaCapturePokemon = Pick<
  Pokemon,
  | 'speciesId'
  | 'formId'
  | 'level'
  | 'gender'
  | 'rarity'
  | 'shiny'
  | 'isShadow'
  | 'isRadiant'
  | 'ability'
  | 'background'
> &
  Omit<GeneratedPokemonStats, 'messages'> & { isAlpha: true; name: string }

export function canRollAlpha(
  config: BattleConfig & {
    eventContexts?: unknown[]
    expeditionOnly?: boolean
  },
  enemy: BattleEnemy,
  scripted = false,
) {
  const species = getPokemonSpecies(enemy.speciesId)
  const form = getPokemonForm(enemy.formId || String(enemy.speciesId))
  return (
    config.isWildBattle === true &&
    !scripted &&
    config.allowAlpha !== false &&
    !config.isRandomEvent &&
    !config.eventContexts?.length &&
    !config.expeditionOnly &&
    !config.disableRewards &&
    !config.pvp &&
    config.format !== 'double' &&
    !['special', 'secret', 'test'].includes(config.category.toLowerCase()) &&
    !enemy.name &&
    !enemy.ivs &&
    !enemy.evs &&
    !species?.is_legendary &&
    !species?.is_mythical &&
    !form?.is_legendary &&
    !form?.is_mythical
  )
}

export function rollAlpha(eligible: boolean, random = Math.random) {
  return eligible && random() < ALPHA_CHANCE
}

export function canRollCaptureAlpha(
  location: Pick<
    Location,
    | 'category'
    | 'allowAlpha'
    | 'isRandomEvent'
    | 'keyEncounter'
    | 'specialEncounter'
    | 'expeditionOnly'
    | 'encounterMode'
  > & { eventContexts?: unknown[] },
  speciesId: number,
  scripted = false,
) {
  const species = getPokemonSpecies(speciesId)
  return (
    !scripted &&
    location.allowAlpha !== false &&
    !location.isRandomEvent &&
    !location.eventContexts?.length &&
    !location.keyEncounter &&
    !location.specialEncounter &&
    !location.expeditionOnly &&
    location.encounterMode !== 'safari' &&
    !['special', 'secret', 'test'].includes(location.category.toLowerCase()) &&
    !species?.is_legendary &&
    !species?.is_mythical
  )
}

export function rollCaptureAlpha(eligible: boolean, random = Math.random) {
  return eligible && random() < ALPHA_CAPTURE_CHANCE
}

export function applyAlphaCaptureXp(
  rewards: Reward[],
  isAlpha: boolean,
): Reward[] {
  if (!isAlpha) return rewards
  return rewards.map((reward) => {
    if (reward.type !== 'xp' || reward.skill !== 'catching') return reward
    const quantity = reward.quantity ?? 1
    return {
      ...reward,
      quantity:
        typeof quantity === 'number'
          ? quantity * ALPHA_CAPTURE_XP_MULTIPLIER
          : {
              min: quantity.min * ALPHA_CAPTURE_XP_MULTIPLIER,
              max: quantity.max * ALPHA_CAPTURE_XP_MULTIPLIER,
            },
    }
  })
}

export function applyAlphaCaptureBonuses(
  rewards: Reward[],
  isAlpha: boolean,
): Reward[] {
  if (!isAlpha) return rewards

  return rewards.map((reward) => {
    const multiplier = reward.type === 'item' ? 3 : 1
    if (multiplier === 1) return reward

    const quantity = reward.quantity ?? 1
    return {
      ...reward,
      quantity:
        typeof quantity === 'number'
          ? quantity * multiplier
          : {
              min: quantity.min * multiplier,
              max: quantity.max * multiplier,
            },
    }
  })
}

export function generateAlphaStats(
  baseHeight: number,
  baseWeight: number,
  random = Math.random,
): GeneratedPokemonStats {
  const stats = generatePokemonStats(baseHeight, baseWeight, random)
  const remaining = Object.keys(stats.ivs) as (keyof typeof stats.ivs)[]
  for (let i = 0; i < 3; i++) {
    const index = Math.floor(random() * remaining.length)
    const [stat] = remaining.splice(index, 1)
    stats.ivs[stat] = 31
  }
  stats.evs.hp = 252
  // The normal maximum is +20%. Independently add up to 10% of that maximum.
  const heightRoll = random()
  const weightRoll = random()
  const heightBonus = heightRoll * 0.1
  const weightBonus = weightRoll * 0.1
  stats.height = Math.round(baseHeight * 1.2 * (1 + heightBonus) * 10) / 10
  stats.weight = Math.round(baseWeight * 1.2 * (1 + weightBonus) * 10) / 10
  stats.size = heightRoll > 0.8 && weightRoll > 0.8 ? 'XXXL' : 'XXL'
  stats.messages = ['This Pokémon is an Alpha!', `Its size is ${stats.size}.`]
  return stats
}
