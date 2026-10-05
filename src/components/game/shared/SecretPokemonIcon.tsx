import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'

export function SecretPokemonIcon({ className }: { className?: string }) {
  return (
    <TaskIconDisplay
      icon={{ type: 'pokemon', id: '201-question' }}
      className={className}
    />
  )
}
