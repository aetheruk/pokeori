import { readFileSync } from 'node:fs'
import { join } from 'node:path'

type Header = {
  sources: { parent_source_index: number | null; path: string }[]
  output_files: { filename: string }[]
  chunk_parts: { source_index: number; output_file_index: number; size: number; compressed_size: number }[]
}

// Next's analyzer stores a big-endian JSON-header length followed by JSON and
// binary edges. Only the documented-in-its-reader header is needed for totals.
const routes = process.argv.slice(2)
if (!routes.length) routes.push('auth', 'game/explore', 'game/games/[gameType]', 'game/research/encounter')
const summaries = routes.map((route) => {
  const bytes = readFileSync(join('.next/diagnostics/analyze/data', route, 'analyze.data'))
  const length = bytes.readUInt32BE(0)
  const header: Header = JSON.parse(bytes.subarray(4, 4 + length).toString('utf8'))
  const paths = new Map<number, string>()
  function sourcePath(index: number): string {
    const cached = paths.get(index)
    if (cached) return cached
    const source = header.sources[index]
    const path = (source.parent_source_index === null ? '' : sourcePath(source.parent_source_index)) + source.path
    paths.set(index, path)
    return path
  }
  const sizes = new Map<string, number>()
  let javascriptBytes = 0
  let cssBytes = 0
  for (const part of header.chunk_parts) {
    const file = header.output_files[part.output_file_index].filename
    if (!file.includes('/static/chunks/')) continue
    if (file.endsWith('.js')) javascriptBytes += part.size
    else if (file.endsWith('.css')) cssBytes += part.size
    else continue
    const source = sourcePath(part.source_index)
    sizes.set(source, (sizes.get(source) || 0) + part.size)
  }
  return { route, javascriptBytes, cssBytes, largestSources: [...sizes]
    .sort((a, b) => b[1] - a[1]).slice(0, 15).map(([source, bytes]) => ({ source, bytes })) }
})
console.log(JSON.stringify({
  note: 'Uncompressed module-attributed reachable route graph, including asynchronous chunks. These are not initial downloads or measured wire bytes.',
  summaries,
}, null, 2))
