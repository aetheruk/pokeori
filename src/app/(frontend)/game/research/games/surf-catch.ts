'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { startBattleFromConfig } from '@/app/(frontend)/game/battles/pve/start-battle'
import type { BattleConfig } from '@/data/types'
import {
  getGameActivityStateForUser,
  clearGameActivityStateForUser,
  getUser,
} from '@/app/(frontend)/game/_shared/activity-actions'
import type { EncounterState } from '@/app/(frontend)/game/locations/encounter/actions/types'
import { rollAbility } from '@/app/(frontend)/game/locations/encounter/actions/utils'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'
import { rollPokemonGender } from '@/utilities/pokemon/gender'
import {
  getPokemonRarityLegacyFields,
  type PokemonRarityId,
} from '@/utilities/pokemon/rarity-effects'
import { generateAlphaStats } from '@/utilities/pokemon/alpha'
import { getUserPokedexMap } from '@/utilities/user-state'
import {
  getResearcherAbilityRolls,
  getResearcherHiddenAbilitiesUnlocked,
  getSkillLevel,
} from '@/utilities/skills/unlocks'
import {
  getIdempotentResult,
  setIdempotentResult,
  acquireActionLock,
  releaseActionLock,
  checkActionRateLimit,
} from '@/utilities/game-integrity'
import { redis } from '@/utilities/redis'

type SurfChoice = 'battle' | 'capture'
type SurfChoiceResult =
  | { success: true; redirect: string }
  | { success: false; error: string }

