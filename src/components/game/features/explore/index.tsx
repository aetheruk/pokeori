'use client'

import React, { useState, useEffect, Suspense, lazy } from 'react'
import { useGameUserData } from '@/hooks/useGameUserData'
import { useUser } from '@/context/UserContext'
import { Loader2 } from 'lucide-react'
import { useAudio } from '@/context/AudioContext'

// Hooks
import { useExploreState } from './hooks/useExploreState'
import { useExploreData } from './hooks/useExploreData'
import { useExploreActions } from './hooks/useExploreActions'

// Components
import { ExploreHeader } from './ExploreHeader'
import { CategoryTabs } from './CategoryTabs'
import { AreaTabs } from './AreaTabs'
import { ExploreGrid } from './ExploreGrid'
import { FilterBar } from './FilterBar'
import type { RequirementData } from '@/utilities/requirements'
import type { ExtendedUser } from '@/types/user-data'

// Modals
import { ShopModal } from '@/components/game/shops/shop-modal'
import { VoyageSelectionModal } from '@/components/game/voyages/voyage-selection-modal'
import { TaskExitDialog } from '@/components/game/task-exit-dialog'
import { TaskEnterDialog } from '@/components/game/task-enter-dialog'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { PvpModal } from '@/app/(frontend)/game/battles/pvp/pvp-modal'
import { PvpQueueModal } from '@/app/(frontend)/game/battles/pvp/pvp-queue-modal'
import { DailyRefreshModal } from '@/components/game/modals/DailyRefreshModal'
import { RivalSelectionDialog } from '@/components/game/rivals/rival-selection-dialog'
import {
  clearExpeditionReturn,
  getExpeditionReturn,
  markExpeditionReturn,
} from './expedition-return'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

// Utils
import { parseText } from '@/utilities/text-parsing'
import { voyages } from '@/data/voyages'
import { expeditions } from '@/data/expeditions'
import { refreshDailyTasks } from '@/utilities/tasks/actions'

// Data
import {
  subCategories as subCategoryDataMap,
  type RegionData,
} from '@/data/sub-region-map'

const ExploreDetailsModal = lazy(() =>
  import('./ExploreDetailsModal').then((module) => ({
    default: module.ExploreDetailsModal,
  })),
)

// Helper to get region data
const getRegionData = (
  activeCategory: string,
  activeSubCategory: string,
  regionCategories: any,
) => {
  const currentRegionData = activeCategory
    ? regionCategories[activeCategory as keyof typeof regionCategories]
    : null
  const currentSubCategoryData = activeSubCategory
    ? (subCategoryDataMap as any)[activeSubCategory]
    : null

  return {
    currentImage: currentSubCategoryData?.image || currentRegionData?.image,
    currentDescription:
      currentSubCategoryData?.description || currentRegionData?.description,
    currentTitle: activeSubCategory || activeCategory,
    currentMusic: currentSubCategoryData?.music,
  }
}

export function ExploreList() {
  const userData = useGameUserData()
  const { refreshUser } = useUser()

  if (!userData) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  return <ExploreListContent userData={userData} refreshUser={refreshUser} />
}

