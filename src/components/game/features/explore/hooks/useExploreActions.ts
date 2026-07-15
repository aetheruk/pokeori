import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAudio } from '@/context/AudioContext'
import { checkRequirement } from '@/utilities/requirements'
import {
  completeTask,
  type CompleteTaskResult,
} from '@/utilities/tasks/actions'
import { completeVoyage } from '@/utilities/voyages/actions'
import {
  abandonExpedition,
  chooseExpeditionBranch,
  claimExpeditionRewards,
  completeCurrentUserExpeditionTaskStep,
  failCurrentUserExpeditionTaskStep,
  startExpedition,
} from '@/utilities/expeditions/actions'
import { startEncounter } from '@/app/(frontend)/game/locations/encounter/actions'
import { startResearchEncounter } from '@/app/(frontend)/game/research/actions'
import {
  startBattle,
  startVsSeekerBattle,
} from '@/app/(frontend)/game/battles/actions'
import { tasks } from '@/data/tasks'
import { expeditions } from '@/data/expeditions'
import type { RequirementData } from '@/utilities/requirements'
import type { ExploreItem } from '../types'
import { ShopConfig } from '@/data/shops/types'
import { VoyageConfig } from '@/data/voyages/types'
import { markExpeditionReturn } from '../expedition-return'