export async function chooseSurfPokemon(
  encounterId: string,
  sessionId: string,
  choice: SurfChoice,
): Promise<SurfChoiceResult> {
  const user = await getUser()
  if (!user) return { success: false, error: 'Not authenticated' }
  if (
    typeof encounterId !== 'string' ||
    encounterId.length > 100 ||
    typeof sessionId !== 'string' ||
    !/^[0-9:]{1,64}$/.test(sessionId) ||
    !['battle', 'capture'].includes(choice)
  ) {
    return { success: false, error: 'Invalid Surf encounter choice' }
  }

  const rate = await checkActionRateLimit(user.id, 'surf-catch-choice', 10, 60)
  if (!rate.allowed)
    return {
      success: false,
      error: 'Too many encounter actions. Please wait a moment.',
    }
  const lock = await acquireActionLock(`lock:game:settle:${user.id}`, 60)
  if (!lock.acquired)
    return {
      success: false,
      error: 'Another game action is already in progress',
    }

  try {
    const resultKey = `surf-catch-choice:${user.id}:${sessionId}:${choice}`
    const cached = await getIdempotentResult<SurfChoiceResult>(resultKey)
    if (cached) return cached
    const state = await getGameActivityStateForUser(user.id, 'game')
    if (
      !state ||
      state.encounterId !== encounterId ||
      state.expiry < Date.now() ||
      state.roundData?.gameType !== 'surf' ||
      state.roundData?.settings?.mode !== 'catch' ||
      state.roundData?.sessionId !== sessionId
    ) {
      return {
        success: false,
        error: 'This Surf encounter is no longer available.',
      }
    }
    const round = state.roundData
    const pending = round.simulation?.pendingSurfPokemon
    if (round.simulation?.status !== 'encounter' || !pending) {
      return {
        success: false,
        error: 'No Pokémon is waiting to be encountered.',
      }
    }
    const species = getPokemonForm(pending.formId)
    if (!species || species.id !== pending.formId)
      return { success: false, error: 'This Pokémon form is unavailable.' }
    const isShiny = pending.rarity === 'shiny'
    const isShadow = pending.rarity === 'shadow'
    const isRadiant = pending.rarity === 'radiant'
    const background =
      round.settings?.scene?.backdrop ||
      '/games/surf/backgrounds/kanto-coast.avif'
    let response: SurfChoiceResult

    if (choice === 'battle') {
      const battleConfig: BattleConfig = {
        id: `surf-catch:${round.sessionId}:${pending.id}`,
        name: `Wild ${species.name}`,
        description: 'A Pokémon encountered while surfing.',
        category: 'Kanto',
        subCategory: 'Test',
        icon: { type: 'pokemon', id: pending.formId },
        background,
        requirements: [],
        enemyTeam: [
          {
            speciesId: pending.speciesId,
            formId: pending.formId,
            level: pending.level,
            rarity: pending.rarity,
            shiny: isShiny,
            isShadow,
            isRadiant,
          },
        ],
        rewards: [],
        maxPokemon: 1,
        isWildBattle: true,
        allowAlpha: true,
        allowVariantCatches: true,
      }
      const battle = await startBattleFromConfig(user, battleConfig, {
        dynamic: true,
        fixedWildPokemon: {
          speciesId: pending.speciesId,
          formId: pending.formId,
          level: pending.level,
          rarity: pending.rarity,
          isAlpha: pending.isAlpha,
        },
      })
      if (!battle.success)
        return {
          success: false,
          error: battle.error || 'Unable to start the battle.',
        }
      response = { success: true, redirect: '/game/battles/encounter' }
    } else {
      const form = getPokemonForm(pending.formId)
      const captureRate = Math.floor((form?.capture_rate || 100) / 2)
      const isAlpha = pending.isAlpha
      const duration = isAlpha ? 50 : 30
      const now = Date.now()
      const gender = rollPokemonGender(pending.speciesId)
      const rarity = pending.rarity as PokemonRarityId
      const stateForCapture: EncounterState = {
        userId: user.id,
        locationId: `surf:${encounterId}`,
        pokemonId: pending.speciesId,
        formId: pending.formId,
        gender,
        isShiny,
        rarity,
        background,
        startTime: now,
        expiry: now + duration * 1000,
        baseCatchRate: isAlpha ? 0 : captureRate,
        currentCatchRate: isAlpha ? 0 : captureRate,
        questionsAnswered: [],
        itemsUsed: [],
        level: pending.level,
        levelRange: { min: pending.level, max: pending.level },
        locationSnapshot: {
          id: `surf:${encounterId}`,
          name: state.eventConfigSnapshot?.name || 'Surf',
          description: 'Capture a Pokémon encountered while surfing.',
          category: 'Kanto',
          subCategory: 'Test',
          icon: { type: 'pokemon', id: pending.formId },
          requirements: [],
          encounters: [
            {
              speciesId: pending.speciesId,
              formId: pending.formId,
              chance: 100,
              rarity: pending.rarity,
            },
          ],
          rewards: [],
          background,
          timer: duration,
          levelRange: { min: pending.level, max: pending.level },
          keyEncounter: true,
          allowAlpha: true,
        },
      }
      if (isAlpha) {
        const payload = await getPayload({ config: configPromise })
        const pokedexMap = await getUserPokedexMap(payload as any, user.id)
        const researchLevel =
          pokedexMap[String(pending.speciesId)]?.[pending.formId]
            ?.researchLevel || 0
        const researcherLevel = getSkillLevel(user.skills, 'researching')
        stateForCapture.alphaPokemon = {
          ...generateAlphaStats(form?.height || 0, form?.weight || 0),
          speciesId: pending.speciesId,
          formId: pending.formId,
          name: form?.name || 'Unknown',
          level: pending.level,
          gender,
          rarity,
          ...getPokemonRarityLegacyFields(rarity),
          isAlpha: true,
          ability: rollAbility(
            pending.formId,
            form?.types || [],
            researchLevel,
            getResearcherAbilityRolls(researcherLevel),
            getResearcherHiddenAbilitiesUnlocked(researcherLevel),
          ),
          background: stateForCapture.background,
        }
      }
      const saved = await redis.set(`encounter:${user.id}`, stateForCapture, {
        ex: duration + 60,
      })
      if (!saved)
        return {
          success: false,
          error: 'Unable to prepare the capture encounter.',
        }
      response = { success: true, redirect: '/game/locations/encounter' }
    }

    await clearGameActivityStateForUser(user.id, 'game')
    await setIdempotentResult(resultKey, response, 3600)
    return response
  } catch (error) {
    console.error('Error handing off Surf encounter:', error)
    return { success: false, error: 'Unable to start this encounter.' }
  } finally {
    await releaseActionLock(lock)
  }
}
