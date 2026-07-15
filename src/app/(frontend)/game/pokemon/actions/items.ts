'use server'

import { getPayload, Where } from 'payload'
import config from '@/payload.config'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { logger } from '@/utilities/logger'
import {
  identifyPokemon as identifyPokemonUtil,
  increaseEV as increaseEVUtil,
  decreaseEV as decreaseEVUtil,
  increaseIV as increaseIVUtil,
  decreaseIV as decreaseIVUtil,
  levelUp as levelUpUtil,
  changeNature as changeNatureUtil,
  renamePokemon as renamePokemonUtil,
  increaseFriendship as increaseFriendshipUtil,
  calculateStats,
} from '@/utilities/pokemon/pokemon-mechanics'
import { calculateReleaseRewards } from '@/utilities/rewards/candy-logic'
import type { NatureName } from '@/data/natures'
import type { Pokemon, User } from '@/payload-types'
import { grantRewards } from '@/utilities/rewards/reward-logic'
import { getPokemonForm, getPokemonSpecies } from '@/utilities/pokemon/pokedex'
import { items } from '@/data/items'
import { ABILITIES } from '@/data/abilities'
import { rollResearchXp } from '@/utilities/research/research-levels'
import { EVOLUTIONS } from '@/data/evolutions'
import { getUser, serializePokemon, type StatName } from './utils'
import { cache } from 'react'
import { getItemSkillLockReason } from '@/utilities/skills/unlocks'
import {
  getPokemonItemUnavailableReason,
  isPokemonTargetedInventoryItem,
  type PokemonItemUseTarget,
} from '@/utilities/pokemon/item-usability'
import {
  getUserInventoryMap,
  setUserInventoryMap,
} from '@/utilities/user-state'
import { registerAbilityDexEntry } from '@/utilities/pokemon/abilitydex'
import {
  getFusionOptionForFusedForm,
  getFusionOptionForPartnerForm,
  isValidFusionPartner,
} from '@/utilities/pokemon/fusion'

export const getUsableItems = cache(
  async (pokemonTarget: PokemonItemUseTarget) => {
    const payload = await getPayload({ config })
    const { user } = await payload.auth({ headers: await headers() })
    if (!user) return []

    const userInventory = await getUserInventoryMap(payload as any, user.id)

    const usableItems = Object.entries(userInventory)
      .map(([itemId, quantity]) => {
        if (quantity <= 0) return null
        const itemDef = items.find((i) => i.id === itemId)
        if (!itemDef) return null

        if (isPokemonTargetedInventoryItem(itemDef)) {
          const unavailableReason = getPokemonItemUnavailableReason(
            itemDef,
            pokemonTarget,
            user.skills,
          )
          if (unavailableReason) return null

          return {
            id: itemId, // Use itemId as ID
            itemId,
            quantity,
            user: user.id,
            definition: itemDef,
          }
        }
        return null
      })
      .filter(Boolean)

    return usableItems
  },
)

export async function getFusionPartnerOptions(
  pokemonId: string,
  itemId: string,
) {
  try {
    const payload = await getPayload({ config })
    const [user, pokemon] = await Promise.all([
      getUser(),
      payload.findByID({
        collection: 'pokemon',
        id: pokemonId,
        depth: 0,
      }),
    ])

    if (!user) throw new Error('Unauthorized')

    if (
      (typeof pokemon.user === 'object' ? pokemon.user.id : pokemon.user) !==
      user.id
    ) {
      throw new Error('Pokemon not owned by user')
    }

    const itemDef = items.find((i) => i.id === itemId)
    const fusionConfig = itemDef?.effects?.fusePokemon
    if (!itemDef || !fusionConfig) {
      throw new Error('Item does not support Pokemon fusion.')
    }

    const unavailableReason = getPokemonItemUnavailableReason(
      itemDef,
      pokemon,
      user.skills,
    )
    if (unavailableReason) throw new Error(unavailableReason)

    if (getFusionOptionForFusedForm(fusionConfig, pokemon.formId)) {
      return []
    }

    const candidates = await payload.find({
      collection: 'pokemon',
      where: {
        user: { equals: user.id },
      },
      depth: 0,
      limit: 1000,
      pagination: false,
    })

    return candidates.docs
      .filter((candidate) =>
        isValidFusionPartner(fusionConfig, pokemon, candidate),
      )
      .map((candidate) => {
        const fusion = getFusionOptionForPartnerForm(
          fusionConfig,
          candidate.formId,
        )
        return {
          pokemon: serializePokemon(candidate),
          label: fusion?.label || 'Fuse',
          fusedFormId: fusion?.fusedFormId || '',
        }
      })
  } catch (error) {
    logger.error('Error loading fusion partner options:', error)
    throw error
  }
}

