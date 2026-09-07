import { z } from 'zod'

export const PokemonBoxQuery = z.object({
  page: z.number().int().min(1).max(100_000).default(1),
  limit: z.number().int().min(1).max(80).default(24),
  boxId: z.string().min(1).max(120).nullable().optional(),
})

// Original-trainer display needs only identity, not email, economy or progress.
export const POKEMON_BOX_POPULATE = { users: { trainerName: true } } as const
