import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import type { User } from '@/payload-types'
import {
  ABILITY_FORM_MAP,
  ABILITY_TYPE_MAP,
  ABILITY_GLOBAL_MAP,
  rollNaturalFormAbility,
  type AbilityConfig,
} from '@/data/abilities'

export function rollAbility(
  formId: string,
  types: string[],
  researchLevel?: number,
  globalAbilityRolls = 1,
  hiddenAbilitiesUnlocked = false,
): string | undefined {
  const doRoll = (): string | undefined => {
    // 1. Form Map
    if (ABILITY_FORM_MAP[formId]) {
      const formResult = rollNaturalFormAbility(formId, Math.random, {
        hiddenEligible: hiddenAbilitiesUnlocked,
        hiddenChance:
          hiddenAbilitiesUnlocked && researchLevel && researchLevel >= 4
            ? 10
            : undefined,
      })
      if (formResult) return formResult
    }
    // 2. Type Map
    for (const type of types) {
      if (ABILITY_TYPE_MAP[type]) {
        for (const assignment of ABILITY_TYPE_MAP[type]) {
          if (Math.random() < assignment.rate / 100) return assignment.id
        }
      }
    }
    // 3. Global Map
    for (const assignment of ABILITY_GLOBAL_MAP) {
      if (Math.random() < assignment.rate / 100) return assignment.id
    }
    return undefined
  }

  const totalRolls = Math.max(1, globalAbilityRolls)
  for (let i = 0; i < totalRolls; i++) {
    const result = doRoll()
    if (result) return result
  }
  return undefined
}

export function checkCriteria(
  ability: Pick<AbilityConfig, 'criteria'>,
  encounter: {
    type?: string[]
    formId: string
    speciesId?: number
    sourceFormId?: string
    locationId: string
    isNight?: boolean
  },
): boolean {
  if (!ability.criteria) return true
  const { criteria } = ability
  if (criteria.chance && Math.random() > criteria.chance) return false
  if (criteria.formId && criteria.formId !== encounter.formId) return false
  if (criteria.sourceFormId && criteria.sourceFormId !== encounter.sourceFormId)
    return false
  if (
    criteria.speciesId?.length &&
    !criteria.speciesId.includes(encounter.speciesId || 0)
  ) {
    return false
  }
  if (criteria.locationId && criteria.locationId !== encounter.locationId)
    return false
  if (criteria.timeOfDay === 'night' && !encounter.isNight) return false
  if (criteria.timeOfDay === 'day' && encounter.isNight) return false
  if (criteria.type && encounter.type) {
    const hasType = criteria.type.some((t) => encounter.type?.includes(t))
    if (!hasType) return false
  }
  return true
}

export async function getUser() {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const { user: jwtUser } = await payload.auth({ headers: headersList })
  if (!jwtUser) return null
  const user = await payload.findByID({
    collection: 'users',
    id: jwtUser.id,
  })
  return user as User
}
