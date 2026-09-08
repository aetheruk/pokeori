'use client'

import { useMemo, useState } from 'react'
import { SWRConfig } from 'swr'
import { ArtAcademyGame } from '@/app/(frontend)/game/research/encounter/art-academy'
import { PvpQueueModal } from '@/app/(frontend)/game/battles/pvp/pvp-queue-modal'
import { AudioProvider } from '@/context/AudioContext'
import { TrainerSettings } from '@/components/game/trainer/trainer-settings'
import { GameNavigation } from '@/components/game/game-navigation'
import { UserProvider } from '@/context/UserContext'
import type { RequirementData } from '@/utilities/requirements'
import { encodeArtAcademyCells } from '@/utilities/research/art-academy'
import { AuthForm } from '@/app/(frontend)/auth/_components/auth-form'
import { ScratchCardModal } from '@/app/(frontend)/game/inventory/_components/scratch-card-modal'
import { GameActionRecovery } from '@/components/game/shared/GameActionRecovery'
import { VSAnimation } from '@/components/game/battles/VSAnimation'
import { Button } from '@/components/ui/button'
import { recoverGameAction } from '@/utilities/games/action-recovery'
import { ArcadeFixture } from './arcade-fixture'
import { CaptureFixture } from './capture-fixture'
import { SyncFixture } from './sync-fixture'
import { SnakeFixture } from './snake-fixture'
import { UfoFixture } from './ufo-fixture'
import { DexLayoutFixture } from './dex-layout-fixture'
import { PokemonDetailsDialog } from '@/app/(frontend)/game/pokemon/_components/pokemon-details-dialog'
import type { Pokemon } from '@/payload-types'

