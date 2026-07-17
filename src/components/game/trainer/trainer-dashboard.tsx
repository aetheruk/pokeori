'use client'

import { useEffect, useState, Suspense, lazy } from 'react'
import { GameLoadingState } from '@/components/game/shared/GameLoadingState'
const TrainerLeveling = lazy(() =>
  import('@/components/game/trainer-leveling').then((module) => ({
    default: module.TrainerLeveling,
  })),
)

function LazyWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<GameLoadingState label="Loading trainer records" />}>
      {children}
    </Suspense>
  )
}
import { TrainerSearch } from '@/components/game/trainer/trainer-search'
import { MysteryGift } from '@/components/game/trainer/mystery-gift'
import { HighScores } from '@/components/game/trainer/high-scores'
import { FriendsList } from '@/components/game/trainer/friends-list'
import { TcgDecksPanel, type DeckFormat } from '@/components/game/trainer/tcg-decks-panel'
import { TrainerCollection } from '@/components/game/trainer/trainer-collection'
import { useUser } from '@/context/UserContext'
import {
  Gift,
  LayoutGrid,
  Layers3,
  Search,
  Trophy,
  UserRound,
  UsersRound,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ResponsivePanel } from '@/components/ui/responsive-panel'
import { SecondaryControlBar } from '@/components/game/shared/SecondaryControlBar'
import { PremiumSelect } from '@/components/game/shared/PremiumSelect'
import { skills } from '@/data/skills'
import { getAllTcgSets } from '@/utilities/tcg/tcg'
import { DesktopSectionEmblem } from '@/components/game/shared/DesktopSectionEmblem'

type Tab =
  | 'profile'
  | 'collection'
  | 'decks'
  | 'trainers'
  | 'friends'
  | 'gift'
  | 'scores'

