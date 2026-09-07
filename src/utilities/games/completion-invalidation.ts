import type { RewardSummary } from '@/utilities/rewards/reward-logic'
import type { GameDataKeys } from '@/utilities/requirements/analysis'

export function getGameCompletionInvalidations(
  summary: Partial<RewardSummary> | null,
  domain: 'game' | 'research',
  expeditionChanged: boolean,
): GameDataKeys[] {
  const keys = new Set<GameDataKeys>([domain === 'game' ? 'gameResults' : 'fieldResearchResults', 'pokemon'])
  // Companion friendship may change without a display entry in RewardSummary.
  if (summary?.items?.length) keys.add('inventory')
  if (summary?.cards?.length) keys.add('tcg')
  if (summary?.currency?.length) keys.add('currency')
  if (summary?.pokemon?.length || summary?.eggs?.length || summary?.researchXp?.length) {
    keys.add('pokedex')
    keys.add('abilityDex')
  }
  if (summary?.sketchedMoves?.length) keys.add('sketchedMoves')
  if (summary?.tasksCompleted?.length) keys.add('completedTasks')
  if (expeditionChanged) {
    keys.add('activeExpedition')
    keys.add('expeditionResults')
  }
  // Nested level/breakthrough grants can contain every reward category.
  if (summary?.levelUp || summary?.researchBreakthroughs?.length) {
    for (const key of ['inventory', 'pokedex', 'abilityDex', 'completedTasks', 'tcg', 'currency'] as const) keys.add(key)
  }
  return [...keys]
}