/** Local-only fixtures: no account, reward, database or gameplay actions are invoked. */
export function UiTestFixture() {
  const [scratch, setScratch] = useState(false)
  const [intro, setIntro] = useState(false)
  const [art, setArt] = useState(false)
  const [queue, setQueue] = useState(false)
  const [arcade, setArcade] = useState(false)
  const [capture, setCapture] = useState(false)
  const [sync, setSync] = useState(false)
  const [snake, setSnake] = useState(false)
  const [ufo, setUfo] = useState(false)
  const [inspector, setInspector] = useState(false)
  const [navigation, setNavigation] = useState(false)
  const [dexLayout, setDexLayout] = useState(false)
  const [settings, setSettings] = useState(false)
  const [status, setStatus] = useState('Ready')
  const artState = useMemo(() => ({ expiry: Date.now() + 3600000, roundData: { artAcademy: {
    spriteUrl: '/sprites/pokemon/home/normal/1.avif', palette: ['#293532', '#b86148'], referenceCells: encodeArtAcademyCells(new Uint8Array(1024)), scoreGridSize: 32, guideGridSize: 3,
  } } }), [])
  const artActions = useMemo(() => ({
    start: async () => ({ success: true, ...artState }),
    complete: async () => ({ success: true, finalScore: 75 }),
  }), [artState])
  const pvpActions = useMemo(() => {
    let joins = 0
    let leaves = 0
    return {
      join: async () => { if (++joins === 1) throw new Error('Test join failure'); return { success: true, status: 'queued' as const } },
      check: async () => { throw new Error('Test status connection failure') },
      leave: async () => { if (++leaves === 1) throw new Error('Test cancellation failure'); return { success: true } },
    }
  }, [])
  return <>
    <div className="flex flex-wrap gap-3 p-4">
      <Button onClick={() => setScratch(true)}>Test scratch card</Button>
      <Button onClick={() => setIntro(true)}>Test battle intro</Button>
      <Button onClick={() => setArt((value) => !value)}>Test Art Academy</Button>
      <Button onClick={() => setQueue(true)}>Test ranked queue</Button>
      <Button onClick={() => setArcade(true)}>Test arcade checkpoint</Button>
      <Button onClick={() => setCapture(true)}>Test capture keyboard</Button>
      <Button onClick={() => setSync(true)}>Test scoped sync</Button>
      <Button onClick={() => setSnake(true)}>Test Onix joystick</Button>
      <Button onClick={() => setUfo(true)}>Test UFO Catcher</Button>
      <Button onClick={() => setInspector(true)}>Test Pokemon inspector</Button>
      <Button onClick={() => setNavigation(true)}>Test game navigation</Button>
      <Button onClick={() => setDexLayout(true)}>Test dex layouts</Button>
      <Button onClick={() => setSettings(true)}>Test trainer settings</Button>
      <Button onClick={() => {
        let attempts = 0
        setStatus('Waiting for result')
        void recoverGameAction(async () => {
          if (++attempts === 1) throw new Error('Simulated dropped response')
          return 'Saved score: 120'
        }, 'The test response was interrupted. Retry the same score.').then(setStatus)
      }}>Test dropped result</Button>
      <p role="status">{status}</p>
      {settings && <AudioProvider><div className="relative h-20 w-20"><TrainerSettings /></div></AudioProvider>}
    </div>
    {art ? <SWRConfig value={{ isPaused: () => true }}><UserProvider initialGameData={{ user: { id: 'ui-test', trainerName: 'Test trainer' }, inventory: [], pokemon: [] } as unknown as RequirementData}><AudioProvider>
      <ArtAcademyGame encounter={{ id: 'ui-test-art', name: 'Art Academy test', description: 'Local drawing fixture', category: 'game', icon: { type: 'item', id: 'poke-ball' }, requirements: [], rewards: [], settings: { formId: '1', timeLimit: 3600, successThreshold: 50 } }} initialState={artState} actions={artActions} />
    </AudioProvider></UserProvider></SWRConfig> : <AuthForm />}
    <PvpQueueModal open={queue} onOpenChange={setQueue} configId="ui-test" userId="ui-test" actions={pvpActions} />
    <GameActionRecovery />
    {dexLayout && <DexLayoutFixture />}
    {navigation && <SWRConfig value={{ isPaused: () => true }}><UserProvider initialGameData={{ user: { id: 'ui-test', trainerName: 'Test trainer' }, inventory: [], pokemon: [] } as unknown as RequirementData}><AudioProvider><GameNavigation /></AudioProvider></UserProvider></SWRConfig>}
    {capture && <CaptureFixture />}
    {sync && <SyncFixture />}
    {snake && <SnakeFixture />}
    {ufo && <UfoFixture />}
    {inspector && <SWRConfig value={{ isPaused: () => true }}><UserProvider initialGameData={{ user: { id: 'ui-test', trainerName: 'Test trainer', skills: { researching: { level: 10 } } }, inventory: [{ itemId: 'tm-rollout', quantity: 1 }], pokedex: [{ speciesId: 108, formId: '108', researchLevel: 1, caught: true }], pokemon: [] } as unknown as RequirementData}><PokemonDetailsDialog pokemon={{ id: 'ui-test-pokemon', speciesId: 108, formId: '108', name: 'Inspector fixture', level: 5, identified: true } as Pokemon} boxes={[]} trigger={<Button>Open fixture inspector</Button>} /></UserProvider></SWRConfig>}
    {arcade ? <SWRConfig value={{ isPaused: () => true }}><UserProvider initialGameData={{ user: { id: 'ui-test', trainerName: 'Test trainer' }, inventory: [], pokemon: [] } as unknown as RequirementData}><AudioProvider><ArcadeFixture /></AudioProvider></UserProvider></SWRConfig> : null}
    <ScratchCardModal open={scratch} onOpenChange={setScratch} onClose={() => setScratch(false)} background="" icon={{ type: 'item', id: 'poke-ball' }} rewards={[]} />
    {intro && <VSAnimation player={{ name: 'Test trainer' }} enemy={{ name: 'Test rival' }} onComplete={() => setIntro(false)} />}
  </>
}
