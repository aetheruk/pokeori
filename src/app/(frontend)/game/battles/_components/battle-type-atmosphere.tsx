'use client'

import { useEffect, useRef } from 'react'

type SceneTone = { base: string; depth: string; glow: string; light: string }

export const BATTLE_TYPE_TONES: Record<string, SceneTone> = {
  normal: { base: '#202622', depth: '#34382e', glow: '#c5b995', light: '#fff1cb' },
  fighting: { base: '#251a20', depth: '#542f32', glow: '#d76d55', light: '#ffcc9e' },
  flying: { base: '#182633', depth: '#42536f', glow: '#a4bde9', light: '#edf4ff' },
  poison: { base: '#211825', depth: '#493157', glow: '#bd70cf', light: '#efb6fb' },
  ground: { base: '#28201b', depth: '#59432e', glow: '#d5a465', light: '#ffe1a5' },
  rock: { base: '#23221e', depth: '#4c4838', glow: '#c5ad78', light: '#f4e4b6' },
  bug: { base: '#1c291b', depth: '#3e5630', glow: '#a8d665', light: '#e8ffab' },
  ghost: { base: '#191a2d', depth: '#38345d', glow: '#a891e5', light: '#e4d6ff' },
  steel: { base: '#19242c', depth: '#40505d', glow: '#9ab9cf', light: '#f2faff' },
  fire: { base: '#2c1918', depth: '#69352a', glow: '#f48b4b', light: '#ffdf99' },
  water: { base: '#132735', depth: '#1d5270', glow: '#65b8e5', light: '#b8ecff' },
  grass: { base: '#18281e', depth: '#315d39', glow: '#87cb6d', light: '#dcf5a3' },
  electric: { base: '#29251b', depth: '#645526', glow: '#f2d255', light: '#fff9b0' },
  psychic: { base: '#271b32', depth: '#603d70', glow: '#e993ce', light: '#ffe0f5' },
  ice: { base: '#172a31', depth: '#346070', glow: '#9ce2e2', light: '#f0ffff' },
  dragon: { base: '#1e2036', depth: '#423772', glow: '#aa8df2', light: '#e9d7ff' },
  dark: { base: '#171a1e', depth: '#34323c', glow: '#9b8b9e', light: '#d8c7de' },
  fairy: { base: '#2b1e30', depth: '#704466', glow: '#efa7d2', light: '#fff0e5' },
}

const TAU = Math.PI * 2
const fract = (value: number) => value - Math.floor(value)
const seeded = (index: number) => fract(Math.sin(index * 127.1 + 13.7) * 43758.5453)
const loop = (value: number, length: number) => ((value % length) + length) % length

function rgba(hex: string, alpha: number): string {
  const value = Number.parseInt(hex.slice(1), 16)
  return `rgba(${(value >> 16) & 255},${(value >> 8) & 255},${value & 255},${alpha})`
}

function atmosphere(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, tone: SceneTone) {
  const field = ctx.createLinearGradient(0, 0, width, height)
  field.addColorStop(0, tone.depth)
  field.addColorStop(0.46, tone.base)
  field.addColorStop(1, tone.depth)
  ctx.fillStyle = field
  ctx.fillRect(0, 0, width, height)

  const glow = ctx.createRadialGradient(width * 0.77, height * 0.64, 0, width * 0.77, height * 0.64, Math.max(width, height) * 0.72)
  glow.addColorStop(0, rgba(tone.glow, 0.27 + Math.sin(time * 1.7) * 0.04))
  glow.addColorStop(1, rgba(tone.glow, 0))
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, width, height)
}

function motes(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, tone: SceneTone, count: number, driftX = 0.06, driftY = -0.1) {
  for (let index = 0; index < count; index++) {
    const seed = index + 31
    const x = loop(seeded(seed) + time * driftX * (0.5 + seeded(seed + 4)), 1.16) * width - width * 0.08
    const y = loop(seeded(seed + 9) + time * driftY * (0.5 + seeded(seed + 2)), 1.16) * height - height * 0.08
    const radius = 1 + seeded(seed + 6) * 2.5
    ctx.fillStyle = rgba(index % 5 === 0 ? tone.light : tone.glow, 0.22 + seeded(seed + 11) * 0.42)
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, TAU)
    ctx.fill()
  }
}

