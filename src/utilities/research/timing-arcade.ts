import type { ArcadeInput, ArcadeSimulation } from './arcade-authority'

export interface TimingSimulation {
  rhythmIcons: Array<{ id: number; iconIndex: number; x: number }>
  nextRhythm: number
  lastHit: { type: string; tick: number } | null
}

function random(sim: ArcadeSimulation) {
  sim.rng = (Math.imul(sim.rng, 1664525) + 1013904223) >>> 0
  return sim.rng / 4294967296
}
function range(sim: ArcadeSimulation, value: { min: number; max: number }) {
  return value.min + random(sim) * (value.max - value.min)
}
export function initializeTiming(sim: ArcadeSimulation, settings: any) {
  sim.nextRhythm = Math.max(1, Math.round(range(sim, settings.spawnRate) * 60))
}

/** A fixed 300px logical track makes timing independent of viewport width. */
export function stepTiming(
  sim: ArcadeSimulation,
  settings: any,
  inputs: ArcadeInput[],
) {
  sim.rhythmIcons = sim.rhythmIcons.map((icon) => ({
    ...icon,
    x: icon.x + settings.speed / 60,
  }))
  if (sim.tick >= sim.nextRhythm) {
    sim.rhythmIcons.push({
      id: sim.nextId++,
      iconIndex: Math.floor(random(sim) * settings.icons.length),
      x: 0,
    })
    sim.nextRhythm =
      sim.tick + Math.max(1, Math.round(range(sim, settings.spawnRate) * 60))
  }
  for (const input of inputs) {
    if (input.kind !== 'rhythm' || input.tick !== sim.tick) continue
    const matching = sim.rhythmIcons.filter(
      (icon) => icon.iconIndex === input.value,
    )
    const closest = matching.sort(
      (a, b) => Math.abs(a.x + 32 - 255) - Math.abs(b.x + 32 - 255),
    )[0]
    const distance = closest ? Math.abs(closest.x + 32 - 255) : Infinity
    const [type, points] =
      distance <= 8
        ? ['PERFECT', 30]
        : distance <= 23
          ? ['GREAT', 20]
          : distance <= 33
            ? ['GOOD', 10]
            : ['MISS', -15]
    sim.score += points as number
    sim.lastHit = { type: type as string, tick: sim.tick }
    if (closest)
      sim.rhythmIcons = sim.rhythmIcons.filter((icon) => icon.id !== closest.id)
  }
  sim.rhythmIcons = sim.rhythmIcons.filter((icon) => {
    if (icon.x <= 300) return true
    sim.score -= 15
    sim.lastHit = { type: 'MISS', tick: sim.tick }
    return false
  })
  if (!settings.endless?.enabled && sim.score >= (settings.winScore || 100))
    sim.status = 'won'
  if (
    sim.status === 'playing' &&
    ((settings.timeLimit && sim.tick >= settings.timeLimit * 60) ||
      sim.tick >= 432000)
  )
    sim.status = 'lost'
  return sim
}
