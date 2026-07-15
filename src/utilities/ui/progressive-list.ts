export function getVisibleItems<T>(
  items: readonly T[],
  visibleCount: number,
): T[] {
  return items.slice(0, Math.max(0, visibleCount))
}
