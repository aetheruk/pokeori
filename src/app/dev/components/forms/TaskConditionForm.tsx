'use client'

import * as React from 'react'
import { TaskCondition, TaskRequirementType, PokemonCriteria, BattleTeamCheck } from '@/data/types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent } from '@/components/ui/card'
import { Trash2 } from 'lucide-react'
import { PokemonSelector } from '../selectors/PokemonSelector'
import { FormSelector } from '../selectors/FormSelector'
import { PokemonFormSelector } from '../selectors/PokemonFormSelector'
import { DataSelector } from '../selectors/DataSelector'
import {
  getBannerList,
  getCurrencyList,
  getIconList,
  getItemList,
  getTaskList,
  getVoyageList,
  getTitleList,
  getSkillList,
  getTcgSetList,
  getTcgCardList,
  getBattleList,
  getLocationList,
  getResearchList,
  getExpeditionList,
  getPokemonTypeList,
} from '../../actions'
import { WEATHER_LABELS, WEATHER_TYPES } from '@/data/weather'

interface TaskConditionFormProps {
  condition: TaskCondition
  onChange: (condition: TaskCondition) => void
  onRemove: () => void
}

const REQUIREMENT_TYPES: TaskRequirementType[] = [
  'user_level',
  'item_owned',
  'currency_owned',
  'pokemon_owned',
  'card_collected_total',
  'card_collected_set',
  'card_collected_specific',
  'pokedex_seen_total',
  'pokedex_caught_total',
  'pokedex_seen_specific',
  'pokedex_caught_specific',
  'task_completed',
  'time_range',
  'date_range',
  'battle_result',
  'location_encounter_result',
  'research_encounter_result',
  'expedition_result',
  'power_usage',
  'total_evolutions',
  'voyage_completed',
  'skill_level',
  'user_banner',
  'user_icon',
  'user_title',
  'battle_team',
  'companion',
  'research_level',
  'research_level_total',
  'weather',
]

