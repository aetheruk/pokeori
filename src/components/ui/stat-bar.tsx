import React from 'react'

interface StatBarProps {
  label: string
  value: number
  max: number
  color: string
}

export function StatBar({ label, value, max, color }: StatBarProps) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="w-8 font-bold text-game-muted">{label}</span>
      <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-game-surface-raised">
        <div
          className={`h-full rounded-full ${color} opacity-80`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-8 text-right font-mono text-game-muted">{value}</span>
    </div>
  )
}
