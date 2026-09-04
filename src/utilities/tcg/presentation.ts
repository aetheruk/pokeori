export function getTcgCardAccessibleLabel({
  isOwned,
  name,
  number,
  slot,
}: {
  isOwned: boolean
  name: string
  number: string
  slot: number
}) {
  return isOwned
    ? `View ${name} card ${number}`
    : `Uncollected card, slot ${slot}`
}

export function getNextAutocompleteIndex({
  current,
  direction,
  count,
}: {
  current: number
  direction: 1 | -1
  count: number
}) {
  if (count <= 0) return -1
  const start = current < 0 ? (direction === 1 ? -1 : 0) : current
  return (start + direction + count) % count
}