function rings(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, tone: SceneTone, count: number, centerX = 0.62, centerY = 0.57) {
  ctx.lineWidth = 1.5
  for (let index = 0; index < count; index++) {
    const phase = loop(time * 0.27 + index / count, 1)
    ctx.strokeStyle = rgba(tone.light, (1 - phase) * 0.32)
    ctx.beginPath()
    ctx.ellipse(width * centerX, height * centerY, 18 + phase * width * 0.58, 10 + phase * height * 0.3, -0.22, 0, TAU)
    ctx.stroke()
  }
}

function waves(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, tone: SceneTone, count: number, amplitude = 15) {
  for (let line = 0; line < count; line++) {
    ctx.beginPath()
    for (let x = -12; x <= width + 12; x += 8) {
      const y = height * (0.26 + line * 0.12) + Math.sin(x * 0.015 + time * 1.8 + line * 0.7) * amplitude + Math.sin(x * 0.037 - time * 1.1) * amplitude * 0.28
      if (x === -12) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.strokeStyle = rgba(line % 2 ? tone.glow : tone.light, 0.13 + line * 0.025)
    ctx.lineWidth = line % 2 ? 3 : 1.2
    ctx.stroke()
  }
}

function ribbons(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, tone: SceneTone, count: number, vertical = false) {
  for (let index = 0; index < count; index++) {
    const offset = seeded(index + 87)
    const sway = Math.sin(time * (0.6 + offset) + index) * width * 0.09
    ctx.beginPath()
    if (vertical) {
      const x = width * (0.12 + offset * 0.78)
      ctx.moveTo(x, height + 24)
      ctx.bezierCurveTo(x - 35 + sway, height * 0.65, x + 35 - sway, height * 0.34, x + sway * 0.6, -24)
    } else {
      const y = height * (0.12 + offset * 0.76)
      ctx.moveTo(-30, y + sway * 0.2)
      ctx.bezierCurveTo(width * 0.26, y - 42 - sway * 0.3, width * 0.69, y + 45 + sway * 0.2, width + 30, y - 12)
    }
    ctx.strokeStyle = rgba(index % 2 ? tone.light : tone.glow, 0.12 + offset * 0.22)
    ctx.lineWidth = 1 + offset * 3
    ctx.stroke()
  }
}

function shards(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, tone: SceneTone, count: number, falling = true) {
  for (let index = 0; index < count; index++) {
    const seed = index + 161
    const x = width * seeded(seed)
    const y = height * loop(seeded(seed + 1) + time * (falling ? 0.07 : -0.03) * (0.5 + seeded(seed + 7)), 1)
    const size = 5 + seeded(seed + 2) * 15
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(seeded(seed + 3) * TAU + time * (falling ? 0.3 : -0.2))
    ctx.beginPath()
    ctx.moveTo(0, -size)
    ctx.lineTo(size * 0.7, 0)
    ctx.lineTo(0, size * 0.9)
    ctx.lineTo(-size * 0.55, size * 0.15)
    ctx.closePath()
    ctx.fillStyle = rgba(tone.glow, 0.06 + seeded(seed + 6) * 0.13)
    ctx.strokeStyle = rgba(tone.light, 0.25 + seeded(seed + 5) * 0.31)
    ctx.lineWidth = 1.2
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }
}

function stars(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, tone: SceneTone, count: number, branches = 4) {
  for (let index = 0; index < count; index++) {
    const seed = index + 217
    const x = seeded(seed) * width
    const y = seeded(seed + 3) * height
    const size = (3 + seeded(seed + 7) * 8) * (0.72 + Math.sin(time * 3 + index * 2.7) * 0.28)
    ctx.strokeStyle = rgba(tone.light, 0.21 + seeded(seed + 4) * 0.58)
    ctx.lineWidth = 1.3
    ctx.beginPath()
    for (let arm = 0; arm < branches; arm++) {
      const angle = arm * Math.PI / branches + time * 0.1
      ctx.moveTo(x - Math.cos(angle) * size, y - Math.sin(angle) * size)
      ctx.lineTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size)
    }
    ctx.stroke()
  }
}

