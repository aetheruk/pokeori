import type { LocationReward } from '@/data/types'
import { createTrajectoryState, stepTrajectoryState, type TrajectoryState } from './trajectory-arcade'
import { initializeTiming, stepTiming, type TimingSimulation } from './timing-arcade'
import type { SurfObstacleConfig } from '@/data/games/surf/types'
import { getEndlessScoreIntervalMinimum, getNextRandomRepeatingRewardScore } from './endless-milestones'
import { clampSurfPlayerX, getSurfCoursePosition, getSurfObstacleInterval, moveSurfPlayerTowards, pickSurfObstacle, pickSurfSpawnX, surfBoxesOverlap } from './surf'

export type ArcadeGameType = 'run' | 'flap' | 'surf' | 'rhythm' | 'mining' | 'snake' | 'brick-breaker'
export const ARCADE_TICK_RATE = 60
export const MAX_ARCADE_CHECKPOINT_TICKS = 600
export const MAX_ARCADE_CHECKPOINT_INPUTS = 300
const MAX_ARCADE_TICKS = ARCADE_TICK_RATE * 60 * 60 * 2

export interface ArcadeInput { tick: number; kind: 'jump' | 'boost' | 'flap' | 'steer' | 'rhythm' | 'mine' | 'heading' | 'paddle' | 'launch'; value?: number }
export interface ArcadeObstacle {
  id: number; x: number; y: number; width: number; height: number
  isAerial?: boolean; spriteConfig?: any; creationTime: number
}
export interface ArcadeWall { x: number; gapY: number; gapSize: number; width: number; passed: boolean }
export interface ArcadeCollectible {
  id: number; x: number; y: number; size: number; progress: number
  rewardKey: string; reward: LocationReward
}
export interface ArcadeSimulation extends TimingSimulation {
  trajectory?: TrajectoryState
  tick: number; rng: number; status: 'playing' | 'won' | 'lost'; score: number; wallScore: number
  playerY: number; playerX: number; targetX: number; velocity: number
  isJumping: boolean; hasDoubleJumped: boolean; boostUntil: number; boostReadyAt: number
  distance: number; speed: number; nextId: number
  nextGround: number; nextAerial: number; nextWall: number; nextEnemy: number; nextSurf: number
  obstacles: ArcadeObstacle[]; walls: ArcadeWall[]; enemies: Array<{x: number; y: number; size: number}>
  surfObstacles: Array<{id: number; x: number; progress: number; config: SurfObstacleConfig}>
  collectibles: ArcadeCollectible[]; parallaxOffsets: number[]
  collectibleSchedules: Record<string, number>; collectedRewards: Record<string, number>
}
export interface ArcadeRound {
  kind: 'arcade'; version: 1; gameType: ArcadeGameType
  sessionId: string; revision: number; startedAt: number; simulation: ArcadeSimulation
  settings: any
}
export interface ArcadeProof {
  kind: 'arcade'; sessionId: string; revision: number; targetTick: number; inputs: ArcadeInput[]
}

export function isArcadeGameType(value: unknown): value is ArcadeGameType {
  return value === 'run' || value === 'flap' || value === 'surf' || value === 'rhythm' || value === 'mining' || value === 'snake' || value === 'brick-breaker'
}

function random(sim: ArcadeSimulation) {
  sim.rng = (Math.imul(sim.rng, 1664525) + 1013904223) >>> 0
  return sim.rng / 4294967296
}

function interval(sim: ArcadeSimulation, range: {min: number; max: number} | undefined) {
  if (!range || range.max <= 0) return MAX_ARCADE_TICKS + 1
  return Math.max(1, Math.round(range.min + random(sim) * Math.max(0, range.max - range.min)))
}

function collectibleConfigs(settings: any) {
  return (settings.endless?.repeatingRewards || []).flatMap((entry: any, index: number) =>
    entry.random && getEndlessScoreIntervalMinimum(entry.everyScore) !== null && entry.rewards?.length
      ? [{ index, everyScore: entry.everyScore, rewards: entry.rewards as LocationReward[] }]
      : [],
  ) as Array<{index: number; everyScore: any; rewards: LocationReward[]}>
}

