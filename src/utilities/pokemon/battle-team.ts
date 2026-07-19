export const MAX_BATTLE_TEAM_SIZE = 6

export interface BattleTeamPlacement {
  pokemonId: string
  position: number
}

export function isValidBattleTeamPosition(
  position: unknown,
): position is number {
  return (
    typeof position === 'number' &&
    Number.isInteger(position) &&
    position >= 1 &&
    position <= MAX_BATTLE_TEAM_SIZE
  )
}

export function validateBattleTeamPlacements(
  placements: unknown,
  expectedPokemonIds: readonly string[],
  allowedPositions?: readonly unknown[],
):
  | { valid: true; placements: BattleTeamPlacement[] }
  | { valid: false; message: string } {
  if (!Array.isArray(placements)) {
    return { valid: false, message: 'Invalid battle team layout' }
  }

  if (
    placements.length === 0 ||
    placements.length > MAX_BATTLE_TEAM_SIZE
  ) {
    return { valid: false, message: 'Invalid battle team size' }
  }

  const normalized: BattleTeamPlacement[] = []
  const positions = new Set<number>()
  const pokemonIds = new Set<string>()

  for (const placement of placements) {
    if (!placement || typeof placement !== 'object') {
      return { valid: false, message: 'Invalid battle team layout' }
    }

    const candidate = placement as Record<string, unknown>
    const pokemonId = candidate.pokemonId
    const position = candidate.position

    if (
      typeof pokemonId !== 'string' ||
      pokemonId.length === 0 ||
      !isValidBattleTeamPosition(position)
    ) {
      return { valid: false, message: 'Invalid battle team placement' }
    }

    if (pokemonIds.has(pokemonId) || positions.has(position)) {
      return { valid: false, message: 'Duplicate battle team placement' }
    }

    pokemonIds.add(pokemonId)
    positions.add(position)
    normalized.push({ pokemonId, position })
  }

  const expectedIds = new Set(expectedPokemonIds)
  if (
    expectedIds.size !== expectedPokemonIds.length ||
    normalized.length !== expectedIds.size ||
    normalized.some(({ pokemonId }) => !expectedIds.has(pokemonId))
  ) {
    return { valid: false, message: 'Battle team is out of date' }
  }

  if (allowedPositions !== undefined) {
    const currentPositions = new Set<number>()
    for (const position of allowedPositions) {
      if (!isValidBattleTeamPosition(position) || currentPositions.has(position)) {
        return { valid: false, message: 'Invalid current battle team layout' }
      }
      currentPositions.add(position)
    }

    if (
      currentPositions.size !== normalized.length ||
      normalized.some(({ position }) => !currentPositions.has(position))
    ) {
      return {
        valid: false,
        message: 'Battle team cards may only swap occupied slots',
      }
    }
  }

  return { valid: true, placements: normalized }
}
