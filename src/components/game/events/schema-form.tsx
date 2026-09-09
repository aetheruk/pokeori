'use client'

import { useEffect, useId, useState } from 'react'
import { searchEventReferences } from '@/utilities/events/actions'
import { Button } from '@/components/ui/button'
import {
  RANDOM_POKEMON_RARITIES,
  rarityProbabilities,
  resolveRarityChances,
} from '@/utilities/pokemon/rarity-chances'
import { getPokemonRarityEffect } from '@/utilities/pokemon/rarity-effects'

export type FormSchema = Record<string, any>
export function formDefault(schema: FormSchema): any {
  if (schema.default !== undefined) return schema.default
  if (schema.const !== undefined) return schema.const
  if (schema.anyOf || schema.oneOf)
    return formDefault(
      (schema.anyOf || schema.oneOf).find(
        (entry: any) => entry.type !== 'null',
      ) || {},
    )
  if (schema.enum) return schema.enum[0]
  if (schema.type === 'object')
    return Object.fromEntries(
      (schema.required || []).map((key: string) => [
        key,
        formDefault(schema.properties?.[key] || {}),
      ]),
    )
  if (schema.type === 'array')
    return Array.from({ length: schema.minItems || 0 }, () =>
      formDefault(schema.items || {}),
    )
  if (schema.type === 'number' || schema.type === 'integer')
    return (
      schema.minimum ??
      (schema.exclusiveMinimum !== undefined ? schema.exclusiveMinimum + 1 : 1)
    )
  if (schema.type === 'boolean') return false
  return ''
}
const fieldClass =
  'game-focus-ring min-h-11 w-full rounded-lg border border-game-border bg-game-canvas px-3 py-2 text-sm'