export function TrainerDashboard() {
  const { user, gameData } = useUser()
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  const [sectionDrawerOpen, setSectionDrawerOpen] = useState(false)
  const [rankingSkill, setRankingSkill] = useState(skills[0].id)
  const deckGenerations = Array.from(new Set(getAllTcgSets().map((set) => set.series))).sort((a, b) =>
    a.localeCompare(b),
  )
  const [deckGeneration, setDeckGeneration] = useState(deckGenerations[0] || '')
  const [deckFormat, setDeckFormat] = useState<DeckFormat>('baby')
  const inventory = Object.fromEntries(
    (gameData?.inventory || []).map((item) => [item.itemId, item.quantity]),
  )
  const hasDeckBox = (inventory['deck-box'] || 0) > 0

  const TABS = [
    {
      id: 'profile' as const,
      label: user?.trainerName || 'Trainer',
      component: (
        <LazyWrapper>
          <TrainerLeveling />
        </LazyWrapper>
      ),
    },
    {
      id: 'collection' as const,
      label: 'Collection',
      component: <TrainerCollection />,
    },
    ...(hasDeckBox
      ? [
          {
            id: 'decks' as const,
            label: 'TCG Decks',
            component: (
              <TcgDecksPanel
                deckFormat={deckFormat}
                setDeckFormat={setDeckFormat}
                selectedGeneration={deckGeneration}
                setSelectedGeneration={setDeckGeneration}
              />
            ),
          },
        ]
      : []),
    {
      id: 'trainers' as const,
      label: 'Trainers',
      component: <TrainerSearch />,
    },
    {
      id: 'friends' as const,
      label: 'Friends',
      component: <FriendsList />,
    },
    {
      id: 'gift' as const,
      label: 'Mystery Gift',
      component: <MysteryGift />,
    },
    {
      id: 'scores' as const,
      label: 'High Scores',
      component: <HighScores activeSkill={rankingSkill} />,
    },
  ]
  const activeComponent =
    TABS.find((tab) => tab.id === activeTab)?.component || TABS[0].component
  const tabIcons: Record<Tab, React.ComponentType<{ className?: string }>> = {
    profile: UserRound,
    collection: Layers3,
    decks: Layers3,
    trainers: Search,
    friends: UsersRound,
    gift: Gift,
    scores: Trophy,
  }

  useEffect(() => {
    if (!hasDeckBox && activeTab === 'decks') {
      setActiveTab('profile')
    }
  }, [activeTab, hasDeckBox])

  const activeSection = TABS.find((tab) => tab.id === activeTab) || TABS[0]
  const ActiveIcon = tabIcons[activeSection.id]

  return (
    <div className="game-paper-first game-paper-texture flex h-full flex-col overflow-hidden bg-game-canvas text-game-ink">
      {activeTab !== 'profile' && (
        <div className="relative shrink-0 overflow-hidden border-b border-game-border bg-game-canvas px-4 py-3 md:px-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-game-moss" />
          <div className="mx-auto flex w-full max-w-5xl items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-game-moss/30 bg-game-moss/10 text-game-moss-strong">
              <ActiveIcon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-game-moss-strong">Trainer hub</p>
              <h1 className="truncate font-display text-xl font-bold leading-tight text-game-ink">
                {activeSection.label}
              </h1>
            </div>
          </div>
        </div>
      )}
      <div className="min-h-0 flex-1 overflow-hidden xl:grid xl:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="hidden min-h-0 overflow-y-auto border-r border-game-border bg-game-surface/60 p-4 shadow-[10px_0_24px_rgb(75_62_39_/_0.05)] xl:block">
          <div className="mb-4 flex items-center justify-between gap-3 border-b border-game-border pb-4">
            <p className="px-2 text-[11px] font-bold uppercase tracking-[0.16em] text-game-muted">
              Trainer journal
            </p>
            <DesktopSectionEmblem section="trainer" className="h-14 w-14 opacity-90" />
          </div>
          <nav className="space-y-1" aria-label="Trainer sections">
            {TABS.map((tab) => {
              const Icon = tabIcons[tab.id]
              const selected = tab.id === activeTab
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-current={selected ? 'page' : undefined}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'game-focus-ring flex min-h-11 w-full items-center gap-3 rounded-lg border px-3 text-left text-sm font-semibold transition-colors',
                    selected
                      ? 'border-game-moss/40 bg-game-moss/12 text-game-ink'
                      : 'border-transparent text-game-muted hover:border-game-border hover:bg-game-surface-raised hover:text-game-ink',
                  )}
                >
                  <Icon className={cn('h-4 w-4 shrink-0', selected ? 'text-game-moss-strong' : 'text-game-muted')} />
                  <span className="truncate">{tab.label}</span>
                </button>
              )
            })}
          </nav>
          {activeTab === 'scores' && (
            <div className="mt-6 border-t border-game-border pt-4">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-game-muted">Ranking skill</p>
              <PremiumSelect
                value={rankingSkill}
                onValueChange={setRankingSkill}
                options={skills.map((skill) => ({ id: skill.id, label: skill.name }))}
              />
            </div>
          )}
          {activeTab === 'decks' && (
            <div className="mt-6 space-y-3 border-t border-game-border pt-4">
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-game-muted">Deck generation</p>
                <PremiumSelect
                  value={deckGeneration}
                  onValueChange={setDeckGeneration}
                  options={deckGenerations.map((generation) => ({ id: generation, label: generation.replace('&', 'and') }))}
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
                        ? 'border-game-moss/45 bg-game-moss/12 text-game-moss-strong'
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
        <div className="h-full min-h-0 min-w-0 overflow-hidden">{activeComponent}</div>
      </div>

      <SecondaryControlBar className="xl:hidden">
        <div className={cn('grid min-w-0 gap-2', (activeTab === 'scores' || activeTab === 'decks') && 'grid-cols-[minmax(0,1fr)_auto]')}>
          {activeTab === 'scores' && (
            <PremiumSelect
              value={rankingSkill}
              onValueChange={setRankingSkill}
              options={skills.map((skill) => ({ id: skill.id, label: skill.name }))}
            />
          )}
          {activeTab === 'decks' && (
            <PremiumSelect
              value={deckGeneration}
              onValueChange={setDeckGeneration}
              options={deckGenerations.map((generation) => ({
                id: generation,
                label: generation.replace('&', 'and'),
              }))}
            />
          )}
          <button
            type="button"
            onClick={() => setSectionDrawerOpen(true)}
            className={cn(
              'game-focus-ring flex min-w-0 h-12 items-center gap-3 rounded-lg border border-game-border bg-game-surface px-3 text-left transition-colors hover:border-game-moss/45 hover:bg-game-surface-raised',
              activeTab !== 'scores' && activeTab !== 'decks' && 'w-full',
            )}
            aria-label="Choose trainer section"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-game-moss/10 text-game-moss-strong">
              <ActiveIcon className="h-4 w-4" />
            </div>
            <div className={cn('min-w-0 flex-1', (activeTab === 'scores' || activeTab === 'decks') && 'hidden sm:block')}>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-game-muted">Trainer section</p>
              <p className="truncate text-sm font-bold text-game-ink">{activeSection.label}</p>
            </div>
            <LayoutGrid className="h-5 w-5 text-game-moss-strong" />
          </button>
          {activeTab === 'decks' && (
            <div className="col-span-2 grid grid-cols-3 gap-2">
              {(['baby', 'champions', 'masters'] as const).map((format) => (
                <button
                  key={format}
                  type="button"
                  aria-pressed={deckFormat === format}
                  onClick={() => setDeckFormat(format)}
                  className={cn(
                    'game-focus-ring h-10 rounded-lg border text-xs font-bold capitalize transition-colors',
                    deckFormat === format
                      ? 'border-game-moss/45 bg-game-moss/12 text-game-moss-strong'
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
        description="Choose what you want to manage."
        desktopWidth="min(32vw, 420px)"
        className="pb-[env(safe-area-inset-bottom)]"
      >
          <div className="grid grid-cols-2 gap-2 overflow-y-auto p-4 sm:grid-cols-3">
            {TABS.map((tab) => {
              const Icon = tabIcons[tab.id]
              const selected = tab.id === activeTab
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setSectionDrawerOpen(false)
                  }}
                  className={cn(
                    'game-focus-ring flex min-h-24 flex-col items-start justify-between rounded-lg border p-3 text-left transition-colors',
                    selected
                      ? 'border-game-moss/45 bg-game-moss/12 text-game-ink'
                      : 'border-game-border bg-game-surface text-game-muted hover:border-game-moss/30 hover:bg-game-surface-raised',
                  )}
                >
                  <Icon className={cn('h-5 w-5', selected ? 'text-game-moss-strong' : 'text-game-muted')} />
                  <span className="text-sm font-bold">{tab.label}</span>
                </button>
              )
            })}
          </div>
      </ResponsivePanel>
    </div>
  )
}
