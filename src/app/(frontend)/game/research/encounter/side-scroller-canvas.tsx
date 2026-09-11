'use client'

import Image from 'next/image'
import { memo, useEffect, useRef, type RefObject } from 'react'
import type { FlapGameConfig } from '@/data/games/flap/types'
import { getItemHueRotate, getItemSpriteUrl } from '@/data/items/utils'
import type { RunGameConfig } from '@/data/games/run/types'
import type { LocationReward, SpriteConfig } from '@/data/games/shared'
import type { ArcadeRenderFrame } from '@/hooks/use-arcade-session'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'

const STAGE_SIZE = 600
const RUN_PLAYER_X = 100
const RUN_PLAYER_SIZE = 60
const RUN_GROUND_Y = 5
const FLAP_PLAYER_X = 100
const FLAP_PLAYER_SIZE = 60

type RunSettings = RunGameConfig['settings']
type FlapSettings = FlapGameConfig['settings']
type SideScrollerSettings = RunSettings | FlapSettings
type CanvasImage = HTMLImageElement

const imagePromises = new Map<string, Promise<CanvasImage | null>>()

function loadCanvasImage(src: string) {
  if (!src) return Promise.resolve(null)

  const cached = imagePromises.get(src)
  if (cached) return cached

  const pending = new Promise<CanvasImage | null>((resolve) => {
    const image = new window.Image()
    image.decoding = 'async'
    image.onload = () => resolve(image)
    image.onerror = () => resolve(null)
    image.src = src
  })
  imagePromises.set(src, pending)
  return pending
}

function isSpriteConfig(value: string | SpriteConfig | undefined): value is SpriteConfig {
  return Boolean(value && typeof value !== 'string')
}

function lerp(previous: number, current: number, alpha: number) {
  return previous + (current - previous) * alpha
}

function positiveModulo(value: number, divisor: number) {
  return ((value % divisor) + divisor) % divisor
}

function parseCanvasLength(value: string | undefined, available: number) {
  if (!value || value === 'auto') return null
  const pixelMatch = value.match(/^(\d+(?:\.\d+)?)px$/)
  if (pixelMatch) return Number(pixelMatch[1])
  const percentageMatch = value.match(/^(\d+(?:\.\d+)?)%$/)
  if (percentageMatch) return (available * Number(percentageMatch[1])) / 100
  return null
}

function getBackgroundSize(image: CanvasImage, backgroundSize?: string) {
  const [widthToken = 'auto', heightToken = 'auto'] =
    backgroundSize?.trim().split(/\s+/) || []
  let width = parseCanvasLength(widthToken, STAGE_SIZE)
  let height = parseCanvasLength(heightToken, STAGE_SIZE)
  const aspectRatio = image.naturalWidth / Math.max(1, image.naturalHeight)

  if (width === null && height === null) {
    width = image.naturalWidth
    height = image.naturalHeight
  } else if (width === null) {
    width = height! * aspectRatio
  } else if (height === null) {
    height = width / aspectRatio
  }

  return {
    width: Math.max(1, width ?? image.naturalWidth),
    height: Math.max(1, height ?? image.naturalHeight),
  }
}

function getBackgroundY(backgroundPosition: string | undefined, height: number) {
  const tokens = backgroundPosition?.trim().split(/\s+/) || ['center']
  const verticalToken = tokens.length > 1 ? tokens.at(-1)! : tokens[0]

  if (verticalToken === 'top') return 0
  if (verticalToken === 'bottom') return STAGE_SIZE - height
  if (verticalToken === 'center' || verticalToken === 'left' || verticalToken === 'right') {
    return (STAGE_SIZE - height) / 2
  }

  const percentageMatch = verticalToken.match(/^(\d+(?:\.\d+)?)%$/)
  if (percentageMatch) {
    return ((STAGE_SIZE - height) * Number(percentageMatch[1])) / 100
  }

  return Number.parseFloat(verticalToken) || 0
}