function leaves(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, tone: SceneTone, count: number, wing = false) {
  for (let index = 0; index < count; index++) {
    const seed = index + 271
    const x = loop(seeded(seed) + time * (wing ? 0.09 : 0.04), 1.18) * width - width * 0.09
    const y = loop(seeded(seed + 2) - time * (wing ? 0.04 : 0.065), 1.18) * height
    const size = 5 + seeded(seed + 5) * 9
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(Math.sin(time * 2 + index) * 0.55 + seeded(seed + 8) * TAU)
    ctx.beginPath()
    ctx.moveTo(-size, 0)
    ctx.quadraticCurveTo(0, -size * (wing ? 1.6 : 0.8), size, 0)
    ctx.quadraticCurveTo(0, size * (wing ? 1.6 : 0.8), -size, 0)
    ctx.fillStyle = rgba(tone.glow, 0.13 + seeded(seed + 4) * 0.35)
    ctx.strokeStyle = rgba(tone.light, 0.3)
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }
}

function vines(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, tone: SceneTone) {
  for (let index = 0; index < 9; index++) {
    const seed = index + 307
    const rootX = width * (seeded(seed) * 1.12 - 0.06)
    const tipX = rootX + Math.sin(time * 0.85 + index * 1.8) * 26 + (seeded(seed + 2) - 0.5) * 70
    const tipY = height * (0.06 + seeded(seed + 4) * 0.5)
    ctx.beginPath()
    ctx.moveTo(rootX, height + 24)
    ctx.bezierCurveTo(rootX - 36, height * 0.68, tipX + 42, height * 0.45, tipX, tipY)
    ctx.strokeStyle = rgba(index % 3 === 0 ? tone.light : tone.glow, 0.28 + seeded(seed + 6) * 0.22)
    ctx.lineWidth = 1.5 + seeded(seed + 3) * 1.9
    ctx.stroke()

    for (let leaf = 0; leaf < 3; leaf++) {
      const progress = 0.22 + leaf * 0.24
      const inverse = 1 - progress
      const x = inverse * inverse * inverse * rootX +
        3 * inverse * inverse * progress * (rootX - 36) +
        3 * inverse * progress * progress * (tipX + 42) +
        progress * progress * progress * tipX
      const y = inverse * inverse * inverse * (height + 24) +
        3 * inverse * inverse * progress * height * 0.68 +
        3 * inverse * progress * progress * height * 0.45 +
        progress * progress * progress * tipY
      const direction = leaf % 2 ? 1 : -1
      const size = 7 + seeded(seed + leaf + 9) * 6
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.quadraticCurveTo(x + direction * size * 0.6, y - size, x + direction * size * 1.9, y - size * 1.4)
      ctx.quadraticCurveTo(x + direction * size * 1.1, y + size * 0.5, x, y)
      ctx.fillStyle = rgba(tone.glow, 0.16 + seeded(seed + leaf + 12) * 0.22)
      ctx.strokeStyle = rgba(tone.light, 0.22)
      ctx.fill()
      ctx.stroke()
    }
  }
}

function dunes(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, tone: SceneTone) {
  for (let layer = 0; layer < 5; layer++) {
    const baseY = height * (0.38 + layer * 0.13)
    ctx.beginPath()
    ctx.moveTo(0, height)
    ctx.lineTo(0, baseY)
    for (let x = 0; x <= width + 12; x += 12) {
      const elevation = Math.sin(x * 0.018 + layer * 1.3 + time * 0.2) * 13 +
        Math.sin(x * 0.051 + layer * 0.7) * 4
      ctx.lineTo(x, baseY + elevation)
    }
    ctx.lineTo(width, height)
    ctx.closePath()
    ctx.fillStyle = rgba(layer % 2 ? tone.glow : tone.depth, 0.08 + layer * 0.035)
    ctx.fill()
    ctx.strokeStyle = rgba(tone.light, 0.1 + layer * 0.035)
    ctx.lineWidth = 1
    ctx.stroke()
  }
}

function eclipse(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, tone: SceneTone) {
  const x = width * 0.68
  const y = height * 0.53
  const radius = Math.min(width, height) * 0.27
  const halo = ctx.createRadialGradient(x, y, radius * 0.68, x, y, radius * 1.8)
  halo.addColorStop(0, rgba(tone.glow, 0.39 + Math.sin(time * 0.65) * 0.06))
  halo.addColorStop(0.55, rgba(tone.glow, 0.11))
  halo.addColorStop(1, rgba(tone.glow, 0))
  ctx.fillStyle = halo
  ctx.fillRect(x - radius * 1.8, y - radius * 1.8, radius * 3.6, radius * 3.6)
  ctx.fillStyle = tone.base
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, TAU)
  ctx.fill()
  ctx.strokeStyle = rgba(tone.light, 0.25)
  ctx.lineWidth = 1
  ctx.stroke()
}

