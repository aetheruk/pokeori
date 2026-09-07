import type { ArcadeInput } from './arcade-authority'

/** Authored angles may use signed degrees (Onix starts at -90). Predict and
 * record the same canonical angle required by the server's input protocol. */
export function normalizeArcadeInput(input: ArcadeInput): ArcadeInput {
  if (input.kind !== 'heading' || !Number.isFinite(input.value)) return input
  return { ...input, value: ((input.value! % 360) + 360) % 360 }
}
