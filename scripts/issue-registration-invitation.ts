import { hasInvitationSecret, issueRegistrationInvitation } from '../src/utilities/auth/invitations'

// Operator-only CLI: signs a token locally; does not contact the app/database.
const args = process.argv.slice(2)
if (args.length > 1) throw new Error('Usage: bun scripts/issue-registration-invitation.ts [days=7]')
const days = args.length ? Number(args[0]) : 7
if (!Number.isInteger(days) || days < 1 || days > 30) throw new Error('Days must be an integer from 1 to 30')
const secret = process.env.BETA_INVITATION_SECRET
if (!hasInvitationSecret(secret)) throw new Error('Set BETA_INVITATION_SECRET to at least 32 random bytes')
const invitation = issueRegistrationInvitation(secret, days * 24 * 60 * 60)
console.log(`Expires: ${invitation.expiresAt}`)
console.log(invitation.token)
