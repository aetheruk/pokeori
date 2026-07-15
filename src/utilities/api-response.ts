import { NextResponse } from 'next/server'

export function createRequestId() {
  return crypto.randomUUID()
}

export function jsonResponse<T>(body: T, init: ResponseInit = {}, requestId = createRequestId()) {
  const headers = new Headers(init.headers)
  headers.set('x-request-id', requestId)

  return NextResponse.json(body, {
    ...init,
    headers,
  })
}

export function errorResponse(
  error: string,
  status: number,
  requestId = createRequestId(),
  details?: unknown,
) {
  return jsonResponse({ error, requestId, details }, { status }, requestId)
}
