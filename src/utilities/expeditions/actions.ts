'use server'

import * as expedition from './server'
export type { ExpeditionProgressSnapshot } from './server'

// Only authenticated player entry points belong in the Server Action module.
export async function startExpedition(...args: Parameters<typeof expedition.startExpedition>) {
  return expedition.startExpedition(...args)
}

export async function abandonExpedition(...args: Parameters<typeof expedition.abandonExpedition>) {
  return expedition.abandonExpedition(...args)
}

export async function claimExpeditionRewards(...args: Parameters<typeof expedition.claimExpeditionRewards>) {
  return expedition.claimExpeditionRewards(...args)
}

export async function chooseExpeditionBranch(...args: Parameters<typeof expedition.chooseExpeditionBranch>) {
  return expedition.chooseExpeditionBranch(...args)
}

export async function failCurrentUserExpeditionTaskStep(...args: Parameters<typeof expedition.failCurrentUserExpeditionTaskStep>) {
  return expedition.failCurrentUserExpeditionTaskStep(...args)
}

export async function completeCurrentUserExpeditionTaskStep(...args: Parameters<typeof expedition.completeCurrentUserExpeditionTaskStep>) {
  return expedition.completeCurrentUserExpeditionTaskStep(...args)
}
