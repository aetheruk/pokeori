export * from './types'
import { SpellingConfig } from './types'

import { testspellingEntries } from './entries/test'

export const spellingEntries: SpellingConfig[] = [
  ...testspellingEntries,
]
