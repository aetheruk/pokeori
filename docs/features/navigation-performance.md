# Navigation performance

Release 0.29.17 uses Next.js 16.3.4's default Link prefetching and App Router streaming. `game/loading.tsx` is below the shared authenticated game layout and above page data boundaries. Navigating between game sections can display the prefetched journal loading state while fresh player data arrives; navigation and the shared shell remain mounted. Existing encounter-specific loading states take precedence.

Primary navigation uses automatic (not forced full-page) prefetching. This replaces manual `router.prefetch` calls on hover/touch that could fetch full dynamic pages. The loading boundary limits automatic prefetching to the shared shell and fallback. A `useLinkStatus` descendant adds a delayed status dot for cold or slow transitions without moving labels or changing the active route before navigation. Spinners and feedback respect reduced motion.

This improves perceived responsiveness, not database execution time. Initial visits still wait for request-specific CSP and layout authentication/story checks. No player snapshots, currency, encounter sessions, or rewards were added to shared caches.

## Cache Components assessment

Do not enable `cacheComponents` or `partialPrefetching` as a configuration-only change. The frontend reads a fresh CSP nonce from request headers; Next.js documents nonce-based CSP as incompatible with PPR static shells. The app also has Payload admin routes, dynamic route exports, authenticated data and timed game effects that need a dedicated migration and state-preservation audit. Existing static game catalogs are already module data, so wrapping them in a remote cache adds no useful retrieval saving.

References: [Next.js navigation](https://nextjs.org/docs/app/getting-started/linking-and-navigating), [nonce CSP limitations](https://nextjs.org/docs/app/guides/content-security-policy), and the installed Next.js migration/partial-prefetching guides under `node_modules/next/dist/docs/01-app/02-guides/`.

## Verification

Check desktop and mobile navigation, fast repeated section selection, keyboard activation, reduced motion, and existing PWA update tests. Automatic prefetching is production-only: development browser checks verify feedback/layout but do not establish production prefetch timings. On production, navigating to another section should show its loading boundary before the player-data response completes, with no full document request. Auth and takeover redirects must still be enforced by the destination's data boundary.
