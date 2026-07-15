/** Project-bound illustrations generated for wide-screen field-journal panels. */
export const POKEORI_DESKTOP_ILLUSTRATIONS = {
  explore: '/ui/pokeori/desktop/explore-emblem.png',
  trainer: '/ui/pokeori/desktop/trainer-emblem.png',
  pokemon: '/ui/pokeori/desktop/pokemon-emblem.png',
  research: '/ui/pokeori/desktop/research-emblem.png',
  artisan: '/ui/pokeori/desktop/artisan-emblem.png',
  tcg: '/ui/pokeori/desktop/tcg-emblem.png',
  emptyBox: '/ui/pokeori/desktop/empty-box.png',
  emptyDex: '/ui/pokeori/desktop/empty-dex.png',
  emptyInventory: '/ui/pokeori/desktop/empty-inventory.png',
  emptySocial: '/ui/pokeori/desktop/empty-social.png',
} as const

export type PokeoriDesktopIllustration = keyof typeof POKEORI_DESKTOP_ILLUSTRATIONS
