'use client'

import { Button } from '@/components/ui/button'
import {
  SchemaForm,
  fieldLabel,
  formDefault,
  type FormSchema,
} from './schema-form'

const groups = [
  {
    title: 'Explore card',
    description:
      'Give players a name, description and a place to find this activity.',
    keys: ['name', 'description', 'category', 'subCategory', 'icon'],
  },
  {
    title: 'Pokémon',
    description: 'Choose the Pokémon and how players meet them.',
    keys: ['encounters', 'enemyTeam', 'levelRange', 'rarityChances'],
  },
  {
    title: 'How it plays',
    description: 'Set the rules for this activity.',
    keys: [
      'isWildBattle',
      'maxPokemon',
      'levelCap',
      'encounterMode',
      'timer',
      'fleeRate',
      'catchRateModifier',
      'safariBallAllowance',
      'settings',
      'repeatable',
      'completionTrigger',
    ],
  },
  {
    title: 'Offers & rewards',
    description: 'Choose what players can buy or earn.',
    keys: ['items', 'rewards'],
  },
  {
    title: 'Availability & entry',
    description:
      'Limit who can see or enter this activity. Leave conditions empty for everyone.',
    keys: ['requirements', 'criteria', 'daily', 'requiredItem'],
  },
  {
    title: 'Scene & sound',
    description: 'Choose the backdrop and music.',
    keys: ['background', 'music', 'trainerName', 'trainerClassId', 'title'],
  },
]

export function ActivityEditor({
  schema,
  value,
  onChange,
}: {
  schema: FormSchema
  value: any
  onChange: (value: any) => void
}) {
  const properties = schema.properties || {}
  const renderField = (key: string) => {
    const present = value[key] !== undefined || schema.required?.includes(key)
    return (
      <div key={key} className="min-w-0 space-y-2">
        {present ? (
          <>
            <SchemaForm
              schema={properties[key]}
              value={value[key]}
              label={key}
              root={schema}
              onChange={(next) => onChange({ ...value, [key]: next })}
            />
            {!schema.required?.includes(key) && (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => {
                  const next = { ...value }
                  delete next[key]
                  onChange(next)
                }}
              >
                Reset {fieldLabel(key).toLowerCase()}
              </Button>
            )}
          </>
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              onChange({ ...value, [key]: formDefault(properties[key]) })
            }
          >
            Set {fieldLabel(key).toLowerCase()}
          </Button>
        )}
      </div>
    )
  }
  const grouped = new Set(groups.flatMap((group) => group.keys))
  const advanced = Object.keys(properties).filter((key) => !grouped.has(key))
  return (
    <div className="space-y-5">
      {groups.map((group, index) => {
        const keys = group.keys.filter((key) => properties[key])
        if (!keys.length) return null
        const body = (
          <div key={group.title} className="space-y-4 pt-3">
            <p className="text-sm text-game-muted">{group.description}</p>
            {keys.map(renderField)}
          </div>
        )
        return index < 4 ? (
          <section
            key={group.title}
            className="border-t border-game-border pt-4"
          >
            <h4 className="font-semibold">{group.title}</h4>
            {body}
          </section>
        ) : (
          <details
            key={group.title}
            className="border-t border-game-border pt-2"
          >
            <summary className="cursor-pointer py-2 font-semibold">
              {group.title}
            </summary>
            {body}
          </details>
        )
      })}
      <details className="border-t border-game-border pt-2">
        <summary className="cursor-pointer py-2 font-semibold">
          Advanced activity settings
        </summary>
        <p className="mb-3 text-sm text-game-muted">
          Fine-tune special rules, presentation and content references.
        </p>
        <div className="space-y-4">{advanced.map(renderField)}</div>
      </details>
    </div>
  )
}
