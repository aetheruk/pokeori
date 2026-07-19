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

  return (
    <Button {...sharedProps}>{children}</Button>
  )
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
  title,
  message,
  rewardSummary,
  icon,
  iconAlt = '',
  sectionTitle = 'Outcome',
  titleColor,
  returnPath = '/game',
  returnText = 'Continue',
  secondaryAction,
  additionalContent,
  onReturn,
  embedded = false,
}: GameResultProps) {
  const router = useRouter()

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
        'game-paper-first game-paper-texture relative h-full w-full overflow-hidden pt-[env(safe-area-inset-top)] text-game-ink',
        !embedded && 'bg-game-canvas',
      )}
    >
      <main className="h-full w-full flex flex-col relative z-10">
        <div className="w-full flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-game-border scrollbar-track-transparent">
          <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col items-center justify-center px-4 py-8 pb-28 md:px-6">
            <div className="relative flex w-full flex-col items-center p-3 text-center md:p-8">
              <div className="relative mb-6">
                <div
                  className={cn(
                    'relative z-10 flex h-24 w-24 items-center justify-center rounded-lg border bg-game-surface md:h-28 md:w-28',
                    success ? 'border-game-moss/50' : 'border-game-danger/45',
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
                      <Check className="h-16 w-16 text-game-moss md:h-20 md:w-20" />
                    ) : (
                      <X className="h-16 w-16 text-game-danger md:h-20 md:w-20" />
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
                <span className="mb-2 text-xs font-medium uppercase tracking-wide text-game-muted">
                  {sectionTitle}
                </span>
                <h1
                  className={cn(
                    'mb-4 text-3xl font-semibold leading-tight md:text-4xl',
                    titleColor
                      ? titleColor
                      : success
                        ? 'text-game-moss-strong'
                        : 'text-game-danger',
                  )}
                >
                  {title ?? (success ? 'SUCCESS' : 'FAILED')}
                </h1>

                {message && (
                  <p className="max-w-2xl text-sm font-medium leading-relaxed text-game-muted md:text-base">
                    {message}
                  </p>
                )}
              </div>

              {additionalContent && (
                <div className="game-folio-section relative z-10 mt-8 w-full p-4">
                  {additionalContent}
                </div>
              )}

              {rewardSummary && (
                <div className="relative z-10 mt-8 w-full border-t border-game-border pt-2">
                  <RewardSummaryDisplay summary={rewardSummary} />
                </div>
              )}
            </div>
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
                <ResultActionButton asChild>{secondaryAction}</ResultActionButton>
              </div>
            )}
            <div
              className={cn(
                'min-w-0',
                secondaryAction ? 'flex-1' : 'w-full',
              )}
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

// Legacy ResearchResult component - now just a wrapper around GameResult
interface ResearchResultProps {
  success: boolean
  title?: string
  message?: React.ReactNode
  rewardSummary?: RewardSummary | null
  icon?: string | React.ReactNode | TaskIcon
  iconAlt?: string
  onReturn?: () => void
}

export function ResearchResult(props: ResearchResultProps) {
  return (
    <GameResult
      {...props}
      sectionTitle="Research Outcome"
      returnPath="/game/research"
      returnText="Complete Research"
    />
  )
}
