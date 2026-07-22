'use client'

import { Suspense, useMemo } from 'react'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { GameLoadingState } from '@/components/game/shared/GameLoadingState'
import { GameInfoModal } from '@/components/game/shared/GameInfoModal'
import { ItemSprite } from '@/components/ui/item-sprite'
import { ExpeditionModal } from './ExpeditionModal'
import { parseText } from '@/utilities/text-parsing'
import {
  getRequirementProgress,
  type RequirementData,
} from '@/utilities/requirements'
import { mapCriteriaToDisplayItem } from '@/components/game/shared/criteria-mapping'
import { getCurrency } from '@/data/currencies'
import { getGameTypeLabel } from './utils'
import type { ExploreItem } from './types'
import { getExploreItemBackground, getExploreItemIcon } from './rival-display'
import {
  ActionButton,
  ExploreModalContent,
  getFormattedProperties,
  getFormattedRewards,
  getFormattedStats,
  getTaskProgressForModal,
} from './ExploreModalHelpers'

interface ActiveVoyage {
  voyageId: string
  endTime: string
}

interface ExploreDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: ExploreItem
  userData: RequirementData
  trainerName: string
  activeVoyages: ActiveVoyage[]
  activeExpedition: any
  selectedPokemonIds: string[]
  togglePokemonSelection: (id: string, max: number) => void
  selectedRepelItemId: string | null
  setSelectedRepelItemId: (itemId: string | null) => void
  handleConfirmTaskWithSelection: (task: any, totalRequired: number) => void
  handleConfirmEncounterWithSelection: (
    encounter: any,
    totalRequired: number,
    type?: string,
  ) => void
  loadingId: string | null
  handleAction: (item: ExploreItem) => void
  handleCompleteVoyage: (voyageId: string) => void
  handleClaimExpeditionRewards: (expeditionId: string) => void
  completingTaskId: string | null
  onChooseBranch?: (
    expeditionId: string,
    branchNodeStepId: string,
    branchId: string,
  ) => void
  onRequestAbandonExpedition?: () => void
}

