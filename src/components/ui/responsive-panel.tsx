'use client'

import { Info, XIcon } from 'lucide-react'
import Image from 'next/image'
import * as React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

export interface ResponsivePanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
  trigger?: React.ReactElement
  /** Retained for call-site compatibility. Panels now use the full activity frame at every viewport. */
  desktopWidth?: string
  /** Retained for call-site compatibility. */
  desktopBreakpoint?: 'lg' | 'xl'
  /** Retained for call-site compatibility. */
  mobileMaxHeight?: string
  /** Retained for call-site compatibility. */
  mobileHeader?: boolean
  /** Retained for call-site compatibility. Full-screen panels never expose a drag handle. */
  showHandle?: boolean
  /** Retained for call-site compatibility. Use showHero to opt out of the scenic title frame. */
  showHeader?: boolean
  showCloseButton?: boolean
  dismissible?: boolean
  headerClassName?: string
  className?: string
  /** Scenic artwork for the full-screen title frame. */
  background?: string
  /** Icon rendered in the large result-style orb. */
  icon?: React.ReactNode
  /** Additional classes for the result-style orb. */
  iconClassName?: string
  /** Small label shown in the upper-left of the title frame. */
  heroLabel?: React.ReactNode
  /** Optional badge attached to the title icon. */
  heroBadge?: React.ReactNode
  /** Optional action anchored to the lower-left corner of the title frame. */
  heroLeftAction?: React.ReactNode
  /** Optional action anchored to the lower-right corner of the title frame. */
  heroAction?: React.ReactNode
  /** Additional classes for the title frame. */
  heroClassName?: string
  /** Opt out only when a caller supplies its own full-screen header. */
  showHero?: boolean
}

/**
 * Shared activity frame for field notes, selectors, details, and result-style
 * overlays. Every panel is full screen so touch and desktop layouts share one
 * visual language and there is no bottom-sheet drag gesture to discover.
 */
export function ResponsivePanel({
  open,
  onOpenChange,
  title,
  description,
  children,
  trigger,
  showHeader = true,
  showCloseButton = true,
  dismissible = true,
  headerClassName,
  className,
  background = '/backgrounds/lab.avif',
  icon,
  iconClassName,
  heroLabel,
  heroBadge,
  heroLeftAction,
  heroAction,
  heroClassName,
  showHero = true,
}: ResponsivePanelProps) {
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

  const accessibleTitle = title || 'Details'
  const closeButton = showCloseButton ? (
    <DialogClose
      aria-label="Close"
      title="Close"
      className={cn(
        'game-focus-ring absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-50 flex size-11 items-center justify-center rounded-full border border-white/55 bg-game-night-canvas/55 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-game-night-canvas/75 focus-visible:ring-white/80',
        !showHero &&
          'border-game-border/60 bg-game-night-surface/80 text-white hover:bg-game-night-surface',
      )}
    >
      <XIcon className="size-5" aria-hidden="true" />
      <span className="sr-only">Close</span>
    </DialogClose>
  ) : null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {triggerElement && (
        <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      )}
      <DialogContent
        onInteractOutside={(event) => {
          if (!dismissible) event.preventDefault()
        }}
        onEscapeKeyDown={(event) => {
          if (!dismissible) event.preventDefault()
        }}
        className={cn(
          '!inset-0 !h-[100dvh] !max-h-none !w-screen !max-w-none !translate-x-0 !translate-y-0 m-0 flex flex-col gap-0 overflow-hidden rounded-none border-0 bg-game-canvas p-0 text-game-ink sm:p-0',
          className,
        )}
        showCloseButton={false}
      >
        {showHero ? (
          <DialogHeader
            className={cn(
              'relative shrink-0 space-y-0 overflow-hidden p-0 text-center',
              headerClassName,
            )}
          >
            <section
              className={cn(
                'relative flex min-h-[38dvh] w-full shrink-0 flex-col items-center justify-center overflow-hidden px-5 pb-8 pt-[max(3.5rem,env(safe-area-inset-top))] text-center text-white md:min-h-[42dvh] md:px-6',
                heroClassName,
              )}
            >
              <Image
                src={background}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(23,39,51,0.08),rgba(23,39,51,0.24)_42%,rgba(23,39,51,0.92)_100%)]"
                aria-hidden="true"
              />

              {heroLabel && (
                <div className="absolute left-5 top-[max(1rem,env(safe-area-inset-top))] z-20 max-w-[65%] text-left md:left-7">
                  <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/35 bg-game-night-canvas/45 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white backdrop-blur-md">
                    {heroLabel}
                  </span>
                </div>
              )}

              {closeButton}

              <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-3">
                <div className="relative">
                  <div
                    className={cn(
                      'game-icon-orb relative z-10 flex h-24 w-24 items-center justify-center border-white/55 !bg-white/10 text-white shadow-xl md:h-28 md:w-28',
                      iconClassName,
                    )}
                  >
                    <div className="game-hero-icon-content">
                      {icon || <Info className="h-14 w-14" aria-hidden="true" />}
                    </div>
                  </div>
                  {heroBadge && (
                    <div className="absolute -bottom-2 -right-2 z-20">
                      {heroBadge}
                    </div>
                  )}
                </div>
                <DialogTitle className="max-w-3xl text-3xl font-semibold leading-tight !text-white md:text-4xl">
                  {accessibleTitle}
                </DialogTitle>
                {description && (
                  <DialogDescription className="max-w-2xl text-sm font-medium leading-relaxed !text-white/90 md:text-base">
                    {description}
                  </DialogDescription>
                )}
              </div>

              {heroAction && (
                <div className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] right-5 z-20 md:right-7">
                  {heroAction}
                </div>
              )}

              {heroLeftAction && (
                <div className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-5 z-20 md:left-7">
                  {heroLeftAction}
                </div>
              )}
            </section>
          </DialogHeader>
        ) : (
          <>
            {closeButton}
            <div className="sr-only">
              {showHeader && <DialogTitle>{accessibleTitle}</DialogTitle>}
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </div>
          </>
        )}

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">{children}</div>
      </DialogContent>
    </Dialog>
  )
}
