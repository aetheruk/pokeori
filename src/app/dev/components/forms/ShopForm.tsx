'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IconSelector } from '../selectors/IconSelector'
import { DataSelector } from '../selectors/DataSelector'
import { getItemList, getCurrencyList, getTaskList } from '../../actions'
import { TaskConditionForm } from './TaskConditionForm'
import { RewardForm } from './RewardForm'
import { Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

interface ShopCost {
  type: 'currency' | 'item'
  id: string
  amount: number
}

interface ShopItem {
  id: string
  name: string
  description?: string
  icon?: { type: 'local' | 'item' | 'pokemon' | 'lucide'; id: string }
  cost: ShopCost[]
  rewards: any[]
  stock?: number
  daily?: boolean
  requirements?: any[]
}

interface ShopConfig {
  id: string
  hide?: string
  name: string
  description: string
  category?: string
  subCategory?: string
  icon: { type: 'local' | 'item' | 'pokemon' | 'lucide'; id: string }
  items: ShopItem[]
  requirements?: any[]
  background?: string
}

interface ShopFormProps {
  data: Partial<ShopConfig>
  onChange: (data: Partial<ShopConfig>) => void
}

export function ShopForm({ data, onChange }: ShopFormProps) {
  const [expandedItems, setExpandedItems] = React.useState<Set<number>>(new Set([0]))

  const handleChange = (field: keyof ShopConfig, value: any) => {
    onChange({ ...data, [field]: value })
  }

  const toggleItem = (index: number) => {
    setExpandedItems((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  // --- Shop Items ---
  const addShopItem = () => {
    const newItem: ShopItem = {
      id: `new-item-${(data.items?.length || 0) + 1}`,
      name: 'New Item',
      cost: [{ type: 'currency', id: 'pokedollars', amount: 100 }],
      rewards: [{ type: 'item', quantity: 1, dropChance: 100 }],
    }
    handleChange('items', [...(data.items || []), newItem])
    setExpandedItems((prev) => new Set([...prev, data.items?.length || 0]))
  }

  const updateShopItem = (idx: number, field: keyof ShopItem, value: any) => {
    const items = [...(data.items || [])]
    items[idx] = { ...items[idx], [field]: value }
    handleChange('items', items)
  }

  const removeShopItem = (idx: number) => {
    const items = [...(data.items || [])]
    items.splice(idx, 1)
    handleChange('items', items)
  }

  // --- Cost helpers ---
  const addCost = (itemIdx: number) => {
    const items = [...(data.items || [])]
    items[itemIdx] = {
      ...items[itemIdx],
      cost: [...(items[itemIdx].cost || []), { type: 'currency', id: 'pokedollars', amount: 100 }],
    }
    handleChange('items', items)
  }

  const updateCost = (itemIdx: number, costIdx: number, field: keyof ShopCost, value: any) => {
    const items = [...(data.items || [])]
    const costs = [...(items[itemIdx].cost || [])]
    costs[costIdx] = { ...costs[costIdx], [field]: value }
    items[itemIdx] = { ...items[itemIdx], cost: costs }
    handleChange('items', items)
  }

  const removeCost = (itemIdx: number, costIdx: number) => {
    const items = [...(data.items || [])]
    const costs = [...(items[itemIdx].cost || [])]
    costs.splice(costIdx, 1)
    items[itemIdx] = { ...items[itemIdx], cost: costs }
    handleChange('items', items)
  }

  // --- Shop Requirements ---
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

  return (
    <div className="space-y-6">
      {/* Shop Info */}
      <Card>
        <CardHeader>
          <CardTitle>Shop Info</CardTitle>
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
              rows={2}
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
                placeholder="/backgrounds/shop.avif"
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
              value={data.icon || { type: 'item', id: '' }}
              onChange={(v) => handleChange('icon', v)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Shop Items */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Shop Items ({data.items?.length || 0})</CardTitle>
          <Button variant="outline" size="sm" onClick={addShopItem}>
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {(data.items || []).map((item, idx) => (
            <Card key={idx} className="border-dashed">
              <CardHeader
                className="py-3 px-4 cursor-pointer flex flex-row items-center justify-between"
                onClick={() => toggleItem(idx)}
              >
                <div className="flex items-center gap-2">
                  {expandedItems.has(idx) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  <span className="font-medium text-sm">
                    #{idx + 1}: {item.name || item.id || 'Unnamed'}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeShopItem(idx)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              {expandedItems.has(idx) && (
                <CardContent className="space-y-4 pt-0">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Item ID</Label>
                      <Input
                        value={item.id || ''}
                        onChange={(e) => updateShopItem(idx, 'id', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        value={item.name || ''}
                        onChange={(e) => updateShopItem(idx, 'name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Stock</Label>
                      <Input
                        type="number"
                        value={item.stock ?? ''}
                        onChange={(e) =>
                          updateShopItem(
                            idx,
                            'stock',
                            e.target.value ? parseInt(e.target.value) : undefined,
                          )
                        }
                        placeholder="Infinite"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Daily Restock</Label>
                      <div className="flex h-10 items-center gap-3 rounded-md border px-3">
                        <Switch
                          checked={!!item.daily}
                          onCheckedChange={(checked) => updateShopItem(idx, 'daily', checked)}
                          disabled={item.stock === undefined}
                        />
                        <span className="text-xs text-muted-foreground">
                          {item.stock === undefined ? 'Set stock first' : 'Reset each day'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input
                      value={item.description || ''}
                      onChange={(e) => updateShopItem(idx, 'description', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Icon</Label>
                    <IconSelector
                      value={item.icon || { type: 'item', id: '' }}
                      onChange={(v) => updateShopItem(idx, 'icon', v)}
                    />
                  </div>

                  {/* Costs */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold">Costs</Label>
                      <Button variant="outline" size="sm" onClick={() => addCost(idx)}>
                        <Plus className="mr-1 h-3 w-3" /> Add Cost
                      </Button>
                    </div>
                    {(item.cost || []).map((cost, cIdx) => (
                      <div
                        key={cIdx}
                        className="flex items-end gap-2 p-3 rounded-md border bg-muted/30"
                      >
                        <div className="space-y-1 flex-1">
                          <Label className="text-xs">Type</Label>
                          <Select
                            value={cost.type}
                            onValueChange={(v) => updateCost(idx, cIdx, 'type', v)}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="currency">Currency</SelectItem>
                              <SelectItem value="item">Item</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1 flex-[2]">
                          <Label className="text-xs">
                            {cost.type === 'currency' ? 'Currency' : 'Item'}
                          </Label>
                          <DataSelector
                            value={cost.id || ''}
                            onSelect={(v) => updateCost(idx, cIdx, 'id', v)}
                            fetcher={cost.type === 'currency' ? getCurrencyList : getItemList}
                            placeholder={`Select ${cost.type}...`}
                          />
                        </div>
                        <div className="space-y-1 w-24">
                          <Label className="text-xs">Amount</Label>
                          <Input
                            type="number"
                            className="h-8"
                            value={cost.amount ?? 0}
                            onChange={(e) =>
                              updateCost(idx, cIdx, 'amount', parseInt(e.target.value) || 0)
                            }
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-destructive"
                          onClick={() => removeCost(idx, cIdx)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Rewards */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold">Rewards</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const items2 = [...(data.items || [])]
                          items2[idx] = {
                            ...items2[idx],
                            rewards: [
                              ...(items2[idx].rewards || []),
                              { type: 'item', quantity: 1, dropChance: 100 },
                            ],
                          }
                          handleChange('items', items2)
                        }}
                      >
                        <Plus className="mr-1 h-3 w-3" /> Add Reward
                      </Button>
                    </div>
                    {(item.rewards || []).map((reward, rIdx) => (
                      <RewardForm
                        key={rIdx}
                        reward={reward}
                        onChange={(r) => {
                          const items2 = [...(data.items || [])]
                          const rewards = [...(items2[idx].rewards || [])]
                          rewards[rIdx] = r
                          items2[idx] = { ...items2[idx], rewards }
                          handleChange('items', items2)
                        }}
                        onRemove={() => {
                          const items2 = [...(data.items || [])]
                          const rewards = [...(items2[idx].rewards || [])]
                          rewards.splice(rIdx, 1)
                          items2[idx] = { ...items2[idx], rewards }
                          handleChange('items', items2)
                        }}
                      />
                    ))}
                  </div>

                  {/* Item Requirements */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold">Item Requirements</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const items2 = [...(data.items || [])]
                          items2[idx] = {
                            ...items2[idx],
                            requirements: [
                              ...(items2[idx].requirements || []),
                              { type: 'user_level', count: 1 },
                            ],
                          }
                          handleChange('items', items2)
                        }}
                      >
                        <Plus className="mr-1 h-3 w-3" /> Add
                      </Button>
                    </div>
                    {(item.requirements || []).map((req, rIdx) => (
                      <div key={rIdx} className="relative">
                        <TaskConditionForm
                          condition={req}
                          onChange={(c) => {
                            const items2 = [...(data.items || [])]
                            const reqs = [...(items2[idx].requirements || [])]
                            reqs[rIdx] = c
                            items2[idx] = { ...items2[idx], requirements: reqs }
                            handleChange('items', items2)
                          }}
                          onRemove={() => {
                            const items2 = [...(data.items || [])]
                            const reqs = [...(items2[idx].requirements || [])]
                            reqs.splice(rIdx, 1)
                            items2[idx] = { ...items2[idx], requirements: reqs }
                            handleChange('items', items2)
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
          {(!data.items || data.items.length === 0) && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No items yet. Click &quot;Add Item&quot; to start building the shop inventory.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Shop Access Requirements */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Shop Access Requirements</CardTitle>
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
    </div>
  )
}
