'use server'

import * as mechanics from './mechanics-server'

export async function getQuizQuestion(...args: Parameters<typeof mechanics.getQuizQuestion>) {
  return mechanics.getQuizQuestion(...args)
}

export async function submitAnswer(...args: Parameters<typeof mechanics.submitAnswer>) {
  return mechanics.submitAnswer(...args)
}

export async function useEncounterItem(...args: Parameters<typeof mechanics.useEncounterItem>) {
  return mechanics.useEncounterItem(...args)
}
