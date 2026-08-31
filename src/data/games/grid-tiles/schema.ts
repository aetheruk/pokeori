import { z } from 'zod'
import { getGridObjectDefinition } from './objects'
import type { GridObjectLibrary } from './types'

const gridPositionSchema = z
  .object({ x: z.number().int().nonnegative(), y: z.number().int().nonnegative() })
  .strict()

const gridTileAssetSchema = z
  .object({
    src: z.string().min(1),
    frameGrid: z
      .object({ cols: z.number().int().positive(), rows: z.number().int().positive() })
      .strict()
      .optional(),
  })
  .strict()

const gridObjectInteractionSchema = z
  .object({
    type: z.enum(['battle', 'encounter']),
    targetId: z.string().min(1).max(120),
    victory: z.enum(['win', 'clear']),
  })
  .strict()

export const gridFloorRenderConfigSchema = z
  .object({
    seed: z.string().min(1).max(120).optional(),
    rareChance: z.number().min(0).max(1).optional(),
  })
  .strict()

export const gridTileRenderConfigSchema = z
  .object({
    spriteSetId: z.string().min(1).max(80),
    floor: gridFloorRenderConfigSchema.optional(),
  })
  .strict()

export const gridTilePaletteSchema = z
  .object({
    id: z.string().min(1).max(80),
    name: z.string().min(1).max(120),
    logicalTileSize: z.literal(16),
    nativeTileSize: z
      .number()
      .int()
      .min(16)
      .max(1024)
      .refine((size) => size % 16 === 0, 'Native tile size must be a multiple of the logical 16px cell'),
  })
  .passthrough()

export const gridObjectDefinitionSchema = z
  .object({
    id: z.string().min(1).max(80),
    name: z.string().min(1).max(120),
    purpose: z.string().min(1).max(80),
    size: z
      .object({ cols: z.number().int().min(1).max(16), rows: z.number().int().min(1).max(16) })
      .strict(),
    asset: gridTileAssetSchema,
    collision: z.enum(['none', 'solid', 'pushable']).optional(),
    interaction: z.enum(['battle', 'encounter']).optional(),
    properties: z.record(z.string(), z.unknown()).optional(),
  })
  .strict()

export const gridObjectLibrarySchema = z.record(z.string(), gridObjectDefinitionSchema)

export const gridBlockerPlacementSchema = gridPositionSchema
  .extend({
    id: z.string().min(1).max(80).optional(),
    size: z.union([z.literal(1), z.literal(2)]),
  })
  .strict()

export const gridObjectPlacementSchema = gridPositionSchema
  .extend({
    id: z.string().min(1).max(80).optional(),
    objectId: z.string().min(1).max(80),
    interaction: gridObjectInteractionSchema.optional(),
    properties: z.record(z.string(), z.unknown()).optional(),
  })
  .strict()

export const gridSceneConfigSchema = z
  .object({
    cols: z.number().int().min(1).max(100),
    rows: z.number().int().min(1).max(100),
    rendering: gridTileRenderConfigSchema,
    walls: z.array(gridPositionSchema).optional(),
    blockers: z.array(gridBlockerPlacementSchema).optional(),
    objects: z.array(gridObjectPlacementSchema).optional(),
  })
  .strict()
  .superRefine((scene, ctx) => {
    const occupied = new Set<string>()
    const checkCell = (x: number, y: number, path: (string | number)[]) => {
      if (x >= scene.cols || y >= scene.rows) {
        ctx.addIssue({ code: 'custom', path, message: 'Placement must fit inside the grid' })
      }
    }
    scene.walls?.forEach((wall, index) => checkCell(wall.x, wall.y, ['walls', index]))
    scene.blockers?.forEach((blocker, index) => {
      for (let offsetY = 0; offsetY < blocker.size; offsetY += 1) {
        for (let offsetX = 0; offsetX < blocker.size; offsetX += 1) {
          const x = blocker.x + offsetX
          const y = blocker.y + offsetY
          checkCell(x, y, ['blockers', index])
          const key = `${x},${y}`
          if (occupied.has(key)) {
            ctx.addIssue({ code: 'custom', path: ['blockers', index], message: 'Blockers cannot overlap' })
          }
          occupied.add(key)
        }
      }
    })
    scene.objects?.forEach((object, index) => checkCell(object.x, object.y, ['objects', index]))
  })

/** Adds object-id, footprint, and wall/blocker overlap checks for a concrete library. */
export function createGridSceneConfigSchema(objectLibrary: GridObjectLibrary) {
  return gridSceneConfigSchema.superRefine((scene, ctx) => {
    const occupied = new Set<string>()
    scene.blockers?.forEach((blocker) => {
      for (let offsetY = 0; offsetY < blocker.size; offsetY += 1) {
        for (let offsetX = 0; offsetX < blocker.size; offsetX += 1) {
          occupied.add(`${blocker.x + offsetX},${blocker.y + offsetY}`)
        }
      }
    })
    scene.objects?.forEach((object, index) => {
      const definition = getGridObjectDefinition(objectLibrary, object.objectId)
      if (!definition) {
        ctx.addIssue({ code: 'custom', path: ['objects', index, 'objectId'], message: 'Unknown object id' })
        return
      }
      if (definition.interaction && !object.interaction) {
        ctx.addIssue({
          code: 'custom',
          path: ['objects', index, 'interaction'],
          message: 'Interactive objects require a placement interaction',
        })
      }
      if (object.interaction && definition.interaction !== object.interaction.type) {
        ctx.addIssue({
          code: 'custom',
          path: ['objects', index, 'interaction', 'type'],
          message: 'Placement interaction does not match the object type',
        })
      }
      for (let offsetY = 0; offsetY < definition.size.rows; offsetY += 1) {
        for (let offsetX = 0; offsetX < definition.size.cols; offsetX += 1) {
          const x = object.x + offsetX
          const y = object.y + offsetY
          if (x >= scene.cols || y >= scene.rows) {
            ctx.addIssue({ code: 'custom', path: ['objects', index], message: 'Object footprint must fit inside the grid' })
          }
          const key = `${x},${y}`
          if (occupied.has(key)) {
            ctx.addIssue({ code: 'custom', path: ['objects', index], message: 'Objects cannot overlap blockers or other objects' })
          }
          occupied.add(key)
        }
      }
    })
  })
}
