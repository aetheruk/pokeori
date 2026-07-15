'use client'

import { Check, Pencil, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@/context/UserContext'
import { cn } from '@/lib/utils'
import type { Pokemon } from '@/payload-types'
import { renamePokemon } from '../actions'

interface RenameDialogProps {
  pokemonId: string
  currentName: string
  canRename?: boolean
  onRename?: (updatedPokemon: Pokemon) => void
}

export function RenameDialog({
  pokemonId,
  currentName,
  canRename = true,
  onRename,
}: RenameDialogProps) {
  const { refreshUser } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(currentName)
  const [isPending, setIsPending] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isEditing) {
      setName(currentName)
      return
    }

    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })

    return () => cancelAnimationFrame(frame)
  }, [currentName, isEditing])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canRename) {
      toast.error('A Deed Poll is required to rename Pokemon')
      return
    }
    setIsPending(true)

    try {
      // Client-side validation
      if (!/^[a-zA-Z]+$/.test(name.trim())) {
        toast.error('Nickname must contain only letters')
        setIsPending(false)
        return
      }

      if (name.trim().length < 1 || name.trim().length > 12) {
        toast.error('Nickname must be between 1 and 12 characters')
        setIsPending(false)
        return
      }

      const updatedPokemon = await renamePokemon(pokemonId, name)
      toast.success('Pokemon renamed successfully')
      setIsEditing(false)
      if (onRename) {
        onRename(updatedPokemon)
      }
      refreshUser()
    } catch (error) {
      toast.error('Failed to rename Pokemon')
      if (process.env.NODE_ENV === 'development') {
        console.error(error)
      }
    } finally {
      setIsPending(false)
    }
  }

  if (!isEditing) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'h-10 w-10 text-game-muted hover:bg-game-moss/10 hover:text-game-moss-strong',
          !canRename && 'cursor-not-allowed opacity-35 hover:text-game-muted',
        )}
        disabled={!canRename}
        title={canRename ? 'Rename' : 'Requires Deed Poll'}
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          if (!canRename) return
          setIsEditing(true)
        }}
      >
        <Pencil className="h-3 w-3" />
        <span className="sr-only">Rename</span>
      </Button>
    )
  }

  return (
    <form
      data-vaul-no-drag
      onSubmit={handleSubmit}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
      className="flex min-w-0 basis-full items-center justify-center gap-2"
    >
      <Input
        ref={inputRef}
        id={`rename-${pokemonId}`}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onFocus={(e) => e.currentTarget.select()}
        className="h-10 w-40 select-text border-game-border bg-game-surface-raised text-center text-sm font-semibold text-game-ink sm:w-48"
        maxLength={12}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        disabled={isPending}
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        disabled={isPending}
        className="h-10 w-10 text-game-moss-strong hover:bg-game-moss/10 hover:text-game-moss-strong"
        title="Save nickname"
      >
        <Check className="h-4 w-4" />
        <span className="sr-only">Save nickname</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={isPending}
        className="h-10 w-10 text-game-muted hover:bg-game-clay/10 hover:text-game-clay"
        title="Cancel rename"
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          setName(currentName)
          setIsEditing(false)
        }}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Cancel rename</span>
      </Button>
    </form>
  )
}
