// Abstract elemental materials, with no horizon, architecture, or scenery.
// Cache the material layer; animate only its light, currents, and particles.
export type SceneTone = {
  base: string
  depth: string
  glow: string
  light: string
}
const TAU = Math.PI * 2
const seed = (n: number) => {
  const v = Math.sin(n * 127.1 + 13.7) * 43758.5453
  return v - Math.floor(v)
}
const wrap = (n: number, length: number) => ((n % length) + length) % length

function color(hex: string, alpha: number) {
  const n = Number.parseInt(hex.slice(1), 16)
  return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${alpha})`
}

function line(
  ctx: CanvasRenderingContext2D,
  points: number[][],
  ink: string,
  width = 1,
) {
  ctx.beginPath()
  points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)))
  ctx.strokeStyle = ink
  ctx.lineWidth = width
  ctx.stroke()
}

function bloom(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  ink: string,
  strength: number,
) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
  gradient.addColorStop(0, color(ink, strength))
  gradient.addColorStop(0.45, color(ink, strength * 0.35))
  gradient.addColorStop(1, color(ink, 0))
  ctx.fillStyle = gradient
  ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2)
}

function dot(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  ink: string,
) {
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, TAU)
  ctx.fillStyle = ink
  ctx.fill()
}

function leaf(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  angle: number,
  tone: SceneTone,
  alpha: number,
) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle)
  const fill = ctx.createLinearGradient(-size, 0, size, 0)
  fill.addColorStop(0, color(tone.glow, alpha * 0.1))
  fill.addColorStop(0.6, color(tone.glow, alpha))
  fill.addColorStop(1, color(tone.light, alpha * 0.4))
  ctx.beginPath()
  ctx.moveTo(-size, 0)
  ctx.bezierCurveTo(-size * 0.2, -size * 0.7, size * 0.55, -size * 0.4, size, 0)
  ctx.bezierCurveTo(
    size * 0.3,
    size * 0.55,
    -size * 0.45,
    size * 0.65,
    -size,
    0,
  )
  ctx.fillStyle = fill
  ctx.fill()
  line(
    ctx,
    [
      [-size * 0.85, 0],
      [size * 0.85, 0],
    ],
    color(tone.light, alpha * 0.5),
  )
  for (let i = -2; i <= 2; i++) {
    line(
      ctx,
      [
        [i * size * 0.22, 0],
        [(i + 0.9) * size * 0.22, -size * 0.24],
      ],
      color(tone.light, alpha * 0.25),
    )
    line(
      ctx,
      [
        [i * size * 0.22, 0],
        [(i + 0.9) * size * 0.22, size * 0.26],
      ],
      color(tone.light, alpha * 0.25),
    )
  }
  ctx.restore()
}

function facets(ctx: CanvasRenderingContext2D, tone: SceneTone, ice: boolean) {
  const spacing = ice ? 125 : 160
  const point = (col: number, row: number) => [
    col * spacing + (seed(col * 19 + row * 71) - 0.5) * spacing * 0.8,
    row * spacing + (seed(col * 41 + row * 13) - 0.5) * spacing * 0.8,
  ]
  for (let row = -1; row < 6; row++)
    for (let col = -1; col < 9; col++) {
      const a = point(col, row),
        b = point(col + 1, row),
        c = point(col, row + 1),
        d = point(col + 1, row + 1)
      for (const points of [
        [a, b, c],
        [b, d, c],
      ]) {
        ctx.beginPath()
        points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)))
        ctx.closePath()
        const fill = ctx.createLinearGradient(a[0], a[1], d[0], d[1])
        const alpha =
          0.025 + seed(col * 21 + row * 37 + points[0][0]) * (ice ? 0.13 : 0.09)
        fill.addColorStop(0, color(tone.light, alpha))
        fill.addColorStop(1, color(tone.glow, alpha * 0.1))
        ctx.fillStyle = fill
        ctx.fill()
        ctx.strokeStyle = color(tone.light, ice ? 0.1 : 0.055)
        ctx.lineWidth = 0.7
        ctx.stroke()
      }
    }
}

function frost(ctx: CanvasRenderingContext2D, tone: SceneTone) {
  for (let i = 0; i < 12; i++) {
    const x = seed(i + 10) * 1100 - 50,
      y = seed(i + 31) * 700 - 50
    const length = 35 + seed(i + 9) * 70
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(seed(i) * TAU)
    for (let arm = 0; arm < 6; arm++) {
      ctx.rotate(TAU / 6)
      line(
        ctx,
        [
          [0, 0],
          [length, 0],
        ],
        color(tone.light, 0.12),
      )
      for (let j = 1; j < 4; j++) {
        const at = (length * j) / 4,
          side = length * 0.15
        line(
          ctx,
          [
            [at - side, -side],
            [at, 0],
            [at - side, side],
          ],
          color(tone.light, 0.1),
        )
      }
    }
    ctx.restore()
  }
}

export function withFieldCoordinates(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  draw: () => void,
) {
  const scale = Math.max(width / 1000, height / 600)
  ctx.save()
  ctx.translate((width - 1000 * scale) / 2, (height - 600 * scale) / 2)
  ctx.scale(scale, scale)
  draw()
  ctx.restore()
}

export function paintFieldBase(
  ctx: CanvasRenderingContext2D,
  type: string,
  tone: SceneTone,
) {
  const field = ctx.createLinearGradient(0, 0, 1000, 600)
  field.addColorStop(0, tone.depth)
  field.addColorStop(0.45, tone.base)
  field.addColorStop(1, tone.depth)
  ctx.fillStyle = field
  ctx.fillRect(0, 0, 1000, 600)
  bloom(ctx, 760, 180, 470, tone.glow, 0.22)
  bloom(ctx, 120, 550, 390, tone.glow, 0.13)

  switch (type) {
    case 'rock':
    case 'ice':
      facets(ctx, tone, type === 'ice')
      if (type === 'ice') frost(ctx, tone)
      break
    case 'grass':
      for (let i = 0; i < 17; i++)
        leaf(
          ctx,
          seed(i + 9) * 1200 - 100,
          seed(i + 33) * 800 - 100,
          65 + seed(i + 70) * 150,
          seed(i + 10) * TAU,
          tone,
          0.08 + seed(i + 4) * 0.12,
        )
      break
    case 'bug':
      // Translucent wing membranes, branching veins, and tiny chitin cells.
      for (let i = 0; i < 6; i++) {
        ctx.save()
        ctx.translate(i % 2 ? 1060 : -60, 80 + i * 90)
        ctx.rotate(i % 2 ? 2.8 : -0.3)
        ctx.beginPath()
        ctx.ellipse(180, 0, 250, 105, 0, 0, TAU)
        ctx.fillStyle = color(tone.glow, 0.04)
        ctx.fill()
        for (let j = 0; j < 8; j++) {
          const x = 50 + j * 45,
            y = Math.sin(j * 0.8) * 55
          line(
            ctx,
            [
              [0, 0],
              [x, y],
              [x + 80, y * 1.5],
            ],
            color(tone.light, 0.085),
          )
          line(
            ctx,
            [
              [x, y],
              [x + 32, y - 42],
            ],
            color(tone.glow, 0.09),
          )
        }
        ctx.restore()
      }
      break
    case 'steel':
      for (let i = 0; i < 430; i++) {
        const y = seed(i + 4) * 600
        line(
          ctx,
          [
            [0, y],
            [1000, y - 180],
          ],
          color(tone.light, 0.008 + seed(i) * 0.025),
          0.5,
        )
      }
      break
    case 'dragon':
      for (let row = -1; row < 9; row++)
        for (let col = -1; col < 13; col++) {
          const x = col * 95 + (row % 2) * 47,
            y = row * 83
          ctx.beginPath()
          ctx.moveTo(x - 46, y)
          ctx.quadraticCurveTo(x - 40, y + 48, x, y + 74)
          ctx.quadraticCurveTo(x + 40, y + 48, x + 46, y)
          ctx.strokeStyle = color(tone.glow, 0.08 + seed(row * 19 + col) * 0.1)
          ctx.lineWidth = 1
          ctx.stroke()
        }
      break
    case 'ground':
      for (let i = 0; i < 65; i++) {
        ctx.beginPath()
        for (let x = -10; x <= 1010; x += 15) {
          const y =
            i * 12 +
            Math.sin(x * 0.007 + i * 0.09) * 55 +
            Math.sin(x * 0.015 + i * 0.13) * 14
          if (x === -10) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = color(tone.light, 0.015 + seed(i) * 0.06)
        ctx.lineWidth = 1
        ctx.stroke()
      }
      break
    case 'fighting':
      for (let i = 0; i < 22; i++) {
        const x = seed(i) * 1300 - 150,
          y = seed(i + 31) * 750 - 75
        line(
          ctx,
          [
            [x, y],
            [x + 120 + seed(i + 19) * 240, y - 80 - seed(i + 19) * 160],
          ],
          color(tone.glow, 0.03 + seed(i + 9) * 0.045),
          2 + seed(i + 50) * 22,
        )
      }
      break
    case 'psychic':
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.ellipse(
          650,
          280,
          120 + i * 43,
          90 + i * 18,
          -0.5 + i * 0.16,
          0,
          TAU,
        )
        ctx.strokeStyle = color(tone.light, 0.035)
        ctx.lineWidth = 1
        ctx.stroke()
      }
      break
  }

  // Fine material texture avoids flat fills without adding recognizable objects.
  for (
    let i = 0;
    i < (type === 'ground' || type === 'rock' ? 4200 : 1600);
    i++
  ) {
    ctx.fillStyle = color(tone.light, 0.018 + seed(i + 55) * 0.03)
    ctx.fillRect(seed(i + 701) * 1000, seed(i + 1301) * 600, 0.8, 0.8)
  }
}

function currents(
  ctx: CanvasRenderingContext2D,
  tone: SceneTone,
  time: number,
  kind: string,
) {
  const vertical = ['fire', 'ghost', 'dragon'].includes(kind)
  const count = kind === 'water' ? 16 : 7
  for (let i = 0; i < count; i++) {
    ctx.save()
    if (vertical) {
      ctx.translate(0, 600)
      ctx.rotate(-Math.PI / 2)
    }
    const span = vertical ? 600 : 1000
    const cross = vertical ? 1000 : 600
    const at = (cross * (i + 0.3)) / count
    const speed = kind === 'fire' ? 0.6 : 0.18
    const thickness = kind === 'water' ? 5 : kind === 'flying' ? 24 : 70
    const gradient = ctx.createLinearGradient(0, at - 90, 0, at + 130)
    gradient.addColorStop(0, color(tone.glow, 0))
    gradient.addColorStop(0.4, color(tone.glow, kind === 'dark' ? 0.045 : 0.09))
    gradient.addColorStop(
      0.55,
      color(tone.light, kind === 'fire' ? 0.17 : 0.08),
    )
    gradient.addColorStop(1, color(tone.glow, 0))
    ctx.beginPath()
    for (let x = -50; x <= span + 50; x += 12) {
      const y =
        at +
        Math.sin(x * 0.008 + time * speed + i * 1.5) * 42 +
        Math.sin(x * 0.015 - time * speed * 0.6 + i) * 14
      if (x === -50) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    for (let x = span + 50; x >= -50; x -= 12) {
      const y =
        at +
        thickness +
        Math.sin(x * 0.008 + time * speed + i * 1.5 + 0.3) * 42 +
        Math.sin(x * 0.015 - time * speed * 0.6 + i) * 14
      ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()
    ctx.restore()
  }
}

function electricity(
  ctx: CanvasRenderingContext2D,
  tone: SceneTone,
  time: number,
) {
  for (let branch = 0; branch < 3; branch++) {
    const phase = wrap(time * 0.16 + branch * 0.37, 1)
    const alpha = Math.sin(phase * Math.PI) ** 6
    const points: number[][] = []
    for (let i = 0; i < 12; i++)
      points.push([
        i * 105 - 70,
        120 + branch * 170 + (seed(i + branch * 29) - 0.5) * 110,
      ])
    line(ctx, points, color(tone.glow, alpha * 0.07), 16)
    line(ctx, points, color(tone.glow, alpha * 0.18), 5)
    line(ctx, points, color(tone.light, alpha * 0.45), 1.2)
    const [x, y] = points[5]
    line(
      ctx,
      [
        [x, y],
        [x + 42, y - 48],
        [x + 85, y - 36],
        [x + 125, y - 83],
      ],
      color(tone.light, alpha * 0.2),
      0.8,
    )
  }
}

export function paintFieldMotion(
  ctx: CanvasRenderingContext2D,
  type: string,
  tone: SceneTone,
  time: number,
) {
  bloom(
    ctx,
    660 + Math.sin(time * 0.14) * 80,
    260 + Math.cos(time * 0.17) * 75,
    340,
    tone.glow,
    0.12,
  )
  switch (type) {
    case 'fire':
      for (let i = 0; i < 12; i++) {
        const x = i * 100 - 45
        const tip = 80 + seed(i + 19) * 300 + Math.sin(time * 0.45 + i) * 40
        const sway = Math.sin(time * 0.6 + i * 2) * 28
        const flame = ctx.createLinearGradient(x, tip, x, 700)
        flame.addColorStop(0, color(tone.glow, 0))
        flame.addColorStop(0.35, color(tone.glow, 0.12))
        flame.addColorStop(0.8, color(tone.light, 0.14))
        flame.addColorStop(1, color(tone.glow, 0.025))
        ctx.beginPath()
        ctx.moveTo(x - 65, 700)
        ctx.bezierCurveTo(x - 100, 420, x + 60 + sway, tip + 180, x + sway, tip)
        ctx.bezierCurveTo(x + 110 + sway, tip + 240, x + 20, 460, x + 65, 700)
        ctx.closePath()
        ctx.fillStyle = flame
        ctx.fill()
      }
      break
    case 'water':
    case 'flying':
    case 'ghost':
    case 'dragon':
    case 'dark':
      currents(ctx, tone, time, type)
      break
    case 'poison':
      for (let i = 0; i < 9; i++)
        bloom(
          ctx,
          seed(i + 4) * 1000 + Math.sin(time * 0.15 + i) * 50,
          seed(i + 19) * 600 + Math.cos(time * 0.12 + i) * 40,
          110 + seed(i + 32) * 150,
          tone.glow,
          0.09,
        )
      break
    case 'electric':
      electricity(ctx, tone, time)
      break
    case 'steel': {
      const x = wrap(time * 24, 1600) - 300
      ctx.save()
      ctx.translate(x, 0)
      ctx.rotate(0.24)
      const sheen = ctx.createLinearGradient(-140, 0, 140, 0)
      sheen.addColorStop(0, color(tone.light, 0))
      sheen.addColorStop(0.5, color(tone.light, 0.13))
      sheen.addColorStop(1, color(tone.light, 0))
      ctx.fillStyle = sheen
      ctx.fillRect(-140, -400, 280, 1400)
      ctx.restore()
      break
    }
    case 'psychic':
      for (let i = 0; i < 4; i++) {
        ctx.save()
        ctx.translate(650, 280)
        ctx.rotate(-0.5 + Math.sin(time * 0.12 + i) * 0.15)
        const gradient = ctx.createLinearGradient(-250, 0, 250, 0)
        gradient.addColorStop(0, color(tone.glow, 0))
        gradient.addColorStop(0.55, color(tone.light, 0.18))
        gradient.addColorStop(1, color(tone.glow, 0))
        ctx.beginPath()
        ctx.ellipse(
          0,
          0,
          120 + i * 43,
          90 + i * 18,
          i * 0.16,
          time * 0.12 + i,
          time * 0.12 + i + Math.PI * 1.3,
        )
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.5
        ctx.stroke()
        ctx.restore()
      }
      break
    case 'normal':
      for (let i = 0; i < 5; i++) {
        ctx.save()
        ctx.translate(200 + i * 180, 300 + Math.sin(time * 0.15 + i) * 100)
        ctx.rotate(-0.4)
        ctx.scale(1.6, 0.6)
        bloom(ctx, 0, 0, 190, tone.light, 0.075)
        ctx.restore()
      }
      break
    case 'fairy':
      for (let i = 0; i < 10; i++)
        bloom(
          ctx,
          seed(i) * 1000,
          seed(i + 31) * 600 + Math.sin(time * 0.2 + i) * 25,
          30 + seed(i + 9) * 60,
          i % 3 ? tone.glow : '#b9b7ed',
          0.09,
        )
      break
    case 'fighting':
      for (let i = 0; i < 7; i++) {
        const phase = wrap(time * 0.09 + i * 0.17, 1)
        const x = phase * 1400 - 200,
          y = seed(i + 4) * 900 - phase * 350
        const fade = Math.sin(phase * Math.PI) * 0.09
        line(
          ctx,
          [
            [x - 150, y + 100],
            [x + 150, y - 100],
          ],
          color(tone.light, fade),
          1.2,
        )
      }
      break
  }

  for (let i = 0; i < (type === 'ground' ? 65 : 24); i++) {
    const s = seed(i + 88)
    const rise = ['fire', 'water', 'poison', 'ghost', 'dragon'].includes(type)
    const x =
      wrap(
        seed(i + 9) * 1120 +
          time * (type === 'ground' || type === 'flying' ? 20 : 4) +
          Math.sin(time * 0.3 + i) * 9,
        1120,
      ) - 60
    const y =
      wrap(
        seed(i + 40) * 700 +
          time * (rise ? -8 - s * 12 : type === 'ice' ? 10 : 2),
        700,
      ) - 50
    const alpha = (0.1 + s * 0.22) * (0.65 + Math.sin(time * 0.65 + i) * 0.35)
    if (type === 'grass')
      leaf(ctx, x, y, 5 + s * 5, i + time * 0.09, tone, alpha)
    else if (type === 'water' || type === 'poison') {
      ctx.beginPath()
      ctx.arc(x, y, 2 + s * 4, 0, TAU)
      ctx.strokeStyle = color(tone.light, alpha * 0.6)
      ctx.lineWidth = 0.6
      ctx.stroke()
    } else if (type === 'fairy') {
      const size = 2 + s * 4
      ctx.save()
      ctx.translate(x, y)
      ctx.beginPath()
      ctx.moveTo(0, -size)
      ctx.quadraticCurveTo(0, 0, size, 0)
      ctx.quadraticCurveTo(0, 0, 0, size)
      ctx.quadraticCurveTo(0, 0, -size, 0)
      ctx.quadraticCurveTo(0, 0, 0, -size)
      ctx.fillStyle = color(tone.light, alpha)
      ctx.fill()
      ctx.restore()
    } else if (type === 'bug') {
      bloom(ctx, x, y, 11, tone.glow, alpha * 0.5)
      dot(ctx, x, y, 1, color(tone.light, alpha))
    } else
      dot(
        ctx,
        x,
        y,
        type === 'ice' ? 1 + s : 0.5 + s,
        color(tone.light, alpha * (type === 'dark' ? 0.3 : 1)),
      )
  }

  const vignette = ctx.createRadialGradient(500, 300, 120, 500, 300, 620)
  vignette.addColorStop(0, color(tone.base, 0.1))
  vignette.addColorStop(1, color(tone.base, 0.48))
  ctx.fillStyle = vignette
  ctx.fillRect(0, 0, 1000, 600)
}
