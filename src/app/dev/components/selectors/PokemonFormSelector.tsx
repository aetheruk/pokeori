'use client'

import * as React from 'react'
import { Label } from '@/components/ui/label'
import { PokemonSelector } from './PokemonSelector'
import { FormSelector } from './FormSelector'
import { getSpeciesIdForForm } from '../../actions'

interface PokemonFormSelectorProps {
  value?: string
  onChange: (formId: string) => void
}

export function PokemonFormSelector({ value, onChange }: PokemonFormSelectorProps) {
  const [speciesId, setSpeciesId] = React.useState<number | undefined>()

  // Load species ID on mount or when value changes externally
  React.useEffect(() => {
    if (value) {
      getSpeciesIdForForm(value).then((id) => {
        if (id) setSpeciesId(id)
      })
    } else {
      setSpeciesId(undefined)
    }
  }, [value])

  const handleSpeciesSelect = (id: number) => {
    setSpeciesId(id)
    // When a species is selected, default the formID to the speciesID
    // (In generation 1-9 data, the base form's id usually matches the species string ID)
    onChange(id.toString())
  }

  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <div className="space-y-2">
        <Label>Species</Label>
        <PokemonSelector value={speciesId} onSelect={handleSpeciesSelect} />
      </div>
      <div className="space-y-2">
        <Label>Form</Label>
        <FormSelector speciesId={speciesId} value={value} onChange={onChange} />
      </div>
    </div>
  )
}
