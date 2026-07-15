import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { TrainerDashboard } from '@/components/game/trainer/trainer-dashboard'

export default function GamePage() {
  // Static page - auth handled client-side

  return (
    <div className="h-full overflow-hidden">
      <TrainerDashboard />
    </div>
  )
}