export function ExploreDetailsModal({
  open,
  onOpenChange,
  item,
  userData,
  trainerName,
  activeVoyages,
  activeExpedition,
  selectedPokemonIds,
  togglePokemonSelection,
  selectedRepelItemId,
  setSelectedRepelItemId,
  handleConfirmTaskWithSelection,
  handleConfirmEncounterWithSelection,
  loadingId,
  handleAction,
  handleCompleteVoyage,
  handleClaimExpeditionRewards,
  completingTaskId,
  onChooseBranch,
  onRequestAbandonExpedition,
}: ExploreDetailsModalProps) {
  const itemForModal = useMemo(
    () => ({
      ...item,
      selectedPokemonIds,
      togglePokemonSelection,
      selectedRepelItemId,
      setSelectedRepelItemId,
      handleConfirmTaskWithSelection,
      handleConfirmEncounterWithSelection,
      activeExpeditionRun:
        item.type === 'expedition' &&
        activeExpedition &&
        activeExpedition.expeditionId === item.id
          ? activeExpedition
          : undefined,
    }),
    [
      item,
      selectedPokemonIds,
      togglePokemonSelection,
      selectedRepelItemId,
      setSelectedRepelItemId,
      handleConfirmTaskWithSelection,
      handleConfirmEncounterWithSelection,
      activeExpedition,
    ],
  )

  const selectedActiveVoyage = useMemo(
    () => activeVoyages.find((voyage) => voyage.voyageId === item.id),
    [activeVoyages, item.id],
  )
  const isSelectedVoyageFinished = selectedActiveVoyage
    ? new Date(selectedActiveVoyage.endTime).getTime() <= Date.now()
    : false
  const selectedActiveExpedition =
    item.type === 'expedition' &&
    activeExpedition &&
    activeExpedition.expeditionId === item.id
      ? activeExpedition
      : undefined
  const selectedExpeditionResult =
    item.type === 'expedition'
      ? (userData.expeditionResults || []).find(
          (result) => result.expeditionId === item.id,
        )
      : undefined

  const completedTasks = useMemo(
    () => userData.completedTasks || [],
    [userData.completedTasks],
  )

  const criteria = useMemo(() => {
    const criteriaItems =
      item.criteria?.map((condition: any) => {
        const progress = getRequirementProgress(userData, condition, {
          category: item.category,
          subCategory: item.subCategory,
        })

        return {
          ...mapCriteriaToDisplayItem(condition, {
            category: item.category,
            subCategory: item.subCategory,
          }),
          completed: progress.completed,
          progress:
            progress.target > 1
              ? {
                  current: progress.current,
                  max: progress.target,
                }
              : undefined,
        }
      }) || []

    const cost =
      item.originalData?.gameType === 'prize-wheel'
        ? item.originalData.settings?.cost
        : undefined
    if (cost) {
      const currency = getCurrency(cost.currencyType)
      const balance =
        (
          userData.currency as
            | Record<string, number | null | undefined>
            | undefined
        )?.[cost.currencyType] ??
        (
          (userData.user as any).currency as
            | Record<string, number | null | undefined>
            | undefined
        )?.[cost.currencyType] ??
        0

      criteriaItems.push({
        icon: currency?.iconId ? (
          <ItemSprite
            itemId={currency.iconId}
            alt={currency.name}
            className="h-8 w-8"
          />
        ) : (
          <TaskIconDisplay
            icon={{ type: 'item', id: 'scrip' }}
            className="h-8 w-8"
          />
        ),
        label: `${currency?.name || cost.currencyType} x${cost.amount}`,
        subLabel: 'Spin Cost',
        completed: balance >= cost.amount,
        progress:
          cost.amount > 1
            ? {
                current: Math.min(balance, cost.amount),
                max: cost.amount,
              }
            : undefined,
      })
    }

    return criteriaItems.length > 0 ? criteriaItems : undefined
  }, [item.category, item.criteria, item.originalData, userData])

  const rewards = useMemo(
    () => getFormattedRewards(itemForModal, userData, completedTasks),
    [itemForModal, userData, completedTasks],
  )

  const properties = useMemo(
    () => getFormattedProperties(itemForModal),
    [itemForModal],
  )
  const stats = useMemo(
    () => getFormattedStats(itemForModal, userData),
    [itemForModal, userData],
  )
  const taskProgress = useMemo(
    () => getTaskProgressForModal(itemForModal, userData),
    [itemForModal, userData],
  )

  const actionButton = useMemo(
    () => (
      <ActionButton
        item={itemForModal}
        userData={userData}
        loadingId={loadingId}
        handleAction={handleAction}
        handleCompleteVoyage={handleCompleteVoyage}
        handleClaimExpeditionRewards={handleClaimExpeditionRewards}
        selectedActiveVoyage={selectedActiveVoyage}
        isSelectedVoyageFinished={isSelectedVoyageFinished}
        selectedActiveExpedition={selectedActiveExpedition}
        completingTaskId={completingTaskId}
      />
    ),
    [
      itemForModal,
      userData,
      loadingId,
      handleAction,
      handleCompleteVoyage,
      handleClaimExpeditionRewards,
      selectedActiveVoyage,
      isSelectedVoyageFinished,
      selectedActiveExpedition,
      completingTaskId,
    ],
  )

  const title = parseText(item.name, trainerName)
  const description = parseText(item.description, trainerName)
  const sourceHint = (itemForModal.originalData as any)?.dailyMetadata?.sourceHint as
    | string
    | undefined
  const bonusLabel = (itemForModal.originalData as any)?.dailyMetadata?.isBonus
    ? 'Daily Bonus · 25 Professor Scrip'
    : undefined
  const modalIcon = getExploreItemIcon(item, userData)
  const modalBackground = getExploreItemBackground(item, userData)

  if (item.type === 'expedition') {
    return (
      <ExpeditionModal
        open={open}
        onOpenChange={onOpenChange}
        item={{
          ...itemForModal,
          name: title,
          description,
        }}
        activeRun={selectedActiveExpedition}
        expeditionResult={selectedExpeditionResult}
        rewards={rewards}
        criteria={criteria}
        actionButton={actionButton}
        loadingId={loadingId}
        onChooseBranch={onChooseBranch}
        onRequestAbandonExpedition={onRequestAbandonExpedition}
      />
    )
  }

  return (
    <GameInfoModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      category={getGameTypeLabel(item)}
      description={description}
      sourceHint={sourceHint}
      bonusLabel={bonusLabel}
      background={modalBackground}
      icon={<TaskIconDisplay icon={modalIcon} className="w-8 h-8" />}
      rewards={rewards}
      criteria={criteria}
      properties={properties}
      stats={stats}
      taskProgress={taskProgress}
      actionButton={actionButton}
      autoScrollRewards={false}
      presentation="drawer"
    >
      <Suspense fallback={<GameLoadingState label="Loading activity details" />}>
        <ExploreModalContent item={itemForModal} userData={userData} />
      </Suspense>
    </GameInfoModal>
  )
}