function ExploreListContent({
  userData,
  refreshUser,
}: {
  userData: RequirementData
  refreshUser: () => void
}) {
  const { availableItems: allUnlockedItems } = useExploreData(userData, '', '')
  const [showDailyRefresh, setShowDailyRefresh] = useState(false)

  useEffect(() => {
    refreshDailyTasks()
      .then((res) => {
        if (res.success) {
          setShowDailyRefresh(true)
          refreshUser()
        }
      })
      .catch(console.error)
  }, [refreshUser])

  // 2. State Management (depends on unlocked items to determine valid categories)
  const {
    activeCategory,
    setActiveCategory,
    activeSubCategory,
    setActiveSubCategory,
    handleCategoryChange,
    subCategories,
    categories, // Unlocked categories
    getSubCategoriesFor,
    getSubCategoryStatusesFor,
    previousCategory,
    setPreviousCategory,
    previousSubCategory,
    setPreviousSubCategory,
    regionModalOpen,
    setRegionModalOpen,
    areaModalOpen,
    setAreaModalOpen,
    regionCategories,
    getFallbackLocation,
    isSubCategoryLoaded, // We need this for music effect
    subCategoryStatuses,
  } = useExploreState(allUnlockedItems, userData)

  // 3. Filtered Data (for Grid)
  const { filteredItems, randomEvent, vsSeekerEvent } = useExploreData(
    userData,
    activeCategory,
    activeSubCategory,
  )

  // 4. Actions & Modals State
  const actions = useExploreActions(userData, refreshUser)

  // 5. Derived UI Data
  const regionData = getRegionData(
    activeCategory,
    activeSubCategory,
    regionCategories,
  )

  const isDailies = activeCategory === 'Dailies'

  const currentImage = isDailies
    ? '/backgrounds/chansey.avif'
    : regionData.currentImage
  const currentTitle = isDailies ? 'Tasks & Rewards' : regionData.currentTitle
  const currentDescription = isDailies
    ? 'A list of your daily tasks, trainer battles, locations, and research!'
    : regionData.currentDescription
  const currentMusic = regionData.currentMusic

  const { changeMusic: updateMusic } = useAudio()

  useEffect(() => {
    if (!isSubCategoryLoaded) return
    updateMusic(currentMusic || null, { fade: true })
  }, [currentMusic, updateMusic, isSubCategoryLoaded])

  const extendedUser = userData.user as unknown as ExtendedUser
  const activeVoyages = ((userData.user as any).activeVoyages || []) as {
    voyageId: string
    endTime: string
  }[]
  const activeExpedition = (userData as any).activeExpedition || null
  const activeExpeditionConfig = activeExpedition
    ? expeditions.find((entry) => entry.id === activeExpedition.expeditionId)
    : null
  const activeExpeditionLabel = activeExpeditionConfig?.chronicle
    ? 'Chronicle'
    : 'Expedition'

  useEffect(() => {
    const returnExpeditionId = getExpeditionReturn()
    if (!returnExpeditionId || actions.selectedItem) return

    if (!activeExpedition) {
      return
    }

    if (activeExpedition.expeditionId !== returnExpeditionId) {
      clearExpeditionReturn()
      return
    }

    const isReturnTargetActive =
      activeExpedition.status === 'active' ||
      activeExpedition.status === 'ready_to_claim'

    if (!isReturnTargetActive) {
      clearExpeditionReturn()
      return
    }

    const expeditionItem = allUnlockedItems.find(
      (item) => item.type === 'expedition' && item.id === returnExpeditionId,
    )
    if (expeditionItem) {
      clearExpeditionReturn()
      actions.setSelectedItem(expeditionItem)
    }
  }, [activeExpedition, actions, allUnlockedItems])

  const trainerName = extendedUser.trainerName || 'Trainer'
  const selectionTaskItemForModal = actions.selectedTaskForCompletion
    ? {
        ...actions.selectedTaskForCompletion,
        type: 'task' as const,
        originalData: actions.selectedTaskForCompletion,
        selectedPokemonIds: actions.selectedPokemonIds,
        togglePokemonSelection: actions.togglePokemonSelection,
        handleConfirmTaskWithSelection: actions.handleConfirmTaskWithSelection,
      }
    : null

  const isSelectionTaskModalOpen =
    actions.isSelectionModalOpen && !!selectionTaskItemForModal

  const areaSelectorLocation = isDailies
    ? getFallbackLocation(previousCategory, previousSubCategory)
    : { category: activeCategory, subCategory: activeSubCategory }
  const areaSelectorSubCategories = isDailies
    ? getSubCategoriesFor(areaSelectorLocation.category)
    : subCategories
  const areaSelectorStatuses = isDailies
    ? getSubCategoryStatusesFor(areaSelectorLocation.category)
    : subCategoryStatuses

  const openDailyChallenges = () => {
    const currentLocation = getFallbackLocation(
      activeCategory,
      activeSubCategory,
    )
    setPreviousCategory(currentLocation.category)
    setPreviousSubCategory(currentLocation.subCategory)
    setActiveCategory('Dailies')
    setActiveSubCategory('')
  }

  return (
    <div className="game-paper-first game-paper-background flex h-full flex-col overflow-hidden bg-game-canvas text-game-ink">
      {/* Header */}
      <ExploreHeader
        currentImage={currentImage as any}
        currentTitle={currentTitle}
        currentDescription={currentDescription}
        activeCategory={activeCategory}
        activeSubCategory={activeSubCategory}
        weatherSlot={
          userData.weatherSlot ||
          (userData.user as any).weatherSlot ||
          undefined
        }
      />

      {/* Region Drawer */}
      <CategoryTabs
        regionModalOpen={regionModalOpen}
        setRegionModalOpen={setRegionModalOpen}
        regionCategories={regionCategories}
        categories={categories}
        activeCategory={activeCategory}
        handleCategoryChange={handleCategoryChange}
      />
      <AreaTabs
        areaModalOpen={areaModalOpen}
        setAreaModalOpen={setAreaModalOpen}
        activeCategory={areaSelectorLocation.category}
        activeSubCategory={areaSelectorLocation.subCategory}
        subCategories={areaSelectorSubCategories}
        subCategoryStatuses={areaSelectorStatuses}
        handleSubCategoryChange={(subCategory) => {
          if (isDailies) {
            setActiveCategory(areaSelectorLocation.category)
            setPreviousCategory(areaSelectorLocation.category)
            setPreviousSubCategory(subCategory)
          }
          setActiveSubCategory(subCategory)
        }}
      />

      {/* Main Grid */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 md:px-6 pt-4">
        <ExploreGrid
          filteredItems={filteredItems}
          randomEvent={randomEvent}
          vsSeekerEvent={vsSeekerEvent}
          activeCategory={activeCategory}
          activeVoyages={activeVoyages}
          activeExpedition={activeExpedition}
          trainerName={trainerName}
          userData={userData}
          onAction={actions.handleAction}
          playSelectSfx={actions.playSelectSfx}
          setActiveShop={actions.setActiveShop}
          setSelectedItem={actions.setSelectedItem}
        />
      </div>

      {/* Filter Bar */}
      <FilterBar
        activeCategory={activeCategory}
        activeSubCategory={activeSubCategory}
        onOpenRegionModal={() => setRegionModalOpen(true)}
        onOpenAreaModal={() => setAreaModalOpen(true)}
        onOpenDailies={openDailyChallenges}
        onReturnFromDailies={() => {
          const previousLocation = getFallbackLocation(
            previousCategory,
            previousSubCategory,
          )
          setActiveCategory(previousLocation.category)
          setActiveSubCategory(previousLocation.subCategory)
        }}
      />

      {/* --- MODALS --- */}

      {/* Item Details Modals */}
      {actions.selectedItem && (
        <Suspense fallback={null}>
          <ExploreDetailsModal
            open={!!actions.selectedItem && !isSelectionTaskModalOpen}
            onOpenChange={(open) => !open && actions.setSelectedItem(null)}
            item={actions.selectedItem}
            userData={userData}
            trainerName={trainerName}
            activeVoyages={activeVoyages}
            activeExpedition={activeExpedition}
            selectedPokemonIds={actions.selectedPokemonIds}
            togglePokemonSelection={actions.togglePokemonSelection}
            selectedRepelItemId={actions.selectedRepelItemId}
            setSelectedRepelItemId={actions.setSelectedRepelItemId}
            handleConfirmTaskWithSelection={
              actions.handleConfirmTaskWithSelection
            }
            handleConfirmEncounterWithSelection={
              actions.handleConfirmEncounterWithSelection
            }
            loadingId={actions.loadingId}
            handleAction={actions.handleAction}
            handleCompleteVoyage={actions.handleCompleteVoyage}
            handleClaimExpeditionRewards={actions.handleClaimExpeditionRewards}
            completingTaskId={actions.completingTaskId}
            onChooseBranch={actions.handleChooseExpeditionBranch}
            onRequestAbandonExpedition={actions.handleRequestAbandonExpedition}
          />
        </Suspense>
      )}

      {selectionTaskItemForModal && (
        <Suspense fallback={null}>
          <ExploreDetailsModal
            open={isSelectionTaskModalOpen}
            onOpenChange={(open) => {
              actions.setIsSelectionModalOpen(open)
              if (!open) {
                actions.setSelectedTaskForCompletion(null)
                actions.setSelectedPokemonIds([])
                actions.setSelectedItem(null)
              }
            }}
            item={selectionTaskItemForModal}
            userData={userData}
            trainerName={trainerName}
            activeVoyages={activeVoyages}
            activeExpedition={activeExpedition}
            selectedPokemonIds={actions.selectedPokemonIds}
            togglePokemonSelection={actions.togglePokemonSelection}
            selectedRepelItemId={actions.selectedRepelItemId}
            setSelectedRepelItemId={actions.setSelectedRepelItemId}
            handleConfirmTaskWithSelection={
              actions.handleConfirmTaskWithSelection
            }
            handleConfirmEncounterWithSelection={
              actions.handleConfirmEncounterWithSelection
            }
            loadingId={actions.loadingId}
            handleAction={actions.handleAction}
            handleCompleteVoyage={actions.handleCompleteVoyage}
            handleClaimExpeditionRewards={actions.handleClaimExpeditionRewards}
            completingTaskId={actions.completingTaskId}
          />
        </Suspense>
      )}

      <ShopModal
        shop={actions.activeShop}
        open={!!actions.activeShop}
        onOpenChange={(open) => !open && actions.setActiveShop(null)}
      />

      <VoyageSelectionModal
        voyage={actions.activeVoyage}
        activeVoyageData={
          actions.activeVoyage
            ? activeVoyages.find((v) => v.voyageId === actions.activeVoyage!.id)
            : undefined
        }
        open={!!actions.activeVoyage}
        onOpenChange={(open) => !open && actions.setActiveVoyage(null)}
        userPokemon={userData.pokemon || []}
        onSuccess={(result) => {
          refreshUser()
          actions.setActiveVoyage(null)
          actions.setSelectedItem(null)
          actions.setVoyageRewardResult(result) // Show reward overlay
        }}
      />

      <RewardResultOverlay
        result={actions.completionResult}
        onClose={() => actions.setCompletionResult(null)}
        icon={actions.lastCompletedTask?.icon}
        iconAlt={actions.lastCompletedTask?.name || 'Task'}
        title="TASK COMPLETE!"
        message={
          <>
            You completed &quot;
            {parseText(
              actions.lastCompletedTask?.name || undefined,
              trainerName,
            )}
            &quot;!
          </>
        }
      />

      {(() => {
        if (!actions.voyageRewardResult) return null
        const voyage = voyages.find(
          (v) => v.id === actions.voyageRewardResult.voyageId,
        )
        const isSuccess = actions.voyageRewardResult.message === 'SUCCESS'

        return (
          <RewardResultOverlay
            result={actions.voyageRewardResult}
            onClose={() => actions.setVoyageRewardResult(null)}
            title="RESULTS"
            message={isSuccess ? 'Voyage Success' : 'Voyage Fail'}
            icon={voyage?.icon || { type: 'item', id: 'town-map' }}
            iconAlt={voyage?.name || 'Voyage'}
            container={document.body}
          />
        )
      })()}

      {(() => {
        if (!actions.expeditionRewardResult) return null
        const expedition = expeditions.find(
          (e) => e.id === actions.expeditionRewardResult.expeditionId,
        )
        const expeditionLabel = expedition?.chronicle
          ? 'CHRONICLE'
          : 'EXPEDITION'
        const expeditionLabelTitle = expedition?.chronicle
          ? 'Chronicle'
          : 'Expedition'

        return (
          <RewardResultOverlay
            result={actions.expeditionRewardResult}
            onClose={() => actions.setExpeditionRewardResult(null)}
            title={`${expeditionLabel} COMPLETE`}
            message={`${expeditionLabelTitle} rewards claimed`}
            icon={
              expedition?.icon || { type: 'item', id: 'mt-moon-expedition-map' }
            }
            iconAlt={expedition?.name || expeditionLabelTitle}
            container={document.body}
          />
        )
      })()}

      <TaskExitDialog
        data={actions.exitModalData}
        open={actions.isExitModalOpen}
        onOpenChange={(open) => {
          actions.setIsExitModalOpen(open)
          if (!open) actions.setSelectedItem(null)
        }}
      />

      <AlertDialog
        open={actions.isAbandonExpeditionConfirmOpen}
        onOpenChange={actions.setIsAbandonExpeditionConfirmOpen}
      >
        <AlertDialogContent className="border-game-border bg-game-surface text-game-ink">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-xl text-game-ink">
              Abandon {activeExpeditionLabel}?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-game-muted">
              {activeExpeditionConfig?.mapItemId
                ? `This will consume your ${activeExpeditionLabel.toLowerCase()} map and count as a failed run.`
                : 'This will count as a failed run.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-3">
            <AlertDialogCancel className="min-h-11 border-game-border bg-game-surface-raised text-game-ink hover:bg-game-canvas">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={actions.handleAbandonExpedition}
              className="min-h-11 bg-game-clay text-game-cream hover:bg-game-clay-strong"
            >
              Abandon {activeExpeditionLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {actions.enterModalTask?.enterModal && (
        <TaskEnterDialog
          taskId={actions.enterModalTask.id}
          steps={actions.enterModalTask.enterModal}
          open={actions.isEnterModalOpen}
          onOpenChange={(open) => {
            actions.setIsEnterModalOpen(open)
            if (!open) {
              actions.setExpeditionEnterModalTaskId(null)
            }
          }}
          onSuccess={async () => {
            actions.setIsEnterModalOpen(false)
            const task = actions.enterModalTask
            const isExpeditionTaskFlow =
              !!task && actions.expeditionEnterModalTaskId === task.id
            actions.setEnterModalTask(null)
            if (!task) {
              actions.setExpeditionEnterModalTaskId(null)
              return
            }

            const isAlreadyCompleted = (userData?.completedTasks || []).some(
              (entry: any) => entry.taskId === task.id,
            )
            const needsSelection = task.criteria?.some(
              (c: any) => c.type === 'pokemon_owned' && c.consume,
            )
            if (
              needsSelection &&
              !(isExpeditionTaskFlow && isAlreadyCompleted)
            ) {
              actions.setSelectedPokemonIds([])
              actions.setSelectedTaskForCompletion(task)
              actions.setIsSelectionModalOpen(true)
              if (!isExpeditionTaskFlow) {
                actions.setExpeditionEnterModalTaskId(null)
              }
              return
            }

            actions.setCompletingTaskId(task.id)
            actions.setLastCompletedTask(task) // Store task object

            const { completeTask } = require('@/utilities/tasks/actions')
            const {
              completeCurrentUserExpeditionTaskStep,
            } = require('@/utilities/expeditions/actions')

            try {
              const result =
                isExpeditionTaskFlow && isAlreadyCompleted
                  ? await completeCurrentUserExpeditionTaskStep(task.id)
                  : await completeTask(task.id)
              if (result.success) {
                if (isExpeditionTaskFlow) {
                  markExpeditionReturn(
                    (userData as any).activeExpedition?.expeditionId,
                  )
                }
                actions.setCompletionResult(result)
                actions.setSelectedItem(null)
                refreshUser()
              } else {
                const { toast } = require('sonner')
                toast.error(result.message || 'Failed to complete task')
              }
            } catch (e) {
              const { toast } = require('sonner')
              toast.error('Error completing task')
            } finally {
              actions.setCompletingTaskId(null)
              actions.setExpeditionEnterModalTaskId(null)
            }
          }}
          onFail={actions.handleEnterModalFail}
        />
      )}

      {actions.rivalSelectionTask && (
        <RivalSelectionDialog
          taskId={actions.rivalSelectionTask.id}
          open={actions.isRivalSelectionOpen}
          onOpenChange={(open) => {
            actions.setIsRivalSelectionOpen(open)
            if (!open) {
              actions.setRivalSelectionTask(null)
              actions.setExpeditionEnterModalTaskId(null)
            }
          }}
          onSuccess={() => {
            const task = actions.rivalSelectionTask
            const isExpeditionTaskFlow =
              !!task && actions.expeditionEnterModalTaskId === task.id

            if (isExpeditionTaskFlow) {
              markExpeditionReturn(
                (userData as any).activeExpedition?.expeditionId,
              )
            }

            actions.setSelectedItem(null)
            actions.setRivalSelectionTask(null)
            actions.setExpeditionEnterModalTaskId(null)
            refreshUser()
          }}
        />
      )}

      <DailyRefreshModal
        open={showDailyRefresh}
        onOpenChange={setShowDailyRefresh}
        onLetsGo={openDailyChallenges}
      />

      {userData?.user && (
        <>
          <PvpModal
            open={actions.showPvpModal}
            onOpenChange={actions.setShowPvpModal}
            configId={actions.pvpConfigId || ''}
            userId={userData.user.id}
          />
          <PvpQueueModal
            open={actions.showQueueModal}
            onOpenChange={actions.setShowQueueModal}
            configId={actions.pvpConfigId || ''}
            userId={userData.user.id}
          />
        </>
      )}
    </div>
  )
}

// End of file
