/**
 * Access control utility for admin-only operations
 * Returns true if the user is an admin, false otherwise
 */
import { User } from '@/payload-types'

const superAdminCheck = ({ req: { user } }: { req: { user: User | null } }) => {
  if (!user) {
    return false
  }
  if (Object.hasOwn(user, 'isAdmin') && user.isAdmin) {
    return true
  } else {
    return false
  }
}
export default superAdminCheck

export const isAdmin = superAdminCheck

export const adminOrAuthenticated = (args: { req: { user: User | null } }) => {
  if (superAdminCheck(args)) {
    return true
  }

  return Boolean(args.req.user)
}

export const adminOrSelf = (args: { req: { user: User | null } }) => {
  if (superAdminCheck(args)) {
    return true
  }

  const {
    req: { user },
  } = args

  if (!user) {
    return false
  }

  return { id: { equals: user.id } }
}

export const adminOrUserOwned = (args: { req: { user: User | null } }) => {
  if (superAdminCheck(args)) {
    return true
  }

  const {
    req: { user },
  } = args

  if (!user) {
    return false
  }

  return { user: { equals: user.id } }
}
