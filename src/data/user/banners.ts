export interface BannerConfig {
  id: string
  name: string
  imagePath: string // Flexible path (e.g., /backgrounds/lab.avif)
}

export const banners: BannerConfig[] = [
  { id: 'lab', name: "Professor's Lab", imagePath: '/backgrounds/lab.avif' },
  { id: 'grassy-route', name: 'Grassy Route', imagePath: '/backgrounds/forest.avif' },
  { id: 'ss-anne', name: 'S.S. Anne', imagePath: '/backgrounds/ss-anne.avif' },
  {
    id: 'celadon-game-corner',
    name: 'Celadon Game Corner',
    imagePath: '/backgrounds/game-corner.avif',
  },
  {
    id: 'chronicle-brock',
    name: 'Pewter Hearth',
    imagePath: '/backgrounds/chronicle-brock-family-kitchen.avif',
  },
  {
    id: 'chronicle-misty',
    name: 'Cerulean Water Show',
    imagePath: '/backgrounds/chronicle-misty-water-theater.avif',
  },
  {
    id: 'chronicle-surge',
    name: 'Vermilion Blackout',
    imagePath: '/backgrounds/chronicle-surge-blackout-streets.avif',
  },
  {
    id: 'chronicle-erika',
    name: 'Celadon Flower Show',
    imagePath: '/backgrounds/chronicle-erika-flower-exhibition.avif',
  },
  {
    id: 'chronicle-koga',
    name: 'Fuchsia Courtyard',
    imagePath: '/backgrounds/chronicle-koga-training-courtyard.avif',
  },
  {
    id: 'chronicle-sabrina',
    name: 'Quiet Mindscape',
    imagePath: '/backgrounds/chronicle-sabrina-quiet-mindscape.avif',
  },
  {
    id: 'chronicle-blaine',
    name: 'Cinnabar Quiz Room',
    imagePath: '/backgrounds/chronicle-blaine-abandoned-quiz-room.avif',
  },
  {
    id: 'chronicle-giovanni',
    name: 'Viridian Dining Room',
    imagePath: '/backgrounds/chronicle-giovanni-family-dining-room.avif',
  },
]

export function getBanner(id: string): BannerConfig | undefined {
  return banners.find((b) => b.id === id)
}
