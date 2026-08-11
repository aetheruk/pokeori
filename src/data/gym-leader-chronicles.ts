import type { PokemonTypeName } from '@/data/items/types'

export type KantoGymChronicleKey =
  | 'brock'
  | 'misty'
  | 'surge'
  | 'erika'
  | 'koga'
  | 'sabrina'
  | 'blaine'
  | 'giovanni'

export interface KantoGymChronicleDefinition {
  key: KantoGymChronicleKey
  leaderName: string
  badgeItemId: string
  badgeName: string
  markerId: string
  expeditionId: string
  title: string
  playerTitle: string
  trainerIconId: string
  trainerSprite: string
  background: string
  energyType: PokemonTypeName
  energyAmount: number
  channelerMinLevel: number
  explorerXp: number
}

export const KANTO_GYM_CHRONICLES = [
  {
    key: 'brock', leaderName: 'Brock', badgeItemId: 'badge-kanto-boulder', badgeName: 'Boulder Badge',
    markerId: 'boulder-badge-memory-revealed', expeditionId: 'brock-boulder-badge-chronicle',
    title: 'The Empty Chair', playerTitle: "Pewter's Eldest Son", trainerIconId: 'gym-kanto-brock',
    trainerSprite: '/sprites/trainers/gym/kanto/brock.avif', background: '/backgrounds/chronicle-brock-family-kitchen.avif',
    energyType: 'rock', energyAmount: 49, channelerMinLevel: 5, explorerXp: 200,
  },
  {
    key: 'misty', leaderName: 'Misty', badgeItemId: 'badge-kanto-cascade', badgeName: 'Cascade Badge',
    markerId: 'cascade-badge-memory-revealed', expeditionId: 'misty-cascade-badge-chronicle',
    title: 'Out of Step', playerTitle: "Cerulean's Youngest Sister", trainerIconId: 'gym-kanto-misty',
    trainerSprite: '/sprites/trainers/gym/kanto/misty.avif', background: '/backgrounds/chronicle-misty-water-theater.avif',
    energyType: 'water', energyAmount: 86, channelerMinLevel: 10, explorerXp: 300,
  },
  {
    key: 'surge', leaderName: 'Lt. Surge', badgeItemId: 'badge-kanto-thunder', badgeName: 'Thunder Badge',
    markerId: 'thunder-badge-memory-revealed', expeditionId: 'surge-thunder-badge-chronicle',
    title: 'After the Thunder', playerTitle: 'Vermilion Veteran', trainerIconId: 'gym-kanto-ltsurge',
    trainerSprite: '/sprites/trainers/gym/kanto/ltsurge.avif', background: '/backgrounds/chronicle-surge-blackout-streets.avif',
    energyType: 'electric', energyAmount: 70, channelerMinLevel: 15, explorerXp: 400,
  },
  {
    key: 'erika', leaderName: 'Erika', badgeItemId: 'badge-kanto-rainbow', badgeName: 'Rainbow Badge',
    markerId: 'rainbow-badge-memory-revealed', expeditionId: 'erika-rainbow-badge-chronicle',
    title: 'The Unspoken Bloom', playerTitle: "Celadon's Dutiful Daughter", trainerIconId: 'gym-kanto-erika',
    trainerSprite: '/sprites/trainers/gym/kanto/erika.avif', background: '/backgrounds/chronicle-erika-flower-exhibition.avif',
    energyType: 'grass', energyAmount: 44, channelerMinLevel: 20, explorerXp: 500,
  },
  {
    key: 'koga', leaderName: 'Koga', badgeItemId: 'badge-kanto-soul', badgeName: 'Soul Badge',
    markerId: 'soul-badge-memory-revealed', expeditionId: 'koga-soul-badge-chronicle',
    title: "The Daughter's Method", playerTitle: 'Fuchsia Gym Leader', trainerIconId: 'gym-kanto-koga',
    trainerSprite: '/sprites/trainers/gym/kanto/koga.avif', background: '/backgrounds/chronicle-koga-training-courtyard.avif',
    energyType: 'poison', energyAmount: 34, channelerMinLevel: 25, explorerXp: 600,
  },
  {
    key: 'sabrina', leaderName: 'Sabrina', badgeItemId: 'badge-kanto-marsh', badgeName: 'Marsh Badge',
    markerId: 'marsh-badge-memory-revealed', expeditionId: 'sabrina-marsh-badge-chronicle',
    title: 'The Quiet Room', playerTitle: 'The Girl Who Heard Everything', trainerIconId: 'gym-kanto-sabrina',
    trainerSprite: '/sprites/trainers/gym/kanto/sabrina.avif', background: '/backgrounds/chronicle-sabrina-quiet-mindscape.avif',
    energyType: 'psychic', energyAmount: 64, channelerMinLevel: 30, explorerXp: 700,
  },
  {
    key: 'blaine', leaderName: 'Blaine', badgeItemId: 'badge-kanto-volcano', badgeName: 'Volcano Badge',
    markerId: 'volcano-badge-memory-revealed', expeditionId: 'blaine-volcano-badge-chronicle',
    title: 'The Last Question', playerTitle: 'Cinnabar Researcher', trainerIconId: 'gym-kanto-blaine',
    trainerSprite: '/sprites/trainers/gym/kanto/blaine.avif', background: '/backgrounds/chronicle-blaine-abandoned-quiz-room.avif',
    energyType: 'fire', energyAmount: 43, channelerMinLevel: 35, explorerXp: 800,
  },
  {
    key: 'giovanni', leaderName: 'Giovanni', badgeItemId: 'badge-kanto-earth', badgeName: 'Earth Badge',
    markerId: 'earth-badge-memory-revealed', expeditionId: 'giovanni-earth-badge-chronicle',
    title: 'Dinner at Eight', playerTitle: 'Rocket Boss', trainerIconId: 'gym-kanto-giovanni',
    trainerSprite: '/sprites/trainers/gym/kanto/giovanni.avif', background: '/backgrounds/chronicle-giovanni-family-dining-room.avif',
    energyType: 'ground', energyAmount: 91, channelerMinLevel: 40, explorerXp: 1000,
  },
] as const satisfies readonly KantoGymChronicleDefinition[]

export const KANTO_GYM_CHRONICLE_BY_KEY = new Map(
  KANTO_GYM_CHRONICLES.map((chronicle) => [chronicle.key, chronicle]),
)
