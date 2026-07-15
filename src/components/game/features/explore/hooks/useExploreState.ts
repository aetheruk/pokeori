import { useState, useMemo, useEffect } from 'react'
import { usePersistentState } from '@/hooks/usePersistentState'
import { regionCategories } from '@/data/region-map'
import { subCategories as subCategoryDataMap } from '@/data/sub-region-map'
import { checkRequirement, type RequirementData } from '@/utilities/requirements'
import type { ExploreItem } from '../types'

export const DEFAULT_EXPLORE_CATEGORY = 'Kanto'
export const DEFAULT_EXPLORE_SUB_CATEGORY = 'Pallet Town'

export type SubRegionStatus = 'locked' | 'available' | 'in_progress' | 'complete'

export function useExploreState(availableItems: ExploreItem[], userData: RequirementData | null) {
  // Persistent Filter State
  const [activeCategory, setActiveCategory, isCategoryLoaded] = usePersistentState<string>(
    'exploreCategory',
    DEFAULT_EXPLORE_CATEGORY,
  )
  const [activeSubCategory, setActiveSubCategory, isSubCategoryLoaded] = usePersistentState<string>(
    'exploreSubCategory',
    DEFAULT_EXPLORE_SUB_CATEGORY,
  )
  const [previousCategory, setPreviousCategory] = usePersistentState<string>(
    'explorePreviousCategory',
    DEFAULT_EXPLORE_CATEGORY,
  )
  const [previousSubCategory, setPreviousSubCategory] = usePersistentState<string>(
    'explorePreviousSubCategory',
    DEFAULT_EXPLORE_SUB_CATEGORY,
  )

  const [regionModalOpen, setRegionModalOpen] = useState(false)
  const [areaModalOpen, setAreaModalOpen] = useState(false)

  // Categories Calculation
  const categories = useMemo(
    () => Array.from(new Set(availableItems.map((i) => i.category))).sort(),
    [availableItems],
  )

  const getSubCategoriesFor = (cat: string) => {
    if (!cat) return []
    const unlockedByItems = Array.from(
      new Set(
        availableItems
          .filter((i) => i.category === cat)
          .map((i) => i.subCategory || 'unassigned'),
      ),
    )
    const authoredForCategory = Object.entries(subCategoryDataMap)
      .filter(([, data]) => data.region === cat)
      .sort(([, a], [, b]) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER))
      .map(([subCategory]) => subCategory)

    if (authoredForCategory.length > 0) {
      return authoredForCategory
    }

    return unlockedByItems.sort()
  }

  const isSubCategoryLocked = (category: string, subCategory: string) => {
    const authored = subCategoryDataMap[subCategory]
    if (!authored) {
      return !availableItems.some(
        (item) => item.category === category && (item.subCategory || 'unassigned') === subCategory,
      )
    }

    if (authored.alwaysAvailable) return false
    if (!authored.unlockRequirements || authored.unlockRequirements.length === 0) return true
    if (!userData) return true
    const unlockRequirements = authored.unlockRequirements || []
    return !(
      unlockRequirements.length === 0 ||
      unlockRequirements.every((req) => checkRequirement(userData, req, { category, subCategory }))
    )
  }

  const subCategories = useMemo(
    () => getSubCategoriesFor(activeCategory),
    [availableItems, activeCategory],
  )

  const getSubCategoryStatusesFor = (category: string): Record<string, SubRegionStatus> => {
    const statuses: Record<string, SubRegionStatus> = {}
    const unlockedByItems = new Set(
      availableItems
        .filter((i) => i.category === category)
        .map((i) => i.subCategory || 'unassigned'),
    )

    getSubCategoriesFor(category).forEach((subCategory) => {
      const authored = subCategoryDataMap[subCategory]
      if (!authored) {
        statuses[subCategory] = unlockedByItems.has(subCategory) ? 'in_progress' : 'locked'
        return
      }

      if (isSubCategoryLocked(category, subCategory)) {
        statuses[subCategory] = 'locked'
        return
      }

      if (authored.alwaysAvailable) {
        const completeRequirements = authored.completeRequirements || []
        if (!userData || completeRequirements.length === 0) {
          statuses[subCategory] = 'available'
          return
        }

        const isComplete = completeRequirements.every((req) =>
          checkRequirement(userData, req, { category, subCategory }),
        )
        statuses[subCategory] = isComplete ? 'complete' : 'in_progress'
        return
      }

      const completeRequirements = authored.completeRequirements || []
      if (completeRequirements.length === 0) {
        statuses[subCategory] = 'available'
        return
      }

      if (!userData) {
        statuses[subCategory] = 'locked'
        return
      }

      const isComplete = completeRequirements.every((req) =>
        checkRequirement(userData, req, { category, subCategory }),
      )
      statuses[subCategory] = isComplete ? 'complete' : 'in_progress'
    })

    return statuses
  }

  const subCategoryStatuses = useMemo<Record<string, SubRegionStatus>>(
    () => getSubCategoryStatusesFor(activeCategory),
    [activeCategory, availableItems, subCategories, userData],
  )

  const getFallbackLocation = (category?: string, subCategory?: string) => {
    const fallbackCategory = categories.includes(DEFAULT_EXPLORE_CATEGORY)
      ? DEFAULT_EXPLORE_CATEGORY
      : categories[0] || DEFAULT_EXPLORE_CATEGORY
    const nextCategory =
      category && category !== 'Dailies' && categories.includes(category)
        ? category
        : fallbackCategory

    const validSubs = getSubCategoriesFor(nextCategory).filter(
      (candidate) => !isSubCategoryLocked(nextCategory, candidate),
    )
    const fallbackSubCategory = validSubs.includes(DEFAULT_EXPLORE_SUB_CATEGORY)
      ? DEFAULT_EXPLORE_SUB_CATEGORY
      : validSubs[0] || DEFAULT_EXPLORE_SUB_CATEGORY
    const nextSubCategory =
      subCategory && validSubs.includes(subCategory) ? subCategory : fallbackSubCategory

    return {
      category: nextCategory,
      subCategory: nextSubCategory,
    }
  }

  // Auto-Select Logic
  useEffect(() => {
    if (!isCategoryLoaded || !isSubCategoryLoaded) return

    if (activeCategory === 'Dailies') return

    let newCategory = activeCategory
    if (categories.length > 0) {
      if (!activeCategory || !categories.includes(activeCategory)) {
        newCategory = getFallbackLocation().category
        setActiveCategory(newCategory)
      }
    }

    const validSubs = getSubCategoriesFor(newCategory).filter(
      (candidate) => !isSubCategoryLocked(newCategory, candidate),
    )
    if (validSubs.length > 0) {
      if (!activeSubCategory || !validSubs.includes(activeSubCategory)) {
        setActiveSubCategory(getFallbackLocation(newCategory).subCategory)
      }
    } else {
      setActiveSubCategory('')
    }
  }, [
    categories,
    activeCategory,
    activeSubCategory,
    isCategoryLoaded,
    isSubCategoryLoaded,
    availableItems,
    setActiveCategory,
    setActiveSubCategory,
  ])

  const handleCategoryChange = (val: string) => {
    setActiveCategory(val)
    const subs = getSubCategoriesFor(val).filter((candidate) => !isSubCategoryLocked(val, candidate))
    if (subs.length > 0) setActiveSubCategory(getFallbackLocation(val).subCategory)
    else setActiveSubCategory('')
  }

  return {
    activeCategory,
    setActiveCategory,
    activeSubCategory,
    setActiveSubCategory,
    handleCategoryChange,
    subCategories,
    subCategoryStatuses,
    getSubCategoriesFor,
    getSubCategoryStatusesFor,
    categories,
    getFallbackLocation,
    isCategoryLoaded,
    isSubCategoryLoaded,
    previousCategory,
    setPreviousCategory,
    previousSubCategory,
    setPreviousSubCategory,
    regionModalOpen,
    setRegionModalOpen,
    areaModalOpen,
    setAreaModalOpen,
    regionCategories,
  }
}
