import type { MoveConfig } from '../types'
import { NORMAL_TM_MOVES } from './normal'
import { FIRE_TM_MOVES } from './fire'
import { WATER_TM_MOVES } from './water'
import { ELECTRIC_TM_MOVES } from './electric'
import { GRASS_TM_MOVES } from './grass'
import { ICE_TM_MOVES } from './ice'
import { FIGHTING_TM_MOVES } from './fighting'
import { POISON_TM_MOVES } from './poison'
import { GROUND_TM_MOVES } from './ground'
import { FLYING_TM_MOVES } from './flying'
import { PSYCHIC_TM_MOVES } from './psychic'
import { BUG_TM_MOVES } from './bug'
import { ROCK_TM_MOVES } from './rock'
import { GHOST_TM_MOVES } from './ghost'
import { DRAGON_TM_MOVES } from './dragon'
import { DARK_TM_MOVES } from './dark'
import { STEEL_TM_MOVES } from './steel'
import { FAIRY_TM_MOVES } from './fairy'

export * from './normal'
export * from './fire'
export * from './water'
export * from './electric'
export * from './grass'
export * from './ice'
export * from './fighting'
export * from './poison'
export * from './ground'
export * from './flying'
export * from './psychic'
export * from './bug'
export * from './rock'
export * from './ghost'
export * from './dragon'
export * from './dark'
export * from './steel'
export * from './fairy'

export const TM_MOVES_BY_TYPE: Record<string, MoveConfig[]> = {
  normal: NORMAL_TM_MOVES,
  fire: FIRE_TM_MOVES,
  water: WATER_TM_MOVES,
  electric: ELECTRIC_TM_MOVES,
  grass: GRASS_TM_MOVES,
  ice: ICE_TM_MOVES,
  fighting: FIGHTING_TM_MOVES,
  poison: POISON_TM_MOVES,
  ground: GROUND_TM_MOVES,
  flying: FLYING_TM_MOVES,
  psychic: PSYCHIC_TM_MOVES,
  bug: BUG_TM_MOVES,
  rock: ROCK_TM_MOVES,
  ghost: GHOST_TM_MOVES,
  dragon: DRAGON_TM_MOVES,
  dark: DARK_TM_MOVES,
  steel: STEEL_TM_MOVES,
  fairy: FAIRY_TM_MOVES,
}

export const ALL_TM_MOVES: MoveConfig[] = Object.values(TM_MOVES_BY_TYPE).flat()
