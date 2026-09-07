import { config } from 'zod/v4/core'

// Configure validation before client schemas initialize. Zod's optional JIT
// probes Function(), which produces CSP reports even when its fallback works.
config({ jitless: true })