function flames(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, tone: SceneTone) {
  for (let index = 0; index < 8; index++) {
    const seed = index + 333
    const x = width * (0.1 + seeded(seed) * 0.85)
    const rise = 45 + seeded(seed + 4) * height * 0.37
    const lean = Math.sin(time * 2.6 + index * 1.4) * 22
    ctx.beginPath()
    ctx.moveTo(x - 18, height + 10)
    ctx.quadraticCurveTo(x - 14 + lean, height - rise * 0.4, x + lean, height - rise)
    ctx.quadraticCurveTo(x + 10 + lean, height - rise * 0.46, x + 24, height + 10)
    ctx.closePath()
    ctx.fillStyle = rgba(index % 3 === 0 ? tone.light : tone.glow, 0.08 + seeded(seed + 3) * 0.16)
    ctx.fill()
  }
  motes(ctx, width, height, time, tone, 32, 0.018, -0.13)
}

function lightning(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, tone: SceneTone) {
  const beat = Math.floor(time * 3.5)
  const intensity = fract(time * 3.5) > 0.24 ? 0.13 : 1
  for (let branch = 0; branch < 3; branch++) {
    const seed = beat * 19 + branch * 13 + 401
    let x = width * (0.13 + seeded(seed) * 0.73)
    let y = -5
    ctx.beginPath()
    ctx.moveTo(x, y)
    for (let step = 0; step < 7; step++) {
      x += (seeded(seed + step + 1) - 0.5) * width * 0.19
      y += height / 6
      ctx.lineTo(x, y)
    }
    ctx.strokeStyle = rgba(tone.light, (branch === 0 ? 0.7 : 0.4) * intensity)
    ctx.lineWidth = branch === 0 ? 2.6 : 1.2
    ctx.stroke()
  }
}

function snow(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, tone: SceneTone) {
  for (let index = 0; index < 22; index++) {
    const seed = index + 471
    const x = width * loop(seeded(seed) + time * 0.018, 1)
    const y = height * loop(seeded(seed + 2) + time * (0.025 + seeded(seed + 4) * 0.023), 1)
    const size = 4 + seeded(seed + 7) * 9
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(time * 0.12 + seeded(seed + 8) * TAU)
    ctx.strokeStyle = rgba(tone.light, 0.24 + seeded(seed + 5) * 0.45)
    ctx.lineWidth = 1
    for (let arm = 0; arm < 3; arm++) {
      const angle = arm * Math.PI / 3
      ctx.beginPath()
      ctx.moveTo(-Math.cos(angle) * size, -Math.sin(angle) * size)
      ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size)
      ctx.stroke()
    }
    ctx.restore()
  }
}

