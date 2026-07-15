'use client'

import { Heart, Loader2, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  Component,
  type ErrorInfo,
  lazy,
  type ReactNode,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { MdCatchingPokemon } from 'react-icons/md'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useAudio } from '@/context/AudioContext'
import type { BattleStance, BattleState } from '@/utilities/battle/types'
import {
  clearBattleState,
  getBattlePanelData,
  getBattleState,
  submitTurn,
  surrenderBattle,
  swapPokemon,
  useBattleItem,
  useCircadian,
  useDynamax,
  useMegaEvolution,
  useMove,
  useShout,
  useTeraOrb,
  useVictoryPower,
  useWeatherPower,
  useZMove,
} from '../actions'
import { BattleLog } from './battle-log'

const CardDrawReveal = lazy(() =>
  import('@/components/tcg/CardDrawReveal').then((module) => ({
    default: module.CardDrawReveal,
  })),
)

import { AnimatePresence } from 'framer-motion'
import { ResearchLevelUpModal } from '@/app/(frontend)/game/pokedex/_components/ResearchLevelUpModal'
import { VSAnimation } from '@/components/game/battles/VSAnimation'
import { LevelUpModal } from '@/components/game/level-up-modal'
import { GameResult } from '@/components/game/ResearchResult'
import { TaskExitDialog } from '@/components/game/task-exit-dialog'
import { useUser } from '@/context/UserContext'
import { battles } from '@/data/battles'
import { tasks } from '@/data/tasks'
import type { TcgCard } from '@/data/tcg/types'
import { getIcon } from '@/data/user/icons'
import { useBattleManager } from '@/utilities/battle/engine/useBattleManager'
import { needsPlayerLeadSelection } from '@/utilities/battle/switching'
import type { BattlePowersData } from '../powers/powers-data'
import { BattleActionMenu } from './battle-action-menu'
import { type BattleContextType, BattleProvider } from './battle-context'
import { BattleHeader } from './battle-header'
import { BattleSurrenderButton } from './battle-surrender-button'
import { PokemonSpriteDisplay } from './pokemon-sprite-display'

interface BattleInterfaceProps {
  initialState: BattleState
}

type PendingBattleAction = {
  kind: string
  label: string
  stance?: BattleStance
  itemId?: string
  moveId?: string
  pokemonIndex?: number
}

interface CardRevealErrorBoundaryProps {
  children: ReactNode
  onSkip: () => void
}

interface CardRevealErrorBoundaryState {
  hasError: boolean
}

