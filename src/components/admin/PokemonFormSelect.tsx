'use client'
import React, { useEffect, useState } from 'react'
import { useField } from '@payloadcms/ui'
import pokemonData from '../../data/pokemon-data'

const PokemonFormSelect: React.FC<{ path: string }> = ({ path }) => {
  const { value: formId, setValue: setFormId } = useField<string>({ path })

  // sibling path for speciesId.
  // path is like "enemyTeam.0.formId"
  // speciesId path is "enemyTeam.0.speciesId"
  const speciesPath = path.replace('.formId', '.speciesId')
  const { value: speciesId } = useField<string | number>({ path: speciesPath })

  const [options, setOptions] = useState<{ label: string; value: string }[]>([])

  useEffect(() => {
    if (speciesId) {
      const species = pokemonData.find((p) => p.id === Number(speciesId))
      if (species) {
        const forms = species.forms.map((f) => ({
          label: f.name || f.form,
          value: f.id,
        }))
        setOptions(forms)

        // If current formId is not in the new options, we might want to reset it
        // But only if we have options and the current value isn't one of them
        if (
          formId &&
          forms.length > 0 &&
          !forms.find((f) => f.value === formId)
        ) {
          // Optional: Auto-select base form?
          // setFormId(forms[0].value)
        }
      } else {
        setOptions([])
      }
    } else {
      setOptions([])
    }
  }, [speciesId, formId])

  return (
    <div className="field-type select">
      <label
        htmlFor={`${path}-form-select`}
        className="field-label"
        style={{ marginBottom: '10px', display: 'block' }}
      >
        Form
      </label>
      <select
        id={`${path}-form-select`}
        value={formId || ''}
        onChange={(e) => setFormId(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          background: 'var(--theme-input-bg)',
          color: 'var(--theme-elevation-800)',
          border: '1px solid var(--theme-elevation-200)',
          borderRadius: '4px',
          fontSize: '1rem',
        }}
      >
        <option value="">Select a form</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default PokemonFormSelect
