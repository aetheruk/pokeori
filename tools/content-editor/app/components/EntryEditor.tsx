'use client'

import * as React from 'react'
import { listEntries, readEntry, saveEntry } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'sonner'
import { Loader2, Plus, Save, FileText, Trash2, Copy } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { BattleForm } from './forms/BattleForm'
import { LocationForm } from './forms/LocationForm'
import { TaskForm } from './forms/TaskForm'
import { ShopForm } from './forms/ShopForm'
import { VoyageForm } from './forms/VoyageForm'

type EntryType = 'battles' | 'locations' | 'tasks' | 'shops' | 'voyages'

interface EntryEditorProps {
  type: EntryType
  title: string
}

export function EntryEditor({ type, title }: EntryEditorProps) {
  const [files, setFiles] = React.useState<string[]>([])
  const [selectedFile, setSelectedFile] = React.useState<string | null>(null)

  // JSON content (Raw mode)
  const [content, setContent] = React.useState<string>('')

  // Parsed Data (Form mode)
  const [parsedData, setParsedData] = React.useState<any[] | null>(null)

  // Selected Item Index (for single view)
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0)

  const [loading, setLoading] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [newFileName, setNewFileName] = React.useState('')
  const [isCreating, setIsCreating] = React.useState(false)
  const [mode, setMode] = React.useState<'form' | 'json'>('form')

  const filteredFiles = files.filter(
    (f) => f && typeof f === 'string' && f.toLowerCase().includes(search.toLowerCase()),
  )

  const fetchFiles = React.useCallback(async () => {
    setLoading(true)
    const list = await listEntries(type)
    setFiles(list)
    setLoading(false)
  }, [type])

  React.useEffect(() => {
    fetchFiles()
  }, [fetchFiles])

  const handleSelectFile = async (filename: string) => {
    setSelectedFile(filename)
    setLoading(true)
    const data = await readEntry(type, filename)
    if (data) {
      setContent(JSON.stringify(data, null, 2))
      setParsedData(data)
      setSelectedIndex(0)
    } else {
      toast.error('Failed to read file')
    }
    setLoading(false)
  }

  const handleSave = async () => {
    if (!selectedFile) return
    setSaving(true)
    try {
      const parsed = JSON.parse(content)
      const result = await saveEntry(type, selectedFile, parsed)
      if (result.success) {
        toast.success('Saved successfully')
      } else {
        toast.error(`Failed to save: ${result.error}`)
      }
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`)
    }
    setSaving(false)
  }

  // Update parsed data from form and sync to JSON string
  const handleFormChange = (newData: any) => {
    if (!parsedData) return
    const newArray = [...parsedData]
    newArray[selectedIndex] = newData
    setParsedData(newArray)
    setContent(JSON.stringify(newArray, null, 2))
  }

  // Add new item to the array
  const handleAddItem = () => {
    if (!parsedData) return
    const newItem = { id: `new-${type}-${parsedData.length + 1}`, name: 'New Entry' }
    const newArray = [...parsedData, newItem]
    setParsedData(newArray)
    setContent(JSON.stringify(newArray, null, 2))
    setSelectedIndex(newArray.length - 1) // Switch to new item
    toast.success('New item added')
  }

  const handleRemoveItem = () => {
    if (!parsedData) return
    const newArray = [...parsedData]
    newArray.splice(selectedIndex, 1)
    setParsedData(newArray)
    setContent(JSON.stringify(newArray, null, 2))
    setSelectedIndex(Math.max(0, selectedIndex - 1))
    toast.success('Item removed')
  }

  const handleDuplicateItem = () => {
    if (!parsedData) return
    const currentItem = parsedData[selectedIndex]
    const newItem = { ...currentItem, id: `${currentItem.id}-copy` }
    const newArray = [...parsedData, newItem]
    setParsedData(newArray)
    setContent(JSON.stringify(newArray, null, 2))
    setSelectedIndex(newArray.length - 1)
    toast.success('Item duplicated')
  }

  const handleCreate = async () => {
    if (!newFileName) return
    let filename = newFileName
    if (!filename.endsWith('.ts')) filename += '.ts'

    // Check if exists
    if (files.includes(filename)) {
      toast.error('File already exists')
      return
    }

    // Create empty array
    const result = await saveEntry(type, filename, [])
    if (result.success) {
      toast.success(`Created ${filename}`)
      await fetchFiles()
      setSelectedFile(filename)
      setContent('[]')
      setParsedData([])
      setSelectedIndex(0)
      setIsCreating(false)
      setNewFileName('')
    } else {
      toast.error(`Failed to create: ${result.error}`)
    }
  }

  const selectedItem = parsedData?.[selectedIndex]

  return (
    <div className="flex flex-1 min-h-[600px] gap-4">
      {/* Sidebar - File Selection */}
      <div className="w-64 flex flex-col border rounded-lg bg-card text-card-foreground">
        <div className="p-4 border-b">
          <h2 className="font-semibold mb-2">{title}</h2>
          <div className="flex gap-2">
            <Input
              placeholder="Search files..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8"
            />
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsCreating(true)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {isCreating && (
            <div className="mt-2 flex gap-2">
              <Input
                placeholder="filename"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                className="h-8 text-xs"
              />
              <Button size="sm" className="h-8" onClick={handleCreate}>
                OK
              </Button>
            </div>
          )}
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 gap-1 flex flex-col">
            {filteredFiles.map((file) => (
              <Button
                key={file}
                variant={selectedFile === file ? 'secondary' : 'ghost'}
                className="justify-start truncate h-9 text-sm"
                onClick={() => handleSelectFile(file)}
              >
                <FileText className="mr-2 h-4 w-4 opacity-50" />
                {file.replace('.ts', '')}
              </Button>
            ))}
            {filteredFiles.length === 0 && (
              <div className="text-sm text-muted-foreground p-4 text-center">No files found</div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col border rounded-lg bg-card text-card-foreground overflow-hidden">
        {selectedFile ? (
          <>
            <div className="p-4 border-b bg-muted/20 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-xs text-muted-foreground uppercase tracking-wider">
                    Editing File
                  </h3>
                  <h2 className="text-lg font-bold">{selectedFile}</h2>
                </div>
                <div className="flex gap-2 items-center">
                  <Tabs
                    value={mode}
                    onValueChange={(v) => setMode(v as 'form' | 'json')}
                    className="mr-2"
                  >
                    <TabsList>
                      <TabsTrigger value="form">Form View</TabsTrigger>
                      <TabsTrigger value="json">Raw JSON</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <Button onClick={handleSave} disabled={saving || loading} variant="default">
                    {saving ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Save
                  </Button>
                </div>
              </div>

              {/* Item Selector Toolbar - Only show in Form Mode */}
              {mode === 'form' && parsedData && (
                <div className="flex items-center gap-2 pt-2 border-t mt-2">
                  <div className="flex-1 max-w-sm">
                    <Select
                      value={selectedIndex.toString()}
                      onValueChange={(v) => setSelectedIndex(parseInt(v))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Entry..." />
                      </SelectTrigger>
                      <SelectContent>
                        {parsedData.map((item, idx) => (
                          <SelectItem key={idx} value={idx.toString()}>
                            #{idx + 1}: {item.name || item.id || 'Unnamed'}
                          </SelectItem>
                        ))}
                        {parsedData.length === 0 && (
                          <SelectItem value="0" disabled>
                            No items
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleAddItem}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDuplicateItem}
                    disabled={!selectedItem}
                  >
                    <Copy className="mr-2 h-4 w-4" /> Duplicate
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveItem}
                    disabled={!selectedItem}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Remove
                  </Button>
                  <div className="ml-auto text-xs text-muted-foreground">
                    {parsedData.length} entries total
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col h-full overflow-hidden relative">
              {loading && (
                <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}

              {mode === 'json' ? (
                <div className="flex-1 p-0 min-h-0">
                  <textarea
                    className="w-full h-full resize-none p-4 font-mono text-sm bg-transparent focus:outline-none"
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value)
                      try {
                        setParsedData(JSON.parse(e.target.value))
                        setSelectedIndex(0)
                      } catch (e) {}
                    }}
                    spellCheck={false}
                  />
                </div>
              ) : (
                <ScrollArea className="flex-1 h-full p-4">
                  <div className="max-w-4xl mx-auto pb-12">
                    {selectedItem ? (
                      <>
                        {type === 'battles' && (
                          <BattleForm data={selectedItem} onChange={handleFormChange} />
                        )}
                        {type === 'locations' && (
                          <LocationForm data={selectedItem} onChange={handleFormChange} />
                        )}
                        {type === 'tasks' && (
                          <TaskForm data={selectedItem} onChange={handleFormChange} />
                        )}
                        {type === 'shops' && (
                          <ShopForm data={selectedItem} onChange={handleFormChange} />
                        )}
                        {type === 'voyages' && (
                          <VoyageForm data={selectedItem} onChange={handleFormChange} />
                        )}
                      </>
                    ) : (
                      <div className="text-center p-12 text-muted-foreground border-2 border-dashed rounded-lg">
                        <p>No item selected.</p>
                        <Button onClick={handleAddItem} variant="link">
                          Create your first entry
                        </Button>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a file to edit
          </div>
        )}
      </div>
    </div>
  )
}
