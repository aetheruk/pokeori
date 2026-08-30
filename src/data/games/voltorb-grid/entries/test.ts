import type { VoltorbGridGameConfig } from '../types'
import { route10VoltorbGridEntries } from './route-10'

const rendererSource = route10VoltorbGridEntries.find(
  (entry) => entry.id === 'route-10-voltorb-primer',
)

if (!rendererSource) {
  throw new Error('Voltorb Grid renderer test source entry is missing')
}

/** Always-available copy of the first Voltorb board for renderer testing. */
export const testVoltorbGridEntries: VoltorbGridGameConfig[] = [
  {
    ...rendererSource,
    id: 'voltorb-grid-renderer-test',
    name: 'Voltorb Grid Renderer Test',
    description: 'Replay the first Voltorb board to preview the current tile renderer.',
    category: 'Kanto',
    subCategory: 'Test',
    requirements: [],
    criteria: [],
    rewards: [],
    settings: {
      ...rendererSource.settings,
      tilePaletteId: 'basic-cave',
    },
  },
]
