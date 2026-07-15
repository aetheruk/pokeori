import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function GameLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })

  if (!user) {
    redirect('/auth')
  }

  return (
    <div className="min-h-dvh bg-background">
      <main className="h-dvh w-full">{children}</main>
    </div>
  )
}
