/** Interpolate only the server's recorded path; this never resolves prizes. */
export function samplePachinkoPosition(positions: Array<[number, number]>, elapsed: number, interval: number): [number, number] | null {
  if (!positions.length || interval <= 0) return null
  const frame = Math.max(0, elapsed / interval)
  const index = Math.min(positions.length - 1, Math.floor(frame))
  const from = positions[index]
  const to = positions[Math.min(positions.length - 1, index + 1)]
  const fraction = Math.min(1, frame - index)
  return [from[0] + (to[0] - from[0]) * fraction, from[1] + (to[1] - from[1]) * fraction]
}
