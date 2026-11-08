export function getUtcDateKey(dateInput: string | Date): string {
  const date = new Date(dateInput)
  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, '0'),
    String(date.getUTCDate()).padStart(2, '0'),
  ].join('-')
}

/**
 * Read a UTC-day counter while keeping existing rows usable during rollout.
 * Older activity records have no daily counter, so a record updated today
 * counts as one attempt until its next result writes the explicit counter.
 */
export function getDailyCountForToday(
  count: unknown,
  countDate: unknown,
  lastOccurredAt?: string | Date | null,
  nowInput: string | Date = new Date(),
): number {
  const today = getUtcDateKey(nowInput)
  if (countDate === today) {
    const parsedCount = Number(count)
    return Number.isFinite(parsedCount) ? Math.max(0, Math.floor(parsedCount)) : 0
  }

  return isToday(lastOccurredAt, nowInput) ? 1 : 0
}

export function incrementDailyCount(
  count: unknown,
  countDate: unknown,
  nowInput: string | Date = new Date(),
): { count: number; date: string } {
  const today = getUtcDateKey(nowInput)
  const previousCount =
    countDate === today && Number.isFinite(Number(count))
      ? Math.max(0, Math.floor(Number(count)))
      : 0

  return { count: previousCount + 1, date: today }
}

/**
 * Helper to check if a date string or Date object is inside the current UTC daily reset window.
 */
export function isToday(dateInput?: string | Date | null, nowInput: string | Date = new Date()): boolean {
  if (!dateInput) return false
  return getUtcDateKey(dateInput) === getUtcDateKey(nowInput)
}
