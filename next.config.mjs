import { readFileSync } from 'node:fs'
import withBundleAnalyzer from '@next/bundle-analyzer'
import { withPayload } from '@payloadcms/next/withPayload'

const packageVersion = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8'),
).version
const deploymentId = `pokeori-${packageVersion.replaceAll('.', '-')}`

function runtimePackageGlobs(rootPackages) {
  const pending = [...rootPackages]
  const visited = new Set()
  const globs = []

  while (pending.length > 0) {
    const packageName = pending.pop()
    if (!packageName || visited.has(packageName)) continue
    visited.add(packageName)

    try {
      const packageJson = JSON.parse(
        readFileSync(
          new URL(`./node_modules/${packageName}/package.json`, import.meta.url),
          'utf8',
        ),
      )
      globs.push(`./node_modules/${packageName}/**/*`)
      pending.push(...Object.keys(packageJson.dependencies || {}))
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
])

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  deploymentId,
  outputFileTracingIncludes: {
    '/*': standaloneRuntimeGlobs,
  },
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
    cpus: 8,
    staticGenerationRetryCount: 1,
    staticGenerationMaxConcurrency: 20,
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
  ],
  // Security headers
  async headers() {
    return [
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
export default withPayload(bundleAnalyzer(nextConfig), {
  devBundleServerPackages: false,
})
