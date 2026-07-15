import { z } from 'zod'

// User update validation schema
export const UpdateUserSchema = z.object({
  trainerName: z.string().min(1).max(50).optional(),
  banner: z.string().optional(),
  icon: z.string().optional(),
  title: z.string().optional(),
})

// Pokemon catch validation schema
export const CatchPokemonSchema = z.object({
  speciesId: z.number().int().positive(),
  formId: z.string().default('default'),
  ball: z.string().optional(),
})

// Task completion validation schema
export const CompleteTaskSchema = z.object({
  taskId: z.string().min(1),
  count: z.number().int().min(1).default(1),
})

// Shop purchase validation schema
export const ShopPurchaseSchema = z.object({
  shopId: z.string().min(1),
  itemId: z.string().min(1),
  quantity: z.number().int().min(1).default(1),
})

// Voyage start validation schema
export const StartVoyageSchema = z.object({
  voyageId: z.string().min(1),
  pokemonIds: z.array(z.string()).min(1).max(6),
})

// Validate request body helper
export async function validateBody<T extends z.ZodSchema>(
  request: Request,
  schema: T,
): Promise<z.infer<T>> {
  const body = await request.json()
  return schema.parse(body)
}

// Validate query params helper
export function validateQuery<T extends z.ZodSchema>(
  searchParams: URLSearchParams,
  schema: T,
): z.infer<T> {
  const obj = Object.fromEntries(searchParams.entries())
  return schema.parse(obj)
}