export function createArcadeRound(gameType: ArcadeGameType, settings: any, startedAt: number, seed: number): ArcadeRound {
  const sim: ArcadeSimulation = {
    rhythmIcons: [], nextRhythm: 0, miningPosition: 0, miningDirection: 1, miningSpeed: 0,
    targetStart: 0, targetSize: 0, hp: settings.itemHp || 0, swings: 0, lastHit: null,
    tick: 0, rng: seed >>> 0, status: 'playing', score: 0, wallScore: 0,
    playerY: gameType === 'flap' ? 200 : 0, playerX: 0.5, targetX: 0.5, velocity: 0,
    isJumping: false, hasDoubleJumped: false, boostUntil: 0, boostReadyAt: 0,
    distance: 0, speed: settings.speed || (gameType === 'flap' ? 200 : 120), nextId: 0,
    nextGround: 0, nextAerial: 0, nextWall: 0, nextEnemy: 0, nextSurf: 0,
    obstacles: [], walls: [], enemies: [], surfObstacles: [], collectibles: [],
    parallaxOffsets: (settings.parallaxLayers || []).map(() => 0), collectibleSchedules: {}, collectedRewards: {},
  }
  if (gameType === 'run') {
    sim.nextGround = interval(sim, settings.groundObstacle?.spawnRate)
    sim.nextAerial = interval(sim, settings.aerialObstacle?.spawnRate)
  } else if (gameType === 'flap') {
    sim.nextWall = interval(sim, settings.wallFrequency)
    sim.nextEnemy = interval(sim, settings.enemyFrequency)
  } else if (gameType === 'surf') {
    sim.nextSurf = Math.max(1, Math.round(getSurfObstacleInterval(settings.obstacleFrequency, settings.difficulty, () => random(sim)) * 60))
  }
  initializeTiming(sim, gameType, settings)
  if (gameType === 'snake' || gameType === 'brick-breaker') sim.trajectory = createTrajectoryState(gameType, settings, seed)
  for (const config of collectibleConfigs(settings)) sim.collectibleSchedules[config.index] = getNextRandomRepeatingRewardScore(0, config.everyScore, () => random(sim))
  return { kind: 'arcade', version: 1, gameType, sessionId: `${startedAt}:${seed >>> 0}`, revision: 0, startedAt, simulation: sim, settings: structuredClone(settings) }
}

function overlap(a: {x: number; y: number; width: number; height: number}, b: {x: number; y: number; width: number; height: number}) {
  return surfBoxesOverlap(a, b)
}

function paddedBox(x: number, y: number, width: number, height: number, scale: number) {
  return { x: x + width * (1 - scale) / 2, y: y + height * (1 - scale) / 2, width: width * scale, height: height * scale }
}

