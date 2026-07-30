import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { AuthForm } from './_components/auth-form'

export const dynamic = 'force-dynamic'

export default async function AuthPage() {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })

  if (user) {
    redirect('/game')
  }

  return <AuthForm />
}
