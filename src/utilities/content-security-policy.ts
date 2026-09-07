export function contentSecurityPolicy(nonce: string, development: boolean) {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${development ? " 'unsafe-eval'" : ''}`,
    // React, Payload and the game renderer use style attributes for positioning.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://images.pokemontcg.io https://images.scrydex.com https://raw.githubusercontent.com",
    "media-src 'self' blob: https://raw.githubusercontent.com",
    `connect-src 'self' https://raw.githubusercontent.com${development ? ' ws: wss:' : ''}`,
    "font-src 'self' data:",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'report-uri /api/security/csp-report',
  ].join('; ')
}
