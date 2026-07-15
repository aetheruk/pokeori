'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IconSelector } from '../selectors/IconSelector'
import { DataSelector } from '../selectors/DataSelector'
import { getPokemonTypeList, getTaskList } from '../../actions'
import { TaskConditionForm } from './TaskConditionForm'
import { RewardForm } from './RewardForm'
import { PokemonSelector } from '../selectors/PokemonSelector'
import { FormSelector } from '../selectors/FormSelector'
import { Plus, Trash2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface VoyageConfig {
  id: string
  hide?: string
  name: string
  description: string
  category: string
  subCategory?: string
  icon: { type: 'local' | 'item' | 'pokemon' | 'lucide'; id: string }
  durationMinutes: number
  isRepeatable: boolean
  minPokemon?: number
  maxPokemon: number
  successChance: number
  requirements?: any[]
  criteria?: any[]
  pokemonCriteria?: {
    allowedSpeciesIds?: number[]
    allowedFormIds?: string[]
    allowedTypes?: string[]
    minLevel?: number
    minIv?: number
  }
  teamRequirements?: {
    type: 'total_stat'
    stat: string
    value: number
    comparison?: string
  }[]
  rewards: any[]
  background?: string
}

interface VoyageFormProps {
  data: Partial<VoyageConfig>
  onChange: (data: Partial<VoyageConfig>) => void
}

export function VoyageForm({ data, onChange }: VoyageFormProps) {
  // Local helper state: tracks which species was picked per formId row (for FormSelector lookup)
  const [formIdSpecies, setFormIdSpecies] = React.useState<Record<number, number>>({})

  const handleChange = (field: keyof VoyageConfig, value: any) => {
    onChange({ ...data, [field]: value })
  }

  // --- Rewards ---
  const addReward = () =>
    handleChange('rewards', [...(data.rewards || []), { type: 'item', quantity: 1 }])
  const updateReward = (i: number, r: any) => {
    const n = [...(data.rewards || [])]
    n[i] = r
    handleChange('rewards', n)
  }
  const removeReward = (i: number) => {
    const n = [...(data.rewards || [])]
    n.splice(i, 1)
    handleChange('rewards', n)
  }

  // --- Requirements ---
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

  // --- Criteria ---
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

  // --- Team Requirements ---
  const addTeamReq = () =>
    handleChange('teamRequirements', [
      ...(data.teamRequirements || []),
      { type: 'total_stat' as const, stat: 'level', value: 10 },
    ])
  const updateTeamReq = (i: number, field: string, value: any) => {
    const n = [...(data.teamRequirements || [])]
    n[i] = { ...n[i], [field]: value }
    handleChange('teamRequirements', n)
  }
  const removeTeamReq = (i: number) => {
    const n = [...(data.teamRequirements || [])]
    n.splice(i, 1)
    handleChange('teamRequirements', n)
  }

  // --- Pokemon Criteria Species Ids ---
  const addSpeciesId = () => {
    const pc = data.pokemonCriteria || {}
    handleChange('pokemonCriteria', {
      ...pc,
      allowedSpeciesIds: [...(pc.allowedSpeciesIds || []), 1],
    })
  }
  const updateSpeciesId = (i: number, v: number) => {
    const pc = data.pokemonCriteria || {}
    const ids = [...(pc.allowedSpeciesIds || [])]
    ids[i] = v
    handleChange('pokemonCriteria', { ...pc, allowedSpeciesIds: ids })
  }
  const removeSpeciesId = (i: number) => {
    const pc = data.pokemonCriteria || {}
    const ids = [...(pc.allowedSpeciesIds || [])]
    ids.splice(i, 1)
    handleChange('pokemonCriteria', { ...pc, allowedSpeciesIds: ids })
  }

  // --- Pokemon Criteria Allowed Form Ids ---
  const addFormId = () => {
    const pc = data.pokemonCriteria || {}
    handleChange('pokemonCriteria', {
      ...pc,
      allowedFormIds: [...(pc.allowedFormIds || []), ''],
    })
  }
  const updateFormId = (i: number, v: string) => {
    const pc = data.pokemonCriteria || {}
    const ids = [...(pc.allowedFormIds || [])]
    ids[i] = v
    handleChange('pokemonCriteria', { ...pc, allowedFormIds: ids })
  }
  const removeFormId = (i: number) => {
    const pc = data.pokemonCriteria || {}
    const ids = [...(pc.allowedFormIds || [])]
    ids.splice(i, 1)
    handleChange('pokemonCriteria', { ...pc, allowedFormIds: ids })
  }

  // --- Pokemon Criteria Allowed Types ---
  const addAllowedType = () => {
    const pc = data.pokemonCriteria || {}
    handleChange('pokemonCriteria', {
      ...pc,
      allowedTypes: [...(pc.allowedTypes || []), ''],
    })
  }
  const updateAllowedType = (i: number, v: string) => {
    const pc = data.pokemonCriteria || {}
    const types = [...(pc.allowedTypes || [])]
    types[i] = v
    handleChange('pokemonCriteria', { ...pc, allowedTypes: types })
  }
  const removeAllowedType = (i: number) => {
    const pc = data.pokemonCriteria || {}
    const types = [...(pc.allowedTypes || [])]
    types.splice(i, 1)
    handleChange('pokemonCriteria', { ...pc, allowedTypes: types })
  }

  return (
    <div className="space-y-6">
      {/* Voyage Info */}
      <Card>
        <CardHeader>
          <CardTitle>Voyage Info</CardTitle>
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
              rows={3}
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
              <Label>Sub-Category</Label>
              <Input
                value={data.subCategory || ''}
                onChange={(e) => handleChange('subCategory', e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Background</Label>
              <Input
                value={data.background || ''}
                onChange={(e) => handleChange('background', e.target.value)}
                placeholder="/backgrounds/grassy-route.avif"
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
          <div className="space-y-2">
            <Label>Icon</Label>
            <IconSelector
              value={data.icon || { type: 'pokemon', id: '' }}
              onChange={(v) => handleChange('icon', v)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Voyage Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Voyage Settings</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Duration (minutes)</Label>
              <Input
                type="number"
                value={data.durationMinutes ?? 15}
                onChange={(e) => handleChange('durationMinutes', parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label>Success Chance (%)</Label>
              <Input
                type="number"
                min={0}
                max={100}
                value={data.successChance ?? 100}
                onChange={(e) => handleChange('successChance', parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="flex items-end pb-2">
              <div className="flex items-center gap-2">
                <Switch
                  checked={data.isRepeatable ?? true}
                  onCheckedChange={(v) => handleChange('isRepeatable', v)}
                />
                <Label>Repeatable</Label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Min Pokemon</Label>
              <Input
                type="number"
                min={1}
                value={data.minPokemon ?? 1}
                onChange={(e) => handleChange('minPokemon', parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="space-y-2">
              <Label>Max Pokemon</Label>
              <Input
                type="number"
                min={1}
                value={data.maxPokemon ?? 6}
                onChange={(e) => handleChange('maxPokemon', parseInt(e.target.value) || 1)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pokemon Criteria */}
      <Card>
        <CardHeader>
          <CardTitle>Pokemon Criteria</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Min Level</Label>
              <Input
                type="number"
                value={data.pokemonCriteria?.minLevel ?? ''}
                onChange={(e) =>
                  handleChange('pokemonCriteria', {
                    ...data.pokemonCriteria,
                    minLevel: e.target.value ? parseInt(e.target.value) : undefined,
                  })
                }
                placeholder="Any"
              />
            </div>
            <div className="space-y-2">
              <Label>Min IV</Label>
              <Input
                type="number"
                value={data.pokemonCriteria?.minIv ?? ''}
                onChange={(e) =>
                  handleChange('pokemonCriteria', {
                    ...data.pokemonCriteria,
                    minIv: e.target.value ? parseInt(e.target.value) : undefined,
                  })
                }
                placeholder="Any"
              />
            </div>
          </div>

          {/* Allowed Species */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Allowed Species</Label>
              <Button variant="outline" size="sm" onClick={addSpeciesId}>
                <Plus className="mr-1 h-3 w-3" /> Add
              </Button>
            </div>
            {(data.pokemonCriteria?.allowedSpeciesIds || []).map((id, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex-1">
                  <PokemonSelector
                    value={id}
                    onSelect={(speciesId: number) => updateSpeciesId(i, speciesId)}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive"
                  onClick={() => removeSpeciesId(i)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Allowed Form IDs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Allowed Form IDs</Label>
              <Button variant="outline" size="sm" onClick={addFormId}>
                <Plus className="mr-1 h-3 w-3" /> Add
              </Button>
            </div>
            {(data.pokemonCriteria?.allowedFormIds || []).map((fId, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-40">
                  <PokemonSelector
                    value={formIdSpecies[i]}
                    onSelect={(speciesId: number) =>
                      setFormIdSpecies((prev) => ({ ...prev, [i]: speciesId }))
                    }
                  />
                </div>
                <div className="flex-1">
                  <FormSelector
                    speciesId={formIdSpecies[i]}
                    value={fId}
                    onChange={(id) => updateFormId(i, id)}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive"
                  onClick={() => removeFormId(i)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Allowed Types */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Allowed Types</Label>
              <Button variant="outline" size="sm" onClick={addAllowedType}>
                <Plus className="mr-1 h-3 w-3" /> Add
              </Button>
            </div>
            {(data.pokemonCriteria?.allowedTypes || []).map((t, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex-1">
                  <DataSelector
                    value={t}
                    onSelect={(v) => updateAllowedType(i, v)}
                    fetcher={getPokemonTypeList}
                    placeholder="Select type..."
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive"
                  onClick={() => removeAllowedType(i)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Requirements */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Team Requirements</CardTitle>
          <Button variant="outline" size="sm" onClick={addTeamReq}>
            <Plus className="mr-2 h-4 w-4" /> Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {(data.teamRequirements || []).map((req, i) => (
            <div key={i} className="flex items-end gap-2 p-3 rounded-md border bg-muted/30">
              <div className="space-y-1 flex-1">
                <Label className="text-xs">Stat</Label>
                <Select value={req.stat} onValueChange={(v) => updateTeamReq(i, 'stat', v)}>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      'hp',
                      'attack',
                      'defense',
                      'specialAttack',
                      'specialDefense',
                      'speed',
                      'level',
                    ].map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1 w-24">
                <Label className="text-xs">Value</Label>
                <Input
                  type="number"
                  className="h-8"
                  value={req.value ?? 0}
                  onChange={(e) => updateTeamReq(i, 'value', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-1 w-24">
                <Label className="text-xs">Comparison</Label>
                <Select
                  value={req.comparison || 'gte'}
                  onValueChange={(v) => updateTeamReq(i, 'comparison', v)}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gte">≥ (gte)</SelectItem>
                    <SelectItem value="lte">≤ (lte)</SelectItem>
                    <SelectItem value="eq">= (eq)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-destructive"
                onClick={() => removeTeamReq(i)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Rewards */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Rewards</CardTitle>
          <Button variant="outline" size="sm" onClick={addReward}>
            <Plus className="mr-2 h-4 w-4" /> Add Reward
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {(data.rewards || []).map((reward, i) => (
            <RewardForm
              key={i}
              reward={reward}
              onChange={(r) => updateReward(i, r)}
              onRemove={() => removeReward(i)}
            />
          ))}
        </CardContent>
      </Card>

      {/* Unlock Requirements */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Unlock Requirements</CardTitle>
          <Button variant="outline" size="sm" onClick={addRequirement}>
            <Plus className="mr-2 h-4 w-4" /> Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {(data.requirements || []).map((req, i) => (
            <TaskConditionForm
              key={i}
              condition={req}
              onChange={(c) => updateRequirement(i, c)}
              onRemove={() => removeRequirement(i)}
            />
          ))}
        </CardContent>
      </Card>

      {/* Criteria */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Visibility Criteria</CardTitle>
          <Button variant="outline" size="sm" onClick={addCriteria}>
            <Plus className="mr-2 h-4 w-4" /> Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {(data.criteria || []).map((crit, i) => (
            <TaskConditionForm
              key={i}
              condition={crit}
              onChange={(c) => updateCriteria(i, c)}
              onRemove={() => removeCriteria(i)}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
