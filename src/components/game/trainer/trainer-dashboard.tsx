'use client'

import { useRouter } from 'next/navigation'
import { lazy, Suspense, useEffect, useState } from 'react'
import { GamePageSkeleton } from '@/components/game/shared/GamePageSkeleton'
const EventStudio = lazy(() =>
  import('@/components/game/events/event-studio').then((module) => ({
    default: module.EventStudio,
  })),
)

const TrainerLeveling = lazy(() =>
  import('@/components/game/trainer-leveling').then((module) => ({
    default: module.TrainerLeveling,
  })),
)
const TrainerSearch = lazy(() =>
  import('@/components/game/trainer/trainer-search').then((module) => ({
    default: module.TrainerSearch,
  })),
)
const MysteryGift = lazy(() =>
  import('@/components/game/trainer/mystery-gift').then((module) => ({
    default: module.MysteryGift,
  })),
)
const HighScores = lazy(() =>
  import('@/components/game/trainer/high-scores').then((module) => ({
    default: module.HighScores,
  })),
)
const FriendsList = lazy(() =>
  import('@/components/game/trainer/friends-list').then((module) => ({
    default: module.FriendsList,
  })),
)
const TcgDecksPanel = lazy(() =>
  import('@/components/game/trainer/tcg-decks-panel').then((module) => ({
    default: module.TcgDecksPanel,
  })),
)

function LazyWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<GamePageSkeleton variant="trainer-panel" />}>
      {children}
    </Suspense>
  )
}

import { PremiumSelect } from '@/components/game/shared/PremiumSelect'
import { ScenicChoiceCard } from '@/components/game/shared/ScenicChoiceCard'
import { SecondaryControlBar } from '@/components/game/shared/SecondaryControlBar'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { getGridPlayerAppearance } from '@/utilities/trainer-appearance'
import { ResponsivePanel } from '@/components/ui/responsive-panel'
import { useUser } from '@/context/UserContext'
import { getBanner, getIcon } from '@/data/user'
import type { TaskIcon } from '@/data/tasks/types'
import { tcgSetSummaries } from '@/data/tcg/summaries'
import { cn } from '@/lib/utils'
import { getTcgSeriesInReleaseOrder } from '@/utilities/tcg/set-order'
import {
  getTrainerSectionHref,
  resolveTrainerSection,
  type TrainerSection,
} from './trainer-sections'

type DeckFormat = 'baby' | 'champions' | 'masters'

