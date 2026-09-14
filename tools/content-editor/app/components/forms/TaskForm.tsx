'use client'

import * as React from 'react'
import { Task, Reward } from '@/data/types'
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
import { DataSelector } from '../selectors/DataSelector'
import { getItemList, getTaskList } from '../../actions'
import { TaskConditionForm } from './TaskConditionForm'
import { RewardForm } from './RewardForm'
import { Plus, Trash2 } from 'lucide-react'

interface TaskFormProps {
  data: Partial<Task>
  onChange: (data: Partial<Task>) => void
}

export function TaskForm({ data, onChange }: TaskFormProps) {
  const handleChange = (field: keyof Task, value: any) => {
    onChange({ ...data, [field]: value })
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
      <Card>
        <CardHeader>
          <CardTitle>Task Info</CardTitle>
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Hide Condition (Task ID)</Label>
              <DataSelector
                value={data.hide || ''}
                onSelect={(v) => handleChange('hide', v)}
                fetcher={getTaskList}
                placeholder="Select task to hide after..."
              />
            </div>
            <div className="space-y-2">
              <Label>Complete Btn Text</Label>
              <Input
                value={data.completeButtonText || ''}
                onChange={(e) => handleChange('completeButtonText', e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6 pt-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="repeatable"
                checked={data.repeatable}
                onCheckedChange={(c) => handleChange('repeatable', c)}
              />
              <Label htmlFor="repeatable">Repeatable</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="secret"
                checked={data.secret}
                onCheckedChange={(c) => handleChange('secret', c)}
              />
              <Label htmlFor="secret">Secret</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="daily"
                checked={data.daily}
                onCheckedChange={(c) => handleChange('daily', c)}
              />
              <Label htmlFor="daily">Daily Task</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="chat"
                checked={data.chat}
                onCheckedChange={(c) => handleChange('chat', c)}
              />
              <Label htmlFor="chat">Chat (AI)</Label>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Label>Completion Trigger</Label>
            <Select
              value={data.completionTrigger || 'manual'}
              onValueChange={(v) => handleChange('completionTrigger', v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="auto">Auto</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Enter Modal (Multi-step)</CardTitle>
          <Button
            size="sm"
            onClick={() =>
              handleChange('enterModal', [
                ...(data.enterModal || []),
                { id: (data.enterModal?.length || 0) + 1, title: 'Step', message: '', buttons: [] },
              ])
            }
          >
            <Plus className="mr-2 h-4 w-4" /> Add Step
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.enterModal?.map((step, index) => (
            <Card key={index} className="p-4 relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-destructive"
                onClick={() => {
                  const newSteps = [...(data.enterModal || [])]
                  newSteps.splice(index, 1)
                  handleChange('enterModal', newSteps)
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Step ID: {step.id}</Label>
                    <Input
                      value={step.title}
                      onChange={(e) => {
                        const newSteps = [...(data.enterModal || [])]
                        newSteps[index] = { ...step, title: e.target.value }
                        handleChange('enterModal', newSteps)
                      }}
                      placeholder="Step Title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Background</Label>
                    <Input
                      value={step.background || ''}
                      onChange={(e) => {
                        const newSteps = [...(data.enterModal || [])]
                        newSteps[index] = { ...step, background: e.target.value }
                        handleChange('enterModal', newSteps)
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Icon</Label>
                    <IconSelector
                      value={step.icon}
                      onChange={(v) => {
                        const newSteps = [...(data.enterModal || [])]
                        newSteps[index] = { ...step, icon: v }
                        handleChange('enterModal', newSteps)
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea
                    value={step.message}
                    onChange={(e) => {
                      const newSteps = [...(data.enterModal || [])]
                      newSteps[index] = { ...step, message: e.target.value }
                      handleChange('enterModal', newSteps)
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Buttons</Label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const newSteps = [...(data.enterModal || [])]
                        newSteps[index] = {
                          ...step,
                          buttons: [...step.buttons, { text: 'Next', type: 'navigate' }],
                        }
                        handleChange('enterModal', newSteps)
                      }}
                    >
                      Add Button
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {step.buttons.map((btn, btnIndex) => (
                      <div key={btnIndex} className="flex gap-2 items-center border p-2 rounded">
                        <Input
                          className="flex-1"
                          value={btn.text}
                          onChange={(e) => {
                            const newSteps = [...(data.enterModal || [])]
                            newSteps[index].buttons[btnIndex].text = e.target.value
                            handleChange('enterModal', newSteps)
                          }}
                          placeholder="Btn Text"
                        />
                        <Select
                          value={btn.type}
                          onValueChange={(v) => {
                            const newSteps = [...(data.enterModal || [])]
                            newSteps[index].buttons[btnIndex].type = v as any
                            handleChange('enterModal', newSteps)
                          }}
                        >
                          <SelectTrigger className="w-[100px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="navigate">Nav</SelectItem>
                            <SelectItem value="success">Success</SelectItem>
                            <SelectItem value="password">Pass</SelectItem>
                            <SelectItem value="fail">Fail</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          className="w-[60px]"
                          type="number"
                          value={btn.id || ''}
                          onChange={(e) => {
                            const newSteps = [...(data.enterModal || [])]
                            newSteps[index].buttons[btnIndex].id = parseInt(e.target.value)
                            handleChange('enterModal', newSteps)
                          }}
                          placeholder="ID"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive h-8 w-8"
                          onClick={() => {
                            const newSteps = [...(data.enterModal || [])]
                            newSteps[index].buttons.splice(btnIndex, 1)
                            handleChange('enterModal', newSteps)
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Exit Modal (Optional)</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={data.exitModal?.title || ''}
                onChange={(e) =>
                  handleChange('exitModal', { ...data.exitModal, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Background</Label>
              <Input
                value={data.exitModal?.background || ''}
                onChange={(e) =>
                  handleChange('exitModal', { ...data.exitModal, background: e.target.value })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Message</Label>
            <Textarea
              value={data.exitModal?.message || ''}
              onChange={(e) =>
                handleChange('exitModal', { ...data.exitModal, message: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Close Button Text</Label>
              <Input
                value={data.exitModal?.closeButtonText || ''}
                onChange={(e) =>
                  handleChange('exitModal', { ...data.exitModal, closeButtonText: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Icon</Label>
              <IconSelector
                value={data.exitModal?.icon}
                onChange={(v) => handleChange('exitModal', { ...data.exitModal, icon: v })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Requirements (To Unlock)</CardTitle>
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
