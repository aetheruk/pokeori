export interface BannerConfig {
  id: string
  name: string
  imagePath: string // Flexible path (e.g., /backgrounds/lab.avif)
}

export const banners: BannerConfig[] = [
  { id: 'lab', name: "Professor's Lab", imagePath: '/backgrounds/lab.avif' },
  { id: 'grassy-route', name: 'Grassy Route', imagePath: '/backgrounds/forest.avif' },
  { id: 'ss-anne', name: 'S.S. Anne', imagePath: '/backgrounds/ss-anne.avif' },
]

export function getBanner(id: string): BannerConfig | undefined {
  return banners.find((b) => b.id === id)
}
