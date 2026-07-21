'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
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
import { getPokemonForms } from '../../actions'

interface FormSelectorProps {
  speciesId?: number
  value?: string
  onChange: (formId: string, formName: string) => void
}

export function FormSelector({ speciesId, value, onChange }: FormSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [forms, setForms] = React.useState<{ id: string; name: string }[]>([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (!speciesId) {
      setForms([])
      return
    }

    setLoading(true)
    getPokemonForms(speciesId).then((list) => {
      setForms(list)
      setLoading(false)
    })
  }, [speciesId])

  const selectedForm = forms.find((f) => f.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={!speciesId || loading || forms.length === 0}
        >
          {value
            ? selectedForm?.name || value
            : forms.length > 0
              ? 'Select Form...'
              : 'No forms available'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search form..." />
          <CommandList>
            <CommandEmpty>No form found.</CommandEmpty>
            <CommandGroup>
              {forms.map((f) => (
                <CommandItem
                  key={f.id}
                  value={f.name}
                  onSelect={() => {
                    onChange(f.id, f.name)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn('mr-2 h-4 w-4', value === f.id ? 'opacity-100' : 'opacity-0')}
                  />
                  {f.name} ({f.id})
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