function drawImageRegion(
  context: CanvasRenderingContext2D,
  image: CanvasImage,
  sourceX: number,
  sourceY: number,
  sourceWidth: number,
  sourceHeight: number,
  x: number,
  y: number,
  width: number,
  height: number,
  flipX = false,
) {
  context.save()
  if (flipX) {
    context.translate(x + width, y)
    context.scale(-1, 1)
    context.drawImage(
      image,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      width,
      height,
    )
  } else {
    context.drawImage(
      image,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      x,
      y,
      width,
      height,
    )
  }
  context.restore()
}

function drawContainedImage(
  context: CanvasRenderingContext2D,
  image: CanvasImage,
  x: number,
  y: number,
  width: number,
  height: number,
  flipX = false,
) {
  const scale = Math.min(
    width / Math.max(1, image.naturalWidth),
    height / Math.max(1, image.naturalHeight),
  )
  const renderedWidth = image.naturalWidth * scale
  const renderedHeight = image.naturalHeight * scale
  drawImageRegion(
    context,
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    x + (width - renderedWidth) / 2,
    y + (height - renderedHeight) / 2,
    renderedWidth,
    renderedHeight,
    flipX,
  )
}

function drawSprite(
  context: CanvasRenderingContext2D,
  image: CanvasImage,
  sprite: SpriteConfig,
  x: number,
  y: number,
  now: number,
  flipX = false,
  width = sprite.renderWidth,
  height = sprite.renderHeight,
) {
  const frameCount =
    sprite.frameCount ||
    Math.max(1, Math.floor(image.naturalHeight / sprite.frameHeight))
  const frameIndex =
    Math.floor(now / Math.max(1, sprite.frameRate || 100)) % frameCount
  drawImageRegion(
    context,
    image,
    0,
    frameIndex * sprite.frameHeight,
    sprite.frameWidth,
    sprite.frameHeight,
    x,
    y,
    width,
    height,
    flipX,
  )
}

function getCollectibleImageSource(reward: LocationReward) {
  if (reward.type === 'item' && reward.targetId) {
    return getItemSpriteUrl(String(reward.targetId))
  }
  if (reward.type === 'pokemon_research_xp' && reward.targetId) {
    return getPokemonImageUrl(String(reward.targetId), 'sprite')
  }
  return null
}

function collectImageSources(gameType: 'run' | 'flap', settings: SideScrollerSettings) {
  const sources = new Set<string>()
  for (const layer of settings.parallaxLayers || []) sources.add(layer.url)

  if (gameType === 'run') {
    const run = settings as RunSettings
    if (run.player?.sheetUrl) sources.add(run.player.sheetUrl)
    if (run.sprite) sources.add(run.sprite)
    if (run.jumpSprite) sources.add(run.jumpSprite)
    if (run.groundObstacle.spriteConfig?.sheetUrl) {
      sources.add(run.groundObstacle.spriteConfig.sheetUrl)
    }
    if (run.groundObstacle.sprite) sources.add(run.groundObstacle.sprite)
    if (run.aerialObstacle?.spriteConfig?.sheetUrl) {
      sources.add(run.aerialObstacle.spriteConfig.sheetUrl)
    }
    if (run.aerialObstacle?.sprite) sources.add(run.aerialObstacle.sprite)
  } else {
    const flap = settings as FlapSettings
    if (isSpriteConfig(flap.sprite)) sources.add(flap.sprite.sheetUrl)
    else if (flap.sprite) sources.add(flap.sprite)
    if (isSpriteConfig(flap.enemySprite)) sources.add(flap.enemySprite.sheetUrl)
    else if (flap.enemySprite) sources.add(flap.enemySprite)
    if (flap.wallSprite) sources.add(flap.wallSprite)
  }

  for (const repeating of settings.endless?.repeatingRewards || []) {
    for (const reward of repeating.rewards || []) {
      const source = getCollectibleImageSource(reward)
      if (source) sources.add(source)
    }
  }

  return [...sources].filter(Boolean)
}

