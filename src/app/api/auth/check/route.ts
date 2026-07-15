import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { createRequestId, errorResponse, jsonResponse } from '@/utilities/api-response'
import { getClientIp, getRateLimiter } from '@/utilities/rate-limiter'

export async function POST(request: Request) {
  const requestId = createRequestId()
  const requestHeaders = await headers()

  const limiter = getRateLimiter(getClientIp(requestHeaders))
  try {
    await limiter.schedule(() => Promise.resolve())
  } catch {
    return errorResponse('Rate limit exceeded', 429, requestId)
  }

  // Validate no body is expected for auth check
  try {
    const body = await request.json().catch(() => null)
    if (body && Object.keys(body).length > 0) {
      return errorResponse('No body expected', 400, requestId)
    }
  } catch {
    // No body is fine
  }

  try {
    const payload = await getPayload({ config: configPromise })

    // We can't access the user directly here to "refresh" it in the traditional sense
    // because Payload handles the JWT cookie.
    const { user } = await payload.auth({ headers: requestHeaders })

    if (!user) {
      return errorResponse('Not authenticated', 401, requestId)
    }

    return jsonResponse({ message: 'Active', user: { id: user.id }, requestId }, {}, requestId)
  } catch (error) {
    console.error(`[${requestId}] Auth check error:`, error)
    return errorResponse('Error', 500, requestId)
  }
}
