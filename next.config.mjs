import { readFileSync } from 'node:fs'
import { availableParallelism } from 'node:os'
import { withPayload } from '@payloadcms/next/withPayload'

const packageVersion = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8'),
).version
const deploymentId = `pokeori-${packageVersion.replaceAll('.', '-')}`

// Payload's source/type generation tools are not production runtime roots.
// Next may still trace an individual file if a real runtime import needs it.
const authoringOnlyPackages = new Set([
  'typescript', 'typescript6', 'prettier', 'json-schema-to-typescript',
])

function runtimePackageGlobs(rootPackages) {
  const pending = [...rootPackages]
  const visited = new Set()
  const globs = []

  while (pending.length > 0) {
    const packageName = pending.pop()
    if (!packageName || visited.has(packageName) || authoringOnlyPackages.has(packageName)) continue
    visited.add(packageName)

    try {
      const packageJson = JSON.parse(
        readFileSync(
          new URL(`./node_modules/${packageName}/package.json`, import.meta.url),
          'utf8',
        ),
      )
      globs.push(`./node_modules/${packageName}/**/*`)
      pending.push(
        ...Object.keys(packageJson.dependencies || {}),
        ...Object.keys(packageJson.optionalDependencies || {}),
      )
    } catch {
      // Nested dependencies are already covered by their parent package glob.
    }
  }

  return globs
}

const standaloneRuntimeGlobs = runtimePackageGlobs([
  'payload',
  '@payloadcms/db-mongodb',
  '@payloadcms/email-resend',
  'graphql',
  'sharp',
])

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.NODE_ENV !== 'production' && process.env.POKEORI_TEST_DIST_DIR
    ? { distDir: process.env.POKEORI_TEST_DIST_DIR }
    : {}),
  output: 'standalone',
  deploymentId,
  outputFileTracingIncludes: {
    '/*': standaloneRuntimeGlobs,
  },
  // Alpine uses Sharp's linuxmusl binaries. Its optional glibc binaries were
  // also traced into the old image (~18 MiB of unused libvips alone).
  ...(process.env.POKEORI_BUILD_LIBC === 'musl'
    ? {
        outputFileTracingExcludes: {
          '/*': [
            './node_modules/@img/sharp-linux-*/**/*',
            './node_modules/@img/sharp-libvips-linux-*/**/*',
          ],
        },
      }
    : {}),
  typescript: {
    ignoreBuildErrors: process.env.NEXT_IGNORE_TYPECHECK === 'true',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pokemontcg.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.scrydex.com',
        pathname: '/**',
      },
    ],
    // Optimize images with modern formats
    formats: ['image/avif', 'image/webp'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  // Optimize package imports to reduce bundle size
  experimental: {
    useTypeScriptCli: true,
    // Cap page workers at the N150's four cores; respect smaller CPU allocations.
    cpus: Math.min(4, availableParallelism()),
    staticGenerationRetryCount: 1,
    staticGenerationMaxConcurrency: 8,
    staticGenerationMinPagesPerWorker: 100,
    optimizePackageImports: [
      'lucide-react',
      'react-icons',
      '@radix-ui/react-dialog',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      '@radix-ui/react-scroll-area',
      'framer-motion',
    ],
  },
  serverExternalPackages: [
    'payload',
    '@payloadcms/db-mongodb',
    '@payloadcms/email-resend',
    'graphql',
    'sharp',
  ],
  // Security headers
  async headers() {
    return [
      {
        // Route/location map art and bundled sprite assets are static per
        // release; let browsers reuse them for a day while SWR refreshes in
        // the background after a new deploy swaps any artwork.
        source: '/backgrounds/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        source: '/sprites/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ]
  },
}
export default withPayload(nextConfig, {
  devBundleServerPackages: false,
})