function drawParallax(
  context: CanvasRenderingContext2D,
  settings: SideScrollerSettings,
  frame: ArcadeRenderFrame,
  images: Map<string, CanvasImage>,
) {
  settings.parallaxLayers.forEach((layer, index) => {
    const image = images.get(layer.url)
    if (!image) return

    const { width, height } = getBackgroundSize(
      image,
      layer.style?.backgroundSize || 'auto 100%',
    )
    const previousOffset = frame.previous.parallaxOffsets[index] || 0
    const currentOffset = frame.current.parallaxOffsets[index] || 0
    const offset = lerp(previousOffset, currentOffset, frame.alpha)
    const y = getBackgroundY(layer.style?.backgroundPosition, height)
    const startX = -positiveModulo(offset, width)

    context.save()
    context.globalAlpha = layer.style?.opacity ?? 1
    if ((layer.style?.backgroundRepeat || 'repeat-x') === 'repeat-x') {
      for (let x = startX; x < STAGE_SIZE; x += width) {
        context.drawImage(image, x, y, width, height)
      }
    } else {
      context.drawImage(image, -offset, y, width, height)
    }
    context.restore()
  })
}

function getPreviousById<T extends { id?: number }>(
  values: T[],
  id: number | undefined,
  fallbackIndex: number,
) {
  if (id !== undefined) return values.find((value) => value.id === id)
  return values[fallbackIndex]
}

function drawCollectibles(
  context: CanvasRenderingContext2D,
  frame: ArcadeRenderFrame,
  images: Map<string, CanvasImage>,
  coordinateMode: 'run' | 'flap',
) {
  frame.current.collectibles.forEach((collectible, index) => {
    const previous = getPreviousById(
      frame.previous.collectibles,
      collectible.id,
      index,
    )
    const x = previous
      ? lerp(previous.x, collectible.x, frame.alpha)
      : collectible.x
    const source = getCollectibleImageSource(collectible.reward)
    const image = source ? images.get(source) : undefined
    const yValue = previous
      ? lerp(previous.y, collectible.y, frame.alpha)
      : collectible.y
    const y =
      coordinateMode === 'run'
        ? STAGE_SIZE - yValue - collectible.size
        : yValue

    if (image) {
      context.save()
      context.shadowColor = 'rgba(181, 138, 67, 0.65)'
      context.shadowBlur = 8
      if (collectible.reward.type === 'item' && collectible.reward.targetId) {
        const hue = getItemHueRotate(String(collectible.reward.targetId))
        if (hue) context.filter = `hue-rotate(${hue}deg)`
      }
      drawContainedImage(
        context,
        image,
        x,
        y,
        collectible.size,
        collectible.size,
      )
      context.restore()
      return
    }

    context.save()
    context.fillStyle = '#b58a43'
    context.fillRect(x + 4, y + 4, collectible.size - 8, collectible.size - 8)
    context.strokeStyle = '#fff8e8'
    context.lineWidth = 2
    context.strokeRect(x + 4, y + 4, collectible.size - 8, collectible.size - 8)
    context.restore()
  })
}

