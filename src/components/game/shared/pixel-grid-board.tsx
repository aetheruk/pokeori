'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { GRID_LOGICAL_TILE_SIZE } from '@/data/games/grid-tiles'
import { cn } from '@/lib/utils'

interface PixelGridBoardProps {
  cols: number
  rows: number
  children: ReactNode
  className?: string
  maxWidth?: number
  ariaLabel?: string
  frameSrc?: string
}

export function getPixelGridMetrics(
  availableWidth: number,
  cols: number,
  rows: number,
  maxWidth = 500,
) {
  const safeCols = Math.max(cols, 1)
  const safeRows = Math.max(rows, 1)
  const usableWidth = Math.max(
    GRID_LOGICAL_TILE_SIZE * safeCols,
    Math.min(Math.floor(availableWidth), maxWidth),
  )
  const scale = Math.max(
    1,
    Math.floor(usableWidth / (safeCols * GRID_LOGICAL_TILE_SIZE)),
  )
  const tileSize = GRID_LOGICAL_TILE_SIZE * scale

  return {
    scale,
    tileSize,
    width: tileSize * safeCols,
    height: tileSize * safeRows,
  }
}

/**
 * Responsive grid shell that only scales 16px logical tiles by whole numbers.
 * This keeps pixel art sharp while game rules continue to operate in cells.
 */
export function PixelGridBoard({
  cols,
  rows,
  children,
  className,
  maxWidth = 500,
  ariaLabel,
  frameSrc,
}: PixelGridBoardProps) {
  const measureRef = useRef<HTMLDivElement>(null)
  const [availableWidth, setAvailableWidth] = useState(maxWidth)

  useEffect(() => {
    const element = measureRef.current
    if (!element) return

    const updateWidth = () => setAvailableWidth(element.clientWidth)
    updateWidth()
    const observer = new ResizeObserver(updateWidth)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const frameCells = frameSrc ? 2 : 0
  const metrics = getPixelGridMetrics(
    availableWidth,
    cols + frameCells,
    rows + frameCells,
    maxWidth,
  )
  const contentWidth = metrics.tileSize * cols
  const contentHeight = metrics.tileSize * rows
  const style = {
    '--grid-tile-px': `${metrics.tileSize}px`,
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, var(--grid-tile-px))`,
    gridTemplateRows: `repeat(${rows}, var(--grid-tile-px))`,
    width: `${contentWidth}px`,
    height: `${contentHeight}px`,
    gap: 0,
    boxSizing: 'content-box',
    ...(frameSrc
      ? {
          borderStyle: 'solid',
          borderWidth: 'var(--grid-tile-px)',
          borderImageSource: `url('${frameSrc}')`,
          borderImageSlice: '16',
          // The source is a 3x3 16px atlas. Repeating preserves native pixels
          // across arbitrarily wide boards; stretching would blur/distort edges.
          borderImageRepeat: 'repeat',
        }
      : {}),
  } as CSSProperties

  return (
    <div ref={measureRef} className="flex w-full max-w-[92vw] justify-center">
      <div
        role="grid"
        aria-label={ariaLabel}
        data-logical-tile-size={GRID_LOGICAL_TILE_SIZE}
        data-pixel-scale={metrics.scale}
        className={cn('shrink-0', className)}
        style={style}
      >
        {children}
      </div>
    </div>
  )
}
