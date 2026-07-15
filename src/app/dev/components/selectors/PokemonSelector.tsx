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
import { getPokemonList } from '../../actions'

interface PokemonSelectorProps {
  value?: number
  onSelect: (speciesId: number, name: string) => void
}

export function PokemonSelector({ value, onSelect }: PokemonSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [pokemon, setPokemon] = React.useState<{ id: number; name: string }[]>([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    getPokemonList().then((list) => {
      setPokemon(list)
      setLoading(false)
    })
  }, [])

  const selectedPokemon = pokemon.find((p) => p.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={loading}
        >
          {value ? selectedPokemon?.name || `Pokemon #${value}` : 'Select Pokemon...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search pokemon..." />
          <CommandList>
            <CommandEmpty>No pokemon found.</CommandEmpty>
            <CommandGroup>
              {pokemon.map((p) => (
                <CommandItem
                  key={p.id}
                  value={p.name}
                  onSelect={() => {
                    onSelect(p.id, p.name)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn('mr-2 h-4 w-4', value === p.id ? 'opacity-100' : 'opacity-0')}
                  />
                  #{p.id} {p.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
