import type { TaskCondition } from '@/data/tasks'

export type GameDataKeys =
  | 'inventory'
  | 'pokemon'
  | 'tcg'
  | 'abilityDex'
  | 'pokedex'
  | 'completedTasks'
  | 'battleResults'
  | 'locationEncounterResults'
  | 'researchEncounterResults'
  | 'expeditionResults'
  | 'currency'
  | 'shopPurchases'
  | 'activeExpedition'
  | 'rivalTrainer'

export function analyzeRequirements(conditions?: TaskCondition[]): GameDataKeys[] {
  if (!conditions || conditions.length === 0) return []

  const keys = new Set<GameDataKeys>()

  for (const condition of conditions) {
    if (!condition) continue
    switch (condition.type) {
      case 'item_owned':
      case 'currency_owned':
      case 'power_usage':
        // These might need user object or inventory
        if (condition.type === 'item_owned') keys.add('inventory')
        // currency and power_usage are on user object which is always fetched
        break

      case 'pokemon_owned':
        keys.add('pokemon')
        break

      case 'battle_team':
      case 'companion':
        keys.add('pokemon')
        break

      case 'card_collected_total':
      case 'card_collected_set':
      case 'card_collected_specific':
        keys.add('tcg')
        break

      case 'pokedex_seen_total':
      case 'pokedex_caught_total':
      case 'pokedex_seen_specific':
      case 'pokedex_caught_specific':
      case 'research_level':
      case 'research_level_total':
        keys.add('pokedex')
        break

      case 'any_of':
        for (const key of analyzeRequirements(condition.conditions)) {
          keys.add(key)
        }
        break

      case 'task_completed':
        keys.add('completedTasks')
        break

      case 'battle_result':
      case 'total_battles_won':
        keys.add('battleResults')
        break

      case 'location_encounter_result':
        keys.add('locationEncounterResults')
        break

      case 'research_encounter_result':
        keys.add('researchEncounterResults')
        break

      case 'expedition_result':
        keys.add('expeditionResults')
        break

      case 'voyage_completed':
        // No specific key, but uses user object voyageStats
        break

      case 'daily_not_completed':
        keys.add('battleResults')
        keys.add('locationEncounterResults')
        keys.add('researchEncounterResults')
        keys.add('expeditionResults')
        keys.add('completedTasks')
        break

      case 'time_range':
      case 'date_range':
      case 'weather':
      case 'user_level':
      case 'total_evolutions':
      case 'rival_selected':
        // No extra data needed
        break
    }
  }

  return Array.from(keys)
}
