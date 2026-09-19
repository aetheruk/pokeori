'use client'

import { useState } from 'react'
import { VSAnimation } from '@/components/game/battles/VSAnimation'
import { LevelUpModal } from '@/components/game/level-up-modal'
import { GameInfoModal } from '@/components/game/shared/GameInfoModal'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { Button } from '@/components/ui/button'
import { UserProvider } from '@/context/UserContext'
import type { RequirementData } from '@/utilities/requirements'
import { ResearchLevelUpModal } from '@/app/(frontend)/game/pokedex/_components/ResearchLevelUpModal'

const taskIcon = { type: 'item' as const, id: 'vs-seeker' }

export function ResultLayoutFixture() {
  const [view, setView] = useState<'result' | 'story' | 'vs' | 'level' | 'research' | 'closed'>('result')

  return (
    <UserProvider initialUser={null} initialGameData={{ user: null } as unknown as RequirementData}>
      <div className="flex h-dvh items-center justify-center bg-game-canvas">
        {view === 'closed' && (
          <div className="flex gap-3">
            <Button onClick={() => setView('result')}>Open result</Button>
            <Button onClick={() => setView('vs')}>Open VS</Button>
            <Button onClick={() => setView('level')}>Open level up</Button>
            <Button onClick={() => setView('research')}>Open research</Button>
          </div>
        )}
        {view === 'vs' && (
          <VSAnimation
            background="/backgrounds/forest.avif"
            player={{ name: 'Trainer', icon: 'ditto' }}
            enemy={{ name: 'Rival', icon: 'ditto' }}
            onComplete={() => setView('closed')}
          />
        )}
        <LevelUpModal
          open={view === 'level'}
          onOpenChange={(open) => { if (!open) setView('closed') }}
          newLevel={2}
          skillId="battling"
          onClose={() => setView('closed')}
        />
        <ResearchLevelUpModal
          open={view === 'research'}
          onOpenChange={(open) => { if (!open) setView('closed') }}
          formId="25"
          pokemonName="Pikachu"
          newLevel={2}
          skillXpGranted={10}
          onClose={() => setView('closed')}
        />
        <RewardResultOverlay
          result={view === 'result' ? {
            success: true,
            message: 'The task is complete.',
            rewards: {
              xp: { general: 25 },
              items: [],
              pokemon: [],
              currency: [],
              cards: [],
            },
          } : null}
          background="/backgrounds/forest.avif"
          icon={taskIcon}
          title="Task complete"
          onClose={() => setView('story')}
        />
        <GameInfoModal
          open={view === 'story'}
          onOpenChange={(open) => { if (!open) setView('closed') }}
          resultLayout
          title="A new path opens"
          description="The next challenge awaits beyond the forest. Your journey continues from here."
          background="/backgrounds/forest.avif"
          icon={<TaskIconDisplay icon={taskIcon} className="h-20 w-20 md:h-24 md:w-24" priority />}
          actionButton={<Button className="w-full" onClick={() => setView('closed')}>Continue journey</Button>}
        />
      </div>
    </UserProvider>
  )
}
