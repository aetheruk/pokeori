import type { RequirementData } from '@/utilities/requirements'

function getSnapshotTimestamp(data?: RequirementData | null) {
  const snapshotAt = data?.snapshotAt
  if (snapshotAt) {
    const snapshotTimestamp = Date.parse(snapshotAt)
    if (Number.isFinite(snapshotTimestamp)) return snapshotTimestamp
  }

  const value = data?.user?.updatedAt
  if (!value) return Number.NaN
  return Date.parse(value)
}

export function selectFreshestGameData(
  cachedData?: RequirementData,
  serverSnapshot?: RequirementData | null,
): RequirementData | undefined {
  if (!serverSnapshot) return cachedData
  if (!cachedData) return serverSnapshot

  const cachedTimestamp = getSnapshotTimestamp(cachedData)
  const snapshotTimestamp = getSnapshotTimestamp(serverSnapshot)

  if (!Number.isFinite(cachedTimestamp)) return serverSnapshot
  if (!Number.isFinite(snapshotTimestamp)) return cachedData

  return snapshotTimestamp > cachedTimestamp ? serverSnapshot : cachedData
}
