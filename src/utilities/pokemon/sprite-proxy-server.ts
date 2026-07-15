const POKEAPI_SPRITES_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites'
const VALID_ID = /^[a-zA-Z0-9-]+$/

function getPokemonSpriteUrl(params: URLSearchParams) {
  const id = params.get('id')
  if (!id || !VALID_ID.test(id)) return null

  const variant = params.get('variant') || 'default'
  const shiny = params.get('shiny') === '1'
  const back = params.get('back') === '1'
  const shinySegment = shiny ? 'shiny/' : ''

  if (variant === 'showdown') {
    const backSegment = back ? 'back/' : ''
    return `${POKEAPI_SPRITES_BASE}/pokemon/other/showdown/${backSegment}${shinySegment}${id}.gif`
  }

  if (variant === 'home') {
    return `${POKEAPI_SPRITES_BASE}/pokemon/other/home/${shinySegment}${id}.png`
  }

  if (variant === 'default') {
    return `${POKEAPI_SPRITES_BASE}/pokemon/${shinySegment}${id}.png`
  }

  return null
}

export function getRemoteSpriteUrl(params: URLSearchParams) {
  const resource = params.get('resource')

  return resource === 'pokemon' ? getPokemonSpriteUrl(params) : null
}
