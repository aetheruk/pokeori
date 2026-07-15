'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, Image as ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export interface TaskIcon {
  type: 'item' | 'pokemon' | 'trainer' | 'local' | 'lucide'
  id: string
}

interface IconSelectorProps {
  value?: TaskIcon
  onChange: (icon: TaskIcon) => void
}

export function IconSelector({ value, onChange }: IconSelectorProps) {
  const [open, setOpen] = React.useState(false)

  // Local state for editing before commit
  const [type, setType] = React.useState<TaskIcon['type']>(value?.type || 'local')
  const [id, setId] = React.useState(value?.id || '')

  React.useEffect(() => {
    if (value) {
      setType(value.type)
      setId(value.id)
    }
  }, [value])

  const handleApply = () => {
    onChange({ type, id })
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left font-normal">
          {value ? (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs uppercase text-muted-foreground">
                {value.type}
              </span>
              <span>{value.id}</span>
            </div>
          ) : (
            <span>Select Icon...</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-4" align="start">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Icon Settings</h4>
            <p className="text-sm text-muted-foreground">Configure the icon display.</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="icon-type">Type</Label>
            <ToggleGroup
              type="single"
              value={type}
              onValueChange={(v) => v && setType(v as any)}
              className="justify-start"
            >
              <ToggleGroupItem value="local" aria-label="Local Image">
                Local
              </ToggleGroupItem>
              <ToggleGroupItem value="pokemon" aria-label="Pokemon">
                Pokemon
              </ToggleGroupItem>
              <ToggleGroupItem value="item" aria-label="Item">
                Item
              </ToggleGroupItem>
              <ToggleGroupItem value="trainer" aria-label="Trainer">
                Trainer
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="icon-id">ID / Path</Label>
            <Input
              id="icon-id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder={type === 'local' ? '/sprites/...' : 'ID'}
              className="h-8"
            />
          </div>
          <Button onClick={handleApply}>Apply Icon</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
