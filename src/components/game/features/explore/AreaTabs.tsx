import { Check } from 'lucide-react'
import Image from 'next/image'
import { ResponsivePanel } from '@/components/ui/responsive-panel'
import { subCategories as subCategoryDataMap } from '@/data/sub-region-map'

interface AreaTabsProps {
  areaModalOpen: boolean
  setAreaModalOpen: (open: boolean) => void
  activeCategory: string
  activeSubCategory: string
  subCategories: string[]
  subCategoryStatuses: Record<
    string,
    'locked' | 'available' | 'in_progress' | 'complete'
  >
  handleSubCategoryChange: (subCategory: string) => void
}

export function AreaTabs({
  areaModalOpen,
  setAreaModalOpen,
  activeCategory,
  activeSubCategory,
  subCategories,
  subCategoryStatuses,
  handleSubCategoryChange,
}: AreaTabsProps) {
  if (!activeCategory || activeCategory === 'Dailies') return null

  return (
    <ResponsivePanel
      open={areaModalOpen}
      onOpenChange={setAreaModalOpen}
      title="Choose an area"
      description="Select a local route or landmark."
      desktopWidth="min(38vw, 520px)"
      mobileHeader={false}
      headerClassName="pr-0 text-center sm:text-center"
      className="flex flex-col bg-game-surface"
    >
      <div className="min-h-0 overflow-y-auto px-4 pb-4 pt-4">
        <div className="grid grid-cols-2 gap-3">
          {subCategories
            .filter(
              (subCategory) =>
                (subCategoryStatuses[subCategory] || 'available') !== 'locked',
            )
            .map((subCategory) => {
              const subRegionData = subCategoryDataMap[subCategory]
              return (
                <button
                  key={subCategory}
                  type="button"
                  aria-pressed={activeSubCategory === subCategory}
                  onClick={() => {
                    handleSubCategoryChange(subCategory)
                    setAreaModalOpen(false)
                  }}
                  className="game-focus-ring relative w-full cursor-pointer overflow-hidden rounded-lg border border-game-border bg-game-surface-raised text-left transition-colors hover:border-game-moss/40"
                >
                  <div className="relative aspect-[8/5] w-full">
                    <Image
                      src={subRegionData?.image || '/backgrounds/town.avif'}
                      alt={subCategory}
                      fill
                      sizes="(max-width: 768px) 50vw, 384px"
                      className="object-cover"
                    />
                    {activeSubCategory === subCategory && (
                      <div className="absolute top-2 right-2 bg-game-moss rounded-full p-1">
                        <Check className="h-4 w-4 text-game-cream" />
                      </div>
                    )}
                  </div>
                  <div className="px-3 py-2">
                    <div className="text-sm font-medium text-game-ink">
                      {subCategory}
                    </div>
                  </div>
                </button>
              )
            })}
        </div>
      </div>
    </ResponsivePanel>
  )
}
