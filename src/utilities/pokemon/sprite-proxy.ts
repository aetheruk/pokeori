export function getPokemonTypeIconUrl(typeId: string | number, tera = false): string {
  const variant = tera ? 'tera' : 'default'
  const normalizedTypeId = String(typeId) === '10002' ? '10001' : String(typeId)
  return `/sprites/types/${variant}/${normalizedTypeId}.avif`
}