function createClientActionId() {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

class CardRevealErrorBoundary extends Component<
  CardRevealErrorBoundaryProps,
  CardRevealErrorBoundaryState
> {
  public state: CardRevealErrorBoundaryState = { hasError: false }

  public static getDerivedStateFromError(): CardRevealErrorBoundaryState {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Battle card reveal failed to load:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center game-activity-chrome p-6 text-game-ink">
          <div className="game-activity-panel w-full max-w-sm p-5 text-center">
            <h2 className="text-lg font-bold">Cards added</h2>
            <p className="mt-2 text-sm text-game-muted">
              The card reveal animation could not load, but your rewards were
              already granted.
            </p>
            <Button
              type="button"
              className="game-accent-button mt-4 w-full border border-game-clay bg-game-clay hover:bg-game-clay-strong"
              onClick={this.props.onSkip}
            >
              Continue
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export function BattleInterface({ initialState }: BattleInterfaceProps) {
  const router = useRouter()
  const { refreshUser } = useUser()
  const {
    battleState,
    anim,
    isProcessing,
    isWaitingForOpponent,
    pushTurnResult,
    showResultScreen,
    setShowResultScreen,
    showCardReveal,
    setShowCardReveal,
    cardsToReveal,
    setCardsToReveal,
    showLevelUpModal,
    setShowLevelUpModal,
    showTaskExitModal,
    setShowTaskExitModal,
    taskExitModalData,
    setTaskExitModalData,
    researchBreakthroughs,
    forceSyncToTargetState,
  } = useBattleManager(initialState)

  const [showVsAnimation, setShowVsAnimation] = useState(
    initialState.turn === 1 && !!initialState.enemyTrainer,
  )
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [hasPowerKeyItems, setHasPowerKeyItems] = useState(false)
  const [currentResearchBreakthrough, setCurrentResearchBreakthrough] =
    useState<any | null>(null)
  const [researchBreakthroughsToReveal, setResearchBreakthroughsToReveal] =
    useState<any[]>([])
  const hasQueuedResearchBreakthroughsRef = useRef(false)
  const [availableMoves, setAvailableMoves] = useState<
    BattleContextType['availableMoves']
  >([])
  const [battlePowersData, setBattlePowersData] =
    useState<BattlePowersData | null>(null)
  const [isBattlePanelLoading, setIsBattlePanelLoading] = useState(false)
  const [isWaitingForServer, setIsWaitingForServer] = useState(false)
  const [isReplayLoading, setIsReplayLoading] = useState(false)
  const [pendingBattleAction, setPendingBattleAction] =
    useState<PendingBattleAction | null>(null)
  const actionTokenRef = useRef(0)
  const isMountedRef = useRef(true)
  const resultBattleConfig = useMemo(
    () =>
      battleState.dynamicBattleConfig ||
      battles.find((battle) => battle.id === battleState.battleId),
    [battleState.battleId, battleState.dynamicBattleConfig],
  )
  const resultIcon = useMemo(() => {
    if (resultBattleConfig?.dynamicOpponent === 'rival') {
      const rivalIconId = battleState.enemyTrainer?.icon
      const rivalIcon = rivalIconId ? getIcon(rivalIconId)?.icon : undefined
      if (rivalIcon) return rivalIcon
    }

    return resultBattleConfig?.icon
  }, [battleState.enemyTrainer?.icon, resultBattleConfig])

  const { playSfx, playMusic, stopMusic } = useAudio()

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
      actionTokenRef.current += 1
    }
  }, [])

  useEffect(() => {
    if (initialState.status !== 'ongoing') return

    const musicUrl = initialState.config?.music || '/music/battle.mp3'
    playMusic(musicUrl, { loop: true, volume: 0.3 })

    return () => {
      stopMusic({ delayMs: 750 })
    }
  }, [
    initialState.battleId,
    initialState.config?.music,
    initialState.status,
    playMusic,
    stopMusic,
  ])

  useEffect(() => {
    if (battleState.status === 'won' || battleState.status === 'lost') {
      stopMusic({ fade: true })
    }
  }, [battleState.status, stopMusic])

  const activePlayerMon = battleState.playerTeam[battleState.activePlayerIndex]
  const activeEnemyMon = battleState.enemyTeam[battleState.activeEnemyIndex]
  const expeditionProgress = battleState.expeditionProgress
  const activePlayerTypeKey = (activePlayerMon?.types || []).join('|')

  useEffect(() => {
    if (!activePlayerMon) return

    let cancelled = false

    const fetchBattlePanel = async () => {
      setIsBattlePanelLoading(true)
      setBattlePowersData(null)
      try {
        const panel = await getBattlePanelData(
          activePlayerMon.types,
          activePlayerMon.formId,
          activePlayerMon.level,
        )

        if (cancelled) return

        setAvailableMoves(panel.moves || [])

        if (panel.powers.success) {
          const d = panel.powers.data
          setBattlePowersData(d)
          setHasPowerKeyItems(
            d.hasTera ||
              d.hasMega ||
              d.hasZRing ||
              d.hasDynamax ||
              d.hasShouts ||
              d.hasVictory ||
              d.hasCircadian ||
              d.dimensionalShift?.time ||
              d.dimensionalShift?.space ||
              d.dimensionalShift?.chaos,
          )
        } else {
          setBattlePowersData(null)
          setHasPowerKeyItems(false)
        }
      } catch (error) {
        console.error('Failed battle panel fetch', error)
        if (!cancelled) {
          setBattlePowersData(null)
          setHasPowerKeyItems(false)
          setAvailableMoves([])
        }
      } finally {
        if (!cancelled) {
          setIsBattlePanelLoading(false)
        }
      }
    }

    void fetchBattlePanel()

    return () => {
      cancelled = true
    }
  }, [
    battleState.battleId,
    battleState.status,
    activePlayerMon?.formId,
    activePlayerMon?.level,
    activePlayerTypeKey,
  ])

  useEffect(() => {
    const activeTypes = activePlayerMon?.types || []
    if (
      activeTypes.length > 0 &&
      (!selectedType || !activeTypes.includes(selectedType))
    ) {
      setSelectedType(activeTypes[0])
    }
  }, [activePlayerMon?.formId, activePlayerTypeKey, selectedType])

  useEffect(() => {
    if (researchBreakthroughs.length === 0) {
      hasQueuedResearchBreakthroughsRef.current = false
      return
    }

    if (
      researchBreakthroughs.length > 0 &&
      !currentResearchBreakthrough &&
      !hasQueuedResearchBreakthroughsRef.current
    ) {
      hasQueuedResearchBreakthroughsRef.current = true
      setCurrentResearchBreakthrough(researchBreakthroughs[0])
      setResearchBreakthroughsToReveal(researchBreakthroughs.slice(1))
    }
  }, [researchBreakthroughs, currentResearchBreakthrough])

  const wrapAction = useCallback(
    async (
      action: (clientActionId: string) => Promise<any>,
      pendingAction: PendingBattleAction,
    ) => {
      if (
        isProcessing ||
        isWaitingForServer ||
        battleState.status !== 'ongoing'
      )
        return
      const actionToken = ++actionTokenRef.current
      const clientActionId = createClientActionId()
      setIsWaitingForServer(true)
      setPendingBattleAction(pendingAction)
      try {
        const result = await action(clientActionId)
        if (!isMountedRef.current) return
        if (actionTokenRef.current !== actionToken) return

        if (result?.success) {
          pushTurnResult(result)
          return
        }

        if (result?.state) {
          pushTurnResult({
            success: true,
            state: result.state,
            waiting: result.waiting,
          })
        }

        if (result?.error || result?.message) {
          console.warn(
            'Battle action rejected:',
            result.error || result.message,
          )
          toast.error(result.error || result.message)
        }
      } catch (err) {
        console.error('Battle action error:', err)
        if (isMountedRef.current) toast.error('An error occurred')
      } finally {
        if (isMountedRef.current && actionTokenRef.current === actionToken) {
          setIsWaitingForServer(false)
          setPendingBattleAction(null)
        }
      }
    },
    [isProcessing, isWaitingForServer, battleState.status, pushTurnResult],
  )

  useEffect(() => {
    if (!isWaitingForServer) return

    const timer = window.setTimeout(async () => {
      const recoveryToken = ++actionTokenRef.current

      try {
        const latestState = await getBattleState()
        if (!isMountedRef.current) return
        if (actionTokenRef.current !== recoveryToken) return

        if (latestState) {
          pushTurnResult({ success: true, state: latestState })
          forceSyncToTargetState()
        } else {
          toast.error('Battle state could not be restored')
        }
      } catch (error) {
        console.error('Battle action recovery failed:', error)
        if (isMountedRef.current && actionTokenRef.current === recoveryToken) {
          toast.error('Battle action timed out')
        }
      } finally {
        if (isMountedRef.current && actionTokenRef.current === recoveryToken) {
          setIsWaitingForServer(false)
          setPendingBattleAction(null)
        }
      }
    }, 15000)

    return () => window.clearTimeout(timer)
  }, [isWaitingForServer, pushTurnResult, forceSyncToTargetState])

  useEffect(() => {
    if (!isWaitingForOpponent || !battleState.isPvp) return

    let cancelled = false
    let attempts = 0
    let timerId: number | null = null
    const latestLog = battleState.history[0]

    const poll = async () => {
      try {
        const latestState = await getBattleState()
        if (cancelled || !latestState) return

        const latestStateLog = latestState.history[0]
        const hasResolvedUpdate =
          latestState.turn !== battleState.turn ||
          latestState.status !== battleState.status ||
          latestState.activePlayerIndex !== battleState.activePlayerIndex ||
          latestState.activeEnemyIndex !== battleState.activeEnemyIndex ||
          latestStateLog?.turn !== latestLog?.turn ||
          latestStateLog?.message !== latestLog?.message

        if (hasResolvedUpdate) {
          pushTurnResult({ success: true, state: latestState })
          return
        }
      } catch (error) {
        console.error('PVP turn poll failed:', error)
      }

      if (cancelled) return
      attempts += 1
      timerId = window.setTimeout(poll, attempts < 14 ? 750 : 1500)
    }

    timerId = window.setTimeout(poll, 750)

    return () => {
      cancelled = true
      if (timerId !== null) window.clearTimeout(timerId)
    }
  }, [
    battleState.activeEnemyIndex,
    battleState.activePlayerIndex,
    battleState.history,
    battleState.isPvp,
    battleState.status,
    battleState.turn,
    isWaitingForOpponent,
    pushTurnResult,
  ])

  const handleStanceSelect = useCallback(
    (stance: BattleStance) =>
      wrapAction(
        async (clientActionId) => {
          if (!selectedType) return { success: false }
          playSfx('select')
          return await submitTurn(stance, selectedType, clientActionId)
        },
        {
          kind: 'stance',
          label: `${stance.charAt(0).toUpperCase()}${stance.slice(1)} attack`,
          stance,
        },
      ),
    [playSfx, selectedType, wrapAction],
  )

  const handleUseMove = useCallback(
    (id: string) =>
      wrapAction(
        (clientActionId) =>
          useMove(id, selectedType || undefined, clientActionId),
        {
          kind: 'move',
          label: availableMoves.find((move) => move.id === id)?.name || 'Move',
          moveId: id,
        },
      ),
    [availableMoves, selectedType, wrapAction],
  )
  const handleUseItem = useCallback(
    (id: string) =>
      wrapAction((clientActionId) => useBattleItem(id, clientActionId), {
        kind: 'item',
        label: 'Using item',
        itemId: id,
      }),
    [wrapAction],
  )
  const handleSwapPokemon = useCallback(
    (idx: number) =>
      wrapAction((clientActionId) => swapPokemon(idx, clientActionId), {
        kind: 'swap',
        label: `Switching to ${battleState.playerTeam[idx]?.name || 'Pokemon'}`,
        pokemonIndex: idx,
      }),
    [battleState.playerTeam, wrapAction],
  )
  const handleUseTera = useCallback(
    () =>
      wrapAction((clientActionId) => useTeraOrb(clientActionId), {
        kind: 'power',
        label: 'Terastallizing',
      }),
    [wrapAction],
  )
  const handleUseMega = useCallback(
    (id: string) =>
      wrapAction((clientActionId) => useMegaEvolution(id, clientActionId), {
        kind: 'power',
        label: 'Mega Evolution',
      }),
    [wrapAction],
  )
  const handleUseZMove = useCallback(
    () =>
      wrapAction((clientActionId) => useZMove(clientActionId), {
        kind: 'power',
        label: 'Preparing Z-Move',
      }),
    [wrapAction],
  )
  const handleUseDynamax = useCallback(
    () =>
      wrapAction((clientActionId) => useDynamax(undefined, clientActionId), {
        kind: 'power',
        label: 'Dynamaxing',
      }),
    [wrapAction],
  )
  const handleUseVictory = useCallback(
    (id: string) =>
      wrapAction((clientActionId) => useVictoryPower(id, clientActionId), {
        kind: 'power',
        label: 'Victory Power',
        itemId: id,
      }),
    [wrapAction],
  )
  const handleUseWeather = useCallback(
    (weather: string) =>
      wrapAction(
        (clientActionId) =>
          useWeatherPower(battleState.battleId, weather, clientActionId),
        {
          kind: 'power',
          label: 'Weather Control',
        },
      ),
    [battleState.battleId, wrapAction],
  )
  const handleUseShout = useCallback(
    (s: BattleStance) =>
      wrapAction((clientActionId) => useShout(s, clientActionId), {
        kind: 'power',
        label: 'Shout Command',
        stance: s,
      }),
    [wrapAction],
  )
  const handleUseCircadian = useCallback(
    () =>
      wrapAction(
        (clientActionId) => useCircadian(battleState.battleId, clientActionId),
        {
          kind: 'power',
          label: 'Circadian Power',
        },
      ),
    [battleState.battleId, wrapAction],
  )
  const handleUseDimensionalShift = useCallback(
    (type: 'time' | 'space' | 'chaos') =>
      wrapAction(
        (clientActionId) =>
          submitTurn('tech', `power:dimensional-shift:${type}`, clientActionId),
        {
          kind: 'power',
          label: 'Dimensional Shift',
        },
      ),
    [wrapAction],
  )

  const handleSurrender = useCallback(
    () =>
      wrapAction(
        async () => {
          playSfx('flee')
          const result = await surrenderBattle()
          if (result.success) {
            const newState = await getBattleState()
            return { success: true, state: newState }
          }
          return result
        },
        {
          kind: 'surrender',
          label: 'Surrendering',
        },
      ),
    [playSfx, wrapAction],
  )

  const playerHasTeraEffect = !!activePlayerMon?.teraTypeOverride
  const choosingLead = needsPlayerLeadSelection(battleState)

  const contextValue = useMemo<BattleContextType>(
    () => ({
      battleState,
      activePlayerMon: activePlayerMon as any,
      activeEnemyMon: activeEnemyMon as any,
      selectedType,
      setSelectedType,
      isAnimating: isProcessing,
      isWaitingForServer,
      pendingBattleAction,
      isBattlePanelLoading,
      hasPowerKeyItems,
      availableMoves,
      battlePowersData,
      playerHasTeraEffect,
      handleStanceSelect,
      handleUseItem,
      handleUseTera,
      handleUseMega,
      handleUseZMove,
      handleUseDynamax,
      handleUseMove,
      handleUseVictory,
      handleUseWeather,
      handleUseShout,
      handleUseCircadian,
      handleUseDimensionalShift,
      handleSwapPokemon,
      handleSurrender,
    }),
    [
      battleState,
      activePlayerMon,
      activeEnemyMon,
      selectedType,
      isProcessing,
      isWaitingForServer,
      pendingBattleAction,
      isBattlePanelLoading,
      hasPowerKeyItems,
      availableMoves,
      battlePowersData,
      playerHasTeraEffect,
      handleStanceSelect,
      handleUseItem,
      handleUseTera,
      handleUseMega,
      handleUseZMove,
      handleUseDynamax,
      handleUseMove,
      handleUseVictory,
      handleUseWeather,
      handleUseShout,
      handleUseCircadian,
      handleUseDimensionalShift,
      handleSwapPokemon,
      handleSurrender,
    ],
  )

  if (!activePlayerMon || !activeEnemyMon) return <div>Sync Error</div>

  return (
    <BattleProvider value={contextValue}>
      <div className="game-desktop-activity-stage game-activity-chrome relative flex h-full flex-col overflow-hidden xl:my-4 xl:h-[calc(100%-2rem)] xl:grid xl:grid-cols-[minmax(0,1fr)_19rem] xl:grid-rows-[minmax(26rem,1fr)_auto]">
        <AnimatePresence>
          {showVsAnimation &&
            battleState.playerTrainer &&
            battleState.enemyTrainer && (
              <VSAnimation
                player={battleState.playerTrainer}
                enemy={battleState.enemyTrainer}
                onComplete={() => setShowVsAnimation(false)}
              />
            )}
        </AnimatePresence>
        <div className="relative flex flex-[36] flex-col items-center justify-center bg-game-night-surface p-4 xl:col-start-1 xl:row-start-1 xl:min-h-0 xl:flex-none">
          <BattleHeader
            battleState={battleState}
            activePlayerMon={activePlayerMon}
            activeEnemyMon={activeEnemyMon}
            isWaitingForOpponent={isWaitingForOpponent}
          />
          <PokemonSpriteDisplay
            activePlayerMon={activePlayerMon}
            activeEnemyMon={activeEnemyMon}
            {...anim}
            playerHasTeraEffect={contextValue.playerHasTeraEffect}
            playerHasZPowerEffect={!!activePlayerMon?.zMoveReady}
            playerTeraType={activePlayerMon.teraTypeOverride}
            enemyHasTeraEffect={!!activeEnemyMon.teraTypeOverride}
            enemyHasZPowerEffect={false}
            enemyTeraType={activeEnemyMon.teraTypeOverride}
            hidePlayer={choosingLead}
          />
        </div>
        <div className="xl:col-start-1 xl:row-start-2">
          <BattleActionMenu />
        </div>
        <div className="relative min-h-0 flex-[24] border-t border-game-border bg-game-surface-raised xl:col-start-2 xl:row-start-1 xl:row-span-2 xl:border-l xl:border-t-0">
          <div className="h-full overflow-hidden">
            <BattleLog logs={battleState.history} />
          </div>
          <div className="absolute bottom-4 right-4 z-30">
            <BattleSurrenderButton />
          </div>
        </div>
      </div>

      {showResultScreen && (
        <div className="fixed inset-0 z-[100] bg-game-canvas">
          {battleState.rewards?.levelUp && (
            <LevelUpModal
              open={showLevelUpModal}
              onOpenChange={setShowLevelUpModal}
              newLevel={battleState.rewards.levelUp.newLevel}
              skillId={battleState.rewards.levelUp.skillId || 'battling'}
              onClose={() => setShowLevelUpModal(false)}
            />
          )}
          {currentResearchBreakthrough && (
            <ResearchLevelUpModal
              open={!!currentResearchBreakthrough}
              onOpenChange={(open) => {
                if (!open) {
                  const next = researchBreakthroughsToReveal[0]
                  setCurrentResearchBreakthrough(next || null)
                  setResearchBreakthroughsToReveal(
                    researchBreakthroughsToReveal.slice(1),
                  )
                }
              }}
              formId={currentResearchBreakthrough.formId}
              pokemonName={currentResearchBreakthrough.pokemonName}
              newLevel={currentResearchBreakthrough.newLevel}
              skillXpGranted={currentResearchBreakthrough.skillXpGranted}
              onClose={() => {
                const next = researchBreakthroughsToReveal[0]
                setCurrentResearchBreakthrough(next || null)
                setResearchBreakthroughsToReveal(
                  researchBreakthroughsToReveal.slice(1),
                )
              }}
            />
          )}
          {showCardReveal && (
            <CardRevealErrorBoundary
              onSkip={() => {
                setShowCardReveal(false)
              }}
            >
              <Suspense
                fallback={
                  <div className="p-8 text-center" role="status" aria-live="polite">
                    Preparing battle cards…
                  </div>
                }
              >
                <CardDrawReveal
                  cards={cardsToReveal as TcgCard[]}
                  onComplete={() => setShowCardReveal(false)}
                />
              </Suspense>
            </CardRevealErrorBoundary>
          )}
          {taskExitModalData && (
            <TaskExitDialog
              data={taskExitModalData}
              open={showTaskExitModal}
              onOpenChange={setShowTaskExitModal}
            />
          )}
          <GameResult
            success={battleState.status === 'won'}
            title={battleState.status === 'won' ? 'VICTORY!' : 'DEFEAT...'}
            message={
              battleState.status === 'won'
                ? `You defeated ${battleState.isWildBattle ? 'the wild Pokemon' : battleState.enemyName}!`
                : `You were defeated by ${battleState.enemyName}...`
            }
            rewardSummary={battleState.rewards}
            icon={resultIcon}
            iconAlt={battleState.enemyName}
            titleColor={
              battleState.status === 'won' ? 'text-game-ochre' : 'text-game-danger'
            }
            additionalContent={
              expeditionProgress ? (
                <div className="rounded-lg border border-game-moss/30 bg-game-moss/10 p-3 text-center">
                  <p className="text-[11px] font-black uppercase tracking-wide text-game-moss-strong">
                    {expeditionProgress.expeditionName || 'Expedition'}
                  </p>
                  {expeditionProgress.progressed ? (
                    expeditionProgress.status === 'ready_to_claim' ? (
                      <p className="mt-1 text-sm text-game-ink">
                        You've Completed the Expedition! Time to claim your
                        rewards.
                      </p>
                    ) : (
                      <p className="mt-1 text-sm text-game-ink">
                        You've Made Progress.
                      </p>
                    )
                  ) : expeditionProgress.status === 'failed' ? (
                    <p className="mt-1 text-sm text-game-danger">
                      You've Failed the Expedition.
                    </p>
                  ) : expeditionProgress.canFail === false ? (
                    <p className="mt-1 text-sm text-game-ink">
                      Try the step again to continue.
                    </p>
                  ) : (
                    <>
                      <p className="mt-1 text-sm text-game-ink">
                        You've Lost a Life.
                      </p>
                      <p className="mt-1 inline-flex w-full items-center justify-center gap-1.5 text-sm text-game-ink">
                        <Heart className="w-4 h-4 text-game-danger" />
                        Lives left: {expeditionProgress.livesLeft}/
                        {expeditionProgress.maxLosses}.
                      </p>
                    </>
                  )}
                </div>
              ) : undefined
            }
            onReturn={async () => {
              await clearBattleState()
              refreshUser(true)
              router.replace('/game/explore')
            }}
            secondaryAction={
              (battleState as any).isEligibleForReplay ? (
                <Button
                  size="lg"
                  type="button"
                  disabled={isReplayLoading}
                  aria-busy={isReplayLoading}
                  onClick={async () => {
                    setIsReplayLoading(true)
                    try {
                      const { startBattle } = await import('../actions')
                      const res = await startBattle(battleState.battleId)
                      if (res?.success) {
                        window.location.reload()
                      } else {
                        router.push('/game/explore')
                      }
                    } catch (e) {
                      router.push('/game/explore')
                    } finally {
                      setIsReplayLoading(false)
                    }
                  }}
                  className="game-accent-button w-full border border-game-moss/60 bg-game-moss font-bold shadow-sm transition-colors hover:bg-game-moss-strong"
                >
                  {isReplayLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Starting…
                    </>
                  ) : (
                    'Play Again'
                  )}
                </Button>
              ) : undefined
            }
          />
        </div>
      )}
    </BattleProvider>
  )
}
