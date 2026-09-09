import { battles } from '@/data/battles'
import { locations } from '@/data/locations'
import { shops } from '@/data/shops'
import { tasks } from '@/data/tasks'
import { fieldResearchGames } from '@/data/games'
import type { EventConfigMap, EventKind } from './model'

export const eventCatalog = {
  battle: battles,
  location: locations,
  shop: shops,
  task: tasks,
  'field-research': fieldResearchGames,
} as { [K in EventKind]: EventConfigMap[K][] }
