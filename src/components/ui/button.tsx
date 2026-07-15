import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const appButtonBase =
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-colors duration-150 disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 outline-none focus-visible:ring-2 focus-visible:ring-game-moss/60 focus-visible:ring-offset-2 focus-visible:ring-offset-game-canvas aria-invalid:border-destructive aria-invalid:ring-destructive/30"

const buttonVariants = cva(appButtonBase, {
  variants: {
    variant: {
      default:
        'game-accent-button bg-game-clay text-game-cream hover:bg-game-clay-strong active:bg-game-clay-strong',
      destructive:
        'game-accent-button bg-game-danger text-game-cream hover:bg-[#81392f] active:bg-[#713129]',
      outline:
        'border border-game-border-strong bg-game-surface/80 text-game-ink hover:border-game-moss/60 hover:bg-game-surface-raised',
      secondary:
        'border border-game-moss/30 bg-game-moss/10 text-game-moss-strong hover:bg-game-moss/15 hover:text-game-moss-strong',
      ghost:
        'bg-transparent text-game-ink shadow-none hover:bg-game-surface hover:text-game-moss-strong',
      link: 'h-auto rounded-none px-0 py-0 text-game-moss underline-offset-4 hover:text-game-moss-strong hover:underline',
    },
    size: {
      default: 'h-11 px-4 py-2 has-[>svg]:px-3.5',
      sm: 'h-10 gap-1.5 px-3 text-xs has-[>svg]:px-2.5',
      lg: 'h-12 px-5 text-base has-[>svg]:px-4',
      icon: 'size-10',
      'icon-sm': 'size-10',
      'icon-lg': 'size-12',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

const AppButton = Button

export { AppButton, Button, buttonVariants }
