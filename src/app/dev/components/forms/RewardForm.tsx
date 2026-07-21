'use client'

import * as React from 'react'
import { Reward, TaskCondition } from '@/data/types'
import { items } from '@/data/items'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IconSelector } from '../selectors/IconSelector'
import { PokemonSelector } from '../selectors/PokemonSelector'
import { FormSelector } from '../selectors/FormSelector'
import { PokemonFormSelector } from '../selectors/PokemonFormSelector'
import { DataSelector } from '../selectors/DataSelector'
import { MultiDataSelector } from '../selectors/MultiDataSelector'
import {
  getBannerList,
  getCurrencyList,
  getIconList,
  getItemList,
  getTaskList,
  getTitleList,
  getTcgSetList,
  getTcgCardList,
  getPokemonList,
  getSkillList,
} from '../../actions'
import { TaskConditionForm } from './TaskConditionForm'
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'
import { POKEMON_RARITY_OPTIONS } from '@/utilities/pokemon/rarity-effects'

interface RewardFormProps {
  reward: Reward
  onChange: (reward: Reward) => void
  onRemove: () => void
}

export function RewardForm({ reward, onChange, onRemove }: RewardFormProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const isUniqueItem = React.useMemo(() => {
    if (reward.type !== 'item') return false
    const item = items.find((i) => i.id === reward.targetId)
    return !!item?.unique
  }, [reward.type, reward.targetId])

  const handleChange = (field: keyof Reward, value: any) => {
    const newValue = value

    // If changing to an item type or changing the targetId of an item, check uniqueness
    if (field === 'type' && value === 'item') {
      const item = items.find((i) => i.id === reward.targetId)
      if (item?.unique) {
        onChange({ ...reward, type: 'item', quantity: 1 })
        return
      }
    }

    if (field === 'targetId' && reward.type === 'item') {
      const item = items.find((i) => i.id === value)
      if (item?.unique) {
        onChange({ ...reward, targetId: value, quantity: 1 })
        return
      }
    }

    onChange({ ...reward, [field]: newValue })
  }

  const handlePokemonDataChange = (field: string, value: any) => {
    onChange({
      ...reward,
      pokemonData: { ...reward.pokemonData, [field]: value },
    })
  }

  const handleStatChange = (type: 'ivs' | 'evs', stat: string, value: number) => {
    const currentStats = reward.pokemonData?.[type] || {}
    onChange({
      ...reward,
      pokemonData: {
        ...reward.pokemonData,
        [type]: { ...currentStats, [stat]: value },
      },
    })
  }

  const addRequirement = () => {
    handleChange('requirements', [...(reward.requirements || []), { type: 'user_level', count: 1 }])
  }

  const updateRequirement = (index: number, req: TaskCondition) => {
    const newReqs = [...(reward.requirements || [])]
    newReqs[index] = req
    handleChange('requirements', newReqs)
  }

  const removeRequirement = (index: number) => {
    const newReqs = [...(reward.requirements || [])]
    newReqs.splice(index, 1)
    handleChange('requirements', newReqs)
  }

  return (
    <Card className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 text-destructive z-10"
        onClick={onRemove}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-4">
            <div className="w-[150px]">
              <Select value={reward.type} onValueChange={(v: any) => handleChange('type', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    'item',
                    'pokemon',
                    'card',
                    'xp',
                    'currency',
                    'task_complete',
                    'banner',
                    'icon',
                    'title',
                    'increase_max_pokemon',
                    'increase_max_boxes',
                    'pokemon_research_xp',
                  ].map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 font-medium text-sm text-muted-foreground">
              {reward.type === 'item'
                ? reward.targetId || 'Select Item'
                : reward.type === 'pokemon'
                  ? `Species: ${reward.pokemonData?.formId || reward.targetId || 'Random'}`
                  : reward.type === 'pokemon_research_xp'
                    ? `Form: ${reward.targetId || 'Select Form'} - XP: ${typeof reward.quantity === 'object' ? `${reward.quantity.min}-${reward.quantity.max}` : (reward.quantity ?? '')} XP`
                    : reward.type === 'currency'
                      ? reward.targetId || 'Money'
                      : ''}
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
          </div>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="space-y-4 pt-0">
            {/* Common Fields */}
            <div className="grid grid-cols-2 gap-4">
              {!['increase_max_pokemon', 'increase_max_boxes'].includes(reward.type) && (
                <div className="space-y-2">
                  <Label>
                    {reward.type === 'xp'
                      ? 'Skill'
                      : reward.type === 'pokemon_research_xp'
                        ? 'Pokemon Form'
                        : 'Target ID'}
                  </Label>
                  {reward.type === 'item' ? (
                    <DataSelector
                      value={String(reward.targetId || '')}
                      onSelect={(v) => handleChange('targetId', v)}
                      fetcher={getItemList}
                      placeholder="Select Item..."
                    />
                  ) : reward.type === 'xp' ? (
                    <DataSelector
                      value={String(reward.targetId || '')}
                      onSelect={(v) => handleChange('targetId', v)}
                      fetcher={getSkillList}
                      placeholder="Select Skill..."
                    />
                  ) : reward.type === 'pokemon' ? (
                    <PokemonSelector
                      value={Number(reward.targetId ?? 0)}
                      onSelect={(v) => handleChange('targetId', v)}
                    />
                  ) : reward.type === 'currency' ? (
                    <DataSelector
                      value={String(reward.targetId || '')}
                      onSelect={(v) => handleChange('targetId', v)}
                      fetcher={getCurrencyList}
                      placeholder="Select Currency..."
                    />
                  ) : reward.type === 'banner' ? (
                    <DataSelector
                      value={String(reward.targetId || '')}
                      onSelect={(v) => handleChange('targetId', v)}
                      fetcher={getBannerList}
                      placeholder="Select Banner..."
                    />
                  ) : reward.type === 'icon' ? (
                    <DataSelector
                      value={String(reward.targetId || '')}
                      onSelect={(v) => handleChange('targetId', v)}
                      fetcher={getIconList}
                      placeholder="Select Icon..."
                    />
                  ) : reward.type === 'title' ? (
                    <DataSelector
                      value={String(reward.targetId || '')}
                      onSelect={(v) => handleChange('targetId', v)}
                      fetcher={getTitleList}
                      placeholder="Select Title..."
                    />
                  ) : reward.type === 'task_complete' ? (
                    <DataSelector
                      value={String(reward.targetId || '')}
                      onSelect={(v) => handleChange('targetId', v)}
                      fetcher={getTaskList}
                      placeholder="Select Task..."
                    />
                  ) : reward.type === 'pokemon_research_xp' ? (
                    <div className="col-span-2">
                      <PokemonFormSelector
                        value={String(reward.targetId || '')}
                        onChange={(id) => handleChange('targetId', id)}
                      />
                    </div>
                  ) : (
                    <Input
                      value={String(reward.targetId || '')}
                      onChange={(e) => handleChange('targetId', e.target.value)}
                      placeholder="ID (e.g. 'base1')"
                    />
                  )}
                </div>
              )}
              <div className="col-span-2 grid grid-cols-2 gap-4">
                {(reward.type === 'item' ||
                  reward.type === 'pokemon' ||
                  reward.type === 'card' ||
                  reward.type === 'xp' ||
                  reward.type === 'currency' ||
                  reward.type === 'increase_max_pokemon' ||
                  reward.type === 'increase_max_boxes' ||
                  reward.type === 'pokemon_research_xp') && (
                  <div className="space-y-2 col-span-2">
                    <div className="flex items-center justify-between">
                      <Label>Quantity</Label>
                      <div className="flex items-center gap-2">
                        <Label
                          htmlFor={`range-${reward.type}-${reward.targetId}`}
                          className={cn('text-xs', isUniqueItem && 'opacity-50')}
                        >
                          Range Mode
                        </Label>
                        <Switch
                          id={`range-${reward.type}-${reward.targetId}`}
                          disabled={isUniqueItem}
                          checked={typeof reward.quantity === 'object'}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              const val = typeof reward.quantity === 'number' ? reward.quantity : 1
                              handleChange('quantity', { min: val, max: val + 1 })
                            } else {
                              const val =
                                typeof reward.quantity === 'object'
                                  ? reward.quantity.min
                                  : (reward.quantity ?? 1)
                              handleChange('quantity', val)
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label
                          className={cn(
                            'text-[10px] uppercase text-muted-foreground',
                            isUniqueItem && 'opacity-50',
                          )}
                        >
                          {typeof reward.quantity === 'object' ? 'Min' : 'Fixed Amount'}
                        </Label>
                        <Input
                          type="number"
                          disabled={isUniqueItem}
                          value={
                            typeof reward.quantity === 'object'
                              ? reward.quantity.min
                              : (reward.quantity ?? 1)
                          }
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0
                            if (typeof reward.quantity === 'object') {
                              const current = reward.quantity as { min: number; max: number }
                              handleChange('quantity', { ...current, min: val })
                            } else {
                              handleChange('quantity', val)
                            }
                          }}
                        />
                      </div>
                      {typeof reward.quantity === 'object' && (
                        <div className="space-y-1">
                          <Label className="text-[10px] uppercase text-muted-foreground">Max</Label>
                          <Input
                            type="number"
                            value={(reward.quantity as { max: number }).max}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 0
                              const current = reward.quantity as { min: number; max: number }
                              handleChange('quantity', { ...current, max: val })
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {reward.type === 'pokemon' && (
                  <div className="space-y-2">
                    <Label>Skill ID (Optional)</Label>
                    <Input
                      value={reward.skill || ''}
                      onChange={(e) => handleChange('skill', e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                'item',
                'pokemon',
                'card',
                'currency',
                'xp',
                'increase_max_pokemon',
                'increase_max_boxes',
              ].includes(reward.type) && (
                <div className="space-y-2">
                  <Label>Label (Optional)</Label>
                  <Input
                    value={reward.label || ''}
                    onChange={(e) => handleChange('label', e.target.value)}
                  />
                </div>
              )}
              {['item', 'pokemon', 'card', 'increase_max_pokemon', 'increase_max_boxes'].includes(
                reward.type,
              ) && (
                <div className="space-y-2">
                  <Label>Drop Chance (%)</Label>
                  <Input
                    type="number"
                    value={reward.dropChance ?? 100}
                    onChange={(e) => handleChange('dropChance', parseFloat(e.target.value))}
                  />
                </div>
              )}
            </div>

            {reward.type !== 'task_complete' && (
              <div className="grid grid-cols-2 gap-4 border-t pt-4 mt-2">
                <div className="space-y-2">
                  <Label>Custom Icon (Optional)</Label>
                  <IconSelector
                    value={reward.icon}
                    onChange={(icon) => handleChange('icon', icon)}
                  />
                </div>
                <div className="flex items-center pt-8">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`secret-${JSON.stringify(reward)}`}
                      checked={reward.secret}
                      onCheckedChange={(c) => handleChange('secret', c)}
                    />
                    <Label htmlFor={`secret-${JSON.stringify(reward)}`}>Secret Reward</Label>
                  </div>
                </div>
              </div>
            )}

            {/* Card Specific Data */}
            {reward.type === 'card' && (
              <div className="space-y-4 border p-4 rounded-md mt-2">
                <Label className="font-bold">Card Draw Parameters</Label>
                <div className="space-y-2">
                  <Label>Allowed Set IDs</Label>
                  <MultiDataSelector
                    values={reward.cardDrawParams?.allowedSetIds || []}
                    onSelect={(values) =>
                      handleChange('cardDrawParams', {
                        ...reward.cardDrawParams,
                        allowedSetIds: values,
                      })
                    }
                    fetcher={getTcgSetList}
                    placeholder="Select Sets..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Allowed Specific Cards</Label>
                  <MultiDataSelector
                    values={reward.cardDrawParams?.allowedCardIds || []}
                    onSelect={(values) =>
                      handleChange('cardDrawParams', {
                        ...reward.cardDrawParams,
                        allowedCardIds: values,
                      })
                    }
                    fetcher={() => getTcgCardList(reward.cardDrawParams?.allowedSetIds)}
                    placeholder="Select Cards..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Allowed Pokemon IDs</Label>
                  <MultiDataSelector
                    values={(reward.cardDrawParams?.allowedPokemonIds || []).map(String)}
                    onSelect={(values) =>
                      handleChange('cardDrawParams', {
                        ...reward.cardDrawParams,
                        allowedPokemonIds: values,
                      })
                    }
                    fetcher={getPokemonList}
                    placeholder="Select Pokemon..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Rarity Modifier</Label>
                    <Input
                      type="number"
                      value={reward.cardDrawParams?.rarityModifier ?? 0}
                      onChange={(e) =>
                        handleChange('cardDrawParams', {
                          ...reward.cardDrawParams,
                          rarityModifier: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Bonus Threshold</Label>
                    <Input
                      type="number"
                      value={reward.cardDrawParams?.bonusThreshold ?? 0}
                      onChange={(e) =>
                        handleChange('cardDrawParams', {
                          ...reward.cardDrawParams,
                          bonusThreshold: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Pokemon Specific Data */}
            {reward.type === 'pokemon' && (
              <div className="space-y-4 border p-4 rounded-md mt-2">
                <Label className="font-bold">Pokemon Data</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Level</Label>
                    <Input
                      type="number"
                      value={reward.pokemonData?.level ?? 5}
                      onChange={(e) => handlePokemonDataChange('level', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Form ID</Label>
                    <FormSelector
                      speciesId={Number(reward.targetId)}
                      value={reward.pokemonData?.formId}
                      onChange={(id) => handlePokemonDataChange('formId', id)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Rarity treatment</Label>
                    <Select
                      value={reward.pokemonData?.rarity || 'normal'}
                      onValueChange={(rarity) =>
                        handleChange('pokemonData', {
                          ...reward.pokemonData,
                          rarity,
                          shiny: undefined,
                          isShadow: undefined,
                          isRadiant: undefined,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {POKEMON_RARITY_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="border-t pt-2">
                  <Label className="text-xs text-muted-foreground">IVs (Optional)</Label>
                  <div className="grid grid-cols-6 gap-2">
                    {['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'].map(
                      (stat) => (
                        <div key={stat} className="space-y-1">
                          <Label className="text-[10px] uppercase">{stat.slice(0, 3)}</Label>
                          <Input
                            className="h-6 text-xs px-1"
                            type="number"
                            placeholder="-"
                            value={
                              reward.pokemonData?.ivs?.[
                                stat as keyof typeof reward.pokemonData.ivs
                              ] ?? ''
                            }
                            onChange={(e) =>
                              handleStatChange('ivs', stat, parseInt(e.target.value))
                            }
                          />
                        </div>
                      ),
                    )}
                  </div>
                </div>
                <div className="border-t pt-2">
                  <Label className="text-xs text-muted-foreground">EVs (Optional)</Label>
                  <div className="grid grid-cols-6 gap-2">
                    {['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'].map(
                      (stat) => (
                        <div key={stat} className="space-y-1">
                          <Label className="text-[10px] uppercase">{stat.slice(0, 3)}</Label>
                          <Input
                            className="h-6 text-xs px-1"
                            type="number"
                            placeholder="-"
                            value={
                              reward.pokemonData?.evs?.[
                                stat as keyof typeof reward.pokemonData.evs
                              ] ?? ''
                            }
                            onChange={(e) =>
                              handleStatChange('evs', stat, parseInt(e.target.value))
                            }
                          />
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div className="space-y-2">
                    <Label>Nature</Label>
                    <Input
                      value={reward.pokemonData?.nature || ''}
                      onChange={(e) => handlePokemonDataChange('nature', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Ball Type</Label>
                    <Input
                      value={reward.pokemonData?.ballType || ''}
                      onChange={(e) => handlePokemonDataChange('ballType', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Background</Label>
                    <Input
                      value={reward.pokemonData?.background || ''}
                      onChange={(e) => handlePokemonDataChange('background', e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex space-x-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`partner-pkmn-${JSON.stringify(reward)}`}
                      checked={reward.pokemonData?.partner}
                      onCheckedChange={(c) => handlePokemonDataChange('partner', c)}
                    />
                    <Label htmlFor={`partner-pkmn-${JSON.stringify(reward)}`}>Partner</Label>
                  </div>
                </div>
              </div>
            )}

            {/* Requirements */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Requirements to Claim</Label>
                <Button size="sm" variant="outline" onClick={addRequirement}>
                  <Plus className="h-3 w-3 mr-1" /> Add
                </Button>
              </div>
              {reward.requirements?.map((req, i) => (
                <TaskConditionForm
                  key={i}
                  condition={req}
                  onChange={(c) => updateRequirement(i, c)}
                  onRemove={() => removeRequirement(i)}
                />
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