/** Both browser prediction and server verification use exactly one fixed step. */
export function stepArcadeSimulation(gameType: ArcadeGameType, settings: any, previous: ArcadeSimulation, inputs: ArcadeInput[] = []): ArcadeSimulation {
  if (previous.status !== 'playing') return previous
  const sim: ArcadeSimulation = {
    ...previous, tick: previous.tick + 1,
    obstacles: previous.obstacles.map((o) => ({ ...o })), walls: previous.walls.map((w) => ({ ...w })),
    enemies: previous.enemies.map((e) => ({ ...e })), surfObstacles: previous.surfObstacles.map((o) => ({ ...o })),
    collectibles: previous.collectibles.map((c) => ({ ...c })),
    collectibleSchedules: { ...previous.collectibleSchedules }, collectedRewards: { ...previous.collectedRewards },
  }
  if (gameType === 'rhythm' || gameType === 'mining') return stepTiming(sim, gameType, settings, inputs)
  if (gameType === 'snake' || gameType === 'brick-breaker') {
    const trajectory = stepTrajectoryState(gameType, settings, previous.trajectory!, inputs)
    return { ...sim, trajectory, tick: trajectory.tick, status: trajectory.status, score: trajectory.score, collectedRewards: trajectory.collectedRewards }
  }
  for (const input of inputs) {
    if (input.tick !== sim.tick) continue
    if (gameType === 'run' && input.kind === 'jump') {
      if (!sim.isJumping) { sim.velocity = 12; sim.isJumping = true; sim.hasDoubleJumped = false }
      else if (!sim.hasDoubleJumped) { sim.velocity = 8; sim.hasDoubleJumped = true }
    } else if (gameType === 'run' && input.kind === 'boost' && sim.tick >= sim.boostReadyAt) {
      sim.boostUntil = sim.tick + 18
      sim.boostReadyAt = sim.tick + 120
    } else if (gameType === 'flap' && input.kind === 'flap') {
      sim.velocity = -(settings.flapForce || 12)
    } else if (gameType === 'surf' && input.kind === 'steer' && Number.isFinite(input.value)) {
      sim.targetX = Math.max(0, Math.min(1, input.value!))
    }
  }
  const dt = 1 / ARCADE_TICK_RATE
  if (gameType === 'run') {
    sim.velocity -= 0.5
    sim.playerY = Math.max(0, sim.playerY + sim.velocity)
    if (sim.playerY === 0) { sim.velocity = 0; sim.isJumping = false; sim.hasDoubleJumped = false }
    sim.speed = (settings.speed || 120) * (sim.tick < sim.boostUntil ? 3 : 1)
    for (const aerial of [false, true]) {
      const key = aerial ? 'nextAerial' : 'nextGround'
      const config = aerial ? settings.aerialObstacle : settings.groundObstacle
      if (config && sim.tick >= sim[key]) {
        sim.obstacles.push({ id: sim.nextId++, x: 600, y: aerial ? 60 + random(sim) * 60 : 5, width: config.width || 30, height: config.height || 40, isAerial: aerial, spriteConfig: config.spriteConfig, creationTime: sim.tick * 1000 / 60 })
        sim[key] = sim.tick + interval(sim, config.spawnRate)
      }
    }
    sim.obstacles = sim.obstacles.map((o) => ({ ...o, x: o.x - sim.speed * dt })).filter((o) => o.x + o.width > 0)
    const w = settings.player?.renderWidth || 60, h = settings.player?.renderHeight || 60
    const player = paddedBox(100, 600 - 5 - sim.playerY - h, w, h, 0.65)
    if (sim.obstacles.some((o) => overlap(player, paddedBox(o.x, 600 - o.y - o.height, o.width, o.height, 0.7)))) sim.status = 'lost'
  } else if (gameType === 'flap') {
    sim.velocity = Math.min(settings.terminalVelocity || 15, sim.velocity + (settings.gravity || 0.6))
    sim.playerY += sim.velocity
    if (sim.playerY <= 0 || sim.playerY >= 540) sim.status = 'lost'
    if (sim.tick >= sim.nextWall) {
      const gapSize = settings.wallGap.min + random(sim) * Math.max(0, settings.wallGap.max - settings.wallGap.min)
      sim.walls.push({ x: 600, gapY: gapSize / 2 + random(sim) * Math.max(0, 500 - gapSize) + 50, gapSize, width: settings.wallWidth || 60, passed: false })
      sim.nextWall = sim.tick + interval(sim, settings.wallFrequency)
    }
    sim.walls = sim.walls.map((wall) => {
      const updated = { ...wall, x: wall.x - sim.speed * dt }
      if (!wall.passed && updated.x + wall.width < 100) { sim.wallScore += 10; updated.passed = true }
      return updated
    }).filter((w) => w.x + w.width > 0)
    if (sim.tick >= sim.nextEnemy) {
      const size = settings.enemySize || 50
      sim.enemies.push({ x: 600, y: 50 + random(sim) * Math.max(0, 500 - size), size })
      sim.nextEnemy = sim.tick + interval(sim, settings.enemyFrequency)
    }
    sim.enemies = sim.enemies.map((e) => ({ ...e, x: e.x - sim.speed * dt })).filter((e) => e.x + e.size > 0)
    const player = paddedBox(100, sim.playerY, 60, 60, 0.65)
    if (sim.walls.some((w) => overlap(player, {x: w.x, y: 0, width: w.width, height: Math.max(0, w.gapY - w.gapSize / 2)}) || overlap(player, {x: w.x, y: w.gapY + w.gapSize / 2, width: w.width, height: 600}))) sim.status = 'lost'
    if (sim.enemies.some((e) => overlap(player, paddedBox(e.x, e.y, e.size, e.size, 0.7)))) sim.status = 'lost'
  } else {
    const playerWidth = (settings.playerWidth || 104) / 390
    const playerHeight = (settings.playerHeight || 104) / 844
    sim.playerX = clampSurfPlayerX(moveSurfPlayerTowards(sim.playerX, sim.targetX, settings.steeringSpeed, dt, 390), playerWidth)
    sim.speed = Math.min(settings.maxSpeed || settings.speed, sim.speed + (settings.acceleration || 0) * dt)
    const courseStep = sim.speed / 844 * dt
    if (sim.tick >= sim.nextSurf) {
      const config = pickSurfObstacle(settings.obstacles, settings.difficulty, () => random(sim))
      if (config) sim.surfObstacles.push({ id: sim.nextId++, x: pickSurfSpawnX(sim.collectibles.filter((c) => c.progress < 0.2).map((c) => c.x), () => random(sim)), progress: 0, config })
      sim.nextSurf = sim.tick + Math.max(1, Math.round(getSurfObstacleInterval(settings.obstacleFrequency, settings.difficulty, () => random(sim)) * 60))
    }
    sim.surfObstacles = sim.surfObstacles.map((o) => ({ ...o, progress: o.progress + courseStep })).filter((o) => o.progress < 1.14)
    const player = { x: sim.playerX - playerWidth * 0.31, y: 0.79 - playerHeight * 0.28, width: playerWidth * 0.62, height: playerHeight * 0.56 }
    if (sim.surfObstacles.some((o) => {
      const position = getSurfCoursePosition(o.x, o.progress)
      const width = o.config.width / 390 * position.scale * (o.config.collisionScale || 0.7)
      const height = o.config.height / 844 * position.scale * (o.config.collisionScale || 0.7)
      return overlap(player, {x: position.x - width / 2, y: position.y - height / 2, width, height})
    })) sim.status = 'lost'
  }
  sim.distance += sim.speed * dt
  sim.score = sim.tick / 6 + sim.wallScore
  sim.parallaxOffsets = (settings.parallaxLayers || []).map((layer: any) => sim.distance * layer.speed)

  for (const config of collectibleConfigs(settings)) {
    if (sim.score < sim.collectibleSchedules[config.index]) continue
    const choice = Math.min(config.rewards.length - 1, Math.floor(random(sim) * config.rewards.length))
    const playerWidth = gameType === 'run' ? settings.player?.renderWidth || 60 : 60
    const playerHeight = gameType === 'run' ? settings.player?.renderHeight || 60 : 60
    const size = Math.max(24, Math.min(42, Math.round(Math.max(playerWidth, playerHeight) * 0.72)))
    sim.collectibles.push({
      id: sim.nextId++, rewardKey: `${config.index}:${choice}`, reward: config.rewards[choice], size, progress: 0,
      x: gameType === 'surf' ? pickSurfSpawnX(sim.surfObstacles.filter((o) => o.progress < 0.2).map((o) => o.x), () => random(sim)) : 600,
      y: gameType === 'run' ? 24 + random(sim) * Math.max(0, Math.min(252, playerHeight * 4.4) - 24) : 60 + random(sim) * 420,
    })
    sim.collectibleSchedules[config.index] = getNextRandomRepeatingRewardScore(sim.collectibleSchedules[config.index], config.everyScore, () => random(sim))
  }
  sim.collectibles = sim.collectibles.filter((c) => {
    let hit = false
    if (gameType === 'surf') {
      c.progress += sim.speed / 844 * dt
      const position = getSurfCoursePosition(c.x, c.progress)
      const size = 40 * position.scale
      hit = overlap({x: sim.playerX - (settings.playerWidth || 104) / 390 * 0.31, y: 0.79 - (settings.playerHeight || 104) / 844 * 0.28, width: (settings.playerWidth || 104) / 390 * 0.62, height: (settings.playerHeight || 104) / 844 * 0.56}, {x: position.x - size / 390 / 2, y: position.y - size / 844 / 2, width: size / 390, height: size / 844})
    } else {
      c.x -= sim.speed * dt
      const width = gameType === 'run' ? settings.player?.renderWidth || 60 : 60
      const height = gameType === 'run' ? settings.player?.renderHeight || 60 : 60
      const playerY = gameType === 'run' ? 600 - 5 - sim.playerY - height : sim.playerY
      hit = overlap({x: 100, y: playerY, width, height}, {x: c.x, y: gameType === 'run' ? 600 - c.y - c.size : c.y, width: c.size, height: c.size})
    }
    if (hit && sim.status === 'playing') sim.collectedRewards[c.rewardKey] = (sim.collectedRewards[c.rewardKey] || 0) + 1
    return !hit && (gameType === 'surf' ? c.progress < 1.12 : c.x + c.size > 0)
  })
  if (sim.status === 'playing' && !settings.endless?.enabled && settings.winScore && sim.score >= settings.winScore) sim.status = 'won'
  if (sim.status === 'playing' && ((settings.timeLimit && sim.tick >= settings.timeLimit * 60) || sim.tick >= MAX_ARCADE_TICKS)) sim.status = 'lost'
  return sim
}

