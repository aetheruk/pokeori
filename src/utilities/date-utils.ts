export function getUtcDateKey(dateInput: string | Date): string {
  const date = new Date(dateInput)
  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, '0'),
    String(date.getUTCDate()).padStart(2, '0'),
  ].join('-')
}

/**
 * Helper to check if a date string or Date object is inside the current UTC daily reset window.
 */
export function isToday(dateInput?: string | Date | null, nowInput: string | Date = new Date()): boolean {
  if (!dateInput) return false
  return getUtcDateKey(dateInput) === getUtcDateKey(nowInput)
}
