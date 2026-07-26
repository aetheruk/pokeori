import { getAllMoves, getMove } from '@/data/moves'
import {
  catalogResponse,
  parseCatalogPage,
} from '@/utilities/catalog-response'

export const dynamic = 'force-dynamic'

export function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams
  const id = (searchParams.get('id') || '').trim()
  const { limit, offset } = parseCatalogPage(searchParams)
  if (id) {
    const move = getMove(id)
    return catalogResponse(move ? [move] : [], move ? 1 : 0, 0, limit)
  }

  const query = (searchParams.get('q') || '').trim().toLowerCase().slice(0, 80)
  const moves = getAllMoves()
    .filter(
      (move) =>
        !query ||
        move.id.toLowerCase().includes(query) ||
        move.name.toLowerCase().includes(query),
    )
    .map((move) => ({
      id: move.id,
      name: move.name,
      type: move.forcedType,
      stance: move.stance,
      damage: move.damage,
    }))

  return catalogResponse(
    moves.slice(offset, offset + limit),
    moves.length,
    offset,
    limit,
  )
}
