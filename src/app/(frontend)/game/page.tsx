import { TrainerDashboard } from '@/components/game/trainer/trainer-dashboard'

export default function GamePage() {
  // Static page - auth handled client-side

  return (
    <div className="h-full overflow-hidden">
      <TrainerDashboard />
    </div>
  )
}
