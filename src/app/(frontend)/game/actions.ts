'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { UpdateUserSchema } from '@/utilities/validators'
import { getEquipableTitleIds } from '@/utilities/skills/unlocks'

export async function updateUserCustomization(data: {
  banner?: string
  icon?: string
  title?: string
}) {
  const validated = UpdateUserSchema.safeParse(data)
  if (!validated.success) {
    return { success: false, error: 'Invalid data' }
  }

  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }

  // Validate selections are in unlocked arrays
  const unlockedBanners = (user as any).unlockedBanners || ['lab']
  const unlockedIcons = (user as any).unlockedIcons || ['trainer-red']
  const equipableTitles = getEquipableTitleIds((user as any).unlockedTitles, user.skills)

  const updateData: any = {}

  if (data.banner) {
    if (!unlockedBanners.includes(data.banner)) {
      return { success: false, error: 'Banner not unlocked' }
    }
    updateData.banner = data.banner
  }

  if (data.icon) {
    if (!unlockedIcons.includes(data.icon)) {
      return { success: false, error: 'Icon not unlocked' }
    }
    updateData.icon = data.icon
  }

  if (data.title) {
    if (!equipableTitles.includes(data.title)) {
      return { success: false, error: 'Title not unlocked' }
    }
    updateData.title = data.title
  }

  if (Object.keys(updateData).length === 0) {
    return { success: false, error: 'No changes provided' }
  }

  await payload.update({
    collection: 'users',
    id: user.id,
    data: updateData,
  })

  return { success: true }
}