export function TrainerDashboard({
  initialSection = 'profile',
}: {
  initialSection?: string
}) {
  const { user, gameData } = useUser()
  const router = useRouter()
  const inventory = Object.fromEntries(
    (gameData?.inventory || []).map((item) => [item.itemId, item.quantity]),
  )
  const hasDeckBox = (inventory['deck-box'] || 0) > 0
  const isKidMode = user?.kidMode === true
  const normalizedInitialSection = resolveTrainerSection(initialSection, {
    isAdmin: user?.isAdmin === true,
    hasDeckBox,
    isKidMode,
  })
  const [activeTab, setActiveTab] = useState<TrainerSection>(
    normalizedInitialSection,
  )
  const [sectionDrawerOpen, setSectionDrawerOpen] = useState(false)
  const deckGenerations = getTcgSeriesInReleaseOrder(tcgSetSummaries)
  const [deckGeneration, setDeckGeneration] = useState(deckGenerations[0] || '')
  const [deckFormat, setDeckFormat] = useState<DeckFormat>('baby')
  const trainerBanner =
    getBanner(user?.banner || 'lab')?.imagePath || '/backgrounds/lab.avif'
  const trainerIcon = getIcon(user?.icon || 'ditto')?.icon || {
    type: 'pokemon',
    id: '132',
  }
  const genderAppearance = getGridPlayerAppearance(
    user?.trainerGender,
    'down',
    0,
  )
  const trainerGenderIcon = (
    <span
      aria-hidden="true"
      className="block h-8 w-8 bg-no-repeat [image-rendering:pixelated]"
      style={{
        backgroundImage: `url('${genderAppearance.src}')`,
        backgroundSize: genderAppearance.backgroundSize,
        backgroundPosition: genderAppearance.backgroundPosition,
      }}
    />
  )
  const sectionIcons: Record<TrainerSection, TaskIcon> = {
    profile: trainerIcon,
    events: { type: 'item', id: 'master-ball' },
    decks: { type: 'local', id: 'images/tcg-back.avif' },
    trainers: { type: 'item', id: 'vs-seeker' },
    friends: { type: 'pokemon', id: '133' },
    gift: { type: 'item', id: 'relic-gold' },
    rankings: { type: 'local', id: 'fallback/skills/ranked-v2.png' },
  }
  const renderSectionIcon = (section: TrainerSection) => (
    <TaskIconDisplay
      icon={sectionIcons[section]}
      normalizeVisibleBounds
      outlineVisiblePixels
      className="h-10 w-10"
    />
  )
  const TABS = [
    ...(user?.isAdmin
      ? [
          {
            id: 'events' as const,
            label: 'Events',
            background: '/backgrounds/cosmos-gold.avif',
            component: (
              <LazyWrapper>
                <EventStudio />
              </LazyWrapper>
            ),
          },
        ]
      : []),
    {
      id: 'profile' as const,
      label: user?.trainerName || 'Trainer',
      background: trainerBanner,
      component: (
        <LazyWrapper>
          <TrainerLeveling />
        </LazyWrapper>
      ),
    },
    ...(hasDeckBox
      ? [
          {
            id: 'decks' as const,
            label: 'TCG Decks',
            background: '/backgrounds/tcg.avif',
            component: (
              <LazyWrapper>
                <TcgDecksPanel
                  deckFormat={deckFormat}
                  setDeckFormat={setDeckFormat}
                  selectedGeneration={deckGeneration}
                  setSelectedGeneration={setDeckGeneration}
                />
              </LazyWrapper>
            ),
          },
        ]
      : []),
    ...(!isKidMode
      ? [
          {
            id: 'trainers' as const,
            label: 'Trainers',
            background: '/backgrounds/friend-stadium.avif',
            component: (
              <LazyWrapper>
                <TrainerSearch />
              </LazyWrapper>
            ),
          },
          {
            id: 'friends' as const,
            label: 'Friends',
            background: '/backgrounds/past-small-city.avif',
            component: (
              <LazyWrapper>
                <FriendsList />
              </LazyWrapper>
            ),
          },
          {
            id: 'gift' as const,
            label: 'Mystery Gift',
            background: '/backgrounds/inventory.avif',
            component: (
              <LazyWrapper>
                <MysteryGift />
              </LazyWrapper>
            ),
          },
          {
            id: 'rankings' as const,
            label: 'Rankings',
            background: '/backgrounds/crystal-stadium.avif',
            component: (
              <LazyWrapper>
                <HighScores />
              </LazyWrapper>
            ),
          },
        ]
      : []),
  ]
  const activeComponent =
    TABS.find((tab) => tab.id === activeTab)?.component || TABS[0].component
  const selectSection = (section: TrainerSection) => {
    setActiveTab(section)
    router.push(getTrainerSectionHref(section), { scroll: false })
  }

  useEffect(() => {
    setActiveTab(normalizedInitialSection)
    if (initialSection && normalizedInitialSection !== initialSection) {
      router.replace('/game', { scroll: false })
    }
  }, [initialSection, normalizedInitialSection, router])

  useEffect(() => {
    const availableSection = resolveTrainerSection(activeTab, {
      isAdmin: user?.isAdmin === true,
      hasDeckBox,
      isKidMode,
    })
    if (availableSection !== activeTab) {
      setActiveTab(availableSection)
      router.replace('/game', { scroll: false })
    }
  }, [activeTab, hasDeckBox, isKidMode, router, user?.isAdmin])

  return (
    <div className="game-paper-first game-paper-background flex h-full flex-col overflow-hidden bg-game-canvas text-game-ink">
      <div className="min-h-0 flex-1 overflow-hidden lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="hidden min-h-0 overflow-y-auto border-r border-game-border bg-game-surface/60 p-3 shadow-[10px_0_24px_rgb(75_62_39_/_0.05)] lg:block">
          <nav className="space-y-2" aria-label="Trainer sections">
            {TABS.map((tab) => {
              const selected = tab.id === activeTab
              return (
                <ScenicChoiceCard
                  key={tab.id}
                  background={tab.background}
                  title={tab.label}
                  appearance="explore"
                  icon={renderSectionIcon(tab.id)}
                  iconPosition="left"
                  selectionIcon={trainerGenderIcon}
                  selected={selected}
                  onClick={() => selectSection(tab.id)}
                  className="min-h-20"
                />
              )
            })}
          </nav>
          {activeTab === 'decks' && (
            <div className="mt-6 space-y-3 border-t border-game-border pt-4">
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-game-muted">
                  Deck generation
                </p>
                <PremiumSelect
                  value={deckGeneration}
                  onValueChange={setDeckGeneration}
                  options={deckGenerations.map((generation) => ({
                    id: generation,
                    label: generation.replace('&', 'and'),
                  }))}
                />
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {(['baby', 'champions', 'masters'] as const).map((format) => (
                  <button
                    key={format}
                    type="button"
                    aria-pressed={deckFormat === format}
                    onClick={() => setDeckFormat(format)}
                    className={cn(
                      'game-focus-ring min-h-10 rounded-md border text-[11px] font-bold capitalize',
                      deckFormat === format
                        ? 'border-game-charcoal/45 bg-game-charcoal/8 text-game-charcoal-strong'
                        : 'border-game-border bg-game-surface text-game-muted',
                    )}
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>
        <div className="h-full min-h-0 min-w-0 overflow-hidden">
          {activeComponent}
        </div>
      </div>

      <SecondaryControlBar className="lg:hidden">
        <div className="space-y-3">
          <ScenicChoiceCard
            background={trainerBanner}
            title={user?.trainerName || 'Trainer'}
            appearance="explore"
            icon={
              <TaskIconDisplay
                icon={trainerIcon}
                normalizeVisibleBounds
                outlineVisiblePixels
                className="h-10 w-10"
              />
            }
            iconPosition="left"
            selectionIcon={trainerGenderIcon}
            onClick={() => setSectionDrawerOpen(true)}
            className="min-h-20"
          />

          {activeTab === 'decks' && (
            <PremiumSelect
              label="Deck generation"
              value={deckGeneration}
              onValueChange={setDeckGeneration}
              options={deckGenerations.map((generation) => ({
                id: generation,
                label: generation.replace('&', 'and'),
              }))}
            />
          )}
          {activeTab === 'decks' && (
            <div className="grid grid-cols-3 gap-2">
              {(['baby', 'champions', 'masters'] as const).map((format) => (
                <button
                  key={format}
                  type="button"
                  aria-pressed={deckFormat === format}
                  onClick={() => setDeckFormat(format)}
                  className={cn(
                    'game-focus-ring h-10 rounded-md border text-xs font-bold capitalize transition-colors',
                    deckFormat === format
                      ? 'border-game-charcoal/45 bg-game-charcoal/8 text-game-charcoal-strong'
                      : 'border-game-border bg-game-surface text-game-muted',
                  )}
                >
                  {format}
                </button>
              ))}
            </div>
          )}
        </div>
      </SecondaryControlBar>

      <ResponsivePanel
        open={sectionDrawerOpen}
        onOpenChange={setSectionDrawerOpen}
        title={user?.trainerName || 'Trainer'}
        background={trainerBanner}
        icon={
          <TaskIconDisplay
            icon={trainerIcon}
            className="h-20 w-20 md:h-24 md:w-24"
            normalizeVisibleBounds
            outlineVisiblePixels
            priority
          />
        }
        heroLabel="Trainer sections"
        desktopWidth="min(32vw, 420px)"
        className="pb-[env(safe-area-inset-bottom)]"
      >
        <div className="min-h-0 overflow-y-auto space-y-3 p-3 pb-4">
          {TABS.map((tab) => {
            const selected = tab.id === activeTab
            return (
              <ScenicChoiceCard
                key={tab.id}
                background={tab.background}
                title={tab.label}
                appearance="explore"
                icon={renderSectionIcon(tab.id)}
                iconPosition="left"
                selectionIcon={trainerGenderIcon}
                selected={selected}
                onClick={() => {
                  selectSection(tab.id)
                  setSectionDrawerOpen(false)
                }}
              />
            )
          })}
        </div>
      </ResponsivePanel>
    </div>
  )
}
