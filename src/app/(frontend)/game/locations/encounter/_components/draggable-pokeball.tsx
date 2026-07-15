'use client'

import React, { useRef, useState } from 'react'
import { DndContext, useDraggable, DragEndEvent, DragStartEvent, TouchSensor, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import type { CaptureThrowInput, CaptureThrowPoint } from '@/utilities/pokemon/catch-balance'

export interface CaptureThrowVisual {
  from: CaptureThrowPoint
  target: CaptureThrowPoint
}

export interface CaptureThrowPayload extends CaptureThrowInput {
  visual: CaptureThrowVisual
}

interface DraggablePokeballProps {
  onThrow: (input: CaptureThrowPayload) => void
  ringScale?: number
  targetRef: React.RefObject<HTMLElement | null>
  disabled?: boolean
  children: React.ReactNode
}

function DraggableBallInner({
  children,
  disabled,
  nodeRef,
}: {
  children: React.ReactNode
  disabled?: boolean
  nodeRef: React.MutableRefObject<HTMLDivElement | null>
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: 'pokeball-drag',
    disabled,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    touchAction: 'none',
    zIndex: isDragging ? 50 : 'auto',
  }

  return (
    <div
      ref={(node) => {
        nodeRef.current = node
        setNodeRef(node)
      }}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-grab active:cursor-grabbing w-full h-full"
    >
        {children}
    </div>
  )
}

export function DraggablePokeball({ onThrow, ringScale = 1, targetRef, disabled, children }: DraggablePokeballProps) {
    const [isDragging, setIsDragging] = useState(false)
    const ballNodeRef = useRef<HTMLDivElement | null>(null)
    const dragStartCenterRef = useRef<CaptureThrowPoint | null>(null)

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 0,
                tolerance: 5,
            },
        })
    )

    const handleDragStart = (_event: DragStartEvent) => {
        setIsDragging(true)
        const rect = ballNodeRef.current?.getBoundingClientRect()
        dragStartCenterRef.current = rect
          ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
          : null
    }

    const handleDragEnd = (event: DragEndEvent) => {
        setIsDragging(false)
        const { delta } = event
        
        // Critical throw threshold (upwards is negative Y)
        const THROW_THRESHOLD = -100

        if (delta.y < THROW_THRESHOLD) {
            const targetRect = targetRef.current?.getBoundingClientRect()
            const startCenter = dragStartCenterRef.current
            const releaseCenter = startCenter
              ? { x: startCenter.x + delta.x, y: startCenter.y + delta.y }
              : { x: window.innerWidth / 2 + delta.x, y: window.innerHeight * 0.72 + delta.y }
            const targetCenter = targetRect
              ? {
                  x: targetRect.left + targetRect.width / 2,
                  y: targetRect.top + targetRect.height / 2,
                }
              : { x: window.innerWidth / 2, y: window.innerHeight * 0.24 }

            onThrow({
                ringScale,
                aimOffset: 0,
                visual: {
                  from: releaseCenter,
                  target: targetCenter,
                },
            })
        }
    }

    return (
        <DndContext 
            sensors={sensors}
            onDragStart={handleDragStart} 
            onDragEnd={handleDragEnd} 
        >
            <DraggableBallInner disabled={disabled} nodeRef={ballNodeRef}>
                {children}
            </DraggableBallInner>
        </DndContext>
    )
}
