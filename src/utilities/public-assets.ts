export function getPublicAssetDirectory() {
  const directory =
    Bun.env.POKEORI_PUBLIC_DIR ||
    (Bun.env.PWD ? `${Bun.env.PWD.replace(/\/$/, '')}/public` : undefined)

  if (!directory) {
    throw new Error('Set POKEORI_PUBLIC_DIR or run from a directory that exposes PWD.')
  }

  return directory
}
