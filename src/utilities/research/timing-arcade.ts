import type { ArcadeInput, ArcadeSimulation } from './arcade-authority'

export interface TimingSimulation {
  rhythmIcons: Array<{ id: number; iconIndex: number; x: number }>
  nextRhythm: number
  miningPosition: number
  miningDirection: number
  miningSpeed: number
  targetStart: number
  targetSize: number
  hp: number
  swings: number
  lastHit: { type: string; tick: number } | null
}

function random(sim: ArcadeSimulation) {
  sim.rng = (Math.imul(sim.rng, 1664525) + 1013904223) >>> 0
  return sim.rng / 4294967296
}
function range(sim: ArcadeSimulation, value: { min: number; max: number }) {
  return value.min + random(sim) * (value.max - value.min)
}
function target(sim: ArcadeSimulation, settings: any) {
  sim.targetSize = range(sim, settings.targetSize)
  sim.targetStart = random(sim) * (100 - sim.targetSize)
  sim.miningSpeed = range(sim, settings.speed)
}
export function initializeTiming(sim: ArcadeSimulation, game: string, settings: any) {
  if (game === 'mining') target(sim, settings)
  if (game === 'rhythm') sim.nextRhythm = Math.max(1, Math.round(range(sim, settings.spawnRate) * 60))
}

/** A fixed 300px logical track makes timing independent of viewport width. */
export function stepTiming(sim: ArcadeSimulation, game: 'rhythm' | 'mining', settings: any, inputs: ArcadeInput[]) {
  if (game === 'rhythm') {
    sim.rhythmIcons = sim.rhythmIcons.map((icon) => ({ ...icon, x: icon.x + settings.speed / 60 }))
    if (sim.tick >= sim.nextRhythm) {
      sim.rhythmIcons.push({ id: sim.nextId++, iconIndex: Math.floor(random(sim) * settings.icons.length), x: 0 })
      sim.nextRhythm = sim.tick + Math.max(1, Math.round(range(sim, settings.spawnRate) * 60))
    }
    for (const input of inputs) {
      if (input.kind !== 'rhythm' || input.tick !== sim.tick) continue
      const matching = sim.rhythmIcons.filter((icon) => icon.iconIndex === input.value)
      const closest = matching.sort((a, b) => Math.abs(a.x + 32 - 255) - Math.abs(b.x + 32 - 255))[0]
      const distance = closest ? Math.abs(closest.x + 32 - 255) : Infinity
      const [type, points] = distance <= 8 ? ['PERFECT', 30] : distance <= 23 ? ['GREAT', 20] : distance <= 33 ? ['GOOD', 10] : ['MISS', -15]
      sim.score += points as number
      sim.lastHit = { type: type as string, tick: sim.tick }
      if (closest) sim.rhythmIcons = sim.rhythmIcons.filter((icon) => icon.id !== closest.id)
    }
    sim.rhythmIcons = sim.rhythmIcons.filter((icon) => {
      if (icon.x <= 300) return true
      sim.score -= 15
      sim.lastHit = { type: 'MISS', tick: sim.tick }
      return false
    })
    if (!settings.endless?.enabled && sim.score >= (settings.winScore || 100)) sim.status = 'won'
  } else {
    sim.miningPosition += sim.miningDirection * sim.miningSpeed * 100 / 60
    if (sim.miningPosition >= 100) { sim.miningPosition = 100; sim.miningDirection = -1 }
    if (sim.miningPosition <= 0) { sim.miningPosition = 0; sim.miningDirection = 1 }
    if (inputs.some((input) => input.kind === 'mine' && input.tick === sim.tick)) {
      const offset = sim.miningPosition - sim.targetStart
      const perfect = offset >= 0 && offset <= sim.targetSize
      const ok = offset >= -sim.targetSize * 0.1 && offset <= sim.targetSize * 1.1
      sim.swings++
      sim.hp = Math.max(0, sim.hp - (perfect ? settings.perfectDamage : ok ? settings.okDamage : 0))
      sim.score = settings.itemHp - sim.hp
      sim.lastHit = { type: perfect ? 'PERFECT' : ok ? 'OK' : 'MISS', tick: sim.tick }
      if (sim.hp === 0) sim.status = 'won'
      else if (settings.maxSwings && sim.swings >= settings.maxSwings) sim.status = 'lost'
      else target(sim, settings)
    }
  }
  if (sim.status === 'playing' && ((settings.timeLimit && sim.tick >= settings.timeLimit * 60) || sim.tick >= 432000)) sim.status = 'lost'
  return sim
}
