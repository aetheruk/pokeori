'use client'

import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface PremiumOption {
  id: string
  label: string
  disabled?: boolean
}

interface PremiumSelectProps {
  options: PremiumOption[]
  value: string
  onValueChange: (value: string) => void
  label?: string
  placeholder?: string
  className?: string
}

export function PremiumSelect({
  options,
  value,
  onValueChange,
  label,
  placeholder = 'Select option',
  className,
}: PremiumSelectProps) {
  return (
    <div className={cn('w-full space-y-2', className)}>
      {label && (
        <div className="text-xs font-medium text-game-muted">{label}</div>
      )}

      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full font-medium">
          <div className="flex min-w-0 items-center gap-3">
            <SelectValue placeholder={placeholder} />
          </div>
        </SelectTrigger>

        <SelectContent className="p-1.5">
          {options.map((option) => (
            <SelectItem
              key={option.id}
              value={option.id}
              disabled={option.disabled}
              className="cursor-pointer"
            >
              <span className="font-medium">{option.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