export function SchemaForm({
  schema,
  value,
  onChange,
  label,
  root = schema,
  depth = 0,
}: {
  schema: FormSchema
  value: any
  onChange: (value: any) => void
  label: string
  root?: FormSchema
  depth?: number
}) {
  const id = useId()
  if (label.startsWith('rarityChances.'))
    return (
      <label className="block text-sm">
        {label.slice('rarityChances.'.length)} threshold (%)
        <input
          className={fieldClass}
          type="number"
          min="0"
          max="100"
          step="any"
          value={typeof value === 'number' ? value * 100 : 0}
          onChange={(event) => onChange(Number(event.target.value) / 100)}
        />
      </label>
    )
  if (depth > 12) return <p>Maximum nesting reached.</p>
  if (schema.$ref) {
    const resolved = schema.$ref
      .split('/')
      .slice(1)
      .reduce((node: any, key: string) => node?.[key], root)
    return resolved ? (
      <SchemaForm
        schema={resolved}
        value={value}
        onChange={onChange}
        label={label}
        root={root}
        depth={depth + 1}
      />
    ) : (
      <p>Unsupported field reference: {label}</p>
    )
  }
  if (label === 'rarityChances')
    return (
      <fieldset className="space-y-3 rounded-lg border border-game-border p-3">
        <legend>Rarity thresholds</legend>
        <p className="text-sm text-game-muted">
          Blank inherits the default or parent. Zero disables a rarity. The
          smallest qualifying threshold wins; ties share their range.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {RANDOM_POKEMON_RARITIES.map((rarity) => (
            <label key={rarity} className="text-sm">
              {getPokemonRarityEffect(rarity).label} (%)
              <input
                className={fieldClass}
                type="number"
                min="0"
                max="100"
                step="any"
                value={value?.[rarity] === undefined ? '' : value[rarity] * 100}
                onChange={(event) => {
                  const next = { ...value }
                  if (event.target.value === '') delete next[rarity]
                  else next[rarity] = Number(event.target.value) / 100
                  onChange(next)
                }}
              />
            </label>
          ))}
        </div>
        <details>
          <summary className="cursor-pointer py-2">
            Resulting probabilities (capture/wild base defaults)
          </summary>
          {Object.entries(rarityProbabilities(resolveRarityChances(value)))
            .filter(([, chance]) => chance > 0)
            .map(([rarity, chance]) => (
              <p key={rarity} className="text-sm">
                {rarity}: {(chance * 100).toFixed(4)}%
              </p>
            ))}
        </details>
      </fieldset>
    )
  const alternatives = schema.anyOf || schema.oneOf
  if (alternatives) {
    const match = alternatives.findIndex((entry: any) =>
      entry.const !== undefined
        ? entry.const === value
        : entry.enum
          ? entry.enum.includes(value)
          : entry.type === (Array.isArray(value) ? 'array' : typeof value),
    )
    const selected = Math.max(0, match)
    return (
      <div className="space-y-2">
        <label htmlFor={id} className="text-sm">
          {label} format
        </label>
        <select
          id={id}
          className={fieldClass}
          value={selected}
          onChange={(event) =>
            onChange(formDefault(alternatives[Number(event.target.value)]))
          }
        >
          {alternatives.map((entry: any, index: number) => (
            <option key={index} value={index}>
              {entry.title || entry.type || `Option ${index + 1}`}
            </option>
          ))}
        </select>
        <SchemaForm
          schema={alternatives[selected]}
          value={value}
          onChange={onChange}
          label={label}
          root={root}
          depth={depth + 1}
        />
      </div>
    )
  }
  if (schema.type === 'object' || schema.properties) {
    const fields = schema.properties || {}
    const present = Object.keys(fields).filter(
      (key) => schema.required?.includes(key) || value?.[key] !== undefined,
    )
    const optional = Object.keys(fields).filter((key) => !present.includes(key))
    return (
      <fieldset className="space-y-3 rounded-lg border border-game-border p-3">
        <legend className="px-1 text-sm font-semibold">{label}</legend>
        {present.map((key) => (
          <div key={key} className="space-y-1">
            <SchemaForm
              schema={fields[key]}
              value={value?.[key]}
              onChange={(next) => onChange({ ...value, [key]: next })}
              label={key}
              root={root}
              depth={depth + 1}
            />
            {!schema.required?.includes(key) && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  const next = { ...value }
                  delete next[key]
                  onChange(next)
                }}
              >
                Remove {key}
              </Button>
            )}
          </div>
        ))}
        {optional.length > 0 && (
          <select
            aria-label={`Add ${label} setting`}
            className={fieldClass}
            value=""
            onChange={(event) => {
              const key = event.target.value
              if (key) onChange({ ...value, [key]: formDefault(fields[key]) })
            }}
          >
            <option value="">Add optional setting…</option>
            {optional.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        )}
      </fieldset>
    )
  }
  if (schema.type === 'array')
    return (
      <fieldset className="space-y-3 rounded-lg border border-game-border p-3">
        <legend className="text-sm font-semibold">{label}</legend>
        {(value || []).map((entry: any, index: number) => (
          <div key={index} className="space-y-2">
            <SchemaForm
              schema={schema.items || { type: 'string' }}
              value={entry}
              onChange={(next) =>
                onChange(
                  value.map((old: any, position: number) =>
                    position === index ? next : old,
                  ),
                )
              }
              label={`${label} ${index + 1}`}
              root={root}
              depth={depth + 1}
            />
            <Button
              variant="outline"
              type="button"
              onClick={() =>
                onChange(
                  value.filter(
                    (_: unknown, position: number) => position !== index,
                  ),
                )
              }
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          type="button"
          disabled={(value?.length || 0) >= (schema.maxItems || 200)}
          onClick={() =>
            onChange([...(value || []), formDefault(schema.items || {})])
          }
        >
          Add {label}
        </Button>
      </fieldset>
    )
  if (schema.type === 'boolean')
    return (
      <label className="flex min-h-11 items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={value === true}
          onChange={(event) => onChange(event.target.checked)}
        />
        {label}
      </label>
    )
  if (schema.enum || schema.const !== undefined)
    return (
      <label className="block space-y-1 text-sm">
        {label}
        <select
          className={fieldClass}
          value={value ?? schema.const ?? ''}
          onChange={(event) => onChange(event.target.value)}
        >
          {(schema.enum || [schema.const]).map((entry: string) => (
            <option key={entry} value={entry}>
              {entry}
            </option>
          ))}
        </select>
      </label>
    )
  const numeric = schema.type === 'number' || schema.type === 'integer'
  const referenceType = label.replace(/ \d+$/, '')
  if (
    [
      'speciesId',
      'formId',
      'itemId',
      'heldItemId',
      'allowedItems',
      'aiMoves',
      'background',
      'music',
    ].includes(referenceType)
  )
    return (
      <ReferenceField
        type={referenceType}
        value={value}
        onChange={onChange}
        numeric={numeric}
      />
    )
  return (
    <label htmlFor={id} className="block space-y-1 text-sm">
      {label}
      {['description', 'message'].includes(label) ? (
        <textarea
          id={id}
          className={fieldClass}
          value={value || ''}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          id={id}
          className={fieldClass}
          type={numeric ? 'number' : 'text'}
          min={schema.minimum}
          max={schema.maximum}
          step={schema.type === 'integer' ? 1 : 'any'}
          value={value ?? ''}
          onChange={(event) =>
            onChange(numeric ? Number(event.target.value) : event.target.value)
          }
        />
      )}
    </label>
  )
}

function ReferenceField({
  type,
  value,
  onChange,
  numeric,
}: {
  type: string
  value: any
  onChange: (value: any) => void
  numeric: boolean
}) {
  const [query, setQuery] = useState('')
  const [options, setOptions] = useState<{ id: string; name: string }[]>([])
  useEffect(() => {
    if (!query) return
    let cancelled = false
    const timer = setTimeout(() => {
      void searchEventReferences(type, query)
        .then((result) => {
          if (!cancelled) setOptions(result)
        })
        .catch(() => {})
    }, 300)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [query, type])
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm">{type}</legend>
      <input
        className={fieldClass}
        aria-label={`Search ${type}`}
        value={query}
        placeholder="Search by name or ID"
        onChange={(event) => setQuery(event.target.value)}
      />
      {options.length > 0 && (
        <select
          className={fieldClass}
          aria-label={`Choose ${type}`}
          value=""
          onChange={(event) => {
            onChange(numeric ? Number(event.target.value) : event.target.value)
            setQuery('')
            setOptions([])
          }}
        >
          <option value="">Choose a result…</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name} ({option.id})
            </option>
          ))}
        </select>
      )}
      <input
        className={fieldClass}
        aria-label={`${type} ID`}
        type={numeric ? 'number' : 'text'}
        value={value ?? ''}
        onChange={(event) =>
          onChange(numeric ? Number(event.target.value) : event.target.value)
        }
      />
    </fieldset>
  )
}
