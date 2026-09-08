# Trainer settings and image downloads

The gear on the Trainer card at `/game` opens the shared responsive settings panel. The audio toggle uses the existing AudioContext and its device-local preference. It controls game music, effects, and cries together.

Players can opt to download all bundled images (11,026 files, about 79 MiB at release 0.30.0). The panel shows the full size, cached-file count, progress, cancellation, resume, and removal. Four requests run concurrently. Completed files remain available after cancellation, interruption, navigation, or app updates. Keep the app open while downloading; background execution is not guaranteed. Storage persistence is requested on a best-effort basis, and storage failures are surfaced without blocking online play. Externally hosted TCG artwork and audio are outside this download pack.

`/api/game-images` scans public image files, returns their URL, SHA-256 revision and byte size, and memoizes the result for the production process. No generated manifest needs updating when artwork changes. The Docker runner already includes `public`; the compiler layer does not need these files. The endpoint sends `Cache-Control: no-store`.

The small `/sw.js` script loads and caches the manifest once per release. `pokeori-images-v1` stores originals keyed by URL and content revision, independently of the app version. The worker serves those same originals for matching Next image URLs, sprites, and CSS artwork; Next image resizing is bypassed for bundled art once the worker controls the client. First-use and explicit downloads verify content hashes before storing bytes, preventing stale CDN responses or a deployment race from poisoning a revision. Next image requests for external artwork remain unchanged.

Activation migrates matching bytes from older `pokeori-sprites-*` caches and removes outdated image revisions and manifests. Ordinary code-only deploys retain all image bytes. Changed/new images load on use or through Resume download; they are not silently bulk-downloaded. The app-version endpoint and activity-safe PWA reload behavior remain independent of image storage.

This is a loading-speed feature, not offline gameplay. Browser eviction, private-mode restrictions, and user-cleared site data can remove assets. Settings measures actual cache keys whenever it opens rather than trusting a saved completion flag.