export function verifyArcadeCheckpoint(gameType: ArcadeGameType, settings: any, round: ArcadeRound, value: unknown, now = Date.now()):
  | {success: true; roundData: ArcadeRound; score: number; won: boolean; collectedRewards: Record<string, number>}
  | {success: false; error: string} {
  const fail = () => ({success: false as const, error: 'Invalid arcade checkpoint'})
  if (round?.kind !== 'arcade' || round.version !== 1 || round.gameType !== gameType || !value || typeof value !== 'object') return fail()
  settings = round.settings || settings
  const proof = value as ArcadeProof
  if (proof.kind !== 'arcade' || proof.sessionId !== round.sessionId || proof.revision !== round.revision || !Number.isSafeInteger(proof.targetTick) || proof.targetTick < round.simulation.tick || proof.targetTick > round.simulation.tick + MAX_ARCADE_CHECKPOINT_TICKS || !Array.isArray(proof.inputs) || proof.inputs.length > MAX_ARCADE_CHECKPOINT_INPUTS) return fail()
  if (proof.targetTick > Math.max(0, Math.floor((now - round.startedAt) * 60 / 1000)) + 30) return fail()
  let lastTick = round.simulation.tick
  const seen = new Set<string>()
  for (const input of proof.inputs) {
    if (!input || !Number.isSafeInteger(input.tick) || input.tick <= round.simulation.tick || input.tick < lastTick || input.tick > proof.targetTick) return fail()
    if (!(gameType === 'run' ? ['jump', 'boost'] : gameType === 'flap' ? ['flap'] : gameType === 'rhythm' ? ['rhythm'] : gameType === 'mining' ? ['mine'] : gameType === 'snake' ? ['heading'] : gameType === 'brick-breaker' ? ['paddle', 'launch'] : ['steer']).includes(input.kind)) return fail()
    if (input.kind === 'rhythm' && (!Number.isSafeInteger(input.value) || input.value! < 0 || input.value! >= settings.icons.length)) return fail()
    if (input.kind === 'steer' && (!Number.isFinite(input.value) || input.value! < 0 || input.value! > 1)) return fail()
    if (input.kind === 'heading' && (!Number.isFinite(input.value) || input.value! < 0 || input.value! >= 360)) return fail()
    if (input.kind === 'paddle' && (!Number.isFinite(input.value) || input.value! < 0 || input.value! > 1)) return fail()
    const key = `${input.tick}:${input.kind}`
    if (seen.has(key)) return fail()
    seen.add(key)
    lastTick = input.tick
  }
  let sim = round.simulation, index = 0
  while (sim.tick < proof.targetTick && sim.status === 'playing') {
    const inputs: ArcadeInput[] = []
    while (index < proof.inputs.length && proof.inputs[index].tick === sim.tick + 1) inputs.push(proof.inputs[index++])
    sim = stepArcadeSimulation(gameType, settings, sim, inputs)
  }
  if (sim.tick !== proof.targetTick) return fail()
  return { success: true, roundData: {...round, revision: round.revision + 1, simulation: sim}, score: Math.floor(sim.score), won: sim.status === 'won', collectedRewards: {...sim.collectedRewards} }
}
