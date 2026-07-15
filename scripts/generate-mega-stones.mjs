import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const powersPath = path.join(root, 'src/data/powers.ts')
const outputPath = path.join(root, 'src/data/items/entries/mega-stones.ts')

const spriteAliases = {
  rayquazite: 'curly-tatsugiriite',
}

const toKebabCase = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const getPokemonFormMap = async () => {
  const pokemonModule = await import(pathToFileURL(path.join(root, 'src/data/pokemon-data.ts')))
  const pokemonData = pokemonModule.default || []
  const forms = new Map()

  for (const species of pokemonData) {
    for (const form of species.forms || []) {
      forms.set(form.id, form)
    }
  }

  return forms
}

const deriveMegaStone = (entry, formMap) => {
  const megaForm = formMap.get(entry.megaFormId)
  const baseForm = formMap.get(entry.baseFormId)
  const rawName = megaForm?.name || baseForm?.name || `Pokemon ${entry.baseFormId}`
  const stoneBaseName = rawName.replace(/^Mega\s+/i, '').trim()
  const megaStoneName = entry.megaStoneName || `${stoneBaseName}ite`

  return {
    ...entry,
    basePokemonName: baseForm?.name || `Pokemon ${entry.baseFormId}`,
    megaPokemonName: megaForm?.name || rawName,
    megaStoneId: entry.megaStoneId || toKebabCase(megaStoneName),
    megaStoneName,
  }
}

const readMegaEvolutions = async () => {
  const powersModule = await import(pathToFileURL(powersPath))
  const formMap = await getPokemonFormMap()
  return powersModule.MEGA_EVOLUTIONS.map((entry) => deriveMegaStone(entry, formMap)).sort(
    (a, b) => {
      const baseDiff = Number(a.baseFormId) - Number(b.baseFormId)
      if (baseDiff !== 0) return baseDiff
      return Number(a.megaFormId) - Number(b.megaFormId)
    },
  )
}

const writePowersMegaArray = (megaEvolutions) => {
  const powersContent = fs.readFileSync(powersPath, 'utf-8')
  const megaRegex = /export const MEGA_EVOLUTIONS: MegaEvolutionEntry\[\] = \[[\s\S]*?\n\]/

  if (!megaRegex.test(powersContent)) {
    throw new Error('Could not find MEGA_EVOLUTIONS array in src/data/powers.ts')
  }

  const arrayContent = megaEvolutions
    .map(
      (entry) =>
        `  { baseFormId: '${entry.baseFormId}', megaFormId: '${entry.megaFormId}', megaStoneId: '${entry.megaStoneId}', megaStoneName: '${entry.megaStoneName}' },`,
    )
    .join('\n')

  fs.writeFileSync(
    powersPath,
    powersContent.replace(
      megaRegex,
      `export const MEGA_EVOLUTIONS: MegaEvolutionEntry[] = [\n${arrayContent}\n]`,
    ),
  )
}

const writeMegaStoneItems = (megaEvolutions) => {
  const uniqueStones = new Map()

  for (const entry of megaEvolutions) {
    if (!entry.megaStoneId || !entry.megaStoneName) {
      throw new Error(`Mega evolution ${entry.megaFormId} is missing a stone id or name`)
    }

    if (!uniqueStones.has(entry.megaStoneId)) {
      uniqueStones.set(entry.megaStoneId, entry)
    }
  }

  const items = Array.from(uniqueStones.values()).sort((a, b) =>
    a.megaStoneId.localeCompare(b.megaStoneId),
  )

  const content = `import { Item } from '../types'

export const megaStones: Item[] = ${JSON.stringify(
    items.map((entry) => ({
      id: entry.megaStoneId,
      name: entry.megaStoneName,
      description: `A Mega Stone that allows ${entry.basePokemonName || 'a compatible Pokemon'} to Mega Evolve into ${entry.megaPokemonName || entry.megaStoneName}.`,
      category: 'battle',
      unique: true,
      spriteId: spriteAliases[entry.megaStoneId] || entry.megaStoneId,
    })),
    null,
    2,
  )}
`

  fs.writeFileSync(outputPath, content)
}

try {
  const megaEvolutions = await readMegaEvolutions()
  writePowersMegaArray(megaEvolutions)
  writeMegaStoneItems(megaEvolutions)

  console.log(`✓ Updated ${path.relative(root, powersPath)} with ${megaEvolutions.length} mega entries`)
  console.log(`✓ Generated ${path.relative(root, outputPath)}`)
} catch (error) {
  console.error('❌ Failed to generate mega stone data:', error)
  process.exit(1)
}
