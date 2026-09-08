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
      <div className="grid grid-cols-3 gap-2">
        {choices.map(({ value: option, label, Icon }) => (
          <label key={option} className="relative cursor-pointer">
            <input
              className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
            />
            <span className="flex min-h-24 flex-col items-center justify-center gap-1 rounded-lg border border-game-border bg-game-surface-raised p-2 peer-checked:border-game-moss peer-checked:bg-game-moss/10 peer-focus-visible:ring-2 peer-focus-visible:ring-game-moss peer-disabled:opacity-50">
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
