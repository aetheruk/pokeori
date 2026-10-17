'use client'

import { Package } from 'lucide-react'
import Image from 'next/image'
import { type CSSProperties, useEffect, useId, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ItemSprite } from '@/components/ui/item-sprite'
import type {
  UndergroundMiningSettings,
  UndergroundMiningTool,
} from '@/data/games/underground-mining/types'
import { cn } from '@/lib/utils'
import {
  UNDERGROUND_MINING_TOOL_DAMAGE,
  getUndergroundMiningVisibleTreasures,
  type UndergroundMiningPublicRound,
} from '@/utilities/research/underground-mining'
import styles from './underground-mining.module.css'

const ART = '/games/underground-mining'
const CRACK_PATH =
  'M2 17 L19 13 L31 22 L48 10 L65 17 L81 9 L99 21 L115 13 L130 19 L147 7 L163 20 L179 12 L194 23 L211 10 L228 18 L244 8 L263 22 L278 13 L298 18'

interface UndergroundMiningStageProps {
  name: string
  settings: UndergroundMiningSettings
  round: UndergroundMiningPublicRound
  selectedTool: UndergroundMiningTool
  busy: boolean
  error: string | null
  onToolChange: (tool: UndergroundMiningTool) => void
  onStrike: (x: number, y: number) => Promise<void>
}

function rockTexture(layers: number, bedrock: boolean) {
  if (bedrock) return 'bedrock'
  if (layers >= 5) return 'rock-thick'
  if (layers >= 3) return 'rock-chipped'
  if (layers === 2) return 'rock-rust'
  if (layers === 1) return 'rock-thin'
  return 'earth'
}

function describeCell(cell: UndergroundMiningPublicRound['cells'][number]) {
  if (cell.visibleItemId) return 'Exposed treasure'
  if (cell.bedrock) return 'Unbreakable bedrock'
  return cell.layersRemaining
    ? `${cell.layersRemaining} rock layers`
    : 'Excavated earth'
}