export async function applyItemToPokemon(
  pokemonId: string,
  itemId: string,
  options?: { targetStat?: StatName; partnerPokemonId?: string },
) {
  try {
    const payload = await getPayload({ config })

    const [user, pokemon] = await Promise.all([
      getUser(),
      payload.findByID({
        collection: 'pokemon',
        id: pokemonId,
      }),
    ])

    if (!user) throw new Error('Unauthorized')

    const userInventory = await getUserInventoryMap(payload as any, user.id)
    const currentQuantity = userInventory[itemId] || 0

    if (currentQuantity <= 0) {
      throw new Error('Item not found in inventory')
    }

    const itemDef = items.find((i) => i.id === itemId)

    if (!itemDef?.effects) {
      throw new Error('Item has no effect')
    }
    const skillLockReason = getItemSkillLockReason(itemDef, user.skills)
    if (skillLockReason) {
      throw new Error(skillLockReason)
    }

    if (
      typeof pokemon.user === 'object'
        ? pokemon.user.id !== user.id
        : pokemon.user !== user.id
    ) {
      throw new Error('Pokemon not owned by user')
    }
    const unavailableReason = getPokemonItemUnavailableReason(
      itemDef,
      pokemon,
      user.skills,
    )
    if (unavailableReason) {
      throw new Error(unavailableReason)
    }

    let updatedPokemon: typeof pokemon | null = null

    // 3. Apply Effect
    if (itemDef.effects.increaseEv) {
      const { stat, amount } = itemDef.effects.increaseEv
      const currentEv = pokemon.evs?.[stat] || 0

      // Calculate total EVs
      const totalEvs = Object.values(pokemon.evs || {}).reduce(
        (a: number, b) => a + (b || 0),
        0,
      )

      if (currentEv >= 255) {
        throw new Error(`${stat} is already maxed out!`)
      }

      if (totalEvs >= 510) {
        throw new Error(`Total EVs are maxed out!`)
      }

      // Cap increase to not exceed 255 or 510 total
      let actualAmount = amount
      if (currentEv + actualAmount > 255) {
        actualAmount = 255 - currentEv
      }
      if (totalEvs + actualAmount > 510) {
        actualAmount = 510 - totalEvs
      }

      if (actualAmount <= 0) {
        throw new Error("It won't have any effect.")
      }

      // Update Pokemon
      updatedPokemon = await increaseEVUtil(
        payload,
        pokemonId,
        stat,
        actualAmount,
      )
    } else if (itemDef.effects.decreaseEv) {
      const { stat, amount } = itemDef.effects.decreaseEv
      const currentEv = pokemon.evs?.[stat] || 0

      if (currentEv <= 0) {
        throw new Error(`${stat} EVs are already at 0!`)
      }

      // Cap decrease to not go below 0
      let actualAmount = amount
      if (currentEv - actualAmount < 0) {
        actualAmount = currentEv
      }

      if (actualAmount <= 0) {
        throw new Error("It won't have any effect.")
      }

      // Update Pokemon
      updatedPokemon = await decreaseEVUtil(
        payload,
        pokemonId,
        stat,
        actualAmount,
      )
    } else if (itemDef.effects.increaseLevel) {
      const { increaseLevel, maxLevel, minLevel } = itemDef.effects
      const currentLevel = pokemon.level || 1

      if (currentLevel >= 100) {
        throw new Error('Pokemon is already at max level!')
      }

      if (maxLevel !== undefined && currentLevel > maxLevel) {
        throw new Error(`This candy can only be used up to level ${maxLevel}.`)
      }

      if (minLevel !== undefined && currentLevel < minLevel) {
        throw new Error(`This candy can only be used from level ${minLevel}.`)
      }

      // Update Pokemon
      updatedPokemon = await levelUpUtil(payload, pokemonId, increaseLevel || 1)
    } else if (itemDef.effects.changeNature) {
      const { changeNature } = itemDef.effects
      const currentNature = pokemon.nature

      if (currentNature === changeNature) {
        throw new Error(`This Pokemon is already ${changeNature}!`)
      }

      // Update Pokemon
      await changeNatureUtil(payload, pokemonId, changeNature)
      updatedPokemon = await payload.findByID({
        collection: 'pokemon',
        id: pokemonId,
      })
    } else if (itemDef.effects.fusePokemon) {
      const fusionConfig = itemDef.effects.fusePokemon
      const existingFusion = getFusionOptionForFusedForm(
        fusionConfig,
        pokemon.formId,
      )

      if (existingFusion) {
        if (
          pokemon.fusionItemId !== itemDef.id ||
          !pokemon.fusedWithPokemonId ||
          pokemon.fusionBaseFormId !== fusionConfig.baseFormId
        ) {
          throw new Error('This fused Pokemon is missing fusion partner data.')
        }

        const partner = await payload.findByID({
          collection: 'pokemon',
          id: pokemon.fusedWithPokemonId,
          depth: 0,
        })

        if (
          (typeof partner.user === 'object'
            ? partner.user.id
            : partner.user) !== user.id
        ) {
          throw new Error('Fusion partner is not owned by user.')
        }

        if (partner.fusedIntoPokemonId !== pokemon.id) {
          throw new Error('Fusion partner data is out of sync.')
        }

        await Promise.all([
          payload.update({
            collection: 'pokemon',
            id: pokemonId,
            data: {
              formId: pokemon.fusionBaseFormId,
              fusionItemId: null,
              fusionBaseFormId: null,
              fusedWithPokemonId: null,
            },
            depth: 0,
          }),
          payload.update({
            collection: 'pokemon',
            id: partner.id,
            data: {
              fusedIntoPokemonId: null,
            },
            depth: 0,
          }),
        ])
      } else {
        if (!options?.partnerPokemonId) {
          throw new Error('Choose a compatible Pokemon to fuse with.')
        }

        const partner = await payload.findByID({
          collection: 'pokemon',
          id: options.partnerPokemonId,
          depth: 0,
        })

        if (
          (typeof partner.user === 'object'
            ? partner.user.id
            : partner.user) !== user.id
        ) {
          throw new Error('Fusion partner is not owned by user.')
        }

        if (!isValidFusionPartner(fusionConfig, pokemon, partner)) {
          throw new Error('That Pokemon cannot be fused with this Pokemon.')
        }

        const fusion = getFusionOptionForPartnerForm(
          fusionConfig,
          partner.formId,
        )
        if (!fusion) {
          throw new Error('That Pokemon cannot be fused with this Pokemon.')
        }

        await Promise.all([
          payload.update({
            collection: 'pokemon',
            id: pokemonId,
            data: {
              formId: fusion.fusedFormId,
              fusionItemId: itemDef.id,
              fusionBaseFormId: fusionConfig.baseFormId,
              fusedWithPokemonId: partner.id,
            },
            depth: 0,
          }),
          payload.update({
            collection: 'pokemon',
            id: partner.id,
            data: {
              fusedIntoPokemonId: pokemonId,
              onBattleTeam: false,
              battleTeamPosition: null,
              isCompanion: false,
            },
            depth: 0,
          }),
        ])
      }

      updatedPokemon = await payload.findByID({
        collection: 'pokemon',
        id: pokemonId,
      })
    } else if (itemDef.effects.changeForm) {
      const { changeForm } = itemDef.effects
      const transition = changeForm.transitions.find(
        (entry) => entry.fromFormId === pokemon.formId,
      )
      if (!transition) {
        throw new Error('This item cannot be used on this Pokemon.')
      }

      if (pokemon.formId === transition.toFormId) {
        throw new Error("It won't have any effect.")
      }

      const targetForm = getPokemonForm(transition.toFormId)
      if (!targetForm) {
        throw new Error('Target Pokemon form could not be found.')
      }

      await payload.update({
        collection: 'pokemon',
        id: pokemonId,
        data: {
          formId: transition.toFormId,
        },
      })
      updatedPokemon = await payload.findByID({
        collection: 'pokemon',
        id: pokemonId,
      })
    } else if (itemDef.effects.setTeraType) {
      const teraType = itemDef.effects.setTeraType

      if (pokemon.teraType === teraType) {
        throw new Error(`This Pokemon already has ${teraType} Tera type.`)
      }

      await payload.update({
        collection: 'pokemon',
        id: pokemonId,
        data: {
          teraType,
        },
      })
      updatedPokemon = await payload.findByID({
        collection: 'pokemon',
        id: pokemonId,
      })
    } else if (itemDef.effects.maximizeIv) {
      // Gold Bottle Cap: Maximize all IVs

      // Check if already maxed
      const allMaxed = Object.values(pokemon.ivs || {}).every((iv) => iv === 31)
      if (allMaxed) {
        throw new Error('All IVs are already maximized!')
      }

      // Update all IVs
      await payload.update({
        collection: 'pokemon',
        id: pokemonId,
        data: {
          ivs: {
            hp: 31,
            attack: 31,
            defense: 31,
            specialAttack: 31,
            specialDefense: 31,
            speed: 31,
          },
        },
      })

      updatedPokemon = await payload.findByID({
        collection: 'pokemon',
        id: pokemonId,
      })
    } else if (itemDef.effects.maximizeOneIv) {
      // Bottle Cap: Maximize one IV

      if (!options?.targetStat) {
        throw new Error('Target stat is required for this item.')
      }

      const stat = options.targetStat
      const currentIv = pokemon.ivs?.[stat] || 0

      if (currentIv >= 31) {
        throw new Error(`${stat} IV is already maximized!`)
      }

      // Update specific IV
      await increaseIVUtil(payload, pokemonId, stat, 31 - currentIv)

      updatedPokemon = await payload.findByID({
        collection: 'pokemon',
        id: pokemonId,
      })
    } else if (itemDef.effects.increaseFriendship) {
      const amount = itemDef.effects.increaseFriendship
      const currentFriendship = pokemon.friendship || 0

      if (currentFriendship >= 255) {
        throw new Error('Pokemon is already max friendship!')
      }

      updatedPokemon = await increaseFriendshipUtil(payload, pokemonId, amount)
    } else if (itemDef.effects.teachAbility) {
      const { teachAbility, usableByForms, usableByTypes } = itemDef.effects

      // Validate requirements if any
      if (usableByForms || usableByTypes) {
        // 1. Get Species/Form data to check types
        // pokemon.formId is stored on the pokemon doc (usually).
        // Check if pokemon.formId is available. serialization says "formId" might be missing in Type?
        // "Pokemon" type from payload-types usually has formId.
        // Let's get the form definition.
        const formId = pokemon.formId
        const speciesId = pokemon.speciesId
        const speciesData =
          getPokemonForm(formId) || getPokemonSpecies(speciesId)

        if (!speciesData) {
          throw new Error(
            'Could not retrieve species data to validate item usage.',
          )
        }

        let allowed = false

        // Check Form ID
        if (usableByForms?.includes(formId)) {
          allowed = true
        }

        // Check Types
        if (!allowed && usableByTypes && speciesData.types) {
          // If pokemon has ANY of the allowed types
          const hasType = speciesData.types.some((t: string) =>
            usableByTypes.includes(t.toLowerCase() as any),
          )
          if (hasType) {
            allowed = true
          }
        }

        if (!allowed) {
          throw new Error('This item cannot be used on this Pokemon.')
        }
      }

      const newAbilityId = teachAbility
      const currentAbilityId =
        typeof pokemon.ability === 'string' ? pokemon.ability : undefined
      const currentAbility = currentAbilityId
        ? ABILITIES[currentAbilityId]
        : undefined
      if (currentAbility?.locked) {
        throw new Error(`${currentAbility.name} cannot be overwritten.`)
      }

      // Update Pokemon with new ability
      await payload.update({
        collection: 'pokemon',
        id: pokemonId,
        data: {
          ability: newAbilityId,
        },
      })
      updatedPokemon = await payload.findByID({
        collection: 'pokemon',
        id: pokemonId,
      })
      await registerAbilityDexEntry(
        payload as any,
        user.id,
        newAbilityId,
        'ability-patch',
      )
    } else if (itemDef.effects.grantPokemonResearchXp) {
      // Only allow if no formId specified in item def, or if it matches the pokemon's form
      const {
        formId: effectFormId,
        amount,
        minSkillLevel,
      } = itemDef.effects.grantPokemonResearchXp

      // Check skill level requirement
      if (minSkillLevel) {
        const researcherLevel = user.skills?.researching?.level || 1
        if (researcherLevel < minSkillLevel) {
          throw new Error(
            `Researcher Level ${minSkillLevel} required to use this item.`,
          )
        }
      }

      // Check if Legendary/Mythical
      const formInfo = getPokemonForm(pokemon.formId)
      if (!effectFormId && (formInfo?.is_legendary || formInfo?.is_mythical)) {
        throw new Error(
          `${itemDef.name} cannot be used on Legendary or Mythical Pokemon.`,
        )
      }

      const targetFormId = effectFormId || pokemon.formId

      if (effectFormId && effectFormId !== pokemon.formId) {
        throw new Error(`This item is specific to ${effectFormId}`)
      }

      // Resolve amount if it's a range
      let actualAmount = 0
      if (typeof amount === 'number') {
        actualAmount = amount
      } else {
        actualAmount =
          Math.floor(Math.random() * (amount.max - amount.min + 1)) + amount.min
      }

      // Use grantRewards utility to grant research XP
      const result = await grantRewards(user.id, [
        {
          type: 'pokemon_research_xp',
          targetId: targetFormId,
          quantity: actualAmount,
        },
      ])

      if (!result.success) {
        throw new Error('Failed to grant research XP')
      }

      // Refresh pokemon data if needed (though research XP is on Pokedex, not Pokemon doc)
      updatedPokemon = await payload.findByID({
        collection: 'pokemon',
        id: pokemonId,
      })
    } else {
      throw new Error('Item has no implemented effect')
    }

    if (itemDef.consume !== false) {
      const nextQuantity = currentQuantity - 1
      if (nextQuantity > 0) {
        userInventory[itemId] = nextQuantity
      } else {
        delete userInventory[itemId]
      }
      await setUserInventoryMap(payload as any, user.id, userInventory)
    }

    revalidatePath('/game/pokemon')
    return {
      success: true as const,
      message: `Used ${itemDef.name} on ${pokemon.name || 'Pokemon'}`,
      pokemon: updatedPokemon,
    }
  } catch (error) {
    logger.error('Error applying item to Pokemon:', error)
    return {
      success: false as const,
      error:
        error instanceof Error
          ? error.message
          : 'An error occurred while using the item',
    }
  }
}
