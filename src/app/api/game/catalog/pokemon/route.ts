import pokemonData from '@/data/pokemon-data'
import {
  catalogResponse,
  parseCatalogPage,
} from '@/utilities/catalog-response'

export const dynamic = 'force-dynamic'

export function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams
  const id = Number(searchParams.get('id'))
  const { limit, offset } = parseCatalogPage(searchParams)

  if (Number.isInteger(id) && id > 0) {
    const pokemon = pokemonData.find((entry) => entry.id === id)
    return catalogResponse(pokemon ? [pokemon] : [], pokemon ? 1 : 0, 0, limit)
  }

  const query = (searchParams.get('q') || '').trim().toLowerCase().slice(0, 80)
  const summaries = pokemonData
    .map((pokemon) => {
      const form =
        pokemon.forms.find((entry) => entry.form === 'base') || pokemon.forms[0]
      return form
        ? {
            id: pokemon.id,
            formId: form.id,
            name: form.name,
            types: form.types,
          }
        : null
    })
    .filter(
      (
        pokemon,
      ): pokemon is {
        id: number
        formId: string
        name: string
        types: string[]
      } =>
        Boolean(
          pokemon &&
            (!query ||
              pokemon.name.toLowerCase().includes(query) ||
              String(pokemon.id) === query),
        ),
    )

  return catalogResponse(
    summaries.slice(offset, offset + limit),
    summaries.length,
    offset,
    limit,
  )
}
