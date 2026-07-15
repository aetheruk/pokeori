export function mergeSummaries(a: any, b: any) {
  const result: any = { ...a }
  if (!b) return result

  // Helper to merge lists of rewards
  const mergeList = (
    targetList: any[] = [],
    sourceList: any[] = [],
    idKey: string = 'id',
    quantityKey: string = 'quantity',
  ) => {
    const merged = [...targetList]
    if (!Array.isArray(sourceList)) return merged

    for (const item of sourceList) {
      if (!item) continue
      const existingIndex = merged.findIndex((m) => m[idKey] === item[idKey])
      if (existingIndex >= 0) {
        // Update quantity
        merged[existingIndex] = {
          ...merged[existingIndex],
          [quantityKey]: (merged[existingIndex][quantityKey] || 0) + (item[quantityKey] || 0),
        }
      } else {
        merged.push(item)
      }
    }
    return merged
  }

  // 1. Currency
  if (b.currency) {
    result.currency = mergeList(result.currency, b.currency, 'name', 'quantity')
  }

  if (b.items) {
    result.items = mergeList(result.items, b.items, 'id', 'quantity')
  }

  if (b.xp) {
    result.xp = mergeList(result.xp, b.xp, 'name', 'quantity')
  }

  if (b.pokemon) {
    result.pokemon = [...(result.pokemon || []), ...b.pokemon]
  }

  if (b.cards) {
    result.cards = [...(result.cards || []), ...b.cards]
  }

  return result
}
