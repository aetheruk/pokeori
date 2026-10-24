'use client'

import { Mars, Minus, Venus } from 'lucide-react'
import { useId } from 'react'
import { GridPlayerSprite } from '@/components/game/shared/grid-player-sprite'
import type { TrainerGender } from '@/utilities/trainer-appearance'

const choices = [
  { value: 'male', label: 'Male', Icon: Mars },
  { value: 'female', label: 'Female', Icon: Venus },
  { value: 'neither', label: 'Neither', Icon: Minus },
] as const

export function TrainerGenderPicker({
  value,
  onChange,
}: {
  value: TrainerGender
  onChange: (value: TrainerGender) => void
}) {
  const name = useId()
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-semibold">Gender</legend>
      <p className="text-xs leading-relaxed text-game-muted">
        Used when the selected avatar has no matching overworld sprite.
      </p>
      <div className="grid grid-cols-3 gap-2">
        {choices.map(({ value: option, label, Icon }) => (
          <label key={option} className="relative block min-w-0 cursor-pointer">
            <input
              className="peer sr-only"
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
            />
            <span className="flex min-h-24 flex-col items-center justify-center gap-1 rounded-md border border-game-border bg-game-surface-raised p-2 peer-checked:border-game-charcoal peer-checked:bg-game-charcoal/5 peer-focus-visible:ring-2 peer-focus-visible:ring-game-charcoal peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-game-canvas peer-disabled:opacity-50">
              <GridPlayerSprite gender={option} className="h-12 w-12" />
              <span className="flex items-center gap-1.5 text-sm">
                <Icon
                  aria-hidden="true"
                  className={
                    option === 'neither'
                      ? 'h-4 w-4 text-game-moss-strong'
                      : 'h-4 w-4'
                  }
                />
                {label}
              </span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