export function TaskConditionForm({ condition, onChange, onRemove }: TaskConditionFormProps) {
  const handleChange = (field: keyof TaskCondition, value: any) => {
    onChange({ ...condition, [field]: value })
  }

  const handlePokemonCriteriaChange = (field: keyof PokemonCriteria, value: any) => {
    const newCriteria = { ...condition.pokemonCriteria, [field]: value }
    handleChange('pokemonCriteria', newCriteria)
  }

  const handleCompanionCheckChange = (field: keyof PokemonCriteria, value: any) => {
    const newCriteria = { ...condition.companionCheck, [field]: value }
    handleChange('companionCheck', newCriteria)
  }

  return (
    <Card className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 text-destructive"
        onClick={onRemove}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <CardContent className="pt-6 grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Type</Label>
            <Select value={condition.type} onValueChange={(v) => handleChange('type', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {REQUIREMENT_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dynamic fields based on Type */}
          {/* Item ID */}
          {condition.type === 'item_owned' && (
            <div className="space-y-2">
              <Label>Item</Label>
              <DataSelector
                value={String(condition.targetId || '')}
                onSelect={(id) => handleChange('targetId', id)}
                fetcher={getItemList}
                placeholder="Select Item..."
              />
            </div>
          )}

          {/* Pokemon ID / Species */}
          {(condition.type === 'pokedex_seen_specific' ||
            condition.type === 'pokedex_caught_specific') && (
            <div className="space-y-2">
              <Label>Pokemon</Label>
              <PokemonSelector
                value={Number(condition.targetId)}
                onSelect={(id) => handleChange('targetId', id)}
              />
            </div>
          )}

          {/* Specific Data Selectors */}
          {condition.type === 'currency_owned' && (
            <div className="space-y-2">
              <Label>Currency</Label>
              <DataSelector
                value={String(condition.targetId || '')}
                onSelect={(id) => handleChange('targetId', id)}
                fetcher={getCurrencyList}
                placeholder="Select Currency..."
              />
            </div>
          )}
          {condition.type === 'user_banner' && (
            <div className="space-y-2">
              <Label>Banner</Label>
              <DataSelector
                value={String(condition.targetId || '')}
                onSelect={(id) => handleChange('targetId', id)}
                fetcher={getBannerList}
                placeholder="Select Banner..."
              />
            </div>
          )}
          {condition.type === 'user_icon' && (
            <div className="space-y-2">
              <Label>Icon</Label>
              <DataSelector
                value={String(condition.targetId || '')}
                onSelect={(id) => handleChange('targetId', id)}
                fetcher={getIconList}
                placeholder="Select Icon..."
              />
            </div>
          )}
          {condition.type === 'user_title' && (
            <div className="space-y-2">
              <Label>Title</Label>
              <DataSelector
                value={String(condition.targetId || '')}
                onSelect={(id) => handleChange('targetId', id)}
                fetcher={getTitleList}
                placeholder="Select Title..."
              />
            </div>
          )}
          {condition.type === 'task_completed' && (
            <div className="space-y-2">
              <Label>Task</Label>
              <DataSelector
                value={String(condition.targetId || '')}
                onSelect={(id) => handleChange('targetId', id)}
                fetcher={getTaskList}
                placeholder="Select Task..."
              />
            </div>
          )}
          {condition.type === 'voyage_completed' && (
            <div className="space-y-2">
              <Label>Voyage</Label>
              <DataSelector
                value={String(condition.targetId || '')}
                onSelect={(id) => handleChange('targetId', id)}
                fetcher={getVoyageList}
                placeholder="Select Voyage..."
              />
            </div>
          )}
          {(condition.type === 'user_level' || condition.type === 'skill_level') && (
            <div className="space-y-2">
              <Label>Skill</Label>
              <DataSelector
                value={String(condition.targetId || '')}
                onSelect={(id) => handleChange('targetId', id)}
                fetcher={getSkillList}
                placeholder="Select Skill..."
              />
            </div>
          )}
          {condition.type === 'card_collected_set' && (
            <div className="space-y-2">
              <Label>TCG Set</Label>
              <DataSelector
                value={String(condition.targetId || '')}
                onSelect={(id) => handleChange('targetId', id)}
                fetcher={getTcgSetList}
                placeholder="Select Set..."
              />
            </div>
          )}
          {condition.type === 'card_collected_specific' && (
            <div className="space-y-2">
              <Label>TCG Card</Label>
              <DataSelector
                value={String(condition.targetId || '')}
                onSelect={(id) => handleChange('targetId', id)}
                fetcher={getTcgCardList}
                placeholder="Select Card..."
              />
            </div>
          )}
          {condition.type === 'battle_result' && (
            <div className="space-y-2">
              <Label>Battle</Label>
              <DataSelector
                value={String(condition.targetId || '')}
                onSelect={(id) => handleChange('targetId', id)}
                fetcher={getBattleList}
                placeholder="Select Battle (Leave empty for any)"
              />
            </div>
          )}
          {condition.type === 'location_encounter_result' && (
            <div className="space-y-2">
              <Label>Location</Label>
              <DataSelector
                value={String(condition.targetId || '')}
                onSelect={(id) => handleChange('targetId', id)}
                fetcher={getLocationList}
                placeholder="Select Location (Leave empty for any)"
              />
            </div>
          )}
          {condition.type === 'research_encounter_result' && (
            <div className="space-y-2">
              <Label>Research</Label>
              <DataSelector
                value={String(condition.targetId || '')}
                onSelect={(id) => handleChange('targetId', id)}
                fetcher={getResearchList}
                placeholder="Select Research (Leave empty for any)"
              />
            </div>
          )}
          {condition.type === 'expedition_result' && (
            <div className="space-y-2">
              <Label>Expedition</Label>
              <DataSelector
                value={String(condition.targetId || '')}
                onSelect={(id) => handleChange('targetId', id)}
                fetcher={getExpeditionList}
                placeholder="Select Expedition (Leave empty for any)"
              />
            </div>
          )}
          {condition.type === 'research_level' && (
            <div className="col-span-2">
              <PokemonFormSelector
                value={String(condition.targetId || '')}
                onChange={(id) => handleChange('targetId', id)}
              />
            </div>
          )}
          {condition.type === 'research_level_total' && (
            <div className="space-y-2">
              <Label>Min Research Level</Label>
              <Input
                type="number"
                value={condition.level || ''}
                onChange={(e) => handleChange('level', parseInt(e.target.value))}
                placeholder="Minimum level (e.g. 3)"
              />
            </div>
          )}
          {condition.type === 'weather' && (
            <div className="space-y-2">
              <Label>Weather</Label>
              <Select
                value={String(condition.targetId || '')}
                onValueChange={(v) => handleChange('targetId', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select weather" />
                </SelectTrigger>
                <SelectContent>
                  {WEATHER_TYPES.map((weather) => (
                    <SelectItem key={weather} value={weather}>
                      {WEATHER_LABELS[weather]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Generic Target ID Input */}
          {[
            'power_usage',
            'battle_team', // Although battle_team has its own builder, it might use targetId for something else in the future? No, types.ts doesn't specify.
          ].includes(condition.type) && (
            <div className="space-y-2">
              <Label>Target ID</Label>
              <Input
                value={String(condition.targetId || '')}
                onChange={(e) => handleChange('targetId', e.target.value)}
                placeholder="ID"
              />
            </div>
          )}

          {/* Battle Result Status */}
          {condition.type === 'battle_result' && (
            <div className="space-y-2">
              <Label>Battle Status</Label>
              <Select
                value={condition.battleStatus || 'win'}
                onValueChange={(v) => handleChange('battleStatus', v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="win">Win</SelectItem>
                  <SelectItem value="loss">Loss</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {condition.type === 'expedition_result' && (
            <div className="space-y-2">
              <Label>Expedition Status</Label>
              <Select
                value={condition.expeditionStatus || 'completed'}
                onValueChange={(v) => handleChange('expeditionStatus', v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Power Type */}
          {condition.type === 'power_usage' && (
            <div className="space-y-2">
              <Label>Power Type</Label>
              <Select
                value={condition.powerType || 'tera'}
                onValueChange={(v) => handleChange('powerType', v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['tera', 'mega', 'z-move', 'dynamax', 'shout', 'victory', 'circadian'].map(
                    (t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Time Range */}
          {condition.type === 'time_range' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start (HH:mm)</Label>
                <Input
                  type="time"
                  value={condition.timeRange?.start || ''}
                  onChange={(e) =>
                    handleChange('timeRange', {
                      ...condition.timeRange,
                      start: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>End (HH:mm)</Label>
                <Input
                  type="time"
                  value={condition.timeRange?.end || ''}
                  onChange={(e) =>
                    handleChange('timeRange', {
                      ...condition.timeRange,
                      end: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}

          {/* Date Range */}
          {condition.type === 'date_range' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start (YYYY-MM-DD)</Label>
                <Input
                  type="date"
                  value={condition.dateRange?.start || ''}
                  onChange={(e) =>
                    handleChange('dateRange', {
                      ...condition.dateRange,
                      start: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>End (YYYY-MM-DD)</Label>
                <Input
                  type="date"
                  value={condition.dateRange?.end || ''}
                  onChange={(e) =>
                    handleChange('dateRange', {
                      ...condition.dateRange,
                      end: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}

          {/* Count */}
          <div className="space-y-2">
            <Label>Count / Level</Label>
            <Input
              type="number"
              value={condition.count || ''}
              onChange={(e) => handleChange('count', parseInt(e.target.value))}
              placeholder="Count or Level"
            />
          </div>
        </div>

        {/* Pokemon Criteria Builder */}
        {(condition.type === 'pokemon_owned' || condition.type === 'location_encounter_result') && (
          <div className="border p-4 rounded-md space-y-4">
            <Label className="font-semibold">Pokemon Criteria</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Species</Label>
                <PokemonSelector
                  value={condition.pokemonCriteria?.speciesId}
                  onSelect={(id) => handlePokemonCriteriaChange('speciesId', id)}
                />
              </div>
              <div className="space-y-2">
                <Label>Form ID</Label>
                <FormSelector
                  speciesId={condition.pokemonCriteria?.speciesId}
                  value={condition.pokemonCriteria?.formId}
                  onChange={(id) => handlePokemonCriteriaChange('formId', id)}
                />
              </div>
              <div className="space-y-2">
                <Label>Pokemon Type Filter</Label>
                <DataSelector
                  value={condition.pokemonCriteria?.type || ''}
                  onSelect={(v) => handlePokemonCriteriaChange('type', v)}
                  fetcher={getPokemonTypeList}
                  placeholder="Any Type"
                />
              </div>
              <div className="space-y-2">
                <Label>Size</Label>
                <Select
                  value={condition.pokemonCriteria?.size || ''}
                  onValueChange={(v) => handlePokemonCriteriaChange('size', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Min Level</Label>
                <Input
                  type="number"
                  value={condition.pokemonCriteria?.minLevel ?? ''}
                  onChange={(e) =>
                    handlePokemonCriteriaChange('minLevel', parseInt(e.target.value))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Max Level</Label>
                <Input
                  type="number"
                  value={condition.pokemonCriteria?.maxLevel ?? ''}
                  onChange={(e) =>
                    handlePokemonCriteriaChange('maxLevel', parseInt(e.target.value))
                  }
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="shiny"
                  checked={condition.pokemonCriteria?.shiny}
                  onCheckedChange={(c) => handlePokemonCriteriaChange('shiny', c)}
                />
                <Label htmlFor="shiny">Shiny</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="shadow-criteria"
                  checked={condition.pokemonCriteria?.isShadow}
                  onCheckedChange={(c) => handlePokemonCriteriaChange('isShadow', c)}
                />
                <Label htmlFor="shadow-criteria">Shadow</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="radiant-criteria"
                  checked={condition.pokemonCriteria?.isRadiant}
                  onCheckedChange={(c) => handlePokemonCriteriaChange('isRadiant', c)}
                />
                <Label htmlFor="radiant-criteria">Radiant</Label>
              </div>
            </div>
          </div>
        )}

        {/* Companion Check Builder */}
        {condition.type === 'companion' && (
          <div className="border p-4 rounded-md space-y-4">
            <Label className="font-semibold">Companion Check</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Species</Label>
                <PokemonSelector
                  value={condition.companionCheck?.speciesId}
                  onSelect={(id) => handleCompanionCheckChange('speciesId', id)}
                />
              </div>
              <div className="space-y-2">
                <Label>Form ID</Label>
                <FormSelector
                  speciesId={condition.companionCheck?.speciesId}
                  value={condition.companionCheck?.formId}
                  onChange={(id) => handleCompanionCheckChange('formId', id)}
                />
              </div>
              <div className="space-y-2">
                <Label>Pokemon Type Filter</Label>
                <DataSelector
                  value={condition.companionCheck?.type || ''}
                  onSelect={(v) => handleCompanionCheckChange('type', v)}
                  fetcher={getPokemonTypeList}
                  placeholder="Any Type"
                />
              </div>
              <div className="space-y-2">
                <Label>Size</Label>
                <Select
                  value={condition.companionCheck?.size || ''}
                  onValueChange={(v) => handleCompanionCheckChange('size', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Min Level</Label>
                <Input
                  type="number"
                  value={condition.companionCheck?.minLevel ?? ''}
                  onChange={(e) => handleCompanionCheckChange('minLevel', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>Max Level</Label>
                <Input
                  type="number"
                  value={condition.companionCheck?.maxLevel ?? ''}
                  onChange={(e) => handleCompanionCheckChange('maxLevel', parseInt(e.target.value))}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="shiny-companion"
                  checked={condition.companionCheck?.shiny}
                  onCheckedChange={(c) => handleCompanionCheckChange('shiny', c)}
                />
                <Label htmlFor="shiny-companion">Shiny</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="shadow-companion"
                  checked={condition.companionCheck?.isShadow}
                  onCheckedChange={(c) => handleCompanionCheckChange('isShadow', c)}
                />
                <Label htmlFor="shadow-companion">Shadow</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="radiant-companion"
                  checked={condition.companionCheck?.isRadiant}
                  onCheckedChange={(c) => handleCompanionCheckChange('isRadiant', c)}
                />
                <Label htmlFor="radiant-companion">Radiant</Label>
              </div>
            </div>
          </div>
        )}

        {/* Battle Team Check */}
        {condition.type === 'battle_team' && (
          <div className="border p-4 rounded-md space-y-4">
            <Label className="font-semibold">Battle Team Check</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Position</Label>
                <Select
                  value={String(condition.battleTeamCheck?.position || 'any')}
                  onValueChange={(v) =>
                    handleChange('battleTeamCheck', {
                      ...condition.battleTeamCheck,
                      position: v === 'any' ? 'any' : parseInt(v),
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Position</SelectItem>
                    {[1, 2, 3, 4, 5, 6].map((p) => (
                      <SelectItem key={p} value={p.toString()}>
                        Pos {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input
                  type="number"
                  value={condition.battleTeamCheck?.qty ?? 1}
                  onChange={(e) =>
                    handleChange('battleTeamCheck', {
                      ...condition.battleTeamCheck,
                      qty: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Species</Label>
                <PokemonSelector
                  value={condition.battleTeamCheck?.speciesId}
                  onSelect={(id) =>
                    handleChange('battleTeamCheck', {
                      ...condition.battleTeamCheck,
                      speciesId: id,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Form ID</Label>
                <FormSelector
                  speciesId={condition.battleTeamCheck?.speciesId}
                  value={condition.battleTeamCheck?.formId}
                  onChange={(id) =>
                    handleChange('battleTeamCheck', {
                      ...condition.battleTeamCheck,
                      formId: id,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Required Pokemon Type</Label>
                <DataSelector
                  value={condition.battleTeamCheck?.type || ''}
                  onSelect={(v) =>
                    handleChange('battleTeamCheck', {
                      ...condition.battleTeamCheck,
                      type: v,
                    })
                  }
                  fetcher={getPokemonTypeList}
                  placeholder="Any Type"
                />
                <p className="text-[10px] text-muted-foreground mt-1">
                  Filters the team for Pokemon of this type.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="shadow-battle-team"
                  checked={condition.battleTeamCheck?.isShadow}
                  onCheckedChange={(c) =>
                    handleChange('battleTeamCheck', {
                      ...condition.battleTeamCheck,
                      isShadow: c,
                    })
                  }
                />
                <Label htmlFor="shadow-battle-team">Shadow</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="radiant-battle-team"
                  checked={condition.battleTeamCheck?.isRadiant}
                  onCheckedChange={(c) =>
                    handleChange('battleTeamCheck', {
                      ...condition.battleTeamCheck,
                      isRadiant: c,
                    })
                  }
                />
                <Label htmlFor="radiant-battle-team">Radiant</Label>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="consume"
              checked={condition.consume}
              onCheckedChange={(c) => handleChange('consume', c)}
            />
            <Label htmlFor="consume">Consume on Complete</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="secret"
              checked={condition.secret}
              onCheckedChange={(c) => handleChange('secret', c)}
            />
            <Label htmlFor="secret">Secret (???)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="inverse"
              checked={condition.inverse}
              onCheckedChange={(c) => handleChange('inverse', c)}
            />
            <Label htmlFor="inverse">Inverse Condition</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
