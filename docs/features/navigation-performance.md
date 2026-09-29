# Navigation performance

Unreleased 0.42.21 uses full-page Link prefetching for the five primary destinations (Trainer, Explore, Pokémon, Artisan, Dex) and Trainer's Open Bag link. Next.js prepares their server-rendered content and client modules before the player selects them. A completed, valid prefetch can render without waiting for a route request on click. Prefetching adds background server work and downloads; it is limited to these dashboard links, rather than all activity links.

Explore also resolves its Active Events snapshot alongside the server-rendered route data and hydrates the event hook from that result. The events card and VS Seeker card derived from the same initial player snapshot are present on the first list render, so they do not shift already-visible sections after mount. Client refreshes continue for current event timing and participation state.

Trainer, Explore, Pokémon, Artisan, Dex, and Inventory no longer have route-level `loading.tsx` boundaries. On a cold transition, React keeps the outgoing screen visible until the destination is ready. The shared navigation remains interactive and another selection can interrupt the transition. A `useLinkStatus` descendant on primary links and Open Bag adds a delayed status dot without moving labels or changing the active route early. Feedback respects reduced motion. Direct URL visits still need their initial server render. MoveDex, AbilityDex, Pokédex, Carddex, and encounter-specific loading states remain unchanged.

Full prefetches use Next's existing browser-memory Router Cache (default full-prefetch lifetime: five minutes); no shared server cache or experimental cache settings are enabled. `UserProvider` displays the freshest available server/client snapshot and revalidates its scoped SWR data on entry. Existing data is not reported as loading during this refresh. This prevents a prefetched page from remaining stale until the periodic five-minute sync, including scopes that were unmounted when rewards were earned. SWR still deduplicates requests for five seconds, and existing action invalidation remains in place.

The Pokémon box has its own first-page/egg/roster/count payload outside scoped SWR. It refreshes on mount while retaining the initial grid. An in-flight refresh is ignored after unmount or if the player has changed boxes, paginated, or edited that snapshot, so it cannot replace their newer local state. Server actions remain authoritative for costs, ownership, rewards, and gates. Background reconciliation means an older prefetched value can be visible briefly; it does not guarantee live cross-device consistency.

This removes avoidable navigation waits and skeleton flashes, not database execution time. Initial visits still wait for request-specific CSP and layout authentication/story checks. Cold routes, slow networks, expired prefetches, and cache invalidation can still require a request.

## Cache Components assessment

Do not enable `cacheComponents` or `partialPrefetching` as a configuration-only change. The frontend reads a fresh CSP nonce from request headers; Next.js documents nonce-based CSP as incompatible with PPR static shells. The app also has Payload admin routes, dynamic route exports, authenticated data and timed game effects that need a dedicated migration and state-preservation audit. Existing static game catalogs are already module data, so wrapping them in a remote cache adds no useful retrieval saving.

References: [Next.js navigation](https://nextjs.org/docs/app/getting-started/linking-and-navigating), [nonce CSP limitations](https://nextjs.org/docs/app/guides/content-security-policy), and the installed Next.js migration/partial-prefetching guides under `node_modules/next/dist/docs/01-app/02-guides/`.

## Verification

`e2e/navigation-feedback.pw.ts` checks keyboard activation, pending feedback, retained outgoing content, and desktop/mobile bounds. `e2e/scoped-sync.pw.ts` checks that a prefetched snapshot stays visible during a held refresh, then updates and survives a revisit without reverting to the older server snapshot. Run these alongside the existing PWA update tests.

Automatic prefetching is production-only: development browser checks do not establish production prefetch timings. On an isolated production build, wait for the complete prefetch response before clicking a main link: the screen should switch without a document request or click-time RSC wait. Repeat between Explore, Pokémon, Trainer and Open Bag; throttle a cold destination and confirm the outgoing page remains until it is ready. Check rapid section selection, catch/reward return, box pagination during refresh, auth loss, and takeover redirects. The optional `e2e/production-interactions.pw.ts` provides a populated-box fixture for this check.
