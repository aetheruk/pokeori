import type { StaticImageData } from 'next/image'
import { ScenicChoiceCard } from '@/components/game/shared/ScenicChoiceCard'
import { ResponsivePanel } from '@/components/ui/responsive-panel'

interface CategoryTabsProps {
  regionModalOpen: boolean
  setRegionModalOpen: (open: boolean) => void
  regionCategories: Record<
    string,
    { image: string | StaticImageData; description?: string }
  >
  categories: string[]
  activeCategory: string
  handleCategoryChange: (category: string) => void
}

export function CategoryTabs({
  regionModalOpen,
  setRegionModalOpen,
  regionCategories,
  categories,
  activeCategory,
  handleCategoryChange,
}: CategoryTabsProps) {
  return (
    <ResponsivePanel
      open={regionModalOpen}
      onOpenChange={setRegionModalOpen}
      title="Choose a region"
      description="Open a field journal section to explore."
      desktopWidth="min(38vw, 520px)"
      mobileHeader={false}
      headerClassName="pr-0 text-center sm:text-center"
      className="flex flex-col bg-game-surface"
    >
      <div className="min-h-0 overflow-y-auto px-4 pb-4 pt-4">
        <div className="space-y-3">
          {Object.entries(regionCategories)
            .filter(([regionKey]) => categories.includes(regionKey))
            .map(([regionKey, regionData]) => (
              <ScenicChoiceCard
                key={regionKey}
                background={regionData.image}
                title={regionKey}
                selected={activeCategory === regionKey}
                onClick={() => {
                  handleCategoryChange(regionKey)
                  setRegionModalOpen(false)
                }}
              />
            ))}
        </div>
      </div>
    </ResponsivePanel>
  )
}
