import type {
  PublicTrainerSummary,
  PublicTrainerTeamMember,
} from '@/components/game/trainer/types'
import pokemonData from '@/data/pokemon-data'
import type { User } from '@/payload-types'

type PayloadLike = {
  find: (args: any) => Promise<{ docs?: any[] }>
}

type FriendRequestLike = {
  from?: string
  to?: string
  status?: string
}

type PublicTrainerSource = Pick<
  User,
  'id' | 'trainerName' | 'icon' | 'banner' | 'title' | 'skills'
>

function relationId(value: unknown): string {
  if (value && typeof value === 'object' && 'id' in value) {
    return String((value as { id: unknown }).id)
  }
  return String(value || '')
}

function displayPokemonName(
  speciesId: number,
  formId: string,
  nickname?: unknown,
) {
  if (typeof nickname === 'string' && nickname.trim()) return nickname.trim()
  const species = pokemonData.find((entry) => entry.id === speciesId)
  const form =
    species?.forms.find((entry) => String(entry.id) === formId) ||
    species?.forms[0]
  const rawName = form?.name || `Pokemon ${speciesId}`
  return rawName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export async function buildPublicTrainerSummaries({
  payload,
  trainers,
  viewer,
}: {
  payload: PayloadLike
  trainers: PublicTrainerSource[]
  viewer: User
}): Promise<PublicTrainerSummary[]> {
  if (trainers.length === 0) return []

  const trainerIds = trainers.map((trainer) => String(trainer.id))
  const [tcgResult, pokedexResult, teamResult] = await Promise.all([
    payload.find({
      collection: 'user-tcg-cards',
      where: { user: { in: trainerIds } },
      pagination: false,
      depth: 0,
      overrideAccess: true,
      select: { user: true, cardId: true },
    }),
    payload.find({
      collection: 'user-pokedex-entries',
      where: { user: { in: trainerIds } },
      pagination: false,
      depth: 0,
      overrideAccess: true,
      select: { user: true, seen: true, caught: true },
    }),
    payload.find({
      collection: 'pokemon',
      where: {
        and: [{ user: { in: trainerIds } }, { onBattleTeam: { equals: true } }],
      },
      pagination: false,
      depth: 0,
      overrideAccess: true,
      sort: 'battleTeamPosition',
      select: {
        user: true,
        speciesId: true,
        formId: true,
        name: true,
        level: true,
        rarity: true,
        battleTeamPosition: true,
      },
    }),
  ])

  const cardIdsByTrainer = new Map<string, Set<string>>()
  for (const row of tcgResult.docs || []) {
    const userId = relationId(row.user)
    const cardIds = cardIdsByTrainer.get(userId) || new Set<string>()
    if (row.cardId) cardIds.add(String(row.cardId))
    cardIdsByTrainer.set(userId, cardIds)
  }

  const pokedexCounts = new Map<string, { seen: number; caught: number }>()
  for (const row of pokedexResult.docs || []) {
    const userId = relationId(row.user)
    const counts = pokedexCounts.get(userId) || { seen: 0, caught: 0 }
    if (row.seen || row.caught) counts.seen += 1
    if (row.caught) counts.caught += 1
    pokedexCounts.set(userId, counts)
  }

  const teamByTrainer = new Map<string, PublicTrainerTeamMember[]>()
  for (const row of teamResult.docs || []) {
    const userId = relationId(row.user)
    const speciesId = Number(row.speciesId)
    const formId = String(row.formId || speciesId)
    const team = teamByTrainer.get(userId) || []
    team.push({
      speciesId,
      formId,
      name: displayPokemonName(speciesId, formId, row.name),
      level: Math.max(1, Number(row.level) || 1),
      rarity: typeof row.rarity === 'string' ? row.rarity : null,
      position: Math.max(1, Number(row.battleTeamPosition) || team.length + 1),
    })
    teamByTrainer.set(userId, team)
  }

  const viewerFriends = new Set(((viewer as any).friends || []).map(String))
  const viewerRequests = ((viewer as any).friendRequests ||
    []) as FriendRequestLike[]

  return trainers.map((trainer) => {
    const id = String(trainer.id)
    const counts = pokedexCounts.get(id) || { seen: 0, caught: 0 }
    return {
      id,
      trainerName: trainer.trainerName || 'Trainer',
      icon: (trainer as any).icon || 'ditto',
      banner: (trainer as any).banner || 'lab',
      title: (trainer as any).title || 'new-beginnings',
      skills: trainer.skills,
      battleTeam: (teamByTrainer.get(id) || []).sort(
        (a, b) => a.position - b.position,
      ),
      stats: {
        uniqueCards: cardIdsByTrainer.get(id)?.size || 0,
        pokedexSeen: counts.seen,
        pokedexCaught: counts.caught,
      },
      isFriend: viewerFriends.has(id),
      hasPendingRequest: viewerRequests.some(
        (request) =>
          request.status === 'pending' &&
          ((request.from === viewer.id && request.to === id) ||
            (request.from === id && request.to === viewer.id)),
      ),
    }
  })
}
