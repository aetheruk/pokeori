'use client'

import * as React from 'react'
import { Location, LocationEncounter, LocationReward } from '@/data/types'
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
import { getItemList, getTaskList, getLocationList } from '../../actions'
import { TaskConditionForm } from './TaskConditionForm'
import { RewardForm } from './RewardForm'
import { Plus, Trash2 } from 'lucide-react'

interface LocationFormProps {
  data: Partial<Location>
  onChange: (data: Partial<Location>) => void
}

export function LocationForm({ data, onChange }: LocationFormProps) {
  const handleChange = (field: keyof Location, value: any) => {
    onChange({ ...data, [field]: value })
  }

  const addEncounter = () => {
    handleChange('encounters', [...(data.encounters || []), { speciesId: 1, chance: 10 }])
  }
  const updateEncounter = (i: number, f: keyof LocationEncounter, v: any) => {
    const n = [...(data.encounters || [])]
    n[i] = { ...n[i], [f]: v }
    handleChange('encounters', n)
  }
  const removeEncounter = (i: number) => {
    const n = [...(data.encounters || [])]
    n.splice(i, 1)
    handleChange('encounters', n)
  }

  const addReward = () =>
    handleChange('rewards', [...(data.rewards || []), { type: 'item', quantity: 1 }])
  const updateReward = (i: number, r: LocationReward) => {
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
      <Card>
        <CardHeader>
          <CardTitle>Location Info</CardTitle>
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
              <Label>Overrides (Location ID)</Label>
              <DataSelector
                value={data.overrides || ''}
                onSelect={(v) => handleChange('overrides', v)}
                fetcher={getLocationList}
                placeholder="Select location to override..."
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mechanics</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Timer (seconds)</Label>
              <Input
                type="number"
                value={data.timer ?? 30}
                onChange={(e) => handleChange('timer', parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Shiny Mod (1.0 = normal)</Label>
              <Input
                type="number"
                step="0.1"
                value={data.shinyChanceModifier ?? 1.0}
                onChange={(e) => handleChange('shinyChanceModifier', parseFloat(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Catch Rate Mod (0-255)</Label>
              <Input
                type="number"
                value={data.catchRateModifier ?? 0}
                onChange={(e) => handleChange('catchRateModifier', parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Level Min</Label>
              <Input
                type="number"
                value={data.levelRange?.min ?? 5}
                onChange={(e) =>
                  handleChange('levelRange', { ...data.levelRange, min: parseInt(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Level Max</Label>
              <Input
                type="number"
                value={data.levelRange?.max ?? 5}
                onChange={(e) =>
                  handleChange('levelRange', { ...data.levelRange, max: parseInt(e.target.value) })
                }
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="daily"
              checked={data.daily}
              onCheckedChange={(c) => handleChange('daily', c)}
            />
            <Label htmlFor="daily">Daily Location</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="keyEncounter"
              checked={data.keyEncounter}
              onCheckedChange={(c) => handleChange('keyEncounter', c)}
            />
            <Label htmlFor="keyEncounter">Key Encounter</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Requirements</CardTitle>
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
          <div className="border-t pt-4 mt-4">
            <Label className="mb-2 block font-bold">Required Item (Special)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Item ID</Label>
                <DataSelector
                  value={data.requiredItem?.id || ''}
                  onSelect={(id) => handleChange('requiredItem', { ...data.requiredItem, id })}
                  fetcher={getItemList}
                  placeholder="Select Item..."
                />
              </div>
              <div className="space-y-2">
                <Label>Break Chance (%)</Label>
                <Input
                  type="number"
                  value={data.requiredItem?.breakChance ?? 0}
                  onChange={(e) =>
                    handleChange('requiredItem', {
                      ...data.requiredItem,
                      breakChance: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Switch
                id="useOnCatch"
                checked={data.requiredItem?.useOnCatch}
                onCheckedChange={(c) =>
                  handleChange('requiredItem', { ...data.requiredItem, useOnCatch: c })
                }
              />
              <Label htmlFor="useOnCatch">Use on Catch Check</Label>
            </div>
          </div>
        </CardContent>
      </Card>

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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Encounters</CardTitle>
          <Button size="sm" onClick={addEncounter}>
            <Plus className="mr-2 h-4 w-4" /> Add Encounter
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.encounters?.map((encounter, index) => (
            <div key={index} className="flex gap-4 items-start border p-4 rounded-md relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-destructive"
                onClick={() => removeEncounter(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="grid gap-4 flex-1">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Pokemon</Label>
                    <PokemonSelector
                      value={encounter.speciesId}
                      onSelect={(id) => updateEncounter(index, 'speciesId', id)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Form ID</Label>
                    <FormSelector
                      speciesId={encounter.speciesId}
                      value={encounter.formId}
                      onChange={(id) => updateEncounter(index, 'formId', id)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Chance (%)</Label>
                    <Input
                      type="number"
                      value={encounter.chance}
                      onChange={(e) => updateEncounter(index, 'chance', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

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
