'use client'

import { createContext, useContext, useEffect, useId, useState } from 'react'
import { Search, Trash2 } from 'lucide-react'
import { ItemSprite } from '@/components/ui/item-sprite'
import { PokemonRaritySprite } from '@/components/game/shared/PokemonRaritySprite'
import { searchEventReferences } from '@/utilities/events/actions'
import { Button } from '@/components/ui/button'
import {
  RANDOM_POKEMON_RARITIES,
  rarityProbabilities,
  resolveRarityChances,
} from '@/utilities/pokemon/rarity-chances'
import { getPokemonRarityEffect } from '@/utilities/pokemon/rarity-effects'

export type FormSchema = Record<string, any>
export const EventReferenceSearch = createContext(searchEventReferences)
export function fieldLabel(key: string) {
  const labels: Record<string, string> = {
    name: 'Name',
    description: 'Description',
    category: 'Region',
    subCategory: 'Area',
    speciesId: 'Pokémon',
    formId: 'Pokémon form',
    enemyTeam: 'Opponent team',
    encounters: 'Encounter Pokémon',
    chance: 'Encounter weight',
    rarityChances: 'Rarity chances',
    requirements: 'Who can see this?',
    criteria: 'Entry and completion conditions',
    maxPokemon: 'Player team size',
    isWildBattle: 'Wild Pokémon battle',
    items: 'Shop offers',
    aiMoves: 'Moves',
    aiProfile: 'Opponent strategy',
    requiredItem: 'Required tool',
    levelRange: 'Pokémon levels',
    rewards: 'Completion rewards',
    id: 'Reference ID',
    min: 'Minimum',
    max: 'Maximum',
    timer: 'Time limit (seconds)',
  }
  return (
    labels[key] ||
    key
      .replace(/\./g, ' · ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, (letter) => letter.toUpperCase())
  )
}
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
  if (label === 'icon' && schema.properties)
    return (
      <div className="space-y-3">
        <label className="block text-sm">
          Card icon
          <select
            className={fieldClass}
            value={value?.type || 'lucide'}
            onChange={(event) =>
              onChange({
                type: event.target.value,
                id:
                  event.target.value === 'pokemon'
                    ? '1'
                    : event.target.value === 'lucide'
                      ? 'MapPin'
                      : '',
              })
            }
          >
            <option value="lucide">Activity symbol</option>
            <option value="pokemon">Pokémon sprite</option>
            <option value="item">Item sprite</option>
            <option value="trainer">Trainer portrait</option>
            <option value="local">Local artwork</option>
          </select>
        </label>
        {value?.type === 'pokemon' || value?.type === 'item' ? (
          <ReferenceField
            type={value.type === 'pokemon' ? 'formId' : 'itemId'}
            value={value.id}
            numeric={false}
            onChange={(next) => onChange({ ...value, id: next })}
          />
        ) : value?.type === 'lucide' ? (
          <label className="block text-sm">
            Activity symbol
            <select
              className={fieldClass}
              value={value?.id || ''}
              onChange={(event) =>
                onChange({ ...value, id: event.target.value })
              }
            >
              {Array.from(
                new Set(
                  [
                    value?.id,
                    'MapPin',
                    'Swords',
                    'ShoppingBag',
                    'Search',
                    'CalendarDays',
                    'Star',
                  ].filter(Boolean),
                ),
              ).map((symbol) => (
                <option key={symbol} value={symbol}>
                  {fieldLabel(symbol)}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <label className="block text-sm">
            Artwork reference
            <input
              className={fieldClass}
              value={value?.id || ''}
              onChange={(event) =>
                onChange({ ...value, id: event.target.value })
              }
            />
          </label>
        )}
      </div>
    )
  if (
    ['encounters', 'enemyTeam', 'pokemonPool'].includes(label) &&
    schema.type === 'array'
  )
    return (
      <PokemonRoster
        schema={schema}
        value={value || []}
        onChange={onChange}
        label={label}
        root={root}
      />
    )
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
          {fieldLabel(label)} selection
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
              {entry.title ||
                (entry.type === 'number' || entry.type === 'integer'
                  ? 'Fixed value'
                  : entry.type === 'object' && entry.properties?.min
                    ? 'Random range'
                    : entry.type) ||
                `Option ${index + 1}`}
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
      <fieldset className="min-w-0 space-y-3">
        <legend className="px-1 text-sm font-semibold">
          {fieldLabel(label)}
        </legend>
        {present.map((key) => (
          <div key={key} className="space-y-1">
            {key === 'id' && ['item', 'pokemon'].includes(value?.type) ? (
              <ReferenceField
                type={value.type === 'pokemon' ? 'formId' : 'itemId'}
                value={value[key]}
                numeric={false}
                onChange={(next) => onChange({ ...value, [key]: next })}
              />
            ) : (
              <SchemaForm
                schema={fields[key]}
                value={value?.[key]}
                onChange={(next) => onChange({ ...value, [key]: next })}
                label={key}
                root={root}
                depth={depth + 1}
              />
            )}
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
                Reset {fieldLabel(key).toLowerCase()}
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
                {fieldLabel(key)}
              </option>
            ))}
          </select>
        )}
      </fieldset>
    )
  }
  if (schema.type === 'array')
    return (
      <fieldset className="min-w-0 space-y-3">
        <legend className="text-sm font-semibold">{fieldLabel(label)}</legend>
        {(value || []).map((entry: any, index: number) => (
          <div
            key={index}
            className="space-y-2 border-l-2 border-game-border pl-3"
          >
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
          Add {fieldLabel(label).toLowerCase()}
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
        {fieldLabel(label)}
      </label>
    )
  if (schema.enum || schema.const !== undefined)
    return (
      <label className="block space-y-1 text-sm">
        {fieldLabel(label)}
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
      {fieldLabel(label)}
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

export function ReferenceField({
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
  const search = useContext(EventReferenceSearch)
  const [query, setQuery] = useState('')
  const [options, setOptions] = useState<{ id: string; name: string }[]>([])
  const [selectedName, setSelectedName] = useState('')
  const [state, setState] = useState('')
  const pokemon = ['speciesId', 'formId'].includes(type)
  const item = ['itemId', 'heldItemId', 'allowedItems'].includes(type)
  useEffect(() => {
    let cancelled = false
    setSelectedName('')
    if (value)
      void search(type, String(value))
        .then((results) => {
          if (!cancelled)
            setSelectedName(
              results.find((entry) => entry.id === String(value))?.name || '',
            )
        })
        .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [value, type, search])
  useEffect(() => {
    let cancelled = false
    setOptions([])
    setState(query.trim() ? 'Searching…' : '')
    if (!query.trim()) return
    const timer = setTimeout(() => {
      void search(type, query)
        .then((result) => {
          if (!cancelled) {
            setOptions(result)
            setState(result.length ? '' : 'No matches. Try another name or ID.')
          }
        })
        .catch(() => {
          if (!cancelled)
            setState('Search unavailable. Try again or enter an ID below.')
        })
    }, 250)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [query, type, search])
  return (
    <div className="space-y-2">
      {value && (
        <div className="flex items-center gap-3">
          {pokemon && (
            <PokemonRaritySprite
              formId={value}
              view="home"
              alt=""
              className="h-12 w-12 shrink-0"
              sizes="48px"
            />
          )}
          <span className="text-sm font-semibold">
            {item && (
              <ItemSprite
                itemId={String(value)}
                alt=""
                width={40}
                height={40}
                className="inline-block mr-2"
              />
            )}
            {selectedName || `${fieldLabel(type)} #${value}`}
          </span>
        </div>
      )}
      <label className="block space-y-1 text-sm">
        Search {fieldLabel(type).toLowerCase()}
        <span className="relative block">
          <Search className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-game-muted" />
          <input
            className={`${fieldClass} pl-10`}
            value={query}
            placeholder="Type a name or number…"
            onChange={(event) => setQuery(event.target.value)}
          />
        </span>
      </label>
      {state && (
        <p className="text-sm text-game-muted" role="status">
          {state}
        </p>
      )}
      {options.length > 0 && (
        <div className="max-h-64 overflow-y-auto overscroll-contain rounded-lg border border-game-border">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              className="game-focus-ring flex min-h-12 w-full items-center gap-3 border-b border-game-border bg-game-surface px-3 py-2 text-left text-sm last:border-0 hover:bg-game-canvas"
              onClick={() => {
                onChange(numeric ? Number(option.id) : option.id)
                setQuery('')
                setOptions([])
              }}
            >
              {pokemon && (
                <PokemonRaritySprite
                  formId={option.id}
                  view="home"
                  alt=""
                  className="h-10 w-10 shrink-0"
                  sizes="40px"
                />
              )}
              <span className="min-w-0 flex-1">{option.name}</span>
              {item && (
                <ItemSprite itemId={option.id} alt="" width={40} height={40} />
              )}
              <span className="text-xs text-game-muted">#{option.id}</span>
            </button>
          ))}
        </div>
      )}
      <details className="text-sm text-game-muted">
        <summary className="cursor-pointer py-2">
          Enter a reference ID manually
        </summary>
        <input
          className={fieldClass}
          aria-label={`${type} ID`}
          type={numeric ? 'number' : 'text'}
          value={value ?? ''}
          onChange={(event) =>
            onChange(numeric ? Number(event.target.value) : event.target.value)
          }
        />
      </details>
    </div>
  )
}

function PokemonRoster({
  schema,
  value,
  onChange,
  label,
  root,
}: {
  schema: FormSchema
  value: any[]
  onChange: (value: any[]) => void
  label: string
  root: FormSchema
}) {
  const encounter = label !== 'enemyTeam'
  const weightKey = label === 'pokemonPool' ? 'weight' : 'chance'
  const entrySchema = schema.items || {}
  const update = (index: number, next: any) =>
    onChange(
      value.map((entry, position) => (position === index ? next : entry)),
    )
  const total = value.reduce(
    (sum, entry) => sum + (Number(entry[weightKey]) || 0),
    0,
  )
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">{fieldLabel(label)}</h4>
        <p className="text-sm text-game-muted">
          {encounter
            ? 'Choose who appears here. Weights are relative: two Pokémon with weight 1 each have an equal chance. Eligibility can change the final share.'
            : 'Build the opposing team in battle order. Set each Pokémon’s level and optional equipment.'}
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {value.map((entry, index) => (
          <article
            key={index}
            aria-label={`Pokémon slot ${index + 1}`}
            className="space-y-3 rounded-lg border border-game-border bg-game-surface p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <h5 className="text-sm font-semibold">Pokémon {index + 1}</h5>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                aria-label={`Remove Pokémon ${index + 1}`}
                onClick={() =>
                  onChange(value.filter((_, position) => position !== index))
                }
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </Button>
            </div>
            <ReferenceField
              type="speciesId"
              numeric
              value={entry.speciesId}
              onChange={(speciesId) => {
                const { formId: _, ...rest } = entry
                update(index, { ...rest, speciesId })
              }}
            />
            {encounter ? (
              <label className="block text-sm">
                Encounter weight
                <input
                  className={fieldClass}
                  type="number"
                  min="0"
                  max={entrySchema.properties?.[weightKey]?.maximum}
                  step="any"
                  value={entry[weightKey] ?? 1}
                  onChange={(event) =>
                    update(index, {
                      ...entry,
                      [weightKey]: Number(event.target.value),
                    })
                  }
                />
                <span className="text-xs text-game-muted">
                  {total > 0
                    ? `${(((entry[weightKey] || 0) / total) * 100).toFixed(1)}% of the listed encounter pool`
                    : 'Set a positive weight to make Pokémon available.'}
                </span>
              </label>
            ) : (
              <SchemaForm
                schema={entrySchema.properties?.level || { type: 'number' }}
                value={entry.level}
                onChange={(level) => update(index, { ...entry, level })}
                label="level"
                root={root}
              />
            )}
            <details>
              <summary className="cursor-pointer py-2 text-sm font-medium">
                Form, rarity & other Pokémon settings
              </summary>
              <SchemaForm
                schema={{
                  ...entrySchema,
                  properties: Object.fromEntries(
                    Object.entries(entrySchema.properties || {}).filter(
                      ([key]) =>
                        ![
                          'speciesId',
                          encounter ? weightKey : 'level',
                        ].includes(key),
                    ),
                  ),
                  required: [],
                }}
                value={entry}
                onChange={(next) => update(index, next)}
                label="Pokémon settings"
                root={root}
              />
            </details>
          </article>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        disabled={value.length >= (schema.maxItems || 200)}
        onClick={() =>
          onChange([
            ...value,
            {
              ...formDefault(entrySchema),
              speciesId: 1,
              ...(encounter ? { [weightKey]: 1 } : { level: 5 }),
            },
          ])
        }
      >
        Add Pokémon
      </Button>
    </div>
  )
}
