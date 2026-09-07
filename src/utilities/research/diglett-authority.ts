import type { DiglettTunnelTapSettings } from '@/data/games/diglett-tunnel-tap/types'

export interface DiglettSpawn { slot: number; kind: 'diglett' | 'dugtrio'; key: number; startsAt: number; endsAt: number }
export interface DiglettRound {
  kind: 'diglett-tunnel-tap'; revision: number; score: number; lives: number
  deadline: number; spawns: DiglettSpawn[]; tapped: number[]
}

export function createDiglettRound(settings: DiglettTunnelTapSettings, now: number, random = Math.random): DiglettRound {
  const slots = settings.gridSize.cols * settings.gridSize.rows
  const count = Math.ceil(settings.timeLimit * 1000 / settings.spawnIntervalMs)
  if (!Number.isSafeInteger(slots) || slots < 1 || slots > 100 || !Number.isSafeInteger(count) || count < 1 || count > 2000 || settings.visibleMs <= 0) throw new Error('Invalid tunnel configuration')
  const startsAt = now + 1500
  const deadline = startsAt + settings.timeLimit * 1000
  return { kind: 'diglett-tunnel-tap', revision: 0, score: 0, lives: settings.maxLives || 3, deadline, tapped: [],
    spawns: Array.from({ length: count }, (_, key) => {
      const spawnTime = startsAt + key * settings.spawnIntervalMs
      return { key, slot: Math.floor(random() * slots), kind: random() < 0.78 ? 'diglett' : 'dugtrio', startsAt: spawnTime,
        endsAt: Math.min(deadline, spawnTime + Math.min(settings.visibleMs, settings.spawnIntervalMs)) }
    }),
  }
}

export function applyDiglettTap(settings: DiglettTunnelTapSettings, current: DiglettRound, spawnKey: unknown, slot: unknown, now: number) {
  if (!Number.isSafeInteger(spawnKey) || !Number.isSafeInteger(slot)) throw new Error('Invalid tunnel tap')
  if (current.lives <= 0 || current.score >= settings.targetScore) throw new Error('This tunnel is complete')
  if (now > current.deadline + 400) throw new Error('Time is up')
  const spawn = current.spawns[spawnKey as number]
  if (!spawn || spawn.slot !== slot || current.tapped.includes(spawn.key)) throw new Error('This hole is empty')
  // A small delivery allowance covers action transport; future spawns remain untappable.
  if (now < spawn.startsAt || now > spawn.endsAt + 400) throw new Error('This Pokémon has returned underground')
  const round = structuredClone(current)
  round.revision++
  round.tapped.push(spawn.key)
  round.score = spawn.kind === 'diglett' ? round.score + (settings.diglettScore || 1) : Math.max(0, round.score - (settings.dugtrioPenalty || 1))
  round.lives -= spawn.kind === 'dugtrio' ? 1 : 0
  return { round, correct: spawn.kind === 'diglett', gameOver: round.lives <= 0 || round.score >= settings.targetScore }
}
