'use client'

import { Check, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { RewardSummaryDisplay } from '@/components/game/reward-summary'
import { StickyFooter } from '@/components/game/shared/StickyFooter'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { Button } from '@/components/ui/button'
import type { TaskIcon } from '@/data/tasks/types'
import { getTrainerSpriteUrl } from '@/data/trainers'
import { cn } from '@/lib/utils'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import type { RewardSummary } from '@/utilities/rewards/reward-logic'
import { ItemSprite } from '../ui/item-sprite'
import { SectionDivider } from '../ui/section-divider'

type ResultActionButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  'size' | 'variant'
>

export function ResultActionButton({
  className,
  type = 'button',
  asChild = false,
  children,
  ...props
}: ResultActionButtonProps) {
  const sharedProps = {
    ...props,
    type,
    variant: 'default' as const,
    size: 'default' as const,
    className: cn(
      'w-full min-w-0 border border-game-clay bg-game-clay text-game-cream hover:bg-game-clay/90',
      className,
    ),
  }

  if (asChild) {
    return React.cloneElement(
      React.Children.only(children) as React.ReactElement,
      sharedProps,
    )
  }

  return <Button {...sharedProps}>{children}</Button>
}

function isTaskIcon(icon: any): icon is TaskIcon {
  return (
    icon &&
    typeof icon === 'object' &&
    'type' in icon &&
    'id' in icon &&
    !('$$typeof' in icon)
  )
}

function getIconUrl(icon: TaskIcon | string): string | undefined {
  if (typeof icon === 'string') {
    // Legacy support for string icons
    return icon.startsWith('/') ? icon : `/${icon}`
  }

  switch (icon.type) {
    case 'pokemon':
      return getPokemonImageUrl(icon.id, 'sprite')
    case 'item':
      // Item icons are now handled separately in the component
      return undefined
    case 'trainer':
      return getTrainerSpriteUrl(icon.id)
    case 'local':
      return icon.id.startsWith('/') ? icon.id : `/${icon.id}`
    default:
      return undefined
  }
}

interface GameResultProps {
  success: boolean
  /** Scenic artwork for the result hero. Falls back to the Lab when absent. */
  background?: string
  title?: string
  message?: React.ReactNode
  rewardSummary?: RewardSummary | null
  /** optional icon to render inside the result circle — can be a URL string or a React node or TaskIcon */
  icon?: string | React.ReactNode | TaskIcon
  iconAlt?: string
  /** section title above the main title */
  sectionTitle?: string
  /** custom title color class */
  titleColor?: string
  /** navigation path for the return button */
  returnPath?: string
  /** text for the return button */
  returnText?: string
  /** optional secondary action button (e.g. Play Again) */
  secondaryAction?: React.ReactNode
  /** additional content to render before rewards */
  additionalContent?: React.ReactNode
  /** callback for return button instead of navigation */
  onReturn?: () => void
  /** Render inside an existing dialog without creating a second activity frame. */
  embedded?: boolean
}

export function GameResult({
  success,
  background,
  title,
  message,
  rewardSummary,
  icon,
  iconAlt = '',
  titleColor,
  returnPath = '/game',
  returnText = 'Continue',
  secondaryAction,
  additionalContent,
  onReturn,
  embedded = false,
}: GameResultProps) {
  const router = useRouter()
  const resultBackground = background || '/backgrounds/lab.avif'

  const handleReturn = () => {
    if (onReturn) {
      onReturn()
    } else {
      router.push(returnPath)
    }
  }

  return (
    <div
      className={cn(
        'game-paper-first game-paper-background relative h-full w-full overflow-hidden pt-[env(safe-area-inset-top)] text-game-ink',
        !embedded && 'bg-game-canvas',
      )}
    >
      <main className="h-full w-full flex flex-col relative z-10">
        <section className="relative flex min-h-[42dvh] w-full shrink-0 flex-col items-center justify-center overflow-hidden px-4 pb-8 pt-10 text-center text-white md:min-h-[46dvh] md:px-6">
            <Image
              src={resultBackground}
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

            <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">
              <div className="relative mb-3">
                <div
                  className={cn(
                    'game-icon-orb relative z-10 h-24 w-24 border-white/55 !bg-white/10 text-white shadow-xl md:h-28 md:w-28',
                    !success && 'border-game-danger/70',
                  )}
                >
                  {/* If an icon is provided (string URL or ReactNode) render it inside, otherwise fall back to check/x */}
                  {(() => {
                    // TaskIcon Object -> Use TaskIconDisplay
                    if (isTaskIcon(icon)) {
                      return (
                        <TaskIconDisplay
                          icon={icon}
                          className="h-20 w-20 md:h-24 md:w-24"
                        />
                      )
                    }

                    // Legacy String URL -> Image
                    if (typeof icon === 'string') {
                      return (
                        <div className="relative w-24 h-24 md:w-32 md:h-32">
                          <Image
                            src={icon.startsWith('/') ? icon : `/${icon}`}
                            alt={iconAlt}
                            fill
                            className="object-contain pixelated"
                          />
                        </div>
                      )
                    }

                    // React Node or Check/X Fallback
                    return icon ? (
                      <div className="w-full h-full flex items-center justify-center drop-shadow-md">
                        {icon}
                      </div>
                    ) : success ? (
                      <Check className="h-16 w-16 text-white md:h-20 md:w-20" />
                    ) : (
                      <X className="h-16 w-16 text-white md:h-20 md:w-20" />
                    )
                  })()}
                </div>
              </div>

              {/* Title Section */}
              <div
                className="relative z-10 flex w-full flex-col items-center"
                role="status"
                aria-live="polite"
              >
                <h1
                  className={cn(
                    'mb-1 text-3xl font-semibold leading-tight !text-white md:text-4xl',
                    titleColor,
                  )}
                >
                  {title ?? (success ? 'SUCCESS' : 'FAILED')}
                </h1>

                {message && (
                  <p className="max-w-2xl text-sm font-medium leading-relaxed text-white/90 md:text-base">
                    {message}
                  </p>
                )}
              </div>
            </div>
        </section>

        <div className="min-h-0 w-full flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-game-border scrollbar-track-transparent">
          <div className="mx-auto w-full max-w-3xl px-4 pb-28 pt-4 md:px-6 md:pt-6">
            {additionalContent && (
              <div className="game-folio-section relative z-10 w-full p-4">
                {additionalContent}
              </div>
            )}

            {rewardSummary && (
              <div className="relative z-10 w-full">
                <RewardSummaryDisplay summary={rewardSummary} />
              </div>
            )}
          </div>
        </div>

        {/* sticky return button — center bottom of screen */}
        <StickyFooter>
          <div
            className={cn(
              'flex w-full gap-3',
              secondaryAction ? 'flex-row-reverse' : 'flex-col',
            )}
          >
            {secondaryAction && (
              <div className="min-w-0 flex-1">
                <ResultActionButton asChild>
                  {secondaryAction}
                </ResultActionButton>
              </div>
            )}
            <div
              className={cn('min-w-0', secondaryAction ? 'flex-1' : 'w-full')}
            >
              <ResultActionButton
                onClick={handleReturn}
                className="transition-colors"
              >
                {returnText}
              </ResultActionButton>
            </div>
          </div>
        </StickyFooter>
      </main>
    </div>
  )
}
