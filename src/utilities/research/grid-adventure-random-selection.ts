import type { GridObjectPlacement } from '@/data/games/grid-tiles/types'

export interface GridAdventureObjectSelectionEntry {
  key: string
  placement: Pick<GridObjectPlacement, 'randomGroup' | 'interaction'>
}

function getGroupSeed(rollSnapshot: number, groupId: string) {
  let hash = (2166136261 ^ (Math.trunc(rollSnapshot) >>> 0)) >>> 0
  for (let index = 0; index < groupId.length; index += 1) {
    hash ^= groupId.charCodeAt(index)
    hash = Math.imul(hash, 16777619) >>> 0
  }
  return hash || 0x9e3779b9
}

function createSeededRandom(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let value = state
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 0x1_0000_0000
  }
}

/**
 * Selects placements from random groups using the server-pinned run roll.
 * Ungrouped placements always remain eligible; grouped results are stable for
 * the life of a saved board and cannot be changed by client-supplied state.
 */
export function selectGridAdventureObjectKeys(
  entries: GridAdventureObjectSelectionEntry[],
  rollSnapshot: number,
) {
  const selectedKeys = new Set(
    entries
      .filter(({ placement }) => !placement.randomGroup)
      .map(({ key }) => key),
  )
  const groups = new Map<string, GridAdventureObjectSelectionEntry[]>()

  for (const entry of entries) {
    const group = entry.placement.randomGroup
    if (!group) continue
    const groupEntries = groups.get(group.id) || []
    groupEntries.push(entry)
    groups.set(group.id, groupEntries)
  }

  const selectedTargetsByPool = new Map<string, Set<string>>()
  for (const [groupId, groupEntries] of groups) {
    const randomGroup = groupEntries[0]?.placement.randomGroup
    const requestedCount = randomGroup?.selectCount || 0
    const uniquePoolId = randomGroup?.uniquePoolId
    const selectedPoolTargets = uniquePoolId
      ? selectedTargetsByPool.get(uniquePoolId) || new Set<string>()
      : undefined
    if (uniquePoolId && selectedPoolTargets) {
      selectedTargetsByPool.set(uniquePoolId, selectedPoolTargets)
    }
    const eligibleEntries = selectedPoolTargets
      ? groupEntries.filter(({ placement }) =>
          !placement.interaction?.targetId ||
          !selectedPoolTargets.has(placement.interaction.targetId),
        )
      : groupEntries
    const selectionCount = Math.min(requestedCount, eligibleEntries.length)
    const shuffled = [...eligibleEntries]
    const random = createSeededRandom(getGroupSeed(rollSnapshot, groupId))

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(random() * (index + 1))
      ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
    }

    for (const { key, placement } of shuffled.slice(0, selectionCount)) {
      selectedKeys.add(key)
      if (uniquePoolId && placement.interaction?.targetId) {
        selectedPoolTargets?.add(placement.interaction.targetId)
      }
    }
  }

  return selectedKeys
}