function drawType(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, type: string, tone: SceneTone) {
  atmosphere(ctx, width, height, time, tone)
  switch (type) {
    case 'fire':
      flames(ctx, width, height, time, tone)
      break
    case 'water':
      waves(ctx, width, height, time, tone, 6, 18)
      rings(ctx, width, height, time, tone, 4, 0.72, 0.67)
      motes(ctx, width, height, time, tone, 20, 0.02, -0.04)
      break
    case 'grass':
      vines(ctx, width, height, time, tone)
      leaves(ctx, width, height, time, tone, 20)
      motes(ctx, width, height, time, tone, 24, 0.015, -0.035)
      break
    case 'electric':
      lightning(ctx, width, height, time, tone)
      stars(ctx, width, height, time, tone, 18)
      break
    case 'ice':
      snow(ctx, width, height, time, tone)
      shards(ctx, width, height, time, tone, 12)
      break
    case 'fighting':
      rings(ctx, width, height, time * 2, tone, 5, 0.5, 0.52)
      ribbons(ctx, width, height, time * 2.5, tone, 9)
      break
    case 'flying':
      ribbons(ctx, width, height, time, tone, 12)
      leaves(ctx, width, height, time, tone, 11, true)
      break
    case 'poison':
      rings(ctx, width, height, time * 0.6, tone, 5, 0.48, 0.9)
      motes(ctx, width, height, time, tone, 40, 0.012, -0.055)
      break
    case 'ground':
      dunes(ctx, width, height, time, tone)
      motes(ctx, width, height, time, tone, 34, 0.085, -0.01)
      break
    case 'rock':
      shards(ctx, width, height, time, tone, 27)
      motes(ctx, width, height, time, tone, 18, 0.025, 0.03)
      break
    case 'bug':
      leaves(ctx, width, height, time, tone, 27, true)
      motes(ctx, width, height, time, tone, 30, 0.06, -0.03)
      break
    case 'ghost':
      ribbons(ctx, width, height, time, tone, 10, true)
      rings(ctx, width, height, time * 0.6, tone, 4)
      motes(ctx, width, height, time, tone, 16, -0.018, -0.05)
      break
    case 'steel':
      shards(ctx, width, height, time * 0.4, tone, 25, false)
      ribbons(ctx, width, height, time * 0.5, tone, 5)
      stars(ctx, width, height, time, tone, 7)
      break
    case 'psychic':
      rings(ctx, width, height, time, tone, 7, 0.52, 0.48)
      stars(ctx, width, height, time, tone, 18, 6)
      break
    case 'dragon':
      ribbons(ctx, width, height, time * 1.7, tone, 13, true)
      lightning(ctx, width, height, time * 0.5, tone)
      motes(ctx, width, height, time, tone, 22, 0.03, -0.08)
      break
    case 'dark':
      eclipse(ctx, width, height, time, tone)
      ribbons(ctx, width, height, time * 0.55, tone, 12, true)
      break
    case 'fairy':
      stars(ctx, width, height, time, tone, 38, 4)
      ribbons(ctx, width, height, time * 0.6, tone, 5)
      motes(ctx, width, height, time, tone, 21, 0.025, -0.025)
      break
    default:
      rings(ctx, width, height, time * 0.55, tone, 4)
      motes(ctx, width, height, time, tone, 22, 0.025, -0.03)
  }

  // A type change arrives as one battle impact, then gives way to the field.
  const arrival = Math.max(0, 1 - time / 0.85)
  if (arrival > 0) {
    ctx.strokeStyle = rgba(tone.light, arrival * 0.48)
    ctx.lineWidth = 2 + arrival * 3
    ctx.beginPath()
    ctx.ellipse(width * 0.5, height * 0.51, width * (0.48 - arrival * 0.37), height * (0.38 - arrival * 0.3), 0, 0, TAU)
    ctx.stroke()
  }
}

export function BattleTypeAtmosphere({ type }: { type: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    const ctx = canvas?.getContext('2d', { alpha: false })
    if (!canvas || !parent || !ctx) return

    const tone = BATTLE_TYPE_TONES[type.toLowerCase()] ?? BATTLE_TYPE_TONES.normal
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let width = 0
    let height = 0
    let frame = 0
    let lastFrame = 0
    let elapsed = 0

    const draw = () => {
      if (width > 0 && height > 0) drawType(ctx, width, height, media.matches ? 5 : elapsed, type.toLowerCase(), tone)
    }
    const tick = (now: number) => {
      if (!document.hidden && now - lastFrame >= 30) {
        elapsed += lastFrame ? Math.min((now - lastFrame) / 1000, 0.1) : 0
        lastFrame = now
        draw()
      }
      frame = window.requestAnimationFrame(tick)
    }
    const start = () => {
      window.cancelAnimationFrame(frame)
      lastFrame = 0
      draw()
      if (!media.matches && !document.hidden) frame = window.requestAnimationFrame(tick)
    }
    const resize = () => {
      const bounds = parent.getBoundingClientRect()
      width = Math.max(0, Math.round(bounds.width))
      height = Math.max(0, Math.round(bounds.height))
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      start()
    }
    const visibility = () => {
      if (document.hidden) window.cancelAnimationFrame(frame)
      else start()
    }
    const observer = new ResizeObserver(resize)
    observer.observe(parent)
    media.addEventListener('change', start)
    document.addEventListener('visibilitychange', visibility)
    resize()

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      media.removeEventListener('change', start)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [type])

  return <div className="game-battle-type-atmosphere" aria-hidden="true" data-type={type.toLowerCase()}><canvas ref={canvasRef} className="size-full" /></div>
}
