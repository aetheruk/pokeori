import { Check } from 'lucide-react'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'
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
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(regionCategories)
            .filter(([regionKey]) => categories.includes(regionKey))
            .map(([regionKey, regionData]) => (
              <button
                key={regionKey}
                type="button"
                aria-pressed={activeCategory === regionKey}
                onClick={() => {
                  handleCategoryChange(regionKey)
                  setRegionModalOpen(false)
                }}
                className="game-focus-ring relative w-full cursor-pointer overflow-hidden rounded-lg border border-game-border bg-game-surface-raised text-left transition-colors hover:border-game-moss/40"
              >
                <div className="relative aspect-[8/5] w-full">
                  <Image
                    src={regionData.image}
                    alt={regionKey}
                    fill
                    className="object-cover"
                  />
                  {activeCategory === regionKey && (
                    <div className="absolute top-2 right-2 bg-game-moss rounded-full p-1">
                      <Check className="h-4 w-4 text-game-cream" />
                    </div>
                  )}
                </div>
                <div className="px-3 py-2.5 text-sm font-medium text-game-ink">
                  {regionKey}
                </div>
              </button>
            ))}
        </div>
      </div>
    </ResponsivePanel>
  )
}