function drawRun(
  context: CanvasRenderingContext2D,
  settings: RunSettings,
  frame: ArcadeRenderFrame,
  images: Map<string, CanvasImage>,
  now: number,
) {
  drawParallax(context, settings, frame, images)
  const current = frame.current
  const previous = frame.previous
  const playerY = lerp(previous.playerY, current.playerY, frame.alpha)
  const playerWidth = settings.player?.renderWidth || RUN_PLAYER_SIZE
  const playerHeight = settings.player?.renderHeight || RUN_PLAYER_SIZE

  context.save()
  context.fillStyle = 'rgba(15, 23, 42, 0.22)'
  context.beginPath()
  context.ellipse(
    RUN_PLAYER_X + 8 + (playerWidth * 0.75) / 2,
    STAGE_SIZE - RUN_GROUND_Y - 8,
    (playerWidth * 0.75 * (current.isJumping ? 0.72 : 1)) / 2,
    4,
    0,
    0,
    Math.PI * 2,
  )
  context.fill()
  context.restore()

  if (current.tick < current.boostUntil) {
    const trailY =
      STAGE_SIZE -
      RUN_GROUND_Y -
      playerY -
      playerHeight * 0.36 -
      16
    const gradient = context.createLinearGradient(
      RUN_PLAYER_X - 68,
      0,
      RUN_PLAYER_X + 12,
      0,
    )
    gradient.addColorStop(0, 'rgba(255,255,255,0)')
    gradient.addColorStop(0.55, 'rgba(255,255,255,0.34)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    context.fillStyle = gradient
    context.fillRect(RUN_PLAYER_X - 68, trailY, 80, 32)
  }

  const playerTop =
    STAGE_SIZE - RUN_GROUND_Y - playerY - playerHeight
  if (settings.player && !(current.isJumping && settings.jumpSprite)) {
    const image = images.get(settings.player.sheetUrl)
    if (image) {
      drawSprite(
        context,
        image,
        settings.player,
        RUN_PLAYER_X,
        playerTop,
        now,
        true,
      )
    }
  } else {
    const source =
      current.isJumping && settings.jumpSprite
        ? settings.jumpSprite
        : settings.sprite
    const image = source ? images.get(source) : undefined
    if (image) {
      drawContainedImage(
        context,
        image,
        RUN_PLAYER_X,
        STAGE_SIZE - RUN_GROUND_Y - playerY - RUN_PLAYER_SIZE,
        RUN_PLAYER_SIZE,
        RUN_PLAYER_SIZE,
        true,
      )
    }
  }

  drawCollectibles(context, frame, images, 'run')

  current.obstacles.forEach((obstacle, index) => {
    const oldObstacle = getPreviousById(
      previous.obstacles,
      obstacle.id,
      index,
    )
    const x = oldObstacle
      ? lerp(oldObstacle.x, obstacle.x, frame.alpha)
      : obstacle.x
    const y = STAGE_SIZE - obstacle.y - obstacle.height

    if (obstacle.spriteConfig) {
      const image = images.get(obstacle.spriteConfig.sheetUrl)
      if (image) {
        drawSprite(
          context,
          image,
          obstacle.spriteConfig,
          x,
          y,
          now,
          false,
          obstacle.width,
          obstacle.height,
        )
      }
      return
    }

    const source =
      obstacle.isAerial && settings.aerialObstacle
        ? settings.aerialObstacle.sprite
        : settings.groundObstacle.sprite
    const image = source ? images.get(source) : undefined
    if (image) {
      context.drawImage(
        image,
        x,
        y,
        obstacle.width,
        obstacle.height,
      )
    }
  })
}

function fillWall(
  context: CanvasRenderingContext2D,
  pattern: CanvasPattern,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  if (width <= 0 || height <= 0) return
  context.save()
  context.translate(x, y)
  context.fillStyle = pattern
  context.fillRect(0, 0, width, height)
  context.restore()
}

function drawFlap(
  context: CanvasRenderingContext2D,
  settings: FlapSettings,
  frame: ArcadeRenderFrame,
  images: Map<string, CanvasImage>,
  wallPatterns: Map<string, CanvasPattern>,
  now: number,
  active: boolean,
) {
  drawParallax(context, settings, frame, images)
  const current = frame.current
  const previous = frame.previous
  const playerY = lerp(previous.playerY, current.playerY, frame.alpha)
  const velocity = lerp(previous.velocity, current.velocity, frame.alpha)

  if (active && velocity < -1) {
    const gradient = context.createLinearGradient(
      FLAP_PLAYER_X - 70,
      0,
      FLAP_PLAYER_X + 26,
      0,
    )
    gradient.addColorStop(0, 'rgba(255,255,255,0)')
    gradient.addColorStop(0.55, 'rgba(255,255,255,0.32)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    context.fillStyle = gradient
    context.fillRect(
      FLAP_PLAYER_X - 70,
      playerY + FLAP_PLAYER_SIZE * 0.35,
      96,
      32,
    )
  }

  if (isSpriteConfig(settings.sprite)) {
    const image = images.get(settings.sprite.sheetUrl)
    if (image) {
      drawSprite(
        context,
        image,
        settings.sprite,
        FLAP_PLAYER_X,
        playerY,
        now,
        true,
      )
    }
  } else {
    const image = images.get(settings.sprite)
    if (image) {
      drawContainedImage(
        context,
        image,
        FLAP_PLAYER_X,
        playerY,
        FLAP_PLAYER_SIZE,
        FLAP_PLAYER_SIZE,
        true,
      )
    }
  }

  drawCollectibles(context, frame, images, 'flap')

  const wallImage = images.get(settings.wallSprite)
  let wallPattern = wallPatterns.get(settings.wallSprite)
  if (wallImage && !wallPattern) {
    wallPattern = context.createPattern(wallImage, 'repeat') || undefined
    if (wallPattern) wallPatterns.set(settings.wallSprite, wallPattern)
  }
  if (wallPattern) {
    current.walls.forEach((wall, index) => {
      const oldWall = getPreviousById(previous.walls, wall.id, index)
      const x = oldWall ? lerp(oldWall.x, wall.x, frame.alpha) : wall.x
      const gapTop = wall.gapY - wall.gapSize / 2
      const gapBottom = wall.gapY + wall.gapSize / 2
      fillWall(context, wallPattern!, x, 0, wall.width, gapTop)
      fillWall(
        context,
        wallPattern!,
        x,
        gapBottom,
        wall.width,
        STAGE_SIZE - gapBottom,
      )
    })
  }

  current.enemies.forEach((enemy, index) => {
    const oldEnemy = getPreviousById(previous.enemies, enemy.id, index)
    const x = oldEnemy ? lerp(oldEnemy.x, enemy.x, frame.alpha) : enemy.x
    const y = oldEnemy ? lerp(oldEnemy.y, enemy.y, frame.alpha) : enemy.y

    if (isSpriteConfig(settings.enemySprite)) {
      const image = images.get(settings.enemySprite.sheetUrl)
      if (image) {
        drawSprite(
          context,
          image,
          settings.enemySprite,
          x,
          y,
          now,
        )
      }
      return
    }

    const image = images.get(settings.enemySprite)
    if (image) {
      drawContainedImage(
        context,
        image,
        x,
        y,
        enemy.size,
        enemy.size,
      )
    }
  })
}

export const SideScrollerCanvas = memo(function SideScrollerCanvas({
  gameType,
  settings,
  renderFrameRef,
  backdrop,
  label,
  active,
}: {
  gameType: 'run' | 'flap'
  settings: SideScrollerSettings
  renderFrameRef: RefObject<ArcadeRenderFrame | null>
  backdrop: string
  label: string
  active: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const activeRef = useRef(active)
  activeRef.current = active

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d', { alpha: true })
    if (!canvas || !context) return

    let disposed = false
    let animationFrame = 0
    const images = new Map<string, CanvasImage>()
    const wallPatterns = new Map<string, CanvasPattern>()

    for (const source of collectImageSources(gameType, settings)) {
      void loadCanvasImage(source).then((image) => {
        if (!disposed && image) images.set(source, image)
      })
    }

    const draw = (now: number) => {
      if (disposed) return
      animationFrame = requestAnimationFrame(draw)
      context.clearRect(0, 0, STAGE_SIZE, STAGE_SIZE)
      const frame = renderFrameRef.current
      if (!frame) return

      context.imageSmoothingEnabled = true
      if (gameType === 'run') {
        drawRun(
          context,
          settings as RunSettings,
          frame,
          images,
          now,
        )
      } else {
        drawFlap(
          context,
          settings as FlapSettings,
          frame,
          images,
          wallPatterns,
          now,
          activeRef.current,
        )
      }
    }

    animationFrame = requestAnimationFrame(draw)
    return () => {
      disposed = true
      cancelAnimationFrame(animationFrame)
    }
  }, [gameType, renderFrameRef, settings])

  return (
    <>
      <Image
        src={backdrop}
        alt=""
        fill
        priority
        sizes="600px"
        className="object-cover"
      />
      <canvas
        ref={canvasRef}
        width={STAGE_SIZE}
        height={STAGE_SIZE}
        role="img"
        aria-label={label}
        data-testid={`side-scroller-canvas-${gameType}`}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
    </>
  )
})
