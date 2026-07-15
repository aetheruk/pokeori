import { useState } from 'react'
import { redeemMysteryGift } from '@/app/(frontend)/game/trainer/actions'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, Gift } from 'lucide-react'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function MysteryGift() {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const router = useRouter()

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) return

    setIsLoading(true)
    try {
      const response = await redeemMysteryGift(code)
      if (response.success) {
        setResult({
          success: true,
          message: 'Gift Redeemed Successfully!',
          summary: response.summary,
        })
        setCode('')
        router.refresh()
      } else {
        toast.error(response.error || 'Failed to redeem code')
      }
    } catch (err) {
      toast.error('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 md:px-6">
        <div className="mx-auto flex min-h-full max-w-xl items-center justify-center py-6">
          <div className="w-full overflow-hidden rounded-xl border border-game-border bg-game-surface">
            <div className="border-b border-game-border bg-game-surface-raised px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-game-clay/35 bg-game-clay/10">
                  <Gift className="h-6 w-6 text-game-clay" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-game-clay">League delivery</p>
                  <h2 className="font-display text-xl font-black text-game-ink">Mystery Gift Terminal</h2>
                </div>
              </div>
            </div>
            <div className="p-5 md:p-6">
              <form onSubmit={handleRedeem} className="w-full space-y-4">
                <div>
                  <label
                    htmlFor="mystery-gift-code"
                    className="mb-2 block text-xs font-medium text-game-muted"
                  >
                    Gift code
                  </label>
                  <Input
                    id="mystery-gift-code"
                    type="text"
                    placeholder="XXXX-XXXX-XXXX"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="h-14 border-game-border bg-game-surface-raised text-center font-mono text-lg font-bold uppercase tracking-normal placeholder:text-game-muted"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !code.trim()}
                  aria-busy={isLoading}
                  className="w-full bg-game-clay text-game-cream hover:bg-game-clay/90"
                >
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <span className="flex items-center gap-2">Redeem gift</span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Result Overlay */}
      {result && (
        <RewardResultOverlay
          result={{
            success: result.success,
            message: result.message,
            rewards: result.summary,
          }}
          onClose={() => setResult(null)}
        />
      )}
    </div>
  )
}
