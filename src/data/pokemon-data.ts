/**
 * DEPRECATED: This file is maintained for backward compatibility.
 * New code should import from '@/data/pokemon' instead.
 * 
 * Pokemon data has been refactored into generation-based modules for better
 * maintainability and performance. See src/data/pokemon/ directory.
 */

// Re-export types
export * from './pokemon/types';

// Re-export default for backward compatibility
import { allPokemon } from './pokemon';
export default allPokemon;
