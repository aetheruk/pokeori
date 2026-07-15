'use client'

import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import { XIcon } from 'lucide-react'

export interface ResponsivePanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
  trigger?: React.ReactElement
  desktopWidth?: string
  mobileMaxHeight?: string
  mobileHeader?: boolean
  showHandle?: boolean
  showHeader?: boolean
  showCloseButton?: boolean
  className?: string
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false)

  React.useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])

  return matches
}

/**
 * A shared inspector primitive: bottom sheet on touch layouts, right-side
 * field-note panel on wide screens. The server-safe mobile default prevents a
 * hydration mismatch and the panel re-homes itself as the viewport changes.
 */
export function ResponsivePanel({
  open,
  onOpenChange,
  title,
  description,
  children,
  trigger,
  desktopWidth = 'min(38vw, 560px)',
  mobileMaxHeight = '92dvh',
  mobileHeader = true,
  showHandle = true,
  showHeader = true,
  showCloseButton = true,
  className,
}: ResponsivePanelProps) {
  // Keep the inspector in its touch-friendly sheet mode through small desktop
  // widths; the wide right rail starts at the same xl breakpoint as the game
  // shell's expanded navigation.
  const isDesktop = useMediaQuery('(min-width: 1280px)')
  const header =
    title || description ? (
      <>
        {title && <DialogTitle>{title}</DialogTitle>}
        {description && <DialogDescription>{description}</DialogDescription>}
      </>
    ) : null
  const triggerElement = trigger
    ? React.cloneElement(
        trigger as React.ReactElement<{
          onClick?: (event: React.MouseEvent) => void
        }>,
        {
          onClick: (event: React.MouseEvent) => {
            const triggerProps = trigger.props as {
              onClick?: (event: React.MouseEvent) => void
            }
            triggerProps.onClick?.(event)
            if (!event.defaultPrevented) onOpenChange(true)
          },
        },
      )
    : null

  if (isDesktop) {
    return (
      <>
        {triggerElement}
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent
            className={cn(
              '!left-auto !right-0 !top-0 h-dvh !max-h-none !w-[var(--responsive-panel-width)] !max-w-none !translate-x-0 !translate-y-0 rounded-l-xl rounded-r-none border-y-0 border-r-0 p-0 sm:p-0',
              'data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
              className,
            )}
            style={
              {
                '--responsive-panel-width': desktopWidth,
              } as React.CSSProperties
            }
            showCloseButton={showCloseButton}
          >
            {header && showHeader ? (
              <DialogHeader className="border-b border-game-border p-5">
                {header}
              </DialogHeader>
            ) : (
              header && (
                <div className="sr-only">
                  {title && <DialogTitle>{title}</DialogTitle>}
                  {description && (
                    <DialogDescription>{description}</DialogDescription>
                  )}
                </div>
              )
            )}
            {children}
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <>
      {triggerElement}
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent
          showHandle={showHandle}
          className={cn('relative', className)}
          style={{ maxHeight: mobileMaxHeight }}
        >
          {showCloseButton && (
            <button
              type="button"
              aria-label="Close"
              onPointerDown={(event) => {
                event.stopPropagation()
                onOpenChange(false)
              }}
              onClick={() => onOpenChange(false)}
              className="absolute right-3 top-3 z-30 flex size-10 items-center justify-center rounded-md border border-transparent text-game-muted transition-colors hover:border-game-border hover:bg-game-surface hover:text-game-moss-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-game-moss/50"
            >
              <XIcon className="size-4" aria-hidden="true" />
              <span className="sr-only">Close</span>
            </button>
          )}
          {header && showHeader && (
            <DrawerHeader
              className={cn(
                'border-b border-game-border text-left',
                !mobileHeader && 'sr-only',
              )}
            >
              {title && <DrawerTitle>{title}</DrawerTitle>}
              {description && (
                <DrawerDescription>{description}</DrawerDescription>
              )}
            </DrawerHeader>
          )}
          {header && !showHeader && (
            <div className="sr-only">
              {title && <DrawerTitle>{title}</DrawerTitle>}
              {description && (
                <DrawerDescription>{description}</DrawerDescription>
              )}
            </div>
          )}
          {children}
        </DrawerContent>
      </Drawer>
    </>
  )
}