export function useExploreActions(
  userData: RequirementData | null,
  refreshUser: () => void,
) {
  const router = useRouter()
  const { playSfx, resumeMusic } = useAudio()

  const [loadingId, setLoadingId] = useState<string | null>(null)

  // Modal States managed here to keep main component clean
  const [selectedItem, setSelectedItem] = useState<ExploreItem | null>(null)
  const [activeShop, setActiveShop] = useState<ShopConfig | null>(null)
  const [activeVoyage, setActiveVoyage] = useState<VoyageConfig | null>(null)
  const [voyageRewardResult, setVoyageRewardResult] = useState<any | null>(null)
  const [expeditionRewardResult, setExpeditionRewardResult] = useState<
    any | null
  >(null)
  const [isAbandonExpeditionConfirmOpen, setIsAbandonExpeditionConfirmOpen] =
    useState(false)

  // Task States
  const [completionResult, setCompletionResult] =
    useState<CompleteTaskResult | null>(null)
  const [lastCompletedTask, setLastCompletedTask] = useState<any | null>(null)
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false)
  const [selectedTaskForCompletion, setSelectedTaskForCompletion] = useState<
    any | null
  >(null)
  const [exitModalData, setExitModalData] = useState<any | null>(null)
  const [isExitModalOpen, setIsExitModalOpen] = useState(false)
  const [completingTaskId, setCompletingTaskId] = useState<string | null>(null)
  const [enterModalTask, setEnterModalTask] = useState<any | null>(null)
  const [isEnterModalOpen, setIsEnterModalOpen] = useState(false)
  const [expeditionEnterModalTaskId, setExpeditionEnterModalTaskId] = useState<
    string | null
  >(null)

  const getExpeditionLabel = (expeditionId?: string | null) =>
    expeditionId &&
    expeditions.find((entry) => entry.id === expeditionId)?.chronicle
      ? 'Chronicle'
      : 'Expedition'
  const getExpeditionPathLabel = (expeditionId?: string | null) =>
    expeditionId &&
    expeditions.find((entry) => entry.id === expeditionId)?.chronicle
      ? 'chronicle'
      : 'route'
  const [rivalSelectionTask, setRivalSelectionTask] = useState<any | null>(null)
  const [isRivalSelectionOpen, setIsRivalSelectionOpen] = useState(false)

  // Research State
  const [researchSelectionModalOpen, setResearchSelectionModalOpen] =
    useState(false)
  const [selectedResearchEncounter, setSelectedResearchEncounter] = useState<
    any | null
  >(null)

  // Selection State (New)
  const [selectedPokemonIds, setSelectedPokemonIds] = useState<string[]>([])
  const [selectedRepelItemId, setSelectedRepelItemId] = useState<string | null>(null)

  // PVP State
  const [pvpConfigId, setPvpConfigId] = useState<string | null>(null)
  const [showPvpModal, setShowPvpModal] = useState(false)
  const [showQueueModal, setShowQueueModal] = useState(false)

  const playSelectSfx = () => playSfx('select')

  const togglePokemonSelection = (id: string, max: number) => {
    setSelectedPokemonIds((prev) => {
      if (prev.includes(id)) return prev.filter((pid) => pid !== id)
      if (prev.length >= max) return prev
      return [...prev, id]
    })
  }

  const handleCompleteVoyage = async (voyageId: string) => {
    setLoadingId(voyageId)
    try {
      const result = await completeVoyage(voyageId)
      if (result.success) {
        refreshUser()
        setSelectedItem(null)
        setVoyageRewardResult({ ...result, voyageId })
      } else {
        toast.error(result.message || 'Failed to complete voyage')
      }
    } catch (e) {
      toast.error('An error occurred')
    } finally {
      setLoadingId(null)
    }
  }

  const checkResearchPokemonConsumption = (encounter: any) => {
    if (!encounter.criteria) return false
    return encounter.criteria.some(
      (c: any) => c.type === 'pokemon_owned' && c.consume,
    )
  }

  const getActiveExpeditionRun = () => {
    return (userData as any)?.activeExpedition || null
  }

  const buildTaskExploreItem = (
    taskId: string,
    fromExpeditionTaskStep = false,
  ): ExploreItem | null => {
    const taskDefinition = tasks.find((task) => task.id === taskId)
    if (!taskDefinition) {
      return null
    }

    return {
      ...taskDefinition,
      type: 'task',
      originalData: taskDefinition,
      fromExpeditionTaskStep,
    } as ExploreItem
  }

  const handleStartExpedition = async (expeditionId: string) => {
    const expeditionLabel = getExpeditionLabel(expeditionId)
    setLoadingId(expeditionId)
    try {
      const result = await startExpedition(expeditionId)
      if (!result.success) {
        toast.error(result.message || `Failed to start ${expeditionLabel.toLowerCase()}`)
        return
      }

      refreshUser()
      toast.success(`${expeditionLabel} started`)
    } catch (error) {
      toast.error(`Failed to start ${expeditionLabel.toLowerCase()}`)
    } finally {
      setLoadingId(null)
    }
  }

  const handleClaimExpeditionRewards = async (expeditionId: string) => {
    const expeditionLabel = getExpeditionLabel(expeditionId)
    setLoadingId(expeditionId)
    try {
      const result = await claimExpeditionRewards(expeditionId)
      if (!result.success) {
        toast.error(
          result.message ||
            `Failed to claim ${expeditionLabel.toLowerCase()} rewards`,
        )
        return
      }

      setExpeditionRewardResult({
        ...result,
        rewards: (result as any).rewards || (result as any).summary,
        expeditionId,
      })
      setSelectedItem(null)
      refreshUser()
    } catch (error) {
      toast.error(`Failed to claim ${expeditionLabel.toLowerCase()} rewards`)
    } finally {
      setLoadingId(null)
    }
  }

  const handleAbandonExpedition = async () => {
    const activeRun = getActiveExpeditionRun()
    const expeditionLabel = getExpeditionLabel(activeRun?.expeditionId)
    if (!activeRun) {
      setIsAbandonExpeditionConfirmOpen(false)
      toast.error(`No active ${expeditionLabel.toLowerCase()} to abandon`)
      return
    }

    setLoadingId(activeRun.expeditionId)
    try {
      const result = await abandonExpedition()
      if (!result.success) {
        toast.error(
          result.message || `Failed to abandon ${expeditionLabel.toLowerCase()}`,
        )
        return
      }

      refreshUser()
      toast.success(`${expeditionLabel} abandoned`)
      setIsAbandonExpeditionConfirmOpen(false)
      setSelectedItem(null)
    } catch (error) {
      toast.error(`Failed to abandon ${expeditionLabel.toLowerCase()}`)
    } finally {
      setLoadingId(null)
    }
  }

  const handleRequestAbandonExpedition = () => {
    const activeRun = getActiveExpeditionRun()
    const expeditionLabel = getExpeditionLabel(activeRun?.expeditionId)
    if (!activeRun) {
      toast.error(`No active ${expeditionLabel.toLowerCase()} to abandon`)
      return
    }

    setIsAbandonExpeditionConfirmOpen(true)
  }

  const handleStartExpeditionStep = async (expeditionId: string) => {
    const activeRun = getActiveExpeditionRun()
    const expeditionLabel = getExpeditionLabel(expeditionId)
    const expeditionLabelLower = expeditionLabel.toLowerCase()
    const pathLabel = getExpeditionPathLabel(expeditionId)

    if (!activeRun || activeRun.expeditionId !== expeditionId) {
      toast.error(`No active ${expeditionLabelLower} for this ${pathLabel}`)
      return
    }

    if (activeRun.status !== 'active') {
      toast.error(`${expeditionLabel} is not in progress`)
      return
    }

    const currentStep = activeRun.steps?.[activeRun.currentStepIndex]
    if (!currentStep) {
      toast.error(`No ${expeditionLabelLower} step available`)
      return
    }

    const currentStepType = currentStep.type || 'activity'
    if (currentStepType === 'branch_choice') {
      toast.error(`Choose a branch in the ${pathLabel} path first`)
      return
    }

    if (currentStepType === 'result_branch') {
      toast.error(`Complete the previous ${expeditionLabelLower} step first`)
      return
    }

    if (!currentStep.activityType || !currentStep.activityId) {
      toast.error(`Current ${expeditionLabelLower} step is invalid`)
      return
    }

    setLoadingId(expeditionId)

    try {
      if (currentStep.activityType === 'location') {
        const result = await startEncounter(currentStep.activityId)
        if (result.success) {
          markExpeditionReturn(expeditionId)
          router.push('/game/locations/encounter')
          return
        }

        toast.error(`Failed to start ${expeditionLabelLower} location step`)
        return
      }

      if (currentStep.activityType === 'battle') {
        const result = await startBattle(currentStep.activityId)
        if (result.success) {
          markExpeditionReturn(expeditionId)
          router.push('/game/battles/encounter')
          return
        }

        if (result.error === 'PVP_FRIENDLY') {
          setPvpConfigId(currentStep.activityId)
          setShowPvpModal(true)
        } else if (result.error === 'PVP_RANKED') {
          setPvpConfigId(currentStep.activityId)
          setShowQueueModal(true)
        } else {
          toast.error(
            result.error || `Failed to start ${expeditionLabelLower} battle step`,
          )
        }

        return
      }

      if (currentStep.activityType === 'research') {
        const result = await startResearchEncounter(currentStep.activityId)
        if (result.success) {
          markExpeditionReturn(expeditionId)
          router.push('/game/research/encounter')
          return
        }

        toast.error(
          result.error || `Failed to start ${expeditionLabelLower} minigame step`,
        )
        return
      }

      if (currentStep.activityType === 'task') {
        const taskExploreItem = buildTaskExploreItem(
          currentStep.activityId,
          true,
        )
        if (!taskExploreItem) {
          toast.error(`Task definition not found for ${expeditionLabelLower} step`)
          return
        }

        setExpeditionEnterModalTaskId(currentStep.activityId)
        setEnterModalTask(null)
        setIsEnterModalOpen(false)
        setSelectedItem(taskExploreItem)

        return
      }
    } catch (error) {
      toast.error(`Failed to start ${expeditionLabelLower} step`)
    } finally {
      setLoadingId(null)
    }
  }

  const handleChooseExpeditionBranch = async (
    expeditionId: string,
    branchNodeStepId: string,
    branchId: string,
  ) => {
    setLoadingId(expeditionId)
    try {
      const result = await chooseExpeditionBranch(
        expeditionId,
        branchNodeStepId,
        branchId,
      )
      if (!result.success) {
        toast.error(result.message || 'Failed to choose branch')
        return
      }

      refreshUser()
      toast.success('Branch selected')
    } catch (error) {
      toast.error('Failed to choose branch')
    } finally {
      setLoadingId(null)
    }
  }

  const handleAction = async (item: any) => {
    if (!userData?.user) return

    resumeMusic()
    playSelectSfx()

    // Task Logic
    if (item.type === 'task') {
      const task = item.originalData
      const isExpeditionTaskFlow =
        Boolean((item as any).fromExpeditionTaskStep) ||
        expeditionEnterModalTaskId === task.id

      if (!isExpeditionTaskFlow && expeditionEnterModalTaskId) {
        setExpeditionEnterModalTaskId(null)
      }

      const existingCompletion = userData.completedTasks.find(
        (t) => t.taskId === task.id,
      )
      const isDone = !!existingCompletion
      const isDoneForModalFlow = isDone && !isExpeditionTaskFlow
      const isCompletedExpeditionReplay = isExpeditionTaskFlow && isDone

      if (task.rivalSelection && !isDoneForModalFlow) {
        if (isExpeditionTaskFlow) {
          setExpeditionEnterModalTaskId(task.id)
        } else {
          setExpeditionEnterModalTaskId(null)
        }
        setRivalSelectionTask(task)
        setIsRivalSelectionOpen(true)
        return
      }

      if (task.enterModal && task.enterModal.length > 0 && !isDoneForModalFlow) {
        if (isExpeditionTaskFlow) {
          setExpeditionEnterModalTaskId(task.id)
        } else {
          setExpeditionEnterModalTaskId(null)
        }
        setEnterModalTask(task)
        setIsEnterModalOpen(true)
        return
      }

      if (task.chat && task.exitModal && !isDoneForModalFlow) {
        setExitModalData(task.exitModal)
        setIsExitModalOpen(true)
        setCompletingTaskId(task.id)
        try {
          const result =
            isCompletedExpeditionReplay
              ? await completeCurrentUserExpeditionTaskStep(task.id)
              : await completeTask(task.id)
          if (result.success) {
            if (isExpeditionTaskFlow) {
              markExpeditionReturn(getActiveExpeditionRun()?.expeditionId)
            }
            refreshUser()
          } else toast.error(result.message || 'Failed to complete task')
        } catch (e) {
          toast.error('Error completing task')
        } finally {
          if (isExpeditionTaskFlow) {
            setExpeditionEnterModalTaskId(null)
          }
          setCompletingTaskId(null)
        }
        return
      }

      if (isDoneForModalFlow && !task.repeatable && task.exitModal) {
        setExitModalData(task.exitModal)
        setIsExitModalOpen(true)
        if (isExpeditionTaskFlow) {
          setExpeditionEnterModalTaskId(null)
        }
        return
      }

      if (
        !isCompletedExpeditionReplay &&
        task.criteria &&
        task.criteria.length > 0 &&
        !task.criteria.every((c: any) =>
          checkRequirement(userData, c, {
            category: task.category,
            subCategory: task.subCategory,
          }),
        )
      ) {
        toast.error('Criteria not met')
        return
      }

      const needsSelection = task.criteria?.some(
        (c: any) => c.type === 'pokemon_owned' && c.consume,
      )

      if (needsSelection && !isCompletedExpeditionReplay) {
        // Now handled inline in GameInfoModal via ExploreModalContent and ActionButton
        // We just keep the selectedItem open.
        return
      }

      setCompletingTaskId(task.id)
      try {
        const result =
          isCompletedExpeditionReplay
            ? await completeCurrentUserExpeditionTaskStep(task.id)
            : await completeTask(task.id)
        if (result.success) {
          if (isExpeditionTaskFlow) {
            markExpeditionReturn(getActiveExpeditionRun()?.expeditionId)
          }
          if (!task.chat) setCompletionResult(result)
          setSelectedItem(null)
          setLastCompletedTask(task) // Store task object
          refreshUser()
          if (task.chat && task.exitModal) {
            setExitModalData(task.exitModal)
            setIsExitModalOpen(true)
          }
        } else {
          toast.error(result.message || 'Failed to complete task')
        }
      } catch (e) {
        toast.error('Error completing task')
      } finally {
        if (isExpeditionTaskFlow) {
          setExpeditionEnterModalTaskId(null)
        }
        setCompletingTaskId(null)
      }
      return
    }

    // Voyage Logic
    if (item.type === 'voyage') {
      const voyage = item.originalData

      // Check if voyage is active and finished
      const userAny = userData.user as any
      const activeVoyages = (userAny.activeVoyages || []) as {
        voyageId: string
        endTime: string
      }[]

      const activeVoyage = activeVoyages.find((v) => v.voyageId === voyage.id)

      if (activeVoyage) {
        const endTime = new Date(activeVoyage.endTime).getTime()
        const now = Date.now()

        if (now >= endTime) {
          // It's finished, claim immediately
          handleCompleteVoyage(voyage.id)
          return
        }
      }

      setActiveVoyage(voyage)
      return
    }

    // Expedition Logic
    if (item.type === 'expedition') {
      const activeRun = getActiveExpeditionRun()

      if (activeRun) {
        if (activeRun.expeditionId !== item.id) {
          toast.error(
            `You already have an active ${getExpeditionLabel(
              activeRun.expeditionId,
            ).toLowerCase()}`,
          )
          return
        }

        if (activeRun.status === 'ready_to_claim') {
          await handleClaimExpeditionRewards(item.id)
          return
        }

        await handleStartExpeditionStep(item.id)
        return
      }

      await handleStartExpedition(item.id)
      return
    }

    // Shop Logic
    if (item.type === 'shop') {
      setActiveShop(item.originalData)
      return
    }

    if (item.type === 'vs-seeker') {
      setLoadingId(item.id)
      try {
        const result = await startVsSeekerBattle()
        if (result.success) {
          router.push(result.redirect || '/game/battles/encounter')
        } else {
          toast.error(result.error || 'Failed to start VS Seeker battle')
          setLoadingId(null)
        }
      } catch {
        toast.error('Error starting VS Seeker battle')
        setLoadingId(null)
      }
      return
    }

    // Check Requirements
    if (
      item.requirements &&
      !item.requirements.every((r: any) =>
        checkRequirement(userData, r, { category: item.category, subCategory: item.subCategory }),
      )
    ) {
      toast.error('Requirements not met')
      return
    }
    if (
      item.criteria &&
      !item.criteria.every((c: any) =>
        checkRequirement(userData, c, { category: item.category, subCategory: item.subCategory }),
      )
    ) {
      toast.error('Criteria not met')
      return
    }

    setLoadingId(item.id)

    switch (item.type) {
      case 'location':
        try {
          const result = await startEncounter(
            item.id,
            undefined,
            item.selectedRepelItemId ? { repelItemId: item.selectedRepelItemId } : undefined,
          )
          if (result.success) {
            router.push(`/game/locations/encounter`)
          } else {
            toast.error('Failed to start encounter')
            setLoadingId(null)
          }
        } catch (e) {
          toast.error('An error occurred')
          setLoadingId(null)
        }
        break

      case 'research':
        try {
          const encounter = item.originalData
          if (checkResearchPokemonConsumption(encounter)) {
            // Now handled inline in GameInfoModal
            return
          }
          const result = await startResearchEncounter(item.id)
          if (result.success) {
            router.push(`/game/research/encounter`)
          } else {
            toast.error(result.error || 'Failed to start encounter')
            setLoadingId(null)
          }
        } catch (e) {
          toast.error('An error occurred')
          setLoadingId(null)
        }
        break

      case 'battle':
        try {
          const result = await startBattle(item.id)
          if (result.success) {
            router.push('/game/battles/encounter')
          } else {
            if (result.error === 'PVP_FRIENDLY') {
              setPvpConfigId(item.id)
              setShowPvpModal(true)
            } else if (result.error === 'PVP_RANKED') {
              setPvpConfigId(item.id)
              setShowQueueModal(true)
            } else {
              toast.error(result.error || 'Failed to start battle')
            }
            setLoadingId(null)
          }
        } catch (e) {
          toast.error('Error starting battle')
          setLoadingId(null)
        }
        break

      default:
        if (process.env.NODE_ENV === 'development')
          console.warn('Unknown item type:', item?.type)
        setLoadingId(null)
    }
  }

  const handleEnterModalFail = async () => {
    const failedTaskId = expeditionEnterModalTaskId

    setIsEnterModalOpen(false)
    setEnterModalTask(null)

    if (!failedTaskId) {
      setSelectedItem(null)
      return
    }

    const activeRun = getActiveExpeditionRun()
    const expeditionId = activeRun?.expeditionId
    const expeditionLabel = getExpeditionLabel(expeditionId)
    const expeditionLabelLower = expeditionLabel.toLowerCase()
    setExpeditionEnterModalTaskId(null)

    if (expeditionId) {
      setLoadingId(expeditionId)
    }

    try {
      const result = await failCurrentUserExpeditionTaskStep(failedTaskId)
      if (!result.success) {
        toast.error(
          result.message ||
            `Failed to record ${expeditionLabelLower} step failure`,
        )
        return
      }

      refreshUser()

      if (result.expedition?.status === 'failed') {
        toast.error(`${expeditionLabel} failed. You are out of lives.`)
      } else if (result.expedition?.canFail === false) {
        toast.error(`${expeditionLabel} step can be retried.`)
      } else if (result.expedition) {
        toast.error(
          `${expeditionLabel} step failed. Lives left: ${result.expedition.livesLeft}/${result.expedition.maxLosses}.`,
        )
      } else {
        toast.error(`${expeditionLabel} step failed`)
      }
    } catch (error) {
      toast.error(`Failed to record ${expeditionLabelLower} step failure`)
    } finally {
      setLoadingId(null)
      setSelectedItem(null)
    }
  }

  const handleResearchSelectionSuccess = async (
    selectedPokemonIds: string[],
  ) => {
    if (!selectedResearchEncounter) return
    setLoadingId(selectedResearchEncounter.id)

    try {
      const result = await startResearchEncounter(
        selectedResearchEncounter.id,
        false,
        selectedPokemonIds,
      )
      if (result.success) {
        router.push(`/game/research/encounter`)
      } else {
        toast.error(result.error || 'Failed to start encounter')
        setLoadingId(null)
        setResearchSelectionModalOpen(false)
      }
    } catch (e) {
      toast.error('An error occurred')
      setLoadingId(null)
      setResearchSelectionModalOpen(false)
    }
  }

  const handleConfirmTaskWithSelection = async (
    task: any,
    totalRequired: number,
  ) => {
    if (selectedPokemonIds.length !== totalRequired) {
      toast.error(`Please select exactly ${totalRequired} Pokemon.`)
      return
    }

    const shouldClearExpeditionContext = expeditionEnterModalTaskId === task.id

    setCompletingTaskId(task.id)
    try {
      const result = await completeTask(task.id, selectedPokemonIds)
      if (result.success) {
        if (shouldClearExpeditionContext) {
          markExpeditionReturn(getActiveExpeditionRun()?.expeditionId)
        }
        setCompletionResult(result)
        setSelectedItem(null)
        setLastCompletedTask(task)
        setSelectedTaskForCompletion(null)
        setIsSelectionModalOpen(false)
        refreshUser()
        setSelectedPokemonIds([])
      } else {
        toast.error(result.message || 'Failed to complete task')
      }
    } catch (e) {
      toast.error('Error completing task')
    } finally {
      if (shouldClearExpeditionContext) {
        setExpeditionEnterModalTaskId(null)
      }
      setCompletingTaskId(null)
    }
  }

  const handleConfirmEncounterWithSelection = async (
    encounter: any,
    totalRequired: number,
    type?: string,
  ) => {
    if (selectedPokemonIds.length !== totalRequired) {
      toast.error(`Please select exactly ${totalRequired} Pokemon.`)
      return
    }

    setLoadingId(encounter.id)
    try {
      let result: any
      let redirectPath = ''

      if (type === 'location') {
        result = await startEncounter(
          encounter.id,
          selectedPokemonIds,
          encounter.selectedRepelItemId ? { repelItemId: encounter.selectedRepelItemId } : undefined,
        )
        redirectPath = `/game/locations/encounter`
      } else if (type === 'battle') {
        result = await startBattle(encounter.id, selectedPokemonIds)
        redirectPath = '/game/battles/encounter'
      } else {
        result = await startResearchEncounter(
          encounter.id,
          false,
          selectedPokemonIds,
        )
        redirectPath = `/game/research/encounter`
      }

      if (result.success) {
        router.push(redirectPath)
      } else {
        if (
          type === 'battle' &&
          (result.error === 'PVP_FRIENDLY' || result.error === 'PVP_RANKED')
        ) {
          if (result.error === 'PVP_FRIENDLY') {
            setPvpConfigId(encounter.id)
            setShowPvpModal(true)
          } else {
            setPvpConfigId(encounter.id)
            setShowQueueModal(true)
          }
        } else {
          toast.error(result.error || 'Failed to start encounter')
        }
      }
    } catch (e) {
      toast.error('An error occurred')
    } finally {
      setLoadingId(null)
    }
  }

  return {
    loadingId,
    setLoadingId,
    selectedItem,
    setSelectedItem: (item: ExploreItem | null) => {
      setSelectedItem(item)
      if (!item) {
        setExpeditionEnterModalTaskId(null)
        setRivalSelectionTask(null)
        setIsRivalSelectionOpen(false)
      }
      if (item) {
        setSelectedPokemonIds([])
        setSelectedRepelItemId(null)
      }
    },
    activeShop,
    setActiveShop,
    activeVoyage,
    setActiveVoyage,
    voyageRewardResult,
    setVoyageRewardResult,
    expeditionRewardResult,
    setExpeditionRewardResult,
    isAbandonExpeditionConfirmOpen,
    setIsAbandonExpeditionConfirmOpen,
    completionResult,
    setCompletionResult,
    lastCompletedTask,
    setLastCompletedTask,
    isSelectionModalOpen,
    setIsSelectionModalOpen,
    selectedTaskForCompletion,
    setSelectedTaskForCompletion,
    selectedPokemonIds,
    setSelectedPokemonIds,
    selectedRepelItemId,
    setSelectedRepelItemId,
    togglePokemonSelection,
    handleConfirmTaskWithSelection,
    handleConfirmEncounterWithSelection,
    exitModalData,
    setExitModalData,
    isExitModalOpen,
    setIsExitModalOpen,
    completingTaskId,
    setCompletingTaskId,
    enterModalTask,
    setEnterModalTask,
    isEnterModalOpen,
    setIsEnterModalOpen,
    expeditionEnterModalTaskId,
    setExpeditionEnterModalTaskId,
    rivalSelectionTask,
    setRivalSelectionTask,
    isRivalSelectionOpen,
    setIsRivalSelectionOpen,
    researchSelectionModalOpen,
    setResearchSelectionModalOpen,
    selectedResearchEncounter,
    setSelectedResearchEncounter,
    pvpConfigId,
    setPvpConfigId,
    showPvpModal,
    setShowPvpModal,
    showQueueModal,
    setShowQueueModal,
    handleAction,
    handleCompleteVoyage,
    handleAbandonExpedition,
    handleRequestAbandonExpedition,
    handleClaimExpeditionRewards,
    handleChooseExpeditionBranch,
    handleStartExpeditionStep,
    handleEnterModalFail,
    handleResearchSelectionSuccess,
    playSelectSfx,
  }
}
