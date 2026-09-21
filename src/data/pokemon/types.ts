export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  'special-attack': number;
  'special-defense': number;
  speed: number;
}

export interface PokemonForm {
  id: string;
  height: number;
  weight: number;
  base_experience: number; // Can be 0 if unknown
  name: string;
  form: string;
  types: string[];
  stats: PokemonStats;
}

export type PokemonGrowthRate =
  | 'slow'
  | 'medium'
  | 'fast'
  | 'medium-slow'
  | 'slow-then-very-fast'
  | 'fast-then-very-slow';

export interface PokemonSpecies {
  id: number;
  growth_rate: PokemonGrowthRate;
  capture_rate: number;
  gender_rate: number; // -1 = genderless, 0 = all male, 8 = all female, otherwise female eighths
  has_gender_differences: boolean;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  habitat?: string;
  shape?: string;
  color?: string;
  forms: PokemonForm[];
}

export type PokemonData = PokemonSpecies[];
