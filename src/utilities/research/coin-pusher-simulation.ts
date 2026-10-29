import Matter from 'matter-js'
import type { CoinPusherSettings } from '@/data/games/coin-pusher/types'

/** The board is always produced by the server; clients never submit bodies. */
export interface CoinPusherBody {
  id: number
  shelf: 0 | 1
  kind: 'coin' | 'bubble'
  prizeId?: string
  x: number
  y: number
  vx: number
  vy: number
}

export interface CoinPusherBoard {
  revision: number
  nextId: number
  tick: number
  bodies: CoinPusherBody[]
}

export const COIN_PUSHER_WIDTH = 320
export const COIN_PUSHER_DEPTH = 170
const RADIUS = 12
const STEP_MS = 1000 / 60
const MAX_BODIES = 120

function choosePrize(settings: CoinPusherSettings, random: () => number) {
  const total = settings.prizePool.reduce((sum, prize) => sum + prize.weight, 0)
  if (total <= 0) return undefined
  let roll = random() * total
  for (const prize of settings.prizePool) {
    roll -= prize.weight
    if (roll < 0) return prize.id
  }
  return settings.prizePool.at(-1)?.id
}

export function createCoinPusherBoard(settings: CoinPusherSettings, random: () => number = Math.random): CoinPusherBoard {
  const board: CoinPusherBoard = { revision: 0, nextId: 1, tick: 0, bodies: [] }
  for (const shelf of [0, 1] as const) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 10; col++) {
        board.bodies.push({ id: board.nextId++, shelf, kind: 'coin', x: 42 + col * 26, y: 90 + row * 25, vx: 0, vy: 0 })
      }
    }
  }
  // Starting prizes are deliberately behind the front edge to prevent a
  // fresh visit from immediately producing a free payout.
  for (const x of [112, 208].slice(0, settings.maxBubbles)) {
    const prizeId = choosePrize(settings, random)
    if (prizeId) board.bodies.push({ id: board.nextId++, shelf: 0, kind: 'bubble', prizeId, x, y: 54, vx: 0, vy: 0 })
  }
  return board
}

/** Advances a fixed amount of simulation time. Only paid positions are inputs. */
export function advanceCoinPusher(
  source: CoinPusherBoard,
  settings: CoinPusherSettings,
  drops: number[],
  random: () => number,
  steps = 90,
) {
  if (drops.length > 3 || drops.some((x) => !Number.isFinite(x) || x < 0 || x > 1) ||
      !Number.isInteger(steps) || steps < 1 || steps > 180 || source.bodies.length > MAX_BODIES) {
    throw new Error('Invalid coin pusher action')
  }
  const board = structuredClone(source)
  // At capacity, the loose coins closest to a side spill out before a new
  // drop. This keeps the machine playable without deleting prize bubbles.
  let sideLosses = 0
  while (board.bodies.length + drops.length > MAX_BODIES) {
    const coins = board.bodies.filter((body) => body.kind === 'coin')
    if (!coins.length) throw new Error('Coin pusher is full')
    coins.sort((a, b) => Math.min(a.x, COIN_PUSHER_WIDTH - a.x) - Math.min(b.x, COIN_PUSHER_WIDTH - b.x))
    board.bodies = board.bodies.filter((body) => body.id !== coins[0].id)
    sideLosses++
  }
  const engines = [Matter.Engine.create(), Matter.Engine.create()]
  const mappings = new Map<number, { data: CoinPusherBody; body: Matter.Body }>()
  for (const engine of engines) {
    engine.gravity.y = 0
    Matter.Composite.add(engine.world, [
      Matter.Bodies.rectangle(-8, 110, 16, 240, { isStatic: true }),
      Matter.Bodies.rectangle(328, 110, 16, 240, { isStatic: true }),
      Matter.Bodies.rectangle(160, -8, 320, 16, { isStatic: true }),
    ])
  }
  const pushers = engines.map((engine) => {
    const body = Matter.Bodies.rectangle(160, 20, 320, 20, { isStatic: true, friction: 0.1 })
    Matter.Composite.add(engine.world, body)
    return body
  })
  const add = (data: CoinPusherBody) => {
    const body = Matter.Bodies.circle(data.x, data.y, data.kind === 'bubble' ? 15 : RADIUS, {
      friction: 0.03, frictionAir: 0.08, restitution: 0.08,
    })
    Matter.Body.setVelocity(body, { x: data.vx, y: data.vy })
    Matter.Composite.add(engines[data.shelf].world, body)
    mappings.set(data.id, { data, body })
  }
  board.bodies.forEach(add)
  const pusherY = (tick: number, shelf: number) =>
    20 + (1 - Math.cos(tick / 90 * Math.PI * 2 + shelf * Math.PI / 2)) * 15
  for (const position of drops) {
    const data: CoinPusherBody = { id: board.nextId++, shelf: 0, kind: 'coin', x: 20 + position * 280, y: pusherY(board.tick, 0) + 25, vx: 0, vy: 3 }
    board.bodies.push(data)
    add(data)
    const bubbles = board.bodies.filter((body) => body.kind === 'bubble').length
    if (bubbles < settings.maxBubbles && board.bodies.length < MAX_BODIES && random() < settings.bubbleChance) {
      const prizeId = choosePrize(settings, random)
      if (prizeId) {
        const bubble: CoinPusherBody = { id: board.nextId++, shelf: 0, kind: 'bubble', prizeId, x: 35 + random() * 250, y: pusherY(board.tick, 0) + 30, vx: 0, vy: 2 }
        board.bodies.push(bubble)
        add(bubble)
      }
    }
  }
  let coinsWon = 0
  const prizesWon: string[] = []
  for (let step = 0; step < steps; step++) {
    board.tick++
    const previousPhase = (board.tick - 1) / 90 * Math.PI * 2
    const phase = board.tick / 90 * Math.PI * 2
    for (let shelf = 0; shelf < 2; shelf++) {
      const offset = shelf * Math.PI / 2
      const y = 20 + (1 - Math.cos(phase + offset)) * 15
      const previousY = 20 + (1 - Math.cos(previousPhase + offset)) * 15
      Matter.Body.setPosition(pushers[shelf], { x: 160, y })
      Matter.Body.setVelocity(pushers[shelf], { x: 0, y: y - previousY })
      Matter.Engine.update(engines[shelf], STEP_MS)
    }
    for (const [id, entry] of mappings) {
      const { body, data } = entry
      const fallsSideways = (body.position.x < 35 || body.position.x > COIN_PUSHER_WIDTH - 35) &&
        body.position.y >= COIN_PUSHER_DEPTH - 35
      if (body.position.y < COIN_PUSHER_DEPTH && !fallsSideways) continue
      Matter.Composite.remove(engines[data.shelf].world, body)
      mappings.delete(id)
      if (fallsSideways) {
        sideLosses++
      } else if (data.shelf === 0) {
        data.shelf = 1
        data.x = body.position.x
        data.y = pusherY(board.tick, 1) + 25
        data.vx = body.velocity.x
        data.vy = Math.max(1, body.velocity.y)
        add(data)
      } else if (data.kind === 'coin') {
        coinsWon++
      } else if (data.prizeId) {
        prizesWon.push(data.prizeId)
      }
    }
  }
  board.bodies = Array.from(mappings.values(), ({ data, body }) => ({
    ...data, x: body.position.x, y: body.position.y, vx: body.velocity.x, vy: body.velocity.y,
  }))
  board.revision++
  for (const engine of engines) {
    Matter.Composite.clear(engine.world, false)
    Matter.Engine.clear(engine)
  }
  return { board, coinsWon, prizesWon, sideLosses }
}
