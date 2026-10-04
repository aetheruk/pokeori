'use client'

import { useEffect, useRef } from 'react'

import {
  paintFieldBase,
  paintFieldMotion,
  type SceneTone,
  withFieldCoordinates,
} from './battle-type-field'

export const BATTLE_TYPE_TONES: Record<string, SceneTone> = {
  normal: {
    base: '#202622',
    depth: '#34382e',
    glow: '#c5b995',
    light: '#fff1cb',
  },
  fighting: {
    base: '#251a20',
    depth: '#542f32',
    glow: '#d76d55',
    light: '#ffcc9e',
  },
  flying: {
    base: '#182633',
    depth: '#42536f',
    glow: '#a4bde9',
    light: '#edf4ff',
  },
  poison: {
    base: '#211825',
    depth: '#493157',
    glow: '#bd70cf',
    light: '#efb6fb',
  },
  ground: {
    base: '#28201b',
    depth: '#59432e',
    glow: '#d5a465',
    light: '#ffe1a5',
  },
  rock: {
    base: '#23221e',
    depth: '#4c4838',
    glow: '#c5ad78',
    light: '#f4e4b6',
  },
  bug: { base: '#1c291b', depth: '#3e5630', glow: '#a8d665', light: '#e8ffab' },
  ghost: {
    base: '#191a2d',
    depth: '#38345d',
    glow: '#a891e5',
    light: '#e4d6ff',
  },
  steel: {
    base: '#19242c',
    depth: '#40505d',
    glow: '#9ab9cf',
    light: '#f2faff',
  },
  fire: {
    base: '#2c1918',
    depth: '#69352a',
    glow: '#f48b4b',
    light: '#ffdf99',
  },
  water: {
    base: '#132735',
    depth: '#1d5270',
    glow: '#65b8e5',
    light: '#b8ecff',
  },
  grass: {
    base: '#18281e',
    depth: '#315d39',
    glow: '#87cb6d',
    light: '#dcf5a3',
  },
  electric: {
    base: '#29251b',
    depth: '#645526',
    glow: '#f2d255',
    light: '#fff9b0',
  },
  psychic: {
    base: '#271b32',
    depth: '#603d70',
    glow: '#e993ce',
    light: '#ffe0f5',
  },
  ice: { base: '#172a31', depth: '#346070', glow: '#9ce2e2', light: '#f0ffff' },
  dragon: {
    base: '#1e2036',
    depth: '#423772',
    glow: '#aa8df2',
    light: '#e9d7ff',
  },
  dark: {
    base: '#171a1e',
    depth: '#34323c',
    glow: '#9b8b9e',
    light: '#d8c7de',
  },
  fairy: {
    base: '#2b1e30',
    depth: '#704466',
    glow: '#efa7d2',
    light: '#fff0e5',
  },
}

export function BattleTypeAtmosphere({ type }: { type: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    const ctx = canvas?.getContext('2d', { alpha: false })
    if (!canvas || !parent || !ctx) return

    const sceneType = Object.hasOwn(BATTLE_TYPE_TONES, type.toLowerCase())
      ? type.toLowerCase()
      : 'normal'
    const tone = BATTLE_TYPE_TONES[sceneType]
    const material = document.createElement('canvas')
    const materialCtx = material.getContext('2d', { alpha: false })
    if (!materialCtx) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let width = 0
    let height = 0
    let frame = 0
    let lastFrame = 0
    let elapsed = 0

    const draw = () => {
      if (width <= 0 || height <= 0) return
      ctx.drawImage(material, 0, 0, width, height)
      withFieldCoordinates(ctx, width, height, () =>
        paintFieldMotion(ctx, sceneType, tone, media.matches ? 5 : elapsed),
      )
    }
    const tick = (now: number) => {
      if (!document.hidden && now - lastFrame >= 1000 / 30) {
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
      if (!media.matches && !document.hidden && width > 0 && height > 0)
        frame = window.requestAnimationFrame(tick)
    }
    const resize = () => {
      const bounds = parent.getBoundingClientRect()
      width = Math.max(0, Math.round(bounds.width))
      height = Math.max(0, Math.round(bounds.height))
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = material.width = Math.round(width * pixelRatio)
      canvas.height = material.height = Math.round(height * pixelRatio)
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      materialCtx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      if (width > 0 && height > 0)
        withFieldCoordinates(materialCtx, width, height, () =>
          paintFieldBase(materialCtx, sceneType, tone),
        )
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

  return (
    <div
      className="game-battle-type-atmosphere"
      aria-hidden="true"
      data-type={type.toLowerCase()}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  )
}
