import { type NextRequest, NextResponse } from 'next/server'
import { contentSecurityPolicy } from '@/utilities/content-security-policy'

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const policy = contentSecurityPolicy(
    nonce,
    process.env.NODE_ENV !== 'production',
  )
  const requestHeaders = new Headers(request.headers)
  // Overwrite untrusted inbound nonce/policy headers; Next reads this request
  // header to nonce its own generated scripts, including streamed content.
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', policy)
  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set(
    process.env.CSP_ENFORCE !== 'false'
      ? 'Content-Security-Policy'
      : 'Content-Security-Policy-Report-Only',
    policy,
  )
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|backgrounds/|sprites/|audio/|fonts/|favicon.ico|manifest.json|sw.js|icon|apple-icon).*)',
  ],
}
