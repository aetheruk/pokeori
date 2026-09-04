import type { User } from '@/payload-types'

export interface PublicTrainerTeamMember {
  formId: string
  speciesId: number
  name: string
  level: number
  rarity?: string | null
  position: number
}

export interface PublicTrainerSummary {
  id: string
  trainerName: string
  icon: string
  banner: string
  title: string
  skills: User['skills']
  battleTeam: PublicTrainerTeamMember[]
  stats: {
    uniqueCards: number
    pokedexSeen: number
    pokedexCaught: number
  }
  isFriend: boolean
  hasPendingRequest: boolean
  level?: number
  exp?: number
}
