'use client'

import * as React from 'react'
import { BattleConfig, BattleEnemy, Reward, StatusEffectId } from '@/data/types'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
import { DataSelector } from '../selectors/DataSelector'
import { getTaskList, getBattleList, getItemList } from '../../actions'
import { TaskConditionForm } from './TaskConditionForm'
import { RewardForm } from './RewardForm'
import { Plus, Trash2 } from 'lucide-react'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { POKEMON_RARITY_OPTIONS } from '@/utilities/pokemon/rarity-effects'

interface BattleFormProps {
  data: Partial<BattleConfig>
  onChange: (data: Partial<BattleConfig>) => void
}

const STATUS_EFFECTS: StatusEffectId[] = [
  'burn',
  'frostbite',
  'paralysis',
  'poison',
  'bad-poison',
  'sleep',
  'veil',
  'confusion',
  'freeze',
  'regen',
  'mystic-veil',
  'shield',
  'shield-plus',
  'shield-ex',
  't-shield',
  't-shield-plus',
  't-shield-ex',
  's-shield',
  's-shield-plus',
  's-shield-ex',
  'victory',
  'vanished',
]

export function BattleForm({ data, onChange }: BattleFormProps) {
  const handleChange = (field: keyof BattleConfig, value: any) => {
    onChange({ ...data, [field]: value })
  }
  const handleOptionalNumberChange = (
    field: keyof BattleConfig,
    value: string,
  ) => {
    handleChange(field, value === '' ? undefined : parseInt(value, 10))
  }

  // --- Nested List Helpers ---
  const addEnemy = () =>
    handleChange('enemyTeam', [...(data.enemyTeam || []), { speciesId: 1, level: 5 }])
  const updateEnemy = (i: number, f: keyof BattleEnemy, v: any) => {
    const n = [...(data.enemyTeam || [])]
    n[i] = { ...n[i], [f]: v }
    handleChange('enemyTeam', n)
  }
  const removeEnemy = (i: number) => {
    const n = [...(data.enemyTeam || [])]
    n.splice(i, 1)
    handleChange('enemyTeam', n)
  }

  const addReward = () =>
    handleChange('rewards', [...(data.rewards || []), { type: 'item', quantity: 1 }])
  const updateReward = (i: number, r: Reward) => {
    const n = [...(data.rewards || [])]
    n[i] = r
    handleChange('rewards', n)
  }
  const removeReward = (i: number) => {
    const n = [...(data.rewards || [])]
    n.splice(i, 1)
    handleChange('rewards', n)
  }

  const addRequirement = () =>
    handleChange('requirements', [...(data.requirements || []), { type: 'user_level', count: 1 }])
  const updateRequirement = (i: number, cond: any) => {
    const n = [...(data.requirements || [])]
    n[i] = cond
    handleChange('requirements', n)
  }
  const removeRequirement = (i: number) => {
    const n = [...(data.requirements || [])]
    n.splice(i, 1)
    handleChange('requirements', n)
  }

  const addCriteria = () =>
    handleChange('criteria', [...(data.criteria || []), { type: 'task_completed', count: 1 }])
  const updateCriteria = (i: number, cond: any) => {
    const n = [...(data.criteria || [])]
    n[i] = cond
    handleChange('criteria', n)
  }
  const removeCriteria = (i: number) => {
    const n = [...(data.criteria || [])]
    n.splice(i, 1)
    handleChange('criteria', n)
  }

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Info</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>ID</Label>
              <Input value={data.id || ''} onChange={(e) => handleChange('id', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={data.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={data.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Hide Condition (Task ID)</Label>
            <DataSelector
              value={data.hide || ''}
              onSelect={(v) => handleChange('hide', v)}
              fetcher={getTaskList}
              placeholder="Select task to hide after..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Input
                value={data.category || ''}
                onChange={(e) => handleChange('category', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Sub Category</Label>
              <Input
                value={data.subCategory || ''}
                onChange={(e) => handleChange('subCategory', e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Icon</Label>
              <IconSelector value={data.icon} onChange={(v) => handleChange('icon', v)} />
            </div>
            <div className="space-y-2">
              <Label>Background</Label>
              <Input
                value={data.background || ''}
                onChange={(e) => handleChange('background', e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Music URL</Label>
            <Input
              value={data.music || ''}
              onChange={(e) => handleChange('music', e.target.value)}
              placeholder="/music/battle.mp3"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Overrides (Battle ID)</Label>
              <DataSelector
                value={data.overrides || ''}
                onSelect={(v) => handleChange('overrides', v)}
                fetcher={getBattleList}
                placeholder="Select battle to override..."
              />
            </div>
            <div className="space-y-2">
              <Label>Title (VS Screen)</Label>
              <Input
                value={data.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Allowed Items</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleChange('allowedItems', [...(data.allowedItems || []), ''])}
              >
                <Plus className="mr-1 h-3 w-3" /> Add Item
              </Button>
            </div>
            {(data.allowedItems || []).length === 0 && (
              <p className="text-xs text-muted-foreground">All battle items allowed (default)</p>
            )}
            {(data.allowedItems || []).map((itemId, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex-1">
                  <DataSelector
                    value={itemId}
                    onSelect={(v) => {
                      const items = [...(data.allowedItems || [])]
                      items[i] = v
                      handleChange('allowedItems', items)
                    }}
                    fetcher={getItemList}
                    placeholder="Select item..."
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive"
                  onClick={() => {
                    const items = [...(data.allowedItems || [])]
                    items.splice(i, 1)
                    handleChange('allowedItems', items)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings & Limits */}
      <Card>
        <CardHeader>
          <CardTitle>Battle Settings & Limits</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Max Pokemon</Label>
              <Input
                type="number"
                value={data.maxPokemon ?? 6}
                onChange={(e) => handleChange('maxPokemon', parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Level Cap</Label>
              <Input
                type="number"
                value={data.levelCap ?? ''}
                onChange={(e) => handleChange('levelCap', parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Items/Battle Cap</Label>
              <Input
                type="number"
                value={data.itemsPerBattle ?? ''}
                placeholder="Trainer skill limit"
                onChange={(e) => handleOptionalNumberChange('itemsPerBattle', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Moves/Battle Cap</Label>
              <Input
                type="number"
                value={data.movesPerBattle ?? ''}
                placeholder="Trainer skill limit"
                onChange={(e) => handleOptionalNumberChange('movesPerBattle', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Tera Uses Cap</Label>
              <Input
                type="number"
                value={data.teraUsesPerBattle ?? ''}
                placeholder="1"
                onChange={(e) => handleOptionalNumberChange('teraUsesPerBattle', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Dynamax Uses Cap</Label>
              <Input
                type="number"
                value={data.dynamaxPerBattle ?? ''}
                placeholder="1"
                onChange={(e) => handleOptionalNumberChange('dynamaxPerBattle', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Mega Uses Cap</Label>
              <Input
                type="number"
                value={data.megaEvolutionsPerBattle ?? ''}
                placeholder="1"
                onChange={(e) => handleOptionalNumberChange('megaEvolutionsPerBattle', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Z-Move Uses Cap</Label>
              <Input
                type="number"
                value={data.zMovesPerBattle ?? ''}
                placeholder="1"
                onChange={(e) => handleOptionalNumberChange('zMovesPerBattle', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Victory Uses Cap</Label>
              <Input
                type="number"
                value={data.victoryUses ?? ''}
                placeholder="1"
                onChange={(e) => handleOptionalNumberChange('victoryUses', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Shouts Uses Cap</Label>
              <Input
                type="number"
                value={data.shoutsPerBattle ?? ''}
                placeholder="1"
                onChange={(e) => handleOptionalNumberChange('shoutsPerBattle', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Circadian Uses Cap</Label>
              <Input
                type="number"
                value={data.circadianUses ?? ''}
                placeholder="1"
                onChange={(e) => handleOptionalNumberChange('circadianUses', e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="allowSwapping"
                checked={data.allowSwapping ?? true}
                onCheckedChange={(c) => handleChange('allowSwapping', c)}
              />
              <Label htmlFor="allowSwapping">Allow Swapping</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isWildBattle"
                checked={data.isWildBattle}
                onCheckedChange={(c) => handleChange('isWildBattle', c)}
              />
              <Label htmlFor="isWildBattle">Random Encounter (1 Enemy)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="daily"
                checked={data.daily}
                onCheckedChange={(c) => handleChange('daily', c)}
              />
              <Label htmlFor="daily">Daily Battle</Label>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 border-t pt-4">
            <div className="flex items-center space-x-2">
              <Switch id="pvp" checked={data.pvp} onCheckedChange={(c) => handleChange('pvp', c)} />
              <Label htmlFor="pvp">PVP Mode</Label>
            </div>
            {data.pvp && (
              <div className="w-40">
                <Select value={data.pvp_type} onValueChange={(v) => handleChange('pvp_type', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="PVP Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="ranked">Ranked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Enemy Team */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Enemy Team</CardTitle>
          <Button size="sm" onClick={addEnemy}>
            <Plus className="mr-2 h-4 w-4" /> Add Enemy
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.enemyTeam?.map((enemy, index) => (
            <div key={index} className="border p-4 rounded-md relative flex flex-col gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-destructive"
                onClick={() => removeEnemy(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Pokemon</Label>
                  <PokemonSelector
                    value={enemy.speciesId}
                    onSelect={(id) => updateEnemy(index, 'speciesId', id)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Level</Label>
                  <Input
                    type="number"
                    value={typeof enemy.level === 'number' ? enemy.level : enemy.level.min}
                    onChange={(e) => updateEnemy(index, 'level', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Override Name</Label>
                  <Input
                    value={enemy.name || ''}
                    onChange={(e) => updateEnemy(index, 'name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Form ID</Label>
                  <FormSelector
                    speciesId={enemy.speciesId}
                    value={enemy.formId}
                    onChange={(id) => updateEnemy(index, 'formId', id)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Initial Status</Label>
                  <Select
                    value={enemy.initialStatus}
                    onValueChange={(v) => updateEnemy(index, 'initialStatus', v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_EFFECTS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 pt-4">
                  <Label>Rarity treatment</Label>
                  <Select
                    value={enemy.rarity || 'normal'}
                    onValueChange={(rarity) =>
                      updateEnemy(index, 'rarity', rarity)
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

              <div className="space-y-2">
                <Label className="text-xs font-bold">IVs (HP/Atk/Def/SpA/SpD/Spd)</Label>
                <div className="grid grid-cols-6 gap-2">
                  {['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'].map(
                    (stat) => (
                      <Input
                        key={stat}
                        className="h-6 text-xs px-1"
                        type="number"
                        placeholder={stat.slice(0, 3).toUpperCase()}
                        value={enemy.ivs?.[stat as keyof typeof enemy.ivs] ?? ''}
                        onChange={(e) => {
                          const val = parseInt(e.target.value)
                          const current = enemy.ivs || {}
                          updateEnemy(index, 'ivs', { ...current, [stat]: val })
                        }}
                      />
                    ),
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold">EVs (HP/Atk/Def/SpA/SpD/Spd)</Label>
                <div className="grid grid-cols-6 gap-2">
                  {['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'].map(
                    (stat) => (
                      <Input
                        key={stat}
                        className="h-6 text-xs px-1"
                        type="number"
                        placeholder={stat.slice(0, 3).toUpperCase()}
                        value={enemy.evs?.[stat as keyof typeof enemy.evs] ?? ''}
                        onChange={(e) => {
                          const val = parseInt(e.target.value)
                          const current = enemy.evs || {}
                          updateEnemy(index, 'evs', { ...current, [stat]: val })
                        }}
                      />
                    ),
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Requirements to Enter</CardTitle>
          <Button size="sm" onClick={addRequirement}>
            <Plus className="mr-2 h-4 w-4" /> Add Requirement
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.requirements?.map((req, index) => (
            <TaskConditionForm
              key={index}
              condition={req}
              onChange={(c) => updateRequirement(index, c)}
              onRemove={() => removeRequirement(index)}
            />
          ))}
        </CardContent>
      </Card>

      {/* Criteria */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Criteria (To Complete)</CardTitle>
          <Button size="sm" onClick={addCriteria}>
            <Plus className="mr-2 h-4 w-4" /> Add Criteria
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.criteria?.map((req, index) => (
            <TaskConditionForm
              key={index}
              condition={req}
              onChange={(c) => updateCriteria(index, c)}
              onRemove={() => removeCriteria(index)}
            />
          ))}
        </CardContent>
      </Card>

      {/* Rewards */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Rewards</CardTitle>
          <Button size="sm" onClick={addReward}>
            <Plus className="mr-2 h-4 w-4" /> Add Reward
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.rewards?.map((reward, index) => (
            <RewardForm
              key={index}
              reward={reward}
              onChange={(r) => updateReward(index, r)}
              onRemove={() => removeReward(index)}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
