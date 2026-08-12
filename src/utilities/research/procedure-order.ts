export interface ProcedureOrderConstraint {
  before: string
  after: string
}

const PROCEDURE_ORDER_SOLUTIONS: Record<string, ProcedureOrderConstraint[]> = {
  'chronicle-v2-brock-share-the-morning': [
    { before: 'check-medicine', after: 'serve-breakfast' },
    { before: 'heat-breakfast', after: 'serve-breakfast' },
    { before: 'serve-breakfast', after: 'pack-lunches' },
    { before: 'wake-forrest', after: 'check-school-bags' },
    { before: 'check-school-bags', after: 'leave-for-school' },
    { before: 'pack-lunches', after: 'leave-for-school' },
    { before: 'feed-geodude', after: 'leave-for-school' },
  ],
  'chronicle-v2-erika-prepare-sumis-fragrance': [
    { before: 'inspect-petals', after: 'rinse-petals' },
    { before: 'rinse-petals', after: 'bruise-petals' },
    { before: 'sterilise-vial', after: 'filter-extract' },
    { before: 'bruise-petals', after: 'steep-petals' },
    { before: 'measure-oil', after: 'steep-petals' },
    { before: 'steep-petals', after: 'filter-extract' },
    { before: 'filter-extract', after: 'label-sumis-formula' },
  ],
  'chronicle-v2-blaine-emergency-shutdown': [
    { before: 'sound-alarm', after: 'clear-corridor' },
    { before: 'clear-corridor', after: 'seal-fire-door' },
    { before: 'cut-fuel-feed', after: 'vent-chamber' },
    { before: 'seal-fire-door', after: 'vent-chamber' },
    { before: 'vent-chamber', after: 'cool-containment' },
    { before: 'cool-containment', after: 'check-pokemon' },
    { before: 'check-pokemon', after: 'record-readings' },
  ],
}

export function getProcedureOrderConstraints(
  encounterId: string,
): ProcedureOrderConstraint[] | null {
  return PROCEDURE_ORDER_SOLUTIONS[encounterId] || null
}

export function validateProcedureOrder(params: {
  encounterId: string
  cardIds: string[]
  configuredCardIds: string[]
}): boolean {
  const constraints = getProcedureOrderConstraints(params.encounterId)
  if (!constraints) return false

  const expected = new Set(params.configuredCardIds)
  if (
    params.cardIds.length !== expected.size ||
    new Set(params.cardIds).size !== expected.size ||
    params.cardIds.some((id) => !expected.has(id))
  ) {
    return false
  }

  const positions = new Map(params.cardIds.map((id, index) => [id, index]))
  return constraints.every(({ before, after }) => {
    const beforeIndex = positions.get(before)
    const afterIndex = positions.get(after)
    return (
      typeof beforeIndex === 'number' &&
      typeof afterIndex === 'number' &&
      beforeIndex < afterIndex
    )
  })
}
