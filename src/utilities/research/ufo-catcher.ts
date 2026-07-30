import type {
  UfoCatcherPlacedPrize,
  UfoCatcherPrizeTier,
  UfoCatcherSettings,
} from '@/data/games/ufo-catcher'

export interface UfoCatcherControlInput {
  xHoldMs: number
  yHoldMs: number
}

export interface UfoCatcherCoordinates {
  x: number
  y: number
}

export type UfoCatcherResolution =
  | {
      outcome: 'miss'
      coordinates: UfoCatcherCoordinates
      gripChance: 0
    }
  | {
      outcome: 'slip' | 'caught'
      coordinates: UfoCatcherCoordinates
      prize: UfoCatcherPlacedPrize
      gripChance: number
    }

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function getUfoCatcherCoordinates(
  settings: Pick<UfoCatcherSettings, 'board' | 'xTravelMs' | 'yTravelMs'>,
  input: UfoCatcherControlInput,
): UfoCatcherCoordinates | null {
  if (
    !Number.isFinite(input.xHoldMs) ||
    !Number.isFinite(input.yHoldMs) ||
    input.xHoldMs < 0 ||
    input.yHoldMs < 0 ||
    input.xHoldMs > settings.xTravelMs ||
    input.yHoldMs > settings.yTravelMs
  ) {
    return null
  }

  const { clawBounds } = settings.board
  const xProgress = clamp(input.xHoldMs / settings.xTravelMs, 0, 1)
  const yProgress = clamp(input.yHoldMs / settings.yTravelMs, 0, 1)

  return {
    x: clawBounds.minX + xProgress * (clawBounds.maxX - clawBounds.minX),
    // The cabinet starts at the front edge. Holding the second control sends
    // the claw away from the player toward the back of the cabinet.
    y: clawBounds.maxY - yProgress * (clawBounds.maxY - clawBounds.minY),
  }
}

export function selectUfoCatcherTier(
  tiers: UfoCatcherPrizeTier[],
  roll: number,
): UfoCatcherPrizeTier {
  const normalizedRoll = clamp(roll, 0, 0.999999999)
  const totalWeight = tiers.reduce((total, tier) => total + tier.weight, 0)
  let cursor = normalizedRoll * totalWeight

  for (const tier of tiers) {
    cursor -= tier.weight
    if (cursor < 0) return tier
  }

  return tiers[tiers.length - 1]
}

export function selectUfoCatcherPrizePool(
  tiers: UfoCatcherPrizeTier[],
  rolls: number[],
  count: number,
) {
  const available = [...tiers]
  const selected: UfoCatcherPrizeTier[] = []
  const safeCount = Math.min(Math.max(Math.floor(count), 0), available.length)

  for (let index = 0; index < safeCount; index += 1) {
    const tier = selectUfoCatcherTier(available, rolls[index] ?? 0)
    selected.push(tier)
    available.splice(
      available.findIndex((entry) => entry.id === tier.id),
      1,
    )
  }

  return selected
}

export function getEligibleUfoCatcherTiers(
  tiers: UfoCatcherPrizeTier[],
  unlocks: {
    unlockedIcons?: unknown
    unlockedTitles?: unknown
  },
) {
  const unlockedIcons = new Set(
    Array.isArray(unlocks.unlockedIcons)
      ? unlocks.unlockedIcons.filter(
          (iconId): iconId is string => typeof iconId === 'string',
        )
      : [],
  )
  const unlockedTitles = new Set(
    Array.isArray(unlocks.unlockedTitles)
      ? unlocks.unlockedTitles.filter(
          (titleId): titleId is string => typeof titleId === 'string',
        )
      : [],
  )

  return tiers.filter((tier) => {
    const reward = tier.rewards[0]
    const targetId = reward?.targetId?.toString()
    if (!targetId) return true
    if (reward.type === 'icon') return !unlockedIcons.has(targetId)
    if (reward.type === 'title') return !unlockedTitles.has(targetId)
    return true
  })
}

export function buildUfoCatcherPrizeLayout({
  settings,
  tierRolls,
  anchorRolls,
  jitterRolls,
}: {
  settings: UfoCatcherSettings
  tierRolls: number[]
  anchorRolls: number[]
  jitterRolls: Array<{ x: number; y: number }>
}): UfoCatcherPlacedPrize[] {
  const selectedTiers = selectUfoCatcherPrizePool(
    settings.tiers,
    tierRolls,
    settings.prizeCount,
  )
  const availableAnchors = [...settings.board.anchors]

  return selectedTiers.map((tier, index) => {
    const anchorRoll = clamp(anchorRolls[index] ?? 0, 0, 0.999999999)
    const anchorIndex = Math.floor(anchorRoll * availableAnchors.length)
    const [anchor] = availableAnchors.splice(anchorIndex, 1)
    const jitter = jitterRolls[index] ?? { x: 0.5, y: 0.5 }
    const xOffset =
      (clamp(jitter.x, 0, 0.999999999) * 2 - 1) *
      settings.board.positionJitter.x
    const yOffset =
      (clamp(jitter.y, 0, 0.999999999) * 2 - 1) *
      settings.board.positionJitter.y

    return {
      instanceId: `${anchor.id}:${tier.id}:${index}`,
      tierId: tier.id,
      label: tier.label,
      icon: tier.icon,
      rarity: tier.rarity,
      x: clamp(
        anchor.x + xOffset,
        settings.board.clawBounds.minX,
        settings.board.clawBounds.maxX,
      ),
      y: clamp(
        anchor.y + yOffset,
        settings.board.clawBounds.minY,
        settings.board.clawBounds.maxY,
      ),
      hitRadius: tier.hitRadius,
    }
  })
}

export function resolveUfoCatcherAttempt({
  settings,
  prizes,
  input,
  gripRoll,
}: {
  settings: UfoCatcherSettings
  prizes: UfoCatcherPlacedPrize[]
  input: UfoCatcherControlInput
  gripRoll: number
}): UfoCatcherResolution | null {
  const coordinates = getUfoCatcherCoordinates(settings, input)
  if (!coordinates || !Number.isFinite(gripRoll)) return null

  const candidates = prizes
    .map((prize) => {
      const distance = Math.hypot(
        coordinates.x - prize.x,
        coordinates.y - prize.y,
      )
      return {
        prize,
        normalizedDistance: distance / prize.hitRadius,
      }
    })
    .filter((candidate) => candidate.normalizedDistance <= 1)
    .sort((a, b) => a.normalizedDistance - b.normalizedDistance)

  const candidate = candidates[0]
  if (!candidate) {
    return { outcome: 'miss', coordinates, gripChance: 0 }
  }

  const tier = settings.tiers.find(
    (entry) => entry.id === candidate.prize.tierId,
  )
  if (!tier) return null

  const centering = 1 - candidate.normalizedDistance
  const curvedCentering = centering ** settings.gripCurveExponent
  const gripChance =
    tier.edgeGripChance +
    (tier.centerGripChance - tier.edgeGripChance) * curvedCentering

  return {
    outcome: clamp(gripRoll, 0, 0.999999999) < gripChance ? 'caught' : 'slip',
    coordinates,
    prize: candidate.prize,
    gripChance,
  }
}
