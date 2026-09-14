import path from 'node:path'
import { fileURLToPath } from 'node:url'

const editorDirectory = path.dirname(fileURLToPath(import.meta.url))
const repositoryRoot = path.resolve(editorDirectory, '../..')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The editor imports the authoritative data and UI primitives from the
  // repository root, while its app routes remain outside the game app.
  turbopack: {
    root: repositoryRoot,
  },
  outputFileTracingRoot: repositoryRoot,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
