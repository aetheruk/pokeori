'use client'

import { useRouter } from 'next/navigation'
import { lazy, Suspense, useEffect, useState } from 'react'
import { GamePageSkeleton } from '@/components/game/shared/GamePageSkeleton'
const EventStudio = lazy(() => import('@/components/game/events/event-studio').then(module => ({ default: module.EventStudio })))

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
import { ResponsivePanel } from '@/components/ui/responsive-panel'
import { useUser } from '@/context/UserContext'
import { getIcon } from '@/data/user'
import type { TaskIcon } from '@/data/tasks/types'
import { skills } from '@/data/skills'
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
  const [rankingSkill, setRankingSkill] = useState(skills[0].id)
  const deckGenerations = getTcgSeriesInReleaseOrder(tcgSetSummaries)
  const [deckGeneration, setDeckGeneration] = useState(deckGenerations[0] || '')
  const [deckFormat, setDeckFormat] = useState<DeckFormat>('baby')
  const sectionIcons: Record<TrainerSection, TaskIcon> = {
    profile:
      getIcon(user?.icon || 'ditto')?.icon || { type: 'pokemon', id: '132' },
    events: { type: 'item', id: 'master-ball' },
    decks: { type: 'local', id: 'images/tcg-back.avif' },
    trainers: { type: 'item', id: 'vs-seeker' },
    friends: { type: 'pokemon', id: '133' },
    gift: { type: 'item', id: 'relic-gold' },
    rankings: { type: 'pokemon', id: '137' },
  }
  const renderSectionIcon = (section: TrainerSection) => (
    <TaskIconDisplay icon={sectionIcons[section]} className="h-10 w-10" />
  )
  const TABS = [
    ...(user?.isAdmin
      ? [
          {
            id: 'events' as const,
            label: 'Events',
            description: 'Manage live event content',
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
      description: 'Skills and trainer progress',
      background: '/backgrounds/lab.avif',
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
            description: 'Build and manage your decks',
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
            description: 'Find other trainers',
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
            description: 'Manage your connections',
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
            description: 'Redeem gifts and codes',
            background: '/backgrounds/inventory.avif',
            component: (
              <LazyWrapper>
                <MysteryGift />
              </LazyWrapper>
            ),
          },
          {
            id: 'rankings' as const,
            label: 'Skill Rankings',
            description: 'Compare skill progress',
            background: '/backgrounds/crystal-stadium.avif',
            component: (
              <LazyWrapper>
                <HighScores activeSkill={rankingSkill} />
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

  const activeSection = TABS.find((tab) => tab.id === activeTab) || TABS[0]

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
                  description={tab.description}
                  icon={renderSectionIcon(tab.id)}
                  iconPosition="left"
                  selected={selected}
                  onClick={() => selectSection(tab.id)}
                  className="min-h-20"
                />
              )
            })}
          </nav>
          {activeTab === 'rankings' && (
            <div className="mt-6 border-t border-game-border pt-4">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-game-muted">
                Ranking skill
              </p>
              <PremiumSelect
                value={rankingSkill}
                onValueChange={setRankingSkill}
                options={skills.map((skill) => ({
                  id: skill.id,
                  label: skill.name,
                }))}
              />
            </div>
          )}
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
            background={activeSection.background}
            title={activeSection.label}
            description="Choose another trainer section"
            icon={renderSectionIcon(activeSection.id)}
            iconPosition="left"
            onClick={() => setSectionDrawerOpen(true)}
            className="min-h-20"
          />

          {activeTab === 'rankings' && (
            <PremiumSelect
              label="Ranking skill"
              value={rankingSkill}
              onValueChange={setRankingSkill}
              options={skills.map((skill) => ({
                id: skill.id,
                label: skill.name,
              }))}
            />
          )}
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
                    'game-focus-ring h-10 rounded-lg border text-xs font-bold capitalize transition-colors',
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
        title="Trainer sections"
        showHeader={false}
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
                description={tab.description}
                icon={renderSectionIcon(tab.id)}
                iconPosition="left"
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