export function UndergroundMiningStage({
  name,
  settings,
  round,
  selectedTool,
  busy,
  error,
  onToolChange,
  onStrike,
}: UndergroundMiningStageProps) {
  const { cols, rows } = round.gridSize
  const [target, setTarget] = useState<{ x: number; y: number } | null>(null)
  const [impact, setImpact] = useState<{
    x: number
    y: number
    tool: UndergroundMiningTool
    id: number
  } | null>(null)
  const impactId = useRef(0)
  const wallRef = useRef<HTMLFieldSetElement>(null)
  const progress = Math.min(1, round.wallStress / round.wallStressLimit)
  const ended = round.status !== 'playing'
  const clipPrefix = useId().replaceAll(':', '')
  const visibleTreasures = getUndergroundMiningVisibleTreasures(round)

  useEffect(() => {
    if (!impact) return
    const timer = window.setTimeout(() => setImpact(null), 520)
    return () => window.clearTimeout(timer)
  }, [impact])

  useEffect(() => {
    const selectTool = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLElement &&
        event.target.closest('input, textarea, select, [role="dialog"]')
      )
        return
      if (event.key === '1' || event.key === '2') {
        event.preventDefault()
        onToolChange(event.key === '1' ? 'pickaxe' : 'hammer')
      }
    }
    window.addEventListener('keydown', selectTool)
    return () => window.removeEventListener('keydown', selectTool)
  }, [onToolChange])

  const hit = (x: number, y: number) => {
    if (busy || ended) return
    setTarget(null)
    setImpact({ x, y, tool: selectedTool, id: ++impactId.current })
    void onStrike(x, y)
  }

  const focusCell = (x: number, y: number) => {
    const boundedX = Math.max(0, Math.min(cols - 1, x))
    const boundedY = Math.max(0, Math.min(rows - 1, y))
    wallRef.current
      ?.querySelector<HTMLButtonElement>(
        `[data-cell="${boundedX}:${boundedY}"]`,
      )
      ?.focus()
  }

  return (
    <main className={styles.game}>
      <h1 className="sr-only">{name}</h1>
      <picture className={styles.sceneArt}>
        <source
          media="(orientation: portrait) and (max-width: 767px)"
          srcSet={settings.wallTexturePortrait || `${ART}/scene-portrait.avif`}
        />
        <Image
          src={
            settings.wallTexture || '/backgrounds/underground-mining-wall.avif'
          }
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none object-cover"
        />
      </picture>
      <div className={styles.sceneShade} aria-hidden />

      <header className={styles.hud}>
        <div
          role="img"
          className={styles.treasures}
          aria-label={`${round.foundItems.length} of ${round.treasureCount} treasures recovered`}
        >
          <div className={styles.treasureSlots} aria-hidden>
            {Array.from(
              { length: Math.min(round.treasureCount, 5) },
              (_, index) => (
                <span
                  key={round.foundItems[index]?.id ?? `empty-${index}`}
                  className={cn(
                    styles.treasureSlot,
                    round.foundItems[index] && styles.recovered,
                  )}
                >
                  {round.foundItems[index] ? (
                    <ItemSprite
                      itemId={round.foundItems[index].itemId}
                      alt=""
                      width={32}
                      height={32}
                    />
                  ) : (
                    <Package />
                  )}
                </span>
              ),
            )}
          </div>
          <span
            aria-hidden
            className="font-mono text-xs font-bold tabular-nums"
          >
            {round.foundItems.length}/{round.treasureCount}
          </span>
        </div>

        <div
          className={styles.stress}
          role="progressbar"
          aria-label="Wall damage"
          aria-valuemin={0}
          aria-valuemax={round.wallStressLimit}
          aria-valuenow={round.wallStress}
        >
          <svg viewBox="0 0 300 32" aria-hidden className={styles.crack}>
            <title>Growing wall crack</title>
            <path
              d={CRACK_PATH}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity=".18"
            />
            <path
              d={CRACK_PATH}
              fill="none"
              stroke={progress >= 0.8 ? '#c66c45' : '#38261c'}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - progress}
              className={styles.crackGrowth}
            />
          </svg>
        </div>
      </header>

      <section className={styles.playArea} aria-label="Excavation">
        <div
          className={styles.wallFrame}
          style={{ '--wall-ratio': cols / rows } as CSSProperties}
        >
          <fieldset
            ref={wallRef}
            aria-label={`${cols} by ${rows} mining wall. Use arrow keys to aim and Enter or Space to strike.`}
            aria-busy={busy}
            className={cn(
              styles.wall,
              impact && styles.struckWall,
              round.status === 'collapsed' && styles.collapsedWall,
            )}
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
              aspectRatio: `${cols} / ${rows}`,
            }}
            onPointerLeave={() => setTarget(null)}
          >
            {round.cells.map((cell) => {
              const aim =
                target &&
                !busy &&
                !ended &&
                UNDERGROUND_MINING_TOOL_DAMAGE[selectedTool].find(
                  (offset) =>
                    target.x + offset.x === cell.x &&
                    target.y + offset.y === cell.y,
                )
              const texture = rockTexture(cell.layersRemaining, cell.bedrock)
              return (
                <button
                  key={`${cell.x}:${cell.y}`}
                  type="button"
                  data-cell={`${cell.x}:${cell.y}`}
                  data-depth={cell.layersRemaining}
                  disabled={ended}
                  aria-disabled={busy || ended}
                  aria-label={`Column ${cell.x + 1}, row ${cell.y + 1}: ${describeCell(cell)}`}
                  className={cn(
                    styles.cell,
                    !cell.layersRemaining && styles.clearedCell,
                    cell.bedrock && styles.bedrockCell,
                  )}
                  style={{ gridColumn: cell.x + 1, gridRow: cell.y + 1 }}
                  onPointerEnter={(event) => {
                    if (event.pointerType !== 'touch')
                      setTarget({ x: cell.x, y: cell.y })
                  }}
                  onFocus={() => setTarget({ x: cell.x, y: cell.y })}
                  onBlur={() => setTarget(null)}
                  onClick={() => hit(cell.x, cell.y)}
                  onKeyDown={(event) => {
                    const directions: Record<string, [number, number]> = {
                      ArrowLeft: [-1, 0],
                      ArrowRight: [1, 0],
                      ArrowUp: [0, -1],
                      ArrowDown: [0, 1],
                    }
                    const direction = directions[event.key]
                    if (direction) {
                      event.preventDefault()
                      focusCell(cell.x + direction[0], cell.y + direction[1])
                    }
                  }}
                >
                  <span
                    className={styles.stone}
                    aria-hidden
                    style={{
                      backgroundImage: `url('${ART}/${texture}.avif')`,
                      transform: `rotate(${((cell.x * 7 + cell.y * 11) % 4) * 90}deg)`,
                    }}
                  />
                  {aim ? (
                    <span
                      aria-hidden
                      className={styles.aim}
                      data-center={target?.x === cell.x && target?.y === cell.y}
                      data-damage={aim.damage}
                    />
                  ) : null}
                </button>
              )
            })}

            <svg
              aria-hidden
              width="0"
              height="0"
              className={styles.clipDefinitions}
            >
              <defs>
                {visibleTreasures
                  .filter((item) => !item.found)
                  .map((item) => (
                    <clipPath
                      key={item.id}
                      id={`${clipPrefix}-treasure-${item.id}`}
                      clipPathUnits="objectBoundingBox"
                    >
                      {item.exposedCells.map((cell) => (
                        <rect
                          key={`${cell.x}:${cell.y}`}
                          x={cell.x / item.width}
                          y={cell.y / item.height}
                          width={1 / item.width}
                          height={1 / item.height}
                        />
                      ))}
                    </clipPath>
                  ))}
              </defs>
            </svg>
            {visibleTreasures.map((item) => (
              <div
                key={item.id}
                aria-hidden
                data-treasure={item.id}
                data-found={item.found}
                className={cn(
                  styles.buriedTreasure,
                  item.found && styles.foundTreasure,
                )}
                style={{
                  left: `${(item.x / cols) * 100}%`,
                  top: `${(item.y / rows) * 100}%`,
                  width: `${(item.width / cols) * 100}%`,
                  height: `${(item.height / rows) * 100}%`,
                  clipPath: item.found
                    ? undefined
                    : `url(#${clipPrefix}-treasure-${item.id})`,
                }}
              >
                <ItemSprite
                  itemId={item.itemId}
                  alt=""
                  width={96}
                  height={96}
                  className={styles.gemSprite}
                  normalizeVisibleBounds={item.width === item.height}
                />
                {item.found ? <span className={styles.discoveryRing} /> : null}
              </div>
            ))}

            {impact ? (
              <div
                key={impact.id}
                aria-hidden
                className={styles.impact}
                style={{
                  left: `${((impact.x + 0.5) / cols) * 100}%`,
                  top: `${((impact.y + 0.5) / rows) * 100}%`,
                }}
              >
                <span className={styles.impactFlash} />
                {Array.from({ length: 7 }, (_, index) => (
                  <span
                    key={index}
                    className={styles.shard}
                    style={
                      {
                        '--shard-x': `${Math.cos(index * 2.4) * (28 + index * 5)}px`,
                        '--shard-y': `${Math.sin(index * 2.4) * 30 + 28}px`,
                        '--shard-turn': `${index * 74}deg`,
                      } as CSSProperties
                    }
                  />
                ))}
                <Image
                  src={`${ART}/${impact.tool}.avif`}
                  alt=""
                  width={128}
                  height={128}
                  className={styles.swing}
                  onAnimationEnd={() => setImpact(null)}
                />
              </div>
            ) : null}
          </fieldset>
        </div>
      </section>

      <footer className={styles.dock}>
        <fieldset className={styles.tools}>
          <legend className="sr-only">Mining tool</legend>
          {(['pickaxe', 'hammer'] as const).map((tool) => (
            <button
              key={tool}
              type="button"
              className={cn(
                styles.tool,
                selectedTool === tool && styles.selectedTool,
              )}
              aria-pressed={selectedTool === tool}
              aria-label={
                tool === 'pickaxe'
                  ? 'Pickaxe: precise strike, lower wall damage. Shortcut 1.'
                  : 'Hammer: wide strike, higher wall damage. Shortcut 2.'
              }
              onClick={() => onToolChange(tool)}
            >
              <Image
                src={`${ART}/${tool}.avif`}
                alt=""
                width={80}
                height={80}
                priority
                className={styles.toolSprite}
              />
            </button>
          ))}
        </fieldset>
      </footer>

      {error ? (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      ) : null}
      <p role="status" aria-live="polite" className="sr-only">
        {round.foundItems.length} of {round.treasureCount} treasures recovered.
        Wall damage {round.wallStress} of {round.wallStressLimit}.
      </p>
    </main>
  )
}
