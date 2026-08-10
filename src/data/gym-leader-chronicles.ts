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
    title: 'The Weight We Carry', playerTitle: 'Pewter Gym Leader', trainerIconId: 'gym-kanto-brock',
    trainerSprite: '/sprites/trainers/gym/kanto/brock.avif', background: '/backgrounds/chronicle-brock-quarry.avif',
    energyType: 'rock', energyAmount: 97, channelerMinLevel: 5, explorerXp: 200,
  },
  {
    key: 'misty', leaderName: 'Misty', badgeItemId: 'badge-kanto-cascade', badgeName: 'Cascade Badge',
    markerId: 'cascade-badge-memory-revealed', expeditionId: 'misty-cascade-badge-chronicle',
    title: 'Beneath the Spotlight', playerTitle: 'Cerulean Gym Leader', trainerIconId: 'gym-kanto-misty',
    trainerSprite: '/sprites/trainers/gym/kanto/misty.avif', background: '/backgrounds/chronicle-misty-water-theater.avif',
    energyType: 'water', energyAmount: 77, channelerMinLevel: 10, explorerXp: 300,
  },
  {
    key: 'surge', leaderName: 'Lt. Surge', badgeItemId: 'badge-kanto-thunder', badgeName: 'Thunder Badge',
    markerId: 'thunder-badge-memory-revealed', expeditionId: 'surge-thunder-badge-chronicle',
    title: 'The Last Flight', playerTitle: 'Vermilion Gym Leader', trainerIconId: 'gym-kanto-ltsurge',
    trainerSprite: '/sprites/trainers/gym/kanto/ltsurge.avif', background: '/backgrounds/chronicle-surge-storm-transport.avif',
    energyType: 'electric', energyAmount: 54, channelerMinLevel: 15, explorerXp: 400,
  },
  {
    key: 'erika', leaderName: 'Erika', badgeItemId: 'badge-kanto-rainbow', badgeName: 'Rainbow Badge',
    markerId: 'rainbow-badge-memory-revealed', expeditionId: 'erika-rainbow-badge-chronicle',
    title: 'The Roots Beneath Celadon', playerTitle: 'Celadon Gym Leader', trainerIconId: 'gym-kanto-erika',
    trainerSprite: '/sprites/trainers/gym/kanto/erika.avif', background: '/backgrounds/chronicle-erika-greenhouse.avif',
    energyType: 'grass', energyAmount: 64, channelerMinLevel: 20, explorerXp: 500,
  },
  {
    key: 'koga', leaderName: 'Koga', badgeItemId: 'badge-kanto-soul', badgeName: 'Soul Badge',
    markerId: 'soul-badge-memory-revealed', expeditionId: 'koga-soul-badge-chronicle',
    title: 'The Antidote', playerTitle: 'Fuchsia Gym Leader', trainerIconId: 'gym-kanto-koga',
    trainerSprite: '/sprites/trainers/gym/kanto/koga.avif', background: '/backgrounds/chronicle-koga-apothecary.avif',
    energyType: 'poison', energyAmount: 96, channelerMinLevel: 25, explorerXp: 600,
  },
  {
    key: 'sabrina', leaderName: 'Sabrina', badgeItemId: 'badge-kanto-marsh', badgeName: 'Marsh Badge',
    markerId: 'marsh-badge-memory-revealed', expeditionId: 'sabrina-marsh-badge-chronicle',
    title: 'Every Voice at Once', playerTitle: 'Saffron Gym Leader', trainerIconId: 'gym-kanto-sabrina',
    trainerSprite: '/sprites/trainers/gym/kanto/sabrina.avif', background: '/backgrounds/chronicle-sabrina-teleport-lab.avif',
    energyType: 'psychic', energyAmount: 59, channelerMinLevel: 30, explorerXp: 700,
  },
  {
    key: 'blaine', leaderName: 'Blaine', badgeItemId: 'badge-kanto-volcano', badgeName: 'Volcano Badge',
    markerId: 'volcano-badge-memory-revealed', expeditionId: 'blaine-volcano-badge-chronicle',
    title: 'The Question We Should Have Asked', playerTitle: 'Cinnabar Gym Leader', trainerIconId: 'gym-kanto-blaine',
    trainerSprite: '/sprites/trainers/gym/kanto/blaine.avif', background: '/backgrounds/chronicle-blaine-cinnabar-lab.avif',
    energyType: 'fire', energyAmount: 51, channelerMinLevel: 35, explorerXp: 800,
  },
  {
    key: 'giovanni', leaderName: 'Giovanni', badgeItemId: 'badge-kanto-earth', badgeName: 'Earth Badge',
    markerId: 'earth-badge-memory-revealed', expeditionId: 'giovanni-earth-badge-chronicle',
    title: 'The Price of Order', playerTitle: 'Viridian Gym Leader', trainerIconId: 'gym-kanto-giovanni',
    trainerSprite: '/sprites/trainers/gym/kanto/giovanni.avif', background: '/backgrounds/chronicle-giovanni-viridian-office.avif',
    energyType: 'ground', energyAmount: 81, channelerMinLevel: 40, explorerXp: 1000,
  },
] as const satisfies readonly KantoGymChronicleDefinition[]

export const KANTO_GYM_CHRONICLE_BY_KEY = new Map(
  KANTO_GYM_CHRONICLES.map((chronicle) => [chronicle.key, chronicle]),
)
