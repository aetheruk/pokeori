'use client'

import * as React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'
import Image from 'next/image'

import { cn } from '@/lib/utils'

const Drawer = ({
  shouldScaleBackground = false,
  // Drawers now behave as full-screen activity frames. Keeping this default
  // false removes Vaul's swipe-down dismissal while callers can still opt in
  // for a genuinely dismissible sheet if one is ever needed.
  dismissible = false,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    dismissible={dismissible}
    {...props}
  />
)
Drawer.displayName = 'Drawer'

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-[#172733]/58 backdrop-blur-[2px]',
      className,
    )}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

type DrawerContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>,
  'title'
> & {
  showHandle?: boolean
  showCloseButton?: boolean
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  background?: string
  heroLabel?: React.ReactNode
  heroBadge?: React.ReactNode
}

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(
  (
    {
      className,
      children,
      showHandle = false,
      showCloseButton = true,
      title,
      description,
      icon,
      background = '/backgrounds/lab.avif',
      heroLabel,
      heroBadge,
      ...props
    },
    ref,
  ) => (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        data-vaul-no-drag
        className={cn(
          'game-paper-modal game-paper-background pointer-events-auto fixed inset-0 z-50 m-0 flex !h-dvh !max-h-none !w-screen !max-w-none flex-col rounded-none border-0 border-game-border bg-game-canvas text-game-ink shadow-2xl shadow-stone-900/15',
          className,
        )}
        {...props}
      >
        {showHandle && (
          <div className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-game-border-strong" />
        )}
        {showCloseButton && (
          <DrawerPrimitive.Close
            aria-label="Close"
            title="Close"
            className="game-focus-ring absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-[60] flex size-11 items-center justify-center rounded-full border border-white/55 bg-game-night-canvas/55 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-game-night-canvas/75 focus-visible:ring-white/80"
          >
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6 6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="sr-only">Close</span>
          </DrawerPrimitive.Close>
        )}
        {title && (
          <section className="relative flex min-h-[38dvh] w-full shrink-0 flex-col items-center justify-center overflow-hidden px-5 pb-8 pt-[max(3.5rem,env(safe-area-inset-top))] text-center text-white md:min-h-[42dvh] md:px-6">
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
            <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-3">
              <div className="relative">
                <div className="game-icon-orb relative z-10 flex h-24 w-24 items-center justify-center border-white/55 !bg-white/10 text-white shadow-xl md:h-28 md:w-28">
                  {icon}
                </div>
                {heroBadge && (
                  <div className="absolute -bottom-2 -right-2 z-20">
                    {heroBadge}
                  </div>
                )}
              </div>
              <DrawerPrimitive.Title className="max-w-3xl text-3xl font-semibold leading-tight !text-white md:text-4xl">
                {title}
              </DrawerPrimitive.Title>
              {description && (
                <DrawerPrimitive.Description className="max-w-2xl text-sm font-medium leading-relaxed !text-white/90 md:text-base">
                  {description}
                </DrawerPrimitive.Description>
              )}
            </div>
          </section>
        )}
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  ),
)
DrawerContent.displayName = 'DrawerContent'

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)}
    {...props}
  />
)
DrawerHeader.displayName = 'DrawerHeader'

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('mt-auto flex flex-col gap-2 p-4', className)}
    {...props}
  />
)
DrawerFooter.displayName = 'DrawerFooter'

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      'font-display text-lg font-semibold leading-tight text-game-ink',
      className,
    )}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn('text-sm leading-relaxed text-game-muted', className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
}
