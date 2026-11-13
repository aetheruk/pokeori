import path from 'node:path'
import { scanGameImages } from '../src/utilities/image-manifest'

const publicPath = path.resolve(Bun.argv[2] || 'public')
const outputPath = path.join(publicPath, 'game-image-manifest.json')
const images = await scanGameImages(publicPath)

await Bun.write(outputPath, JSON.stringify(images))
console.log(`Wrote ${images.length} image entries to ${outputPath}`)
