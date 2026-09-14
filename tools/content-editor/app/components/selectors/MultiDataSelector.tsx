'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'

interface MultiDataSelectorProps {
  values: string[]
  onSelect: (values: string[]) => void
  fetcher: () => Promise<{ id: string | number; name: string }[]>
  placeholder?: string
  emptyMessage?: string
}

export function MultiDataSelector({
  values = [],
  onSelect,
  fetcher,
  placeholder = 'Select items...',
  emptyMessage = 'No results found.',
}: MultiDataSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [items, setItems] = React.useState<{ id: string | number; name: string }[]>([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const loadItems = async () => {
      setLoading(true)
      try {
        const data = await fetcher()
        setItems(data)
      } catch (error) {
        console.error('Error fetching items:', error)
      } finally {
        setLoading(false)
      }
    }
    loadItems()
  }, [fetcher])

  const handleUnselect = (id: string) => {
    onSelect(values.filter((v) => v !== id))
  }

  const handleSelect = (id: string) => {
    if (values.includes(id)) {
      handleUnselect(id)
    } else {
      onSelect([...values, id])
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={loading}
          >
            <span className="truncate">
              {values.length === 0 ? placeholder : `${values.length} selected`}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.name}
                    onSelect={() => handleSelect(String(item.id))}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        values.includes(String(item.id)) ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {values.length > 0 && (
        <div className="flex flex-wrap gap-1 max-h-[100px] overflow-y-auto p-1">
          {values.map((val) => {
            const item = items.find((i) => String(i.id) === val)
            return (
              <Badge key={val} variant="secondary" className="flex items-center gap-1">
                {item?.name || val}
                <button
                  type="button"
                  onClick={() => handleUnselect(val)}
                  className="rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            )
          })}
        </div>
      )}
    </div>
  )
}
