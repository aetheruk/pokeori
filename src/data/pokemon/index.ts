/**
 * Central export for all Pokemon data across all generations.
 * Combines data from gen1-gen9 modules.
 */

import type { PokemonData } from './types';
import gen1Data from './gen1';
import gen2Data from './gen2';
import gen3Data from './gen3';
import gen4Data from './gen4';
import gen5Data from './gen5';
import gen6Data from './gen6';
import gen7Data from './gen7';
import gen8Data from './gen8';
import gen9Data from './gen9';

// Export individual generations
export { gen1Data, gen2Data, gen3Data, gen4Data, gen5Data, gen6Data, gen7Data, gen8Data, gen9Data };

// Export types
export * from './types';

// Combined data across all generations
export const allPokemon: PokemonData = [
  ...gen1Data,
  ...gen2Data,
  ...gen3Data,
  ...gen4Data,
  ...gen5Data,
  ...gen6Data,
  ...gen7Data,
  ...gen8Data,
  ...gen9Data,
];

// Default export for backward compatibility
export default allPokemon;
