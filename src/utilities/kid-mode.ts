import type { User } from '@/payload-types'

export const KID_MODE_PVE_STAT_MULTIPLIER = 1.2
export const KID_MODE_ACCESS_ERROR =
  'This feature is not available in Kid Mode.'

export function isKidModeUser(
  user: Pick<User, 'kidMode'> | null | undefined,
): boolean {
  return user?.kidMode === true
}
