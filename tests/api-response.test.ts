import { describe, expect, test } from 'bun:test'
import { errorResponse, jsonResponse } from '@/utilities/api-response'

describe('api response helpers', () => {
  test('json responses include a request id header', () => {
    const response = jsonResponse({ ok: true }, {}, 'request-1')

    expect(response.headers.get('x-request-id')).toBe('request-1')
  })

  test('error responses include request id in the body and header', async () => {
    const response = errorResponse('Nope', 400, 'request-2')

    expect(response.status).toBe(400)
    expect(response.headers.get('x-request-id')).toBe('request-2')
    expect(await response.json()).toEqual({ error: 'Nope', requestId: 'request-2' })
  })
})
